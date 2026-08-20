#!/usr/bin/env node
/**
 * Repeatable Lighthouse harness for Core Web Vitals work.
 *
 * Single Lighthouse runs are noisy and are not evidence. This runs each URL
 * RUNS times (default 3) on the mobile preset and reports the MEDIAN of each
 * metric, plus the diagnostics that decide what to actually fix:
 *   - which element is the LCP element
 *   - the LCP phase breakdown (TTFB / load delay / load duration / render delay)
 *   - render-blocking resources
 *   - every opportunity with meaningful savings
 *
 * Usage:
 *   node scripts/perf-baseline.mjs                      # baseline production
 *   node scripts/perf-baseline.mjs --base=http://localhost:3000
 *   node scripts/perf-baseline.mjs --runs=5 --label=after
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const arg = (name, fallback) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};

const BASE = arg("base", "https://www.yonovo.com").replace(/\/$/, "");
const RUNS = Number(arg("runs", "3"));
const LABEL = arg("label", "baseline");

// The six URLs the speed brief scopes. Keep this list stable so before/after
// comparisons stay comparable.
const PATHS = [
  "/",
  "/book-demo",
  "/solutions/sage",
  "/solutions/quickbooks",
  "/pricing",
  "/blog/best-ar-automation-software",
];

const METRICS = [
  ["performance", "Perf", (lhr) => Math.round(lhr.categories.performance.score * 100)],
  ["fcp", "FCP", (lhr) => lhr.audits["first-contentful-paint"].numericValue],
  ["lcp", "LCP", (lhr) => lhr.audits["largest-contentful-paint"].numericValue],
  ["tbt", "TBT", (lhr) => lhr.audits["total-blocking-time"].numericValue],
  ["cls", "CLS", (lhr) => lhr.audits["cumulative-layout-shift"].numericValue],
  ["si", "SI", (lhr) => lhr.audits["speed-index"].numericValue],
  ["tti", "TTI", (lhr) => lhr.audits["interactive"]?.numericValue ?? NaN],
];

const median = (nums) => {
  const s = nums.filter((n) => Number.isFinite(n)).sort((a, b) => a - b);
  if (!s.length) return NaN;
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

function runLighthouse(url, outPath) {
  execFileSync(
    "node_modules/.bin/lighthouse",
    [
      url,
      "--quiet",
      "--output=json",
      `--output-path=${outPath}`,
      "--only-categories=performance",
      "--form-factor=mobile",
      "--throttling-method=simulate",
      "--chrome-flags=--headless=new --no-sandbox --disable-gpu",
    ],
    { stdio: ["ignore", "ignore", "pipe"], timeout: 180_000 }
  );
  return JSON.parse(readFileSync(outPath, "utf8"));
}

/** Pull the LCP element selector/snippet out of the LH report. */
function lcpElement(lhr) {
  const items = lhr.audits["largest-contentful-paint-element"]?.details?.items ?? [];
  const node = items[0]?.items?.[0]?.node ?? items[0]?.node;
  if (!node) return "n/a";
  return `${node.nodeLabel ?? ""} — ${node.selector ?? ""}`.trim();
}

/** Pull the four-phase LCP breakdown. This decides network vs main thread. */
function lcpPhases(lhr) {
  const items = lhr.audits["largest-contentful-paint-element"]?.details?.items ?? [];
  // details.items holds TWO tables: the element table first, the phase table
  // second. Match on the phase key, not on type, or we pick the wrong one.
  const table = items.find((i) => i.items?.some?.((row) => row.phase));
  const rows = table?.items ?? [];
  return rows
    .filter((r) => r.phase)
    .map((r) => `${r.phase} ${Math.round(r.timing)}ms`)
    .join(" | ") || "n/a";
}

function opportunities(lhr) {
  return Object.values(lhr.audits)
    .filter((a) => a.details?.type === "opportunity" && (a.details.overallSavingsMs ?? 0) > 50)
    .sort((a, b) => (b.details.overallSavingsMs ?? 0) - (a.details.overallSavingsMs ?? 0))
    .map((a) => {
      const kb = a.details.overallSavingsBytes
        ? `, ${Math.round(a.details.overallSavingsBytes / 1024)} KiB`
        : "";
      return `${a.title}: ${Math.round(a.details.overallSavingsMs)}ms${kb}`;
    });
}

function renderBlocking(lhr) {
  const items = lhr.audits["render-blocking-resources"]?.details?.items ?? [];
  return items.map(
    (i) => `${i.url} (${Math.round((i.totalBytes ?? 0) / 1024)} KiB, ${Math.round(i.wastedMs ?? 0)}ms)`
  );
}

