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
  var _ctx    = null;
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
  var _bgImageName = null;      /* nombre/archivo del fondo actual (o null si es color) */
  var _running = false;

  /* ── LEDs simulados (privado) ── */
  var _leds = {};
  function _drawLeds() {
    if (!_ctx) return;
    Object.keys(_leds).forEach(function(name) {
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
    imgName: null,               /* nombre/archivo del sprite actual (o null si es color) */
    flipX: false,               /* espejo horizontal */
    flipY: false,               /* espejo vertical */
    baseW: 48, baseH: 48,        /* tamaño original (al crear el sprite), usado por setScale */
    angle: 0,                   /* dirección en grados (0 = derecha) */
    created: false               /* true solo tras createSprite() o al conservar uno cargado por botón; drawSprite() no dibuja nada mientras sea false */
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
    img.onload  = function () { _imageCache[filename] = img; callback(img); };
    img.onerror = function () {
      console.warn('[GameEngine] No se pudo cargar:', filename);
      callback(null);
    };
    /* Ruta: /static/img/<filename> */
    img.src = 'static/img/' + filename;
  }

  /* ── ¿El nombre dado corresponde a una imagen ya cargada/cargable?
       Acepta tanto nombres con extensión (car.png) como claves de caché
       generadas por carga local (__bg_local__, __sprite_local__, etc). ── */
  function _isImageName(v) {
    if (_imageCache[v]) return true;
    return /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(v);
  }

  /* ── Helpers color ── */
  function _hexToRgb(hex) {
    if (!hex || typeof hex !== 'string') return null;
    hex = hex.replace('#','');
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    var n = parseInt(hex, 16);
    return isNaN(n) ? null : { r:(n>>16)&255, g:(n>>8)&255, b:n&255 };
  }
  function _rgbToHex(r,g,b) {
    return '#'+[r,g,b].map(function(v){
      return ('0'+Math.max(0,Math.min(255,v)).toString(16)).slice(-2);
    }).join('');
  }
  /* Convierte [r,g,b] o hex string a hex string '#rrggbb' */
  function _color(v) {
    if (Array.isArray(v)) return _rgbToHex(v[0]||0, v[1]||0, v[2]||0);
    return String(v||'#000000');
  }

  /* ── Rectángulo redondeado compatible ── */
  function _fillRoundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w/2, h/2);
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y); ctx.quadraticCurveTo(x+w, y,   x+w, y+r);
    ctx.lineTo(x+w, y+h-r); ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h); ctx.quadraticCurveTo(x, y+h,   x, y+h-r);
    ctx.lineTo(x, y+r); ctx.quadraticCurveTo(x, y,     x+r, y);
    ctx.closePath();
  }

  /* ── Dibuja la imagen del sprite, con o sin volteo horizontal,
     manteniendo el bounding box EXACTAMENTE en [x, x+w] x [y, y+h]
     en ambos casos.
     CONVENCIÓN FIJA (igual que el resto del motor): x,y = esquina
     superior izquierda del sprite, nunca el centro.
     Toda función que dibuje el sprite (drawSprite, penStamp, o
     cualquiera que se agregue en el futuro) DEBE usar este helper
     en vez de reimplementar translate/scale/drawImage a mano —
     así se evita que vuelva a aparecer el bug del salto/giro
     brusco al cambiar de dirección (causado antes por usar
     pivotes de flip distintos e inconsistentes con x,y). ── */
  function _drawSpriteImage(ctx, img, x, y, w, h, flipX, flipY, angle) {
    var deg = Number(angle) || 0;
    if (flipX || flipY || deg) {
      ctx.save();
      ctx.translate(x + w / 2, y + h / 2);
      if (deg) ctx.rotate(-deg * Math.PI / 180); /* misma convención que moveSteps: 0°=derecha, 90°=arriba (sentido antihorario) */
      ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
      ctx.drawImage(img, -w / 2, -h / 2, w, h);
      ctx.restore();
    } else {
      ctx.drawImage(img, x, y, w, h);
    }
  }

  /* ── Lápiz ── */
  var _pen = { down: false, color: '#ff0000', size: 3, lastX: null, lastY: null };

  /* ── Sonido activo: osciladores y timers de melodía en curso,
       para poder detenerlos todos con stopSound() ── */
  var _activeOscillators = [];
  var _melodyTimers = [];

  /* ── Teclado ── */
  var _keys = {};
  /* Mapa de teclas de juego → carácter serial que se envía al ESP32 */
  var _keySerialMap = {
    'ArrowUp': 'w', 'ArrowDown': 's', 'ArrowLeft': 'a', 'ArrowRight': 'd',
    'w': 'w', 'a': 'a', 's': 's', 'd': 'd',
    ' ': ' ', 'Enter': '\r', 'z': 'z', 'x': 'x'
  };
  document.addEventListener('keydown', function(e) {
    _keys[e.key] = true;
    /* Solo bloquear scroll si el foco NO está en un campo de texto/editor */
    if (_running && ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].indexOf(e.key) >= 0) {
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
      } catch(err) { /* sin conexión serial — ignorar silenciosamente */ }
      document.dispatchEvent(new CustomEvent('game:keyserial', { detail: { char: ch, key: e.key } }));
    }
  }, { passive: false });
  document.addEventListener('keyup', function(e) {
    _keys[e.key] = false;
    if (_running && _keySerialMap.hasOwnProperty(e.key)) {
      try {
        if (typeof sendSerial === 'function') {
          sendSerial('\x00');
        } else if (typeof serialWriter !== 'undefined' && serialWriter) {
          serialWriter.write(new TextEncoder().encode('\x00'));
        }
      } catch(err) {}
    }
  }, { passive: true });

  /* ── Ratón ──
     _mouse.clicked / leftClicked / rightClicked son "consumibles":
     se ponen en true en el evento y la función pública correspondiente
     los resetea a false al leerlos (mismo patrón que ya usaba
     mouseClicked(), para no romper código existente que lo use).
     wheelUp / wheelDown funcionan igual: se "consumen" al leerlos,
     así detectan un solo "tic" de rueda por lectura, no el estado
     continuo (la rueda no tiene "mantenido presionado"). ── */
  var _mouse = {
    x: 0, y: 0,
    down: false, clicked: false,                 /* compat: cualquier botón */
    leftDown: false, leftClicked: false,
    rightDown: false, rightClicked: false,
    wheelUp: false, wheelDown: false
  };

  function _updateMousePos(e) {
    var canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    var rect = canvas.getBoundingClientRect();
    _mouse.x = e.clientX - rect.left;
    _mouse.y = e.clientY - rect.top;
  }

  document.addEventListener('mousedown', function(e) {
    _updateMousePos(e);
    _mouse.down    = true;
    _mouse.clicked = true;
    if (e.button === 0) {                /* botón izquierdo */
      _mouse.leftDown    = true;
      _mouse.leftClicked = true;
    } else if (e.button === 2) {         /* botón derecho */
      _mouse.rightDown    = true;
      _mouse.rightClicked = true;
    }
  }, { passive: true });

  document.addEventListener('mouseup', function(e) {
    if (e.button === 0) {
      _mouse.leftDown = false;
    } else if (e.button === 2) {
      _mouse.rightDown = false;
    }
    /* down (compat) se apaga solo cuando ya no queda ningún botón */
    if (!_mouse.leftDown && !_mouse.rightDown) _mouse.down = false;
  }, { passive: true });

  document.addEventListener('mousemove', function(e) {
    _updateMousePos(e);
  }, { passive: true });

  /* Click derecho: evitar que el navegador abra su menú contextual
     mientras se juega, igual que el resto de controles del juego. */
  document.addEventListener('contextmenu', function(e) {
    var canvas = document.getElementById('gameCanvas');
    if (canvas && (e.target === canvas || canvas.contains(e.target))) {
      e.preventDefault();
    }
  });

  /* Rueda del ratón: deltaY > 0 = hacia abajo/atrás, < 0 = hacia
     arriba/adelante (estándar en navegadores). Se evita el scroll de
     la página solo cuando la rueda ocurre sobre el canvas del juego. */
  document.addEventListener('wheel', function(e) {
    var canvas = document.getElementById('gameCanvas');
    if (canvas && (e.target === canvas || canvas.contains(e.target))) {
      e.preventDefault();
      if (e.deltaY < 0)      _mouse.wheelUp   = true;
      else if (e.deltaY > 0) _mouse.wheelDown = true;
    }
  }, { passive: false });

  /* ════════════════════════════════
     API PÚBLICA
  ════════════════════════════════ */
  return {

    /* ── Pantalla ── */
    start: function(w, h) {
      var ctx = _getCtx(); if (!ctx) return;
      _canvas.width  = Number(w)||480;
      _canvas.height = Number(h)||360;
      _running = true;

      /* Si el usuario cargó un fondo/sprite local con los botones de la
         ventana de juego (📁 Fondo / 📁 Personaje), lo conservamos al
         ejecutar el código — solo se reemplaza si el propio script
         vuelve a llamar a "fondo color/imagen" o "crear personaje". */
      var keepBg     = _bgImageName === '__bg_local__'     && _imageCache['__bg_local__'];
      var keepSprite = _sprite.imgName === '__sprite_local__' && _imageCache['__sprite_local__'];

      if (!keepBg) {
        _bgColor = '#1a1a2e'; _bgImage = null; _bgImageName = null;
      }

      /* Reiniciar estado del sprite para que cada ejecución
         comience desde un estado limpio y predecible 
         (ahora x,y es esquina superior izquierda, no centro) */
      _sprite.x = 216; _sprite.y = 156;
      _sprite.w = 48;  _sprite.h = 48;
      _sprite.flipX    = false;
      _sprite.angle    = 0;
      /* Sin "crear personaje" en el código y sin imagen cargada por
         botón, el sprite no debe dibujarse en absoluto. */
      _sprite.created = !!keepSprite;
      if (!keepSprite) {
        _sprite.color    = '#00ff88';
        _sprite.img      = null;
        _sprite.imgReady = false;
        _sprite.imgName  = null;
      }

      /* Reiniciar estado del lápiz */
      _pen.down  = false;
      _pen.color = '#ff0000';
      _pen.size  = 3;
      _pen.lastX = null;
      _pen.lastY = null;

      /* Reiniciar flags "consumibles" del ratón: un clic hecho antes
         de pulsar Ejecutar no debe contarse como clic dentro del juego. */
      _mouse.clicked      = false;
      _mouse.leftClicked  = false;
      _mouse.rightClicked = false;
      _mouse.wheelUp      = false;
      _mouse.wheelDown    = false;

      if (keepBg && _bgImage) {
        ctx.drawImage(_bgImage, 0, 0, _canvas.width, _canvas.height);
      } else {
        ctx.fillStyle = _bgColor;
        ctx.fillRect(0, 0, _canvas.width, _canvas.height);
      }

      /* Si se conservó un sprite cargado por botón, dibujarlo ya mismo;
         si el script del usuario define su propio sprite_create justo
         después, ese se encargará de redibujar lo correspondiente. */
      if (keepSprite) {
        this.drawSprite();
      }
    },

    setBg: function(value) {
      var ctx = _getCtx(); if (!ctx) return;
      _bgImage = null;
      _bgImageName = null;
      _bgColor = _color(value);
      ctx.fillStyle = _bgColor;
      ctx.fillRect(0, 0, _canvas.width, _canvas.height);
    },

    setBgImage: function(filename, onReady) {
      var ctx = _getCtx(); if (!ctx) { if (onReady) onReady(false); return; }
      var name = String(filename);
      _loadImage(name, function(img) {
        if (img) {
          _bgImage = img;
          _bgImageName = name;
          ctx.drawImage(img, 0, 0, _canvas.width, _canvas.height);
        }
        if (onReady) onReady(!!img);
      });
    },

    /* ── Consultar nombre del fondo / sprite actual (para guardarlo en una variable) ── */
    getBgImageName:     function() { return _bgImageName; },
    getSpriteImageName: function() { return _sprite.imgName; },

    clear: function() {
      var ctx = _getCtx(); if (!ctx) return;
      _drawBg(ctx);
    },

    drawBg: function() {
      var ctx = _getCtx(); if (!ctx) return;
      _drawBg(ctx);
    },

    /* ── Sprite ── */
    createSprite: function(x, y, w, h, colorOrImg) {
      var v = String(colorOrImg || '#00ff88');
      /* Usar comparación explícita contra undefined/null en vez de ||
         para no descartar 0 como valor válido
         (Number(0)||216 daría 216, que era el bug original) */
      _sprite.x = (x !== undefined && x !== null) ? Number(x) : 216;
      _sprite.y = (y !== undefined && y !== null) ? Number(y) : 156;
      _sprite.w = (w !== undefined && w !== null) ? Number(w) : 48;
      _sprite.h = (h !== undefined && h !== null) ? Number(h) : 48;
      _sprite.baseW = _sprite.w;
      _sprite.baseH = _sprite.h;
      _sprite.flipX = false;
      _sprite.flipY = false;
      _sprite.created = true;
      if (_isImageName(v)) {
        _sprite.color = '#00ff88';
        _sprite.imgReady = false;
        _sprite.img = null;
        _sprite.imgName = v;
        _loadImage(v, function(img) {
          _sprite.img = img;
          _sprite.imgReady = !!img;
          if (!img) _sprite.imgName = null;
        });
      } else {
        _sprite.color    = v;
        _sprite.img      = null;
        _sprite.imgReady = false;
        _sprite.imgName  = null;
      }
    },

    moveSprite: function(dx, dy) {
      _getCtx();
      var prevX = _sprite.x, prevY = _sprite.y;
      var ndx = Number(dx)||0;
      _sprite.x += ndx;
      _sprite.y += Number(dy)||0;
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
        _ctx.lineWidth   = _pen.size;
        _ctx.lineCap     = 'round';
        _ctx.lineJoin    = 'round';
        _ctx.moveTo(fromX, fromY);
        _ctx.lineTo(_sprite.x, _sprite.y);
        _ctx.stroke();
      }
      _pen.lastX = _sprite.x;
      _pen.lastY = _sprite.y;
    },

    setPos: function(x,y) {
      _sprite.x = Number(x) || 0;
      _sprite.y = Number(y) || 0;
      _pen.lastX = _sprite.x;
      _pen.lastY = _sprite.y;
    },
    getX:   function()    { return _sprite.x; },
    getY:   function()    { return _sprite.y; },

    /* ── LEDs simulados ── */
    _leds: {},
    setLed: function(name, on) {
      if (!_leds[name]) _leds[name] = { on: false };
      _leds[name].on = !!on;
    },

    drawLeds: function() { /* no-op — LEDs físicos en ESP32 */ },
    turnAngle: function(deg) {
      _sprite.angle = (_sprite.angle + Number(deg)||0) % 360;
      if (_sprite.angle < 0) _sprite.angle += 360;
    },
    getAngle: function() {
      return _sprite.angle;
    },
    setAngle: function(deg) {
      _sprite.angle = ((Number(deg)||0) % 360 + 360) % 360;
    },
    moveSteps: function(steps) {
      /* Convención: 0° = derecha, 90° = arriba, 180° = izquierda, 270° = abajo. */
      var rad = -(_sprite.angle) * Math.PI / 180;
      var dx  = Math.cos(rad) * (Number(steps)||0);
      var dy  = Math.sin(rad) * (Number(steps)||0);
      this.moveSprite(dx, dy);
    },

    setFlip: function(flip) { _sprite.flipX = !!flip; },
    setFlipY: function(flip) { _sprite.flipY = !!flip; },
    setScale: function(scale) {
      var s = Number(scale);
      if (!s || s <= 0) s = 1;
      _sprite.w = _sprite.baseW * s;
      _sprite.h = _sprite.baseH * s;
    },

    drawSprite: function() {
      var ctx = _getCtx(); if (!ctx) return;
      /* Sin "crear personaje" (createSprite) en el código, no se
         dibuja nada — ni el cuadro de color por defecto ni el
         placeholder "...". Así los programas que no usan personaje
         (p.ej. solo dibujan con el lápiz) no muestran nada que el
         usuario no haya pedido explícitamente. */
      if (!_sprite.created) return;

      var x = _sprite.x, y = _sprite.y;
      var w = _sprite.w, h = _sprite.h;

      if (_sprite.imgReady && _sprite.img) {
        _drawSpriteImage(ctx, _sprite.img, x, y, w, h, _sprite.flipX, _sprite.flipY, _sprite.angle);
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
        ctx.fillText('...', x+8, y+12);
      }
    },

    
    loadImage: function(filename, callback) {
      _loadImage(String(filename), function(img) {
        if (callback) callback(!!img);
      });
    },

    /* ── Dibuja una imagen suelta (sin necesidad de "crear personaje").
       Si la imagen aún no está en caché, dispara la carga y no dibuja
       nada en este frame (quedará lista para los próximos). ── */
    drawImage: function(filename, x, y, w, h, angle) {
      var ctx = _getCtx(); if (!ctx) return;
      var name = String(filename || '');
      if (!name) return;
      var img = _imageCache[name];
      if (!img) {
        _loadImage(name, function () { /* quedará en caché para el próximo frame */ });
        return;
      }
      var nx = Number(x) || 0, ny = Number(y) || 0;
      var nw = Number(w) || img.width || 32;
      var nh = Number(h) || img.height || 32;
      var deg = Number(angle) || 0;
      if (deg) {
        ctx.save();
        ctx.translate(nx + nw / 2, ny + nh / 2);
        ctx.rotate(deg * Math.PI / 180);
        ctx.drawImage(img, -nw / 2, -nh / 2, nw, nh);
        ctx.restore();
      } else {
        ctx.drawImage(img, nx, ny, nw, nh);
      }
    },

    /* ── Teclado ── */
    keyPressed: function(key) { return !!_keys[String(key)]; },

    /* ── Ratón ── */
    mouseClicked: function() {
      var c = _mouse.clicked;
      _mouse.clicked = false;
      return c;
    },
    mouseDown: function() { return _mouse.down; },
    mouseX:    function() { return _mouse.x; },
    mouseY:    function() { return _mouse.y; },

    /* Botón izquierdo */
    mouseLeftClicked: function() {
      var c = _mouse.leftClicked;
      _mouse.leftClicked = false;
      return c;
    },
    mouseLeftDown: function() { return _mouse.leftDown; },

    /* Botón derecho */
    mouseRightClicked: function() {
      var c = _mouse.rightClicked;
      _mouse.rightClicked = false;
      return c;
    },
    mouseRightDown: function() { return _mouse.rightDown; },

    /* Rueda del ratón: cada lectura "consume" el tic detectado,
       igual que mouseClicked(), para que represente un solo evento
       de scroll y no quede pegado en true. */
    mouseWheelUp: function() {
      var w = _mouse.wheelUp;
      _mouse.wheelUp = false;
      return w;
    },
    mouseWheelDown: function() {
      var w = _mouse.wheelDown;
      _mouse.wheelDown = false;
      return w;
    },

    /* ── Colisiones ── */
    touchingColor: function(hexColor) {
      var ctx = _getCtx(); if (!ctx) return false;
      var w = _sprite.w, h = _sprite.h;
      /* Verificar desde la esquina superior izquierda con un pequeño margen */
      var dx = Math.round(w * 0.2);
      var dy = Math.round(h * 0.2);
      var px = Math.max(0, Math.round(_sprite.x + dx));
      var py = Math.max(0, Math.round(_sprite.y + dy));
      var sw = Math.min(Math.round(w*0.6), _canvas.width  - px);
      var sh = Math.min(Math.round(h*0.6), _canvas.height - py);
      if (sw<=0||sh<=0) return false;
      var data   = ctx.getImageData(px, py, sw, sh).data;
      var target = _hexToRgb(String(hexColor));
      if (!target) return false;
      for (var i=0; i<data.length; i+=4) {
        if (Math.abs(data[i]  -target.r)<30 &&
            Math.abs(data[i+1]-target.g)<30 &&
            Math.abs(data[i+2]-target.b)<30) return true;
      }
      return false;
    },

    touchingEdge: function() {
      _getCtx();
      if (!_canvas) return false;
      /* Verificar si la esquina superior izquierda o inferior derecha toca el borde */
      return _sprite.x <= 0 || _sprite.x + _sprite.w >= _canvas.width ||
             _sprite.y <= 0 || _sprite.y + _sprite.h >= _canvas.height;
    },

    /* ── Colisión contra el fondo (laberinto) usando las 4 esquinas
         reales del sprite, sea cual sea su tamaño (w,h).
         No usa un valor fijo de 25px: siempre se ajusta a _sprite.w/_sprite.h. ── */
    touchingColorCorners: function(hexColor) {
      var ctx = _getCtx(); if (!ctx) return false;
      var target = _hexToRgb(String(hexColor));
      if (!target) return false;

      var x = _sprite.x, y = _sprite.y, w = _sprite.w, h = _sprite.h;
      var maxX = _canvas.width  - 1;
      var maxY = _canvas.height - 1;

      /* Las 4 esquinas del rectángulo del sprite, recortadas al canvas */
      var corners = [
        [x,         y        ],  /* arriba-izquierda  */
        [x + w - 1, y        ],  /* arriba-derecha    */
        [x,         y + h - 1],  /* abajo-izquierda   */
        [x + w - 1, y + h - 1]   /* abajo-derecha     */
      ];

      for (var i = 0; i < corners.length; i++) {
        var px = Math.max(0, Math.min(maxX, Math.round(corners[i][0])));
        var py = Math.max(0, Math.min(maxY, Math.round(corners[i][1])));
        var d  = ctx.getImageData(px, py, 1, 1).data;
        if (Math.abs(d[0]-target.r) < 30 &&
            Math.abs(d[1]-target.g) < 30 &&
            Math.abs(d[2]-target.b) < 30) {
          return true;
        }
      }
      return false;
    },

    colorAtPosHex: function(x,y) {
      var ctx = _getCtx(); if (!ctx) return '#000000';
      var d = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
      return _rgbToHex(d[0], d[1], d[2]);
    },
    colorAtPosChannel: function(x,y,ch) {
      var ctx = _getCtx(); if (!ctx) return 0;
      var d = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
      return d[ch]||0;
    },
    colorAtPos: function(x,y) {
      var ctx = _getCtx(); if (!ctx) return [0,0,0];
      var d = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
      return [d[0], d[1], d[2]];
    },

    /* ── Formas ── */
    drawRect: function(x,y,w,h,color) {
      var ctx=_getCtx(); if(!ctx) return;
      ctx.fillStyle=String(color||'#fff');
      ctx.fillRect(Number(x)||0,Number(y)||0,Number(w)||10,Number(h)||10);
    },
    drawRectOutline: function(x,y,w,h,color,lineWidth) {
      var ctx=_getCtx(); if(!ctx) return;
      ctx.strokeStyle=String(color||'#fff');
      ctx.lineWidth=Math.max(1,Number(lineWidth)||2);
      ctx.strokeRect(Number(x)||0,Number(y)||0,Number(w)||10,Number(h)||10);
    },
    drawCircle: function(x,y,r,color) {
      var ctx=_getCtx(); if(!ctx) return;
      ctx.fillStyle=String(color||'#fff');
      ctx.beginPath();
      ctx.arc(Number(x)||0,Number(y)||0,Number(r)||10,0,Math.PI*2);
      ctx.fill();
    },
    drawCircleOutline: function(x,y,r,color,lineWidth) {
      var ctx=_getCtx(); if(!ctx) return;
      ctx.strokeStyle=String(color||'#fff');
      ctx.lineWidth=Math.max(1,Number(lineWidth)||2);
      ctx.beginPath();
      ctx.arc(Number(x)||0,Number(y)||0,Number(r)||10,0,Math.PI*2);
      ctx.stroke();
    },
    drawTriangle: function(x1,y1,x2,y2,x3,y3,color) {
      var ctx=_getCtx(); if(!ctx) return;
      ctx.fillStyle=String(color||'#fff');
      ctx.beginPath();
      ctx.moveTo(Number(x1)||0,Number(y1)||0);
      ctx.lineTo(Number(x2)||0,Number(y2)||0);
      ctx.lineTo(Number(x3)||0,Number(y3)||0);
      ctx.closePath();
      ctx.fill();
    },
    drawTriangleOutline: function(x1,y1,x2,y2,x3,y3,color,lineWidth) {
      var ctx=_getCtx(); if(!ctx) return;
      ctx.strokeStyle=String(color||'#fff');
      ctx.lineWidth=Math.max(1,Number(lineWidth)||2);
      ctx.beginPath();
      ctx.moveTo(Number(x1)||0,Number(y1)||0);
      ctx.lineTo(Number(x2)||0,Number(y2)||0);
      ctx.lineTo(Number(x3)||0,Number(y3)||0);
      ctx.closePath();
      ctx.stroke();
    },
    drawLine: function(x1,y1,x2,y2,color,lineWidth) {
      var ctx=_getCtx(); if(!ctx) return;
      ctx.strokeStyle=String(color||'#fff');
      ctx.lineWidth=Math.max(1,Number(lineWidth)||2);
      ctx.beginPath();
      ctx.moveTo(Number(x1)||0,Number(y1)||0);
      ctx.lineTo(Number(x2)||0,Number(y2)||0);
      ctx.stroke();
    },
    showText: function(text,x,y,color,size) {
      var ctx=_getCtx(); if(!ctx) return;
      ctx.fillStyle=String(color||'#fff');
      ctx.font='bold '+(Math.max(8,Number(size)||16)+'px monospace');
      ctx.fillText(String(text),Number(x)||0,Number(y)||20);
    },

    /* ── Estrella de 5 puntas, centrada en (x,y), "length" = radio externo ── */
    drawStar: function(x,y,length,angle,color) {
      var ctx=_getCtx(); if(!ctx) return;
      var cx=Number(x)||0, cy=Number(y)||0;
      var rOuter=Number(length)||10;
      var rInner=rOuter*0.42;
      var rot=(Number(angle)||0)*Math.PI/180;
      var spikes=5;
      ctx.fillStyle=String(color||'#fff');
      ctx.beginPath();
      for (var i=0;i<spikes*2;i++){
        var r=(i%2===0)?rOuter:rInner;
        var a=rot + (Math.PI/spikes)*i - Math.PI/2;
        var px=cx+Math.cos(a)*r, py=cy+Math.sin(a)*r;
        if(i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
      }
      ctx.closePath();
      ctx.fill();
    },

    /* ── Elipse rellena, centrada en (x,y) ── */
    drawEllipse: function(x,y,width,height,angle,color) {
      var ctx=_getCtx(); if(!ctx) return;
      ctx.fillStyle=String(color||'#fff');
      ctx.beginPath();
      ctx.ellipse(
        Number(x)||0, Number(y)||0,
        Math.max(0,(Number(width)||20)/2), Math.max(0,(Number(height)||12)/2),
        (Number(angle)||0)*Math.PI/180, 0, Math.PI*2
      );
      ctx.fill();
    },

    /* ── Cuadrilátero relleno definido por 4 vértices (en orden) ── */
    drawQuad: function(x1,y1,x2,y2,x3,y3,x4,y4,color) {
      var ctx=_getCtx(); if(!ctx) return;
      ctx.fillStyle=String(color||'#fff');
      ctx.beginPath();
      ctx.moveTo(Number(x1)||0,Number(y1)||0);
      ctx.lineTo(Number(x2)||0,Number(y2)||0);
      ctx.lineTo(Number(x3)||0,Number(y3)||0);
      ctx.lineTo(Number(x4)||0,Number(y4)||0);
      ctx.closePath();
      ctx.fill();
    },

    /* ── Polígono regular de n lados, centrado en (x,y), "length" = lado ── */
    drawRegularPolygon: function(x,y,n,length,angle,color) {
      var ctx=_getCtx(); if(!ctx) return;
      var cx=Number(x)||0, cy=Number(y)||0;
      var sides=Math.max(3,Math.round(Number(n)||6));
      var side=Number(length)||10;
      var r=side/(2*Math.sin(Math.PI/sides));   /* radio circunscrito a partir del lado */
      var rot=(Number(angle)||0)*Math.PI/180;
      ctx.fillStyle=String(color||'#fff');
      ctx.beginPath();
      for (var i=0;i<sides;i++){
        var a=rot + (2*Math.PI/sides)*i - Math.PI/2;
        var px=cx+Math.cos(a)*r, py=cy+Math.sin(a)*r;
        if(i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
      }
      ctx.closePath();
      ctx.fill();
    },

    /* ── Tabla/cuadrícula: dibuja "row" x "column" celdas dentro del
       rectángulo (x,y,width,height). x,y = esquina superior izquierda. ── */
    drawTable: function(x,y,width,height,row,column,color) {
      var ctx=_getCtx(); if(!ctx) return;
      var nx=Number(x)||0, ny=Number(y)||0;
      var w=Number(width)||40, h=Number(height)||40;
      var rows=Math.max(1,Math.round(Number(row)||1));
      var cols=Math.max(1,Math.round(Number(column)||1));
      ctx.strokeStyle=String(color||'#fff');
      ctx.lineWidth=Math.max(1, 1);
      ctx.strokeRect(nx,ny,w,h);
      var i;
      for (i=1;i<cols;i++){
        var cx=nx+(w/cols)*i;
        ctx.beginPath(); ctx.moveTo(cx,ny); ctx.lineTo(cx,ny+h); ctx.stroke();
      }
      for (i=1;i<rows;i++){
        var ry=ny+(h/rows)*i;
        ctx.beginPath(); ctx.moveTo(nx,ry); ctx.lineTo(nx+w,ry); ctx.stroke();
      }
    },

    stop: function() { _running=false; },

    /* ── Cargar imagen local desde File (input type=file) ── */
    loadLocalImage: function(file, name, onReady) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var img = new Image();
        img.onload  = function() { _imageCache[name] = img; if (onReady) onReady(true,  name); };
        img.onerror = function() {                           if (onReady) onReady(false, name); };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    /* ── Utilidades matemáticas expuestas al sandbox ── */
    randomInt: function(min, max) {
      min = Math.ceil(Number(min)||0);
      max = Math.floor(Number(max)||0);
      if (min > max) { var t=min; min=max; max=t; }
      return Math.floor(Math.random()*(max-min+1))+min;
    },
    randomFloat: function(min, max) {
      min = Number(min)||0; max = Number(max)||1;
      return Math.random()*(max-min)+min;
    },
    distance: function(x1,y1,x2,y2) {
      var dx=Number(x2)-Number(x1), dy=Number(y2)-Number(y1);
      return Math.sqrt(dx*dx+dy*dy);
    },
    /* ── Sonido simple por Web Audio ── */
    playTone: function(freq, duration) {
      try {
        var actx = window._simAudioCtx;
        if (!actx) actx = window._simAudioCtx = new (window.AudioContext||window.webkitAudioContext)();
        var osc = actx.createOscillator();
        var gain = actx.createGain();
        osc.frequency.value = Number(freq)||440;
        gain.gain.setValueAtTime(0.3, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + (Number(duration)||0.3));
        osc.connect(gain); gain.connect(actx.destination);
        osc.start(); osc.stop(actx.currentTime + (Number(duration)||0.3));
        _activeOscillators.push(osc);
        osc.onended = function () {
          var i = _activeOscillators.indexOf(osc);
          if (i >= 0) _activeOscillators.splice(i, 1);
        };
      } catch(e) {}
    },

    /* ── Melodía: secuencia de notas (Hz) separadas por coma,
       cada una con la misma duración, sin bloquear el juego.
       Ej: playMelody("262,330,392,523", 0.3) ── */
    playMelody: function(notes, duration) {
      var list = String(notes || '')
        .split(',')
        .map(function (n) { return Number(String(n).trim()); })
        .filter(function (n) { return !isNaN(n) && n > 0; });
      var dur = Number(duration) || 0.3;
      var self = this;
      list.forEach(function (freq, i) {
        var t = setTimeout(function () {
          self.playTone(freq, dur);
        }, i * dur * 1000);
        _melodyTimers.push(t);
      });
    },

    /* ── Detiene cualquier tono/melodía en curso ── */
    stopSound: function() {
      _melodyTimers.forEach(function (t) { clearTimeout(t); });
      _melodyTimers.length = 0;
      _activeOscillators.forEach(function (osc) {
        try { osc.stop(); } catch (e) {}
      });
      _activeOscillators.length = 0;
    },

    /* ── Lápiz ── */
    penDown:  function(x, y) {
      if (x !== undefined && x !== null && x !== '' &&
          y !== undefined && y !== null && y !== '') {
        /* Teletransportar: mover sprite y limpiar lastX/lastY para que
           el primer trazo parta desde el nuevo punto, sin diagonal */
        _pen.down  = false;
        _pen.lastX = null;
        _pen.lastY = null;
        _sprite.x  = Number(x) || 0;
        _sprite.y  = Number(y) || 0;
      }
      _pen.down  = true;
      _pen.lastX = _sprite.x;
      _pen.lastY = _sprite.y;
      console.log('[GameEngine] penDown:', _sprite.x, _sprite.y);
    },
    penUp:    function() { _pen.down = false; },
    penMoveTo: function(x, y) {
      /* Mueve el lapiz a X,Y SIN dibujar, aunque este bajado */
      var wasDown = _pen.down;
      _pen.down  = false;
      _pen.lastX = null;
      _pen.lastY = null;
      _sprite.x  = Number(x) || 0;
      _sprite.y  = Number(y) || 0;
      _pen.down  = wasDown;
      _pen.lastX = _sprite.x;
      _pen.lastY = _sprite.y;
      console.log('[GameEngine] penMoveTo:', _sprite.x, _sprite.y);
    },
    penSetColor: function(color) { _pen.color = String(color||'#ff0000'); },
    penSetSize:  function(size)  { _pen.size  = Math.max(1, Number(size)||3); },
    penClear: function() {
      var ctx = _getCtx(); if (!ctx) return;
      _drawBg(ctx);
    },
    penStamp: function() {
      var ctx = _getCtx(); if (!ctx) return;
      /* Igual que drawSprite(): sin "crear personaje" no hay nada
         que estampar. */
      if (!_sprite.created) return;
      /* x,y = esquina superior izquierda, igual que drawSprite() y el
         resto del motor. Antes esta función trataba x,y como el
         CENTRO del sprite, así que el sello quedaba desplazado
         w/2,h/2 px respecto a la posición real visible del sprite. */
      var x = _sprite.x, y = _sprite.y, w = _sprite.w, h = _sprite.h;
      if (_sprite.imgReady && _sprite.img) {
        _drawSpriteImage(ctx, _sprite.img, x, y, w, h, _sprite.flipX, _sprite.flipY, _sprite.angle);
      } else {
        ctx.fillStyle = _sprite.color;
        _fillRoundRect(ctx, x, y, w, h, 4);
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
  if (typeof runner  !== 'undefined' && runner)      { clearTimeout(runner);         runner = null; }
  if (typeof _rafId  !== 'undefined' && _rafId)      { cancelAnimationFrame(_rafId); _rafId = null; }
  if (typeof interpreter !== 'undefined' && interpreter) { interpreter = null; }
  if (typeof Code !== 'undefined' && Code && Code.workspace) Code.workspace.highlightBlock(null);
  GameEngine.stopSound();
  GameEngine.stop();
}

function resetGame() {
  stopGame();
  GameEngine.start(
    document.getElementById('gameCanvas').width,
    document.getElementById('gameCanvas').height
  );
}