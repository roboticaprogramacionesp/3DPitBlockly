/* ══════════════════════════════════════════════════════════════
   retos-data.js — Retos con verificación (los usa static/retos.js en la
   app y static/tools/retos.html para la lista).

   Cada reto tiene "checks": lo que el programa del alumno debe tener.
   Se revisa la ESTRUCTURA de los bloques (qué bloques hay, dentro de
   cuáles, con qué números), no el código Python: así no importa el
   orden en que se armó ni el nombre de las variables.

   Tipos de check (ver evaluarCheck en retos.js):
     has      — al menos `min` bloques de alguno de los tipos.
     field    — algún bloque `type` con el campo `name` = `value`.
     inLoop   — al menos `min` bloques de esos tipos dentro de un ciclo.
     forever  — un "repetir mientras verdadero".
     repeat   — un "repetir N veces" con N = `times`.
     inIf     — bloques de esos tipos dentro de un "si".
     inCond   — bloques de esos tipos dentro de la CONDICIÓN de un "si".
     distinct — al menos `min` bloques `type` con distinto campo `name`.
     inside   — bloques de esos tipos dentro (en cualquier entrada) de un
                bloque de los tipos `of` (p.ej. una lectura en el ángulo del servo).
     distinctNum — al menos `min` números distintos en la entrada `input`
                de los bloques `type` (p.ej. esperas de distinta duración).
     anyOf    — se cumple si se cumple cualquiera de los checks de la lista.
     allOf    — se cumple si se cumplen todos los checks de la lista.
     inLoopField / inIfField — bloque `type` con el campo `name` = `value`
                dentro de un ciclo / dentro de un "si" (o su "si no").
══════════════════════════════════════════════════════════════ */

const RETO_LOOPS = ["controls_whileUntil", "controls_repeat_ext", "controls_for", "controls_forEach", "time_every"];
// Encender y apagar un LED dentro de un ciclo: con "estado on/off" o con
// "alternar" (que hace las dos cosas). Usados por los retos de parpadeo.
const RETO_LED_ON_LOOP = { anyOf: [{ inLoopField: { type: "set_led", name: "STATE", value: "1" } }, { inLoop: ["toggle_led", "set_led_var"] }] };
const RETO_LED_OFF_LOOP = { anyOf: [{ inLoopField: { type: "set_led", name: "STATE", value: "0" } }, { inLoop: ["toggle_led", "set_led_var"] }] };
// Con "alternar" basta una espera; con on/off hacen falta dos (si no, se
// apaga y se vuelve a prender al instante y parece siempre encendido).
const RETO_BLINK_WAITS = { anyOf: [{ allOf: [{ inLoop: ["toggle_led"] }, { inLoop: ["time_sleep"] }] }, { inLoop: ["time_sleep"], min: 2 }] };

const RETO_SERVO_MOVE = ["move_servo", "move_servo_var", "servo_move_pulse"];
const RETO_BUZZER = ["buzzer_melody", "buzzer_song", "buzzer_tone", "buzzer_tone_var"];
const RETO_NEOPIXEL_INIT = ["neopixel_init", "neopixel_init_5x5", "neopixel_init_8x8", "neopixel_matrix_init"];

