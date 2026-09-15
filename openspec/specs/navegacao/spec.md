## Purpose

Garantir que o visitante consiga se mover entre as seções do site em qualquer largura
de tela e por qualquer meio de entrada, eliminando a situação atual em que não existe
nenhum link de navegação abaixo de 720px e em que a navegação só aparece depois que o
visitante rola além do vídeo de abertura.

## Requirements

### Requirement: Navegação disponível desde o primeiro instante

A navegação principal SHALL estar visível e operável a partir do momento em que a página
é exibida, em qualquer largura de tela. Nenhuma condição de rolagem MUST ser exigida para
que a navegação se torne acessível.

#### Scenario: Carregamento sem rolagem

- **WHEN** a página termina de carregar e o visitante ainda não rolou
- **THEN** a navegação principal está visível e seus itens são acionáveis

### Requirement: Navegação persistente durante a rolagem

A navegação principal SHALL permanecer acessível enquanto o visitante percorre a página,
sem exigir retorno ao topo.

#### Scenario: Visitante no fim da página

- **WHEN** o visitante rolou até a última seção antes do rodapé
- **THEN** a navegação principal continua acessível e permite ir a qualquer outra seção

### Requirement: Navegação única, sem duplicação

O site SHALL apresentar exatamente um conjunto de navegação principal por vez. MUST NOT
existir um segundo conjunto de links apontando para os mesmos destinos exibido
simultaneamente.

#### Scenario: Verificação em tela larga

- **WHEN** a página é exibida em tela de 1440px de largura
- **THEN** existe um único conjunto de navegação principal visível, e não há uma segunda
  lista de links para as mesmas seções

### Requirement: Navegação em telas estreitas

Em larguras onde os itens de navegação não cabem na barra, o site SHALL oferecer um
controle de abertura que revela a lista completa de destinos e a ação principal de
contato. O controle MUST ser identificável por rótulo textual, não apenas por ícone.

#### Scenario: Visitante em celular

- **WHEN** a página é aberta em tela de 390px de largura
- **THEN** existe um controle rotulado que, ao ser acionado, revela todos os destinos
  de navegação e a ação principal de contato

#### Scenario: Nenhuma largura sem navegação

- **WHEN** a página é avaliada em larguras de 320px, 480px, 768px, 1024px e 1440px
- **THEN** em todas elas existe caminho para alcançar qualquer seção da página

### Requirement: Menu operável por teclado e leitor de tela

O controle de abertura do menu SHALL comunicar seu estado de aberto ou fechado a
tecnologias assistivas. O menu aberto SHALL ser fechável por teclado, e o foco MUST
retornar ao controle que o abriu.

#### Scenario: Fechamento por tecla

- **WHEN** o menu está aberto e o visitante aciona a tecla Escape
- **THEN** o menu fecha e o foco retorna ao controle de abertura

#### Scenario: Estado anunciado

- **WHEN** um leitor de tela encontra o controle de abertura do menu
- **THEN** o estado atual de aberto ou fechado é anunciado

### Requirement: Fechamento após escolha de destino

Ao escolher um destino no menu de telas estreitas, o menu SHALL fechar e a navegação
até a seção escolhida SHALL ocorrer.

#### Scenario: Escolha de seção no celular

- **WHEN** o visitante aciona um item de destino com o menu aberto
- **THEN** o menu fecha e a página posiciona a seção escolhida na área visível, sem
  que o conteúdo fique encoberto pela barra de navegação

### Requirement: Ação de contato sempre alcançável

A ação principal de contato SHALL estar presente na navegação em todas as larguras de
tela, com o mesmo rótulo em todos os pontos onde aparece.

#### Scenario: Rótulo consistente

- **WHEN** as ações principais de contato da página são comparadas entre navegação,
  primeira dobra e seção de contato
- **THEN** todas usam o mesmo rótulo, em vez dos sete rótulos distintos existentes hoje

### Requirement: Nenhum elemento focável oculto de tecnologias assistivas

Nenhum elemento capaz de receber foco de teclado MUST estar contido em região marcada
como oculta para tecnologias assistivas.

#### Scenario: Percurso por teclado sem destino invisível

- **WHEN** o visitante percorre a página por teclado
- **THEN** o foco nunca pousa em um elemento que esteja dentro de região ocultada de
  leitores de tela
