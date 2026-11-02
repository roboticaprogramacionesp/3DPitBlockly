// Funciones compartidas de las herramientas (static/tools/*.html).
//
// Dentro de la app las herramientas se abren en un iframe (ver
// static/tools-panel.js): "Insertar en mis bloques" le manda a la app el
// XML del bloque por postMessage. Abiertas solas (sin app alrededor) ese
// botón se oculta y queda "Copiar código".
const Tools = (() => {
  const embedded = window.parent !== window;

  function toast(text) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.classList.add("show");
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove("show"), 1800);
  }

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      // pywebview / http sin permisos de portapapeles
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    toast("Código copiado");
  }

  // Dibujo del bloque que se está editando ({blockId, name, w, h, data}),
  // o null si la herramienta se abrió para crear uno nuevo.
  function editPayload() {
    try {
      return (embedded && window.parent.toolsEditPayload) || null;
    } catch (_) {
      return null;
    }
  }

  // Con replaceId la app actualiza ese bloque en vez de insertar uno nuevo.
  function insertBlocks(xml, replaceId) {
    window.parent.postMessage({ type: "3dpit-insert-blocks", xml, replaceId }, location.origin);
  }

  // REPL del ESP32 a través de la app (solo dentro de ella). La app
  // responde {connected, busy} a cada pedido y también después de cada
  // orden mandada con repl(): por eso replStatus() es solo para mostrar el
  // estado, y para arrancar algo se usa replOnce(), que avisa una sola vez
  // (si arrancara con replStatus, cada orden volvería a arrancarlo).
  let replListener = null;
  let replOnceQueue = [];
  window.addEventListener("message", (e) => {
    if (e.origin !== location.origin || !e.data || e.data.type !== "3dpit-repl-status") return;
    if (replListener) replListener(e.data);
    const once = replOnceQueue;
    replOnceQueue = [];
    once.forEach((fn) => fn(e.data));
  });
  // Recibe el texto que responde la placa (onData(chunk)); null deja de escuchar.
  let dataListener = null;
  window.addEventListener("message", (e) => {
    if (e.origin === location.origin && e.data && e.data.type === "3dpit-repl-data" && dataListener) {
      dataListener(e.data.chunk);
    }
  });
  function replListen(onData) {
    dataListener = onData;
    if (embedded) window.parent.postMessage({ type: "3dpit-repl-listen", on: !!onData }, location.origin);
  }

  // Orden a mandar si se cierra la ventana con algo corriendo (null = nada).
  function replCleanup(code) {
    if (embedded) window.parent.postMessage({ type: "3dpit-repl-cleanup", code: code || "" }, location.origin);
  }

  function repl(code) {
    if (embedded) window.parent.postMessage({ type: "3dpit-repl", code }, location.origin);
  }
  function replStatus(onStatus) {
    replListener = onStatus;
    if (embedded) window.parent.postMessage({ type: "3dpit-repl-status" }, location.origin);
    else onStatus({ connected: false, busy: false });
  }
  function replOnce(cb) {
    if (!embedded) { cb({ connected: false, busy: false }); return; }
    replOnceQueue.push(cb);
    window.parent.postMessage({ type: "3dpit-repl-status" }, location.origin);
  }

  // Antes de usar la placa: si no se puede (herramienta abierta sola, placa
  // sin conectar o subiendo código) avisa qué hacer y devuelve false.
  // `notice` (opcional) es un elemento donde además se deja el aviso.
  function needBoard(st, notice) {
    let msg = null;
    if (!embedded) msg = "Abre esta herramienta desde 3DPit Blocks (botón 🛠) para usar la placa.";
    else if (!st.connected) msg = "🔌 Primero conecta la placa: cierra esta ventana y usa el botón de conexión (el enchufe) de la barra de arriba. Después vuelve a intentarlo.";
    else if (st.busy) msg = "⏳ La app está subiendo código a la placa. Espera a que termine y vuelve a intentarlo.";
    if (!msg) return true;
    toast(msg.split(":")[0].split(".")[0]);
    if (notice) {
      notice.innerHTML = "";
      const p = document.createElement("p");
      p.className = "need-board";
      p.textContent = msg;
      notice.appendChild(p);
    }
    return false;
  }

  // Placa elegida en la app (ESP32_BOARDS de conversion.js), si la hay.
  function currentBoard() {
    try {
      return (embedded && window.parent.getCurrentBoard && window.parent.getCurrentBoard()) || null;
    } catch (_) {
      return null;
    }
  }

  function escapeXml(text) {
    return String(text).replace(/[<>&"']/g, (c) => ({
      "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
    })[c]);
  }

  // Nombre de variable de Python válido, o el valor por defecto.
  function pyName(text, fallback) {
    const clean = String(text || "").trim();
    return /^[A-Za-z_]\w*$/.test(clean) ? clean : fallback;
  }

  // 1 bit por píxel, filas de ceil(w/8) bytes, bit alto = columna izquierda
  // (framebuf.MONO_HLSB: lo que esperan OLED.icon y Max8x8.icon).
  function monoHex(ed) {
    const rowBytes = Math.ceil(ed.w / 8);
    let hex = "";
    for (let y = 0; y < ed.h; y++)
      for (let b = 0; b < rowBytes; b++) {
        let v = 0;
        for (let i = 0; i < 8; i++) {
          const x = b * 8 + i;
          v = (v << 1) | (x < ed.w && ed.values[y * ed.w + x] ? 1 : 0);
        }
        hex += v.toString(16).padStart(2, "0");
      }
    return hex;
  }

  function monoFromHex(hex, w, h) {
    const rowBytes = Math.ceil(w / 8);
    const out = [];
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        const byte = parseInt(hex.substr((y * rowBytes + (x >> 3)) * 2, 2), 16) || 0;
        out.push(byte & (0x80 >> (x & 7)) ? 1 : 0);
      }
    return out;
  }

  // Paleta de colores con "Otro color". Devuelve () => color elegido.
  const PALETTE = [
    ["Rojo", "#ff0000"], ["Naranja", "#ff8000"], ["Amarillo", "#ffff00"],
    ["Verde", "#00ff00"], ["Cian", "#00ffff"], ["Azul", "#0000ff"],
    ["Morado", "#8000ff"], ["Rosa", "#ff0080"], ["Blanco", "#ffffff"],
  ];
  function palette(container, extra) {
    let color = PALETTE[0][1];
    container.innerHTML =
      '<p class="section-title">Color</p><div class="swatches"></div>' +
      '<div class="row" style="margin-top:8px"><input type="color" value="#ff00ff" title="Otro color">' +
      '<span class="hint">Otro color</span></div>';
    const box = container.querySelector(".swatches");
    const all = PALETTE.concat(extra || []).map(([label, hex]) => {
      const b = document.createElement("button");
      b.className = "swatch";
      b.title = label;
      b.style.background = hex;
      b.onclick = () => select(hex, b);
      box.appendChild(b);
      return b;
    });
    function select(hex, el) {
      color = hex;
      all.forEach((s) => s.classList.toggle("active", s === el));
    }
    const custom = container.querySelector('input[type="color"]');
    custom.oninput = () => select(custom.value, null);
    select(color, all[0]);
    return () => color;
  }

  // Entradas X e Y en 0 para los bloques de imagen.
  function xy() {
    const num = (f) => `<value name="${f}"><shadow type="math_number"><field name="NUM">0</field></shadow></value>`;
    return num("X") + num("Y");
  }

  // Cuadrícula que se pinta arrastrando. onPaint(index, isFirst) se llama
  // por cada celda que toca el puntero; isFirst marca el inicio del trazo
  // (para decidir si el trazo enciende o apaga).
  function paintGrid(container, cols, rows, onPaint) {
    container.innerHTML = "";
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    const cells = [];
    for (let i = 0; i < cols * rows; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.index = i;
      container.appendChild(cell);
      cells.push(cell);
    }
    let painting = false;
    let last = -1;
    function cellAt(e) {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      return el && el.classList.contains("cell") && container.contains(el) ? el : null;
    }
    container.onpointerdown = (e) => {
      const cell = cellAt(e);
      if (!cell) return;
      painting = true;
      last = Number(cell.dataset.index);
      onPaint(last, true);
      e.preventDefault();
    };
    container.onpointermove = (e) => {
      if (!painting) return;
      const cell = cellAt(e);
      if (!cell) return;
      const index = Number(cell.dataset.index);
      if (index === last) return;
      last = index;
      onPaint(index, false);
    };
    const stop = () => { painting = false; last = -1; };
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return cells;
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-embedded-only]").forEach((el) => {
      el.hidden = !embedded;
    });
  });

  return { embedded, toast, copy, editPayload, insertBlocks, escapeXml, pyName, paintGrid, monoHex, monoFromHex, xy, palette, repl, replStatus, replOnce, replListen, replCleanup, needBoard, currentBoard };
})();
