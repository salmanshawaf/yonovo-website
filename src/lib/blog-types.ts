export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin?: string;
  twitter?: string;
  company: string;
};

export type BlogFrontmatter = {
  title: string;
  seoTitle?: string;
  description: string;
  slug: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  tldr: string;
  faqs: { question: string; answer: string }[];
  heroImage?: string;
  heroImageAlt?: string;
  ogImage?: string;
  keywords: string[];
  featured?: boolean;
};

export type BlogPostMeta = {
  frontmatter: BlogFrontmatter;
  readingTime: number;
  author: Author;
  heroSrc: string;
  heroAlt: string;
};
