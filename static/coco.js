/* ══════════════════════════════════════════════════════════════
   coco.js — "¡Échale coco!": preguntas para reforzar lo aprendido, en
   una ventana flotante con el mismo estilo y arrastre que el tutorial
   guiado (clases .ts-* de tutorial-steps.css y _tsMakeDraggable).

   - Lista de cuestionarios de la app (coco-data.js) con el mejor puntaje.
   - Cuestionarios de docentes: por enlace (#quiz=...) o archivo
     .quiz.json; piden el nombre y al final dan un código de resultado.
   - El editor para docentes y "Ver un resultado" están en
     🛠 Herramientas (static/tools/quiz.html).
   Agregar DESPUÉS de tutorial-steps.js, tools-panel.js, coco-core.js y
   coco-data.js.
══════════════════════════════════════════════════════════════ */
const EchaleCoco = (() => {
  const C = CocoCore;
  const MEJOR = "3dpit-coco-mejor";
  let panel = null;
  let body, footer, fill, progressTxt, title;

  function el(tag, attrs, ...children) {
    const n = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === "class") n.className = v;
      else if (k.startsWith("on")) n[k] = v;
      else if (k === "text") n.textContent = v;
      else n.setAttribute(k, v);
    });
    children.flat().forEach((c) => c != null && n.append(c));
    return n;
  }

  function mejores() {
    try {
      return JSON.parse(localStorage.getItem(MEJOR) || "{}");
    } catch (_) {
      return {};
    }
  }
  function guardarMejor(id, puntos) {
    const m = mejores();
    if (!(id in m) || puntos > m[id]) m[id] = puntos;
    try {
      localStorage.setItem(MEJOR, JSON.stringify(m));
    } catch (_) {}
  }

  // ── Ventana ──
  function crear() {
    panel = document.createElement("div");
    panel.id = "coco-panel";
    panel.style.display = "none";
    panel.innerHTML =
      '<div class="ts-header">' +
      '  <span class="ts-icon">🥥</span>' +
      '  <div class="ts-title-group">' +
      '    <p class="ts-label">¡Échale coco! &nbsp;·&nbsp; <span class="ts-drag-hint">✥ arrastrar</span></p>' +
      '    <h2 class="ts-title" id="coco-title"></h2>' +
      "  </div>" +
      '  <button class="ts-minimize" id="coco-min" title="Minimizar">−</button>' +
      '  <button class="ts-close" id="coco-close" title="Cerrar">✕</button>' +
      "</div>" +
      '<div id="coco-collapsible">' +
      '  <div class="ts-progress-bar"><div class="ts-progress-fill" id="coco-fill"></div></div>' +
      '  <p class="ts-progress-txt" id="coco-progress"></p>' +
      '  <div class="ts-body coco-body" id="coco-body"></div>' +
      '  <div class="ts-footer" id="coco-footer"></div>' +
      "</div>";
    document.body.appendChild(panel);
    body = panel.querySelector("#coco-body");
    footer = panel.querySelector("#coco-footer");
    fill = panel.querySelector("#coco-fill");
    progressTxt = panel.querySelector("#coco-progress");
    title = panel.querySelector("#coco-title");
    panel.querySelector("#coco-close").onclick = cerrar;
    panel.querySelector("#coco-min").onclick = () => {
      const min = panel.getAttribute("data-minimized") === "1";
      if (min) panel.removeAttribute("data-minimized");
      else panel.setAttribute("data-minimized", "1");
      panel.querySelector("#coco-collapsible").style.display = min ? "" : "none";
      panel.querySelector("#coco-min").textContent = min ? "−" : "+";
    };
    if (typeof _tsMakeDraggable === "function") _tsMakeDraggable(panel);
  }

  function mostrar() {
    if (!panel) crear();
    panel.style.display = "flex";
    panel.removeAttribute("data-minimized");
    panel.querySelector("#coco-collapsible").style.display = "";
    panel.querySelector("#coco-min").textContent = "−";
  }

  function cerrar() {
    if (panel) panel.style.display = "none";
  }

  function boton(texto, clase, onclick) {
    return el("button", { class: "ts-btn " + clase, text: texto, onclick });
  }
  function pie(...botones) {
    footer.innerHTML = "";
    botones.filter(Boolean).forEach((b) => footer.appendChild(b));
  }
  function progreso(i, total) {
    fill.style.width = total ? `${(i / total) * 100}%` : "0%";
    progressTxt.textContent = total ? `Pregunta ${Math.min(i + 1, total)} de ${total}` : "";
  }

  // ── Lista de cuestionarios ──
  function abrir() {
    mostrar();
    title.textContent = "Elige un tema";
    progreso(0, 0);
    progressTxt.textContent = "Pon a prueba lo que aprendiste";
    body.innerHTML = "";
    const m = mejores();
    const lista = el("div", { class: "coco-list" });
    COCO_QUIZZES.forEach((q) => {
      const best = q.id in m ? `⭐ ${m[q.id]}/${q.preguntas.length}` : "";
      lista.appendChild(el("button", { class: "coco-item", onclick: () => responder(C.sanitizar(q), { id: q.id }) },
        el("span", { class: "coco-item-icon", text: q.icono }),
        el("span", { class: "coco-item-title", text: q.titulo }),
        el("span", { class: "coco-item-best", text: best })));
    });
    body.append(
      el("p", { class: "ts-step-desc", text: "Responde preguntas cortas sobre lo que has programado. ¡Échale coco! 🥥" }),
      lista,
      el("p", { class: "ts-step-desc coco-teacher", text: "¿Tu docente te mandó un archivo .quiz.json? Ábrelo aquí:" }));
    pie(
      boton("📂 Abrir archivo", "ts-btn-sec", abrirArchivo),
      boton("✏️ Crear (docentes)", "ts-btn-sec", () => window.ToolsPanel && window.ToolsPanel.open("quiz.html")));
  }

  function abrirArchivo() {
    const input = el("input", { type: "file", accept: ".json,application/json" });
    input.onchange = async () => {
      const f = input.files[0];
      if (!f) return;
      try {
        if (f.size > C.LIM.bytes) throw new Error("grande");
        responder(C.sanitizar(JSON.parse(await f.text())), { docente: true });
      } catch (_) {
        aviso("Ese archivo no es un cuestionario válido de 3DPit.");
      }
    };
    input.click();
  }

  function aviso(texto) {
    mostrar();
    title.textContent = "¡Échale coco!";
    progreso(0, 0);
    body.innerHTML = "";
    body.append(el("p", { class: "coco-warn", text: "⚠️ " + texto }));
    pie(boton("Ver los temas", "ts-btn-primary", abrir));
  }

  // ── Responder ──
  // opts.id: cuestionario de la app (se guarda el mejor puntaje).
  // opts.docente: viene de un docente (pide nombre y da código de resultado).
  function responder(quiz, opts) {
    opts = opts || {};
    if (!quiz.preguntas.length) return aviso("Este cuestionario no tiene preguntas.");
    mostrar();
    title.textContent = quiz.titulo;
    const respuestas = new Array(quiz.preguntas.length).fill(null);
    let nombre = "";

    if (opts.docente) {
      progreso(0, 0);
      progressTxt.textContent = `${quiz.preguntas.length} preguntas`;
      body.innerHTML = "";
      const input = el("input", { type: "text", class: "coco-input", maxlength: C.LIM.nombre, placeholder: "Tu nombre" });
      if (quiz.descripcion) body.append(el("p", { class: "ts-step-desc" }, C.rich(quiz.descripcion)));
      body.append(el("p", { class: "ts-step-title", text: "Escribe tu nombre para empezar" }), input);
      const empezar = () => {
        nombre = input.value.trim().slice(0, C.LIM.nombre);
        if (!nombre) return input.focus();
        pregunta(0);
      };
      input.onkeydown = (e) => e.key === "Enter" && empezar();
      pie(boton("← Temas", "ts-btn-sec", abrir), boton("Empezar →", "ts-btn-primary", empezar));
      setTimeout(() => input.focus(), 50);
    } else {
      pregunta(0);
    }

    function pregunta(i) {
      if (i >= quiz.preguntas.length) return final();
      const q = quiz.preguntas[i];
      let elegida = null;
      progreso(i, quiz.preguntas.length);
      body.innerHTML = "";
      body.append(el("p", { class: "ts-step-title coco-q" }, C.rich(q.texto)));
      if (q.codigo) body.append(el("pre", { class: "coco-code", text: q.codigo }));
      const opciones = el("div", { class: "coco-opts" });
      const fb = el("div", {});
      const siguiente = boton("Comprobar", "ts-btn-primary", null);
      siguiente.disabled = true;

      if (q.tipo === "corta") {
        const input = el("input", { type: "text", class: "coco-input", maxlength: C.LIM.respuesta, placeholder: "Tu respuesta" });
        input.oninput = () => { elegida = input.value; siguiente.disabled = !elegida.trim(); };
        input.onkeydown = (e) => e.key === "Enter" && !siguiente.disabled && siguiente.click();
        opciones.appendChild(input);
        setTimeout(() => input.focus(), 50);
      } else {
        const lista = q.tipo === "vf" ? [[true, "Verdadero"], [false, "Falso"]] : q.opciones.map((o, k) => [k, o]);
        lista.forEach(([v, label]) => {
          const b = el("button", { class: "coco-opt" }, C.rich(label));
          b.onclick = () => {
            elegida = v;
            opciones.querySelectorAll(".coco-opt").forEach((o) => o.classList.toggle("chosen", o === b));
            siguiente.disabled = false;
          };
          b._valor = v;
          opciones.appendChild(b);
        });
      }

      const avanzar = () => pregunta(i + 1);
      siguiente.onclick = () => {
        respuestas[i] = elegida;
        if (!quiz.mostrarRespuestas) return avanzar();
        const ok = C.esCorrecta(q, elegida);
        opciones.querySelectorAll(".coco-opt").forEach((b) => {
          b.disabled = true;
          if (C.esCorrecta(q, b._valor)) b.classList.add("right");
          else if (b._valor === elegida) b.classList.add("wrong");
        });
        const input = opciones.querySelector("input");
        if (input) input.disabled = true;
        fb.className = "coco-feedback " + (ok ? "ok" : "no");
        // append() del navegador escribiría "null": se saltan los vacíos.
        [el("b", { text: ok ? "✅ ¡Bien hecho!" : "❌ Casi…" }),
          q.tipo === "corta" && !ok ? el("div", { text: "Respuesta esperada: " + q.correcta.split("|")[0].trim() }) : null,
          q.explicacion ? el("div", { class: "coco-expl" }, C.rich(q.explicacion)) : null].forEach((c) => c && fb.append(c));
        siguiente.textContent = i + 1 < quiz.preguntas.length ? "Siguiente →" : "Ver resultado";
        siguiente.onclick = avanzar;
        siguiente.focus();
      };
      body.append(opciones, fb);
      pie(boton("← Temas", "ts-btn-sec", abrir), siguiente);
    }

    async function final() {
      const ok = quiz.preguntas.map((q, i) => C.esCorrecta(q, respuestas[i]));
      const puntos = ok.filter(Boolean).length, total = quiz.preguntas.length;
      const pct = puntos / total;
      if (opts.id) guardarMejor(opts.id, puntos);
      progreso(total, total);
      progressTxt.textContent = "Resultado";
      const [emoji, frase] = pct === 1 ? ["🏆", "¡Perfecto! Le echaste mucho coco."]
        : pct >= 0.7 ? ["🎉", "¡Muy bien! Ya casi lo dominas."]
        : pct >= 0.4 ? ["💪", "Vas bien: repasa las que fallaste y vuelve a intentarlo."]
        : ["🥥", "¡Échale más coco! Repasa el tema y vuelve a intentarlo."];
      body.innerHTML = "";
      const repaso = el("ol", { class: "coco-review" });
      quiz.preguntas.forEach((q, i) => repaso.appendChild(el("li", { class: ok[i] ? "ok" : "no" },
        el("span", { text: ok[i] ? "✅ " : "❌ " }), C.rich(q.texto || "(código)"),
        ok[i] ? null : el("div", { class: "coco-mine", text: "Tu respuesta: " + (C.textoRespuesta(q, respuestas[i]) || "—") }))));
      body.append(el("div", { class: "ts-fin" },
        el("div", { class: "ts-fin-icon", text: emoji }),
        el("h3", { text: `${puntos} de ${total}` }),
        el("p", { text: (nombre ? nombre + ": " : "") + frase })), repaso);

      if (opts.docente) {
        const codigo = el("pre", { class: "coco-code", text: "Generando…" });
        body.append(el("p", { class: "ts-step-title", text: "Código para tu docente" }), codigo,
          el("p", { class: "ts-step-desc", text: "Cópialo y mándaselo a tu docente (por chat, correo o en un documento)." }));
        pie(boton("↻ Otra vez", "ts-btn-sec", () => responder(quiz, opts)), boton("📋 Copiar código", "ts-btn-primary", () => copiar(codigo.textContent)));
        if (!C.soportaEnlace) { codigo.textContent = `${nombre}: ${puntos}/${total}`; return; }
        const resultado = {
          formato: "3dpit-quiz-resultado", version: 1, nombre, titulo: quiz.titulo,
          fecha: new Date().toISOString().slice(0, 16), puntos, total,
          respuestas: quiz.preguntas.map((q, i) => ({ p: (q.texto || "(código)").slice(0, 120), r: C.textoRespuesta(q, respuestas[i]).slice(0, C.LIM.respuesta), ok: ok[i] })),
        };
        codigo.textContent = "3DPIT-" + (await C.comprimir(JSON.stringify(resultado)));
      } else {
        pie(boton("↻ Otra vez", "ts-btn-sec", () => responder(quiz, opts)), boton("Más temas →", "ts-btn-primary", abrir));
      }
    }
  }

  async function copiar(texto) {
    try {
      if (typeof writeClipboard === "function") await writeClipboard(texto);
      else await navigator.clipboard.writeText(texto);
    } catch (_) {}
  }

  // ── Enlace del docente: #quiz=... ──
  // El dato va en el fragmento (#), que nunca se manda a un servidor, y se
  // quita de la barra de direcciones para que no quede al recargar.
  async function desdeEnlace() {
    const h = location.hash || "";
    if (!h.startsWith("#quiz=")) return;
    try {
      history.replaceState(null, "", location.pathname + location.search);
    } catch (_) {}
    if (!C.soportaEnlace) return aviso("Este navegador no puede abrir enlaces de cuestionario. Pídele a tu docente el archivo .quiz.json.");
    try {
      responder(C.sanitizar(JSON.parse(await C.descomprimir(h.slice(6)))), { docente: true });
    } catch (_) {
      aviso("El enlace del cuestionario no es válido o está dañado. Pídele a tu docente que lo vuelva a copiar, o el archivo .quiz.json.");
    }
  }
  desdeEnlace();
  window.addEventListener("hashchange", desdeEnlace);

  return { abrir, responder, cerrar };
})();
window.EchaleCoco = EchaleCoco;
