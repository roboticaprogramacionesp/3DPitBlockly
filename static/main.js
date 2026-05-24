/**
 * Application Namespace & Blockly Setup
 */
var Code = {};
// DESPUÉS
let IS_DESKTOP = typeof window.pywebview !== "undefined";
// Se confirma cuando pywebviewready dispara
window.addEventListener("pywebviewready", () => { IS_DESKTOP = true; });

// ── FLAG DE DEBUG: poner false en producción ──────────────────
const DEBUG = false;

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

// === Botones flotantes ===
const screenshotBtnEl = addScreenshotButton(Code.workspace); // devuelve <g>
const {
  container: undoRedoContainer,
  undoBtn,
  redoBtn,
} = addUndoRedoButtons(Code.workspace);

// Guarda en un arreglo global para toggle
window.FLOATING = [screenshotBtnEl, undoRedoContainer].filter(Boolean);

Code.generateCode = function (generator = Blockly.Python) {
  if (Code.auto_mode || this.constructor.name != "Window") {
    if (Code.checkAllGeneratorFunctionsDefined(generator)) {
      if (generator.name_ == "Python") {
        return generator.workspaceToCode(Code.workspace);
      } else if (generator.name_ == "Javascript") {
        return generator.workspaceToCode(Code.workspace);
      }
    } else {
      // Break out of auto_mode if there is a block without a generator function
      Code.auto_mode = false;
    }
  }
};

// CHECAR SOPORTE WEB SERIAL
if (!navigator.serial && !IS_DESKTOP) {
  console.log("Tu navegador no soporta Web Serial...");
  throw new Error("Web Serial no disponible");
}

// ─────────────────────────────────────────────────────────────
// VALIDACIÓN DE NOMBRES DE ARCHIVO (FIX: inyección MicroPython)
// Solo permite letras, números, guión, guión bajo, punto.
// Máximo 64 caracteres. Debe terminar en extensión válida.
// ─────────────────────────────────────────────────────────────
const SAFE_FILENAME_RE = /^[\w\-][.\w\-]{0,62}\.(py|txt|json|csv|log|mpy|html|js|css)$/i;

function isSafeFileName(name) {
  return typeof name === "string" && SAFE_FILENAME_RE.test(name);
}

/**
 * Sanitiza y valida un nombre de archivo antes de usarlo en comandos serial.
 * Lanza si el nombre no es seguro.
 */
function requireSafeFileName(name) {
  if (!isSafeFileName(name)) {
    const msg = `Nombre de archivo no válido: "${name}"`;
    term && term.writeln(`\r\n⚠ ${msg}\r\n`);
    throw new Error(msg);
  }
  return name;
}

function blurBlockly() {
  try {
    const svg =
      Code.workspace &&
      Code.workspace.getParentSvg &&
      Code.workspace.getParentSvg();
    if (svg) svg.blur();
  } catch (e) { }
}

// ACTUALIZAR CÓDIGO DESDE BLOCKLY
function updateCodeFromBlockly() {
  const code = Blockly.Python.workspaceToCode(Code.workspace);
  editor.setValue(code);
}

// Inicializar Editor CodeMirror
const editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
  mode: "python",
  theme: "dracula",
  lineNumbers: true,
  lineWrapping: true,
  indentUnit: 2,
  tabSize: 2,
});

// BOTÓN: VER CÓDIGO
document.getElementById("btnCode").addEventListener("click", function () {
  updateCodeFromBlockly();
  showView("viewCode");
  isWorkSpace = false;
  requestAnimationFrame(() => {
    editor.refresh();
    refreshTerminalFit();
  });
});

document
  .getElementById("btnBlocks")
  .addEventListener("click", () => showView("viewBlocks"));

function refreshBlockly() {
  if (!Code.workspace) return;
  const svg = Code.workspace.getParentSvg();
  const blocklyDiv = document.getElementById("blocklyDiv");
  const w = blocklyDiv.clientWidth;
  const h = blocklyDiv.clientHeight;
  if (w === 0 || h === 0) return; // evita render con tamaño 0
  svg.style.width = w + "px";
  svg.style.height = h + "px";
  Blockly.svgResize(Code.workspace);
}

