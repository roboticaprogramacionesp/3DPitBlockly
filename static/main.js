/**
 * main.js — 3DPit IDE
 * WebSerial + Blockly + CodeMirror
 */

// ─────────────────────────────────────────────────────────────
// NAMESPACE & FLAGS
// ─────────────────────────────────────────────────────────────
var Code = {};
let IS_DESKTOP = typeof window.pywebview !== "undefined";
window.addEventListener("pywebviewready", () => {
  IS_DESKTOP = true;
});

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
const {
  container: undoRedoContainer,
  undoBtn,
  redoBtn,
} = addUndoRedoButtons(Code.workspace);
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
// WEB SERIAL CHECK — si no hay Web Serial, usamos WiFi (tablet/móvil)
// ─────────────────────────────────────────────────────────────
const HAS_WEB_SERIAL = !!navigator.serial;
const USE_WIFI_FALLBACK = !HAS_WEB_SERIAL && !IS_DESKTOP;
if (USE_WIFI_FALLBACK) {
  console.log("Web Serial no disponible: usando modo WiFi (WebREPL)");
}

// ─────────────────────────────────────────────────────────────
// VALIDACIÓN DE NOMBRES DE ARCHIVO
// ─────────────────────────────────────────────────────────────
const SAFE_FILENAME_RE =
  /^[\w\-][.\w\-]{0,62}\.(py|txt|json|csv|log|mpy|html|js|css)$/i;

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
  // Si hay una subida de código en curso al ESP32, detenerla limpiamente
  // antes de cambiar de vista para evitar que el pipeline de serial quede
  // en estado inconsistente (isSendingCode=true sin nadie que lo limpie).
  if (isSendingCode && typeof stopExecution === "function") {
    console.warn("[showView] Cambio de vista durante envío — deteniendo ejecución");
    stopExecution().catch(() => { });
  }

  // Desconectar observers de wiring-zoom al salir de esa vista
  const currentView = document.querySelector(".view.active");
  if (currentView?.id === "viewWiring" && viewId !== "viewWiring") {
    if (window.wiringZoom?.destroy) window.wiringZoom.destroy();
  }

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

document
  .getElementById("btnBlocks")
  .addEventListener("click", () => showView("viewBlocks"));
document
  .getElementById("btnWiring")
  .addEventListener("click", () => {
    showView("viewWiring");
    requestAnimationFrame(() => {
      if (window.wiringZoom) window.wiringZoom.center();
    });
  });

// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// MIGRACIÓN: clave anterior "esp32_wifi" guardaba host+contraseña juntos.
// Separamos host (localStorage) de contraseña (sessionStorage) y borramos
// el registro viejo para no dejar credenciales en texto plano.
// ─────────────────────────────────────────────────────────────
(function _migrateWifiCredentials() {
  try {
    const old = localStorage.getItem("esp32_wifi");
    if (!old) return;
    const parsed = JSON.parse(old);
    if (parsed.host) localStorage.setItem("esp32_wifi_host", parsed.host);
    if (parsed.password) sessionStorage.setItem("esp32_wifi_pw", parsed.password);
    localStorage.removeItem("esp32_wifi");
  } catch (_) {
    localStorage.removeItem("esp32_wifi"); // borramos aunque esté corrupta
  }
})();

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
  const isDesktop =
    typeof window.pywebview !== "undefined" && !!window.pywebview?.api;
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

  let dom;
  try {
    dom = Blockly.Xml.textToDom(xmlText);
  } catch (e) {
    console.warn("No se pudo parsear el workspace guardado");
    return;
  }

  const blockNodes = Array.from(dom.children).filter(
    (n) => n.tagName === "block" || n.tagName === "shadow"
  );
  if (blockNodes.length === 0) return;

  isRestoring = true;
  Blockly.Events.disable();

  // Ocultar el SVG mientras se insertan los bloques elimina el costo
  // de reflow/repaint por cada bloque — puede reducir 60-80% el tiempo
  const blocklyDiv = document.getElementById("blocklyDiv");
  const svg = blocklyDiv?.querySelector("svg.blocklySvg");
  if (svg) svg.style.visibility = "hidden";

  const makeWrapper = () => {
    const w = document.createElement("xml");
    w.setAttribute("xmlns", "https://developers.google.com/blockly/xml");
    return w;
  };

  let index = 0;

  function insertNext() {
    if (index >= blockNodes.length) {
      // Todo insertado — mostrar SVG y terminar
      if (svg) svg.style.visibility = "";
      Blockly.Events.enable();
      isRestoring = false;
      Code.workspace.scrollCenter();
      return;
    }

    // Un bloque por frame — si el bloque es muy complejo igual tardará,
    // pero el violation será del bloque puntual, no acumulado
    const wrapper = makeWrapper();
    wrapper.appendChild(blockNodes[index].cloneNode(true));

    try {
      Blockly.Xml.domToWorkspace(wrapper, Code.workspace);
    } catch (e) {
      console.warn("Error restaurando bloque", index, e);
    }

    index++;
    requestAnimationFrame(insertNext);
  }

  requestAnimationFrame(insertNext);
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
      Blockly.getMainWorkspace(),
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

// Y el setTimeout con más margen para que Blockly termine de inicializar
if (!IS_DESKTOP) {
  setTimeout(() => {
    if (!IS_DESKTOP) restoreWorkspaceFromLocal();
  }, 800);
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
    else {
      const a = document.getElementById("codeArea");
      if (a) a.value = "";
    }
    localStorage.removeItem(AUTOSAVE_KEY);
    if (window.pywebview?.api?.clear_autosave)
      await window.pywebview.api.clear_autosave();
  } catch (error) {
    console.error("Error al crear nuevo archivo:", error);
  }
  Blockly.Events.enable();
});

// ─────────────────────────────────────────────────────────────
// GUARDAR ARCHIVO (web + desktop)
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// DIAGNÓSTICO DE GUARDADO — log visible en terminal y consola
// ─────────────────────────────────────────────────────────────
function _saveLog(msg, isError = false) {
  const prefix = isError ? "❌ [SAVE]" : "🔍 [SAVE]";
  console[isError ? "error" : "log"](prefix, msg);
  // Mostrar en la terminal serial si está disponible
  try {
    if (typeof term !== "undefined" && term) {
      const color = isError ? "\x1b[31m" : "\x1b[90m";
      term.writeln(`${color}${prefix} ${msg}\x1b[0m`);
    }
  } catch (_) { }
  // También guardar en localStorage para recuperar después
  try {
    const logs = JSON.parse(localStorage.getItem("save_debug") || "[]");
    logs.push({ t: new Date().toISOString(), msg, isError });
    if (logs.length > 50) logs.shift();
    localStorage.setItem("save_debug", JSON.stringify(logs));
  } catch (_) { }
}

