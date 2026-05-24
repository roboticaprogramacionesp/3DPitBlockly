/* ============================================================
   COMPONENTS.JS — Botón, Resistencia, DHT11, Buzzer, Servo
   ============================================================ */

/* ────────────────────────────────────────
   BOTÓN TÁCTIL
───────────────────────────────────────── */
(function () {
  const BUTTON_DEF = {
    type: 'button',
    label: 'Botón',
    category: 'Entradas',
    icon: '🔘',
    description: 'Pulsador táctil',
    width: 60,
    height: 70,

    defaultProps: { label: 'BTN', pullup: 'true' },
    props: [
      { id: 'label',  label: 'Etiqueta', type: 'text', default: 'BTN' },
      {
        id: 'pullup', label: 'Pull-up', type: 'select', default: 'true',
        options: [
          { value: 'true',  label: 'Sí (Pull-up)' },
          { value: 'false', label: 'No (Pull-down)' },
        ],
      },
    ],

    render(props) {
      const p = props || {};
      return `
        <div class="comp-body" style="position:relative;width:60px;height:70px;text-align:center;">
          <svg width="60" height="70" xmlns="http://www.w3.org/2000/svg">
            <!-- Base cuadrada -->
            <rect x="10" y="10" width="40" height="30" rx="4"
                  fill="#1a1a2e" stroke="#3454d1" stroke-width="1.5"/>
            <!-- Botón central -->
            <rect x="20" y="15" width="20" height="20" rx="3"
                  fill="#2a2a4a" stroke="#4464e1" stroke-width="1"
                  class="btn-cap" style="cursor:pointer"/>
            <!-- Label -->
            <text x="30" y="28" text-anchor="middle"
                  fill="#8888cc" font-size="7" font-family="Consolas" class="btn-label">${p.label || 'BTN'}</text>
            <!-- 4 pines -->
            <line x1="18" y1="40" x2="18" y2="60" stroke="#aaa" stroke-width="2"/>
            <line x1="26" y1="40" x2="26" y2="60" stroke="#aaa" stroke-width="2"/>
            <line x1="34" y1="40" x2="34" y2="60" stroke="#aaa" stroke-width="2"/>
            <line x1="42" y1="40" x2="42" y2="60" stroke="#aaa" stroke-width="2"/>
            <text x="18" y="66" text-anchor="middle" fill="#555" font-size="5.5" font-family="Consolas">1</text>
            <text x="26" y="66" text-anchor="middle" fill="#555" font-size="5.5" font-family="Consolas">2</text>
            <text x="34" y="66" text-anchor="middle" fill="#555" font-size="5.5" font-family="Consolas">3</text>
            <text x="42" y="66" text-anchor="middle" fill="#555" font-size="5.5" font-family="Consolas">4</text>
          </svg>
        </div>
      `;
    },

    pins: [
      { id: 'P1', label: 'Pin 1', type: 'io',  x: 18, y: 62 },
      { id: 'P2', label: 'Pin 2', type: 'io',  x: 26, y: 62 },
      { id: 'P3', label: 'Pin 3', type: 'io',  x: 34, y: 62 },
      { id: 'P4', label: 'Pin 4', type: 'gnd', x: 42, y: 62 },
    ],

    onPropChange(comp, propId, value) {
      if (propId === 'label') {
        const lbl = comp.element.querySelector('.btn-label');
        if (lbl) lbl.textContent = value;
      }
    },

    runtimeInit(comp) {
      comp.runtimeState.pressed = false;
      const cap = comp.element.querySelector('.btn-cap');
      if (cap) {
        cap.addEventListener('mousedown', () => {
          comp.runtimeState.pressed = true;
          cap.setAttribute('fill', '#4454a1');
        });
        cap.addEventListener('mouseup', () => {
          comp.runtimeState.pressed = false;
          cap.setAttribute('fill', '#2a2a4a');
        });
        cap.addEventListener('mouseleave', () => {
          comp.runtimeState.pressed = false;
          cap.setAttribute('fill', '#2a2a4a');
        });
      }
    },

    getValue(comp) {
      const pullup = comp.props.pullup === 'true';
      return comp.runtimeState.pressed ? (pullup ? 0 : 1) : (pullup ? 1 : 0);
    },
  };

  _register(BUTTON_DEF);
})();


