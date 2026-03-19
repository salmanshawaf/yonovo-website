import Image from "next/image";
import Link from "next/link";
import type { ChangelogEntryMeta } from "@/lib/changelog-types";

export default function ChangelogEntryCard({
  entry,
  contentHtml,
}: {
  entry: ChangelogEntryMeta;
  contentHtml: string;
}) {
  const date = new Date(entry.frontmatter.publishedAt).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  return (
    <article className="pb-16">
      {/* Hero image */}
      <Link href={`/changelog/${entry.frontmatter.slug}`} className="group block">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface">
          <Image
            src={entry.frontmatter.heroImage}
            alt={entry.frontmatter.heroImageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      {/* Author + date */}
      <div className="mt-5 flex items-center gap-3">
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
      <Link href={`/changelog/${entry.frontmatter.slug}`}>
        <h2 className="mt-3 heading-section text-foreground transition-colors hover:text-brand-blue">
          {entry.frontmatter.title}
        </h2>
      </Link>

      {/* Full content rendered as HTML */}
      <div
        className="mt-4 prose prose-zinc max-w-none prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3 prose-p:body-base prose-p:text-secondary prose-strong:text-foreground prose-li:body-base prose-li:text-secondary prose-a:text-foreground prose-a:underline prose-a:decoration-1 prose-a:underline-offset-2"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
