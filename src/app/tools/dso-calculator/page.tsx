import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import { breadcrumbSchema, faqSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import SectionBadge from "@/components/SectionBadge";
import FAQAccordion from "@/components/FAQAccordion";
import Button from "@/components/Button";
import DSOCalculator from "@/components/DSOCalculator";

const url = `${SITE_URL}/tools/dso-calculator`;
const ogImage = "/og-default.png";

export const metadata: Metadata = {
  title: "DSO Calculator",
  description:
    "Free DSO calculator. Enter your receivables and credit sales to get your days sales outstanding, benchmark it, and see how much cash a lower DSO frees up.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    title: "Free DSO Calculator (Days Sales Outstanding)",
    description:
      "Calculate your days sales outstanding and see how much working capital a lower DSO frees up.",
    url,
    siteName: SITE_NAME,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Yonovo DSO Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free DSO Calculator (Days Sales Outstanding)",
    description:
      "Calculate your days sales outstanding and see how much working capital a lower DSO frees up.",
    images: [ogImage],
  },
};

const faqs = [
  {
    question: "What is DSO (days sales outstanding)?",
    answer:
      "Days sales outstanding (DSO) is the average number of days it takes to collect payment after a sale on credit. A lower DSO means you convert receivables into cash faster, which improves working capital and cash flow.",
  },
  {
    question: "How do you calculate DSO?",
    answer:
      "DSO = (Accounts Receivable / Total Credit Sales) x Number of Days in the period. For an annual figure, divide your accounts receivable by total credit sales for the year and multiply by 365. For a quarter, use 90 days; for a month, use 30.",
  },
  {
    question: "What is a good DSO?",
    answer:
      "It varies by industry and payment terms, but a common rule of thumb is that a DSO under 45 days is healthy, 45 to 60 days has room to improve, and above 60 days suggests cash is getting stuck in receivables. Compare against your own payment terms: if you bill Net 30 but your DSO is 55, customers are paying roughly 25 days late on average.",
  },
  {
    question: "How do I reduce my DSO?",
    answer:
      "Send invoices promptly and accurately, set clear payment terms, follow up consistently across multiple channels before and after the due date, make paying easy, and escalate aging invoices on a schedule. Automating these follow-ups is the fastest lever for most teams. See our guide on how to reduce DSO for seven proven strategies.",
  },
  {
    question: "How much cash does reducing DSO free up?",
    answer:
      "Roughly your daily credit sales multiplied by the number of days you cut from DSO. If you bill $3M a year (about $8,200/day) and reduce DSO by 15 days, you free up around $123,000 in cash that was previously tied up in unpaid invoices. The calculator above estimates this for your numbers.",
  },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Yonovo DSO Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url,
  description:
    "Free calculator for days sales outstanding (DSO) and the working capital a lower DSO frees up.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

export default function DSOCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Tools", href: "/tools/dso-calculator" },
            { name: "DSO Calculator" },
          ]),
          webAppSchema,
          faqSchema(faqs),
        ]}
      />
      <NavbarWrapper defaultMode="light" />
      <main className="flex flex-col pt-[var(--navbar-height)] bg-background">
        {/* Hero + calculator */}
        <section className="mx-auto w-full max-w-(--container-max-width) px-6 pt-20 pb-16 md:pt-28">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
            <SectionBadge label="Free tool" variant="light" />
            <h1 className="font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
              DSO Calculator
            </h1>
            <p className="text-base text-secondary leading-relaxed md:text-xl">
              Calculate your days sales outstanding, benchmark it against healthy ranges, and see exactly how much working capital a lower DSO would free up. No sign-up, no email required.
            </p>
          </div>
          <div className="mt-12">
            <DSOCalculator />
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto w-full max-w-(--container-max-width) px-6 py-12">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <h2 className="font-medium text-2xl text-foreground tracking-tight md:text-3xl">
              How DSO is calculated
            </h2>
            <div className="rounded-2xl border border-border bg-surface p-6 text-center md:p-8">
              <p className="font-medium text-lg text-foreground md:text-xl">
                DSO = (Accounts Receivable / Total Credit Sales) &times; Number of Days
              </p>
            </div>
            <p className="text-base text-secondary leading-relaxed">
              Days sales outstanding measures the average time between making a sale on credit and collecting the cash. Use 365 days for an annual figure, 90 for a quarter, or 30 for a month. A DSO that runs well above your payment terms is a sign that customers are paying late and cash is sitting in receivables instead of your bank account.
            </p>
            <p className="text-base text-secondary leading-relaxed">
              The headline number to watch is the cash you free up by lowering DSO. Every day you shave off DSO releases roughly one day of credit sales back into working capital. For a deeper model of when each invoice will actually be paid, read our{" "}
              <Link href="/blog/cash-collections-formula" className="text-brand-blue underline underline-offset-2">cash collections formula</Link> guide, or see{" "}
              <Link href="/blog/how-to-reduce-dso" className="text-brand-blue underline underline-offset-2">7 proven ways to reduce DSO</Link>.
            </p>
            <p className="text-base text-secondary leading-relaxed">
              A stubbornly high DSO is usually a follow up problem. See how{" "}
              <Link href="/ar-collections-software" className="text-brand-blue underline underline-offset-2">accounts receivable collections software</Link> runs the reminder timeline for you, or benchmark your number against the industry data on our{" "}
              <Link href="/accounts-receivable-statistics" className="text-brand-blue underline underline-offset-2">accounts receivable statistics</Link> page.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-(--container-max-width) px-6 py-12">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <h2 className="font-medium text-2xl text-foreground tracking-tight md:text-3xl">
              Frequently asked questions
            </h2>
            <FAQAccordion items={faqs} />
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-(--container-max-width) px-6 pb-24 pt-4">
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-brand-navy px-6 py-14 text-center">
            <h2 className="max-w-2xl font-medium text-3xl text-white tracking-tight md:text-4xl">
              Stop chasing payments by hand
            </h2>
            <p className="max-w-xl text-base text-white/70 md:text-lg">
              Yonovo follows up on every overdue invoice across email, SMS, and voice, so you collect faster and bring your DSO down without adding headcount.
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
