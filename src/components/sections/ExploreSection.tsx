"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const tabs = [
  {
    label: "Dashboard",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    label: "Inbox",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </svg>
    ),
  },
  {
    label: "Customers",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Workflows",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 3v18h18" /><path d="m7 16 4-8 4 4 4-6" />
      </svg>
    ),
  },
  {
    label: "Reporting",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const stripes = Array.from({ length: 20 });

export default function ExploreSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [displayedTab, setDisplayedTab] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const next = useCallback(() => {
    setActiveTab((prev) => (prev + 1) % tabs.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [next]);

  // Update the sliding indicator position
  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      const parent = el.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        setIndicatorStyle({
          left: elRect.left - parentRect.left,
          width: elRect.width,
        });
      }
    }
  }, [activeTab]);

  // Fade out, swap content, fade in + trigger shake
  useEffect(() => {
    if (activeTab === displayedTab) return;
    setIsFading(true);
    setShakeKey((k) => k + 1);
    const timeout = setTimeout(() => {
      setDisplayedTab(activeTab);
      setIsFading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [activeTab, displayedTab]);

  return (
    <section id="explore" data-navbar-dark className="w-full py-12 md:py-15 bg-brand-blue">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col items-start gap-4">
            {/* Dark variant badge */}
            <div className="inline-flex items-center rounded-full px-4 py-1.5 font-medium text-sm border border-white/30 text-white">
              <div className="mr-2 size-2 rounded-full bg-brand-red" />
              Explore
            </div>
            <h2 className="font-medium text-4xl text-white tracking-tight lg:text-[3.5rem] lg:leading-[1.1]">
              Discover the Yonovo platform
            </h2>
          </div>

          {/* Tabs */}
          <div className="mt-8 hidden w-full md:block">
            <div className="relative z-10 inline-flex w-full items-center justify-center space-x-1 rounded-full bg-transparent px-12 pb-0.5 py-2">
              {tabs.map((tab, index) => {
                const isActive = index === activeTab;
                return (
                  <button
                    key={tab.label}
                    ref={(el) => { tabRefs.current[index] = el; }}
                    onClick={() => setActiveTab(index)}
                    className={`relative flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-1.5 pt-0 text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <span className="relative z-30 flex items-center justify-center gap-2 py-2">
                      {tab.icon}
                      {tab.label}
                    </span>
                  </button>
                );
              })}
              {/* Sliding underline indicator */}
              <span
                className="absolute bottom-[-3px] h-1 rounded-full bg-white transition-all duration-500 ease-in-out"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
              />
            </div>
          </div>

          {/* Preview Area */}
          <div
            key={shakeKey}
            className="relative mt-2 aspect-video w-full overflow-hidden rounded-2xl"
            style={{ animation: shakeKey > 0 ? "shake 0.5s ease-in-out" : "none" }}
          >
            {/* Gradient background */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-br from-gradient-from via-gradient-via to-gradient-to">
              {/* Radial overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)]" />
              {/* Vertical stripes */}
              <div className="absolute inset-0 flex w-[500px] gap-6 px-4 md:w-full">
                {stripes.map((_, i) => (
                  <div
                    key={i}
                    className="h-full w-24 lg:w-12"
                    style={{
                      background: "linear-gradient(90deg, #D9D9D903 0%, #00000033 50%, #FFFFFF03 100%)",
                      mixBlendMode: "overlay",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Content placeholder with fade + scale transition */}
            <div className="relative z-20 flex h-full w-full items-center justify-center p-10">
              <div
                className="h-full w-auto max-w-full rounded-2xl bg-background shadow-2xl flex items-center justify-center transition-all duration-500 ease-out"
                style={{
                  aspectRatio: "16/10",
                  opacity: isFading ? 0 : 1,
                  transform: isFading ? "scale(0.98)" : "scale(1)",
                }}
              >
                <div className="flex flex-col items-center gap-2 px-20">
                  <span className="text-muted text-sm font-medium">
                    {tabs[displayedTab].label} Preview
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile carousel dots */}
          <div className="flex justify-center gap-2 p-7 md:hidden">
            {tabs.map((tab, index) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(index)}
                className={`relative h-1 w-full overflow-hidden rounded-full transition-colors duration-300 ${
                  index === activeTab ? "bg-white" : "bg-zinc-800"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
