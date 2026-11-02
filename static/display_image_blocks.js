/* ══════════════════════════════════════════════════════════════
   display_image_blocks.js — Bloques de dibujos para pantallas,
   pensados para usarse con las Herramientas (static/tools/):

   - neopixel_matrix_init: matriz NeoPixel de cualquier tamaño
     (NeoMatrix acepta cualquier ancho × alto).
   - neopixel_image: dibujo a colores de cualquier tamaño (RGB565).
   - oled_image: imagen en blanco y negro para OLED / SH1106 (MONO_HLSB).
   - matrix8_image: dibujo para la matriz MAX7219 de 1 a 4 módulos
     (MONO_HLSB, Max8x8.icon).
   - tft_image: imagen a colores para la TFT 240x240 (st7789.blit_buffer,
     RGB565 con el byte alto primero), con escala ×1 a ×4.
   - tm1637_segments: los 4 dígitos del TM1637 segmento por segmento
     (letras y símbolos que show() no tiene), con TM1637.write().
   - lcd_create_char / lcd_i2c_create_char + lcd_custom_char:
     caracteres propios 5×8 para las LCD.

   Los bloques de imagen guardan el dibujo en la mutación (ancho, alto y
   los bytes en hex) y muestran una miniatura: al tocarla se abre la
   herramienta con ese dibujo cargado (ToolsPanel.edit, tools-panel.js).
   Agregar este <script> DESPUÉS de conversion.js y micropython.js.
══════════════════════════════════════════════════════════════ */

// ── Miniatura del dibujo ──────────────────────────────────────
// format "mono": 1 bit por píxel, filas de ceil(w/8) bytes, bit alto =
// columna izquierda (framebuf.MONO_HLSB, lo que espera OLED.icon).
// format "rgb565": 2 bytes por píxel, little-endian (framebuf.RGB565 en
// el ESP32, lo que lee NeoMatrix.show).
// format "rgb565be": igual pero con el byte alto primero, como lo manda
// st7789.blit_buffer() a la pantalla tal cual.
function imageBytesLength(format, w, h) {
  return format === "mono" ? Math.ceil(w / 8) * h : w * h * 2;
}

function imageThumbUrl(format, w, h, hex, onColor) {
  const k = Math.max(1, Math.floor(96 / Math.max(w, h)));
  const canvas = document.createElement("canvas");
  canvas.width = w * k;
  canvas.height = h * k;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const byte = (i) => parseInt(hex.substr(i * 2, 2), 16) || 0;
  const rowBytes = Math.ceil(w / 8);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let color = null;
      if (format === "mono") {
        if (byte(y * rowBytes + (x >> 3)) & (0x80 >> (x & 7))) color = onColor || "#7fdbff";
      } else {
        const i = (y * w + x) * 2;
        const c = format === "rgb565be" ? (byte(i) << 8) | byte(i + 1) : byte(i) | (byte(i + 1) << 8);
        if (c) {
          const r = ((c >> 11) & 0x1f) * 255 / 31;
          const g = ((c >> 5) & 0x3f) * 255 / 63;
          const b = (c & 0x1f) * 255 / 31;
          color = `rgb(${r | 0},${g | 0},${b | 0})`;
        }
      }
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * k, y * k, k, k);
      }
    }
  }
  return canvas.toDataURL();
}

