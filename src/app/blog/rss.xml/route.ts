import { getAllPosts, getHeroImage } from "@/lib/blog";
import { SITE_URL } from "@/lib/site-config";

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const heroImage = getHeroImage(post);
      const ext = heroImage.src.split(".").pop()?.toLowerCase() || "png";
      const mimeType = ext === "svg" ? "image/svg+xml" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : `image/${ext}`;
      return `    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${SITE_URL}/blog/${post.frontmatter.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.frontmatter.slug}</guid>
      <description><![CDATA[${post.frontmatter.description}]]></description>
      <pubDate>${new Date(post.frontmatter.publishedAt).toUTCString()}</pubDate>
      <category>${post.frontmatter.category}</category>
      <author>${post.author.name}</author>
      <enclosure url="${SITE_URL}${heroImage.src}" type="${mimeType}" />
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Yonovo Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Expert insights on AR automation, collections strategies, and finance operations from the Yonovo team.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
