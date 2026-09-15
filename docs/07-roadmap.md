# 07 — Roadmap de execução

> Ordem proposta. Cada fase entrega valor sozinha — dá para parar entre fases
> sem deixar o site num estado pior que o atual.

---

## Fase 0 — Emergência · ~2h

**Não espera o redesign. Pode ir hoje.** São coisas que estão custando cliente agora
e que não conflitam com nenhuma decisão de estrutura.

| # | Tarefa | Arquivo |
|---|---|---|
| 1 | Corrigir caminho da foto do Wendell | `index.html:597` |
| 2 | Remover a etiqueta `DEPOIMENTOS FICTÍCIOS` e os dois depoimentos falsos | `index.html:468–494` |
| 3 | Trocar pelos 5 depoimentos reais do doc 05 | `index.html` |
| 4 | Corrigir os 4 erros de acentuação | `index.html` (5 ocorrências) |
| 5 | Adicionar favicon + tags Open Graph | `<head>` |
| 6 | Remover `THE_KRAKEN…md`, `server.err`, `server.log` | raiz |

**Por que primeiro:** o item 2 é o que mais destrói confiança e leva 10 minutos para
resolver. O item 5 conserta todo link que vocês já mandaram e vão mandar no WhatsApp.

**Pronto quando:** nenhum depoimento inventado no ar, foto do time carregando em
produção, link no WhatsApp abrindo com imagem e título.

---

## Fase 1 — Fundação · ~1 a 1,5 dia

Estrutura e limpeza. Aqui o site fica leve e navegável.

| # | Tarefa | Referência |
|---|---|---|
| 1 | Remover seção de vídeo de intro e os dois arquivos `.mp4` | doc 03 |
| 2 | Remover cursor customizado, os dois canvas, tilt 3D, `section-transition` | doc 01, seção 4 |
| 3 | Remover GSAP e Swiper | doc 06 |
| 4 | Implementar navbar fixa + menu hamburger mobile | doc 03 |
| 5 | Criar `css/01-tokens.css` com os tokens novos | doc 04 |
| 6 | Reorganizar CSS nos 6 arquivos numerados | doc 06 |
| 7 | Trocar carrossel do time por grade fixa de 4 | doc 03, seção 7 |
| 8 | Converter `guilherme.png` e `tesoura.png` para WebP | doc 06 |
| 9 | Substituir `reveal` do GSAP por IntersectionObserver | doc 06 |

**Pronto quando:**
- [ ] Peso da primeira visita abaixo de 500 KB
- [ ] Navegação funciona em qualquer largura, de 320px para cima
- [ ] Zero biblioteca de terceiro no JS
- [ ] `cursor: none` fora do `<body>`
- [ ] Lighthouse Performance ≥ 95

**Esta fase sozinha resolve os dois problemas que o Guilherme levantou:**
tirar o vídeo e trocar a sidebar por navbar.

---

## Fase 2 — Conteúdo que vende · ~1,5 a 2 dias

⚠️ **Bloqueada pelas respostas do doc 05, seção 7.** Sem elas, esta fase não começa.

| # | Tarefa | Bloqueio |
|---|---|---|
| 1 | Seção **Projetos**: 1 case em destaque + grade com 5 | pendências 1–4 |
| 2 | Reescrever **Serviços** em linguagem de resultado | — |
| 3 | Enriquecer **Processo** com entregável e prazo por etapa | pendência 7 |
| 4 | Criar seção **O que está incluso** | pendências 6, 9 |
| 5 | Criar seção **FAQ** | pendências 5, 6, 7, 8 |
| 6 | Reescrever hero com o posicionamento novo | decisão de headline |
| 7 | Reescrever rodapé com CNPJ, horário e links de verificação | pendência 9 |

**Pronto quando:**
- [ ] Os 6 projetos reais no ar, com setor identificado
- [ ] Pelo menos 1 case com resultado numérico
- [ ] FAQ respondendo preço, prazo, garantia, NF e contrato
- [ ] Nenhuma frase genérica do tipo "soluções digitais sob medida" sobrando

---

## Fase 3 — Conversão e acabamento · ~1 dia

| # | Tarefa |
|---|---|
| 1 | Formulário com envio real (Vercel Function + Resend) |
| 2 | Honeypot, estado de carregando, fallback para WhatsApp |
| 3 | JSON-LD `ProfessionalService` |
| 4 | `robots.txt` e `sitemap.xml` |
| 5 | Passada de acessibilidade completa (checklist do doc 04) |
| 6 | Teste em iPhone e Android reais |
| 7 | Migrar repositório para org `404Devs` |

**Pronto quando:**
- [ ] Formulário testado de ponta a ponta, e-mail chegou de verdade
- [ ] Lighthouse ≥ 95 em Performance e Accessibility
- [ ] Navegação completa por teclado
- [ ] Checklist do doc 06 inteiro marcado

---

## Depois — quando houver fôlego

| Item | Por quê |
|---|---|
| Página própria por case (`/projetos/granjatech`) | Case study é o conteúdo que mais converte; página própria indexa e vira link para mandar direto ao prospect |
| Página de serviço por setor (`/sistemas-para-barbearia`) | SEO de cauda longa; quem busca "sistema para barbearia" chega direto |
| Blog técnico | Ranking orgânico, mas só se houver disciplina de publicar |
| Vídeo curto de 20s mostrando um sistema rodando | Vídeo pode voltar — mas como **prova do produto**, sob demanda, não como portão de entrada de 15 MB |

---

## Resumo de esforço

| Fase | Esforço | Bloqueada? |
|---|---|---|
| 0 — Emergência | ~2 h | não |
| 1 — Fundação | 1 a 1,5 dia | não |
| 2 — Conteúdo | 1,5 a 2 dias | **sim** — doc 05, seção 7 |
| 3 — Conversão | ~1 dia | não |
| **Total** | **~4 a 5 dias** | |

Considerando que são quatro pessoas com trabalho de cliente em paralelo, é realista
mirar **duas a três semanas de calendário**.

---

## O caminho crítico

```
  Fase 0 ──────────────────────────────────► pode ir hoje
     │
  Fase 1 ──────────────────────────────────► independente
     │
     ├── aguarda respostas do doc 05 §7 ────┐
     │                                      ▼
  Fase 2 ─────────────────────────────► conteúdo
     │
  Fase 3 ─────────────────────────────► publicar
```

**Gargalo real: as pendências do doc 05.** O trabalho de código é o mais fácil aqui.
O que trava é decidir se declaramos preço, qual a garantia, e se podemos nomear
cliente e mostrar print.

**Sugestão:** uma call de 30 minutos entre os quatro para fechar as 11 pendências.
Isso desbloqueia metade do projeto.

---

## Uma pergunta para o time, antes de começar

O depoimento real de março/2026 diz:

> *"O visual é limpo e as informações estão bem organizadas (...) o site abre rápido
> no celular e no computador, o que era uma prioridade para mim."*

Um cliente nos pagou para entregar exatamente isso, e ficou satisfeito.

O nosso próprio site tem 16,2 MB, leva ~20 segundos para mostrar a primeira palavra
e não tem navegação nenhuma no celular.

**O site da 404Devs precisa ser o melhor trabalho da 404Devs.** É a única peça do
portfólio que 100% dos clientes vão ver antes de decidir.
