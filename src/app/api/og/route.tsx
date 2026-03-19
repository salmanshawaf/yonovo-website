import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

/* ── Brand tokens ── */
const GREEN = "#5aef76";
const GREEN_DIM = "rgba(90, 239, 118, 0.35)";
const GREEN_GLOW = "rgba(90, 239, 118, 0.12)";
const NAVY_DARK = "#081a3a";

/* ── Shared wrapper: gradient border + dark panel + grid ── */
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #203a7f 0%, #7b2d8e 50%, #c74080 100%)",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: NAVY_DARK,
          borderRadius: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid */}
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={`v${i}`}
            style={{
              position: "absolute",
              left: `${i * 90}px`,
              top: 0,
              width: "1px",
              height: "100%",
              background: GREEN,
              opacity: 0.05,
              display: "flex",
            }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`h${i}`}
            style={{
              position: "absolute",
              top: `${i * 90}px`,
              left: 0,
              height: "1px",
              width: "100%",
              background: GREEN,
              opacity: 0.05,
              display: "flex",
            }}
          />
        ))}
        {children}
      </div>
    </div>
  );
}

/* ── Reusable small elements ── */
function Dot({ x, y, size = 6 }: { x: number; y: number; size?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: GREEN_DIM,
        display: "flex",
      }}
    />
  );
}

function HLine({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: 2,
        background: GREEN_DIM,
        display: "flex",
      }}
    />
  );
}

function VLine({ x, y, h }: { x: number; y: number; h: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 2,
        height: h,
        background: GREEN_DIM,
        display: "flex",
      }}
    />
  );
}

