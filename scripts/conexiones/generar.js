// Genera los diagramas de "Conexiones eléctricas" de los tutoriales
// (static/img/conexiones/*.svg) a partir de diagramas.js, todos con el mismo
// formato: placa ESP32 WeMos D1 R32 + módulos (dibujos del simulador
// 3DPitSimu), cables trazados solos y, a la derecha, la tabla de conexiones,
// el material y una nota.
//
// Los cables se trazan con A* sobre una cuadrícula: solo van en horizontal y
// vertical, se castigan las vueltas, guardan distancia entre ellos y nunca
// pasan por encima de la tarjeta ni de los módulos (así no se cruzan).
// La posición de cada módulo se elige probando lugares alrededor de la placa
// y quedándose con el que da cables más cortos y con menos vueltas.
//
// Uso:  node scripts/conexiones/generar.js            (todos)
//       node scripts/conexiones/generar.js dht11 oled  (solo esos)
const fs = require("fs");
const path = require("path");
const { componente } = require("./componentes");
const DIAGRAMAS = require("./diagramas");
const LOGO = "data:image/png;base64," + fs.readFileSync(path.join(__dirname, "logo.png")).toString("base64");

const SALIDA = process.env.SALIDA_CONEXIONES || path.join(__dirname, "..", "..", "static", "img", "conexiones");

// ── Cuadrícula ──
const PASO = 2;             // unidades por celda (la placa usa 10 = 2.54 mm entre pines)
const HOLGURA_OBST = 6;     // los cables no se acercan a menos de esto de una pieza
const SALIDA_PIN = 8;       // largo del tramo recto que sale de cada pin
const R_CABLE = 2;          // celdas de separación entre cables (2 celdas = 4 u + grosor)
const VUELTA = 10;          // costo de cada vuelta (en celdas)

// La placa queda alineada para que sus pines caigan justo en la cuadrícula.
const BX = 399.72, BY = 400;

const GRUPOS = { GND: ["gnd_0", "gnd_1", "gnd_2"], "5V": ["5v_1", "5v_2"], "3V3": ["3v3"] };
// Pines de la placa que están dentro (IO15/IO33/IO32): salen por abajo
// pasando entre los pines del conector (ruta fija).
const PINES_INTERIORES = { io15: 151.28, io33: 181.28, io32: 181.28 };

const COLORES = ["#f08c00", "#1c7ed6", "#2f9e44", "#ae3ec9", "#0ca678", "#e64980", "#fab005", "#5c7cfa", "#a0522d", "#15aabf", "#82c91e", "#868e96"];
const COLOR_GND = "#212529", COLOR_5V = "#e03131", COLOR_3V3 = "#e8590c";

// ── Utilidades ──
const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]]; // derecha, abajo, izquierda, arriba
function rng(semilla) {
  let s = semilla >>> 0 || 1;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}