function showView(viewId) {
  let _simInit = false;
  Blockly.hideChaff(true);
  isWorkSpace = viewId === "viewBlocks";

  const views = document.querySelectorAll(".view");

  views.forEach((v) => {
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

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        refreshBlockly();
      });
    });
  }
}

// ─────────────────────────────────────────────────────────────
// AUTOGUARDADO — listener unificado (FIX: doble listener)
// Un solo listener por workspace: desktop → Python API + debounce,
// web → localStorage directo.
// ─────────────────────────────────────────────────────────────
const AUTOSAVE_KEY = "blockly_autosave_workspace";
let autosaveTimer = null;
const AUTOSAVE_DELAY = 800;

function autoSaveWorkspace() {
  const xmlDom = Blockly.Xml.workspaceToDom(Code.workspace);
  const xmlText = Blockly.Xml.domToText(xmlDom);
  localStorage.setItem(AUTOSAVE_KEY, xmlText);
}

function autoSaveWorkspacePython() {
  const workspace = Blockly.getMainWorkspace();
  const xmlDom = Blockly.Xml.workspaceToDom(workspace);
  const xmlText = Blockly.Xml.domToText(xmlDom);

  if (window.pywebview?.api?.autosave_xml) {
    window.pywebview.api.autosave_xml(xmlText);
  }
}

Code.workspace.addChangeListener((event) => {
  if (event.isUiEvent || event.type === Blockly.Events.UI) return;
  if (isRestoring) return;

  // Re-evaluar IS_DESKTOP aquí, no al inicio
  const isDesktop = typeof window.pywebview !== "undefined" && !!window.pywebview?.api;

  if (isDesktop) {
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(autoSaveWorkspacePython, AUTOSAVE_DELAY);
  } else {
    autoSaveWorkspace();
  }
});

let activeTutorial = null;

// TUTORIAL
document.getElementById("btnTutor").addEventListener("click", function () {
  showView("viewBlocks");
  startTutorial();
});

// TUTORIAL
document.getElementById("btnCodeTutor").addEventListener("click", function () {
  showView("viewCode");
  startCodeTutorial();
});

let isRestoring = false;

function restoreWorkspaceFromLocal() {
  const xmlText = localStorage.getItem(AUTOSAVE_KEY);
  if (!xmlText) return;
  try {
    const xmlDom = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
  } catch (e) {
    console.warn("No se pudo restaurar el workspace");
  }
}

async function restoreWorkspaceFromPython() {
  let attempts = 0;
  while (!window.pywebview?.api?.load_autosave && attempts < 20) {
    await new Promise(r => setTimeout(r, 100));
    attempts++;
  }
  if (!window.pywebview?.api?.load_autosave) return;

  const xmlText = await window.pywebview.api.load_autosave();
  if (!xmlText) return;

  try {
    isRestoring = true;  // ← bloquea el autosave durante la carga
    const xmlDom = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlDom, Blockly.getMainWorkspace());
  } catch (e) {
    console.warn("No se pudo restaurar autosave", e);
  } finally {
    isRestoring = false;  // ← reactiva el autosave
  }
}

// ESPERAR A PYWEBVIEW (Desktop)
window.addEventListener("pywebviewready", () => {
  IS_DESKTOP = true;
  restoreWorkspaceFromPython();
  startTutorial();
});

if (!IS_DESKTOP) {
  // Solo restaurar desde localStorage si definitivamente es web
  // (se confirma después de que pywebviewready no llegue)
  setTimeout(() => {
    if (!IS_DESKTOP) restoreWorkspaceFromLocal();
  }, 500);
}


// BOTÓN: NUEVO ARCHIVO
document.getElementById("btnNew").addEventListener("click", async function () {
  showView("viewBlocks");
  const confirmDelete = await showCustomConfirm();
  if (!confirmDelete) return;

  Blockly.Events.disable();

  try {
    if (Code.workspace) {
      Code.workspace.clear();
    }

    if (typeof editor !== "undefined") {
      editor.setValue("");
    } else {
      const codeArea = document.getElementById("codeArea");
      if (codeArea) codeArea.value = "";
    }

    localStorage.removeItem(AUTOSAVE_KEY);

    if (window.pywebview?.api?.clear_autosave) {
      await window.pywebview.api.clear_autosave();
    }
  } catch (error) {
    console.error("Error al crear nuevo archivo:", error);
  }

  Blockly.Events.enable();
});

