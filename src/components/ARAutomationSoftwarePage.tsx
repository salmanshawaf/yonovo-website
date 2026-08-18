import Image from "next/image";
import Link from "next/link";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/Button";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedResources from "@/components/RelatedResources";
import CTASection from "@/components/sections/CTASection";

/* ── Data ── */

// Vendor rows for the category comparison table, ordered by the company size
// each tool serves (smallest first), not by Yonovo first. Facts trace to the
// in-repo comparison content (src/content/blog/best-ar-automation-software.mdx
// and src/data/comparisons.ts); where the two disagree, comparisons.ts wins
// (reviewed more recently).
type VendorRow = {
  vendor: string;
  bestFor: string;
  channels: string;
  integrations: string;
  setup: string;
  pricing: string;
  pricingPublic: boolean;
  highlight?: boolean;
};

const vendorRows: VendorRow[] = [
  {
    vendor: "FreshBooks",
    bestFor: "Very small businesses that mainly need invoicing",
    channels: "Email",
    integrations: "Own accounting product",
    setup: "Days",
    pricing: "From about $19 per month",
    pricingPublic: true,
  },
  {
    vendor: "Bill.com",
    bestFor: "SMBs that want AP, AR, and spend in one suite",
    channels: "Email, auto pay reminders",
    integrations: "QuickBooks, Xero, NetSuite, Sage Intacct, Microsoft Dynamics",
    setup: "1 to 2 weeks",
    pricing: "Per user, from about $49 per user per month",
    pricingPublic: true,
  },
  {
    vendor: "Chaser",
    bestFor: "UK and European SMBs, strong in the Xero ecosystem",
    channels: "Email, SMS, automated calls, postal",
    integrations: "Xero, QuickBooks Online, Sage, Odoo, NetSuite, more",
    setup: "Days to 1 week",
    pricing: "Published tiers, from £199 per month",
    pricingPublic: true,
  },
  {
    vendor: "Yonovo",
    bestFor: "SMB and mid market teams that want collections run for them",
    channels: "Email, SMS, phone, WhatsApp",
    integrations: "QuickBooks Online, Xero, NetSuite, Sage Intacct, Odoo, Stripe Billing, BILL",
    setup: "About one day",
    pricing: "Custom quote, sized to your company",
    pricingPublic: false,
    highlight: true,
  },
  {
    vendor: "Upflow",
    bestFor: "Venture backed SaaS companies with subscription revenue",
    channels: "Email, with SMS, postal, and calls metered per use",
    integrations: "QuickBooks, Xero, NetSuite, Sage, Stripe",
    setup: "2 to 3 weeks",
    pricing: "Tiered by ARR bracket, quote based",
    pricingPublic: false,
  },
  {
    vendor: "Invoiced",
    bestFor: "Mid market teams that want billing and AR in one platform",
    channels: "Email, customer payment portal",
    integrations: "ERP and CRM sync, global payments",
    setup: "2 to 4 weeks",
    pricing: "Quote based",
    pricingPublic: false,
  },
  {
    vendor: "Quadient AR (formerly YayPay)",
    bestFor: "Mid market teams that need customizable workflows",
    channels: "Email, customer portal",
    integrations: "Mid market ERPs",
    setup: "2 to 4 weeks",
    pricing: "Custom",
    pricingPublic: false,
  },
  {
    vendor: "Versapay",
    bestFor: "Teams with high value accounts that want a collaborative portal",
    channels: "Email, customer portal",
    integrations: "Mid market and enterprise ERPs",
    setup: "2 to 6 weeks",
    pricing: "Custom",
    pricingPublic: false,
  },
  {
    vendor: "Billtrust",
    bestFor: "Manufacturing and distribution with high invoice volume",
    channels: "Email, portal, EDI",
    integrations: "Enterprise ERPs",
    setup: "6 to 12 weeks",
    pricing: "Custom",
    pricingPublic: false,
  },
  {
    vendor: "HighRadius",
    bestFor: "Large enterprises on SAP or Oracle",
    channels: "Email, customer portal",
    integrations: "SAP, Oracle, NetSuite",
    setup: "3 to 6 months",
    pricing: "Custom, enterprise",
    pricingPublic: false,
  },
];