function mezclar(lista, r) {
  const l = lista.slice();
  for (let i = l.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [l[i], l[j]] = [l[j], l[i]];
  }
  return l;
}
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ── Piezas en el plano ──
// pieza: { clave, comp, s (escala), x, y }  →  rectángulo y pines en el mundo
function rect(p) {
  if (!p.rot) return { x: p.x, y: p.y, w: p.comp.w * p.s, h: p.comp.h * p.s };
  // Girada (las que vienen del simulador): caja de las 4 esquinas.
  const esq = [[0, 0], [p.comp.w, 0], [0, p.comp.h], [p.comp.w, p.comp.h]].map(([x, y]) => posSim(p, x, y));
  const xs = esq.map((e) => e.x), ys = esq.map((e) => e.y);
  return { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
}

// Posición en el plano de un punto (x, y) de la pieza, igual que
// Component.getPinPosition() del simulador (espejo, escala y giro).
function posSim(p, x, y) {
  const lx = (p.flip ? p.comp.w - x : x) * p.s, ly = y * p.s;
  const a = ((p.rot || 0) * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
  return { x: p.x + lx * c - ly * s, y: p.y + lx * s + ly * c };
}

function pin(p, id) {
  const q = p.comp.pines.find((k) => k.id === id);
  if (!q) throw new Error(`La pieza ${p.clave} (${p.comp.tipo}) no tiene el pin "${id}"`);
  const W = p.comp.w, H = p.comp.h;
  const dist = [W - q.x, H - q.y, q.x, q.y]; // a cada orilla, en el orden de DIRS
  // Pines en fila (mismo y) salen hacia arriba o abajo; en columna, hacia los lados.
  const enFila = p.comp.pines.some((k) => k !== q && Math.abs(k.y - q.y) < 3);
  const enColumna = p.comp.pines.some((k) => k !== q && Math.abs(k.x - q.x) < 3);
  let d;
  if (p.forzarDir && p.forzarDir[id] != null) d = p.forzarDir[id];
  else if (enFila && !enColumna) d = dist[1] < dist[3] ? 1 : 3;
  else if (enColumna && !enFila) d = dist[0] < dist[2] ? 0 : 2;
  else d = dist.indexOf(Math.min(...dist));
  return { x: p.x + q.x * p.s, y: p.y + q.y * p.s, dir: d, aOrilla: dist[d] * p.s, q };
}

// Punto donde el cable deja la pieza (fuera de su holgura) + el tramo fijo
// desde el pin hasta ahí.
function escape(p, id, G) {
  const P = pin(p, id);
  if (p.esPlaca && PINES_INTERIORES[id] != null) {
    const xs = p.x + PINES_INTERIORES[id];
    const ex = G.snapX(xs), ey = G.snapY(p.y + p.comp.h * p.s + SALIDA_PIN + 1);
    return { ...P, dir: 1, ex, ey, tramo: [[P.x, P.y], [P.x, p.y + 186], [xs, p.y + 186], [ex, ey]] };
  }
  const [dx, dy] = DIRS[P.dir];
  const largo = P.aOrilla + SALIDA_PIN;
  let ex = P.x + dx * largo, ey = P.y + dy * largo;
  ex = dx ? (dx > 0 ? G.snapUpX(ex) : G.snapDownX(ex)) : G.snapX(ex);
  ey = dy ? (dy > 0 ? G.snapUpY(ey) : G.snapDownY(ey)) : G.snapY(ey);
  return { ...P, ex, ey, tramo: [[P.x, P.y], [dx ? ex : P.x, dy ? ey : P.y], [ex, ey]] };
}

// ── Rejilla y A* ──
function crearRejilla(x0, y0, x1, y1) {
  const X0 = BX + 80.28 - Math.ceil((BX + 80.28 - x0) / PASO) * PASO;
  const Y0 = BY + 10 - Math.ceil((BY + 10 - y0) / PASO) * PASO;
  const GW = Math.ceil((x1 - X0) / PASO) + 1, GH = Math.ceil((y1 - Y0) / PASO) + 1;
  const G = {
    X0, Y0, GW, GH, N: GW * GH,
    snapX: (v) => X0 + Math.round((v - X0) / PASO) * PASO,
    snapY: (v) => Y0 + Math.round((v - Y0) / PASO) * PASO,
    snapUpX: (v) => X0 + Math.ceil((v - X0) / PASO - 1e-6) * PASO,
    snapDownX: (v) => X0 + Math.floor((v - X0) / PASO + 1e-6) * PASO,
    snapUpY: (v) => Y0 + Math.ceil((v - Y0) / PASO - 1e-6) * PASO,
    snapDownY: (v) => Y0 + Math.floor((v - Y0) / PASO + 1e-6) * PASO,
    celda: (x, y) => Math.round((y - Y0) / PASO) * GW + Math.round((x - X0) / PASO),
    xy: (c) => [X0 + (c % GW) * PASO, Y0 + Math.floor(c / GW) * PASO],
    obst: new Uint8Array(GW * GH),
    mask: new Uint32Array(GW * GH),
    g: new Float64Array(GW * GH * 4),
    sello: new Uint32Array(GW * GH * 4),
    padre: new Int32Array(GW * GH * 4),
    vuelta: 0,
  };
  return G;
}

function marcarObstaculo(G, r) {
  const x0 = Math.floor((r.x - HOLGURA_OBST - G.X0) / PASO), x1 = Math.ceil((r.x + r.w + HOLGURA_OBST - G.X0) / PASO);
  const y0 = Math.floor((r.y - HOLGURA_OBST - G.Y0) / PASO), y1 = Math.ceil((r.y + r.h + HOLGURA_OBST - G.Y0) / PASO);
  for (let y = Math.max(0, y0); y <= Math.min(G.GH - 1, y1); y++)
    for (let x = Math.max(0, x0); x <= Math.min(G.GW - 1, x1); x++) G.obst[y * G.GW + x] = 1;
}

function reservar(G, celdas, bit, r = R_CABLE) {
  for (const c of celdas) {
    const cx = c % G.GW, cy = Math.floor(c / G.GW);
    for (let dy = -r; dy <= r; dy++) {
      const y = cy + dy;
      if (y < 0 || y >= G.GH) continue;
      for (let dx = -r; dx <= r; dx++) {
        const x = cx + dx;
        if (x >= 0 && x < G.GW) G.mask[y * G.GW + x] |= bit;
      }
    }
  }
}

// Montículo binario de estados por costo.
class Monticulo {
  constructor() { this.e = []; this.p = []; }
  get size() { return this.e.length; }
  push(e, p) {
    const a = this.e, b = this.p;
    a.push(e); b.push(p);
    let i = a.length - 1;
    while (i > 0) {
      const j = (i - 1) >> 1;
      if (b[j] <= b[i]) break;
      [a[i], a[j]] = [a[j], a[i]]; [b[i], b[j]] = [b[j], b[i]]; i = j;
    }
  }
  pop() {
    const a = this.e, b = this.p, top = a[0];
    const le = a.pop(), lp = b.pop();
    if (a.length) {
      a[0] = le; b[0] = lp;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1, r = l + 1;
        let m = i;
        if (l < a.length && b[l] < b[m]) m = l;
        if (r < a.length && b[r] < b[m]) m = r;
        if (m === i) break;
        [a[i], a[m]] = [a[m], a[i]]; [b[i], b[m]] = [b[m], b[i]]; i = m;
      }
    }
    return top;
  }
}

// Camino de celdas de "a" (saliendo en dirección da) a "b" (entrando en dirección db).
function aEstrella(G, a, da, b, db, bit, cruce = false) {
  G.vuelta++;
  const sello = G.vuelta, GW = G.GW;
  const bx = b % GW, by = Math.floor(b / GW);
  const libre = (c) => !G.obst[c] && !(G.mask[c] & ~bit);
  // Con "cruce", se puede atravesar otro cable (en línea recta y caro), solo
  // cuando no hay otro camino: el orden de los pines lo hace inevitable.
  const ajeno = (c) => (G.mask[c] & ~bit) !== 0;
  if (!libre(a) || !libre(b)) return null;
  const h = new Monticulo();
  const s0 = a * 4 + da;
  G.g[s0] = 0; G.sello[s0] = sello; G.padre[s0] = -1;
  h.push(s0, 0);
  let fin = -1, finCosto = Infinity, expandidos = 0;
  while (h.size && expandidos < 300000) {
    const s = h.pop();
    const c = s >> 2, d = s & 3, gs = G.g[s];
    if (gs + Math.abs((c % GW) - bx) + Math.abs(Math.floor(c / GW) - by) >= finCosto) break;
    expandidos++;
    if (c === b) {
      const total = gs + (d === db ? 0 : VUELTA);
      if (total < finCosto) { finCosto = total; fin = s; }
      continue;
    }
    const cx = c % GW, cy = Math.floor(c / GW);
    const dentroAjeno = cruce && ajeno(c);
    for (let nd = 0; nd < 4; nd++) {
      if (nd === ((d + 2) & 3)) continue;
      if (dentroAjeno && nd !== d) continue;
      const nx = cx + DIRS[nd][0], ny = cy + DIRS[nd][1];
      if (nx < 0 || ny < 0 || nx >= GW || ny >= G.GH) continue;
      const nc = ny * GW + nx;
      let extra = 0;
      if (!libre(nc)) {
        if (!cruce || G.obst[nc]) continue;
        extra = 4;
      }
      const ns = nc * 4 + nd, ng = gs + 1 + extra + (nd === d ? 0 : VUELTA);
      if (G.sello[ns] === sello && G.g[ns] <= ng) continue;
      G.sello[ns] = sello; G.g[ns] = ng; G.padre[ns] = s;
      h.push(ns, ng + Math.abs(nx - bx) + Math.abs(ny - by));
    }
  }
  if (fin < 0) return null;
  const celdas = [];
  for (let s = fin; s >= 0; s = G.padre[s]) celdas.push(s >> 2);
  celdas.reverse();
  return { celdas, costo: finCosto };
}

// Solo las esquinas de un camino de celdas.
function esquinas(G, celdas) {
  const pts = celdas.map((c) => G.xy(c));
  const out = [pts[0]];
  for (let i = 1; i < pts.length - 1; i++) {
    const [ax, ay] = out[out.length - 1], [bx, by] = pts[i], [cx, cy] = pts[i + 1];
    if ((ax === bx && bx === cx) || (ay === by && by === cy)) continue;
    out.push(pts[i]);
  }
  if (pts.length > 1) out.push(pts[pts.length - 1]);
  return out;
}

// ── Diagrama ──
function prepararPiezas(def) {
  const piezas = [];
  const nPlacas = def.placas || 1;
  for (let i = 0; i < nPlacas; i++) {
    const base = componente("esp32_wroom");
    // + el conector USB (lado izquierdo) para el cable a la computadora.
    const comp = { ...base, pines: base.pines.concat([{ id: "usb", nombre: "USB", x: 0, y: 65 }]), dibujo: base.dibujo };
    piezas.push({ clave: i ? "esp" + (i + 1) : "esp", comp, s: 1, x: BX + i * 340, y: BY, esPlaca: true, fija: true });
  }
  for (const m of def.modulos || []) {
    const comp = componente(m.tipo);
    // Escala para que los pines queden al menos a 10 u (2.54 mm) como en la placa.
    // (el paso se mide entre pines de una misma fila o columna)
    let paso = Infinity;
    for (const p of comp.pines) for (const q of comp.pines) {
      if (p === q) continue;
      if (Math.abs(p.y - q.y) < 3 && Math.abs(p.x - q.x) > 0.5) paso = Math.min(paso, Math.abs(p.x - q.x));
      if (Math.abs(p.x - q.x) < 3 && Math.abs(p.y - q.y) > 0.5) paso = Math.min(paso, Math.abs(p.y - q.y));
    }
    const s = m.escala || (paso < 10 ? 10 / paso : 1);
    piezas.push({ clave: m.id, comp, s, x: 0, y: 0, lado: m.lado, cerca: m.cerca, forzarDir: m.dir, colocar: m.pos });
  }
  return piezas;
}

// "IO21" → pin de la placa; "m.vcc" → pin de un módulo; "GND"/"5V"/"3V3" → grupo.
function extremo(txt) {
  if (GRUPOS[txt]) return { grupo: txt, clave: "esp" };
  const m = txt.match(/^(\w+)\.(.+)$/);
  if (m && !/^IO\d+$/i.test(txt)) return { clave: m[1], id: m[2] };
  const t = txt.toUpperCase();
  const id = t === "TX0" ? "tx0" : t === "RX0" ? "rx0" : t.replace(/^IO/, "io");
  return { clave: "esp", id };
}

function nombrePinPlaca(id) {
  if (/^gnd/.test(id)) return "GND";
  if (/^5v/.test(id)) return "5V";
  if (id === "3v3") return "3V3";
  if (id === "tx0") return "TX0";
  if (id === "rx0") return "RX0";
  return id.toUpperCase().replace(/^IO/, "IO");
}

function colorDe(con, i) {
  if (con.op.color) return con.op.color;
  const ids = [con.A, con.B].map((e) => (e.grupo || e.id || "").toLowerCase());
  const nombres = [con.A, con.B].map((e) => (e.nombre || "").toLowerCase());
  const todo = ids.concat(nombres).join(" ");
  if (/gnd|^g$|−|vss|catodo|cátodo/.test(todo) && !/sda|scl/.test(todo)) return COLOR_GND;
  if (/5v/.test(ids.join(" "))) return COLOR_5V;
  if (/3v3/.test(ids.join(" "))) return COLOR_3V3;
  if (/sda|mosi|din/.test(todo)) return "#1c7ed6";
  if (/scl|sck|clk/.test(todo)) return "#fab005";
  return null; // se asigna de la paleta
}

function resolverConexiones(def, piezas) {
  const porClave = Object.fromEntries(piezas.map((p) => [p.clave, p]));
  let k = 0;
  const cons = (def.conexiones || []).map(([a, b, op = {}], i) => {
    const A = extremo(a), B = extremo(b);
    for (const E of [A, B]) {
      if (!porClave[E.clave]) throw new Error(`${def.archivo}: no existe la pieza "${E.clave}" (${a} → ${b})`);
      if (E.id) E.nombre = (porClave[E.clave].comp.pines.find((q) => q.id === E.id) || {}).nombre || E.id;
    }
    return { i, A, B, op };
  });
  const usados = new Set();
  for (const c of cons) {
    c.color = colorDe(c, c.i);
    if (!c.color) {
      while (usados.has(COLORES[k % COLORES.length]) && k < 40) k++;
      c.color = COLORES[k++ % COLORES.length];
    }
    if (c.color !== COLOR_GND && c.color !== COLOR_5V && c.color !== COLOR_3V3) usados.add(c.color);
  }
  return cons;
}

// Traza todos los cables de las piezas ya colocadas en el orden dado.
function trazar(G, piezas, cons, orden, r, permitirCruce = true) {
  G.obst.fill(0); G.mask.fill(0);
  const porClave = Object.fromEntries(piezas.map((p) => [p.clave, p]));
  for (const p of piezas) if (p.puesta !== false) marcarObstaculo(G, rect(p));
  const validas = cons.filter((c) => porClave[c.A.clave].puesta !== false && porClave[c.B.clave].puesta !== false);
  // Elegir qué GND / 5V usa cada cable (el más cercano libre).
  const ocupados = new Set();
  for (const c of validas) for (const E of [c.A, c.B]) if (E.id) ocupados.add(E.clave + "." + E.id);
  const asign = new Map();
  const esc_ = (E, c) => {
    const id = E.id || asign.get(c)[E === c.A ? 0 : 1];
    return escape(porClave[E.clave], id, G);
  };
  for (const c of orden.filter((c) => validas.includes(c))) {
    const ids = [c.A.id, c.B.id];
    for (const [n, E, O] of [[0, c.A, c.B], [1, c.B, c.A]]) {
      if (!E.grupo) continue;
      const otro = O.id ? escape(porClave[O.clave], O.id, G) : null;
      let cand = GRUPOS[E.grupo].filter((id) => !ocupados.has(E.clave + "." + id));
      if (!cand.length) return null;
      if (otro) cand.sort((x, y) => {
        const ex = escape(porClave[E.clave], x, G), ey = escape(porClave[E.clave], y, G);
        return Math.abs(ex.ex - otro.ex) + Math.abs(ex.ey - otro.ey) - Math.abs(ey.ex - otro.ex) - Math.abs(ey.ey - otro.ey);
      });
      const id = cand.length > 1 && r() < 0.25 ? cand[1] : cand[0];
      ocupados.add(E.clave + "." + id);
      ids[n] = id;
    }
    asign.set(c, ids);
  }
  // Reservar las salidas de todos los pines antes de trazar. Los cables de
  // una misma señal (p. ej. dos GND al mismo borne) comparten "bit" y se
  // pueden juntar; los demás guardan distancia.
  const padreR = {};
  const raiz = (k) => (padreR[k] == null || padreR[k] === k ? (padreR[k] = k) : (padreR[k] = raiz(padreR[k])));
  const claveDe = (E, id) => E.clave + "." + id;
  for (const c of validas) {
    const [ia, ib] = asign.get(c);
    padreR[raiz(claveDe(c.A, ia))] = raiz(claveDe(c.B, ib));
  }
  const redes = new Map(), bits = new Map();
  for (const c of validas) {
    const r0 = raiz(claveDe(c.A, asign.get(c)[0]));
    if (!redes.has(r0)) redes.set(r0, 1 << (redes.size % 31));
    bits.set(c, redes.get(r0));
  }
  const salidas = new Map();
  for (const c of validas) {
    const ea = esc_(c.A, c), eb = esc_(c.B, c);
    const ca = G.celda(ea.ex, ea.ey), cb = G.celda(eb.ex, eb.ey);
    if (ca < 0 || cb < 0 || ca >= G.N || cb >= G.N) return null;
    if (G.obst[ca] || G.obst[cb]) return null;
    if ((G.mask[ca] & ~bits.get(c)) || (G.mask[cb] & ~bits.get(c))) return null;
    salidas.set(c, [ea, eb, ca, cb]);
    reservar(G, [ca, cb], bits.get(c));
  }
  let costo = 0, fallas = 0;
  const cables = [];
  for (const c of orden.filter((c) => validas.includes(c))) {
    const [ea, eb, ca, cb] = salidas.get(c);
    // Un cable puede cruzar por encima de otro (en línea recta, con un
    // costo extra para preferir no hacerlo), pero nunca pasar sobre una pieza.
    const res = aEstrella(G, ca, ea.dir, cb, (eb.dir + 2) & 3, bits.get(c), permitirCruce);
    if (!res) {
      fallas++; costo += 5000;
      if (process.env.DEBUG) console.log("   falla", c.A.clave + "." + (c.A.id || c.A.grupo), "→", c.B.clave + "." + (c.B.id || c.B.grupo), "libres:", !G.obst[ca] && !(G.mask[ca] & ~bits.get(c)), !G.obst[cb] && !(G.mask[cb] & ~bits.get(c)));
      continue;
    }
    reservar(G, res.celdas, bits.get(c));
    costo += res.costo;
    const medio = esquinas(G, res.celdas);
    const puntos = ea.tramo.concat(medio.slice(1, -1), eb.tramo.slice().reverse());
    cables.push({ con: c, puntos: limpiarPuntos(puntos), pinA: asign.get(c)[0], pinB: asign.get(c)[1] });
  }
  return { cables, costo, fallas };
}

function limpiarPuntos(pts) {
  const out = [];
  for (const p of pts) {
    const q = out[out.length - 1];
    if (q && Math.abs(q[0] - p[0]) < 0.01 && Math.abs(q[1] - p[1]) < 0.01) continue;
    out.push(p);
  }
  // quitar puntos intermedios en línea recta
  for (let i = out.length - 2; i > 0; i--) {
    const [a, b, c] = [out[i - 1], out[i], out[i + 1]];
    if ((Math.abs(a[0] - b[0]) < 0.01 && Math.abs(b[0] - c[0]) < 0.01) || (Math.abs(a[1] - b[1]) < 0.01 && Math.abs(b[1] - c[1]) < 0.01)) out.splice(i, 1);
  }
  return out;
}

function mejorTrazo(G, piezas, cons, intentos, semilla) {
  const r = rng(semilla);
  const largo = (c) => {
    try {
      const pa = piezas.find((p) => p.clave === c.A.clave), pb = piezas.find((p) => p.clave === c.B.clave);
      const a = pin(pa, c.A.id || GRUPOS[c.A.grupo][0]), b = pin(pb, c.B.id || GRUPOS[c.B.grupo][0]);
      return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    } catch (_) { return 0; }
  };
  const ordenes = [cons.slice().sort((a, b) => largo(a) - largo(b)), cons.slice().sort((a, b) => largo(b) - largo(a)), cons.slice()];
  while (ordenes.length < intentos) ordenes.push(mezclar(cons, r));
  let mejor = null;
  for (const o of ordenes) {
    const t = trazar(G, piezas, cons, o, r);
    if (t && (!mejor || t.costo < mejor.costo)) mejor = t;
    if (mejor && mejor.fallas === 0 && ordenes.indexOf(o) >= 2 && intentos <= 4) break;
  }
  return mejor;
}

function seEncima(a, b, margen) {
  return a.x < b.x + b.w + margen && b.x < a.x + a.w + margen && a.y < b.y + b.h + margen && b.y < a.y + a.h + margen;
}

// Coloca los módulos uno por uno probando lugares alrededor de lo ya puesto.
function colocar(def, piezas, cons, G) {
  const placa = rect(piezas[0]);
  const LIM = { x0: G.X0 + 20, y0: G.Y0 + 20, x1: G.X0 + G.GW * PASO - 20, y1: G.Y0 + G.GH * PASO - 20 };
  const modulos = piezas.filter((p) => !p.fija);
  modulos.forEach((m) => (m.puesta = false));
  for (const m of modulos) {
    const R = rect({ ...m, x: 0, y: 0 });
    if (m.colocar) {
      m.x = BX + m.colocar[0]; m.y = BY + m.colocar[1]; m.puesta = true;
      continue;
    }
    const puestas = piezas.filter((p) => p.puesta !== false && p !== m);
    const misCons = cons.filter((c) => c.A.clave === m.clave || c.B.clave === m.clave);
    const candidatos = [];
    for (let y = LIM.y0; y + R.h <= LIM.y1; y += 10) {
      for (let x = LIM.x0; x + R.w <= LIM.x1; x += 10) {
        const r = { x, y, w: R.w, h: R.h };
        // Espacio libre alrededor para que pasen los cables (más cables, más espacio).
        if (puestas.some((p) => seEncima(r, rect(p), p.esPlaca ? Math.max(40, 16 + 7 * misCons.length) : 34))) continue;
        if (m.lado === "arriba" && y + R.h > placa.y - 30) continue;
        if (m.lado === "abajo" && y < placa.y + placa.h + 30) continue;
        if (m.lado === "izquierda" && x + R.w > placa.x - 30) continue;
        if (m.lado === "derecha" && x < placa.x + placa.w + 30) continue;
        const prueba = { ...m, x, y };
        let h = 0;
        for (const c of misCons) {
          const [Y, O] = c.A.clave === m.clave ? [c.A, c.B] : [c.B, c.A];
          const po = piezas.find((p) => p.clave === O.clave);
          if (po.puesta === false) continue;
          const a = pin(prueba, Y.id);
          const ids = O.id ? [O.id] : GRUPOS[O.grupo];
          let mejor = Infinity;
          for (const id of ids) {
            const b = pin(po, id);
            let d = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
            const [dx, dy] = DIRS[a.dir];
            if (dx * (b.x - a.x) + dy * (b.y - a.y) < 0) d += 120;
            const [ex, ey] = DIRS[b.dir];
            if (ex * (a.x - b.x) + ey * (a.y - b.y) < 0) d += 120;
            mejor = Math.min(mejor, d);
          }
          h += mejor;
        }
        const cx = x + R.w / 2 - (placa.x + placa.w / 2), cy = y + R.h / 2 - (placa.y + placa.h / 2);
        h += 0.15 * (Math.abs(cx) + Math.abs(cy));
        candidatos.push({ x, y, h });
      }
    }
    candidatos.sort((a, b) => a.h - b.h);
    const elegir = [];
    for (const c of candidatos) {
      if (elegir.some((e) => Math.abs(e.x - c.x) + Math.abs(e.y - c.y) < 30)) continue;
      elegir.push(c);
      if (elegir.length >= 10) break;
    }
    if (!elegir.length) throw new Error(`${def.archivo}: no hay lugar para ${m.clave}`);
    let mejor = null;
    for (const c of elegir) {
      m.x = c.x; m.y = c.y; m.puesta = true;
      const t = mejorTrazo(G, piezas, cons, 4, 7);
      const costo = t ? t.costo + c.h * 0.5 : Infinity;
      if (!mejor || costo < mejor.costo) mejor = { costo, x: c.x, y: c.y };
    }
    m.x = mejor.x; m.y = mejor.y; m.puesta = true;
  }
}

// ── Dibujo final ──
function caminoRedondeado(pts, radio = 3) {
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i - 1], [bx, by] = pts[i], [cx, cy] = pts[i + 1];
    const l1 = Math.hypot(bx - ax, by - ay), l2 = Math.hypot(cx - bx, cy - by);
    const r = Math.min(radio, l1 / 2, l2 / 2);
    const p1 = [bx - ((bx - ax) / l1) * r, by - ((by - ay) / l1) * r];
    const p2 = [bx + ((cx - bx) / l2) * r, by + ((cy - by) / l2) * r];
    d += ` L${f(p1[0])} ${f(p1[1])} Q${f(bx)} ${f(by)} ${f(p2[0])} ${f(p2[1])}`;
  }
  const u = pts[pts.length - 1];
  return d + ` L${f(u[0])} ${f(u[1])}`;
}
function f(n) { return +n.toFixed(2); }

