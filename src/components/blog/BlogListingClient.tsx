"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog-types";

const POSTS_PER_PAGE = 9;

type Category = {
  slug: string;
  label: string;
};

type Props = {
  posts: BlogPostMeta[];
  categories: Category[];
};

export default function BlogListingClient({ posts, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [page, setPage] = useState(1);

  const handleCategoryChange = useCallback((slug: string) => {
    setActiveCategory(slug);
    setPage(1);
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter((p) => p.frontmatter.category === activeCategory);
  }, [posts, activeCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(0, page * POSTS_PER_PAGE);
  const hasMore = page < totalPages;

  const activeLabel = activeCategory === "all"
    ? "Blog"
    : categories.find((c) => c.slug === activeCategory)?.label || "Blog";

  return (
    <div className="grid min-h-[68vh] grid-cols-12 md:gap-[60px]">
      {/* Left sidebar — desktop only */}
      <div className="col-span-3 hidden flex-row gap-5 pr-4 lg:flex">
        <div className="sticky top-20 flex h-fit w-full flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-muted">Categories</p>
            <button
              onClick={() => handleCategoryChange("all")}
              className={`text-left text-sm transition-colors ${
                activeCategory === "all"
                  ? "font-bold text-foreground"
                  : "font-medium text-muted hover:font-semibold hover:text-foreground"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`text-left text-sm transition-colors ${
                  activeCategory === cat.slug
                    ? "font-bold text-foreground"
                    : "font-medium text-muted hover:font-semibold hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        {/* Vertical separator */}
        <div className="shrink-0 w-px bg-border" />
      </div>

      {/* Main content area */}
      <section className="col-span-12 flex flex-col gap-8 lg:col-span-9">
        {/* Page heading */}
        <div>
          <h1 className="font-bold text-5xl text-foreground">{activeLabel}</h1>
          <p className="mt-2 text-lg text-muted">
            {activeCategory === "all"
              ? "Insights, strategies, and tools for finance teams that want to collect faster."
              : activeCategory === "guides"
              ? "Step-by-step playbooks for reducing DSO, improving collections, and forecasting cash flow."
              : activeCategory === "insights"
              ? "Analysis and trends on AR automation, finance operations, and the future of collections."
              : activeCategory === "comparisons"
              ? "Side-by-side reviews of AR automation tools to help you pick the right one."
              : ""}
          </p>
        </div>

        {/* Mobile category tabs — visible below lg */}
        <div className="flex w-full flex-row justify-start gap-1 overflow-x-auto rounded-lg bg-surface p-1 lg:hidden">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-white text-foreground shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat.slug
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Post grid — 2 columns on md+ */}
        {paginatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {paginatedPosts.map((post) => (
              <ListingCard key={post.frontmatter.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-muted">No posts found.</p>
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="flex justify-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="rounded-md border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              Load more
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

// ── Listing card ──

function ListingCard({ post }: { post: BlogPostMeta }) {
  const date = new Date(post.frontmatter.publishedAt).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  return (
    <div className="flex h-full flex-col justify-between rounded-md">
      <Link href={`/blog/${post.frontmatter.slug}`} className="flex flex-col gap-2 group">
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
        <h2 className="font-medium text-xl leading-6 text-foreground transition-colors duration-200 ease-in-out">
          {post.frontmatter.title}
        </h2>
        <p className="text-secondary line-clamp-2">
          {post.frontmatter.description}
        </p>
      </Link>
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
