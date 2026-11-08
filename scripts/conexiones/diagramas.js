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

// Armados en el simulador 3DPitSimu (scripts/Tutoriales/*.json): se respetan
// tal cual las piezas, su lugar y los cables; nombresPin y marcas van por
// tipo de pieza ("led.anodo").
const DEL_SIMULADOR = [
  {
    archivo: "led", titulo: "LED", tutoriales: ["led_basico", "led_infinito", "wifi_ntfy_led"], simulador: "led.json",
    marcas: { led: [[29, 30, "+", 11, "#e03131"], [-9, 30, "−", 11, "#1c7ed6"]] },
    nombresPin: { "led.anodo": "+ ánodo (pata larga)", "led.catodo": "− cátodo (pata corta)", "resistencia.term1": "pata 1", "resistencia.term2": "pata 2" },
    nota: "La placa ya trae un LED en IO2: no hace falta conectar nada. Para uno externo cuida la polaridad: la pata larga (+) va hacia la resistencia y la corta (−, lado plano) a GND.",
  },
  {
    archivo: "semaforo", titulo: "Semáforo", tutoriales: ["semaforo"], simulador: "semaforo.json",
    nota: "Cada luz ya trae su resistencia en el módulo. El pin GND (−) es común a las tres luces.",
  },
  {
    archivo: "boton", titulo: "Botón (KY-004)", tutoriales: ["boton"], simulador: "boton.json",
    nota: "Usa el modo PULL_UP: el pin lee 0 cuando presionas el botón. Alimenta el módulo con 3V3, no con 5V.",
  },
  {
    archivo: "buzzer", titulo: "Buzzer", tutoriales: ["buzzer"], simulador: "buzzer.json",
    nombresPin: { "buzzer.s": "S (señal)", "buzzer.gnd": "−" },
    nota: "Es un buzzer pasivo: necesita una nota (PWM) para sonar; con solo encenderlo el pin no suena.",
  },
  {
    archivo: "servo", titulo: "Servo Motor", tutoriales: ["servo"], simulador: "servo.json",
    nombresPin: { "sg90.signal": "naranja (señal)", "sg90.vcc": "rojo (+)", "sg90.gnd": "café (−)" },
    nota: "El conector del servo es hembra: usa cables macho-macho. Si vibra sin moverse, aliméntalo con 5V externos y une los GND.",
  },
  {
    archivo: "neopixel", titulo: "NeoPixel RGB", tutoriales: ["neopixel_basico"], simulador: "neopixel.json",
    nota: "Con más de 8 LEDs a brillo alto usa una fuente de 5V externa y une los GND.",
  },
  {
    archivo: "stepper", titulo: "Motor Paso a Paso (28BYJ-48)", tutoriales: ["stepper_motor"], simulador: "motor_a_pasos.json",
    nota: "El motor se alimenta de las pilas, con el interruptor para apagarlo; une el GND de las pilas con el del ESP32.",
  },
  {
    archivo: "puente_h", titulo: "Puente H — Motores DC", tutoriales: ["puente_h"], simulador: "puenteH.json",
    nombresPin: { "l298n.power_gnd": "GND", "l298n.power_12v": "+12V", "battery_18650.vcc": "+", "battery_18650.gnd": "−" },
    nota: "No alimentes los motores desde el ESP32: usa las pilas (con su interruptor) y une su GND con el del ESP32.",
  },
  {
    archivo: "relevador", titulo: "Relevador (Relay)", tutoriales: ["relevador"], simulador: "relevador.json",
    nombresPin: { "clavija_127v.fase": "fase", "clavija_127v.neutro": "neutro", "bombillo.p1": "terminal 1", "bombillo.p2": "terminal 2" },
    nota: "Con NO el foco prende solo cuando el relevador se activa. ¡Cuidado, 127 V! Arma la parte del foco desconectada y con ayuda de un adulto.",
  },
  {
    archivo: "infrarrojo", titulo: "Sensor Infrarrojo — Detectar Línea", tutoriales: ["infrarrojo_basico"], simulador: "sensor_ir.json",
    nombresPin: { "tcrt5000.do": "OUT (DO)", "tcrt5000.vcc": "VCC", "tcrt5000.gnd": "GND" },
    nota: "Gira el potenciómetro del módulo hasta que su LED cambie entre negro y blanco.",
  },
  {
    archivo: "ky-005", titulo: "Emisor Infrarrojo (KY-005)", tutoriales: ["ir_tx_ky005"], simulador: "emisor_ir.json",
    nombresPin: { "ky-005.vcc": "+ (centro)", "ky-005.gnd": "−" },
    nota: "El LED infrarrojo no se ve a simple vista: míralo con la cámara del celular para comprobar que parpadea.",
  },
  {
    archivo: "carrito", titulo: "Carrito Esquiva Obstáculos", tutoriales: ["carrito_esquiva_obstaculos"], simulador: "carro_esquiva_obstaculos.json",
    nombresPin: { "l298n.power_gnd": "GND", "l298n.power_12v": "+12V", "battery_18650.vcc": "+", "battery_18650.gnd": "−" },
    nota: "Los motores se alimentan de las pilas (con su interruptor); une el GND de las pilas, del L298N y del ESP32. El HC-SR04 va a 3V3.",
  },
  {
    archivo: "ultrasonico", titulo: "Sensor Ultrasónico (HC-SR04)", tutoriales: ["ultrasonico"], simulador: "ultrasonico.json",
    nota: "TRIG manda el pulso y ECHO lo recibe: no los inviertas. Siempre a 3V3: así el ECHO es seguro para el ESP32.",
  },
  {
    archivo: "adkeypad", titulo: "Teclado Analógico (ADKey)", tutoriales: ["analogico_adkey"], simulador: "adkey.json",
    nota: "Usa un pin analógico (34, 35, 36 o 39): esos pines solo leen.",
  },
  {
    archivo: "ky-022", titulo: "Receptor Infrarrojo (KY-022)", tutoriales: ["ir_ky022"], simulador: "control_remoto_ky-022.json",
    nombresPin: { "ky-022.vcc": "+ (centro)", "ky-022.gnd": "−" },
    nota: "El lente negro debe apuntar hacia el control remoto.",
  },
  {
    archivo: "dht11", titulo: "DHT11 — Temperatura y Humedad", tutoriales: ["dht11"], simulador: "dht11.json",
    nota: "Si usas el sensor sin placa (4 patas), pon una resistencia de 10 kΩ entre DATA y 3V3.",
  },
  {
    archivo: "ky-001", titulo: "KY-001 — Temperatura DS18B20", tutoriales: ["ky001"], simulador: "ky-001.json",
    nota: "Siempre a 3V3, nunca a 5V.",
  },
  {
    archivo: "oled", titulo: "Display OLED (SSD1306 / SH1106)", tutoriales: ["oled_display", "sh1106_display"], simulador: "oled.json",
    nombresPin: { "oled.sck": "SCL" },
    nota: "Siempre a 3V3, nunca a 5V. Dirección I2C: 0x3C.",
  },
  {
    archivo: "lcd_i2c", titulo: "LCD 16x2 I2C", tutoriales: ["lcd_i2c_display"], simulador: "lcd_i2c.json",
    nota: "Si enciende pero no se ve texto, gira el potenciómetro azul (contraste). Dirección I2C: 0x27.",
  },
  {
    archivo: "rtc_ds3231", titulo: "Reloj RTC DS3231", tutoriales: ["rtc_ds3231"], simulador: "rtc.json",
    nota: "Con su pila puesta, guarda la hora aunque desconectes la placa.",
  },
  {
    archivo: "mpu6050", titulo: "Giroscopio / Acelerómetro MPU6050", tutoriales: ["mpu6050_imu"], simulador: "mpu6050.json",
    nota: "Siempre a 3V3. Pégalo bien al objeto que quieres medir.",
  },
  {
    archivo: "tm1637", titulo: "Display TM1637 (4 dígitos)", tutoriales: ["tm1637_display"], simulador: "tm1637.json",
    nota: "Funciona con 3V3 o con 5V. Pon en el bloque los mismos pines que conectaste: CLK 22 y DIO 21.",
  },
  {
    archivo: "matrix8", titulo: "Matriz LED 8x8 (MAX7219)", tutoriales: ["matrix8_display"], simulador: "matrix8x8.json",
    nota: "Va a 3V3; si la matriz se ve débil o muestra puntos al azar, aliméntala con 5V.",
  },
  {
    archivo: "neopixel_matriz", titulo: "Matriz NeoPixel 5x5", tutoriales: ["neopixel_matriz"], simulador: "neopixel5x5.json",
    nota: "Empieza con brillo bajo (20-30 %) para no gastar demasiada corriente.",
  },
  {
    archivo: "neopixel_matriz_8x8", titulo: "Matriz NeoPixel 8x8", tutoriales: ["neopixel_matriz_8x8"], simulador: "neopixel8x8.json",
    nota: "64 LEDs consumen mucho: usa brillo bajo o una fuente de 5V externa. Si usas otro pin de datos, cámbialo en el bloque.",
  },
  {
    archivo: "flujo_agua", titulo: "Sensor de Flujo de Agua (YF-201)", tutoriales: ["flujo_agua"], simulador: "sensor_flujo.json",
    nota: "La flecha del sensor indica hacia dónde debe correr el agua. La señal (cable amarillo) va al pin 17.",
  },
  {
    archivo: "bmp280", titulo: "Sensor de Presión BMP280", tutoriales: ["bmp280_presion"], simulador: "bmp280.json",
    nota: "Siempre a 3V3. Dirección I2C: 0x76.",
  },
  {
    archivo: "bh1750", titulo: "Sensor de Luz BH1750", tutoriales: ["bh1750_luz"], simulador: "bh1750.json",
    nota: "Siempre a 3V3. Dirección I2C: 0x23.",
  },
  {
    archivo: "qmc5883l", titulo: "Brújula QMC5883L", tutoriales: ["qmc5883l_brujula"], simulador: "brujula.json",
    nota: "Aléjala de imanes y motores: desvían la lectura.",
  },
  {
    archivo: "tcs34725", titulo: "Sensor de Color TCS34725", tutoriales: ["color_tcs34725"], simulador: "sensor_color.json",
    nota: "Pon el objeto a 1-2 cm del sensor y lejos de la luz del sol.",
  },
  {
    archivo: "rfid_mfrc522", titulo: "RFID MFRC522", tutoriales: ["rfid_mfrc522"], simulador: "rfid.json",
    nota: "Siempre a 3V3: este módulo se daña con 5V.",
  },
  {
    archivo: "sdcard", titulo: "Módulo SD Card", tutoriales: ["sdcard_modulo"], simulador: "sdcard.json",
    nota: "Formatea la memoria en FAT32 antes de usarla.",
  },
  {
    archivo: "teclado_matricial", titulo: "Teclado Matricial 4x4", tutoriales: ["teclado_matricial"], simulador: "keypad4x4.json",
    nota: "No lleva VCC ni GND. Pon en el bloque los mismos pines que conectaste (son los que trae por defecto).",
  },
  {
    archivo: "teclado_4x3", titulo: "Teclado Matricial 4x3", tutoriales: ["teclado_4x3"], simulador: "keypad3x4.json",
    nota: "No lleva VCC ni GND. Pon en el bloque los mismos pines que conectaste (son los que trae por defecto).",
  },
  {
    archivo: "hc-06", titulo: "Bluetooth HC-06", tutoriales: ["hc06_basico"], simulador: "bluetooth_hc-05.json",
    nota: "Se cruzan: TX del módulo va al RX del ESP32 (IO16) y RX al TX (IO17).",
  },
  {
    archivo: "gps", titulo: "Módulo GPS", tutoriales: ["gps_modulo"], simulador: "gps.json",
    nota: "Se cruzan: TX del GPS al RX del ESP32 (IO16). Afuera y con cielo abierto encuentra satélites más rápido.",
  },
  {
    archivo: "fpm383c", titulo: "Sensor de Huella FPM383C", tutoriales: ["fpm383c_huella"], simulador: "sensor_huella.json",
    nota: "Se cruzan: TX del sensor al RX del ESP32 (IO16). Siempre a 3V3.",
  },
  {
    archivo: "dfplayer", titulo: "Reproductor MP3 DFPlayer", tutoriales: ["dfplayer_mp3"], simulador: "dfplayer.json",
    nombresPin: { "bocina.pos": "+", "bocina.neg": "−" },
    nota: "Se cruzan: TX del DFPlayer al RX del ESP32 (IO16) y RX del DFPlayer al TX del ESP32 (IO27). Pon TX 27 y RX 16 en el bloque.",
  },
  {
    archivo: "encoder_ky040", titulo: "Encoder Rotatorio (KY-040)", tutoriales: ["encoder_rotatorio"], simulador: "encoder.json",
    nombresPin: { "ky040.vcc": "+" },
    nota: "CLK al 18 y DT al 19 (los del bloque por defecto). El pin SW es el botón del eje: no lo usamos en este tutorial.",
  },
  {
    archivo: "inmp441", titulo: "Micrófono INMP441", tutoriales: ["inmp441_microfono"], simulador: "microfono_inmp441.json",
    nota: "L/R a GND elige el canal izquierdo. Siempre a 3V3.",
  },
  {
    archivo: "teclado_4x4_i2c", titulo: "Teclado Matricial 4x4 I2C", tutoriales: ["teclado_4x4_i2c"], simulador: "keypad4x4_i2c.json",
    nota: "Dirección I2C: 0x20. Solo usa 2 pines de datos: SDA 21 y SCL 22.",
  },
  {
    archivo: "display_7seg", titulo: "Display 7 Segmentos", tutoriales: ["display_7seg"], simulador: "display.json",
    nombresPin: { "display7.com2": "común" },
    nota: "La resistencia de 220 Ω va entre el común y GND. Pon en el bloque los mismos pines: A26 B25 C17 D16 E27 F14 G12.",
  },
  {
    archivo: "tft_display", titulo: "Pantalla TFT a color (ST7789)", tutoriales: ["tft_display"], simulador: "tft.json",
    nombresPin: { "tft_st7789.scl": "SCL (SCK)", "tft_st7789.sda": "SDA (MOSI)" },
    nota: "Siempre a 3V3. Si tu pantalla trae CS, conéctalo a GND.",
  },
  {
    // El mismo armado del tutorial de ultrasónico + el aluminio en el pin 4.
    archivo: "medidor_estatura", titulo: "Medidor de Estatura", tutoriales: ["medidor_estatura"], simulador: "ultrasonico.json",
    agregar: {
      components: [{ id: "aluminio", type: "touch", x: 640, y: 282 }],
      wires: [{ from: { componentId: "aluminio", pinId: "touch" }, to: { componentId: "esp", pinId: "io4" },
        points: [{ x: 667, y: 414 }, { x: 434.28, y: 414 }], color: "#9e9e9e", connectorType: "macho-macho" }],
    },
    nota: "El HC-SR04 se conecta igual que en el tutorial de ultrasónico. El aluminio es un pedazo de papel aluminio enrollado en la punta de un cable macho-macho: tócalo para medir. Pon el sensor arriba mirando hacia el piso.",
  },
];

