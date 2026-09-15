/**
 * motion.js — orquestração do sistema de movimento.
 *
 * Responsabilidade única: decidir QUANDO cada elemento entra. O COMO — duração,
 * curva, deslocamento — vive nos tokens de CSS, que este módulo lê em vez de
 * duplicar. Nenhum valor de tempo é escrito aqui (design.md D6, E11).
 *
 * Elementos orquestrados:
 *   1. sequência de abertura da primeira dobra, escalonada; o título já vem
 *      fatiado em palavras pelo script inline após o <h1> e sobe palavra a
 *      palavra ao receber .is-entered
 *   2. momento assinatura: o traço que risca as palavras do título, ao fim
 *   3. revelação por scroll de [data-reveal] e réguas em cascata de
 *      [data-rules], uma vez por elemento
 *
 * Contrato de segurança: este módulo só ADICIONA estado visível. Se não rodar,
 * o failsafe do <head> remove [data-motion] e tudo aparece em estado final.
 */

(function () {
  "use strict";

  var root = document.documentElement;

  /** Lê um token de duração do CSS e devolve em milissegundos. */
  function readDuration(token) {
    var raw = getComputedStyle(root).getPropertyValue(token).trim();
    if (!raw) return 0;
    var value = parseFloat(raw);
    return raw.indexOf("ms") !== -1 ? value : value * 1000;
  }

  function isMotionEnabled() {
    return root.getAttribute("data-motion") === "on";
  }

  /** 1 · sequência de abertura. Devolve quando o último elemento termina. */
  function playHeroSequence(staggerStep, staggerWord, enterDuration) {
    var steps = document.querySelectorAll("[data-hero-step]");
    var lastEnd = 0;

    Array.prototype.forEach.call(steps, function (step, index) {
      var start = index * staggerStep;
      window.setTimeout(function () {
        step.classList.add("is-entered");
      }, start);

      // O título fatiado termina quando a última palavra sobe.
      var words = step.classList.contains("is-split") ? step.querySelectorAll(".w__in").length : 1;
      var end = start + (words - 1) * staggerWord + enterDuration;
      if (end > lastEnd) lastEnd = end;
    });

    return lastEnd;
  }

  /** 2 · momento assinatura: o traço sobre as palavras do título. */
  function playSignature(delay) {
    var marks = document.querySelectorAll("[data-signature]");
    window.setTimeout(function () {
      Array.prototype.forEach.call(marks, function (mark) {
        mark.classList.add("is-struck");
      });
    }, delay);
  }

  /** 3 · revelação por scroll e réguas, com escalonamento entre irmãos. */
  function observeReveals(stagger) {
    var targets = document.querySelectorAll("[data-reveal], [data-rules]");

    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(targets, function (target) {
        target.classList.add("is-revealed");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        var visible = entries.filter(function (entry) {
          return entry.isIntersecting;
        });

        visible.forEach(function (entry, index) {
          window.setTimeout(function () {
            entry.target.classList.add("is-revealed");
          }, index * stagger);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    Array.prototype.forEach.call(targets, function (target) {
      observer.observe(target);
    });
  }

  function init() {
    window.clearTimeout(window.__motionFailsafe);
    if (!isMotionEnabled()) return;

    var staggerHero = readDuration("--stagger-hero");
    var staggerWord = readDuration("--stagger-word");
    var staggerReveal = readDuration("--stagger-reveal");
    var enter = readDuration("--duration-enter");
    var signature = readDuration("--duration-signature");

    var heroEnd = playHeroSequence(staggerHero, staggerWord, enter);
    // O traço começa quando as palavras ainda estão terminando de subir, para
    // que a sequência inteira caiba em 1200 ms (spec design-system).
    playSignature(Math.max(0, heroEnd - signature));
    observeReveals(staggerReveal);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
