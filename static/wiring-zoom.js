/**
 * wiring-zoom.js — Zoom & Pan para la vista de Conexiones eléctricas
 * ─────────────────────────────────────────────────────────────────────
 * v3 — Fix crítico:
 *   Todos los eventos de interacción (mouse + touch) se registran en
 *   #wiringContent (el contenedor fijo), NO en #wiringStage (que se
 *   transforma y escala). Así el área de hit-test siempre es el 100%
 *   del contenedor visible, independientemente del zoom o posición.
 *
 *   Problema v2:
 *   - Mouse: mitad de la imagen mostraba cursor flecha porque el stage
 *     escalado no cubría toda el área del content → mousedown caía en
 *     content sin listener → no arrastraba.
 *   - Touch: mismo problema. El dedo fuera de la imagen escalada
 *     caía en content → touchstart no se disparaba en stage → sin pan.
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

  /* ── Stage intermedio ──────────────────────────────────────── */
  var existingStage = document.getElementById('wiringStage');
  if (existingStage) existingStage.parentNode.removeChild(existingStage);

  var stage = document.createElement('div');
  stage.id = 'wiringStage';
  stage.style.cssText = [
    'position:absolute',
    'top:0', 'left:0',
    'transform-origin:0 0',
    /* El stage NO debe tener width/height 100% porque con scale
       su área real de hit-test se agranda/reduce y causa el bug.
       Usamos width/height:0 — solo es un contenedor de transform. */
    'width:0', 'height:0',
    'user-select:none',
    '-webkit-user-select:none'
  ].join(';');

  if (img.parentNode === content) content.removeChild(img);
  stage.appendChild(img);

  /* Content: captura todos los eventos, cursor correcto siempre */
  content.style.position       = 'relative';
  content.style.overflow       = 'hidden';
  content.style.alignItems     = 'flex-start';
  content.style.justifyContent = 'flex-start';
  content.style.padding        = '0';
  content.style.cursor         = 'grab';
  content.style.touchAction    = 'none';
  content.style.userSelect     = 'none';
  content.style.webkitUserSelect = 'none';
  content.appendChild(stage);

  /* Imagen: sin pointer-events para que no interfiera */
  img.style.cssText = [
    'display:block',
    'max-width:none',
    'height:auto',
    'pointer-events:none',
    'user-select:none',
    '-webkit-user-select:none',
    'transition:none',
    '-webkit-user-drag:none'
  ].join(';');

  /* ── Estado ────────────────────────────────────────────────── */
  var scale = 1, tx = 0, ty = 0;
  var mouseDragging = false, mouseStartX = 0, mouseStartY = 0;
  var prevSingle = null;
  var lastPinchDist = null, lastPinchMid = null;
  var rafPending = false;
  var _pinchEndTime = 0;   // timestamp del último pinch — bloquea doble-tap

  /* ── Helpers ───────────────────────────────────────────────── */

  function clampScale(s) {
    return Math.min(Math.max(s, MIN_SCALE), MAX_SCALE);
  }

  function applyTransform() {
    rafPending = false;
    stage.style.transform =
      'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')';
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

    if (cw === 0 || ch === 0) {
      if (window.ResizeObserver && !_roObserver) {
        _roObserver = new ResizeObserver(function () {
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

  img.addEventListener('load', centerImg);
  if (img.complete && img.naturalWidth) centerImg();

  /* Detectar cambio de src */
  var _srcObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (m.attributeName === 'src' && img.src) {
        if (img.complete && img.naturalWidth) centerImg();
      }
    });
  });
  _srcObserver.observe(img, { attributes: true, attributeFilter: ['src'] });

  /* ════════════════════════════════════════════════════════════
     RUEDA — en content
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
     MOUSE — listeners en content (no en stage)
  ════════════════════════════════════════════════════════════ */

  content.addEventListener('mousedown', function (e) {
    if (e.button !== 0) return;
    e.preventDefault();
    mouseDragging = true;
    mouseStartX   = e.clientX - tx;
    mouseStartY   = e.clientY - ty;
    content.style.cursor = 'grabbing';
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
    mouseDragging        = false;
    content.style.cursor = 'grab';
    setTransition(true);
  });

  content.addEventListener('dblclick', resetView);

  /* ════════════════════════════════════════════════════════════
     TOUCH — listeners en content (no en stage)
  ════════════════════════════════════════════════════════════ */

  content.addEventListener('touchstart', function (e) {
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

  content.addEventListener('touchmove', function (e) {
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

  content.addEventListener('touchend', function (e) {
    if (e.touches.length === 1) {
      prevSingle    = relToContent(e.touches[0].clientX, e.touches[0].clientY);
      lastPinchDist = null;
      lastPinchMid  = null;
    } else if (e.touches.length === 0) {
      /* Si veníamos de un pinch (2 dedos), registramos el momento */
      if (lastPinchDist !== null || e.changedTouches.length === 2) {
        _pinchEndTime = Date.now();
      }
      prevSingle    = null;
      lastPinchDist = null;
      lastPinchMid  = null;
      setTransition(true);
    }
  }, { passive: true });

  /* Doble tap → reset (bloqueado 400 ms después de un pinch) */
  var lastTap = 0;
  content.addEventListener('touchend', function (e) {
    if (e.changedTouches.length !== 1) return;
    /* Si acabamos de hacer pinch, ignorar estos touchend sueltos */
    if (Date.now() - _pinchEndTime < 400) return;
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
  ════════════════════════════════════════════════════════════ */
  window.wiringZoom = {
    center : centerImg,
    reset  : resetView,
    zoomIn : function () {
      setTransition(true);
      zoomAt(1 + BTN_STEP, content.clientWidth / 2, content.clientHeight / 2);
      scheduleApply();
    },
    zoomOut: function () {
      setTransition(true);
      zoomAt(1 / (1 + BTN_STEP), content.clientWidth / 2, content.clientHeight / 2);
      scheduleApply();
    },
    // Desconectar observers al salir de la vista para evitar
    // callbacks innecesarios mientras wiringContent no es visible.
    // Se reconectan automáticamente la próxima vez que se cargue una imagen.
    destroy: function () {
      if (_srcObserver) { _srcObserver.disconnect(); }
      if (_roObserver)  { _roObserver.disconnect(); _roObserver = null; }
    }
  };

  /* ── Init ─────────────────────────────────────────────────── */
  setTransition(false);
  applyTransform();
  //console.log('[wiring-zoom] OK ✓ v3');

})();