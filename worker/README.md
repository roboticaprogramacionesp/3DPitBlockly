# Backend de links cortos (botón 🔗 Compartir proyecto)

Backend mínimo para que el botón 🔗 de 3DPit Blocks genere links realmente
cortos (`.../3DPitBlockly/#p=AbC123`) en vez de depender solo del link largo
autocontenido (`#<xml comprimido>`) o de acortadores de terceros. Mismo
mecanismo que usa MakeCode/micro:bit para "Compartir": no es un acortador de
URLs, es un guardado propio (id corto → proyecto comprimido) en
[Cloudflare Workers](https://workers.cloudflare.com/) +
[KV](https://developers.cloudflare.com/kv/), gratis para esta escala.

**Ya está desplegado**: `https://3dpitblockly-share.jp790276.workers.dev`
(cuenta de Cloudflare `jp790276@gmail.com`, namespace de KV
`3dpitblockly_share`). `static/main.js` lo usa como primer intento al
compartir (`WORKER_ENDPOINT`); si no responde cae a v.gd/is.gd, y si eso
también falla, al link largo autocontenido + QR de siempre — nada se rompe
si el Worker alguna vez deja de estar disponible.

## Endpoints

- `POST /share` — body: texto comprimido (LZString) → `{"id":"AbC123"}`
- `GET /share/<id>` — devuelve el texto guardado (404 si no existe/venció)

Los links vencen a los 180 días (`TTL_SECONDS` en `src/index.js`).

## Redesplegar tras un cambio en `src/index.js`

```
cd worker
npm install     # primera vez
npx wrangler deploy
```

Necesita estar logueado (`npx wrangler whoami` para comprobarlo,
`npx wrangler login` si hace falta — abre el navegador para el login
de Cloudflare, paso que solo puede completar una persona).

## Borrar un link puntual

```
npx wrangler kv key delete --binding=PROJECTS <id>
```
