/**
 * terminal-menu.js
 * Menú contextual (clic derecho) reutilizable para terminales xterm.js
 *
 * Uso:
 *   TerminalMenu.attach({
 *     container : elemento DOM donde se escucha el clic derecho,
 *     getTerm   : () => instancia xterm.js,
 *     onClear   : () => { term.clear(); },          // opcional
 *     onPaste   : (text) => { term.paste(text); },  // opcional — si se omite, no muestra "Pegar"
 *   });
 */

const TerminalMenu = (() => {
  'use strict';

  /* ── Estilos inyectados una sola vez ── */
  let _stylesInjected = false;

  function _injectStyles() {
    if (_stylesInjected) return;
    _stylesInjected = true;

    const style = document.createElement('style');
    style.textContent = `
#_tmenu {
  position: fixed;
  z-index: 99999;
  background: #1e2140;
  border: 1px solid #2e3560;
  border-radius: 6px;
  padding: 4px 0;
  min-width: 160px;
  box-shadow: 0 4px 16px rgba(0,0,0,.55);
  font-family: 'Segoe UI', system-ui, sans-serif;
  font-size: 13px;
  user-select: none;
  animation: _tmenuIn .08s ease;
}
@keyframes _tmenuIn {
  from { opacity: 0; transform: scale(.97); }
  to   { opacity: 1; transform: scale(1);   }
}
#_tmenu .tm-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 14px;
  color: #c8d0f0;
  cursor: pointer;
  gap: 24px;
  white-space: nowrap;
}
#_tmenu .tm-item:hover {
  background: #2e3a6e;
  color: #fff;
}
#_tmenu .tm-item.tm-disabled {
  color: #4a5280;
  cursor: default;
  pointer-events: none;
}
#_tmenu .tm-sep {
  border: none;
  border-top: 1px solid #2e3560;
  margin: 3px 0;
}
#_tmenu .tm-shortcut {
  font-size: 11px;
  color: #5a6490;
}
#_tmenu .tm-item:hover .tm-shortcut {
  color: #8899cc;
}
    `;
    document.head.appendChild(style);
  }

  /* ── Singleton del menú DOM ── */
  let _menu = null;
  let _closeHandler = null;

  function _getMenu() {
    if (!_menu) {
      _menu = document.createElement('div');
      _menu.id = '_tmenu';
      _menu.setAttribute('role', 'menu');
      document.body.appendChild(_menu);
    }
    return _menu;
  }

  function _close() {
    if (_menu) _menu.style.display = 'none';
    if (_closeHandler) {
      document.removeEventListener('mousedown', _closeHandler, true);
      document.removeEventListener('keydown', _closeHandler, true);
      _closeHandler = null;
    }
  }

  function _item(label, shortcut, onClick, disabled) {
    const el = document.createElement('div');
    el.className = 'tm-item' + (disabled ? ' tm-disabled' : '');
    el.setAttribute('role', 'menuitem');
    el.innerHTML = `<span>${label}</span><span class="tm-shortcut">${shortcut || ''}</span>`;
    if (!disabled) el.addEventListener('mousedown', (e) => { e.preventDefault(); _close(); onClick(); });
    return el;
  }

  function _sep() {
    const el = document.createElement('hr');
    el.className = 'tm-sep';
    return el;
  }

  /* ── Clipboard helpers (misma lógica que viewcode.js) ── */

  async function _writeClipboard(text) {
    if (!text) return false;
    if (navigator.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(text); return true; } catch (_) {}
    }
    if (window.pywebview?.api?.set_clipboard) {
      try {
        const r = await window.pywebview.api.set_clipboard(text);
        if (r?.status === 'ok') return true;
      } catch (_) {}
    }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (_) {}
    return false;
  }

  async function _readClipboard() {
    if (navigator.clipboard?.readText) {
      try { return await navigator.clipboard.readText(); } catch (_) {}
    }
    if (window.pywebview?.api?.get_clipboard) {
      try { return await window.pywebview.api.get_clipboard() || ''; } catch (_) {}
    }
    return '';
  }

  /* ── Toast ligero ── */
  function _toast(msg, anchorEl) {
    document.getElementById('_tmToast')?.remove();
    const t = document.createElement('div');
    t.id = '_tmToast';
    t.textContent = msg;
    t.style.cssText = [
      'position:fixed', 'z-index:100000',
      'background:#2472c8', 'color:#fff',
      'font-family:Consolas,monospace', 'font-size:11px',
      'padding:4px 12px', 'border-radius:4px',
      'box-shadow:0 2px 8px rgba(0,0,0,.5)',
      'pointer-events:none', 'opacity:1',
      'transition:opacity .4s ease',
    ].join(';');
    if (anchorEl) {
      const r = anchorEl.getBoundingClientRect();
      t.style.left   = (r.left + 10) + 'px';
      t.style.bottom = (window.innerHeight - r.bottom + 8) + 'px';
    } else {
      t.style.bottom = '60px'; t.style.right = '20px';
    }
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; }, 1400);
    setTimeout(() => t.remove(), 1900);
  }

  /* ── Extraer texto completo del buffer xterm ── */
  function _getFullText(xterm) {
    if (!xterm) return '';
    const buffer = xterm.buffer.active;
    const lines = [];
    for (let i = 0; i < buffer.length; i++) {
      const line = buffer.getLine(i);
      if (line) lines.push(line.translateToString(true));
    }
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    return lines.join('\n');
  }

  /* ── API pública ── */

  /**
   * @param {Object} opts
   * @param {HTMLElement}      opts.container  Elemento donde escuchar clic derecho
   * @param {function}         opts.getTerm    Función que retorna la instancia xterm
   * @param {function}         [opts.onClear]  Callback para "Limpiar terminal"
   * @param {function}         [opts.onPaste]  Callback(text) para "Pegar" al terminal
   * @param {HTMLElement}      [opts.toastAnchor] Elemento de referencia para el toast
   */
  function attach({ container, getTerm, onClear, onPaste, toastAnchor }) {
    _injectStyles();

    container.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const xterm    = getTerm();
      const selected = xterm?.getSelection() || '';
      const hasText  = !!selected;

      const menu = _getMenu();
      menu.innerHTML = '';

      /* — Cortar — */
      menu.appendChild(_item('Cortar', 'Ctrl+X', async () => {
        if (!selected) return;
        const ok = await _writeClipboard(selected);
        if (ok) {
          xterm.paste(''); // xterm no tiene "cortar" real — borramos la selección enviando vacío
          _toast('Cortado', toastAnchor || container);
        }
      }, !hasText));

      /* — Copiar — */
      menu.appendChild(_item('Copiar', 'Ctrl+C', async () => {
        const text = selected || _getFullText(xterm);
        const ok   = await _writeClipboard(text);
        if (ok) _toast(selected ? 'Selección copiada' : 'Todo copiado', toastAnchor || container);
      }, !xterm));

      /* — Pegar — solo si se provee callback onPaste */
      if (typeof onPaste === 'function') {
        menu.appendChild(_item('Pegar', 'Ctrl+V', async () => {
          const text = await _readClipboard();
          if (text) onPaste(text);
        }, false));
      }

      menu.appendChild(_sep());

      /* — Seleccionar todo — */
      menu.appendChild(_item('Seleccionar todo', 'Ctrl+A', () => {
        xterm?.selectAll();
      }, !xterm));

      /* — Limpiar — solo si se provee callback onClear */
      if (typeof onClear === 'function') {
        menu.appendChild(_sep());
        menu.appendChild(_item('Limpiar terminal', '', onClear, !xterm));
      }

      /* — Posicionar y mostrar — */
      menu.style.display = 'block';

      const vw = window.innerWidth, vh = window.innerHeight;
      let x = e.clientX, y = e.clientY;
      menu.style.left = '0'; menu.style.top = '0'; // reset para medir
      requestAnimationFrame(() => {
        const mw = menu.offsetWidth, mh = menu.offsetHeight;
        if (x + mw > vw) x = vw - mw - 4;
        if (y + mh > vh) y = vh - mh - 4;
        menu.style.left = x + 'px';
        menu.style.top  = y + 'px';
      });

      /* — Cerrar al hacer clic fuera o presionar Escape — */
      if (_closeHandler) {
        document.removeEventListener('mousedown', _closeHandler, true);
        document.removeEventListener('keydown', _closeHandler, true);
      }
      _closeHandler = (ev) => {
        if (ev.type === 'keydown' && ev.key !== 'Escape') return;
        if (ev.type === 'mousedown' && menu.contains(ev.target)) return;
        _close();
      };
      // Delay mínimo para que el mousedown de apertura no lo cierre inmediatamente
      setTimeout(() => {
        document.addEventListener('mousedown', _closeHandler, true);
        document.addEventListener('keydown', _closeHandler, true);
      }, 0);
    });
  }

  return { attach };
})();


