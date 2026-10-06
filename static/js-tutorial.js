// Índice del paso activo del tutorial de bloques (declarado aquí para evitar variable global implícita)
let uiStep = 0;

const uiTutorial = [
  /*{
    el: ".top-menu",
    title: "Menú superior",
    text: "Aquí están los botones principales para trabajar con tu proyecto.",
  },*/
  {
    el: ".blocklyWorkspace",
    title: "Bienvenidos a 3DP!t Blocks",
    text: "¿Eres nuevo aquí? Tutorial para conocer cómo funciona el programa. ¿Estás listo para empezar?",
  },
  {
    el: "#btnBlocks",
    title: "Ventana de Bloques",
    text: "Muestra el área de bloques.",
  },
  {
    el: ".blocklyToolboxContents",
    title: "Caja de herramientas",
    text: "Aquí estan las categorias de los diferentes bloques, selecciona y arrastra el bloque.",
  },
  {
    el: ".dropdown",
    title: "Archivos",
    text: "Sirve para crear archivo, guardar, cargar archivos y recargar.",
  },
  {
    el: "#btnCode",
    title: "Código",
    text: "Visualiza el código generado.",
  },
  {
    el: "#btnConnection",
    title: "Conetar y desconectar la Tarjeta ESP32",
    text: "Establecer comunicación con la Tarjeta ESP32.",
  },
  {
    el: "#btnRunStop",
    title: "Correr y detener el código.",
    text: "Envía el código al dispositivo y detener el programa ",
  },

  {
    el: "#btnBurnFirmware",
    title: "Cargar Firmware",
    text: "Cargar sistema operativo a la tarjeta ESP32.",
  },
  {
    el: "#btnTutor",
    title: "Tour de la interfaz",
    text: "Inicia este recorrido guiado en cualquier momento para repasar los botones del programa.",
  },
  {
    el: "#tut-wrapper",
    title: "Tutoriales guiados paso a paso",
    text: "Selecciona un tutorial para aprender a usar sensores, LEDs, motores y más. El panel aparecerá y te irá guiando bloque a bloque.",
  },
  {
    el: "#btnOpenSerialMonitor",
    title: "Monitor Serial",
    text: "Abre el monitor serial para ver los mensajes que envía el ESP32 y enviarle comandos directamente.",
  },
  {
    el: "#btnWiring",
    title: "Conexiones eléctricas",
    text: "Muestra el diagrama de conexiones del tutorial activo para saber cómo conectar los componentes al ESP32.",
  },
  {
    el: ".blocklyWorkspace",
    title: "Zona de trabajo",
    text: "Aquí podras unir y conectar bloques para crear el código",
  },
  {
    el: ".blocklyScreenshotButton",
    title: "Tomar Foto",
    text: "Descarga una imagen de los bloques de tu código.",
  },
  {
    el: ".blocklyUndoRedo",
    title: "Hacer y Desa-hacer",
    text: "↶ Regresa atrás y ↷ Avanza para repetir la última acción deshecha.",
  },
];

