/**
 * quotes.js — um depoimento por vez, navegável.
 *
 * Responsabilidade única: alternar qual depoimento está visível e manter o
 * indicador "n / total". Sem script, o CSS mostra todos em sequência; este
 * módulo só ADICIONA a alternância (design.md E6). Nunca avança sozinho.
 *
 * Consome apenas atributos de dados (design.md D4).
 */

(function () {
  "use strict";

  var SELECTOR_ROOT = "[data-quotes]";
  var SELECTOR_ITEM = "[data-quote]";
  var SELECTOR_PREV = "[data-quotes-prev]";
  var SELECTOR_NEXT = "[data-quotes-next]";
  var SELECTOR_COUNT = "[data-quotes-count]";

  function init() {
    var root = document.querySelector(SELECTOR_ROOT);
    if (!root) return;

    var items = Array.prototype.slice.call(root.querySelectorAll(SELECTOR_ITEM));
    var prev = root.querySelector(SELECTOR_PREV);
    var next = root.querySelector(SELECTOR_NEXT);
    var count = root.querySelector(SELECTOR_COUNT);
    if (items.length < 2 || !prev || !next) return;

    var index = 0;
    // Formato do contador vem do template, no idioma da pagina.
    var countFormat = root.getAttribute("data-count-format") || "{n} / {total}";

    function render() {
      items.forEach(function (item, i) {
        if (i === index) {
          item.setAttribute("data-active", "");
          item.removeAttribute("aria-hidden");
        } else {
          item.removeAttribute("data-active");
          item.setAttribute("aria-hidden", "true");
        }
      });
      if (count) count.textContent = countFormat.replace("{n}", index + 1).replace("{total}", items.length);
    }

    function go(delta) {
      index = (index + delta + items.length) % items.length;
      render();
    }

    prev.addEventListener("click", function () { go(-1); });
    next.addEventListener("click", function () { go(1); });

    root.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
    });

    render();
    root.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
