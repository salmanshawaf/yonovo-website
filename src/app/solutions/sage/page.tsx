import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import SagePage from "@/components/SagePage";

export const metadata: Metadata = {
  title: "Sage AR Automation | Automate Collections for Sage",
  description:
    "Automate accounts receivable for Sage. Sync invoices, send follow-ups via email, SMS, and voice, and reduce DSO. Connect in 15 minutes.",
  alternates: {
    canonical: `${SITE_URL}/solutions/sage`,
  },
  openGraph: {
    type: "website",
    title: `Sage AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for Sage. Sync invoices, send follow-ups via email, SMS, and voice, and reduce DSO.",
    url: `${SITE_URL}/solutions/sage`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `Sage AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for Sage. Sync invoices, send follow-ups via email, SMS, and voice.",
  },
};

export default function Page() {
  return (
    <>
      <NavbarWrapper defaultMode="dark" />
      <main className="pt-16 min-h-screen">
        <SagePage />
      </main>
      <Footer />
    </>
  );
}
