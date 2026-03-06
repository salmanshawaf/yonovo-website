"use client";

import { useState } from "react";
import SectionBadge from "@/components/SectionBadge";

const steps = [
  {
    title: "Build & deploy your agent",
    description:
      "Train an agent on your business data, configure the actions it can take, then deploy it for your customers.",
  },
  {
    title: "Agent solves your customers\u2019 problems",
    description:
      "Your AI agent handles customer inquiries 24/7, providing instant and accurate responses.",
  },
  {
    title: "Refine & optimize",
    description:
      "Review conversations, identify gaps, and continuously improve your agent\u2019s performance.",
  },
  {
    title: "Route complex issues to a human",
    description:
      "Seamlessly hand off conversations to your support team when human expertise is needed.",
  },
  {
    title: "Review analytics & insights",
    description:
      "Track resolution rates, customer satisfaction, and other key metrics to measure impact.",
  },
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="w-full py-12 md:py-15 bg-surface">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        <div className="flex flex-col gap-4 py-4">
          {/* Header */}
          <div className="flex flex-col items-start gap-4">
            <SectionBadge label="How it works" />
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-10">
              <h2 className="font-medium text-4xl text-foreground tracking-tight lg:text-[3.5rem] lg:leading-[1.1]">
                An end-to-end solution for conversational AI
              </h2>
              <p className="max-w-[600px] text-lg text-muted">
                With Chatbase, your customers can effortlessly find answers,
                resolve issues, and take meaningful actions through seamless and
                engaging AI-driven conversations.
              </p>
            </div>
          </div>

          {/* Steps + Video */}
          <div className="grid items-center gap-8 pt-4 lg:grid-cols-2">
            {/* Left — Steps */}
            <div className="flex w-full max-w-[530px] flex-col gap-2">
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                const number = String(index + 1).padStart(2, "0");

                return (
                  <button
                    key={step.title}
                    onClick={() => setActiveStep(index)}
                    className={`w-full rounded-2xl p-6 text-left transition-all duration-300 ${
                      isActive
                        ? "border border-border bg-background"
                        : "bg-transparent border border-transparent"
                    }`}
                    style={{ opacity: isActive ? 1 : 0.6 }}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`font-medium text-lg shrink-0 transition-colors duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-gradient-from to-gradient-via bg-clip-text text-transparent"
                            : "text-muted"
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
                        {/* Grid trick for smooth height animation */}
                        <div
                          className="grid transition-all duration-300 ease-in-out"
                          style={{
                            gridTemplateRows: isActive ? "1fr" : "0fr",
                            opacity: isActive ? 1 : 0,
                            marginTop: isActive ? 8 : 0,
                          }}
                        >
                          <div className="overflow-hidden">
                            <p className="text-muted">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right — Video Placeholder */}
            <div className="relative my-4 aspect-[0.939] w-full">
              <div className="absolute inset-0 flex aspect-[0.939] w-full items-center justify-center">
                <div className="aspect-[0.939] w-full rounded-2xl p-3" style={{ opacity: 1 }}>
                  <div className="group relative aspect-[0.939] w-full overflow-hidden rounded-3xl">
                    <div
                      className="aspect-[0.939] w-full rounded-3xl bg-border/30 flex items-center justify-center"
                      style={{ objectFit: "contain", display: "block", width: "100%" }}
                    >
                      <span className="text-muted text-sm">
                        {steps[activeStep].title}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="absolute bottom-4 left-4 rounded-full bg-black/25 p-2 opacity-90 transition-opacity md:p-3 group-hover:opacity-100"
                      aria-label="Pause video"
                    >
                      <svg
                        className="h-4 w-4 md:h-6 md:w-6"
                        fill="white"
                        viewBox="0 0 24 24"
                      >
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                      </svg>
                    </button>
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