const tableColumns = [
  "Vendor",
  "Best for",
  "Channels supported",
  "Accounting integrations",
  "Setup time",
  "Pricing model",
  "Pricing public",
];

const howItWorksSteps = [
  {
    number: 1,
    title: "Connect your accounting system",
    text: "QuickBooks Online, Xero, NetSuite, Sage Intacct, Odoo, Stripe Billing, or BILL. The connection takes minutes, not a project plan.",
  },
  {
    number: 2,
    title: "Import your receivables",
    text: "Yonovo pulls in your invoices, customers, and aging, then keeps payment status current so nothing is chased after it is paid.",
  },
  {
    number: 3,
    title: "Set your collection rules",
    text: "Timing, tone, channels, and which accounts need manual approval before anything goes out. You stay in control of the playbook.",
  },
  {
    number: 4,
    title: "Follow ups go out on schedule",
    text: "As invoices age, outreach escalates across email, SMS, phone, and WhatsApp. Every message sends under your name and brand.",
  },
  {
    number: 5,
    title: "Judgment calls come to you",
    text: "Disputes, partial payments, and sensitive accounts get paused or escalated to your team with full context. No awkward surprises.",
  },
  {
    number: 6,
    title: "Track it all from one dashboard",
    text: "Recovery, aging, DSO, and at risk invoices in one place, so you always know where your receivables stand.",
  },
];

const integrations = [
  { name: "QuickBooks Online", href: "/solutions/quickbooks", icon: "/logos/quickbooks-icon.png" },
  { name: "Xero", href: "/solutions/xero", icon: "/logos/xero.png" },
  { name: "NetSuite", href: "/solutions/netsuite", icon: "/logos/netsuite-icon.svg" },
  { name: "Sage Intacct", href: "/solutions/sage", icon: "/logos/sage-icon.svg" },
  { name: "Odoo", href: "/solutions/odoo", icon: "/logos/odoo-icon.svg" },
  { name: "Stripe Billing", href: "/solutions/stripe", icon: "/logos/stripe-icon.svg" },
  { name: "BILL", href: "/solutions/bill", icon: "/logos/bill-icon.svg" },
];

const tdgStats = [
  { value: "80%", label: "fewer manual follow ups" },
  { value: "15 days", label: "cut from DSO" },
  { value: "32%", label: "faster payment collection" },
  { value: "25+ hrs", label: "saved per week" },
];

export const faqs = [
  {
    question: "What is the best accounts receivable automation software?",
    answer:
      "There is no single best tool, only the best fit for your size and accounting system. Small teams that mainly need invoicing do fine with FreshBooks or Bill.com. SMB and mid market teams that want collections handled for them choose Yonovo. Enterprises running SAP or Oracle shortlist HighRadius, Esker, or Sidetrade.",
  },
  {
    question: "Which AR automation tools integrate with QuickBooks and Xero?",
    answer:
      "Yonovo, Chaser, Upflow, and Invoiced all connect to QuickBooks Online and Xero. Yonovo connects in under a day and checks your ledger before every reminder so paid invoices are never chased. Chaser is also popular in the Xero ecosystem, especially with UK teams.",
  },
  {
    question: "Which AR automation platform has the fastest setup?",
    answer:
      "Yonovo is among the fastest. Most teams connect their accounting system and are live within one day. Tools like Chaser and FreshBooks take days, mid market platforms like Upflow and Invoiced take 2 to 4 weeks, and enterprise suites like HighRadius take 3 to 6 months.",
  },
  {
    question: "How is AR automation different from the reminders built into QuickBooks?",
    answer:
      "QuickBooks can send basic payment reminders by email. It does not escalate across channels, segment customers by risk or payment behavior, run approval workflows, or match payments automatically. AR automation software adds those layers on top of QuickBooks, so follow ups keep going until the invoice is paid.",
  },
  {
    question: "How much does accounts receivable automation software cost?",
    answer:
      "Entry tools for small businesses run from about $19 to $80 per month. Mid market platforms typically land between $200 and $500 per month or price by custom quote. Enterprise suites are custom and can reach five figures per month. Yonovo prices by company size with a custom quote after a short demo, with every channel included.",
  },
  {
    question: "How long does it take to implement AR automation?",
    answer:
      "It ranges from a day to several months depending on the platform. Yonovo is typically live within one day. Mid market tools usually take 2 to 4 weeks of configuration. Enterprise platforms like HighRadius or Esker involve implementation projects of 3 to 6 months.",
  },
  {
    question: "Does AR automation work with my existing accounting system?",
    answer:
      "It should. Yonovo integrates with QuickBooks Online, Xero, NetSuite, Sage Intacct, Odoo, Stripe Billing, and BILL. It syncs invoices, customers, and aging, and writes payment status back so your ledger stays the source of truth.",
  },
  {
    question: "Do I need AR automation if I only send 50 invoices a month?",
    answer:
      "Use a simple test. If your team spends 5 or more hours a week chasing payments, or overdue invoices regularly slip past 60 days, automation pays for itself. Below that, the reminders built into your accounting tool may be enough for now.",
  },
];

