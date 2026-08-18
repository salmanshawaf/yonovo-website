import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { breadcrumbSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import ARStatisticsPage from "@/components/ARStatisticsPage";
import { STATS, STAT_COUNT, STATS_YEAR, LAST_UPDATED } from "@/data/arStatistics";

const PAGE_URL = `${SITE_URL}/accounts-receivable-statistics`;
const TITLE = `Accounts Receivable Statistics (${STATS_YEAR})`;
const DESCRIPTION = `${STAT_COUNT} accounts receivable statistics for ${STATS_YEAR} covering late payments, DSO, collections cost, automation adoption, cash flow, and small business impact. Every figure links to its original source.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
  },
};

// Distinct primary publishers cited on the page, for the Dataset citation
// array. Derived from the data so it can never drift from the page content.
const publisherCitations = Array.from(
  new Map(STATS.map((s) => [s.sourceName, { "@type": "CreativeWork", name: s.sourceName, url: s.sourceUrl }])).values()
);

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: TITLE,
  url: PAGE_URL,
  description: DESCRIPTION,
  datePublished: "2026-08-17",
  dateModified: LAST_UPDATED === "August 2026" ? "2026-08-17" : undefined,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#key-takeaways"],
  },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: `Accounts Receivable Statistics ${STATS_YEAR}`,
  description: `A curated compilation of ${STAT_COUNT} verified accounts receivable statistics covering late payment behavior, DSO and aging, collections cost and effort, automation adoption, cash flow impact, and small business impact. Every figure is linked to its original publisher.`,
  url: PAGE_URL,
  creator: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  temporalCoverage: "2023/2026",
  citation: publisherCitations,
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", href: "/" }, { name: `Accounts Receivable Statistics` }]),
        webPageSchema,
        datasetSchema,
      ]} />
      <NavbarWrapper defaultMode="dark" />
      <main className="pt-16 min-h-screen">
        <ARStatisticsPage />
      </main>
      <Footer />
    </>
  );
}
