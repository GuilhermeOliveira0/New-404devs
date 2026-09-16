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

O site inclui suporte automático a movimento reduzido, navegação por
teclado, filtros de projetos, galerias em tela cheia e layout responsivo.

As avaliações em destaque foram conferidas no perfil público da 404Devs no
99Freelas em 15/09/2026. Um projeto indisponível no 99Freelas direciona para o
perfil, onde a avaliação permanece publicada.

## Formulário de contato

O formulário envia via `/api/contact` (função da Vercel) usando a API do Resend.
Mantém as variáveis da implementação anterior: `RESEND_API_KEY`, `CONTACT_FROM`
(remetente verificado) e `CONTACT_TO` (padrão `404devsoficial@gmail.com`).
O remetente de teste `404Devs <onboarding@resend.dev>` é usado somente quando
`CONTACT_FROM` está ausente; está sujeito às restrições de destinatário do Resend.
Referência: https://resend.com/docs/api-reference/emails/send-email

No desenvolvimento, `npm run dev` serve os arquivos e o mesmo endpoint. As
variáveis podem ser definidas em `.env.local`, ignorado pelo Git. Nunca coloque
chaves no HTML ou JavaScript do navegador. Sem a chave, o servidor retorna
indisponibilidade e o formulário oferece WhatsApp e e-mail, preservando o texto.

`npm test` verifica validação e respostas do provedor com simulações locais;
os testes não enviam e-mails reais.

Copie `.env.example` para `.env.local` somente para desenvolvimento. Para a
produção, cadastre os mesmos três valores nas variáveis de ambiente do projeto
na Vercel e faça um novo deploy. O endereço usado em `CONTACT_FROM` precisa
estar verificado no Resend para que os e-mails sejam entregues.
