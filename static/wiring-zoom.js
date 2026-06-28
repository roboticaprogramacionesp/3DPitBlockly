/**
 * wiring-zoom.js — Zoom & Pan para la vista de Conexiones eléctricas
 * ─────────────────────────────────────────────────────────────────────
 * v4 — Fix bug de reset al soltar pinch:
 *   Cuando el usuario suelta los 2 dedos al mismo tiempo, el navegador
 *   dispara dos eventos touchend seguidos (uno por dedo). El detector
 *   de doble-tap los interpretaba como dos taps rápidos → resetView().
 *
 *   Solución: bandera _wasMultiTouch que se prende en touchstart cuando
 *   hay 2+ dedos, y se consume en el PRIMER touchend (cuando pasamos
 *   de 2 dedos → 1 dedo), seteando _pinchEndTime ahí mismo. Así el
 *   guard de 400 ms bloquea también el segundo touchend de la ráfaga.
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
    'width:0', 'height:0',
    'user-select:none',
    '-webkit-user-select:none'
  ].join(';');

  if (img.parentNode === content) content.removeChild(img);
  stage.appendChild(img);

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
  var _pinchEndTime  = 0;   // timestamp del último pinch — bloquea doble-tap
  var _wasMultiTouch = false; // true entre touchstart multi-dedo y el primer touchend

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
     MOUSE — listeners en content
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
     TOUCH — listeners en content
  ════════════════════════════════════════════════════════════ */

  content.addEventListener('touchstart', function (e) {
    e.preventDefault();
    setTransition(false);

    // Marca si empezamos con multi-dedo → bloquea doble-tap al soltar
    _wasMultiTouch = e.touches.length >= 2;

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
    // FIX v4: si veníamos de multi-touch, bloquea el doble-tap aquí mismo.
    // Se ejecuta en el PRIMER touchend (cuando pasamos de 2 dedos → 1),
    // y como este listener corre antes que el de doble-tap (registrado
    // después), el guard de 400 ms ya está activo para el segundo evento.
    if (_wasMultiTouch) {
      _pinchEndTime   = Date.now();
      _wasMultiTouch  = false;
    }

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

  /* Doble tap → reset (bloqueado durante 400 ms tras un pinch) */
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
    destroy: function () {
      if (_srcObserver) { _srcObserver.disconnect(); }
      if (_roObserver)  { _roObserver.disconnect(); _roObserver = null; }
    }
  };

  /* ── Init ─────────────────────────────────────────────────── */
  setTransition(false);
  applyTransform();

})();