import Image from "next/image";
import Link from "next/link";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/Button";
import type { IndustryData } from "@/data/industries";
import FAQAccordion from "@/components/FAQAccordion";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

const logos = [
  { name: "Troyes", src: "/logos/troyes.png", width: 130, className: "h-[28px] lg:h-[47px]" },
  { name: "TDG Inc", src: "/logos/tdg-inc.svg", width: 200, className: "h-[65px] lg:h-[120px]" },
  { name: "SBC", src: "/logos/sbc.png", width: 200, className: "h-[50px] lg:h-[95px]" },
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
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                    <Link href="/book-demo" className="w-full sm:w-auto">
                      <Button variant="brand" size="md" className="h-14 w-full px-[46px] text-lg font-medium sm:w-auto">
                        Book Demo
                      </Button>
                    </Link>
                    <Link href="https://dashboard.yonovo.ai/login" className="w-full sm:w-auto">
                      <Button variant="ghost-dark" size="md" className="h-14 w-full sm:w-auto">
                        Start Free
                      </Button>
                    </Link>
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
                <div className="relative aspect-[0.8] w-full overflow-hidden rounded-2xl">
                  <video
                    src="/industry-hero-video.mov"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </div>
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
              <Link href="/book-demo">
                <Button variant="brand" size="lg" className="h-14 px-[46px] text-lg font-medium">
                  {data.hero.cta}
                </Button>
              </Link>
              <Link href="https://dashboard.yonovo.ai/login">
                <Button variant="ghost-dark" size="lg" className="h-14">
                  Start Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <TestimonialsSection />

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