function GlowCircle({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: GREEN_GLOW,
        display: "flex",
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════
   LAYOUT COMPOSITIONS — each is a unique visual arrangement
   ══════════════════════════════════════════════════════════════ */

/* Layout A: Large document left + chart right with connecting flow arrow */
function LayoutInvoiceDocument() {
  return (
    <Shell>
      <GlowCircle x={340} y={300} size={280} />
      {/* Large invoice doc */}
      <div style={{ position: "absolute", left: 240, top: 80, display: "flex" }}>
        <svg width="220" height="280" viewBox="0 0 220 280" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Doc body */}
          <rect x="10" y="10" width="160" height="260" rx="8" />
          {/* Header area */}
          <rect x="30" y="30" width="80" height="12" rx="2" opacity="0.5" />
          <rect x="30" y="52" width="120" height="8" rx="2" opacity="0.3" />
          {/* Separator */}
          <line x1="30" y1="75" x2="150" y2="75" opacity="0.3" />
          {/* Line items */}
          <rect x="30" y="90" width="100" height="6" rx="2" opacity="0.3" />
          <rect x="140" y="90" width="20" height="6" rx="2" opacity="0.5" />
          <rect x="30" y="108" width="80" height="6" rx="2" opacity="0.3" />
          <rect x="140" y="108" width="20" height="6" rx="2" opacity="0.5" />
          <rect x="30" y="126" width="90" height="6" rx="2" opacity="0.3" />
          <rect x="140" y="126" width="20" height="6" rx="2" opacity="0.5" />
          <rect x="30" y="144" width="70" height="6" rx="2" opacity="0.3" />
          <rect x="140" y="144" width="20" height="6" rx="2" opacity="0.5" />
          {/* Total line */}
          <line x1="30" y1="168" x2="150" y2="168" />
          <rect x="30" y="180" width="50" height="10" rx="2" />
          <rect x="120" y="180" width="40" height="10" rx="2" />
          {/* Checkmark */}
          <circle cx="90" cy="230" r="22" strokeWidth="3" />
          <polyline points="78,230 86,240 104,220" strokeWidth="3" />
        </svg>
      </div>

      {/* Flow arrow */}
      <HLine x={480} y={240} w={100} />
      <Dot x={477} y={237} />
      <div style={{ position: "absolute", left: 578, top: 232, display: "flex" }}>
        <svg width="20" height="16" viewBox="0 0 20 16" fill={GREEN_DIM}><path d="M0 8 L16 0 L16 16 Z" /></svg>
      </div>

      {/* Dollar sign destination */}
      <div style={{ position: "absolute", left: 620, top: 160, display: "flex" }}>
        <svg width="160" height="160" viewBox="0 0 80 80" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="40" cy="40" r="34" />
          <circle cx="40" cy="40" r="28" opacity="0.3" />
          <line x1="40" y1="14" x2="40" y2="66" opacity="0.4" />
          <path d="M30 30 C30 24, 50 24, 50 30 C50 38, 30 38, 30 46 C30 54, 50 54, 50 46" strokeWidth="2.5" />
        </svg>
      </div>

      {/* Small accent icons */}
      <Dot x={750} y={120} size={8} />
      <Dot x={820} y={160} size={5} />
      <Dot x={200} y={450} size={5} />
    </Shell>
  );
}

/* Layout B: Large line chart center with upward trend, clock + gear accents */
function LayoutChartTrend() {
  return (
    <Shell>
      <GlowCircle x={590} y={310} size={320} />
      {/* Large chart */}
      <div style={{ position: "absolute", left: 260, top: 80, display: "flex" }}>
        <svg width="480" height="340" viewBox="0 0 480 340" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Chart frame */}
          <rect x="40" y="20" width="400" height="280" rx="8" opacity="0.3" />
          {/* Y axis */}
          <line x1="80" y1="40" x2="80" y2="280" opacity="0.4" />
          {/* X axis */}
          <line x1="80" y1="280" x2="420" y2="280" opacity="0.4" />
          {/* Grid lines */}
          <line x1="80" y1="200" x2="420" y2="200" opacity="0.1" />
          <line x1="80" y1="140" x2="420" y2="140" opacity="0.1" />
          <line x1="80" y1="80" x2="420" y2="80" opacity="0.1" />
          {/* Trend line going UP */}
          <polyline points="80,260 140,240 200,220 260,180 320,120 380,70 420,50" strokeWidth="3" />
          {/* Data points */}
          <circle cx="140" cy="240" r="5" fill={GREEN} />
          <circle cx="200" cy="220" r="5" fill={GREEN} />
          <circle cx="260" cy="180" r="5" fill={GREEN} />
          <circle cx="320" cy="120" r="5" fill={GREEN} />
          <circle cx="380" cy="70" r="5" fill={GREEN} />
          {/* Arrow at end */}
          <polyline points="410,42 420,50 412,60" strokeWidth="2" />
        </svg>
      </div>

      {/* Clock icon - top left accent */}
      <div style={{ position: "absolute", left: 100, top: 100, display: "flex", opacity: 0.5 }}>
        <svg width="90" height="90" viewBox="0 0 80 80" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round">
          <circle cx="40" cy="40" r="28" />
          <line x1="40" y1="40" x2="40" y2="22" />
          <line x1="40" y1="40" x2="54" y2="40" />
          <circle cx="40" cy="40" r="3" fill={GREEN} />
        </svg>
      </div>

      {/* Target icon - bottom right */}
      <div style={{ position: "absolute", left: 800, top: 380, display: "flex", opacity: 0.4 }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round">
          <circle cx="40" cy="40" r="24" />
          <circle cx="40" cy="40" r="14" />
          <circle cx="40" cy="40" r="4" fill={GREEN} />
        </svg>
      </div>

      <Dot x={160} y={420} size={6} />
      <Dot x={900} y={120} size={5} />
    </Shell>
  );
}

/* Layout C: Flow diagram — 3 nodes connected by arrows in a pipeline */
function LayoutFlowPipeline() {
  return (
    <Shell>
      <GlowCircle x={590} y={300} size={240} />
      {/* Node 1: Email envelope */}
      <div style={{ position: "absolute", left: 130, top: 170, display: "flex" }}>
        <svg width="160" height="140" viewBox="0 0 80 70" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="8" width="72" height="50" rx="6" />
          <polyline points="4,12 40,40 76,12" />
          <line x1="4" y1="54" x2="24" y2="34" opacity="0.4" />
          <line x1="76" y1="54" x2="56" y2="34" opacity="0.4" />
          {/* notification dot */}
          <circle cx="68" cy="14" r="6" fill={GREEN} opacity="0.6" />
        </svg>
      </div>

      {/* Arrow 1 */}
      <HLine x={300} y={250} w={80} />
      <Dot x={297} y={247} />
      <div style={{ position: "absolute", left: 378, top: 242, display: "flex" }}>
        <svg width="20" height="16" viewBox="0 0 20 16" fill={GREEN_DIM}><path d="M0 8 L16 0 L16 16 Z" /></svg>
      </div>

      {/* Node 2: SMS chat bubble */}
      <div style={{ position: "absolute", left: 420, top: 155, display: "flex" }}>
        <svg width="160" height="160" viewBox="0 0 80 80" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 12 L72 12 L72 52 L44 52 L30 66 L30 52 L8 52 Z" />
          {/* Text lines inside */}
          <rect x="18" y="24" width="36" height="4" rx="1" opacity="0.4" />
          <rect x="18" y="34" width="28" height="4" rx="1" opacity="0.3" />
          <rect x="18" y="44" width="16" height="4" rx="1" opacity="0.2" />
          {/* Typing dots */}
          <circle cx="52" cy="40" r="2" fill={GREEN} opacity="0.5" />
          <circle cx="58" cy="40" r="2" fill={GREEN} opacity="0.5" />
          <circle cx="64" cy="40" r="2" fill={GREEN} opacity="0.5" />
        </svg>
      </div>

      {/* Arrow 2 */}
      <HLine x={590} y={250} w={80} />
      <Dot x={587} y={247} />
      <div style={{ position: "absolute", left: 668, top: 242, display: "flex" }}>
        <svg width="20" height="16" viewBox="0 0 20 16" fill={GREEN_DIM}><path d="M0 8 L16 0 L16 16 Z" /></svg>
      </div>

      {/* Node 3: Phone with notification */}
      <div style={{ position: "absolute", left: 710, top: 155, display: "flex" }}>
        <svg width="140" height="170" viewBox="0 0 70 85" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="4" width="44" height="76" rx="8" />
          <line x1="24" y1="12" x2="40" y2="12" />
          <circle cx="32" cy="70" r="4" />
          {/* Screen content */}
          <rect x="16" y="20" width="32" height="40" rx="3" opacity="0.3" />
          {/* Bars on screen */}
          <rect x="20" y="42" width="6" height="14" rx="1" opacity="0.5" />
          <rect x="28" y="36" width="6" height="20" rx="1" opacity="0.5" />
          <rect x="36" y="30" width="6" height="26" rx="1" opacity="0.5" />
          {/* Ring waves */}
          <path d="M58 16 C64 10, 64 28, 58 22" opacity="0.4" />
          <path d="M62 12 C70 4, 70 32, 62 24" opacity="0.25" />
        </svg>
      </div>

      {/* Accent dots */}
      <Dot x={100} y={400} size={5} />
      <Dot x={900} y={130} size={6} />
      <Dot x={120} y={130} size={4} />
    </Shell>
  );
}

/* Layout D: Dashboard monitor with charts — large dominant element */
function LayoutDashboard() {
  return (
    <Shell>
      <GlowCircle x={590} y={280} size={350} />
      {/* Monitor frame */}
      <div style={{ position: "absolute", left: 230, top: 60, display: "flex" }}>
        <svg width="540" height="420" viewBox="0 0 540 420" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Monitor body */}
          <rect x="20" y="20" width="500" height="310" rx="12" />
          {/* Screen bezel */}
          <rect x="40" y="40" width="460" height="270" rx="6" opacity="0.3" />
          {/* Stand */}
          <line x1="220" y1="330" x2="200" y2="390" />
          <line x1="320" y1="330" x2="340" y2="390" />
          <line x1="170" y1="390" x2="370" y2="390" />

          {/* Dashboard widgets inside screen */}
          {/* Bar chart widget */}
          <rect x="60" y="60" width="200" height="110" rx="4" opacity="0.15" />
          <rect x="80" y="120" width="16" height="40" rx="2" opacity="0.6" />
          <rect x="104" y="100" width="16" height="60" rx="2" opacity="0.6" />
          <rect x="128" y="84" width="16" height="76" rx="2" opacity="0.6" />
          <rect x="152" y="108" width="16" height="52" rx="2" opacity="0.6" />
          <rect x="176" y="76" width="16" height="84" rx="2" />
          <rect x="200" y="90" width="16" height="70" rx="2" opacity="0.6" />

          {/* Line chart widget */}
          <rect x="280" y="60" width="200" height="110" rx="4" opacity="0.15" />
          <polyline points="300,140 330,120 360,130 390,90 420,80 450,70" strokeWidth="2" />
          <circle cx="390" cy="90" r="3" fill={GREEN} />
          <circle cx="450" cy="70" r="3" fill={GREEN} />

          {/* Metric cards bottom */}
          <rect x="60" y="190" width="130" height="50" rx="4" opacity="0.15" />
          <circle cx="90" cy="215" r="12" opacity="0.4" />
          <rect x="110" y="205" width="60" height="8" rx="2" opacity="0.4" />
          <rect x="110" y="218" width="40" height="6" rx="2" opacity="0.25" />

          <rect x="210" y="190" width="130" height="50" rx="4" opacity="0.15" />
          <circle cx="240" cy="215" r="12" opacity="0.4" />
          <rect x="260" y="205" width="60" height="8" rx="2" opacity="0.4" />
          <rect x="260" y="218" width="40" height="6" rx="2" opacity="0.25" />

          <rect x="360" y="190" width="120" height="50" rx="4" opacity="0.15" />
          <circle cx="390" cy="215" r="12" opacity="0.4" />
          <rect x="410" y="205" width="50" height="8" rx="2" opacity="0.4" />
          <rect x="410" y="218" width="30" height="6" rx="2" opacity="0.25" />

          {/* Donut in one metric */}
          <circle cx="90" cy="215" r="10" strokeWidth="3" opacity="0.5" />
          <circle cx="240" cy="215" r="10" strokeWidth="3" opacity="0.5" />
        </svg>
      </div>

      {/* Accent elements */}
      <Dot x={130} y={140} size={6} />
      <Dot x={880} y={400} size={5} />
      <Dot x={160} y={460} size={4} />
    </Shell>
  );
}

