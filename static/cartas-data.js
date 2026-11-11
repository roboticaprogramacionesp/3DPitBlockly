/* ══════════════════════════════════════════════════════════════
   cartas-data.js — Tarjetas de preguntas (static/img/cartas/N.jpg: copia
   liviana de static/img/preguntas/, 2.6 MB en vez de 10 MB).
   Las usan el juego de cartas (static/cartas.js) y los bloques 📇 de la
   vista Juego.

   [número, nivel, opciones, correcta, tema]
     número:   el de la pregunta impresa en la tarjeta (= nombre del archivo)
     nivel:    "facil" | "intermedio" | "dificil" (color de la etiqueta)
     opciones: cuántas trae la tarjeta (a, b, c, d)
     correcta: índice de la correcta (0 = a), o:
               - un texto: respuesta abierta (la tarjeta no trae opciones;
                 se muestra la respuesta y quien juega dice si acertó)
               - null: la tarjeta tiene un error y ninguna opción es
                 correcta; queda fuera del juego hasta corregirla.
   La hoja de respuestas se armó resolviendo cada tarjeta; NOTAS explica
   las que tienen algún detalle.
══════════════════════════════════════════════════════════════ */
const CARTAS = [
  [1, "facil", 4, 2, "Perímetro"], [2, "facil", 4, 1, "Perímetro"],
  [3, "facil", 4, 2, "Perímetro"], [4, "facil", 4, 2, "Perímetro"],
  [5, "facil", 4, 2, "Área"], [6, "facil", 4, 1, "Área"],
  [7, "facil", 4, 2, "Área"], [8, "facil", 4, 2, "Área"],
  [9, "intermedio", 4, 1, "Perímetro"], [10, "intermedio", 4, 2, "Perímetro"],
  [11, "intermedio", 4, 1, "Perímetro"], [12, "intermedio", 4, 2, "Perímetro"],
  [13, "intermedio", 4, 0, "Área"], [14, "intermedio", 4, 1, "Área"],
  [15, "intermedio", 4, 1, "Área"], [16, "intermedio", 4, 2, "Área"],
  [17, "dificil", 4, 3, "Perímetro"], [18, "dificil", 4, 2, "Perímetro"],
  [19, "dificil", 4, 1, "Perímetro"], [20, "dificil", 4, 2, "Perímetro"],
  [21, "dificil", 4, 0, "Área"], [22, "dificil", 4, 1, "Área"],
  [23, "dificil", 4, 0, "Área"], [24, "dificil", 4, 1, "Área"],
  [25, "intermedio", 4, 1, "Decimales"], [26, "intermedio", 4, 2, "Decimales"],
  [27, "intermedio", 4, 3, "Decimales"], [28, "intermedio", 4, 0, "Decimales"],
  [29, "intermedio", 4, 3, "Decimales"], [30, "intermedio", 4, 0, "Decimales"],
  [31, "facil", 4, 3, "Decimales"], [32, "intermedio", 4, 2, "Decimales"],
  [33, "intermedio", 4, 1, "Fracciones"], [34, "intermedio", 4, 1, "Fracciones"],
  [35, "intermedio", 4, 1, "Fracciones"], [36, "dificil", 4, 0, "Fracciones"],
  [37, "dificil", 4, 3, "Fracciones"], [38, "dificil", 4, 2, "Fracciones"],
  [39, "dificil", 4, 1, "Fracciones"], [40, "dificil", 4, 1, "Área"],
  [41, "intermedio", 4, 2, "Área"], [42, "facil", 4, 3, "Área"],
  [43, "intermedio", 4, 0, "Área"], [44, "intermedio", 4, 0, "Área"],
  [45, "intermedio", 4, 0, "Perímetro"], [46, "dificil", 4, 3, "Área"],
  [47, "facil", 4, 2, "Área"], [48, "intermedio", 0, "a) 3/8   b) 0.4", "Fracciones"],
  [49, "intermedio", 0, "α = 135°", "Ángulos"], [50, "facil", 3, 0, "Fórmulas"],
  [51, "facil", 3, 1, "Fórmulas"], [52, "facil", 3, 0, "Fórmulas"],
  [53, "facil", 4, 1, "Medición"], [54, "dificil", 4, 2, "Decimales"],
  [55, "facil", 4, 2, "Porcentajes"], [56, "facil", 4, 2, "Ecuaciones"],
  [57, "facil", 3, 1, "Ciencias"], [58, "facil", 3, 2, "Ciencias"],
  [59, "facil", 3, 0, "Ciencias"], [60, "facil", 3, 1, "Ciencias"],
  [61, "intermedio", 3, 1, "Ciencias"], [62, "intermedio", 3, 0, "Ciencias"],
  [63, "intermedio", 3, 1, "Ciencias"], [64, "facil", 3, 2, "Ciencias"],
  [65, "facil", 3, 1, "Ciencias"], [66, "intermedio", 3, 1, "Ciencias"],
  [67, "dificil", 3, 2, "Ciencias"], [68, "dificil", 3, 0, "Ciencias"],
].map(([numero, nivel, opciones, correcta, tema]) => ({
  archivo: numero, pregunta: numero, nivel, opciones, correcta, tema, img: `static/img/cartas/${numero}.jpg`,
}));

// Tarjetas con algún detalle (número → nota). Las de "null" quedan fuera del juego.
const CARTAS_NOTAS = {
  40: "El texto dice 10 cm por lado pero el dibujo dice 30 m y las opciones están en m²; se toma 10 × 10 = 100.",
  41: "No dice cuánto mide de ancho; las opciones usan 45 m.",
  45: "Pregunta metros recorridos pero las opciones dicen m²; 6 × 26 × 5 = 780.",
  48: "No trae opciones: 0.375 = 3/8 y 2/5 = 0.4.",
  49: "No trae opciones: α = 180° − 45° = 135°.",
};
