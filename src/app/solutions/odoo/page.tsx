import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import OdooPage from "@/components/OdooPage";

export const metadata: Metadata = {
  title: "Odoo Integration | Yonovo",
  description:
    "Connect Yonovo to Odoo and automate your accounts receivable collections. Sync invoices, follow up automatically, and get paid faster.",
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
