import Image from "next/image";
import Link from "next/link";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/Button";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedResources from "@/components/RelatedResources";
import CTASection from "@/components/sections/CTASection";

/* ── Data ── */

// The stage view of dunning. Source: /blog/dunning-letter. The AR collections
// page shows the day-level view of the same process; keep them consistent.
const stages = [
  {
    stage: "Reminder",
    days: "1 to 30 days overdue",
    channel: "Email",
    tone: "Friendly. Assume oversight, make paying easy.",
  },
  {
    stage: "Firm follow up",
    days: "31 to 60 days overdue",
    channel: "Email, then text",
    tone: "Professional and direct. Establish urgency, ask what is wrong.",
  },
  {
    stage: "Urgent notice",
    days: "61 to 90 days overdue",
    channel: "Email and phone",
    tone: "Formal. Involve senior contacts, state consequences.",
  },
  {
    stage: "Final demand",
    days: "90+ days overdue",
    channel: "Letter and email",
    tone: "Formal and final. The last step before collections or legal action.",
  },
];

const breakdowns = [
  {
    scenario: "A customer disputes the invoice",
    template: "Keeps sending on schedule, escalating tone included, as if nothing happened.",
    right: "Pause the disputed portion only. The undisputed balance stays in the sequence, and a person follows up on the dispute.",
  },
  {
    scenario: "A partial payment arrives",
    template: "Dunns the original full amount, which reads as sloppy at best and hostile at worst.",
    right: "Update the balance and adjust the sequence. The next notice reflects what is actually owed.",
  },
  {
    scenario: "A good customer you cannot afford to annoy",
    template: "Gets the same tone and cadence as everyone else.",
    right: "Runs a slower, softer cadence you set per segment. Key accounts get a personal touch before a firm notice.",
  },
  {
    scenario: "A customer with their own payment rhythm",
    template: "Escalates on schedule anyway, annoying someone who always pays, just late.",
    right: "Learn the pattern and adapt. The sequence reflects what actually works for each customer.",
  },
];

const tdgInline = [
  { value: "80%", label: "fewer manual follow ups" },
  { value: "15 days", label: "cut from DSO" },
  { value: "25+ hrs", label: "saved per week" },
];

export const faqs = [
  {
    question: "What does dunning mean?",
    answer:
      "Dunning is the process of reminding customers to pay what they owe, in writing, on a schedule. The word covers the whole sequence of payment reminders a business sends as an invoice ages, from the first friendly note to the final demand.",
  },
  {
    question: "What is a dunning letter?",
    answer:
      "A dunning letter is a written request for payment on an overdue invoice. It is not an invoice and not a statement. The invoice tells a customer what they owe, a statement summarizes their account, and a dunning letter asks for payment that is late. It exists to move money, not to inform.",
  },
  {
    question: "What is dunning management software?",
    answer:
      "Dunning management software runs the reminder sequence automatically. It tracks invoice age, sends each notice at the right stage with the right tone, switches channels when messages are ignored, and pauses when a payment, dispute, or promise changes the situation. It replaces the spreadsheet and the memory of whoever usually sends the reminders.",
  },
  {
    question: "How is dunning different from collections?",
    answer:
      "Dunning is the written reminder layer inside the broader collections process. Collections covers everything: reminders, phone calls, escalation decisions, disputes, payment plans, and when to involve outside help. If collections is the whole playbook, dunning is the letters chapter.",
  },
  {
    question: "What should a dunning sequence look like?",
    answer:
      "Four stages that escalate with age: a friendly email reminder in the first 30 days overdue, a firm follow up by email and text at 31 to 60 days, an urgent notice by email and phone at 61 to 90 days involving senior contacts, and a formal final demand past 90 days. Tone shifts from friendly to formal as the stages progress.",
  },
  {
    question: "How many dunning notices should I send before escalating?",
    answer:
      "Two or three unanswered notices on one channel is the signal to change something: add a text message, make a phone call, or write to a more senior contact. And once a final demand deadline passes, stop sending letters. More notices after a final demand teach the customer that your deadlines are soft.",
  },
  {
    question: "Will automated dunning annoy my good customers?",
    answer:
      "Template dunning might. That is why Yonovo lets you set cadence and tone per customer segment, and why it learns what works for each customer over time. Consistent, professional reminders usually read as good bookkeeping, not aggression. Troyes automated its reminders and had zero customer complaints.",
  },
  {
    question: "Does Yonovo handle dunning for invoices raised in Stripe?",
    answer:
      "Yes. Yonovo connects to Stripe Billing as well as accounting systems like QuickBooks Online, Xero, NetSuite, Sage Intacct, and Odoo. Invoices sync in, the dunning sequence runs across email, SMS, phone, and WhatsApp, and payment status syncs back.",
  },
];

