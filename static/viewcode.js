/**
 * viewcode.js
 * Vista #viewCode:
 *   - Terminal xterm.js + FitAddon
 *   - Splitter drag (editor ↕ terminal) con refresh de CodeMirror
 *   - ResizeObserver para auto-fit
 *   - refreshTerminalFit() compatible con serial-monitor.js
 */

/* ============================================================
   TERMINAL — xterm.js
   ============================================================ */

/** @type {Terminal} */
let term;

/** @type {import('xterm-addon-fit').FitAddon} */
let fitAddon;

let _termResizeObserver;

/**
 * Inicializa la terminal xterm una sola vez.
 * Puede llamarse de forma segura múltiples veces.
 */
function initTerminal() {
  if (term) return;

  fitAddon = new FitAddon.FitAddon();

  term = new Terminal({
    cursorBlink: true,
    cursorStyle: "block",
    scrollback: 5000,
    convertEol: true,
    fontSize: 14,
    fontFamily: 'Consolas, "Courier New", monospace',
    theme: {
      background:          "#1e1e1e",
      foreground:          "#d4d4d4",
      cursor:              "#ffffff",
      selectionBackground: "rgba(255,255,255,0.2)",
      black:               "#000000",
      red:                 "#cd3131",
      green:               "#0dbc79",
      yellow:              "#e5e510",
      blue:                "#2472c8",
      magenta:             "#bc3fbc",
      cyan:                "#11a8cd",
      white:               "#e5e5e5",
      brightBlack:         "#666666",
      brightRed:           "#f14c4c",
      brightGreen:         "#23d18b",
      brightYellow:        "#f5f543",
      brightBlue:          "#3b8eea",
      brightMagenta:       "#d670d6",
      brightCyan:          "#29b8db",
      brightWhite:         "#ffffff",
    },
  });

  term.loadAddon(fitAddon);

  const el = document.getElementById("terminal");
  if (!el) { console.warn("[viewcode] #terminal no encontrado"); return; }
  term.open(el);

  requestAnimationFrame(() => fitAddon.fit());
  _enableTerminalAutoResize();
  _enableTerminalCopy();

  // Activar input serial (teclado directo sobre xterm)
  if (typeof enableTerminalInput === "function") enableTerminalInput();
}

/* ── Clic derecho en la terminal principal: menú contextual ── */
function _enableTerminalCopy() {
  const wrapper = document.getElementById("terminalWrapper");
  if (!wrapper) return;

  // TerminalMenu.attach (terminal-menu.js) gestiona Cortar / Copiar /
  // Pegar / Seleccionar todo / Limpiar de forma unificada.
  if (typeof TerminalMenu !== "undefined") {
    TerminalMenu.attach({
      container   : wrapper,
      getTerm     : () => term,
      toastAnchor : wrapper,
      onPaste     : (text) => { if (term) term.paste(text); },
      onClear     : () => { if (term) term.clear(); },
    });
  }
}

/** Extrae todo el texto visible del buffer de `term` como string plano. */
function _getMainTerminalText() {
  if (!term) return "";
  const buffer = term.buffer.active;
  const lines  = [];
  for (let i = 0; i < buffer.length; i++) {
    const line = buffer.getLine(i);
    if (line) lines.push(line.translateToString(true));
  }
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  return lines.join("\n");
}

/** Toast minimalista sobre la terminal principal. */
function _termToast(msg) {
  document.getElementById("_termToast")?.remove();
  const toast = document.createElement("div");
  toast.id = "_termToast";
  toast.textContent = msg;
  toast.style.cssText = [
    "position:fixed", "z-index:9999",
    "background:#2472c8", "color:#fff",
    "font-family:Consolas,monospace", "font-size:11px",
    "padding:4px 12px", "border-radius:4px",
    "box-shadow:0 2px 8px rgba(0,0,0,.5)",
    "pointer-events:none", "opacity:1",
    "transition:opacity .4s ease",
  ].join(";");
  const wrapper = document.getElementById("terminalWrapper");
  if (wrapper) {
    const r = wrapper.getBoundingClientRect();
    toast.style.left   = (r.left + 10) + "px";
    toast.style.bottom = (window.innerHeight - r.bottom + 8) + "px";
  } else {
    toast.style.bottom = "60px"; toast.style.right = "20px";
  }
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = "0"; }, 1400);
  setTimeout(() => toast.remove(), 1900);
}

