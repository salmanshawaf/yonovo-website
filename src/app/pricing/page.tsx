import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { breadcrumbSchema, productPricingSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import PricingPage from "@/components/PricingPage";

export const metadata: Metadata = {
  title: "Accounts Receivable Automation Pricing",
  description:
    "Take control of your accounts receivable. Plans from free analytics to full automation across email, SMS, and voice.",
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    type: "website",
    title: `Accounts Receivable Automation Pricing | ${SITE_NAME}`,
    description:
      "Take control of your accounts receivable. Plans from free analytics to full automation across email, SMS, and voice.",
    url: `${SITE_URL}/pricing`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `Accounts Receivable Automation Pricing | ${SITE_NAME}`,
    description:
      "Take control of your accounts receivable. Plans from free analytics to full automation across email, SMS, and voice.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Pricing" }]),
        productPricingSchema(),
      ]} />
      <NavbarWrapper defaultMode="light" />
      <PricingPage />
      <Footer />
    </>
  );
}