const BANDAS = { "220 Ω": ["#e03131", "#e03131", "#8b4513"], "1 kΩ": ["#8b4513", "#111", "#e03131"], "10 kΩ": ["#8b4513", "#111", "#f08c00"] };
function resistencia(cable, valor, conTexto = true) {
  // En el tramo recto más largo del cable.
  let mejor = null;
  for (let i = 1; i < cable.puntos.length; i++) {
    const [a, b] = [cable.puntos[i - 1], cable.puntos[i]];
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (!mejor || l > mejor.l) mejor = { a, b, l };
  }
  const cx = (mejor.a[0] + mejor.b[0]) / 2, cy = (mejor.a[1] + mejor.b[1]) / 2;
  const ang = (Math.atan2(mejor.b[1] - mejor.a[1], mejor.b[0] - mejor.a[0]) * 180) / Math.PI;
  const bandas = BANDAS[valor] || BANDAS["220 Ω"];
  let s = `<g transform="translate(${f(cx)},${f(cy)}) rotate(${f(ang)})">`;
  s += `<rect x="-10" y="-3.4" width="20" height="6.8" rx="3" fill="#e9d8a6" stroke="#8a6d3b" stroke-width="0.6"/>`;
  bandas.forEach((c, i) => (s += `<rect x="${-6 + i * 3.4}" y="-3.4" width="1.8" height="6.8" fill="${c}"/>`));
  s += `<rect x="5" y="-3.4" width="1.8" height="6.8" fill="#c9a227"/>`;
  if (!conTexto) return s + "</g>";
  const vertical = Math.abs(Math.abs(ang) - 90) < 1;
  s += `<text x="0" y="${vertical ? -6 : -6}" text-anchor="middle" font-size="5.5" font-weight="700" fill="#495057"${vertical ? ` transform="rotate(${-ang}) translate(${ang > 0 ? 14 : -14},6)"` : ""}>${esc(valor)}</text>`;
  return s + "</g>";
}

