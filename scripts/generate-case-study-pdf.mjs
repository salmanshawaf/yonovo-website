// Generate PDFs for case studies by printing the /print route via headless Chrome.
// Usage:
//   npm run generate-case-study-pdfs            (all case studies)
//   node scripts/generate-case-study-pdf.mjs <slug>   (single case study)
// Requires the dev server to be running at http://localhost:3000.

import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "public/case-studies");
const DATA_FILE = resolve(ROOT, "src/data/caseStudies.ts");
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

function findChrome() {
  for (const p of CHROME_CANDIDATES) {
    if (existsSync(p)) return p;
  }
  throw new Error(
    "Chrome/Chromium not found. Install Google Chrome or set CHROME_PATH env var."
  );
}

function readSlugs() {
  const src = readFileSync(DATA_FILE, "utf8");
  // Match: slug: "value", inside the caseStudies record.
  const slugs = [...src.matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
  if (slugs.length === 0) {
    throw new Error("No case study slugs found in src/data/caseStudies.ts");
  }
  return slugs;
}

async function checkServer() {
  try {
    const res = await fetch(`${BASE_URL}/`, { method: "HEAD" });
    if (!res.ok && res.status !== 405) {
      throw new Error(`status ${res.status}`);
    }
  } catch (err) {
    throw new Error(
      `Dev server not reachable at ${BASE_URL}. Start it with \`npm run dev\` first. (${err.message})`
    );
  }
}

function generatePdf(chrome, slug) {
  const url = `${BASE_URL}/case-studies/${slug}/print`;
  const out = resolve(OUT_DIR, `${slug}.pdf`);
  console.log(`→ ${slug}: ${url} → ${out}`);
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--no-pdf-header-footer",
      "--virtual-time-budget=10000",
      `--print-to-pdf=${out}`,
      url,
    ],
    { stdio: ["ignore", "ignore", "inherit"] }
  );
}

async function main() {
  const argSlug = process.argv[2];
  const chrome = process.env.CHROME_PATH || findChrome();
  await checkServer();
  mkdirSync(OUT_DIR, { recursive: true });

  const slugs = argSlug ? [argSlug] : readSlugs();
  console.log(`Generating ${slugs.length} PDF(s) using ${chrome}`);
  for (const slug of slugs) generatePdf(chrome, slug);
  console.log(`Done. Wrote ${slugs.length} PDF(s) to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
