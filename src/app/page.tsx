import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { organizationSchema, webSiteSchema } from "@/lib/schemas";
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

export const metadata: Metadata = {
  title: `${SITE_NAME} | AI-Powered Accounts Receivable Automation`,
  description:
    "Automate invoice follow-ups across email, SMS, and voice. Yonovo connects to your accounting system and collects overdue invoices so you get paid faster.",
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
    images: [{ url: "/api/og?title=AI-Powered%20Accounts%20Receivable%20Automation&subtitle=Automate%20invoice%20follow-ups%20across%20email%2C%20SMS%2C%20and%20voice.", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og?title=AI-Powered%20Accounts%20Receivable%20Automation&subtitle=Automate%20invoice%20follow-ups%20across%20email%2C%20SMS%2C%20and%20voice."],
    title: `${SITE_NAME} | AI-Powered Accounts Receivable Automation`,
    description:
      "Automate invoice follow-ups across email, SMS, and voice. Yonovo handles AR collections so your team can focus on growth.",
  },
};

export default function Home() {
  const orgSchema = organizationSchema();
  const siteSchema = webSiteSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
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
