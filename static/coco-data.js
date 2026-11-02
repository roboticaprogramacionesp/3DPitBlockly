/* ══════════════════════════════════════════════════════════════
   coco-data.js — Cuestionarios de "¡Échale coco!" que vienen con la app
   (mismo formato que los que crean los docentes; ver coco-core.js).
   tipo: "opcion" (correcta = índice), "vf" (correcta = true/false) o
   "corta" (correcta = respuestas aceptadas separadas por |).
══════════════════════════════════════════════════════════════ */
const COCO_QUIZZES = [
  {
    id: "leds", icono: "💡", titulo: "LEDs y salidas",
    preguntas: [
      { tipo: "opcion", texto: "¿Qué estado hay que elegir en el bloque del LED para encenderlo?", opciones: ["on (1)", "off (0)", "alternar"], correcta: 0,
        explicacion: "**on** equivale a 1: el pin da 3.3 V y el LED prende." },
      { tipo: "vf", texto: "Un LED se puede conectar directo a un pin, sin resistencia, y no pasa nada.", correcta: false,
        explicacion: "Sin resistencia pasa demasiada corriente y puedes dañar el LED o el pin. Usa una de 220 Ω a 330 Ω." },
      { tipo: "opcion", texto: "¿Qué hace el bloque **alternar** del LED?", opciones: ["Lo apaga siempre", "Lo cambia: si estaba prendido lo apaga y si estaba apagado lo prende", "Lo hace parpadear solo para siempre"], correcta: 1 },
      { tipo: "opcion", texto: "¿En qué pin está el LED azul de la mayoría de las placas ESP32?", opciones: ["0", "2", "13", "34"], correcta: 1 },
      { tipo: "vf", texto: "La pata más larga del LED es la positiva (ánodo).", correcta: true,
        explicacion: "La larga va hacia el pin (+) y la corta hacia GND (−)." },
      { tipo: "opcion", texto: "¿Qué hace este código?", codigo: "led.value(1)\nsleep(1)\nled.value(0)",
        opciones: ["Prende el LED 1 segundo y lo apaga", "Prende el LED para siempre", "Parpadea una vez por segundo para siempre"], correcta: 0,
        explicacion: "No hay ciclo: pasa una sola vez." },
    ],
  },
  {
    id: "ciclos", icono: "🔁", titulo: "Ciclos y tiempo",
    preguntas: [
      { tipo: "opcion", texto: "¿Cuántas veces se imprime \"hola\"?", codigo: "for i in range(4):\n    print('hola')", opciones: ["3", "4", "5"], correcta: 1,
        explicacion: "**range(4)** da 0, 1, 2 y 3: cuatro vueltas." },
      { tipo: "opcion", texto: "¿Qué bloque usas para que algo se repita para siempre?", opciones: ["repetir 10 veces", "repetir mientras verdadero", "si … hacer"], correcta: 1 },
      { tipo: "vf", texto: "Sin un \"esperar\" dentro del ciclo, un LED que prende y apaga parece estar siempre prendido.", correcta: true,
        explicacion: "Cambia miles de veces por segundo y el ojo no alcanza a verlo." },
      { tipo: "corta", texto: "500 milisegundos, ¿cuántos segundos son? (escribe el número)", correcta: "0.5 | 0,5 | .5 | medio",
        explicacion: "1 segundo = 1000 milisegundos, así que 500 ms = 0.5 s." },
      { tipo: "opcion", texto: "¿Qué hace el bloque **romper el bucle**?", opciones: ["Reinicia la placa", "Sale del ciclo y sigue con lo que está debajo", "Borra el ciclo"], correcta: 1 },
      { tipo: "opcion", texto: "¿Qué números imprime?", codigo: "for i in range(1, 4):\n    print(i)", opciones: ["1 2 3", "1 2 3 4", "0 1 2 3"], correcta: 0,
        explicacion: "Empieza en 1 y se detiene ANTES de llegar a 4." },
    ],
  },
  {
    id: "logica", icono: "🔀", titulo: "Lógica y decisiones",
    preguntas: [
      { tipo: "opcion", texto: "Con **A y B**, el resultado es verdadero cuando…", opciones: ["A o B es verdadero", "A y B son verdaderos los dos", "A y B son falsos"], correcta: 1 },
      { tipo: "vf", texto: "**A o B** es verdadero si al menos uno de los dos es verdadero.", correcta: true },
      { tipo: "opcion", texto: "¿Qué da **no verdadero**?", opciones: ["verdadero", "falso", "un error"], correcta: 1 },
      { tipo: "opcion", texto: "Si temp vale 30, ¿qué imprime?", codigo: "if temp > 25:\n    print('calor')\nelse:\n    print('fresco')", opciones: ["calor", "fresco", "calor y fresco"], correcta: 0 },
      { tipo: "opcion", texto: "¿Para qué sirve el **si no** (else)?", opciones: ["Para lo que pasa cuando la condición es falsa", "Para repetir algo", "Para comparar dos números"], correcta: 0 },
      { tipo: "vf", texto: "5 == 5 da verdadero.", correcta: true,
        explicacion: "**==** compara; **=** guarda un valor en una variable." },
    ],
  },
  {
    id: "numeros", icono: "🔢", titulo: "Variables y números",
    preguntas: [
      { tipo: "opcion", texto: "¿Qué es una variable?", opciones: ["Un cable", "Un espacio con nombre para guardar un valor", "Un tipo de sensor"], correcta: 1 },
      { tipo: "opcion", texto: "¿Cuánto vale n al final?", codigo: "n = 0\nfor i in range(3):\n    n = n + 2", opciones: ["2", "3", "6"], correcta: 2,
        explicacion: "Suma 2 en cada una de las 3 vueltas: 0 + 2 + 2 + 2 = 6." },
      { tipo: "corta", texto: "¿Cuánto es 0b101 en decimal?", correcta: "5 | cinco",
        explicacion: "101 en binario = 4 + 0 + 1 = 5. Pruébalo en 🛠 Binario y hexadecimal." },
      { tipo: "opcion", texto: "¿Cuántos valores distintos caben en un byte (8 bits)?", opciones: ["8", "255", "256"], correcta: 2,
        explicacion: "Del 0 al 255: son 256 valores." },
      { tipo: "vf", texto: "0xFF y 255 son el mismo número.", correcta: true },
      { tipo: "corta", texto: "¿Qué letra da chr(65)?", correcta: "A",
        explicacion: "En la tabla ASCII, la A mayúscula es el 65." },
    ],
  },
  {
    id: "sensores", icono: "🌡️", titulo: "Sensores y lecturas",
    preguntas: [
      { tipo: "opcion", texto: "Una LDR sirve para medir…", opciones: ["temperatura", "luz", "distancia"], correcta: 1 },
      { tipo: "opcion", texto: "¿Qué rango de números devuelve read() del ADC del ESP32?", opciones: ["0 a 255", "0 a 1023", "0 a 4095"], correcta: 2,
        explicacion: "Es de 12 bits: 0 a 4095." },
      { tipo: "vf", texto: "Los pines 34, 35, 36 y 39 del ESP32 solo pueden ser entradas.", correcta: true,
        explicacion: "Sirven para leer sensores, pero no para prender un LED. Revisa 🛠 Mapa de pines." },
      { tipo: "opcion", texto: "Un botón conectado a GND con pull-up, ¿qué valor da cuando lo presionas?", opciones: ["1", "0", "3.3"], correcta: 1,
        explicacion: "El pull-up deja el pin en 1; al presionar se conecta a GND y se lee 0." },
      { tipo: "vf", texto: "Los pines ADC2 leen bien aunque el WiFi esté encendido.", correcta: false,
        explicacion: "Con WiFi encendido usa pines ADC1 (32 a 39)." },
      { tipo: "opcion", texto: "El sensor HC-SR04 mide la distancia usando…", opciones: ["luz infrarroja", "ultrasonido", "imanes"], correcta: 1 },
    ],
  },
  {
    id: "electronica", icono: "⚡", titulo: "Electrónica básica",
    preguntas: [
      { tipo: "opcion", texto: "Según la ley de Ohm, V = …", opciones: ["I + R", "I × R", "I ÷ R"], correcta: 1 },
      { tipo: "opcion", texto: "¿Con qué voltaje trabajan los pines del ESP32?", opciones: ["1.5 V", "3.3 V", "12 V"], correcta: 1 },
      { tipo: "opcion", texto: "Para un LED rojo con 5 V y 10 mA, ¿qué resistencia comercial conviene?", opciones: ["10 Ω", "330 Ω", "100 kΩ"], correcta: 1,
        explicacion: "(5 − 2) ÷ 0.010 = 300 Ω; la comercial siguiente es 330 Ω. Compruébalo en 🛠 Resistencias." },
      { tipo: "corta", texto: "Una resistencia rojo-rojo-marrón, ¿cuántos ohms tiene? (solo el número)", correcta: "220 | 220 ohms | 220 ohm | 220Ω | 220 Ω",
        explicacion: "Rojo = 2, rojo = 2, marrón = × 10 → 220 Ω." },
      { tipo: "vf", texto: "GND es la tierra: el 0 V que deben compartir la placa y los módulos.", correcta: true },
      { tipo: "opcion", texto: "¿Para qué sirve un divisor de voltaje?", opciones: ["Para subir el voltaje", "Para bajar un voltaje (por ejemplo de 5 V a 3.3 V)", "Para medir la corriente"], correcta: 1 },
    ],
  },
  {
    id: "protocolos", icono: "🔌", titulo: "Protocolos de comunicación",
    preguntas: [
      { tipo: "opcion", texto: "¿Cuántos cables de datos usa I2C?", opciones: ["1", "2", "4"], correcta: 1,
        explicacion: "SDA (datos) y SCL (reloj), más GND y VCC." },
      { tipo: "vf", texto: "En UART, el TX de un aparato se conecta al TX del otro.", correcta: false,
        explicacion: "Se cruzan: TX → RX y RX → TX." },
      { tipo: "opcion", texto: "¿Qué protocolo usan la pantalla TFT y el lector RFID?", opciones: ["SPI", "I2C", "OneWire"], correcta: 0 },
      { tipo: "opcion", texto: "¿Qué protocolo usa el sensor de temperatura DS18B20?", opciones: ["UART", "OneWire", "I2S"], correcta: 1 },
      { tipo: "opcion", texto: "¿Para qué sirve I2S?", opciones: ["Para pantallas", "Para audio digital (micrófonos, bocinas)", "Para WiFi"], correcta: 1 },
      { tipo: "corta", texto: "La pantalla OLED casi siempre tiene la dirección I2C 0x__ (escribe lo que va después de 0x)", correcta: "3C | 0x3C | 60",
        explicacion: "0x3C = 60 en decimal. Compruébalo con 🛠 Escáner I2C." },
    ],
  },
  {
    id: "pantallas", icono: "🖥", titulo: "Pantallas y luces",
    preguntas: [
      { tipo: "opcion", texto: "¿Qué pantalla muestra texto en 2 renglones de 16 caracteres?", opciones: ["LCD 16x2", "OLED 128x64", "Matriz 8x8"], correcta: 0 },
      { tipo: "vf", texto: "En una NeoPixel, el color negro es un LED apagado.", correcta: true },
      { tipo: "opcion", texto: "En la OLED de 128×64, ¿dónde queda x = 0, y = 0?", opciones: ["En el centro", "En la esquina de arriba a la izquierda", "Abajo a la derecha"], correcta: 1 },
      { tipo: "opcion", texto: "¿Cuántos caracteres propios puedes guardar en una LCD?", opciones: ["2", "8", "100"], correcta: 1,
        explicacion: "Del 0 al 7. Dibújalos con 🛠 Caracteres para LCD." },
      { tipo: "vf", texto: "Después de dibujar en una NeoPixel hay que usar \"mostrar\" para que se vea.", correcta: true },
      { tipo: "opcion", texto: "El TM1637 es un display de…", opciones: ["4 dígitos de 7 segmentos", "colores RGB", "tinta electrónica"], correcta: 0 },
    ],
  },
  {
    id: "inalambrico", icono: "📡", titulo: "Conexiones inalámbricas",
    preguntas: [
      { tipo: "opcion", texto: "¿Cuál permite que dos ESP32 se hablen sin router?", opciones: ["WiFi", "ESP-NOW", "UART"], correcta: 1 },
      { tipo: "vf", texto: "El ESP32 C3 tiene Bluetooth clásico.", correcta: false,
        explicacion: "El C3 y el S3 solo tienen BLE (Bluetooth de bajo consumo)." },
      { tipo: "opcion", texto: "Para que el ESP32 muestre una página web en el celular usas…", opciones: ["WiFi", "OneWire", "I2S"], correcta: 0 },
      { tipo: "opcion", texto: "¿Qué gasta menos batería?", opciones: ["WiFi", "BLE (Bluetooth de bajo consumo)", "Los dos igual"], correcta: 1 },
      { tipo: "opcion", texto: "En ESP-NOW, ¿con qué se identifica cada ESP32?", opciones: ["Con su dirección MAC", "Con su nombre", "Con su contraseña"], correcta: 0 },
      { tipo: "vf", texto: "Un portal cautivo es una red WiFi que crea el ESP32 y que abre una página al conectarte.", correcta: true },
    ],
  },
].map((q) => Object.assign({ formato: "3dpit-quiz", version: 1, mostrarRespuestas: true, descripcion: "" }, q));
