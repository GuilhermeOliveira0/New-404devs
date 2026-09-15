# 06 — Arquitetura técnica

> Como organizar o código para que os quatro consigam mexer sem quebrar o do outro.

---

## Problema atual

| Arquivo | Linhas | Problema |
|---|---|---|
| `styles.css` | 2.676 | Arquivo único. Media queries fora de ordem (`1080` → `720` → `560` → `820` → `1080`), sinal de correção empilhada sobre correção |
| `script.js` | 1.045 | Seis responsabilidades diferentes no mesmo escopo global |
| `index.html` | 783 | 4 SVGs de ícone repetidos inline, 8 vezes cada |

Raiz: não existe separação declarada. Quem for mexer no formulário abre um arquivo de
1.045 linhas que também contém dois canvas, um carrossel e um cursor customizado.

---

## Estrutura proposta

```
404devs/
├── index.html
├── robots.txt
├── sitemap.xml
├── package.json              ← só para o script de build do CSS
│
├── css/
│   ├── 01-tokens.css         ← variáveis do doc 04, nada além
│   ├── 02-base.css           ← reset, tipografia, elementos nativos
│   ├── 03-layout.css         ← container, grid, seção, navbar, rodapé
│   ├── 04-components.css     ← botão, card, input, tag, badge
│   ├── 05-sections.css       ← estilo específico de cada seção
│   └── 06-utilities.css      ← helpers e .sr-only
│
├── js/
│   ├── nav.js                ← navbar sticky + menu mobile
│   ├── reveal.js             ← IntersectionObserver de entrada
│   └── form.js               ← validação e envio
│
├── assets/
│   ├── img/
│   │   ├── team/             ← 4 fotos em WebP
│   │   └── projects/         ← prints dos sistemas em WebP
│   ├── icons/
│   │   └── sprite.svg        ← SVG sprite: linkedin, github, whatsapp, mail
│   ├── favicon.svg
│   ├── favicon.ico
│   └── og-image.jpg          ← 1200×630
│
└── docs/                     ← estes documentos
```

**Mudança de mentalidade:** a ordem numérica dos arquivos CSS **é** a cascata.
Token nunca depende de componente. Componente nunca depende de seção. Quem quebrar
essa ordem quebra o sistema.

### Build

Um script, sem framework, sem bundler:

```json
{
  "scripts": {
    "build:css": "cat css/*.css > styles.min.css",
    "dev": "npx serve ."
  }
}
```

O `cat css/*.css` funciona porque os arquivos são numerados — a ordem alfabética
já é a ordem correta. Para produção, passar por um minificador.

**Alternativa sem build:** seis `<link>` em ordem no `<head>`. Funciona, custa alguns
milissegundos a mais de latência, e dispensa `package.json`. Se o time preferir
simplicidade absoluta, é uma escolha defensável.

### Quanto de CSS deve sobrar

Removendo o que o doc 03 manda remover — vídeo de intro, cursor, dois canvas,
carrossel Swiper, 10 `section-transition`, tilt 3D, painel operacional, device 3D —
a estimativa é cair de **2.676 para ~1.200 linhas**. Metade do CSS atual estiliza
coisas que vão deixar de existir.

---

## JavaScript

De 1.045 linhas para uma estimativa de **~150**, em três arquivos.

### `js/nav.js`
- Estado sticky do header (sombra ao rolar)
- Abrir/fechar menu mobile, com `aria-expanded`
- Fechar ao clicar em link, ao apertar `Esc`, ao clicar fora
- Trap de foco enquanto o menu está aberto

### `js/reveal.js`
```js
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
```
Com `@media (prefers-reduced-motion: reduce)` já deixando tudo visível no CSS.

### `js/form.js`
- Validação de campo obrigatório e formato de e-mail
- `fetch` para o endpoint, com estado de carregando, sucesso e erro
- Mensagem em `aria-live` (já existe hoje, manter)

### Bibliotecas que saem

