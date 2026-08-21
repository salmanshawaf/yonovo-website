import Image from "next/image";
import imgBillStep1Connect from "../../public/images/bill-step-1-connect.png";
import Link from "next/link";
import {
  StepSyncIllustration,
  StepFollowUpIllustration,
  StepAdaptsIllustration,
  StepDashboardIllustration,
} from "@/components/StepIllustrations";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/Button";
import LedgerConnectAnimation from "@/components/LedgerConnectAnimation";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedResources from "@/components/RelatedResources";

/* ── Data ── */

const problems = [
  {
    title: "No visibility",
    description:
      "BILL tracks what is invoiced and paid, but not who is at risk. Your team is left guessing on DSO and collection priorities.",
  },
  {
    title: "Manual follow ups",
    description:
      "Chasing overdue invoices means copying details into emails and tracking replies in spreadsheets. Accounts slip through the cracks.",
  },
  {
    title: "Inconsistent",
    description:
      "Different people, different messages, different timing. Customers get confused and payments stall.",
  },
  {
    title: "Late payments",
    description:
      "Unpaid invoices quietly pile up. Every day an invoice goes uncollected costs you cash flow.",
  },
];

const comparisonFeatures = [
  { feature: "Invoice creation and tracking", bill: true, yonovo: true },
  { feature: "Customer payment links", bill: true, yonovo: true },
  { feature: "Received payment records", bill: true, yonovo: true },
  { feature: "Automated payment reminders", bill: false, yonovo: true },
  { feature: "Multi-channel follow ups (email, SMS, phone)", bill: false, yonovo: true },
  { feature: "AI-powered collection strategies", bill: false, yonovo: true },
  { feature: "Pay-now links inside reminders", bill: false, yonovo: true },
  { feature: "Auto pause when payment is scheduled", bill: false, yonovo: true },
  { feature: "Real time AR dashboard", bill: false, yonovo: true },
  { feature: "DSO reduction tracking", bill: false, yonovo: true },
];

const timelineSteps = [
  {
    number: 1,
    text: "Connect BILL in a few clicks. Enter your BILL organization ID and sync-token credentials on the integrations page. No OAuth redirect needed.",
    image: imgBillStep1Connect,
  },
  {
    number: 2,
    text: "Yonovo runs a historical sync and imports your BILL customers, invoices, and received payments in real time.",
    illustration: () => <StepSyncIllustration ledger="BILL" />,
  },
  {
    number: 3,
    text: "When an invoice goes overdue, Yonovo follows up by email, SMS, and AI-powered phone calls, with the BILL payment link included so customers can pay from the reminder.",
    illustration: StepFollowUpIllustration,
  },
  {
    number: 4,
    text: "When a customer schedules payment in BILL, Yonovo automatically pauses follow-ups and resumes only if the payment fails, is cancelled, or lapses.",
    illustration: StepAdaptsIllustration,
  },
  {
    number: 5,
    text: "Monitor recovery rates, DSO, and at-risk invoices from your dashboard so you always know where your receivables stand.",
    illustration: StepDashboardIllustration,
  },
];

export const faqs = [
  {
    question: "How does Yonovo connect to BILL?",
    answer:
      "BILL connects with a guided manual setup, not OAuth. On the integrations page you enter your BILL organization ID and sync-token credentials. Yonovo validates them with a lightweight BILL API call before saving, then runs your first historical sync.",
  },
  {
    question: "What BILL data does Yonovo access?",
    answer:
      "Yonovo imports your BILL customers, invoices, and received payments, normalized into the same models used for QuickBooks and Xero. Invoices carry the correct customer, dates, amount, balance, currency, and status.",
  },
  {
    question: "Does the BILL data stay up to date?",
    answer:
      "Yes. After the first import, incremental sync keeps your AR data fresh using BILL updated-time filters, with idempotent upserts so records update rather than duplicate. Where BILL supports it, syncs are also triggered by webhooks. A live sync panel shows near-real-time progress.",
  },
  {
    question: "Can customers pay directly from a Yonovo reminder?",
    answer:
      "Yes. Yonovo pulls in the BILL payment link for each invoice and includes it in your follow-up messages, so customers can pay in one click. Payment links require a verified receivables bank account in BILL.",
  },
  {
    question: "What happens when a customer schedules a payment?",
    answer:
      "When a customer schedules payment in BILL, Yonovo automatically pauses follow-ups for that invoice, notes in the Inbox that reminders were paused because payment is scheduled, and leaves the invoice out of the over-15-day overdue report while it is pending. If the payment fails, is cancelled, or lapses, collections resume automatically.",
  },
  {
    question: "Does Yonovo process the payment itself?",
    answer:
      "No. Yonovo does not collect or process payments. Payment happens through BILL's own payment links. Yonovo surfaces those links in reminders and tracks the received payments that BILL records.",
  },
  {
    question: "Will my customers know I'm using Yonovo?",
    answer:
      "No. Every message goes out from your company name and email address. Customers see your brand, not Yonovo's.",
  },
  {
    question: "What happens if a customer disputes an invoice?",
    answer:
      "Yonovo flags disputes and pauses automated follow ups for that invoice. Your team gets notified with full context so they can handle it directly.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a demo with our team. We'll connect BILL, show you Yonovo running on your real invoices, and get you set up. Most teams are live within a day.",
  },
];

