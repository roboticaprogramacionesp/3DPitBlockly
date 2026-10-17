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

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    if (request.method === "POST" && url.pathname === "/share") {
      const body = await request.text();
      if (!body || body.length > MAX_BODY_BYTES) {
        return new Response("Invalid body", {
          status: 400,
          headers: corsHeaders(),
        });
      }

      let id;
      do {
        id = randomId();
      } while ((await env.PROJECTS.get(id)) !== null);

      await env.PROJECTS.put(id, body, { expirationTtl: TTL_SECONDS });

      return new Response(JSON.stringify({ id }), {
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      });
    }

    const match = url.pathname.match(/^\/share\/([A-Za-z0-9]+)$/);
    if (request.method === "GET" && match) {
      const stored = await env.PROJECTS.get(match[1]);
      if (stored === null) {
        return new Response("Not found", {
          status: 404,
          headers: corsHeaders(),
        });
      }
      return new Response(stored, { headers: corsHeaders() });
    }

    return new Response("Not found", { status: 404, headers: corsHeaders() });
  },
};
