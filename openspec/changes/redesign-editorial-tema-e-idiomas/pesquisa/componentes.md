# Catálogo de interações "feito à mão" para portfólio de estúdio dev — HTML/CSS/JS vanilla

> Relatório do pesquisador de componentes (14/09/2026). Fontes: Codrops, web.dev, CSS-Tricks, Awwwards, NN/g, HTMHell, W3C/WCAG, dbushell, Eric Bailey, scroll-driven-animations.style, CodyHouse, Cruip, Akash Hamirwasia, swyx, Dayfing.

**Restrições assumidas em todos os itens:** zero biblioteca; só `transform`/`opacity` animam; tudo desliga com `prefers-reduced-motion`; estado de repouso visível sem JS; JS total < 15 KB; Lighthouse mobile ≥ 95.

**Convenção base** (gate de JS sem flash, inline no `<head>`): `document.documentElement.classList.add('js')`. Tudo que "esconde antes de revelar" só existe dentro de `.js` **e** de `@media (prefers-reduced-motion: no-preference)`.

---

## 1. Lista de projetos com imagem que segue o cursor (o clássico Awwwards)

**Onde:** Karma Digital Agency, Olivier Gillaizeau, 3s Design (Awwwards); Codrops "Creating a Menu Image Animation on Hover".
**Comunica:** editorial, "índice de revista": a lista tipográfica é o conteúdo; a imagem é recompensa pelo hover.
**Custo:** `pointermove` + rAF com lerp; só roda enquanto o ponteiro está sobre a lista. Só `transform`/`opacity`. Pré-carregar imagens no primeiro `pointerenter`. Imagem decorativa (`aria-hidden`); em touch/teclado a preview não existe → estado de repouso precisa se sustentar. ~35 linhas JS (~1,1 KB).

```html
<ul class="work" id="work">
  <li><a class="work__item" href="/cases/acme/" data-img="/img/acme-480.webp">
    <span class="work__name">Acme Pay</span><span class="work__meta">Fintech · 2025</span>
    <img class="work__thumb" src="/img/acme-480.webp" alt="" width="480" height="320" loading="lazy">
  </a></li>
</ul>
<div class="work__float" aria-hidden="true"><img alt="" width="320" height="220" decoding="async"></div>
```
```css
@media (hover: hover) and (pointer: fine) {
  .js .work__thumb { display: none; }
  .work__float { position: fixed; top: 0; left: 0; width: 320px; aspect-ratio: 16/11; pointer-events: none; z-index: 20; overflow: hidden; border-radius: .5rem; will-change: transform; }
  .work__float img { width: 100%; height: 100%; object-fit: cover; opacity: 0; transform: scale(.92); transition: opacity .25s ease, transform .35s cubic-bezier(.2,.7,.2,1); }
  .work__float.is-on img { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) { .work__float { display: none; } .js .work__thumb { display: block; } }
```
```js
(() => {
  const ok = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  const list = document.getElementById('work'); const float = document.querySelector('.work__float');
  if (!ok.matches || !list || !float) return;
  const img = float.firstElementChild; let tx=0,ty=0,x=0,y=0,raf=0,on=false,warmed=false;
  const loop = () => { x += (tx-x)*.18; y += (ty-y)*.18; float.style.transform = `translate(${x}px, ${y}px)`;
    raf = (on || Math.abs(tx-x)+Math.abs(ty-y) > .5) ? requestAnimationFrame(loop) : 0; };
  list.addEventListener('pointerenter', () => { if (warmed) return; warmed = true; list.querySelectorAll('[data-img]').forEach(a => { new Image().src = a.dataset.img; }); });
  list.addEventListener('pointermove', e => { tx = e.clientX+24; ty = e.clientY-120; if (!raf) { x=tx; y=ty; raf = requestAnimationFrame(loop); } });
  list.addEventListener('pointerover', e => { const a = e.target.closest('[data-img]'); if (!a) return; if (img.src !== location.origin + a.dataset.img) img.src = a.dataset.img; on = true; float.classList.add('is-on'); });
  list.addEventListener('pointerleave', () => { on = false; float.classList.remove('is-on'); });
})();
```
**Veredito: RECOMENDADO.** Assinatura de portfólio premium, ~1 KB, degrada para lista de links.

