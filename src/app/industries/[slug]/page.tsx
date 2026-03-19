import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";
import { industries } from "@/data/industries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = industries[slug];
  if (!data) return {};
  return {
    title: data.meta.title,
    description: data.meta.description,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const data = industries[slug];
  if (!data) notFound();

  return (
    <>
      <NavbarWrapper defaultMode="light" />
      <main className="pt-16 min-h-screen">
        <IndustryPageTemplate data={data} />
      </main>
      <Footer />
    </>
  );
}
