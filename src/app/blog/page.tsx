import { Suspense } from "react";
import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import BlogListingClient from "@/components/blog/BlogListingClient";
import JsonLd from "@/components/JsonLd";
import { getAllPosts, postToMeta, BLOG_CATEGORIES } from "@/lib/blog";
import { generateBlogListingMetadata } from "@/lib/blog-metadata";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schemas";
import { BLOG_LISTING_PAGE_SIZE } from "@/lib/blog-types";
import { SITE_URL } from "@/lib/site-config";

const BLOG_DESCRIPTION =
  "Guides on accounts receivable automation, AR collections, DSO reduction, and getting paid faster.";

export const metadata: Metadata = generateBlogListingMetadata();

export default function BlogPage() {
  const posts = getAllPosts();
  const allMeta = posts.map(postToMeta);
  const visible = posts.slice(0, BLOG_LISTING_PAGE_SIZE);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Blog" }]),
          collectionPageSchema({
            type: "Blog",
            name: "Accounts Receivable Blog",
            description: BLOG_DESCRIPTION,
            url: `${SITE_URL}/blog`,
            items: visible.map((post) => ({
              name: post.frontmatter.title,
              url: `${SITE_URL}/blog/${post.frontmatter.slug}`,
            })),
          }),
        ]}
      />
      <NavbarWrapper defaultMode="light" />

      <main className="min-h-screen pt-16 bg-background">
        <div className="relative mx-auto w-full max-w-(--container-max-width) px-6 py-8 lg:py-12">
          <Suspense fallback={null}>
            <BlogListingClient
              posts={allMeta}
              categories={BLOG_CATEGORIES.map((c) => ({ slug: c.slug, label: c.label }))}
            />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
