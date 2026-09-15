## Purpose

Define a linguagem visual do site — cor, tipografia, espaçamento, componentes e
movimento — como um sistema de fonte única, de modo que a aparência seja consistente
entre seções, legível em ambos os temas do visitante, e que o movimento funcione como
demonstração da capacidade de design da empresa sem custar performance ou acessibilidade.

## ADDED Requirements

### Requirement: Fonte única de tokens visuais

Todo valor de cor, tipografia, espaçamento, raio e elevação SHALL ser declarado como
token em uma única camada de definição. Nenhum componente ou seção MUST declarar um
valor literal de cor, tamanho de fonte ou espaçamento fora dessa camada.

#### Scenario: Alteração de cor de acento se propaga

- **WHEN** o valor do token de acento é alterado em um único ponto
- **THEN** todos os botões primários, links, bordas de destaque e rótulos de acento
  do site refletem a nova cor, sem edição adicional em nenhum outro arquivo

#### Scenario: Valor literal fora da camada de tokens

- **WHEN** um componente declara uma cor, tamanho de fonte ou espaçamento como valor
  literal em vez de referenciar um token
- **THEN** isso é tratado como defeito e MUST ser corrigido antes da publicação

### Requirement: Tokens nomeados por função, nunca por aparência

Todo token SHALL ser nomeado pelo papel que exerce na interface — superfície, borda,
texto, acento, estado — e MUST NOT ser nomeado pela cor que carrega no momento.

#### Scenario: Token de acento renomeado corretamente

- **WHEN** o sistema declara a cor de destaque da marca
- **THEN** o token se chama por função, como acento, e não por aparência, evitando a
  situação atual em que `--magenta` carrega o valor `#ffb800`, que é dourado

### Requirement: Suporte aos três estados de tema do visitante

O site SHALL renderizar corretamente nos três estados possíveis do visitante: tema
claro explícito, tema escuro explícito, e preferência de sistema sem escolha explícita.
Toda cor SHALL ter definição completa no conjunto base de tokens antes de qualquer
redefinição condicional por tema.

#### Scenario: Visitante sem escolha explícita de tema

- **WHEN** o visitante não definiu tema e o sistema operacional está em modo claro
- **THEN** a página apresenta a paleta clara completa, com fundo, texto e acento
  coerentes entre si, sem nenhum elemento herdando cor do tema oposto

#### Scenario: Escolha explícita vence a preferência do sistema

- **WHEN** o visitante escolhe explicitamente um tema diferente do preferido pelo sistema
- **THEN** a escolha explícita prevalece em ambas as direções

### Requirement: Contraste mínimo verificável

Texto normal SHALL apresentar contraste mínimo de 4,5:1 contra a superfície imediatamente
atrás dele. Texto com 24px ou mais SHALL apresentar contraste mínimo de 3:1. A
verificação MUST ser feita em ambos os temas.

#### Scenario: Texto de apoio em tema claro

- **WHEN** um texto de apoio é renderizado sobre a superfície de card no tema claro
- **THEN** a razão de contraste medida é de no mínimo 4,5:1

### Requirement: Alvo de toque mínimo

Todo elemento interativo — botão, link de navegação, campo de formulário, controle de
menu, item de FAQ — SHALL apresentar área clicável de no mínimo 44 por 44 pixels.

#### Scenario: Link de navegação no menu mobile

- **WHEN** o menu mobile está aberto e o visitante toca em um item
- **THEN** a área sensível ao toque do item tem ao menos 44 pixels de altura

### Requirement: Foco de teclado sempre visível

Todo elemento que possa receber foco de teclado SHALL apresentar indicador de foco
visível, com contraste suficiente contra a superfície ao redor. O indicador MUST NOT
ser removido por nenhuma regra de estilo.

#### Scenario: Navegação sequencial por teclado

- **WHEN** o visitante percorre a página inteira usando apenas a tecla Tab
- **THEN** em cada parada existe um indicador de foco claramente visível, e nenhum
  elemento interativo é alcançado sem indicação

### Requirement: Variantes de componente substituíveis

Componentes SHALL ser estendidos por variantes que preservam o contrato do componente
base. Uma variante MUST funcionar em qualquer lugar onde o componente base funciona,
sem exigir alteração no contexto ao redor.

#### Scenario: Variante de botão em contexto novo

- **WHEN** uma variante de botão é aplicada dentro de uma seção onde a variante primária
  já era usada
- **THEN** o alinhamento, a altura, o espaçamento interno e o comportamento de foco
  permanecem idênticos, mudando apenas a aparência definida pela variante

### Requirement: Movimento orquestrado na entrada da página

A página SHALL apresentar uma sequência de entrada coordenada, em que os elementos do
primeiro bloco visível aparecem em ordem deliberada e não simultaneamente. A sequência
completa MUST concluir em no máximo 1200 milissegundos a partir do momento em que o
conteúdo está pronto para exibição.

#### Scenario: Primeira visita com movimento habilitado

- **WHEN** o visitante abre a página pela primeira vez com movimento habilitado
- **THEN** rótulo, título, texto de apoio, botões e faixa de credibilidade entram em
  sequência escalonada, e a sequência termina em até 1200ms

#### Scenario: Conteúdo legível mesmo se a sequência não executar

- **WHEN** o script responsável pela sequência de entrada falha ou não é executado
- **THEN** todo o conteúdo permanece visível e legível em seu estado final, sem
  elemento preso em estado invisível

### Requirement: Revelação por scroll com estado de repouso visível

Seções abaixo da primeira dobra SHALL revelar seu conteúdo conforme entram na área
visível, uma única vez por elemento. O estado de repouso de todo conteúdo MUST ser
visível: nenhum elemento pode depender da execução de script para se tornar legível.

#### Scenario: Elemento revelado uma única vez

- **WHEN** o visitante rola até uma seção, continua para baixo e depois retorna
- **THEN** o conteúdo da seção permanece visível e a animação de revelação não se repete

#### Scenario: Captura da página sem execução de script

- **WHEN** a página é capturada ou lida sem execução de script
- **THEN** todas as seções aparecem completas e legíveis

### Requirement: Movimento restrito a propriedades sem custo de layout

Toda animação SHALL animar exclusivamente propriedades que não disparam recálculo de
layout. Animar dimensão, posição de caixa ou propriedades que forcem novo cálculo de
layout MUST NOT ocorrer.

#### Scenario: Auditoria de animação durante o scroll

- **WHEN** as animações de revelação e de micro-interação são executadas durante rolagem
- **THEN** nenhuma delas dispara recálculo de layout, e a rolagem se mantém fluida

### Requirement: Ausência de movimento ambiente contínuo

O site MUST NOT apresentar animação em laço infinito que compita com a leitura do
conteúdo. Movimento SHALL existir apenas como resposta a uma ação do visitante —
carregamento, rolagem, apontamento, foco ou acionamento.

#### Scenario: Página em repouso

- **WHEN** a página está aberta e o visitante não interage por 30 segundos
- **THEN** nenhum elemento está em movimento

### Requirement: Respeito à preferência por movimento reduzido

Quando o visitante declara preferência por movimento reduzido, o site SHALL apresentar
todo o conteúdo em estado final imediato, sem transição, sem sequência de entrada e sem
revelação por scroll.

#### Scenario: Visitante com movimento reduzido ativado

- **WHEN** o sistema do visitante declara preferência por movimento reduzido
- **THEN** a página carrega com todo o conteúdo já em posição final, e nenhuma animação
  ou transição é executada