| Biblioteca | Peso | Motivo |
|---|---|---|
| GSAP + ScrollTrigger | ~70 KB | O `reveal` de entrada cabe em IntersectionObserver |
| Swiper (CSS + JS) | ~140 KB | Grade fixa de 4 cards não precisa de carrossel |
| **Total** | **~210 KB** | Removidos |

---

## Formulário — corrigir a perda silenciosa de lead

Hoje `script.js:1025` faz `window.open` para o Gmail. Quem usa Outlook fica sem saída,
e bloqueador de popup mata o envio sem avisar. **Perdemos o lead sem saber que existiu.**

### Recomendação

**WhatsApp continua sendo o CTA primário.** É como o cliente brasileiro de pequena
empresa realmente fala. O formulário é a alternativa para quem prefere escrever.

Para o formulário, uma função serverless na Vercel:

```
/api/contact.js   →  valida  →  envia e-mail (Resend / SendGrid)  →  responde JSON
```

~20 linhas, roda no plano gratuito, e o envio fica sob nosso controle.

| Alternativa | Prós | Contras |
|---|---|---|
| **Vercel Function + Resend** ✅ | Controle total, sem dependência externa no front, plano free generoso | Precisa configurar variável de ambiente |
| Web3Forms / Formspree | Zero código de backend | Dependência de terceiro, limite no plano free |
| Netlify Forms | Trivial | Só se migrar de hospedagem |

**Requisitos, qualquer que seja a escolha:**
- [ ] Honeypot anti-spam (campo escondido que bot preenche)
- [ ] Estado de carregando no botão
- [ ] Mensagem de erro visível se o envio falhar
- [ ] Fallback: se o `fetch` falhar, oferecer o link do WhatsApp
- [ ] Log do lead em algum lugar além do e-mail (planilha, Sheets, o que for)

---

## SEO e compartilhamento

Hoje não existe nenhum destes. Todos são obrigatórios.

```html
<!-- Identidade -->
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/favicon.ico" sizes="32x32">
<link rel="canonical" href="https://404devs.com.br/">
<meta name="theme-color" content="#0a0b0e">

<!-- Open Graph -->
<meta property="og:type"        content="website">
<meta property="og:url"         content="https://404devs.com.br/">
<meta property="og:title"       content="404Devs — Sistemas sob medida para sua operação">
<meta property="og:description" content="Quatro desenvolvedores. Sistemas de gestão, sites e aplicativos para empresas que precisam sair da planilha. CNPJ ativo, com nota fiscal.">
<meta property="og:image"       content="https://404devs.com.br/assets/og-image.jpg">
<meta property="og:locale"      content="pt_BR">

<!-- Twitter/X -->
<meta name="twitter:card" content="summary_large_image">
```

**A OG image é a de maior retorno imediato.** Todo link que vocês mandam hoje no
WhatsApp aparece como URL crua, sem imagem e sem título. Para quem vende presença
digital, é o pior cartão de visita possível — e é uma imagem de 1200×630 para resolver.

### Dados estruturados

`schema.org/ProfessionalService` em JSON-LD, com nome, descrição, área de atuação,
telefone, e-mail e redes. É o que faz o Google entender que somos uma empresa de
desenvolvimento e não um blog.

### Arquivos na raiz
- `robots.txt` — liberar tudo, apontar o sitemap
- `sitemap.xml` — página única, mas o Google espera encontrar

---

## Orçamento de performance

Metas para a nova versão, medidas em 4G simulado:

| Métrica | Hoje | Meta |
|---|---|---|
| Peso da primeira visita | **16,23 MB** | **< 500 KB** |
| HTML | 40 KB | < 30 KB |
| CSS | 53 KB | < 40 KB |
| JS próprio | 31 KB | < 10 KB |
| JS de terceiros | ~210 KB | **0** |
| LCP | — | < 2,0 s |
| CLS | — | < 0,1 |
| Lighthouse Performance | — | ≥ 95 |
| Lighthouse Accessibility | — | ≥ 95 |