// Exponer función para ver logs desde la consola del navegador:
// escribe  window.showSaveLogs()  en la consola de DevTools
window.showSaveLogs = function () {
  let logs = [];
  try { logs = JSON.parse(localStorage.getItem("save_debug") || "[]"); }
  catch (_) { localStorage.removeItem("save_debug"); }
  if (!logs.length) { console.log("Sin logs de guardado aún"); return; }
  logs.forEach((l) => console[l.isError ? "error" : "log"](l.t, l.msg));
};

async function saveFileAuto(content, fileName = "") {
  _saveLog(`Inicio — fileName="${fileName}" contentLength=${content?.length ?? 0}`);

  // ── Detectar tipo y extensión ──
  let extension = "txt",
    mimeType = "text/plain",
    isBase64 = false;

  if (typeof content === "string" && content.startsWith("data:image/png")) {
    extension = "png";
    mimeType = "image/png";
    isBase64 = true;
  } else {
    const ext = (fileName.split(".").pop() || "").toLowerCase();
    if (ext === "xml") { extension = "xml"; mimeType = "text/xml"; }
    else if (ext === "py") { extension = "py"; mimeType = "text/x-python"; }
    else if (ext === "json") { extension = "json"; mimeType = "application/json"; }
    if (extension === "txt" && typeof content === "string" && content.trim().startsWith("<")) {
      extension = "xml"; mimeType = "text/xml";
    }
  }

  const suggestedName = fileName?.includes(".") ? fileName : `archivo.${extension}`;
  _saveLog(`Tipo detectado: extension=${extension} mimeType=${mimeType} suggestedName=${suggestedName}`);

  // ── Validar contenido — causa más común de 0 KB ──
  if (!content || content.length === 0) {
    _saveLog("CONTENIDO VACÍO — el archivo tendría 0 KB. Abortando.", true);
    if (typeof term !== "undefined" && term) {
      term.writeln("\r\n⚠ El contenido está vacío. No hay nada que guardar.\r\n");
    }
    return;
  }

  // ── Construir el Blob ──
  let blob;
  try {
    if (isBase64) {
      const binary = atob(content.split(",")[1]);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      blob = new Blob([bytes], { type: mimeType });
    } else {
      blob = new Blob([content], { type: mimeType });
    }
    _saveLog(`Blob creado: ${blob.size} bytes`);
    if (blob.size === 0) {
      _saveLog("BLOB VACÍO — revisar el contenido generado.", true);
      return;
    }
  } catch (err) {
    _saveLog(`Error creando Blob: ${err.message}`, true);
    return;
  }

  // ── Guardar: File System Access API (Chrome desktop) o descarga clásica (móvil/Safari) ──
  // Android Chrome tiene showSaveFilePicker pero NO persiste los datos (bug conocido)
  // Forzar fallback <a download> en Android.
  const isAndroid = /Android/i.test(navigator.userAgent);
  const hasFilePicker = typeof window.showSaveFilePicker === "function" && !isAndroid;
  _saveLog(`showSaveFilePicker disponible: ${typeof window.showSaveFilePicker === "function"}, isAndroid: ${isAndroid}`);
  if (isAndroid) {
    _saveLog("Android detectado → saltando File System Access API (bug conocido), usando <a download>");
  }
  if (hasFilePicker) {
    try {
      _saveLog("Intentando showSaveFilePicker...");
      const handle = await window.showSaveFilePicker({
        suggestedName,
        types: [{ description: `Archivo ${extension.toUpperCase()}`, accept: { [mimeType]: [`.${extension}`] } }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      _saveLog(`✅ Guardado con showSaveFilePicker: ${blob.size} bytes`);
      return;
    } catch (err) {
      if (err.name === "AbortError") {
        _saveLog("Usuario canceló el diálogo showSaveFilePicker");
        return;
      }
      _saveLog(`showSaveFilePicker falló (${err.name}: ${err.message}), usando fallback <a download>`, true);
    }
  }

  // ── Fallback universal: <a download> ──
  // Funciona en Android Chrome, iOS Safari 13.4+, Firefox, tablets.
  _saveLog("Usando fallback <a download>...");
  try {
    const url = URL.createObjectURL(blob);
    _saveLog(`Object URL creada: ${url.substring(0, 40)}...`);

    const a = document.createElement("a");
    a.href = url;
    a.download = suggestedName;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    _saveLog(`✅ Click disparado — descarga iniciada (${blob.size} bytes)`);

    setTimeout(() => {
      try {
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        _saveLog("Object URL revocada y elemento limpiado");
      } catch (_) { }
    }, 2000);
  } catch (err) {
    _saveLog(`Error en fallback <a download>: ${err.name}: ${err.message}`, true);
    if (typeof term !== "undefined" && term) {
      term.writeln(`\r\n⚠ No se pudo guardar: ${err.message}\r\nRevisa los logs con window.showSaveLogs() en la consola.\r\n`);
    }
  }
}

document.getElementById("btnSave").addEventListener("click", async (e) => {
  e.preventDefault();
  let xmlText = "";
  try {
    const dom = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    xmlText = Blockly.Xml.domToPrettyText(dom);
    _saveLog(`btnSave: xmlText generado, ${xmlText.length} chars, workspace blocks: ${Blockly.getMainWorkspace().getAllBlocks(false).length}`);
  } catch (err) {
    _saveLog(`btnSave: error generando XML — ${err.message}`, true);
  }
  if (window.pywebview?.api?.save_xml) {
    const result = await window.pywebview.api.save_xml(xmlText);
    if (result?.status === "ok" && DEBUG)
      console.log("Guardado en:", result.path);
  } else {
    await saveFileAuto(xmlText, "proyecto.xml");
  }
});

document
  .getElementById("btnLoad")
  .addEventListener("click", () => document.getElementById("loadXML").click());

document.getElementById("loadXML").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      Code.workspace.clear();
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(e.target.result),
        Code.workspace,
      );
      updateCodeFromBlockly();
      requestAnimationFrame(() => editor.refresh());
    } catch (err) {
      console.error(err);
    }
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
    Blockly.Xml.clearWorkspaceAndLoadFromXml(
      Blockly.Xml.textToDom(xmlText),
      Code.workspace,
    );
  } catch (e) {
    console.error("Error al recargar workspace", e);
  }
  Blockly.Events.enable();
}

document
  .getElementById("btnReload")
  .addEventListener("click", () => location.reload());