/* Layout E: Warning triangle large + clock + dollar — overdue invoices theme */
function LayoutWarningOverdue() {
  return (
    <Shell>
      <GlowCircle x={440} y={290} size={300} />
      {/* Large warning triangle */}
      <div style={{ position: "absolute", left: 280, top: 70, display: "flex" }}>
        <svg width="280" height="260" viewBox="0 0 280 260" fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M140 20 L270 240 L10 240 Z" />
          <line x1="140" y1="90" x2="140" y2="170" strokeWidth="4" />
          <circle cx="140" cy="200" r="8" fill={GREEN} />
        </svg>
      </div>

      {/* Clock - right side */}
      <div style={{ position: "absolute", left: 650, top: 110, display: "flex", opacity: 0.6 }}>
        <svg width="140" height="140" viewBox="0 0 80 80" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round">
          <circle cx="40" cy="40" r="32" />
          <line x1="40" y1="40" x2="40" y2="18" />
          <line x1="40" y1="40" x2="58" y2="40" />
          <circle cx="40" cy="40" r="3" fill={GREEN} />
          <line x1="40" y1="10" x2="40" y2="14" opacity="0.5" />
          <line x1="40" y1="66" x2="40" y2="70" opacity="0.5" />
          <line x1="10" y1="40" x2="14" y2="40" opacity="0.5" />
          <line x1="66" y1="40" x2="70" y2="40" opacity="0.5" />
        </svg>
      </div>

      {/* Broken dollar - bottom right */}
      <div style={{ position: "absolute", left: 700, top: 330, display: "flex", opacity: 0.4 }}>
        <svg width="100" height="100" viewBox="0 0 80 80" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round">
          <circle cx="40" cy="40" r="28" strokeDasharray="8 4" />
          <path d="M30 30 C30 24, 50 24, 50 30 C50 38, 30 38, 30 46 C30 54, 50 54, 50 46" />
        </svg>
      </div>

      {/* Stack of docs - left */}
      <div style={{ position: "absolute", left: 100, top: 180, display: "flex", opacity: 0.45 }}>
        <svg width="130" height="170" viewBox="0 0 65 85" fill="none" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round">
          {/* Back doc */}
          <rect x="12" y="4" width="48" height="60" rx="3" opacity="0.3" />
          {/* Middle doc */}
          <rect x="6" y="10" width="48" height="60" rx="3" opacity="0.5" />
          {/* Front doc */}
          <rect x="0" y="16" width="48" height="60" rx="3" />
          <line x1="10" y1="30" x2="38" y2="30" opacity="0.5" />
          <line x1="10" y1="38" x2="38" y2="38" opacity="0.4" />
          <line x1="10" y1="46" x2="28" y2="46" opacity="0.3" />
          <line x1="10" y1="54" x2="34" y2="54" opacity="0.4" />
          {/* Red X on front */}
          <line x1="28" y1="60" x2="40" y2="72" strokeWidth="2" />
          <line x1="40" y1="60" x2="28" y2="72" strokeWidth="2" />
        </svg>
      </div>

      <HLine x={230} y={340} w={60} />
      <Dot x={227} y={337} />
      <Dot x={880} y={200} size={5} />
      <Dot x={160} y={120} size={4} />
    </Shell>
  );
}

