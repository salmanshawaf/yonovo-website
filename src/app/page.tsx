import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import HighlightsSection from "@/components/sections/HighlightsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ExploreSection from "@/components/sections/ExploreSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import SecuritySection from "@/components/sections/SecuritySection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: `${SITE_NAME} | AI-Powered Accounts Receivable Automation`,
  description:
    "Automate invoice follow-ups across email, SMS, and voice. Yonovo connects to your accounting system and handles collections so your team can focus on growth.",
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    type: "website",
    title: `${SITE_NAME} | AI-Powered Accounts Receivable Automation`,
    description:
      "Automate invoice follow-ups across email, SMS, and voice. Yonovo handles AR collections so your team can focus on growth.",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | AI-Powered Accounts Receivable Automation`,
    description:
      "Automate invoice follow-ups across email, SMS, and voice. Yonovo handles AR collections so your team can focus on growth.",
  },
};

export default function Home() {
  return (
    <>
      <NavbarWrapper />
      <main className="pt-16 min-h-screen">
        <HeroSection />
        <HighlightsSection />
        <HowItWorksSection />
        <FeaturesSection />
        <ExploreSection />
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
