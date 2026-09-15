/**
 * clock.js — hora local da equipe nos metadados de canto.
 *
 * Responsabilidade única: escrever a hora de São Paulo em [data-clock] e
 * atualizá-la a cada 30 segundos. Não anima nada: é uma troca de texto.
 * O template traz um valor de repouso ("--:--") para o caso sem script.
 *
 * Consome apenas atributos de dados (design.md D4).
 */

(function () {
  "use strict";

  var SELECTOR = "[data-clock]";
  var TIME_ZONE = "America/Sao_Paulo";
  var INTERVAL_MS = 30000;

  function init() {
    var targets = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));
    if (targets.length === 0) return;

    var lang = document.documentElement.lang || "pt-BR";
    var format = new Intl.DateTimeFormat(lang, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: TIME_ZONE,
    });

    function tick() {
      var now = new Date();
      var text = format.format(now);
      targets.forEach(function (el) {
        el.textContent = text;
        el.setAttribute("datetime", now.toISOString());
      });
    }

    tick();
    window.setInterval(tick, INTERVAL_MS);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
