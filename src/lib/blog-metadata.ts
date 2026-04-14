import type { Metadata } from "next";
import type { BlogPost } from "./blog";
import { getHeroImage } from "./blog";
import { SITE_URL, SITE_NAME } from "./site-config";

// ── JSON-LD Generators ──

export function generateArticleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.ogImage
      ? `${SITE_URL}${post.frontmatter.ogImage}`
      : `${SITE_URL}/api/og?title=${encodeURIComponent(post.frontmatter.title)}&category=${encodeURIComponent(post.frontmatter.category)}`,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: `${SITE_URL}/blog/author/${post.author.id}`,
      jobTitle: post.author.role,
      ...(post.author.linkedin && {
        sameAs: [post.author.linkedin],
      }),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/yonovo-logo.png`,
      },
    },
    datePublished: post.frontmatter.publishedAt,
    ...(post.frontmatter.updatedAt && {
      dateModified: post.frontmatter.updatedAt,
    }),
    mainEntityOfPage: `${SITE_URL}/blog/${post.frontmatter.slug}`,
    inLanguage: "en",
    articleSection: post.frontmatter.category,
    keywords: post.frontmatter.keywords.join(", "),
    about: {
      "@type": "Thing",
      name: post.frontmatter.category,
    },
    mentions: post.frontmatter.keywords.map((keyword) => ({
      "@type": "Thing",
      name: keyword,
    })),
  };
}

export function generateWebPageJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: post.frontmatter.seoTitle || post.frontmatter.title,
    url: `${SITE_URL}/blog/${post.frontmatter.slug}`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".prose", "h2"],
    },
  };
}

export function generateBreadcrumbJsonLd(post: BlogPost) {
  const categoryLabel =
    post.frontmatter.category.charAt(0).toUpperCase() +
    post.frontmatter.category.slice(1).replace(/-/g, " ");

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryLabel,
        item: `${SITE_URL}/blog/category/${post.frontmatter.category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.frontmatter.title,
      },
    ],
  };
}

export function generateFaqJsonLd(post: BlogPost) {
  if (!post.frontmatter.faqs || post.frontmatter.faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.frontmatter.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateAllJsonLd(post: BlogPost): Record<string, any>[] {
  const schemas: Record<string, unknown>[] = [
    generateArticleJsonLd(post),
    generateWebPageJsonLd(post),
    generateBreadcrumbJsonLd(post),
  ];

  const faqSchema = generateFaqJsonLd(post);
  if (faqSchema) schemas.push(faqSchema);

  return schemas;
}

// ── Next.js Metadata Generator ──

export function generateBlogPostMetadata(post: BlogPost): Metadata {
  const title = post.frontmatter.seoTitle || post.frontmatter.title;
  const heroImage = getHeroImage(post);
  const ogImage = post.frontmatter.ogImage || `/api/og?title=${encodeURIComponent(post.frontmatter.title)}&category=${encodeURIComponent(post.frontmatter.category)}`;

  return {
    title,
    description: post.frontmatter.description,
    authors: [{ name: post.author.name }],
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.frontmatter.slug}`,
    },
    openGraph: {
      type: "article",
      title,
      description: post.frontmatter.description,
      url: `${SITE_URL}/blog/${post.frontmatter.slug}`,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: heroImage.alt,
        },
      ],
      publishedTime: post.frontmatter.publishedAt,
      ...(post.frontmatter.updatedAt && {
        modifiedTime: post.frontmatter.updatedAt,
      }),
      tags: post.frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.frontmatter.description,
      images: [ogImage],
    },
  };
}

export function generateBlogListingMetadata(category?: string): Metadata {
  const title = category
    ? `${category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")} | Blog | Yonovo`
    : "Blog | Yonovo";

  const description = category
    ? `Expert ${category.replace(/-/g, " ")} articles on accounts receivable automation, collections, and finance operations from the Yonovo team.`
    : "Expert insights on AR automation, collections strategies, and finance operations to help your team collect faster and improve cash flow.";

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: category
        ? `${SITE_URL}/blog/category/${category}`
        : `${SITE_URL}/blog`,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: category
        ? `${SITE_URL}/blog/category/${category}`
        : `${SITE_URL}/blog`,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
