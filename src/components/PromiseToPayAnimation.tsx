"use client";

/**
 * Promise-to-pay thread, ported from the "Industry Hero - Promise to Pay"
 * design canvas. One element tree rendered as a pure function of authored
 * time T, exactly like the source composition.
 *
 * Scenes (authored seconds):
 *   Ask     0.0 -  3.4  Yonovo types, then asks when the overdue invoice pays
 *   Reply   3.4 -  6.2  the customer replies "Wednesday"
 *   Capture 6.2 -  9.4  Yonovo captures the promise-to-pay date
 *   Chase   9.4 - 13.0  the date passes, Yonovo follows up on its own
 *
 * Authored on a 1080x1350 stage. Every length goes through u(), which converts
 * design pixels to cqw against the 0.8-ratio container, so the piece is
 * resolution independent and the server render is already correctly sized.
 */

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import {
  Easing,
  animate,
  clamp,
  lerp,
  fadeOut,
  useCompositionClock,
} from "@/components/compositionRuntime";

/* ── Timeline ── */

const CUES = { Ask: 0, Reply: 3.4, Capture: 6.2, Chase: 9.4 };
const TOTAL = 13.0;
/** The settled full thread, just before the closing fade at 12.4. */
const START_T = 11.6;

/* ── Palette ── */

const INK = "#0c2756";
const ZINC = "#52525b";
const ZINC_L = "#71717a";
const HAIR = "#e5e7eb";
const CREAM = "#f5f4ef";
const RED = "#e13f3f";
const GREEN = "#177a3c";

/* ── Units: design pixels on the 1080-wide stage ── */

const u = (px: number) => `${(px / 1080) * 100}cqw`;

/* ── Motion ── */

const MOTION = {
  enter:
    (start: number, dy = 30, dur = 0.65) =>
    (T: number) => ({
      opacity: animate({
        start,
        end: start + dur * 0.65,
        ease: Easing.easeOutQuad,
      })(T),
      y: animate({
        from: dy,
        to: 0,
        start,
        end: start + dur,
        ease: Easing.easeOutCubic,
      })(T),
      scale: animate({
        from: 0.97,
        to: 1,
        start,
        end: start + dur,
        ease: Easing.easeOutCubic,
      })(T),
    }),
  draw: (start: number, end: number) =>
    animate({ start, end, ease: Easing.easeInOutCubic }),
};

/* ── Chips ── */

const chipBase: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: u(10),
  borderRadius: "9999px",
  background: "#fff",
  whiteSpace: "nowrap",
};

const chipLabel = (color: string): CSSProperties => ({
  fontSize: u(19),
  fontWeight: 500,
  color,
});

function AgentChip() {
  return (
    <div
      style={{
        ...chipBase,
        padding: `${u(8)} ${u(16)} ${u(8)} ${u(10)}`,
        border: `1px solid ${HAIR}`,
      }}
    >
      <Image
        src="/yonovo-icon.png"
        alt=""
        width={2133}
        height={2133}
        style={{ width: u(24), height: u(24), objectFit: "contain" }}
      />
      <span style={chipLabel(INK)}>Yonovo agent</span>
    </div>
  );
}

function CustomerChip() {
  return (
    <div
      style={{
        ...chipBase,
        padding: `${u(8)} ${u(16)}`,
        border: `1px solid ${HAIR}`,
      }}
    >
      <svg
        width={u(18)}
        height={u(18)}
        viewBox="0 0 24 24"
        fill="none"
        stroke={ZINC_L}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      <span style={chipLabel(ZINC)}>Northwind Supply</span>
    </div>
  );
}

function PromiseChip({ spin }: { spin: number }) {
  return (
    <div
      style={{
        ...chipBase,
        padding: `${u(8)} ${u(16)}`,
        border: "1px solid #cdeed8",
      }}
    >
      <svg
        width={u(18)}
        height={u(18)}
        viewBox="0 0 24 24"
        fill="none"
        stroke={GREEN}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0, transform: `rotate(${lerp(-40, 0, spin)}deg)` }}
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
      <span style={chipLabel(GREEN)}>Promise to pay</span>
    </div>
  );
}

/* ── Thread ── */

const TONES: Record<string, CSSProperties> = {
  agent: { background: "#fff", border: `1px solid ${HAIR}` },
  customer: { background: "#f4f4f5", border: "1px solid #ececee" },
  note: { background: "#eefbf1", border: "1px solid #cdeed8" },
};

