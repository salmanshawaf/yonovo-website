import type { MetadataRoute } from "next";
import { getAllPosts, BLOG_CATEGORIES } from "@/lib/blog";
import { authors } from "@/content/authors";
import { caseStudies } from "@/data/caseStudies";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/pricing`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/accounts-receivable-automation-software`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/debt-collection-software`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ar-collections-software`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/dunning-management-software`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/accounts-receivable-statistics`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/book-demo`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/case-studies`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/solutions/quickbooks`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/solutions/xero`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/solutions/netsuite`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/solutions/odoo`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/solutions/sage`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/solutions/stripe`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/solutions/bill`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/changelog`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/tools/dso-calculator`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const industryPages: MetadataRoute.Sitemap = [
    "wholesale-distribution",
    "manufacturing",
    "professional-services",
    "property-management",
    "gyms-fitness",
    "software-tech",
  ].map((slug) => ({
    url: `${SITE_URL}/industries/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const comparisonPages: MetadataRoute.Sitemap = [
    "yonovo-vs-upflow",
    "yonovo-vs-chaser",
    "yonovo-vs-invoiced",
    "yonovo-vs-bill-com",
  ].map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.frontmatter.slug}`,
    lastModified: new Date(post.frontmatter.updatedAt || post.frontmatter.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = BLOG_CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/blog/category/${cat.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const authorPages: MetadataRoute.Sitemap = Object.keys(authors).map((id) => ({
    url: `${SITE_URL}/blog/author/${id}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = Object.values(caseStudies).map((cs) => ({
    url: `${SITE_URL}/case-studies/${cs.slug}`,
    lastModified: new Date(cs.hero.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...caseStudyPages,
    ...industryPages,
    ...comparisonPages,
    ...blogPosts,
    ...categoryPages,
    ...authorPages,
  ];
}
