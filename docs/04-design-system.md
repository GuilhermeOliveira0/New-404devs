# 04 — Design system

> Proposta. Substitui `THE_KRAKEN_DESIGN_SYSTEM_HANDOFF.md`, que é documentação
> de outro projeto e deve sair do repositório.

---

## Direção visual

**Continua escuro.** O tema escuro não é o problema — Linear, Vercel e Raycast são
escuros e passam seriedade. O problema é o **neon em excesso**: três cores de acento
saturadas competindo, sobre sete camadas de animação.

A regra nova: **escuro sóbrio, um acento, muito respiro.**

| Hoje | Proposta |
|---|---|
| 3 cores de acento (ciano, dourado, verde matrix) | 1 acento + neutros + semânticas |
| Fundo `#000` puro | Quase-preto com leve viés frio |
| 7 camadas de animação simultâneas | Animação só em `reveal` de entrada |
| 3 famílias tipográficas | 2 famílias |
| Cor usada como decoração | Cor usada como hierarquia |

---

## Correção obrigatória: o token que mente

`styles.css:2` hoje:

```css
--magenta: #ffb800;   /* isto é DOURADO, não magenta */
```

As classes `.tag-magenta` e `.accent-magenta` estão espalhadas pelo HTML renderizando
dourado. Qualquer um de nós que mexer nisso daqui a três meses vai se perder.

**Nenhum token novo pode ser nomeado por cor.** Nomeia-se por função.

---

## Tokens

### Cor

```css
:root {
  /* ── Superfícies ─────────────────────────────────── */
  --bg:            #0a0b0e;   /* fundo da página */
  --surface:       #111318;   /* card, painel */
  --surface-2:     #171a20;   /* card sobre card, input */
  --border:        #23262e;   /* borda padrão */
  --border-strong: #32363f;   /* borda em hover/foco */

  /* ── Texto ───────────────────────────────────────── */
  --text:          #edeef0;   /* título e corpo */
  --text-muted:    #a2a6ad;   /* apoio, legenda      AA ok */
  --text-subtle:   #71757d;   /* metadado            usar ≥14px */

  /* ── Acento (único) ──────────────────────────────── */
  --accent:        #00c8e0;   /* ciano contido — botão, link, destaque */
  --accent-hover:  #22dcf2;
  --accent-soft:   rgba(0, 200, 224, 0.10);   /* fundo de tag, hover sutil */
  --accent-border: rgba(0, 200, 224, 0.28);

  /* ── Semânticas (só onde há estado) ──────────────── */
  --success:       #2fbf6b;   /* confirmação de formulário */
  --warning:       #e0a020;
  --error:         #e5484d;   /* validação de campo */
}
```

**Regras de uso:**
- O acento é para **ação e hierarquia**, nunca para decorar. Botão primário, link,
  borda de card ativo, ícone de destaque. Se um elemento colorido não é clicável e
  não marca hierarquia, ele perde a cor.
- **Verde matrix e dourado saem.** Se o time quiser um segundo acento para as
  etiquetas de setor na seção Projetos, usar uma escala neutra com opacidade,
  não uma segunda cor saturada.
- `--text-subtle` só a partir de 14px. Abaixo disso o contraste não passa em AA.

### Tipografia

De três famílias para duas. Sai **Space Grotesk**.

```css
--font-sans: "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace;
```

| Uso | Família | Peso | Tamanho |
|---|---|---|---|
| Display (hero) | sans | 800 | `clamp(2.5rem, 6vw, 4.5rem)` |
| H2 (seção) | sans | 700 | `clamp(1.75rem, 3.5vw, 2.75rem)` |
| H3 (card) | sans | 600 | `1.25rem` |
| Corpo | sans | 400 | `1rem` / linha `1.65` |
| Corpo grande | sans | 400 | `1.125rem` / linha `1.6` |
| Legenda | sans | 400 | `0.875rem` |
| **Eyebrow / label / tag** | **mono** | 500 | `0.75rem`, `letter-spacing: 0.08em`, caixa alta |

A mono fica só nos rótulos pequenos — é onde a identidade "dev" aparece sem virar ruído.

### Espaçamento

Escala base 4px. Nada fora dela.

```css
--space-1:  0.25rem;   --space-6:  2rem;
--space-2:  0.5rem;    --space-8:  3rem;
--space-3:  0.75rem;   --space-10: 4rem;
--space-4:  1rem;      --space-12: 6rem;
--space-5:  1.5rem;    --space-16: 8rem;
```

| Contexto | Valor |
|---|---|
| Padding vertical de seção | `--space-12` desktop · `--space-8` mobile |
| Gap entre cards | `--space-5` |
| Padding interno de card | `--space-5` |
| Largura do container | `1120px` |
| Gutter lateral | `--space-5` (mínimo 16px em qualquer largura) |

### Raio e elevação

```css
--radius-sm: 0.5rem;    /* tag, input */
--radius-md: 0.75rem;   /* botão, card pequeno */
--radius-lg: 1rem;      /* card, painel */

--shadow-sm: 0 1px 2px rgba(0,0,0,.4);
--shadow-md: 0 8px 24px rgba(0,0,0,.35);
```