module.exports = [
  ...DEL_SIMULADOR,
  // ── Desafío de Robótica ──
  {
    archivo: "carrito_botones", titulo: "Carrito con control de 5 botones", tutoriales: ["juego_bandera_carrito", "juego_ruta_robot"],
    modulos: [
      { id: "h", tipo: "l298n", etiqueta: "L298N", material: "Puente H L298N", pos: [88.28, -270] },
      { id: "a", tipo: "motor", etiqueta: "Rueda izq.", material: "Motor DC con reductora", pos: [-141.72, -190] },
      { id: "b", tipo: "motor", etiqueta: "Rueda der.", material: "Motor DC con reductora", pos: [298.28, -210] },
      { id: "p", tipo: "battery_18650", etiqueta: "Pilas", material: "Portapilas 2×18650 (7.4 V) con interruptor", pos: [-261.72, -30] },
      { id: "k", tipo: "adkey_real", etiqueta: "Control", material: "Teclado de 5 botones ADKey", lado: "abajo" },
    ],
    conexiones: [
      ["h.in1", "IO16"], ["h.in2", "IO17"], ["h.in3", "IO25"], ["h.in4", "IO26"], ["h.power_gnd", "GND"],
      ["p.vcc", "h.power_12v", { color: "#e03131" }], ["p.gnd", "h.power_gnd"],
      ["a.pin1", "h.out1", { color: "#7048e8" }], ["a.pin2", "h.out2", { color: "#7048e8" }],
      ["b.pin1", "h.out3", { color: "#0b7285" }], ["b.pin2", "h.out4", { color: "#0b7285" }],
      ["k.out", "IO35"], ["k.vcc", "3V3"], ["k.gnd", "GND"],
    ],
    nombresPin: { "h.power_gnd": "GND", "h.power_12v": "+12V", "p.vcc": "+", "p.gnd": "−" },
    nota: "Las pilas alimentan los motores (pon el interruptor en el cable +). Une el GND de las pilas, del L298N y del ESP32. El control va a 3V3 y al pin 35.",
  },
  // ── Pantallas y SPI ──
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
    nota: "Gira el potenciómetro hasta que se vean las letras. D0-D3 no se conectan. Luz de fondo: A con resistencia de 220 Ω a 5V y K a GND.",
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