/* ────────────────────────────────────────
   RESISTENCIA
───────────────────────────────────────── */
(function () {
  const RESISTOR_DEF = {
    type: 'resistor',
    label: 'Resistencia',
    category: 'Pasivos',
    icon: '〰️',
    description: 'Resistencia eléctrica',
    width: 80,
    height: 40,

    defaultProps: { ohms: '220', tolerance: '5' },
    props: [
      { id: 'ohms',      label: 'Valor (Ω)', type: 'text', default: '220' },
      {
        id: 'tolerance', label: 'Tolerancia', type: 'select', default: '5',
        options: [
          { value: '1',  label: '±1% (Marrón)' },
          { value: '5',  label: '±5% (Dorado)' },
          { value: '10', label: '±10% (Plateado)' },
        ],
      },
    ],

    render(props) {
      const p = props || {};
      const ohms = p.ohms || '220';
      const bands = _ohmsToColorBands(parseInt(ohms) || 220);
      return `
        <div class="comp-body" style="position:relative;width:80px;height:40px;">
          <svg width="80" height="40" xmlns="http://www.w3.org/2000/svg">
            <!-- Pin izquierdo -->
            <line x1="0" y1="20" x2="16" y2="20" stroke="#aaa" stroke-width="2"/>
            <!-- Cuerpo -->
            <rect x="16" y="12" width="48" height="16" rx="8"
                  fill="#d4b896" stroke="#a08060" stroke-width="1"/>
            <!-- Bandas de color -->
            <rect x="24" y="12" width="5" height="16" rx="1" fill="${bands[0]}"/>
            <rect x="31" y="12" width="5" height="16" rx="1" fill="${bands[1]}"/>
            <rect x="38" y="12" width="5" height="16" rx="1" fill="${bands[2]}"/>
            <rect x="50" y="12" width="5" height="16" rx="1" fill="#c8a830"/>
            <!-- Pin derecho -->
            <line x1="64" y1="20" x2="80" y2="20" stroke="#aaa" stroke-width="2"/>
            <!-- Valor -->
            <text x="40" y="36" text-anchor="middle"
                  fill="#666" font-size="6.5" font-family="Consolas">${_formatOhms(ohms)}Ω</text>
          </svg>
        </div>
      `;
    },

    pins: [
      { id: 'L', label: 'Terminal 1', type: 'io', x: 0,  y: 20 },
      { id: 'R', label: 'Terminal 2', type: 'io', x: 80, y: 20 },
    ],

    onPropChange(comp, propId) {
      if (propId === 'ohms') {
        // Re-renderizar bandas
        const ohms = parseInt(comp.props.ohms) || 220;
        const bands = _ohmsToColorBands(ohms);
        const rects = comp.element.querySelectorAll('.comp-body rect');
        if (rects[1]) rects[1].setAttribute('fill', bands[0]);
        if (rects[2]) rects[2].setAttribute('fill', bands[1]);
        if (rects[3]) rects[3].setAttribute('fill', bands[2]);
        const txt = comp.element.querySelector('text');
        if (txt) txt.textContent = _formatOhms(String(ohms)) + 'Ω';
      }
    },
  };

  function _ohmsToColorBands(ohms) {
    const colors = ['#000','#7a4a00','#cc0000','#ff6600','#ffcc00','#00aa00','#0000cc','#9900aa','#888888','#ffffff'];
    let val = ohms;
    let mult = 0;
    while (val >= 100) { val = Math.round(val / 10); mult++; }
    const d1 = Math.floor(val / 10) % 10;
    const d2 = val % 10;
    return [colors[d1], colors[d2], colors[mult]];
  }

  function _formatOhms(val) {
    const n = parseInt(val);
    if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
    if (n >= 1000)    return (n/1000).toFixed(1) + 'k';
    return String(n);
  }

  _register(RESISTOR_DEF);
})();


