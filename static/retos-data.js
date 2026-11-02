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
];
