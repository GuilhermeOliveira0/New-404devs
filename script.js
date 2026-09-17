const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let scheduled = false;
const projectSections = [...document.querySelectorAll('.project-section')];
const movingElements = [...document.querySelectorAll('.magnetic')];
const allowed = () => !reduced.matches;
function renderScroll() {
  scheduled = false;
  const max = root.scrollHeight - innerHeight;
  document.querySelector('.scroll-progress').style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  projectSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (!allowed()) { section.style.setProperty('--drift','0px'); section.style.setProperty('--tilt','0deg'); return; }
    if (rect.bottom < -100 || rect.top > innerHeight + 100) return;
    const progress = (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight;
    section.style.setProperty('--drift', `${progress * -130}px`);
    section.style.setProperty('--tilt', `${Math.max(-2, Math.min(2, progress * 3))}deg`);
  });
}
function requestRender() { if (!scheduled) { scheduled = true; requestAnimationFrame(renderScroll); } }
function updateMotion() {
  root.classList.toggle('paused', !allowed());
  if (!allowed()) {
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
    movingElements.forEach(el=>el.style.transform='');
    document.querySelector('.dot-field').style.transform='';
  }
  requestRender();
}
reduced.addEventListener('change',updateMotion);
addEventListener('scroll',requestRender,{passive:true});
addEventListener('resize',requestRender);
// Content is visible by default; only offscreen elements receive a reveal.
if ('IntersectionObserver' in window && allowed()) {
  const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
  }),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>{
    if(el.getBoundingClientRect().top>innerHeight){el.classList.add('will-reveal');observer.observe(el);}
  });
}
movingElements.forEach(el=>{
  el.addEventListener('pointermove',e=>{
    if(!allowed()||e.pointerType!=='mouse')return;
    const r=el.getBoundingClientRect();
    el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.18}px)`;
  });
  el.addEventListener('pointerleave',()=>el.style.transform='');
});
document.querySelector('.hero').addEventListener('pointermove',e=>{
  if(!allowed()||e.pointerType!=='mouse')return;
  const r=e.currentTarget.getBoundingClientRect();
  document.querySelector('.dot-field').style.transform=`translate(${(e.clientX/r.width-.5)*14}px,${(e.clientY/r.height-.5)*14}px)`;
});
const galleries = JSON.parse(document.querySelector('#gallery-data').textContent);
const positions = new Map();
const viewer = document.querySelector('#image-viewer');
let activeCase = 0;
let zoomed = false;

function renderGallery(index, position) {
  const project = galleries[index];
  if (!project.images.length) return;
  const current = (position + project.images.length) % project.images.length;
  positions.set(index,current);
  const image = project.images[current];
  const dialog = document.querySelector(`#case-${index}`);
  const main = dialog.querySelector('[data-main-image]');
  main.src=image.src;
  main.width=image.width; main.height=image.height;
  main.alt=`${project.name} — ${image.caption}`;
  dialog.querySelector('.gallery-caption').textContent=image.caption;
  dialog.querySelector('.gallery-counter').textContent=`${current+1} / ${project.images.length}`;
  dialog.querySelectorAll('[data-gallery-index]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.galleryIndex)===current)));
  if(viewer.open)renderViewer();
}
function openCase(index) {
  activeCase=index;
  renderGallery(index,positions.get(index)??galleries[index].cover);
  const dialog = document.querySelector(`#case-${index}`);
  dialog.showModal();
  dialog.scrollTop = 0;
}
function stepImage(step) { renderGallery(activeCase,(positions.get(activeCase)||0)+step); }
function renderViewer() {
  const project=galleries[activeCase];
  const position=positions.get(activeCase)||0;
  const image=project.images[position];
  const img=document.querySelector('#viewer-image');
  img.src=image.src;img.alt=`${project.name} — ${image.caption}`;
  document.querySelector('#viewer-title').textContent=`${project.name} / ${image.caption}`;
  document.querySelector('#viewer-count').textContent=`${position+1} / ${project.images.length}`;
  zoomed=false;updateZoom();
}
function updateZoom(){
  viewer.classList.toggle('zoomed',zoomed);
  const button=document.querySelector('#viewer-zoom');
  button.textContent=zoomed?'Ajustar à tela':'Ver em tamanho real';
  button.setAttribute('aria-pressed',String(zoomed));
  document.querySelector('.viewer-canvas').scrollTo(0,0);
}
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>openCase(Number(button.dataset.project))));
document.querySelectorAll('.case-dialog').forEach((dialog,index)=>{
  dialog.querySelectorAll('[data-gallery-index]').forEach(button=>button.addEventListener('click',()=>renderGallery(index,Number(button.dataset.galleryIndex))));
  dialog.querySelectorAll('[data-gallery-step]').forEach(button=>button.addEventListener('click',()=>stepImage(Number(button.dataset.galleryStep))));
  dialog.addEventListener('keydown',event=>{
    if(!galleries[index].images.length)return;
    if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();stepImage(event.key==='ArrowRight'?1:-1);}
  });
  const enlarge=dialog.querySelector('[data-enlarge]');
  if(enlarge){
    let startX=null;let swiped=false;
    enlarge.addEventListener('pointerdown',event=>{if(event.pointerType==='touch'){startX=event.clientX;swiped=false;}});
    enlarge.addEventListener('pointerup',event=>{
      if(startX!==null&&Math.abs(event.clientX-startX)>50){stepImage(event.clientX<startX?1:-1);swiped=true;}
      startX=null;
    });
    enlarge.addEventListener('pointercancel',()=>{startX=null;});
    enlarge.addEventListener('click',()=>{if(swiped){swiped=false;return;}renderViewer();viewer.showModal();});
  }
});
document.querySelector('#viewer-prev').addEventListener('click',()=>stepImage(-1));
document.querySelector('#viewer-next').addEventListener('click',()=>stepImage(1));
document.querySelector('#viewer-zoom').addEventListener('click',()=>{zoomed=!zoomed;updateZoom();});
viewer.addEventListener('keydown',event=>{
  if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();stepImage(event.key==='ArrowRight'?1:-1);}
});