Hoje o raio vai até `1.75rem`, o que dá aspecto de app de consumo. `1rem` no máximo
lê mais profissional.

---

## Componentes

### Botão

| Variante | Uso | Aparência |
|---|---|---|
| **Primário** | Um por seção, no máximo | Fundo `--accent`, texto `--bg`, peso 600 |
| **Secundário** | Ação alternativa | Borda `--border-strong`, fundo transparente |
| **Texto** | Terciário, links de card | Só texto `--accent`, sublinhado no hover |

Altura mínima **44px** (alvo de toque). Transição `160ms ease` em `background` e
`border-color` — não em `transform`.

### Card

```
border: 1px solid var(--border)
background: var(--surface)
border-radius: var(--radius-lg)
padding: var(--space-5)
overflow: hidden            ← mantém o fix do commit 29474a5
```

Hover: `border-color: var(--border-strong)` e nada mais.
**Sai o tilt 3D** (`script.js:681`). Um card que gira quando o mouse passa não ajuda
o dono da granja a decidir contratar.

### Input

```
background: var(--surface-2)
border: 1px solid var(--border)
border-radius: var(--radius-sm)
padding: 0.75rem 1rem
min-height: 44px
```

Foco: `border-color: var(--accent)` + `outline: 2px solid var(--accent-soft)`.
**Nunca remover o outline de foco.** É requisito de acessibilidade e de teclado.

### Etiqueta de setor

Usada nos cards de projeto (`[avicultura]`, `[hotelaria]`).

```
font: var(--font-mono) 500 0.6875rem
text-transform: uppercase
letter-spacing: 0.08em
color: var(--text-muted)
background: var(--surface-2)
border: 1px solid var(--border)
border-radius: var(--radius-sm)
padding: 0.25rem 0.5rem
```

---

## Motion

> **Atualizado em 14/09/2026.** A versão anterior desta seção pedia movimento mínimo.
> O time decidiu que o movimento deve demonstrar domínio de design, já que o site é
> peça de portfólio. A especificação normativa passou a viver em
> `openspec/changes/redesign-site-institucional/` — spec `design-system` e decisão D6
> do `design.md`. O que segue é o resumo.

Regra única: **domínio se lê como orquestração e disciplina de tempo, não como
quantidade de efeito.** O site atual tem sete camadas animadas ao mesmo tempo e
transmite instabilidade, não capacidade.

O sistema tem quatro elementos e nada além disso:

| # | Elemento | O que faz |
|---|---|---|
| 1 | **Sequência de abertura** | Primeira dobra entra em cascata: rótulo → título → texto → botões → faixa. Escalonamento 70ms, total ≤ 1200ms |
| 2 | **Momento assinatura** | No título, um traço risca as palavras *planilha* e *caderno* ao fim da sequência. A tese da empresa virando movimento. Não se repete em nenhum outro lugar do site |
| 3 | **Revelação por scroll** | Seção revela os filhos com escalonamento de 60ms, uma vez por elemento |
| 4 | **Micro-interações** | Apontamento e foco em borda, cor e deslocamento de até 2px, 160ms |

### Tokens de tempo e curva

```css
--dur-micro:  160ms;   --ease-out:   cubic-bezier(0.22, 1, 0.36, 1);
--dur-enter:  500ms;   --ease-micro: cubic-bezier(0.4, 0, 0.2, 1);
--dur-reveal: 600ms;
--stagger-hero: 70ms;  --stagger-reveal: 60ms;
```

É a existência desses tokens que faz o movimento parecer **um sistema** em vez de
animações avulsas. Nenhuma animação usa valor de tempo fora deles.

### Restrições inegociáveis

- Anima-se **exclusivamente** `transform` e `opacity`
- **Nenhum laço infinito.** Página parada 30s = nada em movimento
- **Estado de repouso visível.** A revelação parte de conteúdo legível, nunca de
  `opacity: 0` esperando observador
- `prefers-reduced-motion: reduce` desliga os quatro elementos

### Sobre bibliotecas

GSAP + ScrollTrigger (~70 KB) sai. A Web Animations API entrega linha do tempo,
escalonamento e controle de curva nativamente — e `IntersectionObserver` resolve a
revelação. Zero dependência para orquestrar cinco elementos.

---

## Acessibilidade — critérios de pronto

- [ ] Contraste mínimo **4,5:1** para texto normal, **3:1** para texto ≥ 24px
- [ ] Todo alvo clicável com **44×44px** mínimo
- [ ] Foco de teclado visível em **todo** elemento interativo
- [ ] Nenhum elemento focável dentro de `aria-hidden` (corrigir `index.html:84`)
- [ ] `cursor: none` removido do `<body>` (`styles.css:49`)
- [ ] Navegação completa por teclado, do topo ao rodapé
- [ ] `alt` descritivo em imagem de conteúdo, `alt=""` em decorativa
- [ ] Formulário com `<label>` real associado a cada campo — já está correto hoje
