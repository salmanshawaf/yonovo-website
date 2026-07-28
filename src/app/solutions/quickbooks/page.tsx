import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { breadcrumbSchema, softwareApplicationSchema, faqSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import QuickBooksPage, { faqs } from "@/components/QuickBooksPage";

export const metadata: Metadata = {
  title: "QuickBooks Online AR Automation",
  description:
    "Automate accounts receivable for QuickBooks Online. AI-powered follow-ups via email, SMS, and voice. Go live in one day and reduce DSO.",
  alternates: {
    canonical: `${SITE_URL}/solutions/quickbooks`,
  },
  openGraph: {
    type: "website",
    title: `QuickBooks Online AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for QuickBooks Online. AI-powered follow-ups via email, SMS, and voice. Go live in one day.",
    url: `${SITE_URL}/solutions/quickbooks`,
    siteName: SITE_NAME,
    images: [{ url: "/api/og?title=QuickBooks%20Online%20AR%20Automation&category=guides&label=Solution", width: 1200, height: 630, alt: "QuickBooks Online AR Automation" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og?title=QuickBooks%20Online%20AR%20Automation&category=guides&label=Solution"],
    title: `QuickBooks Online AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for QuickBooks Online. AI-powered follow-ups via email, SMS, and voice.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions/quickbooks" }, { name: "QuickBooks" }]),
        softwareApplicationSchema({ integrationName: "QuickBooks Online", description: "Automate accounts receivable for QuickBooks Online. AI-powered follow-ups via email, SMS, voice, and WhatsApp.", url: "/solutions/quickbooks" }),
        faqSchema(faqs),
      ]} />
      <NavbarWrapper defaultMode="dark" />
      <main className="pt-16 min-h-screen">
        <QuickBooksPage />
      </main>
      <Footer />
    </>
  );
}
