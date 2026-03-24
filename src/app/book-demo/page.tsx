import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import BookDemoPage from "@/components/BookDemoPage";

export const metadata: Metadata = {
  title: "Book a Demo | Yonovo",
  description:
    "Schedule a discovery call with the Yonovo team. See how AI-powered accounts receivable automation can unlock your owed cash reserves.",
};

export default function Page() {
  return (
    <>
      <NavbarWrapper defaultMode="light" />
      <BookDemoPage />
      <Footer />
    </>
  );
}
