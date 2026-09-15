## 1. Fase 1 — Correções críticas sobre a base atual

Publicável isoladamente. Não depende de nenhuma fase seguinte.

- [x] 1.1 Corrigir o caminho da imagem `assets/wendell.jpeg` para `assets/Wendell.jpeg` em `index.html:597` e verificar que a imagem carrega no ambiente de produção, sem requisição com falha no painel de rede
- [x] 1.2 Remover a seção de depoimentos fictícios de `index.html:468-494`, incluindo o depoimento atribuído a um cliente real, e verificar que a string `FICTÍCIOS` não ocorre mais no arquivo
- [x] 1.3 Publicar os cinco depoimentos reais transcritos em `docs/05-conteudo.md`, cada um com projeto e data, e verificar que cada texto confere palavra por palavra com a origem
- [x] 1.4 Adicionar link para o perfil público de origem na seção de depoimentos e verificar que o link abre o perfil correto em nova aba
- [x] 1.5 Corrigir as cinco ocorrências de erro ortográfico listadas em `docs/01-auditoria.md` seção 6 e verificar por busca que nenhuma das formas incorretas permanece
- [x] 1.6 Criar o ícone de identificação em formato vetorial e em formato tradicional, declará-los no documento, e verificar que a aba do navegador exibe o ícone da empresa
- [x] 1.7 Criar a imagem de pré-visualização de compartilhamento em 1200x630 e declarar os metadados de compartilhamento, verificando a pré-visualização em um validador e colando o endereço em um aplicativo de mensagem
- [x] 1.8 Remover do versionamento `THE_KRAKEN_DESIGN_SYSTEM_HANDOFF.md`, `server.err` e `server.log`, acrescentar `*.log`, `*.err` e `node_modules/` ao `.gitignore`, e verificar que `git status` fica limpo

## 2. Fase 2 — Estrutura de arquivos e tokens

- [x] 2.1 Criar a árvore de diretórios `css/`, `js/`, `assets/img/`, `assets/icons/` conforme D1 do design e verificar que a estrutura corresponde ao documento
- [x] 2.2 Escrever `css/01-tokens.css` com os tokens de cor, tipografia, espaçamento, raio, elevação, duração e curva, verificando que nenhum token é nomeado por aparência conforme o requisito de nomenclatura por função
- [x] 2.3 Declarar a paleta completa no bloco base de tokens e as redefinições condicionais para os três estados de tema, verificando a página nos três estados sem nenhum elemento herdando cor do tema oposto
- [x] 2.4 Medir o contraste de cada par de texto e superfície nos dois temas e verificar que texto normal atinge 4,5:1 e texto grande atinge 3:1
- [x] 2.5 Escrever `css/02-base.css` com reset, elementos nativos e escala tipográfica, verificando que nenhuma regra declara valor literal fora dos tokens
- [x] 2.6 Escrever `css/03-layout.css` com container, grid de seção, barra de navegação e rodapé, verificando que o gutter lateral mínimo de 16px se mantém em larguras de 320px a 1440px
- [x] 2.7 Escrever `css/04-components.css` com botão, card, campo, etiqueta e acordeão, verificando que cada variante é substituível pela base sem alterar o contexto ao redor
- [x] 2.8 Verificar que nenhuma camada referencia seletor definido em camada superior, conforme a regra de dependência de D1
- [x] 2.9 Criar `package.json` com o script de concatenação e minificação do CSS e verificar que o artefato gerado reproduz a ordem numérica das camadas
- [x] 2.10 Converter `guilherme.png` e `tesoura.png` e as fotos da equipe para formato de compressão moderna, verificando que cada foto de integrante fica em no máximo 40 KB

## 3. Fase 2 — Navegação

- [x] 3.1 Implementar a barra de navegação persistente, visível desde o carregamento e durante toda a rolagem, verificando que não existe condição de rolagem para que ela apareça
- [x] 3.2 Remover a sidebar flutuante e todo o CSS associado, verificando que resta um único conjunto de navegação principal em tela de 1440px
- [x] 3.3 Implementar o controle de abertura de menu para telas estreitas, com rótulo textual, verificando o funcionamento em 320px, 480px e 768px
- [x] 3.4 Implementar comunicação do estado aberto ou fechado do menu a tecnologias assistivas e verificar o anúncio com leitor de tela
- [x] 3.5 Implementar fechamento do menu por tecla de escape com retorno do foco ao controle de abertura, e fechamento ao escolher um destino, verificando ambos apenas por teclado
- [x] 3.6 Implementar `js/nav.js` consumindo exclusivamente atributos de dados conforme D4, verificando que renomear uma classe de apresentação não altera o comportamento
- [x] 3.7 Ajustar o deslocamento de âncora para que a barra não encubra o título da seção de destino, verificando o resultado em cada um dos cinco destinos
- [x] 3.8 Unificar o rótulo da ação principal de contato em todos os pontos de conversão e verificar por inventário que existe um único rótulo

