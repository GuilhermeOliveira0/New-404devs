## ADDED Requirements

### Requirement: Controles de tema e idioma na navegação

A navegação SHALL oferecer, em todas as larguras, um controle de tema e um controle de
idioma, cada um com rótulo textual e operável por teclado. O controle de tema SHALL
comunicar seu estado a tecnologias assistivas.

#### Scenario: Telas estreitas

- **WHEN** a página é exibida em 390px de largura
- **THEN** os controles de tema e idioma estão acessíveis, na barra ou dentro do painel de
  navegação

#### Scenario: Estado do tema anunciado

- **WHEN** um leitor de tela encontra o controle de tema
- **THEN** o estado atual é anunciado e o rótulo descreve a ação que o acionamento executa

### Requirement: Micro-interação de sublinhado nos links de navegação

Os links de navegação SHALL indicar apontamento e foco por um sublinhado que cresce, e
MUST NOT alterar peso da fonte no apontamento.

#### Scenario: Foco por teclado em um link

- **WHEN** um link de navegação recebe foco de teclado
- **THEN** o mesmo indicador do apontamento é exibido
