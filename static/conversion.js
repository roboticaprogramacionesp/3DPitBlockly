//import * as Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "lists_append",
    message0: "a lista %1 agregar %2",
    args0: [
      {
        type: "field_variable",
        name: "LIST",
        variable: "data",
      },
      {
        type: "input_value",
        name: "ITEM",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260,
  },
  {
    type: "text_encode",
    message0: "codificar %1 a bytes",
    args0: [
      {
        type: "input_value",
        name: "TEXT",
        check: "String",
      },
    ],
    output: "Array",
    colour: 160,
    tooltip: "Convierte texto a bytes usando encode()",
  },
  {
    // MicroPython solo soporta UTF-8. No se ofrece dropdown de encoding
    // porque "ascii" y "latin-1" son alias de utf-8 en MicroPython.
    // El checkbox "limpiar \r\n" aplica .strip() — muy común en UART/serial.
    type: "text_decode",
    message0: "decodificar %1 limpiar \\r\\n %2",
    args0: [
      {
        type: "input_value",
        name: "BYTES",
        check: null, // acepta bytes y bytearray
      },
      {
        type: "field_checkbox",
        name: "STRIP",
        checked: true, // activado por defecto — el caso más común en serial
      },
    ],
    output: "String",
    colour: 160,
    tooltip: "Convierte bytes/bytearray a texto UTF-8. Activa 'limpiar' para quitar \\r\\n del final (común en UART).",
  },
  {
    type: "objecto",
    message0: "%1",
    args0: [{ type: "field_input", name: "NAME", text: "" }],
    output: "String",
    colour: 120,
    tooltip: "Objeto genérico para cualquier valor",
    helpUrl: "",
  },
  {
    type: "from",
    message0: "from %1 import %2",
    args0: [
      { type: "field_input", name: "MODULE", text: "" },
      { type: "field_input", name: "NAME", text: "" },
    ],
    colour: 120,
    previousStatement: null,
    nextStatement: null,
    tooltip: "Bloque para importar un módulo o función",
    helpUrl: "",
  },
  {
    type: "import",
    message0: "import %1",
    args0: [{ type: "field_input", name: "MODULE", text: "" }],
    colour: 120,
    previousStatement: null,
    nextStatement: null,
    tooltip: "Bloque para importar un módulo",
    helpUrl: "",
  },
  {
    type: "add",
    message0: "%1",
    args0: [{ type: "field_input", name: "ADD", text: "" }],
    colour: 120,
    previousStatement: null,
    nextStatement: null,
    tooltip: "Bloque para agregar código personalizado",
    helpUrl: "",
  },
  {
    type: "none",
    message0: "Ninguno",
    colour: 120,
    output: null,
    tooltip: "Bloque para None",
    helpUrl: "",
  },
  {
    type: "in",
    message0: "%1 in %2",
    args0: [
      { type: "input_value", name: "A" },
      { type: "input_value", name: "B" },
    ],
    output: "Boolean",
    colour: 210,
  },
  {
    type: "is",
    message0: "%1 is %2",
    args0: [
      { type: "input_value", name: "A" },
      { type: "input_value", name: "B" },
    ],
    output: "Boolean",
    colour: 210,
  },
  {
    type: "del",
    message0: "del %1",
    args0: [{ type: "input_value", name: "VAR" }],
    previousStatement: null,
    nextStatement: null,
    colour: 0,
  },
  {
    type: "lambda",
    message0: "lambda %1 : %2",
    args0: [
      { type: "field_input", name: "ARGS", text: "x" },
      { type: "input_value", name: "BODY" },
    ],
    output: null,
    colour: 290,
  },
  {
    type: "raise",
    message0: "raise %1",
    args0: [{ type: "input_value", name: "ERR" }],
    previousStatement: null,
    nextStatement: null,
    colour: 0,
  },
  {
    type: "with",
    message0: "with %1 as %2 do %3",
    args0: [
      { type: "input_value", name: "CTX" },
      { type: "field_input", name: "VAR", text: "f" },
      { type: "input_statement", name: "DO" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260,
  },
  {
    type: "yield",
    message0: "yield %1",
    args0: [{ type: "input_value", name: "VAL" }],
    output: null,
    colour: 290,
  },
  {
    type: "exceptions_continue",
    message0: "continue",
    previousStatement: null,
    nextStatement: null,
    colour: 290,
  },
  {
    type: "pass",
    message0: "pasar",
    previousStatement: null,
    nextStatement: null,
    colour: 290,
  },
  {
    // Ejecuta código Python dinámicamente con exec(codigo, globals()).
    // El dropdown elige la fuente: texto/código directo, o archivo .py leído con open().read()
    type: "exec_globals",
    message0: "ejecutar %1",
    args0: [
      {
        type: "field_input",
        name: "FILENAME",
        text: "main.py",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip:
      "Ejecuta código Python dinámicamente usando exec(codigo, globals()). " +
      "Permite que el código ejecutado vea/modifique las variables globales actuales.",
    helpUrl: "",
  },
  {
    type: "file_open",
    message0: "abrir archivo %1 modo %2 binario %3",
    args0: [
      {
        type: "field_input",
        name: "FILENAME",
        text: "datos.txt",
      },
      {
        type: "field_dropdown",
        name: "MODE",
        options: [
          ["leer", "r"],
          ["escribir", "w"],
          ["agregar", "a"],
        ],
      },
      {
        type: "field_checkbox",
        name: "BINARY",
        checked: false,
      },
    ],
    output: "File",
    colour: "#8e44ad",
  },
  {
    type: "file_write",
    message0: "%1 escribir %2",
    args0: [
      { type: "field_input", name: "file", text: "f" },
      {
        type: "input_value",
        name: "TEXT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#8e44ad",
  },
  {
    type: "file_read",
    message0: "%1 leer",
    args0: [{ type: "field_input", name: "file", text: "f" }],
    output: "String",
    colour: "#8e44ad",
  },
  {
    type: "file_close",
    message0: "%1 cerrar",
    args0: [{ type: "field_input", name: "file", text: "f" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#8e44ad",
  },
  {
    type: "create_folder",
    message0: "crear carpeta %1",
    args0: [
      {
        type: "input_value",
        name: "FOLDER",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#a55b5b",
  },
  {
    type: "delete_file",
    message0: "eliminar archivo %1",
    args0: [
      {
        type: "input_value",
        name: "FILENAME",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#a55b5b",
  },
  {
    type: "listdir",
    message0: "lista de archivos",
    output: "String",
    colour: 230,
    tooltip: "En listar los archivos de la ESP32",
    helpUrl: "",
  },

  {
    type: "input_text",
    message0: "%1",
    args0: [
      {
        type: "input_value",
        name: "TEXT",
        check: "String",
      },
    ],
    inputsInline: true,
    output: "String",
    colour: 160,
    tooltip: "Lee un dato desde la terminal con mensaje",
    helpUrl: "",
  },
  {
    type: "simple_text",
    message0: "'%1'",
    args0: [{ type: "field_input", name: "NAME", text: "3DPit" }],
    output: "String",
    colour: 160,
    tooltip: "Bloque para texto simple",
    helpUrl: "",
  },
  {
    type: "json_create",
    message0: "crear JSON vacío",
    output: "Object",
    colour: "#E67E22",
  },
  {
    type: "json_dumps",
    message0: "JSON a texto %1",
    args0: [
      {
        type: "input_value",
        name: "OBJ",
      },
    ],
    output: "String",
    colour: "#E67E22",
  },
  {
    type: "json_loads",
    message0: "texto a JSON %1",
    args0: [
      {
        type: "input_value",
        name: "TEXT",
      },
    ],
    output: "Object",
    colour: "#E67E22",
  },
  {
    type: "json_get",
    message0: "JSON %1 obtener clave %2",
    args0: [
      { type: "input_value", name: "OBJ" },
      { type: "field_input", name: "KEY", text: "temp" },
    ],
    output: null,
    colour: "#E67E22",
  },
  {
    type: "json_set",
    message0: "JSON %1 asignar clave %2 valor %3",
    args0: [
      { type: "input_value", name: "OBJ" },
      { type: "field_input", name: "KEY", text: "temp" },
      { type: "input_value", name: "VALUE" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#E67E22",
  },
  {
    type: "json_has_key",
    message0: "JSON %1 tiene clave %2",
    args0: [
      { type: "input_value", name: "OBJ" },
      { type: "field_input", name: "KEY", text: "temp" },
    ],
    output: "Boolean",
    colour: "#E67E22",
  },

  {
    type: "dict_pair",
    message0: "clave %1 valor %2",
    args0: [
      {
        type: "input_value",
        name: "KEY",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    inputsInline: true,
    output: "DictPair",
    colour: 230,
    tooltip: "Par clave valor",
    helpUrl: "",
  },
  {
    type: "dict_create_with",
    message0: "diccionario",
    output: "Dictionary",
    colour: 230,
    tooltip: "Crear diccionario",
    helpUrl: "",
  },
  {
    type: "dict_create_with_container",
    message0: "pares %1 %2",
    args0: [
      { type: "input_dummy" },
      { type: "input_statement", name: "STACK" },
    ],
    colour: 230,
    enableContextMenu: false,
  },
  {
    type: "dict_create_with_item",
    message0: "par",
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    enableContextMenu: false,
  },
  {
    type: "dict_get",
    message0: "en diccionario %1 obtener clave %2",
    args0: [
      { type: "input_value", name: "DICT", check: "Dictionary" },
      { type: "input_value", name: "KEY" },
    ],
    output: null,
    colour: 230,
    tooltip: "Obtiene valor de una clave",
  },
  {
    type: "dict_set",
    message0: "en diccionario %1 poner clave %2 valor %3",
    args0: [
      { type: "input_value", name: "DICT", check: "Dictionary" },
      { type: "input_value", name: "KEY" },
      { type: "input_value", name: "VALUE" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Asignar valor a una clave",
  },
  {
    type: "dict_has_key",
    message0: "diccionario %1 contiene clave %2",
    args0: [
      { type: "input_value", name: "DICT", check: "Dictionary" },
      { type: "input_value", name: "KEY" },
    ],
    output: "Boolean",
    colour: 230,
    tooltip: "Verifica si existe la clave",
  },
  {
    type: "dict_keys",
    message0: "claves de %1",
    args0: [{ type: "input_value", name: "DICT", check: "Dictionary" }],
    output: "Array",
    colour: 230,
  },
  {
    type: "dict_values",
    message0: "valores de %1",
    args0: [{ type: "input_value", name: "DICT", check: "Dictionary" }],
    output: "Array",
    colour: 230,
  },
  {
    type: "dict_length",
    message0: "tamaño de %1",
    args0: [{ type: "input_value", name: "DICT", check: "Dictionary" }],
    output: "Number",
    colour: 230,
  },
  {
    type: "dict_remove",
    message0: "en diccionario %1 eliminar clave %2",
    args0: [
      { type: "input_value", name: "DICT", check: "Dictionary" },
      { type: "input_value", name: "KEY" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Eliminar clave del diccionario",
  },
  {
    type: "dict_is_dictionary",
    message0: "%1 es diccionario",
    args0: [{ type: "input_value", name: "VALUE" }],
    output: "Boolean",
    colour: 230,
    tooltip: "Verifica si el valor es un diccionario",
  },

  {
    type: "class_create",
    message0: "class %1",
    args0: [
      {
        type: "field_input",
        name: "CLASSNAME",
        text: "miClase",
      },
    ],
    message1: "%1",
    args1: [
      {
        type: "input_statement",
        name: "BODY",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Define una clase",
    helpUrl: "",
  },
  {
    type: "class_init",
    message0: "def __init__(%1)",
    args0: [
      {
        type: "input_dummy",
        name: "ARGS",
      },
    ],
    message1: "%1",
    args1: [
      {
        type: "input_statement",
        name: "BODY",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Constructor de la clase con argumentos dinámicos",
    helpUrl: "",
    mutator: "class_init_mutator",
    inputsInline: true,
  },

  {
    type: "class_init_arg",
    message0: "arg",
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "",
    enableContextMenu: false,
  },
  {
    type: "class_init_container",
    message0: "argumentos %1",
    args0: [
      {
        type: "input_statement",
        name: "STACK",
      },
    ],
    colour: 230,
    tooltip: "",
    enableContextMenu: false,
  },

  {
    type: "class_method",
    message0: "def %1 (%2)",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "mi_metodo",
      },
      {
        type: "input_dummy",
        name: "ARGS",
      },
    ],
    message1: "%1",
    args1: [
      {
        type: "input_statement",
        name: "BODY",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Define un método dentro de la clase",
    helpUrl: "",
    mutator: "class_method_mutator",
    inputsInline: true,
  },

  {
    type: "class_method_container",
    message0: "argumentos %1",
    args0: [
      {
        type: "input_statement",
        name: "STACK",
      },
    ],
    colour: 230,
    tooltip: "",
    enableContextMenu: false,
  },
  {
    type: "class_method_arg",
    message0: "arg",
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "",
    enableContextMenu: false,
  },

  {
    type: "class_instance",
    message0: "%1 = %2(%3)",
    args0: [
      {
        type: "field_input",
        name: "OBJ",
        text: "obj",
      },
      {
        type: "field_input",
        name: "CLASSNAME",
        text: "miClase",
      },
      {
        type: "input_dummy",
        name: "ARGS",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Crea una instancia de la clase",
    helpUrl: "",
    mutator: "class_instance_mutator",
    inputsInline: true,
  },

  {
    type: "class_instance_container",
    message0: "argumentos %1",
    args0: [{ type: "input_statement", name: "STACK" }],
    colour: 230,
    enableContextMenu: false,
  },
  {
    type: "class_instance_arg",
    message0: "arg",
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    enableContextMenu: false,
  },

  {
    type: "class_call",
    message0: "%1.%2()",
    args0: [
      {
        type: "field_input",
        name: "OBJ",
        text: "obj",
      },
      {
        type: "field_input",
        name: "METHOD",
        text: "mi_metodo",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Llama un método de la instancia",
    helpUrl: "",
  },

  {
    type: "color_picker",
    message0: "%1",
    args0: [
      {
        type: "field_colour",
        name: "COLOR",
        colour: "#666666",
      },
    ],
    output: "Colour",
    colour: 20,
  },

  {
    type: "color_rgb",
    message0: "crear color RGB R %1 G %2 B %3",
    args0: [
      {
        type: "input_value",
        name: "R",
        check: "Number",
      },
      {
        type: "input_value",
        name: "G",
        check: "Number",
      },
      {
        type: "input_value",
        name: "B",
        check: "Number",
      },
    ],
    output: "Colour",
    colour: 20,
    tooltip: "Crea un color usando valores RGB",
    helpUrl: "",
  },
  {
    type: "color_split",
    message0: "obtener %1 del color %2",
    args0: [
      {
        type: "field_dropdown",
        name: "CHANNEL",
        options: [
          ["Rojo", "R"],
          ["Verde", "G"],
          ["Azul", "B"],
        ],
      },
      {
        type: "input_value",
        name: "COLOR",
        check: "Colour",
      },
    ],
    output: "Number",
    colour: 20,
    tooltip: "Obtiene un componente RGB del color",
    helpUrl: "",
  },
  {
    type: "controls_try_except",
    message0: "try",
    message1: "%1",
    args1: [{ type: "input_statement", name: "TRY" }],
    message2: "except",
    message3: "%1",
    args3: [{ type: "input_statement", name: "EXCEPT" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#E53935",
  },

  {
    type: "controls_try_except_var",
    message0: "try",
    message1: "%1",
    args1: [{ type: "input_statement", name: "TRY" }],
    message2: "except Exception as %1",
    args2: [
      {
        type: "field_variable",
        name: "VAR",
        variable: "error",
      },
    ],
    message3: "%1",
    args3: [{ type: "input_statement", name: "EXCEPT" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#E53935",
  },

  {
    type: "controls_try_except_finally",
    message0: "try",
    message1: "%1",
    args1: [{ type: "input_statement", name: "TRY" }],
    message2: "except",
    message3: "%1",
    args3: [{ type: "input_statement", name: "EXCEPT" }],
    message4: "finally",
    message5: "%1",
    args5: [{ type: "input_statement", name: "FINALLY" }],
    previousStatement: null,
    nextStatement: null,
    colour: "#E53935",
  },

  {
    type: "exceptions_raise",
    message0: "raise %1",
    args0: [
      {
        type: "input_value",
        name: "ERROR",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#E53935",
  },

  {
    type: "runstart",
    message0: "🚀 INICIO ▶",
    nextStatement: null,
    colour: "#F5C402",
    tooltip: "Bloque principal de inicio",
    helpUrl: "",
  },
  {
    type: "convert_to_int",
    message0: "a entero %1",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: "Number",
    colour: 230,
    tooltip: "Convierte un valor a entero",
    helpUrl: "",
  },
  {
    type: "is_int",
    message0: "es entero %1",
    args0: [{ type: "input_value", name: "VALUE" }],
    output: "Boolean",
    colour: 230,
    tooltip: "Comprueba si el valor es entero",
    helpUrl: "",
  },
  {
    type: "convert_to_str",
    message0: "a texto %1",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    output: "String",
    colour: 160,
    tooltip: "Convierte un valor a texto",
    helpUrl: "",
  },
  {
    type: "is_str",
    message0: "es texto %1",
    args0: [{ type: "input_value", name: "VALUE" }],
    output: "Boolean",
    colour: 160,
    tooltip: "Comprueba si el valor es texto",
    helpUrl: "",
  },
  {
    type: "list_empty",
    message0: "lista vacía",
    output: "Array",
    colour: 260,
    tooltip: "Crea una lista vacía",
    helpUrl: "",
  },
  {
    type: "is_list",
    message0: "es lista %1",
    args0: [{ type: "input_value", name: "VALUE" }],
    output: "Boolean",
    colour: 260,
    tooltip: "Comprueba si el valor es una lista",
    helpUrl: "",
  },
  {
    "type": "math_map",
    "message0": "mapear %1 de [%2 - %3] a [%4 - %5]",
    "args0": [
      {
        "type": "input_value",
        "name": "X"
      },
      {
        "type": "input_value",
        "name": "IN_MIN",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "IN_MAX",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "OUT_MIN",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "OUT_MAX",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": 230,
    "tooltip": "Convierte un valor de un rango a otro",
    "helpUrl": ""
  },
  {
    type: "machine_reset",
    message0: "CPU reset",
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: "Reinicia la CPU",
    helpUrl: "",
  },
  {
    type: "machine_freq",
    message0: "CPU freq %1 Hz",
    args0: [
      {
        type: "input_value",
        name: "FREQ",
        check: "Number",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: "Configura la frecuencia del CPU",
    helpUrl: "",
  },
  {
    type: "machine_unique_id",
    message0: "CPU unique id",
    output: "String",
    colour: 120,
    tooltip: "Obtiene el ID único del chip",
    helpUrl: "",
  },
  {
    type: "pin_init",
    message0: "Pin(%1 Pin.%2)",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_dropdown",
        name: "MODE",
        options: [
          ["OUT", "Pin.OUT"],
          ["IN", "Pin.IN"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: "Inicializa un Pin del ESP32",
    helpUrl: "",
  },
  {
    type: "pin_init_pull",
    message0: "Pin(%1 Pin.IN, Pin.%2)",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_dropdown",
        name: "MODE",
        options: [
          ["PULL_DOWN", "Pin.PULL_DOWN"],
          ["PULL_UP", "Pin.PULL_UP"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: "Inicializa un pin del ESP32",
    helpUrl: "",
  },

  {
    type: "pin_init_value",
    message0: "Pin(%1 Pin.OUT, value %2)",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["0", "0"],
          ["1", "1"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 170,
    tooltip: "Inicializa un pin como salida y asigna valor",
    helpUrl: "",
  },
  {
    type: "pin_on",
    message0: "Pin %1.on()",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: "Pone el pin en alto",
    helpUrl: "",
  },
  {
    type: "pin_off",
    message0: "Pin %1.off()",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: "Pone el pin en bajo",
    helpUrl: "",
  },
  {
    type: "pin_value",
    message0: "Pin %1.value",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
    ],
    output: "Number",
    colour: 160,
    tooltip: "Lee el valor del pin",
    helpUrl: "",
  },
  {
    type: "pin_set_value",
    message0: "Pin %1.value(%2)",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["0", "0"],
          ["1", "1"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: "Lee el valor del pin",
    helpUrl: "",
  },
  {
    type: "adc_pin",
    message0: "ADC(Pin(%1))",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["2", "2"],
          ["4", "4"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#FF7043",
  },
  {
    type: "adc_width",
    message0: "adc%1.width(%2)",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["2", "2"],
          ["4", "4"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_dropdown",
        name: "WIDTH",
        options: [
          ["WIDTH_10BIT", "ADC.WIDTH_10BIT"],
          ["WIDTH_9BIT", "ADC.WIDTH_9BIT"],
          ["WIDTH_11BIT", "ADC.WIDTH_11BIT"],
          ["WIDTH_12BIT", "ADC.WIDTH_12BIT"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#FF7043",
  },
  {
    type: "adc_atten",
    message0: "adc%1.atten(%2)",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ATTEN",
        options: [
          ["ATTN_11DB", "ADC.ATTN_11DB"],
          ["ATTN_0DB", "ADC.ATTN_0DB"],
          ["ATTN_2_5DB", "ADC.ATTN_2_5DB"],
          ["ATTN_6DB", "ADC.ATTN_6DB"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#FF7043",
  },
  {
    type: "adc_read",
    message0: "adc%1.read()",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
    ],
    output: "Number",
    tooltip: "Lee valor ADC (0-4095)",
    colour: "#FF7043",
  },
  {
    type: "adc_read_u16",
    message0: "adc%1.read_u16()",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
    ],
    output: "Number",
    tooltip: "Lee valor ADC (0-65535)",
    colour: "#FF7043",
  },
  {
    type: "adc_read_uv",
    message0: "adc%1.read_uv()",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
    ],
    output: "Number",
    tooltip: "Lee voltaje en microvoltios",
    colour: "#FF7043",
  },
  {
    type: "pwm_init",
    message0: "PWM(Pin(%1), freq=%2, duty=%3)",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_number",
        name: "FREQ",
        min: 0,
        max: 20000,
        precision: 1,
      },
      {
        type: "field_number",
        name: "DUTY",
        min: 0,
        max: 1023,
        precision: 1,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#fcec27",
  },
  {
    type: "pwm_freq",
    message0: "pwm%1.freq(%2)",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_number",
        name: "FREQ",
        min: 0,
        max: 20000,
        precision: 1,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#fcec27",
  },
  {
    type: "pwm_duty",
    message0: "pwm%1.duty(%2)",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_number",
        name: "DUTY",
        min: 0,
        max: 1023,
        precision: 1,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#fcec27",
  },
  {
    type: "read_pwm_freq",
    message0: "pwm%1.freq()",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
    ],
    output: "Number",
    colour: "#fcec27",
  },
  {
    type: "read_pwm_duty",
    message0: "pwm%1.duty()",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
    ],
    output: "Number",
    colour: "#fcec27",
  },
  {
    type: "dac_init",
    message0: "DAC(Pin(%1))",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["25", "25"],
          ["26", "26"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#0040db",
  },
  {
    type: "dac_write",
    message0: "DAC %1 escribir %2",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["25", "25"],
          ["26", "26"],
        ],
      },
      {
        type: "field_number",
        name: "VALUE",
        value: 128,
        min: 0,
        max: 255,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#0040db",
  },

  {
    type: "touch_init",
    message0: "TouchPad(Pin(%1))",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#2ECC71",
  },
  {
    type: "touch_config",
    message0: "configurar TouchPad %1 umbral %2",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
        ],
      },
      {
        type: "field_number",
        name: "THRESHOLD",
        value: 300,
        min: 0,
        max: 1023,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#2ECC71",
  },
  {
    type: "touch_read",
    message0: "leer TouchPad %1",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
        ],
      },
    ],
    output: "Number",
    colour: "#2ECC71",
  },

  {
    type: "time_sleep",
    message0: "esperar %1 %2",
    args0: [
      {
        type: "field_number",
        name: "VALUE",
        value: 1,
        min: 0,
      },
      {
        type: "field_dropdown",
        name: "UNIT",
        options: [
          ["segundos", "S"],
          ["milisegundos", "MS"],
          ["microsegundos", "US"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: "Pausa la ejecución",
    helpUrl: "",
  },
  {
    type: "time_ticks_ms",
    message0: "ticks ms",
    output: "Number",
    colour: 120,
    tooltip: "Devuelve el tiempo en milisegundos desde arranque",
    helpUrl: "",
  },
  {
    type: "time_ticks_diff",
    message0: "ticks diff nuevo %1 viejo %2",
    args0: [
      { type: "input_value", name: "NEW" },
      { type: "input_value", name: "OLD" },
    ],
    output: "Number",
    colour: 120,
    tooltip: "Calcula diferencia entre ticks",
    helpUrl: "",
  },

  {
    type: "time_every",
    message0: "Ejecutar cada %1 ms",
    args0: [
      {
        type: "field_number",
        name: "INTERVAL",
        value: 1000,
        min: 1,
      },
    ],
    message1: "%1",
    args1: [
      {
        type: "input_statement",
        name: "DO",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: "Ejecuta código cada cierto tiempo sin bloquear",
    helpUrl: "",
  },

  {
    "type": "rtc_init",
    "message0": "%1 inicializar",
    "args0": [
      { "type": "field_input", "name": "RTC", "text": "rtc" },
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "Inicializa el reloj en tiempo real",
    "helpUrl": ""
  },
  {
    "type": "rtc_set_datetime",
    "message0": "%1 establecer año %2 mes %3 día %4 hora %5 min %6 seg %7",
    "args0": [
      { "type": "field_input", "name": "RTC", "text": "rtc" },
      { "type": "input_value", "name": "YEAR", "value": 2026 },
      { "type": "input_value", "name": "MONTH", "value": 1, "min": 1, "max": 12 },
      { "type": "input_value", "name": "DAY", "value": 1, "min": 1, "max": 31 },
      { "type": "input_value", "name": "HOUR", "value": 0, "min": 0, "max": 23 },
      { "type": "input_value", "name": "MIN", "value": 0, "min": 0, "max": 59 },
      { "type": "input_value", "name": "SEC", "value": 0, "min": 0, "max": 59 }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "inputsInline": true,
    "colour": 120,
    "tooltip": "Configura fecha y hora del RTC",
    "helpUrl": ""
  },
  {
    "type": "rtc_get_datetime",
    "message0": "%1 obtener fecha y hora",
    "args0": [
      { "type": "field_input", "name": "RTC", "text": "rtc" },
    ],
    "output": "Array",
    "colour": 120,
    "tooltip": "Devuelve fecha y hora del RTC",
    "helpUrl": ""
  },
  {
    "type": "wdt_init",
    "message0": "%1 inicializar tiempo(ms) %2",
    "args0": [
      {
        "type": "field_input",
        "name": "WDT",
        "text": "wdt"
      },
      {
        "type": "field_number",
        "name": "TIMEOUT",
        "value": 5000,
        "min": 1000
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "Inicializa el watchdog timer",
    "helpUrl": ""
  },
  {
    "type": "wdt_feed",
    "message0": "%1 alimentar",
    "args0": [
      {
        "type": "field_input",
        "name": "WDT",
        "text": "wdt"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "Reinicia el watchdog para evitar reset",
    "helpUrl": ""
  },
  {
    "type": "machine_reset_cause",
    "message0": "si viene de deep sleep",
    "message1": "hacer %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "DO"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "Ejecuta código si el ESP32 despertó de deep sleep",
    "helpUrl": ""
  },
  {
    "type": "machine_deepsleep",
    "message0": "deep sleep por %1 ms",
    "args0": [
      {
        "type": "field_number",
        "name": "TIME",
        "value": 10000,
        "min": 0
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "Pone el ESP32 en modo deep sleep",
    "helpUrl": ""
  },
  {
    type: "timer_init",
    message0: "Timer %1 modo %2 cada %3 ms",
    args0: [
      {
        type: "field_dropdown",
        name: "TIMER_ID",
        options: Array.from({ length: 17 }, (_, i) => [String(i), String(i)]),
      },
      {
        type: "field_dropdown",
        name: "MODE",
        options: [
          ["Periódico", "PERIODIC"],
          ["Una vez", "ONE_SHOT"],
        ],
      },
      {
        type: "field_number",
        name: "PERIOD",
        value: 1000,
        min: 1,
      },
    ],
    message1: "hacer %1",
    args1: [
      {
        type: "input_statement",
        name: "DO",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: "Configura un timer hardware",
  },
  {
    type: "timer_stop",
    message0: "detener Timer %1",
    args0: [
      {
        type: "field_dropdown",
        name: "TIMER_ID",
        options: Array.from({ length: 17 }, (_, i) => [String(i), String(i)]),
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: "Detiene un timer",
  },
  /* ======================== LED SIMPLE ======================== */
  {
    type: "led_init",
    message0: "%1 %2 Pin %3",
    args0: [
      { type: "field_input", name: "NAME", text: "led" },
      {
        type: "field_dropdown",
        name: "MODEL",
        options: [
          [
            {
              src: "./static/img/led_red.svg",
              width: 50,
              height: 50,
              alt: "LED RED",
            },
            "LED RED",
          ],
          [
            {
              src: "./static/img/led_orange.svg",
              width: 50,
              height: 50,
              alt: "LED ORANGE",
            },
            "LED ORANGE",
          ],
          [
            {
              src: "./static/img/led_green.svg",
              width: 50,
              height: 50,
              alt: "LED GREEN",
            },
            "LED GREEN",
          ],
          [
            {
              src: "./static/img/led_yellow.svg",
              width: 50,
              height: 50,
              alt: "LED YELLOW",
            },
            "LED YELLOW",
          ],
          [
            {
              src: "./static/img/led_blue.svg",
              width: 50,
              height: 50,
              alt: "LED BLUE",
            },
            "LED BLUE",
          ],
          [
            {
              src: "./static/img/led_white.svg",
              width: 50,
              height: 50,
              alt: "LED WHITE",
            },
            "LED WHITE",
          ],
        ],
      },
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["1", "1"],
          ["2", "2"],
          ["3", "3"],
          ["4", "4"],
          ["5", "5"],
          ["6", "6"],
          ["7", "7"],
          ["8", "8"],
          ["9", "9"],
          ["10", "10"],
          ["11", "11"], 
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["20", "20"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
          ["40", "40"],
          ["41", "41"],
          ["42", "42"],
          ["43", "43"],
          ["44", "44"],
          ["45", "45"],
          ["46", "46"],
          ["47", "47"],
          ["48", "48"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#2ECC71",
    tooltip: "Inicializar LED simple",
  },
  {
    type: "set_led",
    message0: "%1 estado %2",
    args0: [
      { type: "field_input", name: "NAME", text: "led" },
      {
        type: "field_dropdown",
        name: "STATE",
        options: [
          ["off", "0"],
          ["on", "1"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#2ECC71",
    tooltip: "Encender/Apagar LED",
  },
  {
    type: "toggle_led",
    message0: "%1 alternar",  
    args0: [
      { type: "field_input", name: "NAME", text: "led" },
    ],  
    previousStatement: null,
    nextStatement: null,
    colour: "#2ECC71",
    tooltip: "Alternar estado del LED",
  },
  /* ======================== LED BICOLOR RG ======================== */
  {
    type: "rg_init",
    message0: "%1 %2 R %3 G %4",
    args0: [
      { type: "field_input", name: "NAME", text: "led_rg" },
      {
        type: "field_dropdown",
        name: "MODEL",
        options: [
          [
            {
              src: "./static/img/ky-011.svg",
              width: 50,
              height: 50,
              alt: "KY-011",
            },
            "KY010",
          ],
          [
            {
              src: "./static/img/ky-029.svg",
              width: 50,
              height: 50,
              alt: "KY-029",
            },
            "KY017",
          ],
        ],
      },
      {
        type: "field_dropdown",
        name: "R",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "G",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#2ECC71",
    tooltip: "Inicializar LED bicolor RG",
  },
  {
    type: "set_led_rg",
    message0: "%1 R %2 G %3",
    args0: [
      { type: "field_input", name: "NAME", text: "led_rg" },
      {
        type: "field_dropdown",
        name: "RSTATE",
        options: [
          ["apagar", "0"],
          ["encender", "1"],
        ],
      },
      {
        type: "field_dropdown",
        name: "GSTATE",
        options: [
          ["apagar", "0"],
          ["encender", "1"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#2ECC71",
    tooltip: "Encender/Apagar LED bicolor RG",
  },

  /* ======================== LED RGB ======================== */
  {
    type: "rgb_init",
    message0: "%1 %2 R %3 G %4 B %5",
    args0: [
      { type: "field_input", name: "NAME", text: "led_rgb" },
      {
        type: "field_dropdown",
        name: "MODEL",
        options: [
          [
            {
              src: "./static/img/ky-009.svg",
              width: 50,
              height: 50,
              alt: "KY-009",
            },
            "KY009",
          ],
          [
            {
              src: "./static/img/ky-016.svg",
              width: 50,
              height: 50,
              alt: "KY-016",
            },
            "KY016",
          ],
        ],
      },
      {
        type: "field_dropdown",
        name: "R",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "G",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "B",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#00BCD4",
    tooltip: "Inicializar LED RGB",
  },
  {
    type: "set_led_rgb",
    message0: "%1 R %2 G %3 B %4",
    args0: [
      { type: "field_input", name: "NAME", text: "led_rgb" },
      {
        type: "field_dropdown",
        name: "RSTATE",
        options: [
          ["off", "0"],
          ["on", "1"],
        ],
      },
      {
        type: "field_dropdown",
        name: "GSTATE",
        options: [
          ["off", "0"],
          ["on", "1"],
        ],
      },
      {
        type: "field_dropdown",
        name: "BSTATE",
        options: [
          ["off", "0"],
          ["on", "1"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#00BCD4",
    tooltip: "Encender/Apagar canales del RGB",
  },
  {
    type: "init_semaforo",
    message0: "%1 %2 Verde %3 Amarillo %4 Rojo %5",
    args0: [
      { type: "field_input", name: "NAME", text: "semaforo" },
      {
        type: "field_image",
        src: "./static/img/semaforo.svg",
        width: 50,
        height: 50,
        alt: "Semáforo",
      },
      {
        type: "field_dropdown",
        name: "G",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "Y",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "R",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#FF0000",
    tooltip: "Inicializar Semáforo",
  },
  {
    type: "set_semaforo",
    message0: "%1 Verde %2 Amarillo %3 Rojo %4",
    args0: [
      { type: "field_input", name: "NAME", text: "semaforo" },
      {
        type: "field_dropdown",
        name: "G",
        options: [
          ["off", "0"],
          ["on", "1"],
        ],
      },
      {
        type: "field_dropdown",
        name: "Y",
        options: [
          ["off", "0"],
          ["on", "1"],
        ],
      },
      {
        type: "field_dropdown",
        name: "R",
        options: [
          ["off", "0"],
          ["on", "1"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#FF0000",
    tooltip: "Establecer Semáforo",
  },

  {
    type: "ky005_init",
    message0: "%1 %2 Pin %3 protocolo NEC",
    args0: [
      { type: "field_input", name: "NAME", text: "ir" },
      {
        type: "field_image",
        src: "./static/img/ky-005.svg",
        width: 50,
        height: 50,
        alt: "IR TX",
      },
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: "#E67E22",
  },
  {
    type: "ky005_send_nec",
    message0: "%1 IR NEC dirección %2 comando %3",
    args0: [
      { type: "field_input", name: "NAME", text: "ir" },
      { type: "input_value", name: "ADDR", check: "Number" },
      { type: "input_value", name: "CMD", check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: "#E67E22",
  },

  {
    type: "interruptor_init",
    message0: "Interruptor %1 Pin %2 pull %3",
    args0: [
      {
        type: "field_dropdown",
        name: "MODEL",
        options: [
          [
            {
              src: "./static/img/ky-004.svg",
              width: 50,
              height: 50,
              alt: "KY-004",
            },
            "KY004",
          ],
          [
            {
              src: "./static/img/ky-002.svg",
              width: 50,
              height: 50,
              alt: "KY-002",
            },
            "KY002",
          ],
          [
            {
              src: "./static/img/ky-003.svg",
              width: 50,
              height: 50,
              alt: "KY-003",
            },
            "KY003",
          ],
          [
            {
              src: "./static/img/ky-010.svg",
              width: 50,
              height: 50,
              alt: "KY-010",
            },
            "KY010",
          ],
          [
            {
              src: "./static/img/ky-017.svg",
              width: 50,
              height: 50,
              alt: "KY-017",
            },
            "KY017",
          ],
          [
            {
              src: "./static/img/ky-020.svg",
              width: 50,
              height: 50,
              alt: "KY-020",
            },
            "KY020",
          ],
          [
            {
              src: "./static/img/ky-021.svg",
              width: 50,
              height: 50,
              alt: "KY-021",
            },
            "KY021",
          ],
          [
            {
              src: "./static/img/ky-031.svg",
              width: 50,
              height: 50,
              alt: "KY-031",
            },
            "KY031",
          ],
          [
            {
              src: "./static/img/boton_tactil.svg",
              width: 50,
              height: 50,
              alt: "ttp223",
            },
            "ttp223",
          ],
        ],
      },

      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "PULL",
        options: [
          ["NINGUNA", "NONE"],
          ["PULL_UP", "PULL_UP"],
          ["PULL_DOWN", "PULL_DOWN"],
        ],
      },
    ],

    previousStatement: null,
    nextStatement: null,
    colour: "230",
  },
  {
    type: "interruptor_read",
    message0: "leer Pin %1",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    output: "Boolean",
    colour: "230",
  },
  {
    type: "interruptor_irq",
    message0: "cuando Pin %1 evento %2",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "TRIGGER",
        options: [
          ["IN IRQ_FALLING y IRQ_RISING", "IRQ_FALLING_IRQ_RISING"],
          ["IRQ_FALLING (presionado)", "IRQ_FALLING"],
          ["IRQ_RISING (soltado)", "IRQ_RISING"],
        ],
      },
    ],
    message1: "ejecutar %1",
    args1: [
      {
        type: "input_statement",
        name: "DO",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "230",
  },

  {
    type: "ky001_init",
    message0: "DS18B20 %1 en Pin %2",
    args0: [
      {
        type: "field_image",
        src: "./static/img/ky-001.svg",
        width: 50,
        height: 50,
        alt: "Temperatura",
      },
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#1ABC9C",
  },
  {
    type: "ky001_scan",
    message0: "buscar %1 sensores DS18B20",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    output: "Array",
    colour: "#1ABC9C",
  },
  {
    type: "ky001_convert",
    message0: "convertir %1 temperatura DS18B20",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#1ABC9C",
  },
  {
    type: "ky001_read_index",
    message0: "leer %1 temperatura sensor #%2",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "input_value",
        name: "INDEX",
        check: "Number",
      },
    ],
    output: "Number",
    colour: "#1ABC9C",
  },

  {
    type: "buzzer_tone",
    message0: "Tono %1 Pin %2 tono %3 duración (s) %4",
    args0: [
      {
        type: "field_image",
        src: "./static/img/ky-006.svg",
        width: 50,
        height: 50,
        alt: "Buzzer",
      },
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "NOTE",
        options: [
          ["B1", "31"],
          ["C2", "33"],
          ["CS2", "35"],
          ["D2", "37"],
          ["DS2", "39"],
          ["E2", "41"],
          ["F2", "44"],
          ["FS2", "46"],
          ["G2", "49"],
          ["GS2", "52"],
          ["A2", "55"],
          ["AS2", "58"],
          ["B2", "62"],
          ["C3", "65"],
          ["CS3", "69"],
          ["D3", "73"],
          ["DS3", "78"],
          ["E3", "82"],
          ["F3", "87"],
          ["FS3", "93"],
          ["G3", "98"],
          ["GS3", "104"],
          ["A3", "110"],
          ["AS3", "117"],
          ["B3", "123"],
          ["C4", "131"],
          ["CS4", "139"],
          ["D4", "147"],
          ["DS4", "156"],
          ["E4", "165"],
          ["F4", "175"],
          ["FS4", "185"],
          ["G4", "196"],
          ["GS4", "208"],
          ["A4", "220"],
          ["AS4", "233"],
          ["B4", "247"],
          ["C5", "262"],
          ["CS5", "277"],
          ["D5", "294"],
          ["DS5", "311"],
          ["E5", "330"],
          ["F5", "349"],
          ["FS5", "370"],
          ["G5", "392"],
          ["GS5", "415"],
          ["A5", "440"],
          ["AS5", "466"],
          ["B5", "494"],
          ["C6", "523"],
          ["CS6", "554"],
          ["D6", "587"],
          ["DS6", "622"],
          ["E6", "659"],
          ["F6", "698"],
          ["FS6", "740"],
          ["G6", "784"],
          ["GS6", "831"],
          ["A6", "880"],
          ["AS6", "932"],
          ["B6", "988"],
          ["C7", "1047"],
          ["CS7", "1109"],
          ["D7", "1175"],
          ["DS7", "1245"],
          ["E7", "1319"],
          ["F7", "1397"],
          ["FS7", "1480"],
          ["G7", "1568"],
          ["GS7", "1661"],
          ["A7", "1760"],
          ["AS7", "1865"],
          ["B7", "1976"],
          ["C8", "2093"],
          ["CS8", "2217"],
          ["D8", "2349"],
          ["DS8", "2489"],
          ["E8", "2637"],
          ["F8", "2794"],
          ["FS8", "2960"],
          ["G8", "3136"],
          ["GS8", "3322"],
          ["A8", "3520"],
          ["AS8", "3729"],
          ["B8", "3951"],
          ["C9", "4186"],
          ["CS9", "4435"],
          ["D9", "4699"],
          ["DS9", "4978"],
        ],
      },
      {
        type: "input_value",
        name: "TIME",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 60,
    tooltip: "Reproduce un tono en un buzzer",
    helpUrl: "",
  },
  {
    type: "buzzer_song",
    message0: "Música pin %1 canción %2",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SONG",
        options: [
          ["Super Mario - Main Theme", "Super Mario - Main Theme"],
          ["Super Mario - Title Music", "Super Mario - Title Music"],
          ["SMBtheme", "SMBtheme"],
          ["SMBwater", "SMBwater"],
          ["SMBunderground", "SMBunderground"],
          ["Picaxe", "Picaxe"],
          ["Simpsons", "Simpsons"],
          ["Indiana", "Indiana"],
          ["TakeOnMe", "TakeOnMe"],
          ["Entertainer", "Entertainer"],
          ["Muppets", "Muppets"],
          ["Xfiles", "Xfiles"],
          ["Looney", "Looney"],
          ["20thCenFox", "20thCenFox"],
          ["Bond", "Bond"],
          ["MASH", "MASH"],
          ["StarWars", "StarWars"],
          ["GoodBad", "GoodBad"],
          ["TopGun", "TopGun"],
          ["A-Team", "A-Team"],
          ["Flintstones", "Flintstones"],
          ["Jeopardy", "Jeopardy"],
          ["Gadget", "Gadget"],
          ["Smurfs", "Smurfs"],
          ["MahnaMahna", "MahnaMahna"],
          ["LeisureSuit", "LeisureSuit"],
          ["MissionImp", "MissionImp"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 60,
    tooltip: "Play RTTTL song on buzzer",
    helpUrl: "",
  },
  {
    type: "buzzer_stop",
    message0: "Apagar buzzer Pin %1",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 60,
  },
  {
    type: "dht_init",
    message0: "DHT %1 Pin %2",
    args0: [
      {
        type: "field_dropdown",
        name: "MODEL",
        options: [
          [
            {
              src: "./static/img/ky-015.svg",
              width: 50,
              height: 50,
              alt: "DHT11",
            },
            "DHT11",
          ],
          [
            {
              src: "./static/img/dht22.svg",
              width: 50,
              height: 50,
              alt: "DHT22",
            },
            "DHT22",
          ],
        ],
      },
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#2ECC71",
  },
  {
    type: "dht_measure",
    message0: "medir DHT pin %1",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#2ECC71",
  },
  {
    type: "dht_temperature",
    message0: "temperatura DHT pin %1",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    output: "Number",
    colour: "#2ECC71",
  },
  {
    type: "dht_humidity",
    message0: "humedad DHT pin %1",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    output: "Number",
    colour: "#2ECC71",
  },

  {
    type: "analog_sensor_init",
    message0: "%1 %2 Pin %3 atten %4 width %5",
    args0: [
      { type: "field_input", name: "NAME", text: "adkey" },
      {
        type: "field_dropdown",
        name: "MODEL",
        options: [
          [
            {
              src: "./static/img/ADKeyboard.png",
              width: 50,
              height: 50,
              alt: "ADKeyboard",
            },
            "ADKeyboard",
          ],
          [
            {
              src: "./static/img/ky-013.svg",
              width: 50,
              height: 50,
              alt: "KY-013",
            },
            "KY013",
          ],

          [
            {
              src: "./static/img/ky-018.svg",
              width: 50,
              height: 50,
              alt: "KY-018",
            },
            "KY018",
          ],
          [
            {
              src: "./static/img/ky-035.svg",
              width: 50,
              height: 50,
              alt: "KY-035",
            },
            "KY035",
          ],
        ],
      },
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["2", "2"],
          ["4", "4"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["34", "34"],
          ["35", "35"],
          ["32", "32"],
          ["33", "33"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ATTEN",
        options: [
          ["ADC.ATTN_0DB", "ADC.ATTN_0DB"],
          ["ADC.ATTN_2_5DB", "ADC.ATTN_2_5DB"],
          ["ADC.ATTN_6DB", "ADC.ATTN_6DB"],
          ["ADC.ATTN_11DB", "ADC.ATTN_11DB"],
        ],
      },
      {
        type: "field_dropdown",
        name: "WIDTH",
        options: [
          ["ADC.WIDTH_9BIT", "ADC.WIDTH_9BIT"],
          ["ADC.WIDTH_10BIT", "ADC.WIDTH_10BIT"],
          ["ADC.WIDTH_11BIT", "ADC.WIDTH_11BIT"],
          ["ADC.WIDTH_12BIT", "ADC.WIDTH_12BIT"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#F39C12",
    tooltip: "Inicializar sensor analogico",
    helpUrl: "",
  },
  {
    type: "analog_sensor_read",
    message0: "%1 Leer",
    args0: [{ type: "field_input", name: "NAME", text: "adkey" }],
    output: "Number",
    colour: "#F39C12",
  },
  {
    type: "ky023_analog",
    message0: "%1 %2 x Pin %3 y Pin %4 sw Pin %5 atten %6 width %7 pull %8",
    args0: [
      { type: "field_input", name: "NAME", text: "joystick" },
      {
        type: "field_image",
        src: "./static/img/ky-023.svg",
        width: 50,
        height: 50,
        alt: "JOYSTICK",
      },
      {
        type: "field_dropdown",
        name: "PIN_X",
        options: [
          ["2", "2"],
          ["4", "4"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_dropdown",
        name: "PIN_Y",
        options: [
          ["2", "2"],
          ["4", "4"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_dropdown",
        name: "PIN_SW",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ATTEN",
        options: [
          ["ADC.ATTN_0DB", "ADC.ATTN_0DB"],
          ["ADC.ATTN_2_5DB", "ADC.ATTN_2_5DB"],
          ["ADC.ATTN_6DB", "ADC.ATTN_6DB"],
          ["ADC.ATTN_11DB", "ADC.ATTN_11DB"],
        ],
      },
      {
        type: "field_dropdown",
        name: "WIDTH",
        options: [
          ["ADC.WIDTH_9BIT", "ADC.WIDTH_9BIT"],
          ["ADC.WIDTH_10BIT", "ADC.WIDTH_10BIT"],
          ["ADC.WIDTH_11BIT", "ADC.WIDTH_11BIT"],
          ["ADC.WIDTH_12BIT", "ADC.WIDTH_12BIT"],
        ],
      },
      {
        type: "field_dropdown",
        name: "PULL",
        options: [
          ["Ninguno", "None"],
          ["PULL_UP", "PULL_UP"],
          ["PULL_DOWN", "PULL_DOWN"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#FF7043",
    tooltip: "Joystick KY-023 valores analogicos",
  },
  {
    type: "ky023_read_x",
    message0: "%1 X",
    args0: [{ type: "field_input", name: "NAME", text: "joystick" }],
    output: "Number",
    colour: "#FF7043",
  },
  {
    type: "ky023_read_y",
    message0: "%1 Y",
    args0: [{ type: "field_input", name: "NAME", text: "joystick" }],
    output: "Number",
    colour: "#FF7043",
  },
  {
    type: "ky023_read_sw",
    message0: "%1 botón",
    args0: [{ type: "field_input", name: "NAME", text: "joystick" }],
    output: "Number",
    colour: "#FF7043",
  },
  {
    type: "pot_slider_init",
    message0: "%1 %2 A %3 B %4 atten %5 width %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "deslizador",
      },
      {
        type: "field_image",
        src: "./static/img/pot_deslizable.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "PIN_A",
        options: [
          ["2", "2"],
          ["4", "4"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["34", "34"],
          ["35", "35"],
          ["32", "32"],
          ["33", "33"],
        ],
      },
      {
        type: "field_dropdown",
        name: "PIN_B",
        options: [
          ["2", "2"],
          ["4", "4"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["34", "34"],
          ["35", "35"],
          ["32", "32"],
          ["33", "33"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ATTEN",
        options: [
          ["ADC.ATTN_0DB", "ADC.ATTN_0DB"],
          ["ADC.ATTN_2_5DB", "ADC.ATTN_2_5DB"],
          ["ADC.ATTN_6DB", "ADC.ATTN_6DB"],
          ["ADC.ATTN_11DB", "ADC.ATTN_11DB"],
        ],
      },
      {
        type: "field_dropdown",
        name: "WIDTH",
        options: [
          ["ADC.WIDTH_9BIT", "ADC.WIDTH_9BIT"],
          ["ADC.WIDTH_10BIT", "ADC.WIDTH_10BIT"],
          ["ADC.WIDTH_11BIT", "ADC.WIDTH_11BIT"],
          ["ADC.WIDTH_12BIT", "ADC.WIDTH_12BIT"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 60,
  },
  {
    type: "pot_slider_read_x",
    message0: "%1 valor A",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "deslizador",
      },
    ],
    output: "Number",
    colour: 60,
  },
  {
    type: "pot_slider_read_y",
    message0: "%1 valor B",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "deslizador",
      },
    ],
    output: "Number",
    colour: 60,
  },
  {
    type: "hybrid_sensor_init",
    message0: "Sensor A/D %1 A0 Pin %2 D0 Pin %3 atten %4 width %5 pull %6",
    args0: [
      {
        type: "field_dropdown",
        name: "MODEL",
        options: [
          [
            {
              src: "./static/img/ky-024.svg",
              width: 50,
              height: 50,
              alt: "KY024",
            },
            "KY024",
          ],
          [
            {
              src: "./static/img/ky-026.svg",
              width: 50,
              height: 50,
              alt: "KY026",
            },
            "KY026",
          ],
          [
            {
              src: "./static/img/ky-027.svg",
              width: 50,
              height: 50,
              alt: "KY027",
            },
            "KY027",
          ],
          [
            {
              src: "./static/img/ky-028.svg",
              width: 50,
              height: 50,
              alt: "KY028",
            },
            "KY028",
          ],

          [
            {
              src: "./static/img/ky-036.svg",
              width: 50,
              height: 50,
              alt: "KY036",
            },
            "KY036",
          ],

          [
            {
              src: "./static/img/ky-037.svg",
              width: 50,
              height: 50,
              alt: "KY037",
            },
            "KY037",
          ],
          [
            {
              src: "./static/img/mq2.svg",
              width: 50,
              height: 50,
              alt: "MQ2",
            },
            "MQ2",
          ],
        ],
      },
      {
        type: "field_dropdown",
        name: "APIN",
        options: [
          ["2", "2"],
          ["4", "4"],
          ["13", "13"],
          ["12", "12"],
          ["14", "14"],
          ["27", "27"],
          ["25", "25"],
          ["26", "26"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "DPIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ATTEN",
        options: [
          ["ADC.ATTN_0DB", "ADC.ATTN_0DB"],
          ["ADC.ATTN_2_5DB", "ADC.ATTN_2_5DB"],
          ["ADC.ATTN_6DB", "ADC.ATTN_6DB"],
          ["ADC.ATTN_11DB", "ADC.ATTN_11DB"],
        ],
      },
      {
        type: "field_dropdown",
        name: "WIDTH",
        options: [
          ["ADC.WIDTH_9BIT", "ADC.WIDTH_9BIT"],
          ["ADC.WIDTH_10BIT", "ADC.WIDTH_10BIT"],
          ["ADC.WIDTH_11BIT", "ADC.WIDTH_11BIT"],
          ["ADC.WIDTH_12BIT", "ADC.WIDTH_12BIT"],
        ],
      },
      {
        type: "field_dropdown",
        name: "PULL",
        options: [
          ["Ninguno", "None"],
          ["PULL_UP", "PULL_UP"],
          ["PULL_DOWN", "PULL_DOWN"],
        ],
      },
    ],

    previousStatement: null,
    nextStatement: null,
    colour: "#9B59B6",
    tooltip: "Sensor analogico y digital",
    helpUrl: "",
  },

  {
    type: "hybrid_sensor_read_analog",
    message0: "Leer Analogico Pin %1",
    args0: [
      {
        type: "field_dropdown",
        name: "APIN",
        options: [
          ["2", "2"],
          ["4", "4"],
          ["13", "13"],
          ["12", "12"],
          ["14", "14"],
          ["27", "27"],
          ["25", "25"],
          ["26", "26"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    output: "Number",
    colour: "#9B59B6",
  },

  {
    type: "hybrid_sensor_read_digital",
    message0: "Leer Digital Pin %1",
    args0: [
      {
        type: "field_dropdown",
        name: "DPIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    output: "Number",
    colour: "#9B59B6",
  },

  {
    type: "actuador_init",
    message0: "Actuador %1 Pin %2",
    args0: [
      {
        type: "field_dropdown",
        name: "MODEL",
        options: [
          [
            {
              src: "./static/img/ky-012.svg",
              width: 50,
              height: 50,
              alt: "ky-012",
            },
            "Buzzer",
          ],
          [
            {
              src: "./static/img/ky-019.svg",
              width: 50,
              height: 50,
              alt: "ky-019",
            },
            "Rele",
          ],
        ],
      },
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: "Inicializar Actuador",
    helpUrl: "",
  },
  {
    type: "actuador_on_off",
    message0: "Actuador %1 value(%2)",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "STATE",
        options: [
          ["off", "off"],
          ["on", "on"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "init_dc_motor",
    message0: "%1 %2 in1 %3 in2 %4 in3 %5 in4 %6",
    args0: [
      { type: "field_input", name: "NAME", text: "l298n" },
      {
        type: "field_image",
        src: "./static/img/l298n.svg",
        width: 50,
        height: 50,
        alt: "M",
      },
      {
        type: "field_dropdown",
        name: "IN1",
        options: [
          ["26", "26"],
          ["25", "25"],
          ["17", "17"],
          ["16", "16"],
        ],
      },
      {
        type: "field_dropdown",
        name: "IN2",
        options: [
          ["25", "25"],
          ["26", "26"],
          ["17", "17"],
          ["16", "16"],
        ],
      },
      {
        type: "field_dropdown",
        name: "IN3",
        options: [
          ["17", "17"],
          ["26", "26"],
          ["25", "25"],
          ["16", "16"],
        ],
      },
      {
        type: "field_dropdown",
        name: "IN4",
        options: [
          ["16", "16"],
          ["26", "26"],
          ["25", "25"],
          ["17", "17"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "move_dc_motor1_on_off",
    message0: "%1 Motor %2 %3 %4 %5 %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "l298n"
      },
      {
        type: "field_dropdown",
        name: "motor",
        options: [
          ["A", "A"],
          ["B", "B"]
        ]
      },
      {
        type: "field_label",
        name: "LABEL1",
        text: "IN1"
      },
      {
        type: "field_dropdown",
        name: "in1",
        options: [
          ["off", "off"],
          ["on", "on"]
        ]
      },
      {
        type: "field_label",
        name: "LABEL2",
        text: "IN2"
      },
      {
        type: "field_dropdown",
        name: "in2",
        options: [
          ["off", "off"],
          ["on", "on"]
        ]
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    extensions: ["motor_label_update"]
  },

  {
    type: "move_dc_motor1",
    message0: "%1 Motor %2 mover %3",
    args0: [
      { type: "field_input", name: "NAME", text: "l298n" },
      {
        type: "field_dropdown",
        name: "motor",
        options: [
          ["A", "A"],
          ["B", "B"],
        ],
      },
      {
        type: "field_dropdown",
        name: "mover",
        options: [
          ["Adelante", "Adelante"],
          ["Atrás", "Atrás"],
          ["Detener", "Detener"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },

  {
    type: "move_dc_motor2_on_off",
    message0: "%1 Motor A IN1 %2 IN2 %3 Motor B IN3 %4 IN4 %5",
    args0: [
      { type: "field_input", name: "NAME", text: "l298n" },
      {
        type: "field_dropdown",
        name: "in1",
        options: [
          ["off", "off"],
          ["on", "on"],
        ],
      },
      {
        type: "field_dropdown",
        name: "in2",
        options: [
          ["off", "off"],
          ["on", "on"],
        ],
      },
      {
        type: "field_dropdown",
        name: "in3",
        options: [
          ["off", "off"],
          ["on", "on"],
        ],
      },
      {
        type: "field_dropdown",
        name: "in4",
        options: [
          ["off", "off"],
          ["on", "on"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "move_dc_motor2",
    message0: "%1 Motor A mover %2 B mover %3",
    args0: [
      { type: "field_input", name: "NAME", text: "l298n" },
      {
        type: "field_dropdown",
        name: "motorA",
        options: [
          ["Adelante", "Adelante"],
          ["Atrás", "Atrás"],
          ["Detener", "Detener"],
        ],
      },
      {
        type: "field_dropdown",
        name: "motorB",
        options: [
          ["Adelante", "Adelante"],
          ["Atrás", "Atrás"],
          ["Detener", "Detener"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "init2_dc_motor_pwm",
    message0: "%1 %2 in1 %3 in2 %4 in3 %5 in4 %6",
    args0: [
      { type: "field_input", name: "NAME", text: "l298n" },
      {
        type: "field_image",
        src: "./static/img/l298n.svg",
        width: 50,
        height: 50,
        alt: "M",
      },
      {
        type: "field_dropdown",
        name: "IN1",
        options: [
          ["25", "25"],
          ["26", "26"],
          ["17", "17"],
          ["16", "16"],
        ],
      },
      {
        type: "field_dropdown",
        name: "IN2",
        options: [
          ["17", "17"],
          ["25", "25"],
          ["26", "26"],
          ["16", "16"],
        ],
      },
      {
        type: "field_dropdown",
        name: "IN3",
        options: [
          ["16", "16"],
          ["17", "17"],
          ["25", "25"],
          ["26", "26"],
        ],
      },
      {
        type: "field_dropdown",
        name: "IN4",
        options: [
          ["27", "27"],
          ["16", "16"],
          ["17", "17"],
          ["25", "25"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "move_dc_motor_pwm1",
    message0: "%1 Motor %2 velocidad IN1 %3 velocidad IN2 %4",
    args0: [
      { type: "field_input", name: "NAME", text: "l298n" },
      {
        type: "field_dropdown",
        name: "motor",
        options: [
          ["A", "A"],
          ["B", "B"],
        ],
      },
      {
        type: "input_value",
        name: "VALUEA",
      },
      {
        type: "input_value",
        name: "VALUEB",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 20,
  },
  {
    type: "move_dc_motor_pwm2",
    message0: "%1 Motor A IN1 %2 IN2 %3 Motor B IN3 %4 IN4 %5",
    args0: [
      { type: "field_input", name: "NAME", text: "l298n" },
      { type: "input_value", name: "VALUEA" },
      { type: "input_value", name: "VALUEB" },
      { type: "input_value", name: "VALUEC" },
      { type: "input_value", name: "VALUED" },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 20,
  },
  {
    type: "init3_dc_motor_pwm",
    message0: "%1 %2 ENA %3 in1 %4 in2 %5 in3 %6 in4 %7 ENB %8",
    args0: [
      { type: "field_input", name: "NAME", text: "l298n" },
      {
        type: "field_image",
        src: "./static/img/l298n.svg",
        width: 50,
        height: 50,
        alt: "M",
      },
      {
        type: "field_dropdown",
        name: "ENA",
        options: [
          ["26", "26"],
          ["25", "25"],
          ["14", "14"],
        ],
      },
      {
        type: "field_dropdown",
        name: "IN1",
        options: [
          ["25", "25"],
          ["26", "26"],
          ["17", "17"],
        ],
      },
      {
        type: "field_dropdown",
        name: "IN2",
        options: [
          ["17", "17"],
          ["25", "25"],
          ["26", "26"],
        ],
      },
      {
        type: "field_dropdown",
        name: "IN3",
        options: [
          ["16", "16"],
          ["17", "17"],
          ["25", "25"],
        ],
      },
      {
        type: "field_dropdown",
        name: "IN4",
        options: [
          ["27", "27"],
          ["16", "16"],
          ["17", "17"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ENB",
        options: [
          ["14", "14"],
          ["26", "26"],
          ["25", "25"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },

  {
    type: "move_dc_motor1_pwm",
    message0: "%1 Motor %2 velocidad %3 mover %4",
    args0: [
      { type: "field_input", name: "NAME", text: "l298n" },
      {
        type: "field_dropdown",
        name: "motor",
        options: [
          ["A", "A"],
          ["B", "B"],
        ],
      },
      {
        type: "input_value",
        name: "VALUE",
      },
      {
        type: "field_dropdown",
        name: "mover",
        options: [
          ["Adelante", "Adelante"],
          ["Atrás", "Atrás"],
          ["Detener", "Detener"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 20,
  },

  {
    type: "move_dc_motor2_pwm",
    message0: "%1 Motor A velocidad %2 mover %3 B velocidad %4 mover %5",
    args0: [
      { type: "field_input", name: "NAME", text: "l298n" },
      { type: "input_value", name: "VALUEA" },
      {
        type: "field_dropdown",
        name: "motorA",
        options: [
          ["Adelante", "Adelante"],
          ["Atrás", "Atrás"],
          ["Detener", "Detener"],
        ],
      },
      { type: "input_value", name: "VALUEB" },
      {
        type: "field_dropdown",
        name: "motorB",
        options: [
          ["Adelante", "Adelante"],
          ["Atrás", "Atrás"],
          ["Detener", "Detener"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: 20,
  },

  {
    type: "init_servo",
    message0: "servo %1 Pin %2",
    args0: [
      {
        type: "field_image",
        src: "./static/img/servoSG90.svg",
        width: 50,
        height: 50,
        alt: "S",
      },
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["26", "26"],
          ["25", "25"],
          ["27", "27"],
          ["14", "14"],
          ["12", "12"],
          ["13", "13"],
          ["32", "32"],
          ["33", "33"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "move_servo",
    message0: "servo pin%1 mover a %2",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["26", "26"],
          ["25", "25"],
          ["27", "27"],
          ["14", "14"],
          ["12", "12"],
          ["13", "13"],
          ["32", "32"],
          ["33", "33"],
        ],
      },
      {
        type: "field_angle",
        name: "ANGLE",
        angle: 90,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },

  {
    type: "stepper_init",
    message0: "%1 %2 IN1 %3 IN2 %4 IN3 %5 IN4 %6",
    args0: [
      { type: "field_input", name: "NAME", text: "motor_pasos" },
      {
        type: "field_image",
        src: "./static/img/28byj.svg",
        width: 50,
        height: 50,
        alt: "M",
      },
      {
        type: "field_dropdown",
        name: "IN1",
        options: [
          ["26", "26"],
          ["25", "25"],
          ["17", "17"],
          ["16", "16"],
        ],
      },
      {
        type: "field_dropdown",
        name: "IN2",
        options: [
          ["25", "25"],
          ["26", "26"],
          ["17", "17"],
          ["16", "16"],
        ],
      },
      {
        type: "field_dropdown",
        name: "IN3",
        options: [
          ["17", "17"],
          ["26", "26"],
          ["25", "25"],
          ["16", "16"],
        ],
      },
      {
        type: "field_dropdown",
        name: "IN4",
        options: [
          ["16", "16"],
          ["26", "26"],
          ["25", "25"],
          ["17", "17"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },

  {
    type: "stepper_step",
    message0: "%1 mover pasos %2",
    args0: [
      { type: "field_input", name: "NAME", text: "motor_pasos" },
      {
        type: "input_value",
        name: "STEPS",
        check: "Number",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },

  {
    type: "stepper_degrees",
    message0: "%1 girar %2 grados",
    args0: [
      { type: "field_input", name: "NAME", text: "motor_pasos" },
      {
        type: "field_angle",
        name: "ANGLE",
        angle: 90,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },

  {
    type: "stepper_angle",
    message0: "%1 ir al angulo %2",
    args0: [
      { type: "field_input", name: "NAME", text: "motor_pasos" },
      {
        type: "field_angle",
        name: "ANGLE",
        angle: 90,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },

  {
    type: "init_infrarrojo",
    message0: "Infrarrojo %1 Pin %2 %3",
    args0: [
      {
        type: "field_dropdown",
        name: "SENSOR",
        options: [
          [
            {
              src: "./static/img/fc-51.svg",
              width: 50,
              height: 50,
              alt: "FC-51",
            },
            "FC51",
          ],
          [
            {
              src: "./static/img/ky-033.svg",
              width: 50,
              height: 50,
              alt: "ky-033",
            },
            "ky-033",
          ],
          [
            {
              src: "./static/img/tcrt5000.svg",
              width: 50,
              height: 50,
              alt: "tcrt5000",
            },
            "tcrt5000",
          ],
        ],
      },
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "MODE",
        options: [
          ["PULL_DOWN", "Pin.PULL_DOWN"],
          ["PULL_UP", "Pin.PULL_UP"],
          ["Ninguno", "None"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 110,
  },
  {
    type: "read_infrarrojo",
    message0: "Leer pin %1",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    output: "Number",
    colour: 110,
  },
  {
    type: "init_ultrasonic_hcsr04",
    message0: "%1 %2 Trig %3 Echo %4",
    args0: [
      { type: "field_input", name: "NAME", text: "ultrasonico" },
      {
        type: "field_image",
        src: "./static/img/hcsr04.svg",
        width: 50,
        height: 50,
        alt: "US",
      },
      {
        type: "field_dropdown",
        name: "TRIG",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ECHO",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 140,
  },
  {
    type: "read_ultrasonic_hcsr04",
    message0: "Distancia %1 en %2",
    args0: [
      { type: "field_input", name: "NAME", text: "ultrasonico" },
      {
        type: "field_dropdown",
        name: "UNIT",
        options: [
          ["cm", "cm"],
          ["mm", "mm"],
        ],
      },
    ],
    output: "Number",
    colour: 140,
  },

  {
    type: "init_ir_ky022",
    message0: "IR KY-022 %1 Pin %2",
    args0: [
      {
        type: "field_image",
        src: "./static/img/ky-022.svg",
        width: 50,
        height: 50,
        alt: "IR",
      },
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],

    previousStatement: null,
    nextStatement: null,
    colour: 160,
  },
  {
    type: "ir_ky022_callback_code",
    message0: "cuando IR recibe %1 %2 %3",
    args0: [
      { type: "field_variable", name: "DATA", variable: "data" },
      { type: "field_variable", name: "ADDR", variable: "addr" },
      { type: "field_variable", name: "CTRL", variable: "ctrl" },
    ],
    message1: "ejecutar %1",
    args1: [{ type: "input_statement", name: "CODE" }],
    colour: 160,
    hat: "cap",
  },

  {
    type: "init_hc06",
    message0: "%1 id %2 TX%3 RX%4 baudios %5",
    args0: [
      {
        type: "field_image",
        src: "./static/img/hc-06.svg",
        width: 50,
        height: 50,
        alt: "BT",
      },
      {
        type: "field_dropdown",
        name: "UART",
        options: [
          ["UART0", "0"],
          ["UART1", "1"],
          ["UART2", "2"],
        ],
      },
      {
        type: "field_dropdown",
        name: "TX",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "RX",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "BAUD",
        options: [
          ["9600", "9600"],
          ["19200", "19200"],
          ["38400", "38400"],
          ["57600", "57600"],
          ["115200", "115200"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  },
  {
    type: "hc06_send",
    message0: "HC-06 enviar %1",
    args0: [
      {
        type: "input_value",
        name: "TEXT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  },
  {
    type: "hc06_read",
    message0: "HC-06 leer",
    output: "String",
    colour: 210,
  },
  {
    type: "hc06_any",
    message0: "HC-06 disponible",
    output: "Boolean",
    colour: 210,
  },

  {
    type: "uart_init",
    message0: "%1 id %2 TX %3 RX %4 baudios %5",
    args0: [
      { type: "field_input", name: "NAME", text: "uart" },
      {
        type: "field_dropdown",
        name: "UART",
        options: [
          ["UART0", "0"],
          ["UART1", "1"],
          ["UART2", "2"],
        ],
      },
      {
        type: "field_dropdown",
        name: "TX",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "RX",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "BAUD",
        options: [
          ["9600", "9600"],
          ["19200", "19200"],
          ["38400", "38400"],
          ["57600", "57600"],
          ["115200", "115200"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#7d0120",
  },
  {
    type: "uart_write",
    message0: "%1 escribir datos %2",
    args0: [
      { type: "field_input", name: "NAME", text: "uart" },
      {
        type: "input_value",
        name: "DATA",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#7d0120",
  },
  {
    type: "uart_read",
    message0: "%1 leer bytes %2",
    args0: [
      { type: "field_input", name: "NAME", text: "uart" },
      {
        type: "field_number",
        name: "NBYTES",
        value: 1,
        min: 1,
        max: 32,
      },
    ],
    output: "Array",
    colour: "#7d0120",
  },

  {
    type: "i2c_init",
    message0: "%1 id %2 SDA %3 SCL %4 freq %5",
    args0: [
      { type: "field_input", name: "NAME", text: "i2c" },
      {
        type: "field_dropdown",
        name: "ID",
        options: [
          ["0", "0"],
          ["1", "1"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SDA",
        options: [
          ["19", "19"],
          ["21", "21"],
          ["26", "26"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SCL",
        options: [
          ["18", "18"],
          ["22", "22"],
          ["25", "25"],
        ],
      },
      {
        type: "field_dropdown",
        name: "FREQ",
        options: [
          ["400000", "400000"],
          ["100000", "100000"],
          ["200000", "200000"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#5DADE2",
  },
  {
    type: "i2c_scan",
    message0: "%1 escanear",
    args0: [{ type: "field_input", name: "NAME", text: "i2c" }],
    output: "Array",
    colour: "#5DADE2",
  },
  {
    type: "i2c_write",
    message0: "%1 escribir a dir %2 datos %3",
    args0: [
      { type: "field_input", name: "NAME", text: "i2c" },
      {
        type: "field_number",
        name: "ADDR",
        value: 60,
        min: 0,
        max: 127,
      },
      {
        type: "input_value",
        name: "DATA",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#5DADE2",
  },
  {
    type: "i2c_read",
    message0: "%1 leer de dir %2 bytes %3",
    args0: [
      { type: "field_input", name: "NAME", text: "i2c" },
      {
        type: "field_number",
        name: "ADDR",
        value: 60,
        min: 0,
        max: 127,
      },
      {
        type: "field_number",
        name: "NBYTES",
        value: 1,
        min: 1,
        max: 32,
      },
    ],
    output: "Array",
    colour: "#5DADE2",
  },

  {
    type: "spi_init",
    message0: "%1 SCK %2 MOSI %3 MISO %4 baudios %5",
    args0: [
      { type: "field_input", name: "NAME", text: "spi" },
      {
        type: "field_dropdown",
        name: "SCK",
        options: [
          ["18", "18"],
          ["14", "14"],
        ],
      },
      {
        type: "field_dropdown",
        name: "MOSI",
        options: [
          ["23", "23"],
          ["13", "13"],
        ],
      },
      {
        type: "field_dropdown",
        name: "MISO",
        options: [
          ["19", "19"],
          ["12", "12"],
        ],
      },
      {
        type: "field_dropdown",
        name: "BAUD",
        options: [
          ["1000000", "1000000"],
          ["5000000", "5000000"],
          ["10000000", "10000000"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#48C9B0",
  },
  {
    type: "spi_write",
    message0: "%1 escribir %2",
    args0: [
      { type: "field_input", name: "NAME", text: "spi" },
      {
        type: "input_value",
        name: "DATA",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#48C9B0",
  },
  {
    type: "spi_read",
    message0: "%1 leer bytes %2",
    args0: [
      { type: "field_input", name: "NAME", text: "spi" },
      {
        type: "field_number",
        name: "N",
        value: 1,
        min: 1,
        max: 1024,
      },
    ],
    output: "Array",
    colour: "#48C9B0",
  },
  {
    type: "i2s_init",
    message0: "%1 BCLK %2 WS %3 SD %4 rate %5",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "i2s",
      },
      {
        type: "field_dropdown",
        name: "BCLK",
        options: [
          ["26", "26"],
          ["14", "14"],
        ],
      },
      {
        type: "field_dropdown",
        name: "WS",
        options: [
          ["25", "25"],
          ["15", "15"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SD",
        options: [
          ["22", "22"],
          ["32", "32"],
        ],
      },
      {
        type: "field_dropdown",
        name: "RATE",
        options: [
          ["16000", "16000"],
          ["22050", "22050"],
          ["44100", "44100"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#AF7AC5",
  },
  {
    type: "i2s_write",
    message0: "%1 escribir buffer %2",
    args0: [
      { type: "field_input", name: "NAME", text: "i2s" },
      {
        type: "input_value",
        name: "BUF",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#AF7AC5",
  },
  {
    type: "onewire_init",
    message0: "OneWire en Pin %1",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#48C9B0",
  },
  {
    type: "onewire_scan",
    message0: "escanear dispositivos %1 OneWire",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    output: "Array",
    colour: "#48C9B0",
  },
  {
    type: "onewire_reset",
    message0: "reset bus %1 OneWire",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#48C9B0",
  },
  {
    type: "onewire_readbyte",
    message0: "leer byte %1 OneWire",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    output: "Number",
    colour: "#48C9B0",
  },
  {
    type: "onewire_writebyte",
    message0: "escribir %1 byte %2",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "input_value",
        name: "BYTE",
        check: "Number",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#48C9B0",
  },
  {
    type: "onewire_write",
    message0: "escribir %1 datos %2",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "input_value",
        name: "DATA",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#48C9B0",
  },
  {
    type: "onewire_select_rom",
    message0: "seleccionar %1 ROM %2",
    args0: [
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "input_value",
        name: "ROM",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#48C9B0",
  },
  {
    type: "can_init",
    message0: "CAN TX %1 RX %2 baudios %3",
    args0: [
      {
        type: "field_dropdown",
        name: "TX",
        options: [
          ["5", "5"],
          ["21", "21"],
        ],
      },
      {
        type: "field_dropdown",
        name: "RX",
        options: [
          ["4", "4"],
          ["22", "22"],
        ],
      },
      {
        type: "field_dropdown",
        name: "BAUD",
        options: [
          ["125000", "125000"],
          ["250000", "250000"],
          ["500000", "500000"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#EC7063",
  },

  {
    type: "can_send",
    message0: "CAN enviar id %1 datos %2",
    args0: [
      {
        type: "field_number",
        name: "ID",
        value: 1,
      },
      {
        type: "input_value",
        name: "DATA",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#EC7063",
  },
  {
    type: "wifi_init",
    message0: "%1 inicializar WiFi como %2 modo %3",
    args0: [
      {
        type: "field_image",
        src: "./static/img/espwifi.png",
        width: 50,
        height: 50,
        alt: "W",
      },
      {
        type: "field_dropdown",
        name: "VAR",
        options: [
          ["sta_if", "sta_if"],
          ["wlan", "wlan"],
        ],
      },
      {
        type: "field_dropdown",
        name: "MODE",
        options: [
          ["STA_IF", "STA_IF"],
          ["AP_IF", "AP_IF"],
          ["Genérico", "GENERIC"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
    tooltip: "Inicializa la interfaz WiFi (cliente o access point)",
  },
  {
    type: "wifi_connect",
    message0: "%1 conectar %2 SSID %3 contraseña %4",
    args0: [
      {
        type: "field_image",
        src: "./static/img/espwifi.png",
        width: 50,
        height: 50,
        alt: "US",
      },
      {
        type: "field_dropdown",
        name: "VAR",
        options: [
          ["sta_if", "sta_if"],
          ["wlan", "wlan"],
        ],
      },
      {
        type: "field_input",
        name: "SSID",
        text: "miWiFi",
      },
      {
        type: "field_input",
        name: "PASS",
        text: "12345678",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  },
  {
    type: "wifi_ap",
    message0: "%1 Access Point nombre %2 contraseña %3 IP %4 máscara %5",
    args0: [
      {
        type: "field_image",
        src: "./static/img/espwifi.png",
        width: 50,
        height: 50,
        alt: "AP",
      },
      {
        type: "field_input",
        name: "AP_SSID",
        text: "ESP32_AP",
      },
      {
        type: "field_input",
        name: "AP_PASS",
        text: "12345678",
      },
      {
        type: "field_input",
        name: "AP_IP",
        text: "192.168.0.1",
      },
      {
        type: "field_input",
        name: "AP_SUBNET",
        text: "255.255.255.0",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
    tooltip: "Configura un Access Point con IP personalizada",
  },
  {
    type: "wifi_start_ap",
    message0: "iniciar Access Point",
    previousStatement: null,
    nextStatement: null,
    colour: 210,
    tooltip: "Inicia el punto de acceso WiFi configurado previamente",
  },
  {
    type: "wifi_scan",
    message0: "%1 WiFi escanear redes",
    args0: [
      {
        type: "field_dropdown",
        name: "VAR",
        options: [
          ["sta_if", "sta_if"],
          ["wlan", "wlan"],
        ],
      },
    ],
    output: "Array",
    colour: 210,
    tooltip: "Escanea redes WiFi disponibles",
  },
  {
    type: "wifi_isconnected",
    message0: "%1 WiFi conectado?",
    args0: [
      {
        type: "field_dropdown",
        name: "VAR",
        options: [
          ["sta_if", "sta_if"],
          ["wlan", "wlan"],
        ],
      },
    ],
    output: "Boolean",
    colour: 210,
    tooltip: "Verifica si está conectado a WiFi",
  },
  {
    type: "wifi_current_ip",
    message0: "%1 WiFi IP actual",
    args0: [
      {
        type: "field_dropdown",
        name: "VAR",
        options: [
          ["sta_if", "sta_if"],
          ["wlan", "wlan"],
        ],
      },
    ],
    output: "String",
    colour: 210,
    tooltip: "Obtiene la dirección IP actual",
  },
  {
    type: "wifi_disconnect",
    message0: "%1 WiFi desconectar",
    args0: [
      {
        type: "field_dropdown",
        name: "VAR",
        options: [
          ["sta_if", "sta_if"],
          ["wlan", "wlan"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
    tooltip: "Desconecta del WiFi",
  },
  {
    type: "wifi_define_connect",
    message0: "definir conexión WiFi SSID %1 contraseña %2",
    args0: [
      {
        type: "field_input",
        name: "SSID",
        text: "miWiFi",
      },
      {
        type: "field_input",
        name: "PASS",
        text: "12345678",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
    tooltip: "Define una función do_connect() para conectarse a WiFi",
  },
  {
    type: "wifi_call_connect",
    message0: "conectar WiFi (do_connect)",
    previousStatement: null,
    nextStatement: null,
    colour: 210,
    tooltip: "Ejecuta la función do_connect()",
  },
  {
    type: "socket_create",
    message0: "%1 %2 familia %3 tipo %4 protocolo %5",
    args0: [
      {
        type: "field_input",
        name: "VAR",
        text: "s",
      },
      {
        type: "field_image",
        src: "./static/img/httpclient.png",
        width: 50,
        height: 50,
        alt: "US",
      },
      {
        type: "field_dropdown",
        name: "FAMILY",
        options: [
          ["AF_INET", "AF_INET"],
          ["AF_INET6", "AF_INET6"],
        ],
      },
      {
        type: "field_dropdown",
        name: "TYPE",
        options: [
          ["SOCK_STREAM", "SOCK_STREAM"],
          ["SOCK_DGRAM", "SOCK_DGRAM"],
        ],
      },
      {
        type: "field_dropdown",
        name: "PROTO",
        options: [
          ["IPPROTO_TCP", "IPPROTO_TCP"],
          ["IPPROTO_UDP", "IPPROTO_UDP"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "socket_connect",
    message0: "%1 conectar IP %2 puerto %3",
    args0: [
      {
        type: "field_input",
        name: "VAR",
        text: "s",
      },
      {
        type: "field_input",
        name: "IP",
        text: "192.168.0.1",
      },
      {
        type: "field_input",
        name: "PORT",
        text: "80",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "socket_send",
    message0: "%1 enviar %2",
    args0: [
      {
        type: "field_input",
        name: "VAR",
        text: "s",
      },
      {
        type: "input_value",
        name: "DATA",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "socket_sendall",
    message0: "%1 enviar todo%2",
    args0: [
      {
        type: "field_input",
        name: "VAR",
        text: "s",
      },
      {
        type: "input_value",
        name: "DATA",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "socket_receive",
    message0: "%1 recibir tamaño %2",
    args0: [
      {
        type: "field_input",
        name: "VAR",
        text: "s",
      },
      {
        type: "field_input",
        name: "SIZE",
        text: "1024",
      },
    ],
    output: null,
    colour: 20,
  },
  {
    type: "socket_close",
    message0: "%1 cerrar",
    args0: [
      {
        type: "field_input",
        name: "VAR",
        text: "s",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "socket_bind",
    message0: "%1 bind IP %2 puerto %3",
    args0: [
      {
        type: "field_input",
        name: "VAR",
        text: "s",
      },
      {
        type: "field_input",
        name: "IP",
        text: "0.0.0.0",
      },
      {
        type: "field_input",
        name: "PORT",
        text: "80",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "socket_listen",
    message0: "%1 escuchar max %2",
    args0: [
      {
        type: "field_input",
        name: "VAR",
        text: "s",
      },
      {
        type: "field_input",
        name: "BACKLOG",
        text: "5",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "socket_accept",
    message0: "%1 aceptar %2 dirección %3",
    args0: [
      {
        type: "field_input",
        name: "VAR",
        text: "s",
      },
      {
        type: "field_variable",
        name: "CONN",
        variable: "conexion",
      },
      {
        type: "field_variable",
        name: "ADDR",
        variable: "addr",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },

  {
    type: "init_espnow_simple",
    message0: "%1 iniciar",
    args0: [
      {
        type: "field_image",
        src: "./static/img/espnow.png",
        width: 50,
        height: 50,
        alt: "ESP-NOW",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 270,
  },
  {
    type: "peer",
    message0: "Mac remoto %1",
    args0: [
      {
        type: "field_input",
        name: "PEER_BYTES",
        text: "b'\\xff\\xff\\xff\\xff\\xff\\xff'",
      },
    ],
    output: "String",
    colour: 270,
  },
  {
    type: "espnow_add_peer",
    message0: "ESP-NOW agregar peer %1",
    args0: [{ type: "input_value", name: "PEER" }],
    previousStatement: null,
    nextStatement: null,
    colour: 270,
  },
  {
    type: "espnow_send_peer",
    message0: "ESP-NOW enviar a %1 mensaje %2",
    args0: [
      { type: "input_value", name: "PEER" },
      { type: "input_value", name: "TEXT" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 270,
  },
  {
    type: "espnow_recv",
    message0: "ESP-NOW recibir en %1 , %2",
    args0: [
      {
        type: "field_variable",
        name: "HOST",
        variable: "host",
      },
      {
        type: "field_variable",
        name: "MSG",
        variable: "msg",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 270,
  },
  {
    type: "ble_init_uart",
    message0: "%1 iniciar UART",
    args0: [
      {
        type: "field_image",
        src: "./static/img/ble_serial.png",
        width: 50,
        height: 50,
        alt: "BLE",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260,
  },
  {
    type: "ble_set_name",
    message0: "BLE nombre %1",
    args0: [
      {
        type: "field_input",
        name: "BLE_NAME",
        text: "P!t_Car_5",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260,
  },
  {
    type: "ble_read",
    message0: "BLE leer datos",
    output: "String",
    colour: 260,
  },
  {
    type: "ble_on_receive",
    message0: "BLE %1 al recibir guardar en %2",
    args0: [
      {
        type: "field_input",
        name: "FUNCION",
        text: "datos_recibidos",
      },
      {
        type: "field_variable",
        name: "RX",
        variable: "rx_buffer",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260,
  },
  {
    type: "ble_write",
    message0: "BLE enviar %1",
    args0: [
      {
        type: "input_value",
        name: "DATA",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260,
  },
  {
    type: "bt_classic_init",
    message0: "%1 iniciar Bluetooth",
    args0: [
      {
        type: "field_image",
        src: "./static/img/bluetooth.png",
        width: 50,
        height: 50,
        alt: "Buetooth Classic",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 220,
    tooltip: "Inicia Bluetooth Classic SPP en modo esclavo. Requiere firmware shariltumin.",
    helpUrl: "https://github.com/shariltumin/esp32-bluetooth-classic-micropython"
  },
  {
    type: "bt_classic_slave",
    message0: "Bluetooth Esclavo: nombre %1 PIN %2",
    args0: [
      { type: "input_value", name: "NAME", check: "String" },
      { type: "input_value", name: "PIN", check: "String" }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 220,
    tooltip: "Inicializa ESP32 como esclavo BT Classic SPP.",
  },
  // ── MASTER init ──
  {
    type: "bt_classic_master",
    message0: "Bluetooth Maestro: nombre %1",
    args0: [
      { type: "input_value", name: "NAME", check: "String" },
    ],
    previousStatement: null, "nextStatement": null,
    colour: 220,
    tooltip: "Inicializa ESP32 como maestro BT Classic SPP."
  },
  // ── up() ──
  {
    type: "bt_classic_up",
    message0: "¿inicialización exitosa?",
    output: "Boolean",
    colour: 220,
    tooltip: "True si Bluetooth está listo, False si no."
  },
  // ── ready() ──
  {
    type: "bt_classic_ready",
    message0: "¿listo para enviar?",
    output: "Boolean",
    colour: 220,
    tooltip: "True si hay conexión activa y puede enviar datos."
  },
  // ── open() — solo maestro ──
  {
    type: "bt_classic_open",
    message0: "Conectar a esclavo %1 PIN %2",
    args0: [
      { type: "input_value", name: "NAME", check: "String" },
      { type: "input_value", name: "PIN",  check: "String" }
    ],
    previousStatement: null, "nextStatement": null,
    colour: 220,
    tooltip: "Maestro: conecta al esclavo por nombre y PIN."
  },
  // ── send_str() ──
  {
    type: "bt_classic_send_str",
    message0: "Enviar texto %1",
    args0: [
      { type: "input_value", name: "MSG", check: "String" }
    ],
    previousStatement: null, "nextStatement": null,
    colour: 220,
    tooltip: "Envía un string (máx 990 caracteres)."
  },
  // ── send_bin() ──
  {
    type: "bt_classic_send_bin",
    message0: "Enviar bytes %1",
    args0: [
      { type: "input_value", name: "DATA", check: "String" }
    ],
    previousStatement: null, "nextStatement": null,
    colour: 220,
    tooltip: "Envía bytearray (máx 990 bytes)."
  },
  // ── data() ──
  {
    type: "bt_classic_data",
    message0: "Bytes en buffer",
    output: "Number",
    colour: 220,
    tooltip: "Retorna cantidad de bytes disponibles en el buffer (0 si vacío, máx 1024)."
  },
  // ── get_str() ──
  {
    type: "bt_classic_get_str",
    message0: "Leer texto máx %1 bytes",
    args0: [
      { type: "input_value", name: "N", check: "Number" }
    ],
    output: "String",
    colour: 220,
    tooltip: "Lee hasta N bytes del buffer como string."
  },
  // ── get_bin() ──
  {
    type: "bt_classic_get_bin",
    message0: "Leer bytes máx %1",
    args0: [
      { type: "input_value", name: "N", check: "Number" }
    ],
    output: null,
    colour: 220,
    tooltip: "Lee hasta N bytes del buffer como bytes."
  },
  // ── close() ──
  {
    type: "bt_classic_close",
    message0: "Cerrar Esclavo",
    previousStatement: null, "nextStatement": null,
    colour: 220,
    tooltip: "Cierra la conexión activa."
  },
  // ── deinit() ──
  {
    type: "bt_classic_deinit",
    message0: "Desactiva Esclavo",
    previousStatement: null, "nextStatement": null,
    colour: 220,
    tooltip: "Desactiva completamente el Bluetooth (útil antes de deep-sleep)."
  },
  {
    type: "bt_classic_master_close",
    message0: "Cierra Maestro",
    previousStatement: null, "nextStatement": null,
    colour: 220,
    tooltip: "Cierra la conexión activa."
  },
  {
    type: "bt_classic_master_deinit",
    message0: "Desactiva Maestro",
    previousStatement: null, "nextStatement": null,
    colour: 220,
    tooltip: "Desactiva completamente el Bluetooth (útil antes de deep-sleep)."
  },
  {
    type: "portal_init",
    message0: "Portal cautivo iniciar",
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "DNSQuery",
    message0: "DNS server",
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "portal_dns_server",
    message0: "Portal iniciar DNS",
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "portal_http_server",
    message0: "Portal iniciar servidor %1 %2 %3",
    args0: [
      {
        type: "field_input",
        name: "INDEX",
        text: "index",
      },
      {
        type: "field_variable",
        name: "TIPO",
        variable: "tipo",
      },
      {
        type: "field_variable",
        name: "VALOR",
        variable: "valor",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "portal_main",
    message0: "Run Main",
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },

  {
    type: "seg7_init",
    message0: "%1 %2 tipo %3 A %4 B %5 C %6 D %7 E %8 F %9 G %10",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "display",
      },
      {
        type: "field_image",
        src: "./static/img/display7.svg",
        width: 50,
        height: 50,
        alt: "7SEG",
      },
      {
        type: "field_dropdown",
        name: "TYPE",
        options: [
          ["cátodo común", "CC"],
          ["ánodo común", "CA"],
        ],
      },
      {
        type: "field_dropdown",
        name: "A",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_dropdown",
        name: "B",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_dropdown",
        name: "C",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_dropdown",
        name: "D",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_dropdown",
        name: "E",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_dropdown",
        name: "F",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
      {
        type: "field_dropdown",
        name: "G",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#c6bcbc",
  },

  {
    type: "seg7_clear",
    message0: "%1 limpiar",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "display",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#c6bcbc",
  },

  {
    type: "seg7_number",
    message0: "%1 número %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "display",
      },
      {
        type: "field_dropdown",
        name: "NUM",
        options: [
          ["0", "0"],
          ["1", "1"],
          ["2", "2"],
          ["3", "3"],
          ["4", "4"],
          ["5", "5"],
          ["6", "6"],
          ["7", "7"],
          ["8", "8"],
          ["9", "9"],
        ],
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#c6bcbc",
  },
  {
    name: "lcd_init",
    type: "lcd_init",
    message0: "%1 %2 RS %3 EN %4 D4 %5 D5 %6 D6 %7 D7 %8",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd",
      },
      {
        type: "field_image",
        src: "./static/img/lcd16x2.svg",
        width: 100,
        height: 40,
        alt: "LCD",
      },
      {
        type: "field_dropdown",
        name: "RS",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "EN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "D4",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "D5",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "D6",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "D7",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "lcd_print",
    message0: "%1 %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd",
      },
      {
        type: "input_value",
        name: "TEXT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "lcd_print_align",
    message0: "%1 %2 %3",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd",
      },
      {
        type: "input_value",
        name: "TEXT",
      },
      {
        type: "field_dropdown",
        name: "ALIGN",
        options: [
          ["normal", "0"],
          ["izquierda", "1"],
          ["centro", "2"],
          ["derecha", "3"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "lcd_clear",
    message0: "%1 limpiar",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "lcd_cursor",
    message0: "%1 cursor columna %2 fila %3",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd",
      },
      {
        type: "input_value",
        name: "COL",
      },
      {
        type: "input_value",
        name: "ROW",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "lcd_line",
    message0: "%1 ir a línea %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd",
      },
      {
        type: "field_dropdown",
        name: "LINE",
        options: [
          ["0", "0"],
          ["1", "1"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "lcd_home",
    message0: "%1 ir inicio",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "lcd_move_left",
    message0: "%1 mover pantalla izquierda",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "lcd_move_right",
    message0: "%1 mover pantalla derecha",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "lcd_enable",
    message0: "%1 pantalla %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "display",
      },
      {
        type: "field_dropdown",
        name: "STATE",
        options: [
          ["encender", "True"],
          ["apagar", "False"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "lcd_blink",
    message0: "%1 parpadear %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "display",
      },
      {
        type: "field_dropdown",
        name: "STATE",
        options: [
          ["activar", "True"],
          ["desactivar", "False"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "lcd_underline",
    message0: "%1 cursor subrayado %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd",
      },
      {
        type: "field_dropdown",
        name: "STATE",
        options: [
          ["activar", "True"],
          ["desactivar", "False"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "lcd_i2c_init",
    message0:
      "%1 %2 id %3 SDA %4 SCL %5 dirección %6 num_lineas%7, num_columnas%8",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd_i2c",
      },
      {
        type: "field_image",
        src: "./static/img/lcd_16x2_i2c.svg",
        width: 100,
        height: 40,
        alt: "LCD_I2C",
      },
      {
        type: "field_dropdown",
        name: "ID",
        options: [
          ["0", "0"],
          ["1", "1"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SDA",
        options: [
          ["21", "21"],
          ["19", "19"],
          ["26", "26"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SCL",
        options: [
          ["18", "18"],
          ["22", "22"],
          ["25", "25"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ADDR",
        options: [
          ["0x20", "0x20"],
          ["0x23", "0x23"],
          ["0x27", "0x27"],
          ["0x3f", "0x3f"],
          ["0x3C", "0x3C"],
          ["0x3D", "0x3D"],
          ["0x68", "0x68"],
          ["0x76", "0x76"],
        ],
      },
      { type: "field_input", name: "num_lines", text: "2" },
      { type: "field_input", name: "num_columns", text: "16" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "lcd_i2c_print",
    message0: "%1 escribir %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd_i2c",
      },
      {
        type: "input_value",
        name: "TEXT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "lcd_i2c_clear",
    message0: "%1 limpiar pantalla",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd_i2c",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "lcd_i2c_cursor",
    message0: "%1 cursor columna %2 fila %3",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd_i2c",
      },
      {
        type: "input_value",
        name: "COL",
      },
      {
        type: "input_value",
        name: "ROW",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "lcd_i2c_display",
    message0: "%1 pantalla %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd_i2c",
      },
      {
        type: "field_dropdown",
        name: "STATE",
        options: [
          ["encender", "on"],
          ["apagar", "off"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "lcd_i2c_blink",
    message0: "%1 cursor parpadeo %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd_i2c",
      },
      {
        type: "field_dropdown",
        name: "STATE",
        options: [
          ["activar", "on"],
          ["desactivar", "off"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "lcd_i2c_cursor_show",
    message0: "%1 cursor %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "lcd_i2c",
      },
      {
        type: "field_dropdown",
        name: "STATE",
        options: [
          ["mostrar", "show"],
          ["ocultar", "hide"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "oled_init",
    message0: "%1 %2 id %3 SDA %4 SCL %5 dirección %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "oled",
      },
      {
        type: "field_image",
        src: "./static/img/oled.svg",
        width: 50,
        height: 50,
        alt: "OLED",
      },
      {
        type: "field_dropdown",
        name: "ID",
        options: [
          ["0", "0"],
          ["1", "1"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SDA",
        options: [
          ["21", "21"],
          ["19", "19"],
          ["26", "26"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SCL",
        options: [
          ["18", "18"],
          ["22", "22"],
          ["25", "25"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ADDR",
        options: [
          ["0x20", "0x20"],
          ["0x23", "0x23"],
          ["0x27", "0x27"],
          ["0x3f", "0x3f"],
          ["0x3C", "0x3C"],
          ["0x3D", "0x3D"],
          ["0x68", "0x68"],
          ["0x76", "0x76"],
        ],
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "oled_text",
    message0: "%1 texto %2 x %3 y %4",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "oled",
      },
      { type: "input_value", name: "TEXT" },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "oled_text20",
    message0: "%1 texto grande %2 x %3 y %4",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "oled",
      },
      { type: "input_value", name: "TEXT" },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "oled_clear",
    message0: "%1 limpiar",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "oled",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "oled_pixel",
    message0: "%1 pixel x %2 y %3 estado %4",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "oled",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      {
        type: "field_dropdown",
        name: "STATE",
        options: [
          ["encendido", "1"],
          ["apagado", "0"],
        ],
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "oled_line",
    message0: "%1 linea x %2 y %3 x1 %4 y1 %5",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "oled",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "X1" },
      { type: "input_value", name: "Y1" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "oled_rect",
    message0: "%1 rect x %2 y %3 w %4 h %5",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "oled",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "W" },
      { type: "input_value", name: "H" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "oled_fill_rect",
    message0: "%1 rect lleno x %2 y %3 w %4 h %5",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "oled",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "W" },
      { type: "input_value", name: "H" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "oled_circle",
    message0: "%1 circulo x %2 y %3 r %4",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "oled",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "R" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "oled_scroll",
    message0: "%1 scroll dx %2 dy %3",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "oled",
      },
      {
        type: "input_value",
        name: "DX",
      },
      {
        type: "input_value",
        name: "DY",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "oled_contrast",
    message0: "%1 contraste %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "oled",
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "points_xy",
    message0: "puntos [x,y] %1",
    args0: [
      {
        type: "field_input",
        name: "POINTS",
        text: "[0,0,20,0,10,20,0,0]",
      },
    ],
    output: "List",
    colour: "#F39C12",
  },
  {
    type: "oled_poly",
    message0: "%1 poligono x %2 y %3 vertices %4 color %5 relleno %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "oled",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "POINTS" },
      {
        type: "field_dropdown",
        name: "COLOR",
        options: [
          ["encender", "1"],
          ["apagar", "0"],
        ],
      },
      {
        type: "field_dropdown",
        name: "FILL",
        options: [
          ["no", "False"],
          ["si", "True"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "oled_icon_value",
    message0: "ícono %1",
    args0: [
      {
        type: "field_icon_grid",
        name: "ICON",
        value: "0",
      },
    ],
    output: "Icon",
    colour: "#26A69A",
  },
  {
    type: "oled_icon",
    message0: "%1 ícono %2 x %3 y %4 tamaño %5",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "oled",
      },
      {
        type: "input_value",
        name: "ICON",
        check: "Icon",
      },
      {
        type: "input_value",
        name: "X",
      },
      {
        type: "input_value",
        name: "Y",
      },
      {
        type: "field_dropdown",
        name: "SIZE",
        options: [
          ["12", "1"],
          ["24", "2"],
          ["36", "3"],
          ["48", "4"],
          ["60", "5"],
          ["72", "6"],
          ["84", "7"],
          ["96", "8"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    inputsInline: true,
    colour: "#26A69A",
  },

  {
    type: "matrix8_init",
    message0: "%1 %2 DIN %3 CS %4 CLK %5 Ancho %6 largo %7",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "matrix8x8",
      },
      {
        type: "field_image",
        src: "./static/img/matrix8x8.svg",
        width: 50,
        height: 50,
        alt: "MAX7219",
      },
      {
        type: "field_dropdown",
        name: "DIN", //MOSI
        options: [
          ["13", "13"],
          ["23", "23"],
        ],
      },
      {
        type: "field_dropdown",
        name: "CS",
        options: [
          ["4", "4"],
          ["5", "5"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SCK",
        options: [
          ["14", "14"],
          ["18", "18"],
        ],
      },
      {
        type: "field_dropdown",
        name: "WIDTH",
        options: [
          ["8", "8"],
          ["16", "16"],
          ["24", "24"],
          ["32", "32"],
        ],
      },
      {
        type: "field_dropdown",
        name: "HEIGHT",
        options: [["8", "8"]],
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "matrix8_clear",
    message0: "%1 limpiar matrix",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "matrix8x8",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "matrix8_text",
    message0: "%1 texto %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "matrix8x8",
      },
      {
        type: "input_value",
        name: "TEXT",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "matrix8_scroll_text",
    message0: "%1 texto desplazamiento %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "matrix8x8",
      },
      {
        type: "input_value",
        name: "TEXT",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "matrix8_pixel",
    message0: "%1 pixel x %2 y %3 estado %4",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "matrix8x8",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "STATE" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "matrix8_line",
    message0: "%1 linea x1 %2 y1 %3 x2 %4 y2 %5",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "matrix8x8",
      },
      { type: "input_value", name: "X1" },
      { type: "input_value", name: "Y1" },
      { type: "input_value", name: "X2" },
      { type: "input_value", name: "Y2" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "matrix8_rect",
    message0: "%1 rectangulo x %2 y %3 ancho %4 alto %5",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "matrix8x8",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "W" },
      { type: "input_value", name: "H" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "matrix8_brightness",
    message0: "%1 brillo %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "matrix8x8",
      },
      { type: "input_value", name: "VALUE" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "max_icon",
    message0: "%1 Matriz 8x8",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "matrix8x8",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
    tooltip: "Matriz 8x8 de LEDs (blanco = apagado, negro = encendido)",
    helpUrl: "",
    extensions: ["matrix_8x8_extension2"],
  },

  {
    type: "tm1637_init",
    message0: "%1 %2 iniciar CLK %3 DIO %4 brillo %5",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tm1637",
      },
      {
        type: "field_image",
        src: "./static/img/tm1637.svg",
        width: 60,
        height: 50,
        alt: "MAX7219",
      },
      {
        type: "field_dropdown",
        name: "SDA",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SCL",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "BRIGHT",
        options: [
          ["0", "0"],
          ["1", "1"],
          ["2", "2"],
          ["3", "3"],
          ["4", "4"],
          ["5", "5"],
          ["6", "6"],
          ["7", "7"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },

  {
    type: "tm1637_brightness",
    message0: "%1 brillo valor %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tm1637",
      },
      {
        type: "input_value",
        name: "BRIGHT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },

  {
    type: "tm1637_number",
    message0: "%1 mostrar valor %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tm1637",
      },
      {
        type: "input_value",
        name: "NUM",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "tm1637_clear",
    message0: "%1 limpiar pantalla",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tm1637",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "tm1637_numbers",
    message0: "%1 números num1 %2 num2 %3",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tm1637",
      },
      {
        type: "input_value",
        name: "NUM1",
      },
      {
        type: "input_value",
        name: "NUM2",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },

  {
    type: "tm1637_show",
    message0: "%1 mostrar texto %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tm1637",
      },
      {
        type: "input_value",
        name: "TEXT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },

  {
    type: "tm1637_scroll",
    message0: "%1 scroll texto %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tm1637",
      },
      {
        type: "input_value",
        name: "TEXT",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },

  {
    type: "tm1637_temperature",
    message0: "%1 temperatura valor %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tm1637",
      },
      {
        type: "input_value",
        name: "TEMP",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },

  {
    type: "neopixel_init",
    message0: "%1 pin %2 cantidad %3",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "np",
      },
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["1", "1"],
          ["2", "2"],
          ["3", "3"],
          ["4", "4"],
          ["5", "5"],
          ["6", "6"],
          ["7", "7"],
          ["8", "8"],
          ["9", "9"],
          ["10", "10"],
          ["11", "11"], 
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["20", "20"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
          ["40", "40"],
          ["41", "41"],
          ["42", "42"],
          ["43", "43"],
          ["44", "44"],
          ["45", "45"],
          ["46", "46"],
          ["47", "47"],
          ["48", "48"],
        ],
      },
      {
        type: "input_value",
        name: "NUM",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "neopixel_pixel_x",
    message0: "%1 pixel x %2 color %3",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "np",
      },
      { type: "input_value", name: "X", text: "0" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "neopixel_write",
    message0: "%1 mostrar",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "np",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "neopixel_init_5x5",
    message0: "%1 %2 pin %3 layout %4 rotación %5",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "neopixel5x5",
      },
      {
        type: "field_image",
        src: "./static/img/neopixel5x5.svg",
        width: 50,
        height: 50,
        alt: "NEOPIXEL55",
      },
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "LAYOUT",
        options: [
          ["Horizontal →", "0"],
          ["Horizontal ZigZag ↔", "1"],
          ["Vertical ↓", "2"],
          ["Vertical ZigZag ↕", "3"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ROT",
        options: [
          ["0°", "0"],
          ["90°", "90"],
          ["180°", "180"],
          ["270°", "270"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "neopixel_init_8x8",
    message0: "%1 %2 pin %3 layout %4 rotación %5",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "neopixel5x5",
      },
      {
        type: "field_image",
        src: "./static/img/neopixel8x8.svg",
        width: 50,
        height: 50,
        alt: "NEOPIXEL88",
      },
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "LAYOUT",
        options: [
          ["Horizontal →", "0"],
          ["Horizontal ZigZag ↔", "1"],
          ["Vertical ↓", "2"],
          ["Vertical ZigZag ↕", "3"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ROT",
        options: [
          ["0°", "0"],
          ["90°", "90"],
          ["180°", "180"],
          ["270°", "270"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "neopixel_show",
    message0: "%1 mostrar",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "neopixel5x5",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "neopixel_clear",
    message0: "%1 limpiar",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "neopixel5x5",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "neopixel_pixel",
    message0: "%1 pixel x %2 y %3 color %4",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "neopixel5x5",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "neopixel_line",
    message0: "%1 linea x %2 y %3 x1 %4 y1 %5 color %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "neopixel5x5",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "X1" },
      { type: "input_value", name: "Y1" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "neopixel_rect",
    message0: "%1 rect x %2 y %3 w %4 h %5 color %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "neopixel5x5",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "W" },
      { type: "input_value", name: "H" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "neopixel_fill_rect",
    message0: "%1 rect lleno x %2 y %3 w %4 h %5 color %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "neopixel5x5",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "W" },
      { type: "input_value", name: "H" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "neopixel_text",
    message0: "%1 texto %2 x %3 y %4 fg %5 bg %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "neopixel5x5",
      },
      { type: "input_value", name: "TEXT" },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "COLOR", check: "Colour" },
      { type: "input_value", name: "COLOR_BG", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "neopixel_scroll",
    message0: "%1 scroll dx %2 dy %3",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "neopixel5x5",
      },
      { type: "input_value", name: "DX" },
      { type: "input_value", name: "DY" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },
  {
    type: "neopixel_fill",
    message0: "%1 fill color %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "neopixel5x5",
      },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "neopixel_blit",
    message0: "%1 blit buffer %2 x %3 y %4",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "neopixel5x5",
      },
      { type: "input_value", name: "BUFFER" },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "neopixel_ellipse",
    message0: "%1 ellipse x %2 y %3 rx %4 ry %5 color %6 fill %7",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "neopixel5x5",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "RX" },
      { type: "input_value", name: "RY" },
      { type: "input_value", name: "COLOR", check: "Colour" },
      {
        type: "field_checkbox",
        name: "FILL",
        checked: false,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "neopixel_poly",
    message0: "%1 poly vertices %2 x %3 y %4 color %5 fill %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "neopixel5x5",
      },
      { type: "input_value", name: "VERTICES" },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "COLOR", check: "Colour" },
      {
        type: "field_checkbox",
        name: "FILL",
        checked: false,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#26A69A",
  },

  {
    type: "neopixel_5x5",
    message0: "%1",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "neopixel5x5",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: "Matriz 5x5 de LEDs con campos de checkbox",
    helpUrl: "",
    extensions: ["matrix_5x5_extension"],
  },
  {
    type: "neopixel_8x8",
    message0: "%1 NeoPixel 8x8",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "neopixel5x5",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: "Matriz 8x8 de LEDs con campos de checkbox",
    helpUrl: "",
    extensions: ["matrix_8x8_extension"],
  },
  {
    type: "points",
    message0: "puntos (x,y) %1",
    args0: [
      {
        type: "field_input",
        name: "POINTS",
        text: "[(0,0),(20,0),(10,20),(0,0)]",
      },
    ],
    output: "List",
    colour: "#F39C12",
  },
  {
    type: "tft_init",
    message0: "%1 %2 MOSI %3 SCK %4 DC %5 RST %6 rotación %7",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tft",
      },
      {
        type: "field_image",
        src: "./static/img/tft240x240.svg",
        width: 50,
        height: 50,
        alt: "TFT",
      },
      {
        type: "field_dropdown",
        name: "MOSI",
        options: [
          ["23", "23"],
          ["19", "19"],
          ["13", "13"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SCK",
        options: [
          ["18", "18"],
          ["14", "14"],
          ["5", "5"],
        ],
      },
      {
        type: "field_dropdown",
        name: "DC",
        options: [
          ["21", "21"],
          ["22", "22"],
          ["27", "27"],
        ],
      },
      {
        type: "field_dropdown",
        name: "RST",
        options: [
          ["22", "22"],
          ["4", "4"],
          ["16", "16"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ROT",
        options: [
          ["0°", "0"],
          ["90°", "1"],
          ["180°", "2"],
          ["270°", "3"],
        ],
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#EF5350",
  },

  {
    type: "tft_fill",
    message0: "%1 color fondo %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tft",
      },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#EF5350",
  },

  {
    type: "tft_pixel",
    message0: "%1 pixel x %2 y %3 color %4",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tft",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#EF5350",
  },

  {
    type: "tft_line",
    message0: "%1 linea x1 %2 y1 %3 x2 %4 y2 %5 color %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tft",
      },
      { type: "input_value", name: "X1" },
      { type: "input_value", name: "Y1" },
      { type: "input_value", name: "X2" },
      { type: "input_value", name: "Y2" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#EF5350",
  },

  {
    type: "tft_rect",
    message0: "%1 rect x %2 y %3 ancho %4 alto %5 color %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tft",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "W" },
      { type: "input_value", name: "H" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#EF5350",
  },

  {
    type: "tft_fill_rect",
    message0: "%1 rect relleno x %2 y %3 ancho %4 alto %5 color %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tft",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "W" },
      { type: "input_value", name: "H" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#EF5350",
  },

  {
    type: "tft_circle",
    message0: "%1 circulo x %2 y %3 radio %4 color %5",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tft",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "R" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#EF5350",
  },

  {
    type: "tft_fill_circle",
    message0: "%1 circulo relleno x %2 y %3 radio %4 color %5",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tft",
      },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "R" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#EF5350",
  },

  {
    type: "tft_text",
    message0: "%1 font %2 texto %3 x %4 y %5 color %6 bg %7",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tft",
      },
      {
        type: "field_dropdown",
        name: "FONT",
        options: [
          ["vga_8x8", "vga_8x8"],
          ["vga1_16x32", "vga1_16x32"],
          ["vga1_bold_16x32", "vga1_bold_16x32"],
          ["vga2_bold_16x32", "vga2_bold_16x32"],
        ],
      },
      { type: "input_value", name: "TEXT" },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "COLOR", check: "Colour" },
      { type: "input_value", name: "COLOR_BG", check: "Colour" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#EF5350",
  },

  {
    type: "tft_icon",
    message0: "%1 icono %2 x %3 y %4 escala %5 color %6 bg color %7",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "tft",
      },
      { type: "input_value", name: "ICON" },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },

      {
        type: "field_dropdown",
        name: "SCALE",
        options: [
          ["12", "1"],
          ["24", "2"],
          ["36", "3"],
          ["48", "4"],
          ["60", "5"],
          ["72", "6"],
          ["84", "7"],
          ["96", "8"],
        ],
      },
      { type: "input_value", name: "COLOR", check: "Colour" },
      { type: "input_value", name: "COLOR_BG", check: "Colour" },
    ],

    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#EF5350",
  },
  {
    type: "tft_rotation",
    message0: "%1 rotación %2",
    args0: [
      { type: "field_input", name: "NAME", text: "tft" },
      {
        type: "field_dropdown",
        name: "ROT",
        options: [
          ["0°", "0"],
          ["90°", "1"],
          ["180°", "2"],
          ["270°", "3"],
        ],
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#EF5350",
  },
  {
    type: "tft_hline",
    message0: "%1 linea horizontal x %2 y %3 largo %4 color %5",
    args0: [
      { type: "field_input", name: "NAME", text: "tft" },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "W" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#EF5350",
  },
  {
    type: "tft_vline",
    message0: "%1 linea vertical x %2 y %3 alto %4 color %5",
    args0: [
      { type: "field_input", name: "NAME", text: "tft" },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "H" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#EF5350",
  },
  {
    type: "tft_bitmap",
    message0: "%1 bitmap %2 x %3 y %4",
    args0: [
      { type: "field_input", name: "NAME", text: "tft" },
      { type: "input_value", name: "BITMAP" },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#EF5350",
  },
  {
    type: "tft_polygon",
    message0: "%1 poligono puntos %2 x %3 y %4 color %5",
    args0: [
      { type: "field_input", name: "NAME", text: "tft" },
      { type: "input_value", name: "POINTS" },
      { type: "input_value", name: "X" },
      { type: "input_value", name: "Y" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#EF5350",
  },
  {
    type: "tft_fill_polygon",
    message0: "%1 llenar poligono puntos %2 cx %3 cy %4 color %5",
    args0: [
      { type: "field_input", name: "NAME", text: "tft" },
      { type: "input_value", name: "POINTS" },
      { type: "input_value", name: "CX" },
      { type: "input_value", name: "CY" },
      { type: "input_value", name: "COLOR", check: "Colour" },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: "#EF5350",
  },
  {
    type: "tft_polygon_center",
    message0: "%1 centro del poligono puntos %2",
    args0: [
      { type: "field_input", name: "NAME", text: "tft" },
      { type: "input_value", name: "POINTS" },
    ],
    inputsInline: true,
    output: null,
    colour: "#EF5350",
  },
  {
    type: "shield_set_motor",
    message0: "%1 pin direccionA %2 pin velocidadA %3 pin direccionB %4 pin velocidadB %5",
    args0: [
      {
        type: "field_image",
        src: "./static/img/shield_lafvin.jpg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "PINA",
        options: [
          ["0", "0"],
          ["2 A0", "2"],
          ["4 A1", "4"],
          ["5 D10", "5"],
          ["12 D8", "12"],
          ["13 D9", "13"],
          ["14 D7", "14"],
          ["16 D5", "16"],
          ["17 D4", "17"],
          ["18 D13", "18"],
          ["19 D12", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23 D11", "23"],
          ["25 D3", "25"],
          ["26 D2", "26"],
          ["27 D6", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34 A3", "34"],
          ["35 A2", "35"],
          ["36 A4", "36"],
          ["39 A5", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "PINPWMA",
        options: [
          ["0", "0"],
          ["2 A0", "2"],
          ["4 A1", "4"],
          ["5 D10", "5"],
          ["12 D8", "12"],
          ["13 D9", "13"],
          ["14 D7", "14"],
          ["16 D5", "16"],
          ["17 D4", "17"],
          ["18 D13", "18"],
          ["19 D12", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23 D11", "23"],
          ["25 D3", "25"],
          ["26 D2", "26"],
          ["27 D6", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34 A3", "34"],
          ["35 A2", "35"],
          ["36 A4", "36"],
          ["39 A5", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "PINB",
        options: [
          ["0", "0"],
          ["2 A0", "2"],
          ["4 A1", "4"],
          ["5 D10", "5"],
          ["12 D8", "12"],
          ["13 D9", "13"],
          ["14 D7", "14"],
          ["16 D5", "16"],
          ["17 D4", "17"],
          ["18 D13", "18"],
          ["19 D12", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23 D11", "23"],
          ["25 D3", "25"],
          ["26 D2", "26"],
          ["27 D6", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34 A3", "34"],
          ["35 A2", "35"],
          ["36 A4", "36"],
          ["39 A5", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "PINPWMB",
        options: [
          ["0", "0"],
          ["2 A0", "2"],
          ["4 A1", "4"],
          ["5 D10", "5"],
          ["12 D8", "12"],
          ["13 D9", "13"],
          ["14 D7", "14"],
          ["16 D5", "16"],
          ["17 D4", "17"],
          ["18 D13", "18"],
          ["19 D12", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23 D11", "23"],
          ["25 D3", "25"],
          ["26 D2", "26"],
          ["27 D6", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34 A3", "34"],
          ["35 A2", "35"],
          ["36 A4", "36"],
          ["39 A5", "39"],
        ],
      },
    ],
    colour: 260,
    previousStatement: null,
    nextStatement: null,
    tooltip: "Configura los pines para controlar dos motores con un shield de control de motores",
  },
  {
    type: "set_speed_motorA",
    message0: "Motor A dirección %1 velocidad %2",
    args0: [
      {
        type: "field_dropdown",
        name: "DIR",
        options: [
          ["Horario (1)", "1"],
          ["Antihorario (0)", "0"]
        ]
      },
      {
        type: "field_number",
        name: "SPEED",
        value: 500,
        min: 0,
        max: 1023
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260
  },
  {
    type: "set_speed_motorB",
    message0: "Motor B dirección %1 velocidad %2",
    args0: [
      {
        type: "field_dropdown",
        name: "DIR",
        options: [
          ["Horario (1)", "1"],
          ["Antihorario (0)", "0"]
        ]
      },
      {
        type: "field_number",
        name: "SPEED",
        value: 500,
        min: 0,
        max: 1023
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260
  },

  {
    type: "keypad_get_key",
    message0: "%1 leer",
    args0: [{ type: "field_input", name: "NAME", text: "teclado_4x4" }],
    output: "String",
    colour: 260,
    tooltip: "Devuelve la tecla presionada",
  },
  {
    type: "init_keypad_3x4",
    message0: "%1 %2 R1 %3 R2 %4 R3 %5 R4 %6 C1 %7 C2 %8 C3 %9",
    args0: [
      { type: "field_input", name: "NAME", text: "tecladoo_4x3" },
      {
        type: "field_image",
        src: "./static/img/keypad3x4.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "R1",
        options: [
          ["26", "26"],
          ["25", "25"],
          ["17", "17"],
          ["16", "16"],
          ["27", "27"],
          ["14", "14"],
          ["12", "12"],
          ["13", "13"],
        ],
      },
      {
        type: "field_dropdown",
        name: "R2",
        options: [
          ["25", "25"],
          ["26", "26"],
          ["17", "17"],
          ["16", "16"],
          ["27", "27"],
          ["14", "14"],
          ["12", "12"],
          ["13", "13"],
        ],
      },
      {
        type: "field_dropdown",
        name: "R3",
        options: [
          ["17", "17"],
          ["26", "26"],
          ["25", "25"],
          ["16", "16"],
          ["27", "27"],
          ["14", "14"],
          ["12", "12"],
          ["13", "13"],
        ],
      },
      {
        type: "field_dropdown",
        name: "R4",
        options: [
          ["16", "16"],
          ["26", "26"],
          ["25", "25"],
          ["17", "17"],
          ["27", "27"],
          ["14", "14"],
          ["12", "12"],
          ["13", "13"],
        ],
      },

      {
        type: "field_dropdown",
        name: "C1",
        options: [
          ["27", "27"],
          ["26", "26"],
          ["25", "25"],
          ["17", "17"],
          ["16", "16"],
          ["14", "14"],
          ["12", "12"],
          ["13", "13"],
        ],
      },
      {
        type: "field_dropdown",
        name: "C2",
        options: [
          ["14", "14"],
          ["26", "26"],
          ["25", "25"],
          ["17", "17"],
          ["16", "16"],
          ["27", "27"],
          ["12", "12"],
          ["13", "13"],
        ],
      },
      {
        type: "field_dropdown",
        name: "C3",
        options: [
          ["12", "12"],
          ["26", "26"],
          ["25", "25"],
          ["17", "17"],
          ["16", "16"],
          ["27", "27"],
          ["14", "14"],
          ["13", "13"],
        ],
      },
    ],

    previousStatement: null,
    nextStatement: null,
    colour: 260,
    tooltip: "Inicializar teclado matricial 4x3",
  },

  {
    type: "init_keypad_4x4",
    message0: "%1 %2 R1 %3 R2 %4 R3 %5 R4 %6 C1 %7 C2 %8 C3 %9 C4 %10",
    args0: [
      { type: "field_input", name: "NAME", text: "teclado_4x4" },
      {
        type: "field_image",
        src: "./static/img/keypad4x4.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "R1",
        options: [
          ["26", "26"],
          ["25", "25"],
          ["17", "17"],
          ["16", "16"],
          ["27", "27"],
          ["14", "14"],
          ["12", "12"],
          ["13", "13"],
        ],
      },
      {
        type: "field_dropdown",
        name: "R2",
        options: [
          ["25", "25"],
          ["26", "26"],
          ["17", "17"],
          ["16", "16"],
          ["27", "27"],
          ["14", "14"],
          ["12", "12"],
          ["13", "13"],
        ],
      },
      {
        type: "field_dropdown",
        name: "R3",
        options: [
          ["17", "17"],
          ["26", "26"],
          ["25", "25"],
          ["16", "16"],
          ["27", "27"],
          ["14", "14"],
          ["12", "12"],
          ["13", "13"],
        ],
      },
      {
        type: "field_dropdown",
        name: "R4",
        options: [
          ["16", "16"],
          ["26", "26"],
          ["25", "25"],
          ["17", "17"],
          ["27", "27"],
          ["14", "14"],
          ["12", "12"],
          ["13", "13"],
        ],
      },

      {
        type: "field_dropdown",
        name: "C1",
        options: [
          ["27", "27"],
          ["26", "26"],
          ["25", "25"],
          ["17", "17"],
          ["16", "16"],
          ["14", "14"],
          ["12", "12"],
          ["13", "13"],
        ],
      },
      {
        type: "field_dropdown",
        name: "C2",
        options: [
          ["14", "14"],
          ["26", "26"],
          ["25", "25"],
          ["17", "17"],
          ["16", "16"],
          ["27", "27"],
          ["12", "12"],
          ["13", "13"],
        ],
      },
      {
        type: "field_dropdown",
        name: "C3",
        options: [
          ["12", "12"],
          ["26", "26"],
          ["25", "25"],
          ["17", "17"],
          ["16", "16"],
          ["27", "27"],
          ["14", "14"],
          ["13", "13"],
        ],
      },
      {
        type: "field_dropdown",
        name: "C4",
        options: [
          ["13", "13"],
          ["26", "26"],
          ["25", "25"],
          ["17", "17"],
          ["16", "16"],
          ["27", "27"],
          ["14", "14"],
          ["12", "12"],
        ],
      },
    ],

    previousStatement: null,
    nextStatement: null,
    colour: 260,
    tooltip: "Inicializar teclado matricial 4x4",
  },
  {
    type: "init_keypad4x4_i2c",
    message0: "%1 %2 SDA %3 SCL %4 dirección %5",
    args0: [
      { type: "field_input", name: "NAME", text: "teclado_4x4_i2c" },
      {
        type: "field_image",
        src: "./static/img/keypad4x4.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "SDA",
        options: [
          ["19", "19"],
          ["21", "21"],
          ["26", "26"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SCL",
        options: [
          ["18", "18"],
          ["22", "22"],
          ["25", "25"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ADDR",
        options: [
          ["0x20", "0x20"],
          ["0x23", "0x23"],
          ["0x27", "0x27"],
          ["0x3f", "0x3f"],
          ["0x3C", "0x3C"],
          ["0x3D", "0x3D"],
          ["0x68", "0x68"],
          ["0x76", "0x76"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260,
    tooltip: "Inicializar teclado 4x4 I2C",
  },
  {
    type: "keypad_get_key_i2c",
    message0: "%1 leer",
    args0: [{ type: "field_input", name: "NAME", text: "teclado_4x4_i2c" }],
    output: "String",
    colour: 260,
  },
  {
    type: "rtc_ds3231_init",
    message0: "%1 %2 id %3 SDA %4 SCL %5 dirección %6",
    args0: [
      { type: "field_input", name: "NAME", text: "rtc_ds3231" },
      {
        type: "field_image",
        src: "./static/img/ds3231.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "ID",
        options: [
          ["0", "0"],
          ["1", "1"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SDA",
        options: [
          ["19", "19"],
          ["21", "21"],
          ["26", "26"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SCL",
        options: [
          ["18", "18"],
          ["22", "22"],
          ["25", "25"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ADDR",
        options: [
          ["0x20", "0x20"],
          ["0x23", "0x23"],
          ["0x27", "0x27"],
          ["0x3f", "0x3f"],
          ["0x3C", "0x3C"],
          ["0x3D", "0x3D"],
          ["0x68", "0x68"],
          ["0x76", "0x76"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 285,
  },
  {
    type: "rtc_ds3231_set_time",
    message0:
      "%1 establecer año %2 mes %3 dia %4 hora %5 minuto %6 segundo %7 weekday %8",
    args0: [
      { type: "field_input", name: "NAME", text: "rtc_ds3231" },
      { type: "input_value", name: "YEAR" },
      { type: "input_value", name: "MONTH" },
      { type: "input_value", name: "DAY" },
      { type: "input_value", name: "HOUR" },
      { type: "input_value", name: "MINUTE" },
      { type: "input_value", name: "SECOND" },
      { type: "input_value", name: "WEEKDAY" }, // 👈 ESTE FALTABA
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 285,
  },
  {
    type: "rtc_ds3231_get_time",
    message0: "%1 obtener fecha y hora",
    args0: [{ type: "field_input", name: "NAME", text: "rtc_ds3231" }],
    output: null,
    colour: 285,
  },
  {
    type: "rtc_ds3231_get_hour",
    message0: "%1 hora",
    args0: [{ type: "field_input", name: "NAME", text: "rtc_ds3231" }],
    output: "Number",
    colour: 285,
  },
  {
    type: "rtc_ds3231_get_minute",
    message0: "%1 minuto",
    args0: [{ type: "field_input", name: "NAME", text: "rtc_ds3231" }],
    output: "Number",
    colour: 285,
  },
  {
    type: "rtc_ds3231_get_second",
    message0: "%1 segundo",
    args0: [{ type: "field_input", name: "NAME", text: "rtc_ds3231" }],
    output: "Number",
    colour: 285,
  },
  {
    type: "rfid_mfrc522_init",
    message0: "%1 %2 SCK %3 MOSI %4 MISO %5 RST %6 SDA(SS) %7",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "rfid",
      },
      {
        type: "field_image",
        src: "./static/img/rfid.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "SCK",
        options: [
          ["18", "18"],
          ["14", "14"],
          ["25", "25"],
        ],
      },
      {
        type: "field_dropdown",
        name: "MOSI",
        options: [
          ["23", "23"],
          ["13", "13"],
          ["32", "32"],
        ],
      },
      {
        type: "field_dropdown",
        name: "MISO",
        options: [
          ["19", "19"],
          ["12", "12"],
          ["34", "34"],
        ],
      },
      {
        type: "field_dropdown",
        name: "RST",
        options: [
          ["22", "22"],
          ["27", "27"],
          ["33", "33"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SDA",
        options: [
          ["21", "21"],
          ["5", "5"],
          ["15", "15"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 225,
  },
  {
    type: "rfid_mfrc522_detect",
    message0: "%1 tarjeta presente",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "rfid",
      },
    ],
    output: "Boolean",
    colour: 225,
  },
  {
    type: "rfid_mfrc522_uid",
    message0: "%1obtener UID estado %2 UID %3",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "rfid",
      },
      {
        type: "field_variable",
        name: "STAT",
        variable: "stat",
      },
      {
        type: "field_variable",
        name: "UID",
        variable: "uid",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 225,
  },
  {
    type: "rfid_key",
    message0: "clave %1",
    args0: [
      {
        type: "field_input",
        name: "KEY",
        text: "[0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]",
      },
    ],
    output: "List",
    colour: "#F39C12",
  },
  {
    type: "rfid_mfrc522_ok",
    message0: "%1 OK",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "rfid",
      },
    ],
    output: null,
    colour: 225,
  },
  {
    type: "rfid_mfrc522_auth",
    message0: "%1 autenticar bloque %2 llave %3 UID %4",
    args0: [
      { type: "field_input", name: "NAME", text: "rfid" },
      { type: "field_number", name: "BLOCK", value: 8, min: 0, max: 63 },
      { type: "input_value", name: "KEY" },
      { type: "input_value", name: "UID" },
    ],
    inputsInline: true,
    output: "Boolean",
    colour: 225,
  },
  {
    type: "rfid_mfrc522_read_block_vars",
    message0: "%1 leer bloque %2 → estado %3 datos %4",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "rfid",
      },
      {
        type: "input_value",
        name: "BLOCK",
      },
      {
        type: "field_variable",
        name: "STAT",
        variable: "stat",
      },
      {
        type: "field_variable",
        name: "DATA",
        variable: "data",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 225,
  },
  {
    type: "rfid_data_to_text",
    message0: "convertir datos %1 a texto",
    args0: [
      {
        type: "input_value",
        name: "DATA",
      },
    ],
    output: "String",
    colour: 160,
  },
  {
    type: "rfid_mfrc522_stop_crypto",
    message0: "%1 detener autenticación",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "rfid",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 225,
  },
  {
    type: "rfid_mfrc522_write_block",
    message0: "%1 escribir bloque %2 datos %3",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "rfid",
      },
      {
        type: "input_value",
        name: "BLOCK",
      },
      {
        type: "input_value",
        name: "DATA",
      },
    ],
    inputsInline: true,
    output: null,
    colour: 225,
  },
  {
    type: "text_to_bytes",
    message0: "texto %1 a bytes",
    args0: [
      {
        type: "input_value",
        name: "TEXT",
      },
    ],
    inputInline: true,
    output: null,
    colour: 160,
  },
  {
    type: "encoder_rotary_init",
    message0: "%1 %2 CLK %3 DT %4 min_val%5 max_val%6 reverse%7 range_mode%8",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "encoder",
      },
      {
        type: "field_image",
        src: "./static/img/ky-040.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "CLK",
        options: [
          ["18", "18"],
          ["25", "25"],
          ["32", "32"],
        ],
      },
      {
        type: "field_dropdown",
        name: "DT",
        options: [
          ["19", "19"],
          ["26", "26"],
          ["33", "33"],
        ],
      },
      { type: "field_input", name: "IN_VAL", text: "0" },
      { type: "field_input", name: "MAX_VAL", text: "100" },
      {
        type: "field_dropdown",
        name: "REVERSE",
        options: [
          ["False", "False"],
          ["True", "True"],
        ],
      },
      {
        type: "field_dropdown",
        name: "RANGE_MODE",
        options: [
          ["RANGE_WRAP", "RotaryIRQ.RANGE_WRAP"],
          ["RANGE_BOUNDED", "RotaryIRQ.RANGE_BOUNDED"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "encoder_rotary_value",
    message0: "%1 valor",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "encoder",
      },
    ],
    output: "Number",
    colour: 20,
  },
  {
    type: "encoder_rotary_reset",
    message0: "%1 reiniciar",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "encoder",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "tcs34725_init",
    message0: "%1 %2 id %3 SDA %4 SCL %5 dirección %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "color",
      },
      {
        type: "field_image",
        src: "./static/img/tcs34725.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "ID",
        options: [
          ["0", "0"],
          ["1", "1"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SDA",
        options: [
          ["19", "19"],
          ["21", "21"],
          ["26", "26"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SCL",
        options: [
          ["18", "18"],
          ["22", "22"],
          ["25", "25"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ADDR",
        options: [
          ["0x20", "0x20"],
          ["0x23", "0x23"],
          ["0x27", "0x27"],
          ["0x29", "0x29"],
          ["0x3f", "0x3f"],
          ["0x3C", "0x3C"],
          ["0x3D", "0x3D"],
          ["0x68", "0x68"],
          ["0x76", "0x76"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 190,
  },
  {
    type: "tcs34725_rgb",
    message0: "%1 leer RGB",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "color",
      },
    ],
    output: null,
    colour: 190,
  },
  {
    type: "tcs34725_red",
    message0: "%1 rojo",
    args0: [{ type: "field_input", name: "NAME", text: "color" }],
    output: "Number",
    colour: 190,
  },
  {
    type: "tcs34725_green",
    message0: "%1 verde",
    args0: [{ type: "field_input", name: "NAME", text: "color" }],
    output: "Number",
    colour: 190,
  },
  {
    type: "tcs34725_blue",
    message0: "%1 azul",
    args0: [{ type: "field_input", name: "NAME", text: "color" }],
    output: "Number",
    colour: 190,
  },
  {
    type: "tcs34725_clear",
    message0: "%1 luz",
    args0: [{ type: "field_input", name: "NAME", text: "color" }],
    output: "Number",
    colour: 190,
  },
  {
    type: "tcs34725_integration",
    message0: "%1 integracion %2",
    args0: [
      { type: "field_input", name: "NAME", text: "color" },
      { type: "field_number", name: "INTEGRATION_TIME", value: 0 },
    ],
    output: "Number",
    colour: 190,
  },
  {
    type: "tcs34725_gain",
    message0: "%1 gain %2",
    args0: [
      { type: "field_input", name: "NAME", text: "color" },
      { type: "field_number", name: "GAIN", value: 0 },
    ],
    output: "Number",
    colour: 190,
  },
  {
    type: "dfplayer_init",
    message0: "%1 %2 id %3 TX %4 RX %5 baudios %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "dfplayer",
      },
      {
        type: "field_image",
        src: "./static/img/dfplayer.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "UART",
        options: [
          ["UART0", "0"],
          ["UART1", "1"],
          ["UART2", "2"],
        ],
      },
      {
        type: "field_dropdown",
        name: "TX",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "RX",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "BAUD",
        options: [
          ["9600", "9600"],
          ["19200", "19200"],
          ["38400", "38400"],
          ["57600", "57600"],
          ["115200", "115200"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
  },
  {
    type: "dfplayer_play",
    message0: "%1 reproducir",
    args0: [{ type: "field_input", name: "NAME", text: "dfplayer" }],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
  },
  {
    type: "dfplayer_pause",
    message0: "%1 pausar",
    args0: [{ type: "field_input", name: "NAME", text: "dfplayer" }],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
  },
  {
    type: "dfplayer_stop",
    message0: "%1 detener",
    args0: [{ type: "field_input", name: "NAME", text: "dfplayer" }],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
  },
  {
    type: "dfplayer_volume",
    message0: "%1 volumen %2",
    args0: [
      { type: "field_input", name: "NAME", text: "dfplayer" },
      { type: "input_value", name: "VOLUME" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
  },
  {
    type: "dfplayer_next",
    message0: "%1 siguiente",
    args0: [{ type: "field_input", name: "NAME", text: "dfplayer" }],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
  },
  {
    type: "dfplayer_previous",
    message0: "%1 anterior",
    args0: [{ type: "field_input", name: "NAME", text: "dfplayer" }],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
  },
  {
    type: "fpm_init",
    message0: "%1 %2 id %3 TX %4 RX %5 baudios %6",
    args0: [
      { type: "field_input", name: "NAME", text: "finger" },
      {
        type: "field_image",
        src: "./static/img/fpm383c.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "UART",
        options: [
          ["UART0", "0"],
          ["UART1", "1"],
          ["UART2", "2"],
        ],
      },
      {
        type: "field_dropdown",
        name: "TX",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "RX",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "BAUD",
        options: [
          ["9600", "9600"],
          ["19200", "19200"],
          ["38400", "38400"],
          ["57600", "57600"],
          ["115200", "115200"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "fpm_led",
    message0: "%1 LED color %2",
    args0: [
      { type: "field_input", name: "NAME", text: "finger" },
      {
        type: "field_dropdown",
        name: "COLOR",
        options: [
          ["Negro", "0"],
          ["Azul", "1"],
          ["Verde", "2"],
          ["Cyan", "3"],
          ["Rojo", "4"],
          ["Rosa", "5"],
          ["Amarillo", "6"],
          ["Blanco", "7"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "fpm_enroll",
    message0: "%1 registrar ID %2",
    args0: [
      { type: "field_input", name: "NAME", text: "finger" },
      { type: "input_value", name: "ID" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "fpm_verify",
    message0: "%1 verificar huella",
    args0: [{ type: "field_input", name: "NAME", text: "finger" }],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "fpm_delete",
    message0: "%1 borrar ID %2",
    args0: [
      { type: "field_input", name: "NAME", text: "finger" },
      { type: "input_value", name: "ID" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "fpm_count",
    message0: "%1 total huellas",
    args0: [{ type: "field_input", name: "NAME", text: "finger" }],
    output: "Number",
    colour: 20,
  },
  {
    type: "fpm_clear",
    message0: "%1 borrar todo",
    args0: [{ type: "field_input", name: "NAME", text: "finger" }],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "fpm_wait_finger",
    message0: "%1 detectar huella",
    args0: [{ type: "field_input", name: "NAME", text: "finger" }],
    output: "Boolean",
    colour: 20,
  },
  {
    type: "fpm_status",
    message0: "%1 estatus %2",
    args0: [
      { type: "field_input", name: "NAME", text: "finger" },
      { type: "input_value", name: "fpm_img2tz" },
    ],
    output: "Number",
    colour: 20,
  },
  {
    type: "fpm_img2tz",
    message0: "%1 imagen",
    args0: [{ type: "field_input", name: "NAME", text: "finger" }],
    output: null,
    colour: 20,
  },
  {
    type: "fpm_search",
    message0: "%1 %2 %3 %4 buscar huella",
    args0: [
      { type: "field_input", name: "NAME", text: "finger" },
      {
        type: "field_variable",
        name: "FIND",
        variable: "encontrado",
      },
      {
        type: "field_variable",
        name: "FID",
        variable: "fid",
      },
      {
        type: "field_variable",
        name: "SCORE",
        variable: "puntaje",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },

  {
    type: "mpu6050_init",
    message0: "%1 %2 id %3 SDA %4 SCL %5 dirección %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "mpu",
      },
      {
        type: "field_image",
        src: "./static/img/mpu6050.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "ID",
        options: [
          ["0", "0"],
          ["1", "1"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SDA",
        options: [
          ["19", "19"],
          ["21", "21"],
          ["26", "26"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SCL",
        options: [
          ["18", "18"],
          ["22", "22"],
          ["25", "25"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ADDR",
        options: [
          ["0x20", "0x20"],
          ["0x23", "0x23"],
          ["0x27", "0x27"],
          ["0x3f", "0x3f"],
          ["0x3C", "0x3C"],
          ["0x3D", "0x3D"],
          ["0x68", "0x68"],
          ["0x76", "0x76"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
  },
  {
    type: "mpu6050_set_accel_range",
    message0: "MPU6050 %1 set accel range %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "mpu",
      },
      {
        type: "field_dropdown",
        name: "RANGE",
        options: [
          ["2G", "_ACC_RNG_2G"],
          ["4G", "_ACC_RNG_4G"],
          ["8G", "_ACC_RNG_8G"],
          ["16G", "_ACC_RNG_16G"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
  },

  {
    type: "mpu6050_set_gyro_range",
    message0: "MPU6050 %1 set gyro range %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "mpu",
      },
      {
        type: "field_dropdown",
        name: "RANGE",
        options: [
          ["250°/s", "_GYR_RNG_250DEG"],
          ["500°/s", "_GYR_RNG_500DEG"],
          ["1000°/s", "_GYR_RNG_1000DEG"],
          ["2000°/s", "_GYR_RNG_2000DEG"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
  },
  {
    type: "mpu6050_accel_x",
    message0: "%1 aceleración X",
    args0: [{ type: "field_input", name: "NAME", text: "mpu" }],
    output: "Number",
    colour: 230,
  },
  {
    type: "mpu6050_accel_y",
    message0: "%1 aceleración Y",
    args0: [{ type: "field_input", name: "NAME", text: "mpu" }],
    output: "Number",
    colour: 230,
  },
  {
    type: "mpu6050_accel_z",
    message0: "%1 aceleración Z",
    args0: [{ type: "field_input", name: "NAME", text: "mpu" }],
    output: "Number",
    colour: 230,
  },
  {
    type: "mpu6050_gyro_x",
    message0: "%1 giro X",
    args0: [{ type: "field_input", name: "NAME", text: "mpu" }],
    output: "Number",
    colour: 230,
  },
  {
    type: "mpu6050_gyro_y",
    message0: "%1 giro Y",
    args0: [{ type: "field_input", name: "NAME", text: "mpu" }],
    output: "Number",
    colour: 230,
  },
  {
    type: "mpu6050_gyro_z",
    message0: "%1 giro Z",
    args0: [{ type: "field_input", name: "NAME", text: "mpu" }],
    output: "Number",
    colour: 230,
  },
  {
    type: "mpu6050_temperature",
    message0: "%1 temperatura",
    args0: [{ type: "field_input", name: "NAME", text: "mpu" }],
    output: "Number",
    colour: 230,
  },

  {
    type: "bh1750_init",
    message0: "%1 %2 id %3 SDA %4 SCL %5 dirección %6",
    args0: [
      { type: "field_input", name: "NAME", text: "bh1750" },
      {
        type: "field_image",
        src: "./static/img/bh1750.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "ID",
        options: [
          ["0", "0"],
          ["1", "1"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SDA",
        options: [
          ["19", "19"],
          ["21", "21"],
          ["26", "26"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SCL",
        options: [
          ["18", "18"],
          ["22", "22"],
          ["25", "25"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ADDR",
        options: [
          ["0x20", "0x20"],
          ["0x23", "0x23"],
          ["0x27", "0x27"],
          ["0x3f", "0x3f"],
          ["0x3C", "0x3C"],
          ["0x3D", "0x3D"],
          ["0x68", "0x68"],
          ["0x76", "0x76"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
  },

  {
    type: "bh1750_read_lux",
    message0: "%1leer luz (lux)",
    args0: [{ type: "field_input", name: "NAME", text: "bh1750" }],
    output: "Number",
    colour: 160,
  },

  {
    type: "bh1750_power_on",
    message0: "%1 encender",
    args0: [{ type: "field_input", name: "NAME", text: "bh1750" }],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
  },

  {
    type: "bh1750_power_off",
    message0: "%1 apagar",
    args0: [{ type: "field_input", name: "NAME", text: "bh1750" }],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
  },
  {
    type: "qmc5883l_init",
    message0: "%1 %2 SDA %3 SCL %4 direccion %5",
    args0: [
      { type: "field_input", name: "NAME", text: "qmc" },
      {
        type: "field_image",
        src: "./static/img/hmc5883l.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "SDA",
        options: [
          ["21", "21"],
          ["19", "19"],
          ["26", "26"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SCL",
        options: [
          ["22", "22"],
          ["18", "18"],
          ["25", "25"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ADDR",
        options: [
          ["0x13", "0x13"],
          ["0x20", "0x20"],
          ["0x2c", "0x2c"],
          ["0x23", "0x23"],
          ["0x27", "0x27"],
          ["0x3f", "0x3f"],
          ["0x3C", "0x3C"],
          ["0x3D", "0x3D"],
          ["0x68", "0x68"],
          ["0x76", "0x76"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "qmc5883l_read_xyz",
    message0: "%1 leer XYZ",
    args0: [{ type: "field_input", name: "NAME", text: "qmc" }],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
  },
  {
    type: "qmc5883l_read_x",
    message0: "%1 eje X",
    args0: [{ type: "field_input", name: "NAME", text: "qmc" }],
    output: "Number",
    colour: 20,
  },
  {
    type: "qmc5883l_read_y",
    message0: "%1 eje Y",
    args0: [{ type: "field_input", name: "NAME", text: "qmc" }],
    output: "Number",
    colour: 20,
  },
  {
    type: "qmc5883l_read_z",
    message0: "%1 eje Z",
    args0: [{ type: "field_input", name: "NAME", text: "qmc" }],
    output: "Number",
    colour: 20,
  },
  {
    type: "sdcard_init",
    message0: "%1 %2 SCK %3 MOSI %4 MISO %5 CS %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "sd",
      },
      {
        type: "field_image",
        src: "./static/img/sd.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "SCK",
        options: [
          ["18", "18"],
          ["14", "14"],
        ],
      },
      {
        type: "field_dropdown",
        name: "MOSI",
        options: [
          ["23", "23"],
          ["13", "13"],
        ],
      },
      {
        type: "field_dropdown",
        name: "MISO",
        options: [
          ["19", "19"],
          ["12", "12"],
        ],
      },
      {
        type: "field_dropdown",
        name: "CS",
        options: [
          ["5", "5"],
          ["15", "15"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 30,
  },
  {
    type: "sdcard_write",
    message0: "%1 escribir archivo %2 texto %3",
    args0: [
      { type: "field_input", name: "NAME", text: "sd" },
      { type: "input_value", name: "FILE" },
      { type: "input_value", name: "TEXT" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 30,
  },
  {
    type: "sdcard_read",
    message0: "%1 leer archivo %2",
    args0: [
      { type: "field_input", name: "NAME", text: "sd" },
      { type: "input_value", name: "FILE" },
    ],
    output: null,
    colour: 30,
  },
  {
    type: "sdcard_list",
    message0: "%1 listar archivos",
    args0: [{ type: "field_input", name: "NAME", text: "sd" }],
    output: null,
    colour: 30,
  },
  {
    type: "inmp441_init",
    message0: "%1 %2 SCK %3 WS %4 SD %5",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "mic",
      },
      {
        type: "field_image",
        src: "./static/img/inmp441.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "SCK",
        options: [
          ["26", "26"],
          ["14", "14"],
        ],
      },
      {
        type: "field_dropdown",
        name: "WS",
        options: [
          ["25", "25"],
          ["15", "15"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SD",
        options: [
          ["33", "33"],
          ["32", "32"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  },
  {
    type: "inmp441_read",
    message0: "%1 leer audio",
    args0: [{ type: "field_input", name: "NAME", text: "mic" }],
    output: "Number",
    colour: 210,
  },
  {
    type: "inmp441_volume",
    message0: "%1 nivel sonido",
    args0: [{ type: "field_input", name: "NAME", text: "mic" }],
    output: "Number",
    colour: 210,
  },
  {
    type: "bmp_sensor_init",
    message0: "%1 %2 id %3 SDA %4 SCL %5 dirección %6",
    args0: [
      { type: "field_input", name: "NAME", text: "bmp" },
      {
        type: "field_dropdown",
        name: "MODEL",
        options: [
          [
            {
              src: "./static/img/bmp180.svg",
              width: 50,
              height: 50,
              alt: "BMP180",
            },
            "BMP180",
          ],
          [
            {
              src: "./static/img/bmp280.svg",
              width: 50,
              height: 50,
              alt: "BMP280",
            },
            "BMP280",
          ],
        ],
      },
      {
        type: "field_dropdown",
        name: "ID",
        options: [
          ["0", "0"],
          ["1", "1"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SDA",
        options: [
          ["19", "19"],
          ["21", "21"],
          ["26", "26"],
        ],
      },
      {
        type: "field_dropdown",
        name: "SCL",
        options: [
          ["18", "18"],
          ["22", "22"],
          ["25", "25"],
        ],
      },
      {
        type: "field_dropdown",
        name: "ADDR",
        options: [
          ["0x20", "0x20"],
          ["0x23", "0x23"],
          ["0x27", "0x27"],
          ["0x3f", "0x3f"],
          ["0x3C", "0x3C"],
          ["0x3D", "0x3D"],
          ["0x68", "0x68"],
          ["0x76", "0x76"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 200,
  },
  {
    type: "bmp_read_temp",
    message0: "%1 temperatura",
    args0: [{ type: "field_input", name: "NAME", text: "bmp" }],
    output: "Number",
    colour: 200,
  },
  {
    type: "bmp_read_pressure",
    message0: "%1 presion",
    args0: [{ type: "field_input", name: "NAME", text: "bmp" }],
    output: "Number",
    colour: 200,
  },
  {
    type: "bmp_read_altitude",
    message0: "%1 altitud",
    args0: [{ type: "field_input", name: "NAME", text: "bmp" }],
    output: "Number",
    colour: 200,
  },
  {
    type: "cp2102_init",
    message0: "%1 %2 id %3 TX %4 RX %5 baudios %6",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "serial",
      },
      {
        type: "field_image",
        src: "./static/img/cp2102.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "UART",
        options: [
          ["UART0", "0"],
          ["UART1", "1"],
          ["UART2", "2"],
        ],
      },
      {
        type: "field_dropdown",
        name: "TX",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "RX",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["13", "13"],
          ["14", "14"],
          ["15", "15"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21 SDA", "21"],
          ["22 SCL", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
          ["36", "36"],
          ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "BAUD",
        options: [
          ["9600", "9600"],
          ["19200", "19200"],
          ["38400", "38400"],
          ["57600", "57600"],
          ["115200", "115200"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 170,
  },
  {
    type: "cp2102_write",
    message0: "%1 enviar %2",
    args0: [
      { type: "field_input", name: "NAME", text: "serial" },
      { type: "input_value", name: "DATA" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 170,
  },
  {
    type: "cp2102_read",
    message0: "%1 leer",
    args0: [{ type: "field_input", name: "NAME", text: "serial" }],
    output: null,
    colour: 170,
  },
  {
    type: "cp2102_available",
    message0: "%1 datos disponibles",
    args0: [{ type: "field_input", name: "NAME", text: "serial" }],
    output: "Boolean",
    colour: 170,
  },
  {
    type: "gps_init",
    message0: "%1 %2 id %3 TX %4 RX %5 baudios %6 UTC %7 formato %8",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "gps",
      },
      {
        type: "field_image",
        src: "./static/img/gps.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "UART",
        options: [
          ["UART0", "0"],
          ["UART1", "1"],
          ["UART2", "2"],
        ],
      },
      {
        type: "field_dropdown",
        name: "TX",
        options: [
          ["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"],
          ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"],
          ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"],
          ["21 SDA", "21"], ["22 SCL", "22"], ["23", "23"],
          ["25", "25"], ["26", "26"], ["27", "27"],
          ["32", "32"], ["33", "33"], ["34", "34"],
          ["35", "35"], ["36", "36"], ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "RX",
        options: [
          ["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"],
          ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"],
          ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"],
          ["21 SDA", "21"], ["22 SCL", "22"], ["23", "23"],
          ["25", "25"], ["26", "26"], ["27", "27"],
          ["32", "32"], ["33", "33"], ["34", "34"],
          ["35", "35"], ["36", "36"], ["39", "39"],
        ],
      },
      {
        type: "field_dropdown",
        name: "BAUD",
        options: [
          ["9600", "9600"],
          ["19200", "19200"],
          ["38400", "38400"],
          ["57600", "57600"],
          ["115200", "115200"],
        ],
      },
      {
        type: "field_dropdown",
        name: "OFFSET",
        options: [
          ["UTC", "0"],
          ["UTC-5", "-5"],
          ["UTC-6 México Centro", "-6"],
          ["UTC-7", "-7"],
          ["UTC-8", "-8"],
        ],
      },
      {
        type: "field_dropdown",
        name: "FORMAT",
        options: [
          ["Grados y minutos", "ddm"],
          ["Grados minutos segundos", "dms"],
          ["Grados decimales", "dd"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
  },
  {
    type: "gps_any",
    message0: "%1 UART disponible",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "gps",
      },
    ],
    output: "Boolean",
    colour: 120,
  },
  {
    type: "gps_read",
    message0: "%1 UART leer",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "gps",
      },
    ],
    output: null,
    colour: 120,
  },
  {
    type: "gps_update",
    message0: "%1 actualizar %2",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "gps",
      },
      {
        type: "input_value",
        name: "UPDATED",
      }
    ],
    output: null,
    colour: 120,
  },
  {
    type: "gps_latitude",
    message0: "%1 latitud",
    args0: [{ type: "field_input", name: "NAME", text: "gps" }],
    output: "Number",
    colour: 120,
  },
  {
    type: "gps_longitude",
    message0: "%1 longitud",
    args0: [{ type: "field_input", name: "NAME", text: "gps" }],
    output: "Number",
    colour: 120,
  },
  {
    type: "gps_time",
    message0: "%1 hora",
    args0: [{ type: "field_input", name: "NAME", text: "gps" }],
    output: null,
    colour: 120,
  },
  {
    type: "yf201_init",
    message0: "%1 %2 Pin %3",
    args0: [
      { type: "field_input", name: "NAME", text: "flow" },
      {
        type: "field_image",
        src: "./static/img/yf201.svg",
        width: 50,
        height: 50,
        alt: "*",
      },
      {
        type: "field_dropdown",
        name: "PIN",
        options: [
          ["0", "0"],
          ["2", "2"],
          ["4", "4"],
          ["5", "5"],
          ["12", "12"],
          ["14", "14"],
          ["16", "16"],
          ["17", "17"],
          ["18", "18"],
          ["19", "19"],
          ["21", "21"],
          ["22", "22"],
          ["23", "23"],
          ["25", "25"],
          ["26", "26"],
          ["27", "27"],
          ["32", "32"],
          ["33", "33"],
          ["34", "34"],
          ["35", "35"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 180,
  },
  {
    type: "yf201_flow_rate",
    message0: "%1 flujo L/min",
    args0: [{ type: "field_input", name: "NAME", text: "flow" }],
    output: "Number",
    colour: 180,
  },
  {
    type: "yf201_total_liters",
    message0: "%1 litros totales",
    args0: [{ type: "field_input", name: "NAME", text: "flow" }],
    output: "Number",
    colour: 180,
  },
  {
    type: "yf201_reset",
    message0: "%1 reiniciar",
    args0: [{ type: "field_input", name: "NAME", text: "flow" }],
    previousStatement: null,
    nextStatement: null,
    colour: 180,
  },
]);

Blockly.Blocks["dict_create_with"].init = function () {
  this.itemCount_ = 0;
  this.wasEmpty_ = true; // 👈 estado anterior

  this.setOutput(true, "Dictionary");
  this.setColour(230);

  this.setMutator(new Blockly.Mutator(["dict_create_with_item"]));

  this.updateShape_();
};

Blockly.Blocks["dict_create_with"].mutationToDom = function () {
  const container = document.createElement("mutation");
  container.setAttribute("items", this.itemCount_);
  return container;
};

Blockly.Blocks["dict_create_with"].domToMutation = function (xmlElement) {
  this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
  this.updateShape_();
};

Blockly.Blocks["dict_create_with"].decompose = function (workspace) {
  const containerBlock = workspace.newBlock("dict_create_with_container");
  containerBlock.initSvg();

  let connection = containerBlock.getInput("STACK").connection;

  for (let i = 0; i < this.itemCount_; i++) {
    const itemBlock = workspace.newBlock("dict_create_with_item");
    itemBlock.initSvg();
    connection.connect(itemBlock.previousConnection);
    connection = itemBlock.nextConnection;
  }

  return containerBlock;
};

Blockly.Blocks["dict_create_with"].compose = function (containerBlock) {
  Blockly.Events.disable();

  let itemBlock = containerBlock.getInputTargetBlock("STACK");

  const connections = [];

  while (itemBlock) {
    connections.push(itemBlock.valueConnection_);
    itemBlock =
      itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
  }

  const oldCount = this.itemCount_;
  this.itemCount_ = connections.length;

  this.updateShape_();

  // -------- reconectar existentes --------
  for (let i = 0; i < this.itemCount_; i++) {
    if (connections[i]) {
      this.getInput("ADD" + i).connection.connect(connections[i]);
    } else if (i >= oldCount) {
      // 👇 NUEVO ELEMENTO → crear dict_pair automático
      const pairBlock = this.workspace.newBlock("dict_pair");

      pairBlock.initSvg();
      pairBlock.render();

      this.getInput("ADD" + i).connection.connect(pairBlock.outputConnection);
    }
  }

  Blockly.Events.enable();
};

Blockly.Blocks["dict_create_with"].saveConnections = function (containerBlock) {
  let itemBlock = containerBlock.getInputTargetBlock("STACK");

  let i = 0;
  while (itemBlock) {
    const input = this.getInput("ADD" + i);
    itemBlock.valueConnection_ = input && input.connection.targetConnection;

    i++;
    itemBlock =
      itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
  }
};

Blockly.Blocks["dict_create_with"].updateShape_ = function () {
  // -------- eliminar SOLO inputs ADD --------
  let i = 0;
  while (this.getInput("ADD" + i)) {
    this.removeInput("ADD" + i);
    i++;
  }

  // -------- estado vacío --------
  if (this.itemCount_ === 0) {
    if (!this.getInput("EMPTY")) {
      this.appendDummyInput("EMPTY").appendField("diccionario {}");
    }

    if (this.getInput("OPEN")) {
      this.removeInput("OPEN");
    }

    return;
  }

  // -------- ya tiene elementos --------
  if (this.getInput("EMPTY")) {
    this.removeInput("EMPTY");
  }

  // 👇 SOLO se crea una vez
  if (!this.getInput("OPEN")) {
    this.appendDummyInput("OPEN").appendField("hacer un diccionario");
  }

  // -------- pares --------
  for (let i = 0; i < this.itemCount_; i++) {
    this.appendValueInput("ADD" + i).setCheck("DictPair");
  }
};

function iconDropdown() {
  const icons = [];

  for (let i = 0; i < 80; i++) {
    icons.push([
      {
        src: `./static/img/icons2/${i}.png`,
        width: 24,
        height: 24,
        alt: i,
      },
      String(i),
    ]);
  }

  return icons;
}

class FieldIconGrid extends Blockly.Field {
  constructor(value) {
    super(value || "0");
    this.SERIALIZABLE = true;
  }

  static fromJson(options) {
    return new FieldIconGrid(options["value"]);
  }

  initView() {
    // fondo azul
    this.rect_ = Blockly.utils.dom.createSvgElement(
      "rect",
      {
        x: 0,
        y: 0,
        width: 40,
        height: 40,
        rx: 4,
        ry: 4,
        fill: "#228B22",
        stroke: "#0b5ed7",
      },
      this.fieldGroup_,
    );

    // icono
    this.image_ = Blockly.utils.dom.createSvgElement(
      "image",
      {
        x: 4,
        y: 4,
        width: 32,
        height: 32,
        href: `./static/img/icons2/${this.value_}.png`,
      },
      this.fieldGroup_,
    );
  }

  getSize() {
    return new Blockly.utils.Size(40, 40);
  }

  setValue(newValue) {
    if (this.value_ === newValue) return;

    this.value_ = newValue;

    if (this.image_) {
      this.image_.setAttribute("href", `./static/img/icons2/${newValue}.png`);
    }
  }

  showEditor_() {
    const div = document.createElement("div");

    div.style.display = "grid";
    div.style.gridTemplateColumns = "repeat(10, 40px)";
    div.style.gap = "4px";
    div.style.padding = "8px";
    div.style.background = "#26A69A";
    div.style.border = "1px solid #ccc";
    div.style.borderRadius = "6px";
    div.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    div.style.maxHeight = "300px";
    div.style.overflowY = "auto";
    div.style.zIndex = "1000";

    for (let i = 0; i < 361; i++) {
      const icon = document.createElement("img");

      icon.src = `./static/img/icons2/${i}.png`;
      //icon.loading = "lazy";   // 👈 mejora importante
      icon.width = 32;
      icon.height = 32;
      icon.style.cursor = "pointer";

      icon.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.setValue(String(i));
        Blockly.DropDownDiv.hide();
      };

      div.appendChild(icon);
    }

    const contentDiv = Blockly.DropDownDiv.getContentDiv();
    contentDiv.innerHTML = "";
    contentDiv.appendChild(div);

    Blockly.DropDownDiv.showPositionedByField(this);
  }
}

Blockly.fieldRegistry.register("field_icon_grid", FieldIconGrid);

class FieldPixel extends Blockly.Field {
  static SERIALIZABLE = true;

  constructor(value = "0") {
    super(value);
    this.SERIALIZABLE = true;
  }

  static fromJson(options) {
    return new FieldPixel(options["value"]);
  }

  initView() {
    this.rect_ = Blockly.utils.dom.createSvgElement(
      "rect",
      {
        width: 20,
        height: 20,
        rx: 2,
        ry: 2,
        stroke: "#999",
        "stroke-width": 1,
        fill: this.getColor_(),
      },
      this.fieldGroup_,
    );

    this.fieldGroup_.addEventListener("mousedown", (e) => {
      e.stopPropagation();
    });

    // Espera un momento para asegurarte de que Blockly haya terminado de renderizar
    setTimeout(() => {
      if (this.fieldGroup_) {
        Blockly.utils.dom.removeClass(this.fieldGroup_, "blocklyEditableText");
      }
    }, 0);
  }

  getColor_() {
    return this.getValue() === "0" ? "#000000" : "#FF0000";
  }

  setValue(newValue) {
    super.setValue(newValue);
    if (this.rect_) {
      this.rect_.setAttribute("fill", this.getColor_());
    }
  }

  showEditor_() {
    const newValue = this.getValue() === "1" ? "0" : "1";
    this.setValue(newValue);
    if (this.rect_) {
      this.rect_.setAttribute("fill", this.getColor_());
    }
  }

  updateSize_() {
    this.size_.width = 20;
    this.size_.height = 20;
  }
}

Blockly.fieldRegistry.register("field_pixel", FieldPixel);

Blockly.Extensions.register("matrix_8x8_extension2", function () {
  // Menú desplegable de emotes
  this.appendDummyInput()
    .appendField("Emote:")
    .appendField(
      new Blockly.FieldDropdown([
        ["vacio", "vacio"],
        ["Degrees", "degrees"],
        ["Circle", "circle"],
        ["Manzana", "apple"],
        ["Sin boca", "noboca"],
        ["At", "at"],
        ["Emote1", "emote1"],
        ["Arrow right", "arrow_right"],
        ["Arrow right2", "arrow_right2"],
        ["Arrow left", "arrow_left"],
        ["Arrow left2", "arrow_left2"],
        ["Arrow up", "arrow_up"],
        ["Arrow up2", "arrow_up2"],
        ["Arrow down", "arrow_down"],
        ["Arrow down2", "arrow_down2"],
        ["Square two", "square_two"],
        ["Lock close", "lock_close"],
        ["Lock open", "lock_open"],
        ["Heart", "heart"],
        ["Half heart", "half_heart"],
        ["Heart hole", "heart_hole"],
        ["Bell", "bell"],
        ["Check", "check"],
        ["Error", "error"],
        ["Buzzer", "buzzer"],
        ["Nota", "nota"],
        ["Died", "died"],
        ["Face happy", "face_happy"],
        ["Face sad", "face_sad"],
        ["Face surprised", "face_surprised"],
        ["Face no word", "face_no_word"],
        ["Face tongue", "face_tongue"],
        ["Face upset", "face_upset"],
        ["Anchor", "anchor"],
        ["People one", "people_one"],
        ["People two", "people_two"],
        ["People three", "people_three"],
        ["People four", "people_four"],
        ["Battery up hole one", "baterry_up_hole_one"],
        ["Battery up hole two", "baterry_up_hole_two"],
        ["Battery up hole three", "baterry_up_hole_three"],
        ["Battery up full", "baterry_up_full"],
        ["Battery left hole one", "baterry_left_hole_one"],
        ["Battery left hole two", "baterry_left_hole_two"],
        ["Battery left hole three", "baterry_left_hole_three"],
        ["Battery left full", "baterry_left_full"],
        ["Battery right hole one", "baterry_right_hole_one"],
        ["Battery right hole two", "baterry_right_hole_two"],
        ["Battery right hole three", "baterry_right_hole_three"],
        ["Battery right full", "baterry_right_full"],
        ["Battery down hole one", "baterry_down_hole_one"],
        ["Battery down hole two", "baterry_down_hole_two"],
        ["Battery down hole three", "baterry_down_hole_three"],
        ["Battery down full", "baterry_down_full"],
        ["Packman", "packman"],
        ["Ghost one", "ghost_one"],
        ["Ghost two", "ghost_two"],
        ["Arrow up down", "arrow_up_down"],
        ["Play right", "play_right"],
        ["Play left", "play_left"],
        ["Cat", "cat"],
        ["Simbol woman", "simbol_woman"],
        ["Simbol man", "simbol_man"],
        ["As", "As"],
        ["Money", "money"],
        ["Boom", "boom"],
        ["Percentage", "percentage"],
        ["Apostrophe", "apostrophe"],
        ["Mole", "mole"],
        ["Alien1", "alien1"],
        ["Alien2", "alien2"],
        ["Plane", "plane"],
        ["Plane2", "plane2"],
      ]),
      "EMOTE",
    );
  // Matriz de píxeles
  for (let row = 0; row < 8; row++) {
    const input = this.appendDummyInput();
    for (let col = 0; col < 8; col++) {
      const name = `PIXEL_${row}_${col}`;
      input.appendField(new FieldPixel("0"), name);
    }
  }

  // Evento para actualizar la matriz al seleccionar un emote
  this.setOnChange(function (event) {
    if (event.type === Blockly.Events.BLOCK_CHANGE && event.name === "EMOTE") {
      const emote = this.getFieldValue("EMOTE");
      const patterns = {
        blank: Array(8).fill("00000000"),
        degrees: [
          "00000000",
          "00000000",
          "00011000",
          "00100100",
          "00100100",
          "00011000",
          "00000000",
          "00000000",
        ],
        apple: [
          "00011000",
          "00001000",
          "01111110",
          "11111111",
          "11111111",
          "11111111",
          "01111110",
          "00111100",
        ],
        noboca: [
          "00111100",
          "01000010",
          "10100101",
          "10000001",
          "10000001",
          "10000001",
          "01000010",
          "00111100",
        ],
        circle: [
          "00000000",
          "00111100",
          "01000010",
          "01000010",
          "01000010",
          "01000010",
          "00111100",
          "00000000",
        ],
        at: [
          "01111100",
          "10000010",
          "10111010",
          "10101010",
          "10101010",
          "10111110",
          "01000000",
          "00111110",
        ],
        emote1: [
          "00011000",
          "00110001",
          "01100000",
          "01000000",
          "10011000",
          "11000000",
          "01101110",
          "00111000",
        ],
        arrow_right: [
          "00001000",
          "00000100",
          "00000110",
          "11111111",
          "11111111",
          "00000110",
          "00000100",
          "00001000",
        ],
        arrow_right2: [
          "11110000",
          "11100000",
          "11110000",
          "10111000",
          "00011100",
          "00001110",
          "00000100",
          "00000000",
        ],
        arrow_left: [
          "00010000",
          "00100000",
          "01100000",
          "11111111",
          "11111111",
          "01100000",
          "00100000",
          "00010000",
        ],
        arrow_left2: [
          "00000000",
          "00100000",
          "01110000",
          "00111000",
          "00011101",
          "00001111",
          "00000111",
          "00001111",
        ],
        arrow_up: [
          "00011000",
          "00111100",
          "01111110",
          "10011001",
          "00011000",
          "00011000",
          "00011000",
          "00011000",
        ],
        arrow_up2: [
          "00001111",
          "00000111",
          "00001111",
          "00011101",
          "00111000",
          "01110000",
          "00100000",
          "00000000",
        ],
        arrow_down: [
          "00011000",
          "00011000",
          "00011000",
          "00011000",
          "10011001",
          "01111110",
          "00111100",
          "00011000",
        ],
        arrow_down2: [
          "00000000",
          "00000100",
          "00001110",
          "00011100",
          "10111000",
          "11110000",
          "11100000",
          "11110000",
        ],
        square_two: [
          "11111111",
          "10000001",
          "10111101",
          "10100101",
          "10100101",
          "10111101",
          "10000001",
          "11111111",
        ],
        lock_close: [
          "01111110",
          "01000010",
          "01000010",
          "01111110",
          "01100110",
          "01100110",
          "01111110",
          "00000000",
        ],
        lock_open: [
          "00111100",
          "01000000",
          "01000000",
          "01111110",
          "01100110",
          "01100110",
          "01111110",
          "00000000",
        ],
        heart: [
          "00100100",
          "01100110",
          "01111110",
          "01111110",
          "01111110",
          "01111110",
          "00111100",
          "00011000",
        ],
        half_heart: [
          "00100000",
          "01100000",
          "01110000",
          "01110000",
          "01110000",
          "01110000",
          "00110000",
          "00010000",
        ],
        heart_hole: [
          "00100100",
          "01111110",
          "01000010",
          "01000010",
          "01000010",
          "01000010",
          "00111100",
          "00011000",
        ],
        bell: [
          "00011000",
          "00011000",
          "00111100",
          "00111100",
          "01111110",
          "00000000",
          "00011000",
          "00011000",
        ],
        check: [
          "00000000",
          "00000000",
          "00000011",
          "01000110",
          "01101100",
          "00111000",
          "00010000",
          "00000000",
        ],
        error: [
          "00000000",
          "01000010",
          "00100100",
          "00011000",
          "00011000",
          "00100100",
          "01000010",
          "00000000",
        ],
        buzzer: [
          "00000110",
          "00001110",
          "01111110",
          "01111110",
          "01111110",
          "01111110",
          "00001110",
          "00000110",
        ],
        nota: [
          "00001100",
          "00011100",
          "00110100",
          "00100100",
          "00101100",
          "01101100",
          "01100000",
          "00000000",
        ],
        died: [
          "00111100",
          "11011011",
          "10011001",
          "11100111",
          "11100111",
          "00111100",
          "00100100",
          "00111100",
        ],
        face_happy: [
          "00000000",
          "00110110",
          "00110110",
          "00000000",
          "00001000",
          "01000010",
          "00111100",
          "00000000",
        ],
        face_sad: [
          "00000000",
          "00110110",
          "00110110",
          "00000000",
          "00001000",
          "00000000",
          "00111100",
          "01000010",
        ],
        face_surprised: [
          "01100110",
          "01100110",
          "00000000",
          "00001000",
          "00111100",
          "01000010",
          "01000010",
          "00111100",
        ],
        face_no_word: [
          "01100110",
          "01100110",
          "00000000",
          "00001000",
          "00000000",
          "01111110",
          "01111110",
          "00000000",
        ],
        face_tongue: [
          "01100110",
          "01100110",
          "00000000",
          "00000000",
          "01111110",
          "01000010",
          "00111100",
          "00001100",
        ],
        face_upset: [
          "01000010",
          "00100100",
          "01000010",
          "00000000",
          "00011000",
          "00000000",
          "00111100",
          "01000010",
        ],
        anchor: [
          "00111100",
          "11111111",
          "11011011",
          "00011000",
          "10011001",
          "11011011",
          "00111100",
          "00011000",
        ],
        people_one: [
          "00111100",
          "00100100",
          "00111100",
          "00011000",
          "01111110",
          "00011000",
          "00100100",
          "01000010",
        ],
        people_two: [
          "00111100",
          "00100100",
          "00111100",
          "00011000",
          "00111110",
          "01011000",
          "00100100",
          "01000010",
        ],
        people_three: [
          "00111100",
          "00100100",
          "00111100",
          "00011000",
          "01111100",
          "00011010",
          "00100100",
          "01000010",
        ],
        people_four: [
          "00111100",
          "00100100",
          "00111100",
          "01011010",
          "00111100",
          "00011000",
          "00100100",
          "01000010",
        ],
        baterry_up_hole_one: [
          "00111100",
          "01100110",
          "01000010",
          "01000010",
          "01000010",
          "01000010",
          "01000010",
          "01111110",
        ],
        baterry_up_hole_two: [
          "00111100",
          "01100110",
          "01000010",
          "01000010",
          "01000010",
          "01111110",
          "01111110",
          "01111110",
        ],
        baterry_up_hole_three: [
          "00111100",
          "01100110",
          "01000010",
          "01111110",
          "01111110",
          "01111110",
          "01111110",
          "01111110",
        ],
        baterry_up_full: [
          "00111100",
          "01111110",
          "01111110",
          "01111110",
          "01111110",
          "01111110",
          "01111110",
          "01111110",
        ],
        baterry_left_hole_one: [
          "00000000",
          "01111111",
          "11000001",
          "10000001",
          "10000001",
          "11000001",
          "01111111",
          "00000000",
        ],
        baterry_left_hole_two: [
          "00000000",
          "01111111",
          "11000111",
          "10000111",
          "10000111",
          "11000111",
          "01111111",
          "00000000",
        ],
        baterry_left_hole_three: [
          "00000000",
          "01111111",
          "11011111",
          "10011111",
          "10011111",
          "11011111",
          "01111111",
          "00000000",
        ],
        baterry_left_full: [
          "00000000",
          "01111111",
          "11111111",
          "11111111",
          "11111111",
          "11111111",
          "01111111",
          "00000000",
        ],
        baterry_right_hole_one: [
          "00000000",
          "11111110",
          "10000011",
          "10000001",
          "10000001",
          "10000011",
          "11111110",
          "00000000",
        ],
        baterry_right_hole_two: [
          "00000000",
          "11111110",
          "11100011",
          "11100001",
          "11100001",
          "11100011",
          "11111110",
          "00000000",
        ],
        baterry_right_hole_three: [
          "00000000",
          "11111110",
          "11111011",
          "11111001",
          "11111001",
          "11111011",
          "11111110",
          "00000000",
        ],
        baterry_right_full: [
          "00000000",
          "11111110",
          "11111111",
          "11111111",
          "11111111",
          "11111111",
          "11111110",
          "00000000",
        ],
        baterry_down_hole_one: [
          "01111110",
          "01000010",
          "01000010",
          "01000010",
          "01000010",
          "01000010",
          "01100110",
          "00111100",
        ],
        baterry_down_hole_two: [
          "01111110",
          "01111110",
          "01111110",
          "01000010",
          "01000010",
          "01000010",
          "01100110",
          "00111100",
        ],
        baterry_down_hole_three: [
          "01111110",
          "01111110",
          "01111110",
          "01111110",
          "01111110",
          "01000010",
          "01100110",
          "00111100",
        ],
        baterry_down_full: [
          "01111110",
          "01111110",
          "01111110",
          "01111110",
          "01111110",
          "01111110",
          "01111110",
          "00111100",
        ],
        packman: [
          "00111110",
          "01110010",
          "01110010",
          "01111100",
          "01110000",
          "01110000",
          "01111110",
          "00111100",
        ],
        ghost_one: [
          "00111100",
          "01111110",
          "01010010",
          "01010010",
          "01111110",
          "01111110",
          "01011010",
          "01011010",
        ],
        ghost_two: [
          "00111100",
          "01111110",
          "01001010",
          "01001010",
          "01111110",
          "01111110",
          "01011010",
          "01011010",
        ],
        arrow_up_down: [
          "00011000",
          "00111100",
          "01011010",
          "00011000",
          "01011010",
          "00111100",
          "00011000",
          "11111111",
        ],
        play_right: [
          "01000000",
          "01100000",
          "01111000",
          "01111110",
          "01111110",
          "01111000",
          "01100000",
          "01000000",
        ],
        play_left: [
          "00000010",
          "00000110",
          "00011110",
          "01111110",
          "01111110",
          "00011110",
          "00000110",
          "00000010",
        ],
        cat: [
          "01100110",
          "11111111",
          "11111111",
          "01100110",
          "01100110",
          "11111111",
          "11111111",
          "01100110",
        ],
        simbol_woman: [
          "00011111",
          "00000011",
          "00000101",
          "00101001",
          "01010001",
          "01010000",
          "00100000",
          "00000000",
        ],
        simbol_man: [
          "01111110",
          "10000001",
          "10000001",
          "10000001",
          "01111110",
          "00011000",
          "01111110",
          "00011000",
        ],
        As: [
          "00011000",
          "01111110",
          "11111111",
          "11111111",
          "11111111",
          "11111111",
          "00011000",
          "01111110",
        ],
        money: [
          "00011000",
          "11111111",
          "10011000",
          "10011000",
          "01111110",
          "00011001",
          "11111110",
          "00011000",
        ],
        boom: [
          "11011011",
          "10111101",
          "01111110",
          "11111111",
          "11111101",
          "01111110",
          "10111101",
          "11011011",
        ],
        percentage: [
          "11100011",
          "11100111",
          "11101110",
          "00011100",
          "00111000",
          "01110111",
          "11100111",
          "11000111",
        ],
        apostrophe: [
          "00001110",
          "00001110",
          "00011110",
          "00110000",
          "01100000",
          "00000000",
          "00000000",
          "00000000",
        ],
        mole: [
          "01111110",
          "10100101",
          "11100111",
          "10000001",
          "10011001",
          "10011001",
          "10000001",
          "01111110",
        ],
        alien1: [
          "00011000",
          "00111100",
          "01111110",
          "10111101",
          "11111111",
          "00100100",
          "01011010",
          "10100101",
        ],
        alien2: [
          "00111100",
          "01100110",
          "01011010",
          "01011010",
          "11111111",
          "11100111",
          "00011000",
          "00100100",
        ],
        plane: [
          "00000000",
          "00000000",
          "00000000",
          "00000000",
          "00000000",
          "00000000",
          "00011000",
          "01111110",
        ],
        plane2: [
          "00000000",
          "00000000",
          "00000000",
          "00000000",
          "00000000",
          "00011000",
          "00111100",
          "01111110",
        ],
      };
      const pattern = patterns[emote];
      if (pattern) {
        for (let row = 0; row < 8; row++) {
          for (let col = 0; col < 8; col++) {
            const bit = pattern[row][col];
            this.setFieldValue(bit, `PIXEL_${row}_${col}`);
            const field = this.getField(`PIXEL_${row}_${col}`);
            if (field && typeof field.setValue === "function") {
              field.setValue(bit);
            }
          }
        }
      }
    }
  });
});

Blockly.Extensions.register("matrix_4x4_extension", function () {
  for (let row = 0; row < 4; row++) {
    const input = this.appendDummyInput();
    for (let col = 0; col < 4; col++) {
      const name = `COLOR_${row}_${col}`;
      input.appendField(new Blockly.FieldColour("#00FF00"), name);
    }
  }
});

Blockly.Extensions.register("matrix_5x5_extension", function () {
  for (let row = 0; row < 5; row++) {
    const input = this.appendDummyInput();
    for (let col = 0; col < 5; col++) {
      const name = `COLOR_${row}_${col}`;
      input.appendField(new Blockly.FieldColour("#0c0c0c"), name);
    }
  }
});

Blockly.Extensions.register("matrix_8x8_extension", function () {
  for (let row = 0; row < 8; row++) {
    const input = this.appendDummyInput();
    for (let col = 0; col < 8; col++) {
      const name = `COLOR_${row}_${col}`;
      input.appendField(new Blockly.FieldColour("#000000"), name);
    }
  }
});

Blockly.Constants.ClassInit = {};

Blockly.Constants.ClassInit.MUTATOR_MIXIN = {
  argsCount_: 0,

  mutationToDom: function () {
    var container = document.createElement("mutation");
    container.setAttribute("args", this.argsCount_);
    return container;
  },

  domToMutation: function (xmlElement) {
    this.argsCount_ = parseInt(xmlElement.getAttribute("args"), 10);
    this.updateShape_();
  },

  decompose: function (workspace) {
    var containerBlock = workspace.newBlock("class_init_container");
    containerBlock.initSvg();
    var connection = containerBlock.getInput("STACK").connection;
    for (var i = 0; i < this.argsCount_; i++) {
      var argBlock = workspace.newBlock("class_init_arg");
      argBlock.initSvg();
      connection.connect(argBlock.previousConnection);
      connection = argBlock.nextConnection;
    }
    return containerBlock;
  },

  compose: function (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    var count = 0;
    while (itemBlock) {
      count++;
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    this.argsCount_ = count;
    this.updateShape_();
  },

  updateShape_: function () {
    let argsInput = this.getInput("ARGS");
    if (!argsInput) {
      argsInput = this.appendDummyInput("ARGS");
    }
    argsInput.fieldRow.length = 0;
    argsInput.appendField("def __init__(");
    for (let j = 0; j < this.argsCount_; j++) {
      if (j > 0) {
        argsInput.appendField(", ");
      }
      argsInput.appendField(
        new Blockly.FieldTextInput("arg" + (j + 1), function (text) {
          return text && text.trim() !== "" ? text : "arg" + (j + 1);
        }),
        "ARGNAME" + j,
      );
    }
  },
};

// ✅ Registrar el mutator
Blockly.Extensions.registerMutator(
  "class_init_mutator",
  Blockly.Constants.ClassInit.MUTATOR_MIXIN,
  null,
  ["class_init_arg"],
);

Blockly.Constants.ClassMethod = {};

Blockly.Constants.ClassMethod.MUTATOR_MIXIN = {
  argsCount_: 0,

  mutationToDom: function () {
    var container = document.createElement("mutation");
    container.setAttribute("args", this.argsCount_);
    return container;
  },

  domToMutation: function (xmlElement) {
    this.argsCount_ = parseInt(xmlElement.getAttribute("args"), 10);
    this.updateShape_();
  },

  decompose: function (workspace) {
    var containerBlock = workspace.newBlock("class_method_container");
    containerBlock.initSvg();
    var connection = containerBlock.getInput("STACK").connection;
    for (var i = 0; i < this.argsCount_; i++) {
      var argBlock = workspace.newBlock("class_method_arg");
      argBlock.initSvg();
      connection.connect(argBlock.previousConnection);
      connection = argBlock.nextConnection;
    }
    return containerBlock;
  },

  compose: function (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    var count = 0;
    while (itemBlock) {
      count++;
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    this.argsCount_ = count;
    this.updateShape_();
  },

  updateShape_: function () {
    let argsInput = this.getInput("ARGS");
    if (!argsInput) {
      argsInput = this.appendDummyInput("ARGS");
    }
    argsInput.fieldRow.length = 0;
    argsInput.appendField("def");
    argsInput.appendField(
      new Blockly.FieldTextInput("mi_metodo", function (text) {
        return text && text.trim() !== "" ? text : "mi_metodo(";
      }),
      "NAME",
    );
    argsInput.appendField("(");
    for (let j = 0; j < this.argsCount_; j++) {
      if (j > 0) {
        argsInput.appendField(", ");
      }
      argsInput.appendField(
        new Blockly.FieldTextInput("arg" + (j + 1), function (text) {
          return text && text.trim() !== "" ? text : "arg" + (j + 1);
        }),
        "ARGNAME" + j,
      );
    }
  },
};

// ✅ Registrar el mutator
Blockly.Extensions.registerMutator(
  "class_method_mutator",
  Blockly.Constants.ClassMethod.MUTATOR_MIXIN,
  null,
  ["class_method_arg"],
);

Blockly.Constants.ClassInstance = {};

Blockly.Constants.ClassInstance.MUTATOR_MIXIN = {
  argsCount_: 0,

  mutationToDom: function () {
    var container = document.createElement("mutation");
    container.setAttribute("args", this.argsCount_);
    return container;
  },

  domToMutation: function (xmlElement) {
    this.argsCount_ = parseInt(xmlElement.getAttribute("args"), 10);
    this.updateShape_();
  },

  decompose: function (workspace) {
    var containerBlock = workspace.newBlock("class_instance_container");
    containerBlock.initSvg();
    var connection = containerBlock.getInput("STACK").connection;
    for (var i = 0; i < this.argsCount_; i++) {
      var argBlock = workspace.newBlock("class_instance_arg");
      argBlock.initSvg();
      connection.connect(argBlock.previousConnection);
      connection = argBlock.nextConnection;
    }
    return containerBlock;
  },

  compose: function (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock("STACK");
    var count = 0;
    while (itemBlock) {
      count++;
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    this.argsCount_ = count;
    this.updateShape_();
  },

  updateShape_: function () {
    let argsInput = this.getInput("ARGS");
    if (!argsInput) {
      argsInput = this.appendDummyInput("ARGS");
    }
    argsInput.fieldRow.length = 0;

    argsInput.appendField(
      new Blockly.FieldTextInput("obj", function (text) {
        return text && text.trim() !== "" ? text : "obj(";
      }),
      "OBJ",
    );
    argsInput.appendField("=");
    argsInput.appendField(
      new Blockly.FieldTextInput("miClase", function (text) {
        return text && text.trim() !== "" ? text : "miClase";
      }),
      "CLASSNAME",
    );
    argsInput.appendField("(");

    for (let j = 0; j < this.argsCount_; j++) {
      if (j > 0) {
        argsInput.appendField(", ");
      }
      argsInput.appendField(
        new Blockly.FieldTextInput("arg" + (j + 1), function (text) {
          return text && text.trim() !== "" ? text : "arg" + (j + 1);
        }),
        "ARGNAME" + j,
      );
    }
  },
};

Blockly.Extensions.registerMutator(
  "class_instance_mutator",
  Blockly.Constants.ClassInstance.MUTATOR_MIXIN,
  null,
  ["class_instance_arg"],
);

Blockly.Extensions.register("auto_comment", function () {
  this.setCommentText("Bloque configurable");
});

Blockly.Extensions.register(
  "motor_label_update",
  function () {
    this.setOnChange(function (event) {
      if (!event) return;

      const motor = this.getFieldValue("motor");

      if (motor === "A") {
        this.getField("LABEL1").setValue("IN1");
        this.getField("LABEL2").setValue("IN2");
      } else if (motor === "B") {
        this.getField("LABEL1").setValue("IN3");
        this.getField("LABEL2").setValue("IN4");
      }
    });
  }
);
// =============================================
// PORTAL CAUTIVO - BLOQUES DE DEFINICIÓN
// Nota: se usa un segundo defineBlocksWithJsonArray separado intencionalmente
// porque estos bloques se registran después de que los mutators y extensiones
// del bloque anterior ya están listos.
// =============================================

Blockly.defineBlocksWithJsonArray([
  // --- Configuración del Access Point ---
  {
    type: "wifi_ap_config",
    message0: "configurar AP  SSID %1  contraseña %2  IP %3  subred %4",
    args0: [
      { type: "field_input", name: "SSID", text: "ESP32_AP" },
      { type: "field_input", name: "PASSWORD", text: "12345678" },
      { type: "field_input", name: "IP", text: "192.168.0.1" },
      { type: "field_input", name: "SUBNET", text: "255.255.255.0" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#2980B9",
    tooltip: "Define las constantes del Access Point WiFi",
  },

  // --- Página HTML por defecto ---
  {
    type: "portal_set_page",
    message0: "página HTML del portal %1",
    args0: [
      { type: "field_input", name: "PAGE", text: "index3" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#8E44AD",
    tooltip: "Nombre del archivo HTML a servir (sin .html)",
  },

  // --- Bloque comandos async ---
  {
    type: "portal_comandos",
    message0: "al recibir comando %1 %2",
    args0: [
      { type: "field_input", name: "TIPO_VAR", text: "tipo" },
      { type: "field_input", name: "VALOR_VAR", text: "valor" },
    ],
    message1: "%1",
    args1: [
      {
        type: "input_statement",
        name: "DO",
      },
    ],
    colour: "#8e44ad",
    nextStatement: null,
    tooltip: "Define el cuerpo de la función async comandos(tipo, valor)",
  },

  // --- Comparar tipo de comando recibido ---
  {
    type: "portal_si_tipo",
    message0: "si tipo es %1",
    args0: [
      { type: "field_input", name: "TIPO", text: "led" },
    ],
    output: "Boolean",
    colour: "#E67E22",
    tooltip: "Compara el tipo recibido por el portal",
  },

  // --- Comparar valor de comando recibido ---
  {
    type: "portal_si_valor",
    message0: "si valor es %1",
    args0: [
      { type: "field_input", name: "VALOR", text: "on" },
    ],
    output: "Boolean",
    colour: "#E67E22",
    tooltip: "Compara el valor recibido por el portal",
  },

  // --- Obtener tipo recibido ---
  {
    type: "portal_get_tipo",
    message0: "tipo recibido",
    output: "String",
    colour: "#E67E22",
    tooltip: "Devuelve la variable 'tipo' del comando HTTP",
  },

  // --- Obtener valor recibido ---
  {
    type: "portal_get_valor",
    message0: "valor recibido",
    output: "String",
    colour: "#E67E22",
    tooltip: "Devuelve la variable 'valor' del comando HTTP",
  },

  // --- await asyncio.sleep_ms ---
  {
    type: "async_sleep_ms",
    message0: "async esperar %1 ms",
    args0: [
      { type: "field_number", name: "MS", value: 100, min: 0 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: "await asyncio.sleep_ms(ms) — no bloquea el event loop",
  },

  // --- await asyncio.sleep (segundos) ---
  {
    type: "async_sleep_s",
    message0: "esperar %1 segundos (async)",
    args0: [
      { type: "field_number", name: "S", value: 1, min: 0 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#1ABC9C",
    tooltip: "await asyncio.sleep(s) — no bloquea el event loop",
  },

  // --- gc.collect ---
  {
    type: "gc_collect",
    message0: "liberar memoria (gc.collect)",
    previousStatement: null,
    nextStatement: null,
    colour: "#7F8C8D",
    tooltip: "Fuerza el recolector de basura de MicroPython",
  },
]);