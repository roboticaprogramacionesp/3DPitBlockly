/**
 * custom-flash.js
 * Permite flashear un firmware .bin local a un ESP32
 * usando ESP Web Tools con un manifest generado dinámicamente.
 *
 * Uso:
 *   1. Coloca este archivo en static/
 *   2. Agrega en index.html DESPUÉS de install-button.js:
 *        <script type="module" src="{{ url_for('static', filename='custom-flash.js') }}"></script>
 *   3. Agrega el botón en #codeBar:
 *        <button id="btnBurnCustom" class="btn-custom-flash" title="Grabar firmware personalizado (.bin)">
 *          <span class="icon-btn icon-burnfimware"></span>
 *        </button>
 */

(function () {
  'use strict';

  /* ── Esperar a que el DOM esté listo ── */
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(function () {

    /* ══════════════════════════════════════════
       1. REFERENCIAS A ELEMENTOS
    ══════════════════════════════════════════ */
    const triggerBtn = document.getElementById('btnBurnCustom');
    if (!triggerBtn) {
      console.warn('[CustomFlash] Botón #btnBurnCustom no encontrado en el DOM.');
      return;
    }

    /* Input de archivo oculto */
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.bin';
    fileInput.style.display = 'none';
    fileInput.id = 'customFlashFileInput';
    document.body.appendChild(fileInput);

    /* ══════════════════════════════════════════
       2. MODAL DE CONFIGURACIÓN
    ══════════════════════════════════════════ */
    const modalHtml = `
      <div id="customFlashOverlay" style="
        display:none; position:fixed; inset:0;
        background:rgba(0,0,0,.65); z-index:9999;
        align-items:center; justify-content:center;
        font-family:'Segoe UI',system-ui,sans-serif;">

        <div style="
          background:#1e2140; color:#e0e0ff; border-radius:12px;
          padding:28px 32px; min-width:320px; max-width:420px; width:90%;
          box-shadow:0 8px 40px rgba(0,0,0,.7);">

          <!-- Encabezado -->
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
            <h3 style="margin:0; font-size:16px; color:#fff;">📂 Firmware personalizado</h3>
            <button id="cfClose" style="
              background:none; border:none; color:#8898cc;
              font-size:20px; cursor:pointer; line-height:1; padding:0 4px;"
              title="Cerrar">✕</button>
          </div>

          <!-- Nombre del archivo -->
          <div style="
            background:#12152a; border:1px solid #2a3060; border-radius:7px;
            padding:8px 12px; margin-bottom:16px; font-size:13px; color:#8898cc;
            word-break:break-all; min-height:36px; display:flex; align-items:center; gap:8px;">
            <span style="font-size:16px;">📄</span>
            <span id="cfFileName" style="flex:1;">Ningún archivo seleccionado</span>
            <button id="cfChangeFile" style="
              background:#2a3060; border:none; border-radius:5px;
              color:#a0b0e0; font-size:11px; padding:4px 8px; cursor:pointer;
              white-space:nowrap;">Cambiar</button>
          </div>

          <!-- Chip -->
          <label style="display:block; margin-bottom:6px; font-size:12px; font-weight:600; color:#7080b0; text-transform:uppercase; letter-spacing:.06em;">
            Chip objetivo
          </label>
          <select id="cfChipSelect" style="
            width:100%; padding:8px 10px; border-radius:7px;
            border:1px solid #3454d1; background:#12152a; color:#e0e0ff;
            font-size:14px; margin-bottom:14px; box-sizing:border-box;">
            <option value="ESP32">ESP32</option>
            <option value="ESP32-S3">ESP32-S3</option>
            <option value="ESP32-C3">ESP32-C3</option>
            <option value="ESP32-S2">ESP32-S2</option>
          </select>

          <!-- Offset -->
          <label style="display:block; margin-bottom:6px; font-size:12px; font-weight:600; color:#7080b0; text-transform:uppercase; letter-spacing:.06em;">
            Offset de escritura
          </label>
          <input id="cfOffset" type="text" value="0x1000" style="
            width:100%; padding:8px 10px; border-radius:7px;
            border:1px solid #3454d1; background:#12152a; color:#e0e0ff;
            font-size:14px; margin-bottom:6px; box-sizing:border-box;"/>
          <p id="cfOffsetHint" style="margin:0 0 20px; font-size:11px; color:#55607a;">
            ESP32 → 0x1000 &nbsp;|&nbsp; ESP32-S3 / C3 / S2 → 0x0
          </p>

          <!-- Borrar flash -->
          <label style="
            display:flex; align-items:center; gap:8px;
            margin-bottom:20px; font-size:13px; color:#a0b0e0; cursor:pointer;">
            <input type="checkbox" id="cfErase" style="accent-color:#3454d1; width:15px; height:15px;"/>
            Borrar flash completa antes de escribir
          </label>

          <!-- Botones de acción -->
          <div style="display:flex; gap:10px; justify-content:flex-end;">
            <button id="cfCancel" style="
              padding:8px 18px; border-radius:7px; border:1px solid #3454d1;
              background:transparent; color:#8898cc; cursor:pointer; font-size:14px;">
              Cancelar
            </button>
            <button id="cfFlash" style="
              padding:8px 24px; border-radius:7px; border:none;
              background:#3454d1; color:#fff; cursor:pointer;
              font-size:14px; font-weight:600; display:flex; align-items:center; gap:6px;">
              ⚡ Flashear
            </button>
          </div>

        </div>
      </div>`;

    const modalWrapper = document.createElement('div');
    modalWrapper.innerHTML = modalHtml;
    document.body.appendChild(modalWrapper);

    /* Referencias a elementos del modal */
    const overlay    = document.getElementById('customFlashOverlay');
    const chipSel    = document.getElementById('cfChipSelect');
    const offsetInp  = document.getElementById('cfOffset');
    const fileLabel  = document.getElementById('cfFileName');
    const eraseChk   = document.getElementById('cfErase');
    const btnFlash   = document.getElementById('cfFlash');
    const btnCancel  = document.getElementById('cfCancel');
    const btnClose   = document.getElementById('cfClose');
    const btnChange  = document.getElementById('cfChangeFile');

    /* ══════════════════════════════════════════
       3. ESTADO INTERNO
    ══════════════════════════════════════════ */
    let selectedFile = null;
    let blobUrl      = null;
    let manifestUrl  = null;

    /* ══════════════════════════════════════════
       4. HELPERS
    ══════════════════════════════════════════ */
    function showModal() { overlay.style.display = 'flex'; }
    function hideModal() { overlay.style.display = 'none'; }

    /** Detecta chip y offset a partir del nombre del archivo */
    function autoDetect(filename) {
      const n = filename.toUpperCase();
      if      (n.includes('S3'))  { chipSel.value = 'ESP32-S3'; offsetInp.value = '0x0'; }
      else if (n.includes('C3'))  { chipSel.value = 'ESP32-C3'; offsetInp.value = '0x0'; }
      else if (n.includes('S2'))  { chipSel.value = 'ESP32-S2'; offsetInp.value = '0x0'; }
      else                        { chipSel.value = 'ESP32';    offsetInp.value = '0x1000'; }
    }

    /** Revoca blob URLs anteriores para liberar memoria */
    function revokeOldUrls() {
      if (blobUrl)     { URL.revokeObjectURL(blobUrl);     blobUrl = null; }
      if (manifestUrl) { URL.revokeObjectURL(manifestUrl); manifestUrl = null; }
    }

    /** Parsea un string de offset en hex o decimal */
    function parseOffset(raw) {
      const s = raw.trim();
      if (s.startsWith('0x') || s.startsWith('0X')) return parseInt(s, 16);
      return parseInt(s, 10);
    }

    /* ══════════════════════════════════════════
       5. FLUJO PRINCIPAL
    ══════════════════════════════════════════ */

    /* Abrir selector de archivo */
    function openFilePicker() {
      fileInput.value = '';   // permite re-seleccionar el mismo archivo
      fileInput.click();
    }

    triggerBtn.addEventListener('click', openFilePicker);
    btnChange.addEventListener('click', openFilePicker);

    /* Archivo seleccionado → mostrar modal */
    fileInput.addEventListener('change', function () {
      const file = fileInput.files[0];
      if (!file) return;
      selectedFile = file;
      fileLabel.textContent = file.name;
      autoDetect(file.name);
      showModal();
    });

    /* Actualizar hint de offset cuando cambia el chip */
    chipSel.addEventListener('change', function () {
      const needsZero = ['ESP32-S3', 'ESP32-C3', 'ESP32-S2'].includes(chipSel.value);
      offsetInp.value = needsZero ? '0x0' : '0x1000';
    });

    /* Cerrar modal */
    btnCancel.addEventListener('click', hideModal);
    btnClose.addEventListener('click', hideModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) hideModal();
    });

    /* ── FLASHEAR ── */
    btnFlash.addEventListener('click', async function () {
      if (!selectedFile) {
        alert('No hay archivo seleccionado.');
        return;
      }

      const offset = parseOffset(offsetInp.value);
      if (isNaN(offset)) {
        alert('Offset inválido. Usa formato hexadecimal (0x1000) o decimal (4096).');
        return;
      }

      revokeOldUrls();

      /* Crear blob URL para el .bin */
      blobUrl = URL.createObjectURL(selectedFile);

      /* Manifest dinámico en memoria.
         Lógica de borrado:
           - Checkbox activado   → borrar siempre sin preguntar
                                   (new_install_skip_erase: false, new_install_prompt_erase: false)
           - Checkbox desactivado → NO borrar flash
                                   (new_install_skip_erase: true)
      */
      const manifest = {
        name: selectedFile.name.replace(/\.bin$/i, ''),
        version: 'custom',
        new_install_prompt_erase: false,
        new_install_skip_erase: !eraseChk.checked,
        builds: [{
          chipFamily: chipSel.value,
          parts: [{ path: blobUrl, offset: offset }]
        }]
      };
      const manifestBlob = new Blob(
        [JSON.stringify(manifest)],
        { type: 'application/json' }
      );
      manifestUrl = URL.createObjectURL(manifestBlob);

      hideModal();

      /* Crear <esp-web-install-button> temporal */
      const espBtn = document.createElement('esp-web-install-button');
      espBtn.setAttribute('manifest', manifestUrl);
      espBtn.setAttribute('no-improv', '');
      espBtn.style.display = 'none';
      document.body.appendChild(espBtn);

      try {
        await customElements.whenDefined('esp-web-install-button');

        /* Intentar el método .install() que expone el componente */
        if (typeof espBtn.install === 'function') {
          espBtn.install();
        } else {
          /* Fallback: crear un slot activate y disparar clic */
          const inner = document.createElement('button');
          inner.setAttribute('slot', 'activate');
          espBtn.appendChild(inner);
          inner.click();
        }
      } catch (err) {
        console.error('[CustomFlash] Error al iniciar flasheo:', err);
        alert('No se pudo iniciar el flasheo: ' + err.message);
      }

      /* Limpiar el elemento temporal después de que el diálogo abra */
      setTimeout(function () {
        if (espBtn.parentNode) espBtn.parentNode.removeChild(espBtn);
      }, 3000);
    });

  }); // onReady

})();