function dibujar(def, piezas, trazo, cons) {
  const W = 1200, H = 800;
  // Caja de todo lo dibujado.
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const caja = (x, y) => { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); };
  for (const p of piezas) { const r = rect(p); caja(r.x, r.y); caja(r.x + r.w, r.y + r.h); }
  for (const c of trazo.cables) for (const [x, y] of c.puntos) caja(x, y);
  x0 -= 14; y0 -= 14; x1 += 14; y1 += 14;
  const AX = 24, AY = 96, AW = 760, AH = 680;
  const S = Math.min(AW / (x1 - x0), AH / (y1 - y0), 2.7);
  const ox = AX + (AW - (x1 - x0) * S) / 2 - x0 * S, oy = AY + (AH - (y1 - y0) * S) / 2 - y0 * S;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Segoe UI, Roboto, Arial, sans-serif">`;
  svg += `<rect width="${W}" height="${H}" fill="#ffffff"/>`;
  // Encabezado
  svg += `<rect width="${W}" height="78" fill="#1e2a5a"/>`;
  svg += `<text x="28" y="40" font-size="28" font-weight="700" fill="#ffffff">${esc(def.titulo)}</text>`;
  svg += `<text x="28" y="64" font-size="15" fill="#aab8ff">Conexiones eléctricas · ESP32 WeMos D1 R32</text>`;
  // Logo 3DP!t (el mismo del reporte del simulador), sobre una placa blanca.
  svg += `<rect x="${W - 176}" y="14" width="150" height="50" rx="10" fill="#ffffff"/>`;
  svg += `<image x="${W - 166}" y="20" width="130" height="38" preserveAspectRatio="xMidYMid meet" href="${LOGO}" xlink:href="${LOGO}"/>`;
  svg += `<rect x="${AX - 8}" y="${AY - 8}" width="${AW + 16}" height="${AH + 16}" rx="12" fill="#f4f6fb" stroke="#dde3f0"/>`;

  svg += `<g transform="translate(${f(ox)},${f(oy)}) scale(${f(S)})">`;
  // Piezas
  for (const p of piezas) {
    // Mismo transform que Component.updateTransform() del simulador.
    const espejo = p.flip ? `translate(${f(p.comp.w * p.s)},0) scale(${f(-p.s)},${f(p.s)})` : `scale(${f(p.s)})`;
    svg += `<g transform="translate(${f(p.x)},${f(p.y)})${p.rot ? ` rotate(${p.rot})` : ""} ${espejo}">${p.comp.dibujo(p.clave + "_", p.props)}</g>`;
  }
  // Pines usados (resaltados)
  const usados = [];
  for (const c of trazo.cables) {
    usados.push([c.puntos[0], c.con.color], [c.puntos[c.puntos.length - 1], c.con.color]);
  }
  // Cables con el mismo trazo que el simulador (una línea de 2.3, esquinas redondeadas).
  for (const c of trazo.cables) {
    svg += `<path d="${caminoRedondeado(c.puntos)}" fill="none" stroke="${c.con.color}" stroke-width="2.3" stroke-linejoin="round" stroke-linecap="round"/>`;
  }
  for (const [[x, y], color] of usados) {
    svg += `<circle cx="${f(x)}" cy="${f(y)}" r="2.4" fill="${color}" stroke="#ffffff" stroke-width="0.8"/>`;
  }
  // (con muchas resistencias iguales el valor va solo en la tabla, para no encimar letreros)
  const nRes = trazo.cables.filter((c) => c.con.op.r).length;
  for (const c of trazo.cables) if (c.con.op.r) svg += resistencia(c, c.con.op.r, nRes <= 2);
  // Etiquetas de los pines usados de la placa (para no tener que leer la serigrafía).
  for (const c of trazo.cables) {
    for (const [E, id, pt] of [[c.con.A, c.pinA, c.puntos[0]], [c.con.B, c.pinB, c.puntos[c.puntos.length - 1]]]) {
      const p = piezas.find((q) => q.clave === E.clave);
      if (!p.esPlaca) continue;
      if (id === "usb") continue;
      const nombre = nombrePinPlaca(id);
      const arriba = pt[1] < p.y + 100;
      const ty = arriba ? p.y + 21 : p.y + p.comp.h - 21;
      svg += `<g transform="translate(${f(pt[0])},${f(ty)}) rotate(-90)"><rect x="${-nombre.length * 2.1 - 2}" y="-3.6" width="${nombre.length * 4.2 + 4}" height="7.2" rx="1.6" fill="${c.con.color}"/>` +
        `<text x="0" y="2.1" text-anchor="middle" font-size="5.6" font-weight="700" fill="${c.con.color === "#fab005" ? "#212529" : "#ffffff"}">${nombre}</text></g>`;
    }
  }
  // Notas en el dibujo (p. ej. "Emisor" / "Receptor")
  for (const n of def.etiquetas || []) {
    svg += `<text x="${BX + n[0]}" y="${BY + n[1]}" font-size="${n[3] || 8}" font-weight="700" fill="#1e2a5a" text-anchor="middle">${esc(n[2])}</text>`;
  }
  // Marcas junto a un módulo (p. ej. la polaridad del LED): [x, y, texto, tamaño, color]
  for (const m of def.modulos || []) {
    const p = piezas.find((q) => q.clave === m.id);
    for (const [mx, my, t, tam = 6, color = "#1e2a5a"] of m.marcas || []) {
      const x = p.x + mx * p.s, y = p.y + my * p.s;
      svg += `<circle cx="${f(x)}" cy="${f(y - tam * 0.35)}" r="${f(tam * 0.62)}" fill="#ffffff" stroke="${color}" stroke-width="0.8"/>`;
      svg += `<text x="${f(x)}" y="${f(y)}" font-size="${tam}" font-weight="700" fill="${color}" text-anchor="middle">${esc(t)}</text>`;
    }
  }
  svg += `</g>`;

  // Panel derecho: conexiones, material, nota
  const PX = 812, PW = W - PX - 24;
  let y = 104;
  svg += `<text x="${PX}" y="${y}" font-size="18" font-weight="700" fill="#1e2a5a">Conexiones</text>`;
  y += 10;
  const filas = trazo.cables.slice().sort((a, b) => a.con.i - b.con.i).filter((c) => !c.con.op.ocultar);
  if (!filas.length) {
    y += 26;
    for (const l of partir(def.sinCables || "No necesitas cables.", 40)) { svg += `<text x="${PX}" y="${y}" font-size="14" fill="#343a40">${esc(l)}</text>`; y += 20; }
  }
  const alto = filas.length > 12 ? 22 : 26;
  for (const c of filas) {
    y += alto;
    const ladoA = etiquetaExtremo(c.con.A, c.pinA, piezas, def), ladoB = etiquetaExtremo(c.con.B, c.pinB, piezas, def);
    // Siempre "módulo → placa"
    const [izq, der] = c.con.A.clave === "esp" ? [ladoB, ladoA] : [ladoA, ladoB];
    svg += `<line x1="${PX}" y1="${y - 5}" x2="${PX + 26}" y2="${y - 5}" stroke="#1a1a1a" stroke-opacity="0.5" stroke-width="7" stroke-linecap="round"/>`;
    svg += `<line x1="${PX}" y1="${y - 5}" x2="${PX + 26}" y2="${y - 5}" stroke="${c.con.color}" stroke-width="5" stroke-linecap="round"/>`;
    svg += `<text x="${PX + 36}" y="${y}" font-size="${alto > 22 ? 14 : 12.5}" fill="#343a40">${esc(izq)}<tspan fill="#868e96"> → </tspan><tspan font-weight="700" fill="#1e2a5a">${esc(der)}</tspan>${c.con.op.r ? `<tspan fill="#8a6d3b"> (${esc(c.con.op.r)})</tspan>` : ""}</text>`;
  }
  y += 34;
  svg += `<text x="${PX}" y="${y}" font-size="18" font-weight="700" fill="#1e2a5a">Material</text>`;
  for (const m of material(def, piezas, trazo)) {
    y += 22;
    svg += `<text x="${PX + 4}" y="${y}" font-size="14" fill="#343a40">• ${esc(m)}</text>`;
  }
  if (def.nota) {
    y += 22;
    const lineas = partir(def.nota, 44);
    const h = lineas.length * 19 + 22;
    svg += `<rect x="${PX - 6}" y="${y}" width="${PW + 6}" height="${h}" rx="10" fill="#fff4d6" stroke="#f0c36d"/>`;
    lineas.forEach((l, i) => (svg += `<text x="${PX + 6}" y="${y + 24 + i * 19}" font-size="13.5" fill="#5c3d00">${i === 0 ? "⚠ " : ""}${esc(l)}</text>`));
  }
  return svg + `</svg>`;
}

