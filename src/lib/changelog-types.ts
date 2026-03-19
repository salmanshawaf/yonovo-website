import type { Author } from "@/content/authors";

export type ChangelogFrontmatter = {
  title: string;
  slug: string;
  description: string;
  author: string;
  publishedAt: string;
  heroImage: string;
  heroImageAlt: string;
};

export type ChangelogEntry = {
  frontmatter: ChangelogFrontmatter;
  content: string;
  author: Author;
};

export type ChangelogEntryMeta = {
  frontmatter: ChangelogFrontmatter;
  author: Author;
};
