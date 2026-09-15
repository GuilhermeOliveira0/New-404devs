## Purpose

Garantir que o site carregue rápido o suficiente para ser lido antes de o visitante
desistir, e que seja encontrável e apresentável quando compartilhado — substituindo a
situação atual de 16,23 MB na primeira visita e de links compartilhados que aparecem
sem título, sem descrição e sem imagem.

## ADDED Requirements

### Requirement: Orçamento de peso da primeira visita

O peso total transferido na primeira visita, sem cache, SHALL ser inferior a 500 KB,
considerando documento, estilos, scripts, fontes e mídia exibida na primeira dobra.

#### Scenario: Medição da primeira visita

- **WHEN** a página é carregada sem cache e o total transferido é medido
- **THEN** o valor é inferior a 500 KB

#### Scenario: Nenhum arquivo de mídia de grande porte

- **WHEN** os recursos carregados são inventariados
- **THEN** nenhum arquivo isolado de vídeo ou imagem ultrapassa 200 KB

### Requirement: Ausência de biblioteca de terceiros em tempo de execução

A página MUST NOT carregar biblioteca de terceiros para animação, carrossel ou
manipulação de interface. O comportamento SHALL ser implementado com recursos nativos
da plataforma web.

#### Scenario: Inventário de scripts carregados

- **WHEN** os scripts carregados pela página são inventariados
- **THEN** nenhum deles é uma biblioteca de terceiros, e o total de script próprio é
  inferior a 10 KB

### Requirement: Métricas de experiência de carregamento

Em conexão móvel simulada de 4G, a maior renderização de conteúdo SHALL ocorrer em menos
de 2,0 segundos, e o deslocamento cumulativo de layout SHALL ser inferior a 0,1.

#### Scenario: Medição em conexão simulada

- **WHEN** a página é auditada em conexão móvel simulada
- **THEN** a maior renderização de conteúdo ocorre em menos de 2,0 segundos e o
  deslocamento cumulativo de layout fica abaixo de 0,1

### Requirement: Dimensões declaradas em toda mídia

Toda imagem SHALL declarar suas dimensões intrínsecas, de modo que o espaço seja
reservado antes do carregamento.

#### Scenario: Carregamento progressivo de imagens

- **WHEN** as imagens carregam progressivamente em conexão lenta
- **THEN** o conteúdo ao redor não se desloca quando cada imagem termina de carregar

### Requirement: Carregamento diferido fora da primeira dobra

Toda mídia que não é exibida na primeira dobra SHALL ser carregada de forma diferida.

#### Scenario: Imagens abaixo da dobra

- **WHEN** a página é carregada e o visitante ainda não rolou
- **THEN** as imagens das seções inferiores ainda não foram transferidas

### Requirement: Formato de imagem otimizado

Toda imagem fotográfica SHALL ser servida em formato de compressão moderna, e MUST NOT
ser servida em formato sem perdas quando o conteúdo é fotográfico.

#### Scenario: Foto de integrante da equipe

- **WHEN** uma foto da equipe é servida
- **THEN** está em formato de compressão moderna e pesa no máximo 40 KB

### Requirement: Identidade visual do site em abas e listas

O site SHALL declarar ícone de identificação em formatos adequados aos contextos em que
é exibido, incluindo aba de navegador e favoritos.

#### Scenario: Aba do navegador

- **WHEN** o site é aberto em uma aba
- **THEN** a aba exibe o ícone da empresa, e não o ícone genérico de documento

### Requirement: Pré-visualização ao compartilhar

Ao ser compartilhado em aplicativo de mensagem ou rede social, o link SHALL gerar
pré-visualização com título, descrição e imagem representativa.

#### Scenario: Compartilhamento em aplicativo de mensagem

- **WHEN** o endereço do site é colado em um aplicativo de mensagem
- **THEN** aparece pré-visualização com título, descrição e imagem, em vez do endereço cru

### Requirement: Dados estruturados de identificação da empresa

O site SHALL declarar dados estruturados que identifiquem a organização, sua área de
atuação e suas formas de contato, em formato reconhecido por mecanismos de busca.

#### Scenario: Validação dos dados estruturados

- **WHEN** a página é submetida a validador de dados estruturados
- **THEN** a organização é reconhecida como prestadora de serviço profissional, sem erros
  de validação

### Requirement: Diretivas de indexação e mapa do site

O site SHALL publicar diretivas de rastreamento e mapa do site em seus endereços
convencionais, e SHALL declarar seu endereço canônico.

#### Scenario: Requisição das diretivas de rastreamento

- **WHEN** um rastreador requisita o arquivo de diretivas no endereço convencional
- **THEN** o arquivo é servido e aponta para o mapa do site

### Requirement: Conformidade de acessibilidade verificada

A página SHALL alcançar pontuação mínima de 95 em auditoria automatizada de
acessibilidade e de performance, em versão desktop e móvel.

#### Scenario: Auditoria antes da publicação

- **WHEN** a página é auditada por ferramenta automatizada antes da publicação
- **THEN** as pontuações de performance e de acessibilidade são iguais ou superiores a 95

### Requirement: Ausência de erro em console

A página MUST NOT registrar erro no console do navegador em carregamento e uso normais.

#### Scenario: Percurso completo da página

- **WHEN** o visitante percorre a página inteira, abre o menu, expande perguntas
  frequentes e envia o formulário
- **THEN** nenhum erro é registrado no console

### Requirement: Integridade de recursos em produção

Todo recurso referenciado pela página SHALL ser resolvível no ambiente de produção,
incluindo sistemas de arquivos sensíveis a maiúsculas e minúsculas.

#### Scenario: Verificação de recursos após publicação

- **WHEN** a página publicada é verificada quanto a requisições com falha
- **THEN** nenhum recurso referenciado retorna erro de não encontrado
