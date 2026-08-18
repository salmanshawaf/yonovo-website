import Link from "next/link";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/Button";
import {
  STATS,
  SECTIONS,
  STAT_COUNT,
  STATS_YEAR,
  LAST_UPDATED,
  KEY_TAKEAWAY_IDS,
  type Stat,
  type SectionId,
} from "@/data/arStatistics";

/*
 * The statistics page exists to be cited: every stat has a permanent anchor,
 * a one line takeaway, and a dofollow link to its original publisher. Single
 * CTA at the very bottom only. Charts are self contained SVGs that carry
 * their own title and source line so they survive being copied elsewhere.
 */

/* ── Chart primitives ──
 * Pattern extends src/components/sections/HeroCards.tsx BarChart: fixed
 * viewBox + w-full, hardcoded hex (CSS variables die when the SVG is copied
 * onto another site), rx=4 bars, SVG text labels. New conventions introduced
 * here: white background rect, in-SVG title, in-SVG source line, and
 * title/desc accessibility wiring.
 */

const CHART_COLORS = {
  navy: "#0c2756",
  gold: "#E0A93B",
  orange: "#D9803F",
  coral: "#D85A4A",
  darkred: "#B23A32",
  grid: "#EDEFF2",
  axis: "#9ca3af",
  text: "#171717",
};

type ChartBar = { label: string; value: number; color: string };

function StatBarChart({
  chartId,
  title,
  desc,
  bars,
  max,
  yTicks,
  yFmt,
  source,
}: {
  chartId: string;
  title: string;
  desc: string;
  bars: ChartBar[];
  max: number;
  yTicks: number[];
  yFmt: (v: number) => string;
  source: string;
}) {
  const W = 640;
  const H = 400;
  const PL = 56;
  const PR = 16;
  const PT = 56;
  const PB = 64;
  const plotW = W - PL - PR;
  const plotH = H - PT - PB;
  const slot = plotW / bars.length;
  const bw = slot * 0.56;
  const y = (v: number) => PT + (1 - v / max) * plotH;
  const baseY = PT + plotH;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-labelledby={`${chartId}-title ${chartId}-desc`}
    >
      <title id={`${chartId}-title`}>{title}</title>
      <desc id={`${chartId}-desc`}>{desc}</desc>
      {/* White background so the chart renders correctly wherever it is copied */}
      <rect x="0" y="0" width={W} height={H} fill="#ffffff" rx="12" />
      {/* Chart title inside the SVG so it survives being lifted */}
      <text x={PL} y={26} fontSize="16" fontWeight="600" fill={CHART_COLORS.text}>
        {title}
      </text>
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={PL} x2={W - PR} y1={y(t)} y2={y(t)} stroke={CHART_COLORS.grid} strokeWidth="1" />
          <text x={PL - 8} y={y(t) + 3} textAnchor="end" fontSize="10" fill={CHART_COLORS.axis}>
            {yFmt(t)}
          </text>
        </g>
      ))}
      {bars.map((b, i) => {
        const bx = PL + slot * i + (slot - bw) / 2;
        const by = y(b.value);
        return (
          <g key={b.label}>
            <rect x={bx} y={by} width={bw} height={baseY - by} rx="4" fill={b.color} />
            <text x={bx + bw / 2} y={by - 6} textAnchor="middle" fontSize="11" fontWeight="600" fill={CHART_COLORS.text}>
              {yFmt(b.value)}
            </text>
            <text x={bx + bw / 2} y={baseY + 16} textAnchor="middle" fontSize="10" fill={CHART_COLORS.axis}>
              {b.label}
            </text>
          </g>
        );
      })}
      {/* Source line inside the image: the link-back hook when reproduced */}
      <text x={PL} y={H - 14} fontSize="10" fill={CHART_COLORS.axis}>
        {source} · yonovo.com/accounts-receivable-statistics
      </text>
    </svg>
  );
}

/* ── Stat block ── */

