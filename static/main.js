/**
 * main.js — 3DPit IDE
 * WebSerial + Blockly + CodeMirror
 */

// ─────────────────────────────────────────────────────────────
// NAMESPACE & FLAGS
// ─────────────────────────────────────────────────────────────
var Code = {};
let IS_DESKTOP = typeof window.pywebview !== "undefined";
window.addEventListener("pywebviewready", () => { IS_DESKTOP = true; });

const DEBUG = false;

// ─────────────────────────────────────────────────────────────
// BLOCKLY
// ─────────────────────────────────────────────────────────────
Code.workspace = Blockly.inject("blocklyDiv", {
  scrollbars: true,
  trashcan: true,
  undo: true,
  grid: { spacing: 20, length: 3, colour: "#ccc", snap: true },
  media: "./static/media/",
  toolbox: document.getElementById("toolbox"),
  oneBasedIndex: false,
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
  },
});

const screenshotBtnEl = addScreenshotButton(Code.workspace);
const { container: undoRedoContainer, undoBtn, redoBtn } = addUndoRedoButtons(Code.workspace);
window.FLOATING = [screenshotBtnEl, undoRedoContainer].filter(Boolean);

Code.generateCode = function (generator = Blockly.Python) {
  if (Code.auto_mode || this.constructor.name !== "Window") {
    if (Code.checkAllGeneratorFunctionsDefined(generator)) {
      return generator.workspaceToCode(Code.workspace);
    } else {
      Code.auto_mode = false;
    }
  }
};

// ─────────────────────────────────────────────────────────────
// WEB SERIAL CHECK
// ─────────────────────────────────────────────────────────────
if (!navigator.serial && !IS_DESKTOP) {
  console.log("Tu navegador no soporta Web Serial...");
  throw new Error("Web Serial no disponible");
}

// ─────────────────────────────────────────────────────────────
// VALIDACIÓN DE NOMBRES DE ARCHIVO
// ─────────────────────────────────────────────────────────────
const SAFE_FILENAME_RE = /^[\w\-][.\w\-]{0,62}\.(py|txt|json|csv|log|mpy|html|js|css)$/i;

function isSafeFileName(name) {
  return typeof name === "string" && SAFE_FILENAME_RE.test(name);
}

function requireSafeFileName(name) {
  if (!isSafeFileName(name)) {
    const msg = `Nombre de archivo no válido: "${name}"`;
    term && term.writeln(`\r\n⚠ ${msg}\r\n`);
    throw new Error(msg);
  }
  return name;
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function blurBlockly() {
  try {
    const svg = Code.workspace?.getParentSvg?.();
    if (svg) svg.blur();
  } catch (e) { }
}

function updateCodeFromBlockly() {
  const code = Blockly.Python.workspaceToCode(Code.workspace);
  editor.setValue(code);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function debounce(fn, wait = 120) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

// ─────────────────────────────────────────────────────────────
// CODEMIRROR
// ─────────────────────────────────────────────────────────────
const editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
  mode: "python",
  theme: "dracula",
  lineNumbers: true,
  lineWrapping: true,
  indentUnit: 2,
  tabSize: 2,
});

// ─────────────────────────────────────────────────────────────
// VISTAS
// ─────────────────────────────────────────────────────────────
let isWorkSpace = true;

function refreshBlockly() {
  if (!Code.workspace) return;
  const svg = Code.workspace.getParentSvg();
  const blocklyDiv = document.getElementById("blocklyDiv");
  const w = blocklyDiv.clientWidth;
  const h = blocklyDiv.clientHeight;
  if (w === 0 || h === 0) return;
  svg.style.width = w + "px";
  svg.style.height = h + "px";
  Blockly.svgResize(Code.workspace);
}

function showView(viewId) {
  Blockly.hideChaff(true);
  isWorkSpace = viewId === "viewBlocks";

  document.querySelectorAll(".view").forEach((v) => {
    v.classList.remove("active");
    v.style.display = "none";
  });

  const view = document.getElementById(viewId);
  view.classList.add("active");
  view.style.display = "block";

  if (viewId === "viewBlocks") {
    document.getElementById("viewBlocks").style.display = "block";
    document.getElementById("viewCode").style.display = "none";
    setTimeout(() => {
      Blockly.svgResize(Code.workspace);
      window.dispatchEvent(new Event("resize"));
    }, 50);
  } else {
    document.body.classList.remove("body--no-blockly-ui");
    toggleFloating(true);
    requestAnimationFrame(() => requestAnimationFrame(() => refreshBlockly()));
  }
}

document.getElementById("btnCode").addEventListener("click", function () {
  updateCodeFromBlockly();
  showView("viewCode");
  isWorkSpace = false;
  requestAnimationFrame(() => {
    editor.refresh();
    refreshTerminalFit();
  });
});

