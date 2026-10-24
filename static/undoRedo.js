function addUndoRedoButtons(workspace) {
  const NS = "http://www.w3.org/2000/svg";
  const svg = workspace.getParentSvg();

  let container = svg.querySelector("g.blocklyUndoRedo");

  if (!container) {
    container = document.createElementNS(NS, "g");
    container.setAttribute("class", "blocklyUndoRedo");
    container.style.cursor = "pointer";
    container.setAttribute("pointer-events", "all");
    svg.appendChild(container);
  }

  container.classList.add("floating-tools");

  function createButton(iconPath, offsetY, onClick, titleText) {
    const g = document.createElementNS(NS, "g");

    if (titleText) {
      const title = document.createElementNS(NS, "title");
      title.textContent = titleText;
      g.appendChild(title);
    }

    const rect = document.createElementNS(NS, "rect");
    rect.setAttribute("x", 10);
    rect.setAttribute("y", offsetY);
    rect.setAttribute("rx", 6);
    rect.setAttribute("ry", 6);
    rect.setAttribute("width", 50);
    rect.setAttribute("height", 50);
    rect.setAttribute("fill", "#ffffff");
    rect.setAttribute("stroke", "#888");

    g.appendChild(rect);

    let img = null;
    if (typeof iconPath === "function") {
      // Ícono dibujado con formas SVG en vez de un PNG (evita tener que
      // agregar un nuevo archivo de imagen para cada botón nuevo).
      iconPath(g, offsetY);
    } else {
      img = document.createElementNS(NS, "image");
      img.setAttribute("x", 16);
      img.setAttribute("y", offsetY + 6);
      img.setAttribute("width", 40);
      img.setAttribute("height", 40);

      try {
        img.setAttribute("href", iconPath);
      } catch (e) {
        img.setAttributeNS("http://www.w3.org/1999/xlink", "href", iconPath);
      }

      img.style.pointerEvents = "none";
      g.appendChild(img);
    }

    g.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    });

    container.appendChild(g);

    return { group: g, rect, img };
  }

  // Ícono de "organizar": tres barras horizontales alineadas a la izquierda,
  // como las filas en las que va a quedar cada pila de bloques.
  function drawArrangeIcon(g, offsetY) {
    const widths = [28, 20, 24];
    widths.forEach((w, i) => {
      const bar = document.createElementNS(NS, "rect");
      bar.setAttribute("x", 17);
      bar.setAttribute("y", offsetY + 13 + i * 9);
      bar.setAttribute("width", w);
      bar.setAttribute("height", 5);
      bar.setAttribute("rx", 2);
      bar.setAttribute("fill", "#555");
      bar.style.pointerEvents = "none";
      g.appendChild(bar);
    });
  }

  // BOTONES
  const undoBtn = createButton(
    "./static/img/undo.png",
    60,
    () => workspace.undo(false),
    "Deshacer",
  );

  const redoBtn = createButton(
    "./static/img/redo.png",
    120,
    () => workspace.undo(true),
    "Rehacer",
  );

  // Organizar bloques: acomoda todas las pilas de bloques sueltas en una
  // columna ordenada, sin que se tapen entre sí -- útil cuando un bloque
  // quedó escondido debajo de otro más grande y cuesta encontrarlo.
  const arrangeBtn = createButton(
    drawArrangeIcon,
    180,
    () => workspace.cleanUp(),
    "Organizar bloques",
  );

  // ================= POSICIÓN (MISMA LÓGICA QUE SCREENSHOT)

  function position() {
    const metrics = workspace.getMetrics();
    if (!metrics) return;

    const x = metrics.absoluteLeft + metrics.viewWidth - 80;
    const y = metrics.absoluteTop + 10;

    container.setAttribute("transform", `translate(${x},${y})`);
  }

  position();

  // 👇 exactamente igual que screenshot
  window.addEventListener("resize", position);

  // 👇 si Blockly cambia layout
  // Solo recalcular posición cuando el viewport cambia (scroll, zoom, resize de Blockly)
  // — no en cada drag/connect de bloque, que es el comportamiento por defecto de addChangeListener.
  workspace.addChangeListener((e) => {
    if (e.type === Blockly.Events.VIEWPORT_CHANGE) position();
  });

  // ================= ESTADO BOTONES

  function getUndoCountSafe() {
    if (typeof workspace.getUndoStack === "function") {
      return workspace.getUndoStack().length;
    }
    return Array.isArray(workspace.undoStack_)
      ? workspace.undoStack_.length
      : 0;
  }

  function getRedoCountSafe() {
    if (typeof workspace.getRedoStack === "function") {
      return workspace.getRedoStack().length;
    }
    return Array.isArray(workspace.redoStack_)
      ? workspace.redoStack_.length
      : 0;
  }

  function updateState() {
    const undoCount = getUndoCountSafe();
    const redoCount = getRedoCountSafe();

    undoBtn.rect.setAttribute("opacity", undoCount > 0 ? "1" : "0.3");
    redoBtn.rect.setAttribute("opacity", redoCount > 0 ? "1" : "0.3");
  }

  workspace.addChangeListener(updateState);
  updateState();

  return {
    container,
    undoBtn: undoBtn.group,
    redoBtn: redoBtn.group,
    arrangeBtn: arrangeBtn.group,
  };
}