function StatBlock({ stat, number }: { stat: Stat; number: number }) {
  return (
    <div className="flex flex-col gap-2 border-t border-border py-6 first:border-t-0 md:py-8">
      <h3 id={stat.id} className="scroll-mt-20 group font-medium text-xl text-foreground tracking-tight md:text-2xl">
        {number}. {stat.headline}{" "}
        <a
          href={`#${stat.id}`}
          aria-label="Link to this statistic"
          className="text-secondary opacity-40 transition-opacity md:opacity-0 md:group-hover:opacity-100"
        >
          #
        </a>
      </h3>
      <p className="text-base text-secondary leading-relaxed md:text-lg">{stat.takeaway}</p>
      <p className="text-sm text-muted">
        Source:{" "}
        <a
          href={stat.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-blue underline underline-offset-2"
        >
          {stat.sourceName}
        </a>
        , {stat.sourceYear}
      </p>
    </div>
  );
}

/* ── Charts placed per section ──
 * Every figure charted below also appears as a stat in the same section,
 * from the same verified source.
 */

function SectionCharts({ sectionId }: { sectionId: SectionId }) {
  if (sectionId === "late-payment-behavior") {
    return (
      <div className="mt-6 overflow-hidden rounded-2xl border border-border">
        <StatBarChart
          chartId="chart-days-late"
          title="Average days late on small business invoices, Dec 2025 quarter"
          desc="Bar chart of average days invoices are paid past their due date: New Zealand 4.5, Australia 6.6, United States 7.8, United Kingdom 8.0, Canada 9.7."
          bars={[
            { label: "New Zealand", value: 4.5, color: CHART_COLORS.navy },
            { label: "Australia", value: 6.6, color: CHART_COLORS.gold },
            { label: "United States", value: 7.8, color: CHART_COLORS.orange },
            { label: "United Kingdom", value: 8.0, color: CHART_COLORS.coral },
            { label: "Canada", value: 9.7, color: CHART_COLORS.darkred },
          ]}
          max={12}
          yTicks={[0, 3, 6, 9, 12]}
          yFmt={(v) => `${v}d`}
          source="Source: Xero Small Business Insights, 2026"
        />
      </div>
    );
  }
  if (sectionId === "dso-and-aging") {
    return (
      <div className="mt-6 overflow-hidden rounded-2xl border border-border">
        <StatBarChart
          chartId="chart-collectability"
          title="Probability of collecting a delinquent account, by age"
          desc="Bar chart of collection probability as an account ages: due date 95.1 percent, 30 days 88.7, 60 days 80.4, 90 days 68.9, six months 51.3, nine months 37.5, one year 21.4, two years 8.9."
          bars={[
            { label: "Due date", value: 95.1, color: CHART_COLORS.navy },
            { label: "30 days", value: 88.7, color: CHART_COLORS.navy },
            { label: "60 days", value: 80.4, color: CHART_COLORS.gold },
            { label: "90 days", value: 68.9, color: CHART_COLORS.gold },
            { label: "6 months", value: 51.3, color: CHART_COLORS.orange },
            { label: "9 months", value: 37.5, color: CHART_COLORS.coral },
            { label: "1 year", value: 21.4, color: CHART_COLORS.darkred },
            { label: "2 years", value: 8.9, color: CHART_COLORS.darkred },
          ]}
          max={100}
          yTicks={[0, 25, 50, 75, 100]}
          yFmt={(v) => `${v}%`}
          source="Source: Commercial Collection Agencies of America"
        />
      </div>
    );
  }
  if (sectionId === "collections-cost-and-effort") {
    return (
      <div className="mt-6 overflow-hidden rounded-2xl border border-border">
        <StatBarChart
          chartId="chart-revenue-lost"
          title="Revenue lost chasing late payments, by region"
          desc="Bar chart of average share of revenue middle market companies lose chasing late payments: North America 3.0 percent, APAC 3.5, CEMEA 3.6, Europe 4.0, Latin America and Caribbean 5.0."
          bars={[
            { label: "North America", value: 3.0, color: CHART_COLORS.navy },
            { label: "APAC", value: 3.5, color: CHART_COLORS.gold },
            { label: "CEMEA", value: 3.6, color: CHART_COLORS.orange },
            { label: "Europe", value: 4.0, color: CHART_COLORS.coral },
            { label: "LAC", value: 5.0, color: CHART_COLORS.darkred },
          ]}
          max={6}
          yTicks={[0, 2, 4, 6]}
          yFmt={(v) => `${v}%`}
          source="Source: PYMNTS Intelligence and Visa, 2026"
        />
      </div>
    );
  }
  return null;
}

/* ── Page ── */

export default function ARStatisticsPage() {
  // Continuous numbering across the whole page, derived from array order.
  const numberById = new Map(STATS.map((s, i) => [s.id, i + 1]));
  const keyTakeaways = KEY_TAKEAWAY_IDS
    .map((id) => STATS.find((s) => s.id === id))
    .filter((s): s is Stat => Boolean(s));

  return (
    <>
      {/* ── Hero ── */}
      <section data-navbar-dark className="w-full -mt-16 bg-[#030D27] pt-28 md:pt-32 pb-10 md:pb-14">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <SectionBadge label="Data and research" variant="dark" />
            <h1 className="text-balance font-medium text-[42px] text-white leading-[1.1] tracking-tight md:text-[70px]">
              Accounts Receivable Statistics ({STATS_YEAR})
            </h1>
            <p className="max-w-3xl text-balance text-base text-zinc-400 tracking-tight md:text-xl">
              {STAT_COUNT} statistics on late payments, DSO, collections effort, automation adoption, cash flow, and small business impact. Every figure on this page links to its original publisher. No aggregators, no secondhand numbers, no email wall.
            </p>
          </div>
        </div>
      </section>

      {/* ── Key takeaways ── */}
      <section className="w-full bg-background py-12 md:py-16">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div id="key-takeaways" className="scroll-mt-20 mx-auto max-w-4xl rounded-2xl border border-border bg-surface p-6 md:p-10">
            <h2 className="mb-6 font-medium text-2xl text-foreground tracking-tight md:text-3xl">
              Key takeaways
            </h2>
            <ol className="flex flex-col gap-4">
              {keyTakeaways.map((s) => (
                <li key={s.id} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-sm font-medium text-white">
                    {numberById.get(s.id)}
                  </span>
                  <a href={`#${s.id}`} className="text-base text-foreground leading-relaxed hover:text-brand-blue transition-colors md:text-lg">
                    {s.headline}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Section jump nav */}
          <nav aria-label="Statistics sections" className="mx-auto mt-8 flex max-w-4xl flex-wrap gap-x-6 gap-y-2">
            {SECTIONS.map((sec) => (
              <a key={sec.id} href={`#${sec.id}`} className="text-sm text-brand-blue underline underline-offset-2">
                {sec.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ── Sections ── */}
      {SECTIONS.map((sec, i) => {
        const sectionStats = STATS.filter((s) => s.section === sec.id);
        if (sectionStats.length === 0) return null;
        return (
          <section key={sec.id} className={`w-full py-10 md:py-14 ${i % 2 === 0 ? "bg-background" : "bg-surface"}`}>
            <div className="mx-auto max-w-(--container-max-width) px-6">
              <div className="mx-auto max-w-4xl">
                <h2 id={sec.id} className="scroll-mt-20 mb-2 font-medium text-3xl text-foreground tracking-tight md:text-4xl">
                  {sec.title}
                </h2>
                <div className="flex flex-col">
                  {sectionStats.map((stat) => (
                    <StatBlock key={stat.id} stat={stat} number={numberById.get(stat.id)!} />
                  ))}
                </div>
                <SectionCharts sectionId={sec.id} />
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Methodology ── */}
      <section className="w-full bg-background py-12 md:py-16">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border p-6 md:p-10">
            <h2 id="methodology" className="scroll-mt-20 mb-4 font-medium text-2xl text-foreground tracking-tight md:text-3xl">
              Methodology and sourcing
            </h2>
            <p className="text-base text-secondary leading-relaxed md:text-lg">
              Every figure on this page links to its original publisher. We never cite another statistics roundup as a source, and we verify that each figure appears on the linked page before it goes up. When a source page goes offline or a figure is superseded, the statistic comes off the page. Last updated {LAST_UPDATED}.
            </p>
            <p className="mt-4 text-base text-secondary leading-relaxed md:text-lg">
              You are welcome to cite any figure here. Link back to this page or to the original source, and use the anchor links to point at a specific statistic. The charts are free to reproduce with the source line intact.
            </p>
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="w-full bg-background pb-12 md:pb-16">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="mx-auto max-w-4xl">
            <p className="text-base text-secondary leading-relaxed md:text-lg">
              The picture the data paints is consistent. A large share of B2B invoices are paid late, the odds of collecting drop as invoices age, and the chasing falls on finance teams that already have too much to do. That gap between invoiced and collected is what{" "}
              <Link href="/accounts-receivable-automation-software" className="text-brand-blue underline underline-offset-2">accounts receivable automation software</Link> addresses, and the day to day mechanics of closing it are covered in our guide to{" "}
              <Link href="/ar-collections-software" className="text-brand-blue underline underline-offset-2">collections software</Link>. To see what your own numbers imply, try the{" "}
              <Link href="/tools/dso-calculator" className="text-brand-blue underline underline-offset-2">DSO calculator</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Single CTA (the only one on the page) ── */}
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
                Tired of being one of these statistics?
              </p>
              <p className="text-center font-normal text-base text-secondary tracking-[-0.4px] md:text-balance md:text-xl">
                Yonovo runs collections for you, across email, SMS, phone, and WhatsApp, so your invoices get paid without the chasing.
              </p>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-6 md:gap-4">
              <div className="flex w-full max-w-sm flex-col gap-3 px-6 sm:max-w-none sm:w-auto sm:flex-row sm:gap-6 sm:px-0">
                <Link href="/book-demo" className="block">
                  <Button variant="brand" size="md" className="h-14 w-full px-[46px] text-lg font-medium whitespace-nowrap">
                    Book Demo
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