/* ────────────────────────────────────────
   DHT11 — Sensor temperatura/humedad
───────────────────────────────────────── */
(function () {
  const DHT11_DEF = {
    type: 'dht11',
    label: 'DHT11',
    category: 'Sensores',
    icon: '🌡️',
    description: 'Temperatura y Humedad',
    width: 50,
    height: 75,

    defaultProps: { simTemp: '25', simHum: '60' },
    props: [
      { id: 'simTemp', label: 'Temp. sim (°C)', type: 'text', default: '25' },
      { id: 'simHum',  label: 'Hum. sim (%)',   type: 'text', default: '60' },
    ],

    render() {
      return `
        <div class="comp-body" style="position:relative;width:50px;height:75px;text-align:center;">
          <svg width="50" height="75" xmlns="http://www.w3.org/2000/svg">
            <!-- Cuerpo azul -->
            <rect x="5" y="5" width="40" height="50" rx="5"
                  fill="#1565c0" stroke="#0d47a1" stroke-width="1.5"/>
            <!-- Rejilla de ventilación -->
            <rect x="10" y="12" width="30" height="2" rx="1" fill="#0d47a1" opacity="0.6"/>
            <rect x="10" y="17" width="30" height="2" rx="1" fill="#0d47a1" opacity="0.6"/>
            <rect x="10" y="22" width="30" height="2" rx="1" fill="#0d47a1" opacity="0.6"/>
            <rect x="10" y="27" width="30" height="2" rx="1" fill="#0d47a1" opacity="0.6"/>
            <rect x="10" y="32" width="30" height="2" rx="1" fill="#0d47a1" opacity="0.6"/>
            <!-- Label -->
            <text x="25" y="46" text-anchor="middle"
                  fill="#90caf9" font-size="7" font-family="Consolas" font-weight="bold">DHT11</text>
            <!-- 3 pines -->
            <line x1="14" y1="55" x2="14" y2="70" stroke="#aaa" stroke-width="2"/>
            <line x1="25" y1="55" x2="25" y2="70" stroke="#aaa" stroke-width="2"/>
            <line x1="36" y1="55" x2="36" y2="70" stroke="#aaa" stroke-width="2"/>
            <text x="14" y="74" text-anchor="middle" fill="#555" font-size="5.5" font-family="Consolas">+</text>
            <text x="25" y="74" text-anchor="middle" fill="#555" font-size="5.5" font-family="Consolas">D</text>
            <text x="36" y="74" text-anchor="middle" fill="#555" font-size="5.5" font-family="Consolas">-</text>
          </svg>
        </div>
      `;
    },

    pins: [
      { id: 'VCC',  label: 'VCC (3.3V/5V)', type: 'power', x: 14, y: 72 },
      { id: 'DATA', label: 'Data',           type: 'io',    x: 25, y: 72 },
      { id: 'GND',  label: 'GND',            type: 'gnd',   x: 36, y: 72 },
    ],

    getValue(comp, channel) {
      if (channel === 'temp') return parseFloat(comp.props.simTemp) || 25;
      if (channel === 'hum')  return parseFloat(comp.props.simHum)  || 60;
      return 0;
    },
  };

  _register(DHT11_DEF);
})();


/* ────────────────────────────────────────
   BUZZER
───────────────────────────────────────── */
(function () {
  const BUZZER_DEF = {
    type: 'buzzer',
    label: 'Buzzer',
    category: 'Salidas',
    icon: '🔊',
    description: 'Buzzer piezoeléctrico',
    width: 50,
    height: 65,

    defaultProps: { label: 'BZ' },
    props: [{ id: 'label', label: 'Etiqueta', type: 'text', default: 'BZ' }],

    render(props) {
      const p = props || {};
      return `
        <div class="comp-body" style="position:relative;width:50px;height:65px;text-align:center;">
          <svg width="50" height="65" xmlns="http://www.w3.org/2000/svg">
            <!-- Base -->
            <rect x="10" y="30" width="30" height="6" rx="2" fill="#222" stroke="#444" stroke-width="1"/>
            <!-- Cuerpo cilíndrico -->
            <ellipse cx="25" cy="20" rx="18" ry="18" fill="#111" stroke="#333" stroke-width="1.5"/>
            <!-- Círculo interior -->
            <ellipse cx="25" cy="20" rx="10" ry="10" fill="#1a1a1a" stroke="#222" stroke-width="1"/>
            <ellipse cx="25" cy="20" rx="4" ry="4" fill="#2a2a2a" stroke="#333" stroke-width="0.5"/>
            <!-- + / - label -->
            <text x="25" y="12" text-anchor="middle"
                  fill="#666" font-size="7" font-family="Consolas">+</text>
            <!-- Pines -->
            <line x1="20" y1="36" x2="20" y2="58" stroke="#aaa" stroke-width="2"/>
            <line x1="30" y1="36" x2="30" y2="58" stroke="#aaa" stroke-width="2"/>
            <text x="20" y="63" text-anchor="middle" fill="#555" font-size="5.5" font-family="Consolas">+</text>
            <text x="30" y="63" text-anchor="middle" fill="#555" font-size="5.5" font-family="Consolas">-</text>
          </svg>
        </div>
      `;
    },

    pins: [
      { id: 'POS', label: 'Positivo (+)', type: 'io',  x: 20, y: 60 },
      { id: 'NEG', label: 'Negativo (-)', type: 'gnd', x: 30, y: 60 },
    ],

    setValue(comp, value) {
      comp.runtimeState.on = !!value;
      const body = comp.element.querySelector('ellipse');
      if (body) {
        body.setAttribute('stroke', value ? '#00e676' : '#333');
        body.style.filter = value ? 'drop-shadow(0 0 4px #00e676)' : 'none';
      }
    },
  };

  _register(BUZZER_DEF);
})();


