#!/usr/bin/env node
/**
 * Submit www.yonovo.com sitemap URLs to IndexNow.
 *
 * The key is public on purpose. IndexNow checks ownership by fetching
 * https://www.yonovo.com/<key>.txt, and that file must contain the key.
 * Do not add another secret, and do not pass the key on the command line.
 *
 *   npm run indexnow
 *   npm run indexnow -- --dry-run
 *
 * Skips when VERCEL_ENV is set to anything other than production, so a
 * preview build cannot notify IndexNow if this is later wired into the
 * Vercel build. Vercel has no in-repo post-deploy hook. Run this after a
 * production deploy, once /<key>.txt is live, or call it from a Deployment
 * Succeeded webhook. Submitting before the key file is deployed will fail
 * IndexNow's key check.
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "www.yonovo.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const SITEMAP_URL = process.env.SITEMAP_URL || `https://${HOST}/sitemap.xml`;
const KEY_FILE_RE = /^[A-Za-z0-9-]{8,128}\.txt$/;
const MAX_URLS = 10000;

const dryRun = process.argv.includes("--dry-run") || process.env.INDEXNOW_DRY_RUN === "1";

function skipReason() {
  if (process.env.VERCEL && process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return `VERCEL_ENV=${process.env.VERCEL_ENV}`;
  }
  return null;
}

async function loadKey() {
  const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public");
  const names = (await readdir(dir)).filter((name) => KEY_FILE_RE.test(name));
  for (const name of names) {
    const key = name.slice(0, -".txt".length);
    const body = (await readFile(path.join(dir, name), "utf8")).trim();
    if (body === key) return key;
  }
  throw new Error("No IndexNow key file found in public/. Expected public/<key>.txt whose contents are the key.");
}

function sitemapLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((match) => match[1].trim());
}

async function main() {
  const skipped = skipReason();
  if (skipped) {
    console.log(`IndexNow skipped (${skipped}).`);
    return;
  }

  const key = await loadKey();
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Sitemap ${SITEMAP_URL} returned ${res.status}`);
  const xml = await res.text();
  const urls = sitemapLocs(xml).filter((url) => {
    try {
      return new URL(url).host === HOST;
    } catch {
      return false;
    }
  });
  if (urls.length === 0) throw new Error(`Sitemap contained no ${HOST} URLs.`);
  if (urls.length > MAX_URLS) {
    throw new Error(`Sitemap has ${urls.length} URLs. IndexNow accepts ${MAX_URLS} per request.`);
  }

  const payload = {
    host: HOST,
    key,
    keyLocation: `https://${HOST}/${key}.txt`,
    urlList: urls,
  };

  if (dryRun) {
    console.log(`Dry run: ${urls.length} URLs from ${SITEMAP_URL}`);
    console.log(`keyLocation: ${payload.keyLocation}`);
    return;
  }

  const post = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const body = await post.text();
  console.log(`IndexNow ${post.status} for ${urls.length} URLs`);
  if (body) console.log(body);
  if (post.status !== 200 && post.status !== 202) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
