/* ══════════════════════════════════════════════════════════════
   retos.js — Retos con verificación (los retos están en retos-data.js).

   Retos.start(id) muestra una ventana flotante con el reto y lo que hay
   que lograr, con el mismo estilo y arrastre que el tutorial guiado
   (clases .ts-* de tutorial-steps.css y _tsMakeDraggable). "Comprobar"
   revisa la estructura de los bloques del alumno y marca ✅/❌ con una
   pista en cada ❌; después de la primera comprobación se vuelve a revisar
   sola con cada cambio. Al superarlo ofrece el siguiente reto.
   Los retos superados se guardan en localStorage (los ve la lista de
   retos en static/tools/retos.html).
   Agregar este <script> DESPUÉS de tutorial-steps.js, main.js y retos-data.js.
══════════════════════════════════════════════════════════════ */
const Retos = (() => {
  const DONE_KEY = "3dpit-retos-ok";
  const NIVEL = { 1: "Nivel 1", 2: "Nivel 2", 3: "Nivel 3" };
  let current = null;
  let live = false;
  let panel = null;
  let timer = null;

  function done() {
    try {
      return JSON.parse(localStorage.getItem(DONE_KEY) || "[]");
    } catch (_) {
      return [];
    }
  }
  function markDone(id) {
    const list = done();
    if (!list.includes(id)) list.push(id);
    try {
      localStorage.setItem(DONE_KEY, JSON.stringify(list));
    } catch (_) {}
  }

  // ── Revisión de los bloques ──
  function activeBlocks() {
    return Code.workspace.getAllBlocks(false).filter(
      (b) => !b.isShadow() && !(b.isInsertionMarker && b.isInsertionMarker()) &&
        b.isEnabled() && !(b.getInheritedDisabled && b.getInheritedDisabled()),
    );
  }

  // Sube por los bloques padre y devuelve, para cada bloque que lo
  // contiene, si está en una entrada de valor ("cond": la condición de un
  // "si", el ángulo de un servo...) o de instrucciones ("body": DO, ELSE).
  // Un bloque enganchado DEBAJO de otro (no dentro) no cuenta.
  function containers(block) {
    const out = [];
    let child = block;
    let parent = block.getParent();
    while (parent) {
      const input = parent.getInputWithBlock(child);
      if (input) out.push({ block: parent, where: input.type === Blockly.inputTypes.VALUE ? "cond" : "body" });
      child = parent;
      parent = parent.getParent();
    }
    return out;
  }

  function isForever(b) {
    if (b.type !== "controls_whileUntil" || b.getFieldValue("MODE") !== "WHILE") return false;
    const cond = b.getInputTargetBlock("BOOL");
    return !!cond && cond.type === "logic_boolean" && cond.getFieldValue("BOOL") === "TRUE";
  }

  // Número escrito en una entrada (bloque o sombra de número), o null.
  function numberIn(b, input) {
    const t = b.getInputTargetBlock(input);
    return t && t.type === "math_number" ? Number(t.getFieldValue("NUM")) : null;
  }

  function count(blocks, types) {
    return blocks.filter((b) => types.includes(b.type));
  }

  function evaluar(check, blocks) {
    if (check.anyOf) return check.anyOf.some((c) => evaluar(c, blocks));
    if (check.allOf) return check.allOf.every((c) => evaluar(c, blocks));
    // Un estado concreto (p.ej. LED en "on") dentro de un ciclo o de un "si".
    if (check.inLoopField || check.inIfField) {
      const { type, name, value } = check.inLoopField || check.inIfField;
      const inside = check.inLoopField
        ? (c) => c.where === "body" && RETO_LOOPS.includes(c.block.type)
        : (c) => c.where === "body" && c.block.type === "controls_if";
      return blocks.filter((b) => b.type === type && b.getFieldValue(name) === value && containers(b).some(inside))
        .length >= (check.min || 1);
    }
    if (check.has) return count(blocks, check.has).length >= (check.min || 1);
    if (check.field) {
      const { type, name, value } = check.field;
      return blocks.some((b) => b.type === type && b.getFieldValue(name) === value);
    }
    if (check.forever) return blocks.some(isForever);
    if (check.repeat) {
      return blocks.filter((b) => b.type === "controls_repeat_ext" && numberIn(b, "TIMES") === check.repeat).length >= (check.min || 1);
    }
    if (check.inLoop) {
      return count(blocks, check.inLoop).filter((b) =>
        containers(b).some((c) => c.where === "body" && RETO_LOOPS.includes(c.block.type))).length >= (check.min || 1);
    }
    if (check.inIf || check.inCond) {
      const types = check.inIf || check.inCond;
      const where = check.inIf ? "body" : "cond";
      return count(blocks, types).filter((b) =>
        containers(b).some((c) => c.where === where && c.block.type === "controls_if")).length >= (check.min || 1);
    }
    // Bloques de esos tipos dentro (en cualquier entrada) de alguno de `of`.
    if (check.inside) {
      return count(blocks, check.inside).filter((b) => containers(b).some((c) => check.of.includes(c.block.type)))
        .length >= (check.min || 1);
    }
    if (check.distinct) {
      const { type, name } = check.distinct;
      const values = new Set(blocks.filter((b) => b.type === type).map((b) => b.getFieldValue(name)));
      return values.size >= (check.min || 1);
    }
    // Números distintos en una entrada (p.ej. esperas de distinta duración).
    if (check.distinctNum) {
      const { type, input } = check.distinctNum;
      const values = new Set(blocks.filter((b) => b.type === type).map((b) => numberIn(b, input)).filter((v) => v !== null));
      return values.size >= (check.min || 1);
    }
    return false;
  }

  // ── Ventana (mismo estilo que el tutorial guiado) ──
  function crear() {
    panel = document.createElement("div");
    panel.id = "reto-panel";
    panel.style.display = "none";
    panel.innerHTML =
      '<div class="ts-header">' +
      '  <span class="ts-icon">🏆</span>' +
      '  <div class="ts-title-group">' +
      '    <p class="ts-label">Reto &nbsp;·&nbsp; <span class="ts-drag-hint">✥ arrastrar</span></p>' +
      '    <h2 class="ts-title" id="reto-title"></h2>' +
      "  </div>" +
      '  <button class="ts-minimize" id="reto-min" title="Minimizar">−</button>' +
      '  <button class="ts-close" id="reto-close" title="Cerrar">✕</button>' +
      "</div>" +
      '<div id="reto-collapsible">' +
      // Tamaño de texto, igual que en el tutorial guiado (S, M, L, XL).
      '  <div class="ts-size-bar">' +
      '    <span class="ts-size-label">🔠</span>' +
      '    <button class="ts-size-btn" id="reto-size-down" title="Reducir texto">−</button>' +
      '    <span class="ts-size-display" id="reto-size-display">M</span>' +
      '    <div class="ts-size-track" id="reto-size-track"><div class="ts-size-fill" id="reto-size-fill"></div></div>' +
      '    <button class="ts-size-btn" id="reto-size-up" title="Aumentar texto">+</button>' +
      '  </div>' +
      '  <div class="ts-progress-bar"><div class="ts-progress-fill" id="reto-fill"></div></div>' +
      '  <p class="ts-progress-txt" id="reto-progress"></p>' +
      '  <div class="ts-body reto-body">' +
      '    <p class="ts-step-desc" id="reto-desc"></p>' +
      '    <ul class="reto-checks" id="reto-checks"></ul>' +
      '    <div class="reto-win" id="reto-win" hidden>🎉 ¡Reto superado!</div>' +
      "  </div>" +
      '  <div class="ts-footer" id="reto-footer"></div>' +
      "</div>";
    document.body.appendChild(panel);
    panel.querySelector("#reto-close").onclick = stop;
    panel.querySelector("#reto-min").onclick = () => {
      const min = panel.getAttribute("data-minimized") === "1";
      if (min) panel.removeAttribute("data-minimized");
      else panel.setAttribute("data-minimized", "1");
      panel.querySelector("#reto-collapsible").style.display = min ? "" : "none";
      // Igual que el tutorial guiado: □ para restaurar, − para minimizar.
      panel.querySelector("#reto-min").textContent = min ? "−" : "□";
    };
    prepararTamano();
    if (typeof _tsMakeDraggable === "function") _tsMakeDraggable(panel);
    Code.workspace.addChangeListener((e) => {
      if (!current || !live || e.isUiEvent || e.type === Blockly.Events.UI) return;
      clearTimeout(timer);
      timer = setTimeout(() => comprobar(false), 300);
    });
  }

  // ── Tamaño de texto (se recuerda en este navegador) ──
  const TAMANOS = ["S", "M", "L", "XL"];
  const CLAVE_TAMANO = "reto-font-size";
  function prepararTamano() {
    let idx = 1;
    try {
      const guardado = parseInt(localStorage.getItem(CLAVE_TAMANO), 10);
      if (guardado >= 0 && guardado < TAMANOS.length) idx = guardado;
    } catch (_) {}
    const aplicar = () => {
      panel.setAttribute("data-fs", TAMANOS[idx]);
      panel.querySelector("#reto-size-display").textContent = TAMANOS[idx];
      panel.querySelector("#reto-size-fill").style.width = (idx / (TAMANOS.length - 1)) * 100 + "%";
      try {
        localStorage.setItem(CLAVE_TAMANO, idx);
      } catch (_) {}
    };
    panel.querySelector("#reto-size-up").onclick = () => { if (idx < TAMANOS.length - 1) { idx++; aplicar(); } };
    panel.querySelector("#reto-size-down").onclick = () => { if (idx > 0) { idx--; aplicar(); } };
    panel.querySelector("#reto-size-track").onclick = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      idx = Math.max(0, Math.min(TAMANOS.length - 1, Math.round(((e.clientX - r.left) / r.width) * (TAMANOS.length - 1))));
      aplicar();
    };
    aplicar();
  }

  function boton(texto, clase, onclick) {
    const b = document.createElement("button");
    b.className = "ts-btn " + clase;
    b.textContent = texto;
    b.onclick = onclick;
    return b;
  }

  // El siguiente reto: el que sigue en la lista y todavía no está superado.
  function siguiente() {
    const i = RETOS.indexOf(current);
    const ok = done();
    return RETOS.slice(i + 1).concat(RETOS.slice(0, i)).find((r) => !ok.includes(r.id)) || null;
  }

  function render(results) {
    panel.querySelector("#reto-title").textContent = `${current.icon} ${current.title}`;
    panel.querySelector("#reto-desc").textContent = current.desc;
    const list = panel.querySelector("#reto-checks");
    list.innerHTML = "";
    current.checks.forEach((c, i) => {
      const li = document.createElement("li");
      const state = results ? (results[i] ? "ok" : "no") : "pending";
      li.className = state;
      li.innerHTML = `<span class="mark">${{ ok: "✅", no: "❌", pending: "⬜" }[state]}</span><span></span>`;
      li.lastChild.textContent = c.text;
      if (state === "no") {
        const hint = document.createElement("small");
        hint.textContent = "💡 " + c.hint;
        li.lastChild.appendChild(hint);
      }
      list.appendChild(li);
    });
    const logrados = results ? results.filter(Boolean).length : 0;
    const total = current.checks.length;
    panel.querySelector("#reto-fill").style.width = `${(logrados / total) * 100}%`;
    panel.querySelector("#reto-progress").textContent =
      `${NIVEL[current.level] || ""} · ${results ? `${logrados} de ${total} logrados` : "arma tu programa y comprueba"}`;
    const win = !!results && results.every(Boolean);
    panel.querySelector("#reto-win").hidden = !win;
    panel.classList.toggle("won", win);

    const footer = panel.querySelector("#reto-footer");
    footer.innerHTML = "";
    footer.appendChild(boton("🏆 Retos", "ts-btn-sec", () => window.ToolsPanel && window.ToolsPanel.open("retos.html")));
    const next = win ? siguiente() : null;
    if (next) footer.appendChild(boton(`Siguiente: ${next.icon} ${next.title} →`, "ts-btn-primary", () => start(next.id)));
    else footer.appendChild(boton("✔ Comprobar", "ts-btn-primary", () => comprobar(true)));
  }

  function comprobar(explicit) {
    if (!current) return;
    // Después de la primera comprobación, se vuelve a revisar sola con cada cambio.
    if (explicit) live = true;
    const blocks = activeBlocks();
    const results = current.checks.map((c) => evaluar(c, blocks));
    if (results.every(Boolean)) markDone(current.id);
    render(results);
    if (explicit && !results.every(Boolean)) {
      panel.classList.add("shake");
      setTimeout(() => panel.classList.remove("shake"), 400);
    }
  }

  function start(id) {
    const reto = RETOS.find((r) => r.id === id);
    if (!reto) return;
    // El recorrido de bienvenida taparía la ventana (ver coco.js).
    if (window.EchaleCoco) window.EchaleCoco.cerrarBienvenida();
    if (!panel) crear();
    current = reto;
    live = false;
    render(null);
    panel.style.display = "flex";
    panel.removeAttribute("data-minimized");
    panel.querySelector("#reto-collapsible").style.display = "";
    panel.querySelector("#reto-min").textContent = "−";
    try {
      showView("viewBlocks");
    } catch (_) {}
  }

  function stop() {
    current = null;
    live = false;
    if (panel) panel.style.display = "none";
  }

  return { start, stop, comprobar, evaluar, done };
})();
window.Retos = Retos;
