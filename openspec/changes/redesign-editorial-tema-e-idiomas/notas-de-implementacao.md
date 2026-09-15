# Notas de implementação — redesign editorial, tema e idiomas

Registro produzido durante a execução. Não é artefato de planejamento.

---

## Passo 1 — implementador de design (grupos 1–4) · 14/09/2026

### O que mudou, por arquivo

| Arquivo | Mudança |
|---|---|
| `css/01-tokens.css` | Escala tipográfica de E3 (`--size-display` 8.5vw, `--size-quote`, `--size-service`), paleta clara em papel (E10), tokens `--on-accent-*` e `--accent-surface` (E9), `--grid-gap`, `--stagger-word`, `--stagger-rule`, `--duration-word`, `--duration-theme`, `--layer-float`, `--radius-xs`. `--measure-container` removido |
| `css/03-layout.css` | `.wrap` → `.g` (12 colunas, sem `max-width`); `.sec` com `.sec__index` na coluna 12; barra com `.bar__tools` (slots de idioma e tema) e sublinhado `scaleX` nos links; rodapé em 3 colunas explícitas |
| `css/04-components.css` | Removidos `.label*`, `.link`, `.surface*`, `.tag`, `.quote__rating/__source` (sem uso). `.btn` perde o hover de elevação |
| `css/05-sections.css` | Reescrito: hero com título deslocado e metadados de canto; índice `<ol reversed>` de `<details>`; figura de pré-visualização; capas (`.cover__*`); citação única; serviços em linhas; processo; ficha `<dl>`; time sem card; CTA em bloco âmbar |
| `css/06-utilities.css` | Split por palavra (`.w`, `.w__in`), réguas em cascata (`[data-rules]`), animação da troca de citação, regras de View Transition |
| `index.html` | Reescrito na direção E1; caminhos a partir da raiz; slots `[data-theme-toggle]` e `[data-lang-switch]` na barra e no painel; sprite com 7 capas; script inline de split após o `h1` |
| `js/motion.js` | Timing do título por palavra; observa `[data-rules]` além de `[data-reveal]` |
| `js/index-preview.js` | novo — figura que acompanha o ponteiro |
| `js/quotes.js` | novo — um depoimento por vez, setas e teclado, sem autoplay |
| `js/clock.js` | novo — hora de São Paulo a cada 30 s |
| `tools/build-covers.mjs` | novo — gera `assets/img/covers/*.svg` e imprime o sprite |

### Decisões e desvios

**Sete projetos, não oito.** O `design.md` fala em índice `08 → 01`; o inventário real tem sete projetos (GranjaTech + os seis anteriores). O índice é `07 → 01`.

**Anos.** Só dois projetos têm data verificável (fábrica de polpas e Jucesp, avaliações de março de 2026). Os outros exibem `—`. Nenhum ano foi inventado.

**Marcações de pendência: 17, não 11.** Cada linha do índice ganhou uma coluna "Resultado", e nenhum projeto tem resultado numérico verificável — as seis linhas novas receberam `A definir`. A spec `idiomas` exige contagem igual nos dois idiomas, não uma contagem fixa.

**Capas embutidas, não externas.** `<use href="/assets/img/covers/x.svg#id">` não herda as fontes da página e tem inconsistência de `currentColor` em Safari. As capas são `<symbol>` no sprite do documento, estilizadas por tokens (`.cover__*`). Os arquivos avulsos em `assets/img/covers/` são gerados pela ferramenta para referência e reuso fora do site.

**Sem botão na primeira dobra.** Dois links sublinhados ("Ver o que já entregamos ↓", "Falar no WhatsApp →"). O botão de WhatsApp continua sempre visível na barra.

**O título sobe no primeiro frame.** O script inline adiciona `.is-entered` ao `h1` em dois `requestAnimationFrame`, sem esperar `motion.js`: é o elemento de maior pintura (LCP). `motion.js` só reaproveita a classe para calcular quando o traço entra.

**Ponto pulsante vetado permanece fora.** Nenhum `animation-iteration-count: infinite` no CSS.

### Bugs encontrados e corrigidos na primeira renderização

