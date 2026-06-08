import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import CaseStudyPageTemplate from "@/components/CaseStudyPageTemplate";
import { caseStudies } from "@/data/caseStudies";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = caseStudies[slug];
  if (!data) return {};
  const url = `${SITE_URL}/case-studies/${slug}`;
  const ogImage = `/api/og?title=${encodeURIComponent(data.meta.title)}&category=comparisons`;
  return {
    title: data.meta.title,
    description: data.meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: data.meta.title,
      description: data.meta.description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: data.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.meta.title,
      description: data.meta.description,
      images: [ogImage],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const data = caseStudies[slug];
  if (!data) notFound();

  return (
    <>
      <NavbarWrapper defaultMode="light" />
      <main className="pt-16 min-h-screen bg-background">
        <CaseStudyPageTemplate data={data} />
      </main>
      <Footer />
    </>
  );
}
