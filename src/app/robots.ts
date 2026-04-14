import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/account/"],
      },
      // Intentionally do NOT block AI crawlers (GPTBot, ClaudeBot, PerplexityBot).
      // This is a deliberate decision to maximize AI search visibility.
      // Revisit if content licensing or training data concerns arise.
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
