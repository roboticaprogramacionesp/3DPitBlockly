/* ================================================================
   tutorial-extras-datos.js — Contenido extra de los tutoriales ESP32
   ----------------------------------------------------------------
   Por tutorial:
     n     nivel (1 básico · 2 intermedio · 3 avanzado)
     t     minutos aproximados
     dato  "¿Sabías que…?" (se muestra al probar el programa)
     exp   "¿Qué está pasando?" (cómo funciona por dentro)
     usos  aplicaciones reales (pantalla final)
     retos [reto, pista]
     quiz  [pregunta, [opciones], índice correcto, por qué]
     con   clave de TUTORIAL_CONCEPTOS (solo los inalámbricos)
   Es contenido oficial (HTML confiable), no de tutoriales compartidos.
================================================================ */
var TUTORIAL_EXTRAS = {

  /* ── LEDs y salidas ─────────────────────────────────────────── */
  led_basico: {
    n: 1, t: 10,
    dato: "La palabra <b>LED</b> viene de <em>Light Emitting Diode</em> (diodo emisor de luz). Un LED gasta hasta 10 veces menos energía que un foco de filamento y puede durar más de 25,000 horas.",
    exp: "El bloque <em>Preparar LED</em> configura el pin 2 como <b>salida</b>. Cuando le dices <em>Encender</em>, el ESP32 pone <b>3.3 V</b> en ese pin y la corriente pasa por el LED; con <em>Apagar</em> pone <b>0 V</b> y la luz se apaga. Es la idea básica de toda la electrónica digital: <b>1 = hay voltaje, 0 = no hay</b>.",
    usos: ["Indicadores de encendido en aparatos", "Luces de aviso en tableros de autos", "Señales de estado en robots"],
    retos: [
      ["Cambia el programa para que el LED quede <b>apagado</b>.", "Usa el mismo bloque, pero elige <b>Apagar</b>."],
      ["Conecta un LED externo en otro pin (por ejemplo el 4) y enciéndelo.", "Cambia el pin en <em>Preparar LED</em> y no olvides la resistencia de 220 Ω."]
    ],
    quiz: [
      ["¿Qué voltaje pone el ESP32 en el pin cuando enciende el LED?", ["0 V", "3.3 V", "127 V"], 1, "El ESP32 trabaja a 3.3 V: un 1 lógico son 3.3 V."],
      ["¿Para qué sirve la resistencia de 220 Ω con un LED externo?", ["Para que brille más", "Para limitar la corriente y no quemarlo", "Para que parpadee"], 1, "Sin resistencia pasa demasiada corriente y el LED (o el pin) se puede dañar."]
    ]
  },

  led_infinito: {
    n: 1, t: 15,
    dato: "Tu ojo deja de ver el parpadeo cuando un LED prende y apaga más de unas <b>50 veces por segundo</b>: lo ves encendido fijo. Así funcionan muchas pantallas y luces de LED.",
    exp: "El ciclo <em>repetir mientras Verdadero</em> nunca termina, así que el ESP32 repite para siempre: encender, esperar, apagar, esperar. Los bloques <em>esperar</em> son clave: sin ellos el LED cambiaría tan rápido que no verías nada.",
    usos: ["Luces intermitentes de autos", "Faros y antenas con luz de aviso", "Indicador de \"estoy funcionando\" en aparatos"],
    retos: [
      ["Haz que el LED parpadee <b>el doble de rápido</b>.", "Divide entre 2 los segundos de los dos bloques <em>esperar</em>."],
      ["Haz un parpadeo tipo <b>latido</b>: dos destellos rápidos y una pausa larga.", "Repite encender/apagar dos veces con esperas cortas y al final una espera larga."],
      ["Manda <b>SOS</b> en código Morse (··· ––– ···).", "Punto = 0.2 s encendido, raya = 0.6 s encendido."]
    ],
    quiz: [
      ["¿Qué pasa si quitas los bloques <em>esperar</em>?", ["El LED parpadea tan rápido que parece fijo", "El ESP32 se apaga", "El LED se queda apagado"], 0, "Cambia miles de veces por segundo y tu ojo lo ve encendido."],
      ["¿Cuántas veces se repite un ciclo <em>mientras Verdadero</em>?", ["Una vez", "10 veces", "Para siempre"], 2, "La condición siempre es verdadera, así que nunca termina."]
    ]
  },

  semaforo: {
    n: 1, t: 20,
    dato: "El primer semáforo eléctrico se instaló en <b>1914 en Cleveland, EE. UU.</b> Solo tenía luces roja y verde; el amarillo llegó años después para avisar el cambio.",
    exp: "El programa es una <b>secuencia</b>: cada bloque <em>Cambiar estado</em> enciende una luz y el <em>esperar</em> que le sigue decide cuánto dura. Como todo está dentro de un ciclo infinito, el semáforo vuelve a empezar solo.",
    usos: ["Control de tráfico", "Semáforos peatonales", "Señales de \"pase / espere\" en estacionamientos"],
    retos: [
      ["Haz que el verde dure el doble que el rojo.", "Cambia el número del <em>esperar</em> que va después del verde."],
      ["Agrega un <b>verde parpadeante</b> antes del amarillo, como en muchas calles.", "Usa un ciclo <em>repetir 3 veces</em> que prenda y apague el verde."]
    ],
    quiz: [
      ["¿Qué bloque decide cuánto tiempo dura cada luz?", ["Preparar semáforo", "esperar", "repetir mientras"], 1, "La luz se queda así hasta que termina el <em>esperar</em>."],
      ["¿Por qué el semáforo se repite solo?", ["Porque está dentro de un ciclo infinito", "Porque el ESP32 se reinicia", "Porque lo vuelves a ejecutar"], 0, "El ciclo <em>mientras Verdadero</em> repite la secuencia para siempre."]
    ]
  },

  neopixel_basico: {
    n: 2, t: 20,
    dato: "Cada NeoPixel tiene <b>tres LEDs diminutos</b> (rojo, verde y azul) y un chip. Mezclando 256 niveles de cada uno se forman más de <b>16 millones de colores</b>.",
    exp: "El ESP32 manda por un solo cable una fila de números: el color del LED 0, del LED 1, del 2… Cada LED se queda con su color y pasa el resto al siguiente. Por eso necesitas <em>Actualizar LEDs</em>: hasta ese momento los colores solo están guardados en la memoria del ESP32.",
    usos: ["Tiras decorativas y luces de ambiente", "Indicadores de nivel (batería, volumen)", "Disfraces y wearables que cambian de color"],
    retos: [
      ["Pinta los primeros 3 LEDs de rojo, verde y azul.", "Un bloque <em>Establecer color</em> por LED (0, 1 y 2) y al final <em>Actualizar</em>."],
      ["Haz un <b>arcoíris</b> que recorra la tira.", "Usa un ciclo <em>contar</em> para el número de LED y cambia el color en cada vuelta."]
    ],
    quiz: [
      ["¿Qué pasa si olvidas el bloque <em>Actualizar LEDs</em>?", ["Los LEDs no cambian", "Se queman", "Se ponen blancos"], 0, "Los colores se guardan en memoria y solo se envían al actualizar."],
      ["¿Qué colores se mezclan para formar los demás?", ["Rojo, amarillo y azul", "Rojo, verde y azul", "Blanco y negro"], 1, "Es el modelo <b>RGB</b>: Red, Green, Blue."]
    ]
  },

  /* ── Entradas ───────────────────────────────────────────────── */
  boton: {
    n: 2, t: 25,
    dato: "Al presionar un botón, el metal <b>rebota</b> unas cuantas veces en milésimas de segundo. Sin una pequeña espera, el ESP32 podría contar varias pulsaciones con un solo toque.",
    exp: "El modo <b>PULL_UP</b> hace que el pin lea 1 mientras no presionas y 0 cuando presionas. El programa guarda el estado anterior y solo suma cuando el botón <b>cambia</b> de suelto a presionado; así cada pulsación cuenta una sola vez.",
    usos: ["Contadores de personas o piezas", "Timbres y botones de pánico", "Controles de videojuegos"],
    retos: [
      ["Haz que el contador vuelva a 0 al llegar a 10.", "Agrega un <em>si contador = 10</em> que lo regrese a 0."],
      ["Enciende el LED del pin 2 cuando el contador sea par.", "Usa el bloque de <b>residuo</b> (contador ÷ 2) y compara con 0."]
    ],
    quiz: [
      ["Con PULL_UP, ¿qué lee el pin al presionar el botón?", ["1", "0", "3.3"], 1, "El botón une el pin con GND, por eso lee 0."],
      ["¿Por qué se usa una pequeña espera en el ciclo?", ["Para evitar contar los rebotes", "Para ahorrar batería", "Para que el LED brille"], 0, "Los rebotes del contacto duran milésimas de segundo."]
    ]
  },

  infrarrojo_basico: {
    n: 1, t: 15,
    dato: "Los robots seguidores de línea de las competencias usan entre 2 y 8 sensores como este para saber si van <b>centrados</b> sobre la línea negra.",
    exp: "El sensor tiene un LED infrarrojo y un receptor. Lo blanco <b>refleja</b> la luz y el receptor la detecta (1); lo negro la <b>absorbe</b> y no regresa nada (0). El ESP32 solo lee si el pin está en 0 o en 1.",
    usos: ["Robots seguidores de línea", "Contadores de objetos en bandas", "Detectores de borde para que un robot no se caiga de la mesa"],
    retos: [
      ["Enciende el LED del pin 2 cuando el sensor vea negro.", "Usa <em>si ir_valor = 0</em> → encender, si no → apagar."],
      ["Cuenta cuántas veces pasa una línea negra por debajo del sensor.", "Como en el botón: suma solo cuando cambie de 1 a 0."]
    ],
    quiz: [
      ["¿Por qué el sensor lee 0 sobre negro?", ["El negro absorbe la luz infrarroja", "El negro está más frío", "El negro es metálico"], 0, "No regresa luz al receptor."],
      ["¿Para qué sirve el potenciómetro del módulo?", ["Para cambiar el color", "Para ajustar la sensibilidad", "Para encenderlo"], 1, "Ajusta a partir de cuánta luz reflejada cambia la salida."]
    ]
  },

  analogico_adkey: {
    n: 2, t: 30,
    dato: "Muchos estéreos de auto usan este mismo truco: <b>un solo cable</b> para todos los botones del volante, cada uno con una resistencia distinta.",
    exp: "Cada botón forma un <b>divisor de voltaje</b> diferente, así que el pin recibe un voltaje distinto según la tecla. El ESP32 lo convierte en un número de 0 a 4095 (ADC) y tus bloques <em>si</em> revisan en qué rango cae para saber qué botón fue.",
    usos: ["Controles de volante en autos", "Menús de aparatos con pocos pines", "Paneles de control de robots"],
    retos: [
      ["Enciende el LED del pin 2 solo con el primer botón.", "Usa el mismo rango que ya tienes para ese botón."],
      ["Haz que cada botón toque una nota distinta con el buzzer.", "Combina este tutorial con el de Buzzer."]
    ],
    quiz: [
      ["¿Qué rango de números da el ADC del ESP32?", ["0 a 1", "0 a 100", "0 a 4095"], 2, "Es un ADC de 12 bits: 2¹² = 4096 valores."],
      ["¿Por qué se comparan rangos y no un número exacto?", ["Porque la lectura varía un poco", "Porque es más rápido", "Porque el ADC solo da pares"], 0, "Siempre hay pequeñas variaciones de voltaje."]
    ]
  },

  /* ── Sonido y movimiento ───────────────────────────────────── */
  buzzer: {
    n: 1, t: 15,
    dato: "El oído humano escucha desde unos <b>20 Hz hasta 20,000 Hz</b>. La nota La que usan los músicos para afinar es de <b>440 Hz</b>.",
    exp: "El ESP32 prende y apaga el pin muy rápido (<b>PWM</b>). Cada vez la placa del buzzer vibra, y esas vibraciones mueven el aire: eso es el sonido. La <b>frecuencia</b> (Hz) es cuántas vibraciones hay por segundo: más alta = sonido más agudo.",
    usos: ["Alarmas y despertadores", "Avisos de microondas y lavadoras", "Sensores de reversa en autos"],
    retos: [
      ["Toca <b>Do-Re-Mi</b> (262, 294 y 330 Hz).", "Un bloque <em>tono</em> + <em>esperar</em> por nota."],
      ["Haz una <b>sirena</b> que suba y baje de tono.", "Usa un ciclo <em>contar de 400 a 1000</em> y usa la variable como frecuencia."]
    ],
    quiz: [
      ["¿Qué pasa si subes la frecuencia?", ["El sonido es más grave", "El sonido es más agudo", "Suena más fuerte"], 1, "Más vibraciones por segundo = sonido más agudo."],
      ["¿Qué hace el bloque <em>Detener buzzer</em>?", ["Apaga el sonido", "Reinicia el ESP32", "Baja el volumen"], 0, "Deja de mandar la señal PWM."]
    ]
  },

  servo: {
    n: 1, t: 15,
    dato: "Dentro de un servo hay un motor, engranes y un <b>potenciómetro</b> que mide en qué ángulo está el eje. Así el servo se corrige solo hasta llegar a la posición exacta.",
    exp: "El ESP32 manda un pulso cada 20 milisegundos. El <b>ancho</b> del pulso indica el ángulo: más o menos 0.5 ms = 0° y 2.5 ms = 180°. El circuito del servo compara ese ángulo con el de su eje y mueve el motor hasta igualarlo.",
    usos: ["Brazos robóticos", "Timones y alerones de aviones a escala", "Plumas de estacionamiento y compuertas"],
    retos: [
      ["Haz que el servo vaya de 0° a 180° y regrese.", "Dos bloques <em>Mover</em> con un <em>esperar</em> de 1 s entre ellos."],
      ["Haz un <b>limpiaparabrisas</b> suave, de grado en grado.", "Ciclo <em>contar de 0 a 180</em> con una espera corta, y otro de 180 a 0."]
    ],
    quiz: [
      ["¿Cuántos grados puede girar un servo SG90?", ["90°", "180°", "360° sin parar"], 1, "Se mueve a posiciones entre 0° y 180°."],
      ["¿Qué indica al servo a qué ángulo ir?", ["El voltaje de alimentación", "El ancho del pulso", "El color del cable"], 1, "Pulsos más anchos = ángulos más grandes."]
    ]
  },

  stepper_motor: {
    n: 2, t: 15,
    dato: "El 28BYJ-48 necesita unos <b>2048 pasos</b> para dar una vuelta completa: cada paso mueve el eje apenas 0.18°.",
    exp: "El motor tiene 4 bobinas. El driver ULN2003 las activa <b>una tras otra</b> en orden, y cada vez el imán del eje avanza un pasito hacia la bobina activa. Contando pasos, el ESP32 sabe exactamente cuánto giró sin necesitar sensor.",
    usos: ["Impresoras 3D y CNC", "Relojes y cámaras que giran", "Dispensadores de comida para mascotas"],
    retos: [
      ["Gira una vuelta completa (360°) y luego regresa.", "Usa <em>girar grados</em> con 360 y luego con -360."],
      ["Haz un <b>reloj</b>: avanza 6° cada segundo.", "Ciclo infinito con <em>girar 6 grados</em> y <em>esperar 1 s</em>."]
    ],
    quiz: [
      ["¿Qué ventaja tiene un motor paso a paso?", ["Gira muy rápido", "Se mueve en pasos exactos", "No necesita energía"], 1, "Ideal cuando importa la precisión."],
      ["¿Para qué sirve el driver ULN2003?", ["Da la corriente que el ESP32 no puede dar a las bobinas", "Mide la temperatura", "Guarda el programa"], 0, "Los pines del ESP32 no aguantan la corriente del motor."]
    ]
  },

  puente_h: {
    n: 2, t: 25,
    dato: "Se llama <b>puente H</b> porque sus 4 interruptores, dibujados alrededor del motor, forman la letra <b>H</b>.",
    exp: "Para que un motor DC cambie de sentido hay que <b>invertir</b> la corriente. El L298N lo hace con interruptores electrónicos: con IN1=1, IN2=0 gira hacia un lado; con IN1=0, IN2=1, al revés. La energía viene de las pilas, no del ESP32.",
    usos: ["Carritos y robots con ruedas", "Puertas y persianas eléctricas", "Bandas transportadoras"],
    retos: [
      ["Haz que el carrito gire sobre su eje (una rueda adelante, otra atrás).", "Motor A adelante y motor B atrás al mismo tiempo."],
      ["Programa una ruta: adelante 2 s, gira, adelante 2 s.", "Encadena los movimientos con bloques <em>esperar</em>."]
    ],
    quiz: [
      ["¿Cómo se cambia el sentido de giro de un motor DC?", ["Invirtiendo la corriente", "Subiendo el voltaje", "Con un servo"], 0, "El puente H invierte la polaridad."],
      ["¿Por qué los motores usan las pilas y no el ESP32?", ["Porque consumen mucha más corriente", "Porque el ESP32 no tiene GND", "Porque es más bonito"], 0, "Un motor puede pedir cientos de mA; un pin del ESP32, unos 20 mA."]
    ]
  },

  relevador: {
    n: 2, t: 20,
    dato: "El \"clic\" que escuchas es una <b>pieza de metal real</b> moviéndose: dentro del relevador hay un electroimán que jala un interruptor.",
    exp: "El ESP32 solo activa una pequeña bobina (el <b>electroimán</b>). Ese imán mueve un contacto que cierra el circuito del foco. Así el ESP32 controla 127 V <b>sin que esa corriente pase por él</b>: los dos circuitos están separados.",
    usos: ["Domótica: prender luces y ventiladores", "Bombas de agua y riego automático", "Cerraduras eléctricas"],
    retos: [
      ["Haz que el foco prenda 5 s cada minuto.", "Ciclo infinito: encender, esperar 5, apagar, esperar 55."],
      ["Prende el foco solo cuando presiones un botón.", "Combina con el tutorial del Botón."]
    ],
    quiz: [
      ["¿Qué hay dentro de un relevador?", ["Un electroimán y un interruptor", "Una batería", "Un LED"], 0, "El imán mueve el contacto: de ahí el clic."],
      ["¿Por qué hay que armarlo desconectado y con un adulto?", ["Porque 127 V es peligroso", "Porque el ESP32 se calienta", "Porque el foco es frágil"], 0, "La corriente de la casa puede causar descargas graves."]
    ]
  },

  /* ── Infrarrojo ─────────────────────────────────────────────── */
  ir_ky022: {
    n: 2, t: 15, con: "ir",
    dato: "La cámara de tu celular <b>sí ve la luz infrarroja</b>: apunta un control remoto a la cámara, presiona un botón y verás el LED parpadear.",
    exp: "El receptor solo hace caso a luz infrarroja que parpadea a <b>38,000 veces por segundo</b> (38 kHz); así ignora el sol y los focos. El control manda los bits como ráfagas cortas y largas, y el bloque las convierte en un número: el <b>código</b> de cada botón.",
    usos: ["Controles de TV y aire acondicionado", "Robots controlados a distancia", "Encender luces con un control viejo"],
    retos: [
      ["Enciende el LED del pin 2 con un botón y apágalo con otro.", "Compara <em>codigo_ir</em> con los códigos que anotaste."],
      ["Mueve un servo a 0°, 90° o 180° con tres botones.", "Combina con el tutorial del Servo."]
    ],
    quiz: [
      ["¿Por qué el receptor no se confunde con la luz del sol?", ["Solo hace caso a luz que parpadea a 38 kHz", "Porque el sol no tiene infrarrojo", "Porque tiene un filtro de colores"], 0, "El sol da luz constante, no a 38 kHz."],
      ["¿Qué necesita el control para funcionar?", ["Internet", "Apuntar hacia el receptor", "Estar emparejado"], 1, "La luz viaja en línea recta: necesita línea de vista."]
    ]
  },

  ir_tx_ky005: {
    n: 2, t: 15, con: "ir",
    dato: "El protocolo <b>NEC</b> lo creó la empresa japonesa NEC en los años 80 y hoy lo usan millones de controles remotos.",
    exp: "El KY-005 tiene un LED infrarrojo. El ESP32 lo hace parpadear a 38 kHz siguiendo el protocolo NEC: primero una señal de inicio, luego la <b>dirección</b> (qué aparato) y el <b>comando</b> (qué botón). El receptor arma el número con esas ráfagas.",
    usos: ["Controles remotos universales", "Apagar la TV desde un horario", "Comunicación entre robots"],
    retos: [
      ["Envía un comando distinto cada 2 segundos.", "Ciclo infinito con dos bloques <em>IR NEC</em> y esperas."],
      ["Con un receptor KY-022 en otro ESP32, haz que el comando prenda un LED.", "El receptor compara el código que llega."]
    ],
    quiz: [
      ["¿Cómo puedes ver si el KY-005 está emitiendo?", ["Con la cámara del celular", "A simple vista", "Con un imán"], 0, "Las cámaras captan el infrarrojo."],
      ["¿Qué indican la dirección y el comando en NEC?", ["El aparato y el botón", "La hora y la fecha", "El color y el brillo"], 0, "Dirección = qué aparato, comando = qué botón."]
    ]
  },

  /* ── Sensores ───────────────────────────────────────────────── */
  ultrasonico: {
    n: 1, t: 20,
    dato: "El sonido viaja a unos <b>343 metros por segundo</b>. El HC-SR04 mide tiempos de millonésimas de segundo para saber la distancia.",
    exp: "El TRIG manda un pulso y el sensor lanza 8 chasquidos de <b>40 kHz</b> (no los oyes). El ECHO se queda en 1 hasta que regresa el rebote. El ESP32 mide ese tiempo y calcula: <b>distancia = tiempo × velocidad del sonido ÷ 2</b> (÷ 2 porque el sonido va y vuelve).",
    usos: ["Sensores de reversa de los autos", "Medidores de nivel de agua en tinacos", "Robots que esquivan obstáculos"],
    retos: [
      ["Enciende el LED del pin 2 cuando algo esté a menos de 20 cm.", "<em>si distancia &lt; 20</em> → encender, si no → apagar."],
      ["Haz un <b>sensor de reversa</b>: el buzzer pita más rápido mientras más cerca estés.", "Usa la distancia para calcular la espera entre pitidos."]
    ],
    quiz: [
      ["¿Por qué se divide entre 2 en el cálculo?", ["Porque el sonido va y regresa", "Porque hay 2 bocinas", "Para redondear"], 0, "El tiempo medido es de ida y vuelta."],
      ["¿Qué animal usa el mismo principio?", ["El murciélago", "El gato", "La tortuga"], 0, "Se llama ecolocalización."]
    ]
  },

  medidor_estatura: {
    n: 2, t: 30,
    dato: "Tu cuerpo es un <b>conductor</b>: por eso el ESP32 nota cuando tocas el aluminio. Las pantallas táctiles de los celulares funcionan con un principio parecido.",
    exp: "El sensor está a una altura fija y mide la distancia hasta tu cabeza. Restando: <b>estatura = altura del sensor − distancia</b>. El TouchPad mide la capacitancia del pin: al tocarlo el número baja y el programa lo usa como botón.",
    usos: ["Básculas con medidor de estatura en clínicas", "Control de acceso en juegos mecánicos", "Medir crecimiento de plantas"],
    retos: [
      ["Muestra la estatura en metros (por ejemplo 1.52 m).", "Divide la estatura entre 100."],
      ["Haz que el buzzer pite al terminar de medir.", "Agrega un tono corto después de imprimir."]
    ],
    quiz: [
      ["¿Cómo se calcula la estatura?", ["Altura del sensor − distancia medida", "Distancia × 2", "Altura + distancia"], 0, "El sensor mide lo que hay entre él y tu cabeza."],
      ["¿Por qué el aluminio funciona como botón?", ["Tu cuerpo cambia la capacitancia del pin", "Porque es metal brillante", "Porque genera electricidad"], 0, "El TouchPad detecta ese cambio."]
    ]
  },

  carrito_esquiva_obstaculos: {
    n: 3, t: 45,
    dato: "Las aspiradoras robot usan sensores muy parecidos (ultrasonido, infrarrojo o láser) para no chocar con muebles y paredes.",
    exp: "El programa repite muy rápido: <b>mide → decide → mueve</b>. Si la distancia es menor al límite, detiene, retrocede y gira; si no, sigue adelante. A este ciclo se le llama <b>lazo de control</b> y es la base de cualquier robot autónomo.",
    usos: ["Aspiradoras robot", "Autos con frenado automático", "Robots de almacén"],
    retos: [
      ["Haz que gire a un lado distinto cada vez (izquierda, luego derecha).", "Usa una variable que cambie entre 0 y 1."],
      ["Agrega un buzzer que pite cuando detecte un obstáculo.", "Pon el tono dentro del <em>si distancia &lt; …</em>."]
    ],
    quiz: [
      ["¿Qué hace el carrito cuando detecta un obstáculo cerca?", ["Se detiene, retrocede y gira", "Acelera", "Se apaga"], 0, "Así lo esquiva."],
      ["¿Cómo se llama el ciclo mide → decide → mueve?", ["Lazo de control", "Ciclo de carga", "Bucle de color"], 0, "Es la base de los robots autónomos."]
    ]
  },

  dht11: {
    n: 1, t: 15,
    dato: "El DHT11 mide la humedad con un material que <b>absorbe agua del aire</b>: al humedecerse cambia su resistencia eléctrica.",
    exp: "El sensor tiene su propio chip que mide y manda los datos por <b>un solo cable</b>, como una serie de pulsos largos y cortos (bits). El bloque <em>Medir</em> le pide una lectura y luego tú tomas la temperatura y la humedad.",
    usos: ["Estaciones meteorológicas", "Invernaderos automáticos", "Termostatos de aire acondicionado"],
    retos: [
      ["Enciende el LED del pin 2 si la temperatura pasa de 30 °C.", "<em>si temp &gt; 30</em> → encender."],
      ["Calcula la temperatura en Fahrenheit.", "°F = °C × 1.8 + 32."]
    ],
    quiz: [
      ["¿Cada cuánto conviene leer el DHT11?", ["Cada 2 segundos o más", "1000 veces por segundo", "Una vez al día"], 0, "Es un sensor lento: necesita tiempo entre lecturas."],
      ["¿Qué mide el DHT11 además de la temperatura?", ["La presión", "La humedad", "La luz"], 1, "Humedad relativa, en porcentaje."]
    ]
  },

  ky001: {
    n: 2, t: 15,
    dato: "Cada DS18B20 trae de fábrica un <b>número de serie único</b> de 64 bits: por eso puedes poner muchos en el mismo cable.",
    exp: "OneWire es un protocolo de <b>un solo cable</b> de datos. El ESP32 primero <em>escanea</em> para encontrar los sensores, luego les pide <em>convertir</em> (medir) y, tras esperar, lee la temperatura de cada uno con precisión de ±0.5 °C.",
    usos: ["Termómetros de alberca y acuario", "Control de temperatura en cocinas", "Monitoreo de refrigeradores"],
    retos: [
      ["Avisa con el buzzer si la temperatura baja de 20 °C.", "<em>si temperatura &lt; 20</em> → tono."],
      ["Guarda la temperatura más alta que se haya medido.", "Variable <em>maxima</em> que se actualiza si la nueva es mayor."]
    ],
    quiz: [
      ["¿Cuántos cables de datos usa OneWire?", ["1", "2", "4"], 0, "De ahí su nombre."],
      ["¿Por qué se puede tener varios sensores en el mismo pin?", ["Cada uno tiene un número único", "Porque miden distinto", "No se puede"], 0, "El ESP32 les habla por su número."]
    ]
  },

  rtc_ds3231: {
    n: 2, t: 15,
    dato: "El DS3231 tiene un <b>cristal de cuarzo</b> con compensación de temperatura: se desvía menos de 1 minuto al año.",
    exp: "El RTC es un reloj independiente con su propia pila. El ESP32 le escribe la fecha y hora una vez y después solo la lee por <b>I2C</b>. Aunque desconectes el ESP32, el DS3231 sigue contando.",
    usos: ["Alarmas y despertadores", "Registradores de datos con fecha", "Riego automático por horario"],
    retos: [
      ["Enciende el LED cuando los segundos sean múltiplo de 10.", "Usa el residuo de segundos ÷ 10."],
      ["Haz una alarma: que suene el buzzer a una hora fija.", "Compara hora y minuto con los que elijas."]
    ],
    quiz: [
      ["¿Por qué el RTC no pierde la hora al desconectar el ESP32?", ["Tiene su propia pila", "La guarda en internet", "No es cierto, sí la pierde"], 0, "La pila CR2032 lo mantiene funcionando."],
      ["¿Por qué protocolo se comunica?", ["I2C", "WiFi", "Bluetooth"], 0, "Usa SDA y SCL."]
    ]
  },

  mpu6050_imu: {
    n: 2, t: 20,
    dato: "Dentro del MPU6050 hay <b>piezas microscópicas que se mueven</b> (tecnología MEMS). Tu celular usa sensores así para girar la pantalla.",
    exp: "El <b>acelerómetro</b> mide hacia dónde jala la gravedad y los empujones; el <b>giroscopio</b> mide qué tan rápido gira en cada eje (X, Y, Z). Juntos dicen cómo está inclinado y cómo se mueve el sensor.",
    usos: ["Drones que se estabilizan solos", "Controles de videojuegos", "Contadores de pasos"],
    retos: [
      ["Enciende el LED cuando inclines el sensor hacia un lado.", "Compara la aceleración X con un número."],
      ["Haz un detector de sacudidas que pite con el buzzer.", "Si la aceleración cambia mucho de golpe → tono."]
    ],
    quiz: [
      ["¿Qué mide el giroscopio?", ["La velocidad de giro", "La temperatura", "La distancia"], 0, "En grados por segundo."],
      ["¿Qué fuerza mide siempre el acelerómetro aunque esté quieto?", ["La gravedad", "El magnetismo", "Ninguna"], 0, "Por eso sabe hacia dónde está \"abajo\"."]
    ]
  },

  gps_modulo: {
    n: 2, t: 20,
    dato: "Hay más de <b>30 satélites GPS</b> girando a unos 20,000 km de altura. Tu módulo necesita ver al menos 4 para saber dónde está.",
    exp: "Cada satélite manda la hora exacta. El GPS mide cuánto tardó cada señal en llegar y con eso calcula la distancia a cada satélite (<b>trilateración</b>). Luego manda latitud y longitud al ESP32 por el puerto serial.",
    usos: ["Navegación en autos y celulares", "Rastreo de mascotas y paquetes", "Drones que regresan solos"],
    retos: [
      ["Imprime un enlace de Google Maps con tu posición.", "Une el texto <em>https://maps.google.com/?q=</em> con latitud, coma y longitud."],
      ["Imprime la hora que da el GPS.", "El GPS trae la hora exacta de los satélites."]
    ],
    quiz: [
      ["¿Por qué el GPS funciona mal dentro de un edificio?", ["Las paredes bloquean la señal de los satélites", "Necesita WiFi", "Porque está oscuro"], 0, "Necesita cielo abierto."],
      ["¿Cuántos satélites necesita como mínimo?", ["1", "4", "30"], 1, "Tres para la posición y uno más para corregir la hora."]
    ]
  },

  encoder_rotatorio: {
    n: 2, t: 15,
    dato: "La perilla de volumen de muchos estéreos es un encoder: por eso <b>gira sin tope</b>, a diferencia de un potenciómetro.",
    exp: "Al girar, el encoder genera dos señales (CLK y DT) desfasadas. Según cuál cambia primero, el ESP32 sabe el <b>sentido</b> del giro y suma o resta 1 al valor.",
    usos: ["Perillas de volumen", "Menús de impresoras 3D", "Medir cuánto gira una rueda"],
    retos: [
      ["Usa el encoder para mover un servo.", "Usa el valor (limitado de 0 a 180) como ángulo."],
      ["Enciende el LED solo cuando el valor sea mayor a 10.", "<em>si valor &gt; 10</em>."]
    ],
    quiz: [
      ["¿Cómo sabe el ESP32 hacia dónde giras?", ["Por cuál señal cambia primero", "Por la fuerza", "Por el color"], 0, "CLK y DT van desfasadas."],
      ["¿En qué se diferencia de un potenciómetro?", ["Gira sin tope", "Mide temperatura", "Es más caro"], 0, "El potenciómetro tiene un inicio y un fin."]
    ]
  },

  rfid_mfrc522: {
    n: 2, t: 20,
    dato: "Las tarjetas RFID <b>no tienen pila</b>: toman energía del campo del lector para responder.",
    exp: "El lector crea un campo de radio de <b>13.56 MHz</b>. Cuando acercas la tarjeta, su antena recibe energía, enciende su chip y responde con su <b>UID</b> (número único). El ESP32 lo lee por SPI.",
    usos: ["Tarjetas del transporte público", "Control de acceso en oficinas", "Inventario de libros en bibliotecas"],
    retos: [
      ["Prende el LED solo con <b>tu</b> tarjeta.", "Compara el UID con el que anotaste."],
      ["Cuenta cuántas veces se ha pasado una tarjeta.", "Suma 1 cada vez que haya tarjeta presente."]
    ],
    quiz: [
      ["¿De dónde saca energía la tarjeta?", ["Del campo del lector", "De una pila", "Del sol"], 0, "Por inducción, como un cargador inalámbrico."],
      ["¿Qué es el UID?", ["El número único de la tarjeta", "La contraseña de WiFi", "El color de la tarjeta"], 0, "Cada tarjeta tiene uno distinto."]
    ]
  },

  teclado_matricial: {
    n: 2, t: 15,
    dato: "Con una matriz, 16 teclas usan solo <b>8 pines</b> (4 filas + 4 columnas) en vez de 16.",
    exp: "El ESP32 activa una <b>fila</b> a la vez y revisa las columnas. Si una columna responde, sabe que la tecla está en el cruce de esa fila y esa columna. Lo hace tan rápido que parece instantáneo.",
    usos: ["Cerraduras con contraseña", "Cajeros automáticos", "Calculadoras y teléfonos"],
    retos: [
      ["Haz una cerradura: enciende el LED si se presiona la tecla 'A'.", "<em>si tecla = 'A'</em>."],
      ["Arma una contraseña de 4 dígitos.", "Junta las teclas en un texto y compáralo con el tuyo."]
    ],
    quiz: [
      ["¿Cuántos pines usa el teclado 4x4?", ["4", "8", "16"], 1, "4 filas + 4 columnas."],
      ["¿Cómo sabe el ESP32 qué tecla presionaste?", ["Por el cruce de fila y columna", "Por el sonido", "Por la presión"], 0, "Revisa fila por fila."]
    ]
  },

  teclado_4x3: {
    n: 2, t: 15,
    dato: "El teclado 4x3 tiene la misma distribución que el de un <b>teléfono</b>: 1-9, *, 0 y #.",
    exp: "Funciona igual que el 4x4: el ESP32 activa una fila a la vez y revisa cuál de las 3 columnas responde. Con 7 pines lee 12 teclas.",
    usos: ["Teléfonos y porteros eléctricos", "Cajas fuertes", "Máquinas expendedoras"],
    retos: [
      ["Imprime \"Correcto\" al presionar '#'.", "<em>si tecla = '#'</em>."],
      ["Suma los números que vayas presionando.", "Convierte la tecla a número y súmala a una variable."]
    ],
    quiz: [
      ["¿Cuántos pines usa el teclado 4x3?", ["7", "12", "3"], 0, "4 filas + 3 columnas."],
      ["¿Necesita VCC y GND?", ["Sí", "No", "Solo GND"], 1, "Son solo interruptores entre filas y columnas."]
    ]
  },

  teclado_4x4_i2c: {
    n: 2, t: 15,
    dato: "El adaptador I2C es un chip <b>expansor de pines</b>: le da 8 pines más al ESP32 usando solo 2 cables.",
    exp: "El chip del adaptador lee las filas y columnas por ti y le manda al ESP32 el resultado por <b>I2C</b> (SDA y SCL). En el mismo par de cables puedes conectar también una pantalla u otros sensores.",
    usos: ["Paneles de control con pantalla", "Sistemas de alarma", "Proyectos con muchos sensores"],
    retos: [
      ["Muestra la tecla presionada en una pantalla OLED.", "La OLED también usa I2C: comparte SDA y SCL."],
      ["Enciende el LED con 'A' y apágalo con 'B'.", "Dos bloques <em>si</em>."]
    ],
    quiz: [
      ["¿Cuántos pines de datos usa con I2C?", ["2", "8", "16"], 0, "SDA y SCL."],
      ["¿Puedes conectar otro módulo I2C en los mismos pines?", ["Sí, cada uno tiene su dirección", "No", "Solo si es igual"], 0, "I2C es un bus compartido."]
    ]
  },

  bmp280_presion: {
    n: 2, t: 15,
    dato: "La presión del aire baja unos <b>12 Pa por cada metro</b> que subes. Por eso el BMP280 puede estimar la altitud.",
    exp: "El sensor tiene una membrana diminuta que se dobla con la presión del aire. El chip mide esa deformación, la corrige con la temperatura y manda la presión (en Pascales) al ESP32 por I2C.",
    usos: ["Estaciones meteorológicas", "Drones que mantienen la altura", "Relojes de montañismo"],
    retos: [
      ["Mide la diferencia de presión entre el piso y lo alto de un mueble.", "Guarda la primera lectura y resta las siguientes."],
      ["Muestra la presión en hectopascales (hPa).", "Divide entre 100."]
    ],
    quiz: [
      ["¿Qué pasa con la presión al subir una montaña?", ["Baja", "Sube", "No cambia"], 0, "Hay menos aire encima."],
      ["¿En qué unidad la da el sensor?", ["Pascales", "Grados", "Lux"], 0, "1 hPa = 100 Pa."]
    ]
  },

  bh1750_luz: {
    n: 1, t: 15,
    dato: "Un día soleado tiene unos <b>100,000 lux</b>; un salón de clases, unos 500; y una noche de luna llena, menos de 1.",
    exp: "El BH1750 tiene un fotodiodo que convierte la luz en corriente. Su chip la mide y la entrega ya convertida en <b>lux</b> (la unidad de iluminación) por I2C.",
    usos: ["Brillo automático de pantallas", "Luces que se prenden al anochecer", "Medir la luz para plantas"],
    retos: [
      ["Enciende el LED cuando haya poca luz (menos de 50 lux).", "<em>si luz &lt; 50</em>."],
      ["Clasifica: \"oscuro\", \"normal\" o \"brillante\".", "Usa <em>si / si no si</em> con dos límites."]
    ],
    quiz: [
      ["¿Qué mide el lux?", ["La iluminación", "El sonido", "La temperatura"], 0, "Cuánta luz llega a una superficie."],
      ["¿Qué pasa con el valor si tapas el sensor?", ["Baja", "Sube", "No cambia"], 0, "Le llega menos luz."]
    ]
  },

  qmc5883l_brujula: {
    n: 2, t: 15,
    dato: "La Tierra es un <b>imán gigante</b>. Una brújula electrónica mide ese campo magnético, que es miles de veces más débil que el de un imán de refrigerador.",
    exp: "El sensor mide el campo magnético en 3 ejes (X, Y, Z). Con X y Y se puede calcular hacia dónde apunta, como una brújula. Los motores y los imanes cercanos alteran la lectura.",
    usos: ["Brújula del celular", "Drones y robots que se orientan", "Detectores de metales sencillos"],
    retos: [
      ["Acerca un imán y observa cómo cambian los valores.", "Prueba con distintas distancias."],
      ["Enciende el LED cuando el sensor apunte al norte.", "Busca el valor de X cuando apuntas al norte y compáralo."]
    ],
    quiz: [
      ["¿Qué mide este sensor?", ["El campo magnético", "La luz", "La humedad"], 0, "En 3 ejes."],
      ["¿Qué cosas alteran la lectura?", ["Imanes y motores", "La música", "El color de la mesa"], 0, "Tienen sus propios campos magnéticos."]
    ]
  },

  color_tcs34725: {
    n: 2, t: 15,
    dato: "El sensor tiene <b>filtros de color</b> sobre sus fotodiodos, parecido a como tu ojo tiene células para el rojo, el verde y el azul.",
    exp: "El TCS34725 ilumina el objeto con su LED blanco y mide cuánta luz roja, verde y azul regresa. El canal más alto te dice de qué color es. Todo llega al ESP32 por I2C.",
    usos: ["Máquinas que separan frutas o dulces por color", "Calibración de pantallas", "Robots que siguen colores"],
    retos: [
      ["Imprime \"ROJO\" cuando el canal rojo sea el más alto.", "Compara rojo &gt; verde y rojo &gt; azul."],
      ["Copia el color leído a un NeoPixel.", "Usa los tres valores como color RGB."]
    ],
    quiz: [
      ["¿Qué canales mide el sensor?", ["Rojo, verde y azul", "Blanco y negro", "Solo rojo"], 0, "Más la luz total."],
      ["¿Por qué conviene alejarlo del sol?", ["La luz del sol altera la medición", "Se derrite", "No importa"], 0, "Mide la luz que le llega."]
    ]
  },

  inmp441_microfono: {
    n: 3, t: 20,
    dato: "El INMP441 es un micrófono <b>MEMS</b>, del mismo tipo que traen los celulares y los audífonos inalámbricos.",
    exp: "El micrófono convierte el sonido en números (<b>digital</b>) y los manda por <b>I2S</b>, un protocolo hecho para audio. El bloque <em>nivel sonido</em> toma muchas muestras y calcula qué tan fuerte es el sonido.",
    usos: ["Asistentes de voz", "Medidores de ruido en salones", "Luces que bailan con la música"],
    retos: [
      ["Enciende el LED si hay mucho ruido.", "<em>si nivel &gt; …</em> (prueba aplaudiendo para elegir el número)."],
      ["Haz un <b>aplausómetro</b> con un NeoPixel que cambie de color.", "Verde = poco ruido, rojo = mucho."]
    ],
    quiz: [
      ["¿Qué protocolo usa para mandar el audio?", ["I2S", "I2C", "WiFi"], 0, "I2S está hecho para sonido."],
      ["¿Para qué sirve conectar L/R a GND?", ["Elige el canal izquierdo", "Sube el volumen", "Lo apaga"], 0, "Con dos micrófonos se puede hacer estéreo."]
    ]
  },

  flujo_agua: {
    n: 2, t: 20,
    dato: "Una llave abierta puede tirar entre <b>6 y 12 litros por minuto</b>. ¡Cerrarla al lavarte los dientes ahorra muchísima agua!",
    exp: "Dentro del sensor hay una <b>turbina con un imán</b>. Cada vuelta genera un pulso en el pin (sensor de efecto Hall). Contando pulsos por segundo, el ESP32 calcula los litros por minuto.",
    usos: ["Medidores de consumo de agua", "Riego automático", "Dispensadores de bebidas"],
    retos: [
      ["Enciende el LED mientras pase agua.", "<em>si flujo &gt; 0</em>."],
      ["Calcula los litros totales que han pasado.", "Suma flujo ÷ 60 cada segundo."]
    ],
    quiz: [
      ["¿Qué gira dentro del sensor?", ["Una turbina", "Un motor", "Nada"], 0, "La mueve el agua."],
      ["¿Qué cuenta el ESP32 para calcular el flujo?", ["Pulsos", "Gotas", "Grados"], 0, "Más pulsos por segundo = más flujo."]
    ]
  },

  fpm383c_huella: {
    n: 3, t: 20,
    dato: "No hay dos personas con la misma huella digital, <b>ni siquiera los gemelos idénticos</b>.",
    exp: "El sensor toma una imagen de tu dedo y busca los <b>puntos característicos</b> (donde las líneas terminan o se dividen). Guarda esos puntos con un número de ID y después compara cada dedo nuevo contra los guardados.",
    usos: ["Desbloqueo de celulares", "Control de asistencia", "Cerraduras inteligentes"],
    retos: [
      ["Registra tu huella con el bloque <em>registrar ID</em>.", "Usa un ID libre, por ejemplo 1."],
      ["Enciende el LED solo si la huella es la tuya.", "Compara el resultado de <em>verificar</em> con tu ID."]
    ],
    quiz: [
      ["¿Qué compara el sensor para reconocer una huella?", ["Puntos característicos", "El color de la piel", "La temperatura"], 0, "Donde las líneas terminan o se dividen."],
      ["¿Qué hay que hacer antes de verificar?", ["Registrar la huella", "Conectar WiFi", "Nada"], 0, "Si no está guardada, no la reconoce."]
    ]
  },

  /* ── Pantallas ─────────────────────────────────────────────── */
  oled_display: {
    n: 1, t: 15,
    dato: "En una OLED cada píxel <b>produce su propia luz</b>: por eso el negro es negro de verdad y gasta muy poca energía.",
    exp: "La pantalla tiene 128 × 64 = <b>8,192 píxeles</b>. Los bloques dibujan primero en la memoria del ESP32 y luego mandan todo por <b>I2C</b>. La posición X va de izquierda a derecha y la Y de arriba hacia abajo.",
    usos: ["Relojes inteligentes", "Pantallas de impresoras 3D", "Indicadores en robots"],
    retos: [
      ["Escribe tu nombre en la línea de abajo.", "Usa Y = 50."],
      ["Muestra un contador que suba cada segundo.", "Limpia, escribe el número y espera 1 s dentro de un ciclo."]
    ],
    quiz: [
      ["¿Cuántos píxeles tiene de ancho?", ["64", "128", "1080"], 1, "Es de 128 × 64."],
      ["¿Hacia dónde crece la Y?", ["Hacia abajo", "Hacia arriba", "Hacia la derecha"], 0, "El 0 está arriba."]
    ]
  },

  sh1106_display: {
    n: 1, t: 15,
    dato: "La SH1106 tiene memoria para <b>132 columnas</b> aunque solo muestra 128: por eso a veces aparece corrida 2 píxeles.",
    exp: "Igual que la SSD1306, dibuja en memoria y manda todo por I2C, pero su chip <b>SH1106</b> se programa distinto. El bloque <em>rotar</em> voltea la imagen 180° por si la montaste al revés.",
    usos: ["Pantallas de menú en proyectos", "Termómetros digitales", "Mini consolas de juego"],
    retos: [
      ["Dibuja un marco alrededor de la pantalla.", "Busca el bloque de rectángulo."],
      ["Muestra la temperatura del DHT11.", "Combina con el tutorial del DHT11."]
    ],
    quiz: [
      ["¿Cómo se comunica con el ESP32?", ["I2C", "Bluetooth", "Por el USB"], 0, "Usa SDA y SCL."],
      ["¿Para qué sirve el bloque <em>rotar</em>?", ["Voltear la imagen", "Cambiar el color", "Apagarla"], 0, "Útil si la pantalla quedó de cabeza."]
    ]
  },

  lcd_i2c_display: {
    n: 1, t: 15,
    dato: "Las LCD 16x2 llevan más de <b>30 años</b> en calculadoras, fotocopiadoras y máquinas de café.",
    exp: "La pantalla tiene 2 renglones de 16 caracteres. El módulo I2C de atrás convierte los 2 cables (SDA, SCL) en los muchos pines que la LCD necesita. El potenciómetro azul ajusta el <b>contraste</b>.",
    usos: ["Máquinas expendedoras", "Equipos de laboratorio", "Paneles de alarma"],
    retos: [
      ["Escribe algo en el segundo renglón.", "Cambia la fila a 1."],
      ["Muestra la distancia del sensor ultrasónico.", "Limpia y escribe dentro de un ciclo."]
    ],
    quiz: [
      ["¿Cuántos caracteres caben en total?", ["16", "32", "64"], 1, "2 renglones × 16."],
      ["Si no se ve nada, ¿qué ajustas primero?", ["El potenciómetro de contraste", "El WiFi", "El volumen"], 0, "Está atrás, en el módulo I2C."]
    ]
  },

  lcd_paralelo: {
    n: 2, t: 20,
    dato: "El chip de estas pantallas, el <b>HD44780</b>, se diseñó en los años 80 y sigue siendo el estándar.",
    exp: "Sin módulo I2C, el ESP32 manda cada letra por <b>4 cables de datos</b> (D4-D7) en dos mitades. RS indica si es un comando o una letra, y E da la señal de \"lee ahora\". V0 ajusta el contraste.",
    usos: ["Relojes y termómetros", "Equipos industriales", "Proyectos sin módulo I2C"],
    retos: [
      ["Escribe tu nombre centrado.", "Cuenta las letras y empieza en la columna (16 − letras) ÷ 2."],
      ["Haz un contador que suba cada segundo.", "Ciclo con escribir y esperar."]
    ],
    quiz: [
      ["¿Para qué sirve el potenciómetro?", ["Ajustar el contraste", "Subir volumen", "Mover el texto"], 0, "Va al pin V0."],
      ["¿Cuántos pines de datos usamos?", ["4", "8", "2"], 0, "Modo de 4 bits: D4-D7."]
    ]
  },

  tft_display: {
    n: 2, t: 20,
    dato: "Una pantalla de 240 × 240 tiene <b>57,600 píxeles</b>, cada uno con miles de colores posibles.",
    exp: "La TFT recibe los colores por <b>SPI</b>, un protocolo rápido. Cada color se arma con rojo, verde y azul. DC le dice a la pantalla si lo que llega es un comando o un dato de color.",
    usos: ["Relojes inteligentes", "Pantallas de termostatos", "Mini videojuegos"],
    retos: [
      ["Pinta el fondo de tu color favorito y escribe tu nombre.", "Cambia el color de fondo y el texto."],
      ["Haz un semáforo: fondo rojo, amarillo y verde cada 2 s.", "Ciclo con tres colores de fondo."]
    ],
    quiz: [
      ["¿Qué protocolo usa la TFT?", ["SPI", "I2C", "Bluetooth"], 0, "Es más rápido, útil para tantos píxeles."],
      ["¿Qué colores forman todos los demás?", ["Rojo, verde y azul", "Cian y magenta", "Blanco y negro"], 0, "RGB."]
    ]
  },

  tm1637_display: {
    n: 1, t: 10,
    dato: "Cada dígito tiene 7 segmentos más el punto; con ellos se forman los números del 0 al 9 y hasta algunas letras como A, b, C, d, E y F.",
    exp: "El chip TM1637 controla los 4 dígitos por ti. El ESP32 solo le manda el número por 2 cables (CLK y DIO) y el chip se encarga de encender los segmentos correctos.",
    usos: ["Relojes de pared", "Marcadores deportivos", "Temporizadores de cocina"],
    retos: [
      ["Haz una cuenta regresiva de 10 a 0.", "Ciclo <em>contar de 10 a 0</em> con esperar 1 s."],
      ["Muestra la temperatura del DHT11.", "Combina con el tutorial del DHT11."]
    ],
    quiz: [
      ["¿Cuántos dígitos tiene el TM1637?", ["2", "4", "8"], 1, "Como un reloj: 12:34."],
      ["¿Cuántos cables de datos usa?", ["2", "7", "28"], 0, "CLK y DIO."]
    ]
  },

  display_7seg: {
    n: 2, t: 15,
    dato: "Los 7 segmentos se nombran de la <b>a</b> a la <b>g</b>, empezando arriba y girando como las manecillas del reloj; la <b>g</b> es la del centro.",
    exp: "Cada segmento es un LED conectado a su propio pin. Para mostrar un número, el ESP32 enciende la combinación correcta: el 1 usa b y c; el 8 los usa todos. La resistencia de 220 Ω limita la corriente.",
    usos: ["Relojes y despertadores", "Elevadores", "Básculas y marcadores"],
    retos: [
      ["Haz una cuenta del 0 al 9.", "Ciclo <em>contar de 0 a 9</em> con el bloque número (variable)."],
      ["Muestra un dado: un número al azar del 1 al 6.", "Usa el bloque de número aleatorio."]
    ],
    quiz: [
      ["¿Qué segmentos usa el número 1?", ["b y c", "a y d", "Todos"], 0, "Las dos rayas verticales de la derecha."],
      ["¿Por qué el 8 se ve más tenue con una sola resistencia?", ["La corriente se reparte entre 7 segmentos", "Porque el 8 es más grande", "Por error del ESP32"], 0, "La resistencia del común limita la corriente total."]
    ]
  },

  matrix8_display: {
    n: 1, t: 15,
    dato: "La matriz tiene 64 LEDs pero el MAX7219 los controla con solo 3 cables, prendiendo las filas tan rápido que parecen fijas (<b>multiplexado</b>).",
    exp: "El chip MAX7219 recuerda qué LEDs van encendidos y los refresca cientos de veces por segundo. El ESP32 solo le manda el dibujo por SPI (DIN, CS, CLK).",
    usos: ["Letreros de mensajes", "Marcadores", "Caritas y animaciones en robots"],
    retos: [
      ["Haz que tu nombre se desplace.", "Usa el bloque <em>scroll texto</em>."],
      ["Muestra una cuenta regresiva.", "Ciclo con el número y esperar 1 s."]
    ],
    quiz: [
      ["¿Cuántos LEDs tiene la matriz?", ["8", "16", "64"], 2, "8 × 8."],
      ["¿Qué es el multiplexado?", ["Encender filas muy rápido por turnos", "Usar dos matrices", "Cambiar colores"], 0, "Tu ojo lo ve todo encendido."]
    ]
  },

  neopixel_matriz: {
    n: 2, t: 15,
    dato: "Una matriz NeoPixel es una tira acomodada en zigzag o en filas: aunque se vea como cuadrícula, es una sola cadena de LEDs.",
    exp: "El bloque <em>pixel x y</em> convierte la posición (columna, fila) al número de LED de la cadena. El <b>brillo</b> multiplica todos los colores para que no gaste tanta corriente.",
    usos: ["Pantallas de pixel art", "Indicadores de clima", "Lámparas de ambiente"],
    retos: [
      ["Dibuja una diagonal de esquina a esquina.", "x y y iguales: (0,0), (1,1), (2,2)…"],
      ["Dibuja una carita feliz.", "Ojos en la fila 1 y la boca en la 3."]
    ],
    quiz: [
      ["¿Cuántos LEDs tiene la matriz 5x5?", ["10", "25", "55"], 1, "5 × 5."],
      ["¿Por qué conviene un brillo bajo?", ["Para no gastar demasiada corriente", "Para que dure más el programa", "Para cambiar el color"], 0, "Y para no encandilarte."]
    ]
  },

  neopixel_matriz_8x8: {
    n: 2, t: 15,
    dato: "64 LEDs en blanco a todo brillo pueden pedir hasta <b>3.8 A</b>: más de lo que da un puerto USB.",
    exp: "Igual que la 5x5: el bloque convierte (x, y) al número de LED en la cadena. Con 64 LEDs el brillo bajo es importante para no sobrecargar la alimentación.",
    usos: ["Letreros de pixel art", "Visualizadores de música", "Juegos como la viborita"],
    retos: [
      ["Dibuja un marco en los bordes.", "Usa ciclos para x = 0 y x = 7, y para y = 0 y y = 7."],
      ["Haz un punto que recorra toda la matriz.", "Dos ciclos anidados: uno para y, otro para x."]
    ],
    quiz: [
      ["¿Cuántos LEDs tiene la matriz 8x8?", ["16", "64", "88"], 1, "8 × 8."],
      ["¿Qué pasa si pones todo en blanco a brillo máximo?", ["Puede pedir demasiada corriente", "Nada", "Cambia a rojo"], 0, "Usa brillo bajo o fuente externa."]
    ]
  },

  /* ── Almacenamiento y audio ─────────────────────────────────── */
  dfplayer_mp3: {
    n: 2, t: 20,
    dato: "El MP3 comprime el audio quitando sonidos que tu oído casi no percibe: una canción ocupa <b>unas 10 veces menos</b> que el audio original.",
    exp: "El DFPlayer tiene su propio chip que lee la microSD, descomprime el MP3 y mueve la bocina. El ESP32 solo le manda órdenes cortas por <b>UART</b> (TX/RX): volumen, reproducir pista 1, pausa…",
    usos: ["Juguetes y peluches que hablan", "Avisos de voz en elevadores", "Timbres con canciones"],
    retos: [
      ["Reproduce la pista 2 al presionar un botón.", "Combina con el tutorial del Botón."],
      ["Haz un timbre que suene cuando el ultrasónico detecte a alguien.", "Reproduce si la distancia es menor a 50 cm."]
    ],
    quiz: [
      ["¿Cómo se llaman los archivos en la microSD?", ["0001.mp3, 0002.mp3…", "cancion.mp3", "Da igual"], 0, "Dentro de la carpeta /mp3."],
      ["¿Por dónde recibe órdenes el DFPlayer?", ["UART (TX/RX)", "WiFi", "I2C"], 0, "TX y RX van cruzados."]
    ]
  },

  sdcard_modulo: {
    n: 2, t: 15,
    dato: "Una microSD de 32 GB podría guardar una lectura de temperatura cada segundo durante <b>más de 100 años</b>.",
    exp: "La microSD se comunica por <b>SPI</b>. MicroPython la monta como una carpeta: puedes crear, escribir y leer archivos de texto igual que en una computadora. Debe estar en formato <b>FAT32</b>.",
    usos: ["Registradores de datos (dataloggers)", "Cámaras y grabadoras", "Guardar configuraciones"],
    retos: [
      ["Guarda tu nombre en un archivo y léelo.", "Cambia el texto del bloque <em>escribir</em>."],
      ["Guarda una lectura del DHT11 cada 10 segundos.", "Escribe la temperatura en un ciclo."]
    ],
    quiz: [
      ["¿En qué formato debe estar la microSD?", ["FAT32", "NTFS", "MP3"], 0, "Es el que entiende MicroPython."],
      ["¿Qué protocolo usa?", ["SPI", "Bluetooth", "OneWire"], 0, "SCK, MOSI, MISO y CS."]
    ]
  },

  /* ── Comunicación inalámbrica ───────────────────────────────── */
  wifi_basico: {
    n: 1, t: 10, con: "wifi",
    dato: "El ESP32 usa WiFi de <b>2.4 GHz</b>: sus ondas vibran 2,400 millones de veces por segundo y atraviesan paredes mejor que las de 5 GHz.",
    exp: "El ESP32 busca la red por su nombre (<b>SSID</b>), se identifica con la contraseña y el router le asigna una <b>dirección IP</b>, como un número de casa dentro de la red. Con esa IP los demás aparatos pueden encontrarlo.",
    usos: ["Sensores que mandan datos a internet", "Casas inteligentes", "Relojes que se ponen en hora solos"],
    retos: [
      ["Conéctate a la red del celular (hotspot) y compara la IP.", "Cambia SSID y contraseña; el hotspot debe estar en 2.4 GHz."],
      ["Enciende el LED del pin 2 cuando se conecte.", "Pon el bloque de encender después de conectar."]
    ],
    quiz: [
      ["¿Qué banda de WiFi usa el ESP32?", ["2.4 GHz", "5 GHz", "Las dos"], 0, "No se conecta a redes solo de 5 GHz."],
      ["¿Quién le da la dirección IP al ESP32?", ["El router", "El ESP32 la inventa", "Google"], 0, "El router reparte las IP de su red."]
    ]
  },

  wifi_ntfy_led: {
    n: 3, t: 45, con: "ntfy",
    dato: "ntfy.sh es un servicio <b>gratis y de código abierto</b>: lo usan programadores de todo el mundo para mandarse avisos al celular.",
    exp: "Tu celular <b>publica</b> un mensaje en un canal de ntfy.sh. El ESP32 le pregunta a ntfy.sh cada 2 segundos (HTTP GET) qué mensajes hay en ese canal. Cada mensaje llega en <b>JSON</b>; el programa saca el texto, revisa que no lo haya visto ya (lista <em>visto</em>) y prende o apaga el LED.",
    usos: ["Abrir el portón desde el celular", "Prender el aire acondicionado antes de llegar", "Recibir alertas de un sensor en el celular"],
    retos: [
      ["Agrega el mensaje <b>parpadea</b> que haga parpadear el LED 5 veces.", "Otro <em>si msg = \"parpadea\"</em> con un ciclo <em>repetir 5</em>."],
      ["Controla también el buzzer con los mensajes <b>sonar</b> y <b>silencio</b>.", "Igual que el LED, con bloques del buzzer."]
    ],
    quiz: [
      ["¿Qué hace el ESP32 cada 2 segundos?", ["Pregunta a ntfy.sh si hay mensajes", "Se reinicia", "Manda una foto"], 0, "Eso se llama <b>polling</b>."],
      ["¿Por qué tu canal debe tener un nombre único?", ["Cualquiera que sepa el nombre puede mandar mensajes", "Porque es más rápido", "No importa"], 0, "Los canales de ntfy.sh son públicos."]
    ]
  },

  servidor_socket: {
    n: 3, t: 30, con: "socket",
    dato: "Cada vez que abres una página web, tu navegador abre un <b>socket TCP</b> con el servidor, igual que en este tutorial.",
    exp: "El ESP32 crea su propia red (<b>Access Point</b>) y abre un socket en el puerto 80. <em>bind</em> lo amarra a ese puerto, <em>listen</em> se pone a esperar y <em>accept</em> atiende a cada cliente que llega. Luego recibe los datos y los imprime.",
    usos: ["Servidores web", "Control de robots desde la computadora", "Comunicación entre máquinas en una fábrica"],
    retos: [
      ["Cambia el nombre de la red a tu nombre.", "Modifica el SSID en <em>Configurar Access Point</em>."],
      ["Enciende el LED si el mensaje recibido es \"on\".", "Compara la respuesta (decodificada) con \"on\"."]
    ],
    quiz: [
      ["¿Qué bloque se queda esperando a que llegue un cliente?", ["accept", "bind", "close"], 0, "Se detiene ahí hasta que alguien se conecta."],
      ["¿Qué IP tiene el ESP32 cuando es Access Point?", ["192.168.4.1", "8.8.8.8", "127.0.0.1"], 0, "Es la IP por defecto del AP."]
    ]
  },

  cliente_socket: {
    n: 3, t: 25, con: "socket",
    dato: "TCP <b>confirma cada paquete</b> que llega: si uno se pierde, se vuelve a mandar. Por eso los mensajes llegan completos y en orden.",
    exp: "El cliente se conecta a la red del servidor, crea un socket y se conecta a la IP <b>192.168.4.1</b> en el puerto 80. Con <em>sendall</em> manda el mensaje y luego cierra la conexión.",
    usos: ["Apps que hablan con un servidor", "Sensores que reportan a una central", "Chats y videojuegos en red"],
    retos: [
      ["Manda un mensaje distinto cada 5 segundos.", "Llama a <em>enviar_msg</em> dentro de un ciclo con esperar."],
      ["Manda la distancia del sensor ultrasónico.", "Convierte la distancia a texto antes de enviarla."]
    ],
    quiz: [
      ["¿Qué necesita el cliente para encontrar al servidor?", ["Su IP y su puerto", "Su color", "Su MAC"], 0, "Como dirección y número de departamento."],
      ["¿Qué pasa si el servidor no está encendido?", ["La conexión falla", "El mensaje se guarda", "Se manda por Bluetooth"], 0, "Enciende primero el servidor."]
    ]
  },

  portal_cautivo: {
    n: 3, t: 30, con: "portal",
    dato: "Los portales cautivos son las páginas que aparecen en el <b>WiFi de aeropuertos, cafés y hoteles</b> pidiéndote aceptar condiciones.",
    exp: "El ESP32 crea una red y además funciona como <b>servidor DNS</b> y <b>servidor web</b>. Cuando tu celular pregunta por cualquier página, el DNS del ESP32 responde \"soy yo\" y el servidor web le muestra su propia página.",
    usos: ["WiFi de hoteles y aeropuertos", "Configurar aparatos sin app", "Juegos y encuestas sin internet"],
    retos: [
      ["Cambia el nombre de la red.", "Modifica el SSID del Access Point."],
      ["Imprime cuántas veces se conectó alguien.", "Suma 1 a un contador en la función que atiende."]
    ],
    quiz: [
      ["¿Qué hace el DNS del ESP32?", ["Responde que todas las páginas son él", "Bloquea internet", "Cambia la contraseña"], 0, "Así redirige al portal."],
      ["¿El portal necesita internet?", ["No, todo vive en el ESP32", "Sí, siempre", "Solo de noche"], 0, "Funciona sin router ni internet."]
    ]
  },

  espnow_receptor: {
    n: 2, t: 25, con: "espnow",
    dato: "ESP-NOW puede llegar a unos <b>200 metros</b> al aire libre y manda mensajes de hasta <b>250 bytes</b>.",
    exp: "El receptor activa su WiFi (sin conectarse a ningún router), inicia ESP-NOW, agrega al emisor como <b>peer</b> usando su dirección MAC y se queda en un ciclo preguntando si llegó un mensaje.",
    usos: ["Controles remotos para carritos", "Sensores en distintos salones", "Timbres inalámbricos"],
    retos: [
      ["Enciende el LED cuando llegue el mensaje \"on\".", "<em>si msg = \"on\"</em> (decodifica el mensaje)."],
      ["Cuenta cuántos mensajes han llegado.", "Suma 1 a una variable cada vez que llegue uno."]
    ],
    quiz: [
      ["¿Necesita router ESP-NOW?", ["No", "Sí", "Solo para recibir"], 0, "Los ESP32 se hablan directo."],
      ["¿Qué identifica a cada ESP32 en ESP-NOW?", ["Su dirección MAC", "Su nombre", "Su color"], 0, "Es como su número de teléfono."]
    ]
  },

  espnow_emisor: {
    n: 2, t: 20, con: "espnow",
    dato: "Cada placa tiene una dirección MAC única en el mundo, grabada de fábrica: <b>6 números en hexadecimal</b>, como 24:6F:28:AB:CD:EF.",
    exp: "El emisor inicia ESP-NOW, registra la <b>MAC del receptor</b> como peer y le manda el mensaje directamente por radio. No hay router de por medio: es como un walkie-talkie digital.",
    usos: ["Botón inalámbrico", "Control de luces sin internet", "Juegos entre dos placas"],
    retos: [
      ["Manda un mensaje cada segundo.", "Envuelve el <em>Enviar</em> en un ciclo con esperar 1 s."],
      ["Manda \"on\" al presionar un botón y \"off\" al soltarlo.", "Combina con el tutorial del Botón."]
    ],
    quiz: [
      ["¿Qué MAC escribes en el emisor?", ["La del receptor", "La del emisor", "La del router"], 0, "Es a quién le mandas el mensaje."],
      ["¿Qué tamaño máximo tiene un mensaje?", ["250 bytes", "1 GB", "10 letras"], 0, "Suficiente para textos cortos y lecturas."]
    ]
  },

  espnow_chat: {
    n: 3, t: 35, con: "espnow",
    dato: "Con ESP-NOW se pueden conectar hasta <b>20 placas</b> en una misma red de mensajes.",
    exp: "Cada ESP32 es emisor y receptor a la vez. En lugar de preguntar todo el tiempo si llegó algo, se usa <em>al recibir llamar</em> (una <b>interrupción</b>): el ESP32 ejecuta tu función solo cuando llega un mensaje, y el resto del tiempo queda libre para enviar.",
    usos: ["Walkie-talkies de texto", "Robots que cooperan", "Sistemas de alarma con varias placas"],
    retos: [
      ["Responde automáticamente \"recibido\" a cada mensaje.", "Dentro de la función de recibir, envía \"recibido\" al otro."],
      ["Prende el LED del otro ESP32 escribiendo \"luz\".", "En la función de recibir, compara el texto con \"luz\"."]
    ],
    quiz: [
      ["¿Qué ventaja tiene <em>al recibir llamar</em>?", ["No hay que preguntar todo el tiempo", "Hace los mensajes más largos", "Apaga el WiFi"], 0, "Es una interrupción: se activa sola."],
      ["¿Por qué el programa \"termina\" pero sigue escuchando?", ["La escucha queda activa en segundo plano", "Es un error", "Porque se reinicia"], 0, "La función quedó registrada."]
    ]
  },

  hc06_basico: {
    n: 2, t: 20, con: "hc06",
    dato: "El nombre <b>Bluetooth</b> viene de un rey vikingo, Harald \"Diente Azul\", que unió a pueblos de Dinamarca y Noruega; el logo son sus iniciales en runas.",
    exp: "El HC-06 es un <b>traductor</b>: recibe por Bluetooth lo que manda el celular y lo pasa al ESP32 por cables seriales (UART). El ESP32 revisa si hay datos con <em>tiene datos</em> y los lee.",
    usos: ["Robots controlados con el celular", "Apps para prender luces", "Recibir datos de sensores en el celular"],
    retos: [
      ["Enciende el LED al recibir \"1\" y apágalo con \"0\".", "Compara lo leído con \"1\" y \"0\"."],
      ["Manda al celular la distancia del sensor ultrasónico.", "Usa <em>Enviar texto HC-06</em> dentro de un ciclo."]
    ],
    quiz: [
      ["¿Cómo van conectados TX y RX?", ["Cruzados", "Iguales", "Los dos a GND"], 0, "Lo que uno habla (TX), el otro lo escucha (RX)."],
      ["¿Funciona el HC-06 con iPhone?", ["No, usa Bluetooth clásico", "Sí, siempre", "Solo con WiFi"], 0, "Los iPhone no aceptan este tipo de módulo; usa BLE."]
    ]
  },

  bluetooth_le: {
    n: 3, t: 25, con: "ble",
    dato: "BLE gasta tan poca energía que un sensor con una <b>pila de botón</b> puede funcionar más de un año.",
    exp: "El ESP32 se <b>anuncia</b> con su nombre (advertising) para que el celular lo encuentre. Al conectarse, usan el servicio <b>UART BLE</b>: el celular escribe en un \"casillero\" y el ESP32 ejecuta tu función <em>al recibir</em>, que decodifica los bytes a texto.",
    usos: ["Pulseras y relojes inteligentes", "Básculas y termómetros que mandan datos al celular", "Llaveros localizadores"],
    retos: [
      ["Cambia el nombre BLE por tu nombre.", "Bloque <em>Establecer nombre BLE</em>."],
      ["Enciende el LED cuando llegue \"on\".", "Compara <em>rx_buffer</em> con \"on\"."]
    ],
    quiz: [
      ["¿Qué significa la L de BLE?", ["Low (bajo consumo)", "Large (grande)", "Light (luz)"], 0, "Bluetooth Low Energy."],
      ["¿Cómo encuentra el celular al ESP32?", ["Por el nombre que anuncia", "Por su IP", "Por el cable USB"], 0, "Eso se llama advertising."]
    ]
  }
};

