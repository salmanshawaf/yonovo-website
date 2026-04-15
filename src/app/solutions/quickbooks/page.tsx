import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import QuickBooksPage from "@/components/QuickBooksPage";

export const metadata: Metadata = {
  title: "QuickBooks Online AR Automation | Automate Collections",
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
  },
  twitter: {
    card: "summary_large_image",
    title: `QuickBooks Online AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for QuickBooks Online. AI-powered follow-ups via email, SMS, and voice.",
  },
};

export default function Page() {
  return (
    <>
      <NavbarWrapper defaultMode="dark" />
      <main className="pt-16 min-h-screen">
        <QuickBooksPage />
      </main>
      <Footer />
    </>
  );
}
