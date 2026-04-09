import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import ChangelogBackNav from "@/components/changelog/ChangelogBackNav";
import BlogBottomCta from "@/components/blog/BlogBottomCta";

import { getAllEntries, getEntryBySlug } from "@/lib/changelog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const entries = getAllEntries();
  return entries.map((entry) => ({ slug: entry.frontmatter.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);
  if (!entry) return {};

  return {
    title: `${entry.frontmatter.title} | Yonovo Changelog`,
    description: entry.frontmatter.description,
    openGraph: {
      title: `${entry.frontmatter.title} | Yonovo Changelog`,
      description: entry.frontmatter.description,
      url: `https://yonovo.ai/changelog/${slug}`,
      type: "article",
      publishedTime: entry.frontmatter.publishedAt,
      images: [{ url: entry.frontmatter.heroImage, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://yonovo.ai/changelog/${slug}`,
    },
  };
}

export default async function ChangelogEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);
  if (!entry) notFound();

  const date = new Date(entry.frontmatter.publishedAt).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.frontmatter.title,
    description: entry.frontmatter.description,
    datePublished: entry.frontmatter.publishedAt,
    author: {
      "@type": "Person",
      name: entry.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Yonovo",
      url: "https://yonovo.ai",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://yonovo.ai/changelog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <NavbarWrapper defaultMode="light" />

      <main className="min-h-screen pt-16 bg-background">
        <div className="mx-auto max-w-4xl px-6 pt-8 md:pt-12">
          {/* Back nav */}
          <ChangelogBackNav />

          {/* Hero image */}
          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface">
            <Image
              src={entry.frontmatter.heroImage}
              alt={entry.frontmatter.heroImageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Author + date */}
          <div className="mt-6 flex items-center gap-3">
            <Image
              src={entry.author.avatar}
              alt={entry.author.name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="body-sm text-secondary">{date}</span>
          </div>

          {/* Title */}
          <h1 className="mt-4 heading-display text-foreground">
            {entry.frontmatter.title}
          </h1>

          {/* Content */}
          <article className="mt-8 pb-8">
            <div className="prose prose-zinc max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:body-base prose-p:text-secondary prose-a:font-medium prose-a:text-foreground prose-a:underline prose-a:decoration-1 prose-a:underline-offset-2 prose-strong:font-semibold prose-strong:text-foreground prose-li:body-base prose-li:text-secondary">
              <MDXRemote
                source={entry.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypeAutolinkHeadings,
                        {
                          behavior: "prepend",
                          properties: {
                            className: "anchor-link",
                            ariaHidden: true,
                            tabIndex: -1,
                          },
                        },
                      ],
                    ],
                  },
                }}
              />
            </div>
          </article>
        </div>

        {/* Bottom CTA */}
        <BlogBottomCta />
      </main>

      <Footer />
    </>
  );
}
