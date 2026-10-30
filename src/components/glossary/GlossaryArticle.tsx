import Link from "next/link";
import type { ReactNode } from "react";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import FAQAccordion from "@/components/FAQAccordion";
import Button from "@/components/Button";
import RelatedResources from "@/components/RelatedResources";
import {
  GLOSSARY_DATE_DISPLAY,
  getGlossaryTerm,
  glossaryPath,
  type GlossaryTerm,
} from "@/data/glossary";

export default function GlossaryArticle({
  term,
  children,
}: {
  term: GlossaryTerm;
  children: ReactNode;
}) {
  const related = term.relatedSlugs.flatMap((slug) => {
    const match = getGlossaryTerm(slug);
    if (!match) return [];
    return [
      {
        label: match.h1,
        href: glossaryPath(match.slug),
        description: match.summary,
      },
    ];
  });

  return (
    <>
      <NavbarWrapper defaultMode="light" />
      <main className="flex flex-col bg-background pt-[var(--navbar-height)]">
        <article className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 pt-12 pb-16 md:pt-16">
          <header className="flex flex-col gap-4">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Glossary", href: "/glossary" },
                { label: term.breadcrumb },
              ]}
            />
            <h1 className="font-medium text-4xl text-foreground leading-tight tracking-tight md:text-5xl">
              {term.h1}
            </h1>
            <p className="text-sm text-muted">
              Updated {GLOSSARY_DATE_DISPLAY}. Written by{" "}
              <Link href="/blog/author/salman" className="text-brand-blue underline underline-offset-2">
                Salman Shawaf
              </Link>
              , Co-founder, Yonovo.
            </p>
          </header>
          {children}
          <section id="faq" className="flex flex-col gap-4 scroll-mt-28">
            <h2 className="font-medium text-2xl text-foreground tracking-tight md:text-3xl">
              Frequently asked questions
            </h2>
            <FAQAccordion items={term.faqs} />
          </section>
        </article>

        <RelatedResources items={[...related, ...term.resources]} />

        <section className="mx-auto w-full max-w-(--container-max-width) px-6 pb-24 pt-4">
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-brand-navy px-6 py-14 text-center">
            <h2 className="max-w-2xl font-medium text-3xl text-white tracking-tight md:text-4xl">
              Put the follow up on a schedule
            </h2>
            <p className="max-w-xl text-base text-white/70 md:text-lg">
              Yonovo runs reminders from your ledger across email, SMS, phone, and WhatsApp, and stops when an invoice is paid or disputed.
            </p>
            <Link href="/book-demo">
              <Button variant="brand" size="lg" className="font-medium">
                Book a demo
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
