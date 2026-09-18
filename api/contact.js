// Uses the same Resend configuration as the original contact endpoint.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const attempts = new Map();
const WINDOW = 10 * 60 * 1000;
export const MAX_BODY_BYTES = 32768;
const text = value => typeof value === 'string' ? value.trim() : '';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ erro: 'Método não permitido.' });
  }
  if (String(req.headers['content-type'] || '').split(';')[0].trim().toLowerCase() !== 'application/json') {
    return res.status(415).json({ erro: 'Use o formulário do site para enviar sua mensagem.' });
  }
  // Browser submissions must come from this host. This is not a bot defence.
  if (req.headers['sec-fetch-site'] === 'cross-site') return res.status(403).json({ erro: 'Origem não permitida.' });
  if (req.headers.origin) {
    try {
      const origin = new URL(req.headers.origin);
      if (!['http:', 'https:'].includes(origin.protocol) || origin.host !== req.headers.host) throw new Error('origin');
    } catch { return res.status(403).json({ erro: 'Origem não permitida.' }); }
  }
  let body;
  try {
    const raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : req.body;
    const serialized = typeof raw === 'string' ? raw : JSON.stringify(raw ?? null);
    if (Buffer.byteLength(serialized, 'utf8') > MAX_BODY_BYTES) return res.status(413).json({ erro: 'Mensagem muito longa.' });
    body = typeof raw === 'string' ? JSON.parse(raw) : raw;
  }
  catch { return res.status(400).json({ erro: 'Mensagem inválida.' }); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ erro: 'Mensagem inválida.' });
  }
  if (text(body.website)) return res.status(200).json({ ok: true });
  const nome = text(body.nome), email = text(body.email), mensagem = text(body.mensagem);
  if (!nome || nome.length > 100 || /[\x00-\x1f\x7f]/.test(nome)) return res.status(400).json({ erro: 'Informe um nome válido, com até 100 caracteres.' });
  if (!EMAIL.test(email) || email.length > 254 || /[\x00-\x1f\x7f]/.test(email)) return res.status(400).json({ erro: 'Informe um e-mail válido.' });
  if (mensagem.length < 10 || mensagem.length > 4000) return res.status(400).json({ erro: 'Escreva de 10 a 4.000 caracteres sobre o projeto.' });

  // Best-effort per-instance throttling; no personal form data is logged.
  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.until <= now) attempts.delete(key);
  // Only trust forwarded addresses when the request passed through Vercel.
  const ip = String((process.env.VERCEL === '1' && (req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'])) || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const entry = attempts.get(ip) || { count: 0, until: now + WINDOW };
  if (entry.count >= 5) {
    res.setHeader('Retry-After', String(Math.ceil((entry.until - now) / 1000)));
    return res.status(429).json({ erro: 'Você enviou várias mensagens. Aguarde alguns minutos ou fale pelo WhatsApp.' });
  }
  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({ erro: 'O envio pelo site está indisponível no momento. Use o WhatsApp ou o link de e-mail abaixo.' });
  }
  if (attempts.size >= 10000 && !attempts.has(ip)) return res.status(503).json({ erro: 'Tente novamente em alguns minutos.' });
  entry.count++; attempts.set(ip, entry);
  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || '404Devs <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO || '404devsoficial@gmail.com'],
        reply_to: email,
        subject: `Contato do site — ${nome}`,
        text: `Nome: ${nome}\nE-mail: ${email}\n\nSobre o projeto:\n${mensagem}`
      })
    });
    if (!result.ok) throw new Error('provider');
    const receipt = await result.json();
    if (!receipt.id) throw new Error('receipt');
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ erro: 'Não conseguimos confirmar o envio. Seu texto foi mantido; tente novamente ou use o WhatsApp ou o link de e-mail.' });
  }
}