1. **Split perdia a palavra "planilha".** `wrap(node)` move o `.strike` para dentro do invólucro antes do `replaceChild`, e o pai já não o contém (`NotFoundError`). Corrigido guardando `nextSibling` e usando `insertBefore`.
2. **Contraste 2,78:1 nos `dt` do hero.** `opacity: .62` sobre `--text-tertiary`, que já é o tom mais fraco. Regra: opacidade só sobre `--text-primary`.
3. **`h4` fora de ordem** dentro do índice (`h2` → `h4`). Trocado por `h3`.
4. **Quatro alvos discretos abaixo de 44px:** link do 99Freelas nos metadados, link do sistema no `index__stack`, dois links do bloco de contato. Corrigidos com `inline-flex` + `min-height`. O único remanescente é o link inline dentro de frase em `.quotes__aside`, isento pela WCAG e pela spec.
5. **Ano do índice quebrava linha** entre 720 e 1000px. Ano e setor passam a ocupar a coluna 3 em duas linhas.

### Verificação

| Item | Resultado |
|---|---|
| Regra de camadas | OK, nenhuma violação |
| Seletores órfãos | OK, nenhum |
| Contraste (34 pares, dois temas) | OK, zero falhas |
| Overflow horizontal 320 / 390 / 768 / 1280 | nenhum |
| Estado de repouso sem script (cópia sem `<script>`) | tudo visível, título íntegro, capa inline visível |
| Lighthouse mobile | **Perf 99 · A11y 100 · BP 100 · SEO 100** |
| Lighthouse desktop | **100 · 100 · 100 · 100** |
| LCP mobile | **2,1 s — meta da spec é < 2,0 s. NÃO ATINGIDA localmente** (ver abaixo) |
| LCP desktop | 0,5 s |
| CLS | 0 nos dois |
| Peso da primeira visita | 168 KB (HTML 47 + CSS 31 + JS 17 + fontes 76), limite 500 KB |
| Erros de console | 0 |
| Razão display : corpo em 1280px | 6,70 : 1 (spec ≥ 6) |
| Rótulo de categoria antes de `h2` | 0 |
| Laço infinito | 0 |
| Pré-visualização em ponteiro fino | `display: block; position: fixed`, `.is-on` ao apontar, `use` troca de capa |
| Capas inline com script + ponteiro fino | ocultas (0/7), como projetado |
| Painel mobile | abre, contém 2 controles (tema e idioma) |
| Depoimentos | um ativo por vez, contador `n / 5`, setas funcionam |

### Requisito não cumprido: LCP mobile

Meta: < 2,0 s. Medido: 2,1 s em dois runs consecutivos, no servidor local `python -m http.server` (sem gzip, sem CDN, sem cache) sob 4G simulado. A versão anterior media 1,8 s nas mesmas condições.

Causa: o elemento de maior pintura é o `h1`, e agora ele entra palavra a palavra por máscara — o LCP só é registrado quando a última palavra pinta. O split é requisito da spec `design-system`. Reduções feitas: `--stagger-word` 55 → 38 ms, `--duration-word` 380 ms (separado de `--duration-enter`), e o título sobe no primeiro frame sem esperar `motion.js`. Não bastou para cruzar a marca localmente.

O que ainda pode ser feito, em ordem de custo: (a) medir em produção — a Vercel entrega gzip/brotli e cache, o que não existe neste servidor; (b) reduzir o CSS crítico (31 KB minificado, 350 ms de bloqueio estimado); (c) se o time preferir o número à animação, entrar o `h1` inteiro por opacidade e reservar o split para o subtítulo — isso exige atualizar a spec.

### Fora do meu escopo (para o implementador de tema e idioma)

- `/en/` referenciado pelos dois `[data-lang-switch]` ainda não existe — é gerado pelo `build-html.mjs`
- `js/theme.js` existe e já implementa a cortina; não está ligado (`<script>` ausente de propósito)
- Script inline anti-flash de tema no `<head>` não foi adicionado
- `<meta name="theme-color">` é atualizado por `theme.js` a partir de `--surface-page`

### Estrutura do HTML para o próximo implementador

