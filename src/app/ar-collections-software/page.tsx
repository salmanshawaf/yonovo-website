import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { breadcrumbSchema, faqSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import ARCollectionsSoftwarePage, { faqs } from "@/components/ARCollectionsSoftwarePage";

const PAGE_URL = `${SITE_URL}/ar-collections-software`;
const TITLE = "Accounts Receivable Collections Software";
const DESCRIPTION =
  "The full collections workflow: aging buckets, reminder timing before and after the due date, when to switch channels, when to escalate, and how Yonovo runs it for you.";

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
    "Yonovo is accounts receivable collections software that runs the follow up workflow on unpaid invoices across email, SMS, phone, and WhatsApp, escalating and pausing based on the client's rules.",
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
        <ARCollectionsSoftwarePage />
      </main>
      <Footer />
    </>
  );
}
