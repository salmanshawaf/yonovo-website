"use client";

/**
 * Ledger read-only connect, ported from the "<Ledger> Connect Video" design
 * canvases (QuickBooks, Xero, Odoo, NetSuite, Sage). Upstream these are one
 * shared `LedgerConnect` composition parameterised by name and logo, and this
 * is the same shape. The whole piece is one element tree rendered as a pure
 * function of authored time T, exactly like the source composition, so
 * nothing mounts or unmounts at a scene boundary.
 *
 * Scenes (authored seconds):
 *   Request   0.0 - 3.6   card rises in, logos link up, three scopes cascade
 *   Grant     3.6 - 6.6   cursor glides to Authorize, presses, button spins
 *   Connected 6.6 - 10.2  headline swaps, scopes flip to Granted, card fades
 *
 * Layout is authored on a 1080x1080 stage. Every length goes through u(),
 * which converts design pixels to cqw against the square container, so the
 * piece is resolution independent and the server render is already at the
 * right size (no measure-then-scale flash).
 */

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

/* ── Timeline ── */

const CUES = { Request: 0, Grant: 3.6, Connected: 6.6 };
const TOTAL = 10.2;
/** Frame the piece renders before the clock starts: the Request scene fully
 *  settled. Starting here means the hero never paints an empty canvas, and
 *  the clock picks up from the same frame so there is no jump on hydration. */
const START_T = 3.0;

/* ── Palette (raw hex, matching the design system tokens) ── */

const INK = "#0c2756";
const ZINC = "#52525b";
const HAIR = "#e5e7eb";
const CREAM = "#f5f4ef";
const RED = "#e13f3f";

/* ── Units: design pixels on the 1080 stage to container-relative lengths ── */

const u = (px: number) => `${(px / 1080) * 100}cqw`;

/* ── Interpolation helpers (ported from the composition engine) ── */

const Easing = {
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeOutBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic,
}: {
  from?: number;
  to?: number;
  start?: number;
  end?: number;
  ease?: (t: number) => number;
}) {
  return (t: number) => {
    if (t <= start) return from;
    if (t >= end) return to;
    return from + (to - from) * ease((t - start) / (end - start));
  };
}

/** The three motion helpers the composition uses. Nothing eases outside them. */
const MOTION = {
  enter:
    (start: number, dy = 28, dur = 0.55) =>
    (T: number) => ({
      opacity: animate({
        start,
        end: start + dur * 0.8,
        ease: Easing.easeOutQuad,
      })(T),
      y: animate({
        from: dy,
        to: 0,
        start,
        end: start + dur,
        ease: Easing.easeOutCubic,
      })(T),
    }),
  pop: (start: number, dur = 0.6) =>
    animate({ start, end: start + dur, ease: Easing.easeOutBack }),
  draw: (start: number, end: number) =>
    animate({ start, end, ease: Easing.easeInOutCubic }),
};

const fadeOut = (start: number, dur = 0.35) =>
  animate({ from: 1, to: 0, start, end: start + dur, ease: Easing.easeInQuad });

/* ── Icons ── */

const P = {
  fileText: [
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
    "M14 2v6h6",
    "M8 13h8",
    "M8 17h5",
  ],
  users: [
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
    "M9 7a4 4 0 1 1 0 8 4 4 0 0 1 0-8",
    "M22 21v-2a4 4 0 0 0-3-3.87",
  ],
  wallet: [
    "M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5",
    "M16 12h.01",
  ],
  lock: [
    "M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z",
    "M8 11V7a4 4 0 0 1 8 0v4",
  ],
  check: ["M20 6 9 17l-5-5"],
  cursor: [
    "M4.037 4.688a.5.5 0 0 1 .65-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",
  ],
};

