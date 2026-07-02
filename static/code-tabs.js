/**
 * code-tabs.js
 * ─────────────────────────────────────────────────────────────
 * Sistema de pestañas para la vista Código (#viewCode).
 *
 * Comportamiento:
 *   • Pestaña "Bloques" (fija, no se puede eliminar/renombrar):
 *       Muestra el código generado por Blockly (workspaceToCode).
 *       Si el usuario la edita, los cambios se IGNORAN al ejecutar
 *       (btnRun siempre usa el código fresco de Blockly).
 *
 *   • Pestañas editables (creadas por el usuario):
 *       Cada una tiene un nombre (p.ej. "main.py", "test.py"...).
 *       El usuario puede escribir/modificar Python libremente.
 *       El contenido se persiste en localStorage entre recargas.
 *
 *   • btnRun (en viewCode) usa la pestaña activa:
 *       Bloques  → Blockly.Python.workspaceToCode()
 *       editable → contenido del editor (esa pestaña)
 *
 *   • Al cambiar de pestaña:
 *       1. Se guarda el contenido actual del editor en la pestaña saliente
 *          (si es editable).
 *       2. Se carga el contenido de la nueva pestaña en el editor.
 *       3. Si la nueva pestaña es "Bloques", se regenera desde Blockly.
 *
 * API pública (window.Tabs):
 *   Tabs.init()                          Inicializar (auto en DOMContentLoaded)
 *   Tabs.getActiveTab()                  → { id, name, kind, content }
 *   Tabs.getActiveCode()                 Código fuente que debe ejecutarse
 *   Tabs.refreshBlocksTab(code?)         Refrescar contenido de pestaña Bloques
 *   Tabs.switchTab(id)                   Cambiar pestaña activa
 *   Tabs.addTab(name?)                   Crear pestaña editable
 *   Tabs.removeTab(id)                   Eliminar pestaña editable
 *   Tabs.renameTab(id, newName)          Renombrar pestaña editable
 *   Tabs.resetAll()                      Volver al estado inicial (1 pestaña)
 *   Tabs.getTabs()                       Lista de pestañas
 * ─────────────────────────────────────────────────────────────
 */
