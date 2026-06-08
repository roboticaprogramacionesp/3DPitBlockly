/**
 * SerialMonitor — Monitor Serial flotante estilo Arduino IDE / 3DPit
 *
 * API pública:
 *   SerialMonitor.feed(chunk)          → alimentar datos del puerto serial
 *   SerialMonitor.toggle()             → abrir/cerrar el monitor
 *   SerialMonitor.open() / .close()
 *   SerialMonitor.warn(msg)            → mostrar aviso amarillo
 *   SerialMonitor.notifySending(code)  → limpiar buffer antes de ejecutar
 *   SerialMonitor.notifyDone()         → limpiar estado al terminar
 *   SerialMonitor.sendCommand(raw?)    → enviar comando al ESP32
 *   SerialMonitor.fitTerminal()        → ajustar tamaño de la terminal
 *   SerialMonitor.init({sendFn, isConnectedFn})  → inyectar dependencias
 */

var SerialMonitor = (() => {

  /* ── Estado interno ────────────────────────────────────────── */
  let smTerm        = null;
  let smFit         = null;
  let smResizeObs   = null;
  let autoScroll    = true;
  let isOpen        = false;
  let showTimestamp = false;
  let lineBuffer    = "";
  let suppressingPaste = false;

  /* Archivo cargado localmente */
  let _loadedFileContent = null;
  let _loadedFileName    = null;

  /* Dependencias inyectables */
  let _sendFn        = null;
  let _isConnectedFn = null;

  function getSendFn() {
    if (_sendFn) return _sendFn;
    if (typeof sendSerial === "function") return sendSerial;
    return null;
  }

  function getIsConnected() {
    if (_isConnectedFn) return _isConnectedFn();
    if (typeof isConnected !== "undefined" && isConnected) return true;
    if (typeof serialConnected !== "undefined" && serialConnected) return true;
    return false;
  }

  /* ── Inyectar markup ───────────────────────────────────────── */
  function injectHTML() {
    if (document.getElementById("serialMonitorModal")) return;
    document.body.insertAdjacentHTML("beforeend", `
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
        <div id="smSizeBar">
          <span class="sm-size-label">&#x1F520;</span>
          <button class="sm-size-btn" id="smSizeDown" title="Reducir texto">&#x2212;</button>
          <span class="sm-size-display" id="smSizeDisplay">M</span>
          <div class="sm-size-track" id="smSizeTrack"><div class="sm-size-fill" id="smSizeFill"></div></div>
          <button class="sm-size-btn" id="smSizeUp" title="Aumentar texto">+</button>
        </div>
        <div id="smNameFile">
          <span class="sm-toolbar-label">Fuente</span>
          <label class="sm-toolbar-check-label" title="Generar código desde los bloques Blockly">
            <input type="radio" name="smSource" id="smSrcBlocks" value="blocks" checked> &#x25A6; Bloques
          </label>
          <label class="sm-toolbar-check-label" title="Usar archivo cargado con 📂">
            <input type="radio" name="smSource" id="smSrcFile" value="file"> &#x1F4C2; Archivo
          </label>
          <div class="sm-toolbar-sep"></div>
          <input id="smFileNameInput" type="text" value="test.py"
            placeholder="nombre.py" autocomplete="off" spellcheck="false"/>
          <button id="smPickFileBtn" title="Cargar archivo desde tu computadora">&#x1F4C2;</button>
          <input id="smFilePickerInput" type="file" accept=".py,.txt,.json,.csv,.log,.mpy,.html,.js,.css" style="display:none"/>
          <button id="smUploadBtn">&#x2191; Subir</button>
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

  /* ── Terminal xterm ────────────────────────────────────────── */
  function initSmTerminal() {
    if (smTerm) return;
    if (typeof Terminal === "undefined" || typeof FitAddon === "undefined") {
      console.error("SerialMonitor: xterm.js no está cargado.");
      return;
    }

    smFit  = new FitAddon.FitAddon();
    smTerm = new Terminal({
      cursorBlink: false,
      scrollback: 10000,
      convertEol: false,
      disableStdin: true,
      fontSize: 12,
      lineHeight: 1.3,
      fontFamily: 'Consolas, "Courier New", monospace',
      rightClickSelectsWord: true,
      theme: {
        background: "#0a0c18",  foreground: "#c8d8ff",
        cursor:     "#3454d1",  selectionBackground: "rgba(52,84,209,0.3)",
        black: "#000000",       red:     "#cd3131",
        green: "#00e676",       yellow:  "#e5e510",
        blue:  "#3454d1",       magenta: "#bc3fbc",
        cyan:  "#11a8cd",       white:   "#e5e5e5",
        brightBlack:   "#555",  brightRed:     "#f14c4c",
        brightGreen:   "#23d18b", brightYellow: "#f5f543",
        brightBlue:    "#4466e8", brightMagenta: "#d670d6",
        brightCyan:    "#29b8db", brightWhite:   "#ffffff",
      },
    });

    smTerm.loadAddon(smFit);
    smTerm.open(document.getElementById("smTerminal"));
    requestAnimationFrame(() => smFit.fit());

    // Clic derecho → copiar selección o todo
    document.getElementById("smTerminal").addEventListener("contextmenu", async (e) => {
      e.preventDefault();
      const selected = smTerm.getSelection();
      const text     = selected || _getFullTerminalText();
      if (!text) return;

      let copied = false;
      if (navigator.clipboard?.writeText) {
        try { await navigator.clipboard.writeText(text); copied = true; } catch (_) {}
      }
      if (!copied && window.pywebview?.api?.set_clipboard) {
        try { const r = await window.pywebview.api.set_clipboard(text); copied = r?.status === "ok"; } catch (_) {}
      }
      if (!copied) {
        try {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.cssText = "position:fixed;opacity:0;top:0;left:0";
          document.body.appendChild(ta);
          ta.select();
          copied = document.execCommand("copy");
          document.body.removeChild(ta);
        } catch (_) {}
      }
      if (copied) { blinkDot(); _smToast(selected ? "Selección copiada" : "Todo copiado"); }
    });

    // ResizeObserver
    const wrapper = document.getElementById("smTerminalWrapper");
    smResizeObs = new ResizeObserver(() => { if (smFit && smTerm) smFit.fit(); });
    smResizeObs.observe(wrapper);
  }

  /* ── Abrir / Cerrar / Toggle ───────────────────────────────── */
  function open() {
    const modal = document.getElementById("serialMonitorModal");
    if (!modal) return;
    modal.classList.add("sm-open");
    isOpen = true;
    initSmTerminal();
    setTimeout(() => smFit?.fit(), 50);
    document.getElementById("smCommandInput")?.focus();
  }

  function close() {
    const modal = document.getElementById("serialMonitorModal");
    if (!modal) return;
    modal.classList.remove("sm-open");
    isOpen = false;
    // Desconectar ResizeObserver para evitar memory leak
    if (smResizeObs) { smResizeObs.disconnect(); smResizeObs = null; }
  }

  function toggle() { isOpen ? close() : open(); }

  /* ── Minimizar / Restaurar ────────────────────────────────── */
  let prevWidth = null, prevHeight = null;

  function minimize() {
    const modal  = document.getElementById("serialMonitorModal");
    const btn    = document.getElementById("smMinBtn");
    prevWidth    = modal.offsetWidth  + "px";
    prevHeight   = modal.offsetHeight + "px";

    ["smTerminalWrapper", "smToolbar", "smNameFile", "smSizeBar", "smInputBar"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });

    modal.classList.add("sm-minimized");
    modal.style.width = "240px";
    if (btn) { btn.title = "Restaurar"; btn.innerHTML = "&#x25A1;"; }
  }

  function restore() {
    const modal = document.getElementById("serialMonitorModal");
    const btn   = document.getElementById("smMinBtn");

    ["smTerminalWrapper", "smToolbar", "smNameFile", "smSizeBar", "smInputBar"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = "";
    });

    modal.classList.remove("sm-minimized");
    if (prevWidth)  modal.style.width  = prevWidth;
    if (prevHeight) modal.style.height = prevHeight;
    if (btn) { btn.title = "Minimizar"; btn.innerHTML = "&#x2500;"; }

    // Recrear ResizeObserver si fue destruido
    if (!smResizeObs && smFit && smTerm) {
      const wrapper = document.getElementById("smTerminalWrapper");
      if (wrapper) {
        smResizeObs = new ResizeObserver(() => { if (smFit && smTerm) smFit.fit(); });
        smResizeObs.observe(wrapper);
      }
    }
    setTimeout(() => smFit?.fit(), 50);
  }

  /* ── Drag & drop — acotado al viewport ───────────────────── */
  function enableDrag(modal, handle) {
    let dragging = false, startX, startY;

    handle.addEventListener("mousedown", (e) => {
      if (e.target.closest("button")) return;
      dragging = true;
      const rect = modal.getBoundingClientRect();
      startX = e.clientX; startY = e.clientY;
      modal.style.right = "auto"; modal.style.bottom = "auto";
      modal.style.left  = rect.left + "px";
      modal.style.top   = rect.top  + "px";
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup",   onUp);
    });

    function onMove(e) {
      if (!dragging) return;
      const newLeft = parseFloat(modal.style.left) + e.clientX - startX;
      const newTop  = parseFloat(modal.style.top)  + e.clientY - startY;
      const maxLeft = window.innerWidth  - modal.offsetWidth;
      const maxTop  = window.innerHeight - modal.offsetHeight;
      modal.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + "px";
      modal.style.top  = Math.max(0, Math.min(newTop,  maxTop))  + "px";
      startX = e.clientX; startY = e.clientY;
    }

    function onUp() {
      dragging = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup",   onUp);
    }
  }

  /* ── LED de actividad ─────────────────────────────────────── */
  let dotTimer = null;

  function blinkDot() {
    const dot = document.getElementById("smStatusDot");
    if (!dot) return;
    dot.classList.add("sm-active");
    clearTimeout(dotTimer);
    dotTimer = setTimeout(() => dot.classList.remove("sm-active"), 600);
  }

  /* ── Historial de comandos ────────────────────────────────── */
  const cmdHistory = [];
  let historyIdx = -1;

  function pushHistory(cmd) {
    if (cmd && cmdHistory[cmdHistory.length - 1] !== cmd) {
      cmdHistory.push(cmd);
      if (cmdHistory.length > 100) cmdHistory.shift();
    }
    historyIdx = -1;
  }

  /* ── Enviar comando ───────────────────────────────────────── */
  async function sendCommand(raw) {
    const input = document.getElementById("smCommandInput");
    const cmd   = raw != null ? raw : (input?.value.trim() ?? "");

    if (!smTerm) initSmTerminal();

    if (!getIsConnected()) {
      smTerm?.writeln("\x1b[33m⚠  Sin conexión — conecta el dispositivo primero\x1b[0m");
      return;
    }

    if (!cmd) return;

    const lineEnding = document.getElementById("smLineEnding")?.value ?? "\r\n";

    smTerm?.writeln(`\x1b[33m>>> ${cmd}\x1b[0m`);
    if (autoScroll) smTerm?.scrollToBottom();

    pushHistory(cmd);
    if (input) input.value = "";

    const fn = getSendFn();
    if (fn) {
      try { await fn(cmd + lineEnding); }
      catch (e) { smTerm?.writeln(`\x1b[31mError al enviar: ${e.message}\x1b[0m`); }
    } else {
      smTerm?.writeln("\x1b[31m⚠ No hay conexión serial activa\x1b[0m");
    }
  }

  /* ── Control de tamaño de texto ──────────────────────────── */
  const SM_SIZES     = ["S", "M", "L", "XL"];
  const SM_FONTSIZES = [10,   12,  15,  19];
  let smSizeIdx = 1;

  function smApplySize() {
    const disp = document.getElementById("smSizeDisplay");
    const fill = document.getElementById("smSizeFill");
    if (disp) disp.textContent = SM_SIZES[smSizeIdx];
    if (fill) fill.style.width = (smSizeIdx / (SM_SIZES.length - 1) * 100) + "%";
    if (smTerm) { smTerm.options.fontSize = SM_FONTSIZES[smSizeIdx]; smFit?.fit(); }
    try { localStorage.setItem("sm-font-size", smSizeIdx); } catch (_) {}
  }

  /* ── Subir código al ESP32 ────────────────────────────────── */
  /**
   * Fuente seleccionable:
   *   • Bloques → Blockly.Python al vuelo
   *   • Archivo → archivo cargado con 📂
   * Tamaño:
   *   • < 256 B → paste mode
   *   • ≥ 256 B → raw REPL con barra de progreso (vía sendViaRawRepl de main.js)
   */
  async function uploadCode() {
    if (!smTerm) initSmTerminal();

    if (!getIsConnected()) {
      smTerm?.writeln("\x1b[33m⚠  Sin conexión — conecta el dispositivo primero\x1b[0m");
      return;
    }

    // ── Leer fuente seleccionada ──────────────────────────────
    const srcFile   = document.getElementById("smSrcFile");
    const source    = srcFile?.checked ? "file" : "blocks";

    let codeStr = "";

    if (source === "file") {
      if (!_loadedFileContent) {
        smTerm.writeln("\x1b[33m⚠  Carga un archivo con 📂 primero\x1b[0m");
        return;
      }
      codeStr = _loadedFileContent;
    } else {
      // Bloques → Python al vuelo
      if (typeof Blockly !== "undefined" && typeof Code !== "undefined" && Code.workspace) {
        try { codeStr = Blockly.Python.workspaceToCode(Code.workspace); }
        catch (e) { smTerm.writeln(`\x1b[31m⚠  Error generando código: ${e.message}\x1b[0m`); return; }
      } else {
        smTerm.writeln("\x1b[33m⚠  Blockly no disponible — cambia la fuente a 📂 Archivo\x1b[0m");
        return;
      }
      if (!codeStr?.trim()) {
        smTerm.writeln("\x1b[33m⚠  El workspace está vacío — añade bloques primero\x1b[0m");
        return;
      }
    }

    // ── Nombre del archivo destino ────────────────────────────
    const nameInput = document.getElementById("smFileNameInput");
    const rawName   = nameInput?.value.trim() || _loadedFileName || "test.py";

    if (typeof isSafeFileName === "function" && !isSafeFileName(rawName)) {
      smTerm.writeln(`\x1b[31m⚠  Nombre no válido: "${rawName}"\x1b[0m`);
      return;
    }

    const fileName  = rawName;
    const fn        = getSendFn();
    if (!fn) { smTerm.writeln("\x1b[31m⚠  No hay función serial activa\x1b[0m"); return; }

    const srcLabel = source === "blocks" ? "⬛ Bloques" : "📂 Archivo";
    smTerm.writeln(`\x1b[36m↑  [${srcLabel}] Subiendo '${fileName}' (${codeStr.length} bytes)...\x1b[0m`);

    const uploadBtn = document.getElementById("smUploadBtn");
    if (uploadBtn) uploadBtn.disabled = true;

    try {
      notifySending(codeStr);

      const writeScript = [
        `_f = open('${fileName}', 'w')`,
        `_f.write(${JSON.stringify(codeStr)})`,
        `_f.close()`,
        `del _f`,
        `print('OK:${fileName}')`,
      ].join("\n");

      const scriptLen = new TextEncoder().encode(writeScript).length;

      if (scriptLen < 256) {
        // Paste mode directo
        await fn("\x03"); await _sleep(80);
        await fn("\x05"); await _sleep(60);
        await fn(writeScript);
        await fn("\r\n");
        await fn("\x04");
        await _sleep(300);
      } else {
        // Raw REPL con barra de progreso (delegamos a main.js)
        if (typeof sendViaRawRepl === "function") {
          const ok = await sendViaRawRepl(writeScript);
          if (!ok) { smTerm.writeln("\x1b[31m⚠  No se pudo entrar en raw REPL. Reintenta.\x1b[0m"); return; }
        } else {
          // Fallback mínimo si main.js no expone sendViaRawRepl
          await fn("\x03"); await _sleep(80);
          await fn("\x03"); await _sleep(80);
          await fn("\x01"); await _sleep(300);
          const bytes = new TextEncoder().encode(writeScript);
          const CHUNK = 256;
          if (typeof serialWriter !== "undefined" && serialWriter) {
            for (let i = 0; i < bytes.length; i += CHUNK) {
              await serialWriter.write(bytes.slice(i, i + CHUNK));
            }
          } else {
            await fn(writeScript);
          }
          await fn("\x04"); await _sleep(500);
          await fn("\x02"); await _sleep(100);
        }
      }

      smTerm.writeln(`\x1b[32m✔  '${fileName}' guardado correctamente\x1b[0m`);

      if (source === "file") { _loadedFileContent = null; _loadedFileName = null; }

    } catch (err) {
      smTerm.writeln(`\x1b[31mError al subir: ${err.message}\x1b[0m`);
      console.error("[SerialMonitor] uploadCode error:", err);
    } finally {
      if (uploadBtn) uploadBtn.disabled = false;
      notifyDone();
    }
  }

  /* ── Sleep interno ────────────────────────────────────────── */
  function _sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

  /* ── Limpieza de texto serial ─────────────────────────────── */
  function cleanLowLevel(text) {
    text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
    text = text.replace(/\x1B\[[\d;?]*[A-Za-z]/g, "");
    text = text.replace(/\x1B[()][A-Z0-9]/g, "");
    text = text.replace(/[\x80-\xFF]/g, "");
    return text;
  }

  function colorizeErrors(line) {
    const isError =
      /^Traceback/.test(line)  ||
      /^\s+File "/.test(line)  ||
      /\w+Error:/.test(line)   ||
      /^Exception/.test(line);
    return isError ? `\x1b[31m${line}\x1b[0m` : line;
  }

  /* ── Helpers internos de copia ────────────────────────────── */
  function _getFullTerminalText() {
    if (!smTerm) return "";
    const buffer = smTerm.buffer.active;
    const lines  = [];
    for (let i = 0; i < buffer.length; i++) {
      const line = buffer.getLine(i);
      if (line) lines.push(line.translateToString(true));
    }
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    return lines.join("");
  }

  function _smToast(msg) {
    document.getElementById("smToast")?.remove();
    const toast = document.createElement("div");
    toast.id = "smToast";
    toast.textContent = msg;
    toast.style.cssText = [
      "position:fixed", "z-index:9999",
      "background:#3454d1", "color:#e8eeff",
      "font-family:Consolas,monospace", "font-size:11px",
      "padding:4px 12px", "border-radius:4px",
      "box-shadow:0 2px 8px rgba(0,0,0,.5)",
      "pointer-events:none", "opacity:1",
      "transition:opacity .4s ease",
    ].join(";");
    const modal = document.getElementById("serialMonitorModal");
    if (modal) {
      const r = modal.getBoundingClientRect();
      toast.style.left = (r.left + 10) + "px";
      toast.style.top  = (r.top  - 28) + "px";
    } else {
      toast.style.bottom = "72px"; toast.style.right = "28px";
    }
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = "0"; }, 1200);
    setTimeout(() => toast.remove(), 1700);
  }

  /* ── feed(chunk) — desde readSerialLoop ──────────────────── */
  /**
   * Acumula en lineBuffer hasta tener líneas completas.
   * Suprime el bloque paste mode con máquina de estados simple.
   * No se queda atascada: suppressingPaste se limpia en notifyDone().
   */
  function feed(rawChunk) {
    if (!smTerm) return;

    const cleaned = cleanLowLevel(rawChunk);
    if (!cleaned) return;

    blinkDot();
    lineBuffer += cleaned;

    const parts = lineBuffer.split("\n");
    lineBuffer  = parts.pop(); // fragmento incompleto

    const now = showTimestamp ? new Date().toLocaleTimeString() : null;

    for (const rawLine of parts) {
      const line = rawLine.replace(/\r/g, "");

      // ── Máquina de estados paste-mode ──
      if (/paste mode/i.test(line))        { suppressingPaste = true;  continue; }
      if (suppressingPaste && /^={3,}\s*$/.test(line)) { suppressingPaste = false; continue; }
      if (suppressingPaste)                              { continue; }

      // Suprimir prompt vacío y eco del REPL
      if (/^>>>\s*$/.test(line)) continue;

      // Línea vacía
      if (!line.trim()) continue;

      const colored = colorizeErrors(line);
      const output  = now ? `\x1b[2m[${now}]\x1b[0m ${colored}` : colored;
      smTerm.writeln(output);
    }

    if (autoScroll) smTerm.scrollToBottom();
  }

  /* ── notifySending / notifyDone ───────────────────────────── */
  function notifySending(code) {
    lineBuffer       = "";
    suppressingPaste = false;

    // Mostrar las líneas del código en el monitor (igual que BIPES)
    if (!smTerm || !code) return;
    smTerm.writeln("\x1b[36m─────────────── Enviando código ───────────────\x1b[0m");
    const lines = code.replace(/\r/g, "").split("\n");
    for (const line of lines) {
      if (!line.trim()) continue;
      smTerm.writeln("\x1b[96m  " + line + "\x1b[0m");
    }
    smTerm.writeln("\x1b[36m───────────────────────────────────────────────\x1b[0m");
    if (autoScroll) smTerm.scrollToBottom();
  }

  function notifyDone() {
    suppressingPaste = false;
    lineBuffer       = "";
  }

  /* ── warn ─────────────────────────────────────────────────── */
  function warn(msg) {
    if (!smTerm) initSmTerminal();
    if (!smTerm) return;
    smTerm.writeln(`\x1b[33m⚠  ${msg}\x1b[0m`);
    if (autoScroll) smTerm.scrollToBottom();
    blinkDot();
  }

  /* ── fitTerminal ──────────────────────────────────────────── */
  function fitTerminal() {
    if (smFit && smTerm) smFit.fit();
  }

  /* ── initDeps ─────────────────────────────────────────────── */
  function initDeps({ sendFn, isConnectedFn } = {}) {
    if (sendFn)        _sendFn        = sendFn;
    if (isConnectedFn) _isConnectedFn = isConnectedFn;
  }

  /* ── Eventos de UI ────────────────────────────────────────── */
  function bindEvents() {
    const modal    = document.getElementById("serialMonitorModal");
    const titleBar = document.getElementById("smTitleBar");
    const closeBtn = document.getElementById("smCloseBtn");
    const minBtn   = document.getElementById("smMinBtn");
    const clearBtn = document.getElementById("smClearBtn");
    const sendBtn  = document.getElementById("smSendBtn");
    const cmdInput = document.getElementById("smCommandInput");
    const autoChk  = document.getElementById("smAutoScroll");
    const tsChk    = document.getElementById("smTimestamp");

    closeBtn?.addEventListener("click", close);
    minBtn?.addEventListener("click", () => {
      modal.classList.contains("sm-minimized") ? restore() : minimize();
    });

    // Tamaño de texto
    try {
      const saved = parseInt(localStorage.getItem("sm-font-size"), 10);
      if (!isNaN(saved) && saved >= 0 && saved < SM_SIZES.length) smSizeIdx = saved;
    } catch (_) {}

    document.getElementById("smSizeUp")?.addEventListener("click", () => {
      if (smSizeIdx < SM_SIZES.length - 1) { smSizeIdx++; smApplySize(); }
    });
    document.getElementById("smSizeDown")?.addEventListener("click", () => {
      if (smSizeIdx > 0) { smSizeIdx--; smApplySize(); }
    });
    document.getElementById("smSizeTrack")?.addEventListener("click", (e) => {
      const rect = document.getElementById("smSizeTrack").getBoundingClientRect();
      smSizeIdx  = Math.round((e.clientX - rect.left) / rect.width * (SM_SIZES.length - 1));
      smSizeIdx  = Math.max(0, Math.min(SM_SIZES.length - 1, smSizeIdx));
      smApplySize();
    });

    clearBtn?.addEventListener("click", () => {
      if (smTerm) smTerm.clear();
      lineBuffer = ""; suppressingPaste = false;
    });

    sendBtn?.addEventListener("click",  () => sendCommand());
    cmdInput?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); sendCommand();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!cmdHistory.length) return;
        historyIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
        cmdInput.value = cmdHistory[cmdHistory.length - 1 - historyIdx] || "";
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIdx <= 0) { historyIdx = -1; cmdInput.value = ""; return; }
        historyIdx--;
        cmdInput.value = cmdHistory[cmdHistory.length - 1 - historyIdx] || "";
      }
    });

    autoChk?.addEventListener("change", (e) => { autoScroll    = e.target.checked; });
    tsChk?.addEventListener("change",   (e) => { showTimestamp = e.target.checked; });

    document.getElementById("smUploadBtn")?.addEventListener("click", () => uploadCode());

    // 📂 Cargar archivo local
    const pickBtn      = document.getElementById("smPickFileBtn");
    const pickerInput  = document.getElementById("smFilePickerInput");

    pickBtn?.addEventListener("click", () => pickerInput?.click());
    pickerInput?.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      document.getElementById("smSrcFile").checked = true;
      const nameInput = document.getElementById("smFileNameInput");
      if (nameInput) nameInput.value = file.name;

      const reader = new FileReader();
      reader.onload = (ev) => {
        _loadedFileContent = ev.target.result;
        _loadedFileName    = file.name;
        if (!smTerm) initSmTerminal();
        const lines   = _loadedFileContent.split("\n");
        const preview = lines.slice(0, 6).map((l) => "  " + l).join("\r\n");
        smTerm.writeln(`\x1b[36m📂 Archivo cargado: ${file.name} (${lines.length} líneas)\x1b[0m`);
        smTerm.writeln("\x1b[2m" + preview + (lines.length > 6 ? "\r\n  ..." : "") + "\x1b[0m");
        if (autoScroll) smTerm.scrollToBottom();
      };
      reader.readAsText(file);
      e.target.value = "";
    });

    if (modal && titleBar) enableDrag(modal, titleBar);
  }

  /* ── Init ─────────────────────────────────────────────────── */
  function init() {
    injectHTML();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  return {
    feed,
    open,
    close,
    toggle,
    sendCommand,
    notifySending,
    notifyDone,
    warn,
    fitTerminal,
    init: initDeps,
  };
})();

/* ─────────────────────────────────────────────────────────────
   refreshTerminalFit — alias global
   Llamado desde main.js y viewcode.js para sincronizar
   ambas terminales (xterm principal + monitor serial flotante).
───────────────────────────────────────────────────────────── */
// NOTA: esta función está definida en viewcode.js y llama a
// SerialMonitor.fitTerminal() internamente.
// No se redefine aquí para no pisarla.