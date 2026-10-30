import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { breadcrumbSchema, faqSchema, pricingSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import PricingPage from "@/components/PricingPage";
import { pricingFaqs } from "@/data/pricingFaqs";

const DESCRIPTION =
  "Take control of your accounts receivable. Plans from free analytics to full automation across email, SMS, voice, and WhatsApp.";

export const metadata: Metadata = {
  title: "Accounts Receivable Automation Pricing",
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    type: "website",
    title: `Accounts Receivable Automation Pricing | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/pricing`,
    siteName: SITE_NAME,
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
    title: `Accounts Receivable Automation Pricing | ${SITE_NAME}`,
    description: DESCRIPTION,
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Pricing" }]),
        pricingSchema(),
        faqSchema(pricingFaqs),
      ]} />
      <NavbarWrapper defaultMode="light" />
      <PricingPage />
      <Footer />
    </>
  );
}
