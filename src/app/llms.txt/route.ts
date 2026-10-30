import { getAllPosts } from "@/lib/blog";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/caseStudies";
import { SITE_URL } from "@/lib/site-config";

// How many of the most recent blog posts to surface in llms.txt.
// Capped to keep the file high-signal; the full archive lives at /blog.
const MAX_BLOG_POSTS = 15;

// Evergreen guides worth citing even when they fall out of the recent list.
const KEY_GUIDE_SLUGS = [
  "what-is-ar-automation",
  "how-to-reduce-dso",
  "invoice-reminder-best-practices",
  "dunning-letter",
  "cash-collections-formula",
  "best-ar-automation-software",
];

const COMPARISONS: { slug: string; name: string }[] = [
  { slug: "yonovo-vs-upflow", name: "Yonovo vs Upflow" },
  { slug: "yonovo-vs-chaser", name: "Yonovo vs Chaser" },
  { slug: "yonovo-vs-invoiced", name: "Yonovo vs Invoiced" },
  { slug: "yonovo-vs-bill-com", name: "Yonovo vs Bill.com" },
];

const INTEGRATIONS: { slug: string; name: string; description: string }[] = [
  {
    slug: "quickbooks",
    name: "QuickBooks Integration",
    description:
      "Two-way sync with QuickBooks to automate collections directly from your invoices and aging reports.",
  },
  {
    slug: "xero",
    name: "Xero Integration",
    description:
      "Connect Xero to automate accounts receivable follow-ups and reconcile payments without manual entry.",
  },
  {
    slug: "netsuite",
    name: "NetSuite Integration",
    description:
      "Automate AR for NetSuite finance teams with personalized follow-ups across email, SMS, and voice.",
  },
  {
    slug: "odoo",
    name: "Odoo Integration",
    description:
      "Sync Odoo invoices into Yonovo to chase overdue payments automatically while keeping ERP data in sync.",
  },
  {
    slug: "sage",
    name: "Sage Integration",
    description:
      "Connect Sage to reduce DSO with automated, relationship-safe collections workflows.",
  },
  {
    slug: "stripe",
    name: "Stripe Billing Integration",
    description:
      "Automate accounts receivable for Stripe Billing with AI-powered follow-ups via email, SMS, and voice.",
  },
  {
    slug: "bill",
    name: "BILL (Bill.com) Integration",
    description:
      "Automate accounts receivable for BILL, formerly Bill.com, with AI-powered follow-ups via email, SMS, and voice, plus pay-now links.",
  },
];

export async function GET() {
  const allPosts = getAllPosts();
  const posts = allPosts.slice(0, MAX_BLOG_POSTS);
  const keyGuides = KEY_GUIDE_SLUGS.flatMap((slug) => {
    const post = allPosts.find((p) => p.frontmatter.slug === slug);
    return post ? [post] : [];
  });

  const productLinks = [
    `- [Yonovo Homepage](${SITE_URL}): Overview of the Yonovo accounts receivable automation platform.`,
    `- [Accounts Receivable Automation Software](${SITE_URL}/accounts-receivable-automation-software): Category guide comparing Yonovo with nine other AR automation platforms on setup time, channels, integrations, and pricing.`,
    `- [Debt Collection Software for B2B Invoices](${SITE_URL}/debt-collection-software): Software for businesses collecting their own unpaid B2B invoices under their own brand, contrasted with consumer collections and third party agencies.`,
    `- [Accounts Receivable Collections Software](${SITE_URL}/ar-collections-software): The full collections workflow, day by day: reminder timing, aging buckets, channel switching, escalation, and reporting.`,
    `- [Dunning Management Software](${SITE_URL}/dunning-management-software): What dunning is, the four stage dunning sequence, and how automated dunning adapts per customer.`,
    `- [Accounts Receivable Statistics](${SITE_URL}/accounts-receivable-statistics): Verified AR statistics on late payments, DSO, collections cost, automation adoption, cash flow, and small business impact, each linked to its original source.`,
    `- [Pricing](${SITE_URL}/pricing): Plans and pricing for Yonovo's AR automation platform.`,
    `- [Book a Demo](${SITE_URL}/book-demo): Schedule a live demo with the Yonovo team.`,
    `- [DSO Calculator](${SITE_URL}/tools/dso-calculator): Free tool to calculate your Days Sales Outstanding and benchmark collections performance.`,
  ].join("\n");

  const integrationLinks = INTEGRATIONS.map(
    (i) => `- [${i.name}](${SITE_URL}/solutions/${i.slug}): ${i.description}`,
  ).join("\n");

  const industryLinks = Object.values(industries)
    .map(
      (ind) =>
        `- [${ind.hero.badge}](${SITE_URL}/industries/${ind.slug}): ${ind.meta.description}`,
    )
    .join("\n");

  const caseStudyLinks = [
    `- [Case Studies](${SITE_URL}/case-studies): Real-world results from finance teams using Yonovo.`,
    ...Object.values(caseStudies).map(
      (cs) =>
        `- [${cs.card.companyName}](${SITE_URL}/case-studies/${cs.slug}): ${cs.meta.description}`,
    ),
  ].join("\n");

  const blogLinks = posts
    .map(
      (p) =>
        `- [${p.frontmatter.title}](${SITE_URL}/blog/${p.frontmatter.slug}): ${p.frontmatter.description}`,
    )
    .join("\n");

  const guideLinks = keyGuides
    .map(
      (p) =>
        `- [${p.frontmatter.title}](${SITE_URL}/blog/${p.frontmatter.slug}): ${p.frontmatter.description}`,
    )
    .join("\n");

  const comparisonLinks = COMPARISONS.map(
    (c) => `- [${c.name}](${SITE_URL}/${c.slug}): Side-by-side comparison of Yonovo and ${c.name.replace("Yonovo vs ", "")} for accounts receivable automation.`,
  ).join("\n");

  const content = `# Yonovo

> Yonovo is accounts receivable automation software for finance teams, including CFOs, controllers, and heads of finance at B2B companies in the United States and Canada. It connects to the accounting system and follows up on unpaid invoices so companies collect faster without sending accounts to a collection agency.

Yonovo covers the collections side of invoice-to-cash: reminders, dunning sequences, escalation, and days sales outstanding (DSO). It does not publish a dollar price. Plans are Discover (analytics and benchmarking), Grow (up to $10M ARR), and Scale ($10M to $50M ARR). Quotes are custom.

Channels named in product copy: email, SMS, and voice (phone). The accounts receivable automation, collections, debt collection, and dunning pages also name WhatsApp. The homepage logo wall also shows FreshBooks, Salesforce, HubSpot, SAP, and WhatsApp. Integration pages describe QuickBooks Online, Xero, NetSuite, Sage, Odoo, Stripe Billing, and BILL.

## Product
${productLinks}

## Comparisons
${comparisonLinks}

## Guides
${guideLinks}

## Integrations
${integrationLinks}

## Industries
${industryLinks}

## Case Studies
${caseStudyLinks}

## Blog
The ${MAX_BLOG_POSTS} most recent posts. Full archive at ${SITE_URL}/blog.
${blogLinks}

## Optional
- [Changelog](${SITE_URL}/changelog): Product updates and release notes.
- [Careers](${SITE_URL}/careers): Open roles at Yonovo.
- [Privacy Policy](${SITE_URL}/privacy-policy): How Yonovo collects and handles data.
- [Terms of Service](${SITE_URL}/terms-of-service): Terms governing use of Yonovo.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
