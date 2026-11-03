// Datos de cada diagrama de "Conexiones eléctricas" (los usa generar.js).
//
//   archivo:     nombre del .svg en static/img/conexiones/
//   tutoriales:  claves de TUTORIALS (static/tutorial-steps.js) que lo muestran
//   modulos:     { id, tipo (componente del simulador o genérico), etiqueta
//                  (nombre corto en la tabla), material (nombre en la lista) }
//   conexiones:  [desde, hasta, opciones]
//                "IO21", "3V3", "5V", "GND" → pin de la placa (GND/5V elige el
//                más cómodo); "m.vcc" → pin "vcc" del módulo "m".
//                opciones: { r: "220 Ω" } resistencia en el cable,
//                          { color } para forzar el color.
//   nota:        aviso corto (cuidados, voltaje…)
//
// Los pines son los de los tutoriales; si cambias uno aquí, cámbialo también
// en el tutorial.
const USB = { color: "#495057", ocultar: true };
const PC = { id: "pc", tipo: "pc", etiqueta: "PC", sinMaterial: true };
const SOLO_PLACA = "No necesitas conectar módulos: conecta la placa a la computadora con el cable USB.";

module.exports = [
  // ── LEDs y salidas ──
  {
    archivo: "led", titulo: "LED", tutoriales: ["led_basico", "led_infinito", "wifi_ntfy_led"],
    modulos: [
      // Polaridad: + ánodo (pata larga) y − cátodo (pata corta, lado plano).
      { id: "l", tipo: "led", etiqueta: "LED", material: "LED (opcional, el ESP32 trae uno en IO2)",
        pos: [150, 262], marcas: [[29, 30, "+", 11, "#e03131"], [-9, 30, "−", 11, "#1c7ed6"]] },
      { id: "r", tipo: "resistencia", etiqueta: "Resistencia", material: "Resistencia de 220 Ω", dir: { term1: 2, term2: 0 }, pos: [196, 316] },
    ],
    conexiones: [["l.anodo", "r.term1", { color: "#f08c00" }], ["r.term2", "IO2", { color: "#f08c00" }], ["l.catodo", "GND"]],
    nombresPin: { "l.anodo": "+ ánodo (pata larga)", "l.catodo": "− cátodo (pata corta)", "r.term1": "pata 1", "r.term2": "pata 2" },
    nota: "La placa ya trae un LED en IO2: no hace falta conectar nada. Para uno externo cuida la polaridad: la pata larga (+) va hacia la resistencia y la corta (−, lado plano) a GND.",
  },
  {
    archivo: "semaforo", titulo: "Semáforo", tutoriales: ["semaforo"],
    modulos: [{ id: "t", tipo: "semaforo_kit", etiqueta: "Semáforo", material: "Módulo semáforo" }],
    conexiones: [["t.r", "IO23", { color: "#e03131" }], ["t.y", "IO19", { color: "#fab005" }], ["t.g", "IO18", { color: "#2f9e44" }], ["t.gnd", "GND"]],
  },
  {
    archivo: "boton", titulo: "Botón", tutoriales: ["boton"],
    modulos: [{ id: "b", tipo: "ky_004", etiqueta: "KY-004", material: "Módulo botón KY-004" }],
    conexiones: [["b.senal", "IO12"], ["b.vcc", "3V3"], ["b.gnd", "GND"]],
    nota: "Usa el modo PULL_UP: el pin lee 0 cuando presionas el botón. Alimenta el módulo con 3V3, no con 5V.",
  },
  {
    archivo: "buzzer", titulo: "Buzzer", tutoriales: ["buzzer"],
    modulos: [{ id: "z", tipo: "buzzer", etiqueta: "Buzzer", material: "Buzzer" }],
    conexiones: [["z.s", "IO12"], ["z.gnd", "GND"]],
    nombresPin: { "z.s": "S (+)", "z.gnd": "−" },
    nota: "Un buzzer activo suena con on/off; uno pasivo necesita una nota (PWM).",
  },
  {
    archivo: "servo", titulo: "Servo Motor", tutoriales: ["servo"],
    modulos: [{ id: "m", tipo: "sg90", etiqueta: "Servo", material: "Servo SG90" }],
    conexiones: [["m.signal", "IO13", { color: "#f08c00" }], ["m.vcc", "5V"], ["m.gnd", "GND", { color: "#795548" }]],
    nombresPin: { "m.signal": "naranja (señal)", "m.vcc": "rojo", "m.gnd": "café" },
    nota: "Si el servo vibra sin moverse, aliméntalo con 5V externos y une los GND.",
  },
  {
    archivo: "neopixel", titulo: "NeoPixel RGB", tutoriales: ["neopixel_basico"],
    modulos: [{ id: "n", tipo: "neopixel_ring", etiqueta: "NeoPixel", material: "Anillo / tira NeoPixel" }],
    conexiones: [["n.vcc", "5V"], ["n.din", "IO4"], ["n.gnd", "GND"]],
    nota: "Con más de 8 LEDs a brillo alto usa una fuente de 5V externa y une los GND.",
  },
  {
    archivo: "neopixel_matriz", titulo: "Matriz NeoPixel 5x5", tutoriales: ["neopixel_matriz"],
    modulos: [{ id: "n", tipo: "np5x5", etiqueta: "Matriz", material: "Matriz NeoPixel 5x5" }],
    conexiones: [["n.5v", "5V"], ["n.din", "IO5"], ["n.gnd", "GND"]],
    nota: "Empieza con brillo bajo (20-30 %) para no gastar demasiada corriente.",
  },
  {
    archivo: "neopixel_matriz_8x8", titulo: "Matriz NeoPixel 8x8", tutoriales: ["neopixel_matriz_8x8"],
    modulos: [{ id: "n", tipo: "neopixel_matrix", etiqueta: "Matriz", material: "Matriz NeoPixel 8x8" }],
    conexiones: [["n.vcc", "5V"], ["n.din", "IO5"], ["n.gnd", "GND"]],
    nota: "64 LEDs consumen mucho: usa brillo bajo o una fuente de 5V externa. Si usas otro pin de datos, cámbialo en el bloque.",
  },
  {
    archivo: "ky-005", titulo: "Emisor Infrarrojo (KY-005)", tutoriales: ["ir_tx_ky005"],
    modulos: [{ id: "e", tipo: "ky005", etiqueta: "KY-005", material: "Emisor infrarrojo KY-005" }],
    conexiones: [["e.s", "IO4"], ["e.vcc", "3V3"], ["e.gnd", "GND"]],
    nombresPin: { "e.vcc": "+", "e.gnd": "−" },
  },
  {
    archivo: "relevador", titulo: "Relevador (Relay)", tutoriales: ["relevador"],
    modulos: [{ id: "r", tipo: "ky-019", etiqueta: "Relevador", material: "Módulo relevador KY-019" }],
    conexiones: [["r.s", "IO26"], ["r.vcc", "5V"], ["r.gnd", "GND"]],
    nota: "Del lado COM / NO / NC va la carga. ¡Cuidado con 127 V: pide ayuda a un adulto!",
  },
  // ── Motores ──
  {
    archivo: "stepper", titulo: "Motor Paso a Paso (28BYJ-48)", tutoriales: ["stepper_motor"],
    modulos: [{ id: "m", tipo: "28byj", etiqueta: "ULN2003", material: "Motor 28BYJ-48 con driver ULN2003" }],
    conexiones: [["m.in1", "IO26"], ["m.in2", "IO25"], ["m.in3", "IO17"], ["m.in4", "IO16"], ["m.vcc", "5V"], ["m.gnd", "GND"]],
    nota: "El motor consume bastante: mejor con una fuente de 5V externa y los GND unidos.",
  },
  {
    archivo: "puente_h", titulo: "Puente H — Motores DC", tutoriales: ["puente_h"],
    modulos: [
      { id: "h", tipo: "l298n", etiqueta: "L298N", material: "Puente H L298N", pos: [88.28, -270] },
      { id: "a", tipo: "motor", etiqueta: "Motor A", material: "Motor DC", pos: [-141.72, -190] },
      { id: "b", tipo: "motor", etiqueta: "Motor B", material: "Motor DC", pos: [298.28, -210] },
      { id: "p", tipo: "battery_18650", etiqueta: "Batería", material: "Batería (pila 18650 o 7-12 V)", pos: [-261.72, -30] },
    ],
    conexiones: [
      ["h.in1", "IO26"], ["h.in2", "IO25"], ["h.in3", "IO17"], ["h.in4", "IO16"], ["h.power_gnd", "GND"],
      ["p.vcc", "h.power_12v", { color: "#e03131" }], ["p.gnd", "h.power_gnd"],
      ["a.pin1", "h.out1", { color: "#7048e8" }], ["a.pin2", "h.out2", { color: "#7048e8" }],
      ["b.pin1", "h.out3", { color: "#0b7285" }], ["b.pin2", "h.out4", { color: "#0b7285" }],
    ],
    nombresPin: { "h.power_gnd": "GND", "h.power_12v": "+12V", "p.vcc": "+", "p.gnd": "−" },
    nota: "No alimentes los motores desde el ESP32: usa la batería y une su GND con el del ESP32.",
  },
  {
    archivo: "carrito", titulo: "Carrito Esquiva Obstáculos", tutoriales: ["carrito_esquiva_obstaculos"],
    modulos: [
      { id: "h", tipo: "l298n", etiqueta: "L298N", material: "Puente H L298N", pos: [88.28, -270] },
      { id: "a", tipo: "motor", etiqueta: "Motor izq.", material: "Motor DC", pos: [-141.72, -190] },
      { id: "b", tipo: "motor", etiqueta: "Motor der.", material: "Motor DC", pos: [298.28, -210] },
      { id: "p", tipo: "battery_18650", etiqueta: "Batería", material: "Batería (pila 18650 o 7-12 V)", pos: [-261.72, -30] },
      { id: "u", tipo: "hcsr04", etiqueta: "HC-SR04", material: "Sensor ultrasónico HC-SR04" },
    ],
    conexiones: [
      ["u.vcc", "5V"], ["u.trig", "IO12"], ["u.echo", "IO13"], ["u.gnd", "GND"],
      ["h.in1", "IO26"], ["h.in2", "IO25"], ["h.in3", "IO17"], ["h.in4", "IO16"], ["h.power_gnd", "GND"],
      ["p.vcc", "h.power_12v", { color: "#e03131" }], ["p.gnd", "h.power_gnd"],
      ["a.pin1", "h.out1", { color: "#7048e8" }], ["a.pin2", "h.out2", { color: "#7048e8" }],
      ["b.pin1", "h.out3", { color: "#0b7285" }], ["b.pin2", "h.out4", { color: "#0b7285" }],
    ],
    nombresPin: { "h.power_gnd": "GND", "h.power_12v": "+12V", "p.vcc": "+", "p.gnd": "−" },
    nota: "Une el GND de la batería, del L298N y del ESP32. Los motores se alimentan de la batería.",
  },
  // ── Sensores ──
  {
    archivo: "ultrasonico", titulo: "Sensor Ultrasónico (HC-SR04)", tutoriales: ["ultrasonico"],
    modulos: [{ id: "u", tipo: "hcsr04", etiqueta: "HC-SR04", material: "Sensor ultrasónico HC-SR04" }],
    conexiones: [["u.vcc", "5V"], ["u.trig", "IO12"], ["u.echo", "IO13"], ["u.gnd", "GND"]],
    nota: "TRIG manda el pulso y ECHO lo recibe: no los inviertas.",
  },
  {
    archivo: "medidor_estatura", titulo: "Medidor de Estatura", tutoriales: ["medidor_estatura"],
    modulos: [
      { id: "u", tipo: "hcsr04", etiqueta: "HC-SR04", material: "Sensor ultrasónico HC-SR04" },
      { id: "t", tipo: "touch", etiqueta: "Aluminio", material: "Cable con papel aluminio (botón táctil)" },
    ],
    conexiones: [["u.vcc", "5V"], ["u.trig", "IO12"], ["u.echo", "IO13"], ["u.gnd", "GND"], ["t.touch", "IO4"]],
    nota: "Pon el sensor arriba mirando hacia el piso. Toca el aluminio para medir.",
  },
  {
    archivo: "infrarrojo", titulo: "Sensor Infrarrojo — Detectar Línea", tutoriales: ["infrarrojo_basico"],
    modulos: [{ id: "s", tipo: "tcrt5000", etiqueta: "Sensor IR", material: "Sensor infrarrojo TCRT5000" }],
    conexiones: [["s.do", "IO12"], ["s.vcc", "3V3"], ["s.gnd", "GND"]],
    nombresPin: { "s.do": "OUT (DO)" },
    nota: "Gira el potenciómetro del módulo hasta que su LED cambie entre negro y blanco.",
  },
  {
    archivo: "adkeypad", titulo: "Teclado Analógico (ADKey)", tutoriales: ["analogico_adkey"],
    modulos: [{ id: "k", tipo: "adkey_real", etiqueta: "ADKey", material: "Teclado analógico ADKey" }],
    conexiones: [["k.out", "IO35"], ["k.vcc", "3V3"], ["k.gnd", "GND"]],
    nota: "Usa un pin analógico (34, 35, 36 o 39): esos pines solo leen.",
  },
  {
    archivo: "ky-022", titulo: "Receptor Infrarrojo (KY-022)", tutoriales: ["ir_ky022"],
    modulos: [{ id: "r", tipo: "ky-022", etiqueta: "KY-022", material: "Receptor infrarrojo KY-022 + control" }],
    conexiones: [["r.s", "IO16"], ["r.vcc", "3V3"], ["r.gnd", "GND"]],
    nota: "El lente negro debe apuntar hacia el control remoto.",
  },
  {
    archivo: "dht11", titulo: "DHT11 — Temperatura y Humedad", tutoriales: ["dht11"],
    modulos: [{ id: "s", tipo: "dht11", etiqueta: "DHT11", material: "Sensor DHT11 (KY-015)" }],
    conexiones: [["s.signal", "IO4"], ["s.vcc", "3V3"], ["s.gnd", "GND"]],
    nota: "Si usas el sensor sin placa (4 patas), pon una resistencia de 10 kΩ entre DATA y 3V3.",
  },
  {
    archivo: "ky-001", titulo: "KY-001 — Temperatura DS18B20", tutoriales: ["ky001"],
    modulos: [{ id: "s", tipo: "ky_001", etiqueta: "KY-001", material: "Sensor KY-001 (DS18B20)" }],
    conexiones: [["s.signal", "IO4"], ["s.vcc", "3V3"], ["s.gnd", "GND"]],
    nota: "Siempre a 3V3, nunca a 5V.",
  },
  {
    archivo: "encoder_ky040", titulo: "Encoder Rotatorio (KY-040)", tutoriales: ["encoder_rotatorio"],
    modulos: [{ id: "e", tipo: "ky040", etiqueta: "KY-040", material: "Encoder rotatorio KY-040" }],
    conexiones: [["e.gnd", "GND"], ["e.vcc", "3V3"], ["e.dt", "IO19"], ["e.clk", "IO18"]],
    nombresPin: { "e.vcc": "+" },
    nota: "El pin SW es el botón del eje: no lo usamos en este tutorial.",
  },
  {
    archivo: "flujo_agua", titulo: "Sensor de Flujo de Agua (YF-201)", tutoriales: ["flujo_agua"],
    modulos: [{ id: "f", tipo: "yf201", etiqueta: "YF-201", material: "Sensor de flujo YF-201" }],
    conexiones: [["f.vcc", "5V"], ["f.gnd", "GND"], ["f.senal", "IO27", { color: "#fab005" }]],
    nombresPin: { "f.vcc": "rojo", "f.gnd": "negro", "f.senal": "amarillo" },
    nota: "La flecha del sensor indica hacia dónde debe correr el agua.",
  },
  {
    archivo: "inmp441", titulo: "Micrófono INMP441", tutoriales: ["inmp441_microfono"],
    modulos: [{ id: "m", tipo: "inmp441", etiqueta: "INMP441", material: "Micrófono INMP441 (I2S)" }],
    conexiones: [["m.sck", "IO26"], ["m.ws", "IO25"], ["m.lr", "GND"], ["m.sd", "IO32"], ["m.vdd", "3V3"], ["m.gnd", "GND"]],
    nota: "L/R a GND elige el canal izquierdo. Siempre a 3V3.",
  },
  // ── I2C ──
  {
    archivo: "oled", titulo: "Display OLED (SSD1306 / SH1106)", tutoriales: ["oled_display", "sh1106_display"],
    modulos: [{ id: "d", tipo: "oled", etiqueta: "OLED", material: "Pantalla OLED 0.96\" I2C" }],
    conexiones: [["d.gnd", "GND"], ["d.vdd", "3V3"], ["d.sck", "IO22"], ["d.sda", "IO21"]],
    nombresPin: { "d.sck": "SCL" },
    nota: "Siempre a 3V3, nunca a 5V. Dirección I2C: 0x3C.",
  },
  {
    archivo: "lcd_i2c", titulo: "LCD 16x2 I2C", tutoriales: ["lcd_i2c_display"],
    modulos: [{ id: "d", tipo: "lcd_16x2_i2c", etiqueta: "LCD", material: "LCD 16x2 con módulo I2C" }],
    conexiones: [["d.gnd", "GND"], ["d.vcc", "5V"], ["d.sda", "IO21"], ["d.scl", "IO22"]],
    nota: "Si enciende pero no se ve texto, gira el potenciómetro azul (contraste).",
  },
  {
    archivo: "rtc_ds3231", titulo: "Reloj RTC DS3231", tutoriales: ["rtc_ds3231"],
    modulos: [{ id: "r", tipo: "ds3231", etiqueta: "DS3231", material: "Reloj RTC DS3231" }],
    conexiones: [["r.gnd", "GND"], ["r.vcc", "3V3"], ["r.sda", "IO21"], ["r.scl", "IO22"]],
    nota: "Con su pila puesta, guarda la hora aunque desconectes la placa.",
  },
  {
    archivo: "mpu6050", titulo: "Giroscopio / Acelerómetro MPU6050", tutoriales: ["mpu6050_imu"],
    modulos: [{ id: "m", tipo: "mpu6050", etiqueta: "MPU6050", material: "Módulo MPU6050" }],
    conexiones: [["m.vcc", "3V3"], ["m.gnd", "GND"], ["m.scl", "IO22"], ["m.sda", "IO21"]],
    nota: "Siempre a 3V3. Pégalo bien al objeto que quieres medir.",
  },
  {
    archivo: "bmp280", titulo: "Sensor de Presión BMP280", tutoriales: ["bmp280_presion"],
    modulos: [{ id: "b", tipo: "bmp280", etiqueta: "BMP280", material: "Sensor BMP280" }],
    conexiones: [["b.3v3", "3V3"], ["b.gnd", "GND"], ["b.scl", "IO22"], ["b.sda", "IO21"]],
    nombresPin: { "b.3v3": "3.3V", "b.scl": "SCL", "b.sda": "SDA" },
    nota: "Siempre a 3V3. Dirección I2C: 0x76.",
  },
  {
    archivo: "bh1750", titulo: "Sensor de Luz BH1750", tutoriales: ["bh1750_luz"],
    modulos: [{ id: "l", tipo: "bh1750", etiqueta: "BH1750", material: "Sensor de luz BH1750" }],
    conexiones: [["l.vcc", "3V3"], ["l.gnd", "GND"], ["l.scl", "IO22"], ["l.sda", "IO21"]],
    nota: "Siempre a 3V3. Dirección I2C: 0x23.",
  },
  {
    archivo: "qmc5883l", titulo: "Brújula QMC5883L", tutoriales: ["qmc5883l_brujula"],
    modulos: [{ id: "q", tipo: "qmc5883l", etiqueta: "QMC5883L", material: "Brújula QMC5883L" }],
    conexiones: [["q.gnd", "GND"], ["q.vcc", "3V3"], ["q.scl", "IO22"], ["q.sda", "IO21"]],
    nota: "Aléjala de imanes y motores: desvían la lectura.",
  },
  {
    archivo: "tcs34725", titulo: "Sensor de Color TCS34725", tutoriales: ["color_tcs34725"],
    modulos: [{ id: "c", tipo: "tcs34725", etiqueta: "TCS34725", material: "Sensor de color TCS34725" }],
    conexiones: [["c.sda", "IO21"], ["c.scl", "IO22"], ["c.vdd", "3V3"], ["c.gnd", "GND"]],
    nombresPin: { "c.vdd": "VIN" },
    nota: "Pon el objeto a 1-2 cm del sensor y lejos de la luz del sol.",
  },
  {
    archivo: "teclado_4x4_i2c", titulo: "Teclado Matricial 4x4 I2C", tutoriales: ["teclado_4x4_i2c"],
    modulos: [{ id: "k", tipo: "keypad4x4_i2c", etiqueta: "Teclado", material: "Teclado 4x4 con módulo I2C" }],
    conexiones: [["k.sda", "IO21"], ["k.scl", "IO22"], ["k.vcc", "5V"], ["k.gnd", "GND"]],
    nota: "Dirección I2C: 0x20. Solo usa 2 pines de datos.",
  },
  // ── Pantallas y SPI ──
  {
    archivo: "tm1637", titulo: "Display TM1637 (4 dígitos)", tutoriales: ["tm1637_display"],
    modulos: [{ id: "d", tipo: "tm1637", etiqueta: "TM1637", material: "Display TM1637" }],
    conexiones: [["d.vcc", "5V"], ["d.gnd", "GND"], ["d.dio", "IO22"], ["d.clk", "IO21"]],
  },
  {
    archivo: "matrix8", titulo: "Matriz LED 8x8 (MAX7219)", tutoriales: ["matrix8_display"],
    modulos: [{ id: "m", tipo: "max7219", etiqueta: "MAX7219", material: "Matriz 8x8 MAX7219" }],
    conexiones: [["m.vcc", "5V"], ["m.gnd", "GND"], ["m.din", "IO13"], ["m.cs", "IO5"], ["m.clk", "IO18"]],
  },
  {
    archivo: "tft_display", titulo: "Pantalla TFT a color (ST7789)", tutoriales: ["tft_display"],
    modulos: [{ id: "t", tipo: "tft_st7789", etiqueta: "TFT", material: "Pantalla TFT ST7789 240x240" }],
    conexiones: [["t.gnd", "GND"], ["t.vcc", "3V3"], ["t.scl", "IO18"], ["t.sda", "IO23"], ["t.res", "IO22"], ["t.dc", "IO21"], ["t.blk", "t.vcc"]],
    nombresPin: { "t.scl": "SCL (SCK)", "t.sda": "SDA (MOSI)", "t.blk": "BLK (luz)" },
    nota: "Siempre a 3V3. Si tu pantalla trae CS, conéctalo a GND.",
  },
  {
    archivo: "rfid_mfrc522", titulo: "RFID MFRC522", tutoriales: ["rfid_mfrc522"],
    modulos: [{ id: "r", tipo: "rc522_real", etiqueta: "RC522", material: "Lector RFID MFRC522 + tarjeta" }],
    conexiones: [["r.sda", "IO21"], ["r.sck", "IO18"], ["r.mosi", "IO23"], ["r.miso", "IO19"], ["r.gnd", "GND"], ["r.rst", "IO22"], ["r.vcc", "3V3"]],
    nombresPin: { "r.sda": "SDA (SS)" },
    nota: "Siempre a 3V3: este módulo se daña con 5V.",
  },
  {
    archivo: "sdcard", titulo: "Módulo SD Card", tutoriales: ["sdcard_modulo"],
    modulos: [{ id: "s", tipo: "sdcard", etiqueta: "SD", material: "Módulo microSD + memoria" }],
    conexiones: [["s.gnd", "GND"], ["s.vcc", "5V"], ["s.miso", "IO19"], ["s.mosi", "IO23"], ["s.sck", "IO18"], ["s.cs", "IO5"]],
    nota: "Formatea la memoria en FAT32 antes de usarla.",
  },
  {
    archivo: "display_7seg", titulo: "Display 7 Segmentos", tutoriales: ["display_7seg"],
    modulos: [{ id: "d", tipo: "display7", etiqueta: "Display", material: "Display 7 segmentos (cátodo común)" }],
    conexiones: [
      ["d.a", "IO23", { r: "220 Ω" }], ["d.b", "IO5", { r: "220 Ω" }], ["d.c", "IO13", { r: "220 Ω" }], ["d.d", "IO12", { r: "220 Ω" }],
      ["d.e", "IO14", { r: "220 Ω" }], ["d.f", "IO19", { r: "220 Ω" }], ["d.g", "IO18", { r: "220 Ω" }], ["d.com1", "GND"],
    ],
    nombresPin: { "d.com1": "común" },
    nota: "Si tu display es de ánodo común, el común va a 3V3 y eliges 'ánodo común' en el bloque.",
  },
  {
    archivo: "lcd_paralelo", titulo: "LCD 16x2 (paralelo)", tutoriales: ["lcd_paralelo"],
    modulos: [
      { id: "d", tipo: "lcd16x2", etiqueta: "LCD", material: "LCD 16x2", pos: [-215, -230] },
      { id: "p", tipo: "pot_rotary", etiqueta: "Potenciómetro", material: "Potenciómetro de 10 kΩ", lado: "izquierda" },
    ],
    intentos: 120,
    conexiones: [
      ["d.vss", "esp.gnd_1"], ["d.vdd", "5V"], ["d.v0", "p.sig"], ["d.rs", "IO12"], ["d.rw", "esp.gnd_2"], ["d.e", "IO13"],
      ["d.d4", "IO5"], ["d.d5", "IO23"], ["d.d6", "IO19"], ["d.d7", "IO18"],
      ["p.vcc", "5V"], ["p.gnd", "GND"],
    ],
    nombresPin: { "d.v0": "V0 (contraste)", "d.e": "E" },
    nota: "Gira el potenciómetro hasta que se vean las letras. D0-D3 no se conectan. Luz de fondo (opcional): A a 5V y K a GND.",
  },
  {
    archivo: "teclado_matricial", titulo: "Teclado Matricial 4x4", tutoriales: ["teclado_matricial"],
    modulos: [{ id: "k", tipo: "keypad4x4", etiqueta: "Teclado", material: "Teclado matricial 4x4" }],
    conexiones: [["k.r1", "IO13"], ["k.r2", "IO12"], ["k.r3", "IO14"], ["k.r4", "IO27"], ["k.c1", "IO16"], ["k.c2", "IO17"], ["k.c3", "IO25"], ["k.c4", "IO26"]],
    nota: "No lleva VCC ni GND. Pon en el bloque los mismos pines que conectaste (son los que trae por defecto).",
  },
  {
    archivo: "teclado_4x3", titulo: "Teclado Matricial 4x3", tutoriales: ["teclado_4x3"],
    modulos: [{ id: "k", tipo: "keypad3x4", etiqueta: "Teclado", material: "Teclado matricial 4x3" }],
    conexiones: [["k.r1", "IO13"], ["k.r2", "IO12"], ["k.r3", "IO14"], ["k.r4", "IO27"], ["k.c1", "IO16"], ["k.c2", "IO17"], ["k.c3", "IO25"]],
    nota: "No lleva VCC ni GND. Pon en el bloque los mismos pines que conectaste (son los que trae por defecto).",
  },
  // ── Serial (UART) ──
  {
    archivo: "hc-06", titulo: "Bluetooth HC-06", tutoriales: ["hc06_basico"],
    modulos: [{ id: "b", tipo: "hc-06", etiqueta: "HC-06", material: "Módulo Bluetooth HC-06" }],
    conexiones: [["b.vcc", "3V3"], ["b.gnd", "GND"], ["b.txd", "IO16"], ["b.rxd", "IO17"]],
    nota: "Se cruzan: TX del módulo va al RX del ESP32 (IO16) y RX al TX (IO17).",
  },
  {
    archivo: "gps", titulo: "Módulo GPS", tutoriales: ["gps_modulo"],
    modulos: [{ id: "g", tipo: "gps", etiqueta: "GPS", material: "Módulo GPS (NEO-6M)" }],
    conexiones: [["g.vcc", "3V3"], ["g.gnd", "GND"], ["g.tx", "IO16"], ["g.rx", "IO17"]],
    nota: "Se cruzan: TX del GPS al RX del ESP32 (IO16). Afuera y con cielo abierto encuentra satélites más rápido.",
  },
  {
    archivo: "fpm383c", titulo: "Sensor de Huella FPM383C", tutoriales: ["fpm383c_huella"],
    modulos: [{ id: "h", tipo: "fpm383c", etiqueta: "FPM383C", material: "Sensor de huella FPM383C" }],
    conexiones: [["h.vcc", "3V3"], ["h.tx", "IO16"], ["h.rx", "IO17"], ["h.gnd", "GND"]],
    nota: "Se cruzan: TX del sensor al RX del ESP32 (IO16). Siempre a 3V3.",
  },
  {
    archivo: "dfplayer", titulo: "Reproductor MP3 DFPlayer", tutoriales: ["dfplayer_mp3"],
    modulos: [
      { id: "d", tipo: "dfplayer", etiqueta: "DFPlayer", material: "DFPlayer Mini + microSD con MP3" },
      { id: "s", tipo: "bocina", etiqueta: "Bocina", material: "Bocina de 8 Ω" },
    ],
    conexiones: [["d.vcc", "5V"], ["d.rx", "IO17", { r: "1 kΩ" }], ["d.tx", "IO16"], ["d.gnd", "GND"], ["d.spk_1", "s.vcc"], ["d.spk_2", "s.gnd", { color: "#343a40" }]],
    nombresPin: { "s.vcc": "+", "s.gnd": "−" },
    nota: "Se cruzan: TX del DFPlayer al RX del ESP32 (IO16); el RX lleva una resistencia de 1 kΩ.",
  },
  // ── Inalámbrico: solo la placa ──
  {
    archivo: "solo_placa", titulo: "Solo la placa ESP32", tutoriales: ["wifi_basico", "servidor_socket", "cliente_socket", "portal_cautivo", "bluetooth_le"],
    modulos: [PC],
    conexiones: [["pc.usb", "esp.usb", USB]],
    sinCables: SOLO_PLACA + " El WiFi y el Bluetooth ya vienen dentro del ESP32.",
  },
  {
    archivo: "espnow", titulo: "ESP-NOW — Dos placas", tutoriales: ["espnow_receptor", "espnow_emisor", "espnow_chat"], placas: 2,
    modulos: [],
    conexiones: [],
    etiquetas: [[138, -14, "Emisor", 14], [478, -14, "Receptor", 14]],
    sinCables: "Necesitas 2 placas ESP32, sin cables entre ellas: se comunican por radio. Conecta cada una a la computadora con su cable USB.",
  },
];
