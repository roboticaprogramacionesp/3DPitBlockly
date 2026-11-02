/* ══════════════════════════════════════════════════════════════
   cartas-data.js — Tarjetas de preguntas (static/img/cartas/N.jpg: copia
   liviana de static/img/preguntas/, 2.6 MB en vez de 10 MB).
   Las usan el juego de cartas (static/cartas.js) y los bloques 🃏 de la
   vista Juego.

   [archivo, pregunta, nivel, opciones, correcta, tema]
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
  [1, 1, "facil", 4, 2, "Perímetro"], [2, 2, "facil", 4, 1, "Perímetro"],
  [3, 11, "intermedio", 4, 1, "Perímetro"], [4, 12, "intermedio", 4, 2, "Perímetro"],
  [5, 13, "intermedio", 4, 0, "Área"], [6, 14, "intermedio", 4, 1, "Área"],
  [7, 15, "intermedio", 4, 1, "Área"], [8, 16, "intermedio", 4, 2, "Área"],
  [9, 17, "dificil", 4, 3, "Perímetro"], [10, 18, "dificil", 4, 2, "Perímetro"],
  [11, 19, "dificil", 4, 1, "Perímetro"], [12, 20, "dificil", 4, 2, "Perímetro"],
  [13, 3, "facil", 4, 2, "Perímetro"], [14, 21, "dificil", 4, 0, "Área"],
  [15, 22, "dificil", 4, 1, "Área"], [16, 23, "dificil", 4, 0, "Área"],
  [17, 24, "dificil", 4, 1, "Área"], [18, 25, "intermedio", 4, 1, "Decimales"],
  [19, 26, "intermedio", 4, 2, "Decimales"], [20, 27, "intermedio", 4, 3, "Decimales"],
  [21, 28, "intermedio", 4, 0, "Decimales"], [22, 29, "intermedio", 4, 3, "Decimales"],
  [23, 30, "intermedio", 4, 0, "Decimales"], [24, 4, "facil", 4, 2, "Perímetro"],
  [25, 31, "facil", 4, 3, "Decimales"], [26, 32, "intermedio", 4, 2, "Decimales"],
  [27, 33, "intermedio", 4, 1, "Fracciones"], [28, 34, "intermedio", 4, 1, "Fracciones"],
  [29, 35, "intermedio", 4, null, "Fracciones"], [30, 36, "dificil", 4, null, "Fracciones"],
  [31, 37, "dificil", 4, null, "Fracciones"], [32, 38, "dificil", 4, null, "Fracciones"],
  [33, 39, "dificil", 4, null, "Fracciones"], [34, 40, "dificil", 4, 1, "Área"],
  [35, 5, "facil", 4, 2, "Área"], [36, 41, "intermedio", 4, 2, "Área"],
  [37, 42, "facil", 4, 3, "Área"], [38, 43, "intermedio", 4, 0, "Área"],
  [39, 44, "intermedio", 4, 0, "Área"], [40, 45, "intermedio", 4, 0, "Perímetro"],
  [41, 46, "dificil", 4, 3, "Área"], [42, 47, "facil", 4, 2, "Área"],
  [43, 48, "intermedio", 0, "a) 3/8   b) 0.4", "Fracciones"], [44, 49, "intermedio", 0, "α = 135°", "Ángulos"],
  [45, 50, "facil", 3, 0, "Fórmulas"], [46, 6, "facil", 4, 1, "Área"],
  [47, 51, "facil", 3, 1, "Fórmulas"], [48, 52, "facil", 3, 0, "Fórmulas"],
  [49, 53, "facil", 4, 1, "Medición"], [50, 54, "dificil", 4, 2, "Decimales"],
  [51, 55, "facil", 4, 2, "Porcentajes"], [52, 56, "facil", 4, 2, "Ecuaciones"],
  [53, 57, "facil", 3, 1, "Ciencias"], [54, 58, "facil", 3, 2, "Ciencias"],
  [55, 59, "facil", 3, 0, "Ciencias"], [56, 60, "facil", 3, 1, "Ciencias"],
  [57, 7, "facil", 4, 2, "Área"], [58, 61, "intermedio", 3, 1, "Ciencias"],
  [59, 62, "intermedio", 3, 0, "Ciencias"], [60, 63, "intermedio", 3, 1, "Ciencias"],
  [61, 64, "facil", 3, 2, "Ciencias"], [62, 65, "facil", 3, 1, "Ciencias"],
  [63, 66, "intermedio", 3, 1, "Ciencias"], [64, 67, "dificil", 3, 2, "Ciencias"],
  [65, 68, "dificil", 3, 0, "Ciencias"], [66, 8, "facil", 4, 2, "Área"],
  [67, 9, "intermedio", 4, 1, "Perímetro"], [68, 10, "intermedio", 4, 2, "Perímetro"],
].map(([archivo, pregunta, nivel, opciones, correcta, tema]) => ({
  archivo, pregunta, nivel, opciones, correcta, tema, img: `static/img/cartas/${archivo}.jpg`,
}));

// Tarjetas con algún detalle (archivo → nota). Las de "null" quedan fuera del juego.
const CARTAS_NOTAS = {
  29: "La flecha marca 4 y ninguna opción vale 4 (10/2 = 5, 18/4 = 4.5, 5/4, 18/6 = 3).",
  30: "7/10 + 3/5 + 5/6 = 64/30 (= 32/15), que no está entre las opciones.",
  31: "13/5 + 4/5 − 25/8 = 11/40 m, que no está entre las opciones (y dice kg en vez de m).",
  32: "4/5 litros menos 3/2 y 1/3 da negativo: se toma más jugo del que había.",
  33: "13 × 2/3 − 20/6 − 7/4 = 43/12 kg, que no está entre las opciones.",
  34: "El texto dice 10 cm por lado pero el dibujo dice 30 m y las opciones están en m²; se toma 10 × 10 = 100.",
  36: "No dice cuánto mide de ancho; las opciones usan 45 m.",
  40: "Pregunta metros recorridos pero las opciones dicen m²; 6 × 26 × 5 = 780.",
  43: "No trae opciones: 0.375 = 3/8 y 2/5 = 0.4.",
  44: "No trae opciones: α = 180° − 45° = 135°.",
};
