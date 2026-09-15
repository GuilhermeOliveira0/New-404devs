# Documentação de Reestruturação — Site 404Devs

> Iniciado em 14/09/2026 · Responsável técnico: time 404Devs
> Status: **planejamento** — nenhuma alteração aplicada ao site ainda.

Este diretório contém o diagnóstico do site atual, a pesquisa de referências
e o plano completo de reestruturação. A ideia é que qualquer um dos quatro
consiga abrir estes arquivos e entender o que muda, por quê, e em que ordem.

## Índice

| # | Documento | O que responde |
|---|-----------|----------------|
| 01 | [Auditoria](./01-auditoria.md) | O que está quebrado ou atrapalhando hoje, com evidência em `arquivo:linha` |
| 02 | [Benchmark](./02-benchmark.md) | O que estúdios de referência fazem e o que faz sentido copiar |
| 03 | [Estrutura nova](./03-estrutura-nova.md) | A nova arquitetura da página, seção por seção |
| 04 | [Design system](./04-design-system.md) | Tokens, cor, tipografia, componentes e regras de motion |
| 05 | [Conteúdo real](./05-conteudo.md) | Inventário do que temos de verdade: cases, depoimentos, copy |
| 06 | [Arquitetura técnica](./06-arquitetura-tecnica.md) | Organização de arquivos, performance, SEO, deploy |
| 07 | [Roadmap](./07-roadmap.md) | Ordem de execução, esforço e critério de pronto |

## Princípio que guia todo o resto

> O site não é para impressionar desenvolvedores. É para um dono de barbearia,
> de clínica, de granja ou de hotel decidir que pode confiar R$ 5–30 mil e três
> meses de operação da empresa dele na mão de quatro pessoas que ele nunca viu.

Toda decisão de design, copy e estrutura neste plano é resolvida por essa frase.
Quando houver dúvida entre "fica mais bonito" e "o cliente confia mais", ganha o segundo.

## Resumo executivo

**Três problemas, em ordem de dano:**

1. **Credibilidade** — a página declara `DEPOIMENTOS FICTÍCIOS` em caixa alta enquanto
   temos 5 avaliações reais nota 5,0 e 6 projetos entregues sem aparecer no site.
2. **Acesso** — 16,2 MB na primeira visita e zero navegação em telas abaixo de 720px.
3. **Foco** — sete camadas de animação simultâneas competindo com o conteúdo que vende.

**O que já é bom e fica:** a seção Processo, a estrutura semântica do HTML,
a apresentação do time com rosto e perfis reais, e a stack declarada (é verdadeira).