## 2. Spotlight/glow que segue o cursor dentro de cards
**Onde:** Linear, Vercel; Cruip; CodeFronts.
**Custo:** a versão comum (mover centro de `radial-gradient` via `--x/--y` no `background`) força repaint. A versão correta move um pseudo-elemento com gradiente fixo via `translate` → compositor puro. Listener delegado no grid. ~12 linhas JS.
```css
.card { position: relative; overflow: hidden; isolation: isolate; }
.card__glow { position: absolute; left: 0; top: 0; width: 420px; height: 420px; margin: -210px 0 0 -210px; border-radius: 50%; pointer-events: none; z-index: -1; opacity: 0; background: radial-gradient(closest-side, rgb(110 150 255 / .28), transparent 70%); transform: translate(var(--gx, 50%), var(--gy, 50%)); transition: opacity .3s ease; }
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) { .card:hover .card__glow { opacity: 1; } }
```
**Veredito: RECOMENDADO** (variante `translate`; a variante `background` não cumpre a regra).

## 3. Cards com hover que revela conteúdo (deslocamento/máscara/troca de camada)
**Onde:** Codrops "Detail Hovers on Images", ImageRevealHover.
**Custo:** `overflow: hidden` + `translateY` = compositor. Nunca esconder conteúdo essencial atrás de hover; `:focus-within` revela; em touch e reduce tudo visível em fluxo. 0 JS.
**Veredito: RECOMENDADO.**

## 4. Botões magnéticos
**Onde:** Codrops "Magnetic Buttons".
**Custo:** W3C cita "magnetic buttons" como animação por interação a desligar (2.3.3). Amplitude ≤ 8 px. Cachear rect no `pointerenter`.
**Veredito: CONDICIONAL** (1–2 CTAs, ≤ 8 px, sem separar texto do fundo).

## 5. Split-text / reveal palavra a palavra no hero
**Onde:** web.dev "Building split text animations" (Argyle); F7 headline mask.
**Custo:** JS envolve palavras uma vez; animação em CSS. Por letra: 100+ spans, leitor de tela soletra, quebra de linha piora → evitar. `aria-label` com texto íntegro no pai, `aria-hidden` nos spans. Duração total < 1 s. Script **inline logo após o `<h1>`** para não haver frame com texto inteiro.
```html
<h1 class="hero__title" data-split>Construímos produtos digitais que duram.</h1>
<script>(() => { if (!matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  const el = document.querySelector('[data-split]'); if (!el) return; const text = el.textContent.trim();
  el.setAttribute('aria-label', text); el.textContent = '';
  text.split(' ').forEach((w, i) => { const outer = document.createElement('span'); outer.className='w'; outer.setAttribute('aria-hidden','true');
    const inner = document.createElement('span'); inner.className='w__in'; inner.style.setProperty('--i', i); inner.textContent = w; outer.append(inner); el.append(outer, ' '); });
  el.classList.add('is-split'); })();</script>
```
```css
.w { display: inline-block; overflow: hidden; vertical-align: bottom; padding-bottom: .1em; margin-bottom: -.1em; }
.w__in { display: inline-block; }
.is-split .w__in { transform: translateY(110%); animation: rise .7s cubic-bezier(.2,.7,.2,1) forwards; animation-delay: calc(var(--i) * 55ms); }
@keyframes rise { to { transform: none; } }
```
**Veredito: RECOMENDADO (por palavra) / EVITAR (por letra).**

