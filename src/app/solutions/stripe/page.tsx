import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { breadcrumbSchema, softwareApplicationSchema, faqSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import StripePage, { faqs } from "@/components/StripePage";

export const metadata: Metadata = {
  title: "Stripe Billing AR Automation",
  description:
    "Automate accounts receivable for Stripe Billing. AI-powered follow-ups via email, SMS, and voice. Go live in one day and reduce DSO.",
  alternates: {
    canonical: `${SITE_URL}/solutions/stripe`,
  },
  openGraph: {
    type: "website",
    title: `Stripe Billing AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for Stripe Billing. AI-powered follow-ups via email, SMS, and voice. Go live in one day.",
    url: `${SITE_URL}/solutions/stripe`,
    siteName: SITE_NAME,
    images: [{ url: "/api/og?title=Stripe%20Billing%20AR%20Automation&category=guides&label=Solution", width: 1200, height: 630, alt: "Stripe Billing AR Automation" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og?title=Stripe%20Billing%20AR%20Automation&category=guides&label=Solution"],
    title: `Stripe Billing AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for Stripe Billing. AI-powered follow-ups via email, SMS, and voice.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions/stripe" }, { name: "Stripe Billing" }]),
        softwareApplicationSchema({ integrationName: "Stripe Billing", description: "Automate accounts receivable for Stripe Billing. AI-powered follow-ups via email, SMS, voice, and WhatsApp.", url: "/solutions/stripe" }),
        faqSchema(faqs),
      ]} />
      <NavbarWrapper defaultMode="dark" />
      <main className="pt-16 min-h-screen">
        <StripePage />
      </main>
      <Footer />
    </>
  );
}