document.getElementById("btnBlocks").addEventListener("click", () => showView("viewBlocks"));
document.getElementById("btnWiring").addEventListener("click", () => showView("viewWiring"));

// ─────────────────────────────────────────────────────────────
// AUTOSAVE
// ─────────────────────────────────────────────────────────────
const AUTOSAVE_KEY = "blockly_autosave_workspace";
let autosaveTimer = null;
const AUTOSAVE_DELAY = 800;
let isRestoring = false;

function autoSaveWorkspace() {
  const xmlDom = Blockly.Xml.workspaceToDom(Code.workspace);
  localStorage.setItem(AUTOSAVE_KEY, Blockly.Xml.domToText(xmlDom));
}

function autoSaveWorkspacePython() {
  const xmlDom = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
  const xmlText = Blockly.Xml.domToText(xmlDom);
  if (window.pywebview?.api?.autosave_xml) {
    window.pywebview.api.autosave_xml(xmlText);
  }
}

Code.workspace.addChangeListener((event) => {
  if (event.isUiEvent || event.type === Blockly.Events.UI) return;
  if (isRestoring) return;
  const isDesktop = typeof window.pywebview !== "undefined" && !!window.pywebview?.api;
  if (isDesktop) {
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(autoSaveWorkspacePython, AUTOSAVE_DELAY);
  } else {
    autoSaveWorkspace();
  }
});

function restoreWorkspaceFromLocal() {
  const xmlText = localStorage.getItem(AUTOSAVE_KEY);
  if (!xmlText) return;
  try {
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xmlText), Code.workspace);
  } catch (e) {
    console.warn("No se pudo restaurar el workspace");
  }
}

async function restoreWorkspaceFromPython() {
  let attempts = 0;
  while (!window.pywebview?.api?.load_autosave && attempts < 20) {
    await sleep(100);
    attempts++;
  }
  if (!window.pywebview?.api?.load_autosave) return;
  const xmlText = await window.pywebview.api.load_autosave();
  if (!xmlText) return;
  try {
    isRestoring = true;
    Blockly.Xml.clearWorkspaceAndLoadFromXml(
      Blockly.Xml.textToDom(xmlText),
      Blockly.getMainWorkspace()
    );
  } catch (e) {
    console.warn("No se pudo restaurar autosave", e);
  } finally {
    isRestoring = false;
  }
}

window.addEventListener("pywebviewready", () => {
  IS_DESKTOP = true;
  restoreWorkspaceFromPython();
  startTutorial();
});

if (!IS_DESKTOP) {
  setTimeout(() => { if (!IS_DESKTOP) restoreWorkspaceFromLocal(); }, 500);
}

// ─────────────────────────────────────────────────────────────
// NUEVO ARCHIVO
// ─────────────────────────────────────────────────────────────
document.getElementById("btnNew").addEventListener("click", async function () {
  showView("viewBlocks");
  const confirmDelete = await showCustomConfirm();
  if (!confirmDelete) return;

  Blockly.Events.disable();
  try {
    Code.workspace?.clear();
    if (typeof editor !== "undefined") editor.setValue("");
    else { const a = document.getElementById("codeArea"); if (a) a.value = ""; }
    localStorage.removeItem(AUTOSAVE_KEY);
    if (window.pywebview?.api?.clear_autosave) await window.pywebview.api.clear_autosave();
  } catch (error) {
    console.error("Error al crear nuevo archivo:", error);
  }
  Blockly.Events.enable();
});

// ─────────────────────────────────────────────────────────────
// GUARDAR ARCHIVO (web + desktop)
// ─────────────────────────────────────────────────────────────
async function saveFileAuto(content, fileName = "") {
  try {
    let extension = "txt", mimeType = "text/plain", isBase64 = false;
    if (typeof content === "string" && content.startsWith("data:image/png")) {
      extension = "png"; mimeType = "image/png"; isBase64 = true;
    } else {
      const ext = fileName.split(".").pop().toLowerCase();
      if (ext === "xml")  { extension = "xml";  mimeType = "text/xml"; }
      else if (ext === "py") { extension = "py"; mimeType = "text/x-python"; }
      else if (ext === "json") { extension = "json"; mimeType = "application/json"; }
      if (extension === "txt" && content.trim().startsWith("<")) {
        extension = "xml"; mimeType = "text/xml";
      }
    }
    const suggestedName = fileName?.includes(".") ? fileName : `archivo.${extension}`;
    const handle = await window.showSaveFilePicker({
      suggestedName,
      types: [{ description: `Archivo ${extension.toUpperCase()}`, accept: { [mimeType]: [`.${extension}`] } }],
    });
    const writable = await handle.createWritable();
    if (isBase64) {
      const binary = atob(content.split(",")[1]);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      await writable.write(bytes);
    } else {
      await writable.write(content);
    }
    await writable.close();
  } catch (err) {
    if (err.name !== "AbortError") console.error("Error real al guardar:", err);
  }
}