function etiquetaExtremo(E, id, piezas, def) {
  const p = piezas.find((q) => q.clave === E.clave);
  if (p.esPlaca) return (piezas.filter((q) => q.esPlaca).length > 1 ? "ESP32 " : "") + nombrePinPlaca(id);
  const mod = (def.modulos || []).find((m) => m.id === E.clave);
  const corto = mod.etiqueta || p.comp.nombre;
  const pinNombre = (def.nombresPin && def.nombresPin[E.clave + "." + E.id]) || E.nombre;
  return `${corto} ${pinNombre}`;
}

// Bornes de tornillo o terminales sin pin (llevan cable con punta macho).
// (los teclados matriciales traen conector hembra, así que también van con macho)
const BORNES = { l298n: /^(out|power_)/, motor: /./, battery_18650: /./, bocina: /./, touch: /./, keypad4x4: /./, keypad3x4: /./ };
function puntaCable(p, id) {
  if (p.esPlaca) return "macho";
  const b = BORNES[p.comp.tipo];
  return b && b.test(id) ? "macho" : "hembra";
}

function material(def, piezas, trazo) {
  const out = [];
  const placas = piezas.filter((p) => p.esPlaca).length;
  out.push(`${placas} ESP32 WeMos D1 R32 + cable USB`);
  const cuenta = {};
  for (const m of def.modulos || []) {
    if (m.sinMaterial) continue;
    const nom = m.material || componente(m.tipo).nombre;
    cuenta[nom] = (cuenta[nom] || 0) + 1;
  }
  for (const [n, k] of Object.entries(cuenta)) out.push(`${k} ${n}`);
  const res = {};
  for (const c of trazo.cables) if (c.con.op.r) res[c.con.op.r] = (res[c.con.op.r] || 0) + 1;
  for (const [v, k] of Object.entries(res)) out.push(`${k} resistencia${k > 1 ? "s" : ""} de ${v}`);
  // Tipo de cable: la D1 R32 tiene conector hembra (lleva punta macho), los
  // módulos traen pines macho (llevan punta hembra) y los bornes de
  // tornillo, punta macho.
  // (en los diagramas del simulador manda el tipo que se eligió en cada cable)
  const tipos = {};
  let electrico = 0;
  for (const c of trazo.cables) {
    if (c.con.op.ocultar) continue;
    const pzs = [c.con.A, c.con.B].map((E) => piezas.find((q) => q.clave === E.clave));
    if (pzs.some((p) => p.comp.tipo === "clavija_127v" || p.comp.tipo === "bombillo")) { electrico++; continue; }
    let t;
    if (c.con.op.tipoCable) {
      t = c.con.op.tipoCable.split("-").sort().reverse().join("-");
      // la placa tiene conector hembra: esa punta siempre es macho
      if (t === "hembra-hembra" && pzs.some((p) => p.esPlaca)) t = "macho-hembra";
    } else {
      const puntas = [[c.con.A, c.pinA], [c.con.B, c.pinB]].map(([E, id], k) => puntaCable(pzs[k], id)).sort();
      t = puntas[0] === puntas[1] ? `${puntas[0]}-${puntas[1]}` : "macho-hembra";
    }
    tipos[t] = (tipos[t] || 0) + 1;
  }
  for (const [t, k] of Object.entries(tipos)) out.push(`${k} cable${k > 1 ? "s" : ""} dupont ${t}`);
  if (electrico) out.push(`${electrico} tramos de cable eléctrico (127 V)`);
  for (const m of def.material || []) out.push(m);
  return out;
}

