# Notas de implementação

Registro produzido durante a execução das tarefas. Não é artefato de planejamento.

---

## Tarefa 5.1 — Catálogo de correções de estabilidade anteriores à reescrita

Levantamento no histórico antes de reescrever `styles.css` e `script.js`, conforme o
risco *"reescrita completa perde correções pontuais já feitas"* registrado no `design.md`.

### Reaplicar

| Correção | Commit | Por que ainda vale |
|---|---|---|
| `overflow: hidden` + `border-radius: inherit` em superfícies com cantos arredondados | `29474a5` | Elimina o artefato de entalhe transparente no canto do card. O problema é do modelo de pintura do navegador, não do layout antigo — volta a acontecer na estrutura nova se não for aplicado |
| Desligamento de movimento sob `prefers-reduced-motion` | `bc005ac` | Requisito normativo da spec `design-system`. A implementação antiga cobria apenas os reveals; a nova cobre os quatro elementos do sistema de movimento |
| `scroll-behavior: auto` sob `prefers-reduced-motion` | `bc005ac` | Rolagem suave em link de âncora também é movimento |

### Não reaplicar

| Correção | Commit | Por que perde o objeto |
|---|---|---|
| Canvas desligado em ponteiro grosseiro | `854da52` | Não há mais canvas |
| Pausa do `requestAnimationFrame` em aba oculta | `138a74d` | Não há mais laço de animação contínuo |
| Gradientes cacheados no `resize` | `854da52` | Não há mais desenho em canvas |
| `will-change` dinâmico no hover de card | `854da52` | O tilt 3D que o exigia foi removido |
| Empilhamento vertical de `404` / `DEVS` no mobile | `33a8189`, `9240bfb` | O título decorativo gigante deixa de existir |
| Ocultação da tesoura decorativa abaixo de 1080px | `4cc1d14` | O elemento decorativo foi removido |
| Responsividade do vídeo de abertura | `0d3993d` | O vídeo foi removido |
| Conjunto de breakpoints de 420 a 1080px | `585cd8d` | Superado pela cascata mobile-first da estrutura nova |

### Observação

A maior parte do trabalho de performance do histórico otimizava camadas que a mudança
remove. É o padrão que o `docs/01-auditoria.md` já havia registrado: o trabalho de
otimização foi bem feito, mas aplicado a elementos que não deveriam existir.

---

## Decisões tomadas durante a execução

### Alvo de toque em links inline dentro de frase

Três links permanecem abaixo de 44px de altura: o link do perfil no 99Freelas na
faixa de credibilidade, o link de verificação na seção de depoimentos e o endereço
de e-mail na seção de contato. Todos são links inline dentro de um parágrafo.

A spec `design-system` exige 44px para "botão, link de navegação, campo de
formulário, controle de menu, item de FAQ". Link inline em frase não está nessa lista,
e a própria WCAG isenta esse caso no critério de tamanho de alvo. Forçar 44px neles
quebraria o ritmo do parágrafo sem ganho de acessibilidade.

Corrigidos por serem alvos discretos, não inline: `.brand`, `.footer__grid a`,
`.person__links a` e `.project__link`.

### Duas inconsistências dos artefatos de planejamento, corrigidas

**D6 se contradizia.** Listava as micro-interações como animando "borda, cor e
deslocamento" e, logo abaixo, afirmava que só `transform` e `opacity` são animados.
O texto foi corrigido para separar os dois casos. A regra normativa da spec —
nenhuma propriedade que dispare recálculo de layout — sempre foi respeitada pelo
código.

**Os alvos de volume de D10 eram estimativas feitas antes da implementação.** O CSS
ficou abaixo do previsto; o JavaScript ficou acima: 238 linhas de código em vez de
~150. A diferença está no trap de foco do menu, no failsafe do sistema de movimento
e na validação que aceita e-mail ou telefone — itens exigidos pelas specs e que não
estavam contabilizados na estimativa. A tabela foi atualizada com os números reais
em vez de o código ser cortado para caber num número escrito antes dele existir.

### Dois bugs de cascata encontrados na primeira renderização

1. `.btn` não reiniciava `background`, então todo botão sem variante herdava o cinza
   padrão do navegador. Corrigido na regra base.
2. `.btn` (camada 04) vencia `.bar__toggle` e `.bar__cta` (camada 03) por ordem de
   cascata com a mesma especificidade, deixando o botão "Menu" visível em telas
   largas e o botão de WhatsApp visível em telas estreitas. Corrigido elevando a
   especificidade para `.bar .bar__toggle` e `.bar .bar__cta`.

É exatamente o tipo de colisão que a regra de camadas de D1 existe para tornar
previsível: o conflito foi encontrado em minutos porque a ordem das camadas é
declarada.
