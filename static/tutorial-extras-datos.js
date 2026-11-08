/* ================================================================
   tutorial-extras-datos.js — Contenido extra de los tutoriales ESP32
   ----------------------------------------------------------------
   Por tutorial:
     n     nivel (1 básico · 2 intermedio · 3 avanzado)
     t     minutos aproximados
     dato  "¿Sabías que…?" (se muestra al probar el programa)
     exp   "¿Qué está pasando?" (cómo funciona por dentro)
     usos  aplicaciones reales (pantalla final)
     retos [reto, pista]  — 3 por tutorial: fácil, medio y difícil
     quiz  [pregunta, [opciones], índice correcto, por qué]  — 3: fácil, medio y difícil
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
      ["Conecta un LED externo en otro pin (por ejemplo el 4) y enciéndelo.", "Cambia el pin en <em>Preparar LED</em> y no olvides la resistencia de 220 Ω."],
      ["Enciende el LED integrado y uno externo <b>alternados</b>: cuando uno prende, el otro se apaga.", "Prepara dos LEDs (pin 2 y pin 4) y usa un ciclo con esperas."]
    ],
    quiz: [
      ["¿Qué voltaje pone el ESP32 en el pin cuando enciende el LED?", ["0 V", "3.3 V", "127 V"], 1, "El ESP32 trabaja a 3.3 V: un 1 lógico son 3.3 V."],
      ["¿Para qué sirve la resistencia de 220 Ω con un LED externo?", ["Para que brille más", "Para limitar la corriente y no quemarlo", "Para que parpadee"], 1, "Sin resistencia pasa demasiada corriente y el LED (o el pin) se puede dañar."],
      ["Si el LED externo no enciende, ¿qué revisas primero?", ["Que la pata larga vaya al pin y la corta a GND", "Que el WiFi esté conectado", "Que el monitor serial esté abierto"], 0, "Un LED es un diodo: solo deja pasar corriente en un sentido."]
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
      ["¿Cuántas veces se repite un ciclo <em>mientras Verdadero</em>?", ["Una vez", "10 veces", "Para siempre"], 2, "La condición siempre es verdadera, así que nunca termina."],
      ["Para que el LED dure 1 s encendido y 3 s apagado, ¿qué cambias?", ["Solo la primera espera", "Las dos esperas: 1 s después de encender y 3 s después de apagar", "El pin del LED"], 1, "Cada espera decide cuánto dura el estado anterior."]
    ]
  },

  semaforo: {
    n: 1, t: 20,
    dato: "El primer semáforo eléctrico se instaló en <b>1914 en Cleveland, EE. UU.</b> Solo tenía luces roja y verde; el amarillo llegó años después para avisar el cambio.",
    exp: "El programa es una <b>secuencia</b>: cada bloque <em>Cambiar estado</em> enciende una luz y el <em>esperar</em> que le sigue decide cuánto dura. Como todo está dentro de un ciclo infinito, el semáforo vuelve a empezar solo.",
    usos: ["Control de tráfico", "Semáforos peatonales", "Señales de \"pase / espere\" en estacionamientos"],
    retos: [
      ["Haz que el verde dure el doble que el rojo.", "Cambia el número del <em>esperar</em> que va después del verde."],
      ["Agrega un <b>verde parpadeante</b> antes del amarillo, como en muchas calles.", "Usa un ciclo <em>repetir 3 veces</em> que prenda y apague el verde."],
      ["Agrega un <b>botón peatonal</b>: al presionarlo, el semáforo pasa a rojo antes de tiempo.", "Lee el botón dentro del ciclo y usa un <em>si</em> para saltar al rojo."]
    ],
    quiz: [
      ["¿Qué bloque decide cuánto tiempo dura cada luz?", ["Preparar semáforo", "esperar", "repetir mientras"], 1, "La luz se queda así hasta que termina el <em>esperar</em>."],
      ["¿Por qué el semáforo se repite solo?", ["Porque está dentro de un ciclo infinito", "Porque el ESP32 se reinicia", "Porque lo vuelves a ejecutar"], 0, "El ciclo <em>mientras Verdadero</em> repite la secuencia para siempre."],
      ["¿Por qué el amarillo dura menos que el verde y el rojo?", ["Solo avisa que la luz va a cambiar", "Porque gasta más energía", "Por un error del programa"], 0, "Es una advertencia corta para que los autos frenen."]
    ]
  },

  neopixel_basico: {
    n: 2, t: 20,
    dato: "Cada NeoPixel tiene <b>tres LEDs diminutos</b> (rojo, verde y azul) y un chip. Mezclando 256 niveles de cada uno se forman más de <b>16 millones de colores</b>.",
    exp: "El ESP32 manda por un solo cable una fila de números: el color del LED 0, del LED 1, del 2… Cada LED se queda con su color y pasa el resto al siguiente. Por eso necesitas <em>Actualizar LEDs</em>: hasta ese momento los colores solo están guardados en la memoria del ESP32.",
    usos: ["Tiras decorativas y luces de ambiente", "Indicadores de nivel (batería, volumen)", "Disfraces y wearables que cambian de color"],
    retos: [
      ["Pinta los primeros 3 LEDs de rojo, verde y azul.", "Un bloque <em>Establecer color</em> por LED (0, 1 y 2) y al final <em>Actualizar</em>."],
      ["Haz un <b>arcoíris</b> que recorra la tira.", "Usa un ciclo <em>contar</em> para el número de LED y cambia el color en cada vuelta."],
      ["Haz un efecto de <b>carrera</b>: un LED encendido que avance por toda la tira y regrese.", "Ciclo <em>contar</em>: apaga todos, enciende el LED i, actualiza y espera poco."]
    ],
    quiz: [
      ["¿Qué pasa si olvidas el bloque <em>Actualizar LEDs</em>?", ["Los LEDs no cambian", "Se queman", "Se ponen blancos"], 0, "Los colores se guardan en memoria y solo se envían al actualizar."],
      ["¿Qué colores se mezclan para formar los demás?", ["Rojo, amarillo y azul", "Rojo, verde y azul", "Blanco y negro"], 1, "Es el modelo <b>RGB</b>: Red, Green, Blue."],
      ["¿Qué color se forma con rojo 255, verde 255 y azul 0?", ["Amarillo", "Morado", "Blanco"], 0, "Rojo + verde de luz = amarillo."]
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
      ["Enciende el LED del pin 2 cuando el contador sea par.", "Usa el bloque de <b>residuo</b> (contador ÷ 2) y compara con 0."],
      ["Agrega un <b>segundo botón</b> que reste 1 al contador.", "Prepara otro botón en otro pin y repite la detección de cambio, pero restando."]
    ],
    quiz: [
      ["Con PULL_UP, ¿qué lee el pin al presionar el botón?", ["1", "0", "3.3"], 1, "El botón une el pin con GND, por eso lee 0."],
      ["¿Por qué se usa una pequeña espera en el ciclo?", ["Para evitar contar los rebotes", "Para ahorrar batería", "Para que el LED brille"], 0, "Los rebotes del contacto duran milésimas de segundo."],
      ["¿Por qué el programa compara el estado actual con el anterior?", ["Para contar una sola vez por pulsación", "Para que el botón dure más", "Para ahorrar memoria"], 0, "Si solo revisara si está presionado, sumaría muchas veces mientras lo mantienes."]
    ]
  },

  infrarrojo_basico: {
    n: 1, t: 15,
    dato: "Los robots seguidores de línea de las competencias usan entre 2 y 8 sensores como este para saber si van <b>centrados</b> sobre la línea negra.",
    exp: "El sensor tiene un LED infrarrojo y un receptor. Lo blanco <b>refleja</b> la luz y el receptor la detecta (1); lo negro la <b>absorbe</b> y no regresa nada (0). El ESP32 solo lee si el pin está en 0 o en 1.",
    usos: ["Robots seguidores de línea", "Contadores de objetos en bandas", "Detectores de borde para que un robot no se caiga de la mesa"],
    retos: [
      ["Enciende el LED del pin 2 cuando el sensor vea negro.", "Usa <em>si ir_valor = 0</em> → encender, si no → apagar."],
      ["Cuenta cuántas veces pasa una línea negra por debajo del sensor.", "Como en el botón: suma solo cuando cambie de 1 a 0."],
      ["Con <b>dos sensores</b>, imprime \"izquierda\", \"derecha\" o \"centrado\" según cuál vea la línea.", "Prepara los dos sensores y compara sus valores con <em>si / si no si</em>."]
    ],
    quiz: [
      ["¿Por qué el sensor lee 0 sobre negro?", ["El negro absorbe la luz infrarroja", "El negro está más frío", "El negro es metálico"], 0, "No regresa luz al receptor."],
      ["¿Para qué sirve el potenciómetro del módulo?", ["Para cambiar el color", "Para ajustar la sensibilidad", "Para encenderlo"], 1, "Ajusta a partir de cuánta luz reflejada cambia la salida."],
      ["En un seguidor de línea, si solo el sensor izquierdo ve negro, ¿hacia dónde gira?", ["Hacia la izquierda", "Hacia la derecha", "Sigue derecho"], 0, "La línea quedó de ese lado: gira hacia ella para centrarte."]
    ]
  },

  analogico_adkey: {
    n: 2, t: 30,
    dato: "Muchos estéreos de auto usan este mismo truco: <b>un solo cable</b> para todos los botones del volante, cada uno con una resistencia distinta.",
    exp: "Cada botón forma un <b>divisor de voltaje</b> diferente, así que el pin recibe un voltaje distinto según la tecla. El ESP32 lo convierte en un número de 0 a 4095 (ADC) y tus bloques <em>si</em> revisan en qué rango cae para saber qué botón fue.",
    usos: ["Controles de volante en autos", "Menús de aparatos con pocos pines", "Paneles de control de robots"],
    retos: [
      ["Enciende el LED del pin 2 solo con el primer botón.", "Usa el mismo rango que ya tienes para ese botón."],
      ["Haz que cada botón toque una nota distinta con el buzzer.", "Combina este tutorial con el de Buzzer."],
      ["Controla un <b>servo</b>: un botón suma 10° y otro resta 10°.", "Guarda el ángulo en una variable y limítalo entre 0 y 180."]
    ],
    quiz: [
      ["¿Qué rango de números da el ADC del ESP32?", ["0 a 1", "0 a 100", "0 a 4095"], 2, "Es un ADC de 12 bits: 2¹² = 4096 valores."],
      ["¿Por qué se comparan rangos y no un número exacto?", ["Porque la lectura varía un poco", "Porque es más rápido", "Porque el ADC solo da pares"], 0, "Siempre hay pequeñas variaciones de voltaje."],
      ["¿Qué es un divisor de voltaje?", ["Resistencias que reparten el voltaje", "Un tipo de batería", "Un cable que corta la corriente"], 0, "Por eso cada botón entrega un voltaje distinto."]
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
      ["Haz una <b>sirena</b> que suba y baje de tono.", "Usa un ciclo <em>contar de 400 a 1000</em> y usa la variable como frecuencia."],
      ["Toca una <b>melodía</b> usando dos listas: una de notas y otra de duraciones.", "Recorre las listas con un ciclo usando el mismo índice para las dos."]
    ],
    quiz: [
      ["¿Qué pasa si subes la frecuencia?", ["El sonido es más grave", "El sonido es más agudo", "Suena más fuerte"], 1, "Más vibraciones por segundo = sonido más agudo."],
      ["¿Qué hace el bloque <em>Detener buzzer</em>?", ["Apaga el sonido", "Reinicia el ESP32", "Baja el volumen"], 0, "Deja de mandar la señal PWM."],
      ["¿Qué hace el ESP32 con el pin para que el buzzer suene (PWM)?", ["Lo prende y apaga muy rápido", "Le da 127 V", "Lo deja siempre encendido"], 0, "Cada cambio hace vibrar la placa del buzzer."]
    ]
  },

  servo: {
    n: 1, t: 15,
    dato: "Dentro de un servo hay un motor, engranes y un <b>potenciómetro</b> que mide en qué ángulo está el eje. Así el servo se corrige solo hasta llegar a la posición exacta.",
    exp: "El ESP32 manda un pulso cada 20 milisegundos. El <b>ancho</b> del pulso indica el ángulo: más o menos 0.5 ms = 0° y 2.5 ms = 180°. El circuito del servo compara ese ángulo con el de su eje y mueve el motor hasta igualarlo.",
    usos: ["Brazos robóticos", "Timones y alerones de aviones a escala", "Plumas de estacionamiento y compuertas"],
    retos: [
      ["Haz que el servo vaya de 0° a 180° y regrese.", "Dos bloques <em>Mover</em> con un <em>esperar</em> de 1 s entre ellos."],
      ["Haz un <b>limpiaparabrisas</b> suave, de grado en grado.", "Ciclo <em>contar de 0 a 180</em> con una espera corta, y otro de 180 a 0."],
      ["Controla el servo con un <b>potenciómetro</b>: que su ángulo siga a la perilla.", "Lee el valor analógico (0-4095) y conviértelo a 0-180 con una regla de tres."]
    ],
    quiz: [
      ["¿Cuántos grados puede girar un servo SG90?", ["90°", "180°", "360° sin parar"], 1, "Se mueve a posiciones entre 0° y 180°."],
      ["¿Qué indica al servo a qué ángulo ir?", ["El voltaje de alimentación", "El ancho del pulso", "El color del cable"], 1, "Pulsos más anchos = ángulos más grandes."],
      ["Si el servo vibra sin moverse, ¿qué ayuda?", ["Alimentarlo con 5 V externos y unir los GND", "Cambiar el cable USB por uno más largo", "Escribir el ángulo dos veces"], 0, "Al moverse, el motor pide picos de corriente que el ESP32 no siempre da."]
    ]
  },

  stepper_motor: {
    n: 2, t: 15,
    dato: "El 28BYJ-48 necesita unos <b>2048 pasos</b> para dar una vuelta completa: cada paso mueve el eje apenas 0.18°.",
    exp: "El motor tiene 4 bobinas. El driver ULN2003 las activa <b>una tras otra</b> en orden, y cada vez el imán del eje avanza un pasito hacia la bobina activa. Contando pasos, el ESP32 sabe exactamente cuánto giró sin necesitar sensor.",
    usos: ["Impresoras 3D y CNC", "Relojes y cámaras que giran", "Dispensadores de comida para mascotas"],
    retos: [
      ["Gira una vuelta completa (360°) y luego regresa.", "Usa <em>girar grados</em> con 360 y luego con -360."],
      ["Haz un <b>reloj</b>: avanza 6° cada segundo.", "Ciclo infinito con <em>girar 6 grados</em> y <em>esperar 1 s</em>."],
      ["Haz una <b>base giratoria</b> que avance 45° cada 2 segundos y regrese al inicio tras una vuelta.", "<em>Repetir 8 veces</em>: girar 45° y esperar; al final, girar -360°."]
    ],
    quiz: [
      ["¿Qué ventaja tiene un motor paso a paso?", ["Gira muy rápido", "Se mueve en pasos exactos", "No necesita energía"], 1, "Ideal cuando importa la precisión."],
      ["¿Para qué sirve el driver ULN2003?", ["Da la corriente que el ESP32 no puede dar a las bobinas", "Mide la temperatura", "Guarda el programa"], 0, "Los pines del ESP32 no aguantan la corriente del motor."],
      ["Si una vuelta son 2048 pasos, ¿cuántos pasos son 90°?", ["512", "1024", "90"], 0, "90° es un cuarto de vuelta: 2048 ÷ 4 = 512."]
    ]
  },

  puente_h: {
    n: 2, t: 25,
    dato: "Se llama <b>puente H</b> porque sus 4 interruptores, dibujados alrededor del motor, forman la letra <b>H</b>.",
    exp: "Para que un motor DC cambie de sentido hay que <b>invertir</b> la corriente. El L298N lo hace con interruptores electrónicos: con IN1=1, IN2=0 gira hacia un lado; con IN1=0, IN2=1, al revés. La energía viene de las pilas, no del ESP32.",
    usos: ["Carritos y robots con ruedas", "Puertas y persianas eléctricas", "Bandas transportadoras"],
    retos: [
      ["Haz que el carrito gire sobre su eje (una rueda adelante, otra atrás).", "Motor A adelante y motor B atrás al mismo tiempo."],
      ["Programa una ruta: adelante 2 s, gira, adelante 2 s.", "Encadena los movimientos con bloques <em>esperar</em>."],
      ["Agrega el <b>sensor ultrasónico</b> para que el carrito se detenga a 15 cm de un obstáculo.", "Es la idea del tutorial Carrito Esquiva Obstáculos."]
    ],
    quiz: [
      ["¿Cómo se cambia el sentido de giro de un motor DC?", ["Invirtiendo la corriente", "Subiendo el voltaje", "Con un servo"], 0, "El puente H invierte la polaridad."],
      ["¿Por qué los motores usan las pilas y no el ESP32?", ["Porque consumen mucha más corriente", "Porque el ESP32 no tiene GND", "Porque es más bonito"], 0, "Un motor puede pedir cientos de mA; un pin del ESP32, unos 20 mA."],
      ["¿Qué pasa si IN1 e IN2 están los dos en 0?", ["El motor se detiene", "Gira al máximo", "Cambia de sentido"], 0, "Sin diferencia de voltaje entre sus terminales, el motor no gira."]
    ]
  },

  relevador: {
    n: 2, t: 20,
    dato: "El \"clic\" que escuchas es una <b>pieza de metal real</b> moviéndose: dentro del relevador hay un electroimán que jala un interruptor.",
    exp: "El ESP32 solo activa una pequeña bobina (el <b>electroimán</b>). Ese imán mueve un contacto que cierra el circuito del foco. Así el ESP32 controla 127 V <b>sin que esa corriente pase por él</b>: los dos circuitos están separados.",
    usos: ["Domótica: prender luces y ventiladores", "Bombas de agua y riego automático", "Cerraduras eléctricas"],
    retos: [
      ["Haz que el foco prenda 5 s cada minuto.", "Ciclo infinito: encender, esperar 5, apagar, esperar 55."],
      ["Prende el foco solo cuando presiones un botón.", "Combina con el tutorial del Botón."],
      ["Prende el foco <b>automáticamente al oscurecer</b> con el sensor de luz BH1750.", "<em>si luz &lt; 50</em> → activar el relevador, si no → desactivarlo."]
    ],
    quiz: [
      ["¿Qué hay dentro de un relevador?", ["Un electroimán y un interruptor", "Una batería", "Un LED"], 0, "El imán mueve el contacto: de ahí el clic."],
      ["¿Por qué hay que armarlo desconectado y con un adulto?", ["Porque 127 V es peligroso", "Porque el ESP32 se calienta", "Porque el foco es frágil"], 0, "La corriente de la casa puede causar descargas graves."],
      ["En el relevador, ¿qué significa NO?", ["Normalmente abierto: conecta solo al activarse", "Que no funciona", "Normalmente cerrado"], 0, "Con NO el foco prende solo cuando el relevador se activa."]
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
      ["Mueve un servo a 0°, 90° o 180° con tres botones.", "Combina con el tutorial del Servo."],
      ["Haz un <b>menú</b>: cada botón del control imprime un mensaje distinto y uno desconocido imprime \"Botón no asignado\".", "Usa <em>si / si no si</em> para cada código y un <em>si no</em> al final."]
    ],
    quiz: [
      ["¿Por qué el receptor no se confunde con la luz del sol?", ["Solo hace caso a luz que parpadea a 38 kHz", "Porque el sol no tiene infrarrojo", "Porque tiene un filtro de colores"], 0, "El sol da luz constante, no a 38 kHz."],
      ["¿Qué necesita el control para funcionar?", ["Internet", "Apuntar hacia el receptor", "Estar emparejado"], 1, "La luz viaja en línea recta: necesita línea de vista."],
      ["Un botón da un código distinto cada vez o un número muy raro. ¿Qué pasa?", ["Ese control usa otro protocolo o hubo interferencia", "El ESP32 está roto", "Falta conectarse al WiFi"], 0, "Prueba de cerca y lejos de la luz del sol; algunos controles no usan NEC."]
    ]
  },

  ir_tx_ky005: {
    n: 2, t: 15, con: "ir",
    dato: "El protocolo <b>NEC</b> lo creó la empresa japonesa NEC en los años 80 y hoy lo usan millones de controles remotos.",
    exp: "El KY-005 tiene un LED infrarrojo. El ESP32 lo hace parpadear a 38 kHz siguiendo el protocolo NEC: primero una señal de inicio, luego la <b>dirección</b> (qué aparato) y el <b>comando</b> (qué botón). El receptor arma el número con esas ráfagas.",
    usos: ["Controles remotos universales", "Apagar la TV desde un horario", "Comunicación entre robots"],
    retos: [
      ["Envía un comando distinto cada 2 segundos.", "Ciclo infinito con dos bloques <em>IR NEC</em> y esperas."],
      ["Con un receptor KY-022 en otro ESP32, haz que el comando prenda un LED.", "El receptor compara el código que llega."],
      ["Arma un <b>control remoto</b> con botones: cada botón físico manda un comando distinto.", "Lee dos botones y envía un <em>IR NEC</em> diferente con cada uno."]
    ],
    quiz: [
      ["¿Cómo puedes ver si el KY-005 está emitiendo?", ["Con la cámara del celular", "A simple vista", "Con un imán"], 0, "Las cámaras captan el infrarrojo."],
      ["¿Qué indican la dirección y el comando en NEC?", ["El aparato y el botón", "La hora y la fecha", "El color y el brillo"], 0, "Dirección = qué aparato, comando = qué botón."],
      ["¿Qué necesita el receptor para recibir lo que manda el KY-005?", ["Estar de frente, con línea de vista", "Estar en la misma red WiFi", "Estar emparejado por Bluetooth"], 0, "La luz infrarroja viaja en línea recta."]
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
      ["Haz un <b>sensor de reversa</b>: el buzzer pita más rápido mientras más cerca estés.", "Usa la distancia para calcular la espera entre pitidos."],
      ["Haz un <b>semáforo de distancia</b>: verde lejos, amarillo a media distancia y rojo muy cerca.", "Combina con el tutorial del Semáforo y usa dos límites."]
    ],
    quiz: [
      ["¿Por qué se divide entre 2 en el cálculo?", ["Porque el sonido va y regresa", "Porque hay 2 bocinas", "Para redondear"], 0, "El tiempo medido es de ida y vuelta."],
      ["¿Qué animal usa el mismo principio?", ["El murciélago", "El gato", "La tortuga"], 0, "Se llama ecolocalización."],
      ["Si el eco tarda 0.002 s en volver, ¿a qué distancia está el objeto? (sonido: 343 m/s)", ["Unos 34 cm", "Unos 69 cm", "Unos 3 m"], 0, "0.002 × 343 = 0.686 m de ida y vuelta; ÷ 2 ≈ 0.34 m."]
    ]
  },

  medidor_estatura: {
    n: 2, t: 30,
    dato: "Tu cuerpo es un <b>conductor</b>: por eso el ESP32 nota cuando tocas el aluminio. Las pantallas táctiles de los celulares funcionan con un principio parecido.",
    exp: "El sensor está a una altura fija y mide la distancia hasta tu cabeza. Restando: <b>estatura = altura del sensor − distancia</b>. El TouchPad mide la capacitancia del pin: al tocarlo el número baja y el programa lo usa como botón.",
    usos: ["Básculas con medidor de estatura en clínicas", "Control de acceso en juegos mecánicos", "Medir crecimiento de plantas"],
    retos: [
      ["Muestra la estatura en metros (por ejemplo 1.52 m).", "Divide la estatura entre 100."],
      ["Haz que el buzzer pite al terminar de medir.", "Agrega un tono corto después de imprimir."],
      ["Toma <b>5 mediciones</b> seguidas y muestra el promedio para un resultado más preciso.", "Suma las 5 distancias en una variable y divide entre 5."]
    ],
    quiz: [
      ["¿Cómo se calcula la estatura?", ["Altura del sensor − distancia medida", "Distancia × 2", "Altura + distancia"], 0, "El sensor mide lo que hay entre él y tu cabeza."],
      ["¿Por qué el aluminio funciona como botón?", ["Tu cuerpo cambia la capacitancia del pin", "Porque es metal brillante", "Porque genera electricidad"], 0, "El TouchPad detecta ese cambio."],
      ["Si el sensor está a 200 cm del piso y mide 48 cm, ¿cuál es la estatura?", ["152 cm", "248 cm", "48 cm"], 0, "200 − 48 = 152."]
    ]
  },

  carrito_esquiva_obstaculos: {
    n: 3, t: 45,
    dato: "Las aspiradoras robot usan sensores muy parecidos (ultrasonido, infrarrojo o láser) para no chocar con muebles y paredes.",
    exp: "El programa repite muy rápido: <b>mide → decide → mueve</b>. Si la distancia es menor al límite, detiene, retrocede y gira; si no, sigue adelante. A este ciclo se le llama <b>lazo de control</b> y es la base de cualquier robot autónomo.",
    usos: ["Aspiradoras robot", "Autos con frenado automático", "Robots de almacén"],
    retos: [
      ["Haz que gire a un lado distinto cada vez (izquierda, luego derecha).", "Usa una variable que cambie entre 0 y 1."],
      ["Agrega un buzzer que pite cuando detecte un obstáculo.", "Pon el tono dentro del <em>si distancia &lt; …</em>."],
      ["Si el carrito se topa con obstáculos <b>3 veces seguidas</b>, que dé media vuelta.", "Cuenta los obstáculos seguidos en una variable y regrésala a 0 cuando avance libre."]
    ],
    quiz: [
      ["¿Qué hace el carrito cuando detecta un obstáculo cerca?", ["Se detiene, retrocede y gira", "Acelera", "Se apaga"], 0, "Así lo esquiva."],
      ["¿Cómo se llama el ciclo mide → decide → mueve?", ["Lazo de control", "Ciclo de carga", "Bucle de color"], 0, "Es la base de los robots autónomos."],
      ["¿Por qué el carrito retrocede antes de girar?", ["Para tener espacio y girar sin chocar", "Para cargar la batería", "Para medir mejor"], 0, "Si gira pegado a la pared, se puede atorar."]
    ]
  },

  dht11: {
    n: 1, t: 15,
    dato: "El DHT11 mide la humedad con un material que <b>absorbe agua del aire</b>: al humedecerse cambia su resistencia eléctrica.",
    exp: "El sensor tiene su propio chip que mide y manda los datos por <b>un solo cable</b>, como una serie de pulsos largos y cortos (bits). El bloque <em>Medir</em> le pide una lectura y luego tú tomas la temperatura y la humedad.",
    usos: ["Estaciones meteorológicas", "Invernaderos automáticos", "Termostatos de aire acondicionado"],
    retos: [
      ["Enciende el LED del pin 2 si la temperatura pasa de 30 °C.", "<em>si temp &gt; 30</em> → encender."],
      ["Calcula la temperatura en Fahrenheit.", "°F = °C × 1.8 + 32."],
      ["Avisa <b>\"Mucho calor\"</b> solo cuando la temperatura pase de 30 °C <b>y</b> la humedad de 70 %.", "Une las dos condiciones con el bloque <em>y</em>."]
    ],
    quiz: [
      ["¿Cada cuánto conviene leer el DHT11?", ["Cada 2 segundos o más", "1000 veces por segundo", "Una vez al día"], 0, "Es un sensor lento: necesita tiempo entre lecturas."],
      ["¿Qué mide el DHT11 además de la temperatura?", ["La presión", "La humedad", "La luz"], 1, "Humedad relativa, en porcentaje."],
      ["¿Qué significa una humedad relativa de 100 %?", ["El aire ya no puede contener más vapor de agua", "Que está lloviendo", "Que hace 100 °C"], 0, "A partir de ahí el vapor se condensa: rocío o niebla."]
    ]
  },

  ky001: {
    n: 2, t: 15,
    dato: "Cada DS18B20 trae de fábrica un <b>número de serie único</b> de 64 bits: por eso puedes poner muchos en el mismo cable.",
    exp: "OneWire es un protocolo de <b>un solo cable</b> de datos. El ESP32 primero <em>escanea</em> para encontrar los sensores, luego les pide <em>convertir</em> (medir) y, tras esperar, lee la temperatura de cada uno con precisión de ±0.5 °C.",
    usos: ["Termómetros de alberca y acuario", "Control de temperatura en cocinas", "Monitoreo de refrigeradores"],
    retos: [
      ["Avisa con el buzzer si la temperatura baja de 20 °C.", "<em>si temperatura &lt; 20</em> → tono."],
      ["Guarda la temperatura más alta que se haya medido.", "Variable <em>maxima</em> que se actualiza si la nueva es mayor."],
      ["Haz un <b>termostato</b>: prende un LED (calefacción) bajo 22 °C y apágalo sobre 24 °C.", "Dos límites distintos evitan que el LED prenda y apague a cada rato."]
    ],
    quiz: [
      ["¿Cuántos cables de datos usa OneWire?", ["1", "2", "4"], 0, "De ahí su nombre."],
      ["¿Por qué se puede tener varios sensores en el mismo pin?", ["Cada uno tiene un número único", "Porque miden distinto", "No se puede"], 0, "El ESP32 les habla por su número."],
      ["¿Por qué hay que esperar después de <em>convertir</em> antes de leer?", ["El sensor necesita tiempo para medir", "Para que se enfríe", "Para ahorrar WiFi"], 0, "Con máxima precisión tarda hasta 0.75 s."]
    ]
  },

  rtc_ds3231: {
    n: 2, t: 15,
    dato: "El DS3231 tiene un <b>cristal de cuarzo</b> con compensación de temperatura: se desvía menos de 1 minuto al año.",
    exp: "El RTC es un reloj independiente con su propia pila. El ESP32 le escribe la fecha y hora una vez y después solo la lee por <b>I2C</b>. Aunque desconectes el ESP32, el DS3231 sigue contando.",
    usos: ["Alarmas y despertadores", "Registradores de datos con fecha", "Riego automático por horario"],
    retos: [
      ["Enciende el LED cuando los segundos sean múltiplo de 10.", "Usa el residuo de segundos ÷ 10."],
      ["Haz una alarma: que suene el buzzer a una hora fija.", "Compara hora y minuto con los que elijas."],
      ["Haz un <b>horario escolar</b>: imprime \"Recreo\" de 10:30 a 11:00 y \"Clase\" el resto del tiempo.", "Convierte la hora a minutos (hora × 60 + minuto) para comparar rangos."]
    ],
    quiz: [
      ["¿Por qué el RTC no pierde la hora al desconectar el ESP32?", ["Tiene su propia pila", "La guarda en internet", "No es cierto, sí la pierde"], 0, "La pila CR2032 lo mantiene funcionando."],
      ["¿Por qué protocolo se comunica?", ["I2C", "WiFi", "Bluetooth"], 0, "Usa SDA y SCL."],
      ["¿Por qué el RTC es más preciso que contar con <em>esperar</em>?", ["Tiene un cristal de cuarzo que solo cuenta el tiempo", "Porque se conecta a internet", "No lo es"], 0, "Las esperas se atrasan con lo que tarda cada instrucción."]
    ]
  },

  mpu6050_imu: {
    n: 2, t: 20,
    dato: "Dentro del MPU6050 hay <b>piezas microscópicas que se mueven</b> (tecnología MEMS). Tu celular usa sensores así para girar la pantalla.",
    exp: "El <b>acelerómetro</b> mide hacia dónde jala la gravedad y los empujones; el <b>giroscopio</b> mide qué tan rápido gira en cada eje (X, Y, Z). Juntos dicen cómo está inclinado y cómo se mueve el sensor.",
    usos: ["Drones que se estabilizan solos", "Controles de videojuegos", "Contadores de pasos"],
    retos: [
      ["Enciende el LED cuando inclines el sensor hacia un lado.", "Compara la aceleración X con un número."],
      ["Haz un detector de sacudidas que pite con el buzzer.", "Si la aceleración cambia mucho de golpe → tono."],
      ["Haz un <b>nivel de burbuja</b>: prende un LED distinto si se inclina a la izquierda, está derecho o se inclina a la derecha.", "Usa la aceleración X con dos límites."]
    ],
    quiz: [
      ["¿Qué mide el giroscopio?", ["La velocidad de giro", "La temperatura", "La distancia"], 0, "En grados por segundo."],
      ["¿Qué fuerza mide siempre el acelerómetro aunque esté quieto?", ["La gravedad", "El magnetismo", "Ninguna"], 0, "Por eso sabe hacia dónde está \"abajo\"."],
      ["Con el sensor quieto y plano, ¿qué marca el eje Z del acelerómetro?", ["Cerca de 1 g (la gravedad, 9.8 m/s²)", "Exactamente 0", "100"], 0, "Aunque no se mueva, siente la gravedad."]
    ]
  },

  gps_modulo: {
    n: 2, t: 20,
    dato: "Hay más de <b>30 satélites GPS</b> girando a unos 20,000 km de altura. Tu módulo necesita ver al menos 4 para saber dónde está.",
    exp: "Cada satélite manda la hora exacta. El GPS mide cuánto tardó cada señal en llegar y con eso calcula la distancia a cada satélite (<b>trilateración</b>). Luego manda latitud y longitud al ESP32 por el puerto serial.",
    usos: ["Navegación en autos y celulares", "Rastreo de mascotas y paquetes", "Drones que regresan solos"],
    retos: [
      ["Imprime un enlace de Google Maps con tu posición.", "Une el texto <em>https://maps.google.com/?q=</em> con latitud, coma y longitud."],
      ["Imprime la hora que da el GPS.", "El GPS trae la hora exacta de los satélites."],
      ["Revisa si estás <b>dentro de tu escuela</b> comparando latitud y longitud con un rango.", "Anota las coordenadas de dos esquinas y revisa que tu posición quede entre ellas."]
    ],
    quiz: [
      ["¿Por qué el GPS funciona mal dentro de un edificio?", ["Las paredes bloquean la señal de los satélites", "Necesita WiFi", "Porque está oscuro"], 0, "Necesita cielo abierto."],
      ["¿Cuántos satélites necesita como mínimo?", ["1", "4", "30"], 1, "Tres para la posición y uno más para corregir la hora."],
      ["¿Qué indica la latitud?", ["Qué tan al norte o al sur estás", "La altura sobre el mar", "La hora local"], 0, "La longitud indica qué tan al este u oeste."]
    ]
  },

  encoder_rotatorio: {
    n: 2, t: 15,
    dato: "La perilla de volumen de muchos estéreos es un encoder: por eso <b>gira sin tope</b>, a diferencia de un potenciómetro.",
    exp: "Al girar, el encoder genera dos señales (CLK y DT) desfasadas. Según cuál cambia primero, el ESP32 sabe el <b>sentido</b> del giro y suma o resta 1 al valor.",
    usos: ["Perillas de volumen", "Menús de impresoras 3D", "Medir cuánto gira una rueda"],
    retos: [
      ["Usa el encoder para mover un servo.", "Usa el valor (limitado de 0 a 180) como ángulo."],
      ["Enciende el LED solo cuando el valor sea mayor a 10.", "<em>si valor &gt; 10</em>."],
      ["Haz un <b>menú de 3 opciones</b> que se elijan girando el encoder.", "Usa el residuo de valor ÷ 3 para saber qué opción está seleccionada."]
    ],
    quiz: [
      ["¿Cómo sabe el ESP32 hacia dónde giras?", ["Por cuál señal cambia primero", "Por la fuerza", "Por el color"], 0, "CLK y DT van desfasadas."],
      ["¿En qué se diferencia de un potenciómetro?", ["Gira sin tope", "Mide temperatura", "Es más caro"], 0, "El potenciómetro tiene un inicio y un fin."],
      ["Si el valor baja al girar, ¿qué significa?", ["Giraste en el otro sentido", "Se descompuso", "Se acabó la pila"], 0, "Un sentido suma y el otro resta."]
    ]
  },

  rfid_mfrc522: {
    n: 2, t: 20,
    dato: "Las tarjetas RFID <b>no tienen pila</b>: toman energía del campo del lector para responder.",
    exp: "El lector crea un campo de radio de <b>13.56 MHz</b>. Cuando acercas la tarjeta, su antena recibe energía, enciende su chip y responde con su <b>UID</b> (número único). El ESP32 lo lee por SPI.",
    usos: ["Tarjetas del transporte público", "Control de acceso en oficinas", "Inventario de libros en bibliotecas"],
    retos: [
      ["Prende el LED solo con <b>tu</b> tarjeta.", "Compara el UID con el que anotaste."],
      ["Cuenta cuántas veces se ha pasado una tarjeta.", "Suma 1 cada vez que haya tarjeta presente."],
      ["Haz un <b>control de acceso</b> con 2 tarjetas permitidas: LED verde si pasa y buzzer si no.", "Guarda los UID permitidos en una lista y usa <em>lista contiene</em>."]
    ],
    quiz: [
      ["¿De dónde saca energía la tarjeta?", ["Del campo del lector", "De una pila", "Del sol"], 0, "Por inducción, como un cargador inalámbrico."],
      ["¿Qué es el UID?", ["El número único de la tarjeta", "La contraseña de WiFi", "El color de la tarjeta"], 0, "Cada tarjeta tiene uno distinto."],
      ["¿A qué distancia lee normalmente el MFRC522?", ["Pocos centímetros", "10 metros", "Un kilómetro"], 0, "Funciona por inducción: hay que acercar la tarjeta."]
    ]
  },

  teclado_matricial: {
    n: 2, t: 15,
    dato: "Con una matriz, 16 teclas usan solo <b>8 pines</b> (4 filas + 4 columnas) en vez de 16.",
    exp: "El ESP32 activa una <b>fila</b> a la vez y revisa las columnas. Si una columna responde, sabe que la tecla está en el cruce de esa fila y esa columna. Lo hace tan rápido que parece instantáneo.",
    usos: ["Cerraduras con contraseña", "Cajeros automáticos", "Calculadoras y teléfonos"],
    retos: [
      ["Haz una cerradura: enciende el LED si se presiona la tecla 'A'.", "<em>si tecla = 'A'</em>."],
      ["Arma una contraseña de 4 dígitos.", "Junta las teclas en un texto y compáralo con el tuyo."],
      ["Haz una <b>calculadora</b>: un número, 'A' para sumar, otro número y '#' para el resultado.", "Guarda el primer número en una variable al presionar 'A'."]
    ],
    quiz: [
      ["¿Cuántos pines usa el teclado 4x4?", ["4", "8", "16"], 1, "4 filas + 4 columnas."],
      ["¿Cómo sabe el ESP32 qué tecla presionaste?", ["Por el cruce de fila y columna", "Por el sonido", "Por la presión"], 0, "Revisa fila por fila."],
      ["¿Por qué se imprime vacío si no presionas nada?", ["No encontró ningún cruce de fila y columna", "El teclado está roto", "Falta el WiFi"], 0, "Ninguna tecla unió una fila con una columna."]
    ]
  },

  teclado_4x3: {
    n: 2, t: 15,
    dato: "El teclado 4x3 tiene la misma distribución que el de un <b>teléfono</b>: 1-9, *, 0 y #.",
    exp: "Funciona igual que el 4x4: el ESP32 activa una fila a la vez y revisa cuál de las 3 columnas responde. Con 7 pines lee 12 teclas.",
    usos: ["Teléfonos y porteros eléctricos", "Cajas fuertes", "Máquinas expendedoras"],
    retos: [
      ["Imprime \"Correcto\" al presionar '#'.", "<em>si tecla = '#'</em>."],
      ["Suma los números que vayas presionando.", "Convierte la tecla a número y súmala a una variable."],
      ["Haz una <b>contraseña de 4 dígitos</b> que se confirme con '#' y se borre con '*'.", "Junta las teclas en un texto; con '*' vacíalo y con '#' compáralo."]
    ],
    quiz: [
      ["¿Cuántos pines usa el teclado 4x3?", ["7", "12", "3"], 0, "4 filas + 3 columnas."],
      ["¿Necesita VCC y GND?", ["Sí", "No", "Solo GND"], 1, "Son solo interruptores entre filas y columnas."],
      ["¿Qué tecla queda en el cruce de la fila 2 y la columna 3?", ["6", "5", "9"], 0, "La fila 2 es 4 5 6, y la columna 3 es la del 6."]
    ]
  },

  teclado_4x4_i2c: {
    n: 2, t: 15,
    dato: "El adaptador I2C es un chip <b>expansor de pines</b>: le da 8 pines más al ESP32 usando solo 2 cables.",
    exp: "El chip del adaptador lee las filas y columnas por ti y le manda al ESP32 el resultado por <b>I2C</b> (SDA y SCL). En el mismo par de cables puedes conectar también una pantalla u otros sensores.",
    usos: ["Paneles de control con pantalla", "Sistemas de alarma", "Proyectos con muchos sensores"],
    retos: [
      ["Muestra la tecla presionada en una pantalla OLED.", "La OLED también usa I2C: comparte SDA y SCL."],
      ["Enciende el LED con 'A' y apágalo con 'B'.", "Dos bloques <em>si</em>."],
      ["Muestra en la OLED la contraseña como <b>asteriscos</b> (****) mientras la escribes.", "Por cada tecla agrega '*' a un texto y escríbelo en la pantalla."]
    ],
    quiz: [
      ["¿Cuántos pines de datos usa con I2C?", ["2", "8", "16"], 0, "SDA y SCL."],
      ["¿Puedes conectar otro módulo I2C en los mismos pines?", ["Sí, cada uno tiene su dirección", "No", "Solo si es igual"], 0, "I2C es un bus compartido."],
      ["¿Qué es la dirección I2C (como 0x20)?", ["El número que identifica a cada módulo en el bus", "El voltaje", "El color del cable"], 0, "Así el ESP32 sabe a qué módulo le habla."]
    ]
  },

  bmp280_presion: {
    n: 2, t: 15,
    dato: "La presión del aire baja unos <b>12 Pa por cada metro</b> que subes. Por eso el BMP280 puede estimar la altitud.",
    exp: "El sensor tiene una membrana diminuta que se dobla con la presión del aire. El chip mide esa deformación, la corrige con la temperatura y manda la presión (en Pascales) al ESP32 por I2C.",
    usos: ["Estaciones meteorológicas", "Drones que mantienen la altura", "Relojes de montañismo"],
    retos: [
      ["Mide la diferencia de presión entre el piso y lo alto de un mueble.", "Guarda la primera lectura y resta las siguientes."],
      ["Muestra la presión en hectopascales (hPa).", "Divide entre 100."],
      ["Haz un <b>altímetro</b>: guarda la presión al inicio y muestra cuántos metros subiste.", "Cada 12 Pa de diferencia son aproximadamente 1 metro."]
    ],
    quiz: [
      ["¿Qué pasa con la presión al subir una montaña?", ["Baja", "Sube", "No cambia"], 0, "Hay menos aire encima."],
      ["¿En qué unidad la da el sensor?", ["Pascales", "Grados", "Lux"], 0, "1 hPa = 100 Pa."],
      ["Si la presión baja rápido durante el día, ¿qué suele indicar?", ["Que se acerca mal tiempo", "Que es mediodía", "Nada"], 0, "Una baja de presión suele traer nubes y lluvia."]
    ]
  },

  bh1750_luz: {
    n: 1, t: 15,
    dato: "Un día soleado tiene unos <b>100,000 lux</b>; un salón de clases, unos 500; y una noche de luna llena, menos de 1.",
    exp: "El BH1750 tiene un fotodiodo que convierte la luz en corriente. Su chip la mide y la entrega ya convertida en <b>lux</b> (la unidad de iluminación) por I2C.",
    usos: ["Brillo automático de pantallas", "Luces que se prenden al anochecer", "Medir la luz para plantas"],
    retos: [
      ["Enciende el LED cuando haya poca luz (menos de 50 lux).", "<em>si luz &lt; 50</em>."],
      ["Clasifica: \"oscuro\", \"normal\" o \"brillante\".", "Usa <em>si / si no si</em> con dos límites."],
      ["Controla el <b>brillo de un LED</b>: más brillante mientras más oscuro esté.", "Usa PWM e invierte el valor: brillo = máximo − luz (limitado)."]
    ],
    quiz: [
      ["¿Qué mide el lux?", ["La iluminación", "El sonido", "La temperatura"], 0, "Cuánta luz llega a una superficie."],
      ["¿Qué pasa con el valor si tapas el sensor?", ["Baja", "Sube", "No cambia"], 0, "Le llega menos luz."],
      ["¿Cuántos lux hay aproximadamente en un salón de clases?", ["Unos 500", "Unos 100,000", "Menos de 1"], 0, "100,000 es pleno sol y menos de 1, una noche de luna."]
    ]
  },

  qmc5883l_brujula: {
    n: 2, t: 15,
    dato: "La Tierra es un <b>imán gigante</b>. Una brújula electrónica mide ese campo magnético, que es miles de veces más débil que el de un imán de refrigerador.",
    exp: "El sensor mide el campo magnético en 3 ejes (X, Y, Z). Con X y Y se puede calcular hacia dónde apunta, como una brújula. Los motores y los imanes cercanos alteran la lectura.",
    usos: ["Brújula del celular", "Drones y robots que se orientan", "Detectores de metales sencillos"],
    retos: [
      ["Acerca un imán y observa cómo cambian los valores.", "Prueba con distintas distancias."],
      ["Enciende el LED cuando el sensor apunte al norte.", "Busca el valor de X cuando apuntas al norte y compáralo."],
      ["Calcula el <b>rumbo en grados</b> con atan2(Y, X) e imprime N, E, S u O.", "Usa el bloque de arcotangente y convierte de radianes a grados."]
    ],
    quiz: [
      ["¿Qué mide este sensor?", ["El campo magnético", "La luz", "La humedad"], 0, "En 3 ejes."],
      ["¿Qué cosas alteran la lectura?", ["Imanes y motores", "La música", "El color de la mesa"], 0, "Tienen sus propios campos magnéticos."],
      ["¿Hacia dónde apunta el norte de una brújula?", ["Al polo norte magnético de la Tierra", "Siempre al sol", "Hacia abajo"], 0, "Está cerca del polo norte geográfico, pero no es el mismo punto."]
    ]
  },

  color_tcs34725: {
    n: 2, t: 15,
    dato: "El sensor tiene <b>filtros de color</b> sobre sus fotodiodos, parecido a como tu ojo tiene células para el rojo, el verde y el azul.",
    exp: "El TCS34725 ilumina el objeto con su LED blanco y mide cuánta luz roja, verde y azul regresa. El canal más alto te dice de qué color es. Todo llega al ESP32 por I2C.",
    usos: ["Máquinas que separan frutas o dulces por color", "Calibración de pantallas", "Robots que siguen colores"],
    retos: [
      ["Imprime \"ROJO\" cuando el canal rojo sea el más alto.", "Compara rojo &gt; verde y rojo &gt; azul."],
      ["Copia el color leído a un NeoPixel.", "Usa los tres valores como color RGB."],
      ["Haz un <b>clasificador</b>: imprime ROJO, VERDE o AZUL según el canal más alto, u \"otro\" si son parecidos.", "Si la diferencia entre el mayor y los demás es pequeña, es \"otro\"."]
    ],
    quiz: [
      ["¿Qué canales mide el sensor?", ["Rojo, verde y azul", "Blanco y negro", "Solo rojo"], 0, "Más la luz total."],
      ["¿Por qué conviene alejarlo del sol?", ["La luz del sol altera la medición", "Se derrite", "No importa"], 0, "Mide la luz que le llega."],
      ["¿Para qué tiene el sensor un LED blanco?", ["Para iluminar el objeto de forma pareja", "Para avisar que está prendido", "Para calentar"], 0, "Así el color medido depende menos de la luz del cuarto."]
    ]
  },

  inmp441_microfono: {
    n: 3, t: 20,
    dato: "El INMP441 es un micrófono <b>MEMS</b>, del mismo tipo que traen los celulares y los audífonos inalámbricos.",
    exp: "El micrófono convierte el sonido en números (<b>digital</b>) y los manda por <b>I2S</b>, un protocolo hecho para audio. El bloque <em>nivel sonido</em> toma muchas muestras y calcula qué tan fuerte es el sonido.",
    usos: ["Asistentes de voz", "Medidores de ruido en salones", "Luces que bailan con la música"],
    retos: [
      ["Enciende el LED si hay mucho ruido.", "<em>si nivel &gt; …</em> (prueba aplaudiendo para elegir el número)."],
      ["Haz un <b>aplausómetro</b> con un NeoPixel que cambie de color.", "Verde = poco ruido, rojo = mucho."],
      ["Haz un <b>detector de aplausos</b>: prende el LED con 2 aplausos seguidos.", "Detecta picos que pasen un límite y cuenta los que llegan en menos de 1 segundo."]
    ],
    quiz: [
      ["¿Qué protocolo usa para mandar el audio?", ["I2S", "I2C", "WiFi"], 0, "I2S está hecho para sonido."],
      ["¿Para qué sirve conectar L/R a GND?", ["Elige el canal izquierdo", "Sube el volumen", "Lo apaga"], 0, "Con dos micrófonos se puede hacer estéreo."],
      ["¿Qué significa que el micrófono sea digital?", ["Entrega el sonido ya convertido en números", "Que funciona con pilas", "Que solo graba voces"], 0, "El ESP32 no tiene que convertirlo."]
    ]
  },

  flujo_agua: {
    n: 2, t: 20,
    dato: "Una llave abierta puede tirar entre <b>6 y 12 litros por minuto</b>. ¡Cerrarla al lavarte los dientes ahorra muchísima agua!",
    exp: "Dentro del sensor hay una <b>turbina con un imán</b>. Cada vuelta genera un pulso en el pin (sensor de efecto Hall). Contando pulsos por segundo, el ESP32 calcula los litros por minuto.",
    usos: ["Medidores de consumo de agua", "Riego automático", "Dispensadores de bebidas"],
    retos: [
      ["Enciende el LED mientras pase agua.", "<em>si flujo &gt; 0</em>."],
      ["Calcula los litros totales que han pasado.", "Suma flujo ÷ 60 cada segundo."],
      ["Haz un <b>medidor de consumo</b>: cuando pasen 2 litros, prende un LED de aviso.", "Acumula los litros (flujo ÷ 60 cada segundo) y compara con 2."]
    ],
    quiz: [
      ["¿Qué gira dentro del sensor?", ["Una turbina", "Un motor", "Nada"], 0, "La mueve el agua."],
      ["¿Qué cuenta el ESP32 para calcular el flujo?", ["Pulsos", "Gotas", "Grados"], 0, "Más pulsos por segundo = más flujo."],
      ["Si pasan 6 L/min durante 30 segundos, ¿cuántos litros pasaron?", ["3 litros", "6 litros", "180 litros"], 0, "30 s es medio minuto: 6 × 0.5 = 3 L."]
    ]
  },

  fpm383c_huella: {
    n: 3, t: 20,
    dato: "No hay dos personas con la misma huella digital, <b>ni siquiera los gemelos idénticos</b>.",
    exp: "El sensor toma una imagen de tu dedo y busca los <b>puntos característicos</b> (donde las líneas terminan o se dividen). Guarda esos puntos con un número de ID y después compara cada dedo nuevo contra los guardados.",
    usos: ["Desbloqueo de celulares", "Control de asistencia", "Cerraduras inteligentes"],
    retos: [
      ["Registra tu huella con el bloque <em>registrar ID</em>.", "Usa un ID libre, por ejemplo 1."],
      ["Enciende el LED solo si la huella es la tuya.", "Compara el resultado de <em>verificar</em> con tu ID."],
      ["Haz una <b>cerradura</b>: LED verde con huella válida y buzzer después de 3 intentos fallidos.", "Cuenta los intentos fallidos en una variable y regrésala a 0 al acertar."]
    ],
    quiz: [
      ["¿Qué compara el sensor para reconocer una huella?", ["Puntos característicos", "El color de la piel", "La temperatura"], 0, "Donde las líneas terminan o se dividen."],
      ["¿Qué hay que hacer antes de verificar?", ["Registrar la huella", "Conectar WiFi", "Nada"], 0, "Si no está guardada, no la reconoce."],
      ["¿Para qué se guarda un ID con cada huella?", ["Para saber de quién es la huella reconocida", "Para darle color", "No se guarda nada"], 0, "El sensor responde con el ID de la huella que coincide."]
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
      ["Muestra un contador que suba cada segundo.", "Limpia, escribe el número y espera 1 s dentro de un ciclo."],
      ["Haz una <b>pelota que rebote</b> de lado a lado de la pantalla.", "Cambia X en un ciclo; al llegar a 0 o a 120, invierte la dirección."]
    ],
    quiz: [
      ["¿Cuántos píxeles tiene de ancho?", ["64", "128", "1080"], 1, "Es de 128 × 64."],
      ["¿Hacia dónde crece la Y?", ["Hacia abajo", "Hacia arriba", "Hacia la derecha"], 0, "El 0 está arriba."],
      ["¿Por qué hay que limpiar la pantalla antes de volver a escribir?", ["Para que no se encime lo anterior", "Para ahorrar energía", "No hace falta"], 0, "Lo dibujado se queda hasta que lo borras."]
    ]
  },

  sh1106_display: {
    n: 1, t: 15,
    dato: "La SH1106 tiene memoria para <b>132 columnas</b> aunque solo muestra 128: por eso a veces aparece corrida 2 píxeles.",
    exp: "Igual que la SSD1306, dibuja en memoria y manda todo por I2C, pero su chip <b>SH1106</b> se programa distinto. El bloque <em>rotar</em> voltea la imagen 180° por si la montaste al revés.",
    usos: ["Pantallas de menú en proyectos", "Termómetros digitales", "Mini consolas de juego"],
    retos: [
      ["Dibuja un marco alrededor de la pantalla.", "Busca el bloque de rectángulo."],
      ["Muestra la temperatura del DHT11.", "Combina con el tutorial del DHT11."],
      ["Dibuja una <b>barra de carga</b> que crezca de 0 a 128 píxeles.", "Dibuja un rectángulo relleno cuyo ancho aumente en un ciclo."]
    ],
    quiz: [
      ["¿Cómo se comunica con el ESP32?", ["I2C", "Bluetooth", "Por el USB"], 0, "Usa SDA y SCL."],
      ["¿Para qué sirve el bloque <em>rotar</em>?", ["Voltear la imagen", "Cambiar el color", "Apagarla"], 0, "Útil si la pantalla quedó de cabeza."],
      ["Si tu OLED sale corrida o con puntos raros a un lado, ¿qué pruebas?", ["El tutorial de SH1106 en lugar del SSD1306", "Cambiar el cable USB", "Subir el volumen"], 0, "Son chips distintos aunque se vean iguales."]
    ]
  },

  lcd_i2c_display: {
    n: 1, t: 15,
    dato: "Las LCD 16x2 llevan más de <b>30 años</b> en calculadoras, fotocopiadoras y máquinas de café.",
    exp: "La pantalla tiene 2 renglones de 16 caracteres. El módulo I2C de atrás convierte los 2 cables (SDA, SCL) en los muchos pines que la LCD necesita. El potenciómetro azul ajusta el <b>contraste</b>.",
    usos: ["Máquinas expendedoras", "Equipos de laboratorio", "Paneles de alarma"],
    retos: [
      ["Escribe algo en el segundo renglón.", "Cambia la fila a 1."],
      ["Muestra la distancia del sensor ultrasónico.", "Limpia y escribe dentro de un ciclo."],
      ["Haz un texto que se desplace como <b>marquesina</b>.", "Cambia la columna de inicio en un ciclo, limpiando antes de escribir."]
    ],
    quiz: [
      ["¿Cuántos caracteres caben en total?", ["16", "32", "64"], 1, "2 renglones × 16."],
      ["Si no se ve nada, ¿qué ajustas primero?", ["El potenciómetro de contraste", "El WiFi", "El volumen"], 0, "Está atrás, en el módulo I2C."],
      ["¿Para qué sirve el módulo I2C de atrás?", ["Reduce los cables a solo 4", "Le da colores", "La hace táctil"], 0, "Convierte 2 cables de datos en los muchos pines de la LCD."]
    ]
  },

  lcd_paralelo: {
    n: 2, t: 20,
    dato: "El chip de estas pantallas, el <b>HD44780</b>, se diseñó en los años 80 y sigue siendo el estándar.",
    exp: "Sin módulo I2C, el ESP32 manda cada letra por <b>4 cables de datos</b> (D4-D7) en dos mitades. RS indica si es un comando o una letra, y E da la señal de \"lee ahora\". V0 ajusta el contraste.",
    usos: ["Relojes y termómetros", "Equipos industriales", "Proyectos sin módulo I2C"],
    retos: [
      ["Escribe tu nombre centrado.", "Cuenta las letras y empieza en la columna (16 − letras) ÷ 2."],
      ["Haz un contador que suba cada segundo.", "Ciclo con escribir y esperar."],
      ["Muestra la <b>temperatura del DHT11</b> en el renglón de abajo, actualizándose cada 2 s.", "Escribe en la fila 1 y limpia solo ese renglón escribiendo espacios."]
    ],
    quiz: [
      ["¿Para qué sirve el potenciómetro?", ["Ajustar el contraste", "Subir volumen", "Mover el texto"], 0, "Va al pin V0."],
      ["¿Cuántos pines de datos usamos?", ["4", "8", "2"], 0, "Modo de 4 bits: D4-D7."],
      ["¿Qué indica el pin RS?", ["Si lo que llega es un comando o una letra", "El brillo", "La velocidad"], 0, "RS significa Register Select."]
    ]
  },

  tft_display: {
    n: 2, t: 20,
    dato: "Una pantalla de 240 × 240 tiene <b>57,600 píxeles</b>, cada uno con miles de colores posibles.",
    exp: "La TFT recibe los colores por <b>SPI</b>, un protocolo rápido. Cada color se arma con rojo, verde y azul. DC le dice a la pantalla si lo que llega es un comando o un dato de color.",
    usos: ["Relojes inteligentes", "Pantallas de termostatos", "Mini videojuegos"],
    retos: [
      ["Pinta el fondo de tu color favorito y escribe tu nombre.", "Cambia el color de fondo y el texto."],
      ["Haz un semáforo: fondo rojo, amarillo y verde cada 2 s.", "Ciclo con tres colores de fondo."],
      ["Dibuja una <b>bandera de 3 franjas</b> de colores.", "Usa rectángulos rellenos de 80 píxeles de ancho cada uno."]
    ],
    quiz: [
      ["¿Qué protocolo usa la TFT?", ["SPI", "I2C", "Bluetooth"], 0, "Es más rápido, útil para tantos píxeles."],
      ["¿Qué colores forman todos los demás?", ["Rojo, verde y azul", "Cian y magenta", "Blanco y negro"], 0, "RGB."],
      ["¿Qué indica el pin DC?", ["Si llega un comando o un dato de color", "La corriente", "El brillo"], 0, "DC significa Data/Command."]
    ]
  },

  tm1637_display: {
    n: 1, t: 10,
    dato: "Cada dígito tiene 7 segmentos más el punto; con ellos se forman los números del 0 al 9 y hasta algunas letras como A, b, C, d, E y F.",
    exp: "El chip TM1637 controla los 4 dígitos por ti. El ESP32 solo le manda el número por 2 cables (CLK y DIO) y el chip se encarga de encender los segmentos correctos.",
    usos: ["Relojes de pared", "Marcadores deportivos", "Temporizadores de cocina"],
    retos: [
      ["Haz una cuenta regresiva de 10 a 0.", "Ciclo <em>contar de 10 a 0</em> con esperar 1 s."],
      ["Muestra la temperatura del DHT11.", "Combina con el tutorial del DHT11."],
      ["Haz un <b>cronómetro</b> MM:SS que avance solo.", "Muestra minutos × 100 + segundos para usar los 4 dígitos."]
    ],
    quiz: [
      ["¿Cuántos dígitos tiene el TM1637?", ["2", "4", "8"], 1, "Como un reloj: 12:34."],
      ["¿Cuántos cables de datos usa?", ["2", "7", "28"], 0, "CLK y DIO."],
      ["Para mostrar 12:34, ¿qué número envías?", ["1234", "12.34", "46"], 0, "Los dos puntos del centro se encienden aparte."]
    ]
  },

  display_7seg: {
    n: 2, t: 15,
    dato: "Los 7 segmentos se nombran de la <b>a</b> a la <b>g</b>, empezando arriba y girando como las manecillas del reloj; la <b>g</b> es la del centro.",
    exp: "Cada segmento es un LED conectado a su propio pin. Para mostrar un número, el ESP32 enciende la combinación correcta: el 1 usa b y c; el 8 los usa todos. La resistencia de 220 Ω limita la corriente.",
    usos: ["Relojes y despertadores", "Elevadores", "Básculas y marcadores"],
    retos: [
      ["Haz una cuenta del 0 al 9.", "Ciclo <em>contar de 0 a 9</em> con el bloque número (variable)."],
      ["Muestra un dado: un número al azar del 1 al 6.", "Usa el bloque de número aleatorio."],
      ["Haz un <b>contador con botón</b>: cada pulsación sube el número y del 9 regresa al 0.", "Combina con el tutorial del Botón y usa el bloque <em>número</em> con variable."]
    ],
    quiz: [
      ["¿Qué segmentos usa el número 1?", ["b y c", "a y d", "Todos"], 0, "Las dos rayas verticales de la derecha."],
      ["¿Por qué el 8 se ve más tenue con una sola resistencia?", ["La corriente se reparte entre 7 segmentos", "Porque el 8 es más grande", "Por error del ESP32"], 0, "La resistencia del común limita la corriente total."],
      ["¿Qué segmento NO se enciende para el 0?", ["g (el del centro)", "a (el de arriba)", "d (el de abajo)"], 0, "El 0 usa todos menos el del centro."]
    ]
  },

  matrix8_display: {
    n: 1, t: 15,
    dato: "La matriz tiene 64 LEDs pero el MAX7219 los controla con solo 3 cables, prendiendo las filas tan rápido que parecen fijas (<b>multiplexado</b>).",
    exp: "El chip MAX7219 recuerda qué LEDs van encendidos y los refresca cientos de veces por segundo. El ESP32 solo le manda el dibujo por SPI (DIN, CS, CLK).",
    usos: ["Letreros de mensajes", "Marcadores", "Caritas y animaciones en robots"],
    retos: [
      ["Haz que tu nombre se desplace.", "Usa el bloque <em>scroll texto</em>."],
      ["Muestra una cuenta regresiva.", "Ciclo con el número y esperar 1 s."],
      ["Dibuja una <b>carita</b> y haz que parpadee.", "Usa el bloque de píxel y alterna entre dibujarla y limpiar."]
    ],
    quiz: [
      ["¿Cuántos LEDs tiene la matriz?", ["8", "16", "64"], 2, "8 × 8."],
      ["¿Qué es el multiplexado?", ["Encender filas muy rápido por turnos", "Usar dos matrices", "Cambiar colores"], 0, "Tu ojo lo ve todo encendido."],
      ["¿Por qué el MAX7219 solo necesita 3 cables de datos?", ["Recibe los datos en serie, uno tras otro (SPI)", "Porque la matriz tiene 3 LEDs", "Porque usa WiFi"], 0, "Los bits llegan uno tras otro por el mismo cable."]
    ]
  },

  neopixel_matriz: {
    n: 2, t: 15,
    dato: "Una matriz NeoPixel es una tira acomodada en zigzag o en filas: aunque se vea como cuadrícula, es una sola cadena de LEDs.",
    exp: "El bloque <em>pixel x y</em> convierte la posición (columna, fila) al número de LED de la cadena. El <b>brillo</b> multiplica todos los colores para que no gaste tanta corriente.",
    usos: ["Pantallas de pixel art", "Indicadores de clima", "Lámparas de ambiente"],
    retos: [
      ["Dibuja una diagonal de esquina a esquina.", "x y y iguales: (0,0), (1,1), (2,2)…"],
      ["Dibuja una carita feliz.", "Ojos en la fila 1 y la boca en la 3."],
      ["Haz una animación de <b>lluvia</b>: puntos azules que bajen por las columnas.", "Usa un ciclo para y; apaga el punto anterior antes de dibujar el nuevo."]
    ],
    quiz: [
      ["¿Cuántos LEDs tiene la matriz 5x5?", ["10", "25", "55"], 1, "5 × 5."],
      ["¿Por qué conviene un brillo bajo?", ["Para no gastar demasiada corriente", "Para que dure más el programa", "Para cambiar el color"], 0, "Y para no encandilarte."],
      ["En una cuadrícula de 5x5, ¿cuál es el píxel del centro?", ["(2, 2)", "(3, 3)", "(5, 5)"], 0, "Se cuenta desde 0: 0, 1, 2, 3, 4."]
    ]
  },

  neopixel_matriz_8x8: {
    n: 2, t: 15,
    dato: "64 LEDs en blanco a todo brillo pueden pedir hasta <b>3.8 A</b>: más de lo que da un puerto USB.",
    exp: "Igual que la 5x5: el bloque convierte (x, y) al número de LED en la cadena. Con 64 LEDs el brillo bajo es importante para no sobrecargar la alimentación.",
    usos: ["Letreros de pixel art", "Visualizadores de música", "Juegos como la viborita"],
    retos: [
      ["Dibuja un marco en los bordes.", "Usa ciclos para x = 0 y x = 7, y para y = 0 y y = 7."],
      ["Haz un punto que recorra toda la matriz.", "Dos ciclos anidados: uno para y, otro para x."],
      ["Haz un <b>arcoíris diagonal</b> que se mueva.", "Calcula el color con (x + y + paso) y aumenta <em>paso</em> en cada vuelta."]
    ],
    quiz: [
      ["¿Cuántos LEDs tiene la matriz 8x8?", ["16", "64", "88"], 1, "8 × 8."],
      ["¿Qué pasa si pones todo en blanco a brillo máximo?", ["Puede pedir demasiada corriente", "Nada", "Cambia a rojo"], 0, "Usa brillo bajo o fuente externa."],
      ["En una fila de la 8x8, ¿cuál es el último índice?", ["7", "8", "63"], 0, "Son 8 píxeles contados desde 0."]
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
      ["Haz un timbre que suene cuando el ultrasónico detecte a alguien.", "Reproduce si la distancia es menor a 50 cm."],
      ["Haz una <b>rocola</b>: un botón cambia a la siguiente pista y otro sube el volumen.", "Guarda el número de pista y el volumen en variables."]
    ],
    quiz: [
      ["¿Cómo se llaman los archivos en la microSD?", ["0001.mp3, 0002.mp3…", "cancion.mp3", "Da igual"], 0, "Dentro de la carpeta /mp3."],
      ["¿Por dónde recibe órdenes el DFPlayer?", ["UART (TX/RX)", "WiFi", "I2C"], 0, "TX y RX van cruzados."],
      ["¿Qué rango de volumen tiene el DFPlayer?", ["0 a 30", "0 a 100", "1 a 5"], 0, "30 es el volumen máximo."]
    ]
  },

  sdcard_modulo: {
    n: 2, t: 15,
    dato: "Una microSD de 32 GB podría guardar una lectura de temperatura cada segundo durante <b>más de 100 años</b>.",
    exp: "La microSD se comunica por <b>SPI</b>. MicroPython la monta como una carpeta: puedes crear, escribir y leer archivos de texto igual que en una computadora. Debe estar en formato <b>FAT32</b>.",
    usos: ["Registradores de datos (dataloggers)", "Cámaras y grabadoras", "Guardar configuraciones"],
    retos: [
      ["Guarda tu nombre en un archivo y léelo.", "Cambia el texto del bloque <em>escribir</em>."],
      ["Guarda una lectura del DHT11 cada 10 segundos.", "Escribe la temperatura en un ciclo."],
      ["Haz un <b>registro</b>: guarda \"hora, temperatura\" cada minuto en un archivo CSV.", "Agrega una línea al archivo (no lo reescribas) en cada lectura."]
    ],
    quiz: [
      ["¿En qué formato debe estar la microSD?", ["FAT32", "NTFS", "MP3"], 0, "Es el que entiende MicroPython."],
      ["¿Qué protocolo usa?", ["SPI", "Bluetooth", "OneWire"], 0, "SCK, MOSI, MISO y CS."],
      ["¿Qué ventaja tiene guardar en formato CSV?", ["Se abre directo en una hoja de cálculo", "Ocupa 0 bytes", "Se cifra solo"], 0, "Cada línea es un registro y las comas separan columnas."]
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
      ["Enciende el LED del pin 2 cuando se conecte.", "Pon el bloque de encender después de conectar."],
      ["Si no se conecta en <b>10 segundos</b>, imprime \"Sin WiFi\" y prende el LED como alarma.", "Revisa si está conectado dentro de un ciclo que cuente los segundos."]
    ],
    quiz: [
      ["¿Qué banda de WiFi usa el ESP32?", ["2.4 GHz", "5 GHz", "Las dos"], 0, "No se conecta a redes solo de 5 GHz."],
      ["¿Quién le da la dirección IP al ESP32?", ["El router", "El ESP32 la inventa", "Google"], 0, "El router reparte las IP de su red."],
      ["¿Qué tienen en común las IP 192.168.1.20 y 192.168.1.35?", ["Están en la misma red local", "Son del mismo país", "Son la misma"], 0, "Los primeros números indican la red y el último, el aparato."]
    ]
  },

  wifi_ntfy_led: {
    n: 3, t: 45, con: "ntfy",
    dato: "ntfy.sh es un servicio <b>gratis y de código abierto</b>: lo usan programadores de todo el mundo para mandarse avisos al celular.",
    exp: "Tu celular <b>publica</b> un mensaje en un canal de ntfy.sh. El ESP32 le pregunta a ntfy.sh cada 2 segundos (HTTP GET) qué mensajes hay en ese canal. Cada mensaje llega en <b>JSON</b>; el programa saca el texto, revisa que no lo haya visto ya (lista <em>visto</em>) y prende o apaga el LED.",
    usos: ["Abrir el portón desde el celular", "Prender el aire acondicionado antes de llegar", "Recibir alertas de un sensor en el celular"],
    retos: [
      ["Agrega el mensaje <b>parpadea</b> que haga parpadear el LED 5 veces.", "Otro <em>si msg = \"parpadea\"</em> con un ciclo <em>repetir 5</em>."],
      ["Controla también el buzzer con los mensajes <b>sonar</b> y <b>silencio</b>.", "Igual que el LED, con bloques del buzzer."],
      ["Agrega el mensaje <b>estado</b>: el ESP32 imprime si el LED está prendido o apagado.", "Guarda el estado en una variable cada vez que prendas o apagues."]
    ],
    quiz: [
      ["¿Qué hace el ESP32 cada 2 segundos?", ["Pregunta a ntfy.sh si hay mensajes", "Se reinicia", "Manda una foto"], 0, "Eso se llama <b>polling</b>."],
      ["¿Por qué tu canal debe tener un nombre único?", ["Cualquiera que sepa el nombre puede mandar mensajes", "Porque es más rápido", "No importa"], 0, "Los canales de ntfy.sh son públicos."],
      ["¿Para qué sirve la lista <em>visto</em>?", ["Para no repetir mensajes ya atendidos", "Para guardar contraseñas", "Para contar segundos"], 0, "ntfy.sh devuelve los mensajes recientes cada vez que preguntas."]
    ]
  },

  servidor_socket: {
    n: 3, t: 30, con: "socket",
    dato: "Cada vez que abres una página web, tu navegador abre un <b>socket TCP</b> con el servidor, igual que en este tutorial.",
    exp: "El ESP32 crea su propia red (<b>Access Point</b>) y abre un socket en el puerto 80. <em>bind</em> lo amarra a ese puerto, <em>listen</em> se pone a esperar y <em>accept</em> atiende a cada cliente que llega. Luego recibe los datos y los imprime.",
    usos: ["Servidores web", "Control de robots desde la computadora", "Comunicación entre máquinas en una fábrica"],
    retos: [
      ["Cambia el nombre de la red a tu nombre.", "Modifica el SSID en <em>Configurar Access Point</em>."],
      ["Enciende el LED si el mensaje recibido es \"on\".", "Compara la respuesta (decodificada) con \"on\"."],
      ["<b>Responde al cliente</b>: envía \"Recibido: \" + su mensaje antes de cerrar.", "Usa enviar en la conexión aceptada, antes de cerrarla."]
    ],
    quiz: [
      ["¿Qué bloque se queda esperando a que llegue un cliente?", ["accept", "bind", "close"], 0, "Se detiene ahí hasta que alguien se conecta."],
      ["¿Qué IP tiene el ESP32 cuando es Access Point?", ["192.168.4.1", "8.8.8.8", "127.0.0.1"], 0, "Es la IP por defecto del AP."],
      ["¿Qué hace el bloque <em>bind</em>?", ["Amarra el socket a un puerto", "Borra la red", "Apaga el WiFi"], 0, "Así los clientes saben a qué puerto llegar."]
    ]
  },

  cliente_socket: {
    n: 3, t: 25, con: "socket",
    dato: "TCP <b>confirma cada paquete</b> que llega: si uno se pierde, se vuelve a mandar. Por eso los mensajes llegan completos y en orden.",
    exp: "El cliente se conecta a la red del servidor, crea un socket y se conecta a la IP <b>192.168.4.1</b> en el puerto 80. Con <em>sendall</em> manda el mensaje y luego cierra la conexión.",
    usos: ["Apps que hablan con un servidor", "Sensores que reportan a una central", "Chats y videojuegos en red"],
    retos: [
      ["Manda un mensaje distinto cada 5 segundos.", "Llama a <em>enviar_msg</em> dentro de un ciclo con esperar."],
      ["Manda la distancia del sensor ultrasónico.", "Convierte la distancia a texto antes de enviarla."],
      ["Manda la <b>temperatura del DHT11</b> al servidor cada 10 segundos.", "Arma el texto con <em>crear texto con</em> antes de enviarlo."]
    ],
    quiz: [
      ["¿Qué necesita el cliente para encontrar al servidor?", ["Su IP y su puerto", "Su color", "Su MAC"], 0, "Como dirección y número de departamento."],
      ["¿Qué pasa si el servidor no está encendido?", ["La conexión falla", "El mensaje se guarda", "Se manda por Bluetooth"], 0, "Enciende primero el servidor."],
      ["¿Por qué se cierra el socket después de enviar?", ["Para liberar la conexión", "Para borrar el mensaje", "Nunca es necesario"], 0, "Cada conexión abierta ocupa memoria en los dos ESP32."]
    ]
  },

  portal_cautivo: {
    n: 3, t: 30, con: "portal",
    dato: "Los portales cautivos son las páginas que aparecen en el <b>WiFi de aeropuertos, cafés y hoteles</b> pidiéndote aceptar condiciones.",
    exp: "El ESP32 crea una red y además funciona como <b>servidor DNS</b> y <b>servidor web</b>. Cuando tu celular pregunta por cualquier página, el DNS del ESP32 responde \"soy yo\" y el servidor web le muestra su propia página.",
    usos: ["WiFi de hoteles y aeropuertos", "Configurar aparatos sin app", "Juegos y encuestas sin internet"],
    retos: [
      ["Cambia el nombre de la red.", "Modifica el SSID del Access Point."],
      ["Imprime cuántas veces se conectó alguien.", "Suma 1 a un contador en la función que atiende."],
      ["Prende el <b>LED del pin 2</b> cada vez que alguien visite el portal.", "Pon el bloque de encender dentro de la función que atiende al visitante."]
    ],
    quiz: [
      ["¿Qué hace el DNS del ESP32?", ["Responde que todas las páginas son él", "Bloquea internet", "Cambia la contraseña"], 0, "Así redirige al portal."],
      ["¿El portal necesita internet?", ["No, todo vive en el ESP32", "Sí, siempre", "Solo de noche"], 0, "Funciona sin router ni internet."],
      ["¿Por qué hay que apagar los datos móviles para ver el portal?", ["El celular usaría internet por datos y no la red del ESP32", "Para ahorrar pila", "No es necesario"], 0, "Con datos encendidos, el celular ignora la red sin internet."]
    ]
  },

  espnow_receptor: {
    n: 2, t: 25, con: "espnow",
    dato: "ESP-NOW puede llegar a unos <b>200 metros</b> al aire libre y manda mensajes de hasta <b>250 bytes</b>.",
    exp: "El receptor activa su WiFi (sin conectarse a ningún router), inicia ESP-NOW, agrega al emisor como <b>peer</b> usando su dirección MAC y se queda en un ciclo preguntando si llegó un mensaje.",
    usos: ["Controles remotos para carritos", "Sensores en distintos salones", "Timbres inalámbricos"],
    retos: [
      ["Enciende el LED cuando llegue el mensaje \"on\".", "<em>si msg = \"on\"</em> (decodifica el mensaje)."],
      ["Cuenta cuántos mensajes han llegado.", "Suma 1 a una variable cada vez que llegue uno."],
      ["Muestra los mensajes recibidos en una <b>pantalla OLED</b>.", "Escribe el mensaje decodificado en la OLED dentro del <em>si</em>."]
    ],
    quiz: [
      ["¿Necesita router ESP-NOW?", ["No", "Sí", "Solo para recibir"], 0, "Los ESP32 se hablan directo."],
      ["¿Qué identifica a cada ESP32 en ESP-NOW?", ["Su dirección MAC", "Su nombre", "Su color"], 0, "Es como su número de teléfono."],
      ["¿Por qué el receptor imprime su MAC al iniciar?", ["Para copiarla en el programa del emisor", "Para conectarse a internet", "Para cambiar la contraseña"], 0, "El emisor necesita esa MAC para saber a quién mandar."]
    ]
  },

  espnow_emisor: {
    n: 2, t: 20, con: "espnow",
    dato: "Cada placa tiene una dirección MAC única en el mundo, grabada de fábrica: <b>6 números en hexadecimal</b>, como 24:6F:28:AB:CD:EF.",
    exp: "El emisor inicia ESP-NOW, registra la <b>MAC del receptor</b> como peer y le manda el mensaje directamente por radio. No hay router de por medio: es como un walkie-talkie digital.",
    usos: ["Botón inalámbrico", "Control de luces sin internet", "Juegos entre dos placas"],
    retos: [
      ["Manda un mensaje cada segundo.", "Envuelve el <em>Enviar</em> en un ciclo con esperar 1 s."],
      ["Manda \"on\" al presionar un botón y \"off\" al soltarlo.", "Combina con el tutorial del Botón."],
      ["Manda la <b>distancia del sensor ultrasónico</b> cada segundo.", "Convierte el número a texto antes de enviarlo."]
    ],
    quiz: [
      ["¿Qué MAC escribes en el emisor?", ["La del receptor", "La del emisor", "La del router"], 0, "Es a quién le mandas el mensaje."],
      ["¿Qué tamaño máximo tiene un mensaje?", ["250 bytes", "1 GB", "10 letras"], 0, "Suficiente para textos cortos y lecturas."],
      ["¿Qué pasa si escribes mal un número de la MAC?", ["El mensaje no llega", "Llega a todos", "Se corrige solo"], 0, "Cada MAC es única: con un número distinto es otra placa."]
    ]
  },

  espnow_chat: {
    n: 3, t: 35, con: "espnow",
    dato: "Con ESP-NOW se pueden conectar hasta <b>20 placas</b> en una misma red de mensajes.",
    exp: "Cada ESP32 es emisor y receptor a la vez. En lugar de preguntar todo el tiempo si llegó algo, se usa <em>al recibir llamar</em> (una <b>interrupción</b>): el ESP32 ejecuta tu función solo cuando llega un mensaje, y el resto del tiempo queda libre para enviar.",
    usos: ["Walkie-talkies de texto", "Robots que cooperan", "Sistemas de alarma con varias placas"],
    retos: [
      ["Responde automáticamente \"recibido\" a cada mensaje.", "Dentro de la función de recibir, envía \"recibido\" al otro."],
      ["Prende el LED del otro ESP32 escribiendo \"luz\".", "En la función de recibir, compara el texto con \"luz\"."],
      ["Agrega <b>tu nombre</b> a cada mensaje para saber quién escribió.", "Usa <em>crear texto con</em> para unir tu nombre y el mensaje."]
    ],
    quiz: [
      ["¿Qué ventaja tiene <em>al recibir llamar</em>?", ["No hay que preguntar todo el tiempo", "Hace los mensajes más largos", "Apaga el WiFi"], 0, "Es una interrupción: se activa sola."],
      ["¿Por qué el programa \"termina\" pero sigue escuchando?", ["La escucha queda activa en segundo plano", "Es un error", "Porque se reinicia"], 0, "La función quedó registrada."],
      ["¿Qué es una interrupción?", ["Algo que se ejecuta solo cuando ocurre un evento", "Un error del programa", "Apagar el ESP32"], 0, "Aquí, el evento es que llegue un mensaje."]
    ]
  },

  hc06_basico: {
    n: 2, t: 20, con: "hc06",
    dato: "El nombre <b>Bluetooth</b> viene de un rey vikingo, Harald \"Diente Azul\", que unió a pueblos de Dinamarca y Noruega; el logo son sus iniciales en runas.",
    exp: "El HC-06 es un <b>traductor</b>: recibe por Bluetooth lo que manda el celular y lo pasa al ESP32 por cables seriales (UART). El ESP32 revisa si hay datos con <em>tiene datos</em> y los lee.",
    usos: ["Robots controlados con el celular", "Apps para prender luces", "Recibir datos de sensores en el celular"],
    retos: [
      ["Enciende el LED al recibir \"1\" y apágalo con \"0\".", "Compara lo leído con \"1\" y \"0\"."],
      ["Manda al celular la distancia del sensor ultrasónico.", "Usa <em>Enviar texto HC-06</em> dentro de un ciclo."],
      ["Controla un <b>carrito</b> desde el celular: w adelante, s atrás, a y d para girar.", "Combina con el tutorial del Puente H."]
    ],
    quiz: [
      ["¿Cómo van conectados TX y RX?", ["Cruzados", "Iguales", "Los dos a GND"], 0, "Lo que uno habla (TX), el otro lo escucha (RX)."],
      ["¿Funciona el HC-06 con iPhone?", ["No, usa Bluetooth clásico", "Sí, siempre", "Solo con WiFi"], 0, "Los iPhone no aceptan este tipo de módulo; usa BLE."],
      ["¿A qué velocidad viene el HC-06?", ["9600 baudios", "115200 baudios", "1 baudio"], 0, "Es la velocidad de fábrica del módulo."]
    ]
  },

  bluetooth_le: {
    n: 3, t: 25, con: "ble",
    dato: "BLE gasta tan poca energía que un sensor con una <b>pila de botón</b> puede funcionar más de un año.",
    exp: "El ESP32 se <b>anuncia</b> con su nombre (advertising) para que el celular lo encuentre. Al conectarse, usan el servicio <b>UART BLE</b>: el celular escribe en un \"casillero\" y el ESP32 ejecuta tu función <em>al recibir</em>, que decodifica los bytes a texto.",
    usos: ["Pulseras y relojes inteligentes", "Básculas y termómetros que mandan datos al celular", "Llaveros localizadores"],
    retos: [
      ["Cambia el nombre BLE por tu nombre.", "Bloque <em>Establecer nombre BLE</em>."],
      ["Enciende el LED cuando llegue \"on\".", "Compara <em>rx_buffer</em> con \"on\"."],
      ["<b>Responde desde el ESP32</b>: cuando llegue \"hola\", envía \"hola celular\".", "Usa el bloque de enviar BLE dentro de la función al recibir."]
    ],
    quiz: [
      ["¿Qué significa la L de BLE?", ["Low (bajo consumo)", "Large (grande)", "Light (luz)"], 0, "Bluetooth Low Energy."],
      ["¿Cómo encuentra el celular al ESP32?", ["Por el nombre que anuncia", "Por su IP", "Por el cable USB"], 0, "Eso se llama advertising."],
      ["¿Por qué hay que decodificar los datos que llegan?", ["Llegan como bytes y hay que convertirlos a texto", "Porque vienen cifrados", "No hace falta"], 0, "Sin decodificar verías algo como b'hola'."]
    ]
  },

  /* ── Desafío de Robótica (juegos con el carrito) ────────────── */
  juego_bandera_carrito: {
    n: 2, t: 40,
    dato: "El control de 5 botones usa <b>un solo pin</b>: cada botón tiene una resistencia distinta, y por eso el ESP32 lee un número diferente para cada uno. ¡Ahorras 4 pines!",
    exp: "El ciclo lee el control unas <b>20 veces por segundo</b>. Si el número cae en el rango de un botón, llama a la función de ese movimiento; si no se aprieta nada, llama a <em>alto</em>. Por eso el carrito se mueve <b>solo mientras mantienes</b> el botón. Cada función prende las dos ruedas en el sentido correcto: para girar, una va hacia adelante y la otra hacia atrás.",
    usos: ["Carritos y drones de control remoto", "Grúas y montacargas que se manejan con botones", "Robots de rescate manejados a distancia"],
    retos: [
      ["Haz que el botón del centro haga <b>sonar el buzzer</b>, para avisar cuando sacas un vaso.", "Agrega un <em>si</em> para la tecla entre 700 y 800 y usa el bloque del buzzer. Cambia el de <em>alto</em> a tecla &gt; 900."],
      ["Agrega un <b>servo</b> que salude (de 0° a 90° y de regreso) con el botón del centro.", "Prepara el servo al inicio y, dentro del <em>si</em>, muévelo a 90°, espera 0.3 s y regrésalo a 0°."],
      ["Haz que el carrito vaya <b>más despacio</b> para acercarse con cuidado a los vasos.", "Cambia los bloques de encender/apagar por los de velocidad (PWM) del Motor DC."]
    ],
    quiz: [
      ["¿Por qué el carrito se detiene al soltar el botón?", ["Porque se acaba la pila", "Porque si no se aprieta nada, el programa llama a «alto»", "Porque el ADKey se apaga"], 1, "Sin botón, la lectura pasa de 600 y se llama a la función alto."],
      ["Para girar en su lugar, ¿cómo se mueven las ruedas?", ["Las dos hacia adelante", "Las dos apagadas", "Una hacia adelante y la otra hacia atrás"], 2, "Al girar en sentidos opuestos, el carrito da vuelta sin avanzar."],
      ["Si una rueda gira al revés, ¿qué haces?", ["Intercambias sus dos cables en el L298N (o on y off en esa rueda)", "Cambias el pin del ADKey", "Compras otro motor"], 0, "Al invertir los cables, el motor gira al otro lado."]
    ]
  },

  juego_ruta_robot: {
    n: 3, t: 50,
    dato: "Los robots de los almacenes también avanzan por <b>casillas</b> en el piso, como en este juego: así saben exactamente dónde están sin necesidad de GPS.",
    exp: "Cada botón llama a una función que <b>avanza o gira y luego se detiene sola</b>: por ejemplo, <em>avanzar_bloque</em> prende las ruedas, espera <em>tiempo_bloque</em> segundos y llama a <em>alto</em>. Al guardar los tiempos en <b>variables</b>, calibras el robot cambiando un solo número. La espera de 0.3 s al final del ciclo hace que un apretón cuente una sola vez.",
    usos: ["Robots de almacenes que se mueven por casillas", "Robots aspiradora que recorren la casa por zonas", "Juegos de mesa con robots, como este"],
    retos: [
      ["Calibra tu robot para que llegue <b>justo al centro</b> de la siguiente ficha.", "Usa la calculadora de Herramientas › La Ruta del Conocimiento y cambia <em>tiempo_bloque</em>."],
      ["Haz que el botón del centro dé una <b>media vuelta</b> (180°).", "Agrega un <em>si</em> para la tecla entre 700 y 800 y llama dos veces a <em>girar_derecha</em>."],
      ["Haz que el buzzer haga <b>bip</b> cada vez que termina un bloque, para poder contarlos.", "Dentro de <em>avanzar_bloque</em>, después de <em>alto</em>, toca una nota corta."]
    ],
    quiz: [
      ["¿Cuánto debe avanzar el robot con un apretón de ▲?", ["Hasta que lo sueltes", "1 metro", "24 cm, un bloque"], 2, "Cada bloque del tablero mide 24 × 24 cm."],
      ["¿Para qué sirve la variable tiempo_bloque?", ["Para ajustar cuánto tiempo avanza el robot en cada bloque", "Para contar los puntos", "Para el color del dado"], 0, "Cambias un solo número y todos los avances se ajustan."],
      ["¿Por qué hay una espera de 0.3 s al final del ciclo?", ["Para que el robot descanse", "Para que un apretón cuente una sola vez", "Para ahorrar pila"], 1, "Sin la espera, mantener el dedo un poquito haría avanzar varios bloques."]
    ]
  },

  /* ── 🎮 Juegos con el motor de juegos (pantalla) ───────────────── */
  juego_direcciones: {
    n: 1, t: 20,
    dato: "En la pantalla de una computadora, la <b>Y crece hacia abajo</b>: la esquina de arriba a la izquierda es (0, 0). Por eso para subir el personaje se usa un dy <b>negativo</b>.",
    exp: "El ciclo <em>repetir mientras verdadero</em> es el <b>ciclo del juego</b>: en cada vuelta borra la pantalla, revisa qué flechas están apretadas, mueve el personaje unos píxeles y lo vuelve a dibujar. Como da unas 60 vueltas por segundo, el movimiento se ve suave.",
    usos: ["Videojuegos de todo tipo", "Controlar un robot o un dron con el teclado", "Simuladores de manejo"],
    retos: [
      ["Haz que el personaje se mueva <b>el doble de rápido</b>.", "Cambia los 4 por 8 en los bloques de mover."],
      ["Agrega movimiento en <b>diagonal</b> con otras teclas.", "Usa las teclas W, A, S, D y mueve dx y dy al mismo tiempo."],
      ["Que el personaje <b>no se salga</b> de la pantalla.", "Usa <em>¿toca el borde?</em> y regrésalo un poco cuando lo toque."]
    ],
    quiz: [
      ["Para subir el personaje en la pantalla, ¿qué dy usas?", ["Un número negativo", "Un número positivo", "Cero"], 0, "La Y crece hacia abajo, así que subir es restar."],
      ["¿Para qué sirve <em>limpiar pantalla</em> al inicio del ciclo?", ["Para apagar el juego", "Para borrar el dibujo anterior y que no se vea un rastro", "Para cambiar el color"], 1, "Si no borras, el personaje deja una estela."],
      ["¿Qué pasa si quitas <em>siguiente frame</em>?", ["El juego se mueve más rápido", "No cambia nada", "El juego no avanza fotograma a fotograma y no se ve"], 2, "Ese bloque le da tiempo a la pantalla de mostrar cada dibujo."]
    ]
  },

  juego_calculadora_basica: {
    n: 3, t: 60,
    dato: "Las primeras calculadoras electrónicas de bolsillo salieron a la venta a principios de los <b>años 70</b>. Antes, una calculadora eléctrica ocupaba un escritorio entero.",
    exp: "Cada botón es un <b>rectángulo</b> dibujado en la pantalla. Cuando haces clic, el programa revisa si la posición del mouse (X, Y) cae <b>dentro</b> de un rectángulo con condiciones del tipo «X mayor que la orilla izquierda y menor que la derecha». Así sabe qué botón apretaste.",
    usos: ["Cajeros automáticos y pantallas táctiles", "Puntos de venta de las tiendas", "Cualquier app con botones"],
    retos: [
      ["Cambia los colores de los botones de operación.", "Busca los rectángulos de +, -, × y ÷ y cambia su color."],
      ["Agrega un botón de <b>porcentaje</b> (%).", "Haz un rectángulo nuevo y divide el número entre 100 al presionarlo."],
      ["Muestra el resultado con un sonido de «listo».", "Agrega <em>tocar nota</em> cuando se presione =."]
    ],
    quiz: [
      ["¿Cómo sabe el programa qué botón apretaste?", ["Lo adivina", "Revisa si la X y la Y del clic caen dentro del rectángulo del botón", "Por el color del botón"], 1, "Compara la posición del mouse con las orillas de cada botón."],
      ["¿Por qué se usa «y» en la condición de cada botón?", ["Porque es más corto", "No se necesita", "Porque el clic debe cumplir varias condiciones a la vez (izquierda, derecha, arriba, abajo)"], 2, "Las cuatro orillas deben cumplirse al mismo tiempo."],
      ["¿Qué hace el botón C?", ["Limpia todo para empezar de nuevo", "Suma", "Apaga el juego"], 0, "Regresa las variables a su valor inicial."]
    ]
  },

  juego_plano_cartesiano: {
    n: 2, t: 35,
    dato: "El plano cartesiano se llama así por <b>René Descartes</b>, que lo describió en 1637. En latín firmaba como <em>Cartesius</em>.",
    exp: "El punto se mueve con las flechas y el objetivo aparece en una <b>coordenada al azar</b>. En cada vuelta el programa calcula la <b>distancia</b> entre los dos: si es pequeña, cuenta un acierto y elige otra coordenada.",
    usos: ["GPS y mapas", "Videojuegos (todo personaje tiene coordenadas)", "Robots que se mueven a un punto"],
    retos: [
      ["Muestra en pantalla las coordenadas del objetivo.", "Usa <em>escribir</em> con <em>crear texto con</em> y las variables del objetivo."],
      ["Haz que el objetivo sea más chico cada 5 puntos.", "Usa un <em>si</em> con los puntos y cambia el radio del círculo."],
      ["Agrega un tiempo límite de 30 segundos.", "Cuenta fotogramas como en Contrarreloj: 60 fotogramas son 1 segundo."]
    ],
    quiz: [
      ["¿Qué indica la coordenada X?", ["La posición vertical", "El color", "La posición horizontal (izquierda-derecha)"], 2, "X es horizontal y Y es vertical."],
      ["¿Cómo sabe el juego que alcanzaste el objetivo?", ["Midiendo la distancia entre el punto y el objetivo", "Por el sonido", "Por el tiempo"], 0, "Si la distancia es pequeña, ya llegaste."],
      ["¿Para qué sirve el número aleatorio?", ["Para cambiar el color", "Para que el objetivo aparezca en un lugar distinto cada vez", "Para apagar el juego"], 1, "Así cada ronda es diferente."]
    ]
  },

  juego_caja_area: {
    n: 3, t: 60,
    dato: "El <b>área</b> de un rectángulo es base × altura, y se mide en unidades <b>cuadradas</b>: si mides en centímetros, el área queda en cm².",
    exp: "Una <b>función</b> elige una base y una altura al azar, calcula el área correcta y la pone en uno de los 4 cuadrados, también al azar. En los otros pone respuestas falsas. Al hacer clic, el programa revisa en qué cuadrado cayó y lo compara con el correcto.",
    usos: ["Calcular cuánta pintura o piso se necesita", "Medir terrenos y casas", "Juegos educativos de matemáticas"],
    retos: [
      ["Lleva la cuenta de aciertos y errores.", "Crea dos variables y súmales 1 en cada caso."],
      ["Haz que los números sean más grandes al subir de nivel.", "Cambia los límites del número aleatorio cada 5 aciertos."],
      ["Agrega un sonido distinto para acierto y error.", "Usa <em>tocar nota</em> con una nota aguda y otra grave."]
    ],
    quiz: [
      ["¿Cómo se calcula el área de un rectángulo?", ["base × altura", "base + altura", "2 × (base + altura)"], 0, "Multiplicas lo que mide de ancho por lo que mide de alto."],
      ["¿Para qué sirve una función en este juego?", ["Para dibujar el fondo", "Para reutilizar los mismos bloques cada vez que hay pregunta nueva", "Para apagar el juego"], 1, "Así no repites los bloques en cada ronda."],
      ["¿Por qué la respuesta correcta cambia de cuadrado?", ["Por error", "Para que sea más fácil", "Para que tengas que calcular y no memorizar el lugar"], 2, "Se elige al azar en cada ronda."]
    ]
  },

  juego_caja_perimetro: {
    n: 3, t: 60,
    dato: "El <b>perímetro</b> es lo que mide la orilla de una figura. En un rectángulo es 2 × (base + altura): las dos bases más las dos alturas.",
    exp: "Funciona igual que el juego de áreas: una <b>función</b> crea un rectángulo al azar, calcula su perímetro, lo pone en uno de los 4 cuadrados y llena los demás con respuestas falsas. El clic se compara con el cuadrado correcto.",
    usos: ["Calcular cuánta cerca o malla se necesita", "Poner marco a un cuadro", "Medir la orilla de un terreno"],
    retos: [
      ["Lleva la cuenta de aciertos y errores.", "Crea dos variables y súmales 1 en cada caso."],
      ["Mezcla preguntas de área y de perímetro.", "Usa un número aleatorio para decidir qué preguntar."],
      ["Agrega un tiempo para contestar cada pregunta.", "Cuenta fotogramas: 60 son un segundo."]
    ],
    quiz: [
      ["¿Cómo se calcula el perímetro de un rectángulo?", ["base × altura", "2 × (base + altura)", "base + altura"], 1, "Sumas los cuatro lados."],
      ["Si la base es 5 y la altura es 3, ¿cuál es el perímetro?", ["15", "8", "16"], 2, "2 × (5 + 3) = 16."],
      ["¿En qué se diferencia del área?", ["El perímetro mide la orilla y el área lo de adentro", "Son lo mismo", "El área mide la orilla"], 0, "Perímetro: contorno. Área: superficie."]
    ]
  },

  juego_evitar_obstaculos: {
    n: 2, t: 40,
    dato: "Muchos videojuegos detectan choques por <b>color</b>: si el personaje toca un píxel del color de la pared, chocó. Es una técnica sencilla y muy usada en juegos clásicos.",
    exp: "El obstáculo es un rectángulo cuya posición se guarda en <b>variables</b>: en cada vuelta del ciclo baja un poco, y cuando sale de la pantalla vuelve a aparecer arriba en una X al azar. Si el jugador toca su color, el juego termina y muestra cuántos segundos sobreviviste.",
    usos: ["Videojuegos de esquivar", "Simuladores de manejo", "Robots que evitan obstáculos (como el carrito con ultrasónico)"],
    retos: [
      ["Haz que el obstáculo caiga más rápido con el tiempo.", "Suma un poquito a la velocidad cada vez que vuelve a aparecer."],
      ["Agrega un segundo obstáculo.", "Crea otras variables para su X y su Y."],
      ["Guarda el mejor tiempo.", "Usa una variable récord y compárala al terminar."]
    ],
    quiz: [
      ["¿Cómo sabe el juego que chocaste?", ["Por el sonido", "Por el teclado", "Porque el jugador toca el color del obstáculo"], 2, "Se usa <em>¿toca el color?</em>."],
      ["¿Para qué sirve el número aleatorio?", ["Para que el obstáculo caiga en un lugar distinto cada vez", "Para cambiar de color", "Para pausar"], 0, "Así no se puede memorizar."],
      ["¿Qué guarda la posición del obstáculo?", ["Una imagen", "Variables", "El monitor serial"], 1, "Sus variables cambian en cada vuelta."]
    ]
  },

  juego_puntaje_tiempo: {
    n: 2, t: 35,
    dato: "La mayoría de los juegos dibujan unas <b>60 imágenes por segundo</b>. Por eso contar 60 fotogramas equivale, más o menos, a contar un segundo.",
    exp: "El ciclo da muchas vueltas por segundo, así que no se puede bajar el tiempo en cada vuelta. Un <b>contador de fotogramas</b> suma 1 en cada vuelta y, cuando llega a 60, baja el tiempo en 1 segundo y vuelve a empezar. Cuando el tiempo llega a 0, el juego se detiene.",
    usos: ["Cronómetros y relojes", "Concursos con tiempo límite", "Semáforos y hornos de microondas"],
    retos: [
      ["Cambia la partida a 15 segundos.", "Pon 15 en el valor inicial del tiempo."],
      ["Muestra el tiempo en rojo cuando falten 5 segundos.", "Usa un <em>si</em> con el tiempo y cambia el color del texto."],
      ["Guarda la mejor puntuación.", "Usa una variable récord y compárala al terminar."]
    ],
    quiz: [
      ["¿Cuántos fotogramas son más o menos un segundo?", ["60", "1", "1000"], 0, "El juego dibuja unos 60 por segundo."],
      ["¿Por qué no se baja el tiempo en cada vuelta del ciclo?", ["Porque no se puede restar", "Porque el ciclo da muchas vueltas por segundo y el tiempo bajaría muy rápido", "Porque el tiempo es un texto"], 1, "Por eso se cuentan fotogramas."],
      ["¿Qué pasa cuando el tiempo llega a 0?", ["Empieza otra vez solo", "Se borran los puntos", "El juego se detiene y muestra los puntos"], 2, "Se deja de sumar y se muestra el resultado."]
    ]
  },

  juego_laberinto: {
    n: 2, t: 30,
    dato: "Hay un truco para salir de muchos laberintos: pon una mano en la pared y nunca la sueltes. Funciona si todas las paredes están conectadas.",
    exp: "Las paredes son rectángulos de un color. En cada vuelta, si el personaje <b>toca ese color</b>, el programa lo regresa a la salida. La meta es un rectángulo verde: al tocarla, ganas.",
    usos: ["Videojuegos de laberintos", "Robots que buscan la salida (micromouse)", "Planear rutas en un mapa"],
    retos: [
      ["Agrega una cuarta pared.", "Dibuja otro rectángulo gris."],
      ["Cuenta cuántas veces chocaste.", "Suma 1 a una variable cada vez que toques una pared."],
      ["Agrega un tiempo para escapar.", "Cuenta fotogramas: 60 son un segundo."]
    ],
    quiz: [
      ["¿Qué pasa si tocas una pared?", ["Ganas", "Regresas al inicio", "No pasa nada"], 1, "El programa te regresa a la salida."],
      ["¿Cómo sabe el juego que tocaste una pared?", ["Por el sonido", "Por el mouse", "Por el color de la pared"], 2, "Se usa <em>¿toca el color?</em>."],
      ["¿Qué bloque regresa el personaje al inicio?", ["poner personaje en X Y", "limpiar pantalla", "siguiente frame"], 0, "Lo pone en una posición fija."]
    ]
  },

  juego_punteria: {
    n: 2, t: 30,
    dato: "Para medir la distancia entre dos puntos se usa el <b>teorema de Pitágoras</b>: la raíz cuadrada de (diferencia en X)² + (diferencia en Y)².",
    exp: "Cuando haces clic, el programa calcula la <b>distancia</b> entre el clic y el centro del blanco. Si es menor que 25 píxeles, cuenta como acierto y el blanco se mueve a otro lugar al azar; si no, cuenta un fallo.",
    usos: ["Juegos de puntería", "Pantallas táctiles (saber qué tocaste)", "Drones y robots que apuntan a un objetivo"],
    retos: [
      ["Haz que el juego sea más difícil: margen de 15 píxeles.", "Cambia el 25 por 15."],
      ["Haz que el blanco cambie de lugar solo cada 2 segundos.", "Cuenta fotogramas: 120 son unos 2 segundos."],
      ["Muestra el porcentaje de puntería.", "Divide aciertos entre (aciertos + fallos) y multiplica por 100."]
    ],
    quiz: [
      ["¿Cuándo cuenta un acierto?", ["Con cualquier clic", "Cuando aprietas espacio", "Cuando el clic cae a menos de 25 píxeles del centro"], 2, "Se mide la distancia al centro."],
      ["¿Para qué sirve la distancia entre dos puntos?", ["Para saber qué tan cerca cayó el clic del blanco", "Para cambiar el color", "Para el sonido"], 0, "Una distancia pequeña es un buen tiro."],
      ["Si cambias el 25 por 10, el juego…", ["se vuelve más fácil", "se vuelve más difícil", "no cambia"], 1, "Hay que atinar más cerca del centro."]
    ]
  },

  juego_bandera_pantalla: {
    n: 2, t: 40,
    dato: "Con <b>crear texto con</b> puedes armar el nombre de un personaje: «vaso» + 2 = «vaso2». Así un solo bloque sirve para preguntar por cualquier vaso.",
    exp: "Cada vaso es un <b>personaje con nombre</b> (vaso1, vaso2, vaso3). La variable <b>meta</b> guarda un número al azar, y el juego pregunta si el robot toca a «vaso» + meta. Si sí, suma un punto, suena una nota, el robot regresa al inicio y se elige otra meta.",
    usos: ["Practicar antes de manejar el robot de verdad", "Simuladores de robots", "Juegos de recoger objetos"],
    retos: [
      ["Si el robot toca un vaso <b>equivocado</b>, que regrese al inicio sin sumar.", "Agrega un <em>si</em> por cada vaso que no sea el de la meta."],
      ["Agrega un cuarto vaso con otra bandera.", "Crea vaso4 y cambia el aleatorio a entre 1 y 4."],
      ["Ponle un tiempo de 60 segundos al juego.", "Cuenta fotogramas: 60 son un segundo."]
    ],
    quiz: [
      ["¿Qué guarda la variable meta?", ["El número del vaso al que hay que ir", "Los puntos", "La velocidad"], 0, "Se elige al azar entre 1 y 3."],
      ["Si meta vale 3, ¿por cuál personaje pregunta el bloque de tocar?", ["vaso", "vaso3", "robot3"], 1, "«vaso» + 3 = «vaso3»."],
      ["¿Para qué sirve <em>poner personaje</em> al tocar el vaso?", ["Para dibujar el vaso", "Para borrar la pantalla", "Para regresar el robot al inicio"], 2, "Así empieza cada ronda desde el mismo lugar."]
    ]
  },

  juego_ruta_pantalla: {
    n: 2, t: 40,
    dato: "En los juegos de mesa con dado, cada número tiene la misma probabilidad de salir: <b>1 de 6</b>. Un número aleatorio entre 1 y 6 imita un dado justo.",
    exp: "La barra espaciadora guarda un número al azar en <b>dado</b> y lo copia a <b>pasos</b>. Cada apretón de → mueve el robot 70 píxeles (una casilla) y resta 1 a pasos. Cuando pasos llega a 0 ya no avanza hasta tirar otra vez. Las esperas cortas hacen que un apretón cuente una sola vez.",
    usos: ["Juegos de mesa digitales", "Practicar La Ruta del Conocimiento antes de usar el robot", "Contar pasos en un recorrido"],
    retos: [
      ["Agrega un <b>dado de colores</b>: 1 fácil, 2 medio, 3 difícil.", "Otra variable con un aleatorio entre 1 y 3, y escríbela en pantalla."],
      ["Haz el camino más largo, con 10 casillas.", "Cambia el 6 del contar y mueve la meta."],
      ["Cuenta en cuántos turnos llegas a la meta.", "Suma 1 a una variable turnos cada vez que tires el dado."]
    ],
    quiz: [
      ["¿Qué hace la barra espaciadora?", ["Mueve el robot", "Tira el dado (un número al azar del 1 al 6)", "Termina el juego"], 1, "Guarda el número en dado y en pasos."],
      ["¿Por qué solo puedes tirar cuando pasos = 0?", ["Porque el dado se descompone", "No hay razón", "Para que primero avances lo del tiro anterior"], 2, "Así no se acumulan tiros."],
      ["¿Cuánto avanza el robot en cada apretón de →?", ["70 píxeles, una casilla", "1 píxel", "Hasta la meta"], 0, "Cada casilla mide 70 píxeles de centro a centro."]
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
