import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import TldrBlock from "@/components/blog/TldrBlock";
import TableOfContents from "@/components/blog/TableOfContents";
import MobileToc from "@/components/blog/MobileToc";
import SidebarCta from "@/components/blog/SidebarCta";
import ShareButtons from "@/components/blog/ShareButtons";
import FaqSection from "@/components/blog/FaqSection";
import BlogBottomCta from "@/components/blog/BlogBottomCta";
import Callout from "@/components/blog/mdx/Callout";
import InlineCta from "@/components/blog/mdx/InlineCta";

import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  extractHeadings,
  getHeroImage,
  postToMeta,
} from "@/lib/blog";
import {
  generateBlogPostMetadata,
  generateAllJsonLd,
} from "@/lib/blog-metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.frontmatter.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return generateBlogPostMetadata(post);
}

const mdxComponents = {
  Callout,
  InlineCta,
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  if (post.frontmatter.faqs && post.frontmatter.faqs.length > 0) {
    headings.push({ id: "frequently-asked-questions", text: "FAQ" });
  }
  const relatedPosts = getRelatedPosts(post, 3).map(postToMeta);
  const heroImage = getHeroImage(post);
  const jsonLdSchemas = generateAllJsonLd(post);

  const categoryLabel = post.frontmatter.category
    .charAt(0)
    .toUpperCase() + post.frontmatter.category.slice(1).replace(/-/g, " ");

  const date = new Date(post.frontmatter.publishedAt).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  return (
    <>
      {/* JSON-LD structured data */}
      {jsonLdSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <NavbarWrapper defaultMode="light" />

      <main className="min-h-screen pt-16 bg-background">
        {/* Header section */}
        <div className="mx-auto max-w-5xl px-4 pt-12 md:pt-15 lg:pt-25">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: categoryLabel, href: `/blog/category/${post.frontmatter.category}` },
              { label: post.frontmatter.title },
            ]}
          />

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-balance font-medium text-4xl text-foreground md:text-5xl">
              {post.frontmatter.title}
            </h1>

            {/* Meta pills (Chatbase style) */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {/* Author pill */}
              <Link
                href={`/blog/author/${post.author.id}`}
                className="inline-flex h-9 w-fit items-center gap-2.5 rounded-full border border-border bg-white py-1.5 pr-4 pl-2 shadow-xs transition-colors hover:bg-surface"
              >
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span className="text-xs font-medium text-muted">{post.author.name}</span>
              </Link>
              {/* Date pill */}
              <div className="inline-flex h-9 w-fit items-center gap-2.5 rounded-full border border-border bg-white px-4 py-1.5 shadow-xs">
                <span className="text-xs font-medium text-muted">{date}</span>
              </div>
              {/* Read time pill */}
              <div className="inline-flex h-9 w-fit items-center gap-2.5 rounded-full border border-border bg-white px-4 py-1.5 shadow-xs">
                <span className="text-xs font-medium text-muted">{post.readingTime} min read</span>
              </div>
            </div>
          </header>

          {/* Hero image */}
          <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-md bg-surface">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Mobile TOC */}
          <MobileToc headings={headings} />

          {/* Body: Left Sidebar + Content */}
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            {/* Left sidebar — sticky */}
            <aside className="hidden w-full shrink-0 lg:block lg:w-[280px] lg:sticky lg:top-24 lg:self-start">
              <TableOfContents headings={headings} />
              <div className="my-6 h-px w-full bg-border" />
              <ShareButtons slug={post.frontmatter.slug} title={post.frontmatter.title} />
              <div className="my-6 h-px w-full bg-border" />
              <SidebarCta />
            </aside>

            {/* Right — Article content */}
            <article className="flex-1 min-w-0">
              {post.frontmatter.tldr && <TldrBlock text={post.frontmatter.tldr} />}

              <div className="prose prose-zinc max-w-none prose-headings:scroll-mt-20 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-7 prose-a:font-medium prose-a:text-foreground prose-a:underline prose-a:decoration-1 prose-a:underline-offset-2 prose-img:rounded-lg prose-strong:font-semibold prose-strong:text-foreground">
                <MDXRemote
                  source={post.content}
                  components={mdxComponents}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [
                        rehypeSlug,
                        [rehypeAutolinkHeadings, { behavior: "prepend", properties: { className: "anchor-link", ariaHidden: true, tabIndex: -1 } }],
                      ],
                    },
                  }}
                />
              </div>

              <FaqSection faqs={post.frontmatter.faqs} />

              <div className="mt-10 border-t-2 border-dotted border-zinc-300 pt-6 lg:hidden">
                <ShareButtons slug={post.frontmatter.slug} title={post.frontmatter.title} />
              </div>
            </article>
          </div>
        </div>

        {/* Keep reading section */}
        {relatedPosts.length > 0 && (
          <section className="w-full bg-background pt-12 pb-12 md:pt-20 md:pb-20">
            <div className="mx-auto max-w-5xl px-6">
              {/* Badge */}
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-foreground">
                  <span className="h-2 w-2 rounded-full bg-brand-red" />
                  Blog
                </span>
              </div>
              {/* Heading */}
              <h2 className="text-center text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Keep reading
              </h2>
              {/* Cards */}
              <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <KeepReadingCard key={relatedPost.frontmatter.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA (matches case study CTA pattern) */}
        <BlogBottomCta />
      </main>

      <Footer />
    </>
  );
}

/* Keep reading card — dark theme, matches Chatbase's pattern using Yonovo design system */
import type { BlogPostMeta } from "@/lib/blog-types";

function KeepReadingCard({ post }: { post: BlogPostMeta }) {
  const date = new Date(post.frontmatter.publishedAt).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  return (
    <div className="flex h-full flex-col justify-between rounded-md">
      <Link href={`/blog/${post.frontmatter.slug}`} className="flex flex-col gap-2 group">
        {/* Thumbnail */}
        <div className="relative w-full overflow-hidden rounded-md bg-surface">
          <div className="aspect-video overflow-hidden">
            <Image
              src={post.heroSrc}
              alt={post.heroAlt}
              fill
              className="object-cover transition-all duration-200 ease-in-out"
            />
          </div>
        </div>
        {/* Title */}
        <h2 className="font-medium text-xl leading-6 text-foreground transition-colors duration-200 ease-in-out group-hover:text-brand-blue">
          {post.frontmatter.title}
        </h2>
        {/* Description */}
        <p className="text-secondary line-clamp-2">
          {post.frontmatter.description}
        </p>
      </Link>
      {/* Author row */}
      <div className="mt-2 flex select-none flex-row items-center gap-2">
        <Image
          src={post.author.avatar}
          alt={post.author.name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <p className="font-medium text-sm text-foreground">{post.author.name}</p>
        <div className="h-0.5 w-0.5 rounded-full bg-zinc-700" />
        <p className="font-medium text-sm text-foreground">{date}</p>
      </div>
    </div>
  );
}