function filterProjects(category) {
  let count=0;
  projectSections.forEach(section=>{
    const show=category==='Todos'||section.dataset.category===category;
    section.hidden=!show;if(show)count++;
  });
  document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===category)));
  document.querySelector('.filter-status').textContent=`${count} ${count===1?'projeto para explorar':'projetos para explorar'}`;
  requestRender();
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>filterProjects(button.dataset.filter)));
document.querySelector('#project-jump').addEventListener('change',event=>{
  const index=galleries.findIndex(project=>project.slug===event.target.value);
  if(index<0)return;
  filterProjects('Todos');
  const section=document.querySelector(`#projeto-${galleries[index].slug}`);
  section.querySelector('.reveal').classList.add('visible');
  section.scrollIntoView({behavior:'instant',block:'center'});
  openCase(index);event.target.value='';
});
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
});
document.querySelectorAll('.service-list details').forEach(d=>d.addEventListener('toggle',()=>d.querySelector('i').textContent=d.open?'−':'+'));
updateMotion();

// Shared manual pagers: keep every panel readable if JavaScript is unavailable.
document.querySelectorAll('[data-deck]').forEach(deck=>{
  const panels=[...deck.querySelectorAll('[data-panel]')];
  const buttons=[...deck.querySelectorAll('[data-page]')];
  let current=0;
  const show=(index,announce=true)=>{
    current=(index+panels.length)%panels.length;
    panels.forEach((panel,i)=>{panel.hidden=i!==current;});
    buttons.forEach((button,i)=>button.setAttribute('aria-current',String(i===current)));
    if(announce)deck.querySelector('[data-status]').textContent=`${deck.dataset.deck}: página ${current+1} de ${panels.length}`;
    requestRender();
  };
  buttons.forEach((button,i)=>button.addEventListener('click',()=>show(i)));
  deck.querySelector('[data-prev]').addEventListener('click',()=>show(current-1));
  deck.querySelector('[data-next]').addEventListener('click',()=>show(current+1));
  deck.querySelector('.deck-pages').addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();
    show(event.key==='Home'?0:event.key==='End'?panels.length-1:current+(event.key==='ArrowRight'?1:-1));
    buttons[current].focus();
  });
  deck.classList.add('deck-ready');show(0,false);
});

const contactForm = document.querySelector('#contact-form');
const contactStatus = document.querySelector('#contact-status');
const emailFallback = document.querySelector('#contact-email-fallback');
let sendingContact = false;
function contactPayload() {
  return Object.fromEntries(new FormData(contactForm));
}
function updateEmailFallback() {
  const data = contactPayload();
  emailFallback.href = `mailto:404devsoficial@gmail.com?subject=${encodeURIComponent('Contato pelo site — '+(data.nome || 'Novo projeto'))}&body=${encodeURIComponent(`Nome: ${data.nome}\nE-mail: ${data.email}\n\n${data.mensagem}`)}`;
}
contactForm.addEventListener('input', updateEmailFallback);
contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (sendingContact || !contactForm.reportValidity()) return;
  const button = contactForm.querySelector('[type="submit"]');
  sendingContact = true; button.disabled = true; button.textContent = 'Enviando…';
  contactForm.setAttribute('aria-busy', 'true');
  contactStatus.textContent = 'Enviando sua mensagem…'; contactStatus.dataset.state = 'pending';
  updateEmailFallback();
  const submitted = contactPayload();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(contactForm.action, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submitted), signal: controller.signal
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok !== true) throw new Error(result.erro || 'O envio pelo site está indisponível. Use o WhatsApp ou o link de e-mail abaixo.');
    contactStatus.textContent = 'Mensagem enviada! Nossa equipe vai responder pelo e-mail informado.';
    contactStatus.dataset.state = 'success';
    // Keep anything the visitor typed while the request was in flight.
    if (JSON.stringify(contactPayload()) === JSON.stringify(submitted)) contactForm.reset();
    updateEmailFallback();
  } catch (error) {
    contactStatus.textContent = error.name === 'AbortError' || error instanceof TypeError
      ? 'Não conseguimos confirmar o envio. Seu texto foi mantido. Tente novamente ou use o WhatsApp ou o link de e-mail.'
      : error.message;
    contactStatus.dataset.state = 'error';
  } finally {
    clearTimeout(timer); sendingContact = false; button.disabled = false;
    button.textContent = 'Enviar mensagem ↗'; contactForm.removeAttribute('aria-busy');
  }
});
