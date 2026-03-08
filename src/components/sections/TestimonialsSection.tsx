import SectionBadge from "@/components/SectionBadge";

const testimonials = [
  {
    company: "TDG Inc.",
    quote:
      "We used to spend hours every week chasing overdue invoices manually. Since switching to Yonovo, our manual follow ups dropped by 80% and we\u2019re collecting faster than ever. The AI handles the routine stuff so our team can focus on the accounts that actually need a human touch.",
    name: "Mohammad Alshalabi",
    title: "Director of Finance",
  },
  {
    company: "Troyes",
    quote:
      "What impressed us most was how quickly we were up and running. We connected QuickBooks, set our preferences, and Yonovo was collecting on our behalf within the same day. Our customer relationships haven\u2019t suffered at all, if anything the follow ups are more consistent and professional than before.",
    name: "Apple Smith",
    title: "Accounts Receivable Manager",
  },
  {
    company: "Lawazim",
    quote:
      "As a wholesale distributor, our customer relationships are everything. We were nervous about automating collections but Yonovo\u2019s approach is professional and respectful. Customers have actually commented that our follow ups feel more organized now. We\u2019re collecting faster without a single complaint.",
    name: "Faris Shawaf",
    title: "CFO",
  },
];

function TestimonialCard({
  company,
  quote,
  name,
  title,
}: {
  company: string;
  quote: string;
  name: string;
  title: string;
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
        <div className="h-[167px] w-full bg-gradient-to-br from-amber-200 via-pink-200 to-rose-200" />
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

export default function TestimonialsSection() {
  return (
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
                <TestimonialCard {...testimonials[0]} />
              </div>
              <div className="h-full col-span-3">
                <StatsCard stat="75%" description="reduction in manual tasks" />
              </div>
              <div className="h-full col-span-3">
                <StatsCard stat="15 Days" description="average reduction in DSO" />
              </div>
              <div className="h-full col-span-6">
                <TestimonialCard {...testimonials[1]} />
              </div>
              <div className="h-full col-span-6">
                <TestimonialCard {...testimonials[2]} />
              </div>
            </div>

            {/* Tablet md: 3-column grid */}
            <div className="hidden grid-cols-3 gap-6 md:grid lg:hidden">
              <div className="h-full col-span-2">
                <TestimonialCard {...testimonials[0]} />
              </div>
              <div className="h-full col-span-1">
                <StatsCard stat="75%" description="reduction in manual tasks" />
              </div>
              <div className="h-full col-span-1">
                <StatsCard stat="15 Days" description="average reduction in DSO" />
              </div>
              <div className="h-full col-span-2">
                <TestimonialCard {...testimonials[1]} />
              </div>
              <div className="h-full col-span-3">
                <TestimonialCard {...testimonials[2]} />
              </div>
            </div>

            {/* Mobile: stacked */}
            <div className="flex flex-col gap-4 md:hidden">
              <TestimonialCard {...testimonials[0]} />
              <StatsCard stat="75%" description="reduction in manual tasks" />
              <StatsCard stat="15 Days" description="average reduction in DSO" />
              <TestimonialCard {...testimonials[1]} />
              <TestimonialCard {...testimonials[2]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