/* Layout F: Two systems with sync arrows — integration theme */
function LayoutIntegration() {
  return (
    <Shell>
      <GlowCircle x={590} y={300} size={260} />
      {/* Left system — database/stack */}
      <div style={{ position: "absolute", left: 140, top: 130, display: "flex" }}>
        <svg width="200" height="220" viewBox="0 0 100 110" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="50" cy="18" rx="40" ry="14" />
          <path d="M10 18 L10 90 C10 98, 50 104, 90 90 L90 18" />
          <path d="M10 40 C10 48, 50 54, 90 40" opacity="0.4" />
          <path d="M10 62 C10 70, 50 76, 90 62" opacity="0.4" />
          {/* Data rows */}
          <rect x="22" y="26" width="20" height="4" rx="1" opacity="0.3" />
          <rect x="48" y="26" width="12" height="4" rx="1" opacity="0.3" />
        </svg>
      </div>

      {/* Sync arrows — bidirectional */}
      <div style={{ position: "absolute", left: 400, top: 200, display: "flex" }}>
        <svg width="200" height="100" viewBox="0 0 200 100" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Top arrow right */}
          <line x1="10" y1="30" x2="170" y2="30" />
          <polyline points="160,20 170,30 160,40" />
          {/* Bottom arrow left */}
          <line x1="30" y1="70" x2="190" y2="70" />
          <polyline points="40,60 30,70 40,80" />
          {/* Dots on lines */}
          <circle cx="60" cy="30" r="3" fill={GREEN} opacity="0.5" />
          <circle cx="100" cy="30" r="3" fill={GREEN} opacity="0.5" />
          <circle cx="140" cy="30" r="3" fill={GREEN} opacity="0.5" />
          <circle cx="80" cy="70" r="3" fill={GREEN} opacity="0.5" />
          <circle cx="120" cy="70" r="3" fill={GREEN} opacity="0.5" />
          <circle cx="160" cy="70" r="3" fill={GREEN} opacity="0.5" />
        </svg>
      </div>

      {/* Right system — gear/app */}
      <div style={{ position: "absolute", left: 660, top: 120, display: "flex" }}>
        <svg width="200" height="240" viewBox="0 0 100 120" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* App window */}
          <rect x="5" y="5" width="90" height="110" rx="8" />
          {/* Title bar */}
          <line x1="5" y1="24" x2="95" y2="24" opacity="0.4" />
          <circle cx="18" cy="14" r="3" opacity="0.4" />
          <circle cx="28" cy="14" r="3" opacity="0.4" />
          <circle cx="38" cy="14" r="3" opacity="0.4" />
          {/* Content area — list items */}
          <rect x="15" y="34" width="70" height="10" rx="2" opacity="0.2" />
          <rect x="15" y="50" width="70" height="10" rx="2" opacity="0.2" />
          <rect x="15" y="66" width="70" height="10" rx="2" opacity="0.2" />
          <rect x="15" y="82" width="70" height="10" rx="2" opacity="0.2" />
          {/* Checkmarks */}
          <polyline points="20,39 22,41 26,37" opacity="0.6" strokeWidth="1.5" />
          <polyline points="20,55 22,57 26,53" opacity="0.6" strokeWidth="1.5" />
          <polyline points="20,71 22,73 26,69" opacity="0.6" strokeWidth="1.5" />
        </svg>
      </div>

      <Dot x={110} y={420} size={5} />
      <Dot x={900} y={130} size={6} />
    </Shell>
  );
}

