import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import XeroPage from "@/components/XeroPage";

export const metadata: Metadata = {
  title: "Xero Integration | Yonovo",
  description:
    "Connect Yonovo to Xero and automate your accounts receivable collections. Sync invoices, follow up automatically, and get paid faster.",
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
