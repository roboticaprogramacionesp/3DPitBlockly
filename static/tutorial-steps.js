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
        titulo: "Conecta tu ESP32",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        waitForAction: "connect"
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
        titulo: "Conecta tu ESP32",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        waitForAction: "connect"
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
        titulo: "Conecta tu ESP32",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        waitForAction: "connect"
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
    title: "Botón Contador",
    icon: "🔘",
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
        desc: "Ve a <b>Lógica</b> y arrastra el bloque <em>no</em>. Conéctalo al bloque <em>leer Pin 0</em> para invertir la señal del botón (PULL_UP activo en bajo).",
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
        titulo: "Conecta tu ESP32",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        waitForAction: "connect"
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
        titulo: "Abre Actuadores › Sounds (Buzzer)",
        desc: "Expande <b>Actuadores</b> y selecciona <b>Sounds (Buzzer)</b>.",
        highlightCat: "Sounds (Buzzer)", expandCat: "Actuadores", bloque: null
      },
      {
        titulo: "Arrastra: Tono Buzzer",
        desc: "Arrastra el bloque <em>Reproducir tono (buzzer)</em>. Establece el Pin en <b>12</b> y elige una nota, por ejemplo <b>B2</b>.",
        highlightCat: "Sounds (Buzzer)", expandCat: "Actuadores", bloque: "buzzer_tone", bloqueLabel: "Reproducir tono (buzzer)"
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
        titulo: "Abre la categoría Actuadores",
        desc: "Haz clic en <b>Actuadores</b> en el panel de bloques para desplegarlo.",
        highlightCat: "Actuadores", expandCat: null, bloque: null
      },
      {
        titulo: "Detener el buzzer",
        desc: "Arrastra el bloque <em>Detener buzzer</em>. Establece el Pin en <b>12</b>. Esto corta el sonido.",
        highlightCat: "Sounds (Buzzer)", expandCat: "Actuadores", bloque: "buzzer_stop", bloqueLabel: "Detener buzzer"
      },
      {
        titulo: "Conecta tu ESP32",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        waitForAction: "connect"
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
        titulo: "Conecta tu ESP32",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        waitForAction: "connect"
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
        highlightCat: "Variables", highlightFlyoutButton: "create_variable", expandCat: null, bloque: null
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
        titulo: "Conecta tu ESP32",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        waitForAction: "connect"
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
        titulo: "Conecta tu ESP32",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        waitForAction: "connect"
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
        titulo: "Conecta tu ESP32",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        waitForAction: "connect"
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
        highlightCat: "Variables", highlightFlyoutButton: "create_variable", bloque: null
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
        titulo: "Conecta tu ESP32",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "El navegador mostrará los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        waitForAction: "connect"
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
        titulo: "Conecta tu ESP32",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "Elige el puerto correspondiente a tu ESP32 y presiona <b>Conectar</b>.",
        waitForAction: "connect"
      },
      {
        titulo: "Ejecuta tu programa",
        desc: "Haz clic en <b>Ejecutar</b> <span class='icon-btn icon-run'></span> para probar tu teclado ADC.",
        highlightElement: "#btnRun",
        waitForAction: "run"
      }
    ]
  },

  ir_ky022: {
    title: "Control Remoto IR (KY-022)", icon: "📺",
    steps: [
      {
        titulo: "¿Qué aprenderemos?",
        desc: "Vamos a usar el receptor infrarrojo <b>KY-022</b> para leer los botones de un control remoto. Cada botón envía un código numérico único que el ESP32 puede detectar y usar para encender LEDs, mover motores, ¡lo que imagines!",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conexión física del KY-022",
        desc: "Conecta el módulo KY-022 al ESP32 así:<br>📌 <b>S</b> (señal) → pin <b>15</b><br>⚡ <b>V</b> (voltaje) → 3.3V<br>⏚ <b>G</b> (tierra) → GND<br><br>El lado con el pequeño lente negro del sensor debe apuntar hacia el control remoto.",
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
        titulo: "Conecta tu ESP32",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "El navegador mostrará una ventana con los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        waitForAction: "connect"
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
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> dentro de la sección <b>hacer</b>. Conecta el bloque <em>obtener host</em> desde Variables.",
        highlightCat: "Textos", expandCat: null, bloque: "text_print"
      },
      {
        titulo: "Dentro del Si: imprimir msg",
        desc: "Arrastra otro bloque <em>imprimir</em> debajo. Conecta <em>obtener msg</em> desde <b>Variables</b>.",
        highlightCat: "Textos", expandCat: null, bloque: "text_print"
      },
      {
        titulo: "Conecta tu ESP32 receptor",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32 receptor.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "El navegador mostrará los puertos disponibles. Elige el de tu ESP32 receptor y presiona <b>Conectar</b>.",
        waitForAction: "connect"
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
        titulo: "Conecta tu ESP32 emisor",
        desc: "Asegúrate de que el receptor ya está ejecutando. Conecta ahora el ESP32 emisor: haz clic en <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona su puerto.",
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
        titulo: "Conecta tu ESP32",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "El navegador mostrará los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        waitForAction: "connect"
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
    steps: [
      {
        titulo: "¿Qué es Bluetooth LE?",
        desc: "<b>Bluetooth Low Energy (BLE)</b> permite comunicación inalámbrica de bajo consumo. Usaremos el patrón <b>BLEUART</b> que emula un puerto serial sobre BLE. Al terminar generaremos código como:<br><pre>ble = bluetooth.BLE()\nuart = BLEUART(ble, \"ESP32-BLE\")\nuart.irq(handler=datos_recibidos)</pre>",
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
        titulo: "Abre: BLE",
        desc: "Dentro de <b>Comunicación Inalambrica</b>, selecciona la subcategoría <b>BLE</b> para ver sus bloques.",
        highlightCat: "BLE", expandCat: "Comunicación Inalambrica", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar BLE (bluetooth.BLE)",
        desc: "Arrastra el bloque <em>Inicializar BLE</em> al área de trabajo. Crea la instancia del hardware BLE del ESP32. Va al inicio, antes de cualquier otro bloque BLE.",
        highlightCat: "BLE", expandCat: "Comunicación Inalambrica",
        bloque: "ble_init_uart", bloqueLabel: "Inicializar BLE"
      },
      {
        titulo: "Arrastra: Establecer nombre BLE (BLEUART)",
        desc: "Arrastra el bloque <em>Establecer nombre BLE</em>. Escribe el nombre con el que aparecerá en el celular, por ejemplo <b>ESP32-BLE</b>.",
        highlightCat: "BLE", expandCat: "Comunicación Inalambrica",
        bloque: "ble_set_name", bloqueLabel: "Establecer nombre BLE"
      },
      {
        titulo: "Define la función de callback",
        desc: "Necesitamos una función que se ejecute cuando lleguen datos. Ve a <b>Funciones</b> (o <b>Procedimientos</b>) y crea una función llamada <b>datos_recibidos</b>. Dentro coloca los bloques para leer y mostrar los datos.",
        highlightCat: "Funciones", expandCat: null, bloque: "procedures_defnoreturn", bloqueLabel: "definir función"
      },
      {
        titulo: "Dentro de la función: Leer datos BLE",
        desc: "Ve a <b>Comunicación Inalambrica</b> → <b>BLE</b> y arrastra el bloque <em>Leer datos BLE</em> dentro de la función. Devuelve los bytes recibidos del celular.",
        highlightCat: "BLE", expandCat: "Comunicación Inalambrica",
        bloque: "ble_read", bloqueLabel: "Leer datos BLE"
      },
      {
        titulo: "Dentro de la función: Imprimir datos recibidos",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em> dentro de la función. Conecta el bloque <em>Leer datos BLE</em> dentro del imprimir para ver en el monitor serial lo que llega del celular.",
        highlightCat: "Textos", expandCat: null, bloque: "text_print", bloqueLabel: "imprimir"
      },
      {
        titulo: "Dentro de la función: Responder al celular",
        desc: "Ve a <b>Comunicación Inalambrica</b> → <b>BLE</b> y arrastra el bloque <em>Enviar datos BLE</em>. Escribe el texto de respuesta, por ejemplo <b>Datos recibidos</b>.",
        highlightCat: "BLE", expandCat: "Comunicación Inalambrica",
        bloque: "ble_write", bloqueLabel: "Enviar datos BLE"
      },
      {
        titulo: "Arrastra: Registrar callback (uart.irq)",
        desc: "Ve a <b>Comunicación Inalambrica</b> → <b>BLE</b> y arrastra el bloque <em>Al recibir datos BLE</em>. En el campo <b>función</b> escribe <b>datos_recibidos</b>. Esto conecta tu función al evento de recepción.",
        highlightCat: "BLE", expandCat: "Comunicación Inalambrica",
        bloque: "ble_on_receive", bloqueLabel: "Al recibir datos BLE"
      },
      {
        titulo: "Instala una app BLE en tu celular",
        desc: "Descarga la app <b>nRF Connect</b> (Android/iOS) o <b>Serial Bluetooth Terminal</b> con soporte BLE. Abre la app, busca el dispositivo <b>ESP32-BLE</b> y conéctate. Podrás enviar y recibir texto.",
        highlightCat: null, bloque: null
      },
      {
        titulo: "Conecta tu ESP32",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "El navegador mostrará los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        waitForAction: "connect"
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
        titulo: "Selecciona la subcategoría DHT",
        desc: "Dentro de <b>Sensores → Sensores Digitales</b>, haz clic en <b>DHT</b> para ver los bloques del sensor de temperatura y humedad.",
        highlightCat: "DHT", expandCat: "Sensores", bloque: null
      },
      {
        titulo: "Arrastra: Inicializar DHT",
        desc: "Arrastra el bloque <em>Preparar sensor DHT</em> al área de trabajo. Selecciona el modelo <b>DHT11</b> (o DHT22 si tienes ese) y el pin <b>4</b>. Este bloque va <b>una sola vez</b> al inicio del programa.",
        highlightCat: "DHT", expandCat: "Sensores",
        bloque: "dht_init", bloqueLabel: "Preparar sensor DHT"
      },
      {
        titulo: "Crea las variables: temp y hum",
        desc: "Ve a <b>Variables</b> y crea dos variables: <b>temp</b> (temperatura) y <b>hum</b> (humedad). Las usaremos para guardar las lecturas del sensor.",
        highlightCat: "Variables", highlightFlyoutButton: "create_variable", bloque: null
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. El sensor leerá continuamente temperatura y humedad dentro de este ciclo.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: medir el sensor",
        desc: "Ve a <b>Sensores → Sensores Digitales → DHT</b> y arrastra el bloque <em>Medir DHT</em> como <b>primer bloque dentro del ciclo</b>. Este comando dispara la lectura; sin él los valores de temperatura y humedad no se actualizan.",
        highlightCat: "DHT", expandCat: "Sensores",
        bloque: "dht_measure", bloqueLabel: "Medir DHT"
      },
      {
        titulo: "Guardar temperatura",
        desc: "Ve a <b>Variables</b> y arrastra <em>establecer temp a</em> justo después del bloque <em>Medir DHT</em>. Luego ve a <b>Sensores → DHT</b> y conecta el bloque <em>Leer temperatura DHT</em> (pin <b>4</b>) al espacio vacío.",
        highlightCat: "Variables",
        bloque: "variables_set", bloqueLabel: "establecer temp a"
      },
      {
        titulo: "Guardar humedad",
        desc: "Arrastra otro bloque <em>establecer hum a</em> debajo. Conecta el bloque <em>Leer humedad DHT</em> (pin <b>4</b>) desde <b>Sensores → DHT</b>.",
        highlightCat: "DHT", expandCat: "Sensores",
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
        titulo: "Conecta tu ESP32",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "El navegador mostrará los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        waitForAction: "connect"
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
        titulo: "Selecciona la subcategoría KY-001",
        desc: "Dentro de <b>Sensores → Sensores Digitales</b>, haz clic en <b>KY-001</b> para ver los bloques del sensor de temperatura DS18B20.",
        highlightCat: "KY-001", expandCat: "Sensores", bloque: null
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
        highlightCat: "Variables", highlightFlyoutButton: "create_variable", bloque: null
      },
      {
        titulo: "Escanear sensores en el bus",
        desc: "Ve a <b>Variables</b> y arrastra el bloque <em>establecer roms a</em>. Luego ve a <b>Sensores → Sensores Digitales → KY-001</b> y arrastra el bloque <em>Escanear sensores DS18B20</em> (pin <b>4</b>). Conéctalo al espacio vacío.",
        highlightCat: "KY-001", expandCat: "Sensores",
        bloque: "ky001_scan", bloqueLabel: "Escanear sensores DS18B20"
      },
      {
        titulo: "Crea la variable: temperatura",
        desc: "Ve a <b>Variables</b> y haz clic en <b>Crear variable</b>. Escribe el nombre <b>temperatura</b> y confirma. Guardará el valor leído del sensor en cada ciclo.",
        highlightCat: "Variables", highlightFlyoutButton: "create_variable", bloque: null
      },
      {
        titulo: "Agrega un ciclo infinito",
        desc: "Ve a <b>Ciclos</b> y arrastra el bloque <em>repetir mientras … Verdadero</em>. Todo el proceso de lectura irá dentro de este ciclo.",
        highlightCat: "Ciclos",
        bloque: "controls_whileUntil", bloqueLabel: "repetir mientras Verdadero"
      },
      {
        titulo: "Dentro del ciclo: convertir temperatura",
        desc: "Ve a <b>Sensores → Sensores Digitales → KY-001</b> y arrastra el bloque <em>Convertir temperatura DS18B20</em> (pin <b>4</b>) como <b>primer bloque dentro del ciclo</b>. Este comando ordena al sensor que tome la medición; sin él la lectura siempre dará el mismo valor.",
        highlightCat: "KY-001", expandCat: "Sensores",
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
        desc: "Ve a <b>Sensores → Sensores Digitales → KY-001</b> y arrastra el bloque <em>Leer temperatura DS18B20</em> (pin <b>4</b>, índice <b>0</b> para el primer sensor). Conéctalo al espacio vacío del bloque <em>establecer temperatura a</em>.",
        highlightCat: "KY-001", expandCat: "Sensores",
        bloque: "ky001_read_index", bloqueLabel: "Leer temperatura DS18B20"
      },
      {
        titulo: "Imprime el resultado",
        desc: "Ve a <b>Textos</b> y arrastra el bloque <em>imprimir</em>. Usa un bloque <em>crear texto con</em> para unir el texto <b>'Temperatura: '</b> con la variable <b>temperatura</b> y <b>' °C'</b> al final.",
        highlightCat: "Textos",
        bloque: "text_print", bloqueLabel: "imprimir"
      },
      {
        titulo: "Conecta tu ESP32",
        desc: "Haz clic en el botón <b>Conectar</b> <span class='icon-btn icon-disconnect'></span> y selecciona el puerto serial de tu ESP32.",
        highlightElement: "#btnConnection"
      },
      {
        titulo: "Selecciona tu puerto",
        desc: "El navegador mostrará los puertos disponibles. Elige el de tu ESP32 y presiona <b>Conectar</b>.",
        waitForAction: "connect"
      },
      {
        titulo: "¡Ejecuta y prueba!",
        desc: "Haz clic en <b>Ejecutar</b> <span class=\"icon-btn icon-run\"></span>. En el monitor serial verás la temperatura en °C actualizándose cada segundo. Toca el sensor con los dedos y observa cómo sube el valor. 🌡️",
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

  /* ── API pública ─────────────────────────────────────────── */
  cargar: function (id) {
    if (!id) { this.cerrar(); return; }
    var tut = TUTORIALS[id];
    if (!tut) return;
    this.tutorial = tut;
    this.paso = 0;
    document.getElementById('ts-panel').style.display = 'flex';
    // Restaurar botones por si el tutorial anterior terminó en _mostrarFin
    var btnNext = document.getElementById('ts-btn-next');
    var btnPrev = document.getElementById('ts-btn-prev');
    if (btnNext) btnNext.style.display = '';
    if (btnPrev) btnPrev.style.display = '';
    // Restaurar body si fue reemplazado por pantalla de fin
    if (!document.getElementById('ts-step-num')) {
      document.getElementById('ts-body').innerHTML = this._bodyTpl();
    }
    this._renderPaso();
  },

  siguiente: function () {
    if (!this.tutorial) return;
    if (this.paso < this.tutorial.steps.length - 1) {
      this.paso++;
      this._renderPaso();
    } else {
      this._mostrarFin();
    }
  },

  anterior: function () {
    if (!this.tutorial || this.paso === 0) return;
    this.paso--;
    this._renderPaso();
  },

  cerrar: function () {
    this._limpiarTodo();
    this.tutorial = null;
    this.paso = 0;
    var panel = document.getElementById('ts-panel');
    if (panel) panel.style.display = 'none';
    var sel = document.getElementById('tutorialSelect');
    if (sel) sel.value = '';
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

    // Animación
    var body = document.getElementById('ts-body');
    body.classList.remove('ts-anim');
    void body.offsetWidth;
    body.classList.add('ts-anim');

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
  },

  /* Convierte string | objeto | array mixto → array de { tipo, valor? } */
  _normalizarBloques: function (bloque) {
    var arr = Array.isArray(bloque) ? bloque : [bloque];
    return arr.map(function (b) {
      if (typeof b === 'string') return { tipo: b };
      return b;
    });
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
      });
    });
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
  },

  _reiniciar: function () {
    document.getElementById('ts-btn-next').style.display = '';
    document.getElementById('ts-btn-prev').style.display = '';
    document.getElementById('ts-body').innerHTML = TutorialSteps._bodyTpl();
    this.paso = 0;
    this._renderPaso();
  },

  // ts-cat-box: muestra la categoría y el bloque a usar en cada paso.
  // Se muestra u oculta dinámicamente en _renderPaso() según si el paso
  // tiene highlightCat o bloque. No eliminar.
  _bodyTpl: function () {
    return (
      '<div class="ts-step-header">' +
      '  <span class="ts-step-num"  id="ts-step-num">1</span>' +
      '  <h3  class="ts-step-title" id="ts-step-title"></h3>' +
      '</div>' +
      '<p class="ts-step-desc" id="ts-step-desc"></p>' +
      '<div class="ts-cat-box" id="ts-cat-box">' +
      '  <div class="ts-cat-label">📂 Busca en el panel:</div>' +
      '  <div class="ts-cat-ruta"  id="ts-cat-ruta"></div>' +
      '  <div class="ts-bloque-row" id="ts-bloque-row" style="display:none">' +
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

/* ─── DRAG ───────────────────────────────────────────────────── */
function _tsMakeDraggable(panel) {
  var header = panel.querySelector('.ts-header');
  if (!header) return;
  header.style.cursor = 'grab';
  var drag = false, sx, sy, ol, ot;
  header.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('ts-close')) return;
    drag = true; sx = e.clientX; sy = e.clientY;
    var r = panel.getBoundingClientRect();
    ol = r.left; ot = r.top;
    panel.style.right = panel.style.bottom = 'auto';
    panel.style.left = ol + 'px'; panel.style.top = ot + 'px';
    header.style.cursor = 'grabbing';
    e.preventDefault();
  });
  document.addEventListener('mousemove', function (e) {
    if (!drag) return;
    panel.style.left = Math.max(0, ol + e.clientX - sx) + 'px';
    panel.style.top = Math.max(48, ot + e.clientY - sy) + 'px';
  });
  document.addEventListener('mouseup', function () {
    if (drag) { drag = false; header.style.cursor = 'grab'; }
  });
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
    '  <button class="ts-close" id="ts-close" title="Cerrar">✕</button>' +
    '</div>' +
    '<div class="ts-progress-bar"><div class="ts-progress-fill" id="ts-progress-fill"></div></div>' +
    '<p class="ts-progress-txt" id="ts-progress-txt"></p>' +
    '<div class="ts-body" id="ts-body">' + TutorialSteps._bodyTpl() + '</div>' +
    '<div class="ts-footer">' +
    '  <button class="ts-btn ts-btn-sec"     id="ts-btn-prev">← Anterior</button>' +
    '  <button class="ts-btn ts-btn-primary" id="ts-btn-next">Siguiente →</button>' +
    '</div>';

  document.body.appendChild(panel);

  document.getElementById('ts-close').addEventListener('click', function () { TutorialSteps.cerrar(); });
  document.getElementById('ts-btn-next').addEventListener('click', function () { TutorialSteps.siguiente(); });
  document.getElementById('ts-btn-prev').addEventListener('click', function () { TutorialSteps.anterior(); });

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