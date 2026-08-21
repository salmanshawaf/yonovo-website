import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | AI-Powered Accounts Receivable Automation`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Automate invoice follow-ups across email, SMS, and voice. Yonovo connects to your accounting system and handles collections so your team can focus on growth.",
  // Site-wide defaults. Pages that set their own openGraph/twitter inherit these
  // fields (e.g. images) unless they override them — gives every page a valid
  // og:image / twitter:image without repeating it on each route.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Connection warm-up for the third parties every page contacts. gtag.js
            alone is ~187 KiB per page, and none of these had a hint before. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
        <link rel="dns-prefetch" href="https://r2.leadsy.ai" />
        <link rel="dns-prefetch" href="https://ddwl4m2hdecbv.cloudfront.net" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />

        {/* Google tag (gtag.js). afterInteractive is Google's own recommendation
            with next/script: it keeps pageviews accurate while moving the tag
            off the parser's path. The inline config below was previously a
            blocking classic script in <head>. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BK8T7VN9WM"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BK8T7VN9WM');`}
        </Script>

        {/* Ahrefs Web Analytics. Also afterInteractive -- it records pageviews,
            so deferring to lazyOnload risks losing fast bounces. */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="ipVXZ/JV5A8m1E0PSwHGPw"
          strategy="afterInteractive"
        />

        {/* Instantly and RB2B are visitor-identification pixels rather than
            pageview analytics, so they tolerate loading last. */}
        <Script
          id="vtag-ai-js"
          src="https://r2.leadsy.ai/tag.js"
          data-pid="1mLHIjUgE5yR1WIfM"
          data-version="062024"
          strategy="lazyOnload"
        />
        <Script id="reb2b-js" strategy="lazyOnload">
          {`!function(key){if(window.reb2b)return;window.reb2b={loaded:true};var s=document.createElement("script");s.async=true;s.src="https://ddwl4m2hdecbv.cloudfront.net/b/"+key+"/"+key+".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s,document.getElementsByTagName("script")[0]);}("W6Z57HZ481OX");`}
        </Script>
      </body>
    </html>
  );
}