- Todos os `src`/`href` locais já são a partir da raiz (`/assets/...`, `/js/...`, `/styles.min.css`); o lint do `build-html.mjs` passa
- Slots: `[data-theme-toggle]` ×2 (barra e painel), com `aria-pressed`, `data-label-to-dark`, `data-label-to-light` e um `.bar__tool-icon` que gira 180° quando `aria-pressed="true"`; `[data-lang-switch]` ×2 com `href="/en/" hreflang="en" lang="en"` e `aria-label` em inglês
- Ids de seção: `#topo`, `#projetos`, `#depoimentos`, `#servicos`, `#processo`, `#incluso`, `#time`, `#faq`, `#contato`; linhas do índice `#p07`…`#p01`
- `data-*` consumidos por JS: `data-nav-toggle`, `data-nav-panel`, `data-hero-step`, `data-split`, `data-signature`, `data-reveal`, `data-rules`, `data-index`, `data-index-preview`, `data-preview` (id da capa), `data-quotes`, `data-quote`, `data-active`, `data-quotes-prev/next/count`, `data-clock`, `data-contact-form/-submit/-notice`, `data-theme-toggle`, `data-lang-switch`
- Textos que o JS escreve e que precisam de tradução: `aria-label` dos botões ‹ › em `quotes`, os `data-label-to-*` do tema, `aria-label` do `[data-lang-switch]`, as mensagens de `form.js` (já existiam)
- Nos depoimentos em inglês, a spec exige original em português íntegro + tradução marcada abaixo; a estrutura `blockquote > p.quote__text + footer.quote__meta` comporta um segundo `<p>` para a tradução
- O script inline de split lê `data-motion` do `<html>`; o script anti-flash de tema deve vir antes dele no `<head>` (ordem: motion → tema → JSON-LD → CSS, ou tema primeiro — tanto faz, desde que ambos precedam a folha)

---

## Passo 2 — implementador de tema e idioma (grupos 5–7) · 14/09/2026

### O que mudou, por arquivo

| Arquivo | Mudança |
|---|---|
| `src/index.html` | novo — template único; todo texto visível, `alt`, `aria-label`, `placeholder`, `<title>`, `meta`, JSON-LD e `data-msg-*` virou `{{chave}}`. Inline anti-flash de tema no `<head>` antes da folha |
| `content/pt-BR.json`, `content/en.json` | novos — mesmo conjunto de chaves; o build falha se faltar e avisa se sobrar (zero avisos) |
| `index.html`, `en/index.html` | passam a ser SAÍDA de build, versionadas (mesma razão de `styles.min.css`) |
| `tools/build-html.mjs` | checagem de chaves mortas passa a percorrer arrays (`quotes.items.0.text`) |
| `js/form.js` | mensagens lidas de `data-msg-*` no `<form>` em vez de strings fixas |
| `js/quotes.js` | contador lê `data-count-format` (`{n} / {total}`) |
| `js/theme.js` | ligado via `<script defer>`; já tinha a cortina e o `theme-color` |
| `css/05-sections.css` | `.quote__translation` e `.quote__translation-label` (só aparecem em `/en/`) |
| `package.json` | `build` roda CSS e HTML |

### Decisões

**Depoimentos em inglês.** Cada `<blockquote>` em `/en/` mantém o original em português íntegro (`<p class="quote__text" lang="pt-BR">`) e ganha abaixo um `<p class="quote__translation">` com rótulo "Translation:". Em `pt-BR` a chave `translation` é string vazia e nada é renderizado. O texto de apoio da seção em inglês avisa que os originais estão em português.

**Marcações de pendência.** As spans `.pending` ficam no template, não no JSON — o tradutor não consegue apagá-las por acidente. Onde a pendência fica no meio de uma frase (garantia, FAQ 5), a frase foi dividida em `textBefore`/`textAfter`. Contagem: 17 em cada idioma.

**Strings escritas por JS.** Em vez de um dicionário no JS, o template grava as strings em `data-*` do elemento dono (`data-msg-*` no formulário, `data-count-format` nos depoimentos, `data-label-to-*` no tema). O JS continua sem conhecer idioma nenhum.