const heroLogos: { name: string; src: string; width: number; className: string; noFilter?: boolean }[] = [
  { name: "Troyes", src: "/logos/troyes-white.png", width: 130, className: "h-[28px] lg:h-[47px]", noFilter: true },
  { name: "TDG Inc", src: "/logos/tdg-inc.svg", width: 200, className: "h-[65px] lg:h-[120px]" },
  { name: "SBC", src: "/logos/sbc.png", width: 200, className: "h-[50px] lg:h-[95px]" },
];

const proofLogos: { name: string; src: string; width: number; className: string }[] = [
  { name: "Troyes", src: "/logos/troyes.png", width: 130, className: "h-[28px] lg:h-[40px]" },
  { name: "TDG Inc", src: "/logos/tdg-inc.svg", width: 200, className: "h-[60px] lg:h-[100px]" },
  { name: "SBC", src: "/logos/sbc.png", width: 200, className: "h-[46px] lg:h-[80px]" },
];

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-brand-green" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-5 w-5 text-zinc-300" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

/* ── Page Component ── */

export default function ARAutomationSoftwarePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section data-navbar-dark className="w-full -mt-16 bg-[#030D27] pt-28 md:pt-32 pb-6 md:pb-8">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 md:gap-16">
            <div className="flex flex-col gap-4 md:gap-6">
              <SectionBadge label="Category guide" variant="dark" />
              <h1 className="text-balance font-medium text-[42px] text-white leading-[1.1] tracking-tight md:text-[70px]">
                Accounts Receivable Automation Software
              </h1>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <p className="text-balance text-base text-zinc-400 tracking-tight md:text-xl">
                  Accounts receivable automation software connects to your accounting system and follows up on unpaid invoices so your team does not have to. It is built for finance teams that are done chasing payments by hand. Here is what the category does, how the leading platforms compare, and how Yonovo runs the whole process for you.
                </p>
                <div className="flex w-full shrink-0 flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-6">
                  <Link href="/book-demo" className="w-full sm:w-auto">
                    <Button variant="brand" size="md" className="h-14 w-full px-[46px] text-lg font-medium whitespace-nowrap sm:w-auto">
                      Book Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Product visual */}
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/hero-dashboard.png"
                alt="Yonovo accounts receivable dashboard showing outstanding invoices, aging, and collection activity"
                width={2400}
                height={1400}
                priority
                className="w-full h-auto"
              />
            </div>

            {/* Social proof */}
            <div className="flex w-full flex-col items-center gap-0">
              <p className="text-center font-medium text-base text-zinc-500">
                Trusted by teams who hate chasing payments
              </p>
              <div className="w-full -mt-5">
                <div className="flex items-center justify-center gap-10">
                  {heroLogos.map((logo) => (
                    <Image
                      key={logo.name}
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width}
                      height={48}
                      className={`w-auto ${logo.noFilter ? "opacity-60" : "brightness-0 invert opacity-60"} ${logo.className}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quotable definition ── */}
      <section className="w-full bg-background py-12 md:py-16">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="mx-auto flex max-w-4xl flex-col gap-6">
            <h2 className="text-balance font-medium text-3xl text-foreground leading-tight tracking-tight md:text-[42px]">
              What is accounts receivable automation software?
            </h2>
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-10">
              <p className="text-lg text-foreground leading-relaxed md:text-xl">
                Accounts receivable automation software connects to a company&apos;s accounting system and takes over the manual work of collecting payment on invoices. It tracks which invoices are due or overdue, sends payment reminders on a schedule across channels like email, SMS, and phone, escalates accounts that need human attention, and records payments as they arrive. The goal is to shorten days sales outstanding, cut manual collection work, and keep cash flowing without adding headcount.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vendor comparison table ── */}
      <section className="w-full bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 md:gap-12">
            <div className="flex max-w-3xl flex-col gap-4">
              <SectionBadge label="Compare" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                How the top AR automation platforms compare
              </h2>
              <p className="text-base text-secondary leading-normal tracking-tight md:text-xl">
                Ten platforms, ordered by the size of company each one serves best. There is no universal winner here. The right tool depends on your accounting system, your invoice volume, and how much of the work you want handled for you.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border bg-background">
              <table className="w-full min-w-[1100px] text-left text-sm">
                <thead>
                  <tr className="bg-surface">
                    {tableColumns.map((col) => (
                      <th key={col} className="whitespace-nowrap px-5 py-4 font-medium text-xs text-muted uppercase tracking-wide">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vendorRows.map((row) => (
                    <tr key={row.vendor} className={row.highlight ? "bg-brand-green/5" : undefined}>
                      <td className="whitespace-nowrap border-t border-border px-5 py-4 font-medium text-foreground">
                        {row.vendor}
                      </td>
                      <td className="border-t border-border px-5 py-4 text-secondary">{row.bestFor}</td>
                      <td className="border-t border-border px-5 py-4 text-secondary">{row.channels}</td>
                      <td className="border-t border-border px-5 py-4 text-secondary">{row.integrations}</td>
                      <td className="whitespace-nowrap border-t border-border px-5 py-4 text-secondary">{row.setup}</td>
                      <td className="border-t border-border px-5 py-4 text-secondary">{row.pricing}</td>
                      <td className="border-t border-border px-5 py-4">
                        {row.pricingPublic ? <CheckIcon /> : <XIcon />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex max-w-3xl flex-col gap-4">
              <p className="text-base text-secondary leading-normal tracking-tight">
                A quick way to read the table. If you mainly need invoicing with light reminders, start at the top. If you want collections run for you without an implementation project, that is what{" "}
                <Link href="/pricing" className="text-brand-blue underline underline-offset-2">Yonovo</Link> is built for, priced by company size with a custom quote after a short demo. If you are an enterprise on SAP or Oracle, start at the bottom. Weighing Yonovo against a specific tool? See the head to head comparisons with{" "}
                <Link href="/yonovo-vs-upflow" className="text-brand-blue underline underline-offset-2">Upflow</Link>,{" "}
                <Link href="/yonovo-vs-chaser" className="text-brand-blue underline underline-offset-2">Chaser</Link>,{" "}
                <Link href="/yonovo-vs-invoiced" className="text-brand-blue underline underline-offset-2">Invoiced</Link>, and{" "}
                <Link href="/yonovo-vs-bill-com" className="text-brand-blue underline underline-offset-2">Bill.com</Link>, or read the full{" "}
                <Link href="/blog/best-ar-automation-software" className="text-brand-blue underline underline-offset-2">fifteen platform comparison</Link>.
              </p>
              <p className="text-base text-secondary leading-normal tracking-tight">
                If your question is narrower, we cover{" "}
                <Link href="/debt-collection-software" className="text-brand-blue underline underline-offset-2">debt collection software</Link> for overdue B2B invoices, the full{" "}
                <Link href="/ar-collections-software" className="text-brand-blue underline underline-offset-2">collections workflow</Link>, and{" "}
                <Link href="/dunning-management-software" className="text-brand-blue underline underline-offset-2">dunning management</Link> separately.
              </p>
              <p className="text-sm text-muted">
                Vendor details come from public pricing pages and product documentation, last checked August 2026. Tell us if something is out of date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Yonovo does differently ── */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-12 md:gap-20">
            <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col gap-4">
                <SectionBadge label="The Yonovo difference" />
                <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                  Most AR software tells you what needs doing. Yonovo does it.
                </h2>
              </div>
              <p className="text-base text-secondary leading-normal tracking-tight md:text-xl">
                The typical AR platform gives your team a better to do list: dashboards, reminders to send, workflows to configure and babysit. Yonovo takes the list and works it. The follow ups, the calls, the escalations. Your team steps in only where judgment is needed.
              </p>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-2xl text-foreground tracking-tight md:text-3xl">
                  The work happens without you
                </h3>
                <p className="text-base text-secondary leading-normal tracking-tight md:text-lg">
                  When an invoice goes overdue, Yonovo drafts and sends the follow up, waits the right amount of time, then escalates to the next channel. Email first, then SMS, then a phone call. Every message sends as your business, under your name and brand. Customers never see a third party.
                </p>
                <p className="text-base text-secondary leading-normal tracking-tight md:text-lg">
                  You are not left guessing about cost either.{" "}
                  <Link href="/pricing" className="text-brand-blue underline underline-offset-2">Pricing</Link> is a custom quote sized to your company, and every channel is included rather than metered per message.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border bg-surface p-4 md:p-6">
                <Image
                  src="/images/explore-dashboard.png"
                  alt="Yonovo dashboard with receivables overview and collection activity"
                  width={1600}
                  height={1000}
                  className="w-full h-auto rounded-lg shadow-xl border border-zinc-200/60"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
              <div className="order-1 overflow-hidden rounded-2xl border border-border bg-surface p-4 md:order-none md:p-6">
                <Image
                  src="/images/explore-workflows.png"
                  alt="Yonovo collection workflow builder with timing and channel rules"
                  width={1600}
                  height={1000}
                  className="w-full h-auto rounded-lg shadow-xl border border-zinc-200/60"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-2xl text-foreground tracking-tight md:text-3xl">
                  Your rules, applied consistently
                </h3>
                <p className="text-base text-secondary leading-normal tracking-tight md:text-lg">
                  You decide how each customer segment gets treated: when reminders start, how quickly they escalate, which accounts need approval before anything sends. Yonovo then applies those rules on every invoice, every day. No more collections that depend on who remembered to follow up this week.
                </p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-2xl text-foreground tracking-tight md:text-3xl">
                  Humans handle the exceptions
                </h3>
                <p className="text-base text-secondary leading-normal tracking-tight md:text-lg">
                  A customer disputes an invoice, promises payment, or pays partially. Yonovo pauses the outreach on that account and hands it to your team with the full history. The routine ninety percent runs itself. The judgment calls stay yours.
                </p>
                <div className="mt-2">
                  <Link href="/book-demo">
                    <Button variant="brand" size="md" className="h-12 px-8 font-medium">
                      See it on your invoices
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border bg-surface p-4 md:p-6">
                <Image
                  src="/images/explore-inbox.png"
                  alt="Yonovo inbox showing customer replies and escalated accounts"
                  width={1600}
                  height={1000}
                  className="w-full h-auto rounded-lg shadow-xl border border-zinc-200/60"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="w-full bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-10 md:gap-14">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
              <SectionBadge label="How it works" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                From connected to collecting in six steps
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div key={step.number} className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-6 md:p-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy font-medium text-white">
                    {step.number}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium text-lg text-foreground tracking-tight md:text-xl">
                      {step.title}
                    </h3>
                    <p className="text-sm text-secondary tracking-tight md:text-base">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-background p-4 md:p-8">
              <Image
                src="/images/explore-reporting.png"
                alt="Yonovo reporting view with aging, DSO, and recovery metrics"
                width={2000}
                height={1100}
                className="w-full h-auto rounded-lg shadow-xl border border-zinc-200/60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof ── */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-10 md:gap-14">
            <div className="flex max-w-3xl flex-col gap-4">
              <SectionBadge label="Proof" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                What happened when TDG Inc switched
              </h2>
              <p className="text-base text-secondary leading-normal tracking-tight md:text-xl">
                TDG Inc is a wholesale distributor in Toronto running QuickBooks. Within 90 days of connecting Yonovo, here is what changed.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {tdgStats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-6 md:p-8">
                  <span className="font-medium text-4xl text-foreground tracking-tight md:text-5xl">{stat.value}</span>
                  <span className="text-sm text-secondary md:text-base">{stat.label}</span>
                </div>
              ))}
            </div>

            <figure className="mx-auto flex max-w-3xl flex-col gap-4">
              <blockquote className="text-balance text-center font-medium text-xl text-foreground leading-relaxed tracking-tight md:text-2xl">
                &ldquo;The most valuable thing Yonovo delivered was giving us our time back. We went from spending hours every day on collections to barely thinking about it. The system just handles it.&rdquo;
              </blockquote>
              <figcaption className="text-center text-sm text-secondary md:text-base">
                Mohammad Alshalabi, Director of Finance, TDG Inc
              </figcaption>
            </figure>

            <div className="flex items-center justify-center gap-10">
              {proofLogos.map((logo) => (
                <Image
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={48}
                  className={`w-auto grayscale opacity-60 ${logo.className}`}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link href="/case-studies/tdg-inc" className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-md md:p-8">
                <span className="font-medium text-lg text-foreground group-hover:text-brand-blue transition-colors">
                  Read the TDG Inc case study
                </span>
                <span className="text-sm text-secondary leading-relaxed md:text-base">
                  How a wholesale distributor cut manual follow ups by 80 percent and reclaimed 25 plus hours per week.
                </span>
              </Link>
              <Link href="/case-studies/troyes" className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-md md:p-8">
                <span className="font-medium text-lg text-foreground group-hover:text-brand-blue transition-colors">
                  Read the Troyes case study
                </span>
                <span className="text-sm text-secondary leading-relaxed md:text-base">
                  From fully manual to fully automated in one day, with 45 percent faster payment turnaround.
                </span>
              </Link>
            </div>

            <div className="flex justify-center">
              <Link href="/book-demo">
                <Button variant="brand" size="md" className="h-14 px-[46px] text-lg font-medium whitespace-nowrap">
                  Book Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <section className="w-full bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 md:gap-10">
            <div className="flex max-w-3xl flex-col gap-4">
              <SectionBadge label="Integrations" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                Works with the books you already keep
              </h2>
              <p className="text-base text-secondary leading-normal tracking-tight md:text-xl">
                Yonovo connects to seven accounting and billing systems. Pick yours to see exactly how the integration works.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
              {integrations.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-background p-6 text-center transition-shadow hover:shadow-md"
                >
                  <Image src={item.icon} alt={item.name} width={40} height={40} className="h-10 w-10 object-contain" />
                  <span className="font-medium text-sm text-foreground group-hover:text-brand-blue transition-colors">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <h2 className="font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px] mb-8 md:mb-12">
            Frequently asked questions
          </h2>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* ── Related Resources ── */}
      <RelatedResources items={[
        { label: "Debt Collection Software for B2B Invoices", href: "/debt-collection-software", description: "Collecting your own overdue invoices, under your brand, without an agency." },
        { label: "Accounts Receivable Collections Software", href: "/ar-collections-software", description: "The collections workflow day by day, from aging buckets to escalation." },
        { label: "Dunning Management Software", href: "/dunning-management-software", description: "The written reminder layer of collections, stage by stage." },
        { label: "Accounts Receivable Statistics", href: "/accounts-receivable-statistics", description: "Verified figures on late payments, DSO, and collections effort, every one linked to its original source." },
        { label: "Best AR Automation Software: 15 Platforms Compared", href: "/blog/best-ar-automation-software", description: "The deep dive behind the table above, with a full profile of every platform." },
        { label: "What Is AR Automation?", href: "/blog/what-is-ar-automation", description: "A plain language introduction to the category and how the pieces fit together." },
        { label: "Yonovo vs Upflow", href: "/yonovo-vs-upflow", description: "Side by side on onboarding, pricing, channels, and best fit." },
        { label: "Yonovo vs Chaser", href: "/yonovo-vs-chaser", description: "How the two platforms compare for US and UK teams." },
        { label: "Yonovo vs Invoiced", href: "/yonovo-vs-invoiced", description: "White glove AR automation against an enterprise invoice to cash suite." },
        { label: "Yonovo vs Bill.com", href: "/yonovo-vs-bill-com", description: "A dedicated collections engine against a broad financial operations suite." },
      ]} />

      {/* ── CTA ── */}
      <CTASection />
    </>
  );
}
