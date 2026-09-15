## Context

Ver `proposal.md`. Base: commit `4b2a920` na branch `feat/redesign-site-institucional`.
Toda a infraestrutura da mudança anterior permanece: sete camadas de CSS numeradas
(D1), módulos de JS por atributo `data-*` (D4), fontes auto-hospedadas, build de CSS,
orçamento de 500 KB e Lighthouse ≥ 95, `prefers-reduced-motion` desligando tudo, estado
de repouso sempre visível, marcações de pendência nunca preenchidas.

Já existem, escritos mas não ligados: `tools/build-html.mjs` (template + JSON → `/` e
`/en/`, com verificação de completude e de caminhos relativos) e `js/theme.js` (alternância
com persistência, consumindo `[data-theme-toggle]`).

Pesquisa que embasa as decisões: relatório de 20 portfólios premiados (Awwwards SOTD
2024–2026) e catálogo de 18 interações com veredito de performance e acessibilidade.
Ambos estão resumidos nas decisões abaixo; não são repetidos.

## Goals / Non-Goals

**Goals**
- Eliminar cada sintoma de "template": container único, cards uniformes, rótulo repetido,
  grid uniforme, ausência de imagem, hover de elevação com sombra
- Um gesto de interação memorável, não cinco
- Tema e idioma alternáveis sem flash e sem custo de SEO
- Manter todos os requisitos já em vigor: veracidade, pendências, a11y, performance

**Non-Goals**
- Reintroduzir biblioteca de animação, cursor customizado, tilt, marquee em laço ou
  scrolljacking — todos descartados pela pesquisa com fonte
- Screenshots reais dos sistemas (bloqueado por autorização dos clientes)
- Mais de uma página por idioma

## Decisions

### E1 — Direção "Ordem de Serviço"

O site se apresenta como documento de trabalho: índice, tabela, ficha, dados ao vivo.
É a única direção pesquisada em que a forma argumenta a favor do produto — ordem para
quem vive de pedido, nota e estoque — e a mais barata de executar bem em vanilla.

Referências principais, por seção: Harry Atkins (índice numerado de projetos com régua
superior, uma fonte, um peso), smalltribe (índice de seção `ST/01` como único texto
pequeno, serviços em três linhas, ficha de KPIs), Elliott Mangham (metadados de canto
com relógio e disponibilidade, cantoneiras no hover, um easing). Do Studio Loop vem o
único bloco de cor sólida, no CTA final.

### E2 — Grid de 12 colunas sem largura máxima

`.g { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap:
clamp(1rem, 2vw, 2rem); padding-inline: clamp(1rem, 3vw, 3.5rem) }`. Sem `max-width`.
Texto corrido em coluna estreita (`max-width: 38ch` ou `grid-column` de 5–7 colunas).
Títulos e réguas atravessam. Deslocamentos são explícitos por `grid-column`, nunca por
margem mágica. Em ≤ 720px tudo vira `1 / -1`.

O `.wrap` de 1120px é removido do CSS e do template.

### E3 — Escala tipográfica

Corpo 1rem. Metadados mono `0.75rem` (nunca menores que 12px). Display da primeira dobra
`clamp(3rem, 8.5vw, 8.5rem)`, `line-height: .92`, `letter-spacing: -.03em`. Títulos de
seção `clamp(2rem, 4.5vw, 4rem)`. Citação `clamp(1.75rem, 3vw, 2.5rem)`. Razão display :
corpo ≥ 6:1 (spec). Texto secundário por `opacity: .6` sobre `--text-primary`, não por
tom novo; os tokens `--text-secondary/-tertiary` permanecem para os casos em que a
opacidade compõe mal (sobre imagem, sobre âmbar).

### E4 — Fim do rótulo por seção; metadados de canto

Some `.label--accent` antes de cada `h2`. Cada seção recebe, na coluna 12 alinhado ao
topo, um índice em mono: `§ 02 · Projetos`. A primeira dobra recebe na coluna 11–12:
`SÃO PAULO · 14:32` (relógio real via `Intl.DateTimeFormat` com `timeZone:
America/Sao_Paulo`, atualizado a cada 30 s, sem animação), `4 DEVS`, `CNPJ · NF`,
`99FREELAS ↗`. É a mesma informação da faixa de credibilidade atual, no lugar que a
pesquisa mostra ser o único onde mono pequeno aparece nos bons sites.

### E5 — Projetos como índice editorial

`<ol reversed>` com uma linha por projeto: `grid-template-columns: 3ch 1fr auto auto
4ch` → índice · nome · setor · o que construímos (curto) · ano ou `—`. `border-top: 1px`
a 18 % de opacidade; a última linha fecha com `border-bottom`. Cada linha é um
`<details>`: o `<summary>` é a linha; o conteúdo é a expansão inline com três colunas
(Antes · O que construímos · Resultado), reaproveitando o conteúdo atual do case em
destaque e dos cards. Funciona sem script e por teclado por construção.

