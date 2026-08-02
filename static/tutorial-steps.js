/* ================================================================
   tutorial-steps.js  v5
   ─ Highlight en workspace principal
   ─ Highlight en flyout (los bloques del panel lateral al abrirse)
   ─ MutationObserver para aplicar glow cuando el flyout aparece
   ─ Sin flecha, panel arrastrable
================================================================ */

var TUTORIALS = {

  led_basico: {
    title: "LED Básico", icon: "💡",
    diagram: "img/conexiones/led.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a encender y apagar el <b>LED integrado</b> del ESP32. No necesitas componentes extra: el LED rojo del ESP32 está conectado internamente al <b>pin 2</b>. Es el primer paso para entender cómo controlar salidas digitales.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "Para este tutorial <b>no necesitas conectar nada</b>: el ESP32 tiene un LED integrado en el pin <b>2</b>. Si quieres usar un LED externo, conéctalo así:<br>📌 Ánodo (pata larga) → pin <b>2</b> con una resistencia de <b>220Ω</b><br>⏚ Cátodo (pata corta) → GND",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre la categoría LEDs",
        desc: "Haz clic en <b>LEDs</b> en el panel de bloques para desplegarlo.",
        highlightCat: "LEDs", expandCat: null, bloque: null
      },
      {
        titulo: "Selecciona la subcategoría LED",
        desc: "Dentro de <b>LEDs</b> haz clic en <b>LED</b> para ver sus bloques.",
        highlightCat: "LED", expandCat: "LEDs", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar LED",
        desc: "Arrastra el bloque <em>Preparar LED</em> al área de trabajo. El pin <b>2</b> corresponde al LED rojo integrado del ESP32.",
        highlightCat: "LED", expandCat: "LEDs", bloque: "led_init", bloqueLabel: "Preparar LED"
      },
      {
        titulo: "Arrastra: Encender / Apagar LED",
        desc: "Arrastra el bloque <em>Encender / Apagar LED</em>. Selecciona estado <b>on</b> para encender y <b>off</b> para apagar.",
        highlightCat: "LED", expandCat: "LEDs", bloque: "set_led", bloqueLabel: "Encender / Apagar LED"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: "Haz clic en el botón <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span> para enviar el código a tu ESP32.",
        highlightElement: "#btnRun",
        waitForAction: "run"
      },
    ]
  },

  led_infinito: {
    title: "LED Infinito (parpadeo)", icon: "🔁",
    diagram: "img/conexiones/led_infinito.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Haremos parpadear el LED del ESP32 de forma infinita usando un <b>ciclo</b>. Aprenderás a usar bloques de repetición y de tiempo para crear secuencias automáticas.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "Para este tutorial <b>no necesitas conectar nada extra</b>: usaremos el LED integrado del ESP32 en el pin <b>2</b>. Si quieres usar un LED externo:<br>📌 Ánodo (pata larga) → pin <b>2</b> con resistencia de <b>220Ω</b><br>⏚ Cátodo (pata corta) → GND",
        highlightCat: null, bloque: null
      },

      {
        titulo: "Abre la categoría LEDs",
        desc: "Haz clic en <b>LEDs</b> en el panel de bloques para desplegarlo.",
        highlightCat: "LEDs", expandCat: null, bloque: null
      },
      {
        titulo: "Selecciona la subcategoría LED",
        desc: "Dentro de <b>LEDs</b> haz clic en <b>LED</b> para ver sus bloques.",
        highlightCat: "LED", expandCat: "LEDs", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar LED",
        desc: "Arrastra el bloque <em>Preparar LED</em> al área de trabajo. El pin <b>2</b> corresponde al LED rojo integrado del ESP32.",
        highlightCat: "LED", expandCat: "LEDs", bloque: "led_init", bloqueLabel: "Preparar LED"
      },
      {
        titulo: "Abre la categoría Ciclos",
        desc: "Haz clic en <b>Ciclos</b> en el toolbox para ver los bloques de repetición.",
        highlightCat: "Ciclos", expandCat: null, bloque: null
      },
      {
        titulo: "Arrastra: Repetir mientras … Verdadero",
        desc: "Arrastra el bloque <em>Repetir mientras Verdadero</em> al área de trabajo. Todo el código que coloques <b>dentro</b> de este bloque se repetirá <b>infinitamente</b>.",
        highlightCat: "Ciclos", expandCat: null, bloque: "controls_whileUntil", bloqueLabel: "Repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: Encender LED",
        desc: "Ve a <b>LEDs › LED</b> y arrastra el bloque <em>Encender / Apagar LED</em> <b>dentro</b> del bloque repetir. Selecciona estado <b>on</b> para encender el LED.",
        highlightCat: "LED", expandCat: "LEDs", bloque: "set_led", bloqueLabel: "Encender / Apagar LED"
      },
      {
        titulo: "Dentro del ciclo: Esperar con LED encendido",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> justo después del bloque <em>Encender / Apagar LED on</em>. Ajusta el valor a <b>1</b> segundo. Esto mantiene el LED encendido durante ese tiempo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep", bloqueLabel: "Esperar"
      },
      {
        titulo: "Dentro del ciclo: Apagar LED",
        desc: "Ve a <b>LEDs › LED</b> y arrastra otro bloque <em>Encender / Apagar LED</em> después de la espera. Cambia el estado a <b>off</b> para apagar el LED.",
        highlightCat: "LED", expandCat: "LEDs", bloque: "set_led", bloqueLabel: "Encender / Apagar LED"
      },
      {
        titulo: "Dentro del ciclo: Esperar con LED apagado",
        desc: "Ve a <b>Tiempo</b> y arrastra otro bloque <em>Esperar</em> justo después del bloque <em>Encender / Apagar LED off</em>. Ajusta el valor a <b>1</b> segundo. Esto mantiene el LED apagado antes de volver a encenderlo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: "Haz clic en el botón <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span> para enviar el código a tu ESP32.",
        highlightElement: "#btnRun",
        waitForAction: "run"
      },
    ]
  },

  semaforo: {
    title: "Semáforo", icon: "🚦",
    diagram: "img/conexiones/semaforo.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Construiremos un semáforo real con tres LEDs: <b>rojo, amarillo y verde</b>. Aprenderás a controlar varias salidas en secuencia usando tiempos, igual que un semáforo de calle.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física del semáforo",
        desc: "Conecta los tres LEDs al ESP32 con una resistencia de <b>220Ω</b> en cada uno:<br>🔴 LED <b>Rojo</b> → pin <b>23</b><br>🟡 LED <b>Amarillo</b> → pin <b>19</b><br>🟢 LED <b>Verde</b> → pin <b>18</b><br>⏚ Cátodo (pata corta) de cada LED → GND",
        highlightCat: null, bloque: null
      },

      {
        titulo: "Selecciona la subcategoría Semáforo",
        desc: "Dentro de <b>LEDs</b> haz clic en <b>Semáforo (Leds)</b> para ver sus bloques.",
        highlightCat: "Semáforo (Leds)", expandCat: "LEDs", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar Semáforo",
        desc: "Arrastra el bloque <em>Preparar semáforo</em> al área de trabajo. Los pines predeterminados son: Verde=<b>18</b>, Amarillo=<b>19</b>, Rojo=<b>23</b>.",
        highlightCat: "Semáforo (Leds)", expandCat: "LEDs", bloque: "init_semaforo", bloqueLabel: "Preparar semáforo"
      },
      {
        titulo: "Ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>Repetir mientras Verdadero</em> al área de trabajo. Todo el ciclo del semáforo irá dentro de este bloque.",
        highlightCat: "Ciclos", expandCat: null, bloque: "controls_whileUntil"
      },
      {
        titulo: "Fase ROJO: encender",
        desc: "Ve a <b>LEDs › Semáforo (Leds)</b> y arrastra el bloque <em>Cambiar estado semáforo</em> <b>dentro</b> del ciclo. Ajusta los valores a: R=<b>1</b>, G=<b>0</b>, Y=<b>0</b> para encender solo el LED rojo.",
        highlightCat: "Semáforo (Leds)", expandCat: "LEDs", bloque: "set_semaforo", bloqueLabel: "Cambiar estado semáforo"
      },
      {
        titulo: "Fase ROJO: esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> justo después del bloque rojo. Ajusta el valor a <b>3</b> segundos. El semáforo permanecerá en rojo durante este tiempo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Fase AMARILLO: encender",
        desc: "Ve a <b>LEDs › Semáforo (Leds)</b> y arrastra otro bloque <em>Cambiar estado semáforo</em> después de la espera. Ajusta: R=<b>0</b>, G=<b>0</b>, Y=<b>1</b> para encender solo el LED amarillo.",
        highlightCat: "Semáforo (Leds)", expandCat: "LEDs", bloque: "set_semaforo", bloqueLabel: "Cambiar estado semáforo"
      },
      {
        titulo: "Fase AMARILLO: esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra otro bloque <em>time_sleep</em> después del bloque amarillo. Ajusta el valor a <b>1</b> segundo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Fase VERDE: encender",
        desc: "Ve a <b>LEDs › Semáforo (Leds)</b> y arrastra el último bloque <em>Cambiar estado semáforo</em>. Ajusta: R=<b>0</b>, G=<b>1</b>, Y=<b>0</b> para encender solo el LED verde.",
        highlightCat: "Semáforo (Leds)", expandCat: "LEDs", bloque: "set_semaforo", bloqueLabel: "Cambiar estado semáforo"
      },
      {
        titulo: "Fase VERDE: esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra el último bloque <em>time_sleep</em> después del bloque verde. Ajusta el valor a <b>2</b> segundos. Al terminar, el ciclo se repetirá automáticamente.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: "Haz clic en el botón <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span> para enviar el código a tu ESP32.",
        highlightElement: "#btnRun",
        waitForAction: "run"
      },
    ]
  },

  boton: {
    title: "Botón Contador", icon: "🔘",
    diagram: "img/conexiones/boton.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Aprenderemos a leer un <b>botón pulsador</b> con el ESP32. Cada vez que lo presiones, un contador sumará 1 y mostrará el total en el monitor serial. Así entenderás cómo funcionan las entradas digitales. Usaremos el pin <b>12</b>.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física del botón",
        desc: "Conecta el botón pulsador al ESP32 así:<br>📌 Una pata del botón → pin <b>12</b><br>⏚ La otra pata del botón → GND<br><br>Usaremos el modo <b>PULL_UP</b>, por lo que no necesitas resistencia externa. Cuando el botón no está presionado lee <b>1</b>, cuando se presiona lee <b>0</b>.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre la categoría Interruptores",
        desc: "Expande <b>Interruptores</b> y selecciona la subcategoría <b>Interruptores</b>.",
        highlightCat: "Interruptores",
        expandCat: "Interruptores",
        bloque: null
      },
      {
        titulo: "Inicializa el botón",
        desc: "Arrastra el bloque <em>Preparar botón / interruptor</em> y selecciona el pin <b>12</b> con configuración <b>PULL_UP</b>. Este bloque se coloca una sola vez al inicio, fuera de cualquier ciclo.",
        highlightCat: "Interruptores",
        expandCat: "Interruptores",
        bloque: "interruptor_init", bloqueLabel: "Preparar botón / interruptor"
      },

      {
        titulo: "Crear variable contador",
        desc: "Ve a <b>Variables</b>, crea una variable llamada <b>contador</b>.",
        highlightCat: "Variables",
        highlightFlyoutButton: "create_variable",
        variable: "contador",
        expandCat: null,
        bloque: null
      },
      {
        titulo: "Establecer variable contador",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>establecer contador a</em> al área de trabajo.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: "variables_set", bloqueLabel: "Establecer variable"
      },
      {
        titulo: "Establecer 0 en contador",
        desc: "Ve a Matemáticas y selecciona el bloque 0.",
        highlightCat: "Matemáticas",
        bloque: "math_number", bloqueLabel: "Número"
      },
      {
        titulo: "Crear variable btn",
        desc: "Ve a <b>Variables</b>, crea una variable llamada <b>btn</b>.",
        highlightCat: "Variables",
        highlightFlyoutButton: "create_variable",
        variable: "btn",
        expandCat: null,
        bloque: null
      },
      {
        titulo: "Establecer variable btn",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>establecer btn a</em> al área de trabajo. Lo colocaremos antes del ciclo para inicializarlo en 0.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: "variables_set", bloqueLabel: "Establecer variable"
      },
      {
        titulo: "Establecer 0 en btn",
        desc: "Ve a <b>Matemáticas</b> y selecciona el bloque <em>0</em>. Conéctalo al bloque <em>establecer btn a</em> para inicializar la variable en 0.",
        highlightCat: "Matemáticas",
        expandCat: null,
        bloque: "math_number", bloqueLabel: "Número"
      },
      {
        titulo: "Agregar ciclo infinito",
        desc: "Desde <b>Ciclos</b>, arrastra el bloque <em>repetir mientras verdadero</em>.",
        highlightCat: "Ciclos",
        expandCat: null,
        bloque: "controls_whileUntil"
      },
      {
        titulo: "Actualizar btn con la lectura del botón",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>establecer btn a</em> <b>dentro del ciclo</b>. Aquí conectaremos el bloque que lee el estado del botón.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: "variables_set", bloqueLabel: "Establecer variable"
      },
      {
        titulo: "Invertir la lectura usando No",
        desc: "Ve a <b>Lógica</b> y arrastra el bloque <em>no</em>. Conéctalo al bloque <em>leer Pin 12</em> para invertir la señal del botón (PULL_UP activo en bajo).",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_negate", bloqueLabel: "No (invertir)"
      },
      {
        titulo: "Leer el botón",
        desc: "Ve a <b>Interruptores</b> y arrastra el bloque <em>Leer estado del botón</em>. Selecciona el pin <b>12</b> para leer si está presionado o no.",
        highlightCat: "Interruptores",
        expandCat: "Interruptores",
        bloque: "interruptor_read", bloqueLabel: "Leer estado del botón"
      },
      {
        titulo: "Agregar condición",
        desc: "Ve a <b>Lógica</b> y arrastra el bloque <em>Si hacer</em>. Lo colocaremos dentro del ciclo. Luego necesitamos agregarle una comparación como condición.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "controls_if", bloqueLabel: "Si … hacer"
      },
      {
        titulo: "Agregar bloque de comparación (=)",
        desc: "Ve a <b>Lógica</b> y arrastra el bloque <em>=</em> (comparar). Conéctalo al hueco de condición del bloque <em>Si hacer</em>. Este bloque compara dos valores y devuelve verdadero si son iguales.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_compare", bloqueLabel: "= (comparar)"
      },
      {
        titulo: "Comparar valor primera posición",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>obtener btn</em>. Conéctalo en la <b>primera posición</b> (izquierda) del bloque <em>=</em>.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: {
          tipo: "variables_get",
          valor: "btn"
        }
      },
      {
        titulo: "Comparar valor segunda posición",
        desc: "Ve a <b>Matemáticas</b> y arrastra el bloque de número <em>0</em>. Cámbialo a <b>1</b> y conéctalo en la <b>segunda posición</b> (derecha) del bloque <em>=</em>. Ahora la condición es: si btn = 1.",
        highlightCat: "Matemáticas",
        expandCat: null,
        bloque: "math_number"
      },
      {
        titulo: "Imprimir un mensaje",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> dentro de la sección <b>hacer</b> del bloque Si. Este bloque mostrará el valor del contador en el monitor serial.",
        highlightCat: "Textos",
        expandCat: null,
        bloque: "text_print", bloqueLabel: "Imprimir en monitor serial"
      },
      {
        titulo: "Unir dos textos para imprimir un unico mensaje.",
        desc: "Usa el bloque <em>crear texto con</em> para unir dos textos: el mensaje 'Contador: ' y el valor de la variable contador.",
        highlightCat: "Textos",
        expandCat: null,
        bloque: "text_join"
      },
      {
        titulo: "Texto Contador.",
        desc: "Usa el bloque <em>texto</em> para poner el mensaje 'Contador: ' y conéctalo a la primera posición del bloque <em>crear texto con</em>.",
        highlightCat: "Textos",
        expandCat: null,
        bloque: "text", bloqueLabel: "Texto (cadena)"
      },
      {
        titulo: "Tomar el valor de contador",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>obtener contador</em>. Conéctalo en la segunda posición del bloque <em>crear texto con</em> para mostrar el valor actual del contador.",
        highlightCat: "Variables",
        bloque: {
          tipo: "variables_get",
          valor: "contador"
        }
      },
      {
        titulo: "Incrementar el contador",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>añadir a btn</em> cambiar a <em>añadir a contador</em>. Conéctalo dentro de la sección <b>hacer</b> del bloque Si. El valor predeterminado es <b>1</b>, lo que sumará 1 al contador cada vez que se presione el botón.",
        highlightCat: "Variables",
        bloque: "math_change", bloqueLabel: "Sumar a variable"
      },
      {
        titulo: "Agregar espera",
        desc: "Desde <b>Tiempo</b>, arrastra el bloque <em>esperar</em> y ajusta el valor a <b>0.3</b> segundos. Colócalo de bajo del bloque de <b>si hacer</b>. Esto evita que el botón registre múltiples pulsaciones por rebote.",
        highlightCat: "Tiempo",
        expandCat: null,
        bloque: "time_sleep"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: "Haz clic en el botón <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span> para enviar el código a tu ESP32.",
        highlightElement: "#btnRun",
        waitForAction: "run"
      }
    ]
  },

  buzzer: {
    title: "Buzzer", icon: "🔊",
    diagram: "img/conexiones/buzzer.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Haremos sonar un <b>buzzer piezoeléctrico</b> con el ESP32. El buzzer convierte señales eléctricas en sonido. Lo usaremos para generar tonos a diferentes frecuencias.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física del Buzzer",
        desc: "Conecta el buzzer al ESP32 así:<br>📌 Pin <b>+</b> (positivo) del buzzer → pin <b>12</b><br>⏚ Pin <b>-</b> (negativo) del buzzer → GND<br><br>Si tu buzzer es activo (tiene un circuito interno), sonará con cualquier señal. Si es pasivo (más común en kits), necesita la señal PWM que genera este bloque.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Sensores › Buzzer (KY-006)",
        desc: "Expande <b>Sensores</b> y selecciona <b>Buzzer (KY-006)</b>.",
        highlightCat: "Buzzer (KY-006)", expandCat: "Sensores", bloque: null
      },
      {
        titulo: "Arrastra: Tono Buzzer",
        desc: "Arrastra el bloque <em>Reproducir tono (buzzer)</em>. Establece el Pin en <b>12</b> y elige una nota, por ejemplo <b>B2</b>.",
        highlightCat: "Buzzer (KY-006)", expandCat: "Sensores", bloque: "buzzer_tone", bloqueLabel: "Reproducir tono (buzzer)"
      },
      {
        titulo: "Establecer 1 segundo",
        desc: "Ve a Matemáticas y selecciona el bloque 0 y cambia el valor a <b>1</b>. Conéctalo al bloque dentro del bloque de Tono en <em> duración 1 </em>.",
        highlightCat: "Matemáticas",
        bloque: "math_number"
      },
      {
        titulo: "Esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> con <b>0.5</b> segundos.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Abre la categoría Sensores",
        desc: "Haz clic en <b>Sensores</b> en el panel de bloques para desplegarlo.",
        highlightCat: "Sensores", expandCat: null, bloque: null
      },
      {
        titulo: "Detener el buzzer",
        desc: "Arrastra el bloque <em>Detener buzzer</em>. Establece el Pin en <b>12</b>. Esto corta el sonido.",
        highlightCat: "Buzzer (KY-006)", expandCat: "Sensores", bloque: "buzzer_stop", bloqueLabel: "Detener buzzer"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: "Haz clic en el botón <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span> para enviar el código a tu ESP32.",
        highlightElement: "#btnRun",
        waitForAction: "run"
      },
    ]
  },

  servo: {
    title: "Servo Motor", icon: "⚙️",
    diagram: "img/conexiones/servo.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Aprenderemos a controlar un <b>servomotor</b> con el ESP32. El servo puede girar a una posición exacta entre <b>0° y 180°</b>. Se usa en brazos robóticos, compuertas, timones y muchos proyectos de robótica.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física del Servo",
        desc: "El cable del servo tiene 3 colores:<br>🟤 <b>Café / Negro</b> → GND<br>🔴 <b>Rojo</b> → 5V (o 3.3V si tu servo lo soporta)<br>🟡 <b>Amarillo / Naranja</b> (señal) → pin <b>13</b><br><br>Usa un pin que soporte PWM como el <b>13</b>. Si el servo vibra sin moverse, prueba alimentarlo con 5V externo.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Inicializa el Servo",
        desc: "Arrastra el bloque <em>Preparar servo motor</em>. Selecciona el pin PWM <b>13</b>. Este bloque va al inicio, fuera del ciclo.",
        highlightCat: "Servo", expandCat: "Actuadores", bloque: "init_servo", bloqueLabel: "Preparar servo motor"
      },
      {
        titulo: "Ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra <em>Repetir mientras Verdadero</em>.",
        highlightCat: "Ciclos", expandCat: null, bloque: "controls_whileUntil"
      },
      {
        titulo: "Mueve a 0°, 90° y 180°",
        desc: "Arrastra 3 bloques <em>Mover servo a grados</em> con ángulos <b>0</b>, <b>90</b> y <b>180</b>. Después de cada uno arrastra un bloque <em>Esperar</em> de <b>1</b> segundo.",
        highlightCat: "Servo", expandCat: "Actuadores", bloque: "move_servo", bloqueLabel: "Mover servo a grados"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: "Haz clic en el botón <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span> para enviar el código a tu ESP32.",
        highlightElement: "#btnRun",
        waitForAction: "run"
      },
    ]
  },

  ultrasonico: {
    title: "Sensor Ultrasónico (HC-SR04)", icon: "📡",
    diagram: "img/conexiones/ultrasonico.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "El sensor <b>HC-SR04</b> mide distancias usando ultrasonido, igual que los murciélagos. Emite un sonido de alta frecuencia y mide cuánto tarda en rebotar. Lo usaremos para detectar objetos y mostrar la distancia en centímetros.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física del HC-SR04",
        desc: "Conecta el sensor HC-SR04 al ESP32 así:<br>⚡ <b>VCC</b> → 5V<br>⏚ <b>GND</b> → GND<br>📌 <b>TRIG</b> → pin <b>12</b> (envía el pulso)<br>📌 <b>ECHO</b> → pin <b>13</b> (recibe el rebote)<br><br>El sensor tiene un rango de detección de <b>2 cm a 400 cm</b>.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre la subcategoría Sensores",
        desc: "Haz clic en <b>Sensores Digitales</b> en el panel de bloques para desplegarlo.",
        highlightCat: "Sensores Digitales", expandCat: "Sensores", bloque: null
      },
      {
        titulo: "Abre Sensores Digitales › Ultrasonico",
        desc: "Dentro de <b>Sensores</b>, expande <b>Sensores Digitales</b> y selecciona la subcategoría <b>Ultrasonico</b>.",
        highlightCat: "Ultrasonico", expandCat: "Sensores", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar HC-SR04",
        desc: "Arrastra el bloque <em>Preparar sensor ultrasónico</em> al área de trabajo. Los pines predeterminados son TRIG=<b>12</b> y ECHO=<b>13</b>. Conéctalo fuera de cualquier ciclo, al inicio del programa.",
        highlightCat: "Ultrasonico", expandCat: "Sensores", bloque: "init_ultrasonic_hcsr04", bloqueLabel: "Preparar sensor ultrasónico"
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. El sensor leerá la distancia continuamente dentro de este ciclo.",
        highlightCat: "Ciclos", expandCat: null, bloque: "controls_whileUntil"
      },
      {
        titulo: "Crea la variable distancia",
        desc: "Ve a <b>Variables</b> y crea una nueva variable llamada <b>distancia</b>.",
        highlightCat: "Variables", highlightFlyoutButton: "create_variable", variable: "distancia", expandCat: null, bloque: null
      },
      {
        titulo: "Establecer el valor de distancia",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>establecer distancia a</em> dentro del ciclo.",
        highlightCat: "Variables",
        bloque: "variables_set"
      },
      {
        titulo: "Arrastra: Leer distancia",
        desc: "Ve a <b>Sensores › Sensores Digitales › Ultrasonico</b> y arrastra el bloque <em>Leer distancia (cm)</em>. Conéctalo al hueco del bloque <em>establecer distancia a</em>.",
        highlightCat: "Ultrasonico", expandCat: "Sensores", bloque: "read_ultrasonic_hcsr04", bloqueLabel: "Leer distancia (cm)"
      },
      {
        titulo: "Imprime la distancia",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> debajo del bloque de asignación.",
        highlightCat: "Textos", expandCat: null, bloque: "text_print"
      },
      {
        titulo: "Consultar el valor de la distancia",
        desc: "Conecta el bloque <em>obtener distancia</em> desde <b>Variables</b> dentro del bloque imprimir. Esto mostrará la distancia medida por el sensor en el monitor serial.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: {
          tipo: "variables_get",
          valor: "distancia"
        }
      },
      {
        titulo: "Agrega una espera",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>time_sleep</em> al final del ciclo. Ajusta el valor a <b>0.5</b> segundos para no saturar el monitor serial.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: "Haz clic en el botón <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span> para enviar el código a tu ESP32.",
        highlightElement: "#btnRun",
        waitForAction: "run"
      },
    ]
  },

  neopixel_basico: {
    title: "NeoPixel RGB", icon: "🌈",
    diagram: "img/conexiones/neopixel.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Aprenderemos a controlar una <b>tira de LEDs NeoPixel (WS2812B)</b>. Cada LED puede mostrar cualquier color RGB de forma independiente. Con un solo pin del ESP32 puedes controlar decenas de LEDs de colores.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física del NeoPixel",
        desc: "Conecta la tira NeoPixel al ESP32 así:<br>⚡ <b>5V</b> → 5V (o fuente externa si hay muchos LEDs)<br>⏚ <b>GND</b> → GND<br>📌 <b>DIN</b> (data in) → pin <b>4</b><br><br>⚠️ Si usas más de 8 LEDs a brillo alto, alimenta la tira con una fuente de 5V externa y comparte el GND con el ESP32.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Selecciona la subcategoría NeoPixel",
        desc: "Dentro de <b>Pantallas</b>, haz clic en <b>NeoPixel</b> para ver sus bloques.",
        highlightCat: "NeoPixel", expandCat: "Pantallas", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar NeoPixel",
        desc: "Arrastra el bloque <em>Preparar tira NeoPixel</em> al área de trabajo. Asigna el nombre <b>np</b>, el pin de datos (ej. <b>4</b>) y la cantidad de LEDs de tu tira (ej. <b>8</b>).",
        highlightCat: "NeoPixel", expandCat: "Pantallas", bloque: "neopixel_init", bloqueLabel: "Preparar tira NeoPixel"
      },
      {
        titulo: "Establecer 8 en la cantidad",
        desc: "Ve a Matemáticas y selecciona el bloque 0 y cambia el valor a <b>8</b>. Conéctalo al hueco de cantidad en el bloque de inicialización para configurar el número correcto de LEDs.",
        highlightCat: "Matemáticas",
        bloque: "math_number"
      },
      {
        titulo: "Arrastra: Establecer color de un LED",
        desc: "Arrastra el bloque <em>Establecer color de LED</em>. Este bloque asigna un color a un LED específico. El índice empieza en <b>0</b>. Elige el color con los valores R, G, B (0–255).",
        highlightCat: "NeoPixel", expandCat: "Pantallas", bloque: "neopixel_pixel_x", bloqueLabel: "Establecer color de LED"
      },
      {
        titulo: "Establecer 0-7 en pixel x.",
        desc: "Ve a Matemáticas y selecciona el bloque 0 y cambia el valor a <b>0</b>-<b>7</b>. Conéctalo al hueco de pixel x en el bloque de pixel para indicar que LED se debe configurar.",
        highlightCat: "Matemáticas",
        bloque: "math_number"
      },
      {
        titulo: "Arrastra: Mostrar los colores",
        desc: "Arrastra el bloque <em>Actualizar LEDs (mostrar colores)</em> justo después de los bloques de color. Este bloque envía los colores a los LEDs físicamente; sin él los cambios no se verán.",
        highlightCat: "NeoPixel", expandCat: "Pantallas", bloque: "neopixel_write", bloqueLabel: "Actualizar LEDs (mostrar colores)"
      },
      {
        titulo: "Agrega una espera",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>time_sleep</em>. Ajusta el valor a <b>1</b> segundo para que el color se vea antes de continuar.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Arrastra: Apagar los LEDs",
        desc: "Ve a <b>Pantallas › NeoPixel</b> y arrastra el bloque <em>Apagar todos los LEDs</em> después de la espera. Este bloque apaga todos los LEDs de la tira.",
        highlightCat: "NeoPixel", expandCat: "Pantallas", bloque: "neopixel_clear", bloqueLabel: "Apagar todos los LEDs"
      },
      {
        titulo: "Arrastra: Actualizar después de apagar",
        desc: "Arrastra otro bloque <em>Actualizar LEDs (mostrar colores)</em> después del bloque de apagado. Siempre se necesita <em>write</em> para que los cambios se apliquen físicamente.",
        highlightCat: "NeoPixel", expandCat: "Pantallas", bloque: "neopixel_write", bloqueLabel: "Actualizar LEDs (mostrar colores)"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: "Haz clic en el botón <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span> para enviar el código a tu ESP32.",
        highlightElement: "#btnRun",
        waitForAction: "run"
      },
    ]
  },

  puente_h: {
    title: "Puente H — Motores DC", icon: "⚡",
    diagram: "img/conexiones/puente_h.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Aprenderemos a controlar <b>motores de corriente continua (DC)</b> usando el módulo <b>L298N (Puente H)</b>. Este módulo permite controlar la dirección (adelante/atrás) de dos motores al mismo tiempo. Es el corazón de los carritos y robots con ruedas.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física del L298N",
        desc: "Conecta el módulo L298N al ESP32 así:<br>⚡ <b>12V</b> → fuente de poder para los motores (batería)<br>⏚ <b>GND</b> → GND del ESP32 y de la batería<br>📌 <b>IN1</b> → pin <b>26</b><br>📌 <b>IN2</b> → pin <b>25</b><br>📌 <b>IN3</b> → pin <b>17</b><br>📌 <b>IN4</b> → pin <b>16</b><br>🔌 <b>OUT1/OUT2</b> → Motor A | <b>OUT3/OUT4</b> → Motor B<br><br>⚠️ No alimentes los motores directamente del ESP32.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Selecciona la subcategoría Motor DC",
        desc: "Dentro de <b>Actuadores</b>, haz clic en <b>Motor DC</b> para ver los bloques del puente H L298N.",
        highlightCat: "Motor DC", expandCat: "Actuadores", bloque: null
      },
      {
        titulo: "Arrastra: Preparar el controlador de motores",
        desc: "Arrastra el bloque <em>Preparar Motor DC (L298N)</em> al área de trabajo. Configura los pines: IN1=<b>26</b>, IN2=<b>25</b>, IN3=<b>17</b>, IN4=<b>16</b>. Estos pines controlan la dirección de ambos motores.",
        highlightCat: "Motor DC", expandCat: "Actuadores", bloque: "init_dc_motor", bloqueLabel: "Preparar Motor DC (L298N)"
      },
      {
        titulo: "Arrastra: Motor A ('Mover en horario')",
        desc: "Ve a <b>Actuadores › Motor DC</b> y arrastra <em>Controlar Motor DC (encender/apagar)</em> colocar debajo del bloque de inicio. El motor A controla la salida OUT1 y OUT2 de lado izquierda, a través de las entradas IN1/IN2 del L298N. Establece en IN1 en <b>on</b> para encenderlo y IN2 en <b>off</b> para apagarlo.",
        highlightCat: "Motor DC", expandCat: "Actuadores", bloque: "move_dc_motor1_on_off", bloqueLabel: "Controlar Motor DC (encender/apagar)"
      },
      {
        titulo: "Arrastra: Motor A ('Mover en horario')",
        desc: "Ve a <b>Actuadores › Motor DC</b> y arrastra <em>Controlar Motor DC (encender/apagar)</em> cambiar A por B. El motor B controla la salida OUT3 y OUT4 de lado derecho, a través de las entradas IN3/IN4 del L298N. Establece IN3 en <b>on</b> para encenderlo y IN4 en <b>off</b> para apagarlo.",
        highlightCat: "Motor DC", expandCat: "Actuadores", bloque: "move_dc_motor1_on_off", bloqueLabel: "Controlar Motor DC (encender/apagar)"
      },
      {
        titulo: "Esperar 1 segundo.",
        desc: "Ve a <b>Tiempo</b> y arrastra <em>time_sleep</em>. Ajusta el valor a <b>1</b> segundo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Arrastra: Motor A ('Mover en anti-horario')",
        desc: "Ve a <b>Actuadores › Motor DC</b> y arrastra <em>Controlar Motor DC (encender/apagar)</em>. Establece IN1 a <b>off</b> y establce IN2 a <b>on</b>.",
        highlightCat: "Motor DC", expandCat: "Actuadores", bloque: "move_dc_motor1_on_off", bloqueLabel: "Controlar Motor DC (encender/apagar)"
      },
      {
        titulo: "Arrastra: Motor A ('Mover en anti-horario')",
        desc: "Ve a <b>Actuadores › Motor DC</b> y arrastra <em>Controlar Motor DC (encender/apagar)</em> cambiar A por B. Establece IN3 a <b>off</b> y establce IN4 a <b>on</b>.",
        highlightCat: "Motor DC", expandCat: "Actuadores", bloque: "move_dc_motor1_on_off", bloqueLabel: "Controlar Motor DC (encender/apagar)"
      },
      {
        titulo: "Esperar 1 segundo.",
        desc: "Ve a <b>Tiempo</b> y arrastra <em>time_sleep</em>. Ajusta el valor a <b>1</b> segundo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Arrastra: Motor A ('Girar a la derecha')",
        desc: "Ve a <b>Actuadores › Motor DC</b> y arrastra <em>Controlar Motor DC (encender/apagar)</em>. Establece IN1 a <b>off</b> y establce IN2 a <b>on</b>.",
        highlightCat: "Motor DC", expandCat: "Actuadores", bloque: "move_dc_motor1_on_off", bloqueLabel: "Controlar Motor DC (encender/apagar)"
      },
      {
        titulo: "Arrastra: Motor A ('Girar a la derecha')",
        desc: "Ve a <b>Actuadores › Motor DC</b> y arrastra <em>Controlar Motor DC (encender/apagar)</em> cambiar A por B. Establece IN3 a <b>off</b> y establece IN4 a <b>off</b>.",
        highlightCat: "Motor DC", expandCat: "Actuadores", bloque: "move_dc_motor1_on_off", bloqueLabel: "Controlar Motor DC (encender/apagar)"
      },
      {
        titulo: "Esperar 1 segundo.",
        desc: "Ve a <b>Tiempo</b> y arrastra <em>time_sleep</em>. Ajusta el valor a <b>1</b> segundo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Arrastra: Motor A ('Girar a la izquierda')",
        desc: "Ve a <b>Actuadores › Motor DC</b> y arrastra <em>Controlar Motor DC (encender/apagar)</em>. Establece IN1 a <b>off</b> y establce IN2 a <b>off</b>.",
        highlightCat: "Motor DC", expandCat: "Actuadores", bloque: "move_dc_motor1_on_off", bloqueLabel: "Controlar Motor DC (encender/apagar)"
      },
      {
        titulo: "Arrastra: Motor A ('Girar a la izquierda')",
        desc: "Ve a <b>Actuadores › Motor DC</b> y arrastra <em>Controlar Motor DC (encender/apagar)</em> cambiar A por B. Establece IN3 a <b>off</b> y establce IN4 a <b>on</b>.",
        highlightCat: "Motor DC", expandCat: "Actuadores", bloque: "move_dc_motor1_on_off", bloqueLabel: "Controlar Motor DC (encender/apagar)"
      },
      {
        titulo: "Esperar 1 segundo.",
        desc: "Ve a <b>Tiempo</b> y arrastra <em>time_sleep</em>. Ajusta el valor a <b>1</b> segundo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Arrastra: Motor A (Deterner)",
        desc: "Ve a <b>Actuadores › Motor DC</b> y arrastra <em>Controlar Motor DC (encender/apagar)</em>. Establece IN1 a <b>off</b> y establce IN2 a <b>off</b>.",
        highlightCat: "Motor DC", expandCat: "Actuadores", bloque: "move_dc_motor1_on_off", bloqueLabel: "Controlar Motor DC (encender/apagar)"
      },
      {
        titulo: "Arrastra: Motor A (Deterner)",
        desc: "Ve a <b>Actuadores › Motor DC</b> y arrastra <em>Controlar Motor DC (encender/apagar)</em> cambiar A por B. Establece IN3 a <b>off</b> y establce IN4 a <b>off</b>.",
        highlightCat: "Motor DC", expandCat: "Actuadores", bloque: "move_dc_motor1_on_off", bloqueLabel: "Controlar Motor DC (encender/apagar)"
      },
      {
        titulo: "Esperar 1 segundo.",
        desc: "Ve a <b>Tiempo</b> y arrastra <em>time_sleep</em>. Ajusta el valor a <b>1</b> segundo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: "Haz clic en el botón <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span> para enviar el código a tu ESP32.",
        highlightElement: "#btnRun",
        waitForAction: "run"
      },
    ]
  },

  infrarrojo_basico: {
    title: "Sensor Infrarrojo — Detectar Línea", icon: "⬛",
    diagram: "img/conexiones/infrarrojo.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Usaremos un <b>sensor infrarrojo</b> para detectar si está sobre una línea <b>negra</b> o sobre fondo <b>blanco</b>. El sensor devuelve <b>0</b> cuando detecta negro (poca reflexión) y <b>1</b> cuando detecta blanco (mucha reflexión). Mostraremos el resultado en el monitor serial.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "¿Cómo funciona?",
        desc: "El sensor emite luz infrarroja y mide cuánta regresa reflejada:<br><br>⬛ Superficie <b>negra</b> → absorbe la luz → el sensor devuelve <b>0</b><br>⬜ Superficie <b>blanca</b> → refleja la luz → el sensor devuelve <b>1</b><br><br>Con el potenciómetro del módulo puedes ajustar la sensibilidad de detección.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "Conecta el módulo infrarrojo al ESP32 así:<br>📌 <b>OUT</b> (señal) → pin <b>12</b><br>⚡ <b>VCC</b> → 3.3V<br>⏚ <b>GND</b> → GND<br><br>⚙️ Ajusta el potenciómetro del módulo hasta que el LED indicador se encienda sobre blanco y se apague sobre negro.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Selecciona Sensores IR",
        desc: "Dentro de <b>Sensores → Sensores Digitales</b>, haz clic en <b>Sensores IR</b> para ver los bloques del sensor infrarrojo.",
        highlightCat: "Sensores IR", expandCat: "Sensores", bloque: null
      },
      {
        titulo: "Arrastra: Preparar sensor infrarrojo",
        desc: "Arrastra el bloque <em>Preparar sensor infrarrojo</em> al área de trabajo. Asegúrate de que el pin sea <b>12</b>. Este bloque se coloca <b>una sola vez</b> al inicio del programa.",
        highlightCat: "Sensores IR", expandCats: ["Sensores", "Sensores Digitales"],
        bloque: "init_infrarrojo", bloqueLabel: "Preparar sensor infrarrojo"
      },
      {
        titulo: "Crea la variable ir_valor",
        desc: "Ve a <b>Variables</b> y haz clic en <b>Crear variable</b>. Escribe el nombre <b>ir_valor</b> y confirma. Esta variable guardará la lectura del sensor en cada ciclo.",
        highlightCat: "Variables", highlightFlyoutButton: "create_variable", variable: "ir_valor", bloque: null
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. Todo lo que pongamos dentro se ejecutará sin parar.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Guarda la lectura del sensor",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>establecer ir_valor a</em> <b>dentro</b> del ciclo.",
        highlightCat: "Variables",
        bloque: "variables_set", bloqueLabel: "establecer ir_valor a"
      },
      {
        titulo: "Conecta: Leer sensor infrarrojo",
        desc: "Ve a <b>Sensores → Sensores Digitales → Sensores IR</b> y arrastra el bloque <em>Leer sensor infrarrojo</em> (pin <b>12</b>). Conéctalo al espacio vacío del bloque <em>establecer ir_valor a</em>.",
        highlightCat: "Sensores IR", expandCats: ["Sensores", "Sensores Digitales"],
        bloque: "read_infrarrojo", bloqueLabel: "Leer sensor infrarrojo"
      },
      {
        titulo: "Imprime el resultado",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> justo debajo del bloque anterior (dentro del ciclo).",
        highlightCat: "Textos",
        bloque: "text_print", bloqueLabel: "imprimir"
      },
      {
        titulo: "Conecta ir_valor al imprimir",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>obtener ir_valor</em>. Conéctalo dentro del bloque <em>imprimir</em>. Verás <b>0</b> sobre negro y <b>1</b> sobre blanco en el monitor serial.",
        highlightCat: "Variables",
        bloque: { tipo: "variables_get", valor: "ir_valor" },
        bloqueLabel: "obtener ir_valor"
      },
      {
        titulo: "Agrega una pausa corta",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> al final del ciclo. Ajusta el valor a <b>0.2</b> segundos para no saturar el monitor serial.",
        highlightCat: "Tiempo",
        bloque: "time_sleep", bloqueLabel: "esperar 0.2 s"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Abre el monitor serial y pasa el sensor sobre una línea negra y sobre fondo blanco. Verás cómo el valor cambia entre <b>0</b> (negro) y <b>1</b> (blanco).",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  analogico_adkey: {
    title: "Sensor Analógico (ADC Keypad)", icon: "🎛️",
    diagram: "img/conexiones/adkeypad.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Aprenderemos a leer un <b>teclado analógico ADKey</b> (también llamado AD Keypad). Este módulo tiene varios botones conectados a una sola salida analógica. Cada botón devuelve un <b>voltaje diferente</b>, y así sabemos cuál se presionó.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física del ADKey",
        desc: "Conecta el módulo ADKey al ESP32 así:<br>📌 <b>S</b> (señal analógica) → pin <b>35</b><br>⚡ <b>V</b> → 3.3V<br>⏚ <b>G</b> → GND<br><br>Usa siempre un <b>pin analógico</b> del ESP32 (como el 35, 34, 36, 39). Estos pines solo pueden leer, no escribir.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Sensores Analógicos",
        desc: "Selecciona la subcategoría <b>Sensores Analógicos</b>.",
        highlightCat: "Sensores Analogicos",
        expandCat: "Sensores",
        bloque: null
      },
      {
        titulo: "Inicializa el sensor ADC",
        desc: "Arrastra <em>analog_sensor_init</em>. Configura el pin <b>35</b>, atenuación <b>ADC.ATTN_11DB</b> y resolución <b>ADC.WIDTH_10BIT</b>.",
        highlightCat: "Sensores Analogicos",
        expandCat: "Sensores",
        bloque: "analog_sensor_init"
      },
      {
        titulo: "Crea la variable adkey",
        desc: "Ve a <b>Variables</b> y crea una nueva variable llamada <b>adkey</b>.",
        highlightCat: "Variables",
        highlightFlyoutButton: "create_variable",
        variable: "adkey",
        expandCat: null,
        bloque: null
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra <em>Repetir mientras Verdadero</em> para leer continuamente el teclado.",
        highlightCat: "Ciclos",
        expandCat: null,
        bloque: "controls_whileUntil"
      },
      {
        titulo: "Guardar lectura del sensor",
        desc: "Dentro del ciclo arrastra <em>establecer adkey a</em>.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: "variables_set"
      },
      {
        titulo: "Leer valor analógico",
        desc: "Conecta <em>analog_sensor_read</em> dentro del bloque anterior para guardar la lectura del adkey.",
        highlightCat: "Sensores Analogicos",
        expandCat: "Sensores",
        bloque: "analog_sensor_read"
      },
      {
        titulo: "Mostrar valor en pantalla",
        desc: "Ve a <b>Textos</b> y agrega <em>imprimir</em> para visualizar el valor leído.",
        highlightCat: "Textos",
        expandCat: null,
        bloque: "text_print"
      },
      {
        titulo: "Consultar variable adkey",
        desc: "Conecta <em>obtener adkey</em> dentro de <em>imprimir</em>.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: {
          tipo: "variables_get",
          valor: "adkey"
        }
      },
      {
        titulo: "Agregar condición si",
        desc: "Ve a <b>Lógica</b> y arrastra un bloque <em>si hacer</em> para detectar qué botón fue presionado.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "controls_if"
      },
      {
        titulo: "Usa operador Y",
        desc: "Reemplaza el valor <em>verdadero</em> por un bloque <em>Y</em>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_operation"
      },
      {
        titulo: "Primera comparación",
        desc: "Agrega un bloque <em>logic_compare</em> para verificar si <b>adkey ≥ 0</b>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_compare", bloqueLabel: "Comparar"
      },
      {
        titulo: "Consultar variable adkey",
        desc: "Conecta <em>obtener adkey</em> dentro de la primara comparación. >= 0.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: {
          tipo: "variables_get",
          valor: "adkey"
        }
      },
      {
        titulo: "Establecer 0.",
        desc: "Ve a Matemáticas y selecciona el bloque 0.",
        highlightCat: "Matemáticas",
        bloque: "math_number"
      },
      {
        titulo: "Segunda comparación",
        desc: "Agrega otro bloque <em>logic_compare</em> para verificar si <b>adkey < 100</b>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_compare"
      },
      {
        titulo: "Consultar variable adkey",
        desc: "Conecta <em>obtener adkey</em> dentro de la segunda comparación. < 100.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: {
          tipo: "variables_get",
          valor: "adkey"
        }
      },
      {
        titulo: "Establecer 100.",
        desc: "Ve a Matemáticas y selecciona el bloque 100.",
        highlightCat: "Matemáticas",
        bloque: "math_number"
      },
      {
        titulo: "Imprime Izquierda",
        desc: "Dentro del bloque <em>si</em>, agrega un bloque <em>imprimir</em> con el texto <b>Izquierda</b>.",
        highlightCat: "Textos",
        expandCat: null,
        bloque: "text_print"
      },
      {
        titulo: "Agregar si hacer",
        desc: "Usa el bloque de <em>si hacer</em> para agregar bloques <b>si hacer</b>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "controls_if"
      },
      {
        titulo: "Usa operador Y",
        desc: "Reemplaza el valor <em>verdadero</em> por un bloque <em>Y</em>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_operation"
      },
      {
        titulo: "Primera comparación",
        desc: "Agrega un bloque <em>logic_compare</em> para verificar si <b>adkey > 100</b>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_compare"
      },
      {
        titulo: "Consultar variable adkey",
        desc: "Conecta <em>obtener adkey</em> dentro de la primara comparación. > 100.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: {
          tipo: "variables_get",
          valor: "adkey"
        }
      },
      {
        titulo: "Establecer 100.",
        desc: "Ve a Matemáticas y selecciona el bloque 100.",
        highlightCat: "Matemáticas",
        bloque: "math_number"
      },
      {
        titulo: "Segunda comparación",
        desc: "Agrega otro bloque <em>logic_compare</em> para verificar si <b>adkey < 200.</b>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_compare"
      },
      {
        titulo: "Consultar variable adkey",
        desc: "Conecta <em>obtener adkey</em> dentro de la segunda comparación. < 200.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: {
          tipo: "variables_get",
          valor: "adkey"
        }
      },
      {
        titulo: "Establecer 200.",
        desc: "Ve a Matemáticas y selecciona el bloque 200.",
        highlightCat: "Matemáticas",
        bloque: "math_number"
      },
      {
        titulo: "Imprime Arriba",
        desc: "Dentro del bloque <em>si</em>, agrega un bloque <em>imprimir</em> con el texto <b>Arriba</b>.",
        highlightCat: "Textos",
        expandCat: null,
        bloque: "text_print"
      },
      {
        titulo: "Agregar si hacer",
        desc: "Usa el bloque <em>si hacer</em> para agregar bloques <b>si hacer</b>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "controls_if"
      },
      {
        titulo: "Usa operador Y",
        desc: "Reemplaza el valor <em>verdadero</em> por un bloque <em>Y</em>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_operation"
      },
      {
        titulo: "Primera comparación",
        desc: "Agrega un bloque <em>logic_compare</em> para verificar si <b>adkey > 200</b>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_compare"
      },
      {
        titulo: "Consultar variable adkey",
        desc: "Conecta <em>obtener adkey</em> dentro de la primara comparación. > 200.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: {
          tipo: "variables_get",
          valor: "adkey"
        }
      },
      {
        titulo: "Establecer 200.",
        desc: "Ve a Matemáticas y selecciona el bloque 200.",
        highlightCat: "Matemáticas",
        bloque: "math_number"
      },
      {
        titulo: "Segunda comparación",
        desc: "Agrega otro bloque <em>logic_compare</em> para verificar si <b>adkey < 300</b>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_compare"
      },
      {
        titulo: "Consultar variable adkey",
        desc: "Conecta <em>obtener adkey</em> dentro de la segunda comparación. < 300.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: {
          tipo: "variables_get",
          valor: "adkey"
        }
      },
      {
        titulo: "Establecer 300.",
        desc: "Ve a Matemáticas y selecciona el bloque 300.",
        highlightCat: "Matemáticas",
        bloque: "math_number"
      },
      {
        titulo: "Imprime Abajo",
        desc: "Dentro del bloque <em>si</em>, agrega un bloque <em>imprimir</em> con el texto <b>Abajo</b>.",
        highlightCat: "Textos",
        expandCat: null,
        bloque: "text_print"
      },
      {
        titulo: "Agregar si hacer",
        desc: "Usa el bloque <em>si hacer</em> para agregar bloques <b>si hacer</b>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "controls_if"
      },
      {
        titulo: "Usa operador Y",
        desc: "Reemplaza el valor <em>verdadero</em> por un bloque <em>Y</em>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_operation"
      },
      {
        titulo: "Primera comparación",
        desc: "Agrega un bloque <em>logic_compare</em> para verificar si <b>adkey > 300</b>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_compare"
      },
      {
        titulo: "Consultar variable adkey",
        desc: "Conecta <em>obtener adkey</em> dentro de la primara comparación. > 300.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: {
          tipo: "variables_get",
          valor: "adkey"
        }
      },
      {
        titulo: "Establecer 300.",
        desc: "Ve a Matemáticas y selecciona el bloque 300.",
        highlightCat: "Matemáticas",
        bloque: "math_number"
      },
      {
        titulo: "Segunda comparación",
        desc: "Agrega otro bloque <em>logic_compare</em> para verificar si <b>adkey < 500</b>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_compare"
      },
      {
        titulo: "Consultar variable adkey",
        desc: "Conecta <em>obtener adkey</em> dentro de la segunda comparación. < 500.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: {
          tipo: "variables_get",
          valor: "adkey"
        }
      },
      {
        titulo: "Establecer 500.",
        desc: "Ve a Matemáticas y selecciona el bloque 500.",
        highlightCat: "Matemáticas",
        bloque: "math_number"
      },
      {
        titulo: "Imprime Derecha",
        desc: "Dentro del bloque <em>si</em>, agrega un bloque <em>imprimir</em> con el texto <b>Derecha</b>.",
        highlightCat: "Textos",
        expandCat: null,
        bloque: "text_print"
      },
      {
        titulo: "Agregar si hacer",
        desc: "Usa el bloque <em>si hacer</em> para agregar bloques <b>si hacer</b>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "controls_if"
      },
      {
        titulo: "Usa operador Y",
        desc: "Reemplaza el valor <em>verdadero</em> por un bloque <em>Y</em>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_operation"
      },
      {
        titulo: "Primera comparación",
        desc: "Agrega un bloque <em>logic_compare</em> para verificar si <b>adkey > 700</b>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_compare"
      },
      {
        titulo: "Consultar variable adkey",
        desc: "Conecta <em>obtener adkey</em> dentro de la primara comparación. > 700.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: {
          tipo: "variables_get",
          valor: "adkey"
        }
      },
      {
        titulo: "Establecer 700.",
        desc: "Ve a Matemáticas y selecciona el bloque 700.",
        highlightCat: "Matemáticas",
        bloque: "math_number"
      },
      {
        titulo: "Segunda comparación",
        desc: "Agrega otro bloque <em>logic_compare</em> para verificar si <b>adkey < 800</b>.",
        highlightCat: "Lógica",
        expandCat: null,
        bloque: "logic_compare"
      },
      {
        titulo: "Consultar variable adkey",
        desc: "Conecta <em>obtener adkey</em> dentro de la segunda comparación. < 800.",
        highlightCat: "Variables",
        expandCat: null,
        bloque: {
          tipo: "variables_get",
          valor: "adkey"
        }
      },
      {
        titulo: "Establecer 800.",
        desc: "Ve a Matemáticas y selecciona el bloque 800.",
        highlightCat: "Matemáticas",
        bloque: "math_number"
      },
      {
        titulo: "Imprime Enter",
        desc: "Dentro del bloque <em>si</em>, agrega un bloque <em>imprimir</em> con el texto <b>Enter</b>.",
        highlightCat: "Textos",
        expandCat: null,
        bloque: "text_print"
      },
      {
        titulo: "Agrega una pausa",
        desc: "Ve a <b>Tiempo</b> y agrega <em>time_sleep</em> con valor de <b>1 segundo</b>.",
        highlightCat: "Tiempo",
        expandCat: null,
        bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: "Haz clic en <b>Ejecutar</b> <span class='icon-btn icon-run'></span> para probar tu teclado ADC.",
        highlightElement: "#btnRun",
        waitForAction: "run"
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════
     SERVIDOR SOCKET (WiFi AP + TCP Socket)
  ══════════════════════════════════════════════════════════════ */
  servidor_socket: {
    title: "Servidor Socket (TCP)", icon: "🖥️",
    diagram: "img/conexiones/servidor.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Programaremos el ESP32 como un <b>servidor TCP</b>. El ESP32 creará su propia red WiFi (Access Point), esperará conexiones de clientes en el puerto 80 y mostrará los mensajes recibidos en el monitor serial.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "¿Cómo funciona?",
        desc: "El flujo es:<br>1️⃣ ESP32 crea un punto de acceso WiFi (AP)<br>2️⃣ Crea un socket y espera conexiones en el puerto <b>80</b><br>3️⃣ Cuando llega un cliente, acepta la conexión<br>4️⃣ Recibe el mensaje y lo muestra en el monitor serial<br>5️⃣ Repite infinitamente",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Comunicación Inalambrica › WiFi",
        desc: "Haz clic en <b>Comunicación Inalambrica</b> → <b>WiFi</b> en el panel de bloques para ver los bloques de red.",
        highlightCat: "WiFi", expandCat: "Comunicación Inalambrica", bloque: null
      },
      {
        titulo: "Arrastra: Configurar Access Point",
        desc: "Arrastra el bloque <em>Configurar Access Point (AP)</em>. Ajusta los valores:<br>📡 SSID: <b>ESP32_AP</b><br>🔑 Contraseña: (vacío o mínimo 8 caracteres)<br>🌐 IP: <b>192.168.0.1</b><br>🔲 Subnet: <b>255.255.255.0</b>",
        highlightCat: "WiFi", expandCat: "Comunicación Inalambrica",
        bloque: "wifi_ap", bloqueLabel: "Configurar Access Point (AP)"
      },
      {
        titulo: "Arrastra: Iniciar Access Point",
        desc: "Arrastra el bloque <em>Iniciar AP</em> justo debajo del bloque anterior. Este bloque activa el punto de acceso WiFi del ESP32.",
        highlightCat: "WiFi", expandCat: "Comunicación Inalambrica",
        bloque: "wifi_start_ap", bloqueLabel: "Iniciar AP"
      },
      {
        titulo: "Abre la categoría Servidor",
        desc: "Dentro de <b>Comunicación Inalambrica</b> → <b>Socket</b>, selecciona <b>Servidor</b> para ver los bloques de comunicación TCP.",
        highlightCat: "Servidor", expandCats: ["Comunicación Inalambrica", "Socket"], bloque: null
      },
      {
        titulo: "Arrastra: Vincular socket (bind)",
        desc: "Arrastra el bloque <em>Vincular socket</em>. Configura:<br>📋 Variable: <b>s</b><br>🌐 IP: <b>0.0.0.0</b> (escucha en todas las interfaces)<br>🔌 Puerto: <b>80</b>",
        highlightCat: "Servidor", expandCats: ["Comunicación Inalambrica", "Socket"],
        bloque: "socket_bind", bloqueLabel: "Vincular socket (bind)"
      },
      {
        titulo: "Arrastra: Escuchar conexiones (listen)",
        desc: "Arrastra el bloque <em>Escuchar conexiones</em>. Configura:<br>📋 Variable: <b>s</b><br>📥 Backlog: <b>5</b> (máximo de conexiones en espera)",
        highlightCat: "Servidor", expandCats: ["Comunicación Inalambrica", "Socket"],
        bloque: "socket_listen", bloqueLabel: "Escuchar conexiones (listen)"
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>Repetir mientras Verdadero</em>. El servidor esperará clientes continuamente dentro de este ciclo.",
        highlightCat: "Ciclos", expandCat: null, bloque: "controls_whileUntil"
      },
      {
        titulo: "Arrastra: Aceptar conexión (accept)",
        desc: "Ve a <b>Socket</b> y arrastra el bloque <em>Aceptar conexión</em> dentro del ciclo. Configura:<br>📋 Socket: <b>s</b><br>📨 Variable conexión: <b>conexion</b><br>📍 Variable dirección: <b>addr</b>",
        highlightCat: "Servidor", expandCats: ["Comunicación Inalambrica", "Socket"],
        bloque: "socket_accept", bloqueLabel: "Aceptar conexión (accept)"
      },
      {
        titulo: "Imprime la nueva conexión",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> al área de trabajo, dentro del ciclo después del bloque <em>Aceptar conexión</em>.",
        highlightCat: "Textos", expandCat: null, bloque: "text_print", bloqueLabel: "Imprimir en monitor serial"
      },
      {
        titulo: "Une el texto con crear texto con",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>crear texto con</em>. Conéctalo dentro del bloque <em>imprimir</em>. En la primera posición agrega un bloque <em>texto</em> con el mensaje <b>'Nueva conexión establecida!'</b>.",
        highlightCat: "Textos", expandCat: null, bloque: "text_join", bloqueLabel: "Crear texto con"
      },
      {
        titulo: "Conecta la variable conexion",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>obtener conexion</em>. Conéctalo en la segunda posición del bloque <em>crear texto con</em>.",
        highlightCat: "Variables", expandCat: null,
        bloque: { tipo: "variables_get", valor: "conexion" },
        bloqueLabel: "obtener conexion"
      },
      {
        titulo: "Crea la variable: respuesta",
        desc: "Ve a <b>Variables</b> y haz clic en <b>Crear variable</b>. Escribe el nombre <b>respuesta</b> y confirma. Esta variable guardará los mensajes recibidos de los clientes.",
        highlightCat: "Variables", highlightFlyoutButton: "create_variable", variable: "respuesta", bloque: null
      },
      {
        titulo: "Guardar respuesta del cliente",
        desc: "Ve a <b>Variables</b> y arrastra <em>establecer respuesta a</em> justo después del bloque <em>Imprimir</em>.",
        highlightCat: "Variables",
        bloque: "variables_set", bloqueLabel: "establecer respuesta a"
      },
      {
        titulo: "Leer valor recibido",
        desc: "Conecta <em>socket_receive</em> dentro del bloque establecer respuesta a para guardar los mensajes recibidos.",
        highlightCat: "Servidor", expandCats: ["Comunicación Inalambrica", "Socket"],
        bloque: "socket_receive", bloqueLabel: "Recibir conexiónes del socket"
      },
      {
        titulo: "Imprime el mensaje recibido",
        desc: "Ve a <b>Textos</b> y arrastra otro bloque <em>imprimir</em> al área de trabajo, debajo del bloque de <em>Recibir datos del socket</em>.",
        highlightCat: "Textos", expandCat: null, bloque: "text_print", bloqueLabel: "Imprimir en monitor serial"
      },
      {
        titulo: "Une el texto con la variable respuesta",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>crear texto con</em>. Conéctalo dentro del bloque <em>imprimir</em>. Agrega el texto <b>'Mensaje recibido es:'</b> en la primera posición.",
        highlightCat: "Textos", expandCat: null, bloque: "text_join", bloqueLabel: "Crear texto con"
      },
      {
        titulo: "Conecta la variable respuesta",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>obtener respuesta</em>. Conéctalo en la segunda posición del bloque <em>crear texto con</em>.",
        highlightCat: "Variables", expandCat: null,
        bloque: { tipo: "variables_get", valor: "respuesta" },
        bloqueLabel: "obtener respuesta"
      },
      {
        titulo: "Agrega una pausa",
        desc: "Ve a <b>Tiempo</b> y arrastra <em>Esperar</em> con valor <b>1</b> segundo al final del ciclo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Cerrar la conexión del cliente",
        desc: "Ve a <b>Comunicación Inalambrica</b> → <b>Socket</b> → <b>Servidor</b> y arrastra el bloque <em>Cerrar socket</em>. Colócalo justo después del bloque <em>Esperar</em>. Variable: <b>conexion</b>.",
        highlightCat: "Servidor", expandCats: ["Comunicación Inalambrica", "Socket"],
        bloque: "socket_close", bloqueLabel: "Cerrar socket"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Ejecuta el servidor",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. El ESP32 creará la red <b>ESP32_AP</b>. Ahora programa el cliente con el otro tutorial para enviarle mensajes.",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════
     CLIENTE SOCKET (WiFi + TCP Socket)
  ══════════════════════════════════════════════════════════════ */
  cliente_socket: {
    title: "Cliente Socket (TCP)", icon: "📱",
    diagram: "img/conexiones/cliente.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Programaremos el ESP32 como un <b>cliente TCP</b>. Se conectará a la red WiFi del servidor, creará un socket, enviará un mensaje y cerrará la conexión. Asegúrate de tener el <b>ESP32 Servidor</b> ya encendido antes de continuar.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Configuración de red",
        desc: "El cliente se conectará al Access Point del servidor:<br>📡 SSID: <b>ESP32_AP</b> (o el nombre de tu red)<br>🔑 Contraseña: la de tu red<br>🌐 IP del servidor: <b>192.168.0.1</b><br>🔌 Puerto: <b>80</b><br><br>Ajusta el SSID y contraseña según tu configuración.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Comunicación Inalambrica › WiFi",
        desc: "Haz clic en <b>Comunicación Inalambrica</b> → <b>WiFi</b> en el panel de bloques.",
        highlightCat: "WiFi", expandCat: "Comunicación Inalambrica", bloque: null
      },
      {
        titulo: "Arrastra: Definir credenciales WiFi",
        desc: "Arrastra el bloque <em>Definir credenciales WiFi</em>. Escribe el <b>SSID</b> y la <b>contraseña</b> de la red a la que te conectarás (la red del servidor o tu router).",
        highlightCat: "WiFi", expandCat: "Comunicación Inalambrica",
        bloque: "wifi_define_connect", bloqueLabel: "Definir credenciales WiFi"
      },
      {
        titulo: "Arrastra: Conectar a WiFi",
        desc: "Arrastra el bloque <em>Conectar a WiFi</em> debajo del bloque anterior. El ESP32 se conectará automáticamente a la red configurada.",
        highlightCat: "WiFi", expandCat: "Comunicación Inalambrica",
        bloque: "wifi_call_connect", bloqueLabel: "Conectar a WiFi"
      },
      {
        titulo: "Llama a la función enviar_msg",
        desc: "Ve a <b>Funciones</b> y arrastra el bloque de llamada <em>enviar_msg</em>. En el parámetro <b>msg</b> conecta un bloque de texto con el mensaje que deseas enviar, por ejemplo <b>3DP!t</b>.",
        highlightCat: "Funciones", expandCat: null,
        bloque: "procedures_callnoreturn", bloqueLabel: "Llamar función"
      },
      {
        titulo: "Define la función enviar_msg",
        desc: "Ve a <b>Funciones</b> y crea una función llamada <b>enviar_msg</b> con un parámetro <b>msg</b>. Dentro de esta función irán todos los bloques de socket.",
        highlightCat: "Funciones", expandCat: null,
        bloque: "procedures_defnoreturn", bloqueLabel: "Definir función"
      },
      {
        titulo: "Dentro de la función: Crear socket",
        desc: "Ve a <b>Comunicación Inalambrica</b> → <b>Socket</b> y arrastra el bloque <em>Crear socket</em> dentro de la función. Configura:<br>📋 Variable: <b>s</b><br>🌐 Familia: <b>AF_INET</b><br>📡 Tipo: <b>SOCK_STREAM</b><br>🔌 Protocolo: <b>IPPROTO_TCP</b>",
        highlightCat: "Socket", expandCat: "Comunicación Inalambrica",
        bloque: "socket_create", bloqueLabel: "Crear socket"
      },
      {
        titulo: "Dentro de la función: Conectar al servidor",
        desc: "Arrastra el bloque <em>Conectar socket</em> debajo. Configura:<br>📋 Variable: <b>s</b><br>🌐 IP: <b>192.168.0.1</b> (IP del servidor)<br>🔌 Puerto: <b>80</b>",
        highlightCat: "Cliente", expandCats: ["Comunicación Inalambrica", "Socket"],
        bloque: "socket_connect", bloqueLabel: "Conectar socket"
      },
      {
        titulo: "Dentro de la función: Enviar mensaje",
        desc: "Ve a <b>Comunicación Inalambrica</b> → <b>Socket</b> → <b>Cliente</b> y arrastra el bloque <em>Enviar todos los datos (sendall)</em>. Variable: <b>s</b>.",
        highlightCat: "Cliente", expandCats: ["Comunicación Inalambrica", "Socket"],
        bloque: "socket_sendall", bloqueLabel: "Enviar todos los datos (sendall)"
      },
      {
        titulo: "Conecta la variable msg al sendall",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>obtener msg</em>. Conéctalo en el espacio de <em>Datos</em> del bloque <em>Enviar todos los datos</em>.",
        highlightCat: "Variables", expandCat: null,
        bloque: { tipo: "variables_get", valor: "msg" },
        bloqueLabel: "obtener msg"
      },
      {
        titulo: "Dentro de la función: Cerrar socket",
        desc: "Arrastra el bloque <em>Cerrar socket</em> al final de la función. Variable: <b>s</b>. Siempre cierra el socket después de enviar.",
        highlightCat: "Cliente", expandCats: ["Comunicación Inalambrica", "Socket"],
        bloque: "socket_close", bloqueLabel: "Cerrar socket"
      },
      {
        titulo: "Llama a la función enviar_msg",
        desc: "Ve a <b>Funciones</b> y arrastra el bloque de llamada <em>enviar_msg</em> debajo del bloque <em>Conectar a WiFi</em>. En el parámetro <b>msg</b> conecta un bloque de <em>texto</em> desde <b>Textos</b> con el mensaje que deseas enviar, por ejemplo <b>Hola desde ESP32!</b>.",
        highlightCat: "Funciones", expandCat: null,
        bloque: "procedures_callnoreturn", bloqueLabel: "Llamar función enviar_msg"
      },
      {
        titulo: "Escribe el mensaje a enviar",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>texto</em>. Conéctalo al parámetro <b>msg</b> del bloque <em>enviar_msg</em>. Escribe el mensaje que deseas enviar al servidor, por ejemplo <b>Hola desde ESP32!</b>.",
        highlightCat: "Textos", expandCat: null,
        bloque: "text", bloqueLabel: "Texto (cadena)"
      },
      {
        titulo: "Conecta tu ESP32 cliente y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 cliente y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta el cliente y verifica!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. El ESP32 se conectará a la red, enviará el mensaje al servidor y cerrará la conexión. En el monitor serial del <b>servidor</b> verás el mensaje recibido. 🎉",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════
     PORTAL CAUTIVO (WiFi AP + DNS + HTTP Server)
  ══════════════════════════════════════════════════════════════ */
  portal_cautivo: {
    title: "Portal Cautivo (Captive Portal)", icon: "🌐",
    diagram: "img/conexiones/cautivo.svg",
    steps: [
      {
        titulo: "¿Qué es un Portal Cautivo?",
        desc: "Un <b>portal cautivo</b> es la página de bienvenida que aparece cuando te conectas a una red WiFi pública (hotel, café, aeropuerto). Con el ESP32 crearemos nuestra propia red y redirigiremos a cualquier dispositivo conectado a una página web personalizada.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "¿Cómo funciona?",
        desc: "El flujo completo es:<br>1️⃣ ESP32 crea una red WiFi propia (AP)<br>2️⃣ Un servidor DNS redirige todas las peticiones al ESP32<br>3️⃣ El servidor HTTP sirve una página web personalizada<br>4️⃣ Los comandos que llegan se procesan en la función <b>comandos</b>",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Comunicación Inalambrica › WiFi",
        desc: "Haz clic en <b>Comunicación Inalambrica</b> → <b>WiFi</b> en el panel de bloques.",
        highlightCat: "WiFi", expandCat: "Comunicación Inalambrica", bloque: null
      },
      {
        titulo: "Arrastra: Configurar Access Point",
        desc: "Arrastra el bloque <em>Configurar Access Point (AP)</em>. Configura:<br>📡 SSID: <b>ESP32_AP</b><br>🔑 Contraseña: <b>12345678</b><br>🌐 IP: <b>192.168.0.1</b><br>🔲 Subnet: <b>255.255.255.0</b>",
        highlightCat: "WiFi", expandCat: "Comunicación Inalambrica",
        bloque: "wifi_ap", bloqueLabel: "Configurar Access Point (AP)"
      },
      {
        titulo: "Abre la categoría Portal Cautivo",
        desc: "Dentro de <b>Comunicación Inalambrica</b>, busca y selecciona <b>Portal Cautivo</b> para ver sus bloques.",
        highlightCat: "Portal Cautivo", expandCat: "Comunicación Inalambrica", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar Portal",
        desc: "Arrastra el bloque <em>Inicializar portal cautivo</em>. Este bloque prepara el sistema del portal para recibir conexiones.",
        highlightCat: "Portal Cautivo", expandCat: "Comunicación Inalambrica",
        bloque: "portal_init", bloqueLabel: "Inicializar portal cautivo"
      },
      {
        titulo: "Arrastra: Consulta DNS",
        desc: "Arrastra el bloque <em>Consulta DNS</em> debajo. Este bloque configura el servidor DNS que redirigirá todas las peticiones al ESP32.",
        highlightCat: "Portal Cautivo", expandCat: "Comunicación Inalambrica",
        bloque: "DNSQuery", bloqueLabel: "Consulta DNS"
      },
      {
        titulo: "Arrastra: Servidor DNS del portal",
        desc: "Arrastra el bloque <em>Servidor DNS del portal</em>. Este servidor captura todas las peticiones DNS y las redirige a la IP del ESP32, forzando a los clientes a ver tu página.",
        highlightCat: "Portal Cautivo", expandCat: "Comunicación Inalambrica",
        bloque: "portal_dns_server", bloqueLabel: "Servidor DNS del portal"
      },
      {
        titulo: "Arrastra: Servidor HTTP del portal",
        desc: "Arrastra el bloque <em>Servidor HTTP del portal</em>. Configura:<br>📄 Nombre de la página: <b>index</b><br>📋 Variable tipo: <b>tipo</b><br>📋 Variable valor: <b>valor</b><br><br>Estos parámetros se pasan a la función <b>comandos</b> cuando llega una petición.",
        highlightCat: "Portal Cautivo", expandCat: "Comunicación Inalambrica",
        bloque: "portal_http_server", bloqueLabel: "Servidor HTTP del portal"
      },
      {
        titulo: "Arrastra: Bucle principal del portal",
        desc: "Arrastra el bloque <em>Bucle principal del portal</em> al final. Este bloque mantiene el portal funcionando de forma continua, procesando peticiones DNS y HTTP.",
        highlightCat: "Portal Cautivo", expandCat: "Comunicación Inalambrica",
        bloque: "portal_main", bloqueLabel: "Bucle principal del portal"
      },
      {
        titulo: "Define la función comandos",
        desc: "Ve a <b>Funciones</b> y crea una función llamada <b>comandos</b> con dos parámetros: <b>tipo</b> y <b>valor</b>. Esta función se llamará cada vez que un cliente envíe un comando desde la página web del portal.",
        highlightCat: "Portal Cautivo", expandCat: "Comunicación Inalambrica",
        bloque: "portal_comandos", bloqueLabel: "Definir función"
      },
      {
        titulo: "Dentro de comandos: Imprimir tipo",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> dentro de la función <b>comandos</b>.",
        highlightCat: "Textos", expandCat: null, bloque: "text_print", bloqueLabel: "Imprimir en monitor serial"
      },
      {
        titulo: "Conecta la variable tipo",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>obtener tipo</em>. Conéctalo dentro del bloque <em>imprimir</em>. Así verás qué tipo de comando llegó.",
        highlightCat: "Variables", expandCat: null,
        bloque: { tipo: "variables_get", valor: "tipo" },
        bloqueLabel: "obtener tipo"
      },
      {
        titulo: "Dentro de comandos: Imprimir valor",
        desc: "Ve a <b>Textos</b> y arrastra otro bloque <em>imprimir</em> debajo del anterior.",
        highlightCat: "Textos", expandCat: null, bloque: "text_print", bloqueLabel: "Imprimir en monitor serial"
      },
      {
        titulo: "Conecta la variable valor",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>obtener valor</em>. Conéctalo dentro del segundo bloque <em>imprimir</em>. Así verás el valor enviado por el cliente.",
        highlightCat: "Variables", expandCat: null,
        bloque: { tipo: "variables_get", valor: "valor" },
        bloqueLabel: "obtener valor"
      },
      {
        titulo: "Dentro de comandos: Esperar 100 ms",
        desc: "Ve a <b>Tiempo</b> y arrastra <em>Esperar</em> con valor <b>100</b> ms abajo del print valor.",
        highlightCat: "Portal Cautivo", expandCat: "Comunicación Inalambrica", bloque: "async_sleep_ms"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba el portal!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Conecta tu celular o laptop a la red <b>ESP32_AP</b>. Al abrir cualquier página web serás redirigido automáticamente al portal cautivo del ESP32. 🌐",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  ir_ky022: {
    title: "Control Remoto IR (KY-022)", icon: "📺",
    diagram: "img/conexiones/ky-022.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a usar el receptor infrarrojo <b>KY-022</b> para leer los botones de un control remoto. Cada botón envía un código numérico único que el ESP32 puede detectar y usar para encender LEDs, mover motores, ¡lo que imagines!",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física del KY-022",
        desc: "Conecta el módulo KY-022 al ESP32 así:<br>📌 <b>S</b> (señal) → pin <b>16</b><br>⚡ <b>V</b> (voltaje) → 3.3V<br>⏚ <b>G</b> (tierra) → GND<br><br>El lado con el pequeño lente negro del sensor debe apuntar hacia el control remoto.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre la categoría Sensores",
        desc: "Haz clic en <b>Sensores</b> en el panel de bloques para desplegarlo.",
        highlightCat: "Sensores", expandCat: null, bloque: null
      },
      {
        titulo: "Abre: Sensores Digitales",
        desc: "Dentro de <b>Sensores</b>, haz clic en <b>Sensores Digitales</b> para ver sus subcategorías.",
        highlightCat: "Sensores Digitales", expandCat: "Sensores", bloque: null
      },
      {
        titulo: "Abre: IR KY-022",
        desc: "Dentro de <b>Sensores Digitales</b>, selecciona <b>IR KY-022</b> para ver los bloques del receptor de control remoto.",
        highlightCat: "IR KY-022", expandCat: "Sensores", bloque: null
      },
      {
        titulo: "Arrastra: Preparar receptor IR KY-022",
        desc: "Arrastra el bloque <em>Preparar receptor IR KY-022</em> al área de trabajo. Este bloque configura el pin de señal (por defecto <b>15</b>) y se coloca <b>una sola vez</b> al inicio del programa.",
        highlightCat: "IR KY-022", expandCat: "Sensores",
        bloque: "init_ir_ky022", bloqueLabel: "Preparar receptor IR KY-022"
      },
      {
        titulo: "Abre IR KY-022 de nuevo",
        desc: "Haz clic en <b>Sensores</b> → <b>Sensores Digitales</b> → <b>IR KY-022</b> para ver el bloque de recepción de código.",
        highlightCat: "IR KY-022", expandCat: "Sensores", bloque: null
      },
      {
        titulo: "Conecta: Recibir código del control remoto",
        desc: "Arrastra el bloque <em>Recibir código IR (con callback)</em>. Conéctalo al espacio vacío del bloque <em>establecer codigo_ir a</em>. Este bloque espera hasta que llega una señal del control y devuelve su código.",
        highlightCat: "IR KY-022", expandCat: "Sensores",
        bloque: "ir_ky022_callback_code", bloqueLabel: "Recibir código IR (con callback)"
      },
      {
        titulo: "Agrega: imprimir el código recibido",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> justo debajo (dentro del ciclo). Así veremos en el monitor serial el código de cada botón.",
        highlightCat: "Textos",
        bloque: "text_print", bloqueLabel: "imprimir"
      },
      {
        titulo: "Conecta el valor de codigo_ir al imprimir",
        desc: "Ve a <b>Variables</b> y arrastra <em>obtener data</em>. Conéctalo dentro del bloque <em>imprimir</em>. Cada botón del control remoto mostrará un número distinto en el monitor serial.",
        highlightCat: "Variables",
        expandCat: null,
        bloqueLabel: "obtener codigo_ir",
        bloque: {
          tipo: "variables_get",
          valor: "data"
        }
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba los botones!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Abre el monitor serial, apunta el control remoto al sensor KY-022 y presiona distintos botones. Verás un número diferente por cada botón. <b>Anota los códigos</b>, los necesitarás para proyectos más avanzados.",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  espnow_receptor: {
    title: "ESP-NOW — Receptor", icon: "📶",
    diagram: "img/conexiones/espnow.svg",
    steps: [
      {
        titulo: "¿Qué es ESP-NOW?",
        desc: "ESP-NOW permite que dos ESP32 se comuniquen <b>directamente por Wi-Fi sin router ni internet</b>. En este tutorial programaremos el ESP32 que <b>recibe</b> mensajes.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Paso previo: anota tu dirección MAC",
        desc: "El emisor necesitará la <b>dirección MAC</b> de este receptor. Conéctate al ESP32 receptor y ejecuta un programa que imprima su MAC en el monitor serial.<br><br>El formato es <em>AA:BB:CC:DD:EE:FF</em>. Anótala para usarla después en el tutorial del emisor.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Comunicación Inalambrica › WiFi",
        desc: "ESP-NOW requiere que el Wi-Fi esté activo aunque no te conectes a ningún router. Haz clic en <b>Comunicación Inalambrica</b> → <b>WiFi</b> para ver los bloques de red.",
        highlightCat: "WiFi", expandCat: "Comunicación Inalambrica", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar WiFi",
        desc: "Arrastra el bloque <em>Inicializar WiFi</em> al área de trabajo.",
        highlightCat: "WiFi", expandCat: "Comunicación Inalambrica",
        bloque: "wifi_init", bloqueLabel: "Inicializar WiFi"
      },
      {
        titulo: "Abre la subcategoría ESP-NOW",
        desc: "Dentro de <b>Comunicación Inalambrica</b>, selecciona la subcategoría <b>ESP-NOW</b> para ver sus bloques.",
        highlightCat: "ESP-NOW", expandCat: "Comunicación Inalambrica", bloque: null
      },
      {
        titulo: "Arrastra: Iniciar ESP-NOW",
        desc: "Arrastra el bloque <em>Iniciar ESP-NOW</em> debajo del bloque WiFi.",
        highlightCat: "ESP-NOW", expandCat: "Comunicación Inalambrica",
        bloque: "init_espnow_simple", bloqueLabel: "Iniciar ESP-NOW"
      },
      {
        titulo: "Arrastra: Agregar peer",
        desc: "Arrastra el bloque <em>Agregar receptor ESP-NOW</em> debajo de los anteriores. Conecta el bloque <em>peer</em> en su espacio.",
        highlightCat: "ESP-NOW", expandCat: "Comunicación Inalambrica",
        bloque: "espnow_add_peer", bloqueLabel: "Agregar receptor ESP-NOW"
      },
      {
        titulo: "Arrastra: Dirección MAC (peer broadcast)",
        desc: "Arrastra el bloque <em>Dirección MAC (peer)</em>. Para el receptor usamos la dirección de <b>broadcast</b>: <code>b'\\xff\\xff\\xff\\xff\\xff\\xff'</code> (acepta mensajes de cualquier emisor). Asegúrate de que ese valor esté en el campo del bloque.",
        highlightCat: "ESP-NOW", expandCat: "Comunicación Inalambrica",
        bloque: "peer", bloqueLabel: "Dirección MAC (peer)"
      },
      {
        titulo: "Imprime mensaje de espera",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em>. Escribe el texto <b>Esperando mensajes ESP-NOW...</b> para confirmación visual en el monitor serial.",
        highlightCat: "Textos", expandCat: null,
        bloque: "text_print", bloqueLabel: "imprimir"
      },
      {
        titulo: "Agrega el ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>Repetir mientras Verdadero</em>. El receptor escuchará mensajes continuamente dentro de este ciclo.",
        highlightCat: "Ciclos", expandCat: null, bloque: "controls_whileUntil"
      },
      {
        titulo: "Arrastra: Recibir mensaje ESP-NOW",
        desc: "Ve a <b>ESP-NOW</b> y arrastra el bloque <em>Recibir mensaje ESP-NOW</em> dentro del ciclo.",
        highlightCat: "ESP-NOW", expandCat: "Comunicación Inalambrica",
        bloque: "espnow_recv", bloqueLabel: "Recibir mensaje ESP-NOW"
      },
      {
        titulo: "Condición: Si hay mensaje",
        desc: "Ve a <b>Lógica</b> y arrastra un bloque <em>Si … hacer</em> debajo del bloque de recepción. En la condición conectaremos la variable <em>msg</em> para verificar que llegó algo.",
        highlightCat: "Lógica", expandCat: null,
        bloque: "controls_if", bloqueLabel: "Si … hacer"
      },
      {
        titulo: "Condición: obtener variable msg",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>obtener msg</em>. Conéctalo como condición del bloque <em>Si</em>. Si <code>msg</code> tiene contenido (no es None) la condición es verdadera.",
        highlightCat: "Variables", expandCat: null,
        bloque: { tipo: "variables_get", valor: "msg" }
      },
      {
        titulo: "Dentro del Si: imprimir host",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> dentro de la sección <b>hacer</b>.",
        highlightCat: "Textos", expandCat: null, bloque: "text_print"
      },
      {
        titulo: "Imprimir: obtener variable host",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>obtener host</em>. Conecta el bloque <em>obtener host</em> desde Variables a la entrada del <em>Imprimir</em>",
        highlightCat: "Variables", expandCat: null,
        bloque: { tipo: "variables_get", valor: "host" }
      },
      {
        titulo: "Dentro del Si: imprimir msg",
        desc: "Arrastra otro bloque <em>imprimir</em>. Colocar debajo de anterior <em>Imprimir</em>",
        highlightCat: "Textos", expandCat: null, bloque: "text_print"
      },
      {
        titulo: "Imprimir: obtener variable msg",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>obtener msg</em>. Conecta el bloque <em>obtener msg</em> desde Variables a la entrada del <em>Imprimir</em>",
        highlightCat: "Variables", expandCat: null,
        bloque: { tipo: "variables_get", valor: "msg" }
      },
      {
        titulo: "Agrega una pausa",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>esperar</em>. Ajusta a <b>1</b> segundo. Colócalo al final del ciclo, fuera del bloque Si.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 receptor y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Ejecuta el receptor y déjalo escuchando",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. El monitor serial mostrará <em>Esperando mensajes ESP-NOW...</em>. Deja el receptor encendido y <b>ahora programa el emisor</b> con el otro tutorial.",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  espnow_emisor: {
    title: "ESP-NOW — Emisor", icon: "📡",
    diagram: "img/conexiones/espnow.svg",
    steps: [
      {
        titulo: "¿Qué haremos?",
        desc: "Programaremos el ESP32 que <b>envía</b> mensajes. Antes de continuar asegúrate de tener el ESP32 receptor ya encendido y ejecutando el programa del tutorial <b>ESP-NOW Receptor</b>.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Ten lista la MAC del receptor",
        desc: "Necesitas la <b>dirección MAC</b> del ESP32 receptor que anotaste en el tutorial anterior (formato: <em>AA:BB:CC:DD:EE:FF</em>).<br><br>Si usas <b>broadcast</b> (<code>b'\\xff\\xff\\xff\\xff\\xff\\xff'</code>) el mensaje llega a todos los ESP32 ESP-NOW del área sin necesitar la MAC exacta.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Comunicación Inalambrica › WiFi",
        desc: "Igual que el receptor, el emisor también necesita Wi-Fi activo. Ve a <b>Comunicación Inalambrica</b> → <b>WiFi</b>.",
        highlightCat: "Comunicación Inalambrica", expandCat: "WiFi", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar WiFi",
        desc: "Arrastra el bloque <em>Inicializar WiFi</em>.",
        highlightCat: "WiFi", expandCat: "Comunicación Inalambrica",
        bloque: "wifi_init", bloqueLabel: "Inicializar WiFi"
      },
      {
        titulo: "Abre la subcategoría ESP-NOW",
        desc: "Dentro de <b>Comunicación Inalambrica</b>, selecciona <b>ESP-NOW</b>.",
        highlightCat: "ESP-NOW", expandCat: "Comunicación Inalambrica", bloque: null
      },
      {
        titulo: "Arrastra: Iniciar ESP-NOW",
        desc: "Arrastra el bloque <em>Iniciar ESP-NOW</em> debajo del WiFi.",
        highlightCat: "ESP-NOW", expandCat: "Comunicación Inalambrica",
        bloque: "init_espnow_simple", bloqueLabel: "Iniciar ESP-NOW"
      },
      {
        titulo: "Arrastra: Agregar peer",
        desc: "Arrastra el bloque <em>Agregar receptor ESP-NOW</em>. Conecta el bloque <em>peer</em> en su espacio.",
        highlightCat: "ESP-NOW", expandCat: "Comunicación Inalambrica",
        bloque: "espnow_add_peer", bloqueLabel: "Agregar receptor ESP-NOW"
      },
      {
        titulo: "Arrastra: Dirección MAC del receptor (peer)",
        desc: "Arrastra el bloque <em>Dirección MAC (peer)</em>. En el campo escribe la MAC del receptor en formato <code>b'\\xAA\\xBB\\xCC\\xDD\\xEE\\xFF'</code>.<br><br>O usa broadcast: <code>b'\\xff\\xff\\xff\\xff\\xff\\xff'</code> para enviar a todos sin especificar MAC.",
        highlightCat: "ESP-NOW", expandCat: "Comunicación Inalambrica",
        bloque: "peer", bloqueLabel: "Dirección MAC (peer)"
      },
      {
        titulo: "Arrastra: Enviar mensaje ESP-NOW",
        desc: "Arrastra el bloque <em>Enviar mensaje ESP-NOW</em>. Conecta el bloque <em>peer</em> en el espacio de destino.",
        highlightCat: "ESP-NOW", expandCat: "Comunicación Inalambrica",
        bloque: "espnow_send_peer", bloqueLabel: "Enviar mensaje ESP-NOW"
      },
      {
        titulo: "Arrastra: Dirección MAC del receptor (peer)",
        desc: "Arrastra el bloque <em>Dirección MAC (peer)</em>. En el campo escribe la MAC del receptor en formato <code>b'\\xAA\\xBB\\xCC\\xDD\\xEE\\xFF'</code>.<br><br>O usa broadcast: <code>b'\\xff\\xff\\xff\\xff\\xff\\xff'</code> para enviar a todos sin especificar MAC.",
        highlightCat: "ESP-NOW", expandCat: "Comunicación Inalambrica",
        bloque: "peer", bloqueLabel: "Dirección MAC (peer)"
      },
      {
        titulo: "Escribe el mensaje a enviar",
        desc: "Ve a <b>Textos</b> y arrastra un bloque de <em>texto</em>. Escribe el mensaje, por ejemplo <b>up</b> o <b>Hola desde ESP32 👋</b>. Conéctalo al espacio de texto del bloque de envío.",
        highlightCat: "Textos", expandCat: null,
        bloque: "text", bloqueLabel: "Texto (mensaje)"
      },
      {
        titulo: "Conecta tu ESP32 emisor y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona el puerto del emisor",
        desc: "El navegador mostrará los puertos disponibles. Elige el que corresponde al ESP32 emisor y presiona <b>Conectar</b>.",
        waitForAction: "connect"
      },
      {
        titulo: "¡Ejecuta el emisor y verifica!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Abre el monitor serial del <b>receptor</b>: verás el mensaje llegando. ¡Dos ESP32 comunicándose sin internet! 🎉<br><br><b>Tip:</b> Para envío continuo, envuelve el bloque <em>enviar</em> dentro de un ciclo <em>Repetir mientras Verdadero</em> con una espera de 1 segundo.",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  hc06_basico: {
    title: "Bluetooth HC-06 (Serial)", icon: "🔵",
    diagram: "img/conexiones/hc-06.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "El módulo <b>HC-06</b> permite que el ESP32 se comunique con un teléfono u otro dispositivo usando <b>Bluetooth clásico</b> como si fuera un puerto serial. Al terminar generaremos código como:<br><pre>hc06 = UART(2, tx=17, rx=16, baudrate=9600)\nwhile True:\n  if hc06.any():\n    print(hc06.read())</pre>",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física del HC-06",
        desc: "Conecta el módulo HC-06 al ESP32 así:<br>⚡ <b>VCC</b> → 3.3V<br>⏚ <b>GND</b> → GND<br>📌 <b>TX</b> (del HC-06) → pin <b>16</b> (RX del ESP32)<br>📌 <b>RX</b> (del HC-06) → pin <b>17</b> (TX del ESP32)<br><br>⚠️ Cruza TX y RX: el TX del módulo va al RX del ESP32 y viceversa.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Comunicación Inalambrica",
        desc: "Haz clic en <b>Comunicación Inalambrica</b> en el panel de bloques para desplegarlo.",
        highlightCat: "Comunicación Inalambrica", expandCat: null, bloque: null
      },
      {
        titulo: "Abre: HC-06",
        desc: "Dentro de <b>Comunicación Inalambrica</b>, selecciona la subcategoría <b>HC-06</b> para ver sus bloques de Bluetooth serial.",
        highlightCat: "HC-06", expandCat: "Comunicación Inalambrica", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar HC-06",
        desc: "Arrastra el bloque <em>Inicializar HC-06</em> al área de trabajo. Configura:<br>• <b>UART</b> → <b>2</b><br>• <b>TX</b> → pin <b>17</b><br>• <b>RX</b> → pin <b>16</b><br>• <b>Baudios</b> → <b>9600</b><br><br>Este bloque va al inicio, fuera de cualquier ciclo.",
        highlightCat: "HC-06", expandCat: "Comunicación Inalambrica",
        bloque: "init_hc06", bloqueLabel: "Inicializar HC-06"
      },
      {
        titulo: "Arrastra: Enviar texto por Bluetooth",
        desc: "Arrastra el bloque <em>Enviar texto HC-06</em> al área de trabajo. Conecta aquí el texto que quieres mandar al celular.",
        highlightCat: "HC-06", expandCat: "Comunicación Inalambrica",
        bloque: "hc06_send", bloqueLabel: "Enviar texto HC-06"
      },
      {
        titulo: "Escribe el texto a enviar",
        desc: "Ve a <b>Textos</b> y arrastra un bloque de <em>texto</em>. Escribe el mensaje que deseas enviar al celular, por ejemplo <b>Hola desde ESP32!</b>. Conéctalo al espacio del bloque de envío.",
        highlightCat: "Textos", expandCat: null,
        bloque: "text", bloqueLabel: "Texto (cadena)"
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>Repetir mientras Verdadero</em>. Dentro del ciclo revisaremos continuamente si hay datos llegando del celular.",
        highlightCat: "Ciclos", expandCat: null, bloque: "controls_whileUntil"
      },
      {
        titulo: "Condición: ¿hay datos disponibles?",
        desc: "Ve a <b>Lógica</b> y arrastra un bloque <em>Si … hacer</em> dentro del ciclo. En la condición usaremos el bloque <em>HC-06 tiene datos</em> para verificar si llegó algo del celular.",
        highlightCat: "Lógica", expandCat: null, bloque: "controls_if", bloqueLabel: "Si … hacer"
      },
      {
        titulo: "Conecta: HC-06 tiene datos (hc06.any)",
        desc: "Ve a <b>Comunicación Inalambrica</b> → <b>HC-06</b> y arrastra el bloque <em>HC-06 tiene datos</em>. Conéctalo como condición del bloque <em>Si</em>. Devuelve verdadero cuando hay bytes esperando en el buffer.",
        highlightCat: "HC-06", expandCat: "Comunicación Inalambrica",
        bloque: "hc06_any", bloqueLabel: "HC-06 tiene datos"
      },
      {
        titulo: "Dentro del Si: Imprimir lo recibido",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> dentro de la sección <b>hacer</b> del bloque Si.",
        highlightCat: "Textos", expandCat: null, bloque: "text_print", bloqueLabel: "imprimir"
      },
      {
        titulo: "Conecta: Leer datos del HC-06",
        desc: "Ve a <b>Comunicación Inalambrica</b> → <b>HC-06</b> y arrastra el bloque <em>Leer datos HC-06</em>. Conéctalo dentro del bloque <em>imprimir</em>.",
        highlightCat: "HC-06", expandCat: "Comunicación Inalambrica",
        bloque: "hc06_read", bloqueLabel: "Leer datos HC-06"
      },
      {
        titulo: "Agrega una pausa",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>esperar</em>. Ajusta a <b>1</b> segundo. Colócalo al final del ciclo, fuera del bloque Si.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Instala la app en tu celular",
        desc: "En tu celular Android descarga la app <b>Serial Bluetooth Terminal</b> (o similar). Activa el Bluetooth, busca el HC-06, emparéjalo (contraseña por defecto: <b>1234</b>) y conéctate desde la app.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Ejecuta y prueba",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Desde la app en tu celular verás el mensaje enviado por el ESP32. Escribe algo en la app y aparecerá en el monitor serial. ¡Comunicación Bluetooth lista! 📲",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  bluetooth_le: {
    title: "Bluetooth LE (BLE) — UART Serial", icon: "📡",
    diagram: "img/conexiones/ble.svg",
    steps: [
      {
        titulo: "¿Qué es Bluetooth LE?",
        desc: "<b>Bluetooth Low Energy (BLE)</b> permite comunicación inalámbrica de bajo consumo. Usaremos el patrón <b>BLEUART</b> que emula un puerto serial sobre BLE.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "¿Cómo funciona BLEUART?",
        desc: "El patrón BLEUART crea un servicio BLE que imita un puerto serial:<br>• El ESP32 anuncia su presencia (advertising)<br>• El celular se conecta con una app BLE<br>• Ambos pueden enviar y recibir texto<br><br>Compatible con iOS y Android. No requiere emparejar como el HC-06.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Comunicación Inalambrica",
        desc: "Haz clic en <b>Comunicación Inalambrica</b> en el panel de bloques para desplegarlo.",
        highlightCat: "Comunicación Inalambrica", expandCat: null, bloque: null
      },
      {
        titulo: "Abre: BluetoothBLE",
        desc: "Dentro de <b>Comunicación Inalambrica</b>, selecciona la subcategoría <b>BLE</b> para ver sus bloques.",
        highlightCat: "BluetoothBLE", expandCat: "Comunicación Inalambrica", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar BLE (bluetooth.BLE)",
        desc: "Arrastra el bloque <em>Inicializar BluetoothBLE</em> al área de trabajo. Crea la instancia del hardware BLE del ESP32. Va al inicio, antes de cualquier otro bloque BLE.",
        highlightCat: "BluetoothBLE", expandCat: "Comunicación Inalambrica",
        bloque: "ble_init_uart", bloqueLabel: "Inicializar BluetoothBLE"
      },
      {
        titulo: "Arrastra: Establecer nombre BLE (BLEUART)",
        desc: "Arrastra el bloque <em>Establecer nombre BLE</em>. Escribe el nombre con el que aparecerá en el celular, por ejemplo <b>ESP32-BLE</b>.",
        highlightCat: "BluetoothBLE", expandCat: "Comunicación Inalambrica",
        bloque: "ble_set_name", bloqueLabel: "Establecer nombre BLE"
      },
      {
        titulo: "Arrastra: Registrar callback (uart.irq)",
        desc: "Ve a <b>Comunicación Inalambrica</b> → <b>BluetoothBLE</b> y arrastra el bloque <em>Al recibir datos BLE</em>. En el campo <b>función</b> escribe <b>datos_recibidos</b> y en el campo <b>variable RX</b> escribe <b>rx_buffer</b>. Esto conecta tu función al evento de recepción y define la variable donde se guardarán los bytes.",
        highlightCat: "BluetoothBLE", expandCat: "Comunicación Inalambrica",
        bloque: "ble_on_receive", bloqueLabel: "Al recibir datos BLE"
      },
      {
        titulo: "Define la función de callback",
        desc: "Ve a <b>Funciones</b> y crea una función llamada <b>datos_recibidos</b>. Dentro de ella colocaremos los bloques para leer, decodificar e imprimir los datos recibidos.",
        highlightCat: "Funciones", expandCat: null, bloque: "procedures_defnoreturn", bloqueLabel: "definir función"
      },
      {
        titulo: "Dentro de la función: Guardar en rx_buffer",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>establecer rx_buffer a</em> dentro de la función. Esta variable guardará el texto decodificado de lo que llegue del celular.",
        highlightCat: "Variables", expandCat: null,
        bloque: "variables_set", bloqueLabel: "establecer rx_buffer a"
      },
      {
        titulo: "Dentro de la función: Decodificar los bytes recibidos",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>Decodificar bytes (text_decode)</em> para conectarlo al hueco de <em>establecer rx_buffer a</em>. Activa la opción <b>limpiar \\r\\n = VERDADERO</b> para eliminar espacios en blanco al inicio y al final.",
        highlightCat: "Textos", expandCat: null,
        bloque: "text_decode", bloqueLabel: "Decodificar bytes"
      },
      {
        titulo: "Dentro del decodificador: Leer datos BLE",
        desc: "Ve a <b>Comunicación Inalambrica</b> → <b>BLE</b> y arrastra el bloque <em>Leer datos BLE</em>. Conéctalo al hueco <b>bytes</b> del bloque <em>Decodificar bytes</em>. Este bloque obtiene los bytes crudos recibidos del celular.",
        highlightCat: "BluetoothBLE", expandCat: "Comunicación Inalambrica",
        bloque: "ble_read", bloqueLabel: "Leer datos BLE"
      },
      {
        titulo: "Dentro de la función: Imprimir rx_buffer",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> justo después del bloque <em>establecer rx_buffer a</em>. Luego conecta el bloque <em>obtener rx_buffer</em> desde <b>Variables</b> dentro del imprimir para ver en el monitor serial el mensaje recibido.",
        highlightCat: "Textos", expandCat: null, bloque: "text_print", bloqueLabel: "imprimir"
      },
      {
        titulo: "Conecta rx_buffer al imprimir",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>obtener rx_buffer</em>. Conéctalo dentro del bloque <em>imprimir</em>.",
        highlightCat: "Variables", expandCat: null,
        bloque: { tipo: "variables_get", valor: "rx_buffer" },
        bloqueLabel: "obtener rx_buffer"
      },
      {
        titulo: "Instala una app BLE en tu celular",
        desc: "Descarga la app <b>nRF Connect</b> (Android/iOS) o <b>Serial Bluetooth Terminal</b> con soporte BLE. Abre la app, busca el dispositivo <b>ESP32-BLE</b> y conéctate. Podrás enviar y recibir texto.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y conecta tu celular!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Abre la app BLE, busca <b>ESP32-BLE</b> y conéctate. Envía texto desde la app y aparecerá en el monitor serial del ESP32. ¡BLE funcionando! 🎉",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════
     DHT11 / DHT22 — Temperatura y Humedad
  ══════════════════════════════════════════════════════════════ */
  dht11: {
    title: "DHT11 — Temperatura y Humedad", icon: "🌡️",
    diagram: "img/conexiones/dht11.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "El sensor <b>DHT11</b> (o DHT22) mide <b>temperatura y humedad relativa</b> del ambiente con un solo pin de datos. Lo usaremos para leer ambos valores y mostrarlos en el monitor serial. Es uno de los sensores más utilizados en proyectos de clima y domótica.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Diferencia DHT11 vs DHT22",
        desc: "<b>DHT11</b>: temperatura 0–50°C (±2°C), humedad 20–80% (±5%). Económico y sencillo.<br><br><b>DHT22</b>: temperatura -40–80°C (±0.5°C), humedad 0–100% (±2–5%). Más preciso y rápido.<br><br>El código es el mismo para ambos; solo cambia el modelo en el bloque de inicialización.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física del DHT11",
        desc: "El módulo DHT11 (con 3 pines) se conecta así:<br>📌 <b>S</b> (datos) → pin <b>4</b><br>⚡ <b>V</b> (voltaje) → 3.3V<br>⏚ <b>G</b> (tierra) → GND<br><br>Si usas el sensor desnudo (4 pines), agrega una resistencia de <b>10 kΩ</b> entre el pin de datos y 3.3V (pull-up). El módulo ya la incluye internamente.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Selecciona la subcategoría DHT11 / DHT22",
        desc: "Dentro de <b>Sensores → Sensores Digitales</b>, haz clic en <b>DHT11 / DHT22</b> para ver los bloques del sensor de temperatura y humedad.",
        highlightCat: "DHT11 / DHT22", expandCat: "Sensores", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar DHT",
        desc: "Arrastra el bloque <em>Preparar sensor DHT</em> al área de trabajo. Selecciona el modelo <b>DHT11</b> (o DHT22 si tienes ese) y el pin <b>4</b>. Este bloque va <b>una sola vez</b> al inicio del programa.",
        highlightCat: "DHT11 / DHT22", expandCat: "Sensores",
        bloque: "dht_init", bloqueLabel: "Preparar sensor DHT"
      },
      {
        titulo: "Crea las variables: temp y hum",
        desc: "Ve a <b>Variables</b> y crea dos variables: <b>temp</b> (temperatura) y <b>hum</b> (humedad). Las usaremos para guardar las lecturas del sensor.",
        highlightCat: "Variables", highlightFlyoutButton: "create_variable", variable: ["temp", "hum"], bloque: null
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. El sensor leerá continuamente temperatura y humedad dentro de este ciclo.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: medir el sensor",
        desc: "Ve a <b>Sensores → Sensores Digitales → DHT11 / DHT22</b> y arrastra el bloque <em>Medir DHT</em> como <b>primer bloque dentro del ciclo</b>. Este comando dispara la lectura; sin él los valores de temperatura y humedad no se actualizan.",
        highlightCat: "DHT11 / DHT22", expandCat: "Sensores",
        bloque: "dht_measure", bloqueLabel: "Medir DHT"
      },
      {
        titulo: "Guardar temperatura",
        desc: "Ve a <b>Variables</b> y arrastra <em>establecer temp a</em> justo después del bloque <em>Medir DHT</em>. Luego ve a <b>Sensores → DHT11 / DHT22</b> y conecta el bloque <em>Leer temperatura DHT</em> (pin <b>4</b>) al espacio vacío.",
        highlightCat: "Variables",
        bloque: "variables_set", bloqueLabel: "establecer temp a"
      },
      {
        titulo: "Guardar humedad",
        desc: "Arrastra otro bloque <em>establecer hum a</em> debajo. Conecta el bloque <em>Leer humedad DHT</em> (pin <b>4</b>) desde <b>Sensores → DHT11 / DHT22</b>.",
        highlightCat: "DHT11 / DHT22", expandCat: "Sensores",
        bloque: "dht_humidity", bloqueLabel: "Leer humedad DHT"
      },
      {
        titulo: "Imprimir la temperatura",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em>. Usa un bloque <em>crear texto con</em> para unir el texto <b>'Temperatura: '</b> con la variable <b>temp</b> y agregar <b>' °C'</b> al final.",
        highlightCat: "Textos",
        bloque: "text_print", bloqueLabel: "imprimir"
      },
      {
        titulo: "Imprimir la humedad",
        desc: "Arrastra otro bloque <em>imprimir</em> debajo. Une el texto <b>'Humedad: '</b> con la variable <b>hum</b> y agrega <b>' %'</b> al final. Así verás ambos valores claramente en el monitor serial.",
        highlightCat: "Textos",
        bloque: "text_print", bloqueLabel: "imprimir"
      },
      {
        titulo: "Agrega una pausa de 2 segundos",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> al final del ciclo. Ajusta el valor a <b>2</b> segundos. El DHT11 necesita al menos 1 segundo entre lecturas; con 2 s tenemos margen.",
        highlightCat: "Tiempo",
        bloque: "time_sleep", bloqueLabel: "esperar 2 s"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y observa!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. En el monitor serial verás la temperatura en °C y la humedad en % actualizándose cada 2 segundos. Sopla sobre el sensor para ver cómo cambia la humedad. 🌬️",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════
     KY-001 — Sensor de Temperatura DS18B20 (OneWire)
  ══════════════════════════════════════════════════════════════ */
  ky001: {
    title: "KY-001 — Sensor DS18B20 (OneWire)", icon: "🌡️",
    diagram: "img/conexiones/ky-001.svg",
    steps: [
      {
        titulo: "¿Qué es el KY-001?",
        desc: "El módulo <b>KY-001</b> usa el sensor de temperatura <b>DS18B20</b>. A diferencia del DHT11, este sensor usa el protocolo <b>OneWire</b>: comunica temperatura con alta precisión (±0.5°C) por un solo cable, y puedes conectar <b>varios sensores al mismo pin</b> al mismo tiempo, cada uno con su propio identificador.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Características del DS18B20",
        desc: "• Rango: <b>-55°C a +125°C</b> con precisión de ±0.5°C<br>• Protocolo <b>OneWire</b>: un solo pin de datos<br>• Puedes encadenar <b>múltiples sensores</b> en el mismo pin<br>• Ideal para medición de temperatura en líquidos (versión impermeable)<br>• Alimentación: <b>3.3V</b>",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física del KY-001",
        desc: "El módulo KY-001 tiene 3 pines:<br>📌 <b>S</b> (datos OneWire) → pin <b>4</b><br>⚡ <b>V</b> (voltaje) → <b>3.3V</b><br>⏚ <b>G</b> (tierra) → GND<br><br>⚠️ Conecta siempre a <b>3.3V</b>, nunca a 5V — el ESP32 no tolera 5V en sus pines y puedes dañarlo.<br><br>El módulo ya incluye la resistencia pull-up de 4.7 kΩ. Si usas el sensor DS18B20 desnudo, agrega esa resistencia entre el pin de datos y 3.3V.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Selecciona la subcategoría DS18B20 (KY-001)",
        desc: "Dentro de <b>Sensores → Sensores Digitales</b>, haz clic en <b>DS18B20 (KY-001)</b> para ver los bloques del sensor de temperatura DS18B20.",
        highlightCat: "DS18B20 (KY-001)", expandCats: ["Sensores", "Sensores Digitales"], bloque: null
      },
      {
        titulo: "Arrastra: Inicializar KY-001",
        desc: "Arrastra el bloque <em>Preparar sensor KY-001 (DS18B20)</em> al área de trabajo. Asigna el pin <b>4</b>. Este bloque configura el bus OneWire y va <b>una sola vez</b> al inicio.",
        highlightCat: "DS18B20 (KY-001)", expandCats: ["Sensores", "Sensores Digitales"],
        bloque: "ky001_init", bloqueLabel: "Preparar sensor KY-001"
      },
      {
        titulo: "Crea la variable: roms",
        desc: "Ve a <b>Variables</b> y haz clic en <b>Crear variable</b>. Escribe el nombre <b>roms</b> y confirma. Esta variable guardará la lista de sensores detectados en el bus OneWire.",
        highlightCat: "Variables", highlightFlyoutButton: "create_variable", variable: "roms", bloque: null
      },
      {
        titulo: "Escanear sensores en el bus",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>establecer roms a</em>. Luego ve a <b>Sensores → Sensores Digitales → DS18B20 (KY-001)</b> y arrastra el bloque <em>Escanear sensores DS18B20</em> (pin <b>4</b>). Conéctalo al espacio vacío.",
        highlightCat: "DS18B20 (KY-001)", expandCats: ["Sensores", "Sensores Digitales"],
        bloque: "ky001_scan", bloqueLabel: "Escanear sensores DS18B20"
      },
      {
        titulo: "Crea la variable: temperatura",
        desc: "Ve a <b>Variables</b> y haz clic en <b>Crear variable</b>. Escribe el nombre <b>temperatura</b> y confirma. Guardará el valor leído del sensor en cada ciclo.",
        highlightCat: "Variables", highlightFlyoutButton: "create_variable", variable: "temperatura", bloque: null
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. Todo el proceso de lectura irá dentro de este ciclo.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: convertir temperatura",
        desc: "Ve a <b>Sensores → Sensores Digitales → DS18B20 (KY-001)</b> y arrastra el bloque <em>Convertir temperatura DS18B20</em> (pin <b>4</b>) como <b>primer bloque dentro del ciclo</b>. Este comando ordena al sensor que tome la medición; sin él la lectura siempre dará el mismo valor.",
        highlightCat: "DS18B20 (KY-001)", expandCats: ["Sensores", "Sensores Digitales"],
        bloque: "ky001_convert", bloqueLabel: "Convertir temperatura DS18B20"
      },
      {
        titulo: "Esperar la conversión",
        desc: "El DS18B20 tarda hasta 750 ms en medir. Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> con valor <b>1</b> segundo justo después del bloque anterior.",
        highlightCat: "Tiempo",
        bloque: "time_sleep", bloqueLabel: "esperar 1 s"
      },
      {
        titulo: "Guardar la temperatura en la variable",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>establecer temperatura a</em> dentro del ciclo, después de la espera.",
        highlightCat: "Variables",
        bloque: "variables_set", bloqueLabel: "establecer temperatura a"
      },
      {
        titulo: "Conecta: Leer temperatura DS18B20",
        desc: "Ve a <b>Sensores → Sensores Digitales → DS18B20 (KY-001)</b> y arrastra el bloque <em>Leer temperatura DS18B20</em> (pin <b>4</b>, índice <b>0</b> para el primer sensor). Conéctalo al espacio vacío del bloque <em>establecer temperatura a</em>.",
        highlightCat: "DS18B20 (KY-001)", expandCats: ["Sensores", "Sensores Digitales"],
        bloque: "ky001_read_index", bloqueLabel: "Leer temperatura DS18B20"
      },
      {
        titulo: "Imprime el resultado",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em>. Usa un bloque <em>crear texto con</em> para unir el texto <b>'Temperatura: '</b> con la variable <b>temperatura</b> y <b>' °C'</b> al final.",
        highlightCat: "Textos",
        bloque: "text_print", bloqueLabel: "imprimir"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. En el monitor serial verás la temperatura en °C actualizándose cada segundo. Toca el sensor con los dedos y observa cómo sube el valor. 🌡️",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  oled_display: {
    title: "Display OLED (SSD1306)", icon: "🖥️",
    diagram: "img/conexiones/oled.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a mostrar texto en una pantalla <b>OLED</b> (la típica de 0.96\", chip SSD1306, 128x64 píxeles). Aprenderás a inicializarla, limpiarla y escribir texto en una posición X, Y.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "La OLED se conecta por <b>I2C</b>, 4 pines:<br>⚡ <b>VCC</b> → <b>3.3V</b><br>⏚ <b>GND</b> → GND<br>📌 <b>SDA</b> → pin <b>21</b><br>📌 <b>SCL</b> → pin <b>22</b><br><br>⚠️ Conecta siempre a 3.3V, nunca a 5V.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre la categoría Pantallas",
        desc: "Haz clic en <b>Pantallas</b> en el panel de bloques para desplegarlo.",
        highlightCat: "Pantallas", expandCat: null, bloque: null
      },
      {
        titulo: "Selecciona la subcategoría OLED",
        desc: "Dentro de <b>Pantallas</b> haz clic en <b>OLED</b> para ver sus bloques.",
        highlightCat: "OLED", expandCat: "Pantallas", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar OLED",
        desc: "Arrastra el bloque <em>Inicializar OLED</em> al área de trabajo. Deja los pines por defecto (SDA <b>21</b>, SCL <b>22</b>, dirección <b>0x27</b>). Este bloque va <b>una sola vez</b> al inicio del programa.",
        highlightCat: "OLED", expandCat: "Pantallas",
        bloque: "oled_init", bloqueLabel: "Inicializar OLED"
      },
      {
        titulo: "Arrastra: Limpiar pantalla",
        desc: "Arrastra el bloque <em>limpiar</em> justo debajo. Borra cualquier contenido anterior antes de dibujar algo nuevo.",
        highlightCat: "OLED", expandCat: "Pantallas",
        bloque: "oled_clear", bloqueLabel: "limpiar"
      },
      {
        titulo: "Arrastra: Escribir texto",
        desc: "Arrastra el bloque <em>texto x y</em> debajo de <em>limpiar</em>. Escribe <b>'Hola ESP32'</b> como texto, y deja <b>x=0, y=0</b> (esquina superior izquierda).",
        highlightCat: "OLED", expandCat: "Pantallas",
        bloque: "oled_text", bloqueLabel: "texto x y"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Deberías ver <b>'Hola ESP32'</b> escrito en la esquina superior izquierda de la pantalla OLED. 🖥️",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  lcd_i2c_display: {
    title: "LCD 16x2 I2C", icon: "📟",
    diagram: "img/conexiones/lcd_i2c.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a mostrar texto en una pantalla <b>LCD 16x2</b> con módulo adaptador <b>I2C</b> (el que solo tiene 4 pines en vez de 16). Aprenderás a inicializarla y escribir texto.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El LCD I2C se conecta con solo 4 pines:<br>⚡ <b>VCC</b> → <b>5V</b> (algunos módulos funcionan con 3.3V, revisa el tuyo)<br>⏚ <b>GND</b> → GND<br>📌 <b>SDA</b> → pin <b>21</b><br>📌 <b>SCL</b> → pin <b>22</b>",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre la categoría Pantallas",
        desc: "Haz clic en <b>Pantallas</b> en el panel de bloques para desplegarlo.",
        highlightCat: "Pantallas", expandCat: null, bloque: null
      },
      {
        titulo: "Selecciona la subcategoría LCD I2C",
        desc: "Dentro de <b>Pantallas</b> haz clic en <b>LCD I2C</b> para ver sus bloques.",
        highlightCat: "LCD I2C", expandCat: "Pantallas", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar LCD I2C",
        desc: "Arrastra el bloque <em>Inicializar LCD I2C</em> al área de trabajo. Deja los pines por defecto (SDA <b>21</b>, SCL <b>22</b>, dirección <b>0x3f</b> — si no funciona, prueba con <b>0x27</b>, es la otra dirección común). Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "LCD I2C", expandCat: "Pantallas",
        bloque: "lcd_i2c_init", bloqueLabel: "Inicializar LCD I2C"
      },
      {
        titulo: "Arrastra: Limpiar pantalla",
        desc: "Arrastra el bloque <em>limpiar pantalla</em> justo debajo del bloque de inicializar.",
        highlightCat: "LCD I2C", expandCat: "Pantallas",
        bloque: "lcd_i2c_clear", bloqueLabel: "limpiar pantalla"
      },
      {
        titulo: "Arrastra: Escribir texto",
        desc: "Arrastra el bloque <em>escribir</em> debajo. Conecta un bloque de texto con <b>'Hola ESP32'</b>.",
        highlightCat: "LCD I2C", expandCat: "Pantallas",
        bloque: "lcd_i2c_print", bloqueLabel: "escribir"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Deberías ver <b>'Hola ESP32'</b> escrito en la primera línea del LCD. Si no se ve nada, gira el potenciómetro azul de contraste que trae el módulo I2C. 📟",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  rtc_ds3231: {
    title: "Reloj RTC DS3231", icon: "🕒",
    diagram: "img/conexiones/rtc_ds3231.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a usar un módulo <b>RTC DS3231</b> (reloj de tiempo real) para guardar y leer la hora, incluso cuando el ESP32 se apaga (tiene su propia pila de respaldo). Aprenderás a inicializarlo, ponerle una hora y leerla de vuelta.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El DS3231 se conecta por <b>I2C</b>:<br>⚡ <b>VCC</b> → <b>3.3V</b><br>⏚ <b>GND</b> → GND<br>📌 <b>SDA</b> → pin <b>21</b><br>📌 <b>SCL</b> → pin <b>22</b><br><br>⚠️ Conecta siempre a 3.3V, nunca a 5V.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Periféricos › Modulos I2C",
        desc: "Haz clic en <b>Periféricos</b> y luego en <b>Modulos I2C</b> para desplegarlos.",
        highlightCat: "Modulos I2C", expandCat: "Periféricos", bloque: null
      },
      {
        titulo: "Selecciona la subcategoría RTC DS3231",
        desc: "Dentro de <b>Modulos I2C</b> haz clic en <b>RTC DS3231</b> para ver sus bloques.",
        highlightCat: "RTC DS3231", expandCats: ["Periféricos", "Modulos I2C"], bloque: null
      },
      {
        titulo: "Arrastra: Inicializar RTC DS3231",
        desc: "Arrastra el bloque <em>Inicializar RTC DS3231</em> al área de trabajo. Deja los pines por defecto (SDA <b>21</b>, SCL <b>22</b>). Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "RTC DS3231", expandCats: ["Periféricos", "Modulos I2C"],
        bloque: "rtc_ds3231_init", bloqueLabel: "Inicializar RTC DS3231"
      },
      {
        titulo: "Arrastra: Establecer fecha y hora",
        desc: "Arrastra el bloque <em>establecer año/mes/día/hora/minuto/segundo</em> justo debajo del inicializar. Rellena los números con la fecha y hora actuales (esto solo hace falta la <b>primera vez</b> que programas el módulo — la pila mantiene la hora después). El campo <b>weekday</b> es el día de la semana, del 1 (lunes) al 7 (domingo).",
        highlightCat: "RTC DS3231", expandCats: ["Periféricos", "Modulos I2C"],
        bloque: "rtc_ds3231_set_time", bloqueLabel: "establecer fecha y hora"
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. Leeremos la hora continuamente dentro de este ciclo.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: leer la hora",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> dentro del ciclo. Luego ve a <b>Periféricos → Modulos I2C → RTC DS3231</b> y arrastra el bloque con el <b>selector</b> (hora / minuto / segundo) dentro del <em>imprimir</em> — elige <b>hora</b>.",
        highlightCat: "RTC DS3231", expandCats: ["Periféricos", "Modulos I2C"],
        bloque: "rtc_ds3231_select", bloqueLabel: "hora / minuto / segundo"
      },
      {
        titulo: "Esperar 1 segundo",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> con <b>1</b> segundo, como último bloque dentro del ciclo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. En el monitor serial verás la hora actualizándose cada segundo. 🕒",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  mpu6050_imu: {
    title: "Giroscopio/Acelerómetro MPU6050", icon: "🎮",
    diagram: "img/conexiones/mpu6050.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a leer un <b>MPU6050</b> (acelerómetro + giroscopio de 6 ejes), muy usado en robots, drones y proyectos de movimiento. Aprenderás a inicializarlo y leer aceleración y giro en cada eje.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El MPU6050 se conecta por <b>I2C</b>:<br>⚡ <b>VCC</b> → <b>3.3V</b><br>⏚ <b>GND</b> → GND<br>📌 <b>SDA</b> → pin <b>21</b><br>📌 <b>SCL</b> → pin <b>22</b><br><br>⚠️ Conecta siempre a 3.3V, nunca a 5V.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Periféricos › Modulos I2C",
        desc: "Haz clic en <b>Periféricos</b> y luego en <b>Modulos I2C</b> para desplegarlos.",
        highlightCat: "Modulos I2C", expandCat: "Periféricos", bloque: null
      },
      {
        titulo: "Selecciona la subcategoría MPU6050 IMU",
        desc: "Dentro de <b>Modulos I2C</b> haz clic en <b>MPU6050 IMU</b> para ver sus bloques.",
        highlightCat: "MPU6050 IMU", expandCats: ["Periféricos", "Modulos I2C"], bloque: null
      },
      {
        titulo: "Arrastra: Inicializar MPU6050",
        desc: "Arrastra el bloque <em>Inicializar MPU6050</em> al área de trabajo. Deja los pines por defecto (SDA <b>21</b>, SCL <b>22</b>). Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "MPU6050 IMU", expandCats: ["Periféricos", "Modulos I2C"],
        bloque: "mpu6050_init", bloqueLabel: "Inicializar MPU6050"
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. Leeremos los sensores continuamente dentro de este ciclo.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: leer aceleración",
        desc: "Ve a <b>Textos</b> y arrastra un bloque <em>imprimir</em> dentro del ciclo. Luego ve a <b>Periféricos → Modulos I2C → MPU6050 IMU</b> y arrastra el bloque <em>aceleración [selector]</em> dentro del <em>imprimir</em> — elige el eje <b>X</b>.",
        highlightCat: "MPU6050 IMU", expandCats: ["Periféricos", "Modulos I2C"],
        bloque: "mpu6050_select_accel", bloqueLabel: "aceleración X/Y/Z"
      },
      {
        titulo: "Dentro del ciclo: leer giro",
        desc: "Arrastra otro bloque <em>imprimir</em> debajo. Luego ve a <b>Periféricos → Modulos I2C → MPU6050 IMU</b> y arrastra el bloque <em>giro [selector]</em> — elige el eje <b>Z</b> (útil para saber cuánto ha girado el robot).",
        highlightCat: "MPU6050 IMU", expandCats: ["Periféricos", "Modulos I2C"],
        bloque: "mpu6050_select_gyro", bloqueLabel: "giro X/Y/Z"
      },
      {
        titulo: "Esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> con <b>0.2</b> segundos, como último bloque dentro del ciclo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Mueve y gira el MPU6050 con la mano y observa cómo cambian los valores en el monitor serial. 🎮",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  tm1637_display: {
    title: "Display TM1637 (4 dígitos)", icon: "🔢",
    diagram: "img/conexiones/tm1637.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a mostrar números en un display <b>TM1637</b> de 4 dígitos (el típico rojo de reloj). Aprenderás a inicializarlo, ajustar el brillo y mostrar un valor.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El TM1637 tiene 4 pines:<br>⚡ <b>VCC</b> → <b>5V</b> (o 3.3V, revisa tu módulo)<br>⏚ <b>GND</b> → GND<br>📌 <b>CLK</b> → pin <b>21</b><br>📌 <b>DIO</b> → pin <b>22</b>",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre la categoría Pantallas",
        desc: "Haz clic en <b>Pantallas</b> en el panel de bloques para desplegarlo.",
        highlightCat: "Pantallas", expandCat: null, bloque: null
      },
      {
        titulo: "Selecciona la subcategoría TM1637",
        desc: "Dentro de <b>Pantallas</b> haz clic en <b>TM1637</b> para ver sus bloques.",
        highlightCat: "TM1637", expandCat: "Pantallas", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar TM1637",
        desc: "Arrastra el bloque <em>iniciar CLK DIO brillo</em> al área de trabajo. Deja los pines por defecto (CLK <b>21</b>, DIO <b>22</b>) y el brillo en <b>7</b> (máximo). Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "TM1637", expandCat: "Pantallas",
        bloque: "tm1637_init", bloqueLabel: "iniciar CLK DIO brillo"
      },
      {
        titulo: "Arrastra: Mostrar valor",
        desc: "Arrastra el bloque <em>mostrar valor</em> debajo. Conecta un bloque numérico con, por ejemplo, <b>1234</b>.",
        highlightCat: "TM1637", expandCat: "Pantallas",
        bloque: "tm1637_number", bloqueLabel: "mostrar valor"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Deberías ver <b>1234</b> en el display. Prueba luego el bloque <em>brillo</em> con distintos valores para ver cómo cambia la intensidad. 🔢",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  matrix8_display: {
    title: "Matriz LED 8x8 (MAX7219)", icon: "🟥",
    diagram: "img/conexiones/matrix8.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a mostrar texto en una <b>matriz de LEDs 8x8</b> controlada por un chip <b>MAX7219</b>. Aprenderás a inicializarla y mostrar texto.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El módulo MAX7219 se conecta por SPI, 5 pines:<br>⚡ <b>VCC</b> → <b>5V</b><br>⏚ <b>GND</b> → GND<br>📌 <b>DIN</b> → pin <b>13</b><br>📌 <b>CS</b> → pin <b>5</b><br>📌 <b>CLK</b> → pin <b>18</b>",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre la categoría Pantallas",
        desc: "Haz clic en <b>Pantallas</b> en el panel de bloques para desplegarlo.",
        highlightCat: "Pantallas", expandCat: null, bloque: null
      },
      {
        titulo: "Selecciona la subcategoría Matrix 8x8",
        desc: "Dentro de <b>Pantallas</b> haz clic en <b>Matrix 8x8</b> para ver sus bloques.",
        highlightCat: "Matrix 8x8", expandCat: "Pantallas", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar Matrix 8x8",
        desc: "Arrastra el bloque <em>Inicializar</em> al área de trabajo. Deja los pines por defecto (DIN <b>13</b>, CS <b>5</b>, CLK <b>18</b>). Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "Matrix 8x8", expandCat: "Pantallas",
        bloque: "matrix8_init", bloqueLabel: "Inicializar Matrix 8x8"
      },
      {
        titulo: "Arrastra: Limpiar",
        desc: "Arrastra el bloque <em>limpiar matrix</em> justo debajo del inicializar.",
        highlightCat: "Matrix 8x8", expandCat: "Pantallas",
        bloque: "matrix8_clear", bloqueLabel: "limpiar matrix"
      },
      {
        titulo: "Arrastra: Escribir texto",
        desc: "Arrastra el bloque <em>texto</em> debajo. Conecta un bloque de texto con, por ejemplo, <b>'Hola'</b>.",
        highlightCat: "Matrix 8x8", expandCat: "Pantallas",
        bloque: "matrix8_text", bloqueLabel: "texto"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Deberías ver el texto en la matriz de LEDs. Prueba después el bloque <em>scroll texto</em> para que el texto se desplace. 🟥",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  gps_modulo: {
    title: "Módulo GPS", icon: "🛰️",
    diagram: "img/conexiones/gps.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a leer la posición (latitud/longitud) de un módulo <b>GPS</b> (tipo NEO-6M). Ten en cuenta que el GPS necesita <b>vista al cielo abierto</b> — dentro de un edificio puede tardar varios minutos (o nunca) en obtener señal.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El GPS se conecta por <b>UART</b> (serial):<br>⚡ <b>VCC</b> → <b>3.3V</b> o <b>5V</b> (revisa tu módulo)<br>⏚ <b>GND</b> → GND<br>📌 <b>TX</b> del GPS → pin <b>16</b> (RX del ESP32)<br>📌 <b>RX</b> del GPS → pin <b>17</b> (TX del ESP32)",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Periféricos › Modulos UART",
        desc: "Haz clic en <b>Periféricos</b> y luego en <b>Modulos UART</b> para desplegarlos.",
        highlightCat: "Modulos UART", expandCat: "Periféricos", bloque: null
      },
      {
        titulo: "Selecciona la subcategoría GPS",
        desc: "Dentro de <b>Modulos UART</b> haz clic en <b>GPS</b> para ver sus bloques.",
        highlightCat: "GPS", expandCats: ["Periféricos", "Modulos UART"], bloque: null
      },
      {
        titulo: "Arrastra: Inicializar GPS",
        desc: "Arrastra el bloque <em>Inicializar GPS</em> al área de trabajo. Deja los pines por defecto (TX <b>17</b>, RX <b>16</b>, baudios <b>9600</b>). Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "GPS", expandCats: ["Periféricos", "Modulos UART"],
        bloque: "gps_init", bloqueLabel: "Inicializar GPS"
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. El GPS necesita leerse continuamente para actualizar su posición.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: actualizar el GPS",
        desc: "Ve a <b>Periféricos → Modulos UART → GPS</b> y arrastra el bloque <em>actualizar</em> como <b>primer bloque dentro del ciclo</b>. Este comando procesa los datos que va enviando el módulo.",
        highlightCat: "GPS", expandCats: ["Periféricos", "Modulos UART"],
        bloque: "gps_update", bloqueLabel: "actualizar"
      },
      {
        titulo: "Imprimir la posición",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> dentro del ciclo. Luego ve a <b>Periféricos → Modulos UART → GPS</b> y arrastra el bloque con el <b>selector</b> (latitud / longitud / hora) dentro del <em>imprimir</em> — elige <b>latitud</b>.",
        highlightCat: "GPS", expandCats: ["Periféricos", "Modulos UART"],
        bloque: "gps_select", bloqueLabel: "latitud / longitud / hora"
      },
      {
        titulo: "Esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> con <b>1</b> segundo, como último bloque dentro del ciclo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Lleva el ESP32 a un lugar con vista al cielo abierto y espera — al principio puede imprimir <b>0</b> hasta que el GPS obtenga señal. 🛰️",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  encoder_rotatorio: {
    title: "Encoder Rotatorio (KY-040)", icon: "🎛️",
    diagram: "img/conexiones/encoder_ky040.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a leer un <b>encoder rotatorio</b> (la perilla que gira sin límite, tipo KY-040). Aprenderás a inicializarlo y leer su valor, que sube o baja según el sentido de giro.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El KY-040 tiene 5 pines (usaremos 4):<br>⚡ <b>+</b> → <b>3.3V</b><br>⏚ <b>GND</b> → GND<br>📌 <b>CLK</b> → pin <b>18</b><br>📌 <b>DT</b> → pin <b>19</b><br><br>(El pin <b>SW</b> es el botón que trae al presionar la perilla — no lo usamos en este tutorial).",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre la categoría Periféricos",
        desc: "Haz clic en <b>Periféricos</b> en el panel de bloques para desplegarlo.",
        highlightCat: "Periféricos", expandCat: null, bloque: null
      },
      {
        titulo: "Selecciona la subcategoría Encoder Rotatorio",
        desc: "Dentro de <b>Periféricos</b> haz clic en <b>Encoder Rotatorio</b> para ver sus bloques.",
        highlightCat: "Encoder Rotatorio", expandCat: "Periféricos", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar encoder",
        desc: "Arrastra el bloque <em>Inicializar</em> al área de trabajo. Deja los pines por defecto (CLK <b>18</b>, DT <b>19</b>). Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "Encoder Rotatorio", expandCat: "Periféricos",
        bloque: "encoder_rotary_init", bloqueLabel: "Inicializar encoder"
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. Leeremos el valor del encoder continuamente.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: imprimir el valor",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> dentro del ciclo. Luego ve a <b>Periféricos → Encoder Rotatorio</b> y arrastra el bloque <em>valor</em> dentro del <em>imprimir</em>.",
        highlightCat: "Encoder Rotatorio", expandCat: "Periféricos",
        bloque: "encoder_rotary_value", bloqueLabel: "valor"
      },
      {
        titulo: "Esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> con <b>0.2</b> segundos, como último bloque dentro del ciclo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Gira la perilla en ambos sentidos y observa cómo el número sube o baja en el monitor serial. 🎛️",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  rfid_mfrc522: {
    title: "RFID MFRC522", icon: "💳",
    diagram: "img/conexiones/rfid_mfrc522.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a detectar tarjetas/llaveros <b>RFID</b> con el lector <b>MFRC522</b>. Aprenderás a inicializarlo, detectar cuándo hay una tarjeta cerca y leer su identificador único (UID).",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El MFRC522 se conecta por <b>SPI</b>:<br>⚡ <b>3.3V</b> → <b>3.3V</b><br>⏚ <b>GND</b> → GND<br>📌 <b>SCK</b> → pin <b>18</b><br>📌 <b>MOSI</b> → pin <b>23</b><br>📌 <b>MISO</b> → pin <b>19</b><br>📌 <b>RST</b> → pin <b>22</b><br>📌 <b>SDA (SS)</b> → pin <b>21</b><br><br>⚠️ Conecta siempre a 3.3V, nunca a 5V — este módulo no tolera 5V.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Periféricos › Modulos SPI",
        desc: "Haz clic en <b>Periféricos</b> y luego en <b>Modulos SPI</b> para desplegarlos.",
        highlightCat: "Modulos SPI", expandCat: "Periféricos", bloque: null
      },
      {
        titulo: "Selecciona la subcategoría RFID MFRC522",
        desc: "Dentro de <b>Modulos SPI</b> haz clic en <b>RFID MFRC522</b> para ver sus bloques.",
        highlightCat: "RFID MFRC522", expandCats: ["Periféricos", "Modulos SPI"], bloque: null
      },
      {
        titulo: "Arrastra: Inicializar RFID",
        desc: "Arrastra el bloque <em>Inicializar</em> al área de trabajo. Deja los pines por defecto. Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "RFID MFRC522", expandCats: ["Periféricos", "Modulos SPI"],
        bloque: "rfid_mfrc522_init", bloqueLabel: "Inicializar RFID"
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. Revisaremos continuamente si hay una tarjeta cerca.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: si hay tarjeta",
        desc: "Ve a <b>Lógica</b> y arrastra un bloque <em>si … entonces</em> dentro del ciclo. Luego ve a <b>Periféricos → Modulos SPI → RFID MFRC522</b> y conecta el bloque <em>tarjeta presente</em> en la condición.",
        highlightCat: "RFID MFRC522", expandCats: ["Periféricos", "Modulos SPI"],
        bloque: "rfid_mfrc522_detect", bloqueLabel: "tarjeta presente"
      },
      {
        titulo: "Dentro del sí: leer el UID e imprimir",
        desc: "Ve a <b>Periféricos → Modulos SPI → RFID MFRC522</b> y arrastra el bloque <em>obtener UID</em> dentro del <b>sí</b>. Luego ve a <b>Textos</b> y arrastra un bloque <em>imprimir</em> debajo, conectando la variable <b>UID</b> que se creó automáticamente.",
        highlightCat: "RFID MFRC522", expandCats: ["Periféricos", "Modulos SPI"],
        bloque: "rfid_mfrc522_uid", bloqueLabel: "obtener UID"
      },
      {
        titulo: "Esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> con <b>0.5</b> segundos, como último bloque dentro del ciclo (fuera del <b>si</b>).",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Acerca una tarjeta o llavero RFID al lector — debería imprimir su UID en el monitor serial. 💳",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  teclado_matricial: {
    title: "Teclado Matricial 4x4", icon: "🔢",
    diagram: "img/conexiones/teclado_matricial.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a leer un <b>teclado matricial 4x4</b> (membrana con números 0-9, letras A-D, * y #). Aprenderás a inicializarlo y detectar qué tecla se presiona.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El teclado 4x4 tiene 8 pines (4 filas + 4 columnas), sin alimentación:<br>📌 <b>R1, R2, R3, R4</b> (filas) → 4 pines digitales cualquiera<br>📌 <b>C1, C2, C3, C4</b> (columnas) → otros 4 pines digitales<br><br>No necesita VCC ni GND — el ESP32 detecta las teclas activando cada fila por turnos.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Periféricos › Teclados",
        desc: "Haz clic en <b>Periféricos</b> y luego en <b>Teclados</b> para desplegarlos.",
        highlightCat: "Teclados", expandCat: "Periféricos", bloque: null
      },
      {
        titulo: "Selecciona la subcategoría Teclados Matriciales 4x4",
        desc: "Dentro de <b>Teclados</b> haz clic en <b>Teclados Matriciales 4x4</b> para ver sus bloques.",
        highlightCat: "Teclados Matriciales 4x4", expandCats: ["Periféricos", "Teclados"], bloque: null
      },
      {
        titulo: "Arrastra: Inicializar teclado",
        desc: "Arrastra el bloque <em>Inicializar</em> al área de trabajo y asigna los 8 pines (R1-R4, C1-C4) según tu conexión. Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "Teclados Matriciales 4x4", expandCats: ["Periféricos", "Teclados"],
        bloque: "init_keypad_4x4", bloqueLabel: "Inicializar teclado 4x4"
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. Revisaremos continuamente qué tecla se presiona.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: imprimir la tecla",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> dentro del ciclo. Luego ve a <b>Periféricos → Teclados → Teclados Matriciales 4x4</b> y arrastra el bloque <em>leer</em> dentro del <em>imprimir</em>.",
        highlightCat: "Teclados Matriciales 4x4", expandCats: ["Periféricos", "Teclados"],
        bloque: "keypad_get_key", bloqueLabel: "leer"
      },
      {
        titulo: "Esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> con <b>0.2</b> segundos, como último bloque dentro del ciclo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Presiona teclas en el teclado y observa cómo aparecen en el monitor serial. Si no presionas nada, imprimirá vacío. 🔢",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  bmp280_presion: {
    title: "Sensor de Presión BMP280", icon: "🌤️",
    diagram: "img/conexiones/bmp280.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a leer un sensor <b>BMP280</b> (presión atmosférica, temperatura y altitud estimada). Útil para estaciones meteorológicas o drones.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El BMP280 se conecta por <b>I2C</b>:<br>⚡ <b>VCC</b> → <b>3.3V</b><br>⏚ <b>GND</b> → GND<br>📌 <b>SDA</b> → pin <b>21</b><br>📌 <b>SCL</b> → pin <b>22</b><br><br>⚠️ Conecta siempre a 3.3V, nunca a 5V.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Periféricos › Modulos I2C",
        desc: "Haz clic en <b>Periféricos</b> y luego en <b>Modulos I2C</b> para desplegarlos.",
        highlightCat: "Modulos I2C", expandCat: "Periféricos", bloque: null
      },
      {
        titulo: "Selecciona la subcategoría Sensores Presion",
        desc: "Dentro de <b>Modulos I2C</b> haz clic en <b>Sensores Presion</b> para ver sus bloques.",
        highlightCat: "Sensores Presion", expandCats: ["Periféricos", "Modulos I2C"], bloque: null
      },
      {
        titulo: "Arrastra: Inicializar BMP280",
        desc: "Arrastra el bloque <em>Inicializar</em> al área de trabajo. Elige el modelo <b>BMP280</b> y deja los pines por defecto (SDA <b>21</b>, SCL <b>22</b>, dirección <b>0x76</b>). Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "Sensores Presion", expandCats: ["Periféricos", "Modulos I2C"],
        bloque: "bmp_sensor_init", bloqueLabel: "Inicializar BMP280"
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. Leeremos el sensor continuamente.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: leer presión y temperatura",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> dentro del ciclo. Luego ve a <b>Periféricos → Modulos I2C → Sensores Presion</b> y arrastra el bloque con el <b>selector</b> (temperatura / presión / altitud) dentro del <em>imprimir</em> — elige <b>presión</b>.",
        highlightCat: "Sensores Presion", expandCats: ["Periféricos", "Modulos I2C"],
        bloque: "bmp_select", bloqueLabel: "temperatura / presión / altitud"
      },
      {
        titulo: "Esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> con <b>1</b> segundo, como último bloque dentro del ciclo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Verás la presión en Pascales actualizándose cada segundo. Sopla suavemente cerca del sensor y observa el cambio. 🌤️",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  bh1750_luz: {
    title: "Sensor de Luz BH1750", icon: "💡",
    diagram: "img/conexiones/bh1750.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a medir la intensidad de luz ambiental (en lux) con un sensor <b>BH1750</b>. Útil para proyectos de luces automáticas o estaciones meteorológicas.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El BH1750 se conecta por <b>I2C</b>:<br>⚡ <b>VCC</b> → <b>3.3V</b><br>⏚ <b>GND</b> → GND<br>📌 <b>SDA</b> → pin <b>21</b><br>📌 <b>SCL</b> → pin <b>22</b><br><br>⚠️ Conecta siempre a 3.3V, nunca a 5V.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Periféricos › Modulos I2C",
        desc: "Haz clic en <b>Periféricos</b> y luego en <b>Modulos I2C</b> para desplegarlos.",
        highlightCat: "Modulos I2C", expandCat: "Periféricos", bloque: null
      },
      {
        titulo: "Selecciona la subcategoría Sensor Luz BH1750",
        desc: "Dentro de <b>Modulos I2C</b> haz clic en <b>Sensor Luz BH1750</b> para ver sus bloques.",
        highlightCat: "Sensor Luz BH1750", expandCats: ["Periféricos", "Modulos I2C"], bloque: null
      },
      {
        titulo: "Arrastra: Inicializar BH1750",
        desc: "Arrastra el bloque <em>Inicializar</em> al área de trabajo. Deja los pines por defecto (SDA <b>21</b>, SCL <b>22</b>, dirección <b>0x23</b>). Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "Sensor Luz BH1750", expandCats: ["Periféricos", "Modulos I2C"],
        bloque: "bh1750_init", bloqueLabel: "Inicializar BH1750"
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. Leeremos el sensor continuamente.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: leer e imprimir la luz",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> dentro del ciclo. Luego ve a <b>Periféricos → Modulos I2C → Sensor Luz BH1750</b> y arrastra el bloque <em>leer luz (lux)</em> dentro del <em>imprimir</em>.",
        highlightCat: "Sensor Luz BH1750", expandCats: ["Periféricos", "Modulos I2C"],
        bloque: "bh1750_read_lux", bloqueLabel: "leer luz (lux)"
      },
      {
        titulo: "Esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> con <b>1</b> segundo, como último bloque dentro del ciclo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Tapa el sensor con la mano y luego destápalo — verás cómo cambia el valor de lux en el monitor serial. 💡",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  qmc5883l_brujula: {
    title: "Brújula QMC5883L", icon: "🧭",
    diagram: "img/conexiones/qmc5883l.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a leer un sensor <b>QMC5883L</b> (magnetómetro/brújula de 3 ejes). Aprenderás a inicializarlo y leer el campo magnético en cada eje.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El QMC5883L se conecta por <b>I2C</b>:<br>⚡ <b>VCC</b> → <b>3.3V</b><br>⏚ <b>GND</b> → GND<br>📌 <b>SDA</b> → pin <b>21</b><br>📌 <b>SCL</b> → pin <b>22</b><br><br>⚠️ Conecta siempre a 3.3V, nunca a 5V. Aléjalo de motores o imanes para que no interfieran con la lectura.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Periféricos › Modulos I2C",
        desc: "Haz clic en <b>Periféricos</b> y luego en <b>Modulos I2C</b> para desplegarlos.",
        highlightCat: "Modulos I2C", expandCat: "Periféricos", bloque: null
      },
      {
        titulo: "Selecciona la subcategoría Sensor Brújula QMC5883L",
        desc: "Dentro de <b>Modulos I2C</b> haz clic en <b>Sensor Brújula QMC5883L</b> para ver sus bloques.",
        highlightCat: "Sensor Brújula QMC5883L", expandCats: ["Periféricos", "Modulos I2C"], bloque: null
      },
      {
        titulo: "Arrastra: Inicializar QMC5883L",
        desc: "Arrastra el bloque <em>Inicializar</em> al área de trabajo. Deja los pines por defecto (SDA <b>21</b>, SCL <b>22</b>, dirección <b>0x2c</b>). Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "Sensor Brújula QMC5883L", expandCats: ["Periféricos", "Modulos I2C"],
        bloque: "qmc5883l_init", bloqueLabel: "Inicializar QMC5883L"
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. Leeremos el sensor continuamente.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: leer los 3 ejes",
        desc: "Ve a <b>Periféricos → Modulos I2C → Sensor Brújula QMC5883L</b> y arrastra el bloque <em>leer XYZ</em> como <b>primer bloque dentro del ciclo</b>. Este comando dispara la lectura de los 3 ejes a la vez; sin él los valores no se actualizan.",
        highlightCat: "Sensor Brújula QMC5883L", expandCats: ["Periféricos", "Modulos I2C"],
        bloque: "qmc5883l_read_xyz", bloqueLabel: "leer XYZ"
      },
      {
        titulo: "Imprimir el eje X",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> debajo de <em>leer XYZ</em>. Luego ve a <b>Periféricos → Modulos I2C → Sensor Brújula QMC5883L</b> y arrastra el bloque con el <b>selector</b> de eje dentro del <em>imprimir</em> — elige <b>X</b>.",
        highlightCat: "Sensor Brújula QMC5883L", expandCats: ["Periféricos", "Modulos I2C"],
        bloque: "qmc5883l_select", bloqueLabel: "eje X/Y/Z"
      },
      {
        titulo: "Esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> con <b>0.3</b> segundos, como último bloque dentro del ciclo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Gira el sensor y observa cómo cambia el valor del eje X en el monitor serial. 🧭",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  display_7seg: {
    title: "Display 7 Segmentos", icon: "🔟",
    diagram: "img/conexiones/display_7seg.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a mostrar números del 0 al 9 en un <b>display de 7 segmentos</b> (un solo dígito, sin driver — se conecta directo a pines del ESP32).",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El display tiene 7 segmentos (A-G) + un pin común:<br>📌 <b>A, B, C, D, E, F, G</b> → 7 pines digitales cualquiera, cada uno con resistencia de <b>220Ω</b><br>⚡/⏚ El pin <b>común</b> va a <b>GND</b> (cátodo común) o <b>3.3V</b> (ánodo común) según tu display.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre la categoría Pantallas",
        desc: "Haz clic en <b>Pantallas</b> en el panel de bloques para desplegarlo.",
        highlightCat: "Pantallas", expandCat: null, bloque: null
      },
      {
        titulo: "Selecciona la subcategoría DISPLAY 7 SEG",
        desc: "Dentro de <b>Pantallas</b> haz clic en <b>DISPLAY 7 SEG</b> para ver sus bloques.",
        highlightCat: "DISPLAY 7 SEG", expandCat: "Pantallas", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar display",
        desc: "Arrastra el bloque <em>Inicializar</em> al área de trabajo. Elige el tipo (<b>cátodo común</b> o <b>ánodo común</b>, según tu display) y asigna los 7 pines A-G. Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "DISPLAY 7 SEG", expandCat: "Pantallas",
        bloque: "seg7_init", bloqueLabel: "Inicializar display 7 seg"
      },
      {
        titulo: "Arrastra: Mostrar número",
        desc: "Arrastra el bloque <em>número</em> debajo. Elige, por ejemplo, <b>5</b>.",
        highlightCat: "DISPLAY 7 SEG", expandCat: "Pantallas",
        bloque: "seg7_number", bloqueLabel: "número"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Deberías ver el número <b>5</b> encendido en el display. Si se ve al revés o con segmentos apagados de más, prueba cambiar entre cátodo/ánodo común. 🔟",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  lcd_paralelo: {
    title: "LCD 16x2 (paralelo)", icon: "📺",
    diagram: "img/conexiones/lcd_paralelo.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a mostrar texto en un LCD 16x2 <b>sin</b> módulo I2C (conexión directa por 6 pines de datos). Si tu LCD tiene un módulo I2C soldado atrás, mejor usa el tutorial <b>LCD 16x2 I2C</b> — es más simple.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El LCD paralelo necesita 6 pines de datos + alimentación:<br>⚡ <b>VDD</b> → <b>5V</b>, <b>VSS</b> → GND<br>🎚️ <b>V0</b> (contraste) → potenciómetro de 10kΩ entre 5V y GND<br>📌 <b>RS</b> → pin <b>12</b>, <b>EN</b> → pin <b>13</b><br>📌 <b>D4</b> → pin <b>5</b>, <b>D5</b> → pin <b>23</b>, <b>D6</b> → pin <b>19</b>, <b>D7</b> → pin <b>18</b><br>⏚ <b>RW</b> → GND",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre la categoría Pantallas",
        desc: "Haz clic en <b>Pantallas</b> en el panel de bloques para desplegarlo.",
        highlightCat: "Pantallas", expandCat: null, bloque: null
      },
      {
        titulo: "Selecciona la subcategoría LCD",
        desc: "Dentro de <b>Pantallas</b> haz clic en <b>LCD</b> (la que NO dice I2C) para ver sus bloques.",
        highlightCat: "LCD", expandCat: "Pantallas", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar LCD",
        desc: "Arrastra el bloque <em>Inicializar LCD</em> al área de trabajo. Deja los pines por defecto (RS <b>12</b>, EN <b>13</b>, D4 <b>5</b>, D5 <b>23</b>, D6 <b>19</b>, D7 <b>18</b>). Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "LCD", expandCat: "Pantallas",
        bloque: "lcd_init", bloqueLabel: "Inicializar LCD"
      },
      {
        titulo: "Arrastra: Escribir texto",
        desc: "Arrastra el bloque <em>escribir</em> debajo. Conecta un bloque de texto con <b>'Hola ESP32'</b>.",
        highlightCat: "LCD", expandCat: "Pantallas",
        bloque: "lcd_print", bloqueLabel: "escribir"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Deberías ver <b>'Hola ESP32'</b> en la pantalla. Si no se ve nada, gira el potenciómetro de contraste. 📺",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  tft_display: {
    title: "Pantalla TFT a color", icon: "🎨",
    diagram: "img/conexiones/tft_display.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a dibujar en una pantalla <b>TFT a color</b> (tipo ST7789, 240x240). Aprenderás a inicializarla, pintar el fondo y escribir texto.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "La TFT se conecta por <b>SPI</b>:<br>⚡ <b>VCC</b> → <b>3.3V</b><br>⏚ <b>GND</b> → GND<br>📌 <b>MOSI</b> → pin <b>23</b><br>📌 <b>SCK</b> → pin <b>18</b><br>📌 <b>DC</b> → pin <b>21</b><br>📌 <b>RST</b> → pin <b>22</b><br><br>⚠️ Conecta siempre a 3.3V, nunca a 5V.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre la categoría Pantallas",
        desc: "Haz clic en <b>Pantallas</b> en el panel de bloques para desplegarlo.",
        highlightCat: "Pantallas", expandCat: null, bloque: null
      },
      {
        titulo: "Selecciona la subcategoría Pantalla TFT",
        desc: "Dentro de <b>Pantallas</b> haz clic en <b>Pantalla TFT</b> para ver sus bloques.",
        highlightCat: "Pantalla TFT", expandCat: "Pantallas", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar TFT",
        desc: "Arrastra el bloque <em>Inicializar</em> al área de trabajo. Deja los pines por defecto. Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "Pantalla TFT", expandCat: "Pantallas",
        bloque: "tft_init", bloqueLabel: "Inicializar TFT"
      },
      {
        titulo: "Arrastra: Color de fondo",
        desc: "Arrastra el bloque <em>color fondo</em> debajo. Elige un color, por ejemplo azul.",
        highlightCat: "Pantalla TFT", expandCat: "Pantallas",
        bloque: "tft_fill", bloqueLabel: "color fondo"
      },
      {
        titulo: "Arrastra: Escribir texto",
        desc: "Arrastra el bloque <em>font texto x y color bg</em> debajo. Escribe <b>'Hola ESP32'</b>, x=<b>10</b>, y=<b>10</b>, elige un color de texto que contraste con el fondo.",
        highlightCat: "Pantalla TFT", expandCat: "Pantallas",
        bloque: "tft_text", bloqueLabel: "texto x y color"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Deberías ver la pantalla pintada del color elegido, con tu texto encima. 🎨",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  neopixel_matriz: {
    title: "Matriz NeoPixel 5x5", icon: "🌈",
    diagram: "img/conexiones/neopixel_matriz.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a encender píxeles individuales en una <b>matriz NeoPixel 5x5</b> (25 LEDs RGB direccionables). Si tienes la de 8x8, los bloques son iguales — solo usa la categoría <b>NeoPixel 8x8</b>.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "La matriz NeoPixel tiene 3 pines:<br>⚡ <b>5V</b> → <b>5V</b> (una matriz completa puede consumir bastante corriente)<br>⏚ <b>GND</b> → GND<br>📌 <b>DIN</b> (dato) → pin <b>5</b><br><br>💡 Empieza con brillo bajo (20-30%) para no encandilarte ni consumir demasiada corriente.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Pantallas › NeoPixel",
        desc: "Haz clic en <b>Pantallas</b> y luego en <b>NeoPixel</b> para desplegarlos.",
        highlightCat: "NeoPixel", expandCat: "Pantallas", bloque: null
      },
      {
        titulo: "Selecciona la subcategoría NeoPixel 5x5",
        desc: "Dentro de <b>NeoPixel</b> haz clic en <b>NeoPixel 5x5</b> para ver sus bloques.",
        highlightCat: "NeoPixel 5x5", expandCats: ["Pantallas", "NeoPixel"], bloque: null
      },
      {
        titulo: "Arrastra: Inicializar matriz 5x5",
        desc: "Arrastra el bloque <em>Inicializar</em> al área de trabajo. Deja el pin por defecto (<b>5</b>). Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "NeoPixel 5x5", expandCats: ["Pantallas", "NeoPixel"],
        bloque: "neopixel_init_5x5", bloqueLabel: "Inicializar matriz 5x5"
      },
      {
        titulo: "Arrastra: Pintar un píxel",
        desc: "Arrastra el bloque <em>pixel x y color</em> debajo. Pon x=<b>2</b>, y=<b>2</b> (el centro) y elige un color.",
        highlightCat: "NeoPixel 5x5", expandCats: ["Pantallas", "NeoPixel"],
        bloque: "neopixel_pixel", bloqueLabel: "pixel x y color"
      },
      {
        titulo: "Arrastra: Mostrar con brillo",
        desc: "Arrastra el bloque <em>brillo</em> debajo — este es el que <b>envía</b> los colores a la matriz (sin él no se ve nada). Usa el slider para poner el brillo en <b>20%</b>.",
        highlightCat: "NeoPixel 5x5", expandCats: ["Pantallas", "NeoPixel"],
        bloque: "neopixel_show", bloqueLabel: "brillo"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Deberías ver un solo LED encendido en el centro de la matriz, con el color y brillo que elegiste. 🌈",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  color_tcs34725: {
    title: "Sensor de Color TCS34725", icon: "🎨",
    diagram: "img/conexiones/tcs34725.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a detectar colores con el sensor <b>TCS34725</b>. Aprenderás a inicializarlo y leer los canales rojo, verde y azul por separado.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El TCS34725 se conecta por <b>I2C</b>:<br>⚡ <b>VCC</b> → <b>3.3V</b><br>⏚ <b>GND</b> → GND<br>📌 <b>SDA</b> → pin <b>21</b><br>📌 <b>SCL</b> → pin <b>22</b><br><br>⚠️ Conecta siempre a 3.3V, nunca a 5V.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Periféricos › Modulos I2C",
        desc: "Haz clic en <b>Periféricos</b> y luego en <b>Modulos I2C</b> para desplegarlos.",
        highlightCat: "Modulos I2C", expandCat: "Periféricos", bloque: null
      },
      {
        titulo: "Selecciona la subcategoría Color TCS34725",
        desc: "Dentro de <b>Modulos I2C</b> haz clic en <b>Color TCS34725</b> para ver sus bloques.",
        highlightCat: "Color TCS34725", expandCats: ["Periféricos", "Modulos I2C"], bloque: null
      },
      {
        titulo: "Arrastra: Inicializar sensor de color",
        desc: "Arrastra el bloque <em>Inicializar</em> al área de trabajo. Deja los pines por defecto (SDA <b>21</b>, SCL <b>22</b>). Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "Color TCS34725", expandCats: ["Periféricos", "Modulos I2C"],
        bloque: "tcs34725_init", bloqueLabel: "Inicializar sensor de color"
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. Leeremos el color continuamente.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: leer un canal de color",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> dentro del ciclo. Luego ve a <b>Periféricos → Modulos I2C → Color TCS34725</b> y arrastra el bloque con el <b>selector</b> (rojo/verde/azul/luz) dentro del <em>imprimir</em> — elige <b>rojo</b>.",
        highlightCat: "Color TCS34725", expandCats: ["Periféricos", "Modulos I2C"],
        bloque: "tcs34725_select", bloqueLabel: "rojo/verde/azul/luz"
      },
      {
        titulo: "Esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> con <b>0.5</b> segundos, como último bloque dentro del ciclo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Acerca objetos de distintos colores al sensor y observa cómo cambia el valor del canal rojo. 🎨",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  dfplayer_mp3: {
    title: "Reproductor MP3 DFPlayer", icon: "🎵",
    diagram: "img/conexiones/dfplayer.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a reproducir archivos <b>MP3</b> desde una tarjeta microSD con el módulo <b>DFPlayer Mini</b>. Necesitas una microSD con archivos MP3 nombrados <b>0001.mp3</b>, <b>0002.mp3</b>, etc. en una carpeta <b>/mp3</b>.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El DFPlayer se conecta por <b>UART</b> (serial), y necesita una bocina/parlante:<br>⚡ <b>VCC</b> → <b>5V</b><br>⏚ <b>GND</b> → GND<br>📌 <b>TX</b> del DFPlayer → pin <b>16</b> (RX del ESP32)<br>📌 <b>RX</b> del DFPlayer → pin <b>17</b> (TX del ESP32), con una resistencia de <b>1kΩ</b> en serie<br>🔊 <b>SPK_1 / SPK_2</b> → altavoz de 3-8Ω",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Periféricos › Modulos UART",
        desc: "Haz clic en <b>Periféricos</b> y luego en <b>Modulos UART</b> para desplegarlos.",
        highlightCat: "Modulos UART", expandCat: "Periféricos", bloque: null
      },
      {
        titulo: "Selecciona la subcategoría DFPlayer",
        desc: "Dentro de <b>Modulos UART</b> haz clic en <b>DFPlayer</b> para ver sus bloques.",
        highlightCat: "DFPlayer", expandCats: ["Periféricos", "Modulos UART"], bloque: null
      },
      {
        titulo: "Arrastra: Inicializar DFPlayer",
        desc: "Arrastra el bloque <em>Inicializar</em> al área de trabajo. Deja los pines por defecto (TX <b>17</b>, RX <b>16</b>). Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "DFPlayer", expandCats: ["Periféricos", "Modulos UART"],
        bloque: "dfplayer_init", bloqueLabel: "Inicializar DFPlayer"
      },
      {
        titulo: "Arrastra: Ajustar volumen",
        desc: "Arrastra el bloque <em>volumen</em> debajo. Usa el slider para elegir un volumen, por ejemplo <b>15</b> (de 0 a 30).",
        highlightCat: "DFPlayer", expandCats: ["Periféricos", "Modulos UART"],
        bloque: "dfplayer_volume", bloqueLabel: "volumen"
      },
      {
        titulo: "Arrastra: Reproducir",
        desc: "Arrastra el bloque <em>reproducir</em> debajo. Reproduce la primera pista de la tarjeta SD.",
        highlightCat: "DFPlayer", expandCats: ["Periféricos", "Modulos UART"],
        bloque: "dfplayer_play", bloqueLabel: "reproducir"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Deberías escuchar la primera pista de tu microSD. Si no suena, revisa que la tarjeta tenga los MP3 bien nombrados y el altavoz esté bien conectado. 🎵",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  sdcard_modulo: {
    title: "Módulo SD Card", icon: "💾",
    diagram: "img/conexiones/sdcard.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a escribir y leer archivos en una tarjeta <b>microSD</b> conectada por SPI. Útil para guardar registros (logs) de sensores.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El módulo SD se conecta por <b>SPI</b>:<br>⚡ <b>VCC</b> → <b>5V</b><br>⏚ <b>GND</b> → GND<br>📌 <b>SCK</b> → pin <b>18</b><br>📌 <b>MOSI</b> → pin <b>23</b><br>📌 <b>MISO</b> → pin <b>19</b><br>📌 <b>CS</b> → pin <b>5</b>",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Periféricos › Modulos SPI",
        desc: "Haz clic en <b>Periféricos</b> y luego en <b>Modulos SPI</b> para desplegarlos.",
        highlightCat: "Modulos SPI", expandCat: "Periféricos", bloque: null
      },
      {
        titulo: "Selecciona la subcategoría SDCard",
        desc: "Dentro de <b>Modulos SPI</b> haz clic en <b>SDCard</b> para ver sus bloques.",
        highlightCat: "SDCard", expandCats: ["Periféricos", "Modulos SPI"], bloque: null
      },
      {
        titulo: "Arrastra: Inicializar SD",
        desc: "Arrastra el bloque <em>Inicializar</em> al área de trabajo. Deja los pines por defecto. Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "SDCard", expandCats: ["Periféricos", "Modulos SPI"],
        bloque: "sdcard_init", bloqueLabel: "Inicializar SD"
      },
      {
        titulo: "Arrastra: Escribir archivo",
        desc: "Arrastra el bloque <em>escribir archivo texto</em> debajo. Pon como nombre de archivo <b>'datos.txt'</b> y como texto <b>'Hola desde el ESP32'</b>.",
        highlightCat: "SDCard", expandCats: ["Periféricos", "Modulos SPI"],
        bloque: "sdcard_write", bloqueLabel: "escribir archivo texto"
      },
      {
        titulo: "Imprimir el contenido leído",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> debajo. Luego ve a <b>Periféricos → Modulos SPI → SDCard</b> y conecta el bloque <em>leer archivo</em> con el nombre <b>'datos.txt'</b>.",
        highlightCat: "SDCard", expandCats: ["Periféricos", "Modulos SPI"],
        bloque: "sdcard_read", bloqueLabel: "leer archivo"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Deberías ver <b>'Hola desde el ESP32'</b> impreso en el monitor serial — el mismo texto que se acaba de leer del archivo que se escribió. 💾",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  fpm383c_huella: {
    title: "Sensor de Huella FPM383C", icon: "👆",
    diagram: "img/conexiones/fpm383c.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a detectar y verificar huellas dactilares con el sensor <b>FPM383C</b>. Útil para proyectos de control de acceso.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El FPM383C se conecta por <b>UART</b> (serial):<br>⚡ <b>VCC</b> → <b>3.3V</b><br>⏚ <b>GND</b> → GND<br>📌 <b>TX</b> del sensor → pin <b>16</b> (RX del ESP32)<br>📌 <b>RX</b> del sensor → pin <b>17</b> (TX del ESP32)",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Periféricos › Modulos UART",
        desc: "Haz clic en <b>Periféricos</b> y luego en <b>Modulos UART</b> para desplegarlos.",
        highlightCat: "Modulos UART", expandCat: "Periféricos", bloque: null
      },
      {
        titulo: "Selecciona la subcategoría FPM383C",
        desc: "Dentro de <b>Modulos UART</b> haz clic en <b>FPM383C</b> para ver sus bloques.",
        highlightCat: "FPM383C", expandCats: ["Periféricos", "Modulos UART"], bloque: null
      },
      {
        titulo: "Arrastra: Inicializar sensor",
        desc: "Arrastra el bloque <em>Inicializar</em> al área de trabajo. Deja los pines por defecto (TX <b>17</b>, RX <b>16</b>). Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "FPM383C", expandCats: ["Periféricos", "Modulos UART"],
        bloque: "fpm_init", bloqueLabel: "Inicializar sensor de huella"
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. Revisaremos continuamente si hay un dedo sobre el sensor.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: si detecta un dedo",
        desc: "Ve a <b>Lógica</b> y arrastra un bloque <em>si … entonces</em> dentro del ciclo. Luego ve a <b>Periféricos → Modulos UART → FPM383C</b> y conecta el bloque <em>detectar huella</em> en la condición.",
        highlightCat: "FPM383C", expandCats: ["Periféricos", "Modulos UART"],
        bloque: "fpm_wait_finger", bloqueLabel: "detectar huella"
      },
      {
        titulo: "Dentro del sí: verificar la huella",
        desc: "Ve a <b>Periféricos → Modulos UART → FPM383C</b> y arrastra el bloque <em>verificar huella</em> dentro del <b>sí</b>. Compara la huella detectada contra las que ya estén registradas en el sensor.",
        highlightCat: "FPM383C", expandCats: ["Periféricos", "Modulos UART"],
        bloque: "fpm_verify", bloqueLabel: "verificar huella"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Coloca un dedo sobre el sensor. Nota: para que <em>verificar huella</em> encuentre una coincidencia, primero necesitas registrar huellas con el bloque <em>registrar ID</em>. 👆",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  inmp441_microfono: {
    title: "Micrófono INMP441", icon: "🎙️",
    diagram: "img/conexiones/inmp441.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a leer el nivel de sonido con un micrófono digital <b>INMP441</b> (I2S). Útil para proyectos que reaccionan al sonido o la voz.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El INMP441 se conecta por <b>I2S</b>:<br>⚡ <b>VDD</b> → <b>3.3V</b><br>⏚ <b>GND</b> → GND<br>📌 <b>SD</b> (datos) → pin <b>32</b><br>📌 <b>WS</b> (word select) → pin <b>25</b><br>📌 <b>SCK</b> (reloj) → pin <b>26</b><br>⏚ <b>L/R</b> → GND (canal izquierdo)",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre Periféricos › Modulos I2S",
        desc: "Haz clic en <b>Periféricos</b> y luego en <b>Modulos I2S</b> para desplegarlos.",
        highlightCat: "Modulos I2S", expandCat: "Periféricos", bloque: null
      },
      {
        titulo: "Selecciona la subcategoría Micrófono INMP441",
        desc: "Dentro de <b>Modulos I2S</b> haz clic en <b>Micrófono INMP441</b> para ver sus bloques.",
        highlightCat: "Micrófono INMP441", expandCats: ["Periféricos", "Modulos I2S"], bloque: null
      },
      {
        titulo: "Arrastra: Inicializar micrófono",
        desc: "Arrastra el bloque <em>Inicializar</em> al área de trabajo. Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "Micrófono INMP441", expandCats: ["Periféricos", "Modulos I2S"],
        bloque: "inmp441_init", bloqueLabel: "Inicializar micrófono"
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. Leeremos el nivel de sonido continuamente.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: leer e imprimir el nivel de sonido",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> dentro del ciclo. Luego ve a <b>Periféricos → Modulos I2S → Micrófono INMP441</b> y arrastra el bloque <em>nivel sonido</em> dentro del <em>imprimir</em>.",
        highlightCat: "Micrófono INMP441", expandCats: ["Periféricos", "Modulos I2S"],
        bloque: "inmp441_volume", bloqueLabel: "nivel sonido"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Habla o haz ruido cerca del micrófono y observa cómo sube el nivel de sonido en el monitor serial. 🎙️",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

  flujo_agua: {
    title: "Sensor de Flujo de Agua (YF-201)", icon: "💧",
    diagram: "img/conexiones/flujo_agua.svg",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a medir el caudal de agua con un sensor <b>YF-201</b> (o similar), que tiene una turbina que gira al pasar el agua. Útil para proyectos de riego o control de consumo.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física",
        desc: "El sensor de flujo tiene 3 cables:<br>⚡ <b>Rojo (VCC)</b> → <b>5V</b><br>⏚ <b>Negro (GND)</b> → GND<br>📌 <b>Amarillo (señal)</b> → pin <b>27</b><br><br>💧 El sensor va instalado en la tubería, con el agua fluyendo en el sentido que indica la flecha en su carcasa.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Abre la categoría Periféricos",
        desc: "Haz clic en <b>Periféricos</b> en el panel de bloques para desplegarlo.",
        highlightCat: "Periféricos", expandCat: null, bloque: null
      },
      {
        titulo: "Selecciona la subcategoría Flujo Agua",
        desc: "Dentro de <b>Periféricos</b> haz clic en <b>Flujo Agua</b> para ver sus bloques.",
        highlightCat: "Flujo Agua", expandCat: "Periféricos", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar sensor de flujo",
        desc: "Arrastra el bloque <em>Inicializar</em> al área de trabajo. Este bloque va <b>una sola vez</b> al inicio.",
        highlightCat: "Flujo Agua", expandCat: "Periféricos",
        bloque: "yf201_init", bloqueLabel: "Inicializar sensor de flujo"
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. Leeremos el flujo continuamente.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: imprimir el flujo",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> dentro del ciclo. Luego ve a <b>Periféricos → Flujo Agua</b> y arrastra el bloque <em>flujo L/min</em> dentro del <em>imprimir</em>.",
        highlightCat: "Flujo Agua", expandCat: "Periféricos",
        bloque: "yf201_flow_rate", bloqueLabel: "flujo L/min"
      },
      {
        titulo: "Esperar",
        desc: "Ve a <b>Tiempo</b> y arrastra el bloque <em>Esperar</em> con <b>1</b> segundo, como último bloque dentro del ciclo.",
        highlightCat: "Tiempo", expandCat: null, bloque: "time_sleep"
      },
      {
        titulo: "Conecta tu ESP32 y Selecciona tu puerto",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span>. El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. Deja pasar agua por el sensor y observa cómo aumenta el valor de litros por minuto en el monitor serial. 💧",
        highlightElement: "#btnRun", waitForAction: "run"
      }
    ]
  },

};

/* ─── LÓGICA ─────────────────────────────────────────────────── */

var TutorialSteps = {
  tutorial: null,
  paso: 0,
  _glowToolbox: [],
  _glowBlocks: [],     // SVG roots resaltados — SOLO del flyout, nunca del workspace
  _flyoutObs: null,   // MutationObserver del flyout
  _currentTipos: [],    // tipos del paso actual, para el observer
  _pollTimer: null,   // setInterval del check ✓ (ver _iniciarPolling/_actualizarCheck)

  /* ── API pública ─────────────────────────────────────────── */
  cargar: function (id) {
    if (!id) { this.cerrar(); return; }
    var tut = TUTORIALS[id];
    if (!tut) return;
    // Siempre regresar a la vista de bloques al cambiar de tutorial
    if (typeof showView === 'function') showView('viewBlocks');
    this.tutorial = tut;
    this.paso = 0;
    // El check ✓ del paso "Ejecuta tu programa" se apoya en este flag
    // (ver _isPasoCompleto / main.js sendCodeToDevice) -- resetearlo acá
    // evita que quede "pegado" en true por haber corrido código de un
    // tutorial anterior, y el paso de este tutorial nuevo se marque
    // como hecho sin que el usuario haya tocado Ejecutar todavía.
    window._tsCodeRanOk = false;
    document.getElementById('ts-panel').style.display = 'flex';
    // Restaurar botones por si el tutorial anterior terminó en _mostrarFin
    var btnNext = document.getElementById('ts-btn-next');
    var btnPrev = document.getElementById('ts-btn-prev');
    if (btnNext) btnNext.style.display = '';
    if (btnPrev) btnPrev.style.display = '';
    // El botón de conexiones (top bar y panel) ya NO se muestra para todo
    // el tutorial -- ver _actualizarBotonWiring(), llamado desde
    // _renderPaso(): solo aparece durante el paso "Conexión física...".
    // Restaurar body si fue reemplazado por pantalla de fin
    if (!document.getElementById('ts-step-num')) {
      document.getElementById('ts-body').innerHTML = this._bodyTpl();
    }
    this._renderPaso();
    this._iniciarPolling();
  },

  siguiente: function () {
    if (!this.tutorial) return;
    if (this.paso < this.tutorial.steps.length - 1) {
      this.paso++;
      this._renderPasoConTransicion('next');
    } else {
      this._mostrarFin();
    }
  },

  anterior: function () {
    if (!this.tutorial || this.paso === 0) return;
    this.paso--;
    this._renderPasoConTransicion('prev');
  },

  /* Transición suave: fade-out → actualizar → fade-in */
  _renderPasoConTransicion: function (dir) {
    var body = document.getElementById('ts-body');
    if (!body) { this._renderPaso(); return; }

    // Fade out
    body.style.transition = 'opacity .14s ease, transform .14s ease';
    body.style.opacity = '0';
    body.style.transform = dir === 'next' ? 'translateY(5px)' : 'translateY(-5px)';

    var self = this;
    setTimeout(function () {
      self._renderPaso();
      // Posición inicial para la entrada
      body.style.transition = 'none';
      body.style.transform = dir === 'next' ? 'translateY(-5px)' : 'translateY(5px)';
      body.style.opacity = '0';

      // Forzar reflow y luego fade in
      void body.offsetWidth;
      body.style.transition = 'opacity .22s cubic-bezier(0.22,1,0.36,1), transform .22s cubic-bezier(0.22,1,0.36,1)';
      body.style.opacity = '1';
      body.style.transform = 'translateY(0)';
    }, 140);
  },

  cerrar: function () {
    this._detenerPolling();
    this._limpiarTodo();
    this.tutorial = null;
    this.paso = 0;
    var panel = document.getElementById('ts-panel');
    if (panel) panel.style.display = 'none';
    var sel = document.getElementById('tutorialSelect');
    if (sel) sel.value = '';
    // Ocultar botón de conexiones al cerrar (this.tutorial ya es null acá)
    this._actualizarBotonWiring();
  },

  /* ── Render ──────────────────────────────────────────────── */
  _renderPaso: function () {
    var tut = this.tutorial;
    var step = tut.steps[this.paso];
    var total = tut.steps.length;

    document.getElementById('ts-icon').textContent = tut.icon;
    document.getElementById('ts-title').textContent = tut.title;

    var pct = Math.round(((this.paso + 1) / total) * 100);
    document.getElementById('ts-progress-fill').style.width = pct + '%';
    document.getElementById('ts-progress-txt').textContent =
      'Paso ' + (this.paso + 1) + ' de ' + total;

    // Reconstruir el body ANTES de escribir en sus hijos
    // (puede haber sido reemplazado por _mostrarFin al usar el tutorial por segunda vez)
    if (!document.getElementById('ts-step-num') ||
      !document.getElementById('ts-step-title') ||
      !document.getElementById('ts-step-desc')) {
      document.getElementById('ts-body').innerHTML = this._bodyTpl();
    }

    document.getElementById('ts-step-num').textContent = this.paso + 1;
    document.getElementById('ts-step-title').textContent = step.titulo;
    document.getElementById('ts-step-desc').innerHTML = step.desc;

    this._actualizarBotonWiring();


    // Mostrar u ocultar el panel de categoría/bloque según el paso
    var catBox = document.getElementById('ts-cat-box');
    var stepDesc = document.getElementById('ts-step-desc');
    if (catBox) {
      var usaPanel = !!(step.highlightCat || step.bloque);
      catBox.style.display = usaPanel ? '' : 'none';
      // Eliminar espacio vacío cuando no hay panel de categoría
      if (stepDesc) stepDesc.style.marginBottom = usaPanel ? '' : '0';
    }

    // Ruta del toolbox
    var html = '';
    var catsToExpand = step.expandCats
      ? step.expandCats
      : (step.expandCat ? [step.expandCat] : []);

    catsToExpand.forEach(function (cat) {
      if (cat !== step.highlightCat) {
        html += '<span class="ts-cat-part">' + cat + '</span>' +
          '<span class="ts-cat-sep">›</span>';
      }
    });
    if (step.highlightCat) {
      html += '<span class="ts-cat-part ts-cat-active">' + step.highlightCat + '</span>';
    }
    document.getElementById('ts-cat-ruta').innerHTML = html;

    // Chip del bloque
    var chipRow = document.getElementById('ts-bloque-row');
    var chip = document.getElementById('ts-bloque-chip');
    if (step.bloque) {
      // Si hay un label amigable, mostrarlo; si no, mostrar el tipo técnico
      if (step.bloqueLabel) {
        chip.textContent = Array.isArray(step.bloqueLabel)
          ? step.bloqueLabel.join('  +  ')
          : step.bloqueLabel;
      } else {
        var tipos = Array.isArray(step.bloque) ? step.bloque : [step.bloque];
        chip.textContent = tipos.join('  +  ');
      }
      chipRow.style.display = 'flex';
    } else {
      chipRow.style.display = 'none';
    }

    // Botones
    document.getElementById('ts-btn-prev').disabled = (this.paso === 0);
    document.getElementById('ts-btn-next').textContent =
      (this.paso === total - 1) ? '¡Terminar! 🎉' : 'Siguiente →';

    // (La animación de entrada/salida la maneja _renderPasoConTransicion)

    // Highlights
    this._limpiarTodo();

    // Expandir categorías padres en orden (soporta expandCats array o expandCat string)
    var catsToExpand = step.expandCats
      ? step.expandCats
      : (step.expandCat ? [step.expandCat] : []);
    this._highlightToolbox(step.highlightCat, catsToExpand);

    if (step.highlightElement) {
      this._highlightHTMLElement(step.highlightElement);
    }

    if (step.highlightFlyoutButton === "create_variable") {
      this._waitForCreateVariableButton();
    }

    if (step.bloque) {
      // Normalizar SIEMPRE a array de objetos { tipo, valor? }
      var bloques = this._normalizarBloques(step.bloque);

      this._currentBloques = bloques;

      // Solo resaltamos bloques en el flyout (panel lateral), NO en el workspace.
      // Aplicar glow a todos los bloques del workspace del mismo tipo
      // provoca lag cuando ya hay muchos bloques colocados.
      this._aplicarGlowFlyoutBloques(bloques);
      this._iniciarFlyoutObserverBloques(bloques);
    } else {
      this._currentBloques = [];
    }

    this._actualizarCheck();
  },

  /* ── Check ✓ de paso ya completado ───────────────────────────
     No navega solo ni fuerza nada — solo le avisa al usuario que
     ya puede pasar de paso cuando quiera. Se recalcula al entrar a
     cada paso y, mientras el tutorial sigue abierto, cada 500ms
     (ver _iniciarPolling) para reflejar cambios hechos en el
     workspace/conexión sin que el usuario tenga que tocar
     Anterior/Siguiente. ────────────────────────────────────────── */
  _isPasoCompleto: function () {
    var tut = this.tutorial;
    if (!tut) return false;
    var step = tut.steps[this.paso];
    if (!step) return false;
    var self = this;

    // Paso pide arrastrar uno o más bloques al workspace principal.
    //
    // OJO: muchos tutoriales piden el MISMO tipo genérico (math_number,
    // time_sleep, variables_set sin "valor") en varios pasos distintos.
    // Si acá solo revisáramos "¿existe al menos uno de ese tipo?", con
    // arrastrar UN math_number ya quedarían todos esos pasos marcados
    // ✓ de una, sin haber arrastrado nada para el resto. Por eso se
    // compara CANTIDAD pedida acumulada hasta este paso (cuántas veces
    // salió ese mismo tipo/valor en los pasos 0..actual) contra cuántos
    // bloques de ese tipo/valor hay AHORA en el workspace -- así el ✓ de
    // este paso solo prende cuando se arrastró uno nuevo para él.
    if (step.bloque) {
      var ws = this._getWorkspace();
      if (!ws || !ws.getAllBlocks) return false;
      var bloques = this._normalizarBloques(step.bloque);
      var allBlocks = ws.getAllBlocks(false);
      return bloques.every(function (b) {
        var key = self._bloqueKey(b);
        var necesarios = self._bloqueRequeridoHasta(self.paso, key);
        var actuales = allBlocks.filter(function (block) {
          return self._bloqueCoincide(block, b);
        }).length;
        return actuales >= necesarios;
      });
    }

    // Paso pide crear una variable nueva (botón "Crear variable" del
    // flyout de Variables) -- si el step declara "variable" (nombre o
    // array de nombres) revisamos que YA exista en el workspace, en vez
    // de darlo por hecho apenas se muestra el paso.
    if (step.highlightFlyoutButton === "create_variable" && step.variable) {
      var ws2 = this._getWorkspace();
      if (!ws2 || !ws2.getAllVariables) return false;
      var nombres = Array.isArray(step.variable) ? step.variable : [step.variable];
      var vars = ws2.getAllVariables();
      return nombres.every(function (nombre) {
        return vars.some(function (v) { return v.name === nombre; });
      });
    }

    // Paso pide abrir/seleccionar una categoría o subcategoría del
    // toolbox (sin bloque para arrastrar todavía, ej. "Abre la categoría
    // LEDs" o "Selecciona la subcategoría LED"). Blockly le agrega la
    // clase .blocklyTreeSelected a la fila del toolbox recién clickeada
    // (ver Blockly.ToolboxCategory.prototype.setSelected en
    // blockly_compressed.js) -- se usa esa clase para saber si el
    // usuario YA hizo clic ahí, en vez de darlo por hecho apenas se
    // muestra el paso.
    //
    // Si el paso pide crear variable pero (por lo que sea) no tiene
    // "variable" declarado, cae acá y NO se marca como hecho por solo
    // haber clickeado la categoría -- sigue el fallback informativo de
    // más abajo (mismo comportamiento que tenía antes de este chequeo).
    if (!step.bloque && step.highlightCat && !step.highlightFlyoutButton) {
      return this._categoriaSeleccionada(step.highlightCat);
    }

    // Paso pide conectar el ESP32.
    if (step.highlightElement === "#btnConnection" || step.waitForAction === "connect") {
      return typeof isConnected !== "undefined" && !!isConnected;
    }

    // Paso pide ejecutar el código (ver el flag seteado en main.js,
    // sendCodeToDevice(), justo antes de su "return true" final).
    if (step.waitForAction === "run") {
      return !!window._tsCodeRanOk;
    }

    // Pasos informativos (sin bloque ni acción detectable): no hay
    // nada que verificar, se dan por leídos apenas se muestran.
    return true;
  },

  _actualizarCheck: function () {
    var titleEl = document.getElementById('ts-step-title');
    var tut = this.tutorial;
    var step = tut && tut.steps[this.paso];
    if (!titleEl || !step) return;

    // Mismo criterio que TutorialManager._updateDoneIndicator() del
    // simulador: antepone "✓ " al título del paso y le cambia el color
    // vía la clase .ts-step-title-done -- puramente informativo, nunca
    // navega solo.
    var done = this._isPasoCompleto();
    titleEl.textContent = done ? ('✓ ' + step.titulo) : step.titulo;
    titleEl.classList.toggle('ts-step-title-done', done);
  },

  _iniciarPolling: function () {
    this._detenerPolling();
    var self = this;
    this._pollTimer = setInterval(function () { self._actualizarCheck(); }, 500);
  },

  _detenerPolling: function () {
    clearInterval(this._pollTimer);
    this._pollTimer = null;
  },

  /* ── Botón de conexiones (🔌) ─────────────────────────────────
     Antes se mostraba durante TODO el tutorial (y de hecho ni
     siquiera se ocultaba al terminarlo, por una regla CSS que lo
     forzaba siempre visible -- ver #btnWiring en tutorial-steps.css).
     Ahora aparece SOLO en el paso "Conexión física..." de cada
     tutorial, que es cuando realmente hace falta consultar el
     diagrama; en cualquier otro paso, al cerrar el tutorial o al
     terminarlo, se oculta. ────────────────────────────────────── */
  _esPasoDeConexion: function (step) {
    return !!(step && typeof step.titulo === 'string' &&
      step.titulo.indexOf('Conexión física') === 0);
  },

  _actualizarBotonWiring: function () {
    var tut = this.tutorial;
    var step = tut ? tut.steps[this.paso] : null;
    var mostrar = !!(tut && tut.diagram && this._esPasoDeConexion(step));

    var btnWiring = document.getElementById('btnWiring');
    if (btnWiring) {
      btnWiring.style.display = mostrar ? 'flex' : 'none';
    }

    var btnTsWiring = document.getElementById('ts-btn-wiring');
    if (btnTsWiring) btnTsWiring.style.display = mostrar ? '' : 'none';
  },

  /* Convierte string | objeto | array mixto → array de { tipo, valor? } */
  _normalizarBloques: function (bloque) {
    var arr = Array.isArray(bloque) ? bloque : [bloque];
    return arr.map(function (b) {
      if (typeof b === 'string') return { tipo: b };
      return b;
    });
  },

  /* Clave única por descriptor { tipo, valor? } -- usada para contar
     cuántas veces se repite el mismo pedido (ver _bloqueRequeridoHasta). */
  _bloqueKey: function (b) {
    return b.valor ? (b.tipo + '::' + b.valor) : b.tipo;
  },

  /* Cuántas veces se pidió esta MISMA clave (tipo+valor) entre el paso 0
     y idxPaso (inclusive) -- la demanda acumulada que _isPasoCompleto()
     compara contra los bloques que hay ahora en el workspace. */
  _bloqueRequeridoHasta: function (idxPaso, key) {
    var self = this;
    var steps = this.tutorial.steps;
    var count = 0;
    for (var i = 0; i <= idxPaso; i++) {
      var s = steps[i];
      if (!s.bloque) continue;
      this._normalizarBloques(s.bloque).forEach(function (b) {
        if (self._bloqueKey(b) === key) count++;
      });
    }
    return count;
  },

  /*
   * Comprueba si un bloque de Blockly coincide con el descriptor { tipo, valor? }.
   * Para variables_get / variables_set, getFieldValue("VAR") devuelve el ID
   * interno (UUID), NO el nombre visible. Resolvemos el nombre real con el
   * modelo de variables del workspace y varios fallbacks.
   */
  _bloqueCoincide: function (block, b) {
    if (block.type !== b.tipo) return false;
    if (!b.valor) return true;

    try {
      // 1. FieldVariable expone getVariable() → { name, id, type }
      var varField = block.getField('VAR');
      if (varField && varField.getVariable) {
        var varModel = varField.getVariable();
        if (varModel && varModel.name === b.valor) return true;
      }
      // 2. Resolver ID → nombre via workspace.getVariableById()
      var rawId = block.getFieldValue('VAR');
      var bws = block.workspace;
      if (bws && bws.getVariableById) {
        var model = bws.getVariableById(rawId);
        if (model && model.name === b.valor) return true;
      }
      // 3. Algunos bloques usan el campo "NAME" directamente
      var nameVal = block.getFieldValue('NAME');
      if (nameVal === b.valor) return true;
      // 4. Último recurso: texto renderizado del dropdown
      if (varField && typeof varField.getText === 'function') {
        if (varField.getText() === b.valor) return true;
      }
    } catch (e) { /* ignorar errores de campos inexistentes */ }

    return false;
  },

  _aplicarGlowFlyoutBloques: function (bloques) {
    var ws = this._getWorkspace();
    if (!ws || !ws.getFlyout) return;

    var flyout = ws.getFlyout();
    if (!flyout) return;

    // Intentar vía getWorkspace() primero, luego workspace_ (API privada estable)
    var fws = (flyout.getWorkspace && flyout.getWorkspace()) || flyout.workspace_;
    if (!fws) return;

    var self = this;

    // Usar getAllBlocks si está disponible (más fiable que blockDB_)
    var allBlocks = fws.getAllBlocks ? fws.getAllBlocks(false)
      : Object.values(fws.blockDB_ || {});

    var primerSvg = null;

    allBlocks.forEach(function (block) {
      if (!block) return;

      bloques.forEach(function (b) {
        if (!self._bloqueCoincide(block, b)) return;

        var svg = block.getSvgRoot ? block.getSvgRoot() : null;
        if (!svg) return;

        // Guardia: solo aplicar si el SVG vive dentro del flyout,
        // nunca en el workspace principal. Evita lag con muchos bloques.
        var inFlyout = svg.closest && svg.closest('.blocklyFlyout');
        if (!inFlyout) return;

        if (!svg.classList.contains('ts-block-glow')) {
          svg.classList.add('ts-block-glow');
          self._glowBlocks.push(svg);
        }

        // Guardar el primero que coincida para hacer scroll hacia él
        if (!primerSvg) primerSvg = svg;
      });
    });

    // Scroll automático al primer bloque resaltado
    if (primerSvg) {
      self._scrollFlyoutABloque(primerSvg);
    }
  },

  /*
   * Desplaza el flyout para que el bloque indicado quede visible.
   * Intenta 3 estrategias según la versión de Blockly.
   */
  _scrollFlyoutABloque: function (svg) {
    var ws = this._getWorkspace();
    if (!ws || !ws.getFlyout) return;

    var flyout = ws.getFlyout();
    if (!flyout) return;

    try {
      var fws = (flyout.getWorkspace && flyout.getWorkspace()) || flyout.workspace_;

      // Buscar el elemento DOM del flyout
      var flyoutEl = flyout.svgGroup_ || flyout.svgGroup;
      if (!flyoutEl) flyoutEl = document.querySelector('.blocklyFlyout');
      if (!flyoutEl) return;

      var flyoutRect = flyoutEl.getBoundingClientRect();
      var blockRect  = svg.getBoundingClientRect();

      // Posición del bloque relativa al área visible del flyout
      var relTop    = blockRect.top    - flyoutRect.top;
      var relBottom = blockRect.bottom - flyoutRect.top;
      var flyoutH   = flyoutRect.height;

      // Si ya es completamente visible, no hacer nada
      if (relTop >= 8 && relBottom <= flyoutH - 8) return;

      // Cuánto mover para centrar el bloque
      var blockMid = relTop + blockRect.height / 2;
      var delta    = blockMid - flyoutH / 2;

      // ── Estrategia 1: scrollbar interno de Blockly ──────────────
      if (fws && fws.scrollbar_) {
        var sb = fws.scrollbar_.vScroll || fws.scrollbar_;
        if (sb && typeof sb.set === 'function') {
          var cur = (sb.get && typeof sb.get === 'function') ? sb.get() : 0;
          sb.set(Math.max(0, cur + delta));
          return;
        }
      }

      // ── Estrategia 2: ajustar transform del blocklyBlockCanvas ──
      var blocksSvg = (flyoutEl.tagName === 'svg') ? flyoutEl
                    : flyoutEl.querySelector('svg');
      if (blocksSvg) {
        var grp = blocksSvg.querySelector('g.blocklyBlockCanvas') ||
                  blocksSvg.querySelector('g[transform]');
        if (grp) {
          var m = (grp.getAttribute('transform') || '')
                    .match(/translate\(\s*([^,]+),\s*([^)]+)\)/);
          if (m) {
            var tx = parseFloat(m[1]);
            var ty = parseFloat(m[2]);
            grp.setAttribute('transform', 'translate(' + tx + ',' + (ty - delta) + ')');
            return;
          }
        }
      }

      // ── Estrategia 3: scrollIntoView como último recurso ────────
      svg.scrollIntoView({ block: 'center', behavior: 'smooth' });

    } catch (e) {
      // Silencioso — no interrumpir el flujo del tutorial
    }
  },

  _iniciarFlyoutObserverBloques: function (bloques) {
    var self = this;
    this._detenerFlyoutObserver();

    var blocklyDiv = document.getElementById('blocklyDiv');
    if (!blocklyDiv) return;

    var debounce;
    this._flyoutObs = new MutationObserver(function () {
      clearTimeout(debounce);
      debounce = setTimeout(function () {
        // Quitar glow viejo del flyout y reaplicar
        self._glowBlocks = self._glowBlocks.filter(function (svg) {
          var inFlyout = svg.closest && svg.closest('.blocklyFlyout');
          if (inFlyout) {
            svg.classList.remove('ts-block-glow');
            return false;
          }
          return true;
        });
        // bloques ya está normalizado — aplicar directamente
        self._aplicarGlowFlyoutBloques(bloques);
      }, 60);
    });

    this._flyoutObs.observe(blocklyDiv, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'transform', 'display']
    });
  },

  /* ── Highlight toolbox ───────────────────────────────────── */
  _highlightToolbox: function (nombre, padres) {
    // padres puede ser string (legado) o array
    var listaPadres = Array.isArray(padres)
      ? padres.map(function (p) { return p.trim(); })
      : (padres ? [padres.trim()] : []);

    var nombres = listaPadres.slice(); // copia de padres
    if (nombre) nombres.push(nombre.trim());
    if (!nombres.length) return;

    var rows = document.querySelectorAll('.blocklyTreeRow');
    var scrollTarget = null;

    for (var i = 0; i < rows.length; i++) {
      var label = rows[i].querySelector('.blocklyTreeLabel');
      if (!label) continue;
      var txt = label.textContent.trim();
      if (nombres.indexOf(txt) !== -1) {
        rows[i].classList.add('ts-toolbox-glow');
        this._glowToolbox.push(rows[i]);
        if (txt === (nombre ? nombre.trim() : listaPadres[listaPadres.length - 1])) {
          scrollTarget = rows[i];
        }
      }
    }
    if (scrollTarget) {
      scrollTarget.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  },

  /* ¿El usuario ya hizo clic en la fila del toolbox llamada "nombre"?
     (ver _isPasoCompleto) -- Blockly marca la fila activa con la clase
     .blocklyTreeSelected apenas se clickea, así que no hace falta nada
     propio: alcanza con leer esa clase. */
  _categoriaSeleccionada: function (nombre) {
    if (!nombre) return false;
    var target = nombre.trim();
    var rows = document.querySelectorAll('.blocklyTreeRow');
    for (var i = 0; i < rows.length; i++) {
      var label = rows[i].querySelector('.blocklyTreeLabel');
      if (!label) continue;
      if (label.textContent.trim() === target) {
        return rows[i].classList.contains('blocklyTreeSelected');
      }
    }
    return false;
  },

  _highlightHTMLElement: function (selector) {
    const el = document.querySelector(selector);

    if (!el) {
      console.warn("Elemento no encontrado:", selector);
      return;
    }

    el.classList.add("ts-html-glow");

    this._glowHtmlElement = el;

    el.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  },

  /* ── Highlight bloques en el workspace principal ─────────── */
  _aplicarGlowWorkspaceBloques: function (bloques) {
    var ws = this._getWorkspace();
    if (!ws) return;

    var self = this;

    ws.getAllBlocks(false).forEach(function (block) {

      for (var i = 0; i < bloques.length; i++) {
        var b = bloques[i];
        if (!self._bloqueCoincide(block, b)) continue;

        var svg = block.getSvgRoot();
        if (svg && !svg.classList.contains('ts-block-glow')) {
          svg.classList.add('ts-block-glow');
          self._glowBlocks.push(svg);
        }
      }
    });
  },

  /* ── Highlight bloques en el flyout (si está abierto) ───── */
  _aplicarGlowFlyout: function (tipos) {
    var self = this;
    // Busca todos los <g class="blocklyDraggable"> dentro de .blocklyFlyout
    var flyoutSvg = document.querySelector('.blocklyFlyout');
    if (!flyoutSvg) return;

    // Intenta via API de Blockly primero (más limpio)
    var ws = this._getWorkspace();
    if (ws && ws.getFlyout && ws.getFlyout()) {
      var flyoutWs = ws.getFlyout().getWorkspace ? ws.getFlyout().getWorkspace() : null;
      if (flyoutWs) {
        flyoutWs.getAllBlocks(false).forEach(function (block) {
          if (tipos.indexOf(block.type) !== -1) {
            var svg = block.getSvgRoot();
            if (svg && !svg.classList.contains('ts-block-glow')) {
              svg.classList.add('ts-block-glow');
              self._glowBlocks.push(svg);
            }
          }
        });
        return;  // éxito vía API
      }
    }

    // Fallback: buscar por data-id en el DOM del flyout
    // Blockly pone el type en el atributo data-block-type o en la clase,
    // pero lo más confiable es buscar via getSvgRoot del workspace del flyout.
    // Si el fallback es necesario, marcamos todos los <g.blocklyDraggable>
    // del flyout que correspondan al tipo — comparando con los del workspace.
    this._aplicarGlowFlyoutDOM(tipos, flyoutSvg);
  },

  /* Fallback DOM: compara data-id del flyout con el registro de Blockly */
  _aplicarGlowFlyoutDOM: function (tipos, flyoutSvg) {
    var self = this;
    var ws = this._getWorkspace();
    if (!ws || !ws.getFlyout) return;

    var flyout = ws.getFlyout();
    if (!flyout) return;

    // Blockly guarda un mapa id→block en el flyout
    // Intentamos acceder a flyout.workspace_ (API privada, muy estable)
    var fws = flyout.workspace_ || (flyout.getWorkspace && flyout.getWorkspace());
    if (!fws) return;

    var blockMap = fws.blockDB_ || {};
    Object.keys(blockMap).forEach(function (id) {
      var block = blockMap[id];
      if (!block || tipos.indexOf(block.type) === -1) return;
      var svg = block.getSvgRoot ? block.getSvgRoot() : null;
      if (!svg) return;
      // Solo flyout, nunca workspace
      var inFlyout = svg.closest && svg.closest('.blocklyFlyout');
      if (!inFlyout) return;
      if (!svg.classList.contains('ts-block-glow')) {
        svg.classList.add('ts-block-glow');
        self._glowBlocks.push(svg);
      }
    });
  },

  /* ── MutationObserver: aplica glow cuando el flyout se abre ─
     El flyout cambia su atributo display/transform al abrirse.
     Observamos el padre del .blocklyFlyout para detectarlo.      */
  _iniciarFlyoutObserver: function (tipos) {
    var self = this;
    this._detenerFlyoutObserver();

    // Observa el blocklyDiv para detectar cuando aparece o cambia el flyout
    var blocklyDiv = document.getElementById('blocklyDiv');
    if (!blocklyDiv) return;

    var debounceTimer = null;
    this._flyoutObs = new MutationObserver(function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        // Quita glow viejo del flyout y reaplicar
        // (no quitamos el del workspace, solo el del flyout anterior)
        var toRemove = [];
        self._glowBlocks = self._glowBlocks.filter(function (svg) {
          // Si el SVG ya no está en el flyout activo, lo dejamos
          // Si está en el flyout, lo removemos para reaplicar
          var inFlyout = svg.closest && svg.closest('.blocklyFlyout');
          if (inFlyout) {
            svg.classList.remove('ts-block-glow');
            return false;
          }
          return true;
        });
        self._aplicarGlowFlyout(tipos);
      }, 60);
    });

    this._flyoutObs.observe(blocklyDiv, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'transform', 'display']
    });
  },

  _detenerFlyoutObserver: function () {
    if (this._flyoutObs) {
      this._flyoutObs.disconnect();
      this._flyoutObs = null;
    }
  },


  _limpiarTodo: function () {
    this._detenerFlyoutObserver();
    this._currentTipos = [];

    this._glowToolbox.forEach(function (row) {
      row.classList.remove('ts-toolbox-glow');
    });
    this._glowToolbox = [];

    this._glowBlocks.forEach(function (svg) {
      svg.classList.remove('ts-block-glow');
    });

    this._glowBlocks = [];

    document.querySelectorAll(".blocklyFlyoutButtonBackground").forEach(btn => {
      btn.classList.remove("ts-block-glow");
    });

    if (this._glowHtmlElement) {
      this._glowHtmlElement.classList.remove("ts-html-glow");
      this._glowHtmlElement = null;
    }
  },

  /* ── Helpers ─────────────────────────────────────────────── */
  _getWorkspace: function () {
    if (typeof Code !== 'undefined' && Code.workspace) return Code.workspace;
    if (typeof Blockly !== 'undefined') return Blockly.getMainWorkspace();
    return null;
  },

  /* ── Fin ─────────────────────────────────────────────────── */
  _mostrarFin: function () {
    this._limpiarTodo();
    document.getElementById('ts-body').innerHTML =
      '<div class="ts-fin">' +
      '  <div class="ts-fin-icon">🎉</div>' +
      '  <h3>¡Tutorial completado!</h3>' +
      '  <p>Terminaste <strong>' + this.tutorial.title + '</strong>.<br>' +
      '     Prueba modificar valores o elige otro tutorial.</p>' +
      '  <button class="ts-btn ts-btn-primary" onclick="TutorialSteps._reiniciar()">Repetir</button>' +
      '</div>';
    document.getElementById('ts-btn-next').style.display = 'none';
    document.getElementById('ts-btn-prev').style.display = 'none';
    // Ya no hay un "paso de conexión" activo -- ocultar el botón de
    // conexiones (antes quedaba visible incluso en la pantalla de fin).
    this._actualizarBotonWiring();
  },

  _reiniciar: function () {
    document.getElementById('ts-btn-next').style.display = '';
    document.getElementById('ts-btn-prev').style.display = '';
    document.getElementById('ts-body').innerHTML = TutorialSteps._bodyTpl();
    // Resetear estilos inline de transición que pudo dejar _renderPasoConTransicion
    var body = document.getElementById('ts-body');
    if (body) { body.style.opacity = ''; body.style.transform = ''; body.style.transition = ''; }
    this.paso = 0;
    this._renderPaso();
  },

  // ts-cat-box: muestra la categoría y el bloque a usar en cada paso.
  // Se muestra u oculta dinámicamente en _renderPaso() según si el paso
  // tiene highlightCat o bloque. No eliminar.
  _bodyTpl: function () {
    return (
      '<div class="ts-step-header" id="ts-step-header">' +
      '  <span class="ts-step-num"  id="ts-step-num">1</span>' +
      '  <h3  class="ts-step-title" id="ts-step-title"></h3>' +
      '</div>' +
      '<p class="ts-step-desc" id="ts-step-desc"></p>' +
      '<div class="ts-cat-box" id="ts-cat-box">' +
      '  <div class="ts-cat-label">📂 Busca en el panel:</div>' +
      '  <div class="ts-cat-ruta"  id="ts-cat-ruta"></div>' +
      '  <div class="ts-bloque-row" id="ts-bloque-row">' +
      '    <span class="ts-bloque-icon">🧩</span>' +
      '    <span class="ts-bloque-chip" id="ts-bloque-chip"></span>' +
      '  </div>' +
      '</div>'
    );
  },


  _waitForCreateVariableButton: function () {
    const self = this;

    if (this._createVarObserver) {
      this._createVarObserver.disconnect();
    }

    // intentar inmediatamente por si ya existe
    const btnNow = highlightCreateVariableButton();
    if (btnNow) return;

    const blocklyDiv = document.getElementById("blocklyDiv");
    if (!blocklyDiv) return;

    let debounce;

    this._createVarObserver = new MutationObserver(() => {
      clearTimeout(debounce);

      debounce = setTimeout(() => {
        const btn = highlightCreateVariableButton();

        if (btn) {
          self._createVarObserver.disconnect();
          self._createVarObserver = null;
        }
      }, 100);
    });

    this._createVarObserver.observe(blocklyDiv, {
      childList: true,
      subtree: true
    });
  },
};

/* ─── DRAG (mouse + touch) ───────────────────────────────────── */
function _tsMakeDraggable(panel) {
  var header = panel.querySelector('.ts-header');
  if (!header) return;
  header.style.cursor = 'grab';
  var drag = false, sx, sy, ol, ot;

  function startDrag(clientX, clientY) {
    drag = true;
    sx = clientX; sy = clientY;
    var r = panel.getBoundingClientRect();
    ol = r.left; ot = r.top;
    panel.style.right = panel.style.bottom = 'auto';
    panel.style.left = ol + 'px'; panel.style.top = ot + 'px';
    header.style.cursor = 'grabbing';
  }

  function moveDrag(clientX, clientY) {
    if (!drag) return;
    panel.style.left = Math.max(0, ol + clientX - sx) + 'px';
    panel.style.top  = Math.max(48, ot + clientY - sy) + 'px';
  }

  function endDrag() {
    if (drag) { drag = false; header.style.cursor = 'grab'; }
  }

  /* ── Mouse ── */
  header.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('ts-close')) return;
    startDrag(e.clientX, e.clientY);
    e.preventDefault();
  });
  document.addEventListener('mousemove', function (e) { moveDrag(e.clientX, e.clientY); });
  document.addEventListener('mouseup', endDrag);

  /* ── Touch ── */
  header.addEventListener('touchstart', function (e) {
    if (e.target.classList.contains('ts-close')) return;
    if (e.touches.length !== 1) return;
    startDrag(e.touches[0].clientX, e.touches[0].clientY);
    /* NO preventDefault aquí para no bloquear el scroll del panel */
  }, { passive: true });

  header.addEventListener('touchmove', function (e) {
    if (!drag || e.touches.length !== 1) return;
    moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    e.preventDefault();   /* bloquea scroll del body solo mientras arrastra */
  }, { passive: false });

  header.addEventListener('touchend', endDrag, { passive: true });
  header.addEventListener('touchcancel', endDrag, { passive: true });
}

/* ─── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

  var panel = document.createElement('div');
  panel.id = 'ts-panel';
  panel.style.display = 'none';
  panel.innerHTML =
    '<div class="ts-header">' +
    '  <span class="ts-icon" id="ts-icon">📖</span>' +
    '  <div class="ts-title-group">' +
    '    <p class="ts-label">Tutorial guiado &nbsp;·&nbsp; <span class="ts-drag-hint">✥ arrastrar</span></p>' +
    '    <h2 class="ts-title" id="ts-title">—</h2>' +
    '  </div>' +
    '  <button class="ts-minimize" id="ts-minimize" title="Minimizar">−</button>' +
    '  <button class="ts-close" id="ts-close" title="Cerrar">✕</button>' +
    '</div>' +
    '<div class="ts-collapsible" id="ts-collapsible">' +
    '<div class="ts-size-bar">' +
    '  <span class="ts-size-label">🔠</span>' +
    '  <button class="ts-size-btn" id="ts-size-down" title="Reducir texto">−</button>' +
    '  <span class="ts-size-display" id="ts-size-display">M</span>' +
    '  <div class="ts-size-track" id="ts-size-track"><div class="ts-size-fill" id="ts-size-fill"></div></div>' +
    '  <button class="ts-size-btn" id="ts-size-up" title="Aumentar texto">+</button>' +
    '</div>' +
    '<div class="ts-progress-bar"><div class="ts-progress-fill" id="ts-progress-fill"></div></div>' +
    '<p class="ts-progress-txt" id="ts-progress-txt"></p>' +
    '<div class="ts-body" id="ts-body">' + TutorialSteps._bodyTpl() + '</div>' +
    '<div class="ts-footer">' +
    '  <button class="ts-btn ts-btn-sec"     id="ts-btn-prev">← Anterior</button>' +
    '  <button class="ts-btn-wiring" id="ts-btn-wiring" title="Ver conexiones eléctricas" style="display:none">🔌</button>' +
    '  <button class="ts-btn ts-btn-primary" id="ts-btn-next">Siguiente →</button>' +
    '</div>' +
    '</div>'; /* cierra ts-collapsible */

  document.body.appendChild(panel);

  document.getElementById('ts-close').addEventListener('click', function () { TutorialSteps.cerrar(); });
  document.getElementById('ts-btn-next').addEventListener('click', function () { TutorialSteps.siguiente(); });
  document.getElementById('ts-btn-prev').addEventListener('click', function () { TutorialSteps.anterior(); });

  // ── Minimizar / Maximizar ─────────────────────────────────────
  var tsMinimized = false;
  var tsMinBtn = document.getElementById('ts-minimize');
  var tsCollapsible = document.getElementById('ts-collapsible');

  function tsToggleMinimize() {
    tsMinimized = !tsMinimized;
    if (tsMinimized) {
      tsCollapsible.style.display = 'none';
      panel.setAttribute('data-minimized', '1');
      tsMinBtn.textContent = '□';
      tsMinBtn.title = 'Maximizar';
    } else {
      tsCollapsible.style.display = '';
      panel.removeAttribute('data-minimized');
      tsMinBtn.textContent = '−';
      tsMinBtn.title = 'Minimizar';
    }
  }

  tsMinBtn.addEventListener('click', tsToggleMinimize);
  // Doble clic en el header también minimiza/maximiza
  document.querySelector('#ts-panel .ts-header').addEventListener('dblclick', function (e) {
    if (e.target.classList.contains('ts-close') || e.target.classList.contains('ts-minimize')) return;
    tsToggleMinimize();
  });

  // ── Control de tamaño de texto ────────────────────────────────
  var TS_SIZES = ['S', 'M', 'L', 'XL'];
  var tsSizeIdx = 1; // M por defecto

  function tsApplySize() {
    var s = TS_SIZES[tsSizeIdx];
    panel.setAttribute('data-fs', s);
    document.getElementById('ts-size-display').textContent = s;
    // Barra de progreso del tamaño
    var fill = document.getElementById('ts-size-fill');
    if (fill) fill.style.width = (tsSizeIdx / (TS_SIZES.length - 1) * 100) + '%';
    // Guardar preferencia
    try { localStorage.setItem('ts-font-size', tsSizeIdx); } catch(e) {}
  }

  // Recuperar preferencia guardada
  try {
    var saved = parseInt(localStorage.getItem('ts-font-size'), 10);
    if (!isNaN(saved) && saved >= 0 && saved < TS_SIZES.length) tsSizeIdx = saved;
  } catch(e) {}
  tsApplySize();

  document.getElementById('ts-size-up').addEventListener('click', function () {
    if (tsSizeIdx < TS_SIZES.length - 1) { tsSizeIdx++; tsApplySize(); }
  });
  document.getElementById('ts-size-down').addEventListener('click', function () {
    if (tsSizeIdx > 0) { tsSizeIdx--; tsApplySize(); }
  });
  // Clic en la barra de progreso para saltar directo al tamaño
  document.getElementById('ts-size-track').addEventListener('click', function (e) {
    var rect = this.getBoundingClientRect();
    var ratio = (e.clientX - rect.left) / rect.width;
    tsSizeIdx = Math.round(ratio * (TS_SIZES.length - 1));
    tsSizeIdx = Math.max(0, Math.min(TS_SIZES.length - 1, tsSizeIdx));
    tsApplySize();
  });

  // ── Botón de conexiones (icono) en el panel tutorial ─────────
  document.getElementById('ts-btn-wiring').addEventListener('click', function () {
    var tut = TutorialSteps.tutorial;
    if (!tut || !tut.diagram) return;
    var base = (typeof TS_STATIC_URL !== 'undefined') ? TS_STATIC_URL : '/static/';
    var img = document.getElementById('wiringImg');
    var titleEl = document.getElementById('wiringTitle');
    if (img) img.src = base + tut.diagram;
    if (titleEl) titleEl.textContent = tut.title + ' — Conexiones eléctricas';
    if (typeof showView === 'function') showView('viewWiring');
    requestAnimationFrame(function () {
      if (window.wiringZoom) window.wiringZoom.center();
    });
  });

  // ── Botón de conexiones eléctricas (barra superior) ─────────
  var btnWiring = document.getElementById('btnWiring');
  if (btnWiring) {
    btnWiring.addEventListener('click', function () {
      var tut = TutorialSteps.tutorial;
      if (!tut || !tut.diagram) return;
      var base = (typeof TS_STATIC_URL !== 'undefined') ? TS_STATIC_URL : '/static/';
      var img = document.getElementById('wiringImg');
      var titleEl = document.getElementById('wiringTitle');
      if (img) img.src = base + tut.diagram;
      if (titleEl) titleEl.textContent = tut.title + ' — Conexiones eléctricas';
      if (typeof showView === 'function') showView('viewWiring');
      requestAnimationFrame(function () {
        if (window.wiringZoom) window.wiringZoom.center();
      });
    });
  }

  var sel = document.getElementById('tutorialSelect');
  if (sel) sel.addEventListener('change', function () { TutorialSteps.cargar(this.value); });

  _tsMakeDraggable(panel);
});

function highlightCreateVariableButton() {
  const buttons = document.querySelectorAll(".blocklyFlyoutButton");

  for (const btn of buttons) {
    const text = btn.textContent?.toLowerCase();

    console.log("Checking button:", text);

    if (
      text.includes("crear variable") ||
      text.includes("create variable")
    ) {
      const rect = btn.querySelector(".blocklyFlyoutButtonBackground");

      if (rect) {
        rect.classList.add("ts-block-glow");
      }

      btn.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      return btn;
    }
  }

  return null;
}