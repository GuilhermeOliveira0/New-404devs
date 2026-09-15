## Purpose

Oferecer o site em português brasileiro e em inglês a partir de uma única fonte de
conteúdo, de modo que as duas versões sejam indexáveis, alcancem o visitante sem flash
de idioma e nunca divirjam silenciosamente uma da outra.

## ADDED Requirements

### Requirement: Fonte única de conteúdo para todos os idiomas

Todo texto visível SHALL viver em um arquivo de conteúdo por idioma, aplicado a um único
template. MUST NOT existir texto visível escrito diretamente no template.

#### Scenario: Chave ausente em um idioma

- **WHEN** o arquivo de conteúdo de um idioma não possui uma chave usada pelo template
- **THEN** a geração falha antes de publicar, nomeando a chave e o idioma

#### Scenario: Chave sem uso

- **WHEN** um arquivo de conteúdo possui uma chave que o template não usa
- **THEN** a geração emite aviso nomeando a chave, para que tradução morta seja removida

### Requirement: Cada idioma tem endereço, língua e metadados próprios

A versão em português SHALL ser servida na raiz e a versão em inglês em `/en/`. Cada
versão SHALL declarar o atributo de língua do documento, o endereço canônico, o
`og:locale` e os `hreflang` alternativos apontando para a outra versão e para o padrão.

#### Scenario: Página em inglês

- **WHEN** o visitante abre `/en/`
- **THEN** o documento declara língua inglesa, canônico apontando para `/en/`, e
  alternativas `hreflang` para `pt-BR`, `en` e `x-default`

### Requirement: Alternância por navegação para a página gêmea

O controle de idioma SHALL ser um link para a mesma página no outro idioma. MUST NOT
haver troca de texto em tempo de execução nem redirecionamento automático por idioma
do navegador.

#### Scenario: Visitante troca de idioma

- **WHEN** o visitante aciona o controle de idioma
- **THEN** a página gêmea é carregada já no idioma escolhido, sem estado intermediário
  em que os dois idiomas ou nenhum apareça

### Requirement: Recursos resolvem em qualquer profundidade de URL

Todo recurso referenciado pelo template SHALL usar caminho a partir da raiz do site, para
que `/en/index.html` carregue os mesmos arquivos que `/index.html`.

#### Scenario: Caminho relativo no template

- **WHEN** o template contém um caminho relativo que quebraria dentro de `/en/`
- **THEN** a geração falha nomeando o caminho

### Requirement: Depoimentos preservam o original

Na versão em inglês, cada depoimento SHALL exibir o texto original em português, na
íntegra, seguido de tradução identificada como tal. A tradução MUST NOT substituir o
original.

#### Scenario: Depoimento na versão em inglês

- **WHEN** um depoimento é renderizado em `/en/`
- **THEN** o texto em português aparece completo e a tradução em inglês aparece abaixo,
  marcada como tradução

### Requirement: Marcações de pendência são traduzidas, não preenchidas

Toda marcação de informação pendente SHALL aparecer traduzida na versão em inglês, com o
mesmo significado e o mesmo tratamento visual, e MUST NOT ser substituída por valor.

#### Scenario: Pendência em inglês

- **WHEN** a versão em inglês é gerada
- **THEN** o número de marcações de pendência é igual ao da versão em português

### Requirement: Textos de acessibilidade acompanham o idioma

Rótulos de controles, textos alternativos e anúncios para tecnologia assistiva SHALL
estar no idioma da página.

#### Scenario: Leitor de tela na versão em inglês

- **WHEN** um leitor de tela percorre `/en/`
- **THEN** rótulos de botões, alternativas de imagem e mensagens de estado são lidos em
  inglês