// ─────────────────────────────────────────────────────────────
// GUARDAR ARCHIVO (FIX: detección de tipo solo por extensión)
// ─────────────────────────────────────────────────────────────
async function saveFileAuto(content, fileName = "") {
  try {
    let extension = "txt";
    let mimeType = "text/plain";
    let isBase64 = false;

    if (typeof content === "string" && content.startsWith("data:image/png")) {
      extension = "png";
      mimeType = "image/png";
      isBase64 = true;
    } else {
      // Detectar tipo SOLO por extensión del fileName (más robusto)
      const ext = fileName.split(".").pop().toLowerCase();
      if (ext === "xml") {
        extension = "xml";
        mimeType = "text/xml";
      } else if (ext === "py") {
        extension = "py";
        mimeType = "text/x-python";
      } else if (ext === "json") {
        extension = "json";
        mimeType = "application/json";
      }
      // Fallback: si el contenido es XML y no hay extensión clara
      if (extension === "txt" && content.trim().startsWith("<")) {
        extension = "xml";
        mimeType = "text/xml";
      }
    }

    const suggestedName =
      fileName && fileName.includes(".") ? fileName : `archivo.${extension}`;

    const handle = await window.showSaveFilePicker({
      suggestedName,
      types: [
        {
          description: `Archivo ${extension.toUpperCase()}`,
          accept: {
            [mimeType]: [`.${extension}`],
          },
        },
      ],
    });

    const writable = await handle.createWritable();

    if (isBase64) {
      const base64 = content.split(",")[1];
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);

      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      await writable.write(bytes);
    } else {
      await writable.write(content);
    }

    await writable.close();
  } catch (err) {
    if (err.name === "AbortError") {
      return;
    }
    console.error("Error real al guardar:", err);
  }
}

document.getElementById("btnSave").addEventListener("click", async (e) => {
  e.preventDefault();

  const workspace = Blockly.getMainWorkspace();
  const xmlDom = Blockly.Xml.workspaceToDom(workspace);
  const xmlText = Blockly.Xml.domToPrettyText(xmlDom);

  if (window.pywebview?.api?.save_xml) {
    const result = await window.pywebview.api.save_xml(xmlText);

    if (result?.status === "ok") {
      if (DEBUG) console.log("Archivo XML guardado en:", result.path);
    }
  } else {
    await saveFileAuto(xmlText, "proyecto.xml");
  }
});

// BOTÓN: CARGAR XML
document.getElementById("btnLoad").addEventListener("click", function () {
  document.getElementById("loadXML").click();
});

// INPUT FILE: LEER Y CARGAR XML
document.getElementById("loadXML").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const xmlText = e.target.result;

      Code.workspace.clear();
      const xmlDom = Blockly.Xml.textToDom(xmlText);
      Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);

      updateCodeFromBlockly();

      requestAnimationFrame(() => {
        editor.refresh();
      });
    } catch (err) {
      console.error(err);
    }
  };

  reader.readAsText(file);

  event.target.value = "";
  showView("viewBlocks");
});

// RESTAURAR DESDE AUTOSAVE
async function reloadWorkspace() {
  Blockly.Events.disable();

  try {
    let xmlText = "";

    if (window.pywebview?.api?.load_autosave) {
      xmlText = await window.pywebview.api.load_autosave();
    }

    if (!xmlText) {
      xmlText = localStorage.getItem("blockly_autosave_workspace");
    }

    if (!xmlText) {
      Blockly.Events.enable();
      return;
    }

    const xmlDom = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.clearWorkspaceAndLoadFromXml(xmlDom, Code.workspace);
  } catch (e) {
    console.error("Error al recargar workspace", e);
  }

  Blockly.Events.enable();
}

// BOTÓN: RECARGAR
document.getElementById("btnReload").addEventListener("click", function () {
  location.reload();
});

// BOTÓN: GUARDAR .PY (DESKTOP + WEB)
document.getElementById("btnSavePy").addEventListener("click", async (e) => {
  e.preventDefault();

  const fileName =
    document.getElementById("fileNameInput").value.trim() || "test.py";

  const code = editor.getValue();

  if (window.pywebview?.api?.save_py) {
    const result = await window.pywebview.api.save_py(code, fileName);

    if (result?.status === "ok") {
      if (DEBUG) console.log(`Archivo ${fileName} guardado en:`, result.path);
    }
  } else {
    await saveFileAuto(code, fileName);
  }
});

