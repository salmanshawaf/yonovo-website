import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { breadcrumbSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
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
    alternates: {
      canonical: `${SITE_URL}/industries/${slug}`,
    },
    openGraph: {
      type: "website",
      title: data.meta.title,
      description: data.meta.description,
      url: `${SITE_URL}/industries/${slug}`,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: data.meta.title,
      description: data.meta.description,
    },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const data = industries[slug];
  if (!data) notFound();

  const industryName = data.meta.title.split("|")[0].replace("AR Automation for ", "").trim();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Industries", href: `/industries/${slug}` }, { name: industryName }])} />
      <NavbarWrapper defaultMode="light" />
      <main className="pt-16 min-h-screen">
        <IndustryPageTemplate data={data} />
      </main>
      <Footer />
    </>
  );
}
