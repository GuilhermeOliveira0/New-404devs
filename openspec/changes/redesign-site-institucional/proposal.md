## Why

O site institucional da 404Devs existe para converter visitante em cliente, mas hoje
trabalha contra esse objetivo: declara `DEPOIMENTOS FICTÍCIOS` em caixa alta enquanto
esconde 5 avaliações reais nota 5,0 e 6 projetos entregues; entrega 16,23 MB na primeira
visita (14,76 MB só de vídeo de abertura) antes de mostrar a primeira palavra; e não
oferece nenhum link de navegação abaixo de 720px de largura, faixa onde está o tráfego
vindo de Instagram e TikTok.

É a única peça do portfólio que 100% dos clientes veem antes de decidir, e precisa ser
o melhor trabalho da empresa — inclusive na execução de design e movimento, que é parte
do que a 404Devs vende.

## What Changes

### Remoções
- **BREAKING** Remoção da seção de vídeo de abertura e dos dois arquivos `.mp4`
  (`hero-background.mp4` 14,76 MB e `hero_backgroundmobile.mp4` 15,44 MB)
- **BREAKING** Remoção da sidebar flutuante `.floating-sidebar`, que duplica a navegação
  do header e desaparece abaixo de 720px
- Remoção do cursor customizado (`cursor: none` no `<body>`, que deixa o usuário sem
  cursor caso o JS falhe)
- Remoção dos dois `<canvas>` decorativos: chuva de código e partículas com as palavras
  `404`, `ERRO`, `NULL`, `BUG`, `FAIL`
- Remoção das dependências GSAP, ScrollTrigger e Swiper (~210 KB)
- Remoção dos 10 blocos `.section-transition`, do tilt 3D em hover e do painel decorativo
  "404Devs Operational Interface"
- Remoção dos depoimentos fictícios, incluindo o assinado com o nome de um cliente real
- Remoção de arquivos indevidamente versionados: `THE_KRAKEN_DESIGN_SYSTEM_HANDOFF.md`
  (documentação de outro projeto), `server.err` (contém stack trace) e `server.log`

### Adições
- Navbar fixa única com menu hamburger funcional abaixo de 900px
- Seção de Projetos com os 6 cases reais, cada um exibindo o que o cliente usava antes
  (planilha, caderno, WhatsApp) e o que foi construído
- Seção de Depoimentos com as 5 avaliações reais citadas na íntegra e link verificável
- Seção "O que está incluso" cobrindo contrato, nota fiscal, garantia e treinamento
- Seção de FAQ com preço, prazo, garantia, titularidade do código e forma de pagamento
- Sistema de movimento orquestrado, projetado como demonstração de capacidade técnica
- Favicon, Open Graph, dados estruturados `schema.org`, `robots.txt` e `sitemap.xml`
- Formulário com envio real por função serverless, substituindo a abertura do Gmail

### Reestruturações
- De 12 seções para 9, cada uma com função declarada, ordenadas prova antes de promessa
- CSS único de 2.676 linhas dividido em camadas numeradas por responsabilidade
- `script.js` de 1.045 linhas com seis responsabilidades no escopo global dividido em
  módulos de responsabilidade única
- Correção do caminho `assets/wendell.jpeg` → `assets/Wendell.jpeg`, que hoje retorna
  404 em produção Linux

## Capabilities

### New Capabilities
- `design-system`: tokens de cor, tipografia, espaçamento e elevação; componentes base
  (botão, card, campo, etiqueta); e o sistema de movimento com seus limites de performance
  e acessibilidade
- `navegacao`: navbar persistente, menu mobile acessível, navegação por âncora e
  indicação de seção corrente
- `conteudo-institucional`: as nove seções de conteúdo, as regras de veracidade do que
  é publicado e o tratamento de informação ainda pendente de decisão comercial
- `captacao-de-leads`: formulário de contato, validação, envio confiável, proteção
  contra spam e caminhos alternativos de contato
- `performance-e-descoberta`: orçamento de performance, otimização de mídia,
  metadados de compartilhamento, dados estruturados e conformidade de acessibilidade

### Modified Capabilities
<!-- Nenhuma. O projeto não possui specs anteriores em openspec/specs/. -->

## Impact

### Código afetado
- `index.html` (783 linhas) — reescrito
- `styles.css` (2.676 linhas) — substituído por `css/01-tokens.css` … `css/06-utilities.css`
- `script.js` (1.045 linhas) — substituído por `js/nav.js`, `js/reveal.js`, `js/form.js`
- `assets/` — reorganizado em `assets/img/`, `assets/icons/`; mídia convertida para WebP

### Dependências
- Removidas: GSAP 3.14.1, ScrollTrigger, Swiper 11
- Adicionadas: nenhuma biblioteca de runtime. Movimento implementado com
  `IntersectionObserver`, Web Animations API e CSS
- Novo: `package.json` apenas para o script de concatenação do CSS

### Infraestrutura
- Nova função serverless para o formulário, com provedor de e-mail transacional
- Variáveis de ambiente para a chave do provedor de e-mail

### Bloqueios conhecidos
Onze decisões comerciais documentadas em `docs/05-conteudo.md` bloqueiam parte do
conteúdo — faixa de preço, prazo de garantia, prazos típicos, autorização para publicar
print e nomear cliente, número do CNPJ, e ao menos um resultado numérico de case. As
seções afetadas SHALL ser implementadas com marcação explícita de pendência até que as
decisões existam, nunca com valor inventado.
