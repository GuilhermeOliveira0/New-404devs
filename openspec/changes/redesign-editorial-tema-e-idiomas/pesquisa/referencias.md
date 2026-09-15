# Referências para o redesign do 404Devs — sites reais de freelancers e estúdios pequenos (2024–2026)

> Relatório do pesquisador de referências (14/09/2026). Método: baixou HTML + CSS de 20 sites; 10 tinham conteúdo suficiente para análise completa. Sites 100 % renderizados por JS (Léo Parpeix SOTD 14/09/2026, Olha Lazarieva, Jordan Delcros) vieram vazios e não são descritos. Arquivos brutos em `scratchpad/sites/*.html`, `scratchpad/css/*.css`.

Fontes de candidatos: coleções Freelance Portfolios e Developer Portfolio do Awwwards, Awwwards 2025, Minimal Gallery, Dark Mode Design, Siteinspire, ranking "Best Award-Winning Websites 2026" (hontran.dev).

---

## 1. Os sites

### 1.1 Elliott Mangham — dev freelancer, ESCURO — elliott.mangham.dev — SOTD 02/12/2025 + Dev Award
Painel de uma tela só (`100vh`). Cinco colunas estreitas em cima ("0% 20% 40% 60% 80%" servem de preloader) com texto mono minúsculo: Position (Code Resolution ®, £1M+ revenue, "Avg. project costs Dev: ~£25–60K"), Recognition (22x SOTD…), Brands, Tech Stack, Connect (+ "Available September 2026", "SCHEDULE CALL"). No meio, dois parágrafos grandes ("devoted father of two… I ride a Triumph"). Pill fixo "Projects ① / Awards ②". **Projetos:** thumbnails horizontais; pill "VIEW SITE ↗ [ENTER] ↵" segue o mouse; vista Awards = grid arrastável de pôsteres A4. **Tipografia:** Neue Montreal 500 + Roobert Mono; mono só 11–13px; parágrafos `clamp(30px,…,40px)`, `letter-spacing:-.02em`. Sem H2. **Layout:** sem container; grid `repeat(5,1fr)`; tudo à esquerda. **Cor:** #121212 + #fff + roxo #5e2bff **só** no ponto de 7px do preloader e no pill. Secundário via `#fff6`. **Movimento:** máscara de palavra, um easing `cubic-bezier(.39,.575,.565,1)` 16×, sublinhado `background-size 0→100% 1px`, cantoneiras em L de 4px que fecham a moldura no hover, relógio de Londres piscando, reduce forçando `opacity:1; transform:none`. **NÃO faz:** seções empilhadas, card com borda, eyebrow, depoimento (usa números).

### 1.2 Nicolas Giannantonio — dev freelancer, ESCURO — nicolasgiannantonio.com — HM 04/09/2025
Loader → nav fixa (links deslocados para a coluna 8 de 12) → 9 projetos, cada um em 100vh → nada mais. Texto total 510 caracteres. Mídia limitada a 6/12 colunas, meta em três linhas no canto inferior esquerdo; mídia entra com `blur(4px)+opacity 0`. **Tipografia:** uma custom, praticamente **um tamanho** (1.25rem); hierarquia por opacidade (.25) e posição. **Layout:** 12 colunas em vw. **Cor:** #1d1e20, #fff. **Movimento:** View Transitions nativa (velha sobe -10vh, nova `clip-path:inset(50% 0 0 0)`), 20 easings nomeados, reduce desliga. **NÃO faz:** H1/H2, sobre, botão, cor de destaque.

