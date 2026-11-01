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

  return { embedded, toast, copy, editPayload, insertBlocks, escapeXml, pyName, paintGrid };
})();