O GranjaTech deixa de ser "case em destaque" isolado: vira a linha 08 (a mais recente),
aberta por padrão (`open`) para que a primeira dobra da seção já mostre a estrutura da
expansão.

Hover em ponteiro fino: a linha recebe fundo `--accent-wash`, e um `<figure>` fixo de
320×220 acompanha o ponteiro com lerp .15 em `requestAnimationFrame`, trocando a imagem
por `data-preview`. Desligado em `(pointer: coarse)`, `(hover: none)`,
`prefers-reduced-motion` e sem script — nesses casos, nada flutua e a linha se sustenta.

**Capas tipográficas.** Sem screenshots autorizados, cada projeto recebe um SVG gerado
em build (`assets/img/covers/<slug>.svg`): fundo `--surface-raised`, índice em Bricolage
800 grande, setor em mono, um traço âmbar. São gráficos, não telas; o `alt` diz "Capa
tipográfica de <nome>". Trocar por WebP real quando houver autorização é substituir o
arquivo e o `alt`.

### E6 — Depoimento único navegável

Um `<section>` com `<ul>` de cinco `<li>`; CSS mostra um por vez via `[data-active]`,
mas **sem script todos ficam visíveis em sequência** (a ocultação só existe sob
`[data-motion="on"]`). Citação em Bricolage `clamp(1.75rem, 3vw, 2.5rem)` nas colunas
1–8, régua âmbar de 2px à esquerda — a única régua colorida do site. Abaixo, em mono:
projeto · data · `→ índice 0N` linkando para a linha correspondente. Controles
`‹ ›` com `aria-label`, operáveis por teclado; indicador `1 / 5`. Sem autoplay (spec).
A lista de setores atendidos entra como texto corrido abaixo, substituindo qualquer
faixa de logos.

Na versão em inglês, cada `<li>` traz o original em português e, abaixo, em
`--text-secondary`, a tradução precedida de "Translation:".

### E7 — Serviços em linhas, condições em ficha

Serviços: quatro linhas `(01)…(04)`, título em `clamp(1.75rem, 3.5vw, 3rem)`, descrição
em coluna estreita à direita (colunas 7–12), régua de 2px entre linhas (Studio Loop).
Stack em mono ao fim, como texto corrido.

Condições: `<dl>` em duas colunas — termo em mono à esquerda (`Contrato`, `Nota fiscal`,
`Garantia`, `Treinamento`), definição à direita — com régua de 1px entre pares. Sem
fundo, sem borda de caixa.

Processo mantém as quatro linhas numeradas; só adota o grid de 12 e perde a borda de
caixa dos metadados.

### E8 — Time e FAQ

Time: quatro colunas, foto com `border-top: 1px` acima em vez de card com borda e raio;
nome, função, links em mono. Grayscale que ganha cor no hover permanece.

FAQ permanece acordeão `<details>`; é formato de documento.

### E9 — Um bloco de cor: o CTA final

Seção `#contato` em fundo `--accent` full-bleed com texto `--accent-contrast`. Título em
display: "Conta pra gente o que trava o seu dia." Formulário à direita (colunas 7–12) com
campos em `--surface-page` sobre o âmbar. É o único lugar onde o âmbar é superfície; em
todo o resto é marca-texto (linha ativa, régua da citação, traço do título, dois links).

Tokens novos: `--on-accent-*` para texto e campo sobre âmbar, verificados a 4,5:1.

### E10 — Tema claro em papel

`--surface-page: #F3EFE6` (papel quente), `--surface-raised: #FBF9F4`, tinta `#0C0F16`
como texto. Âmbar como texto escurece para `#8A5408` (já verificado); como superfície
permanece `#E8A33D`. Toda a tabela de contraste da mudança anterior SHALL ser rodada de
novo com a paleta nova.

### E11 — Sistema de movimento, revisado

Mantém: revelação por scroll uma vez; micro-interações em `transform`/cor; nada em
laço; tudo desligável. **A pesquisa vetou o ponto pulsante de disponibilidade** — é laço
infinito; sai.

Entram:
- **Split por palavra no `h1`**, inline logo após o elemento para não haver frame com o
  texto inteiro. Nós de texto são divididos por espaço; elementos (os `.strike`) são
  tratados como uma palavra. Cada palavra: `overflow: hidden` no invólucro, filho com
  `translateY(110%) → 0`, `--i` para o escalonamento de 55 ms. `aria-label` com o texto
  íntegro no `h1`; invólucros com `aria-hidden`. Total ≤ 1200 ms. O traço de risco
  continua a entrar ao final da sequência.
- **Réguas em cascata**: `::before` de cada linha do índice com `scaleX(0)` sob
  `[data-motion="on"]`, `→ 1` com `transition-delay: calc(var(--i) * 60ms)` quando a
  lista ganha `.is-revealed`.
