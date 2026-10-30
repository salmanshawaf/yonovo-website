import { authors } from "@/content/authors";
import { SITE_URL, SITE_NAME, YONOVO_INTEGRATION_LIST } from "./site-config";

/**
 * Shared JSON-LD schema generators for structured data across the site.
 *
 * Usage: import the generator, call it, and render via:
 *   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 */

// ── Organization (homepage) ──

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/yonovo-logo.png`,
    description:
      `Yonovo is accounts receivable automation software that helps finance teams collect payments faster across email, SMS, voice, and WhatsApp. It integrates with ${YONOVO_INTEGRATION_LIST}.`,
    foundingDate: "2024",
    sameAs: [
      "https://www.linkedin.com/company/yonovoai",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@yonovo.com",
      contactType: "customer support",
    },
  };
}

// ── WebSite (site-wide) ──
// No SearchAction: the marketing site has no site search.

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Accounts receivable automation software. Yonovo follows up on unpaid invoices by email, SMS, voice, and WhatsApp.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

// ── SoftwareApplication for the homepage product ──
// Description matches the homepage: email, SMS, voice, and WhatsApp. No price, rating, or review count.

export function homeProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description:
      `Yonovo is accounts receivable automation software that follows up on unpaid invoices by email, SMS, voice, and WhatsApp. It integrates with ${YONOVO_INTEGRATION_LIST}.`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

// ── WebPage (pages that are not an article, product, or collection) ──

export function webPageSchema(opts: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

// ── Collection / blog index ──

export function collectionPageSchema(opts: {
  type?: "CollectionPage" | "Blog";
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: opts.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

// ── Case study Article ──
// Publisher is Yonovo. The customer is the subject (`about`), not the author.

export function caseStudyArticleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  companyName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    mainEntityOfPage: opts.url,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/yonovo-logo.png`,
      },
    },
    about: {
      "@type": "Organization",
      name: opts.companyName,
    },
  };
}

// ── BreadcrumbList ──

type BreadcrumbItem = { name: string; href?: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

// ── FAQPage (solution / landing pages with a visible FAQ) ──

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

// ── SoftwareApplication (solution pages) ──

export function softwareApplicationSchema(opts: {
  integrationName: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${SITE_NAME} for ${opts.integrationName}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: opts.description,
    url: `${SITE_URL}${opts.url}`,
    offers: {
      "@type": "Offer",
      description: "Custom pricing. Book a demo.",
      url: `${SITE_URL}/pricing`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    featureList: [
      "Follow-ups by email, SMS, voice, and WhatsApp",
      `Integrations: ${YONOVO_INTEGRATION_LIST}`,
    ],
  };
}

// ── SoftwareApplication (pricing page) ──
//
// Uses SoftwareApplication instead of Product to avoid triggering Google's
// Merchant listings evaluation (which expects image, shippingDetails,
// hasMerchantReturnPolicy — none of which apply to SaaS).

// ── Article (glossary and other editorial pages) ──

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  keywords?: string[];
}) {
  const author = authors.salman;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    image: `${SITE_URL}/og-default.png`,
    author: {
      "@type": "Person",
      name: author.name,
      url: `${SITE_URL}/blog/author/${author.id}`,
      jobTitle: author.role,
      ...(author.linkedin ? { sameAs: [author.linkedin] } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/yonovo-logo.png`,
      },
    },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    mainEntityOfPage: opts.url,
    inLanguage: "en",
    ...(opts.keywords && opts.keywords.length > 0
      ? { keywords: opts.keywords.join(", ") }
      : {}),
  };
}

// ── WebApplication (free calculators) ──

export function financeCalculatorSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: opts.url,
    description: opts.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function pricingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${SITE_NAME} AR Automation`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Accounts receivable automation plans sized to company revenue. Discover is analytics and benchmarking. Grow and Scale add collections automation. Pricing is a custom quote.",
    url: `${SITE_URL}/pricing`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: [
      {
        "@type": "Offer",
        name: "Discover",
        description:
          "Deep analytics tool for data discovery and benchmarking against your peers. For finance teams exploring AR health for the first time.",
        url: `${SITE_URL}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Grow",
        description:
          "Insight and automation to ensure effective cash flow and protect business resources as you establish your company. Built for $0-$10M ARR.",
        url: `${SITE_URL}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Scale",
        description:
          "Build the foundations for rapid growth through best in class financial practices, to scale your business without scaling your team. Built for $10M-$50M ARR.",
        url: `${SITE_URL}/pricing`,
      },
    ],
  };
}
