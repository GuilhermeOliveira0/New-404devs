/**
 * api/contact.js — recebe o formulário de contato do site.
 *
 * Responsabilidade única: validar o contato no servidor e entregá-lo à equipe.
 *
 * Sem dependência: a API do provedor de e-mail é chamada por `fetch`, que o
 * runtime do Node já oferece. Isso mantém a decisão D2 — o projeto não tem
 * `node_modules`.
 *
 * Variáveis de ambiente esperadas:
 *   RESEND_API_KEY   chave do provedor de e-mail transacional
 *   CONTACT_TO       destinatário (padrão: 404devsoficial@gmail.com)
 *   CONTACT_FROM     remetente verificado no provedor
 *   CONTACT_WEBHOOK_URL  destino opcional para copia do lead (registro secundario)
 *
 * Sem a chave configurada, a função responde 503. O front-end trata esse caso
 * exibindo o caminho alternativo de contato, conforme a spec captacao-de-leads.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PHONE_DIGITS = 10;
const MAX_FIELD_LENGTH = 4000;

const DEFAULT_TO = "404devsoficial@gmail.com";
const DEFAULT_FROM = "404Devs <onboarding@resend.dev>";

/** Aceita e-mail OU telefone: o visitante escolhe como quer ser respondido. */
function isReachable(value) {
  if (EMAIL_PATTERN.test(value)) return true;
  const digits = value.match(/\d/g);
  return digits !== null && digits.length >= MIN_PHONE_DIGITS;
}

function clean(value) {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

/** Espelha a validação do cliente: o navegador pode ser contornado. */
function validate(payload) {
  if (!payload.nome) return "Informe o seu nome.";
  if (!payload.contato) return "Informe um e-mail ou WhatsApp.";
  if (!isReachable(payload.contato)) return "O contato informado não é válido.";
  return null;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildEmail(payload) {
  const linhas = [
    ["Nome", payload.nome],
    ["Contato", payload.contato],
    ["Segmento", payload.segmento || "não informado"],
    ["Mensagem", payload.mensagem || "não informada"],
  ];

  return linhas
    .map(([rotulo, valor]) => `<p><strong>${rotulo}:</strong><br>${escapeHtml(valor)}</p>`)
    .join("\n");
}

async function sendEmail(payload, apiKey) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || DEFAULT_FROM,
      to: [process.env.CONTACT_TO || DEFAULT_TO],
      reply_to: EMAIL_PATTERN.test(payload.contato) ? payload.contato : undefined,
      subject: `Contato do site — ${payload.nome}`,
      html: buildEmail(payload),
    }),
  });

  if (!response.ok) {
    throw new Error(`provedor respondeu ${response.status}`);
  }
}

/**
 * Registro secundario: o lead nao pode existir apenas no e-mail.
 * Com CONTACT_WEBHOOK_URL configurada (planilha, automacao, o que o time
 * escolher), recebe uma copia. Sem ela, o log estruturado abaixo e o destino
 * recuperavel. Uma falha aqui nunca derruba o envio principal.
 */
async function registerBackup(payload) {
  const registro = { em: new Date().toISOString(), ...payload };
  console.log("CONTATO_RECEBIDO", JSON.stringify(registro));

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return;

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registro),
    });
  } catch (causa) {
    console.error("Webhook de registro falhou:", causa.message);
  }
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ erro: "Método não permitido." });
  }

  const body = typeof request.body === "string" ? JSON.parse(request.body) : request.body || {};

  // Armadilha anti-spam: pessoas não veem nem tabulam até este campo.
  // Responde 200 de propósito, para o robô não aprender que foi barrado.
  if (clean(body.empresa)) {
    return response.status(200).json({ ok: true });
  }

  const payload = {
    nome: clean(body.nome),
    contato: clean(body.contato),
    segmento: clean(body.segmento),
    mensagem: clean(body.mensagem),
  };

  const erro = validate(payload);
  if (erro) {
    return response.status(400).json({ erro });
  }

  // Registra ANTES de tentar entregar: o lead precisa sobreviver a uma falha
  // do provedor de e-mail, que é justamente o caso que o registro cobre.
  await registerBackup(payload);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY não configurada — contato só no registro secundário.");
    return response.status(503).json({
      erro: "Canal de e-mail indisponível no momento.",
    });
  }

  try {
    await sendEmail(payload, apiKey);
    return response.status(200).json({ ok: true });
  } catch (causa) {
    console.error("Falha ao enviar contato:", causa.message);
    return response.status(502).json({ erro: "Não foi possível enviar agora." });
  }
}
