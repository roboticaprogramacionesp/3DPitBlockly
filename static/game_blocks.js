/* ══════════════════════════════════════════════════════════════
   game_blocks.js  —  Definición de bloques de juego para 3DPit
   Agregar este <script> en index.html ANTES de main.js
══════════════════════════════════════════════════════════════ */

Blockly.defineBlocksWithJsonArray([
  /* ──────────────────────────────
     PANTALLA
  ────────────────────────────── */
  {
    type: "game_start",
    message0: "🎮 iniciar juego ancho %1 alto %2",
    args0: [
      { type: "input_value", name: "WIDTH", check: "Number" },
      { type: "input_value", name: "HEIGHT", check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Prepara el canvas del juego con el tamaño indicado.",
  },
  {
    type: "select_imgs",
    message0: "🖼️%1",
    args0: [
      {
        type: "field_dropdown",
        name: "IMG",
        options: [
          ["🚗 car.png", "car.png"],
          ["🏁 laberinto.png", "laberinto.png"],
          ["🏁 laberinto2.png", "laberinto2.png"],
          ["🍄 mario.png", "mario.png"],
          ["❤️ corazon.png", "corazon.png"],
          ["👾 alien.png", "alien.png"],
          ["⭐ estrella.png", "estrella.png"],
          ["💣 bomba.png", "bomba.png"],
          ["🪙 moneda.png", "moneda.png"],
          ["🐢 tortuga.png", "tortuga.png"],
          ["👻 fantasma.png", "fantasma.png"],
          ["🚀 cohete.png", "cohete.png"],
          ["🏎️ carro_rojo.png", "carro_rojo.png"],
          ["🐸 mario.png", "mario.png"],
        ],
      },
    ],
    output: "String",
    colour: 160,
    tooltip: "Selecciona una imagen para usar en el juego.",
  },
  {
    type: "game_set_bg",
    message0: "🖼️ fondo del juego %1",
    args0: [{ type: "input_value", name: "COLOR", check: "Colour" }],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Cambia el color de fondo del canvas.",
  },
  {
    type: "game_clear",
    message0: "🧹 limpiar pantalla",
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Redibuja el fondo (limpia el frame anterior).",
  },

  /* ──────────────────────────────
     SPRITE / PERSONAJE
  ────────────────────────────── */
  {
    type: "sprite_create",
    message0:
      "🧍 crear personaje  X %1  Y %2  ancho %3  alto %4  imagen/color %5",
    args0: [
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
      { type: "input_value", name: "W", check: "Number" },
      { type: "input_value", name: "H", check: "Number" },
      { type: "input_value", name: "IMG", check: ["Colour", "String"] },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Crea el personaje. En imagen/color pon el nombre del archivo (car.png) o un color (#00ff88).",
  },
  {
    type: "sprite_load_image",
    message0: "📂 precargar imagen %1",
    args0: [{ type: "input_value", name: "FILE" }],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Precarga una imagen antes del loop para evitar el placeholder. Ej: car.png",
  },
  {
    type: "sprite_set_flip",
    message0: "↔️ espejo horizontal %1",
    args0: [
      {
        type: "field_dropdown",
        name: "FLIP",
        options: [
          ["activado", "TRUE"],
          ["desactivado", "FALSE"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Voltea el sprite horizontalmente.",
  },
  {
    type: "sprite_move",
    message0: "🏃 mover personaje  dx %1  dy %2",
    args0: [
      { type: "input_value", name: "DX", check: "Number" },
      { type: "input_value", name: "DY", check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Mueve el personaje deltaX / deltaY píxeles.",
  },
  {
    type: "sprite_set_pos",
    message0: "📍 poner personaje en  X %1  Y %2",
    args0: [
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Teletransporta el personaje a la posición X, Y.",
  },
  {
    type: "sprite_get_x",
    message0: "📐 posición X del personaje",
    output: "Number",
    colour: 20,
    tooltip: "Devuelve la coordenada X actual del personaje.",
  },
  {
    type: "sprite_get_y",
    message0: "📐 posición Y del personaje",
    output: "Number",
    colour: 20,
    tooltip: "Devuelve la coordenada Y actual del personaje.",
  },
  {
    type: "sprite_draw",
    message0: "🖊️ dibujar personaje",
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Dibuja el personaje en su posición actual.",
  },

  /* ──────────────────────────────
     TECLADO
  ────────────────────────────── */
  {
    type: "key_is_pressed",
    message0: "⌨️ tecla %1 presionada?",
    args0: [
      {
        type: "field_dropdown",
        name: "KEY",
        options: [
          ["↑ Arriba", "ArrowUp"],
          ["↓ Abajo", "ArrowDown"],
          ["← Izquierda", "ArrowLeft"],
          ["→ Derecha", "ArrowRight"],
          ["W", "w"],
          ["A", "a"],
          ["S", "s"],
          ["D", "d"],
          ["Espacio", " "],
          ["Enter", "Enter"],
          ["Z", "z"],
          ["X", "x"],
        ],
      },
    ],
    output: "Boolean",
    colour: 20,
    tooltip: "Verdadero si la tecla indicada está siendo presionada.",
  },

  /* ──────────────────────────────
     COLISIONES
  ────────────────────────────── */
  {
    type: "touching_color",
    message0: "💥 ¿personaje toca color %1 ?",
    args0: [{ type: "input_value", name: "COLOR", check: "Colour" }],
    output: "Boolean",
    colour: 20,
    tooltip:
      "Verdadero si algún píxel bajo el personaje tiene el color indicado.",
  },
  {
    type: "touching_edge",
    message0: "🚧 ¿personaje toca el borde?",
    output: "Boolean",
    colour: 20,
    tooltip: "Verdadero si el personaje tocó el límite del canvas.",
  },
  {
    type: "color_at_pos",
    message0: "🎨 color en  X %1  Y %2",
    args0: [
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
    ],
    output: "Colour",
    colour: 20,
    tooltip: "Devuelve el color HEX del píxel en la posición X, Y del canvas.",
  },

  /* ──────────────────────────────
     PUNTAJE
  ────────────────────────────── */
  {
    type: "game_add_score",
    message0: "🏆 sumar %1 punto(s)",
    args0: [{ type: "input_value", name: "POINTS", check: "Number" }],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Aumenta el puntaje y lo muestra en la barra superior.",
  },
  {
    type: "game_get_score",
    message0: "🏆 puntaje actual",
    output: "Number",
    colour: 20,
    tooltip: "Devuelve el puntaje actual.",
  },
  {
    type: "game_reset_score",
    message0: "🔄 reiniciar puntaje",
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Pone el puntaje en 0.",
  },
  {
    type: "game_show_text",
    message0: "✏️ escribir %1  en  X %2  Y %3  color %4",
    args0: [
      { type: "input_value", name: "TEXT" },
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Escribe texto en el canvas en la posición indicada.",
  },

  /* ──────────────────────────────
     DIBUJAR FORMAS / OBSTÁCULOS
  ────────────────────────────── */
  {
    type: "game_draw_rect",
    message0: "⬛ dibujar rectángulo  X %1  Y %2  ancho %3  alto %4  color %5",
    args0: [
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
      { type: "input_value", name: "W", check: "Number" },
      { type: "input_value", name: "H", check: "Number" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Dibuja un rectángulo sólido — útil como pared u obstáculo.",
  },
  {
    type: "game_draw_circle",
    message0: "🔴 dibujar círculo  X %1  Y %2  radio %3  color %4",
    args0: [
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
      { type: "input_value", name: "R", check: "Number" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Dibuja un círculo sólido — útil como moneda o enemigo.",
  },
  /* ──────────────────────────────
     FRAME — sincronizador 60fps
  ────────────────────────────── */
  {
    type: "game_frame",
    message0: "🔄 siguiente frame (60fps)",
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Pausa el programa hasta el siguiente frame (~16ms). Ponlo al final del loop principal para lograr 60fps suaves.",
  },
  /* ──────────────────────────────
     LÁPIZ / PEN
  ────────────────────────────── */
  {
    type: "pen_down",
    message0: "✏️ bajar lápiz %1 %2",
    args0: [
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 65,
    tooltip:
      "Activa el lápiz: el personaje dibujará al moverse. Si conectas X y Y, el personaje se posiciona ahí antes de empezar a dibujar (deja los huecos vacíos para usar la posición actual).",
  },
  {
    type: "pen_up",
    message0: "✏️ subir lápiz",
    previousStatement: null,
    nextStatement: null,
    colour: 65,
    tooltip: "Desactiva el lápiz: el personaje deja de dibujar.",
  },
  {
    type: "pen_set_color",
    message0: "🖌️ color del lápiz %1",
    args0: [{ type: "input_value", name: "COLOR", check: "Colour" }],
    previousStatement: null,
    nextStatement: null,
    colour: 65,
    tooltip: "Cambia el color del lápiz.",
  },
  {
    type: "pen_set_size",
    message0: "📏 tamaño del lápiz %1",
    args0: [{ type: "input_value", name: "SIZE", check: "Number" }],
    previousStatement: null,
    nextStatement: null,
    colour: 65,
    tooltip: "Cambia el grosor del trazo del lápiz.",
  },
  {
    type: "pen_clear",
    message0: "🧹 borrar trazos del lápiz",
    previousStatement: null,
    nextStatement: null,
    colour: 65,
    tooltip: "Borra todos los trazos del lápiz (limpia el canvas).",
  },
  {
    type: "pen_stamp",
    message0: "📌 sellar personaje",
    previousStatement: null,
    nextStatement: null,
    colour: 65,
    tooltip: "Deja una copia del personaje impresa en el canvas.",
  },
  {
    type: "game_set_bg_image",
    message0: "🖼️ fondo imagen %1",
    args0: [{ type: "input_value", name: "FILE", check: "String" }],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Pone una imagen como fondo del juego. Escribe el nombre del archivo (ej: road.png). La imagen debe estar en /static/img/",
  },
  {
    type: "pixel_channel",
    message0: "🔬 canal %1 del pixel en X %2  Y %3",
    args0: [
      {
        type: "field_dropdown",
        name: "CH",
        options: [
          ["R (rojo)", "R"],
          ["G (verde)", "G"],
          ["B (azul)", "B"],
        ],
      },
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
    ],
    output: "Number",
    colour: 20,
    tooltip:
      "Devuelve el valor 0-255 del canal R, G o B del pixel en la posición X,Y del canvas.",
  },
  /* ──────────────────────────────
     RATÓN
  ────────────────────────────── */
  {
    type: "mouse_clicked",
    message0: "🖱️ ¿clic del ratón?",
    output: "Boolean",
    colour: 20,
    tooltip:
      "Verdadero si el usuario hizo clic. Se consume tras la primera lectura por frame.",
  },
  {
    type: "mouse_down",
    message0: "🖱️ ¿ratón presionado?",
    output: "Boolean",
    colour: 20,
    tooltip: "Verdadero mientras el botón del ratón esté presionado.",
  },
  {
    type: "mouse_x",
    message0: "🖱️ X del ratón",
    output: "Number",
    colour: 20,
    tooltip: "Coordenada X actual del ratón sobre el canvas.",
  },
  {
    type: "mouse_y",
    message0: "🖱️ Y del ratón",
    output: "Number",
    colour: 20,
    tooltip: "Coordenada Y actual del ratón sobre el canvas.",
  },
  /* ──────────────────────────────
     MOVIMIENTO POLAR (pasos + ángulo)
  ────────────────────────────── */
  {
    type: "sprite_move_steps",
    message0: "👣 mover %1 pasos",
    args0: [{ type: "input_value", name: "STEPS", check: "Number" }],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Mueve el personaje hacia adelante según su ángulo actual (0° = arriba, los grados aumentan girando a la derecha).",
  },
  {
    type: "sprite_turn_left",
    message0: "↺ girar izquierda %1 grados",
    args0: [{ type: "input_value", name: "DEG", check: "Number" }],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Gira el personaje a la izquierda (sentido antihorario) los grados indicados.",
  },
  {
    type: "sprite_turn_right",
    message0: "↻ girar derecha %1 grados",
    args0: [{ type: "input_value", name: "DEG", check: "Number" }],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Gira el personaje a la derecha (sentido horario) los grados indicados.",
  },
  {
    type: "sprite_get_angle",
    message0: "📐 ángulo del personaje",
    output: "Number",
    colour: 20,
    tooltip: "Devuelve el ángulo actual del personaje en grados (0° = arriba).",
  },
]);