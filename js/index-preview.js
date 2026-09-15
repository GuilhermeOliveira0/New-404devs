/**
 * index-preview.js — capa que acompanha o ponteiro sobre o índice de projetos.
 *
 * Responsabilidade única: mostrar, ao apontar uma linha do índice, a capa do
 * projeto numa figura fixa que segue o ponteiro com um pouco de inércia.
 *
 * Só existe em ponteiro fino com apontamento e movimento permitido. Em toque,
 * teclado, movimento reduzido ou sem script, a linha se sustenta sozinha e a
 * capa aparece inline na expansão (design.md E5). O laço de animação roda
 * apenas enquanto o ponteiro está sobre a lista — em repouso, nada roda.
 *
 * Consome apenas atributos de dados (design.md D4).
 */

(function () {
  "use strict";

  var SELECTOR_LIST = "[data-index]";
  var SELECTOR_FIGURE = "[data-index-preview]";
  var SELECTOR_ITEM = "[data-preview]";
  var OFFSET_X = 24;
  var OFFSET_Y = -120;
  var LERP = 0.15;
  var SETTLE = 0.5;

  function init() {
    var allowed = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    ).matches;
    var list = document.querySelector(SELECTOR_LIST);
    var figure = document.querySelector(SELECTOR_FIGURE);
    if (!allowed || !list || !figure) return;

    var use = figure.querySelector("use");
    if (!use) return;

    var target = { x: 0, y: 0 };
    var current = { x: 0, y: 0 };
    var frame = 0;
    var over = false;

    function step() {
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;
      figure.style.transform = "translate(" + current.x + "px, " + current.y + "px)";

      var settled = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) < SETTLE;
      frame = over || !settled ? window.requestAnimationFrame(step) : 0;
    }

    function show(item) {
      use.setAttribute("href", "#" + item.getAttribute("data-preview"));
      over = true;
      figure.classList.add("is-on");
    }

    function hide() {
      over = false;
      figure.classList.remove("is-on");
    }

    list.addEventListener("pointermove", function (event) {
      target.x = event.clientX + OFFSET_X;
      target.y = event.clientY + OFFSET_Y;
      if (!frame) {
        current.x = target.x;
        current.y = target.y;
        frame = window.requestAnimationFrame(step);
      }
    }, { passive: true });

    list.addEventListener("pointerover", function (event) {
      var item = event.target.closest(SELECTOR_ITEM);
      if (item) show(item);
    });

    list.addEventListener("pointerleave", hide);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