/* Layout G: Large gear with automation sparks — automation/CFO theme */
function LayoutAutomationGear() {
  return (
    <Shell>
      <GlowCircle x={500} y={300} size={340} />
      {/* Large central gear */}
      <div style={{ position: "absolute", left: 330, top: 80, display: "flex" }}>
        <svg width="320" height="320" viewBox="0 0 160 160" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Outer gear teeth */}
          <circle cx="80" cy="80" r="50" />
          <circle cx="80" cy="80" r="24" />
          {/* Teeth */}
          <rect x="74" y="18" width="12" height="18" rx="2" />
          <rect x="74" y="124" width="12" height="18" rx="2" />
          <rect x="18" y="74" width="18" height="12" rx="2" />
          <rect x="124" y="74" width="18" height="12" rx="2" />
          {/* Diagonal teeth */}
          <rect x="38" y="30" width="12" height="16" rx="2" transform="rotate(45 44 38)" />
          <rect x="110" y="30" width="12" height="16" rx="2" transform="rotate(-45 116 38)" />
          <rect x="38" y="114" width="12" height="16" rx="2" transform="rotate(-45 44 122)" />
          <rect x="110" y="114" width="12" height="16" rx="2" transform="rotate(45 116 122)" />
          {/* Center bolt */}
          <circle cx="80" cy="80" r="8" fill={GREEN} opacity="0.3" />
        </svg>
      </div>

      {/* Lightning bolts around gear */}
      <div style={{ position: "absolute", left: 680, top: 120, display: "flex", opacity: 0.6 }}>
        <svg width="80" height="100" viewBox="0 0 40 50" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round">
          <path d="M24 2 L12 22 L20 22 L16 38 L28 18 L20 18 Z" />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 220, top: 350, display: "flex", opacity: 0.45 }}>
        <svg width="60" height="75" viewBox="0 0 40 50" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round">
          <path d="M24 2 L12 22 L20 22 L16 38 L28 18 L20 18 Z" />
        </svg>
      </div>

      {/* Small chart accent - top left */}
      <div style={{ position: "absolute", left: 100, top: 100, display: "flex", opacity: 0.35 }}>
        <svg width="120" height="100" viewBox="0 0 60 50" fill="none" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round">
          <rect x="4" y="4" width="52" height="42" rx="4" />
          <polyline points="12,36 22,28 32,32 42,18 50,14" />
        </svg>
      </div>

      {/* Users icon - bottom right */}
      <div style={{ position: "absolute", left: 780, top: 360, display: "flex", opacity: 0.35 }}>
        <svg width="100" height="80" viewBox="0 0 80 60" fill="none" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round">
          <circle cx="30" cy="18" r="10" />
          <path d="M12 52 C12 38, 48 38, 48 52" />
          <circle cx="54" cy="14" r="8" opacity="0.6" />
          <path d="M50 52 C50 40, 70 40, 70 52" opacity="0.6" />
        </svg>
      </div>

      <Dot x={150} y={450} size={5} />
      <Dot x={900} y={200} size={4} />
    </Shell>
  );
}

