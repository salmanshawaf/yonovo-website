import Image from "next/image";
import Link from "next/link";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/Button";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedResources from "@/components/RelatedResources";
import CTASection from "@/components/sections/CTASection";

/* ── Data ── */

const whatThisIs = [
  "Software for collecting your own unpaid B2B invoices",
  "Every message sends as your business, under your brand",
  "Follow ups across email, SMS, phone, and WhatsApp",
  "Connects to the accounting system you already run",
];

const whatThisIsNot = [
  "Consumer debt recovery",
  "A third party collection agency",
  "Credit bureau reporting",
  "A percentage cut of what you recover",
];

const problems = [
  {
    title: "Net terms stretch",
    description:
      "Net 30 turns into net 60. On net 60 and net 90 terms, customers still stretch further. The longer an invoice sits, the harder it gets to collect.",
  },
  {
    title: "Someone has to chase",
    description:
      "Chasing is manual: copying invoice details into emails, tracking replies in spreadsheets, remembering who promised what.",
  },
  {
    title: "Chasing is inconsistent",
    description:
      "Different people, different messages, different timing. Customers learn that your due dates are suggestions.",
  },
  {
    title: "Accounts fall through the cracks",
    description:
      "As invoice volume grows, follow up coverage shrinks. The accounts nobody chased become the write offs nobody wanted.",
  },
];

const collectSteps = [
  {
    number: 1,
    text: "Your invoices, customers, and aging sync from your accounting system. Yonovo checks the ledger before every message, so a paid invoice is never chased.",
  },
  {
    number: 2,
    text: "Overdue invoices enter a sequence that escalates with age. A friendly email first. Then SMS. Then a phone call. Timing and tone follow the rules you set.",
    image: "/images/feature-multichannel.png",
  },
  {
    number: 3,
    text: "Accounts that keep ignoring outreach escalate on your rules: a different contact, a firmer notice, or a handoff to your team for a personal conversation.",
    image: "/images/feature-escalation.png",
  },
  {
    number: 4,
    text: "Payments, partial payments, and promise dates write back to your ledger. Collections and accounting stay in agreement without double entry.",
  },
];

const edgeCases = [
  {
    title: "Disputed invoices",
    desc: "Follow ups pause on the disputed portion only. The undisputed balance stays in the sequence, and your team gets notified with full context.",
  },
  {
    title: "Partial payments",
    desc: "The balance updates and the sequence adjusts. Nobody gets dunned for the full amount after paying half of it.",
  },
  {
    title: "Promise to pay",
    desc: "Notices hold until the promised date and restart if it passes. Promise dates write back to your ledger.",
  },
  {
    title: "Payment scheduled",
    desc: "When a customer schedules payment, outreach pauses automatically and resumes only if the payment fails or lapses.",
  },
  {
    title: "Human takeover",
    desc: "Sensitive accounts get routed to a person on your team with the full history, not a script.",
  },
  {
    title: "Approval rules",
    desc: "Flag accounts that need sign off before anything sends. You can review every message or let your rules run.",
  },
];

type TableRow = {
  vendor: string;
  approach: string;
  channels: string;
  setup: string;
  bestFit: string;
  highlight?: boolean;
};

// Facts trace to src/data/comparisons.ts and the category table on
// /accounts-receivable-automation-software.
const tableRows: TableRow[] = [
  {
    vendor: "Yonovo",
    approach: "Runs collections for you. Messages send as your business, and your team handles only the judgment calls",
    channels: "Email, SMS, phone, WhatsApp, all included",
    setup: "About one day",
    bestFit: "SMB and mid market teams collecting B2B invoices",
    highlight: true,
  },
  {
    vendor: "Upflow",
    approach: "Workflow tool your team configures and runs",
    channels: "Email, with SMS, postal, and calls metered per use",
    setup: "2 to 3 weeks",
    bestFit: "Venture backed SaaS companies",
  },
  {
    vendor: "Chaser",
    approach: "Workflow tool, with an optional outsourced credit control service",
    channels: "Email, SMS, automated calls, postal",
    setup: "Days to 1 week",
    bestFit: "UK and European SMBs, strong in the Xero ecosystem",
  },
  {
    vendor: "Invoiced",
    approach: "Billing and AR suite with collections workflows inside it",
    channels: "Email, customer payment portal",
    setup: "2 to 4 weeks",
    bestFit: "Mid market teams that want billing and AR in one platform",
  },
  {
    vendor: "HighRadius",
    approach: "Enterprise collections modules delivered as an implementation project",
    channels: "Email, customer portal",
    setup: "3 to 6 months",
    bestFit: "Large enterprises on SAP or Oracle",
  },
];

