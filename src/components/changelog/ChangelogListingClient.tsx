"use client";

import { useState } from "react";
import ChangelogTimeline from "./ChangelogTimeline";
import ChangelogEntryCard from "./ChangelogEntryCard";
import type { ChangelogEntryMeta } from "@/lib/changelog-types";

type EntryWithContent = {
  meta: ChangelogEntryMeta;
  contentHtml: string;
};

const ENTRIES_PER_PAGE = 5;

export default function ChangelogListingClient({
  entries,
}: {
  entries: EntryWithContent[];
}) {
  const [visibleCount, setVisibleCount] = useState(ENTRIES_PER_PAGE);
  const visibleEntries = entries.slice(0, visibleCount);
  const hasMore = visibleCount < entries.length;

  return (
    <div className="relative mx-auto h-full w-full max-w-4xl">
      <ChangelogTimeline count={visibleEntries.length}>
        {visibleEntries.map((entry) => (
          <ChangelogEntryCard
            key={entry.meta.frontmatter.slug}
            entry={entry.meta}
            contentHtml={entry.contentHtml}
          />
        ))}
      </ChangelogTimeline>

      {hasMore && (
        <div className="flex justify-center pb-16 md:pl-16">
          <button
            onClick={() => setVisibleCount((prev) => prev + ENTRIES_PER_PAGE)}
            className="rounded-lg border border-border bg-white px-8 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
