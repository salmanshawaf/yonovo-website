import { Suspense } from "react";
import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import BlogListingClient from "@/components/blog/BlogListingClient";
import { getAllPosts, postToMeta, BLOG_CATEGORIES } from "@/lib/blog";
import { generateBlogListingMetadata } from "@/lib/blog-metadata";

export const metadata: Metadata = generateBlogListingMetadata();

export default function BlogPage() {
  const posts = getAllPosts();
  const allMeta = posts.map(postToMeta);

  return (
    <>
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
