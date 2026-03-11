import Image from "next/image";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/Button";
import type { IndustryData } from "@/data/industries";
import FAQAccordion from "@/components/FAQAccordion";

const logos = [
  { name: "Troyes", src: "/logos/troyes.png", width: 130, className: "h-8 lg:h-[41px]" },
  { name: "TDG Inc", src: "/logos/tdg-inc.svg", width: 200, className: "h-8 lg:h-[41px]" },
];

/* ── Icons ── */

const iconPaths: Record<string, string> = {
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  send: "M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  chart: "M18 20V10M12 20V4M6 20v-6",
  building: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18ZM6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z",
  zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8Z",
};

function SolutionIcon({ name, size = 32, className = "" }: { name: string; size?: number; className?: string }) {
  const d = iconPaths[name];
  if (!d) return <div className={`shrink-0 rounded-lg bg-brand-red`} style={{ width: size, height: size }} />;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      <path d={d} />
    </svg>
  );
}

/* ── Reusable sub-components ── */

function ProblemCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-row gap-5 rounded-3xl border border-border bg-white p-6 md:px-8 md:py-6">
      <div className="h-8 w-1 shrink-0 rounded-full bg-brand-red" />
      <div className="flex flex-col gap-2">
        <span className="font-medium text-xl text-foreground tracking-tight md:text-2xl">{title}</span>
        <p className="text-sm text-secondary tracking-tight md:text-base">{description}</p>
      </div>
    </div>
  );
}

function TestimonialCard({
  company,
  name,
  title,
  quote,
}: {
  company: string;
  name: string;
  title: string;
  quote: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-background">
      <div className="grow p-8">
        <div className="mb-5">
          <span className="text-lg font-bold text-foreground">{company}</span>
        </div>
        <p className="text-[1.2rem] text-foreground leading-7">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
      <div className="mt-auto p-8 pt-0">
        <div className="flex flex-col gap-1">
          <div className="font-bold text-foreground">{name}</div>
          <div className="text-muted">{title}</div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ stat, description }: { stat: string; description: string }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-background">
      <div className="w-full overflow-hidden rounded-t-2xl">
        <div className="h-[167px] w-full bg-gradient-to-br from-brand-blue/40 via-brand-blue/70 to-brand-blue" />
      </div>
      <div className="flex flex-col justify-center p-8">
        <div className="font-medium text-[3.25rem] text-foreground leading-[3.75rem]">
          {stat}
        </div>
        <div className="text-muted text-xl">{description}</div>
      </div>
    </div>
  );
}

/* ── Template ── */

