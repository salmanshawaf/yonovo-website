import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import GlossaryArticle from "@/components/glossary/GlossaryArticle";
import { glossaryContent } from "@/components/glossary/content";
import { GLOSSARY_DATE, getGlossaryTerm, glossaryPath, glossaryTerms } from "@/data/glossary";
import { articleSchema, breadcrumbSchema, faqSchema, financeCalculatorSchema } from "@/lib/schemas";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return glossaryTerms.map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) return {};

  const url = `${SITE_URL}${glossaryPath(slug)}`;
  return {
    title: term.seoTitle,
    description: term.description,
    authors: [{ name: "Salman Shawaf", url: "/blog/author/salman" }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${term.seoTitle} | ${SITE_NAME}`,
      description: term.description,
      url,
      siteName: SITE_NAME,
      publishedTime: GLOSSARY_DATE,
      modifiedTime: GLOSSARY_DATE,
    },
    twitter: {
      card: "summary_large_image",
      title: `${term.seoTitle} | ${SITE_NAME}`,
      description: term.description,
    },
  };
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  const Content = glossaryContent[slug];
  if (!term || !Content) notFound();

  const url = `${SITE_URL}${glossaryPath(slug)}`;
  const schemas: Record<string, unknown>[] = [
    articleSchema({
      headline: term.h1,
      description: term.description,
      url,
      datePublished: GLOSSARY_DATE,
      dateModified: GLOSSARY_DATE,
      keywords: term.keywords,
    }),
    faqSchema(term.faqs),
    breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Glossary", href: "/glossary" },
      { name: term.breadcrumb },
    ]),
  ];

  if (term.calculator) {
    schemas.push(
      financeCalculatorSchema({
        name: term.calculator.name,
        description: term.calculator.description,
        url,
      }),
    );
  }

  return (
    <>
      <JsonLd data={schemas} />
      <GlossaryArticle term={term}>
        <Content />
      </GlossaryArticle>
    </>
  );
}
