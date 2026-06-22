/* ============================================================
   Service Worker — 3DPit Blocks PWA
   Coloca este archivo en la RAÍZ del proyecto (junto a index.html)
   ============================================================ */

const CACHE_NAME = '3dpit-blocks-v1';

/* ── Archivos que se cachean al instalar ── */
const PRECACHE = [
  '/',
  '/index.html',

  /* CSS */
  '/static/css-tutorial.css',
  '/static/code-tutor.css',
  '/static/nuevo.css',
  '/static/xterm.css',
  '/static/tutorial-steps.css',
  '/static/serial-monitor.css',
  '/static/viewcode.css',
  '/static/codeTerminal.css',

  /* JS principal */
  '/static/xterm.js',
  '/static/xterm-addon-fit.js',
  '/static/xterm-addon-links.js',
  '/static/main.js',
  '/static/animation.js',
  '/static/conversion.js',
  '/static/game-engine.js',
  '/static/game-ui.js',
  '/static/game_blocks.js',
  '/static/serial-monitor.js',
  '/static/tutorial-steps.js',
  '/static/viewcode.js',
  '/static/undoRedo.js',
  '/static/svgToPng.js',
  '/static/code-tutor.js',
  '/static/js-tutorial.js',
  '/static/micropython.js',
  '/static/install-button.js',
  '/static/lz-string.js',

  /* JS ESP32 */
  '/static/esp32-DlivVhIs.js',
  '/static/esp32c3-f8fwIr7_.js',
  '/static/esp32s3-vxLttl29.js',
  '/static/index-Dt9w-IG1.js',
  '/static/rom-B2LvkjpK.js',
  '/static/stub_flasher_32-BLbsWvxO.js',
  '/static/stub_flasher_32c3-DmSvHQKL.js',
  '/static/stub_flasher_32s3-CiJyd6Fk.js',
  '/static/styles-sT2V1cOw.js',
  '/static/install-dialog-C5LjR_e6.js',

  /* CodeMirror */
  '/static/codeMirror/codemirror.css',
  '/static/codeMirror/dracula.css',

  /* Manifest e ícono */
  '/static/manifest.json',
];

/* ── INSTALL: pre-cachear archivos esenciales ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      /* addAll falla si cualquier recurso falla.
         Usamos fetch individual para ser tolerantes. */
      return Promise.allSettled(
        PRECACHE.map(url =>
          cache.add(url).catch(err =>
            console.warn('[SW] No se pudo cachear:', url, err)
          )
        )
      );
    }).then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE: borrar caches viejos ── */
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
  /* Solo interceptar GET del mismo origen */
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      /* No está en cache → buscar en red y cachear al vuelo */
      return fetch(event.request)
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
          /* Sin red y sin cache → página de fallback */
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
    })
  );
});
