/**
 * Centralized site configuration.
 *
 * Every file that needs the canonical domain (sitemap, robots, metadata,
 * RSS, llms.txt, JSON-LD, OG tags, share URLs) MUST import from here.
 * This prevents domain drift — the yonovo.ai → www.yonovo.com mismatch
 * happened because the domain was hardcoded in 6+ separate files.
 */

export const SITE_URL = "https://www.yonovo.com";
export const SITE_NAME = "Yonovo";
