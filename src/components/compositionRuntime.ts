"use client";

/**
 * Shared runtime for the ported design-canvas compositions.
 *
 * Upstream (animations-v3.jsx) an animation is ONE element tree rendered as a
 * pure function of one authored-time axis. These helpers are the parts of that
 * engine the ported pieces actually use: the easing set, the single-segment
 * tween, and a clock that drives authored time T.
 */

import { useEffect, useRef, useState } from "react";

/* ── Easing (hand-rolled, matching the source engine) ── */

export const Easing = {
  linear: (t: number) => t,
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

export const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

/** interpolate([0,1],[a,b])(t) from the source engine, in its only used form. */
export const lerp = (from: number, to: number, t: number) =>
  from + (to - from) * t;

/** animate({from,to,start,end,ease})(t). Holds `from` before start, `to` after end. */
export function animate({
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

export const fadeOut = (start: number, dur = 0.35) =>
  animate({ from: 1, to: 0, start, end: start + dur, ease: Easing.easeInQuad });

/* ── Clock ── */

/**
 * Drives authored time T over a looping timeline.
 *
 * `startAt` is both the frame rendered before the clock starts (server render
 * and first paint) and where the clock picks up, so the piece never shows an
 * empty canvas and never jumps on hydration. Pick a settled frame.
 *
 * Playback pauses when the piece is off-screen or the tab is backgrounded, and
 * reduced-motion users keep the `startAt` frame with no animation at all.
 */
export function useCompositionClock({
  total,
  startAt,
}: {
  total: number;
  startAt: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [T, setT] = useState(startAt);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = 0;
    let t = startAt;
    let visible = false;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (last) {
        // Cap the step so a backgrounded tab does not jump the timeline.
        t = (t + Math.min((now - last) / 1000, 0.1)) % total;
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
  }, [total, startAt]);

  return { hostRef, T };
}
