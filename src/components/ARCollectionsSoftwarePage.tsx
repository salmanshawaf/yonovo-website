import Image from "next/image";
import Link from "next/link";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/Button";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedResources from "@/components/RelatedResources";
import CTASection from "@/components/sections/CTASection";

/* ── Data ── */

// Day-level reminder timeline. Source: /blog/invoice-reminder-best-practices,
// the site's canonical day-level cadence (the dunning page shows the coarser
// stage view of the same process).
const timeline = [
  { when: "7 days before due", channel: "Email", what: "A friendly heads up. Confirm the invoice was received and catch issues before the due date." },
  { when: "Due date", channel: "Email", what: "A clear, professional nudge for same day payment, with the amount and a payment link." },
  { when: "7 days overdue", channel: "Email", what: "State the overdue status plainly, with the invoice number, amount, and due date." },
  { when: "14 days overdue", channel: "Email + SMS", what: "Add a second channel. A text message adds urgency an inbox cannot." },
  { when: "21 days overdue", channel: "SMS + phone call", what: "Reach the person directly. A call moves invoices that messages could not." },
  { when: "30 days overdue", channel: "Senior contact", what: "Go above your usual contact. A controller or CFO often does not know the invoice is overdue." },
  { when: "45 to 60 days overdue", channel: "Final notice", what: "A formal last step before deciding what happens next with the account." },
];

const agingBuckets = [
  { bucket: "Current", action: "Not yet due. The goal is to keep it that way with a heads up before the due date." },
  { bucket: "1 to 30", action: "Early overdue. Highest recovery odds. Consistent reminders do most of the work here." },
  { bucket: "31 to 60", action: "Needs active follow up. Add channels and start asking what is actually wrong." },
  { bucket: "61 to 90", action: "Escalation territory. Senior contacts, firmer notices, and human attention." },
  { bucket: "90+", action: "High write off risk. Decide deliberately: final notice, payment plan, or cut losses." },
];

const switchRules = [
  {
    title: "Two unanswered emails? Add SMS.",
    desc: "If two emails get no reply, the inbox is not working. Around day 14, a text message reaches the same person a different way.",
  },
  {
    title: "SMS ignored? Pick up the phone.",
    desc: "Around day 21, a phone call is the strongest move left. It is harder to ignore a voice than a notification.",
  },
  {
    title: "Day 30? Change the audience.",
    desc: "Go over your contact's head to someone senior. A decision maker often has no idea the invoice exists.",
  },
  {
    title: "Dispute or promise? Stop the sequence.",
    desc: "The moment there is a dispute or a promise to pay, automation stops and a person takes over. Sequences collect, people resolve.",
  },
];

const stopConditions = [
  "The invoice is paid, even partially. The balance updates before the next message.",
  "The customer disputes it. Follow ups pause on the disputed portion and your team is notified.",
  "A payment is promised or scheduled. The sequence holds until the date, and restarts only if it passes.",
  "The account is flagged sensitive. Nothing sends without your sign off.",
];

const reportingMetrics = [
  "Recovery rate",
  "DSO",
  "At risk invoices",
  "Aging by bucket",
  "Collection activity",
  "Customer payment behavior",
  "Daily briefing",
];

const troyesStats = [
  { value: "1 day", label: "from zero to fully automated" },
  { value: "25+ hrs", label: "saved per month" },
  { value: "45%", label: "faster payment turnaround" },
];