**Correção de conteúdo.** O hero dizia "Seis sistemas entregues" e o índice "Sete sistemas rodando". Alinhado para sete nos dois idiomas: são os seis do portfólio do 99Freelas mais o sistema de vendas e estoque da fábrica de polpas, que consta como avaliação real de março de 2026.

**"NF" em inglês.** Traduzido como "invoice (nota fiscal)" onde há espaço e "Invoice" no metadado de canto; "CNPJ" mantido, explicado como "registered Brazilian company (active CNPJ)".

**Rótulo do controle de idioma.** O `aria-label` está no idioma DESTINO ("Read this site in English" na página em português; "Ler este site em português" na página em inglês) — é quem não lê o idioma atual que precisa entendê-lo.

### Verificação

| Item | Resultado |
|---|---|
| `npm run build` | limpo: 0 chaves faltando, 0 chaves sem uso, lint de caminhos OK |
| Paridade pt/en | 9 seções, 8 `h2`, 15 `<details>`, 5 depoimentos, 7 ids `#p0N`, 2 toggles, 2 switches em cada; 5 traduções só em `/en/` |
| Pendências | **17 / 17** |
| Metadados `/` | `lang=pt-BR`, canonical `/`, `og:locale=pt_BR`, hreflang pt-BR + en + x-default |
| Metadados `/en/` | `lang=en`, canonical `/en/`, `og:locale=en_US`, os mesmos 3 hreflang |
| Switch | `/`→`/en/` (hreflang en) e `/en/`→`/` (hreflang pt-BR), nos dois pontos |
| Recursos em `/en/` | 17 locais, 0 quebrados |
| Tema salvo "light" | `data-theme="light"` aplicado antes da folha (captura já em papel); `theme-color` = `#F3EFE6`; toggles `aria-pressed="true"` com rótulo de ação "Switch to dark theme" |
| Movimento reduzido | `--force-prefers-reduced-motion`: clique troca `data-theme` imediatamente, sem View Transition |
| Teclado em `/en/` | 56 focáveis renderizados, 0 sem indicador de foco, 0 rótulos em português, 0 `alt` em português, skip link é a 1ª parada. 1 elemento não recebe foco: link "View the system ↗" dentro de `<details>` recolhido — bloqueio nativo do navegador, correto; focável ao expandir |
| Overflow `/en/` | nenhum em 320 / 390 / 768 / 1280 (`scrollWidth === clientWidth`) |
| Lighthouse | ver tabela abaixo |

| Lighthouse (servidor local, sem gzip) | Perf | A11y | BP | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` mobile | 98 | 100 | 100 | 100 | 2,3 s | 0 |
| `/` desktop | 100 | 100 | 100 | 100 | 0,5 s | 0 |
| `/en/` mobile | 98 | 100 | 100 | 100 | 2,3 s | 0 |
| `/en/` desktop | 100 | 100 | 100 | 100 | 0,5 s | 0 |

**Requisito não cumprido, herdado do passo 1:** LCP mobile 2,3 s contra a meta de
< 2,0 s da mudança anterior (`performance-e-descoberta`). A tarefa 7.1 desta mudança
exige ≥ 95 em performance e acessibilidade e passa com folga nos quatro cenários; a meta
de LCP continua aberta e as três opções para atingi-la estão listadas no passo 1. O
`/en/` não piora nada em relação ao `/`.

### Chaves do conteúdo, por prefixo (onde o time edita)

`pending` · `head.*` · `structured.*` · `a11y.*` · `bar.*` · `nav.*` · `tools.*` · `cta.*` ·
`hero.*` (`hero.meta.*`) · `projects.*` (`projects.labels.*`, `projects.items.<slug>.*`) ·
`quotes.*` (`quotes.items[0-4].{text,translation,meta}`) · `services.*` (`services.items[0-3]`) ·
`process.*` (`process.labels.*`, `process.steps[0-3]`) · `terms.*` (`terms.items.<termo>.*`) ·
`team.*` (`team.members[0-3]`) · `faq.*` (`faq.items[0-7]`) · `contact.*` · `form.*` · `footer.*`
