/* ============================================================
   WEMOS-D1-R32.JS — Wemos D1 R32 (ESP32)
   Vista: SVG original de Fritzing escalado a 280×213px
   Pines: posiciones exactas del connector ID del Fritzing
   ============================================================ */

   (function () {

    /* Dimensiones de display (SVG original: 2762.8 × 2100 unidades) */
    const SCALE = 280 / 2762.8;   // ≈ 0.1013
    const W = 280;
    const H = Math.round(2100 * SCALE); // 213
  
    /* Ruta al SVG de Fritzing — ajusta si tu estructura de carpetas es diferente */
    const SVG_SRC = 'static/simulator/components/Wemos-D1-R32_1_breadboard.svg';
  
    /* ── Posiciones de pines escaladas desde coordenadas Fritzing ──
       Cada pin tiene x,y relativo al componente en el canvas.
       Origen: esquina superior-izquierda del componente.
       Las coordenadas son: conn_x * SCALE, conn_y * SCALE
    ── */
    function _buildPins() {
      const S = SCALE;
  
      /* Mapeo connectorN → { label, type, gpio, fx, fy }
         fx/fy = coordenadas originales en el SVG de Fritzing */
      const pinMap = [
        // ── BOTTOM ROW (fy ≈ 1981) ──────────────────────────────
        { conn:  0, label: 'NC',    type: 'io',    gpio: null, fx: 1143.5, fy: 1980.7 },
        { conn:  1, label: '5V',    type: 'power', gpio: null, fx: 1243.5, fy: 1980.7 },
        { conn:  2, label: 'RST',   type: 'power', gpio: null, fx: 1343.5, fy: 1980.7 },
        { conn:  3, label: '3V3',   type: 'power', gpio: null, fx: 1443.5, fy: 1980.7 },
        { conn:  4, label: '5V',    type: 'power', gpio: null, fx: 1543.5, fy: 1980.7 },
        { conn:  5, label: 'GND',   type: 'gnd',   gpio: null, fx: 1643.5, fy: 1980.7 },
        { conn:  6, label: 'GND',   type: 'gnd',   gpio: null, fx: 1743.5, fy: 1980.7 },
        { conn:  7, label: 'VN/39', type: 'io',    gpio: 39,   fx: 1843.5, fy: 1980.7 },
        { conn:  8, label: 'IO2',   type: 'io',    gpio: 2,    fx: 2043.5, fy: 1980.7 },
        { conn:  9, label: 'IO4',   type: 'io',    gpio: 4,    fx: 2143.5, fy: 1980.7 },
        { conn: 10, label: 'IO35',  type: 'io',    gpio: 35,   fx: 2243.5, fy: 1980.7 },
        { conn: 11, label: 'IO34',  type: 'io',    gpio: 34,   fx: 2343.5, fy: 1980.7 },
        { conn: 12, label: 'IO36',  type: 'io',    gpio: 36,   fx: 2443.5, fy: 1980.7 },
        { conn: 13, label: 'IO39',  type: 'io',    gpio: 39,   fx: 2543.5, fy: 1980.7 },
  
        // ── TOP ROW derecha (fy ≈ 119) ──────────────────────────
        { conn: 14, label: 'RX0',   type: 'io',    gpio: 3,    fx: 2582.2, fy: 119.3 },
        { conn: 15, label: 'TX0',   type: 'io',    gpio: 1,    fx: 2482.1, fy: 119.3 },
        { conn: 16, label: 'IO26',  type: 'io',    gpio: 26,   fx: 2382.1, fy: 119.3 },
        { conn: 17, label: 'IO25',  type: 'io',    gpio: 25,   fx: 2282.1, fy: 119.3 },
        { conn: 18, label: 'IO17',  type: 'io',    gpio: 17,   fx: 2182.2, fy: 119.3 },
        { conn: 19, label: 'IO16',  type: 'io',    gpio: 16,   fx: 2082.2, fy: 119.3 },
        { conn: 20, label: 'IO27',  type: 'io',    gpio: 27,   fx: 1982.1, fy: 119.3 },
        { conn: 21, label: 'IO14',  type: 'io',    gpio: 14,   fx: 1882.1, fy: 119.3 },
  
        // ── TOP ROW izquierda (fy ≈ 81) ─────────────────────────
        { conn: 22, label: 'IO12',  type: 'io',    gpio: 12,   fx: 1682.7, fy: 80.7 },
        { conn: 23, label: 'IO13',  type: 'io',    gpio: 13,   fx: 1582.7, fy: 80.7 },
        { conn: 24, label: 'IO5',   type: 'io',    gpio: 5,    fx: 1482.7, fy: 80.7 },
        { conn: 25, label: 'IO23',  type: 'io',    gpio: 23,   fx: 1382.7, fy: 80.7 },
        { conn: 26, label: 'IO19',  type: 'io',    gpio: 19,   fx: 1282.7, fy: 80.7 },
        { conn: 27, label: 'IO18',  type: 'io',    gpio: 18,   fx: 1182.7, fy: 80.7 },
        { conn: 28, label: 'GND',   type: 'gnd',   gpio: null, fx: 1082.7, fy: 80.7 },
        { conn: 29, label: 'RST',   type: 'power', gpio: null, fx:  982.7, fy: 80.7 },
        { conn: 30, label: 'SDA',   type: 'io',    gpio: 21,   fx:  882.7, fy: 80.7 },
        { conn: 31, label: 'SCL',   type: 'io',    gpio: 22,   fx:  782.7, fy: 80.7 },
  
        // ── CENTER INFERIOR: IO15 IO33 IO32 (fy ≈ 1719) ─────────
        { conn: 32, label: 'IO15',  type: 'io',    gpio: 15,   fx: 1444.9, fy: 1719.0 },
        { conn: 33, label: 'IO33',  type: 'io',    gpio: 33,   fx: 1544.9, fy: 1719.0 },
        { conn: 34, label: 'IO32',  type: 'io',    gpio: 32,   fx: 1644.9, fy: 1719.0 },
  
        // ── CENTER SUPERIOR: SD/Flash (fy ≈ 419) ─────────────────
        { conn: 35, label: 'SD1',   type: 'io',    gpio: 8,    fx: 1998.9, fy: 418.6 },
        { conn: 36, label: 'SD0',   type: 'io',    gpio: 7,    fx: 1898.9, fy: 418.6 },
        { conn: 37, label: 'CLK',   type: 'io',    gpio: 6,    fx: 1798.9, fy: 418.6 },
        { conn: 38, label: 'CMD',   type: 'io',    gpio: 11,   fx: 1698.9, fy: 418.6 },
        { conn: 39, label: 'SD3',   type: 'io',    gpio: 10,   fx: 1598.9, fy: 418.6 },
        { conn: 40, label: 'SD2',   type: 'io',    gpio: 9,    fx: 1498.7, fy: 418.6 },
      ];
  
      return pinMap.map(p => ({
        id:    'conn' + p.conn,
        label: p.label,
        type:  p.type,
        gpio:  p.gpio,
        x:     Math.round(p.fx * S * 10) / 10,
        y:     Math.round(p.fy * S * 10) / 10,
      }));
    }
  
    /* ── Definición del componente ── */
    const WEMOS_DEF = {
      type:        'wemos-d1-r32',
      label:       'Wemos D1 R32',
      category:    'Microcontrolador',
      icon:        '🤖',
      description: 'ESP32 · 41 pines',
      width:  W,
      height: H,
  
      defaultProps: { name: 'wemos1', freq: '240' },
  
      props: [
        { id: 'name', label: 'Nombre', type: 'text', default: 'wemos1' },
        {
          id: 'freq', label: 'Freq (MHz)', type: 'select', default: '240',
          options: [
            { value: '80',  label: '80 MHz'  },
            { value: '160', label: '160 MHz' },
            { value: '240', label: '240 MHz' },
          ],
        },
      ],
  
      render() {
        /* Usamos el SVG de Fritzing como imagen de fondo.
           Los pines `.sim-pin` los pone el simulador encima,
           posicionados con las coordenadas de _buildPins(). */
        return `
          <div class="comp-body" style="
            position: relative;
            width: ${W}px;
            height: ${H}px;
            ">
            <img
              src="${SVG_SRC}"
              width="${W}"
              height="${H}"
              draggable="false"
              style="display:block; pointer-events:none; user-select:none;"
            />
          </div>`;
      },
  
      pins: _buildPins(),
  
      onPropChange(comp, propId, value) {},
  
      runtimeInit(comp) {
        comp.runtimeState.gpio = {};
        for (let i = 0; i <= 39; i++) {
          comp.runtimeState.gpio[i] = { mode: 'input', value: 0 };
        }
      },
    };
  
    /* ── Registro ── */
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => Simulator.registerComponent(WEMOS_DEF));
    } else {
      Simulator.registerComponent(WEMOS_DEF);
    }
  
  })();