function partir(texto, ancho) {
  const out = [];
  let linea = "";
  for (const p of texto.split(/\s+/)) {
    if ((linea + " " + p).trim().length > ancho) { out.push(linea); linea = p; } else linea = (linea + " " + p).trim();
  }
  if (linea) out.push(linea);
  return out;
}

// ── Diagramas armados en el simulador (scripts/Tutoriales/*.json) ──
// Se respetan tal cual las piezas, su lugar y giro, y el recorrido y color de
// cada cable; aquí solo se agrega lo de los diagramas (pines resaltados,
// tabla, material y nota).
const TUTORIALES_SIM = path.join(__dirname, "..", "Tutoriales");
// Nombre corto (tabla) y nombre en el material de cada tipo de pieza.
const NOMBRES_SIM = {
  led: ["LED", "LED"], resistencia: ["Resistencia", "Resistencia"], ky_004: ["KY-004", "Módulo botón KY-004"],
  buzzer: ["Buzzer", "Buzzer pasivo"], neopixel_ring: ["NeoPixel", "Anillo NeoPixel"], "28byj": ["ULN2003", "Motor 28BYJ-48 con driver ULN2003"],
  battery_18650: ["Batería", "Portapilas 2×18650 (7.4 V)"], switch: ["Interruptor", "Interruptor ON/OFF"], l298n: ["L298N", "Puente H L298N"],
  motor: ["Motor", "Motor DC con reductora"], "ky-019": ["Relevador", "Módulo relevador KY-019"], clavija_127v: ["Clavija", "Clavija para toma de 127 V"],
  bombillo: ["Foco", "Foco con socket"], semaforo: ["Semáforo", "Módulo semáforo"], tcrt5000: ["Sensor IR", "Sensor infrarrojo TCRT5000"], sg90: ["Servo", "Servo SG90"],
  "ky-005": ["KY-005", "Emisor infrarrojo KY-005"], dht11: ["DHT11", "Sensor DHT11 (KY-015)"], ky_001: ["KY-001", "Sensor KY-001 (DS18B20)"],
  adkey_real: ["ADKey", "Teclado analógico ADKey"], hcsr04: ["HC-SR04", "Sensor ultrasónico HC-SR04"], "ky-022": ["KY-022", "Receptor infrarrojo KY-022 + control"],
  oled: ["OLED", "Pantalla OLED 0.96\" I2C"], lcd_16x2_i2c: ["LCD", "LCD 16x2 con módulo I2C"], ds3231: ["DS3231", "Reloj RTC DS3231"],
  mpu6050: ["MPU6050", "Módulo MPU6050"], tm1637: ["TM1637", "Display TM1637"], max7219: ["MAX7219", "Matriz 8x8 MAX7219"],
  bh1750: ["BH1750", "Sensor de luz BH1750"], bmp280: ["BMP280", "Sensor de presión BMP280"], qmc5883l: ["QMC5883L", "Brújula QMC5883L"],
  tcs34725: ["TCS34725", "Sensor de color TCS34725"], "hc-06": ["HC-06", "Módulo Bluetooth HC-06"], gps: ["GPS", "Módulo GPS (NEO-6M)"],
  fingerprint: ["Huella", "Sensor de huella FPM383C"], dfplayer: ["DFPlayer", "DFPlayer Mini + microSD con MP3"], bocina: ["Bocina", "Bocina de 8 Ω"],
  ky040: ["KY-040", "Encoder rotatorio KY-040"], keypad3x4: ["Teclado", "Teclado matricial 4x3"], keypad4x4: ["Teclado", "Teclado matricial 4x4"],
  rc522_real: ["RC522", "Lector RFID MFRC522 + tarjeta"], sdcard: ["SD", "Módulo microSD + memoria"], yf201: ["YF-201", "Sensor de flujo YF-201"],
  touch: ["Aluminio", "Pedazo de papel aluminio"],
};

