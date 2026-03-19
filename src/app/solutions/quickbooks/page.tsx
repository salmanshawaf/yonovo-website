import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import QuickBooksPage from "@/components/QuickBooksPage";

export const metadata: Metadata = {
  title: "QuickBooks Integration | Yonovo",
  description:
    "Connect Yonovo to QuickBooks Online and automate your accounts receivable collections. Sync invoices, follow up automatically, and get paid faster.",
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
