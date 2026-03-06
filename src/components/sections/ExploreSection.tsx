"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const tabs = [
  {
    label: "Playground",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
      </svg>
    ),
  },
  {
    label: "Activity",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M6 20h0a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h0" />
        <path d="M8 2v4" /><path d="M16 2v4" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    label: "Sources",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    label: "Actions",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
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
    <section className="w-full py-12 md:py-15 bg-primary">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col items-start gap-4">
            {/* Dark variant badge */}
            <div className="inline-flex items-center rounded-full px-4 py-1.5 font-medium text-sm border border-zinc-700 text-white">
              <div className="mr-2 size-2 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to" />
              Explore
            </div>
            <h2 className="font-medium text-4xl text-white tracking-tight lg:text-[3.5rem] lg:leading-[1.1]">
              Discover the Chatbase platform
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
            <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#FB923C] via-[#F472B6] to-[#E879F9]">
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
