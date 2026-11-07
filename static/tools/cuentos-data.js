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
          "Universidad de Harvard, Estados Unidos, <b>1947</b>. En un cuarto enorme trabaja la <b>Mark II</b>, una de las primeras computadoras. No tiene pantalla ni mouse: es un muro de gabinetes con miles de <b>relevadores</b> que hacen <i>clic-clac, clic-clac</i> cada vez que la máquina hace una cuenta.",
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
      ["Bitácora", "Cuaderno donde se anota, con fecha y hora, todo lo que pasa en un trabajo o en un viaje."],
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
      ["Tarjeta perforada", "Tarjeta de cartón con agujeros; según dónde estén los agujeros, la máquina sabe qué hacer."],
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
          "En su casa no hay luz eléctrica: de noche usan lámparas de petróleo que echan humo. «¿Y si yo construyo un molino?», piensa.",
        ],
        sig: "c",
      },
      c: {
        texto: [
          "Las aspas pueden girar con el viento, pero un giro no prende un foco por sí solo. William necesita una pieza que convierta el <b>movimiento</b> en <b>electricidad</b>.",
        ],
        pregunta: "¿Qué pieza le sirve para eso?",
        opciones: [
          { t: "El dínamo de una bicicleta, el que prende su faro al pedalear", ir: "d" },
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
          "¡Exacto! Un <b>dínamo</b> es un pequeño <b>generador</b>: cuando su eje gira, produce electricidad. William busca en un tiradero de chatarra y junta piezas: el cuadro de una bicicleta vieja, el ventilador de un tractor y tubos de plástico que calienta y aplana para hacer las aspas.",
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
      { p: "¿Qué pieza convierte el giro de las aspas en electricidad?", o: ["La pila", "El dínamo o generador", "El foco"], c: 1, e: "El dínamo es un generador: al girar produce electricidad." },
      { p: "¿Dónde aprendió William cómo funcionan los molinos?", o: ["En un libro de la biblioteca", "En la televisión", "En la escuela"], c: 0, e: "Ya no iba a la escuela: aprendió leyendo un libro en la biblioteca de su pueblo." },
      { p: "¿Qué otro uso le dio a la energía del viento?", o: ["Hacer helados", "Volar un avión", "Bombear agua para los cultivos"], c: 2, e: "Construyó otro molino para bombear agua y regar." },
    ],
    palabras: [
      ["Generador", "Máquina que convierte el movimiento, como un giro, en electricidad."],
      ["Sequía", "Mucho tiempo sin lluvia, que deja secos los campos y sin agua a la gente."],
      ["Aspas", "Las «paletas» que el viento hace girar en un molino."],
    ],
  },

  {
    id: "semaforo", icono: "🚦", tipo: "ficcion", tema: "Secuencias y tiempos", minutos: 4,
    titulo: "Pit y el semáforo despistado",
    resumen: "Los carritos de juguete chocan en la maqueta de la escuela. El robot Pit tiene que descubrir qué le pasa al semáforo.",
    relacion: "Tutorial del semáforo",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "En el laboratorio de la escuela hay una ciudad de cartón con calles, casas y un <b>semáforo</b> hecho con un módulo de tres luces y una placa ESP32. Los alumnos de 2.º B lo programaron ayer.",
          "Pero hoy algo anda mal: los carritos de juguete que controla la maqueta <b>chocan</b> en la esquina. <b>Pit</b>, el robot ayudante del laboratorio, enciende sus ojos azules. «Investigaré», dice con su voz de lata.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Pit observa el semáforo: se pone <b>verde</b>... y de pronto, <b>rojo</b>. Los carritos que venían no alcanzan a frenar.",
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
          "Pit lo prueba así: verde, rojo, amarillo... ¡y los carritos siguen chocando! El amarillo sirve para <b>avisar</b> que va a cambiar a rojo, así que tiene que ir <b>antes</b> del rojo.",
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
          "Ahora el semáforo hace verde, amarillo, rojo... y los carritos de juguete frenan a tiempo. Los alumnos de 2.º B aplauden.",
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
      ["Programa", "Lista de instrucciones que le dice a una computadora o a la placa qué hacer y en qué orden."],
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
      ["Analógico", "Que puede tener muchos valores intermedios, no solo encendido o apagado; por ejemplo, de 0 a 4095."],
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
          "En <b>agosto de 2012</b> el robot <b>Curiosity</b>, de la NASA, aterriza en Marte, en un lugar llamado el cráter Gale. Es del tamaño de un carro, tiene seis ruedas, cámaras, un brazo robótico y hasta un láser para estudiar las rocas.",
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
      ["Frecuencia", "Cuántas veces por segundo vibra o se repite algo. Se mide en hertz (Hz)."],
      ["Autónomo", "Que puede decidir y moverse por sí mismo."],
      ["Órbita", "Camino curvo que sigue un planeta o un satélite alrededor de otro, como la Tierra alrededor del Sol."],
    ],
  },

  {
    id: "hedy", icono: "🎹", tipo: "real", tema: "Comunicación inalámbrica", minutos: 5,
    titulo: "La actriz que inventó saltar de frecuencia",
    resumen: "Una estrella de cine y un pianista inventan una forma secreta de mandar señales de radio. Hoy la usa el Bluetooth.",
    relacion: "Bluetooth y comunicación inalámbrica",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Hollywood, <b>1940</b>. <b>Hedy Lamarr</b> es una de las actrices más famosas del mundo. Pero cuando termina de filmar, no se va de fiesta: se encierra a <b>inventar</b>. Tiene una mesa de trabajo llena de cables, dibujos y ideas.",
          "En Europa hay guerra, y Hedy se entera de un problema: los barcos lanzan torpedos guiados por <b>radio</b>, pero el enemigo puede <b>interferir</b> la señal y mandarlos por otro lado.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Una señal de radio viaja en una <b>frecuencia</b>, como una estación en el radio del carro. Si el enemigo descubre cuál es, puede llenarla de ruido y la señal se pierde.",
        ],
        pregunta: "¿Cómo harías para que el enemigo no pudiera bloquear la señal?",
        opciones: [
          { t: "Cambiar de frecuencia muchas veces por segundo, en un orden secreto", ir: "c" },
          { t: "Mandar la señal mucho más fuerte por la misma frecuencia", ir: "b1" },
          { t: "Usar una sola frecuencia y esperar que no la encuentren", ir: "b2" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Más fuerte gasta mucha energía, y el enemigo también puede hacer su ruido más fuerte. Mientras la señal se quede en un solo lugar, es fácil encontrarla.",
        ],
        sig: "b",
      },
      b2: {
        error: true,
        texto: [
          "Tarde o temprano la encontrarían, porque basta con buscar en todas hasta dar con la buena. Hay que hacerlo más difícil...",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Esa fue la idea de Hedy! Si el emisor y el receptor <b>saltan juntos</b> de una frecuencia a otra siguiendo el mismo orden secreto, el enemigo nunca sabe dónde buscar. A esto se le llama <b>salto de frecuencia</b>.",
          "Pero había un problema: ¿cómo lograr que dos aparatos, uno en el barco y otro en el torpedo, cambien al mismo tiempo?",
        ],
        sig: "d",
      },
      d: {
        texto: [
          "Hedy conoce a <b>George Antheil</b>, un compositor que había hecho música con varias <b>pianolas</b> tocando juntas. Las pianolas son pianos que tocan solos leyendo un rollo de papel perforado.",
          "Juntos piensan: si dos rollos iguales giran al mismo tiempo, pueden marcar los saltos. ¡Y el piano tiene <b>88 teclas</b>, así que usan <b>88 frecuencias</b>!",
        ],
        dato: "En 1942 Hedy y George recibieron la patente de su «Sistema de comunicación secreta». Otra vez aparecen los rollos perforados, como las tarjetas de los telares del cuento de Ada.",
        sig: "e",
      },
      e: {
        fin: true,
        texto: [
          "La Marina no usó el invento en esa guerra: pensó que era demasiado complicado. Pero años después, cuando la electrónica creció, los ingenieros retomaron la idea.",
          "Hoy el <b>Bluetooth</b> salta entre decenas de frecuencias más de mil veces por segundo para que las señales no choquen entre sí. Cuando conectas tu ESP32 por Bluetooth, usas una idea que nació de una actriz y un pianista.",
          "En 1997, ya mayor, Hedy recibió un premio por ser pionera de la comunicación inalámbrica. Por fin la reconocieron como lo que siempre fue: <b>inventora</b>.",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué problema quería resolver Hedy?", o: ["Que el enemigo no pudiera bloquear la señal de radio", "Que las películas se vieran a color", "Que los pianos tocaran solos"], c: 0, e: "Quería que la señal no se pudiera interferir." },
      { p: "¿Por qué usaron 88 frecuencias?", o: ["Porque era el número de la suerte", "Porque el piano tiene 88 teclas", "Porque había 88 barcos"], c: 1, e: "Su sistema se inspiró en las pianolas, que tienen 88 teclas." },
      { p: "¿Qué tecnología de hoy usa una idea parecida?", o: ["La linterna", "El reloj de pared", "El Bluetooth"], c: 2, e: "El Bluetooth salta de frecuencia para evitar interferencias." },
    ],
    palabras: [
      ["Frecuencia", "Cuántas veces por segundo vibra una onda. En la radio, cada estación transmite en su propia frecuencia."],
      ["Interferir", "Meter ruido o estorbar una señal para que no llegue bien."],
      ["Patente", "Documento oficial que reconoce a alguien como inventor y, por un tiempo, le da el derecho de decidir quién puede fabricar o vender su invento."],
    ],
  },

  {
    id: "internet", icono: "💻", tipo: "real", tema: "Redes e Internet", minutos: 5,
    titulo: "LO: el primer mensaje de Internet",
    resumen: "En 1969 dos computadoras muy lejanas intentan hablarse por primera vez. El mensaje sale... a medias.",
    relacion: "WiFi y comunicación por red",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Estados Unidos, <b>29 de octubre de 1969</b>, de noche. En la Universidad de California en Los Ángeles (UCLA), un estudiante llamado <b>Charley Kline</b> está sentado frente a una computadora del tamaño de un refrigerador.",
          "A más de <b>500 kilómetros</b>, en otro laboratorio llamado SRI, otro joven, <b>Bill Duvall</b>, espera junto a otra computadora. Están conectados por una línea telefónica y por una red nueva llamada <b>ARPANET</b>.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Su misión: que una computadora le mande un mensaje a la otra. Charley tiene que escribir la palabra <b>LOGIN</b> (entrar) para conectarse a la computadora lejana.",
          "Para estar seguros de que todo funciona, hablan por teléfono al mismo tiempo.",
        ],
        pregunta: "¿Cómo crees que deberían mandar la palabra?",
        opciones: [
          { t: "Letra por letra, confirmando por teléfono que cada una llegó", ir: "c" },
          { t: "Mandar un texto enorme de una vez, para ganar tiempo", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Si mandas mucho de golpe y algo falla, no sabes <b>dónde</b> falló. Cuando pruebas algo por primera vez, es mejor ir poco a poco, como cuando pruebas tu programa por partes.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Charley escribe la <b>L</b>. «¿Te llegó la L?», pregunta por teléfono. «¡Sí, llegó la L!», contesta Bill.",
          "Escribe la <b>O</b>. «¿Te llegó la O?». «¡Sí, llegó la O!».",
          "Escribe la <b>G</b>... y silencio. <b>¡La computadora de Bill se trabó!</b>",
        ],
        sig: "d",
      },
      d: {
        texto: [
          "Así que el primer mensaje de la red que se convertiría en Internet fue... <b>«LO»</b>. Sin querer, en inglés suena como <i>«lo and behold»</i>, que es algo así como «¡miren esto!».",
          "Los equipos revisaron qué había pasado, corrigieron el problema y como <b>una hora después</b> lograron mandar la palabra completa.",
        ],
        dato: "Hoy la información viaja por Internet partida en pedacitos llamados paquetes. Si un paquete se pierde, se vuelve a pedir: es la misma idea de confirmar letra por letra.",
        sig: "e",
      },
      e: {
        fin: true,
        texto: [
          "Esa noche había <b>2 computadoras</b> en la red. Unos meses después ya eran 4. Hoy hay miles de millones de aparatos conectados: teléfonos, televisiones, relojes... y tu placa ESP32 cuando usas el <b>WiFi</b>.",
          "Todo empezó con dos letras, un teléfono y unos jóvenes que no se rindieron cuando la máquina se trabó.",
        ],
      },
    },
    preguntas: [
      { p: "¿Cuál fue el primer mensaje que llegó?", o: ["HOLA", "LO", "LOGIN completo"], c: 1, e: "La computadora se trabó al llegar la G, así que solo llegó «LO»." },
      { p: "¿Para qué usaban el teléfono al mismo tiempo?", o: ["Para confirmar que cada letra había llegado", "Para pedir pizza", "Para escuchar música"], c: 0, e: "Así sabían exactamente qué llegó y qué no." },
      { p: "¿Qué hicieron cuando la computadora se trabó?", o: ["Se rindieron", "Tiraron la computadora", "Buscaron el problema, lo corrigieron y lo lograron una hora después"], c: 2, e: "Corrigieron el error y mandaron la palabra completa." },
    ],
    palabras: [
      ["Red", "Grupo de aparatos conectados entre sí que pueden mandarse información."],
      ["Paquete", "Pedacito de información que viaja por Internet."],
      ["Trabarse", "Cuando una computadora se queda congelada y deja de responder."],
    ],
  },

  {
    id: "apolo", icono: "🌕", tipo: "real", tema: "Prioridades y errores", minutos: 5,
    titulo: "Alarma 1202: aterrizar en la Luna",
    resumen: "Faltan minutos para tocar la Luna y la computadora empieza a dar alarmas. ¿Abortan la misión?",
    relacion: "Programas que hacen varias cosas a la vez",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "<b>20 de julio de 1969</b>. El módulo lunar <b>Eagle</b>, con los astronautas Neil Armstrong y Buzz Aldrin, baja hacia la superficie de la Luna. Millones de personas lo ven por televisión.",
          "Lo guía una computadora pequeñita para lo que hace: tiene muchísima menos memoria que cualquier calculadora de hoy. Su programa lo escribió un equipo dirigido por <b>Margaret Hamilton</b>, una ingeniera de software.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "A pocos minutos de aterrizar, en la pantalla aparece una alarma: <b>1202</b>. Luego otra: <b>1201</b>. Armstrong pregunta por radio qué significa. En la Tierra, el centro de control tiene segundos para decidir.",
          "La computadora estaba recibiendo <b>demasiado trabajo a la vez</b>: un radar le mandaba datos que en ese momento no hacían falta.",
        ],
        pregunta: "¿Qué debería hacer una buena computadora cuando tiene demasiado trabajo?",
        opciones: [
          { t: "Hacer primero lo más importante y dejar para después lo que puede esperar", ir: "c" },
          { t: "Intentar hacerlo todo al mismo tiempo, aunque se trabe", ir: "b1" },
          { t: "Apagarse para descansar", ir: "b2" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Si se traba, nadie guía al módulo lunar. ¡Justo cuando más se necesita! Una computadora que intenta todo a la vez puede terminar sin hacer nada.",
        ],
        sig: "b",
      },
      b2: {
        error: true,
        texto: [
          "¡Ni pensarlo! Faltan unos minutos para tocar la Luna. Apagarse sería peligrosísimo.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Eso es exactamente lo que hacía el programa de Margaret Hamilton. Su equipo le dio a cada tarea una <b>prioridad</b>. Cuando hubo demasiado trabajo, la computadora se reinició en un instante y siguió haciendo <b>solo lo importante</b>: guiar el aterrizaje.",
          "Las alarmas no decían «todo está mal», decían: «tengo demasiado trabajo, pero ya me estoy encargando».",
        ],
        dato: "En el centro de control, un joven ingeniero, Jack Garman, reconoció la alarma porque la habían practicado. Contestó rápido: podían seguir. Practicar los errores antes de que pasen salva misiones.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Minutos después, Armstrong anunció: <b>«El Águila ha aterrizado»</b>. Horas más tarde dio el primer paso de un ser humano en la Luna.",
          "Hay una foto famosa de Margaret Hamilton junto a una torre de hojas de papel tan alta como ella: es el programa impreso del Apolo. Ella ayudó a que la gente usara la expresión <b>«ingeniería de software»</b>, para que se tomara en serio el trabajo de programar.",
          "Cuando tu programa en 3DPit hace varias cosas, piensa como Margaret: <b>¿qué es lo más importante?</b>",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué aparecieron las alarmas 1202 y 1201?", o: ["Porque se acabó la gasolina", "Porque la computadora tenía demasiado trabajo a la vez", "Porque la Luna estaba oscura"], c: 1, e: "Un radar le mandaba datos de más y la computadora estaba sobrecargada." },
      { p: "¿Qué hizo el programa de Margaret Hamilton?", o: ["Siguió haciendo solo lo más importante", "Apagó la nave", "Borró todos los datos"], c: 0, e: "Usó prioridades: primero lo importante, que era aterrizar." },
      { p: "¿Qué significa dar prioridad a una tarea?", o: ["Hacerla al final", "No hacerla nunca", "Decidir que es más importante y hacerla primero"], c: 2, e: "Lo prioritario va primero." },
    ],
    palabras: [
      ["Prioridad", "Lo que es más importante y se hace primero."],
      ["Software", "Los programas de una computadora o aparato. Lo que sí se puede tocar, como los cables y las piezas, es el hardware."],
      ["Abortar", "En una misión espacial, suspenderla antes de terminarla, por seguridad."],
    ],
  },

  {
    id: "camarena", icono: "📺", tipo: "real", tema: "Colores y luz (RGB)", minutos: 5,
    titulo: "El joven mexicano que le dio color a la tele",
    resumen: "En Guadalajara, un muchacho curioso arma radios con piezas viejas y termina inventando la televisión a color.",
    relacion: "LED RGB y NeoPixel",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Guadalajara, México, años <b>1920</b>. <b>Guillermo González Camarena</b> es un niño que no puede ver un aparato sin querer abrirlo. A los 12 años ya arma sus propios transmisores de radio con piezas que encuentra.",
          "De joven estudia ingeniería en la Ciudad de México y se obsesiona con un invento nuevo: la <b>televisión</b>. Pero en esa época la tele solo se veía en blanco y negro.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Guillermo quiere que la tele muestre todos los colores. Pero hay millones de colores... ¿cómo mandarlos todos?",
        ],
        pregunta: "¿Cuál es el truco para formar casi cualquier color?",
        opciones: [
          { t: "Mezclar luz roja, verde y azul en distintas cantidades", ir: "c" },
          { t: "Tener un foco distinto para cada uno de los millones de colores", ir: "b1" },
          { t: "Pintar la pantalla de colores", ir: "b2" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "¡Se necesitarían millones de focos! No cabrían en ninguna casa. Tiene que haber una forma de formar muchos colores con muy pocos.",
        ],
        sig: "b",
      },
      b2: {
        error: true,
        texto: [
          "Si pintas la pantalla, siempre se ve igual. La imagen de la tele se mueve y cambia todo el tiempo: el color tiene que venir de la <b>luz</b>.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Exacto! Con <b>luz</b>, el rojo, el verde y el azul se pueden mezclar: rojo más verde da amarillo; los tres juntos dan blanco. Con distintas cantidades de cada uno salen millones de colores.",
          "Guillermo inventa un sistema que manda la imagen en tres partes, una roja, una verde y una azul, una tras otra tan rápido que el ojo las ve juntas. Lo llama <b>sistema tricromático secuencial de campos</b>.",
        ],
        dato: "Es lo mismo que hace un LED RGB o un NeoPixel: tiene tres LEDs chiquitos, rojo, verde y azul. En 3DPit eliges cuánto brilla cada uno y así formas cualquier color.",
        sig: "d",
      },
      d: {
        texto: [
          "En <b>1940</b>, con apenas 23 años, Guillermo patenta su invento en México, y después en Estados Unidos. Fue uno de los primeros sistemas de televisión a color del mundo.",
        ],
        sig: "e",
      },
      e: {
        fin: true,
        texto: [
          "Guillermo siguió inventando toda su vida y fundó un canal de televisión. Su canal se identificaba con las letras <b>XHGC</b>: la G y la C son por <b>G</b>onzález <b>C</b>amarena. Hoy se conoce como el canal 5.",
          "Su historia demuestra que un niño curioso de Guadalajara, desarmando radios viejos, puede cambiar la forma en que todo el mundo ve las cosas.",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué colores de luz se mezclan para formar casi todos los demás?", o: ["Rojo, verde y azul", "Negro, blanco y gris", "Morado, café y rosa"], c: 0, e: "Rojo, verde y azul: por eso se dice RGB (red, green, blue)." },
      { p: "¿Qué hacía Guillermo de niño?", o: ["Pintaba cuadros", "Armaba transmisores de radio con piezas que encontraba", "Jugaba futbol todo el día"], c: 1, e: "Desde los 12 años armaba sus propios aparatos." },
      { p: "¿Qué componente de 3DPit usa la misma idea?", o: ["El sensor ultrasónico", "El botón", "El LED RGB o NeoPixel"], c: 2, e: "Tiene tres LEDs: rojo, verde y azul." },
    ],
    palabras: [
      ["RGB", "Rojo, verde y azul (en inglés: red, green, blue)."],
      ["Tricromático", "Que usa tres colores para formar todos los demás."],
      ["Transmisor", "Aparato que manda señales de radio o televisión."],
    ],
  },

  {
    id: "morse", icono: "🔦", tipo: "ficcion", tema: "Código Morse y tiempos", minutos: 5,
    titulo: "El mensaje secreto entre dos ventanas",
    resumen: "Sofía y su amigo Mateo viven frente a frente. Sin celular, inventan cómo mandarse mensajes con un LED.",
    relacion: "LED y bloques de esperar",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "<b>Sofía</b> y <b>Mateo</b> viven en edificios que están frente a frente, y sus ventanas se ven de noche. No tienen celular, pero sí una placa ESP32 cada uno y un LED muy brillante.",
          "«¿Y si nos mandamos mensajes con luz?», dice Sofía por la ventana. Mateo levanta el pulgar.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "El abuelo de Sofía les cuenta del <b>código Morse</b>: cada letra se escribe con <b>puntos</b> (señales cortas) y <b>rayas</b> (señales largas). La S es «punto punto punto» y la O es «raya raya raya».",
        ],
        dato: "En 1844, Samuel Morse y Alfred Vail mandaron uno de los primeros mensajes por telégrafo entre dos ciudades de Estados Unidos. Durante más de cien años, el Morse fue la forma más rápida de mandar mensajes lejos.",
        pregunta: "Con un LED, ¿cómo se distingue un punto de una raya?",
        opciones: [
          { t: "Por cuánto tiempo se queda encendido: poquito es punto, más tiempo es raya", ir: "c" },
          { t: "Por el color del LED", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Sofía y Mateo solo tienen un LED blanco cada uno. Además, de lejos los colores se confunden. Lo que sí se nota bien es si la luz dura <b>poco</b> o <b>mucho</b>.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Sofía programa: para un <b>punto</b>, encender el LED, <b>esperar 0.2 segundos</b> y apagarlo. Para una <b>raya</b>, encender, <b>esperar 0.6 segundos</b> y apagar. La raya dura el triple que el punto.",
          "Prueba mandar «SOS» y Mateo ve una sola luz larga y borrosa. Algo falta.",
        ],
        pregunta: "¿Qué le falta al programa?",
        opciones: [
          { t: "Una espera con el LED apagado entre cada señal", ir: "d" },
          { t: "Hacer las rayas todavía más largas", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "Las rayas más largas no ayudan: si el LED se vuelve a prender justo al apagarse, Mateo sigue viendo todo pegado. Hay que dejar un <b>espacio</b> oscuro entre señal y señal.",
        ],
        sig: "c",
      },
      d: {
        texto: [
          "Sofía agrega <b>esperar 0.2 segundos con el LED apagado</b> después de cada punto o raya, y una espera más larga entre letras. Ahora Mateo ve clarito: <i>corto, corto, corto... largo, largo, largo... corto, corto, corto</i>.",
          "Como el SOS se repite igual, Sofía arma un bloque para el punto y otro para la raya, y así no tiene que copiar lo mismo una y otra vez.",
        ],
        sig: "e",
      },
      e: {
        fin: true,
        texto: [
          "Esa noche, Mateo contesta con su LED. Sofía va anotando: «H... O... L... A». ¡HOLA!",
          "Desde entonces tienen su propio idioma de luces. Y aprendieron algo importante de los programas: <b>los silencios y las esperas también son parte del mensaje</b>.",
        ],
      },
    },
    preguntas: [
      { p: "¿Cómo se distingue un punto de una raya con el LED?", o: ["Por el color", "Por cuánto tiempo se queda encendido", "Por el tamaño del LED"], c: 1, e: "El punto es corto y la raya dura más." },
      { p: "¿Por qué al principio Mateo veía una luz larga y borrosa?", o: ["Faltaba una espera con el LED apagado entre señales", "El LED estaba fundido", "Era de día"], c: 0, e: "Sin el espacio oscuro, todas las señales se juntaban." },
      { p: "¿Qué significa SOS en Morse?", o: ["Raya, punto, raya", "Solo puntos", "Punto punto punto, raya raya raya, punto punto punto"], c: 2, e: "S es tres puntos y O es tres rayas." },
    ],
    palabras: [
      ["Código", "Forma de escribir un mensaje con señales o símbolos."],
      ["Telégrafo", "Aparato antiguo que mandaba mensajes por cable con pulsos de electricidad, usando el código Morse."],
      ["Señal", "Algo que se manda para comunicar, como una luz o un sonido."],
    ],
  },

  {
    id: "alarma", icono: "🚨", tipo: "ficcion", tema: "Sensores y condiciones", minutos: 5,
    titulo: "¿Quién se come mis galletas?",
    resumen: "Alguien saca galletas del cajón de Leo cada tarde. Con un sensor ultrasónico y un buzzer, Leo arma una trampa.",
    relacion: "Sensor ultrasónico y buzzer",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Cada tarde, <b>Leo</b> guarda sus galletas favoritas en un cajón de su escritorio. Y cada mañana... ¡faltan dos! Nadie en la casa confiesa.",
          "Leo decide resolver el misterio como un ingeniero: con su placa ESP32, un <b>sensor ultrasónico</b> y un <b>buzzer</b>.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "El sensor ultrasónico manda un sonido que no se oye y mide cuánto tarda en rebotar. Así sabe la <b>distancia</b> a lo que tenga enfrente. Leo lo pone mirando hacia el cajón: normalmente mide unos <b>80 cm</b> hasta la pared.",
        ],
        pregunta: "¿Cuándo debe sonar la alarma?",
        opciones: [
          { t: "Si la distancia es menor que 30 cm, porque alguien se acercó", ir: "c" },
          { t: "Si la distancia es mayor que 30 cm", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "¡La alarma suena todo el tiempo! Como la pared está a 80 cm, la distancia casi siempre es mayor que 30. Cuando alguien se acerca, la distancia se hace <b>más chica</b>, no más grande.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Leo programa: <b>repetir para siempre</b>: medir la distancia; <b>si</b> es menor que 30 cm, sonar el buzzer.",
          "Lo prueba pasando la mano: <i>¡piiiii!</i> Funciona. Pero hay un problema: si el ladrón de galletas se va rápido, Leo no sabrá cuántas veces vino.",
        ],
        pregunta: "¿Cómo puede saber cuántas veces se acercaron?",
        opciones: [
          { t: "Usar una variable que cuente: sumarle 1 cada vez que suena la alarma", ir: "d" },
          { t: "Quedarse despierto toda la noche contando", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "Leo lo intenta, pero a las 10 de la noche ya se quedó dormido sobre el escritorio. Para eso existen las placas: <b>no se cansan</b> y pueden contar por ti.",
        ],
        sig: "c",
      },
      d: {
        texto: [
          "Leo crea una variable llamada <b>visitas</b> que empieza en 0. Cada vez que el sensor detecta a alguien, le suma 1 y espera 3 segundos, para no contar la misma visita muchas veces.",
          "Se va a dormir. A la mañana siguiente, en la pantalla dice: <b>visitas: 1</b>. Y en el piso, junto al cajón, hay... ¡pelos blancos!",
        ],
        dato: "Esperar unos segundos después de detectar algo es un truco común: evita que una sola persona que se queda un rato frente al sensor cuente como muchas.",
        sig: "e",
      },
      e: {
        fin: true,
        texto: [
          "Esa tarde, Leo se esconde y espera. A las 9 de la noche se escucha <i>¡piiiii!</i> y aparece la culpable: <b>Nube</b>, la perrita de la casa, con una galleta en el hocico.",
          "Toda la familia se ríe. Leo cambia sus galletas a un frasco con tapa, y deja el sensor puesto... ahora como timbre para saber cuándo Nube quiere jugar.",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué mide el sensor ultrasónico?", o: ["La temperatura", "La distancia a lo que tiene enfrente", "El color de las cosas"], c: 1, e: "Mide cuánto tarda en rebotar un sonido para saber la distancia." },
      { p: "¿Por qué la condición es «menor que 30 cm»?", o: ["Porque cuando alguien se acerca, la distancia se hace más chica", "Porque 30 es un número bonito", "Porque el sensor no mide más de 30"], c: 0, e: "Acercarse hace que la distancia baje." },
      { p: "¿Para qué sirve la variable «visitas»?", o: ["Para apagar la alarma", "Para medir la distancia", "Para contar cuántas veces se acercó alguien"], c: 2, e: "La variable guarda la cuenta y le suma 1 cada vez." },
    ],
    palabras: [
      ["Variable", "Un lugar con nombre donde el programa guarda un dato que puede cambiar."],
      ["Condición", "Pregunta de sí o no que decide qué hace el programa."],
      ["Ultrasonido", "Sonido tan agudo (más de 20 000 vibraciones por segundo) que las personas no lo podemos oír."],
    ],
  },

  {
    id: "neri", icono: "🌮", tipo: "real", tema: "Satélites y comunicación", minutos: 5,
    titulo: "Tortillas en el espacio",
    resumen: "En 1985 un ingeniero de Guerrero se convierte en el primer astronauta mexicano... y se lleva tortillas a la nave.",
    relacion: "Comunicación inalámbrica (WiFi y Bluetooth)",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "<b>Rodolfo Neri Vela</b> nació en Chilpancingo, Guerrero, en 1952. De niño miraba el cielo y se preguntaba cómo viajaban por el aire las voces del radio y las imágenes de la televisión.",
          "Estudió ingeniería y se volvió experto en <b>telecomunicaciones</b>: cómo mandar señales de un lugar a otro, muy lejos y sin cables.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "En esos años, México tenía un problema: en muchos pueblos de la sierra no llegaba la señal de teléfono ni de televisión. Las montañas estorbaban y poner antenas y cables hasta allá era carísimo.",
          "La solución fueron los <b>satélites Morelos</b>: aparatos que giran alrededor de la Tierra y rebotan las señales desde allá arriba. Uno de ellos se iba a lanzar desde el transbordador espacial <b>Atlantis</b>, y México podía mandar a un astronauta.",
        ],
        dato: "Un satélite de comunicaciones funciona como un espejo muy alto: recibe la señal desde un lugar de la Tierra y la vuelve a mandar a otro, aunque haya montañas en medio.",
        sig: "c",
      },
      c: {
        texto: [
          "Rodolfo fue elegido entre muchos candidatos. Entrenó en Estados Unidos y en <b>noviembre de 1985</b> despegó en el Atlantis. ¡Era el primer mexicano en viajar al espacio!",
          "Antes del viaje le preguntaron qué comida mexicana quería llevar. En la nave no hay gravedad: todo flota, hasta las migajas.",
        ],
        pregunta: "¿Qué crees que era mejor llevar?",
        opciones: [
          { t: "Tortillas, porque no sueltan migajas", ir: "d" },
          { t: "Bolillos, porque llenan mucho", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "El bolillo suelta muchas migajas, y en el espacio las migajas no caen al piso: <b>flotan</b>. Se pueden meter en los ojos de los astronautas o en los aparatos electrónicos de la nave. ¡Peligroso!",
        ],
        sig: "c",
      },
      d: {
        texto: [
          "¡Exacto! Rodolfo pidió <b>tortillas</b>, y los astronautas descubrieron que eran perfectas: no sueltan migajas, aguantan varios días y se puede envolver cualquier cosa en ellas. Desde entonces las tortillas se volvieron comida común en las misiones espaciales.",
          "Durante el viaje, el Atlantis puso en órbita el satélite <b>Morelos II</b>, y Rodolfo hizo experimentos y tomó fotos de México desde el espacio.",
        ],
        sig: "e",
      },
      e: {
        fin: true,
        texto: [
          "Gracias a los satélites Morelos, más pueblos de México pudieron tener teléfono, televisión y radio.",
          "Al regresar, Rodolfo se dedicó a enseñar y a escribir libros para que más niñas y niños mexicanos se animaran a estudiar ciencia. Él dice que el espacio no es solo para otros países: también es para nosotros.",
        ],
        dato: "Tu placa ESP32 también manda señales sin cables, por WiFi y Bluetooth. Funcionan con ondas de radio, como las que rebotan los satélites, solo que llegan mucho más cerca.",
      },
    },
    preguntas: [
      { p: "¿Para qué servían los satélites Morelos?", o: ["Para llevar señal de teléfono y televisión a lugares lejanos", "Para tomar fotos de la Luna", "Para medir la lluvia"], c: 0, e: "Rebotaban las señales desde el espacio para llegar a pueblos lejanos." },
      { p: "¿Por qué las tortillas son buena comida para el espacio?", o: ["Porque son dulces", "Porque no sueltan migajas que floten", "Porque no pesan nada"], c: 1, e: "Las migajas flotan y pueden dañar a los astronautas o a los aparatos." },
      { p: "¿De qué estado de México es Rodolfo Neri Vela?", o: ["Jalisco", "Yucatán", "Guerrero"], c: 2, e: "Nació en Chilpancingo, Guerrero." },
    ],
    palabras: [
      ["Satélite", "Aparato que gira alrededor de la Tierra; los de comunicaciones reciben señales y las vuelven a mandar."],
      ["Telecomunicaciones", "Todo lo que sirve para mandar información lejos: teléfono, radio, televisión, Internet."],
      ["Gravedad", "Fuerza que jala las cosas hacia la Tierra; por eso lo que sueltas cae al piso."],
    ],
  },

  {
    id: "papalote", icono: "🪁", tipo: "real", tema: "Electricidad y seguridad", minutos: 5,
    titulo: "Un papalote en la tormenta",
    resumen: "Benjamin Franklin sospecha que los rayos son electricidad. Para probarlo, sale a volar un papalote en plena tormenta.",
    relacion: "Voltaje y cuidados con la electricidad",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Filadelfia, Estados Unidos, <b>1752</b>. <b>Benjamin Franklin</b> es escritor, impresor e inventor. Le fascina la electricidad, que en esa época era casi un truco de magia: frotando un tubo de vidrio podían sacarse chispitas.",
          "Franklin nota algo: las chispas hacen un pequeño chasquido y una luz... igual que un <b>rayo</b>, pero en chiquito. «¿Y si los rayos son electricidad?», se pregunta.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Para probarlo necesita acercar algo a las nubes de tormenta. Arma un <b>papalote</b> de seda, le pone un alambre puntiagudo arriba y, en la punta del hilo, amarra una <b>llave de metal</b>. Lo acompaña su hijo William.",
        ],
        pregunta: "¿Dónde crees que debía quedarse Franklin mientras volaba el papalote?",
        opciones: [
          { t: "Bajo un techo, sosteniendo el papalote con un listón seco de seda", ir: "c" },
          { t: "En medio del campo, agarrando el hilo mojado con las manos", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "¡Muy peligroso! El hilo mojado <b>conduce</b> la electricidad, y estar en medio del campo durante una tormenta es de lo más arriesgado. Franklin lo sabía: buscó un lugar techado y se agarró de algo seco.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Franklin se queda bajo un cobertizo y sostiene el papalote con un listón de seda seco, porque la seda seca casi no deja pasar la electricidad.",
          "Empieza a llover y el hilo se moja. De pronto, los pelitos del hilo <b>se levantan</b> solos. Franklin acerca el nudillo a la llave y... <b>¡zas!</b>, salta una chispa. ¡Los rayos sí eran electricidad!",
        ],
        dato: "El experimento era muy peligroso. Un año después, en 1753, el científico Georg Richmann murió en Rusia al hacer una prueba parecida. Nunca vueles papalotes cerca de cables ni con tormenta.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Con lo que aprendió, Franklin inventó el <b>pararrayos</b>: una varilla de metal en lo alto de los edificios, conectada con un cable hasta la tierra. Cuando cae un rayo, la electricidad se va por el cable y no quema la casa.",
          "Hoy casi todos los edificios altos tienen uno. Y en 3DPit seguimos la misma idea de Franklin: la electricidad es muy útil, pero <b>hay que respetarla</b>. Por eso tu placa trabaja con 3.3 volts y no con la corriente de la casa.",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué quería probar Franklin?", o: ["Que los rayos son electricidad", "Que los papalotes vuelan con lluvia", "Que la seda es resistente"], c: 0, e: "Sospechaba que los rayos y las chispas eran lo mismo." },
      { p: "¿Por qué usó un listón de seda seco?", o: ["Porque era bonito", "Porque la seda seca casi no deja pasar la electricidad", "Porque pesaba menos"], c: 1, e: "Un material que no deja pasar la electricidad se llama aislante." },
      { p: "¿Qué invento salió de este experimento?", o: ["El foco", "La pila", "El pararrayos"], c: 2, e: "El pararrayos lleva la electricidad del rayo hasta la tierra." },
    ],
    palabras: [
      ["Conductor", "Material que deja pasar la electricidad, como el metal o el agua con sal."],
      ["Aislante", "Material que casi no deja pasar la electricidad, como el plástico, el vidrio o la seda seca."],
      ["Pararrayos", "Varilla de metal conectada a la tierra que protege los edificios de los rayos."],
    ],
  },

  {
    id: "volta", icono: "🔋", tipo: "real", tema: "Pilas y voltaje", minutos: 5,
    titulo: "Ranas, metales y la primera pila",
    resumen: "Unas patas de rana se mueven solas y dos científicos discuten por qué. La respuesta fue la primera pila del mundo.",
    relacion: "Voltaje, pilas y la placa ESP32",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Italia, años <b>1780</b>. El doctor <b>Luigi Galvani</b> estudia cómo funcionan los músculos de las ranas. Un día toca las patas de una rana con dos metales distintos, y las patas <b>se mueven</b>, como si estuvieran vivas.",
          "Galvani piensa que la rana tiene una «electricidad animal» guardada adentro.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Otro científico italiano, <b>Alessandro Volta</b>, lee sobre el experimento y no está tan seguro. Se fija en un detalle: las patas solo se mueven cuando se tocan con <b>dos metales diferentes</b>.",
        ],
        pregunta: "Si fueras Volta, ¿qué probarías para saber de dónde sale la electricidad?",
        opciones: [
          { t: "Juntar dos metales distintos sin la rana, con algo húmedo en medio", ir: "c" },
          { t: "Buscar ranas más grandes", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Una rana más grande no responde la duda. Para saber si la electricidad viene de la rana o de los metales, hay que <b>cambiar una sola cosa</b> a la vez: por ejemplo, quitar la rana y ver si todavía hay electricidad.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Volta pone un disco de <b>zinc</b> y uno de <b>cobre</b>, con un pedazo de cartón mojado en agua con sal entre ellos. ¡Y aparece electricidad, sin ninguna rana! Los metales distintos con algo húmedo en medio producen corriente.",
          "Para tener más fuerza, apila muchos: zinc, cartón, cobre; zinc, cartón, cobre... una torre de discos.",
        ],
        dato: "Por eso se llama «pila»: ¡era literalmente una pila de discos! Volta la presentó en el año 1800 y fue la primera fuente de electricidad que daba corriente sin parar.",
        sig: "d",
      },
      d: {
        texto: [
          "Con la pila, por primera vez los científicos tuvieron electricidad constante para sus experimentos. Gracias a eso, en los años siguientes se inventaron el electroimán, el telégrafo y muchas cosas más.",
          "Galvani tampoco estaba del todo equivocado: hoy sabemos que los nervios sí usan pequeñas señales eléctricas para mover los músculos.",
        ],
        sig: "e",
      },
      e: {
        fin: true,
        texto: [
          "En honor a Volta, la fuerza con la que la electricidad empuja se mide en <b>volts</b> (V). Tu placa ESP32 trabaja con <b>3.3 V</b>, una pila 18650 da unos <b>3.7 V</b> y un contacto de la casa en México da <b>127 V</b>, ¡muchísimo más!",
          "Cada vez que conectas tu placa, usas una palabra que viene de un científico que se preguntó: «¿y si no es la rana?».",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué descubrió Volta?", o: ["Que dos metales distintos con algo húmedo en medio producen electricidad", "Que las ranas guardan electricidad", "Que el cobre es mágico"], c: 0, e: "La electricidad venía de los metales, no de la rana." },
      { p: "¿Por qué el invento se llama «pila»?", o: ["Porque era de color pila", "Porque era una pila de discos de metal y cartón", "Por el nombre de un pueblo"], c: 1, e: "Volta apiló muchos discos para tener más fuerza." },
      { p: "¿Con cuántos volts trabaja la placa ESP32?", o: ["127 V", "1 000 V", "3.3 V"], c: 2, e: "La placa usa 3.3 volts; la casa usa 127 V." },
    ],
    palabras: [
      ["Volt", "Unidad que mide la fuerza con la que la electricidad empuja. Su símbolo es V."],
      ["Pila", "Aparato que guarda energía química y la entrega como electricidad."],
      ["Corriente", "La electricidad que va pasando por un cable."],
    ],
  },

  {
    id: "katherine", icono: "🧮", tipo: "real", tema: "Revisar resultados", minutos: 5,
    titulo: "Que la revise ella",
    resumen: "Un astronauta está listo para dar vueltas a la Tierra, pero antes pide algo: que una matemática revise las cuentas de la computadora.",
    relacion: "Probar y revisar tus programas",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Estados Unidos, años <b>1950</b>. En un centro de la NASA trabaja <b>Katherine Johnson</b>, una matemática brillante. En esa época, a las personas que hacían cálculos a mano les decían <b>«computadoras»</b>, ¡antes de que existieran las computadoras como las conocemos!",
          "Katherine era una mujer afroamericana en un tiempo en que la discriminación era muy fuerte. Aun así, preguntaba, insistía y se ganó un lugar en las reuniones importantes.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "En <b>1962</b>, el astronauta <b>John Glenn</b> se prepara para ser el primer estadounidense en dar vueltas completas a la Tierra en la nave Friendship 7. Para calcular su camino, la NASA usa por primera vez una computadora electrónica nueva y enorme.",
          "Pero Glenn no confía del todo en esa máquina nueva.",
        ],
        pregunta: "¿Qué crees que pidió John Glenn?",
        opciones: [
          { t: "Que Katherine revisara a mano las cuentas de la computadora", ir: "c" },
          { t: "Despegar sin revisar nada: la computadora nunca se equivoca", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Las computadoras hacen exactamente lo que les dicen. Si alguien escribió un dato mal o el programa tiene un error, el resultado sale mal aunque la máquina «trabaje bien». Por eso <b>se revisa</b>.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Glenn dijo algo así como: <b>«Que la muchacha revise los números. Si ella dice que están bien, estoy listo»</b>. Se refería a Katherine.",
          "Katherine pasó día y medio haciendo las cuentas a mano, con lápiz, papel y una calculadora de escritorio. Al final, sus resultados <b>coincidieron</b> con los de la computadora.",
        ],
        dato: "Cuando dos formas distintas de calcular dan el mismo resultado, puedes confiar más en él. Los ingenieros todavía hacen eso: comprueban los cálculos importantes de dos maneras.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "El 20 de febrero de 1962, John Glenn dio <b>tres vueltas</b> a la Tierra y regresó sano y salvo. Después, Katherine también hizo cálculos para la misión que llevó a los primeros humanos a la Luna.",
          "Vivió 101 años y en 2015 recibió una de las medallas más importantes de su país. Su historia se contó en la película <i>Talentos ocultos</i>.",
          "Cuando tu programa de 3DPit da un número, haz como Katherine: pregúntate <b>«¿tiene sentido?»</b> y compruébalo de otra forma.",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué significaba «computadora» en la época de Katherine?", o: ["Una persona que hacía cálculos", "Un teléfono", "Un tipo de nave"], c: 0, e: "Así les decían a las personas que hacían cálculos a mano." },
      { p: "¿Por qué Glenn pidió que Katherine revisara las cuentas?", o: ["Porque la computadora estaba apagada", "Porque la computadora era nueva y quería estar seguro", "Porque ella era su amiga"], c: 1, e: "Quería comprobar los resultados de otra forma." },
      { p: "¿Qué pasó cuando Katherine terminó de revisar?", o: ["Encontró que todo estaba mal", "Cancelaron la misión", "Sus resultados coincidieron con los de la computadora"], c: 2, e: "Coincidieron, y Glenn despegó tranquilo." },
    ],
    palabras: [
      ["Comprobar", "Revisar algo de otra forma para estar seguro de que está bien."],
      ["Discriminación", "Tratar a alguien peor por su color de piel, su origen, su género u otra razón."],
      ["Coincidir", "Dar el mismo resultado o ser iguales."],
    ],
  },

  {
    id: "loteria", icono: "🎴", tipo: "ficcion", tema: "Números al azar y listas", minutos: 5,
    titulo: "¡Lotería! en la posada",
    resumen: "El que canta la lotería se quedó sin voz en plena posada. Majo y su primo programan la placa para que la cante.",
    relacion: "Números al azar, listas y buzzer",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Es diciembre y en casa de la abuela Lupita hay <b>posada</b>: piñata, ponche, tamales... y la <b>lotería</b>, que es lo que más les gusta a todos.",
          "Pero el tío Beto, que siempre canta las cartas con su vozarrón, amaneció <b>ronco</b>. «Sin cantor no hay lotería», dice triste la abuela.",
          "<b>Majo</b> y su primo <b>Toño</b> se miran. Traen en la mochila su placa ESP32, una pantalla OLED y un buzzer. «¡Nosotros la hacemos cantar!».",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Hacen una <b>lista</b> con los nombres de las cartas: «El gallo», «El diablito», «La dama», «El catrín», «La sirena», «La luna», «El corazón», «La rana»... hasta tener las <b>54</b>.",
        ],
        pregunta: "¿Cómo debe escoger la placa qué carta cantar?",
        opciones: [
          { t: "Con un número al azar del 1 al 54", ir: "c" },
          { t: "Siempre en el mismo orden de la lista", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "En el segundo juego, la tía Chela ya se sabe el orden y grita «¡Lotería!» antes que nadie. ¡Así no tiene chiste! Las cartas tienen que salir <b>revueltas</b>.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Toño usa el bloque de <b>número al azar</b> entre 1 y 54. La pantalla muestra el nombre de la carta y el buzzer hace <i>¡tirirí!</i> cada vez.",
          "Todo va bien hasta que la pantalla dice: «<b>El gallo</b>»... y dos cartas después, otra vez: «<b>El gallo</b>». «¡Ese ya salió!», reclama el abuelo.",
        ],
        pregunta: "¿Cómo evitan que una carta se repita?",
        opciones: [
          { t: "Quitar de la lista cada carta que ya salió", ir: "d" },
          { t: "Pedirle a la placa que «no repita» y esperar que obedezca", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "La placa no sabe que una carta ya salió si nadie se lo dice. Un número al azar puede repetirse, igual que cuando tiras un dado y sale dos veces el mismo número. Hay que <b>guardar</b> qué cartas ya salieron.",
        ],
        sig: "c",
      },
      d: {
        texto: [
          "Majo cambia el programa: después de cantar una carta, la <b>quita de la lista</b>. Ahora el número al azar va del 1 hasta las cartas que quedan. Así cada carta sale una sola vez, como cuando el cantor va sacando las cartas del mazo.",
          "De paso le agregan los versos que decía el tío Beto: «<i>El que le cantó a San Pedro no le volverá a cantar</i>»... ¡el gallo!",
        ],
        dato: "Las computadoras no pueden adivinar como las personas: usan fórmulas que dan números que parecen al azar. Por eso se llaman números «pseudoaleatorios».",
        sig: "e",
      },
      e: {
        fin: true,
        texto: [
          "La lotería sigue hasta la medianoche. La abuela Lupita llena su tabla, golpea la mesa y grita: <b>«¡Lotería!»</b>. Todos aplauden.",
          "El tío Beto, todavía ronco, les da un abrazo y les dice con voz de silbido: «El año que entra, la placa canta y yo nomás grito “¡Buena!”».",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué no sirve cantar las cartas siempre en el mismo orden?", o: ["Porque los jugadores se aprenden el orden y ya no tiene chiste", "Porque la placa se cansa", "Porque la pantalla se apaga"], c: 0, e: "Las cartas deben salir revueltas para que el juego sea justo." },
      { p: "¿Por qué salió dos veces «El gallo»?", o: ["Porque la pantalla falló", "Porque un número al azar puede repetirse", "Porque había dos gallos en la lista"], c: 1, e: "Como en un dado, el mismo número puede salir otra vez." },
      { p: "¿Cómo lo arreglaron?", o: ["Apagando el buzzer", "Comprando otra placa", "Quitando de la lista cada carta que ya había salido"], c: 2, e: "Así cada carta sale una sola vez." },
    ],
    palabras: [
      ["Al azar", "Que sale sin un orden que se pueda adivinar, como un dado."],
      ["Lista", "Varios datos guardados en orden con un solo nombre, como las 54 cartas."],
      ["Posada", "Fiesta mexicana de diciembre, con piñatas, ponche y villancicos, antes de Navidad."],
    ],
  },

  {
    id: "huerto", icono: "🥬", tipo: "ficcion", tema: "Horarios y relevador", minutos: 5,
    titulo: "El huerto que se inundó",
    resumen: "La secundaria arma un riego automático para su huerto. El primer día, ¡el agua no deja de salir!",
    relacion: "Reloj RTC y relevador",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "En la secundaria técnica hay un <b>huerto</b> con lechugas, rábanos y cilantro. En vacaciones nadie va a regarlo, así que el grupo de 2.º A decide hacer un <b>riego automático</b>.",
          "Usan una placa ESP32, un <b>relevador</b> que prende y apaga una bombita de agua, y un <b>reloj RTC</b> que sabe la hora aunque se vaya la luz. Don Chuy, el conserje, les presta una manguera.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Quieren regar <b>todos los días a las 7 de la mañana</b>, cuando todavía no hace calor. Andrea escribe el programa:",
          "<b>repetir para siempre:</b><br>· leer la hora del reloj<br>· <b>si</b> la hora es 7: encender la bomba",
          "A la mañana siguiente, Don Chuy les llama: «¡Muchachos, el huerto parece alberca!».",
        ],
        pregunta: "¿Qué salió mal?",
        opciones: [
          { t: "Nunca le dijeron a la bomba cuándo apagarse", ir: "c" },
          { t: "El reloj RTC estaba descompuesto", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Revisan el reloj y marca la hora perfecta. El problema no está en las piezas: está en lo que le <b>dijeron</b> a la placa que hiciera. Lean otra vez el programa con calma...",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Eso! El programa encendía la bomba, pero <b>nunca la apagaba</b>. Andrea agrega: encender la bomba, <b>esperar 2 minutos</b> y apagarla.",
          "Al otro día, Don Chuy vuelve a llamar: «Ya no se inunda... ¡pero la bomba prende y apaga a cada rato!».",
        ],
        pregunta: "¿Por qué crees que pasó eso?",
        opciones: [
          { t: "Porque la hora es 7 durante 60 minutos, y en cada vuelta del ciclo vuelve a regar", ir: "d" },
          { t: "Porque la bomba es muy pequeña", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "El tamaño de la bomba no cambia cuántas veces se prende. Piensen: de las 7:00 a las 7:59, ¿la hora sigue siendo 7?",
        ],
        sig: "c",
      },
      d: {
        texto: [
          "¡Claro! De las 7:00 a las 7:59 la hora <b>sigue siendo 7</b>, así que cada vez que el ciclo pregunta «¿es la hora 7?», la respuesta es sí, y vuelve a regar.",
          "Andrea crea una variable llamada <b>ya_regue</b>. Cuando riega, la pone en verdadero, y solo riega si todavía es falso. A medianoche la regresa a falso para el día siguiente.",
        ],
        dato: "A una variable que solo dice sí o no, como «ya_regue», los programadores le dicen bandera: se levanta cuando algo ya pasó.",
        sig: "e",
      },
      e: {
        fin: true,
        texto: [
          "Ahora el huerto se riega <b>una sola vez</b> cada mañana, dos minutos exactos. Al regresar de vacaciones, las lechugas están enormes y el cilantro huele hasta el salón.",
          "Don Chuy les dice: «Ese aparatito trabajó mejor que yo». Y el grupo aprendió que un programa no solo debe hacer lo correcto, sino hacerlo <b>las veces correctas</b>.",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué se inundó el huerto la primera vez?", o: ["Porque el programa nunca apagaba la bomba", "Porque llovió mucho", "Porque la manguera estaba rota"], c: 0, e: "Encendía la bomba, pero no tenía la instrucción de apagarla." },
      { p: "¿Por qué la bomba prendía y apagaba a cada rato?", o: ["Porque el relevador estaba suelto", "Porque la hora es 7 durante una hora entera y el ciclo volvía a regar", "Porque el reloj se adelantaba"], c: 1, e: "La condición «la hora es 7» se cumple de las 7:00 a las 7:59." },
      { p: "¿Para qué sirve la variable «ya_regue»?", o: ["Para medir el agua", "Para prender la luz", "Para recordar si ya se regó ese día"], c: 2, e: "Funciona como una bandera que se levanta cuando ya se regó." },
    ],
    palabras: [
      ["Relevador", "Interruptor que la placa puede encender o apagar para controlar algo más grande, como una bomba de agua."],
      ["RTC", "Reloj de tiempo real: un módulo que lleva la hora, aunque la placa se apague, gracias a su pila."],
      ["Bandera", "Variable que solo vale sí o no y avisa si algo ya pasó."],
    ],
  },
];
