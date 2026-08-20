import Image from "next/image";

/**
 * The five code-animated panels behind the homepage "How it works" section.
 *
 * Each panel is mounted only while its step is active — mounting is what restarts
 * the CSS build-in animations, so these must never be kept in the DOM behind a
 * visibility toggle. Every animation is written as a literal Tailwind arbitrary
 * shorthand (`animate-[name_duration_delay_both_easing]`) so the class survives
 * Tailwind's source scan and the delay can't be lost to utility ordering.
 *
 * Keyframes and the reduced-motion opt-out live in globals.css.
 */

/* ── Shared primitives ── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-[yv-fade_.4s_both] font-medium text-[11px] text-muted uppercase tracking-[.09em]">
      {children}
    </div>
  );
}

/** Dot + line + optional muted evidence line, used by the reasoning panels. */
function Finding({
  dotClass,
  title,
  meta,
  metaClass,
  titleSize = "text-[13px]",
  metaSize = "text-[12px]",
  gapClass = "gap-[9px]",
  className,
}: {
  dotClass: string;
  title: string;
  meta: string;
  /** Animation class for the evidence line, when it fades in after the row. */
  metaClass?: string;
  titleSize?: string;
  metaSize?: string;
  gapClass?: string;
  className: string;
}) {
  return (
    <div className={`flex ${gapClass} ${className}`}>
      <span className={`mt-[5px] size-[5px] rounded-full ${dotClass}`} />
      <div className="flex flex-col gap-px">
        <span className={`${titleSize} text-foreground leading-[1.4]`}>{title}</span>
        <span className={`${metaSize} text-muted leading-[1.4] ${metaClass ?? ""}`}>{meta}</span>
      </div>
    </div>
  );
}

/** Red dot + uppercase "Yonovo recommends / suggests" label. */
function AgentLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="size-1.5 rounded-full bg-brand-red" />
      <span className="whitespace-nowrap font-medium text-[11px] text-secondary uppercase tracking-[.06em]">
        {children}
      </span>
    </div>
  );
}

/** Navy primary + ghost secondary, as they appear inside the mock cards. */
function ActionButtons({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <div className="flex gap-2">
      <span className="whitespace-nowrap rounded-md bg-brand-navy px-[15px] py-[7px] font-medium text-[13px] text-white">
        {primary}
      </span>
      <span className="whitespace-nowrap rounded-md border border-border bg-background px-[15px] py-[7px] font-medium text-[13px] text-secondary">
        {secondary}
      </span>
    </div>
  );
}

const PANEL_BASE =
  "relative flex flex-col justify-center px-6 pt-[22px] pb-[74px] [&_*]:shrink-0 lg:absolute lg:inset-0";

/* ── 01 · Connect your books ── */

const INTEGRATIONS = [
  { name: "Xero", src: "/logos/xero.png", rounded: true, delay: "animate-[yv-pop_.45s_.13s_both_cubic-bezier(.2,.8,.2,1)]" },
  { name: "NetSuite", src: "/logos/netsuite-icon.svg", rounded: false, delay: "animate-[yv-pop_.45s_.21s_both_cubic-bezier(.2,.8,.2,1)]" },
  { name: "Sage", src: "/logos/sage-icon.svg", rounded: false, delay: "animate-[yv-pop_.45s_.29s_both_cubic-bezier(.2,.8,.2,1)]" },
  { name: "FreshBooks", src: "/logos/freshbooks-icon.png", rounded: true, delay: "animate-[yv-pop_.45s_.45s_both_cubic-bezier(.2,.8,.2,1)]" },
  { name: "Odoo", src: "/logos/odoo-icon.svg", rounded: true, delay: "animate-[yv-pop_.45s_.53s_both_cubic-bezier(.2,.8,.2,1)]" },
  { name: "SAP", src: "/logos/sap-icon.svg", rounded: true, delay: "animate-[yv-pop_.45s_.61s_both_cubic-bezier(.2,.8,.2,1)]" },
];

const LEDGER_ROWS = [
  { label: "Open invoices", value: "1,248", anim: "animate-[yv-drop_.45s_.8s_both]" },
  { label: "Customers", value: "312", anim: "animate-[yv-drop_.45s_1.15s_both]" },
  { label: "Outstanding", value: "$2.41M", anim: "animate-[yv-drop_.45s_1.5s_both]" },
];

