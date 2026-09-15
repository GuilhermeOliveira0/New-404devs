## Context

Ver `proposal.md` — Why, para a motivação. Restrições que moldam a abordagem:

- **Site estático, sem framework.** HTML, CSS e JS servidos pela Vercel. Não há build,
  nem gerenciador de pacotes, nem `package.json` hoje.
- **Equipe de quatro pessoas** com trabalho de cliente em paralelo. A arquitetura precisa
  permitir que duas pessoas mexam em partes diferentes sem conflito, e que quem voltar ao
  código em três meses entenda onde mexer.
- **O site é peça de portfólio.** A execução de design e movimento é, ela própria,
  demonstração da capacidade que a empresa vende. Isso eleva o padrão do acabamento.
- **Estado atual:** `styles.css` com 2.676 linhas em arquivo único e media queries fora
  de ordem; `script.js` com 1.045 linhas e seis responsabilidades no escopo global;
  `index.html` com 783 linhas e 32 blocos de SVG inline repetidos.
- **Existe documentação prévia** em `docs/01` a `docs/07` e um protótipo navegável em
  `docs/prototipo.html`, aprovado como direção pelo time.

## Goals / Non-Goals

**Goals:**

- Arquitetura em que cada arquivo tenha uma razão única para mudar
- Sistema de movimento que sirva de demonstração de capacidade sem custar performance
- Eliminação de código morto e duplicado, com redução mensurável de volume
- Contrato estável entre marcação e comportamento, de modo que renomear classe de estilo
  não quebre JavaScript
- Caminho de implementação em fases, cada uma publicável isoladamente

**Non-Goals:**

- Introdução de framework, bundler ou gerenciador de estado
- Sistema de múltiplas páginas ou rotas — permanece página única
- Área administrativa ou CMS para edição de conteúdo
- Internacionalização — o site permanece em português brasileiro
- Redesenho da identidade da marca. O nome, o logotipo e a família de cor permanecem

## Decisions

### D1 — Camadas de CSS numeradas, com a ordem do arquivo sendo a cascata

Seis arquivos em `css/`, numerados de `01-tokens` a `06-utilities`. A ordem numérica é
a ordem de especificidade pretendida.

| Camada | Responsabilidade | Pode depender de |
|---|---|---|
| `01-tokens` | Apenas declarações de variáveis | nada |
| `02-base` | Reset, elementos nativos, tipografia | 01 |
| `03-layout` | Container, grid, seção, barra, rodapé | 01, 02 |
| `04-components` | Botão, card, campo, etiqueta, acordeão | 01, 02 |
| `05-sections` | Composição específica de cada seção | 01–04 |
| `06-utilities` | Auxiliares e `.sr-only` | 01 |

**Regra que resolve o problema atual:** uma camada MUST NOT referenciar seletor definido
em camada superior. Token não conhece componente; componente não conhece seção. É isso
que impede a volta das media queries empilhadas e dos seletores que se anulam.

**Alternativa considerada:** manter arquivo único com sumário numerado. Rejeitada — é
exatamente o que existe hoje e falhou; o sumário não é aplicável por ferramenta, a ordem
das camadas sim.

**Alternativa considerada:** adotar uma metodologia completa como ITCSS ou um framework
utilitário. Rejeitada — custo de aprendizado desproporcional para uma página única de
nove seções.

### D2 — Concatenação por script, sem bundler

`package.json` com um único script que concatena `css/*.css` na ordem alfabética, que já
é a ordem correta por causa da numeração, e minifica para produção.

**Por que não seis `<link>` em produção:** seis folhas bloqueiam a renderização em série
e competem com o orçamento de maior renderização de conteúdo definido em
`specs/performance-e-descoberta`.

**Por que não um bundler:** para um site sem módulos, sem transpilação e sem dependências,
um bundler adiciona configuração, `node_modules` e uma superfície de manutenção que não
paga o próprio custo.

**Trade-off aceito:** passa a existir uma etapa de build. Mitigado por ser um comando
único, sem configuração, e por o desenvolvimento local seguir funcionando com os arquivos
separados.

**Revisto durante a implementação:** o artefato concatenado PASSA a ser versionado. A
versão anterior desta decisão dizia o contrário. O motivo da mudança: com
`outputDirectory: "."`, se a configuração de build for sobrescrita no painel da
hospedagem, o site vai ao ar sem folha de estilo nenhuma. Versionar o artefato custa um
arquivo gerado no repositório e elimina um modo de falha catastrófico e silencioso. O
build continua existindo e sobrescreve o arquivo na publicação.