### 1.3 Pablo Míguez — dev freelancer, ESCURO + claro creme — pablomiguez.dev
Loader soletrado → hero 100vh com marquee 8vw → parágrafo-tese 3.5em `max-width:42em` → 6 cartões numerados 01–06 em slider horizontal (ativo **inverte** para creme) → listas com linhas de 1px que se desenham → "MO / TION / IS / THE / FUTURE" 13.8vw → 5 trabalhos → footer-CTA. **Projetos:** `project-item-v2`, três faixas (nº · ano / título / stack), linhas `width:0→100%`, `mix-blend-mode:difference`. **Tipografia:** Inter (`letter-spacing:-.06em` no body) + Science Gothic (display uppercase h1 7.5em, marquee 8vw). Razão ~16:1. **Layout:** grids irregulares (`1.2fr 1fr 1.2fr`, `60% 1fr`). **Cor:** #0a0a0a/#131313/#fff; claro em creme #fefaee; `border-radius:0`. **Movimento:** spotlight `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,.06), transparent 40%)`, "+" gira 90°, easing `cubic-bezier(.65,.05,0,1)` 14×. Sem reduce (ponto fraco). **NÃO faz:** ícones, sombra, gradiente decorativo, repetir formato de card.

### 1.4 Artiom Yakushev — designer, ESCURO — art-yakushev.com — SOTD 27/12/2025
Nav com relógio "Yerevan 18:32" → hero nome em 15em → about com H2 em duas linhas, **a segunda deslocada** `margin-left:33.2rem` + parágrafo `max-width:26.6rem` → caso em destaque + 8 projetos como linhas → contador "19 – 26" em 26em → cards "00-1", "00-2" → trilho horizontal sticky → 28 chips de skills → footer grid 10 colunas com `margin-top:-30svh`. **Tipografia:** Suisse + Apparel Italic (só palavras de destaque); labels `.95em` uppercase fazem papel do mono; razão ~27:1. **Layout:** 12 cols, margem 7.8rem, texto ≤ 37rem. **Cor:** preto/branco/cinzas, zero acento; `mix-blend-mode:difference` 49×. **NÃO faz:** card com borda, ícone, botão preenchido (CTAs são texto uppercase pequeno).

### 1.5 Uncommon — estúdio pequeno AU, ESCURO — uncommondesign.group — SOTD + Dev + FWA
Hero em camadas com vídeo do projeto em destaque; lista de trabalhos em blocos verticais com **cor de fundo da página mudando por projeto**; "Communication, collaboration and clarity are key. We leave nothing to chance." **Tipografia:** só Neue Montreal; classes `heading-320`=320px (`letter-spacing:-.96rem`) … `label-12`=**10px**; razão 32:1; labels a 40 % opacidade. **Layout:** `.container{max-width:unset; padding:0 2rem}`. **Cor:** #121212, cinzas nomeados, ciano #0bf em UI. **Movimento:** cursor circular "PLAY REEL" recortado por `clip-path:circle()`; transições de fundo; `will-change:transform` 16×. **NÃO faz:** centralizar texto corrido, container 1200px, depoimentos.

### 1.6 honest.fi — dir. criativo FI, ESCURO — Minimal Gallery
Uma tela fixa; mídias fixas a 40 % com vinheta; lista vertical serif de títulos de casos com `scroll-snap`, inativos `.3`, `mask-image` em cima e embaixo; clique → legenda de 450px com **resultado** ("sales in nearby stores nearly doubled", "+24%") + "Client: Fazer" 10px. **Tipografia:** Inter var (`opsz 30, wght 575`) + Hedvig Letters Serif. **Cor:** `--bg:#050505`, `--text:#fff`. **Movimento:** `item-in` translateY(14px), `reveal-scale` com blur(6px), `--ease-out: cubic-bezier(.22,1,.36,1)`, bloco reduce completo. **NÃO faz:** seção, botão, grid, ícone, acento.

### 1.7 Rauno Freiberg — designer de interação, CLARO — rauno.me — HM 01/09/2025
Canvas horizontal de quadros com minimapa; links pregados nos **quatro cantos**; botão de e-mail com `cursor:copy`; manifesto "Make it fast. Make it beautiful. … Make it." h3 fantasma de **720px**. **Tipografia:** custom + JetBrains Mono + Georgia; quadros 85px; labels 14px. **Layout:** `clipReveal[data-variant=offset]{margin-left:64px}` desloca a 2ª linha. **Cor:** #FFF + amarelo #FFFF02 (quadro inteiro), laranja, vermelho. **Movimento:** clipReveal, `cubic-bezier(.2,.8,.2,1)`.

