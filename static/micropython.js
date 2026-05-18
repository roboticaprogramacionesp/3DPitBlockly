//import { Blockly.Python } from 'blockly/python';

// =========================
// CREAR GENERADOR PYTHON SI NO EXISTE
// =========================
if (!Blockly.Python) {
  Blockly.Python = new Blockly.Generator("Python");

  Blockly.Python.ORDER_ATOMIC = 0;
  Blockly.Python.ORDER_NONE = 99;
  Blockly.Python.ORDER_FUNCTION_CALL = 2;

  Blockly.Python.init = function (workspace) {
    Blockly.Python.definitions_ = Object.create(null);
  };

  Blockly.Python.finish = function (code) {
    const imports = Object.values(Blockly.Python.definitions_).join("\n");
    Blockly.Python.definitions_ = Object.create(null);
    return imports + "\n\n" + code;
  };

  Blockly.Python.scrub_ = function (block, code) {
    const nextBlock =
      block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = Blockly.Python.blockToCode(nextBlock);
    return code + nextCode;
  };
}

Blockly.Python["lists_append"] = function (block) {
  const listVar = Blockly.Python.nameDB_.getName(
    block.getFieldValue("LIST"),
    Blockly.VARIABLE_CATEGORY_NAME,
  );

  const item =
    Blockly.Python.valueToCode(block, "ITEM", Blockly.Python.ORDER_NONE) || "0";

  return `${listVar}.append(${item})\n`;
};

