import { Suspense } from "react";
import { notFound } from "next/navigation";
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

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = BLOG_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};
  return generateBlogListingMetadata(slug);
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = BLOG_CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const posts = getAllPosts();
  const inCategory = posts.filter((post) => post.frontmatter.category === slug);
  const visible = inCategory.slice(0, BLOG_LISTING_PAGE_SIZE);
  const listing = generateBlogListingMetadata(slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: category.label },
          ]),
          collectionPageSchema({
            name: `${category.label} | Accounts Receivable Blog`,
            description: typeof listing.description === "string" ? listing.description : category.label,
            url: `${SITE_URL}/blog/category/${slug}`,
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
              posts={posts.map(postToMeta)}
              categories={BLOG_CATEGORIES.map((c) => ({ slug: c.slug, label: c.label }))}
              initialCategory={slug}
            />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