## 4. Fase 2 — Sistema de movimento

- [x] 4.1 Declarar os tokens de duração, curva e escalonamento definidos em D6 e verificar que nenhuma animação usa valor de tempo fora deles
- [x] 4.2 Implementar a sequência de abertura da primeira dobra com escalonamento de 70ms e verificar por medição que a sequência completa termina em até 1200ms
- [x] 4.3 Implementar o momento assinatura do risco sobre as palavras *planilha* e *caderno* no título, verificando que usa apenas transformação e que não se repete em nenhum outro elemento do site
- [x] 4.4 Implementar a revelação por scroll com escalonamento interno de 60ms em `js/motion.js`, verificando que cada elemento revela uma única vez e deixa de ser observado após disparar
- [x] 4.5 Garantir que o estado de repouso de todo conteúdo é visível sem execução de script, verificando a página com JavaScript desabilitado
- [x] 4.6 Implementar as micro-interações de apontamento e foco limitadas a borda, cor e deslocamento de até 2px, verificando que respondem também ao foco de teclado
- [x] 4.7 Auditar todas as animações e verificar que nenhuma anima propriedade que dispare recálculo de layout
- [x] 4.8 Verificar que a página em repouso por 30 segundos não apresenta nenhum elemento em movimento
- [x] 4.9 Implementar o desligamento completo do movimento sob preferência por movimento reduzido e verificar que a página carrega com todo o conteúdo em posição final

## 5. Fase 2 — Remoção e verificação de código morto

- [x] 5.1 Catalogar as correções de estabilidade já existentes no histórico de commits antes da reescrita e registrar quais serão reaplicadas, conforme o risco levantado no design
- [x] 5.2 Remover a seção de vídeo de abertura e os dois arquivos de vídeo, verificando que nenhuma referência a eles permanece no repositório
- [x] 5.3 Remover o cursor customizado e a regra que suprime o cursor no documento, verificando que o cursor do sistema funciona com JavaScript desabilitado
- [x] 5.4 Remover os dois elementos de canvas decorativos e todo o código associado, verificando que nenhuma palavra de erro é exibida sobre o conteúdo
- [x] 5.5 Remover as referências a bibliotecas de terceiros e verificar por inventário de rede que nenhuma é carregada
- [x] 5.6 Remover os dez blocos de transição entre seções, o efeito de inclinação em apontamento e o painel decorativo da primeira dobra, verificando por busca que os seletores não ocorrem mais
- [x] 5.7 Substituir os 32 blocos de ícone inline por um sprite referenciado por uso, verificando que os ícones renderizam nos dois temas
- [x] 5.8 Substituir a rotação automática da seção de time por grade fixa, verificando que os quatro integrantes ficam visíveis simultaneamente em 1280px
- [x] 5.9 Verificar que cada seletor de CSS remanescente tem ao menos uma ocorrência correspondente no HTML e que cada função de JavaScript tem ao menos um ponto de chamada
- [x] 5.10 Padronizar o idioma dos identificadores de código conforme D11 e verificar que não restam nomes em português na base de código
- [x] 5.11 Medir o volume final e verificar contra a tabela de D10: CSS próximo de 1.200 linhas, JavaScript próximo de 150 linhas em três módulos, zero bibliotecas

## 6. Portão de performance entre fase 2 e fase 3

- [x] 6.1 Medir o peso total transferido na primeira visita sem cache e verificar que é inferior a 500 KB
- [x] 6.2 Auditar a página em conexão móvel simulada e verificar que a maior renderização de conteúdo ocorre em menos de 2,0 segundos e o deslocamento cumulativo de layout fica abaixo de 0,1
- [x] 6.3 Executar auditoria automatizada e verificar pontuação igual ou superior a 95 em performance e em acessibilidade, em desktop e em móvel

## 7. Fase 3 — Conteúdo institucional