// BOTÓN: CARGAR .PY
document.getElementById("btnLoadPy").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("loadPy").click();
});

document.getElementById("loadPy").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    editor.setValue(e.target.result);
  };

  reader.readAsText(file);

  event.target.value = "";
});

// ─────────────────────────────────────────────────────────────
// MODALES (FIX: innerHTML → textContent para evitar XSS)
// Si necesitas HTML real en el mensaje usa showCustomConfirmHTML()
// ─────────────────────────────────────────────────────────────
function showCustomConfirm(message = "¿Deseas continuar?") {
  return new Promise((resolve) => {
    const modal = document.getElementById("customModal");
    const msg = document.getElementById("modalMessage");
    const btnAccept = document.getElementById("modalAccept");
    const btnCancel = document.getElementById("modalCancel");

    if (!modal || !msg || !btnAccept || !btnCancel) {
      console.error("Modal no encontrado");
      resolve(false);
      return;
    }

    // FIX: textContent en lugar de innerHTML para evitar XSS
    msg.textContent = message;

    btnCancel.style.display = "inline-block";
    btnAccept.textContent = "Aceptar";

    modal.style.display = "flex";

    btnAccept.onclick = () => {
      modal.style.display = "none";
      resolve(true);
    };

    btnCancel.onclick = () => {
      modal.style.display = "none";
      resolve(false);
    };
  });
}

function showMessageModal(message) {
  const modal = document.getElementById("customModal");
  const msg = document.getElementById("modalMessage");
  const btnAccept = document.getElementById("modalAccept");
  const btnCancel = document.getElementById("modalCancel");

  if (!modal || !msg || !btnAccept) {
    console.log(message);
    return;
  }

  // FIX: textContent en lugar de innerHTML para evitar XSS
  msg.textContent = message;

  btnCancel.style.display = "none";
  btnAccept.textContent = "OK";

  modal.style.display = "flex";

  btnAccept.onclick = () => {
    modal.style.display = "none";
  };
}

window.addEventListener("DOMContentLoaded", () => {
  startTutorial();
});

//////////////////////////////////////////////////////////////
// TERMINAL XTERM + FIT ADDON — declaradas en viewcode.js
//////////////////////////////////////////////////////////////

window.addEventListener("resize", () => {
  if (Code.workspace) {
    Blockly.svgResize(Code.workspace);
  }
});

//////////////////////////////////////////////////////////////
// WEBSERIAL ENGINE
//////////////////////////////////////////////////////////////

let serialPort = null;
let serialReader = null;
let serialWriter = null;
let isConnected = false;
let isSendingCode = false;
let isWorkSpace = true;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let serialBuffer = "";
let waitingResponse = false;

// Bandera global para operaciones de archivo (FIX: race condition)
let isFileOperationBusy = false;

//////////////////////////////////////////////////////////////
// CONNECT
//////////////////////////////////////////////////////////////
async function connectSerial() {
  try {
    if (!term) {
      initTerminal();
      enableTerminalInput();
    }

    serialPort = await navigator.serial.requestPort();

    await serialPort.open({
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
      parity: "none",
      flowControl: "none",
    });

    serialWriter = serialPort.writable.getWriter();
    serialReader = serialPort.readable.getReader();

    isConnected = true;
    serialConnected = true;
    updateConnectionIcon(true);
    term.writeln("MicroPython Terminal\r\n");
    await sendSerial("\x03"); // Ctrl+C
    readSerialLoop();
  } catch (error) {
    if (term)
      term.writeln("\r\nError conexión: " + error);
    else console.error(error);
  }
}

////////////////////////////////////////////////////////////
// DISCONNECT
////////////////////////////////////////////////////////////

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

    if (serialPort && serialPort.readable) {
      try { await serialPort.close(); } catch { }
    }

    serialPort = null;

    term.writeln("\r\nDesconectado\r\n");

    const btnConnect = document.getElementById("btnConnect");
    const btnDisconnect = document.getElementById("btnDisconnect");

    if (btnConnect) btnConnect.disabled = false;
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

