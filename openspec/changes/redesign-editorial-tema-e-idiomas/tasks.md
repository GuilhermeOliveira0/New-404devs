## 1. Fundação da direção editorial

- [x] 1.1 Ampliar `css/01-tokens.css` com a escala tipográfica de E3, a paleta clara em papel de E10 e os tokens `--on-accent-*` de E9, e verificar com o script de contraste que todos os pares passam em 4,5:1 nos dois temas
- [x] 1.2 Substituir `.wrap` pelo grid de 12 colunas de E2 em `css/03-layout.css` e verificar que nenhum seletor `.wrap` resta em CSS ou HTML
- [x] 1.3 Remover os rótulos de categoria de todas as seções e implementar o índice de seção em mono na coluna 12, verificando que nenhum `h2` é precedido por rótulo em caixa alta
- [x] 1.4 Implementar os metadados de canto da primeira dobra com relógio no fuso de São Paulo atualizado a cada 30 s sem animação, e verificar que a hora bate com o fuso independentemente do fuso da máquina

## 2. Seções

- [x] 2.1 Reescrever a primeira dobra com o título em duas linhas deslocadas e razão display : corpo ≥ 6:1 medida em 1280px
- [x] 2.2 Implementar o índice de projetos como `<ol reversed>` de `<details>`, uma linha por projeto com as cinco colunas de E5, GranjaTech aberto por padrão, e verificar expansão por teclado e sem script
- [x] 2.3 Criar `tools/build-covers.mjs` gerando uma capa tipográfica SVG por projeto em `assets/img/covers/`, com `alt` que a identifica como capa, e verificar que nenhuma simula interface de sistema
- [x] 2.4 Implementar `js/index-preview.js` com a figura fixa que acompanha o ponteiro, ativa apenas em ponteiro fino com apontamento e movimento permitido, e verificar que em toque e sob movimento reduzido nada flutua
- [x] 2.5 Implementar a citação única navegável de E6 com controles por teclado, indicador `1 / 5`, sem autoplay, e verificar que sem script os cinco depoimentos aparecem em sequência
- [x] 2.6 Reescrever serviços como quatro linhas numeradas com régua de 2px e condições como `<dl>` em duas colunas, verificando que não resta cartão com borda e fundo em nenhuma das duas
- [x] 2.7 Adaptar processo, time e FAQ ao grid de 12 colunas conforme E7 e E8
- [x] 2.8 Implementar o CTA final como bloco âmbar full-bleed com formulário sobre âmbar, verificando contraste dos campos e do texto

## 3. Movimento

- [x] 3.1 Implementar o split por palavra do `h1` inline após o elemento, tratando `.strike` como palavra única, com `aria-label` íntegro e total ≤ 1200 ms, e verificar que sem script o título está inteiro
- [x] 3.2 Implementar as réguas em cascata do índice e verificar que em repouso e sem script estão completas
- [x] 3.3 Implementar o sublinhado de navegação com `scaleX` e origem alternada, mesmo estado em foco, sem troca de peso
- [x] 3.4 Remover qualquer laço infinito introduzido e verificar que a página em repouso por 30 s não tem nada em movimento

## 4. Verificação do design

- [x] 4.1 Rodar a regra de camadas e a busca de seletores órfãos e verificar zero violações
- [x] 4.2 Renderizar em 320, 390, 768 e 1280px e verificar ausência de overflow horizontal
- [x] 4.3 Renderizar sem script e verificar que todo conteúdo está visível e legível
- [x] 4.4 Rodar Lighthouse mobile e desktop e verificar ≥ 95 em performance e acessibilidade
- [x] 4.5 Verificar peso da primeira visita < 500 KB incluindo capas carregadas na dobra

## 5. Tema

- [x] 5.1 Adicionar o script inline no `<head>` que aplica a escolha salva antes da folha de estilo, com `try/catch`, e verificar recarga sem flash nos dois temas
- [x] 5.2 Ligar `js/theme.js` ao controle `[data-theme-toggle]` da barra e do painel, com `aria-pressed` e rótulo de ação, e verificar o anúncio de estado
- [x] 5.3 Implementar a cortina circular por View Transition a partir do botão, com fallback instantâneo, e verificar que sob movimento reduzido a troca é imediata
- [x] 5.4 Atualizar `<meta name="theme-color">` na troca e verificar o valor nos dois temas

## 6. Idioma

- [x] 6.1 Extrair todo texto visível de `index.html` para `content/pt-BR.json` e criar `src/index.html` com marcadores, verificando que o build regenera um `index.html` idêntico em conteúdo ao atual
- [x] 6.2 Traduzir para `content/en.json` com o mesmo conjunto de chaves, depoimentos com original íntegro mais tradução marcada, pendências traduzidas, e verificar que o build não reporta chave faltando nem sobrando
- [x] 6.3 Converter todo caminho do template para raiz e verificar que o lint de caminhos do build passa
- [x] 6.4 Implementar o link de idioma da barra e do painel apontando para a página gêmea com `hreflang` e `lang`, e verificar a navegação nos dois sentidos
- [x] 6.5 Gerar `/en/index.html` e verificar `lang`, canônico, `og:locale` e os três `hreflang`
- [x] 6.6 Contar as marcações de pendência nas duas versões e verificar igualdade
- [x] 6.7 Atualizar `sitemap.xml` com as duas entradas e `hreflang` cruzado
- [x] 6.8 Fazer `npm run build` rodar CSS e HTML e verificar que `index.html` e `en/index.html` ficam versionados

## 7. Verificação final

- [x] 7.1 Rodar Lighthouse em `/` e `/en/` nos dois temas e verificar ≥ 95 em performance e acessibilidade
- [x] 7.2 Percorrer `/en/` por teclado e verificar rótulos e alternativas em inglês
- [x] 7.3 Verificar que `/en/` não tem recurso com falha
- [x] 7.4 Registrar em `docs/06-arquitetura-tecnica.md` o novo fluxo de edição de conteúdo