export const faqs = [
  {
    question: "What is accounts receivable collections software?",
    answer:
      "Accounts receivable collections software runs the follow up workflow on unpaid invoices. It tracks invoice aging, sends reminders on a schedule, switches channels when one is ignored, escalates accounts that need attention, and stops the moment an invoice is paid or disputed. It turns collections from a memory exercise into a system.",
  },
  {
    question: "When should I send the first payment reminder?",
    answer:
      "Before the invoice is due. A friendly reminder about 7 days ahead of the due date confirms the invoice was received, surfaces disputes early, and sets the expectation that you track your receivables. Teams that only start reminding after the due date lose their easiest win.",
  },
  {
    question: "How often should I follow up on an overdue invoice?",
    answer:
      "A proven cadence is: due date, day 7, day 14, day 21, and day 30, escalating channel and tone as you go. The exact days matter less than consistency. Customers pay predictable processes first.",
  },
  {
    question: "When should I switch from email to SMS or a phone call?",
    answer:
      "After two unanswered emails, add SMS, which usually lands around day 14. If texts also go unanswered, call by around day 21. Each channel switch signals that the invoice is not going away, and text messages get read far more reliably than email.",
  },
  {
    question: "When should I escalate an overdue invoice?",
    answer:
      "Around day 30, involve a more senior contact at the customer, since a CFO or controller often does not know the invoice is overdue. Escalate to a person on your own team the moment there is a dispute, a broken payment promise, or a key account at stake.",
  },
  {
    question: "What are AR aging buckets and how should I use them?",
    answer:
      "Aging buckets group open invoices by how overdue they are: current, 1 to 30 days, 31 to 60, 61 to 90, and 90 plus. Each bucket calls for different behavior, from friendly reminders early to formal notices late. The buckets also show where your collection risk is concentrated.",
  },
  {
    question: "What metrics should a collections team track?",
    answer:
      "Recovery rate, DSO, aging by bucket, at risk invoices, and collection activity, meaning what was sent and what came back. Customer level payment behavior matters too, since it tells you who needs a different cadence. If you track one number, track DSO over time.",
  },
  {
    question: "How does Yonovo know when an invoice has been paid?",
    answer:
      "It checks your accounting system before every message. Payments, partial payments, and status changes sync from your ledger, so a customer who paid this morning does not get chased this afternoon.",
  },
];

const heroLogos: { name: string; src: string; width: number; className: string; noFilter?: boolean }[] = [
  { name: "Troyes", src: "/logos/troyes-white.png", width: 130, className: "h-[28px] lg:h-[47px]", noFilter: true },
  { name: "TDG Inc", src: "/logos/tdg-inc.svg", width: 200, className: "h-[65px] lg:h-[120px]" },
  { name: "SBC", src: "/logos/sbc.png", width: 200, className: "h-[50px] lg:h-[95px]" },
];

/* ── Page Component ── */