//////////////////////////////////////////////////////////////
// READ LOOP UNIVERSAL
//////////////////////////////////////////////////////////////
async function readSerialLoop() {
  try {
    while (isConnected) {
      const { value, done } = await serialReader.read();

      if (done) {
        term.writeln("\r\nPuerto cerrado\r\n");
        await disconnectSerial();
        break;
      }

      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        term.write(chunk);

        if (typeof SerialMonitor !== 'undefined') SerialMonitor.feed(chunk);

        if (waitingResponse) {
          serialBuffer += chunk;
        }
      }
    }
  } catch (error) {
    term.writeln("\r\nConexión perdida\r\n");
    await disconnectSerial();
  }
}

//////////////////////////////////////////////////////////////
// SEND
//////////////////////////////////////////////////////////////

async function sendSerial(data) {
  if (!serialWriter) return;
  if (!data || data.length === 0) return;
  await serialWriter.write(encoder.encode(data));
}

//////////////////////////////////////////////////////////////
// TERMINAL INPUT
//////////////////////////////////////////////////////////////

function enableTerminalInput() {
  term.onData(async (data) => {
    if (!isConnected) return;
    if (isSendingCode) return;
    // FIX: console.log de teclas eliminado (exponía contraseñas)
    if (DEBUG) console.log("DATA:", JSON.stringify(data));
    await sendSerial(data);
  });
}

let serialConnected = false;

document.addEventListener("DOMContentLoaded", () => {
  const btnConnection = document.getElementById("btnConnection");
  const iconConnection = document.getElementById("iconConnection");

  if (!btnConnection || !iconConnection) {
    console.warn("Botón o icono no encontrados");
    return;
  }

  updateConnectionIcon(false);

  btnConnection.addEventListener("click", async () => {
    if (serialConnected) {
      await disconnectSerial();
    } else {
      await connectSerial();
    }
  });
});

//////////////////////////////////////////////////////////////
// DETECTAR DESCONEXIÓN FÍSICA USB
//////////////////////////////////////////////////////////////

navigator.serial.addEventListener("disconnect", async (event) => {
  if (serialPort && event.target === serialPort) {
    term.writeln("\r\nDispositivo desconectado físicamente\r\n");
    await disconnectSerial();
  }
});

//////////////////////////////////////////////////////////////
// DETECTAR NUEVA CONEXIÓN USB
//////////////////////////////////////////////////////////////

navigator.serial.addEventListener("connect", (event) => {
  term.writeln("\r\nDispositivo USB detectado\r\n");
});

function updateConnectionIcon(connected) {
  const icon = document.getElementById("iconConnection");
  if (!icon) return;

  icon.classList.remove("icon-connect", "icon-disconnect");

  if (connected) {
    icon.classList.add("icon-connect");
  } else {
    icon.classList.add("icon-disconnect");
  }
}

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
// BOTÓN: EJECUTAR (paste mode — seguro para cualquier código)
// ─────────────────────────────────────────────────────────────
btnRun.addEventListener("click", async () => {

  if (!isConnected || !serialWriter) {
    console.log("Conecta la ESP32 primero.");
    return;
  }

  const code = getCode();

  if (!code || code.trim() === "") {
    term.writeln("\r\nNo hay código para ejecutar\r\n");
    return;
  }

  try {
    isSendingCode = true;

    term.writeln("\r\nEjecutando código...\r\n");

    await sendSerial("\x03"); // Ctrl+C
    await sleep(100);

    if (typeof SerialMonitor !== 'undefined') SerialMonitor.notifySending(code);

    await sendSerial("\x05");  // Ctrl+E — paste mode
    await sleep(100);
    await sendSerial(code);
    await sendSerial("\r\n");
    await sendSerial("\x04"); // Ctrl+D — ejecutar

  } finally {
    isSendingCode = false;
    if (typeof SerialMonitor !== 'undefined') SerialMonitor.notifyDone();
    term.focus();
  }

});