/* ── Conceptos de comunicación (antes de programar) ──────────────
   diagrama: nodos [id, emoji, etiqueta, x] y enlaces
   [desde, hasta, texto, ida_y_vuelta, tachado]. glosario: [término,
   explicación]. problemas: [síntoma, solución]. */
var TUTORIAL_CONCEPTOS = {
  wifi: {
    titulo: "¿Cómo funciona el WiFi?",
    analogia: "Piensa en el <b>router</b> como la oficina de correos de tu colonia: cada aparato tiene una <b>dirección IP</b> (como el número de tu casa) y el router lleva los mensajes a donde van, dentro de la casa o hacia internet.",
    nodos: [["esp", "📟", "ESP32", 50], ["router", "📶", "Router", 180], ["net", "🌎", "Internet", 310]],
    enlaces: [["esp", "router", "WiFi 2.4 GHz", true], ["router", "net", "cable", true]],
    glosario: [
      ["SSID", "El nombre de la red WiFi (el que ves en la lista del celular)."],
      ["Contraseña", "La llave para entrar a la red. Distingue mayúsculas de minúsculas."],
      ["Router", "El aparato que crea la red y la une con internet."],
      ["Dirección IP", "El número de cada aparato dentro de la red, por ejemplo 192.168.1.25."],
      ["2.4 GHz", "La banda que usa el ESP32. Las redes solo de 5 GHz no le sirven."]
    ],
    problemas: [
      ["No conecta nunca", "Revisa que la red sea de <b>2.4 GHz</b> y que el nombre y la contraseña estén escritos exactos (mayúsculas incluidas)."],
      ["Red de la escuela con página de inicio de sesión", "El ESP32 no puede llenar esa página: usa el hotspot de un celular."],
      ["Se desconecta a ratos", "Acerca el ESP32 al router o al celular que comparte la red."]
    ]
  },
  ntfy: {
    titulo: "¿Cómo llega el mensaje del celular al LED?",
    analogia: "ntfy.sh funciona como un <b>pizarrón público</b> con muchos canales. Tu celular escribe <em>on</em> en tu canal y el ESP32 se asoma al pizarrón cada 2 segundos para ver si hay algo nuevo.",
    nodos: [["cel", "📱", "Celular", 40], ["ntfy", "☁️", "ntfy.sh", 140], ["esp", "📟", "ESP32", 240], ["led", "💡", "LED", 330]],
    enlaces: [["cel", "ntfy", "publica"], ["ntfy", "esp", "HTTP GET"], ["esp", "led", "pin 2"]],
    glosario: [
      ["Canal (topic)", "El nombre de tu \"pizarrón\" en ntfy.sh. Quien conozca el nombre puede escribir en él."],
      ["HTTP GET", "Pedirle información a un servidor de internet, como cuando abres una página."],
      ["JSON", "Un formato de texto para mandar datos ordenados: <code>{\"message\": \"on\"}</code>."],
      ["Polling", "Preguntar cada cierto tiempo si hay algo nuevo (aquí, cada 2 segundos)."],
      ["Lista <em>visto</em>", "Guarda los mensajes ya atendidos para no repetirlos."]
    ],
    problemas: [
      ["El LED no responde", "Escribe el canal <b>exactamente igual</b> en el bloque y en el celular, y espera unos 2 segundos."],
      ["No dice <em>Conectado!</em>", "Es el WiFi: revisa la red de 2.4 GHz, el nombre y la contraseña."],
      ["Alguien más prende tu LED", "Usa un canal difícil de adivinar, como <em>tuNombre-123</em>."]
    ]
  },
  socket: {
    titulo: "¿Qué es un socket?",
    analogia: "Un socket es como una <b>llamada telefónica entre programas</b>. La <b>IP</b> es la dirección del edificio y el <b>puerto</b> es el número de departamento: el cliente toca a esa puerta y el servidor, que estaba esperando, abre.",
    nodos: [["cli", "📟", "Cliente", 60], ["ap", "📶", "Red ESP32_AP", 180], ["srv", "🖥️", "Servidor", 300]],
    enlaces: [["cli", "ap", "WiFi", false], ["ap", "srv", "TCP :80", true]],
    glosario: [
      ["Access Point (AP)", "El ESP32 servidor crea su propia red WiFi, sin router."],
      ["192.168.4.1", "La IP del ESP32 cuando es Access Point."],
      ["Puerto", "Un número (como 80) que indica a qué programa va el mensaje."],
      ["TCP", "Protocolo que confirma cada paquete: los datos llegan completos y en orden."],
      ["bind / listen / accept", "Amarrar el puerto, ponerse a esperar y atender a cada cliente."]
    ],
    problemas: [
      ["El cliente no conecta", "Enciende <b>primero el servidor</b> y revisa que el cliente use el mismo nombre de red y contraseña."],
      ["Error al crear la red", "La contraseña del Access Point debe tener <b>al menos 8 caracteres</b>."],
      ["No llega el mensaje", "Revisa la IP (192.168.4.1) y que el puerto sea el mismo en los dos (80)."]
    ]
  },
  portal: {
    titulo: "¿Cómo funciona un portal cautivo?",
    analogia: "Es como la <b>recepción de un hotel</b>: no importa a qué cuarto preguntes, primero te mandan a recepción. El ESP32 contesta \"soy yo\" a cualquier página que pida tu celular y le muestra su propia página.",
    nodos: [["cel", "📱", "Celular", 60], ["esp", "📟", "ESP32 (AP)", 200], ["web", "📄", "Página del ESP32", 320]],
    enlaces: [["cel", "esp", "¿google.com?", true], ["esp", "web", "DNS: soy yo"]],
    glosario: [
      ["Access Point", "La red WiFi que crea el ESP32 (ESP32_AP)."],
      ["DNS", "La \"agenda\" que convierte nombres como google.com en direcciones IP."],
      ["Servidor HTTP", "El programa que entrega páginas web."],
      ["Portal cautivo", "Una red que manda a todos a una página antes de dejarlos pasar."]
    ],
    problemas: [
      ["No aparece la página", "Apaga los <b>datos móviles</b> del celular para que use solo la red del ESP32."],
      ["Sigue sin aparecer", "Abre en el navegador una dirección que empiece con <b>http://</b> (no https), por ejemplo http://ejemplo.com."],
      ["No veo la red ESP32_AP", "Revisa que el programa siga corriendo en el monitor serial."]
    ]
  },
  espnow: {
    titulo: "¿Qué es ESP-NOW?",
    analogia: "ESP-NOW es como un par de <b>walkie-talkies</b>: los ESP32 se hablan directo, <b>sin router ni internet</b>. Para saber a quién le hablas usas su <b>dirección MAC</b>, que es como su número de teléfono.",
    nodos: [["a", "📟", "ESP32 emisor", 60], ["router", "📶", "Router", 180], ["b", "📟", "ESP32 receptor", 300]],
    enlaces: [["a", "b", "mensaje directo", false, false, true], ["a", "router", "", false, true]],
    glosario: [
      ["ESP-NOW", "Protocolo de Espressif para mensajes cortos entre placas, sin router."],
      ["Dirección MAC", "El número único de cada placa, como 24:6F:28:AB:CD:EF."],
      ["Peer", "Una placa registrada con la que te vas a comunicar."],
      ["250 bytes", "El tamaño máximo de cada mensaje: suficiente para textos cortos."],
      ["Alcance", "Decenas de metros en interiores y hasta ~200 m al aire libre."]
    ],
    problemas: [
      ["No llega nada", "Copia bien la <b>MAC del receptor</b> en el emisor (la imprime el receptor al iniciar)."],
      ["Funciona a ratos", "Deja el receptor encendido <b>antes</b> de enviar y acércalos."],
      ["Error al agregar receptor", "Es normal si ya estaba agregado: por eso va dentro de <em>try</em>."]
    ]
  },
  hc06: {
    titulo: "¿Cómo funciona el Bluetooth del HC-06?",
    analogia: "El HC-06 es un <b>traductor</b>: escucha al celular por Bluetooth y le repite todo al ESP32 por dos cables (TX y RX), como si fuera un teléfono de vasos con hilo.",
    nodos: [["cel", "📱", "Celular", 50], ["hc", "🔵", "HC-06", 180], ["esp", "📟", "ESP32", 310]],
    enlaces: [["cel", "hc", "Bluetooth", true], ["hc", "esp", "TX ⇄ RX", true]],
    glosario: [
      ["Bluetooth clásico", "Conexión de corto alcance (unos 10 m) entre dos aparatos."],
      ["Emparejar", "Registrar el HC-06 en el celular. El PIN suele ser <b>1234</b> o <b>0000</b>."],
      ["UART / serial", "Mandar datos letra por letra por dos cables: TX (habla) y RX (escucha)."],
      ["Baudios", "La velocidad del serial. El HC-06 viene en <b>9600</b>."]
    ],
    problemas: [
      ["Uso iPhone", "El HC-06 no funciona con iPhone: usa el tutorial de <b>Bluetooth LE</b>."],
      ["Conecta pero no llegan datos", "Revisa que TX y RX estén <b>cruzados</b>."],
      ["No sé qué app usar", "En Android, una app de terminal Bluetooth (por ejemplo <em>Serial Bluetooth Terminal</em>)."]
    ]
  },
  ble: {
    titulo: "¿Cómo funciona Bluetooth LE?",
    analogia: "BLE es como un <b>letrero luminoso</b>: el ESP32 anuncia su nombre para que lo encuentren. Cuando el celular se conecta, se pasan notas cortas por unos \"casilleros\" llamados <b>características</b>, gastando muy poca batería.",
    nodos: [["cel", "📱", "Celular", 80], ["esp", "📟", "ESP32 (BLE integrado)", 280]],
    enlaces: [["cel", "esp", "Bluetooth LE", true]],
    glosario: [
      ["BLE", "Bluetooth Low Energy: Bluetooth de bajo consumo. Ya viene dentro del ESP32."],
      ["Advertising", "El ESP32 anuncia su nombre para que el celular lo encuentre."],
      ["Servicio / característica", "Grupos y casilleros donde se dejan los datos."],
      ["UART BLE", "Un servicio que imita un puerto serial: escribir texto y recibirlo."],
      ["Decodificar", "Convertir los bytes que llegan en texto que puedas leer."]
    ],
    problemas: [
      ["No aparece ESP32-BLE", "No lo busques en los ajustes de Bluetooth: usa una app BLE (por ejemplo <em>nRF Connect</em> o <em>Serial Bluetooth Terminal</em>)."],
      ["Android no encuentra nada", "Activa el Bluetooth y el permiso de <b>ubicación</b> de la app."],
      ["Llegan letras raras", "Asegúrate de decodificar los bytes antes de imprimir."]
    ]
  },
  ir: {
    titulo: "¿Cómo viaja la señal infrarroja?",
    analogia: "El control manda <b>destellos de luz invisible</b>, como código Morse con una linterna. El receptor los cuenta y arma un número con ellos.",
    nodos: [["ctrl", "🎛️", "Control / KY-005", 70], ["rx", "👁️", "Receptor KY-022", 290]],
    enlaces: [["ctrl", "rx", "luz infrarroja 38 kHz"]],
    glosario: [
      ["Infrarrojo", "Luz que el ojo no ve, pero la cámara del celular sí."],
      ["38 kHz", "La luz parpadea 38,000 veces por segundo para no confundirse con el sol o los focos."],
      ["Protocolo NEC", "La forma de acomodar los destellos: inicio, dirección y comando."],
      ["Código", "El número que identifica a cada botón."]
    ],
    problemas: [
      ["No llega nada", "Apunta directo al sensor: la luz no atraviesa objetos."],
      ["Funciona mal cerca de la ventana", "El sol tiene mucho infrarrojo: prueba en la sombra."],
      ["¿Está emitiendo?", "Mira el LED con la cámara del celular: verás destellos morados."]
    ]
  }
};