### 1.8 Harry Atkins — dev independente, CLARO (+ dark/text/mono) — harryjatkins.com — SOTD 13/10/2024
Logo = nome em SVG de largura total, letras somem em cascata de 18ms e viram ">" → nav sticky (Information · Projects · Settings: "Text mode (N)", "Dark mode (N)", "Monochrome (N)" com atalhos · Contact) → **26 projetos numerados 26→01** em grid `repeat(4,1fr)`, cada `.project` com `border-top:1px`, linha superior nome à esquerda / "Website · 26" à direita, card quadrado com moldura tingida por `hsla(var(--project-hue)…)`; hover só escurece o fundo um tom. **Tipografia:** uma fonte, um peso (Söhne Buch 400); **body 12px**; headings 20/28/90/120px. **Layout:** 12 colunas próprio, `--pageMarginTotal:32px`. **Cor:** só HSL neutro; cor entra pelos projetos; tokens `--page-*` trocados por `body.dark-mode`. **Movimento:** header some ao rolar; reveal `transform/clip-path .8s` com `transition-delay:calc(var(--i)*.06s)`; `--easingOut: cubic-bezier(.16,1,.3,1)`; reduce global. **NÃO faz:** hero, tagline, depoimento, sombra, borda em volta de card (só régua superior).

### 1.9 Studio Loop — estúdio pequeno SP, CLARO creme + blocos marrons — studioloop.com.br — Nominee 11/09/2026
Bloco marrom #2C180F com nav + faixa 13px uppercase a 47 % "[ from brasil to everywhere ] · 2026" → **serviços como linhas numeradas** "(01) Video & Social Content" … título 64px, número 14px bold, **régua de 4px** → bloco creme #F7F6F0 com parágrafo 40px e palavras sublinhadas → filmstrip horizontal pinada (nome rotacionado -90°, inativos a 30 %) → marquee de clientes → CTA + newsletter → footer fixo por trás revelado no fim. **Tipografia:** Neo Forma Sans/Serif + script (uma palavra) + mono; razão ~12:1. **Cor:** creme, marrom, laranja #FE3D06 (acento), lavanda. **Movimento:** `link-relay-underline` (traço sai pela direita enquanto outro entra pela esquerda), stop-motion no CTA, `cubic-bezier(.16,1,.3,1)`. **NÃO faz:** card, ícone, depoimento.

### 1.10 smalltribe — estúdio boutique DE, CLARO — smalltribe.studio — HM 28/01/2026
Nav com relógio "Leipzig, Germany 19:58" → H1 → **índice de seção** "● ST/00", "● ST/01 · All services — We design": três linhas (Brand / Product / Website) com sub-serviços em texto corrido → "● ST/02 · Projects": três projetos, uma linha cada → footer com endereço físico completo. Report 2025: **KPIs como texto grande** ("88 Invoices sent · €72.000 Most revenue from a single client · 4 Leads ghosted"). **Tipografia:** ES Klarheit Grotesk + Inter + Geist Mono (índices) + GT Sectra; quatro vozes com função fixa. **Cor:** claros frios #E5ECF0, verde-petróleo #142828, rosa de acento. **NÃO faz:** eyebrow de categoria (o pequeno uppercase é **índice numerado**), depoimentos, cards com ícone.

### Também abertos
- **Minh Pham** — h1 "making good shit since 2009" que no hover vira "Hiding bad shit since 2009"; auto-ironia; 3 depoimentos com retrato e humor; um easing `cubic-bezier(.165,.84,.44,1)` 60×.
- **Guillaume Colombel** — ABC Favorit + Integral CF; preto/branco; grid de 24; "Available for Freelance [ Feb. 2025]"; um easing 15×.
- **Isabel Moranta** — parênteses como pontuação de UI "( Scroll )", "( play Showreel )".

---

## 2. Síntese

