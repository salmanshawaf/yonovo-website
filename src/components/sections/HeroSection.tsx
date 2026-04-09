"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

const logos = [
  { name: "Troyes", src: "/logos/troyes.png", width: 130, className: "h-[37px] lg:h-[47px]" },
  { name: "TDG Inc", src: "/logos/tdg-inc.svg", width: 200, className: "h-[95px] lg:h-[120px]" },
  { name: "SBC", src: "/logos/sbc.png", width: 200, className: "h-[75px] lg:h-[95px]" },
];

const HERO_START = 0;
const HERO_END = 10;

const RING_SIZE = 45;
const STROKE = 2.5;
const RADIUS = (RING_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function HeroSection() {
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Seek to startTime on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const seek = () => {
      video.currentTime = HERO_START;
      video.play();
    };
    video.addEventListener("loadedmetadata", seek, { once: true });
    if (video.readyState >= 1) {
      video.currentTime = HERO_START;
      video.play();
    }
  }, []);

  // Track progress and handle endTime looping
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (!video.duration) return;
      const effectiveDuration = HERO_END - HERO_START;
      const elapsed = video.currentTime - HERO_START;

      if (video.currentTime >= HERO_END) {
        video.currentTime = HERO_START;
        return;
      }

      setProgress(Math.min(elapsed / effectiveDuration, 1));
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

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

  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <section
      id="hero"
      className="relative w-full -mt-16 pt-28 md:pt-32 pb-10 md:pb-12"
      style={{ background: "white url('/hero-gradient-bg.webp') center top / 100% 90% no-repeat" }}
    >
      {/* Dark area marker — covers the visually dark portion of the gradient (ends near video bottom) */}
      <div data-navbar-dark className="pointer-events-none absolute inset-x-0 top-0 h-[76%]" aria-hidden="true" />
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />
      <div className="mx-auto max-w-(--container-max-width) px-6">
        <div className="relative flex w-full flex-col gap-12 overflow-hidden">
          {/* Hero Grid */}
          <div className="relative mx-auto grid w-full items-center gap-6 px-4 lg:grid-cols-2">
            {/* Left — Text Content */}
            <div className="flex flex-col gap-6">
              <h1 className="font-medium text-[32px] text-white leading-[1.2] tracking-tight md:text-[38px] lg:text-[4.095rem] lg:leading-[1.2] lg:tracking-normal">
                Automate your<br /><span className="md:whitespace-nowrap">accounts receivable.</span><br />Get paid&nbsp;faster.
              </h1>
              <p className="text-[15px] text-white/70 leading-[1.6] md:text-xl lg:w-[75%]">
                Yonovo follows up by email, text, and phone on every invoice until they&apos;re paid.
              </p>
              <div className="mt-2 flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                  <Link href="/book-demo" className="w-full sm:w-auto">
                    <Button variant="brand" size="md" className="h-14 w-full px-[46px] text-lg font-medium sm:w-auto">
                      Book Demo
                    </Button>
                  </Link>
                  <Link href="https://dashboard.yonovo.ai/login" className="w-full sm:w-auto">
                    <Button variant="ghost-light" size="md" className="h-14 w-full sm:w-auto">
                      Start Free
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-brand-blue">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 16 17">
                    <path d="M14.66 6.5H1.33M14.66 6.5c0 .28 0 .59 0 .94V9.5M14.66 6.5c-.01-.9-.06-1.44-.29-1.88a2.67 2.67 0 0 0-1.16-1.16C12.63 3.17 11.89 3.17 10.39 3.17H5.59c-1.49 0-2.24 0-2.81.29a2.67 2.67 0 0 0-1.16 1.16c-.22.44-.28.98-.29 1.88M1.33 6.5c0 .28 0 .59 0 .94v2.13c0 1.49 0 2.24.29 2.81.26.5.67.91 1.17 1.17.57.29 1.31.29 2.81.29h2.51M5.99 9.17H3.99" />
                    <path d="M11.25 14.58l1.41-1.41m0 0l1.42-1.42m-1.42 1.42l-1.41-1.42m1.41 1.42l1.42 1.42" />
                  </svg>
                  No card required
                </div>
                <div className="mt-1 flex items-center gap-3 hidden">
                  <span className="text-[13px] text-white/50">Works with</span>
                  <Image src="/logos/quickbooks.png" alt="QuickBooks" width={120} height={29} className="h-6 w-auto brightness-0 invert opacity-60" />
                  <Image src="/logos/xero.png" alt="Xero" width={29} height={29} className="h-6 w-auto brightness-0 invert opacity-60" />
                </div>
              </div>
            </div>

            {/* Right — Dashboard Preview */}
            <div id="hero-video" className="group relative aspect-[0.939] w-full overflow-hidden rounded-3xl">
              <video
                ref={videoRef}
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover object-top"
              >
                <source src="/hero-video.mov" type="video/quicktime" />
                <source src="/hero-video.mov" type="video/mp4" />
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
                  width="13"
                  height="13"
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
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex w-full flex-col items-center gap-0">
            <p className="font-medium text-base text-zinc-500">
              Trusted by finance teams who hate chasing payments
            </p>
            <div className="w-full -mt-5">
              <div className="flex items-center justify-center gap-10">
                {logos.map((logo) => (
                  <Image
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={48}
                    className={`w-auto grayscale opacity-60 ${logo.className}`}
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