### D3 — JavaScript em módulos de responsabilidade única

Três módulos, cada um com uma razão para mudar:

| Módulo | Responsabilidade única | Muda quando |
|---|---|---|
| `js/nav.js` | Estado e acessibilidade da navegação | a navegação muda |
| `js/motion.js` | Orquestração de entrada e revelação | o sistema de movimento muda |
| `js/form.js` | Validação e envio do formulário | as regras de contato mudam |

Cada módulo expõe uma única função de inicialização e não conhece os demais. Nenhum
estado compartilhado, nenhuma variável global — hoje há 18 declarações no escopo global
de `script.js`.

### D4 — JavaScript depende de atributos de dados, nunca de classes de estilo

O contrato entre marcação e comportamento SHALL ser atributo `data-*`. Classes de estilo
são detalhe de apresentação e podem ser renomeadas a qualquer momento.

```
Contrato (estável)          Apresentação (volátil)
data-nav-toggle             .nav__burger
data-nav-panel              .nav__panel
data-motion="reveal"        .card, .proj, .quote
data-motion-stagger         —
data-form="contact"         .form
```

**Por que isso importa aqui:** é a aplicação concreta de inversão de dependência num site
estático. Hoje `script.js` consulta `.floating-sidebar`, `.intro-video`, `.panel-frame` e
mais dez seletores de apresentação; renomear qualquer classe quebra comportamento em
silêncio. Com atributos de dados, a folha de estilo pode ser reescrita inteira sem tocar
em uma linha de JavaScript.

### D5 — Tradução honesta de SOLID para um site estático

SOLID é um conjunto de princípios de orientação a objetos. Aplicá-lo literalmente aqui
seria cerimônia vazia. A tradução que o time SHALL seguir, e que tem efeito real:

| Princípio | Aplicação neste projeto | Critério de violação |
|---|---|---|
| **SRP** | Cada camada de CSS e cada módulo de JS tem uma razão para mudar (D1, D3) | Um arquivo precisa ser editado por duas razões não relacionadas |
| **OCP** | Componentes são estendidos por classe modificadora e sobrescrita de token, nunca editando a regra base | Adicionar uma variante exigiu alterar o seletor base |
| **LSP** | Uma variante é substituível pela base: mesmo modelo de caixa, mesma altura mínima, mesmo comportamento de foco | Trocar `.btn` por `.btn--ghost` quebra o alinhamento do contexto |
| **ISP** | Módulos expõem uma função de inicialização; a página não carrega lógica de formulário para abrir um menu | Um módulo precisa importar outro para funcionar |
| **DIP** | Comportamento depende de atributos de dados, não de seletores de apresentação (D4) | Renomear uma classe quebrou um comportamento |

### D6 — Sistema de movimento: orquestração, não volume

O requisito do time é que o movimento demonstre domínio de design. A decisão de projeto é
que **domínio se lê como orquestração e disciplina de tempo, não como quantidade de
efeito**. O site atual tem sete camadas animadas simultâneas e transmite instabilidade,
não capacidade.

O sistema tem quatro elementos e nada além disso:

**1. Sequência de abertura.** Os elementos da primeira dobra entram em cascata deliberada:
rótulo, título, texto de apoio, botões, faixa de credibilidade. Escalonamento de 70ms,
duração total limitada a 1200ms. É o momento orquestrado que carrega a impressão de
acabamento.

**2. Momento assinatura.** No título da primeira dobra, as palavras *planilha* e *caderno*
recebem um traço de risco que é desenhado da esquerda para a direita ao final da
sequência de abertura. É a tese da empresa executada como movimento: a 404Devs risca o
jeito antigo. Implementado como `scaleX` em pseudo-elemento, custo desprezível.
É o único efeito do site que não se repete em nenhum outro lugar — é o que o torna assinatura.

**3. Revelação por scroll com escalonamento interno.** Ao entrar na área visível, uma
seção revela seus filhos em sequência de 60ms. Executa uma vez por elemento; o observador
deixa de observar após disparar.

**4. Micro-interações.** Resposta a apontamento e foco em borda, cor e deslocamento
vertical de no máximo 2px. Duração de 160ms.

**Tokens de tempo e curva**, para que tudo pertença ao mesmo sistema:

```
--dur-micro: 160ms      --ease-out:  cubic-bezier(0.22, 1, 0.36, 1)
--dur-enter: 500ms      --ease-micro: cubic-bezier(0.4, 0, 0.2, 1)
--dur-reveal: 600ms
--stagger-hero: 70ms    --stagger-reveal: 60ms
```