function desdeSimulador(def) {
  const proy = JSON.parse(fs.readFileSync(path.join(TUTORIALES_SIM, def.simulador), "utf8"));
  const placa = proy.components.find((c) => c.type === "esp32_wroom");
  // Piezas y cables extra sobre el archivo del simulador ("esp" = la placa).
  if (def.agregar) {
    proy.components.push(...(def.agregar.components || []).map((c) => ({ rotation: 0, scale: 1, flipX: false, properties: {}, name: c.type, ...c })));
    const id = (x) => (x === "esp" ? placa.id : x);
    proy.wires.push(...(def.agregar.wires || []).map((w) => ({ ...w, from: { ...w.from, componentId: id(w.from.componentId) }, to: { ...w.to, componentId: id(w.to.componentId) } })));
  }
  const piezas = proy.components.map((c) => {
    const esPlaca = c === placa;
    return { clave: esPlaca ? "esp" : c.id, comp: componente(c.type, c.properties || {}), s: c.scale || 1, x: c.x, y: c.y, rot: c.rotation || 0, flip: !!c.flipX, esPlaca, fija: true, props: c.properties || {} };
  });
  // Módulos con nombre corto; si hay dos iguales se numeran (Motor A, Motor B).
  const vistos = {};
  const modulos = proy.components.filter((c) => c !== placa).map((c) => {
    const [corto, mat] = c.type === "neopixel_matrix"
      ? ["Matriz", componente(c.type, c.properties || {}).nombre]
      : NOMBRES_SIM[c.type] || [c.name, c.name];
    const igual = proy.components.filter((o) => o.type === c.type).length;
    vistos[c.type] = (vistos[c.type] || 0) + 1;
    const ohm = c.type === "resistencia" && c.properties && c.properties.ohms;
    return {
      id: c.id, tipo: c.type,
      etiqueta: igual > 1 ? `${corto} ${String.fromCharCode(64 + vistos[c.type])}` : corto,
      material: ohm ? `${mat} de ${ohm >= 1000 ? ohm / 1000 + " kΩ" : ohm + " Ω"}` : mat,
      marcas: (def.marcas || {})[c.type],
    };
  });
  // nombresPin por tipo ("led.anodo") → por pieza
  const nombresPin = {};
  for (const m of modulos) for (const [k, v] of Object.entries(def.nombresPin || {})) if (k.startsWith(m.tipo + ".")) nombresPin[m.id + k.slice(m.tipo.length)] = v;
  const def2 = { ...def, modulos, nombresPin };
  const porId = Object.fromEntries(proy.components.map((c, i) => [c.id, piezas[i]]));
  const cables = proy.wires.map((w, i) => {
    const pa = porId[w.from.componentId], pb = porId[w.to.componentId];
    const fin = (p, id) => {
      const q = p.comp.pines.find((k) => k.id === id);
      if (!q) throw new Error(`${def.simulador}: ${p.comp.tipo} no tiene el pin "${id}"`);
      return { q, pos: posSim(p, q.x, q.y) };
    };
    const a = fin(pa, w.from.pinId), b = fin(pb, w.to.pinId);
    // Mismo trazo que Utils.buildOrthogonalPoints() del simulador.
    const ancla = [a.pos, ...(w.points || []).filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y)), b.pos];
    const puntos = [[ancla[0].x, ancla[0].y]];
    for (let k = 1; k < ancla.length; k++) {
      const [px, py] = puntos[puntos.length - 1], n = ancla[k];
      const dx = n.x - px, dy = n.y - py;
      if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) continue;
      if (Math.abs(dx) >= 0.01 && Math.abs(dy) >= 0.01) puntos.push(Math.abs(dx) >= Math.abs(dy) ? [n.x, py] : [px, n.y]);
      puntos.push([n.x, n.y]);
    }
    const E = (p, id, q) => ({ clave: p.clave, id, nombre: q.nombre });
    return {
      con: { i, A: E(pa, w.from.pinId, a.q), B: E(pb, w.to.pinId, b.q), color: w.color || "#f08c00", op: { tipoCable: w.connectorType } },
      puntos, pinA: w.from.pinId, pinB: w.to.pinId,
    };
  });
  return { def: def2, piezas, trazo: { cables, costo: 0, fallas: 0 } };
}

