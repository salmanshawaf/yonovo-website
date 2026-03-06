"use client";

import { useState } from "react";
import SectionBadge from "@/components/SectionBadge";

const advantages = [
  {
    title: "Works across channels",
    description:
      "Easily integrate your AI Agent with various platforms like Slack, WhatsApp, Messenger, and web widgets, ensuring seamless functionality across all.",
  },
  {
    title: "Secure by default",
    description:
      "Your AI Agent ensures the utmost safety by refusing sensitive or unauthorized requests, keeping your data protected at all times.",
  },
  {
    title: "Enterprise quality guardrails",
    description:
      "AI-powered guardrails prevent misinformation and off-topic responses, maintaining professionalism and trust in every interaction.",
  },
  {
    title: "Handles unclear requests",
    description:
      "Your AI Agent adapts to modern conversational styles, making interactions feel natural and relatable, no matter the user\u2019s tone or slang.",
  },
  {
    title: "Enhance multilingual support",
    description:
      "Engage users globally with seamless language detection and translation, providing real-time assistance in over 80+ languages.",
  },
];

export default function AdvantagesSection() {
  const [offset, setOffset] = useState(0);
  const maxOffset = advantages.length - 3;

  const canPrev = offset > 0;
  const canNext = offset < maxOffset;

  return (
    <section className="w-full py-12 md:py-15 bg-background">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        <div className="flex w-full flex-col gap-4">
          {/* Header — centered */}
          <div className="flex flex-col items-center gap-4">
            <SectionBadge label="Advantages" />
            <h2 className="text-center font-medium text-3xl text-foreground tracking-tight md:text-[4.5rem] md:leading-[1.05]">
              Unlock the power of
              <br />
              AI-driven Agents
            </h2>
          </div>

          {/* Desktop Carousel */}
          <div className="hidden py-12 md:block">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${offset * (100 / 3)}%)` }}
              >
                {advantages.map((item) => (
                  <div key={item.title} className="w-1/3 shrink-0 px-4">
                    <div className="mb-4 flex h-full w-full flex-col">
                      {/* Image placeholder */}
                      <div className="aspect-[786/840] w-full rounded-2xl bg-surface flex items-center justify-center">
                        <span className="text-muted text-sm">{item.title}</span>
                      </div>
                      <div className="flex flex-1 flex-col justify-between gap-2 pt-6">
                        <div className="flex flex-col gap-1">
                          <h3 className="font-medium text-xl text-foreground">
                            {item.title}
                          </h3>
                          <p className="text-sm text-secondary">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setOffset((o) => Math.max(0, o - 1))}
                disabled={!canPrev}
                className="relative inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border border-border bg-background font-medium text-sm transition-colors disabled:pointer-events-none disabled:opacity-50"
                style={{ width: 48 }}
              >
                <svg width="100%" height="24" viewBox="0 0 41 24" fill="none" className="relative rotate-180" preserveAspectRatio="xMidYMid meet">
                  <path d="M12 12h18m0 0l-6-6m6 6l-6 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => setOffset((o) => Math.min(maxOffset, o + 1))}
                disabled={!canNext}
                className="relative inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border border-border bg-background font-medium text-sm transition-colors disabled:pointer-events-none disabled:opacity-50"
                style={{ width: 90 }}
              >
                <svg width="100%" height="24" viewBox="0 0 41 24" fill="none" className="relative" preserveAspectRatio="xMidYMid meet">
                  <path d="M0 12h48m0 0l-6-6m6 6l-6 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Carousel */}
          <div className="w-full py-12 md:hidden">
            <div className="relative space-y-6 overflow-hidden w-full">
              <div className="overflow-hidden">
                <div
                  className="flex touch-pan-y transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${offset * 100}%)` }}
                >
                  {advantages.map((item, index) => (
                    <div
                      key={item.title}
                      className="relative min-w-0 flex-[0_0_100%] px-4 transition-opacity duration-300"
                      style={{ opacity: index === offset ? 1 : 0.4 }}
                    >
                      <div className="mb-4 flex h-full w-full flex-col">
                        <div className="aspect-[786/840] w-full rounded-2xl bg-surface flex items-center justify-center">
                          <span className="text-muted text-sm">{item.title}</span>
                        </div>
                        <div className="flex flex-1 flex-col justify-between gap-2 pt-6">
                          <div className="flex flex-col gap-1">
                            <h3 className="font-medium text-xl text-foreground">
                              {item.title}
                            </h3>
                            <p className="text-sm text-secondary">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mobile dots */}
              <div className="flex justify-center gap-2 px-4">
                {advantages.map((item, index) => (
                  <button
                    key={item.title}
                    onClick={() => setOffset(index)}
                    className={`relative h-1 w-full overflow-hidden rounded-full ${
                      index === offset ? "bg-primary" : "bg-secondary"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