**Restrições inegociáveis**, verificáveis em revisão:
- Entrada e revelação animam exclusivamente `transform` e `opacity`
- Micro-interações animam apenas `border-color`, `color`, `background-color` e
  `filter`, que disparam pintura mas nunca recálculo de layout
- Nenhuma animação toca propriedade que dispare recálculo de layout
- Nenhum laço infinito
- Estado de repouso de todo conteúdo é visível: a revelação parte de estado legível,
  nunca de `opacity: 0` aguardando observador
- `prefers-reduced-motion` desliga os quatro elementos

**Alternativa considerada:** reintroduzir GSAP pela conveniência de linha do tempo.
Rejeitada — 70 KB para orquestrar cinco elementos, quando a Web Animations API entrega
linha do tempo, escalonamento e controle de curva nativamente.

### D7 — Elevação visual sobre a direção aprovada

O protótipo em `docs/prototipo.html` está aprovado como direção. As decisões de elevação:

- **Contraste tipográfico maior.** Escala de display mais ampla e espaçamento negativo
  mais firme nos títulos, aproximando o acabamento editorial que a referência de mercado
  usa.
- **Hierarquia de superfície.** Borda, preenchimento, raio e elevação passam a ser
  gastos por papel. Nem todo bloco é card: o case em destaque recebe tratamento de
  superfície, os projetos secundários recebem menos, e o processo não recebe nenhum.
  Isso resolve o achatamento de hierarquia que uma grade uniforme de cards produz.
- **Motivo de pauta como estrutura.** A malha vertical discreta deixa de ser textura
  decorativa e passa a alinhar-se às colunas reais do conteúdo.
- **Respiro vertical maior** entre seções, com régua fina como separador em vez de bloco
  de transição animado.

### D8 — Envio do formulário por função serverless própria

Função serverless na Vercel, com provedor de e-mail transacional e chave em variável de
ambiente. O formulário envia por requisição assíncrona e trata sucesso e falha na própria
página.

| Alternativa | Por que não |
|---|---|
| Serviço de formulário de terceiros | Dependência externa no caminho de conversão, limite de volume no plano gratuito e dados do lead em domínio de terceiro |
| Manter abertura do cliente de e-mail | É o defeito que a mudança existe para corrigir |
| Formulário do provedor de hospedagem | Amarra a solução à hospedagem atual |

Registro do contato em destino secundário, para que falha de entrega de e-mail não
resulte em perda do lead, conforme `specs/captacao-de-leads`.

### D8b — Fontes auto-hospedadas

Decisão tomada durante a implementação, a partir de medição.

A primeira auditoria de Lighthouse deu **performance 83** e **LCP 3,3s**, contra a meta
de 95 e 2,0s. O diagnóstico apontou 2.060ms de bloqueio de renderização, dos quais
1.029ms eram o CSS do Google Fonts: antes da primeira pintura o navegador precisava
resolver DNS, abrir TLS e baixar uma folha de um segundo origin.

As três famílias passam a ser servidas do próprio domínio, com três reduções aplicadas
em sequência:

| Etapa | Peso das fontes |
|---|---|
| 29 faces do Google, todos os subsets | — |
| só o subset `latin` (cobre U+00C0–00FF, todo o português) | 134,3 KB |
| subsetting por intervalo de caracteres | 114,1 KB |
| instanciação dos eixos variáveis (`opsz` fixo, `wght` 700–800) | **74,6 KB** |

As duas fontes usadas acima da dobra são pré-carregadas.

**Resultado medido:** performance 83 → **96 no mobile e 100 no desktop**, LCP 3,3s →
**1,8s no mobile e 0,4s no desktop**. Acessibilidade, boas práticas e SEO em 100 nos dois.

**Efeito colateral bem-vindo:** o site deixa de fazer requisição a um terceiro no
carregamento, o que também elimina o vazamento de IP do visitante para o Google.

### D9 — Ícones em sprite, referenciados por uso

Os quatro ícones hoje repetidos inline oito vezes cada, totalizando 32 blocos de SVG,
passam a um único arquivo de sprite referenciado por `<use>`.

**Efeito medido:** de 32 blocos para 1 arquivo e 8 referências. É a maior fonte isolada
de duplicação do HTML atual.

### D10 — Remoção de código morto como etapa verificada, não incidental

A remoção MUST ser verificada, não presumida. Após a reescrita, cada seletor de CSS
remanescente SHALL ter ao menos uma ocorrência correspondente no HTML, e cada função de
JavaScript SHALL ter ao menos um ponto de chamada.

