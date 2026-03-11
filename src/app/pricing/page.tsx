import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingPage from "@/components/PricingPage";

export const metadata: Metadata = {
  title: "Pricing | Yonovo",
  description:
    "Pricing adapted to your needs. Take control of your accounts receivable today and unlock your owed cash reserves.",
};

export default function Page() {
  return (
    <>
      <Navbar defaultMode="light" />
      <PricingPage />
      <Footer />
    </>
  );
}
