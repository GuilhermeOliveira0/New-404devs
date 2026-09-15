# 03 — Estrutura nova da página

> Proposta de arquitetura. Nada implementado ainda.
> Baseada na auditoria (doc 01) e no benchmark (doc 02).

---

## O posicionamento que estava escondido no portfólio

Antes da estrutura, uma observação que muda a copy inteira.

Olhando os seis projetos reais entregues:

| Projeto | O que o cliente usava antes |
|---|---|
| GranjaTech | caderno e planilha para controle de lote e produção |
| BarberFlow | agenda de papel, WhatsApp para marcar horário |
| AgroNutri | planilha para calcular ração |
| HotelOS | caderno/planilha para reserva e faturamento |
| Controle-Imóveis | planilha para cobrança e valores de imposto |
| Fábrica de polpas | planilha para vendas e estoque |

**Existe um padrão: a 404Devs é a empresa que tira a operação da planilha e do papel
e coloca num sistema de verdade.** Isso não aparece em nenhum lugar do site atual,
que fala de "soluções digitais sob medida" — frase que 10 mil empresas usam.

O site hoje se vende por *stack*: "C#/.NET, Node.js, React e bancos SQL e NoSQL".
O dono da granja não sabe o que é .NET e não deveria precisar saber. Ele sabe que
perde dinheiro porque o controle de lote está num caderno.

**Recomendação:** adotar esse ângulo como posicionamento principal. É verdadeiro,
é específico, é comprovável pelo portfólio, e nenhum concorrente da faixa usa.

---

## Navegação

**Uma navbar fixa, sempre visível, do primeiro pixel ao último.** Morre a sidebar
flutuante e morre o header escondido.

```
┌──────────────────────────────────────────────────────────────────────┐
│  [404DEVS]     Projetos  Serviços  Processo  Time  FAQ   [WhatsApp]  │
└──────────────────────────────────────────────────────────────────────┘
```

| Decisão | Motivo |
|---|---|
| 5 itens de menu | Benchmark: 3–5 itens. Hoje temos 11 links em duas navegações duplicadas. |
| Sempre visível desde o topo | Hoje o header fica invisível até passar o vídeo — `script.js:52` |
| Altura 56–64px desktop, 56px mobile | Mínimo de 44px para toque confortável |
| Um único CTA, sempre o mesmo texto | Hoje existem 7 textos de CTA diferentes |
| Hamburger rotulado **"Menu"** no mobile | Ícone sozinho tem taxa de uso menor |
| Fundo sólido/blur ao rolar | Legibilidade sobre conteúdo claro |

**Mobile (< 900px):**

```
┌────────────────────────────────┐
│  [404DEVS]        [☰ Menu]     │
└────────────────────────────────┘
   ↓ abre painel deslizante
┌────────────────────────────────┐
│  Projetos                      │
│  Serviços                      │
│  Processo                      │
│  Time                          │
│  FAQ                           │
│  ─────────────────────────     │
│  [ Falar no WhatsApp ]         │
│  404devsoficial@gmail.com      │
└────────────────────────────────┘
```

---

## A página, seção por seção

De 12 seções para **9 + rodapé**. Cada uma com uma função declarada.

```
  NAVBAR (fixa)
  ─────────────────────────────────
  1  HERO + faixa de credibilidade
  2  PROJETOS                        ← o coração da página
  3  DEPOIMENTOS REAIS
  4  SERVIÇOS + strip de tecnologias
  5  COMO TRABALHAMOS
  6  O QUE ESTÁ INCLUSO
  7  TIME
  8  FAQ
  9  CTA FINAL + FORMULÁRIO
  ─────────────────────────────────
  RODAPÉ
```

---

### 1 · HERO

