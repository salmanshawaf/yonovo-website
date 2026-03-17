import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostCard from "@/components/blog/BlogPostCard";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import { authors } from "@/content/authors";
import { getAllPosts, postToMeta } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(authors).map((id) => ({ slug: id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = authors[slug];
  if (!author) return {};

  return {
    title: `${author.name} | Blog | Yonovo`,
    description: author.bio,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://yonovo.ai/blog/author/${slug}`,
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = authors[slug];
  if (!author) notFound();

  const posts = getAllPosts()
    .filter((p) => p.frontmatter.author === slug)
    .map(postToMeta);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    worksFor: {
      "@type": "Organization",
      name: "Yonovo",
    },
    url: `https://yonovo.ai/blog/author/${slug}`,
    ...(author.linkedin && { sameAs: [author.linkedin] }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <Navbar defaultMode="light" />

      <main className="min-h-screen pt-16">
        <div className="mx-auto max-w-(--container-max-width) px-6 pt-12 pb-16">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: author.name },
            ]}
          />

          {/* Author card */}
          <div className="mb-12 flex flex-col items-center gap-6 rounded-2xl border border-border p-8 sm:flex-row sm:items-start">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-surface">
              <Image
                src={author.avatar}
                alt={author.name}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-semibold text-foreground">
                {author.name}
              </h1>
              <p className="mt-1 text-sm font-medium text-muted">
                {author.role} at {author.company}
              </p>
              <p className="mt-3 text-secondary leading-relaxed">
                {author.bio}
              </p>
              {author.linkedin && (
                <Link
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-blue hover:underline"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </Link>
              )}
            </div>
          </div>

          {/* Posts by author */}
          <h2 className="mb-6 text-xl font-semibold text-foreground">
            Posts by {author.name}
          </h2>
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogPostCard key={post.frontmatter.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted">No posts yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
