# 404Devs — site institucional

Site estático em português com o novo design preto e branco da 404Devs.

## Executar

```bash
npm ci
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
- `assets/hero/notebook-home.mp4`: animação do notebook usada na abertura da home.
- `assets/projects/`: 40 imagens dos dez projetos, além das miniaturas.
- `dist/`: arquivos públicos gerados pelo build e publicados na Vercel.
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

## Segurança e validação

A publicação usa somente `dist/`, com HTML, CSS, JavaScript e imagens/fontes.
Código do servidor, documentos, testes e arquivos de ambiente ficam fora da
pasta pública. Arquivos `.env` e suas variantes são ignorados pelo Git e pelo
upload da Vercel; configure segredos nas variáveis de ambiente da plataforma.

A API valida tipo e tamanho do JSON (32 KiB), os campos do formulário e a
origem das requisições de navegador. Os cabeçalhos de segurança estão no
`vercel.json` e também são aplicados pelo servidor local. A política permite
estilos inline para as animações, mas não scripts inline nem `eval`.

O limite de cinco envios por IP em dez minutos é uma proteção básica **por
instância**, perdida quando a função reinicia e não compartilhada entre
instâncias. Para limitar abuso distribuído em produção, configure uma regra
de rate limiting no WAF da Vercel ou armazenamento compartilhado. A verificação
de origem e o campo antispam não substituem essa proteção.

`npm test` confere validação, limites, falhas do provedor, isolamento dos arquivos
públicos, âncoras e imagens. O provedor de e-mail é simulado, sem mensagens reais.
O recebimento real depende das credenciais e do remetente verificado no Resend.

Referências: [configuração da Vercel](https://vercel.com/docs/project-configuration/vercel-json)
e [cabeçalhos encaminhados pela plataforma](https://vercel.com/docs/headers/request-headers).
