import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudyPageTemplate from "@/components/CaseStudyPageTemplate";
import { caseStudies } from "@/data/caseStudies";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = caseStudies[slug];
  if (!data) return {};
  return {
    title: data.meta.title,
    description: data.meta.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const data = caseStudies[slug];
  if (!data) notFound();

  return (
    <>
      <Navbar defaultMode="light" />
      <main className="pt-16 min-h-screen">
        <CaseStudyPageTemplate data={data} />
      </main>
      <Footer />
    </>
  );
}
