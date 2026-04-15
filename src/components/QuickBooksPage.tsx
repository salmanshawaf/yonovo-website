import Image from "next/image";
import Link from "next/link";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/Button";
import FAQAccordion from "@/components/FAQAccordion";
import VideoPlayer from "@/components/VideoPlayer";
import RelatedResources from "@/components/RelatedResources";

/* ── Data ── */

const problems = [
  {
    title: "No visibility",
    description:
      "Aging reports only tell part of the story. Your team is flying blind on DSO and customer risk.",
  },
  {
    title: "Manual follow ups",
    description:
      "Copying invoice details into emails and tracking responses in spreadsheets. Accounts slip through the cracks.",
  },
  {
    title: "Inconsistent",
    description:
      "Different people, different messages, different timing. Customers get confused and payments stall.",
  },
  {
    title: "Late payments",
    description:
      "Every day an invoice goes uncollected costs you money. Overdue accounts quietly pile up.",
  },
];

const comparisonFeatures = [
  { feature: "Invoice creation and tracking", qb: true, yonovo: true },
  { feature: "Aging reports", qb: true, yonovo: true },
  { feature: "Automated payment reminders", qb: false, yonovo: true },
  { feature: "Multi-channel follow ups (email, SMS, phone)", qb: false, yonovo: true },
  { feature: "AI-powered collection strategies", qb: false, yonovo: true },
  { feature: "Customer risk scoring", qb: false, yonovo: true },
  { feature: "Escalation workflows", qb: false, yonovo: true },
  { feature: "Real time AR dashboard", qb: false, yonovo: true },
  { feature: "Payment portal for customers", qb: false, yonovo: true },
  { feature: "DSO reduction tracking", qb: false, yonovo: true },
];

const timelineSteps = [
  {
    number: 1,
    text: "Invoice your customers as usual, from QuickBooks.",
    image: "/images/qb-step-1-invoice.png",
  },
  {
    number: 2,
    text: "Yonovo automatically syncs your invoices, contacts, and payment data.",
    image: "/images/highlight-oversight.png",
    overlay: "/images/qb-step-2-stats.png",
  },
  {
    number: 3,
    text: "When an invoice goes overdue, Yonovo follows up by email, SMS, and AI-powered phone calls on your behalf.",
    image: "/images/qb-step-3-followup.png",
  },
  {
    number: 4,
    text: "The AI adapts its approach over time, learning what works for each customer and escalating to your team when a human is needed.",
    image: "/images/qb-step-4-learns.png",
  },
  {
    number: 5,
    text: "Monitor recovery rates, DSO, and at-risk invoices from your dashboard so you always know where your receivables stand.",
    image: "/images/qb-step-5-dashboard.png",
  },
];

