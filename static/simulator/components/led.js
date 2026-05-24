/* ============================================================
   LED.JS — Componente LED con animación de encendido/apagado
   ============================================================ */

(function () {

  const LED_DEF = {
    type: 'led',
    label: 'LED',
    category: 'Salidas',
    icon: '💡',
    description: 'Diodo emisor de luz',
    width: 60,
    height: 80,

    defaultProps: {
      color: 'red',
      label: 'LED',
    },

    props: [
      {
        id: 'color',
        label: 'Color',
        type: 'select',
        default: 'red',
        options: [
          { value: 'red',    label: '🔴 Rojo'   },
          { value: 'green',  label: '🟢 Verde'  },
          { value: 'blue',   label: '🔵 Azul'   },
          { value: 'yellow', label: '🟡 Amarillo'},
          { value: 'white',  label: '⚪ Blanco' },
          { value: 'orange', label: '🟠 Naranja' },
        ],
      },
      {
        id: 'label',
        label: 'Etiqueta',
        type: 'text',
        default: 'LED',
      },
    ],

    render(props) {
      const p = props || { color: 'red', label: 'LED' };
      const col = _ledColor(p.color || 'red');
      return `
        <div class="comp-body led-body" style="position:relative;width:60px;height:80px;text-align:center;">
          <svg width="60" height="80" xmlns="http://www.w3.org/2000/svg">
            <!-- Cuerpo del LED -->
            <ellipse cx="30" cy="28" rx="14" ry="14"
                     fill="${col.off}" stroke="${col.stroke}" stroke-width="1.5"
                     class="led-bulb"/>
            <!-- Cúpula reflex -->
            <ellipse cx="26" cy="22" rx="5" ry="3"
                     fill="rgba(255,255,255,0.15)" class="led-glint"/>
            <!-- Flat bottom del LED -->
            <rect x="16" y="38" width="28" height="5" rx="1"
                  fill="${col.stroke}" stroke="${col.stroke}" stroke-width="0.5"/>
            <!-- Pin Ánodo (A → +) -->
            <line x1="24" y1="43" x2="24" y2="72"
                  stroke="#aaa" stroke-width="2"/>
            <!-- Pin Cátodo (K → -) -->
            <line x1="36" y1="43" x2="36" y2="72"
                  stroke="#aaa" stroke-width="2"/>
            <!-- Label pines -->
            <text x="24" y="78" text-anchor="middle"
                  fill="#666" font-size="6" font-family="Consolas">A</text>
            <text x="36" y="78" text-anchor="middle"
                  fill="#666" font-size="6" font-family="Consolas">K</text>
            <!-- Etiqueta del componente -->
            <text x="30" y="62" text-anchor="middle"
                  fill="#888" font-size="7" font-family="Consolas" class="led-label">${p.label || 'LED'}</text>
          </svg>
        </div>
      `;
    },

    pins: [
      { id: 'A', label: 'Ánodo (+)',  type: 'io',  x: 24, y: 74 },
      { id: 'K', label: 'Cátodo (-)', type: 'gnd', x: 36, y: 74 },
    ],

    onPropChange(comp, propId, value) {
      if (propId === 'color') {
        const col = _ledColor(value);
        const bulb = comp.element.querySelector('.led-bulb');
        if (bulb) {
          bulb.setAttribute('fill', col.off);
          bulb.setAttribute('stroke', col.stroke);
          // Si está encendido, mantener encendido
          if (comp.runtimeState.on) _setLedOn(comp, true);
        }
      }
      if (propId === 'label') {
        const lbl = comp.element.querySelector('.led-label');
        if (lbl) lbl.textContent = value;
      }
    },

    /* Llamado por el runtime para encender/apagar el LED */
    setValue(comp, value) {
      const on = value === 1 || value === true;
      comp.runtimeState.on = on;
      _setLedOn(comp, on);
    },

    runtimeInit(comp) {
      comp.runtimeState.on = false;
    },
  };

  function _setLedOn(comp, on) {
    const color = comp.props.color || 'red';
    const col = _ledColor(color);
    const bulb = comp.element.querySelector('.led-bulb');
    if (!bulb) return;

    if (on) {
      bulb.setAttribute('fill', col.on);
      bulb.style.filter = `drop-shadow(0 0 6px ${col.on})`;
    } else {
      bulb.setAttribute('fill', col.off);
      bulb.style.filter = 'none';
    }
  }

  function _ledColor(color) {
    const map = {
      red:    { on: '#ff1744', off: '#3a0a0a', stroke: '#8b0000' },
      green:  { on: '#00e676', off: '#0a2a0a', stroke: '#005500' },
      blue:   { on: '#448aff', off: '#0a0a2a', stroke: '#000080' },
      yellow: { on: '#ffd740', off: '#2a2000', stroke: '#8a7000' },
      white:  { on: '#ffffff', off: '#2a2a2a', stroke: '#888888' },
      orange: { on: '#ff6d00', off: '#2a1000', stroke: '#7a3000' },
    };
    return map[color] || map.red;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Simulator.registerComponent(LED_DEF));
  } else {
    Simulator.registerComponent(LED_DEF);
  }

})();