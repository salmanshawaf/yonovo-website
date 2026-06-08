#!/usr/bin/env node
/**
 * seo-audit.mjs — Yonovo on-page SEO QA harness
 * --------------------------------------------------------------
 * Crawls every URL in the site's sitemap and asserts on-page SEO rules.
 * Prints a per-page report + a summary that maps to the audit findings,
 * and exits non-zero if any ERROR-level rule fails (so it can gate CI / task completion).
 *
 * USAGE
 *   1. Build + serve the site, then point this at it:
 *        npm run build && (npm run start &) && sleep 5 && node scripts/seo-audit.mjs
 *      or against any running URL (local or a Vercel preview):
 *        BASE_URL=https://your-preview.vercel.app node scripts/seo-audit.mjs
 *   2. Default BASE_URL is http://localhost:3000
 *
 * DEPENDENCY
 *   npm i -D cheerio          (HTML/XML parsing; Node 18+ has global fetch)
 *
 * RULE LEVELS
 *   ERROR   = fails the run (exit 1). The things we're actively fixing.
 *   WARN    = reported but does not fail the run.
 *
 * Tune the thresholds / allowlists in CONFIG below.
 */

import * as cheerio from 'cheerio';

const CONFIG = {
  baseUrl: (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  canonicalHost: 'www.yonovo.com',     // the single canonical host
  titleMax: 60,
  descMax: 155,
  descMin: 50,                         // too-short descriptions are a WARN
  // Pages we don't hard-fail on uniqueness/length (e.g. paginated/category/author archives):
  uniquenessExemptPatterns: [/\/blog\/category\//, /\/blog\/author\//],
  // Treat missing width/height on <img> as WARN (next/image `fill` legitimately omits them):
  imageDimensionsLevel: 'WARN',
  fetchTimeoutMs: 20000,
  concurrency: 5,
};

const results = [];        // { url, errors:[], warns:[] }
const titles = new Map();  // normalizedTitle -> [urls]
const descs = new Map();   // normalizedDesc  -> [urls]

function add(map, key, url) {
  if (!key) return;
  const k = key.trim().toLowerCase();
  if (!map.has(k)) map.set(k, []);
  map.get(k).push(url);
}

async function fetchText(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), CONFIG.fetchTimeoutMs);
  try {
    const res = await fetch(url, { redirect: 'follow', signal: ctrl.signal });
    const body = await res.text();
    return { status: res.status, finalUrl: res.url, body };
  } finally {
    clearTimeout(t);
  }
}

async function getSitemapUrls() {
  const url = `${CONFIG.baseUrl}/sitemap.xml`;
  const { status, body } = await fetchText(url);
  if (status !== 200) throw new Error(`Could not read ${url} (status ${status})`);
  const $ = cheerio.load(body, { xmlMode: true });
  const locs = $('url > loc').map((_, el) => $(el).text().trim()).get();
  // Normalize sitemap URLs onto BASE_URL host so we test the running instance,
  // but keep the original host for canonical/host checks.
  return locs.map((loc) => {
    let path = loc;
    try { path = new URL(loc).pathname; } catch {}
    return { sitemapLoc: loc, testUrl: `${CONFIG.baseUrl}${path}` };
  });
}

function isExempt(path) {
  return CONFIG.uniquenessExemptPatterns.some((re) => re.test(path));
}

function auditPage({ sitemapLoc, testUrl }, status, html) {
  const errors = [];
  const warns = [];
  const path = (() => { try { return new URL(testUrl).pathname; } catch { return testUrl; } })();

  if (status !== 200) {
    errors.push(`Sitemap URL returns ${status} (expected 200)`);
    return { url: sitemapLoc, errors, warns };
  }

  const $ = cheerio.load(html);

  // ---- Title ----
  const title = $('head > title').first().text().trim();
  if (!title) errors.push('Missing <title>');
  else {
    if (title.length > CONFIG.titleMax) errors.push(`Title too long (${title.length} > ${CONFIG.titleMax}): "${title}"`);
    if (!isExempt(path)) add(titles, title, sitemapLoc);
  }

  // ---- Meta description ----
  const desc = ($('head > meta[name="description"]').attr('content') || '').trim();
  if (!desc) errors.push('Missing meta description');
  else {
    if (desc.length > CONFIG.descMax) errors.push(`Meta description too long (${desc.length} > ${CONFIG.descMax})`);
    if (desc.length < CONFIG.descMin) warns.push(`Meta description short (${desc.length} < ${CONFIG.descMin})`);
    if (!isExempt(path)) add(descs, desc, sitemapLoc);
  }

  // ---- Canonical ----
  const canonicals = $('head > link[rel="canonical"]');
  if (canonicals.length === 0) errors.push('Missing canonical');
  else if (canonicals.length > 1) errors.push(`Multiple canonical tags (${canonicals.length})`);
  else {
    const href = canonicals.attr('href') || '';
    try {
      const host = new URL(href).host;
      if (host !== CONFIG.canonicalHost) errors.push(`Canonical not on ${CONFIG.canonicalHost}: ${href}`);
    } catch {
      errors.push(`Canonical href invalid: "${href}"`);
    }
  }

  // ---- Open Graph ----
  for (const prop of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']) {
    const v = $(`head > meta[property="${prop}"]`).attr('content');
    if (!v || !v.trim()) errors.push(`Missing/empty ${prop}`);
  }

  // ---- H1 ----
  const h1count = $('h1').length;
  if (h1count === 0) errors.push('No <h1>');
  else if (h1count > 1) warns.push(`Multiple <h1> (${h1count})`);

  // ---- Images: alt + dimensions ----
  let imgNoAlt = 0, imgNoDim = 0;
  $('img').each((_, el) => {
    const $el = $(el);
    const alt = $el.attr('alt');
    // alt missing entirely = error; alt="" is allowed (decorative)
    if (alt === undefined) imgNoAlt++;
    const w = $el.attr('width');
    const h = $el.attr('height');
    if (!w || !h) imgNoDim++;
  });
  if (imgNoAlt > 0) errors.push(`${imgNoAlt} <img> missing alt attribute`);
  if (imgNoDim > 0) {
    const msg = `${imgNoDim} <img> missing width/height`;
    (CONFIG.imageDimensionsLevel === 'ERROR' ? errors : warns).push(msg);
  }

  // ---- JSON-LD validity ----
  $('script[type="application/ld+json"]').each((i, el) => {
    const raw = $(el).contents().text();
    try {
      const data = JSON.parse(raw);
      const nodes = Array.isArray(data) ? data : [data];
      for (const node of nodes) {
        const type = node['@type'];
        if (type === 'Organization' && !node.name) warns.push('Organization JSON-LD missing "name"');
        if (type === 'FAQPage' && !node.mainEntity) warns.push('FAQPage JSON-LD missing "mainEntity"');
      }
    } catch (e) {
      errors.push(`Invalid JSON-LD block #${i + 1}: ${e.message}`);
    }
  });

  return { url: sitemapLoc, errors, warns };
}

