/**
 * wiring-zoom.js — Zoom & Pan para la vista de Conexiones eléctricas
 * ─────────────────────────────────────────────────────────────────────
 * Estrategia: se inserta un <div id="wiringStage"> dentro de
 * #wiringContent que ocupa el 100% y sobre él se aplica el transform.
 * Así el origen (0,0) es siempre la esquina superior-izquierda del
 * contenedor, independientemente del CSS flex/padding exterior.
 *
 * Soporta:
 *   • Rueda del ratón  → zoom centrado al cursor
 *   • Arrastre mouse   → pan
 *   • Pinch (2 dedos)  → zoom + pan simultáneo
 *   • 1 dedo           → pan
 *   • Doble tap/clic   → resetear vista
 *   • Botones #btnZoomIn / #btnZoomOut / #btnZoomReset
 *
 * Fix v2:
 *   • centerImg() se reintenta con ResizeObserver si el contenedor
 *     aún tiene tamaño 0 (vista oculta con display:none al cargar).
 *   • Se detecta cambio de src en wiringImg para re-centrar automáticamente.
 *   • Se expone window.wiringZoom.center() para llamarlo desde main.js
 *     al mostrar la vista (opcional pero recomendado).
 */

(function () {

  /* ── Configuración ─────────────────────────────────────────── */
  var MIN_SCALE   = 0.05;
  var MAX_SCALE   = 10;
  var WHEEL_SPEED = 0.12;
  var BTN_STEP    = 0.25;

  /* ── Elementos DOM ─────────────────────────────────────────── */
  var content = document.getElementById('wiringContent');
  var img     = document.getElementById('wiringImg');

  if (!content || !img) {
    console.warn('[wiring-zoom] No se encontraron #wiringContent o #wiringImg');
    return;
  }

  /* ── Crear stage intermedio ────────────────────────────────────
     El stage es un div que llena todo el contenedor.
     Sobre él aplicamos el transform, con origin 0 0 siempre fijo.
     La imagen vive dentro del stage sin ningún centrado flex.
  ─────────────────────────────────────────────────────────────── */

  /* Si ya existe (recarga en caliente) lo eliminamos */
  var existingStage = document.getElementById('wiringStage');
  if (existingStage) existingStage.parentNode.removeChild(existingStage);

  var stage = document.createElement('div');
  stage.id = 'wiringStage';
  stage.style.cssText = [
    'position:absolute',
    'top:0', 'left:0',
    'width:100%', 'height:100%',
    'transform-origin:0 0',
    'cursor:grab',
    'touch-action:none',
    'user-select:none',
    '-webkit-user-select:none'
  ].join(';');

  /* Mover la imagen al stage */
  if (img.parentNode === content) content.removeChild(img);
  stage.appendChild(img);

  /* El content debe ser position:relative y sin desbordamiento */
  content.style.position       = 'relative';
  content.style.overflow       = 'hidden';
  content.style.alignItems     = 'flex-start';
  content.style.justifyContent = 'flex-start';
  content.style.padding        = '0';
  content.appendChild(stage);

  /* La imagen no transforma por sí sola — se mueve con el stage */
  img.style.cssText = [
    'display:block',
    'max-width:none',
    'height:auto',
    'pointer-events:none',
    'transition:none'
  ].join(';');

  /* ── Estado ────────────────────────────────────────────────── */
  var scale = 1, tx = 0, ty = 0;
  var mouseDragging = false, mouseStartX = 0, mouseStartY = 0;
  var prevSingle = null;
  var lastPinchDist = null, lastPinchMid = null;
  var rafPending = false;

  /* ── Helpers ───────────────────────────────────────────────── */

  function clampScale(s) {
    return Math.min(Math.max(s, MIN_SCALE), MAX_SCALE);
  }

  function applyTransform() {
    rafPending = false;
    stage.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')';
  }

  function scheduleApply() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(applyTransform);
    }
  }

  function setTransition(on) {
    stage.style.transition = on ? 'transform 0.15s ease-out' : 'none';
  }

  function zoomAt(factor, originX, originY) {
    var newScale   = clampScale(scale * factor);
    var realFactor = newScale / scale;
    tx    = originX - (originX - tx) * realFactor;
    ty    = originY - (originY - ty) * realFactor;
    scale = newScale;
  }

  function relToContent(clientX, clientY) {
    var rect = content.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function pinchDist(a, b) {
    var dx = a.x - b.x, dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function pinchMid(a, b) {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }

  function resetView() {
    setTransition(true);
    centerImg();
  }

  /* ── Centrar imagen ────────────────────────────────────────── */
  var _roObserver = null;

  function centerImg() {
    var cw = content.clientWidth;
    var ch = content.clientHeight;
    var iw = img.naturalWidth  || img.clientWidth;
    var ih = img.naturalHeight || img.clientHeight;

    /* Si el contenedor aún no tiene tamaño (vista oculta),
       esperamos con ResizeObserver hasta que lo tenga. */
    if (cw === 0 || ch === 0) {
      if (window.ResizeObserver && !_roObserver) {
        _roObserver = new ResizeObserver(function (entries) {
          if (content.clientWidth > 0 && content.clientHeight > 0) {
            _roObserver.disconnect();
            _roObserver = null;
            centerImg();
          }
        });
        _roObserver.observe(content);
      }
      return;
    }

    if (!iw || !ih) {
      scale = 1; tx = 0; ty = 0;
    } else {
      scale = Math.min(cw / iw, ch / ih, 1);
      tx    = (cw - iw * scale) / 2;
      ty    = (ch - ih * scale) / 2;
    }
    setTransition(false);
    scheduleApply();
  }

  /* ── Escuchar carga de imagen (incluye cambios de src) ─────── */
  img.addEventListener('load', centerImg);
  if (img.complete && img.naturalWidth) centerImg();

  /* ── Detectar cambio de src desde main.js ──────────────────── */
  var _srcObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (m.attributeName === 'src' && img.src) {
        /* El evento load se encargará; pero si ya estaba cargada: */
        if (img.complete && img.naturalWidth) centerImg();
      }
    });
  });
  _srcObserver.observe(img, { attributes: true, attributeFilter: ['src'] });

  /* ════════════════════════════════════════════════════════════
     RUEDA
  ════════════════════════════════════════════════════════════ */

  content.addEventListener('wheel', function (e) {
    e.preventDefault();
    setTransition(false);
    var p      = relToContent(e.clientX, e.clientY);
    var factor = e.deltaY < 0 ? (1 + WHEEL_SPEED) : 1 / (1 + WHEEL_SPEED);
    zoomAt(factor, p.x, p.y);
    scheduleApply();
  }, { passive: false });

  /* ════════════════════════════════════════════════════════════
     MOUSE
  ════════════════════════════════════════════════════════════ */

  stage.addEventListener('mousedown', function (e) {
    if (e.button !== 0) return;
    e.preventDefault();
    mouseDragging = true;
    mouseStartX   = e.clientX - tx;
    mouseStartY   = e.clientY - ty;
    stage.style.cursor = 'grabbing';
    setTransition(false);
  });

  window.addEventListener('mousemove', function (e) {
    if (!mouseDragging) return;
    tx = e.clientX - mouseStartX;
    ty = e.clientY - mouseStartY;
    scheduleApply();
  });

  window.addEventListener('mouseup', function () {
    if (!mouseDragging) return;
    mouseDragging      = false;
    stage.style.cursor = 'grab';
    setTransition(true);
  });

  stage.addEventListener('dblclick', resetView);

  /* ════════════════════════════════════════════════════════════
     TOUCH
  ════════════════════════════════════════════════════════════ */

  stage.addEventListener('touchstart', function (e) {
    e.preventDefault();
    setTransition(false);

    if (e.touches.length === 1) {
      prevSingle    = relToContent(e.touches[0].clientX, e.touches[0].clientY);
      lastPinchDist = null;
      lastPinchMid  = null;
    } else if (e.touches.length === 2) {
      prevSingle = null;
      var t0 = relToContent(e.touches[0].clientX, e.touches[0].clientY);
      var t1 = relToContent(e.touches[1].clientX, e.touches[1].clientY);
      lastPinchDist = pinchDist(t0, t1);
      lastPinchMid  = pinchMid(t0, t1);
    }
  }, { passive: false });

  stage.addEventListener('touchmove', function (e) {
    e.preventDefault();

    if (e.touches.length === 2) {
      var t0   = relToContent(e.touches[0].clientX, e.touches[0].clientY);
      var t1   = relToContent(e.touches[1].clientX, e.touches[1].clientY);
      var dist = pinchDist(t0, t1);
      var mid  = pinchMid(t0, t1);

      if (lastPinchDist !== null && dist > 0) {
        zoomAt(dist / lastPinchDist, mid.x, mid.y);
      }
      if (lastPinchMid !== null) {
        tx += mid.x - lastPinchMid.x;
        ty += mid.y - lastPinchMid.y;
      }

      lastPinchDist = dist;
      lastPinchMid  = mid;
      prevSingle    = null;
      scheduleApply();

    } else if (e.touches.length === 1) {
      lastPinchDist = null;
      lastPinchMid  = null;
      var cur = relToContent(e.touches[0].clientX, e.touches[0].clientY);
      if (prevSingle !== null) {
        tx += cur.x - prevSingle.x;
        ty += cur.y - prevSingle.y;
        scheduleApply();
      }
      prevSingle = cur;
    }
  }, { passive: false });

  stage.addEventListener('touchend', function (e) {
    if (e.touches.length === 1) {
      prevSingle    = relToContent(e.touches[0].clientX, e.touches[0].clientY);
      lastPinchDist = null;
      lastPinchMid  = null;
    } else if (e.touches.length === 0) {
      prevSingle    = null;
      lastPinchDist = null;
      lastPinchMid  = null;
      setTransition(true);
    }
  }, { passive: true });

  /* Doble tap → reset */
  var lastTap = 0;
  stage.addEventListener('touchend', function (e) {
    if (e.changedTouches.length !== 1) return;
    var now = Date.now();
    if (now - lastTap < 300) resetView();
    lastTap = now;
  }, { passive: true });

  /* ════════════════════════════════════════════════════════════
     BOTONES
  ════════════════════════════════════════════════════════════ */

  function setupBtn(id, action) {
    var btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', action);
  }

  setupBtn('btnZoomIn', function () {
    setTransition(true);
    zoomAt(1 + BTN_STEP, content.clientWidth / 2, content.clientHeight / 2);
    scheduleApply();
  });

  setupBtn('btnZoomOut', function () {
    setTransition(true);
    zoomAt(1 / (1 + BTN_STEP), content.clientWidth / 2, content.clientHeight / 2);
    scheduleApply();
  });

  setupBtn('btnZoomReset', resetView);

  /* ════════════════════════════════════════════════════════════
     API PÚBLICA
     Llamar window.wiringZoom.center() desde main.js al mostrar
     la vista de conexiones garantiza el centrado correcto.
     Ejemplo:
       document.getElementById('btnWiring').addEventListener('click', function() {
         showView('viewWiring');
         if (window.wiringZoom) window.wiringZoom.center();
       });
  ════════════════════════════════════════════════════════════ */
  window.wiringZoom = {
    center : centerImg,
    reset  : resetView,
    zoomIn : function() {
      setTransition(true);
      zoomAt(1 + BTN_STEP, content.clientWidth / 2, content.clientHeight / 2);
      scheduleApply();
    },
    zoomOut: function() {
      setTransition(true);
      zoomAt(1 / (1 + BTN_STEP), content.clientWidth / 2, content.clientHeight / 2);
      scheduleApply();
    }
  };

  /* ── Init ─────────────────────────────────────────────────── */
  setTransition(false);
  applyTransform();
  console.log('[wiring-zoom] OK ✓ v2');

})();