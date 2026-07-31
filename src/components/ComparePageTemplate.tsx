import React from "react";
import Image from "next/image";
import Link from "next/link";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/Button";
import FAQAccordion from "@/components/FAQAccordion";
import type { ComparisonData, CompareCell } from "@/data/comparisons";

/* ── Inline link renderer ──
   Renders paragraph strings that may contain markdown-style internal links,
   e.g. "See [pricing](/pricing) for details." Only used for our own copy. */

function renderRichText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <Link
        key={key++}
        href={match[2]}
        className="font-medium text-foreground underline decoration-1 underline-offset-2 hover:text-brand-blue"
      >
        {match[1]}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

/* ── Icons (match XeroPage comparison table) ── */

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

/** A comparison cell: boolean → check/cross, string → text. */
function Cell({ value, highlight = false }: { value: CompareCell; highlight?: boolean }) {
  if (typeof value === "boolean") {
    return value ? <CheckIcon /> : <XIcon />;
  }
  return (
    <span className={`text-sm ${highlight ? "text-foreground font-medium" : "text-secondary"}`}>
      {value}
    </span>
  );
}

/* ── Template ── */

export default function ComparePageTemplate({ data }: { data: ComparisonData }) {
  const competitor = data.competitor.name;

  return (
    <>
      {/* ── Hero (dark) ── */}
      <section data-navbar-dark className="w-full -mt-16 bg-[#030D27] pt-28 md:pt-32 pb-12 md:pb-16">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-6 md:gap-8">
            <SectionBadge label={data.hero.badge} variant="dark" />
            <h1 className="text-balance font-medium text-[42px] text-white leading-[1.1] tracking-tight md:text-[70px]">
              {data.hero.headline}
            </h1>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-2xl text-balance text-base text-zinc-400 tracking-tight md:text-xl">
                {data.hero.subhead}
              </p>
              <Link href="/book-demo" className="w-full shrink-0 sm:w-auto">
                <Button variant="brand" size="md" className="h-14 w-full px-[46px] text-lg font-medium whitespace-nowrap sm:w-auto">
                  Book Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Verdict (answer-first) ── */}
      <section className="w-full bg-background py-12 md:py-16">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <h2 className="font-medium text-2xl text-foreground tracking-tight md:text-3xl">
              The verdict
            </h2>
            {data.verdict.map((p, i) => (
              <p key={i} className="text-base text-secondary leading-relaxed tracking-tight md:text-lg">
                {renderRichText(p)}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="w-full bg-surface py-12 md:py-15">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col items-center gap-8 md:gap-14">
            <div className="flex flex-col items-center gap-4 text-center">
              <SectionBadge label="Compare" />
              <h2 className="text-balance font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
                Yonovo vs {competitor} at a glance
              </h2>
              <p className="text-base text-secondary leading-normal tracking-tight md:text-xl">
                A side-by-side look at how the two platforms compare on the criteria buyers weigh most.
              </p>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-border bg-background max-w-4xl w-full">
              {/* Header row */}
              <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-border">
                <div className="px-6 py-4">
                  <span className="font-medium text-sm text-muted uppercase tracking-wide">Feature</span>
                </div>
                <div className="flex items-center justify-center border-l border-border px-4 py-4">
                  <span className="font-medium text-sm text-foreground">{competitor}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 border-l border-brand-green/30 bg-brand-green/5 px-3 py-4">
                  <Image src="/yonovo-logo.png" alt="Yonovo" width={80} height={20} className="h-4 w-auto" />
                </div>
              </div>

              {/* Rows */}
              {data.table.rows.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-[1.4fr_1fr_1fr] ${i !== data.table.rows.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="px-6 py-4 flex items-center">
                    <span className="text-foreground text-sm md:text-base">{row.feature}</span>
                  </div>
                  <div className="flex items-center justify-center text-center border-l border-border px-4 py-4">
                    <Cell value={row.competitor} />
                  </div>
                  <div className="flex items-center justify-center text-center border-l border-brand-green/30 bg-brand-green/5 px-4 py-4">
                    <Cell value={row.yonovo} highlight />
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile cards */}
            <div className="flex w-full flex-col gap-3 md:hidden">
              {data.table.rows.map((row) => (
                <div key={row.feature} className="rounded-2xl border border-border bg-background p-4">
                  <div className="font-medium text-foreground mb-3">{row.feature}</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-muted shrink-0">{competitor}</span>
                      <span className="text-right"><Cell value={row.competitor} /></span>
                    </div>
                    <div className="flex items-center justify-between gap-3 rounded-lg bg-brand-green/5 px-2 py-1.5">
                      <span className="text-sm text-foreground font-medium shrink-0">Yonovo</span>
                      <span className="text-right"><Cell value={row.yonovo} highlight /></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted">
              Last reviewed {data.lastReviewed}. {competitor} details from {data.competitor.site}, verified at the time of writing.
            </p>
          </div>
        </div>
      </section>

      {/* ── Deep-dive sections ── */}
      <section className="w-full bg-background py-12 md:py-16">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-10 md:gap-12">
            {data.sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-4">
                <h2 className="text-balance font-medium text-2xl text-foreground leading-tight tracking-tight md:text-[32px]">
                  {section.heading}
                </h2>
                {section.body.map((p, i) => (
                  <p key={i} className="text-base text-secondary leading-relaxed tracking-tight md:text-lg">
                    {renderRichText(p)}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where the competitor is stronger (concession) ── */}
      <section className="w-full bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <h2 className="text-balance font-medium text-3xl text-foreground leading-tight tracking-tight md:text-[40px]">
              {data.competitorStrengths.heading}
            </h2>
            <p className="text-base text-secondary leading-relaxed tracking-tight md:text-lg">
              {data.competitorStrengths.intro}
            </p>
            <ul className="flex flex-col gap-3">
              {data.competitorStrengths.points.map((point) => (
                <li key={point} className="flex flex-row gap-3 rounded-2xl border border-border bg-background p-5">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-red" />
                  <span className="text-base text-secondary tracking-tight">{renderRichText(point)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Choose X if / Choose Yonovo if ── */}
      <section className="w-full bg-background py-12 md:py-16">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            {/* Yonovo */}
            <div className="flex flex-col gap-5 rounded-3xl border border-brand-green/40 bg-brand-green/5 p-6 md:p-8">
              <h3 className="font-medium text-xl text-foreground tracking-tight md:text-2xl">
                Choose Yonovo if
              </h3>
              <ul className="flex flex-col gap-3">
                {data.choose.yonovo.map((item) => (
                  <li key={item} className="flex flex-row gap-3">
                    <span className="mt-0.5 shrink-0"><CheckIcon /></span>
                    <span className="text-base text-secondary tracking-tight">{renderRichText(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Competitor */}
            <div className="flex flex-col gap-5 rounded-3xl border border-border bg-surface p-6 md:p-8">
              <h3 className="font-medium text-xl text-foreground tracking-tight md:text-2xl">
                Choose {competitor} if
              </h3>
              <ul className="flex flex-col gap-3">
                {data.choose.competitor.map((item) => (
                  <li key={item} className="flex flex-row gap-3">
                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                    <span className="text-base text-secondary tracking-tight">{renderRichText(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      {data.faqs.length > 0 && (
        <section className="w-full bg-surface py-16 md:py-24">
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
                See Yonovo running on your invoices
              </p>
              <p className="text-center font-normal text-base text-secondary tracking-[-0.4px] md:text-balance md:text-xl">
                Book a demo and our team will connect your accounting system and show automated
                collections working on your real data, usually live within a day.
              </p>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-6 md:gap-4">
              <div className="flex w-full max-w-sm flex-col gap-3 px-6 sm:max-w-none sm:w-auto sm:flex-row sm:gap-6 sm:px-0">
                <Link href="/book-demo" className="block">
                  <Button variant="brand" size="md" className="h-14 w-full px-[46px] text-lg font-medium whitespace-nowrap">
                    Book Demo
                  </Button>
                </Link>
                <Link href="/pricing" className="block">
                  <Button variant="ghost-dark" size="md" className="h-14 w-full px-[46px] text-lg font-medium whitespace-nowrap">
                    See pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
