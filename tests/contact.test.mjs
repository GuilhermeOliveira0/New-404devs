import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/contact.js';

test('contact validation and provider outcomes without sending real emails', async t => {
  const realFetch = globalThis.fetch;
  const savedKey = process.env.RESEND_API_KEY;
  t.after(() => { globalThis.fetch = realFetch; if (savedKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = savedKey; });
  let calls = 0, sent;
  globalThis.fetch = async (_, options) => { calls++; sent = JSON.parse(options.body); return {ok:true,json:async()=>({id:'mock-id'})}; };
  const valid = { nome: 'Cliente de teste', email: 'cliente@example.com', mensagem: 'Gostaria de conversar sobre um projeto.' };
  async function run(body, method = 'POST', headers = {}, ip = 'baseline') {
    const response = { code:200, headers:{}, setHeader(k,v){this.headers[k]=v;}, status(code){this.code=code;return this;},json(data){this.data=data;return this;} };
    await handler({method,headers:{'content-type':'application/json',host:'localhost',...headers},socket:{remoteAddress:ip},body},response);
    return response;
  }
  delete process.env.RESEND_API_KEY;
  assert.equal((await run(valid, 'GET')).code, 405);
  assert.equal((await run('{')).code, 400);
  assert.equal((await run(null)).code, 400);
  assert.equal((await run([])).code, 400);
  assert.equal((await run({...valid, nome:'Nome\u0000oculto'})).code, 400);
  assert.equal((await run({...valid, email:'a\u0000b@example.com'})).code, 400);
  assert.equal((await run(valid, 'POST', {'content-type':'application/json-invalid'})).code, 415);
  assert.equal((await run(valid, 'POST', {origin:'https://attacker.example'})).code, 403);
  assert.equal((await run(valid, 'POST', {origin:'null'})).code, 403);
  assert.equal((await run(valid, 'POST', {'sec-fetch-site':'cross-site'})).code, 403);
  assert.equal((await run({...valid,extra:'x'.repeat(32768)})).code, 413);
  assert.equal((await run(JSON.stringify({...valid,extra:'x'.repeat(32768)}))).code, 413);
  assert.equal((await run({...valid,email:'invalid'})).code, 400);
  assert.equal((await run({...valid,mensagem:'oi'})).code, 400);
  assert.equal((await run({...valid,mensagem:'x'.repeat(4001)})).code, 400);
  assert.equal((await run({...valid,website:'spam'})).code, 200);
  assert.equal((await run(valid)).code, 503);
  assert.equal(calls, 0);
  process.env.RESEND_API_KEY = 'test-key-not-a-real-credential';
  assert.equal((await run(Buffer.from(JSON.stringify(valid)), 'POST', {origin:'http://localhost'}, 'buffer-client')).code, 200);
  assert.equal((await run(valid)).data.ok, true);
  assert.equal(sent.reply_to, valid.email);
  assert.ok(sent.text.includes(valid.mensagem));
  globalThis.fetch = async () => ({ok:false});
  assert.equal((await run(valid)).code, 502);
  globalThis.fetch = async () => { throw new Error('offline'); };
  assert.equal((await run(valid)).code, 502);
  globalThis.fetch = async () => ({ok:true,json:async()=>({})});
  assert.equal((await run(valid)).code, 502);
  globalThis.fetch = async () => ({ok:true,json:async()=>({id:'mock'})});
  await run(valid);
  assert.equal((await run(valid)).code, 429);
  // Untrusted forwarding headers must not bypass local throttling.
  const savedVercel = process.env.VERCEL;
  delete process.env.VERCEL;
  try {
    for (let i=0;i<5;i++) assert.equal((await run(valid,'POST',{'x-forwarded-for':`spoof-${i}`},'local-client')).code,200);
    const limited = await run(valid,'POST',{'x-forwarded-for':'new-spoof'},'local-client');
    assert.equal(limited.code,429);
    assert.ok(Number(limited.headers['Retry-After']) > 0);
  } finally {
    if (savedVercel === undefined) delete process.env.VERCEL; else process.env.VERCEL = savedVercel;
  }
});
