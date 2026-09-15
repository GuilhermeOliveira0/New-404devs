## Purpose

Definir o que o site apresenta ao visitante e em que ordem, de modo que a prova venha
antes da promessa, e estabelecer a regra de veracidade que impede a repetição do
problema atual, em que a página exibe depoimentos declaradamente fictícios enquanto
esconde avaliações reais e projetos entregues.

## Requirements

### Requirement: Veracidade de toda afirmação publicada

Todo depoimento, número, resultado, credencial e nome de cliente publicado no site
SHALL corresponder a fato verificável. Conteúdo fictício, ilustrativo ou hipotético
MUST NOT ser publicado, ainda que rotulado como tal.

#### Scenario: Depoimento sem origem verificável

- **WHEN** um depoimento é proposto para publicação sem avaliação real correspondente
- **THEN** ele não é publicado, independentemente de qualquer rótulo que o identifique
  como exemplo

#### Scenario: Nome de cliente em depoimento

- **WHEN** um depoimento é atribuído a um cliente nomeado
- **THEN** existe autorização do cliente e o texto corresponde ao que ele efetivamente
  escreveu

### Requirement: Informação pendente marcada, nunca inventada

Quando uma informação comercial ainda não foi decidida — faixa de preço, prazo de
garantia, prazo típico, número de CNPJ, resultado numérico de case — o site SHALL exibir
marcação explícita de pendência no lugar do valor. Valor estimado, aproximado ou
provisório MUST NOT ser publicado como se fosse definitivo.

#### Scenario: Prazo de garantia ainda não definido

- **WHEN** a seção de garantias é renderizada antes de o prazo ter sido decidido
- **THEN** o campo exibe marcação visível de pendência, e nenhum número aparece no lugar

#### Scenario: Publicação com pendência aberta

- **WHEN** a versão é preparada para publicação em produção
- **THEN** toda marcação de pendência remanescente é listada explicitamente para decisão
  antes da liberação

### Requirement: Ordem de seções com prova antes de promessa

A página SHALL apresentar evidência de trabalho entregue antes de descrever serviços
oferecidos. A sequência de seções SHALL ser: primeira dobra, projetos, depoimentos,
serviços, processo, o que está incluso, time, perguntas frequentes, contato.

#### Scenario: Ordem verificada

- **WHEN** o visitante percorre a página do topo ao rodapé
- **THEN** encontra a seção de projetos entregues antes da seção de serviços oferecidos

### Requirement: Primeira dobra comunica atividade, público e credibilidade

A primeira dobra SHALL comunicar, sem exigir rolagem, o que a empresa faz, para quem
faz, e ao menos quatro sinais de credibilidade verificáveis. Ela MUST NOT exigir
carregamento de mídia pesada antes de exibir texto legível.

#### Scenario: Primeira dobra em conexão lenta

- **WHEN** a página é aberta em conexão móvel lenta
- **THEN** o texto da primeira dobra é legível sem aguardar carregamento de vídeo ou
  imagem de grande porte

#### Scenario: Sinais de credibilidade presentes

- **WHEN** a primeira dobra é exibida
- **THEN** apresenta a formalização fiscal da empresa, o tamanho da equipe, o volume de
  entregas realizadas e um caminho para verificação externa independente

### Requirement: Seção de projetos com o portfólio real completo

A seção de projetos SHALL apresentar todos os projetos entregues que possuam autorização
de divulgação, e não um subconjunto. Cada projeto SHALL identificar o setor do cliente.

#### Scenario: Portfólio completo exibido

- **WHEN** a seção de projetos é renderizada
- **THEN** apresenta os seis projetos do portfólio verificável, e não apenas um

#### Scenario: Setor identificado

- **WHEN** um visitante de determinado ramo percorre a seção de projetos
- **THEN** consegue identificar o setor de cada projeto sem precisar ler a descrição
  completa

### Requirement: Cada projeto declara a situação anterior do cliente

Cada projeto SHALL declarar como o cliente operava antes da entrega e o que passou a
existir depois. A situação anterior MUST corresponder a fato conhecido do projeto.

#### Scenario: Card de projeto completo

- **WHEN** um card de projeto é exibido
- **THEN** apresenta a forma de operação anterior do cliente e o que foi construído

### Requirement: Case em destaque com desafio, solução e resultado

Ao menos um projeto SHALL ser apresentado em formato ampliado, com desafio, solução e
resultado explicitados separadamente. Enquanto o resultado numérico não existir, o campo
SHALL exibir marcação de pendência.