## 6. Marquee infinito
**Custo:** viola a regra do projeto de "nenhum laço infinito em repouso"; WCAG 2.2.2 exige pausa; se `prefers-reduced-motion` satisfaz 2.2.2 ainda é questão aberta (w3c/wcag#3766).
**Versão B — faixa guiada por scroll (0 JS, sem laço):** `animation-timeline: view()`; parada = parada.
**Veredito: CONDICIONAL (A) / RECOMENDADO (B).**

## 7. Contadores numéricos
**Custo:** `textContent` por frame força layout do nó; contido com `tabular-nums` + `min-width` em `ch`. Semanticamente é cheiro de template salvo se os números forem poucos e específicos.
**Veredito: CONDICIONAL.**

## 8. Sticky stacking
**Custo:** 0 JS; `position: sticky` + `animation-timeline: view()`. Bom para 3–5 cases visuais; péssimo para texto longo.
**Veredito: CONDICIONAL.**

## 9. Scroll horizontal de cases
**Custo:** scroller nativo com `scroll-snap` = 0 JS; hijack (wheel não-passivo) arruína INP e desorienta (NN/g Scrolljacking 101).
**Veredito: RECOMENDADO (nativo) / EVITAR (hijack).**

## 10. Parallax leve
**Custo:** `animation-timeline: view()`, compositor; gatilho vestibular → obrigatório desligar em reduce; só decorativo, ≤ 40 px.
**Veredito: CONDICIONAL.**

## 11. Texto scramble/decode
**Custo:** `textContent` por frame; só contido em mono com largura fixa; leitor de tela pode ler lixo. Clichê "dev que descobriu animação".
**Veredito: CONDICIONAL (rótulo pequeno) / EVITAR (hero).**

## 12. Cursor customizado
**Fontes:** Bushell (out/2025), Eric Bailey, Funka. `cursor: url()` ignora configuração de acessibilidade do SO; cursor em DOM apaga affordances nativos; latência; sem equivalente touch/teclado.
**Veredito: EVITAR.** O projeto acertou ao remover.

## 13. Grain/noise overlay
**Custo:** SVG `feTurbulence` rasterizado uma vez; overlay `fixed` é uma camada extra composta. Não animar. Não usar `mix-blend-mode`. Opacidade ≤ 6 %.
**Veredito: CONDICIONAL.**

## 14. Transição animada de tema (View Transitions)
**Onde:** Akash Hamirwasia; theme-toggle.rdsx.dev.
**Anti-padrão:** `* { transition: background-color .3s, color .3s }` repinta tudo.
```js
(() => { const btn = document.getElementById('theme'), root = document.documentElement;
  btn.addEventListener('click', () => { const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    const apply = () => { root.dataset.theme = next; try { localStorage.setItem('theme', next); } catch {} };
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return apply();
    const r = btn.getBoundingClientRect(), x = r.left + r.width/2, y = r.top + r.height/2;
    const rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => { root.animate(
      { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${rad}px at ${x}px ${y}px)`] },
      { duration: 450, easing: 'cubic-bezier(.2,.7,.2,1)', pseudoElement: '::view-transition-new(root)' }); }); }); })();
