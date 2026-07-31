import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/**" },
    ],
  },

  async redirects() {
    return [
      // Legacy URLs from previous site version.
      // /articles/styling-elements → 410 Gone is ideal but Next.js redirects
      // don't support 410. Use a permanent redirect to /blog as fallback.
      {
        source: "/articles/styling-elements",
        destination: "/blog",
        permanent: true,
      },
      // /resources → /blog (blog is the closest replacement for the old resources hub)
      {
        source: "/resources",
        destination: "/blog",
        permanent: true,
      },
      // /articles catch-all for any other legacy article URLs
      {
        source: "/articles/:slug",
        destination: "/blog",
        permanent: true,
      },
      // Comparison content consolidated onto dedicated root-level pages.
      // 301 the old blog posts so link equity flows to the canonical pages.
      {
        source: "/blog/upflow-vs-yonovo",
        destination: "/yonovo-vs-upflow",
        permanent: true,
      },
      {
        source: "/blog/yonovo-vs-chaser",
        destination: "/yonovo-vs-chaser",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