function makeImageBlockMixin(format, defaultW, defaultH, onColor) {
  return {
    imgW_: defaultW,
    imgH_: defaultH,
    imgData_: "",

    mutationToDom: function () {
      const m = Blockly.utils.xml.createElement("mutation");
      m.setAttribute("w", this.imgW_);
      m.setAttribute("h", this.imgH_);
      m.setAttribute("data", this.imgData_);
      return m;
    },

    domToMutation: function (xml) {
      this.setImage_(
        parseInt(xml.getAttribute("w"), 10),
        parseInt(xml.getAttribute("h"), 10),
        xml.getAttribute("data") || "",
      );
    },

    setImage_: function (w, h, hex) {
      this.imgW_ = Math.max(1, Math.min(128, w || defaultW));
      this.imgH_ = Math.max(1, Math.min(128, h || defaultH));
      const len = imageBytesLength(format, this.imgW_, this.imgH_) * 2;
      const clean = String(hex).toLowerCase().replace(/[^0-9a-f]/g, "");
      this.imgData_ = clean.slice(0, len).padEnd(len, "0");
      this.updateThumb_();
    },

    updateThumb_: function () {
      const scale = Math.min(96 / this.imgW_, 48 / this.imgH_);
      const block = this;
      const field = new Blockly.FieldImage(
        imageThumbUrl(format, this.imgW_, this.imgH_, this.imgData_, onColor),
        Math.max(8, Math.round(this.imgW_ * scale)),
        Math.max(8, Math.round(this.imgH_ * scale)),
        `dibujo ${this.imgW_}×${this.imgH_}`,
        function () {
          if (!block.isInFlyout && window.ToolsPanel) window.ToolsPanel.edit(block);
        },
      );
      if (this.getInput("PIC")) this.removeInput("PIC");
      this.appendDummyInput("PIC")
        .appendField(field, "THUMB")
        .appendField(`${this.imgW_}×${this.imgH_}`);
    },
  };
}

// ── Miniatura del TM1637: 4 dígitos de 7 segmentos + dos puntos ──
// Bit 0..6 = segmentos a..g; el bit 7 del 2.º dígito enciende los dos
// puntos (igual que TM1637.numbers() en tm1637.py).
const SEG7_SHAPES = [
  [4, 0, 12, 3], [16, 3, 3, 13], [16, 18, 3, 13], [4, 31, 12, 3],
  [1, 18, 3, 13], [1, 3, 3, 13], [4, 15.5, 12, 3],
];