function totalJsBytes(lhr) {
  const items = lhr.audits["network-requests"]?.details?.items ?? [];
  return items
    .filter((i) => i.resourceType === "Script")
    .reduce((sum, i) => sum + (i.transferSize ?? 0), 0);
}

function thirdPartyHosts(lhr) {
  const items = lhr.audits["network-requests"]?.details?.items ?? [];
  const base = new URL(BASE).host;
  const hosts = new Map();
  for (const i of items) {
    let host;
    try {
      host = new URL(i.url).host;
    } catch {
      continue;
    }
    if (host === base) continue;
    hosts.set(host, (hosts.get(host) ?? 0) + (i.transferSize ?? 0));
  }
  return [...hosts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([h, b]) => `${h} (${Math.round(b / 1024)} KiB)`);
}

const tmp = mkdtempSync(join(tmpdir(), "lh-"));
const results = [];

for (const path of PATHS) {
  const url = `${BASE}${path}`;
  process.stderr.write(`\n${url}\n`);
  const runs = [];
  for (let i = 0; i < RUNS; i++) {
    process.stderr.write(`  run ${i + 1}/${RUNS} ... `);
    try {
      const lhr = runLighthouse(url, join(tmp, `r${i}.json`));
      runs.push(lhr);
      process.stderr.write(
        `LCP ${Math.round(lhr.audits["largest-contentful-paint"].numericValue)}ms\n`
      );
    } catch (err) {
      process.stderr.write(`FAILED (${err.message.split("\n")[0]})\n`);
    }
  }
  if (!runs.length) {
    results.push({ path, failed: true });
    continue;
  }

  const medians = {};
  for (const [key, , get] of METRICS) medians[key] = median(runs.map(get));

  // Use the run whose LCP is closest to the median as the representative one
  // for diagnostics, so element/phase data matches the reported number.
  const rep = runs.reduce((best, r) => {
    const d = (x) => Math.abs(x.audits["largest-contentful-paint"].numericValue - medians.lcp);
    return d(r) < d(best) ? r : best;
  }, runs[0]);

  results.push({
    path,
    runs: runs.length,
    medians,
    lcpElement: lcpElement(rep),
    lcpPhases: lcpPhases(rep),
    renderBlocking: renderBlocking(rep),
    opportunities: opportunities(rep),
    jsBytes: totalJsBytes(rep),
    thirdParty: thirdPartyHosts(rep),
  });
}

rmSync(tmp, { recursive: true, force: true });

// ---- report ----
const ms = (n) => (Number.isFinite(n) ? `${Math.round(n)}` : "n/a");
const s = (n) => (Number.isFinite(n) ? `${(n / 1000).toFixed(1)}s` : "n/a");

let md = `# Lighthouse ${LABEL} — ${BASE}\n\n`;
md += `Mobile preset, simulated throttling, **median of ${RUNS} runs per URL**. Lighthouse ${
  JSON.parse(readFileSync("node_modules/lighthouse/package.json", "utf8")).version
}.\n\n`;
md += `| Page | Perf | FCP | LCP | TBT | CLS | SI | TTI | JS |\n|---|---|---|---|---|---|---|---|---|\n`;
for (const r of results) {
  if (r.failed) {
    md += `| \`${r.path}\` | FAILED | | | | | | | |\n`;
    continue;
  }
  const m = r.medians;
  md += `| \`${r.path}\` | ${m.performance} | ${s(m.fcp)} | **${s(m.lcp)}** | ${ms(
    m.tbt
  )}ms | ${m.cls.toFixed(3)} | ${s(m.si)} | ${s(m.tti)} | ${Math.round(r.jsBytes / 1024)} KiB |\n`;
}

md += `\n## Diagnostics\n`;
for (const r of results) {
  if (r.failed) continue;
  md += `\n### \`${r.path}\`\n\n`;
  md += `- **LCP element:** ${r.lcpElement}\n`;
  md += `- **LCP phases:** ${r.lcpPhases}\n`;
  md += `- **Render-blocking:** ${r.renderBlocking.length ? "\n" + r.renderBlocking.map((x) => `  - ${x}`).join("\n") : "none"}\n`;
  md += `- **Opportunities:** ${r.opportunities.length ? "\n" + r.opportunities.map((x) => `  - ${x}`).join("\n") : "none over 50ms"}\n`;
  md += `- **Third-party hosts:** \n${r.thirdParty.map((x) => `  - ${x}`).join("\n")}\n`;
}

mkdirSync("docs/seo", { recursive: true });
const out = `docs/seo/perf-${LABEL}.md`;
writeFileSync(out, md);
writeFileSync(`docs/seo/perf-${LABEL}.json`, JSON.stringify(results, null, 2));
process.stderr.write(`\n\nWrote ${out}\n`);
console.log(md);
