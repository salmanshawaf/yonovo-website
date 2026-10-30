import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import BookDemoPage from "@/components/BookDemoPage";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schemas";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

const TITLE = "Book an AR Automation Demo";
const DESCRIPTION =
  "Book a discovery call to see how Yonovo automates accounts receivable so your team can collect faster.";
const PAGE_URL = `${SITE_URL}/book-demo`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    images: ["/og-default.png"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Book a Demo" }]),
          webPageSchema({
            name: `${TITLE} | ${SITE_NAME}`,
            description: DESCRIPTION,
            url: PAGE_URL,
          }),
        ]}
      />
      <NavbarWrapper defaultMode="light" />
      <BookDemoPage />
      <Footer />
    </>
  );
}