- [x] 7.1 Implementar a primeira dobra com atividade, público e quatro sinais de credibilidade verificáveis, verificando que o texto é legível em conexão lenta sem aguardar mídia
- [x] 7.2 Implementar o case em destaque com desafio, solução e resultado separados, verificando que o campo de resultado exibe marcação de pendência enquanto o número não existir
- [x] 7.3 Implementar a grade com os seis projetos do portfólio verificável, cada um com setor identificado, verificando contra o inventário de `docs/05-conteudo.md`
- [x] 7.4 Implementar em cada projeto a declaração da forma de operação anterior do cliente, verificando que cada afirmação corresponde a fato conhecido do projeto
- [x] 7.5 Implementar a seção de depoimentos com os cinco textos íntegros, projeto, data e caminho de verificação externa, verificando que nenhum texto foi editado
- [ ] 7.6 Reescrever os serviços por problema de negócio resolvido e verificar com uma pessoa sem formação técnica que ela compreende cada um sem conhecer as tecnologias
- [x] 7.7 Mover as tecnologias para posição secundária dentro da seção de serviços, verificando que não ocupam seção própria
- [x] 7.8 Implementar o processo com o entregável declarado em cada etapa, verificando que nenhuma etapa é descrita apenas pelo que a equipe faz
- [ ] 7.9 Implementar a seção de condições comerciais cobrindo contrato, nota fiscal, garantia e treinamento, verificando com o time que cada condição publicada é efetivamente cumprida
- [x] 7.10 Implementar as perguntas frequentes cobrindo os oito temas exigidos pela spec, verificando que cada uma tem resposta ou marcação de pendência
- [x] 7.11 Implementar a seção de time em grade fixa com nome, função e verificação profissional, verificando que as quatro imagens carregam em produção
- [x] 7.12 Implementar o rodapé com identificação fiscal, contato, horário, abrangência e verificação externa, verificando que a identificação fiscal exibe marcação de pendência enquanto o número não for liberado
- [x] 7.13 Revisar ortograficamente todo o texto visível e verificar que nenhuma palavra apresenta erro de acentuação
- [x] 7.14 Inventariar todas as marcações de pendência remanescentes e apresentar a lista ao time para decisão antes da liberação em produção

## 8. Fase 4 — Captação de leads

- [x] 8.1 Implementar a função serverless de contato com validação no servidor e verificar o retorno correto para requisição válida e inválida
- [ ] 8.2 Integrar o provedor de e-mail transacional com a chave em variável de ambiente e verificar que a mensagem chega efetivamente à caixa da equipe
- [x] 8.3 Implementar `js/form.js` com envio assíncrono e verificar que a entrega ocorre com bloqueador de janelas emergentes ativo e em navegador sem o provedor de e-mail presumido
- [x] 8.4 Implementar validação de campo obrigatório e de formato com movimentação de foco para o campo em erro, verificando cada caso de erro individualmente
- [x] 8.5 Implementar estado de processamento no controle de envio com bloqueio de envio duplicado, verificando com acionamentos repetidos em sequência rápida
- [x] 8.6 Implementar comunicação visível de sucesso e de falha, com caminho alternativo de contato na mensagem de falha, verificando o caminho de falha com a rede desconectada
- [x] 8.7 Implementar proteção contra envio automatizado sem esforço adicional ao visitante legítimo e verificar que uma submissão automatizada é descartada
- [x] 8.8 Implementar o registro do contato em destino secundário e verificar que o lead permanece recuperável quando a entrega de e-mail falha
- [x] 8.9 Implementar o campo de segmento de atuação e verificar que a mensagem recebida contém nome, forma de retorno, segmento e descrição do problema

## 9. Fase 4 — Descoberta e acessibilidade

- [x] 9.1 Declarar os dados estruturados de identificação da organização e verificar em validador que não há erros
- [x] 9.2 Declarar o endereço canônico e publicar as diretivas de rastreamento e o mapa do site, verificando que ambos respondem nos endereços convencionais
- [x] 9.3 Declarar dimensões intrínsecas em toda imagem e verificar em conexão lenta que o conteúdo ao redor não se desloca durante o carregamento
- [x] 9.4 Aplicar carregamento diferido em toda mídia fora da primeira dobra e verificar que as imagens inferiores não são transferidas antes da rolagem
- [x] 9.5 Percorrer a página inteira apenas por teclado e verificar que todo elemento interativo é alcançável e apresenta indicador de foco visível
- [x] 9.6 Verificar que nenhum elemento focável está contido em região ocultada de tecnologias assistivas, corrigindo o caso existente hoje na primeira dobra
- [x] 9.7 Verificar que todo alvo clicável apresenta no mínimo 44 por 44 pixels de área sensível

## 10. Publicação

- [ ] 10.1 Testar em navegadores baseados em Chromium, Gecko e WebKit e verificar que o layout e o comportamento se mantêm
- [ ] 10.2 Testar em aparelho físico Android e iPhone e verificar navegação, movimento e envio do formulário
- [x] 10.3 Percorrer a página completa e verificar que nenhum erro é registrado no console
- [ ] 10.4 Verificar que nenhum recurso referenciado retorna erro de não encontrado no ambiente de produção
- [ ] 10.5 Colar o endereço publicado em aplicativo de mensagem e verificar que a pré-visualização exibe título, descrição e imagem
- [x] 10.6 Executar a auditoria automatizada final e verificar que performance e acessibilidade permanecem iguais ou superiores a 95 com o conteúdo completo
- [ ] 10.7 Migrar o repositório para organização própria conforme apontado em `docs/06-arquitetura-tecnica.md` e verificar que a publicação continua funcionando a partir do novo endereço
