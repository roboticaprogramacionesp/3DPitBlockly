/* ══════════════════════════════════════════════════════════════
   coco-core.js — Lo común de "¡Échale coco!" (preguntas para reforzar
   lo aprendido): lo usan la ventana flotante de la app (static/coco.js)
   y el editor para docentes (static/tools/quiz.html).

   SEGURIDAD: un cuestionario compartido por enlace o archivo, y un
   código de resultado, son contenido NO confiable. sanitizar()
   reconstruye todo copiando solo los campos conocidos, con su tipo y
   largo máximo, y el texto siempre se muestra con textContent (rich()
   solo admite **negrita**, *cursiva* y saltos de línea, nodo por nodo).
══════════════════════════════════════════════════════════════ */
const CocoCore = (() => {
  const LIM = {
    titulo: 120, texto: 600, codigo: 1500, opcion: 200, explicacion: 400, respuesta: 100,
    preguntas: 50, opciones: 6, bytes: 200 * 1024, enlace: 120 * 1024, nombre: 60,
  };

  const str = (v, max) => (typeof v === "string" ? v.slice(0, max) : "");

  // Para comparar respuestas cortas: sin mayúsculas, acentos ni espacios de más.
  const norm = (s) => String(s).trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ");

  function sanitizar(obj) {
    if (!obj || typeof obj !== "object" || obj.formato !== "3dpit-quiz") throw new Error("No es un cuestionario de 3DPit");
    const preguntas = (Array.isArray(obj.preguntas) ? obj.preguntas : []).slice(0, LIM.preguntas).map((p) => {
      const q = {
        tipo: ["opcion", "vf", "corta"].includes(p && p.tipo) ? p.tipo : "opcion",
        texto: str(p && p.texto, LIM.texto),
        codigo: str(p && p.codigo, LIM.codigo),
        explicacion: str(p && p.explicacion, LIM.explicacion),
      };
      if (q.tipo === "opcion") {
        q.opciones = (Array.isArray(p.opciones) ? p.opciones : []).slice(0, LIM.opciones).map((o) => str(o, LIM.opcion));
        while (q.opciones.length < 2) q.opciones.push("");
        q.correcta = Number.isInteger(p.correcta) && p.correcta >= 0 && p.correcta < q.opciones.length ? p.correcta : 0;
      } else if (q.tipo === "vf") {
        q.correcta = p.correcta === true;
      } else {
        q.correcta = str(p.correcta, LIM.respuesta * 4);
      }
      return q;
    });
    return {
      formato: "3dpit-quiz", version: 1,
      titulo: str(obj.titulo, LIM.titulo) || "¡Échale coco!",
      descripcion: str(obj.descripcion, LIM.texto),
      mostrarRespuestas: obj.mostrarRespuestas !== false,
      preguntas,
    };
  }

  function esCorrecta(q, r) {
    if (r === null || r === undefined) return false;
    if (q.tipo === "corta") return q.correcta.split("|").map(norm).filter(Boolean).includes(norm(r));
    return r === q.correcta;
  }

  // Texto de la respuesta elegida, para el repaso y el código de resultado.
  function textoRespuesta(q, r) {
    if (r === null || r === undefined) return "";
    if (q.tipo === "vf") return r ? "Verdadero" : "Falso";
    if (q.tipo === "opcion") return q.opciones[r] || "";
    return String(r);
  }

  // Texto seguro: **negrita**, *cursiva* y saltos de línea, nodo por nodo.
  function rich(texto) {
    const span = document.createElement("span");
    String(texto || "").split("\n").forEach((linea, i) => {
      if (i) span.appendChild(document.createElement("br"));
      const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
      let ultimo = 0, m;
      while ((m = re.exec(linea))) {
        if (m.index > ultimo) span.appendChild(document.createTextNode(linea.slice(ultimo, m.index)));
        const n = document.createElement(m[1] !== undefined ? "b" : "em");
        n.textContent = m[1] !== undefined ? m[1] : m[2];
        span.appendChild(n);
        ultimo = re.lastIndex;
      }
      if (ultimo < linea.length) span.appendChild(document.createTextNode(linea.slice(ultimo)));
    });
    return span;
  }

  // ── Compresión para el enlace (#quiz=) y el código de resultado ──
  // Va en el fragmento (#): el navegador no lo manda a ningún servidor.
  function b64url(bytes) {
    let s = "";
    bytes.forEach((b) => (s += String.fromCharCode(b)));
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function desdeB64url(txt) {
    const s = atob(txt.replace(/-/g, "+").replace(/_/g, "/"));
    return Uint8Array.from(s, (c) => c.charCodeAt(0));
  }
  const soportaEnlace = typeof CompressionStream !== "undefined" && typeof DecompressionStream !== "undefined";
  async function comprimir(texto) {
    const stream = new Blob([new TextEncoder().encode(texto)]).stream().pipeThrough(new CompressionStream("deflate-raw"));
    return b64url(new Uint8Array(await new Response(stream).arrayBuffer()));
  }
  // Corta apenas se pasa del límite (evita "bombas" de compresión).
  async function descomprimir(txt) {
    if (txt.length > LIM.enlace || !/^[A-Za-z0-9_-]+$/.test(txt)) throw new Error("dato inválido");
    const reader = new Blob([desdeB64url(txt)]).stream().pipeThrough(new DecompressionStream("deflate-raw")).getReader();
    const parts = [];
    let total = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.length;
      if (total > LIM.bytes) {
        reader.cancel();
        throw new Error("demasiado grande");
      }
      parts.push(value);
    }
    const out = new Uint8Array(total);
    let o = 0;
    parts.forEach((p) => { out.set(p, o); o += p.length; });
    return new TextDecoder().decode(out);
  }

  return { LIM, str, norm, sanitizar, esCorrecta, textoRespuesta, rich, soportaEnlace, comprimir, descomprimir };
})();
window.CocoCore = CocoCore;