(function () {
  'use strict';

  const STORAGE_KEY = '3dpit_code_tabs_v1';

  /* ── Estado interno ─────────────────────────────────────── */
  let _tabs        = [];           // [{id, name, kind, content}]
  let _activeTabId = null;
  let _initialized = false;
  let _tabsBar     = null;         // <div> con la barra de pestañas
  let _editor      = null;         // CodeMirror instance
  let _getBlocklyCode = null;      // () => string
  let _suspendEditorSave = false;  // true mientras hacemos setValue programático

  /* ── Utilidades ─────────────────────────────────────────── */
  function _genId() {
    return 'tab_' + Date.now().toString(36) + '_' + Math.floor(Math.random() * 1e6).toString(36);
  }

  // Acepta letras, números, guion bajo/medio y punto. 1–40 caracteres.
  function _sanitizeName(name) {
    name = (name || '').trim();
    if (!name) return null;
    if (name.length > 40) name = name.slice(0, 40);
    if (!/^[A-Za-z0-9_\-\.]{1,40}$/.test(name)) return null;
    return name;
  }

  function _persist() {
    try {
      const data = {
        tabs: _tabs.map(t => ({
          id: t.id, name: t.name, kind: t.kind, content: t.content || ''
        })),
        activeTabId: _activeTabId,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('[Tabs] No se pudo guardar en localStorage:', e);
    }
  }

  function _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.tabs)) return null;
      return parsed;
    } catch (e) {
      console.warn('[Tabs] No se pudo cargar desde localStorage:', e);
      return null;
    }
  }

  function _findTab(id) {
    return _tabs.find(t => t.id === id) || null;
  }
  function _findBlocksTab() {
    return _tabs.find(t => t.kind === 'blocks') || null;
  }

  // Notifica a otros módulos (ej. main.js) que la pestaña activa
  // cambió de identidad o de nombre, para que puedan sincronizar
  // UI externa (como el input de nombre de archivo a subir/guardar).
  function _notifyActiveTabChanged() {
    const tab = _findTab(_activeTabId);
    window.dispatchEvent(new CustomEvent('codeTabsChanged', { detail: { tab } }));
  }

  function _uniqueName(base) {
    if (!_tabs.some(t => t.name === base)) return base;
    const m = base.match(/^(.*?)(\d+)?(\.py)?$/i);
    const stem = m ? m[1].replace(/\.$/, '') : base;
    const ext  = m && m[3] ? m[3] : '';
    for (let i = 1; i < 9999; i++) {
      const candidate = `${stem}${i}${ext}`;
      if (!_tabs.some(t => t.name === candidate)) return candidate;
    }
    return base + '_' + Date.now();
  }

  /* ── Render de la barra ─────────────────────────────────── */
  function _render() {
    if (!_tabsBar) return;
    _tabsBar.innerHTML = '';

    _tabs.forEach(tab => {
      const el = document.createElement('div');
      el.className = 'code-tab' + (tab.id === _activeTabId ? ' active' : '');
      el.dataset.tabId = tab.id;
      el.title = tab.kind === 'blocks'
        ? 'Código generado por los bloques (sólo lectura lógica)'
        : `Pestaña editable: ${tab.name}`;

      // Icono distintivo
      const icon = document.createElement('span');
      icon.className = 'tab-icon';
      icon.textContent = tab.kind === 'blocks' ? '🧩' : '📄';
      el.appendChild(icon);

      const name = document.createElement('span');
      name.className = 'tab-name';
      name.textContent = tab.name;
      el.appendChild(name);

      // Botón cerrar (solo editables)
      if (tab.kind === 'editable') {
        const close = document.createElement('span');
        close.className = 'tab-close';
        close.textContent = '×';
        close.title = 'Cerrar pestaña';
        close.addEventListener('mousedown', e => e.stopPropagation());
        close.addEventListener('click', e => {
          e.stopPropagation();
          Tabs.removeTab(tab.id);
        });
        el.appendChild(close);
      }

      // Click → cambiar pestaña
      el.addEventListener('mousedown', e => {
        // Si el click fue sobre el botón cerrar, no cambiar
        if (e.target.classList.contains('tab-close')) return;
      });
      el.addEventListener('click', () => Tabs.switchTab(tab.id));

      // Doble click → renombrar (solo editables)
      if (tab.kind === 'editable') {
        el.addEventListener('dblclick', e => {
          e.preventDefault();
          const nuevo = window.prompt('Nuevo nombre de la pestaña:', tab.name);
          if (nuevo !== null) Tabs.renameTab(tab.id, nuevo);
        });
      }

      _tabsBar.appendChild(el);
    });

    // Botón "+"
    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'code-tab-btn-add';
    addBtn.textContent = '+';
    addBtn.title = 'Nueva pestaña';
    addBtn.addEventListener('click', () => Tabs.addTab());
    _tabsBar.appendChild(addBtn);
  }

  /* ── Inyectar CSS una sola vez ──────────────────────────── */
  function _injectCSS() {
    if (document.getElementById('codeTabsStyles')) return;
    const style = document.createElement('style');
    style.id = 'codeTabsStyles';
    style.textContent = `
.code-tabs-bar {
  display: flex;
  align-items: stretch;
  background: #21222c;
  border-bottom: 1px solid #191a21;
  height: 36px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  user-select: none;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  flex-shrink: 0;
}
.code-tabs-bar::-webkit-scrollbar { height: 4px; }
.code-tabs-bar::-webkit-scrollbar-track { background: transparent; }
.code-tabs-bar::-webkit-scrollbar-thumb { background: #44475a; border-radius: 2px; }

.code-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px 0 12px;
  background: transparent;
  color: #6272a4;
  border-right: 1px solid #191a21;
  cursor: pointer;
  font-size: 13px;
  height: 100%;
  white-space: nowrap;
  position: relative;
  flex-shrink: 0;
  transition: background .12s, color .12s;
  max-width: 220px;
}
.code-tab.active {
  background: #282a36;
  color: #f8f8f2;
}
.code-tab.active::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 2px;
  background: #bd93f9;
}
.code-tab:hover:not(.active) {
  background: #2d2f3f;
  color: #f8f8f2;
}
.code-tab .tab-icon {
  font-size: 12px;
  flex-shrink: 0;
  opacity: .85;
}
.code-tab .tab-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.code-tab .tab-close {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
  color: #6272a4;
  cursor: pointer;
  flex-shrink: 0;
  margin-left: 2px;
  transition: background .12s, color .12s;
}
.code-tab .tab-close:hover {
  background: #ff5555;
  color: #fff;
}
.code-tab-btn-add {
  padding: 0 12px;
  background: transparent;
  color: #6272a4;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 400;
  line-height: 1;
  height: 100%;
  flex-shrink: 0;
  transition: color .12s, background .12s;
}
.code-tab-btn-add:hover {
  color: #f8f8f2;
  background: #2d2f3f;
}
    `;
    document.head.appendChild(style);
  }

  /* ── API pública ────────────────────────────────────────── */
  const Tabs = {
    /** Inicializar. Llamar una vez tras DOMContentLoaded. */
    init(opts) {
      if (_initialized) return;
      _initialized = true;

      opts = opts || {};
      _editor = opts.editor || (typeof editor !== 'undefined' ? editor : null);
      _getBlocklyCode = opts.getBlocklyCode || (() => {
        try {
          if (typeof Blockly !== 'undefined' &&
              typeof Code !== 'undefined' &&
              Code.workspace &&
              Blockly.Python &&
              typeof Blockly.Python.workspaceToCode === 'function') {
            return Blockly.Python.workspaceToCode(Code.workspace) || '';
          }
        } catch (e) { /* noop */ }
        return '';
      });

      _injectCSS();

      // Crear la barra e insertarla justo antes de #editorWrapper
      const editorWrapper = document.getElementById('editorWrapper');
      if (!editorWrapper || !editorWrapper.parentNode) {
        console.warn('[Tabs] #editorWrapper no encontrado — pestañas deshabilitadas.');
        return;
      }
      _tabsBar = document.createElement('div');
      _tabsBar.id = 'codeTabsBar';
      _tabsBar.className = 'code-tabs-bar';
      editorWrapper.parentNode.insertBefore(_tabsBar, editorWrapper);

      // ── Cargar o inicializar estado ────────────────────────
      const saved = _load();
      if (saved && saved.tabs.length > 0) {
        _tabs = saved.tabs.map(t => ({
          id: t.id || _genId(),
          name: t.name || 'sin-nombre.py',
          kind: t.kind === 'blocks' ? 'blocks' : 'editable',
          content: t.kind === 'blocks' ? '' : (t.content || ''),
        }));
        // Garantizar que la pestaña Bloques existe
        if (!_findBlocksTab()) {
          _tabs.unshift({ id: 'blocks', name: 'Bloques', kind: 'blocks', content: '' });
        }
        _activeTabId = (_findTab(saved.activeTabId) || {}).id
                    || (_findBlocksTab() || {}).id
                    || _tabs[0].id;
      } else {
        _tabs = [
          { id: 'blocks', name: 'Bloques', kind: 'blocks', content: '' },
          { id: _genId(), name: 'main.py', kind: 'editable', content: '' },
        ];
        _activeTabId = 'blocks';
      }

      _render();

      // ── Cargar contenido inicial en el editor ─────────────
      const active = _findTab(_activeTabId);
      if (active && _editor) {
        _suspendEditorSave = true;
        try {
          if (active.kind === 'blocks') {
            const code = _getBlocklyCode();
            active.content = code;
            _editor.setValue(code);
          } else {
            _editor.setValue(active.content || '');
          }
        } finally {
          // Permitimos el siguiente 'change' (cursor, etc.) sin guardar
          setTimeout(() => { _suspendEditorSave = false; }, 50);
        }
        if (_editor.refresh) _editor.refresh();
      }

      // ── Auto-guardar cambios del editor ────────────────────
      if (_editor && typeof _editor.on === 'function') {
        _editor.on('change', (cm, change) => {
          if (_suspendEditorSave) return;
          if (change && change.origin === 'setValue') return;
          const tab = _findTab(_activeTabId);
          if (!tab) return;
          if (tab.kind !== 'editable') return; // Bloques: no guardar ediciones
          tab.content = cm.getValue();
          _persist();
        });
      }

      // ── Al entrar a viewCode: refrescar Bloques ────────────
      window.addEventListener('viewchange', e => {
        if (e && e.detail && e.detail.viewId === 'viewCode') {
          Tabs.refreshBlocksTab();
          if (_editor && _editor.refresh) _editor.refresh();
          if (typeof refreshTerminalFit === 'function') refreshTerminalFit();
        }
      });

      _persist();
      _notifyActiveTabChanged();
    },

    /** Pestaña activa o null. */
    getActiveTab() {
      return _findTab(_activeTabId);
    },

    /**
     * Código fuente que debe ejecutarse:
     *   • Bloques → siempre Blockly (ignora lo que esté en el editor).
     *   • editable → contenido del editor.
     */
    getActiveCode() {
      const tab = _findTab(_activeTabId);
      if (!tab) return '';
      if (tab.kind === 'blocks') return _getBlocklyCode();
      if (_editor && typeof _editor.getValue === 'function') return _editor.getValue();
      return tab.content || '';
    },

    /**
     * Actualiza el contenido de la pestaña Bloques.
     * Si la pestaña Bloques está activa, también refresca el editor.
     * @param {string} [code] Si se omite, se regenera desde Blockly.
     */
    refreshBlocksTab(code) {
      const blocksTab = _findBlocksTab();
      if (!blocksTab) return;
      if (typeof code !== 'string') code = _getBlocklyCode();
      blocksTab.content = code;

      if (_activeTabId === blocksTab.id && _editor) {
        _suspendEditorSave = true;
        try { _editor.setValue(code); }
        finally { setTimeout(() => { _suspendEditorSave = false; }, 50); }
      }
      _persist();
    },

    /** Cambiar a otra pestaña. */
    switchTab(id) {
      const tab = _findTab(id);
      if (!tab || tab.id === _activeTabId) return;

      // Guardar contenido actual → pestaña saliente (si es editable)
      const current = _findTab(_activeTabId);
      if (current && current.kind === 'editable' && _editor) {
        current.content = _editor.getValue();
      }

      _activeTabId = tab.id;

      // Cargar nuevo contenido en el editor
      if (_editor) {
        _suspendEditorSave = true;
        try {
          if (tab.kind === 'blocks') {
            const code = _getBlocklyCode();
            tab.content = code;
            _editor.setValue(code);
          } else {
            _editor.setValue(tab.content || '');
          }
        } finally { setTimeout(() => { _suspendEditorSave = false; }, 50); }
        if (_editor.refresh) _editor.refresh();
      }

      _render();
      _persist();
      _notifyActiveTabChanged();
    },

    /**
     * Crear nueva pestaña editable.
     * @param {string} [name] Nombre deseado (opcional).
     * @returns {object|null} La pestaña creada o null si el nombre es inválido.
     */
    addTab(name) {
      let base = name && name.trim() ? name.trim() : _uniqueName('script.py');
      const clean = _sanitizeName(base);
      if (!clean) {
        console.warn('[Tabs] Nombre inválido:', base);
        window.alert('Nombre inválido. Usa solo letras, números, guiones y puntos (máx. 40 caracteres).');
        return null;
      }
      const finalName = _uniqueName(clean);

      const newTab = { id: _genId(), name: finalName, kind: 'editable', content: '' };
      _tabs.push(newTab);
      _render();
      _persist();
      Tabs.switchTab(newTab.id);
      return newTab;
    },

    /** Eliminar pestaña editable (no se puede eliminar "Bloques"). */
    removeTab(id) {
      const tab = _findTab(id);
      if (!tab) return false;
      if (tab.kind === 'blocks') {
        window.alert('La pestaña "Bloques" no se puede eliminar.');
        return false;
      }
      if (!window.confirm(`¿Cerrar la pestaña "${tab.name}"? Se perderá su contenido no guardado.`)) {
        return false;
      }

      const idx = _tabs.findIndex(t => t.id === id);
      _tabs.splice(idx, 1);

      // Si era la activa, cambiar a una adyacente
      if (_activeTabId === id) {
        const next = _tabs[idx] || _tabs[idx - 1] || _findBlocksTab();
        if (next) {
          _activeTabId = next.id;
          if (_editor) {
            _suspendEditorSave = true;
            try {
              if (next.kind === 'blocks') {
                const code = _getBlocklyCode();
                next.content = code;
                _editor.setValue(code);
              } else {
                _editor.setValue(next.content || '');
              }
            } finally { setTimeout(() => { _suspendEditorSave = false; }, 50); }
            if (_editor.refresh) _editor.refresh();
          }
        }
      }

      _render();
      _persist();
      _notifyActiveTabChanged();
      return true;
    },

    /** Renombrar pestaña editable. */
    renameTab(id, newName) {
      const tab = _findTab(id);
      if (!tab) return false;
      if (tab.kind === 'blocks') {
        window.alert('La pestaña "Bloques" no se puede renombrar.');
        return false;
      }
      const clean = _sanitizeName(newName);
      if (!clean) {
        window.alert('Nombre inválido. Usa solo letras, números, guiones y puntos (máx. 40 caracteres).');
        return false;
      }
      if (_tabs.some(t => t.id !== id && t.name === clean)) {
        window.alert('Ya existe una pestaña con ese nombre.');
        return false;
      }
      tab.name = clean;
      _render();
      _persist();
      _notifyActiveTabChanged();
      return true;
    },

    /** Volver al estado inicial (1 pestaña Bloques + 1 main.py). */
    resetAll() {
      _tabs = [
        { id: 'blocks', name: 'Bloques', kind: 'blocks', content: '' },
        { id: _genId(), name: 'main.py', kind: 'editable', content: '' },
      ];
      _activeTabId = 'blocks';
      _render();
      _persist();
      if (_editor) {
        _suspendEditorSave = true;
        try {
          const code = _getBlocklyCode();
          _tabs[0].content = code;
          _editor.setValue(code);
        } finally { setTimeout(() => { _suspendEditorSave = false; }, 50); }
        if (_editor.refresh) _editor.refresh();
      }
      _notifyActiveTabChanged();
    },

    /** Lista de pestañas (copia). */
    getTabs() {
      return _tabs.map(t => ({ ...t }));
    },

    /** Forzar persistencia (por si se改了 el editor externamente). */
    persist() { _persist(); },
  };

  /* ── Auto-init ──────────────────────────────────────────── */
  function _autoInit() {
    try { Tabs.init(); }
    catch (e) { console.error('[Tabs] Error al inicializar:', e); }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _autoInit);
  } else {
    // El script se cargó después del DOMContentLoaded → init inmediato
    _autoInit();
  }

  window.Tabs = Tabs;
})();