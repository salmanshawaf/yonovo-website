import Image from "next/image";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/Button";
import type { CaseStudyData } from "@/data/caseStudies";

/* ── Sub-components ── */

function ChallengeCard({ text }: { text: string }) {
  return (
    <div className="flex flex-row gap-5 rounded-3xl border border-border bg-white p-6 md:px-8 md:py-6">
      <div className="h-8 w-1 shrink-0 rounded-full bg-brand-red" />
      <p className="text-sm text-secondary tracking-tight md:text-base">{text}</p>
    </div>
  );
}

function SolutionCard({ text }: { text: string }) {
  return (
    <div className="flex flex-row gap-5 rounded-3xl border border-border bg-white p-6 md:px-8 md:py-6">
      <div className="h-8 w-1 shrink-0 rounded-full bg-brand-green" />
      <p className="text-sm text-secondary tracking-tight md:text-base">{text}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-background">
      <div className="w-full overflow-hidden rounded-t-2xl">
        <div className="h-[167px] w-full bg-gradient-to-br from-brand-blue/40 via-brand-blue/70 to-brand-blue" />
      </div>
      <div className="flex flex-col justify-center p-8">
        <div className="font-medium text-[3.25rem] text-foreground leading-[3.75rem]">
          {value}
        </div>
        <div className="text-muted text-xl">{label}</div>
      </div>
    </div>
  );
}

/* ── Template ── */

export default function CaseStudyPageTemplate({ data }: { data: CaseStudyData }) {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative w-full -mt-16 pt-28 md:pt-32 pb-10 md:pb-12 bg-background">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 md:items-center">
            <SectionBadge label={data.card.industry} />
            <Image
              src={data.card.logo.src}
              alt={data.card.companyName}
              width={data.card.logo.width}
              height={data.card.logo.height}
              className="h-16 w-auto object-contain md:h-20"
            />
            <p className="text-base text-secondary tracking-tight md:text-center md:text-xl max-w-3xl">
              {data.card.summary}
            </p>
          </div>
        </div>
      </section>

      {/* ── Challenge ── */}
      <section className="w-full bg-surface py-12 md:py-15">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            <div className="flex flex-1 flex-col gap-4">
              <SectionBadge label="The Challenge" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                {data.challenge.headline}
              </h2>
              <p className="text-balance text-base text-secondary leading-normal tracking-tight md:text-xl">
                {data.challenge.description}
              </p>
            </div>
            <div className="grid flex-1 auto-rows-max grid-cols-1 content-center gap-3">
              {data.challenge.points.map((point) => (
                <ChallengeCard key={point} text={point} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Solution ── */}
      <section className="w-full bg-background py-12 md:py-15">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            <div className="flex flex-1 flex-col gap-4">
              <SectionBadge label="The Solution" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                {data.solution.headline}
              </h2>
              <p className="text-balance text-base text-secondary leading-normal tracking-tight md:text-xl">
                {data.solution.description}
              </p>
            </div>
            <div className="grid flex-1 auto-rows-max grid-cols-1 content-center gap-3">
              {data.solution.points.map((point) => (
                <SolutionCard key={point} text={point} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="w-full bg-surface py-12 md:py-15">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-8 md:gap-16">
            <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 md:items-center">
              <SectionBadge label="Results" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-center md:text-[54px]">
                {data.results.headline}
              </h2>
              <p className="text-base text-secondary tracking-tight md:text-center md:text-xl">
                {data.results.description}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {data.results.stats.map((stat) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="w-full bg-background py-12 md:py-15">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6">
            <svg className="h-10 w-10 text-brand-red" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.3 2.6C6.1 5.1 3 9.3 3 14.1c0 3.2 2 5.3 4.3 5.3 2.2 0 3.8-1.7 3.8-3.8 0-2.1-1.5-3.6-3.3-3.6-.4 0-.8.1-1.2.2.6-3 3-6.2 6.1-7.9L11.3 2.6zM22.1 2.6c-5.2 2.5-8.3 6.7-8.3 11.5 0 3.2 2 5.3 4.3 5.3 2.2 0 3.8-1.7 3.8-3.8 0-2.1-1.5-3.6-3.3-3.6-.4 0-.8.1-1.2.2.6-3 3-6.2 6.1-7.9L22.1 2.6z" />
            </svg>
            <blockquote className="text-center text-[1.2rem] text-foreground leading-relaxed md:text-2xl">
              &ldquo;{data.testimonial.quote}&rdquo;
            </blockquote>
            <div className="flex flex-col items-center gap-1">
              <span className="font-bold text-foreground">{data.testimonial.name}</span>
              <span className="text-muted">{data.testimonial.role}, {data.testimonial.company}</span>
            </div>
          </div>
        </div>
      </section>

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
                {data.cta.headline}
              </p>
              <p className="text-center font-normal text-base text-secondary tracking-[-0.4px] md:text-balance md:text-xl">
                {data.cta.description}
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