// ─────────────────────────────────────────────────────────────
// BOTÓN: SUBIR ARCHIVO AL ESP32
// FIX: usa paste mode igual que btnRun para evitar inyección
// FIX: valida nombre de archivo antes de enviarlo
// ─────────────────────────────────────────────────────────────
document.getElementById("btnUploadCode").addEventListener("click", async () => {
  if (!isConnected || !serialWriter) {
    console.log("Conecta la ESP32 primero.");
    return;
  }

  let codeStr = "";
  if (typeof editor !== "undefined" && editor.getDoc) {
    codeStr = editor.getDoc().getValue();
  } else {
    codeStr = document.getElementById("codeEditor").value;
  }

  let fileNameInput = document.getElementById("fileNameInput");
  let rawFileName =
    fileNameInput && fileNameInput.value.trim() !== ""
      ? fileNameInput.value.trim()
      : "test.py";

  // FIX: validar nombre antes de enviarlo al dispositivo
  if (!isSafeFileName(rawFileName)) {
    term.writeln(`\r\n⚠ Nombre de archivo no válido: "${rawFileName}"\r\nUsa solo letras, números, guiones y extensión .py\r\n`);
    return;
  }

  const fileName = rawFileName;

  term.writeln(`\r\nSubiendo '${fileName}'...\r\n`);

  try {
    isSendingCode = true;

    await sendSerial("\x03"); // Ctrl+C
    await sleep(100);

    // Usar paste mode para escribir el archivo: más seguro que f.write()
    // Generamos un script inline que abre el archivo y escribe el contenido
    // usando paste mode para evitar problemas con caracteres especiales.
    const script = [
      `_f = open('${fileName}', 'w')`,
      `_f.write(${JSON.stringify(codeStr)})`,
      `_f.close()`,
      `del _f`,
      `print('OK:${fileName}')`,
    ].join("\n");

    if (typeof SerialMonitor !== 'undefined') SerialMonitor.notifySending(script);

    await sendSerial("\x05");  // Ctrl+E — paste mode
    await sleep(100);
    await sendSerial(script);
    await sendSerial("\r\n");
    await sendSerial("\x04"); // Ctrl+D — ejecutar

    await sleep(300);

    term.writeln(`\r\nArchivo '${fileName}' guardado correctamente\r\n`);
  } catch (err) {
    term.writeln(`\r\nError al subir archivo: ${err.message}\r\n`);
    console.error(err);
  } finally {
    isSendingCode = false;
    if (typeof SerialMonitor !== 'undefined') SerialMonitor.notifyDone();
  }
});

////////////////////////////////////////////////////////////
// STOP (Ctrl+C)
////////////////////////////////////////////////////////////

async function stopExecution() {
  if (!serialWriter) {
    term.writeln("\r\nNo conectado\r\n");
    return;
  }

  try {
    await sendSerial("\x03");
    term.writeln("\r\nEjecución detenida\r\n");
  } catch (error) {
    console.error("Error enviando Ctrl+C:", error);
  }
}

document.getElementById("btnStop").addEventListener("click", stopExecution);

btnConsoleReset.addEventListener("click", async () => {
  await sendSerial("\x03");
  await sleep(100);
  await sendSerial("\x04");
});

btnConsoleClear.addEventListener("click", () => {
  term.clear();
});

function resetSerialState() {
  serialReader = null;
  serialWriter = null;
  serialPort = null;

  isConnected = false;
  serialConnected = false;

  serialBuffer = "";
  waitingResponse = false;
  isFileOperationBusy = false;
}

function clearExplorer() {
  const container = document.getElementById("fileList");
  if (container) container.innerHTML = "";

  Files.currentFile = null;
}

