import type { MetadataRoute } from "next";
import { getAllPosts, BLOG_CATEGORIES } from "@/lib/blog";
import { authors } from "@/content/authors";
import { caseStudies } from "@/data/caseStudies";
import { jobs } from "@/data/jobs";
import { getAllEntries } from "@/lib/changelog";
import { SITE_URL } from "@/lib/site-config";

/**
 * lastmod policy:
 * - Editorial URLs use the date shown on the page (post updated/published, changelog
 *   publishedAt, case study hero date, job datePosted).
 * - Pages whose metadata or structured data changed in the Oct 2026 SEO pass use
 *   SEO_UPDATED.
 * - Comparison and statistics pages were not edited here; lastmod is their last
 *   content commit (2026-08-17).
 * - Legal pages use the "Last Updated" date printed on the page (2026-04-08).
 * Non-indexable routes (print views, /og-preview) are omitted.
 */
const SEO_UPDATED = new Date("2026-10-30");
const CONTENT_2026_08_17 = new Date("2026-08-17");
const LEGAL_UPDATED = new Date("2026-04-08");

function page(url: string, lastModified: Date, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], priority: number): MetadataRoute.Sitemap[number] {
  return { url, lastModified, changeFrequency, priority };
}

function latestIso(dates: (string | undefined)[]): Date {
  const times = dates
    .filter((d): d is string => Boolean(d))
    .map((d) => new Date(d).getTime())
    .filter((t) => !Number.isNaN(t));
  if (times.length === 0) return SEO_UPDATED;
  return new Date(Math.max(...times));
}

/** "March 11, 2026" -> Date. Falls back to SEO_UPDATED if unparseable. */
function displayDate(display: string): Date {
  const parsed = new Date(display);
  return Number.isNaN(parsed.getTime()) ? SEO_UPDATED : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const entries = getAllEntries();

  const staticPages: MetadataRoute.Sitemap = [
    page(SITE_URL, SEO_UPDATED, "weekly", 1),
    page(`${SITE_URL}/pricing`, SEO_UPDATED, "monthly", 0.8),
    page(`${SITE_URL}/accounts-receivable-automation-software`, SEO_UPDATED, "weekly", 0.8),
    page(`${SITE_URL}/debt-collection-software`, SEO_UPDATED, "weekly", 0.8),
    page(`${SITE_URL}/ar-collections-software`, SEO_UPDATED, "weekly", 0.8),
    page(`${SITE_URL}/dunning-management-software`, SEO_UPDATED, "weekly", 0.8),
    page(`${SITE_URL}/accounts-receivable-statistics`, CONTENT_2026_08_17, "monthly", 0.8),
    page(`${SITE_URL}/book-demo`, SEO_UPDATED, "monthly", 0.8),
    page(`${SITE_URL}/case-studies`, SEO_UPDATED, "weekly", 0.7),
    page(`${SITE_URL}/blog`, SEO_UPDATED, "daily", 0.9),
    page(`${SITE_URL}/solutions/quickbooks`, SEO_UPDATED, "monthly", 0.7),
    page(`${SITE_URL}/solutions/xero`, SEO_UPDATED, "monthly", 0.7),
    page(`${SITE_URL}/solutions/netsuite`, SEO_UPDATED, "monthly", 0.7),
    page(`${SITE_URL}/solutions/odoo`, SEO_UPDATED, "monthly", 0.7),
    page(`${SITE_URL}/solutions/sage`, SEO_UPDATED, "monthly", 0.7),
    page(`${SITE_URL}/solutions/stripe`, SEO_UPDATED, "monthly", 0.7),
    page(`${SITE_URL}/solutions/bill`, SEO_UPDATED, "monthly", 0.7),
    page(`${SITE_URL}/changelog`, SEO_UPDATED, "weekly", 0.6),
    page(`${SITE_URL}/tools/dso-calculator`, SEO_UPDATED, "monthly", 0.7),
    page(`${SITE_URL}/careers`, SEO_UPDATED, "weekly", 0.5),
    page(`${SITE_URL}/privacy-policy`, LEGAL_UPDATED, "yearly", 0.3),
    page(`${SITE_URL}/terms-of-service`, LEGAL_UPDATED, "yearly", 0.3),
  ];

  const jobPages: MetadataRoute.Sitemap = jobs.map((job) =>
    page(`${SITE_URL}/careers/${job.slug}`, new Date(job.datePosted), "weekly", 0.6),
  );

  const industryPages: MetadataRoute.Sitemap = [
    "wholesale-distribution",
    "manufacturing",
    "professional-services",
    "property-management",
    "gyms-fitness",
    "software-tech",
  ].map((slug) => page(`${SITE_URL}/industries/${slug}`, SEO_UPDATED, "monthly", 0.7));

  const comparisonPages: MetadataRoute.Sitemap = [
    "yonovo-vs-upflow",
    "yonovo-vs-chaser",
    "yonovo-vs-invoiced",
    "yonovo-vs-bill-com",
  ].map((slug) => page(`${SITE_URL}/${slug}`, CONTENT_2026_08_17, "monthly", 0.8));

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) =>
    page(
      `${SITE_URL}/blog/${post.frontmatter.slug}`,
      new Date(post.frontmatter.updatedAt || post.frontmatter.publishedAt),
      "weekly",
      0.8,
    ),
  );

  const categoryPages: MetadataRoute.Sitemap = BLOG_CATEGORIES.map((cat) =>
    page(`${SITE_URL}/blog/category/${cat.slug}`, SEO_UPDATED, "weekly", 0.6),
  );

  const authorPages: MetadataRoute.Sitemap = Object.keys(authors).map((id) =>
    page(
      `${SITE_URL}/blog/author/${id}`,
      latestIso(
        posts
          .filter((post) => post.frontmatter.author === id)
          .map((post) => post.frontmatter.updatedAt || post.frontmatter.publishedAt),
      ),
      "monthly",
      0.5,
    ),
  );

  const caseStudyPages: MetadataRoute.Sitemap = Object.values(caseStudies).map((cs) =>
    page(`${SITE_URL}/case-studies/${cs.slug}`, displayDate(cs.hero.date), "monthly", 0.7),
  );

  const changelogPages: MetadataRoute.Sitemap = entries.map((entry) =>
    page(
      `${SITE_URL}/changelog/${entry.frontmatter.slug}`,
      new Date(entry.frontmatter.publishedAt),
      "monthly",
      0.5,
    ),
  );

  return [
    ...staticPages,
    ...caseStudyPages,
    ...jobPages,
    ...industryPages,
    ...comparisonPages,
    ...blogPosts,
    ...categoryPages,
    ...authorPages,
    ...changelogPages,
  ];
}
