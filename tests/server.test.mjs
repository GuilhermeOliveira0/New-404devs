import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';

test('local server blocks Windows traversal and private files and applies security headers', async t => {
  const child = spawn(process.execPath,['dev-server.mjs'],{env:{...process.env,PORT:'0'},stdio:['ignore','pipe','pipe']});
  t.after(()=>child.kill());
  const base = await new Promise((resolve,reject)=>{
    const timeout=setTimeout(()=>reject(new Error('Server startup timeout')),8000);
    child.on('error',error=>{clearTimeout(timeout);reject(error);});
    child.on('exit',code=>{clearTimeout(timeout);reject(new Error(`Server exited: ${code}`));});
    child.stdout.on('data',chunk=>{
      const match=chunk.toString().match(/http:\/\/127\.0\.0\.1:\d+/);
      if(match){clearTimeout(timeout);resolve(match[0]);}
    });
  });
  for (const route of ['/api/contact.js','/.env','/portfolio-sources.json','/assets/..%5cpackage.json','/assets/%2e%2e%5capi%5ccontact.js','/assets/%2e%2e%2fpackage.json']) {
    assert.equal((await fetch(base+route)).status,404,route);
  }
  const page=await fetch(base);
  assert.equal(page.status,200);
  assert.equal(page.headers.get('x-content-type-options'),'nosniff');
  assert.equal(page.headers.get('x-frame-options'),'DENY');
  assert.match(page.headers.get('content-security-policy'),/script-src 'self';/);
  assert.equal((await fetch(base+'/assets/favicon-32.png')).status,200);
  assert.equal((await fetch(base+'/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:'x'.repeat(32769)})).status,413);
});
