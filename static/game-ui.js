/* ══════════════════════════════════════════════════════════════
   game-ui.js  —  Lógica de UI del juego para 3DPit
     • btnGame  → navega a viewGame y reinicia el simulador,
                   SIN ejecutar nada automáticamente
     • btnGameRun → "Ejecutar" (ESP32 + simulador JS) cuando no hay
                   sesión activa; una vez iniciada la sesión (por
                   Ejecutar o por el primer Step), se convierte en
                   "Reiniciar" para volver al estado inicial
     • btnStep  → avanza un bloque; se deshabilita al terminar el
                   programa
     • btnContinue → reanuda la ejecución automática; deshabilitado
                   hasta que se haya dado al menos un Step manual
     • btnRun   → funciona en CUALQUIER vista:
                    - viewGame  → ESP32 + simulador JS
                    - otras     → solo ESP32 (sendCodeToDevice)
     • btnStop  → funciona en CUALQUIER vista:
                    - viewGame  → detiene juego + Ctrl+C al ESP32
                    - otras     → solo Ctrl+C al ESP32
     • btnStep / btnContinue → controlan SOLO el simulador JS,
                   nunca tocan la conexión/envío al ESP32
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

    /* Refleja visualmente el estado del simulador en los 3 botones:
         - Siguiente paso: se deshabilita cuando el programa terminó
         - Continuar: solo se habilita después de al menos un Step manual
         - Ejecutar ⇄ Reiniciar: una vez iniciado el simulador (por Ejecutar
           o por el primer Step), el botón cambia a "Reiniciar"
       No toca la conexión ESP32 en absoluto — solo lee banderas de animation.js. */
    function _syncStepUI() {
      var wrap = document.getElementById('btnStepContinue');
      var runBtn = document.getElementById('btnGameRun');
      var stepBtn = document.getElementById('btnStep');
      var continueBtn = document.getElementById('btnContinue');

      var started = !!window._simStarted;
      var finished = !!window._simFinished;
      var paused = (typeof _simPaused !== 'undefined') && _simPaused;

      if (wrap) wrap.classList.toggle('is-paused', !!paused && !finished);

      if (stepBtn) stepBtn.disabled = finished;

      if (continueBtn) continueBtn.disabled = !(paused && !finished);

      if (runBtn) {
        if (started) {
          runBtn.textContent = '↺ Reiniciar';
          runBtn.title = 'Reiniciar simulación';
        } else {
          runBtn.textContent = '▶ Ejecutar';
          runBtn.title = 'Ejecutar programa completo (ESP32 + simulador)';
        }
      }
    }

    /* Vuelve todo a "sin iniciar": usa resetSimulator() de animation.js
       si está disponible (limpia intérprete, highlight y canvas), y
       siempre termina sincronizando los botones. */
    function _resetSim() {
      if (typeof window.resetSimulator === 'function') {
        window.resetSimulator();
      } else {
        if (typeof stopGame === 'function') stopGame();
        if (typeof interpreter !== 'undefined') interpreter = null;
        if (typeof _simPaused !== 'undefined') _simPaused = false;
        window._simStarted = false;
        window._simFinished = false;
        if (typeof resetGame === 'function') {
          resetGame();
        } else if (typeof GameEngine !== 'undefined' && GameEngine.drawBg) {
          GameEngine.drawBg();
        }
      }
      _syncStepUI();
    }

    /* ══════════════════════════════════════
       API GLOBAL: window.globalRun / window.globalStop
       Llamable desde el Monitor Serial u otros módulos
    ══════════════════════════════════════ */
    window.globalRun = function () {
      _gamePaused = false;
      if (typeof _simPaused !== 'undefined') _simPaused = false;
      window._serialAdcValue = -1;
      _syncStepUI();

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
      if (typeof _simPaused !== 'undefined') _simPaused = false;
      window._serialAdcValue = -1;
      window.gameMode = false;
      window._simStarted = false;
      window._simFinished = false;
      _syncStepUI();

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
       btnGame — navega a viewGame, canvas limpio,
       sin ejecutar nada automáticamente
    ══════════════════════════════════════ */
    var btnGame = document.getElementById('btnGame');
    if (btnGame) {
      btnGame.addEventListener('click', function () {
        _gamePaused = false;
        showView('viewGame');
        /* Ya NO se autoejecuta nada: solo se deja el canvas en blanco/limpio.
           El usuario decide con Ejecutar / Siguiente paso / Continuar. */
        _resetSim();
      });
    }

    /* ══════════════════════════════════════
       btnGameRun — Ejecutar completo, visible
       dentro de la vista juego (mismo efecto que
       btnRun del toolbar: ESP32 + simulador JS)
    ══════════════════════════════════════ */
    var btnGameRun = document.getElementById('btnGameRun');
    if (btnGameRun) {
      btnGameRun.addEventListener('click', function (e) {
        e.stopImmediatePropagation();
        if (window._simStarted) {
          /* Ya había una sesión (terminada, pausada o corriendo): reiniciar */
          _resetSim();
        } else {
          window.globalRun();
          _syncStepUI();
        }
      }, true);
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
       btnStep / btnContinue — SOLO simulador
       Viven dentro de #gameHeader (viewGame), así que se
       muestran/ocultan solos junto con esa vista.
    ══════════════════════════════════════ */
    var btnStep = document.getElementById('btnStep');
    var btnContinue = document.getElementById('btnContinue');

    if (btnStep) {
      btnStep.addEventListener('click', function (e) {
        e.stopImmediatePropagation();
        if (typeof window.stepBlockly === 'function') window.stepBlockly();
        _syncStepUI();
      }, true);
    }
    if (btnContinue) {
      btnContinue.addEventListener('click', function (e) {
        e.stopImmediatePropagation();
        if (typeof window.continueBlockly === 'function') window.continueBlockly();
        _syncStepUI();
      }, true);
    }

    /* Escucha el estado real del simulador (animation.js lo despacha en
       cada cambio: inicio, fin de bloque, pausa, fin de programa, error).
       Así los botones quedan sincronizados también durante una ejecución
       automática (Ejecutar/Continuar), no solo tras un click directo. */
    window.addEventListener('simstatechange', _syncStepUI);

    /* Estado inicial: sin sesión iniciada */
    _syncStepUI();

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

  }); // end _ready
})();