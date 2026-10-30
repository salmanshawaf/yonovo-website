import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import ChangelogSocialBanner from "@/components/changelog/ChangelogSocialBanner";
import ChangelogListingClient from "@/components/changelog/ChangelogListingClient";
import JsonLd from "@/components/JsonLd";
import { getAllEntries, entryToMeta } from "@/lib/changelog";
import { renderMdxToHtml } from "@/lib/changelog-render";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schemas";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

const DESCRIPTION =
  "Yonovo changelog: product updates for accounts receivable automation, collections, and integrations.";
const PAGE_URL = `${SITE_URL}/changelog`;
/** First screen of /changelog. Matches ENTRIES_PER_PAGE in ChangelogListingClient. */
const VISIBLE_ENTRIES = 5;

export const metadata: Metadata = {
  title: { absolute: "Changelog | Yonovo" },
  description: DESCRIPTION,
  openGraph: {
    title: "Changelog | Yonovo",
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Changelog | Yonovo",
    description: DESCRIPTION,
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

export default async function ChangelogPage() {
  const entries = getAllEntries();
  const serialized = await Promise.all(
    entries.map(async (entry) => ({
      meta: entryToMeta(entry),
      contentHtml: await renderMdxToHtml(entry.content),
    }))
  );

  const visible = entries.slice(0, VISIBLE_ENTRIES);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Changelog" }]),
          collectionPageSchema({
            name: `Changelog | ${SITE_NAME}`,
            description: DESCRIPTION,
            url: PAGE_URL,
            items: visible.map((entry) => ({
              name: entry.frontmatter.title,
              url: `${SITE_URL}/changelog/${entry.frontmatter.slug}`,
            })),
          }),
        ]}
      />
      <NavbarWrapper defaultMode="light" />
      <main className="min-h-screen pt-16 bg-background">
        <div className="mx-auto w-full max-w-5xl px-4 md:px-20">
          {/* Header */}
          <div className="pt-12 md:pt-16">
            <h1 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
              Changelog
            </h1>
          </div>

          {/* Social banner */}
          <ChangelogSocialBanner />

          {/* Entries */}
          <ChangelogListingClient entries={serialized} />
        </div>
      </main>
      <Footer />
    </>
  );
}
