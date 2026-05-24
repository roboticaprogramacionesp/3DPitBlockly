/**
 * viewcode.js
 * Lógica exclusiva de la vista #viewCode:
 *   - Inicialización de xterm.js + FitAddon
 *   - Splitter drag (editor ↕ terminal)
 *   - ResizeObserver para auto-fit de la terminal
 *
 * Dependencias globales esperadas (cargadas antes en index.html):
 *   Terminal, FitAddon  — xterm.js + addon
 *   editor              — instancia de CodeMirror (creada en main.js)
 */

/* ============================================================
   TERMINAL — xterm.js
   ============================================================ */

/** @type {Terminal} */
let term;

/** @type {import('xterm-addon-fit').FitAddon} */
let fitAddon;

/** ResizeObserver para ajustar la terminal al contenedor */
let _termResizeObserver;

/**
 * Inicializa la terminal xterm una sola vez.
 * Puede llamarse de forma segura múltiples veces.
 */
function initTerminal() {
  if (term) return; // ya inicializada

  fitAddon = new FitAddon.FitAddon();

  term = new Terminal({
    cursorBlink: true,
    cursorStyle: 'block',
    scrollback: 5000,
    convertEol: true,
    fontSize: 14,
    fontFamily: 'Consolas, "Courier New", monospace',
    theme: {
      background:         '#1e1e1e',
      foreground:         '#d4d4d4',
      cursor:             '#ffffff',
      selectionBackground:'rgba(255,255,255,0.2)',
      black:              '#000000',
      red:                '#cd3131',
      green:              '#0dbc79',
      yellow:             '#e5e510',
      blue:               '#2472c8',
      magenta:            '#bc3fbc',
      cyan:               '#11a8cd',
      white:              '#e5e5e5',
      brightBlack:        '#666666',
      brightRed:          '#f14c4c',
      brightGreen:        '#23d18b',
      brightYellow:       '#f5f543',
      brightBlue:         '#3b8eea',
      brightMagenta:      '#d670d6',
      brightCyan:         '#29b8db',
      brightWhite:        '#ffffff',
    },
  });

  term.loadAddon(fitAddon);

  const el = document.getElementById('terminal');
  term.open(el);

  // Primer ajuste de tamaño
  requestAnimationFrame(() => fitAddon.fit());

  // Auto-resize cuando el contenedor cambia de tamaño
  _enableTerminalAutoResize();

  // Activar input serial ahora que term ya existe
  // enableTerminalInput() está definida en main.js
  if (typeof enableTerminalInput === 'function') {
    enableTerminalInput();
  }
}

/**
 * Hace fit de la terminal con un pequeño delay para que el DOM
 * haya terminado de repintar.
 */
function refreshTerminalFit() {
  setTimeout(() => {
    if (!fitAddon || !term) return;
    fitAddon.fit();
    term.scrollToBottom();
  }, 80);
}

/** @private */
function _enableTerminalAutoResize() {
  const el = document.getElementById('terminal');
  if (!el) return;

  _termResizeObserver = new ResizeObserver(() => {
    if (fitAddon && term) fitAddon.fit();
  });

  _termResizeObserver.observe(el);
}

/* ============================================================
   SPLITTER — drag vertical entre editor y terminal
   ============================================================ */

(function initSplitter() {
  const splitter      = document.getElementById('splitter');
  const editorWrapper = document.getElementById('editorWrapper');
  const splitContainer = document.getElementById('codeSplitContainer');

  if (!splitter || !editorWrapper || !splitContainer) {
    console.warn('[viewcode] Elementos del splitter no encontrados');
    return;
  }

  const MIN_EDITOR_H   = 100; // px mínimos para el editor
  const MIN_TERMINAL_H = 80;  // px mínimos para la terminal

  let isDragging = false;

  splitter.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const rect = splitContainer.getBoundingClientRect();
    let newH = e.clientY - rect.top;

    const maxH = rect.height - MIN_TERMINAL_H - splitter.offsetHeight;

    newH = Math.max(MIN_EDITOR_H, Math.min(newH, maxH));

    editorWrapper.style.flex = `0 0 ${newH}px`;

    // Refrescar terminal sin acumular timers
    if (fitAddon && term) fitAddon.fit();
  }, { passive: true });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    refreshTerminalFit();
  }, { passive: true });

  // Soporte touch (tablets)
  splitter.addEventListener('touchstart', (e) => {
    isDragging = true;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const rect = splitContainer.getBoundingClientRect();
    let newH = touch.clientY - rect.top;
    const maxH = rect.height - MIN_TERMINAL_H - splitter.offsetHeight;
    newH = Math.max(MIN_EDITOR_H, Math.min(newH, maxH));
    editorWrapper.style.flex = `0 0 ${newH}px`;
  }, { passive: true });

  document.addEventListener('touchend', () => {
    isDragging = false;
    refreshTerminalFit();
  }, { passive: true });
})();

/* ============================================================
   INICIALIZACIÓN AL CARGAR EL DOM
   ============================================================ */
window.addEventListener('DOMContentLoaded', () => {
  initTerminal();
});

/* Re-ajustar cuando la ventana cambie de tamaño */
window.addEventListener('resize', () => {
  refreshTerminalFit();
  // CodeMirror también necesita refresh si está visible
  if (typeof editor !== 'undefined' && editor.refresh) {
    editor.refresh();
  }
});
