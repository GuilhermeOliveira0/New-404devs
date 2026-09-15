# 01 — Auditoria do site atual

> Data: 14/09/2026 · Base: commit `cc7d8b4`
> Arquivos auditados: `index.html` (783 linhas), `styles.css` (2.676), `script.js` (1.045)

Classificação: 🔴 quebrado em produção · 🟠 custa cliente · 🟡 dívida técnica · ⚪ cosmético

---

## 1. Bugs confirmados

### 🔴 Foto do Wendell retorna 404 em produção
- Arquivo versionado: `assets/Wendell.jpeg` (W maiúsculo)
- Referência no HTML: `assets/wendell.jpeg` — `index.html:597`

Funciona no Windows porque o filesystem ignora maiúsculas. **Na Vercel (Linux) não funciona.**
Um dos quatro sócios aparece com imagem quebrada no carrossel do time.

*Verificar antes de corrigir: abrir o site publicado e confirmar.*

### 🔴 Nenhuma navegação abaixo de 720px

| Regra | Arquivo | Efeito |
|---|---|---|
| `.site-nav { display: none }` | `styles.css:1911` | some o menu do header em telas ≤ 1080px |
| `.floating-sidebar { display: none }` | `styles.css:1928` | some a sidebar em telas ≤ 720px |

Não existe menu hamburger no projeto (verificado por busca em HTML, CSS e JS).
**Entre 0 e 720px o visitante fica sem nenhum link de navegação** — só o botão
"Agendar consultoria". É justamente a faixa do tráfego que vem de Instagram e TikTok,
que estão linkados no rodapé.

### 🟠 O header só aparece depois do vídeo
`script.js:52` mantém `.site-header` com `opacity: 0; visibility: hidden` até o scroll
passar da seção de vídeo. Somado ao peso do vídeo, o visitante passa os primeiros
~20 segundos sem navegação nenhuma, em qualquer resolução.

### 🟡 Vídeo "mobile" é maior que o desktop

| Arquivo | Tamanho |
|---|---|
| `assets/hero_backgroundmobile.mp4` | 15,44 MB |
| `assets/hero-background.mp4` | 14,76 MB |

Está invertido.

### 🟡 A troca de vídeo por `media` provavelmente não funciona
`index.html:92` usa `<source media="(max-width: 720px)">` dentro de `<video>`.
Chrome e Firefox ignoram o atributo `media` em `<source>` de vídeo — ele só é
respeitado dentro de `<picture>`. Na prática o celular baixa o arquivo desktop.

Vale confirmar no DevTools, mas a recomendação do doc 03 remove o vídeo de qualquer forma.

### 🟡 Regex de e-mail com typo
`script.js:995` — `/^[^\s@]+@[^^\s@]+\.[^\s@]+$/`
A classe `[^^\s@]` tem dois `^`. Funciona por acidente para e-mails comuns, mas está errada.

### 🟠 `cursor: none` no `<body>` inteiro
`styles.css:49`. Se o JS falhar, demorar ou for bloqueado, **o usuário fica sem cursor**.
Risco alto de usabilidade para ganho estético baixo. Um cliente que perde o cursor
não reporta o bug — ele fecha a aba.

### ⚪ Botão focável dentro de `aria-hidden="true"`
`index.html:84` marca `.intro-video-sticky` como `aria-hidden`, mas há um
`<button class="scroll-cue">` focável dentro. Leitor de tela e navegação por Tab quebram.

---

## 2. Peso: 16,2 MB para ver a primeira tela

```
vídeo desktop   14,76 MB   ← autoplay + preload="auto", sem poster
tesoura.png      0,62 MB
guilherme.png    0,57 MB   ← PNG onde deveria ser JPEG/WebP
fotos do time    0,16 MB
html+css+js      0,12 MB
─────────────────────────
TOTAL           16,23 MB
```

Em 4G médio brasileiro isso é aproximadamente 20 segundos de tela preta — o vídeo
não tem `poster`, então é preto literal — antes de ler a primeira palavra sobre a empresa.

E o conteúdo que aparece depois desses 20 segundos é: **"Scroll para entrar"**.
Gastamos 15 MB e 20 segundos do cliente para pedir que ele role a página.

- Removendo o vídeo: 16,23 MB → **~1,5 MB**
- Removendo o vídeo + convertendo as duas PNGs grandes para WebP: → **menos de 500 KB**

---

## 3. Credibilidade — o problema mais grave

`index.html:471`:

```html
<p class="eyebrow">DEPOIMENTOS FICTÍCIOS</p>
```

A página declara, em caixa alta, que os depoimentos são inventados. Um deles é
assinado **"Dental Easy"** — cliente real, inclusive dono do repositório no GitHub —
com uma métrica inventada de 40% de aumento de conversão.