/**
 * Fit de la terminal con delay para que el DOM haya repintado.
 * También refresca CodeMirror si está visible.
 */
function refreshTerminalFit() {
  setTimeout(() => {
    if (fitAddon && term) {
      fitAddon.fit();
      term.scrollToBottom();
    }
    // CodeMirror necesita refresh si el wrapper cambió de tamaño
    if (typeof editor !== "undefined" && editor.refresh) {
      editor.refresh();
    }
    // Monitor serial flotante
    if (typeof SerialMonitor !== "undefined" && typeof SerialMonitor.fitTerminal === "function") {
      SerialMonitor.fitTerminal();
    }
  }, 80);
}

/** @private */
function _enableTerminalAutoResize() {
  const el = document.getElementById("terminal");
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
  const splitter       = document.getElementById("splitter");
  const editorWrapper  = document.getElementById("editorWrapper");
  const terminalWrapper = document.getElementById("terminalWrapper");
  const splitContainer = document.getElementById("codeSplitContainer");

  if (!splitter || !editorWrapper || !terminalWrapper || !splitContainer) {
    console.warn("[viewcode] Elementos del splitter no encontrados");
    return;
  }

  // Limpiar cualquier flex inline que pudiera haber quedado de sesiones anteriores
  terminalWrapper.style.flex = "";
  terminalWrapper.style.removeProperty("flex");

  const MIN_EDITOR_H   = 100;
  const MIN_TERMINAL_H = 120;

  let isDragging = false;

  // ── Función central de resize ──────────────────────────────
  function applyResize(clientY) {
    const rect    = splitContainer.getBoundingClientRect();
    let editorH   = clientY - rect.top;

    editorH = Math.max(MIN_EDITOR_H, Math.min(editorH, rect.height - MIN_TERMINAL_H - splitter.offsetHeight));

    // Solo fijar el editor — la terminal toma el resto automáticamente con flex:1
    editorWrapper.style.flex = `0 0 ${editorH}px`;

    // Limpiar cualquier flex inline que haya quedado en terminalWrapper
    terminalWrapper.style.flex = "";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (fitAddon && term) fitAddon.fit();
        if (typeof editor !== "undefined" && editor.refresh) editor.refresh();
      });
    });
  }

  // ── Mouse ──────────────────────────────────────────────────
  splitter.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;
    document.body.style.cursor    = "row-resize";
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    applyResize(e.clientY);
  }, { passive: true });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.cursor    = "";
    document.body.style.userSelect = "";
    // Al soltar: fit inmediato + segundo fit con delay para navegadores lentos
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (fitAddon && term) fitAddon.fit();
        if (typeof editor !== "undefined" && editor.refresh) editor.refresh();
        setTimeout(() => refreshTerminalFit(), 120);
      });
    });
  }, { passive: true });

  // ── Touch ──────────────────────────────────────────────────
  splitter.addEventListener("touchstart", () => { isDragging = true; }, { passive: true });

  document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    applyResize(e.touches[0].clientY);
  }, { passive: true });

  document.addEventListener("touchend", () => {
    isDragging = false;
    refreshTerminalFit();
  }, { passive: true });
})();

/* ============================================================
   INICIALIZACIÓN
   ============================================================ */
window.addEventListener("DOMContentLoaded", () => {
  initTerminal();
});

window.addEventListener("resize", () => {
  refreshTerminalFit();
});