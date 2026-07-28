import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { breadcrumbSchema, softwareApplicationSchema, faqSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import OdooPage, { faqs } from "@/components/OdooPage";

export const metadata: Metadata = {
  title: "Odoo AR Automation | Automate Collections for Odoo",
  description:
    "Automate accounts receivable for Odoo Community, Enterprise, and Online. Multi-channel follow-ups via email, SMS, and voice. Go live in one day.",
  alternates: {
    canonical: `${SITE_URL}/solutions/odoo`,
  },
  openGraph: {
    type: "website",
    title: `Odoo AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for Odoo. Multi-channel follow-ups via email, SMS, and voice. Go live in one day.",
    url: `${SITE_URL}/solutions/odoo`,
    siteName: SITE_NAME,
    images: [{ url: "/api/og?title=Odoo%20AR%20Automation%20%7C%20Automate%20Collections%20for%20Odoo&category=guides&label=Solution", width: 1200, height: 630, alt: "Odoo AR Automation | Automate Collections for Odoo" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og?title=Odoo%20AR%20Automation%20%7C%20Automate%20Collections%20for%20Odoo&category=guides&label=Solution"],
    title: `Odoo AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for Odoo. Multi-channel follow-ups via email, SMS, and voice.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions/odoo" }, { name: "Odoo" }]),
        softwareApplicationSchema({ integrationName: "Odoo", description: "Automate accounts receivable for Odoo Community, Enterprise, and Online. Multi-channel follow-ups via email, SMS, voice, and WhatsApp.", url: "/solutions/odoo" }),
        faqSchema(faqs),
      ]} />
      <NavbarWrapper defaultMode="dark" />
      <main className="pt-16 min-h-screen">
        <OdooPage />
      </main>
      <Footer />
    </>
  );
}
