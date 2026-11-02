/* ============================================================
   Service Worker — 3DPit Blocks PWA
   ============================================================ */

const CACHE_NAME = '3dpit-blocks-v82';

/* ── INSTALL ── */
self.addEventListener('install', event => {
  event.waitUntil(
    fetch('./static/file-list.json')
      .then(r => r.json())
      .then(dynamicFiles => {
        const allFiles = [
          './',
          './static/pwa-manifest.json',
          './static/manifest.json',
          './static/3DPit.ico',
          /* CSS */
          './static/css-tutorial.css',
          './static/nuevo.css',
          './static/xterm.css',
          './static/tutorial-steps.css',
          './static/serial-monitor.css',
          './static/viewcode.css',
          /* JS principal */
          './static/xterm.js',
          './static/xterm-addon-fit.js',
          './static/xterm-addon-links.js',
          './static/main.js',
          './static/animation.js',
          './static/conversion.js',
          './static/game-engine.js',
          './static/game-ui.js',
          './static/game_blocks.js',
          './static/serial-monitor.js',
          './static/tutorial-steps.js',
          './static/tutorial-docente.js',
          './static/viewcode.js',
          './static/undoRedo.js',
          './static/workspaceWarnings.js',
          './static/tools-panel.js',
          './static/tools/index.html',
          './static/tools/tools.css',
          './static/tools/tools.js',
          './static/tools/neopixel.html',
          './static/tools/matriz8x8.html',
          './static/tools/oled.html',
          './static/tools/lcd.html',
          './static/display_image_blocks.js',
          './static/melody_blocks.js',
          './static/tools/melodias.html',
          './static/tools/songs.js',
          './static/tools/pixel-editor.js',
          './static/tools/tft.html',
          './static/tools/tm1637.html',
          './static/tools/pins.js',
          './static/tools/pines.html',
          './static/tools/servo.html',
          './static/tools/colores.html',
          './static/tools/resistencias.html',
          './static/tools/calculadoras.html',
          './static/tools/numeros.html',
          './static/tools/ascii.html',
          './static/tools/logica.html',
          './static/tools/i2c.html',
          './static/tools/lector.html',
          './static/tools/retos.html',
          './static/tools/quiz.html',
          './static/retos-data.js',
          './static/retos.js',
          './static/servo_blocks.js',
          './static/svgToPng.js',
          './static/code-tutor.js',
          './static/js-tutorial.js',
          './static/micropython.js',
          './static/field_slider.js',
          './static/install-button.js',
          './static/lz-string.js',
          './static/qrcode.js',
          /* JS ESP32 */
          './static/esp32-DlivVhIs.js',
          './static/esp32c3-f8fwIr7_.js',
          './static/esp32s3-vxLttl29.js',
          './static/index-Dt9w-IG1.js',
          './static/rom-B2LvkjpK.js',
          './static/stub_flasher_32-BLbsWvxO.js',
          './static/stub_flasher_32c3-DmSvHQKL.js',
          './static/stub_flasher_32s3-CiJyd6Fk.js',
          './static/styles-sT2V1cOw.js',
          './static/install-dialog-C5LjR_e6.js',
          /* CodeMirror */
          './static/codeMirror/codemirror.css',
          './static/codeMirror/dracula.css',
          './static/codeMirror/codemirror.js',
          './static/codeMirror/lang-python.js',
          /* Imágenes y media desde file-list.json */
          ...dynamicFiles
        ];

        return caches.open(CACHE_NAME).then(cache =>
          Promise.allSettled(
            allFiles.map(url =>
              /* cache.add() usa la caché HTTP del navegador, que a veces ya
                 tiene guardada una respuesta 206 (Partial Content) para este
                 mismo archivo — típico en audio/video que se pidió antes con
                 Range. La Cache API no acepta 206, así que forzamos una
                 petición de red completa ({cache:'reload'}) y solo guardamos
                 si la respuesta es un 200 normal. */
              fetch(url, { cache: 'reload' })
                .then(response => {
                  if (response.status === 200) return cache.put(url, response);
                })
                .catch(err =>
                  console.warn('[SW] No se pudo cachear:', url, err)
                )
            )
          )
        );
      })
      .catch(err => {
        /* Si falla el JSON igual cachea los archivos base */
        console.warn('[SW] No se pudo cargar file-list.json:', err);
        return self.skipWaiting();
      })
      .then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── FETCH: Cache-first, red como respaldo ── */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          /* GitHub Pages manda los 404 con Cache-Control: max-age=600, y el
             navegador los reusa 10 minutos: si una imagen se pidió justo
             mientras se publicaba un cambio (archivo nuevo o renombrado),
             seguía "rota" aunque ya existiera. Se vuelve a pedir una vez
             saltando la caché HTTP. */
          if (response && response.status === 404 && event.request.destination === 'image') {
            return fetch(event.request, { cache: 'reload' });
          }
          return response;
        })
        .then(response => {
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }
          const toCache = response.clone();
          caches.open(CACHE_NAME).then(cache =>
            cache.put(event.request, toCache)
          );
          return response;
        })
        .catch(() => {
          if (event.request.destination === 'document') {
            return caches.match('./');
          }
        });
    })
  );
});