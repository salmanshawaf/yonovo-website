import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { breadcrumbSchema, faqSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import DebtCollectionSoftwarePage, { faqs } from "@/components/DebtCollectionSoftwarePage";

const PAGE_URL = `${SITE_URL}/debt-collection-software`;
const TITLE = "Debt Collection Software for B2B Invoices";
const DESCRIPTION =
  "Software for businesses collecting their own unpaid B2B invoices. Yonovo follows up by email, SMS, phone, and WhatsApp under your brand. Not an agency, and no cut of what you recover.";

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

// Bespoke SoftwareApplication schema; the shared helper names itself
// "Yonovo for {integration}", which is wrong for a category page.
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: PAGE_URL,
  description:
    "Yonovo is debt collection software for businesses collecting their own unpaid B2B invoices, following up across email, SMS, phone, and WhatsApp under the client's own brand.",
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", href: "/" }, { name: TITLE }]),
        softwareSchema,
        faqSchema(faqs),
      ]} />
      <NavbarWrapper defaultMode="dark" />
      <main className="pt-16 min-h-screen">
        <DebtCollectionSoftwarePage />
      </main>
      <Footer />
    </>
  );
}