- **Sublinhado de navegação**: `::after` com `scaleX` e `transform-origin` que alterna
  (entra pela esquerda, sai pela direita). Mesmo estado em `:focus-visible`. Sem troca de
  peso.
- **Cortina de tema**: `document.startViewTransition` + `clip-path: circle()` a partir do
  centro do botão, 450 ms, `view-transition-name` no próprio botão. Fallback instantâneo.

Um só easing para tudo o que entra: `--ease-out` já existente. Nenhum `will-change`
exceto na figura de pré-visualização (elemento pequeno, vida curta).

### E12 — Pipeline de conteúdo e idioma

`index.html` e `en/index.html` passam a ser saídas de `tools/build-html.mjs`, versionadas
como `styles.min.css` (mesma razão: se o build não rodar, o site continua no ar).
`src/index.html` é o template; `content/pt-BR.json` e `content/en.json` carregam todo o
texto visível, incluindo `alt`, `aria-label`, `placeholder`, `<title>` e `meta
description`. Chaves em inglês, agrupadas por seção (`hero.title`, `projects.items.0.name`).

Trechos com marcação (o `h1` com `.strike`, links dentro de frases) ficam como HTML dentro
do JSON — é conteúdo nosso. O relógio e o indicador `1 / 5` são gerados por script; o
template traz o valor de repouso.

`npm run build` passa a rodar CSS e HTML. `.vercelignore` já exclui `src/` e `content/`.

### E13 — Controles na barra

Dois controles à direita da barra, em mono, antes do botão de WhatsApp:
`EN` (link para a página gêmea, `hreflang`, `lang`) e `◐ Escuro` / `◑ Claro` (botão
`[data-theme-toggle]` com `aria-pressed` e `data-label-to-*` para o rótulo de ação). No
painel de telas estreitas, os dois aparecem acima do botão de WhatsApp. Ambos com alvo
de 44px.

### E14 — Divisão do trabalho entre implementadores

Sequencial, para não haver dois agentes no mesmo arquivo:

1. **Implementador de design** — `index.html` (ainda com texto em português),
   `css/01,03,05,06`, `js/motion.js`, novo `js/index-preview.js`, novo
   `tools/build-covers.mjs`. Deixa na barra os *slots* dos controles (`[data-theme-toggle]`
   e `<a data-lang-switch>`) já estilizados, mas sem ligar `theme.js`. Entrega com
   verificação própria: build de CSS, regra de camadas, sem seletor órfão, sem overflow em
   320/390/768/1280, sem JS tudo visível, Lighthouse ≥ 95.
2. **Implementador de tema e idioma** — extrai `index.html` para `src/index.html` +
   `content/*.json`, traduz, liga `theme.js` e o script inline do head, cortina de tema,
   gera `/en/`, atualiza `sitemap.xml` e `package.json`. Entrega com: build sem chave
   faltando, contagem igual de pendências nos dois idiomas, `/en/` sem caminho quebrado,
   Lighthouse nas duas versões.

## Risks / Trade-offs

**[Capa tipográfica lida como "screenshot fake"]** → `alt` explícito, estética
claramente gráfica (tipografia e traço, nenhum elemento de interface), e a linha de
detalhe diz o que foi construído em texto. Substituição por WebP real é troca de arquivo.

**[Split do `h1` fatiando os `.strike`]** → o algoritmo divide apenas nós de texto e
envolve elementos inteiros; a spec tem cenário próprio para isso.

**[Dois depoimentos curtos parecem vazios em escala editorial]** → ordem fixa começando
pelos três longos; os dois curtos ficam por último e a escala não aumenta para compensar.

**[`<details>` como linha de índice tem estilos nativos teimosos]** → `summary { list-style:
none }` e `::-webkit-details-marker { display: none }` já são usados no FAQ.

**[Traduzir depoimentos altera o que o cliente disse]** → original sempre presente e
íntegro; tradução marcada como tradução (spec `idiomas`).

**[Dois agentes editando `index.html`]** → ordem sequencial em E14; o segundo só começa
depois de o primeiro ter entregado e a verificação ter passado.

## Migration Plan

1. Implementador de design entrega; verificação; commit `design: direção editorial`.
2. Implementador de tema e idioma entrega; verificação; commit `feat: tema e /en/`.
3. `index.html` passa a ser gerado — a partir daqui, editar copy é editar
   `content/*.json` e rodar `npm run build`. Registrar isso no `docs/06`.

Reversão: `git revert` de cada commit; não há estado persistente além do `localStorage`
do visitante, que é ignorado se o atributo não existir.

## Open Questions

- Quando houver screenshots autorizados, qual proporção padronizar (16:10 desktop ou
  5:8 celular)? Não altera a spec; só o `aspect-ratio` da figura.
- Se o time quiser oferecer "voltar ao tema do sistema" além de claro/escuro, o controle
  vira ciclo de três estados. Não altera o resto.
