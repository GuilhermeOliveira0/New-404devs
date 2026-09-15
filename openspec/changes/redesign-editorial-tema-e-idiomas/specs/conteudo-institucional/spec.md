## ADDED Requirements

### Requirement: Projetos apresentados como índice numerado

A seção de projetos SHALL apresentar os projetos como uma lista ordenada numerada em
ordem decrescente, uma linha por projeto, com número, nome, setor, o que foi construído
e ano quando conhecido. MUST NOT apresentar os projetos como grade de cartões.

#### Scenario: Leitura da lista

- **WHEN** a seção de projetos é renderizada
- **THEN** cada projeto ocupa uma linha com número de índice, nome e setor visíveis sem
  interação

### Requirement: Expansão inline por projeto

Cada linha do índice SHALL poder ser expandida no lugar para revelar a situação anterior
do cliente, o que foi construído e o resultado, sem sair da página. A expansão SHALL
funcionar por teclado e sem script.

#### Scenario: Expansão sem script

- **WHEN** o visitante aciona uma linha com script desabilitado
- **THEN** o detalhe do projeto é revelado no lugar

### Requirement: Pré-visualização que acompanha o ponteiro

Em dispositivos com ponteiro fino e apontamento, apontar uma linha do índice SHALL exibir
uma pré-visualização do projeto que acompanha o ponteiro. Em toque, teclado, movimento
reduzido ou sem script, a pré-visualização MUST NOT aparecer e a linha SHALL permanecer
completa por si só.

#### Scenario: Toque

- **WHEN** a página é usada em dispositivo de toque
- **THEN** nenhuma pré-visualização flutuante existe e a lista é totalmente usável

#### Scenario: Pré-visualização sem screenshot autorizado

- **WHEN** um projeto não tem screenshot liberado pelo cliente
- **THEN** a pré-visualização exibe uma capa tipográfica com setor e índice na paleta da
  marca, e MUST NOT simular uma tela de sistema

### Requirement: Depoimento único navegável

Os depoimentos SHALL ser apresentados um por vez, em escala editorial, com controles de
anterior e próximo operáveis por teclado, e MUST NOT avançar automaticamente. Todos os
depoimentos SHALL estar presentes no documento e acessíveis a tecnologias assistivas
independentemente do que está visível.

#### Scenario: Navegação por teclado

- **WHEN** o visitante aciona o controle de próximo com o teclado
- **THEN** o próximo depoimento é exibido e o foco permanece no controle

#### Scenario: Sem script

- **WHEN** a página é carregada sem script
- **THEN** todos os depoimentos estão visíveis em sequência

### Requirement: Metadados de sistema nos cantos

A primeira dobra SHALL exibir, em texto pequeno em mono, metadados verificáveis: hora
local da equipe, tamanho da equipe, formalização fiscal e caminho de verificação externa.
A hora SHALL ser calculada no fuso da equipe e atualizada sem animação.

#### Scenario: Hora local

- **WHEN** a primeira dobra é exibida
- **THEN** a hora mostrada corresponde ao fuso horário de São Paulo, independentemente do
  fuso do visitante

### Requirement: Serviços e condições em formato de lista e ficha

Serviços SHALL ser apresentados como linhas numeradas em escala grande separadas por
régua. Condições comerciais SHALL ser apresentadas como ficha em duas colunas. Nenhuma
das duas seções MUST usar grade de cartões.

#### Scenario: Inspeção das seções

- **WHEN** as seções de serviços e de condições são inspecionadas
- **THEN** não há cartões com borda e fundo próprios em nenhuma das duas
