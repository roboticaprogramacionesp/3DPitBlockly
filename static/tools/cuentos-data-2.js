/* Mini cuentos (2.ª parte): historias reales de electricidad y computación.
   Mismo formato que cuentos-data.js. */
CUENTOS.push(
  {
    id: "edison", area: "electricidad", icono: "💡", tipo: "real", tema: "El foco", minutos: 5,
    titulo: "Mil intentos para un foco",
    resumen: "Edison y su equipo buscan un hilo que brille sin quemarse. Prueban cientos de materiales, ¡hasta pelos de barba!",
    relacion: "Tutorial del LED",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Menlo Park, Estados Unidos, <b>1879</b>. De noche, las casas se alumbran con velas y lámparas de gas o de petróleo, que huelen feo y pueden provocar incendios.",
          "<b>Thomas Edison</b> tiene un laboratorio lleno de frascos, cables y ayudantes. Su meta: un <b>foco eléctrico</b> que dure muchas horas y sea barato para cualquier casa.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "La idea ya existía: si pasa electricidad por un hilo muy delgado, el hilo se calienta tanto que <b>brilla</b>. A ese hilo se le llama <b>filamento</b>. El problema: a los pocos segundos, el filamento se quema y se rompe.",
        ],
        pregunta: "¿Qué crees que hacía que el filamento se quemara tan rápido?",
        opciones: [
          { t: "El aire: el oxígeno hace que el hilo caliente se queme", ir: "c" },
          { t: "Que el foco era de vidrio", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "El vidrio no tiene la culpa: al contrario, protege al filamento. El problema era lo que había <b>dentro</b> del vidrio. Piensa: ¿qué necesita el fuego para arder?",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Eso! Con oxígeno, el hilo caliente se quema como un cerillo. Así que el equipo de Edison le saca casi todo el aire al foco con una bomba de vacío.",
          "Luego prueban materiales para el filamento: metales, papel, cuerdas, fibras de plantas... ¡hasta pelos de la barba de uno de los ayudantes! En octubre de 1879, un hilo de algodón carbonizado brilla más de <b>13 horas</b>.",
        ],
        dato: "Después encontraron que el bambú carbonizado aguantaba más de mil horas. Al mismo tiempo, en Inglaterra, Joseph Swan también inventó un foco: muchos inventos se logran entre varias personas.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Edison entendió que un foco solo no servía: hacían falta cables, generadores, medidores y apagadores. En 1882 su empresa empezó a dar luz eléctrica a un barrio de Nueva York.",
          "Hoy casi ya no usamos focos de filamento, sino <b>LEDs</b>, que gastan mucho menos energía y casi no se calientan. Pero la lección de Edison sigue: si algo no funciona, cambia una cosa, prueba otra vez y <b>anota lo que pasa</b>.",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué le sacaron el aire al foco?", o: ["Para que el filamento no se quemara con el oxígeno", "Para que pesara menos", "Para que brillara de colores"], c: 0, e: "Sin oxígeno, el filamento caliente no se quema." },
      { p: "¿Qué es el filamento?", o: ["El vidrio del foco", "El hilo delgado que brilla cuando pasa la electricidad", "El apagador"], c: 1, e: "Es el hilo que se calienta y brilla." },
      { p: "¿Qué usamos hoy en lugar de los focos de filamento?", o: ["Velas", "Lámparas de petróleo", "LEDs, que gastan mucho menos energía"], c: 2, e: "Los LEDs gastan menos y duran más." },
    ],
    palabras: [
      ["Filamento", "Hilo muy delgado dentro de un foco que brilla cuando pasa la electricidad."],
      ["Vacío", "Espacio al que se le sacó casi todo el aire."],
      ["Carbonizar", "Calentar algo sin dejarlo arder hasta que se convierte en carbón."],
    ],
  },

  {
    id: "tesla", area: "electricidad", icono: "⚡", tipo: "real", tema: "Corriente alterna", minutos: 5,
    titulo: "La guerra de las corrientes",
    resumen: "Edison y Tesla no se ponen de acuerdo: ¿qué corriente debe llegar a las casas? La respuesta llega desde unas cataratas.",
    relacion: "Relevador y la corriente de la casa (127 V)",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "<b>Nikola Tesla</b> nació en 1856 en un pueblo que hoy está en Croacia. Tenía una memoria impresionante: decía que podía imaginar una máquina completa y «verla» funcionar en su cabeza antes de construirla.",
          "En <b>1884</b> llega a Nueva York casi sin dinero y consigue trabajo en la empresa de Edison.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Edison usaba <b>corriente directa</b>: la electricidad va siempre en el mismo sentido, como la de una pila. Pero tenía un problema: al viajar por los cables se perdía mucha energía, así que necesitaba una planta de luz cada pocos kilómetros.",
          "Tesla proponía la <b>corriente alterna</b>, que cambia de sentido muchas veces por segundo. Con unos aparatos llamados <b>transformadores</b>, su voltaje se puede subir para viajar lejos y bajar antes de entrar a las casas.",
        ],
        pregunta: "Si quieres llevar electricidad muy lejos, ¿cuál conviene?",
        opciones: [
          { t: "La corriente alterna, porque con transformadores viaja lejos perdiendo poca energía", ir: "c" },
          { t: "La corriente directa, con una planta de luz en cada colonia", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Funcionaría, pero haría falta construir cientos de plantas de luz, una casi en cada barrio. Era muy caro, y en esa época no había forma práctica de subir y bajar el voltaje de la corriente directa.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Edison y Tesla se pelearon y Tesla se fue. El empresario <b>George Westinghouse</b> compró sus inventos, y empezó la «guerra de las corrientes»: cada bando decía que su sistema era el mejor y el más seguro.",
          "En 1893, la Feria Mundial de Chicago se iluminó con corriente alterna. Y en <b>1896</b>, la planta de las <b>Cataratas del Niágara</b> mandó electricidad hasta la ciudad de Buffalo, a unos 40 kilómetros. ¡La alterna había ganado!",
        ],
        dato: "La unidad para medir los campos magnéticos se llama tesla, en su honor.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Hoy casi todo el mundo usa corriente alterna. En México, los contactos de la casa dan unos <b>127 volts</b> que cambian de sentido <b>60 veces por segundo</b> (60 Hz).",
          "Tu placa ESP32 usa corriente directa de 3.3 V. Por eso su cargador transforma la alterna de la casa en directa. ¡Las dos corrientes trabajan juntas!",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué tiene de especial la corriente alterna?", o: ["Cambia de sentido muchas veces por segundo", "Solo funciona de día", "Va siempre en el mismo sentido"], c: 0, e: "La alterna cambia de sentido; la directa no." },
      { p: "¿Para qué sirve un transformador?", o: ["Para cambiar el color de la luz", "Para subir o bajar el voltaje de la corriente alterna", "Para guardar electricidad"], c: 1, e: "Sube el voltaje para viajar lejos y lo baja para las casas." },
      { p: "¿Qué corriente usa tu placa ESP32?", o: ["Alterna de 127 V", "Alterna de 60 V", "Directa de 3.3 V"], c: 2, e: "Su cargador convierte la alterna de la casa en directa." },
    ],
    palabras: [
      ["Corriente directa", "Electricidad que va siempre en el mismo sentido, como la de una pila."],
      ["Corriente alterna", "Electricidad que cambia de sentido muchas veces por segundo, como la de los contactos de la casa."],
      ["Transformador", "Aparato que sube o baja el voltaje de la corriente alterna."],
    ],
  },

  {
    id: "faraday", area: "electricidad", icono: "🧲", tipo: "real", tema: "Imanes y generadores", minutos: 5,
    titulo: "El encuadernador que leía todo",
    resumen: "Un muchacho pobre que arregla libros lee los de ciencia antes de entregarlos. Años después descubre cómo hacer electricidad con imanes.",
    relacion: "Motores y generadores",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Londres, <b>1805</b>. <b>Michael Faraday</b> tiene 14 años. Su familia es muy pobre, así que deja la escuela y trabaja como aprendiz en un taller donde <b>encuadernan</b> libros: les cosen las hojas y les ponen pasta.",
          "Faraday tiene un truco: antes de entregar cada libro, <b>lo lee</b>. Así aprende química y electricidad, aunque nunca pudo ir a la universidad.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Un cliente le regala boletos para escuchar las conferencias del famoso científico <b>Humphry Davy</b>. Faraday toma notas con mucho cuidado, las pasa en limpio y las encuaderna en un libro precioso.",
        ],
        pregunta: "¿Qué crees que hizo Faraday con ese libro?",
        opciones: [
          { t: "Se lo mandó a Davy, junto con una carta pidiéndole trabajo", ir: "c" },
          { t: "Lo guardó en un cajón para que nadie lo viera", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Si nadie lo ve, nadie sabrá lo que Faraday puede hacer. A veces hay que animarse a mostrar tu trabajo, aunque dé pena.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Davy quedó impresionado y en <b>1813</b> lo contrató como ayudante. Faraday aprendió todo lo que pudo, y pronto empezó a hacer sus propios descubrimientos.",
          "En <b>1831</b> hizo un experimento famoso: enrolló un alambre formando una bobina y metió un imán. Con el imán quieto, no pasaba nada. Pero al <b>moverlo</b> dentro de la bobina, ¡aparecía electricidad en el alambre!",
        ],
        dato: "Esto se llama inducción electromagnética. Así funcionan los generadores de las plantas de luz y el dínamo de una bicicleta: un imán que gira cerca de bobinas de alambre.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Faraday también construyó uno de los primeros <b>motores eléctricos</b>, en 1821: la electricidad y un imán hacían girar un alambre.",
          "Nunca olvidó que había aprendido gracias a que alguien le abrió la puerta. Por eso, en 1825, empezó unas conferencias de ciencia para niños y jóvenes en Navidad. ¡Se siguen haciendo hasta hoy!",
        ],
      },
    },
    preguntas: [
      { p: "¿Cómo aprendió ciencia Faraday?", o: ["Leyendo los libros que encuadernaba", "En la universidad", "Viendo televisión"], c: 0, e: "Leía los libros del taller antes de entregarlos." },
      { p: "¿Qué pasaba al mover un imán dentro de una bobina de alambre?", o: ["El alambre se derretía", "Aparecía electricidad en el alambre", "El imán se rompía"], c: 1, e: "Un imán en movimiento produce electricidad: inducción." },
      { p: "¿Qué hizo Faraday para ayudar a otros jóvenes?", o: ["Cerró su laboratorio", "Vendió sus libros", "Empezó conferencias de ciencia para niños y jóvenes en Navidad"], c: 2, e: "Todavía se hacen cada año." },
    ],
    palabras: [
      ["Encuadernar", "Coser o pegar las hojas de un libro y ponerle pasta."],
      ["Bobina", "Alambre enrollado en muchas vueltas."],
      ["Inducción", "Producir electricidad al mover un imán cerca de un alambre."],
    ],
  },

  {
    id: "oersted", area: "electricidad", icono: "🧭", tipo: "real", tema: "Electroimanes", minutos: 4,
    titulo: "La brújula que se movió sola",
    resumen: "En plena clase, un profesor nota que la aguja de una brújula se mueve cuando pasa electricidad por un cable.",
    relacion: "Relevador, motores y brújula QMC5883L",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Copenhague, Dinamarca, <b>1820</b>. El profesor <b>Hans Christian Ørsted</b> está dando una clase sobre electricidad. Sobre la mesa tiene una pila, unos cables y, por casualidad, una <b>brújula</b>.",
          "Conecta el cable a la pila y... la aguja de la brújula <b>se mueve</b>. Desconecta el cable y la aguja regresa a apuntar al norte.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "La aguja de una brújula es un pequeño imán. Si se movió, es que algo la jaló.",
        ],
        pregunta: "¿Qué crees que descubrió Ørsted?",
        opciones: [
          { t: "Que la electricidad que pasa por un cable crea magnetismo a su alrededor", ir: "c" },
          { t: "Que la brújula estaba descompuesta", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Si estuviera descompuesta, se movería siempre. Pero solo se movía cuando <b>pasaba electricidad</b> por el cable. Cuando algo pasa siempre en las mismas condiciones, ¡hay una causa!",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Exacto! Ørsted repitió el experimento muchas veces para estar seguro. La electricidad y el magnetismo, que se creían cosas distintas, estaban <b>conectadas</b>. A esa unión se le llama <b>electromagnetismo</b>.",
          "Poco después, otros científicos descubrieron que si enrollas el cable en muchas vueltas alrededor de un clavo de hierro, el magnetismo se vuelve mucho más fuerte. ¡Habían inventado el <b>electroimán</b>!",
        ],
        dato: "Un electroimán es un imán que puedes prender y apagar. El relevador de tus tutoriales tiene uno: cuando la placa lo activa, jala un contacto de metal y se escucha el clic.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Gracias a este descubrimiento existen los motores eléctricos, las bocinas, los timbres, los relevadores y los discos duros.",
          "Y todo empezó porque un profesor puso atención a algo raro en plena clase. Cuando algo no sale como esperabas, no lo ignores: <b>¡a lo mejor ahí hay un descubrimiento!</b>",
        ],
        dato: "Por eso los sensores de brújula, como el QMC5883L, se confunden cerca de motores, bocinas o cables con mucha corriente: todos hacen magnetismo.",
      },
    },
    preguntas: [
      { p: "¿Qué hizo que la aguja de la brújula se moviera?", o: ["La electricidad que pasaba por el cable", "El viento", "Un temblor"], c: 0, e: "La corriente crea magnetismo alrededor del cable." },
      { p: "¿Qué es un electroimán?", o: ["Un imán que nunca se apaga", "Un imán que se puede prender y apagar con electricidad", "Una pila muy grande"], c: 1, e: "Funciona solo mientras pasa electricidad por su bobina." },
      { p: "¿Qué componente de los tutoriales usa un electroimán?", o: ["El LED", "El sensor DHT11", "El relevador"], c: 2, e: "Su electroimán jala el contacto y hace clic." },
    ],
    palabras: [
      ["Brújula", "Aparato con una aguja imantada que apunta hacia el norte."],
      ["Electromagnetismo", "La relación entre la electricidad y el magnetismo."],
      ["Electroimán", "Imán hecho con un alambre enrollado que funciona solo cuando pasa electricidad."],
    ],
  },

  {
    id: "bell", area: "comunicacion", icono: "☎️", tipo: "real", tema: "Teléfono y sonido", minutos: 5,
    titulo: "Señor Watson, venga, lo necesito",
    resumen: "Un maestro de personas sordas intenta mandar la voz por un cable. Las primeras palabras por teléfono fueron un llamado de ayuda.",
    relacion: "Buzzer y sonido",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Boston, Estados Unidos, años <b>1870</b>. <b>Alexander Graham Bell</b> es maestro de personas sordas. Su mamá y su esposa también eran sordas, y él estudia cómo funciona el sonido y la voz.",
          "En esa época ya existía el telégrafo, que mandaba mensajes en Morse por cable. Bell sueña con algo más: mandar la <b>voz</b>.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Bell sabe que la voz son <b>vibraciones</b> en el aire. El reto es convertir esas vibraciones en electricidad, mandarlas por el cable y, del otro lado, volver a convertirlas en sonido.",
        ],
        pregunta: "¿Cómo convertirías la voz en electricidad?",
        opciones: [
          { t: "Con una tapita delgada que vibre con la voz y haga cambiar la corriente", ir: "c" },
          { t: "Gritando muy fuerte cerca del cable", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Un cable no «oye»: el sonido no entra solo al metal. Hace falta algo que <b>vibre</b> con la voz y que, al vibrar, cambie la electricidad que pasa por el cable.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Eso! Bell y su ayudante <b>Thomas Watson</b> usaron una tapita delgada (una membrana) que vibraba con la voz. Al vibrar, hacía que la corriente del cable subiera y bajara al mismo ritmo.",
          "El <b>10 de marzo de 1876</b>, Watson estaba en otro cuarto con el receptor pegado al oído. De pronto escuchó, clarita, la voz de Bell: <b>«Señor Watson, venga, lo necesito»</b>. ¡Eran las primeras palabras por teléfono!",
        ],
        dato: "Unas semanas antes, Bell había registrado la patente del teléfono. ¡Ese mismo día, otro inventor, Elisha Gray, también llevó a la oficina de patentes una idea parecida!",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Al principio, mucha gente pensó que el teléfono era un juguete. En pocos años había líneas telefónicas por todo el país, y después por todo el mundo.",
          "Del otro lado del teléfono hay algo que hace lo contrario: convierte la electricidad otra vez en vibraciones. ¡Es la misma idea del <b>buzzer</b> de tus tutoriales, que vibra cuando la placa le manda una frecuencia!",
        ],
      },
    },
    preguntas: [
      { p: "¿A qué se dedicaba Bell?", o: ["Era maestro de personas sordas", "Era cocinero", "Era piloto"], c: 0, e: "Por eso estudiaba el sonido y la voz." },
      { p: "¿Qué hacía la membrana del teléfono?", o: ["Guardaba la voz", "Vibraba con la voz y hacía cambiar la corriente del cable", "Encendía un foco"], c: 1, e: "Así la voz se convertía en electricidad." },
      { p: "¿Qué componente de los tutoriales convierte electricidad en sonido?", o: ["El sensor ultrasónico", "El LED", "El buzzer"], c: 2, e: "Vibra con la frecuencia que le manda la placa." },
    ],
    palabras: [
      ["Membrana", "Lámina muy delgada que puede vibrar."],
      ["Vibración", "Movimiento rápido de ida y vuelta, como el de una cuerda de guitarra."],
      ["Receptor", "Aparato que recibe una señal; en el teléfono, la parte por donde escuchas."],
    ],
  },

  {
    id: "marconi", icono: "📻", area: "comunicacion", tipo: "real", tema: "Radio", minutos: 5,
    titulo: "Tres puntitos que cruzaron el mar",
    resumen: "Un joven italiano manda señales sin cables desde el jardín de su casa. Años después, intenta cruzar todo el océano Atlántico.",
    relacion: "WiFi, Bluetooth y ondas de radio",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Italia, <b>1895</b>. <b>Guglielmo Marconi</b> tiene 21 años y ha leído sobre unas ondas invisibles que viajan por el aire, las <b>ondas de radio</b>. En el ático de su casa arma aparatos para mandarlas y recibirlas.",
          "Primero logra que una señal cruce el cuarto. Luego, el jardín. ¡Luego, hasta del otro lado de una colina!",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Marconi se va a Inglaterra y cada vez manda señales más lejos. Pero su gran sueño es cruzar el <b>océano Atlántico</b>: más de 3 000 kilómetros. Muchos científicos le dicen que es imposible, que la Tierra es curva y las ondas se perderán.",
          "Para recibir una señal tan débil necesita una antena muy alta.",
        ],
        pregunta: "¿Cómo puede subir una antena muy alto, en un lugar con mucho viento?",
        opciones: [
          { t: "Colgarla de un papalote", ir: "c" },
          { t: "Enterrarla en el suelo", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Bajo tierra, la antena casi no recibiría nada. Para atrapar ondas de radio que vienen de muy lejos, conviene que la antena esté <b>alta</b> y despejada.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Así lo hizo! En diciembre de <b>1901</b>, en la isla de Terranova (hoy parte de Canadá), en un lugar llamado Signal Hill, Marconi elevó con un papalote una antena de unos 150 metros de alambre. Del otro lado del mar, en Inglaterra, su equipo mandaba una y otra vez la letra <b>S</b> en Morse: <b>punto, punto, punto</b>.",
          "El 12 de diciembre, con un audífono pegado a la oreja, Marconi escuchó débilmente: <i>tic, tic, tic</i>. ¡La señal había cruzado el océano!",
        ],
        dato: "Las ondas de radio no siguen la curva de la Tierra por sí solas; esa señal llegó porque rebotó en una capa alta de la atmósfera. ¡Ni Marconi sabía bien por qué funcionaba!",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "En 1909 recibió el Premio Nobel de Física. Y en 1912, cuando el barco <b>Titanic</b> chocó con un iceberg, sus operadores de radio pidieron ayuda: gracias a eso, otro barco llegó y rescató a unas 700 personas.",
          "Hoy las ondas de radio están en todas partes: en la radio, la televisión, los celulares, el GPS... y en el <b>WiFi</b> y el <b>Bluetooth</b> de tu placa ESP32, que tiene su propia antena dibujada en la tarjeta.",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué letra mandaron a través del océano?", o: ["La S, que en Morse son tres puntos", "La A", "La palabra HOLA"], c: 0, e: "La S son tres puntos: tic, tic, tic." },
      { p: "¿Para qué usó Marconi un papalote?", o: ["Para jugar", "Para subir muy alto la antena", "Para mandar cartas"], c: 1, e: "Una antena alta recibe mejor las señales lejanas." },
      { p: "¿Qué tiene tu placa ESP32 que usa ondas de radio?", o: ["El botón de reinicio", "El conector USB", "El WiFi y el Bluetooth"], c: 2, e: "Usan ondas de radio y tienen su antena en la tarjeta." },
    ],
    palabras: [
      ["Ondas de radio", "Ondas invisibles que viajan por el aire y pueden llevar información."],
      ["Antena", "Pieza de metal que manda o recibe ondas de radio."],
      ["Inalámbrico", "Que funciona sin cables."],
    ],
  },

  {
    id: "transistor", area: "electricidad", icono: "🔬", tipo: "real", tema: "Transistores y chips", minutos: 5,
    titulo: "El interruptor más pequeño del mundo",
    resumen: "Las computadoras eran gigantes y se descomponían a cada rato. En 1947, un pedacito de cristal lo cambió todo.",
    relacion: "La placa ESP32 por dentro",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Años <b>1940</b>. Los radios y las primeras computadoras funcionan con <b>bulbos</b>: tubos de vidrio del tamaño de un foco, que se calientan mucho y se funden seguido, como los focos viejos.",
          "Una computadora de esa época necesitaba miles de bulbos. ¡Era del tamaño de un cuarto y siempre había alguno fundido!",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Los bulbos hacían dos trabajos: <b>amplificar</b> señales débiles (como la de un radio) y funcionar como <b>interruptores</b> muy rápidos, de prendido y apagado, que es lo que usan las computadoras para contar.",
        ],
        pregunta: "¿Qué tendría que tener el reemplazo ideal del bulbo?",
        opciones: [
          { t: "Ser pequeño, no calentarse tanto y no tener partes que se fundan", ir: "c" },
          { t: "Ser más grande y brillante", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "¡Lo contrario! Si fuera más grande, las computadoras ocuparían edificios enteros. Y el brillo no sirve para calcular: es energía que se desperdicia en forma de calor.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "En los Laboratorios Bell, en Estados Unidos, <b>John Bardeen</b>, <b>Walter Brattain</b> y <b>William Shockley</b> estudiaban unos materiales llamados <b>semiconductores</b>, como el germanio y el silicio.",
          "En <b>diciembre de 1947</b> lograron que un pedacito de germanio con dos puntitas de oro amplificara una señal. Nació el <b>transistor</b>: hace lo mismo que un bulbo, pero es pequeñísimo, gasta muy poco y no se funde.",
        ],
        dato: "En 1956 los tres recibieron el Premio Nobel de Física. Después se aprendió a poner muchos transistores juntos en un solo pedacito de silicio: el chip o circuito integrado.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Hoy los transistores son tan pequeños que no se ven ni con una lupa. El chip de tu placa ESP32 tiene <b>millones</b> de transistores, prendiéndose y apagándose millones de veces por segundo.",
          "Cada vez que tu programa hace una cuenta o prende un LED, millones de interruptores diminutos trabajan juntos. ¡Y todo empezó con un pedacito de germanio!",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué problema tenían los bulbos?", o: ["Eran grandes, se calentaban y se fundían", "Eran demasiado pequeños", "No usaban electricidad"], c: 0, e: "Por eso las computadoras con bulbos eran enormes y fallaban seguido." },
      { p: "¿Qué hace un transistor?", o: ["Guarda agua", "Amplifica señales y funciona como interruptor muy rápido", "Da luz de colores"], c: 1, e: "Hace lo mismo que un bulbo, pero pequeñísimo." },
      { p: "¿Cuántos transistores tiene el chip del ESP32?", o: ["Solo uno", "Diez", "Millones"], c: 2, e: "Millones de transistores diminutos trabajan juntos." },
    ],
    palabras: [
      ["Bulbo", "Tubo de vidrio que usaban los radios y computadoras antiguas para manejar señales."],
      ["Transistor", "Pieza diminuta que funciona como interruptor o amplificador sin partes que se muevan."],
      ["Semiconductor", "Material, como el silicio, que a veces deja pasar la electricidad y a veces no."],
    ],
  },

  {
    id: "eniac", area: "programacion", icono: "🔌", tipo: "real", tema: "Las primeras programadoras", minutos: 5,
    titulo: "Las seis programadoras olvidadas",
    resumen: "Seis mujeres programan la computadora más grande del mundo... sin pantalla, sin teclado y sin manual.",
    relacion: "Planear tus programas antes de armarlos",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Estados Unidos, <b>1945</b>. En la Universidad de Pensilvania construyen la <b>ENIAC</b>, una de las primeras computadoras electrónicas. Pesa unas <b>30 toneladas</b>, ocupa un cuarto enorme y tiene más de <b>17 000 bulbos</b>.",
          "Para programarla no hay teclado ni pantalla: hay que conectar cientos de <b>cables</b> y girar miles de perillas.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "El trabajo de programarla se lo dan a seis jóvenes matemáticas: <b>Kathleen McNulty</b>, <b>Jean Jennings</b>, <b>Betty Snyder</b>, <b>Marlyn Wescoff</b>, <b>Frances Bilas</b> y <b>Ruth Lichterman</b>.",
          "No existe ningún manual. Ni siquiera las dejan entrar al principio a ver la máquina: solo les dan los planos.",
        ],
        pregunta: "Sin poder tocar la máquina, ¿cómo empezarías a programarla?",
        opciones: [
          { t: "Estudiar los planos y planear en papel cada paso antes de conectar un solo cable", ir: "c" },
          { t: "Esperar a que dejen entrar y conectar cables al azar, a ver qué pasa", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Con miles de cables y perillas, conectar al azar podría tardar años y nunca saldría nada. Primero hay que <b>entender</b> cómo funciona y <b>planear</b>.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Las seis estudiaron los planos hasta entender cada parte de la máquina. Dibujaron diagramas de cada paso del cálculo y decidieron qué cable iba en qué lugar.",
          "Cuando por fin pudieron entrar, su programa funcionó. Encontraban errores revisando cada bulbo y cada conexión, y aprendieron a calcular en segundos lo que a una persona le llevaba días.",
        ],
        dato: "A planear un programa paso a paso, con dibujos de cajitas y flechas, se le llama hacer un diagrama de flujo. ¡Se parece mucho a armar bloques en 3DPit!",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "En <b>1946</b> presentaron la ENIAC a los periódicos. El programa de las seis funcionó perfecto... pero en las fotos y en las noticias casi no las mencionaron. Muchos pensaron que eran solo «modelos» posando junto a la máquina.",
          "Pasaron unos 40 años hasta que alguien investigó su historia y las reconoció como <b>pioneras de la programación</b>. Hoy sabemos que sin ellas la ENIAC no habría hecho nada.",
        ],
      },
    },
    preguntas: [
      { p: "¿Cómo se programaba la ENIAC?", o: ["Conectando cables y girando perillas", "Con un teclado", "Hablándole"], c: 0, e: "No tenía teclado ni pantalla." },
      { p: "¿Qué hicieron las seis programadoras antes de tocar la máquina?", o: ["Nada, esperaron", "Estudiaron los planos y planearon cada paso en papel", "Conectaron cables al azar"], c: 1, e: "Planear primero les permitió que el programa funcionara." },
      { p: "¿Por qué se dice que fueron «olvidadas»?", o: ["Porque se perdieron", "Porque no sabían programar", "Porque casi no las mencionaron en las noticias de su época"], c: 2, e: "Las reconocieron muchos años después." },
    ],
    palabras: [
      ["Diagrama de flujo", "Dibujo con cajitas y flechas que muestra los pasos de un programa."],
      ["Pionero, pionera", "Persona que es de las primeras en hacer algo."],
      ["Plano", "Dibujo que muestra cómo está hecha una máquina o un edificio."],
    ],
  },

  {
    id: "turing", area: "programacion", icono: "🔐", tipo: "real", tema: "Códigos secretos", minutos: 5,
    titulo: "El código que cambiaba cada día",
    resumen: "Durante una guerra, un matemático y su equipo intentan descifrar mensajes secretos que cambian de clave todos los días.",
    relacion: "Patrones y contraseñas",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Inglaterra, <b>1939</b>. Empieza la Segunda Guerra Mundial. El ejército alemán manda sus mensajes con una máquina llamada <b>Enigma</b>, que revuelve las letras de una forma tan complicada que parece imposible de descifrar.",
          "Lo peor: <b>la clave cambiaba todos los días</b>. Aunque alguien lograra descifrarla, a la medianoche había que empezar de nuevo.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "En una casa de campo llamada <b>Bletchley Park</b>, el gobierno británico reúne a matemáticos, ajedrecistas y expertos en crucigramas. Entre ellos está <b>Alan Turing</b>, un joven matemático brillante.",
          "Probar todas las claves a mano tomaría miles de años.",
        ],
        pregunta: "¿Cuál sería un buen truco para encontrar la clave más rápido?",
        opciones: [
          { t: "Buscar palabras que casi siempre aparecían en los mensajes, como el reporte del clima", ir: "c" },
          { t: "Probar las claves al azar hasta tener suerte", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Había tantísimas combinaciones que, probando al azar, nunca terminarían. Para resolver un problema enorme hay que encontrar un <b>patrón</b> que reduzca las posibilidades.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Ese fue el truco! Muchos mensajes empezaban igual cada mañana, por ejemplo con el reporte del <b>clima</b>. Si sabían qué palabra probablemente venía escondida, podían descartar muchísimas claves.",
          "Turing diseñó, basándose en una máquina que habían inventado matemáticos de Polonia, una máquina llamada <b>«bombe»</b>, que probaba claves muy rápido usando esas pistas. Con varias bombes trabajando, a veces descifraban los mensajes el mismo día.",
        ],
        dato: "Por eso las buenas contraseñas no usan palabras comunes ni fechas fáciles: esas son las primeras que alguien probaría.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Muchos historiadores creen que el trabajo de Bletchley Park ayudó a terminar la guerra antes y a salvar muchas vidas. Durante años fue un <b>secreto</b>: nadie podía contarlo.",
          "Turing también imaginó cómo debía funcionar una computadora que siguiera instrucciones, y se preguntó si una máquina podría «pensar». Años después lo trataron muy injustamente por ser homosexual. En 2009, el gobierno británico le pidió perdón públicamente, y hoy su cara aparece en un billete.",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué hacía tan difícil descifrar Enigma?", o: ["Que la clave cambiaba todos los días", "Que los mensajes eran muy cortos", "Que estaban en español"], c: 0, e: "Cada medianoche había que empezar de nuevo." },
      { p: "¿Qué truco usaron para encontrar la clave?", o: ["Adivinar al azar", "Buscar palabras que casi siempre aparecían, como el reporte del clima", "Preguntarle al enemigo"], c: 1, e: "Esas pistas reducían muchísimo las posibilidades." },
      { p: "¿Qué aprendemos para nuestras contraseñas?", o: ["Usar tu nombre", "Usar 1234", "No usar palabras comunes ni fechas fáciles"], c: 2, e: "Son las primeras que alguien probaría." },
    ],
    palabras: [
      ["Descifrar", "Entender un mensaje escrito en clave."],
      ["Clave", "Regla secreta para esconder o leer un mensaje."],
      ["Patrón", "Algo que se repite y ayuda a predecir lo que sigue."],
    ],
  }
);