const RETOS = [
  {
    id: "led_on", level: 1, icon: "💡", title: "Enciende un LED",
    desc: "Haz que el LED de la placa (pin 2) se encienda y se quede encendido.",
    checks: [
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y arrastra el bloque que crea el LED con su pin." },
      { field: { type: "set_led", name: "STATE", value: "1" }, text: "Encender el LED (estado on)", hint: "Usa el bloque de estado del LED y elige 'on'." },
    ],
  },
  {
    id: "blink", level: 1, icon: "✨", title: "Parpadeo infinito",
    desc: "Haz que el LED se prenda y se apague una y otra vez, para siempre.",
    checks: [
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y arrastra el bloque que crea el LED." },
      { forever: true, text: "Un ciclo que se repite para siempre", hint: "En Ciclos, usa 'repetir mientras' con 'verdadero'." },
      { ...RETO_LED_ON_LOOP, text: "Encender el LED dentro del ciclo", hint: "Dentro del ciclo pon el estado del LED en 'on' (o usa 'alternar')." },
      { ...RETO_LED_OFF_LOOP, text: "Apagar el LED dentro del ciclo", hint: "Para que parpadee también hay que apagarlo: agrega el estado 'off' dentro del ciclo." },
      { ...RETO_BLINK_WAITS, text: "Esperar después de encender y después de apagar", hint: "Pon un 'esperar' después de encender y otro después de apagar; si no, el LED parece siempre prendido." },
    ],
  },
  {
    id: "blink3", level: 1, icon: "3️⃣", title: "Parpadea 3 veces",
    desc: "Haz que el LED parpadee exactamente 3 veces y luego se detenga.",
    checks: [
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y arrastra el bloque que crea el LED." },
      { repeat: 3, text: "Repetir exactamente 3 veces", hint: "En Ciclos, usa 'repetir N veces' y cambia el número a 3." },
      { ...RETO_LED_ON_LOOP, text: "Encender el LED dentro del 'repetir'", hint: "Dentro del 'repetir' pon el estado del LED en 'on' (o usa 'alternar')." },
      { ...RETO_LED_OFF_LOOP, text: "Apagar el LED dentro del 'repetir'", hint: "Un parpadeo es prender Y apagar: agrega el estado 'off' dentro del 'repetir'." },
      { ...RETO_BLINK_WAITS, text: "Esperar después de encender y después de apagar", hint: "Pon un 'esperar' después de encender y otro después de apagar." },
    ],
  },
  {
    id: "traffic", level: 2, icon: "🚦", title: "Semáforo",
    desc: "Arma un semáforo con 3 LEDs (rojo, amarillo y verde) que cambie solo, una y otra vez.",
    checks: [
      { distinct: { type: "led_init", name: "NAME" }, min: 3, text: "Tres LEDs con nombres distintos", hint: "Crea 3 LEDs y ponle a cada uno un nombre diferente (rojo, amarillo, verde)." },
      { forever: true, text: "Un ciclo que se repite para siempre", hint: "Usa 'repetir mientras verdadero' para que el semáforo no se detenga." },
      { inLoopField: { type: "set_led", name: "STATE", value: "1" }, min: 3, text: "Encender cada LED en su turno (3 veces 'on')", hint: "Dentro del ciclo pon en 'on' el rojo, el verde y el amarillo, cada uno en su momento." },
      { inLoopField: { type: "set_led", name: "STATE", value: "0" }, min: 3, text: "Apagar cada LED al terminar su turno (3 veces 'off')", hint: "Antes de prender el siguiente color, apaga el anterior con 'off'." },
      { inLoop: ["time_sleep"], min: 3, text: "Tres esperas dentro del ciclo", hint: "Cada color necesita su tiempo: pon un 'esperar' después de cada cambio." },
    ],
  },
  {
    id: "button", level: 2, icon: "🔘", title: "Botón que enciende un LED",
    desc: "Mientras el botón esté presionado, el LED se enciende; si lo sueltas, se apaga.",
    checks: [
      { has: ["interruptor_init"], text: "Iniciar el botón (interruptor)", hint: "Ve a Interruptores y crea el botón con su pin." },
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y crea el LED." },
      { forever: true, text: "Un ciclo que revisa el botón para siempre", hint: "El botón hay que leerlo todo el tiempo: usa 'repetir mientras verdadero'." },
      { inCond: ["interruptor_read"], text: "Leer el botón en la condición de un 'si'", hint: "En Lógica usa 'si' y pon 'leer Pin' del botón en su condición." },
      { inIfField: { type: "set_led", name: "STATE", value: "1" }, text: "Encender el LED cuando se presiona", hint: "Dentro del 'si' pon el estado del LED en 'on'." },
      { inIfField: { type: "set_led", name: "STATE", value: "0" }, text: "Apagar el LED cuando se suelta ('si no')", hint: "Toca el engranaje del 'si', agrega 'si no' y ahí pon el LED en 'off'." },
    ],
  },
  {
    id: "counter", level: 2, icon: "🔢", title: "Contador",
    desc: "Crea una variable que empiece en 0 y vaya sumando 1, mostrándola en el monitor serial.",
    checks: [
      { has: ["variables_set"], text: "Dar un valor inicial a una variable", hint: "En Variables crea una variable y usa 'establecer ... a' con 0." },
      { inLoop: ["math_change", "variables_set"], min: 1, text: "Cambiar la variable dentro de un ciclo", hint: "Dentro de un ciclo usa 'cambiar ... por 1' de Variables." },
      { inLoop: ["text_print"], min: 1, text: "Imprimir dentro del ciclo", hint: "En Textos usa 'imprimir' con la variable, dentro del ciclo." },
      { inLoop: ["time_sleep"], min: 1, text: "Esperar dentro del ciclo", hint: "Agrega 'esperar' para poder leer los números en el monitor." },
    ],
  },
  {
    id: "melody", level: 2, icon: "🎵", title: "Melodía",
    desc: "Haz que el buzzer toque una melodía de al menos 3 notas.",
    checks: [
      { has: ["buzzer_melody", "buzzer_song", "buzzer_tone", "buzzer_tone_var"], text: "Usar el buzzer", hint: "Ve a Sensores → Sensores Digitales → Buzzer (KY-006). Puedes componer con 🛠 Herramientas → Editor de melodías." },
      { anyOf: [{ has: ["buzzer_melody", "buzzer_song"] }, { has: ["buzzer_tone", "buzzer_tone_var"], min: 3 }], text: "Una melodía (o al menos 3 tonos)", hint: "Usa 'tocar melodía' o pon 3 bloques de tono, uno debajo del otro." },
    ],
  },
  {
    id: "servo", level: 3, icon: "⚙️", title: "Barrido del servo",
    desc: "Haz que el servo vaya de un lado a otro (por ejemplo de 0° a 180°) para siempre.",
    checks: [
      { has: ["init_servo"], text: "Iniciar el servo", hint: "Ve a Actuadores → Servo y crea el servo con su pin." },
      { forever: true, text: "Un ciclo que se repite para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: RETO_SERVO_MOVE, min: 2, text: "Mover el servo dos veces dentro del ciclo", hint: "Dentro del ciclo mueve a 0° y luego a 180°." },
      { anyOf: [{ distinct: { type: "move_servo", name: "ANGLE" }, min: 2 }, { has: ["move_servo_var", "servo_move_pulse"], min: 2 }],
        text: "Ir a dos ángulos distintos", hint: "Para que se mueva de un lado a otro, los dos ángulos tienen que ser diferentes (por ejemplo 0° y 180°)." },
      { inLoop: ["time_sleep"], min: 2, text: "Esperar después de cada movimiento", hint: "El servo tarda en llegar: pon un 'esperar' después de cada movimiento." },
    ],
  },
  {
    id: "autolight", level: 3, icon: "🌙", title: "Luz automática",
    desc: "Con una LDR (o un potenciómetro), enciende el LED cuando haya poca luz.",
    checks: [
      { has: ["adc_pin"], text: "Preparar la lectura analógica (ADC)", hint: "En Machine → ADC usa 'ADC(Pin(...))' con un pin analógico (mira 🛠 Mapa de pines)." },
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y crea el LED." },
      { forever: true, text: "Un ciclo que mide todo el tiempo", hint: "Usa 'repetir mientras verdadero'." },
      { inCond: ["adc_read", "adc_read_u16"], text: "Comparar la lectura en un 'si'", hint: "En Lógica usa 'si' con una comparación: lectura < 1000, por ejemplo." },
      { inIfField: { type: "set_led", name: "STATE", value: "1" }, text: "Encender el LED cuando hay poca luz", hint: "Dentro del 'si' pon el estado del LED en 'on'." },
      { inIfField: { type: "set_led", name: "STATE", value: "0" }, text: "Apagar el LED cuando hay luz ('si no')", hint: "Toca el engranaje del 'si', agrega 'si no' y ahí pon el LED en 'off'." },
    ],
  },
  {
    id: "screen", level: 3, icon: "🖥", title: "Mensaje en pantalla",
    desc: "Muestra tu nombre en la pantalla OLED y, debajo, un dibujo o un segundo texto.",
    checks: [
      { has: ["oled_init", "sh1106_init"], text: "Iniciar la pantalla OLED", hint: "Ve a Pantallas → OLED y usa el bloque para iniciarla." },
      { has: ["oled_text", "oled_text20"], text: "Escribir un texto", hint: "Usa el bloque 'texto' de la OLED." },
      { has: ["oled_text", "oled_text20", "oled_image", "oled_icon", "oled_rect", "oled_circle", "oled_line"], min: 2, text: "Algo más debajo (otro texto o un dibujo)", hint: "Agrega otro texto con distinta Y, o un dibujo hecho con 🛠 Imagen para OLED." },
    ],
  },

  // ── Retos agregados (segunda tanda) ──
  {
    id: "sos", level: 2, icon: "🆘", title: "Mensaje SOS",
    desc: "Haz que el LED mande S.O.S. en código Morse: 3 destellos cortos, 3 largos y 3 cortos, y que lo repita.",
    checks: [
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y crea el LED." },
      { repeat: 3, min: 2, text: "Al menos dos 'repetir 3 veces'", hint: "Cada letra son 3 destellos: usa 'repetir 3 veces' para las S y para la O." },
      { ...RETO_LED_ON_LOOP, text: "Encender el LED dentro de los ciclos", hint: "Dentro de cada 'repetir' pon el LED en 'on'." },
      { ...RETO_LED_OFF_LOOP, text: "Apagar el LED dentro de los ciclos", hint: "Después de cada destello apágalo con 'off'." },
      { distinctNum: { type: "time_sleep", input: "VALUE" }, min: 2, text: "Esperas cortas y largas", hint: "Los destellos cortos y largos se distinguen por el tiempo: usa por ejemplo 0.2 y 0.6 segundos." },
    ],
  },
  {
    id: "doorbell", level: 2, icon: "🔔", title: "Timbre con botón",
    desc: "Cuando presiones el botón, que suene el buzzer como un timbre.",
    checks: [
      { has: ["interruptor_init"], text: "Iniciar el botón", hint: "Ve a Interruptores y crea el botón con su pin." },
      { forever: true, text: "Un ciclo que revisa el botón para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inCond: ["interruptor_read"], text: "Leer el botón en la condición de un 'si'", hint: "En Lógica usa 'si' y pon 'leer Pin' del botón en la condición." },
      { inIf: RETO_BUZZER, text: "Hacer sonar el buzzer dentro del 'si'", hint: "Ve a Sensores → Sensores Digitales → Buzzer (KY-006) y pon un tono o una melodía dentro del 'si'." },
    ],
  },
  {
    id: "neopixel_draw", level: 2, icon: "🌈", title: "Dibujo en NeoPixel",
    desc: "Muestra un dibujo a colores en una matriz NeoPixel (un corazón, una carita…).",
    checks: [
      { has: RETO_NEOPIXEL_INIT, text: "Iniciar la matriz NeoPixel", hint: "Ve a Pantallas → NeoPixel y usa el bloque para iniciar la matriz de tu tamaño." },
      { has: ["neopixel_image", "neopixel_5x5", "neopixel_8x8"], text: "Hacer un dibujo", hint: "Dibújalo con 🛠 Herramientas → Matriz NeoPixel a colores y usa 'Insertar en mis bloques'." },
      { has: ["neopixel_show"], text: "Mostrarlo", hint: "Sin el bloque 'mostrar' los LEDs no cambian: agrégalo después del dibujo." },
    ],
  },
  {
    id: "lcd_symbol", level: 2, icon: "🔤", title: "Tu símbolo en la LCD",
    desc: "Crea un símbolo propio (un corazón, una carita…) y muéstralo en la LCD.",
    checks: [
      { has: ["lcd_init", "lcd_i2c_init"], text: "Iniciar la LCD", hint: "Ve a Pantallas → LCD I2C (o LCD) y usa el bloque para iniciarla." },
      { has: ["lcd_create_char", "lcd_i2c_create_char"], text: "Crear el carácter propio", hint: "Dibújalo con 🛠 Herramientas → Caracteres para LCD, o con el bloque 'crear carácter'." },
      { has: ["lcd_custom_char"], text: "Escribirlo en la pantalla", hint: "Usa 'escribir' de la LCD con el bloque 'carácter propio' del mismo número." },
    ],
  },
  {
    id: "tm_word", level: 2, icon: "🔢", title: "Palabra en el display",
    desc: "Escribe una palabra de 4 letras (como HOLA) en el display TM1637.",
    checks: [
      { has: ["tm1637_init"], text: "Iniciar el TM1637", hint: "Ve a Pantallas → TM1637 y usa el bloque para iniciarlo." },
      { has: ["tm1637_segments", "tm1637_show", "tm1637_scroll"], text: "Mostrar letras", hint: "Usa 'mostrar segmentos' (ármalo con 🛠 Segmentos TM1637) o 'mostrar texto'." },
    ],
  },
  {
    id: "presses", level: 3, icon: "👆", title: "Contador de pulsaciones",
    desc: "Cuenta cuántas veces presionas el botón y muestra el número en el monitor serial.",
    checks: [
      { has: ["interruptor_init"], text: "Iniciar el botón", hint: "Ve a Interruptores y crea el botón." },
      { has: ["variables_set"], text: "Una variable que empiece en 0", hint: "En Variables crea 'contador' y usa 'establecer contador a 0' antes del ciclo." },
      { forever: true, text: "Un ciclo que revisa el botón para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inCond: ["interruptor_read"], text: "Leer el botón en la condición de un 'si'", hint: "Pon 'leer Pin' del botón en la condición de un 'si'." },
      { inIf: ["math_change"], text: "Sumar 1 solo cuando se presiona", hint: "El 'cambiar contador por 1' va DENTRO del 'si', no afuera." },
      { inIf: ["text_print"], text: "Imprimir el número al presionar", hint: "Dentro del 'si' usa 'imprimir' con la variable." },
      { inLoop: ["time_sleep"], text: "Una pequeña espera", hint: "Sin una espera, una sola presión cuenta muchas veces: agrega 'esperar 0.2 segundos' dentro del 'si' o del ciclo." },
    ],
  },
  {
    id: "thermometer", level: 3, icon: "🌡️", title: "Termómetro en pantalla",
    desc: "Lee la temperatura con un DHT11/DHT22 y muéstrala en una pantalla (OLED, LCD o TM1637) cada pocos segundos.",
    checks: [
      { has: ["dht_init"], text: "Iniciar el sensor DHT", hint: "Ve a Sensores → Sensores Digitales → DHT11 / DHT22." },
      { forever: true, text: "Un ciclo que mide para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["dht_measure"], text: "Medir dentro del ciclo", hint: "Antes de leer la temperatura hay que usar 'medir DHT' dentro del ciclo." },
      { inside: ["dht_temperature"], of: ["oled_text", "oled_text20", "lcd_print", "lcd_i2c_print", "tm1637_number", "tm1637_temperature", "tm1637_show"],
        text: "Mostrar la temperatura en la pantalla", hint: "Pon 'temperatura DHT' dentro del bloque de texto de tu pantalla (puedes unirlo con 'crear texto con')." },
      { inLoop: ["time_sleep"], text: "Esperar entre lecturas", hint: "El DHT necesita unos 2 segundos entre medidas: agrega 'esperar 2 segundos'." },
    ],
  },
  {
    id: "servo_knob", level: 3, icon: "🎛️", title: "Servo con perilla",
    desc: "Mueve el servo girando un potenciómetro: la perilla manda el ángulo.",
    checks: [
      { has: ["init_servo"], text: "Iniciar el servo", hint: "Ve a Actuadores → Servo." },
      { has: ["adc_pin"], text: "Preparar la lectura del potenciómetro (ADC)", hint: "En Machine → ADC usa 'ADC(Pin(...))' con un pin analógico (mira 🛠 Mapa de pines)." },
      { forever: true, text: "Un ciclo que lee la perilla para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inside: ["adc_read", "adc_read_u16"], of: ["move_servo_var", "servo_move_pulse"], text: "La lectura va dentro del ángulo del servo", hint: "Usa 'servo mover a' con hueco y pon ahí la lectura. Como el potenciómetro da 0 a 4095 y el servo usa 0 a 180, divide la lectura entre 23." },
      { inLoop: RETO_SERVO_MOVE, text: "Mover el servo dentro del ciclo", hint: "El bloque del servo va DENTRO del ciclo para que siga a la perilla." },
    ],
  },

  // ── Retos agregados (tercera tanda): sensores, módulos y comunicación ──
  {
    id: "distance", level: 1, icon: "📏", title: "Medidor de distancia",
    desc: "Con el sensor ultrasónico HC-SR04, muestra en el monitor serial la distancia a la que está tu mano, una y otra vez.",
    checks: [
      { has: ["init_ultrasonic_hcsr04"], text: "Iniciar el sensor ultrasónico", hint: "Ve a Sensores → Sensores Digitales → Ultrasónico y usa 'Preparar sensor ultrasónico'." },
      { forever: true, text: "Un ciclo que mide para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["read_ultrasonic_hcsr04"], text: "Leer la distancia dentro del ciclo", hint: "Usa 'leer distancia (cm)' dentro del ciclo (puedes guardarla en una variable)." },
      { inLoop: ["text_print"], text: "Imprimir la distancia", hint: "En Textos usa 'imprimir' con la distancia." },
      { inLoop: ["time_sleep"], text: "Esperar entre lecturas", hint: "Agrega 'esperar 0.5 segundos' para poder leer los números." },
    ],
  },
  {
    id: "parking", level: 2, icon: "🚗", title: "Sensor de reversa",
    desc: "Haz que el buzzer suene cuando algo esté cerca del sensor ultrasónico, como en los autos al estacionarse.",
    checks: [
      { has: ["init_ultrasonic_hcsr04"], text: "Iniciar el sensor ultrasónico", hint: "Ve a Sensores → Sensores Digitales → Ultrasónico." },
      { forever: true, text: "Un ciclo que mide para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["read_ultrasonic_hcsr04"], text: "Leer la distancia dentro del ciclo", hint: "Guarda 'leer distancia (cm)' en una variable dentro del ciclo." },
      { inCond: ["logic_compare"], text: "Comparar la distancia en un 'si'", hint: "En Lógica usa 'si' con una comparación, por ejemplo distancia < 20." },
      { inIf: RETO_BUZZER, text: "Hacer sonar el buzzer dentro del 'si'", hint: "Ve a Sensores → Sensores Digitales → Buzzer (KY-006) y pon un tono dentro del 'si'." },
    ],
  },
  {
    id: "weather", level: 1, icon: "🌤️", title: "Estación del clima",
    desc: "Con el sensor DHT11, muestra la temperatura y la humedad en el monitor serial cada 2 segundos.",
    checks: [
      { has: ["dht_init"], text: "Iniciar el sensor DHT", hint: "Ve a Sensores → Sensores Digitales → DHT11 / DHT22." },
      { forever: true, text: "Un ciclo que mide para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["dht_measure"], text: "Medir dentro del ciclo", hint: "Antes de leer hay que usar 'medir DHT' dentro del ciclo." },
      { inLoop: ["text_print"], min: 2, text: "Imprimir dos datos (temperatura y humedad)", hint: "Usa dos 'imprimir': uno con la temperatura y otro con la humedad." },
      { inLoop: ["time_sleep"], text: "Esperar 2 segundos entre lecturas", hint: "El DHT necesita unos 2 segundos entre medidas." },
    ],
  },
  {
    id: "heat_alarm", level: 2, icon: "🔥", title: "Alarma de calor",
    desc: "Enciende un LED cuando la temperatura pase de 30 °C y apágalo cuando baje.",
    checks: [
      { has: ["dht_init"], text: "Iniciar el sensor DHT", hint: "Ve a Sensores → Sensores Digitales → DHT11 / DHT22." },
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y crea el LED." },
      { forever: true, text: "Un ciclo que mide para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["dht_measure"], text: "Medir dentro del ciclo", hint: "Usa 'medir DHT' dentro del ciclo." },
      { anyOf: [{ inCond: ["dht_temperature"] }, { inCond: ["logic_compare"] }], text: "Comparar la temperatura en un 'si'", hint: "Usa 'si' con 'temperatura DHT > 30'." },
      { inIfField: { type: "set_led", name: "STATE", value: "1" }, text: "Encender el LED si hace calor", hint: "Dentro del 'si' pon el LED en 'on'." },
      { inIfField: { type: "set_led", name: "STATE", value: "0" }, text: "Apagar el LED si no ('si no')", hint: "Agrega 'si no' con el engranaje y ahí pon el LED en 'off'." },
    ],
  },
  {
    id: "strip_colors", level: 1, icon: "🌈", title: "Tira de colores",
    desc: "Enciende los primeros 3 LEDs de una tira NeoPixel, cada uno de un color distinto.",
    checks: [
      { has: RETO_NEOPIXEL_INIT, text: "Preparar la tira NeoPixel", hint: "Ve a Pantallas → NeoPixel y usa 'Preparar tira NeoPixel'." },
      { has: ["neopixel_pixel_x"], min: 3, text: "Dar color a 3 LEDs", hint: "Usa 'establecer color de LED' tres veces, con los LEDs 0, 1 y 2." },
      { has: ["neopixel_write"], text: "Actualizar los LEDs", hint: "Sin 'actualizar LEDs' los colores no se ven: agrégalo al final." },
    ],
  },
  {
    id: "servo_smooth", level: 3, icon: "🦾", title: "Servo suave",
    desc: "Mueve el servo de 0° a 180° poco a poco, de 10 en 10 grados, usando un ciclo 'contar'.",
    checks: [
      { has: ["init_servo"], text: "Iniciar el servo", hint: "Ve a Actuadores → Servo." },
      { has: ["controls_for"], text: "Un ciclo 'contar con … de … a … de a …'", hint: "En Ciclos usa 'contar con i de 0 a 180 de a 10'." },
      { inside: ["variables_get"], of: ["move_servo_var", "servo_move_pulse"], text: "El ángulo del servo es la variable del ciclo", hint: "Usa 'servo mover a' con hueco y pon ahí la variable i." },
      { inLoop: ["time_sleep"], text: "Esperar un poco en cada paso", hint: "Pon 'esperar 0.1 segundos' dentro del ciclo." },
    ],
  },
  {
    id: "dice", level: 2, icon: "🎲", title: "Dado electrónico",
    desc: "Cada vez que presiones el botón, muestra un número al azar del 1 al 6.",
    checks: [
      { has: ["interruptor_init"], text: "Iniciar el botón", hint: "Ve a Interruptores y crea el botón con su pin." },
      { forever: true, text: "Un ciclo que revisa el botón", hint: "Usa 'repetir mientras verdadero'." },
      { inCond: ["interruptor_read"], text: "Leer el botón en la condición de un 'si'", hint: "Pon 'leer Pin' del botón en la condición de un 'si'." },
      { inIf: ["math_random_int"], text: "Un número al azar dentro del 'si'", hint: "En Matemáticas usa 'entero aleatorio de 1 a 6'." },
      { inIf: ["text_print", "tm1637_number", "oled_text", "seg7_number_var"], text: "Mostrar el número", hint: "Imprímelo o muéstralo en un display, dentro del 'si'." },
      { inLoop: ["time_sleep"], text: "Una pequeña espera", hint: "Agrega 'esperar 0.3 segundos' para que una presión no tire muchos dados." },
    ],
  },
  {
    id: "countdown", level: 2, icon: "⏳", title: "Cuenta regresiva",
    desc: "Haz una cuenta regresiva de 10 a 0 en el display TM1637, un número por segundo.",
    checks: [
      { has: ["tm1637_init"], text: "Iniciar el TM1637", hint: "Ve a Pantallas → TM1637 y usa 'iniciar CLK DIO brillo'." },
      { has: ["controls_for"], text: "Un ciclo 'contar de 10 a 0'", hint: "En Ciclos usa 'contar con i de 10 a 0 de a 1'." },
      { inside: ["variables_get"], of: ["tm1637_number"], text: "Mostrar la variable del ciclo", hint: "En 'mostrar valor' pon la variable i." },
      { inLoop: ["time_sleep"], text: "Esperar 1 segundo en cada número", hint: "Pon 'esperar 1 segundo' dentro del ciclo." },
    ],
  },
  {
    id: "robot_dance", level: 2, icon: "🕺", title: "Baile del robot",
    desc: "Con el puente H, haz que el robot avance, retroceda y gire, una y otra vez.",
    checks: [
      { has: ["init_dc_motor"], text: "Preparar los motores (L298N)", hint: "Ve a Actuadores → Motor DC y usa 'Preparar Motor DC'." },
      { forever: true, text: "Un ciclo que se repite para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["move_dc_motor1_on_off"], min: 4, text: "Al menos 4 movimientos de motor", hint: "Usa 'Controlar Motor DC' varias veces: adelante, atrás y girar." },
      { inLoop: ["time_sleep"], min: 2, text: "Esperas entre movimientos", hint: "Cada movimiento necesita su tiempo: pon un 'esperar' después de cada uno." },
    ],
  },
  {
    id: "relay_timer", level: 1, icon: "⏲️", title: "Temporizador con relevador",
    desc: "Activa el relevador, espera 3 segundos y desactívalo (por ejemplo, para prender un foco un momento).",
    checks: [
      { has: ["actuador_init"], text: "Preparar el relevador", hint: "Ve a Actuadores → Relevador y usa el bloque con su pin." },
      { has: ["actuador_on_off"], min: 2, text: "Activarlo y desactivarlo", hint: "Usa el bloque de valor dos veces: primero encendido y luego apagado." },
      { has: ["time_sleep"], text: "Esperar entre los dos", hint: "Pon 'esperar 3 segundos' entre encender y apagar." },
    ],
  },
  {
    id: "line_led", level: 2, icon: "⬛", title: "Detector de línea",
    desc: "Con el sensor infrarrojo, enciende el LED cuando esté sobre una línea negra.",
    checks: [
      { has: ["init_infrarrojo"], text: "Preparar el sensor infrarrojo", hint: "Ve a Sensores → Sensores Digitales → Sensores IR y usa 'Preparar sensor infrarrojo'." },
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y crea el LED." },
      { forever: true, text: "Un ciclo que lee el sensor", hint: "Usa 'repetir mientras verdadero'." },
      { anyOf: [{ inCond: ["read_infrarrojo"] }, { allOf: [{ inLoop: ["read_infrarrojo"] }, { inCond: ["logic_compare"] }] }], text: "Revisar el sensor en un 'si'", hint: "Usa 'si leer sensor infrarrojo = 0' (0 es negro)." },
      { inIfField: { type: "set_led", name: "STATE", value: "1" }, text: "Encender el LED sobre negro", hint: "Dentro del 'si' pon el LED en 'on'." },
      { inIfField: { type: "set_led", name: "STATE", value: "0" }, text: "Apagarlo sobre blanco ('si no')", hint: "Agrega 'si no' y ahí pon el LED en 'off'." },
    ],
  },
  {
    id: "touch_lamp", level: 2, icon: "👆", title: "Lámpara táctil",
    desc: "Usa un cable con papel aluminio como botón táctil: al tocarlo se enciende el LED.",
    checks: [
      { has: ["touch_init"], text: "Preparar el TouchPad", hint: "Ve a Machine → TouchPad y elige un pin táctil (como el 4)." },
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y crea el LED." },
      { forever: true, text: "Un ciclo que revisa el toque", hint: "Usa 'repetir mientras verdadero'." },
      { anyOf: [{ inCond: ["touch_read"] }, { allOf: [{ inLoop: ["touch_read"] }, { inCond: ["logic_compare"] }] }], text: "Comparar la lectura táctil en un 'si'", hint: "Al tocarlo el número baja: usa 'si leer TouchPad < 200'." },
      { inIfField: { type: "set_led", name: "STATE", value: "1" }, text: "Encender el LED al tocar", hint: "Dentro del 'si' pon el LED en 'on'." },
      { inIfField: { type: "set_led", name: "STATE", value: "0" }, text: "Apagarlo al soltar ('si no')", hint: "Agrega 'si no' y ahí pon el LED en 'off'." },
    ],
  },
  {
    id: "wifi_ip", level: 1, icon: "📶", title: "Conéctate al WiFi",
    desc: "Conecta el ESP32 a una red WiFi de 2.4 GHz y muestra en el monitor la dirección IP que le dieron.",
    checks: [
      { has: ["wifi_connect"], text: "Conectarse a la red", hint: "Ve a Comunicación Inalámbrica → WiFi y usa 'conectar SSID contraseña'." },
      { inside: ["wifi_current_ip"], of: ["text_print", "text_join"], text: "Imprimir la IP", hint: "Usa 'imprimir' con el bloque 'WiFi IP actual'." },
    ],
  },
  {
    id: "espnow_beacon", level: 3, icon: "📡", title: "Faro ESP-NOW",
    desc: "Haz que un ESP32 mande un mensaje por ESP-NOW a otro cada segundo, sin router.",
    checks: [
      { has: ["wifi_init"], text: "Activar el WiFi", hint: "ESP-NOW usa la radio del WiFi: en Comunicación Inalámbrica → WiFi usa 'Inicializar WiFi'." },
      { has: ["init_espnow_simple"], text: "Iniciar ESP-NOW", hint: "Ve a Comunicación Inalámbrica → ESP-NOW y usa 'Iniciar ESP-NOW'." },
      { has: ["espnow_add_peer"], text: "Agregar al receptor (su MAC)", hint: "Usa 'Agregar receptor ESP-NOW' con la MAC del otro ESP32." },
      { forever: true, text: "Un ciclo que se repite para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["espnow_send_peer"], text: "Enviar el mensaje dentro del ciclo", hint: "Pon 'Enviar mensaje ESP-NOW' dentro del ciclo." },
      { inLoop: ["time_sleep"], text: "Esperar 1 segundo entre mensajes", hint: "Agrega 'esperar 1 segundo'." },
    ],
  },
  {
    id: "rfid_reader", level: 3, icon: "💳", title: "Lector de tarjetas",
    desc: "Cuando acerques una tarjeta RFID, muestra su número (UID) en el monitor serial.",
    checks: [
      { has: ["rfid_mfrc522_init"], text: "Iniciar el lector RFID", hint: "Ve a Periféricos → Modulos SPI → RFID MFRC522 y usa 'Inicializar RFID'." },
      { forever: true, text: "Un ciclo que busca tarjetas", hint: "Usa 'repetir mientras verdadero'." },
      { inCond: ["rfid_mfrc522_detect"], text: "Revisar si hay tarjeta en un 'si'", hint: "Pon 'tarjeta presente' en la condición de un 'si'." },
      { inside: ["rfid_mfrc522_uid"], of: ["text_print", "text_join"], text: "Imprimir el UID", hint: "Dentro del 'si' usa 'imprimir' con 'obtener UID'." },
      { inLoop: ["time_sleep"], text: "Una pequeña espera", hint: "Agrega 'esperar 0.5 segundos' para que no repita la misma tarjeta muchas veces." },
    ],
  },
  {
    id: "matrix_name", level: 1, icon: "🟥", title: "Tu nombre en la matriz",
    desc: "Escribe tu nombre (o tus iniciales) en la matriz de LEDs 8x8.",
    checks: [
      { has: ["matrix8_init"], text: "Iniciar la matriz 8x8", hint: "Ve a Pantallas → Matrix 8x8 y usa 'Inicializar Matrix 8x8'." },
      { has: ["matrix8_text", "matrix8_scroll_text"], text: "Escribir un texto", hint: "Usa el bloque 'texto' (o 'scroll texto' para que se desplace)." },
    ],
  },
  {
    id: "oled_counter", level: 3, icon: "🖥️", title: "Contador en pantalla",
    desc: "Muestra en la pantalla OLED un número que suba de 1 en 1 cada segundo.",
    checks: [
      { has: ["oled_init", "sh1106_init"], text: "Iniciar la pantalla OLED", hint: "Ve a Pantallas → OLED y usa 'Inicializar OLED'." },
      { has: ["variables_set"], text: "Una variable que empiece en 0", hint: "En Variables crea 'contador' y ponla en 0 antes del ciclo." },
      { forever: true, text: "Un ciclo que se repite para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["math_change"], text: "Sumar 1 dentro del ciclo", hint: "Usa 'cambiar contador por 1'." },
      { inLoop: ["oled_clear"], text: "Limpiar la pantalla en cada vuelta", hint: "Sin limpiar, los números se enciman: usa 'limpiar' antes de escribir." },
      { inside: ["variables_get"], of: ["oled_text", "oled_text20", "text_join", "text"], text: "Escribir el contador en la pantalla", hint: "En el 'texto' de la OLED pon la variable (si hace falta, únela con 'crear texto con')." },
      { inLoop: ["time_sleep"], text: "Esperar 1 segundo", hint: "Agrega 'esperar 1 segundo' dentro del ciclo." },
    ],
  },
  {
    id: "night_light", level: 2, icon: "💡", title: "Luz nocturna",
    desc: "Con el sensor BH1750, enciende el LED cuando haya menos de 50 lux.",
    checks: [
      { has: ["bh1750_init"], text: "Iniciar el sensor de luz BH1750", hint: "Ve a Periféricos → Modulos I2C → Sensor Luz BH1750 y usa 'Inicializar BH1750'." },
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y crea el LED." },
      { forever: true, text: "Un ciclo que mide la luz", hint: "Usa 'repetir mientras verdadero'." },
      { anyOf: [{ inCond: ["bh1750_read_lux"] }, { allOf: [{ inLoop: ["bh1750_read_lux"] }, { inCond: ["logic_compare"] }] }], text: "Comparar la luz en un 'si'", hint: "Usa 'si leer luz (lux) < 50'." },
      { inIfField: { type: "set_led", name: "STATE", value: "1" }, text: "Encender el LED si está oscuro", hint: "Dentro del 'si' pon el LED en 'on'." },
      { inIfField: { type: "set_led", name: "STATE", value: "0" }, text: "Apagarlo si hay luz ('si no')", hint: "Agrega 'si no' y ahí pon el LED en 'off'." },
    ],
  },

  // ── Retos agregados (cuarta tanda): más módulos, lógica, archivos y comunicación ──
  {
    id: "hello_loop", level: 1, icon: "🔁", title: "Saluda 5 veces",
    desc: "Haz que el monitor serial muestre tu saludo exactamente 5 veces, usando un ciclo 'repetir'.",
    checks: [
      { repeat: 5, text: "Un ciclo 'repetir 5 veces'", hint: "En Ciclos usa 'repetir … veces hacer' y escribe 5." },
      { inLoop: ["text_print"], text: "Imprimir dentro del ciclo", hint: "En Textos arrastra 'imprimir' DENTRO del 'repetir' y escribe tu saludo." },
    ],
  },
  {
    id: "rgb_cycle", level: 1, icon: "🔴", title: "Colores del LED RGB",
    desc: "Haz que el LED RGB se ponga rojo, luego verde y luego azul, una y otra vez.",
    checks: [
      { has: ["rgb_init"], text: "Crear el LED RGB", hint: "Ve a LEDs → LED RGB y usa el bloque que crea el LED con sus pines R, G y B." },
      { forever: true, text: "Un ciclo que se repite para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["set_led_rgb"], min: 3, text: "Tres colores dentro del ciclo", hint: "Usa el bloque 'R … G … B …' tres veces: primero solo R en on, luego solo G y luego solo B." },
      { inLoop: ["time_sleep"], min: 3, text: "Una espera después de cada color", hint: "Pon un 'esperar 1 segundos' después de cada color; si no, cambian tan rápido que no se ven." },
    ],
  },
  {
    id: "lcd_hello", level: 1, icon: "📟", title: "Hola en la LCD",
    desc: "En la pantalla LCD I2C escribe tu nombre en la primera fila y tu grupo en la segunda.",
    checks: [
      { has: ["lcd_i2c_init"], text: "Iniciar la LCD I2C", hint: "Ve a Pantallas → LCD I2C y usa el bloque LCD_I2C con SDA, SCL y la dirección (casi siempre 0x27)." },
      { has: ["lcd_i2c_cursor"], text: "Pasar a la segunda fila", hint: "Antes del segundo texto usa 'cursor columna 0 fila 1' (las filas empiezan en 0)." },
      { has: ["lcd_i2c_print"], min: 2, text: "Escribir dos textos", hint: "Usa 'escribir' dos veces: tu nombre y tu grupo." },
    ],
  },
  {
    id: "stepper_turn", level: 1, icon: "⚙️", title: "Vuelta completa",
    desc: "Haz que el motor a pasos dé una vuelta completa (360°), espere 1 segundo y regrese.",
    checks: [
      { has: ["stepper_init"], text: "Preparar el motor a pasos", hint: "Ve a Actuadores → Stepper Motor y usa el bloque con IN1 a IN4." },
      { has: ["stepper_degrees", "stepper_degrees_var", "stepper_angle", "stepper_angle_var"], min: 2, text: "Girar de ida y de regreso", hint: "Usa 'girar 360 grados' y después 'girar -360 grados'." },
      { has: ["time_sleep"], text: "Esperar entre los dos giros", hint: "Pon 'esperar 1 segundos' entre la ida y el regreso." },
    ],
  },
  {
    id: "mp3_player", level: 1, icon: "🎶", title: "Reproductor MP3",
    desc: "Con el DFPlayer, pon el volumen en 20 y reproduce la primera canción de la tarjeta microSD.",
    checks: [
      { has: ["dfplayer_init"], text: "Iniciar el DFPlayer", hint: "Ve a Periféricos → Modulos UART → DFPlayer y usa el bloque con TX y RX." },
      { has: ["dfplayer_volume", "dfplayer_volume_var"], text: "Poner el volumen", hint: "Usa 'volumen 20' (va de 0 a 30)." },
      { has: ["dfplayer_play"], text: "Reproducir", hint: "Usa 'reproducir' después del volumen." },
    ],
  },
  {
    id: "encoder_value", level: 1, icon: "🎚️", title: "Perilla infinita",
    desc: "Gira el encoder rotatorio y muestra su valor en el monitor serial mientras lo mueves.",
    checks: [
      { has: ["encoder_rotary_init"], text: "Iniciar el encoder", hint: "Ve a Periféricos → Encoder Rotatorio y usa el bloque con CLK y DT." },
      { forever: true, text: "Un ciclo que lee para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["encoder_rotary_value"], text: "Leer el valor dentro del ciclo", hint: "Usa 'imprimir' con 'encoder valor' dentro del ciclo." },
      { inLoop: ["time_sleep"], text: "Una pequeña espera", hint: "Agrega 'esperar 0.2 segundos' para poder leer los números." },
    ],
  },
  {
    id: "altimeter", level: 1, icon: "⛰️", title: "Altímetro",
    desc: "Con el sensor BMP180/BMP280, muestra la presión y la altitud en el monitor serial cada segundo. Súbelo y bájalo: ¿cambia?",
    checks: [
      { has: ["bmp_sensor_init"], text: "Iniciar el sensor de presión", hint: "Ve a Periféricos → Modulos I2C → Sensores Presion y elige tu modelo." },
      { forever: true, text: "Un ciclo que mide para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["bmp_read_pressure", "bmp_read_altitude", "bmp_select"], min: 2, text: "Leer presión y altitud", hint: "Usa 'bmp presion' y 'bmp altitud' dentro del ciclo." },
      { inLoop: ["text_print"], text: "Imprimir los datos", hint: "Usa 'imprimir' (puedes unir los dos con 'crear texto con')." },
      { inLoop: ["time_sleep"], text: "Esperar 1 segundo", hint: "Agrega 'esperar 1 segundos'." },
    ],
  },
  {
    id: "wifi_scan", level: 1, icon: "📡", title: "¿Qué redes hay cerca?",
    desc: "Busca las redes WiFi que hay alrededor y muéstralas en el monitor serial.",
    checks: [
      { has: ["wifi_init"], text: "Activar el WiFi", hint: "Ve a Comunicación Inalámbrica → WiFi y usa 'inicializar WiFi como sta_if'." },
      { inside: ["wifi_scan"], of: ["text_print", "variables_set", "controls_forEach"], text: "Mostrar la lista de redes", hint: "Usa 'imprimir' con 'WiFi escanear redes' (o recórrela con 'para cada elemento')." },
    ],
  },
  {
    id: "times_table", level: 2, icon: "✖️", title: "Tabla del 7",
    desc: "Imprime la tabla del 7 (7, 14, 21… hasta 70) usando un ciclo 'contar'.",
    checks: [
      { has: ["controls_for"], text: "Un ciclo 'contar desde 1 hasta 10'", hint: "En Ciclos usa 'contar con i desde 1 hasta 10 de a 1'." },
      { field: { type: "math_arithmetic", name: "OP", value: "MULTIPLY" }, text: "Una multiplicación", hint: "En Matemáticas usa el bloque '+' y cámbialo a '×'." },
      { inside: ["variables_get"], of: ["math_arithmetic"], text: "Multiplicar la variable del ciclo", hint: "En el '×' pon la variable i y el número 7." },
      { inLoop: ["text_print"], text: "Imprimir dentro del ciclo", hint: "El 'imprimir' va DENTRO del 'contar', con la multiplicación." },
    ],
  },
  {
    id: "seg7_count", level: 2, icon: "8️⃣", title: "Contador de 0 a 9",
    desc: "Muestra los números del 0 al 9 en el display de 7 segmentos, uno por segundo.",
    checks: [
      { has: ["seg7_init"], text: "Iniciar el display de 7 segmentos", hint: "Ve a Pantallas → DISPLAY 7 SEG y usa el bloque con los pines A a G." },
      { has: ["controls_for"], text: "Un ciclo 'contar desde 0 hasta 9'", hint: "En Ciclos usa 'contar con i desde 0 hasta 9 de a 1'." },
      { inside: ["variables_get"], of: ["seg7_number_var"], text: "Mostrar la variable del ciclo", hint: "Usa 'mostrar número' (el que tiene hueco) y pon la variable i." },
      { inLoop: ["time_sleep"], text: "Esperar 1 segundo en cada número", hint: "Pon 'esperar 1 segundos' dentro del ciclo." },
    ],
  },
  {
    id: "joystick", level: 2, icon: "🕹️", title: "Lee el joystick",
    desc: "Muestra en el monitor serial los valores X y Y del joystick mientras lo mueves.",
    checks: [
      { has: ["ky023_analog"], text: "Preparar el joystick", hint: "Ve a Sensores → Sensores Analogico/Digital y usa el bloque JOYSTICK con sus pines x, y y sw." },
      { forever: true, text: "Un ciclo que lee para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["ky023_read_x", "ky023_read_y", "ky023_select"], min: 2, text: "Leer X y Y dentro del ciclo", hint: "Usa 'joystick X' y 'joystick Y' dentro del ciclo." },
      { inLoop: ["text_print"], text: "Imprimir los valores", hint: "Usa 'imprimir' (puedes unir X y Y con 'crear texto con')." },
      { inLoop: ["time_sleep"], text: "Una pequeña espera", hint: "Agrega 'esperar 0.2 segundos'." },
    ],
  },
  {
    id: "compass", level: 2, icon: "🧭", title: "Brújula",
    desc: "Lee los ejes X y Y del sensor QMC5883L y muéstralos en el monitor serial. Gira la placa y mira cómo cambian.",
    checks: [
      { has: ["qmc5883l_init"], text: "Iniciar la brújula", hint: "Ve a Periféricos → Modulos I2C → Sensor Brújula QMC5883L." },
      { forever: true, text: "Un ciclo que mide para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["qmc5883l_read_xyz"], text: "Medir dentro del ciclo", hint: "Antes de pedir los ejes usa 'leer XYZ' dentro del ciclo; si no, siempre da el mismo valor." },
      { inLoop: ["qmc5883l_read_x", "qmc5883l_read_y", "qmc5883l_select"], min: 2, text: "Leer los ejes X y Y", hint: "Usa 'eje X' y 'eje Y' después de 'leer XYZ'." },
      { inLoop: ["text_print"], text: "Imprimir los valores", hint: "Usa 'imprimir' con los dos ejes." },
    ],
  },
  {
    id: "water_temp", level: 2, icon: "🌊", title: "Temperatura del agua",
    desc: "Con la sonda DS18B20 (es a prueba de agua), muestra la temperatura cada 2 segundos.",
    checks: [
      { has: ["ky001_init"], text: "Iniciar el DS18B20", hint: "Ve a Sensores → Sensores Digitales → DS18B20 (KY-001)." },
      { has: ["ky001_scan"], text: "Buscar la sonda", hint: "Guarda 'buscar sensores DS18B20' en una variable (por ejemplo 'sensores') antes del ciclo." },
      { forever: true, text: "Un ciclo que mide para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["ky001_convert"], text: "Convertir dentro del ciclo", hint: "Antes de leer usa 'convertir temperatura DS18B20' y espera 1 segundo." },
      { inLoop: ["ky001_read_index"], text: "Leer la temperatura", hint: "Usa 'leer temperatura sensor' con tu variable de sensores y el número 0." },
      { inLoop: ["time_sleep"], text: "Esperar entre lecturas", hint: "Agrega 'esperar 1 segundos' después de convertir." },
    ],
  },
  {
    id: "keypad_print", level: 2, icon: "🔢", title: "¿Qué tecla presionaste?",
    desc: "Muestra en el monitor serial cada tecla que presiones en el teclado matricial.",
    checks: [
      { has: ["init_keypad_4x4", "init_keypad_3x4", "init_keypad4x4_i2c"], text: "Preparar el teclado", hint: "Ve a Periféricos → Teclados y elige el tuyo (4x4, 4x3 o 4x4 I2C)." },
      { forever: true, text: "Un ciclo que revisa el teclado", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["keypad_get_key", "keypad_get_key_i2c"], text: "Leer el teclado dentro del ciclo", hint: "Guarda 'teclado leer' en una variable 'tecla' dentro del ciclo." },
      { inIf: ["text_print"], text: "Imprimir solo si hay tecla", hint: "Si no presionas nada se lee 'nulo': usa 'si tecla ≠ nulo' (Lógica) y dentro 'imprimir tecla'." },
      { inLoop: ["time_sleep"], text: "Una pequeña espera", hint: "Agrega 'esperar 0.2 segundos' para que una tecla no salga repetida." },
    ],
  },
  {
    id: "rtc_clock", level: 2, icon: "🕰️", title: "Reloj de tiempo real",
    desc: "Con el módulo DS3231, muestra la hora y los minutos cada segundo (en el monitor o en una pantalla).",
    checks: [
      { has: ["rtc_ds3231_init"], text: "Iniciar el reloj DS3231", hint: "Ve a Periféricos → Modulos I2C → RTC DS3231." },
      { forever: true, text: "Un ciclo que se repite para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["rtc_ds3231_get_hour", "rtc_ds3231_get_minute", "rtc_ds3231_get_second", "rtc_ds3231_select"], min: 2, text: "Leer la hora y los minutos", hint: "Usa 'rtc_ds3231 hora' y 'rtc_ds3231 minuto' (únelos con 'crear texto con' y ':')." },
      { inLoop: ["text_print", "lcd_i2c_print", "oled_text", "tm1637_numbers", "tm1637_show"], text: "Mostrar la hora", hint: "Imprímela o muéstrala en tu pantalla, dentro del ciclo." },
      { inLoop: ["time_sleep"], text: "Esperar 1 segundo", hint: "Agrega 'esperar 1 segundos'." },
    ],
  },
  {
    id: "water_flow", level: 2, icon: "💧", title: "Medidor de agua",
    desc: "Con el sensor de flujo YF-S201, muestra cada segundo los litros por minuto y los litros totales que han pasado.",
    checks: [
      { has: ["yf201_init"], text: "Iniciar el sensor de flujo", hint: "Ve a Periféricos → Flujo Agua y usa el bloque con su pin." },
      { forever: true, text: "Un ciclo que mide para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["yf201_flow_rate"], text: "Leer el flujo (L/min)", hint: "Usa 'flow flujo L/min' dentro del ciclo." },
      { inLoop: ["yf201_total_liters"], text: "Leer los litros totales", hint: "Usa 'flow litros totales' dentro del ciclo." },
      { inLoop: ["time_sleep"], text: "Esperar 1 segundo", hint: "Agrega 'esperar 1 segundos'." },
    ],
  },
  {
    id: "breathing_led", level: 2, icon: "🫁", title: "LED que respira",
    desc: "Haz que un LED se encienda y se apague suavemente, como si respirara, usando PWM.",
    checks: [
      { has: ["pwm_init"], text: "Preparar el PWM", hint: "Ve a Machine → PWM y usa 'PWM(Pin(2), freq=1000, duty=0)'." },
      { has: ["controls_for"], min: 2, text: "Dos ciclos 'contar': uno sube y otro baja", hint: "Usa 'contar con i desde 0 hasta 1023 de a 10' y otro 'desde 1023 hasta 0'." },
      { inside: ["variables_get"], of: ["pwm_duty_var"], text: "El brillo es la variable del ciclo", hint: "Usa 'pwm .duty( )' (el que tiene hueco) y pon la variable i." },
      { inLoop: ["time_sleep"], min: 2, text: "Una espera corta en cada paso", hint: "Pon 'esperar 10 milisegundos' dentro de cada ciclo." },
    ],
  },
  {
    id: "ble_hello", level: 2, icon: "📲", title: "Saludo por BLE",
    desc: "Haz que el ESP32 aparezca en el celular con tu nombre por Bluetooth BLE y que mande «Hola» cada 2 segundos.",
    checks: [
      { has: ["ble_init_uart"], text: "Iniciar BLE", hint: "Ve a Comunicación Inalámbrica → BluetoothBLE y usa 'BLE iniciar UART'." },
      { has: ["ble_set_name"], text: "Ponerle tu nombre", hint: "Después de iniciar usa 'BLE nombre' con tu nombre: así lo encuentras en la app del celular." },
      { forever: true, text: "Un ciclo que se repite para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["ble_write"], text: "Enviar dentro del ciclo", hint: "Usa 'BLE enviar' con el texto «Hola»." },
      { inLoop: ["time_sleep"], text: "Esperar 2 segundos", hint: "Agrega 'esperar 2 segundos'." },
    ],
  },
  {
    id: "web_get", level: 2, icon: "🌐", title: "Pide una página web",
    desc: "Conéctate al WiFi y usa HTTP GET para traer un texto de internet (prueba con http://ifconfig.me/ip) y muéstralo.",
    checks: [
      { has: ["wifi_connect"], text: "Conectarse a la red", hint: "Ve a Comunicación Inalámbrica → WiFi y usa 'conectar SSID contraseña'." },
      { inside: ["http_get"], of: ["text_print", "variables_set", "text_join"], text: "Imprimir la respuesta", hint: "Usa 'imprimir' con 'respuesta HTTP GET de' y escribe la dirección." },
    ],
  },
  {
    id: "file_note", level: 2, icon: "📝", title: "Guarda una nota",
    desc: "Guarda un mensaje en un archivo de la memoria del ESP32 y después ábrelo, léelo e imprímelo.",
    checks: [
      { distinct: { type: "file_open", name: "MODE" }, min: 2, text: "Abrir el archivo para escribir y para leer", hint: "En Archivos usa 'abrir archivo' dos veces: una en modo 'escribir' y otra en modo 'leer' (dentro de 'with … as f')." },
      { has: ["file_write"], text: "Escribir el mensaje", hint: "Dentro del primer 'with' usa 'f escribir' con tu mensaje." },
      { inside: ["file_read"], of: ["text_print", "variables_set", "text_join"], text: "Leer e imprimir", hint: "Dentro del segundo 'with' usa 'imprimir' con 'f leer'." },
      { anyOf: [{ has: ["with"] }, { has: ["file_close"] }], text: "Cerrar el archivo (o usar 'with')", hint: "Con 'with' se cierra solo; si no, usa 'f cerrar'." },
    ],
  },
  {
    id: "average", level: 2, icon: "📊", title: "Promedio de calificaciones",
    desc: "Guarda 5 calificaciones en una lista y muestra su promedio en el monitor serial.",
    checks: [
      { has: ["lists_create_with"], text: "Una lista con calificaciones", hint: "En Listas usa 'crear lista con' y con el engranaje deja 5 huecos para los números." },
      { field: { type: "math_on_list", name: "OP", value: "AVERAGE" }, text: "Calcular el promedio", hint: "En Matemáticas usa 'suma de la lista' y cambia 'suma' por 'promedio'." },
      { inside: ["math_on_list"], of: ["text_print", "text_join"], text: "Imprimir el promedio", hint: "Usa 'imprimir' con 'promedio de la lista'." },
    ],
  },
  {
    id: "even_numbers", level: 2, icon: "2️⃣", title: "Números pares",
    desc: "Imprime solo los números pares del 1 al 20 usando un ciclo y un 'si'.",
    checks: [
      { has: ["controls_for"], text: "Un ciclo 'contar desde 1 hasta 20'", hint: "En Ciclos usa 'contar con i desde 1 hasta 20 de a 1'." },
      { inLoop: ["controls_if"], text: "Un 'si' dentro del ciclo", hint: "Pon un 'si' DENTRO del 'contar'." },
      { anyOf: [{ inCond: ["math_number_property"] }, { inCond: ["math_modulo"] }], text: "Preguntar si el número es par", hint: "En la condición usa 'i es par' (Matemáticas)." },
      { inIf: ["text_print"], text: "Imprimir solo los pares", hint: "El 'imprimir i' va dentro del 'si'." },
    ],
  },
  {
    id: "neo_colors", level: 2, icon: "🟩", title: "Matriz de colores",
    desc: "Llena toda la matriz NeoPixel de un color, luego de otro y luego de otro, para siempre.",
    checks: [
      { has: ["neopixel_init_5x5", "neopixel_init_8x8"], text: "Preparar la matriz NeoPixel", hint: "Ve a Pantallas → NeoPixel → NeoPixel 5x5 o NeoPixel 8x8." },
      { forever: true, text: "Un ciclo que se repite para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["neopixel_fill"], min: 3, text: "Tres colores de relleno", hint: "Usa 'fill color' tres veces, cada uno con un color distinto." },
      { inLoop: ["neopixel_show"], min: 3, text: "Mostrar después de cada color", hint: "Después de cada 'fill' usa 'mostrar y brillo'; si no, no se ve el cambio." },
      { inLoop: ["time_sleep"], min: 3, text: "Esperar en cada color", hint: "Pon 'esperar 1 segundos' después de cada 'mostrar'." },
    ],
  },
  {
    id: "oled_house", level: 2, icon: "🏠", title: "Dibuja una casa",
    desc: "En la pantalla OLED dibuja una casa: un rectángulo de pared, dos líneas de techo y una puerta rellena.",
    checks: [
      { has: ["oled_init", "sh1106_init"], text: "Iniciar la pantalla OLED", hint: "Ve a Pantallas → OLED (o SH1106) y usa el bloque de inicio." },
      { has: ["oled_rect", "sh1106_rect"], text: "Un rectángulo para la pared", hint: "Usa 'rect x y w h', por ejemplo x 34, y 30, w 60, h 30." },
      { has: ["oled_line", "sh1106_line"], min: 2, text: "Dos líneas para el techo", hint: "Usa 'linea' dos veces, que se junten arriba en la punta del techo." },
      { has: ["oled_fill_rect", "sh1106_fill_rect"], text: "Una puerta rellena", hint: "Usa 'rect lleno' pequeño, abajo, dentro de la pared." },
    ],
  },
  {
    id: "tft_drawing", level: 2, icon: "🖼️", title: "Paisaje en la TFT",
    desc: "En la pantalla TFT pinta un fondo de color, un sol (círculo relleno) y escribe tu nombre.",
    checks: [
      { has: ["tft_init"], text: "Iniciar la pantalla TFT", hint: "Ve a Pantallas → Pantalla TFT y usa el bloque de inicio." },
      { has: ["tft_fill"], text: "Pintar el fondo", hint: "Usa 'color fondo' con un azul de cielo." },
      { has: ["tft_fill_circle"], text: "Dibujar el sol", hint: "Usa 'circulo relleno' con color amarillo." },
      { has: ["tft_text"], text: "Escribir tu nombre", hint: "Usa 'texto' con tu nombre y un color que se vea sobre el fondo." },
    ],
  },
  {
    id: "sound_sensor", level: 2, icon: "🔊", title: "Detector de ruido",
    desc: "Con el sensor de sonido (KY-037), enciende el LED cuando haya un ruido fuerte.",
    checks: [
      { has: ["hybrid_sensor_init"], text: "Preparar el sensor de sonido", hint: "Ve a Sensores → Sensores Analogico/Digital y elige el KY-037 con sus pines A0 y D0." },
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y crea el LED." },
      { forever: true, text: "Un ciclo que escucha para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { anyOf: [{ inCond: ["hybrid_sensor_read_digital", "hybrid_sensor_read_analog"] }, { allOf: [{ inLoop: ["hybrid_sensor_read_digital", "hybrid_sensor_read_analog"] }, { inCond: ["logic_compare"] }] }],
        text: "Revisar el sensor en un 'si'", hint: "Usa 'si Leer Digital Pin = 1' (marca 1 con ruido fuerte; el umbral se ajusta con el tornillito del sensor)." },
      { inIfField: { type: "set_led", name: "STATE", value: "1" }, text: "Encender el LED con ruido", hint: "Dentro del 'si' pon el LED en 'on'." },
      { inIfField: { type: "set_led", name: "STATE", value: "0" }, text: "Apagarlo en silencio ('si no')", hint: "Agrega 'si no' y ahí pon el LED en 'off'." },
    ],
  },
  {
    id: "deep_sleep", level: 2, icon: "😴", title: "Ahorra batería",
    desc: "Haz que el LED parpadee 3 veces y luego el ESP32 duerma 10 segundos en deep sleep. Al despertar empieza de nuevo (mientras duerme, el monitor serial se desconecta).",
    checks: [
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y crea el LED." },
      { repeat: 3, text: "Un ciclo 'repetir 3 veces'", hint: "En Ciclos usa 'repetir 3 veces'." },
      { inLoop: ["set_led", "toggle_led"], text: "Parpadear dentro del ciclo", hint: "Dentro del 'repetir' enciende, espera, apaga y espera." },
      { has: ["machine_deepsleep"], text: "Dormir en deep sleep", hint: "Al final (fuera del ciclo) usa 'deep sleep por 10000 ms' de Tiempo." },
    ],
  },
  {
    id: "tilt_alarm", level: 3, icon: "📐", title: "Alarma de inclinación",
    desc: "Con el MPU6050, enciende el LED cuando inclines la placa hacia un lado.",
    checks: [
      { has: ["mpu6050_init"], text: "Iniciar el MPU6050", hint: "Ve a Periféricos → Modulos I2C → MPU6050 IMU." },
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y crea el LED." },
      { forever: true, text: "Un ciclo que mide para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { anyOf: [{ inCond: ["mpu6050_accel_x", "mpu6050_accel_y", "mpu6050_select_accel"] }, { allOf: [{ inLoop: ["mpu6050_accel_x", "mpu6050_accel_y", "mpu6050_select_accel"] }, { inCond: ["logic_compare"] }] }],
        text: "Comparar la inclinación en un 'si'", hint: "Usa 'si aceleración X > …'. Primero imprime la aceleración X para ver qué número da derecha y cuál inclinada." },
      { inIfField: { type: "set_led", name: "STATE", value: "1" }, text: "Encender el LED al inclinar", hint: "Dentro del 'si' pon el LED en 'on'." },
      { inIfField: { type: "set_led", name: "STATE", value: "0" }, text: "Apagarlo si está derecha ('si no')", hint: "Agrega 'si no' y ahí pon el LED en 'off'." },
    ],
  },
  {
    id: "color_detect", level: 3, icon: "🎨", title: "Detector de rojo",
    desc: "Con el sensor TCS34725, enciende el LED cuando pongas algo rojo frente al sensor.",
    checks: [
      { has: ["tcs34725_init"], text: "Iniciar el sensor de color", hint: "Ve a Periféricos → Modulos I2C → Color TCS34725." },
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y crea el LED." },
      { forever: true, text: "Un ciclo que mide para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { anyOf: [{ inCond: ["tcs34725_red", "tcs34725_select"] }, { allOf: [{ inLoop: ["tcs34725_red", "tcs34725_select"] }, { inCond: ["logic_compare"] }] }],
        text: "Comparar el rojo en un 'si'", hint: "Usa 'si color rojo > color verde': algo rojo refleja más rojo que verde." },
      { inIfField: { type: "set_led", name: "STATE", value: "1" }, text: "Encender el LED con rojo", hint: "Dentro del 'si' pon el LED en 'on'." },
      { inIfField: { type: "set_led", name: "STATE", value: "0" }, text: "Apagarlo con otro color ('si no')", hint: "Agrega 'si no' y ahí pon el LED en 'off'." },
    ],
  },
  {
    id: "keypad_password", level: 3, icon: "🔐", title: "Tecla secreta",
    desc: "Con el teclado matricial, si alguien presiona la tecla secreta (por ejemplo «A»), enciende el LED 2 segundos.",
    checks: [
      { has: ["init_keypad_4x4", "init_keypad_3x4", "init_keypad4x4_i2c"], text: "Preparar el teclado", hint: "Ve a Periféricos → Teclados y elige el tuyo." },
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y crea el LED." },
      { forever: true, text: "Un ciclo que revisa el teclado", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["keypad_get_key", "keypad_get_key_i2c"], text: "Leer el teclado dentro del ciclo", hint: "Guarda 'teclado leer' en una variable 'tecla'." },
      { inCond: ["logic_compare"], text: "Comparar con la tecla secreta", hint: "Usa 'si tecla = \"A\"' (la letra va en un bloque de texto)." },
      { inIfField: { type: "set_led", name: "STATE", value: "1" }, text: "Encender el LED si acierta", hint: "Dentro del 'si' pon el LED en 'on'." },
      { inIf: ["time_sleep"], text: "Dejarlo encendido 2 segundos", hint: "Dentro del 'si': LED on, 'esperar 2 segundos' y LED off." },
    ],
  },
  {
    id: "clap_switch", level: 3, icon: "👏", title: "Aplauso mágico",
    desc: "Con el micrófono INMP441, prende o apaga el LED cada vez que aplaudas fuerte.",
    checks: [
      { has: ["inmp441_init"], text: "Iniciar el micrófono", hint: "Ve a Periféricos → Modulos I2S → Micrófono INMP441." },
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y crea el LED." },
      { forever: true, text: "Un ciclo que escucha para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["inmp441_read"], text: "Leer el audio dentro del ciclo", hint: "Usa 'mic leer audio' al principio del ciclo; si no, el nivel no cambia." },
      { anyOf: [{ inCond: ["inmp441_volume"] }, { allOf: [{ inLoop: ["inmp441_volume"] }, { inCond: ["logic_compare"] }] }], text: "Comparar el nivel de sonido en un 'si'", hint: "Usa 'si mic nivel sonido > …'. Imprime primero el nivel para saber qué número usar." },
      { inIf: ["toggle_led"], text: "Cambiar el LED al aplaudir", hint: "Dentro del 'si' usa 'led alternar'." },
      { inIf: ["time_sleep"], text: "Una pausa después del aplauso", hint: "Agrega 'esperar 0.3 segundos' dentro del 'si' para que un aplauso no cuente dos veces." },
    ],
  },
  {
    id: "melody_list", level: 3, icon: "🎼", title: "Melodía con lista",
    desc: "Guarda varias frecuencias en una lista y tócalas en el buzzer con 'para cada elemento'.",
    checks: [
      { has: ["lists_create_with"], text: "Una lista de frecuencias", hint: "En Listas usa 'crear lista con' y pon números como 262, 294, 330 y 349 (do, re, mi, fa)." },
      { has: ["controls_forEach"], text: "Un ciclo 'para cada elemento'", hint: "En Ciclos usa 'para cada elemento j en la lista'." },
      { inside: ["variables_get"], of: ["buzzer_tone_var"], text: "La frecuencia es el elemento de la lista", hint: "Usa el tono con 'frecuencia (Hz)' y pon ahí la variable j." },
      { inLoop: ["buzzer_tone_var"], text: "Tocar dentro del ciclo", hint: "El bloque del tono va DENTRO de 'para cada elemento'." },
    ],
  },
  {
    id: "bt_led", level: 3, icon: "📱", title: "LED por Bluetooth",
    desc: "Con el módulo HC-06, enciende el LED cuando el celular mande «1» y apágalo cuando mande «0».",
    checks: [
      { has: ["init_hc06"], text: "Iniciar el HC-06", hint: "Ve a Comunicación Inalámbrica → HC-06 y usa el bloque BT con TX y RX." },
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y crea el LED." },
      { forever: true, text: "Un ciclo que espera mensajes", hint: "Usa 'repetir mientras verdadero'." },
      { inCond: ["hc06_any"], text: "Revisar si llegó algo", hint: "Usa 'si HC-06 disponible' para leer solo cuando llegue un dato." },
      { inIf: ["hc06_read"], text: "Leer el dato", hint: "Dentro del 'si' guarda 'decodificar (HC-06 leer)' en una variable: 'decodificar' (Textos) lo vuelve texto." },
      { inIfField: { type: "set_led", name: "STATE", value: "1" }, text: "Encender con «1»", hint: "Usa otro 'si dato = \"1\"' y pon el LED en 'on'." },
      { inIfField: { type: "set_led", name: "STATE", value: "0" }, text: "Apagar con «0»", hint: "Agrega 'si no si dato = \"0\"' y pon el LED en 'off'." },
    ],
  },
  {
    id: "sd_log", level: 3, icon: "🗂️", title: "Bitácora en la SD",
    desc: "Cada 5 segundos guarda la temperatura del DHT en un archivo de la tarjeta microSD (cada dato se agrega al final).",
    checks: [
      { has: ["sdcard_init"], text: "Iniciar la tarjeta SD", hint: "Ve a Periféricos → Modulos SPI → SDCard." },
      { has: ["dht_init"], text: "Iniciar el sensor DHT", hint: "Ve a Sensores → Sensores Digitales → DHT11 / DHT22." },
      { forever: true, text: "Un ciclo que se repite para siempre", hint: "Usa 'repetir mientras verdadero'." },
      { inLoop: ["dht_measure"], text: "Medir dentro del ciclo", hint: "Usa 'medir DHT' dentro del ciclo." },
      { inLoop: ["sdcard_write"], text: "Escribir en el archivo", hint: "Usa 'escribir archivo' con «datos.txt» y la temperatura unida a un salto de línea con 'crear texto con'." },
      { inLoop: ["time_sleep"], text: "Esperar 5 segundos", hint: "Agrega 'esperar 5 segundos'." },
    ],
  },
  {
    id: "dimmer", level: 3, icon: "🔆", title: "Dimmer con perilla",
    desc: "Con un potenciómetro controla el brillo de un LED: mientras más giras, más brilla.",
    checks: [
      { has: ["adc_pin"], text: "Preparar la lectura del potenciómetro (ADC)", hint: "En Machine → ADC usa 'ADC(Pin(…))' con un pin analógico como el 34." },
      { has: ["pwm_init"], text: "Preparar el PWM del LED", hint: "En Machine → PWM usa 'PWM(Pin(2), freq=1000, duty=0)'." },
      { forever: true, text: "Un ciclo que lee la perilla", hint: "Usa 'repetir mientras verdadero'." },
      { inside: ["adc_read", "adc_read_u16"], of: ["pwm_duty_var"], text: "La lectura manda el brillo", hint: "Usa 'pwm .duty( )' con hueco y pon la lectura dividida entre 4 (el ADC llega a 4095 y el duty a 1023)." },
      { inLoop: ["pwm_duty_var"], text: "Cambiar el brillo dentro del ciclo", hint: "El bloque del duty va DENTRO del ciclo." },
    ],
  },
  {
    id: "light_switch", level: 3, icon: "🔌", title: "Apagador inteligente",
    desc: "Cada vez que presiones el botón, el relevador cambia: si estaba apagado se prende y si estaba prendido se apaga.",
    checks: [
      { has: ["interruptor_init"], text: "Iniciar el botón", hint: "Ve a Interruptores y crea el botón." },
      { has: ["actuador_init"], text: "Preparar el relevador", hint: "Ve a Actuadores → Relevador." },
      { forever: true, text: "Un ciclo que revisa el botón", hint: "Usa 'repetir mientras verdadero'." },
      { inCond: ["interruptor_read"], text: "Leer el botón en un 'si'", hint: "Pon 'leer Pin' del botón en la condición de un 'si'." },
      { inIf: ["logic_negate"], text: "Cambiar el estado con 'no'", hint: "Crea la variable 'encendido' y dentro del 'si' usa 'establecer encendido a no encendido'." },
      { inside: ["variables_get"], of: ["actuador_on_off_var"], text: "El relevador sigue a la variable", hint: "Usa 'Actuador encender/apagar según' y pon la variable 'encendido'." },
      { inIf: ["time_sleep"], text: "Una pausa al presionar", hint: "Agrega 'esperar 0.3 segundos' dentro del 'si' para que una presión no cambie dos veces." },
    ],
  },
  {
    id: "two_tasks", level: 3, icon: "⏱️", title: "Dos cosas a la vez",
    desc: "Usa un Timer para que el LED parpadee solo, mientras el ciclo principal imprime un contador en el monitor serial.",
    checks: [
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y crea el LED." },
      { has: ["timer_init"], text: "Un Timer periódico", hint: "Ve a Tiempo → Timer y usa 'Timer 0 modo Periódico cada 500 ms'." },
      { inside: ["toggle_led"], of: ["timer_init"], text: "Alternar el LED dentro del Timer", hint: "Dentro del 'hacer' del Timer pon 'led alternar'." },
      { forever: true, text: "Un ciclo principal", hint: "Debajo del Timer usa 'repetir mientras verdadero'." },
      { inLoop: ["math_change"], text: "Sumar al contador en el ciclo", hint: "Usa 'añadir 1 a contador' dentro del ciclo." },
      { inLoop: ["text_print"], text: "Imprimir el contador", hint: "Usa 'imprimir contador' y 'esperar 1 segundos'." },
    ],
  },
  {
    id: "try_divide", level: 3, icon: "🛟", title: "Atrapa el error",
    desc: "Divide un número entre 0 dentro de un 'try' y, en vez de que el programa se detenga, muestra «No se puede dividir entre 0».",
    checks: [
      { has: ["controls_try_except", "controls_try_except_var", "controls_try_except_finally"], text: "Un bloque 'try … except'", hint: "Ve a Excepciones y usa 'try … except'." },
      { field: { type: "math_arithmetic", name: "OP", value: "DIVIDE" }, text: "Una división", hint: "En Matemáticas usa '+' y cámbialo a '÷'." },
      { inside: ["math_arithmetic"], of: ["controls_try_except", "controls_try_except_var", "controls_try_except_finally"], text: "La división va dentro del 'try'", hint: "Pon 'imprimir 10 ÷ 0' en la parte 'try'." },
      { inside: ["text_print"], of: ["controls_try_except", "controls_try_except_var", "controls_try_except_finally"], min: 2, text: "Imprimir en 'try' y en 'except'", hint: "En 'except' pon 'imprimir \"No se puede dividir entre 0\"'." },
    ],
  },
  {
    id: "guess_number", level: 3, icon: "🎯", title: "Adivina el número",
    desc: "El ESP32 piensa un número del 1 al 10 y tú lo adivinas escribiéndolo en el monitor serial; te dice «más alto» o «más bajo» hasta que aciertes.",
    checks: [
      { has: ["math_random_int"], text: "Un número secreto al azar", hint: "Guarda 'entero aleatorio de 1 a 10' en la variable 'secreto' antes del ciclo." },
      { has: ["controls_whileUntil"], text: "Un ciclo que se repite hasta acertar", hint: "Usa 'repetir mientras' (por ejemplo 'mientras intento ≠ secreto')." },
      { inLoop: ["text_prompt_ext"], text: "Pedir un número dentro del ciclo", hint: "En Textos usa 'solicitar número con el mensaje' (cambia 'texto' por 'número')." },
      { inLoop: ["controls_if"], text: "Comparar dentro del ciclo", hint: "Usa un 'si … si no si' para comparar tu intento con el secreto." },
      { inIf: ["text_print"], min: 2, text: "Decir «más alto» o «más bajo»", hint: "En cada rama del 'si' imprime una pista distinta." },
    ],
  },
  {
    id: "espnow_receiver", level: 3, icon: "📥", title: "Receptor ESP-NOW",
    desc: "Prepara un segundo ESP32 que reciba los mensajes del «Faro ESP-NOW» y los muestre en el monitor serial.",
    checks: [
      { has: ["wifi_init"], text: "Activar el WiFi", hint: "ESP-NOW usa la radio del WiFi: en Comunicación Inalámbrica → WiFi usa 'inicializar WiFi'." },
      { has: ["init_espnow_simple"], text: "Iniciar ESP-NOW", hint: "Ve a Comunicación Inalámbrica → ESP-NOW y usa 'ESP-NOW iniciar'." },
      { anyOf: [{ inLoop: ["espnow_recv"] }, { has: ["espnow_irq"] }], text: "Recibir mensajes", hint: "Dentro de 'repetir mientras verdadero' usa 'ESP-NOW recibir en host, msg' (o 'al recibir llamar')." },
      { anyOf: [{ inIf: ["text_print"] }, { inside: ["text_print"], of: ["espnow_irq_callback"] }], text: "Imprimir el mensaje que llegó", hint: "Usa 'si msg' (que no esté vacío) y dentro 'imprimir msg'." },
    ],
  },
];
