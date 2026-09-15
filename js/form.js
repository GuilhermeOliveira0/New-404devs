/**
 * form.js — validação e envio do formulário de contato.
 *
 * Responsabilidade única: garantir que um contato iniciado pelo visitante
 * chegue à equipe, ou que o visitante saiba imediatamente que não chegou e
 * tenha um caminho alternativo. Muda apenas quando as regras de contato mudam.
 *
 * Nenhuma dependência do cliente de e-mail do visitante e nenhuma janela
 * emergente: o envio é uma requisição assíncrona para a função de contato.
 */

(function () {
  "use strict";

  var ENDPOINT = "/api/contact";
  var FALLBACK_URL = "https://wa.me/5517996142053";
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var DIGITS_PATTERN = /\d/g;
  var MIN_PHONE_DIGITS = 10;

  function init() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    var submit = form.querySelector("[data-contact-submit]");
    var notice = form.querySelector("[data-contact-notice]");
    var submitLabel = submit ? submit.textContent.trim() : "";
    var sending = false;

    // Nomes literais em vez de concatenacao: uma busca por "notice--danger"
    // encontra este ponto de uso e o seletor nao vira orfao aparente.
    var TONE_CLASS = {
      neutral: "notice",
      success: "notice notice--success",
      danger: "notice notice--danger"
    };

    function say(message, tone) {
      if (!notice) return;
      notice.textContent = message;
      notice.className = TONE_CLASS[tone] || TONE_CLASS.neutral;
    }

    function field(name) {
      return form.elements[name];
    }

    function markInvalid(element, message) {
      element.setAttribute("aria-invalid", "true");
      say(message, "danger");
      element.focus();
    }

    function clearInvalid() {
      Array.prototype.forEach.call(form.elements, function (element) {
        element.removeAttribute("aria-invalid");
      });
    }

    /** Aceita e-mail OU telefone: o visitante escolhe como quer ser respondido. */
    function isReachable(value) {
      if (EMAIL_PATTERN.test(value)) return true;
      var digits = value.match(DIGITS_PATTERN);
      return digits !== null && digits.length >= MIN_PHONE_DIGITS;
    }

    function validate() {
      clearInvalid();

      var name = field("nome");
      if (!name.value.trim()) {
        markInvalid(name, "Informe o seu nome para que a gente saiba com quem falar.");
        return false;
      }

      var reach = field("contato");
      var reachValue = reach.value.trim();
      if (!reachValue) {
        markInvalid(reach, "Informe um e-mail ou WhatsApp para podermos responder.");
        return false;
      }
      if (!isReachable(reachValue)) {
        markInvalid(reach, "Esse contato não parece válido. Use um e-mail ou um número com DDD.");
        return false;
      }

      return true;
    }

    function setSending(active) {
      sending = active;
      if (!submit) return;
      submit.disabled = active;
      submit.textContent = active ? "Enviando..." : submitLabel;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (sending) return;

      // Armadilha anti-spam: pessoas não veem nem tabulam até este campo.
      if (field("empresa") && field("empresa").value) return;

      if (!validate()) return;

      setSending(true);
      say("");

      var payload = {
        nome: field("nome").value.trim(),
        contato: field("contato").value.trim(),
        segmento: field("segmento") ? field("segmento").value.trim() : "",
        mensagem: field("mensagem") ? field("mensagem").value.trim() : ""
      };

      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          if (!response.ok) throw new Error("resposta " + response.status);
          form.reset();
          clearInvalid();
          say("Mensagem enviada. Respondemos em até 24 horas úteis.", "success");
        })
        .catch(function () {
          say(
            "Não conseguimos enviar agora. Fale com a gente no WhatsApp: " + FALLBACK_URL,
            "danger"
          );
        })
        .finally(function () {
          setSending(false);
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