document.getElementById("btnSave").addEventListener("click", async (e) => {
  e.preventDefault();
  const xmlText = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
  if (window.pywebview?.api?.save_xml) {
    const result = await window.pywebview.api.save_xml(xmlText);
    if (result?.status === "ok" && DEBUG) console.log("Guardado en:", result.path);
  } else {
    await saveFileAuto(xmlText, "proyecto.xml");
  }
});

document.getElementById("btnLoad").addEventListener("click", () => document.getElementById("loadXML").click());

document.getElementById("loadXML").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      Code.workspace.clear();
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(e.target.result), Code.workspace);
      updateCodeFromBlockly();
      requestAnimationFrame(() => editor.refresh());
    } catch (err) { console.error(err); }
  };
  reader.readAsText(file);
  event.target.value = "";
  showView("viewBlocks");
});

async function reloadWorkspace() {
  Blockly.Events.disable();
  try {
    let xmlText = window.pywebview?.api?.load_autosave
      ? await window.pywebview.api.load_autosave()
      : localStorage.getItem("blockly_autosave_workspace");
    if (!xmlText) return;
    Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(xmlText), Code.workspace);
  } catch (e) { console.error("Error al recargar workspace", e); }
  Blockly.Events.enable();
}

document.getElementById("btnReload").addEventListener("click", () => location.reload());

document.getElementById("btnSavePy").addEventListener("click", async (e) => {
  e.preventDefault();
  const fileName = document.getElementById("fileNameInput").value.trim() || "test.py";
  const code = editor.getValue();
  if (window.pywebview?.api?.save_py) {
    const result = await window.pywebview.api.save_py(code, fileName);
    if (result?.status === "ok" && DEBUG) console.log(`Guardado ${fileName} en:`, result.path);
  } else {
    await saveFileAuto(code, fileName);
  }
});

document.getElementById("btnLoadPy").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("loadPy").click();
});

document.getElementById("loadPy").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => editor.setValue(e.target.result);
  reader.readAsText(file);
  event.target.value = "";
});

// ─────────────────────────────────────────────────────────────
// MODALES
// ─────────────────────────────────────────────────────────────
function showCustomConfirm(message = "¿Deseas continuar?") {
  return new Promise((resolve) => {
    const modal = document.getElementById("customModal");
    const msg = document.getElementById("modalMessage");
    const btnAccept = document.getElementById("modalAccept");
    const btnCancel = document.getElementById("modalCancel");
    if (!modal || !msg || !btnAccept || !btnCancel) { resolve(false); return; }
    msg.textContent = message;
    btnCancel.style.display = "inline-block";
    btnAccept.textContent = "Aceptar";
    modal.style.display = "flex";
    btnAccept.onclick = () => { modal.style.display = "none"; resolve(true); };
    btnCancel.onclick = () => { modal.style.display = "none"; resolve(false); };
  });
}

function showMessageModal(message) {
  const modal = document.getElementById("customModal");
  const msg = document.getElementById("modalMessage");
  const btnAccept = document.getElementById("modalAccept");
  const btnCancel = document.getElementById("modalCancel");
  if (!modal || !msg || !btnAccept) { console.log(message); return; }
  msg.textContent = message;
  btnCancel.style.display = "none";
  btnAccept.textContent = "OK: ";
  modal.style.display = "flex";
  btnAccept.onclick = () => { modal.style.display = "none"; };
}

window.addEventListener("DOMContentLoaded", () => { startTutorial(); });

// ─────────────────────────────────────────────────────────────
// WEBSERIAL — Estado global
// ─────────────────────────────────────────────────────────────
let serialPort   = null;
let serialReader = null;
let serialWriter = null;
let isConnected  = false;
let isSendingCode = false;
let isWorkSpace2 = true;  // alias interno para claridad
let serialConnected = false;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

let serialBuffer    = "";
let waitingResponse = false;
let isFileOperationBusy = false;

// ─────────────────────────────────────────────────────────────
// CONNECT
// ─────────────────────────────────────────────────────────────
async function connectSerial() {
  try {
    if (!term) { initTerminal(); enableTerminalInput(); }

    serialPort = await navigator.serial.requestPort();
    await serialPort.open({ baudRate: 115200, dataBits: 8, stopBits: 1, parity: "none", flowControl: "none" });

    serialWriter = serialPort.writable.getWriter();
    serialReader = serialPort.readable.getReader();

    isConnected = true;
    serialConnected = true;
    updateConnectionIcon(true);
    term.writeln("MicroPython Terminal\r\n");
    await sendSerial("\x03");
    readSerialLoop();
  } catch (error) {
    if (term) term.writeln("\r\nError conexión: " + error);
    else console.error(error);
  }
}

// ─────────────────────────────────────────────────────────────
// DISCONNECT
// ─────────────────────────────────────────────────────────────
let isDisconnecting = false;

