/* ================================================================
   tutorial-extras.js — Portada, secciones, tarjetas por tipo de paso,
   conceptos con diagrama animado, retos, quiz, insignias y logros.
   ----------------------------------------------------------------
   Se engancha a TutorialSteps (tutorial-steps.js) en 4 puntos:
     cargar()          → TutorialExtras.aumentar(id, tut)
     _renderPaso()     → TutorialExtras.alRenderizar(ts, step)
     _isPasoCompleto() → TutorialExtras.completo(step)
     _mostrarFin()     → TutorialExtras.alTerminar(ts)
   El contenido viene de tutorial-extras-datos.js (oficial, confiable).
   Los tutoriales compartidos por docentes usan su "repaso" (ver
   tutorial-docente.js): ese texto NO es confiable y se escapa con
   htmlSeguro() antes de armar cualquier HTML.
================================================================ */
(function () {
  'use strict';

  var CLAVE_LOGROS = 'appblock-logros';
  var NIVELES = ['', 'Básico', 'Intermedio', 'Avanzado'];
  var SECCIONES = [
    ['aprende', '📖', 'Aprende'],
    ['conecta', '🔌', 'Conecta'],
    ['programa', '🧩', 'Programa'],
    ['prueba', '▶️', 'Prueba'],
    ['reta', '🏆', 'Reta']
  ];
  var TIPOS = {
    portada:   ['🚀', 'Tu misión'],
    concepto:  ['📡', 'Cómo funciona'],
    glosario:  ['📡', 'Cómo funciona'],
    info:      ['📖', 'Lee'],
    archivo:   ['📁', 'Archivo'],
    conexion:  ['🔌', 'Conexión'],
    bloque:    ['🧩', 'Bloques'],
    probar:    ['▶️', 'Prueba'],
    problemas: ['🛠️', 'Ayuda'],
    explica:   ['🔍', 'Por dentro'],
    retos:     ['🏆', 'Reta'],
    quiz:      ['❓', 'Quiz']
  };

  // Miniatura de la portada: solo el recuadro del circuito de los
  // diagramas (1200x800, ver scripts/conexiones/generar.js), completo.
  var RECORTE_CIRCUITO = '16 88 776 696';

  function base() {
    return (typeof TS_STATIC_URL !== 'undefined') ? TS_STATIC_URL : '/static/';
  }
  function datos(id) {
    return (typeof TUTORIAL_EXTRAS !== 'undefined' && TUTORIAL_EXTRAS[id]) || null;
  }

  /* Texto de un docente → HTML seguro: primero se escapa TODO y luego
     solo se agregan etiquetas fijas (**negrita**, *cursiva*, saltos). */
  function htmlSeguro(t) {
    return String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  /* Repaso de un tutorial compartido (ya validado por sanitizar) →
     mismo formato que TUTORIAL_EXTRAS, con todo el texto escapado. */
  function datosCompartido(tut) {
    var r = tut.repaso || {};
    return {
      compartido: true,
      n: r.nivel || 0,
      t: r.minutos || 0,
      dato: r.dato ? htmlSeguro(r.dato) : null,
      exp: r.explica ? htmlSeguro(r.explica) : null,
      usos: [],
      retos: (r.retos || []).map(function (x) { return [htmlSeguro(x.texto), x.pista ? htmlSeguro(x.pista) : '']; }),
      quiz: (r.quiz || []).map(function (q) {
        return [htmlSeguro(q.pregunta), q.opciones.map(htmlSeguro), q.correcta, q.porque ? htmlSeguro(q.porque) : ''];
      })
    };
  }

  /* ── Logros (por navegador; puede fallar en modo privado) ──────── */
  function leerLogros() {
    try { return JSON.parse(localStorage.getItem(CLAVE_LOGROS)) || {}; } catch (e) { return {}; }
  }
  function guardarLogro(id) {
    var l = leerLogros();
    if (!l[id]) l[id] = new Date().toISOString().slice(0, 10);
    try { localStorage.setItem(CLAVE_LOGROS, JSON.stringify(l)); } catch (e) { /* sin almacenamiento */ }
    return l;
  }
  function idsEsp32() {
    if (typeof TUTORIAL_EXTRAS === 'undefined' || typeof TUTORIALS === 'undefined') return [];
    return Object.keys(TUTORIAL_EXTRAS).filter(function (id) { return TUTORIALS[id]; });
  }
  function fechaBonita(iso) {
    var p = (iso || '').split('-');
    return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : iso;
  }

  /* ── Clasificación de pasos ───────────────────────────────────── */
  function tipoDe(step) {
    if (step.extra) return step.extra;
    if (typeof step.titulo === 'string' && step.titulo.indexOf('Conexión física') === 0) return 'conexion';
    if (step.waitForAction === 'run' || step.waitForAction === 'connect' || step.highlightElement === '#btnConnection') return 'probar';
    if (step.bloque || step.highlightCat || step.highlightFlyoutButton) return 'bloque';
    if (step.highlightElement === '#btnArchivo') return 'archivo';
    return 'info';
  }
  var SECCION_DE = {
    portada: 'aprende', concepto: 'aprende', glosario: 'aprende',
    conexion: 'conecta', bloque: 'programa', probar: 'prueba', problemas: 'prueba',
    explica: 'reta', retos: 'reta', quiz: 'reta'
  };
  function secciones(steps) {
    var actual = 'aprende';
    return steps.map(function (s) {
      var sec = SECCION_DE[tipoDe(s)];
      if (sec) actual = sec;
      return actual;
    });
  }

  /* ── Diagrama animado (SVG) ───────────────────────────────────── */
  function diagrama(c) {
    var Y = 62, R = 25;
    var pos = {};
    c.nodos.forEach(function (n) { pos[n[0]] = n[3]; });
    var s = '<svg class="tx-diagrama" viewBox="0 0 360 132" role="img" aria-label="' + c.titulo.replace(/"/g, '') + '">';
    c.enlaces.forEach(function (e, i) {
      var x1 = pos[e[0]], x2 = pos[e[1]], texto = e[2], doble = e[3], tachado = e[4], arco = e[5];
      var d, tx, ty;
      if (arco) {
        var mx = (x1 + x2) / 2;
        d = 'M' + x1 + ',' + (Y - R) + ' Q' + mx + ',' + (Y - 82) + ' ' + x2 + ',' + (Y - R);
        tx = mx; ty = 25;
      } else {
        var a = x1 + (x2 > x1 ? R + 4 : -R - 4), b = x2 + (x2 > x1 ? -R - 4 : R + 4);
        d = 'M' + a + ',' + Y + ' L' + b + ',' + Y;
        tx = (a + b) / 2; ty = Y - 8;
      }
      if (tachado) {
        s += '<path d="' + d + '" class="tx-enlace tx-enlace-off"/>';
        s += '<text x="' + ((x1 + x2) / 2) + '" y="' + (Y + 5) + '" class="tx-tache">✕</text>';
        return;
      }
      s += '<path d="' + d + '" class="tx-enlace"/>';
      if (texto) s += '<text x="' + tx + '" y="' + ty + '" class="tx-enlace-txt">' + texto + '</text>';
      var ini = (i * 0.7).toFixed(1);
      // Ocultos hasta que empieza su animación (si no, aparecen en 0,0).
      s += '<circle r="4.5" class="tx-paquete" visibility="hidden"><set attributeName="visibility" to="visible" begin="' + ini + 's"/>' +
        '<animateMotion dur="2.2s" begin="' + ini + 's" repeatCount="indefinite" path="' + d + '"/></circle>';
      if (doble) {
        var ini2 = (+ini + 1.1).toFixed(1);
        s += '<circle r="4.5" class="tx-paquete tx-paquete-2" visibility="hidden"><set attributeName="visibility" to="visible" begin="' + ini2 + 's"/>' +
          '<animateMotion dur="2.2s" begin="' + ini2 + 's" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" path="' + d + '"/></circle>';
      }
    });
    c.nodos.forEach(function (n) {
      var x = n[3];
      s += '<g class="tx-nodo"><circle cx="' + x + '" cy="' + Y + '" r="' + R + '"/>' +
        '<text x="' + x + '" y="' + (Y + 8) + '" class="tx-nodo-emoji">' + n[1] + '</text>' +
        '<text x="' + x + '" y="' + (Y + R + 17) + '" class="tx-nodo-txt">' + n[2] + '</text></g>';
    });
    return s + '</svg>';
  }

  /* ── Construcción de los pasos aumentados ─────────────────────── */
  function aumentar(id, tut) {
    if (!tut) return tut;
    var d = tut.compartido ? datosCompartido(tut) : datos(id);
    if (!d) return tut;
    var con = d.con && typeof TUTORIAL_CONCEPTOS !== 'undefined' ? TUTORIAL_CONCEPTOS[d.con] : null;
    var orig = tut.steps.slice();
    var pasos = [{ extra: 'portada', titulo: '¡Comencemos!', _id: id }];
    pasos.push(orig[0]);
    if (con) {
      pasos.push({ extra: 'concepto', titulo: con.titulo, _con: con });
      pasos.push({ extra: 'glosario', titulo: 'Palabras clave', _con: con });
    }
    // El "¿Sabías que…?" va en el último paso de Ejecutar (premio al probar).
    var iRun = -1;
    orig.forEach(function (s, i) { if (s.waitForAction === 'run') iRun = i; });
    for (var i = 1; i < orig.length; i++) {
      if (i === iRun && d.dato) {
        var copia = {};
        for (var k in orig[i]) copia[k] = orig[i][k];
        copia._dato = d.dato;
        pasos.push(copia);
      } else {
        pasos.push(orig[i]);
      }
    }
    if (con) pasos.push({ extra: 'problemas', titulo: 'Si algo no funcionó', _con: con });
    if (d.exp || (iRun < 0 && d.dato)) pasos.push({ extra: 'explica', titulo: d.exp ? '¿Qué está pasando?' : '¿Sabías que…?', _d: d, _dato: iRun < 0 ? d.dato : null });
    if (d.retos && d.retos.length) pasos.push({ extra: 'retos', titulo: 'Retos para ti', _d: d });
    if (d.quiz && d.quiz.length) pasos.push({ extra: 'quiz', titulo: 'Demuestra lo que aprendiste', _d: d });
    var nuevo = {};
    for (var k2 in tut) nuevo[k2] = tut[k2];
    nuevo.steps = pasos;
    nuevo._id = id;
    nuevo._extras = d;
    return nuevo;
  }

  /* ── HTML de cada tipo de paso extra ──────────────────────────── */
  // Las estrellas vacías se dibujan como ★ tenue: con la fuente del
  // panel (monoespaciada) el ☆ se ve igual que una llena.
  function estrellas(n) {
    var s = '';
    for (var i = 1; i <= 3; i++) s += i <= n ? '★' : '<span class="tx-star-off">★</span>';
    return s;
  }

  function htmlPortada(ts, step) {
    // (Las secciones Aprende › … › Reta ya se ven en la barra de arriba.)
    var tut = ts.tutorial, d = tut._extras, id = step._id;
    var logro = leerLogros()[id];
    var h = '<div class="tx-portada">' +
      '<div class="tx-hero"><span class="tx-hero-icon">' + tut.icon + '</span><div>' +
      '<div class="tx-hero-title"></div>' +
      '<div class="tx-meta">' +
      (d.n ? '<span class="tx-nivel tx-nivel-' + d.n + '">' + estrellas(d.n) + ' ' + NIVELES[d.n] + '</span>' : '') +
      (d.t ? '<span>⏱️ ' + d.t + ' min</span>' : '') +
      '<span>👣 ' + tut.steps.length + ' pasos</span></div></div></div>';
    if (d.compartido) {
      var tiene = [];
      if (d.retos.length) tiene.push('🏆 ' + d.retos.length + (d.retos.length > 1 ? ' retos' : ' reto'));
      if (d.quiz.length) tiene.push('❓ quiz de ' + d.quiz.length + (d.quiz.length > 1 ? ' preguntas' : ' pregunta'));
      h += '<div class="tx-caja tx-docente">👩‍🏫 Tutorial creado por tu docente · huella <b>' + htmlSeguro(tut.huella || '') + '</b>' +
        (tiene.length ? '<br>Al final: ' + tiene.join(' y ') + '.' : '') + '</div></div>';
      return h;
    }
    if (logro) h += '<div class="tx-caja tx-ya">🏅 Ya ganaste esta insignia el ' + fechaBonita(logro) + '. ¡Puedes repetirlo cuando quieras!</div>';
    if (tut.diagram && tut.diagram.indexOf('solo_placa') < 0) {
      h += '<button type="button" class="tx-mini" data-tx="diagrama" title="Ver las conexiones en grande">' +
        '<svg viewBox="' + RECORTE_CIRCUITO + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Diagrama de conexiones">' +
        '<image href="' + base() + tut.diagram + '" x="0" y="0" width="1200" height="800"/></svg><span>🔍 Ver conexiones</span></button>';
    }
    h += '</div>';
    return h;
  }

  function htmlConcepto(c) {
    return '<div class="tx-caja tx-concepto">' + diagrama(c) + '</div><p class="tx-p">' + c.analogia + '</p>';
  }
  function htmlGlosario(c) {
    return '<dl class="tx-glosario">' + c.glosario.map(function (g) {
      return '<dt>' + g[0] + '</dt><dd>' + g[1] + '</dd>';
    }).join('') + '</dl>';
  }
  function htmlProblemas(c) {
    return '<p class="tx-p">Si tu programa no hizo lo esperado, revisa esto:</p>' +
      c.problemas.map(function (p) {
        return '<div class="tx-caja tx-problema"><b>❗ ' + p[0] + '</b><br>' + p[1] + '</div>';
      }).join('');
  }
  function htmlExplica(step) {
    var d = step._d;
    var h = d.exp ? '<p class="tx-p">' + d.exp + '</p>' : '';
    if (step._dato) h += '<div class="tx-caja tx-dato"><b>💡 ¿Sabías que…?</b><br>' + step._dato + '</div>';
    return h;
  }
  var DIFICULTAD = ['fácil', 'medio', 'difícil'];
  function htmlRetos(step) {
    return '<p class="tx-p">¿Te animas a más? Modifica tu programa para lograr estos retos:</p>' +
      step._d.retos.map(function (r, i) {
        return '<div class="tx-reto"><div class="tx-reto-tit"><span class="tx-reto-num">' + (i + 1) + '</span>' +
          '<span class="tx-reto-dif tx-dif-' + i + '">' + (DIFICULTAD[i] || '') + '</span></div>' +
          '<div>' + r[0] + '</div>' +
          (r[1] ? '<details class="tx-pista"><summary>💡 Ver pista</summary>' + r[1] + '</details>' : '') +
          '</div>';
      }).join('');
  }
  function htmlQuiz(step) {
    return '<p class="tx-p">Responde bien para ganar tu insignia 🏅</p>' +
      step._d.quiz.map(function (q, i) {
        return '<div class="tx-pregunta" data-q="' + i + '">' +
          (DIFICULTAD[i] ? '<span class="tx-reto-dif tx-dif-' + i + '">' + DIFICULTAD[i] + '</span>' : '') +
          '<div class="tx-preg-txt">' + (i + 1) + '. ' + q[0] + '</div>' +
          q[1].map(function (o, j) {
            return '<button type="button" class="tx-opcion" data-q="' + i + '" data-o="' + j + '">' + o + '</button>';
          }).join('') +
          '<div class="tx-retro" aria-live="polite"></div></div>';
      }).join('');
  }

  /* ── Estado del quiz ──────────────────────────────────────────── */
  var quiz = { tut: null, ok: [] };
  function quizCompleto(step) {
    if (quiz.tut !== step._d) return false;
    return step._d.quiz.every(function (q, i) { return quiz.ok[i]; });
  }

  function enlazarQuiz(ts, step, desc) {
    if (quiz.tut !== step._d) quiz = { tut: step._d, ok: [] };
    // Volver a pintar lo ya contestado
    step._d.quiz.forEach(function (q, i) {
      if (quiz.ok[i]) marcar(desc, i, q[2], q, true);
    });
    desc.querySelectorAll('.tx-opcion').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = +btn.getAttribute('data-q'), j = +btn.getAttribute('data-o');
        var q = step._d.quiz[i];
        if (quiz.ok[i]) return;
        if (j === q[2]) {
          quiz.ok[i] = true;
          marcar(desc, i, j, q, true);
        } else {
          btn.classList.add('tx-mal');
          var r = desc.querySelector('.tx-pregunta[data-q="' + i + '"] .tx-retro');
          r.className = 'tx-retro tx-retro-mal';
          r.textContent = '✗ Casi… inténtalo de nuevo.';
        }
        actualizarSiguiente(ts, step);
        ts._actualizarCheck();
      });
    });
    actualizarSiguiente(ts, step);
  }
  function marcar(desc, i, j, q, bien) {
    var caja = desc.querySelector('.tx-pregunta[data-q="' + i + '"]');
    if (!caja) return;
    caja.querySelectorAll('.tx-opcion').forEach(function (b) {
      b.disabled = true;
      if (+b.getAttribute('data-o') === j) b.classList.add('tx-bien');
    });
    var r = caja.querySelector('.tx-retro');
    r.className = 'tx-retro tx-retro-bien';
    r.innerHTML = '✓ ¡Correcto! ' + q[3];
  }
  function actualizarSiguiente(ts, step) {
    var btn = document.getElementById('ts-btn-next');
    if (!btn) return;
    var listo = quizCompleto(step);
    btn.disabled = !listo;
    btn.title = listo ? '' : 'Responde bien todas las preguntas para terminar';
  }

  /* ── Barra de secciones ───────────────────────────────────────── */
  function pintarSecciones(ts) {
    var cont = document.getElementById('tx-secciones');
    if (!cont) {
      var txt = document.getElementById('ts-progress-txt');
      if (!txt) return;
      cont = document.createElement('div');
      cont.id = 'tx-secciones';
      cont.className = 'tx-secciones';
      txt.parentNode.insertBefore(cont, txt.nextSibling);
    }
    var steps = ts.tutorial.steps, secs = secciones(steps), actual = secs[ts.paso];
    var orden = SECCIONES.map(function (s) { return s[0]; });
    var presentes = SECCIONES.filter(function (s) { return secs.indexOf(s[0]) >= 0; });
    cont.textContent = '';
    presentes.forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button';
      var estado = s[0] === actual ? 'tx-sec-actual' : (orden.indexOf(s[0]) < orden.indexOf(actual) ? 'tx-sec-hecha' : '');
      b.className = 'tx-sec ' + estado;
      b.textContent = s[1] + ' ' + s[2];
      b.title = 'Ir a: ' + s[2];
      b.addEventListener('click', function () {
        var idx = secs.indexOf(s[0]);
        if (idx < 0 || idx === ts.paso) return;
        var dir = idx > ts.paso ? 'next' : 'prev';
        ts.paso = idx;
        ts._renderPasoConTransicion(dir);
      });
      cont.appendChild(b);
    });
  }

  /* ── Engancho principal: después de pintar cada paso ─────────── */
  function alRenderizar(ts, step) {
    var tipo = tipoDe(step);
    document.querySelectorAll('#ts-panel .tx-confeti').forEach(function (c) { c.remove(); });
    var body = document.getElementById('ts-body');
    if (body) body.setAttribute('data-tx-tipo', tipo);
    var header = document.getElementById('ts-step-header');
    if (header) {
      var et = document.getElementById('tx-etiqueta');
      if (!et) {
        et = document.createElement('div');
        et.id = 'tx-etiqueta';
        header.parentNode.insertBefore(et, header);
      }
      var t = TIPOS[tipo] || TIPOS.info;
      et.className = 'tx-etiqueta tx-et-' + tipo;
      et.textContent = t[0] + ' ' + t[1];
    }
    pintarSecciones(ts);

    var btnNext = document.getElementById('ts-btn-next');
    if (btnNext) { btnNext.disabled = false; btnNext.title = ''; }

    var desc = document.getElementById('ts-step-desc');
    if (!desc) return;
    if (!step.extra) {
      if (step._dato) desc.insertAdjacentHTML('beforeend', '<div class="tx-caja tx-dato"><b>💡 ¿Sabías que…?</b><br>' + step._dato + '</div>');
      return;
    }
    var html = '';
    if (step.extra === 'portada') html = htmlPortada(ts, step);
    else if (step.extra === 'concepto') html = htmlConcepto(step._con);
    else if (step.extra === 'glosario') html = htmlGlosario(step._con);
    else if (step.extra === 'problemas') html = htmlProblemas(step._con);
    else if (step.extra === 'explica') html = htmlExplica(step);
    else if (step.extra === 'retos') html = htmlRetos(step);
    else if (step.extra === 'quiz') html = htmlQuiz(step);
    desc.innerHTML = html;

    if (step.extra === 'portada') {
      var tituloEl = desc.querySelector('.tx-hero-title');
      if (tituloEl) tituloEl.textContent = ts.tutorial.title;
      var mini = desc.querySelector('[data-tx="diagrama"]');
      if (mini) mini.addEventListener('click', function () {
        var b = document.getElementById('btnWiring');
        if (b) b.click();
      });
    }
    if (step.extra === 'quiz') enlazarQuiz(ts, step, desc);
  }

  function completo(step) {
    if (step.extra === 'quiz') return quizCompleto(step);
    return true;
  }

  /* ── Fin: insignia, confeti y aplicaciones reales ─────────────── */
  function confeti() {
    var panel = document.getElementById('ts-panel');
    if (!panel || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    var capa = document.createElement('div');
    capa.className = 'tx-confeti';
    var colores = ['#3454d1', '#00e676', '#ffb300', '#ff5252', '#b388ff', '#40c4ff'];
    for (var i = 0; i < 70; i++) {
      var p = document.createElement('i');
      p.style.left = (Math.random() * 100) + '%';
      p.style.background = colores[i % colores.length];
      p.style.animationDelay = (Math.random() * 0.6) + 's';
      p.style.animationDuration = (1.6 + Math.random() * 1.4) + 's';
      p.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
      capa.appendChild(p);
    }
    panel.appendChild(capa);
    setTimeout(function () { if (capa.parentNode) capa.parentNode.removeChild(capa); }, 3600);
  }

  function alTerminar(ts) {
    var tut = ts.tutorial;
    confeti();
    if (!tut || !tut._extras) return;
    if (tut._extras.compartido) { finCompartido(tut); return; }
    var logros = guardarLogro(tut._id);
    marcarMenu();
    var total = idsEsp32().length;
    var ganadas = idsEsp32().filter(function (id) { return logros[id]; }).length;
    var body = document.getElementById('ts-body');
    body.setAttribute('data-tx-tipo', 'fin');
    var et = document.getElementById('tx-etiqueta');
    if (et) et.remove();
    body.innerHTML =
      '<div class="ts-fin tx-fin">' +
      '  <div class="tx-medalla"><span>' + tut.icon + '</span></div>' +
      '  <h3>¡Insignia desbloqueada!</h3>' +
      '  <p>Completaste <strong id="ts-fin-titulo"></strong></p>' +
      '  <div class="tx-cuenta"><div class="tx-cuenta-barra"><div style="width:' + Math.round(ganadas * 100 / Math.max(total, 1)) + '%"></div></div>' +
      '  🏅 Llevas <b>' + ganadas + '</b> de <b>' + total + '</b> insignias</div>' +
      '  <div class="tx-sub">🌍 Esto se usa en la vida real:</div>' +
      '  <ul class="tx-lista tx-usos">' + tut._extras.usos.map(function (u) { return '<li>' + u + '</li>'; }).join('') + '</ul>' +
      '  <div class="tx-fin-btns">' +
      '    <button class="ts-btn ts-btn-sec" onclick="TutorialSteps._reiniciar()">↺ Repetir</button>' +
      '    <button class="ts-btn ts-btn-primary" onclick="TutorialExtras.abrirLogros()">🏆 Mis logros</button>' +
      '  </div>' +
      '</div>';
    document.getElementById('ts-fin-titulo').textContent = tut.title;
    var cont = document.getElementById('tx-secciones');
    if (cont) cont.querySelectorAll('.tx-sec').forEach(function (b) { b.className = 'tx-sec tx-sec-hecha'; });
  }

  function finCompartido(tut) {
    var body = document.getElementById('ts-body');
    body.setAttribute('data-tx-tipo', 'fin');
    var et = document.getElementById('tx-etiqueta');
    if (et) et.remove();
    var d = tut._extras;
    body.innerHTML =
      '<div class="ts-fin tx-fin">' +
      '  <div class="tx-medalla"><span></span></div>' +
      '  <h3>' + (d.quiz.length ? '¡Insignia desbloqueada!' : '¡Tutorial completado!') + '</h3>' +
      '  <p>Terminaste <strong id="ts-fin-titulo"></strong>, el tutorial de tu docente.</p>' +
      (d.quiz.length ? '  <div class="tx-cuenta">✅ Respondiste bien las ' + d.quiz.length + ' preguntas del quiz.</div>' : '') +
      '  <div class="tx-fin-btns">' +
      '    <button class="ts-btn ts-btn-sec" onclick="TutorialSteps._reiniciar()">↺ Repetir</button>' +
      '  </div>' +
      '</div>';
    body.querySelector('.tx-medalla span').textContent = tut.icon;
    document.getElementById('ts-fin-titulo').textContent = tut.title;
    var cont = document.getElementById('tx-secciones');
    if (cont) cont.querySelectorAll('.tx-sec').forEach(function (b) { b.className = 'tx-sec tx-sec-hecha'; });
  }

  /* ── Mis logros (modal) y marcas en el menú ───────────────────── */
  function abrirLogros() {
    var viejo = document.getElementById('tx-logros');
    if (viejo) viejo.remove();
    var logros = leerLogros(), ids = idsEsp32();
    var ganadas = ids.filter(function (id) { return logros[id]; }).length;
    var fondo = document.createElement('div');
    fondo.id = 'tx-logros';
    fondo.className = 'tx-logros-fondo';
    var caja = document.createElement('div');
    caja.className = 'tx-logros';
    caja.setAttribute('role', 'dialog');
    caja.setAttribute('aria-label', 'Mis logros');
    var cab = document.createElement('div');
    cab.className = 'tx-logros-cab';
    cab.innerHTML = '<div><h3>🏆 Mis logros</h3><p>' + ganadas + ' de ' + ids.length + ' insignias · se guardan en este navegador</p></div>';
    var cerrar = document.createElement('button');
    cerrar.className = 'tx-logros-x';
    cerrar.textContent = '✕';
    cerrar.title = 'Cerrar';
    cab.appendChild(cerrar);
    var barra = document.createElement('div');
    barra.className = 'tx-cuenta-barra';
    barra.innerHTML = '<div style="width:' + Math.round(ganadas * 100 / Math.max(ids.length, 1)) + '%"></div>';
    var grid = document.createElement('div');
    grid.className = 'tx-logros-grid';
    ids.forEach(function (id) {
      var t = TUTORIALS[id], d = TUTORIAL_EXTRAS[id];
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'tx-insignia' + (logros[id] ? ' tx-ganada' : '');
      b.title = logros[id] ? 'Ganada el ' + fechaBonita(logros[id]) : 'Haz este tutorial para ganarla';
      var ic = document.createElement('span');
      ic.className = 'tx-ins-icon';
      ic.textContent = t.icon;
      var nom = document.createElement('span');
      nom.className = 'tx-ins-nom';
      nom.textContent = t.title;
      var niv = document.createElement('span');
      niv.className = 'tx-ins-niv';
      if (logros[id]) niv.textContent = '🏅 ' + fechaBonita(logros[id]);
      else niv.innerHTML = estrellas(d.n); // solo números del contenido oficial
      b.appendChild(ic); b.appendChild(nom); b.appendChild(niv);
      b.addEventListener('click', function () {
        fondo.remove();
        var sel = document.getElementById('tutorialSelect');
        if (sel) sel.value = id;
        TutorialSteps.cargar(id);
      });
      grid.appendChild(b);
    });
    caja.appendChild(cab);
    caja.appendChild(barra);
    caja.appendChild(grid);
    fondo.appendChild(caja);
    function quitar() { fondo.remove(); document.removeEventListener('keydown', esc); }
    function esc(e) { if (e.key === 'Escape') quitar(); }
    cerrar.addEventListener('click', quitar);
    fondo.addEventListener('click', function (e) { if (e.target === fondo) quitar(); });
    document.addEventListener('keydown', esc);
    document.body.appendChild(fondo);
    cerrar.focus();
  }

  function marcarMenu() {
    var logros = leerLogros();
    document.querySelectorAll('#tut-dropdown .tut-option[data-value]').forEach(function (o) {
      o.classList.toggle('tx-hecho', !!logros[o.getAttribute('data-value')]);
    });
    var cuenta = document.getElementById('tx-menu-cuenta');
    if (cuenta) {
      var ids = idsEsp32();
      cuenta.textContent = ids.filter(function (id) { return logros[id]; }).length + '/' + ids.length;
    }
  }

  function agregarAlMenu() {
    var dd = document.getElementById('tut-dropdown');
    if (!dd || document.getElementById('tx-menu-logros')) return;
    var o = document.createElement('div');
    o.id = 'tx-menu-logros';
    o.className = 'tut-option-docente tx-menu-logros';
    o.setAttribute('role', 'option');
    o.innerHTML = '<span class="tut-opt-icon">🏆</span>Mis logros <span class="tx-menu-cuenta" id="tx-menu-cuenta"></span>';
    o.addEventListener('click', function (e) {
      e.stopPropagation();
      dd.classList.remove('open');
      var tr = document.getElementById('tut-trigger');
      if (tr) { tr.classList.remove('open'); tr.setAttribute('aria-expanded', 'false'); }
      abrirLogros();
    });
    dd.insertBefore(o, dd.firstChild);
    marcarMenu();
  }

  window.TutorialExtras = {
    aumentar: aumentar,
    alRenderizar: alRenderizar,
    completo: completo,
    alTerminar: alTerminar,
    abrirLogros: abrirLogros,
    _diagrama: diagrama,
    _htmlSeguro: htmlSeguro,
    _secciones: secciones,
    _tipoDe: tipoDe
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(agregarAlMenu, 0); });
  } else {
    setTimeout(agregarAlMenu, 0);
  }
})();
