import Image from "next/image";
import Link from "next/link";
import SectionBadge from "@/components/SectionBadge";

const testimonials = [
  {
    company: "TDG Inc.",
    logo: { src: "/logos/tdg-inc.svg", width: 200, height: 200, xl: true, offset: "-ml-[18px]" },
    quote:
      "We used to spend hours every week chasing overdue invoices manually. Since switching to Yonovo, our manual follow ups dropped by 80% and we\u2019re collecting faster than ever. The AI handles the routine stuff so our team can focus on the accounts that actually need a human touch.",
    name: "Mohammad Alshalabi",
    title: "Director of Finance",
    caseStudySlug: "tdg-inc",
  },
  {
    company: "Troyes",
    logo: { src: "/logos/troyes.png", width: 130, height: 41, large: true },
    quote:
      "What impressed us most was how quickly we were up and running. We connected QuickBooks, set our preferences, and Yonovo was collecting on our behalf within the same day. Our customer relationships haven\u2019t suffered at all, if anything the follow ups are more consistent and professional than before.",
    name: "Apple Smith",
    title: "Accounts Receivable Manager",
    caseStudySlug: "troyes",
  },
  {
    company: "Lawazim",
    logo: { src: "/logos/lawazim.svg", width: 120, height: 40, small: true },
    quote:
      "As a wholesale distributor, our customer relationships are everything. We were nervous about automating collections but Yonovo\u2019s approach is professional and respectful. Customers have commented that our follow ups feel more organized. We\u2019re collecting faster without a single complaint.",
    name: "Faris Shawaf",
    title: "CFO",
  },
];

function TestimonialCard({
  company,
  logo,
  quote,
  name,
  title,
  caseStudySlug,
}: {
  company: string;
  logo: { src: string; width: number; height: number; small?: boolean; large?: boolean; xl?: boolean; offset?: string };
  quote: string;
  name: string;
  title: string;
  caseStudySlug?: string;
}) {
  const logoHeight = logo.xl ? "h-[108px]" : logo.small ? "h-[12px]" : logo.large ? "h-8" : "h-9";
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-background">
      <div className="grow p-8">
        <div className="mb-5 flex h-9 items-center">
          <Image
            src={logo.src}
            alt={company}
            width={logo.width}
            height={logo.height}
            className={`w-auto object-contain object-left grayscale opacity-60 ${logoHeight} ${logo.offset || ""}`}
          />
        </div>
        <p className="text-[1.2rem] text-foreground leading-7">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
      <div className="mt-auto flex items-end justify-between p-8 pt-0">
        <div className="flex flex-col gap-1">
          <div className="font-bold text-foreground">{name}</div>
          <div className="text-muted">{title}</div>
        </div>
        {caseStudySlug && (
          <Link
            href={`/case-studies/${caseStudySlug}`}
            className="group flex items-center gap-1.5 text-sm font-medium text-brand-blue transition-colors hover:text-brand-blue/80"
          >
            Read case study
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        )}
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
