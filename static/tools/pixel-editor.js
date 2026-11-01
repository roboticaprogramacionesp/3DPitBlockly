// Editor de píxeles compartido por las herramientas de pantallas (OLED,
// matriz MAX7219, NeoPixel): mismas herramientas en todas.
//
//   const ed = PixelEditor({
//     canvas, toolbar, coords,        // elementos de la página
//     mode: "mono" | "color",         // 0/1, o "#rrggbb" ("#000000" = apagado)
//     shape: "square" | "round",      // píxel de pantalla o LED
//     onColor: "#7fdbff",             // color de un píxel encendido (mono)
//     color: () => "#ff0000",         // color con el que se pinta (color)
//     onChange: () => {},             // después de cada cambio
//   });
//   ed.resize(w, h)  ed.values  ed.setValues(arr)  ed.w  ed.h
//
// El toolbar se arma solo dentro del elemento `toolbar`.
function PixelEditor(opts) {
  const color = opts.mode === "color";
  const OFF = color ? "#000000" : 0;
  const onValue = () => (color ? opts.color() : 1);
  const canvas = opts.canvas;
  const ctx = canvas.getContext("2d");
  const onChange = opts.onChange || (() => {});

  const ed = { w: 0, h: 0, values: [] };
  let S = 1;
  let tool = "pen";

  // ── Toolbar ──
  const TOOLS = [
    ["pen", "✏️ Lápiz"], ["eraser", "🧽 Borrador"], ["line", "／ Línea"],
    ["rect", "▭ Rectángulo"], ["fillrect", "■ Rect. relleno"],
    ["circle", "◯ Círculo"], ["fillcircle", "● Círculo relleno"], ["bucket", "🪣 Cubeta"],
  ];
  const ACTIONS = [
    ["undo", "↶ Deshacer", "Deshacer (Ctrl+Z)"], ["redo", "↷ Rehacer", "Rehacer (Ctrl+Y)"],
    ...(color ? [["fill", "Rellenar todo", ""]] : [["invert", "Invertir", ""]]),
    ["clear", "Limpiar", ""],
  ];
  const MOVES = [
    ["flipH", "⇋ Voltear", "Voltear horizontal"], ["flipV", "⇵ Voltear", "Voltear vertical"],
    ["up", "↑", "Mover arriba"], ["down", "↓", "Mover abajo"],
    ["left", "←", "Mover a la izquierda"], ["right", "→", "Mover a la derecha"],
  ];
  function row(items, cls) {
    const div = document.createElement("div");
    div.className = "row";
    div.style.marginTop = "8px";
    items.forEach(([id, label, title]) => {
      const b = document.createElement("button");
      b.textContent = label;
      if (title) b.title = title;
      b.dataset[cls] = id;
      div.appendChild(b);
    });
    return div;
  }
  if (opts.toolbar) {
    opts.toolbar.innerHTML = '<p class="section-title">Dibujar</p>';
    const tools = row(TOOLS, "tool");
    tools.style.marginTop = "0";
    opts.toolbar.append(tools, row(ACTIONS, "action"), row(MOVES, "action"));
    opts.toolbar.querySelectorAll("[data-tool]").forEach((b) => {
      b.classList.toggle("active", b.dataset.tool === tool);
      b.onclick = () => {
        tool = b.dataset.tool;
        opts.toolbar.querySelectorAll("[data-tool]").forEach((o) => o.classList.toggle("active", o === b));
      };
    });
    opts.toolbar.querySelectorAll("[data-action]").forEach((b) => {
      b.onclick = () => ed[b.dataset.action]();
    });
  }

  // ── Tamaño y dibujo ──
  ed.resize = function (w, h) {
    const old = ed.values, oldW = ed.w, oldH = ed.h;
    ed.w = w; ed.h = h;
    ed.values = new Array(w * h).fill(OFF);
    // Se conserva la esquina superior izquierda.
    for (let y = 0; y < Math.min(h, oldH); y++)
      for (let x = 0; x < Math.min(w, oldW); x++) ed.values[y * w + x] = old[y * oldW + x];
    S = Math.max(4, Math.min(48, Math.floor(Math.min((opts.maxWidth || 560) / w, (opts.maxHeight || 340) / h))));
    canvas.width = w * S;
    canvas.height = h * S;
    ed.render();
  };

  ed.setValues = function (arr) {
    ed.values = arr.slice(0, ed.w * ed.h);
    ed.render();
  };

  function pixelColor(v) {
    if (color) return v === OFF ? null : v;
    return v ? opts.onColor || "#7fdbff" : null;
  }

  ed.render = function (preview) {
    const src = preview || ed.values;
    const round = opts.shape === "round";
    ctx.fillStyle = round ? "#0b0d1c" : "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < ed.h; y++)
      for (let x = 0; x < ed.w; x++) {
        const c = pixelColor(src[y * ed.w + x]);
        if (round) {
          ctx.fillStyle = c || "#23264a";
          ctx.beginPath();
          ctx.arc(x * S + S / 2, y * S + S / 2, S * 0.42, 0, Math.PI * 2);
          ctx.fill();
        } else if (c) {
          ctx.fillStyle = c;
          ctx.fillRect(x * S, y * S, S, S);
        }
      }
    if (!round && S >= 6) {
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.beginPath();
      for (let x = 0; x <= ed.w; x++) { ctx.moveTo(x * S + 0.5, 0); ctx.lineTo(x * S + 0.5, ed.h * S); }
      for (let y = 0; y <= ed.h; y++) { ctx.moveTo(0, y * S + 0.5); ctx.lineTo(ed.w * S, y * S + 0.5); }
      ctx.stroke();
    }
  };

  // ── Figuras ──
  function plot(buf, x, y, v) {
    if (x >= 0 && x < ed.w && y >= 0 && y < ed.h) buf[y * ed.w + x] = v;
  }
  function line(buf, x0, y0, x1, y1, v) {
    const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    for (;;) {
      plot(buf, x0, y0, v);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) { err += dy; x0 += sx; }
      if (e2 <= dx) { err += dx; y0 += sy; }
    }
  }
  function rect(buf, x0, y0, x1, y1, v, filled) {
    const ax = Math.min(x0, x1), bx = Math.max(x0, x1), ay = Math.min(y0, y1), by = Math.max(y0, y1);
    for (let y = ay; y <= by; y++)
      for (let x = ax; x <= bx; x++)
        if (filled || y === ay || y === by || x === ax || x === bx) plot(buf, x, y, v);
  }
  // Círculo de punto medio, como el ellipse() de framebuf.
  function circle(buf, cx, cy, r, v, filled) {
    let x = r, y = 0, err = 1 - r;
    while (x >= y) {
      if (filled) {
        for (let i = cx - x; i <= cx + x; i++) { plot(buf, i, cy + y, v); plot(buf, i, cy - y, v); }
        for (let i = cx - y; i <= cx + y; i++) { plot(buf, i, cy + x, v); plot(buf, i, cy - x, v); }
      } else {
        [[x, y], [y, x], [-y, x], [-x, y], [-x, -y], [-y, -x], [y, -x], [x, -y]].forEach(([dx, dy]) =>
          plot(buf, cx + dx, cy + dy, v));
      }
      y++;
      if (err < 0) err += 2 * y + 1;
      else { x--; err += 2 * (y - x) + 1; }
    }
  }
  // Cubeta: pinta toda la zona conectada del mismo color (4 vecinos). En
  // blanco y negro, tocar una zona encendida la apaga.
  function bucket(x, y) {
    if (x < 0 || x >= ed.w || y < 0 || y >= ed.h) return;
    const from = ed.values[y * ed.w + x];
    const to = color ? onValue() : 1 - from;
    if (from === to) return;
    const stack = [[x, y]];
    while (stack.length) {
      const [px, py] = stack.pop();
      if (px < 0 || px >= ed.w || py < 0 || py >= ed.h || ed.values[py * ed.w + px] !== from) continue;
      ed.values[py * ed.w + px] = to;
      stack.push([px + 1, py], [px - 1, py], [px, py + 1], [px, py - 1]);
    }
  }
  function shape(buf, a, b) {
    const v = onValue();
    if (tool === "line") line(buf, a.x, a.y, b.x, b.y, v);
    else if (tool === "rect" || tool === "fillrect") rect(buf, a.x, a.y, b.x, b.y, v, tool === "fillrect");
    else if (tool === "circle" || tool === "fillcircle")
      circle(buf, a.x, a.y, Math.round(Math.hypot(b.x - a.x, b.y - a.y)), v, tool === "fillcircle");
  }

  // ── Deshacer / rehacer: una foto antes de cada cambio ──
  let past = [], future = [];
  ed.snapshot = function () {
    past.push({ w: ed.w, h: ed.h, values: ed.values.slice() });
    if (past.length > 60) past.shift();
    future = [];
  };
  function restore(from, to) {
    if (!from.length) return;
    to.push({ w: ed.w, h: ed.h, values: ed.values.slice() });
    const st = from.pop();
    if (st.w !== ed.w || st.h !== ed.h) ed.resize(st.w, st.h);
    ed.values = st.values;
    ed.render();
    onChange();
  }
  ed.undo = () => restore(past, future);
  ed.redo = () => restore(future, past);
  document.addEventListener("keydown", (e) => {
    if (!(e.ctrlKey || e.metaKey) || /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
    const k = e.key.toLowerCase();
    if (k === "z" && !e.shiftKey) { e.preventDefault(); ed.undo(); }
    else if (k === "y" || (k === "z" && e.shiftKey)) { e.preventDefault(); ed.redo(); }
  });

  // ── Acciones de los botones ──
  function change(fn) {
    ed.snapshot();
    fn();
    ed.render();
    onChange();
  }
  // Voltear y mover: el dibujo nuevo se arma leyendo cada píxel de origen.
  function remap(fn) {
    change(() => {
      const next = new Array(ed.w * ed.h).fill(OFF);
      for (let y = 0; y < ed.h; y++)
        for (let x = 0; x < ed.w; x++) {
          const [sx, sy] = fn(x, y);
          if (sx >= 0 && sx < ed.w && sy >= 0 && sy < ed.h) next[y * ed.w + x] = ed.values[sy * ed.w + sx];
        }
      ed.values = next;
    });
  }
  ed.clear = () => change(() => ed.values.fill(OFF));
  ed.fill = () => change(() => ed.values.fill(onValue()));
  ed.invert = () => change(() => { ed.values = ed.values.map((v) => 1 - v); });
  ed.flipH = () => remap((x, y) => [ed.w - 1 - x, y]);
  ed.flipV = () => remap((x, y) => [x, ed.h - 1 - y]);
  ed.up = () => remap((x, y) => [x, y + 1]);
  ed.down = () => remap((x, y) => [x, y - 1]);
  ed.left = () => remap((x, y) => [x + 1, y]);
  ed.right = () => remap((x, y) => [x - 1, y]);

  // ── Puntero (mouse, lápiz o dedo) ──
  let start = null, last = null;
  function pt(e) {
    const r = canvas.getBoundingClientRect();
    return {
      x: Math.floor(((e.clientX - r.left) / r.width) * ed.w),
      y: Math.floor(((e.clientY - r.top) / r.height) * ed.h),
    };
  }
  canvas.style.touchAction = "none";
  canvas.onpointerdown = (e) => {
    canvas.setPointerCapture(e.pointerId);
    ed.snapshot();
    const p = pt(e);
    if (tool === "bucket") {
      bucket(p.x, p.y);
      ed.render();
      onChange();
      return;
    }
    start = last = p;
    if (tool === "pen" || tool === "eraser") {
      plot(ed.values, p.x, p.y, tool === "pen" ? onValue() : OFF);
      ed.render();
    }
  };
  canvas.onpointermove = (e) => {
    const p = pt(e);
    if (opts.coords) opts.coords.textContent = `x: ${p.x} y: ${p.y}`;
    if (!start) return;
    if (tool === "pen" || tool === "eraser") {
      line(ed.values, last.x, last.y, p.x, p.y, tool === "pen" ? onValue() : OFF);
      last = p;
      ed.render();
    } else {
      const preview = ed.values.slice();
      shape(preview, start, p);
      ed.render(preview);
    }
  };
  canvas.onpointerup = (e) => {
    if (!start) return;
    shape(ed.values, start, pt(e));
    start = null;
    ed.render();
    onChange();
  };
  canvas.onpointerleave = () => {
    if (opts.coords) opts.coords.textContent = "x: – y: –";
  };

  return ed;
}
