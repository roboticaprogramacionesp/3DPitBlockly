/**
 * wifi-transport.js
 * -----------------------------------------------------------------
 * Transporte WiFi para tablets/teléfonos (sin Web Serial API).
 * Habla el protocolo WebREPL nativo de MicroPython (WebSocket,
 * puerto 8266) y expone el MISMO "shape" que tu código ya usa:
 *
 *      serialPort, serialWriter, serialReader, isConnected, ...
 *
 * Así, sendSerial(), readSerialLoop(), sendViaRawRepl() y el modo
 * paste de main.js funcionan SIN MODIFICACIONES — solo cambia cómo
 * se abre la conexión.
 *
 * USO (en main.js):
 *
 *   async function connectSerial() {
 *     if (USE_WIFI) {
 *       await connectWifiSerial();   // <-- esta función
 *       return;
 *     }
 *     // ... código USB existente ...
 *   }
 *
 * connectWifiSerial() deja listas las mismas variables globales
 * (serialWriter, serialReader, isConnected, serialConnected) que
 * usa el resto de tu app, por lo que disconnectSerial(), sendSerial(),
 * sendViaRawRepl(), etc. no necesitan tocarse.
 * -----------------------------------------------------------------
 */

/* ============================================================
   ESTADO WIFI
   ============================================================ */
let _wifiSocket = null;
let _wifiAuthenticated = false;
let _wifiPasswordPromise = null;

/** IP/host por defecto del ESP32 en modo Access Point */
const WIFI_DEFAULT_HOST = "192.168.4.1";
const WIFI_DEFAULT_PORT = 8266;

/* ============================================================
   "writer" / "reader" compatibles con la interfaz WebStreams
   que ya usa main.js (serialWriter.write(Uint8Array),
   serialReader.read() -> {value, done})
   ============================================================ */

function _makeWifiWriter(ws) {
  return {
    async write(uint8arr) {
      if (!ws || ws.readyState !== WebSocket.OPEN) return;
      ws.send(uint8arr);
    },
    async close() {
      /* no-op: el socket se cierra en disconnect */
    },
    releaseLock() { },
  };
}

function _makeWifiReader(ws) {
  // Cola de chunks recibidos por WebSocket, consumida por readSerialLoop()
  const queue = [];
  let resolveWaiting = null;
  let closed = false;

  ws.addEventListener("message", (ev) => {
    let chunk;
    if (typeof ev.data === "string") {
      chunk = new TextEncoder().encode(ev.data);
    } else if (ev.data instanceof ArrayBuffer) {
      chunk = new Uint8Array(ev.data);
    } else {
      return;
    }
    if (resolveWaiting) {
      const r = resolveWaiting;
      resolveWaiting = null;
      r({ value: chunk, done: false });
    } else {
      queue.push(chunk);
    }
  });

  ws.addEventListener("close", () => {
    closed = true;
    if (resolveWaiting) {
      const r = resolveWaiting;
      resolveWaiting = null;
      r({ value: undefined, done: true });
    }
  });

  return {
    async read() {
      if (queue.length > 0) {
        return { value: queue.shift(), done: false };
      }
      if (closed) return { value: undefined, done: true };
      return new Promise((resolve) => {
        resolveWaiting = resolve;
      });
    },
    async cancel() {
      closed = true;
    },
    releaseLock() { },
  };
}

/* ============================================================
   CONEXIÓN WEBREPL (handshake de contraseña)
   ============================================================ */

/**
 * Abre el WebSocket hacia el ESP32 y resuelve la promesa cuando
 * WebREPL confirma autenticación ("WebREPL connected").
 * @param {string} host  IP o hostname del ESP32 (ej. "192.168.4.1")
 * @param {string} password  Contraseña configurada en boot.py
 * @param {number} [port=8266]
 */

function authListener(ev) {

  let text = "";

  if (typeof ev.data === "string") {
    text = ev.data;
  } else if (ev.data instanceof ArrayBuffer) {
    text = new TextDecoder().decode(ev.data);
  } else {
    return;
  }

  authBuffer += text;

  console.log("[WebREPL AUTH]", JSON.stringify(text));

  if (
    authBuffer.includes("Password:") &&
    !_wifiAuthenticated
  ) {

    console.log("[WebREPL] enviando password");

    ws.send(password + "\n");

    _wifiAuthenticated = true;
    return;
  }

  if (
    authBuffer.includes("WebREPL connected") ||
    authBuffer.includes(">>> ")
  ) {

    console.log("[WebREPL] autenticado");

    if (!settled) {
      settled = true;
      clearTimeout(authTimeout);

      ws.removeEventListener("message", authListener);

      resolve(ws);
    }

    return;
  }

  if (
    authBuffer.toLowerCase().includes("access denied")
  ) {

    if (!settled) {

      settled = true;

      clearTimeout(authTimeout);

      ws.close();

      reject(new Error("Contraseña incorrecta"));
    }
  }
}

/* ============================================================
   API PÚBLICA — reemplaza connectSerial()/disconnectSerial()
   cuando se usa WiFi
   ============================================================ */

/**
 * Conecta por WiFi usando WebREPL. Deja las variables globales
 * (serialWriter, serialReader, isConnected, serialConnected) en
 * el mismo estado que dejaría connectSerial() por USB, para que
 * el resto de main.js funcione sin cambios.
 *
 * @param {string} host  IP del ESP32, ej. "192.168.4.1"
 * @param {string} password  Contraseña de WebREPL
 */
async function connectWifiSerial(host, password) {
  try {
    if (!term) {
      initTerminal();
      enableTerminalInput();
    }

    term.writeln(`Conectando a ${host} por WiFi…\r\n`);

    const ws = await _openWebRepl(host, password);
    _wifiSocket = ws;
    _wifiAuthenticated = true;

    window.ws = ws;

    window.sendLine = function (txt) {
      ws.send(txt + "\r");
    };

    // Reemplaza el transporte global — el resto de main.js no sabe
    // (ni necesita saber) que esto es WiFi y no USB.
    serialPort = { __isWifi: true };
    serialWriter = _makeWifiWriter(ws);
    serialReader = _makeWifiReader(ws);

    isConnected = true;
    serialConnected = true;
    updateConnectionIcon(true);

    term.writeln("MicroPython Terminal (WiFi)\r\n");

    ws.addEventListener("close", () => {
      if (isConnected) {
        term.writeln("\r\nConexión WiFi perdida\r\n");
        disconnectSerial();
      }
    });

    await sendSerial("\x03"); // interrumpir cualquier ejecución pendiente
    readSerialLoop(); // la misma función de main.js — ya funciona con este reader
  } catch (error) {
    if (term) term.writeln("\r\nError conexión WiFi: " + error.message + "\r\n");
    else console.error(error);
    _wifiSocket = null;
    _wifiAuthenticated = false;
  }
}

/**
 * Cierra el socket WiFi. Llamar ANTES o EN VEZ de disconnectSerial()
 * si el transporte activo es WiFi (disconnectSerial() de main.js ya
 * intenta serialWriter.close()/serialReader.cancel(), que aquí son
 * no-ops seguros, así que en la práctica disconnectSerial() normal
 * también sirve).
 */
function closeWifiSocket() {
  if (_wifiSocket) {
    try {
      _wifiSocket.close();
    } catch (_) { }
  }
  _wifiSocket = null;
  _wifiAuthenticated = false;
}

window.connectWifiSerial = connectWifiSerial;
window.closeWifiSocket = closeWifiSocket;
