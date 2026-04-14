import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site-config";

export async function GET() {
  const posts = getAllPosts();

  const blogLinks = posts
    .map((p) => `- ${p.frontmatter.title}: ${SITE_URL}/blog/${p.frontmatter.slug}`)
    .join("\n");

  const content = `# Yonovo

> Yonovo is an accounts receivable automation platform that helps finance teams collect payments faster while keeping customer relationships intact.

## Product Pages
- Homepage: ${SITE_URL}
- Pricing: ${SITE_URL}/pricing
- QuickBooks Integration: ${SITE_URL}/solutions/quickbooks
- Xero Integration: ${SITE_URL}/solutions/xero
- NetSuite Integration: ${SITE_URL}/solutions/netsuite
- Odoo Integration: ${SITE_URL}/solutions/odoo
- Sage Integration: ${SITE_URL}/solutions/sage

## Industries
- Ecommerce & Retail: ${SITE_URL}/industries/ecommerce-retail
- Wholesale & Distribution: ${SITE_URL}/industries/wholesale-distribution
- Manufacturing: ${SITE_URL}/industries/manufacturing
- Professional Services: ${SITE_URL}/industries/professional-services
- Property Management: ${SITE_URL}/industries/property-management
- Gyms & Fitness: ${SITE_URL}/industries/gyms-fitness

## Case Studies
- ${SITE_URL}/case-studies

## Blog
${blogLinks}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
