const uiCodeTutorial = [
  {
    el: "#fileNameInput",
    title: "Nombre del programa",
    text: "Escribe el nombre del archivo que deseas guardar en la tarjeta. Si utilizas el nombre main.py, el programa se ejecutará automáticamente cada vez que la tarjeta se encienda o se conecte a la energía.",
  },
  {
    el: "#btnUploadCode",
    title: "Subir código",
    text: "Al hacer clic, el programa se guardará en la tarjeta con el nombre que hayas indicado.",
  },
  {
    el: "#btnSavePy",
    title: "Guardar código",
    text: "Al hacer clic, se abrirá una ventana para guardar tu programa en formato .py dentro de tu computadora.",
  },
  {
    el: "#btnLoadPy",
    title: "Cargar código",
    text: "Al hacer clic, se abrirá una ventana para seleccionar el archivo de código que deseas abrir o modificar.",
  },
  {
    el: "#btnConsoleClear",
    title: "Limpiar terminal",
    text: "Borra todo el contenido mostrado en la terminal para facilitar la lectura de nuevos mensajes.",
  },
  {
    el: "#btnConsoleReset",
    title: "Reiniciar la ESP32",
    text: "Detiene la ejecución del programa actual y reinicia la tarjeta, dejándola lista para recibir nuevos comandos.",
  },
  {
    el: "#terminal",
    title: "Terminal",
    text: "Espacio donde se muestran los mensajes y resultados de ejecución del código directamente desde la tarjeta.",
  },
];
let uiStep2 = 0;

function startCodeTutorial() {
  activeTutorial = "code";
  uiStep2 = 0;

  document.getElementById("tutorialOverlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";

  showTutorialStep2();
}

function showTutorialStep2() {
  document.getElementById("tutorialCounter").innerText =
    uiStep2 + 1 + " de " + uiCodeTutorial.length;

  const btnPrev = document.getElementById("tutorialPrev");
  const btnNext = document.getElementById("tutorialNext");

  const step = uiCodeTutorial[uiStep2];
  const el = document.querySelector(step.el);

  if (!el) {
    console.warn("No existe:", step.el);
    return;
  }

  if (uiStep2 === 0) {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "inline-block";
  }

  if (uiStep2 === uiCodeTutorial.length - 1) {
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
  const padding = 0;
  cutout.style.top = top - padding + "px";
  cutout.style.left = left - padding + "px";
  cutout.style.width = width + padding * 2 + "px";
  cutout.style.height = height + padding * 2 + "px";

  document.getElementById("tutorialTitle").innerText = step.title;
  document.getElementById("tutorialText").innerText = step.text;

  //el.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Los handlers de tutorialNext / tutorialPrev / tutorialClose y la función
// closeTutorial() están definidos en js-tutorial.js, que ya maneja ambos
// modos ("blocks" y "code") mediante la variable activeTutorial.
// No se duplican aquí para evitar que el segundo .onclick sobreescriba al primero.