import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import XeroPage from "@/components/XeroPage";

export const metadata: Metadata = {
  title: "Xero AR Automation | Automate Collections for Xero",
  description:
    "Automate accounts receivable for Xero. Sync invoices, send follow-ups via email, SMS, and voice, and reduce DSO. Connect in 15 minutes.",
  alternates: {
    canonical: `${SITE_URL}/solutions/xero`,
  },
  openGraph: {
    type: "website",
    title: `Xero AR Automation | Automate Collections for Xero | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for Xero. Sync invoices, send follow-ups via email, SMS, and voice, and reduce DSO.",
    url: `${SITE_URL}/solutions/xero`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `Xero AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for Xero. Sync invoices, send follow-ups via email, SMS, and voice, and reduce DSO.",
  },
};

export default function Page() {
  return (
    <>
      <NavbarWrapper defaultMode="dark" />
      <main className="pt-16 min-h-screen">
        <XeroPage />
      </main>
      <Footer />
    </>
  );
}
