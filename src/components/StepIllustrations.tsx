/**
 * "How it works" step illustrations, ported from the "QuickBooks Step
 * Illustrations" design canvas. Steps 2 through 5; step 1 still uses its
 * existing screenshot.
 *
 * Each card is authored at 1200x900 (4:3). Every length goes through u(),
 * which converts design pixels to cqw against the square-ish container, so
 * the cards stay crisp at any size and need no measurement. These are static
 * server components: no client JS ships for them.
 *
 * They are aria-hidden because the step text sits next to them in the
 * timeline and already carries the meaning.
 */

import type { CSSProperties, ReactNode } from "react";

/* ── Units: design pixels on the 1200-wide card to container-relative lengths ── */

const u = (px: number) => `${(px / 1200) * 100}cqw`;

/* ── Palette ── */

const INK = "#0c2756";
const MUTED = "#71717a";
const FAINT = "#a1a1aa";
const ZINC = "#52525b";
const HAIR = "#e5e7eb";
const RED = "#e13f3f";
const GREEN = "#177a3c";
const GREEN_BG = "#eefbf1";

const dashed = `repeating-linear-gradient(#d4d4d8 0 ${u(8)}, transparent ${u(8)} ${u(16)})`;

/* ── Shared shell ── */

function Card({
  children,
  padding,
  gap,
}: {
  children: ReactNode;
  padding: string;
  gap: number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        containerType: "inline-size",
        aspectRatio: "4 / 3",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fff",
          border: `1px solid ${HAIR}`,
          borderRadius: u(24),
          boxSizing: "border-box",
          padding,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: u(gap),
          fontFamily: "inherit",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Pill({
  children,
  bg,
  color,
  fontSize,
  padding,
}: {
  children: ReactNode;
  bg: string;
  color: string;
  fontSize: number;
  padding: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: u(8),
        padding,
        borderRadius: "9999px",
        background: bg,
        color,
        fontSize: u(fontSize),
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}

function Dot({ size, color }: { size: number; color: string }) {
  return (
    <div
      style={{
        width: u(size),
        height: u(size),
        borderRadius: "9999px",
        background: color,
        flex: "none",
      }}
    />
  );
}

function Stroke({
  d,
  size = 38,
  color = RED,
  children,
}: {
  d?: string[];
  size?: number;
  color?: string;
  children?: ReactNode;
}) {
  return (
    <svg
      width={u(size)}
      height={u(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      {children ?? d?.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

const numeral = (fontSize: number): CSSProperties => ({
  fontSize: u(fontSize),
  fontWeight: 500,
  color: INK,
  letterSpacing: "-0.03em",
  lineHeight: 1,
});

/* ── Step 2 — sync ── */

const AGING = [
  { label: "954k", height: 230, color: "#1c3f8f", axis: "Current" },
  { label: "232k", height: 58, color: "#e6a23c", axis: "1–30d" },
  { label: "119k", height: 34, color: "#e07b39", axis: "31–60d" },
  { label: "68k", height: 24, color: "#d95c46", axis: "61–90d" },
  { label: "40k", height: 18, color: "#b02626", axis: "90+" },
];

const SYNC_STATS = [
  { label: "Invoices", value: "1,248" },
  { label: "Customers", value: "312" },
  { label: "Payments · 6 mo", value: "1,904" },
];

export function StepSyncIllustration({
  ledger = "QuickBooks",
}: {
  /** Named in the sync badge. The rest of the card is ledger-agnostic. */
  ledger?: string;
}) {
  return (
    <Card padding={u(64)} gap={40}>
      <div style={{ display: "flex", flexDirection: "column", gap: u(36) }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: u(32),
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: u(18) }}>
            <div
              style={{
                ...numeral(68),
                letterSpacing: "-0.035em",
                whiteSpace: "nowrap",
              }}
            >
              USD 1,412,600
            </div>
            <div style={{ fontSize: u(28), color: MUTED }}>outstanding</div>
          </div>
          <Pill
            bg={GREEN_BG}
            color={GREEN}
            fontSize={21}
            padding={`${u(12)} ${u(22)}`}
          >
            <Dot size={11} color={GREEN} />
            {ledger} synced 1h ago
          </Pill>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: u(44),
            height: u(300),
            borderBottom: `1px solid ${HAIR}`,
          }}
        >
          {AGING.map((b) => (
            <div
              key={b.axis}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: u(14),
              }}
            >
              <div style={{ fontSize: u(20), color: MUTED }}>{b.label}</div>
              <div
                style={{
                  width: "100%",
                  height: u(b.height),
                  borderRadius: `${u(8)} ${u(8)} 0 0`,
                  background: b.color,
                }}
              />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: u(44) }}>
          {AGING.map((b) => (
            <div
              key={b.axis}
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: u(21),
                color: MUTED,
              }}
            >
              {b.axis}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: u(24),
        }}
      >
        {SYNC_STATS.map((s) => (
          <div
            key={s.label}
            style={{
              border: `1px solid ${HAIR}`,
              borderRadius: u(18),
              padding: `${u(32)} ${u(34)}`,
              display: "flex",
              flexDirection: "column",
              gap: u(10),
            }}
          >
            <div
              style={{ fontSize: u(20), color: MUTED, whiteSpace: "nowrap" }}
            >
              {s.label}
            </div>
            <div style={numeral(40)}>{s.value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ── Step 3 — follow up ── */

const CHANNELS = [
  {
    name: "Email",
    status: "Sent",
    bg: "#f4f4f5",
    color: ZINC,
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
  },
  {
    name: "SMS",
    status: "Delivered",
    bg: "#f4f4f5",
    color: ZINC,
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  },
  {
    name: "AI call",
    status: "Answered",
    bg: GREEN_BG,
    color: GREEN,
    icon: (
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    ),
  },
];

export function StepFollowUpIllustration() {
  return (
    <Card padding={`${u(88)} ${u(120)}`} gap={56}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: u(24),
          border: `1px solid ${HAIR}`,
          borderRadius: u(16),
          padding: `${u(30)} ${u(36)}`,
        }}
      >
        <Dot size={12} color={RED} />
        <div
          style={{
            flex: 1,
            fontSize: u(32),
            fontWeight: 500,
            color: INK,
            letterSpacing: "-0.015em",
          }}
        >
          INV-4417
        </div>
        <Pill
          bg="#fdeeee"
          color="#b02626"
          fontSize={21}
          padding={`${u(10)} ${u(22)}`}
        >
          34 days overdue
        </Pill>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: u(2), height: u(72), background: dashed }} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: u(28),
        }}
      >
        {CHANNELS.map((c) => (
          <div
            key={c.name}
            style={{
              border: `1px solid ${HAIR}`,
              borderRadius: u(18),
              padding: `${u(56)} ${u(36)}`,
              display: "flex",
              flexDirection: "column",
              gap: u(28),
              alignItems: "flex-start",
            }}
          >
            <Stroke>{c.icon}</Stroke>
            <div
              style={{
                fontSize: u(30),
                fontWeight: 500,
                color: INK,
                letterSpacing: "-0.01em",
              }}
            >
              {c.name}
            </div>
            <Pill
              bg={c.bg}
              color={c.color}
              fontSize={19}
              padding={`${u(8)} ${u(18)}`}
            >
              {c.status}
            </Pill>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: u(22), color: FAINT }}>
        Every message reviewed against your rules before it sends
      </div>
    </Card>
  );
}

/* ── Step 4 — adapts ── */

const ATTEMPTS = [
  { title: "Friendly reminder · email", note: "no reply", done: false },
  { title: "Firmer tone · email", note: "no reply", done: false },
  { title: "Short SMS", note: "paid in 2 days", done: true },
];

export function StepAdaptsIllustration() {
  const noteRow = (text: string, bold: string, tinted: boolean) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: u(20),
        padding: u(32),
        marginLeft: u(48),
        border: `1px solid ${tinted ? "#f3d0d0" : HAIR}`,
        borderRadius: u(14),
        background: tinted ? "#fdf6f6" : "#fbfbfb",
      }}
    >
      <Stroke size={30} color={tinted ? RED : FAINT}>
        {tinted ? (
          <>
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <path d="M4 22v-7" />
          </>
        ) : (
          <>
            <path d="M12 2v4" />
            <path d="m6.8 5.5 2.8 2.8" />
            <path d="M2 12h4" />
            <path d="M18 12h4" />
            <path d="m14.4 8.3 2.8-2.8" />
            <circle cx="12" cy="15" r="5" />
          </>
        )}
      </Stroke>
      <div style={{ flex: 1, fontSize: u(26), color: ZINC }}>
        {text}
        <span style={{ color: INK, fontWeight: 500 }}>{bold}</span>
      </div>
    </div>
  );

  return (
    <Card padding={`${u(88)} ${u(120)}`} gap={44}>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: u(24),
        }}
      >
        <div
          style={{
            position: "absolute",
            left: u(7),
            top: u(52),
            bottom: u(52),
            width: u(2),
            background: dashed,
          }}
        />
        {ATTEMPTS.map((a) => (
          <div
            key={a.title}
            style={{ display: "flex", alignItems: "center", gap: u(32) }}
          >
            <div
              style={{
                width: u(16),
                height: u(16),
                borderRadius: "9999px",
                boxSizing: "border-box",
                background: a.done ? GREEN : "#fff",
                border: a.done ? undefined : `${u(3)} solid #d4d4d8`,
                zIndex: 1,
                flex: "none",
              }}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: u(24),
                border: `1px solid ${HAIR}`,
                borderRadius: u(14),
                padding: `${u(34)} ${u(32)}`,
                background: a.done ? "#fbfefc" : undefined,
              }}
            >
              <div
                style={{
                  flex: 1,
                  fontSize: u(28),
                  fontWeight: 500,
                  color: INK,
                  letterSpacing: "-0.01em",
                }}
              >
                {a.title}
              </div>
              {a.done ? (
                <Pill
                  bg={GREEN_BG}
                  color={GREEN}
                  fontSize={19}
                  padding={`${u(8)} ${u(18)}`}
                >
                  {a.note}
                </Pill>
              ) : (
                <div
                  style={{
                    fontSize: u(21),
                    color: FAINT,
                    whiteSpace: "nowrap",
                  }}
                >
                  {a.note}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {noteRow("Learned for this customer: ", "SMS on day 30, no calls", false)}
      {noteRow("Dispute raised — ", "flagged to your team", true)}
    </Card>
  );
}

/* ── Step 5 — dashboard ── */

const AGING_BALANCE = [
  { label: "Current", height: 210, color: "#dfe4ec" },
  { label: "1–30", height: 146, color: "#c3cdda" },
  { label: "31–60", height: 92, color: "#9aa9bd" },
  { label: "60+", height: 48, color: RED },
];

export function StepDashboardIllustration() {
  const metric = (label: string, body: ReactNode) => (
    <div
      style={{
        border: `1px solid ${HAIR}`,
        borderRadius: u(18),
        padding: `${u(34)} ${u(32)}`,
        display: "flex",
        flexDirection: "column",
        gap: u(14),
      }}
    >
      <div
        style={{
          fontSize: u(18),
          fontWeight: 500,
          letterSpacing: "0.09em",
          color: FAINT,
        }}
      >
        {label}
      </div>
      {body}
    </div>
  );

  return (
    <Card padding={`${u(88)} ${u(100)}`} gap={44}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: u(24),
        }}
      >
        {metric(
          "RECOVERED",
          <>
            <div style={numeral(56)}>82%</div>
            <div
              style={{
                height: u(10),
                borderRadius: "9999px",
                background: "#f1f1f2",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "82%",
                  height: u(10),
                  borderRadius: "9999px",
                  background: INK,
                }}
              />
            </div>
          </>,
        )}
        {metric(
          "DSO",
          <>
            <div style={{ display: "flex", alignItems: "baseline", gap: u(12) }}>
              <div style={numeral(56)}>31</div>
              <div
                style={{ fontSize: u(22), color: GREEN, fontWeight: 500 }}
              >
                −15 days
              </div>
            </div>
            <svg
              width="100%"
              height={u(44)}
              viewBox="0 0 220 44"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8 L46 14 L90 12 L134 26 L178 30 L216 38"
                stroke={INK}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>,
        )}
        {metric(
          "AT RISK",
          <>
            <div style={{ display: "flex", alignItems: "baseline", gap: u(12) }}>
              <div style={numeral(56)}>6</div>
              <div style={{ fontSize: u(22), color: FAINT }}>invoices</div>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: u(10) }}
            >
              <Dot size={10} color={RED} />
              <div
                style={{
                  fontSize: u(21),
                  color: ZINC,
                  whiteSpace: "nowrap",
                }}
              >
                needs a human
              </div>
            </div>
          </>,
        )}
      </div>

      <div
        style={{
          border: `1px solid ${HAIR}`,
          borderRadius: u(18),
          padding: u(40),
          display: "flex",
          flexDirection: "column",
          gap: u(28),
        }}
      >
        <div
          style={{
            fontSize: u(24),
            fontWeight: 500,
            color: INK,
            letterSpacing: "-0.01em",
          }}
        >
          Aging balance
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: u(36),
            height: u(280),
          }}
        >
          {AGING_BALANCE.map((b) => (
            <div
              key={b.label}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: u(16),
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: u(b.height),
                  borderRadius: `${u(10)} ${u(10)} 0 0`,
                  background: b.color,
                }}
              />
              <div
                style={{
                  fontSize: u(20),
                  color: MUTED,
                  whiteSpace: "nowrap",
                }}
              >
                {b.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
