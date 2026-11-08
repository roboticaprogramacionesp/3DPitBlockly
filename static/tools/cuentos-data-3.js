/* Mini cuentos (3.ª parte): historias reales de comunicación, espacio y México.
   Mismo formato que cuentos-data.js. */
CUENTOS.push(
  {
    id: "web", area: "comunicacion", icono: "🌐", tipo: "real", tema: "La Web", minutos: 5,
    titulo: "La computadora que no se debía apagar",
    resumen: "En un laboratorio de Suiza, un científico inventa una forma de unir documentos con enlaces. Y decide regalarla al mundo.",
    relacion: "Servidor web en la ESP32",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Ginebra, Suiza, <b>1989</b>. En el <b>CERN</b>, un laboratorio donde trabajan miles de científicos de muchos países, hay un problema: cada quien guarda su información en computadoras distintas, con programas distintos. Encontrar un documento es un relajo.",
          "<b>Tim Berners-Lee</b>, un ingeniero inglés, tiene una idea: páginas que se puedan ver desde cualquier computadora, con palabras que al darles clic te lleven a otra página. A esas palabras se les llama <b>enlaces</b>.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Su jefe escribe en la propuesta: «Vago, pero emocionante». Le dan permiso de intentarlo.",
          "Tim programa tres cosas: un idioma para escribir páginas (<b>HTML</b>), una forma de pedirlas por la red (<b>HTTP</b>) y el primer <b>navegador</b> para verlas. En 1991 publica el primer sitio web.",
        ],
        dato: "La computadora donde vivía ese primer sitio tenía pegada una etiqueta que decía, en inglés: «Esta máquina es un servidor. ¡NO LA APAGUES!». Si la apagaban, la Web desaparecía.",
        sig: "c",
      },
      c: {
        texto: [
          "Su invento empieza a gustar mucho. Ahora hay que decidir qué hacer con él.",
        ],
        pregunta: "¿Qué crees que era mejor para que la Web creciera?",
        opciones: [
          { t: "Regalarla: que cualquiera pudiera usarla y hacer páginas sin pagar", ir: "d" },
          { t: "Cobrar a cada persona que quisiera usarla", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "Tim pudo haberse hecho rico, pero entonces muy poca gente la habría usado, y otras empresas habrían inventado sus propias webs que no se entenderían entre sí.",
        ],
        sig: "c",
      },
      d: {
        fin: true,
        texto: [
          "En <b>1993</b>, el CERN anunció que la Web sería <b>libre y gratuita</b> para todo el mundo. Desde entonces, cualquiera puede hacer una página: escuelas, artistas, tiendas... y tú.",
          "Ojo: <b>Internet</b> y la <b>Web</b> no son lo mismo. Internet es la red de cables, antenas y computadoras conectadas (como en el cuento del mensaje «LO»). La Web es una de las cosas que viajan por Internet, igual que el correo o los videojuegos en línea.",
          "Tu placa ESP32 puede ser un pequeño <b>servidor web</b>: le pides una página desde el celular y ella te la manda. ¡Como la computadora de Tim, pero del tamaño de una galleta!",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué son los enlaces?", o: ["Palabras o botones que al darles clic te llevan a otra página", "Cables de red", "Antenas"], c: 0, e: "Unen unas páginas con otras." },
      { p: "¿Por qué la Web creció tanto?", o: ["Porque era muy cara", "Porque la regalaron: cualquiera podía usarla", "Porque solo la usaba el CERN"], c: 1, e: "Al ser libre y gratuita, todos pudieron usarla y hacer páginas." },
      { p: "¿Cuál es la diferencia entre Internet y la Web?", o: ["Son exactamente lo mismo", "La Web es más vieja", "Internet es la red; la Web es una de las cosas que viajan por ella"], c: 2, e: "Internet existía antes que la Web." },
    ],
    palabras: [
      ["Enlace", "Texto o botón que te lleva a otra página al darle clic."],
      ["Navegador", "Programa para ver páginas web, como el que usas en la computadora o el celular."],
      ["Servidor", "Computadora que guarda páginas o datos y se los manda a quien los pide."],
    ],
  },

  {
    id: "sputnik", area: "espacio", icono: "🛰️", tipo: "real", tema: "Satélites y GPS", minutos: 5,
    titulo: "Bip, bip, bip desde el espacio",
    resumen: "En 1957, una esfera de metal con cuatro antenas da vueltas a la Tierra. Cualquiera con un radio puede escucharla.",
    relacion: "Módulo GPS",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "<b>4 de octubre de 1957</b>. La Unión Soviética lanza el <b>Sputnik 1</b>, el primer satélite artificial de la historia. Es una esfera de metal de unos <b>58 centímetros</b>, más o menos como una pelota de playa grande, con cuatro antenas largas.",
          "Da una vuelta completa a la Tierra cada <b>96 minutos</b>.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "El Sputnik no tiene cámaras. Lo único que hace es mandar por radio una señal: <i>bip, bip, bip</i>.",
        ],
        pregunta: "Si no se ve a simple vista, ¿cómo puede la gente saber que de verdad está allá arriba?",
        opciones: [
          { t: "Escuchando su bip con un radio cuando pasa por encima", ir: "c" },
          { t: "Esperando a que caiga para verlo", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "¡Tendrían que esperar meses! Además, al caer se quemaría en el aire. La señal de radio era la prueba de que estaba dando vueltas.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Radioaficionados de todo el mundo sintonizaron sus aparatos y lo escucharon: <i>bip, bip, bip</i>. Fue una sensación: ¡algo hecho por humanos estaba en el espacio!",
          "En Estados Unidos, dos jóvenes científicos notaron algo curioso: cuando el satélite se acercaba, el bip sonaba un poquito más agudo, y al alejarse, más grave. Es el <b>efecto Doppler</b>, como cuando pasa una ambulancia.",
        ],
        dato: "Midiendo cómo cambiaba el bip, pudieron calcular exactamente dónde estaba el satélite. Luego pensaron al revés: si sabes dónde está el satélite, ¡puedes saber dónde estás tú! Esa idea llevó, años después, al GPS.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Las pilas del Sputnik duraron unos <b>21 días</b>; después se quedó callado. En enero de 1958 bajó, entró a la atmósfera y se quemó.",
          "Hoy hay miles de satélites. Tu módulo <b>GPS</b> escucha a varios al mismo tiempo y, por lo que tardan sus señales en llegar, calcula en qué lugar del planeta estás. ¡Todo empezó con un bip!",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué hacía el Sputnik 1?", o: ["Mandaba un bip por radio", "Tomaba fotos de la Tierra", "Llevaba astronautas"], c: 0, e: "Solo transmitía su señal de radio." },
      { p: "¿Qué es el efecto Doppler?", o: ["Un tipo de antena", "Que un sonido se oye más agudo al acercarse y más grave al alejarse", "Una pila especial"], c: 1, e: "Como la sirena de una ambulancia que pasa." },
      { p: "¿Qué tecnología de hoy nació de escuchar al Sputnik?", o: ["El foco", "El teléfono de cable", "El GPS"], c: 2, e: "Calcular posiciones con satélites llevó al GPS." },
    ],
    palabras: [
      ["Satélite artificial", "Aparato hecho por personas que da vueltas alrededor de la Tierra."],
      ["Radioaficionado", "Persona que usa radios para comunicarse por gusto."],
      ["Efecto Doppler", "Cambio en lo agudo de un sonido cuando lo que suena se acerca o se aleja."],
    ],
  },

  {
    id: "voyager", area: "espacio", mx: true, icono: "💿", tipo: "real", tema: "Mensajes al espacio", minutos: 5,
    titulo: "Un mariachi viaja entre las estrellas",
    resumen: "Dos naves llevan un disco de oro con sonidos de la Tierra para quien lo encuentre. Entre las canciones va «El Cascabel».",
    relacion: "Buzzer, melodías y frecuencias",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "<b>1977</b>. La NASA lanza dos naves, la <b>Voyager 1</b> y la <b>Voyager 2</b>, para visitar los planetas gigantes: Júpiter, Saturno, Urano y Neptuno. Después seguirán viajando para siempre, fuera del sistema solar.",
          "Alguien hace una pregunta: «¿Y si algún día las encuentran seres de otro planeta?».",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Un grupo dirigido por el astrónomo <b>Carl Sagan</b> decide poner en cada nave un <b>disco de oro</b> con un mensaje de la Tierra.",
        ],
        pregunta: "¿Qué pondrías en un mensaje para mostrar cómo somos los humanos?",
        opciones: [
          { t: "Sonidos, música, saludos en muchos idiomas e imágenes de la Tierra", ir: "c" },
          { t: "Solo una hoja con nuestra dirección escrita en español", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Unos seres de otro planeta no sabrían leer español. Es mejor mandar cosas que cualquiera pueda entender, como <b>sonidos</b> e <b>imágenes</b>, y muchas, para mostrar lo variado que es nuestro mundo.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "El disco lleva <b>115 imágenes</b>, sonidos de la naturaleza (lluvia, truenos, ballenas, un bebé), saludos en <b>55 idiomas</b> y unos <b>90 minutos de música</b> de todo el mundo.",
          "Entre las canciones está <b>«El Cascabel»</b>, de Lorenzo Barcelata, tocada por el Mariachi México de Pepe Villa. ¡Un son mexicano viaja entre las estrellas!",
        ],
        dato: "En la tapa del disco hay instrucciones dibujadas para tocarlo, explicadas con números en binario, el idioma de unos y ceros de las computadoras.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "En 2012, la Voyager 1 se convirtió en el primer objeto hecho por humanos en salir al <b>espacio interestelar</b>, entre las estrellas. Está tan lejos que su señal tarda <b>más de 22 horas</b> en llegar a la Tierra.",
          "La música del disco está guardada como <b>vibraciones</b> en un surco, como en los discos antiguos. Cuando tocas una melodía con el buzzer, también conviertes números en vibraciones: cada nota es una frecuencia.",
        ],
      },
    },
    preguntas: [
      { p: "¿Para qué pusieron un disco de oro en las Voyager?", o: ["Para mostrar cómo es la Tierra a quien lo encuentre", "Para que las naves pesaran más", "Para escuchar música en el viaje"], c: 0, e: "Es un mensaje de la Tierra para posibles seres de otros mundos." },
      { p: "¿Qué canción mexicana va en el disco?", o: ["Las mañanitas", "El Cascabel", "Cielito lindo"], c: 1, e: "«El Cascabel», tocada por un mariachi." },
      { p: "¿Cuánto tarda la señal de la Voyager 1 en llegar a la Tierra?", o: ["Un segundo", "Diez minutos", "Más de 22 horas"], c: 2, e: "Está a miles de millones de kilómetros." },
    ],
    palabras: [
      ["Interestelar", "Que está entre las estrellas, más allá del sistema solar."],
      ["Binario", "Forma de escribir números usando solo 0 y 1."],
      ["Sistema solar", "El Sol y todo lo que gira a su alrededor: planetas, lunas, cometas."],
    ],
  },

  {
    id: "lmt", area: "espacio", mx: true, icono: "🔭", tipo: "real", tema: "Telescopios y datos", minutos: 5,
    titulo: "La foto del agujero negro, con ayuda de Puebla",
    resumen: "Para fotografiar algo muy lejano se necesitaba un telescopio del tamaño de la Tierra. Uno de los telescopios que ayudaron está en un volcán de Puebla.",
    relacion: "Sincronizar datos y la hora exacta",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "En la cima del volcán <b>Sierra Negra</b>, en Puebla, a unos <b>4 600 metros</b> de altura, hay una antena gigante de <b>50 metros</b> de diámetro, ¡más ancha que una cancha de futbol!",
          "Es el <b>Gran Telescopio Milimétrico Alfonso Serrano</b>, construido por el Instituto Nacional de Astrofísica, Óptica y Electrónica (INAOE) de México junto con una universidad de Estados Unidos. No ve luz como nuestros ojos: capta ondas de radio muy cortitas que llegan del espacio.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Los astrónomos querían tomar la primera foto de un <b>agujero negro</b>: un lugar del espacio con tanta gravedad que ni la luz puede escapar. El que eligieron está en el centro de una galaxia lejanísima, llamada M87.",
          "El problema: para verlo, se necesitaba un telescopio del tamaño de... <b>toda la Tierra</b>.",
        ],
        pregunta: "¿Cómo conseguirías un telescopio así de grande?",
        opciones: [
          { t: "Usar al mismo tiempo varios telescopios en distintos lugares del mundo y juntar sus datos", ir: "c" },
          { t: "Construir una antena del tamaño del planeta", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "¡Imposible! No hay material ni dinero para algo así. Pero hay un truco: varios telescopios separados pueden trabajar juntos como si fueran <b>uno solo</b>.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Así nació el <b>Telescopio del Horizonte de Eventos</b>: ocho observatorios en distintos lugares del mundo, entre ellos el de Puebla, observaron el mismo punto del cielo al mismo tiempo en <b>abril de 2017</b>.",
          "Cada telescopio grabó sus datos con la hora marcada por <b>relojes atómicos</b>, tan exactos que casi no se atrasan ni un segundo en millones de años. Así, después se pudieron juntar las grabaciones como piezas de un rompecabezas.",
        ],
        dato: "Eran tantos datos que no se podían mandar por Internet: los guardaron en cientos de discos duros y los mandaron en avión a los centros donde los iban a procesar.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Después de dos años de trabajo con supercomputadoras, el <b>10 de abril de 2019</b> se presentó la imagen: un anillo naranja brillante alrededor de una sombra oscura. ¡La primera foto de un agujero negro!",
          "Científicas y científicos mexicanos fueron parte del equipo. Desde un volcán de Puebla, México ayudó a ver algo que nadie había visto nunca.",
        ],
      },
    },
    preguntas: [
      { p: "¿Dónde está el Gran Telescopio Milimétrico?", o: ["En el volcán Sierra Negra, en Puebla", "En la Luna", "En Yucatán"], c: 0, e: "Está a unos 4 600 metros de altura, en Puebla." },
      { p: "¿Cómo lograron un telescopio «del tamaño de la Tierra»?", o: ["Construyeron una antena gigante", "Juntaron los datos de varios telescopios del mundo que observaron al mismo tiempo", "Usaron una lupa"], c: 1, e: "Trabajaron juntos como si fueran uno solo." },
      { p: "¿Para qué usaron relojes atómicos?", o: ["Para despertar a los astrónomos", "Para medir la temperatura", "Para marcar la hora exacta de cada dato y poder juntarlos"], c: 2, e: "Sin la hora exacta, las piezas del rompecabezas no encajarían." },
    ],
    palabras: [
      ["Agujero negro", "Lugar del espacio con tanta gravedad que ni la luz puede salir."],
      ["Galaxia", "Conjunto enorme de miles de millones de estrellas, como nuestra Vía Láctea."],
      ["Reloj atómico", "Reloj muy exacto que mide el tiempo con las vibraciones de los átomos."],
    ],
  },

  {
    id: "aztechsat", area: "espacio", mx: true, icono: "🧊", tipo: "real", tema: "Satélites hechos por estudiantes", minutos: 5,
    titulo: "Un satélite del tamaño de un cubo de Rubik",
    resumen: "Estudiantes de una universidad de Puebla construyen un satélite pequeñito. Antes de mandarlo al espacio, tienen que torturarlo en la Tierra.",
    relacion: "Probar tus proyectos antes de usarlos",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Puebla, años <b>2010</b>. En la <b>UPAEP</b>, una universidad de Puebla, un grupo de estudiantes y maestros tiene un sueño: construir un satélite mexicano y mandarlo al espacio con ayuda de la NASA y la Agencia Espacial Mexicana.",
          "Lo llaman <b>AztechSat-1</b>. Es un <b>CubeSat</b>: un satélite con forma de cubo de unos <b>10 centímetros</b> por lado, más o menos del tamaño de un cubo de Rubik.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Adentro lleva una computadora, pilas, paneles solares y un radio. Su misión: probar si un satélite pequeño puede comunicarse con otros satélites que ya están en órbita, en lugar de hablar solo con antenas en la Tierra.",
          "Cuando por fin lo tienen armado, alguien pregunta: «¿Y si allá arriba algo falla?». En el espacio nadie puede ir a arreglarlo.",
        ],
        pregunta: "¿Qué deberían hacer antes de mandarlo?",
        opciones: [
          { t: "Probarlo en la Tierra con vibraciones, frío, calor y sin aire, como si ya estuviera en el espacio", ir: "c" },
          { t: "Mandarlo así: si funciona en el laboratorio, funcionará en el espacio", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "El laboratorio es muy distinto al espacio: el despegue sacude todo con fuerza, allá arriba no hay aire y la temperatura cambia de muchísimo frío a muchísimo calor. Algo que funciona en el laboratorio puede fallar allá.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "El equipo hizo <b>pruebas de vibración</b> para simular el despegue del cohete, lo metió a cámaras sin aire y lo enfrió y calentó muchas veces. Cada vez que algo fallaba, lo corregían y volvían a probar.",
          "A finales de <b>2019</b>, un cohete lo llevó a la <b>Estación Espacial Internacional</b>, y en <b>febrero de 2020</b> los astronautas lo soltaron en órbita.",
        ],
        dato: "A estas pruebas se les llama pruebas de calificación. Es lo mismo que tú haces cuando pruebas tu programa con valores raros: ¿qué pasa si el sensor marca 0? ¿y si marca el máximo?",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "El AztechSat-1 fue uno de los primeros satélites hechos por estudiantes universitarios mexicanos en llegar a órbita. Con él, muchos jóvenes aprendieron a diseñar, construir y probar tecnología espacial... sin salir de Puebla.",
          "Hoy, varios de esos estudiantes trabajan en proyectos espaciales. Y quién sabe: tal vez el próximo satélite mexicano lo arme alguien que hoy está programando una placa ESP32.",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué es un CubeSat?", o: ["Un satélite pequeño con forma de cubo", "Un cohete", "Una antena gigante"], c: 0, e: "Mide unos 10 centímetros por lado." },
      { p: "¿Por qué hicieron tantas pruebas en la Tierra?", o: ["Porque les sobraba tiempo", "Porque en el espacio nadie puede ir a arreglarlo si falla", "Porque la NASA no lo quería"], c: 1, e: "Tenía que estar listo para el despegue, el vacío, el frío y el calor." },
      { p: "¿Cómo llegó a su órbita?", o: ["Lo aventaron desde un avión", "En un globo", "Lo soltaron desde la Estación Espacial Internacional"], c: 2, e: "Un cohete lo llevó a la estación y de ahí lo soltaron." },
    ],
    palabras: [
      ["CubeSat", "Satélite pequeño con forma de cubo, de unos 10 centímetros por lado."],
      ["Órbita", "Camino que sigue un satélite alrededor de la Tierra."],
      ["Prueba", "Revisar si algo funciona bien antes de usarlo de verdad."],
    ],
  },

  {
    id: "sismo", area: "sensores", mx: true, icono: "📢", tipo: "real", tema: "Alerta sísmica", minutos: 5,
    titulo: "Un minuto antes del temblor",
    resumen: "Después del terremoto de 1985, México crea un sistema que avisa antes de que el temblor llegue a la ciudad.",
    relacion: "Sensores y avisos con buzzer",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "<b>19 de septiembre de 1985</b>, 7:19 de la mañana. Un terremoto muy fuerte, que empezó en la costa de Michoacán, sacude la Ciudad de México. Muchos edificios se caen y miles de personas pierden la vida.",
          "Después de la tragedia, científicos e ingenieros mexicanos se preguntan: «¿Podríamos avisar a la gente <b>antes</b> de que llegue el temblor?».",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Los temblores más fuertes que afectan a la capital suelen empezar en la costa del Pacífico, a cientos de kilómetros. Las ondas del sismo viajan rápido por la tierra... pero las <b>ondas de radio</b> viajan muchísimo más rápido, ¡a la velocidad de la luz!",
        ],
        pregunta: "¿Cómo aprovecharías esa diferencia de velocidad?",
        opciones: [
          { t: "Poner sensores en la costa que, al sentir un sismo fuerte, manden un aviso por radio a la ciudad", ir: "c" },
          { t: "Poner los sensores solo en la ciudad", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Si los sensores están en la ciudad, se darían cuenta del temblor justo cuando ya llegó. El chiste es detectarlo <b>donde empieza</b>, lejos, y avisar antes.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Así funciona el <b>Sistema de Alerta Sísmica Mexicano</b>, que empezó a funcionar en <b>1991</b>. Hay sensores a lo largo de la costa. Cuando detectan un sismo fuerte, mandan una señal por radio que en segundos llega a la ciudad.",
          "Para no dar falsas alarmas, el sistema no confía en un solo sensor: espera a que <b>más de uno</b> detecte el temblor. Luego suenan las alertas por altavoces, radio y televisión.",
        ],
        dato: "En la Ciudad de México, la alerta puede sonar hasta alrededor de un minuto antes de que llegue un sismo que empezó en la costa. Parece poco, pero alcanza para salir o ir a una zona segura.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Por eso en México se hacen <b>simulacros</b>: para que, cuando suene la alerta, todos sepan qué hacer sin perder ni un segundo. No corro, no grito, no empujo.",
          "Este sistema es como un programa gigante: <b>si</b> los sensores detectan un sismo fuerte <b>y</b> más de uno lo confirma, <b>entonces</b> suena la alerta. Con tu placa, un sensor y un buzzer puedes practicar la misma idea en pequeño.",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué la alerta puede llegar antes que el temblor?", o: ["Porque la señal de radio viaja mucho más rápido que las ondas del sismo", "Porque los temblores son lentos", "Porque los sensores adivinan el futuro"], c: 0, e: "La radio viaja a la velocidad de la luz." },
      { p: "¿Por qué el sistema espera a que más de un sensor detecte el sismo?", o: ["Para tardarse más", "Para no dar falsas alarmas", "Porque los sensores son lentos"], c: 1, e: "Si solo un sensor lo detecta, podría ser un error." },
      { p: "¿Para qué sirven los simulacros?", o: ["Para asustar a la gente", "Para probar las bocinas", "Para que todos sepan qué hacer sin perder tiempo cuando suene la alerta"], c: 2, e: "Practicar ayuda a actuar rápido y con calma." },
    ],
    palabras: [
      ["Sismo", "Movimiento de la tierra; también se le dice temblor o terremoto."],
      ["Simulacro", "Práctica de lo que hay que hacer en una emergencia."],
      ["Falsa alarma", "Aviso de un peligro que en realidad no existe."],
    ],
  },

  {
    id: "hernandez", area: "espacio", mx: true, icono: "👨‍🚀", tipo: "real", tema: "Perseverancia", minutos: 5,
    titulo: "Del campo al espacio",
    resumen: "Un niño que pizcaba fresas con su familia ve la llegada a la Luna y decide ser astronauta. La NASA le dice que no... once veces.",
    relacion: "No rendirte cuando tu programa falla",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "<b>José Hernández</b> nació en 1962 en California, Estados Unidos, en una familia de campesinos mexicanos de Michoacán. Cada año, la familia viajaba entre México y California siguiendo las cosechas: pizcaban fresas, tomates, pepinos...",
          "Por eso José cambiaba de escuela varias veces al año, y aprendió inglés hasta los 12 años.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Un día de 1969, mientras ajustaba la antena de la tele, vio a los astronautas caminar en la Luna. «Yo quiero ser eso», le dijo a su papá.",
          "Su papá le dio una «receta» con cinco ingredientes: saber qué quieres, ver qué tan lejos estás, hacer un plan para llegar, prepararte estudiando y, siempre, <b>echarle ganas</b>.",
        ],
        sig: "c",
      },
      c: {
        texto: [
          "José estudió ingeniería eléctrica y trabajó en un laboratorio ayudando a crear un aparato para detectar el cáncer de mama a tiempo. Mandó su solicitud a la NASA... y lo <b>rechazaron</b>. Al año siguiente, otra vez. Y otra.",
        ],
        pregunta: "¿Qué harías si te rechazan varias veces?",
        opciones: [
          { t: "Averiguar qué les faltaba a mis solicitudes y prepararme mejor cada año", ir: "d" },
          { t: "Rendirme: si dijeron que no, es que no sirvo", ir: "c1" },
        ],
      },
      c1: {
        error: true,
        texto: [
          "Un «no» no significa que no sirvas: a veces significa «todavía no». Cuando tu programa falla, no lo tiras: buscas el error y lo intentas otra vez.",
        ],
        sig: "c",
      },
      d: {
        texto: [
          "José se fijó en lo que tenían los astronautas elegidos y se preparó: sacó su licencia de <b>piloto</b>, aprendió a bucear y estudió <b>ruso</b>, porque los astronautas trabajan con Rusia en la Estación Espacial.",
          "La NASA lo rechazó <b>once veces</b>. En el intento número doce, en <b>2004</b>, por fin lo eligieron.",
        ],
        sig: "e",
      },
      e: {
        fin: true,
        texto: [
          "En agosto de <b>2009</b> viajó al espacio en el transbordador Discovery, rumbo a la Estación Espacial Internacional. Desde allá mandó mensajes en español a todos los que lo seguían desde la Tierra.",
          "Hoy da pláticas en escuelas para contar su historia, que también se hizo película. Su consejo para ti: la receta de su papá. Y sobre todo el quinto ingrediente: <b>échale ganas</b>.",
        ],
        dato: "Como dice José, del campo también se llega al espacio: no importa de dónde vengas, sino qué tan preparado estés cuando llegue tu oportunidad.",
      },
    },
    preguntas: [
      { p: "¿Qué vio José que lo hizo querer ser astronauta?", o: ["La llegada de los astronautas a la Luna en la tele", "Una película de robots", "Un avión"], c: 0, e: "En 1969, cuando era niño." },
      { p: "¿Cuántas veces lo rechazó la NASA?", o: ["Ninguna", "Once veces", "Dos veces"], c: 1, e: "Lo eligieron en el intento número doce." },
      { p: "¿Qué hizo José para prepararse mejor?", o: ["Dejó de estudiar", "Cambió de nombre", "Aprendió a pilotear, a bucear y estudió ruso"], c: 2, e: "Se fijó en lo que tenían los astronautas elegidos." },
    ],
    palabras: [
      ["Pizcar", "En México, recoger a mano la cosecha, como fresas o algodón."],
      ["Perseverancia", "Seguir intentando algo aunque sea difícil o salga mal varias veces."],
      ["Solicitud", "Documento con el que pides algo, como un trabajo o una beca."],
    ],
  },

  {
    id: "arduino", area: "programacion", icono: "🧩", tipo: "real", tema: "Hardware libre", minutos: 4,
    titulo: "La placa que nació en un café de Italia",
    resumen: "Unos maestros quieren que sus alumnos hagan proyectos con electrónica, pero las placas son caras y difíciles. Así que inventan la suya.",
    relacion: "Tu placa ESP32",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "Ivrea, un pueblo de Italia, <b>2005</b>. En una escuela de diseño, el maestro <b>Massimo Banzi</b> y sus colegas quieren que los estudiantes, que son artistas y diseñadores, no ingenieros, hagan proyectos con luces, sensores y motores.",
          "Pero las placas que había eran caras, difíciles de programar y había que comprarlas en el extranjero.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Massimo, junto con <b>David Cuartielles</b> y otros compañeros, decide diseñar su propia placa: barata, fácil de conectar a la computadora y con un programa sencillo para escribir el código.",
        ],
        pregunta: "Una vez hecha, ¿qué les conviene hacer con el diseño?",
        opciones: [
          { t: "Publicar los planos gratis para que cualquiera pueda fabricarla y mejorarla", ir: "c" },
          { t: "Mantenerlo en secreto para que nadie la copie", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Si fuera secreta, solo ellos podrían fabricarla, sería más cara y llegaría a menos escuelas. Su meta era que <b>muchos</b> estudiantes aprendieran.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "Publicaron todos los planos y el código como <b>hardware libre</b>: cualquiera puede verlos, fabricar la placa y mejorarla. Le pusieron de nombre <b>Arduino</b>, como el café donde se juntaban, el «Bar di Re Arduino», que a su vez se llamaba así por un rey de Ivrea de hace mil años.",
          "Pronto, en todo el mundo, estudiantes y aficionados empezaron a hacer robots, alarmas, instrumentos musicales y miles de proyectos más.",
        ],
        dato: "Una comunidad es un grupo de personas que comparten lo que saben. Gracias a la comunidad de Arduino existen miles de ejemplos y librerías gratis para casi cualquier sensor.",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "Tu placa ESP32 es «prima» de Arduino: tiene una forma parecida, pines parecidos y hasta se puede programar con las mismas herramientas. En 3DPit la programamos con bloques y MicroPython, otro proyecto libre.",
          "La lección de Arduino es que compartir lo que sabes hace que más gente aprenda... y que el invento crezca mucho más de lo que imaginabas.",
        ],
      },
    },
    preguntas: [
      { p: "¿Por qué inventaron Arduino?", o: ["Porque las placas que había eran caras y difíciles para sus alumnos", "Para venderla muy cara", "Para jugar videojuegos"], c: 0, e: "Querían que sus alumnos aprendieran electrónica fácilmente." },
      { p: "¿Qué significa que Arduino sea hardware libre?", o: ["Que es gratis la placa", "Que cualquiera puede ver sus planos, fabricarla y mejorarla", "Que no usa electricidad"], c: 1, e: "Sus planos y su código se publicaron para todos." },
      { p: "¿De dónde viene el nombre Arduino?", o: ["De un científico", "De un planeta", "Del café donde se juntaban, llamado así por un rey antiguo de Ivrea"], c: 2, e: "El «Bar di Re Arduino»." },
    ],
    palabras: [
      ["Hardware libre", "Aparato cuyos planos se publican para que cualquiera pueda fabricarlo y mejorarlo."],
      ["Comunidad", "Grupo de personas que comparten lo que saben sobre algo."],
      ["Librería", "En programación, código ya hecho que puedes usar en tus programas."],
    ],
  },

  {
    id: "unidades", area: "programacion", icono: "📏", tipo: "real", tema: "Unidades de medida", minutos: 5,
    titulo: "La nave que se perdió por las unidades",
    resumen: "Una nave viaja nueve meses hasta Marte y, al llegar, se pierde. El error estaba en algo que aprendes en la primaria.",
    relacion: "Sensores: centímetros, metros y grados",
    inicio: "a",
    escenas: {
      a: {
        texto: [
          "En diciembre de <b>1998</b>, la NASA lanza la nave <b>Mars Climate Orbiter</b>. Su misión: dar vueltas alrededor de Marte y estudiar su clima.",
          "La construyó una empresa, y otro equipo de la NASA la controlaba desde la Tierra. Los dos equipos se mandaban datos para corregir el camino de la nave.",
        ],
        sig: "b",
      },
      b: {
        texto: [
          "Después de nueve meses de viaje, el <b>23 de septiembre de 1999</b>, la nave llega a Marte y debe frenar para quedar en órbita. Se esconde detrás del planeta... y <b>nunca vuelve a aparecer</b>.",
          "Los ingenieros revisan todo. La nave había pasado mucho más cerca de Marte de lo planeado: a unos 57 kilómetros, en lugar de unos 150. Se metió en la atmósfera y se destruyó.",
        ],
        pregunta: "¿Qué crees que salió mal?",
        opciones: [
          { t: "Un equipo usaba unidades inglesas (libras) y el otro, unidades del sistema métrico (newtons)", ir: "c" },
          { t: "Marte se movió de lugar", ir: "b1" },
        ],
      },
      b1: {
        error: true,
        texto: [
          "Los planetas se mueven, sí, pero de forma muy predecible: los astrónomos saben exactamente dónde estará Marte cada día. El error estaba en los <b>números</b> que se mandaban los equipos.",
        ],
        sig: "b",
      },
      c: {
        texto: [
          "¡Eso fue! El programa de la empresa daba la fuerza de los motores en <b>libras</b>, una unidad inglesa. El programa de la NASA creía que esos números estaban en <b>newtons</b>, del sistema métrico. Una libra de fuerza equivale a unos 4.45 newtons, así que todos los cálculos salían mal.",
          "Era como si alguien te dijera «avanza 10» y tú no supieras si son 10 centímetros o 10 metros.",
        ],
        dato: "Casi todo el mundo usa el sistema métrico (metros, kilos, grados Celsius). Estados Unidos todavía usa mucho el sistema inglés (pies, libras, grados Fahrenheit).",
        sig: "d",
      },
      d: {
        fin: true,
        texto: [
          "La nave costó cientos de millones de dólares y se perdió por no poner de acuerdo las <b>unidades</b>. Desde entonces, la NASA revisa con muchísimo cuidado que todos los equipos usen las mismas.",
          "En tus programas pasa igual: el sensor ultrasónico mide en <b>centímetros</b>, el DHT11 da la temperatura en <b>grados Celsius</b> y el bloque esperar usa <b>segundos</b>. Antes de comparar números, pregúntate: <b>¿en qué unidad está?</b>",
        ],
      },
    },
    preguntas: [
      { p: "¿Qué causó que se perdiera la nave?", o: ["Dos equipos usaban unidades distintas sin saberlo", "Un meteorito", "Se le acabó la gasolina"], c: 0, e: "Uno usaba libras y el otro newtons." },
      { p: "¿Qué pasó con la nave al llegar a Marte?", o: ["Aterrizó bien", "Pasó demasiado cerca, entró a la atmósfera y se destruyó", "Regresó a la Tierra"], c: 1, e: "Pasó a unos 57 km en lugar de unos 150 km." },
      { p: "¿En qué unidad mide el sensor ultrasónico de los tutoriales?", o: ["Kilos", "Grados", "Centímetros"], c: 2, e: "Por eso hay que fijarse en la unidad antes de comparar." },
    ],
    palabras: [
      ["Unidad", "Medida que se usa para contar algo: metros, segundos, grados, kilos."],
      ["Sistema métrico", "Sistema de medidas que usa metros, kilos y litros; es el que usamos en México."],
      ["Atmósfera", "Capa de gases que rodea a un planeta."],
    ],
  }
);
