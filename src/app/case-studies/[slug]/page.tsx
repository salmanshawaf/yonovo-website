import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import CaseStudyPageTemplate from "@/components/CaseStudyPageTemplate";
import { caseStudies } from "@/data/caseStudies";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, caseStudyArticleSchema } from "@/lib/schemas";

const MONTHS: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

/** "March 11, 2026" -> "2026-03-11". Returns the original string if it does not match. */
function visibleDateToIso(display: string): string {
  const match = display.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (!match) return display;
  const month = MONTHS[match[1].toLowerCase()];
  if (!month) return display;
  return `${match[3]}-${month}-${match[2].padStart(2, "0")}`;
}

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = caseStudies[slug];
  if (!data) return {};
  const url = `${SITE_URL}/case-studies/${slug}`;
  const ogImage = "/og-default.png";
  return {
    // `absolute` bypasses the root layout's "%s | Yonovo" template; the case
    // study title already ends in "| Yonovo Case Study", so without this it
    // would render doubled.
    title: { absolute: data.meta.title },
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

  const url = `${SITE_URL}/case-studies/${slug}`;
  const published = visibleDateToIso(data.hero.date);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Case Studies", href: "/case-studies" },
            { name: data.card.companyName },
          ]),
          caseStudyArticleSchema({
            headline: data.card.title,
            description: data.card.summary,
            url,
            datePublished: published,
            companyName: data.card.companyName,
          }),
        ]}
      />
      <NavbarWrapper defaultMode="light" />
      <main className="pt-16 min-h-screen bg-background">
        <CaseStudyPageTemplate data={data} />
      </main>
      <Footer />
    </>
  );
}