**Objetivo:** em 5 segundos o visitante entende o que fazemos, para quem, e que dá para confiar.
**Substitui:** seção de vídeo de intro + hero atual + "intro strip".

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   DESENVOLVIMENTO SOB MEDIDA                                 │
│                                                              │
│   Tiramos a sua operação da                                  │
│   planilha e do caderno.                                     │
│                                                              │
│   Somos quatro desenvolvedores. Construímos sistemas de      │
│   gestão, sites e aplicativos para empresas que precisam     │
│   organizar o que hoje está no papel, no WhatsApp e no Excel.│
│                                                              │
│   [ Falar no WhatsApp ]   [ Ver projetos entregues ]         │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  CNPJ ativo, com NF  ·  4 devs  ·  6 sistemas entregues      │
│  em 2026  ·  Perfil verificado no 99Freelas ↗                │
└──────────────────────────────────────────────────────────────┘
```

**Decisões:**
- **Sem vídeo.** Economiza 15 MB e ~20 segundos. Detalhe no doc 01, seção 2.
- **Sem o "404 / DEVS" gigante decorativo.** O logo na navbar já diz o nome.
  O espaço nobre da primeira tela vai para a proposta de valor.
- **Dois botões, hierarquia clara:** primário sólido, secundário contornado.
- **A faixa de credibilidade é a parte mais importante da seção.** É o que a pesquisa
  diz que o comprador procura e é o que hoje não existe em lugar nenhum do site.
- **"CNPJ ativo, com NF" vem primeiro** na faixa. Para o dono de clínica ou de granja
  que precisa lançar a despesa na contabilidade, isso às vezes decide mais que o portfólio.

**Alternativa de headline** (se acharem o ângulo da planilha estreito demais):
*"Sistemas, sites e aplicativos sob medida para pequenas e médias empresas."*
É mais seguro e mais genérico. A recomendação continua sendo o ângulo da planilha —
é o que diferencia.

---

### 2 · PROJETOS ← a seção mais importante

**Objetivo:** provar que entregamos. É o conteúdo que mais converte em serviço profissional.
**Substitui:** a seção BarberFlow isolada.
**Hoje:** 1 projeto exibido de 6 entregues.

**Estrutura em duas camadas:**

**(a) Um case em destaque**, formato Desafio → Solução → Resultado:

```
┌──────────────────────────────────────────────────────────────┐
│  CASE EM DESTAQUE                              [avicultura]  │
│                                                              │
│  GranjaTech                                                  │
│  Gestão e monitoramento para granja                          │
│                                                              │
│  ┌─ O DESAFIO ──────────────────────────────────────────┐    │
│  │ Controle de lote, insumo e produção em caderno e     │    │
│  │ planilha, sem leitura de sensor em tempo real.       │    │
│  └──────────────────────────────────────────────────────┘    │
│  ┌─ O QUE CONSTRUÍMOS ──────────────────────────────────┐    │
│  │ Plataforma de automação com controle de produção,    │    │
│  │ monitoramento de sensores em tempo real e gestão     │    │
│  │ de lotes e insumos.                                  │    │
│  └──────────────────────────────────────────────────────┘    │
│  ┌─ O RESULTADO ────────────────────────────────────────┐    │
│  │ [PREENCHER — ver doc 05, seção "pendências"]         │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  C# (.NET Core) · React · PostgreSQL · Docker · Azure CI/CD  │
└──────────────────────────────────────────────────────────────┘
```

**(b) Grade com os outros cinco**, cards compactos:

```
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│ [barbearia]    │ │ [nutrição]     │ │ [hotelaria]    │
│ BarberFlow     │ │ AgroNutri      │ │ HotelOS        │
│ Agenda online  │ │ Cálculo de     │ │ PMS: reserva,  │
│ e gestão da    │ │ ração e        │ │ faturamento e  │
│ barbearia      │ │ formulação     │ │ operação       │
│ Ver site ↗     │ │ de dieta       │ │                │
└────────────────┘ └────────────────┘ └────────────────┘
┌────────────────┐ ┌────────────────┐
│ [imobiliário]  │ │ [indústria]    │
│ Controle-      │ │ Sistema de     │
│ Imóveis        │ │ vendas e       │
│ Cobrança e     │ │ estoque para   │
│ valores de     │ │ fábrica de     │
│ imposto        │ │ polpas         │
└────────────────┘ └────────────────┘
```

**Decisões:**
- **Etiqueta de setor em cada card.** Comunica amplitude sem precisar de logo famoso.
  O visitante do ramo de hotelaria vê "hotelaria" e se reconhece.
- **Substitui os logos de cliente** que não temos. É a nossa versão honesta do
  "client logo strip" que thoughtbot e lickability usam.
- **Sem mockup 3D girando.** Print real do sistema, ou card tipográfico limpo se
  não houver print liberado pelo cliente.
- **Pendência:** precisamos de pelo menos um resultado numérico. Ver doc 05.

---

### 3 · DEPOIMENTOS REAIS

**Objetivo:** prova social verificável.
**Substitui:** a seção `DEPOIMENTOS FICTÍCIOS` (`index.html:471`).

Cinco depoimentos reais nota 5,0, na íntegra, cada um com o nome do projeto avaliado.
Texto completo no doc 05.

```
┌──────────────────────────────────────────────────────────────┐
│  O QUE OS CLIENTES DIZEM                                     │
│  Avaliações reais, publicadas no nosso perfil do 99Freelas.  │
│                                                              │
│  ┌──────────────────────────┐  ┌──────────────────────────┐  │
│  │ ★★★★★                    │  │ ★★★★★                    │  │
│  │ "Acompanhar a construção │  │ "O visual é limpo (...)  │  │
│  │ de perto me deu total    │  │ O site abre rápido no    │  │
│  │ confiança no que estava  │  │ celular e no computador  │  │
│  │ sendo entregue."         │  │ (...) Um investimento    │  │
│  │                          │  │ que valeu muito a pena!" │  │
│  │ Dashboard de estudos     │  │ Landing page para        │  │
│  │ e metas · mar/2026       │  │ pequenos negócios        │  │
│  └──────────────────────────┘  └──────────────────────────┘  │
│                                                              │
│       [ Ver todas as avaliações no 99Freelas ↗ ]             │
└──────────────────────────────────────────────────────────────┘
```

**Decisões:**
- **Citar verbatim.** Não editar, não melhorar, não resumir. O valor está em ser real.
- **Link para o perfil verificado.** Transforma "confia em mim" em "confere você mesmo".
- **Não estampar a nota média "4,4★".** Não por esconder nada — o link vai para o
  perfil completo e qualquer um vê. É que 4,4 é menos persuasivo que cinco depoimentos
  nota 5,0 lidos na íntegra. A prova está no texto, não no número.
  ⚠️ Contexto que o time precisa saber: existe uma avaliação 1.4 de maio/2026 puxando
  a média. Detalhe e recomendação no doc 05.

---

### 4 · SERVIÇOS

**Objetivo:** traduzir capacidade técnica em problema de negócio.
**Substitui:** seção Serviços atual + seção Tecnologias (que vira um strip no fim).

Reescrita em linguagem de resultado. Comparação:

| Hoje | Proposta |
|---|---|
| "Sistemas Web e Landing Pages — Criamos interfaces responsivas em React, HTML5 e CSS3" | **Sistema de gestão sob medida** — Para quem controla a operação em planilha, caderno ou WhatsApp e já passou do ponto |
| "Back-end, APIs e Integrações — Desenvolvemos APIs e serviços com C#/.NET e Node.js" | **Site e landing page que vende** — Página rápida, clara e feita para o cliente fechar negócio, não para ganhar prêmio |
| "Consultoria Técnica e Suporte — Atuamos no levantamento de requisitos" | **Integração e automação** — Conectar sistemas que não conversam e automatizar o trabalho manual repetitivo |
| — | **Manutenção e evolução** — Suporte contínuo depois da entrega, com quem construiu o sistema |

A stack vira um **strip discreto no fim da seção**, não uma seção própria:

```
Trabalhamos com:  C# / .NET  ·  Node.js / TypeScript  ·  React / React Native
                  PostgreSQL · MySQL · MongoDB · Supabase  ·  Docker · Azure
