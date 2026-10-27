/* ════════════════════════════════════════════════════════════════════
   Tutoriales creados por docentes
   ────────────────────────────────────────────────────────────────────
   El docente arma su programa con bloques, genera los pasos desde el
   workspace, los ajusta y los comparte como archivo (.tutorial.json) o
   como enlace (#tut=...). El estudiante los abre desde el menú de
   Tutoriales y TutorialSteps los muestra igual que los oficiales.

   SEGURIDAD -- un tutorial compartido es contenido NO confiable (lo
   puede escribir o modificar cualquiera):
   - Nunca se interpreta como HTML: el texto se muestra con textContent
     y solo admite **negrita**, *cursiva* y saltos de línea, que se
     arman nodo por nodo (ver renderTexto). Un "<script>" se ve como
     texto.
   - sanitizar() reconstruye el tutorial desde cero copiando SOLO los
     campos conocidos, con su tipo y largo máximo. Todo lo demás se
     descarta (incluido __proto__ / constructor).
   - El tipo de bloque debe existir en Blockly, la categoría debe
     existir en el toolbox y los nombres de variable solo admiten
     letras, números y "_".
   - Los botones a resaltar salen de una lista fija (BOTONES), nunca de
     un selector CSS que venga en el archivo.
   - Límite de tamaño (archivo y enlace) y de cantidad de pasos.
   - No trae imagen de conexiones ni código: nada se descarga ni se
     ejecuta solo. El estudiante sigue presionando Ejecutar.
   - Se registra con id "compartido_<huella>", así nunca reemplaza a un
     tutorial oficial.
   ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var FORMATO = 'appblock-tutorial';
  var VERSION = 1;
  var LIM = {
    bytes: 300 * 1024,      // archivo o JSON descomprimido del enlace
    enlace: 120 * 1024,     // caracteres del #tut=...
    pasos: 200,
    tituloTut: 80,
    titulo: 80,
    texto: 800,
    etiqueta: 60,
    variables: 30
  };
  var RE_NOMBRE = /^[A-Za-z_][A-Za-z0-9_]{0,39}$/;
  var ICONOS = ['📘', '💡', '🤖', '🎮', '📶', '🌡️', '🚦', '🔊', '🧮', '📐', '🧪', '⭐'];
  // Única fuente de los elementos que un tutorial compartido puede resaltar.
  var BOTONES = {
    archivo: '#btnArchivo',
    conectar: '#btnConnection',
    ejecutar: '#btnRun',
    juego: '#btnGame',
    juegoEjecutar: '#btnGameRun'
  };
  var SELECTOR_A_BOTON = {};
  Object.keys(BOTONES).forEach(function (k) { SELECTOR_A_BOTON[BOTONES[k]] = k; });

  function ws() {
    if (typeof Code !== 'undefined' && Code.workspace) return Code.workspace;
    return Blockly.getMainWorkspace();
  }

  function esTexto(v, max) { return typeof v === 'string' && v.length <= max; }
  function limpiarTexto(v, max) {
    // Saca caracteres de control (excepto salto de línea) y recorta.
    return String(v).replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, '').slice(0, max);
  }

  /* ── Toolbox: categorías, padres y bloques que contiene ───────── */
  var _toolboxCache = null;
  function toolboxInfo() {
    if (_toolboxCache) return _toolboxCache;
    var info = { porNombre: {}, tipoACategoria: {} };
    var tb = ws().getToolbox && ws().getToolbox();
    if (!tb || !tb.getToolboxItems) return info;
    tb.getToolboxItems().forEach(function (item) {
      if (!item.getName) return;
      var nombre = item.getName();
      if (info.porNombre[nombre]) return; // primer uso del nombre
      var padres = [];
      for (var p = item.getParent && item.getParent(); p; p = p.getParent && p.getParent()) {
        if (p.getName) padres.unshift(p.getName());
      }
      var tipos = [];
      var contenido = item.getContents ? item.getContents() : null;
      if (contenido === 'VARIABLE' || (item.toolboxItemDef_ && item.toolboxItemDef_.custom === 'VARIABLE')) {
        tipos = ['variables_get', 'variables_set', 'math_change'];
      } else if (contenido === 'PROCEDURE' || (item.toolboxItemDef_ && item.toolboxItemDef_.custom === 'PROCEDURE')) {
        tipos = ['procedures_defnoreturn', 'procedures_defreturn', 'procedures_callnoreturn',
          'procedures_callreturn', 'procedures_ifreturn'];
      } else if (Array.isArray(contenido)) {
        contenido.forEach(function (c) {
          var t = c.type || (c.blockxml && c.blockxml.getAttribute && c.blockxml.getAttribute('type'));
          if (t) tipos.push(t);
        });
      }
      info.porNombre[nombre] = { padres: padres, tipos: tipos };
      tipos.forEach(function (t) {
        if (!info.tipoACategoria[t]) info.tipoACategoria[t] = nombre;
      });
    });
    _toolboxCache = info;
    return info;
  }

  /* ── Texto seguro: **negrita**, *cursiva*, saltos de línea ───── */
  function renderTexto(el, texto) {
    el.textContent = '';
    String(texto || '').split('\n').forEach(function (linea, i) {
      if (i > 0) el.appendChild(document.createElement('br'));
      var re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
      var ultimo = 0, m;
      while ((m = re.exec(linea))) {
        if (m.index > ultimo) el.appendChild(document.createTextNode(linea.slice(ultimo, m.index)));
        var n = document.createElement(m[1] !== undefined ? 'b' : 'em');
        n.textContent = m[1] !== undefined ? m[1] : m[2];
        el.appendChild(n);
        ultimo = re.lastIndex;
      }
      if (ultimo < linea.length) el.appendChild(document.createTextNode(linea.slice(ultimo)));
    });
  }

  /* ── Validación del formato compartido ─────────────────────────
     Devuelve { tutorial, errores }. Si hay errores, tutorial es null.
     Formato externo (lo que viaja en el archivo / enlace):
     { formato, version, titulo, icono, pasos: [ { titulo, texto,
       categoria?, bloque?: { tipo, variable? }, etiqueta?,
       variables?: [..], boton?, accion? } ] }                         */
  function sanitizar(obj) {
    var errores = [];
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
      return { tutorial: null, errores: ['El archivo no tiene el formato de un tutorial.'] };
    }
    if (obj.formato !== FORMATO) errores.push('No es un tutorial de AppBlock.');
    if (obj.version !== VERSION) errores.push('Versión de tutorial no soportada.');
    if (!esTexto(obj.titulo, LIM.tituloTut) || !obj.titulo.trim()) errores.push('Falta el título (máximo ' + LIM.tituloTut + ' caracteres).');
    if (!Array.isArray(obj.pasos) || !obj.pasos.length) errores.push('El tutorial no tiene pasos.');
    else if (obj.pasos.length > LIM.pasos) errores.push('Demasiados pasos (máximo ' + LIM.pasos + ').');
    if (errores.length) return { tutorial: null, errores: errores };

    var tb = toolboxInfo();
    var limpio = {
      formato: FORMATO,
      version: VERSION,
      titulo: limpiarTexto(obj.titulo, LIM.tituloTut).trim(),
      icono: ICONOS.indexOf(obj.icono) !== -1 ? obj.icono : ICONOS[0],
      pasos: []
    };

    obj.pasos.forEach(function (p, i) {
      var n = 'Paso ' + (i + 1) + ': ';
      if (!p || typeof p !== 'object' || Array.isArray(p)) { errores.push(n + 'formato inválido.'); return; }
      if (!esTexto(p.titulo, LIM.titulo) || !p.titulo.trim()) { errores.push(n + 'falta el título (máx. ' + LIM.titulo + ').'); return; }
      if (p.texto !== undefined && !esTexto(p.texto, LIM.texto)) { errores.push(n + 'texto demasiado largo (máx. ' + LIM.texto + ').'); return; }
      var paso = { titulo: limpiarTexto(p.titulo, LIM.titulo).trim(), texto: limpiarTexto(p.texto || '', LIM.texto) };

      if (p.categoria !== undefined) {
        if (typeof p.categoria !== 'string' || !Object.prototype.hasOwnProperty.call(tb.porNombre, p.categoria)) {
          errores.push(n + 'la categoría "' + String(p.categoria).slice(0, 40) + '" no existe.'); return;
        }
        paso.categoria = p.categoria;
      }
      if (p.bloque !== undefined) {
        var b = p.bloque;
        if (!b || typeof b !== 'object' || typeof b.tipo !== 'string' ||
          !Object.prototype.hasOwnProperty.call(Blockly.Blocks, b.tipo)) {
          errores.push(n + 'el bloque no existe.'); return;
        }
        if (!paso.categoria) { errores.push(n + 'un paso con bloque necesita su categoría.'); return; }
        if (tb.porNombre[paso.categoria].tipos.indexOf(b.tipo) === -1) {
          errores.push(n + 'el bloque "' + b.tipo + '" no está en la categoría "' + paso.categoria + '" (no destellaría).'); return;
        }
        paso.bloque = { tipo: b.tipo };
        if (b.variable !== undefined) {
          if (typeof b.variable !== 'string' || !RE_NOMBRE.test(b.variable)) { errores.push(n + 'nombre de variable inválido.'); return; }
          paso.bloque.variable = b.variable;
        }
        if (p.etiqueta !== undefined) {
          if (!esTexto(p.etiqueta, LIM.etiqueta)) { errores.push(n + 'etiqueta demasiado larga.'); return; }
          paso.etiqueta = limpiarTexto(p.etiqueta, LIM.etiqueta);
        }
      }
      if (p.variables !== undefined) {
        if (!Array.isArray(p.variables) || !p.variables.length || p.variables.length > LIM.variables ||
          !p.variables.every(function (v) { return typeof v === 'string' && RE_NOMBRE.test(v); })) {
          errores.push(n + 'lista de variables inválida (solo letras, números y _).'); return;
        }
        paso.variables = p.variables.slice();
        paso.categoria = 'Variables';
      }
      if (p.boton !== undefined) {
        if (!Object.prototype.hasOwnProperty.call(BOTONES, p.boton)) { errores.push(n + 'botón desconocido.'); return; }
        paso.boton = p.boton;
      }
      if (p.accion !== undefined) {
        if (p.accion !== 'ejecutar') { errores.push(n + 'acción desconocida.'); return; }
        paso.accion = 'ejecutar';
      }
      limpio.pasos.push(paso);
    });

    return errores.length ? { tutorial: null, errores: errores } : { tutorial: limpio, errores: [] };
  }

  /* ── Formato externo (ya validado) → formato interno de TutorialSteps ── */
  function aInterno(ext, huella) {
    var tb = toolboxInfo();
    return {
      title: ext.titulo,
      icon: ext.icono,
      diagram: '',
      compartido: true,
      huella: huella,
      steps: ext.pasos.map(function (p) {
        var s = { titulo: p.titulo, desc: p.texto, highlightCat: p.categoria || null, expandCat: null, bloque: null };
        if (p.categoria && tb.porNombre[p.categoria] && tb.porNombre[p.categoria].padres.length) {
          s.expandCats = tb.porNombre[p.categoria].padres.slice();
        }
        if (p.bloque) {
          s.bloque = p.bloque.variable ? { tipo: p.bloque.tipo, valor: p.bloque.variable } : p.bloque.tipo;
          s.bloqueLabel = p.etiqueta || p.bloque.tipo;
        }
        if (p.variables) {
          s.highlightFlyoutButton = 'create_variable';
          s.variable = p.variables.slice();
        }
        if (p.boton) s.highlightElement = BOTONES[p.boton];
        if (p.accion === 'ejecutar') s.waitForAction = 'run';
        return s;
      })
    };
  }

  /* ── Huella: identifica el contenido exacto del tutorial ───────── */
  function huella(ext) {
    var texto = JSON.stringify(ext);
    function corta(hex) { return (hex.slice(0, 4) + '-' + hex.slice(4, 8)).toUpperCase(); }
    if (window.crypto && crypto.subtle && window.TextEncoder) {
      return crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto)).then(function (buf) {
        var hex = Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
        return corta(hex);
      });
    }
    // Contexto no seguro (http que no es localhost): FNV-1a como respaldo.
    var h = 0x811c9dc5;
    for (var i = 0; i < texto.length; i++) { h ^= texto.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return Promise.resolve(corta(('00000000' + h.toString(16)).slice(-8)));
  }

  /* ── Abrir un tutorial compartido (archivo o enlace) ────────────── */
  function abrirTexto(texto, origen) {
    if (texto.length > LIM.bytes) return alerta('El tutorial es demasiado grande (máximo 300 KB).');
    var obj;
    try { obj = JSON.parse(texto); } catch (e) { return alerta('El ' + origen + ' no es un tutorial válido.'); }
    var r = sanitizar(obj);
    if (!r.tutorial) return alerta('No se puede abrir el tutorial:\n\n• ' + r.errores.slice(0, 8).join('\n• '));
    return huella(r.tutorial).then(function (h) {
      var ok = window.confirm('¿Abrir el tutorial compartido "' + r.tutorial.titulo + '"?\n\n' +
        r.tutorial.pasos.length + ' pasos · huella ' + h +
        '\n\nPídele a tu docente la huella para confirmar que es su tutorial.');
      if (!ok) return;
      var id = 'compartido_' + h.replace('-', '');
      TUTORIALS[id] = aInterno(r.tutorial, h);
      TutorialSteps.cargar(id);
    });
  }

  function alerta(msg) { window.alert(msg); return Promise.resolve(); }

  function abrirArchivo() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.addEventListener('change', function () {
      var f = input.files && input.files[0];
      if (!f) return;
      if (f.size > LIM.bytes) { alerta('El archivo es demasiado grande (máximo 300 KB).'); return; }
      var lector = new FileReader();
      lector.onload = function () { abrirTexto(String(lector.result), 'archivo'); };
      lector.readAsText(f);
    });
    input.click();
  }

  /* ── Enlace: #tut=<JSON comprimido en base64url> ─────────────────
     Va en el fragmento (después de #): el navegador NO lo manda a
     ningún servidor. */
  function b64url(bytes) {
    var s = '';
    for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function desdeB64url(txt) {
    var s = atob(txt.replace(/-/g, '+').replace(/_/g, '/'));
    var out = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
    return out;
  }
  function comprimir(texto) {
    var stream = new Blob([new TextEncoder().encode(texto)]).stream().pipeThrough(new CompressionStream('deflate-raw'));
    return new Response(stream).arrayBuffer().then(function (b) { return new Uint8Array(b); });
  }
  // Descomprime cortando apenas se pasa del límite (evita "bombas" de compresión).
  function descomprimir(bytes) {
    var lector = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw')).getReader();
    var partes = [], total = 0;
    function leer() {
      return lector.read().then(function (r) {
        if (r.done) return new TextDecoder().decode(concat(partes, total));
        total += r.value.length;
        if (total > LIM.bytes) { lector.cancel(); throw new Error('demasiado grande'); }
        partes.push(r.value);
        return leer();
      });
    }
    return leer();
  }
  function concat(partes, total) {
    var out = new Uint8Array(total), o = 0;
    partes.forEach(function (p) { out.set(p, o); o += p.length; });
    return out;
  }
  var soportaEnlace = typeof CompressionStream !== 'undefined' && typeof DecompressionStream !== 'undefined';

  function abrirDesdeEnlace() {
    var h = location.hash || '';
    if (h.indexOf('#tut=') !== 0) return;
    var datos = h.slice(5);
    // Quitar el tutorial de la barra de direcciones (que no quede al recargar).
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { }
    if (!soportaEnlace) return alerta('Este navegador no puede abrir enlaces de tutorial. Pídele a tu docente el archivo .tutorial.json.');
    if (datos.length > LIM.enlace || !/^[A-Za-z0-9_-]+$/.test(datos)) return alerta('El enlace del tutorial no es válido.');
    var bytes;
    try { bytes = desdeB64url(datos); } catch (e) { return alerta('El enlace del tutorial no es válido.'); }
    return descomprimir(bytes).then(function (t) { return abrirTexto(t, 'enlace'); },
      function () { return alerta('El enlace del tutorial está dañado o es demasiado grande.'); });
  }

  /* ════════════════════════════════════════════════════════════════
     EDITOR DEL DOCENTE
     ════════════════════════════════════════════════════════════════ */
  var borrador = null; // formato externo
  var CLAVE_BORRADOR = 'appblock_tutorial_borrador';

  function guardarBorrador() {
    try { localStorage.setItem(CLAVE_BORRADOR, JSON.stringify(borrador)); } catch (e) { }
  }
  function cargarBorrador() {
    try {
      var r = sanitizar(JSON.parse(localStorage.getItem(CLAVE_BORRADOR) || 'null'));
      return r.tutorial;
    } catch (e) { return null; }
  }

  /* Texto visible de un bloque (solo sus propios campos, sin hijos). */
  function etiquetaBloque(block) {
    var partes = [];
    block.inputList.forEach(function (input) {
      input.fieldRow.forEach(function (f) {
        if (f instanceof Blockly.FieldImage) return;
        var t = f.getText ? f.getText() : '';
        if (t && t.trim()) partes.push(t.trim());
      });
    });
    var txt = partes.join(' ').replace(/\s+/g, ' ').trim() || block.type;
    return txt.length > LIM.etiqueta ? txt.slice(0, LIM.etiqueta - 1) + '…' : txt;
  }

  function nombreVariable(block) {
    var f = block.getField && block.getField('VAR');
    if (!f || !f.getVariable) return null;
    var v = f.getVariable();
    return v && RE_NOMBRE.test(v.name) ? v.name : null;
  }

  /* Recorre el programa del docente en el orden en que se arma:
     el bloque, luego lo que va en sus huecos, luego lo de adentro, luego
     el siguiente. Cada bloque (no sombra) es un paso. */
  function generarPasos(opc) {
    var tb = toolboxInfo();
    var w = ws();
    var pasos = [];
    var sinCategoria = [];
    pasos.push({ titulo: '¿Qué aprenderemos?', texto: 'Escribe aquí de qué trata el proyecto.' });
    pasos.push({ titulo: 'Crea un proyecto nuevo', texto: 'Abre el menú **Archivo** y haz clic en **Nuevo** para empezar con el área de trabajo limpia.', boton: 'archivo' });

    var vars = w.getAllVariables().map(function (v) { return v.name; }).filter(function (n) { return RE_NOMBRE.test(n); });
    if (vars.length) {
      pasos.push({
        titulo: 'Crea las variables',
        texto: 'Ve a **Variables** y crea, una por una con *Crear variable*: ' + vars.map(function (v) { return '**' + v + '**'; }).join(', ') + '.',
        variables: vars.slice(0, LIM.variables)
      });
    }

    function visitar(block) {
      for (var b = block; b; b = b.getNextBlock()) {
        if (!b.isShadow()) agregar(b);
        b.inputList.forEach(function (input) {
          var hijo = input.connection && input.connection.targetBlock();
          if (!hijo || hijo.isShadow()) return;
          if (input.type === Blockly.INPUT_VALUE) visitarValor(hijo);
        });
        b.inputList.forEach(function (input) {
          var hijo = input.connection && input.connection.targetBlock();
          if (hijo && input.type === Blockly.NEXT_STATEMENT) visitar(hijo);
        });
      }
    }
    function visitarValor(b) {
      if (!b.isShadow()) agregar(b);
      b.inputList.forEach(function (input) {
        var hijo = input.connection && input.connection.targetBlock();
        if (hijo && !hijo.isShadow()) visitarValor(hijo);
      });
    }
    function agregar(b) {
      var cat = tb.tipoACategoria[b.type];
      if (!cat) { sinCategoria.push(b.type); return; }
      var etiqueta = etiquetaBloque(b);
      var donde;
      var padre = b.getParent();
      if (!padre) donde = 'al área de trabajo';
      else if (b.outputConnection) donde = 'al hueco de *' + etiquetaBloque(padre) + '*';
      else if (b.getPreviousBlock() && b.getPreviousBlock().getNextBlock() === b) donde = 'debajo de *' + etiquetaBloque(b.getPreviousBlock()) + '*';
      else donde = 'dentro de *' + etiquetaBloque(padre) + '*';
      var ruta = (tb.porNombre[cat].padres.concat([cat])).join(' › ');
      var texto = 'Ve a **' + ruta + '** y arrastra *' + etiqueta + '* ' + donde + '.';
      var paso = { titulo: 'Arrastra: ' + etiqueta, categoria: cat, bloque: { tipo: b.type }, etiqueta: etiqueta };
      var v = nombreVariable(b);
      if (v) {
        paso.bloque.variable = v;
        texto += ' En el desplegable elige **' + v + '**.';
      }
      if (b.type === 'math_number') texto += ' Escribe **' + b.getFieldValue('NUM') + '**.';
      if (b.type === 'text') texto += ' Escribe **' + String(b.getFieldValue('TEXT')).slice(0, 80) + '**.';
      paso.titulo = paso.titulo.slice(0, LIM.titulo);
      paso.texto = texto.slice(0, LIM.texto);
      pasos.push(paso);
    }

    w.getTopBlocks(true).forEach(function (top) {
      if (top.isShadow()) return;
      if (top.outputConnection) visitarValor(top); else visitar(top);
    });

    if (opc.juego) {
      pasos.push({ titulo: 'Abre la vista de juego', texto: 'Haz clic en **Vista Juego** para ver tu escena.', boton: 'juego' });
      pasos.push({ titulo: 'Prueba tu juego', texto: 'Ejecuta el juego y comprueba que funciona como esperas.', boton: 'juegoEjecutar' });
    }
    if (opc.placa) {
      pasos.push({ titulo: 'Guarda tu proyecto', texto: 'Abre el menú **Archivo** y haz clic en **Guardar** antes de conectar la placa.', boton: 'archivo' });
      pasos.push({ titulo: 'Conecta tu ESP32', texto: 'Haz clic en **Conectar** y elige el puerto de tu ESP32.', boton: 'conectar' });
      pasos.push({ titulo: '¡Ejecuta y prueba!', texto: 'Haz clic en **Ejecutar** y comprueba que funciona.', boton: 'ejecutar', accion: 'ejecutar' });
    }
    return { pasos: pasos.slice(0, LIM.pasos), sinCategoria: sinCategoria, recortado: pasos.length > LIM.pasos };
  }

  /* Validación completa antes de compartir: formato + que cada paso con
     bloque quede ✓ con el programa del docente cargado (misma regla que
     TutorialSteps._isPasoCompleto: cantidad acumulada por tipo/variable). */
  function validarBorrador() {
    var r = sanitizar(borrador);
    if (!r.tutorial) return r.errores;
    var errores = [];
    var interno = aInterno(r.tutorial, '');
    var todos = ws().getAllBlocks(false);
    var pedidos = {};
    interno.steps.forEach(function (s, i) {
      if (s.variable) {
        var existentes = ws().getAllVariables().map(function (v) { return v.name; });
        s.variable.forEach(function (v) {
          if (existentes.indexOf(v) === -1) errores.push('Paso ' + (i + 1) + ': la variable "' + v + '" no está en tu programa.');
        });
      }
      if (!s.bloque) return;
      var b = TutorialSteps._normalizarBloques(s.bloque)[0];
      var clave = TutorialSteps._bloqueKey(b);
      pedidos[clave] = (pedidos[clave] || 0) + 1;
      var hay = todos.filter(function (blk) { return TutorialSteps._bloqueCoincide(blk, b); }).length;
      if (hay < pedidos[clave]) {
        errores.push('Paso ' + (i + 1) + ' ("' + s.titulo + '"): pide ' + pedidos[clave] + ' bloque(s) "' +
          (s.bloqueLabel || b.tipo) + '" pero tu programa tiene ' + hay + '. Ese paso nunca se marcaría ✓.');
      }
    });
    return errores;
  }

  /* ── Interfaz del editor (todo con DOM y textContent) ───────────── */
  var modal = null, lista = null, estado = null, inTitulo = null, selIcono = null;

  function el(tag, attrs, hijos) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'texto') e.textContent = attrs[k];
      else if (k === 'clase') e.className = attrs[k];
      else if (k === 'click') e.addEventListener('click', attrs[k]);
      else e.setAttribute(k, attrs[k]);
    });
    (hijos || []).forEach(function (h) { if (h) e.appendChild(h); });
    return e;
  }

  function mostrarEstado(lineas, tipo) {
    estado.textContent = '';
    estado.className = 'tdoc-estado ' + (tipo || '');
    [].concat(lineas).forEach(function (l) { estado.appendChild(el('div', { texto: l })); });
  }

  function dibujarPasos() {
    lista.textContent = '';
    borrador.pasos.forEach(function (p, i) {
      var tituloIn = el('input', { type: 'text', maxlength: String(LIM.titulo), clase: 'tdoc-in' });
      tituloIn.value = p.titulo;
      tituloIn.addEventListener('input', function () { p.titulo = tituloIn.value; guardarBorrador(); });
      var textoIn = el('textarea', { maxlength: String(LIM.texto), rows: '2', clase: 'tdoc-in' });
      textoIn.value = p.texto || '';
      textoIn.addEventListener('input', function () { p.texto = textoIn.value; guardarBorrador(); });
      var info = p.bloque ? (p.categoria + ' › ' + (p.etiqueta || p.bloque.tipo) + (p.bloque.variable ? ' (' + p.bloque.variable + ')' : ''))
        : p.variables ? ('Crear variables: ' + p.variables.join(', '))
          : p.boton ? ('Resalta el botón: ' + p.boton) : 'Paso informativo';
      function mover(d) {
        var j = i + d;
        if (j < 0 || j >= borrador.pasos.length) return;
        var t = borrador.pasos[i]; borrador.pasos[i] = borrador.pasos[j]; borrador.pasos[j] = t;
        guardarBorrador(); dibujarPasos();
      }
      lista.appendChild(el('div', { clase: 'tdoc-paso' }, [
        el('div', { clase: 'tdoc-num', texto: String(i + 1) }),
        el('div', { clase: 'tdoc-cuerpo' }, [tituloIn, textoIn, el('div', { clase: 'tdoc-info', texto: info })]),
        el('div', { clase: 'tdoc-acc' }, [
          el('button', { texto: '↑', title: 'Subir', click: function () { mover(-1); } }),
          el('button', { texto: '↓', title: 'Bajar', click: function () { mover(1); } }),
          el('button', { texto: '✕', title: 'Quitar paso', click: function () { borrador.pasos.splice(i, 1); guardarBorrador(); dibujarPasos(); } })
        ])
      ]));
    });
  }

  function nuevoBorrador() {
    return { formato: FORMATO, version: VERSION, titulo: 'Mi tutorial', icono: ICONOS[0], pasos: [] };
  }

  function exportarTexto() {
    borrador.titulo = inTitulo.value;
    borrador.icono = selIcono.value;
    var errores = validarBorrador();
    if (errores.length) { mostrarEstado(['Corrige esto antes de compartir:'].concat(errores.slice(0, 10)), 'error'); return null; }
    return JSON.stringify(sanitizar(borrador).tutorial);
  }

  function abrirEditor() {
    if (!modal) construirEditor();
    _toolboxCache = null;
    borrador = borrador || cargarBorrador() || nuevoBorrador();
    inTitulo.value = borrador.titulo;
    selIcono.value = ICONOS.indexOf(borrador.icono) !== -1 ? borrador.icono : ICONOS[0];
    dibujarPasos();
    mostrarEstado('Arma tu programa con bloques y presiona "Generar pasos desde mis bloques".');
    modal.style.display = 'flex';
  }

  function construirEditor() {
    var css = document.createElement('style');
    css.textContent =
      '#tdoc-modal{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10050;display:none;align-items:center;justify-content:center}' +
      '#tdoc-modal .tdoc-caja{background:#1e1e36;color:#e6e6f5;width:min(900px,94vw);max-height:90vh;display:flex;flex-direction:column;border-radius:10px;box-shadow:0 10px 40px rgba(0,0,0,.5);font-size:14px;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
      '#tdoc-modal header{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid #2e2e50}' +
      '#tdoc-modal h3{margin:0;font-size:16px}' +
      '#tdoc-modal .tdoc-fila{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:10px 16px}' +
      '#tdoc-modal .tdoc-lista{overflow:auto;padding:0 16px;flex:1;min-height:120px}' +
      '#tdoc-modal .tdoc-paso{display:flex;gap:8px;padding:8px 0;border-bottom:1px solid #2e2e50}' +
      '#tdoc-modal .tdoc-num{width:26px;text-align:right;color:#8888bb;padding-top:6px}' +
      '#tdoc-modal .tdoc-cuerpo{flex:1;display:flex;flex-direction:column;gap:4px}' +
      '#tdoc-modal .tdoc-in{width:100%;box-sizing:border-box;background:#14142a;color:#e6e6f5;border:1px solid #3a3a66;border-radius:5px;padding:5px 7px;font:inherit}' +
      '#tdoc-modal .tdoc-info{font-size:12px;color:#9b9bd0}' +
      '#tdoc-modal .tdoc-acc{display:flex;flex-direction:column;gap:3px}' +
      '#tdoc-modal button{background:#2d2d55;color:#fff;border:1px solid #4a4a88;border-radius:5px;padding:6px 10px;cursor:pointer;font:inherit}' +
      '#tdoc-modal button:hover{background:#7c6af7}' +
      '#tdoc-modal .tdoc-estado{flex-shrink:0;padding:8px 16px;font-size:13px;color:#b8b8e0;max-height:120px;overflow:auto}' +
      '#tdoc-modal .tdoc-estado.error{color:#ff8a8a}#tdoc-modal .tdoc-estado.ok{color:#7be08a}' +
      '#tdoc-modal footer{display:flex;flex-wrap:wrap;gap:8px;padding:12px 16px;border-top:1px solid #2e2e50}' +
      '.tut-option-docente{display:flex;align-items:center;gap:9px;padding:8px 14px;font-size:13px;color:#aaaace;cursor:pointer}' +
      '.tut-option-docente:hover{background:rgba(124,106,247,.15);color:#fff}';
    document.head.appendChild(css);

    inTitulo = el('input', { type: 'text', maxlength: String(LIM.tituloTut), clase: 'tdoc-in', style: 'flex:1;min-width:200px' });
    inTitulo.addEventListener('input', function () { borrador.titulo = inTitulo.value; guardarBorrador(); });
    selIcono = el('select', { clase: 'tdoc-in', style: 'width:70px' });
    ICONOS.forEach(function (ic) { selIcono.appendChild(el('option', { value: ic, texto: ic })); });
    selIcono.addEventListener('change', function () { borrador.icono = selIcono.value; guardarBorrador(); });
    var chkPlaca = el('input', { type: 'checkbox' }); chkPlaca.checked = true;
    var chkJuego = el('input', { type: 'checkbox' });
    lista = el('div', { clase: 'tdoc-lista' });
    estado = el('div', { clase: 'tdoc-estado' });

    modal = el('div', { id: 'tdoc-modal' }, [
      el('div', { clase: 'tdoc-caja', role: 'dialog', 'aria-label': 'Crear tutorial' }, [
        el('header', null, [
          el('h3', { texto: '✏️ Crear tutorial para mis estudiantes' }),
          el('button', { texto: '✕', title: 'Cerrar', click: function () { modal.style.display = 'none'; } })
        ]),
        el('div', { clase: 'tdoc-fila' }, [selIcono, inTitulo]),
        el('div', { clase: 'tdoc-fila' }, [
          el('label', null, [chkPlaca, document.createTextNode(' Pasos de ESP32 (guardar, conectar, ejecutar)')]),
          el('label', null, [chkJuego, document.createTextNode(' Pasos de vista de juego')]),
          el('button', {
            texto: '⚙️ Generar pasos desde mis bloques', click: function () {
              _toolboxCache = null;
              if (borrador.pasos.length && !window.confirm('Esto reemplaza los pasos actuales. ¿Continuar?')) return;
              var g = generarPasos({ placa: chkPlaca.checked, juego: chkJuego.checked });
              borrador.pasos = g.pasos;
              guardarBorrador(); dibujarPasos();
              var msg = [g.pasos.length + ' pasos generados. Revisa los textos y presiona "Validar".'];
              if (g.sinCategoria.length) msg.push('Bloques que no están en ninguna categoría y se omitieron: ' + g.sinCategoria.join(', '));
              if (g.recortado) msg.push('Se recortó a ' + LIM.pasos + ' pasos.');
              mostrarEstado(msg, g.sinCategoria.length ? 'error' : '');
            }
          }),
          el('button', {
            texto: '+ Paso informativo', click: function () {
              borrador.pasos.push({ titulo: 'Nuevo paso', texto: '' }); guardarBorrador(); dibujarPasos();
              lista.scrollTop = lista.scrollHeight;
            }
          })
        ]),
        el('div', { clase: 'tdoc-info', style: 'padding:0 16px 6px', texto: 'Formato del texto: **negrita**, *cursiva*. No se permite HTML.' }),
        lista,
        estado,
        el('footer', null, [
          el('button', {
            texto: '✔ Validar', click: function () {
              var e = validarBorrador();
              if (e.length) mostrarEstado(e.slice(0, 12), 'error');
              else mostrarEstado('Todo bien: cada paso apunta a un bloque que existe, destella en su categoría y se marca ✓ con tu programa.', 'ok');
            }
          }),
          el('button', {
            texto: '▶ Probar', click: function () {
              var t = exportarTexto(); if (!t) return;
              var ext = JSON.parse(t);
              huella(ext).then(function (h) {
                TUTORIALS['compartido_prueba'] = aInterno(ext, h);
                modal.style.display = 'none';
                TutorialSteps.cargar('compartido_prueba');
              });
            }
          }),
          el('button', {
            texto: '💾 Descargar archivo', click: function () {
              var t = exportarTexto(); if (!t) return;
              var nombre = (borrador.titulo || 'tutorial').replace(/[^A-Za-z0-9áéíóúñÁÉÍÓÚÑ _-]/g, '').trim().replace(/\s+/g, '_') || 'tutorial';
              var a = el('a', { href: URL.createObjectURL(new Blob([t], { type: 'application/json' })), download: nombre + '.tutorial.json' });
              document.body.appendChild(a); a.click(); a.remove();
              huella(JSON.parse(t)).then(function (h) { mostrarEstado('Archivo descargado. Huella para tus estudiantes: ' + h, 'ok'); });
            }
          }),
          el('button', {
            texto: '🔗 Copiar enlace', click: function () {
              var t = exportarTexto(); if (!t) return;
              if (!soportaEnlace) { mostrarEstado('Este navegador no puede crear enlaces; usa "Descargar archivo".', 'error'); return; }
              comprimir(t).then(function (bytes) {
                var datos = b64url(bytes);
                if (datos.length > LIM.enlace) { mostrarEstado('El tutorial es muy largo para un enlace; usa "Descargar archivo".', 'error'); return; }
                var url = location.origin + location.pathname + '#tut=' + datos;
                return huella(JSON.parse(t)).then(function (h) {
                  var listo = function () { mostrarEstado(['Enlace copiado (' + url.length + ' caracteres). Huella para tus estudiantes: ' + h], 'ok'); };
                  if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(url).then(listo, function () { window.prompt('Copia este enlace:', url); listo(); });
                  } else { window.prompt('Copia este enlace:', url); listo(); }
                });
              });
            }
          })
        ])
      ])
    ]);
    document.body.appendChild(modal);
  }

  /* ── Entradas en el menú de Tutoriales ─────────────────────────── */
  function agregarAlMenu() {
    var dd = document.getElementById('tut-dropdown');
    if (!dd || document.getElementById('tdoc-menu')) return;
    if (!modal) construirEditor(); // también inyecta el CSS de las opciones
    function opcion(icono, texto, accion) {
      var o = el('div', { clase: 'tut-option-docente', role: 'option' }, [
        el('span', { clase: 'tut-opt-icon', texto: icono }), document.createTextNode(texto)
      ]);
      o.addEventListener('click', function (e) {
        e.stopPropagation();
        dd.classList.remove('open');
        var tr = document.getElementById('tut-trigger');
        if (tr) { tr.classList.remove('open'); tr.setAttribute('aria-expanded', 'false'); }
        accion();
      });
      return o;
    }
    var grupo = el('div', { id: 'tdoc-menu' }, [
      el('div', { clase: 'tut-group-label', texto: '📚 Tutoriales de docentes' }),
      opcion('📂', 'Abrir tutorial de mi docente (archivo)…', abrirArchivo),
      opcion('✏️', 'Crear tutorial (docente)', abrirEditor)
    ]);
    dd.insertBefore(grupo, dd.firstChild);
  }

  window.TutorialDocente = {
    renderTexto: renderTexto,
    sanitizar: sanitizar,
    abrirTexto: abrirTexto,
    abrirEditor: abrirEditor,
    _aInterno: aInterno,
    _generarPasos: generarPasos,
    _validarBorrador: function (b) { borrador = b; return validarBorrador(); },
    _huella: huella
  };

  function iniciar() {
    agregarAlMenu();
    // Esperar a que exista el workspace (toolbox) antes de validar un enlace.
    var intentos = 0;
    (function esperar() {
      if (typeof TutorialSteps !== 'undefined' && ws() && ws().getToolbox && ws().getToolbox()) { abrirDesdeEnlace(); return; }
      if (++intentos < 100) setTimeout(esperar, 100);
    })();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
  window.addEventListener('hashchange', abrirDesdeEnlace);
})();
