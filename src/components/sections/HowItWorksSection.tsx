"use client";

import { useState, useRef, useEffect } from "react";
import SectionBadge from "@/components/SectionBadge";

const steps = [
  {
    title: "Connect your books",
    description:
      "Link your accounting software and Yonovo automatically imports your invoices, customers, and aging data on your behalf.",
    video: "/videos/step-1-connect.mov",
    startTime: 0,
    endTime: 10,
  },
  {
    title: "Set your rules or let AI decide",
    description:
      "Define your own follow up workflows or let Yonovo analyze your customers and recommend the best collection strategy for you to approve.",
    video: "/videos/step-2-rules.mov",
    startTime: 6,
    endTime: 22.5,
  },
  {
    title: "Yonovo learns and improves",
    description:
      "The AI identifies what\u2019s working, spots unresponsive customers, and adapts its approach over time with your approval.",
    video: "/videos/step-3-learns.mov",
    startTime: 3,
    endTime: 14,
  },
  {
    title: "Escalate what needs a human",
    description:
      "80% of collections are handled automatically. When a customer disputes a charge or needs a real conversation, your team gets flagged instantly.",
    video: "/videos/step-4-escalate.mov",
    startTime: 2,
    endTime: 30,
  },
  {
    title: "Review your results",
    description:
      "Monitor recovery rates, DSO, at risk invoices, and time saved so you always know where your receivables stand.",
    video: "/videos/step-5-results.mov",
    startTime: 3,
    endTime: 13,
  },
];

const RING_SIZE = 64;
const STROKE = 3;
const RADIUS = (RING_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0–1
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentStep = steps[activeStep];

  // Seek to startTime when step changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentStep.video) return;

    setPaused(false);
    setProgress(0);

    const startTime = currentStep.startTime ?? 0;
    const seek = () => {
      video.currentTime = startTime;
      video.play();
    };
    video.addEventListener("loadedmetadata", seek, { once: true });
    if (video.readyState >= 1) {
      video.currentTime = startTime;
      video.play();
    }
  }, [activeStep, currentStep.video, currentStep.startTime]);

  // Track progress and handle endTime looping
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (!video.duration) return;
      const startTime = currentStep.startTime ?? 0;
      const endTime = currentStep.endTime ?? video.duration;
      const effectiveDuration = endTime - startTime;
      const elapsed = video.currentTime - startTime;

      // Loop back to startTime when endTime is reached
      if (video.currentTime >= endTime) {
        video.currentTime = startTime;
        return;
      }

      setProgress(Math.min(elapsed / effectiveDuration, 1));
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [activeStep, currentStep.startTime, currentStep.endTime]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  // progress ring: fills clockwise as video plays
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <section className="w-full py-12 md:py-15 bg-surface">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        <div className="flex flex-col gap-4 py-4">
          {/* Header */}
          <div className="flex flex-col items-start gap-4">
            <SectionBadge label="How it works" />
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-10">
              <h2 className="font-medium text-4xl text-foreground tracking-tight lg:text-[3.5rem] lg:leading-[1.1]">
                From overdue to paid in five steps
              </h2>
              <p className="max-w-[600px] text-lg text-muted">
                Yonovo takes over the entire collections process so your team
                can focus on running the business, not chasing payments.
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

            {/* Right — Video */}
            <div className="relative my-4 aspect-[0.939] w-full">
              <div className="absolute inset-0 flex aspect-[0.939] w-full items-center justify-center">
                <div className="aspect-[0.939] w-full rounded-2xl p-3" style={{ opacity: 1 }}>
                  <div className="group relative aspect-[0.939] w-full overflow-hidden rounded-3xl">
                    {currentStep.video ? (
                      <>
                        <video
                          ref={videoRef}
                          key={currentStep.video}
                          className="aspect-[0.939] w-full rounded-3xl object-contain scale-[1.08]"
                          autoPlay={currentStep.startTime === 0}
                          loop
                          muted
                          playsInline
                        >
                          <source src={currentStep.video} type="video/quicktime" />
                          <source src={currentStep.video} type="video/mp4" />
                        </video>

                        {/* Play/pause button with progress ring */}
                        <button
                          type="button"
                          onClick={togglePlayPause}
                          className="absolute bottom-4 left-4 flex items-center justify-center"
                          aria-label={paused ? "Play video" : "Pause video"}
                          style={{ width: RING_SIZE, height: RING_SIZE }}
                        >
                          {/* SVG ring */}
                          <svg
                            width={RING_SIZE}
                            height={RING_SIZE}
                            className="absolute inset-0 -rotate-90"
                            style={{ transform: "rotate(-90deg)" }}
                          >
                            {/* Track */}
                            <circle
                              cx={RING_SIZE / 2}
                              cy={RING_SIZE / 2}
                              r={RADIUS}
                              fill="rgba(0,0,0,0.25)"
                              stroke="rgba(255,255,255,0.2)"
                              strokeWidth={STROKE}
                            />
                            {/* Progress */}
                            <circle
                              cx={RING_SIZE / 2}
                              cy={RING_SIZE / 2}
                              r={RADIUS}
                              fill="none"
                              stroke="white"
                              strokeWidth={STROKE}
                              strokeDasharray={CIRCUMFERENCE}
                              strokeDashoffset={dashOffset}
                              strokeLinecap="round"
                              style={{ transition: "stroke-dashoffset 0.25s linear" }}
                            />
                          </svg>

                          {/* Icon */}
                          <svg
                            className="relative z-10"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="white"
                          >
                            {paused ? (
                              <polygon points="5,3 19,12 5,21" />
                            ) : (
                              <>
                                <rect x="14" y="4" width="4" height="16" rx="1" />
                                <rect x="6" y="4" width="4" height="16" rx="1" />
                              </>
                            )}
                          </svg>
                        </button>
                      </>
                    ) : (
                      <div className="aspect-[0.939] w-full rounded-3xl bg-border/30 flex items-center justify-center">
                        <span className="text-muted text-sm">
                          {currentStep.title}
                        </span>
                      </div>
                    )}
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
