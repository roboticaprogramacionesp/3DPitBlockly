/* ══════════════════════════════════════════════════════════════
   melody_blocks.js — Bloque "melodía" para el buzzer, hecho con el
   editor de melodías (static/tools/melodias.html).

   Guarda la melodía como texto RTTTL en la mutación y la toca con
   rtttl.play() de la librería rtttl.py del firmware (la misma que usa el
   bloque buzzer_song con las canciones de songs.py). Al tocar el ícono ♪
   se abre el editor con la melodía cargada (ToolsPanel.edit).
   Agregar este <script> DESPUÉS de conversion.js y micropython.js.
══════════════════════════════════════════════════════════════ */

const MELODY_DEFAULT = "Mi melodia:d=4,o=5,b=120:c,d,e,f,g";

const MELODY_ICON =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' +
      '<rect width="24" height="24" rx="5" fill="#fff"/>' +
      '<path d="M9 17.5a2.5 2.5 0 1 1-2-2.45V5l11-2v11.5a2.5 2.5 0 1 1-2-2.45V6.4L9 7.7z" fill="#5b4bd6"/>' +
      "</svg>",
  );

// Solo lo que entiende RTTTL; el nombre no puede tener ":" ni ",".
function cleanRtttl(text) {
  const parts = String(text || "").split(":");
  if (parts.length !== 3) return MELODY_DEFAULT;
  const title = parts[0].replace(/[^A-Za-z0-9 _-]/g, "").trim() || "Melodia";
  const defaults = parts[1].toLowerCase().replace(/[^dob=0-9,]/g, "");
  const notes = parts[2].toLowerCase().replace(/[^a-gp0-9#.,]/g, "");
  return `${title}:${defaults}:${notes}`;
}

Blockly.defineBlocksWithJsonArray([
  {
    type: "buzzer_melody",
    message0: "♪ tocar melodía pin %1",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        // Sin 34–39: son solo de entrada, no pueden generar PWM.
        options: makePinOptionsFn(
          ["0", "2", "4", "5", "12", "13", "14", "15", "16", "17", "18", "19", "23", "25", "26", "27", "32", "33"].map(
            (p) => [p, p],
          ),
        ),
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 60,
    tooltip: "Toca una melodía en el buzzer. Toca el ícono ♪ para componerla o cambiarla.",
    mutator: "buzzer_melody_ext",
  },
]);

Blockly.Extensions.registerMutator(
  "buzzer_melody_ext",
  {
    rtttl_: MELODY_DEFAULT,

    mutationToDom: function () {
      const m = Blockly.utils.xml.createElement("mutation");
      m.setAttribute("rtttl", this.rtttl_);
      return m;
    },

    domToMutation: function (xml) {
      this.setMelody_(xml.getAttribute("rtttl"));
    },

    getToolPayload_: function () {
      return { rtttl: this.rtttl_, pin: this.getFieldValue("PIN") };
    },

    setMelody_: function (text) {
      this.rtttl_ = cleanRtttl(text);
      const [title, , notes] = this.rtttl_.split(":");
      const count = notes ? notes.split(",").filter(Boolean).length : 0;
      const block = this;
      if (this.getInput("MELODY")) this.removeInput("MELODY");
      this.appendDummyInput("MELODY")
        .appendField(
          new Blockly.FieldImage(MELODY_ICON, 24, 24, "editar melodía", function () {
            if (!block.isInFlyout && window.ToolsPanel) window.ToolsPanel.edit(block);
          }),
        )
        .appendField(`${title} (${count} notas)`);
    },
  },
  function () {
    this.setMelody_(MELODY_DEFAULT);
  },
);

Blockly.Python["buzzer_melody"] = function (block) {
  Blockly.Python.definitions_["import_pin"] = "from machine import Pin";
  Blockly.Python.definitions_["import_rtttl_only"] = "import rtttl";
  const pin = block.getFieldValue("PIN");
  return `rtttl.play(Pin(${pin}, Pin.OUT), '${block.rtttl_}')\n`;
};

if (Blockly.JavaScript && !Blockly.JavaScript["buzzer_melody"]) {
  Blockly.JavaScript["buzzer_melody"] = function () { return ""; };
}