function segmentsThumbUrl(bytes) {
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 112 42"><rect x="-4" y="-4" width="112" height="42" rx="4" fill="#111"/>';
  bytes.forEach((b, d) => {
    const ox = d * 24 + (d >= 2 ? 8 : 0);
    SEG7_SHAPES.forEach(([x, y, w, h], s) => {
      svg += `<rect x="${ox + x}" y="${y}" width="${w}" height="${h}" rx="1" fill="${b & (1 << s) ? "#ff3b30" : "#3a1512"}"/>`;
    });
  });
  const colon = bytes[1] & 0x80 ? "#ff3b30" : "#3a1512";
  svg += `<circle cx="50" cy="10" r="2" fill="${colon}"/><circle cx="50" cy="24" r="2" fill="${colon}"/></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

// ── Pines (mismas opciones que el resto de bloques NeoPixel) ──
const IMAGE_BLOCK_PINS = [
  "0", "1", "2", "3", "4", "5", "12", "13", "14", "15", "16", "17", "18",
  "19", "21", "22", "23", "25", "26", "27", "32", "33",
].map((p) => [p, p]);

Blockly.defineBlocksWithJsonArray([
  {
    type: "neopixel_matrix_init",
    message0: "%1 %2 iniciar matriz NeoPixel pin %3 ancho %4 alto %5 orden %6 rotación %7",
    args0: [
      { type: "field_input", name: "NAME", text: "matriz" },
      {
        type: "field_image",
        src: "./static/img/neopixel8x8.svg",
        width: 50,
        height: 50,
        alt: "NEOPIXEL",
      },
      {
        type: "field_dropdown",
        name: "PIN",
        options: makePinOptionsFn(IMAGE_BLOCK_PINS),
      },
      { type: "field_number", name: "W", value: 16, min: 1, max: 128, precision: 1 },
      { type: "field_number", name: "H", value: 16, min: 1, max: 128, precision: 1 },
      {
        type: "field_dropdown",
        name: "LAYOUT",
        options: [
          ["Horizontal →", "0"],
          ["Horizontal ZigZag ↔", "1"],
          ["Vertical ↓", "2"],
          ["Vertical ZigZag ↕", "3"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ROT",
        options: [
          ["0°", "0"],
          ["90°", "90"],
          ["180°", "180"],
          ["270°", "270"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
    tooltip:
      "Matriz NeoPixel de cualquier tamaño (4×4, 16×16, 8×32, 32×32...). " +
      "Si los LEDs van en zigzag, elige el orden ZigZag.",
  },
  {
    type: "neopixel_image",
    message0: "%1 dibujar imagen x %2 y %3",
    args0: [
      { type: "field_input", name: "NAME", text: "matriz" },
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
    tooltip:
      "Dibuja una imagen a colores en la matriz NeoPixel. Toca la miniatura para " +
      "editarla. Después usa 'mostrar' para que se vea en los LEDs.",
    mutator: "neopixel_image_ext",
  },
  {
    type: "oled_image",
    message0: "%1 mostrar imagen x %2 y %3",
    args0: [
      { type: "field_input", name: "NAME", text: "oled" },
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
    tooltip:
      "Muestra una imagen en blanco y negro en la OLED (también SH1106). " +
      "Toca la miniatura para dibujarla o cargar una foto.",
    mutator: "oled_image_ext",
  },
  {
    type: "matrix8_image",
    message0: "%1 mostrar dibujo x %2 y %3",
    args0: [
      { type: "field_input", name: "NAME", text: "matrix8x8" },
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
    tooltip:
      "Muestra un dibujo en la matriz LED (1 a 4 módulos de 8×8). " +
      "Toca la miniatura para dibujarlo.",
    mutator: "matrix8_image_ext",
  },
  {
    type: "tft_image",
    message0: "%1 mostrar imagen x %2 y %3 escala %4",
    args0: [
      { type: "field_input", name: "NAME", text: "tft" },
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
      {
        type: "field_dropdown",
        name: "SCALE",
        options: [["×1", "1"], ["×2", "2"], ["×3", "3"], ["×4", "4"]],
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
    tooltip:
      "Muestra una imagen a colores en la pantalla TFT. Toca la miniatura para " +
      "dibujarla o cargar una foto. La escala la agranda (×3 = 3 veces más grande).",
    mutator: "tft_image_ext",
  },
  {
    type: "tm1637_segments",
    message0: "%1 mostrar segmentos",
    args0: [{ type: "field_input", name: "NAME", text: "tm1637" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
    tooltip:
      "Enciende los segmentos que elijas en los 4 dígitos (para letras y símbolos). " +
      "Toca la miniatura para editarlos.",
    mutator: "tm1637_segments_ext",
  },
  {
    type: "lcd_create_char",
    message0: "%1 crear carácter %2",
    args0: [
      { type: "field_input", name: "NAME", text: "lcd" },
      { type: "field_dropdown", name: "N", options: [0, 1, 2, 3, 4, 5, 6, 7].map((n) => [String(n), String(n)]) },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
    tooltip:
      "Guarda un dibujo de 5×8 en la LCD (hay 8 lugares, del 0 al 7). " +
      "Para mostrarlo, escribe el bloque 'carácter propio' con el mismo número.",
    extensions: ["lcd_char_grid_ext"],
  },
  {
    type: "lcd_i2c_create_char",
    message0: "%1 crear carácter %2",
    args0: [
      { type: "field_input", name: "NAME", text: "lcd_i2c" },
      { type: "field_dropdown", name: "N", options: [0, 1, 2, 3, 4, 5, 6, 7].map((n) => [String(n), String(n)]) },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
    tooltip:
      "Guarda un dibujo de 5×8 en la LCD I2C (hay 8 lugares, del 0 al 7). " +
      "Para mostrarlo, escribe el bloque 'carácter propio' con el mismo número.",
    extensions: ["lcd_char_grid_ext"],
  },
  {
    type: "lcd_custom_char",
    message0: "carácter propio %1",
    args0: [
      { type: "field_dropdown", name: "N", options: [0, 1, 2, 3, 4, 5, 6, 7].map((n) => [String(n), String(n)]) },
    ],
    output: "String",
    colour: "#26A69A",
    tooltip: "El carácter que guardaste con 'crear carácter'. Úsalo en 'escribir' de la LCD.",
  },
]);

Blockly.Extensions.registerMutator("neopixel_image_ext", makeImageBlockMixin("rgb565", 8, 8), function () {
  this.setImage_(8, 8, "");
});
Blockly.Extensions.registerMutator("matrix8_image_ext", makeImageBlockMixin("mono", 8, 8, "#ff3b30"), function () {
  this.setImage_(8, 8, "");
});
Blockly.Extensions.registerMutator("tft_image_ext", makeImageBlockMixin("rgb565be", 32, 32), function () {
  this.setImage_(32, 32, "");
});
Blockly.Extensions.registerMutator(
  "tm1637_segments_ext",
  {
    segs_: [0, 0, 0, 0],

    mutationToDom: function () {
      const m = Blockly.utils.xml.createElement("mutation");
      m.setAttribute("segs", this.segs_.map((b) => b.toString(16).padStart(2, "0")).join(""));
      return m;
    },

    domToMutation: function (xml) {
      const hex = (xml.getAttribute("segs") || "").replace(/[^0-9a-f]/gi, "").padEnd(8, "0");
      this.setSegments_([0, 1, 2, 3].map((i) => parseInt(hex.substr(i * 2, 2), 16)));
    },

    getToolPayload_: function () {
      return { segs: this.segs_.slice() };
    },

    setSegments_: function (bytes) {
      this.segs_ = bytes.map((b) => b & 0xff);
      const block = this;
      if (this.getInput("PIC")) this.removeInput("PIC");
      this.appendDummyInput("PIC").appendField(
        new Blockly.FieldImage(segmentsThumbUrl(this.segs_), 84, 32, "segmentos", function () {
          if (!block.isInFlyout && window.ToolsPanel) window.ToolsPanel.edit(block);
        }),
      );
    },
  },
  function () {
    // "HOLA" como ejemplo, para que se note que se pueden hacer letras.
    this.setSegments_([0x76, 0x3f, 0x38, 0x77]);
  },
);
Blockly.Extensions.registerMutator("oled_image_ext", makeImageBlockMixin("mono", 32, 32), function () {
  this.setImage_(32, 32, "");
});

// Cuadrícula de 5×8 dentro del bloque, con el mismo campo de píxel que el
// bloque de la matriz 8x8 (max_icon). Se puede editar directo en el bloque
// o desde la herramienta "Caracteres LCD".
Blockly.Extensions.register("lcd_char_grid_ext", function () {
  for (let row = 0; row < 8; row++) {
    const input = this.appendDummyInput();
    for (let col = 0; col < 5; col++) {
      input.appendField(new FieldPixel("0"), `PIXEL_${row}_${col}`);
    }
  }
});

// ── Generadores MicroPython ───────────────────────────────────
Blockly.Python["neopixel_matrix_init"] = function (block) {
  Blockly.Python.definitions_["neomatrix_import"] = "from np import NeoMatrix";
  const name = block.getFieldValue("NAME");
  const pin = block.getFieldValue("PIN");
  const w = block.getFieldValue("W");
  const h = block.getFieldValue("H");
  const layout = block.getFieldValue("LAYOUT");
  const rot = block.getFieldValue("ROT");
  return `${name}=NeoMatrix(${pin},${w},${h},layout=${layout},rotation=${rot})\n`;
};

Blockly.Python["neopixel_image"] = function (block) {
  Blockly.Python.definitions_["import_framebuf"] = "import framebuf";
  const name = block.getFieldValue("NAME");
  const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  return (
    `${name}.blit(framebuf.FrameBuffer(bytearray(bytes.fromhex('${block.imgData_}')), ` +
    `${block.imgW_}, ${block.imgH_}, framebuf.RGB565), ${x}, ${y})\n`
  );
};

Blockly.Python["oled_image"] = function (block) {
  const name = block.getFieldValue("NAME");
  const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  return `${name}.icon(bytes.fromhex('${block.imgData_}'), ${x}, ${y}, ${block.imgW_}, ${block.imgH_}, 1)\n`;
};

Blockly.Python["matrix8_image"] = function (block) {
  const name = block.getFieldValue("NAME");
  const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  return `${name}.icon(bytes.fromhex('${block.imgData_}'), ${x}, ${y}, ${block.imgW_}, ${block.imgH_}, 1)\n`;
};

// Con escala, cada fila se agranda en memoria y se manda de una vez: no
// hace falta tener la imagen grande entera en RAM.
Blockly.Python["tft_image"] = function (block) {
  const name = block.getFieldValue("NAME");
  const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const scale = block.getFieldValue("SCALE");
  const data = `bytes.fromhex('${block.imgData_}')`;
  if (scale === "1") {
    return `${name}.blit_buffer(${data}, ${x}, ${y}, ${block.imgW_}, ${block.imgH_})\n`;
  }
  Blockly.Python.definitions_["tft_blit_scaled"] = `def tft_blit_scaled(tft, data, x, y, w, h, s):
    row = bytearray(w * s * 2)
    for j in range(h):
        for i in range(w):
            hi = data[(j * w + i) * 2]
            lo = data[(j * w + i) * 2 + 1]
            for k in range(s):
                row[(i * s + k) * 2] = hi
                row[(i * s + k) * 2 + 1] = lo
        tft.blit_buffer(row * s, x, y + j * s, w * s, s)
`;
  return `tft_blit_scaled(${name}, ${data}, ${x}, ${y}, ${block.imgW_}, ${block.imgH_}, ${scale})\n`;
};

Blockly.Python["tm1637_segments"] = function (block) {
  const name = block.getFieldValue("NAME");
  const bytes = block.segs_.map((b) => "0x" + b.toString(16).padStart(2, "0")).join(", ");
  return `${name}.write(bytes([${bytes}]))\n`;
};

// Una fila = un byte con los 5 bits de la derecha (formato HD44780).
function lcdCharBytes(block) {
  const bytes = [];
  for (let row = 0; row < 8; row++) {
    let v = 0;
    for (let col = 0; col < 5; col++) v = (v << 1) | (block.getFieldValue(`PIXEL_${row}_${col}`) === "1" ? 1 : 0);
    bytes.push("0x" + v.toString(16).padStart(2, "0"));
  }
  return bytes.join(", ");
}

Blockly.Python["lcd_create_char"] = function (block) {
  const name = block.getFieldValue("NAME");
  return `${name}.create_char(${block.getFieldValue("N")}, bytearray([${lcdCharBytes(block)}]))\n`;
};

Blockly.Python["lcd_i2c_create_char"] = function (block) {
  const name = block.getFieldValue("NAME");
  return `${name}.custom_char(${block.getFieldValue("N")}, bytearray([${lcdCharBytes(block)}]))\n`;
};

Blockly.Python["lcd_custom_char"] = function (block) {
  return [`chr(${block.getFieldValue("N")})`, Blockly.Python.ORDER_FUNCTION_CALL];
};

// ── Simulador JS (vista Juego): estos bloques no hacen nada ahí ──
if (Blockly.JavaScript) {
  ["neopixel_matrix_init", "neopixel_image", "oled_image", "matrix8_image", "tft_image", "tm1637_segments", "lcd_create_char", "lcd_i2c_create_char"].forEach((n) => {
    if (!Blockly.JavaScript[n]) Blockly.JavaScript[n] = function () { return ""; };
  });
  Blockly.JavaScript["lcd_custom_char"] = function (block) {
    return [`String.fromCharCode(${block.getFieldValue("N")})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
}
