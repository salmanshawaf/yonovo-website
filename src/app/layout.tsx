import type { Metadata } from "next";
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

        {/* These stay as plain async <script> tags in <head> rather than
            next/script. Moving them to strategy="afterInteractive" was measured
            on production and made things WORSE: gtag.js is 187 KiB and its
            parse/execute cost landed inside the hydration window, pushing LCP
            render delay up ~500ms on every page (/pricing 1359ms -> 1964ms) and
            FCP from ~0.9s to ~1.7s. As <script async> the browser fetches it
            early and schedules execution itself, off the hydration path.
            Phase 0 separately measured that the two inline tags below never
            appear in the render-blocking audit, so their parser cost is noise. */}
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BK8T7VN9WM"
        />
        <script
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BK8T7VN9WM');`,
          }}
        />
        {/* Ahrefs Web Analytics */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="ipVXZ/JV5A8m1E0PSwHGPw"
          async
        />
        {/* Instantly website tracking pixel */}
        <script
          id="vtag-ai-js"
          async
          src="https://r2.leadsy.ai/tag.js"
          data-pid="1mLHIjUgE5yR1WIfM"
          data-version="062024"
        />
        {/* RB2B website tracking */}
        <script
          id="reb2b-js"
          dangerouslySetInnerHTML={{
            __html: `!function(key){if(window.reb2b)return;window.reb2b={loaded:true};var s=document.createElement("script");s.async=true;s.src="https://ddwl4m2hdecbv.cloudfront.net/b/"+key+"/"+key+".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s,document.getElementsByTagName("script")[0]);}("W6Z57HZ481OX");`,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
