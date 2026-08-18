import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { breadcrumbSchema, faqSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import DunningManagementSoftwarePage, { faqs } from "@/components/DunningManagementSoftwarePage";

const PAGE_URL = `${SITE_URL}/dunning-management-software`;
const TITLE = "Dunning Management Software";
const DESCRIPTION =
  "What dunning is, what a dunning sequence should contain stage by stage, and how Yonovo runs dunning that adapts to each customer instead of blasting the same template.";

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
    "Yonovo is dunning management software that runs escalating payment reminder sequences across email, SMS, phone, and WhatsApp, pausing for disputes and adapting to each customer.",
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
        <DunningManagementSoftwarePage />
      </main>
      <Footer />
    </>
  );
}