/* Layout H: Bar chart comparison — side by side bars */
function LayoutComparison() {
  return (
    <Shell>
      <GlowCircle x={590} y={300} size={300} />
      {/* Large comparison chart */}
      <div style={{ position: "absolute", left: 200, top: 70, display: "flex" }}>
        <svg width="600" height="380" viewBox="0 0 600 380" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Chart frame */}
          <rect x="40" y="20" width="520" height="320" rx="10" opacity="0.2" />
          {/* Y axis */}
          <line x1="90" y1="50" x2="90" y2="310" opacity="0.4" />
          {/* X axis */}
          <line x1="90" y1="310" x2="530" y2="310" opacity="0.4" />

          {/* Bar groups — paired bars */}
          {/* Group 1 */}
          <rect x="120" y="180" width="28" height="130" rx="3" opacity="0.4" />
          <rect x="152" y="120" width="28" height="190" rx="3" />
          {/* Group 2 */}
          <rect x="210" y="200" width="28" height="110" rx="3" opacity="0.4" />
          <rect x="242" y="100" width="28" height="210" rx="3" />
          {/* Group 3 */}
          <rect x="300" y="160" width="28" height="150" rx="3" opacity="0.4" />
          <rect x="332" y="80" width="28" height="230" rx="3" />
          {/* Group 4 */}
          <rect x="390" y="220" width="28" height="90" rx="3" opacity="0.4" />
          <rect x="422" y="140" width="28" height="170" rx="3" />
          {/* Group 5 */}
          <rect x="480" y="190" width="28" height="120" rx="3" opacity="0.4" />
          <rect x="512" y="70" width="28" height="240" rx="3" />

          {/* Trend line overlay */}
          <polyline points="136,180 224,200 314,160 404,220 494,190" opacity="0.3" strokeDasharray="6 4" />
          <polyline points="166,120 256,100 346,80 436,140 526,70" opacity="0.5" strokeDasharray="6 4" />
        </svg>
      </div>

      {/* Shield accent */}
      <div style={{ position: "absolute", left: 100, top: 130, display: "flex", opacity: 0.35 }}>
        <svg width="80" height="90" viewBox="0 0 80 90" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round">
          <path d="M40 8 L68 22 L68 46 C68 60, 40 72, 40 72 C40 72, 12 60, 12 46 L12 22 Z" />
          <polyline points="28,40 36,48 52,32" />
        </svg>
      </div>

      <Dot x={880} y={140} size={6} />
      <Dot x={140} y={440} size={5} />
    </Shell>
  );
}

