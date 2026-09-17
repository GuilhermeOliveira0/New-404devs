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
      <div class="device-shadow" aria-hidden="true"></div>
      <div class="laptop" aria-hidden="true">
        <div class="laptop-lid"><div class="laptop-camera"></div><div class="laptop-display">
          <aside class="demo-sidebar"><b>404devs</b><span class="demo-selected">⌂ &nbsp; Início</span><span>▦ &nbsp; Projetos</span><span>◈ &nbsp; Financeiro</span><span>▥ &nbsp; Relatórios</span><span>♧ &nbsp; Equipe</span><span>⚙ &nbsp; Configurações</span><small>SEU NEGÓCIO, CONECTADO.</small></aside>
          <div class="demo-main"><div class="demo-heading"><b>Visão geral</b><span>◉ &nbsp; ···</span></div><div class="demo-metrics"><div><small>Receita do mês</small><b>R$ 12.430</b><em>↗ 12%</em></div><div><small>Novos clientes</small><b>24</b><em>↗ 8%</em></div><div><small>Projetos ativos</small><b>56</b><em>↗ 16%</em></div></div><div class="demo-chart"><div><b>Receita</b><small>Últimos meses ↗</small></div><div class="demo-bars">${bars}</div><div class="demo-months"><span>JAN</span><span>FEV</span><span>MAR</span><span>ABR</span><span>MAI</span></div></div><div class="demo-orders"><b>Últimos pedidos</b><div><span>Cliente</span><span>Status</span><span>Valor</span></div><div><span>João Silva</span><em>Pago</em><span>R$ 3.200</span></div><div><span>Maria Costa</span><em>Em andamento</em><span>R$ 5.610</span></div><div><span>Carlos Souza</span><em>Pago</em><span>R$ 950</span></div></div></div>
        </div><span class="laptop-signature">404DEVS</span></div>
        <div class="laptop-base"><div class="laptop-keys"></div><div class="laptop-trackpad"></div></div><div class="laptop-edge"></div>
      </div>
      <div class="phone" aria-hidden="true"><div class="phone-screen"><div class="phone-top"><span>9:41</span><span>▰ ▪</span></div><div class="phone-notch"></div><div class="phone-content"><b class="phone-greeting">Olá, 404devs</b><p>Aqui está o resumo do seu negócio hoje.</p><div class="phone-metric"><small>Receita hoje</small><b>R$ 12.430</b><em>↗ 12%</em></div><div class="phone-metric"><small>Projetos</small><b>56</b><em>↗ 8%</em></div><div class="phone-metric"><small>Clientes</small><b>24</b><em>↗ 16%</em></div><div class="phone-mini-chart">${bars}</div></div><div class="phone-nav"><span>⌂<small>Início</small></span><span>▦<small>Projetos</small></span><span>♧<small>Clientes</small></span><span>···<small>Mais</small></span></div><div class="phone-home"></div></div></div>
    </div>
  </div>
  <div class="hero-technologies"><p class="label">TECNOLOGIA QUE GERA POSSIBILIDADES</p><div><span>.NET</span><span>⚛ React</span><span>React Native</span><span>Node.js</span><span>PostgreSQL</span><span>MongoDB</span><span>Docker</span><span>AWS</span><a href="#tecnologias" class="label">E MUITO MAIS ↗</a></div></div>
</section>`;
