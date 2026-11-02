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
     anyOf    — se cumple si se cumple cualquiera de los checks de la lista.
══════════════════════════════════════════════════════════════ */

const RETO_LOOPS = ["controls_whileUntil", "controls_repeat_ext", "controls_for", "controls_forEach", "time_every"];
const RETO_LED_SET = ["set_led", "set_led_var", "toggle_led"];
const RETO_SERVO_MOVE = ["move_servo", "move_servo_var", "servo_move_pulse"];

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
      { inLoop: RETO_LED_SET, min: 1, text: "Cambiar el LED dentro del ciclo", hint: "Pon los bloques de encender/apagar (o alternar) DENTRO del ciclo." },
      { inLoop: ["time_sleep"], min: 1, text: "Esperar dentro del ciclo", hint: "Sin una espera el LED cambia tan rápido que no se ve: usa 'esperar' de Tiempo dentro del ciclo." },
    ],
  },
  {
    id: "blink3", level: 1, icon: "3️⃣", title: "Parpadea 3 veces",
    desc: "Haz que el LED parpadee exactamente 3 veces y luego se detenga.",
    checks: [
      { has: ["led_init"], text: "Iniciar un LED", hint: "Ve a LEDs y arrastra el bloque que crea el LED." },
      { repeat: 3, text: "Repetir exactamente 3 veces", hint: "En Ciclos, usa 'repetir N veces' y cambia el número a 3." },
      { inLoop: RETO_LED_SET, min: 1, text: "Cambiar el LED dentro del ciclo", hint: "El encender/apagar va DENTRO del 'repetir'." },
      { inLoop: ["time_sleep"], min: 1, text: "Esperar dentro del ciclo", hint: "Agrega 'esperar' dentro del 'repetir' para que se vea el parpadeo." },
    ],
  },
  {
    id: "traffic", level: 2, icon: "🚦", title: "Semáforo",
    desc: "Arma un semáforo con 3 LEDs (rojo, amarillo y verde) que cambie solo, una y otra vez.",
    checks: [
      { distinct: { type: "led_init", name: "NAME" }, min: 3, text: "Tres LEDs con nombres distintos", hint: "Crea 3 LEDs y ponle a cada uno un nombre diferente (rojo, amarillo, verde)." },
      { forever: true, text: "Un ciclo que se repite para siempre", hint: "Usa 'repetir mientras verdadero' para que el semáforo no se detenga." },
      { inLoop: RETO_LED_SET, min: 3, text: "Cambiar los LEDs dentro del ciclo (al menos 3 veces)", hint: "Dentro del ciclo enciende y apaga cada LED en su turno." },
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
      { inIf: RETO_LED_SET, min: 1, text: "Cambiar el LED dentro del 'si'", hint: "Dentro del 'si' enciende el LED (y en 'si no', apágalo)." },
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
      { inIf: RETO_LED_SET, min: 1, text: "Cambiar el LED dentro del 'si'", hint: "Dentro del 'si' enciende el LED, y en 'si no' apágalo." },
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
];
