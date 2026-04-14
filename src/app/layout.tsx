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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload Cal.com embed script so /book-demo loads faster */}
        <link
          rel="preload"
          href="https://app.cal.com/embed/embed.js"
          as="script"
        />
        {/* Instantly website tracking pixel */}
        <script
          id="vtag-ai-js"
          async
          src="https://r2.leadsy.ai/tag.js"
          data-pid="1mLHIjUgE5yR1WIfM"
          data-version="062024"
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