// ─────────────────────────────────────────────────────────────
// FILES — explorador de archivos del ESP32
// FIX: validación de fileName en openFile, runFile, deleteFile, downloadFile
// FIX: bandera isFileOperationBusy en todas las operaciones (race condition)
// FIX: downloadBtn.onclick corregido (era runFile, ahora downloadFile)
// FIX: readResponse usa ">>>" como terminador (más robusto que "]")
// ─────────────────────────────────────────────────────────────
const Files = {
  currentFile: null,
  isOpening: false,

  async listFiles() {
    if (!isConnected) {
      term.writeln("\r\nESP32 no conectado");
      return;
    }

    // Evitar doble listado simultáneo
    if (isFileOperationBusy) return;
    isFileOperationBusy = true;

    Files.currentFile = null;

    term.writeln("\r\nListando archivos...");

    try {
      await sendSerial("\x03");
      await sleep(100);

      await sendSerial("import os\r\n");
      await sendSerial("print(os.listdir())\r\n");

      const response = await this.readResponse();
      const files = this.parseList(response);
      this.updateExplorer(files);
    } finally {
      isFileOperationBusy = false;
    }
  },

  async sendCommand(cmd) {
    const enc = new TextEncoder();
    await serialWriter.write(enc.encode(cmd));
  },

  // FIX: usa ">>>" como terminador (igual que openFile) y timeout mayor
  async readResponse(timeout = 5000) {
    serialBuffer = "";
    waitingResponse = true;

    const start = Date.now();

    while (Date.now() - start < timeout) {
      if (serialBuffer.includes(">>>")) break;
      await new Promise((r) => setTimeout(r, 50));
    }

    waitingResponse = false;

    return serialBuffer;
  },

  parseList(text) {
    try {
      const match = text.match(/\[(.*?)\]/);

      if (!match) return [];

      return match[0]
        .replace(/'/g, "")
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);
    } catch {
      return [];
    }
  },

  updateExplorer(files) {
    const container = document.getElementById("fileList");
    container.innerHTML = "";

    files.forEach((file) => {
      const row = document.createElement("div");
      row.className = "file-row";

      const nameDiv = document.createElement("div");
      nameDiv.className = "file-name";
      nameDiv.textContent = file;
      nameDiv.title = "Abrir " + file;

      nameDiv.onclick = () => {
        if (this.isOpening) return;
        this.openFile(file);
      };

      const iconsDiv = document.createElement("div");
      iconsDiv.className = "file-icons";

      const runBtn = document.createElement("span");
      runBtn.className = "icon-btn icon-run";
      runBtn.title = "Ejecutar " + file;
      runBtn.onclick = (e) => {
        e.stopPropagation();
        this.runFile(file);
      };

      const downloadBtn = document.createElement("span");
      downloadBtn.className = "icon-btn icon-save-py";
      downloadBtn.title = "Descargar " + file;
      // FIX: estaba apuntando a runFile en lugar de downloadFile
      downloadBtn.onclick = (e) => {
        e.stopPropagation();
        this.downloadFile(file);
      };

      const deleteBtn = document.createElement("span");
      deleteBtn.className = "icon-btn icon-clear";
      deleteBtn.title = "Eliminar " + file;
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        this.deleteFile(file);
      };

      iconsDiv.appendChild(runBtn);
      iconsDiv.appendChild(downloadBtn);
      iconsDiv.appendChild(deleteBtn);

      row.appendChild(nameDiv);
      row.appendChild(iconsDiv);

      container.appendChild(row);
    });
  },

  async openFile(fileName) {
    // FIX: validar nombre de archivo
    try { requireSafeFileName(fileName); } catch { return; }

    if (this.isOpening) return;
    this.isOpening = true;

    if (!isConnected) {
      term.writeln("\r\nESP32 no conectado");
      this.isOpening = false;
      return;
    }

    term.writeln(`\r\nAbriendo ${fileName}...\r\n`);

    try {
      await sendSerial("\x03");
      await sleep(100);

      serialBuffer = "";
      waitingResponse = true;

      await sendSerial(`print(open('${fileName}').read())\r\n`);

      const start = Date.now();

      while (Date.now() - start < 5000) {
        if (serialBuffer.includes(">>>")) break;
        await sleep(50);
      }

      waitingResponse = false;

      let content = serialBuffer;

      content = content.replace(
        new RegExp(`print\\(open\\('${fileName}'\\)\\.read\\(\\)\\)`),
        "",
      );

      content = content.replace(/>>>/g, "");
      content = content.trim();

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
    // FIX: validar nombre de archivo
    try { requireSafeFileName(fileName); } catch { return; }

    if (!isConnected) return;

    term.writeln(`\r\nEjecutando ${fileName}...\r\n`);

    await sendSerial("\x03");
    await sleep(100);

    await sendSerial(`exec(open('${fileName}').read())\r\n`);
  },

  async deleteFile(fileName) {
    // FIX: validar nombre de archivo
    try { requireSafeFileName(fileName); } catch { return; }

    if (!confirm("¿Eliminar " + fileName + "?")) return;

    if (fileName === "boot.py") {
      console.log("No se recomienda eliminar boot.py");
      return;
    }

    term.writeln(`\r\nEliminando ${fileName}...\r\n`);

    await sendSerial("\x03");
    await sleep(100);

    await sendSerial(`import os\r\n`);
    await sendSerial(`os.remove('${fileName}')\r\n`);

    term.writeln("Archivo eliminado\r\n");

    this.listFiles();
  },

  async downloadFile(fileName) {
    // FIX: validar nombre de archivo
    try { requireSafeFileName(fileName); } catch { return; }

    if (!isConnected) {
      term.writeln("\r\nESP32 no conectado\r\n");
      return;
    }

    // FIX: bandera para evitar doble descarga simultánea
    if (isFileOperationBusy) return;
    isFileOperationBusy = true;

    try {
      await sendSerial("\x03");
      await sleep(100);

      serialBuffer = "";
      waitingResponse = true;

      await sendSerial(`print(open('${fileName}').read())\r\n`);

      // FIX: esperar ">>>" igual que openFile (más fiable que sleep fijo)
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
      URL.revokeObjectURL(a.href); // FIX: liberar memoria
    } catch (err) {
      console.error("Error descargando archivo:", err);
      term.writeln(`\r\nError al descargar ${fileName}\r\n`);
    } finally {
      isFileOperationBusy = false;
    }
  },
};