/* ────────────────────────────────────────
   RESISTENCIA PULL-UP / PULL-DOWN (helper visual)
   NeoPixel (WS2812)
───────────────────────────────────────── */
(function () {
  const NEOPIXEL_DEF = {
    type: 'neopixel',
    label: 'NeoPixel',
    category: 'Salidas',
    icon: '🌈',
    description: 'LED RGB WS2812',
    width: 50,
    height: 65,

    defaultProps: { label: 'NP' },
    props: [{ id: 'label', label: 'Etiqueta', type: 'text', default: 'NP' }],

    render(props) {
      const p = props || {};
      return `
        <div class="comp-body" style="position:relative;width:50px;height:65px;text-align:center;">
          <svg width="50" height="65" xmlns="http://www.w3.org/2000/svg">
            <!-- PCB cuadrado -->
            <rect x="5" y="5" width="40" height="40" rx="3"
                  fill="#1a2a1a" stroke="#2d4a2d" stroke-width="1.5"/>
            <!-- LED RGB central -->
            <rect x="15" y="12" width="20" height="20" rx="2"
                  fill="#111" stroke="#333" stroke-width="1"/>
            <!-- 3 chips RGB -->
            <rect x="17" y="14" width="5" height="5" rx="1" fill="#2a0000" class="np-r"/>
            <rect x="23" y="14" width="5" height="5" rx="1" fill="#002a00" class="np-g"/>
            <rect x="29" y="14" width="5" height="5" rx="1" fill="#00002a" class="np-b"/>
            <!-- Mezcla -->
            <rect x="17" y="21" width="17" height="9" rx="1" fill="#0a0a0a" class="np-mix"/>
            <!-- Label -->
            <text x="25" y="40" text-anchor="middle"
                  fill="#4a7a4a" font-size="7" font-family="Consolas">${p.label || 'NP'}</text>
            <!-- Pines -->
            <line x1="15" y1="45" x2="15" y2="58" stroke="#aaa" stroke-width="2"/>
            <line x1="25" y1="45" x2="25" y2="58" stroke="#aaa" stroke-width="2"/>
            <line x1="35" y1="45" x2="35" y2="58" stroke="#aaa" stroke-width="2"/>
            <text x="15" y="63" text-anchor="middle" fill="#555" font-size="5.5" font-family="Consolas">+</text>
            <text x="25" y="63" text-anchor="middle" fill="#555" font-size="5.5" font-family="Consolas">D</text>
            <text x="35" y="63" text-anchor="middle" fill="#555" font-size="5.5" font-family="Consolas">-</text>
          </svg>
        </div>
      `;
    },

    pins: [
      { id: 'VCC',  label: '5V',          type: 'power', x: 15, y: 60 },
      { id: 'DIN',  label: 'Data In',     type: 'io',    x: 25, y: 60 },
      { id: 'GND',  label: 'GND',         type: 'gnd',   x: 35, y: 60 },
    ],

    setValue(comp, r, g, b) {
      comp.runtimeState.color = { r, g, b };
      const cr = comp.element.querySelector('.np-r');
      const cg = comp.element.querySelector('.np-g');
      const cb = comp.element.querySelector('.np-b');
      const mix= comp.element.querySelector('.np-mix');
      if (cr)  cr.setAttribute('fill',  `rgb(${r},0,0)`);
      if (cg)  cg.setAttribute('fill',  `rgb(0,${g},0)`);
      if (cb)  cb.setAttribute('fill',  `rgb(0,0,${b})`);
      if (mix) {
        mix.setAttribute('fill', `rgb(${r},${g},${b})`);
        mix.style.filter = (r || g || b) ? `drop-shadow(0 0 4px rgb(${r},${g},${b}))` : 'none';
      }
    },
  };

  _register(NEOPIXEL_DEF);
})();


/* ── Helper compartido ── */
function _register(def) {
  if (typeof Simulator !== 'undefined') {
    Simulator.registerComponent(def);
  } else {
    document.addEventListener('DOMContentLoaded', () => Simulator.registerComponent(def));
  }
}