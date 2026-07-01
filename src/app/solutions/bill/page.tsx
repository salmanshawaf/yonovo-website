import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { breadcrumbSchema, softwareApplicationSchema, faqSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import BillPage, { faqs } from "@/components/BillPage";

export const metadata: Metadata = {
  title: "BILL (Bill.com) AR Automation",
  description:
    "Automate accounts receivable for BILL (formerly Bill.com). AI-powered follow-ups via email, SMS, and voice with pay-now links. Go live in one day and reduce DSO.",
  alternates: {
    canonical: `${SITE_URL}/solutions/bill`,
  },
  openGraph: {
    type: "website",
    title: `BILL (Bill.com) AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for BILL (formerly Bill.com). AI-powered follow-ups with pay-now links. Go live in one day.",
    url: `${SITE_URL}/solutions/bill`,
    siteName: SITE_NAME,
    images: [{ url: "/api/og?title=BILL%20AR%20Automation&category=guides", width: 1200, height: 630, alt: "BILL AR Automation" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og?title=BILL%20AR%20Automation&category=guides"],
    title: `BILL (Bill.com) AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for BILL (formerly Bill.com). AI-powered follow-ups with pay-now links.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions/bill" }, { name: "BILL" }]),
        softwareApplicationSchema({ integrationName: "BILL", description: "Automate accounts receivable for BILL (formerly Bill.com). AI-powered follow-ups via email, SMS, voice, and WhatsApp with pay-now links.", url: "/solutions/bill" }),
        faqSchema(faqs),
      ]} />
      <NavbarWrapper defaultMode="dark" />
      <main className="pt-16 min-h-screen">
        <BillPage />
      </main>
      <Footer />
    </>
  );
}