function Icon({
  d,
  size = 24,
  color = "currentColor",
  width = 2,
  style,
  fill,
}: {
  d: string[];
  size?: number;
  color?: string;
  width?: number;
  style?: CSSProperties;
  fill?: string;
}) {
  return (
    <svg
      width={u(size)}
      height={u(size)}
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}
    >
      {d.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}

const SCOPES = [
  { icon: P.fileText, label: "Invoices" },
  { icon: P.users, label: "Customers" },
  { icon: P.wallet, label: "Payments" },
];

/* ── Pieces ── */

function Lockup({
  T,
  logo,
  logoSize,
}: {
  T: number;
  logo: string;
  logoSize: number;
}) {
  const qb = MOTION.pop(0.55)(T);
  const yo = MOTION.pop(0.75)(T);
  const link = MOTION.draw(1.0, 1.5)(T);
  const out = fadeOut(TOTAL - 0.55, 0.5)(T);

  const box = (s: number): CSSProperties => ({
    width: u(104),
    height: u(104),
    borderRadius: "9999px",
    background: "#fff",
    border: `1px solid ${HAIR}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    transform: `scale(${clamp(s, 0, 1.2)})`,
    boxShadow: `0 ${u(2)} ${u(10)} rgba(12,39,86,0.05)`,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: u(216),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: u(26),
        opacity: out,
      }}
    >
      <div style={box(qb)}>
        <Image
          src={logo}
          alt=""
          width={200}
          height={200}
          style={{
            width: u(logoSize),
            height: u(logoSize),
            objectFit: "contain",
          }}
        />
      </div>
      <div style={{ display: "flex", gap: u(10), alignItems: "center" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: u(8),
              height: u(8),
              borderRadius: "9999px",
              background: i === 1 ? RED : "#c9cdd4",
              opacity: clamp((link - i * 0.22) * 3, 0, 1),
            }}
          />
        ))}
      </div>
      <div style={box(yo)}>
        <Image
          src="/yonovo-icon.png"
          alt="Yonovo"
          width={2133}
          height={2133}
          style={{ width: u(92), height: u(92) }}
        />
      </div>
    </div>
  );
}

function Headline({ T, name }: { T: number; name: string }) {
  const t1 = MOTION.enter(0.85, 22)(T);
  const swap = MOTION.draw(CUES.Connected + 0.05, CUES.Connected + 0.45)(T);
  const c1 = MOTION.enter(CUES.Connected + 0.35, 18)(T);
  const c1out = fadeOut(TOTAL - 0.55, 0.5)(T);

  const slot: CSSProperties = {
    position: "absolute",
    left: u(100),
    right: u(100),
    top: u(372),
    textAlign: "center",
  };
  const type: CSSProperties = {
    fontSize: u(46),
    fontWeight: 500,
    color: INK,
    letterSpacing: "-0.022em",
    lineHeight: 1.15,
  };

  return (
    <div>
      <div
        style={{
          ...slot,
          opacity: t1.opacity * (1 - swap),
          transform: `translateY(${u(t1.y)})`,
        }}
      >
        <div style={type}>Yonovo is requesting access</div>
      </div>
      <div
        style={{
          ...slot,
          opacity: c1.opacity * swap * c1out,
          transform: `translateY(${u(c1.y)})`,
        }}
      >
        <div style={type}>Connected to {name}</div>
      </div>
    </div>
  );
}

function ScopeRows({ T }: { T: number }) {
  const leave = fadeOut(TOTAL - 0.55, 0.5)(T);

  return (
    <div style={{ opacity: leave }}>
      {SCOPES.map((s, i) => {
        const e = MOTION.enter(1.5 + i * 0.22, 24)(T);
        const tick = MOTION.pop(CUES.Connected + 0.55 + i * 0.16, 0.45)(T);
        return (
          <div
            key={s.label}
            style={{
              position: "absolute",
              left: u(148),
              width: u(784),
              top: u(500 + i * 96),
              height: u(84),
              border: `1px solid ${HAIR}`,
              borderRadius: u(12),
              background: "#fff",
              display: "flex",
              alignItems: "center",
              gap: u(20),
              padding: `0 ${u(24)}`,
              boxSizing: "border-box",
              opacity: e.opacity,
              transform: `translateY(${u(e.y)})`,
            }}
          >
            <Icon d={s.icon} size={26} color={RED} width={1.75} />
            <div
              style={{
                flex: 1,
                fontSize: u(24),
                fontWeight: 500,
                color: INK,
                letterSpacing: "-0.01em",
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: u(8),
                padding: `${u(8)} ${u(16)}`,
                borderRadius: "9999px",
                background: "#f4f4f5",
                color: ZINC,
                fontSize: u(17),
                fontWeight: 500,
                whiteSpace: "nowrap",
                opacity: 1 - clamp(tick, 0, 1),
              }}
            >
              <Icon d={P.lock} size={15} color={ZINC} width={2} />
              Read-only
            </div>
            <div
              style={{
                position: "absolute",
                right: u(24),
                display: "flex",
                alignItems: "center",
                gap: u(8),
                padding: `${u(8)} ${u(16)}`,
                borderRadius: "9999px",
                background: "#eefbf1",
                color: "#177a3c",
                fontSize: u(17),
                fontWeight: 500,
                whiteSpace: "nowrap",
                opacity: clamp(tick, 0, 1),
                transform: `scale(${clamp(tick, 0, 1.1)})`,
              }}
            >
              <Icon d={P.check} size={15} color="#177a3c" width={2.5} />
              Granted
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AuthorizeButton({ T }: { T: number }) {
  const e = MOTION.enter(2.35, 22)(T);
  const press = animate({
    start: CUES.Grant + 1.75,
    end: CUES.Grant + 1.9,
    ease: Easing.easeOutQuad,
  })(T);
  const release = animate({
    start: CUES.Grant + 1.9,
    end: CUES.Grant + 2.1,
    ease: Easing.easeOutQuad,
  })(T);
  const pressed = press - release;
  const hover = animate({
    start: CUES.Grant + 1.2,
    end: CUES.Grant + 1.6,
    ease: Easing.easeOutQuad,
  })(T);
  const busy = MOTION.draw(CUES.Grant + 2.05, CUES.Grant + 2.25)(T);
  const granted = MOTION.draw(CUES.Connected + 0.05, CUES.Connected + 0.4)(T);
  const done = 1 - granted;
  const spin = (T - (CUES.Grant + 2.0)) * 340;
  const leave = fadeOut(TOTAL - 0.55, 0.5)(T);

  const label: CSSProperties = {
    fontSize: u(26),
    fontWeight: 500,
    letterSpacing: "-0.01em",
    whiteSpace: "nowrap",
  };

  return (
    <div
      style={{
        position: "absolute",
        left: u(148),
        width: u(784),
        top: u(806),
        height: u(88),
        borderRadius: u(8),
        background: `rgba(9, 31, 68, ${lerp(1, 0.9, hover)})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: u(16),
        opacity: e.opacity * leave,
        transform: `translateY(${u(e.y)}) scale(${lerp(1, 0.985, pressed)})`,
        boxSizing: "border-box",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: u(14),
          opacity: (1 - busy) * done,
        }}
      >
        <Icon d={P.lock} size={22} color="#fff" width={2} />
        <span style={label}>Authorize read-only access</span>
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          gap: u(16),
          opacity: busy * done,
        }}
      >
        <svg
          width={u(26)}
          height={u(26)}
          viewBox="0 0 24 24"
          style={{ transform: `rotate(${spin}deg)` }}
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2.5"
          />
          <path
            d="M21 12a9 9 0 0 0-9-9"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <span style={label}>Connecting…</span>
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          gap: u(14),
          opacity: granted,
        }}
      >
        <Icon d={P.check} size={24} color="#5aef76" width={2.5} />
        <span style={label}>Read-only access granted</span>
      </div>
    </div>
  );
}

