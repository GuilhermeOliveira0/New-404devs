/**
 * nav.js — estado e acessibilidade da navegação.
 *
 * Responsabilidade única: abrir, fechar e manter acessível o painel de
 * navegação das telas estreitas. Muda apenas quando a navegação muda.
 *
 * Consome exclusivamente atributos de dados (design.md D4). Nenhuma classe de
 * apresentação é referenciada aqui: renomear `.bar__panel` não quebra nada.
 */

(function () {
  "use strict";

  var SELECTOR_TOGGLE = "[data-nav-toggle]";
  var SELECTOR_PANEL = "[data-nav-panel]";
  var FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

  function init() {
    var toggle = document.querySelector(SELECTOR_TOGGLE);
    var panel = document.querySelector(SELECTOR_PANEL);

    if (!toggle || !panel) return;

    function isOpen() {
      return panel.getAttribute("data-open") === "true";
    }

    function setOpen(open) {
      panel.setAttribute("data-open", open ? "true" : "false");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    function close(returnFocus) {
      if (!isOpen()) return;
      setOpen(false);
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener("click", function () {
      setOpen(!isOpen());
    });

    // Escolher um destino fecha o painel antes de navegar até a seção.
    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) close(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        close(true);
        return;
      }

      // Mantém o foco dentro do painel enquanto ele está aberto.
      if (event.key !== "Tab" || !isOpen()) return;

      var items = Array.prototype.slice.call(panel.querySelectorAll(FOCUSABLE));
      if (items.length === 0) return;

      var first = items[0];
      var last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // Clique fora do painel e do controle fecha, sem roubar o foco.
    document.addEventListener("click", function (event) {
      if (!isOpen()) return;
      if (panel.contains(event.target) || toggle.contains(event.target)) return;
      close(false);
    });

    // Ao alargar a janela, a navegação horizontal reaparece pelo CSS; o painel
    // precisa voltar ao estado fechado para não ficar aberto por baixo dela.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) close(false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