document.getElementById("btnSavePy").addEventListener("click", async (e) => {
  e.preventDefault();
  const fileName =
    document.getElementById("fileNameInput").value.trim() || "test.py";
  const code = editor.getValue();
  _saveLog(`btnSavePy: fileName="${fileName}" code.length=${code.length}`);
  if (window.pywebview?.api?.save_py) {
    const result = await window.pywebview.api.save_py(code, fileName);
    if (result?.status === "ok" && DEBUG)
      console.log(`Guardado ${fileName} en:`, result.path);
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
    if (!modal || !msg || !btnAccept || !btnCancel) {
      resolve(false);
      return;
    }
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

// ─────────────────────────────────────────────────────────────
// WEBSERIAL — Estado global
// ─────────────────────────────────────────────────────────────
let serialPort = null;
let serialReader = null;
let serialWriter = null;
let isConnected = false;
let isSendingCode = false;
let _stopRequested = false;  // abort flag para cancelar sendCodeToDevice
let isWorkSpace2 = true; // alias interno para claridad
let serialConnected = false;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

let serialBuffer = "";
let waitingResponse = false;
let isFileOperationBusy = false;

// ─────────────────────────────────────────────────────────────
// CONNECT
// ─────────────────────────────────────────────────────────────
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
      try {
        await serialReader.cancel();
      } catch { }
      try {
        serialReader.releaseLock();
      } catch { }
      serialReader = null;
    }
    if (serialWriter) {
      try {
        // En modo WiFi usamos _wifiClose; en USB usamos close() nativo del writer
        if (typeof serialWriter._wifiClose === "function") {
          await serialWriter._wifiClose();
        } else {
          await serialWriter.close();
        }
      } catch { }
      try {
        // releaseLock solo existe en WritableStreamDefaultWriter (USB)
        if (typeof serialWriter.releaseLock === "function" && serialWriter !== wifiSocket) {
          serialWriter.releaseLock();
        }
      } catch { }
      serialWriter = null;
    }
    if (serialPort?.readable) {
      try {
        await serialPort.close();
      } catch { }
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

document.addEventListener("DOMContentLoaded", () => {
  const btnWifi = document.getElementById("btnConnectionWifi");
  if (!btnWifi) return;

  btnWifi.addEventListener("click", async () => {
    if (serialConnected) {
      await disconnectSerial();
      return;
    }

    // Usar modal propio en lugar de prompt() bloqueante
    const savedHost = localStorage.getItem("esp32_wifi_host") || "";
    const savedPw = sessionStorage.getItem("esp32_wifi_pw") || "";
    const result = await _showWifiModal(savedHost || "192.168.0.1", savedPw || "");
    if (!result) return;  // usuario canceló

    const { host, password } = result;
    if (!host || !host.trim()) return;

    // Host en localStorage (no es secreto), contraseña solo en sessionStorage
    // (se borra al cerrar el navegador, no persiste entre sesiones)
    localStorage.setItem("esp32_wifi_host", host.trim());
    sessionStorage.setItem("esp32_wifi_pw", password);
    await connectWifiSerial(host.trim(), password);
  });
});

/**
 * Modal no-bloqueante para pedir IP y contraseña WiFi.
 * Usa #wifiModal (inyectado en el DOM al primer uso) con estilos propios,
 * sin depender del customModal del proyecto (que tiene fondo azul y título fijo).
 * Retorna { host, password } o null si se cancela.
 */
/**
 * Modal de confirmación para sobrescritura de archivos críticos del ESP32.
 * Retorna Promise<boolean> — true si el usuario confirma, false si cancela.
 * No usa confirm() bloqueante para no interrumpir el event loop del serial.
 */
function _confirmOverwrite(fileName) {
  return new Promise((resolve) => {
    const CRITICAL = ["main.py", "boot.py"];
    if (!CRITICAL.includes(fileName)) { resolve(true); return; }

    if (!document.getElementById("_overwriteModal")) {
      const style = document.createElement("style");
      style.textContent = `
        #_overwriteModal {
          display:none; position:fixed; inset:0; z-index:99999;
          background:rgba(0,0,0,0.55);
          align-items:center; justify-content:center;
        }
        #_overwriteModal.open { display:flex; }
        #_overwriteBox {
          background:#fff; color:#222; border-radius:12px;
          padding:24px 28px; width:340px; max-width:92vw;
          box-shadow:0 8px 32px rgba(0,0,0,0.28);
          font-family:'Segoe UI',system-ui,sans-serif;
          display:flex; flex-direction:column; gap:14px;
        }
        #_overwriteBox h3 { margin:0; font-size:16px; font-weight:700; color:#b45309; }
        #_overwriteBox p  { margin:0; font-size:13px; line-height:1.5; color:#444; }
        #_overwriteBox strong { color:#1a1a2e; }
        #_overwriteActions { display:flex; justify-content:flex-end; gap:10px; margin-top:4px; }
        #_btnOverwriteCancel {
          padding:8px 18px; border:1.5px solid #ccc; border-radius:7px;
          background:#fff; color:#555; font-size:14px; cursor:pointer; font-weight:600;
        }
        #_btnOverwriteCancel:hover { background:#f0f0f0; }
        #_btnOverwriteOk {
          padding:8px 20px; border:none; border-radius:7px;
          background:#d97706; color:#fff; font-size:14px; cursor:pointer; font-weight:700;
        }
        #_btnOverwriteOk:hover { background:#b45309; }
      `;
      document.head.appendChild(style);

      const modal = document.createElement("div");
      modal.id = "_overwriteModal";
      modal.innerHTML = `
        <div id="_overwriteBox">
          <h3>⚠ Archivo crítico del ESP32</h3>
          <p>Estás a punto de sobrescribir <strong id="_overwriteName"></strong>.<br>
          Este archivo se ejecuta automáticamente al encender la tarjeta.<br>
          ¿Deseas continuar?</p>
          <div id="_overwriteActions">
            <button id="_btnOverwriteCancel">Cancelar</button>
            <button id="_btnOverwriteOk">Sí, sobrescribir</button>
          </div>
        </div>`;
      document.body.appendChild(modal);
    }

    const modal = document.getElementById("_overwriteModal");
    const btnOk = document.getElementById("_btnOverwriteOk");
    const btnCan = document.getElementById("_btnOverwriteCancel");
    document.getElementById("_overwriteName").textContent = fileName;
    modal.classList.add("open");

    const _cleanup = (result) => {
      modal.classList.remove("open");
      btnOk.removeEventListener("click", _onOk);
      btnCan.removeEventListener("click", _onCancel);
      modal.removeEventListener("click", _onBackdrop);
      resolve(result);
    };
    const _onOk = () => _cleanup(true);
    const _onCancel = () => _cleanup(false);
    const _onBackdrop = (e) => { if (e.target === modal) _cleanup(false); };

    btnOk.addEventListener("click", _onOk);
    btnCan.addEventListener("click", _onCancel);
    modal.addEventListener("click", _onBackdrop);
    setTimeout(() => btnCan.focus(), 80);
  });
}

function _showWifiModal(defaultHost, defaultPassword) {
  return new Promise((resolve) => {

    // ── Crear el modal la primera vez ──
    if (!document.getElementById("wifiModal")) {
      const style = document.createElement("style");
      style.textContent = `
        #wifiModal {
          display: none; position: fixed; inset: 0; z-index: 99999;
          background: rgba(0,0,0,0.55);
          align-items: center; justify-content: center;
        }
        #wifiModal.open { display: flex; }
        #wifiModalBox {
          background: #fff; color: #222; border-radius: 12px;
          padding: 24px 28px; width: 320px; max-width: 92vw;
          box-shadow: 0 8px 32px rgba(0,0,0,0.28);
          font-family: 'Segoe UI', system-ui, sans-serif;
          display: flex; flex-direction: column; gap: 16px;
        }
        #wifiModalBox h3 {
          margin: 0; font-size: 17px; font-weight: 700;
          display: flex; align-items: center; gap: 8px; color: #1a1a2e;
        }
        #wifiModalBox label {
          display: flex; flex-direction: column;
          font-size: 13px; font-weight: 600; color: #444; gap: 5px;
        }
        #wifiModalBox input {
          padding: 9px 11px; border: 1.5px solid #ccc; border-radius: 7px;
          font-size: 15px; outline: none; transition: border-color .2s;
          color: #111; background: #fafafa;
        }
        #wifiModalBox input:focus { border-color: #3454d1; background: #fff; }
        #wifiModalActions {
          display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px;
        }
        #wifiBtnCancel {
          padding: 8px 18px; border: 1.5px solid #ccc; border-radius: 7px;
          background: #fff; color: #555; font-size: 14px; cursor: pointer;
          font-weight: 600; transition: background .15s;
        }
        #wifiBtnCancel:hover { background: #f0f0f0; }
        #wifiBtnConnect {
          padding: 8px 20px; border: none; border-radius: 7px;
          background: #3454d1; color: #fff; font-size: 14px; cursor: pointer;
          font-weight: 700; transition: background .15s;
        }
        #wifiBtnConnect:hover { background: #2340b0; }
      `;
      document.head.appendChild(style);

      const modal = document.createElement("div");
      modal.id = "wifiModal";
      modal.innerHTML = `
        <div id="wifiModalBox">
          <h3>📶 Conectar por WiFi</h3>
          <label>IP del ESP32
            <input id="wifiHostInput" type="text" placeholder="192.168.0.x"
              inputmode="decimal" autocomplete="off" spellcheck="false" />
          </label>
          <label>Contraseña WebREPL
            <input id="wifiPwInput" type="password" placeholder="blockly1"
              autocomplete="current-password" />
          </label>
          <div id="wifiModalActions">
            <button id="wifiBtnCancel">Cancelar</button>
            <button id="wifiBtnConnect">Conectar</button>
          </div>
        </div>`;
      document.body.appendChild(modal);
    }

    // ── Rellenar valores y abrir ──
    const modal = document.getElementById("wifiModal");
    const hostIn = document.getElementById("wifiHostInput");
    const pwIn = document.getElementById("wifiPwInput");
    const btnOK = document.getElementById("wifiBtnConnect");
    const btnCancel = document.getElementById("wifiBtnCancel");

    hostIn.value = defaultHost || "";
    pwIn.value = defaultPassword || "";
    modal.classList.add("open");
    setTimeout(() => hostIn.focus(), 80);

    const _close = () => modal.classList.remove("open");

    const _onOK = () => {
      const host = hostIn.value.trim();
      const pw = pwIn.value;
      _close();
      btnOK.removeEventListener("click", _onOK);
      btnCancel.removeEventListener("click", _onCancel);
      modal.removeEventListener("click", _onBackdrop);
      resolve(host ? { host, password: pw } : null);
    };

    const _onCancel = () => {
      _close();
      btnOK.removeEventListener("click", _onOK);
      btnCancel.removeEventListener("click", _onCancel);
      modal.removeEventListener("click", _onBackdrop);
      resolve(null);
    };

    // Cerrar al hacer clic en el backdrop (fuera del box)
    const _onBackdrop = (e) => {
      if (e.target === modal) _onCancel();
    };

    // Enter en cualquier campo = conectar
    const _onKeydown = (e) => {
      if (e.key === "Enter") { e.preventDefault(); _onOK(); }
      if (e.key === "Escape") _onCancel();
      modal.removeEventListener("keydown", _onKeydown);
    };

    btnOK.addEventListener("click", _onOK);
    btnCancel.addEventListener("click", _onCancel);
    modal.addEventListener("click", _onBackdrop);
    modal.addEventListener("keydown", _onKeydown);
  });
}

// ─────────────────────────────────────────────────────────────
// CONEXIÓN WIFI (WebREPL) — adaptador compatible con el resto
// del código serial: rellena serialWriter/serialReader-equivalentes
// y reutiliza isConnected, sendSerial(), el pipeline de lectura,
// _rawReplHook, SerialMonitor, etc. Así btnRun y todo lo demás
// funcionan igual que por USB sin tocar ni una línea más.
// ─────────────────────────────────────────────────────────────
let wifiSocket = null;
let _wifiLoginBuffer = "";
let _wifiLoggedIn = false;

// Valida que el host sea una IPv4 o un hostname local seguro.
// Previene conexiones a hosts arbitrarios inyectados por entrada maliciosa.
function _isValidEsp32Host(host) {
  if (!host || typeof host !== "string") return false;
  const h = host.trim();
  if (!h) return false;
  // IPv4 estricta: exactamente 4 octetos 0-255
  const ipv4Re = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const m = h.match(ipv4Re);
  if (m) {
    return m.slice(1).every(n => {
      const v = parseInt(n, 10);
      return v >= 0 && v <= 255;
    });
  }
  // Hostname local: debe contener al menos una letra para distinguirlo de IPs incompletas
  // (ej: "esp32.local" sí, "192.168.0" no)
  const hostnameRe = /^[a-zA-Z0-9][a-zA-Z0-9\-\.]{0,62}[a-zA-Z0-9]$/;
  const hasLetter = /[a-zA-Z]/.test(h);
  return hostnameRe.test(h) && hasLetter;
}

function connectWifiSerial(host, password) {
  return new Promise((resolve, reject) => {
    try {
      // ── Validar host antes de abrir el WebSocket ──
      if (!_isValidEsp32Host(host)) {
        const msg = `Host no válido: "${host}". Usa una IPv4 (ej: 192.168.0.1) o nombre local (ej: esp32.local).`;
        if (term) term.writeln(`\r\n⚠ ${msg}\r\n`);
        reject(new Error(msg));
        return;
      }

      if (!term) {
        initTerminal();
        enableTerminalInput();
      }

      term.writeln(`\r\nConectando a ws://${host}:8266 ...\r\n`);
      _setConnectingBadge();

      const ws = new WebSocket(`ws://${host}:8266`);
      ws.binaryType = "arraybuffer";

      _wifiLoginBuffer = "";
      _wifiLoggedIn = false;
      wifiSocket = ws;

      // ── Timeout de conexión (red no disponible, IP incorrecta, etc.) ──
      const connectTimeout = setTimeout(() => {
        if (ws.readyState !== WebSocket.OPEN) {
          ws.close();
          term.writeln("\r\n⚠ Tiempo de espera agotado conectando por WiFi\r\n");
          reject(new Error("timeout"));
        }
      }, 8000);

      ws.onopen = () => {
        clearTimeout(connectTimeout);
        term.writeln("Socket WiFi abierto, autenticando...\r\n");
      };

      // ── "Writer" compatible con serialWriter.write(Uint8Array) ──
      // OJO: WebREPL de MicroPython espera frames de TEXTO, no binarios.
      // Convertimos los bytes de vuelta a string antes de enviar (igual
      // que el script de consola que sí funcionaba con ws.send(string)).
      const txDecoder = new TextDecoder();
      wifiSocket.write = async (bytes) => {
        if (ws.readyState !== WebSocket.OPEN) return;
        const text = txDecoder.decode(bytes);
        if (window._wifiDebug) console.log("📤 WIFI TX:", JSON.stringify(text));
        ws.send(text);
      };
      // NOTA: NO sobreescribimos ws.close() para no romper el método nativo.
      // disconnectSerial() llama a serialWriter.write (inexistente en close) —
      // usamos un método separado _wifiClose para el cierre controlado.
      wifiSocket._wifiClose = async () => {
        try { ws.close(); } catch { }
      };
      wifiSocket.releaseLock = () => { };

      ws.onmessage = (event) => {
        let chunk = "";
        if (typeof event.data === "string") {
          chunk = event.data;
        } else {
          chunk = decoder.decode(event.data, { stream: true });
        }

        // ── Fase de login WebREPL: detectar "Password:" y responder ──
        if (!_wifiLoggedIn) {
          if (window._wifiDebug) console.log("📥 WIFI RX (login):", JSON.stringify(chunk));
          _wifiLoginBuffer += chunk;
          if (_wifiLoginBuffer.includes("Password:")) {
            if (window._wifiDebug) console.log("📤 WIFI TX (login): <password>\\r");
            ws.send((password || "") + "\r");
            _wifiLoginBuffer = "";
            return;
          }
          // Tras enviar la contraseña, WebREPL responde con "\r\nWebREPL connected\r\n>>> "
          if (_wifiLoginBuffer.includes(">>>") || _wifiLoginBuffer.includes("WebREPL connected")) {
            _wifiLoggedIn = true;

            isConnected = true;
            serialConnected = true;
            serialWriter = wifiSocket;   // reusa todo el código existente
            serialReader = null;         // no se usa en modo WiFi (no hay loop por reader)
            updateConnectionIcon(true);

            term.writeln("✅ Conectado por WiFi (WebREPL)\r\n");

            const btnConnect = document.getElementById("btnConnect");
            const btnDisconnect = document.getElementById("btnDisconnect");
            if (btnConnect) btnConnect.disabled = true;
            if (btnDisconnect) btnDisconnect.disabled = false;

            resolve(true);
            // No retornamos: dejamos pasar el resto del buffer (ej. ">>> ") al pipeline normal
            chunk = _wifiLoginBuffer;
            _wifiLoginBuffer = "";
          } else {
            return; // seguimos esperando más datos de login
          }
        }

        // ── Pipeline normal (igual que readSerialLoop por USB) ──
        if (window._wifiDebug) console.log("📥 WIFI RX:", JSON.stringify(chunk));
        term.write(chunk);
        if (typeof SerialMonitor !== "undefined") SerialMonitor.feed(chunk);
        if (typeof window._rawReplHook === "function") window._rawReplHook(chunk);
        if (waitingResponse) serialBuffer += chunk;
      };

      ws.onerror = (err) => {
        clearTimeout(connectTimeout);
        console.error("WiFi WS error:", err);
        if (!_wifiLoggedIn) reject(err);
        term.writeln("\r\n❌ Error de conexión WiFi\r\n");
      };

      ws.onclose = () => {
        clearTimeout(connectTimeout);
        term.writeln("\r\n🔌 Desconectado (WiFi)\r\n");
        if (serialWriter === wifiSocket) {
          isConnected = false;
          serialConnected = false;
          serialWriter = null;
          updateConnectionIcon(false);
          const btnConnect = document.getElementById("btnConnect");
          const btnDisconnect = document.getElementById("btnDisconnect");
          if (btnConnect) btnConnect.disabled = false;
          if (btnDisconnect) btnDisconnect.disabled = true;
        }
        wifiSocket = null;
      };
    } catch (error) {
      term.writeln("\r\nError conexión WiFi: " + error);
      reject(error);
    }
  });
}

// ─────────────────────────────────────────────────────────────
// READ LOOP
// ─────────────────────────────────────────────────────────────
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

        // Mostrar en terminal principal
        term.write(chunk);

        // Alimentar monitor serial
        if (typeof SerialMonitor !== "undefined") SerialMonitor.feed(chunk);

        // Hook para raw REPL (buffer local aislado)
        if (typeof window._rawReplHook === "function")
          window._rawReplHook(chunk);

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
    // Bloquear también durante sesiones raw/paste REPL para evitar corrupción
    if (
      typeof window._rawReplHook === "function" &&
      window._rawReplHook._isRawReplHook
    )
      return;
    if (DEBUG) console.log("DATA:", JSON.stringify(data));
    await sendSerial(data);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const btnConnection = document.getElementById("btnConnection");
  if (!btnConnection) return;
  updateConnectionIcon(false);
  btnConnection.addEventListener("click", async () => {
    if (serialConnected) {
      await disconnectSerial();
      return;
    }
    if (USE_WIFI_FALLBACK) {
      // En dispositivos sin Web Serial (tablet/móvil), este botón también abre el modal WiFi
      const savedHost = localStorage.getItem("esp32_wifi_host") || "";
      const savedPw = sessionStorage.getItem("esp32_wifi_pw") || "";
      const result = await _showWifiModal(savedHost || "192.168.0.1", savedPw || "");
      if (!result) return;
      localStorage.setItem("esp32_wifi_host", result.host.trim());
      sessionStorage.setItem("esp32_wifi_pw", result.password);
      await connectWifiSerial(result.host.trim(), result.password);
    } else if (HAS_WEB_SERIAL) {
      await connectSerial();
    } else {
      if (term) term.writeln("\r\n⚠ Web Serial no disponible en este navegador.\r\nUsa Chrome/Edge, o conecta por WiFi con el botón 📶\r\n");
    }
  });
});

// ─────────────────────────────────────────────────────────────
// EVENTOS USB — solo si Web Serial está disponible
// ─────────────────────────────────────────────────────────────
if (navigator.serial) {
  navigator.serial.addEventListener("disconnect", async (event) => {
    if (serialPort && event.target === serialPort) {
      term.writeln("\r\nDispositivo desconectado físicamente\r\n");
      await disconnectSerial();
    }
  });

  navigator.serial.addEventListener("connect", () => {
    term.writeln("\r\nDispositivo USB detectado\r\n");
  });
}

function updateConnectionIcon(connected) {
  const icon = document.getElementById("iconConnection");
  if (!icon) return;
  icon.classList.remove("icon-connect", "icon-disconnect");
  icon.classList.add(connected ? "icon-connect" : "icon-disconnect");

  /*
  // ── Badge de estado en el botón ──────────────────────────────
  // Se inyecta una sola vez; después solo actualizamos texto y color.
  const btn = document.getElementById("btnConnection");
  if (!btn) return;

  let badge = document.getElementById("_connBadge");
  if (!badge) {
    badge = document.createElement("span");
    badge.id = "_connBadge";
    badge.style.cssText = [
      "display:inline-flex", "align-items:center", "gap:4px",
      "font-size:11px", "font-weight:600", "padding:2px 7px",
      "border-radius:10px", "margin-left:5px",
      "pointer-events:none", "white-space:nowrap",
      "vertical-align:middle", "transition:background .25s,color .25s",
    ].join(";");
    btn.appendChild(badge);
  }

  if (connected) {
    badge.style.background = "#d1fae5";  // verde claro
    badge.style.color      = "#065f46";
    badge.innerHTML = '<span style="width:7px;height:7px;border-radius:50%;background:#10b981;display:inline-block"></span> Conectado';
  } else {
    badge.style.background = "#fee2e2";  // rojo claro
    badge.style.color      = "#991b1b";
    badge.innerHTML = '<span style="width:7px;height:7px;border-radius:50%;background:#ef4444;display:inline-block"></span> Desconectado';
  }*/
}

/** Estado intermedio "Conectando…" — llamar mientras dura el handshake WiFi */
function _setConnectingBadge() {
  const btn = document.getElementById("btnConnection");
  if (!btn) return;
  let badge = document.getElementById("_connBadge");
  if (!badge) {
    badge = document.createElement("span");
    badge.id = "_connBadge";
    badge.style.cssText = [
      "display:inline-flex", "align-items:center", "gap:4px",
      "font-size:11px", "font-weight:600", "padding:2px 7px",
      "border-radius:10px", "margin-left:5px",
      "pointer-events:none", "white-space:nowrap",
      "vertical-align:middle", "transition:background .25s,color .25s",
    ].join(";");
    btn.appendChild(badge);
  }
  badge.style.background = "#fef3c7";  // amarillo claro
  badge.style.color = "#92400e";
  badge.innerHTML = '<span style="width:7px;height:7px;border-radius:50%;background:#f59e0b;display:inline-block"></span> Conectando…';
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
  window._rawReplHook = (chunk) => {
    _localBuf += chunk;
  };

  async function _waitLocal(token, timeoutMs) {
    const end = Date.now() + timeoutMs;
    while (Date.now() < end) {
      if (_stopRequested) return false;
      if (_localBuf.includes(token)) return true;
      await sleep(20);
    }
    return false;
  }

  try {
    // 1. Interrumpir ejecución actual
    await sendSerial("\x03");
    await sleep(80);
    await sendSerial("\x03");
    await sleep(80);

    // 2. Entrar en raw REPL
    _localBuf = "";
    await sendSerial("\x01");
    let gotPrompt = await _waitLocal(">", 2000);
    if (!gotPrompt) {
      await sendSerial("\r\n");
      await sleep(60);
      _localBuf = "";
      await sendSerial("\x01");
      gotPrompt = await _waitLocal(">", 2000);
      if (!gotPrompt) return false;
    }

    // 3. Enviar código en bloques con progreso
    const bytes = encoder.encode(codeStr);
    const total = bytes.length;
    let sent = 0;

    // Mostrar barra de inicio
    term.write(`\r\n\x1b[36m↑ Enviando ${total} bytes\x1b[0m `);

    while (sent < total) {
      const end = Math.min(sent + chunkSz, total);
      const slice = bytes.slice(sent, end);
      await serialWriter.write(slice);
      sent = end;

      // Actualizar barra de progreso en la misma línea
      const pct = Math.round((sent / total) * 100);
      const bars = Math.round(pct / 5); // 20 bloques máx
      const bar = "█".repeat(bars) + "░".repeat(20 - bars);
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

    // 5. Volver a friendly REPL y esperar el prompt ">>>"
    _localBuf = "";
    await sendSerial("\x02");
    await _waitLocal(">>>", 3000);
    await sleep(100);

    return true;
  } finally {
    window._rawReplHook = null;
  }
}

// ─────────────────────────────────────────────────────────────
// BOTÓN: EJECUTAR
// ─────────────────────────────────────────────────────────────

/**
 * Envía el código actual al ESP32 sin cambiar de vista.
 * Expuesto como window.sendCodeToDevice() para que otros
 * módulos (ej. game-ui.js) puedan llamarlo directamente.
 */
async function sendCodeToDevice() {
  _stopRequested = false;  // reset abort flag
  if (!isConnected || !serialWriter) {
    if (typeof SerialMonitor !== "undefined")
      SerialMonitor.warn("Sin conexión — conecta el dispositivo primero");
    return false;
  }

  const code = getCode();
  if (!code?.trim()) {
    term.writeln("\r\nNo hay código para ejecutar\r\n");
    return false;
  }

  try {
    isSendingCode = true;
    // Mostrar las líneas del código en la terminal (igual que BIPES)
    term.writeln(
      "\r\n\x1b[36m─────────────── Enviando código ───────────────\x1b[0m",
    );
    code
      .replace(/\r/g, "")
      .split("\n")
      .forEach((line) => {
        if (line.trim()) term.writeln("\x1b[96m  " + line + "\x1b[0m");
      });
    term.writeln(
      "\x1b[36m───────────────────────────────────────────────\x1b[0m\r\n",
    );
    if (typeof SerialMonitor !== "undefined") SerialMonitor.notifySending(code);

    const bytes = encoder.encode(code);
    const isWifi = serialWriter === wifiSocket;

    //console.log("bytes a enviar", bytes.length);

    // En WiFi/WebREPL SIEMPRE usar Paste Mode.
    // En USB usar Paste Mode para códigos pequeños.
    if (isWifi || bytes.length < 256) {
      // ── Paste mode ────────────────────────────────────────────
      // El protocolo MicroPython paste mode es:
      //   Ctrl+C x2  → interrumpir
      //   Ctrl+E     → entrar (responde "paste mode; ... ===")
      //   <código>   → enviar TODO de una vez (sin \r\n extra entre líneas)
      //   Ctrl+D     → ejecutar → ESP responde con output + "\r\n>>>" o solo ">>>"
      //
      // IMPORTANTE: NO enviar línea por línea — cada \r\n intermedio
      // hace que el ESP muestre "===" y puede confundir la detección del fin.
      // IMPORTANTE: El ">>>" que aparece DENTRO del eco paste no es el prompt
      // final; solo el que llega DESPUÉS del Ctrl+D cuenta.

      let _pmBuf = "";
      let _pmDone = false; // se activa tras enviar Ctrl+D
      let _pmFoundPrompt = false;

      window._rawReplHook = (chunk) => {
        _pmBuf += chunk;
        // Solo contar ">>>" como prompt final si ya mandamos Ctrl+D
        if (_pmDone && _pmBuf.includes(">>>")) _pmFoundPrompt = true;
      };

      async function _waitPm(checkFn, ms) {
        const end = Date.now() + ms;
        while (Date.now() < end) {
          if (_stopRequested) return false;
          if (checkFn()) return true;
          await sleep(20);
        }
        return false;
      }

      // 1. Interrumpir ejecución actual (doble Ctrl+C)
      const d = isWifi ? 2.5 : 1; // WiFi/WebREPL es más lento que USB: damos más margen

      await sendSerial("\x03");
      await sleep(100 * d);
      await sendSerial("\x03");
      await sleep(100 * d);

      // 2. Entrar en paste mode — esperar el "==="
      _pmBuf = "";
      await sendSerial("\x05");
      const gotPaste = await _waitPm(() => _pmBuf.includes("==="), 2000 * d);
      if (!gotPaste) {
        // Reintento: forzar prompt limpio primero
        await sendSerial("\r\n");
        await sleep(80 * d);
        _pmBuf = "";
        await sendSerial("\x05");
        const retry = await _waitPm(() => _pmBuf.includes("==="), 2000 * d);
        if (!retry) {
          term.writeln("\r\n⚠ No se pudo entrar en paste mode. Reintenta.\r\n");
          window._rawReplHook = null;
          return;
        }
      }

      // 3. Enviar TODO el código de una sola vez (sin \r\n extra)
      //    El paste mode acepta el bloque completo hasta Ctrl+D
      const normalized = code.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      //await sendSerial(normalized);
      // Enviar en bloques para evitar saturar WebREPL
      for (let i = 0; i < normalized.length; i += 128) {
        await sendSerial(normalized.slice(i, i + 128));

        if (isWifi) {
          await sleep(15);
        }
      }
      if (isWifi) await sleep(50); // margen para que WebREPL procese el bloque

      // 4. Ctrl+D → ejecutar; a partir de aquí buscamos el ">>>" real
      _pmBuf = "";
      _pmDone = true;
      await sendSerial("\x04");

      // 5. Esperar el prompt ">>>" posterior al Ctrl+D (máx 10 s para scripts lentos)
      await _waitPm(() => _pmFoundPrompt, 10000);

      window._rawReplHook = null;
      await sleep(150 * d); // margen para que el ESP termine de imprimir
    } else {
      // USB -> Raw REPL
      const ok = await sendViaRawRepl(code);

      if (!ok) {
        term.writeln(
          "\r\n⚠ No se pudo entrar en raw REPL. Intentando Paste Mode...\r\n",
        );

        // Fallback automático
        await sendViaPasteMode(code);
      }
    }
    return true;
  } finally {
    window._rawReplHook = null;
    isSendingCode = false;
    if (typeof SerialMonitor !== "undefined") SerialMonitor.notifyDone();
    term.focus();
  }
}
window.sendCodeToDevice = sendCodeToDevice;
window.stopExecution = stopExecution;  // exponer para game-ui.js y serial-monitor.js

// NOTA: game-ui.js registra este evento en fase capture y llama
// window.globalRun() que delega a sendCodeToDevice() según la vista.
// Este listener queda como respaldo para entornos sin game-ui.js.
const _btnRun = document.getElementById("btnRun");
if (_btnRun) {
  _btnRun.addEventListener("click", async () => {
    // Si game-ui.js ya está cargado, globalRun() habrá sido llamado
    // desde el listener capture. Solo actuamos si no existe.
    if (typeof window.globalRun !== "function") {
      await sendCodeToDevice();
    }
  });
}

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
  const codeStr =
    typeof editor !== "undefined" && editor.getDoc
      ? editor.getDoc().getValue()
      : document.getElementById("codeEditor").value;

  // Nombre del archivo
  const fileNameInput = document.getElementById("fileNameInput");
  const rawFileName = fileNameInput?.value.trim() || "test.py";

  if (!isSafeFileName(rawFileName)) {
    term.writeln(
      `\r\n⚠ Nombre de archivo no válido: "${rawFileName}"\r\nUsa solo letras, números, guiones y extensión válida.\r\n`,
    );
    return;
  }

  const fileName = rawFileName;

  // Pedir confirmación antes de sobrescribir main.py o boot.py
  const confirmed = await _confirmOverwrite(fileName);
  if (!confirmed) {
    term.writeln(`\r\n✖ Subida cancelada — '${fileName}' no fue modificado.\r\n`);
    return;
  }

  term.writeln(`\r\nSubiendo '${fileName}' (${codeStr.length} bytes)...\r\n`);

  try {
    isSendingCode = true;
    if (typeof SerialMonitor !== "undefined")
      SerialMonitor.notifySending(codeStr);

    // Script que escribe el archivo en MicroPython
    const writeScript = [
      `_f = open('${fileName}', 'w')`,
      `_f.write(${JSON.stringify(codeStr)})`,
      `_f.close()`,
      `del _f`,
      `print('OK:${fileName}')`,
    ].join("\n");

    const scriptBytes = encoder.encode(writeScript);
    const _uploadIsWifi = serialWriter === wifiSocket;

    // En WiFi SIEMPRE usar paste mode (sendViaRawRepl requiere serialReader, no disponible en WiFi).
    // En USB usar paste mode para scripts pequeños, raw REPL para los grandes.
    if (_uploadIsWifi || scriptBytes.length < 256) {
      // Paste mode
      let _upBuf = "";
      let _upDone = false;
      let _upPrompt = false;
      window._rawReplHook = (chunk) => {
        _upBuf += chunk;
        if (_upDone && _upBuf.includes(">>>")) _upPrompt = true;
      };
      const _upWait = (checkFn, ms) => new Promise((res) => {
        const end = Date.now() + ms;
        const tick = () => checkFn() ? res(true) : (Date.now() < end ? setTimeout(tick, 20) : res(false));
        tick();
      });
      const _upD = _uploadIsWifi ? 2.5 : 1;

      await sendSerial("\x03");
      await sleep(100 * _upD);
      await sendSerial("\x03");
      await sleep(100 * _upD);
      _upBuf = "";
      await sendSerial("\x05");
      const gotPaste = await _upWait(() => _upBuf.includes("==="), 2000 * _upD);
      if (!gotPaste) {
        await sendSerial("\r\n");
        await sleep(80 * _upD);
        _upBuf = "";
        await sendSerial("\x05");
        const retry = await _upWait(() => _upBuf.includes("==="), 2000 * _upD);
        if (!retry) {
          window._rawReplHook = null;
          term.writeln("\r\n⚠ No se pudo entrar en paste mode. Reintenta.\r\n");
          return;
        }
      }
      const normScript = writeScript.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      for (let i = 0; i < normScript.length; i += 128) {
        await sendSerial(normScript.slice(i, i + 128));
        if (_uploadIsWifi) await sleep(15);
      }
      if (_uploadIsWifi) await sleep(50);
      _upBuf = "";
      _upDone = true;
      await sendSerial("\x04");
      await _upWait(() => _upPrompt, 8000);
      window._rawReplHook = null;
      await sleep(150 * _upD);
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
  if (!serialWriter) {
    if (term) term.writeln("\r\nNo conectado\r\n");
    return Promise.resolve();
  }
  try {
    // Abortar cualquier sendCodeToDevice en curso inmediatamente
    _stopRequested = true;
    window._rawReplHook = null;
    isSendingCode = false;
    if (typeof SerialMonitor !== "undefined") SerialMonitor.notifyDone();

    // Ctrl+C doble sin esperas largas para respuesta inmediata
    await sendSerial("\x03");
    await sleep(50);
    await sendSerial("\x03");
    await sleep(50);
    await sendSerial("\r\n");

    term.writeln("\r\nEjecución detenida\r\n");
  } catch (error) {
    console.error("Error enviando Ctrl+C:", error);
  }
  // Siempre retorna Promise resuelta para que .then() nunca falle
  return Promise.resolve();
}

document.getElementById("btnStop").addEventListener("click", stopExecution);

const _btnConsoleReset = document.getElementById("btnConsoleReset");
if (_btnConsoleReset) {
  _btnConsoleReset.addEventListener("click", async () => {
    await sendSerial("\x03");
    await sleep(100);
    await sendSerial("\x04");
  });
}

const _btnConsoleClear = document.getElementById("btnConsoleClear");
if (_btnConsoleClear) {
  _btnConsoleClear.addEventListener("click", () => {
    term.clear();
  });
}

// ─────────────────────────────────────────────────────────────
// RESET DE ESTADO SERIAL
// ─────────────────────────────────────────────────────────────
function resetSerialState() {
  serialReader = null;
  serialWriter = null;
  serialPort = null;
  isConnected = false;
  serialConnected = false;
  serialBuffer = "";
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
      await sendSerial("\x03");
      await sleep(100);
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
    serialBuffer = "";
    waitingResponse = true;

    return new Promise((resolve) => {
      const start = Date.now();
      const check = () => {
        if (
          (serialBuffer.includes("]") && serialBuffer.includes(">>>")) ||
          Date.now() - start >= timeout
        ) {
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
        if (!this.isOpening) this.openFile(file);
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

      iconsDiv.append(runBtn, downloadBtn, deleteBtn);
      row.append(nameDiv, iconsDiv);
      container.appendChild(row);
    });
  },

  async openFile(fileName) {
    try {
      requireSafeFileName(fileName);
    } catch {
      return;
    }
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

      let content = serialBuffer
        .replace(
          new RegExp(`print\\(open\\('${fileName}'\\)\\.read\\(\\)\\)`),
          "",
        )
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
    try {
      requireSafeFileName(fileName);
    } catch {
      return;
    }
    if (!isConnected) return;
    term.writeln(`\r\nEjecutando ${fileName}...\r\n`);
    await sendSerial("\x03");
    await sleep(100);
    await sendSerial(`exec(open('${fileName}').read())\r\n`);
  },

  async deleteFile(fileName) {
    try {
      requireSafeFileName(fileName);
    } catch {
      return;
    }
    if (!confirm("¿Eliminar " + fileName + "?")) return;
    if (fileName === "boot.py") {
      console.log("No se recomienda eliminar boot.py");
      return;
    }
    term.writeln(`\r\nEliminando ${fileName}...\r\n`);
    await sendSerial("\x03");
    await sleep(100);
    await sendSerial("import os\r\n");
    await sendSerial(`os.remove('${fileName}')\r\n`);
    term.writeln("Archivo eliminado\r\n");
    this.listFiles();
  },

  async downloadFile(fileName) {
    try {
      requireSafeFileName(fileName);
    } catch {
      return;
    }
    if (!isConnected) {
      term.writeln("\r\nESP32 no conectado\r\n");
      return;
    }
    if (isFileOperationBusy) return;
    isFileOperationBusy = true;

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

      let content = serialBuffer
        .replace(
          new RegExp(`print\\(open\\('${fileName}'\\)\\.read\\(\\)\\)`),
          "",
        )
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
    window.FLOATING.forEach((el) => {
      if (el) el.style.display = show ? "" : "none";
    });
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
  let logs = [];
  try { logs = JSON.parse(localStorage.getItem("app_logs") || "[]"); }
  catch (_) { localStorage.removeItem("app_logs"); }
  logs.push({ type, message, ...extra, time: new Date().toISOString() });
  if (logs.length > 500) logs.shift();
  try { localStorage.setItem("app_logs", JSON.stringify(logs)); } catch (_) { }
}

window.addEventListener("error", (event) => {
  saveLog("JS_ERROR", event.message, {
    file: event.filename,
    line: event.lineno,
    column: event.colno,
  });
});
window.addEventListener("unhandledrejection", (event) => {
  saveLog("PROMISE_ERROR", event.reason?.message || event.reason);
});

// ─────────────────────────────────────────────────────────────
// COMPARTIR ENLACE
// ─────────────────────────────────────────────────────────────
function generarLinkCompartir() {
  const xmlText = Blockly.Xml.domToText(
    Blockly.Xml.workspaceToDom(Code.workspace),
  );
  const compressed = LZString.compressToEncodedURIComponent(xmlText);
  return window.location.origin + window.location.pathname + "#" + compressed;
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

  const refreshBtn =
    document.getElementById("btnRefreshFiles") ||
    document.getElementById("refreshFilesList") ||
    document.getElementById("btnListFiles");
  refreshBtn?.addEventListener("click", () => Files.listFiles());
});

function cargarDesdeURL() {
  if (window.location.hash.length > 1) {
    try {
      const xmlText = LZString.decompressFromEncodedURIComponent(
        window.location.hash.substring(1),
      );
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(xmlText),
        Code.workspace,
      );
    } catch (e) {
      console.error("Error al cargar desde URL:", e);
    }
  }
}

window.addEventListener("load", () => {
  cargarDesdeURL();
  document.querySelectorAll(".icon-btn").forEach((el) => {
    el.style.visibility = "visible";
  });
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
  }, 150),
);

document.addEventListener("visibilitychange", () => {
  const hidden = document.visibilityState !== "visible";
  toggleFloating(!hidden);
  if (!hidden)
    requestAnimationFrame(() => {
      refreshBlockly();
      refreshTerminalFit();
    });
});

window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    if (Code.workspace) Blockly.svgResize(Code.workspace);
  }, 200);
});

// ─────────────────────────────────────────────────────────────
// DOBLE CLICK EN runstart
// ─────────────────────────────────────────────────────────────
Code.workspace.getParentSvg().addEventListener("dblclick", function () {
  const block = Blockly.selected;
  if (block?.type === "runstart") runBlocklyAnimation();
});