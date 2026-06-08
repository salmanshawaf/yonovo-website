#!/usr/bin/env node
/**
 * check-blog-links.mjs — validate internal links in blog MDX against real routes.
 *
 * Catches the failure mode where a generated post links to a page that doesn't
 * exist (e.g. /industries/construction). Builds the set of real internal routes
 * straight from the codebase (no hardcoded list to drift), then flags any
 * internal markdown/href link in blog content that doesn't resolve.
 *
 * USAGE
 *   node scripts/check-blog-links.mjs            # check every post
 *   node scripts/check-blog-links.mjs <slug>     # check one post
 * Exits non-zero if any internal link points to a non-existent route.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "src/content/blog");

function buildRealRoutes() {
  const real = new Set([
    "/", "/pricing", "/book-demo", "/case-studies", "/blog",
    "/changelog", "/careers", "/privacy-policy", "/terms-of-service",
  ]);
  // Industries: object keys in src/data/industries.ts
  const ind = fs.readFileSync(path.join(ROOT, "src/data/industries.ts"), "utf8");
  for (const m of ind.matchAll(/^\s{2}"([a-z-]+)":\s*\{/gm)) real.add(`/industries/${m[1]}`);
  // Solutions: route folders
  for (const d of fs.readdirSync(path.join(ROOT, "src/app/solutions"))) {
    if (fs.statSync(path.join(ROOT, "src/app/solutions", d)).isDirectory()) real.add(`/solutions/${d}`);
  }
  // Tools: route folders (e.g. /tools/dso-calculator)
  const toolsDir = path.join(ROOT, "src/app/tools");
  if (fs.existsSync(toolsDir)) {
    for (const d of fs.readdirSync(toolsDir)) {
      if (fs.statSync(path.join(toolsDir, d)).isDirectory()) real.add(`/tools/${d}`);
    }
  }
  // Blog posts: mdx slugs
  for (const f of fs.readdirSync(BLOG_DIR)) if (f.endsWith(".mdx")) real.add(`/blog/${f.replace(/\.mdx$/, "")}`);
  // Case studies: object keys in src/data/caseStudies.ts
  const cs = fs.readFileSync(path.join(ROOT, "src/data/caseStudies.ts"), "utf8");
  for (const m of cs.matchAll(/^\s{2}"?([a-z0-9-]+)"?:\s*\{/gm)) real.add(`/case-studies/${m[1]}`);
  return real;
}

function internalLinks(src) {
  const out = [];
  // [text](/path) and href="/path"
  for (const m of src.matchAll(/\]\((\/[a-z0-9/_-]*)\)/gi)) out.push(m[1]);
  for (const m of src.matchAll(/href=["'](\/[a-z0-9/_-]*)["']/gi)) out.push(m[1]);
  return out;
}

function main() {
  const real = buildRealRoutes();
  const arg = process.argv[2];
  const files = arg
    ? [`${arg.replace(/\.mdx$/, "")}.mdx`]
    : fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const bad = [];
  for (const f of files) {
    const full = path.join(BLOG_DIR, f);
    if (!fs.existsSync(full)) { console.error(`No such post: ${f}`); process.exit(2); }
    const src = fs.readFileSync(full, "utf8");
    for (const link of internalLinks(src)) {
      const p = link.replace(/\/$/, "") || "/";
      // Category/author archives are generated routes — accept by prefix.
      if (p.startsWith("/blog/category/") || p.startsWith("/blog/author/")) continue;
      if (!real.has(p)) bad.push({ file: f, link });
    }
  }

  if (bad.length) {
    console.error(`\n❌ ${bad.length} blog link(s) point to a route that does not exist:\n`);
    for (const b of bad) console.error(`   ${b.file}  ->  ${b.link}`);
    console.error(`\nLink only to pages that exist. Valid /industries and /solutions slugs are the folders/keys in the repo.`);
    process.exit(1);
  }
  console.log(`✅ All internal blog links resolve (${files.length} post(s) checked, ${real.size} real routes).`);
}

main();