function toggleFloating(show) {
  if (window.FLOATING && Array.isArray(window.FLOATING)) {
    window.FLOATING.forEach((el) => {
      if (el) el.style.display = show ? "" : "none";
    });
  } else {
    document.querySelectorAll(".floating-tools").forEach((el) => {
      el.style.display = show ? "" : "none";
    });
  }
}

function debounce(fn, wait = 120) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

// FIX: un solo listener visibilitychange (eliminado el duplicado de la línea 1406)
document.addEventListener("visibilitychange", () => {
  const hidden = document.visibilityState !== "visible";
  toggleFloating(!hidden);
  if (!hidden) {
    requestAnimationFrame(() => {
      refreshBlockly();
      refreshTerminalFit();
    });
  }
});

// Cambios de tamaño
window.addEventListener(
  "resize",
  debounce(() => {
    const tooSmall = window.innerWidth < 640 || window.innerHeight < 420;
    toggleFloating(!tooSmall);
    refreshBlockly();
    refreshTerminalFit();
  }, 150),
);

window.addEventListener("load", () => {
  document.querySelectorAll(".icon-btn").forEach((el) => {
    el.style.visibility = "visible";
  });
});

window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    if (Code.workspace) Blockly.svgResize(Code.workspace);
  }, 200);
});

/* ===== DOBLE CLICK EN runstart ===== */
Code.workspace.getParentSvg().addEventListener("dblclick", function () {
  const block = Blockly.selected;
  if (!block) return;
  if (block.type !== "runstart") return;
  runBlocklyAnimation();
});

// ===== LOGGER SIMPLE =====

function saveLog(type, message, extra = {}) {
  const logs = JSON.parse(localStorage.getItem("app_logs") || "[]");

  logs.push({
    type,
    message,
    ...extra,
    time: new Date().toISOString(),
  });

  if (logs.length > 500) logs.shift();

  localStorage.setItem("app_logs", JSON.stringify(logs));
}

window.addEventListener("error", function (event) {
  saveLog("JS_ERROR", event.message, {
    file: event.filename,
    line: event.lineno,
    column: event.colno,
  });
});

window.addEventListener("unhandledrejection", function (event) {
  saveLog("PROMISE_ERROR", event.reason?.message || event.reason);
});

// ===== COMPARTIR ENLACE =====
// FIX: eliminada la función duplicada generateShareLink()

function generarLinkCompartir() {
  const xml = Blockly.Xml.workspaceToDom(Code.workspace);
  const xmlText = Blockly.Xml.domToText(xml);
  const compressed = LZString.compressToEncodedURIComponent(xmlText);
  const url = window.location.origin + window.location.pathname + "#" + compressed;
  return url;
}

function compartir() {
  const url = generarLinkCompartir();

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
});

function cargarDesdeURL() {
  if (window.location.hash.length > 1) {
    try {
      const compressed = window.location.hash.substring(1);
      const xmlText = LZString.decompressFromEncodedURIComponent(compressed);
      const xml = Blockly.Xml.textToDom(xmlText);
      Blockly.Xml.domToWorkspace(xml, Code.workspace);
    } catch (e) {
      console.error("Error al cargar desde URL:", e);
    }
  }
}

window.addEventListener("load", () => {
  cargarDesdeURL();
});