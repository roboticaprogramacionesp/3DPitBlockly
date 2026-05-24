/**
 * SerialMonitor — Monitor Serial flotante estilo Arduino IDE / 3DPit
 *
 * - SerialMonitor.feed(chunk)  → muestra datos del puerto serial
 * - SerialMonitor.toggle()     → abre/cierra el monitor
 * - Requiere xterm.js + FitAddon cargados en la página
 * - El botón de apertura debe tener id="btnOpenSerialMonitor" en el HTML
 *
 * FIXES aplicados:
 *  - ResizeObserver guardado y desconectado en close() → sin memory leak
 *  - Drag acotado al viewport → el modal no puede perderse fuera de pantalla
 *  - Dependencias (sendSerial, isConnected) inyectables vía SerialMonitor.init()
 *    como alternativa al acceso global (retrocompatible: sigue funcionando sin init)
 */

const SerialMonitor = (() => {

  /* ── Estado interno ── */
  let smTerm        = null;
  let smFit         = null;
  let smResizeObs   = null; // FIX: guardar referencia para disconnect()
  let autoScroll    = true;
  let isOpen        = false;
  let showTimestamp = false;
  let lineBuffer    = '';
  let suppressingPaste = false;

  /* ── Dependencias inyectables (FIX: acoplamiento implícito) ──
     Por defecto usa las globales de main.js para retrocompatibilidad.
     Llamar SerialMonitor.init({ sendFn, isConnectedFn }) para inyectarlas. */
  let _sendFn = null;
  let _isConnectedFn = null;

  function getSendFn() {
    if (_sendFn) return _sendFn;
    if (typeof sendSerial === 'function') return sendSerial;
    return null;
  }

  function getIsConnected() {
    if (_isConnectedFn) return _isConnectedFn();
    if (typeof isConnected !== 'undefined' && isConnected) return true;
    if (typeof serialConnected !== 'undefined' && serialConnected) return true;
    return false;
  }

  /* ─────────────────────────────────────────
     Inyectar markup (solo el modal, sin FAB)
  ───────────────────────────────────────── */
  function injectHTML() {
    if (document.getElementById('serialMonitorModal')) return;
    document.body.insertAdjacentHTML('beforeend', `
      <div id="serialMonitorModal">
        <div id="smTitleBar">
          <div id="smTitleLeft">
            <span id="smTitleIcon">🖥️</span>
            <span id="smTitleText">Monitor Serial</span>
            <span id="smStatusDot"></span>
          </div>
          <div id="smTitleActions">
            <button class="sm-title-btn" id="smMinBtn" title="Minimizar">&#x2500;</button>
            <button class="sm-title-btn sm-close-btn" id="smCloseBtn" title="Cerrar">&#x2715;</button>
          </div>
        </div>
        <div id="smToolbar">
          <span class="sm-toolbar-label">Fin de l&iacute;nea</span>
          <select class="sm-toolbar-select" id="smLineEnding">
            <option value="\r\n">NL + CR</option>
            <option value="\n">Nueva l&iacute;nea</option>
            <option value="\r">Retorno</option>
            <option value="">Sin fin</option>
          </select>
          <div class="sm-toolbar-sep"></div>
          <label class="sm-toolbar-check-label">
            <input type="checkbox" id="smAutoScroll" checked> Autoscroll
          </label>
          <label class="sm-toolbar-check-label">
            <input type="checkbox" id="smTimestamp"> Hora
          </label>
          <button id="smClearBtn">&#x1F5D1; Limpiar</button>
        </div>
        <div id="smTerminalWrapper">
          <div id="smTerminal"></div>
        </div>
        <div id="smInputBar">
          <span id="smPrompt">&gt;&gt;&gt;</span>
          <input id="smCommandInput" type="text"
            placeholder="Escribe un comando... ↑↓ para historial"
            autocomplete="off" spellcheck="false"/>
          <button id="smSendBtn">Enviar</button>
        </div>
      </div>
    `);
  }

  /* ─────────────────────────────────────────
     Inicializar terminal xterm
  ───────────────────────────────────────── */
  function initSmTerminal() {
    if (smTerm) return;
    if (typeof Terminal === 'undefined' || typeof FitAddon === 'undefined') {
      console.error('SerialMonitor: xterm.js no está cargado.');
      return;
    }
    smFit = new FitAddon.FitAddon();
    smTerm = new Terminal({
      cursorBlink: false,
      scrollback: 10000,
      convertEol: false,
      disableStdin: true,
      fontSize: 12,
      lineHeight: 1.3,
      fontFamily: 'Consolas, "Courier New", monospace',
      theme: {
        background: '#0a0c18',
        foreground: '#c8d8ff',
        cursor: '#3454d1',
        selectionBackground: 'rgba(52,84,209,0.3)',
        black: '#000000',   red: '#cd3131',
        green: '#00e676',   yellow: '#e5e510',
        blue: '#3454d1',    magenta: '#bc3fbc',
        cyan: '#11a8cd',    white: '#e5e5e5',
        brightBlack: '#555',      brightRed: '#f14c4c',
        brightGreen: '#23d18b',   brightYellow: '#f5f543',
        brightBlue: '#4466e8',    brightMagenta: '#d670d6',
        brightCyan: '#29b8db',    brightWhite: '#ffffff',
      },
    });
    smTerm.loadAddon(smFit);
    smTerm.open(document.getElementById('smTerminal'));
    requestAnimationFrame(() => smFit.fit());

    // FIX: guardar referencia al ResizeObserver para poder desconectarlo
    smResizeObs = new ResizeObserver(() => {
      if (smFit && smTerm) smFit.fit();
    });
    smResizeObs.observe(document.getElementById('smTerminalWrapper'));
  }

  /* ─────────────────────────────────────────
     Abrir / Cerrar / Toggle
  ───────────────────────────────────────── */
  function open() {
    const modal = document.getElementById('serialMonitorModal');
    if (!modal) return;
    modal.classList.add('sm-open');
    isOpen = true;
    initSmTerminal();
    setTimeout(() => smFit && smFit.fit(), 50);
    document.getElementById('smCommandInput').focus();
  }

  function close() {
    const modal = document.getElementById('serialMonitorModal');
    if (!modal) return;
    modal.classList.remove('sm-open');
    isOpen = false;

    // FIX: desconectar ResizeObserver al cerrar para evitar memory leak
    if (smResizeObs) {
      smResizeObs.disconnect();
      smResizeObs = null;
    }
  }

  function toggle() { isOpen ? close() : open(); }

  /* ─────────────────────────────────────────
     Minimizar / Restaurar
  ───────────────────────────────────────── */
  let prevWidth = null, prevHeight = null;

  function minimize() {
    const modal   = document.getElementById('serialMonitorModal');
    const wrapper = document.getElementById('smTerminalWrapper');
    const toolbar = document.getElementById('smToolbar');
    const input   = document.getElementById('smInputBar');
    const btn     = document.getElementById('smMinBtn');

    prevWidth  = modal.offsetWidth  + 'px';
    prevHeight = modal.offsetHeight + 'px';

    if (wrapper) wrapper.style.display = 'none';
    if (toolbar) toolbar.style.display = 'none';
    if (input)   input.style.display   = 'none';

    modal.classList.add('sm-minimized');
    modal.style.width = '240px';
    if (btn) { btn.title = 'Restaurar'; btn.innerHTML = '&#x25A1;'; }
  }

  function restore() {
    const modal   = document.getElementById('serialMonitorModal');
    const wrapper = document.getElementById('smTerminalWrapper');
    const toolbar = document.getElementById('smToolbar');
    const input   = document.getElementById('smInputBar');
    const btn     = document.getElementById('smMinBtn');

    if (wrapper) wrapper.style.display = '';
    if (toolbar) toolbar.style.display = '';
    if (input)   input.style.display   = '';

    modal.classList.remove('sm-minimized');
    if (prevWidth)  modal.style.width  = prevWidth;
    if (prevHeight) modal.style.height = prevHeight;
    if (btn) { btn.title = 'Minimizar'; btn.innerHTML = '&#x2500;'; }

    // FIX: re-crear el ResizeObserver si fue destruido al minimizar
    if (!smResizeObs && smFit && smTerm) {
      const wrapper2 = document.getElementById('smTerminalWrapper');
      if (wrapper2) {
        smResizeObs = new ResizeObserver(() => {
          if (smFit && smTerm) smFit.fit();
        });
        smResizeObs.observe(wrapper2);
      }
    }

    setTimeout(() => smFit && smFit.fit(), 50);
  }

  /* ─────────────────────────────────────────
     Drag & drop — FIX: acotado al viewport
  ───────────────────────────────────────── */
  function enableDrag(modal, handle) {
    let dragging = false, startX, startY;

    handle.addEventListener('mousedown', (e) => {
      if (e.target.closest('button')) return;
      dragging = true;
      const rect = modal.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      modal.style.right  = 'auto';
      modal.style.bottom = 'auto';
      modal.style.left   = rect.left + 'px';
      modal.style.top    = rect.top  + 'px';
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });

    function onMove(e) {
      if (!dragging) return;

      const newLeft = parseFloat(modal.style.left) + e.clientX - startX;
      const newTop  = parseFloat(modal.style.top)  + e.clientY - startY;

      // FIX: mantener el modal dentro del viewport
      const maxLeft = window.innerWidth  - modal.offsetWidth;
      const maxTop  = window.innerHeight - modal.offsetHeight;

      modal.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + 'px';
      modal.style.top  = Math.max(0, Math.min(newTop,  maxTop))  + 'px';

      startX = e.clientX;
      startY = e.clientY;
    }

    function onUp() {
      dragging = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
  }

  /* ─────────────────────────────────────────
     LED de actividad
  ───────────────────────────────────────── */
  let dotTimer = null;

  function blinkDot() {
    const dot = document.getElementById('smStatusDot');
    if (!dot) return;
    dot.classList.add('sm-active');
    clearTimeout(dotTimer);
    dotTimer = setTimeout(() => dot.classList.remove('sm-active'), 600);
  }

  /* ─────────────────────────────────────────
     Historial de comandos
  ───────────────────────────────────────── */
  const cmdHistory = [];
  let historyIdx = -1;

  function pushHistory(cmd) {
    if (cmd && cmdHistory[cmdHistory.length - 1] !== cmd) {
      cmdHistory.push(cmd);
      if (cmdHistory.length > 100) cmdHistory.shift();
    }
    historyIdx = -1;
  }

  /* ─────────────────────────────────────────
     Enviar comando
     FIX: usa getSendFn() / getIsConnected() en lugar de globales directas
  ───────────────────────────────────────── */
  async function sendCommand(raw) {
    const input = document.getElementById('smCommandInput');
    const cmd = raw != null ? raw : (input ? input.value.trim() : '');
    if (!cmd) return;

    const connected = getIsConnected();
    if (!connected) {
      if (smTerm) {
        smTerm.writeln('\x1b[33m\u26a0  Sin conexión — conecta el dispositivo primero\x1b[0m');
        if (autoScroll) smTerm.scrollToBottom();
      }
      return;
    }

    const lineEnding = document.getElementById('smLineEnding')
      ? document.getElementById('smLineEnding').value
      : '\r\n';

    if (smTerm) {
      smTerm.writeln('\x1b[33m>>> ' + cmd + '\x1b[0m');
      if (autoScroll) smTerm.scrollToBottom();
    }

    pushHistory(cmd);
    if (input) input.value = '';

    const fn = getSendFn();
    if (fn) {
      try { await fn(cmd + lineEnding); }
      catch (e) {
        if (smTerm) smTerm.writeln('\x1b[31mError al enviar: ' + e.message + '\x1b[0m');
      }
    } else {
      if (smTerm) smTerm.writeln('\x1b[31m\u26a0 No hay conexión serial activa\x1b[0m');
    }
  }

  /* ─────────────────────────────────────────
     Eventos de UI
  ───────────────────────────────────────── */
  function bindEvents() {
    const modal    = document.getElementById('serialMonitorModal');
    const titleBar = document.getElementById('smTitleBar');
    const closeBtn = document.getElementById('smCloseBtn');
    const minBtn   = document.getElementById('smMinBtn');
    const clearBtn = document.getElementById('smClearBtn');
    const sendBtn  = document.getElementById('smSendBtn');
    const cmdInput = document.getElementById('smCommandInput');
    const autoChk  = document.getElementById('smAutoScroll');
    const tsChk    = document.getElementById('smTimestamp');

    closeBtn && closeBtn.addEventListener('click', close);
    minBtn   && minBtn.addEventListener('click', () => {
      modal.classList.contains('sm-minimized') ? restore() : minimize();
    });
    clearBtn && clearBtn.addEventListener('click', () => {
      if (smTerm) smTerm.clear();
      lineBuffer = '';
      suppressingPaste = false;
    });
    sendBtn && sendBtn.addEventListener('click', () => sendCommand());

    cmdInput && cmdInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); sendCommand();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!cmdHistory.length) return;
        historyIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
        cmdInput.value = cmdHistory[cmdHistory.length - 1 - historyIdx] || '';
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIdx <= 0) { historyIdx = -1; cmdInput.value = ''; return; }
        historyIdx--;
        cmdInput.value = cmdHistory[cmdHistory.length - 1 - historyIdx] || '';
      }
    });

    autoChk && autoChk.addEventListener('change', (e) => { autoScroll = e.target.checked; });
    tsChk   && tsChk.addEventListener('change',   (e) => { showTimestamp = e.target.checked; });

    if (modal && titleBar) enableDrag(modal, titleBar);
  }

  /* ─────────────────────────────────────────
     Limpieza de texto serial
  ───────────────────────────────────────── */

  function cleanLowLevel(text) {
    text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    text = text.replace(/\x1B\[[\d;?]*[A-Za-z]/g, '');
    text = text.replace(/\x1B[()][A-Z0-9]/g, '');
    text = text.replace(/[\x80-\xFF]/g, '');
    return text;
  }

  function colorizeErrors(line) {
    const isError =
      /^Traceback/.test(line)  ||
      /^\s+File "/.test(line)  ||
      /\w+Error:/.test(line)   ||
      /^Exception/.test(line);
    return isError ? '\x1b[31m' + line + '\x1b[0m' : line;
  }

  /**
   * feed(rawChunk) — llamar desde readSerialLoop en main.js
   *
   * Acumula en lineBuffer hasta tener líneas completas.
   * Suprime el bloque paste mode completo usando una máquina de estados.
   * Aplica timestamp UNA VEZ por línea.
   */
  function feed(rawChunk) {
    if (!smTerm) return;

    const cleaned = cleanLowLevel(rawChunk);
    if (!cleaned) return;

    blinkDot();
    lineBuffer += cleaned;

    const parts = lineBuffer.split('\n');
    lineBuffer = parts.pop(); // fragmento incompleto

    const now = showTimestamp ? new Date().toLocaleTimeString() : null;

    for (let i = 0; i < parts.length; i++) {
      const line = parts[i].replace(/\r/g, '');

      // Inicio de bloque paste mode
      if (/paste mode/i.test(line)) {
        suppressingPaste = true;
        continue;
      }

      // Fin del bloque paste mode (línea "===")
      if (suppressingPaste && /^={3,}\s*$/.test(line)) {
        suppressingPaste = false;
        continue;
      }

      // Suprimir líneas dentro del bloque
      if (suppressingPaste) continue;

      // Suprimir prompt >>> vacío o eco del REPL
      if (/^>>>/.test(line)) continue;

      // Línea vacía: saltar
      if (!line) continue;

      // Mostrar línea con color y timestamp
      const colored = colorizeErrors(line);
      const output  = now
        ? '\x1b[2m[' + now + ']\x1b[0m ' + colored
        : colored;
      smTerm.writeln(output);
    }

    if (autoScroll) smTerm.scrollToBottom();
  }

  /* ─────────────────────────────────────────
     Init
  ───────────────────────────────────────── */
  function init() {
    injectHTML();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /**
   * notifySending(code) — llamar desde main.js justo antes de sendSerial(\x05)
   */
  function notifySending(code) {
    lineBuffer = '';
    // El bloque de preview del código está comentado intencionalmente
    // para mostrar solo el output real. Descomenta si quieres verlo:
    /*
    if (!smTerm) return;
    smTerm.writeln('\x1b[2m─────────────── Ejecutando ───────────────\x1b[0m');
    const lines = code.replace(/\r/g, '').split('\n');
    for (const line of lines) {
      if (!line.trim()) continue;
      smTerm.writeln('  ' + line);
    }
    smTerm.writeln('\x1b[2m──────────────────────────────────────────\x1b[0m');
    if (autoScroll) smTerm.scrollToBottom();
    */
  }

  /**
   * notifyDone() — llamar desde main.js después de la ejecución.
   */
  function notifyDone() {
    suppressingPaste = false;
    lineBuffer = '';
  }

  /**
   * SerialMonitor.init({ sendFn, isConnectedFn })
   * Opcional: inyectar dependencias en lugar de usar globales.
   * Ejemplo:
   *   SerialMonitor.init({ sendFn: sendSerial, isConnectedFn: () => isConnected });
   */
  function initDeps({ sendFn, isConnectedFn } = {}) {
    if (sendFn)        _sendFn        = sendFn;
    if (isConnectedFn) _isConnectedFn = isConnectedFn;
  }

  return { feed, open, close, toggle, sendCommand, notifySending, notifyDone, init: initDeps };
})();