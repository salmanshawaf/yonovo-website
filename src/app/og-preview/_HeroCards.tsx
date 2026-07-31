/* Floating product-UI cards for the hero, recreated in code from real Yonovo screens. */

const CARD_BASE =
  "rounded-2xl bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)] ring-1 ring-black/[0.06]";
const CARD = `${CARD_BASE} p-5`;

const COLORS = {
  navy: "#0c2756",
  blue: "#203a7f",
  gold: "#E0A93B",
  orange: "#D9803F",
  coral: "#D85A4A",
  darkred: "#B23A32",
  red: "#e13f3f",
  grid: "#EDEFF2",
  axis: "#9ca3af",
};

/* ── Small inline line chart ── */
function LineChart({
  data,
  min,
  max,
  color,
  xLabels,
  yTicks,
  yFmt,
}: {
  data: number[];
  min: number;
  max: number;
  color: string;
  xLabels: string[];
  yTicks: number[];
  yFmt: (v: number) => string;
}) {
  const W = 300;
  const H = 132;
  const PL = 36;
  const PR = 6;
  const PT = 8;
  const PB = 20;
  const plotW = W - PL - PR;
  const plotH = H - PT - PB;
  const n = data.length;
  const x = (i: number) => PL + (n === 1 ? 0 : (i / (n - 1)) * plotW);
  const y = (v: number) => PT + (1 - (v - min) / (max - min)) * plotH;
  const path = data
    .map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={PL} x2={W - PR} y1={y(t)} y2={y(t)} stroke={COLORS.grid} strokeWidth="1" />
          <text x={PL - 7} y={y(t) + 3} textAnchor="end" fontSize="9" fill={COLORS.axis}>
            {yFmt(t)}
          </text>
        </g>
      ))}
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill={color} />
      ))}
      {xLabels.map((l, i) => (
        <text key={l} x={x(i)} y={H - 6} textAnchor="middle" fontSize="9" fill={COLORS.axis}>
          {l}
        </text>
      ))}
    </svg>
  );
}

/* ── Small inline bar chart ── */
function BarChart({
  bars,
  max,
  yTicks,
  yFmt,
}: {
  bars: { label: string; value: number; color: string }[];
  max: number;
  yTicks: number[];
  yFmt: (v: number) => string;
}) {
  const W = 420;
  const H = 250;
  const PL = 52;
  const PR = 8;
  const PT = 10;
  const PB = 26;
  const plotW = W - PL - PR;
  const plotH = H - PT - PB;
  const slot = plotW / bars.length;
  const bw = slot * 0.5;
  const y = (v: number) => PT + (1 - v / max) * plotH;
  const baseY = PT + plotH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={PL} x2={W - PR} y1={y(t)} y2={y(t)} stroke={COLORS.grid} strokeWidth="1" />
          <text x={PL - 8} y={y(t) + 3} textAnchor="end" fontSize="9" fill={COLORS.axis}>
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
            <text x={bx + bw / 2} y={H - 7} textAnchor="middle" fontSize="9.5" fill={COLORS.axis}>
              {b.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Help() {
  return (
    <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-zinc-300 text-[8px] text-zinc-400">
      ?
    </span>
  );
}

/* ── Cards ── */
function DsoCard() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-[17px] font-bold text-zinc-900">DSO</span>
          <Help />
        </div>
        <div className="text-right">
          <span className="text-[28px] font-bold text-zinc-900">34.8</span>
          <span className="ml-1 text-[11px] font-medium text-zinc-400">DAYS</span>
          <div className="text-[11px] font-semibold text-emerald-600">↓ 20.0 days</div>
        </div>
      </div>
      <p className="text-[11px] leading-snug text-zinc-400">Days sales outstanding</p>
      <LineChart
        data={[112, 146, 149, 93, 55, 33]}
        min={30}
        max={154}
        color={COLORS.navy}
        xLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
        yTicks={[30, 61, 92, 123, 154]}
        yFmt={(v) => `${v}d`}
      />
    </div>
  );
}

function AgingCard() {
  return (
    <div className="flex h-full flex-col gap-1">
      <span className="text-[17px] font-bold text-zinc-900">Aging Balance</span>
      <div className="mt-2 flex flex-1 items-end">
        <BarChart
          bars={[
            { label: "Current", value: 200, color: COLORS.navy },
            { label: "1–30d", value: 251, color: COLORS.gold },
            { label: "31–60d", value: 90, color: COLORS.orange },
            { label: "61–90d", value: 39, color: COLORS.coral },
            { label: "90+", value: 32, color: COLORS.darkred },
          ]}
          max={300}
          yTicks={[0, 75, 150, 225, 300]}
          yFmt={(v) => (v === 0 ? "0" : `${v}K`)}
        />
      </div>
    </div>
  );
}

