// Panel de avisos (estilo App Inventor): esquina inferior izquierda del
// workspace con un contador de advertencias (⚠) y otro de errores (✖).
// Las flechas ▲/▼ de cada contador saltan al bloque anterior/siguiente con
// ese problema, y "Mostrar avisos" marca cada bloque con el ícono de
// advertencia de Blockly y el motivo, para que el alumno vea qué corregir.
//
// Advertencias:
//   - bloque de valor (los que encajan en un hueco) suelto en el workspace:
//     no está conectado a nada, así que no genera código útil.
//   - pila de instrucciones suelta, aparte del programa principal (la pila
//     de más arriba).
//   - hueco de valor vacío: el generador pone un valor por defecto en su
//     lugar, que casi nunca es lo que el alumno quería.
// Errores:
//   - avisos que el propio bloque se pone (p.ej. "romper bucle" fuera de un
//     bucle). Se leen del ícono de advertencia del bloque, sin contar el
//     texto que agrega este panel.
function addWorkspaceWarnings(workspace) {
  const NS = "http://www.w3.org/2000/svg";
  const svg = workspace.getParentSvg();
  const WARNING_ID = "avisos3dpit";
  const STORAGE_KEY = "3dpit-mostrar-avisos";
  const WIDTH = 150;
  const HEIGHT = 92;
  const VALUE_INPUT = Blockly.inputTypes ? Blockly.inputTypes.VALUE : Blockly.INPUT_VALUE;

  // Huecos que pueden quedar vacíos a propósito.
  const OPTIONAL_INPUTS = {
    lists_create_with: true,
    text_join: true,
    procedures_defreturn: true,
    procedures_ifreturn: true,
  };

  let showWarnings = false;
  try {
    showWarnings = localStorage.getItem(STORAGE_KEY) === "1";
  } catch (_) {}

  let warningBlocks = [];
  let errorBlocks = [];
  const navIndex = { warning: -1, error: -1 };
  // Bloques a los que este panel les puso texto, para poder quitárselo
  // aunque el problema se haya corregido o el bloque haya cambiado.
  let marked = new Set();

  // ================= CONTENEDOR

  const container = document.createElementNS(NS, "g");
  container.setAttribute("class", "blocklyWorkspaceWarnings floating-tools");
  container.setAttribute("pointer-events", "all");
  svg.appendChild(container);

  function el(tag, attrs, parent) {
    const node = document.createElementNS(NS, tag);
    Object.keys(attrs).forEach((k) => node.setAttribute(k, attrs[k]));
    (parent || container).appendChild(node);
    return node;
  }

  function onPress(node, handler) {
    node.style.cursor = "pointer";
    node.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      handler();
    });
  }

  el("rect", {
    x: 0, y: 0, width: WIDTH, height: HEIGHT, rx: 6, ry: 6,
    fill: "#ffffff", "fill-opacity": 0.92, stroke: "#888",
  });

  function arrow(cx, y, up, onClick, title) {
    const g = el("g", {});
    el("title", {}, g).textContent = title;
    // Área de clic más grande que el triángulo, para tocar en tablet.
    el("rect", { x: cx - 16, y: y - 4, width: 32, height: 18, fill: "transparent" }, g);
    const points = up
      ? `${cx - 8},${y + 10} ${cx + 8},${y + 10} ${cx},${y}`
      : `${cx - 8},${y} ${cx + 8},${y} ${cx},${y + 10}`;
    const tri = el("polygon", { points, fill: "#ddd", stroke: "#888" }, g);
    onPress(g, onClick);
    return tri;
  }

  function counter(cx, kind) {
    const label = kind === "warning" ? "advertencia" : "error";
    const upArrow = arrow(cx, 6, true, () => navigate(kind, -1), `Ir al ${label} anterior`);
    const downArrow = arrow(cx, 46, false, () => navigate(kind, 1), `Ir al siguiente ${label}`);

    const g = el("g", {});
    el("title", {}, g).textContent =
      kind === "warning" ? "Advertencias: bloques sueltos o huecos vacíos" : "Errores en los bloques";
    if (kind === "warning") {
      el("polygon", {
        points: `${cx - 20},${38} ${cx - 4},${38} ${cx - 12},${23}`,
        fill: "#f5c518", stroke: "#a07c00", "stroke-linejoin": "round",
      }, g);
      el("text", {
        x: cx - 12, y: 36.5, "text-anchor": "middle",
        "font-size": 11, "font-weight": "bold", fill: "#000",
      }, g).textContent = "!";
    } else {
      el("circle", { cx: cx - 12, cy: 31, r: 8, fill: "#d93025" }, g);
      el("path", {
        d: `M${cx - 15.5},27.5 L${cx - 8.5},34.5 M${cx - 8.5},27.5 L${cx - 15.5},34.5`,
        stroke: "#fff", "stroke-width": 2, "stroke-linecap": "round",
      }, g);
    }
    const count = el("text", {
      x: cx + 2, y: 36, "font-size": 14, "font-family": "sans-serif", fill: "#333",
    }, g);
    count.textContent = "0";
    return { count, upArrow, downArrow };
  }

  const warningCounter = counter(48, "warning");
  const errorCounter = counter(108, "error");

  const toggleBtn = el("g", {});
  el("title", {}, toggleBtn).textContent =
    "Marca en cada bloque con problemas qué es lo que le falta";
  const toggleRect = el("rect", {
    x: 10, y: 62, width: WIDTH - 20, height: 24, rx: 4, ry: 4,
    fill: "#f2f2f2", stroke: "#888",
  }, toggleBtn);
  const toggleText = el("text", {
    x: WIDTH / 2, y: 78.5, "text-anchor": "middle",
    "font-size": 13, "font-family": "sans-serif", fill: "#333",
  }, toggleBtn);
  onPress(toggleBtn, () => {
    showWarnings = !showWarnings;
    try {
      localStorage.setItem(STORAGE_KEY, showWarnings ? "1" : "0");
    } catch (_) {}
    refresh();
  });

  // ================= POSICIÓN (abajo a la izquierda, junto al toolbox)

  function position() {
    const metrics = workspace.getMetrics();
    if (!metrics) return;
    const x = metrics.absoluteLeft + 10;
    const y = metrics.absoluteTop + metrics.viewHeight - HEIGHT - 20;
    container.setAttribute("transform", `translate(${x},${y})`);
  }

  // ================= ANÁLISIS

  function ownText(block) {
    const texts = block.warning && block.warning.text_;
    return texts ? texts[WARNING_ID] : undefined;
  }

  function hasNativeWarning(block) {
    const texts = block.warning && block.warning.text_;
    if (!texts) return false;
    return Object.keys(texts).some((id) => id !== WARNING_ID && texts[id]);
  }

  function inputLabel(input) {
    const text = input.fieldRow
      .map((f) => (typeof f.getText === "function" ? f.getText() : ""))
      .join(" ")
      .trim();
    return text ? `"${text}"` : "";
  }

  // Pilas de instrucciones sueltas: la de más arriba es el programa
  // principal; cualquier otra pila que empiece con un bloque enganchable
  // (con muesca arriba) quedó sin unir. Las que empiezan con un bloque sin
  // muesca (funciones, callbacks, "al iniciar") van sueltas a propósito.
  function looseStackTops() {
    const stacks = workspace
      .getTopBlocks(true)
      .filter((b) => isRealBlock(b) && isActive(b) && b.previousConnection);
    return new Set(stacks.slice(1));
  }

  function problemOf(block, looseTops) {
    if (looseTops.has(block)) {
      return "Este bloque está suelto: no está unido al programa principal " +
        "(el grupo de bloques de más arriba). Engánchalo debajo o dentro de otro bloque.";
    }
    if (block.outputConnection && !block.getParent()) {
      return "Este bloque está suelto: no está encajado en ningún otro bloque, " +
        "así que no hace nada. Arrástralo al hueco donde se debe usar.";
    }
    if (OPTIONAL_INPUTS[block.type]) return null;
    const empty = block.inputList.filter(
      (input) =>
        input.type === VALUE_INPUT &&
        input.connection &&
        !input.connection.targetBlock() &&
        (typeof input.isVisible !== "function" || input.isVisible()),
    );
    if (!empty.length) return null;
    const names = empty.map(inputLabel).filter(Boolean);
    return empty.length === 1
      ? `Falta un bloque en el hueco ${names[0] || "vacío"} de este bloque.`
      : `A este bloque le faltan bloques en ${empty.length} huecos` +
          (names.length ? `: ${names.join(", ")}.` : ".");
  }

  function isRealBlock(block) {
    return !block.isShadow() && !(block.isInsertionMarker && block.isInsertionMarker());
  }

  // Un bloque desactivado a mano no genera código, así que sus huecos vacíos
  // no importan.
  function isActive(block) {
    return block.isEnabled() && !(block.getInheritedDisabled && block.getInheritedDisabled());
  }

  function setOwnText(block, text) {
    if (ownText(block) === (text || undefined)) return;
    block.setWarningText(text, WARNING_ID);
  }

  function refresh() {
    const nextWarnings = [];
    const nextErrors = [];
    const nextMarked = new Set();
    const looseTops = looseStackTops();

    // Orden de lectura (arriba→abajo) para que las flechas recorran los
    // bloques en el mismo orden en que el alumno los ve.
    workspace.getAllBlocks(true).forEach((block) => {
      if (!isRealBlock(block)) return;
      // Va antes del filtro de activos: bloques como "romper bucle" se
      // desactivan solos cuando se ponen su propio aviso.
      if (hasNativeWarning(block)) nextErrors.push(block);
      if (!isActive(block)) return;
      const problem = problemOf(block, looseTops);
      if (problem) {
        nextWarnings.push(block);
        if (showWarnings) {
          setOwnText(block, problem);
          nextMarked.add(block);
        }
      }
    });

    marked.forEach((block) => {
      if (!nextMarked.has(block) && !block.isDisposed()) setOwnText(block, null);
    });
    marked = nextMarked;

    warningBlocks = nextWarnings;
    errorBlocks = nextErrors;
    warningCounter.count.textContent = String(warningBlocks.length);
    errorCounter.count.textContent = String(errorBlocks.length);
    [
      [warningCounter, warningBlocks],
      [errorCounter, errorBlocks],
    ].forEach(([c, list]) => {
      const fill = list.length ? "#bbb" : "#eee";
      c.upArrow.setAttribute("fill", fill);
      c.downArrow.setAttribute("fill", fill);
    });
    toggleText.textContent = showWarnings ? "Ocultar avisos" : "Mostrar avisos";
    toggleRect.setAttribute("fill", showWarnings ? "#fff3c4" : "#f2f2f2");
  }

  function navigate(kind, step) {
    const list = kind === "warning" ? warningBlocks : errorBlocks;
    if (!list.length) return;
    navIndex[kind] = (navIndex[kind] + step + list.length) % list.length;
    const block = list[navIndex[kind]];
    if (!block || block.isDisposed()) return;
    workspace.centerOnBlock(block.id);
    block.select();
  }

  // ================= EVENTOS

  let refreshTimer = null;
  workspace.addChangeListener((e) => {
    if (e.type === Blockly.Events.VIEWPORT_CHANGE) {
      position();
      return;
    }
    if (e.isUiEvent || e.type === Blockly.Events.UI) return;
    // Una restauración o un archivo grande dispara cientos de eventos:
    // se agrupan y se recalcula una sola vez al final.
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(refresh, 200);
  });
  window.addEventListener("resize", position);

  position();
  refresh();

  return container;
}
