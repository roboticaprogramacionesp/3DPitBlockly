// Ventana "Herramientas": abre static/tools/ (editores de matrices, etc.)
// en un iframe encima de la app. Las herramientas son páginas propias que
// también funcionan solas; dentro de la app, su botón "Insertar en mis
// bloques" manda el XML del bloque por postMessage y acá se agrega al
// workspace, a la vista del alumno.
(function () {
  const overlay = document.getElementById("toolsOverlay");
  const frame = document.getElementById("toolsFrame");
  const btn = document.getElementById("btnTools");
  if (!overlay || !frame || !btn) return;

  function open() {
    // Siempre se arranca desde el índice de herramientas.
    frame.src = "static/tools/index.html";
    overlay.hidden = false;
  }

  function close() {
    overlay.hidden = true;
    frame.src = "about:blank";
  }

  btn.addEventListener("click", open);
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

  window.addEventListener("message", (e) => {
    if (e.origin !== location.origin || e.source !== frame.contentWindow) return;
    const data = e.data || {};
    if (data.type !== "3dpit-insert-blocks" || typeof data.xml !== "string") return;
    try {
      showView("viewBlocks");
    } catch (_) {}
    try {
      insertBlocks(data.xml);
      close();
    } catch (err) {
      console.error("No se pudo insertar el bloque de la herramienta:", err);
    }
  });
})();