Volume previsto:

| Item | Antes | Depois |
|---|---|---|
| `styles.css` | 2.676 linhas | 1.095 linhas de código em 6 camadas (1.465 com documentação) |
| `script.js` | 1.045 linhas | 238 linhas de código em 3 módulos (351 com documentação) |
| Bibliotecas de terceiros | ~210 KB | 0 |
| Blocos de SVG inline | 32 | 1 sprite |
| Navegações principais | 2 | 1 |
| Seções de contato | 2 | 1 |
| Blocos de transição entre seções | 10 | 0 |
| Peso da primeira visita | 16,23 MB | < 500 KB |

### D11 — Idioma único na base de código

Nomes de classe, atributo de dado, arquivo e função SHALL usar um único idioma. Hoje o
código mistura `.floating-sidebar` com `.tecnologias`, `createTeamSwiper` com
`agendar`. A convenção adotada é **inglês para identificadores de código, português para
conteúdo visível ao usuário**.

## Risks / Trade-offs

**[O movimento novo custa a performance conquistada]** → Restrição a `transform` e
`opacity`, ausência de laço infinito, e auditoria automatizada como portão de publicação
conforme `specs/performance-e-descoberta`. O orçamento de 500 KB e a pontuação mínima de
95 valem também para a versão com movimento.

**[Remover o vídeo de abertura pode ser sentido como perda de impacto]** → A sequência de
abertura orquestrada e o momento assinatura entregam a impressão de acabamento a custo de
transferência próximo de zero, contra 14,76 MB e cerca de vinte segundos de tela preta.
O impacto passa a acontecer enquanto o conteúdo já está legível, não antes dele.

**[Decisões comerciais pendentes travam parte do conteúdo]** → As seções afetadas são
implementadas com marcação visível de pendência, conforme `specs/conteudo-institucional`.
A implementação não fica bloqueada; a publicação em produção fica condicionada à
resolução, que é listada explicitamente antes da liberação.

**[Etapa de build introduz possibilidade de publicar CSS desatualizado]** → Script de
build executado na publicação, não manualmente. O artefato concatenado não é versionado.

**[Função serverless adiciona dependência de infraestrutura no caminho de conversão]** →
O caminho de contato direto permanece disponível em todas as larguras e não depende da
função. Falha no envio comunica o erro e oferece esse caminho alternativo, conforme
`specs/captacao-de-leads`.

**[Reescrita completa perde correções pontuais já feitas]** → As correções de estabilidade
existentes no histórico — recorte de card, pausa de animação em aba oculta, tratamento de
`prefers-reduced-motion` — são catalogadas antes da reescrita e reaplicadas explicitamente
como tarefas.

## Migration Plan

Quatro fases, cada uma publicável de forma independente. Reversão em qualquer ponto por
reversão de commit e republicação, sem migração de dados, já que o site não possui estado
persistente.

1. **Correções críticas sobre a base atual.** Caminho da imagem quebrada, remoção dos
   depoimentos fictícios e publicação dos reais, correções ortográficas, ícone de
   identificação e metadados de compartilhamento, remoção dos arquivos indevidamente
   versionados. Publicável isoladamente e sem dependência das fases seguintes.
2. **Fundação.** Nova estrutura de arquivos, tokens, navegação persistente com menu de
   telas estreitas, remoção das bibliotecas e das camadas decorativas, sistema de
   movimento. Ao fim desta fase o orçamento de performance já é atendido.
3. **Conteúdo.** As nove seções com o conteúdo real, e marcação de pendência onde
   houver decisão comercial em aberto.
4. **Conversão e descoberta.** Função serverless, dados estruturados, diretivas de
   rastreamento, auditoria de acessibilidade e performance como portão de publicação.

**Portão entre fase 2 e fase 3:** a auditoria automatizada SHALL atingir 95 em
performance e acessibilidade antes de o conteúdo novo entrar. Isso impede que a fase 3
seja usada para justificar regressão de performance.

## Open Questions

- **Destino do registro secundário de contato.** Planilha, base gerenciada ou serviço de
  automação. Não altera as specs nem o desenho do formulário; é escolha de operação que
  pode ser feita durante a fase 4.
- **Provedor de e-mail transacional.** A escolha entre provedores equivalentes não altera
  o contrato da função nem o comportamento observável definido em
  `specs/captacao-de-leads`.
- **Domínio próprio.** Verificar se o site já responde em domínio próprio ou em subdomínio
  da hospedagem. Afeta apenas o endereço canônico declarado, não a arquitetura.