async function disconnectSerial() {
  if (isDisconnecting) return;
  isDisconnecting = true;
  try {
    isConnected = false;
    serialConnected = false;
    updateConnectionIcon(false);

    if (serialReader) {
      try { await serialReader.cancel(); } catch { }
      try { serialReader.releaseLock(); } catch { }
      serialReader = null;
    }
    if (serialWriter) {
      try { await serialWriter.close(); } catch { }
      try { serialWriter.releaseLock(); } catch { }
      serialWriter = null;
    }
    if (serialPort?.readable) { try { await serialPort.close(); } catch { } }
    serialPort = null;

    term.writeln("\r\nDesconectado\r\n");

    const btnConnect    = document.getElementById("btnConnect");
    const btnDisconnect = document.getElementById("btnDisconnect");
    if (btnConnect)    btnConnect.disabled = false;
    if (btnDisconnect) btnDisconnect.disabled = true;

    clearExplorer();
  } catch (error) {
    if (error.name !== "NetworkError" && error.name !== "InvalidStateError") {
      console.error(error);
      term.writeln("\r\nError al desconectar\r\n");
    }
  } finally {
    resetSerialState();
    isDisconnecting = false;
  }
}

// ─────────────────────────────────────────────────────────────
// READ LOOP
// ─────────────────────────────────────────────────────────────
async function readSerialLoop() {
  try {
    while (isConnected) {
      const { value, done } = await serialReader.read();
      if (done) { term.writeln("\r\nPuerto cerrado\r\n"); await disconnectSerial(); break; }
      if (value) {
        const chunk = decoder.decode(value, { stream: true });

        // Mostrar en terminal principal
        term.write(chunk);

        // Alimentar monitor serial
        if (typeof SerialMonitor !== "undefined") SerialMonitor.feed(chunk);

        // Hook para raw REPL (buffer local aislado)
        if (typeof window._rawReplHook === "function") window._rawReplHook(chunk);

        // Buffer para operaciones de archivo
        if (waitingResponse) serialBuffer += chunk;
      }
    }
  } catch (error) {
    if (isConnected) {
      term.writeln("\r\nConexión perdida\r\n");
      await disconnectSerial();
    }
  }
}

// ─────────────────────────────────────────────────────────────
// SEND
// ─────────────────────────────────────────────────────────────
async function sendSerial(data) {
  if (!serialWriter || !data || data.length === 0) return;
  await serialWriter.write(encoder.encode(data));
}

// ─────────────────────────────────────────────────────────────
// TERMINAL INPUT (xterm → serial)
// ─────────────────────────────────────────────────────────────
function enableTerminalInput() {
  term.onData(async (data) => {
    if (!isConnected || isSendingCode) return;
    if (DEBUG) console.log("DATA:", JSON.stringify(data));
    await sendSerial(data);
  });
}

// ─────────────────────────────────────────────────────────────
// BOTÓN CONEXIÓN
// ─────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const btnConnection = document.getElementById("btnConnection");
  if (!btnConnection) return;
  updateConnectionIcon(false);
  btnConnection.addEventListener("click", async () => {
    if (serialConnected) await disconnectSerial();
    else await connectSerial();
  });
});

// ─────────────────────────────────────────────────────────────
// EVENTOS USB
// ─────────────────────────────────────────────────────────────
navigator.serial.addEventListener("disconnect", async (event) => {
  if (serialPort && event.target === serialPort) {
    term.writeln("\r\nDispositivo desconectado físicamente\r\n");
    await disconnectSerial();
  }
});

navigator.serial.addEventListener("connect", () => {
  term.writeln("\r\nDispositivo USB detectado\r\n");
});

function updateConnectionIcon(connected) {
  const icon = document.getElementById("iconConnection");
  if (!icon) return;
  icon.classList.remove("icon-connect", "icon-disconnect");
  icon.classList.add(connected ? "icon-connect" : "icon-disconnect");
}

// ─────────────────────────────────────────────────────────────
// GET CODE (Blockly → Python, o editor)
// ─────────────────────────────────────────────────────────────
function getCode() {
  if (typeof Blockly !== "undefined" && Code?.workspace) {
    return Blockly.Python.workspaceToCode(Code.workspace);
  }
  if (typeof editor !== "undefined" && editor.getValue) {
    return editor.getValue();
  }
  return "";
}

// ─────────────────────────────────────────────────────────────
// RAW REPL — con barra de progreso en terminal
// ─────────────────────────────────────────────────────────────
/**
 * Envía código al ESP32 usando raw REPL (Ctrl+A).
 * Muestra progreso en bytes enviados / total.
 *
 * Protocolo:
 *   Ctrl+C x2  → interrumpir
 *   Ctrl+A     → entrar en raw REPL (responde ">")
 *   data       → bloques de CHUNK bytes con confirmación
 *   Ctrl+D     → ejecutar
 *   Ctrl+B     → salir a friendly REPL
 *
 * @param {string} codeStr   Código Python a enviar
 * @param {number} [chunkSz=256]  Tamaño de bloque en bytes
 * @returns {Promise<boolean>}
 */
