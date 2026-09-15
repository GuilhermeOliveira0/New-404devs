## Purpose

Garantir que todo contato iniciado pelo visitante chegue à equipe e seja registrado,
eliminando a situação atual em que o formulário depende da abertura de uma janela
externa de e-mail e o contato se perde em silêncio quando isso falha.

## ADDED Requirements

### Requirement: Envio de contato não depende do cliente de e-mail do visitante

O envio do formulário SHALL ocorrer independentemente de qual cliente de e-mail o
visitante utiliza e de qualquer bloqueio de janelas emergentes. MUST NOT existir
dependência de abertura de aplicação externa para que a mensagem seja entregue.

#### Scenario: Visitante sem conta no provedor presumido

- **WHEN** um visitante que não usa o provedor de e-mail presumido pelo site preenche e
  envia o formulário
- **THEN** a mensagem é entregue à equipe normalmente

#### Scenario: Bloqueador de janelas emergentes ativo

- **WHEN** o visitante tem bloqueio de janelas emergentes ativado e envia o formulário
- **THEN** a mensagem é entregue e o visitante recebe confirmação na própria página

### Requirement: Confirmação ou falha sempre comunicada ao visitante

Após o envio, o site SHALL comunicar de forma visível se a mensagem foi entregue ou se
houve falha. O visitante MUST NOT ficar sem retorno.

#### Scenario: Envio bem-sucedido

- **WHEN** a mensagem é entregue com sucesso
- **THEN** o visitante vê confirmação explícita na página e a promessa de prazo de resposta

#### Scenario: Falha no envio

- **WHEN** o envio falha por indisponibilidade ou erro de rede
- **THEN** o visitante vê mensagem de erro que explica o ocorrido e oferece um caminho
  alternativo de contato imediato

### Requirement: Estado de processamento durante o envio

Enquanto o envio está em andamento, o controle de envio SHALL indicar processamento e
SHALL impedir envios duplicados.

#### Scenario: Acionamento repetido

- **WHEN** o visitante aciona o envio mais de uma vez em sequência rápida
- **THEN** apenas uma mensagem é enviada, e o controle indica que o processamento está
  em curso

### Requirement: Validação antes do envio com orientação de correção

O formulário SHALL validar os campos obrigatórios antes do envio e SHALL informar
exatamente qual campo precisa de correção e por quê, movendo o foco para ele.

#### Scenario: Campo obrigatório vazio

- **WHEN** o visitante tenta enviar sem preencher o campo de contato
- **THEN** o envio não ocorre, a mensagem indica qual campo falta e o foco vai para esse
  campo

#### Scenario: Formato de contato inválido

- **WHEN** o visitante informa um endereço de e-mail em formato inválido
- **THEN** o envio não ocorre e a mensagem explica o que se espera do campo

### Requirement: Proteção contra envio automatizado

O formulário SHALL incorporar proteção contra envio automatizado que não imponha
esforço adicional ao visitante legítimo.

#### Scenario: Envio automatizado

- **WHEN** um agente automatizado preenche todos os campos do formulário e envia
- **THEN** a submissão é descartada sem alcançar a caixa de entrada da equipe

#### Scenario: Visitante legítimo

- **WHEN** uma pessoa preenche e envia o formulário normalmente
- **THEN** nenhum desafio adicional, teste de verificação ou etapa extra é exigido

### Requirement: Registro do contato além do e-mail

Todo contato recebido SHALL ser registrado em local que não dependa exclusivamente da
entrega do e-mail, de modo que uma falha de entrega não resulte em perda do contato.

#### Scenario: Falha na entrega do e-mail

- **WHEN** o provedor de e-mail falha na entrega de uma mensagem enviada pelo formulário
- **THEN** o contato permanece recuperável no registro alternativo

### Requirement: Caminho de contato direto sempre disponível

O site SHALL oferecer, em paralelo ao formulário, um caminho de contato direto e
imediato, disponível em todas as larguras de tela.

#### Scenario: Visitante que prefere contato imediato

- **WHEN** o visitante prefere falar diretamente em vez de preencher formulário
- **THEN** encontra caminho de contato direto tanto na navegação quanto na seção de contato

### Requirement: Ação principal única e consistente

O site SHALL adotar uma única ação principal de conversão, com rótulo idêntico em todos
os pontos em que aparece. MUST NOT haver múltiplos rótulos concorrentes para a mesma ação.

#### Scenario: Contagem de rótulos

- **WHEN** todos os pontos de conversão da página são inventariados
- **THEN** a ação principal aparece sempre com o mesmo rótulo, em vez dos sete rótulos
  distintos existentes hoje

### Requirement: Campos coerentes com a qualificação do contato

O formulário SHALL solicitar apenas informações que a equipe efetivamente usa para
qualificar e responder o contato, incluindo o segmento de atuação do visitante.

#### Scenario: Contato recebido com contexto

- **WHEN** a equipe recebe um contato enviado pelo formulário
- **THEN** a mensagem contém nome, forma de retorno, segmento de atuação e a descrição
  do problema a resolver
