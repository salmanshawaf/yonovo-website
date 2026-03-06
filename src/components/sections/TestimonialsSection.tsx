import SectionBadge from "@/components/SectionBadge";

const testimonials = [
  {
    company: "OpenAI",
    quote:
      "Chatbase is a strong signal of how customer support will evolve. It is an early adopter of the agentic approach, which will become increasingly effective, trusted, and prominent.",
    name: "Marc Manara",
    title: "Head of Startups",
    colSpanLg: "col-span-6",
    colSpanMd: "col-span-2",
  },
  {
    company: "Sage",
    quote:
      "The chatbots are user-friendly, easy to customize, and have been effectively serving our customers for nearly two years.",
    name: "Ann Donie",
    title: "Product Owner",
    colSpanLg: "col-span-3",
    colSpanMd: "col-span-1",
  },
  {
    company: "Chuck E. Cheese",
    quote:
      "Chatbase gave us a powerful, flexible way to launch our AI chatbot without the complexity we saw in other platforms. Guests report strong satisfaction, and the system has been easy for our team to maintain. The customization options let us match our brand voice, and the platform continues to scale with us.",
    name: "Mark Kupferman",
    title: "CMO",
    colSpanLg: "col-span-6",
    colSpanMd: "col-span-2",
  },
  {
    company: "Synergym",
    quote:
      "Chatbase is an excellent AI chat solution for businesses. Onboarding is fast, and training the bot is easy even with a lot of information. For our end users, the experience is smooth, the answers are accurate, and it significantly reduces friction. It\u2019s been a practical, scalable tool that we highly recommend.",
    name: "Jes\u00fas Franco",
    title: "CTO",
    colSpanLg: "col-span-6",
    colSpanMd: "col-span-2",
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

function StatsCard() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-background">
      <div className="w-full overflow-hidden rounded-t-2xl">
        <div className="h-[167px] w-full bg-gradient-to-br from-amber-200 via-pink-200 to-rose-200" />
      </div>
      <div className="flex flex-col justify-center p-8">
        <div className="font-medium text-[3.25rem] text-foreground leading-[3.75rem]">
          10,000+
        </div>
        <div className="text-muted text-xl">businesses trust Chatbase</div>
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
              With over <span className="font-bold">10,000</span> clients
              served, here&apos;s what they have to say
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
                <TestimonialCard {...testimonials[1]} />
              </div>
              <div className="h-full col-span-3">
                <StatsCard />
              </div>
              <div className="h-full col-span-6">
                <TestimonialCard {...testimonials[2]} />
              </div>
              <div className="h-full col-span-6">
                <TestimonialCard {...testimonials[3]} />
              </div>
            </div>

            {/* Tablet md: 3-column grid */}
            <div className="hidden grid-cols-3 gap-6 md:grid lg:hidden">
              <div className="h-full col-span-2">
                <TestimonialCard {...testimonials[0]} />
              </div>
              <div className="h-full col-span-1">
                <TestimonialCard {...testimonials[1]} />
              </div>
              <div className="h-full col-span-1">
                <StatsCard />
              </div>
              <div className="h-full col-span-2">
                <TestimonialCard {...testimonials[2]} />
              </div>
              <div className="h-full col-span-2">
                <TestimonialCard {...testimonials[3]} />
              </div>
            </div>

            {/* Mobile: stacked */}
            <div className="flex flex-col gap-4 md:hidden">
              <TestimonialCard {...testimonials[0]} />
              <TestimonialCard {...testimonials[1]} />
              <StatsCard />
              <TestimonialCard {...testimonials[2]} />
              <TestimonialCard {...testimonials[3]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