async function sendViaRawRepl(codeStr, chunkSz = 256) {
  if (!serialReader || !serialWriter) return false;

  // Buffer local — no comparte estado con Files ni readResponse
  let _localBuf = "";
  window._rawReplHook = (chunk) => { _localBuf += chunk; };

  async function _waitLocal(token, timeoutMs) {
    const end = Date.now() + timeoutMs;
    while (Date.now() < end) {
      if (_localBuf.includes(token)) return true;
      await sleep(20);
    }
    return false;
  }

  try {
    // 1. Interrumpir ejecución actual
    await sendSerial("\x03"); await sleep(80);
    await sendSerial("\x03"); await sleep(80);

    // 2. Entrar en raw REPL
    _localBuf = "";
    await sendSerial("\x01");
    let gotPrompt = await _waitLocal(">", 2000);
    if (!gotPrompt) {
      await sendSerial("\r\n"); await sleep(60);
      _localBuf = "";
      await sendSerial("\x01");
      gotPrompt = await _waitLocal(">", 2000);
      if (!gotPrompt) return false;
    }

    // 3. Enviar código en bloques con progreso
    const bytes  = encoder.encode(codeStr);
    const total  = bytes.length;
    let sent     = 0;

    // Mostrar barra de inicio
    term.write(`\r\n\x1b[36m↑ Enviando ${total} bytes\x1b[0m `);

    while (sent < total) {
      const end   = Math.min(sent + chunkSz, total);
      const slice = bytes.slice(sent, end);
      await serialWriter.write(slice);
      sent = end;

      // Actualizar barra de progreso en la misma línea
      const pct   = Math.round((sent / total) * 100);
      const bars  = Math.round(pct / 5);          // 20 bloques máx
      const bar   = "█".repeat(bars) + "░".repeat(20 - bars);
      term.write(`\r\x1b[36m↑ [${bar}] ${pct}% (${sent}/${total} B)\x1b[0m `);

      // Pequeña pausa cada 4 KB para no saturar el buffer USB
      if (sent % (chunkSz * 16) === 0 && sent < total) {
        await sleep(10);
      }
    }

    term.write("\r\n");

    // 4. Ejecutar (Ctrl+D)
    _localBuf = "";
    await sendSerial("\x04");
    await _waitLocal("\x04", 10000);

    // 5. Volver a friendly REPL
    //await sendSerial("\x02");
    //await sleep(100);

    return true;

  } finally {
    window._rawReplHook = null;
  }
}

// ─────────────────────────────────────────────────────────────
// BOTÓN: EJECUTAR
// ─────────────────────────────────────────────────────────────
btnRun.addEventListener("click", async () => {
  if (!isConnected || !serialWriter) {
    if (typeof SerialMonitor !== "undefined")
      SerialMonitor.warn("Sin conexión — conecta el dispositivo primero");
    return;
  }

  const code = getCode();
  if (!code?.trim()) { term.writeln("\r\nNo hay código para ejecutar\r\n"); return; }

  try {
    isSendingCode = true;
    // Mostrar las líneas del código en la terminal (igual que BIPES)
    term.writeln("\r\n\x1b[36m─────────────── Enviando código ───────────────\x1b[0m");
    code.replace(/\r/g, "").split("\n").forEach((line) => {
      if (line.trim()) term.writeln("\x1b[96m  " + line + "\x1b[0m");
    });
    term.writeln("\x1b[36m───────────────────────────────────────────────\x1b[0m\r\n");
    if (typeof SerialMonitor !== "undefined") SerialMonitor.notifySending(code);

    const bytes = encoder.encode(code);

    if (bytes.length < 256) {
      // Paste mode — rápido para código pequeño
      await sendSerial("\x03"); await sleep(80);
      await sendSerial("\x05"); await sleep(60);
      await sendSerial(code);
      await sendSerial("\r\n");
      await sendSerial("\x04");
    } else {
      // Raw REPL — sin límite de tamaño, con progreso
      const ok = await sendViaRawRepl(code);
      if (!ok) term.writeln("\r\n⚠ No se pudo entrar en raw REPL. Reintenta.\r\n");
    }
  } finally {
    isSendingCode = false;
    if (typeof SerialMonitor !== "undefined") SerialMonitor.notifyDone();
    term.focus();
  }
});