const heroLogos: { name: string; src: string; width: number; className: string; noFilter?: boolean }[] = [
  { name: "Troyes", src: "/logos/troyes-white.png", width: 130, className: "h-[28px] lg:h-[47px]", noFilter: true },
  { name: "TDG Inc", src: "/logos/tdg-inc.svg", width: 200, className: "h-[65px] lg:h-[120px]" },
  { name: "SBC", src: "/logos/sbc.png", width: 200, className: "h-[50px] lg:h-[95px]" },
];

function XIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-brand-green" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

/* ── Page Component ── */

export default function DunningManagementSoftwarePage() {
  return (
    <>
      {/* ── Hero with the definition in it ── */}
      <section data-navbar-dark className="w-full -mt-16 bg-[#030D27] pt-28 md:pt-32 pb-6 md:pb-8">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 md:gap-14">
            <div className="flex flex-col gap-4 md:gap-6">
              <SectionBadge label="Dunning" variant="dark" />
              <h1 className="text-balance font-medium text-[42px] text-white leading-[1.1] tracking-tight md:text-[70px]">
                Dunning Management Software
              </h1>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <p className="text-balance text-base text-zinc-400 tracking-tight md:text-xl">
                  Dunning is the process of reminding customers to pay what they owe, in writing, on a schedule. Half the people searching this word half know it. So here is the plain version, then the software that runs it.
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

            {/* Definition card, in the hero */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10">
              <p className="text-base text-zinc-200 leading-relaxed md:text-xl">
                Dunning is the structured sequence of payment reminders a business sends as an invoice ages. A dunning sequence is several notices that shift in tone from friendly to firm as the invoice gets older. It differs from a single payment reminder because it keeps going until the invoice is resolved, and it differs from collections because dunning is the written reminder layer inside the broader collections process.
              </p>
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

      {/* ── What a dunning sequence should contain ── */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-10 md:gap-14">
            <div className="flex max-w-3xl flex-col gap-4">
              <SectionBadge label="The sequence" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                What a dunning sequence should contain
              </h2>
              <p className="text-base text-secondary leading-normal tracking-tight md:text-xl">
                Four stages, each with its own timing, channel, and tone. Skip a stage, or send notices at random, and customers learn that your due dates are suggestions.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stages.map((s, i) => (
                <div key={s.stage} className="flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-surface">
                  <div className="h-1.5 w-full bg-brand-navy" style={{ opacity: 0.4 + i * 0.2 }} />
                  <div className="flex flex-col gap-3 p-6 pt-2 md:p-8 md:pt-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-navy font-medium text-sm text-white">
                      {i + 1}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-medium text-xl text-foreground tracking-tight">{s.stage}</h3>
                      <span className="text-sm font-medium text-brand-blue">{s.days}</span>
                    </div>
                    <p className="text-sm text-secondary leading-relaxed">
                      <span className="font-medium text-foreground">{s.channel}.</span> {s.tone}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="max-w-3xl text-base text-secondary leading-normal tracking-tight">
              These stages are the summary view. The day by day timing underneath them, first reminder 7 days before due, channel switches at days 14 and 21, is covered in our guide to{" "}
              <Link href="/blog/invoice-reminder-best-practices" className="text-brand-blue underline underline-offset-2">reminder timing in detail</Link>. For copy ready notices at every stage, see our{" "}
              <Link href="/blog/dunning-letter" className="text-brand-blue underline underline-offset-2">dunning letter templates and examples</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Where template dunning breaks down ── */}
      <section className="w-full bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-10 md:gap-14">
            <div className="flex max-w-3xl flex-col gap-4">
              <SectionBadge label="The catch" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                Where template dunning breaks down
              </h2>
              <p className="text-base text-secondary leading-normal tracking-tight md:text-xl">
                A fixed sequence works until reality shows up. These are the four situations where sending the next scheduled notice is exactly the wrong move.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Header row (desktop) */}
              <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr] md:gap-4 md:px-6">
                <span className="font-medium text-xs text-muted uppercase tracking-wide">The situation</span>
                <span className="font-medium text-xs text-muted uppercase tracking-wide">What a template does</span>
                <span className="font-medium text-xs text-muted uppercase tracking-wide">What should happen</span>
              </div>
              {breakdowns.map((row) => (
                <div key={row.scenario} className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-background p-6 md:grid-cols-[1fr_1fr_1fr] md:items-start">
                  <span className="font-medium text-lg text-foreground tracking-tight">{row.scenario}</span>
                  <div className="flex items-start gap-3">
                    <XIcon />
                    <p className="text-sm text-secondary leading-relaxed md:text-base">{row.template}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon />
                    <p className="text-sm text-secondary leading-relaxed md:text-base">{row.right}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How Yonovo handles it ── */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-10 md:gap-14">
            <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col gap-4">
                <SectionBadge label="How Yonovo handles it" />
                <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                  Dunning that adapts instead of blasting
                </h2>
              </div>
              <p className="text-base text-secondary leading-normal tracking-tight md:text-xl">
                Yonovo runs the sequence, but it treats the sequence as a starting point, not a script. It works straight from your ledger through the{" "}
                <Link href="/solutions/quickbooks" className="text-brand-blue underline underline-offset-2">QuickBooks integration</Link>, and for invoices raised in Stripe, the{" "}
                <Link href="/solutions/stripe" className="text-brand-blue underline underline-offset-2">Stripe Billing integration</Link>.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-surface p-4 md:p-8">
              <Image
                src="/images/highlight-human-oversight.png"
                alt="Yonovo message review showing human oversight before notices send"
                width={2000}
                height={1100}
                className="w-full h-auto rounded-lg shadow-xl border border-zinc-200/60"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 md:p-8">
                <h3 className="font-medium text-xl text-foreground tracking-tight">Channel mix</h3>
                <p className="text-sm text-secondary leading-relaxed md:text-base">
                  Email, SMS, phone, and WhatsApp, escalating as the invoice ages. A notice that gets ignored on one channel moves to the next.
                </p>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 md:p-8">
                <h3 className="font-medium text-xl text-foreground tracking-tight">Human oversight</h3>
                <p className="text-sm text-secondary leading-relaxed md:text-base">
                  Review every notice before it sends, or let your rules run. Disputes and sensitive accounts escalate to your team with full context.
                </p>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 md:p-8">
                <h3 className="font-medium text-xl text-foreground tracking-tight">Learns each customer</h3>
                <p className="text-sm text-secondary leading-relaxed md:text-base">
                  Yonovo adapts its approach over time, learning what works for each customer, so the sequence fits the account instead of fighting it.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Link href="/book-demo">
                <Button variant="brand" size="md" className="h-14 px-[46px] text-lg font-medium whitespace-nowrap">
                  See your dunning on autopilot
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Compact proof strip ── */}
      <section className="w-full bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col items-center gap-8 md:gap-10">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {tdgInline.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1">
                  <span className="font-medium text-4xl text-foreground tracking-tight">{stat.value}</span>
                  <span className="text-sm text-secondary">{stat.label}</span>
                </div>
              ))}
            </div>
            <figure className="flex max-w-2xl flex-col gap-3">
              <blockquote className="text-balance text-center font-medium text-lg text-foreground leading-relaxed tracking-tight md:text-xl">
                &ldquo;The most valuable thing Yonovo delivered was giving us our time back. We went from spending hours every day on collections to barely thinking about it. The system just handles it.&rdquo;
              </blockquote>
              <figcaption className="text-center text-sm text-secondary">
                Mohammad Alshalabi, Director of Finance, TDG Inc
              </figcaption>
            </figure>
            <Link href="/book-demo">
              <Button variant="brand" size="md" className="h-12 px-8 font-medium">
                Book Demo
              </Button>
            </Link>
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
        { label: "Accounts Receivable Collections Software", href: "/ar-collections-software", description: "The day by day collections workflow underneath the dunning stages." },
        { label: "Accounts Receivable Statistics", href: "/accounts-receivable-statistics", description: "Verified figures on late payments, DSO, and collections effort, every one linked to its original source." },
        { label: "Dunning Letters: Meaning, Templates, and Timing", href: "/blog/dunning-letter", description: "Copy ready dunning letters for every stage, plus legal considerations." },
        { label: "Invoice Reminder Best Practices", href: "/blog/invoice-reminder-best-practices", description: "The day level timing and tone rules behind an effective sequence." },
        { label: "Yonovo for QuickBooks", href: "/solutions/quickbooks", description: "Dunning that runs straight from your QuickBooks ledger." },
        { label: "Yonovo for Stripe Billing", href: "/solutions/stripe", description: "Automated reminders for invoices raised in Stripe." },
      ]} />

      {/* ── CTA ── */}
      <CTASection />
    </>
  );
}
