import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const content = JSON.parse(fs.readFileSync(new URL('content/pt-BR.json', import.meta.url), 'utf8'));
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
import { projects, cards, dialogs, filters } from './portfolio.mjs';
import { clientSections } from './client-sections.mjs';
import { heroSection } from './hero.mjs';
import { reasonsMarkup, servicesSection, contactSection } from './company-sections.mjs';
const roll = text => `<span class="roll"><span>${text}</span><span aria-hidden="true">${text}</span></span>`;
const team = [['samuel','Samuel Henrique'],['guilherme','Guilherme Henrique'],['adryan','Adryan Francisco'],['wendell','Wendell Nascimento']];
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#ffffff"><meta name="description" content="Sites, aplicativos e sistemas sob medida para simplificar o seu negócio."><title>404Devs — Da ideia ao sistema.</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="preload" href="assets/fonts/bricolage-grotesque-700.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="style.css?v=7"><script src="script.js?v=7" defer></script></head><body>
<a href="#principal" class="skip">Pular para conteúdo</a><div class="scroll-progress" aria-hidden="true"></div>
<header><a href="#" class="brand" aria-label="404Devs, início">404devs<span>®</span></a><nav aria-label="Principal"><a href="#projetos">${roll('Projetos')}</a><a href="#sobre">${roll('Estúdio')}</a><a href="#processo">${roll('Como trabalhamos')}</a><a href="#avaliacoes">${roll('Avaliações')}</a><a href="#duvidas">${roll('Dúvidas')}</a><a href="#contato">${roll('Vamos conversar ↗')}</a></nav></header>
<main id="principal">${heroSection}
<section class="projects" id="projetos"><div class="section-heading wrap"><span class="label">01 / TRABALHOS SELECIONADOS</span><span class="label">PROJETOS PARA VER DE PERTO ↓</span></div>${filters}${cards}</section>
<section class="about dark" id="sobre"><div class="wrap"><div class="section-heading"><span class="label">02 / QUEM ESTÁ POR TRÁS</span><span class="label">QUATRO PESSOAS. UMA EQUIPE.</span></div><h2 class="reveal">GENTE DE VERDADE.<br>CÓDIGO BEM FEITO.<br><span class="outline">DO INÍCIO AO FIM.</span></h2><div class="about-copy"><span class="asterisk" aria-hidden="true">✳</span><p>Somos uma empresa de desenvolvimento formada por 4 desenvolvedores, com cerca de 100 projetos concluídos para clientes de todo o Brasil.<span class="about-world">Atendemos de forma remota, no Brasil e em qualquer lugar do mundo.</span></p></div><div class="team">${team.map((t,i)=>`<figure class="reveal"><div class="portrait"><img src="assets/img/team/${t[0]}.webp" alt="${t[1]}" loading="lazy" width="600" height="600"><span>0${i+1} ↗</span></div><figcaption><strong>${t[1]}</strong><span>${esc(content.team.members[i].role)}</span></figcaption></figure>`).join('')}</div>${reasonsMarkup}</div></section>
${servicesSection}
${clientSections(content)}
${contactSection(team)}</main>
${dialogs}
</body></html>`;
fs.writeFileSync(new URL('index.html', import.meta.url),html);
// Publish only this explicit set, never the repository or server configuration.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(projectRoot, 'dist');
if (path.dirname(output) !== projectRoot || path.basename(output) !== 'dist' ||
    (fs.existsSync(output) && fs.lstatSync(output).isSymbolicLink())) throw new Error('Unsafe output directory');
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output);
for (const name of ['index.html', 'style.css', 'script.js', 'robots.txt', 'sitemap.xml']) {
  fs.copyFileSync(path.join(projectRoot, name), path.join(output, name));
}
fs.cpSync(path.join(projectRoot, 'assets'), path.join(output, 'assets'), {
  recursive: true,
  filter: source => {
    const stat = fs.lstatSync(source);
    if (stat.isSymbolicLink()) throw new Error('Public assets cannot be symbolic links');
    return !path.basename(source).startsWith('.') && (stat.isDirectory() || /\.(webp|png|jpg|jpeg|svg|ico|woff2?|mp4)$/i.test(source));
  }
});
console.log(`Protótipo gerado com ${projects.length} projetos e ${projects.reduce((total,p)=>total+p.images.length,0)} imagens.`);
