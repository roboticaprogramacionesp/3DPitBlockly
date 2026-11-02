/* ══════════════════════════════════════════════════════════════
   game_blocks.js  —  Definición de bloques de juego para 3DPit
   Agregar este <script> en index.html ANTES de main.js
══════════════════════════════════════════════════════════════ */

/* ── Imágenes del juego ──
   select_imgs ("🖼️ imagen") tiene las de siempre, con los mismos valores
   para no romper proyectos guardados. Los sprites de 16x16 (en
   static/img/sprites/, guardados x4 sin suavizado y sin fondo) van en un
   bloque por grupo -- game_sprite_<grupo> -- para que cada menú sea corto.
   Las rutas son relativas a static/img/ (sin .png). En el menú se ve la
   miniatura de cada imagen. */
function gameImageOptions(paths) {
  return paths.map((p) => [
    { src: `./static/img/${p}.png`, width: 24, height: 24, alt: p.replace("sprites/", "") },
    `${p}.png`,
  ]);
}

const GAME_IMAGE_OPTIONS = gameImageOptions([
  "car", "laberinto", "laberinto2", "mario", "corazon", "alien", "estrella",
  "bomba", "moneda", "tortuga", "fantasma", "cohete", "carro_rojo",
]);

const GAME_SPRITE_GROUPS = [
  {
    key: "personajes", icon: "🧍", label: "personaje",
    images: [
      "mario", "alien", "fantasma", "sprites/amongus", "sprites/amongus_2", "sprites/chica_1",
      "sprites/chica_2", "sprites/chica_3", "sprites/hulk", "sprites/iron_man", "sprites/kirby",
      "sprites/link", "sprites/link_2", "sprites/luigi", "sprites/mario_2", "sprites/mario_3",
      "sprites/pacman", "sprites/pacman_cerrado", "sprites/robot_1", "sprites/robot_2",
      "sprites/walle", "sprites/fantasma_cafe", "sprites/fantasma_cyan", "sprites/fantasma_rosa",
    ],
  },
  {
    key: "animales", icon: "🐾", label: "animal",
    images: [
      "tortuga", "sprites/abeja", "sprites/gato", "sprites/catarina", "sprites/cangrejo",
      "sprites/delfin", "sprites/jirafa", "sprites/leon", "sprites/ballena_1",
      "sprites/ballena_2", "sprites/ballena_3", "sprites/ballena_4", "sprites/ballena_5",
      "sprites/ballena_6", "sprites/ballena_7", "sprites/ballena_8", "sprites/ballena_9",
    ],
  },
  {
    key: "caritas", icon: "😀", label: "carita",
    images: [
      "sprites/feliz", "sprites/emocionado", "sprites/risa_lagrima", "sprites/llorando",
      "sprites/enojado", "sprites/malas_palabras", "sprites/enfermo", "sprites/enfermo_2",
      "sprites/enfermo_3", "sprites/congelado", "sprites/lol", "sprites/pulgar_arriba",
    ],
  },
  {
    key: "corazones", icon: "❤️", label: "corazón",
    images: [
      "corazon", "sprites/corazon_grande_verde", "sprites/corazon_grande_azul",
      "sprites/corazon_grande_amarillo", "sprites/corazon_grande_cyan",
      "sprites/corazon_grande_rosa", "sprites/corazon_grande_naranja",
      "sprites/corazon_grande_vino", "sprites/corazon_grande_morado", "sprites/corazon_rojo",
      "sprites/corazon_verde", "sprites/corazon_azul", "sprites/corazon_amarillo",
      "sprites/corazon_cyan", "sprites/corazon_morado", "sprites/corazon_brasil",
      "sprites/corazon_mexico", "sprites/corazon_rosa_blanco", "sprites/corazones_colores",
      "sprites/corazon_contorno", "sprites/corazon_arcoiris_1", "sprites/corazon_arcoiris_2",
      "sprites/corazon_arcoiris_3", "sprites/corazon_arcoiris_4",
    ],
  },
  {
    key: "comida", icon: "🍔", label: "comida",
    images: [
      "sprites/hamburguesa", "sprites/pizza", "sprites/papas", "sprites/pastel",
      "sprites/cereza", "sprites/sandia", "sprites/jitomate", "sprites/lechuga",
      "sprites/carne", "sprites/pan", "sprites/huevo_frito", "sprites/hot_cake_1",
      "sprites/hot_cake_2", "sprites/hot_cake_3", "sprites/chocolate_1", "sprites/chocolate_2",
      "sprites/chocolate_3", "sprites/paleta", "sprites/helado", "sprites/malteada_fresa",
      "sprites/vaso_popote", "sprites/vaso", "sprites/coco", "sprites/tarro", "sprites/plato",
    ],
  },
  {
    key: "halloween", icon: "🎃", label: "Halloween",
    images: [
      "sprites/calabaza", "sprites/calabaza_gato", "sprites/fantasma_blanco",
      "sprites/calavera", "sprites/calavera_dientes", "sprites/murcielago", "sprites/arana",
      "sprites/gato_negro", "sprites/sombrero_bruja", "sprites/sombrero_morado",
      "sprites/lapida",
    ],
  },
  {
    key: "navidad", icon: "🎄", label: "Navidad",
    images: [
      "sprites/pino", "sprites/pino_2", "sprites/santa", "sprites/regalo",
      "sprites/regalo_rojo", "sprites/regalo_verde",
    ],
  },
  {
    key: "objetos", icon: "⭐", label: "objeto",
    images: [
      "estrella", "moneda", "bomba", "cohete", "carro_rojo", "car", "sprites/estrella_arcoiris",
      "sprites/hongo_vida", "sprites/hongo", "sprites/huevo_yoshi", "sprites/trofeo",
      "sprites/control", "sprites/escudo", "sprites/yin_yang", "sprites/flor_maceta",
      "sprites/pokebola_roja", "sprites/pokebola_azul", "sprites/pokebola_amarilla",
      "sprites/pokebola_blanca",
    ],
  },
];

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
        options: GAME_IMAGE_OPTIONS,
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
      "Crea el personaje. X,Y es la esquina superior izquierda. En imagen/color pon el nombre del archivo (car.png) o un color (#00ff88).",
  },
  {
    type: "sprite_load_image",
    message0: "📂 precargar imagen %1",
    args0: [{ type: "input_value", name: "FILE", check: "String" }],
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
    type: "sprite_set_flip_vertical",
    message0: "↕️ espejo vertical %1",
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
    tooltip: "Voltea el sprite verticalmente.",
  },
  {
    type: "sprite_set_scale",
    message0: "🔍 escala del personaje %1",
    args0: [{ type: "input_value", name: "SCALE", check: "Number" }],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Cambia el tamaño del sprite como múltiplo del tamaño original (1 = tamaño original, 2 = el doble, 0.5 = la mitad).",
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
    tooltip: "Teletransporta el personaje (esquina superior izquierda) a la posición X, Y.",
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
          ["B", "b"],
          ["C", "c"],
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

  {
    type: "game_show_text",
    message0: "✏️ escribir %1  en  X %2  Y %3  color %4  tamaño %5",
    args0: [
      { type: "input_value", name: "TEXT" },
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
      { type: "input_value", name: "COLOR", check: "Colour" },
      { type: "input_value", name: "SIZE", check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Escribe texto en el canvas. Tamaño en píxeles (ej: 16).",
  },

  /* ──────────────────────────────
     DIBUJAR FORMAS / OBSTÁCULOS
  ────────────────────────────── */
  {
    type: "game_draw_rect",
    message0: "⬛ rectángulo sólido  X %1  Y %2  ancho %3  alto %4  color %5",
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
    tooltip: "Dibuja un rectángulo relleno — útil como pared u obstáculo sólido.",
  },
  {
    type: "game_draw_rect_outline",
    message0: "⬜ rectángulo contorno  X %1  Y %2  ancho %3  alto %4  color %5  grosor %6",
    args0: [
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
      { type: "input_value", name: "W", check: "Number" },
      { type: "input_value", name: "H", check: "Number" },
      { type: "input_value", name: "COLOR", check: "Colour" },
      { type: "input_value", name: "LW", check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Dibuja solo el borde de un rectángulo (sin relleno).",
  },
  {
    type: "game_draw_circle",
    message0: "🔴 círculo sólido  X %1  Y %2  radio %3  color %4",
    args0: [
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
      { type: "input_value", name: "R", check: "Number" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Dibuja un círculo relleno — útil como moneda o enemigo.",
  },
  {
    type: "game_draw_circle_outline",
    message0: "⭕ círculo contorno  X %1  Y %2  radio %3  color %4  grosor %5",
    args0: [
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
      { type: "input_value", name: "R", check: "Number" },
      { type: "input_value", name: "COLOR", check: "Colour" },
      { type: "input_value", name: "LW", check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Dibuja solo el borde de un círculo (sin relleno).",
  },
  {
    type: "game_draw_triangle",
    message0: "🔺 triángulo sólido  X1 %1  Y1 %2  X2 %3  Y2 %4  X3 %5  Y3 %6  color %7",
    args0: [
      { type: "input_value", name: "X1", check: "Number" },
      { type: "input_value", name: "Y1", check: "Number" },
      { type: "input_value", name: "X2", check: "Number" },
      { type: "input_value", name: "Y2", check: "Number" },
      { type: "input_value", name: "X3", check: "Number" },
      { type: "input_value", name: "Y3", check: "Number" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Dibuja un triángulo relleno con tres vértices (X1,Y1), (X2,Y2), (X3,Y3).",
  },
  {
    type: "game_draw_triangle_outline",
    message0: "△ triángulo contorno  X1 %1  Y1 %2  X2 %3  Y2 %4  X3 %5  Y3 %6  color %7  grosor %8",
    args0: [
      { type: "input_value", name: "X1", check: "Number" },
      { type: "input_value", name: "Y1", check: "Number" },
      { type: "input_value", name: "X2", check: "Number" },
      { type: "input_value", name: "Y2", check: "Number" },
      { type: "input_value", name: "X3", check: "Number" },
      { type: "input_value", name: "Y3", check: "Number" },
      { type: "input_value", name: "COLOR", check: "Colour" },
      { type: "input_value", name: "LW", check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Dibuja solo el borde de un triángulo (sin relleno).",
  },
  {
    type: "game_draw_line",
    message0: "📏 línea  X1 %1  Y1 %2  X2 %3  Y2 %4  color %5  grosor %6",
    args0: [
      { type: "input_value", name: "X1", check: "Number" },
      { type: "input_value", name: "Y1", check: "Number" },
      { type: "input_value", name: "X2", check: "Number" },
      { type: "input_value", name: "Y2", check: "Number" },
      { type: "input_value", name: "COLOR", check: "Colour" },
      { type: "input_value", name: "LW", check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Dibuja una línea recta entre dos puntos.",
  },
  {
    type: "game_draw_image",
    message0:
      "🖼️ dibujar imagen %1  X %2  Y %3  ancho %4  alto %5  ángulo (horario) %6 °",
    args0: [
      { type: "input_value", name: "FILE", check: "String" },
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
      { type: "input_value", name: "W", check: "Number" },
      { type: "input_value", name: "H", check: "Number" },
      { type: "input_value", name: "ANGLE", check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: false,
    colour: 20,
    tooltip:
      "Dibuja una imagen suelta en la pantalla (no necesita 'crear personaje'). Útil para decoraciones, íconos o fondos parciales. El ángulo gira la imagen en SENTIDO HORARIO (90° = un cuarto de vuelta a la derecha); usa números negativos para girar antihorario.",
  },
  {
    type: "game_draw_star",
    message0: "⭐ estrella  X %1  Y %2  longitud %3  ángulo %4  color %5",
    args0: [
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
      { type: "input_value", name: "LENGTH", check: "Number" },
      { type: "input_value", name: "ANGLE", check: "Number" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Dibuja una estrella de 5 puntas centrada en (X,Y). 'longitud' controla el tamaño (radio de las puntas) y 'ángulo' la rota.",
  },
  {
    type: "game_draw_ellipse",
    message0: "🥚 elipse  X %1  Y %2  ancho %3  alto %4  ángulo %5  color %6",
    args0: [
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
      { type: "input_value", name: "WIDTH", check: "Number" },
      { type: "input_value", name: "HEIGHT", check: "Number" },
      { type: "input_value", name: "ANGLE", check: "Number" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Dibuja una elipse rellena centrada en (X,Y), con ancho y alto independientes. 'ángulo' la rota.",
  },
  {
    type: "game_draw_quad",
    message0:
      "🔷 cuadrilátero  X1 %1  Y1 %2  X2 %3  Y2 %4  X3 %5  Y3 %6  X4 %7  Y4 %8  color %9",
    args0: [
      { type: "input_value", name: "X1", check: "Number" },
      { type: "input_value", name: "Y1", check: "Number" },
      { type: "input_value", name: "X2", check: "Number" },
      { type: "input_value", name: "Y2", check: "Number" },
      { type: "input_value", name: "X3", check: "Number" },
      { type: "input_value", name: "Y3", check: "Number" },
      { type: "input_value", name: "X4", check: "Number" },
      { type: "input_value", name: "Y4", check: "Number" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: false,
    colour: 20,
    tooltip:
      "Dibuja un cuadrilátero relleno (cualquier forma de 4 lados: trapecio, rombo, etc.) a partir de 4 vértices, en orden.",
  },
  {
    type: "game_draw_regular_polygon",
    message0: "🔶 polígono regular  X %1  Y %2  lados %3  longitud %4  ángulo %5  color %6",
    args0: [
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
      { type: "input_value", name: "N", check: "Number" },
      { type: "input_value", name: "LENGTH", check: "Number" },
      { type: "input_value", name: "ANGLE", check: "Number" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Dibuja un polígono regular (pentágono, hexágono, etc.) centrado en (X,Y). 'lados' = número de lados, 'longitud' = tamaño de cada lado.",
  },
  {
    type: "game_draw_table",
    message0: "▦ tabla  X %1  Y %2  ancho %3  alto %4  filas %5  columnas %6  color %7",
    args0: [
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
      { type: "input_value", name: "WIDTH", check: "Number" },
      { type: "input_value", name: "HEIGHT", check: "Number" },
      { type: "input_value", name: "ROW", check: "Number" },
      { type: "input_value", name: "COLUMN", check: "Number" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: false,
    colour: 20,
    tooltip:
      "Dibuja una cuadrícula/tablero de 'filas' x 'columnas' dentro del rectángulo (X,Y,ancho,alto). Útil para tableros de juego (gato, ajedrez, etc.).",
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
    message0: "✏️ bajar lápiz",
    previousStatement: null,
    nextStatement: null,
    colour: 65,
    tooltip:
      "Baja el lápiz. El personaje dibujará una línea al moverse desde su posición actual.",
  },
  {
    type: "pen_up",
    message0: "✏️ subir lápiz",
    previousStatement: null,
    nextStatement: null,
    colour: 65,
    tooltip: "Sube el lápiz. El personaje se moverá sin dibujar.",
  },
  {
    type: "pen_move_to",
    message0: "✏️ mover lápiz a  X %1  Y %2",
    args0: [
      { type: "input_value", name: "X", check: "Number" },
      { type: "input_value", name: "Y", check: "Number" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 65,
    tooltip: "Mueve el lápiz a la posición X,Y SIN dibujar, aunque esté bajado. Útil para saltar a otro punto sin trazar una línea.",
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
    type: "game_get_bg_image_name",
    message0: "🖼️ nombre del fondo actual",
    output: "String",
    colour: 20,
    tooltip:
      "Devuelve el nombre/identificador de la imagen de fondo actual (o vacío si es un color). Útil para guardarlo en una variable.",
  },
  {
    type: "game_get_sprite_image_name",
    message0: "🐱 nombre del sprite actual",
    output: "String",
    colour: 20,
    tooltip:
      "Devuelve el nombre/identificador de la imagen del personaje actual (o vacío si es un color). Útil para guardarlo en una variable.",
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
  {
    type: "mouse_left_clicked",
    message0: "🖱️◀ ¿clic izquierdo?",
    output: "Boolean",
    colour: 20,
    tooltip:
      "Verdadero si el usuario hizo clic con el botón IZQUIERDO. Se consume tras la primera lectura por frame.",
  },
  {
    type: "mouse_left_down",
    message0: "🖱️◀ ¿botón izquierdo presionado?",
    output: "Boolean",
    colour: 20,
    tooltip: "Verdadero mientras el botón IZQUIERDO del ratón esté presionado.",
  },
  {
    type: "mouse_right_clicked",
    message0: "🖱️▶ ¿clic derecho?",
    output: "Boolean",
    colour: 20,
    tooltip:
      "Verdadero si el usuario hizo clic con el botón DERECHO. Se consume tras la primera lectura por frame.",
  },
  {
    type: "mouse_right_down",
    message0: "🖱️▶ ¿botón derecho presionado?",
    output: "Boolean",
    colour: 20,
    tooltip: "Verdadero mientras el botón DERECHO del ratón esté presionado.",
  },
  {
    type: "mouse_wheel_up",
    message0: "🖱️🔼 ¿rueda hacia arriba?",
    output: "Boolean",
    colour: 20,
    tooltip:
      "Verdadero si la rueda del ratón giró hacia arriba. Se consume tras la primera lectura por frame.",
  },
  {
    type: "mouse_wheel_down",
    message0: "🖱️🔽 ¿rueda hacia abajo?",
    output: "Boolean",
    colour: 20,
    tooltip:
      "Verdadero si la rueda del ratón giró hacia abajo. Se consume tras la primera lectura por frame.",
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
      "Mueve el personaje hacia adelante según su ángulo actual (0° = derecha, 90° = arriba, 180° = izquierda, 270° = abajo).",
  },
  {
    type: "sprite_turn_left",
    message0: "↺ girar izquierda %1 grados",
    args0: [{ type: "input_value", name: "DEG", check: "Number" }],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Gira el personaje a la izquierda (sentido antihorario). 0° = derecha, 90° = arriba, 180° = izquierda, 270° = abajo.",
  },
  {
    type: "sprite_turn_right",
    message0: "↻ girar derecha %1 grados",
    args0: [{ type: "input_value", name: "DEG", check: "Number" }],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Gira el personaje a la derecha (sentido horario). 0° = derecha, 90° = arriba, 180° = izquierda, 270° = abajo.",
  },
  {
    type: "sprite_get_angle",
    message0: "📐 ángulo del personaje",
    output: "Number",
    colour: 20,
    tooltip: "Devuelve el ángulo actual del personaje en grados (0° = derecha).",
  },
  {
    type: "sprite_set_angle",
    message0: "🧭 poner ángulo %1 °",
    args0: [{ type: "input_value", name: "DEG", check: "Number" }],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Pone el ángulo del personaje (0° = derecha, 90° = arriba, 180° = izquierda, 270° = abajo).",
  },
  /* ──────────────────────────────
     UTILIDADES MATEMÁTICAS
  ────────────────────────────── */
  {
    type: "game_random_int",
    message0: "🎲 número entero aleatorio entre %1 y %2",
    args0: [
      { type: "input_value", name: "MIN", check: "Number" },
      { type: "input_value", name: "MAX", check: "Number" },
    ],
    output: "Number",
    colour: 20,
    tooltip: "Devuelve un número entero al azar entre MIN y MAX (incluidos).",
  },
  {
    type: "game_random_float",
    message0: "🎲 número decimal aleatorio entre %1 y %2",
    args0: [
      { type: "input_value", name: "MIN", check: "Number" },
      { type: "input_value", name: "MAX", check: "Number" },
    ],
    output: "Number",
    colour: 20,
    tooltip: "Devuelve un número decimal al azar entre MIN y MAX.",
  },
  {
    type: "game_distance",
    message0: "📐 distancia de ( %1 , %2 ) a ( %3 , %4 )",
    args0: [
      { type: "input_value", name: "X1", check: "Number" },
      { type: "input_value", name: "Y1", check: "Number" },
      { type: "input_value", name: "X2", check: "Number" },
      { type: "input_value", name: "Y2", check: "Number" },
    ],
    output: "Number",
    colour: 20,
    tooltip: "Calcula la distancia entre dos puntos (fórmula Pitágoras).",
  },
  /* ──────────────────────────────
     SONIDO
  ────────────────────────────── */
  {
    type: "game_play_tone",
    message0: "🔊 tocar nota  freq %1 Hz  duración %2 s",
    args0: [
      { type: "input_value", name: "FREQ", check: "Number" },
      { type: "input_value", name: "DUR",  check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: "Reproduce un tono (frecuencia en Hz, duración en segundos). Ej: 440 Hz = La.",
  },
  {
    type: "game_play_melody",
    message0: "🎵 tocar melodía notas(Hz, separadas por coma)%1duración por nota %2s",
    args0: [
      { type: "input_value", name: "NOTES", check: "String" },
      { type: "input_value", name: "DUR", check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: false,
    colour: 160,
    tooltip:
      "Reproduce una secuencia de notas, una tras otra, sin bloquear el juego. Ej: notas '262,330,392,523' (Do, Mi, Sol, Do agudo).",
  },
  {
    type: "game_stop_sound",
    message0: "🔇 detener sonido",
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: "Detiene cualquier tono o melodía que esté sonando en ese momento.",
  },
  /* ──────────────────────────────
     CONTROL DE TIEMPO
  ────────────────────────────── */
  {
    type: "game_wait",
    message0: "⏳ esperar %1 segundos",
    args0: [{ type: "input_value", name: "SECONDS", check: "Number" }],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip:
      "Pausa la ejecución del programa durante el número de segundos indicado, sin congelar el navegador.",
  },
  {
    type: "game_wait_frames",
    message0: "⏳ esperar %1 frames",
    args0: [{ type: "input_value", name: "FRAMES", check: "Number" }],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip:
      "Espera N cuadros (frames) del juego, sincronizado a 60fps. Útil para timings precisos de animación.",
  },

  /* ──────────────────────────────
     MULTI-PERSONAJE
  ────────────────────────────── */
  {
    type: "sprite_select",
    message0: "🎭 seleccionar personaje %1",
    args0: [{ type: "input_value", name: "NAME", check: "String" }],
    previousStatement: null,
    nextStatement: null,
    colour: 45,
    tooltip: "Cambia el personaje activo. Los bloques siguientes operan sobre ese personaje.",
  },
  {
    type: "sprite_create_named",
    message0: "🧍 crear personaje %1  X %2  Y %3  ancho %4  alto %5  imagen/color %6",
    args0: [
      { type: "input_value", name: "NAME", check: "String" },
      { type: "input_value", name: "X",    check: "Number" },
      { type: "input_value", name: "Y",    check: "Number" },
      { type: "input_value", name: "W",    check: "Number" },
      { type: "input_value", name: "H",    check: "Number" },
      { type: "input_value", name: "IMG",  check: ["Colour","String"] },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 45,
    tooltip: "Crea un personaje con nombre. Puedes tener varios al mismo tiempo (jugador, enemigo, moneda…).",
  },
  {
    type: "sprite_draw_named",
    message0: "🖊️ dibujar personaje %1",
    args0: [{ type: "input_value", name: "NAME", check: "String" }],
    previousStatement: null,
    nextStatement: null,
    colour: 45,
    tooltip: "Dibuja el personaje con el nombre indicado.",
  },
  {
    type: "sprite_move_named",
    message0: "🏃 mover personaje %1  dx %2  dy %3",
    args0: [
      { type: "input_value", name: "NAME", check: "String" },
      { type: "input_value", name: "DX",   check: "Number" },
      { type: "input_value", name: "DY",   check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 45,
    tooltip: "Mueve el personaje indicado deltaX / deltaY píxeles.",
  },
  {
    type: "sprite_set_pos_named",
    message0: "📍 poner personaje %1  en X %2  Y %3",
    args0: [
      { type: "input_value", name: "NAME", check: "String" },
      { type: "input_value", name: "X",    check: "Number" },
      { type: "input_value", name: "Y",    check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 45,
    tooltip: "Teletransporta el personaje indicado a la posición X, Y.",
  },
  {
    type: "sprite_get_x_named",
    message0: "📐 posición X de %1",
    args0: [{ type: "input_value", name: "NAME", check: "String" }],
    output: "Number",
    colour: 45,
    tooltip: "Devuelve la coordenada X del personaje indicado.",
  },
  {
    type: "sprite_get_y_named",
    message0: "📐 posición Y de %1",
    args0: [{ type: "input_value", name: "NAME", check: "String" }],
    output: "Number",
    colour: 45,
    tooltip: "Devuelve la coordenada Y del personaje indicado.",
  },
  {
    type: "sprite_move_steps_named",
    message0: "👣 mover personaje %1  %2 pasos",
    args0: [
      { type: "input_value", name: "NAME",  check: "String" },
      { type: "input_value", name: "STEPS", check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 45,
    tooltip: "Mueve el personaje indicado hacia su ángulo actual.",
  },
  {
    type: "sprite_set_angle_named",
    message0: "🧭 ángulo de %1  %2 °",
    args0: [
      { type: "input_value", name: "NAME", check: "String" },
      { type: "input_value", name: "DEG",  check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 45,
    tooltip: "Pone el ángulo del personaje indicado (0°=derecha, 90°=arriba).",
  },
  {
    type: "sprite_get_angle_named",
    message0: "📐 ángulo de %1",
    args0: [{ type: "input_value", name: "NAME", check: "String" }],
    output: "Number",
    colour: 45,
    tooltip: "Devuelve el ángulo actual del personaje indicado.",
  },
  {
    type: "sprite_set_scale_named",
    message0: "🔍 escala de %1  %2",
    args0: [
      { type: "input_value", name: "NAME",  check: "String" },
      { type: "input_value", name: "SCALE", check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 45,
    tooltip: "Cambia el tamaño del personaje indicado (1=normal, 2=doble, 0.5=mitad).",
  },
  {
    type: "touching_sprite",
    message0: "💥 ¿ %1 toca a %2 ?",
    args0: [
      { type: "input_value", name: "A", check: "String" },
      { type: "input_value", name: "B", check: "String" },
    ],
    output: "Boolean",
    colour: 45,
    tooltip: "Verdadero si los dos personajes se están tocando (colisión AABB).",
  },
  {
    type: "distance_between",
    message0: "📐 distancia entre %1 y %2",
    args0: [
      { type: "input_value", name: "A", check: "String" },
      { type: "input_value", name: "B", check: "String" },
    ],
    output: "Number",
    colour: 45,
    tooltip: "Devuelve la distancia en píxeles entre los centros de dos personajes.",
  },
  {
    type: "touching_edge_named",
    message0: "🚧 ¿ %1 toca el borde?",
    args0: [{ type: "input_value", name: "NAME", check: "String" }],
    output: "Boolean",
    colour: 45,
    tooltip: "Verdadero si el personaje indicado tocó el límite del canvas.",
  },
]);

/* ══════════════════════════════════════════════════════════════
   GENERADORES JS — MULTI-PERSONAJE
   Se agregan aquí porque game_blocks.js ya carga antes que main.js.
══════════════════════════════════════════════════════════════ */


GAME_SPRITE_GROUPS.forEach((group) => {
  const type = `game_sprite_${group.key}`;
  Blockly.Blocks[type] = {
    init: function () {
      this.appendDummyInput()
        .appendField(`${group.icon} ${group.label}`)
        .appendField(new Blockly.FieldDropdown(gameImageOptions(group.images)), "IMG");
      this.setOutput(true, "String");
      this.setColour(160);
      this.setTooltip(`Elige un sprite del grupo "${group.label}" para usar en el juego.`);
    },
  };
  Blockly.Python[type] = function (block) {
    return ["'" + block.getFieldValue("IMG") + "'", Blockly.Python.ORDER_ATOMIC];
  };
  Blockly.JavaScript[type] = function (block) {
    return ["'" + block.getFieldValue("IMG") + "'", Blockly.JavaScript.ORDER_ATOMIC];
  };
});

/* ── Cartas de preguntas 📇 (las tarjetas y la hoja de respuestas están en
   cartas-data.js; las funciones, en cartas.js). Para programar tu propio
   juego de preguntas: sacar una carta y ver si la respuesta es la correcta
   (con las teclas A/B/C/D, o con 4 botones del ESP32 usando "leer Pin"). ── */
const GAME_CARD_LEVELS = [["Fácil", "facil"], ["Intermedio", "intermedio"], ["Difícil", "dificil"], ["Cualquiera", "todas"]];
Blockly.defineBlocksWithJsonArray([
  {
    type: "game_card_draw",
    message0: "📇 sacar carta nivel %1",
    args0: [{ type: "field_dropdown", name: "LEVEL", options: GAME_CARD_LEVELS }],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Saca una carta de preguntas al azar del nivel elegido (sin repetir hasta acabarlas) y la pone de fondo del juego.",
  },
  {
    type: "game_card_answer",
    message0: "📇 respuesta correcta de la carta",
    output: "String",
    colour: 20,
    tooltip: "La letra de la respuesta correcta de la carta que se sacó: a, b, c o d.",
  },
  {
    type: "game_card_is",
    message0: "📇 ¿la respuesta es %1 ?",
    args0: [{ type: "field_dropdown", name: "LETTER", options: [["a", "a"], ["b", "b"], ["c", "c"], ["d", "d"]] }],
    output: "Boolean",
    colour: 20,
    tooltip: "Verdadero si esa letra es la respuesta correcta de la carta que se sacó.",
  },
  {
    type: "game_card_options",
    message0: "📇 número de opciones de la carta",
    output: "Number",
    colour: 20,
    tooltip: "Cuántas opciones trae la carta que se sacó (3 o 4).",
  },
]);
Blockly.JavaScript["game_card_draw"] = function (block) {
  return "GameEngine.setBgImage(GameEngine.cartaSacar('" + block.getFieldValue("LEVEL") + "'));\n";
};
Blockly.JavaScript["game_card_answer"] = function () {
  return ["GameEngine.cartaCorrecta()", Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["game_card_is"] = function (block) {
  return ["(GameEngine.cartaCorrecta() === '" + block.getFieldValue("LETTER") + "')", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["game_card_options"] = function () {
  return ["GameEngine.cartaOpciones()", Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
// Solo funcionan en la vista Juego (como el resto de bloques de juego).
Blockly.Python["game_card_draw"] = function (block) {
  return "# [Juego] sacar carta nivel " + block.getFieldValue("LEVEL") + "\n";
};
Blockly.Python["game_card_answer"] = function () { return ["''", Blockly.Python.ORDER_ATOMIC]; };
Blockly.Python["game_card_is"] = function () { return ["False", Blockly.Python.ORDER_ATOMIC]; };
Blockly.Python["game_card_options"] = function () { return ["0", Blockly.Python.ORDER_ATOMIC]; };
