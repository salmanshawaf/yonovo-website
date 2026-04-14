import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import OdooPage from "@/components/OdooPage";

export const metadata: Metadata = {
  title: "Odoo AR Automation | Automate Collections for Odoo",
  description:
    "Automate accounts receivable for Odoo Community, Enterprise, and Online. Multi-channel follow-ups via email, SMS, and voice. Connect in 15 minutes.",
  alternates: {
    canonical: `${SITE_URL}/solutions/odoo`,
  },
  openGraph: {
    type: "website",
    title: `Odoo AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for Odoo. Multi-channel follow-ups via email, SMS, and voice. Connect in 15 minutes.",
    url: `${SITE_URL}/solutions/odoo`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `Odoo AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for Odoo. Multi-channel follow-ups via email, SMS, and voice.",
  },
};

export default function Page() {
  return (
    <>
      <NavbarWrapper defaultMode="dark" />
      <main className="pt-16 min-h-screen">
        <OdooPage />
      </main>
      <Footer />
    </>
  );
}
