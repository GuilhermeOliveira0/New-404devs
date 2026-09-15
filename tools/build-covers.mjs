/**
 * Gera uma capa tipográfica por projeto em assets/img/covers/<slug>.svg e
 * imprime o sprite de <symbol> equivalente para embutir no HTML.
 *
 * As capas existem porque nenhum cliente liberou screenshot ainda (pendência 2
 * da mudança anterior). São gráficos — índice, setor, nome e um traço âmbar na
 * paleta da marca — e nunca simulam uma tela de sistema. Trocar por WebP real
 * é substituir o arquivo e o `alt` (design.md E5).
 *
 * Embutidas no HTML como <symbol>, herdam as fontes e os tokens da página.
 * Os arquivos avulsos usam a mesma marcação com cores fixas do tema escuro,
 * para referência e reuso fora do site.
 *
 * Uso: node tools/build-covers.mjs
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT_DIR = "assets/img/covers";

/** Ordem do índice (decrescente): o primeiro é o mais recente. */
export const PROJECTS = [
  { n: "07", slug: "granjatech", name: "GranjaTech", sector: "Avicultura" },
  { n: "06", slug: "barberflow", name: "BarberFlow", sector: "Barbearia" },
  { n: "05", slug: "agronutri", name: "AgroNutri", sector: "Nutrição animal" },
  { n: "04", slug: "hotelos", name: "HotelOS", sector: "Hotelaria" },
  { n: "03", slug: "controle-imoveis", name: "Controle-Imóveis", sector: "Imobiliário" },
  { n: "02", slug: "vendas-estoque", name: "Vendas e estoque", sector: "Indústria de alimentos" },
  { n: "01", slug: "scraping-cnpj", name: "Scraping de CNPJ", sector: "Dados · B2B" },
];

const W = 640;
const H = 440;

function escape(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Conteúdo interno comum ao símbolo e ao arquivo avulso. */
function body(project, { bg, ink, muted, accent, display, mono }) {
  return `
  <rect class="cover__bg" width="${W}" height="${H}" fill="${bg}"/>
  <text class="cover__num" x="40" y="300" font-family="${display}" font-weight="800" font-size="260" letter-spacing="-14" fill="${ink}">${project.n}</text>
  <line class="cover__rule" x1="40" y1="332" x2="600" y2="332" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
  <text class="cover__sector" x="40" y="378" font-family="${mono}" font-size="16" letter-spacing="2.4" fill="${muted}">${escape(project.sector.toUpperCase())}</text>
  <text class="cover__name" x="40" y="408" font-family="${display}" font-weight="700" font-size="24" letter-spacing="-.5" fill="${ink}">${escape(project.name)}</text>`;
}

const STANDALONE = {
  bg: "#141823",
  ink: "#F0EDE6",
  muted: "#8B8880",
  accent: "#E8A33D",
  display: "Bricolage Grotesque, Trebuchet MS, sans-serif",
  mono: "IBM Plex Mono, Menlo, monospace",
};

/* No sprite embutido, cor e fonte vêm dos tokens via CSS (.cover__*). */
const EMBEDDED = {
  bg: "currentColor",
  ink: "currentColor",
  muted: "currentColor",
  accent: "currentColor",
  display: "inherit",
  mono: "inherit",
};

function standalone(project) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Capa tipográfica de ${escape(project.name)}">${body(project, STANDALONE)}
</svg>
`;
}

function symbol(project) {
  return `<symbol id="cover-${project.slug}" viewBox="0 0 ${W} ${H}">${body(project, EMBEDDED)}
</symbol>`;
}

async function build() {
  await mkdir(OUT_DIR, { recursive: true });
  for (const project of PROJECTS) {
    const file = join(OUT_DIR, `${project.slug}.svg`);
    await writeFile(file, standalone(project), "utf8");
    console.log(`${file}`);
  }
  console.log("\n--- sprite para embutir no HTML ---\n");
  console.log(PROJECTS.map(symbol).join("\n"));
}

build().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
