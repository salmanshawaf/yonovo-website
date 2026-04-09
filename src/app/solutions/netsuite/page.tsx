import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import NetSuitePage from "@/components/NetSuitePage";

export const metadata: Metadata = {
  title: "NetSuite Integration | Yonovo",
  description:
    "Connect Yonovo to NetSuite and automate your accounts receivable collections. Sync invoices, follow up automatically, and get paid faster.",
};

export default function Page() {
  return (
    <>
      <NavbarWrapper defaultMode="dark" />
      <main className="pt-16 min-h-screen">
        <NetSuitePage />
      </main>
      <Footer />
    </>
  );
}
