# Diagramas de "Conexiones eléctricas"

Los diagramas que se ven con el botón de conexiones eléctricas de los
tutoriales (`static/img/conexiones/*.svg`) se generan aquí, todos con el
mismo formato:

- La placa **ESP32 WeMos D1 R32** y los módulos con los mismos dibujos del
  simulador 3DPitSimu (copiados en `componentes/`).
- Cables trazados solos: solo en horizontal y vertical, separados entre sí y
  sin pasar por encima de la tarjeta ni de los módulos.
- A la derecha, la tabla de conexiones (con el color de cada cable), el
  material y una nota.

Los diagramas anteriores están en `static/img/conexiones_anteriores/`.

## Agregar o cambiar un diagrama

1. Edita `diagramas.js`. Cada diagrama dice qué módulos usa y qué pin va con
   cuál:

   ```js
   {
     archivo: "dht11", titulo: "DHT11 — Temperatura y Humedad", tutoriales: ["dht11"],
     modulos: [{ id: "s", tipo: "dht11", etiqueta: "DHT11", material: "Sensor DHT11" }],
     conexiones: [["s.signal", "IO4"], ["s.vcc", "3V3"], ["s.gnd", "GND"]],
     nota: "Siempre a 3V3.",
   }
   ```

   - `tipo` es el nombre de un componente de `componentes/` (el `.json`
     trae los nombres de sus pines) o uno de los genéricos de
     `componentes.js`.
   - `"GND"` y `"5V"` eligen solos el pin más cómodo de la placa; para uno
     en particular usa `"esp.gnd_0"` (arriba), `"esp.gnd_1"` / `"esp.gnd_2"`
     (abajo), `"esp.5v_1"`, `"esp.5v_2"`.
   - `{ r: "220 Ω" }` dibuja una resistencia en ese cable.
   - Si un módulo no queda bien, se puede fijar con `pos: [x, y]` (relativo a
     la placa) o pedir un lado con `lado: "arriba" | "abajo" | "izquierda" | "derecha"`.

2. Genera los diagramas (Node.js):

   ```
   node scripts/conexiones/generar.js            # todos (tarda unos minutos)
   node scripts/conexiones/generar.js dht11 oled # solo esos
   ```

3. Si el diagrama es para un tutorial nuevo, actualiza las rutas:

   ```
   node scripts/conexiones/actualizar_tutoriales.js
   ```

4. Sube `CACHE_NAME` en `service-worker.js` y regenera `static/file-list.json`.

## Cables

- Se dibujan como en el simulador (una línea de color, esquinas redondeadas).
- Un cable puede cruzar por encima de otro (el generador lo evita si hay un
  camino parecido), pero nunca pasa por encima de la tarjeta ni de un módulo.
- El Material dice el tipo de cable de cada conexión: la D1 R32 tiene
  conector hembra (punta **macho**), los módulos y las patas de LED o
  resistencia son pines macho (punta **hembra**) y los bornes de tornillo
  llevan punta **macho** (lista `BORNES` en `generar.js`).
- `marcas: [[x, y, "+", tamaño, color]]` en un módulo pone una marca junto a
  él (se usa para la polaridad del LED).

## Diagramas armados en el simulador

Si el circuito se arma en 3DPitSimu y se guarda en `scripts/Tutoriales/`
(con el nombre del tutorial), en `diagramas.js` basta poner
`simulador: "archivo.json"` (lista `DEL_SIMULADOR`): se respetan las piezas,
su lugar y giro, y el recorrido, color y tipo de cada cable; el generador
solo agrega los pines resaltados, la tabla, el material y la nota.
