/* ══════════════════════════════════════════════════════════════
   cartas.js — Juego de cartas de preguntas (las tarjetas y la hoja de
   respuestas están en cartas-data.js), en una ventana flotante con el
   mismo estilo y arrastre que el tutorial guiado (clases .ts-* de
   tutorial-steps.css y _tsMakeDraggable). Se abre desde Herramientas →
   Aprender (tools-panel.js) y desde el menú 🎯 Practica.

   - Jugar una ronda por nivel (se contesta con clic o con las teclas
     A/B/C/D y Enter para la siguiente).
   - Al terminar, elegir cuáles de las falladas repasar; las falladas se
     guardan en "📌 Para repasar" hasta acertarlas.
   - Ver las cartas una por una (de la 1 a la 68 o ir a un número).

   También da las funciones que usan los bloques 🃏 de la vista Juego
   (game_blocks.js / animation.js): Cartas.sacar(nivel), Cartas.correcta()
   y Cartas.opciones().
   Agregar DESPUÉS de tutorial-steps.js, coco.js y cartas-data.js.
══════════════════════════════════════════════════════════════ */
const Cartas = (() => {
  const MEJOR = "3dpit-cartas-mejor";
  const REPASO = "3dpit-cartas-repaso";
  const LETRAS = ["a", "b", "c", "d"];
  const NIVELES = [
    ["facil", "🟢 Fácil"], ["intermedio", "🔵 Intermedio"], ["dificil", "🟣 Difícil"], ["todas", "🃏 Mezcladas"],
  ];
  const NOMBRE_NIVEL = { facil: "🟢 Fácil", intermedio: "🔵 Intermedio", dificil: "🟣 Difícil" };
  let panel = null;
  let body, footer, fill, progressTxt, title;
  // Mientras hay una carta esperando respuesta: { letras: [botones], sigue }
  let teclado = null;

  // Las que se pueden jugar (las de correcta = null tienen un error).
  const jugables = (nivel) => CARTAS.filter((c) => c.correcta !== null && (nivel === "todas" || c.nivel === nivel));
  const porArchivo = (n) => CARTAS.find((c) => c.archivo === n);

  function mezclar(lista) {
    const l = lista.slice();
    for (let a = l.length - 1; a > 0; a--) {
      const b = Math.floor(Math.random() * (a + 1));
      [l[a], l[b]] = [l[b], l[a]];
    }
    return l;
  }

  function leer(clave, vacio) {
    try {
      return JSON.parse(localStorage.getItem(clave)) || vacio;
    } catch (_) {
      return vacio;
    }
  }
  function escribir(clave, valor) {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch (_) {}
  }
  const mejores = () => leer(MEJOR, {});
  function guardarMejor(clave, pct) {
    const m = mejores();
    if (!(clave in m) || pct > m[clave]) m[clave] = pct;
    escribir(MEJOR, m);
  }
  // Cartas falladas que quedan para repasar (números de archivo).
  const paraRepasar = () => leer(REPASO, []).map(porArchivo).filter((c) => c && c.correcta !== null);
  function anotarRepaso(falladas, acertadas) {
    const s = new Set(leer(REPASO, []));
    falladas.forEach((c) => s.add(c.archivo));
    acertadas.forEach((c) => s.delete(c.archivo));
    escribir(REPASO, [...s].sort((a, b) => a - b));
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
  function limpiar() {
    teclado = null;
    body.innerHTML = "";
    body.scrollTop = 0;
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
    teclado = null;
    if (panel) panel.style.display = "none";
  }

  // Teclas A/B/C/D para contestar y Enter para la siguiente carta (solo con
  // la ventana abierta y una carta en juego; no se meten con campos de texto
  // ni con la vista Juego, que también usa esas teclas).
  document.addEventListener("keydown", (e) => {
    if (!teclado || !panel || panel.style.display === "none" || panel.getAttribute("data-minimized") === "1") return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    const k = LETRAS.indexOf(String(e.key).toLowerCase());
    const b = k >= 0 ? teclado.letras[k] : e.key === "Enter" ? teclado.sigue : null;
    if (!b || b.disabled) return;
    e.preventDefault();
    e.stopPropagation();
    b.click();
  }, true);

  // ── Inicio: elegir nivel y cuántas cartas ──
  function abrir() {
    mostrar();
    title.textContent = "Cartas de preguntas";
    fill.style.width = "0%";
    progressTxt.textContent = "Elige un nivel";
    limpiar();
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
      const best = nivel in m ? `⭐ ${m[nivel]}%` : "";
      lista.appendChild(el("button", { class: "coco-item", onclick: () => jugar(nivel, cuantas) },
        el("span", { class: "coco-item-title", text: nombre }),
        el("span", { class: "coco-item-best", text: `${total} cartas ${best}` })));
    });
    const pendientesRepaso = paraRepasar();
    if (pendientesRepaso.length) {
      lista.appendChild(el("button", { class: "coco-item cartas-item-repaso", onclick: () => elegirRepaso(pendientesRepaso, "📌 Para repasar") },
        el("span", { class: "coco-item-title", text: "📌 Para repasar" }),
        el("span", { class: "coco-item-best", text: `${pendientesRepaso.length} que fallaste` })));
    }
    body.append(
      el("p", { class: "ts-step-desc", text: "Voltea cartas de matemáticas y ciencias y responde con clic o con las teclas A, B, C, D. ¡A ver cuántas aciertas seguidas! 🔥" }),
      cantidades, lista);
    pie(boton("✕ Cerrar", "ts-btn-sec", cerrar), boton("🔍 Ver las cartas", "ts-btn-primary", () => ver(1)));
  }

  // ── Jugar una ronda (de un nivel, o con un mazo ya elegido) ──
  function jugar(nivel, cuantas, mazoFijo, nombreFijo) {
    const mazo = mazoFijo ? mezclar(mazoFijo) : mezclar(jugables(nivel)).slice(0, cuantas);
    const nombre = nombreFijo || NIVELES.find((n) => n[0] === nivel)[1];
    let puntos = 0, racha = 0, mejorRacha = 0;
    const falladas = [], acertadas = [];
    title.textContent = nombre;

    function carta(i) {
      if (i >= mazo.length) return final();
      const c = mazo[i];
      fill.style.width = `${(i / mazo.length) * 100}%`;
      progressTxt.textContent = `Carta ${i + 1} de ${mazo.length} · ${puntos} aciertos${racha >= 2 ? ` · 🔥 ${racha} seguidas` : ""}`;
      limpiar();
      const img = el("img", { class: "carta-img", src: c.img, alt: `Pregunta ${c.pregunta}` });
      body.appendChild(el("div", { class: "carta-flip" }, img));
      const opciones = el("div", { class: "carta-opts" });
      const fb = el("div", {});
      const sigue = boton(i + 1 < mazo.length ? "Siguiente carta →" : "Ver resultado", "ts-btn-primary", () => carta(i + 1));
      sigue.disabled = true;
      teclado = { letras: [], sigue };

      const resultado = (ok) => {
        if (ok) { puntos++; racha++; mejorRacha = Math.max(mejorRacha, racha); acertadas.push(c); } else { racha = 0; falladas.push(c); }
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
          teclado.letras.push(b);
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
      if (!mazoFijo) guardarMejor(nivel, pct);
      anotarRepaso(falladas, acertadas);
      fill.style.width = "100%";
      progressTxt.textContent = "Resultado";
      const [emoji, frase] = pct === 100 ? ["🏆", "¡Perfecto! Todas correctas."]
        : pct >= 70 ? ["🎉", "¡Muy bien!"]
        : pct >= 40 ? ["💪", "Vas bien: repasa las que fallaste."]
        : ["🃏", "¡Échale ganas! Vuelve a intentarlo."];
      limpiar();
      body.append(el("div", { class: "ts-fin" },
        el("div", { class: "ts-fin-icon", text: emoji }),
        el("h3", { text: `${puntos} de ${mazo.length} (${pct}%)` }),
        el("p", { text: `${frase}${mejorRacha >= 2 ? ` Tu mejor racha: 🔥 ${mejorRacha}.` : ""}` })));
      const otra = boton("↻ Otra ronda", "ts-btn-sec", () => jugar(nivel, cuantas, mazoFijo, nombreFijo));
      if (!falladas.length) return pie(otra, boton("Niveles →", "ts-btn-primary", abrir));
      const repasar = boton("", "ts-btn-primary", null);
      const sel = seleccionar(falladas, repasar, (lista) => jugar(nivel, cuantas, lista, "🔁 Repaso"));
      body.append(el("p", { class: "ts-step-title", text: "Las que fallaste: elige cuáles repasar" }), sel);
      pie(boton("← Niveles", "ts-btn-sec", abrir), otra, repasar);
    }

    carta(0);
  }

  // Miniaturas que se marcan / desmarcan con un clic (todas marcadas al
  // empezar); el botón dice cuántas van y arranca el repaso con esas.
  function seleccionar(cartas, botonRepasar, alRepasar) {
    const elegidas = new Set(cartas);
    const rep = el("div", { class: "cartas-repaso" });
    const marcar = el("div", { class: "cartas-marcar" },
      el("button", { class: "coco-opt", text: "☑ Todas", onclick: () => { cartas.forEach((c) => elegidas.add(c)); pintar(); } }),
      el("button", { class: "coco-opt", text: "☐ Ninguna", onclick: () => { elegidas.clear(); pintar(); } }));
    const minis = cartas.map((c) => {
      const b = el("button", { class: "cartas-mini", title: `Pregunta ${c.pregunta} (${c.tema}) · clic para marcar o quitar` },
        el("img", { src: c.img, alt: `Pregunta ${c.pregunta}` }),
        el("span", { class: "cartas-mini-num", text: `#${c.archivo}` }),
        el("span", { class: "cartas-mini-check", text: "✓" }));
      b.onclick = () => { if (elegidas.has(c)) elegidas.delete(c); else elegidas.add(c); pintar(); };
      rep.appendChild(b);
      return b;
    });
    function pintar() {
      minis.forEach((b, i) => b.classList.toggle("sel", elegidas.has(cartas[i])));
      botonRepasar.textContent = `🔁 Repasar (${elegidas.size})`;
      botonRepasar.disabled = !elegidas.size;
    }
    botonRepasar.onclick = () => alRepasar(cartas.filter((c) => elegidas.has(c)));
    pintar();
    return el("div", { class: "cartas-sel" }, marcar, rep);
  }

  // Lista de "📌 Para repasar" guardada: elegir cuáles jugar, o quitarlas.
  function elegirRepaso(cartas, nombre) {
    mostrar();
    title.textContent = nombre;
    fill.style.width = "0%";
    progressTxt.textContent = "Se quitan de la lista cuando las aciertas";
    limpiar();
    const repasar = boton("", "ts-btn-primary", null);
    body.append(el("p", { class: "ts-step-desc", text: "Estas son las cartas que fallaste. Marca las que quieras repasar." }),
      seleccionar(cartas, repasar, (lista) => jugar("todas", 0, lista, "🔁 Repaso")));
    const borrar = boton("🗑 Vaciar lista", "ts-btn-sec", () => {
      if (!confirm("¿Quitar todas las cartas de la lista para repasar?")) return;
      escribir(REPASO, []);
      abrir();
    });
    pie(boton("← Niveles", "ts-btn-sec", abrir), borrar, repasar);
  }

  // ── Ver las cartas: de la 1 a la 68, o ir a una por su número ──
  function ver(n) {
    mostrar();
    const total = CARTAS.length;
    n = Math.min(total, Math.max(1, Math.round(Number(n)) || 1));
    const c = porArchivo(n);
    title.textContent = "Ver las cartas";
    fill.style.width = `${(n / total) * 100}%`;
    progressTxt.textContent = `Carta ${n} de ${total} · ${NOMBRE_NIVEL[c.nivel]} · ${c.tema}`;
    limpiar();

    const ir = el("input", { type: "number", min: "1", max: String(total), value: String(n), class: "cartas-ir", title: "Número de carta" });
    const irA = () => ver(ir.value);
    ir.onkeydown = (e) => { if (e.key === "Enter") irA(); };
    const nav = el("div", { class: "cartas-nav" },
      el("button", { class: "coco-opt", text: "◀", title: "Anterior", onclick: () => ver(n > 1 ? n - 1 : total) }),
      el("span", { class: "ts-step-desc", text: "Ir a la carta" }), ir,
      el("button", { class: "coco-opt", text: "Ir", onclick: irA }),
      el("button", { class: "coco-opt", text: "▶", title: "Siguiente", onclick: () => ver(n < total ? n + 1 : 1) }));

    const fb = el("div", {});
    const respuesta = c.correcta === null ? null
      : typeof c.correcta === "number" ? `${LETRAS[c.correcta]})` : c.correcta;
    let detalle;
    if (respuesta === null) {
      detalle = el("div", { class: "coco-feedback no", text: "⚠ Esta carta tiene un error y no sale en el juego: " + CARTAS_NOTAS[c.archivo] });
    } else {
      detalle = el("button", { class: "coco-opt", text: "👀 Mostrar respuesta" });
      detalle.onclick = () => {
        detalle.remove();
        fb.className = "coco-feedback ok";
        fb.textContent = "Respuesta: " + respuesta;
        if (CARTAS_NOTAS[c.archivo]) fb.appendChild(el("div", { class: "coco-expl", text: "Nota: " + CARTAS_NOTAS[c.archivo] }));
      };
    }

    // Todas las cartas como botones de número, con el color de su nivel.
    const rejilla = el("div", { class: "cartas-rejilla" });
    CARTAS.forEach((x) => {
      rejilla.appendChild(el("button", {
        class: `cartas-num nivel-${x.nivel}${x.archivo === n ? " actual" : ""}${x.correcta === null ? " con-error" : ""}`,
        text: String(x.archivo),
        title: `${NOMBRE_NIVEL[x.nivel]} · ${x.tema}${x.correcta === null ? " · ⚠ con error" : ""}`,
        onclick: () => ver(x.archivo),
      }));
    });

    body.append(nav,
      el("div", { class: "carta-flip" }, el("img", { class: "carta-img", src: c.img, alt: `Carta ${n}` })),
      detalle, fb, rejilla,
      el("p", { class: "ts-progress-txt", text: "🟢 Fácil · 🔵 Intermedio · 🟣 Difícil · tachadas: tienen un error" }));
    pie(boton("← Niveles", "ts-btn-sec", abrir),
      respuesta !== null && typeof c.correcta !== "string"
        ? boton("▶ Jugar esta carta", "ts-btn-primary", () => jugar("todas", 0, [c], `Carta ${n}`)) : null);
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

  return { abrir, cerrar, ver, sacar, correcta, opciones };
})();
window.Cartas = Cartas;