/* ── Icons ── */

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

const logos: { name: string; src: string; width: number; className: string; noFilter?: boolean }[] = [
  { name: "Troyes", src: "/logos/troyes-white.png", width: 130, className: "h-[28px] lg:h-[47px]", noFilter: true },
  { name: "TDG Inc", src: "/logos/tdg-inc.svg", width: 200, className: "h-[65px] lg:h-[120px]" },
  { name: "SBC", src: "/logos/sbc.png", width: 200, className: "h-[50px] lg:h-[95px]" },
];

/* ── Page Component ── */

export default function BillPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section data-navbar-dark className="w-full -mt-16 bg-[#030D27] pt-28 md:pt-32 pb-6 md:pb-8">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 md:gap-16">
            {/* Text block */}
            <div className="flex flex-col gap-4 md:gap-6">
              <SectionBadge label="Integration" variant="light" />
              <h1 className="text-balance font-medium text-[42px] text-white leading-[1.1] tracking-tight md:text-[70px]">
                Sync BILL and get paid
              </h1>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <p className="text-balance text-base text-zinc-400 tracking-tight md:text-xl">
                  Yonovo is AR automation for BILL. It connects to your BILL account and takes over the collections process. Every overdue invoice gets followed up by email, text, and phone, with your BILL payment link included so customers can pay in one click.
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

            {/* Media grid */}
            <div className="flex flex-col gap-6 md:grid md:grid-cols-[2fr_3fr] md:gap-8">
              {/* Left — BILL connect animation (square) */}
              <LedgerConnectAnimation
                name="BILL"
                logo="/logos/bill-icon.svg"
                className="aspect-square w-full overflow-hidden rounded-2xl border border-white/10"
              />
              {/* Right — BILL logo (desktop: landscape, mobile: square) */}
              <div className="relative hidden w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:flex md:aspect-[1.5]">
                <Image src="/logos/bill.svg" alt="BILL" width={320} height={211} className="w-[22%] h-auto" />
              </div>
              <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:hidden">
                <Image src="/logos/bill.svg" alt="BILL" width={320} height={211} className="w-[24%] h-auto" />
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex w-full flex-col items-center gap-0">
              <p className="text-center font-medium text-base text-zinc-500">
                Trusted by teams who hate chasing payments
              </p>
              <div className="w-full -mt-5">
                <div className="flex items-center justify-center gap-10">
                  {logos.map((logo) => (
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

      {/* ── Problem ── */}
      <section className="w-full bg-surface py-12 md:py-15">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            {/* Left — heading */}
            <div className="flex flex-1 flex-col gap-4">
              <SectionBadge label="Problem" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                BILL wasn&apos;t made for collections
              </h2>
              <p className="text-balance text-base text-secondary leading-normal tracking-tight md:text-xl">
                BILL is great at invoicing, bill pay, and moving money. But it was never designed to chase what is owed after an invoice goes out. That gap falls on your team, and it is costing you time, cash flow, and focus every single week.
              </p>
            </div>

            {/* Right — 2×2 card grid */}
            <div className="grid flex-1 auto-rows-max grid-cols-1 content-center gap-3 md:grid-cols-2">
              {problems.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-row gap-5 p-6 md:px-8 md:py-6"
                >
                  <div className="h-8 w-1 shrink-0 rounded-full bg-brand-red" />
                  <div className="flex flex-col gap-2">
                    <span className="font-medium text-xl text-foreground tracking-tight md:text-2xl">
                      {card.title}
                    </span>
                    <p className="text-sm text-secondary tracking-tight md:text-base">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Solution ── */}
      <section className="w-full bg-background py-12 md:py-15">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 md:gap-16">
            {/* Header — heading left, description right */}
            <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-16">
              <div className="flex flex-1 flex-col gap-4">
                <SectionBadge label="Solution" />
                <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                  Yonovo picks up where BILL stops
                </h2>
              </div>
              <p className="text-base text-secondary leading-normal tracking-tight md:text-xl">
                BILL joins QuickBooks, Xero, and CSV as a supported accounting source. Connect it once, and Yonovo handles the outreach, the timing, and the escalations while your team focuses on the work that actually moves the business forward.
              </p>
            </div>

            {/* 3×2 card grid — gap-px trick for 1px internal borders */}
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
              {[
                {
                  icon: (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  ),
                  title: "Real-time sync",
                  desc: "Customers, invoices, and received payments stay current with incremental sync and webhooks where BILL supports them.",
                },
                {
                  icon: (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  ),
                  title: "Pay-now links",
                  desc: "BILL payment links ride along in every reminder so customers can pay directly from the message.",
                },
                {
                  icon: (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  ),
                  title: "Multi-channel",
                  desc: "Reach customers across email, SMS, and phone so no single ignored channel holds up a payment.",
                },
                {
                  icon: (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ),
                  title: "Smart pause",
                  desc: "When a customer schedules payment in BILL, Yonovo pauses follow-ups automatically and resumes only if it lapses.",
                },
                {
                  icon: (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  ),
                  title: "Reduce DSO",
                  desc: "Consistent outreach closes the gap between invoicing and payment so cash arrives sooner.",
                },
                {
                  icon: (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  ),
                  title: "Better relationships",
                  desc: "Professional reminders replace awkward one-off emails. Customers respond better and stay happy.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col gap-6 bg-background p-6 md:gap-10 md:p-8"
                >
                  <div className="flex h-7 w-7 items-center justify-center text-brand-green">
                    {card.icon}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium text-xl text-foreground tracking-tight md:text-2xl">
                      {card.title}
                    </h3>
                    <p className="text-sm text-secondary tracking-tight md:text-base">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Start Using Yonovo in Minutes ── */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          {/* Header */}
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <SectionBadge label="How it works" />
            <h2 className="font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
              Start using Yonovo in minutes
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative mx-auto mt-16 max-w-4xl">
            {/* Vertical dashed line (desktop only) */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 border-l-2 border-dashed border-border md:block" />

            <div className="flex flex-col gap-16 md:gap-24">
              {timelineSteps.map((step, i) => {
                const isOdd = i % 2 === 0;
                const Illustration = step.illustration;
                const imageBlock = Illustration ? (
                  <Illustration />
                ) : step.image ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-100 to-zinc-50 border border-border flex flex-col items-center justify-center gap-3 p-6 md:p-10">
                    <Image src={step.image} alt={step.text} sizes="(min-width: 768px) 400px, 90vw" className="max-w-full max-h-full rounded-lg shadow-xl border border-zinc-200/60" />
                  </div>
                ) : (
                  <div className="aspect-[4/3] w-full rounded-2xl bg-background border border-border" />
                );

                return (
                  <div key={step.number} className="relative">
                    {/* Mobile layout */}
                    <div className="flex flex-col gap-4 md:hidden">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy text-white font-medium">
                        {step.number}
                      </div>
                      <p className="text-lg font-medium text-foreground leading-relaxed">
                        {step.text}
                      </p>
                      {imageBlock}
                    </div>

                    {/* Desktop layout — zigzag */}
                    <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-12">
                      {/* Left side */}
                      <div className={isOdd ? "flex flex-col gap-3" : "flex items-center justify-center"}>
                        {isOdd ? (
                          <>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy text-white font-medium">
                              {step.number}
                            </div>
                            <p className="text-lg font-medium text-foreground leading-relaxed">
                              {step.text}
                            </p>
                          </>
                        ) : (
                          imageBlock
                        )}
                      </div>

                      {/* Center dot */}
                      <div className="relative z-10 flex h-4 w-4 items-center justify-center">
                        <div className="h-3 w-3 rounded-full bg-brand-navy" />
                      </div>

                      {/* Right side */}
                      <div className={isOdd ? "flex items-center justify-center" : "flex flex-col gap-3"}>
                        {isOdd ? (
                          imageBlock
                        ) : (
                          <>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy text-white font-medium">
                              {step.number}
                            </div>
                            <p className="text-lg font-medium text-foreground leading-relaxed">
                              {step.text}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="w-full bg-surface py-12 md:py-15">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col items-center gap-8 md:gap-14">
            {/* Header */}
            <div className="flex flex-col items-center gap-4 text-center">
              <SectionBadge label="Compare" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                What changes when you add Yonovo
              </h2>
              <p className="text-base text-secondary leading-normal tracking-tight md:text-xl">
                See what your BILL setup is missing and what you unlock when you add Yonovo.
              </p>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-border bg-background max-w-3xl w-full">
              {/* Header Row */}
              <div className="grid grid-cols-[1fr_140px_220px] border-b border-border">
                <div className="px-6 py-4">
                  <span className="font-medium text-sm text-muted uppercase tracking-wide">Feature</span>
                </div>
                <div className="flex items-center justify-center border-l border-border px-4 py-4">
                  <Image src="/logos/bill.svg" alt="BILL" width={44} height={29} className="h-6 w-auto" />
                </div>
                <div className="flex items-center justify-center gap-1.5 border-l border-brand-green/30 bg-brand-green/5 px-3 py-4">
                  <Image src="/logos/bill-icon.svg" alt="BILL" width={24} height={24} className="h-[26px] w-[26px] rounded-md" />
                  <span className="text-foreground font-medium text-sm">+</span>
                  <Image src="/yonovo-logo.png" alt="Yonovo" width={72} height={18} className="h-3.5 w-auto" />
                </div>
              </div>

              {/* Feature Rows */}
              {comparisonFeatures.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-[1fr_140px_220px] ${i !== comparisonFeatures.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="px-6 py-4 flex items-center">
                    <span className="text-foreground">{row.feature}</span>
                  </div>
                  <div className="flex items-center justify-center border-l border-border px-4 py-4">
                    {row.bill ? <CheckIcon /> : <XIcon />}
                  </div>
                  <div className="flex items-center justify-center border-l border-brand-green/30 bg-brand-green/5 px-4 py-4">
                    <CheckIcon />
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Table */}
            <div className="flex flex-col gap-3 md:hidden">
              {comparisonFeatures.map((row) => (
                <div key={row.feature} className="rounded-2xl border border-border bg-background p-4">
                  <div className="font-medium text-foreground mb-3">{row.feature}</div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      {row.bill ? <CheckIcon /> : <XIcon />}
                      <span className="text-sm text-muted">BILL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon />
                      <span className="text-sm text-foreground font-medium">+ Yonovo</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <h2 className="font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px] mb-8 md:mb-12">
            FAQs
          </h2>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* ── Related Resources ── */}
      <RelatedResources background="background" items={[
        { label: "Accounts Receivable Automation Software", href: "/accounts-receivable-automation-software", description: "The category guide to AR automation software, with a ten vendor comparison." },
        { label: "Debt Collection Software for B2B Invoices", href: "/debt-collection-software", description: "Chasing overdue B2B invoices yourself, with software instead of an agency." },
        { label: "Case Study: TDG Inc.", href: "/case-studies/tdg-inc", description: "How TDG Inc. reduced manual follow-ups by 80% and cut DSO by 15 days with Yonovo." },
        { label: "Case Study: Troyes Canada", href: "/case-studies/troyes", description: "Troyes went from fully manual to automated collections in a single day, saving 25+ hours per month." },
        { label: "How to Automate AR", href: "/blog", description: "Tips and playbooks for collecting faster without adding headcount." },
      ]} />

      {/* ── CTA ── */}
      <section className="w-full bg-gradient-to-b from-background from-60% to-brand-navy to-60%">
        <div className="mx-auto max-w-[1600px] px-6">
          <div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden border-t border-border bg-white px-6 py-12 pb-30 md:gap-8 md:rounded-3xl md:border md:p-15 lg:p-25">
            <div className="pointer-events-none absolute bottom-0 left-0 hidden md:block md:h-[40%] lg:h-[50%]">
              <div className="h-[350px] w-[350px] rounded-full bg-brand-blue opacity-70 blur-3xl" />
            </div>
            <div className="pointer-events-none absolute right-0 bottom-0 hidden md:block md:h-[40%] lg:h-[50%]">
              <div className="h-[350px] w-[350px] rounded-full bg-brand-blue opacity-70 blur-3xl" />
            </div>

            <div className="flex flex-col gap-4 md:max-w-[850px] md:gap-6">
              <p className="text-center font-medium text-4xl text-foreground leading-tight tracking-tighter md:text-balance md:text-5xl lg:text-[54px]">
                Ready to put collections on autopilot?
              </p>
              <p className="text-center font-normal text-base text-secondary tracking-[-0.4px] md:text-balance md:text-xl">
                Join the finance teams that are collecting faster, saving hours,
                and keeping every customer relationship intact.
              </p>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-6 md:gap-4">
              <div className="flex w-full max-w-sm flex-col gap-3 px-6 sm:max-w-none sm:w-auto sm:flex-row sm:gap-6 sm:px-0">
                <Link href="/book-demo" className="block">
                  <Button variant="brand" size="md" className="h-14 w-full px-[46px] text-lg font-medium whitespace-nowrap">
                    Book Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