export function ConnectPanel() {
  return (
    <div data-yv-panel className={`${PANEL_BASE} gap-3.5`}>
      <Eyebrow>Your books, or a CSV</Eyebrow>

      <div className="flex flex-wrap gap-2">
        {/* QuickBooks is the connected one — navy border and a success label. */}
        <div className="inline-flex animate-[yv-pop_.45s_.05s_both_cubic-bezier(.2,.8,.2,1)] items-center gap-1.5 rounded-full border border-brand-navy bg-background py-[5px] pr-[11px] pl-1.5">
          <Image src="/logos/quickbooks-icon.png" alt="" width={17} height={17} className="size-[17px] rounded-full object-contain" />
          <span className="whitespace-nowrap font-medium text-[12px] text-foreground">QuickBooks</span>
          <span className="inline-flex animate-[yv-fade_.4s_1.1s_both] items-center gap-1 font-medium text-[11px] text-status-success">
            <span className="size-[5px] rounded-full bg-status-success" />
            Connected
          </span>
        </div>

        {INTEGRATIONS.map((it) => (
          <div
            key={it.name}
            className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-background py-[5px] pr-[11px] pl-1.5 ${it.delay}`}
          >
            <Image
              src={it.src}
              alt=""
              width={17}
              height={17}
              className={`size-[17px] object-contain ${it.rounded ? "rounded-full" : ""}`}
            />
            <span className="whitespace-nowrap text-[12px] text-secondary">{it.name}</span>
          </div>
        ))}

        <div className="inline-flex animate-[yv-pop_.45s_.69s_both_cubic-bezier(.2,.8,.2,1)] items-center gap-1.5 rounded-full border border-border border-dashed bg-background py-[5px] pr-[11px] pl-1.5">
          <span className="inline-flex size-[17px] items-center justify-center rounded-[5px] bg-surface text-secondary">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
              <line x1="9" y1="3" x2="9" y2="21" />
              <line x1="15" y1="3" x2="15" y2="21" />
            </svg>
          </span>
          <span className="whitespace-nowrap text-[12px] text-secondary">CSV upload</span>
        </div>
      </div>

      <div className="animate-[yv-rise_.5s_.55s_both_cubic-bezier(.2,.7,.2,1)] overflow-hidden rounded-2xl border border-border bg-background">
        <div className="flex items-center justify-between border-border border-b px-4 py-3">
          <span className="font-medium text-[14px] text-foreground">Importing your ledger</span>
          <span className="inline-flex animate-[yv-fade_.4s_2.3s_both] items-center rounded-full bg-status-success-bg px-2.5 py-1 font-medium text-[12px] text-status-success">
            Complete
          </span>
        </div>
        <div className="flex flex-col">
          {LEDGER_ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center justify-between px-4 py-2.5 ${row.anim} ${i < LEDGER_ROWS.length - 1 ? "border-border border-b" : ""}`}
            >
              <span className="text-[14px] text-secondary">{row.label}</span>
              <span className="font-medium text-[15px] text-foreground">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 02 · Set your rules or let AI decide ── */

export function RulesPanel() {
  return (
    <div data-yv-panel className={`${PANEL_BASE} gap-3`}>
      <Eyebrow>Analyzing · Acme Manufacturing</Eyebrow>

      <div className="flex animate-[yv-rise_.5s_.08s_both_cubic-bezier(.2,.7,.2,1)] flex-col gap-3 rounded-2xl border border-border bg-background px-4 py-3.5">
        <div className="flex items-center gap-2">
          {/* Tighter crop than /yonovo-icon.png, which is too padded to read at 18px. */}
          <Image src="/logos/yonovo-mark.png" alt="" width={18} height={18} className="size-[18px] object-contain" />
          <span className="font-medium text-[13px] text-foreground">How Acme actually pays</span>
          <span className="size-[5px] animate-[yv-blink_1.1s_4_both] rounded-full bg-brand-red" />
        </div>

        <Finding
          dotClass="bg-brand-navy/35"
          title="Read 24 months of history"
          meta="Always pays, 6 days late"
          metaClass="animate-[yv-fade_.4s_.95s_both]"
          className="animate-[yv-drop_.45s_.5s_both]"
        />
        <Finding
          dotClass="bg-brand-navy/35"
          title="Checked which emails get replies"
          meta="Replies from AP, never billing@"
          metaClass="animate-[yv-fade_.4s_1.8s_both]"
          className="animate-[yv-drop_.45s_1.35s_both]"
        />
      </div>

      <div className="flex animate-[yv-rise_.5s_2.4s_both_cubic-bezier(.2,.7,.2,1)] flex-col gap-[11px] rounded-2xl border border-border bg-background px-4 py-3.5">
        <AgentLabel>Yonovo recommends</AgentLabel>
        <div className="flex flex-wrap gap-1.5">
          {["Day 3 · Email to AP", "Day 10 · Email + CC owner", "Day 21 · Your team"].map((chip) => (
            <span key={chip} className="whitespace-nowrap rounded-md bg-surface px-[9px] py-[5px] text-[12px] text-foreground">
              {chip}
            </span>
          ))}
        </div>
        <ActionButtons primary="Approve" secondary="Edit rules" />
      </div>
    </div>
  );
}

/* ── 03 · Yonovo learns and improves ── */

export function LearnsPanel() {
  return (
    <div data-yv-panel className={`${PANEL_BASE} gap-3`}>
      <Eyebrow>Email performance · last 90 days</Eyebrow>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex animate-[yv-rise_.5s_.1s_both_cubic-bezier(.2,.7,.2,1)] flex-col gap-2.5 rounded-2xl border border-border bg-background p-3.5">
          <div className="flex items-center gap-[7px]">
            <span className="size-1.5 rounded-full bg-status-success" />
            <span className="whitespace-nowrap font-medium text-[11px] text-secondary uppercase tracking-[.05em]">
              What&rsquo;s working
            </span>
          </div>
          <Finding
            dotClass="bg-status-success"
            title="Tuesday 9am sends"
            meta="Replies peak that morning"
            titleSize="text-[12.5px]"
            metaSize="text-[11.5px]"
            gapClass="gap-2"
            className="animate-[yv-drop_.45s_.45s_both]"
          />
          <Finding
            dotClass="bg-status-success"
            title="Invoice PDF attached"
            meta="Paid twice as fast"
            titleSize="text-[12.5px]"
            metaSize="text-[11.5px]"
            gapClass="gap-2"
            className="animate-[yv-drop_.45s_.75s_both]"
          />
        </div>

        <div className="flex animate-[yv-rise_.5s_.25s_both_cubic-bezier(.2,.7,.2,1)] flex-col gap-2.5 rounded-2xl border border-border bg-background p-3.5">
          <div className="flex items-center gap-[7px]">
            <span className="size-1.5 rounded-full bg-status-amber-dot" />
            <span className="whitespace-nowrap font-medium text-[11px] text-secondary uppercase tracking-[.05em]">
              Room to improve
            </span>
          </div>
          <Finding
            dotClass="bg-status-amber-dot"
            title="Generic subject lines"
            meta="Opened, then left unpaid"
            titleSize="text-[12.5px]"
            metaSize="text-[11.5px]"
            gapClass="gap-2"
            className="animate-[yv-drop_.45s_1.05s_both]"
          />
          <Finding
            dotClass="bg-status-amber-dot"
            title="34 silent accounts"
            meta="No reply in three emails"
            titleSize="text-[12.5px]"
            metaSize="text-[11.5px]"
            gapClass="gap-2"
            className="animate-[yv-drop_.45s_1.35s_both]"
          />
        </div>
      </div>

      <div className="flex animate-[yv-rise_.5s_1.85s_both_cubic-bezier(.2,.7,.2,1)] flex-col gap-[11px] rounded-2xl border border-border bg-background px-4 py-3.5">
        <AgentLabel>Yonovo suggests</AgentLabel>
        <div className="text-[13.5px] text-foreground leading-[1.45] text-pretty">
          Put the amount and due date in the subject line, and re-send to the 34 silent accounts Tuesday 9am.
        </div>
        <ActionButtons primary="Approve change" secondary="Not now" />
      </div>
    </div>
  );
}

/* ── 04 · Escalate what needs a human ── */

export function EscalatePanel() {
  return (
    <div data-yv-panel className={`${PANEL_BASE} gap-2.5`}>
      <Eyebrow>Conversation · Northwind Supply · Invoice 4471</Eyebrow>

      <div className="max-w-[86%] animate-[yv-rise_.5s_.25s_both_cubic-bezier(.2,.7,.2,1)] self-start rounded-[16px_16px_16px_6px] border border-border bg-background px-3.5 py-3">
        <div className="mb-1.5 font-medium text-[11px] text-brand-navy uppercase tracking-[.06em]">Yonovo</div>
        <div className="text-[14px] text-foreground leading-[1.55]">
          Invoice 4471 for $18,400 is 12 days past due. Here&rsquo;s a payment link, or reply if timing needs to change.
        </div>
      </div>

      <div className="max-w-[86%] animate-[yv-rise_.5s_1.1s_both_cubic-bezier(.2,.7,.2,1)] self-end rounded-[16px_16px_6px_16px] border border-brand-navy/12 bg-brand-navy/5 px-3.5 py-3">
        <div className="mb-1.5 font-medium text-[11px] text-secondary uppercase tracking-[.06em]">
          Denise · Northwind Supply
        </div>
        <div className="text-[14px] text-foreground leading-[1.55]">
          We were billed twice for this shipment. I&rsquo;m not paying until someone looks at it.
        </div>
      </div>

      <div className="flex animate-[yv-pop_.5s_2.2s_both_cubic-bezier(.2,.8,.2,1)] flex-col gap-[9px] rounded-2xl border border-status-danger-border bg-status-danger-surface p-3.5">
        <div className="flex items-center justify-between">
          <span className="font-medium text-[14px] text-status-danger">Flagged for your team</span>
          <span className="rounded-full bg-status-danger-bg px-2.5 py-1 font-medium text-[12px] text-status-danger">
            Billing dispute
          </span>
        </div>
        <div className="text-[14px] text-secondary leading-[1.5] text-pretty">
          Sequence stopped. Assigned to Maya R. with the full thread and both charges attached.
        </div>
      </div>
    </div>
  );
}

/* ── 05 · Review your results ── */

const RESULT_STATS = [
  { value: "$412K", label: "Recovered", anim: "animate-[yv-rise_.5s_1.5s_both_cubic-bezier(.2,.7,.2,1)]" },
  { value: "80%", label: "Handled automatically", anim: "animate-[yv-rise_.5s_1.7s_both_cubic-bezier(.2,.7,.2,1)]" },
  { value: "6", label: "At-risk invoices flagged", anim: "animate-[yv-rise_.5s_1.9s_both_cubic-bezier(.2,.7,.2,1)]" },
  { value: "75%", label: "Fewer manual tasks", anim: "animate-[yv-rise_.5s_2.1s_both_cubic-bezier(.2,.7,.2,1)]" },
];

export function ResultsPanel() {
  return (
    <div data-yv-panel className={`${PANEL_BASE} gap-3.5`}>
      <Eyebrow>Your receivables · last 90 days</Eyebrow>

      <div className="flex animate-[yv-rise_.5s_.08s_both_cubic-bezier(.2,.7,.2,1)] flex-col gap-3 rounded-2xl border border-border bg-background p-4">
        <div className="flex items-baseline justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="whitespace-nowrap text-[13px] text-muted leading-[1.3]">Days sales outstanding</span>
            <span className="font-medium text-[30px] text-foreground leading-[1.15] tracking-[-0.02em]">38 days</span>
          </div>
          <span className="animate-[yv-fade_.4s_1.4s_both] whitespace-nowrap rounded-full bg-status-success-bg px-2.5 py-1 font-medium text-[12px] text-status-success">
            15 days faster
          </span>
        </div>
        <svg viewBox="0 0 320 90" preserveAspectRatio="none" className="h-[58px] w-full overflow-visible" aria-hidden="true">
          <line x1="0" y1="22" x2="320" y2="22" stroke="var(--color-chart-grid)" strokeWidth="1" />
          <line x1="0" y1="56" x2="320" y2="56" stroke="var(--color-chart-grid)" strokeWidth="1" />
          <line x1="0" y1="88" x2="320" y2="88" stroke="var(--color-chart-grid)" strokeWidth="1" />
          <polyline
            points="0,14 46,20 92,17 138,34 184,44 230,52 276,64 320,72"
            fill="none"
            stroke="var(--color-brand-navy)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="620"
            className="animate-[yv-draw_1.6s_.3s_both_cubic-bezier(.4,.1,.3,1)]"
          />
          <circle cx="320" cy="72" r="4" fill="var(--color-brand-navy)" className="animate-[yv-pop_.4s_1.7s_both]" />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {RESULT_STATS.map((stat) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-0.5 rounded-2xl border border-border bg-background px-3.5 py-3 ${stat.anim}`}
          >
            <span className="font-medium text-[24px] text-foreground leading-[1.15] tracking-[-0.02em]">{stat.value}</span>
            <span className="text-[13px] text-muted">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const PANELS = [ConnectPanel, RulesPanel, LearnsPanel, EscalatePanel, ResultsPanel];