// ─────────────────────────────────────────────────────────────
// BOTÓN: SUBIR ARCHIVO
// ─────────────────────────────────────────────────────────────
document.getElementById("btnUploadCode").addEventListener("click", async () => {
  if (!isConnected || !serialWriter) {
    if (typeof SerialMonitor !== "undefined")
      SerialMonitor.warn("Sin conexión — conecta el dispositivo primero");
    return;
  }

  // Obtener código del editor
  const codeStr = (typeof editor !== "undefined" && editor.getDoc)
    ? editor.getDoc().getValue()
    : document.getElementById("codeEditor").value;

  // Nombre del archivo
  const fileNameInput = document.getElementById("fileNameInput");
  const rawFileName = fileNameInput?.value.trim() || "test.py";

  if (!isSafeFileName(rawFileName)) {
    term.writeln(`\r\n⚠ Nombre de archivo no válido: "${rawFileName}"\r\nUsa solo letras, números, guiones y extensión válida.\r\n`);
    return;
  }

  const fileName = rawFileName;
  term.writeln(`\r\nSubiendo '${fileName}' (${codeStr.length} bytes)...\r\n`);

  try {
    isSendingCode = true;
    if (typeof SerialMonitor !== "undefined") SerialMonitor.notifySending(codeStr);

    // Script que escribe el archivo en MicroPython
    const writeScript = [
      `_f = open('${fileName}', 'w')`,
      `_f.write(${JSON.stringify(codeStr)})`,
      `_f.close()`,
      `del _f`,
      `print('OK :${fileName}')`,
    ].join("\n");

    const scriptBytes = encoder.encode(writeScript);

    if (scriptBytes.length < 256) {
      // Paste mode directo
      await sendSerial("\x03"); await sleep(80);
      await sendSerial("\x05"); await sleep(60);
      await sendSerial(writeScript);
      await sendSerial("\r\n");
      await sendSerial("\x04");
      await sleep(300);
    } else {
      // Raw REPL con progreso
      const ok = await sendViaRawRepl(writeScript);
      if (!ok) {
        term.writeln("\r\n⚠ No se pudo entrar en raw REPL. Reintenta.\r\n");
        return;
      }
    }

    term.writeln(`\r\n✔ '${fileName}' guardado correctamente\r\n`);
  } catch (err) {
    term.writeln(`\r\nError al subir archivo: ${err.message}\r\n`);
    console.error(err);
  } finally {
    isSendingCode = false;
    if (typeof SerialMonitor !== "undefined") SerialMonitor.notifyDone();
  }
});

// ─────────────────────────────────────────────────────────────
// STOP (Ctrl+C)
// ─────────────────────────────────────────────────────────────
async function stopExecution() {
  if (!serialWriter) { term.writeln("\r\nNo conectado\r\n"); return; }
  try {
    await sendSerial("\x03");
    term.writeln("\r\nEjecución detenida\r\n");
  } catch (error) {
    console.error("Error enviando Ctrl+C:", error);
  }
}

document.getElementById("btnStop").addEventListener("click", stopExecution);

btnConsoleReset.addEventListener("click", async () => {
  await sendSerial("\x03"); await sleep(100);
  await sendSerial("\x04");
});

btnConsoleClear.addEventListener("click", () => { term.clear(); });

// ─────────────────────────────────────────────────────────────
// RESET DE ESTADO SERIAL
// ─────────────────────────────────────────────────────────────
function resetSerialState() {
  serialReader  = null;
  serialWriter  = null;
  serialPort    = null;
  isConnected   = false;
  serialConnected = false;
  serialBuffer  = "";
  waitingResponse = false;
  isFileOperationBusy = false;
  window._rawReplHook = null;
}

function clearExplorer() {
  const container = document.getElementById("fileList");
  if (container) container.innerHTML = "";
  Files.currentFile = null;
}