### A) Comparativo (resumo)
| Site | Tema | Escala | Projetos | Layout | Assinatura |
|---|---|---|---|---|---|
| Elliott Mangham | escuro | 11→40px | thumbs + grid arrastável; cursor "VIEW SITE ↗" | painel 100vh, 5 cols | máscara de palavra; cantoneiras; relógio |
| Nicolas Giannantonio | escuro | 20→20px | 1 por viewport | 12 cols vw | View Transition clip-path + blur |
| Pablo Míguez | escuro+creme | 14px→13.8vw | lista nº·ano/título/stack, linhas que se desenham | grids irregulares | marquee; cartão inverte; spotlight |
| Artiom Yakushev | escuro | .95em→26em | caso + lista + cards com vídeo | 12 cols, texto ≤37rem | contador gigante; split letras |
| Uncommon | escuro | 10→320px | blocos, fundo muda | sem max-width | cursor circular; fundo em transição |
| honest.fi | escuro | 10→56px | lista serif snap + legenda com resultado | tudo fixo, 450px | blur reveal 2s |
| Rauno Freiberg | claro+amarelo | 14→85px | quadros horizontais | canvas, 4 cantos | clipReveal com offset |
| Harry Atkins | claro (+modos) | 12→120px | grid de linhas numeradas 26→01, card tingido | 12 cols, 32px | letras viram ">"; text-mode |
| Studio Loop | creme+marrom | 9px→7rem | filmstrip pinada | full-bleed, blocos | acordeão horizontal; relay-underline |
| smalltribe | claro frio | — | 3 linhas de 1 frase; tabela | seções largas, texto estreito | índice ST/00–02 |

### B) Os 10 padrões, por impacto em "parecer desenhado por humano"
1. **Escala tipográfica extrema com poucas famílias** — menor 10–14px, maior 85–320px; 1–2 famílias + mono; `letter-spacing` -.02 a -.06em; `line-height` .8–1.05; secundário por `opacity:.4`, não por cinza novo.
2. **Projetos como lista/índice editorial, não cards** — `<ol>` com `border-top:1px`, colunas nº · nome · tipo · stack · ano; imagem no hover ou ao expandir. `grid-template-columns:3ch 1fr auto auto 4ch`; `li::before{transform:scaleX(0)}` → `.is-in li::before{scaleX(1)}` com `transition-delay:calc(var(--i)*60ms)`. Preview: `figure position:fixed; pointer-events:none` seguindo o cursor com lerp .12; esconder em `pointer:coarse`; reduce → imagem estática ao expandir com `<details>`.
3. **Números e dados concretos como elemento gráfico** — 26→01, "19 – 26", "88 Invoices sent", "£1M+", "+24%", "(01)…(05)". Especificidade é o sinal mais forte de autoria; templates dizem "100+ clientes satisfeitos". `tabular-nums`.
4. **Blocos de cor sólida e troca de fundo por seção, não cards com borda** — Studio Loop alterna marrom/creme; Pablo inverte; Rauno quadro amarelo; Uncommon muda `background-color` por projeto. `<section data-theme="ink|amber|paper">` + IO copiando para o `<html>`.
5. **Grid de 12 colunas com deslocamentos explícitos e texto em coluna estreita** — nav na col 8; 2ª linha do título deslocada; parágrafos ≤ 26–38ch; `.g{grid-template-columns:repeat(12,minmax(0,1fr)); padding-inline:clamp(1rem,3vw,3rem)}` sem `max-width`.
6. **Metadados "de sistema" nos cantos** — "LON [ -- : -- ]", "Yerevan 18:32", "Available September 2026", "Portfolio 2025", "[ from brasil to everywhere ] · 2026", "( Scroll )", "● ST/01". É o **único** lugar onde mono/uppercase pequeno aparece — como instrumento, não rótulo. `Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit',timeZone:'America/Sao_Paulo'})` a cada 30s.
7. **Reveal por máscara (linha/palavra) com um único easing** — `overflow:hidden` + filho `translateY(100%)→0`; Minh `(.165,.84,.44,1)` 60×, Elliott 16×, Guillaume 15×, Pablo 14×. `:root{--ease:cubic-bezier(.16,1,.3,1)}`.
8. **Hover que troca estado/texto, nunca elevação com sombra** — texto duplicado que desliza, sublinhado `background-size 0→100%`, relay com dois traços, cantoneiras, "+" girando, letras virando ">", só o fundo escurece um tom. `box-shadow` no hover: 0–1 ocorrências.
9. **Um único "brinquedo" contextual por site** — pill/círculo "VIEW", spotlight, ou toggles de modo. Sempre **um**.
10. **Uma quebra de ritmo horizontal usada exatamente uma vez** — marquee, filmstrip pinada, trilho, canvas.
**Bônus — copy com voz e resultado.** Nenhum diz "soluções inovadoras".

