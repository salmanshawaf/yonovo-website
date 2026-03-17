import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { authors } from "@/content/authors";
import type { BlogFrontmatter, BlogPostMeta, Author } from "./blog-types";

export type { BlogFrontmatter, BlogPostMeta, Author };

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type BlogPost = {
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: number;
  author: Author;
};

export const BLOG_CATEGORIES = [
  { slug: "guides", label: "Guides" },
  { slug: "insights", label: "Insights" },
  { slug: "comparisons", label: "Comparisons" },
] as const;

export const DEFAULT_HERO_IMAGES: Record<string, { src: string; alt: string }> = {
  guides: {
    src: "/images/blog/category-guides.svg",
    alt: "Yonovo Guides",
  },
  insights: {
    src: "/images/blog/category-insights.svg",
    alt: "Yonovo Insights",
  },
  comparisons: {
    src: "/images/blog/category-comparisons.svg",
    alt: "Yonovo Comparisons",
  },
};

function getMdxFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"));
}

function parsePost(fileName: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const frontmatter = data as BlogFrontmatter;

  const author = authors[frontmatter.author];
  if (!author) return null;

  const stats = readingTime(content);

  return {
    frontmatter,
    content,
    readingTime: Math.ceil(stats.minutes),
    author,
  };
}

export function getAllPosts(): BlogPost[] {
  const files = getMdxFiles();
  const posts = files
    .map(parsePost)
    .filter((post): post is BlogPost => post !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((post) => post.frontmatter.slug === slug) ?? null;
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.frontmatter.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) => post.frontmatter.tags.includes(tag));
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const allPosts = getAllPosts().filter(
    (p) => p.frontmatter.slug !== post.frontmatter.slug
  );

  const scored = allPosts.map((p) => {
    let score = 0;
    if (p.frontmatter.category === post.frontmatter.category) score += 2;
    const sharedTags = p.frontmatter.tags.filter((tag) =>
      post.frontmatter.tags.includes(tag)
    );
    score += sharedTags.length;
    return { post: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}

export function extractHeadings(
  content: string
): { id: string; text: string }[] {
  const headingRegex = /^## (.+)$/gm;
  const headings: { id: string; text: string }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ id, text });
  }
  return headings;
}

export function getHeroImage(post: BlogPost): { src: string; alt: string } {
  if (post.frontmatter.heroImage && post.frontmatter.heroImageAlt) {
    return { src: post.frontmatter.heroImage, alt: post.frontmatter.heroImageAlt };
  }
  return (
    DEFAULT_HERO_IMAGES[post.frontmatter.category] ??
    DEFAULT_HERO_IMAGES.insights
  );
}

export function postToMeta(post: BlogPost): BlogPostMeta {
  const hero = getHeroImage(post);
  return {
    frontmatter: post.frontmatter,
    readingTime: post.readingTime,
    author: post.author,
    heroSrc: hero.src,
    heroAlt: hero.alt,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.frontmatter.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}