// ─────────────────────────────────────────────────────────────
// FILES — explorador del ESP32
// ─────────────────────────────────────────────────────────────
const Files = {
  currentFile: null,
  isOpening: false,

  async listFiles() {
    if (!isConnected) {
      term?.writeln("\r\n⚠ ESP32 no conectado. Mostrando lista vacía.\r\n");
      this.updateExplorer([]);
      return;
    }
    if (isFileOperationBusy) return;
    isFileOperationBusy = true;
    Files.currentFile = null;
    term.writeln("\r\nListando archivos...");

    try {
      await sendSerial("\x03"); await sleep(100);
      await sendSerial("import os\r\n");
      await sendSerial("print(os.listdir())\r\n");

      const response = await this.readResponse();
      const files = this.parseList(response);
      this.updateExplorer(files);
    } catch (err) {
      console.error("[listFiles] Error:", err);
      term.writeln("\r\n⚠ Error al listar archivos\r\n");
    } finally {
      isFileOperationBusy = false;
    }
  },

  /**
   * Espera una respuesta del ESP32.
   * Usa evento en lugar de busy-wait puro para mayor eficiencia.
   */
  async readResponse(timeout = 5000) {
    serialBuffer  = "";
    waitingResponse = true;

    return new Promise((resolve) => {
      const start   = Date.now();
      const check   = () => {
        if ((serialBuffer.includes("]") && serialBuffer.includes(">>>")) ||
            Date.now() - start >= timeout) {
          waitingResponse = false;
          resolve(serialBuffer);
        } else {
          setTimeout(check, 30);
        }
      };
      check();
    });
  },

  parseList(text) {
    try {
      const match = text.match(/\[[\s\S]*?\]/);
      if (!match) return [];
      const files = [];
      const re = /['"]([^'"]{2,})['"]/g;
      let m;
      while ((m = re.exec(match[0])) !== null) {
        const name = m[1].trim();
        if (name.includes(".")) files.push(name);
      }
      return files;
    } catch { return []; }
  },

  updateExplorer(files) {
    const container = document.getElementById("fileList");
    container.innerHTML = "";

    files.forEach((file) => {
      const row     = document.createElement("div");
      row.className = "file-row";

      const nameDiv = document.createElement("div");
      nameDiv.className = "file-name";
      nameDiv.textContent = file;
      nameDiv.title = "Abrir " + file;
      nameDiv.onclick = () => { if (!this.isOpening) this.openFile(file); };

      const iconsDiv  = document.createElement("div");
      iconsDiv.className = "file-icons";

      const runBtn = document.createElement("span");
      runBtn.className = "icon-btn icon-run";
      runBtn.title = "Ejecutar " + file;
      runBtn.onclick = (e) => { e.stopPropagation(); this.runFile(file); };

      const downloadBtn = document.createElement("span");
      downloadBtn.className = "icon-btn icon-save-py";
      downloadBtn.title = "Descargar " + file;
      downloadBtn.onclick = (e) => { e.stopPropagation(); this.downloadFile(file); };

      const deleteBtn = document.createElement("span");
      deleteBtn.className = "icon-btn icon-clear";
      deleteBtn.title = "Eliminar " + file;
      deleteBtn.onclick = (e) => { e.stopPropagation(); this.deleteFile(file); };

      iconsDiv.append(runBtn, downloadBtn, deleteBtn);
      row.append(nameDiv, iconsDiv);
      container.appendChild(row);
    });
  },

  async openFile(fileName) {
    try { requireSafeFileName(fileName); } catch { return; }
    if (this.isOpening) return;
    this.isOpening = true;
    if (!isConnected) { term.writeln("\r\nESP32 no conectado"); this.isOpening = false; return; }

    term.writeln(`\r\nAbriendo ${fileName}...\r\n`);
    try {
      await sendSerial("\x03"); await sleep(100);
      serialBuffer = ""; waitingResponse = true;
      await sendSerial(`print(open('${fileName}').read())\r\n`);

      const start = Date.now();
      while (Date.now() - start < 5000) {
        if (serialBuffer.includes(">>>")) break;
        await sleep(50);
      }
      waitingResponse = false;

      let content = serialBuffer
        .replace(new RegExp(`print\\(open\\('${fileName}'\\)\\.read\\(\\)\\)`), "")
        .replace(/>>>/g, "")
        .trim();

      editor.setValue(content);
      Files.currentFile = fileName;
      const input = document.getElementById("fileNameInput");
      if (input) input.value = fileName;
      editor.refresh();
      showView("viewCode");
      term.writeln("Archivo cargado correctamente\r\n");
    } catch (err) {
      console.error(err);
      term.writeln("Error abriendo archivo\r\n");
    } finally {
      this.isOpening = false;
    }
  },

  async runFile(fileName) {
    try { requireSafeFileName(fileName); } catch { return; }
    if (!isConnected) return;
    term.writeln(`\r\nEjecutando ${fileName}...\r\n`);
    await sendSerial("\x03"); await sleep(100);
    await sendSerial(`exec(open('${fileName}').read())\r\n`);
  },

  async deleteFile(fileName) {
    try { requireSafeFileName(fileName); } catch { return; }
    if (!confirm("¿Eliminar " + fileName + "?")) return;
    if (fileName === "boot.py") { console.log("No se recomienda eliminar boot.py"); return; }
    term.writeln(`\r\nEliminando ${fileName}...\r\n`);
    await sendSerial("\x03"); await sleep(100);
    await sendSerial("import os\r\n");
    await sendSerial(`os.remove('${fileName}')\r\n`);
    term.writeln("Archivo eliminado\r\n");
    this.listFiles();
  },

  async downloadFile(fileName) {
    try { requireSafeFileName(fileName); } catch { return; }
    if (!isConnected) { term.writeln("\r\nESP32 no conectado\r\n"); return; }
    if (isFileOperationBusy) return;
    isFileOperationBusy = true;

    try {
      await sendSerial("\x03"); await sleep(100);
      serialBuffer = ""; waitingResponse = true;
      await sendSerial(`print(open('${fileName}').read())\r\n`);

      const start = Date.now();
      while (Date.now() - start < 5000) {
        if (serialBuffer.includes(">>>")) break;
        await sleep(50);
      }
      waitingResponse = false;

      let content = serialBuffer
        .replace(new RegExp(`print\\(open\\('${fileName}'\\)\\.read\\(\\)\\)`), "")
        .replace(/>>>/g, "")
        .trim();

      const blob = new Blob([content], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (err) {
      console.error("Error descargando archivo:", err);
      term.writeln(`\r\nError al descargar ${fileName}\r\n`);
    } finally {
      isFileOperationBusy = false;
    }
  },
};

// ─────────────────────────────────────────────────────────────
// FLOATING TOOLS
// ─────────────────────────────────────────────────────────────
function toggleFloating(show) {
  if (window.FLOATING?.length) {
    window.FLOATING.forEach((el) => { if (el) el.style.display = show ? "" : "none"; });
  } else {
    document.querySelectorAll(".floating-tools").forEach((el) => {
      el.style.display = show ? "" : "none";
    });
  }
}

// ─────────────────────────────────────────────────────────────
// TUTORIAL
// ─────────────────────────────────────────────────────────────
let activeTutorial = null;

document.getElementById("btnTutor").addEventListener("click", () => {
  showView("viewBlocks");
  startTutorial();
});
document.getElementById("btnCodeTutor").addEventListener("click", () => {
  showView("viewCode");
  startCodeTutorial();
});

// ─────────────────────────────────────────────────────────────
// LOGGER
// ─────────────────────────────────────────────────────────────
function saveLog(type, message, extra = {}) {
  const logs = JSON.parse(localStorage.getItem("app_logs") || "[]");
  logs.push({ type, message, ...extra, time: new Date().toISOString() });
  if (logs.length > 500) logs.shift();
  localStorage.setItem("app_logs", JSON.stringify(logs));
}

window.addEventListener("error", (event) => {
  saveLog("JS_ERROR", event.message, { file: event.filename, line: event.lineno, column: event.colno });
});
window.addEventListener("unhandledrejection", (event) => {
  saveLog("PROMISE_ERROR", event.reason?.message || event.reason);
});

// ─────────────────────────────────────────────────────────────
// COMPARTIR ENLACE
// ─────────────────────────────────────────────────────────────
function generarLinkCompartir() {
  const xmlText = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Code.workspace));
  const compressed = LZString.compressToEncodedURIComponent(xmlText);
  return window.location.origin + window.location.pathname + "#" + compressed;
}