Blockly.Python["text_encode"] = function (block) {
  const value =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) ||
    "''";
  return [`${value}.encode()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["text_decode"] = function (block) {
  const value =
    Blockly.Python.valueToCode(block, "BYTES", Blockly.Python.ORDER_NONE) ||
    "b''";
  return [`${value}.decode()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["objecto"] = function (block) {
  const name = block.getFieldValue("NAME");

  return [name, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["from"] = function (block) {
  const module = block.getFieldValue("MODULE");
  const name = block.getFieldValue("NAME");

  Blockly.Python.definitions_[`import_${module}`] =
    `from ${module} import ${name}`;

  return "";
};

Blockly.Python["import"] = function (block) {
  const module = block.getFieldValue("MODULE");

  Blockly.Python.definitions_[`import_${module}`] = `import ${module}`;
  return "";
};

Blockly.Python["add"] = function (block) {
  let add = block.getFieldValue("ADD");

  // Evitar null o vacío
  if (!add) return "";

  return add + "\n";
};

Blockly.Python["none"] = function (block) {
  return ["None", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["in"] = function (block) {
  const a =
    Blockly.Python.valueToCode(block, "A", Blockly.Python.ORDER_NONE) || "0";
  const b =
    Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "[]";
  return [`${a} in ${b}`, Blockly.Python.ORDER_RELATIONAL];
};

Blockly.Python["is"] = function (block) {
  const a =
    Blockly.Python.valueToCode(block, "A", Blockly.Python.ORDER_NONE) || "None";
  const b =
    Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_NONE) || "None";
  return [`${a} is ${b}`, Blockly.Python.ORDER_RELATIONAL];
};

Blockly.Python["del"] = function (block) {
  const v =
    Blockly.Python.valueToCode(block, "VAR", Blockly.Python.ORDER_NONE) || "";
  return `del ${v}\n`;
};

Blockly.Python["lambda"] = function (block) {
  const args = block.getFieldValue("ARGS");
  const body =
    Blockly.Python.valueToCode(block, "BODY", Blockly.Python.ORDER_NONE) ||
    "None";
  return [`lambda ${args}: ${body}`, Blockly.Python.ORDER_LAMBDA];
};

Blockly.Python["raise"] = function (block) {
  const err =
    Blockly.Python.valueToCode(block, "ERR", Blockly.Python.ORDER_NONE) || "";
  return `raise ${err}\n`;
};

Blockly.Python["with"] = function (block) {
  const ctx =
    Blockly.Python.valueToCode(block, "CTX", Blockly.Python.ORDER_NONE) || "";
  const v = block.getFieldValue("VAR");
  const stm = Blockly.Python.statementToCode(block, "DO");
  return `with ${ctx} as ${v}:\n${stm}`;
};

Blockly.Python["yield"] = function (block) {
  const val =
    Blockly.Python.valueToCode(block, "VAL", Blockly.Python.ORDER_NONE) ||
    "None";
  return [`yield ${val}`, Blockly.Python.ORDER_NONE];
};

Blockly.Python["file_open"] = function (block) {
  const file = block.getFieldValue("FILENAME");
  let mode = block.getFieldValue("MODE");
  const isBinary = block.getFieldValue("BINARY") === "TRUE";
  // Agregar 'b' si es binario
  if (isBinary) {
    mode += "b"; // r → rb, w → wb, a → ab
  }
  const code = "open('" + file + "', '" + mode + "')";
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["file_write"] = function (block) {
  const file = block.getFieldValue("file");
  const text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) ||
    '""';
  return `${file}.write(${text})\n`;
};

Blockly.Python["file_read"] = function (block) {
  const file = block.getFieldValue("file");
  return `${file}.read()\n`;
};

Blockly.Python["file_close"] = function (block) {
  const file = block.getFieldValue("file");
  return `${file}.close()\n`;
};

Blockly.Python["create_folder"] = function (block) {
  const file = block.getFieldValue("file");
  Blockly.Python.definitions_["import_os"] = "import os";
  const code = `os.mkdir(${file})\n`;
  return code;
};

Blockly.Python["delete_file"] = function (block) {
  const file = block.getFieldValue("file");
  Blockly.Python.definitions_["import_os"] = "import os";
  const code = `os.remove(${file})\n`;
  return code;
};

Blockly.Python["listdir"] = function (block) {
  Blockly.Python.definitions_["import_os"] = "import os";
  const code = `os.listdir()\n`;
  return code;
};

Blockly.Python["simple_text"] = function (block) {
  const text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) ||
    '""';
  return [`${text}`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["input_text"] = function (block) {
  const text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) ||
    "''";

  return [`input(${text})`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["json_create"] = function () {
  return ["{}", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["json_dumps"] = function (block) {
  Blockly.Python.definitions_["import_json"] = "import json";

  const obj =
    Blockly.Python.valueToCode(block, "OBJ", Blockly.Python.ORDER_ATOMIC) ||
    "{}";

  return [`json.dumps(${obj})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["json_loads"] = function (block) {
  Blockly.Python.definitions_["import_json"] = "import json";

  const txt =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC) ||
    '""';

  return [`json.loads(${txt})`, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python["json_get"] = function (block) {
  const obj =
    Blockly.Python.valueToCode(block, "OBJ", Blockly.Python.ORDER_ATOMIC) ||
    "{}";

  const key = block.getFieldValue("KEY");

  return [`${obj}["${key}"]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["json_set"] = function (block) {
  const obj =
    Blockly.Python.valueToCode(block, "OBJ", Blockly.Python.ORDER_ATOMIC) ||
    "{}";

  const key = block.getFieldValue("KEY");

  const value =
    Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_ATOMIC) ||
    "0";

  return `${obj}["${key}"] = ${value}\n`;
};

Blockly.Python["json_has_key"] = function (block) {
  const obj =
    Blockly.Python.valueToCode(block, "OBJ", Blockly.Python.ORDER_ATOMIC) ||
    "{}";

  const key = block.getFieldValue("KEY");

  return [`"${key}" in ${obj}`, Blockly.Python.ORDER_RELATIONAL];
};

Blockly.Python["dict_create_with"] = function (block) {
  const elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    const key =
      Blockly.Python.valueToCode(block, "KEY" + i, Blockly.Python.ORDER_NONE) ||
      "''";
    const value =
      Blockly.Python.valueToCode(
        block,
        "VALUE" + i,
        Blockly.Python.ORDER_NONE,
      ) || "None";

    elements.push(`${key}: ${value}`);
  }

  const code = `{${elements.join(", ")}}`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["dict_create_empty"] = function () {
  return ["{}", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["dict_create_with"] = function () {
  return ["{}", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["dict_get"] = function (block) {
  const dict =
    Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_MEMBER) ||
    "{}";

  const key =
    Blockly.Python.valueToCode(block, "KEY", Blockly.Python.ORDER_NONE) || "''";

  const code = `${dict}[${key}]`;

  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python["dict_set"] = function (block) {
  const dict =
    Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_MEMBER) ||
    "{}";

  const key =
    Blockly.Python.valueToCode(block, "KEY", Blockly.Python.ORDER_NONE) || "''";

  const value =
    Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) ||
    "None";

  const code = `${dict}[${key}] = ${value}\n`;

  return code;
};

Blockly.Python["dict_keys"] = function (block) {
  const dict =
    Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_MEMBER) ||
    "{}";

  const code = `${dict}.keys()`;

  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["dict_values"] = function (block) {
  const dict =
    Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_MEMBER) ||
    "{}";

  const code = `${dict}.values()`;

  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["dict_has_key"] = function (block) {
  const dict =
    Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_MEMBER) ||
    "{}";

  const key =
    Blockly.Python.valueToCode(block, "KEY", Blockly.Python.ORDER_NONE) || "''";

  const code = `${key} in ${dict}`;

  return [code, Blockly.Python.ORDER_RELATIONAL];
};

Blockly.Python["dict_pair"] = function (block) {
  const key =
    Blockly.Python.valueToCode(block, "KEY", Blockly.Python.ORDER_NONE) ||
    "None";

  const value =
    Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) ||
    "None";

  return [key + ": " + value, Blockly.Python.ORDER_NONE];
};

Blockly.Python["dict_create_with"] = function (block) {
  const elements = [];

  for (let i = 0; i < block.itemCount_; i++) {
    const pair = Blockly.Python.valueToCode(
      block,
      "ADD" + i,
      Blockly.Python.ORDER_NONE,
    );

    if (pair) elements.push(pair);
  }

  const code = "{" + elements.join(", ") + "}";

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["dict_get"] = function (block) {
  const dict =
    Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_MEMBER) ||
    "{}";

  const key =
    Blockly.Python.valueToCode(block, "KEY", Blockly.Python.ORDER_NONE) ||
    "None";

  const code = dict + "[" + key + "]";
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python["dict_set"] = function (block) {
  const dict =
    Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_MEMBER) ||
    "{}";

  const key =
    Blockly.Python.valueToCode(block, "KEY", Blockly.Python.ORDER_NONE) ||
    "None";

  const value =
    Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) ||
    "None";

  return dict + "[" + key + "] = " + value + "\n";
};

Blockly.Python["dict_has_key"] = function (block) {
  const dict =
    Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_NONE) ||
    "{}";

  const key =
    Blockly.Python.valueToCode(block, "KEY", Blockly.Python.ORDER_NONE) ||
    "None";

  const code = key + " in " + dict;

  return [code, Blockly.Python.ORDER_LOGICAL];
};

Blockly.Python["dict_keys"] = function (block) {
  const dict =
    Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_MEMBER) ||
    "{}";

  const code = "list(" + dict + ".keys())";

  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["dict_values"] = function (block) {
  const dict =
    Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_MEMBER) ||
    "{}";

  const code = "list(" + dict + ".values())";

  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["dict_length"] = function (block) {
  const dict =
    Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_NONE) ||
    "{}";

  const code = "len(" + dict + ")";

  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["dict_remove"] = function (block) {
  const dict =
    Blockly.Python.valueToCode(block, "DICT", Blockly.Python.ORDER_MEMBER) ||
    "{}";

  const key =
    Blockly.Python.valueToCode(block, "KEY", Blockly.Python.ORDER_NONE) ||
    "None";

  return dict + ".pop(" + key + ", None)\n";
};

Blockly.Python["dict_is_dictionary"] = function (block) {
  const value =
    Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) ||
    "None";

  const code = "isinstance(" + value + ", dict)";
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// Bloque: class_create
Blockly.Python["class_create"] = function (block) {
  const className = block.getFieldValue("CLASSNAME") || "MyClass";
  const body =
    Blockly.Python.statementToCode(block, "BODY") || Blockly.Python.PASS;
  const code = "class " + className + ":\n" + body;
  return code;
};

// Bloque: class_init
Blockly.Python["class_init"] = function (block) {
  const args = [];
  for (let i = 0; block.getField("ARGNAME" + i); i++) {
    args.push(block.getFieldValue("ARGNAME" + i));
  }

  const body =
    Blockly.Python.statementToCode(block, "BODY") || Blockly.Python.PASS;
  return (
    "def __init__(self" +
    (args.length ? ", " + args.join(", ") : "") +
    "):\n" +
    body
  );
};

Blockly.Python["class_method"] = function (block) {
  const methodName = block.getFieldValue("NAME") || "mi_metodo";

  const mutation = block.mutationToDom();
  const argsCount = parseInt(mutation.getAttribute("args"), 10) || 0;
  const args = [];
  for (let i = 0; i < argsCount; i++) {
    args.push("arg" + (i + 1));
  }

  const body =
    Blockly.Python.statementToCode(block, "BODY") || Blockly.Python.PASS;

  const code =
    "def " +
    methodName +
    "(self" +
    (args.length ? ", " + args.join(", ") : "") +
    "):\n" +
    body;
  return code;
};

Blockly.Python["class_instance"] = function (block) {
  const objName = block.getFieldValue("OBJ");
  const className = block.getFieldValue("CLASSNAME");

  const args = [];
  for (let i = 0; block.getField("ARGNAME" + i); i++) {
    args.push(block.getFieldValue("ARGNAME" + i));
  }

  return objName + " = " + className + "(" + args.join(", ") + ")\n";
};

// Bloque: class_call
Blockly.Python["class_call"] = function (block) {
  const obj = block.getFieldValue("OBJ");
  const methodName = block.getFieldValue("METHOD") || "mi_metodo";
  const code = obj + "." + methodName + "()\n";
  return code;
};

Blockly.Python["color_picker"] = function (block) {
  const hex = block.getFieldValue("COLOR");

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const code = `(${r},${g},${b})`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["color_rgb"] = function (block) {
  const r =
    Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_ATOMIC) || 0;

  const g =
    Blockly.Python.valueToCode(block, "G", Blockly.Python.ORDER_ATOMIC) || 0;

  const b =
    Blockly.Python.valueToCode(block, "B", Blockly.Python.ORDER_ATOMIC) || 0;

  const code = `(${r},${g},${b})`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["color_split"] = function (block) {
  const color =
    Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC) ||
    "(0,0,0)";

  const channel = block.getFieldValue("CHANNEL");
  let index;
  if (channel === "R") {
    index = 0;
  } else if (channel === "G") {
    index = 1;
  } else {
    index = 2;
  }
  const code = `${color}[${index}]`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["controls_try_except"] = function (block) {
  const tryCode = Blockly.Python.statementToCode(block, "TRY");

  const exceptCode = Blockly.Python.statementToCode(block, "EXCEPT");

  return `try:\n${tryCode}except:\n${exceptCode}`;
};

Blockly.Python["controls_try_except_var"] = function (block) {
  const variable = Blockly.Python.nameDB_.getName(
    block.getFieldValue("VAR"),
    Blockly.VARIABLE_CATEGORY_NAME,
  );

  const tryCode = Blockly.Python.statementToCode(block, "TRY");

  const exceptCode = Blockly.Python.statementToCode(block, "EXCEPT");

  return `try:\n${tryCode}except Exception as ${variable}:\n${exceptCode}`;
};

Blockly.Python["controls_try_except_finally"] = function (block) {
  const tryCode = Blockly.Python.statementToCode(block, "TRY");

  const exceptCode = Blockly.Python.statementToCode(block, "EXCEPT");

  const finallyCode = Blockly.Python.statementToCode(block, "FINALLY");

  return `try:\n${tryCode}except:\n${exceptCode}finally:\n${finallyCode}`;
};

Blockly.Python["exceptions_raise"] = function (block) {
  const error =
    Blockly.Python.valueToCode(block, "ERROR", Blockly.Python.ORDER_NONE) ||
    "Exception()";

  return `raise ${error}\n`;
};

Blockly.Python["exceptions_continue"] = function () {
  return "continue\n";
};

Blockly.Python["pass"] = function () {
  return "pass\n";
};

Blockly.Python["runstart"] = function (block) {
  return "";
};

Blockly.Python["convert_to_int"] = function (block) {
  const value =
    Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) ||
    "0";
  return [`int(${value})`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["convert_to_float"] = function (block) {
  const value =
    Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) ||
    "0";
  return [`float(${value})`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["convert_to_str"] = function (block) {
  const value =
    Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) ||
    "''";
  return [`str(${value})`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["list_empty"] = function () {
  return ["[]", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["is_int"] = function (block) {
  const value =
    Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) ||
    "0";
  return [`isinstance(${value}, int)`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["is_float"] = function (block) {
  const value =
    Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) ||
    "0";
  return [`isinstance(${value}, float)`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["is_str"] = function (block) {
  const value =
    Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) ||
    "''";
  return [`isinstance(${value}, str)`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["is_list"] = function (block) {
  const value =
    Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) ||
    "[]";
  return [`isinstance(${value}, list)`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["math_map"] = function (block) {
  const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const in_min = Blockly.Python.valueToCode(block, "IN_MIN", Blockly.Python.ORDER_NONE) || 0;
  const in_max = Blockly.Python.valueToCode(block, "IN_MAX", Blockly.Python.ORDER_NONE) || 180;
  const out_min = Blockly.Python.valueToCode(block, "OUT_MIN", Blockly.Python.ORDER_NONE) || 0;
  const out_max = Blockly.Python.valueToCode(block, "OUT_MAX", Blockly.Python.ORDER_NONE) || 100;

  // Definir la función una sola vez
  Blockly.Python.definitions_["map_function"] =
    `def map(x, in_min=0, in_max=180, out_min=21, out_max=132):
    return int((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)`;

  const code = `map(${x}, ${in_min}, ${in_max}, ${out_min}, ${out_max})`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["machine_reset"] = function () {
  Blockly.Python.definitions_["import_machine_module"] = "import machine";
  return "machine.reset()\n";
};

Blockly.Python["machine_freq"] = function (block) {
  const freq =
    Blockly.Python.valueToCode(block, "FREQ", Blockly.Python.ORDER_ATOMIC) ||
    240000000;
  Blockly.Python.definitions_["import_machine_module"] = "import machine";
  return `machine.freq(${freq})\n`;
};

Blockly.Python["machine_unique_id"] = function () {
  Blockly.Python.definitions_["import_machine_module"] = "import machine";
  return ["machine.unique_id()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["ky001_init"] = function (block) {
  const pin = block.getFieldValue("PIN");

  Blockly.Python.definitions_["import_ds18b20"] =
    "from machine import Pin\nimport onewire, ds18x20";

  return `ow${pin} = onewire.OneWire(Pin(${pin}))
ds${pin} = ds18x20.DS18X20(ow${pin})
`;
};

Blockly.Python["ky001_scan"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return [`ds${pin}.scan()`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["ky001_convert"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return `ds${pin}.convert_temp()\n`;
};

Blockly.Python["ky001_read_index"] = function (block) {
  const pin = block.getFieldValue("PIN");

  const index =
    Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC) ||
    0;

  return [
    `ds${pin}.read_temp(ds${pin}_roms[${index}])`,
    Blockly.Python.ORDER_FUNCTION_CALL,
  ];
};

Blockly.Python["pin_init"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const mode = block.getFieldValue("MODE");

  Blockly.Python.definitions_["import_machine"] = "from machine import Pin";

  return `p${pin} = Pin(${pin}, ${mode})\n`;
};

Blockly.Python["pin_init_pull"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const mode = block.getFieldValue("MODE");

  Blockly.Python.definitions_["import_machine"] = "from machine import Pin";

  return `p${pin} = Pin(${pin}, Pin.IN, ${mode})\n`;
};

Blockly.Python["pin_init_value"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const value = block.getFieldValue("VALUE");

  Blockly.Python.definitions_["import_machine"] = "from machine import Pin";

  return `p${pin} = Pin(${pin}, Pin.OUT, value=${value})\n`;
};

Blockly.Python["pin_on"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return `p${pin}.on()\n`;
};

Blockly.Python["pin_off"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return `p${pin}.off()\n`;
};

Blockly.Python["set_value_pin"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const value = block.getFieldValue("VALUE");
  return `p${pin}.value(${value})\n`;
};

Blockly.Python["pin_value"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return [`p${pin}.value()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["pin_set_value"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const value = block.getFieldValue("VALUE");

  return `p${pin}.value(${value})\n`;
};

Blockly.Python["adc_pin"] = function (block) {
  const pin = block.getFieldValue("PIN");

  Blockly.Python.definitions_["import_machine"] =
    "from machine import Pin, ADC";

  return `adc${pin} = ADC(Pin(${pin}))\n`;
};

Blockly.Python["adc_width"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const width = block.getFieldValue("WIDTH");

  return `adc${pin}.width(${width})\n`;
};

Blockly.Python["adc_atten"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const atten = block.getFieldValue("ATTEN");

  return `adc${pin}.atten(${atten})\n`;
};

Blockly.Python["adc_read"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return [`adc${pin}.read()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["adc_read_u16"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return [`adc${pin}.read_u16()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["adc_read_uv"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return [`adc${pin}.read_uv()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["pwm_init"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const freq = block.getFieldValue("FREQ");
  const duty = block.getFieldValue("DUTY");

  Blockly.Python.definitions_["import_pwm"] = "from machine import Pin, PWM";

  return `pwm${pin} = PWM(Pin(${pin}), freq=${freq}, duty=${duty})\n`;
};

Blockly.Python["pwm_freq"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const freq = block.getFieldValue("FREQ");

  return `pwm${pin}.freq(${freq})\n`;
};

Blockly.Python["pwm_duty"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const duty = block.getFieldValue("DUTY");
  return `pwm${pin}.duty(${duty})\n`;
};


Blockly.Python["read_pwm_freq"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return `pwm${pin}.freq()\n`;
};

Blockly.Python["read_pwm_duty"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return `pwm${pin}.duty()\n`;
};

Blockly.Python["dac_init"] = function (block) {
  const pin = block.getFieldValue("PIN");

  Blockly.Python.definitions_["import_machine"] =
    "from machine import Pin, DAC";

  return `dac${pin} = DAC(Pin(${pin}))\n`;
};

Blockly.Python["dac_write"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const value = block.getFieldValue("VALUE");

  return `dac${pin}.write(${value})\n`;
};

Blockly.Python["touch_init"] = function (block) {
  const pin = block.getFieldValue("PIN");

  Blockly.Python.definitions_["import_touch"] =
    "from machine import Pin, TouchPad";

  return `touch${pin} = TouchPad(Pin(${pin}))\n`;
};

Blockly.Python["touch_config"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const threshold = block.getFieldValue("THRESHOLD");

  return `touch${pin}.config(${threshold})\n`;
};

Blockly.Python["touch_read"] = function (block) {
  const pin = block.getFieldValue("PIN");

  const code = `touch${pin}.read()`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python["time_sleep"] = function (block) {
  const value = block.getFieldValue("VALUE");
  const unit = block.getFieldValue("UNIT");

  let code = "";
  let imports = [];

  if (unit === "S") {
    imports.push("sleep");
    code = `sleep(${value})\n`;

  } else if (unit === "MS") {
    imports.push("sleep_ms");
    code = `sleep_ms(${value})\n`;

  } else if (unit === "US") {
    imports.push("sleep_us");
    code = `sleep_us(${value})\n`;
  }

  // Agrega imports sin duplicados
  if (!Blockly.Python.definitions_["import_time"]) {
    Blockly.Python.definitions_["import_time"] =
      `from time import ${imports.join(", ")}`;
  } else {
    const current = Blockly.Python.definitions_["import_time"]
      .replace("from time import ", "")
      .split(", ")
      .filter(Boolean);

    const merged = [...new Set([...current, ...imports])];

    Blockly.Python.definitions_["import_time"] =
      `from time import ${merged.join(", ")}`;
  }

  return code;
};


Blockly.Python["time_ticks_ms"] = function (block) {
  Blockly.Python.definitions_["import_time"] = "from time import ticks_ms";

  return ["ticks_ms()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["time_ticks_diff"] = function (block) {
  const tNew =
    Blockly.Python.valueToCode(block, "NEW", Blockly.Python.ORDER_NONE) || "0";
  const tOld =
    Blockly.Python.valueToCode(block, "OLD", Blockly.Python.ORDER_NONE) || "0";

  Blockly.Python.definitions_["import_time"] = "from time import ticks_diff";

  return [`ticks_diff(${tNew}, ${tOld})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["time_every"] = function (block) {
  const interval =
    Blockly.Python.valueToCode(block, "INTERVAL", Blockly.Python.ORDER_NONE) ||
    "1000";

  const timer = Blockly.Python.nameDB_.getName(
    block.getFieldValue("TIMER"),
    Blockly.VARIABLE_CATEGORY_NAME,
  );

  const statements = Blockly.Python.statementToCode(block, "DO") || "  pass\n";

  Blockly.Python.definitions_["import_ticks"] =
    "from time import ticks_ms, ticks_diff";

  Blockly.Python.definitions_["timer_init_" + timer] = `${timer} = ticks_ms()`;

  const code =
    `if ticks_diff(ticks_ms(), ${timer}) >= ${interval}:\n` +
    `  ${timer} = ticks_ms()\n` +
    statements;

  return code;
};

Blockly.Python["rtc_init"] = function (block) {
  const rtc = block.getFieldValue("RTC");
  Blockly.Python.definitions_["import_rtc"] = "from machine import RTC";

  return `${rtc} = RTC()\n`;
};

Blockly.Python["rtc_set_datetime"] = function (block) {
  const rtc = block.getFieldValue("RTC");
  const year = block.getFieldValue("YEAR");
  const month = block.getFieldValue("MONTH");
  const day = block.getFieldValue("DAY");
  const hour = block.getFieldValue("HOUR");
  const min = block.getFieldValue("MIN");
  const sec = block.getFieldValue("SEC");

  Blockly.Python.definitions_["import_rtc"] = "from machine import RTC";

  const code = `${rtc}.datetime((${year}, ${month}, ${day}, 0, ${hour}, ${min}, ${sec}, 0))\n`;
  return code;
};

Blockly.Python["rtc_get_datetime"] = function (block) {
  const rtc = block.getFieldValue("RTC");
  Blockly.Python.definitions_["import_rtc"] = "from machine import RTC";

  return [`${rtc}.datetime()\n`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["wdt_init"] = function (block) {
  const wdt_name = block.getFieldValue("WDT");
  const timeout = block.getFieldValue("TIMEOUT");

  Blockly.Python.definitions_["import_wdt"] = "from machine import WDT";

  const code = `${wdt_name} = WDT(timeout=${timeout})\n`;
  return code;
};

Blockly.Python["wdt_feed"] = function (block) {
  const wdt_name = block.getFieldValue("WDT");

  const code = `${wdt_name}.feed()\n`;
  return code;
};

Blockly.Python["machine_reset_cause"] = function (block) {
  const statements_do = Blockly.Python.statementToCode(block, "DO");

  Blockly.Python.definitions_["import_machine"] = "import machine";

  const code =
    `if machine.reset_cause() == machine.DEEPSLEEP_RESET:
${statements_do}`;

  return code;
};
Blockly.Python["machine_deepsleep"] = function (block) {
  const time = block.getFieldValue("TIME");

  Blockly.Python.definitions_["import_machine"] = "import machine";

  const code = `machine.deepsleep(${time})\n`;
  return code;
};

Blockly.Python["timer_init"] = function (block) {
  const id = block.getFieldValue("TIMER_ID");
  const mode = block.getFieldValue("MODE");
  const period = block.getFieldValue("PERIOD");

  const statements = Blockly.Python.statementToCode(block, "DO") || "  pass\n";

  const timerName = `timer_${id}`;
  const callbackName = `callback_${id}`;

  // IMPORT
  Blockly.Python.definitions_["import_timer"] = "from machine import Timer";

  // CREAR CALLBACK
  Blockly.Python.definitions_[callbackName] =
    `def ${callbackName}(t):\n${statements}`;

  // CREAR TIMER GLOBAL
  Blockly.Python.definitions_[timerName] = `${timerName} = Timer(${id})`;

  const code = `${timerName}.init(period=${period}, mode=Timer.${mode}, callback=${callbackName})\n`;

  return code;
};

Blockly.Python["timer_stop"] = function (block) {
  const id = block.getFieldValue("TIMER_ID");
  const timerName = `timer_${id}`;

  Blockly.Python.definitions_["import_timer"] = "from machine import Timer";

  return `${timerName}.deinit()\n`;
};

/* ======================== LED SIMPLE ======================== */
Blockly.Python["led_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const pin = block.getFieldValue("PIN");
  Blockly.Python.definitions_["import_pin"] = "from machine import Pin";
  const code = `${name} = Pin(${pin}, Pin.OUT, value=0)\n`;
  return code;
};

Blockly.Python["set_led"] = function (block) {
  const name = block.getFieldValue("NAME");
  const st = block.getFieldValue("STATE");
  const code = `${name}.value(${st})\n`;
  return code;
};

/* ======================== LED BICOLOR RG ======================== */
Blockly.Python["rg_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const r = block.getFieldValue("R");
  const g = block.getFieldValue("G");

  Blockly.Python.definitions_["import_pin"] = "from machine import Pin";

  const code = `${name}_r = Pin(${r}, Pin.OUT, value=0)
${name}_g = Pin(${g}, Pin.OUT, value=0)
`;

  return code;
};

Blockly.Python["set_led_rg"] = function (block) {
  const name = block.getFieldValue("NAME");
  const rs = block.getFieldValue("RSTATE");
  const gs = block.getFieldValue("GSTATE");

  const code = `${name}_r.value(${rs})
${name}_g.value(${gs})
`;

  return code;
};

/* ======================== LED RGB ======================== */
Blockly.Python["rgb_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const r = block.getFieldValue("R");
  const g = block.getFieldValue("G");
  const b = block.getFieldValue("B");

  Blockly.Python.definitions_["import_pin"] = "from machine import Pin";
  const code = `${name}_r = Pin(${r}, Pin.OUT, value=0)
${name}_g = Pin(${g}, Pin.OUT, value=0)
${name}_b = Pin(${b}, Pin.OUT, value=0)
`;

  return code;
};

Blockly.Python["set_led_rgb"] = function (block) {
  const name = block.getFieldValue("NAME");
  const rs = block.getFieldValue("RSTATE");
  const gs = block.getFieldValue("GSTATE");
  const bs = block.getFieldValue("BSTATE");

  const code = `${name}_r.value(${rs})
${name}_g.value(${gs})
${name}_b.value(${bs})
`;

  return code;
};

/* ======================== SEMÁFORO ======================== */
Blockly.Python["init_semaforo"] = function (block) {
  const name = block.getFieldValue("NAME");
  const g = block.getFieldValue("G");
  const y = block.getFieldValue("Y");
  const r = block.getFieldValue("R");

  Blockly.Python.definitions_["import_pin"] = "from machine import Pin";

  const code = `${name}_g = Pin(${g}, Pin.OUT, value=0)
${name}_y = Pin(${y}, Pin.OUT, value=0)
${name}_r = Pin(${r}, Pin.OUT, value=0)
`;

  return code;
};

Blockly.Python["set_semaforo"] = function (block) {
  const name = block.getFieldValue("NAME");

  const gv = block.getFieldValue("G");
  const yv = block.getFieldValue("Y");
  const rv = block.getFieldValue("R");

  const code = `${name}_g.value(${gv})
${name}_y.value(${yv})
${name}_r.value(${rv})
`;

  return code;
};

/* ======================== IR (KY-005) ======================== */
Blockly.Python["ky005_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const pin = block.getFieldValue("PIN");

  Blockly.Python.definitions_["import_machine"] = `from machine import Pin
from ir_tx import NEC`;

  return `${name} = NEC(Pin(${pin}, Pin.OUT))\n`;
};

Blockly.Python["ky005_send_nec"] = function (block) {
  const name = block.getFieldValue("NAME");

  const addr =
    Blockly.Python.valueToCode(block, "ADDR", Blockly.Python.ORDER_ATOMIC) || 0;

  const cmd =
    Blockly.Python.valueToCode(block, "CMD", Blockly.Python.ORDER_ATOMIC) || 0;

  const code = `${name}.transmit(${addr}, ${cmd})\n`;

  return code;
};

Blockly.Python["interruptor_init"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const pull = block.getFieldValue("PULL");

  let pullCode = "";
  if (pull === "PULL_UP") pullCode = ", Pin.PULL_UP";
  else if (pull === "PULL_DOWN") pullCode = ", Pin.PULL_DOWN";

  Blockly.Python.definitions_["import_pin"] = "from machine import Pin";

  return `btn_${pin} = Pin(${pin}, Pin.IN${pullCode})\n`;
};

Blockly.Python["interruptor_read"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return [`btn_${pin}.value()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["interruptor_irq"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const trigger = block.getFieldValue("TRIGGER");
  const statements = Blockly.Python.statementToCode(block, "DO");

  Blockly.Python.definitions_["import_pin"] = "from machine import Pin";

  let irqType = "";

  if (trigger === "IRQ_FALLING") irqType = "Pin.IRQ_FALLING";
  else if (trigger === "IRQ_RISING") irqType = "Pin.IRQ_RISING";
  else if (trigger === "IRQ_BOTH") irqType = "Pin.IRQ_FALLING | Pin.IRQ_RISING";

  const funcName = `btn_${pin}_callback`;

  return `
def ${funcName}(pin):
${statements || "    pass"}

btn_${pin}.irq(trigger=${irqType}, handler=${funcName})
`;
};

Blockly.Python["buzzer_tone"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const freq = block.getFieldValue("NOTE");
  const time =
    Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_ATOMIC) || 1;

  // Imports arriba
  Blockly.Python.definitions_["import_machine"] =
    "from machine import Pin, PWM";
  Blockly.Python.definitions_["import_sleep"] = "from time import sleep";

  return (
    `
pwm${pin} = PWM(Pin(${pin}), freq=${freq}, duty=512)
sleep(${time})
pwm${pin}.deinit()
`.trim() + "\n"
  );
};

Blockly.Python["buzzer_stop"] = function (block) {
  const pin = block.getFieldValue("PIN");

  Blockly.Python.definitions_["import_machine"] =
    "from machine import Pin, PWM";

  return (
    `
pwm${pin}.deinit()
`.trim() + "\n"
  );
};

Blockly.Python["buzzer_song"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const song = block.getFieldValue("SONG");

  Blockly.Python.definitions_["import_rtttl"] = "import rtttl, songs";

  return `play = rtttl.play(Pin(${pin}, Pin.OUT), songs.find('${song}'))\n`;
};

Blockly.Python["actuador_init"] = function (block) {
  const pin = block.getFieldValue("PIN");

  Blockly.Python.definitions_["import_machine"] = "from machine import Pin";

  const code = `actuador${pin} = Pin(${pin}, Pin.OUT, value=0)\n`;
  return code;
};

Blockly.Python["actuador_on_off"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const state = block.getFieldValue("STATE");
  Blockly.Python.definitions_["import_machine"] = "from machine import Pin";
  let s1 = state === "on" ? 1 : 0;
  const code = `actuador${pin}.value(${s1})\n`;
  return code;
};

Blockly.Python["dht_init"] = function (block) {
  const model = block.getFieldValue("MODEL");
  const pin = block.getFieldValue("PIN");
  //const id = block.getFieldValue("ID");

  Blockly.Python.definitions_["import_dht"] = `from machine import Pin
import dht`;

  const sensor = model === "DHT22" ? "DHT22" : "DHT11";

  return `dht${pin} = dht.${sensor}(Pin(${pin}))\n`;
};

Blockly.Python["dht_measure"] = function (block) {
  const pin = block.getFieldValue("PIN");
  //const id = block.getFieldValue("ID");

  return `dht${pin}.measure()\n`;
};

Blockly.Python["dht_temperature"] = function (block) {
  const pin = block.getFieldValue("PIN");
  //const id = block.getFieldValue("ID");

  return [`dht${pin}.temperature()`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["dht_humidity"] = function (block) {
  const pin = block.getFieldValue("PIN");
  //const id = block.getFieldValue("ID");

  return [`dht${pin}.humidity()`, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["analog_sensor_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const pin = block.getFieldValue("PIN");

  const atten = block.getFieldValue("ATTEN");
  const width = block.getFieldValue("WIDTH");

  Blockly.Python.definitions_["import_adc"] = "from machine import Pin, ADC";

  return `
${name}=ADC(Pin(${pin}))
${name}.atten(${atten})
${name}.width(${width})
`;
};

Blockly.Python["analog_sensor_read"] = function (block) {
  const name = block.getFieldValue("NAME");
  return [`${name}.read()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["ky023_analog"] = function (block) {
  const name = block.getFieldValue("NAME");

  const pinX = block.getFieldValue("PIN_X");
  const pinY = block.getFieldValue("PIN_Y");
  const pinSW = block.getFieldValue("PIN_SW");
  const atten = block.getFieldValue("ATTEN");
  const width = block.getFieldValue("WIDTH");
  const pullSW = block.getFieldValue("PULL");

  Blockly.Python.definitions_["import_machine"] =
    "from machine import Pin, ADC";

  return `${name}_x = ADC(Pin(${pinX}))
${name}_x.atten(${atten})
${name}_x.width(${width})

${name}_y = ADC(Pin(${pinY}))
${name}_y.atten(${atten})
${name}_y.width(${width})

${name}_sw = Pin(${pinSW}, Pin.IN, ${pullSW})

`;
};

Blockly.Python["ky023_read_x"] = function (block) {
  const name = block.getFieldValue("NAME");

  return [`${name}_x.read()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["ky023_read_y"] = function (block) {
  const name = block.getFieldValue("NAME");

  return [`${name}_y.read()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["ky023_read_sw"] = function (block) {
  const name = block.getFieldValue("NAME");

  return [`${name}_sw.value()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["pot_slider_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const pinA = block.getFieldValue("PIN_A");
  const pinB = block.getFieldValue("PIN_B");
  const atten = block.getFieldValue("ATTEN");
  const width = block.getFieldValue("WIDTH");
  Blockly.Python.definitions_["import_adc"] = "from machine import Pin, ADC";

  const code = `${name}A = ADC(Pin(${pinA}))
${name}A.atten(${atten})
${name}A.width(${width})
${name}B = ADC(Pin(${pinB}))
${name}B.atten(${atten})
${name}B.width(${width})
`;
  return code;
};

Blockly.Python["pot_slider_read_x"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}A.read()`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["pot_slider_read_y"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}B.read()`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["hybrid_sensor_init"] = function (block) {
  const apin = block.getFieldValue("APIN");
  const dpin = block.getFieldValue("DPIN");
  const atten = block.getFieldValue("ATTEN");
  const width = block.getFieldValue("WIDTH");
  const pull = block.getFieldValue("PULL");

  Blockly.Python.definitions_["import_adc_pin"] =
    "from machine import Pin, ADC";

  return `
adc${apin}=ADC(Pin(${apin}))
adc${apin}.atten(${atten})
adc${apin}.width(${width})
dig${dpin}=Pin(${dpin},Pin.IN, ${pull})
`;
};

Blockly.Python["hybrid_sensor_read_analog"] = function (block) {
  const apin = block.getFieldValue("APIN");
  return [`adc${apin}.read()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["hybrid_sensor_read_digital"] = function (block) {
  const dpin = block.getFieldValue("DPIN");
  return [`dig${dpin}.value()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["init_dc_motor"] = function (block) {
  const name = block.getFieldValue("NAME");
  const in1 = block.getFieldValue("IN1");
  const in2 = block.getFieldValue("IN2");
  const in3 = block.getFieldValue("IN3");
  const in4 = block.getFieldValue("IN4");

  Blockly.Python.definitions_["import_pin"] = "from machine import Pin";

  return `
${name}_in1 = Pin(${in1}, Pin.OUT)
${name}_in2 = Pin(${in2}, Pin.OUT)
${name}_in3 = Pin(${in3}, Pin.OUT)
${name}_in4 = Pin(${in4}, Pin.OUT)
`;
};

Blockly.Python["move_dc_motor1_on_off"] = function (block) {
  const name = block.getFieldValue("NAME");
  const motor = block.getFieldValue("motor");
  const v1 = block.getFieldValue("in1");
  const v2 = block.getFieldValue("in2");

  let p1, p2;

  if (motor == "A") {
    p1 = `${name}_in1`;
    p2 = `${name}_in2`;
  } else {
    p1 = `${name}_in3`;
    p2 = `${name}_in4`;
  }

  const s1 = v1 == "on" ? `${p1}.on()` : `${p1}.off()`;
  const s2 = v2 == "on" ? `${p2}.on()` : `${p2}.off()`;

  return `${s1}\n${s2}\n`;
};

Blockly.Python["move_dc_motor1"] = function (block) {
  const name = block.getFieldValue("NAME");
  const motor = block.getFieldValue("motor");
  const mover = block.getFieldValue("mover");

  let a, b;

  if (motor == "A") {
    a = `${name}_in1`;
    b = `${name}_in2`;
  } else {
    a = `${name}_in3`;
    b = `${name}_in4`;
  }

  if (mover == "Adelante") {
    return `${a}.on()\n${b}.off()\n`;
  }

  if (mover == "Atrás") {
    return `${a}.off()\n${b}.on()\n`;
  }

  return `${a}.off()\n${b}.off()\n`;
};

Blockly.Python["move_dc_motor2_on_off"] = function (block) {
  const name = block.getFieldValue("NAME");
  const v1 = block.getFieldValue("in1");
  const v2 = block.getFieldValue("in2");
  const v3 = block.getFieldValue("in3");
  const v4 = block.getFieldValue("in4");

  const s1 = v1 == "on" ? `${name}_in1.on()` : `${name}_in1.off()`;
  const s2 = v2 == "on" ? `${name}_in2.on()` : `${name}_in2.off()`;
  const s3 = v3 == "on" ? `${name}_in3.on()` : `${name}_in3.off()`;
  const s4 = v4 == "on" ? `${name}_in4.on()` : `${name}_in4.off()`;

  return `${s1}\n${s2}\n${s3}\n${s4}\n`;
};

Blockly.Python["move_dc_motor2"] = function (block) {
  const name = block.getFieldValue("NAME");
  const v1 = block.getFieldValue("motorA");
  const v2 = block.getFieldValue("motorB");

  let code = "";

  if (v1 == "Adelante") code += `${name}_in1.on()\n${name}_in2.off()\n`;
  if (v1 == "Atrás") code += `${name}_in1.off()\n${name}_in2.on()\n`;
  if (v1 == "Detener") code += `${name}_in1.off()\n${name}_in2.off()\n`;

  if (v2 == "Adelante") code += `${name}_in3.on()\n${name}_in4.off()\n`;
  if (v2 == "Atrás") code += `${name}_in3.off()\n${name}_in4.on()\n`;
  if (v2 == "Detener") code += `${name}_in3.off()\n${name}_in4.off()\n`;

  return code;
};

Blockly.Python["init2_dc_motor_pwm"] = function (block) {
  const name = block.getFieldValue("NAME");
  const in1 = block.getFieldValue("IN1");
  const in2 = block.getFieldValue("IN2");
  const in3 = block.getFieldValue("IN3");
  const in4 = block.getFieldValue("IN4");

  Blockly.Python.definitions_["import_pwm"] = "from machine import Pin, PWM";

  return `
${name}_pwmA = PWM(Pin(${in1}),freq=5000)
${name}_pwmB = PWM(Pin(${in2}),freq=5000)
${name}_pwmC = PWM(Pin(${in3}),freq=5000)
${name}_pwmD = PWM(Pin(${in4}),freq=5000)
`;
};

Blockly.Python["move_dc_motor_pwm1"] = function (block) {
  const name = block.getFieldValue("NAME");
  const motor = block.getFieldValue("motor");

  const speedA =
    Blockly.Python.valueToCode(block, "VALUEA", Blockly.Python.ORDER_ATOMIC) ||
    0;

  const speedB =
    Blockly.Python.valueToCode(block, "VALUEB", Blockly.Python.ORDER_ATOMIC) ||
    0;

  let pwm1, pwm2;

  if (motor == "A") {
    pwm1 = `${name}_pwmA`;
    pwm2 = `${name}_pwmB`;
  } else {
    pwm1 = `${name}_pwmC`;
    pwm2 = `${name}_pwmD`;
  }

  return `
${pwm1}.duty(${speedA})
${pwm2}.duty(${speedB})
`;
};

Blockly.Python["move_dc_motor_pwm2"] = function (block) {
  const name = block.getFieldValue("NAME");

  const a =
    Blockly.Python.valueToCode(block, "VALUEA", Blockly.Python.ORDER_ATOMIC) ||
    0;
  const b =
    Blockly.Python.valueToCode(block, "VALUEB", Blockly.Python.ORDER_ATOMIC) ||
    0;
  const c =
    Blockly.Python.valueToCode(block, "VALUEC", Blockly.Python.ORDER_ATOMIC) ||
    0;
  const d =
    Blockly.Python.valueToCode(block, "VALUED", Blockly.Python.ORDER_ATOMIC) ||
    0;

  return `
${name}_pwmA.duty(${a})
${name}_pwmB.duty(${b})
${name}_pwmC.duty(${c})
${name}_pwmD.duty(${d})
`;
};

Blockly.Python["init3_dc_motor_pwm"] = function (block) {
  const name = block.getFieldValue("NAME");
  const ena = block.getFieldValue("ENA");
  const enb = block.getFieldValue("ENB");
  const in1 = block.getFieldValue("IN1");
  const in2 = block.getFieldValue("IN2");
  const in3 = block.getFieldValue("IN3");
  const in4 = block.getFieldValue("IN4");

  Blockly.Python.definitions_["import_pwm"] = "from machine import Pin, PWM";

  return `
${name}_pwmA = PWM(Pin(${ena}),freq=5000)
${name}_pwmB = PWM(Pin(${enb}),freq=5000)

${name}_in1 = Pin(${in1},Pin.OUT)
${name}_in2 = Pin(${in2},Pin.OUT)
${name}_in3 = Pin(${in3},Pin.OUT)
${name}_in4 = Pin(${in4},Pin.OUT)
`;
};

Blockly.Python["move_dc_motor1_pwm"] = function (block) {
  const name = block.getFieldValue("NAME");

  const motor = block.getFieldValue("motor");
  const speed =
    Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_ATOMIC) ||
    0;

  const mover = block.getFieldValue("mover");

  let a, b, pwm;

  if (motor == "A") {
    a = `${name}_in1`;
    b = `${name}_in2`;
    pwm = `${name}_pwmA`;
  } else {
    a = `${name}_in3`;
    b = `${name}_in4`;
    pwm = `${name}_pwmB`;
  }

  let dir = "";

  if (mover == "Adelante") dir = `${a}.on()\n${b}.off()`;
  if (mover == "Atrás") dir = `${a}.off()\n${b}.on()`;
  if (mover == "Detener") dir = `${a}.off()\n${b}.off()`;

  return `
${pwm}.duty(${speed})
${dir}
`;
};

Blockly.Python["move_dc_motor2_pwm"] = function (block) {
  const name = block.getFieldValue("NAME");

  const speedA =
    Blockly.Python.valueToCode(block, "VALUEA", Blockly.Python.ORDER_ATOMIC) ||
    0;

  const speedB =
    Blockly.Python.valueToCode(block, "VALUEB", Blockly.Python.ORDER_ATOMIC) ||
    0;

  const v1 = block.getFieldValue("motorA");
  const v2 = block.getFieldValue("motorB");

  let code = "";

  if (v1 == "Adelante") code += `${name}_in1.on()\n${name}_in2.off()\n`;
  if (v1 == "Atrás") code += `${name}_in1.off()\n${name}_in2.on()\n`;
  if (v1 == "Detener") code += `${name}_in1.off()\n${name}_in2.off()\n`;

  if (v2 == "Adelante") code += `${name}_in3.on()\n${name}_in4.off()\n`;
  if (v2 == "Atrás") code += `${name}_in3.off()\n${name}_in4.on()\n`;
  if (v2 == "Detener") code += `${name}_in3.off()\n${name}_in4.off()\n`;

  return `
${name}_pwmA.duty(${speedA})
${name}_pwmB.duty(${speedB})
${code}
`;
};

Blockly.Python["init_servo"] = function (block) {
  const pin = block.getFieldValue("PIN");

  Blockly.Python.definitions_["import_pwm_servo"] =
    "from machine import Pin, PWM";

  Blockly.Python.definitions_["servo_map_func"] =
    `def map(x, in_min=0, in_max=180, out_min=21, out_max=132):
    return int((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)
`;

  return `servo_${pin} = PWM(Pin(${pin}), freq=50)\n`;
};

Blockly.Python["move_servo"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const angle = block.getFieldValue("ANGLE");
  return `servo_${pin}.duty(map(${angle}))\n`;
};

Blockly.Python["stepper_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const p1 = block.getFieldValue("IN1");
  const p2 = block.getFieldValue("IN2");
  const p3 = block.getFieldValue("IN3");
  const p4 = block.getFieldValue("IN4");

  Blockly.Python.definitions_["import_stepper"] =
    "import time\nfrom stepper import HalfStepMotor\n";

  const code = `${name} = HalfStepMotor.frompins(${p1},${p2},${p3},${p4})
`;

  return code;
};

Blockly.Python["stepper_step"] = function (block) {
  const name = block.getFieldValue("NAME");

  const steps =
    Blockly.Python.valueToCode(block, "STEPS", Blockly.Python.ORDER_NONE) || 0;

  const code = `${name}.step(${steps})\n`;

  return code;
};

Blockly.Python["stepper_degrees"] = function (block) {
  const name = block.getFieldValue("NAME");

  const deg = block.getFieldValue("ANGLE");

  const code = `${name}.step_degrees(${deg})\n`;

  return code;
};

Blockly.Python["stepper_angle"] = function (block) {
  const name = block.getFieldValue("NAME");
  const angle = block.getFieldValue("ANGLE");
  const code = `${name}.step_until_angle(${angle})\n`;

  return code;
};

Blockly.Python["init_infrarrojo"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const mode = block.getFieldValue("MODE");
  Blockly.Python.definitions_["import_machine"] = "from machine import Pin";

  const code = `ir${pin} = Pin(${pin}, Pin.IN, ${mode})\n`;
  return code;
};

Blockly.Python["read_infrarrojo"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return [`ir${pin}.value()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["init_ultrasonic_hcsr04"] = function (block) {
  const name = block.getFieldValue("NAME");
  const trig = block.getFieldValue("TRIG");
  const echo = block.getFieldValue("ECHO");

  Blockly.Python.definitions_["import_hcsr04"] = "from hcsr04 import HCSR04";

  const code = `${name} = HCSR04(trigger_pin=${trig}, echo_pin=${echo})\n`;
  return code;
};

Blockly.Python["read_ultrasonic_hcsr04"] = function (block) {
  const name = block.getFieldValue("NAME");
  const unit = block.getFieldValue("UNIT");

  let code;
  if (unit === "mm") {
    code = `${name}.distance_mm()`;
  } else {
    code = `${name}.distance_cm()`;
  }

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["init_ir_ky022"] = function (block) {
  const pin = block.getFieldValue("PIN");

  Blockly.Python.definitions_["import_machine"] = "from machine import Pin";

  Blockly.Python.definitions_["import_ir_rx"] =
    "from ir_rx import NEC_8, NEC_16";

  const code = `ir${pin} = NEC_8(Pin(${pin}, Pin.IN, Pin.PULL_UP), ir_callback)\n`;

  return code;
};

Blockly.Python["ir_ky022_callback_code"] = function (block) {
  let statements = Blockly.Python.statementToCode(block, "CODE");

  Blockly.Python.definitions_["ir_callback"] =
    `def ir_callback(data, addr, ctrl):
` + statements;
  return "";
};

Blockly.Python["init_hc06"] = function (block) {
  const id = block.getFieldValue("UART");
  const tx = block.getFieldValue("TX");
  const rx = block.getFieldValue("RX");
  const baud = block.getFieldValue("BAUD");

  Blockly.Python.definitions_["import_uart"] = "from machine import Pin, UART";

  return `hc06 = UART(${id}, tx=${tx}, rx=${rx}, baudrate=${baud})\n`;
};

Blockly.Python["hc06_send"] = function (block) {
  const text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC) ||
    "''";
  return `hc06.write(${text})\n`;
};

Blockly.Python["hc06_read"] = function (block) {
  return [`hc06.read()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["hc06_any"] = function (block) {
  return [`hc06.any()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["uart_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const id = block.getFieldValue("UART");
  const tx = block.getFieldValue("TX");
  const rx = block.getFieldValue("RX");
  const baud = block.getFieldValue("BAUD");

  Blockly.Python.definitions_["import_uart"] = "from machine import Pin, UART";

  return `${name} = UART(${id}, tx=${tx}, rx=${rx}, baudrate=${baud})\n`;
};

Blockly.Python["uart_write"] = function (block) {
  const name = block.getFieldValue("NAME");
  const data =
    Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_ATOMIC) ||
    "b''";
  return `${name}.write(${data})\n`;
};

Blockly.Python["uart_read"] = function (block) {
  const name = block.getFieldValue("NAME");
  const nbytes = block.getFieldValue("NBYTES");
  const code = `${name}.read(${nbytes})`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["i2c_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const id = block.getFieldValue("ID");
  const scl = block.getFieldValue("SCL");
  const sda = block.getFieldValue("SDA");
  const freq = block.getFieldValue("FREQ");

  Blockly.Python.definitions_["import_i2c"] = "from machine import Pin, I2C";

  return `${name} = I2C(id=${id}, scl=Pin(${scl}), sda=Pin(${sda}), freq=${freq})\n`;
};

Blockly.Python["i2c_scan"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}.scan()`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["i2c_write"] = function (block) {
  const name = block.getFieldValue("NAME");
  const addr = block.getFieldValue("ADDR");

  const data =
    Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_ATOMIC) ||
    "b''";

  return `${name}.writeto(${addr}, ${data})\n`;
};

Blockly.Python["i2c_read"] = function (block) {
  const name = block.getFieldValue("NAME");
  const addr = block.getFieldValue("ADDR");
  const nbytes = block.getFieldValue("NBYTES");

  const code = `${name}.readfrom(${addr}, ${nbytes})`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["spi_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const sck = block.getFieldValue("SCK");
  const mosi = block.getFieldValue("MOSI");
  const miso = block.getFieldValue("MISO");
  const baud = block.getFieldValue("BAUD");

  Blockly.Python.definitions_["import_spi"] = "from machine import Pin, SPI";

  return `${name}=SPI(${id},baudrate=${baud},sck=Pin(${sck}),mosi=Pin(${mosi}),miso=Pin(${miso}))\n`;
};

Blockly.Python["spi_write"] = function (block) {
  const name = block.getFieldValue("NAME");
  const data =
    Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_ATOMIC) ||
    "b''";
  return `${name}.write(${data})\n`;
};

Blockly.Python["spi_read"] = function (block) {
  const name = block.getFieldValue("NAME");
  const n = block.getFieldValue("N");
  return [`${name}.read(${n})`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["i2s_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const id = block.getFieldValue("ID");
  const bclk = block.getFieldValue("BCLK");
  const ws = block.getFieldValue("WS");
  const sd = block.getFieldValue("SD");
  const rate = block.getFieldValue("RATE");

  Blockly.Python.definitions_["import_i2s"] = "from machine import Pin, I2S";

  return `${name}=I2S(${id},
sck=Pin(${bclk}),
ws=Pin(${ws}),
sd=Pin(${sd}),
mode=I2S.TX,
bits=16,
format=I2S.MONO,
rate=${rate},
ibuf=20000)\n`;
};

Blockly.Python["i2s_write"] = function (block) {
  const name = block.getFieldValue("NAME");
  const buf =
    Blockly.Python.valueToCode(block, "BUF", Blockly.Python.ORDER_ATOMIC) ||
    "b''";
  return `${name}.write(${buf})\n`;
};

Blockly.Python["onewire_init"] = function (block) {
  const pin = block.getFieldValue("PIN");

  Blockly.Python.definitions_["import_onewire"] =
    "from machine import Pin\nimport onewire";

  return `ow${pin} = onewire.OneWire(Pin(${pin}))\n`;
};

Blockly.Python["onewire_scan"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return [`ow${pin}.scan()`, Blockly.Python.ORDER_NONE];
};

Blockly.Python["onewire_reset"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return `ow${pin}.reset()\n`;
};

Blockly.Python["onewire_readbyte"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return [`ow${pin}.readbyte()`, Blockly.Python.ORDER_NONE];
};

Blockly.Python["onewire_writebyte"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const value =
    Blockly.Python.valueToCode(block, "BYTE", Blockly.Python.ORDER_ATOMIC) || 0;

  return `ow${pin}.writebyte(${value})\n`;
};

Blockly.Python["onewire_write"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const data =
    Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_ATOMIC) ||
    "b''";

  return `ow${pin}.write(${data})\n`;
};

Blockly.Python["onewire_select_rom"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const rom =
    Blockly.Python.valueToCode(block, "ROM", Blockly.Python.ORDER_ATOMIC) ||
    "b''";

  return `ow${pin}.select_rom(${rom})\n`;
};

Blockly.Python["can_init"] = function (block) {
  Blockly.Python.definitions_["import_can"] = "from machine import CAN";

  return "can=CAN(0)\n";
};

Blockly.Python["can_send"] = function (block) {
  const id = block.getFieldValue("ID");
  const data =
    Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_ATOMIC) ||
    "b''";

  return `can.send(${data}, ${id})\n`;
};

Blockly.Python["wifi_init"] = function (block) {
  const variable = block.getFieldValue("VAR");
  const mode = block.getFieldValue("MODE");

  Blockly.Python.definitions_["wifi_imports"] = "import network";

  let code = "";

  if (mode === "GENERIC") {
    code = `${variable} = network.WLAN()\n` + `${variable}.active(True)\n`;
  } else {
    code =
      `${variable} = network.WLAN(network.${mode})\n` +
      `${variable}.active(True)\n`;
  }
  return code;
};

Blockly.Python["wifi_connect"] = function (block) {
  const variable = block.getFieldValue("VAR");
  const ssid = block.getFieldValue("SSID");
  const pass = block.getFieldValue("PASS");

  Blockly.Python.definitions_["wifi_imports"] =
    "import network\n" + "import time";
  return (
    `${variable} = network.WLAN(network.STA_IF)\n` +
    `${variable}.active(True)\n` +
    `${variable}.connect("${ssid}", "${pass}")\n` +
    `while not ${variable}.isconnected():\n` +
    "    time.sleep(0.5)\n"
  );
};

Blockly.Python["wifi_ap"] = function (block) {
  const ssid = block.getFieldValue("AP_SSID");
  const pass = block.getFieldValue("AP_PASS");
  const ip = block.getFieldValue("AP_IP");
  const subnet = block.getFieldValue("AP_SUBNET");

  Blockly.Python.definitions_["wifi_imports"] = "import network\nimport time";

  let authConfig = "";

  if (pass && pass.length >= 8) {
    authConfig =
      "  ap.config(essid=SERVER_SSID, password=PASSWORD, authmode=network.AUTH_WPA2_PSK)\n";
  } else {
    authConfig = "  ap.config(essid=SERVER_SSID, authmode=network.AUTH_OPEN)\n";
  }

  return (
    "# Configuración Punto de Acceso\n" +
    `SERVER_SSID = "${ssid}"\n` +
    `PASSWORD = "${pass}"\n` +
    `SERVER_IP = "${ip}"\n` +
    `SERVER_SUBNET = "${subnet}"\n\n` +
    "def wifi_start_access_point():\n" +
    "  ap = network.WLAN(network.AP_IF)\n" +
    "  ap.active(True)\n" +
    "  ap.ifconfig((SERVER_IP, SERVER_SUBNET, SERVER_IP, SERVER_IP))\n" +
    authConfig +
    '  print("AP iniciado:", ap.ifconfig())\n\n'
  );
};

Blockly.Python["wifi_start_ap"] = function () {
  return "wifi_start_access_point()\n";
};

Blockly.Python["wifi_scan"] = function (block) {
  const variable = block.getFieldValue("VAR");
  return [`${variable}.scan()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["wifi_isconnected"] = function (block) {
  const variable = block.getFieldValue("VAR");
  return [`${variable}.isconnected()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["wifi_current_ip"] = function (block) {
  const variable = block.getFieldValue("VAR");
  return [`${variable}.ifconfig()[0]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["wifi_disconnect"] = function (block) {
  const variable = block.getFieldValue("VAR");
  return `${variable}.disconnect()\n`;
};

Blockly.Python["wifi_define_connect"] = function (block) {
  const ssid = block.getFieldValue("SSID");
  const pass = block.getFieldValue("PASS");

  Blockly.Python.definitions_["wifi_do_connect"] =
    "def do_connect():\n" +
    "    import network\n" +
    "    wlan = network.WLAN(network.STA_IF)\n" +
    "    wlan.active(True)\n" +
    "    if not wlan.isconnected():\n" +
    "        print('connecting to network...')\n" +
    `        wlan.connect('${ssid}', '${pass}')\n` +
    "        while not wlan.isconnected():\n" +
    "            pass\n" +
    "    print('network config:', wlan.ifconfig())\n";

  return "";
};

Blockly.Python["wifi_call_connect"] = function () {
  return "do_connect()\n";
};

Blockly.Python["socket_create"] = function (block) {
  const variable = block.getFieldValue("VAR");
  const family = block.getFieldValue("FAMILY");
  const type = block.getFieldValue("TYPE");
  const proto = block.getFieldValue("PROTO");

  Blockly.Python.definitions_["socket_import"] = "import socket";

  return `${variable} = socket.socket(socket.${family}, socket.${type}, socket.${proto})\n`;
};

Blockly.Python["socket_connect"] = function (block) {
  const variable = block.getFieldValue("VAR");
  const ip = block.getFieldValue("IP");
  const port = block.getFieldValue("PORT");

  return `${variable}.connect(("${ip}", ${port}))\n`;
};

Blockly.Python["socket_send"] = function (block) {
  const variable = block.getFieldValue("VAR");
  const data =
    Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) ||
    '""';

  return `${variable}.send(${data})\n`;
};

Blockly.Python["socket_sendall"] = function (block) {
  const variable = block.getFieldValue("VAR");
  const data =
    Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) ||
    '""';

  return `${variable}.sendall(${data})\n`;
};

Blockly.Python["socket_receive"] = function (block) {
  const variable = block.getFieldValue("VAR");
  const size = block.getFieldValue("SIZE");

  return [
    `${variable}.recv(${size}).decode()`,
    Blockly.Python.ORDER_FUNCTION_CALL,
  ];
};

Blockly.Python["socket_close"] = function (block) {
  const variable = block.getFieldValue("VAR");

  return `${variable}.close()\n`;
};

Blockly.Python["socket_bind"] = function (block) {
  const variable = block.getFieldValue("VAR");
  const ip = block.getFieldValue("IP");
  const port = block.getFieldValue("PORT");

  return `${variable}.bind(("${ip}", ${port}))\n`;
};

Blockly.Python["socket_listen"] = function (block) {
  const variable = block.getFieldValue("VAR");
  const backlog = block.getFieldValue("BACKLOG");

  return `${variable}.listen(${backlog})\n`;
};

Blockly.Python["socket_accept"] = function (block) {
  const variable = block.getFieldValue("VAR");
  const conn = Blockly.Python.nameDB_.getName(
    block.getFieldValue("CONN"),
    Blockly.VARIABLE_CATEGORY_NAME,
  );

  const addr = Blockly.Python.nameDB_.getName(
    block.getFieldValue("ADDR"),
    Blockly.VARIABLE_CATEGORY_NAME,
  );

  return `${conn}, ${addr} = ${variable}.accept()\n`;
};

Blockly.Python["init_espnow_simple"] = function (block) {
  Blockly.Python.definitions_["espnow_imports"] = "import espnow";

  return (
    "# Configuración ESPNow\n" +
    "e = espnow.ESPNow()\n" +
    "if not e.active():\n" +
    "    e.active(True)\n"
  );
};

Blockly.Python["peer"] = function (block) {
  const txt = block.getFieldValue("PEER_BYTES");
  return [txt, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["espnow_add_peer"] = function (block) {
  const peer =
    Blockly.Python.valueToCode(block, "PEER", Blockly.Python.ORDER_ATOMIC) ||
    "b'\\xff\\xff\\xff\\xff\\xff\\xff'";
  return `e.add_peer(${peer})\n`;
};

Blockly.Python["espnow_send_peer"] = function (block) {
  const peer =
    Blockly.Python.valueToCode(block, "PEER", Blockly.Python.ORDER_ATOMIC) ||
    "b'\\xff\\xff\\xff\\xff\\xff\\xff'";
  const text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC) ||
    "''";
  return `e.send(${peer}, ${text})\n`;
};

Blockly.Python["espnow_recv"] = function (block) {
  const hostVar = Blockly.Python.nameDB_.getName(
    block.getFieldValue("HOST"),
    "VARIABLE",
  );
  const msgVar = Blockly.Python.nameDB_.getName(
    block.getFieldValue("MSG"),
    "VARIABLE",
  );
  return `${hostVar}, ${msgVar} = e.recv()\n`;
};

Blockly.Python["ble_init_uart"] = function (block) {
  Blockly.Python.definitions_["ble_imports"] =
    "from BLE import BLEUART\nimport bluetooth";

  return "ble = bluetooth.BLE()\n";
};

Blockly.Python["ble_set_name"] = function (block) {
  const name = block.getFieldValue("BLE_NAME");
  return `uart = BLEUART(ble, "${name}")\n`;
};

Blockly.Python["ble_read"] = function (block) {
  return ["uart.read()", Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["ble_on_receive"] = function (block) {
  const datos_recibidos = block.getFieldValue("FUNCION");
  const rxVar = Blockly.Python.nameDB_.getName(
    block.getFieldValue("RX"),
    "VARIABLE",
  );

  return `uart.irq(handler=${datos_recibidos})\n`;
};

Blockly.Python["ble_write"] = function (block) {
  const value = Blockly.Python.valueToCode(
    block,
    "DATA",
    Blockly.Python.ORDER_NONE
  ) || "''";

  return `uart.write(${value})\n`;
};

Blockly.Python["portal_init"] = function () {
  Blockly.Python.definitions_["portal_imports"] =
    "import uasyncio as asyncio\n" + "import gc\n" + "import socket";
  return "";
};

Blockly.Python["DNSQuery"] = function () {
  Blockly.Python.definitions_["dnsQuery"] =
    "class DNSQuery:\n" +
    "  def __init__(self, data):\n" +
    "    self.data = data\n\n" +
    "  def response(self, ip):\n" +
    '    packet = self.data[:2] + b"\\x81\\x80"\n' +
    "    packet += self.data[4:6] + self.data[4:6]\n" +
    '    packet += b"\\x00\\x00\\x00\\x00"\n' +
    "    packet += self.data[12:]\n" +
    '    packet += b"\\xC0\\x0C"\n' +
    '    packet += b"\\x00\\x01\\x00\\x01\\x00\\x00\\x00\\x3C\\x00\\x04"\n' +
    '    packet += bytes(map(int, ip.split(".")))\n' +
    "    return packet\n\n";
  return "";
};

Blockly.Python["portal_dns_server"] = function () {
  Blockly.Python.definitions_["portal_dns"] =
    "async def run_dns_server():\n" +
    "  udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\n" +
    "  udp.setblocking(False)\n" +
    '  udp.bind(("0.0.0.0", 53))\n' +
    "  while True:\n" +
    "    try:\n" +
    "      data, addr = udp.recvfrom(1024)\n" +
    "      q = DNSQuery(data)\n" +
    "      udp.sendto(q.response(SERVER_IP), addr)\n" +
    "    except:\n" +
    "      await asyncio.sleep_ms(10)\n";
  return "";
};
Blockly.Python["portal_http_server"] = function (block) {
  const index = block.getFieldValue("INDEX");
  const tipo = block.getFieldValue("TIPO");
  const valor = block.getFieldValue("VALOR");

  Blockly.Python.definitions_["portal_http"] =
    "PAGE = '" +
    index +
    "'\n" +
    "async def handle_http(reader, writer):\n" +
    "  gc.collect()\n" +
    "  line = await reader.readline()\n" +
    "  if not line:\n" +
    "    return\n" +
    "  try:\n" +
    "    method, path, proto = line.decode().split()\n" +
    "  except:\n" +
    "    return\n" +
    "  while True:\n" +
    "    hdr = await reader.readline()\n" +
    '    if hdr == b"\\r\\n":\n' +
    "      break\n\n" +
    "  try:\n" +
    "    page = PAGE\n" +
    '    if "?" in path:\n' +
    '      query = path.split("?",1)[1]\n' +
    '      for p in query.split("&"):\n' +
    '        if "=" in p:\n' +
    '          tipo, valor = p.split("=")\n' +
    "          #print(tipo, valor)\n" +
    "          comandos(tipo, valor)\n" +
    '    if not page.endswith(".html"):\n' +
    '      page += ".html"\n' +
    "    with open(page) as f:\n" +
    "      html = f.read()\n" +
    '    await writer.awrite("HTTP/1.0 200 OK\\r\\n")\n' +
    '    await writer.awrite("Content-Type: text/html; charset=utf-8\\r\\n\\r\\n")\n' +
    "    await writer.awrite(html)\n" +
    "  except:\n" +
    '    await writer.awrite("HTTP/1.0 500 ERROR\\r\\n\\r\\nError al abrir pagina")\n' +
    "  await writer.aclose()\n\n";

  return "";
};

Blockly.Python["portal_main"] = function () {
  Blockly.Python.definitions_["portal_main"] =
    "async def portal_main():\n" +
    "  wifi_start_access_point()\n" +
    "  asyncio.create_task(run_dns_server())\n" +
    '  await asyncio.start_server(handle_http, "0.0.0.0", 80)\n' +
    "  while True:\n" +
    "    await asyncio.sleep(1)\n";

  return "asyncio.run(portal_main())";
};

Blockly.Python["seg7_init"] = function (block) {
  Blockly.Python.definitions_["seg7_import"] = `
from machine import Pin

class SEG7:

  digits={
    0:(1,1,1,1,1,1,0),
    1:(0,1,1,0,0,0,0),
    2:(1,1,0,1,1,0,1),
    3:(1,1,1,1,0,0,1),
    4:(0,1,1,0,0,1,1),
    5:(1,0,1,1,0,1,1),
    6:(1,0,1,1,1,1,1),
    7:(1,1,1,0,0,0,0),
    8:(1,1,1,1,1,1,1),
    9:(1,1,1,1,0,1,1)
  }

  def __init__(self,a,b,c,d,e,f,g,invert=False):

    self.pins=[
      Pin(a,Pin.OUT),
      Pin(b,Pin.OUT),
      Pin(c,Pin.OUT),
      Pin(d,Pin.OUT),
      Pin(e,Pin.OUT),
      Pin(f,Pin.OUT),
      Pin(g,Pin.OUT)
    ]

    self.invert=invert

  def clear(self):

    for p in self.pins:
      p.value(0 if not self.invert else 1)

  def show(self,n):

    seg=self.digits.get(n,(0,0,0,0,0,0,0))

    for p,v in zip(self.pins,seg):

      if self.invert:
        p.value(1-v)
      else:
        p.value(v)
`;

  const name = block.getFieldValue("NAME");

  const type = block.getFieldValue("TYPE");

  const a = block.getFieldValue("A");
  const b = block.getFieldValue("B");
  const c = block.getFieldValue("C");
  const d = block.getFieldValue("D");
  const e = block.getFieldValue("E");
  const f = block.getFieldValue("F");
  const g = block.getFieldValue("G");

  const invert = type === "CA" ? "True" : "False";

  return `${name} = SEG7(${a},${b},${c},${d},${e},${f},${g},${invert})\n`;
};

Blockly.Python["seg7_clear"] = function (block) {
  const name = block.getFieldValue("NAME");

  return `${name}.clear()\n`;
};

Blockly.Python["seg7_number"] = function (block) {
  const name = block.getFieldValue("NAME");
  const num = block.getFieldValue("NUM");

  return `${name}.show(${num})\n`;
};

Blockly.Python["lcd_init"] = function (block) {
  Blockly.Python.definitions_["lcd_import"] =
    "from machine import Pin\nfrom lcd import CharLCD";

  const name = block.getFieldValue("NAME");

  const rs = block.getFieldValue("RS");
  const en = block.getFieldValue("EN");
  const d4 = block.getFieldValue("D4");
  const d5 = block.getFieldValue("D5");
  const d6 = block.getFieldValue("D6");
  const d7 = block.getFieldValue("D7");

  return `${name} = CharLCD(rs=${rs},en=${en},d4=${d4},d5=${d5},d6=${d6},d7= ${d7}, cols=16, rows=2)\n`;
};

Blockly.Python["lcd_print"] = function (block) {
  const name = block.getFieldValue("NAME");

  const text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC) ||
    "''";

  return `${name}.message(${text})\n`;
};

Blockly.Python["lcd_print_align"] = function (block) {
  const name = block.getFieldValue("NAME");

  const text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC) ||
    "''";

  const align = block.getFieldValue("ALIGN");

  return `${name}.message(${text},${align})\n`;
};

Blockly.Python["lcd_clear"] = function (block) {
  const name = block.getFieldValue("NAME");

  return `${name}.clear()\n`;
};

Blockly.Python["lcd_cursor"] = function (block) {
  const name = block.getFieldValue("NAME");

  const col =
    Blockly.Python.valueToCode(block, "COL", Blockly.Python.ORDER_ATOMIC) || 0;

  const row =
    Blockly.Python.valueToCode(block, "ROW", Blockly.Python.ORDER_ATOMIC) || 0;

  return `${name}.set_cursor(${col},${row})\n`;
};

Blockly.Python["lcd_home"] = function (block) {
  const name = block.getFieldValue("NAME");

  return `${name}.home()\n`;
};

Blockly.Python["lcd_move_left"] = function (block) {
  const name = block.getFieldValue("NAME");

  return `${name}.move_left()\n`;
};

Blockly.Python["lcd_move_right"] = function (block) {
  const name = block.getFieldValue("NAME");

  return `${name}.move_right()\n`;
};

Blockly.Python["lcd_enable"] = function (block) {
  const name = block.getFieldValue("NAME");
  const state = block.getFieldValue("STATE");

  return `${name}.enable(${state})\n`;
};

Blockly.Python["lcd_blink"] = function (block) {
  const name = block.getFieldValue("NAME");
  const state = block.getFieldValue("STATE");

  return `${name}.show_blink(${state})\n`;
};

Blockly.Python["lcd_underline"] = function (block) {
  const name = block.getFieldValue("NAME");
  const state = block.getFieldValue("STATE");

  return `${name}.show_underline(${state})\n`;
};

Blockly.Python["lcd_i2c_init"] = function (block) {
  Blockly.Python.definitions_["lcd_i2c_import"] = `from machine import Pin, I2C
from i2c_lcd import I2cLcd`;
  const name = block.getFieldValue("NAME");
  const id = block.getFieldValue("ID");
  const sda = block.getFieldValue("SDA");
  const scl = block.getFieldValue("SCL");
  const addr = block.getFieldValue("ADDR");
  const num_lines = block.getFieldValue("num_lines");
  const num_columns = block.getFieldValue("num_columns");

  return `
${name} = I2cLcd(id=${id},sda=${sda},scl=${scl}, i2c_addr=${addr}, num_lines=${num_lines}, num_columns=${num_columns})
`;
};

Blockly.Python["lcd_i2c_print"] = function (block) {
  const name = block.getFieldValue("NAME");
  const text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC) ||
    "''";
  return `${name}.putstr(${text})\n`;
};

Blockly.Python["lcd_i2c_clear"] = function (block) {
  const name = block.getFieldValue("NAME");
  return `${name}.clear()\n`;
};

Blockly.Python["lcd_i2c_cursor"] = function (block) {
  const name = block.getFieldValue("NAME");
  const col =
    Blockly.Python.valueToCode(block, "COL", Blockly.Python.ORDER_ATOMIC) || 0;
  const row =
    Blockly.Python.valueToCode(block, "ROW", Blockly.Python.ORDER_ATOMIC) || 0;
  return `${name}.move_to(${col},${row})\n`;
};

Blockly.Python["lcd_i2c_display"] = function (block) {
  const name = block.getFieldValue("NAME");
  const state = block.getFieldValue("STATE");
  if (state == "on") {
    return `${name}.display_on()\n`;
  } else {
    return `${name}.display_off()\n`;
  }
};

Blockly.Python["lcd_i2c_blink"] = function (block) {
  const name = block.getFieldValue("NAME");
  const state = block.getFieldValue("STATE");
  if (state == "on") {
    return `${name}.blink_cursor_on()\n`;
  } else {
    return `${name}.blink_cursor_off()\n`;
  }
};

Blockly.Python["lcd_i2c_cursor_show"] = function (block) {
  const name = block.getFieldValue("NAME");
  const state = block.getFieldValue("STATE");
  if (state == "show") {
    return `lcd${name}.show_cursor()\n`;
  } else {
    return `lcd${name}.hide_cursor()\n`;
  }
};

Blockly.Python["oled_init"] = function (block) {
  Blockly.Python.definitions_["oled_import"] = `from oled import OLED`;

  const name = block.getFieldValue("NAME");
  const id = block.getFieldValue("ID");
  const sda = block.getFieldValue("SDA");
  const scl = block.getFieldValue("SCL");

  return `${name} = OLED(id=${id}, sda=${sda}, scl=${scl})\n`;
};

Blockly.Python["oled_clear"] = function (block) {
  const name = block.getFieldValue("NAME");
  return `${name}.clear()\n`;
};

Blockly.Python["oled_text"] = function (block) {
  const name = block.getFieldValue("NAME");

  const text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) ||
    "''";
  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;

  return `${name}.text(${text}, ${x}, ${y}, 1)\n`;
};

Blockly.Python["oled_text20"] = function (block) {
  const name = block.getFieldValue("NAME");

  const text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) ||
    "''";
  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;

  return `${name}.text20(${text}, ${x}, ${y})\n`;
};

Blockly.Python["oled_pixel"] = function (block) {
  const name = block.getFieldValue("NAME");

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const s = block.getFieldValue("STATE");

  return `${name}.set_pixel(${x}, ${y}, ${s})\n`;
};

Blockly.Python["oled_line"] = function (block) {
  const name = block.getFieldValue("NAME");

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const x1 =
    Blockly.Python.valueToCode(block, "X1", Blockly.Python.ORDER_NONE) || 0;
  const y1 =
    Blockly.Python.valueToCode(block, "Y1", Blockly.Python.ORDER_NONE) || 0;

  return `${name}.line(${x}, ${y}, ${x1}, ${y1}, 1)\n`;
};

Blockly.Python["oled_rect"] = function (block) {
  const name = block.getFieldValue("NAME");

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const w =
    Blockly.Python.valueToCode(block, "W", Blockly.Python.ORDER_NONE) || 0;
  const h =
    Blockly.Python.valueToCode(block, "H", Blockly.Python.ORDER_NONE) || 0;

  return `${name}.rect(${x}, ${y}, ${w}, ${h}, 1)\n`;
};

Blockly.Python["oled_fill_rect"] = function (block) {
  const name = block.getFieldValue("NAME");

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const w =
    Blockly.Python.valueToCode(block, "W", Blockly.Python.ORDER_NONE) || 0;
  const h =
    Blockly.Python.valueToCode(block, "H", Blockly.Python.ORDER_NONE) || 0;

  return `${name}.fill_rect(${x}, ${y}, ${w}, ${h}, 1)\n`;
};

Blockly.Python["oled_circle"] = function (block) {
  const name = block.getFieldValue("NAME");

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const r =
    Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || 0;

  return `${name}.circle(${x}, ${y}, ${r}, 1)\n`;
};

Blockly.Python["oled_scroll"] = function (block) {
  const name = block.getFieldValue("NAME");

  const dx =
    Blockly.Python.valueToCode(block, "DX", Blockly.Python.ORDER_NONE) || 0;
  const dy =
    Blockly.Python.valueToCode(block, "DY", Blockly.Python.ORDER_NONE) || 0;

  return `${name}.scroll(${dx}, ${dy})\n`;
};

Blockly.Python["oled_contrast"] = function (block) {
  const name = block.getFieldValue("NAME");

  const value =
    Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) ||
    255;

  return `${name}.contrast(${value})\n`;
};

Blockly.Python["oled_poly"] = function (block) {
  const name = block.getFieldValue("NAME");

  const x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE);
  const y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE);

  const vertices = Blockly.Python.valueToCode(
    block,
    "POINTS",
    Blockly.Python.ORDER_NONE,
  );

  const color = block.getFieldValue("COLOR");
  const fill = block.getFieldValue("FILL");

  return `${name}.poly(${vertices}, ${x}, ${y}, ${color}, ${fill})\n`;
};

Blockly.Python["oled_icon_value"] = function (block) {
  const icon = block.getFieldValue("ICON");

  return [icon, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["oled_icon"] = function (block) {
  Blockly.Python.definitions_["icons_px_import"] =
    "from icons_px import get_ch";

  const name = block.getFieldValue("NAME");

  const icon =
    Blockly.Python.valueToCode(block, "ICON", Blockly.Python.ORDER_NONE) || 0;

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;

  const scale = block.getFieldValue("SIZE");

  return `${name}.icon2(${icon}, ${x}, ${y}, ${scale})\n`;
};

Blockly.Python["matrix8_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const din = block.getFieldValue("DIN");
  const cs = block.getFieldValue("CS");
  const sck = block.getFieldValue("SCK");
  const w = block.getFieldValue("WIDTH");
  const h = block.getFieldValue("HEIGHT");

  Blockly.Python.definitions_["import_matrix"] = "from matrix8x8 import Max8x8";

  return `${name} = Max8x8(sck=${sck}, mosi=${din}, cs=${cs}, w=${w}, h=${h})\n`;
};

Blockly.Python["matrix8_clear"] = function (block) {
  const name = block.getFieldValue("NAME");
  return `${name}.clear()\n`;
};

Blockly.Python["matrix8_text"] = function (block) {
  const name = block.getFieldValue("NAME");
  var text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) ||
    '""';

  return `${name}.text(${text})\n`;
};

Blockly.Python["matrix8_scroll_text"] = function (block) {
  const name = block.getFieldValue("NAME");
  var text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) ||
    '""';

  return `${name}.scroll_text(${text})\n`;
};

Blockly.Python["matrix8_pixel"] = function (block) {
  const name = block.getFieldValue("NAME");
  var x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;

  var y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;

  var s =
    Blockly.Python.valueToCode(block, "STATE", Blockly.Python.ORDER_NONE) || 1;

  return `${name}.set_pixel(${x}, ${y}, ${s})\n`;
};

Blockly.Python["matrix8_line"] = function (block) {
  const name = block.getFieldValue("NAME");
  var x1 =
    Blockly.Python.valueToCode(block, "X1", Blockly.Python.ORDER_NONE) || 0;
  var y1 =
    Blockly.Python.valueToCode(block, "Y1", Blockly.Python.ORDER_NONE) || 0;
  var x2 =
    Blockly.Python.valueToCode(block, "X2", Blockly.Python.ORDER_NONE) || 0;
  var y2 =
    Blockly.Python.valueToCode(block, "Y2", Blockly.Python.ORDER_NONE) || 0;

  return `${name}.line(${x1}, ${y1}, ${x2}, ${y2})\n`;
};

Blockly.Python["matrix8_rect"] = function (block) {
  const name = block.getFieldValue("NAME");
  var x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  var y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  var w =
    Blockly.Python.valueToCode(block, "W", Blockly.Python.ORDER_NONE) || 8;
  var h =
    Blockly.Python.valueToCode(block, "H", Blockly.Python.ORDER_NONE) || 8;

  return `${name}.rect(${x}, ${y}, ${w}, ${h})\n`;
};

Blockly.Python["matrix8_brightness"] = function (block) {
  const name = block.getFieldValue("NAME");
  var v =
    Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_NONE) || 5;

  return `${name}.brightness(${v})\n`;
};

Blockly.Python["max_icon"] = function (block) {
  const name = block.getFieldValue("NAME");

  let bytes = [];

  for (let row = 0; row < 8; row++) {
    let binary = "";

    for (let col = 0; col < 8; col++) {
      const bit = block.getFieldValue(`PIXEL_${row}_${col}`);
      binary += bit;
    }

    const value = parseInt(binary, 2);
    bytes.push("0x" + value.toString(16).padStart(2, "0"));
  }

  const code = `${name}.icon([${bytes.join(", ")}])\n`;
  return code;
};

Blockly.Python["tm1637_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const clk = block.getFieldValue("SDA");
  const dio = block.getFieldValue("SCL");
  const bright =
    Blockly.Python.valueToCode(block, "BRIGHT", Blockly.Python.ORDER_ATOMIC) ||
    7;
  Blockly.Python.definitions_["import_tm1637"] = "from tm1637 import TM1637";

  return `${name} = TM1637(clk=${clk}, dio=${dio}, brightness=${bright})\n`;
};

Blockly.Python["tm1637_brightness"] = function (block) {
  const name = block.getFieldValue("NAME");
  const bright =
    Blockly.Python.valueToCode(block, "BRIGHT", Blockly.Python.ORDER_ATOMIC) ||
    7;
  return `${name}.brightness(${bright})\n`;
};

Blockly.Python["tm1637_number"] = function (block) {
  const name = block.getFieldValue("NAME");
  const num =
    Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_ATOMIC) || 0;
  return `${name}.number(${num})\n`;
};

Blockly.Python["tm1637_clear"] = function (block) {
  const name = block.getFieldValue("NAME");
  return `${name}.show('    ')\n`;
};

Blockly.Python["tm1637_numbers"] = function (block) {
  const name = block.getFieldValue("NAME");
  const num1 =
    Blockly.Python.valueToCode(block, "NUM1", Blockly.Python.ORDER_ATOMIC) || 0;
  const num2 =
    Blockly.Python.valueToCode(block, "NUM2", Blockly.Python.ORDER_ATOMIC) || 0;
  return `${name}.numbers(${num1}, ${num2})\n`;
};

Blockly.Python["tm1637_show"] = function (block) {
  const name = block.getFieldValue("NAME");
  const text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC) ||
    '""';
  return `${name}.show(${text})\n`;
};

Blockly.Python["tm1637_scroll"] = function (block) {
  const name = block.getFieldValue("NAME");
  const text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC) ||
    '""';
  return `${name}.scroll(${text})\n`;
};

Blockly.Python["tm1637_temperature"] = function (block) {
  const name = block.getFieldValue("NAME");
  const temp =
    Blockly.Python.valueToCode(block, "TEMP", Blockly.Python.ORDER_ATOMIC) || 0;
  return `${name}.temperature(${temp})\n`;
};

function hexTo565(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  return ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);
}

Blockly.Python["neopixel_init"] = function (block) {
  Blockly.Python.definitions_["neomatrix_import"] =
    "from machine import Pin\nfrom neopixel import NeoPixel";

  const name = block.getFieldValue("NAME");
  const pin = block.getFieldValue("PIN");

  const num =
    Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_NONE) || "1";

  return `${name} = NeoPixel(Pin(${pin}, Pin.OUT), ${num})\n`;
};

Blockly.Python["neopixel_pixel_x"] = function (block) {
  const name = block.getFieldValue("NAME");
  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || "0";

  const hex = block.getFieldValue("COLOR");

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  return `${name}[${x}] = (${r}, ${g}, ${b})\n`;
};

Blockly.Python["neopixel_write"] = function (block) {
  const name = block.getFieldValue("NAME");
  return `${name}.write()\n`;
};

Blockly.Python["neopixel_init_5x5"] = function (block) {
  Blockly.Python.definitions_["neomatrix_import"] = "from np import NeoMatrix";
  const name = block.getFieldValue("NAME");
  const pin = block.getFieldValue("PIN");
  const layout = block.getFieldValue("LAYOUT");
  const rot = block.getFieldValue("ROT");

  return `${name}=NeoMatrix(${pin},5,5,layout=${layout},rotation=${rot})\n`;
};

Blockly.Python["neopixel_init_8x8"] = function (block) {
  Blockly.Python.definitions_["neomatrix_import"] = "from np import NeoMatrix";
  const name = block.getFieldValue("NAME");
  const pin = block.getFieldValue("PIN");
  const layout = block.getFieldValue("LAYOUT");
  const rot = block.getFieldValue("ROT");

  return `${name}=NeoMatrix(${pin},8,8,layout=${layout},rotation=${rot})\n`;
};

Blockly.Python["neopixel_show"] = function (block) {
  const name = block.getFieldValue("NAME");

  return `${name}.show()\n`;
};

Blockly.Python["neopixel_clear"] = function (block) {
  const name = block.getFieldValue("NAME");

  return `${name}.fill(0)\n`;
};

Blockly.Python["neopixel_pixel"] = function (block) {
  const name = block.getFieldValue("NAME");

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;

  const color = hexTo565(block.getFieldValue("COLOR"));

  return `${name}.pixel(${x},${y},${color})\n`;
};

Blockly.Python["neopixel_line"] = function (block) {
  const name = block.getFieldValue("NAME");

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const x1 =
    Blockly.Python.valueToCode(block, "X1", Blockly.Python.ORDER_NONE) || 0;
  const y1 =
    Blockly.Python.valueToCode(block, "Y1", Blockly.Python.ORDER_NONE) || 0;

  const color = hexTo565(block.getFieldValue("COLOR"));

  return `${name}.line(${x},${y},${x1},${y1},${color})\n`;
};

Blockly.Python["neopixel_rect"] = function (block) {
  const name = block.getFieldValue("NAME");

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const w =
    Blockly.Python.valueToCode(block, "W", Blockly.Python.ORDER_NONE) || 0;
  const h =
    Blockly.Python.valueToCode(block, "H", Blockly.Python.ORDER_NONE) || 0;

  const color = hexTo565(block.getFieldValue("COLOR"));

  return `${name}.rect(${x},${y},${w},${h},${color})\n`;
};

Blockly.Python["neopixel_fill_rect"] = function (block) {
  const name = block.getFieldValue("NAME");

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const w =
    Blockly.Python.valueToCode(block, "W", Blockly.Python.ORDER_NONE) || 0;
  const h =
    Blockly.Python.valueToCode(block, "H", Blockly.Python.ORDER_NONE) || 0;

  const color = hexTo565(block.getFieldValue("COLOR"));

  return `${name}.fill_rect(${x},${y},${w},${h},${color})\n`;
};

Blockly.Python["neopixel_text"] = function (block) {
  const name = block.getFieldValue("NAME");

  const text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) ||
    "''";

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;

  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;

  const fg = hexTo565(block.getFieldValue("FG"));
  const bg = hexTo565(block.getFieldValue("BG"));

  return `
${name}.fill(${bg})
${name}.text(${text},${x},${y},${fg})
`;
};

Blockly.Python["neopixel_scroll"] = function (block) {
  const name = block.getFieldValue("NAME");

  const dx =
    Blockly.Python.valueToCode(block, "DX", Blockly.Python.ORDER_NONE) || 0;
  const dy =
    Blockly.Python.valueToCode(block, "DY", Blockly.Python.ORDER_NONE) || 0;

  return `${name}.scroll(${dx},${dy})\n`;
};

Blockly.Python["neopixel_fill"] = function (block) {
  const name = block.getFieldValue("NAME");
  const hex = block.getFieldValue("COLOR");

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const color = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);

  return `${name}.fill(${color})\n`;
};

Blockly.Python["neopixel_blit"] = function (block) {
  const name = block.getFieldValue("NAME");

  const buf =
    Blockly.Python.valueToCode(block, "BUFFER", Blockly.Python.ORDER_NONE) ||
    "buf";
  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;

  return `${name}.blit(${buf},${x},${y})\n`;
};

Blockly.Python["neopixel_ellipse"] = function (block) {
  const name = block.getFieldValue("NAME");

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const rx =
    Blockly.Python.valueToCode(block, "RX", Blockly.Python.ORDER_NONE) || 1;
  const ry =
    Blockly.Python.valueToCode(block, "RY", Blockly.Python.ORDER_NONE) || 1;

  let fill = block.getFieldValue("FILL") == "TRUE";
  fill = fill ? "True" : "False";
  const hex = block.getFieldValue("COLOR");

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const color = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);

  return `${name}.ellipse(${x},${y},${rx},${ry},${color},${fill})\n`;
};

Blockly.Python["neopixel_poly"] = function (block) {
  const name = block.getFieldValue("NAME");

  const vertices =
    Blockly.Python.valueToCode(block, "VERTICES", Blockly.Python.ORDER_NONE) ||
    "[]";
  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;

  const fill = block.getFieldValue("FILL") == "TRUE";

  const hex = block.getFieldValue("COLOR");

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const color = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);

  return `${name}.poly(${vertices},${x},${y},${color},${fill})\n`;
};

Blockly.Python["neopixel_5x5"] = function (block) {
  const name = block.getFieldValue("NAME");
  const colors = [];

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const hex = block.getFieldValue(`COLOR_${row}_${col}`);

      const r = parseInt(hex.substring(1, 3), 16);
      const g = parseInt(hex.substring(3, 5), 16);
      const b = parseInt(hex.substring(5, 7), 16);

      const color565 = ((r & 0xf8) << 8) | ((g & 0xfc) << 3) | (b >> 3);

      colors.push(color565);
    }
  }

  const list = `[${colors.join(",")}]`;

  const code = `
img = ${list}

for i,c in enumerate(img):
    x = i % 5
    y = i // 5
    ${name}.pixel(x,y,c)
`;

  return code;
};

Blockly.Python["neopixel_8x8"] = function (block) {
  const name = block.getFieldValue("NAME");
  const colors = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const hex = block.getFieldValue(`COLOR_${row}_${col}`);

      const r = parseInt(hex.substring(1, 3), 16);
      const g = parseInt(hex.substring(3, 5), 16);
      const b = parseInt(hex.substring(5, 7), 16);

      const color565 = ((r & 0xf8) << 8) | ((g & 0xfc) << 3) | (b >> 3);

      colors.push(color565);
    }
  }

  const list = `[${colors.join(",")}]`;

  const code = `
img = ${list}

for i,c in enumerate(img):
    x = i % 8
    y = i // 8
    ${name}.pixel(x,y,c)
`;

  return code;
};

Blockly.Python["tft_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  Blockly.Python.definitions_["tft_import"] = `from machine import Pin, SPI
import st7789`;

  const mosi = block.getFieldValue("MOSI");
  const sck = block.getFieldValue("SCK");
  const dc = block.getFieldValue("DC");
  const rst = block.getFieldValue("RST");
  const rotar = block.getFieldValue("ROT");

  return `
spi${name} = SPI(2, baudrate=60000000, sck=Pin(${sck}), mosi=Pin(${mosi}), miso=Pin(19), polarity=1, phase=1)
${name} = st7789.ST7789(spi${name},240,240,reset=Pin(${rst}, Pin.OUT),dc=Pin(${dc}, Pin.OUT),rotation=${rotar})
${name}.init()
`;
};

Blockly.Python["tft_fill"] = function (block) {
  const name = block.getFieldValue("NAME");
  const hex = block.getFieldValue("COLOR");

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const color = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);

  return `${name}.fill(${color})\n`;
};

Blockly.Python["tft_pixel"] = function (block) {
  const name = block.getFieldValue("NAME");
  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const hex = block.getFieldValue("COLOR");

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const color = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);

  return `${name}.pixel(${x},${y},${color})\n`;
};

Blockly.Python["tft_line"] = function (block) {
  const name = block.getFieldValue("NAME");
  const x1 =
    Blockly.Python.valueToCode(block, "X1", Blockly.Python.ORDER_NONE) || 0;
  const y1 =
    Blockly.Python.valueToCode(block, "Y1", Blockly.Python.ORDER_NONE) || 0;
  const x2 =
    Blockly.Python.valueToCode(block, "X2", Blockly.Python.ORDER_NONE) || 0;
  const y2 =
    Blockly.Python.valueToCode(block, "Y2", Blockly.Python.ORDER_NONE) || 0;

  const hex = block.getFieldValue("COLOR");

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const c = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);

  return `${name}.line(${x1},${y1},${x2},${y2},${c})\n`;
};

Blockly.Python["tft_rect"] = function (block) {
  const name = block.getFieldValue("NAME");
  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const w =
    Blockly.Python.valueToCode(block, "W", Blockly.Python.ORDER_NONE) || 0;
  const h =
    Blockly.Python.valueToCode(block, "H", Blockly.Python.ORDER_NONE) || 0;

  const hex = block.getFieldValue("COLOR");

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const c = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);

  return `${name}.rect(${x},${y},${w},${h},${c})\n`;
};

Blockly.Python["tft_fill_rect"] = function (block) {
  const name = block.getFieldValue("NAME");
  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const w =
    Blockly.Python.valueToCode(block, "W", Blockly.Python.ORDER_NONE) || 0;
  const h =
    Blockly.Python.valueToCode(block, "H", Blockly.Python.ORDER_NONE) || 0;

  const hex = block.getFieldValue("COLOR");

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const c = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);

  return `${name}.fill_rect(${x},${y},${w},${h},${c})\n`;
};

Blockly.Python["tft_circle"] = function (block) {
  const name = block.getFieldValue("NAME");
  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const radio =
    Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || 0;
  const hex = block.getFieldValue("COLOR");

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const c = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);

  return `${name}.circle(${x},${y},${radio},${c})\n`;
};

Blockly.Python["tft_fill_circle"] = function (block) {
  const name = block.getFieldValue("NAME");
  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const radio =
    Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_NONE) || 0;
  const hex = block.getFieldValue("COLOR");

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const c = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);

  return `${name}.fill_circle(${x},${y},${radio},${c})\n`;
};

Blockly.Python["tft_text"] = function (block) {
  const name = block.getFieldValue("NAME");
  const font = block.getFieldValue("FONT");
  const text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) ||
    "''";

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;

  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;

  Blockly.Python.definitions_["font_" + font] = `import ${font}`;

  const hex = block.getFieldValue("COLOR");

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const color = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);

  /* COLOR FONDO */

  const hexbg = block.getFieldValue("COLOR_BG");

  const rbg = parseInt(hexbg.substr(1, 2), 16);
  const gbg = parseInt(hexbg.substr(3, 2), 16);
  const bbg = parseInt(hexbg.substr(5, 2), 16);

  const colorbg = ((rbg >> 3) << 11) | ((gbg >> 2) << 5) | (bbg >> 3);

  return `${name}.text(${font},${text},${x},${y},${color},${colorbg})\n`;
};

Blockly.Python["tft_icon"] = function (block) {
  const name = block.getFieldValue("NAME");

  const icon =
    Blockly.Python.valueToCode(block, "ICON", Blockly.Python.ORDER_NONE) || 0;

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;

  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;

  const scale = block.getFieldValue("SCALE");

  Blockly.Python.definitions_["icons_px_import"] = "from icons_px import get_ch";

  /* COLOR FG */
  const hex = block.getFieldValue("COLOR");
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const color = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);

  /* COLOR BG */
  const hexbg = block.getFieldValue("COLOR_BG");
  const rbg = parseInt(hexbg.substr(1, 2), 16);
  const gbg = parseInt(hexbg.substr(3, 2), 16);
  const bbg = parseInt(hexbg.substr(5, 2), 16);
  const colorbg = ((rbg >> 3) << 11) | ((gbg >> 2) << 5) | (bbg >> 3);

  return `${name}.draw_icon(get_ch(${icon})[0], ${x}, ${y}, 12, ${scale}, ${color}, ${colorbg})\n`;
};

Blockly.Python["tft_rotation"] = function (block) {
  const name = block.getFieldValue("NAME");
  const rot = block.getFieldValue("ROT");

  return `${name}.rotation(${rot})\n`;
};

Blockly.Python["tft_hline"] = function (block) {
  const name = block.getFieldValue("NAME");

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const w =
    Blockly.Python.valueToCode(block, "W", Blockly.Python.ORDER_NONE) || 0;

  const hex = block.getFieldValue("COLOR");
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const color = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);

  return `${name}.hline(${x}, ${y}, ${w}, ${color})\n`;
};

Blockly.Python["tft_vline"] = function (block) {
  const name = block.getFieldValue("NAME");

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;
  const h =
    Blockly.Python.valueToCode(block, "H", Blockly.Python.ORDER_NONE) || 0;

  const hex = block.getFieldValue("COLOR");
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const color = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);

  return `${name}.vline(${x}, ${y}, ${h}, ${color})\n`;
};

Blockly.Python["tft_bitmap"] = function (block) {
  const name = block.getFieldValue("NAME");

  const bmp =
    Blockly.Python.valueToCode(block, "BITMAP", Blockly.Python.ORDER_NONE) ||
    "None";

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;

  return `${name}.bitmap(${bmp}, ${x}, ${y})\n`;
};

Blockly.Python["espnow_add_peer"] = function (block) {
  const peer =
    Blockly.Python.valueToCode(block, "PEER", Blockly.Python.ORDER_ATOMIC) ||
    "b'\\xff\\xff\\xff\\xff\\xff\\xff'";
  return `e.add_peer(${peer})\n`;
};

Blockly.Python["points"] = function (block) {
  const value =
    block.getFieldValue("POINTS") || "[(0,0),(0,0),(0,0),(0,0),(0,0)]";
  return [value, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["tft_polygon"] = function (block) {
  const name = block.getFieldValue("NAME");

  const points =
    Blockly.Python.valueToCode(block, "POINTS", Blockly.Python.ORDER_NONE) ||
    "[(0,0),(0,0),(0,0),(0,0),(0,0)]";

  const x =
    Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_NONE) || 0;
  const y =
    Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_NONE) || 0;

  const hex = block.getFieldValue("COLOR");
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const color = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);

  return `${name}.polygon(${points}, ${x}, ${y}, ${color})\n`;
};

Blockly.Python["tft_fill_polygon"] = function (block) {
  const name = block.getFieldValue("NAME");

  const points =
    Blockly.Python.valueToCode(block, "POINTS", Blockly.Python.ORDER_NONE) ||
    "[(0,0),(0,0),(0,0),(0,0),(0,0)]";

  const cx =
    Blockly.Python.valueToCode(block, "CX", Blockly.Python.ORDER_NONE) || 0;
  const cy =
    Blockly.Python.valueToCode(block, "CY", Blockly.Python.ORDER_NONE) || 0;

  const hex = block.getFieldValue("COLOR");
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const color = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);

  return `${name}.fill_polygon(${points}, ${cx}, ${cy}, ${color})\n`;
};

Blockly.Python["tft_polygon_center"] = function (block) {
  const name = block.getFieldValue("NAME");

  const points =
    Blockly.Python.valueToCode(block, "POINTS", Blockly.Python.ORDER_NONE) ||
    "[]";

  const code = `${name}.polygon_center(${points})`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["shield_set_motor"] = function(block) {
  const pinA = block.getFieldValue("PINA");
  const pinSpeedA = block.getFieldValue("PINPWMA");
  const pinB = block.getFieldValue("PINB");
  const pinSpeedB = block.getFieldValue("PINPWMB");

  Blockly.Python.definitions_["import_machine"] =
    "from machine import Pin, PWM";

  return `
motorA_dir = Pin(${pinA}, Pin.OUT)
motorA_pwm = PWM(Pin(${pinSpeedA}), freq=2000, duty=0)

motorB_dir = Pin(${pinB}, Pin.OUT)
motorB_pwm = PWM(Pin(${pinSpeedB}), freq=2000, duty=0)

`;
};

Blockly.Python["set_speed_motorA"] = function(block) {
  const dir = block.getFieldValue("DIR");
  const speed = block.getFieldValue("SPEED");

  return `
motorA_dir.value(${dir})
motorA_pwm.duty(${speed})
`;
};

Blockly.Python["set_speed_motorB"] = function(block) {
  const dir = block.getFieldValue("DIR");
  const speed = block.getFieldValue("SPEED");

  return `
motorB_dir.value(${dir})
motorB_pwm.duty(${speed})
`;
};

Blockly.Python["init_keypad_3x4"] = function (block) {
  const name = block.getFieldValue("NAME");
  const r1 = block.getFieldValue("R1");
  const r2 = block.getFieldValue("R2");
  const r3 = block.getFieldValue("R3");
  const r4 = block.getFieldValue("R4");

  const c1 = block.getFieldValue("C1");
  const c2 = block.getFieldValue("C2");
  const c3 = block.getFieldValue("C3");

  Blockly.Python.definitions_["import_keypad3x4"] =
    "from keypad3 import Keypad";

  return `${name} = Keypad(
row_pins=[${r1},${r2},${r3},${r4}],
column_pins=[${c1},${c2},${c3}],
num_rows=4, num_cols=3)\n\n`;
};

Blockly.Python["init_keypad_4x4"] = function (block) {
  const name = block.getFieldValue("NAME");
  const r1 = block.getFieldValue("R1");
  const r2 = block.getFieldValue("R2");
  const r3 = block.getFieldValue("R3");
  const r4 = block.getFieldValue("R4");

  const c1 = block.getFieldValue("C1");
  const c2 = block.getFieldValue("C2");
  const c3 = block.getFieldValue("C3");
  const c4 = block.getFieldValue("C4");

  Blockly.Python.definitions_["import_keypad4x4"] =
    "from keypad4 import Keypad";

  return `${name} = Keypad(
row_pins=[${r1},${r2},${r3},${r4}],
column_pins=[${c1},${c2},${c3},${c4}],
num_rows=4, num_cols=4)\n\n`;
};

Blockly.Python["init_keypad4x4_i2c"] = function (block) {
  const name = block.getFieldValue("NAME");
  const sda = block.getFieldValue("SDA");
  const scl = block.getFieldValue("SCL");
  const addr = block.getFieldValue("ADDR");

  Blockly.Python.definitions_["import_i2c"] = `from machine import Pin, I2C
from keypad4_i2c import Keypad4x4_I2C`;

  return `i2c = I2C(1, sda=Pin(${sda}), scl=Pin(${scl}))
${name} = Keypad4x4_I2C(i2c, ${addr})\n`;
};

Blockly.Python["keypad_get_key"] = function (block) {
  const name = block.getFieldValue("NAME");

  return [`${name}.get_key()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["keypad_get_key_i2c"] = function (block) {
  const name = block.getFieldValue("NAME");
  return [`${name}.get_key()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["rtc_ds3231_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const id = block.getFieldValue("ID");
  const sda = block.getFieldValue("SDA");
  const scl = block.getFieldValue("SCL");
  const addr = block.getFieldValue("ADDR");

  Blockly.Python.definitions_["import_ds3231"] =
    "from machine import Pin, I2C\nimport ds3231";

  return `i2c_${name} = I2C(${id}, scl=Pin(${scl}), sda=Pin(${sda}))
${name} = ds3231.DS3231(i2c_${name}, ${addr})\n`;
};

Blockly.Python["rtc_ds3231_set_time"] = function (block) {
  const name = block.getFieldValue("NAME");
  const year = Blockly.Python.valueToCode(
    block,
    "YEAR",
    Blockly.Python.ORDER_ATOMIC,
  );
  const month = Blockly.Python.valueToCode(
    block,
    "MONTH",
    Blockly.Python.ORDER_ATOMIC,
  );
  const day = Blockly.Python.valueToCode(
    block,
    "DAY",
    Blockly.Python.ORDER_ATOMIC,
  );
  const hour = Blockly.Python.valueToCode(
    block,
    "HOUR",
    Blockly.Python.ORDER_ATOMIC,
  );
  const minute = Blockly.Python.valueToCode(
    block,
    "MINUTE",
    Blockly.Python.ORDER_ATOMIC,
  );
  const second = Blockly.Python.valueToCode(
    block,
    "SECOND",
    Blockly.Python.ORDER_ATOMIC,
  );
  const weekday = Blockly.Python.valueToCode(
    block,
    "WEEKDAY",
    Blockly.Python.ORDER_ATOMIC,
  );

  const code = `${name}.datetime((${year}, ${month}, ${day}, ${hour}, ${minute}, ${second}, ${weekday}, 0))\n`;
  return code;
};

Blockly.Python["rtc_ds3231_get_time"] = function (block) {
  const name = block.getFieldValue("NAME");
  const code = `${name}.datetime()`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["rtc_ds3231_get_hour"] = function (block) {
  const name = block.getFieldValue("NAME");
  const code = `${name}.datetime()[4]`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["rtc_ds3231_get_minute"] = function (block) {
  const name = block.getFieldValue("NAME");
  const code = `${name}.datetime()[5]`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["rtc_ds3231_get_second"] = function (block) {
  const name = block.getFieldValue("NAME");
  const code = `${name}.datetime()[6]`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["rfid_mfrc522_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const sck = block.getFieldValue("SCK");
  const mosi = block.getFieldValue("MOSI");
  const miso = block.getFieldValue("MISO");
  const rst = block.getFieldValue("RST");
  const sda = block.getFieldValue("SDA");

  Blockly.Python.definitions_["import_rfid"] = "from mfrc522 import MFRC522";

  const code = `${name} = MFRC522(sck=${sck}, mosi=${mosi}, miso=${miso}, rst=${rst}, cs=${sda})\n`;
  return code;
};

Blockly.Python["rfid_mfrc522_detect"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}.request(${name}.REQIDL)[0] == ${name}.OK`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["rfid_mfrc522_uid"] = function (block) {
  const name = block.getFieldValue("NAME");

  const statVar = Blockly.Python.nameDB_.getName(
    block.getFieldValue("STAT"),
    Blockly.VARIABLE_CATEGORY_NAME,
  );

  const uidVar = Blockly.Python.nameDB_.getName(
    block.getFieldValue("UID"),
    Blockly.VARIABLE_CATEGORY_NAME,
  );

  return `${statVar}, ${uidVar} = ${name}.SelectTagSN()\n`;
};

Blockly.Python["rfid_key"] = function (block) {
  const code = `[0xFF,0xFF,0xFF,0xFF,0xFF,0xFF]`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["rfid_mfrc522_ok"] = function (block) {
  const name = block.getFieldValue("NAME");
  return [`${name}.OK`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["rfid_mfrc522_auth"] = function (block) {
  const name = block.getFieldValue("NAME");
  const blockNum = block.getFieldValue("BLOCK");
  const key = Blockly.Python.valueToCode(
    block,
    "KEY",
    Blockly.Python.ORDER_NONE,
  );
  const uid = Blockly.Python.valueToCode(
    block,
    "UID",
    Blockly.Python.ORDER_NONE,
  );

  const code = `${name}.auth(${name}.AUTHENT1A, ${blockNum}, ${key}, ${uid}) == ${name}.OK`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["rfid_mfrc522_read_block_vars"] = function (block) {
  const name = block.getFieldValue("NAME");

  const statVar = Blockly.Python.nameDB_.getName(
    block.getFieldValue("STAT"),
    Blockly.VARIABLE_CATEGORY_NAME,
  );

  const dataVar = Blockly.Python.nameDB_.getName(
    block.getFieldValue("DATA"),
    Blockly.VARIABLE_CATEGORY_NAME,
  );

  const blockNum =
    Blockly.Python.valueToCode(block, "BLOCK", Blockly.Python.ORDER_NONE) ||
    "0";

  const code = `${statVar}, ${dataVar} = ${name}.read(${blockNum})\n`;
  return code;
};

Blockly.Python["rfid_data_to_text"] = function (block) {
  const data =
    Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) ||
    "[]";

  const code = `''.join(chr(x) for x in ${data} if 32 <= x <= 126)`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["rfid_mfrc522_stop_crypto"] = function (block) {
  const name = block.getFieldValue("NAME");
  return `${name}.stop_crypto1()\n`;
};

Blockly.Python["rfid_mfrc522_write_block"] = function (block) {
  const name = block.getFieldValue("NAME");

  const blockNum =
    Blockly.Python.valueToCode(block, "BLOCK", Blockly.Python.ORDER_NONE) ||
    "0";

  const data =
    Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_NONE) ||
    "[]";

  const code = `${name}.write(${blockNum}, ${data})`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["text_to_bytes"] = function (block) {
  const text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_NONE) ||
    "''";

  const code = `[ord(c) for c in ${text}]\n`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["encoder_rotary_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const clk = block.getFieldValue("CLK");
  const dt = block.getFieldValue("DT");
  const min_val = block.getFieldValue("IN_VAL");
  const max_val = block.getFieldValue("MAX_VAL");
  const reverse = block.getFieldValue("REVERSE") === "TRUE" ? "True" : "False";
  const range_mode = block.getFieldValue("RANGE_MODE");

  Blockly.Python.definitions_["import_rotary"] =
    "from rotary_irq_esp import RotaryIRQ";

  const code = `${name} = RotaryIRQ(pin_num_clk=${clk}, pin_num_dt=${dt}, min_val=${min_val}, max_val=${max_val}, reverse=${reverse}, range_mode=${range_mode})\n`;

  return code;
};

Blockly.Python["encoder_rotary_value"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}.value()`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["encoder_rotary_reset"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}.set(value=0)\n`;

  return code;
};
Blockly.Python["tcs34725_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const id = block.getFieldValue("ID");
  const scl = block.getFieldValue("SCL");
  const sda = block.getFieldValue("SDA");

  Blockly.Python.definitions_["import_tcs34725"] =
    "from machine import Pin, I2C\nimport tcs34725";

  const code = `i2c_${name} = I2C(${id}, scl=Pin(${scl}), sda=Pin(${sda}))
${name} = tcs34725.TCS34725(i2c_${name})\n`;

  return code;
};

Blockly.Python["tcs34725_rgb"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}.read(True)`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["tcs34725_red"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}.read(True)[0]`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["tcs34725_green"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}.read(True)[1]`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["tcs34725_blue"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}.read(True)[2]`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["tcs34725_clear"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}.read(True)[3]`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["tcs34725_integration"] = function (block) {
  const name = block.getFieldValue("NAME");
  const value = block.getFieldValue("VALUE");

  const code = `${name}.integration_time(${value})`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["tcs34725_gain"] = function (block) {
  const name = block.getFieldValue("NAME");
  const value = block.getFieldValue("VALUE");

  const code = `${name}.gain(${value})`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["dfplayer_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const id = block.getFieldValue("UART");
  const tx = block.getFieldValue("TX");
  const rx = block.getFieldValue("RX");
  const baud = block.getFieldValue("BAUD");

  Blockly.Python.definitions_["import_mp3_player"] =
    "from mp3_player import MP3PLAYER";

  const code = `uart_${id} = UART(${id}, baudrate=${baud}, tx=${tx}, rx=${rx})
${name} = MP3PLAYER(uart_${id})\n`;

  return code;
};

Blockly.Python["dfplayer_play"] = function (block) {
  const name = block.getFieldValue("NAME");
  const track =
    Blockly.Python.valueToCode(block, "TRACK", Blockly.Python.ORDER_ATOMIC) ||
    "1";

  const code = `${name}.play()\n`;

  return code;
};

Blockly.Python["dfplayer_pause"] = function (block) {
  const name = block.getFieldValue("NAME");

  return `${name}.pause()\n`;
};

Blockly.Python["dfplayer_stop"] = function (block) {
  const name = block.getFieldValue("NAME");

  return `${name}.playStop()\n`;
};

Blockly.Python["dfplayer_volume"] = function (block) {
  const name = block.getFieldValue("NAME");
  const volume =
    Blockly.Python.valueToCode(block, "VOLUME", Blockly.Python.ORDER_ATOMIC) ||
    "20";

  return `${name}.setVolume(${volume})\n`;
};

Blockly.Python["dfplayer_next"] = function (block) {
  const name = block.getFieldValue("NAME");

  return `${name}.playNext()\n`;
};

Blockly.Python["dfplayer_previous"] = function (block) {
  const name = block.getFieldValue("NAME");

  return `${name}.playPrevious()\n`;
};

Blockly.Python["fpm_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const id = block.getFieldValue("UART");
  const tx = block.getFieldValue("TX");
  const rx = block.getFieldValue("RX");
  const baud = block.getFieldValue("BAUD");

  Blockly.Python.definitions_["import_fpm"] = "from fpm383c import FPM383C";

  const code = `${name} = FPM383C(${id}, baud=${baud}, tx=${tx}, rx=${rx})\n`;

  return code;
};

Blockly.Python["fpm_led"] = function (block) {
  const name = block.getFieldValue("NAME");
  const color = block.getFieldValue("COLOR");

  return `${name}.led(${color})\n`;
};

Blockly.Python["fpm_enroll"] = function (block) {
  const name = block.getFieldValue("NAME");
  const id =
    Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_ATOMIC) || "1";

  return `${name}.enroll_safe(${id})\n`;
};

Blockly.Python["fpm_verify"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}.finger_exists()`;
  return code;
};

Blockly.Python["fpm_delete"] = function (block) {
  const name = block.getFieldValue("NAME");
  const id =
    Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_ATOMIC) || "1";

  return `${name}.delete_model(${id})\n`;
};

Blockly.Python["fpm_count"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}.get_template_count()`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["fpm_clear"] = function (block) {
  const name = block.getFieldValue("NAME");

  return `${name}.empty_database()\n`;
};

Blockly.Python["fpm_wait_finger"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}.wait_finger()`;
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["fpm_status"] = function (block) {
  const name = block.getFieldValue("NAME");

  const imgVar =
    Blockly.Python.valueToCode(
      block,
      "fpm_img2tz",
      Blockly.Python.ORDER_NONE,
    ) || "0";

  const code = `${name}.get_status(${imgVar})`;
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["fpm_img2tz"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}.img2tz(1)`;
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python["fpm_search"] = function (block) {
  const name = block.getFieldValue("NAME");
  const findVar = Blockly.Python.nameDB_.getName(
    block.getFieldValue("FIND"),
    Blockly.VARIABLE_CATEGORY_NAME,
  );

  const fidVar = Blockly.Python.nameDB_.getName(
    block.getFieldValue("FID"),
    Blockly.VARIABLE_CATEGORY_NAME,
  );

  const scoreVar = Blockly.Python.nameDB_.getName(
    block.getFieldValue("SCORE"),
    Blockly.VARIABLE_CATEGORY_NAME,
  );

  return `${findVar}, ${fidVar}, ${scoreVar} = ${name}.search()\n`;
};

Blockly.Python["mpu6050_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const id = block.getFieldValue("ID");
  const scl = block.getFieldValue("SCL");
  const sda = block.getFieldValue("SDA");
  const addr = block.getFieldValue("ADDR");
  Blockly.Python.definitions_["import_mpu6050"] =
    "from machine import Pin, I2C\nfrom mpu6050 import MPU6050";

  const code = `i2c_${name} = I2C(${id}, scl=Pin(${scl}), sda=Pin(${sda}))
${name} = MPU6050(i2c_${name}, addr=${addr})\n`;

  return code;
};

Blockly.Python["mpu6050_set_accel_range"] = function (block) {
  const name = block.getFieldValue("NAME");
  const range = block.getFieldValue("RANGE");
  Blockly.Python.definitions_["mpu_consts"] = `_ACC_RNG_2G = 0x00
_ACC_RNG_4G = 0x08
_ACC_RNG_8G = 0x10
_ACC_RNG_16G = 0x18`;

  const code = `${name}.set_accel_range(${range})\n`;
  return code;
};

Blockly.Python["mpu6050_set_gyro_range"] = function (block) {
  const name = block.getFieldValue("NAME");
  const range = block.getFieldValue("RANGE");
  Blockly.Python.definitions_["mpu_consts_gyro"] = `_GYR_RNG_250DEG = 0x00
_GYR_RNG_500DEG = 0x08
_GYR_RNG_1000DEG = 0x10
_GYR_RNG_2000DEG = 0x18`;
  const code = `${name}.set_gyro_range(${range})\n`;
  return code;
};

Blockly.Python["mpu6050_accel_x"] = function (block) {
  const name = block.getFieldValue("NAME");
  return [`${name}.read_accel_data()['x']`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["mpu6050_accel_y"] = function (block) {
  const name = block.getFieldValue("NAME");
  return [`${name}.read_accel_data()['y']`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["mpu6050_accel_z"] = function (block) {
  const name = block.getFieldValue("NAME");
  return [`${name}.read_accel_data()['z']`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["mpu6050_gyro_x"] = function (block) {
  const name = block.getFieldValue("NAME");
  return [`${name}.read_gyro_data()['x']`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["mpu6050_gyro_y"] = function (block) {
  const name = block.getFieldValue("NAME");
  return [`${name}.read_gyro_data()['y']`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["mpu6050_gyro_z"] = function (block) {
  const name = block.getFieldValue("NAME");
  return [`${name}.read_gyro_data()['z']`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["mpu6050_temperature"] = function (block) {
  const name = block.getFieldValue("NAME");
  return [`${name}.read_temperature()`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["sdcard_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const sck = block.getFieldValue("SCK");
  const mosi = block.getFieldValue("MOSI");
  const miso = block.getFieldValue("MISO");
  const cs = block.getFieldValue("CS");

  Blockly.Python.definitions_["import_sd"] =
    "import os\nfrom machine import SPI, Pin\nimport sdcard";

  const code = `spi_${name} = SPI(1, sck=Pin(${sck}), mosi=Pin(${mosi}), miso=Pin(${miso}))
${name} = sdcard.SDCard(spi_${name}, Pin(${cs}))
os.mount(${name}, "/sd")\n`;

  return code;
};

Blockly.Python["sdcard_write"] = function (block) {
  const file =
    Blockly.Python.valueToCode(block, "FILE", Blockly.Python.ORDER_ATOMIC) ||
    '"data.txt"';
  const text =
    Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC) ||
    '""';

  const code = `with open("/sd/" + ${file}, "a") as f:
    f.write(${text})
`;

  return code;
};

Blockly.Python["sdcard_read"] = function (block) {
  const file =
    Blockly.Python.valueToCode(block, "FILE", Blockly.Python.ORDER_ATOMIC) ||
    '"data.txt"';

  const code = `open("/sd/" + ${file}).read()`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["sdcard_list"] = function (block) {
  const code = `os.listdir("/sd")`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["inmp441_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const sck = block.getFieldValue("SCK");
  const ws = block.getFieldValue("WS");
  const sd = block.getFieldValue("SD");

  Blockly.Python.definitions_["import_i2s"] =
    "from machine import I2S, Pin\nimport array";

  const code = `${name}_audio = I2S(
    0,
    sck=Pin(${sck}),
    ws=Pin(${ws}),
    sd=Pin(${sd}),
    mode=I2S.RX,
    bits=16,
    format=I2S.MONO,
    rate=16000,
    ibuf=1024
)

${name}_buffer = array.array("h",[0]*256)
`;

  return code;
};

Blockly.Python["inmp441_read"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}_audio.readinto(${name}_buffer)
${name}_buffer[0]`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["inmp441_volume"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `abs(${name}_buffer[0])`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["bmp_sensor_init"] = function (block) {
  const model = block.getFieldValue("MODEL");
  const name = block.getFieldValue("NAME");
  const id = block.getFieldValue("ID");
  const sda = block.getFieldValue("SDA");
  const scl = block.getFieldValue("SCL");

  Blockly.Python.definitions_["import_i2c"] = "from machine import Pin, I2C";

  let code = "";

  if (model === "BMP180") {
    Blockly.Python.definitions_["import_bmp180"] = "import bmp180";

    code = `i2c_${name} = I2C(${id}, scl=Pin(${scl}), sda=Pin(${sda}))
${name} = bmp180.BMP180(i2c_${name})
`;
  } else {
    Blockly.Python.definitions_["import_bmp280"] = "import bmp280";

    code = `i2c_${name} = I2C(${id}, scl=Pin(${scl}), sda=Pin(${sda}))
${name} = bmp280.BMP280(i2c_${name})
`;
  }

  return code;
};

Blockly.Python["bmp_read_temp"] = function (block) {
  const name = block.getFieldValue("NAME");
  const code = `${name}.temperature`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["bmp_read_pressure"] = function (block) {
  const name = block.getFieldValue("NAME");
  const code = `${name}.pressure`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["bmp_read_altitude"] = function (block) {
  const name = block.getFieldValue("NAME");

  Blockly.Python.definitions_["bmp_altitude_func"] = `import math

def bmp_calcular_altitud(presion, base=81000):
    try:
        return 44330 * (1.0 - (presion / base) ** 0.1903)
    except:
        return 0`;

  const code = `bmp_calcular_altitud(${name}.pressure)`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["bh1750_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const id = block.getFieldValue("ID");
  const sda = block.getFieldValue("SDA");
  const scl = block.getFieldValue("SCL");
  const addr = block.getFieldValue("ADDR");

  Blockly.Python.definitions_["import_bh1750"] = `from machine import Pin, I2C
from bh1750 import BH1750`;

  const code = `i2c_${name} = I2C(${id}, scl=Pin(${scl}), sda=Pin(${sda}))
${name} = BH1750(address=${addr}, i2c=i2c_${name})\n`;

  return code;
};

Blockly.Python["bh1750_read_lux"] = function (block) {
  const name = block.getFieldValue("NAME");
  return [`${name}.measurement`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["bh1750_power_on"] = function (block) {
  const name = block.getFieldValue("NAME");
  return `${name}.power_on()\n`;
};

Blockly.Python["bh1750_power_off"] = function (block) {
  const name = block.getFieldValue("NAME");
  return `${name}.power_off()\n`;
};

Blockly.Python["qmc5883l_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const sda = block.getFieldValue("SDA");
  const scl = block.getFieldValue("SCL");
  const addr = block.getFieldValue("ADDR");

  Blockly.Python.definitions_["import_qmc"] =
    "from qmc5883l import QMC5883\nfrom machine import Pin, SoftI2C";

  return `
i2c_${name} = SoftI2C(scl=Pin(${scl}), sda=Pin(${sda}), freq=100000)
${name} = QMC5883(i2c_${name}, slvAddr=${addr})
`;
};

Blockly.Python["qmc5883l_read_xyz"] = function (block) {
  const name = block.getFieldValue("NAME");
  return `${name}_data = ${name}.measure()\n`;
};

Blockly.Python["qmc5883l_read_x"] = function (block) {
  const name = block.getFieldValue("NAME");
  return [`${name}_data[0]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["qmc5883l_read_y"] = function (block) {
  const name = block.getFieldValue("NAME");
  return [`${name}_data[1]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["qmc5883l_read_z"] = function (block) {
  const name = block.getFieldValue("NAME");
  return [`${name}_data[2]`, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["cp2102_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const id = block.getFieldValue("UART");
  const tx = block.getFieldValue("TX");
  const rx = block.getFieldValue("RX");
  const baud = block.getFieldValue("BAUD");

  Blockly.Python.definitions_["import_uart"] = "from machine import Pin, UART";

  const code = `${name} = UART(${id}, baudrate=${baud}, tx=${tx}, rx=${rx})\n`;

  return code;
};

Blockly.Python["cp2102_write"] = function (block) {
  const name = block.getFieldValue("NAME");
  const data =
    Blockly.Python.valueToCode(block, "DATA", Blockly.Python.ORDER_ATOMIC) ||
    '""';

  return `${name}.write(${data})\n`;
};

Blockly.Python["cp2102_read"] = function (block) {
  const name = block.getFieldValue("NAME");

  const code = `${name}.read()`;

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["cp2102_available"] = function (block) {
  const name = block.getFieldValue("NAME");
  const code = `${name}.any()`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["gps_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const id = block.getFieldValue("UART");
  const tx = block.getFieldValue("TX");
  const rx = block.getFieldValue("RX");
  const baud = block.getFieldValue("BAUD");
  Blockly.Python.definitions_["import_gps"] =
    "from micropyGPS import MicropyGPS";
  const code = `uart_${id} = UART(${id}, baudrate=${baud}, tx=${tx}, rx=${rx})
${name} = MicropyGPS(uart_${id})
`;
  return code;
};

Blockly.Python["gps_update"] = function (block) {
  const name = block.getFieldValue("NAME");
  const data = Blockly.Python.nameDB_.getName(
    block.getFieldValue("DATA"),
    Blockly.VARIABLE_CATEGORY_NAME,
  );
  const code = `if ${name}.any():
  ${data} = ${name}.read()`;
  return code;
};

Blockly.Python["gps_latitude"] = function (block) {
  const name = block.getFieldValue("NAME");
  const code = `${name}.latitude[0]`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["gps_longitude"] = function (block) {
  const name = block.getFieldValue("NAME");
  const code = `${name}.longitude[0]`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["gps_time"] = function (block) {
  const name = block.getFieldValue("NAME");
  const code = `${name}.timestamp`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["yf201_init"] = function (block) {
  const name = block.getFieldValue("NAME");
  const pin = block.getFieldValue("PIN");
  Blockly.Python.definitions_["import_flow"] =
    "from machine import Pin\nimport time";

  const code = `
${name}_pulses = 0
${name}_liters = 0
${name}_last_time = time.ticks_ms()

def ${name}_pulse(pin):
    global ${name}_pulses
    ${name}_pulses += 1

${name}_sensor = Pin(${pin}, Pin.IN)
${name}_sensor.irq(trigger=Pin.IRQ_RISING, handler=${name}_pulse)
`;
  return code;
};

Blockly.Python["yf201_flow_rate"] = function (block) {
  const name = block.getFieldValue("NAME");
  const code = `
(${name}_pulses / 7.5)
`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["yf201_total_liters"] = function (block) {
  const name = block.getFieldValue("NAME");
  const code = `
(${name}_pulses / 450)
`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python["yf201_reset"] = function (block) {
  const name = block.getFieldValue("NAME");
  return `${name}_pulses = 0\n`;
};