#### Scenario: Case em destaque sem resultado definido

- **WHEN** o case em destaque é renderizado antes de o resultado numérico ser levantado
- **THEN** desafio e solução aparecem preenchidos, e o resultado exibe marcação de
  pendência em vez de número estimado

### Requirement: Depoimentos citados na íntegra e verificáveis

Os depoimentos SHALL ser reproduzidos integralmente, sem edição, resumo ou correção de
texto. Cada depoimento SHALL identificar o projeto avaliado e a data. A seção SHALL
oferecer caminho para verificação externa de todas as avaliações.

#### Scenario: Depoimento reproduzido

- **WHEN** um depoimento é publicado
- **THEN** o texto corresponde palavra por palavra ao publicado na origem, e informa
  projeto e data

#### Scenario: Verificação independente

- **WHEN** o visitante quer conferir a autenticidade das avaliações
- **THEN** encontra na seção um caminho direto para o perfil público de origem, que
  contém todas as avaliações recebidas, favoráveis ou não

### Requirement: Serviços descritos por problema resolvido

Cada serviço SHALL ser descrito pelo problema de negócio que resolve. Nome de linguagem,
framework ou banco de dados MUST NOT ser o elemento principal da descrição de um serviço.

#### Scenario: Descrição de serviço

- **WHEN** um visitante sem formação técnica lê a descrição de um serviço
- **THEN** compreende que problema aquele serviço resolve, sem precisar conhecer
  nenhuma tecnologia citada

#### Scenario: Stack disponível mas subordinada

- **WHEN** a seção de serviços é exibida
- **THEN** as tecnologias utilizadas estão disponíveis para consulta em posição
  secundária, e não ocupam seção própria

### Requirement: Processo declara entregável por etapa

Cada etapa do processo de trabalho SHALL declarar o que o cliente recebe ao final dela.

#### Scenario: Etapa sem entregável

- **WHEN** uma etapa do processo é descrita apenas pelo que a equipe faz
- **THEN** isso é tratado como incompleto, e a etapa MUST declarar o que o cliente recebe

### Requirement: Condições comerciais explícitas

O site SHALL apresentar seção dedicada às condições de contratação, cobrindo no mínimo
formalização contratual, emissão de nota fiscal, garantia após a entrega e treinamento
de uso. Toda condição publicada MUST ser cumprida na prática.

#### Scenario: Condição publicada e praticada

- **WHEN** uma condição comercial é publicada na seção
- **THEN** ela corresponde a compromisso que a empresa efetivamente honra

### Requirement: Perguntas frequentes cobrem as objeções de decisão

A seção de perguntas frequentes SHALL responder, no mínimo: custo, prazo, emissão de
nota fiscal, existência de contrato, suporte após a entrega, abrangência de atendimento,
titularidade do código entregue e forma de pagamento.

#### Scenario: Objeção de custo

- **WHEN** o visitante procura entender o investimento necessário
- **THEN** encontra resposta na seção de perguntas frequentes, sem precisar iniciar
  contato para obter a informação

### Requirement: Time apresentado integralmente e sem rotação automática

Todos os integrantes da equipe SHALL estar visíveis simultaneamente, com nome, função e
caminho de verificação profissional. A apresentação MUST NOT depender de rotação
automática que oculte parte da equipe.

#### Scenario: Equipe visível de uma vez

- **WHEN** a seção de time é exibida em tela de 1280px
- **THEN** os quatro integrantes estão visíveis ao mesmo tempo

#### Scenario: Imagem de integrante disponível em produção

- **WHEN** a página é publicada em ambiente de produção com sistema de arquivos sensível
  a maiúsculas
- **THEN** todas as imagens da equipe carregam corretamente

### Requirement: Rodapé como registro de legitimidade

O rodapé SHALL apresentar identificação fiscal da empresa, formas de contato, horário
de atendimento, abrangência geográfica e caminhos de verificação externa.

#### Scenario: Verificação da empresa pelo rodapé

- **WHEN** o visitante procura confirmar que existe uma empresa formal por trás do site
- **THEN** encontra no rodapé identificação fiscal, contato e caminho de verificação
  independente

### Requirement: Correção ortográfica do conteúdo publicado

Todo texto visível SHALL estar ortograficamente correto em português brasileiro,
incluindo acentuação.

#### Scenario: Revisão antes da publicação

- **WHEN** o conteúdo é revisado antes da publicação
- **THEN** nenhuma palavra visível apresenta erro de acentuação ou ortografia
