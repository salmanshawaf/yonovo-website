"use client";

import { useState } from "react";
import SectionBadge from "@/components/SectionBadge";

const benefits = [
  {
    title: "Personalized follow ups",
    description:
      "Every message is shaped by the customer\u2019s payment history, relationship length, and past interactions so no two follow ups are the same.",
    icon: (
      <svg className="h-auto w-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
    activeColor: "text-brand-red",
  },
  {
    title: "Always on collections",
    description:
      "Every invoice is tracked and followed up on automatically so no account gets forgotten, no matter how busy your team gets.",
    icon: (
      <svg className="h-auto w-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="10" x2="14" y1="2" y2="2" />
        <line x1="12" x2="15" y1="14" y2="11" />
        <circle cx="12" cy="14" r="8" />
      </svg>
    ),
    activeColor: "text-brand-red",
  },
  {
    title: "Empathetic & on-brand",
    description:
      "Every message goes out in your company\u2019s voice and tone so customers feel like they\u2019re hearing from your team, not a robot.",
    icon: (
      <svg className="h-auto w-7" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 32 33">
        <path d="M13.872 28.5H8.003C6.53 28.5 5.336 27.306 5.336 25.833c0-2.945 2.388-5.333 5.333-5.333h1.62M21.336 9.833a5.333 5.333 0 1 1-10.667 0 5.333 5.333 0 0 1 10.667 0ZM22.669 28.926c-.533 0-5.333-2.593-5.333-6.222 0-1.815 1.6-3.111 3.2-3.111.786 0 1.6.259 2.133 1.037.534-.778 1.334-1.049 2.134-1.037 1.6.023 3.2 1.296 3.2 3.111 0 3.67-4.8 6.222-5.334 6.222Z" />
      </svg>
    ),
    activeColor: "text-brand-red",
  },
  {
    title: "Smart escalations",
    description:
      "When a customer disputes a charge or stops responding, Yonovo collects the key details and provides a full summary to your team for review.",
    icon: (
      <svg className="h-auto w-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M16 3h5v5" />
        <path d="M8 3H3v5" />
        <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
        <path d="m15 9 6-6" />
      </svg>
    ),
    activeColor: "text-brand-red",
  },
  {
    title: "Full observability",
    description:
      "See every decision Yonovo makes, every message it sends, and every customer response with full visibility into each step of the process.",
    icon: (
      <svg className="h-auto w-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    activeColor: "text-brand-red",
  },
];

export default function BenefitsSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="w-full py-12 md:py-15 bg-surface">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex w-full flex-col items-start gap-4">
            <SectionBadge label="Benefits" />
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
              <h2 className="font-medium text-4xl text-foreground tracking-tight lg:text-5xl">
                Works like a world class AR specialist
              </h2>
              <p className="max-w-[600px] text-lg text-muted">
                Yonovo is designed to work with your existing tools and
                workflows.
              </p>
            </div>
          </div>

          {/* Desktop: 2-column grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left — Video Placeholder */}
            <div className="hidden md:block">
              <div className="relative my-12 aspect-[0.939] w-full">
                <div className="absolute inset-0 flex aspect-[0.939] w-full items-center justify-center">
                  <div className="aspect-[0.939] w-full rounded-2xl p-3" style={{ opacity: 1 }}>
                    <div className="group relative aspect-[0.939] w-full overflow-hidden rounded-3xl">
                      <div
                        className="aspect-[0.939] w-full rounded-3xl bg-border/30 flex items-center justify-center"
                        style={{ objectFit: "contain", display: "block", width: "100%" }}
                      >
                        <span className="text-muted text-sm">
                          {benefits[activeStep].title}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="absolute bottom-4 left-4 rounded-full bg-black/25 p-2 opacity-90 transition-opacity md:p-3 group-hover:opacity-100"
                        aria-label="Pause video"
                      >
                        <svg className="h-4 w-4 md:h-6 md:w-6" fill="white" viewBox="0 0 24 24">
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Benefit Steps */}
            <div className="hidden self-center md:block">
              <div className="flex items-center justify-end">
                <div className="flex w-full max-w-[530px] flex-col gap-2">
                  {benefits.map((benefit, index) => {
                    const isActive = index === activeStep;
                    return (
                      <button
                        key={benefit.title}
                        onClick={() => setActiveStep(index)}
                        className={`w-full rounded-2xl p-6 text-left transition-all duration-300 ${
                          isActive
                            ? "border border-border bg-background"
                            : "bg-transparent border border-transparent"
                        }`}
                        style={{ opacity: isActive ? 1 : 0.6 }}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`shrink-0 transition-colors duration-300 ${isActive ? benefit.activeColor : "text-zinc-400"}`}>
                            {benefit.icon}
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`font-medium text-lg transition-colors duration-300 ${
                                isActive ? "text-foreground" : "text-zinc-400"
                              }`}
                            >
                              {benefit.title}
                            </h3>
                            {/* Smooth expand/collapse */}
                            <div
                              className="grid transition-all duration-300 ease-in-out"
                              style={{
                                gridTemplateRows: isActive ? "1fr" : "0fr",
                                opacity: isActive ? 1 : 0,
                                marginTop: isActive ? 8 : 0,
                              }}
                            >
                              <div className="overflow-hidden">
                                <p className="text-muted">{benefit.description}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile layout */}
            <div className="md:hidden">
              <div className="flex flex-col">
                {/* Video placeholder */}
                <div className="w-full">
                  <div className="relative my-12 aspect-[0.939] w-full">
                    <div className="absolute inset-0 flex aspect-[0.939] w-full items-center justify-center">
                      <div className="aspect-[0.939] w-full rounded-2xl p-3" style={{ opacity: 1 }}>
                        <div className="group relative aspect-[0.939] w-full overflow-hidden rounded-3xl">
                          <div
                            className="aspect-[0.939] w-full rounded-3xl bg-border/30 flex items-center justify-center"
                          >
                            <span className="text-muted text-sm">
                              {benefits[activeStep].title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Benefit steps */}
                <div className="w-full">
                  <div className="flex flex-col gap-2">
                    {benefits.map((benefit, index) => {
                      const isActive = index === activeStep;
                      return (
                        <button
                          key={benefit.title}
                          onClick={() => setActiveStep(index)}
                          className={`w-full rounded-2xl p-3 text-left transition-all duration-300 ${
                            isActive
                              ? "border border-border bg-background"
                              : "bg-transparent border border-transparent"
                          }`}
                          style={{ opacity: isActive ? 1 : 0.6 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`shrink-0 transition-colors duration-300 ${isActive ? benefit.activeColor : "text-zinc-400"}`}>
                              <div className="h-5 w-5">{benefit.icon}</div>
                            </div>
                            <div className="flex-1">
                              <h3
                                className={`font-medium text-lg transition-colors duration-300 ${
                                  isActive ? "text-foreground" : "text-zinc-400"
                                }`}
                              >
                                {benefit.title}
                              </h3>
                              <div
                                className="grid transition-all duration-300 ease-in-out"
                                style={{
                                  gridTemplateRows: isActive ? "1fr" : "0fr",
                                  opacity: isActive ? 1 : 0,
                                  marginTop: isActive ? 8 : 0,
                                }}
                              >
                                <div className="overflow-hidden">
                                  <p className="text-muted">{benefit.description}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
