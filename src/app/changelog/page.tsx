import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import ChangelogSocialBanner from "@/components/changelog/ChangelogSocialBanner";
import ChangelogListingClient from "@/components/changelog/ChangelogListingClient";
import { getAllEntries, entryToMeta } from "@/lib/changelog";
import { renderMdxToHtml } from "@/lib/changelog-render";

export const metadata: Metadata = {
  title: "Changelog | Yonovo",
  description:
    "See what's new at Yonovo. Product updates, new features, and improvements to help you collect payments faster.",
  openGraph: {
    title: "Changelog | Yonovo",
    description:
      "See what's new at Yonovo. Product updates, new features, and improvements to help you collect payments faster.",
    url: "https://yonovo.ai/changelog",
    type: "website",
  },
  alternates: {
    canonical: "https://yonovo.ai/changelog",
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

  return (
    <>
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
