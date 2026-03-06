import Navbar from "@/components/Navbar";
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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <HeroSection />
        <HighlightsSection />
        <HowItWorksSection />
        <FeaturesSection />
        <ExploreSection />
        <BenefitsSection />
        <AdvantagesSection />
        <TestimonialsSection />
        <SecuritySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
