import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import SagePage from "@/components/SagePage";

export const metadata: Metadata = {
  title: "Sage Integration | Yonovo",
  description:
    "Connect Yonovo to Sage and automate your accounts receivable collections. Sync invoices, follow up automatically, and get paid faster.",
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
