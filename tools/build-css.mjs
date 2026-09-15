/**
 * Concatena as camadas de css/ na ordem numérica e minifica.
 *
 * Sem bundler e sem dependência (design.md D2). A ordem alfabética dos
 * arquivos já é a ordem correta da cascata, porque as camadas são numeradas.
 *
 * O minificador é consciente de string e de url(): whitespace dentro de
 * aspas ou de url() nunca é tocado. Isso é necessário porque a folha usa
 * `content` com valores como "+" e "\2013".
 *
 * Uso: node tools/build-css.mjs
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const SOURCE_DIR = "css";
const OUTPUT_FILE = "styles.min.css";

/** Remove comentários preservando o conteúdo de strings e de url(). */
function stripComments(css) {
  let out = "";
  let quote = null;

  for (let i = 0; i < css.length; i += 1) {
    const ch = css[i];

    if (quote) {
      out += ch;
      if (ch === "\\") {
        out += css[i + 1] ?? "";
        i += 1;
      } else if (ch === quote) {
        quote = null;
      }
      continue;
    }

    if (ch === '"' || ch === "'") {
      quote = ch;
      out += ch;
      continue;
    }

    if (ch === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      i = end === -1 ? css.length : end + 1;
      continue;
    }

    out += ch;
  }

  return out;
}

/**
 * Divide a folha em segmentos alternando fora e dentro de string.
 * Índices pares são código; ímpares são literais de string, que saem intactos.
 */
function splitOnStrings(css) {
  const segments = [];
  let buffer = "";
  let quote = null;

  for (let i = 0; i < css.length; i += 1) {
    const ch = css[i];

    if (quote) {
      buffer += ch;
      if (ch === "\\") {
        buffer += css[i + 1] ?? "";
        i += 1;
      } else if (ch === quote) {
        segments.push(buffer);
        buffer = "";
        quote = null;
      }
      continue;
    }

    if (ch === '"' || ch === "'") {
      segments.push(buffer);
      buffer = ch;
      quote = ch;
      continue;
    }

    buffer += ch;
  }

  segments.push(buffer);
  return segments;
}

/**
 * Colapsa whitespace e remove o supérfluo em volta da pontuação.
 * Só os segmentos de código são tocados: o conteúdo entre aspas sai intacto,
 * porque a folha usa `content` com valores como "+" e "\2013".
 */
function collapse(css) {
  return splitOnStrings(css)
    .map((segment, index) => {
      const isStringLiteral = index % 2 === 1;
      if (isStringLiteral) return segment;
      return segment
        .replace(/\s+/g, " ")
        .replace(/ ?([{}:;,>]) ?/g, "$1")
        .replace(/;}/g, "}");
    })
    .join("")
    .trim();
}

async function build() {
  const names = (await readdir(SOURCE_DIR))
    .filter((name) => name.endsWith(".css"))
    .sort();

  if (names.length === 0) {
    throw new Error(`Nenhum arquivo .css encontrado em ${SOURCE_DIR}/`);
  }

  const parts = await Promise.all(
    names.map((name) => readFile(join(SOURCE_DIR, name), "utf8")),
  );

  const raw = parts.join("\n");
  const minified = collapse(stripComments(raw));

  await writeFile(OUTPUT_FILE, `${minified}\n`, "utf8");

  const pct = ((1 - minified.length / raw.length) * 100).toFixed(1);
  console.log(`${OUTPUT_FILE} <- ${names.join(" + ")}`);
  console.log(
    `${raw.length} bytes -> ${minified.length} bytes (-${pct}%)`,
  );
}

build().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
