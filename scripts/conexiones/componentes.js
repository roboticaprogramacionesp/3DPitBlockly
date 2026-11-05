// Componentes para los diagramas de conexiones: los dibujos y pines del
// simulador 3DPitSimu (copiados en ./componentes/, mismo formato: un .json con
// width/height/pins y un .svg que se estira a ese tamaño, igual que hace
// Renderer.js del simulador) y algunos módulos genéricos dibujados aquí para
// los que el simulador todavía no tiene.
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "componentes");

// Limpia el SVG de Inkscape (metadatos, atributos del editor, decimales de
// más) y le pone un prefijo a los id para que no choquen dentro del diagrama.
function limpiarSvg(texto, prefijo) {
  let s = texto
    .replace(/<\?xml[^>]*\?>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<metadata\b[^>]*\/>/g, "")
    .replace(/<metadata\b[^>]*[^/]>[\s\S]*?<\/metadata>/g, "")
    .replace(/<rdf:RDF[\s\S]*?<\/rdf:RDF>/g, "")
    .replace(/<sodipodi:namedview[\s\S]*?(\/>|<\/sodipodi:namedview>)/g, "")
    .replace(/<(inkscape|sodipodi):[\w-]+[^>]*?\/>/g, "")
    .replace(/<(inkscape|sodipodi):([\w-]+)[\s\S]*?<\/\1:\2>/g, "")
    .replace(/<(\/?)svg:/g, "<$1")
    .replace(/\s(inkscape|sodipodi):[\w-]+="[^"]*"/g, "")
    .replace(/\sxmlns:[\w-]+="[^"]*"/g, "")
    .replace(/(\d+\.\d{3,})/g, (n) => String(Math.round(parseFloat(n) * 100) / 100))
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ");
  const abre = s.match(/<svg\b[^>]*>/);
  let viewBox = null;
  const vb = abre && abre[0].match(/viewBox="([^"]+)"/);
  if (vb) {
    const p = vb[1].trim().split(/[\s,]+/).map(Number);
    viewBox = { x: p[0], y: p[1], w: p[2], h: p[3] };
  } else if (abre) {
    const w = parseFloat((abre[0].match(/\swidth="([\d.]+)/) || [])[1]) || 100;
    const h = parseFloat((abre[0].match(/\sheight="([\d.]+)/) || [])[1]) || 100;
    viewBox = { x: 0, y: 0, w, h };
  }
  let interior = abre ? s.slice(s.indexOf(abre[0]) + abre[0].length, s.lastIndexOf("</svg>")) : s;
  interior = interior
    .replace(/\sid="([^"]+)"/g, ` id="${prefijo}$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefijo}$1)`)
    .replace(/href="#([^"]+)"/g, `href="#${prefijo}$1"`);
  // Los style="..." que se repiten pasan a clases (algunos dibujos repiten el
  // mismo estilo cientos de veces).
  const veces = {};
  for (const m of interior.matchAll(/\sstyle="([^"]*)"/g)) veces[m[1]] = (veces[m[1]] || 0) + 1;
  const clases = {};
  let css = "";
  for (const [st, n] of Object.entries(veces)) {
    if (n < 3 || st.length < 12) continue;
    const c = `${prefijo}s${Object.keys(clases).length}`;
    clases[st] = c;
    css += `.${c}{${st}}`;
  }
  if (css) {
    interior = interior.replace(/<([a-zA-Z][\w-]*)(\s[^>]*?)?(\/?)>/g, (tag, nombre, attrs = "", cierre) => {
      const m = attrs.match(/\sstyle="([^"]*)"/);
      if (!m || !clases[m[1]] || /\sclass="/.test(attrs)) return tag;
      return `<${nombre}${attrs.replace(m[0], ` class="${clases[m[1]]}"`)}${cierre}>`;
    });
    interior = `<style>${css}</style>` + interior;
  }
  return { interior, viewBox };
}

function nombreCorto(nombre) {
  return String(nombre)
    .replace(/\s*\(.*\)\s*/g, "")
    .replace(/\s*\/.*$/, (m) => (m.length < 6 ? m : ""))
    .trim();
}

// Franjas de la resistencia según su valor (el dibujo del simulador trae
// otras): 1ª cifra, 2ª cifra y multiplicador; la 4ª (dorada) es la tolerancia.
const CODIGO = ["#111111", "#8a3d06", "#e03131", "#f76707", "#fab005", "#2f9e44", "#1c7ed6", "#7048e8", "#868e96", "#f8f9fa"];
function pintarBandas(interior, prefijo, ohms) {
  const e = Math.max(0, Math.floor(Math.log10(ohms)) - 1);
  const cifras = String(Math.round(ohms / 10 ** e)).padStart(2, "0");
  const color = { band_1_st: CODIGO[+cifras[0]], band_2_nd: CODIGO[+cifras[1]], band_rd_multiplier: CODIGO[e] };
  return interior.replace(/<[a-z]+\b[^>]*>/g, (tag) => {
    const m = tag.match(new RegExp(`id="${prefijo}(band_1_st|band_2_nd|band_rd_multiplier)"`));
    return m ? tag.replace(/fill="[^"]*"/, `fill="${color[m[1]]}"`) : tag;
  });
}

// Componente del simulador.
// La MAX7219 el simulador la dibuja por código (max7219.behavior.js): marco
// negro, rejilla de LEDs de 20 y los pines sobre el borde izquierdo.
// Aquí los LEDs van apagados (rojo muy oscuro) para que se vea la matriz.
function matrizMax7219(c, props) {
  const cols = props.cols || 8, rows = props.rows || 8, pad = 8, u = 20, r = (u * 0.76) / 2;
  let s = `<rect x="0" y="0" width="${c.w}" height="${c.h}" rx="4" fill="#111" stroke="#000"/>`;
  s += `<rect x="${pad}" y="${pad}" width="${cols * u}" height="${rows * u}" fill="#0a0a0a"/>`;
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) s += `<circle cx="${pad + x * u + u / 2}" cy="${pad + y * u + u / 2}" r="${r}" fill="#3a0d0d"/>`;
  for (const p of c.pines) {
    s += `<rect x="-3" y="${p.y - 3}" width="6" height="6" fill="#c9a227" stroke="#7a5f10" stroke-width="0.6"/>`;
    s += `<text x="-6" y="${p.y - 4}" text-anchor="end" font-size="8" font-weight="700" fill="#343a40">${p.nombre}</text>`;
  }
  return s;
}

// La matriz NeoPixel el simulador también la dibuja por código
// (neopixel_matrix.behavior.js) y su tamaño crece con filas/columnas:
// lado = 24·√(8·n) + 2·8 y los pines VCC/DIN/GND juntos al centro del borde
// de abajo, a 20 entre sí. Aquí los LEDs van apagados.
function matrizNeopixel(cols, rows) {
  const pad = 8, lado = (n) => 24 * Math.sqrt(8 * n);
  const w = lado(cols) + pad * 2, h = lado(rows) + pad * 2, cx = w / 2;
  return {
    tipo: "neopixel_matrix",
    nombre: `Matriz NeoPixel ${cols}x${rows}`,
    w, h,
    pines: [["vcc", "VCC", cx - 20], ["din", "DIN", cx], ["gnd", "GND", cx + 20]].map(([id, nombre, x]) => ({ id, nombre, x, y: h })),
    dibujo() {
      const cw = (w - pad * 2) / cols, ch = (h - pad * 2) / rows, r = Math.min(cw, ch) * 0.32;
      let s = `<rect x="0" y="0" width="${+w.toFixed(2)}" height="${+h.toFixed(2)}" rx="6" fill="#1a1a1a" stroke="#000"/>`;
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        s += `<circle cx="${+(pad + x * cw + cw / 2).toFixed(2)}" cy="${+(pad + y * ch + ch / 2).toFixed(2)}" r="${+r.toFixed(2)}" fill="#3b3b3b" stroke="#555" stroke-width="0.6"/>`;
      }
      for (const p of this.pines) s += `<text x="${+p.x.toFixed(2)}" y="${+(h - 1.8).toFixed(2)}" text-anchor="middle" font-size="5.5" font-weight="700" fill="#fff">${p.nombre}</text>`;
      return s;
    },
  };
}

const RECORTAR = new Set(["dfplayer"]);

function delSimulador(tipo) {
  const json = JSON.parse(fs.readFileSync(path.join(DIR, tipo + ".json"), "utf8"));
  const svg = fs.readFileSync(path.join(DIR, tipo + ".svg"), "utf8");
  return {
    tipo,
    nombre: json.name,
    w: json.width,
    h: json.height,
    pines: json.pins.map((p) => ({ id: p.id, nombre: nombreCorto(p.name), x: p.x, y: p.y })),
    dibujo(prefijo, props = {}) {
      if (tipo === "max7219") return matrizMax7219(this, props);
      let { interior, viewBox } = limpiarSvg(svg, prefijo);
      if (tipo === "resistencia") interior = pintarBandas(interior, prefijo, props.ohms || 220);
      const sx = this.w / viewBox.w, sy = this.h / viewBox.h;
      // Algunos dibujos exportados de Fritzing traen restos fuera de su
      // marco (el del DFPlayer: rectángulos sueltos arriba y a la derecha):
      // esos se recortan al viewBox.
      if (RECORTAR.has(tipo)) {
        const clip = `${prefijo}marco`;
        interior = `<clipPath id="${clip}"><rect x="${viewBox.x}" y="${viewBox.y}" width="${viewBox.w}" height="${viewBox.h}"/></clipPath><g clip-path="url(#${clip})">${interior}</g>`;
      }
      return `<g transform="scale(${+sx.toFixed(5)},${+sy.toFixed(5)}) translate(${-viewBox.x},${-viewBox.y})">${interior}</g>`;
    },
  };
}

// ── Módulos genéricos (los que el simulador aún no tiene) ──
const idPin = (p) => ({ "+": "vcc", "−": "gnd" }[p] || p.toLowerCase().replace("ñ", "n").replace(/[^a-z0-9]+/g, "_"));
// Placa con su nombre y los pines abajo, a 10 unidades (2.54 mm, como la placa).
function generico({ tipo, nombre, titulo, sub, color = "#1d5c9e", pines, w, h = 60, extra = "" }) {
  const W = Math.max(w || 0, pines.length * 10 + 24);
  const x0 = W / 2 - ((pines.length - 1) * 10) / 2;
  return {
    tipo, nombre, w: W, h,
    pines: pines.map((p, i) => ({ id: idPin(p), nombre: p, x: x0 + i * 10, y: h - 3 })),
    dibujo() {
      let s = `<rect x="0.5" y="0.5" width="${W - 1}" height="${h - 1}" rx="4" fill="${color}" stroke="#0b2540" stroke-width="1"/>`;
      s += extra;
      s += `<text x="${W / 2}" y="${sub ? h / 2 - 6 : h / 2 - 2}" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">${titulo}</text>`;
      if (sub) s += `<text x="${W / 2}" y="${h / 2 + 5}" text-anchor="middle" font-size="6" fill="#dbe7ff">${sub}</text>`;
      pines.forEach((p, i) => {
        const x = x0 + i * 10;
        s += p.length > 3
          ? `<text transform="translate(${x + 1.6},${h - 8}) rotate(-90)" font-size="4.6" fill="#fff">${p}</text>`
          : `<text x="${x}" y="${h - 9}" text-anchor="middle" font-size="4.6" fill="#fff">${p}</text>`;
        s += `<rect x="${x - 2}" y="${h - 5}" width="4" height="5" fill="#c9a227"/>`;
      });
      return s;
    },
  };
}

