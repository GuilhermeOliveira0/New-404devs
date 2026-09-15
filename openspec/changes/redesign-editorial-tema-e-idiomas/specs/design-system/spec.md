## ADDED Requirements

### Requirement: Controle explícito de tema

O visitante SHALL poder alternar entre tema claro e escuro por um controle visível. A
escolha SHALL ser persistida e aplicada antes da primeira pintura nas visitas seguintes.
Sem escolha explícita, vale a preferência do sistema.

#### Scenario: Escolha persistida

- **WHEN** o visitante escolhe um tema e recarrega a página
- **THEN** a página é pintada já no tema escolhido, sem passar pelo outro

#### Scenario: Armazenamento indisponível

- **WHEN** o navegador impede a persistência
- **THEN** a alternância funciona na página atual e a página não registra erro

### Requirement: Transição de tema como gesto único

A troca de tema SHALL ocorrer como uma transição única e curta a partir do ponto do
controle. MUST NOT ser implementada como transição simultânea de cor em todos os
elementos. Sob movimento reduzido ou sem suporte, a troca SHALL ser instantânea.

#### Scenario: Navegador sem suporte à transição

- **WHEN** o navegador não oferece a API de transição de vista
- **THEN** o tema troca instantaneamente, sem erro

### Requirement: Escala tipográfica com contraste editorial

O maior tamanho de texto da primeira dobra SHALL ser no mínimo seis vezes o tamanho do
corpo. Texto secundário SHALL ser diferenciado por opacidade ou peso, não apenas por um
tom de cinza adicional.

#### Scenario: Medição da escala

- **WHEN** o tamanho computado do título da primeira dobra é comparado ao do corpo em
  1280px de largura
- **THEN** a razão é igual ou superior a 6:1

### Requirement: Ausência de rótulo de categoria repetido

MUST NOT existir um rótulo de categoria em caixa alta imediatamente antes do título de
cada seção. Texto pequeno em mono SHALL ser usado apenas como metadado: índice de seção,
hora, disponibilidade, versão, ano.

#### Scenario: Auditoria dos títulos de seção

- **WHEN** cada título de seção é inspecionado
- **THEN** o elemento imediatamente anterior não é um rótulo de categoria em caixa alta

### Requirement: Entrada do título por máscara palavra a palavra

O título da primeira dobra SHALL entrar palavra a palavra por máscara, em ordem de leitura,
com a sequência concluída em até 1200ms. Elementos internos de destaque SHALL ser tratados
como uma única palavra. Sem script ou sob movimento reduzido, o título SHALL estar íntegro.

#### Scenario: Título com destaque interno

- **WHEN** o título contém um trecho marcado com o traço de risco
- **THEN** o trecho entra como uma unidade, sem ser fatiado

### Requirement: Réguas que se desenham na entrada

Réguas horizontais estruturais SHALL entrar da esquerda para a direita, em cascata, ao
chegar na viewport, uma única vez. No estado de repouso e sem script, SHALL estar
completas.

#### Scenario: Lista de projetos entra na viewport

- **WHEN** a lista de projetos cruza a viewport pela primeira vez
- **THEN** as réguas entre as linhas se desenham em cascata e permanecem
