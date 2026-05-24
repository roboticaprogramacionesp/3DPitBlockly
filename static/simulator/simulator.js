/* ============================================================
   SIMULATOR.JS — 3DPit Blocks · Motor del Simulador
   Fase 1 + 2: Canvas, Drag & Drop, Componentes, Conexiones
   ============================================================ */

   const Simulator = (function () {

    /* ── Estado global ── */
    const state = {
      components: [],       // { id, type, x, y, element, def, props, pins }
      wires: [],            // { id, fromComp, fromPin, toComp, toPin, element }
      selected: null,       // componente seleccionado
      nextId: 1,
      running: false,
      wireInProgress: null, // { fromComp, fromPin, x1, y1, svgLine }
      scale: 1,
      offsetX: 0,
      offsetY: 0,
    };
  
    /* ── Elementos DOM ── */
    let canvas, svg, emptyMsg, propsContent, statusDot, statusText, deleteBtn;
  
    /* ── Registro de definiciones de componentes ── */
    const componentDefs = {};
  
    function registerComponent(def) {
      componentDefs[def.type] = def;
    }
  
    /* ================================================================
       INIT
    ================================================================ */
    function init() {
      canvas      = document.getElementById('simCanvas');
      svg         = document.getElementById('simConnectionsSVG');
      emptyMsg    = document.getElementById('simEmptyMsg');
      propsContent= document.getElementById('simPropsContent');
      statusDot   = document.getElementById('simStatusDot');
      statusText  = document.getElementById('simStatusText');
      deleteBtn   = document.getElementById('btnDeleteComp');
  
      _setupCanvasDrop();
      _setupComponentList();
      _setupButtons();
      _setupSearch();
      _setupKeyboard();
  
      SimLog.init();
      SimLog.log('Simulador iniciado', 'ok');
    }
  
    /* ================================================================
       DRAG & DROP desde panel de componentes al canvas
    ================================================================ */
    function _setupComponentList() {
      document.querySelectorAll('.comp-item').forEach(item => {
        item.addEventListener('dragstart', e => {
          e.dataTransfer.setData('comp-type', item.dataset.type);
        });
      });
    }
  
    function _setupCanvasDrop() {
      const wrap = document.getElementById('simCanvasWrap');
  
      wrap.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
      });
  
      wrap.addEventListener('drop', e => {
        e.preventDefault();
        const type = e.dataTransfer.getData('comp-type');
        if (!type || !componentDefs[type]) return;
  
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left - 40;
        const y = e.clientY - rect.top  - 40;
        addComponent(type, x, y);
      });
  
      // Click en canvas vacío = deseleccionar
      wrap.addEventListener('mousedown', e => {
        if (e.target === wrap || e.target === canvas || e.target === svg) {
          selectComponent(null);
        }
      });
    }
  
    /* ================================================================
       AGREGAR COMPONENTE
    ================================================================ */
    function addComponent(type, x, y) {
      const def = componentDefs[type];
      if (!def) return null;
  
      const id = 'comp_' + (state.nextId++);
      const el = _buildComponentElement(id, def, x, y);
  
      canvas.appendChild(el);
      _hideEmptyMsg();
  
      const comp = {
        id,
        type,
        x, y,
        element: el,
        def,
        props: { ...def.defaultProps },
        pins: {},
        runtimeState: {},
      };
      state.components.push(comp);
  
      el.classList.add('just-dropped');
      setTimeout(() => el.classList.remove('just-dropped'), 300);
  
      _makeDraggable(comp);
      _setupPins(comp);
      selectComponent(comp);
  
      SimLog.log(`Componente añadido: ${def.label} (${id})`, 'info');
      return comp;
    }
  
    /* Construye el elemento HTML del componente */
    function _buildComponentElement(id, def, x, y) {
      const el = document.createElement('div');
      el.className = 'sim-component';
      el.id = id;
      el.style.left = x + 'px';
      el.style.top  = y + 'px';
  
      // El renderizado visual viene de la definición del componente
      el.innerHTML = def.render();
      return el;
    }
  
    /* ================================================================
       DRAG dentro del canvas
    ================================================================ */
    function _makeDraggable(comp) {
      const el = comp.element;
      let dragging = false;
      let startX, startY, startLeft, startTop;
  
      el.addEventListener('mousedown', e => {
        if (e.target.classList.contains('sim-pin')) return; // pines no arrastran
        e.stopPropagation();
        selectComponent(comp);
  
        dragging = true;
        startX    = e.clientX;
        startY    = e.clientY;
        startLeft = comp.x;
        startTop  = comp.y;
  
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      });
  
      function onMove(e) {
        if (!dragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        comp.x = startLeft + dx;
        comp.y = startTop  + dy;
        el.style.left = comp.x + 'px';
        el.style.top  = comp.y + 'px';
        _updateWires(comp);
      }
  
      function onUp() {
        dragging = false;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      }
    }
  
    /* ================================================================
       PINES DE CONEXIÓN
    ================================================================ */
    function _setupPins(comp) {
      const def = comp.def;
      if (!def.pins) return;
  
      def.pins.forEach(pinDef => {
        const pinEl = document.createElement('div');
        pinEl.className = 'sim-pin';
        if (pinDef.type === 'gnd')   pinEl.classList.add('gnd');
        if (pinDef.type === 'power') pinEl.classList.add('power');
  
        pinEl.style.left = pinDef.x + 'px';
        pinEl.style.top  = pinDef.y + 'px';
        pinEl.title = pinDef.label;
        pinEl.dataset.pin = pinDef.id;
  
        comp.element.appendChild(pinEl);
        comp.pins[pinDef.id] = { def: pinDef, element: pinEl };
  
        // Iniciar cable
        pinEl.addEventListener('mousedown', e => {
          e.stopPropagation();
          _startWire(comp, pinDef.id, e);
        });
  
        // Tooltip
        _attachPinTooltip(pinEl, pinDef.label);
      });
    }
  
    function _attachPinTooltip(pinEl, label) {
      let tooltip = document.getElementById('simPinTooltip');
      if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'simPinTooltip';
        tooltip.className = 'sim-pin-tooltip';
        document.body.appendChild(tooltip);
      }
      pinEl.addEventListener('mouseenter', e => {
        tooltip.textContent = label;
        tooltip.style.display = 'block';
        tooltip.style.left = (e.clientX + 12) + 'px';
        tooltip.style.top  = (e.clientY - 20) + 'px';
      });
      pinEl.addEventListener('mousemove', e => {
        tooltip.style.left = (e.clientX + 12) + 'px';
        tooltip.style.top  = (e.clientY - 20) + 'px';
      });
      pinEl.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
      });
    }
  
    /* ================================================================
       CABLES (conexiones entre pines)
    ================================================================ */
    function _startWire(comp, pinId, e) {
      const pinEl = comp.pins[pinId].element;
      const canvasRect = canvas.getBoundingClientRect();
      const pinRect    = pinEl.getBoundingClientRect();
  
      const x1 = pinRect.left + 5 - canvasRect.left;
      const y1 = pinRect.top  + 5 - canvasRect.top;
  
      // Crear línea SVG preview
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x1);
      line.setAttribute('y2', y1);
      line.setAttribute('stroke', '#ffd740');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('stroke-dasharray', '5,3');
      line.setAttribute('stroke-linecap', 'round');
      svg.appendChild(line);
  
      state.wireInProgress = { fromComp: comp, fromPin: pinId, x1, y1, svgLine: line };
  
      document.addEventListener('mousemove', _wireMouseMove);
      document.addEventListener('mouseup', _wireMouseUp);
    }
  
    function _wireMouseMove(e) {
      if (!state.wireInProgress) return;
      const canvasRect = canvas.getBoundingClientRect();
      const x2 = e.clientX - canvasRect.left;
      const y2 = e.clientY - canvasRect.top;
      const w = state.wireInProgress;
      w.svgLine.setAttribute('x2', x2);
      w.svgLine.setAttribute('y2', y2);
    }
  
    function _wireMouseUp(e) {
      document.removeEventListener('mousemove', _wireMouseMove);
      document.removeEventListener('mouseup', _wireMouseUp);
      if (!state.wireInProgress) return;
  
      const w = state.wireInProgress;
      const target = document.elementFromPoint(e.clientX, e.clientY);
  
      if (target && target.classList.contains('sim-pin')) {
        const toCompId = target.closest('.sim-component').id;
        const toPinId  = target.dataset.pin;
        const toComp   = state.components.find(c => c.id === toCompId);
  
        if (toComp && !(toComp === w.fromComp && toPinId === w.fromPin)) {
          _finalizeWire(w, toComp, toPinId);
          state.wireInProgress = null;
          return;
        }
      }
  
      // Cancelar wire
      svg.removeChild(w.svgLine);
      state.wireInProgress = null;
    }
  
    function _finalizeWire(w, toComp, toPinId) {
      const canvasRect = canvas.getBoundingClientRect();
      const toPinEl    = toComp.pins[toPinId].element;
      const toPinRect  = toPinEl.getBoundingClientRect();
  
      const x2 = toPinRect.left + 5 - canvasRect.left;
      const y2 = toPinRect.top  + 5 - canvasRect.top;
  
      // Finalizar línea SVG
      const line = w.svgLine;
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.setAttribute('stroke', '#3454d1');
      line.setAttribute('stroke-dasharray', 'none');
      line.setAttribute('stroke-width', '2');
  
      const wireId = 'wire_' + (state.nextId++);
      const wire = {
        id: wireId,
        fromComp: w.fromComp,
        fromPin:  w.fromPin,
        toComp:   toComp,
        toPin:    toPinId,
        svgLine:  line,
        x1: w.x1, y1: w.y1, x2, y2,
      };
      state.wires.push(wire);
  
      // Marcar pines como conectados
      w.fromComp.pins[w.fromPin].element.classList.add('connected');
      toComp.pins[toPinId].element.classList.add('connected');
  
      SimLog.log(
        `Conexión: ${w.fromComp.def.label}[${w.fromPin}] → ${toComp.def.label}[${toPinId}]`,
        'ok'
      );
    }
  
    function _updateWires(comp) {
      const canvasRect = canvas.getBoundingClientRect();
      state.wires.forEach(wire => {
        let changed = false;
        if (wire.fromComp === comp) {
          const pinEl   = comp.pins[wire.fromPin].element;
          const pinRect = pinEl.getBoundingClientRect();
          wire.x1 = pinRect.left + 5 - canvasRect.left;
          wire.y1 = pinRect.top  + 5 - canvasRect.top;
          wire.svgLine.setAttribute('x1', wire.x1);
          wire.svgLine.setAttribute('y1', wire.y1);
          changed = true;
        }
        if (wire.toComp === comp) {
          const pinEl   = comp.pins[wire.toPin].element;
          const pinRect = pinEl.getBoundingClientRect();
          wire.x2 = pinRect.left + 5 - canvasRect.left;
          wire.y2 = pinRect.top  + 5 - canvasRect.top;
          wire.svgLine.setAttribute('x2', wire.x2);
          wire.svgLine.setAttribute('y2', wire.y2);
          changed = true;
        }
      });
    }
  
    /* ================================================================
       SELECCIÓN Y PROPIEDADES
    ================================================================ */
    function selectComponent(comp) {
      // Quitar selección anterior
      if (state.selected) {
        state.selected.element.classList.remove('selected');
      }
      state.selected = comp;
  
      if (comp) {
        comp.element.classList.add('selected');
        _renderProps(comp);
        if (deleteBtn) deleteBtn.style.display = 'block';
      } else {
        _renderPropsEmpty();
        if (deleteBtn) deleteBtn.style.display = 'none';
      }
    }
  
    function _renderPropsEmpty() {
      propsContent.innerHTML = `
        <div class="props-empty">
          <span>🔌</span>
          Selecciona un componente para ver sus propiedades
        </div>
      `;
    }
  
    function _renderProps(comp) {
      const def = comp.def;
      let html = `
        <div class="prop-group">
          <div class="prop-group-title">Componente</div>
          <div class="prop-row">
            <span class="prop-label">Tipo</span>
            <span class="prop-value">${def.label}</span>
          </div>
          <div class="prop-row">
            <span class="prop-label">ID</span>
            <span class="prop-value" style="font-size:10px;color:#5a6080">${comp.id}</span>
          </div>
        </div>
      `;
  
      if (def.props && def.props.length > 0) {
        html += `<div class="prop-group"><div class="prop-group-title">Propiedades</div>`;
        def.props.forEach(p => {
          const val = comp.props[p.id] ?? p.default;
          if (p.type === 'select') {
            html += `
              <div class="prop-row">
                <span class="prop-label">${p.label}</span>
                <select class="prop-select" data-prop="${p.id}" onchange="Simulator.setProp('${comp.id}','${p.id}',this.value)">
                  ${p.options.map(o => `<option value="${o.value}" ${o.value==val?'selected':''}>${o.label}</option>`).join('')}
                </select>
              </div>`;
          } else {
            html += `
              <div class="prop-row">
                <span class="prop-label">${p.label}</span>
                <input class="prop-input" type="${p.type||'text'}" value="${val}"
                  data-prop="${p.id}"
                  onchange="Simulator.setProp('${comp.id}','${p.id}',this.value)" />
              </div>`;
          }
        });
        html += `</div>`;
      }
  
      // Pines info
      if (def.pins && def.pins.length > 0) {
        html += `<div class="prop-group"><div class="prop-group-title">Pines</div>`;
        def.pins.forEach(pin => {
          html += `
            <div class="prop-row">
              <span class="prop-label">${pin.label}</span>
              <span class="prop-value" style="font-size:10px">${pin.id}</span>
            </div>`;
        });
        html += `</div>`;
      }
  
      propsContent.innerHTML = html;
    }
  
    function setProp(compId, propId, value) {
      const comp = state.components.find(c => c.id === compId);
      if (!comp) return;
      comp.props[propId] = value;
      if (comp.def.onPropChange) comp.def.onPropChange(comp, propId, value);
    }
  
    /* ================================================================
       ELIMINAR COMPONENTE
    ================================================================ */
    function deleteSelected() {
      if (!state.selected) return;
      const comp = state.selected;
  
      // Eliminar cables conectados
      state.wires = state.wires.filter(w => {
        if (w.fromComp === comp || w.toComp === comp) {
          svg.removeChild(w.svgLine);
          return false;
        }
        return true;
      });
  
      canvas.removeChild(comp.element);
      state.components = state.components.filter(c => c !== comp);
      selectComponent(null);
  
      if (state.components.length === 0) _showEmptyMsg();
      SimLog.log(`Componente eliminado: ${comp.def.label}`, 'warn');
    }
  
    /* ================================================================
       BOTONES DE TOOLBAR
    ================================================================ */
    function _setupButtons() {
      document.getElementById('btnSimRun')?.addEventListener('click', toggleRun);
      document.getElementById('btnSimClear')?.addEventListener('click', clearCanvas);
      document.getElementById('btnSimConsole')?.addEventListener('click', toggleConsole);
      document.getElementById('btnSimFromCode')?.addEventListener('click', loadFromCode);
  
      if (deleteBtn) deleteBtn.addEventListener('click', deleteSelected);
    }
  
    function toggleRun() {
      state.running = !state.running;
      const btn = document.getElementById('btnSimRun');
      if (state.running) {
        btn.textContent = '⏹ Detener';
        btn.classList.add('running');
        statusDot.className = 'running';
        statusText.textContent = 'Ejecutando…';
        SimLog.log('Simulación iniciada', 'ok');
        SimRuntime.start(state);
      } else {
        btn.textContent = '▶ Simular';
        btn.classList.remove('running');
        statusDot.className = '';
        statusText.textContent = 'Detenido';
        SimLog.log('Simulación detenida', 'warn');
        SimRuntime.stop();
      }
    }
  
    function clearCanvas() {
      state.components.forEach(c => canvas.removeChild(c.element));
      state.wires.forEach(w => svg.removeChild(w.svgLine));
      state.components = [];
      state.wires = [];
      state.selected = null;
      _renderPropsEmpty();
      if (deleteBtn) deleteBtn.style.display = 'none';
      _showEmptyMsg();
      SimLog.log('Canvas limpiado', 'warn');
    }
  
    function toggleConsole() {
      const cons = document.getElementById('simConsole');
      cons.classList.toggle('visible');
    }
  
    /* Carga el código actual de Blockly al simulador (Fase 4) */
    function loadFromCode() {
      SimLog.log('Importar desde Blockly — próximamente (Fase 4)', 'warn');
    }
  
    /* ================================================================
       BÚSQUEDA DE COMPONENTES
    ================================================================ */
    function _setupSearch() {
      const input = document.getElementById('simCompSearchInput');
      if (!input) return;
      input.addEventListener('input', () => {
        const q = input.value.toLowerCase().trim();
        document.querySelectorAll('.comp-item').forEach(item => {
          const name = item.querySelector('.comp-item-name')?.textContent.toLowerCase() || '';
          const desc = item.querySelector('.comp-item-desc')?.textContent.toLowerCase() || '';
          item.style.display = (!q || name.includes(q) || desc.includes(q)) ? '' : 'none';
        });
        // Ocultar labels de categoría si no hay items visibles
        document.querySelectorAll('.comp-category-label').forEach(label => {
          let next = label.nextElementSibling;
          let hasVisible = false;
          while (next && !next.classList.contains('comp-category-label')) {
            if (next.style.display !== 'none') hasVisible = true;
            next = next.nextElementSibling;
          }
          label.style.display = hasVisible ? '' : 'none';
        });
      });
    }
  
    /* ================================================================
       TECLADO
    ================================================================ */
    function _setupKeyboard() {
      document.addEventListener('keydown', e => {
        // Solo activo en la vista simulador
        if (!document.getElementById('viewSimulator')?.classList.contains('active')) return;
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (document.activeElement.tagName === 'INPUT') return;
          deleteSelected();
        }
        if (e.key === 'Escape') selectComponent(null);
      });
    }
  
    /* ================================================================
       HELPERS
    ================================================================ */
    function _showEmptyMsg() { if (emptyMsg) emptyMsg.style.display = 'block'; }
    function _hideEmptyMsg() { if (emptyMsg) emptyMsg.style.display = 'none'; }
  
    /* Retorna el estado actual (para que el runtime lo use) */
    function getState() { return state; }
  
    /* ================================================================
       REFRESH COMPONENT LIST (re-registra drag al volver al simulador)
    ================================================================ */
    function refreshComponentList() {
      document.querySelectorAll('.comp-item').forEach(item => {
        // Clonar para eliminar listeners duplicados
        const clone = item.cloneNode(true);
        item.parentNode.replaceChild(clone, item);
        clone.addEventListener('dragstart', e => {
          e.dataTransfer.setData('comp-type', clone.dataset.type);
        });
      });
    }
  
    /* ================================================================
       API PÚBLICA
    ================================================================ */
    return {
      init,
      registerComponent,
      addComponent,
      selectComponent,
      deleteSelected,
      setProp,
      getState,
      toggleRun,
      clearCanvas,
      refreshComponentList,
    };
  
  })();
  
  /* ============================================================
     SimLog — Mini consola del simulador
     ============================================================ */
  const SimLog = (function () {
    let container;
  
    function init() {
      container = document.getElementById('simConsole');
    }
  
    function log(msg, type = 'info') {
      console.log('[Sim]', msg);
      if (!container) return;
      const now = new Date();
      const time = now.toLocaleTimeString('es-MX', { hour12: false });
      const line = document.createElement('div');
      line.className = `log-line ${type}`;
      line.innerHTML = `<span class="log-time">${time}</span>${_escape(msg)}`;
      container.appendChild(line);
      container.scrollTop = container.scrollHeight;
    }
  
    function _escape(s) {
      return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
  
    return { init, log };
  })();
  
  /* ============================================================
     SimRuntime — Placeholder (Fase 3)
     ============================================================ */
  const SimRuntime = (function () {
    let _interval = null;
  
    function start(state) {
      // Fase 3: aquí irá el intérprete de MicroPython
      SimLog.log('Runtime GPIO listo (Fase 3)', 'info');
    }
  
    function stop() {
      if (_interval) { clearInterval(_interval); _interval = null; }
    }
  
    return { start, stop };
  })();