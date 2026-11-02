/* ══════════════════════════════════════════════════════════════
   retos.js — Retos con verificación (los retos están en retos-data.js).

   Retos.start(id) muestra una tarjeta sobre el área de bloques con el
   reto y lo que hay que lograr. "Comprobar" revisa la estructura de los
   bloques del alumno y marca ✅/❌ con una pista en cada ❌; después de la
   primera comprobación se vuelve a revisar sola con cada cambio.
   Los retos superados se guardan en localStorage (los ve la lista de
   retos en static/tools/retos.html).
   Agregar este <script> DESPUÉS de main.js y retos-data.js.
══════════════════════════════════════════════════════════════ */
const Retos = (() => {
  const DONE_KEY = "3dpit-retos-ok";
  let current = null;
  let live = false;
  let card = null;
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

  // Sube por los bloques padre y devuelve, para cada "si" o ciclo que lo
  // contiene, si el bloque está en su condición ("cond") o en su cuerpo
  // ("body"). Un bloque enganchado DEBAJO de otro (no dentro) no cuenta.
  function containers(block) {
    const out = [];
    let child = block;
    let parent = block.getParent();
    while (parent) {
      const input = parent.getInputWithBlock(child);
      if (input) {
        // Entrada de valor = condición (IF0, BOOL...); de instrucciones = cuerpo (DO, ELSE).
        out.push({ block: parent, where: input.type === Blockly.inputTypes.VALUE ? "cond" : "body" });
      }
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
      return blocks.some((b) => {
        if (b.type !== "controls_repeat_ext") return false;
        const n = b.getInputTargetBlock("TIMES");
        return !!n && n.type === "math_number" && Number(n.getFieldValue("NUM")) === check.repeat;
      });
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
    if (check.distinct) {
      const { type, name } = check.distinct;
      const values = new Set(blocks.filter((b) => b.type === type).map((b) => b.getFieldValue(name)));
      return values.size >= (check.min || 1);
    }
    return false;
  }

  // ── Tarjeta ──
  function buildCard() {
    card = document.createElement("div");
    card.className = "reto-card";
    card.hidden = true;
    card.innerHTML =
      '<div class="reto-head"><span class="reto-title"></span><button class="reto-close" title="Cerrar reto">✕</button></div>' +
      '<p class="reto-desc"></p><ul class="reto-checks"></ul><div class="reto-win" hidden>🎉 ¡Reto superado!</div>' +
      '<div class="reto-buttons"><button class="reto-check">✔ Comprobar</button><button class="reto-list">🏆 Otros retos</button></div>';
    (document.getElementById("viewBlocks") || document.body).appendChild(card);
    card.querySelector(".reto-close").onclick = stop;
    hacerArrastrable(card, card.querySelector(".reto-head"));
    card.querySelector(".reto-check").onclick = () => comprobar(true);
    card.querySelector(".reto-list").onclick = () => window.ToolsPanel && window.ToolsPanel.open("retos.html");
    Code.workspace.addChangeListener((e) => {
      if (!current || !live || e.isUiEvent || e.type === Blockly.Events.UI) return;
      clearTimeout(timer);
      timer = setTimeout(() => comprobar(false), 300);
    });
  }

  // Se mueve tomándola de la barra del título (mouse o dedo), como el
  // monitor serial y el panel de tutoriales; no se puede sacar de la pantalla.
  function hacerArrastrable(panel, handle) {
    let sx, sy, ox, oy, dragging = false;
    handle.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".reto-close")) return;
      const r = panel.getBoundingClientRect();
      sx = e.clientX; sy = e.clientY; ox = r.left; oy = r.top;
      panel.style.left = ox + "px";
      panel.style.top = oy + "px";
      panel.style.right = panel.style.bottom = "auto";
      dragging = true;
      handle.setPointerCapture(e.pointerId);
      handle.classList.add("dragging");
      e.preventDefault();
    });
    handle.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const maxX = window.innerWidth - panel.offsetWidth;
      const maxY = window.innerHeight - 40;
      panel.style.left = Math.min(maxX, Math.max(0, ox + e.clientX - sx)) + "px";
      panel.style.top = Math.min(maxY, Math.max(48, oy + e.clientY - sy)) + "px";
    });
    const end = () => { dragging = false; handle.classList.remove("dragging"); };
    handle.addEventListener("pointerup", end);
    handle.addEventListener("pointercancel", end);
  }

  function render(results) {
    card.querySelector(".reto-title").textContent = `${current.icon} ${current.title}`;
    card.querySelector(".reto-desc").textContent = current.desc;
    const list = card.querySelector(".reto-checks");
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
    const win = !!results && results.every(Boolean);
    card.querySelector(".reto-win").hidden = !win;
    card.classList.toggle("won", win);
  }

  function comprobar(explicit) {
    if (!current) return;
    // Después de la primera comprobación, se vuelve a revisar sola con cada cambio.
    if (explicit) live = true;
    const blocks = activeBlocks();
    const results = current.checks.map((c) => evaluar(c, blocks));
    render(results);
    if (results.every(Boolean)) markDone(current.id);
    else if (explicit) card.classList.add("shake"), setTimeout(() => card.classList.remove("shake"), 400);
  }

  function start(id) {
    const reto = RETOS.find((r) => r.id === id);
    if (!reto) return;
    if (!card) buildCard();
    current = reto;
    live = false;
    render(null);
    card.hidden = false;
    try {
      showView("viewBlocks");
    } catch (_) {}
  }

  function stop() {
    current = null;
    live = false;
    if (card) card.hidden = true;
  }

  return { start, stop, comprobar, evaluar, done };
})();
window.Retos = Retos;