export default function ARCollectionsSoftwarePage() {
  return (
    <>
      {/* ── Hero, text only ── */}
      <section data-navbar-dark className="w-full -mt-16 bg-[#030D27] pt-28 md:pt-32 pb-6 md:pb-8">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 md:gap-14">
            <div className="flex flex-col gap-4 md:gap-6">
              <SectionBadge label="Collections" variant="dark" />
              <h1 className="text-balance font-medium text-[42px] text-white leading-[1.1] tracking-tight md:text-[70px]">
                Accounts Receivable Collections Software
              </h1>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <p className="text-balance text-base text-zinc-400 tracking-tight md:text-xl">
                  A collections workflow is a set of decisions. When the first reminder goes out. When email stops working and you pick up the phone. When an invoice needs a person instead of a sequence. This page lays that workflow out day by day, then shows how Yonovo runs it for you.
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
              What is accounts receivable collections software?
            </h2>
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-10">
              <p className="text-lg text-foreground leading-relaxed md:text-xl">
                Accounts receivable collections software runs the follow up workflow on unpaid invoices. It tracks how overdue each invoice is, sends payment reminders on a schedule, switches to a new channel when one is ignored, escalates accounts that need human attention, and stops the moment an invoice is paid or disputed. The goal is a collections process that runs the same way every day, whoever is at their desk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── The collections workflow in detail ── */}
      <section className="w-full bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-12 md:gap-16">
            <div className="flex max-w-3xl flex-col gap-4">
              <SectionBadge label="The workflow" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                The collections workflow, day by day
              </h2>
              <p className="text-base text-secondary leading-normal tracking-tight md:text-xl">
                This is the schedule that gets invoices paid. Not a philosophy, a calendar. If you run collections today, this should look like your job. If it does not, it is what your job could look like.
              </p>
            </div>

            {/* Day-level timeline table */}
            <div className="overflow-x-auto rounded-2xl border border-border bg-background">
              <table className="w-full min-w-[750px] text-left text-sm">
                <thead>
                  <tr className="bg-background border-b border-border">
                    {["When", "Channel", "What goes out"].map((col) => (
                      <th key={col} className="whitespace-nowrap px-5 py-4 font-medium text-xs text-muted uppercase tracking-wide">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeline.map((row, i) => (
                    <tr key={row.when} className={i % 2 === 1 ? "bg-surface/50" : undefined}>
                      <td className="whitespace-nowrap border-t border-border px-5 py-4 font-medium text-foreground">{row.when}</td>
                      <td className="whitespace-nowrap border-t border-border px-5 py-4 text-secondary">{row.channel}</td>
                      <td className="border-t border-border px-5 py-4 text-secondary">{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Aging buckets */}
            <div className="flex flex-col gap-6">
              <h3 className="font-medium text-2xl text-foreground tracking-tight md:text-3xl">
                What each aging bucket means
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {agingBuckets.map((b) => (
                  <div key={b.bucket} className="flex flex-col gap-2 rounded-2xl border border-border bg-background p-5 md:p-6">
                    <span className="font-medium text-2xl text-foreground tracking-tight">{b.bucket}</span>
                    <p className="text-sm text-secondary leading-relaxed">{b.action}</p>
                  </div>
                ))}
              </div>
              <p className="max-w-3xl text-base text-secondary leading-normal tracking-tight">
                The clock is not neutral. Per the Commercial Collection Agency Association, recovery odds sit around 73 percent at three months overdue and fall below 50 percent at six. Every week of delay costs real money, which you can put a number on with our{" "}
                <Link href="/tools/dso-calculator" className="text-brand-blue underline underline-offset-2">DSO calculator</Link>.
              </p>
            </div>

            {/* Channel switch rules */}
            <div className="flex flex-col gap-6">
              <h3 className="font-medium text-2xl text-foreground tracking-tight md:text-3xl">
                When to switch channels, and when to stop
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {switchRules.map((rule) => (
                  <div key={rule.title} className="flex flex-col gap-2 rounded-2xl border border-border bg-background p-6 md:p-8">
                    <h4 className="font-medium text-lg text-foreground tracking-tight md:text-xl">{rule.title}</h4>
                    <p className="text-sm text-secondary leading-relaxed md:text-base">{rule.desc}</p>
                  </div>
                ))}
              </div>
              <p className="max-w-3xl text-base text-secondary leading-normal tracking-tight">
                For the templates and tone guidance behind each stage, see our guide to{" "}
                <Link href="/blog/invoice-reminder-best-practices" className="text-brand-blue underline underline-offset-2">invoice reminder best practices</Link>.
              </p>
            </div>

            <div className="flex justify-center">
              <Link href="/book-demo">
                <Button variant="brand" size="md" className="h-14 px-[46px] text-lg font-medium whitespace-nowrap">
                  Run this workflow with Yonovo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── How Yonovo runs it ── */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-12 md:gap-20">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col gap-4">
                <SectionBadge label="How Yonovo runs it" />
                <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                  The timeline above, applied to every invoice
                </h2>
                <p className="text-base text-secondary leading-normal tracking-tight md:text-lg">
                  You set the rules once: timing, tone, channels, and which accounts need approval before anything sends. Yonovo applies them to every invoice, every day, across email, SMS, phone, and WhatsApp. Key accounts can run a softer cadence than smaller ones. Nothing depends on who remembered to follow up.
                </p>
                <p className="text-base text-secondary leading-normal tracking-tight md:text-lg">
                  Invoices that age into serious territory are their own discipline. That side of the job is covered on our{" "}
                  <Link href="/debt-collection-software" className="text-brand-blue underline underline-offset-2">debt collection software</Link> page.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border bg-surface p-4 md:p-6">
                <Image
                  src="/images/feature-workflows-v2.png"
                  alt="Yonovo workflow builder showing reminder timing and channel rules"
                  width={1600}
                  height={1000}
                  className="w-full h-auto rounded-lg shadow-xl border border-zinc-200/60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
              <div className="order-1 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 md:order-none md:p-8">
                <span className="font-medium text-sm text-muted uppercase tracking-wide">The sequence stops when</span>
                {stopConditions.map((c) => (
                  <div key={c} className="flex items-start gap-3 border-t border-border pt-3 first-of-type:border-t-0 first-of-type:pt-0">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-foreground md:text-base">{c}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-2xl text-foreground tracking-tight md:text-3xl">
                  It stops when it should
                </h3>
                <p className="text-base text-secondary leading-normal tracking-tight md:text-lg">
                  The mark of good collections software is not what it sends. It is what it does not send. Yonovo checks your ledger before every message and pulls an invoice out of the sequence the moment circumstances change. Chasing a paid invoice costs more goodwill than a late payment ever did.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reporting ── */}
      <section className="w-full bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 md:gap-12">
            <div className="flex max-w-3xl flex-col gap-4">
              <SectionBadge label="Reporting" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                You see what was sent and what came back
              </h2>
              <p className="text-base text-secondary leading-normal tracking-tight md:text-xl">
                Outstanding receivables, aging, DSO, recovery rate, at risk invoices, and customer payment behavior, all in one place. Plus a daily briefing in your inbox summarizing what went out and what was recovered.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {reportingMetrics.map((m) => (
                <span key={m} className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground">
                  {m}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-border bg-background p-4 md:p-6">
                <Image
                  src="/images/daily-briefing.png"
                  alt="Yonovo daily briefing summarizing what was sent and what was recovered"
                  width={1600}
                  height={1000}
                  className="w-full h-auto rounded-lg shadow-xl border border-zinc-200/60"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-border bg-background p-4 md:p-6">
                <Image
                  src="/images/explore-costumers.png"
                  alt="Yonovo customer view showing payment behavior by account"
                  width={1600}
                  height={1000}
                  className="w-full h-auto rounded-lg shadow-xl border border-zinc-200/60"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof (Troyes) ── */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-10 md:gap-14">
            <div className="flex max-w-3xl flex-col gap-4">
              <SectionBadge label="Proof" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                Troyes had no collections process. Then it had one by dinner.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {troyesStats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-6 md:p-8">
                  <span className="font-medium text-4xl text-foreground tracking-tight md:text-5xl">{stat.value}</span>
                  <span className="text-sm text-secondary md:text-base">{stat.label}</span>
                </div>
              ))}
            </div>

            <figure className="mx-auto flex max-w-3xl flex-col gap-4">
              <blockquote className="text-balance text-center font-medium text-xl text-foreground leading-relaxed tracking-tight md:text-2xl">
                &ldquo;We connected QuickBooks in the morning and Yonovo was already sending follow-ups by the afternoon. We went from having nothing to having a full system in a single day.&rdquo;
              </blockquote>
              <figcaption className="text-center text-sm text-secondary md:text-base">
                Apple Smith, Accounts Receivable Manager, Troyes Canada
              </figcaption>
            </figure>

            <div className="flex flex-col items-center gap-6">
              <Link href="/case-studies/troyes" className="text-brand-blue underline underline-offset-2 text-base">
                Read the full Troyes case study
              </Link>
              <Link href="/book-demo">
                <Button variant="brand" size="md" className="h-14 px-[46px] text-lg font-medium whitespace-nowrap">
                  Book Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="w-full bg-background py-16 md:py-24 border-t border-border">
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
        { label: "Debt Collection Software for B2B Invoices", href: "/debt-collection-software", description: "Collecting seriously overdue invoices under your brand, without an agency." },
        { label: "Dunning Management Software", href: "/dunning-management-software", description: "The written reminder layer of collections, stage by stage." },
        { label: "Accounts Receivable Statistics", href: "/accounts-receivable-statistics", description: "Verified figures on late payments, DSO, and collections effort, every one linked to its original source." },
        { label: "DSO Calculator", href: "/tools/dso-calculator", description: "Put a dollar figure on your days sales outstanding and what a reduction frees up." },
        { label: "Invoice Reminder Best Practices", href: "/blog/invoice-reminder-best-practices", description: "Copy ready templates and timing rules for every reminder stage." },
        { label: "Case Study: Troyes Canada", href: "/case-studies/troyes", description: "From no collections process to a fully automated one in a single day." },
      ]} />

      {/* ── CTA ── */}
      <CTASection />
    </>
  );
}
