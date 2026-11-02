// Ventana "Herramientas": abre static/tools/ (editores de matrices, etc.)
// en un iframe encima de la app. Las herramientas son páginas propias que
// también funcionan solas; dentro de la app, su botón "Insertar en mis
// bloques" manda el XML del bloque por postMessage y acá se agrega al
// workspace, a la vista del alumno.
//
// ToolsPanel.edit(block) abre la herramienta con el dibujo de un bloque de
// imagen ya cargado (window.toolsEditPayload, que la herramienta lee de
// window.parent); al guardar, se actualiza ese mismo bloque en vez de
// insertar uno nuevo.
(function () {
  const overlay = document.getElementById("toolsOverlay");
  const frame = document.getElementById("toolsFrame");
  const btn = document.getElementById("btnTools");
  if (!overlay || !frame || !btn) return;

  // Herramienta que edita cada tipo de bloque de imagen.
  const EDIT_PAGES = {
    neopixel_image: "neopixel.html",
    oled_image: "oled.html",
    matrix8_image: "matriz8x8.html",
    tft_image: "tft.html",
    tm1637_segments: "tm1637.html",
    buzzer_melody: "melodias.html",
  };

  function open(page) {
    frame.src = "static/tools/" + (page || "index.html");
    overlay.hidden = false;
  }

  function edit(block) {
    const page = EDIT_PAGES[block.type];
    if (!page) return;
    window.toolsEditPayload = {
      blockId: block.id,
      name: block.getFieldValue("NAME"),
      w: block.imgW_,
      h: block.imgH_,
      data: block.imgData_,
      scale: block.getField("SCALE") ? block.getFieldValue("SCALE") : undefined,
    };
    // Bloques que guardan otra cosa que una imagen (p.ej. la melodía).
    if (block.getToolPayload_) Object.assign(window.toolsEditPayload, block.getToolPayload_());
    open(page);
  }

  function close() {
    window.toolsEditPayload = null;
    overlay.hidden = true;
    frame.src = "about:blank";
  }

  btn.addEventListener("click", () => {
    window.toolsEditPayload = null;
    open();
  });
  document.getElementById("toolsClose").addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) close();
  });

  function insertBlocks(xmlText) {
    const ws = Code.workspace;
    const dom = Blockly.Xml.textToDom(xmlText);
    // Arriba a la izquierda de lo que el alumno está viendo.
    const m = ws.getMetrics();
    const x = (m.viewLeft + 40) / ws.scale;
    const y = (m.viewTop + 40) / ws.scale;
    Array.from(dom.children).forEach((node) => {
      node.setAttribute("x", Math.round(x));
      node.setAttribute("y", Math.round(y));
    });
    Blockly.Events.setGroup(true);
    let ids;
    try {
      ids = Blockly.Xml.domToWorkspace(dom, ws);
    } finally {
      Blockly.Events.setGroup(false);
    }
    const block = ids && ids.length ? ws.getBlockById(ids[0]) : null;
    if (block) block.select();
  }

  // Pasa al bloque existente los campos y la mutación del bloque que mandó
  // la herramienta, como un solo paso de deshacer.
  function updateBlock(block, xmlText) {
    const node = Blockly.Xml.textToDom(xmlText).querySelector("block");
    if (!node) return;
    Blockly.Events.setGroup(true);
    try {
      Array.from(node.children).forEach((child) => {
        if (child.tagName === "field") {
          const name = child.getAttribute("name");
          if (block.getField(name)) block.setFieldValue(child.textContent, name);
        } else if (child.tagName === "mutation" && block.domToMutation) {
          const before = Blockly.Xml.domToText(block.mutationToDom());
          block.domToMutation(child);
          const after = Blockly.Xml.domToText(block.mutationToDom());
          Blockly.Events.fire(new Blockly.Events.BlockChange(block, "mutation", null, before, after));
        }
      });
    } finally {
      Blockly.Events.setGroup(false);
    }
    block.select();
  }

  window.addEventListener("message", (e) => {
    if (e.origin !== location.origin || e.source !== frame.contentWindow) return;
    const data = e.data || {};
    if (data.type !== "3dpit-insert-blocks" || typeof data.xml !== "string") return;
    try {
      showView("viewBlocks");
    } catch (_) {}
    try {
      const target = data.replaceId ? Code.workspace.getBlockById(data.replaceId) : null;
      if (target) updateBlock(target, data.xml);
      else insertBlocks(data.xml);
      close();
    } catch (err) {
      console.error("No se pudo insertar el bloque de la herramienta:", err);
    }
  });

  window.ToolsPanel = { open, edit };
})();
