/* Mini cuentos (5.ª parte): Miriam, Neomi, Edith y Vale.
   Mismo formato que cuentos-data.js. */
CUENTOS.push(
  {
    id: "miriam_rfid", area: "sensores", icono: "📚", tipo: "ficcion", tema: "Tarjetas RFID", minutos: 5,
    titulo: "Miriam y los libros que no regresaban",
    resumen: "La biblioteca del salón pierde libros cada semana. Miriam inventa un sistema de préstamo con tarjetas que no necesitan pila.",
    relacion: "Lector RFID MFRC522",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "En el salón de <b>Miriam</b> hay un librero con 40 libros que todos pueden llevarse a casa. El problema: nadie anota quién se los lleva, y cada semana desaparece uno.",
          "«Necesitamos saber quién tiene cada libro», dice la maestra. Miriam levanta la mano: «¡Yo hago algo con mi placa!».",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Miriam tiene un lector <b>RFID</b> y varias tarjetas blancas. Al acercar una tarjeta al lector, la placa lee un número.",
        ],
        pregunta: "¿Qué debería usar para saber de quién es cada tarjeta?",
        opciones: [
          { t: "El número único que trae cada tarjeta (su UID)", ir: "c" },
          { t: "El color de la tarjeta", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "¡Todas las tarjetas son blancas! Y el lector no ve colores: lo único que lee es el <b>número</b> grabado en el chip de cada tarjeta, que es distinto en cada una.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Cada tarjeta tiene un <b>UID</b>, un número que ninguna otra tiene. Miriam le da una a cada compañero y pega otra en cada libro. Su programa guarda en una <b>lista</b> qué número es de quién.",
          "Para llevarse un libro, primero acercas tu tarjeta y luego la del libro. La pantalla dice: <b>«Ernesto se llevó El Principito»</b>.",
        ],
        dato: "Las tarjetas RFID no tienen pila. El lector crea un campo magnético que, por inducción, le da energía al chip de la tarjeta por un instante, justo para contestar con su número. Por eso solo funcionan a pocos centímetros.",
        sig: "d",
      },
      d: {
        texto: [
          "Un día, alguien acerca una tarjeta del metro. La placa lee un número que no está en la lista.",
        ],
        pregunta: "¿Qué debe hacer el programa?",
        opciones: [
          { t: "Avisar «Tarjeta no registrada» y no prestar nada", ir: "e" },
          { t: "Prestar el libro de todos modos", ir: "d1" },
        ],
      },
      d1: {
        error: true,
        texto: [
          "Entonces cualquiera con cualquier tarjeta podría llevarse libros y volveríamos al problema del principio. Si el número no está en la lista, el programa debe decir que <b>no</b>.",
        ],
        sig: "d",
      },
      e: {
        fin: true,
        texto: [
          "Miriam agrega un <b>si</b>: si el número está en la lista, presta el libro; <b>si no</b>, suena el buzzer y aparece «Tarjeta no registrada».",
          "En un mes no se pierde ni un libro. Hasta aparecen dos que llevaban tiempo perdidos: sus dueños los devolvieron cuando vieron que ahora todo queda anotado.",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué es el UID de una tarjeta RFID?", o: ["Un número único que la identifica", "Su color", "Su pila"], c: 0, e: "Ninguna otra tarjeta tiene el mismo número." },
      { p: "¿De dónde saca energía una tarjeta RFID?", o: ["De una pila escondida", "Del campo del lector, por inducción", "Del sol"], c: 1, e: "Por eso solo funciona muy cerca del lector." },
      { p: "¿Qué hace el programa con una tarjeta que no está en la lista?", o: ["Presta el libro", "Se apaga", "Avisa que no está registrada y no presta nada"], c: 2, e: "Así nadie se lleva libros sin quedar anotado." },
    ],
    palabras: [
      ["RFID", "Identificación por radiofrecuencia: leer un chip sin tocarlo, con ondas de radio."],
      ["UID", "Número único que identifica a cada tarjeta."],
      ["Préstamo", "Cuando alguien se lleva algo para devolverlo después."],
    ],
  },

  {
    id: "neomi_color", area: "sensores", icono: "🍬", tipo: "ficcion", tema: "Sensor de color", minutos: 5,
    titulo: "Neomi y la máquina de los dulces",
    resumen: "En la kermés hay que separar cientos de dulces por color. Neomi le enseña a su placa a distinguir el rojo del verde.",
    relacion: "Sensor de color TCS34725",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Para la kermés, el grupo de <b>Neomi</b> va a vender bolsitas de dulces, cada una de un solo color. Pero los dulces llegaron revueltos: rojos, verdes, amarillos y azules, ¡más de 500!",
          "«Nos vamos a tardar toda la tarde», dice su amigo Beto. Neomi saca su placa y un sensor <b>TCS34725</b>: «O podemos enseñarle a la placa a separarlos».",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "El sensor mide cuánta luz <b>roja</b>, <b>verde</b> y <b>azul</b> rebota en lo que tiene enfrente. Neomi pone un dulce rojo y ve: rojo 180, verde 40, azul 35.",
        ],
        pregunta: "¿Cómo sabe la placa que el dulce es rojo?",
        opciones: [
          { t: "Porque el número del rojo es el más grande de los tres", ir: "c" },
          { t: "Porque el rojo pasa de 100", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Neomi prueba un dulce amarillo y le da rojo 190, verde 170, azul 40: el rojo también pasa de 100, ¡y no es rojo! El amarillo refleja mucho rojo <b>y</b> mucho verde. Hay que <b>comparar</b> los tres números entre sí.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Neomi escribe sus reglas: si el rojo es el mayor, es <b>rojo</b>; si el verde es el mayor, es <b>verde</b>; si el azul es el mayor, es <b>azul</b>; y si el rojo y el verde son altos y parecidos, es <b>amarillo</b>.",
          "Funciona en la mesa de la cocina... pero en el patio, al sol, todo le sale «amarillo».",
        ],
        pregunta: "¿Qué crees que pasa en el patio?",
        opciones: [
          { t: "La luz del sol llega al sensor y cambia los números", ir: "d" },
          { t: "Los dulces cambian de color con el sol", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "Los dulces son los mismos. Lo que cambia es la <b>luz</b>: el sensor mide la luz que rebota, y al sol rebota muchísima más.",
        ],
        sig: "c",
      },
      d: {
        fin: true,
        texto: [
          "Neomi mete el sensor en una cajita oscura, con su propio LED blanco encendido, y <b>calibra</b> primero con una hoja blanca para saber cuánto rebota «todo». Ahora mide igual en el patio o en el salón.",
          "Con un servo que mueve una rampita hacia cuatro vasos, la máquina separa los dulces uno por uno. Tarda un poco, pero mientras tanto el grupo arma las bolsitas. En la kermés, ¡su puesto es el primero en venderlo todo!",
        ],
        dato: "Las máquinas que separan frutas, semillas o reciclaje en las fábricas usan sensores de color parecidos, pero muchísimo más rápidos.",
      },
    },
    preguntas: [
      { p: "¿Qué mide el sensor de color?", o: ["Cuánta luz roja, verde y azul rebota", "El peso del dulce", "La temperatura"], c: 0, e: "Con esos tres números se distingue el color." },
      { p: "¿Por qué el amarillo confundía la primera regla?", o: ["Porque no rebota luz", "Porque refleja mucho rojo y mucho verde", "Porque es muy pequeño"], c: 1, e: "Por eso hay que comparar los tres números." },
      { p: "¿Para qué sirvió la cajita oscura con LED?", o: ["Para que se vea bonita", "Para guardar dulces", "Para que la luz siempre sea la misma y no cambien los números"], c: 2, e: "Así la luz del sol no confunde al sensor." },
    ],
    palabras: [
      ["Reflejar", "Cuando la luz rebota en algo."],
      ["Calibrar", "Ajustar un sensor midiendo algo conocido, como una hoja blanca."],
      ["Clasificar", "Separar cosas en grupos según algo que tienen en común."],
    ],
  },

  {
    id: "edith_mp3", area: "comunicacion", icono: "🎧", tipo: "ficcion", tema: "Audio MP3", minutos: 5,
    titulo: "Edith y el museo que hablaba",
    resumen: "La escuela arma un museo de dinosaurios. Edith quiere que cada fósil cuente su historia cuando alguien se acerca.",
    relacion: "Reproductor MP3 DFPlayer y sensor ultrasónico",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Para la feria de ciencias, el grupo de <b>Edith</b> arma un museo de dinosaurios con figuras de barro y huesos de yeso. Cada mesa tiene una tarjeta con datos, pero casi nadie se detiene a leerlas.",
          "«¿Y si los dinosaurios hablaran?», propone Edith. Consigue un <b>DFPlayer</b>, un reproductor de MP3 chiquito, una bocina y una memoria microSD.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Edith graba con el celular la voz de cada compañero explicando un dinosaurio, y pasa los audios a la memoria.",
        ],
        pregunta: "¿Cómo le conviene nombrar los archivos para que la placa sepa cuál tocar?",
        opciones: [
          { t: "Con números: 0001.mp3, 0002.mp3, 0003.mp3…", ir: "c" },
          { t: "Con nombres: tiranosaurio.mp3, triceratops.mp3…", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Al DFPlayer no se le dice el nombre del archivo: se le pide <b>«toca la pista 1, la pista 2»</b>. Si los archivos no empiezan con número, no sabrá cuál es cuál.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Edith renombra: <b>0001.mp3</b> es el tiranosaurio, <b>0002.mp3</b> el triceratops, y así. Con el bloque de reproducir pista, la placa toca el que le pide.",
          "Ahora falta que el dinosaurio hable <b>solo</b> cuando alguien se acerca.",
        ],
        pregunta: "¿Qué sensor usarías?",
        opciones: [
          { t: "El ultrasónico: si alguien está a menos de 60 cm, toca el audio", ir: "d" },
          { t: "Un sensor de temperatura", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "La temperatura del salón casi no cambia cuando alguien se acerca. Necesitamos medir la <b>distancia</b>.",
        ],
        sig: "c",
      },
      d: {
        fin: true,
        texto: [
          "Edith pone un sensor ultrasónico en cada mesa. Pero el primer día, el tiranosaurio repite «¡Hola, soy el tiranosaurio!» una y otra vez mientras el visitante sigue ahí parado.",
          "Lo arregla con una variable <b>ya_hable</b>: el audio solo se toca cuando alguien <b>llega</b>, y se vuelve a poder tocar cuando se va. ¡El museo fue lo más visitado de la feria!",
        ],
        dato: "Muchos museos de verdad tienen audioguías que se activan al acercarte a una pieza: funcionan con sensores o con tarjetas, igual que este.",
      },
    },
    preguntas: [
      { p: "¿Para qué sirve el DFPlayer?", o: ["Para reproducir archivos MP3 de una memoria", "Para medir la distancia", "Para prender LEDs"], c: 0, e: "Toca audios de una microSD en una bocina." },
      { p: "¿Por qué Edith nombró los archivos con números?", o: ["Porque se ve bonito", "Porque al DFPlayer se le pide la pista por número", "Porque los nombres no caben"], c: 1, e: "La placa pide «la pista 1, la pista 2»." },
      { p: "¿Para qué sirvió la variable ya_hable?", o: ["Para subir el volumen", "Para apagar la placa", "Para que el audio no se repita mientras el visitante sigue ahí"], c: 2, e: "Solo se toca al llegar, no todo el tiempo." },
    ],
    palabras: [
      ["MP3", "Tipo de archivo de audio que ocupa poco espacio."],
      ["Pista", "Cada canción o audio guardado, identificado con un número."],
      ["Audioguía", "Grabación que te explica lo que estás viendo en un museo."],
    ],
  },

  {
    id: "vale_presion", area: "sensores", icono: "🌦️", tipo: "ficcion", tema: "Presión del aire", minutos: 5,
    titulo: "Vale y el barómetro del abuelo",
    resumen: "El abuelo de Vale dice que adivina la lluvia con su rodilla. Vale prefiere medirlo con un sensor de presión.",
    relacion: "Sensor de presión BMP280",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "<b>Vale</b> vive en Toluca. Su abuelo Chema siempre dice: «Va a llover, me duele la rodilla». Y muchas veces acierta.",
          "Vale tiene un sensor <b>BMP280</b>, que mide la <b>presión del aire</b>: qué tanto empuja el aire que tenemos encima. «Abuelo, vamos a ver quién adivina mejor la lluvia, ¿tu rodilla o mi sensor?».",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "El sensor marca <b>745 hPa</b>. Vale busca en Internet y lee que la presión normal es de unos <b>1013 hPa</b>. «¡Está bajísima! ¿Va a caer una tormenta?».",
        ],
        pregunta: "¿Por qué crees que la presión sale tan baja en Toluca?",
        opciones: [
          { t: "Porque Toluca está muy alto, y arriba hay menos aire empujando", ir: "c" },
          { t: "Porque el sensor está descompuesto", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "El sensor funciona bien. Los 1013 hPa son a la orilla del <b>mar</b>. Toluca está a más de 2 600 metros de altura: entre más alto, menos aire hay encima de ti, y menos empuja.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Exacto! Por eso en la montaña la presión siempre es más baja. Entonces, ¿cómo se adivina la lluvia?",
        ],
        pregunta: "¿Qué debería vigilar Vale?",
        opciones: [
          { t: "Si la presión baja varias unidades en pocas horas", ir: "d" },
          { t: "Si la presión es menor que 1013", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "En Toluca <b>siempre</b> es menor que 1013, ¡diría que llueve todos los días! Lo que importa no es el número, sino si <b>está cambiando</b>.",
        ],
        sig: "c",
      },
      d: {
        fin: true,
        texto: [
          "Vale guarda la presión cada hora en una variable y la compara con la de 3 horas antes. Si bajó más de 2 hPa, la pantalla muestra una nube con gotas: <b>«Posible lluvia»</b>.",
          "Durante un mes anotan quién acierta. Empatan: la rodilla del abuelo y el sensor aciertan casi igual. «Es que mi rodilla también siente la presión», dice el abuelo, y los dos se ríen.",
        ],
        dato: "Cuando la presión baja rápido suele acercarse mal tiempo; cuando sube, suele despejarse. Los barómetros se usan desde el siglo XVII para pronosticar el clima.",
      },
    },
    preguntas: [
      { p: "¿Por qué la presión es más baja en Toluca que en Veracruz?", o: ["Porque Toluca está más alto y hay menos aire encima", "Porque hace más frío", "Porque llueve más"], c: 0, e: "Entre más altura, menos presión." },
      { p: "¿Qué indica que puede llover?", o: ["Que la presión sea alta", "Que la presión baje varias unidades en pocas horas", "Que el sensor se caliente"], c: 1, e: "Lo importante es el cambio, no el número." },
      { p: "¿En qué unidad se mide la presión en el cuento?", o: ["Grados", "Centímetros", "Hectopascales (hPa)"], c: 2, e: "La presión normal al nivel del mar es de unos 1013 hPa." },
    ],
    palabras: [
      ["Presión atmosférica", "Lo que empuja el aire que está encima de nosotros."],
      ["Barómetro", "Aparato que mide la presión del aire."],
      ["Pronóstico", "Lo que se espera que pase, por ejemplo con el clima."],
    ],
  },

  {
    id: "neomi_dado", area: "sensores", icono: "🎲", tipo: "ficcion", tema: "Acelerómetro", minutos: 4,
    titulo: "El dado que se agitaba",
    resumen: "En el juego de mesa del recreo, el dado siempre se cae debajo del pupitre. Neomi inventa uno que nunca se pierde.",
    relacion: "MPU6050 y números al azar",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "En el recreo, <b>Neomi</b> y sus amigas juegan serpientes y escaleras. Pero el dado es chiquito y siempre se cae debajo de un pupitre: pierden más tiempo buscándolo que jugando.",
          "Neomi tiene una idea: un dado electrónico. Una caja con su placa, una pantalla y un sensor <b>MPU6050</b>, que detecta movimiento.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Quiere que el dado se «tire» cuando agitas la caja, como uno de verdad. El MPU6050 mide la <b>aceleración</b>: quieto marca más o menos 1 (es la gravedad), y al agitarlo los números brincan mucho.",
        ],
        pregunta: "¿Qué condición usaría para saber que la están agitando?",
        opciones: [
          { t: "Si la aceleración pasa de 2, es que la están sacudiendo", ir: "c" },
          { t: "Si la aceleración es exactamente 1", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "¡Pero quieta la caja también marca 1! El dado se tiraría todo el tiempo aunque nadie lo moviera. Agitar hace que la aceleración <b>suba mucho</b>.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Neomi programa: si la aceleración pasa de 2, elegir un <b>número al azar del 1 al 6</b> y mostrarlo en la pantalla.",
          "Pero al agitarla, la pantalla cambia de número muchísimas veces, porque cada sacudida cuenta como una tirada nueva.",
        ],
        pregunta: "¿Cómo lo arreglaría?",
        opciones: [
          { t: "Esperar a que la caja se quede quieta y entonces mostrar el número final", ir: "d" },
          { t: "Agitarla más despacio", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "Cada quien agita a su manera: no se puede pedir que todos lo hagan igual. Es mejor que el programa espere a que <b>termine</b> la sacudida.",
        ],
        sig: "c",
      },
      d: {
        fin: true,
        texto: [
          "Mientras la caja se mueve, la pantalla muestra números cambiando rapidísimo, como si el dado rodara. Cuando se queda quieta, se detiene en el número final y suena un <i>¡tin!</i>.",
          "Ahora el dado nunca se pierde y además se ve muy padre. Las de otro salón ya le pidieron a Neomi que les haga uno igual.",
        ],
        dato: "Los celulares usan un acelerómetro parecido para saber si los volteaste, contar tus pasos o detectar que los agitaste.",
      },
    },
    preguntas: [
      { p: "¿Qué marca el acelerómetro cuando la caja está quieta?", o: ["Más o menos 1, por la gravedad", "0 siempre", "6"], c: 0, e: "La gravedad siempre jala hacia abajo." },
      { p: "¿Cómo supo el programa que estaban agitando la caja?", o: ["Porque se calentó", "Porque la aceleración pasó de 2", "Porque sonó"], c: 1, e: "Agitar hace que la aceleración suba mucho." },
      { p: "¿Por qué esperó a que la caja se quedara quieta?", o: ["Para ahorrar pila", "Para que sonara más fuerte", "Para mostrar un solo número final y no muchos"], c: 2, e: "Cada sacudida contaba como una tirada nueva." },
    ],
    palabras: [
      ["Acelerómetro", "Sensor que mide qué tanto cambia el movimiento de algo."],
      ["Gravedad", "Fuerza que jala todo hacia el suelo."],
      ["Al azar", "Sin un orden que se pueda adivinar."],
    ],
  },

  {
    id: "edith_huella", area: "sensores", icono: "🔏", tipo: "ficcion", tema: "Sensor de huella", minutos: 5,
    titulo: "El casillero de Edith",
    resumen: "Alguien abre el casillero del laboratorio y desordena los proyectos. Edith le pone una cerradura que reconoce huellas.",
    relacion: "Sensor de huella FPM383C",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "En el laboratorio hay un casillero donde el club de robótica guarda sus proyectos. Tiene un candado con llave, pero la llave se presta, se pierde, se copia... y una mañana encuentran todo revuelto.",
          "<b>Edith</b>, que es la encargada del club, propone: «Pongámosle una cerradura con <b>huella digital</b>, como la de algunos celulares».",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Edith consigue un sensor de huella <b>FPM383C</b>. Antes de que el casillero reconozca a alguien, hay que <b>registrar</b> su huella.",
        ],
        pregunta: "¿Cómo crees que conviene registrar cada huella?",
        opciones: [
          { t: "Poner el mismo dedo varias veces, un poco movido cada vez", ir: "c" },
          { t: "Ponerlo una sola vez, rapidito", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Con una sola lectura, el sensor solo conoce un pedacito del dedo. Si al día siguiente lo pones un poco chueco, ya no lo reconoce. Por eso se registra <b>varias veces</b>.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Cada integrante del club pone su dedo seis veces. El sensor no guarda una foto: guarda una especie de <b>mapa</b> de las líneas y las bifurcaciones de la huella, con un número para cada persona.",
          "Edith programa: si el sensor reconoce la huella, el servo abre el pestillo por 5 segundos y luego lo vuelve a cerrar.",
        ],
        dato: "No hay dos huellas iguales en el mundo, ni siquiera las de los gemelos idénticos. Y se forman antes de nacer.",
        sig: "d",
      },
      d: {
        texto: [
          "Pablo, que no es del club, intenta abrir con su dedo. El sensor no lo reconoce.",
        ],
        pregunta: "¿Qué debería pasar además de no abrir?",
        opciones: [
          { t: "Anotar en la memoria la hora del intento y prender un LED rojo", ir: "e" },
          { t: "Abrir después de 3 intentos para no molestar", ir: "d1" },
        ],
      },
      d1: {
        error: true,
        texto: [
          "¡Entonces cualquiera abriría con solo intentarlo tres veces! Una cerradura nunca debe abrirse por insistir: al contrario, debe <b>avisar</b> que alguien lo está intentando.",
        ],
        sig: "d",
      },
      e: {
        fin: true,
        texto: [
          "Edith agrega que cada intento fallido quede anotado con la hora del reloj RTC. Una semana después, el registro muestra varios intentos a las 3 de la tarde... justo cuando el grupo de la tarde usa el laboratorio.",
          "Lo platican con la maestra, y el misterio se resuelve sin pleitos. Desde entonces, el casillero solo se abre para quien debe, y los proyectos están a salvo.",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué se registra el mismo dedo varias veces?", o: ["Para que el sensor conozca bien la huella aunque pongas el dedo un poco movido", "Para gastar menos pila", "Porque el sensor es lento"], c: 0, e: "Así reconoce el dedo desde distintos ángulos." },
      { p: "¿Qué guarda el sensor de cada huella?", o: ["Una foto a color", "Un mapa de sus líneas con un número para cada persona", "El nombre escrito"], c: 1, e: "No guarda una foto, sino los rasgos de la huella." },
      { p: "¿Qué hace la cerradura con una huella desconocida?", o: ["Abre después de 3 intentos", "Se apaga", "No abre, prende un LED rojo y anota la hora del intento"], c: 2, e: "Una cerradura no debe abrirse por insistir." },
    ],
    palabras: [
      ["Huella digital", "Las líneas de la piel de la yema de los dedos; cada persona tiene las suyas."],
      ["Registrar", "Guardar los datos de alguien para reconocerlo después."],
      ["Registro", "Lista donde se anota lo que pasa y a qué hora."],
    ],
  },

  {
    id: "vale_perilla", area: "sensores", icono: "📻", tipo: "ficcion", tema: "Encoder rotatorio", minutos: 4,
    titulo: "La perilla que nunca se acababa",
    resumen: "En la tiendita de su tía, Vale arma una bocina con una perilla para el volumen. Pero su perilla gira y gira sin tope.",
    relacion: "Encoder rotatorio KY-040",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "La tía Mari de <b>Vale</b> tiene una tiendita y siempre pone música. Vale le arma una bocina con su placa y le quiere poner una <b>perilla</b> para el volumen.",
          "En su caja de módulos encuentra un <b>encoder KY-040</b>. Se parece a una perilla, pero al girarlo no tiene tope: da vueltas y vueltas sin fin.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Vale lee que el encoder no dice «en qué posición está», sino que manda pulsos cada vez que gira un poquito, y por el orden de sus dos señales (CLK y DT) se sabe hacia qué lado giró.",
        ],
        pregunta: "Entonces, ¿cómo guardaría el volumen?",
        opciones: [
          { t: "En una variable: sumarle 1 al girar a la derecha y restarle 1 a la izquierda", ir: "c" },
          { t: "Leyendo el ángulo de la perilla, como un potenciómetro", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "El encoder no tiene ángulo fijo: como gira sin fin, no sabe si está «arriba» o «abajo». Lo que sí avisa es cada <b>paso</b> que da y hacia qué lado.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Vale crea la variable <b>volumen</b>. Cada paso a la derecha suma 1 y a la izquierda resta 1. Funciona... hasta que su primo gira y gira, y el volumen llega a <b>−35</b>.",
        ],
        pregunta: "¿Qué le falta al programa?",
        opciones: [
          { t: "Poner límites: que el volumen no baje de 0 ni suba de 30", ir: "d" },
          { t: "Pedirle al primo que no toque la perilla", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "¡El primo siempre va a tocarla! Un buen programa no depende de que la gente lo use «bien»: tiene que aguantar que alguien gire de más.",
        ],
        sig: "c",
      },
      d: {
        fin: true,
        texto: [
          "Vale agrega dos <b>si</b>: si el volumen es menor que 0, ponerlo en 0; si es mayor que 30, ponerlo en 30. Además, el botón que trae el encoder al apretar la perilla sirve para <b>silenciar</b>.",
          "La tía Mari está encantada: sube y baja la música con una mano mientras despacha con la otra. Y el primo, por más que gire, ya no puede romper nada.",
        ],
        dato: "Las perillas de volumen de muchos estéreos de carro y de las impresoras 3D son encoders: por eso giran sin tope.",
      },
    },
    preguntas: [
      { p: "¿Qué tiene de especial la perilla del encoder?", o: ["Gira sin tope, en las dos direcciones", "Solo gira media vuelta", "No gira"], c: 0, e: "Por eso no tiene un ángulo fijo." },
      { p: "¿Cómo sabe el programa hacia dónde giró?", o: ["Por el color", "Por el orden de sus dos señales, CLK y DT", "Por el sonido"], c: 1, e: "El orden de los pulsos indica la dirección." },
      { p: "¿Para qué sirvieron los límites de 0 y 30?", o: ["Para que suene más fuerte", "Para ahorrar pila", "Para que el volumen no se salga de un rango que tenga sentido"], c: 2, e: "Así nadie puede poner −35 o 500." },
    ],
    palabras: [
      ["Encoder", "Sensor que cuenta los pasos que gira un eje y hacia qué lado."],
      ["Pulso", "Señal muy corta que dice «pasó algo»."],
      ["Límite", "Valor que algo no puede pasar, ni hacia arriba ni hacia abajo."],
    ],
  },

  {
    id: "cuatro_espnow", area: "comunicacion", icono: "📡", tipo: "ficcion", tema: "ESP-NOW entre placas", minutos: 5,
    titulo: "Las cuatro y el mensaje sin Internet",
    resumen: "Miriam, Neomi, Edith y Vale quieren mandarse mensajes de un salón a otro, pero en la escuela no hay WiFi. ¿Se puede?",
    relacion: "ESP-NOW (comunicación entre placas)",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "<b>Miriam</b>, <b>Neomi</b>, <b>Edith</b> y <b>Vale</b> organizan la búsqueda del tesoro de la escuela. Cada una cuida una estación en un salón distinto, y necesitan avisarse cuando un equipo pasa por la suya.",
          "El problema: en la escuela casi no hay señal de celular y el WiFi solo funciona en la dirección.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Miriam recuerda algo del taller: las placas ESP32 pueden hablarse directamente con <b>ESP-NOW</b>, sin router y sin Internet.",
        ],
        pregunta: "¿Qué necesita saber cada placa para mandarle un mensaje a otra?",
        opciones: [
          { t: "La dirección MAC de la otra placa", ir: "c" },
          { t: "La contraseña del WiFi de la escuela", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "ESP-NOW no usa el WiFi de la escuela. Las placas se hablan entre ellas, y cada una se reconoce por su <b>dirección MAC</b>: un número único que trae de fábrica.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Cada una imprime en el monitor serial la MAC de su placa, y Edith las anota en el pizarrón. Vale programa: al presionar un botón, mandar «Equipo azul pasó por la estación 2» a las demás.",
          "La primera prueba falla: el mensaje no llega del salón de Neomi, al fondo del pasillo, detrás de tres paredes.",
        ],
        pregunta: "¿Qué podrían hacer?",
        opciones: [
          { t: "Que la placa de en medio reciba el mensaje y lo vuelva a mandar a la siguiente", ir: "d" },
          { t: "Gritar más fuerte", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "Neomi grita y nadie la oye desde la cuarta estación. Pero sí la oye Edith, que está a la mitad... ¿y si las placas hicieran lo mismo: pasar el mensaje como en un <b>teléfono descompuesto</b>, pero sin descomponerlo?",
        ],
        sig: "c",
      },
      d: {
        fin: true,
        texto: [
          "Edith programa su placa para que, al recibir un mensaje, lo <b>reenvíe</b> a la siguiente. Así el aviso viaja de estación en estación hasta llegar a todas.",
          "La búsqueda del tesoro es un éxito: cada estación sabe en tiempo real por dónde va cada equipo. Al final, las cuatro se toman una foto con sus placas. «Somos la primera red de la escuela», dice Vale.",
        ],
        dato: "Pasar un mensaje de aparato en aparato hasta llegar lejos se llama red en malla. Así funcionan algunos sensores de cultivos y los focos inteligentes de una casa grande.",
      },
    },
    preguntas: [
      { p: "¿Qué necesita ESP-NOW para mandar mensajes?", o: ["La dirección MAC de la otra placa", "Internet", "Un cable entre las placas"], c: 0, e: "No necesita router ni Internet." },
      { p: "¿Por qué no llegaba el mensaje al salón del fondo?", o: ["Porque la placa estaba apagada", "Porque estaba lejos y había varias paredes en medio", "Porque era de noche"], c: 1, e: "Las paredes debilitan las ondas de radio." },
      { p: "¿Cómo resolvieron el problema?", o: ["Comprando un router", "Usando cables largos", "Haciendo que una placa de en medio reenviara el mensaje"], c: 2, e: "Así el aviso viaja de estación en estación." },
    ],
    palabras: [
      ["Dirección MAC", "Número único que identifica a cada aparato en una red."],
      ["Reenviar", "Recibir un mensaje y volver a mandarlo a alguien más."],
      ["Red en malla", "Aparatos que se pasan los mensajes entre sí para llegar más lejos."],
    ],
  }
);