### C) Anti-padrões que gritam "template de IA" — observados por ausência
1. Três/seis cards iguais com `border:1px solid rgba(255,255,255,.1)`, `border-radius:12–16px`, ícone no topo. Radius encontrado: 0, 4px, 6px.
2. Eyebrow mono uppercase antes de todo H2.
3. Gradiente roxo/azul, glow, blobs.
4. Glassmorphism em cards de conteúdo.
5. Tudo centralizado.
6. Container único de 1120–1200px.
7. Grid uniforme de serviços com ícone de linha.
8. Hover "lift" + sombra.
9. Botão primário pill + secundário outline repetidos em toda seção.
10. Stock photo, mockup 3D, ilustração isométrica.
11. Carrossel de 3 depoimentos com avatar redondo e estrelas.
12. Seção "Stats" com 4 números em cards.
13. Borda 1px em volta de tudo (a borda é **régua horizontal**).
14. Títulos genéricos ("Sobre nós", "Serviços").
15. Fade-up igual em cada seção + cinco easings.
16. Footer com quatro colunas de links.
17. Checkmarks ✓ e emojis em headings.

### D) Três direções — decisão: **Direção 1 "Ordem de Serviço"** (Harry Atkins + smalltribe + Elliott), com o bloco âmbar de CTA da Direção 2
*Conceito:* o site é um documento de trabalho — índice numerado, tabela, dados ao vivo — porque é isso que a 404Devs vende: ordem para quem vive de nota, pedido e estoque. Âmbar é marca-texto, usado só onde há estado.
*Hero:* grid de 12; cols 1–9 Bricolage `clamp(3rem,8.5vw,8.5rem)`, `line-height:.92`, `letter-spacing:-.03em`, duas linhas com a segunda deslocada uma coluna. Cols 11–12 em Plex Mono 12px a 60 %: "SÃO PAULO · 14:32" (relógio real), "4 DEVS", "PRÓXIMA VAGA", "V.2026". Nada centralizado; link sublinhado "Ver o que já entregamos ↓".
*Projetos:* "Índice" — `<ol>` reverso (08→01) em linhas `border-top:1px` a 18 %: `08 · Nome · setor · stack · ano`. Hover tinge a linha com âmbar a 8 % e faz uma imagem seguir o cursor num `figure` fixo de 320px; clique abre `<details>` inline com problema / o que foi feito / resultado em número. Sem card.
*Depoimentos:* uma citação por vez, Bricolage 40px, à esquerda em 7 colunas, régua âmbar de 2px à esquerda (única régua colorida); abaixo mono 12px "PROJETO · DATA · → ÍNDICE 03". Setas ou teclado; nunca autoplay. Clientes como texto corrido.
*Movimento-assinatura:* a página "imprime": réguas `scaleX(0→1)` em cascata de 60ms, títulos por máscara de linha, relógio muda. Reduce: tudo já visível.
*Tema claro:* papel #F3EFE6 (não branco); âmbar escurece para texto; permanece #E8A33D em superfícies.
*Por que:* fala a língua do cliente, demonstra competência sem espetáculo, 100 % viável em vanilla, elimina cada sintoma: cards → linhas, eyebrow → metadados de canto, grid uniforme → tabela com deslocamento, zero imagem → previews no hover, container único → 12 colunas full-bleed.

*Direção 2 "Chapa"* (Studio Loop + Uncommon + Rauno): chapas de cor alternando tinta/âmbar/papel, hero âmbar inteiro com "404 / DEVS" em 14vw, filmstrip pinada, marquee. Risco: lê como agência criativa; exige screenshots muito bem produzidas.
*Direção 3 "Terminal calmo"* (Nicolas + honest.fi): um tamanho de texto, um projeto por viewport, blur-reveal, View Transition. Risco: pouca informação para quem compra.