function startTutorial() {
  activeTutorial = "blocks";
  uiStep = 0;

  document.getElementById("tutorialOverlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";

  showTutorialStep();
}

function showTutorialStep() {
  document.getElementById("tutorialCounter").innerText =
    uiStep + 1 + " de " + uiTutorial.length;

  const btnPrev = document.getElementById("tutorialPrev");
  const btnNext = document.getElementById("tutorialNext");

  const step = uiTutorial[uiStep];
  let el = document.querySelector(step.el);

  if (!el) {
    console.warn("No existe:", step.el);
    return;
  }

  // Si el elemento existe en el DOM pero está oculto (display:none --
  // ej. "#btnWiring", que TutorialSteps ahora solo muestra durante el
  // paso de conexión de un tutorial guiado, ver tutorial-steps.js), su
  // getBoundingClientRect() da todo 0 y el recorte queda como un punto
  // en la esquina superior izquierda en vez de resaltar algo real. En
  // ese caso usamos el contenedor visible más cercano como referencia.
  if (el.getBoundingClientRect().width === 0 && el.offsetParent === null) {
    const visible = el.closest(".menu-icons, .top-menu") || el.parentElement;
    if (visible) el = visible;
  }

  if (uiStep === 0) {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "inline-block";
  }

  if (uiStep === uiTutorial.length - 1) {
    btnNext.innerText = "Finalizar";
  } else {
    btnNext.innerText = "Siguiente";
  }

  const cutout = document.getElementById("tutorialCutout");

  let top, left, width, height;

  // 👇 SOLO para el área de bloques. ".blocklyWorkspace" es el grupo SVG
  // interno de Blockly: su getBoundingClientRect() refleja el contenido
  // dibujado (bloques + fondo del canvas infinito), NO el tamaño visible
  // del contenedor -- por eso no cambiaba al redimensionar/maximizar la
  // ventana y el recorte quedaba desalineado. Usamos el <svg> real (o
  // #blocklyDiv como respaldo), que sí mide el contenedor visible, y le
  // restamos el ancho real de la caja de herramientas (medido, no un
  // número fijo) para no taparla.
  if (step.el === ".blocklyWorkspace") {
    const container =
      document.querySelector("#blocklyDiv svg") ||
      document.getElementById("blocklyDiv");
    const rect = container.getBoundingClientRect();
    const toolboxEl = document.querySelector(".blocklyToolboxDiv");
    const toolboxWidth = toolboxEl
      ? toolboxEl.getBoundingClientRect().width
      : 0;
    const margin = 10;

    top = rect.top + margin;
    left = rect.left + toolboxWidth;
    width = rect.width - toolboxWidth - margin;
    height = rect.height - margin * 2;
  } else {
    const rect = el.getBoundingClientRect();
    top = rect.top;
    left = rect.left;
    width = rect.width;
    height = rect.height;
  }

  const padding = 0;

  cutout.style.top = top - padding + "px";
  cutout.style.left = left - padding + "px";
  cutout.style.width = width + padding * 2 + "px";
  cutout.style.height = height + padding * 2 + "px";

  document.getElementById("tutorialTitle").innerText = step.title;
  document.getElementById("tutorialText").innerText = step.text;

  //el.scrollIntoView({ behavior: "smooth", block: "center" });
}
document.getElementById("tutorialNext").onclick = () => {
  if (activeTutorial === "blocks") {
    if (uiStep < uiTutorial.length - 1) {
      uiStep++;
      showTutorialStep();
    } else {
      closeTutorial();
    }
  } else if (activeTutorial === "code") {
    if (uiStep2 < uiCodeTutorial.length - 1) {
      uiStep2++;
      showTutorialStep2();
    } else {
      closeTutorial();
    }
  }
};
document.getElementById("tutorialPrev").onclick = () => {
  if (activeTutorial === "blocks" && uiStep > 0) {
    uiStep--;
    showTutorialStep();
  } else if (activeTutorial === "code" && uiStep2 > 0) {
    uiStep2--;
    showTutorialStep2();
  }
};
document.getElementById("tutorialClose").onclick = closeTutorial;

function closeTutorial() {
  document.getElementById("tutorialOverlay").classList.add("hidden");
  document.body.style.overflow = "";
  activeTutorial = null;
}

// ── Recalcular cutout al redimensionar / maximizar la ventana ──
window.tutorialRecalc = function () {
  const overlay = document.getElementById("tutorialOverlay");
  if (!overlay || overlay.classList.contains("hidden")) return;

  if (activeTutorial === "blocks") showTutorialStep();
  else if (activeTutorial === "code" && typeof showTutorialStep2 === "function") showTutorialStep2();
};

let _tutorialResizeTimer;
let _tutorialResizeSettleTimer;
window.addEventListener("resize", function () {
  clearTimeout(_tutorialResizeTimer);
  clearTimeout(_tutorialResizeSettleTimer);
  _tutorialResizeTimer = setTimeout(function () {
    window.tutorialRecalc();
    // En la ventana embebida (WebView2) el tamaño del contenedor y el de
    // la caja de herramientas a veces terminan de actualizarse en pasadas
    // de layout distintas tras un resize/maximizado -- una sola lectura
    // justo después puede mezclar una medida vieja con una nueva y dejar
    // el recorte deformado. Se recalcula una vez más un poco después para
    // asentar con las medidas finales ya estables.
    _tutorialResizeSettleTimer = setTimeout(window.tutorialRecalc, 200);
  }, 80);
});