```
```css
::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
::view-transition-new(root) { z-index: 2; }
.theme-toggle { view-transition-name: theme-toggle; }
```
**Veredito: RECOMENDADO.**

## 15. Troca de idioma sem flash
Gerar `/index.html` e `/en/index.html` em build; o switch é um `<a hreflang>` para a página gêmea. Zero flash por construção, zero JS.
**Veredito: RECOMENDADO (build) / EVITAR (runtime).**

## 16. Micro-interações em links de navegação
Underline via `::after` + `scaleX` = compositor. **Troca de peso no hover = layout** — evitar. Mesmo estado em `:focus-visible`; página atual `aria-current`.
```css
.nav a { position: relative; }
.nav a::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform .35s cubic-bezier(.2,.7,.2,1); }
.nav a:hover::after, .nav a:focus-visible::after { transform: scaleX(1); transform-origin: left; }
```
**Veredito: RECOMENDADO.**

## 17. Números de seção gigantes / tipografia como elemento gráfico
0 JS; vigiar CLS (font-display swap) e overflow (`overflow-x: clip`). Número decorativo `aria-hidden`.
**Veredito: RECOMENDADO.**

## 18. Cards 3D tilt
Re-rasteriza texto (borrado), gatilho vestibular, "usou a lib do tutorial".
**Veredito: EVITAR.**

---

## Tabela-resumo

| # | Interação | JS | Só transform/opacity? | Veredito |
|---|---|---|---|---|
| 1 | Imagem segue cursor na lista | ~1,1 KB | Sim | RECOMENDADO |
| 2 | Spotlight via translate | ~0,4 KB | Sim | RECOMENDADO |
| 3 | Hover revela conteúdo | 0 | Sim | RECOMENDADO |
| 4 | Botão magnético | ~0,5 KB | Sim | CONDICIONAL |
| 5 | Split-text por palavra | ~0,5 KB | Sim | RECOMENDADO |
| 6a/6b | Marquee loop / faixa por scroll | 0,35 / 0 | loop / sim | CONDICIONAL / RECOMENDADO |
| 7 | Contadores | ~0,6 KB | Não (contido) | CONDICIONAL |
| 8 | Sticky stacking | 0 | Sim | CONDICIONAL |
| 9a/9b | Scroller nativo / scrolljack | 0 / alto | n/a / não | RECOMENDADO / EVITAR |
| 10 | Parallax leve | 0 | Sim | CONDICIONAL |
| 11 | Scramble | ~0,5 KB | Não | CONDICIONAL/EVITAR |
| 12 | Cursor customizado | ~1 KB | loop | EVITAR |
| 13 | Grain estático | 0 | n/a | CONDICIONAL |
| 14 | Tema com View Transition | ~0,7 KB | snapshot | RECOMENDADO |
| 15 | Idioma em build | 0 | n/a | RECOMENDADO |
| 16 | Micro-interações de nav | 0 | Sim | RECOMENDADO |
| 17 | Números de seção gigantes | 0 | n/a | RECOMENDADO |
| 18 | Tilt 3D | ~0,8 KB | re-rasteriza | EVITAR |

## Kit recomendado (ordem)
1. Gate `.js` + tokens de motion + reduce global · 2. Tipografia gigante (17) + micro-interações de nav (16) · 3. Reveal on scroll base · 4. Split por palavra no h1 (5) · 5. Lista de projetos com imagem que segue o cursor (1) · 6. Hover-reveal (3) + spotlight (2) · 7. Toggle de tema com View Transition (14) · 8. Faixa por scroll (6b) e/ou grain estático (13). **Total ~3,5 KB de JS.** Princípio: coerência (mesma curva, mesmas durações, mesmo raio) + 3–4 momentos memoráveis.

## Anti-padrões que gritam template
Tilt 3D em todo card · cursor customizado com "View" · marquee de logos infinito sem pausa · contadores "100+ clientes felizes" · `* { transition: all .3s }` · fade-up em cada elemento (AOS) · scrolljacking · preloader com porcentagem · smooth scroll via lib · split letra a letra em parágrafos · grain animado · magnético em todo link · hero com vídeo autoplay + glassmorphism · Lottie em loop em cada card · easing padrão `ease` e durações aleatórias.

## Toggles de tema e idioma sem flash
**Tema:** script inline bloqueante no `<head>` antes da folha, com `try/catch` no `localStorage`; `data-theme` como atributo; três estados (light / dark / ausente = sistema); nunca `transition` global de cores; atualizar `<meta name="theme-color">` no toggle.
**Idioma — Opção 1 (recomendada):** gerar `/` e `/en/` em build a partir de template + JSON; `<html lang>`, `<title>`, `meta`, OG e `hreflang` próprios; switcher aponta para a página gêmea; não redirecionar automaticamente por `navigator.language`. **Opção 2 (runtime `data-lang` + strings duplicadas):** SEO ruim (uma URL, um `lang`, conteúdo misturado), HTML 1,7× maior. **Opção 3 (fetch JSON):** pior — flash garantido e JS obrigatório para ler.
