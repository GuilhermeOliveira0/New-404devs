/**
 * Gera index.html (pt-BR) e en/index.html (en) a partir de um único template.
 *
 * Fonte da verdade:
 *   src/index.html        template com marcadores {{chave}}
 *   content/pt-BR.json    todo o texto visível, em português
 *   content/en.json       o mesmo conjunto de chaves, em inglês
 *
 * Por que em build e não em runtime: sem flash de idioma na carga, as duas
 * versões são indexáveis com hreflang correto, e uma tradução faltando falha
 * aqui — não no navegador do visitante.
 *
 * Valores são inseridos sem escape: o conteúdo é nosso e alguns trechos
 * carregam marcação (ex.: as palavras riscadas do título). Nunca inserir
 * conteúdo de terceiros por este caminho.
 *
 * Uso: node tools/build-html.mjs
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const TEMPLATE = "src/index.html";
const SITE_URL = "https://404devs.vercel.app";

const LANGUAGES = [
  {
    code: "pt-BR",
    dir: "",
    ogLocale: "pt_BR",
    switchTo: { href: "/en/", label: "English", code: "en" },
  },
  {
    code: "en",
    dir: "en",
    ogLocale: "en_US",
    switchTo: { href: "/", label: "Português", code: "pt-BR" },
  },
];

const PLACEHOLDER = /\{\{\s*([\w.-]+)\s*\}\}/g;

/** Resolve "a.b.c" dentro de um objeto aninhado. */
function lookup(object, path) {
  return path.split(".").reduce((node, key) => (node == null ? undefined : node[key]), object);
}

/** Metadados por idioma que o template pode usar como {{meta.*}}. */
function metaFor(language) {
  const url = `${SITE_URL}/${language.dir ? `${language.dir}/` : ""}`;
  return {
    lang: language.code,
    url,
    ogLocale: language.ogLocale,
    switchHref: language.switchTo.href,
    switchLabel: language.switchTo.label,
    switchLang: language.switchTo.code,
    alternates: LANGUAGES.map(
      (l) =>
        `<link rel="alternate" hreflang="${l.code}" href="${SITE_URL}/${l.dir ? `${l.dir}/` : ""}">`,
    )
      .concat(`<link rel="alternate" hreflang="x-default" href="${SITE_URL}/">`)
      .join("\n    "),
  };
}

function render(template, context, languageCode) {
  const missing = new Set();
  const used = new Set();

  const html = template.replace(PLACEHOLDER, (_, path) => {
    used.add(path);
    const value = lookup(context, path);
    if (value === undefined) {
      missing.add(path);
      return `{{${path}}}`;
    }
    return String(value);
  });

  if (missing.size > 0) {
    throw new Error(
      `[${languageCode}] ${missing.size} chave(s) sem tradução:\n  ${[...missing].join("\n  ")}`,
    );
  }

  return { html, used };
}

/** Marca caminhos relativos que quebrariam dentro de /en/. */
function lintPaths(html) {
  const relative = [...html.matchAll(/(?:src|href)="(?!https?:|\/|#|mailto:|tel:|data:|\{\{)([^"]+)"/g)]
    .map((m) => m[1]);
  if (relative.length > 0) {
    throw new Error(
      `Caminhos relativos no template quebram em /en/. Use caminho a partir da raiz (/assets/...):\n  ${[...new Set(relative)].join("\n  ")}`,
    );
  }
}

/** Chaves presentes no JSON mas nunca usadas no template — tradução morta. */
function flattenKeys(object, prefix = "") {
  return Object.entries(object).flatMap(([key, value]) =>
    value !== null && typeof value === "object"
      ? flattenKeys(value, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );
}

async function build() {
  const template = await readFile(TEMPLATE, "utf8");
  lintPaths(template);

  let allUsed = new Set();

  for (const language of LANGUAGES) {
    const content = JSON.parse(await readFile(join("content", `${language.code}.json`), "utf8"));
    const context = { ...content, meta: metaFor(language) };
    const { html, used } = render(template, context, language.code);
    allUsed = new Set([...allUsed, ...used]);

    const outDir = language.dir || ".";
    if (language.dir) await mkdir(outDir, { recursive: true });
    const outFile = join(outDir, "index.html");
    await writeFile(outFile, html, "utf8");
    console.log(`${outFile}  <-  ${TEMPLATE} + content/${language.code}.json  (${html.length} bytes)`);

    const dead = flattenKeys(content).filter((k) => !allUsed.has(k));
    if (dead.length > 0) {
      console.warn(`  aviso [${language.code}]: ${dead.length} chave(s) não usadas no template: ${dead.join(", ")}`);
    }
  }
}

build().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