### Regras de imagem
- **WebP** em tudo, com `<img>` simples (suporte universal desde 2021)
- `width` e `height` explícitos em toda imagem — evita layout shift
- `loading="lazy"` em tudo que não está na primeira tela
- `loading="eager"` + `fetchpriority="high"` só na imagem do LCP, se houver
- Foto de time: máx. 40 KB cada · print de projeto: máx. 80 KB cada

### Fontes
- Manter `preconnect` para `fonts.gstatic.com` (já existe)
- Reduzir de 3 famílias para 2 (doc 04)
- Reduzir os pesos carregados ao mínimo real: Manrope 400/600/700/800, Mono 500
- `font-display: swap` (o Google Fonts já entrega assim)

---

## Deploy

| Item | Situação |
|---|---|
| Hospedagem | Vercel (`.gitignore` já tem `.vercel`) |
| Build | Nenhum hoje; passa a ter `npm run build:css` se adotarmos o split |
| Domínio | ⚠️ **Verificar:** o site está em domínio próprio ou em `*.vercel.app`? Domínio próprio é sinal de legitimidade e aparece no benchmark |
| Repositório | ⚠️ Está em `github.com/DentalEasy/New-404devs` — o site da empresa mora na org de um cliente. Migrar para org `404Devs` antes de divulgar o GitHub no rodapé |

### Limpeza do repositório

```
git rm THE_KRAKEN_DESIGN_SYSTEM_HANDOFF.md   # doc de outro projeto
git rm server.err server.log                  # log versionado, com stack trace
```

E acrescentar ao `.gitignore`:
```
*.log
*.err
node_modules/
```

---

## Checklist antes de publicar

- [ ] Testado em Chrome, Safari, Firefox e Edge
- [ ] Testado em iPhone e Android reais, não só no DevTools
- [ ] Navegação completa por teclado, do topo ao rodapé
- [ ] Lighthouse ≥ 95 em Performance e Accessibility
- [ ] Formulário testado de ponta a ponta — **o e-mail chegou de verdade?**
- [ ] Link testado no WhatsApp Web e no app — preview aparece com imagem?
- [ ] Todas as imagens carregam em produção (atenção ao caso `Wendell.jpeg`)
- [ ] Todos os links externos funcionam e abrem em nova aba
- [ ] Nenhum texto de placeholder ou "lorem" sobrando
- [ ] Zero erro no console

---

## Fluxo de conteúdo e idioma (a partir de 14/09/2026)

**`index.html` e `en/index.html` são gerados. Não edite os dois diretamente.**

```
src/index.html        ← template único, com marcadores {{chave}}
content/pt-BR.json    ← todo o texto em português
content/en.json       ← o mesmo conjunto de chaves, em inglês
        │
        └─ npm run build ─► styles.min.css + index.html + en/index.html
```

- **Para mudar um texto:** edite a chave em `content/pt-BR.json` **e** em `content/en.json`,
  rode `npm run build`, versione os três arquivos gerados. O build falha se uma chave
  existir num idioma e não no outro, e avisa se houver chave sem uso no template.
- **Para mudar estrutura ou marcação:** edite `src/index.html`. Todo caminho de recurso
  precisa começar em `/` (o lint do build barra caminho relativo, que quebraria em `/en/`).
- **Strings que o JS escreve** (mensagens do formulário, contador de depoimentos, rótulos do
  tema) ficam em atributos `data-*` do template; o JS lê de lá e não conhece idioma.
- **Depoimentos em inglês** mantêm o original em português íntegro e recebem a tradução
  abaixo, marcada como tradução (`quotes.items.N.translation`). Nunca substitua o original.
- **Pendências comerciais** (`<span class="pending">`) ficam no template; só o texto
  "A definir / To be defined" (chave `pending`) está no JSON. A contagem deve ser igual nos
  dois idiomas.
- **Tema:** o CSS segue `prefers-color-scheme`; a escolha explícita do visitante fica em
  `localStorage.theme` e é aplicada por script inline no `<head>` antes da folha de estilo.
