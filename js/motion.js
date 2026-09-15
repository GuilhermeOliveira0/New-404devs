/**
 * motion.js — orquestração do sistema de movimento.
 *
 * Responsabilidade única: decidir QUANDO cada elemento entra. O COMO — duração,
 * curva, deslocamento — vive nos tokens de CSS, que este módulo lê em vez de
 * duplicar. Nenhum valor de tempo é escrito aqui (design.md D6).
 *
 * Três elementos orquestrados:
 *   1. sequência de abertura da primeira dobra, escalonada
 *   2. momento assinatura: o traço que risca as palavras do título
 *   3. revelação por scroll, com escalonamento interno por seção
 *
 * O quarto elemento do sistema — o painel de navegação — é puramente CSS.
 *
 * Contrato de segurança: este módulo só ADICIONA estado visível. Se ele não
 * rodar, o failsafe declarado no <head> remove [data-motion] e todo o conteúdo
 * aparece em seu estado final.
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

  /** 1 · sequência de abertura, escalonada. */
  function playHeroSequence(stagger) {
    var steps = document.querySelectorAll("[data-hero-step]");

    Array.prototype.forEach.call(steps, function (step, index) {
      window.setTimeout(function () {
        step.classList.add("is-entered");
      }, index * stagger);
    });

    return steps.length * stagger;
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

  /** 3 · revelação por scroll, com escalonamento entre irmãos da mesma seção. */
  function observeReveals(stagger) {
    var targets = document.querySelectorAll("[data-reveal]");

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

          // Revela uma única vez: para de observar assim que dispara.
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
    // Assume o controle: o conteúdo não depende mais do temporizador de
    // segurança declarado no <head>.
    window.clearTimeout(window.__motionFailsafe);

    if (!isMotionEnabled()) return;

    var staggerHero = readDuration("--stagger-hero");
    var staggerReveal = readDuration("--stagger-reveal");

    var heroDuration = playHeroSequence(staggerHero);
    playSignature(heroDuration);
    observeReveals(staggerReveal);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
