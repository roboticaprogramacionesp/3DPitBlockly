// Backend mínimo para el botón 🔗 "Compartir proyecto" de 3DPit Blocks.
//
// Mismo mecanismo que usa MakeCode/micro:bit para "Compartir": no es un
// acortador de URLs, es un guardado propio (id corto -> proyecto
// comprimido) en Cloudflare Workers + KV.
//
//   POST /share        body: texto comprimido (LZString)  -> {"id":"AbC123"}
//   GET  /share/<id>                                      -> el texto guardado
//
// Si esto no está desplegado o no responde, el frontend (static/main.js)
// cae solo a v.gd/is.gd y, si eso también falla, al link largo
// autocontenido + QR -- ver acortarUrl()/crearLinkCorto() en main.js.

const TTL_SECONDS = 60 * 60 * 24 * 180; // 180 días
const ID_LEN = 8;
const MAX_BODY_BYTES = 200_000; // generoso para un proyecto de bloques comprimido

// ── CORS: solo los orígenes que realmente sirven esta app. Sin esto
//    (Access-Control-Allow-Origin: "*"), cualquier otro sitio web podía
//    usar este Worker -- y la cuota gratis de Cloudflare -- contra las
//    visitas de SU página, no de la nuestra. ──
const ALLOWED_ORIGINS = new Set([
  "https://roboticaprogramacionesp.github.io",
]);
const LOCAL_DEV_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

function corsHeaders(origin) {
  const allowed =
    (origin && ALLOWED_ORIGINS.has(origin)) ||
    (origin && LOCAL_DEV_ORIGIN.test(origin));
  return {
    "Access-Control-Allow-Origin": allowed ? origin : "null",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    Vary: "Origin",
  };
}

function randomId(len = ID_LEN) {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  let out = "";
  for (let i = 0; i < len; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

// ── Rate limit por IP, solo para POST (la operación que escribe en KV).
//    El plan free de Cloudflare KV tiene 1000 escrituras/día *en total*
//    para todo el Worker -- sin esto, una sola persona/script podía
//    agotarlas y dejar a todo el mundo sin "Compartir" por el resto del
//    día. Es un contador aproximado (no atómico), alcanza de sobra para
//    este caso de uso; no hace falta más precisión. ──
const RATE_LIMIT_POST_PER_DAY = 40;

async function superaRateLimit(env, ip) {
  const day = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const key = `rl:${ip}:${day}`;
  const actual = parseInt((await env.PROJECTS.get(key)) || "0", 10);
  if (actual >= RATE_LIMIT_POST_PER_DAY) return true;
  // TTL corto: el contador solo necesita vivir un par de días, y así no
  // queda guardada la IP de nadie más tiempo del necesario.
  await env.PROJECTS.put(key, String(actual + 1), {
    expirationTtl: 60 * 60 * 24 * 2,
  });
  return false;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const headers = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    if (request.method === "POST" && url.pathname === "/share") {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      if (await superaRateLimit(env, ip)) {
        return new Response("Too many requests, probá de nuevo mañana", {
          status: 429,
          headers,
        });
      }

      const body = await request.text();
      if (!body || body.length > MAX_BODY_BYTES) {
        return new Response("Invalid body", { status: 400, headers });
      }

      let id;
      do {
        id = randomId();
      } while ((await env.PROJECTS.get(id)) !== null);

      await env.PROJECTS.put(id, body, { expirationTtl: TTL_SECONDS });

      return new Response(JSON.stringify({ id }), {
        headers: { "Content-Type": "application/json", ...headers },
      });
    }

    const match = url.pathname.match(/^\/share\/([A-Za-z0-9]+)$/);
    if (request.method === "GET" && match) {
      const stored = await env.PROJECTS.get(match[1]);
      if (stored === null) {
        return new Response("Not found", { status: 404, headers });
      }
      return new Response(stored, {
        headers: {
          // Explícito en vez de dejar que el navegador adivine -- evita
          // cualquier intento de que sirva el contenido guardado como
          // HTML/script si alguien abre el link directo en una pestaña.
          "Content-Type": "text/plain; charset=utf-8",
          "X-Content-Type-Options": "nosniff",
          ...headers,
        },
      });
    }

    return new Response("Not found", { status: 404, headers });
  },
};
