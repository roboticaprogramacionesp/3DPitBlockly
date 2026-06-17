Blockly.JavaScript["time_sleep"] = function (block) {
  const time = block.getFieldValue("VALUE");
  const id = block.id;

  const code = "highlightBlock('" + id + "');\n" + "sleep(" + time + ");\n";

  return code;
};

Blockly.JavaScript["analog_sensor_init"] = function (block) {
  const model = block.getFieldValue("MODEL");
  const pin = block.getFieldValue("PIN");

  const id = block.id;

  const code =
    "highlightBlock('" +
    id +
    "');\n" +
    "analogSensor_" +
    pin +
    " = { model: '" +
    model +
    "', pin: " +
    pin +
    " };\n";

  return code;
};

Blockly.JavaScript["analog_sensor_read"] = function (block) {
  /* En simulador: llama getAdcValue() que está expuesta en el globalObject
     del intérprete y lee window._serialAdcValue del contexto real del navegador.
     Devuelve -1 si no hay tecla presionada. */
  return ["getAdcValue()", Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/* ===== DIVISIÓN SEGURA (simular Python) ===== */

Blockly.JavaScript["math_arithmetic"] = function (block) {
  const op = block.getFieldValue("OP");

  const A =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";

  const B =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";

  if (op === "DIVIDE") {
    const code =
      "((" +
      B +
      ")==0 ? (function(){ throw new Error('division by zero'); })() : (" +
      A +
      "/" +
      B +
      "))";

    return [code, Blockly.JavaScript.ORDER_DIVISION];
  }

  /* operaciones normales */

  const OPERATORS = {
    ADD: [" + ", Blockly.JavaScript.ORDER_ADDITION],
    MINUS: [" - ", Blockly.JavaScript.ORDER_SUBTRACTION],
    MULTIPLY: [" * ", Blockly.JavaScript.ORDER_MULTIPLICATION],
  };

  const tuple = OPERATORS[op];
  const code = A + tuple[0] + B;

  return [code, tuple[1]];
};

/* ===== GENERADOR IF OPTIMIZADO ===== */
Blockly.JavaScript["controls_if"] = function (block) {
  let n = 0;
  let code = "";
  const id = block.id;

  do {
    const condition =
      Blockly.JavaScript.valueToCode(
        block,
        "IF" + n,
        Blockly.JavaScript.ORDER_NONE,
      ) || "false";

    const branch = Blockly.JavaScript.statementToCode(block, "DO" + n);

    if (n === 0) {
      code += "highlightBlock('" + id + "');\n";
      code += "if (" + condition + ") {\n" + branch + "}";
    } else {
      code += " else if (" + condition + ") {\n" + branch + "}";
    }

    n++;
  } while (block.getInput("IF" + n));

  if (block.getInput("ELSE")) {
    const elseBranch = Blockly.JavaScript.statementToCode(block, "ELSE");
    code += " else {\n" + elseBranch + "}";
  }

  code += "\n";

  return code;
};

/* ===== GENERADOR TRY / EXCEPT ===== */

Blockly.JavaScript["controls_try_except"] = function (block) {
  const tryBranch = Blockly.JavaScript.statementToCode(block, "TRY");

  const exceptBranch = Blockly.JavaScript.statementToCode(block, "EXCEPT");

  const id = block.id;

  const code =
    "highlightBlock('" +
    id +
    "');\n" +
    "try {\n" +
    tryBranch +
    "} catch (e) {\n" +
    exceptBranch +
    "}\n";

  return code;
};

/* ===== GENERADOR CONTINUE (EXCEPT) ===== */

Blockly.JavaScript["exceptions_continue"] = function (block) {
  const id = block.id;

  const code = "highlightBlock('" + id + "');\n" + "continue;\n";

  return code;
};

/* ===== GENERADOR PASS ===== */

Blockly.JavaScript["pass"] = function (block) {
  const id = block.id;

  const code = "highlightBlock('" + id + "');\n" + ";\n"; // instrucción vacía

  return code;
};

/* ===== BLOQUE INICIO ===== */

Blockly.JavaScript["runstart"] = function (block) {
  return "";
};

/* ══════════════════════════════════════════════════════════════
   GENERADORES JS — BLOQUES CUSTOM (lógica / simulación)
   Traducen los mismos bloques que MicroPython usa en el ESP32
   pero en JavaScript para que la animación Blockly funcione.
══════════════════════════════════════════════════════════════ */

/* ── Conversiones de tipo ── */
Blockly.JavaScript["convert_to_int"] = function (block) {
  const v =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_NONE,
    ) || "0";
  return [
    "Math.trunc(Number(" + v + "))",
    Blockly.JavaScript.ORDER_FUNCTION_CALL,
  ];
};
Blockly.JavaScript["convert_to_float"] = function (block) {
  const v =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_NONE,
    ) || "0";
  return ["Number(" + v + ")", Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["convert_to_str"] = function (block) {
  const v =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_NONE,
    ) || "''";
  return ["String(" + v + ")", Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["is_int"] = function (block) {
  const v =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_NONE,
    ) || "0";
  return [
    "(Number.isInteger(" + v + "))",
    Blockly.JavaScript.ORDER_FUNCTION_CALL,
  ];
};
Blockly.JavaScript["is_float"] = function (block) {
  const v =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_NONE,
    ) || "0";
  return [
    "(typeof (" + v + ") === 'number')",
    Blockly.JavaScript.ORDER_FUNCTION_CALL,
  ];
};
Blockly.JavaScript["is_str"] = function (block) {
  const v =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_NONE,
    ) || "''";
  return [
    "(typeof (" + v + ") === 'string')",
    Blockly.JavaScript.ORDER_FUNCTION_CALL,
  ];
};
Blockly.JavaScript["is_list"] = function (block) {
  const v =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_NONE,
    ) || "[]";
  return ["(Array.isArray(" + v + "))", Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/* ── Texto ── */
Blockly.JavaScript["simple_text"] = function (block) {
  const text = block.getFieldValue("NAME") || "";
  return [
    "'" + text.replace(/'/g, "\\'") + "'",
    Blockly.JavaScript.ORDER_ATOMIC,
  ];
};
Blockly.JavaScript["input_text"] = function (block) {
  const prompt =
    Blockly.JavaScript.valueToCode(
      block,
      "TEXT",
      Blockly.JavaScript.ORDER_NONE,
    ) || "''";
  return [
    "prompt(" + prompt + ") || ''",
    Blockly.JavaScript.ORDER_FUNCTION_CALL,
  ];
};
Blockly.JavaScript["text_encode"] = function (block) {
  const v =
    Blockly.JavaScript.valueToCode(
      block,
      "TEXT",
      Blockly.JavaScript.ORDER_NONE,
    ) || "''";
  /* En JS devolvemos el string tal cual — el encoder real solo aplica al ESP32 */
  return [v, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["text_decode"] = function (block) {
  const v =
    Blockly.JavaScript.valueToCode(
      block,
      "BYTES",
      Blockly.JavaScript.ORDER_NONE,
    ) || "''";
  const strip = block.getFieldValue("STRIP") === "TRUE";
  const code = strip ? "String(" + v + ").trim()" : "String(" + v + ")";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["text_to_bytes"] = function (block) {
  const v =
    Blockly.JavaScript.valueToCode(
      block,
      "TEXT",
      Blockly.JavaScript.ORDER_NONE,
    ) || "''";
  return [
    "Array.from(String(" + v + ")).map(function(c){return c.charCodeAt(0);})",
    Blockly.JavaScript.ORDER_ATOMIC,
  ];
};

/* ── Matemática ── */
Blockly.JavaScript["math_map"] = function (block) {
  const x =
    Blockly.JavaScript.valueToCode(block, "X", Blockly.JavaScript.ORDER_NONE) ||
    "0";
  const inMin =
    Blockly.JavaScript.valueToCode(
      block,
      "IN_MIN",
      Blockly.JavaScript.ORDER_NONE,
    ) || "0";
  const inMax =
    Blockly.JavaScript.valueToCode(
      block,
      "IN_MAX",
      Blockly.JavaScript.ORDER_NONE,
    ) || "1023";
  const outMin =
    Blockly.JavaScript.valueToCode(
      block,
      "OUT_MIN",
      Blockly.JavaScript.ORDER_NONE,
    ) || "0";
  const outMax =
    Blockly.JavaScript.valueToCode(
      block,
      "OUT_MAX",
      Blockly.JavaScript.ORDER_NONE,
    ) || "180";
  const code =
    "((" +
    x +
    " - " +
    inMin +
    ") * (" +
    outMax +
    " - " +
    outMin +
    ") / (" +
    inMax +
    " - " +
    inMin +
    ") + " +
    outMin +
    ")";
  return [code, Blockly.JavaScript.ORDER_ADDITION];
};

/* ── Listas ── */
Blockly.JavaScript["list_empty"] = function () {
  return ["[]", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["lists_append"] = function (block) {
  const id = block.id;
  const list = Blockly.JavaScript.nameDB_
    ? Blockly.JavaScript.nameDB_.getName(
        block.getFieldValue("LIST"),
        Blockly.VARIABLE_CATEGORY_NAME,
      )
    : block.getFieldValue("LIST");
  const item =
    Blockly.JavaScript.valueToCode(
      block,
      "ITEM",
      Blockly.JavaScript.ORDER_NONE,
    ) || "0";
  return "highlightBlock('" + id + "');\n" + list + ".push(" + item + ");\n";
};

/* ── Diccionarios (JS Object) ── */
Blockly.JavaScript["dict_create_with"] = function (block) {
  const pairs = [];
  for (let i = 0; i < block.itemCount_; i++) {
    const p = Blockly.JavaScript.valueToCode(
      block,
      "ADD" + i,
      Blockly.JavaScript.ORDER_NONE,
    );
    if (p) pairs.push(p);
  }
  return ["{" + pairs.join(", ") + "}", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["dict_create_empty"] = function () {
  return ["{}", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["dict_pair"] = function (block) {
  const key =
    Blockly.JavaScript.valueToCode(
      block,
      "KEY",
      Blockly.JavaScript.ORDER_NONE,
    ) || "''";
  const val =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_NONE,
    ) || "null";
  return ["[" + key + "]: " + val, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["dict_get"] = function (block) {
  const d =
    Blockly.JavaScript.valueToCode(
      block,
      "DICT",
      Blockly.JavaScript.ORDER_MEMBER,
    ) || "{}";
  const k =
    Blockly.JavaScript.valueToCode(
      block,
      "KEY",
      Blockly.JavaScript.ORDER_NONE,
    ) || "''";
  return [d + "[" + k + "]", Blockly.JavaScript.ORDER_MEMBER];
};
Blockly.JavaScript["dict_set"] = function (block) {
  const id = block.id;
  const d =
    Blockly.JavaScript.valueToCode(
      block,
      "DICT",
      Blockly.JavaScript.ORDER_MEMBER,
    ) || "{}";
  const k =
    Blockly.JavaScript.valueToCode(
      block,
      "KEY",
      Blockly.JavaScript.ORDER_NONE,
    ) || "''";
  const v =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_NONE,
    ) || "null";
  return "highlightBlock('" + id + "');\n" + d + "[" + k + "] = " + v + ";\n";
};
Blockly.JavaScript["dict_remove"] = function (block) {
  const id = block.id;
  const d =
    Blockly.JavaScript.valueToCode(
      block,
      "DICT",
      Blockly.JavaScript.ORDER_MEMBER,
    ) || "{}";
  const k =
    Blockly.JavaScript.valueToCode(
      block,
      "KEY",
      Blockly.JavaScript.ORDER_NONE,
    ) || "''";
  return "highlightBlock('" + id + "');\ndelete " + d + "[" + k + "];\n";
};
Blockly.JavaScript["dict_has_key"] = function (block) {
  const d =
    Blockly.JavaScript.valueToCode(
      block,
      "DICT",
      Blockly.JavaScript.ORDER_NONE,
    ) || "{}";
  const k =
    Blockly.JavaScript.valueToCode(
      block,
      "KEY",
      Blockly.JavaScript.ORDER_NONE,
    ) || "''";
  return [k + " in " + d, Blockly.JavaScript.ORDER_IN];
};
Blockly.JavaScript["dict_keys"] = function (block) {
  const d =
    Blockly.JavaScript.valueToCode(
      block,
      "DICT",
      Blockly.JavaScript.ORDER_MEMBER,
    ) || "{}";
  return ["Object.keys(" + d + ")", Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["dict_values"] = function (block) {
  const d =
    Blockly.JavaScript.valueToCode(
      block,
      "DICT",
      Blockly.JavaScript.ORDER_MEMBER,
    ) || "{}";
  return ["Object.values(" + d + ")", Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["dict_length"] = function (block) {
  const d =
    Blockly.JavaScript.valueToCode(
      block,
      "DICT",
      Blockly.JavaScript.ORDER_NONE,
    ) || "{}";
  return ["Object.keys(" + d + ").length", Blockly.JavaScript.ORDER_MEMBER];
};
Blockly.JavaScript["dict_is_dictionary"] = function (block) {
  const d =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_NONE,
    ) || "{}";
  return [
    "(typeof (" +
      d +
      ") === 'object' && !Array.isArray(" +
      d +
      ") && (" +
      d +
      ") !== null)",
    Blockly.JavaScript.ORDER_LOGICAL,
  ];
};

/* ── JSON ── */
Blockly.JavaScript["json_create"] = function (block) {
  return ["{}", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["json_dumps"] = function (block) {
  const obj =
    Blockly.JavaScript.valueToCode(
      block,
      "OBJ",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "{}";
  return [
    "JSON.stringify(" + obj + ")",
    Blockly.JavaScript.ORDER_FUNCTION_CALL,
  ];
};
Blockly.JavaScript["json_loads"] = function (block) {
  const txt =
    Blockly.JavaScript.valueToCode(
      block,
      "TEXT",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "'{}'";
  return ["JSON.parse(" + txt + ")", Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["json_get"] = function (block) {
  const obj =
    Blockly.JavaScript.valueToCode(
      block,
      "OBJ",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "{}";
  const key = block.getFieldValue("KEY") || "";
  return [obj + "['" + key + "']", Blockly.JavaScript.ORDER_MEMBER];
};
Blockly.JavaScript["json_set"] = function (block) {
  const id = block.id;
  const obj =
    Blockly.JavaScript.valueToCode(
      block,
      "OBJ",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "{}";
  const key = block.getFieldValue("KEY") || "";
  const val =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "null";
  return (
    "highlightBlock('" + id + "');\n" + obj + "['" + key + "'] = " + val + ";\n"
  );
};
Blockly.JavaScript["json_has_key"] = function (block) {
  const obj =
    Blockly.JavaScript.valueToCode(
      block,
      "OBJ",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "{}";
  const key = block.getFieldValue("KEY") || "";
  return ["('" + key + "' in " + obj + ")", Blockly.JavaScript.ORDER_IN];
};

/* ── Tiempo ── */
Blockly.JavaScript["time_ticks_ms"] = function (block) {
  return ["Date.now()", Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["time_ticks_diff"] = function (block) {
  const tNew =
    Blockly.JavaScript.valueToCode(
      block,
      "NEW",
      Blockly.JavaScript.ORDER_NONE,
    ) || "0";
  const tOld =
    Blockly.JavaScript.valueToCode(
      block,
      "OLD",
      Blockly.JavaScript.ORDER_NONE,
    ) || "0";
  return [
    "(" + tNew + " - " + tOld + ")",
    Blockly.JavaScript.ORDER_SUBTRACTION,
  ];
};
Blockly.JavaScript["time_every"] = function (block) {
  /* En la animación simulamos time_every como un while-true con sleep */
  const id = block.id;
  const interval =
    Blockly.JavaScript.valueToCode(
      block,
      "INTERVAL",
      Blockly.JavaScript.ORDER_NONE,
    ) || "1000";
  const stmts = Blockly.JavaScript.statementToCode(block, "DO") || "";
  return (
    "highlightBlock('" +
    id +
    "');\nwhile(true){\n" +
    stmts +
    "sleep(" +
    interval +
    ");\n}\n"
  );
};

/* ── Excepciones ── */
Blockly.JavaScript["controls_try_except_var"] = function (block) {
  const id = block.id;
  const varName = block.getFieldValue("VAR") || "e";
  const tryCode = Blockly.JavaScript.statementToCode(block, "TRY");
  const exceptCode = Blockly.JavaScript.statementToCode(block, "EXCEPT");
  return (
    "highlightBlock('" +
    id +
    "');\ntry {\n" +
    tryCode +
    "} catch (" +
    varName +
    ") {\n" +
    exceptCode +
    "}\n"
  );
};
Blockly.JavaScript["controls_try_except_finally"] = function (block) {
  const id = block.id;
  const tryCode = Blockly.JavaScript.statementToCode(block, "TRY");
  const exceptCode = Blockly.JavaScript.statementToCode(block, "EXCEPT");
  const finallyCode = Blockly.JavaScript.statementToCode(block, "FINALLY");
  return (
    "highlightBlock('" +
    id +
    "');\ntry {\n" +
    tryCode +
    "} catch (e) {\n" +
    exceptCode +
    "} finally {\n" +
    finallyCode +
    "}\n"
  );
};
Blockly.JavaScript["exceptions_raise"] = function (block) {
  const id = block.id;
  const err =
    Blockly.JavaScript.valueToCode(
      block,
      "ERROR",
      Blockly.JavaScript.ORDER_NONE,
    ) || "new Error()";
  return "highlightBlock('" + id + "');\nthrow " + err + ";\n";
};

/* ── Python util (stub JS — no tienen equivalente real en simulación) ── */
Blockly.JavaScript["objecto"] = function (block) {
  const name = block.getFieldValue("NAME") || "undefined";
  return [name, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["from"] = function () {
  return "";
};
Blockly.JavaScript["import"] = function () {
  return "";
};
Blockly.JavaScript["none"] = function () {
  return ["null", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["add"] = function (block) {
  /* Bloque de código raw — se emite tal cual como expresión */
  const raw = block.getFieldValue("ADD") || "";
  return raw ? raw + "\n" : "";
};
Blockly.JavaScript["gc_collect"] = function () {
  return ""; /* no-op en browser */
};
Blockly.JavaScript["in"] = function (block) {
  const a =
    Blockly.JavaScript.valueToCode(block, "A", Blockly.JavaScript.ORDER_NONE) ||
    "0";
  const b =
    Blockly.JavaScript.valueToCode(block, "B", Blockly.JavaScript.ORDER_NONE) ||
    "[]";
  /* JS: usa .includes() para arrays/strings */
  return [
    "(" + b + ").includes(" + a + ")",
    Blockly.JavaScript.ORDER_FUNCTION_CALL,
  ];
};
Blockly.JavaScript["is"] = function (block) {
  const a =
    Blockly.JavaScript.valueToCode(block, "A", Blockly.JavaScript.ORDER_NONE) ||
    "null";
  const b =
    Blockly.JavaScript.valueToCode(block, "B", Blockly.JavaScript.ORDER_NONE) ||
    "null";
  return [a + " === " + b, Blockly.JavaScript.ORDER_EQUALITY];
};
Blockly.JavaScript["del"] = function (block) {
  const id = block.id;
  const v =
    Blockly.JavaScript.valueToCode(
      block,
      "VAR",
      Blockly.JavaScript.ORDER_NONE,
    ) || "";
  return "highlightBlock('" + id + "');\n" + (v ? "delete " + v + ";\n" : "");
};
Blockly.JavaScript["lambda"] = function (block) {
  const args = block.getFieldValue("ARGS") || "x";
  const body =
    Blockly.JavaScript.valueToCode(
      block,
      "BODY",
      Blockly.JavaScript.ORDER_NONE,
    ) || "null";
  return [
    "function(" + args + ") { return " + body + "; }",
    Blockly.JavaScript.ORDER_ATOMIC,
  ];
};
Blockly.JavaScript["raise"] = function (block) {
  const id = block.id;
  const err =
    Blockly.JavaScript.valueToCode(
      block,
      "ERR",
      Blockly.JavaScript.ORDER_NONE,
    ) || "new Error()";
  return (
    "highlightBlock('" + id + "');\nthrow new Error(String(" + err + "));\n"
  );
};
Blockly.JavaScript["with"] = function (block) {
  const id = block.id;
  const stm = Blockly.JavaScript.statementToCode(block, "DO") || "";
  return "highlightBlock('" + id + "');\n" + stm;
};
Blockly.JavaScript["yield"] = function (block) {
  const val =
    Blockly.JavaScript.valueToCode(
      block,
      "VAL",
      Blockly.JavaScript.ORDER_NONE,
    ) || "null";
  return [
    val,
    Blockly.JavaScript.ORDER_ATOMIC,
  ]; /* en simulación simplemente devuelve el valor */
};

/* ── Clases (stub — en simulación se mapean a objetos JS) ── */
Blockly.JavaScript["class_create"] = function () {
  return "";
};
Blockly.JavaScript["class_init"] = function () {
  return "";
};
Blockly.JavaScript["class_method"] = function () {
  return "";
};
Blockly.JavaScript["class_instance"] = function (block) {
  const cls = block.getFieldValue("CLASS") || "Object";
  return ["new " + cls + "()", Blockly.JavaScript.ORDER_NEW];
};
Blockly.JavaScript["class_call"] = function (block) {
  const id = block.id;
  const obj =
    Blockly.JavaScript.valueToCode(
      block,
      "OBJ",
      Blockly.JavaScript.ORDER_MEMBER,
    ) || "{}";
  const meth = block.getFieldValue("METHOD") || "";
  const args =
    Blockly.JavaScript.valueToCode(
      block,
      "ARGS",
      Blockly.JavaScript.ORDER_NONE,
    ) || "";
  return (
    "highlightBlock('" + id + "');\n" + obj + "." + meth + "(" + args + ");\n"
  );
};

/* ── Sensor analógico (simulado) ── */
/* analog_sensor_init y analog_sensor_read ya están en animation.js original */

/* ── LED simple (simulado — solo consola) ── */
Blockly.JavaScript["led_init"] = function (block) {
  const id = block.id;
  const pin = block.getFieldValue("PIN") || "2";
  return "highlightBlock('" + id + "');\n/* LED pin " + pin + " simulado */\n";
};
Blockly.JavaScript["set_led"] = function (block) {
  const id = block.id;
  const name = block.getFieldValue("NAME") || "led";
  const state = block.getFieldValue("STATE") || "1";
  const on = state === "1" || state === "TRUE" ? "true" : "false";
  return (
    "highlightBlock('" +
    id +
    "');\nGameEngine.setLed('" +
    name +
    "', " +
    on +
    ");\n"
  );
};

Blockly.JavaScript["color_picker"] = function (block) {
  const hex = block.getFieldValue("COLOR") || "#000000";
  /* Devuelve hex string '#rrggbb' — primitivo JS, funciona en Acorn sin problemas */
  return ["'" + hex + "'", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["color_rgb"] = function (block) {
  const r =
    Blockly.JavaScript.valueToCode(
      block,
      "R",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";
  const g =
    Blockly.JavaScript.valueToCode(
      block,
      "G",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";
  const b =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";
  /* Construye hex string en runtime */
  return [
    "(function(r,g,b){return'#'+[r,g,b].map(function(v){return('0'+Math.max(0,Math.min(255,v|0)).toString(16)).slice(-2);}).join('');}(" +
      r +
      "," +
      g +
      "," +
      b +
      "))",
    Blockly.JavaScript.ORDER_FUNCTION_CALL,
  ];
};

Blockly.JavaScript["color_split"] = function (block) {
  const color =
    Blockly.JavaScript.valueToCode(
      block,
      "COLOR",
      Blockly.JavaScript.ORDER_MEMBER,
    ) || "'#000000'";
  const ch = block.getFieldValue("CHANNEL");
  const idx = ch === "R" ? "0" : ch === "G" ? "1" : "2";
  /* color es hex string '#rrggbb' — usa hexChannel para extraer el canal */
  return [
    "GameEngine.hexChannel(" + color + ", " + idx + ")",
    Blockly.JavaScript.ORDER_FUNCTION_CALL,
  ];
};

/* ══════════════════════════════════════════════════
   GENERADORES JS — BLOQUES DE JUEGO 🎮
   Usan GameEngine (definido en index.html)
══════════════════════════════════════════════════ */

/* ── game_frame: marca el fin de un frame y espera el siguiente rAF ── */
Blockly.JavaScript["game_frame"] = function (block) {
  return "gameFrameEnd();\n";
};

/* ── Pantalla ── */
Blockly.JavaScript["game_start"] = function (block) {
  const w =
    Blockly.JavaScript.valueToCode(
      block,
      "WIDTH",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "480";
  const h =
    Blockly.JavaScript.valueToCode(
      block,
      "HEIGHT",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "360";
  return "GameEngine.start(" + w + ", " + h + ");\n";
};

Blockly.JavaScript["select_imgs"] = function(block) {
  const img = block.getFieldValue("IMG") || "laberinto.png";

  return [
    "'" + img + "'",
    Blockly.JavaScript.ORDER_ATOMIC
  ];
};

Blockly.JavaScript["game_set_bg"] = function (block) {
  const id = block.id;
  const color =
    Blockly.JavaScript.valueToCode(
      block,
      "COLOR",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "'#1a1a2e'";
  return "GameEngine.setBg(" + color + ");\n";
};

Blockly.JavaScript["game_set_bg_image"] = function (block) {
  const file =
    Blockly.JavaScript.valueToCode(
      block,
      "FILE",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "'road.png'";
  return "GameEngine.setBgImage(" + file + ");\n";
};

Blockly.JavaScript["game_clear"] = function (block) {
  return "GameEngine.clear();\n";
};

/* ── Sprite ── */
Blockly.JavaScript["sprite_create"] = function (block) {
  const x =
    Blockly.JavaScript.valueToCode(
      block,
      "X",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "240";
  const y =
    Blockly.JavaScript.valueToCode(
      block,
      "Y",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "180";
  const w =
    Blockly.JavaScript.valueToCode(
      block,
      "W",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "48";
  const h =
    Blockly.JavaScript.valueToCode(
      block,
      "H",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "48";
  const img =
    Blockly.JavaScript.valueToCode(
      block,
      "IMG",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "'#00ff88'";
  return (
    "GameEngine.createSprite(" +
    x +
    ", " +
    y +
    ", " +
    w +
    ", " +
    h +
    ", " +
    img +
    ");\n"
  );
};

Blockly.JavaScript["sprite_load_image"] = function (block) {
  const file =
    Blockly.JavaScript.valueToCode(
      block,
      "FILE",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "'sprite.png'";
  return "GameEngine.loadImage(" + file + ");\n";
};

Blockly.JavaScript["sprite_set_flip"] = function (block) {
  const flip = block.getFieldValue("FLIP") === "TRUE" ? "true" : "false";
  return "GameEngine.setFlip(" + flip + ");\n";
};

Blockly.JavaScript["sprite_move"] = function (block) {
  const dx =
    Blockly.JavaScript.valueToCode(
      block,
      "DX",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";
  const dy =
    Blockly.JavaScript.valueToCode(
      block,
      "DY",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";
  return "GameEngine.moveSprite(" + dx + ", " + dy + ");\n";
};

Blockly.JavaScript["sprite_set_pos"] = function (block) {
  const x =
    Blockly.JavaScript.valueToCode(
      block,
      "X",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "216";
  const y =
    Blockly.JavaScript.valueToCode(
      block,
      "Y",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "156";
  return "GameEngine.setPos(" + x + ", " + y + ");\n";
};

Blockly.JavaScript["sprite_get_x"] = function (block) {
  return ["GameEngine.getX()", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["sprite_get_y"] = function (block) {
  return ["GameEngine.getY()", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["sprite_draw"] = function (block) {
  return "GameEngine.drawSprite();\n";
};

/* ── Teclado ── */
Blockly.JavaScript["key_is_pressed"] = function (block) {
  const key = block.getFieldValue("KEY");
  return [
    "GameEngine.keyPressed('" + key + "')",
    Blockly.JavaScript.ORDER_ATOMIC,
  ];
};

/* ── Ratón ── */
Blockly.JavaScript["mouse_clicked"] = function (block) {
  return ["GameEngine.mouseClicked()", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["mouse_down"] = function (block) {
  return ["GameEngine.mouseDown()", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["mouse_x"] = function (block) {
  return ["GameEngine.mouseX()", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["mouse_y"] = function (block) {
  return ["GameEngine.mouseY()", Blockly.JavaScript.ORDER_ATOMIC];
};

/* ── Movimiento por pasos / giro ── */
Blockly.JavaScript["sprite_move_steps"] = function (block) {
  const steps =
    Blockly.JavaScript.valueToCode(
      block,
      "STEPS",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "10";
  console.log("sprite_move_steps: steps = " + steps);
  return "GameEngine.moveSteps(" + steps + ");\n";
};
Blockly.JavaScript["sprite_turn_left"] = function (block) {
  const deg =
    Blockly.JavaScript.valueToCode(
      block,
      "DEG",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "15";
  console.log("sprite_turn_left: deg = " + deg);
  return "GameEngine.turnAngle(" + deg + ");\n";
};
Blockly.JavaScript["sprite_turn_right"] = function (block) {
  const deg =
    Blockly.JavaScript.valueToCode(
      block,
      "DEG",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "15";
  return "GameEngine.turnAngle(-(" + deg + "));\n";
};
Blockly.JavaScript["sprite_get_angle"] = function (block) {
  return ["GameEngine.getAngle()", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["sprite_set_angle"] = function (block) {
  const deg = Blockly.JavaScript.valueToCode(block, "DEG", Blockly.JavaScript.ORDER_ATOMIC) || "0";
  return "GameEngine.setAngle(" + deg + ");\n";
};
Blockly.JavaScript["pen_move_to"] = function (block) {
  const x = Blockly.JavaScript.valueToCode(block, "X", Blockly.JavaScript.ORDER_ATOMIC) || "0";
  const y = Blockly.JavaScript.valueToCode(block, "Y", Blockly.JavaScript.ORDER_ATOMIC) || "0";
  return "GameEngine.penMoveTo(" + x + ", " + y + ");\n";
};

/* ── Colisiones ── */
Blockly.JavaScript["touching_color"] = function (block) {
  const color =
    Blockly.JavaScript.valueToCode(
      block,
      "COLOR",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "'#ff0000'";
  return [
    "GameEngine.touchingColor(" + color + ")",
    Blockly.JavaScript.ORDER_ATOMIC,
  ];
};

Blockly.JavaScript["touching_edge"] = function (block) {
  return ["GameEngine.touchingEdge()", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["color_at_pos"] = function (block) {
  const x =
    Blockly.JavaScript.valueToCode(
      block,
      "X",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";
  const y =
    Blockly.JavaScript.valueToCode(
      block,
      "Y",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";
  /* Devuelve hex string '#rrggbb' — primitivo Acorn, conectable con color_split */
  return [
    "GameEngine.colorAtPosHex(" + x + ", " + y + ")",
    Blockly.JavaScript.ORDER_ATOMIC,
  ];
};

Blockly.JavaScript["pixel_channel"] = function (block) {
  const ch = block.getFieldValue("CH");
  const x =
    Blockly.JavaScript.valueToCode(
      block,
      "X",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";
  const y =
    Blockly.JavaScript.valueToCode(
      block,
      "Y",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";
  const idx = ch === "R" ? "0" : ch === "G" ? "1" : "2";
  return [
    "GameEngine.colorAtPosChannel(" + x + ", " + y + ", " + idx + ")",
    Blockly.JavaScript.ORDER_ATOMIC,
  ];
};

/* ── Puntaje ── */
Blockly.JavaScript["game_add_score"] = function (block) {
  const id = block.id;
  const pts =
    Blockly.JavaScript.valueToCode(
      block,
      "POINTS",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "1";
  return "GameEngine.addScore(" + pts + ");\n";
};

Blockly.JavaScript["game_get_score"] = function (block) {
  return ["GameEngine.getScore()", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript["game_reset_score"] = function (block) {
  return "GameEngine.resetScore();\n";
};

Blockly.JavaScript["game_show_text"] = function (block) {
  const id = block.id;
  const text =
    Blockly.JavaScript.valueToCode(
      block,
      "TEXT",
      Blockly.JavaScript.ORDER_NONE,
    ) || "''";
  const x =
    Blockly.JavaScript.valueToCode(
      block,
      "X",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "10";
  const y =
    Blockly.JavaScript.valueToCode(
      block,
      "Y",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "20";
  const color =
    Blockly.JavaScript.valueToCode(
      block,
      "COLOR",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "'#ffffff'";
  /* String() explícito garantiza conversión correcta aunque sea número */
  console.log("game_show_text: text = " + text);
  console.log("game_show_text: x = " + x);
  console.log("game_show_text: y = " + y);
  console.log("game_show_text: color = " + color);
  return (
    "GameEngine.showText(String(" + text + "), " + x + ", " + y + ", " + color + ");\n"
  );
};

/* ── Formas / Obstáculos ── */
Blockly.JavaScript["game_draw_rect"] = function (block) {
  const id = block.id;
  const x =
    Blockly.JavaScript.valueToCode(
      block,
      "X",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";
  const y =
    Blockly.JavaScript.valueToCode(
      block,
      "Y",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";
  const w =
    Blockly.JavaScript.valueToCode(
      block,
      "W",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "40";
  const h =
    Blockly.JavaScript.valueToCode(
      block,
      "H",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "40";
  const color =
    Blockly.JavaScript.valueToCode(
      block,
      "COLOR",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "'#ff0000'";
  return (
    "GameEngine.drawRect(" +
    x +
    ", " +
    y +
    ", " +
    w +
    ", " +
    h +
    ", " +
    color +
    ");\n"
  );
};

Blockly.JavaScript["game_draw_circle"] = function (block) {
  const id = block.id;
  const x =
    Blockly.JavaScript.valueToCode(
      block,
      "X",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";
  const y =
    Blockly.JavaScript.valueToCode(
      block,
      "Y",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "0";
  const r =
    Blockly.JavaScript.valueToCode(
      block,
      "R",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "20";
  const color =
    Blockly.JavaScript.valueToCode(
      block,
      "COLOR",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "'#ffff00'";
  return (
    "GameEngine.drawCircle(" + x + ", " + y + ", " + r + ", " + color + ");\n"
  );
};

/* ── Lápiz ── */
Blockly.JavaScript["pen_down"] = function (block) {
  /* Usar getInputTargetBlock para detectar si hay un bloque conectado.
     valueToCode devuelve el string "0" que es truthy aunque el valor sea cero. */
  var hasX = block.getInputTargetBlock("X") !== null;
  var hasY = block.getInputTargetBlock("Y") !== null;
  if (hasX && hasY) {
    const x = Blockly.JavaScript.valueToCode(block, "X", Blockly.JavaScript.ORDER_ATOMIC) || "0";
    const y = Blockly.JavaScript.valueToCode(block, "Y", Blockly.JavaScript.ORDER_ATOMIC) || "0";
    return "GameEngine.penDown(" + x + ", " + y + ");\n";
  }
  return "GameEngine.penDown();\n";
};
Blockly.JavaScript["pen_up"] = function () {
  return "GameEngine.penUp();\n";
};
Blockly.JavaScript["pen_clear"] = function () {
  return "GameEngine.penClear();\n";
};
Blockly.JavaScript["pen_stamp"] = function () {
  return "GameEngine.penStamp();\n";
};
Blockly.JavaScript["pen_set_color"] = function (block) {
  const color =
    Blockly.JavaScript.valueToCode(
      block,
      "COLOR",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "[255,0,0]";
  return "GameEngine.penSetColor(" + color + ");\n";
};
Blockly.JavaScript["pen_set_size"] = function (block) {
  const size =
    Blockly.JavaScript.valueToCode(
      block,
      "SIZE",
      Blockly.JavaScript.ORDER_ATOMIC,
    ) || "3";
  return "GameEngine.penSetSize(" + size + ");\n";
};

/* ===== CONFIGURACIÓN HIGHLIGHT ===== */

Blockly.JavaScript.STATEMENT_PREFIX = "highlightBlock(%1);\n";
Blockly.JavaScript.addReservedWords("highlightBlock");

/* ===== VARIABLES ===== */

let interpreter = null;
let runner = null;

/* ===== RESALTAR BLOQUE ===== */

function highlightBlock(id) {
  id = String(id).replace(/'/g, "");
  Code.workspace.highlightBlock(id);
  const block = Code.workspace.getBlockById(id);
  if (!block) return;
  block.select(); // ← selecciona el bloque visualmente
}

/* ===== INICIALIZAR INTERPRETER ===== */


/* ═══════════════════════════════════════════════════════════════
   BRIDGES JS PARA HARDWARE — Fase 1-4
   Todos los bloques que tienen generador Python pero no JS.

   Patrón READ  → llama native fn que lee window._serialSensors
   Patrón WRITE → stub vacío (el ESP32 lo ejecuta en MicroPython)
═══════════════════════════════════════════════════════════════ */

/* ── GPIO ── */
Blockly.JavaScript["pin_init"] = function (b) {
  return "";   /* setup — no-op en simulador */
};
Blockly.JavaScript["pin_init_pull"] = Blockly.JavaScript["pin_init"];
Blockly.JavaScript["pin_init_value"] = Blockly.JavaScript["pin_init"];
Blockly.JavaScript["pin_on"] = function (b) {
  const pin = b.getFieldValue("PIN");
  return `simPin(${pin}, 1);\n`;
};
Blockly.JavaScript["pin_off"] = function (b) {
  const pin = b.getFieldValue("PIN");
  return `simPin(${pin}, 0);\n`;
};
Blockly.JavaScript["pin_set_value"] = function (b) {
  const pin = b.getFieldValue("PIN");
  const val = b.getFieldValue("VALUE");
  return `simPin(${pin}, ${val});\n`;
};
Blockly.JavaScript["set_value_pin"] = Blockly.JavaScript["pin_set_value"];
Blockly.JavaScript["pin_value"] = function (b) {
  const pin = b.getFieldValue("PIN");
  return [`getSensorValue("pins", ${pin})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["interruptor_init"] = function (b) { return ""; };
Blockly.JavaScript["interruptor_irq"]  = function (b) { return ""; };
Blockly.JavaScript["interruptor_read"] = function (b) {
  const pin = b.getFieldValue("PIN");
  return [`getSensorValue("pins", ${pin})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/* ── ADC (además de analog_sensor_read ya existente) ── */
Blockly.JavaScript["adc_pin"]   = function (b) { return ""; };
Blockly.JavaScript["adc_width"] = function (b) { return ""; };
Blockly.JavaScript["adc_atten"] = function (b) { return ""; };
Blockly.JavaScript["adc_read"] = function (b) {
  const pin = b.getFieldValue("PIN");
  return [`getSensorValue("adc", ${pin})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["adc_read_u16"] = Blockly.JavaScript["adc_read"];
Blockly.JavaScript["adc_read_uv"]  = Blockly.JavaScript["adc_read"];

/* ── DHT ── */
Blockly.JavaScript["dht_init"]    = function (b) { return ""; };
Blockly.JavaScript["dht_measure"] = function (b) { return ""; };
Blockly.JavaScript["dht_temperature"] = function (b) {
  const pin = b.getFieldValue("PIN");
  return [`getSensorValue("dhtTemp", ${pin})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["dht_humidity"] = function (b) {
  const pin = b.getFieldValue("PIN");
  return [`getSensorValue("dhtHum", ${pin})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/* ── Touch ── */
Blockly.JavaScript["touch_init"]   = function (b) { return ""; };
Blockly.JavaScript["touch_config"] = function (b) { return ""; };
Blockly.JavaScript["touch_read"] = function (b) {
  const pin = b.getFieldValue("PIN");
  return [`getSensorValue("touch", ${pin})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/* ── Ultrasonico ── */
Blockly.JavaScript["init_ultrasonic_hcsr04"] = function (b) { return ""; };
Blockly.JavaScript["read_ultrasonic_hcsr04"] = function (b) {
  const name = b.getFieldValue("NAME");
  return [`getSensorValue("ultrasonic", "${name}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/* ── Encoder rotario ── */
Blockly.JavaScript["encoder_rotary_init"]  = function (b) { return ""; };
Blockly.JavaScript["encoder_rotary_reset"] = function (b) { return ""; };
Blockly.JavaScript["encoder_rotary_value"] = function (b) {
  const name = b.getFieldValue("NAME");
  return [`getSensorValue("encoder", "${name}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/* ── MPU6050 ── */
Blockly.JavaScript["mpu6050_init"]            = function (b) { return ""; };
Blockly.JavaScript["mpu6050_set_accel_range"] = function (b) { return ""; };
Blockly.JavaScript["mpu6050_set_gyro_range"]  = function (b) { return ""; };
Blockly.JavaScript["mpu6050_accel_x"] = function (b) {
  return [`getSensorValue("mpu", "AX")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["mpu6050_accel_y"] = function (b) {
  return [`getSensorValue("mpu", "AY")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["mpu6050_accel_z"] = function (b) {
  return [`getSensorValue("mpu", "AZ")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["mpu6050_gyro_x"] = function (b) {
  return [`getSensorValue("mpu", "GX")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["mpu6050_gyro_y"] = function (b) {
  return [`getSensorValue("mpu", "GY")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["mpu6050_gyro_z"] = function (b) {
  return [`getSensorValue("mpu", "GZ")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["mpu6050_temperature"] = function (b) {
  return [`getSensorValue("mpu", "T")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/* ── KY-023 Joystick ── */
Blockly.JavaScript["ky023_analog"]   = function (b) { return ""; };
Blockly.JavaScript["ky023_read_x"] = function (b) {
  const name = b.getFieldValue("NAME");
  return [`getSensorValue("ky023", "${name}_X")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["ky023_read_y"] = function (b) {
  const name = b.getFieldValue("NAME");
  return [`getSensorValue("ky023", "${name}_Y")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["ky023_read_sw"] = function (b) {
  const name = b.getFieldValue("NAME");
  return [`getSensorValue("ky023", "${name}_S")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/* ── Pot / Slider ── */
Blockly.JavaScript["pot_slider_init"]   = function (b) { return ""; };
Blockly.JavaScript["pot_slider_read_x"] = function (b) {
  const name = b.getFieldValue("NAME");
  return [`getSensorValue("ky023", "${name}_X")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["pot_slider_read_y"] = function (b) {
  const name = b.getFieldValue("NAME");
  return [`getSensorValue("ky023", "${name}_Y")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/* ── Sensor híbrido ── */
Blockly.JavaScript["hybrid_sensor_init"]         = function (b) { return ""; };
Blockly.JavaScript["hybrid_sensor_read_analog"]  = function (b) {
  const name = b.getFieldValue("NAME");
  return [`getSensorValue("adc", "${name}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["hybrid_sensor_read_digital"] = function (b) {
  const name = b.getFieldValue("NAME");
  return [`getSensorValue("pins", "${name}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/* ── I2C / SPI ── */
Blockly.JavaScript["i2c_init"]  = function (b) { return ""; };
Blockly.JavaScript["i2c_write"] = function (b) { return ""; };
Blockly.JavaScript["i2c_scan"]  = function (b) { return [`getSensorValue("i2c","scan")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["i2c_read"]  = function (b) { return [`getSensorValue("i2c","read")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["spi_init"]  = function (b) { return ""; };
Blockly.JavaScript["spi_write"] = function (b) { return ""; };
Blockly.JavaScript["spi_read"]  = function (b) { return [`getSensorValue("spi","read")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };

/* ── UART / HC-06 ── */
Blockly.JavaScript["uart_init"]    = function (b) { return ""; };
Blockly.JavaScript["uart_write"]   = function (b) { return ""; };
Blockly.JavaScript["uart_read"]    = function (b) { return [`getSensorValue("uart","read")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["init_hc06"]    = function (b) { return ""; };
Blockly.JavaScript["hc06_send"]    = function (b) { return ""; };
Blockly.JavaScript["hc06_read"]    = function (b) { return [`getSensorValue("uart","read")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["hc06_any"]     = function (b) { return [`getSensorValue("uart","any")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["cp2102_init"]  = function (b) { return ""; };
Blockly.JavaScript["cp2102_write"] = function (b) { return ""; };
Blockly.JavaScript["cp2102_read"]  = function (b) { return [`getSensorValue("uart","read")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["cp2102_available"] = function (b) { return [`getSensorValue("uart","any")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };

/* ── DHT/BMP/BH1750/TCS/QMC/RTC (I2C sensors) ── */
Blockly.JavaScript["bmp_sensor_init"]   = function (b) { return ""; };
Blockly.JavaScript["bmp_read_temp"]     = function (b) { return [`getSensorValue("bmp","temp")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["bmp_read_pressure"] = function (b) { return [`getSensorValue("bmp","pres")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["bmp_read_altitude"] = function (b) { return [`getSensorValue("bmp","alt")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["bh1750_init"]       = function (b) { return ""; };
Blockly.JavaScript["bh1750_power_on"]   = function (b) { return ""; };
Blockly.JavaScript["bh1750_power_off"]  = function (b) { return ""; };
Blockly.JavaScript["bh1750_read_lux"]   = function (b) { return [`getSensorValue("bh1750","lux")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["tcs34725_init"]        = function (b) { return ""; };
Blockly.JavaScript["tcs34725_integration"] = function (b) { return [`getSensorValue("tcs","int")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["tcs34725_gain"]        = function (b) { return [`getSensorValue("tcs","gain")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["tcs34725_red"]         = function (b) { return [`getSensorValue("tcs","r")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["tcs34725_green"]       = function (b) { return [`getSensorValue("tcs","g")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["tcs34725_blue"]        = function (b) { return [`getSensorValue("tcs","b")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["tcs34725_clear"]       = function (b) { return [`getSensorValue("tcs","c")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["tcs34725_rgb"]         = function (b) { return [`getSensorValue("tcs","rgb")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["qmc5883l_init"]  = function (b) { return ""; };
Blockly.JavaScript["qmc5883l_read_x"]   = function (b) { return [`getSensorValue("qmc","x")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["qmc5883l_read_y"]   = function (b) { return [`getSensorValue("qmc","y")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["qmc5883l_read_z"]   = function (b) { return [`getSensorValue("qmc","z")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["qmc5883l_read_xyz"] = function (b) { return [`getSensorValue("qmc","xyz")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["rtc_init"]          = function (b) { return ""; };
Blockly.JavaScript["rtc_set_datetime"]  = function (b) { return ""; };
Blockly.JavaScript["rtc_get_datetime"]  = function (b) { return [`getSensorValue("rtc","dt")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["rtc_ds3231_init"]     = function (b) { return ""; };
Blockly.JavaScript["rtc_ds3231_set_time"] = function (b) { return ""; };
Blockly.JavaScript["rtc_ds3231_get_time"] = function (b) { return [`getSensorValue("rtc","time")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["rtc_ds3231_get_hour"]   = function (b) { return [`getSensorValue("rtc","h")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["rtc_ds3231_get_minute"] = function (b) { return [`getSensorValue("rtc","m")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["rtc_ds3231_get_second"] = function (b) { return [`getSensorValue("rtc","s")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["onewire_init"]       = function (b) { return ""; };
Blockly.JavaScript["onewire_reset"]      = function (b) { return ""; };
Blockly.JavaScript["onewire_write"]      = function (b) { return ""; };
Blockly.JavaScript["onewire_writebyte"]  = function (b) { return ""; };
Blockly.JavaScript["onewire_readbyte"]   = function (b) { return [`getSensorValue("ow","byte")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["onewire_scan"]       = function (b) { return [`getSensorValue("ow","scan")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["onewire_select_rom"] = function (b) { return ""; };

/* ── Servo / Motores ── */
Blockly.JavaScript["init_servo"]          = function (b) { return ""; };
Blockly.JavaScript["move_servo"]          = function (b) { return ""; };
Blockly.JavaScript["init_dc_motor"]       = function (b) { return ""; };
Blockly.JavaScript["init2_dc_motor_pwm"]  = function (b) { return ""; };
Blockly.JavaScript["init3_dc_motor_pwm"]  = function (b) { return ""; };
Blockly.JavaScript["move_dc_motor1"]         = function (b) { return ""; };
Blockly.JavaScript["move_dc_motor2"]         = function (b) { return ""; };
Blockly.JavaScript["move_dc_motor1_on_off"]  = function (b) { return ""; };
Blockly.JavaScript["move_dc_motor2_on_off"]  = function (b) { return ""; };
Blockly.JavaScript["move_dc_motor1_pwm"]     = function (b) { return ""; };
Blockly.JavaScript["move_dc_motor2_pwm"]     = function (b) { return ""; };
Blockly.JavaScript["move_dc_motor_pwm1"]     = function (b) { return ""; };
Blockly.JavaScript["move_dc_motor_pwm2"]     = function (b) { return ""; };
Blockly.JavaScript["set_speed_motorA"]       = function (b) { return ""; };
Blockly.JavaScript["set_speed_motorB"]       = function (b) { return ""; };
Blockly.JavaScript["shield_set_motor"]       = function (b) { return ""; };
Blockly.JavaScript["stepper_init"]   = function (b) { return ""; };
Blockly.JavaScript["stepper_step"]   = function (b) { return ""; };
Blockly.JavaScript["stepper_angle"]  = function (b) { return ""; };
Blockly.JavaScript["stepper_degrees"]= function (b) { return ""; };
Blockly.JavaScript["pwm_init"]       = function (b) { return ""; };
Blockly.JavaScript["pwm_freq"]       = function (b) { return ""; };
Blockly.JavaScript["pwm_duty"]       = function (b) { return ""; };
Blockly.JavaScript["read_pwm_freq"]  = function (b) { return [`0`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["read_pwm_duty"]  = function (b) { return [`0`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["dac_init"]  = function (b) { return ""; };
Blockly.JavaScript["dac_write"] = function (b) { return ""; };
Blockly.JavaScript["init_semaforo"] = function (b) { return ""; };
Blockly.JavaScript["set_semaforo"]  = function (b) { return ""; };
Blockly.JavaScript["rg_init"]       = function (b) { return ""; };
Blockly.JavaScript["rgb_init"]      = function (b) { return ""; };
Blockly.JavaScript["set_led_rg"]    = function (b) { return ""; };
Blockly.JavaScript["set_led_rgb"]   = function (b) { return ""; };
Blockly.JavaScript["actuador_init"]   = function (b) { return ""; };
Blockly.JavaScript["actuador_on_off"] = function (b) { return ""; };

/* ── Buzzer / Audio ── */
Blockly.JavaScript["buzzer_tone"] = function (b) {
  const freq = Blockly.JavaScript.valueToCode(b, "FREQ", Blockly.JavaScript.ORDER_ATOMIC) || "440";
  const dur  = Blockly.JavaScript.valueToCode(b, "DURATION", Blockly.JavaScript.ORDER_ATOMIC) || "200";
  return `simBuzzer(${freq}, ${dur});\n`;
};
Blockly.JavaScript["buzzer_stop"] = function (b) { return `simBuzzer(0, 0);\n`; };
Blockly.JavaScript["buzzer_song"] = function (b) { return ""; };
Blockly.JavaScript["i2s_init"]   = function (b) { return ""; };
Blockly.JavaScript["i2s_write"]  = function (b) { return ""; };
Blockly.JavaScript["inmp441_init"]   = function (b) { return ""; };
Blockly.JavaScript["inmp441_read"]   = function (b) { return [`0`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["inmp441_volume"] = function (b) { return [`0`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["dfplayer_init"]     = function (b) { return ""; };
Blockly.JavaScript["dfplayer_play"]     = function (b) { return ""; };
Blockly.JavaScript["dfplayer_pause"]    = function (b) { return ""; };
Blockly.JavaScript["dfplayer_stop"]     = function (b) { return ""; };
Blockly.JavaScript["dfplayer_next"]     = function (b) { return ""; };
Blockly.JavaScript["dfplayer_previous"] = function (b) { return ""; };
Blockly.JavaScript["dfplayer_volume"]   = function (b) { return ""; };

/* ── NeoPixel — stub (sin simulación visual por ahora) ── */
["neopixel_init","neopixel_init_5x5","neopixel_init_8x8","neopixel_show",
 "neopixel_clear","neopixel_fill","neopixel_pixel","neopixel_pixel_x",
 "neopixel_write","neopixel_blit","neopixel_scroll",
 "neopixel_line","neopixel_rect","neopixel_fill_rect",
 "neopixel_ellipse","neopixel_poly","neopixel_text",
 "neopixel_8x8","neopixel_5x5"].forEach(function(n) {
  if (!Blockly.JavaScript[n]) Blockly.JavaScript[n] = function() { return ""; };
});

/* ── OLED — stub ── */
["oled_init","oled_clear","oled_text","oled_text20","oled_pixel","oled_line",
 "oled_rect","oled_fill_rect","oled_circle","oled_poly","oled_contrast",
 "oled_scroll","oled_icon"].forEach(function(n) {
  if (!Blockly.JavaScript[n]) Blockly.JavaScript[n] = function() { return ""; };
});
Blockly.JavaScript["oled_icon_value"] = function (b) { return [`0`, Blockly.JavaScript.ORDER_ATOMIC]; };

/* ── TFT — stub ── */
["tft_init","tft_fill","tft_pixel","tft_line","tft_hline","tft_vline",
 "tft_rect","tft_fill_rect","tft_circle","tft_fill_circle","tft_text",
 "tft_bitmap","tft_icon","tft_rotation","tft_polygon","tft_fill_polygon"].forEach(function(n) {
  if (!Blockly.JavaScript[n]) Blockly.JavaScript[n] = function() { return ""; };
});
Blockly.JavaScript["tft_polygon_center"] = function (b) { return [`0`, Blockly.JavaScript.ORDER_ATOMIC]; };

/* ── LCD — stub ── */
["lcd_init","lcd_i2c_init","lcd_clear","lcd_i2c_clear","lcd_home",
 "lcd_cursor","lcd_i2c_cursor","lcd_i2c_cursor_show","lcd_print",
 "lcd_i2c_print","lcd_print_align","lcd_enable","lcd_i2c_display",
 "lcd_blink","lcd_i2c_blink","lcd_underline","lcd_move_left","lcd_move_right"].forEach(function(n) {
  if (!Blockly.JavaScript[n]) Blockly.JavaScript[n] = function() { return ""; };
});

/* ── Keypad ── */
Blockly.JavaScript["init_keypad_3x4"]   = function (b) { return ""; };
Blockly.JavaScript["init_keypad_4x4"]   = function (b) { return ""; };
Blockly.JavaScript["init_keypad4x4_i2c"]= function (b) { return ""; };
Blockly.JavaScript["keypad_get_key"] = function (b) {
  return [`getSensorValue("keypad","key")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript["keypad_get_key_i2c"] = Blockly.JavaScript["keypad_get_key"];

/* ── Seg7 / Matrix / TM1637 — stub ── */
["seg7_init","seg7_clear","seg7_number",
 "matrix8_init","matrix8_clear","matrix8_pixel","matrix8_rect","matrix8_line",
 "matrix8_text","matrix8_scroll_text","matrix8_brightness",
 "tm1637_init","tm1637_clear","tm1637_show","tm1637_number","tm1637_numbers",
 "tm1637_scroll","tm1637_brightness","tm1637_temperature",
 "max_icon"].forEach(function(n) {
  if (!Blockly.JavaScript[n]) Blockly.JavaScript[n] = function() { return ""; };
});

/* ── Bluetooth / ESPNow ── */
["ble_init_uart","ble_set_name","ble_on_receive","ble_write",
 "init_espnow_simple","espnow_add_peer","espnow_send_peer"].forEach(function(n) {
  if (!Blockly.JavaScript[n]) Blockly.JavaScript[n] = function() { return ""; };
});
Blockly.JavaScript["ble_read"]    = function (b) { return [`getSensorValue("uart","read")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["espnow_recv"] = function (b) { return [`getSensorValue("uart","read")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["ky001_init"]      = function (b) { return ""; };
Blockly.JavaScript["ky001_convert"]   = function (b) { return ""; };
Blockly.JavaScript["ky001_scan"]      = function (b) { return [`getSensorValue("ble","scan")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["ky001_read_index"]= function (b) { return [`getSensorValue("ble","rssi")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };

/* ── WiFi / Sockets / Portal — stubs ── */
["wifi_init","wifi_connect","wifi_ap","wifi_ap_config","wifi_disconnect",
 "wifi_define_connect","wifi_call_connect","wifi_start_ap",
 "socket_create","socket_connect","socket_bind","socket_listen",
 "socket_accept","socket_send","socket_sendall","socket_close",
 "portal_init","portal_run","portal_main","portal_http_server",
 "portal_dns_server","portal_set_page","portal_comandos",
 "DNSQuery"].forEach(function(n) {
  if (!Blockly.JavaScript[n]) Blockly.JavaScript[n] = function() { return ""; };
});
Blockly.JavaScript["wifi_isconnected"] = function (b) { return [`false`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["wifi_current_ip"]  = function (b) { return [`"0.0.0.0"`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["wifi_scan"]        = function (b) { return [`[]`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["socket_receive"]   = function (b) { return [`""`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["portal_si_tipo"]   = function (b) { return [`false`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["portal_si_valor"]  = function (b) { return [`false`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["portal_get_tipo"]  = function (b) { return [`""`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["portal_get_valor"] = function (b) { return [`""`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["peer"]   = function (b) { return [`""`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["points"] = function (b) { return [`""`, Blockly.JavaScript.ORDER_ATOMIC]; };

/* ── Infrarrojo ── */
Blockly.JavaScript["init_infrarrojo"]  = function (b) { return ""; };
Blockly.JavaScript["init_ir_ky022"]    = function (b) { return ""; };
Blockly.JavaScript["ir_ky022_callback_code"] = function (b) { return ""; };
Blockly.JavaScript["ky005_init"]       = function (b) { return ""; };
Blockly.JavaScript["ky005_send_nec"]   = function (b) { return ""; };
Blockly.JavaScript["read_infrarrojo"]  = function (b) { return [`getSensorValue("ir","code")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };

/* ── Sensores de flujo (YF-201) ── */
Blockly.JavaScript["yf201_init"]         = function (b) { return ""; };
Blockly.JavaScript["yf201_reset"]        = function (b) { return ""; };
Blockly.JavaScript["yf201_flow_rate"]    = function (b) { return [`getSensorValue("flow","rate")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["yf201_total_liters"] = function (b) { return [`getSensorValue("flow","total")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };

/* ── CAN Bus ── */
Blockly.JavaScript["can_init"] = function (b) { return ""; };
Blockly.JavaScript["can_send"] = function (b) { return ""; };

/* ── GPS ── */
Blockly.JavaScript["gps_init"]      = function (b) { return ""; };
Blockly.JavaScript["gps_read"]      = function (b) { return ""; };
Blockly.JavaScript["gps_update"]    = function (b) { return ""; };
Blockly.JavaScript["gps_any"]       = function (b) { return [`false`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["gps_latitude"]  = function (b) { return [`getSensorValue("gps","lat")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["gps_longitude"] = function (b) { return [`getSensorValue("gps","lng")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };
Blockly.JavaScript["gps_time"]      = function (b) { return [`getSensorValue("gps","time")`, Blockly.JavaScript.ORDER_FUNCTION_CALL]; };

/* ── RFID / FPM (fingerprint) ── */
["rfid_mfrc522_init","rfid_mfrc522_stop_crypto","rfid_mfrc522_auth",
 "rfid_mfrc522_write_block","rfid_mfrc522_read_block_vars",
 "fpm_init","fpm_enroll","fpm_delete","fpm_clear","fpm_led",
 "fpm_verify","fpm_search"].forEach(function(n) {
  if (!Blockly.JavaScript[n]) Blockly.JavaScript[n] = function() { return ""; };
});
Blockly.JavaScript["rfid_mfrc522_detect"] = function (b) { return [`false`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["rfid_mfrc522_ok"]     = function (b) { return [`false`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["rfid_mfrc522_uid"]    = function (b) { return [`""`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["rfid_data_to_text"]   = function (b) { return [`""`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["rfid_key"]            = function (b) { return [`""`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["fpm_count"]           = function (b) { return [`0`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["fpm_wait_finger"]     = function (b) { return [`false`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["fpm_status"]          = function (b) { return [`0`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["fpm_img2tz"]          = function (b) { return [`0`, Blockly.JavaScript.ORDER_ATOMIC]; };

/* ── SD Card / Archivos ── */
["sdcard_init","sdcard_write","create_folder","delete_file",
 "file_write","file_close"].forEach(function(n) {
  if (!Blockly.JavaScript[n]) Blockly.JavaScript[n] = function() { return ""; };
});
Blockly.JavaScript["file_open"]   = function (b) { return [`null`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["file_read"]   = function (b) { return [`""`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["sdcard_read"] = function (b) { return [`""`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["sdcard_list"] = function (b) { return [`[]`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["listdir"]     = function (b) { return ""; };

/* ── Machine / Sistema ── */
Blockly.JavaScript["machine_reset"]       = function (b) { return ""; };
Blockly.JavaScript["machine_freq"]        = function (b) { return ""; };
Blockly.JavaScript["machine_deepsleep"]   = function (b) { return `sleep(999999999);\n`; };
Blockly.JavaScript["machine_reset_cause"] = function (b) { return [`0`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["machine_unique_id"]   = function (b) { return [`"SIM-0000"`, Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript["async_sleep_ms"]      = function (b) {
  const t = Blockly.JavaScript.valueToCode(b, "TIME", Blockly.JavaScript.ORDER_ATOMIC) || "0";
  return `sleep(${t});\n`;
};
Blockly.JavaScript["async_sleep_s"]       = function (b) {
  const t = Blockly.JavaScript.valueToCode(b, "TIME", Blockly.JavaScript.ORDER_ATOMIC) || "0";
  return `sleep((${t})*1000);\n`;
};
Blockly.JavaScript["gc_collect"] = function (b) { return ""; };
Blockly.JavaScript["wdt_init"]   = function (b) { return ""; };
Blockly.JavaScript["wdt_feed"]   = function (b) { return ""; };

/* ── import / from / pass (ya existían, por si acaso) ── */
if (!Blockly.JavaScript["from"])   Blockly.JavaScript["from"]   = function() { return ""; };
if (!Blockly.JavaScript["import"]) Blockly.JavaScript["import"] = function() { return ""; };
if (!Blockly.JavaScript["pass"])   Blockly.JavaScript["pass"]   = function() { return ""; };

function initInterpreter(code) {
  interpreter = new Interpreter(code, function (interpreter, globalObject) {
    /* ── highlightBlock ── */
    interpreter.setProperty(
      globalObject,
      "highlightBlock",
      interpreter.createNativeFunction(function (id) {
        highlightBlock(id);
      }),
    );

    /* ── alert / console ── */
    interpreter.setProperty(
      globalObject,
      "alert",
      interpreter.createNativeFunction(function (text) {
        //console.log(text);
      }),
    );

    /* ── getAdcValue: leer último valor ADC recibido por serial ── */
    interpreter.setProperty(
      globalObject,
      "getAdcValue",
      interpreter.createNativeFunction(function () {
        var v = window._serialAdcValue;
        return (typeof v === 'number') ? v : -1;
      }),
    );


    /* ── getSensorValue(category, key): acceso genérico a sensores seriales ── */
    interpreter.setProperty(
      globalObject,
      "getSensorValue",
      interpreter.createNativeFunction(function (cat, key) {
        var s = window._serialSensors;
        if (!s) return -1;
        var c = s[String(cat)];
        if (!c) return -1;
        var v = c[String(key)];
        return (v !== undefined) ? v : -1;
      }),
    );

    /* ── simPin(pin, value): LED / pin digital simulado ── */
    interpreter.setProperty(
      globalObject,
      "simPin",
      interpreter.createNativeFunction(function (pin, val) {
        if (!window._simPins) window._simPins = {};
        window._simPins[String(pin)] = val ? 1 : 0;
        document.dispatchEvent(new CustomEvent('sim:pin', {
          detail: { pin: pin, value: val ? 1 : 0 }
        }));
      }),
    );

    /* ── simBuzzer(freq, duration): tono por Web Audio API ── */
    interpreter.setProperty(
      globalObject,
      "simBuzzer",
      interpreter.createNativeFunction(function (freq, dur) {
        try {
          var ctx = window._simAudioCtx;
          if (!ctx) ctx = window._simAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
          if (window._simOsc) { try { window._simOsc.stop(); } catch(e) {} }
          if (!freq || freq <= 0) return;
          var osc = ctx.createOscillator();
          osc.frequency.value = Number(freq) || 440;
          osc.connect(ctx.destination);
          osc.start();
          window._simOsc = osc;
          if (dur > 0) setTimeout(function() { try { osc.stop(); } catch(e) {} }, Number(dur));
        } catch(e) {}
      }),
    );

    /* ── sleep (async) ── */
    interpreter.setProperty(
      globalObject,
      "sleep",
      interpreter.createAsyncFunction(function (time, callback) {
        setTimeout(callback, time);
      }),
    );

    /* ── gameFrameEnd (async): pausa hasta el próximo rAF ── */
    interpreter.setProperty(
      globalObject,
      "gameFrameEnd",
      interpreter.createAsyncFunction(function (callback) {
        /* señalamos que este frame terminó y pasamos callback al siguiente rAF */
        _frameEnd = true;
        requestAnimationFrame(function () {
          callback();
        });
      }),
    );

    /* ══════════════════════════════════════════════════
       GameEngine — cada método como native function.
       IMPORTANTE: los valores que llegan del sandbox Acorn
       son objetos internos del intérprete. _u() los convierte
       a primitivos JS reales (string, number, boolean).
    ══════════════════════════════════════════════════ */
    var GE = window.GameEngine;
    if (!GE) return;

    /* Desempacar valor del sandbox → primitivo JS */
    function _u(v) {
      if (v === null || v === undefined) return v;
      if (typeof v === "object" && "data" in v) return v.data;
      return v;
    }
    function _n(v) {
      return Number(_u(v)) || 0;
    }
    function _s(v) {
      var u = _u(v);
      return (u === null || u === undefined) ? "" : String(u);
    }
    /* _color: hex string '#rrggbb' directo — ya no llegan arrays */
    function _color(v) {
      return _s(v) || "#000000";
    }

    var geObj = interpreter.createObjectProto(interpreter.OBJECT_PROTO);

    /* Pantalla */
    interpreter.setProperty(
      geObj,
      "start",
      interpreter.createNativeFunction(function (w, h) {
        GE.start(_n(w), _n(h));
      }),
    );
    interpreter.setProperty(
      geObj,
      "setBg",
      interpreter.createNativeFunction(function (c) {
        GE.setBg(_color(c));
      }),
    );
    interpreter.setProperty(
      geObj,
      "setBgImage",
      interpreter.createAsyncFunction(function (file, callback) {
        /* Espera el onload real — el callback solo se llama cuando
           la imagen ya está dibujada en el canvas y getImageData funciona */
        GE.setBgImage(_s(file), function () {
          callback();
        });
      }),
    );
    interpreter.setProperty(
      geObj,
      "clear",
      interpreter.createNativeFunction(function () {
        GE.clear();
      }),
    );

    /* Sprite */
    interpreter.setProperty(
      geObj,
      "createSprite",
      interpreter.createNativeFunction(function (x, y, w, h, colorOrImg) {
        GE.createSprite(_n(x), _n(y), _n(w), _n(h), _color(colorOrImg));
      }),
    );
    interpreter.setProperty(
      geObj,
      "moveSprite",
      interpreter.createNativeFunction(function (dx, dy) {
        GE.moveSprite(_n(dx), _n(dy));
      }),
    );
    interpreter.setProperty(
      geObj,
      "setPos",
      interpreter.createNativeFunction(function (x, y) {
        GE.setPos(_n(x), _n(y));
      }),
    );
    interpreter.setProperty(
      geObj,
      "getX",
      interpreter.createNativeFunction(function () {
        return GE.getX();
      }),
    );
    interpreter.setProperty(
      geObj,
      "getY",
      interpreter.createNativeFunction(function () {
        return GE.getY();
      }),
    );
    interpreter.setProperty(
      geObj,
      "drawSprite",
      interpreter.createNativeFunction(function () {
        GE.drawSprite();
      }),
    );
    interpreter.setProperty(
      geObj,
      "setFlip",
      interpreter.createNativeFunction(function (flip) {
        GE.setFlip(!!flip);
      }),
    );
    /* loadImage es async: precarga la imagen y avisa cuando termina */
    interpreter.setProperty(
      geObj,
      "loadImage",
      interpreter.createAsyncFunction(function (filename, callback) {
        GE.loadImage(_s(filename), function () {
          callback();
        });
      }),
    );

    /* Teclado */
    interpreter.setProperty(
      geObj,
      "keyPressed",
      interpreter.createNativeFunction(function (key) {
        return GE.keyPressed(_s(key));
      }),
    );

    /* Ratón */
    interpreter.setProperty(
      geObj,
      "mouseClicked",
      interpreter.createNativeFunction(function () {
        return GE.mouseClicked();
      }),
    );
    interpreter.setProperty(
      geObj,
      "mouseDown",
      interpreter.createNativeFunction(function () {
        return GE.mouseDown();
      }),
    );
    interpreter.setProperty(
      geObj,
      "mouseX",
      interpreter.createNativeFunction(function () {
        return GE.mouseX();
      }),
    );
    interpreter.setProperty(
      geObj,
      "mouseY",
      interpreter.createNativeFunction(function () {
        return GE.mouseY();
      }),
    );

    /* Movimiento por pasos / giro */
    interpreter.setProperty(
      geObj,
      "moveSteps",
      interpreter.createNativeFunction(function (steps) {
        GE.moveSteps(_n(steps));
      }),
    );
    interpreter.setProperty(
      geObj,
      "turnAngle",
      interpreter.createNativeFunction(function (deg) {
        GE.turnAngle(_n(deg));
      }),
    );
    interpreter.setProperty(
      geObj,
      "getAngle",
      interpreter.createNativeFunction(function () {
        return GE.getAngle();
      }),
    );
    interpreter.setProperty(
      geObj,
      "setAngle",
      interpreter.createNativeFunction(function (deg) {
        GE.setAngle(_n(deg));
      }),
    );
    interpreter.setProperty(
      geObj,
      "penMoveTo",
      interpreter.createNativeFunction(function (x, y) {
        GE.penMoveTo(_n(x), _n(y));
      }),
    );

    /* Colisiones */
    interpreter.setProperty(
      geObj,
      "touchingColor",
      interpreter.createNativeFunction(function (color) {
        return GE.touchingColor(_color(color));
      }),
    );
    interpreter.setProperty(
      geObj,
      "touchingEdge",
      interpreter.createNativeFunction(function () {
        return GE.touchingEdge();
      }),
    );
    interpreter.setProperty(
      geObj,
      "colorAtPosHex",
      interpreter.createNativeFunction(function (x, y) {
        return GE.colorAtPosHex(_n(x), _n(y));
      }),
    );
    interpreter.setProperty(
      geObj,
      "colorAtPosChannel",
      interpreter.createNativeFunction(function (x, y, ch) {
        return GE.colorAtPosChannel(_n(x), _n(y), _n(ch));
      }),
    );
    interpreter.setProperty(
      geObj,
      "colorAtPos",
      interpreter.createNativeFunction(function (x, y) {
        return GE.colorAtPosHex(_n(x), _n(y));
      }),
    );
    /* hexChannel: extrae canal R/G/B de un hex string — usado por color_split */
    interpreter.setProperty(
      geObj,
      "hexChannel",
      interpreter.createNativeFunction(function (hex, ch) {
        var h = _s(hex).replace("#", "");
        if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
        return parseInt(h.substr(_n(ch) * 2, 2), 16) || 0;
      }),
    );

    /* Puntaje */
    interpreter.setProperty(
      geObj,
      "addScore",
      interpreter.createNativeFunction(function (pts) {
        GE.addScore(_n(pts));
      }),
    );
    interpreter.setProperty(
      geObj,
      "getScore",
      interpreter.createNativeFunction(function () {
        return GE.getScore();
      }),
    );
    interpreter.setProperty(
      geObj,
      "resetScore",
      interpreter.createNativeFunction(function () {
        GE.resetScore();
      }),
    );

    /* Texto y formas */
    interpreter.setProperty(
      geObj,
      "showText",
      interpreter.createNativeFunction(function (text, x, y, color) {
        GE.showText(_s(text), _n(x), _n(y), _color(color));
      }),
    );
    interpreter.setProperty(
      geObj,
      "drawRect",
      interpreter.createNativeFunction(function (x, y, w, h, color) {
        GE.drawRect(_n(x), _n(y), _n(w), _n(h), _color(color));
      }),
    );
    interpreter.setProperty(
      geObj,
      "drawCircle",
      interpreter.createNativeFunction(function (x, y, r, color) {
        GE.drawCircle(_n(x), _n(y), _n(r), _color(color));
      }),
    );

    /* Stop */
    interpreter.setProperty(
      geObj,
      "stop",
      interpreter.createNativeFunction(function () {
        GE.stop();
      }),
    );

    /* ── LEDs simulados ── */
    interpreter.setProperty(
      geObj,
      "setLed",
      interpreter.createNativeFunction(function (name, on) {
        GE.setLed(_s(name), !!on);
      }),
    );
    interpreter.setProperty(
      geObj,
      "drawLeds",
      interpreter.createNativeFunction(function () {
        GE.drawLeds();
      }),
    );

    /* ── Lápiz ── */
    interpreter.setProperty(
      geObj,
      "penDown",
      interpreter.createNativeFunction(function (x, y) {
        /* _n() convierte valores del intérprete a número nativo JS */
        var xv = (x !== null && x !== undefined) ? _n(x) : undefined;
        var yv = (y !== null && y !== undefined) ? _n(y) : undefined;
        GE.penDown(xv, yv);
      }),
    );
    interpreter.setProperty(
      geObj,
      "penUp",
      interpreter.createNativeFunction(function () {
        GE.penUp();
      }),
    );
    interpreter.setProperty(
      geObj,
      "penSetColor",
      interpreter.createNativeFunction(function (c) {
        GE.penSetColor(_color(c));
      }),
    );
    interpreter.setProperty(
      geObj,
      "penSetSize",
      interpreter.createNativeFunction(function (s) {
        GE.penSetSize(_n(s));
      }),
    );
    interpreter.setProperty(
      geObj,
      "penClear",
      interpreter.createNativeFunction(function () {
        GE.penClear();
      }),
    );
    interpreter.setProperty(
      geObj,
      "penStamp",
      interpreter.createNativeFunction(function () {
        GE.penStamp();
      }),
    );

    interpreter.setProperty(globalObject, "GameEngine", geObj);
  });
}

/* ═══════════════════════════════════════════════════════
   MODO DE EJECUCIÓN
   ─────────────────────────────────────────────────────
   NORMAL  → highlight + 80ms/paso (bloques ESP32/Python)
   JUEGO   → game loop con rAF, sin delays entre pasos
             El intérprete corre hasta que llama a
             gameEngine_frameEnd() y entonces espera
             el siguiente rAF (~16ms = 60fps)
═══════════════════════════════════════════════════════ */
var gameMode = false;
var _rafId = null;
var _frameEnd = false; /* señal: el frame terminó, esperar rAF */

function _detectGameMode() {
  if (!Code || !Code.workspace) return false;
  var blocks = Code.workspace.getAllBlocks(false);
  for (var i = 0; i < blocks.length; i++) {
    var t = blocks[i].type;
    if (
      t === "game_start" ||
      t === "sprite_create" ||
      t === "sprite_move" ||
      t === "sprite_draw" ||
      t === "key_is_pressed" ||
      t === "game_clear" ||
      t === "mouse_clicked" ||
      t === "mouse_down" ||
      t === "sprite_move_steps" ||
      t === "sprite_turn_left" ||
      t === "sprite_turn_right"
    ) {
      return true;
    }
  }
  return false;
}

/* ── Modo normal: highlight + delay ── */
function runStep() {
  if (!interpreter) return;
  try {
    if (interpreter.step()) {
      runner = setTimeout(runStep, 80);
    } else {
      interpreter = null;
      Code.workspace.highlightBlock(null);
      Blockly.selected && Blockly.selected.unselect();
    }
  } catch (e) {
    console.error(e);
    interpreter = null;
    Code.workspace.highlightBlock(null);
  }
}

/* ── Modo juego: corre pasos hasta frameEnd o fin ── */
var _STEPS_PER_SLICE = 2000;
var _SLICE_MS = 14;

function _gameLoop() {
  if (!interpreter) {
    _rafId = null;
    return;
  }
  _frameEnd = false;
  var t0 = performance.now();
  var alive = true;
  var steps = 0;
  try {
    while (
      alive &&
      !_frameEnd &&
      steps < _STEPS_PER_SLICE &&
      performance.now() - t0 < _SLICE_MS
    ) {
      alive = interpreter.step();
      steps++;
    }
    if (!alive) {
      /* Programa terminó */
      interpreter = null;
      _rafId = null;
      console.log("[Game] programa terminado");
      return;
    }
    /* Pedir siguiente frame */
    _rafId = requestAnimationFrame(_gameLoop);
  } catch (e) {
    console.error("[Game] error:", e);
    interpreter = null;
    _rafId = null;
  }
}

/* ══════════════════════════════════════════════════════
   EJECUTAR
══════════════════════════════════════════════════════ */
function runBlocklyAnimation() {
  /* Detener todo lo anterior */
  if (runner) {
    clearTimeout(runner);
    runner = null;
  }
  if (_rafId) {
    cancelAnimationFrame(_rafId);
    _rafId = null;
  }

  Code.workspace.highlightBlock(null);

  /* Diferir la compilación para no bloquear el hilo en el handler del botón */
  setTimeout(function () {
    Blockly.JavaScript.init(Code.workspace);
    var code = Blockly.JavaScript.workspaceToCode(Code.workspace);

    gameMode = _detectGameMode();

    if (gameMode && typeof showView === "function") {
      showView("viewGame");
      /* Dibujar fondo inmediatamente para que el canvas no quede negro */
      if (typeof GameEngine !== "undefined" && GameEngine.drawBg) {
        setTimeout(function () {
          GameEngine.drawBg();
        }, 10);
      }
    }

    initInterpreter(code);

    if (gameMode) {
      setTimeout(function () {
        _rafId = requestAnimationFrame(_gameLoop);
      }, 50);
    } else {
      runStep();
    }
  }, 0);
}