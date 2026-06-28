function addScreenshotButton(workspace) {
  const NS = "http://www.w3.org/2000/svg";
  const svg = workspace.getParentSvg();

  // grupo
  const g = document.createElementNS(NS, "g");
  g.setAttribute("class", "blocklyScreenshotButton");
  g.style.cursor = "pointer";

  // fondo
  const rect = document.createElementNS(NS, "rect");
  rect.setAttribute("x", 10);
  rect.setAttribute("y", 0);
  rect.setAttribute("rx", 6);
  rect.setAttribute("ry", 6);
  rect.setAttribute("width", 50);
  rect.setAttribute("height", 50);
  rect.setAttribute("fill", "#ffffff");
  rect.setAttribute("stroke", "#888");

  // icono
  const img = document.createElementNS(NS, "image");
  img.setAttribute("x", 16);
  img.setAttribute("y", 6);
  img.setAttribute("width", 40);
  img.setAttribute("height", 40);
  img.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "href",
    "./static/img/camera.png", // 👈 cambia por tu icono
  );

  g.appendChild(rect);
  g.appendChild(img);
  svg.appendChild(g);

  const blocklyDiv = document.getElementById("blocklyDiv");

  function position() {
    const metrics = workspace.getMetrics();
    if (!metrics) return;
    const x = metrics.absoluteLeft + metrics.viewWidth - 80;
    const y = metrics.absoluteTop + 10;
    g.setAttribute("transform", `translate(${x},${y})`);
  }
  position();

  // cuando cambia tamaño ventana
  window.addEventListener("resize", position);

  // cuando Blockly cambia métricas
  workspace.addChangeListener((e) => {
    if (e.type === Blockly.Events.VIEWPORT_CHANGE) {
      position();
    }
  });

  g.addEventListener("mousedown", function (e) {
    e.preventDefault();
    e.stopPropagation();
    downloadBlocklyScreenshot(workspace, "imagen");
  });
  return g;
}

// ================== SVG ==================
async function workspaceToSvg(workspace) {
  const bBox = workspace.getBlocksBoundingBox();

  const x = bBox.x || bBox.left;
  const y = bBox.y || bBox.top;
  const width = bBox.width || bBox.right - x;
  const height = bBox.height || bBox.bottom - y;

  const clone = workspace.getCanvas().cloneNode(true);
  clone.removeAttribute("transform");

  // convertir imágenes a base64
  const images = clone.querySelectorAll("image");

  for (const img of images) {
    const url =
      img.getAttribute("href") ||
      img.getAttributeNS("http://www.w3.org/1999/xlink", "href");

    if (url && !url.startsWith("data:")) {
      const dataUri = await urlToDataUri(url);
      img.setAttribute("href", dataUri);
    }
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);

  svg.appendChild(clone);

  // 👇 obtener estilos reales de Blockly
  const css = [...document.querySelectorAll("style")]
    .map((s) => s.innerText)
    .filter((text) => text.includes(".blockly"))
    .join("\n");

  // 👇 obtener color real del tema
  const editableRect = document.querySelector(
    ".geras-renderer.classic-theme .blocklyEditableText > rect",
  );

  let fillColor = "#ffffff";
  let fillOpacity = "1";

  if (editableRect) {
    const computed = window.getComputedStyle(editableRect);
    fillColor = computed.fill;
    fillOpacity = computed.fillOpacity;
  }

  // estilos extra
  const extraCss = `
.blocklyText,
.blocklyEditableText text,
.blocklyNonEditableText text,
.blocklyFlyoutLabelText {
  fill: #000000 !important;
  font-family: Arial, sans-serif !important;
  font-size: 14px !important;
}

.blocklyEditableText rect,
.blocklyNonEditableText rect {
  fill: ${fillColor} !important;
  fill-opacity: ${fillOpacity} !important;
  stroke: none !important;
}
`;

  const style = document.createElement("style");
  style.innerHTML = css + extraCss;

  svg.insertBefore(style, svg.firstChild);

  // asegurar color de textos
  svg.querySelectorAll("text").forEach((t) => {
    if (!t.getAttribute("fill") || t.getAttribute("fill") === "black") {
      t.setAttribute("fill", "#000000");
    }
  });

  return svg;
}

// ================== PNG ==================
function svgToPng(svg, callback) {
  const serializer = new XMLSerializer();
  let svgStr = serializer.serializeToString(svg);

  svgStr = svgStr.replace(/&nbsp;/g, "&#160;");

  const img = new Image();

  const svgBlob = new Blob([svgStr], {
    type: "image/svg+xml;charset=utf-8",
  });

  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    const canvas = document.createElement("canvas");

    canvas.width = svg.width.baseVal.value * 2;
    canvas.height = svg.height.baseVal.value * 2;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    callback(canvas.toDataURL("image/png"));

    URL.revokeObjectURL(url);
  };

  // Si el SVG no puede renderizarse como imagen (ej: SVG malformado),
  // liberar el blob y notificar en consola sin dejar el callback colgado.
  img.onerror = () => {
    console.error("[svgToPng] Error al renderizar el SVG como imagen.");
    URL.revokeObjectURL(url);
  };

  img.src = url;
}

// ================== DOWNLOAD ==================
async function downloadBlocklyScreenshot(workspace, filename = "imagen") {
  const svg = await workspaceToSvg(workspace);

  svgToPng(svg, async (datauri) => {
    // 🖥️ APP DE ESCRITORIO
    if (window.pywebview?.api?.save_png) {
      const base64 = datauri.split(",")[1];

      const result = await window.pywebview.api.save_png(
        base64,
        filename + ".png",
      );

      if (result?.status === "ok") {
        alert("Imagen guardada en:\n" + result.path);
      }
    } else {
      // 🌐 NAVEGADOR → usar picker 🔥
      await saveFileAuto(datauri, filename + ".png");
    }
  });
}

// ================== UTILS ==================
function urlToDataUri(url) {
  return new Promise((resolve) => {
    const img = new Image();

    img.crossOrigin = "Anonymous";

    img.onload = function () {
      const canvas = document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);

      resolve(canvas.toDataURL("image/png"));
    };

    // Si la imagen falla (CORS, 404, red lenta) resolvemos con la URL
    // original para que el screenshot continúe en lugar de quedar colgado.
    img.onerror = function () {
      console.warn("[svgToPng] No se pudo cargar imagen, usando URL original:", url);
      resolve(url);
    };

    img.src = url;
  });
}