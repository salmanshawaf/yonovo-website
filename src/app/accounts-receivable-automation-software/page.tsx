import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { breadcrumbSchema, faqSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import ARAutomationSoftwarePage, { faqs } from "@/components/ARAutomationSoftwarePage";

const PAGE_URL = `${SITE_URL}/accounts-receivable-automation-software`;
const TITLE = "Accounts Receivable Automation Software";
const DESCRIPTION =
  "Compare the top accounts receivable automation platforms on setup time, channels, integrations, and pricing. See how Yonovo runs collections for you across email, SMS, phone, and WhatsApp.";

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

// Bespoke SoftwareApplication schema. The shared softwareApplicationSchema()
// helper names itself "Yonovo for {integration}", which is wrong for a
// category page, so this page carries its own minimal object.
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: PAGE_URL,
  description:
    "Yonovo is accounts receivable automation software that connects to your accounting system and runs invoice collections across email, SMS, phone, and WhatsApp.",
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
        <ARAutomationSoftwarePage />
      </main>
      <Footer />
    </>
  );
}