Isso é o oposto exato do objetivo do projeto. E é evitável: o inventário do
doc [05](./05-conteudo.md) mostra **5 depoimentos reais nota 5,0 e 6 projetos entregues**
que não aparecem em lugar nenhum do site.

### Portfólio desperdiçado
O perfil no 99Freelas lista seis projetos: GranjaTech, BarberFlow, AgroNutri, HotelOS,
Controle-Imóveis e Scraping de CNPJ. **O site mostra só o BarberFlow.**
Escondemos 80% do portfólio real enquanto exibimos depoimentos falsos. Está invertido.

### ⚠️ Inconsistência entre canais
A bio do 99Freelas diz "~100 projetos concluídos". O contador da própria plataforma
marca **6 concluídos**. Um cliente que abrir o perfil vê os dois números na mesma tela.

**Decisão necessária antes de escrever qualquer copy:** alinhar o discurso.
A recomendação é usar números verificáveis e parar de citar "100 projetos".
Seis projetos entregues com cinco notas 5,0 é uma história forte e checável.
Cem projetos não comprováveis é uma história frágil que desmonta no primeiro clique.

---

## 4. Poluição visual

Camadas rodando simultaneamente sobre o conteúdo:

| # | Camada | Origem |
|---|---|---|
| 1 | Canvas de fundo com chuva de código Matrix | `script.js:178` |
| 2 | Segundo canvas fixo `z-index: 9998` cobrindo a viewport, cuspindo `404`, `ERRO`, `NULL`, `BUG`, `FAIL` a cada 6s, indefinidamente | `script.js:832` |
| 3 | Cursor customizado em duas camadas (glow + dot) | `styles.css:48` |
| 4 | Dois orbes ambient animados em loop | `script.js:387` |
| 5 | Grid overlay | `index.html:30` |
| 6 | Dez blocos `.section-transition` com glow + track + sweep | `index.html`, 10 ocorrências |
| 7 | Tilt 3D em hover em ~10 tipos de card | `script.js:681` |

Sobre a camada 2: o cliente entra para contratar quem vai construir o sistema dele,
e a página escreve **"BUG"**, **"FAIL"**, **"ERRO"** e **"404"** na frente dele a cada
seis segundos. É uma piada interna com o nome da empresa. Quem vai pagar lê como literal.

---

## 5. Invisível para o cliente, mas custa dinheiro

- **Sem favicon** — a aba mostra o ícone genérico de documento.
- **Sem Open Graph** — o link compartilhado no WhatsApp ou no Instagram aparece
  sem imagem, sem título e sem descrição. Só a URL crua. Para quem vende presença
  digital, é o pior cartão de visita possível.
- **Sem `canonical`, `schema.org`, `sitemap.xml` ou `robots.txt`** — nenhum sinal
  estruturado para o Google entender que somos uma empresa de desenvolvimento.
- **Formulário depende de `window.open` para o Gmail** (`script.js:1025`) — quem usa
  Outlook fica sem saída, e bloqueador de popup mata o envio em silêncio.
  **Não recebemos o lead e não ficamos sabendo que ele existiu.**

---

## 6. Organização do repositório

| Item | Problema |
|---|---|
| `THE_KRAKEN_DESIGN_SYSTEM_HANDOFF.md` | 7 KB de documentação de **outro projeto** (design system verde-militar), versionado aqui |
| `server.err` | Versionado, contém stack trace de erro do Node |
| `server.log` | Versionado, vazio |
| `styles.css` | 2.676 linhas em arquivo único |
| Media queries fora de ordem | `1080px` → `720px` → `560px` → `820px` → `1080px` de novo — correção empilhada sobre correção |

### Erros de acentuação na copy visível

| Texto | Onde |
|---|---|
| `Construimos` | `index.html:322`, `index.html:385` |
| `criticos` | `index.html:396` |
| `pratica` | `index.html:204` |
| `VISAO` | `index.html:264` |

Quatro erros de português numa página que vende serviço técnico. É o tipo de detalhe
que o cliente não comenta, mas registra.

---

## 7. O que está bom e permanece

- **Seção Processo** (`index.html:361`) — as quatro etapas passam maturidade.
  É a melhor seção da página. Fica, com ajustes de conteúdo.
- **Estrutura semântica** — uso correto de `<section>`, `<article>`, `<header>`,
  `<main>`, `aria-label`. Está acima da média do mercado.
- **Seção Time com rosto e perfis reais** — LinkedIn e GitHub de cada um.
  É diferencial competitivo: rosto significa responsabilidade.
- **Stack declarada** — coerente e verdadeira, bate com o portfólio real.
- **Otimizações de performance já feitas** — canvas desligado em mobile,
  `prefers-reduced-motion` respeitado, gradientes cacheados. O trabalho de perf
  foi bem feito; o problema é que otimizamos camadas que deveriam ser removidas.
