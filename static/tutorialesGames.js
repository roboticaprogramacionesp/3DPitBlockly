(function () {
  'use strict';

  /* NOTA: los bloques de juego (pantalla, personaje, teclado, dibujo…) NO
     viven en una categoría llamada "Juego" -- están dentro de la categoría
     "Inicio" del toolbox (ver templates/index.html, <category name="Inicio">).
     Por eso cada paso usa highlightCat: "Inicio" + un "bloque" real (tipo
     de bloque de Blockly) para que TutorialSteps pueda resaltarlo en el
     flyout y verificar que el alumno ya lo arrastró, igual que hacen los
     tutoriales de LEDs/Sensores/etc. */

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
      title: 'Calculadora Mágica',
      icon: '🧮',
      diagram: '',
      steps: [
        {
          titulo: '¿Qué aprenderemos?',
          desc: 'Vamos a convertir la calculadora en un <b>juego de preguntas</b>: el programa inventa una suma al azar y te muestra dos posibles respuestas. Haz clic en la correcta para ganar un punto -- y aparece una suma nueva, sin parar. También aprenderás a crear tu propia <b>función</b> para no repetir bloques.',
          highlightCat: null, bloque: null
        },
        {
          titulo: 'Abre la categoría Inicio',
          desc: 'Haz clic en <b>Inicio</b> en el panel de bloques para ver los bloques de pantalla y dibujo.',
          highlightCat: 'Inicio', expandCat: null, bloque: null
        },
        {
          titulo: 'Arrastra: Iniciar juego',
          desc: 'Arrastra el bloque <em>Iniciar juego</em> al área de trabajo. Configura ancho <b>480</b> y alto <b>360</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_start', bloqueLabel: 'Iniciar juego'
        },
        {
          titulo: 'Crea la variable numero1',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>numero1</b>. La usaremos dentro de una función que inventa preguntas nuevas.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'numero1', expandCat: null, bloque: null
        },
        {
          titulo: 'Crea la variable numero2',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>numero2</b>.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'numero2', expandCat: null, bloque: null
        },
        {
          titulo: 'Crea la variable correcta',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>correcta</b>: guardará la suma real de numero1 + numero2.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'correcta', expandCat: null, bloque: null
        },
        {
          titulo: 'Crea la variable incorrecta',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>incorrecta</b>: guardará una respuesta falsa, parecida a la correcta.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'incorrecta', expandCat: null, bloque: null
        },
        {
          titulo: 'Crea la variable puntos',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>puntos</b>.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'puntos', expandCat: null, bloque: null
        },
        {
          titulo: 'Establece puntos',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer puntos a</em>, suelto en el área de trabajo (no dentro de nada todavía).',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe 0',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>0</b>. Conéctalo al bloque anterior: empiezas con 0 puntos.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Crea tu función: nueva_pregunta',
          desc: 'Ve a <b>Funciones</b> y arrastra el bloque <em>para hacer algo</em>. Haz clic en su nombre y escribe <b>nueva_pregunta</b>. Todo lo que pongas dentro se ejecutará cada vez que "llames" a esta función, sin repetir los bloques.',
          highlightCat: 'Funciones', expandCat: null, bloque: 'procedures_defnoreturn', bloqueLabel: 'para … hacer'
        },
        {
          titulo: 'Dentro de la función: elige numero1',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer numero1 a</em> <b>dentro</b> de tu función <b>nueva_pregunta</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén un número al azar (numero1)',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Número aleatorio</em>. Conéctalo al bloque anterior, entre <b>1</b> y <b>10</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Dentro de la función: elige numero2',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer numero2 a</em>, después del bloque anterior, dentro de la función.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén un número al azar (numero2)',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>1</b> y <b>10</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Dentro de la función: calcula la respuesta correcta',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer correcta a</em>, dentro de la función.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Suma los dos números',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>+ (suma)</em>. Conéctalo al bloque anterior.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén numero1',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener numero1</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'numero1' }, bloqueLabel: 'obtener numero1'
        },
        {
          titulo: 'Obtén numero2',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener numero2</em>. Colócalo en el segundo hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'numero2' }, bloqueLabel: 'obtener numero2'
        },
        {
          titulo: 'Dentro de la función: inventa una respuesta falsa',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer incorrecta a</em>, como último bloque de la función.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Súmale un error a la respuesta correcta',
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>+ (suma)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén correcta',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener correcta</em>. Colócalo en el primer hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'correcta' }, bloqueLabel: 'obtener correcta'
        },
        {
          titulo: 'Obtén un número al azar para el error',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>1</b> y <b>5</b>. Así la respuesta falsa nunca es igual a la correcta.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Llama a nueva_pregunta (primera ronda)',
          desc: 'Ve a <b>Funciones</b> y arrastra el bloque <em>nueva_pregunta</em> que ya apareció ahí. Colócalo <b>fuera</b> de la función, después de "Iniciar juego", para preparar la primera pregunta.',
          highlightCat: 'Funciones', expandCat: null, bloque: 'procedures_callnoreturn', bloqueLabel: 'nueva_pregunta'
        },
        {
          titulo: 'Agrega el ciclo del juego',
          desc: 'Ve a <b>Ciclos</b> y arrastra el bloque <em>Repetir mientras Verdadero</em>, después de llamar a <em>nueva_pregunta</em>.',
          highlightCat: 'Ciclos', expandCat: null, bloque: 'controls_whileUntil', bloqueLabel: 'Repetir mientras Verdadero'
        },
        {
          titulo: 'Limpia la pantalla',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Limpiar pantalla</em> como primer bloque dentro del ciclo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_clear', bloqueLabel: 'Limpiar pantalla'
        },
        {
          titulo: 'Muestra el primer número',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>140</b>, Y=<b>100</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén numero1 para mostrarlo',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener numero1</em>. Colócalo en el hueco de texto, en lugar de "¡Hola!".',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'numero1' }, bloqueLabel: 'obtener numero1'
        },
        {
          titulo: 'Muestra el signo +',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Escribe el texto "+" y ubícalo en X=<b>190</b>, Y=<b>100</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Muestra el segundo número',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>220</b>, Y=<b>100</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén numero2 para mostrarlo',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener numero2</em>. Colócalo en el hueco de texto del bloque anterior.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'numero2' }, bloqueLabel: 'obtener numero2'
        },
        {
          titulo: 'Muestra "= ?"',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Escribe "= ?" y ubícalo en X=<b>260</b>, Y=<b>100</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Muestra la opción izquierda',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>100</b>, Y=<b>250</b>: aquí siempre aparecerá la respuesta <b>correcta</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén correcta para mostrarla',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener correcta</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'correcta' }, bloqueLabel: 'obtener correcta'
        },
        {
          titulo: 'Muestra la opción derecha',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>340</b>, Y=<b>250</b>: aquí aparecerá la respuesta <b>incorrecta</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén incorrecta para mostrarla',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener incorrecta</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'incorrecta' }, bloqueLabel: 'obtener incorrecta'
        },
        {
          titulo: 'Muestra los puntos',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>20</b>, Y=<b>20</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén puntos para mostrarlos',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener puntos</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'puntos' }, bloqueLabel: 'obtener puntos'
        },
        {
          titulo: 'Si haces clic con el mouse',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>Si … hacer</em>, después de mostrar los puntos.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Detecta el clic izquierdo',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>¿Clic izquierdo?</em> en la condición.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'mouse_left_clicked', bloqueLabel: '¿Clic izquierdo?'
        },
        {
          titulo: 'Si el clic fue del lado izquierdo',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>, dentro del <b>hacer</b> del bloque anterior: aquí comprobamos si acertaste.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Compara la posición del clic',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>&lt; (menor que)</em> en la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '< (menor que)'
        },
        {
          titulo: 'Obtén la posición X del mouse',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Posición X del mouse</em>. Colócalo en el primer hueco.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'mouse_x', bloqueLabel: 'Posición X del mouse'
        },
        {
          titulo: 'Escribe 240 (la mitad de la pantalla)',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>240</b>. Colócalo en el segundo hueco: si el clic fue antes de la mitad, elegiste la opción izquierda.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Suma un punto',
          desc: 'Ve a <b>Variables</b> y arrastra otro bloque <em>Establecer puntos a</em>, dentro del <b>hacer</b> más interno. <b>Revisa el desplegable:</b> como acabas de usar zonaClic/zonaCorrecta, Blockly puede dejarlo apuntando a esa variable en vez de a <b>puntos</b> -- si no dice "puntos", cámbialo con el menú del bloque.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_set', valor: 'puntos' }, bloqueLabel: 'Establecer puntos'
        },
        {
          titulo: 'Suma 1 al puntaje actual',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>+ (suma)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén los puntos actuales',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener puntos</em>. Colócalo en el primer hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'puntos' }, bloqueLabel: 'obtener puntos'
        },
        {
          titulo: 'Escribe 1 para sumar',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>1</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Prepara la siguiente pregunta',
          desc: 'Ve a <b>Funciones</b> y arrastra otro bloque <em>nueva_pregunta</em>, después de sumar el punto: así aparecen números nuevos en cada acierto.',
          highlightCat: 'Funciones', expandCat: null, bloque: 'procedures_callnoreturn', bloqueLabel: 'nueva_pregunta'
        },
        {
          titulo: 'Avanza al siguiente fotograma',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Siguiente frame</em> como último bloque del ciclo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_frame', bloqueLabel: 'Siguiente frame'
        },
        {
          titulo: 'Abre la vista de juego',
          desc: 'Haz clic en <b>Vista Juego</b> para preparar la pantalla donde verás la calculadora.',
          highlightElement: '#btnGame'
        },
        {
          titulo: 'Prueba la calculadora',
          desc: 'Ejecuta el programa y haz clic en la respuesta correcta (izquierda) para sumar puntos. Comprueba que cada acierto trae una suma nueva.',
          highlightElement: '#btnGameRun'
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
          titulo: 'Abre la categoría Inicio',
          desc: 'Haz clic en <b>Inicio</b> en el panel de bloques para ver los bloques de pantalla, dibujo y personaje.',
          highlightCat: 'Inicio', expandCat: null, bloque: null
        },
        {
          titulo: 'Arrastra: Iniciar juego',
          desc: 'Arrastra el bloque <em>Iniciar juego</em>. Configura ancho <b>480</b> y alto <b>360</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_start', bloqueLabel: 'Iniciar juego'
        },
        {
          titulo: 'Crea el punto viajero (personaje)',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Crear personaje</em>. Este es el punto que moverás por el plano. Ubícalo en el centro, X=<b>240</b>, Y=<b>180</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_create', bloqueLabel: 'Crear personaje'
        },
        {
          titulo: 'Crea la variable objetivoX',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>objetivoX</b>: guardará la posición horizontal (en píxeles) del punto que debes alcanzar.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'objetivoX', expandCat: null, bloque: null
        },
        {
          titulo: 'Establece objetivoX',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer objetivoX a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén una posición X al azar',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Número aleatorio</em>. Colócalo en el bloque anterior, entre <b>40</b> y <b>440</b> (para que no quede pegado a los bordes).',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Crea la variable objetivoY',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>objetivoY</b>.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'objetivoY', expandCat: null, bloque: null
        },
        {
          titulo: 'Establece objetivoY',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer objetivoY a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén una posición Y al azar',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>40</b> y <b>320</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
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
          titulo: 'Escribe 0',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>0</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Agrega el ciclo del juego',
          desc: 'Ve a <b>Ciclos</b> y arrastra el bloque <em>Repetir mientras Verdadero</em>. Todo el juego vivirá dentro de este ciclo.',
          highlightCat: 'Ciclos', expandCat: null, bloque: 'controls_whileUntil', bloqueLabel: 'Repetir mientras Verdadero'
        },
        {
          titulo: 'Limpia la pantalla',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Limpiar pantalla</em> como primer bloque dentro del ciclo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_clear', bloqueLabel: 'Limpiar pantalla'
        },
        {
          titulo: 'Dibuja el eje X',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Línea</em>. Dibuja una línea horizontal de (0,180) a (480,180). Como el ciclo limpia la pantalla en cada vuelta, hay que redibujar los ejes en cada fotograma.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_line', bloqueLabel: 'Línea'
        },
        {
          titulo: 'Dibuja el eje Y',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Línea</em>. Dibuja una línea vertical de (240,0) a (240,360).',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_line', bloqueLabel: 'Línea'
        },
        {
          titulo: 'Dibuja el objetivo',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Círculo sólido</em>, para marcar dónde debes llevar tu punto. Usa un color bien visible, por ejemplo <b>#ffdd00</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_circle', bloqueLabel: 'Círculo sólido'
        },
        {
          titulo: 'Obtén objetivoX para el círculo',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener objetivoX</em>. Colócalo en el hueco X del círculo.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'objetivoX' }, bloqueLabel: 'obtener objetivoX'
        },
        {
          titulo: 'Obtén objetivoY para el círculo',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener objetivoY</em>. Colócalo en el hueco Y del círculo.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'objetivoY' }, bloqueLabel: 'obtener objetivoY'
        },
        {
          titulo: 'Condición: flecha arriba',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>Si … hacer</em> dentro del ciclo, después de dibujar el objetivo.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Detecta la flecha arriba',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>¿Tecla presionada?</em> en la condición. Selecciona <b>↑ Arriba</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'key_is_pressed', bloqueLabel: '¿Tecla presionada?'
        },
        {
          titulo: 'Mueve el punto hacia arriba',
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
          titulo: 'Mueve el punto hacia abajo',
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
          titulo: 'Mueve el punto a la izquierda',
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
          titulo: 'Mueve el punto a la derecha',
          desc: 'Ve a <b>Inicio</b> y arrastra el último bloque <em>Mover personaje</em>. Usa dx=<b>4</b>, dy=<b>0</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_move', bloqueLabel: 'Mover personaje'
        },
        {
          titulo: 'Si llegaste al objetivo',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>, después de los 4 movimientos.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Calcula la distancia al objetivo',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Distancia entre puntos</em>. Lo usaremos para saber qué tan cerca estás del objetivo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_distance', bloqueLabel: 'Distancia entre puntos'
        },
        {
          titulo: 'Obtén la posición X del punto',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Posición X del personaje</em>. Colócalo en el primer hueco (X1).',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_get_x', bloqueLabel: 'Posición X del personaje'
        },
        {
          titulo: 'Obtén la posición Y del punto',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Posición Y del personaje</em>. Colócalo en el segundo hueco (Y1).',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_get_y', bloqueLabel: 'Posición Y del personaje'
        },
        {
          titulo: 'Obtén objetivoX para la distancia',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener objetivoX</em>. Colócalo en el tercer hueco (X2).',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'objetivoX' }, bloqueLabel: 'obtener objetivoX'
        },
        {
          titulo: 'Obtén objetivoY para la distancia',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener objetivoY</em>. Colócalo en el cuarto hueco (Y2).',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'objetivoY' }, bloqueLabel: 'obtener objetivoY'
        },
        {
          titulo: 'Compara la distancia',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>&lt; (menor que)</em>. Conéctalo en la condición del <em>Si … hacer</em>, con la distancia en el primer hueco.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '< (menor que)'
        },
        {
          titulo: 'Escribe el margen de acierto',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>25</b>: si estás a menos de 25 píxeles, cuenta como acierto.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Suma un punto',
          desc: 'Ve a <b>Variables</b> y arrastra otro bloque <em>Establecer puntos a</em>, dentro del <b>hacer</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Suma 1 al puntaje actual',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>+ (suma)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén los puntos actuales',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener puntos</em>. Colócalo en el primer hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'puntos' }, bloqueLabel: 'obtener puntos'
        },
        {
          titulo: 'Escribe 1 para sumar',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>1</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Elige un nuevo objetivo X',
          desc: 'Ve a <b>Variables</b> y arrastra otro bloque <em>Establecer objetivoX a</em>, dentro del mismo <b>hacer</b>: cuando aciertas, el objetivo cambia de lugar.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén una nueva posición X al azar',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>40</b> y <b>440</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Elige un nuevo objetivo Y',
          desc: 'Ve a <b>Variables</b> y arrastra otro bloque <em>Establecer objetivoY a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén una nueva posición Y al azar',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>40</b> y <b>320</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Muestra los puntos',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Escribir texto en pantalla</em>, fuera del <em>Si</em>. Ubícalo en X=<b>20</b>, Y=<b>20</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén puntos para mostrarlos',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener puntos</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'puntos' }, bloqueLabel: 'obtener puntos'
        },
        {
          titulo: 'Dibuja el punto',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Dibujar personaje</em>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_draw', bloqueLabel: 'Dibujar personaje'
        },
        {
          titulo: 'Avanza al siguiente fotograma',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Siguiente frame</em> como último bloque del ciclo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_frame', bloqueLabel: 'Siguiente frame'
        },
        {
          titulo: 'Abre la vista de juego',
          desc: 'Ve a la <b>vista de juego</b> para trabajar en un entorno con fondo, ejes y objetos visuales.',
          highlightElement: '#btnGame'
        },
        {
          titulo: 'Prueba tu proyecto',
          desc: 'Ejecuta el juego y muévete con las flechas hasta el círculo. Comprueba que cada acierto suma un punto y mueve el objetivo a otra coordenada.',
          highlightElement: '#btnGameRun'
        }
      ]
    },

    juego_caja_area: {
      title: 'La Caja Misteriosa: Áreas',
      icon: '📦',
      diagram: '',
      steps: [
        {
          titulo: '¿Qué aprenderemos?',
          desc: 'Un juego de <b>4 opciones</b>: aparece un rectángulo con base y altura al azar, y 4 posibles áreas repartidas en un tablero de 2×2. Solo una es correcta, y <b>cambia de casilla en cada ronda</b> -- tienes que calcular, no memorizar en qué esquina está. Usarás tu propia <b>función</b> para no repetir bloques.',
          highlightCat: null, bloque: null
        },
        {
          titulo: 'Abre la categoría Inicio',
          desc: 'Haz clic en <b>Inicio</b> en el panel de bloques para ver los bloques de pantalla y dibujo.',
          highlightCat: 'Inicio', expandCat: null, bloque: null
        },
        {
          titulo: 'Arrastra: Iniciar juego',
          desc: 'Arrastra el bloque <em>Iniciar juego</em>. Configura ancho <b>480</b> y alto <b>360</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_start', bloqueLabel: 'Iniciar juego'
        },
        {
          titulo: 'Crea las variables base, altura y puntos',
          desc: 'Ve a <b>Variables</b> y crea tres variables, una por una con <em>Crear variable</em>: <b>base</b>, <b>altura</b> y <b>puntos</b>.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: ['base', 'altura', 'puntos'], expandCat: null, bloque: null
        },
        {
          titulo: 'Establece puntos',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer puntos a</em>, suelto en el área de trabajo.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe 0',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>0</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Crea las variables del área y las 4 casillas',
          desc: 'Ve a <b>Variables</b> y crea seis variables más: <b>area</b> (la respuesta real), <b>opcion1</b>, <b>opcion2</b>, <b>opcion3</b>, <b>opcion4</b> (lo que se muestra en cada casilla del tablero) y <b>zonaCorrecta</b> (en qué casilla va la respuesta real).',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: ['area', 'opcion1', 'opcion2', 'opcion3', 'opcion4', 'zonaCorrecta'], expandCat: null, bloque: null
        },
        {
          titulo: 'Crea las variables para leer el clic',
          desc: 'Ve a <b>Variables</b> y crea tres variables más: <b>columna</b>, <b>fila</b> y <b>zonaClic</b>. Las usaremos para saber en qué casilla del tablero hiciste clic.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: ['columna', 'fila', 'zonaClic'], expandCat: null, bloque: null
        },
        {
          titulo: 'Crea tu función: nueva_pregunta',
          desc: 'Ve a <b>Funciones</b> y arrastra el bloque <em>para hacer algo</em>. Haz clic en su nombre y escribe <b>nueva_pregunta</b>. Ahí dentro armaremos toda la lógica para inventar un rectángulo y repartir las 4 opciones en el tablero.',
          highlightCat: 'Funciones', expandCat: null, bloque: 'procedures_defnoreturn', bloqueLabel: 'para … hacer'
        },
        {
          titulo: 'Dentro de la función: elige la base',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer base a</em> <b>dentro</b> de la función <b>nueva_pregunta</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén un número al azar (base)',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Número aleatorio</em>. Colócalo en el bloque anterior, entre <b>2</b> y <b>20</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Dentro de la función: elige la altura',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer altura a</em>, dentro de la función.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén un número al azar (altura)',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>2</b> y <b>20</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Dentro de la función: calcula el área',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer area a</em>, dentro de la función.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Multiplica base por altura',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>× (multiplicación)</em>: el área de un rectángulo es base × altura.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '× (multiplicación)'
        },
        {
          titulo: 'Obtén base',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener base</em>. Colócalo en el primer hueco de la multiplicación.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'base' }, bloqueLabel: 'obtener base'
        },
        {
          titulo: 'Obtén altura',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener altura</em>. Colócalo en el segundo hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'altura' }, bloqueLabel: 'obtener altura'
        },
        {
          titulo: 'Dentro de la función: inventa la casilla 1',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer opcion1 a</em>. Por ahora, cada casilla arranca con un valor <b>falso</b> parecido al área real -- más adelante una de las 4 se corrige.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Súmale un error al área real',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>+ (suma)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén area',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener area</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'area' }, bloqueLabel: 'obtener area'
        },
        {
          titulo: 'Obtén un número al azar para el error',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>1</b> y <b>15</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Dentro de la función: inventa la casilla 2',
          desc: 'Ve a <b>Variables</b> y arrastra otro <em>Establecer opcion2 a</em>. Repite exactamente el mismo patrón que la casilla 1.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Súmale un error al área real (casilla 2)',
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>+ (suma)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén area (casilla 2)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener area</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'area' }, bloqueLabel: 'obtener area'
        },
        {
          titulo: 'Obtén otro número al azar para el error',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>1</b> y <b>15</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Dentro de la función: inventa la casilla 3',
          desc: 'Ve a <b>Variables</b> y arrastra otro <em>Establecer opcion3 a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Súmale un error al área real (casilla 3)',
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>+ (suma)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén area (casilla 3)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener area</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'area' }, bloqueLabel: 'obtener area'
        },
        {
          titulo: 'Obtén otro número al azar para el error (3)',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>1</b> y <b>15</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Dentro de la función: inventa la casilla 4',
          desc: 'Ve a <b>Variables</b> y arrastra otro <em>Establecer opcion4 a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Súmale un error al área real (casilla 4)',
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>+ (suma)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén area (casilla 4)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener area</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'area' }, bloqueLabel: 'obtener area'
        },
        {
          titulo: 'Obtén otro número al azar para el error (4)',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>1</b> y <b>15</b>. Ya las 4 casillas tienen un valor falso.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Dentro de la función: sortea la casilla ganadora',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer zonaCorrecta a</em>: aquí decidimos, al azar, en cuál de las 4 casillas va a quedar el área <b>real</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén un número al azar del 1 al 4',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>1</b> y <b>4</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Si la casilla ganadora es la 1',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>Si … hacer</em>: si zonaCorrecta salió 1, hay que corregir la casilla 1 con el área real.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Compara zonaCorrecta con 1',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>= (comparar)</em> en la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '= (comparar)'
        },
        {
          titulo: 'Obtén zonaCorrecta',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener zonaCorrecta</em>. Colócalo en el primer hueco de la comparación.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'zonaCorrecta' }, bloqueLabel: 'obtener zonaCorrecta'
        },
        {
          titulo: 'Escribe 1',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>1</b>. Colócalo en el segundo hueco.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Corrige la casilla 1',
          desc: 'Ve a <b>Variables</b> y arrastra otro <em>Establecer opcion1 a</em>, dentro del <b>hacer</b>: le pones el área real, borrando el valor falso que tenía.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén area (para la casilla 1)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener area</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'area' }, bloqueLabel: 'obtener area'
        },
        {
          titulo: 'Si la casilla ganadora es la 2',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Compara zonaCorrecta con 2',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>= (comparar)</em> en la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '= (comparar)'
        },
        {
          titulo: 'Obtén zonaCorrecta (2)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener zonaCorrecta</em>. Colócalo en el primer hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'zonaCorrecta' }, bloqueLabel: 'obtener zonaCorrecta'
        },
        {
          titulo: 'Escribe 2',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>2</b>. Colócalo en el segundo hueco.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Corrige la casilla 2',
          desc: 'Ve a <b>Variables</b> y arrastra otro <em>Establecer opcion2 a</em>, dentro del <b>hacer</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén area (para la casilla 2)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener area</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'area' }, bloqueLabel: 'obtener area'
        },
        {
          titulo: 'Si la casilla ganadora es la 3',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Compara zonaCorrecta con 3',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>= (comparar)</em> en la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '= (comparar)'
        },
        {
          titulo: 'Obtén zonaCorrecta (3)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener zonaCorrecta</em>. Colócalo en el primer hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'zonaCorrecta' }, bloqueLabel: 'obtener zonaCorrecta'
        },
        {
          titulo: 'Escribe 3',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>3</b>. Colócalo en el segundo hueco.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Corrige la casilla 3',
          desc: 'Ve a <b>Variables</b> y arrastra otro <em>Establecer opcion3 a</em>, dentro del <b>hacer</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén area (para la casilla 3)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener area</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'area' }, bloqueLabel: 'obtener area'
        },
        {
          titulo: 'Si la casilla ganadora es la 4',
          desc: 'Ve a <b>Lógica</b> y arrastra el último bloque <em>Si … hacer</em> de tu función.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Compara zonaCorrecta con 4',
          desc: 'Ve a <b>Lógica</b> y arrastra el último bloque <em>= (comparar)</em> en la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '= (comparar)'
        },
        {
          titulo: 'Obtén zonaCorrecta (4)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener zonaCorrecta</em>. Colócalo en el primer hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'zonaCorrecta' }, bloqueLabel: 'obtener zonaCorrecta'
        },
        {
          titulo: 'Escribe 4',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>4</b>. Colócalo en el segundo hueco.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Corrige la casilla 4',
          desc: 'Ve a <b>Variables</b> y arrastra el último <em>Establecer opcion4 a</em>, dentro del <b>hacer</b>. Con esto la función queda lista: siempre hay una sola casilla con el área real, y cambia de lugar cada vez que se llama.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén area (para la casilla 4)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener area</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'area' }, bloqueLabel: 'obtener area'
        },
        {
          titulo: 'Llama a nueva_pregunta (primera ronda)',
          desc: 'Ve a <b>Funciones</b> y arrastra el bloque <em>nueva_pregunta</em> que ya apareció ahí. Colócalo <b>fuera</b> de la función, justo después de "Iniciar juego".',
          highlightCat: 'Funciones', expandCat: null, bloque: 'procedures_callnoreturn', bloqueLabel: 'nueva_pregunta'
        },
        {
          titulo: 'Agrega el ciclo del juego',
          desc: 'Ve a <b>Ciclos</b> y arrastra el bloque <em>Repetir mientras Verdadero</em>, después de llamar a <em>nueva_pregunta</em>.',
          highlightCat: 'Ciclos', expandCat: null, bloque: 'controls_whileUntil', bloqueLabel: 'Repetir mientras Verdadero'
        },
        {
          titulo: 'Limpia la pantalla',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Limpiar pantalla</em> como primer bloque dentro del ciclo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_clear', bloqueLabel: 'Limpiar pantalla'
        },
        {
          titulo: 'Dibuja la línea vertical del tablero',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Línea</em>. Dibújala de (240,0) a (240,360): divide el tablero en columna izquierda y derecha.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_line', bloqueLabel: 'Línea'
        },
        {
          titulo: 'Dibuja la línea horizontal del tablero',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Línea</em>. Dibújala de (0,180) a (480,180): divide el tablero en fila de arriba y de abajo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_line', bloqueLabel: 'Línea'
        },
        {
          titulo: 'Muestra la base',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>20</b>, Y=<b>15</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén base para mostrarla',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener base</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'base' }, bloqueLabel: 'obtener base'
        },
        {
          titulo: 'Muestra el signo ×',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Escribe "×" y ubícalo en X=<b>90</b>, Y=<b>15</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Muestra la altura',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>110</b>, Y=<b>15</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén altura para mostrarla',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener altura</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'altura' }, bloqueLabel: 'obtener altura'
        },
        {
          titulo: 'Muestra "¿Área?"',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Escribe "= ¿Área?" y ubícalo en X=<b>170</b>, Y=<b>15</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Muestra los puntos',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>380</b>, Y=<b>15</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén puntos para mostrarlos',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener puntos</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'puntos' }, bloqueLabel: 'obtener puntos'
        },
        {
          titulo: 'Muestra la casilla 1 (arriba-izquierda)',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>80</b>, Y=<b>110</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén opcion1 para mostrarla',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener opcion1</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'opcion1' }, bloqueLabel: 'obtener opcion1'
        },
        {
          titulo: 'Muestra la casilla 2 (arriba-derecha)',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>320</b>, Y=<b>110</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén opcion2 para mostrarla',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener opcion2</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'opcion2' }, bloqueLabel: 'obtener opcion2'
        },
        {
          titulo: 'Muestra la casilla 3 (abajo-izquierda)',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>80</b>, Y=<b>290</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén opcion3 para mostrarla',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener opcion3</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'opcion3' }, bloqueLabel: 'obtener opcion3'
        },
        {
          titulo: 'Muestra la casilla 4 (abajo-derecha)',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>320</b>, Y=<b>290</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén opcion4 para mostrarla',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener opcion4</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'opcion4' }, bloqueLabel: 'obtener opcion4'
        },
        {
          titulo: 'Si haces clic con el mouse',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>Si … hacer</em>, después de mostrar las 4 casillas.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Detecta el clic izquierdo',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>¿Clic izquierdo?</em> en la condición.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'mouse_left_clicked', bloqueLabel: '¿Clic izquierdo?'
        },
        {
          titulo: 'Calcula la columna del clic',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer columna a</em>, dentro del <b>hacer</b>: será 0 si clicaste del lado izquierdo, o 1 si fue del lado derecho.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Convierte la columna a entero',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>a entero</em>: redondea hacia abajo para quedarnos solo con 0 o 1.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'convert_to_int', bloqueLabel: 'a entero'
        },
        {
          titulo: 'Divide la posición X entre 240',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>÷ (división)</em>. Colócalo dentro del bloque <em>a entero</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '÷ (división)'
        },
        {
          titulo: 'Obtén la posición X del mouse',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Posición X del mouse</em>. Colócalo en el primer hueco de la división.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'mouse_x', bloqueLabel: 'Posición X del mouse'
        },
        {
          titulo: 'Escribe 240',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>240</b>. Colócalo en el segundo hueco de la división.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Calcula la fila del clic',
          desc: 'Ve a <b>Variables</b> y arrastra otro <em>Establecer fila a</em>: será 0 si clicaste arriba, o 1 si fue abajo.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Convierte la fila a entero',
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>a entero</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'convert_to_int', bloqueLabel: 'a entero'
        },
        {
          titulo: 'Divide la posición Y entre 180',
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>÷ (división)</em>. Colócalo dentro del bloque <em>a entero</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '÷ (división)'
        },
        {
          titulo: 'Obtén la posición Y del mouse',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Posición Y del mouse</em>. Colócalo en el primer hueco de la división.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'mouse_y', bloqueLabel: 'Posición Y del mouse'
        },
        {
          titulo: 'Escribe 180',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>180</b>. Colócalo en el segundo hueco de la división.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Calcula qué casilla tocaste',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer zonaClic a</em>: la combinación de fila y columna nos da un número del 1 al 4, igual que zonaCorrecta.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Suma 1 al resultado',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>+ (suma)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Multiplica la fila × 2',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>× (multiplicación)</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '× (multiplicación)'
        },
        {
          titulo: 'Obtén fila',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener fila</em>. Colócalo en el primer hueco de la multiplicación.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'fila' }, bloqueLabel: 'obtener fila'
        },
        {
          titulo: 'Escribe 2',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>2</b>. Colócalo en el segundo hueco de la multiplicación.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Suma columna más 1',
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>+ (suma)</em>. Colócalo en el segundo hueco de la primera suma: zonaClic = (fila×2) + (columna + 1). Un solo bloque de suma no alcanza -- necesitas este segundo para sumar columna y 1 aparte.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén columna',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener columna</em>. Colócalo en el primer hueco de esta segunda suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'columna' }, bloqueLabel: 'obtener columna'
        },
        {
          titulo: 'Escribe 1 (para completar zonaClic)',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>1</b>. Colócalo en el segundo hueco de esta segunda suma: zonaClic = fila×2 + (columna + 1).',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Si tocaste la casilla correcta',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>, dentro del mismo <b>hacer</b> del clic.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Compara zonaClic con zonaCorrecta',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>= (comparar)</em> en la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '= (comparar)'
        },
        {
          titulo: 'Obtén zonaClic',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener zonaClic</em>. Colócalo en el primer hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'zonaClic' }, bloqueLabel: 'obtener zonaClic'
        },
        {
          titulo: 'Obtén zonaCorrecta (para comparar)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener zonaCorrecta</em>. Colócalo en el segundo hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'zonaCorrecta' }, bloqueLabel: 'obtener zonaCorrecta'
        },
        {
          titulo: 'Suma un punto',
          desc: 'Ve a <b>Variables</b> y arrastra otro bloque <em>Establecer puntos a</em>, dentro del <b>hacer</b> más interno. <b>Revisa el desplegable:</b> como acabas de usar zonaClic/zonaCorrecta, Blockly puede dejarlo apuntando a esa variable en vez de a <b>puntos</b> -- si no dice "puntos", cámbialo con el menú del bloque.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_set', valor: 'puntos' }, bloqueLabel: 'Establecer puntos'
        },
        {
          titulo: 'Suma 1 al puntaje actual',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>+ (suma)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén los puntos actuales',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener puntos</em>. Colócalo en el primer hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'puntos' }, bloqueLabel: 'obtener puntos'
        },
        {
          titulo: 'Escribe 1 para sumar',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>1</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Prepara la siguiente pregunta',
          desc: 'Ve a <b>Funciones</b> y arrastra otro bloque <em>nueva_pregunta</em>, después de sumar el punto: nuevo rectángulo y las 4 casillas se reparten de nuevo, en otro orden.',
          highlightCat: 'Funciones', expandCat: null, bloque: 'procedures_callnoreturn', bloqueLabel: 'nueva_pregunta'
        },
        {
          titulo: 'Avanza al siguiente fotograma',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Siguiente frame</em> como último bloque del ciclo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_frame', bloqueLabel: 'Siguiente frame'
        },
        {
          titulo: 'Abre la vista de juego',
          desc: 'Usa la <b>vista de juego</b> para ver el tablero de 2×2.',
          highlightElement: '#btnGame'
        },
        {
          titulo: 'Juega y calcula',
          desc: 'Ejecuta el programa y haz clic en la casilla con el área correcta. Fíjate que la respuesta correcta cambia de esquina en cada ronda -- ¡hay que calcular cada vez!',
          highlightElement: '#btnGameRun'
        }
      ]
    },

    juego_caja_perimetro: {
      title: 'La Caja Misteriosa: Perímetros',
      icon: '📏',
      diagram: '',
      steps: [
        {
          titulo: '¿Qué aprenderemos?',
          desc: 'La versión de <b>perímetros</b> del mismo juego de 4 opciones: aparece un rectángulo con base y altura al azar, y 4 posibles perímetros repartidos en un tablero de 2×2. Solo uno es correcto, y <b>cambia de casilla en cada ronda</b>. Volverás a usar una <b>función</b> para no repetir bloques.',
          highlightCat: null, bloque: null
        },
        {
          titulo: 'Abre la categoría Inicio',
          desc: 'Haz clic en <b>Inicio</b> en el panel de bloques para ver los bloques de pantalla y dibujo.',
          highlightCat: 'Inicio', expandCat: null, bloque: null
        },
        {
          titulo: 'Arrastra: Iniciar juego',
          desc: 'Arrastra el bloque <em>Iniciar juego</em>. Configura ancho <b>480</b> y alto <b>360</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_start', bloqueLabel: 'Iniciar juego'
        },
        {
          titulo: 'Crea las variables base, altura y puntos',
          desc: 'Ve a <b>Variables</b> y crea tres variables, una por una con <em>Crear variable</em>: <b>base</b>, <b>altura</b> y <b>puntos</b>.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: ['base', 'altura', 'puntos'], expandCat: null, bloque: null
        },
        {
          titulo: 'Establece puntos',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer puntos a</em>, suelto en el área de trabajo.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe 0',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>0</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Crea las variables del perímetro y las 4 casillas',
          desc: 'Ve a <b>Variables</b> y crea seis variables más: <b>perimetro</b> (la respuesta real), <b>opcion1</b>, <b>opcion2</b>, <b>opcion3</b>, <b>opcion4</b> (lo que se muestra en cada casilla del tablero) y <b>zonaCorrecta</b> (en qué casilla va la respuesta real).',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: ['perimetro', 'opcion1', 'opcion2', 'opcion3', 'opcion4', 'zonaCorrecta'], expandCat: null, bloque: null
        },
        {
          titulo: 'Crea las variables para leer el clic',
          desc: 'Ve a <b>Variables</b> y crea tres variables más: <b>columna</b>, <b>fila</b> y <b>zonaClic</b>. Las usaremos para saber en qué casilla del tablero hiciste clic.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: ['columna', 'fila', 'zonaClic'], expandCat: null, bloque: null
        },
        {
          titulo: 'Crea tu función: nueva_pregunta',
          desc: 'Ve a <b>Funciones</b> y arrastra el bloque <em>para hacer algo</em>. Haz clic en su nombre y escribe <b>nueva_pregunta</b>. Ahí dentro armaremos toda la lógica para inventar un rectángulo y repartir las 4 opciones en el tablero.',
          highlightCat: 'Funciones', expandCat: null, bloque: 'procedures_defnoreturn', bloqueLabel: 'para … hacer'
        },
        {
          titulo: 'Dentro de la función: elige la base',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer base a</em> <b>dentro</b> de la función <b>nueva_pregunta</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén un número al azar (base)',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Número aleatorio</em>. Colócalo en el bloque anterior, entre <b>2</b> y <b>20</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Dentro de la función: elige la altura',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer altura a</em>, dentro de la función.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén un número al azar (altura)',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>2</b> y <b>20</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Dentro de la función: calcula el perímetro',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer perimetro a</em>, dentro de la función. El perímetro de un rectángulo es 2×(base+altura).',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Multiplica por 2',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>× (multiplicación)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '× (multiplicación)'
        },
        {
          titulo: 'Suma base más altura',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>+ (suma)</em>. Colócalo en el primer hueco de la multiplicación.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén base',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener base</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'base' }, bloqueLabel: 'obtener base'
        },
        {
          titulo: 'Obtén altura',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener altura</em>. Colócalo en el segundo hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'altura' }, bloqueLabel: 'obtener altura'
        },
        {
          titulo: 'Escribe 2',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>2</b>. Colócalo en el segundo hueco de la multiplicación (2 × la suma).',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Dentro de la función: inventa la casilla 1',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer opcion1 a</em>. Por ahora, cada casilla arranca con un valor <b>falso</b> parecido al perímetro real -- más adelante una de las 4 se corrige.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Súmale un error al perímetro real',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>+ (suma)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén perimetro',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener perimetro</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'perimetro' }, bloqueLabel: 'obtener perimetro'
        },
        {
          titulo: 'Obtén un número al azar para el error',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>1</b> y <b>15</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Dentro de la función: inventa la casilla 2',
          desc: 'Ve a <b>Variables</b> y arrastra otro <em>Establecer opcion2 a</em>. Repite exactamente el mismo patrón que la casilla 1.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Súmale un error al perímetro real (casilla 2)',
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>+ (suma)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén perimetro (casilla 2)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener perimetro</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'perimetro' }, bloqueLabel: 'obtener perimetro'
        },
        {
          titulo: 'Obtén otro número al azar para el error',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>1</b> y <b>15</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Dentro de la función: inventa la casilla 3',
          desc: 'Ve a <b>Variables</b> y arrastra otro <em>Establecer opcion3 a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Súmale un error al perímetro real (casilla 3)',
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>+ (suma)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén perimetro (casilla 3)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener perimetro</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'perimetro' }, bloqueLabel: 'obtener perimetro'
        },
        {
          titulo: 'Obtén otro número al azar para el error (3)',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>1</b> y <b>15</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Dentro de la función: inventa la casilla 4',
          desc: 'Ve a <b>Variables</b> y arrastra otro <em>Establecer opcion4 a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Súmale un error al perímetro real (casilla 4)',
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>+ (suma)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén perimetro (casilla 4)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener perimetro</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'perimetro' }, bloqueLabel: 'obtener perimetro'
        },
        {
          titulo: 'Obtén otro número al azar para el error (4)',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>1</b> y <b>15</b>. Ya las 4 casillas tienen un valor falso.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Dentro de la función: sortea la casilla ganadora',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer zonaCorrecta a</em>: aquí decidimos, al azar, en cuál de las 4 casillas va a quedar el perímetro <b>real</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén un número al azar del 1 al 4',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Número aleatorio</em>, entre <b>1</b> y <b>4</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Si la casilla ganadora es la 1',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>Si … hacer</em>: si zonaCorrecta salió 1, hay que corregir la casilla 1 con el perímetro real.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Compara zonaCorrecta con 1',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>= (comparar)</em> en la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '= (comparar)'
        },
        {
          titulo: 'Obtén zonaCorrecta',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener zonaCorrecta</em>. Colócalo en el primer hueco de la comparación.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'zonaCorrecta' }, bloqueLabel: 'obtener zonaCorrecta'
        },
        {
          titulo: 'Escribe 1',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>1</b>. Colócalo en el segundo hueco.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Corrige la casilla 1',
          desc: 'Ve a <b>Variables</b> y arrastra otro <em>Establecer opcion1 a</em>, dentro del <b>hacer</b>: le pones el perímetro real, borrando el valor falso que tenía.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén perimetro (para la casilla 1)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener perimetro</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'perimetro' }, bloqueLabel: 'obtener perimetro'
        },
        {
          titulo: 'Si la casilla ganadora es la 2',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Compara zonaCorrecta con 2',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>= (comparar)</em> en la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '= (comparar)'
        },
        {
          titulo: 'Obtén zonaCorrecta (2)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener zonaCorrecta</em>. Colócalo en el primer hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'zonaCorrecta' }, bloqueLabel: 'obtener zonaCorrecta'
        },
        {
          titulo: 'Escribe 2',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>2</b>. Colócalo en el segundo hueco.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Corrige la casilla 2',
          desc: 'Ve a <b>Variables</b> y arrastra otro <em>Establecer opcion2 a</em>, dentro del <b>hacer</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén perimetro (para la casilla 2)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener perimetro</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'perimetro' }, bloqueLabel: 'obtener perimetro'
        },
        {
          titulo: 'Si la casilla ganadora es la 3',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Compara zonaCorrecta con 3',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>= (comparar)</em> en la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '= (comparar)'
        },
        {
          titulo: 'Obtén zonaCorrecta (3)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener zonaCorrecta</em>. Colócalo en el primer hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'zonaCorrecta' }, bloqueLabel: 'obtener zonaCorrecta'
        },
        {
          titulo: 'Escribe 3',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>3</b>. Colócalo en el segundo hueco.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Corrige la casilla 3',
          desc: 'Ve a <b>Variables</b> y arrastra otro <em>Establecer opcion3 a</em>, dentro del <b>hacer</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén perimetro (para la casilla 3)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener perimetro</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'perimetro' }, bloqueLabel: 'obtener perimetro'
        },
        {
          titulo: 'Si la casilla ganadora es la 4',
          desc: 'Ve a <b>Lógica</b> y arrastra el último bloque <em>Si … hacer</em> de tu función.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Compara zonaCorrecta con 4',
          desc: 'Ve a <b>Lógica</b> y arrastra el último bloque <em>= (comparar)</em> en la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '= (comparar)'
        },
        {
          titulo: 'Obtén zonaCorrecta (4)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener zonaCorrecta</em>. Colócalo en el primer hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'zonaCorrecta' }, bloqueLabel: 'obtener zonaCorrecta'
        },
        {
          titulo: 'Escribe 4',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>4</b>. Colócalo en el segundo hueco.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Corrige la casilla 4',
          desc: 'Ve a <b>Variables</b> y arrastra el último <em>Establecer opcion4 a</em>, dentro del <b>hacer</b>. Con esto la función queda lista: siempre hay una sola casilla con el perímetro real, y cambia de lugar cada vez que se llama.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén perimetro (para la casilla 4)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener perimetro</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'perimetro' }, bloqueLabel: 'obtener perimetro'
        },
        {
          titulo: 'Llama a nueva_pregunta (primera ronda)',
          desc: 'Ve a <b>Funciones</b> y arrastra el bloque <em>nueva_pregunta</em> que ya apareció ahí. Colócalo <b>fuera</b> de la función, justo después de "Iniciar juego".',
          highlightCat: 'Funciones', expandCat: null, bloque: 'procedures_callnoreturn', bloqueLabel: 'nueva_pregunta'
        },
        {
          titulo: 'Agrega el ciclo del juego',
          desc: 'Ve a <b>Ciclos</b> y arrastra el bloque <em>Repetir mientras Verdadero</em>, después de llamar a <em>nueva_pregunta</em>.',
          highlightCat: 'Ciclos', expandCat: null, bloque: 'controls_whileUntil', bloqueLabel: 'Repetir mientras Verdadero'
        },
        {
          titulo: 'Limpia la pantalla',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Limpiar pantalla</em> como primer bloque dentro del ciclo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_clear', bloqueLabel: 'Limpiar pantalla'
        },
        {
          titulo: 'Dibuja la línea vertical del tablero',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Línea</em>. Dibújala de (240,0) a (240,360): divide el tablero en columna izquierda y derecha.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_line', bloqueLabel: 'Línea'
        },
        {
          titulo: 'Dibuja la línea horizontal del tablero',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Línea</em>. Dibújala de (0,180) a (480,180): divide el tablero en fila de arriba y de abajo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_line', bloqueLabel: 'Línea'
        },
        {
          titulo: 'Muestra la base',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>20</b>, Y=<b>15</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén base para mostrarla',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener base</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'base' }, bloqueLabel: 'obtener base'
        },
        {
          titulo: 'Muestra el signo ×',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Escribe "×" y ubícalo en X=<b>90</b>, Y=<b>15</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Muestra la altura',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>110</b>, Y=<b>15</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén altura para mostrarla',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener altura</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'altura' }, bloqueLabel: 'obtener altura'
        },
        {
          titulo: 'Muestra "¿Perímetro?"',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Escribe "= ¿Perímetro?" y ubícalo en X=<b>150</b>, Y=<b>15</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Muestra los puntos',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>380</b>, Y=<b>15</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén puntos para mostrarlos',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener puntos</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'puntos' }, bloqueLabel: 'obtener puntos'
        },
        {
          titulo: 'Muestra la casilla 1 (arriba-izquierda)',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>80</b>, Y=<b>110</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén opcion1 para mostrarla',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener opcion1</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'opcion1' }, bloqueLabel: 'obtener opcion1'
        },
        {
          titulo: 'Muestra la casilla 2 (arriba-derecha)',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>320</b>, Y=<b>110</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén opcion2 para mostrarla',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener opcion2</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'opcion2' }, bloqueLabel: 'obtener opcion2'
        },
        {
          titulo: 'Muestra la casilla 3 (abajo-izquierda)',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>80</b>, Y=<b>290</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén opcion3 para mostrarla',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener opcion3</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'opcion3' }, bloqueLabel: 'obtener opcion3'
        },
        {
          titulo: 'Muestra la casilla 4 (abajo-derecha)',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>320</b>, Y=<b>290</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén opcion4 para mostrarla',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener opcion4</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'opcion4' }, bloqueLabel: 'obtener opcion4'
        },
        {
          titulo: 'Si haces clic con el mouse',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>Si … hacer</em>, después de mostrar las 4 casillas.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Detecta el clic izquierdo',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>¿Clic izquierdo?</em> en la condición.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'mouse_left_clicked', bloqueLabel: '¿Clic izquierdo?'
        },
        {
          titulo: 'Calcula la columna del clic',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer columna a</em>, dentro del <b>hacer</b>: será 0 si clicaste del lado izquierdo, o 1 si fue del lado derecho.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Convierte la columna a entero',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>a entero</em>: redondea hacia abajo para quedarnos solo con 0 o 1.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'convert_to_int', bloqueLabel: 'a entero'
        },
        {
          titulo: 'Divide la posición X entre 240',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>÷ (división)</em>. Colócalo dentro del bloque <em>a entero</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '÷ (división)'
        },
        {
          titulo: 'Obtén la posición X del mouse',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Posición X del mouse</em>. Colócalo en el primer hueco de la división.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'mouse_x', bloqueLabel: 'Posición X del mouse'
        },
        {
          titulo: 'Escribe 240',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>240</b>. Colócalo en el segundo hueco de la división.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Calcula la fila del clic',
          desc: 'Ve a <b>Variables</b> y arrastra otro <em>Establecer fila a</em>: será 0 si clicaste arriba, o 1 si fue abajo.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Convierte la fila a entero',
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>a entero</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'convert_to_int', bloqueLabel: 'a entero'
        },
        {
          titulo: 'Divide la posición Y entre 180',
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>÷ (división)</em>. Colócalo dentro del bloque <em>a entero</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '÷ (división)'
        },
        {
          titulo: 'Obtén la posición Y del mouse',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Posición Y del mouse</em>. Colócalo en el primer hueco de la división.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'mouse_y', bloqueLabel: 'Posición Y del mouse'
        },
        {
          titulo: 'Escribe 180',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>180</b>. Colócalo en el segundo hueco de la división.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Calcula qué casilla tocaste',
          desc: 'Ve a <b>Variables</b> y arrastra <em>Establecer zonaClic a</em>: la combinación de fila y columna nos da un número del 1 al 4, igual que zonaCorrecta.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Suma 1 al resultado',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>+ (suma)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Multiplica la fila × 2',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>× (multiplicación)</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '× (multiplicación)'
        },
        {
          titulo: 'Obtén fila',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener fila</em>. Colócalo en el primer hueco de la multiplicación.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'fila' }, bloqueLabel: 'obtener fila'
        },
        {
          titulo: 'Escribe 2',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>2</b>. Colócalo en el segundo hueco de la multiplicación.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Suma columna más 1',
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>+ (suma)</em>. Colócalo en el segundo hueco de la primera suma: zonaClic = (fila×2) + (columna + 1). Un solo bloque de suma no alcanza -- necesitas este segundo para sumar columna y 1 aparte.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén columna',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener columna</em>. Colócalo en el primer hueco de esta segunda suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'columna' }, bloqueLabel: 'obtener columna'
        },
        {
          titulo: 'Escribe 1 (para completar zonaClic)',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>1</b>. Colócalo en el segundo hueco de esta segunda suma: zonaClic = fila×2 + (columna + 1).',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Si tocaste la casilla correcta',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>, dentro del mismo <b>hacer</b> del clic.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Compara zonaClic con zonaCorrecta',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>= (comparar)</em> en la condición.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'logic_compare', bloqueLabel: '= (comparar)'
        },
        {
          titulo: 'Obtén zonaClic',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener zonaClic</em>. Colócalo en el primer hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'zonaClic' }, bloqueLabel: 'obtener zonaClic'
        },
        {
          titulo: 'Obtén zonaCorrecta (para comparar)',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener zonaCorrecta</em>. Colócalo en el segundo hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'zonaCorrecta' }, bloqueLabel: 'obtener zonaCorrecta'
        },
        {
          titulo: 'Suma un punto',
          desc: 'Ve a <b>Variables</b> y arrastra otro bloque <em>Establecer puntos a</em>, dentro del <b>hacer</b> más interno. <b>Revisa el desplegable:</b> como acabas de usar zonaClic/zonaCorrecta, Blockly puede dejarlo apuntando a esa variable en vez de a <b>puntos</b> -- si no dice "puntos", cámbialo con el menú del bloque.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_set', valor: 'puntos' }, bloqueLabel: 'Establecer puntos'
        },
        {
          titulo: 'Suma 1 al puntaje actual',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>+ (suma)</em>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén los puntos actuales',
          desc: 'Ve a <b>Variables</b> y arrastra <em>obtener puntos</em>. Colócalo en el primer hueco.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'puntos' }, bloqueLabel: 'obtener puntos'
        },
        {
          titulo: 'Escribe 1 para sumar',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>1</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Prepara la siguiente pregunta',
          desc: 'Ve a <b>Funciones</b> y arrastra otro bloque <em>nueva_pregunta</em>, después de sumar el punto: nuevo rectángulo y las 4 casillas se reparten de nuevo, en otro orden.',
          highlightCat: 'Funciones', expandCat: null, bloque: 'procedures_callnoreturn', bloqueLabel: 'nueva_pregunta'
        },
        {
          titulo: 'Avanza al siguiente fotograma',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Siguiente frame</em> como último bloque del ciclo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_frame', bloqueLabel: 'Siguiente frame'
        },
        {
          titulo: 'Abre la vista de juego',
          desc: 'Usa la <b>vista de juego</b> para ver el tablero de 2×2.',
          highlightElement: '#btnGame'
        },
        {
          titulo: 'Juega y calcula',
          desc: 'Ejecuta el programa y haz clic en la casilla con el perímetro correcto. Fíjate que la respuesta correcta cambia de esquina en cada ronda -- ¡hay que calcular cada vez!',
          highlightElement: '#btnGameRun'
        }
      ]
    },

    juego_evitar_obstaculos: {
      title: '¡Esquiva y Sobrevive!',
      icon: '🚧',
      diagram: '',
      steps: [
        {
          titulo: '¿Qué aprenderemos?',
          desc: 'Crearás un juego donde el jugador debe esquivar un obstáculo que cae desde arriba. En vez de dos personajes con nombre (fácil de confundir), el obstáculo será un rectángulo dibujado que se controla con <b>variables</b> -- así solo el jugador responde al teclado.',
          highlightCat: null, bloque: null
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
          titulo: 'Crea la variable obstaculoX',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>obstaculoX</b>. En ella guardaremos la posición horizontal del obstáculo (que no es un personaje, sino un rectángulo dibujado).',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'obstaculoX', expandCat: null, bloque: null
        },
        {
          titulo: 'Establece obstaculoX',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer obstaculoX a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe la posición X inicial',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em>. Usa, por ejemplo, <b>200</b>.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Crea la variable obstaculoY',
          desc: 'Ve a <b>Variables</b> y crea una variable llamada <b>obstaculoY</b> para la posición vertical del obstáculo.',
          highlightCat: 'Variables', highlightFlyoutButton: 'create_variable', variable: 'obstaculoY', expandCat: null, bloque: null
        },
        {
          titulo: 'Establece obstaculoY',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>Establecer obstaculoY a</em>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe la posición Y inicial',
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>Número</em>. Déjalo en <b>0</b>: el obstáculo empieza arriba de todo.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
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
          titulo: 'Condición: flecha izquierda',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>Si … hacer</em> dentro del ciclo. Como solo hay un personaje (el jugador), esta condición SIEMPRE mueve al jugador, nunca al obstáculo.',
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
          desc: 'Ve a <b>Variables</b> y arrastra otro bloque <em>Establecer obstaculoY a</em>, fuera de los <em>Si</em>, para que el obstáculo baje un poco en cada vuelta del ciclo.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Suma la velocidad de caída',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>+ (suma)</em>. Conéctalo al bloque anterior.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '+ (suma)'
        },
        {
          titulo: 'Obtén la posición actual del obstáculo',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener obstaculoY</em>. Colócalo en el primer hueco de la suma.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'obstaculoY' }, bloqueLabel: 'obtener obstaculoY'
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
          titulo: 'Obtén obstaculoY para comparar',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener obstaculoY</em>. Colócalo en el primer hueco de la comparación.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'obstaculoY' }, bloqueLabel: 'obtener obstaculoY'
        },
        {
          titulo: 'Escribe el límite inferior',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>360</b> (el alto de la pantalla). Colócalo en el segundo hueco.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Reinicia el obstáculo arriba',
          desc: 'Ve a <b>Variables</b> y arrastra otro bloque <em>Establecer obstaculoY a</em> dentro del <b>hacer</b>.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Escribe 0 para reiniciar',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>0</b>. Colócalo en el bloque anterior.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Cambia obstaculoX a una posición nueva',
          desc: 'Ve a <b>Variables</b> y arrastra otro bloque <em>Establecer obstaculoX a</em>, para que el obstáculo caiga por una columna distinta cada vez.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Obtén una posición X al azar',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Número aleatorio</em>. Colócalo en el bloque anterior, entre <b>0</b> y <b>440</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_random_int', bloqueLabel: 'Número aleatorio'
        },
        {
          titulo: 'Dibuja el obstáculo',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Rectángulo sólido</em>, después de los dos <em>Si</em>. Usa ancho <b>40</b>, alto <b>40</b> y un color bien visible, por ejemplo <b>#ff3b3b</b> (rojo). Anota ese color: lo necesitas igual en el siguiente paso.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'Rectángulo sólido'
        },
        {
          titulo: 'Obtén obstaculoX para dibujar',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener obstaculoX</em>. Colócalo en el hueco X del rectángulo.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'obstaculoX' }, bloqueLabel: 'obtener obstaculoX'
        },
        {
          titulo: 'Obtén obstaculoY para dibujar',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener obstaculoY</em>. Colócalo en el hueco Y del rectángulo.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'obstaculoY' }, bloqueLabel: 'obtener obstaculoY'
        },
        {
          titulo: 'Si el jugador toca al obstáculo',
          desc: 'Ve a <b>Lógica</b> y arrastra el último bloque <em>Si … hacer</em>, después de dibujar el obstáculo.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Comprueba el color del choque',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>¿Toca este color?</em> en la condición. Usa <b>exactamente el mismo color</b> que le pusiste al rectángulo (por ejemplo <b>#ff3b3b</b>): así el jugador solo "choca" con el obstáculo, no con el fondo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'touching_color', bloqueLabel: '¿Toca este color?'
        },
        {
          titulo: 'Muestra el mensaje de choque',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Escribir texto en pantalla</em> dentro del <b>hacer</b>. Escribe, por ejemplo, "¡Choque!".',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Dibuja al jugador',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Dibujar personaje</em>, como último bloque antes de avanzar el fotograma.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_draw', bloqueLabel: 'Dibujar personaje'
        },
        {
          titulo: 'Avanza al siguiente fotograma',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Siguiente frame</em> como último bloque del ciclo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_frame', bloqueLabel: 'Siguiente frame'
        },
        {
          titulo: 'Abre la vista de juego',
          desc: 'Activa la <b>vista de juego</b> para ver el escenario y al jugador en acción.',
          highlightElement: '#btnGame'
        },
        {
          titulo: 'Prueba tu juego',
          desc: 'Ejecuta y esquiva el obstáculo moviéndote con las flechas. Ajusta la velocidad de caída (el <b>3</b>) hasta que el reto sea divertido y justo.',
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
          desc: 'Crearás un juego con contador de <b>puntos</b> y <b>tiempo</b>: cada vez que presiones la barra espaciadora sumas un punto, y el tiempo baja en cada vuelta del ciclo.',
          highlightCat: null, bloque: null
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
          desc: 'Ve a <b>Matemáticas</b> y arrastra otro bloque <em>Número</em>. Usa <b>30</b> como tiempo de partida.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
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
          titulo: 'Condición: barra espaciadora',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>Si … hacer</em> dentro del ciclo.',
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
          titulo: 'Resta 1 al tiempo cada vuelta',
          desc: 'Ve a <b>Variables</b> y arrastra otro bloque <em>Establecer tiempo a</em>, fuera del <em>Si</em>, para que el tiempo baje en cada vuelta del ciclo.',
          highlightCat: 'Variables', expandCat: null, bloque: 'variables_set', bloqueLabel: 'Establecer variable'
        },
        {
          titulo: 'Resta 1 al tiempo actual',
          desc: 'Ve a <b>Matemáticas</b> y arrastra el bloque <em>- (resta)</em>. Conéctalo al bloque anterior.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_arithmetic', bloqueLabel: '- (resta)'
        },
        {
          titulo: 'Obtén el tiempo actual',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener tiempo</em>. Colócalo en el primer hueco de la resta.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'tiempo' }, bloqueLabel: 'obtener tiempo'
        },
        {
          titulo: 'Escribe 1 para restar',
          desc: 'Ve a <b>Matemáticas</b> y arrastra un bloque <em>Número</em> con valor <b>1</b>. Colócalo en el segundo hueco de la resta.',
          highlightCat: 'Matemáticas', expandCat: null, bloque: 'math_number', bloqueLabel: 'Número'
        },
        {
          titulo: 'Muestra los puntos en pantalla',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Escribir texto en pantalla</em>. Ubícalo en X=<b>20</b>, Y=<b>30</b>.',
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
          titulo: 'Avanza al siguiente fotograma',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Siguiente frame</em> como último bloque del ciclo.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_frame', bloqueLabel: 'Siguiente frame'
        },
        {
          titulo: 'Abre la vista de juego',
          desc: 'Usa la <b>vista de juego</b> para ver el marcador y los objetos que van a sumar puntos.',
          highlightElement: '#btnGame'
        },
        {
          titulo: 'Prueba el juego',
          desc: 'Juega varias veces presionando espacio y observa cómo suben los puntos y baja el tiempo. Ajusta el tiempo inicial para que sea entretenido.',
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
          desc: 'Construirás un laberinto donde el personaje debe moverse sin salirse del canvas. Practicarás movimiento por teclado y detección de bordes.',
          highlightCat: null, bloque: null
        },
        {
          titulo: 'Abre la categoría Inicio',
          desc: 'Haz clic en <b>Inicio</b> en el panel de bloques para ver los bloques de pantalla, personaje y bordes.',
          highlightCat: 'Inicio', expandCat: null, bloque: null
        },
        {
          titulo: 'Arrastra: Iniciar juego',
          desc: 'Arrastra el bloque <em>Iniciar juego</em>. Configura ancho <b>480</b> y alto <b>360</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_start', bloqueLabel: 'Iniciar juego'
        },
        {
          titulo: 'Crea el personaje',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Crear personaje</em>. Ubícalo en la entrada del laberinto, por ejemplo X=<b>20</b>, Y=<b>20</b>.',
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
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Rectángulo sólido</em> para dibujar una pared del laberinto. Debe estar <b>dentro</b> del ciclo, después de limpiar, para que no se borre.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'Rectángulo sólido'
        },
        {
          titulo: 'Dibuja la segunda pared',
          desc: 'Ve a <b>Inicio</b> y arrastra otro bloque <em>Rectángulo sólido</em> para otra pared, en una posición distinta.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_draw_rect', bloqueLabel: 'Rectángulo sólido'
        },
        {
          titulo: 'Condición: flecha arriba',
          desc: 'Ve a <b>Lógica</b> y arrastra el bloque <em>Si … hacer</em>, después de dibujar las paredes.',
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
          desc: 'Ve a <b>Lógica</b> y arrastra el último bloque <em>Si … hacer</em>.',
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
          titulo: 'Detecta si toca el borde',
          desc: 'Ve a <b>Lógica</b> y arrastra otro bloque <em>Si … hacer</em>, para reiniciar al personaje si se sale del canvas.',
          highlightCat: 'Lógica', expandCat: null, bloque: 'controls_if', bloqueLabel: 'Si … hacer'
        },
        {
          titulo: 'Comprueba el borde',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>¿Toca el borde?</em> en la condición.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'touching_edge', bloqueLabel: '¿Toca el borde?'
        },
        {
          titulo: 'Regresa al punto de inicio',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Poner personaje en X,Y</em> dentro del <b>hacer</b>. Usa la misma posición inicial, por ejemplo X=<b>20</b>, Y=<b>20</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'sprite_set_pos', bloqueLabel: 'Poner personaje en X,Y'
        },
        {
          titulo: 'Dibuja el personaje',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Dibujar personaje</em>, después de comprobar el borde.',
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
          desc: 'Ejecuta y recorre el laberinto con las flechas. Ajusta las paredes y prueba que la ruta sea posible antes de compartir tu juego.',
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
          desc: 'Harás un juego donde el objetivo es hacer clic sobre un blanco que cambia de posición cada vez que lo aciertas.',
          highlightCat: null, bloque: null
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
          titulo: 'Mueve el blanco a una posición nueva',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Poner personaje en X,Y</em> dentro del <b>hacer</b>, para que el blanco cambie de lugar cada vez que lo aciertas.',
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
          titulo: 'Muestra los puntos en pantalla',
          desc: 'Ve a <b>Inicio</b> y arrastra el bloque <em>Escribir texto en pantalla</em>, fuera del <em>Si</em>. Ubícalo en X=<b>20</b>, Y=<b>30</b>.',
          highlightCat: 'Inicio', expandCat: null, bloque: 'game_show_text', bloqueLabel: 'Escribir texto en pantalla'
        },
        {
          titulo: 'Obtén los puntos para mostrarlos',
          desc: 'Ve a <b>Variables</b> y arrastra el bloque <em>obtener puntos</em>. Colócalo en el hueco de texto.',
          highlightCat: 'Variables', expandCat: null, bloque: { tipo: 'variables_get', valor: 'puntos' }, bloqueLabel: 'obtener puntos'
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
          desc: 'Haz clic sobre el blanco varias veces y observa cómo suben tus puntos. Ajusta el tamaño y la posición para que sea más o menos difícil.',
          highlightElement: '#btnGameRun'
        }
      ]
    }
  };

  if (typeof TUTORIALS === 'undefined') {
    window.TUTORIALS = {};
  }

  Object.assign(TUTORIALS, tutorials);
  window.TUTORIALS_GAMES = tutorials;
})();
