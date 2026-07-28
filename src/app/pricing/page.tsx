import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { breadcrumbSchema, pricingSchema } from "@/lib/schemas";
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
    images: [{ url: "/api/og?title=Pricing", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og?title=Pricing"],
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
        pricingSchema(),
      ]} />
      <NavbarWrapper defaultMode="light" />
      <PricingPage />
      <Footer />
    </>
  );
}
