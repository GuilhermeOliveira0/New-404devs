const services = [
 ['Sistemas web completos', 'Da regra de negócio à interface: sistemas sob medida para a sua operação.'],
 ['SaaS & gestão', 'Plataformas SaaS e sistemas de gestão para organizar processos, clientes e resultados.'],
 ['Aplicativos mobile', 'Aplicativos para levar sua solução ao dia a dia de quem usa Android e iOS.'],
 ['APIs & integrações', 'APIs REST, autenticação e conexões entre plataformas para compartilhar dados com segurança.'],
 ['Dashboards & painéis', 'Indicadores e painéis administrativos para acompanhar a operação e apoiar decisões.'],
 ['Automações', 'Integrações com Meta, pagamentos e serviços externos para reduzir tarefas manuais.'],
 ['Sites & e-commerces', 'Sites, landing pages e lojas virtuais com navegação clara em todas as telas.'],
 ['Manutenção & evolução', 'Correções, melhorias e novas funcionalidades em sistemas existentes.'],
 ['Hospedagem & publicação', 'Configuração de servidores, hospedagem e deploy de aplicações para colocar seu projeto no ar.']
];
const technologies = [
 ['Back-end', ['C#/.NET','Node.js','Java','Python','PHP']],
 ['Front-end', ['React','Next.js','TypeScript','JavaScript','HTML','CSS']],
 ['Mobile', ['React Native','Flutter']],
 ['Banco de dados', ['PostgreSQL','MySQL','MongoDB','Firebase','Supabase']],
 ['Infraestrutura', ['Docker','Git/GitHub','AWS','Azure','Vercel']]
];
const reasons = [
 ['Cerca de 100 projetos concluídos', 'Experiência construída com clientes de todo o Brasil.'],
 ['Conversa direta', 'Comunicação clara e acompanhamento durante o desenvolvimento.'],
 ['Escopo e prazo definidos', 'Você sabe o que vai receber antes do início.'],
 ['Código pronto para evoluir', 'Organização para facilitar a manutenção e as próximas funcionalidades.'],
 ['Entrega funcional e testada', 'Os principais fluxos são validados antes da publicação.'],
 ['Documentação e manual', 'Informações para entender, operar e dar continuidade ao sistema.'],
 ['Uma rodada de ajustes', 'Refinamentos dentro do escopo combinado.'],
 ['Contratação formal', 'CNPJ ativo e emissão de nota fiscal.']
];
export const reasonsMarkup = `<div class="reasons"><div class="reasons-heading"><span class="label">POR QUE TRABALHAR COM A 404DEVS?</span><h3>PARCERIA QUE APARECE<br>EM CADA ENTREGA.</h3></div><ul class="reasons-grid">${reasons.map(([title,text])=>`<li class="reveal"><span class="reason-check" aria-hidden="true">↗</span><div><h4>${title}</h4><p>${text}</p></div></li>`).join('')}</ul></div>`;
export const servicesSection = `<section class="services wrap" id="servicos"><div class="section-heading"><span class="label">03 / O QUE DESENVOLVEMOS</span><span class="label">DO PLANEJAMENTO À PUBLICAÇÃO.</span></div><h2 class="reveal">SEU PROJETO.<br><span class="muted">DE PONTA A PONTA.</span></h2><div class="capabilities-grid">${services.map(([title,text],i)=>`<article class="capability reveal"><span class="label">0${i+1} /</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div><a class="text-link services-portfolio" href="#projetos">Conheça nossos principais projetos no portfólio ↗</a><div class="technology-section" id="tecnologias"><div class="technology-intro"><span class="label">TECNOLOGIAS QUE UTILIZAMOS</span><h3>A FERRAMENTA CERTA<br>PARA A SUA IDEIA.</h3><p>Da modelagem do banco de dados à publicação: escolhemos as tecnologias de acordo com o que o seu projeto precisa.</p></div><dl class="technology-list">${technologies.map(([name,items])=>`<div class="technology-row reveal"><dt>${name}</dt><dd>${items.map(item=>`<span>${item}</span>`).join('')}</dd></div>`).join('')}</dl></div></section>`;

export function contactSection(team) {
 return `<section class="contact dark" id="contato"><div class="wrap"><div class="section-heading"><span class="label">08 / SUA IDEIA COMEÇA AQUI</span><span class="label">DO BRASIL PARA O MUNDO.</span></div><div class="contact-layout"><div class="contact-pitch"><h2 class="contact-title"><span>VAMOS TIRAR</span><span><em>DO PAPEL?</em> ↗</span></h2><p>Conte o que você precisa construir ou melhorar. A gente conversa sobre a sua ideia e os próximos passos.</p><div class="mini-team">${team.map(t=>`<img src="assets/img/team/${t[0]}.webp" alt="" width="44" height="44" loading="lazy">`).join('')}<span>Quatro desenvolvedores.<br>Uma conversa direta.</span></div><a class="button inverse magnetic" href="https://wa.me/5517996242178" target="_blank" rel="noopener noreferrer">Falar no WhatsApp ↗</a></div><form class="contact-form" id="contact-form" action="/api/contact" method="post"><span class="label">PREFERE CONVERSAR POR E-MAIL?</span><h3>Conta a sua ideia.</h3><div class="contact-fields"><label for="contact-name">Seu nome<input id="contact-name" name="nome" autocomplete="name" required maxlength="100" placeholder="Como podemos te chamar?"></label><label for="contact-email">Seu e-mail<input id="contact-email" name="email" type="email" autocomplete="email" required maxlength="254" placeholder="voce@empresa.com"></label></div><label for="contact-message">Sobre o projeto<textarea id="contact-message" name="mensagem" rows="4" minlength="10" maxlength="4000" required placeholder="O que você quer criar ou melhorar?"></textarea></label><div class="contact-trap" aria-hidden="true"><label>Deixe este campo vazio<input name="website" tabindex="-1" autocomplete="off"></label></div><p class="contact-note">Usaremos seus dados apenas para responder sobre o seu projeto.</p><button class="button inverse" type="submit">Enviar mensagem ↗</button><p class="contact-status" id="contact-status" role="status" aria-live="polite"></p><a class="contact-email-fallback" id="contact-email-fallback" href="mailto:404devsoficial@gmail.com">Ou abrir seu aplicativo de e-mail ↗</a><noscript><p>Para entrar em contato, use o link de e-mail acima ou o WhatsApp.</p></noscript></form></div><footer><a href="mailto:404devsoficial@gmail.com">404devsoficial@gmail.com ↗</a><a href="https://www.instagram.com/404devs.ofc/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="#">Voltar ao topo ↑</a><span>404DEVS © 2026</span></footer></div></section>`;
}
