import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { homeProductSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProductVideoSection from "@/components/sections/ProductVideoSection";
import HighlightsSection from "@/components/sections/HighlightsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import SecuritySection from "@/components/sections/SecuritySection";
import CTASection from "@/components/sections/CTASection";

const HOME_TITLE = `${SITE_NAME} | AI-Powered Accounts Receivable Automation`;
const HOME_DESCRIPTION =
  "Accounts receivable automation for finance teams. Yonovo follows up on unpaid invoices by email, SMS, and voice so you get paid faster.";

export const metadata: Metadata = {
  // absolute: the root layout template would otherwise append a second "| Yonovo".
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    type: "website",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeProductSchema()} />
      <NavbarWrapper />
      <main className="pt-16 min-h-screen">
        <HeroSection />
        <ProductVideoSection />
        <HighlightsSection />
        <HowItWorksSection />
        <FeaturesSection />
        {/* TODO: BenefitsSection hidden temporarily — re-enable when ready */}
        {/* <BenefitsSection /> */}
        <AdvantagesSection />
        <TestimonialsSection />
        <SecuritySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