const GENERICOS = {
  ky005: () => generico({ tipo: "ky005", nombre: "Emisor IR KY-005", titulo: "KY-005", sub: "Emisor infrarrojo", pines: ["S", "+", "−"], w: 54, h: 66,
    extra: `<circle cx="27" cy="16" r="7" fill="#9fb3c8" stroke="#334" stroke-width="1"/><circle cx="27" cy="16" r="3.5" fill="#6c7a89"/>` }),
  touch: () => generico({ tipo: "touch", nombre: "Papel aluminio (sensor táctil)", titulo: "Aluminio", sub: "tócalo con el dedo", color: "#adb5bd",
    pines: ["TOUCH"], w: 54, h: 66 }),
  // Semáforo del kit: pines G, Y, R, GND (el del simulador los trae al revés).
  semaforo_kit: () => ({
    tipo: "semaforo_kit", nombre: "Módulo semáforo", w: 50, h: 112,
    pines: ["g", "y", "r", "gnd"].map((id, i) => ({ id, nombre: id === "gnd" ? "GND" : id.toUpperCase(), x: 10 + i * 10, y: 109 })),
    dibujo() {
      let s = `<rect x="13" y="2" width="24" height="62" rx="4" fill="#111"/><rect x="21" y="62" width="8" height="26" fill="#111"/>`;
      s += `<rect x="2" y="86" width="46" height="26" rx="2" fill="#111"/>`;
      [["#e03131", 13], ["#fab005", 33], ["#2f9e44", 53]].forEach(([c, y]) => (s += `<circle cx="25" cy="${y}" r="8" fill="${c}"/>`));
      s += `<circle cx="7" cy="94" r="3" fill="#fff"/><circle cx="43" cy="94" r="3" fill="#fff"/>`;
      [["G", "#40c057"], ["Y", "#fab005"], ["R", "#fa5252"], ["−", "#4dabf7"]].forEach(([t, c], i) => (s += `<text x="${10 + i * 10}" y="101" text-anchor="middle" font-size="7" font-weight="700" fill="${c}">${t}</text>`));
      for (let i = 0; i < 4; i++) s += `<rect x="${7 + i * 10}" y="104" width="6" height="8" fill="#888"/>`;
      return s;
    },
  }),
  pc: () => ({
    tipo: "pc", nombre: "Computadora", w: 80, h: 60, pines: [{ id: "usb", nombre: "USB", x: 80, y: 30 }],
    dibujo() {
      return `<rect x="4" y="4" width="62" height="40" rx="3" fill="#343a40"/><rect x="8" y="8" width="54" height="32" fill="#74c0fc"/>` +
        `<rect x="26" y="44" width="18" height="8" fill="#495057"/><rect x="16" y="52" width="38" height="4" rx="2" fill="#343a40"/>` +
        `<rect x="66" y="26" width="14" height="8" rx="1" fill="#868e96"/>`;
    },
  }),
};

const cache = {};
function componente(tipo, props = {}) {
  if (tipo === "neopixel_matrix") {
    const cols = props.cols || 8, rows = props.rows || 8, clave = `${tipo}_${cols}x${rows}`;
    if (!cache[clave]) cache[clave] = matrizNeopixel(cols, rows);
    return cache[clave];
  }
  if (!cache[tipo]) cache[tipo] = GENERICOS[tipo] ? GENERICOS[tipo]() : delSimulador(tipo);
  return cache[tipo];
}

module.exports = { componente };