function ClientAgentCard() {
  return (
    <div className="flex h-full flex-col items-center gap-3 py-1">
      {/* Connection row: generic AI assistant ·· MCP ·· Yonovo Y hub */}
      <div className="mx-auto flex w-full max-w-[300px] items-start justify-center">
        {/* AI assistant node — Claude mark, generic label */}
        <div className="flex shrink-0 flex-col items-center gap-1">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e4e0] bg-white shadow-sm">
            <img src="/claude-icon.svg" alt="AI assistant" className="h-[22px] w-[22px]" />
          </div>
          <span className="text-[8.5px] font-medium text-[#8a8a87]">AI assistant</span>
        </div>

        {/* Dashed connector with centered MCP micro-label */}
        <div className="relative mt-[22px] flex flex-1 items-center px-1">
          <div className="h-0 w-full border-t-[1.5px] border-dashed border-[#c0bfbb]" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e5e4e0] bg-white px-1.5 py-[1px] text-[7.5px] font-semibold tracking-wide text-[#6b6b68] shadow-sm">
            MCP
          </span>
        </div>

        {/* Yonovo node — brand Y icon */}
        <div className="flex shrink-0 flex-col items-center gap-1">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#e5e4e0] bg-white shadow-sm">
            <img src="/yonovo-icon.png" alt="Yonovo" className="h-[52px] w-[52px] max-w-none" />
          </div>
          <span className="text-[8.5px] font-medium text-[#8a8a87]">Yonovo</span>
        </div>
      </div>

      {/* Thinking indicator: three staggered pulsing dots + ONE short label */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-navy animate-pulse" style={{ animationDelay: "0ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-brand-navy animate-pulse" style={{ animationDelay: "150ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-brand-navy animate-pulse" style={{ animationDelay: "300ms" }} />
        </span>
        <span className="text-[11px] font-medium text-zinc-600">Reading your AR</span>
      </div>

      {/* Connected status pill (reuses the FitsInMockup idiom) */}
      <div className="flex items-center gap-1.5 rounded-full border border-[#e5e4e0] bg-white px-2.5 py-1 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2d8a4e]" />
        <span className="text-[9px] font-medium text-[#3a3a38]">Connected</span>
      </div>
    </div>
  );
}

function ReplyCard() {
  return (
    <div className="flex h-full flex-col gap-3">
      {/* Header — one quiet line */}
      <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
        <span className="font-semibold text-zinc-500">✉ Customer reply</span>
        <span>·</span>
        <span>Atlas Security Partners</span>
      </div>

      {/* Incoming customer message — light, no box ring */}
      <p className="border-l-2 border-zinc-200 pl-3 text-[12px] leading-relaxed text-zinc-500">
        Perfect. Once the invoice shows our PO number we can release the full balance on Friday.
      </p>

      <div className="border-t border-zinc-100" />

      {/* AI draft — Yonovo has already done the work */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-blue">
          AI reply draft
        </span>
        <p className="text-[12px] leading-relaxed text-zinc-700">
          All set. I have added your PO number to invoice #2041 and attached the corrected copy, so you are clear to release payment Friday.
        </p>

        {/* Attachment chip — makes "work is done" tangible */}
        <div className="flex w-fit items-center gap-2 rounded-lg border border-[#e5e4e0] bg-white px-2.5 py-1.5">
          <svg className="h-4 w-4 shrink-0 text-[#c53030]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
          </svg>
          <span className="text-[10.5px] font-medium text-zinc-700">Invoice #2041 (updated).pdf</span>
          <svg className="h-3.5 w-3.5 shrink-0 text-[#2d8a4e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      {/* Actions — framed as ready to send */}
      <div className="mt-auto flex flex-col gap-2 pt-1">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap rounded-md bg-brand-navy px-2.5 py-1.5 text-[10.5px] font-semibold text-white">
            Approve &amp; send
          </span>
          <span className="whitespace-nowrap rounded-md px-2.5 py-1.5 text-[10.5px] font-medium text-zinc-700 ring-1 ring-zinc-200">
            Edit
          </span>
        </div>
        <span className="flex items-center gap-1 whitespace-nowrap text-[9.5px] font-medium text-zinc-500">
          <span className="h-1 w-1 rounded-full bg-amber-400" />
          Human review required
        </span>
      </div>
    </div>
  );
}

/* Always-on cluster (adapted from the c7bfd5f hero) for the OG preview card:
   fixed 660x688, fully visible (no responsive gating, no off-screen bleed). */
export default function HeroCards() {
  return (
    <div className="relative h-[688px] w-[660px]">
      {/* Left column — matched small pair, vertically centered against the right column */}
      <div className="absolute left-0 top-1/2 w-[264px] -translate-y-1/2 space-y-5">
        <div className={CARD}>
          <DsoCard />
        </div>
        <div className={CARD}>
          <ClientAgentCard />
        </div>
      </div>

      {/* Right column — two equal-size anchors with space between */}
      <div className="absolute right-0 top-0 flex h-full w-[372px] flex-col gap-[24px]">
        <div className={`${CARD_BASE} flex h-[332px] flex-col p-5`}>
          <AgingCard />
        </div>
        <div className={`${CARD_BASE} flex h-[332px] flex-col p-5`}>
          <ReplyCard />
        </div>
      </div>
    </div>
  );
}
