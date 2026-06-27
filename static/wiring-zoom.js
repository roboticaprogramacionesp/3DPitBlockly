/**
 * wiring-zoom.js — Zoom & Pan para la vista de Conexiones eléctricas
 * ─────────────────────────────────────────────────────────────────────
 * Soporta:
 *   • Rueda del ratón  → zoom centrado al cursor
 *   • Arrastre mouse   → pan
 *   • Pinch (2 dedos)  → zoom centrado entre los dos dedos + pan simultáneo
 *   • 1 dedo           → pan
 *   • Doble tap/clic   → resetear vista
 *   • Botones #btnZoomIn / #btnZoomOut / #btnZoomReset
 *
 * Sin dependencias externas. Se puede incluir en cualquier momento tras el DOM.
 */

(function () {

  /* ── Configuración ─────────────────────────────────────────── */
  var MIN_SCALE   = 0.1;
  var MAX_SCALE   = 10;
  var WHEEL_SPEED = 0.12;   // fracción por paso de rueda
  var BTN_STEP    = 0.25;   // fracción de zoom por botón

  /* ── Elementos DOM ─────────────────────────────────────────── */
  var content = document.getElementById('wiringContent');
  var img     = document.getElementById('wiringImg');

  if (!content || !img) {
    console.warn('[wiring-zoom] No se encontraron #wiringContent o #wiringImg');
    return;
  }

  /* ── Estado de transformación ──────────────────────────────── */
  var scale = 1;
  var tx    = 0;
  var ty    = 0;

  /* ── Estado mouse ──────────────────────────────────────────── */
  var mouseDragging = false;
  var mouseStartX   = 0;
  var mouseStartY   = 0;

  /* ── Estado touch ──────────────────────────────────────────── */
  var prevSingle    = null;   // última posición del dedo único (para pan)
  var lastPinchDist = null;   // distancia entre 2 dedos en el frame anterior
  var lastPinchMid  = null;   // punto medio entre 2 dedos en el frame anterior

  /* ── rAF ───────────────────────────────────────────────────── */
  var rafPending = false;

  /* ════════════════════════════════════════════════════════════
     HELPERS
  ════════════════════════════════════════════════════════════ */

  function clampScale(s) {
    return Math.min(Math.max(s, MIN_SCALE), MAX_SCALE);
  }

  function applyTransform() {
    rafPending = false;
    img.style.transformOrigin = '0 0';
    img.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')';
  }

  function scheduleApply() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(applyTransform);
    }
  }

  /** Transición CSS: true = suave (botones/reset), false = sin lag (gestos) */
  function setTransition(on) {
    img.style.transition = on ? 'transform 0.08s ease-out' : 'none';
  }

  /** Zoom anclado en (originX, originY) relativo al contenedor */
  function zoomAt(factor, originX, originY) {
    var newScale  = clampScale(scale * factor);
    var realFactor = newScale / scale;
    tx    = originX - (originX - tx) * realFactor;
    ty    = originY - (originY - ty) * realFactor;
    scale = newScale;
  }

  /** Coordenadas relativas al contenedor */
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
    scale = 1; tx = 0; ty = 0;
    setTransition(true);
    scheduleApply();
  }

  /* ════════════════════════════════════════════════════════════
     RUEDA DEL RATÓN
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

  content.addEventListener('mousedown', function (e) {
    if (e.button !== 0) return;
    e.preventDefault();
    mouseDragging = true;
    mouseStartX   = e.clientX - tx;
    mouseStartY   = e.clientY - ty;
    img.style.cursor = 'grabbing';
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
    mouseDragging    = false;
    img.style.cursor = 'grab';
    setTransition(true);
  });

  content.addEventListener('dblclick', resetView);
  img.addEventListener('load', resetView);
  img.style.cursor = 'grab';

  /* ════════════════════════════════════════════════════════════
     TOUCH
  ════════════════════════════════════════════════════════════ */

  content.addEventListener('touchstart', function (e) {
    e.preventDefault();
    setTransition(false);

    if (e.touches.length === 1) {
      // Iniciar pan con 1 dedo
      prevSingle    = relToContent(e.touches[0].clientX, e.touches[0].clientY);
      lastPinchDist = null;
      lastPinchMid  = null;

    } else if (e.touches.length === 2) {
      // Iniciar pinch con 2 dedos
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
      // ── Pinch zoom + pan simultáneo ──
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
      // ── Pan con 1 dedo ──
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
      // Quedó 1 dedo tras levantar el otro — reiniciar pan para evitar salto
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

  // Doble tap → reset
  var lastTap = 0;
  content.addEventListener('touchend', function (e) {
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

  /* ── Init ─────────────────────────────────────────────────── */
  setTransition(false);
  applyTransform();
  console.log('[wiring-zoom] OK ✓');

})();