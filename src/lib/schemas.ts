import { SITE_URL, SITE_NAME } from "./site-config";

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
      "Yonovo is an AI-powered accounts receivable automation platform that helps finance teams collect payments faster across email, SMS, voice, and WhatsApp while keeping customer relationships intact.",
    foundingDate: "2024",
    sameAs: [
      "https://www.linkedin.com/company/yonovo",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@yonovo.com",
      contactType: "customer support",
    },
  };
}

// ── WebSite with SearchAction (homepage) ──

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "AI-powered accounts receivable automation. Automate invoice follow-ups across email, SMS, voice, and WhatsApp.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
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
      price: "0",
      priceCurrency: "USD",
      description: "Free tier available",
      url: `${SITE_URL}/pricing`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    featureList: [
      "Automated payment reminders",
      "Multi-channel follow-ups (email, SMS, voice, WhatsApp)",
      "AI-powered collection strategies",
      "Customer risk scoring",
      "Escalation workflows",
      "Real-time AR dashboard",
      "Payment portal for customers",
      "DSO reduction tracking",
    ],
  };
}

// ── SoftwareApplication (pricing page) ──
//
// Uses SoftwareApplication instead of Product to avoid triggering Google's
// Merchant listings evaluation (which expects image, shippingDetails,
// hasMerchantReturnPolicy — none of which apply to SaaS).

export function pricingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${SITE_NAME} AR Automation`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "AI-powered accounts receivable automation platform. Automate invoice follow-ups across email, SMS, voice, and WhatsApp.",
    url: `${SITE_URL}/pricing`,
    image: `${SITE_URL}/yonovo-logo.png`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      priceCurrency: "USD",
      offerCount: "3",
      offers: [
        {
          "@type": "Offer",
          name: "Discover",
          description: "Free AR analytics and benchmarking",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/pricing`,
        },
        {
          "@type": "Offer",
          name: "Grow",
          description:
            "Automation for startups establishing best practices. Built for $0–$10M ARR businesses.",
          url: `${SITE_URL}/pricing`,
        },
        {
          "@type": "Offer",
          name: "Scale",
          description:
            "Best-in-class automation for rapid growth. Built for $10M–$50M ARR businesses.",
          url: `${SITE_URL}/pricing`,
        },
      ],
    },
    featureList: [
      "Automated payment reminders",
      "Multi-channel follow-ups (email, SMS, voice, WhatsApp)",
      "AI-powered collection strategies",
      "Customer risk scoring",
      "Escalation workflows",
      "Real-time AR dashboard",
      "Payment portal for customers",
      "DSO reduction tracking",
    ],
  };
}
