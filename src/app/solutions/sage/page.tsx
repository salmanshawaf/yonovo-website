import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { breadcrumbSchema, softwareApplicationSchema, faqSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import SagePage, { faqs } from "@/components/SagePage";

export const metadata: Metadata = {
  title: "Sage AR Automation | Automate Collections for Sage",
  description:
    "Automate accounts receivable for Sage. Sync invoices, send follow-ups via email, SMS, voice, and WhatsApp, and reduce DSO. Go live in one day.",
  alternates: {
    canonical: `${SITE_URL}/solutions/sage`,
  },
  openGraph: {
    type: "website",
    title: `Sage AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for Sage. Sync invoices, send follow-ups via email, SMS, voice, and WhatsApp, and reduce DSO.",
    url: `${SITE_URL}/solutions/sage`,
    siteName: SITE_NAME,
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Sage AR Automation | Automate Collections for Sage" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
    title: `Sage AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for Sage. Sync invoices, send follow-ups via email, SMS, voice, and WhatsApp.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Sage" }]),
        softwareApplicationSchema({ integrationName: "Sage", description: "Automate accounts receivable for Sage. Sync invoices, send follow-ups via email, SMS, voice, and WhatsApp, and reduce DSO. Go live in one day.", url: "/solutions/sage" }),
        faqSchema(faqs),
      ]} />
      <NavbarWrapper defaultMode="dark" />
      <main className="pt-16 min-h-screen">
        <SagePage />
      </main>
      <Footer />
    </>
  );
}
