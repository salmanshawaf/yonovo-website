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

/**
 * Every integration named anywhere on the site, as one list.
 * QuickBooks Online, Sage Intacct, Stripe Billing, and BILL are the specific
 * product names used on their pages. Do not add names that are not already published.
 */
export const YONOVO_INTEGRATION_LIST =
  "QuickBooks Online, Xero, NetSuite, Sage Intacct, Odoo, Stripe Billing, BILL, FreshBooks, Salesforce, HubSpot, SAP, and WhatsApp";
