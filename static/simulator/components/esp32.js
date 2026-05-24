/* ============================================================
   ESP32.JS — Definición visual del componente ESP32
   Pines reales del ESP32 DevKit v1 (38 pines)
   ============================================================ */

(function () {

  const ESP32_DEF = {
    type: 'esp32',
    label: 'ESP32',
    category: 'Microcontrolador',
    icon: '🤖',
    description: 'ESP32 DevKit v1',
    width: 160,
    height: 300,

    defaultProps: {
      name: 'esp32',
      freq: '240',
    },

    props: [
      {
        id: 'name',
        label: 'Nombre',
        type: 'text',
        default: 'esp32',
      },
      {
        id: 'freq',
        label: 'Freq (MHz)',
        type: 'select',
        default: '240',
        options: [
          { value: '80',  label: '80 MHz' },
          { value: '160', label: '160 MHz' },
          { value: '240', label: '240 MHz' },
        ],
      },
    ],

    /* Render SVG del ESP32 */
    render() {
      return `
        <div class="comp-body" style="position:relative; width:160px; height:300px; font-family:'Consolas',monospace;">
          <svg width="160" height="300" xmlns="http://www.w3.org/2000/svg">
            <!-- PCB principal -->
            <rect x="20" y="5" width="120" height="290" rx="6" ry="6"
                  fill="#1a2a1a" stroke="#2d4a2d" stroke-width="1.5"/>

            <!-- Chip principal -->
            <rect x="45" y="80" width="70" height="60" rx="3"
                  fill="#111" stroke="#333" stroke-width="1"/>
            <text x="80" y="106" text-anchor="middle"
                  fill="#555" font-size="7" font-family="Consolas">ESP32</text>
            <text x="80" y="117" text-anchor="middle"
                  fill="#444" font-size="6">WROOM-32</text>

            <!-- Módulo antena WiFi/BT (arriba) -->
            <rect x="50" y="10" width="60" height="68" rx="3"
                  fill="#1e2e1e" stroke="#2d4a2d" stroke-width="1"/>
            <text x="80" y="52" text-anchor="middle"
                  fill="#3a5a3a" font-size="7">WiFi+BT</text>
            <!-- Antena decorativa -->
            <line x1="98" y1="15" x2="98" y2="75" stroke="#2d4a2d" stroke-width="0.5"/>
            <line x1="96" y1="15" x2="100" y2="15" stroke="#2d4a2d" stroke-width="0.5"/>
            <line x1="96" y1="25" x2="100" y2="25" stroke="#2d4a2d" stroke-width="0.5"/>
            <line x1="96" y1="35" x2="100" y2="35" stroke="#2d4a2d" stroke-width="0.5"/>
            <line x1="96" y1="45" x2="100" y2="45" stroke="#2d4a2d" stroke-width="0.5"/>

            <!-- Conectores USB -->
            <rect x="60" y="275" width="40" height="18" rx="2"
                  fill="#222" stroke="#444" stroke-width="1"/>
            <text x="80" y="287" text-anchor="middle"
                  fill="#555" font-size="7">USB</text>

            <!-- Botones EN / BOOT -->
            <rect x="25" y="165" width="18" height="10" rx="2"
                  fill="#1a3a1a" stroke="#2d5a2d" stroke-width="1"/>
            <text x="34" y="173" text-anchor="middle"
                  fill="#4a7a4a" font-size="5">EN</text>

            <rect x="25" y="185" width="18" height="10" rx="2"
                  fill="#1a3a1a" stroke="#2d5a2d" stroke-width="1"/>
            <text x="34" y="193" text-anchor="middle"
                  fill="#4a7a4a" font-size="5">BOOT</text>

            <!-- LED de poder -->
            <circle cx="130" cy="155" r="4" fill="#003300" stroke="#005500" stroke-width="1"
                    class="esp32-pwr-led"/>
            <text x="130" y="168" text-anchor="middle"
                  fill="#2d4a2d" font-size="5">PWR</text>

            <!-- Labels izquierda (GPIO) -->
            ${_leftPinLabels()}
            <!-- Labels derecha (GPIO) -->
            ${_rightPinLabels()}

            <!-- Líneas de pad de pines -->
            ${_pinPads()}
          </svg>
        </div>
      `;
    },

    /* Pines físicos con posición relativa al componente */
    pins: _buildPins(),

    onPropChange(comp, propId, value) {
      // Nada por ahora en fase 1
    },

    /* Estado de simulación de cada GPIO */
    runtimeInit(comp) {
      comp.runtimeState.gpio = {};
      for (let i = 0; i <= 39; i++) {
        comp.runtimeState.gpio[i] = { mode: 'input', value: 0 };
      }
    },
  };

  /* ── Pin layout del ESP32 DevKit v1 ── */
  function _buildPins() {
    // Lado izquierdo: pins top→bottom (x=20)
    // Lado derecho: pins top→bottom (x=160)
    const leftPins = [
      { id: 'EN',   label: 'EN',    type: 'power', gpio: null },
      { id: 'VP',   label: 'VP/36', type: 'io',    gpio: 36  },
      { id: 'VN',   label: 'VN/39', type: 'io',    gpio: 39  },
      { id: 'D34',  label: 'IO34',  type: 'io',    gpio: 34  },
      { id: 'D35',  label: 'IO35',  type: 'io',    gpio: 35  },
      { id: 'D32',  label: 'IO32',  type: 'io',    gpio: 32  },
      { id: 'D33',  label: 'IO33',  type: 'io',    gpio: 33  },
      { id: 'D25',  label: 'IO25',  type: 'io',    gpio: 25  },
      { id: 'D26',  label: 'IO26',  type: 'io',    gpio: 26  },
      { id: 'D27',  label: 'IO27',  type: 'io',    gpio: 27  },
      { id: 'D14',  label: 'IO14',  type: 'io',    gpio: 14  },
      { id: 'D12',  label: 'IO12',  type: 'io',    gpio: 12  },
      { id: 'GND1', label: 'GND',   type: 'gnd',   gpio: null },
      { id: 'D13',  label: 'IO13',  type: 'io',    gpio: 13  },
      { id: 'SD2',  label: 'SD2',   type: 'io',    gpio: 9   },
      { id: 'SD3',  label: 'SD3',   type: 'io',    gpio: 10  },
      { id: 'CMD',  label: 'CMD',   type: 'io',    gpio: 11  },
      { id: '5V',   label: '5V',    type: 'power',  gpio: null },
      { id: '3V3',  label: '3V3',   type: 'power',  gpio: null },
    ];

    const rightPins = [
      { id: 'GND0', label: 'GND',   type: 'gnd',   gpio: null },
      { id: 'D23',  label: 'IO23',  type: 'io',    gpio: 23  },
      { id: 'D22',  label: 'IO22',  type: 'io',    gpio: 22  },
      { id: 'TX0',  label: 'TX0',   type: 'io',    gpio: 1   },
      { id: 'RX0',  label: 'RX0',   type: 'io',    gpio: 3   },
      { id: 'D21',  label: 'IO21',  type: 'io',    gpio: 21  },
      { id: 'GND2', label: 'GND',   type: 'gnd',   gpio: null },
      { id: 'D19',  label: 'IO19',  type: 'io',    gpio: 19  },
      { id: 'D18',  label: 'IO18',  type: 'io',    gpio: 18  },
      { id: 'D5',   label: 'IO5',   type: 'io',    gpio: 5   },
      { id: 'D17',  label: 'IO17',  type: 'io',    gpio: 17  },
      { id: 'D16',  label: 'IO16',  type: 'io',    gpio: 16  },
      { id: 'D4',   label: 'IO4',   type: 'io',    gpio: 4   },
      { id: 'D0',   label: 'IO0',   type: 'io',    gpio: 0   },
      { id: 'D2',   label: 'IO2',   type: 'io',    gpio: 2   },
      { id: 'D15',  label: 'IO15',  type: 'io',    gpio: 15  },
      { id: 'SD1',  label: 'SD1',   type: 'io',    gpio: 8   },
      { id: 'SD0',  label: 'SD0',   type: 'io',    gpio: 7   },
      { id: 'CLK',  label: 'CLK',   type: 'io',    gpio: 6   },
    ];

    const pins = [];
    const startY = 18;
    const stepY  = 15;

    leftPins.forEach((p, i) => {
      pins.push({ ...p, x: 20, y: startY + i * stepY });
    });
    rightPins.forEach((p, i) => {
      pins.push({ ...p, x: 140, y: startY + i * stepY });
    });

    return pins;
  }

  function _leftPinLabels() {
    const names = ['EN','36','39','34','35','32','33','25','26','27','14','12','GND','13','9','10','11','5V','3V3'];
    return names.map((n, i) => {
      const y = 23 + i * 15;
      const color = n === 'GND' ? '#607d8b' : n === '5V' || n === '3V3' ? '#e53935' : '#4caf50';
      return `<text x="42" y="${y}" text-anchor="end" fill="${color}" font-size="5.5" font-family="Consolas">${n}</text>`;
    }).join('');
  }

  function _rightPinLabels() {
    const names = ['GND','23','22','TX','RX','21','GND','19','18','5','17','16','4','0','2','15','8','7','6'];
    return names.map((n, i) => {
      const y = 23 + i * 15;
      const color = n === 'GND' ? '#607d8b' : n === 'TX' || n === 'RX' ? '#ff9800' : '#4caf50';
      return `<text x="118" y="${y}" text-anchor="start" fill="${color}" font-size="5.5" font-family="Consolas">${n}</text>`;
    }).join('');
  }

  function _pinPads() {
    let svg = '';
    // Pads izquierda
    for (let i = 0; i < 19; i++) {
      const y = 18 + i * 15;
      svg += `<rect x="16" y="${y - 3}" width="8" height="6" rx="1" fill="#b8a000" stroke="#8a7800" stroke-width="0.5"/>`;
    }
    // Pads derecha
    for (let i = 0; i < 19; i++) {
      const y = 18 + i * 15;
      svg += `<rect x="136" y="${y - 3}" width="8" height="6" rx="1" fill="#b8a000" stroke="#8a7800" stroke-width="0.5"/>`;
    }
    return svg;
  }

  /* Registrar cuando el DOM esté listo */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Simulator.registerComponent(ESP32_DEF));
  } else {
    Simulator.registerComponent(ESP32_DEF);
  }

})();