async function runPool(items, worker, concurrency) {
  const queue = [...items];
  const running = [];
  async function next() {
    const item = queue.shift();
    if (!item) return;
    const p = worker(item).then(() => next());
    running.push(p);
  }
  for (let i = 0; i < Math.min(concurrency, queue.length); i++) await next();
  await Promise.all(running);
}

async function main() {
  console.log(`\n🔎 SEO audit against ${CONFIG.baseUrl}\n`);
  let urls;
  try {
    urls = await getSitemapUrls();
  } catch (e) {
    console.error(`FATAL: ${e.message}`);
    console.error('Is the site built and served at BASE_URL? (npm run build && npm run start)');
    process.exit(2);
  }
  console.log(`Found ${urls.length} URLs in sitemap.\n`);

  await runPool(urls, async (entry) => {
    try {
      const { status, body } = await fetchText(entry.testUrl);
      results.push(auditPage(entry, status, body));
    } catch (e) {
      results.push({ url: entry.sitemapLoc, errors: [`Fetch failed: ${e.message}`], warns: [] });
    }
  }, CONFIG.concurrency);

  // ---- Uniqueness (cross-page) ----
  for (const [t, list] of titles) if (list.length > 1) {
    for (const u of list) (results.find((r) => r.url === u)?.errors || []).push(`Duplicate <title> (shared by ${list.length} pages)`);
  }
  for (const [d, list] of descs) if (list.length > 1) {
    for (const u of list) (results.find((r) => r.url === u)?.errors || []).push(`Duplicate meta description (shared by ${list.length} pages)`);
  }

  // ---- Report ----
  results.sort((a, b) => a.url.localeCompare(b.url));
  let totalErr = 0, totalWarn = 0;
  const summary = {};
  for (const r of results) {
    totalErr += r.errors.length;
    totalWarn += r.warns.length;
    if (r.errors.length || r.warns.length) {
      console.log((r.errors.length ? '❌ ' : '⚠️  ') + r.url);
      for (const e of r.errors) { console.log(`     ERROR: ${e}`); summary[catOf(e)] = (summary[catOf(e)] || 0) + 1; }
      for (const w of r.warns) console.log(`     warn:  ${w}`);
    } else {
      console.log('✅ ' + r.url);
    }
  }

  console.log('\n──────── SUMMARY ────────');
  console.log(`Pages checked: ${results.length}`);
  console.log(`Errors: ${totalErr}   Warnings: ${totalWarn}`);
  if (Object.keys(summary).length) {
    console.log('\nErrors by type:');
    for (const [k, v] of Object.entries(summary).sort((a, b) => b[1] - a[1])) console.log(`  ${v}\t${k}`);
  }
  console.log('─────────────────────────\n');

  process.exit(totalErr > 0 ? 1 : 0);
}

function catOf(msg) {
  if (msg.startsWith('Title too long')) return 'Title too long';
  if (msg.startsWith('Missing <title>')) return 'Missing title';
  if (msg.startsWith('Meta description too long')) return 'Meta description too long';
  if (msg.startsWith('Missing meta description')) return 'Missing meta description';
  if (msg.startsWith('Duplicate <title>')) return 'Duplicate title';
  if (msg.startsWith('Duplicate meta description')) return 'Duplicate meta description';
  if (msg.includes('canonical') || msg.includes('Canonical')) return 'Canonical issue';
  if (msg.includes('og:')) return 'Open Graph incomplete';
  if (msg.includes('missing alt')) return 'Image missing alt';
  if (msg.includes('width/height')) return 'Image missing dimensions';
  if (msg.includes('<h1>')) return 'H1 issue';
  if (msg.includes('JSON-LD')) return 'Invalid JSON-LD';
  if (msg.includes('returns')) return 'Non-200 sitemap URL';
  return 'Other';
}

main();
