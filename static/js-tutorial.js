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
  const el = document.querySelector(step.el);

  if (!el) {
    console.warn("No existe:", step.el);
    return;
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

  const rect = el.getBoundingClientRect();
  const cutout = document.getElementById("tutorialCutout");

  let top = rect.top;
  let left = rect.left;
  let width = rect.width;
  let height = rect.height;

  // 👇 SOLO para el área de bloques
  if (step.el === ".blocklyWorkspace") {
    const shrinkX = 150; // cuánto reducir a los lados
    const shrinkY = 15; // cuánto reducir arriba/abajo

    const moveX = shrinkX + 100; // 👉 ajusta aquí
    const moveY = shrinkY - 5;
    top += moveY;
    left += moveX;
    width -= shrinkX * 2;
    height -= shrinkY * 2;
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
window.addEventListener("resize", function () {
  clearTimeout(_tutorialResizeTimer);
  _tutorialResizeTimer = setTimeout(window.tutorialRecalc, 80);
});