function compartir() {
  const url   = generarLinkCompartir();
  const modal = document.getElementById("shareModal");
  const input = document.getElementById("shareInput");
  input.value = url;
  modal.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnShare")?.addEventListener("click", compartir);
  document.getElementById("copyBtn")?.addEventListener("click", () => {
    const input = document.getElementById("shareInput");
    input.select();
    navigator.clipboard.writeText(input.value);
  });
  document.getElementById("closeModal")?.addEventListener("click", () => {
    document.getElementById("shareModal").style.display = "none";
  });

  const refreshBtn =
    document.getElementById("btnRefreshFiles") ||
    document.getElementById("refreshFilesList") ||
    document.getElementById("btnListFiles");
  refreshBtn?.addEventListener("click", () => Files.listFiles());
});

function cargarDesdeURL() {
  if (window.location.hash.length > 1) {
    try {
      const xmlText = LZString.decompressFromEncodedURIComponent(window.location.hash.substring(1));
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xmlText), Code.workspace);
    } catch (e) { console.error("Error al cargar desde URL:", e); }
  }
}

window.addEventListener("load", () => {
  cargarDesdeURL();
  document.querySelectorAll(".icon-btn").forEach((el) => { el.style.visibility = "visible"; });
});

// ─────────────────────────────────────────────────────────────
// RESIZE / ORIENTATION
// ─────────────────────────────────────────────────────────────
window.addEventListener("resize", () => {
  if (Code.workspace) Blockly.svgResize(Code.workspace);
});

window.addEventListener(
  "resize",
  debounce(() => {
    const tooSmall = window.innerWidth < 640 || window.innerHeight < 420;
    toggleFloating(!tooSmall);
    refreshBlockly();
    refreshTerminalFit();
  }, 150)
);

document.addEventListener("visibilitychange", () => {
  const hidden = document.visibilityState !== "visible";
  toggleFloating(!hidden);
  if (!hidden) requestAnimationFrame(() => { refreshBlockly(); refreshTerminalFit(); });
});

window.addEventListener("orientationchange", () => {
  setTimeout(() => { if (Code.workspace) Blockly.svgResize(Code.workspace); }, 200);
});

// ─────────────────────────────────────────────────────────────
// DOBLE CLICK EN runstart
// ─────────────────────────────────────────────────────────────
Code.workspace.getParentSvg().addEventListener("dblclick", function () {
  const block = Blockly.selected;
  if (block?.type === "runstart") runBlocklyAnimation();
});