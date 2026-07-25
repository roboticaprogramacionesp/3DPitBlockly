/**
 * ============================================================================
 *  field-slider.js — Custom slider field para Blockly
 *  Compatible con Blockly 6.x y 10.x (auto-detecta)
 *  Cargar DESPUÉS de blockly_compressed.js y ANTES de tus bloques.
 *
 *  Uso en defineBlocksWithJsonArray:
 *    { "type": "field_slider", "name": "BRIGHT", "value": 50, "min": 0, "max": 100 }
 *
 *  Lectura en el generador Python:
 *    block.getFieldValue("BRIGHT")   //  →  número (ej. 47)
 * ============================================================================
 */
(function () {
  "use strict";

  if (typeof Blockly === "undefined") {
    console.error("[field-slider] Blockly no está cargado.");
    return;
  }

  // ── CSS inyectado en <head> ──
  var SLIDER_CSS = [
    ".blocklySliderDropDown {",
    "  padding: 16px 18px 18px;",
    "  background: #232323;",
    "  border-radius: 14px;",
    "  display: flex;",
    "  flex-direction: column;",
    "  gap: 12px;",
    "  font-family: sans-serif;",
    "  min-width: 240px;",
    "  box-shadow: 0 8px 24px rgba(0,0,0,0.35);",
    "}",
    ".blocklySliderHeader {",
    "  display: flex;",
    "  align-items: center;",
    "  justify-content: space-between;",
    "}",
    ".blocklySliderLabel {",
    "  color: #9a9a9a;",
    "  font-size: 11px;",
    "  font-weight: 600;",
    "  text-transform: uppercase;",
    "  letter-spacing: 0.06em;",
    "}",
    ".blocklySliderReadout {",
    "  min-width: 42px;",
    "  text-align: center;",
    "  color: #fff;",
    "  background: var(--slider-accent, #3454d1);",
    "  border-radius: 8px;",
    "  padding: 4px 10px;",
    "  font-size: 15px;",
    "  font-weight: 700;",
    "  font-family: monospace;",
    "}",
    ".blocklySliderDropDown input[type='range'] {",
    "  width: 100%;",
    "  -webkit-appearance: none;",
    "  appearance: none;",
    "  height: 10px;",
    "  border-radius: 5px;",
    "  background: #3a3a3a;",
    "  outline: none;",
    "  cursor: pointer;",
    "}",
    ".blocklySliderDropDown input[type='range']::-webkit-slider-thumb {",
    "  -webkit-appearance: none;",
    "  appearance: none;",
    "  width: 24px;",
    "  height: 24px;",
    "  border-radius: 50%;",
    "  background: #fff;",
    "  border: 4px solid var(--slider-accent, #3454d1);",
    "  cursor: pointer;",
    "  box-shadow: 0 2px 6px rgba(0,0,0,0.45);",
    "}",
    ".blocklySliderDropDown input[type='range']::-moz-range-thumb {",
    "  width: 24px;",
    "  height: 24px;",
    "  border-radius: 50%;",
    "  background: #fff;",
    "  border: 4px solid var(--slider-accent, #3454d1);",
    "  cursor: pointer;",
    "  box-shadow: 0 2px 6px rgba(0,0,0,0.45);",
    "}",
    ".blocklySliderDropDown input[type='range']::-moz-range-track {",
    "  height: 10px;",
    "  border-radius: 5px;",
    "  background: #3a3a3a;",
    "}",
    ".blocklySliderDropDown input[type='range']::-moz-range-progress {",
    "  height: 10px;",
    "  border-radius: 5px;",
    "  background: var(--slider-accent, #3454d1);",
    "}"
  ].join("\n");

  if (!document.getElementById("field-slider-styles")) {
    var style = document.createElement("style");
    style.id = "field-slider-styles";
    style.textContent = SLIDER_CSS;
    document.head.appendChild(style);
  }

  // ── Detección de versión ──
  var hasFieldRegistry = !!Blockly.fieldRegistry;
  var hasObjectInherit = !!(Blockly.utils && Blockly.utils.object && Blockly.utils.object.inherit);
  //console.log("[field-slider] Blockly — fieldRegistry:", hasFieldRegistry, "| object.inherit:", hasObjectInherit);

  function createSvgElement(tag, attrs, parent) {
    if (Blockly.utils && Blockly.utils.dom && Blockly.utils.dom.createSvgElement) {
      return Blockly.utils.dom.createSvgElement(tag, attrs, parent);
    }
    var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    if (attrs) {
      for (var k in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, k)) {
          el.setAttribute(k, attrs[k]);
        }
      }
    }
    if (parent) parent.appendChild(el);
    return el;
  }

  function makeSize(w, h) {
    if (Blockly.utils && Blockly.utils.Size) {
      return new Blockly.utils.Size(w, h);
    }
    return { width: w, height: h };
  }

  // ⭐ Ancho de la "pastilla" según cuántos dígitos puede llegar a mostrar
  //    (así un slider 0–100 saca un óvalo un poco más ancho que uno 0–10,
  //    y ninguno queda ni muy grande ni con el texto apretado).
  function calcPillWidth(min, max) {
    var lenMin = String(Math.trunc(Number(min))).length;
    var lenMax = String(Math.trunc(Number(max))).length;
    var digits = Math.max(lenMin, lenMax, 2);
    return Math.max(34, digits * 9 + 18);
  }

  // ── Popup del slider (compartido entre la rama 10.x y la 6.x) ──
  // Construye una tarjeta con: etiqueta, valor destacado (badge) y una
  // barra tipo pill que se rellena con el color del propio bloque
  // (igual que Scratch/micro:bit/PictoBlox), en vez de un <input range>
  // pelón de navegador.
  function buildSliderPopupDom(field) {
    var accent = "#3454d1";
    try {
      var block = field.getSourceBlock && field.getSourceBlock();
      if (block && typeof block.getColour === "function") {
        accent = block.getColour() || accent;
      }
    } catch (e) {}

    var div = document.createElement("div");
    div.className = "blocklySliderDropDown";
    div.style.setProperty("--slider-accent", accent);

    var header = document.createElement("div");
    header.className = "blocklySliderHeader";

    var label = document.createElement("span");
    label.className = "blocklySliderLabel";
    label.textContent = (field.name || "valor").toLowerCase();

    var readout = document.createElement("span");
    readout.className = "blocklySliderReadout";
    readout.textContent = String(Math.round(field.value_));

    header.appendChild(label);
    header.appendChild(readout);

    var input = document.createElement("input");
    input.type = "range";
    input.min = field.min_;
    input.max = field.max_;
    input.step = "1";
    input.value = Math.round(field.value_);

    function paintTrack() {
      var pct = 0;
      var range = field.max_ - field.min_;
      if (range > 0) {
        pct = ((Number(input.value) - field.min_) / range) * 100;
      }
      input.style.background =
        "linear-gradient(to right, " + accent + " " + pct + "%, #3a3a3a " + pct + "%)";
    }
    paintTrack();

    var onChange = function () {
      var v = Math.round(Number(input.value));
      readout.textContent = String(v);
      paintTrack();
      field.setValue(v);
    };
    input.addEventListener("input", onChange);
    input.addEventListener("change", onChange);

    div.appendChild(header);
    div.appendChild(input);

    return { div: div, input: input };
  }

  // ════════════════════════════════════════════════════════════════
  //  BLOCKLY 10.x — class + fieldRegistry
  // ════════════════════════════════════════════════════════════════
  if (hasFieldRegistry) {
    //console.log("[field-slider] Usando API Blockly 10.x");

    class FieldSlider10 extends Blockly.Field {
      constructor(value, min, max, validator) {
        var num = Number(value);
        if (isNaN(num)) num = 50;
        super(num, validator);
        this.min_ = (min === undefined || min === null) ? 0 : Number(min);
        this.max_ = (max === undefined || max === null) ? 100 : Number(max);
        this.pillWidth_ = calcPillWidth(this.min_, this.max_);
        this.pillHeight_ = 20;
        this.size_ = makeSize(this.pillWidth_, this.pillHeight_);
        // ⭐ El constructor base (super) ya llamó a setValue()/doClassValidation_()
        //    ANTES de que min_/max_ existieran, así que el valor pudo quedar mal
        //    (incluso NaN). Volvemos a fijar el valor ahora que sí tenemos min_/max_.
        this.setValue(num);
        // ⭐ IMPORTANTE: SERIALIZABLE en la INSTANCIA (no solo static)
        this.SERIALIZABLE = true;
      }

      static SERIALIZABLE = true;

      static fromJson(options) {
        return new FieldSlider10(
          options["value"],
          options["min"],
          options["max"]
        );
      }

      saveState() {
        return String(this.value_);
      }

      loadState(state) {
        this.setValue(state);
      }

      doClassValidation_(newValue) {
        var n = Number(newValue);
        if (isNaN(n)) return null;
        // ⭐ Redondeamos a entero: para % de brillo/velocidad no queremos
        //    decimales largos como 36.9369369369.
        n = Math.round(n);
        if (this.min_ === undefined || this.max_ === undefined) return n;
        return Math.min(this.max_, Math.max(this.min_, n));
      }

      // ⭐ Blockly 10.x requiere estos nombres exactos:
      //    fieldGroup_, borderRect_  y textElement_
      //
      // ⚠️ IMPORTANTE: Field.prototype.init() (la clase base, no la tocamos)
      // YA crea this.fieldGroup_ y YA lo inserta en el <svg> del bloque
      // ANTES de llamar a initView(). Si aquí lo volvemos a crear con
      // createSvgElement(..., null), queda un <g> nuevo desconectado del
      // DOM y el campo se ve vacío. Por eso NO reasignamos fieldGroup_,
      // solo colgamos el rect y el texto del que ya existe.
      initView() {
        var accent = "#3454d1";
        try {
          var block = this.getSourceBlock && this.getSourceBlock();
          if (block && typeof block.getColour === "function") {
            accent = block.getColour() || accent;
          }
        } catch (e) {}
        this.accent_ = accent;

        this.borderRect_ = createSvgElement(
          "rect",
          {
            rx: 10,
            ry: 10,
            height: this.pillHeight_,
            width: this.pillWidth_,
            fill: "#ffffff",
            stroke: accent,
            "stroke-width": 2,
            class: "blocklySliderRect"
          },
          this.fieldGroup_
        );

        this.textElement_ = createSvgElement(
          "text",
          {
            class: "blocklyText",
            x: this.pillWidth_ / 2,
            y: this.pillHeight_ / 2,
            "text-anchor": "middle",
            "dominant-baseline": "central",
            fill: "#2c2c2c",
            "font-weight": "600"
          },
          this.fieldGroup_
        );
        this.textElement_.textContent = String(this.value_);
      }

      updateDisplay_() {
        if (this.textElement_) {
          this.textElement_.textContent = String(this.value_);
        }
      }

      getSize() {
        return this.size_;
      }

      showEditor_() {
        var contentDiv = Blockly.DropDownDiv.getContentDiv();
        Blockly.DropDownDiv.clearContent();

        var popup = buildSliderPopupDom(this);
        contentDiv.appendChild(popup.div);

        Blockly.DropDownDiv.setColour("#232323", "#3a3a3a");
        // ⭐ API real: showPositionedByField(field, opt_onHide, opt_secondaryYOffset)
        //    (NO Blockly.DropDownDiv.show(this, div) — esa firma no existe;
        //    show() es de bajo nivel y requiere que boundsElement_ ya esté
        //    fijado, cosa que solo hace showPositionedByField/ByBlock).
        Blockly.DropDownDiv.showPositionedByField(this, function () {});
        setTimeout(function () {
          try { popup.input.focus(); } catch (e) {}
        }, 30);
      }

      // ⭐ Blockly recomienda sobreescribir doValueUpdate_ (no setValue) para
      //    reflejar cambios de valor en la UI. setValue() de la clase base
      //    ya llama a doClassValidation_ (que clampa) y luego a esto.
      doValueUpdate_(newValue) {
        super.doValueUpdate_(newValue);
        this.updateDisplay_();
      }
    }

    Blockly.fieldRegistry.register("field_slider", FieldSlider10);

  // ════════════════════════════════════════════════════════════════
  //  BLOCKLY 6.x — function + Field.register + object.inherit
  // ════════════════════════════════════════════════════════════════
  } else if (hasObjectInherit) {
   //console.log("[field-slider] Usando API Blockly 6.x");

    function FieldSlider6(value, min, max, validator) {
      var num = Number(value);
      if (isNaN(num)) num = 50;
      var mn = (min === undefined || min === null) ? 0 : Number(min);
      var mx = (max === undefined || max === null) ? 100 : Number(max);
      if (num < mn) num = mn;
      if (num > mx) num = mx;

      FieldSlider6.superClass_.constructor.call(this, num, validator);

      this.min_ = mn;
      this.max_ = mx;
      this.pillWidth_ = calcPillWidth(mn, mx);
      this.pillHeight_ = 20;
      this.size_ = makeSize(this.pillWidth_, this.pillHeight_);
      this.SERIALIZABLE = true;
    }
    Blockly.utils.object.inherit(FieldSlider6, Blockly.Field);

    FieldSlider6.fromJson = function (options) {
      return new FieldSlider6(options["value"], options["min"], options["max"]);
    };

    FieldSlider6.prototype.saveState = function () {
      return String(this.value_);
    };
    FieldSlider6.prototype.loadState = function (state) {
      this.setValue(state);
    };
    // ⭐ El nombre correcto que usa Blockly.Field internamente lleva guion
    //    bajo al final: doClassValidation_ (sin él, nunca se llama).
    FieldSlider6.prototype.doClassValidation_ = function (newValue) {
      var n = Number(newValue);
      if (isNaN(n)) return null;
      n = Math.round(n);
      if (this.min_ === undefined || this.max_ === undefined) return n;
      return Math.min(this.max_, Math.max(this.min_, n));
    };

    FieldSlider6.prototype.init = function () {
      if (this.fieldGroup_) return;
      this.fieldGroup_ = createSvgElement("g", {}, null);

      var accent = "#3454d1";
      try {
        if (this.sourceBlock_ && typeof this.sourceBlock_.getColour === "function") {
          accent = this.sourceBlock_.getColour() || accent;
        }
      } catch (e) {}
      this.accent_ = accent;

      this.borderRect_ = createSvgElement(
        "rect",
        { rx: 10, ry: 10, height: this.pillHeight_, width: this.pillWidth_, fill: "#ffffff", stroke: accent, "stroke-width": 2 },
        this.fieldGroup_
      );
      this.textElement_ = createSvgElement(
        "text",
        { class: "blocklyText", x: this.pillWidth_ / 2, y: this.pillHeight_ / 2, "text-anchor": "middle", "dominant-baseline": "central", fill: "#2c2c2c", "font-weight": "600" },
        this.fieldGroup_
      );
      this.textElement_.textContent = String(this.value_);
      this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);
    };

    FieldSlider6.prototype.updateDisplay = function () {
      if (this.textElement_) this.textElement_.textContent = String(this.value_);
    };

    FieldSlider6.prototype.getSize = function () {
      return this.size_;
    };

    FieldSlider6.prototype.showEditor = function () {
      var contentDiv = Blockly.DropDownDiv.getContentDiv();
      Blockly.DropDownDiv.clearContent();

      var popup = buildSliderPopupDom(this);
      contentDiv.appendChild(popup.div);

      Blockly.DropDownDiv.setColour("#232323", "#3a3a3a");
      Blockly.DropDownDiv.showPositionedByField(this, function () {});
      setTimeout(function () { try { popup.input.focus(); } catch (e) {} }, 30);
    };

    FieldSlider6.prototype.setValue = function (newValue) {
      var n = Number(newValue);
      if (isNaN(n)) return;
      var old = this.value_;
      this.value_ = n;
      if (this.value_ < this.min_) this.value_ = this.min_;
      if (this.value_ > this.max_) this.value_ = this.max_;
      if (this.value_ !== old) this.updateDisplay();
      FieldSlider6.superClass_.setValue.call(this, this.value_);
    };

    Blockly.Field.register("field_slider", FieldSlider6);

  } else {
    console.error("[field-slider] No se detectó API compatible");
    return;
  }

  //console.log("[field-slider] registrado OK (field_slider)");
})();