import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogListingClient from "@/components/blog/BlogListingClient";
import { getAllPosts, postToMeta, BLOG_CATEGORIES } from "@/lib/blog";
import { generateBlogListingMetadata } from "@/lib/blog-metadata";

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

  const posts = getAllPosts().map(postToMeta);

  return (
    <>
      <Navbar defaultMode="light" />

      <main className="min-h-screen pt-16 bg-background">
        <div className="relative mx-auto w-full max-w-(--container-max-width) px-6 py-8 lg:py-12">
          <Suspense fallback={null}>
            <BlogListingClient
              posts={posts}
              categories={BLOG_CATEGORIES.map((c) => ({ slug: c.slug, label: c.label }))}
            />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
