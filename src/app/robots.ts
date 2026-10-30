import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

/**
 * Public pages stay crawlable for Google and for answer engines.
 * Explicit groups for Googlebot, GPTBot, PerplexityBot, Google-Extended, and
 * ClaudeBot repeat the same allow rules as `*` so a later edit cannot block
 * one of them by accident. Do not add Disallow rules for these agents.
 */
const PUBLIC_CRAWL = {
  allow: "/",
  disallow: ["/api/", "/dashboard/", "/account/"],
};

const ANSWER_ENGINE_AGENTS = [
  "Googlebot",
  "GPTBot",
  "PerplexityBot",
  "Google-Extended",
  "ClaudeBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...PUBLIC_CRAWL },
      ...ANSWER_ENGINE_AGENTS.map((userAgent) => ({
        userAgent,
        ...PUBLIC_CRAWL,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
