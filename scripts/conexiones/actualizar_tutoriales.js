// Pone en static/tutorial-steps.js la ruta del diagrama de cada tutorial
// según "tutoriales" de diagramas.js (correr después de agregar uno nuevo).
//   node scripts/conexiones/actualizar_tutoriales.js
const fs = require("fs");
const path = require("path");
const DIAGRAMAS = require("./diagramas");

const archivo = path.join(__dirname, "..", "..", "static", "tutorial-steps.js");
let s = fs.readFileSync(archivo, "utf8");
const nl = s.includes("\r\n") ? "\r\n" : "\n";
let cambios = 0;
const faltan = [];
for (const d of DIAGRAMAS) {
  for (const t of d.tutoriales || []) {
    const re = new RegExp(`(${nl}  ${t}: \\{${nl}    title: "[^"]*"[^\\r\\n]*${nl}    diagram: ")([^"]*)(")`);
    const m = s.match(re);
    if (!m) { faltan.push(t); continue; }
    const nuevo = `img/conexiones/${d.archivo}.svg`;
    if (m[2] !== nuevo) { s = s.replace(re, `$1${nuevo}$3`); cambios++; }
  }
}
fs.writeFileSync(archivo, s);
console.log(`${cambios} tutoriales actualizados`);
if (faltan.length) console.log("No encontré:", faltan.join(", "));
// Tutoriales con diagrama que no están en diagramas.js
const todos = [...s.matchAll(new RegExp(`${nl}  (\\w+): \\{${nl}    title: "[^"]*"[^\\r\\n]*${nl}    diagram: "([^"]*)"`, "g"))];
const conocidos = new Set(DIAGRAMAS.flatMap((d) => d.tutoriales || []));
const sueltos = todos.filter((m) => !conocidos.has(m[1])).map((m) => `${m[1]} (${m[2]})`);
if (sueltos.length) console.log("Sin diagrama nuevo:", sueltos.join(", "));