const tdgStats = [
  { value: "80%", label: "fewer manual follow ups" },
  { value: "15 days", label: "cut from DSO" },
  { value: "32%", label: "faster payment collection" },
  { value: "25+ hrs", label: "saved per week" },
];

export const faqs = [
  {
    question: "What is B2B debt collection software?",
    answer:
      "B2B debt collection software helps a business collect its own unpaid invoices from other businesses. It connects to your accounting system, follows up on overdue invoices across channels like email, SMS, and phone, and escalates the accounts that need attention. The messages come from your business, not from an outside party.",
  },
  {
    question: "Is this the same as hiring a collection agency?",
    answer:
      "No. A traditional agency takes a cut of recovered funds, often 25 to 50 percent, talks to your customers as someone else, and operates as a black box. Debt collection software keeps the process in your hands: full visibility, your brand on every message, and no percentage of what you recover.",
  },
  {
    question: "Does this handle consumer debt?",
    answer:
      "No. Yonovo is built for businesses collecting their own B2B invoices, which is first party collections. Third party consumer debt collection is a different world with its own rules, like the FDCPA in the United States, and different software serves it.",
  },
  {
    question: "Will my customers know a third party is contacting them?",
    answer:
      "No. Every email, text, and call goes out under your company name and from your domain. Customers see a professional follow up from a supplier they know, not a collections notice from a stranger.",
  },
  {
    question: "What happens when a customer disputes an invoice?",
    answer:
      "Follow ups pause on the disputed portion and your team gets notified with full context so they can resolve it directly. The undisputed balance stays in the sequence, so a dispute over one line item does not stall the whole account.",
  },
  {
    question: "What happens when a customer promises to pay?",
    answer:
      "The sequence holds until the promised date. If payment arrives, the invoice closes out and nothing more sends. If the date passes without payment, follow ups restart. Promise dates are recorded in your ledger either way.",
  },
  {
    question: "How is this different from the reminders built into my accounting software?",
    answer:
      "Built in reminders send the same email on a schedule and stop there. Debt collection software escalates across channels, adjusts tone as invoices age, pauses for disputes and payment promises, and hands the hard accounts to a person. It manages the whole collection, not just the reminder.",
  },
  {
    question: "Will chasing payments this way damage customer relationships?",
    answer:
      "Consistent, professional follow up usually improves them. Customers respond better to a predictable process than to sporadic, frustrated emails. Troyes automated its collections with Yonovo and did not receive a single complaint about the outreach.",
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

function CheckIcon({ className = "text-brand-green" }: { className?: string }) {
  return (
    <svg className={`h-5 w-5 shrink-0 ${className}`} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function XIcon({ className = "text-zinc-300" }: { className?: string }) {
  return (
    <svg className={`h-5 w-5 shrink-0 ${className}`} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

/* ── Page Component ── */

export default function DebtCollectionSoftwarePage() {
  return (
    <>
      {/* ── Hero with disambiguation ── */}
      <section data-navbar-dark className="w-full -mt-16 bg-[#030D27] pt-28 md:pt-32 pb-6 md:pb-8">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 md:gap-16">
            <div className="flex flex-col gap-4 md:gap-6">
              <SectionBadge label="Debt collection" variant="dark" />
              <h1 className="text-balance font-medium text-[42px] text-white leading-[1.1] tracking-tight md:text-[70px]">
                Debt Collection Software for B2B Invoices
              </h1>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <p className="text-balance text-base text-zinc-400 tracking-tight md:text-xl">
                  Yonovo is debt collection software for businesses collecting their own unpaid B2B invoices. It is not consumer debt recovery, not a third party collection agency, and it does not report anyone to a credit bureau. Your customers hear from you, in your name, until the invoice is paid.
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

            {/* What this is / is not */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                <span className="font-medium text-sm text-zinc-400 uppercase tracking-wide">What this is</span>
                <div className="flex flex-col gap-3">
                  {whatThisIs.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-sm text-zinc-200 md:text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                <span className="font-medium text-sm text-zinc-400 uppercase tracking-wide">What this is not</span>
                <div className="flex flex-col gap-3">
                  {whatThisIsNot.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <XIcon className="text-zinc-500" />
                      <span className="text-sm text-zinc-200 md:text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
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
              What is B2B debt collection software?
            </h2>
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-10">
              <p className="text-lg text-foreground leading-relaxed md:text-xl">
                B2B debt collection software is a tool a business uses to collect its own unpaid invoices from other businesses. It differs from consumer debt collection, which involves individuals and is regulated under rules like the FDCPA when a third party collects. It also differs from handing accounts to a collection agency, which typically keeps 25 to 50 percent of what it recovers and contacts your customers as an outside party. With first party software, the process stays in your hands and every message carries your name.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── The problem ── */}
      <section className="w-full bg-surface py-12 md:py-15">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            <div className="flex flex-1 flex-col gap-4">
              <SectionBadge label="The problem" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                Invoices go out on net terms. Then someone has to chase.
              </h2>
              <p className="text-balance text-base text-secondary leading-normal tracking-tight md:text-xl">
                B2B revenue arrives on a delay by design. That works until the chasing outgrows the team doing it. For{" "}
                <Link href="/industries/wholesale-distribution" className="text-brand-blue underline underline-offset-2">wholesale distributors</Link> and{" "}
                <Link href="/industries/manufacturing" className="text-brand-blue underline underline-offset-2">manufacturers</Link>, where hundreds of accounts sit on long terms, the gap between invoiced and collected is where cash flow goes to die.
              </p>
            </div>

            <div className="grid flex-1 auto-rows-max grid-cols-1 content-center gap-3 md:grid-cols-2">
              {problems.map((card) => (
                <div key={card.title} className="flex flex-row gap-5 p-6 md:px-8 md:py-6">
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

      {/* ── How Yonovo collects ── */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <SectionBadge label="How Yonovo collects" />
            <h2 className="font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
              A sequence that escalates until the invoice is paid
            </h2>
          </div>

          {/* Zigzag timeline */}
          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 border-l-2 border-dashed border-border md:block" />
            <div className="flex flex-col gap-16 md:gap-24">
              {collectSteps.map((step, i) => {
                const isOdd = i % 2 === 0;
                const imageBlock = step.image ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-100 to-zinc-50 border border-border flex flex-col items-center justify-center gap-3 p-6 md:p-10">
                    <img src={step.image} alt={step.text} className="max-w-full max-h-full rounded-lg shadow-xl border border-zinc-200/60" />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-gradient-to-b from-zinc-100 to-zinc-50 border border-border p-10">
                    <span className="text-6xl font-medium text-zinc-300">{step.number}</span>
                  </div>
                );

                return (
                  <div key={step.number} className="relative">
                    <div className="flex flex-col gap-4 md:hidden">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy text-white font-medium">
                        {step.number}
                      </div>
                      <p className="text-lg font-medium text-foreground leading-relaxed">{step.text}</p>
                      {step.image && imageBlock}
                    </div>

                    <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-12">
                      <div className={isOdd ? "flex flex-col gap-3" : "flex items-center justify-center"}>
                        {isOdd ? (
                          <>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy text-white font-medium">
                              {step.number}
                            </div>
                            <p className="text-lg font-medium text-foreground leading-relaxed">{step.text}</p>
                          </>
                        ) : (
                          imageBlock
                        )}
                      </div>
                      <div className="relative z-10 flex h-4 w-4 items-center justify-center">
                        <div className="h-3 w-3 rounded-full bg-brand-navy" />
                      </div>
                      <div className={isOdd ? "flex items-center justify-center" : "flex flex-col gap-3"}>
                        {isOdd ? (
                          imageBlock
                        ) : (
                          <>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy text-white font-medium">
                              {step.number}
                            </div>
                            <p className="text-lg font-medium text-foreground leading-relaxed">{step.text}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Brand callout band */}
          <div className="mx-auto mt-16 max-w-5xl rounded-3xl bg-brand-navy p-8 md:p-14">
            <div className="flex flex-col items-center gap-6 text-center">
              <h3 className="text-balance font-medium text-3xl text-white leading-tight tracking-tight md:text-[42px]">
                Your brand, not a collector
              </h3>
              <p className="max-w-2xl text-balance text-base text-zinc-300 tracking-tight md:text-lg">
                This is the point that matters most on this page. Every email, text, and call goes out as your business, from your domain, in your voice. Customers see a trusted supplier following up professionally, never a third party agency. The relationships you spent years building stay yours.
              </p>
              <Link href="/book-demo">
                <Button variant="brand" size="md" className="h-12 px-8 font-medium">
                  Book Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dispute and edge case handling ── */}
      <section className="w-full bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 md:gap-12">
            <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col gap-4">
                <SectionBadge label="Edge cases" />
                <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                  Real collections is mostly edge cases
                </h2>
              </div>
              <p className="text-base text-secondary leading-normal tracking-tight md:text-xl">
                Anyone can send a reminder on day 7. What an AR manager actually worries about is the disputed invoice, the partial payment, and the customer who swears the check is coming. Here is how Yonovo handles each one.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
              {edgeCases.map((card) => (
                <div key={card.title} className="flex flex-col gap-3 bg-surface p-6 md:p-8">
                  <h3 className="font-medium text-xl text-foreground tracking-tight md:text-2xl">{card.title}</h3>
                  <p className="text-sm text-secondary tracking-tight md:text-base">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof ── */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-10 md:gap-14">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="grid grid-cols-2 gap-4">
                {tdgStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-6 md:p-8">
                    <span className="font-medium text-3xl text-foreground tracking-tight md:text-4xl">{stat.value}</span>
                    <span className="text-sm text-secondary md:text-base">{stat.label}</span>
                  </div>
                ))}
              </div>
              <figure className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-8 md:p-10">
                <blockquote className="font-medium text-xl text-foreground leading-relaxed tracking-tight md:text-2xl">
                  &ldquo;We were spending so much time just chasing invoices that we had no bandwidth left for anything strategic. It was the same routine every single day, and things were still slipping through the cracks.&rdquo;
                </blockquote>
                <figcaption className="text-sm text-secondary md:text-base">
                  Mohammad Alshalabi, Director of Finance, TDG Inc. These stats are what the first 90 days on Yonovo looked like.
                </figcaption>
              </figure>
            </div>

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
                  A wholesale distributor on QuickBooks that cut manual follow ups by 80 percent.
                </span>
              </Link>
              <Link href="/case-studies/troyes" className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-md md:p-8">
                <span className="font-medium text-lg text-foreground group-hover:text-brand-blue transition-colors">
                  Read the Troyes case study
                </span>
                <span className="text-sm text-secondary leading-relaxed md:text-base">
                  Fully manual to fully automated in one day, without a single customer complaint.
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

      {/* ── Scoped comparison table ── */}
      <section className="w-full bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 md:gap-12">
            <div className="flex max-w-3xl flex-col gap-4">
              <SectionBadge label="Compare" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                B2B collections tools, compared
              </h2>
              <p className="text-base text-secondary leading-normal tracking-tight md:text-xl">
                Scoped to one job: collecting overdue B2B invoices. Each of these tools does it differently.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border bg-background">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead>
                  <tr className="bg-surface">
                    {["Vendor", "Collections approach", "Channels", "Setup", "Best fit"].map((col) => (
                      <th key={col} className="whitespace-nowrap px-5 py-4 font-medium text-xs text-muted uppercase tracking-wide">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr key={row.vendor} className={row.highlight ? "bg-brand-green/5" : undefined}>
                      <td className="whitespace-nowrap border-t border-border px-5 py-4 font-medium text-foreground">{row.vendor}</td>
                      <td className="border-t border-border px-5 py-4 text-secondary">{row.approach}</td>
                      <td className="border-t border-border px-5 py-4 text-secondary">{row.channels}</td>
                      <td className="whitespace-nowrap border-t border-border px-5 py-4 text-secondary">{row.setup}</td>
                      <td className="border-t border-border px-5 py-4 text-secondary">{row.bestFit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex max-w-3xl flex-col gap-4">
              <p className="text-base text-secondary leading-normal tracking-tight">
                For deeper head to head breakdowns, see{" "}
                <Link href="/yonovo-vs-upflow" className="text-brand-blue underline underline-offset-2">Yonovo vs Upflow</Link>,{" "}
                <Link href="/yonovo-vs-chaser" className="text-brand-blue underline underline-offset-2">Yonovo vs Chaser</Link>, and{" "}
                <Link href="/yonovo-vs-invoiced" className="text-brand-blue underline underline-offset-2">Yonovo vs Invoiced</Link>. For the whole category beyond collections, start with the{" "}
                <Link href="/accounts-receivable-automation-software" className="text-brand-blue underline underline-offset-2">accounts receivable automation software guide</Link>.
              </p>
              <p className="text-sm text-muted">
                Vendor details come from public pricing pages and product documentation, last checked August 2026.
              </p>
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
        { label: "Accounts Receivable Automation Software", href: "/accounts-receivable-automation-software", description: "The full category guide: what AR automation does and how ten platforms compare." },
        { label: "Accounts Receivable Collections Software", href: "/ar-collections-software", description: "The full collections workflow, from aging buckets to escalation rules." },
        { label: "Accounts Receivable Statistics", href: "/accounts-receivable-statistics", description: "Verified figures on late payments, DSO, and collections effort, every one linked to its original source." },
        { label: "Case Study: TDG Inc", href: "/case-studies/tdg-inc", description: "80 percent fewer manual follow ups and 15 days off DSO in 90 days." },
        { label: "Case Study: Troyes Canada", href: "/case-studies/troyes", description: "From fully manual to fully automated collections in a single day." },
        { label: "AR for Wholesale & Distribution", href: "/industries/wholesale-distribution", description: "Collections built for long terms and buyer relationships that took years to build." },
        { label: "AR for Manufacturing", href: "/industries/manufacturing", description: "Getting paid on net 60 and net 90 terms without straining partnerships." },
      ]} />

      {/* ── CTA ── */}
      <CTASection />
    </>
  );
}