function Cursor({ T }: { T: number }) {
  const start = CUES.Grant + 0.1;
  const x = animate({
    from: 1010,
    to: 540,
    start,
    end: CUES.Grant + 1.6,
    ease: Easing.easeInOutCubic,
  })(T);
  const y = animate({
    from: 1050,
    to: 850,
    start,
    end: CUES.Grant + 1.6,
    ease: Easing.easeInOutCubic,
  })(T);
  const inOut = clamp(
    MOTION.draw(start - 0.2, start + 0.25)(T) -
      MOTION.draw(CUES.Grant + 2.3, CUES.Grant + 2.7)(T),
    0,
    1,
  );
  const press =
    animate({
      start: CUES.Grant + 1.75,
      end: CUES.Grant + 1.9,
      ease: Easing.easeOutQuad,
    })(T) -
    animate({
      start: CUES.Grant + 1.9,
      end: CUES.Grant + 2.15,
      ease: Easing.easeOutQuad,
    })(T);

  return (
    <div
      style={{
        position: "absolute",
        left: u(x),
        top: u(y),
        opacity: inOut,
        transform: `scale(${lerp(1, 0.86, press)})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: u(-34),
          top: u(-34),
          width: u(68),
          height: u(68),
          borderRadius: "9999px",
          background: "rgba(255,255,255,0.28)",
          opacity: press,
        }}
      />
      <Icon
        d={P.cursor}
        size={52}
        color={INK}
        fill="#ffffff"
        width={1.75}
        style={{
          filter: `drop-shadow(0 ${u(4)} ${u(10)} rgba(0,0,0,0.35))`,
        }}
      />
    </div>
  );
}

function Piece({
  T,
  name,
  logo,
  logoSize,
}: {
  T: number;
  name: string;
  logo: string;
  logoSize: number;
}) {
  const card = MOTION.enter(0.12, 54, 0.85)(T);
  const cardOut = fadeOut(TOTAL - 0.55, 0.5)(T);
  const cardScale = animate({
    from: 0.965,
    to: 1,
    start: 0.12,
    end: 0.97,
    ease: Easing.easeOutCubic,
  })(T);

  return (
    <div style={{ position: "absolute", inset: 0, background: CREAM }}>
      <div
        style={{
          position: "absolute",
          left: u(100),
          top: u(140),
          width: u(880),
          height: u(800),
          background: "#fff",
          border: `1px solid ${HAIR}`,
          borderRadius: u(28),
          boxSizing: "border-box",
          boxShadow: `0 ${u(24)} ${u(60)} ${u(-30)} rgba(12,39,86,0.28)`,
          opacity: card.opacity * cardOut,
          transform: `translateY(${u(card.y)}) scale(${cardScale})`,
        }}
      />
      <div style={{ position: "absolute", inset: 0, opacity: cardOut }}>
        <Headline T={T} name={name} />
        <ScopeRows T={T} />
        <AuthorizeButton T={T} />
      </div>
      <Lockup T={T} logo={logo} logoSize={logoSize} />
      <Cursor T={T} />
    </div>
  );
}

/* ── Stage ── */

export default function LedgerConnectAnimation({
  name,
  logo,
  logoSize = 104,
  className,
}: {
  /** Ledger name, used in the "Connected to X" headline. */
  name: string;
  /** Path to the square logo shown in the left lockup circle. */
  logo: string;
  /** Logo size in design pixels on the 1080 stage. The circle is 104. */
  logoSize?: number;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [T, setT] = useState(START_T);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = 0;
    let t = START_T;
    let visible = false;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (last) {
        // Cap the step so a backgrounded tab does not jump the timeline.
        t = (t + Math.min((now - last) / 1000, 0.1)) % TOTAL;
        setT(t);
      }
      last = now;
    };

    const start = () => {
      if (raf) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Only burn frames while the piece is actually on screen and the tab is
    // in front, the same policy the homepage preview uses.
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { rootMargin: "200px" },
    );
    io.observe(host);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={className}
      role="img"
      aria-label={`Yonovo requesting read-only access to ${name} invoices, customers, and payments, then the connection being authorized.`}
      style={{
        position: "relative",
        containerType: "inline-size",
        background: CREAM,
      }}
    >
      <Piece T={T} name={name} logo={logo} logoSize={logoSize} />
    </div>
  );
}