```

**Motivo:** o cliente não compra stack, mas quem tem sócio técnico ou vai consultar
um sobrinho que programa quer ver. Fica disponível, sem ocupar seção inteira.

---

### 5 · COMO TRABALHAMOS

**Objetivo:** reduzir o medo do "paguei e sumiram".
**Substitui:** seção Processo — **a melhor seção do site atual.** Mantida, enriquecida.

As quatro etapas continuam. O que muda: cada uma passa a dizer **o que o cliente
recebe** e **quanto tempo leva**.

| # | Etapa | Entregável para o cliente | Prazo típico |
|---|---|---|---|
| 01 | Levantamento e alinhamento | Documento de escopo com funcionalidades, prazo e valor fechado | *a definir* |
| 02 | Arquitetura e desenvolvimento | Amostras do projeto em andamento, para acompanhar de perto | *a definir* |
| 03 | Validação e publicação | Sistema no ar + treinamento de uso | *a definir* |
| 04 | Acompanhamento e suporte | Canal direto para correção e evolução | contínuo |

**Por que isso importa:** o depoimento real de março/2026 diz exatamente isso —
*"o ponto alto para mim foi ter tido essa visão de bastidores durante as etapas (...)
acompanhar a construção de perto me deu total confiança"*. O cliente está nos dizendo
qual é o nosso diferencial. Esta seção é onde ele vira argumento de venda.

---

### 6 · O QUE ESTÁ INCLUSO

**Objetivo:** matar as quatro objeções que a pesquisa aponta como decisivas no Brasil.
**Substitui:** seção "Por que escolher a 404Devs" — hoje três cards genéricos
("Comunicação Sem Ruído", "Arquitetura Escalável", "Suporte Operacional").
**Esta seção não existe hoje e é a maior oportunidade da página.**

```
┌──────────────────────────────────────────────────────────────┐
│  ┌──────────────────┐  ┌──────────────────┐                  │
│  │ 📄 Contrato      │  │ 🧾 Nota fiscal   │                  │
│  │ Escopo, prazo e  │  │ CNPJ ativo.      │                  │
│  │ valor por        │  │ Emitimos NF em   │                  │
│  │ escrito, antes   │  │ todo projeto.    │                  │
│  │ de começar.      │  │                  │                  │
│  └──────────────────┘  └──────────────────┘                  │
│  ┌──────────────────┐  ┌──────────────────┐                  │
│  │ 🛡️ Garantia      │  │ 🎓 Treinamento   │                  │
│  │ Correção de      │  │ Ensinamos sua    │                  │
│  │ defeito sem      │  │ equipe a usar o  │                  │
│  │ custo por [X]    │  │ sistema na       │                  │
│  │ dias.            │  │ entrega.         │                  │
│  └──────────────────┘  └──────────────────┘                  │
└──────────────────────────────────────────────────────────────┘
```

**⚠️ Só publicar o que o time realmente vai cumprir.** Esta seção é uma promessa
contratual. Prometer garantia de 90 dias e não honrar é pior que não ter a seção.
Ver doc 05 para a lista de decisões que precisam de resposta do time.

---

### 7 · TIME

**Objetivo:** rosto significa responsabilidade.
**Mantido** — é um dos pontos fortes do site atual.

O que muda:
- **Sai o carrossel Swiper** (biblioteca de ~140 KB, autoplay que rouba atenção,
  esconde 3 dos 4 sócios a qualquer momento). Entra uma **grade fixa de 4 cards**.
  Somos quatro. Cabem os quatro na tela.
- Corrigir o caminho `assets/wendell.jpeg` → `assets/Wendell.jpeg` (`index.html:597`).
- Adicionar uma linha de contexto por pessoa, além do cargo. Exemplo:
  *"Wendell Nascimento — Back-end e cibersegurança"* → acrescentar em que projetos atuou.
- Manter LinkedIn e GitHub de cada um. É verificação gratuita.

---

### 8 · FAQ

**Objetivo:** responder a objeção antes que ela vire silêncio.
**Seção nova.** É o que a lickability faz e é onde declaram preço abertamente.

Perguntas propostas:

1. **Quanto custa um projeto?** — faixa de valor por tipo de projeto
2. **Quanto tempo leva?** — prazo típico por tipo
3. **Vocês emitem nota fiscal?** — sim, CNPJ ativo
4. **Trabalham com contrato?** — sim, escopo e prazo por escrito
5. **E depois que entrega? Tem suporte?** — política de garantia e manutenção
6. **Atendem fora da região?** — remoto, todo o Brasil
7. **O sistema fica com quem? De quem é o código?** — *pergunta que todo cliente
   pensa e ninguém faz. Responder ganha muito ponto.*
8. **Como funciona o pagamento?** — parcelamento, entrada, marcos

**Decisão necessária:** declarar faixa de preço ou não.
**Recomendação: declarar.** O benchmark mostra que transparência substitui reputação
de marca quando não se tem marca. Além disso filtra lead sem orçamento antes de
consumir tempo de call. Se o time não quiser cravar número, usar "a partir de R$ X"
por categoria.

---

### 9 · CTA FINAL + FORMULÁRIO

**Objetivo:** converter. Sem perder lead no caminho.
**Substitui:** seção "Agendar call" + seção "Contato" (hoje são duas seções separadas
fazendo a mesma coisa).

```
┌──────────────────────────────────────────────────────────────┐
│           Vamos conversar sobre o seu projeto.               │
│      Primeira conversa gratuita. Resposta em até 24h úteis.  │
│                                                              │
│  ┌─────────────────────┐  ┌──────────────────────────────┐   │
│  │ Prefere conversar   │  │  Nome                        │   │
│  │ agora?              │  │  [____________________]      │   │
│  │                     │  │  E-mail ou WhatsApp          │   │
│  │ [Falar no WhatsApp] │  │  [____________________]      │   │
│  │                     │  │  Qual o seu segmento?        │   │
│  │ 404devsoficial@     │  │  [____________________]      │   │
│  │ gmail.com           │  │  O que você precisa resolver?│   │
│  │                     │  │  [____________________]      │   │
│  │ Atendemos todo o    │  │                              │   │
│  │ Brasil, remoto.     │  │  [    Enviar mensagem    ]   │   │
│  └─────────────────────┘  └──────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