export default function IndustryPageTemplate({ data }: { data: IndustryData }) {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative w-full -mt-16 pt-28 md:pt-32 pb-10 md:pb-12 bg-background">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="relative flex w-full flex-col gap-12 overflow-hidden">
            {/* Hero Grid */}
            <div className="relative mx-auto grid w-full items-center gap-6 px-4 lg:grid-cols-2">
              {/* Left — Text Content */}
              <div className="flex flex-col gap-6">
                <SectionBadge label={data.hero.badge} />
                <h1 className="text-balance font-medium text-[42px] text-foreground leading-[1.1] tracking-tight md:text-[70px]">
                  {data.hero.headline}
                </h1>
                <p className="text-base text-secondary tracking-tight md:text-xl">
                  {data.hero.description}
                </p>
                <div className="mt-2 flex flex-col gap-4">
                  <div className="flex flex-row items-center gap-6">
                    <Button variant="brand" size="md" className="h-14 px-[46px] text-lg font-medium">
                      Start Free
                    </Button>
                    <Button variant="ghost-dark" size="md" className="h-14">
                      Book Demo
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-brand-blue">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 16 17">
                      <path d="M14.66 6.5H1.33M14.66 6.5c0 .28 0 .59 0 .94V9.5M14.66 6.5c-.01-.9-.06-1.44-.29-1.88a2.67 2.67 0 0 0-1.16-1.16C12.63 3.17 11.89 3.17 10.39 3.17H5.59c-1.49 0-2.24 0-2.81.29a2.67 2.67 0 0 0-1.16 1.16c-.22.44-.28.98-.29 1.88M1.33 6.5c0 .28 0 .59 0 .94v2.13c0 1.49 0 2.24.29 2.81.26.5.67.91 1.17 1.17.57.29 1.31.29 2.81.29h2.51M5.99 9.17H3.99" />
                      <path d="M11.25 14.58l1.41-1.41m0 0l1.42-1.42m-1.42 1.42l-1.41-1.42m1.41 1.42l1.42 1.42" />
                    </svg>
                    No card required
                  </div>
                </div>
              </div>

              {/* Right — Dashboard Preview */}
              <div className="w-full px-0 md:px-15">
                <div className="relative aspect-[0.8] w-full overflow-hidden rounded-2xl bg-surface">
                  <div className="absolute inset-0 h-full w-full" />
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex w-full flex-col items-center gap-0">
              <p className="font-medium text-base text-muted">
                Trusted by finance teams who hate chasing payments
              </p>
              <div className="w-full mt-6">
                <div className="flex items-center justify-center gap-10">
                  {logos.map((logo) => (
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problems ── */}
      <section className="w-full bg-background py-12 md:py-15">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            <div className="flex flex-1 flex-col gap-4">
              <SectionBadge label={data.problems.badge} />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                {data.problems.headline}
              </h2>
              <p className="text-balance text-base text-secondary leading-normal tracking-tight md:text-xl">
                {data.problems.description}
              </p>
            </div>
            <div className="grid flex-1 auto-rows-max grid-cols-1 content-center gap-3">
              {data.problems.cards.map((card) => (
                <ProblemCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Solutions ── */}
      <section className="w-full bg-surface py-12 md:py-15">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 md:gap-16">
            {/* Header — 2-col: badge+heading left, description right */}
            <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-16">
              <div className="flex flex-1 flex-col gap-4">
                <SectionBadge label={data.solutions.badge} />
                <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                  {data.solutions.headline}
                </h2>
              </div>
              <p className="text-base text-secondary leading-normal tracking-tight md:text-xl">
                {data.solutions.description}
              </p>
            </div>

            <div className="flex flex-col gap-8 md:gap-6">
              {/* Dark card grid — 2x2 */}
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-brand-navy bg-brand-navy md:grid-cols-2">
                {data.solutions.cards.map((card) => (
                  <div key={card.title} className="flex flex-col gap-6 bg-brand-navy p-6 md:gap-10 md:p-8">
                    <SolutionIcon name={card.icon} size={32} className="text-background" />
                    <div className="flex flex-col gap-2">
                      <h3 className="font-medium text-xl text-white tracking-tight md:text-2xl">
                        {card.title}
                      </h3>
                      <p className="text-sm text-zinc-400 tracking-tight md:text-base">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom highlights — 3-col */}
              <div className="grid grid-cols-1 gap-px overflow-hidden md:grid-cols-3">
                {data.solutions.highlights.map((item) => (
                  <div key={item.title} className="flex flex-col gap-2 bg-transparent px-0 py-6 md:px-8 md:py-6">
                    <div className="flex flex-row items-center gap-2 text-foreground">
                      <SolutionIcon name={item.icon} size={24} className="text-brand-red" />
                      <h4 className="font-medium text-base tracking-tight md:text-xl">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-sm text-secondary tracking-tight md:text-base">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="w-full bg-surface py-12 md:py-15">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 md:gap-14">
            {/* Header — centered */}
            <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 md:items-center">
              <SectionBadge label={data.howItWorks.badge} />
              <h2 className="text-balance text-start font-medium text-4xl text-foreground leading-tight tracking-tight md:text-center md:text-[54px]">
                {data.howItWorks.headline}
              </h2>
            </div>

            {/* Step cards — horizontal row on desktop */}
            <div className="flex flex-col gap-px overflow-hidden rounded-3xl border border-border bg-border md:flex-row">
              {data.howItWorks.steps.map((step, i) => (
                <div key={step.title} className="flex flex-col gap-6 bg-background p-6 md:gap-10 md:p-8">
                  <div className="w-fit">
                    <span className="font-medium text-2xl text-brand-red">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium text-xl text-foreground tracking-tight md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="text-sm text-secondary tracking-tight md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex justify-center gap-6">
              <Button variant="brand" size="lg" className="h-14 px-[46px] text-lg font-medium">
                {data.hero.cta}
              </Button>
              <Button variant="ghost-dark" size="lg" className="h-14">
                Book Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="w-full py-12 md:py-15 bg-surface">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 md:gap-16">
            {/* Header */}
            <div className="flex flex-col items-start gap-4 md:gap-6 lg:items-center">
              <SectionBadge label="Testimonials" />
              <h2 className="max-w-[850px] text-balance font-medium text-4xl text-foreground tracking-tight md:text-[4.5rem] md:leading-[1.05] lg:text-center">
                What people say
              </h2>
              <p className="text-center text-base text-secondary tracking-tight md:text-2xl">
                See why finance teams are making the switch
              </p>
            </div>

            {/* Cards */}
            <div>
              {/* Desktop lg: 12-column grid */}
              <div className="hidden grid-cols-12 gap-6 lg:grid">
                <div className="h-full col-span-6">
                  <TestimonialCard company="TDG Inc." quote="We used to spend hours every week chasing overdue invoices manually. Since switching to Yonovo, our manual follow ups dropped by 80% and we're collecting faster than ever. The AI handles the routine stuff so our team can focus on the accounts that actually need a human touch." name="Mohammad Alshalabi" title="Director of Finance" />
                </div>
                <div className="h-full col-span-3">
                  <StatsCard stat="75%" description="reduction in manual tasks" />
                </div>
                <div className="h-full col-span-3">
                  <StatsCard stat="15 Days" description="average reduction in DSO" />
                </div>
                <div className="h-full col-span-6">
                  <TestimonialCard company="Troyes" quote="What impressed us most was how quickly we were up and running. We connected QuickBooks, set our preferences, and Yonovo was collecting on our behalf within the same day. Our customer relationships haven't suffered at all, if anything the follow ups are more consistent and professional than before." name="Apple Smith" title="Accounts Receivable Manager" />
                </div>
                <div className="h-full col-span-6">
                  <TestimonialCard company="Lawazim" quote="As a wholesale distributor, our customer relationships are everything. We were nervous about automating collections but Yonovo's approach is professional and respectful. Customers have actually commented that our follow ups feel more organized now. We're collecting faster without a single complaint." name="Faris Shawaf" title="CFO" />
                </div>
              </div>

              {/* Tablet md: 3-column grid */}
              <div className="hidden grid-cols-3 gap-6 md:grid lg:hidden">
                <div className="h-full col-span-2">
                  <TestimonialCard company="TDG Inc." quote="We used to spend hours every week chasing overdue invoices manually. Since switching to Yonovo, our manual follow ups dropped by 80% and we're collecting faster than ever. The AI handles the routine stuff so our team can focus on the accounts that actually need a human touch." name="Mohammad Alshalabi" title="Director of Finance" />
                </div>
                <div className="h-full col-span-1">
                  <StatsCard stat="75%" description="reduction in manual tasks" />
                </div>
                <div className="h-full col-span-1">
                  <StatsCard stat="15 Days" description="average reduction in DSO" />
                </div>
                <div className="h-full col-span-2">
                  <TestimonialCard company="Troyes" quote="What impressed us most was how quickly we were up and running. We connected QuickBooks, set our preferences, and Yonovo was collecting on our behalf within the same day. Our customer relationships haven't suffered at all, if anything the follow ups are more consistent and professional than before." name="Apple Smith" title="Accounts Receivable Manager" />
                </div>
                <div className="h-full col-span-3">
                  <TestimonialCard company="Lawazim" quote="As a wholesale distributor, our customer relationships are everything. We were nervous about automating collections but Yonovo's approach is professional and respectful. Customers have actually commented that our follow ups feel more organized now. We're collecting faster without a single complaint." name="Faris Shawaf" title="CFO" />
                </div>
              </div>

              {/* Mobile: stacked */}
              <div className="flex flex-col gap-4 md:hidden">
                <TestimonialCard company="TDG Inc." quote="We used to spend hours every week chasing overdue invoices manually. Since switching to Yonovo, our manual follow ups dropped by 80% and we're collecting faster than ever. The AI handles the routine stuff so our team can focus on the accounts that actually need a human touch." name="Mohammad Alshalabi" title="Director of Finance" />
                <StatsCard stat="75%" description="reduction in manual tasks" />
                <StatsCard stat="15 Days" description="average reduction in DSO" />
                <TestimonialCard company="Troyes" quote="What impressed us most was how quickly we were up and running. We connected QuickBooks, set our preferences, and Yonovo was collecting on our behalf within the same day. Our customer relationships haven't suffered at all, if anything the follow ups are more consistent and professional than before." name="Apple Smith" title="Accounts Receivable Manager" />
                <TestimonialCard company="Lawazim" quote="As a wholesale distributor, our customer relationships are everything. We were nervous about automating collections but Yonovo's approach is professional and respectful. Customers have actually commented that our follow ups feel more organized now. We're collecting faster without a single complaint." name="Faris Shawaf" title="CFO" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      {data.faqs.length > 0 && (
        <section className="w-full bg-background py-16 md:py-24">
          <div className="mx-auto max-w-(--container-max-width) px-6">
            <h2 className="font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px] mb-8 md:mb-12">
              FAQs
            </h2>
            <FAQAccordion items={data.faqs} />
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="w-full bg-gradient-to-b from-background from-60% to-brand-navy to-60%">
        <div className="mx-auto max-w-[1600px] px-6">
          <div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden border-t border-border bg-white px-6 py-12 pb-30 md:gap-8 md:rounded-3xl md:border md:p-15 lg:p-25">
            <div className="pointer-events-none absolute bottom-0 left-0 h-auto w-[40%] md:h-[40%] md:w-auto lg:h-[50%]">
              <div className="h-[350px] w-[350px] rounded-full bg-brand-blue opacity-70 blur-3xl" />
            </div>
            <div className="pointer-events-none absolute right-0 bottom-0 h-auto w-[40%] md:h-[40%] md:w-auto lg:h-[50%]">
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
              <div className="flex flex-row items-center gap-6">
                <Button variant="brand" size="md" className="h-14 px-[46px] text-lg font-medium">
                  Start Free
                </Button>
                <Button variant="ghost-dark" size="md" className="h-14">
                  Book Demo
                </Button>
              </div>
              <div className="flex items-center gap-2 text-muted text-sm">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 16 17">
                  <path d="M14.66 6.5H1.33M14.66 6.5c0 .28 0 .59 0 .94V9.5M14.66 6.5c-.01-.9-.06-1.44-.29-1.88a2.67 2.67 0 0 0-1.16-1.16C12.63 3.17 11.89 3.17 10.39 3.17H5.59c-1.49 0-2.24 0-2.81.29a2.67 2.67 0 0 0-1.16 1.16c-.22.44-.28.98-.29 1.88M1.33 6.5c0 .28 0 .59 0 .94v2.13c0 1.49 0 2.24.29 2.81.26.5.67.91 1.17 1.17.57.29 1.31.29 2.81.29h2.51M5.99 9.17H3.99" />
                  <path d="M11.25 14.58l1.41-1.41m0 0l1.42-1.42m-1.42 1.42l-1.41-1.42m1.41 1.42l1.42 1.42" />
                </svg>
                <p>No card required</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