/* ── Map: slug → layout ── */
type LayoutKey =
  | "invoice-doc"
  | "chart-trend"
  | "flow-pipeline"
  | "dashboard"
  | "warning-overdue"
  | "integration"
  | "automation-gear"
  | "comparison";

const LAYOUTS: Record<LayoutKey, () => React.ReactNode> = {
  "invoice-doc": LayoutInvoiceDocument,
  "chart-trend": LayoutChartTrend,
  "flow-pipeline": LayoutFlowPipeline,
  dashboard: LayoutDashboard,
  "warning-overdue": LayoutWarningOverdue,
  integration: LayoutIntegration,
  "automation-gear": LayoutAutomationGear,
  comparison: LayoutComparison,
};

/* Map specific posts to specific layouts for maximum variety */
const SLUG_LAYOUT: Record<string, LayoutKey> = {
  // Comparisons
  "best-ar-automation-software": "comparison",
  "best-quickbooks-ar-integration": "integration",
  // Guides
  "how-to-reduce-dso": "chart-trend",
  "cash-collections-formula": "dashboard",
  "when-to-send-invoices-to-collections": "warning-overdue",
  // Insights
  "multi-channel-payment-chasing": "flow-pipeline",
  "cfo-role-automation": "automation-gear",
  "manual-ar-hidden-revenue-drain": "invoice-doc",
};

/* Fallback: pick layout based on tag/category heuristic */
const TAG_LAYOUT: Record<string, LayoutKey> = {
  invoice: "invoice-doc",
  "ar automation": "automation-gear",
  automation: "automation-gear",
  dso: "chart-trend",
  "cash flow": "chart-trend",
  collections: "warning-overdue",
  "multi-channel": "flow-pipeline",
  sms: "flow-pipeline",
  "payment reminders": "flow-pipeline",
  quickbooks: "integration",
  xero: "integration",
  integration: "integration",
  comparison: "comparison",
  software: "comparison",
  cfo: "dashboard",
  benchmarks: "dashboard",
  forecasting: "dashboard",
};

const CATEGORY_LAYOUT: Record<string, LayoutKey> = {
  guides: "chart-trend",
  insights: "automation-gear",
  comparisons: "comparison",
};

function pickLayout(
  slug: string,
  tags: string[],
  category: string
): LayoutKey {
  // 1. Explicit slug mapping
  if (SLUG_LAYOUT[slug]) return SLUG_LAYOUT[slug];

  // 2. Tag-based
  for (const tag of tags) {
    const lower = tag.toLowerCase();
    for (const [key, layout] of Object.entries(TAG_LAYOUT)) {
      if (lower.includes(key) || key.includes(lower)) return layout;
    }
  }

  // 3. Category fallback
  return CATEGORY_LAYOUT[category] || "chart-trend";
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "Yonovo Blog";
  const category = searchParams.get("category") || "guides";
  const tagsParam = searchParams.get("tags") || "";
  const slug = searchParams.get("slug") || "";
  const tags = tagsParam ? tagsParam.split(",") : [title];

  const layoutKey = pickLayout(slug, tags, category);
  const LayoutComponent = LAYOUTS[layoutKey];

  return new ImageResponse(<LayoutComponent />, {
    width: 1200,
    height: 630,
  });
}
