import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import FAQAccordion from "@/components/FAQAccordion";
import Button from "@/components/Button";
import GlossaryIndexTerms from "@/components/glossary/GlossaryIndexTerms";
import {
  GLOSSARY_DATE,
  GLOSSARY_DATE_DISPLAY,
  glossaryIndex,
} from "@/data/glossary";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schemas";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const url = `${SITE_URL}/glossary`;

export const metadata: Metadata = {
  title: glossaryIndex.seoTitle,
  description: glossaryIndex.description,
  authors: [{ name: "Salman Shawaf", url: "/blog/author/salman" }],
  alternates: { canonical: url },
  openGraph: {
    type: "article",
    title: `${glossaryIndex.seoTitle} | ${SITE_NAME}`,
    description: glossaryIndex.description,
    url,
    siteName: SITE_NAME,
    publishedTime: GLOSSARY_DATE,
    modifiedTime: GLOSSARY_DATE,
  },
  twitter: {
    card: "summary_large_image",
    title: `${glossaryIndex.seoTitle} | ${SITE_NAME}`,
    description: glossaryIndex.description,
  },
};

const productLinks = [
  { href: "/ar-collections-software", label: "Accounts receivable collections software" },
  { href: "/accounts-receivable-automation-software", label: "Accounts receivable automation software" },
  { href: "/dunning-management-software", label: "Dunning management software" },
  { href: "/debt-collection-software", label: "Debt collection software for B2B invoices" },
  { href: "/tools/dso-calculator", label: "DSO calculator" },
  { href: "/accounts-receivable-statistics", label: "Accounts receivable statistics" },
];

export default function GlossaryIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: glossaryIndex.h1,
            description: glossaryIndex.description,
            url,
            datePublished: GLOSSARY_DATE,
            dateModified: GLOSSARY_DATE,
            keywords: ["accounts receivable glossary", "dso formula", "ar aging report", "collection letter"],
          }),
          faqSchema(glossaryIndex.faqs),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Glossary" },
          ]),
        ]}
      />
      <NavbarWrapper defaultMode="light" />
      <main className="flex flex-col bg-background pt-[var(--navbar-height)]">
        <article className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 pt-12 pb-16 md:pt-16">
          <header className="flex flex-col gap-4">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Glossary" }]} />
            <h1 className="font-medium text-4xl text-foreground leading-tight tracking-tight md:text-5xl">
              {glossaryIndex.h1}
            </h1>
            <p className="text-sm text-muted">
              Updated {GLOSSARY_DATE_DISPLAY}. Written by{" "}
              <Link href="/blog/author/salman" className="text-brand-blue underline underline-offset-2">
                Salman Shawaf
              </Link>
              , Co-founder, Yonovo.
            </p>
          </header>

          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <p className="text-lg text-foreground leading-relaxed">
              Definitions for the accounts receivable terms finance teams use, carried over from the glossary guide. Where a longer page exists, the entry links to it.
            </p>
          </div>

          <section className="flex flex-col gap-4">
            <h2 className="font-medium text-2xl text-foreground tracking-tight md:text-3xl">Terms</h2>
            <GlossaryIndexTerms />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-medium text-2xl text-foreground tracking-tight md:text-3xl">How the metrics fit</h2>
            <p className="text-base text-secondary leading-relaxed">
              Days sales outstanding and the average collection period are the same day count when the inputs match. Receivable turnover is that speed stated as a rate. The aging report is the list of invoices behind the average. The notices you send while you work that list are a{" "}
              <Link href="/blog/dunning-letter" className="text-brand-blue underline underline-offset-2">dunning letter</Link>, a{" "}
              <Link href="/glossary/collection-letter" className="text-brand-blue underline underline-offset-2">collection letter</Link>, or a{" "}
              <Link href="/blog/invoice-reminder-best-practices#past-due-invoice-email-templates" className="text-brand-blue underline underline-offset-2">past due invoice email</Link>.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-medium text-2xl text-foreground tracking-tight md:text-3xl">Related product pages</h2>
            <ul className="flex flex-col gap-2 text-base">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-brand-blue underline underline-offset-2">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="faq" className="flex flex-col gap-4">
            <h2 className="font-medium text-2xl text-foreground tracking-tight md:text-3xl">
              Frequently asked questions
            </h2>
            <FAQAccordion items={glossaryIndex.faqs} />
          </section>
        </article>

        <section className="mx-auto w-full max-w-(--container-max-width) px-6 pb-24">
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
