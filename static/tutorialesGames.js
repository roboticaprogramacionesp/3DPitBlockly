(function () {
  'use strict';

  /* NOTA: los bloques de juego (pantalla, personaje, teclado, dibujo…) NO
     viven en una categoría llamada "Juego" -- están dentro de la categoría
     "Inicio" del toolbox (ver templates/index.html, <category name="Inicio">).
     Por eso cada paso usa highlightCat: "Inicio" + un "bloque" real (tipo
     de bloque de Blockly) para que TutorialSteps pueda resaltarlo en el
     flyout y verificar que el alumno ya lo arrastró, igual que hacen los
     tutoriales de LEDs/Sensores/etc. */

  /* ── La Caja Misteriosa (área y perímetro) ─────────────────────────────
     Los dos tutoriales arman el MISMO juego: un tablero de 4 cuadrados
     (rectángulo contorno) con 4 opciones, una sola correcta. Solo cambian
     la variable de la respuesta (area / perimetro) y los bloques de la
     fórmula, así que se generan con esta función en vez de duplicar ~100
     pasos. Las variables siguen el estilo de Python (snake_case). */
  function paso(titulo, desc, cat, bloque, label) {
    return { titulo: titulo, desc: desc, highlightCat: cat, expandCat: null, bloque: bloque, bloqueLabel: label };
  }
  function pasoGet(nombre, desc) {
    return paso('Obtén ' + nombre, desc, 'Variables', { tipo: 'variables_get', valor: nombre }, 'obtener ' + nombre);
  }
  function pasoSet(titulo, nombre, desc) {
    return paso(titulo, desc, 'Variables', { tipo: 'variables_set', valor: nombre }, 'Establecer ' + nombre);
  }
  function pasoNumero(valor, desc) {
    return paso('Escribe ' + valor, desc, 'Matemáticas', 'math_number', 'Número');
  }

  function cajaMisteriosa(c) {
    var v = c.variable;  // nombre de la variable con la respuesta real
    var n = c.nombre;    // cómo se lee en pantalla: "área" / "perímetro"
    var steps = [
      {
        titulo: '¿Qué aprenderemos?',
        desc: c.intro,
        highlightCat: null, bloque: null
      },
      {
        titulo: 'Crea un proyecto nuevo',
        desc: 'Antes de empezar, abrí el menú <b>Archivo</b> y hacé clic en <b>Nuevo</b> <span class="icon-btn icon-new"></span> para partir de un workspace limpio (si tenías algo sin guardar, te va a pedir confirmación antes de borrarlo).',
        highlightElement: '#btnArchivo'
      },
      {
        titulo: 'Abre la categoría Inicio',
        desc: 'Haz clic en <b>Inicio</b> en el panel de bloques para ver los bloques de pantalla y dibujo.',
        highlightCat: 'Inicio', expandCat: null, bloque: null
      },
      paso('Arrastra: Iniciar juego',
        'Arrastra el bloque <em>Iniciar juego</em>. Configura ancho <b>480</b> y alto <b>360</b>.',
        'Inicio', 'game_start', 'Iniciar juego'),
      {
        titulo: 'Crea las variables base, altura y puntos',
        desc: 'Ve a <b>Variables</b> y crea tres variables, una por una con <em>Crear variable</em>: <b>base</b>, <b>altura</b> y <b>puntos</b>. Escribe los nombres <b>en minúsculas</b>, como en Python.',
        highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: ['base', 'altura', 'puntos'], expandCat: null, bloque: null
      },
      {
        titulo: 'Crea las variables de la respuesta y las 4 casillas',
        desc: 'Crea seis variables más: <b>' + v + '</b> (la respuesta real), <b>opcion1</b>, <b>opcion2</b>, <b>opcion3</b>, <b>opcion4</b> (lo que se muestra en cada cuadrado) y <b>zona_correcta</b> (en qué cuadrado va la respuesta real). Como en Python, si el nombre tiene dos palabras se unen con guion bajo <b>_</b>: <b>zona_correcta</b>, no <i>zonaCorrecta</i>.',
        highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: [v, 'opcion1', 'opcion2', 'opcion3', 'opcion4', 'zona_correcta'], expandCat: null, bloque: null
      },
      {
        titulo: 'Crea las variables para leer el clic',
        desc: 'Crea tres variables más: <b>columna</b>, <b>fila</b> y <b>zona_clic</b>. Las usaremos para saber en qué cuadrado hiciste clic.',
        highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: ['columna', 'fila', 'zona_clic'], expandCat: null, bloque: null
      },
      pasoSet('Empieza con 0 puntos', 'puntos',
        'Arrastra <em>Establecer … a</em> y engánchalo <b>debajo de Iniciar juego</b>. En el desplegable elige <b>puntos</b>.'),
      pasoNumero(0, 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>0</b>. Colócalo en el hueco de <em>Establecer puntos a</em>.'),
      paso('Crea tu función: nueva_pregunta',
        'Ve a <b>Funciones</b> y arrastra el bloque <em>para hacer algo</em> a un lugar vacío del área de trabajo (suelto, no enganchado al juego). Haz clic en su nombre y escribe <b>nueva_pregunta</b>. Ahí dentro inventaremos un rectángulo y repartiremos las 4 opciones.',
        'Funciones', 'procedures_defnoreturn', 'para … hacer'),
      pasoSet('Dentro de la función: elige la base', 'base',
        'Arrastra <em>Establecer base a</em> <b>dentro</b> de la función <b>nueva_pregunta</b>.'),
      paso('Base al azar',
        'Ve a <b>Inicio</b> y arrastra el bloque <em>Número aleatorio</em> al hueco de <em>Establecer base a</em>. Ponlo entre <b>2</b> y <b>20</b>.',
        'Inicio', 'game_random_int', 'Número aleatorio'),
      pasoSet('Dentro de la función: elige la altura', 'altura',
        'Arrastra <em>Establecer altura a</em>, debajo del anterior. Revisa que el desplegable diga <b>altura</b>.'),
      paso('Altura al azar',
        'Ve a <b>Inicio</b> y arrastra otro <em>Número aleatorio</em>, entre <b>2</b> y <b>20</b>.',
        'Inicio', 'game_random_int', 'Número aleatorio'),
      pasoSet('Dentro de la función: calcula el ' + n, v,
        'Arrastra <em>Establecer ' + v + ' a</em>, debajo del anterior. ' + c.formulaIntro)
    ].concat(c.formula);

    // Las 4 casillas arrancan con un valor FALSO: respuesta + error al azar.
    for (var k = 1; k <= 4; k++) {
      steps.push(
        pasoSet('Casilla ' + k + ': valor falso', 'opcion' + k,
          (k === 1 ? 'Arrastra <em>Establecer opcion1 a</em>. Cada casilla empieza con un valor <b>falso</b> parecido al ' + n + ' real; más adelante una de las 4 se corrige.'
                   : 'Arrastra <em>Establecer opcion' + k + ' a</em>, debajo del anterior. Mismo patrón que la casilla 1.')),
        paso('Casilla ' + k + ': suma un error',
          'Ve a <b>Matemáticas</b> y arrastra el bloque de operación <em>+</em> (suma) al hueco de <em>Establecer opcion' + k + ' a</em>.',
          'Matemáticas', 'math_arithmetic', '+ (suma)'),
        pasoGet(v, 'Arrastra <em>obtener ' + v + '</em> al primer hueco de la suma.'),
        paso('Casilla ' + k + ': error al azar',
          'Ve a <b>Inicio</b> y arrastra un <em>Número aleatorio</em> al segundo hueco de la suma, entre <b>1</b> y <b>15</b>.' + (k === 4 ? ' Ya las 4 casillas tienen un valor falso.' : ''),
          'Inicio', 'game_random_int', 'Número aleatorio')
      );
    }

    steps.push(
      pasoSet('Sortea la casilla ganadora', 'zona_correcta',
        'Arrastra <em>Establecer zona_correcta a</em>: aquí decidimos al azar en cuál de los 4 cuadrados quedará el ' + n + ' <b>real</b>.'),
      paso('Número al azar del 1 al 4',
        'Ve a <b>Inicio</b> y arrastra otro <em>Número aleatorio</em>, entre <b>1</b> y <b>4</b>.',
        'Inicio', 'game_random_int', 'Número aleatorio')
    );

    // Un "Si" por casilla: si zona_correcta = k, la casilla k recibe la respuesta real.
    for (k = 1; k <= 4; k++) {
      steps.push(
        paso('Si la ganadora es la casilla ' + k,
          'Ve a <b>Lógica</b> y arrastra un bloque <em>Si … hacer</em> dentro de la función, debajo de lo anterior.',
          'Lógica', 'controls_if', 'Si … hacer'),
        paso('Compara zona_correcta = ' + k,
          'Ve a <b>Lógica</b> y arrastra el bloque de comparación <em>=</em> a la condición del <em>Si</em>.',
          'Lógica', 'logic_compare', '= (comparar)'),
        pasoGet('zona_correcta', 'Arrastra <em>obtener zona_correcta</em> al primer hueco de la comparación.'),
        pasoNumero(k, 'Ve a <b>Matemáticas</b> y arrastra un <em>Número</em> con valor <b>' + k + '</b> al segundo hueco.'),
        pasoSet('Corrige la casilla ' + k, 'opcion' + k,
          'Arrastra <em>Establecer opcion' + k + ' a</em> <b>dentro del hacer</b> de este <em>Si</em>.' + (k === 1 ? ' Así reemplazas el valor falso por el real.' : '')),
        pasoGet(v, 'Arrastra <em>obtener ' + v + '</em> al hueco de <em>Establecer opcion' + k + ' a</em>.' + (k === 4 ? ' ¡La función está lista! Siempre queda una sola casilla con la respuesta real.' : ''))
      );
    }

    steps.push(
      paso('Llama a nueva_pregunta (primera ronda)',
        'Ve a <b>Funciones</b> y arrastra el bloque <em>nueva_pregunta</em> que apareció ahí. Engánchalo en el programa principal, <b>debajo de Establecer puntos a 0</b> (fuera de la función).',
        'Funciones', 'procedures_callnoreturn', 'nueva_pregunta'),
      paso('Agrega el ciclo del juego',
        'Ve a <b>Ciclos</b> y arrastra <em>Repetir mientras Verdadero</em>, debajo de <em>nueva_pregunta</em>. Todo lo que sigue va <b>dentro</b> de este ciclo.',
        'Ciclos', 'controls_whileUntil', 'Repetir mientras Verdadero'),
      paso('Limpia la pantalla',
        'Ve a <b>Inicio</b> y arrastra <em>Limpiar pantalla</em> como primer bloque dentro del ciclo.',
        'Inicio', 'game_clear', 'Limpiar pantalla')
    );

    // El tablero: 4 cuadrados de 240×150 debajo de la franja de títulos (y < 60).
    var cuadrados = [
      ['1 (arriba-izquierda)', 0, 60],
      ['2 (arriba-derecha)', 240, 60],
      ['3 (abajo-izquierda)', 0, 210],
      ['4 (abajo-derecha)', 240, 210]
    ];
    cuadrados.forEach(function (q, i) {
      steps.push(paso('Dibuja el cuadrado ' + q[0],
        'Ve a <b>Inicio</b> y arrastra ' + (i === 0 ? 'el bloque' : 'otro') + ' <em>rectángulo contorno</em>: X=<b>' + q[1] + '</b>, Y=<b>' + q[2] + '</b>, ancho=<b>240</b>, alto=<b>150</b>, color blanco, grosor <b>2</b>.' +
          (i === 0 ? ' Los 60 píxeles de arriba quedan libres para los textos.' : ''),
        'Inicio', 'game_draw_rect_outline', 'rectángulo contorno'));
    });

    // Textos de la franja superior: "Base: 7", "Altura: 4", "Puntos: 2".
    [['Base', 'base', 20], ['Altura', 'altura', 150], ['Puntos', 'puntos', 360]].forEach(function (t) {
      steps.push(
        paso('Muestra "' + t[0] + ': "',
          'Ve a <b>Inicio</b> y arrastra <em>Escribir texto en pantalla</em>: X=<b>' + t[2] + '</b>, Y=<b>22</b>, color blanco, tamaño <b>16</b>.',
          'Inicio', 'game_show_text', 'Escribir texto en pantalla'),
        paso('Une texto y número (' + t[1] + ')',
          'Ve a <b>Textos</b> y arrastra <em>crear texto con</em> al hueco de texto del bloque anterior: sirve para pegar una etiqueta con un valor.',
          'Textos', 'text_join', 'crear texto con'),
        paso('Escribe "' + t[0] + ': "',
          'Ve a <b>Textos</b> y arrastra el bloque de texto <em>" "</em> al primer hueco de <em>crear texto con</em>. Escribe <b>' + t[0] + ': </b> (con un espacio al final).',
          'Textos', 'text', 'texto'),
        pasoGet(t[1], 'Arrastra <em>obtener ' + t[1] + '</em> al segundo hueco de <em>crear texto con</em>.')
      );
    });

    steps.push(paso('Muestra la pregunta',
      'Arrastra otro <em>Escribir texto en pantalla</em>. Escribe <b>' + c.pregunta + '</b> en el texto, X=<b>20</b>, Y=<b>48</b>, color blanco, tamaño <b>16</b>.',
      'Inicio', 'game_show_text', 'Escribir texto en pantalla'));

    // Una opción centrada en cada cuadrado.
    [['1', 100, 145], ['2', 340, 145], ['3', 100, 295], ['4', 340, 295]].forEach(function (o) {
      steps.push(
        paso('Muestra la casilla ' + o[0],
          'Arrastra otro <em>Escribir texto en pantalla</em>: X=<b>' + o[1] + '</b>, Y=<b>' + o[2] + '</b>, color blanco, tamaño <b>28</b>.',
          'Inicio', 'game_show_text', 'Escribir texto en pantalla'),
        pasoGet('opcion' + o[0], 'Arrastra <em>obtener opcion' + o[0] + '</em> al hueco de texto.')
      );
    });

    steps.push(
      paso('Si haces clic en el tablero',
        'Ve a <b>Lógica</b> y arrastra un <em>Si … hacer</em>, debajo de las 4 casillas.',
        'Lógica', 'controls_if', 'Si … hacer'),
      paso('Dos condiciones a la vez: "y"',
        'Ve a <b>Lógica</b> y arrastra el bloque <em>y</em> a la condición del <em>Si</em>: queremos que haya clic <b>y</b> que sea dentro del tablero (no en los títulos).',
        'Lógica', 'logic_operation', 'y'),
      paso('Detecta el clic izquierdo',
        'Ve a <b>Inicio</b> y arrastra <em>¿Clic izquierdo?</em> al primer hueco del <em>y</em>.',
        'Inicio', 'mouse_left_clicked', '¿Clic izquierdo?'),
      paso('Compara la altura del clic',
        'Ve a <b>Lógica</b> y arrastra una comparación al segundo hueco del <em>y</em>. Cambia el operador a <b>&gt;</b>.',
        'Lógica', 'logic_compare', '> (mayor que)'),
      paso('Obtén la posición Y del mouse',
        'Ve a <b>Inicio</b> y arrastra <em>Posición Y del mouse</em> al primer hueco de la comparación.',
        'Inicio', 'mouse_y', 'Posición Y del mouse'),
      pasoNumero(60, 'Arrastra un <em>Número</em> con valor <b>60</b> al segundo hueco: solo cuentan los clics por debajo de la franja de títulos.'),

      pasoSet('Calcula la columna del clic', 'columna',
        'Arrastra <em>Establecer columna a</em> <b>dentro del hacer</b>. Será 0 si clicaste a la izquierda o 1 a la derecha.'),
      paso('Convierte la columna a entero',
        'Ve a <b>Matemáticas</b> y arrastra <em>a entero</em> al hueco de <em>Establecer columna a</em>: se queda solo con la parte entera (0 o 1).',
        'Matemáticas', 'convert_to_int', 'a entero'),
      paso('Divide X entre 240',
        'Ve a <b>Matemáticas</b> y arrastra un bloque de operación dentro de <em>a entero</em>. Cambia el operador a <b>÷</b>.',
        'Matemáticas', 'math_arithmetic', '÷ (división)'),
      paso('Obtén la posición X del mouse',
        'Ve a <b>Inicio</b> y arrastra <em>Posición X del mouse</em> al primer hueco de la división.',
        'Inicio', 'mouse_x', 'Posición X del mouse'),
      pasoNumero(240, 'Arrastra un <em>Número</em> con valor <b>240</b> (el ancho de un cuadrado) al segundo hueco de la división.'),

      pasoSet('Calcula la fila del clic', 'fila',
        'Arrastra <em>Establecer fila a</em>, debajo del anterior. Será 0 si clicaste arriba o 1 abajo.'),
      paso('Convierte la fila a entero',
        'Ve a <b>Matemáticas</b> y arrastra otro <em>a entero</em> al hueco de <em>Establecer fila a</em>.',
        'Matemáticas', 'convert_to_int', 'a entero'),
      paso('Divide entre 150',
        'Arrastra otro bloque de operación dentro de <em>a entero</em> y cambia el operador a <b>÷</b>.',
        'Matemáticas', 'math_arithmetic', '÷ (división)'),
      paso('Resta la franja de títulos',
        'Arrastra otro bloque de operación al <b>primer</b> hueco de la división y cambia el operador a <b>−</b>. Como el tablero empieza en Y=60, primero le quitamos esos 60 píxeles: fila = entero((Y − 60) ÷ 150).',
        'Matemáticas', 'math_arithmetic', '− (resta)'),
      paso('Obtén la posición Y del mouse',
        'Arrastra <em>Posición Y del mouse</em> al primer hueco de la resta.',
        'Inicio', 'mouse_y', 'Posición Y del mouse'),
      pasoNumero(60, 'Arrastra un <em>Número</em> con valor <b>60</b> al segundo hueco de la resta.'),
      pasoNumero(150, 'Arrastra un <em>Número</em> con valor <b>150</b> (el alto de un cuadrado) al segundo hueco de la división.'),

      pasoSet('Calcula qué casilla tocaste', 'zona_clic',
        'Arrastra <em>Establecer zona_clic a</em>, debajo del anterior. Con la fila y la columna sacamos un número del 1 al 4, igual que zona_correcta: zona_clic = fila × 2 + (columna + 1).'),
      paso('Suma principal',
        'Ve a <b>Matemáticas</b> y arrastra un bloque de operación <em>+</em> al hueco de <em>Establecer zona_clic a</em>.',
        'Matemáticas', 'math_arithmetic', '+ (suma)'),
      paso('Multiplica fila × 2',
        'Arrastra otro bloque de operación al <b>primer</b> hueco de la suma y cambia el operador a <b>×</b>.',
        'Matemáticas', 'math_arithmetic', '× (multiplicación)'),
      pasoGet('fila', 'Arrastra <em>obtener fila</em> al primer hueco de la multiplicación.'),
      pasoNumero(2, 'Arrastra un <em>Número</em> con valor <b>2</b> al segundo hueco de la multiplicación.'),
      paso('Suma columna + 1',
        'Arrastra otro bloque de operación <em>+</em> al <b>segundo</b> hueco de la suma principal.',
        'Matemáticas', 'math_arithmetic', '+ (suma)'),
      pasoGet('columna', 'Arrastra <em>obtener columna</em> al primer hueco de esta segunda suma.'),
      pasoNumero(1, 'Arrastra un <em>Número</em> con valor <b>1</b> al segundo hueco de esta segunda suma.'),

      paso('¿Acertaste o no?',
        'Ve a <b>Lógica</b> y arrastra otro <em>Si … hacer</em>, debajo de <em>Establecer zona_clic</em> (todavía dentro del <em>Si</em> del clic). Haz clic en el <b>⚙️</b> (engranaje) y agrégale un <b>si no</b>: lo usaremos para avisar cuando la respuesta sea incorrecta.',
        'Lógica', 'controls_if', 'Si … hacer'),
      paso('Compara zona_clic = zona_correcta',
        'Ve a <b>Lógica</b> y arrastra una comparación <em>=</em> a la condición.',
        'Lógica', 'logic_compare', '= (comparar)'),
      pasoGet('zona_clic', 'Arrastra <em>obtener zona_clic</em> al primer hueco.'),
      pasoGet('zona_correcta', 'Arrastra <em>obtener zona_correcta</em> al segundo hueco.'),

      pasoSet('Acertaste: suma un punto', 'puntos',
        'Arrastra <em>Establecer puntos a</em> dentro del <b>hacer</b> (la rama de "acertaste"). Revisa que el desplegable diga <b>puntos</b>.'),
      paso('puntos + 1',
        'Ve a <b>Matemáticas</b> y arrastra un bloque de operación <em>+</em>.',
        'Matemáticas', 'math_arithmetic', '+ (suma)'),
      pasoGet('puntos', 'Arrastra <em>obtener puntos</em> al primer hueco de la suma.'),
      pasoNumero(1, 'Arrastra un <em>Número</em> con valor <b>1</b> al segundo hueco.'),
      paso('Pantalla verde',
        'Todavía en la rama de "acertaste", ve a <b>Inicio</b> y arrastra <em>rectángulo sólido</em>: X=<b>0</b>, Y=<b>0</b>, ancho=<b>480</b>, alto=<b>360</b>, color verde (<b>#1b5e20</b>).',
        'Inicio', 'game_draw_rect', 'rectángulo sólido'),
      paso('Muestra "¡Correcto!"',
        'Arrastra <em>Escribir texto en pantalla</em>. Escribe <b>¡Correcto! +1</b>, X=<b>150</b>, Y=<b>190</b>, color blanco, tamaño <b>28</b>.',
        'Inicio', 'game_show_text', 'Escribir texto en pantalla'),
      paso('Espera un momento',
        'Ve a <b>Inicio</b> y arrastra <em>esperar … segundos</em> con <b>0.7</b>: así alcanzas a leer el aviso.',
        'Inicio', 'game_wait', 'esperar … segundos'),
      paso('Siguiente pregunta',
        'Ve a <b>Funciones</b> y arrastra otro <em>nueva_pregunta</em> como último bloque de la rama de "acertaste".',
        'Funciones', 'procedures_callnoreturn', 'nueva_pregunta'),
      {
        titulo: 'Ahora la rama "si no" (fallaste)',
        desc: 'Baja hasta la sección <b>si no</b> del mismo bloque. Todo lo que sigue va ahí dentro y se ejecuta cuando la respuesta fue incorrecta.',
        highlightCat: null, bloque: null
      },
      paso('Pantalla roja',
        'Dentro del <b>si no</b>, arrastra <em>rectángulo sólido</em>: X=<b>0</b>, Y=<b>0</b>, ancho=<b>480</b>, alto=<b>360</b>, color rojo (<b>#7f1d1d</b>).',
        'Inicio', 'game_draw_rect', 'rectángulo sólido'),
      paso('Muestra la respuesta correcta',
        'Arrastra <em>Escribir texto en pantalla</em>: X=<b>150</b>, Y=<b>190</b>, color blanco, tamaño <b>28</b>.',
        'Inicio', 'game_show_text', 'Escribir texto en pantalla'),
      paso('Une "Era: " con la respuesta',
        'Ve a <b>Textos</b> y arrastra <em>crear texto con</em> al hueco de texto del bloque anterior.',
        'Textos', 'text_join', 'crear texto con'),
      paso('Escribe "Era: "',
        'Arrastra un bloque de texto <em>" "</em> al primer hueco y escribe <b>Era: </b> (con un espacio al final).',
        'Textos', 'text', 'texto'),
      pasoGet(v, 'Arrastra <em>obtener ' + v + '</em> al segundo hueco: así ves cuál era la respuesta real.'),
      paso('Espera un momento (si fallaste)',
        'Arrastra otro <em>esperar … segundos</em> con <b>1</b>: un poco más que al acertar, para leer la respuesta.',
        'Inicio', 'game_wait', 'esperar … segundos'),
      paso('Siguiente pregunta (si fallaste)',
        'Arrastra otro <em>nueva_pregunta</em> como último bloque del <b>si no</b>: aciertes o falles, siempre pasas a la próxima.',
        'Funciones', 'procedures_callnoreturn', 'nueva_pregunta'),
      paso('Avanza al siguiente fotograma',
        'Ve a <b>Inicio</b> y arrastra <em>Siguiente frame</em> como <b>último bloque del ciclo</b> (fuera del <em>Si</em> del clic).',
        'Inicio', 'game_frame', 'Siguiente frame'),
      {
        titulo: 'Abre la vista de juego',
        desc: 'Usa la <b>vista de juego</b> para ver el tablero de 4 cuadrados.',
        highlightElement: '#btnGame'
      },
      {
        titulo: 'Juega y calcula',
        desc: 'Ejecuta el programa y haz clic en el cuadrado con el ' + n + ' correcto. La pantalla se pone verde si acertaste o roja si fallaste (con la respuesta real), y enseguida aparece otra pregunta con la respuesta en otro cuadrado: ¡hay que calcular cada vez!',
        highlightElement: '#btnGameRun'
      }
    );

    return { title: c.title, icon: c.icon, diagram: '', steps: steps };
  }

  var tutorials = {
    juego_direcciones: {
      title: '¡A Moverse! Direcciones en Acción',
      icon: '🕹️',
      diagram: '',
      steps: [
        {
          titulo: '¿Qué aprenderemos?',
          desc: 'Crearás un primer juego donde el personaje se mueve por <b>direcciones</b> usando las flechas del teclado. Vas a practicar cómo armar la lógica del juego bloque a bloque.',
          highlightCat: null, bloque: null
        },
        {
          titulo: 'Crea un proyecto nuevo',
          desc: 'Antes de empezar, abrí el menú <b>Archivo</b> y hacé clic en <b>Nuevo</b> <span class="icon-btn icon-new"></span> para partir de un workspace limpio (si tenías algo sin guardar, te va a pedir confirmación antes de borrarlo).',
          highlightElement: '#btnArchivo'
        },
        {
          titulo: 'Abre la categoría Inicio',
          desc: 'Haz clic en <b>Inicio</b> en el panel de bloques. Ahí están todos los bloques de juego: pantalla, personaje, teclado y dibujo.',
          highlightCat: 'Inicio', expandCat: null, bloque: null
        },
        {
          titulo: 'Arrastra: Iniciar juego',
          desc: 'Arrastra el bloque <em>Iniciar juego</em> al área de trabajo. Configura ancho <b>480</b> y alto <b>360</b>: este bloque va siempre de primero.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_start', bloqueLabel: 'Iniciar juego'
        },
        {
          titulo: 'Arrastra: Crear personaje',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Crear personaje</em> justo después. Déjalo en el centro de la pantalla, por ejemplo X=<b>240</b>, Y=<b>180</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_create', bloqueLabel: 'Crear personaje'
        },
        {
          titulo: 'Agrega el ciclo del juego',
          desc: 'Ve a <b>Ciclos</b> y arrastra el bloque <em>Repetir mientras Verdadero</em> después de crear el personaje. Todo lo que se mueve o dibuja en el juego va <b>dentro</b> de este ciclo.',
          highlightCat: 'Ciclos', expandCat: null, bloque: 'controls_whileUntil', bloqueLabel: 'Repetir mientras Verdadero'
        },
        {
          titulo: 'Dentro del ciclo: limpia la pantalla',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Limpiar pantalla</em> como primer bloque <b>dentro</b> del ciclo. Borra el fotograma anterior antes de dibujar el siguiente.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_clear', bloqueLabel: 'Limpiar pantalla'
        },
        {
          titulo: 'Condición: flecha arriba',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>Si … hacer</em> dentro del ciclo, después de <em>Limpiar pantalla</em>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Detecta la flecha arriba',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>¿Tecla presionada?</em> en el hueco de la condición. Selecciona <b>↑ Arriba</b> en el desplegable.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'key_is_pressed', bloqueLabel: '¿Tecla presionada?'
        },
        {
          titulo: 'Mueve el personaje hacia arriba',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Mover personaje</em> dentro del <b>hacer</b>. Usa dx=<b>0</b>, dy=<b>-4</b> para subir.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_move', bloqueLabel: 'Mover personaje'
        },
        {
          titulo: 'Condición: flecha abajo',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>, después del anterior.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Detecta la flecha abajo',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>¿Tecla presionada?</em> en la condición. Selecciona <b>↓ Abajo</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'key_is_pressed', bloqueLabel: '¿Tecla presionada?'
        },
        {
          titulo: 'Mueve el personaje hacia abajo',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Mover personaje</em> dentro del <b>hacer</b>. Usa dx=<b>0</b>, dy=<b>4</b> para bajar.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_move', bloqueLabel: 'Mover personaje'
        },
        {
          titulo: 'Condición: flecha izquierda',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Detecta la flecha izquierda',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>¿Tecla presionada?</em>. Selecciona <b>← Izquierda</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'key_is_pressed', bloqueLabel: '¿Tecla presionada?'
        },
        {
          titulo: 'Mueve el personaje hacia la izquierda',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Mover personaje</em>. Usa dx=<b>-4</b>, dy=<b>0</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_move', bloqueLabel: 'Mover personaje'
        },
        {
          titulo: 'Condición: flecha derecha',
          desc: 'Ve a <b>Lógica</b> y arrastra el último bloque <em>Si … hacer</em>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Detecta la flecha derecha',
          desc: 'Ve a <b>Inicio</b> y arrastra el último bloque <em>¿Tecla presionada?</em>. Selecciona <b>→ Derecha</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'key_is_pressed', bloqueLabel: '¿Tecla presionada?'
        },
        {
          titulo: 'Mueve el personaje hacia la derecha',
          desc: 'Ve a <b>Inicio</b> y arrastra el último bloque <em>Mover personaje</em>. Usa dx=<b>4</b>, dy=<b>0</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_move', bloqueLabel: 'Mover personaje'
        },
        {
          titulo: 'Dibuja el personaje',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Dibujar personaje</em> dentro del ciclo, después de los 4 <em>Si … hacer</em>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_draw', bloqueLabel: 'Dibujar personaje'
        },
        {
          titulo: 'Avanza al siguiente fotograma',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Siguiente frame</em> como último bloque del ciclo. Sin él, el juego no avanza fotograma a fotograma.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_frame', bloqueLabel: 'Siguiente frame'
        },
        {
          titulo: 'Abre la vista de juego',
          desc: 'Tu lógica ya está lista. Haz clic en el botón de <b>Vista Juego</b> para ver el canvas y comprobar cómo luce tu escena.',
          highlightElement: '#btnGame'
        },
        {
          titulo: 'Prueba y mejora',
          desc: 'Ejecuta tu proyecto y muévete con las flechas. Ajusta la velocidad (dx/dy) y la posición inicial hasta que funcione como quieres.',
          highlightElement: '#btnGameRun'
        }
      ]
    },

    juego_calculadora_basica: {
      title: 'Calculadora con Botones', icon: '🧮', diagram: '',
      steps: [
        {
          titulo: '¿Qué aprenderemos?',
          desc: 'Vamos a construir una <b>calculadora con botones en pantalla</b>: una cuadrícula de 16 botones grandes (dígitos, +, -, X, /, = y C) que respondés haciendo clic con el mouse, igual que una calculadora de verdad. Son muchos pasos porque hay 16 botones — pero el patrón se repite una y otra vez, así que después de los primeros te vas a dar cuenta solo.',
          highlightCat: null, bloque: null
        },
        {
          titulo: 'Crea un proyecto nuevo',
          desc: 'Antes de empezar, abrí el menú <b>Archivo</b> y hacé clic en <b>Nuevo</b> <span class="icon-btn icon-new"></span> para partir de un workspace limpio (si tenías algo sin guardar, te va a pedir confirmación antes de borrarlo).',
          highlightElement: '#btnArchivo'
        },

        /* ───────────── Variables ───────────── */
        {
          titulo: 'Crea la variable numero',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>numero</b>: guarda el último dígito que se apretó.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'numero', expandCat: null, bloque: null
        },
        {
          titulo: 'Crea la variable posicion_x',
          desc: 'Ve a <b>Variables</b> y crea <b>posicion_x</b>: controla en qué lugar de la pantalla se dibuja el próximo dígito que escribas.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'posicion_x', expandCat: null, bloque: null
        },
        {
          titulo: 'Crea la variable operacion',
          desc: 'Ve a <b>Variables</b> y crea <b>operacion</b>: guarda qué botón de +,-,X,/ se apretó por última vez.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'operacion', expandCat: null, bloque: null
        },
        {
          titulo: 'Crea la variable numero1',
          desc: 'Ve a <b>Variables</b> y crea <b>numero1</b>: el primer número de la cuenta (como texto, para poder ir pegando dígitos).',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'numero1', expandCat: null, bloque: null
        },
        {
          titulo: 'Crea la variable numero2',
          desc: 'Ve a <b>Variables</b> y crea <b>numero2</b>: el segundo número de la cuenta.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'numero2', expandCat: null, bloque: null
        },
        {
          titulo: 'Crea la variable indice_num',
          desc: 'Ve a <b>Variables</b> y crea <b>indice_num</b>: vale <b>0</b> mientras escribís el primer número, y <b>1</b> mientras escribís el segundo.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'indice_num', expandCat: null, bloque: null
        },
        {
          titulo: 'Crea la variable guardar_resultado',
          desc: 'Ve a <b>Variables</b> y crea <b>guardar_resultado</b>: ahí queda el resultado cuando apretás "=".',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'guardar_resultado', expandCat: null, bloque: null
        },
        {
          titulo: 'Crea la variable digito_presionado',
          desc: 'Ve a <b>Variables</b> y crea <b>digito_presionado</b>: queda en <b>verdadero</b> justo el instante en que se apretó un dígito (0-9), para saber cuándo agregarlo al número.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'digito_presionado', expandCat: null, bloque: null
        },

        /* ───────────── Inicializar ───────────── */
        {
          titulo: 'Inicializa numero en 0',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer numero a</em> al área de trabajo. Conectale un bloque <em>Número</em> (de <b>Matemáticas</b>) con valor <b>0</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Inicializa posicion_x en 15',
          desc: 'Arrastra <em>Establecer posicion_x a</em>, debajo del anterior. Conectale un <em>Número</em> con valor <b>15</b> — ahí empieza a escribirse el primer dígito (el margen izquierdo de la pantalla).',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Inicializa operacion vacía',
          desc: 'Arrastra <em>Establecer operacion a</em>. Ve a <b>Textos</b> y conectale un bloque de <em>texto</em> vacío (sin escribir nada adentro).',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Inicializa numero1 vacío',
          desc: 'Arrastra <em>Establecer numero1 a</em> y conectale otro bloque de <em>texto</em> vacío.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Inicializa numero2 vacío',
          desc: 'Arrastra <em>Establecer numero2 a</em> y conectale otro bloque de <em>texto</em> vacío.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Inicializa indice_num en 0',
          desc: 'Arrastra <em>Establecer indice_num a</em> y conectale un <em>Número</em> con valor <b>0</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Inicializa digito_presionado en falso',
          desc: 'Arrastra <em>Establecer digito_presionado a</em>. Ve a <b>Lógica</b> y conectale el bloque <em>verdadero/falso</em>, dejalo en <b>falso</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },

        /* ───────────── Pantalla ───────────── */
        {
          titulo: 'Abre la categoría Inicio',
          desc: 'Haz clic en <b>Inicio</b> en el panel de bloques: ahí están los bloques de pantalla, dibujo y mouse que vamos a usar todo el tutorial.',
          highlightCat: 'Inicio', expandCat: null, bloque: null
        },
        {
          titulo: 'Arrastra: Iniciar juego',
          desc: 'Arrastra el bloque <em>Iniciar juego</em>, como último bloque de todas las inicializaciones. Configura ancho <b>280</b> y alto <b>410</b> — un tamaño cómodo para botones grandes.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_start', bloqueLabel: 'Iniciar juego'
        },

        /* ───────────── Dibujar los 16 botones ───────────── */
        {
          titulo: 'Dibuja el botón "7" (el fondo)',
          desc: 'Arrastra el bloque <em>rectángulo sólido</em>, después de "Iniciar juego". Ponlo en X=<b>15</b>, Y=<b>140</b>, ancho=<b>55</b>, alto=<b>55</b>, color gris (<b>#999999</b>). Cada botón de la calculadora es un cuadrado grande de 55×55 así.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido'
        },
        {
          titulo: 'Dibuja el botón "7" (el número)',
          desc: 'Arrastra <em>Escribir texto en pantalla</em>, justo debajo. Escribe <b>"7"</b>, en X=<b>35</b>, Y=<b>174</b> (el centro del cuadrado), color blanco, tamaño <b>24</b>. Esta pareja de 2 bloques (fondo + número) se repite para los otros 15 botones — de acá en más vas a armar lo mismo, cambiando posición y texto.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        { titulo: 'Botón "8"', desc: 'Repetí el mismo par de bloques (rectángulo + texto): X=<b>80</b> Y=<b>140</b> para el fondo, texto <b>"8"</b> en X=<b>100</b> Y=<b>174</b>.', highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido' },
        { titulo: 'Botón "9"', desc: 'Fondo en X=<b>145</b> Y=<b>140</b>; texto <b>"9"</b> en X=<b>165</b> Y=<b>174</b>.', highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido' },
        { titulo: 'Botón "/"', desc: 'Fondo en X=<b>210</b> Y=<b>140</b>; texto <b>"/"</b> en X=<b>230</b> Y=<b>174</b>.', highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido' },
        { titulo: 'Botón "4"', desc: 'Fondo en X=<b>15</b> Y=<b>205</b>; texto <b>"4"</b> en X=<b>35</b> Y=<b>239</b>.', highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido' },
        { titulo: 'Botón "5"', desc: 'Fondo en X=<b>80</b> Y=<b>205</b>; texto <b>"5"</b> en X=<b>100</b> Y=<b>239</b>.', highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido' },
        { titulo: 'Botón "6"', desc: 'Fondo en X=<b>145</b> Y=<b>205</b>; texto <b>"6"</b> en X=<b>165</b> Y=<b>239</b>.', highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido' },
        { titulo: 'Botón "X" (multiplicar)', desc: 'Fondo en X=<b>210</b> Y=<b>205</b>; texto <b>"X"</b> mayúscula en X=<b>230</b> Y=<b>239</b>. <b>Importante:</b> tiene que ser mayúscula, lo vamos a comparar así más adelante.', highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido' },
        { titulo: 'Botón "1"', desc: 'Fondo en X=<b>15</b> Y=<b>270</b>; texto <b>"1"</b> en X=<b>35</b> Y=<b>304</b>.', highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido' },
        { titulo: 'Botón "2"', desc: 'Fondo en X=<b>80</b> Y=<b>270</b>; texto <b>"2"</b> en X=<b>100</b> Y=<b>304</b>.', highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido' },
        { titulo: 'Botón "3"', desc: 'Fondo en X=<b>145</b> Y=<b>270</b>; texto <b>"3"</b> en X=<b>165</b> Y=<b>304</b>.', highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido' },
        { titulo: 'Botón "-"', desc: 'Fondo en X=<b>210</b> Y=<b>270</b>; texto <b>"-"</b> en X=<b>230</b> Y=<b>304</b>.', highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido' },
        { titulo: 'Botón "C" (limpiar)', desc: 'Fondo en X=<b>15</b> Y=<b>335</b>; texto <b>"C"</b> en X=<b>35</b> Y=<b>369</b> — borra todo y empieza de nuevo.', highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido' },
        { titulo: 'Botón "0"', desc: 'Fondo en X=<b>80</b> Y=<b>335</b>; texto <b>"0"</b> en X=<b>100</b> Y=<b>369</b>.', highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido' },
        { titulo: 'Botón "="', desc: 'Fondo en X=<b>145</b> Y=<b>335</b>; texto <b>"="</b> en X=<b>165</b> Y=<b>369</b>.', highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido' },
        { titulo: 'Botón "+"', desc: 'Fondo en X=<b>210</b> Y=<b>335</b>; texto <b>"+"</b> en X=<b>230</b> Y=<b>369</b>. ¡Listo, los 16 botones ya están dibujados!', highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido' },

        /* ───────────── El ciclo y la detección de clic ───────────── */
        {
          titulo: 'Agrega el ciclo del juego',
          desc: 'Ve a <b>Ciclos</b> y arrastra <em>Repetir mientras Verdadero</em>, como último bloque, después de dibujar los botones. Todo lo que detecta clics va <b>dentro</b> de este ciclo.',
          highlightCat: 'Ciclos', expandCat: null, bloque: 'controls_whileUntil', bloqueLabel: 'Repetir mientras Verdadero'
        },
        {
          titulo: 'Detecta si se hizo clic',
          desc: 'Ve a <b>Lógica</b> y arrastra <em>Si ... hacer</em>, dentro del ciclo. En el hueco de la condición, ve a <b>Inicio</b> y arrastra el bloque <em>¿Se hizo clic?</em>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Bloque: ¿Se hizo clic?',
          desc: 'Ve a <b>Inicio</b> y arrastra <em>¿Se hizo clic?</em> dentro del hueco de la condición del "Si" que acabás de poner. Todo lo que sigue va <b>dentro</b> de este "Si".',
          highlightCat: 'Inicio', expandCat: null, bloque: 'mouse_clicked', bloqueLabel: '¿Se hizo clic?'
        },

        /* ───────────── Botón 7: el patrón completo de un dígito ───────────── */
        {
          titulo: '¿En qué botón hiciste clic? — el truco',
          desc: 'Para saber qué botón tocaste, comparamos la posición X e Y del clic contra el cuadrado de cada botón (55×55). Vamos a armar eso para el botón <b>7</b> (X entre 15 y 70, Y entre 140 y 195) paso a paso — después para los demás botones es exactamente lo mismo, solo cambian los números.',
          highlightCat: null, bloque: null
        },
        {
          titulo: 'Si X está en el rango del botón 7',
          desc: 'Dentro del "Si ¿Se hizo clic?", ve a <b>Lógica</b> y arrastra otro <em>Si ... hacer</em>. En su condición vas a armar "X es mayor o igual a 15 Y X es menor o igual a 70".',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Arma la condición "Y" (AND)',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>... y ...</em> (operación lógica) en el hueco de la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_operation', bloqueLabel: '… y …'
        },
        {
          titulo: 'X mayor o igual a 15',
          desc: 'Ve a <b>Lógica</b> y arrastra un bloque de <em>comparación</em> (▼) en el primer hueco del "y". Cambialo a <b>≥</b>. A la izquierda va el bloque <em>Posición X del mouse</em> (de <b>Inicio</b>); a la derecha un <em>Número</em> con valor <b>15</b>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: 'comparación'
        },
        {
          titulo: 'X menor o igual a 70',
          desc: 'Arrastra otro bloque de <em>comparación</em> en el segundo hueco del "y", cambialo a <b>≤</b>. Izquierda: <em>Posición X del mouse</em> otra vez. Derecha: <em>Número</em> con valor <b>70</b>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: 'comparación'
        },
        {
          titulo: 'Bloque: Posición X del mouse',
          desc: 'Ve a <b>Inicio</b> y arrastra <em>Posición X del mouse</em> — lo necesitás dos veces (una en cada comparación que armaste).',
          highlightCat: 'Inicio', expandCat: null, bloque: 'mouse_x', bloqueLabel: 'Posición X del mouse'
        },
        {
          titulo: 'Dentro: si Y está en el rango del botón 7',
          desc: '<b>Dentro</b> del "Si" que acabás de armar (el de X), ve a <b>Lógica</b> y arrastra otro <em>Si ... hacer</em>. Armá la misma condición "y" pero con <em>Posición Y del mouse</em> (de <b>Inicio</b>), <b>≥ 140</b> y <b>≤ 195</b>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Bloque: Posición Y del mouse',
          desc: 'Ve a <b>Inicio</b> y arrastra <em>Posición Y del mouse</em> — también lo necesitás dos veces, en las dos comparaciones de Y.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'mouse_y', bloqueLabel: 'Posición Y del mouse'
        },
        {
          titulo: 'Registra el dígito 7',
          desc: '<b>Dentro</b> del "Si" de Y (el más adentro de todos), ve a <b>Variables</b> y arrastra <em>Establecer numero a</em>. Conectale un <em>Número</em> con valor <b>7</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Marca que se apretó un dígito',
          desc: 'Justo debajo, arrastra <em>Establecer digito_presionado a</em> y conectale el bloque <em>verdadero/falso</em> (de <b>Lógica</b>) en <b>verdadero</b>. ¡El botón 7 ya está completo! Los demás dígitos son exactamente esta misma estructura (dos "Si" anidados + estos dos "Establecer"), cambiando solo los 4 números del rango y el dígito.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },

        /* ───────────── Resto de los dígitos (compacto) ───────────── */
        { titulo: 'Botón 8: detectar y registrar', desc: 'Repetí toda la estructura del botón 7 (los dos "Si" anidados + los dos "Establecer"), como nuevo bloque <b>afuera</b> del "Si" del 7 (mismo nivel, no adentro). Rango: X 80-135, Y 140-195. <em>numero</em> = <b>8</b>, <em>digito_presionado</em> = verdadero.', highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer' },
        { titulo: 'Botón 9: detectar y registrar', desc: 'Misma estructura. Rango: X 145-200, Y 140-195. <em>numero</em> = <b>9</b>.', highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer' },
        { titulo: 'Botón 4: detectar y registrar', desc: 'Misma estructura. Rango: X 15-70, Y 205-260. <em>numero</em> = <b>4</b>.', highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer' },
        { titulo: 'Botón 5: detectar y registrar', desc: 'Misma estructura. Rango: X 80-135, Y 205-260. <em>numero</em> = <b>5</b>.', highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer' },
        { titulo: 'Botón 6: detectar y registrar', desc: 'Misma estructura. Rango: X 145-200, Y 205-260. <em>numero</em> = <b>6</b>.', highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer' },
        { titulo: 'Botón 1: detectar y registrar', desc: 'Misma estructura. Rango: X 15-70, Y 270-325. <em>numero</em> = <b>1</b>.', highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer' },
        { titulo: 'Botón 2: detectar y registrar', desc: 'Misma estructura. Rango: X 80-135, Y 270-325. <em>numero</em> = <b>2</b>.', highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer' },
        { titulo: 'Botón 3: detectar y registrar', desc: 'Misma estructura. Rango: X 145-200, Y 270-325. <em>numero</em> = <b>3</b>.', highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer' },
        { titulo: 'Botón 0: detectar y registrar', desc: 'Misma estructura. Rango: X 80-135, Y 335-390. <em>numero</em> = <b>0</b>. Con este ya tenés los 10 dígitos funcionando.', highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer' },

        /* ───────────── Operadores ───────────── */
        {
          titulo: 'Botón "/": arma la detección',
          desc: 'Afuera de los "Si" de los dígitos, armá la misma estructura de dos "Si" anidados para el botón <b>/</b>: rango X 210-265, Y 140-195 (volvé a los pasos del botón 7 si te perdiste con los bloques de comparación).',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Guarda la operación "/"',
          desc: 'Dentro del "Si" de Y, ve a <b>Variables</b> y arrastra <em>Establecer operacion a</em>. Conectale un bloque de <em>texto</em> (<b>Textos</b>) con el símbolo <b>"/"</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Avanza indice_num',
          desc: 'Justo debajo, ve a <b>Variables</b> y arrastra <em>Cambiar indice_num por</em>. Dejalo en <b>1</b> — así el próximo dígito que escribas va al <em>numero2</em> en vez de al <em>numero1</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'math_change', bloqueLabel: 'Cambiar variable por'
        },
        {
          titulo: 'Muestra el símbolo "/" en pantalla',
          desc: 'Justo debajo, ve a <b>Inicio</b> y arrastra <em>Escribir texto en pantalla</em>. En el hueco de texto metele <em>obtener operacion</em> (<b>Variables</b>) en vez de escribir texto fijo — así siempre muestra el símbolo que acabás de guardar. X=<em>obtener posicion_x</em>, Y=<b>50</b>, color blanco, tamaño <b>24</b>. Sin este paso el símbolo de la operación nunca aparecería en pantalla.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Avanza posicion_x para el símbolo',
          desc: 'Por último de este botón, arrastra <em>Cambiar posicion_x por</em> con valor <b>18</b> — así el siguiente dígito que teclees aparece después del símbolo, no encima.',
          highlightCat: 'Variables', expandCat: null, bloque: 'math_change', bloqueLabel: 'Cambiar variable por'
        },
        { titulo: 'Botón "X" (multiplicar): detectar y guardar', desc: 'Misma estructura completa (dos "Si" + Establecer operacion + Cambiar indice_num + mostrar símbolo + Cambiar posicion_x). Rango: X 210-265, Y 205-260. <em>operacion</em> = <b>"X"</b> mayúscula.', highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer' },
        { titulo: 'Botón "-": detectar y guardar', desc: 'Misma estructura completa. Rango: X 210-265, Y 270-325. <em>operacion</em> = <b>"-"</b>.', highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer' },
        { titulo: 'Botón "+": detectar y guardar', desc: 'Misma estructura completa. Rango: X 210-265, Y 335-390. <em>operacion</em> = <b>"+"</b>. Los 4 operadores ya están listos, y ahora su símbolo se ve en pantalla apenas los tocás.', highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer' },

        /* ───────────── Botón "=" ───────────── */
        {
          titulo: 'Botón "=": arma la detección',
          desc: 'Armá la estructura de dos "Si" anidados para <b>=</b>: rango X 145-200, Y 335-390. Todo lo que sigue va dentro del "Si" de Y.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Reinicia indice_num',
          desc: 'Primero, ve a <b>Variables</b> y arrastra <em>Establecer indice_num a</em> con <b>0</b> — para que la próxima cuenta empiece escribiendo de nuevo en numero1.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Si la operación fue "/"',
          desc: 'Ve a <b>Lógica</b> y arrastra otro <em>Si ... hacer</em>, debajo. Hacé clic en el <b>⚙️</b> (engranaje) del bloque y arrastrale <b>3 "si no, si"</b> (else if) adentro — vas a necesitar 4 condiciones en total, una por operador.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Condición: operacion = "/"',
          desc: 'En la primera condición, ve a <b>Lógica</b> y arrastra <em>comparación</em> con <b>=</b>. Izquierda: <em>obtener operacion</em> (<b>Variables</b>). Derecha: <em>texto</em> <b>"/"</b>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: 'comparación'
        },
        {
          titulo: 'Calcula la división',
          desc: 'Dentro del primer "hacer", ve a <b>Variables</b> y arrastra <em>Establecer guardar_resultado a</em>. Conectale un bloque <em>÷ (división)</em> de <b>Matemáticas</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Convierte numero1 y numero2 a número',
          desc: 'numero1/numero2 son <b>texto</b> (vas pegando dígitos) — para hacer cuentas hay que convertirlos. Ve a <b>Matemáticas</b> y arrastra dos bloques <em>convertir a entero</em>, uno en cada hueco de la división. Dentro de cada uno, desde <b>Variables</b>, metele <em>obtener numero1</em> y <em>obtener numero2</em> respectivamente.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'convert_to_int', bloqueLabel: 'convertir a entero'
        },
        {
          titulo: 'Condición: operacion = "X"',
          desc: 'En la segunda condición ("si no, si"), misma comparación pero contra el texto <b>"X"</b> mayúscula.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: 'comparación'
        },
        {
          titulo: 'Calcula la multiplicación',
          desc: 'En su "hacer", <em>Establecer guardar_resultado a</em> con un bloque <em>× (multiplicación)</em>, mismos <em>convertir a entero</em> de numero1/numero2 adentro.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Condición: operacion = "-"',
          desc: 'Tercera condición: comparación contra el texto <b>"-"</b>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: 'comparación'
        },
        {
          titulo: 'Calcula la resta',
          desc: '<em>Establecer guardar_resultado a</em> con un bloque <em>− (resta)</em>, mismos <em>convertir a entero</em> adentro.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Condición: operacion = "+"',
          desc: 'Cuarta condición: comparación contra el texto <b>"+"</b>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: 'comparación'
        },
        {
          titulo: 'Calcula la suma',
          desc: '<em>Establecer guardar_resultado a</em> con un bloque <em>+ (suma)</em>, mismos <em>convertir a entero</em> adentro. Las 4 operaciones ya están armadas.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Borra toda la pantalla de arriba',
          desc: 'Debajo de todo el "Si/si no si" (ya afuera de él, pero todavía dentro del "="), ve a <b>Inicio</b> y arrastra <em>rectángulo sólido</em>: X=<b>0</b>, Y=<b>0</b>, ancho=<b>280</b>, alto=<b>130</b>, color <b>#1a1a2e</b> (el mismo gris azulado de fondo). Borra de un solo golpe toda la franja superior (lo que tecleaste y cualquier resultado viejo) antes de mostrar el resultado nuevo — así no quedan restos de texto.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido'
        },
        {
          titulo: 'Muestra el resultado',
          desc: 'Debajo, arrastra <em>Escribir texto en pantalla</em>. En el hueco de texto metele <em>obtener guardar_resultado</em> (<b>Variables</b>). X=<b>15</b>, Y=<b>90</b>, color blanco, tamaño <b>24</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Vacía numero1 y numero2',
          desc: 'Arrastra <em>Establecer numero1 a</em> con <em>texto</em> vacío, y debajo <em>Establecer numero2 a</em> con <em>texto</em> vacío también — para que la próxima cuenta no se pegue a los dígitos de esta.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Reinicia posicion_x',
          desc: 'Por último, <em>Establecer posicion_x a</em> con <b>15</b> otra vez — el próximo dígito se escribe desde el principio. El botón "=" ya está completo.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },

        /* ───────────── Botón "C" ───────────── */
        {
          titulo: 'Botón "C": arma la detección',
          desc: 'Armá la estructura de dos "Si" anidados para <b>C</b>: rango X 15-70, Y 335-390.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'C: borra toda la pantalla de arriba',
          desc: 'Dentro, copiá el mismo <em>rectángulo sólido</em> que usaste en "=" para limpiar la pantalla de un solo golpe: X=<b>0</b>, Y=<b>0</b>, ancho=<b>280</b>, alto=<b>130</b>, color <b>#1a1a2e</b>. <b>Importante:</b> usá un único rectángulo que cubra toda la franja (no dos rectángulos separados) — si quedan huecos sin cubrir entre ellos, pueden quedar pixeles de texto viejo pegados en pantalla.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'rectángulo sólido'
        },
        {
          titulo: 'C: resetea todo el estado',
          desc: 'Debajo, los mismos 4 bloques que usaste al final de "=": <em>numero1</em> = texto vacío, <em>numero2</em> = texto vacío, <em>indice_num</em> = 0, <em>posicion_x</em> = 15. "C" te deja la calculadora como recién empezada.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },

        /* ───────────── Procesar el dígito (fuera de todos los "Si" de botón) ───────────── */
        {
          titulo: 'Último paso: agregar el dígito al número',
          desc: 'Este bloque va <b>afuera</b> de todos los "Si" de botones que armaste, pero sigue <b>dentro</b> del "Si ¿Se hizo clic?" grande. Se encarga de pegar el dígito tecleado al numero1 o numero2, sin importar cuál de los 10 dígitos fue.',
          highlightCat: null, bloque: null
        },
        {
          titulo: 'Si se presionó un dígito',
          desc: 'Ve a <b>Lógica</b> y arrastra <em>Si ... hacer</em>. En la condición, desde <b>Variables</b>, metele directamente <em>obtener digito_presionado</em> (es verdadero/falso, no hace falta comparar con nada más).',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: '¿A qué número va? — si es el primero',
          desc: 'Dentro, ve a <b>Lógica</b> y arrastra <em>Si ... hacer</em> con <b>1 "si no, si"</b> (desde el engranaje ⚙️). Primera condición: <em>obtener indice_num</em> <b>=</b> <em>Número</em> <b>0</b>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Pega el dígito a numero1',
          desc: 'En el primer "hacer": <em>Establecer numero1 a</em>. Ve a <b>Textos</b> y arrastra <em>unir</em> (join), con <em>obtener numero1</em> en el primer hueco y <em>obtener numero</em> en el segundo — así el dígito nuevo se pega al final.',
          highlightCat: 'Textos', expandCat: null, bloque: 'text_join', bloqueLabel: 'unir'
        },
        {
          titulo: '¿A qué número va? — si es el segundo',
          desc: 'En el "si no, si": <em>obtener indice_num</em> <b>=</b> <em>Número</em> <b>1</b>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: 'comparación'
        },
        {
          titulo: 'Pega el dígito a numero2',
          desc: 'En su "hacer": <em>Establecer numero2 a</em> con otro bloque <em>unir</em>, <em>obtener numero2</em> + <em>obtener numero</em>.',
          highlightCat: 'Textos', expandCat: null, bloque: 'text_join', bloqueLabel: 'unir'
        },
        {
          titulo: 'Muestra el dígito en pantalla',
          desc: 'Afuera de ese "Si/si no si" (pero todavía dentro del "Si digito_presionado"), arrastra <em>Escribir texto en pantalla</em>. Metele <em>obtener numero</em> como texto, <em>obtener posicion_x</em> como X, Y=<b>50</b>, color blanco, tamaño <b>24</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Apaga digito_presionado',
          desc: 'Debajo, <em>Establecer digito_presionado a</em> <b>falso</b> — ya lo procesamos, listo para el próximo clic.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Avanza la posición para el próximo dígito',
          desc: 'Por último, <em>Cambiar posicion_x por</em> <b>18</b> — así el próximo dígito se escribe al lado, no encima. ¡La calculadora está completa!',
          highlightCat: 'Variables', expandCat: null, bloque: 'math_change', bloqueLabel: 'Cambiar variable por'
        },

        /* ───────────── Probar ───────────── */
        {
          titulo: 'Prueba tu calculadora',
          desc: 'Ve a la vista <b>Juego</b> (ícono de control 🎮 arriba a la derecha) y hacé clic en los botones: probá una suma simple y fijate que el símbolo "+" aparezca en pantalla al tocarlo, y también escribí dos veces el mismo dígito seguido (ej. "55") para confirmar que no se traba.',
          highlightElement: '#btnGame'
        },
        {
          titulo: '¡Listo!',
          desc: 'Ya tenés una calculadora funcional con 16 botones grandes: suma, resta, multiplicación, división, dígitos repetidos, el símbolo de la operación visible y un botón C que limpia todo sin dejar pixeles pegados. 🧮',
          highlightCat: null, bloque: null
        }
      ]
    },

    juego_plano_cartesiano: {
      title: 'Cazador de Coordenadas',
      icon: '📈',
      diagram: '',
      steps: [
        {
          titulo: '¿Qué aprenderemos?',
          desc: 'Convertirás el plano cartesiano en un <b>juego real</b>: mueves un punto con las flechas sobre los ejes X e Y para alcanzar un objetivo que aparece en una posición al azar. Cada vez que lo alcanzas, ganas un punto y aparece un objetivo nuevo.',
          highlightCat: null, bloque: null
        },
        {
          titulo: 'Crea un proyecto nuevo',
          desc: 'Antes de empezar, abrí el menú <b>Archivo</b> y hacé clic en <b>Nuevo</b> <span class="icon-btn icon-new"></span> para partir de un workspace limpio (si tenías algo sin guardar, te va a pedir confirmación antes de borrarlo).',
          highlightElement: '#btnArchivo'
        },
        {
          titulo: 'Abre la categoría Inicio',
          desc: 'Haz clic en <b>Inicio</b> en el panel de bloques para ver los bloques de pantalla, dibujo y personaje.',
          highlightCat: 'Inicio', expandCat: null, bloque: null
        },
        paso('Arrastra: Iniciar juego',
          'Arrastra el bloque <em>Iniciar juego</em>. Configura ancho <b>480</b> y alto <b>360</b>: así el centro del plano queda en (240, 180).',
          'Inicio', 'game_start', 'Iniciar juego'),
        paso('Crea el punto viajero (personaje)',
          'Arrastra el bloque <em>Crear personaje</em> debajo de <em>Iniciar juego</em>. Este es el punto que moverás por el plano. Ubícalo en el centro: X=<b>240</b>, Y=<b>180</b>.',
          'Inicio', 'sprite_create', 'Crear personaje'),
        {
          titulo: 'Crea las variables objetivo_x, objetivo_y y puntos',
          desc: 'Ve a <b>Variables</b> y crea tres variables, una por una con <em>Crear variable</em>: <b>objetivo_x</b>, <b>objetivo_y</b> y <b>puntos</b>. Como en Python, se escriben en minúsculas y las palabras se unen con guion bajo <b>_</b> (no <i>objetivoX</i>). Revisa bien la ortografía: <b>objetivo</b>, no <i>objecto</i>.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: ['objetivo_x', 'objetivo_y', 'puntos'], expandCat: null, bloque: null
        },
        pasoSet('Establece objetivo_x', 'objetivo_x',
          'Arrastra <em>Establecer … a</em> debajo de <em>Crear personaje</em> y elige <b>objetivo_x</b> en el desplegable: guardará la posición horizontal del punto a alcanzar.'),
        paso('Posición X al azar',
          'Ve a <b>Inicio</b> y arrastra <em>Número aleatorio</em> al hueco del bloque anterior, entre <b>40</b> y <b>440</b> (para que no quede pegado a los bordes).',
          'Inicio', 'game_random_int', 'Número aleatorio'),
        pasoSet('Establece objetivo_y', 'objetivo_y',
          'Arrastra otro <em>Establecer … a</em> debajo del anterior y elige <b>objetivo_y</b>.'),
        paso('Posición Y al azar',
          'Arrastra otro <em>Número aleatorio</em>, entre <b>40</b> y <b>320</b>.',
          'Inicio', 'game_random_int', 'Número aleatorio'),
        pasoSet('Empieza con 0 puntos', 'puntos',
          'Arrastra otro <em>Establecer … a</em> y elige <b>puntos</b>.'),
        pasoNumero(0, 'Ve a <b>Matemáticas</b> y arrastra un <em>Número</em> con valor <b>0</b> al hueco de <em>Establecer puntos a</em>.'),
        paso('Agrega el ciclo del juego',
          'Ve a <b>Ciclos</b> y arrastra <em>Repetir mientras Verdadero</em> debajo de lo anterior. Todo el juego vive dentro de este ciclo.',
          'Ciclos', 'controls_whileUntil', 'Repetir mientras Verdadero'),
        paso('Limpia la pantalla',
          'Ve a <b>Inicio</b> y arrastra <em>Limpiar pantalla</em> como primer bloque dentro del ciclo.',
          'Inicio', 'game_clear', 'Limpiar pantalla'),
        paso('Dibuja el eje X',
          'Arrastra el bloque <em>Línea</em>: de X1=<b>0</b>, Y1=<b>180</b> a X2=<b>480</b>, Y2=<b>180</b>, color blanco, grosor <b>2</b>. Como el ciclo limpia la pantalla en cada vuelta, los ejes se redibujan en cada fotograma.',
          'Inicio', 'game_draw_line', 'Línea'),
        paso('Dibuja el eje Y',
          'Arrastra otro <em>Línea</em>: de X1=<b>240</b>, Y1=<b>0</b> a X2=<b>240</b>, Y2=<b>360</b>, color blanco, grosor <b>2</b>.',
          'Inicio', 'game_draw_line', 'Línea'),
        paso('Dibuja el objetivo',
          'Arrastra <em>Círculo sólido</em> con radio <b>20</b> y un color bien visible, por ejemplo amarillo (<b>#ffff00</b>).',
          'Inicio', 'game_draw_circle', 'Círculo sólido'),
        pasoGet('objetivo_x', 'Arrastra <em>obtener objetivo_x</em> al hueco <b>X</b> del círculo.'),
        pasoGet('objetivo_y', 'Arrastra <em>obtener objetivo_y</em> al hueco <b>Y</b> del círculo.'),
        paso('Condición: flecha arriba',
          'Ve a <b>Lógica</b> y arrastra <em>Si … hacer</em> dentro del ciclo, debajo del círculo.',
          'Lógica', 'controls_if', 'Si … hacer'),
        paso('Detecta la flecha arriba',
          'Ve a <b>Inicio</b> y arrastra <em>¿Tecla presionada?</em> a la condición. Selecciona <b>↑ Arriba</b>.',
          'Inicio', 'key_is_pressed', '¿Tecla presionada?'),
        paso('Mueve el punto hacia arriba',
          'Arrastra <em>Mover personaje</em> dentro del <b>hacer</b>, con dx=<b>0</b>, dy=<b>-4</b>.',
          'Inicio', 'sprite_move', 'Mover personaje'),
        paso('Condición: flecha abajo',
          'Arrastra otro <em>Si … hacer</em> debajo del anterior.',
          'Lógica', 'controls_if', 'Si … hacer'),
        paso('Detecta la flecha abajo',
          'Arrastra otro <em>¿Tecla presionada?</em>. Selecciona <b>↓ Abajo</b>.',
          'Inicio', 'key_is_pressed', '¿Tecla presionada?'),
        paso('Mueve el punto hacia abajo',
          'Arrastra otro <em>Mover personaje</em> con dx=<b>0</b>, dy=<b>4</b>.',
          'Inicio', 'sprite_move', 'Mover personaje'),
        paso('Condición: flecha izquierda',
          'Arrastra otro <em>Si … hacer</em>.',
          'Lógica', 'controls_if', 'Si … hacer'),
        paso('Detecta la flecha izquierda',
          'Arrastra otro <em>¿Tecla presionada?</em>. Selecciona <b>← Izquierda</b>.',
          'Inicio', 'key_is_pressed', '¿Tecla presionada?'),
        paso('Mueve el punto a la izquierda',
          'Arrastra otro <em>Mover personaje</em> con dx=<b>-4</b>, dy=<b>0</b>.',
          'Inicio', 'sprite_move', 'Mover personaje'),
        paso('Condición: flecha derecha',
          'Arrastra el último <em>Si … hacer</em> del movimiento.',
          'Lógica', 'controls_if', 'Si … hacer'),
        paso('Detecta la flecha derecha',
          'Arrastra el último <em>¿Tecla presionada?</em>. Selecciona <b>→ Derecha</b>.',
          'Inicio', 'key_is_pressed', '¿Tecla presionada?'),
        paso('Mueve el punto a la derecha',
          'Arrastra el último <em>Mover personaje</em> con dx=<b>4</b>, dy=<b>0</b>.',
          'Inicio', 'sprite_move', 'Mover personaje'),
        paso('¿Llegaste al objetivo?',
          'Arrastra otro <em>Si … hacer</em>, debajo de los 4 movimientos.',
          'Lógica', 'controls_if', 'Si … hacer'),
        paso('Compara: menor que',
          'Ve a <b>Lógica</b> y arrastra una comparación a la condición. Cambia el operador a <b>&lt;</b>.',
          'Lógica', 'logic_compare', '< (menor que)'),
        paso('Distancia al objetivo',
          'Ve a <b>Inicio</b> y arrastra <em>Distancia entre puntos</em> al <b>primer</b> hueco de la comparación.',
          'Inicio', 'game_distance', 'Distancia entre puntos'),
        paso('Posición X del punto',
          'Arrastra <em>Posición X del personaje</em> al hueco <b>X1</b> de la distancia.',
          'Inicio', 'sprite_get_x', 'Posición X del personaje'),
        paso('Posición Y del punto',
          'Arrastra <em>Posición Y del personaje</em> al hueco <b>Y1</b>.',
          'Inicio', 'sprite_get_y', 'Posición Y del personaje'),
        pasoGet('objetivo_x', 'Arrastra <em>obtener objetivo_x</em> al hueco <b>X2</b>.'),
        pasoGet('objetivo_y', 'Arrastra <em>obtener objetivo_y</em> al hueco <b>Y2</b>.'),
        pasoNumero(25, 'Ve a <b>Matemáticas</b> y arrastra un <em>Número</em> con valor <b>25</b> al <b>segundo</b> hueco de la comparación: si estás a menos de 25 píxeles, cuenta como acierto.'),
        pasoSet('Suma un punto', 'puntos',
          'Arrastra <em>Establecer puntos a</em> dentro del <b>hacer</b>. Revisa que el desplegable diga <b>puntos</b>.'),
        paso('puntos + 1',
          'Ve a <b>Matemáticas</b> y arrastra un bloque de operación <em>+</em>.',
          'Matemáticas', 'math_arithmetic', '+ (suma)'),
        pasoGet('puntos', 'Arrastra <em>obtener puntos</em> al primer hueco de la suma.'),
        pasoNumero(1, 'Arrastra un <em>Número</em> con valor <b>1</b> al segundo hueco.'),
        pasoSet('Nuevo objetivo X', 'objetivo_x',
          'Arrastra <em>Establecer objetivo_x a</em> dentro del mismo <b>hacer</b>: cuando aciertas, el objetivo cambia de lugar.'),
        paso('Nueva posición X al azar',
          'Arrastra otro <em>Número aleatorio</em>, entre <b>40</b> y <b>440</b>.',
          'Inicio', 'game_random_int', 'Número aleatorio'),
        pasoSet('Nuevo objetivo Y', 'objetivo_y',
          'Arrastra <em>Establecer objetivo_y a</em>, debajo del anterior.'),
        paso('Nueva posición Y al azar',
          'Arrastra otro <em>Número aleatorio</em>, entre <b>40</b> y <b>320</b>.',
          'Inicio', 'game_random_int', 'Número aleatorio'),
        paso('Muestra los puntos',
          'Arrastra <em>Escribir texto en pantalla</em> <b>fuera</b> del <em>Si</em> (debajo de él): X=<b>20</b>, Y=<b>25</b>, color blanco, tamaño <b>16</b>.',
          'Inicio', 'game_show_text', 'Escribir texto en pantalla'),
        paso('Une texto y número',
          'Ve a <b>Textos</b> y arrastra <em>crear texto con</em> al hueco de texto del bloque anterior.',
          'Textos', 'text_join', 'crear texto con'),
        paso('Escribe "Puntos: "',
          'Arrastra un bloque de texto <em>" "</em> al primer hueco y escribe <b>Puntos: </b> (con un espacio al final).',
          'Textos', 'text', 'texto'),
        pasoGet('puntos', 'Arrastra <em>obtener puntos</em> al segundo hueco de <em>crear texto con</em>.'),
        paso('Dibuja el punto',
          'Ve a <b>Inicio</b> y arrastra <em>Dibujar personaje</em>.',
          'Inicio', 'sprite_draw', 'Dibujar personaje'),
        paso('Avanza al siguiente fotograma',
          'Arrastra <em>Siguiente frame</em> como último bloque del ciclo.',
          'Inicio', 'game_frame', 'Siguiente frame'),
        {
          titulo: 'Abre la vista de juego',
          desc: 'Ve a la <b>vista de juego</b> para ver los ejes, el objetivo y tu punto.',
          highlightElement: '#btnGame'
        },
        {
          titulo: 'Prueba tu proyecto',
          desc: 'Ejecuta el juego y muévete con las flechas hasta el círculo. Comprueba que cada acierto suma un punto y mueve el objetivo a otra coordenada.',
          highlightElement: '#btnGameRun'
        }
      ]
    },

    juego_caja_area: cajaMisteriosa({
      title: 'La Caja Misteriosa: Áreas',
      icon: '📦',
      variable: 'area',
      nombre: 'área',
      pregunta: '¿Cuál es el área del rectángulo?',
      intro: 'Un juego de <b>4 opciones</b>: aparece un rectángulo con base y altura al azar, y 4 posibles áreas en un tablero de <b>4 cuadrados</b>. Solo una es correcta y <b>cambia de cuadrado en cada ronda</b>: tienes que calcular, no memorizar. Cada clic te avisa si acertaste o no antes de pasar a la siguiente pregunta. Usarás tu propia <b>función</b> para no repetir bloques, y nombres de variables al estilo Python (<b>zona_correcta</b>).',
      formulaIntro: 'El área de un rectángulo es <b>base × altura</b>.',
      formula: [
        paso('Multiplica base × altura',
          'Ve a <b>Matemáticas</b> y arrastra un bloque de operación al hueco de <em>Establecer area a</em>. Cambia el operador a <b>×</b>.',
          'Matemáticas', 'math_arithmetic', '× (multiplicación)'),
        pasoGet('base', 'Arrastra <em>obtener base</em> al primer hueco de la multiplicación.'),
        pasoGet('altura', 'Arrastra <em>obtener altura</em> al segundo hueco.')
      ]
    }),

    juego_caja_perimetro: cajaMisteriosa({
      title: 'La Caja Misteriosa: Perímetros',
      icon: '📏',
      variable: 'perimetro',
      nombre: 'perímetro',
      pregunta: '¿Cuál es el perímetro del rectángulo?',
      intro: 'La versión de <b>perímetros</b> del mismo juego: aparece un rectángulo con base y altura al azar, y 4 posibles perímetros en un tablero de <b>4 cuadrados</b>. Solo uno es correcto y <b>cambia de cuadrado en cada ronda</b>. Cada clic te avisa si acertaste o no antes de pasar a la siguiente pregunta. Volverás a usar una <b>función</b> y nombres de variables al estilo Python (<b>zona_correcta</b>).',
      formulaIntro: 'El perímetro de un rectángulo es <b>(base + altura) × 2</b>.',
      formula: [
        paso('Multiplica por 2',
          'Ve a <b>Matemáticas</b> y arrastra un bloque de operación al hueco de <em>Establecer perimetro a</em>. Cambia el operador a <b>×</b>.',
          'Matemáticas', 'math_arithmetic', '× (multiplicación)'),
        paso('Suma base + altura',
          'Arrastra otro bloque de operación <em>+</em> al <b>primer</b> hueco de la multiplicación.',
          'Matemáticas', 'math_arithmetic', '+ (suma)'),
        pasoGet('base', 'Arrastra <em>obtener base</em> al primer hueco de la suma.'),
        pasoGet('altura', 'Arrastra <em>obtener altura</em> al segundo hueco de la suma.'),
        pasoNumero(2, 'Arrastra un <em>Número</em> con valor <b>2</b> al <b>segundo</b> hueco de la multiplicación.')
      ]
    }),

    juego_evitar_obstaculos: {
      title: '¡Esquiva y Sobrevive!',
      icon: '🚧',
      diagram: '',
      steps: [
        {
          titulo: '¿Qué aprenderemos?',
          desc: 'Crearás un juego donde el jugador debe esquivar un obstáculo que cae desde arriba, sobreviviendo el mayor tiempo posible. En vez de dos personajes con nombre (fácil de confundir), el obstáculo será un rectángulo dibujado que se controla con <b>variables</b> -- así solo el jugador responde al teclado. El choque de verdad <b>termina el juego</b> y te muestra cuántos segundos sobreviviste.',
          highlightCat: null, bloque: null
        },
        {
          titulo: 'Crea un proyecto nuevo',
          desc: 'Antes de empezar, abrí el menú <b>Archivo</b> y hacé clic en <b>Nuevo</b> <span class="icon-btn icon-new"></span> para partir de un workspace limpio (si tenías algo sin guardar, te va a pedir confirmación antes de borrarlo).',
          highlightElement: '#btnArchivo'
        },
        {
          titulo: 'Abre la categoría Inicio',
          desc: 'Haz clic en <b>Inicio</b> en el panel de bloques para ver los bloques de personaje, dibujo y colisiones.',
          highlightCat: 'Inicio', expandCat: null, bloque: null
        },
        {
          titulo: 'Arrastra: Iniciar juego',
          desc: 'Arrastra el bloque <em>Iniciar juego</em>. Configura ancho <b>480</b> y alto <b>360</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_start', bloqueLabel: 'Iniciar juego'
        },
        {
          titulo: 'Crea el jugador',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Crear personaje</em>. Este es el único personaje del juego, así que va a responder siempre a tus teclas. Ubícalo abajo, por ejemplo X=<b>216</b>, Y=<b>320</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_create', bloqueLabel: 'Crear personaje'
        },
        {
          titulo: 'Crea la variable obstaculo_x',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>obstaculo_x</b>. En ella guardaremos la posición horizontal del obstáculo (que no es un personaje, sino un rectángulo dibujado).',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'obstaculo_x', expandCat: null, bloque: null
        },
        {
          titulo: 'Establece obstaculo_x',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer obstaculo_x a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe la posición X inicial',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em>. Usa, por ejemplo, <b>200</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Crea la variable obstaculo_y',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>obstaculo_y</b> para la posición vertical del obstáculo.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'obstaculo_y', expandCat: null, bloque: null
        },
        {
          titulo: 'Establece obstaculo_y',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer obstaculo_y a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe la posición Y inicial',
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>Número</em>. Déjalo en <b>0</b>: el obstáculo empieza arriba de todo.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Crea la variable contador',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>contador</b>: cuenta los fotogramas desde el último segundo completo. El juego dibuja unos 60 fotogramas por segundo, así que cuando llegue a 60 habrá pasado 1 segundo real.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'contador', expandCat: null, bloque: null
        },
        {
          titulo: 'Establece contador',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer contador a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe 0',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>0</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Crea la variable segundos',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>segundos</b>: cuánto tiempo llevas sobreviviendo. Es tu puntaje en este juego.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'segundos', expandCat: null, bloque: null
        },
        {
          titulo: 'Establece segundos',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer segundos a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe 0 para segundos',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>0</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Crea la variable jugando',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>jugando</b>: vale verdadero mientras no hayas chocado, y falso después del choque. Así el juego sabe cuándo parar.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'jugando', expandCat: null, bloque: null
        },
        {
          titulo: 'Establece jugando',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer jugando a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe verdadero',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>verdadero/falso</em>. Déjalo en <b>verdadero</b>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_boolean', bloqueLabel: 'verdadero/falso'
        },
        {
          titulo: 'Agrega el ciclo del juego',
          desc: 'Ve a <b>Ciclos</b> y arrastra el bloque <em>Repetir mientras Verdadero</em>. Todo el movimiento y el dibujo van dentro de este ciclo.',
          highlightCat: 'Ciclos', expandCat: null, bloque: 'controls_whileUntil', bloqueLabel: 'Repetir mientras Verdadero'
        },
        {
          titulo: 'Limpia la pantalla',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Limpiar pantalla</em> como primer bloque dentro del ciclo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_clear', bloqueLabel: 'Limpiar pantalla'
        },
        {
          titulo: 'Si todavía estás jugando',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>Si … hacer</em>. Todo el juego (moverte, esquivar, contar segundos) pasa <b>solo</b> mientras <em>jugando</em> sea verdadero.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Condición: obtén jugando',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener jugando</em> directamente en la condición.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'jugando' }, bloqueLabel: 'obtener jugando'
        },
        {
          titulo: 'Condición: flecha izquierda',
          desc: 'Dentro del <b>hacer</b>, ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>. Como solo hay un personaje (el jugador), esta condición SIEMPRE mueve al jugador, nunca al obstáculo.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Detecta la flecha izquierda',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>¿Tecla presionada?</em> en la condición. Selecciona <b>← Izquierda</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'key_is_pressed', bloqueLabel: '¿Tecla presionada?'
        },
        {
          titulo: 'Mueve al jugador a la izquierda',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Mover personaje</em> dentro del <b>hacer</b>. Usa dx=<b>-4</b>, dy=<b>0</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_move', bloqueLabel: 'Mover personaje'
        },
        {
          titulo: 'Condición: flecha derecha',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Detecta la flecha derecha',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>¿Tecla presionada?</em>. Selecciona <b>→ Derecha</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'key_is_pressed', bloqueLabel: '¿Tecla presionada?'
        },
        {
          titulo: 'Mueve al jugador a la derecha',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Mover personaje</em>. Usa dx=<b>4</b>, dy=<b>0</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_move', bloqueLabel: 'Mover personaje'
        },
        {
          titulo: 'Haz caer el obstáculo',
          desc: 'Ve a <b>Variables</b> y arrastra otro bloque <em>Establecer obstaculo_y a</em>, fuera de los dos "Si" de flechas (pero dentro del "Si jugando"), para que el obstáculo baje un poco en cada vuelta del ciclo.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Suma la velocidad de caída',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>+ (suma)</em>. Conéctalo al bloque anterior.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén la posición actual del obstáculo',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener obstaculo_y</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'obstaculo_y' }, bloqueLabel: 'obtener obstaculo_y'
        },
        {
          titulo: 'Escribe la velocidad de caída',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>3</b>. Colócalo en el segundo hueco de la suma.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Si el obstáculo llega al fondo',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>, para que el obstáculo vuelva a empezar arriba cuando salga de la pantalla.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Compara con el fondo de la pantalla',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>&gt; (mayor que)</em> en la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '> (mayor que)'
        },
        {
          titulo: 'Obtén obstaculo_y para comparar',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener obstaculo_y</em>. Colócalo en el primer hueco de la comparación.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'obstaculo_y' }, bloqueLabel: 'obtener obstaculo_y'
        },
        {
          titulo: 'Escribe el límite inferior',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>360</b> (el alto de la pantalla). Colócalo en el segundo hueco.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Reinicia el obstáculo arriba',
          desc: 'Ve a <b>Variables</b> y arrastra otro bloque <em>Establecer obstaculo_y a</em> dentro del <b>hacer</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe 0 para reiniciar',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>0</b>. Colócalo en el bloque anterior.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Cambia obstaculo_x a una posición nueva',
          desc: 'Ve a <b>Variables</b> y arrastra otro bloque <em>Establecer obstaculo_x a</em>, para que el obstáculo caiga por una columna distinta cada vez.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén una posición X al azar',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Número aleatorio</em>. Colócalo en el bloque anterior, entre <b>0</b> y <b>440</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Avanza el contador de fotogramas',
          desc: 'Afuera del "Si el obstáculo llega al fondo" (pero dentro del "Si jugando"), ve a <b>Variables</b> y arrastra <em>Cambiar contador por</em>. Dejalo en <b>1</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'math_change', bloqueLabel: 'Cambiar variable por'
        },
        {
          titulo: '¿Pasó un segundo completo?',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Compara el contador con 60',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>&gt;= (mayor o igual)</em> en la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '>= (mayor o igual)'
        },
        {
          titulo: 'Obtén contador para comparar',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener contador</em>. Colócalo en el primer hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'contador' }, bloqueLabel: 'obtener contador'
        },
        {
          titulo: 'Escribe 60',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>60</b>. Colócalo en el segundo hueco.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Reinicia el contador',
          desc: 'Dentro del <b>hacer</b>, ve a <b>Variables</b> y arrastra <em>Establecer contador a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe 0 para reiniciar el contador',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>0</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Suma un segundo sobrevivido',
          desc: 'Debajo, todavía dentro del mismo <b>hacer</b>, ve a <b>Variables</b> y arrastra <em>Cambiar segundos por</em>. Dejalo en <b>1</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'math_change', bloqueLabel: 'Cambiar variable por'
        },
        {
          titulo: 'Dibuja el obstáculo',
          desc: 'Afuera de todos los "Si" anteriores (pero dentro del "Si jugando"), ve a <b>Inicio</b> y arrastra el bloque <em>Rectángulo sólido</em>. Usa ancho <b>40</b>, alto <b>40</b> y un color bien visible, por ejemplo <b>#ff3b3b</b> (rojo). Anota ese color: lo necesitas igual en el siguiente paso.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'Rectángulo sólido'
        },
        {
          titulo: 'Obtén obstaculo_x para dibujar',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener obstaculo_x</em>. Colócalo en el hueco X del rectángulo.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'obstaculo_x' }, bloqueLabel: 'obtener obstaculo_x'
        },
        {
          titulo: 'Obtén obstaculo_y para dibujar',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener obstaculo_y</em>. Colócalo en el hueco Y del rectángulo.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'obstaculo_y' }, bloqueLabel: 'obtener obstaculo_y'
        },
        {
          titulo: 'Si el jugador toca al obstáculo',
          desc: 'Justo después de dibujar el obstáculo (<b>antes</b> de dibujar al jugador -- es importante el orden, ver el próximo paso), ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Comprueba el color del choque',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>¿Toca este color?</em> en la condición. Usa <b>exactamente el mismo color</b> que le pusiste al rectángulo (por ejemplo <b>#ff3b3b</b>). <b>Importante:</b> este bloque revisa qué color hay dibujado debajo del jugador <em>en este momento</em> -- si lo revisás después de dibujar al jugador, lo único que vas a encontrar ahí es el propio color del jugador, nunca el del obstáculo. Por eso el choque se comprueba <b>antes</b> de dibujar al jugador.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'touching_color', bloqueLabel: '¿Toca este color?'
        },
        {
          titulo: 'Termina el juego al chocar',
          desc: 'Dentro del <b>hacer</b>, ve a <b>Variables</b> y arrastra <em>Establecer jugando a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_set', valor: 'jugando' }, bloqueLabel: 'Establecer jugando'
        },
        {
          titulo: 'Escribe falso',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>verdadero/falso</em>. Cambialo a <b>falso</b>: el choque apaga el juego.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_boolean', bloqueLabel: 'verdadero/falso'
        },
        {
          titulo: 'Dibuja al jugador',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Dibujar personaje</em>, <b>después</b> de comprobar el choque (ver los dos pasos anteriores).',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_draw', bloqueLabel: 'Dibujar personaje'
        },
        {
          titulo: 'Muestra los segundos sobrevividos',
          desc: 'Ya afuera de todos los "Si" (pero todavía dentro del "Si jugando" grande), ve a <b>Inicio</b> y arrastra <em>Escribir texto en pantalla</em>. En el hueco de texto, ve a <b>Textos</b> y arrastra <em>unir</em> (join) con el texto "Sobreviviste: " y <em>obtener segundos</em>. Ubícalo en X=<b>20</b>, Y=<b>20</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Si ya NO estás jugando: muestra el choque',
          desc: 'Bajá hasta la rama <b>"si no"</b> del primer "Si jugando" (hacé clic en el <b>⚙️</b> de ese bloque y arrastrale un "si no" si todavía no lo tiene). Ve a <b>Inicio</b> y arrastra <em>Escribir texto en pantalla</em> ahí dentro, en X=<b>90</b>, Y=<b>170</b>, tamaño <b>22</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Arma el mensaje de choque',
          desc: 'En el hueco de texto, ve a <b>Textos</b> y arrastra <em>unir</em> (join) con 2 huecos: el texto "¡Choque! Sobreviviste " y <em>obtener segundos</em> (<b>Variables</b>).',
          highlightCat: 'Textos', expandCat: null, bloque: 'text_join', bloqueLabel: 'unir'
        },
        {
          titulo: 'Avanza al siguiente fotograma',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Siguiente frame</em> como último bloque del ciclo (afuera de todos los "Si").',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_frame', bloqueLabel: 'Siguiente frame'
        },
        {
          titulo: 'Abre la vista de juego',
          desc: 'Activa la <b>vista de juego</b> para ver el escenario y al jugador en acción.',
          highlightElement: '#btnGame'
        },
        {
          titulo: 'Prueba tu juego',
          desc: 'Ejecuta y esquiva el obstáculo moviéndote con las flechas. Al chocar, el juego se detiene y te muestra cuántos segundos sobreviviste. Usa <b>Reiniciar</b> para jugar de nuevo, y ajusta la velocidad de caída (el <b>3</b>) hasta que el reto sea divertido y justo.',
          highlightElement: '#btnGameRun'
        }
      ]
    },

    juego_puntaje_tiempo: {
      title: 'Contrarreloj: ¡Suma Puntos!',
      icon: '⏱️',
      diagram: '',
      steps: [
        {
          titulo: '¿Qué aprenderemos?',
          desc: 'Crearás un juego con contador de <b>puntos</b> y <b>tiempo</b>: cada vez que presiones la barra espaciadora sumas un punto, y tenés 30 segundos <b>de verdad</b> antes de que el juego termine y te muestre tu puntuación final. Para que el tiempo baje a ritmo de reloj (no en cada vuelta del ciclo, que pasa muchas veces por segundo) vas a usar un <b>contador de fotogramas</b>: el truco que usan la mayoría de los juegos simples para medir segundos.',
          highlightCat: null, bloque: null
        },
        {
          titulo: 'Crea un proyecto nuevo',
          desc: 'Antes de empezar, abrí el menú <b>Archivo</b> y hacé clic en <b>Nuevo</b> <span class="icon-btn icon-new"></span> para partir de un workspace limpio (si tenías algo sin guardar, te va a pedir confirmación antes de borrarlo).',
          highlightElement: '#btnArchivo'
        },
        {
          titulo: 'Abre la categoría Inicio',
          desc: 'Haz clic en <b>Inicio</b> en el panel de bloques para ver los bloques de pantalla y teclado.',
          highlightCat: 'Inicio', expandCat: null, bloque: null
        },
        {
          titulo: 'Arrastra: Iniciar juego',
          desc: 'Arrastra el bloque <em>Iniciar juego</em>. Configura ancho <b>480</b> y alto <b>360</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_start', bloqueLabel: 'Iniciar juego'
        },
        {
          titulo: 'Crea la variable puntos',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>puntos</b>.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'puntos', expandCat: null, bloque: null
        },
        {
          titulo: 'Establece puntos',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer puntos a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe el valor inicial de puntos',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em>. Déjalo en <b>0</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Crea la variable tiempo',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>tiempo</b>.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'tiempo', expandCat: null, bloque: null
        },
        {
          titulo: 'Establece tiempo',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer tiempo a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe el tiempo inicial',
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>Número</em>. Usa <b>30</b> como tiempo de partida, en segundos.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Crea la variable contador',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>contador</b>: cuenta los fotogramas (frames) que pasaron desde el último segundo completo. El juego dibuja unos 60 fotogramas por segundo, así que cuando <em>contador</em> llegue a 60, habrá pasado 1 segundo real.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'contador', expandCat: null, bloque: null
        },
        {
          titulo: 'Establece contador',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer contador a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe el valor inicial de contador',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em>. Déjalo en <b>0</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Crea la variable jugando',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>jugando</b>: vale verdadero mientras quede tiempo, y falso cuando el tiempo se acabe. Así el juego sabe cuándo parar.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'jugando', expandCat: null, bloque: null
        },
        {
          titulo: 'Establece jugando',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer jugando a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe verdadero',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>verdadero/falso</em>. Déjalo en <b>verdadero</b>: el juego arranca jugándose.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_boolean', bloqueLabel: 'verdadero/falso'
        },
        {
          titulo: 'Agrega el ciclo del juego',
          desc: 'Ve a <b>Ciclos</b> y arrastra el bloque <em>Repetir mientras Verdadero</em>. Todo el marcador vivirá dentro de este ciclo.',
          highlightCat: 'Ciclos', expandCat: null, bloque: 'controls_whileUntil', bloqueLabel: 'Repetir mientras Verdadero'
        },
        {
          titulo: 'Limpia la pantalla',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Limpiar pantalla</em> como primer bloque dentro del ciclo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_clear', bloqueLabel: 'Limpiar pantalla'
        },
        {
          titulo: 'Si todavía estás jugando',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>Si … hacer</em>, después de limpiar la pantalla. Todo el juego (sumar puntos, bajar el tiempo) va a pasar <b>solo</b> mientras <em>jugando</em> sea verdadero.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Condición: obtén jugando',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener jugando</em> directamente en la condición (ya es verdadero/falso, no hace falta comparar con nada más).',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'jugando' }, bloqueLabel: 'obtener jugando'
        },
        {
          titulo: 'Condición: barra espaciadora',
          desc: 'Dentro del <b>hacer</b>, ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Detecta la barra espaciadora',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>¿Tecla presionada?</em> en la condición. Selecciona <b>Espacio</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'key_is_pressed', bloqueLabel: '¿Tecla presionada?'
        },
        {
          titulo: 'Suma un punto',
          desc: 'Ve a <b>Variables</b> y arrastra otro bloque <em>Establecer puntos a</em> dentro del <b>hacer</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Suma 1 al puntaje actual',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>+ (suma)</em>. Conéctalo al bloque anterior.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén los puntos actuales',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener puntos</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'puntos' }, bloqueLabel: 'obtener puntos'
        },
        {
          titulo: 'Escribe 1 para sumar',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>1</b>. Colócalo en el segundo hueco de la suma.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Avanza el contador de fotogramas',
          desc: 'Afuera del "Si espacio" (pero todavía dentro del "Si jugando"), ve a <b>Variables</b> y arrastra <em>Cambiar contador por</em>. Dejalo en <b>1</b>: este bloque se ejecuta en cada vuelta del ciclo, a diferencia del de espacio que depende de la tecla.',
          highlightCat: 'Variables', expandCat: null, bloque: 'math_change', bloqueLabel: 'Cambiar variable por'
        },
        {
          titulo: '¿Pasó un segundo completo?',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>: cuando el contador llega a 60 fotogramas, bajamos el tiempo en 1 y reiniciamos el contador.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Compara el contador con 60',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>&gt;= (mayor o igual)</em> en la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '>= (mayor o igual)'
        },
        {
          titulo: 'Obtén contador para comparar',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener contador</em>. Colócalo en el primer hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'contador' }, bloqueLabel: 'obtener contador'
        },
        {
          titulo: 'Escribe 60',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>60</b>. Colócalo en el segundo hueco.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Reinicia el contador',
          desc: 'Dentro del <b>hacer</b>, ve a <b>Variables</b> y arrastra <em>Establecer contador a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe 0 para reiniciar el contador',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>0</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Resta 1 al tiempo',
          desc: 'Debajo, todavía dentro del mismo <b>hacer</b>, ve a <b>Variables</b> y arrastra <em>Cambiar tiempo por</em>. Dejalo en <b>-1</b>: recién ahora el tiempo baja, una vez por segundo real.',
          highlightCat: 'Variables', expandCat: null, bloque: 'math_change', bloqueLabel: 'Cambiar variable por'
        },
        {
          titulo: '¿Se acabó el tiempo?',
          desc: 'Afuera del "Si contador>=60" (pero todavía dentro del "Si jugando"), ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Compara el tiempo con 0',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>&lt;= (menor o igual)</em> en la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '<= (menor o igual)'
        },
        {
          titulo: 'Obtén tiempo para comparar',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener tiempo</em>. Colócalo en el primer hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'tiempo' }, bloqueLabel: 'obtener tiempo'
        },
        {
          titulo: 'Escribe 0',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>0</b>. Colócalo en el segundo hueco.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Termina el juego',
          desc: 'Dentro del <b>hacer</b>, ve a <b>Variables</b> y arrastra <em>Establecer jugando a</em>: cuando el tiempo llega a 0, dejamos de jugar.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_set', valor: 'jugando' }, bloqueLabel: 'Establecer jugando'
        },
        {
          titulo: 'Escribe falso',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>verdadero/falso</em>. Cambialo a <b>falso</b>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_boolean', bloqueLabel: 'verdadero/falso'
        },
        {
          titulo: 'Muestra los puntos en pantalla',
          desc: 'Afuera de todos los "Si" anteriores (pero todavía dentro del "Si jugando" grande), ve a <b>Inicio</b> y arrastra el bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>20</b>, Y=<b>30</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén los puntos para mostrarlos',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener puntos</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'puntos' }, bloqueLabel: 'obtener puntos'
        },
        {
          titulo: 'Muestra el tiempo en pantalla',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en Y=<b>55</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén el tiempo para mostrarlo',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener tiempo</em>. Colócalo en el hueco de texto de este segundo bloque.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'tiempo' }, bloqueLabel: 'obtener tiempo'
        },
        {
          titulo: 'Si ya NO estás jugando: muestra el resultado final',
          desc: 'Bajá hasta la rama <b>"si no"</b> del primer "Si jugando" (hacé clic en el <b>⚙️</b> de ese bloque y arrastrale un "si no" si todavía no lo tiene). Ve a <b>Inicio</b> y arrastra <em>Escribir texto en pantalla</em> ahí dentro, en X=<b>100</b>, Y=<b>170</b>, tamaño <b>22</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Arma el mensaje final',
          desc: 'En el hueco de texto, ve a <b>Textos</b> y arrastra <em>unir</em> (join) con 2 huecos: el texto "¡Tiempo! Puntuación: " y <em>obtener puntos</em> (<b>Variables</b>).',
          highlightCat: 'Textos', expandCat: null, bloque: 'text_join', bloqueLabel: 'unir'
        },
        {
          titulo: 'Avanza al siguiente fotograma',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Siguiente frame</em> como último bloque del ciclo (afuera de todos los "Si").',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_frame', bloqueLabel: 'Siguiente frame'
        },
        {
          titulo: 'Abre la vista de juego',
          desc: 'Usa la <b>vista de juego</b> para ver el marcador.',
          highlightElement: '#btnGame'
        },
        {
          titulo: 'Prueba el juego',
          desc: 'Presiona espacio varias veces y observa cómo suben los puntos mientras el tiempo baja <b>de a un segundo real por vez</b>. Cuando el tiempo llega a 0, el juego se detiene y muestra tu puntuación final. Usa <b>Reiniciar</b> para jugar de nuevo.',
          highlightElement: '#btnGameRun'
        }
      ]
    },

    juego_laberinto: {
      title: 'Escape del Laberinto',
      icon: '🧭',
      diagram: '',
      steps: [
        {
          titulo: '¿Qué aprenderemos?',
          desc: 'Construirás un laberinto de <b>verdad</b>: 3 paredes que bloquean el paso de verdad (si las tocás, volvés al inicio) y una meta al otro lado que tenés que alcanzar para escapar. Vas a practicar movimiento por teclado y <b>detección de colisiones por color</b>, la misma técnica de "¡Esquiva y Sobrevive!" pero usada para bloquear el paso en vez de terminar el juego.',
          highlightCat: null, bloque: null
        },
        {
          titulo: 'Crea un proyecto nuevo',
          desc: 'Antes de empezar, abrí el menú <b>Archivo</b> y hacé clic en <b>Nuevo</b> <span class="icon-btn icon-new"></span> para partir de un workspace limpio (si tenías algo sin guardar, te va a pedir confirmación antes de borrarlo).',
          highlightElement: '#btnArchivo'
        },
        {
          titulo: 'Abre la categoría Inicio',
          desc: 'Haz clic en <b>Inicio</b> en el panel de bloques para ver los bloques de pantalla, personaje y colisiones.',
          highlightCat: 'Inicio', expandCat: null, bloque: null
        },
        {
          titulo: 'Arrastra: Iniciar juego',
          desc: 'Arrastra el bloque <em>Iniciar juego</em>. Configura ancho <b>480</b> y alto <b>360</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_start', bloqueLabel: 'Iniciar juego'
        },
        {
          titulo: 'Crea el personaje',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Crear personaje</em>. Ubícalo en la entrada del laberinto, X=<b>20</b>, Y=<b>20</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_create', bloqueLabel: 'Crear personaje'
        },
        {
          titulo: 'Agrega el ciclo del juego',
          desc: 'Ve a <b>Ciclos</b> y arrastra el bloque <em>Repetir mientras Verdadero</em>. Todo el recorrido del laberinto va dentro de este ciclo.',
          highlightCat: 'Ciclos', expandCat: null, bloque: 'controls_whileUntil', bloqueLabel: 'Repetir mientras Verdadero'
        },
        {
          titulo: 'Limpia la pantalla en cada vuelta',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Limpiar pantalla</em> como primer bloque dentro del ciclo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_clear', bloqueLabel: 'Limpiar pantalla'
        },
        {
          titulo: 'Dibuja la primera pared',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Rectángulo sólido</em>. Usa X=<b>100</b>, Y=<b>0</b>, ancho=<b>20</b>, alto=<b>250</b>, color <b>#777777</b> (gris). Deja un hueco libre en la parte de abajo de la pantalla para poder pasar.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'Rectángulo sólido'
        },
        {
          titulo: 'Dibuja la segunda pared',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Rectángulo sólido</em>. Usa X=<b>250</b>, Y=<b>110</b>, ancho=<b>20</b>, alto=<b>250</b>, mismo color <b>#777777</b>. Esta vez el hueco libre queda arriba: para pasar tenés que subir primero.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'Rectángulo sólido'
        },
        {
          titulo: 'Dibuja la tercera pared',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Rectángulo sólido</em>. Usa X=<b>380</b>, Y=<b>0</b>, ancho=<b>20</b>, alto=<b>250</b>, mismo color <b>#777777</b>. Con las 3 paredes, el camino queda en zigzag: abajo, arriba, abajo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'Rectángulo sólido'
        },
        {
          titulo: 'Dibuja la meta',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Rectángulo sólido</em>, para marcar la salida del laberinto. Usa X=<b>440</b>, Y=<b>320</b>, ancho=<b>30</b>, alto=<b>30</b>, color <b>#2ecc71</b> (verde) -- bien distinto del gris de las paredes, para no confundirlos.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'Rectángulo sólido'
        },
        {
          titulo: 'Condición: flecha arriba',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>Si … hacer</em>, después de dibujar las paredes y la meta.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Detecta la flecha arriba',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>¿Tecla presionada?</em> en la condición. Selecciona <b>↑ Arriba</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'key_is_pressed', bloqueLabel: '¿Tecla presionada?'
        },
        {
          titulo: 'Mueve el personaje hacia arriba',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Mover personaje</em> dentro del <b>hacer</b>. Usa dx=<b>0</b>, dy=<b>-4</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_move', bloqueLabel: 'Mover personaje'
        },
        {
          titulo: 'Condición: flecha abajo',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Detecta la flecha abajo',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>¿Tecla presionada?</em>. Selecciona <b>↓ Abajo</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'key_is_pressed', bloqueLabel: '¿Tecla presionada?'
        },
        {
          titulo: 'Mueve el personaje hacia abajo',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Mover personaje</em>. Usa dx=<b>0</b>, dy=<b>4</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_move', bloqueLabel: 'Mover personaje'
        },
        {
          titulo: 'Condición: flecha izquierda',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Detecta la flecha izquierda',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>¿Tecla presionada?</em>. Selecciona <b>← Izquierda</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'key_is_pressed', bloqueLabel: '¿Tecla presionada?'
        },
        {
          titulo: 'Mueve el personaje a la izquierda',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Mover personaje</em>. Usa dx=<b>-4</b>, dy=<b>0</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_move', bloqueLabel: 'Mover personaje'
        },
        {
          titulo: 'Condición: flecha derecha',
          desc: 'Ve a <b>Lógica</b> y arrastra el último bloque <em>Si … hacer</em> del movimiento.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Detecta la flecha derecha',
          desc: 'Ve a <b>Inicio</b> y arrastra el último bloque <em>¿Tecla presionada?</em>. Selecciona <b>→ Derecha</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'key_is_pressed', bloqueLabel: '¿Tecla presionada?'
        },
        {
          titulo: 'Mueve el personaje a la derecha',
          desc: 'Ve a <b>Inicio</b> y arrastra el último bloque <em>Mover personaje</em>. Usa dx=<b>4</b>, dy=<b>0</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_move', bloqueLabel: 'Mover personaje'
        },
        {
          titulo: 'Detecta si toca una pared',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>, <b>antes</b> de dibujar al personaje (todavía no llegamos a ese bloque, pero recordalo: el orden importa, igual que en "¡Esquiva y Sobrevive!").',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Comprueba el color de la pared',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>¿Toca este color?</em> en la condición. Usa <b>exactamente</b> el mismo gris de las paredes, <b>#777777</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'touching_color', bloqueLabel: '¿Toca este color?'
        },
        {
          titulo: 'La pared te manda de vuelta al inicio',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Poner personaje en X,Y</em> dentro del <b>hacer</b>. Usa X=<b>20</b>, Y=<b>20</b>: si tocás una pared, no podés atravesarla, volvés al principio.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_set_pos', bloqueLabel: 'Poner personaje en X,Y'
        },
        {
          titulo: 'Detecta si llegaste a la meta',
          desc: 'Afuera del "Si toca pared" (pero todavía antes de dibujar al personaje), ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Comprueba el color de la meta',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>¿Toca este color?</em> en la condición. Usa el verde de la meta, <b>#2ecc71</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'touching_color', bloqueLabel: '¿Toca este color?'
        },
        {
          titulo: 'Muestra el mensaje de victoria',
          desc: 'Dentro del <b>hacer</b>, ve a <b>Inicio</b> y arrastra <em>Escribir texto en pantalla</em>. Escribe "¡Escapaste! 🎉" en X=<b>140</b>, Y=<b>170</b>, color blanco, tamaño <b>22</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Espera un momento para festejar',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>esperar … segundos</em>. Dejalo en <b>1.5</b>, para que te dé tiempo de leer el mensaje antes de volver a empezar.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_wait', bloqueLabel: 'esperar … segundos'
        },
        {
          titulo: 'Vuelve a la entrada para jugar de nuevo',
          desc: 'Ve a <b>Inicio</b> y arrastra <em>Poner personaje en X,Y</em>, como último bloque de este "Si". Usa X=<b>20</b>, Y=<b>20</b>: al escapar, el laberinto se reinicia para que lo puedas recorrer otra vez.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_set_pos', bloqueLabel: 'Poner personaje en X,Y'
        },
        {
          titulo: 'Detecta si toca el borde',
          desc: 'Afuera del "Si toca meta", ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>, para reiniciar al personaje si se sale del canvas.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Comprueba el borde',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>¿Toca el borde?</em> en la condición.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'touching_edge', bloqueLabel: '¿Toca el borde?'
        },
        {
          titulo: 'Regresa al punto de inicio',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Poner personaje en X,Y</em> dentro del <b>hacer</b>. Usa la misma posición inicial, X=<b>20</b>, Y=<b>20</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_set_pos', bloqueLabel: 'Poner personaje en X,Y'
        },
        {
          titulo: 'Dibuja el personaje',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Dibujar personaje</em>, <b>después</b> de comprobar la pared, la meta y el borde -- igual que en "¡Esquiva y Sobrevive!", si lo dibujás antes, los "¿Toca este color?" van a encontrar el color del propio personaje en vez del de las paredes.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_draw', bloqueLabel: 'Dibujar personaje'
        },
        {
          titulo: 'Avanza al siguiente fotograma',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Siguiente frame</em> como último bloque del ciclo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_frame', bloqueLabel: 'Siguiente frame'
        },
        {
          titulo: 'Abre la vista de juego',
          desc: 'Haz clic en <b>Vista Juego</b> para ver el laberinto que construiste.',
          highlightElement: '#btnGame'
        },
        {
          titulo: 'Prueba tu laberinto',
          desc: 'Ejecuta y recorre el laberinto con las flechas: bajá para pasar la primera pared, subí para pasar la segunda, volvé a bajar para pasar la tercera, y llegá al cuadrado verde para escapar. Si tocás una pared gris, volvés al inicio. Ajusta las paredes y prueba que la ruta sea posible antes de compartir tu juego.',
          highlightElement: '#btnGameRun'
        }
      ]
    },

    juego_punteria: {
      title: 'Tiro al Blanco: Puntería y Precisión',
      icon: '🎯',
      diagram: '',
      steps: [
        {
          titulo: '¿Qué aprenderemos?',
          desc: 'Harás un juego donde el objetivo es hacer clic <b>justo sobre</b> un blanco que cambia de posición cada vez que lo aciertas. Solo cuenta si el clic cae <b>cerca del centro</b> del blanco -- hacer clic en cualquier otro lugar de la pantalla se cuenta como un fallo. Vas a usar la misma herramienta de <b>distancia entre puntos</b> que mide qué tan cerca cayó tu clic.',
          highlightCat: null, bloque: null
        },
        {
          titulo: 'Crea un proyecto nuevo',
          desc: 'Antes de empezar, abrí el menú <b>Archivo</b> y hacé clic en <b>Nuevo</b> <span class="icon-btn icon-new"></span> para partir de un workspace limpio (si tenías algo sin guardar, te va a pedir confirmación antes de borrarlo).',
          highlightElement: '#btnArchivo'
        },
        {
          titulo: 'Abre la categoría Inicio',
          desc: 'Haz clic en <b>Inicio</b> en el panel de bloques para ver los bloques de personaje, mouse y aleatorios.',
          highlightCat: 'Inicio', expandCat: null, bloque: null
        },
        {
          titulo: 'Arrastra: Iniciar juego',
          desc: 'Arrastra el bloque <em>Iniciar juego</em>. Configura ancho <b>480</b> y alto <b>360</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_start', bloqueLabel: 'Iniciar juego'
        },
        {
          titulo: 'Crea el blanco',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Crear personaje</em>. Este será el blanco que tienes que acertar.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_create', bloqueLabel: 'Crear personaje'
        },
        {
          titulo: 'Crea la variable puntos',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>puntos</b>.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'puntos', expandCat: null, bloque: null
        },
        {
          titulo: 'Establece puntos',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer puntos a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe el valor inicial de puntos',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em>. Déjalo en <b>0</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Crea la variable fallos',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>fallos</b>: cuenta los clics que caen fuera del blanco.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'fallos', expandCat: null, bloque: null
        },
        {
          titulo: 'Establece fallos',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer fallos a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe el valor inicial de fallos',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em>. Déjalo en <b>0</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Agrega el ciclo del juego',
          desc: 'Ve a <b>Ciclos</b> y arrastra el bloque <em>Repetir mientras Verdadero</em>. Todo el juego de puntería va dentro de este ciclo.',
          highlightCat: 'Ciclos', expandCat: null, bloque: 'controls_whileUntil', bloqueLabel: 'Repetir mientras Verdadero'
        },
        {
          titulo: 'Limpia la pantalla',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Limpiar pantalla</em> como primer bloque dentro del ciclo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_clear', bloqueLabel: 'Limpiar pantalla'
        },
        {
          titulo: 'Dibuja el blanco',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Dibujar personaje</em>, después de limpiar la pantalla.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_draw', bloqueLabel: 'Dibujar personaje'
        },
        {
          titulo: 'Condición: clic izquierdo',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>Si … hacer</em> dentro del ciclo.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Detecta el clic izquierdo',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>¿Clic izquierdo?</em> en la condición.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'mouse_left_clicked', bloqueLabel: '¿Clic izquierdo?'
        },
        {
          titulo: '¿El clic cayó cerca del blanco?',
          desc: 'Dentro del <b>hacer</b>, ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>. Hacé clic en el <b>⚙️</b> (engranaje) y arrastrale un <b>"si no"</b> adentro -- lo vas a necesitar para contar los fallos, no solo los aciertos.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Compara la distancia',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>&lt; (menor que)</em> en la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '< (menor que)'
        },
        {
          titulo: 'Calcula la distancia del clic al blanco',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Distancia entre puntos</em>. Colócalo en el primer hueco de la comparación.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_distance', bloqueLabel: 'Distancia entre puntos'
        },
        {
          titulo: 'Obtén la posición X del clic',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Posición X del mouse</em>. Colócalo en el primer hueco (X1) de la distancia.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'mouse_x', bloqueLabel: 'Posición X del mouse'
        },
        {
          titulo: 'Obtén la posición Y del clic',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Posición Y del mouse</em>. Colócalo en el segundo hueco (Y1).',
          highlightCat: 'Inicio', expandCat: null, bloque: 'mouse_y', bloqueLabel: 'Posición Y del mouse'
        },
        {
          titulo: 'Obtén la posición X del blanco',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Posición X del personaje</em>. Colócalo en el tercer hueco (X2).',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_get_x', bloqueLabel: 'Posición X del personaje'
        },
        {
          titulo: 'Obtén la posición Y del blanco',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Posición Y del personaje</em>. Colócalo en el cuarto hueco (Y2).',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_get_y', bloqueLabel: 'Posición Y del personaje'
        },
        {
          titulo: 'Escribe el margen de acierto',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>25</b>. Colócalo en el segundo hueco de la comparación: si el clic cayó a menos de 25 píxeles del centro del blanco, cuenta como acierto.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Suma un punto',
          desc: 'En la rama de <b>acertaste</b>, ve a <b>Variables</b> y arrastra otro bloque <em>Establecer puntos a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Suma 1 al puntaje actual',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>+ (suma)</em>. Conéctalo al bloque anterior.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén los puntos actuales',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener puntos</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'puntos' }, bloqueLabel: 'obtener puntos'
        },
        {
          titulo: 'Escribe 1 para sumar',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>1</b>. Colócalo en el segundo hueco de la suma.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Mueve el blanco a una posición nueva',
          desc: 'Todavía dentro de <b>acertaste</b>, ve a <b>Inicio</b> y arrastra el bloque <em>Poner personaje en X,Y</em>, para que el blanco cambie de lugar cada vez que lo aciertas.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_set_pos', bloqueLabel: 'Poner personaje en X,Y'
        },
        {
          titulo: 'Obtén una posición X al azar',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Número aleatorio</em>. Colócalo en el hueco X, entre <b>0</b> y <b>440</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Obtén una posición Y al azar',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>. Colócalo en el hueco Y, entre <b>0</b> y <b>320</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Si no acertaste: suma un fallo',
          desc: 'Bajá hasta la rama <b>"si no"</b> del mismo bloque "Si" (la que agregaste con el engranaje). Ve a <b>Variables</b> y arrastra <em>Establecer fallos a</em> ahí dentro.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Suma 1 a los fallos',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>+ (suma)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén los fallos actuales',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener fallos</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'fallos' }, bloqueLabel: 'obtener fallos'
        },
        {
          titulo: 'Escribe 1 para sumar a fallos',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>1</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Muestra los puntos y los fallos',
          desc: 'Ya afuera de los dos "Si" (pero todavía dentro del ciclo), ve a <b>Inicio</b> y arrastra el bloque <em>Escribir texto en pantalla</em>. En el hueco de texto, ve a <b>Textos</b> y arrastra <em>unir</em> (join) con 4 huecos: "Puntos: ", <em>obtener puntos</em>, "  Fallos: ", <em>obtener fallos</em>. Ubícalo en X=<b>20</b>, Y=<b>20</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Avanza al siguiente fotograma',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Siguiente frame</em> como último bloque del ciclo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_frame', bloqueLabel: 'Siguiente frame'
        },
        {
          titulo: 'Abre la vista de juego',
          desc: 'Haz clic en <b>Vista Juego</b> para ver el blanco y probar tu puntería.',
          highlightElement: '#btnGame'
        },
        {
          titulo: 'Juega y mejora',
          desc: 'Hacé clic justo sobre el blanco para sumar puntos -- si clicás lejos, suma a <b>fallos</b> en vez de a <b>puntos</b>. Ajusta el margen de 25 píxeles para que sea más o menos exigente.',
          highlightElement: '#btnGameRun'
        }
      ]
    }
  };

  /* ── Desafío de Robótica: el carrito con el control de 5 botones (ADKey) ──
     Los dos tutoriales usan el mismo carrito (L298N en 16/17/25/26 y ADKey
     en el pin 35, a 10 bits). Cada botón del ADKey da un número distinto:
     izquierda < 100, arriba 100-200, abajo 200-300, derecha 300-500; sin
     apretar, más de 600. Herramientas › A por la Bandera / La Ruta del
     Conocimiento explican cada juego. */
  function pasoVariable(nombre, desc) {
    return { titulo: 'Crea la variable ' + nombre, desc: desc, highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: nombre, expandCat: null, bloque: null };
  }
  function pasoFuncion(nombre, desc) {
    return paso('Crea la función ' + nombre, desc, 'Funciones', 'procedures_defnoreturn', 'para … hacer');
  }
  function pasoLlamar(nombre, desc) {
    return paso('Llama a ' + nombre, desc, 'Funciones', 'procedures_callnoreturn', nombre);
  }
  function pasoMotor(titulo, motor, in1, in2) {
    return {
      titulo: titulo,
      desc: 'Ve a <b>Actuadores › Motor DC</b> y arrastra <em>Controlar Motor DC (encender/apagar)</em> dentro de la función. Elige motor <b>' + motor + '</b>, el primer selector en <b>' + in1 + '</b> y el segundo en <b>' + in2 + '</b>.',
      highlightCat: 'Motor DC', expandCat: 'Actuadores', bloque: 'move_dc_motor1_on_off', bloqueLabel: 'Controlar Motor DC (encender/apagar)'
    };
  }
  // Las 5 funciones de movimiento (motor A = rueda izquierda, motor B = derecha).
  function pasosMovimientos() {
    var MOV = [
      ['adelante', 'las dos ruedas giran hacia adelante', ['on', 'off'], ['on', 'off']],
      ['atras', 'las dos ruedas giran hacia atrás', ['off', 'on'], ['off', 'on']],
      ['izquierda', 'la rueda izquierda va hacia atrás y la derecha hacia adelante: el carrito gira en su lugar', ['off', 'on'], ['on', 'off']],
      ['derecha', 'la rueda izquierda va hacia adelante y la derecha hacia atrás', ['on', 'off'], ['off', 'on']],
      ['alto', 'se apagan las dos ruedas', ['off', 'off'], ['off', 'off']]
    ];
    var pasos = [];
    MOV.forEach(function (m) {
      pasos.push(pasoFuncion(m[0], 'Ve a <b>Funciones</b> y arrastra <em>para hacer algo</em> a un lugar vacío (suelto). Haz clic en su nombre y escribe <b>' + m[0] + '</b>: ' + m[1] + '.'));
      pasos.push(pasoMotor(m[0] + ': rueda izquierda', 'A', m[2][0], m[2][1]));
      pasos.push(pasoMotor(m[0] + ': rueda derecha', 'B', m[3][0], m[3][1]));
    });
    return pasos;
  }
  // Un «si» que llama a una función cuando la tecla está en un rango.
  function pasosSi(boton, desde, hasta, funcion) {
    var cond = desde == null ? '<b>tecla &lt; ' + hasta + '</b>'
      : hasta == null ? '<b>tecla &gt; ' + desde + '</b>'
      : '<b>tecla &gt; ' + desde + '</b> y <b>tecla &lt; ' + hasta + '</b>';
    var pasos = [paso('Si se aprieta ' + boton, 'Ve a <b>Lógica</b> y arrastra un bloque <em>si hacer</em> dentro del ciclo, debajo de lo anterior. Vamos a revisar si ' + cond + '.', 'Lógica', 'controls_if', 'si hacer')];
    if (desde != null && hasta != null) {
      pasos.push(paso('Une dos comparaciones con «y»', 'Ve a <b>Lógica</b> y pon un bloque <em>y</em> en el hueco del <em>si</em>: la tecla debe estar entre ' + desde + ' y ' + hasta + '.', 'Lógica', 'logic_operation', 'y'));
      pasos.push(paso('Las dos comparaciones', 'Arrastra dos bloques <em>comparar</em> (uno en cada hueco del <em>y</em>): el primero con <b>&gt;</b> y el segundo con <b>&lt;</b>.', 'Lógica', 'logic_compare', 'Comparar'));
    } else {
      pasos.push(paso('La comparación', 'Ve a <b>Lógica</b> y pon un bloque <em>comparar</em> en el hueco del <em>si</em>, con el signo <b>' + (desde == null ? '&lt;' : '&gt;') + '</b>.', 'Lógica', 'logic_compare', 'Comparar'));
    }
    pasos.push(pasoGet('tecla', 'Ve a <b>Variables</b> y pon <em>obtener tecla</em> del lado izquierdo de ' + (desde != null && hasta != null ? 'cada comparación' : 'la comparación') + '.'));
    pasos.push(pasoNumero(desde == null ? hasta : desde, 'Ve a <b>Matemáticas</b> y pon el número del lado derecho: ' + cond + '.'));
    pasos.push(pasoLlamar(funcion, 'Ve a <b>Funciones</b> y arrastra <em>' + funcion + '</em> dentro del <em>si</em>.'));
    return pasos;
  }
  var PASOS_CARRITO = [
    {
      titulo: 'Crea un proyecto nuevo',
      desc: 'Antes de empezar, abre el menú <b>Archivo</b> y haz clic en <b>Nuevo</b> <span class="icon-btn icon-new"></span> para partir de un área de trabajo limpia.',
      highlightElement: '#btnArchivo'
    },
    {
      titulo: 'Conecta el carrito',
      desc: '<b>Puente H L298N</b> (como en el tutorial Puente H):<br>📌 IN1 → pin <b>16</b> · IN2 → pin <b>17</b> · IN3 → pin <b>25</b> · IN4 → pin <b>26</b><br>⚡ 12V → pilas (+), pasando por el interruptor · ⏚ GND → GND del ESP32 y pilas (−)<br>🔌 OUT1/OUT2 → rueda <b>izquierda</b> · OUT3/OUT4 → rueda <b>derecha</b><br><br><b>Control de 5 botones (ADKey)</b>:<br>📌 S → pin <b>35</b> · ⚡ V → 3.3V · ⏚ G → GND',
      highlightCat: null, bloque: null
    },
    paso('Prepara los motores', 'Ve a <b>Actuadores › Motor DC</b> y arrastra <em>Preparar Motor DC (L298N)</em>. Deja los pines IN1=<b>16</b>, IN2=<b>17</b>, IN3=<b>25</b>, IN4=<b>26</b>.', 'Motor DC', 'init_dc_motor', 'Preparar Motor DC (L298N)'),
    paso('Prepara el control de botones', 'Ve a <b>Sensores › Sensores Analogicos</b> y arrastra el bloque del <b>ADKey</b> debajo del anterior. Déjalo en el pin <b>35</b>, <b>ADC.ATTN_11DB</b> y <b>ADC.WIDTH_10BIT</b>.', 'Sensores Analogicos', 'analog_sensor_init', 'ADKey')
  ];
  PASOS_CARRITO[2].expandCat = 'Actuadores';
  PASOS_CARRITO[3].expandCat = 'Sensores';
  function pasosFinales(probar) {
    return [
      {
        titulo: 'Guarda tu proyecto',
        desc: 'Abre el menú <b>Archivo</b> y haz clic en <b>Guardar</b> <span class="icon-btn icon-save"></span>.',
        highlightElement: '#btnArchivo'
      },
      {
        titulo: 'Conecta tu ESP32',
        desc: 'Haz clic en <b>Conectar</b> <span class="icon-btn icon-disconnect"></span> y elige el puerto de tu ESP32.',
        highlightElement: '#btnConnection'
      },
      {
        titulo: 'Ejecuta y prueba',
        desc: probar,
        highlightElement: '#btnRun',
        waitForAction: 'run'
      }
    ];
  }

  tutorials.juego_bandera_carrito = {
    title: 'A por la Bandera: maneja tu carrito con botones',
    icon: '🚩',
    diagram: 'img/conexiones/carrito_botones.svg',
    steps: [
      {
        titulo: '¿Qué aprenderemos?',
        desc: 'Vamos a programar el carrito para jugar <b>A por la Bandera</b>: mientras <b>mantienes apretado</b> un botón del control, el carrito se mueve hacia ese lado, y cuando lo <b>sueltas</b>, se detiene. Así podrás llevarlo hasta cada vaso con bandera.<br><br>Las reglas del juego, la mesa del juez y el cronómetro están en <b>🛠 Herramientas › A por la Bandera</b>.',
        highlightCat: null, bloque: null
      }
    ].concat(PASOS_CARRITO, pasosMovimientos(), [
      pasoVariable('tecla', 'Ve a <b>Variables</b> y crea una variable llamada <b>tecla</b>: ahí guardaremos qué botón está apretado.'),
      paso('Agrega el ciclo', 'Ve a <b>Ciclos</b> y arrastra <em>repetir mientras verdadero</em> debajo del bloque del ADKey.', 'Ciclos', 'controls_whileUntil', 'Repetir mientras Verdadero'),
      pasoSet('Lee el control', 'tecla', 'Dentro del ciclo arrastra <em>establecer tecla a</em>.'),
      paso('El número del botón', 'Ve a <b>Sensores › Sensores Analogicos</b> y pon <em>adkey Leer</em> en el hueco de <em>establecer tecla a</em>.', 'Sensores Analogicos', 'analog_sensor_read', 'adkey Leer')
    ], pasosSi('◀ izquierda', null, 100, 'izquierda'),
      pasosSi('▲ arriba', 100, 200, 'adelante'),
      pasosSi('▼ abajo', 200, 300, 'atras'),
      pasosSi('▶ derecha', 300, 500, 'derecha'),
      pasosSi('nada (o el botón del centro)', 600, null, 'alto'),
      [
        paso('Una pausa cortita', 'Ve a <b>Tiempo</b> y arrastra <em>esperar</em> al final del ciclo con <b>0.05</b> segundos: así el ciclo revisa el control 20 veces por segundo.', 'Tiempo', 'time_sleep', 'esperar')
      ],
      pasosFinales('Haz clic en <b>Ejecutar</b> <span class="icon-btn icon-run"></span>. Mantén apretado ▲: el carrito avanza. Suéltalo: se detiene. 💡 Si una rueda gira al revés, cambia de lugar sus dos cables en el L298N (o intercambia on y off en esa rueda). ¡Ahora sí, a jugar A por la Bandera!')
    )
  };

  tutorials.juego_ruta_robot = {
    title: 'La Ruta del Conocimiento: robot por bloques',
    icon: '🧩',
    diagram: 'img/conexiones/carrito_botones.svg',
    steps: [
      {
        titulo: '¿Qué aprenderemos?',
        desc: 'Vamos a programar el robot para jugar <b>La Ruta del Conocimiento</b>: cada vez que aprietas ▲ avanza <b>exactamente un bloque</b> (24 cm), y con ◀ ▶ gira <b>90°</b> en su lugar. Si el dado dice 3, aprietas ▲ tres veces.<br><br>Cómo armar el tablero, calibrar el robot y jugar con los dados está en <b>🛠 Herramientas › La Ruta del Conocimiento</b>. Si ya hiciste el tutorial <b>A por la Bandera</b>, el carrito es el mismo.',
        highlightCat: null, bloque: null
      }
    ].concat(PASOS_CARRITO, [
      pasoVariable('tiempo_bloque', 'Ve a <b>Variables</b> y crea <b>tiempo_bloque</b>: los segundos que tarda el robot en avanzar 24 cm.'),
      pasoSet('Tiempo para un bloque', 'tiempo_bloque', 'Arrastra <em>establecer tiempo_bloque a</em> debajo del bloque del ADKey.'),
      pasoNumero(0.8, 'Ve a <b>Matemáticas</b> y pon <b>0.8</b>. Después lo ajustarás con la calculadora de la herramienta.'),
      pasoVariable('tiempo_giro', 'Crea otra variable: <b>tiempo_giro</b>, los segundos que tarda en girar 90°.'),
      pasoSet('Tiempo para girar', 'tiempo_giro', 'Arrastra <em>establecer tiempo_giro a</em> debajo del anterior.'),
      pasoNumero(0.6, 'Pon <b>0.6</b> por ahora.')
    ], pasosMovimientos(), [
      pasoFuncion('avanzar_bloque', 'Crea otra función suelta y llámala <b>avanzar_bloque</b>: avanza, espera lo que tarda un bloque y se detiene.'),
      pasoLlamar('adelante', 'Dentro de <b>avanzar_bloque</b> arrastra <em>adelante</em>.'),
      paso('Espera un bloque', 'Ve a <b>Tiempo</b> y arrastra <em>esperar</em> debajo. En su hueco pon <em>obtener tiempo_bloque</em> (de <b>Variables</b>).', 'Tiempo', 'time_sleep', 'esperar'),
      pasoLlamar('alto', 'Al final de <b>avanzar_bloque</b> arrastra <em>alto</em>.'),
      pasoFuncion('retroceder_bloque', 'Crea la función <b>retroceder_bloque</b> igual, pero con <em>atras</em>: llama <em>atras</em>, espera <em>tiempo_bloque</em> y llama <em>alto</em>.'),
      pasoLlamar('atras', 'Arrastra <em>atras</em>, luego <em>esperar tiempo_bloque</em> y al final <em>alto</em> dentro de <b>retroceder_bloque</b>.'),
      pasoFuncion('girar_izquierda', 'Crea la función <b>girar_izquierda</b>: llama <em>izquierda</em>, espera <em>tiempo_giro</em> y llama <em>alto</em>.'),
      pasoLlamar('izquierda', 'Arrastra <em>izquierda</em>, luego <em>esperar tiempo_giro</em> y al final <em>alto</em> dentro de <b>girar_izquierda</b>.'),
      pasoFuncion('girar_derecha', 'Crea la función <b>girar_derecha</b>: llama <em>derecha</em>, espera <em>tiempo_giro</em> y llama <em>alto</em>.'),
      pasoLlamar('derecha', 'Arrastra <em>derecha</em>, luego <em>esperar tiempo_giro</em> y al final <em>alto</em> dentro de <b>girar_derecha</b>.'),
      pasoVariable('tecla', 'Ve a <b>Variables</b> y crea la variable <b>tecla</b>.'),
      paso('Agrega el ciclo', 'Ve a <b>Ciclos</b> y arrastra <em>repetir mientras verdadero</em> debajo de los tiempos.', 'Ciclos', 'controls_whileUntil', 'Repetir mientras Verdadero'),
      pasoSet('Lee el control', 'tecla', 'Dentro del ciclo arrastra <em>establecer tecla a</em>.'),
      paso('El número del botón', 'Ve a <b>Sensores › Sensores Analogicos</b> y pon <em>adkey Leer</em> en el hueco.', 'Sensores Analogicos', 'analog_sensor_read', 'adkey Leer')
    ], pasosSi('◀ izquierda', null, 100, 'girar_izquierda'),
      pasosSi('▲ arriba', 100, 200, 'avanzar_bloque'),
      pasosSi('▼ abajo', 200, 300, 'retroceder_bloque'),
      pasosSi('▶ derecha', 300, 500, 'girar_derecha'),
      [
        paso('Un apretón, un movimiento', 'Ve a <b>Tiempo</b> y arrastra <em>esperar</em> al final del ciclo con <b>0.3</b> segundos: así, aunque dejes el dedo un poquito, cada apretón cuenta una sola vez.', 'Tiempo', 'time_sleep', 'esperar')
      ],
      pasosFinales('Haz clic en <b>Ejecutar</b> <span class="icon-btn icon-run"></span>. Pon el robot en el centro de una ficha y aprieta ▲: debe llegar al centro de la siguiente. Si se queda corto o se pasa, mide y usa la calculadora de <b>🛠 Herramientas › La Ruta del Conocimiento › Cómo se mueve el robot</b> para cambiar <b>tiempo_bloque</b> y <b>tiempo_giro</b>.')
    )
  };

  /* ── Los mismos juegos en la pantalla, con el motor de juegos (Inicio) ──
     Se manejan con las flechas del teclado y el personaje robot. */
  var INICIO_JUEGO = [
    {
      titulo: 'Crea un proyecto nuevo',
      desc: 'Abre el menú <b>Archivo</b> y haz clic en <b>Nuevo</b> <span class="icon-btn icon-new"></span> para partir de un área de trabajo limpia.',
      highlightElement: '#btnArchivo'
    },
    paso('Abre la categoría Inicio', 'Haz clic en <b>Inicio</b>: ahí están los bloques del motor de juegos (pantalla, personajes, teclado y dibujo).', 'Inicio', null, null)
  ];
  function pasoFlecha(nombre, tecla, dx, dy) {
    return [
      paso('Si se aprieta ' + nombre, 'Ve a <b>Lógica</b> y arrastra un <em>si hacer</em> dentro del ciclo.', 'Lógica', 'controls_if', 'si hacer'),
      paso('La flecha ' + nombre, 'Ve a <b>Inicio</b> y pon <em>⌨️ tecla presionada?</em> en la condición. Elige <b>' + tecla + '</b>.', 'Inicio', 'key_is_pressed', 'tecla presionada?'),
      paso('Mueve el robot', 'Ve a <b>Inicio</b> y arrastra <em>🏃 mover personaje</em> dentro del <em>si</em>. Escribe <b>robot</b> como nombre, dx=<b>' + dx + '</b> y dy=<b>' + dy + '</b>.', 'Inicio', 'sprite_move_named', 'mover personaje')
    ];
  }
  function pasosVer(probar) {
    return [
      { titulo: 'Abre la vista de juego', desc: 'Haz clic en <b>Vista Juego</b> 🎮 para ver la pantalla del juego.', highlightElement: '#btnGame' },
      { titulo: '¡A jugar!', desc: probar, highlightElement: '#btnGameRun' }
    ];
  }

  tutorials.juego_bandera_pantalla = {
    title: 'A por la Bandera en la pantalla',
    icon: '🤖',
    diagram: '',
    steps: (function () {
      var t = function (texto, desc) { return paso('Escribe "' + texto + '"', desc, 'Textos', 'text', 'texto'); };
      var unir = function (desc) { return paso('Une textos', desc, 'Textos', 'text_join', 'crear texto con'); };
      var crearVaso = function (n, x) {
        return [
          paso('Crea el vaso ' + n, 'Ve a <b>Inicio</b> y arrastra otro <em>🧍 crear personaje</em> debajo. Escribe el nombre <b>vaso' + n + '</b>, X=<b>' + x + '</b>, Y=<b>300</b>, ancho <b>40</b> y alto <b>40</b>.', 'Inicio', 'sprite_create_named', 'crear personaje'),
          paso('La imagen del vaso ' + n, 'Ve a <b>Inicio</b> y arrastra el bloque <em>🍔 comida</em> al hueco de imagen de <b>vaso' + n + '</b> (encima del texto car.png). En su lista elige el <b>vaso</b>.', 'Inicio', 'game_sprite_comida', 'comida')
        ];
      };
      var vasoMeta = function (donde) {
        return [
          unir('Ve a <b>Textos</b> y pon un <em>crear texto con</em> en ' + donde + '.'),
          t('vaso', 'En el primer hueco de <em>crear texto con</em> pon un bloque de texto con <b>vaso</b> (sin espacio).'),
          pasoGet('meta', 'En el segundo hueco pon <em>obtener meta</em>. Si meta vale 2, el texto queda <b>vaso2</b>.')
        ];
      };
      var siPuntos = function (titulo, signo, desc) {
        return [
          paso(titulo, desc, 'Lógica', 'controls_if', 'si hacer'),
          paso('Compara los puntos', 'Ve a <b>Lógica</b> y pon un <em>comparar</em> en la condición, con el signo <b>' + signo + '</b>.', 'Lógica', 'logic_compare', 'Comparar'),
          pasoGet('puntos', 'Del lado izquierdo pon <em>obtener puntos</em>.'),
          pasoNumero(3, 'Del lado derecho pon el número <b>3</b> (hay 3 vasos).')
        ];
      };
      var dibujar = function (n) {
        return paso('Dibuja ' + n, 'Ve a <b>Inicio</b> y arrastra <em>🖊️ dibujar personaje</em> dentro del ciclo. Escribe <b>' + n + '</b>.', 'Inicio', 'sprite_draw_named', 'dibujar personaje');
      };
      var etiqueta = function (texto, x) {
        return paso('Etiqueta: ' + texto, 'Arrastra otro <em>✏️ escribir</em>. En su texto escribe <b>' + texto + '</b>, X=<b>' + x + '</b>, Y=<b>370</b>, tamaño <b>16</b>.', 'Inicio', 'game_show_text', 'escribir');
      };
      return [
        {
          titulo: '¿Qué aprenderemos?',
          desc: 'Vamos a hacer <b>A por la Bandera</b> en la pantalla: un <b>robot</b> que manejas con las <b>flechas</b> del teclado tiene que ir por el vaso que le pide el juego. Cuando lo toca, el vaso <b>desaparece</b>, ganas un punto y el juego te pide otro de los que quedan. ¡Recoge los 3!<br><br>Es como el juego con el carrito, pero sin cables: ideal para practicar antes de manejar el robot de verdad.',
          highlightCat: null, bloque: null
        }
      ].concat(INICIO_JUEGO, [
        paso('Inicia el juego', 'Arrastra <em>🎮 iniciar juego</em> al área de trabajo. Pon ancho <b>600</b> y alto <b>400</b>. Este bloque va siempre primero.', 'Inicio', 'game_start', 'iniciar juego'),
        paso('Color de fondo', 'Arrastra <em>color de fondo</em> debajo y elige un azul muy oscuro.', 'Inicio', 'game_set_bg', 'color de fondo'),
        paso('Crea el robot', 'Arrastra <em>🧍 crear personaje</em> (el que tiene nombre) debajo. Escribe el nombre <b>robot</b>, X=<b>276</b>, Y=<b>30</b>, ancho <b>48</b> y alto <b>48</b>.', 'Inicio', 'sprite_create_named', 'crear personaje'),
        paso('La imagen del robot', 'Ve a <b>Inicio</b> y arrastra el bloque <em>🧍 personaje</em> al hueco de imagen del robot, <b>encima del texto car.png</b> (así lo reemplaza). En su lista elige el <b>robot</b>.', 'Inicio', 'game_sprite_personajes', 'personaje')
      ], crearVaso(1, 80), crearVaso(2, 280), crearVaso(3, 480), [
        pasoVariable('puntos', 'Ve a <b>Variables</b> y crea la variable <b>puntos</b>.'),
        pasoSet('Empieza con 0 puntos', 'puntos', 'Arrastra <em>establecer puntos a</em> debajo del último vaso.'),
        pasoNumero(0, 'Ve a <b>Matemáticas</b> y pon el número <b>0</b> en su hueco.'),
        pasoVariable('meta', 'Crea otra variable: <b>meta</b>, el número del vaso al que hay que ir.'),
        pasoSet('El primer vaso', 'meta', 'Arrastra <em>establecer meta a</em> debajo.'),
        paso('Un vaso al azar', 'Ve a <b>Inicio</b> y pon <em>🎲 número entero aleatorio entre</em> en el hueco de meta. Escribe <b>1</b> y <b>3</b>.', 'Inicio', 'game_random_int', 'número aleatorio'),
        paso('El ciclo del juego', 'Ve a <b>Ciclos</b> y arrastra <em>repetir mientras verdadero</em> debajo. Todo lo que se mueve va dentro.', 'Ciclos', 'controls_whileUntil', 'Repetir mientras Verdadero'),
        paso('Limpia la pantalla', 'Ve a <b>Inicio</b> y arrastra <em>limpiar pantalla</em> como primer bloque dentro del ciclo.', 'Inicio', 'game_clear', 'limpiar pantalla')
      ], pasoFlecha('arriba', '↑ Arriba', 0, -5), pasoFlecha('abajo', '↓ Abajo', 0, 5), pasoFlecha('a la izquierda', '← Izquierda', -5, 0), pasoFlecha('a la derecha', '→ Derecha', 5, 0),
        siPuntos('Si todavía quedan vasos', '&lt;', 'Ve a <b>Lógica</b> y arrastra un <em>si hacer</em> debajo de las flechas: solo diremos a qué vaso ir mientras falten vasos.'),
        [
          paso('Di a qué vaso ir', 'Ve a <b>Inicio</b> y arrastra <em>✏️ escribir</em> <b>dentro</b> de ese <em>si</em>. Pon X=<b>20</b>, Y=<b>30</b> y tamaño <b>22</b>.', 'Inicio', 'game_show_text', 'escribir'),
          unir('Ve a <b>Textos</b> y pon un <em>crear texto con</em> en el hueco del texto de <em>escribir</em>.'),
          t('Ve por el vaso ', 'En el primer hueco pon un texto con <b>Ve por el vaso </b> (deja un espacio al final).'),
          pasoGet('meta', 'En el segundo hueco pon <em>obtener meta</em>.'),
          paso('Muestra los puntos', 'Afuera del <em>si</em>, arrastra otro <em>✏️ escribir</em> con X=<b>460</b>, Y=<b>30</b> y tamaño <b>22</b>.', 'Inicio', 'game_show_text', 'escribir'),
          unir('Pon un <em>crear texto con</em> en su texto.'),
          t('Puntos: ', 'En el primer hueco escribe <b>Puntos: </b>.'),
          pasoGet('puntos', 'En el segundo hueco pon <em>obtener puntos</em>.'),
          etiqueta('1 México', 65), etiqueta('2 Brasil', 268), etiqueta('3 Francia', 462),
          dibujar('vaso1'), dibujar('vaso2'), dibujar('vaso3'), dibujar('robot'),
          paso('¿Llegó al vaso?', 'Ve a <b>Lógica</b> y arrastra un <em>si hacer</em> debajo de <em>dibujar robot</em>.', 'Lógica', 'controls_if', 'si hacer'),
          paso('¿El robot toca un vaso?', 'Ve a <b>Inicio</b> y pon <em>💥 ¿ toca a ?</em> en la condición. En el primer hueco escribe <b>robot</b>.', 'Inicio', 'touching_sprite', '¿toca a?')
        ],
        vasoMeta('el segundo hueco de <em>¿toca a?</em>'),
        [
          paso('Suma un punto', 'Ve a <b>Variables</b> y arrastra <em>cambiar puntos por 1</em> dentro del <em>si</em>.', 'Variables', 'math_change', 'cambiar por'),
          paso('Un sonido de premio', 'Ve a <b>Inicio</b> y arrastra <em>🔊 tocar nota</em>: <b>880</b> Hz y <b>0.2</b> s.', 'Inicio', 'game_play_tone', 'tocar nota'),
          paso('Esconde el vaso recogido', 'Ve a <b>Inicio</b> y arrastra <em>🙈 esconder personaje</em>. Un personaje escondido ya no se dibuja ni se puede tocar: ¡el vaso desaparece!', 'Inicio', 'sprite_hide_named', 'esconder personaje')
        ],
        vasoMeta('el hueco de <em>esconder personaje</em>'),
        [
          paso('El robot regresa al inicio', 'Arrastra <em>📍 poner personaje</em>: <b>robot</b> en X=<b>276</b>, Y=<b>30</b>.', 'Inicio', 'sprite_set_pos_named', 'poner personaje')
        ],
        siPuntos('Si quedan vasos, elige otro', '&lt;', 'Todavía dentro del <em>si</em> del vaso, arrastra otro <em>si hacer</em>.'),
        [
          paso('Repite hasta encontrar un vaso que se vea', 'Ve a <b>Ciclos</b> y arrastra <em>repetir mientras</em> dentro de este <em>si</em>. Cámbialo a <b>repetir hasta</b>: así buscará un vaso que todavía esté en la pantalla.', 'Ciclos', 'controls_whileUntil', 'repetir hasta'),
          paso('¿Se ve el vaso?', 'Ve a <b>Inicio</b> y pon <em>👀 ¿se ve ?</em> en la condición de <em>repetir hasta</em>.', 'Inicio', 'sprite_visible_named', '¿se ve?')
        ],
        vasoMeta('el hueco de <em>¿se ve?</em>'),
        [
          pasoSet('Elige otro vaso', 'meta', 'Dentro de <em>repetir hasta</em> arrastra <em>establecer meta a</em>.'),
          paso('Otro número al azar', 'Pon <em>🎲 número entero aleatorio entre</em> <b>1</b> y <b>3</b>. Si sale un vaso ya escondido, el ciclo vuelve a elegir.', 'Inicio', 'game_random_int', 'número aleatorio')
        ],
        siPuntos('¿Ya recogiste todos?', '=', 'Afuera del <em>si</em> del vaso (todavía dentro del ciclo), arrastra otro <em>si hacer</em>.'),
        [
          paso('¡Ganaste!', 'Dentro arrastra <em>✏️ escribir</em> con el texto <b>¡Recogiste todos los vasos!</b>, X=<b>110</b>, Y=<b>200</b>, tamaño <b>28</b> y color verde.', 'Inicio', 'game_show_text', 'escribir'),
          paso('Siguiente fotograma', 'Ve a <b>Inicio</b> y arrastra <em>siguiente frame</em> como <b>último</b> bloque del ciclo.', 'Inicio', 'game_frame', 'siguiente frame')
        ],
        pasosVer('Haz clic en <b>▶ Ejecutar</b> y maneja el robot con las flechas hasta el vaso que te pide. Cada vaso que recoges desaparece. 💡 Si el robot sale como un carrito, revisa que pusiste el bloque <em>🧍 personaje</em> con el robot en su imagen.'));
    })()
  };

  tutorials.juego_ruta_pantalla = {
    title: 'La Ruta del Conocimiento en la pantalla',
    icon: '🎲',
    diagram: '',
    steps: [
      {
        titulo: '¿Qué aprenderemos?',
        desc: 'Vamos a hacer <b>La Ruta del Conocimiento</b> en la pantalla: con la <b>barra espaciadora</b> tiras el dado, y con la flecha <b>→</b> el robot avanza <b>una casilla</b> por cada apretón, hasta gastar los pasos que te dio el dado. ¡Llega a la meta!',
        highlightCat: null, bloque: null
      }
    ].concat(INICIO_JUEGO, [
      paso('Inicia el juego', 'Arrastra <em>🎮 iniciar juego</em> con ancho <b>600</b> y alto <b>300</b>.', 'Inicio', 'game_start', 'iniciar juego'),
      paso('Color de fondo', 'Arrastra <em>color de fondo</em> y elige un azul muy oscuro.', 'Inicio', 'game_set_bg', 'color de fondo'),
      paso('Crea el robot', 'Arrastra <em>🧍 crear personaje</em>: nombre <b>robot</b>, X=<b>26</b>, Y=<b>116</b>, ancho y alto <b>48</b>.', 'Inicio', 'sprite_create_named', 'crear personaje'),
      paso('Elige el robot', 'En su imagen pon <em>🧍 personaje</em> y elige el <b>robot</b>.', 'Inicio', 'game_sprite_personajes', 'personaje'),
      pasoVariable('casilla', 'Ve a <b>Variables</b> y crea <b>casilla</b>: en qué casilla va el robot.'),
      pasoSet('Empieza en la casilla 0', 'casilla', 'Arrastra <em>establecer casilla a</em> con <b>0</b>.'),
      pasoVariable('dado', 'Crea la variable <b>dado</b>.'),
      pasoSet('El dado empieza en 0', 'dado', 'Arrastra <em>establecer dado a</em> con <b>0</b>.'),
      pasoVariable('pasos', 'Crea la variable <b>pasos</b>: cuántas casillas te faltan por avanzar.'),
      pasoSet('Sin pasos al inicio', 'pasos', 'Arrastra <em>establecer pasos a</em> con <b>0</b>.'),
      paso('El ciclo del juego', 'Ve a <b>Ciclos</b> y arrastra <em>repetir mientras verdadero</em>.', 'Ciclos', 'controls_whileUntil', 'Repetir mientras Verdadero'),
      paso('Limpia la pantalla', 'Ve a <b>Inicio</b> y arrastra <em>limpiar pantalla</em> dentro del ciclo.', 'Inicio', 'game_clear', 'limpiar pantalla'),
      paso('Un ciclo para las casillas', 'Ve a <b>Ciclos</b> y arrastra <em>contar con i desde 0 hasta 6 de a 1</em>: dibujaremos 7 casillas.', 'Ciclos', 'controls_for', 'contar con'),
      paso('Dibuja cada casilla', 'Ve a <b>Inicio</b> y arrastra <em>⬛ rectángulo sólido</em> dentro del <em>contar</em>: Y=<b>110</b>, ancho y alto <b>60</b>, color azul.', 'Inicio', 'game_draw_rect', 'rectángulo sólido'),
      paso('Una casilla junto a otra', 'En la X pon con <b>Matemáticas</b>: <b>20 + i × 70</b>. Así cada casilla queda 70 píxeles a la derecha de la anterior.', 'Matemáticas', 'math_arithmetic', 'operación'),
      paso('La meta', 'Después del <em>contar</em> arrastra otro <em>rectángulo sólido</em> amarillo en X=<b>510</b>, Y=<b>110</b>, de <b>60</b> × <b>60</b>, y un <em>escribir</em> «META» en X=<b>517</b>, Y=<b>200</b>.', 'Inicio', 'game_draw_rect', 'rectángulo sólido'),
      paso('Si se aprieta espacio', 'Ve a <b>Lógica</b> y arrastra un <em>si hacer</em>. Pon un bloque <em>y</em> en su condición.', 'Lógica', 'controls_if', 'si hacer'),
      paso('Espacio y sin pasos pendientes', 'En el <em>y</em> pon <em>⌨️ tecla Espacio presionada?</em> y <em>comparar</em> <b>pasos = 0</b>: solo puedes tirar cuando ya avanzaste lo del tiro anterior.', 'Inicio', 'key_is_pressed', 'tecla presionada?'),
      pasoSet('Tira el dado', 'dado', 'Dentro del <em>si</em> arrastra <em>establecer dado a</em> con <em>🎲 número entero aleatorio entre 1 y 6</em>.'),
      pasoSet('Los pasos son lo que salió', 'pasos', 'Arrastra <em>establecer pasos a</em> con <em>obtener dado</em>.'),
      paso('Una pausa', 'Ve a <b>Inicio</b> y arrastra <em>⏳ esperar</em> <b>0.3</b> segundos, para que un apretón tire una sola vez.', 'Inicio', 'game_wait', 'esperar'),
      paso('Si se aprieta →', 'Arrastra otro <em>si hacer</em> con un <em>y</em>: <em>tecla → Derecha presionada?</em> y <em>comparar</em> <b>pasos &gt; 0</b>.', 'Lógica', 'controls_if', 'si hacer'),
      paso('Avanza una casilla', 'Dentro, arrastra <em>🏃 mover personaje</em> <b>robot</b> con dx=<b>70</b>, dy=<b>0</b>.', 'Inicio', 'sprite_move_named', 'mover personaje'),
      paso('Cuenta las casillas', 'Ve a <b>Variables</b> y arrastra <em>cambiar casilla por 1</em> y <em>cambiar pasos por -1</em>.', 'Variables', 'math_change', 'cambiar por'),
      paso('¿Llegó a la meta?', 'Arrastra un <em>si</em> con <b>casilla = 7</b> y dentro <em>establecer pasos a 0</em>: en la meta ya no se avanza.', 'Lógica', 'controls_if', 'si hacer'),
      paso('Un apretón, una casilla', 'Al final de este <em>si</em> arrastra <em>⏳ esperar</em> <b>0.25</b> segundos.', 'Inicio', 'game_wait', 'esperar'),
      paso('Muestra el dado', 'Arrastra <em>✏️ escribir</em> en X=<b>20</b>, Y=<b>40</b> con <em>crear texto con</em>: <b>"Dado: "</b>, <em>dado</em>, <b>"   Te faltan: "</b>, <em>pasos</em>.', 'Inicio', 'game_show_text', 'escribir'),
      paso('¡Llegaste!', 'Arrastra un <em>si</em> con <b>casilla = 7</b> y dentro un <em>escribir</em> «¡Llegaste a la meta!» en X=<b>20</b>, Y=<b>260</b>.', 'Lógica', 'controls_if', 'si hacer'),
      paso('Dibuja el robot', 'Arrastra <em>🖊️ dibujar personaje</em> <b>robot</b>.', 'Inicio', 'sprite_draw_named', 'dibujar personaje'),
      paso('Siguiente fotograma', 'Arrastra <em>siguiente frame</em> como último bloque del ciclo.', 'Inicio', 'game_frame', 'siguiente frame')
    ], pasosVer('Haz clic en <b>▶ Ejecutar</b>. Aprieta <b>Espacio</b> para tirar el dado y <b>→</b> para avanzar casilla por casilla. 💡 Reto: agrega un dado de colores (1 = fácil, 2 = medio, 3 = difícil) que diga qué pregunta toca.'))
  };

  // Las subcategorías se abren desde su categoría padre.
  ['juego_bandera_carrito', 'juego_ruta_robot'].forEach(function (k) {
    tutorials[k].steps.forEach(function (s) {
      if (s.highlightCat === 'Sensores Analogicos') s.expandCat = 'Sensores';
      if (s.highlightCat === 'Motor DC') s.expandCat = 'Actuadores';
    });
  });

  if (typeof TUTORIALS === 'undefined') {
    window.TUTORIALS = {};
  }

  Object.assign(TUTORIALS, tutorials);
  window.TUTORIALS_GAMES = tutorials;
})();
