## Why

A reconstrução anterior (`redesign-site-institucional`) resolveu peso, credibilidade e
arquitetura, mas a revisão do time apontou que o resultado "tem cara de template de IA":
fundo quase-preto com um acento, tudo em card com a mesma borda e raio, um rótulo mono
maiúsculo antes de cada título nove vezes, grid uniforme, container único de 1120px e
nenhuma imagem. Pesquisa em 20 portfólios premiados (Awwwards SOTD 2024–2026, Minimal
Gallery, Dark Mode Design) confirmou que nenhum deles faz nenhuma dessas coisas — e que o
que os distingue é escala tipográfica extrema, projetos como índice editorial, metadados
de sistema nos cantos, blocos de cor sólida e um único gesto de interação memorável.

O time também pediu alternância explícita de tema (claro/escuro) e do site em inglês.

## What Changes

### Direção de arte: "Ordem de Serviço"
O site passa a se comportar como um documento de trabalho — índice numerado, tabela,
dados ao vivo — porque é isso que a 404Devs vende: ordem para quem vive de nota, pedido e
estoque. A marca permanece (Bricolage Grotesque, IBM Plex, âmbar sobre tinta).

- **BREAKING** Sai o container único de 1120px; entra grid de 12 colunas full-bleed com
  deslocamentos explícitos e texto corrido em coluna estreita
- **BREAKING** Sai o rótulo de categoria antes de cada título; entram metadados de canto
  em mono (índice de seção, relógio local, disponibilidade, versão)
- **BREAKING** Sai a grade de 6 cards de projeto; entra índice editorial numerado
  `08 → 01` em linhas com régua, expansão inline por linha, e pré-visualização que segue
  o cursor em ponteiro fino
- **BREAKING** Saem os 5 cards de depoimento; entra uma citação por vez em escala
  editorial, navegável por setas e teclado, sem rotação automática
- Serviços viram linhas numeradas de escala grande, não grade de 4
- Condições comerciais viram ficha técnica em duas colunas, não 4 blocos
- Tema claro passa de branco frio para papel quente
- Um único bloco âmbar full-bleed no CTA final
- Escala tipográfica com razão mínima de 6:1 entre display e corpo

### Movimento
- Título da primeira dobra entra palavra a palavra por máscara
- Réguas horizontais se desenham em cascata ao entrar na viewport
- Micro-interação de sublinhado nos links de navegação
- Troca de tema animada por View Transition em cortina circular, com fallback instantâneo

### Tema e idioma
- Controle de tema claro/escuro na navegação, com escolha persistida e aplicada antes da
  primeira pintura
- Site em inglês em `/en/`, gerado em build a partir de um template único e dois arquivos
  de conteúdo; alternância por link para a página gêmea; `hreflang` e canônico por idioma

## Capabilities

### New Capabilities
- `idiomas`: geração das versões em português e inglês a partir de fonte única, alternância
  entre elas, metadados por idioma e tratamento de conteúdo que não deve ser traduzido

### Modified Capabilities
- `design-system`: adiciona controle de tema, escala tipográfica mínima, proibição de
  rótulo de categoria repetido e as novas interações de movimento
- `navegacao`: adiciona controles de tema e idioma à navegação e a micro-interação dos links
- `conteudo-institucional`: adiciona a apresentação em índice dos projetos, a expansão
  inline, a pré-visualização por ponteiro, a citação única navegável e os metadados de canto
- `performance-e-descoberta`: sitemap passa a listar as duas versões de idioma

## Impact

### Código afetado
- `index.html` — passa a ser saída de build gerada de `src/index.html` + `content/*.json`
- `css/03-layout.css`, `css/05-sections.css`, `css/06-utilities.css` — reescritos para a
  nova direção; `01-tokens` ganha a paleta clara em papel e a escala tipográfica ampliada
- `js/motion.js` — ganha split por palavra e réguas em cascata
- novos: `js/index-preview.js` (pré-visualização que segue o cursor), `js/theme.js`,
  `tools/build-html.mjs`, `src/index.html`, `content/pt-BR.json`, `content/en.json`,
  `en/index.html`
- `sitemap.xml` — duas entradas

### Bloqueios conhecidos
- Não há screenshots dos sistemas liberados pelos clientes (pendência 2 da mudança
  anterior). A pré-visualização por ponteiro SHALL usar capas tipográficas geradas
  (setor + índice na paleta da marca) e trocá-las por screenshots quando autorizadas.
  Capas tipográficas não são screenshots e não podem ser apresentadas como tal.
- As 11 marcações de pendência comercial permanecem e MUST ser traduzidas na versão em
  inglês, nunca preenchidas.