const faqs = [
  {
    question: "How does Yonovo connect to QuickBooks?",
    answer:
      "Yonovo uses a secure OAuth-based connection. Click \"Connect to QuickBooks,\" authorize access with your admin credentials, and your data syncs automatically. No IT support needed.",
  },
  {
    question: "What QuickBooks data does Yonovo access?",
    answer:
      "Yonovo syncs your invoices, customers, payment status, and aging data. Yonovo never modifies your QuickBooks records. All data flows one way, from QuickBooks to Yonovo, with payment status updates written back when collected.",
  },
  {
    question: "Does Yonovo work with QuickBooks Desktop?",
    answer:
      "Yonovo supports QuickBooks Online only. QuickBooks Desktop is not supported.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most teams are live within one day. Connect QuickBooks, set your preferences, and Yonovo starts working on your overdue invoices right away.",
  },
  {
    question: "Will my customers know I'm using Yonovo?",
    answer:
      "No. Every message goes out from your company name and email address. Customers see your brand, not Yonovo's.",
  },
  {
    question: "Can I review messages before they send?",
    answer:
      "Yes. You can approve every message manually or let Yonovo send automatically based on your rules. You stay in full control at all times.",
  },
  {
    question: "What happens if a customer disputes an invoice?",
    answer:
      "Yonovo flags disputes and pauses automated follow ups for that invoice. Your team gets notified with full context so they can handle it directly.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Start free with no credit card required. See results before committing to a plan.",
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

const creditCardIcon = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 16 17">
    <path d="M14.66 6.5H1.33M14.66 6.5c0 .28 0 .59 0 .94V9.5M14.66 6.5c-.01-.9-.06-1.44-.29-1.88a2.67 2.67 0 0 0-1.16-1.16C12.63 3.17 11.89 3.17 10.39 3.17H5.59c-1.49 0-2.24 0-2.81.29a2.67 2.67 0 0 0-1.16 1.16c-.22.44-.28.98-.29 1.88M1.33 6.5c0 .28 0 .59 0 .94v2.13c0 1.49 0 2.24.29 2.81.26.5.67.91 1.17 1.17.57.29 1.31.29 2.81.29h2.51M5.99 9.17H3.99" />
    <path d="M11.25 14.58l1.41-1.41m0 0l1.42-1.42m-1.42 1.42l-1.41-1.42m1.41 1.42l1.42 1.42" />
  </svg>
);

const logos: { name: string; src: string; width: number; className: string; noFilter?: boolean }[] = [
  { name: "Troyes", src: "/logos/troyes-white.png", width: 130, className: "h-[28px] lg:h-[47px]", noFilter: true },
  { name: "TDG Inc", src: "/logos/tdg-inc.svg", width: 200, className: "h-[65px] lg:h-[120px]" },
  { name: "SBC", src: "/logos/sbc.png", width: 200, className: "h-[50px] lg:h-[95px]" },
];

/* ── Page Component ── */

export default function QuickBooksPage() {
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
                Sync QuickBooks and get paid
              </h1>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <p className="text-balance text-base text-zinc-400 tracking-tight md:text-xl">
                  Yonovo connects to QuickBooks and takes over the collections process. Every overdue invoice gets followed up by email, text, and phone so your team can stop spending hours on manual reminders.
                </p>
                <div className="flex w-full shrink-0 flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-6">
                  <Link href="/book-demo" className="w-full sm:w-auto">
                    <Button variant="brand" size="md" className="h-14 w-full px-[46px] text-lg font-medium whitespace-nowrap sm:w-auto">
                      Book Demo
                    </Button>
                  </Link>
                  <Link href="https://dashboard.yonovo.ai/login" className="w-full sm:w-auto">
                    <Button variant="ghost-light" size="md" className="h-14 w-full whitespace-nowrap sm:w-auto">
                      Start Free
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Media grid */}
            <div className="flex flex-col gap-6 md:grid md:grid-cols-[2fr_3fr] md:gap-8">
              {/* Left — Video (square) */}
              <VideoPlayer
                src="/videos/quickbooks-sync.mov"
                className="aspect-square w-full overflow-hidden rounded-2xl bg-zinc-900 border border-white/10"
              />
              {/* Right — QuickBooks logo (desktop: landscape, mobile: square) */}
              <div className="relative hidden w-full items-center justify-center overflow-hidden rounded-2xl md:flex md:aspect-[1.5]">
                <Image src="/logos/quickbooks-dark.png" alt="Intuit QuickBooks" width={320} height={77} className="w-[60%] h-auto" />
              </div>
              <div className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl md:hidden">
                <Image src="/logos/quickbooks-dark.png" alt="Intuit QuickBooks" width={320} height={77} className="w-[55%] h-auto" />
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
                QuickBooks wasn&apos;t made for collections
              </h2>
              <p className="text-balance text-base text-secondary leading-normal tracking-tight md:text-xl">
                QuickBooks is great at invoicing, expense tracking, and financial reporting. But it was never designed to collect what is owed after the invoice is sent. That gap falls on your team, and it is costing you time, cash flow, and focus every single week.
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
                  Yonovo picks up where QuickBooks stops
                </h2>
              </div>
              <p className="text-base text-secondary leading-normal tracking-tight md:text-xl">
                One connection is all it takes. From there, Yonovo handles the outreach, the timing, and the escalations while your team focuses on the work that actually moves the business forward.
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
                  title: "Instant sync",
                  desc: "Invoices, contacts, and aging data stay current in real time. No exports or manual imports.",
                },
                {
                  icon: (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4" />
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    </svg>
                  ),
                  title: "Always on brand",
                  desc: "Messages go out under your company name, email, and voice. Customers only see you.",
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
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                    </svg>
                  ),
                  title: "Smart escalation",
                  desc: "Accounts that need a human touch get routed to the right person with full context.",
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
                const imageBlock = step.image ? (
                  <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-100 to-zinc-50 border border-border flex flex-col justify-center gap-3 p-6 md:p-10 ${step.overlay ? "items-center" : "items-center"}`}>
                    {step.overlay && (
                      <img src={step.overlay} alt="" className="w-[90%] h-auto rounded-lg shadow-2xl border border-zinc-200/60" />
                    )}
                    <img src={step.image} alt={step.text} className="max-w-full max-h-full rounded-lg shadow-xl border border-zinc-200/60" />
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
                See what your QuickBooks setup is missing and what you unlock when you add Yonovo.
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
                  <Image src="/logos/quickbooks.png" alt="Intuit QuickBooks" width={120} height={29} className="h-7 w-auto" />
                </div>
                <div className="flex items-center justify-center gap-1.5 border-l border-brand-green/30 bg-brand-green/5 px-3 py-4">
                  <Image src="/logos/quickbooks-icon.png" alt="QuickBooks" width={24} height={24} className="h-[26px] w-[26px]" />
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
                    {row.qb ? <CheckIcon /> : <XIcon />}
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
                      {row.qb ? <CheckIcon /> : <XIcon />}
                      <span className="text-sm text-muted">QuickBooks</span>
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
      <RelatedResources items={[
        { label: "Case Study: TDG Inc.", href: "/case-studies/tdg-inc", description: "How TDG Inc. reduced manual follow-ups by 80% and cut DSO by 15 days with Yonovo + QuickBooks." },
        { label: "Case Study: Troyes Canada", href: "/case-studies/troyes", description: "Troyes went from fully manual to automated collections in a single day, saving 25+ hours per month." },
        { label: "Best QuickBooks AR Integrations", href: "/blog/best-quickbooks-ar-integration", description: "A comparison of the top AR automation tools for QuickBooks Online users." },
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
                <Link href="https://dashboard.yonovo.ai/login" className="block">
                  <Button variant="ghost-dark" size="md" className="h-14 w-full whitespace-nowrap">
                    Start Free
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-2 text-muted text-sm">
                {creditCardIcon}
                <p>No card required</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