function Bubble({
  T,
  start,
  top,
  tone,
  stamp,
  chip,
  children,
}: {
  T: number;
  start: number;
  top: number;
  tone: keyof typeof TONES;
  stamp: string;
  chip: ReactNode;
  children: ReactNode;
}) {
  const e = MOTION.enter(start)(T);
  const out = fadeOut(TOTAL - 0.6, 0.55)(T);

  return (
    <div
      style={{
        position: "absolute",
        left: u(70),
        right: u(70),
        top: u(top),
        borderRadius: u(22),
        padding: `${u(30)} ${u(34)}`,
        display: "flex",
        flexDirection: "column",
        gap: u(20),
        boxSizing: "border-box",
        ...TONES[tone],
        opacity: e.opacity * out,
        transform: `translateY(${u(e.y)}) scale(${e.scale})`,
        transformOrigin: "center top",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: u(16) }}>
        {chip}
        <div style={{ flex: 1 }} />
        <div
          style={{ fontSize: u(19), color: "#a1a1aa", whiteSpace: "nowrap" }}
        >
          {stamp}
        </div>
      </div>
      <div
        style={{
          fontSize: u(25),
          color: INK,
          lineHeight: 1.5,
          textWrap: "pretty",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Typing({ T, start, top }: { T: number; start: number; top: number }) {
  const show = clamp(
    MOTION.draw(start - 0.5, start - 0.3)(T) -
      MOTION.draw(start - 0.08, start)(T),
    0,
    1,
  );

  return (
    <div
      style={{
        position: "absolute",
        left: u(70),
        top: u(top),
        display: "flex",
        alignItems: "center",
        gap: u(9),
        padding: `${u(18)} ${u(24)}`,
        borderRadius: "9999px",
        background: "#fff",
        border: `1px solid ${HAIR}`,
        opacity: show,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: u(10),
            height: u(10),
            borderRadius: "9999px",
            background: "#c9cdd4",
            opacity:
              0.45 + Math.abs(Math.sin((T - start) * 7 + i * 0.9)) * 0.55,
          }}
        />
      ))}
    </div>
  );
}

function Piece({ T }: { T: number }) {
  const head = MOTION.enter(0.05, 16, 0.55)(T);
  const headOut = fadeOut(TOTAL - 0.6, 0.55)(T);
  const clockSpin = MOTION.draw(CUES.Capture + 0.15, CUES.Capture + 0.8)(T);
  const closing = MOTION.enter(CUES.Chase + 1.5, 18, 0.6)(T);

  return (
    <div style={{ position: "absolute", inset: 0, background: CREAM }}>
      <div
        style={{
          position: "absolute",
          left: u(70),
          top: u(60),
          display: "flex",
          alignItems: "center",
          gap: u(12),
          padding: `${u(12)} ${u(24)}`,
          borderRadius: "9999px",
          border: `1px solid ${HAIR}`,
          background: "#fff",
          opacity: head.opacity * headOut,
          transform: `translateY(${u(head.y)})`,
        }}
      >
        <div
          style={{
            width: u(9),
            height: u(9),
            borderRadius: "9999px",
            background: RED,
          }}
        />
        <div
          style={{
            fontSize: u(20),
            fontWeight: 500,
            color: ZINC,
            whiteSpace: "nowrap",
          }}
        >
          INV-2041 · $13,800 · 15 days overdue
        </div>
      </div>

      <Typing T={T} start={0.55} top={168} />
      <Bubble
        T={T}
        start={0.55}
        top={168}
        tone="agent"
        stamp="Thu 9:02am"
        chip={<AgentChip />}
      >
        Hi Sarah, invoice INV-2041 for $13,800 is now 15 days overdue. Can you
        confirm when payment will be made?
      </Bubble>

      <Bubble
        T={T}
        start={CUES.Reply + 0.2}
        top={438}
        tone="customer"
        stamp="Fri 11:15am"
        chip={<CustomerChip />}
      >
        Hi there, we&apos;ll make the payment on Wednesday.
      </Bubble>

      <Bubble
        T={T}
        start={CUES.Capture + 0.1}
        top={666}
        tone="note"
        stamp="Captured"
        chip={<PromiseChip spin={clockSpin} />}
      >
        Payment expected{" "}
        <span style={{ fontWeight: 500 }}>Wednesday 12 Nov</span>. If it
        doesn&apos;t arrive, Yonovo follows up on its own.
      </Bubble>

      <Typing T={T} start={CUES.Chase + 0.35} top={952} />
      <Bubble
        T={T}
        start={CUES.Chase + 0.35}
        top={952}
        tone="agent"
        stamp="Thu 13 Nov"
        chip={<AgentChip />}
      >
        Hi Sarah, the payment was due yesterday and hasn&apos;t come through
        yet. Can you let me know the status?
      </Bubble>

      <div
        style={{
          position: "absolute",
          left: u(70),
          right: u(70),
          top: u(1218),
          textAlign: "center",
          opacity: closing.opacity * headOut,
        }}
      >
        <div style={{ fontSize: u(26), color: ZINC_L, lineHeight: 1.4 }}>
          Every promise tracked. Every miss chased.
        </div>
      </div>
    </div>
  );
}

/* ── Stage ── */

export default function PromiseToPayAnimation({
  className,
}: {
  className?: string;
}) {
  const { hostRef, T } = useCompositionClock({
    total: TOTAL,
    startAt: START_T,
  });

  return (
    <div
      ref={hostRef}
      className={className}
      role="img"
      aria-label="A Yonovo agent asking a customer when an overdue invoice will be paid, capturing the promised date, then following up automatically when the payment misses it."
      style={{
        position: "relative",
        containerType: "inline-size",
        background: CREAM,
      }}
    >
      <Piece T={T} />
    </div>
  );
}
