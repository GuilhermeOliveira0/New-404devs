/**
 * theme.js — alternância entre tema claro e escuro.
 *
 * Responsabilidade única: ler a escolha do visitante, aplicá-la e persistir.
 * A paleta em si vive nos tokens de CSS ([data-theme="light"|"dark"]); este
 * módulo só decide qual atributo o <html> carrega.
 *
 * Sem escolha explícita, vale a preferência do sistema (prefers-color-scheme),
 * que o CSS já trata sozinho. O script inline no <head> aplica a escolha
 * salva ANTES da primeira pintura, para não haver flash de tema.
 *
 * A troca é um gesto único: uma cortina circular que parte do botão, via View
 * Transitions API. Onde a API não existe, ou sob movimento reduzido, a troca é
 * instantânea. Nunca uma transição simultânea de cor em todos os elementos —
 * isso repinta a página inteira e é o cheiro de template mais comum em dark
 * mode (design.md E11).
 *
 * Consome apenas atributos de dados (design.md D4).
 */

(function () {
  "use strict";

  var STORAGE_KEY = "theme";
  var SELECTOR_TOGGLE = "[data-theme-toggle]";
  var SELECTOR_META = 'meta[name="theme-color"]';
  var root = document.documentElement;

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function currentTheme() {
    return root.getAttribute("data-theme") || systemTheme();
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /** Lê a duração e a curva dos tokens: o módulo não conhece valores de tempo. */
  function readToken(name, fallback) {
    var value = getComputedStyle(root).getPropertyValue(name).trim();
    return value || fallback;
  }

  function syncToggles(theme) {
    var isLight = theme === "light";
    var toggles = document.querySelectorAll(SELECTOR_TOGGLE);
    Array.prototype.forEach.call(toggles, function (toggle) {
      toggle.setAttribute("aria-pressed", isLight ? "true" : "false");
      // O rótulo descreve a AÇÃO que o acionamento executa, não o estado atual.
      var label = isLight
        ? toggle.getAttribute("data-label-to-dark")
        : toggle.getAttribute("data-label-to-light");
      if (label) toggle.setAttribute("aria-label", label);
    });
  }

  /** A cor da moldura do navegador acompanha a superfície da página. */
  function syncThemeColor() {
    var meta = document.querySelector(SELECTOR_META);
    if (!meta) return;
    var surface = getComputedStyle(root).getPropertyValue("--surface-page").trim();
    if (surface) meta.setAttribute("content", surface);
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    syncToggles(theme);
    syncThemeColor();
  }

  function persist(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      // Armazenamento indisponível (modo privado, cota): a escolha vale só nesta página.
    }
  }

  /** Cortina circular a partir do centro do botão; instantânea onde não couber. */
  function transitionTo(theme, origin) {
    var canAnimate = typeof document.startViewTransition === "function" && !prefersReducedMotion();
    if (!canAnimate) {
      apply(theme);
      return;
    }

    var rect = origin.getBoundingClientRect();
    var x = rect.left + rect.width / 2;
    var y = rect.top + rect.height / 2;
    var radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    var transition = document.startViewTransition(function () {
      apply(theme);
    });

    transition.ready.then(function () {
      root.animate(
        {
          clipPath: [
            "circle(0px at " + x + "px " + y + "px)",
            "circle(" + radius + "px at " + x + "px " + y + "px)",
          ],
        },
        {
          duration: parseFloat(readToken("--duration-theme", "450ms")),
          easing: readToken("--ease-out", "cubic-bezier(0.22, 1, 0.36, 1)"),
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }

  function init() {
    var toggles = document.querySelectorAll(SELECTOR_TOGGLE);
    if (toggles.length === 0) return;

    syncToggles(currentTheme());
    syncThemeColor();

    Array.prototype.forEach.call(toggles, function (toggle) {
      toggle.addEventListener("click", function () {
        var next = currentTheme() === "light" ? "dark" : "light";
        transitionTo(next, toggle);
        persist(next);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
