/* ══════════════════════════════════════════════════════════════
   game-engine.js  —  Motor de canvas 2D para 3DPit
   Extraído de index.html para mantenerlo separado y versionable.
   Cargar ANTES de animation.js y main.js.
   
   SISTEMA DE COORDENADAS:
   - Origen (0,0): esquina superior izquierda del canvas
   - Sprite (x,y): esquina superior izquierda del sprite, no el centro
   - Ángulo (en grados): 0°=derecha, 90°=abajo, 180°=izquierda, 270°=arriba
   - Canvas: (0,0) arriba-izq, (width,height) abajo-derecho
══════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════
   GAMEENGINE — motor interno del canvas
══════════════════════════════════════════ */
window.GameEngine = (function () {

  /* ── Canvas lazy ── */
  var _canvas = null;
  var _ctx = null;
  function _getCtx() {
    if (_ctx) return _ctx;
    _canvas = document.getElementById('gameCanvas');
    if (!_canvas) { console.error('[GameEngine] canvas no encontrado'); return null; }
    _ctx = _canvas.getContext('2d', { willReadFrequently: true });
    return _ctx;
  }

  /* ── Estado ── */
  var _bgColor = '#1a1a2e';
  var _bgImage = null;          /* Image() para el fondo */
  var _running = false;

  /* ── LEDs simulados (privado) ── */
  var _leds = {};
  function _drawLeds() {
    if (!_ctx) return;
    Object.keys(_leds).forEach(function (name) {
      var led = _leds[name];
      var x = led.x, y = led.y;
      _ctx.beginPath();
      _ctx.arc(x, y, 10, 0, Math.PI * 2);
      _ctx.fillStyle = led.on ? '#ff2222' : '#440000';
      _ctx.fill();
      _ctx.strokeStyle = '#ffffff44';
      _ctx.lineWidth = 1;
      _ctx.stroke();
      if (led.on) {
        _ctx.beginPath();
        _ctx.arc(x, y, 14, 0, Math.PI * 2);
        _ctx.fillStyle = 'rgba(255,50,50,0.18)';
        _ctx.fill();
      }
      _ctx.fillStyle = '#ffffff';
      _ctx.font = '9px monospace';
      _ctx.textAlign = 'center';
      _ctx.fillText(name, x, y + 22);
    });
  }

  /* ── Sprite ── */
  var _sprite = {
    x: 240, y: 180, w: 48, h: 48,
    color: '#00ff88',
    img: null,                  /* Image() cargada */
    imgReady: false,
    flipX: false,               /* espejo horizontal */
    angle: 0                    /* dirección en grados (0 = derecha) */
  };

  /* ── Caché de imágenes: { 'car.png': Image } ── */
  var _imageCache = {};

  /* ── Carga una imagen y llama callback cuando esté lista ── */
  function _loadImage(filename, callback) {
    if (_imageCache[filename]) {
      callback(_imageCache[filename]);
      return;
    }
    var img = new Image();
    img.onload = function () { _imageCache[filename] = img; callback(img); };
    img.onerror = function () {
      console.warn('[GameEngine] No se pudo cargar:', filename);
      callback(null);
    };
    /* Ruta: /static/img/<filename> */
    img.src = 'static/img/' + filename;
  }

  /* ── Helpers color ── */
  function _hexToRgb(hex) {
    if (!hex || typeof hex !== 'string') return null;
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    var n = parseInt(hex, 16);
    return isNaN(n) ? null : { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function _rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(function (v) {
      return ('0' + Math.max(0, Math.min(255, v)).toString(16)).slice(-2);
    }).join('');
  }
  /* Convierte [r,g,b] o hex string a hex string '#rrggbb' */
  function _color(v) {
    if (Array.isArray(v)) return _rgbToHex(v[0] || 0, v[1] || 0, v[2] || 0);
    return String(v || '#000000');
  }

  /* ── Rectángulo redondeado compatible ── */
  function _fillRoundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  /* ── Lápiz ── */
  var _pen = { down: false, color: '#ff0000', size: 3, lastX: null, lastY: null };

  /* ── Teclado ── */
  var _keys = {};
  /* Mapa de teclas de juego → carácter serial que se envía al ESP32 */
  var _keySerialMap = {
    'ArrowUp': 'w', 'ArrowDown': 's', 'ArrowLeft': 'a', 'ArrowRight': 'd',
    'w': 'w', 'a': 'a', 's': 's', 'd': 'd',
    ' ': ' ', 'Enter': '\r', 'z': 'z', 'x': 'x'
  };
  document.addEventListener('keydown', function (e) {
    _keys[e.key] = true;
    /* Solo bloquear scroll si el foco NO está en un campo de texto/editor */
    if (_running && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].indexOf(e.key) >= 0) {
      var tag = document.activeElement && document.activeElement.tagName;
      var isInput = tag === 'INPUT' || tag === 'TEXTAREA' ||
        (document.activeElement && document.activeElement.isContentEditable);
      if (!isInput) e.preventDefault();
    }
    /* Reenviar tecla al ESP32 por serial cuando el juego está corriendo */
    if (_running && _keySerialMap.hasOwnProperty(e.key)) {
      var ch = _keySerialMap[e.key];
      try {
        if (typeof sendSerial === 'function') {
          sendSerial(ch);
        } else if (typeof serialWriter !== 'undefined' && serialWriter) {
          serialWriter.write(new TextEncoder().encode(ch));
        }
      } catch (err) { /* sin conexión serial — ignorar silenciosamente */ }
      document.dispatchEvent(new CustomEvent('game:keyserial', { detail: { char: ch, key: e.key } }));
    }
  }, { passive: false });
  document.addEventListener('keyup', function (e) {
    _keys[e.key] = false;
    if (_running && _keySerialMap.hasOwnProperty(e.key)) {
      try {
        if (typeof sendSerial === 'function') {
          sendSerial('\x00');
        } else if (typeof serialWriter !== 'undefined' && serialWriter) {
          serialWriter.write(new TextEncoder().encode('\x00'));
        }
      } catch (err) { }
    }
  }, { passive: true });

  /* ── Ratón ── */
  var _mouse = { x: 0, y: 0, down: false, clicked: false };
  document.addEventListener('mousedown', function (e) {
    var canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    var rect = canvas.getBoundingClientRect();
    _mouse.x = e.clientX - rect.left;
    _mouse.y = e.clientY - rect.top;
    _mouse.down = true;
    _mouse.clicked = true;
  }, { passive: true });
  document.addEventListener('mouseup', function (e) { _mouse.down = false; }, { passive: true });
  document.addEventListener('mousemove', function (e) {
    var canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    var rect = canvas.getBoundingClientRect();
    _mouse.x = e.clientX - rect.left;
    _mouse.y = e.clientY - rect.top;
  }, { passive: true });

  /* ════════════════════════════════
     API PÚBLICA
  ════════════════════════════════ */
  return {

    /* ── Pantalla ── */
    start: function (w, h) {
      var ctx = _getCtx(); if (!ctx) return;
      _canvas.width = Number(w) || 480;
      _canvas.height = Number(h) || 360;
      _bgColor = '#1a1a2e'; _bgImage = null;
      _running = true;

      /* Reiniciar estado del sprite para que cada ejecución
         comience desde un estado limpio y predecible 
         (ahora x,y es esquina superior izquierda, no centro) */
      _sprite.x = 216; _sprite.y = 156;
      _sprite.w = 48; _sprite.h = 48;
      _sprite.color = '#00ff88';
      _sprite.img = null;
      _sprite.imgReady = false;
      _sprite.flipX = false;
      _sprite.angle = 0;

      /* Reiniciar estado del lápiz */
      _pen.down = false;
      _pen.color = '#ff0000';
      _pen.size = 3;
      _pen.lastX = null;
      _pen.lastY = null;

      ctx.fillStyle = _bgColor;
      ctx.fillRect(0, 0, _canvas.width, _canvas.height);
    },

    setBg: function (value) {
      var ctx = _getCtx(); if (!ctx) return;
      _bgImage = null;
      _bgColor = _color(value);
      ctx.fillStyle = _bgColor;
      ctx.fillRect(0, 0, _canvas.width, _canvas.height);
    },

    setBgImage: function (filename, onReady) {
      var ctx = _getCtx(); if (!ctx) { if (onReady) onReady(false); return; }
      _loadImage(String(filename), function (img) {
        if (img) {
          _bgImage = img;
          ctx.drawImage(img, 0, 0, _canvas.width, _canvas.height);
        }
        if (onReady) onReady(!!img);
      });
    },

    clear: function () {
      var ctx = _getCtx(); if (!ctx) return;
      _drawBg(ctx);
    },

    drawBg: function () {
      var ctx = _getCtx(); if (!ctx) return;
      _drawBg(ctx);
    },

    /* ── Sprite ── */
    createSprite: function (x, y, w, h, colorOrImg) {
      var v = String(colorOrImg || '#00ff88');
      _sprite.x = Number(x ?? 216);
      _sprite.y = Number(y ?? 156);
      _sprite.w = Number(w) || 48;
      _sprite.h = Number(h) || 48;
      _sprite.flipX = false;
      if (v.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i)) {
        _sprite.color = '#00ff88';
        _sprite.imgReady = false;
        _sprite.img = null;
        _loadImage(v, function (img) {
          _sprite.img = img;
          _sprite.imgReady = !!img;
        });
      } else {
        _sprite.color = v;
        _sprite.img = null;
        _sprite.imgReady = false;
      }
      console.log('[GameEngine] createSprite at:', _sprite.x, _sprite.y, 'size:', _sprite.w, _sprite.h, 'color/img:', colorOrImg);
    },

    moveSprite: function (dx, dy) {
      _getCtx();
      var prevX = _sprite.x, prevY = _sprite.y;
      var ndx = Number(dx) || 0;
      _sprite.x += ndx;
      _sprite.y += Number(dy) || 0;
      if (ndx < 0) _sprite.flipX = true;
      if (ndx > 0) _sprite.flipX = false;
      /* Opcional: clamping para mantener el sprite dentro del canvas (esquina superior izquierda) */
      /*
      if (_canvas) {
        _sprite.x = Math.max(0, Math.min(_canvas.width  - _sprite.w, _sprite.x));
        _sprite.y = Math.max(0, Math.min(_canvas.height - _sprite.h, _sprite.y));
      }
      */
      if (_pen.down && _ctx) {
        var fromX = (_pen.lastX !== null) ? _pen.lastX : prevX;
        var fromY = (_pen.lastY !== null) ? _pen.lastY : prevY;
        _ctx.beginPath();
        _ctx.strokeStyle = _pen.color;
        _ctx.lineWidth = _pen.size;
        _ctx.lineCap = 'round';
        _ctx.lineJoin = 'round';
        _ctx.moveTo(fromX, fromY);
        _ctx.lineTo(_sprite.x, _sprite.y);
        _ctx.stroke();
      }
      _pen.lastX = _sprite.x;
      _pen.lastY = _sprite.y;
      console.log('[GameEngine] moveSprite by:', dx, dy, 'new pos:', _sprite.x, _sprite.y);
    },

    setPos: function (x, y) {
      _sprite.x = Number(x ?? 0);
      _sprite.y = Number(y ?? 0);
      console.log('[GameEngine] setPos to:', _sprite.x, _sprite.y);
      _pen.lastX = _sprite.x;
      _pen.lastY = _sprite.y;
    },
    getX: function () { return _sprite.x; },
    getY: function () { return _sprite.y; },

    /* ── LEDs simulados ── */
    _leds: {},
    setLed: function (name, on) {
      if (!_leds[name]) _leds[name] = { on: false };
      _leds[name].on = !!on;
    },

    drawLeds: function () { /* no-op — LEDs físicos en ESP32 */ },
    turnAngle: function (deg) {
      _sprite.angle = (_sprite.angle + Number(deg) || 0) % 360;
      if (_sprite.angle < 0) _sprite.angle += 360;
    },
    getAngle: function () {
      return _sprite.angle;
    },
    setAngle: function (deg) {
      _sprite.angle = ((Number(deg) || 0) % 360 + 360) % 360;
    },
    moveSteps: function (steps) {
      /* Convención: 0° = derecha, 90° = arriba, 180° = izquierda, 270° = abajo. */
      var rad = -(_sprite.angle) * Math.PI / 180;
      var dx = Math.cos(rad) * (Number(steps) || 0);
      var dy = Math.sin(rad) * (Number(steps) || 0);
      this.moveSprite(dx, dy);
    },

    setFlip: function (flip) { _sprite.flipX = !!flip; },

    drawSprite: function () {
      var ctx = _getCtx(); if (!ctx) return;
      var x = _sprite.x, y = _sprite.y;
      var w = _sprite.w, h = _sprite.h;
      console.log(x, y);
      if (_sprite.imgReady && _sprite.img) {
        ctx.save();
        if (_sprite.flipX) {
          ctx.translate(x + w, y);
          ctx.scale(-1, 1);
          ctx.drawImage(_sprite.img, -w, 0, w, h);
        } else {
          ctx.drawImage(_sprite.img, x, y, w, h);
        }
        ctx.restore();
      } else if (_sprite.img === null && !_sprite.imgReady && _sprite.color) {
        ctx.fillStyle = _sprite.color;
        _fillRoundRect(ctx, x, y, w, h, 4);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        _fillRoundRect(ctx, x, y, w, h, 4);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '10px monospace';
        ctx.fillText('...', x + 8, y + 12);
      }
    },


    loadImage: function (filename, callback) {
      _loadImage(String(filename), function (img) {
        if (callback) callback(!!img);
      });
    },

    /* ── Teclado ── */
    keyPressed: function (key) { return !!_keys[String(key)]; },

    /* ── Ratón ── */
    mouseClicked: function () {
      var c = _mouse.clicked;
      _mouse.clicked = false;
      return c;
    },
    mouseDown: function () { return _mouse.down; },
    mouseX: function () { return _mouse.x; },
    mouseY: function () { return _mouse.y; },

    /* ── Colisiones ── */
    touchingColor: function (hexColor) {
      var ctx = _getCtx(); if (!ctx) return false;
      var w = _sprite.w, h = _sprite.h;
      /* Verificar desde la esquina superior izquierda con un pequeño margen */
      var dx = Math.round(w * 0.2);
      var dy = Math.round(h * 0.2);
      var px = Math.max(0, Math.round(_sprite.x + dx));
      var py = Math.max(0, Math.round(_sprite.y + dy));
      var sw = Math.min(Math.round(w * 0.6), _canvas.width - px);
      var sh = Math.min(Math.round(h * 0.6), _canvas.height - py);
      if (sw <= 0 || sh <= 0) return false;
      var data = ctx.getImageData(px, py, sw, sh).data;
      var target = _hexToRgb(String(hexColor));
      if (!target) return false;
      for (var i = 0; i < data.length; i += 4) {
        if (Math.abs(data[i] - target.r) < 30 &&
          Math.abs(data[i + 1] - target.g) < 30 &&
          Math.abs(data[i + 2] - target.b) < 30) return true;
      }
      return false;
    },

    touchingEdge: function () {
      _getCtx();
      if (!_canvas) return false;
      /* Verificar si la esquina superior izquierda o inferior derecha toca el borde */
      return _sprite.x <= 0 || _sprite.x + _sprite.w >= _canvas.width ||
        _sprite.y <= 0 || _sprite.y + _sprite.h >= _canvas.height;
    },

    colorAtPosHex: function (x, y) {
      var ctx = _getCtx(); if (!ctx) return '#000000';
      var d = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
      return _rgbToHex(d[0], d[1], d[2]);
    },
    colorAtPosChannel: function (x, y, ch) {
      var ctx = _getCtx(); if (!ctx) return 0;
      var d = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
      return d[ch] || 0;
    },
    colorAtPos: function (x, y) {
      var ctx = _getCtx(); if (!ctx) return [0, 0, 0];
      var d = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
      return [d[0], d[1], d[2]];
    },

    /* ── Formas ── */
    drawRect: function (x, y, w, h, color) {
      var ctx = _getCtx(); if (!ctx) return;
      ctx.fillStyle = String(color || '#fff');
      ctx.fillRect(Number(x) || 0, Number(y) || 0, Number(w) || 10, Number(h) || 10);
    },
    drawRectOutline: function (x, y, w, h, color, lineWidth) {
      var ctx = _getCtx(); if (!ctx) return;
      ctx.strokeStyle = String(color || '#fff');
      ctx.lineWidth = Math.max(1, Number(lineWidth) || 2);
      ctx.strokeRect(Number(x) || 0, Number(y) || 0, Number(w) || 10, Number(h) || 10);
    },
    drawCircle: function (x, y, r, color) {
      var ctx = _getCtx(); if (!ctx) return;
      ctx.fillStyle = String(color || '#fff');
      ctx.beginPath();
      ctx.arc(Number(x) || 0, Number(y) || 0, Number(r) || 10, 0, Math.PI * 2);
      ctx.fill();
    },
    drawCircleOutline: function (x, y, r, color, lineWidth) {
      var ctx = _getCtx(); if (!ctx) return;
      ctx.strokeStyle = String(color || '#fff');
      ctx.lineWidth = Math.max(1, Number(lineWidth) || 2);
      ctx.beginPath();
      ctx.arc(Number(x) || 0, Number(y) || 0, Number(r) || 10, 0, Math.PI * 2);
      ctx.stroke();
    },
    drawTriangle: function (x1, y1, x2, y2, x3, y3, color) {
      var ctx = _getCtx(); if (!ctx) return;
      ctx.fillStyle = String(color || '#fff');
      ctx.beginPath();
      ctx.moveTo(Number(x1) || 0, Number(y1) || 0);
      ctx.lineTo(Number(x2) || 0, Number(y2) || 0);
      ctx.lineTo(Number(x3) || 0, Number(y3) || 0);
      ctx.closePath();
      ctx.fill();
    },
    drawTriangleOutline: function (x1, y1, x2, y2, x3, y3, color, lineWidth) {
      var ctx = _getCtx(); if (!ctx) return;
      ctx.strokeStyle = String(color || '#fff');
      ctx.lineWidth = Math.max(1, Number(lineWidth) || 2);
      ctx.beginPath();
      ctx.moveTo(Number(x1) || 0, Number(y1) || 0);
      ctx.lineTo(Number(x2) || 0, Number(y2) || 0);
      ctx.lineTo(Number(x3) || 0, Number(y3) || 0);
      ctx.closePath();
      ctx.stroke();
    },
    drawLine: function (x1, y1, x2, y2, color, lineWidth) {
      var ctx = _getCtx(); if (!ctx) return;
      ctx.strokeStyle = String(color || '#fff');
      ctx.lineWidth = Math.max(1, Number(lineWidth) || 2);
      ctx.beginPath();
      ctx.moveTo(Number(x1) || 0, Number(y1) || 0);
      ctx.lineTo(Number(x2) || 0, Number(y2) || 0);
      ctx.stroke();
    },
    showText: function (text, x, y, color, size) {
      var ctx = _getCtx(); if (!ctx) return;
      ctx.fillStyle = String(color || '#fff');
      ctx.font = 'bold ' + (Math.max(8, Number(size) || 16) + 'px monospace');
      ctx.fillText(String(text), Number(x) || 0, Number(y) || 20);
    },

    stop: function () { _running = false; },

    /* ── Cargar imagen local desde File (input type=file) ── */
    loadLocalImage: function (file, name, onReady) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = new Image();
        img.onload = function () { _imageCache[name] = img; if (onReady) onReady(true, name); };
        img.onerror = function () { if (onReady) onReady(false, name); };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    /* ── Utilidades matemáticas expuestas al sandbox ── */
    randomInt: function (min, max) {
      min = Math.ceil(Number(min) || 0);
      max = Math.floor(Number(max) || 0);
      if (min > max) { var t = min; min = max; max = t; }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomFloat: function (min, max) {
      min = Number(min) || 0; max = Number(max) || 1;
      return Math.random() * (max - min) + min;
    },
    distance: function (x1, y1, x2, y2) {
      var dx = Number(x2) - Number(x1), dy = Number(y2) - Number(y1);
      return Math.sqrt(dx * dx + dy * dy);
    },
    /* ── Sonido simple por Web Audio ── */
    playTone: function (freq, duration) {
      try {
        var actx = window._simAudioCtx;
        if (!actx) actx = window._simAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var osc = actx.createOscillator();
        var gain = actx.createGain();
        osc.frequency.value = Number(freq) || 440;
        gain.gain.setValueAtTime(0.3, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + (Number(duration) || 0.3));
        osc.connect(gain); gain.connect(actx.destination);
        osc.start(); osc.stop(actx.currentTime + (Number(duration) || 0.3));
      } catch (e) { }
    },

    /* ── Lápiz ── */
    penDown: function (x, y) {
      if (x !== undefined && x !== null && x !== '' &&
        y !== undefined && y !== null && y !== '') {
        /* Teletransportar: mover sprite y limpiar lastX/lastY para que
           el primer trazo parta desde el nuevo punto, sin diagonal */
        _pen.down = false;
        _pen.lastX = null;
        _pen.lastY = null;
        _sprite.x = Number(x) || 0;
        _sprite.y = Number(y) || 0;
      }
      _pen.down = true;
      _pen.lastX = _sprite.x;
      _pen.lastY = _sprite.y;
      console.log('[GameEngine] penDown:', _sprite.x, _sprite.y);
    },
    penUp: function () { _pen.down = false; },
    penMoveTo: function (x, y) {
      /* Mueve el lapiz a X,Y SIN dibujar, aunque este bajado */
      var wasDown = _pen.down;
      _pen.down = false;
      _pen.lastX = null;
      _pen.lastY = null;
      _sprite.x = Number(x) || 0;
      _sprite.y = Number(y) || 0;
      _pen.down = wasDown;
      _pen.lastX = _sprite.x;
      _pen.lastY = _sprite.y;
      console.log('[GameEngine] penMoveTo:', _sprite.x, _sprite.y);
    },
    penSetColor: function (color) { _pen.color = String(color || '#ff0000'); },
    penSetSize: function (size) { _pen.size = Math.max(1, Number(size) || 3); },
    penClear: function () {
      var ctx = _getCtx(); if (!ctx) return;
      _drawBg(ctx);
    },
    penStamp: function () {
      var ctx = _getCtx(); if (!ctx) return;
      var x = _sprite.x, y = _sprite.y, w = _sprite.w, h = _sprite.h;
      if (_sprite.imgReady && _sprite.img) {
        ctx.save();
        if (_sprite.flipX) {
          ctx.translate(x, 0); ctx.scale(-1, 1);
          ctx.drawImage(_sprite.img, -w / 2, y - h / 2, w, h);
        } else {
          ctx.drawImage(_sprite.img, x - w / 2, y - h / 2, w, h);
        }
        ctx.restore();
      } else {
        ctx.fillStyle = _sprite.color;
        _fillRoundRect(ctx, x - w / 2, y - h / 2, w, h, 4);
        ctx.fill();
      }
    }
  };

  /* ── función interna _drawBg ── */
  function _drawBg(ctx) {
    if (_bgImage) {
      ctx.drawImage(_bgImage, 0, 0, _canvas.width, _canvas.height);
    } else {
      ctx.fillStyle = _bgColor;
      ctx.fillRect(0, 0, _canvas.width, _canvas.height);
    }
  }

})();

/* ── Funciones globales para los botones del header ── */
function stopGame() {
  if (typeof runner !== 'undefined' && runner) { clearTimeout(runner); runner = null; }
  if (typeof _rafId !== 'undefined' && _rafId) { cancelAnimationFrame(_rafId); _rafId = null; }
  if (typeof interpreter !== 'undefined' && interpreter) { interpreter = null; }
  if (typeof Code !== 'undefined' && Code && Code.workspace) Code.workspace.highlightBlock(null);
  GameEngine.stop();
}

function resetGame() {
  stopGame();
  GameEngine.start(
    document.getElementById('gameCanvas').width,
    document.getElementById('gameCanvas').height
  );
}