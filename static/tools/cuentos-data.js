/* Mini cuentos para la lectura (static/tools/cuentos.html).
   Cada cuento tiene escenas; una escena puede tener:
     texto:    párrafos (se permite <b> e <i>)
     dato:     recuadro "¿Sabías que?"
     sig:      escena que sigue (botón "Continuar")
     pregunta + opciones [{ t, ir }]: el lector decide
     error:    true si es la escena de una mala decisión (botón "Intentar otra vez" → sig)
     fin:      true en la última escena
   preguntas: comprensión lectora { p, o: [opciones], c: índice correcto, e: explicación }
   palabras:  [palabra, significado]
   tipo:      "real" (pasó de verdad) o "ficcion" */
const CUENTOS = [
  {
    id: "bicho", icono: "🦋", tipo: "real", tema: "Depurar programas", minutos: 5,
    titulo: "El bicho del relevador 70",
    resumen: "Una computadora gigante empieza a fallar y su equipo, con Grace Hopper, busca el error pieza por pieza.",
    relacion: "Tutorial del relevador",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Universidad de Harvard, Estados Unidos, <b>1947</b>. En un cuarto enorme trabaja la <b>Mark II</b>, una de las primeras computadoras. No tiene pantalla ni ratón: es un muro de gabinetes con miles de <b>relevadores</b> que hacen <i>clic-clac, clic-clac</i> cada vez que la máquina hace una cuenta.",
          "En el equipo está <b>Grace Hopper</b>, una matemática que además es oficial de la Marina. A ella le encanta encontrar por qué las cosas no funcionan.",
        ],
        dato: "Un relevador es un interruptor que se mueve con un electroimán. Es el mismo componente del tutorial del relevador, solo que la Mark II tenía miles.",
        sig: "b",
      },
      b: {
        texto: [
          "El <b>9 de septiembre</b> la Mark II empieza a dar resultados equivocados. Las cuentas que ayer salían bien hoy salen mal, y nadie ha cambiado el programa.",
        ],
        pregunta: "Si fueras parte del equipo, ¿qué harías primero?",
        opciones: [
          { t: "Revisar la máquina por partes hasta encontrar dónde está la falla", ir: "c" },
          { t: "Apagarla y prenderla muchas veces hasta que se arregle sola", ir: "b1" },
          { t: "Borrar el programa y escribirlo todo otra vez", ir: "b2" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "La apagan, la prenden... y vuelve a fallar en el mismo lugar. Reiniciar a veces ayuda, pero si algo está <b>atorado de verdad</b>, el problema regresa.",
        ],
        sig: "b",
      },
      b2: {
        error: true,
        texto: [
          "Pasan horas escribiendo el programa otra vez, y la máquina falla igual. El programa estaba bien: el problema no estaba en las instrucciones, sino <b>dentro de la máquina</b>.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "El equipo prueba un panel, luego otro, y otro más. En el <b>panel F</b> descubren que el <b>relevador número 70</b> no cierra bien: algo impide que sus contactos se toquen.",
          "Con unas pinzas, alguien saca con cuidado al culpable: <b>¡una polilla!</b> Se había metido entre los contactos y el relevador ya no hacía clic.",
        ],
        sig: "d",
      },
      d: {
        texto: [
          "El equipo pega la polilla con cinta en la <b>bitácora</b>, el cuaderno donde anotaban todo lo que pasaba con la máquina, y escribe en inglés: <i>«First actual case of bug being found»</i>, que quiere decir <i>«primer caso real de un bicho encontrado»</i>.",
        ],
        dato: "Los ingenieros ya le decían «bug» (bicho) a las fallas desde antes; Thomas Edison usaba la palabra. La polilla de la Mark II hizo famosa la historia, y esa hoja de la bitácora se guarda hoy en un museo, el Smithsonian.",
        sig: "e",
      },
      e: {
        fin: true,
        texto: [
          "Desde entonces, buscar y quitar errores en un programa se llama <b>depurar</b> (en inglés, <i>debug</i>: «quitar bichos»).",
          "Grace Hopper siguió inventando: creó uno de los primeros <b>compiladores</b>, programas que traducen instrucciones fáciles de leer al idioma de la máquina, y ayudó a crear el lenguaje <b>COBOL</b>.",
          "La próxima vez que tu programa no haga lo que esperas, haz lo mismo que su equipo: no te desesperes y <b>revisa por partes</b> hasta encontrar a tu «bicho».",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué piezas hacían «clic-clac» dentro de la Mark II?", o: ["Relevadores", "Pantallas", "Baterías"], c: 0, e: "La Mark II hacía sus cuentas con miles de relevadores." },
      { p: "¿Por qué no sirvió escribir el programa otra vez?", o: ["Porque lo escribieron más lento", "Porque la falla estaba dentro de la máquina y no en el programa", "Porque la computadora no tenía teclado"], c: 1, e: "El programa estaba bien: la polilla atorada en un relevador causaba el error." },
      { p: "¿Qué quiere decir «depurar» un programa?", o: ["Hacerlo más largo", "Borrarlo", "Buscar y corregir sus errores"], c: 2, e: "Depurar es encontrar y quitar los errores, o «bichos»." },
    ],
    palabras: [
      ["Relevador", "Interruptor que se abre o se cierra con un electroimán."],
      ["Bitácora", "Cuaderno donde se anota lo que pasa día a día."],
      ["Depurar", "Buscar y corregir los errores de un programa."],
    ],
  },

  {
    id: "ada", icono: "⚙️", tipo: "real", tema: "Algoritmos y ciclos", minutos: 5,
    titulo: "Ada y la máquina que nunca se construyó",
    resumen: "En 1843, antes de que existieran las computadoras, una joven escribió un programa para una máquina de engranes.",
    relacion: "Bloques de repetir",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Londres, <b>1833</b>. <b>Ada Lovelace</b> tiene 17 años y le fascinan las matemáticas. En una fiesta conoce al inventor <b>Charles Babbage</b>, que le muestra una parte de su máquina de calcular: un montón de engranes de metal que hacen sumas al girar una manivela.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Babbage sueña con algo más grande: la <b>Máquina Analítica</b>. Tendría un «almacén» para guardar números (lo que hoy llamamos <b>memoria</b>) y un «molino» para hacer las cuentas (lo que hoy es el <b>procesador</b>).",
          "Para decirle qué hacer usaría <b>tarjetas perforadas</b>, como las que ya usaban los telares para tejer dibujos en la tela.",
        ],
        dato: "El telar de Jacquard, inventado en Francia alrededor de 1804, leía tarjetas con agujeros: cada agujero decía qué hilo levantar. ¡Era una especie de programa para tejer!",
        sig: "c",
      },
      c: {
        texto: [
          "Años después, Ada traduce un artículo sobre la máquina y le agrega sus propias <b>notas</b>, que terminan siendo tres veces más largas que el artículo.",
          "En la última nota, la <b>Nota G</b>, quiere que la máquina calcule unos números muy difíciles, los <b>números de Bernoulli</b>. Para eso hay que hacer las mismas cuentas muchas, muchas veces.",
        ],
        pregunta: "¿Cuál es la forma más inteligente de decírselo a la máquina?",
        opciones: [
          { t: "Escribir cada cuenta una por una, aunque se necesiten miles de tarjetas", ir: "c1" },
          { t: "Escribir el grupo de cuentas una vez y decirle que lo repita", ir: "d" },
          { t: "Dejar que la máquina adivine qué cuentas hacer", ir: "c2" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "Funcionaría, pero serían miles de tarjetas y un solo error en cualquiera arruinaría todo. Si las cuentas se repiten, debe haber una forma más corta...",
        ],
        sig: "c",
      },
      c2: {
        error: true,
        texto: [
          "Las máquinas no adivinan: hacen <b>exactamente</b> lo que les dicen, paso por paso. Por eso alguien tiene que escribir las instrucciones.",
        ],
        sig: "c",
      },
      d: {
        texto: [
          "¡Eso fue lo que hizo Ada! Describió cómo usar el mismo grupo de instrucciones <b>una y otra vez</b>. Hoy a eso le llamamos un <b>ciclo</b>, como el bloque <b>repetir</b> que usas en 3DPit Blocks.",
          "Su plan, paso por paso, para resolver el problema es un <b>algoritmo</b>. Se publicó en <b>1843</b> y hoy se considera uno de los primeros programas de la historia.",
        ],
        sig: "e",
      },
      e: {
        fin: true,
        texto: [
          "Ada imaginó algo que ni Babbage había pensado: que una máquina así podría trabajar no solo con números, sino con cualquier símbolo, e incluso <b>componer música</b>.",
          "La Máquina Analítica nunca se terminó: era carísima y difícil de fabricar. Pero las ideas de Ada sí llegaron al futuro: un lenguaje de programación se llama <b>Ada</b> en su honor, y cada año, el segundo martes de octubre, se celebra el <b>Día de Ada Lovelace</b>.",
        ],
        dato: "Ada escribió su programa para una máquina que no existía. Hoy tú puedes probar los tuyos al instante en la placa ESP32.",
      },
    },
    preguntas: [
      { p: "¿De dónde tomó Babbage la idea de las tarjetas perforadas?", o: ["De los telares para tejer", "De los relojes", "De los trenes"], c: 0, e: "Los telares de Jacquard ya usaban tarjetas con agujeros para hacer dibujos en la tela." },
      { p: "¿Qué es un ciclo en programación?", o: ["Un error de la máquina", "Repetir un grupo de instrucciones varias veces", "Apagar la computadora"], c: 1, e: "Un ciclo repite instrucciones, como el bloque «repetir»." },
      { p: "¿Qué imaginó Ada que podría hacer una máquina así?", o: ["Volar", "Solo sumar", "Trabajar con símbolos y hasta componer música"], c: 2, e: "Ada pensó que la máquina podría ir más allá de los números." },
    ],
    palabras: [
      ["Algoritmo", "Lista de pasos ordenados para resolver un problema."],
      ["Ciclo", "Instrucciones que se repiten varias veces."],
      ["Tarjeta perforada", "Tarjeta con agujeros que guarda instrucciones o datos."],
    ],
  },

  {
    id: "viento", icono: "🌬️", tipo: "real", tema: "Energía y generadores", minutos: 6,
    titulo: "El niño que atrapó el viento",
    resumen: "Sin dinero y sin escuela, un niño de Malawi construye un molino con chatarra para darle luz a su casa.",
    relacion: "Motores DC (un motor también puede generar)",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Malawi, un país de África, años <b>2001 y 2002</b>. Una sequía terrible deja sin cosechas a muchas familias. <b>William Kamkwamba</b> tiene 14 años y tiene que dejar la escuela porque su familia ya no puede pagarla.",
          "Pero William no deja de aprender. Va a una pequeña <b>biblioteca</b> de su pueblo y lee todo lo que puede.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Un día encuentra un libro llamado <i>Using Energy</i> («Usar la energía»). En la portada hay <b>molinos de viento</b>. William lee que el viento puede hacer girar unas aspas y que ese giro puede convertirse en <b>electricidad</b>.",
          "En su casa no hay luz eléctrica: de noche usan lámparas de queroseno que echan humo. «¿Y si yo construyo un molino?», piensa.",
        ],
        sig: "c",
      },
      c: {
        texto: [
          "Las aspas pueden girar con el viento, pero un giro no prende un foco por sí solo. William necesita una pieza que convierta el <b>movimiento</b> en <b>electricidad</b>.",
        ],
        pregunta: "¿Qué pieza le sirve para eso?",
        opciones: [
          { t: "El dinamo de una bicicleta, el que prende su faro al pedalear", ir: "d" },
          { t: "Una pila", ir: "c1" },
          { t: "Un foco más grande", ir: "c2" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "Una pila <b>guarda</b> energía, pero no la produce a partir del giro. Cuando se gasta, hay que comprar otra... y William no tiene dinero.",
        ],
        sig: "c",
      },
      c2: {
        error: true,
        texto: [
          "El foco <b>usa</b> la electricidad, pero no la produce. Primero hay que generarla.",
        ],
        sig: "c",
      },
      d: {
        texto: [
          "¡Exacto! Un <b>dinamo</b> es un pequeño <b>generador</b>: cuando su eje gira, produce electricidad. William busca en un tiradero de chatarra y junta piezas: el cuadro de una bicicleta vieja, el ventilador de un tractor y tubos de plástico que calienta y aplana para hacer las aspas.",
          "Con troncos de eucalipto arma una torre de varios metros.",
        ],
        dato: "Un motor DC, como los del carrito del tutorial, también funciona al revés: si giras su eje con la mano, genera un poco de voltaje. Motores y generadores son casi la misma máquina.",
        sig: "e",
      },
      e: {
        texto: [
          "Algunos vecinos se burlan: «¡Está loco, anda jugando con basura!». William sube el molino a la torre, el viento sopla, las aspas giran... y <b>el foco se enciende</b>.",
          "La gente que se reía ahora hace fila para cargar sus teléfonos en su casa.",
        ],
        sig: "f",
      },
      f: {
        fin: true,
        texto: [
          "Después William construyó más molinos, uno para <b>bombear agua</b> y regar los cultivos. Gracias a su invento consiguió ayuda para volver a la escuela y más tarde estudió en una universidad de Estados Unidos.",
          "Su historia se contó en el libro <i>El niño que domó el viento</i> y en una película. Lo que William demostró es que con curiosidad, un libro y muchas ganas, se puede cambiar el mundo, aunque sea con piezas de chatarra.",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué pieza convierte el giro de las aspas en electricidad?", o: ["La pila", "El dinamo o generador", "El foco"], c: 1, e: "El dinamo es un generador: al girar produce electricidad." },
      { p: "¿Dónde aprendió William cómo funcionan los molinos?", o: ["En un libro de la biblioteca", "En la televisión", "En la escuela"], c: 0, e: "Ya no iba a la escuela: aprendió leyendo un libro en la biblioteca de su pueblo." },
      { p: "¿Qué otro uso le dio a la energía del viento?", o: ["Hacer helados", "Volar un avión", "Bombear agua para los cultivos"], c: 2, e: "Construyó otro molino para bombear agua y regar." },
    ],
    palabras: [
      ["Generador", "Máquina que convierte movimiento en electricidad."],
      ["Sequía", "Tiempo largo sin lluvia."],
      ["Aspas", "Las «paletas» que el viento hace girar en un molino."],
    ],
  },

  {
    id: "semaforo", icono: "🚦", tipo: "ficcion", tema: "Secuencias y tiempos", minutos: 4,
    titulo: "Pit y el semáforo despistado",
    resumen: "Los coches de juguete chocan en la maqueta de la escuela. El robot Pit tiene que descubrir qué le pasa al semáforo.",
    relacion: "Tutorial del semáforo",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "En el laboratorio de la escuela hay una ciudad de cartón con calles, casas y un <b>semáforo</b> hecho con un módulo de tres luces y una placa ESP32. Los alumnos de 2.º B lo programaron ayer.",
          "Pero hoy algo anda mal: los coches de juguete que controla la maqueta <b>chocan</b> en la esquina. <b>Pit</b>, el robot ayudante del laboratorio, enciende sus ojos azules. «Investigaré», dice con su voz de lata.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Pit observa el semáforo: se pone <b>verde</b>... y de pronto, <b>rojo</b>. Los coches que venían no alcanzan a frenar.",
        ],
        pregunta: "¿Qué debería revisar Pit primero?",
        opciones: [
          { t: "Que los cables estén en los pines correctos: rojo al 18, amarillo al 19 y verde al 23", ir: "c" },
          { t: "Cambiar el semáforo por uno nuevo", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Pit pone un semáforo nuevo... y pasa exactamente lo mismo. «Cambiar piezas sin saber cuál es la falla no la arregla», piensa. «Mejor reviso paso a paso».",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Los cables están bien. El amarillo hasta se prende si Pit lo prueba solo. Entonces Pit lee el programa:",
          "<b>repetir para siempre:</b><br>· encender verde · esperar 3 segundos<br>· encender rojo · esperar 3 segundos",
          "«¡Ajá!», dice Pit. «Al programa le falta un paso».",
        ],
        pregunta: "¿Dónde va el amarillo?",
        opciones: [
          { t: "Entre el verde y el rojo, para avisar que viene el alto", ir: "d" },
          { t: "Después del rojo, antes de volver al verde", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "Pit lo prueba así: verde, rojo, amarillo... ¡y los coches siguen chocando! El amarillo sirve para <b>avisar</b> que va a cambiar a rojo, así que tiene que ir <b>antes</b> del rojo.",
        ],
        sig: "c",
      },
      d: {
        texto: [
          "Pit agrega <b>encender amarillo</b> entre el verde y el rojo. Prueba... pero el amarillo apenas parpadea y casi no se ve.",
          "«Claro», dice Pit. «Le dije que encendiera el amarillo, pero no cuánto tiempo». Agrega <b>esperar 1 segundo</b> después del amarillo.",
        ],
        dato: "La placa ejecuta millones de instrucciones por segundo. Sin un bloque «esperar», un cambio de luz pasa tan rápido que tus ojos no lo ven.",
        sig: "e",
      },
      e: {
        fin: true,
        texto: [
          "Ahora el semáforo hace verde, amarillo, rojo... y los coches de juguete frenan a tiempo. Los alumnos de 2.º B aplauden.",
          "Pit guarda una nota en su memoria: <b>«Las computadoras hacen exactamente lo que les dices, en el orden en que se lo dices. No lo que quisiste decir»</b>.",
        ],
      },
    },
    preguntas: [
      { p: "¿Cuál es el orden correcto del semáforo?", o: ["Verde, rojo, amarillo", "Verde, amarillo, rojo", "Rojo, rojo, verde"], c: 1, e: "El amarillo avisa que viene el rojo, así que va entre los dos." },
      { p: "¿Por qué el amarillo casi no se veía al principio?", o: ["Porque estaba fundido", "Porque faltaba el bloque «esperar» después de encenderlo", "Porque era de día"], c: 1, e: "Sin una espera, la luz cambia demasiado rápido." },
      { p: "¿Qué hizo bien Pit antes de cambiar el programa?", o: ["Revisó paso a paso: primero los cables y luego el programa", "Compró piezas nuevas", "Apagó la maqueta para siempre"], c: 0, e: "Revisar por partes ayuda a encontrar la falla de verdad." },
    ],
    palabras: [
      ["Secuencia", "Pasos que se hacen uno después de otro, en orden."],
      ["Programa", "Instrucciones que le dicen a la placa qué hacer."],
    ],
  },

  {
    id: "planta", icono: "🌱", tipo: "ficcion", tema: "Sensores analógicos", minutos: 5,
    titulo: "La planta que aprendió a pedir agua",
    resumen: "Valeria quiere que la planta de su abuela avise cuando tiene sed. ¿Qué sensor usará?",
    relacion: "Sensores analógicos y la perilla",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "La abuela Rosa tiene una <b>albahaca</b> en la ventana de la cocina. La quiere mucho, pero a veces se le olvida regarla y las hojas se ponen tristes y caídas.",
          "Su nieta <b>Valeria</b>, que está aprendiendo a programar su placa ESP32, tiene una idea: «¿Y si la planta pudiera <b>avisar</b> cuando tiene sed?».",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Valeria revisa su caja de módulos. Necesita algo que le diga a la placa qué tan <b>húmeda</b> está la tierra.",
        ],
        pregunta: "¿Qué módulo debería usar?",
        opciones: [
          { t: "Un sensor de humedad de suelo, que se entierra en la maceta", ir: "c" },
          { t: "Un botón", ir: "b1" },
          { t: "El sensor ultrasónico", ir: "b2" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Un botón solo sabe si alguien lo presiona. Para que avisara, la abuela tendría que acordarse de presionarlo... ¡y ese era justo el problema!",
        ],
        sig: "b",
      },
      b2: {
        error: true,
        texto: [
          "El sensor ultrasónico mide <b>distancias</b>, como la de tu mano a la mesa. No sabe nada del agua de la tierra.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Valeria entierra el sensor y lo conecta a un pin <b>analógico</b> de la placa. A diferencia de un botón, que solo dice «sí» o «no», un sensor analógico da un <b>número</b> que puede subir o bajar poco a poco, igual que la perilla de los tutoriales.",
          "Hace pruebas y anota: con la tierra <b>seca</b> el sensor marca alrededor de <b>3000</b>, y recién regada, alrededor de <b>1200</b>.",
        ],
        dato: "La placa convierte el voltaje del sensor en un número con su ADC (convertidor analógico-digital). En el ESP32 ese número va de 0 a 4095, o de 0 a 1023 si eliges 10 bits.",
        sig: "d",
      },
      d: {
        texto: [
          "Ahora falta decidir <b>cuándo</b> debe avisar la planta. Valeria quiere que se prenda un LED rojo y suene el buzzer.",
        ],
        pregunta: "¿Qué condición usaría en el bloque «si»?",
        opciones: [
          { t: "Si la lectura es mayor que 2500, avisar", ir: "e" },
          { t: "Si la lectura es exactamente igual a 2500, avisar", ir: "d1" },
        ],
      },
      d1: {
        error: true,
        texto: [
          "Valeria lo prueba y casi nunca avisa. Las lecturas cambian un poquito todo el tiempo: 2496, 2511, 2503... Es muy raro que salga justo 2500. Es mejor usar <b>mayor que</b>.",
        ],
        sig: "d",
      },
      e: {
        fin: true,
        texto: [
          "Valeria programa: <b>si</b> la lectura es <b>mayor que 2500</b>, encender el LED rojo y sonar el buzzer; <b>si no</b>, apagarlos. A ese número que separa «tiene sed» de «está bien» se le llama <b>umbral</b>.",
          "A los tres días, el LED se enciende y el buzzer suena: <i>pip, pip</i>. La abuela Rosa riega su albahaca y sonríe: «Ahora mi planta tiene voz».",
        ],
        dato: "Así funcionan los sistemas de riego inteligente de los invernaderos: miden la humedad y riegan solo cuando hace falta, para ahorrar agua.",
      },
    },
    preguntas: [
      { p: "¿En qué se diferencia un sensor analógico de un botón?", o: ["El analógico da un número que cambia poco a poco; el botón solo sí o no", "No hay diferencia", "El botón mide la humedad"], c: 0, e: "Un sensor analógico da muchos valores posibles; un botón, solo dos." },
      { p: "¿Por qué no conviene usar «igual a 2500»?", o: ["Porque 2500 es muy grande", "Porque la lectura cambia un poco siempre y casi nunca sale exacta", "Porque la placa no sabe comparar"], c: 1, e: "Las lecturas reales varían: «mayor que» funciona aunque no salga el número exacto." },
      { p: "¿Qué es el umbral en esta historia?", o: ["El nombre de la planta", "El cable del buzzer", "El número que separa «tiene sed» de «está bien»"], c: 2, e: "El umbral (2500) decide cuándo avisar." },
    ],
    palabras: [
      ["Analógico", "Que puede tener muchos valores, no solo encendido o apagado."],
      ["Umbral", "Valor límite que hace que algo cambie o se active."],
      ["Humedad", "Cantidad de agua que hay en algo, como la tierra o el aire."],
    ],
  },

  {
    id: "marte", icono: "🚙", tipo: "real", tema: "Robots y frecuencias", minutos: 5,
    titulo: "El robot que se cantó «Feliz cumpleaños» en Marte",
    resumen: "Curiosity está tan lejos que nadie puede manejarlo en tiempo real. Al cumplir un año en Marte, hizo algo sorprendente.",
    relacion: "Carrito esquiva obstáculos y buzzer",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "En <b>agosto de 2012</b> el robot <b>Curiosity</b>, de la NASA, aterriza en Marte, en un lugar llamado el cráter Gale. Es del tamaño de un coche, tiene seis ruedas, cámaras, un brazo robótico y hasta un láser para estudiar las rocas.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Marte está tan lejos que un mensaje de radio tarda entre <b>4 y 24 minutos</b> en llegar desde la Tierra, según dónde estén los dos planetas en su órbita.",
          "Un día, Curiosity avanza hacia una zona de rocas filosas.",
        ],
        pregunta: "¿Pueden los ingenieros frenarlo con un control remoto, como un carrito de juguete?",
        opciones: [
          { t: "No: el robot tiene que fijarse por sí mismo con sus sensores y su programa", ir: "c" },
          { t: "Sí, la señal llega al instante", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "La señal viaja muy rápido, a la velocidad de la luz, pero Marte está a millones de kilómetros. Si un ingeniero aprieta «frenar», la orden llega varios minutos después... ¡cuando el robot ya chocó!",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Así es! Desde la Tierra le mandan las instrucciones del día, y Curiosity usa sus <b>cámaras</b> para revisar el terreno y decidir por dónde pasar sin chocar.",
        ],
        dato: "Es la misma idea del carrito esquiva obstáculos del tutorial: el sensor ultrasónico «ve» la pared y el programa decide girar, sin que nadie lo controle.",
        sig: "d",
      },
      d: {
        texto: [
          "El <b>5 de agosto de 2013</b>, Curiosity cumple <b>un año</b> en Marte. Los ingenieros preparan una sorpresa: programan uno de sus instrumentos, llamado SAM, para que <b>vibre</b> a diferentes <b>frecuencias</b>.",
          "Cada frecuencia es una nota musical. Nota tras nota, el robot toca... <b>«Feliz cumpleaños»</b>. ¡Se cantó a sí mismo!",
        ],
        dato: "La frecuencia dice cuántas veces por segundo vibra algo. La nota La vibra 440 veces por segundo (440 Hz). Con el buzzer de 3DPit puedes tocar melodías cambiando la frecuencia.",
        sig: "e",
      },
      e: {
        fin: true,
        texto: [
          "Lo curioso es que nadie la escuchó en Marte: allí no hay personas, y el aire es tan delgado que el sonido casi no viaja. Pero los ingenieros sabían que la canción había sonado, porque el programa se lo dijo.",
          "Curiosity siguió explorando muchos años más, buscando pistas de si Marte tuvo agua y condiciones para la vida. Todo gracias a un programa que alguien escribió con mucho cuidado... igual que los tuyos.",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué no se puede manejar a Curiosity con control remoto en tiempo real?", o: ["Porque no tiene ruedas", "Porque los mensajes tardan minutos en llegar hasta Marte", "Porque no tiene cámaras"], c: 1, e: "La distancia es enorme: la señal tarda entre 4 y 24 minutos." },
      { p: "¿Qué cambia la nota que suena?", o: ["La frecuencia", "El color del robot", "El tamaño de las ruedas"], c: 0, e: "Cada nota es una frecuencia distinta, como en el buzzer." },
      { p: "¿Qué tutorial se parece a cómo Curiosity evita chocar?", o: ["El del LED", "El del reloj RTC", "El del carrito esquiva obstáculos"], c: 2, e: "En los dos, un sensor detecta el obstáculo y el programa decide qué hacer." },
    ],
    palabras: [
      ["Frecuencia", "Cuántas veces por segundo vibra o se repite algo. Se mide en hercios (Hz)."],
      ["Autónomo", "Que puede decidir y moverse por sí mismo."],
      ["Órbita", "Camino que recorre un planeta alrededor del Sol."],
    ],
  },
];
