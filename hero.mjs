const bars = [28,43,36,57,46,68,60,82,72,94].map(height=>`<i style="--bar:${height}%"></i>`).join('');
export const heroSection = `<section class="hero hero-showcase">
  <div class="dot-field" aria-hidden="true"></div>
  <div class="hero-composition">
    <div class="hero-copy">
      <p class="hero-eyebrow label">DESENVOLVIMENTO QUE GERA RESULTADOS</p>
      <h1><span class="line"><span>TIRAMOS SUA OPERAÇÃO</span></span><span class="line"><span>DA <em>PLANILHA.</em></span></span><span class="line"><span>E SUA IDEIA <em>DO PAPEL.</em></span></span></h1>
      <p class="hero-description">Quatro desenvolvedores. Sites, aplicativos e sistemas sob medida para simplificar o seu negócio.<span>A 404Devs cuida do projeto do planejamento até a publicação.</span></p>
      <div class="hero-actions"><a href="#contato" class="button magnetic hero-cta">Vamos construir juntos ↗</a><a href="#projetos" class="button hero-secondary">Ver nossos projetos</a></div>
      <ul class="hero-proof"><li><strong>≈100</strong><span>PROJETOS<br>CONCLUÍDOS</span></li><li><strong>4</strong><span>DESENVOLVEDORES<br>ESPECIALISTAS</span></li><li><strong>↗</strong><span>DO PLANEJAMENTO<br>À PUBLICAÇÃO</span></li></ul>
    </div>
    <div class="device-stage" role="img" aria-label="Demonstração de um sistema 404Devs no notebook e no celular, com indicadores e gráficos de gestão.">
      <div class="device-note" aria-hidden="true">Soluções reais<br>para o seu negócio <span>⤵</span></div>
      <div class="notebook-scene-wrap" aria-hidden="true"><video class="notebook-home-video" muted playsinline autoplay preload="auto" poster="assets/hero/notebook-video-poster.webp"><source src="assets/hero/notebook-home.mp4" type="video/mp4"></video></div>
      <div class="phone" aria-hidden="true"><div class="phone-screen"><div class="phone-top"><span>9:41</span><span>▰ ▪</span></div><div class="phone-notch"></div><div class="phone-content"><b class="phone-greeting">Olá, 404devs</b><p>Aqui está o resumo do seu negócio hoje.</p><div class="phone-metric"><small>Receita hoje</small><b>R$ 12.430</b><em>↗ 12%</em></div><div class="phone-metric"><small>Projetos</small><b>56</b><em>↗ 8%</em></div><div class="phone-metric"><small>Clientes</small><b>24</b><em>↗ 16%</em></div><div class="phone-mini-chart">${bars}</div></div><div class="phone-nav"><span>⌂<small>Início</small></span><span>▦<small>Projetos</small></span><span>♧<small>Clientes</small></span><span>···<small>Mais</small></span></div><div class="phone-home"></div></div></div>
    </div>
  </div>
  <div class="hero-technologies"><p class="label">TECNOLOGIA QUE GERA POSSIBILIDADES</p><div><span>.NET</span><span>⚛ React</span><span>React Native</span><span>Node.js</span><span>PostgreSQL</span><span>MongoDB</span><span>Docker</span><span>AWS</span><a href="#tecnologias" class="label">E MUITO MAIS ↗</a></div></div>
</section>`;