// ── Principal ──
function generar(def) {
  if (def.simulador) {
    const r = desdeSimulador(def);
    const svg = dibujar(r.def, r.piezas, r.trazo, []);
    fs.writeFileSync(path.join(SALIDA, def.archivo + ".svg"), svg);
    return { kb: Math.round(svg.length / 1024), cables: r.trazo.cables.length, fallas: 0 };
  }
  const piezas = prepararPiezas(def);
  const cons = resolverConexiones(def, piezas);
  const G = crearRejilla(BX - 340, BY - 330, BX + 276 + 340 + (def.placas > 1 ? 340 : 0), BY + 210 + 330);
  colocar(def, piezas, cons, G);
  if (process.env.POSICIONES) for (const p of piezas) if (!p.fija) console.log(`   ${p.clave}: pos: [${f(p.x - BX)}, ${f(p.y - BY)}]`);
  const trazo = mejorTrazo(G, piezas, cons, def.intentos || 40, 11) || { cables: [], costo: 0, fallas: 0 };
  if (trazo.fallas) console.warn(`⚠ ${def.archivo}: ${trazo.fallas} cable(s) sin trazar`);
  const svg = dibujar(def, piezas, trazo, cons);
  fs.writeFileSync(path.join(SALIDA, def.archivo + ".svg"), svg);
  return { kb: Math.round(svg.length / 1024), cables: trazo.cables.length, fallas: trazo.fallas };
}

if (require.main === module) {
  const solo = process.argv.slice(2);
  fs.mkdirSync(SALIDA, { recursive: true });
  for (const def of DIAGRAMAS) {
    if (solo.length && !solo.includes(def.archivo)) continue;
    const t = Date.now();
    try {
      const r = generar(def);
      console.log(`${def.archivo}.svg  ${r.kb} KB  ${r.cables} cables${r.fallas ? `  ⚠ ${r.fallas} sin trazar` : ""}  (${((Date.now() - t) / 1000).toFixed(1)} s)`);
    } catch (e) {
      console.error(`✗ ${def.archivo}: ${e.stack}`);
    }
  }
}

module.exports = { generar };
