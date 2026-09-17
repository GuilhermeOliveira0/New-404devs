import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import contact, { MAX_BODY_BYTES } from './api/contact.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const securityHeaders = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8')).headers[0].headers;
// Load the same local variables used by Vercel, without adding dependencies.
const envFile = path.join(root, '.env.local');
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (match && process.env[match[1]] === undefined) process.env[match[1]] = match[2].trim().replace(/^(['"])(.*)\1$/, '$2');
  }
}
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'application/javascript', '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png', '.woff2':'font/woff2', '.xml':'application/xml', '.txt':'text/plain' };
const server = http.createServer(async (req, res) => {
  for (const { key, value } of securityHeaders) res.setHeader(key, value);
  res.status = code => { res.statusCode = code; return res; };
  res.json = data => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data)); };
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { return res.status(400).end(); }
  // Windows treats backslashes as separators; reject encoded traversal before resolving.
  if (pathname.includes('\\') || pathname.split('/').some(part => part.startsWith('.'))) return res.status(404).end();
  if (pathname === '/api/contact') {
    const chunks = [];
    let bytes = 0;
    try {
      for await (const chunk of req) {
        bytes += chunk.length;
        if (bytes > MAX_BODY_BYTES) return res.status(413).json({ erro: 'Mensagem muito longa.' });
        chunks.push(chunk);
      }
      req.body = Buffer.concat(chunks).toString('utf8');
      await contact(req, res);
    } catch { if (!res.writableEnded) res.status(500).json({ erro: 'Não foi possível enviar agora.' }); }
    return;
  }
  if (!['GET','HEAD'].includes(req.method)) return res.status(405).end();
  // Serve only public site assets; never serve local configuration or source data.
  const allowed = ['/', '/index.html', '/style.css', '/script.js', '/robots.txt', '/sitemap.xml'];
  if (!allowed.includes(pathname) && !pathname.startsWith('/assets/')) return res.status(404).end();
  const filename = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  const relative = path.relative(root, filename);
  if (relative.startsWith('..') || path.isAbsolute(relative)) return res.status(404).end();
  try {
    const real = await fs.promises.realpath(filename);
    const boundary = pathname.startsWith('/assets/') ? path.join(root, 'assets') : root;
    const realRelative = path.relative(boundary, real);
    if (realRelative.startsWith('..') || path.isAbsolute(realRelative)) return res.status(404).end();
    const data = await fs.promises.readFile(filename);
    res.setHeader('Content-Type', types[path.extname(filename)] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-store');
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.status(404).end(); }
}).listen(Number(process.env.PORT ?? 4040), '127.0.0.1', () => console.log(`Site em http://127.0.0.1:${server.address().port}/`));
