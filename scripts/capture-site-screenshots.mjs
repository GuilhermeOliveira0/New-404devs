import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const [url, outputDir, ...sections] = process.argv.slice(2);
const viewport = { width: 1368, height: 768 };
if (!url || !outputDir || !sections.length) {
  throw new Error('Usage: node scripts/capture-site-screenshots.mjs <url> <output-dir> <css-selector>...');
}

const edge = process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const profile = fs.mkdtempSync(path.join(os.tmpdir(), '404devs-edge-'));
const port = 9333 + Math.floor(Math.random() * 300);
fs.mkdirSync(outputDir, { recursive: true });
const child = spawn(edge, [
  '--headless', '--disable-gpu', '--no-first-run', `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`, `--window-size=${viewport.width},${viewport.height}`, 'about:blank'
], { stdio: 'ignore' });

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
async function json(endpoint) {
  const response = await fetch(`http://127.0.0.1:${port}${endpoint}`);
  if (!response.ok) throw new Error(`DevTools endpoint failed: ${response.status}`);
  return response.json();
}
for (let attempt = 0; attempt < 50; attempt++) {
  try { await json('/json/version'); break; }
  catch { if (attempt === 49) throw new Error('Edge DevTools did not start'); await pause(100); }
}
const target = (await json('/json')).find(item => item.type === 'page');
if (!target) throw new Error('No page target');
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
let sequence = 0;
const pending = new Map();
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id); pending.delete(message.id);
  message.error ? reject(new Error(message.error.message)) : resolve(message.result);
});
const call = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params }));
});

try {
  await call('Page.enable');
  await call('Runtime.enable');
  await call('Emulation.setDeviceMetricsOverride', { ...viewport, deviceScaleFactor: 1, mobile: false });
  await call('Page.navigate', { url });
  await pause(5000);
  for (let index = 0; index < sections.length; index++) {
    const selector = sections[index];
    const expression = `(() => { const node = document.querySelector(${JSON.stringify(selector)}); if (!node) throw new Error('Missing selector'); document.documentElement.style.scrollBehavior='auto'; document.body.style.scrollBehavior='auto'; window.scrollTo(0, node.getBoundingClientRect().top + window.scrollY - 88); return {x:scrollX,y:scrollY,top:node.getBoundingClientRect().top}; })()`;
    const position = await call('Runtime.evaluate', { expression, returnByValue: true });
    if (index > 0 && position.result?.value?.y < 100) throw new Error(`Page did not scroll to ${selector}`);
    await pause(1800);
    const { data } = await call('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false });
    fs.writeFileSync(path.join(outputDir, `${String(index + 1).padStart(2, '0')}.png`), Buffer.from(data, 'base64'));
  }
} finally {
  socket.close();
  if (child.exitCode === null) {
    child.kill();
    await Promise.race([new Promise(resolve => child.once('exit', resolve)), pause(3000)]);
  }
  fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
