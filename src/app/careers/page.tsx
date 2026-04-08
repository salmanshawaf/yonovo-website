import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import Link from "next/link";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Careers | Yonovo",
  description:
    "Join the Yonovo team. See open roles and help us automate accounts receivable for businesses everywhere.",
};

export default function CareersPage() {
  return (
    <>
      <NavbarWrapper defaultMode="light" />
      <main className="flex flex-col pt-[var(--navbar-height)] bg-background">
        <section className="mx-auto flex w-full max-w-(--container-max-width) flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
          <div className="flex flex-col items-center gap-6 max-w-xl">
            <h1 className="font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
              Careers
            </h1>
            <p className="text-base text-secondary leading-relaxed md:text-xl">
              We don't have any open positions right now, but we're always looking for talented people. If you think you'd be a great fit, reach out and introduce yourself.
            </p>
            <Link href="mailto:salman@yonovo.com">
              <Button variant="brand" size="md" className="h-14 px-[46px] text-lg font-medium mt-4">
                Get in Touch
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
