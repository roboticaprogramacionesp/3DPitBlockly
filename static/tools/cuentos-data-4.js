/* Mini cuentos (4.ª parte): ficción con los módulos de los tutoriales.
   Mismo formato que cuentos-data.js. */
CUENTOS.push(
  {
    id: "ofrenda", area: "programacion", icono: "🕯️", tipo: "ficcion", tema: "Colores y números al azar", minutos: 5,
    titulo: "Las velas que no se apagaban",
    resumen: "Para el Día de Muertos, Camila quiere una ofrenda en el salón, pero la maestra no permite velas de verdad.",
    relacion: "NeoPixel",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Se acerca el <b>Día de Muertos</b> y el grupo de Camila va a poner una ofrenda en el salón: papel picado, flores de <b>cempasúchil</b>, pan de muerto y fotos de los abuelitos.",
          "«Velas de verdad, no», dice la maestra Elena. «Con tanto papel picado, una flama puede provocar un incendio». Camila se pone triste: sin velas, la ofrenda no se ve igual.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Entonces se acuerda de su anillo de <b>NeoPixel</b>: LEDs que pueden ser de cualquier color. Lo programa en color naranja (rojo 255, verde 120, azul 0) y lo pone dentro de un vasito de papel.",
          "Se ve bonito... pero muy quieto. Parece foco, no vela.",
        ],
        pregunta: "¿Cómo haría que pareciera una flama de verdad?",
        opciones: [
          { t: "Cambiar el brillo un poquito al azar, muy rápido, una y otra vez", ir: "c" },
          { t: "Prender y apagar el LED cada segundo", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Ahora parece la luz de una ambulancia, no una vela. Las flamas nunca se apagan del todo: <b>tiemblan</b> un poquito, sin un ritmo fijo.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Camila usa un ciclo: elige un <b>número al azar</b> entre 150 y 255 para el brillo, lo pone en el NeoPixel, espera <b>0.08 segundos</b> y vuelve a empezar.",
          "¡Ahora sí! La luz tiembla como si una brisa moviera la flama. Para que cada vela se vea distinta, cada LED del anillo usa su propio número al azar.",
        ],
        dato: "Las velas LED que venden en las tiendas hacen exactamente esto: tienen un pequeño chip que cambia el brillo al azar.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "El día de la ofrenda, el salón está a oscuras y doce «velas» naranjas tiemblan entre el cempasúchil. Los papás que visitan no pueden creer que no sean de verdad.",
          "La maestra Elena sonríe: «Bonita, segura y programada por ustedes». Y Camila pone junto a la foto de su abuelo Raúl, que era electricista, una tarjeta que dice: <b>«Esta luz la hice yo, abuelo»</b>.",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué la maestra no quería velas de verdad?", o: ["Porque con el papel picado podían provocar un incendio", "Porque no le gustaban", "Porque eran caras"], c: 0, e: "La seguridad era lo primero." },
      { p: "¿Qué hizo que la luz pareciera una flama?", o: ["Prenderla y apagarla cada segundo", "Cambiar el brillo un poquito al azar, muy rápido", "Ponerla de color azul"], c: 1, e: "Las flamas tiemblan sin un ritmo fijo." },
      { p: "¿Qué color usó para la vela?", o: ["Verde", "Morado", "Naranja"], c: 2, e: "Rojo 255, verde 120 y azul 0 dan un naranja." },
    ],
    palabras: [
      ["Cempasúchil", "Flor naranja que se pone en las ofrendas de Día de Muertos."],
      ["Ofrenda", "Altar con flores, comida y fotos para recordar a quienes ya murieron."],
      ["Aleatorio", "Que sale al azar, sin un orden que se pueda adivinar."],
    ],
  },

  {
    id: "mananitas", area: "programacion", icono: "🎺", tipo: "ficcion", tema: "Notas y frecuencias", minutos: 5,
    titulo: "Las mañanitas de un buzzer",
    resumen: "Es el cumpleaños de la maestra y el grupo quiere darle una sorpresa a las 7 de la mañana, con mariachi... de bolsillo.",
    relacion: "Buzzer y herramienta Melodías",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Mañana es el cumpleaños de la maestra Lucía, y el grupo de 6.º quiere cantarle <b>Las mañanitas</b>. Pero contratar un mariachi cuesta mucho.",
          "<b>Iker</b> tiene una idea: «¡Que las toque mi placa con el buzzer!». Esa tarde se pone a programar.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Iker sabe que cada nota es una <b>frecuencia</b>: el Do vibra unas 262 veces por segundo, el Re unas 294, el Mi unas 330... Escribe las notas una tras otra, cada una con su duración.",
          "Pero cuando lo prueba, en las partes donde la misma nota se repite («Es-tas son...»), se oye una sola nota larga, como si el buzzer se trabara.",
        ],
        pregunta: "¿Qué le falta a la melodía?",
        opciones: [
          { t: "Un silencio cortito entre nota y nota", ir: "c" },
          { t: "Subir el volumen del buzzer", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Más fuerte se oiría igual de pegado. Si dos notas iguales van juntas sin espacio, para el oído son <b>una sola nota</b> más larga.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Iker agrega un silencio de <b>0.05 segundos</b> después de cada nota. ¡Ahora sí se oye cada sílaba de la canción!",
          "Luego ajusta las duraciones: las notas largas el doble que las cortas. Usa la herramienta <b>Melodías</b> de 3DPit para revisar las notas y que no le quede desafinada.",
        ],
        dato: "Los músicos llaman articulación a la forma de separar o unir las notas. Un pequeño silencio entre notas hace que la melodía suene más clara.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "A las 7 de la mañana, cuando la maestra Lucía entra al salón, Iker aprieta el botón y el buzzer empieza: <i>Estas son las mañanitas...</i> Todo el grupo canta encima.",
          "La maestra se ríe y se emociona. «Es el mariachi más chiquito que he escuchado», dice. «¡Y el mejor afinado!».",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué es lo que cambia de una nota a otra en el buzzer?", o: ["La frecuencia", "El color", "El pin"], c: 0, e: "Cada nota vibra un número distinto de veces por segundo." },
      { p: "¿Por qué dos notas iguales sonaban como una sola?", o: ["Porque el buzzer estaba roto", "Porque no había silencio entre ellas", "Porque eran muy agudas"], c: 1, e: "Sin espacio, el oído las junta." },
      { p: "¿Para qué usó Iker la herramienta Melodías?", o: ["Para mandar mensajes", "Para cambiar el color", "Para revisar las notas y que no saliera desafinada"], c: 2, e: "Le ayudó a encontrar las notas correctas." },
    ],
    palabras: [
      ["Nota musical", "Cada sonido de una melodía, como Do, Re o Mi."],
      ["Afinado", "Que suena en la nota correcta."],
      ["Silencio", "En música, un momento en que no suena nada; también es parte de la melodía."],
    ],
  },

  {
    id: "contrasena", area: "programacion", icono: "🔢", tipo: "ficcion", tema: "Contraseñas y teclado", minutos: 5,
    titulo: "La caja fuerte del club",
    resumen: "El club de robótica quiere una caja con contraseña para guardar sus piezas. Toño cree que ya está, pero su hermana la abre en un minuto.",
    relacion: "Teclado matricial 4x4",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "El club de robótica tiene una caja con sus mejores piezas: sensores, motores y un servo nuevo. Toño decide ponerle una <b>cerradura con contraseña</b>: un teclado matricial de 16 teclas y un servo que mueve el pestillo.",
          "La contraseña será <b>2580</b>.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Su primer programa revisa tecla por tecla: si la tecla está en la contraseña, la acepta. Al día siguiente, su hermana Majo abre la caja tecleando <b>0852</b>.",
          "«¡Usé los mismos números, pero al revés!», dice Majo, muerta de risa.",
        ],
        pregunta: "¿Cómo debe revisar la contraseña el programa?",
        opciones: [
          { t: "Juntar las teclas en un texto y, al presionar #, comparar el texto completo con «2580»", ir: "c" },
          { t: "Revisar solo si la primera tecla es un 2", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Entonces cualquier contraseña que empiece con 2 abriría la caja: 2000, 2111, 2999... ¡Hay que revisar <b>todas</b> las teclas y en el <b>orden</b> correcto!",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Toño cambia el programa: cada tecla se va <b>agregando</b> a una variable de texto. Cuando se presiona <b>#</b>, se compara todo el texto con «2580». Si es igual, el servo abre; si no, el texto se borra y se vuelve a empezar. La tecla <b>*</b> borra por si te equivocas.",
          "Majo prueba otra vez. «Mmm... ¿y si pruebo todas, de la 0000 a la 9999?».",
        ],
        pregunta: "¿Cómo evitar que alguien pruebe miles de contraseñas?",
        opciones: [
          { t: "Después de 3 intentos fallidos, bloquear el teclado 30 segundos y sonar el buzzer", ir: "d" },
          { t: "Poner una contraseña más bonita", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "Bonita o no, si alguien tiene tiempo de probarlas todas, tarde o temprano le atina. Hay que hacer que probar muchas sea <b>lento</b>.",
        ],
        sig: "c",
      },
      d: {
        fin: true,
        texto: [
          "Con 3 intentos y 30 segundos de espera, probar las 10 000 contraseñas tardaría más de un día entero. Majo se rinde.",
          "Toño cambia la contraseña por una que no sea fácil de adivinar (nada de 1234, ni su cumpleaños) y aprende la regla de oro: <b>una contraseña se revisa completa, en orden, y con límite de intentos</b>. Así funcionan también los celulares y los cajeros del banco.",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué Majo pudo abrir la caja con 0852?", o: ["Porque el programa revisaba cada tecla sin importar el orden", "Porque sabía la contraseña", "Porque rompió la caja"], c: 0, e: "Solo revisaba si cada número estaba en la contraseña." },
      { p: "¿Para qué sirve la tecla # en el programa de Toño?", o: ["Para borrar", "Para indicar que ya terminaste de escribir y comparar", "Para apagar la placa"], c: 1, e: "Al presionarla se compara el texto completo." },
      { p: "¿Por qué ayuda bloquear después de 3 intentos?", o: ["Porque gasta menos pila", "Porque así suena más bonito", "Porque probar todas las contraseñas se vuelve muy lento"], c: 2, e: "Tardaría más de un día probarlas todas." },
    ],
    palabras: [
      ["Contraseña", "Palabra o número secreto para abrir o entrar a algo."],
      ["Pestillo", "Pieza que se corre para cerrar una puerta o una caja."],
      ["Intento", "Cada vez que pruebas hacer algo."],
    ],
  },

  {
    id: "cancha", area: "sensores", icono: "🌡️", tipo: "ficcion", tema: "Temperatura y promedios", minutos: 5,
    titulo: "¿Hace demasiado calor para jugar?",
    resumen: "En la escuela de Hermosillo hace muchísimo calor. El profe de Educación Física quiere saber cuándo es peligroso jugar en la cancha.",
    relacion: "Sensor DHT11 y pantalla OLED",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "En Hermosillo, Sonora, en mayo, el sol pega fuertísimo. El profe Ramón de Educación Física está preocupado: si hace demasiado calor, jugar futbol al mediodía puede hacer que alguien se desmaye.",
          "<b>Ximena</b> propone: «Pongamos un termómetro con la placa en la cancha. Si pasa de 35 grados, que la pantalla diga que hay que jugar a la sombra».",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Ximena conecta un sensor <b>DHT11</b> y una pantalla OLED. Pone la cajita en una banca, en pleno sol. Al rato, la pantalla dice: <b>¡52 grados!</b>",
          "«¿Cincuenta y dos? Hace calor, pero no tanto», dice el profe.",
        ],
        pregunta: "¿Qué crees que pasó?",
        opciones: [
          { t: "El sol le pegaba directo al sensor y lo calentó más que el aire", ir: "c" },
          { t: "En la cancha de verdad había 52 grados", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Si hubiera 52 grados, nadie aguantaría estar afuera. Cuando un sensor da un número rarísimo, hay que preguntarse: <b>¿qué está midiendo en realidad?</b>",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Exacto! El sensor mide la temperatura de lo que lo rodea, y el sol calentaba la caja. Los termómetros del clima se ponen <b>a la sombra</b> y con aire que circule. Ximena pone el sensor debajo de un techito con agujeros.",
          "Ahora marca 37 grados... luego 39... luego 36. Los números brincan un poco.",
        ],
        dato: "El DHT11 tiene un margen de error de más o menos 2 grados, y necesita uno o dos segundos entre cada lectura.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Para que los números no brinquen, Ximena saca el <b>promedio</b>: toma 5 lecturas, una cada 2 segundos, las suma y las divide entre 5. Ahora la pantalla marca un número más tranquilo: <b>37 grados</b>.",
          "Encima del número pone un mensaje: si el promedio pasa de 35, <b>«¡Juega a la sombra y toma agua!»</b>. El profe Ramón lo revisa cada mañana, y desde entonces nadie se ha desmayado en la cancha.",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué el sensor marcó 52 grados?", o: ["Porque el sol le pegaba directo y lo calentó", "Porque estaba roto", "Porque era de noche"], c: 0, e: "Los termómetros deben estar a la sombra." },
      { p: "¿Cómo se saca el promedio de 5 lecturas?", o: ["Se elige la más alta", "Se suman las 5 y se divide entre 5", "Se multiplican"], c: 1, e: "Así los números brincan menos." },
      { p: "¿Qué hace el aviso cuando el promedio pasa de 35?", o: ["Apaga la pantalla", "Suena una canción", "Pide jugar a la sombra y tomar agua"], c: 2, e: "Ayuda a cuidar a los alumnos del calor." },
    ],
    palabras: [
      ["Promedio", "Resultado de sumar varios números y dividir entre cuántos son."],
      ["Margen de error", "Qué tanto puede equivocarse un aparato al medir."],
      ["Golpe de calor", "Cuando el cuerpo se calienta demasiado; puede causar mareos o desmayos."],
    ],
  },

  {
    id: "marcador", area: "sensores", icono: "⚽", tipo: "ficcion", tema: "Botones y contadores", minutos: 4,
    titulo: "El marcador que contaba de más",
    resumen: "En el torneo del recreo, el marcador electrónico anota 7 goles por cada gol. ¡Nadie lo puede creer!",
    relacion: "Botón KY-004 y display TM1637",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Hay torneo de futbol en el recreo y <b>Diego</b> armó un marcador: un display <b>TM1637</b> de 4 dígitos y dos botones, uno para cada equipo. Los dos dígitos de la izquierda son para los Halcones y los de la derecha para los Tigres.",
          "Empieza el partido. ¡Gol de los Halcones! Diego aprieta el botón... y el marcador dice <b>07 - 00</b>.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Su programa decía: repetir para siempre: <b>si</b> el botón está presionado, sumar 1 a los goles.",
        ],
        pregunta: "¿Por qué sumó 7 en lugar de 1?",
        opciones: [
          { t: "El ciclo da muchas vueltas mientras el dedo sigue apretando el botón", ir: "c" },
          { t: "El botón está descompuesto", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Diego cambia el botón por otro nuevo y pasa lo mismo. El problema no es la pieza: es cuántas veces pregunta el programa mientras el botón sigue abajo.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Claro! Un dedo aprieta el botón unos 0.2 segundos, pero el ciclo da <b>cientos de vueltas</b> en ese tiempo. En cada vuelta ve el botón apretado y suma otro gol.",
          "Diego agrega después de sumar: <b>esperar hasta que se suelte el botón</b> y luego una pausa de 0.1 segundos. Ahora cada apretón cuenta un solo gol.",
        ],
        dato: "Además, al apretar o soltar un botón, sus contactos de metal rebotan y por un instante se abren y se cierran varias veces. A eso se le llama rebote, y la pausa cortita también lo resuelve.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "El partido termina <b>03 - 02</b> a favor de los Halcones, y esta vez el marcador no se equivoca ni una vez. Diego agrega un tercer botón escondido para regresar todo a <b>00 - 00</b> al empezar otro partido.",
          "El árbitro, que es el profe de Educación Física, le choca la mano: «Ahora sí, marcador oficial del torneo».",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué un apretón sumaba 7 goles?", o: ["El ciclo daba muchas vueltas mientras el botón seguía apretado", "El display estaba roto", "Diego apretó 7 veces"], c: 0, e: "En 0.2 segundos el ciclo da cientos de vueltas." },
      { p: "¿Qué es el rebote de un botón?", o: ["Que el botón salta de la mesa", "Que los contactos se abren y cierran varias veces al apretarlo", "Que el botón se pega"], c: 1, e: "Una pausa cortita lo resuelve." },
      { p: "¿Para qué sirvió el tercer botón?", o: ["Para sumar goles", "Para apagar la placa", "Para regresar el marcador a 00 - 00"], c: 2, e: "Así se reinicia para otro partido." },
    ],
    palabras: [
      ["Marcador", "Tablero que muestra los puntos o goles de cada equipo."],
      ["Contador", "Variable que va sumando de uno en uno."],
      ["Rebote", "Cuando un botón, al apretarse, hace contacto varias veces muy rápido."],
    ],
  },

  {
    id: "saludo", area: "sensores", icono: "🤖", tipo: "ficcion", tema: "Servomotores", minutos: 4,
    titulo: "El robot que saludaba a manotazos",
    resumen: "Pit, el robot del laboratorio, va a recibir a los papás en el festival. Pero su brazo se mueve tan rápido que casi tira un florero.",
    relacion: "Servo SG90",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Es el festival de fin de año y <b>Pit</b>, el robot del laboratorio, va a estar en la entrada para recibir a los papás. Los alumnos le pusieron un brazo de cartón movido por un <b>servo</b>.",
          "El programa es sencillo: mover el servo a <b>0 grados</b>, esperar medio segundo, mover a <b>180 grados</b>, esperar y repetir.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Lo prueban y... <i>¡zas!</i> El brazo da un golpe tan rápido que avienta el florero de la mesa. «¡Pit, así no se saluda!», gritan todos.",
        ],
        pregunta: "¿Cómo harías que el brazo se moviera suavecito?",
        opciones: [
          { t: "Moverlo de poquito en poquito: de 10 en 10 grados con una espera corta en cada paso", ir: "c" },
          { t: "Poner una espera más larga entre 0 y 180", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "La espera larga solo hace que se quede quieto más tiempo; el viaje de 0 a 180 sigue siendo de golpe. El servo va a la posición que le pides <b>lo más rápido que puede</b>.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Usan un ciclo <b>contar</b>: de 0 a 180 de 10 en 10, moviendo el servo a ese ángulo y esperando 0.05 segundos. Y otro ciclo de regreso, de 180 a 0. ¡Ahora el brazo saluda despacito, como una persona!",
          "Pero aparece otro problema: cada vez que el brazo se mueve, la placa se reinicia sola.",
        ],
        dato: "Un servo puede jalar más corriente de la que la placa da por su pin de 5V, sobre todo si carga algo pesado. Cuando le falta energía, el voltaje baja y la placa se reinicia.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Conectan el servo a una fuente de 5V aparte y unen los <b>GND</b> de la fuente y de la placa. ¡Listo! Pit ya no se reinicia.",
          "En el festival, Pit saluda a cada familia con su brazo de cartón, despacito y elegante. Una abuelita le devuelve el saludo y le dice: «¡Qué educado este muchachito!».",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué el brazo se movía de golpe?", o: ["Porque el servo va a la posición pedida lo más rápido que puede", "Porque era de cartón", "Porque el servo estaba roto"], c: 0, e: "Pasar de 0 a 180 de una vez es un movimiento brusco." },
      { p: "¿Cómo lograron un movimiento suave?", o: ["Pintando el brazo", "Moviéndolo de 10 en 10 grados con esperas cortas", "Apagando la placa"], c: 1, e: "Muchos pasos pequeños se ven como un movimiento suave." },
      { p: "¿Por qué la placa se reiniciaba?", o: ["Porque el programa era muy largo", "Porque hacía calor", "Porque el servo jalaba más corriente de la que daba la placa"], c: 2, e: "Una fuente aparte, con los GND unidos, lo resolvió." },
    ],
    palabras: [
      ["Servomotor", "Motor que gira hasta un ángulo exacto, por ejemplo entre 0 y 180 grados."],
      ["Ángulo", "Qué tan abierto o girado está algo; se mide en grados."],
      ["Fuente", "Aparato que da la electricidad a un circuito."],
    ],
  },

  {
    id: "comedero", area: "sensores", icono: "🐶", tipo: "ficcion", tema: "Condiciones con «y»", minutos: 5,
    titulo: "Nube y el comedero inteligente",
    resumen: "Después del misterio de las galletas, Leo quiere que Nube coma a sus horas... pero sin servirle doble.",
    relacion: "Reloj RTC, sensor ultrasónico y servo",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "¿Te acuerdas de <b>Nube</b>, la perrita que se comía las galletas de Leo? El veterinario dijo que tiene que comer a sus horas: a las <b>8 de la mañana</b> y a las <b>6 de la tarde</b>, nada más.",
          "Leo arma un comedero: un bote de croquetas con una tapita que abre un <b>servo</b>, y un <b>reloj RTC</b> para saber la hora.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Funciona... hasta el domingo. Su mamá ya le había servido a Nube a las 7:50, y a las 8:00 el comedero le sirvió <b>otra vez</b>. ¡Doble ración!",
          "Leo quiere que el comedero solo sirva si es la hora <b>y además</b> el plato está vacío. Para eso pone un <b>sensor ultrasónico</b> arriba del plato: vacío mide 10 cm hasta el fondo; con croquetas, unos 7 cm.",
        ],
        pregunta: "¿Qué condición debe usar?",
        opciones: [
          { t: "Si es la hora de comer Y la distancia es mayor que 9 cm, servir", ir: "c" },
          { t: "Si es la hora de comer O la distancia es mayor que 9 cm, servir", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Con «o» basta que se cumpla <b>una</b> de las dos cosas. Entonces, cada vez que Nube se acabe sus croquetas, a cualquier hora, ¡el comedero le serviría más! Nube estaría feliz, pero el veterinario no.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Eso! Con <b>y</b>, deben cumplirse <b>las dos cosas</b> al mismo tiempo: que sea la hora y que el plato esté vacío. Si su mamá ya le sirvió, el sensor mide 7 cm y el comedero no hace nada.",
        ],
        dato: "En los bloques de lógica, «y» solo da verdadero si las dos condiciones son verdaderas; «o» da verdadero si al menos una lo es. Puedes probarlos en la herramienta Tablas de verdad.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Leo agrega lo que aprendió el grupo del huerto: una variable <b>ya_servi</b> para no servir dos veces en la misma comida.",
          "Ahora Nube come a sus horas, ni más ni menos. A las 7:59 ya está sentadita frente al comedero, mirando la tapita. Leo dice que Nube aprendió a leer el reloj antes que su hermanito.",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué Nube comió doble el domingo?", o: ["El comedero servía a las 8 aunque el plato ya tuviera croquetas", "Nube abrió el bote", "El reloj se adelantó"], c: 0, e: "El comedero no revisaba si el plato estaba vacío." },
      { p: "¿Qué significa usar «y» en una condición?", o: ["Que basta con que se cumpla una", "Que se deben cumplir las dos al mismo tiempo", "Que no importa ninguna"], c: 1, e: "«y» pide que las dos sean verdaderas." },
      { p: "¿Qué pasaría si usaran «o»?", o: ["Nunca serviría", "Serviría solo a las 8", "Serviría cada vez que el plato se vaciara, a cualquier hora"], c: 2, e: "Con «o» basta una de las dos condiciones." },
    ],
    palabras: [
      ["Ración", "Cantidad de comida que se sirve cada vez."],
      ["Operador lógico", "Palabras como «y», «o» y «no» que unen o cambian condiciones."],
      ["Croqueta", "Bolitas de alimento seco para perros y gatos."],
    ],
  },

  {
    id: "pasillo", area: "sensores", icono: "🌗", tipo: "ficcion", tema: "Sensores de luz", minutos: 5,
    titulo: "La luz del pasillo que no se decidía",
    resumen: "Andrea arma una lámpara que se prende sola al oscurecer. Pero al atardecer, la lámpara parpadea como loca.",
    relacion: "Sensor de luz KY-018 y relevador",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "En la vecindad de <b>Andrea</b>, el pasillo de la entrada se queda oscurísimo en la noche y doña Carmen ya se tropezó dos veces. Andrea decide hacer una lámpara que se prenda <b>sola</b> cuando oscurezca.",
          "Usa un sensor de luz <b>KY-018</b> en un pin analógico y un relevador que prende el foco. En su conexión, entre más oscuro, <b>más alto</b> es el número que lee.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Mide: de día, unos <b>800</b>; de noche, unos <b>3500</b>. Programa: si la lectura es mayor que 2400, prender el foco; si no, apagarlo.",
          "Esa tarde, justo al atardecer, el foco hace <i>clic, clic, clic</i>: se prende y se apaga sin parar. ¡Parece discoteca!",
        ],
        pregunta: "¿Qué crees que está pasando?",
        opciones: [
          { t: "Al atardecer la lectura anda cerca de 2400 y brinca un poquito arriba y abajo", ir: "c" },
          { t: "El relevador está descompuesto", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "De noche y de día el relevador funciona perfecto. Solo falla al atardecer... ¿qué tiene de especial esa hora? Fíjate en qué número lee el sensor en ese momento.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Exacto! Al atardecer la lectura anda en 2390, 2405, 2398, 2410... Cada vez que cruza el 2400, el foco cambia. Y encima, cuando el foco se prende, ¡su propia luz le llega al sensor y lo hace bajar!",
          "Andrea usa <b>dos límites</b>: prender si pasa de <b>2600</b>, y apagar solo si baja de <b>2200</b>. Entre los dos, el foco se queda como estaba.",
        ],
        dato: "Usar dos límites separados se llama histéresis. Los termostatos de los refrigeradores y de los aires acondicionados la usan para no prender y apagar a cada rato.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "También tapa el sensor con un tubito para que no le llegue la luz del foco, solo la del cielo.",
          "Ahora, al atardecer, el foco se prende <b>una sola vez</b> y se queda prendido hasta el amanecer. Doña Carmen ya no se tropieza y le regala a Andrea unos tamales «por ingeniera».",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué el foco parpadeaba al atardecer?", o: ["La lectura brincaba alrededor del límite de 2400", "Se fue la luz", "El foco era viejo"], c: 0, e: "Cada vez que cruzaba el límite, el foco cambiaba." },
      { p: "¿Qué es la histéresis?", o: ["Un tipo de foco", "Usar un límite para prender y otro distinto para apagar", "Un sensor de temperatura"], c: 1, e: "Entre los dos límites, todo se queda como estaba." },
      { p: "¿Para qué tapó el sensor con un tubito?", o: ["Para que se viera bonito", "Para protegerlo de la lluvia", "Para que no le llegara la luz del propio foco"], c: 2, e: "La luz del foco confundía al sensor." },
    ],
    palabras: [
      ["Fotorresistencia", "Componente que cambia cuánto deja pasar la electricidad según la luz que recibe."],
      ["Histéresis", "Usar dos límites distintos, uno para prender y otro para apagar."],
      ["Vecindad", "Conjunto de casas o departamentos que comparten un patio o pasillo."],
    ],
  },

  {
    id: "linea", area: "sensores", icono: "🏁", tipo: "ficcion", tema: "Robots seguidores de línea", minutos: 5,
    titulo: "Carrera en la feria de ciencias",
    resumen: "El carrito de Majo y Toño debe seguir una línea negra en la feria de ciencias. En la primera curva, se sale de la pista.",
    relacion: "Sensor infrarrojo TCRT5000 y puente H",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "En la feria de ciencias de la zona escolar hay una competencia: un carrito debe seguir una <b>línea negra</b> pintada sobre una cartulina blanca, de la salida a la meta.",
          "Majo y Toño ponen en su carrito dos sensores infrarrojos <b>TCRT5000</b>, uno a cada lado de la línea, apuntando al piso. Sobre el blanco, la luz infrarroja rebota; sobre el negro, casi no rebota.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Si los dos sensores ven blanco, la línea va en medio: el carrito sigue derecho. Pero en la primera curva, el sensor <b>izquierdo</b> ve negro.",
        ],
        pregunta: "¿Hacia dónde debe girar el carrito?",
        opciones: [
          { t: "Hacia la izquierda, para volver a tener la línea en medio", ir: "c" },
          { t: "Hacia la derecha, para alejarse de la línea", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "El carrito gira a la derecha... y se sale de la pista. Si el sensor izquierdo ve la línea, es porque la línea se fue para <b>ese lado</b>. Hay que seguirla.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Así es! Para girar a la izquierda, frenan la rueda izquierda y dejan andar la derecha. Y al revés si el sensor derecho ve negro.",
          "Pero en las curvas cerradas el carrito todavía se pasa: va tan rápido que, cuando los sensores reaccionan, ya se salió.",
        ],
        pregunta: "¿Qué cambiarías?",
        opciones: [
          { t: "Bajar un poco la velocidad para que le dé tiempo de corregir", ir: "d" },
          { t: "Subir la velocidad para terminar antes", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "Más rápido, se sale todavía más pronto. Un carrito que termina primero pero fuera de la pista... ¡queda descalificado!",
        ],
        sig: "c",
      },
      d: {
        fin: true,
        texto: [
          "Con el PWM del puente H bajan la velocidad un poco, y en las curvas el carrito ya alcanza a corregir. No es el más rápido, pero es el único que termina la pista <b>sin salirse ni una vez</b>.",
          "Los jueces les dan el primer lugar en precisión. Toño dice que la lección es como en el futbol: «No gana el que corre más, sino el que llega».",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué el sensor distingue el negro del blanco?", o: ["Porque sobre el blanco la luz infrarroja rebota y sobre el negro casi no", "Porque huele la pintura", "Porque mide la temperatura"], c: 0, e: "El blanco refleja la luz y el negro la absorbe." },
      { p: "Si el sensor izquierdo ve la línea, ¿hacia dónde se gira?", o: ["Hacia la derecha", "Hacia la izquierda", "Se detiene"], c: 1, e: "Hay que seguir la línea hacia donde se fue." },
      { p: "¿Por qué bajar la velocidad ayudó?", o: ["Porque gasta menos pila", "Porque los motores se calientan", "Porque le da tiempo al carrito de corregir en las curvas"], c: 2, e: "Muy rápido, los sensores reaccionan tarde." },
    ],
    palabras: [
      ["Infrarrojo", "Luz que nuestros ojos no pueden ver."],
      ["Reflejar", "Cuando la luz rebota en una superficie."],
      ["Precisión", "Hacer algo exacto, sin desviarse."],
    ],
  },

  {
    id: "recreo", area: "comunicacion", icono: "📲", tipo: "ficcion", tema: "Bluetooth", minutos: 4,
    titulo: "¿Cuál de todas es mi placa?",
    resumen: "Todo el grupo intenta conectarse por Bluetooth al mismo tiempo, y en el celular aparecen veinte placas con el mismo nombre.",
    relacion: "Bluetooth BLE",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Hoy, en la clase de tecnología, cada quien va a controlar el LED de su placa desde el celular, por <b>Bluetooth</b>. La maestra reparte el programa y todos lo cargan.",
          "<b>Sofía</b> abre la app en el celular para buscar su placa y aparece una lista: <b>ESP32, ESP32, ESP32, ESP32...</b> ¡Veinte veces el mismo nombre!",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Sofía se conecta a una al azar, aprieta «prender» y... del otro lado del salón grita Mateo: «¡Oye, se prendió mi LED!».",
        ],
        pregunta: "¿Cómo lo arreglarían?",
        opciones: [
          { t: "Que cada quien le ponga un nombre distinto a su placa en el programa", ir: "c" },
          { t: "Apagar todas las placas menos una", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Funcionaría, pero solo una persona podría trabajar a la vez y la clase duraría todo el día. Lo que falta es poder <b>distinguir</b> cada placa.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Cada quien cambia el nombre en el bloque de Bluetooth: «Placa-Sofia», «Placa-Mateo», «Robot-Ximena»... Ahora la lista del celular se entiende y cada quien se conecta a la suya.",
          "Mateo intenta controlar su placa desde el patio, a 25 metros y con dos paredes de por medio, y se desconecta.",
        ],
        dato: "El Bluetooth de las placas suele alcanzar unos 10 metros dentro de un salón. Las paredes, los muebles y hasta las personas absorben parte de la señal.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "La maestra explica que el Bluetooth es para <b>distancias cortas</b>: audífonos, bocinas, relojes. Para llegar más lejos se usa el WiFi, que pasa por un router.",
          "Al final de la clase, Sofía y Mateo hacen un trato: si alguno vuelve a prender el LED del otro «sin querer», le debe un chicharrón preparado en el recreo.",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué Sofía prendió el LED de Mateo?", o: ["Porque todas las placas tenían el mismo nombre", "Porque la placa de Mateo estaba rota", "Porque Mateo se lo pidió"], c: 0, e: "Con nombres iguales, no se sabía cuál era cuál." },
      { p: "¿Cómo lo arreglaron?", o: ["Comprando otro celular", "Poniéndole a cada placa un nombre distinto", "Apagando el Bluetooth"], c: 1, e: "Un nombre único permite distinguir cada placa." },
      { p: "¿Por qué Mateo se desconectó en el patio?", o: ["Porque se le acabó la pila al celular", "Porque estaba lloviendo", "Porque el Bluetooth alcanza poca distancia y las paredes debilitan la señal"], c: 2, e: "El Bluetooth es para distancias cortas." },
    ],
    palabras: [
      ["Bluetooth", "Forma de conectar aparatos sin cables a poca distancia."],
      ["Emparejar", "Conectar dos aparatos por Bluetooth por primera vez."],
      ["Alcance", "Distancia máxima a la que llega una señal."],
    ],
  },

  {
    id: "reloj", area: "comunicacion", icono: "⏰", tipo: "ficcion", tema: "La hora por Internet", minutos: 5,
    titulo: "El reloj del salón que se atrasaba",
    resumen: "El reloj que hizo el grupo se atrasa unos minutos cada semana, y luego marca seis horas de más. ¿Qué le pasa?",
    relacion: "WiFi y la hora de Internet (NTP)",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "El grupo de 3.º hizo un reloj para el salón con una placa ESP32 y una pantalla grande. El lunes lo pusieron a la hora exacta.",
          "Pero el viernes, el reloj ya iba <b>3 minutos atrasado</b>. Por su culpa, salieron tarde al recreo... ¡y se perdieron las tortas!",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "El reloj de la placa no es perfecto: se adelanta o se atrasa un poquito cada día, y con los días se nota. Hay que corregirlo seguido.",
        ],
        pregunta: "¿Cuál es la mejor forma de corregirlo?",
        opciones: [
          { t: "Que la placa pida la hora exacta por Internet, con WiFi, una vez al día", ir: "c" },
          { t: "Que alguien la ajuste a mano cada lunes", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Se les olvidaría algún lunes, y entre lunes y lunes se seguiría atrasando. Si la placa tiene WiFi, ¡que lo haga sola!",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Hay computadoras en Internet que dan la hora exacta, conectadas a relojes atómicos. Se les pregunta con un sistema llamado <b>NTP</b>. El grupo agrega el bloque que pide la hora por WiFi.",
          "Lo prueban a las 10 de la mañana y el reloj marca... <b>¡las 4 de la tarde!</b>",
        ],
        pregunta: "¿Qué pasó ahora?",
        opciones: [
          { t: "La hora de Internet viene en la hora mundial (UTC), y en el centro de México hay que restarle 6 horas", ir: "d" },
          { t: "El servidor de Internet está mal", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "Los servidores de hora son de lo más exactos que hay. La diferencia es justo de <b>6 horas</b>, ni un minuto más ni menos... eso suena a <b>zona horaria</b>, no a un error.",
        ],
        sig: "c",
      },
      d: {
        fin: true,
        texto: [
          "¡Exacto! NTP da la hora <b>UTC</b>, que es la misma en todo el mundo. Cada país la ajusta según su zona: en el centro de México vamos 6 horas detrás (UTC−6). En Tijuana o en Cancún, la diferencia es distinta.",
          "Restan las 6 horas y ahora el reloj marca la hora exacta todo el año. El viernes salen al recreo a tiempo y alcanzan tortas para todos.",
        ],
        dato: "Desde 2022, la mayor parte de México ya no cambia la hora en verano. Algunas ciudades de la frontera norte sí lo siguen haciendo.",
      },
    },
    preguntas: [
      { p: "¿Por qué el reloj se atrasaba?", o: ["Porque el reloj de la placa no es perfecto y se desajusta un poco cada día", "Porque la pantalla era vieja", "Porque nadie lo veía"], c: 0, e: "Hay que corregirlo seguido." },
      { p: "¿Qué es NTP?", o: ["Un tipo de pantalla", "Una forma de pedir la hora exacta por Internet", "Un sensor de temperatura"], c: 1, e: "Servidores en Internet dan la hora exacta." },
      { p: "¿Por qué el reloj marcó 6 horas de más?", o: ["Porque el servidor estaba mal", "Porque la placa estaba caliente", "Porque NTP da la hora UTC y en el centro de México hay que restarle 6"], c: 2, e: "Cada zona horaria ajusta la hora mundial." },
    ],
    palabras: [
      ["Zona horaria", "Región del mundo que usa la misma hora."],
      ["UTC", "Hora de referencia para todo el mundo; cada país le suma o le resta horas."],
      ["Sincronizar", "Poner dos relojes o aparatos a la misma hora."],
    ],
  },

  {
    id: "gafete", area: "programacion", icono: "🔴", tipo: "ficcion", tema: "Matriz de LEDs", minutos: 4,
    titulo: "Un nombre que no cabía",
    resumen: "Para la kermés, Emiliano quiere un gafete luminoso con su nombre. Pero en una matriz de 8 por 8 solo cabe una letra.",
    relacion: "Matriz MAX7219 y herramienta Matriz 8x8",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "En la <b>kermés</b> de la escuela, cada puesto quiere llamar la atención. Emiliano atiende el de aguas frescas y quiere un gafete que brille con su nombre, con una matriz de LEDs <b>MAX7219</b> de 8 por 8.",
          "Con la herramienta <b>Matriz 8x8</b> de 3DPit dibuja la letra <b>E</b>: cada cuadrito prendido es un LED encendido.",
        ],
        dato: "Cada fila de 8 LEDs se guarda como un número de 8 bits: 1 si el LED está prendido y 0 si está apagado. Con 8 filas, una letra completa son 8 números.",
        sig: "b",
      },
      b: {
        texto: [
          "Pero «EMILIANO» tiene 8 letras, y en la matriz solo cabe <b>una</b> a la vez.",
        ],
        pregunta: "¿Cómo mostraría su nombre completo?",
        opciones: [
          { t: "Hacer que el texto se deslice de derecha a izquierda, columna por columna", ir: "c" },
          { t: "Hacer las letras más chiquitas para que quepan las 8", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Con 8 letras en 8 columnas, ¡cada letra tendría un solo LED de ancho! Sería una rayita y nadie podría leerla.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Emiliano usa el bloque para mostrar <b>texto que se desliza</b>. El nombre entra por la derecha y avanza poco a poco, como en los letreros de las farmacias.",
          "Al principio va tan rápido que nadie alcanza a leer. Le pone una pausa más larga entre cada paso y ahora sí se lee: <b>E-M-I-L-I-A-N-O</b>... y luego <b>AGUAS FRESCAS $15</b>.",
        ],
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "El puesto de Emiliano es el que más vende en toda la kermés. Hasta el director pasa a preguntar cómo hizo el letrero.",
          "Emiliano le explica: «Es como una película: muchas imágenes quietas, una tras otra, que parecen moverse». El director se compra dos aguas de horchata.",
        ],
      },
    },
    preguntas: [
      { p: "¿Cuántos LEDs tiene una matriz de 8 por 8?", o: ["64", "16", "8"], c: 0, e: "8 filas por 8 columnas son 64 LEDs." },
      { p: "¿Cómo mostró un nombre largo en una matriz pequeña?", o: ["Haciendo las letras chiquitas", "Haciendo que el texto se deslizara", "Usando dos placas"], c: 1, e: "El texto avanza columna por columna." },
      { p: "¿Por qué al principio nadie alcanzaba a leer?", o: ["Porque los LEDs eran rojos", "Porque estaba apagado", "Porque el texto se movía demasiado rápido"], c: 2, e: "Una pausa más larga entre pasos lo hizo legible." },
    ],
    palabras: [
      ["Matriz de LEDs", "LEDs acomodados en filas y columnas para formar dibujos o letras."],
      ["Bit", "La unidad de información más pequeña: vale 0 o 1."],
      ["Kermés", "Fiesta de la escuela con puestos de comida y juegos."],
    ],
  },

  {
    id: "brujula", area: "sensores", icono: "🧭", tipo: "ficcion", tema: "Brújula electrónica", minutos: 5,
    titulo: "Perdidos en el campamento",
    resumen: "En el campamento de La Marquesa, la brújula electrónica de Ana marca el norte hacia cualquier lado. ¿Será que está embrujada?",
    relacion: "Brújula QMC5883L",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Los scouts acampan en el bosque de <b>La Marquesa</b>. Mañana harán una caminata y tienen que regresar al campamento siguiendo el <b>norte</b>.",
          "<b>Ana</b> trae una brújula electrónica que armó con su placa y un sensor <b>QMC5883L</b>: la pantalla muestra una flechita que debería apuntar al norte.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Ana la prueba sobre la mesa de metal del comedor... y la flecha apunta hacia la estufa. La mueve junto a la bocina del campamento y apunta hacia la bocina. «¡Está embrujada!», dice su amigo Pablo.",
        ],
        pregunta: "¿Qué crees que está pasando?",
        opciones: [
          { t: "El metal y el imán de la bocina tienen su propio magnetismo y confunden al sensor", ir: "c" },
          { t: "En el bosque no hay norte", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "¡El norte existe en todo el planeta! El sensor mide el <b>campo magnético de la Tierra</b>, que es débil. Cualquier imán o metal cercano puede ser más fuerte que él.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Eso! La bocina tiene un imán, y la mesa y la estufa son de hierro. Cerca de ellos, el sensor siente su magnetismo más que el de la Tierra.",
          "Ana se aleja de todo lo metálico y hace lo que dice el manual del sensor: <b>calibrarlo</b>, girándolo despacio en todas direcciones, como dibujando un ocho en el aire.",
        ],
        dato: "Calibrar es ajustar un aparato para que mida bien. Al girarlo en todas direcciones, el programa aprende cuánto magnetismo extra tiene la propia placa y lo descuenta.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Después de calibrarla y lejos de los metales, la flecha apunta siempre al mismo lado. Ana la compara con la brújula de aguja del jefe scout: ¡coinciden!",
          "Al día siguiente, el grupo regresa al campamento sin perderse. Pablo ya no dice que está embrujada; ahora le dice «la brújula científica».",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué la brújula apuntaba a la bocina?", o: ["Porque la bocina tiene un imán que confunde al sensor", "Porque la bocina estaba al norte", "Porque estaba embrujada"], c: 0, e: "Los imanes cercanos son más fuertes que el campo de la Tierra." },
      { p: "¿Qué significa calibrar?", o: ["Pintar el aparato", "Ajustarlo para que mida bien", "Apagarlo"], c: 1, e: "Ana la giró en todas direcciones para ajustarla." },
      { p: "¿Cómo comprobó Ana que ya funcionaba?", o: ["Preguntándole a Pablo", "Viendo el sol", "Comparándola con una brújula de aguja"], c: 2, e: "Comparar con otro instrumento ayuda a confirmar." },
    ],
    palabras: [
      ["Campo magnético", "Zona alrededor de un imán, o de la Tierra, donde se sienten sus efectos."],
      ["Calibrar", "Ajustar un aparato para que mida correctamente."],
      ["Norte magnético", "El lugar hacia donde apuntan las brújulas, cerca del Polo Norte."],
    ],
  },

  {
    id: "control", area: "comunicacion", icono: "📺", tipo: "ficcion", tema: "Control remoto infrarrojo", minutos: 5,
    titulo: "El control de la tele de la abuela",
    resumen: "Majo quiere usar un control remoto viejo para manejar su robot. Primero tiene que descubrir qué número manda cada botón.",
    relacion: "Receptor infrarrojo KY-022",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "En un cajón de la abuela Lupita, <b>Majo</b> encuentra el control de una tele que ya no existe. «¿Y si con este manejo a mi robot?», piensa.",
          "Conecta a su placa un receptor infrarrojo <b>KY-022</b>. El control manda luz infrarroja, que no podemos ver, en pulsos muy rápidos. Cada botón manda un <b>código</b> distinto.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Majo aprieta la flecha de arriba, pero no pasa nada.",
        ],
        pregunta: "¿Cómo puede saber si el control todavía funciona?",
        opciones: [
          { t: "Verlo con la cámara del celular mientras aprieta un botón", ir: "c" },
          { t: "Mirar el foquito del control con sus propios ojos", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Majo lo mira de cerca, aprieta y aprieta... y no ve nada. Claro: la luz infrarroja es <b>invisible</b> para nuestros ojos. Pero muchas cámaras de celular sí la captan.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "En la pantalla del celular, el foquito del control parpadea en morado. ¡Sí funciona! Entonces el problema era... ¡que no tenía pilas nuevas! Le pone unas y el receptor empieza a recibir.",
          "Ahora Majo necesita saber qué código manda cada botón.",
        ],
        pregunta: "¿Qué le conviene hacer?",
        opciones: [
          { t: "Imprimir en el monitor serial cada código que llega y anotar cuál es cada botón", ir: "d" },
          { t: "Buscar en Internet los códigos de cualquier control", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "Cada marca y cada modelo de control usa sus propios códigos. Los de otro control no le servirían. Es mejor <b>preguntarle</b> a su propio control.",
        ],
        sig: "c",
      },
      d: {
        fin: true,
        texto: [
          "Majo aprieta cada botón y anota en una tabla: flecha arriba, un número; flecha abajo, otro; OK, otro más. Después programa: <b>si</b> el código es el de la flecha arriba, avanzar; <b>si</b> es el de abajo, retroceder.",
          "Esa tarde, el robot recorre la sala obedeciendo al control de la tele de la abuela. Lupita se ríe: «¡Por fin ese control sirve para algo!».",
        ],
        dato: "Los números de los controles suelen escribirse en hexadecimal, como 0x18. Es otra forma de escribir números, usando del 0 al 9 y de la A a la F.",
      },
    },
    preguntas: [
      { p: "¿Por qué Majo no veía la luz del control?", o: ["Porque la luz infrarroja es invisible para nuestros ojos", "Porque estaba de día", "Porque el control era negro"], c: 0, e: "La cámara del celular sí puede captarla." },
      { p: "¿Por qué no le servían los códigos de Internet?", o: ["Porque estaban en inglés", "Porque cada marca y modelo de control usa códigos distintos", "Porque Internet estaba lento"], c: 1, e: "Era mejor leer los de su propio control." },
      { p: "¿Cómo descubrió qué código manda cada botón?", o: ["Adivinando", "Preguntándole a la abuela", "Imprimiendo en el monitor serial cada código que llegaba"], c: 2, e: "Así hizo su tabla de botones y códigos." },
    ],
    palabras: [
      ["Código", "Número que identifica a cada botón del control."],
      ["Receptor", "Componente que recibe una señal, como la luz del control."],
      ["Hexadecimal", "Forma de escribir números con 16 símbolos: del 0 al 9 y de la A a la F."],
    ],
  }
);
