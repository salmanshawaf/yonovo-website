import Link from "next/link";
import Image from "next/image";
import type { BlogPostMeta } from "@/lib/blog-types";

export default function BlogPostCard({
  post,
  featured = false,
}: {
  post: BlogPostMeta;
  featured?: boolean;
}) {
  const date = new Date(post.frontmatter.publishedAt).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  if (featured) {
    return (
      <Link href={`/blog/${post.frontmatter.slug}`} className="group block">
        <article className="overflow-hidden rounded-2xl border border-border transition-shadow hover:shadow-lg">
          <div className="relative aspect-[2/1] w-full overflow-hidden bg-surface">
            <Image
              src={post.heroSrc}
              alt={post.heroAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              priority
            />
          </div>
          <div className="p-6 md:p-8">
            <span className="inline-block rounded-full bg-brand-green/10 px-3 py-1 text-xs font-medium text-brand-green capitalize">
              {post.frontmatter.category.replace(/-/g, " ")}
            </span>
            <h2 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
              {post.frontmatter.title}
            </h2>
            <p className="mt-2 text-secondary line-clamp-2">
              {post.frontmatter.description}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-surface overflow-hidden">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <span className="font-medium text-foreground">{post.author.name}</span>
                <span>&middot;</span>
                <span>{date}</span>
                <span>&middot;</span>
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.frontmatter.slug}`} className="group block">
      <article className="overflow-hidden rounded-xl border border-border transition-shadow hover:shadow-md h-full flex flex-col">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface">
          <Image
            src={post.heroSrc}
            alt={post.heroAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span className="inline-block w-fit rounded-full bg-brand-green/10 px-3 py-1 text-xs font-medium text-brand-green capitalize">
            {post.frontmatter.category.replace(/-/g, " ")}
          </span>
          <h3 className="mt-3 text-lg font-semibold text-foreground line-clamp-2">
            {post.frontmatter.title}
          </h3>
          <p className="mt-2 flex-1 text-sm text-secondary line-clamp-2">
            {post.frontmatter.description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted">
            <span className="font-medium text-foreground">{post.author.name}</span>
            <span>&middot;</span>
            <span>{date}</span>
            <span>&middot;</span>
            <span>{post.readingTime} min</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
