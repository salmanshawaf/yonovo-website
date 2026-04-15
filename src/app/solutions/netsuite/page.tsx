import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import NetSuitePage from "@/components/NetSuitePage";

export const metadata: Metadata = {
  title: "NetSuite AR Automation | Automate Collections for NetSuite",
  description:
    "Automate accounts receivable for NetSuite. Sync invoices across subsidiaries, send multi-channel follow-ups, and reduce DSO. Go live in one day.",
  alternates: {
    canonical: `${SITE_URL}/solutions/netsuite`,
  },
  openGraph: {
    type: "website",
    title: `NetSuite AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for NetSuite. Sync invoices, send multi-channel follow-ups, and reduce DSO.",
    url: `${SITE_URL}/solutions/netsuite`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `NetSuite AR Automation | ${SITE_NAME}`,
    description:
      "Automate accounts receivable for NetSuite. Sync invoices, send multi-channel follow-ups, and reduce DSO.",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions/netsuite" }, { name: "NetSuite" }]),
        softwareApplicationSchema({ integrationName: "NetSuite", description: "Automate accounts receivable for NetSuite. Sync invoices across subsidiaries, send multi-channel follow-ups.", url: "/solutions/netsuite" }),
      ]} />
      <NavbarWrapper defaultMode="dark" />
      <main className="pt-16 min-h-screen">
        <NetSuitePage />
      </main>
      <Footer />
    </>
  );
}
