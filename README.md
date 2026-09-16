# 404Devs — site institucional

Site estático em português com o novo design preto e branco da 404Devs.

## Executar

```bash
npm run build
npm run dev
```

Depois, acesse `http://127.0.0.1:4040/`.

## Estrutura

- `index.html`: página estática gerada para produção.
- `build.mjs`: gerador da página.
- `client-sections.mjs`: processo, condições, avaliações e perguntas frequentes.
- `portfolio.mjs`: componentes e informações dos cases.
- `portfolio-sources.json`: inventário das imagens e fontes dos projetos.
- `style.css`: layout responsivo, tipografia e animações.
- `script.js`: navegação, filtros, galerias e paginação.
- `assets/projects/`: 30 imagens dos nove projetos, incluindo miniaturas.
- `content/pt-BR.json`: conteúdo institucional e avaliações.

O site inclui pausa de animações, suporte a movimento reduzido, navegação por
teclado, filtros de projetos, galerias em tela cheia e layout responsivo.

As avaliações em destaque foram conferidas no perfil público da 404Devs no
99Freelas em 15/09/2026. Um projeto indisponível no 99Freelas direciona para o
perfil, onde a avaliação permanece publicada.