/* ============================================================
   MENÚ CONTEXTUAL GLOBAL — CodeMirror + Inputs / Textareas
   Reemplaza el antiguo #ctxMenu inline de index.html.
   Mismo estilo visual que TerminalMenu.attach().
   ============================================================ */

(function () {
  'use strict';

  /* ── Helpers de clipboard (misma lógica que el módulo superior) ── */

  async function _write(text) {
    if (!text) return false;
    if (navigator.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(text); return true; } catch (_) {}
    }
    if (window.pywebview?.api?.set_clipboard) {
      try {
        const r = await window.pywebview.api.set_clipboard(text);
        if (r?.status === 'ok') return true;
      } catch (_) {}
    }
    try {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta); return ok;
    } catch (_) {}
    return false;
  }

  async function _read() {
    if (navigator.clipboard?.readText) {
      try { return await navigator.clipboard.readText(); } catch (_) {}
    }
    if (window.pywebview?.api?.get_clipboard) {
      try { return await window.pywebview.api.get_clipboard() || ''; } catch (_) {}
    }
    return '';
  }

  /* ── Singleton del menú (reutiliza el de TerminalMenu si ya existe) ── */

  function _getGlobalMenu() {
    let m = document.getElementById('_tmenu');
    if (!m) {
      m = document.createElement('div');
      m.id = '_tmenu';
      m.setAttribute('role', 'menu');
      document.body.appendChild(m);
    }
    return m;
  }

  function _closeGlobal() {
    const m = document.getElementById('_tmenu');
    if (m) m.style.display = 'none';
  }

  function _mkItem(label, shortcut, onClick, disabled) {
    const el = document.createElement('div');
    el.className = 'tm-item' + (disabled ? ' tm-disabled' : '');
    el.setAttribute('role', 'menuitem');
    el.innerHTML = `<span>${label}</span><span class="tm-shortcut">${shortcut || ''}</span>`;
    if (!disabled) {
      el.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        _closeGlobal();
        onClick();
      });
    }
    return el;
  }

  function _mkSep() {
    const el = document.createElement('hr');
    el.className = 'tm-sep';
    return el;
  }

  /* ── Mostrar el menú en (x, y) con items dados ── */

  function _showAt(x, y, buildFn) {
    const menu = _getGlobalMenu();
    menu.innerHTML = '';
    buildFn(menu);
    menu.style.display = 'block';

    requestAnimationFrame(() => {
      const mw = menu.offsetWidth, mh = menu.offsetHeight;
      const vw = window.innerWidth,   vh = window.innerHeight;
      menu.style.left = Math.min(x, vw - mw - 4) + 'px';
      menu.style.top  = Math.min(y, vh - mh - 4) + 'px';
    });

    // Cerrar al hacer clic fuera o Escape
    const closeHandler = (ev) => {
      if (ev.type === 'keydown' && ev.key !== 'Escape') return;
      if (ev.type === 'mousedown' && menu.contains(ev.target)) return;
      _closeGlobal();
      document.removeEventListener('mousedown', closeHandler, true);
      document.removeEventListener('keydown',   closeHandler, true);
    };
    setTimeout(() => {
      document.addEventListener('mousedown', closeHandler, true);
      document.addEventListener('keydown',   closeHandler, true);
    }, 0);
  }

  /* ── Acciones para CodeMirror ── */

  function _buildCmMenu(menu, cm) {
    const sel     = cm.getSelection();
    const hasSel  = sel.length > 0;

    menu.appendChild(_mkItem('Cortar',         'Ctrl+X', async () => {
      if (hasSel) { await _write(sel); cm.replaceSelection(''); }
    }, !hasSel));

    menu.appendChild(_mkItem('Copiar',         'Ctrl+C', async () => {
      const s = cm.getSelection() || cm.getValue();
      await _write(s);
    }, false));

    menu.appendChild(_mkItem('Pegar',          'Ctrl+V', async () => {
      const text = await _read();
      if (text) cm.replaceSelection(text);
    }, false));

    menu.appendChild(_mkItem('Eliminar',       'Del', () => {
      if (hasSel) {
        cm.replaceSelection('');
      } else {
        const cur  = cm.getCursor();
        const line = cm.getLine(cur.line);
        if (cur.ch < line.length)
          cm.replaceRange('', cur, { line: cur.line, ch: cur.ch + 1 });
      }
    }, false));

    menu.appendChild(_mkSep());

    menu.appendChild(_mkItem('Seleccionar todo', 'Ctrl+A', () => {
      cm.execCommand('selectAll');
    }, false));
  }

  /* ── Acciones para INPUT / TEXTAREA nativos ── */

  function _buildInputMenu(menu, el) {
    const s      = el.selectionStart ?? 0;
    const e2     = el.selectionEnd   ?? 0;
    const hasSel = s !== e2;

    menu.appendChild(_mkItem('Cortar',  'Ctrl+X', async () => {
      if (!hasSel) return;
      await _write(el.value.slice(s, e2));
      el.value = el.value.slice(0, s) + el.value.slice(e2);
      el.selectionStart = el.selectionEnd = s;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }, !hasSel));

    menu.appendChild(_mkItem('Copiar',  'Ctrl+C', async () => {
      await _write(hasSel ? el.value.slice(s, e2) : el.value);
    }, false));

    menu.appendChild(_mkItem('Pegar',   'Ctrl+V', async () => {
      const text = await _read();
      if (!text) return;
      el.focus();
      const ns = el.selectionStart, ne = el.selectionEnd;
      el.value = el.value.slice(0, ns) + text + el.value.slice(ne);
      el.selectionStart = el.selectionEnd = ns + text.length;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }, false));

    menu.appendChild(_mkItem('Eliminar', 'Del', () => {
      if (hasSel) {
        el.value = el.value.slice(0, s) + el.value.slice(e2);
        el.selectionStart = el.selectionEnd = s;
      } else {
        el.value = el.value.slice(0, s) + el.value.slice(s + 1);
        el.selectionStart = el.selectionEnd = s;
      }
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }, false));

    menu.appendChild(_mkSep());

    menu.appendChild(_mkItem('Seleccionar todo', 'Ctrl+A', () => {
      el.focus(); el.select();
    }, false));
  }

  /* ── Listener global de contextmenu ── */

  document.addEventListener('contextmenu', function (e) {
    // Terminales xterm ya están manejadas por TerminalMenu.attach() — no interferir
    if (e.target.closest('#terminalWrapper') || e.target.closest('#smTerminal')) return;

    const cmWrapper = e.target.closest('.CodeMirror');
    const tag       = e.target.tagName;
    const isInput   = tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable;
    const isManaged = cmWrapper || isInput
      || e.target.closest('#smCommandInput')
      || e.target.closest('#smFileNameInput')
      || e.target.closest('#fileNameInput');

    // Siempre prevenir el menú nativo de CEF/WebView
    e.preventDefault();
    e.stopPropagation();

    if (!isManaged) { _closeGlobal(); return; }

    if (cmWrapper) {
      const cm = cmWrapper.CodeMirror;
      if (!cm) return;
      _showAt(e.clientX, e.clientY, (menu) => _buildCmMenu(menu, cm));
    } else {
      const target = isInput ? e.target : e.target.closest('input,textarea') || e.target;
      _showAt(e.clientX, e.clientY, (menu) => _buildInputMenu(menu, target));
    }
  }, true /* capture: interceptar antes que cualquier otro listener */);

})();