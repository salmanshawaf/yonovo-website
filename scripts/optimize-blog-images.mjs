#!/usr/bin/env node
/**
 * Convert blog hero PNGs to WebP at source.
 *
 * These heroes already go through next/image, so this does NOT change what a
 * visitor downloads. What it does change:
 *   - repo weight (they were ~700 KB each, 29.5 MB total)
 *   - the RSS enclosure, which links the raw file rather than an optimized one
 *   - the Ahrefs "image file size too large" crawl error
 *   - cold-start optimizer work on Vercel for the largest sources
 *
 * Run with --apply to write files; default is a dry run.
 * Frontmatter heroImage paths must be switched from .png to .webp alongside this.
 */
import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const DIR = "public/images/blog";
const MAX_W = 1600; // heroes render at most 992px CSS wide
const QUALITY = 82;
const APPLY = process.argv.includes("--apply");
const PRUNE = process.argv.includes("--prune-png");

const pngs = readdirSync(DIR).filter((f) => f.endsWith(".png"));
let before = 0;
let after = 0;
const rows = [];

for (const f of pngs) {
  const src = join(DIR, f);
  const dst = src.replace(/\.png$/, ".webp");
  const b = statSync(src).size;
  const meta = await sharp(src).metadata();
  const pipeline = sharp(src);
  if ((meta.width ?? 0) > MAX_W) pipeline.resize({ width: MAX_W });
  const buf = await pipeline.webp({ quality: QUALITY }).toBuffer();
  if (APPLY) {
    await sharp(buf).toFile(dst);
    if (PRUNE) unlinkSync(src);
  }
  before += b;
  after += buf.length;
  rows.push([f, b, buf.length, meta.width, meta.height]);
}

rows.sort((x, y) => y[1] - x[1]);
for (const [f, b, a, w, h] of rows.slice(0, 6)) {
  console.log(
    `  ${f.slice(0, 44).padEnd(46)} ${String(Math.round(b / 1024)).padStart(5)} KB -> ${String(
      Math.round(a / 1024),
    ).padStart(4)} KB  (${w}x${h})`,
  );
}
console.log(`  ... ${rows.length} files total`);
console.log(
  `\n  TOTAL ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB  ` +
    `(${Math.round((1 - after / before) * 100)}% smaller)`,
);
console.log(APPLY ? "\n  APPLIED" : "\n  dry run -- pass --apply to write");
