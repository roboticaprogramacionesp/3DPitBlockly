/* ══════════════════════════════════════════════════════════════
   game-ui.js  —  Lógica de UI del juego para 3DPit
     • btnGame  → navega a viewGame + preview estático del setup
     • btnRun   → funciona en CUALQUIER vista:
                    - viewGame  → ESP32 + simulador JS
                    - otras     → solo ESP32 (sendCodeToDevice)
     • btnStop  → funciona en CUALQUIER vista:
                    - viewGame  → detiene juego + Ctrl+C al ESP32
                    - otras     → solo Ctrl+C al ESP32
     • Pausa el loop al salir de viewGame
     • window.globalRun()  / window.globalStop()  → API pública
══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function _ready(fn) {
    if (typeof showView === 'function' && typeof runBlocklyAnimation === 'function') {
      fn();
    } else {
      setTimeout(function () { _ready(fn); }, 60);
    }
  }

  _ready(function () {

    var _gamePaused = false;

    function _inGameView() {
      var v = document.querySelector('.view.active');
      return v && v.id === 'viewGame';
    }

    /* ══════════════════════════════════════
       API GLOBAL: window.globalRun / window.globalStop
       Llamable desde el Monitor Serial u otros módulos
    ══════════════════════════════════════ */
    window.globalRun = function () {
      _gamePaused = false;
      window._serialAdcValue = -1;

      if (_inGameView()) {
        /* En vista juego: ESP32 + simulador JS */
        if (typeof window.sendCodeToDevice === 'function') {
          window.sendCodeToDevice();
        }
        setTimeout(function () { runBlocklyAnimation(); }, 300);
      } else {
        /* En bloques / código / cableado: solo ESP32 */
        if (typeof window.sendCodeToDevice === 'function') {
          window.sendCodeToDevice();
        }
      }
    };

    window.globalStop = function () {
      window._rawReplHook = null;
      if (typeof isSendingCode !== 'undefined') {
        try { isSendingCode = false; } catch (e) { }
      }

      if (typeof stopGame === 'function') stopGame();
      _gamePaused = false;
      window._serialAdcValue = -1;
      window.gameMode = false;

      // Una sola fuente de Ctrl+C, secuencial, sin carreras
      if (typeof stopExecution === 'function') {
        Promise.resolve(stopExecution()).then(function () {
          // Reset de la máquina de estados del monitor (suppressingPaste, lineBuffer)
          // por si quedó atascada tras la interrupción
          if (typeof SerialMonitor !== 'undefined') SerialMonitor.notifyDone();
        }).catch(function () { /* silenciar — el device puede ya estar desconectado */ });
      } else if (typeof sendSerial === 'function') {
        sendSerial('\x03').then(function () { return sendSerial('\x03'); })
          .then(function () { return sendSerial('\r\n'); })
          .then(function () {
            if (typeof SerialMonitor !== 'undefined') SerialMonitor.notifyDone();
          })
          .catch(function () { });
      }
    };

    /* ══════════════════════════════════════
       btnGame — navega + preview estático
    ══════════════════════════════════════ */
    var btnGame = document.getElementById('btnGame');
    if (btnGame) {
      btnGame.addEventListener('click', function () {
        _gamePaused = false;
        showView('viewGame');
        _runSetupPreview();
      });
    }

    /* ══════════════════════════════════════
       btnRun — funciona en cualquier vista
         • viewGame → ESP32 + simulador JS
         • otras    → solo ESP32
    ══════════════════════════════════════ */
    var btnRun = document.getElementById('btnRun');
    if (btnRun) {
      btnRun.addEventListener('click', function (e) {
        /* Siempre tomamos el control — cancelamos el handler de main.js */
        e.stopImmediatePropagation();
        window.globalRun();
      }, true /* capture — se ejecuta antes que el listener de main.js */);
    }

    /* ══════════════════════════════════════
       btnStop — funciona en cualquier vista
    ══════════════════════════════════════ */
    var btnStop = document.getElementById('btnStop');
    if (btnStop) {
      btnStop.addEventListener('click', function (e) {
        e.stopImmediatePropagation();
        window.globalStop();
      }, true);
    }

    /* ══════════════════════════════════════
       Pausar loop al cambiar de vista.
       Escucha el CustomEvent "viewchange" que main.js despacha
       al final de showView() — sin monkeypatch.
    ══════════════════════════════════════ */
    window.addEventListener('viewchange', function (e) {
      var viewId = e.detail && e.detail.viewId;
      var wasInGame = _inGameView();
      if (wasInGame && viewId !== 'viewGame') {
        if (typeof runner !== 'undefined' && runner) { clearTimeout(runner); runner = null; }
        if (typeof _rafId !== 'undefined' && _rafId) { cancelAnimationFrame(_rafId); _rafId = null; }
        if (typeof interpreter !== 'undefined' && interpreter) _gamePaused = true;
      }
      if (viewId !== 'viewGame') {
        window.gameMode = false;
      }
    });

    /* Detener juego al cambiar de vista */
    ['btnBlocks', 'btnCode', 'btnWiring'].forEach(function (id) {
      var btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', function () {
          if (typeof stopGame === 'function') stopGame();
          _gamePaused = false;
        }, true);
      }
    });

    /* ══════════════════════════════════════
       Preview estático: setup sin loop.
       Corre el intérprete en slices async
       para no bloquear el hilo principal.
    ══════════════════════════════════════ */
    function _runSetupPreview() {
      if (typeof initInterpreter !== 'function' || !Code || !Code.workspace) return;

      if (typeof runner !== 'undefined' && runner) { clearTimeout(runner); runner = null; }
      if (typeof _rafId !== 'undefined' && _rafId) { cancelAnimationFrame(_rafId); _rafId = null; }
      if (typeof interpreter !== 'undefined') { interpreter = null; }

      setTimeout(function () {
        try {
          Blockly.JavaScript.init(Code.workspace);
          var code = Blockly.JavaScript.workspaceToCode(Code.workspace);
          if (!code || !code.trim()) return;

          var _done = false;
          initInterpreter(code);

          if (interpreter && interpreter.globalObject) {
            interpreter.setProperty(
              interpreter.globalObject,
              'gameFrameEnd',
              interpreter.createAsyncFunction(function (_cb) {
                _done = true;
                /* No llamar _cb → intérprete queda suspendido */
              })
            );
          }

          /* Correr en slices de 500 pasos por rAF para no bloquear */
          function _slice() {
            if (_done || !interpreter) return;
            var alive = true, steps = 0;
            try {
              while (alive && !_done && steps < 500) {
                alive = interpreter.step();
                steps++;
              }
            } catch (e) { /* ignore */ }
            if (!alive || _done) {
              interpreter = null;
            } else {
              requestAnimationFrame(_slice);
            }
          }
          _slice();

        } catch (err) {
          console.warn('[game-ui] preview error:', err);
          interpreter = null;
        }
      }, 30);
    }

  }); // end _ready
})();