import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync('script.js','utf8').split('const contactForm =')[1];
test('contact form preserves edits during sending and recovers after failure', async () => {
  const listeners = {};
  let fields = {nome:'Cliente',email:'cliente@example.com',mensagem:'Mensagem original para enviar'};
  const button = {};
  const status = {dataset:{}};
  const fallback = {};
  let resets=0, resolveRequest;
  const form = {
    action:'/api/contact', addEventListener:(event,fn)=>{listeners[event]=fn;},
    reportValidity:()=>true, querySelector:()=>button,
    setAttribute(){},removeAttribute(){}, reset(){resets++;fields={nome:'',email:'',mensagem:''};}
  };
  const context = vm.createContext({
    document:{querySelector:selector=>({'#contact-form':form,'#contact-status':status,'#contact-email-fallback':fallback}[selector])},
    FormData:class { constructor(){return Object.entries(fields);} },
    AbortController,setTimeout,clearTimeout,
    fetch:()=>new Promise(resolve=>{resolveRequest=resolve;})
  });
  vm.runInContext('const contactForm ='+source, context);
  const send=()=>listeners.submit({preventDefault(){}});
  let pending=send();
  assert.equal(button.disabled,true);
  fields.mensagem='Nova mensagem digitada durante o envio';
  resolveRequest({ok:true,json:async()=>({ok:true})});await pending;
  assert.equal(resets,0);
  assert.equal(fields.mensagem,'Nova mensagem digitada durante o envio');
  assert.equal(button.disabled,false);
  pending=send();resolveRequest({ok:false,json:async()=>({erro:'Falha do provedor'})});await pending;
  assert.equal(resets,0);
  assert.equal(status.dataset.state,'error');
  assert.equal(button.disabled,false);
  pending=send();resolveRequest({ok:true,json:async()=>({ok:true})});await pending;
  assert.equal(resets,1);
  assert.equal(status.dataset.state,'success');
});
