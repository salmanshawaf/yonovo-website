import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { authors } from "@/content/authors";
import type { ChangelogFrontmatter, ChangelogEntry, ChangelogEntryMeta } from "./changelog-types";

export type { ChangelogFrontmatter, ChangelogEntry, ChangelogEntryMeta };

const CHANGELOG_DIR = path.join(process.cwd(), "src/content/changelog");

function getMdxFiles(): string[] {
  if (!fs.existsSync(CHANGELOG_DIR)) return [];
  return fs
    .readdirSync(CHANGELOG_DIR)
    .filter((file) => file.endsWith(".mdx"));
}

function parseEntry(fileName: string): ChangelogEntry | null {
  const filePath = path.join(CHANGELOG_DIR, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const frontmatter = data as ChangelogFrontmatter;

  const author = authors[frontmatter.author];
  if (!author) return null;

  return {
    frontmatter,
    content,
    author,
  };
}

export function getAllEntries(): ChangelogEntry[] {
  const files = getMdxFiles();
  return files
    .map(parseEntry)
    .filter((entry): entry is ChangelogEntry => entry !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );
}

export function getEntryBySlug(slug: string): ChangelogEntry | null {
  const entries = getAllEntries();
  return entries.find((entry) => entry.frontmatter.slug === slug) ?? null;
}

export function entryToMeta(entry: ChangelogEntry): ChangelogEntryMeta {
  return {
    frontmatter: entry.frontmatter,
    author: entry.author,
  };
}
