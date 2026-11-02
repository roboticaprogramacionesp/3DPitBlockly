/* ══════════════════════════════════════════════════════════════
   servo_blocks.js — Servo con pulso calibrado, para usar con la
   herramienta "Probar servo" (static/tools/servo.html).

   Los bloques de servo de siempre usan un rango fijo (map_servo, duty
   21–132 de 1023). Cada modelo de servo llega a 0° y 180° con un pulso
   un poco distinto: con este bloque se usa el mínimo y el máximo (en
   microsegundos) que se encontró probando el servo con la herramienta.
   Necesita antes el bloque "servo Pin" (init_servo) del mismo pin.
   Agregar este <script> DESPUÉS de conversion.js y micropython.js.
══════════════════════════════════════════════════════════════ */

Blockly.defineBlocksWithJsonArray([
  {
    type: "servo_move_pulse",
    message0: "servo pin %1 mover a %2 ° pulso mín %3 µs máx %4 µs",
    args0: [
      { type: "field_dropdown", name: "PIN", options: window.makeAnyPinOptionsFn() },
      { type: "input_value", name: "ANGLE", check: "Number" },
      { type: "field_number", name: "MIN", value: 500, min: 300, max: 1500, precision: 10 },
      { type: "field_number", name: "MAX", value: 2400, min: 1500, max: 3000, precision: 10 },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Mueve el servo usando el pulso mínimo (0°) y máximo (180°) de TU servo. " +
      "Encuéntralos con la herramienta 🛠 Probar servo. Necesita antes 'servo Pin'.",
  },
]);

Blockly.Python["servo_move_pulse"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const angle = Blockly.Python.valueToCode(block, "ANGLE", Blockly.Python.ORDER_NONE) || "90";
  Blockly.Python.definitions_["servo_pulse_func"] = `def servo_pulse(servo, angle, min_us, max_us):
    angle = min(max(angle, 0), 180)
    servo.duty_ns(int((min_us + (max_us - min_us) * angle / 180) * 1000))
`;
  return `servo_pulse(servo_${pin}, ${angle}, ${block.getFieldValue("MIN")}, ${block.getFieldValue("MAX")})\n`;
};

if (Blockly.JavaScript && !Blockly.JavaScript["servo_move_pulse"]) {
  Blockly.JavaScript["servo_move_pulse"] = function () { return ""; };
}
