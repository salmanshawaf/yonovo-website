"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import SectionBadge from "@/components/SectionBadge";
import { PANELS } from "@/components/sections/HowItWorksPanels";

const steps = [
  {
    title: "Connect your books",
    description:
      "Link your accounting software and Yonovo automatically imports your invoices, customers, and aging data on your behalf.",
  },
  {
    title: "Set your rules or let AI decide",
    description:
      "Define your own follow up workflows or let Yonovo analyze your customers and recommend the best collection strategy for you to approve.",
  },
  {
    title: "Yonovo learns and improves",
    description:
      "The AI identifies what’s working, spots unresponsive customers, and adapts its approach over time with your approval.",
  },
  {
    title: "Escalate what needs a human",
    description:
      "80% of collections are handled automatically. When a customer disputes a charge or needs a real conversation, your team gets flagged instantly.",
  },
  {
    title: "Review your results",
    description:
      "Monitor recovery rates, DSO, at risk invoices, and time saved so you always know where your receivables stand.",
  },
];

/** How long each step holds before the section advances, in ms. */
const DURATIONS = [8000, 9500, 9000, 9500, 8500];
const TICK = 100;

/** Circumference of the r=20.5 pause-ring circle. */
const RING_CIRCUMFERENCE = 128.8;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export default function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  // Mirrors `elapsed` so the tick can read it without an impure state updater.
  const elapsedRef = useRef(0);
  const [paused, setPaused] = useState(false);
  // Auto-advance only once the section has been scrolled into view, so the
  // build-in animations aren't spent before anyone can see them.
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Readers who ask for reduced motion get the finished panels and no auto-advance.
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // The tick reads elapsed time from a ref rather than from a setElapsed
  // updater. React may call an updater more than once for a single update, so
  // advancing the step from inside one would skip steps.
  useEffect(() => {
    if (paused || reducedMotion || !inView) return;

    const timer = setInterval(() => {
      const next = elapsedRef.current + TICK;

      if (next >= DURATIONS[active]) {
        elapsedRef.current = 0;
        setElapsed(0);
        setActive((current) => (current + 1) % steps.length);
        return;
      }

      elapsedRef.current = next;
      setElapsed(next);
    }, TICK);

    return () => clearInterval(timer);
  }, [active, paused, reducedMotion, inView]);

  const selectStep = useCallback((index: number) => {
    elapsedRef.current = 0;
    setActive(index);
    setElapsed(0);
    setPaused(false);
  }, []);

  const progress = Math.min(elapsed / DURATIONS[active], 1);
  const Panel = PANELS[active];

  return (
    <section ref={sectionRef} className="w-full py-12 md:py-15 bg-surface">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        <div className="flex flex-col gap-4 py-4">
          {/* Header */}
          <div className="flex flex-col items-start gap-4">
            <SectionBadge label="How it works" />
            {/* Stacks below lg so the headline and paragraph don't jam together. */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-10">
              <h2 className="font-medium text-4xl text-foreground tracking-tight lg:text-[3.5rem] lg:leading-[1.1]">
                From overdue to paid in five steps
              </h2>
              <p className="max-w-[600px] text-lg text-muted">
                Yonovo takes over the entire collections process so your team
                can focus on running the business, not chasing payments.
              </p>
            </div>
          </div>

          {/* Steps + animated panel */}
          <div className="grid items-center gap-8 pt-4 lg:grid-cols-2">
            {/* Left — Steps */}
            <div className="flex w-full max-w-[530px] flex-col gap-2">
              {steps.map((step, index) => {
                const isActive = index === active;
                const number = String(index + 1).padStart(2, "0");

                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => selectStep(index)}
                    className={`relative w-full overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300 ${
                      isActive
                        ? "border-border bg-background opacity-100"
                        : "border-transparent bg-transparent opacity-60"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`font-medium text-lg shrink-0 transition-colors duration-300 ${
                          isActive ? "text-brand-red" : "text-muted"
                        }`}
                      >
                        {number}.
                      </span>
                      <div className="flex-1">
                        <h3
                          className={`font-medium text-lg transition-colors duration-300 ${
                            isActive ? "text-foreground" : "text-muted"
                          }`}
                        >
                          {step.title}
                        </h3>
                        {isActive && (
                          <p className="mt-2 text-[15px] text-muted leading-[1.55]">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {isActive && (
                      <div
                        className="absolute bottom-0 left-0 h-[2px] bg-brand-red transition-[width] duration-[120ms] ease-linear"
                        style={{ width: `${progress * 100}%` }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right — Animated panel */}
            <div className="relative w-full overflow-hidden rounded-[30px] border border-border bg-surface-warm lg:aspect-[0.939]">
              {/* Faint graph-paper grid behind the panels */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(12,39,86,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(12,39,86,.06)_1px,transparent_1px)] bg-[length:32px_32px] opacity-50" />

              {/* Only the active panel is mounted — mounting restarts its animations. */}
              <Panel />

              <button
                type="button"
                onClick={() => setPaused((previous) => !previous)}
                aria-label={paused ? "Play the walkthrough" : "Pause the walkthrough"}
                className="absolute right-5 bottom-5 flex size-11 items-center justify-center rounded-full border border-border bg-white/85 backdrop-blur-[8px]"
              >
                <svg width="44" height="44" viewBox="0 0 44 44" className="absolute inset-0 -rotate-90" aria-hidden="true">
                  <circle
                    cx="22"
                    cy="22"
                    r="20.5"
                    fill="none"
                    stroke="var(--color-brand-navy)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
                    style={{ transition: "stroke-dashoffset 0.12s linear" }}
                  />
                </svg>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="var(--color-brand-navy)"
                  className={`relative ${paused ? "ml-0.5" : ""}`}
                  aria-hidden="true"
                >
                  {paused ? (
                    <polygon points="5,3 19,12 5,21" />
                  ) : (
                    <>
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
