/* ══════════════════════════════════════════════════════════════
   cartas.js — Juego de cartas de preguntas (las tarjetas y la hoja de
   respuestas están en cartas-data.js), en una ventana flotante con el
   mismo estilo y arrastre que el tutorial guiado (clases .ts-* de
   tutorial-steps.css y _tsMakeDraggable).

   También da las funciones que usan los bloques 🃏 de la vista Juego
   (game_blocks.js / animation.js): Cartas.sacar(nivel), Cartas.correcta()
   y Cartas.opciones().
   Agregar DESPUÉS de tutorial-steps.js, coco.js y cartas-data.js.
══════════════════════════════════════════════════════════════ */
const Cartas = (() => {
  const MEJOR = "3dpit-cartas-mejor";
  const LETRAS = ["a", "b", "c", "d"];
  const NIVELES = [
    ["facil", "🟢 Fácil"], ["intermedio", "🔵 Intermedio"], ["dificil", "🟣 Difícil"], ["todas", "🃏 Mezcladas"],
  ];
  let panel = null;
  let body, footer, fill, progressTxt, title;

  // Las que se pueden jugar (las de correcta = null tienen un error).
  const jugables = (nivel) => CARTAS.filter((c) => c.correcta !== null && (nivel === "todas" || c.nivel === nivel));

  function mezclar(lista) {
    const l = lista.slice();
    for (let a = l.length - 1; a > 0; a--) {
      const b = Math.floor(Math.random() * (a + 1));
      [l[a], l[b]] = [l[b], l[a]];
    }
    return l;
  }

  function mejores() {
    try {
      return JSON.parse(localStorage.getItem(MEJOR) || "{}");
    } catch (_) {
      return {};
    }
  }
  function guardarMejor(clave, pct) {
    const m = mejores();
    if (!(clave in m) || pct > m[clave]) m[clave] = pct;
    try {
      localStorage.setItem(MEJOR, JSON.stringify(m));
    } catch (_) {}
  }

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
  const boton = (texto, clase, onclick) => el("button", { class: "ts-btn " + clase, text: texto, onclick });
  function pie(...botones) {
    footer.innerHTML = "";
    botones.filter(Boolean).forEach((b) => footer.appendChild(b));
  }

  // ── Ventana ──
  function crear() {
    panel = el("div", { id: "cartas-panel", style: "display:none" });
    panel.innerHTML =
      '<div class="ts-header">' +
      '  <span class="ts-icon">🃏</span>' +
      '  <div class="ts-title-group">' +
      '    <p class="ts-label">Cartas &nbsp;·&nbsp; <span class="ts-drag-hint">✥ arrastrar</span></p>' +
      '    <h2 class="ts-title" id="cartas-title"></h2>' +
      "  </div>" +
      '  <button class="ts-minimize" id="cartas-min" title="Minimizar">−</button>' +
      '  <button class="ts-close" id="cartas-close" title="Cerrar">✕</button>' +
      "</div>" +
      '<div id="cartas-collapsible">' +
      '  <div class="ts-progress-bar"><div class="ts-progress-fill" id="cartas-fill"></div></div>' +
      '  <p class="ts-progress-txt" id="cartas-progress"></p>' +
      '  <div class="ts-body cartas-body" id="cartas-body"></div>' +
      '  <div class="ts-footer" id="cartas-footer"></div>' +
      "</div>";
    document.body.appendChild(panel);
    body = panel.querySelector("#cartas-body");
    footer = panel.querySelector("#cartas-footer");
    fill = panel.querySelector("#cartas-fill");
    progressTxt = panel.querySelector("#cartas-progress");
    title = panel.querySelector("#cartas-title");
    panel.querySelector("#cartas-close").onclick = cerrar;
    panel.querySelector("#cartas-min").onclick = () => {
      const min = panel.getAttribute("data-minimized") === "1";
      if (min) panel.removeAttribute("data-minimized");
      else panel.setAttribute("data-minimized", "1");
      panel.querySelector("#cartas-collapsible").style.display = min ? "" : "none";
      // Igual que el tutorial guiado: □ para restaurar, − para minimizar.
      panel.querySelector("#cartas-min").textContent = min ? "−" : "□";
    };
    if (typeof _tsMakeDraggable === "function") _tsMakeDraggable(panel);
  }

  function mostrar() {
    if (window.EchaleCoco) window.EchaleCoco.cerrarBienvenida();
    if (!panel) crear();
    panel.style.display = "flex";
    panel.removeAttribute("data-minimized");
    panel.querySelector("#cartas-collapsible").style.display = "";
    panel.querySelector("#cartas-min").textContent = "−";
  }
  function cerrar() {
    if (panel) panel.style.display = "none";
  }

  // ── Inicio: elegir nivel y cuántas cartas ──
  function abrir() {
    mostrar();
    title.textContent = "Cartas de preguntas";
    fill.style.width = "0%";
    progressTxt.textContent = "Elige un nivel";
    body.innerHTML = "";
    const m = mejores();
    let cuantas = 10;
    const cantidades = el("div", { class: "cartas-cuantas" },
      el("span", { class: "ts-step-desc", text: "¿Cuántas cartas?" }),
      ...[5, 10, 20].map((n) => {
        const b = el("button", { class: "coco-opt" + (n === cuantas ? " chosen" : ""), text: String(n) });
        b.onclick = () => {
          cuantas = n;
          cantidades.querySelectorAll("button").forEach((o) => o.classList.toggle("chosen", o === b));
        };
        return b;
      }));
    const lista = el("div", { class: "coco-list" });
    NIVELES.forEach(([nivel, nombre]) => {
      const total = jugables(nivel).length;
      const best = `${nivel}` in m ? `⭐ ${m[nivel]}%` : "";
      lista.appendChild(el("button", { class: "coco-item", onclick: () => jugar(nivel, cuantas) },
        el("span", { class: "coco-item-title", text: nombre }),
        el("span", { class: "coco-item-best", text: `${total} cartas ${best}` })));
    });
    body.append(el("p", { class: "ts-step-desc", text: "Voltea cartas de matemáticas y ciencias y responde. ¡A ver cuántas aciertas seguidas! 🔥" }), cantidades, lista);
    pie(boton("✕ Cerrar", "ts-btn-sec", cerrar));
  }

  // ── Jugar una ronda ──
  function jugar(nivel, cuantas) {
    const mazo = mezclar(jugables(nivel)).slice(0, cuantas);
    const nombre = NIVELES.find((n) => n[0] === nivel)[1];
    let puntos = 0, racha = 0, mejorRacha = 0;
    const falladas = [];
    title.textContent = nombre;

    function carta(i) {
      if (i >= mazo.length) return final();
      const c = mazo[i];
      fill.style.width = `${(i / mazo.length) * 100}%`;
      progressTxt.textContent = `Carta ${i + 1} de ${mazo.length} · ${puntos} aciertos${racha >= 2 ? ` · 🔥 ${racha} seguidas` : ""}`;
      body.innerHTML = "";
      const img = el("img", { class: "carta-img", src: c.img, alt: `Pregunta ${c.pregunta}` });
      body.appendChild(el("div", { class: "carta-flip" }, img));
      const opciones = el("div", { class: "carta-opts" });
      const fb = el("div", {});
      const sigue = boton(i + 1 < mazo.length ? "Siguiente carta →" : "Ver resultado", "ts-btn-primary", () => carta(i + 1));
      sigue.disabled = true;

      const resultado = (ok) => {
        if (ok) { puntos++; racha++; mejorRacha = Math.max(mejorRacha, racha); } else { racha = 0; falladas.push(c); }
        sigue.disabled = false;
        progressTxt.textContent = `Carta ${i + 1} de ${mazo.length} · ${puntos} aciertos${racha >= 2 ? ` · 🔥 ${racha} seguidas` : ""}`;
        sigue.focus();
      };

      if (typeof c.correcta === "number") {
        LETRAS.slice(0, c.opciones).forEach((letra, k) => {
          const b = el("button", { class: "coco-opt carta-letra", text: letra });
          b.onclick = () => {
            const ok = k === c.correcta;
            opciones.querySelectorAll("button").forEach((o, j) => {
              o.disabled = true;
              if (j === c.correcta) o.classList.add("right");
              else if (o === b) o.classList.add("wrong");
            });
            fb.className = "coco-feedback " + (ok ? "ok" : "no");
            fb.textContent = ok ? (racha >= 2 ? `✅ ¡Correcto! 🔥 ${racha + 1} seguidas` : "✅ ¡Correcto!") : `❌ Era la ${LETRAS[c.correcta]})`;
            if (CARTAS_NOTAS[c.archivo]) fb.appendChild(el("div", { class: "coco-expl", text: "Nota: " + CARTAS_NOTAS[c.archivo] }));
            resultado(ok);
          };
          opciones.appendChild(b);
        });
      } else {
        // Respuesta abierta: se muestra la respuesta y quien juega dice si acertó.
        const ver = el("button", { class: "coco-opt", text: "👀 Ver respuesta" });
        ver.onclick = () => {
          opciones.innerHTML = "";
          fb.className = "coco-feedback ok";
          fb.textContent = "Respuesta: " + c.correcta;
          opciones.append(
            el("button", { class: "coco-opt", text: "✅ Acerté", onclick: () => { fb.textContent += " · ¡Bien!"; opciones.innerHTML = ""; resultado(true); } }),
            el("button", { class: "coco-opt", text: "❌ No acerté", onclick: () => { opciones.innerHTML = ""; resultado(false); } }));
        };
        opciones.appendChild(ver);
      }
      body.append(opciones, fb);
      pie(boton("← Niveles", "ts-btn-sec", abrir), sigue);
    }

    function final() {
      const pct = Math.round((puntos / mazo.length) * 100);
      guardarMejor(nivel, pct);
      fill.style.width = "100%";
      progressTxt.textContent = "Resultado";
      const [emoji, frase] = pct === 100 ? ["🏆", "¡Perfecto! Todas correctas."]
        : pct >= 70 ? ["🎉", "¡Muy bien!"]
        : pct >= 40 ? ["💪", "Vas bien: repasa las que fallaste."]
        : ["🃏", "¡Échale ganas! Vuelve a intentarlo."];
      body.innerHTML = "";
      body.append(el("div", { class: "ts-fin" },
        el("div", { class: "ts-fin-icon", text: emoji }),
        el("h3", { text: `${puntos} de ${mazo.length} (${pct}%)` }),
        el("p", { text: `${frase}${mejorRacha >= 2 ? ` Tu mejor racha: 🔥 ${mejorRacha}.` : ""}` })));
      if (falladas.length) {
        body.appendChild(el("p", { class: "ts-step-title", text: "Para repasar:" }));
        const rep = el("div", { class: "cartas-repaso" });
        falladas.forEach((c) => rep.appendChild(el("img", { src: c.img, alt: `Pregunta ${c.pregunta}`, title: `Pregunta ${c.pregunta} (${c.tema})` })));
        body.appendChild(rep);
      }
      pie(boton("↻ Otra ronda", "ts-btn-sec", () => jugar(nivel, cuantas)), boton("Niveles →", "ts-btn-primary", abrir));
    }

    carta(0);
  }

  // ── Para los bloques 🃏 de la vista Juego ──
  // sacar() da una carta al azar del nivel sin repetir hasta agotarlas, y
  // devuelve su imagen relativa a static/img/ (lo que usa GameEngine).
  const pendientes = {};
  let actual = null;
  function sacar(nivel) {
    const n = ["facil", "intermedio", "dificil"].includes(nivel) ? nivel : "todas";
    // En los bloques solo van las de opciones (las abiertas no se pueden calificar con un botón).
    if (!pendientes[n] || !pendientes[n].length) pendientes[n] = mezclar(jugables(n).filter((c) => typeof c.correcta === "number"));
    actual = pendientes[n].pop();
    return actual.img.replace(/^static\/img\//, "");
  }
  const correcta = () => (actual ? LETRAS[actual.correcta] : "");
  const opciones = () => (actual ? actual.opciones : 0);

  return { abrir, cerrar, sacar, correcta, opciones };
})();
window.Cartas = Cartas;
