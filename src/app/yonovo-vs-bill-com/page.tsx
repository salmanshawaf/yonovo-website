import type { Metadata } from "next";
import { breadcrumbSchema, faqSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import ComparePageTemplate from "@/components/ComparePageTemplate";
import { comparisons, buildCompareMetadata } from "@/data/comparisons";

const data = comparisons.bill;

export const metadata: Metadata = buildCompareMetadata(data.slug);

export default function YonovoVsBillComPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", href: "/" }, { name: data.hero.headline, href: `/${data.slug}` }]),
          faqSchema(data.faqs),
        ]}
      />
      <NavbarWrapper defaultMode="dark" />
      <main className="pt-16 min-h-screen">
        <ComparePageTemplate data={data} />
      </main>
      <Footer />
    </>
  );
}