**Correção crítica:** o formulário atual (`script.js:1025`) abre o Gmail via
`window.open`. Quem usa Outlook fica sem saída e bloqueador de popup mata o envio
em silêncio — **não recebemos o lead e não sabemos que ele existiu.**

Substituir por envio real. Opções no doc 06.

---

### RODAPÉ

Deixa de ser decoração e vira ativo de confiança:

```
┌──────────────────────────────────────────────────────────────┐
│  404DEVS                        CONTATO                      │
│  Sistemas, sites e aplicativos  WhatsApp: (17) 99614-2053    │
│  sob medida.                    404devsoficial@gmail.com     │
│                                 Seg–Sex, 9h–18h              │
│  CNPJ 00.000.000/0001-00                                     │
│  Atendimento remoto,            PÁGINAS                      │
│  todo o Brasil.                 Projetos · Serviços ·        │
│                                 Processo · Time · FAQ        │
│  [Instagram] [TikTok]                                        │
│  [99Freelas ↗] [GitHub]         © 2026 404Devs               │
└──────────────────────────────────────────────────────────────┘
```

Adições: CNPJ visível, horário de atendimento, link para o 99Freelas, GitHub da empresa.
Cada um é um sinal de legitimidade de custo zero.

---

## O que sai da página

| Item | Motivo |
|---|---|
| Seção de vídeo de intro | 15 MB, ~20s de tela preta, entrega só "Scroll para entrar" |
| Sidebar flutuante | Duplica a navbar; some abaixo de 720px |
| Cursor customizado | Se o JS falhar, o usuário fica sem cursor |
| Canvas de partículas "BUG / FAIL / ERRO / 404" | Escreve "erro" na frente de quem vai contratar |
| Canvas de chuva de código Matrix | Ruído visual sobre o conteúdo que vende |
| Depoimentos fictícios | Destrói exatamente a confiança que a página existe para construir |
| Carrossel Swiper do time | 140 KB para esconder 3 dos 4 sócios |
| Painel "404Devs Operational Interface" | Decoração que ocupa metade do hero sem dizer nada ao cliente |
| 10 blocos `.section-transition` | Ruído entre seções |
| Tilt 3D em hover nos cards | Micro-interação que não ajuda a decidir |
| `THE_KRAKEN_DESIGN_SYSTEM_HANDOFF.md`, `server.err`, `server.log` | Lixo versionado de outro projeto |

## O que entra

| Item | Motivo |
|---|---|
| Navbar fixa + hamburger mobile | Hoje não há navegação nenhuma abaixo de 720px |
| Seção Projetos com os 6 cases reais | O conteúdo que mais converte, hoje 80% escondido |
| Depoimentos reais com link verificável | Prova social que já existe e não é usada |
| Seção "O que está incluso" | Responde as objeções que a pesquisa aponta como decisivas no Brasil |
| FAQ com preço, prazo e garantia | Transparência substitui reputação de marca |
| Favicon + Open Graph + schema.org | Link compartilhável e indexável |
| Formulário que envia de verdade | Hoje perdemos lead em silêncio |
| CNPJ e NF comunicados | Diferencial competitivo de custo zero |
