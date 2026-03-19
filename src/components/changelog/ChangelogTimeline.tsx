"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export default function ChangelogTimeline({
  count,
  children,
}: {
  count: number;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dotPositions, setDotPositions] = useState<number[]>([]);

  const measureDots = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const articles = container.querySelectorAll("article");
    const containerRect = container.getBoundingClientRect();
    const containerHeight = container.scrollHeight;

    const positions: number[] = [];
    articles.forEach((article) => {
      const articleTop = article.offsetTop;
      positions.push((articleTop / containerHeight) * 100);
    });
    setDotPositions(positions);
  }, []);

  useEffect(() => {
    measureDots();
    window.addEventListener("resize", measureDots);
    // Re-measure after a short delay to account for images loading
    const timeout = setTimeout(measureDots, 500);
    return () => {
      window.removeEventListener("resize", measureDots);
      clearTimeout(timeout);
    };
  }, [measureDots, count]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!containerRef.current) {
          ticking = false;
          return;
        }
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.35;
        const scrolled = triggerPoint - rect.top;
        const totalHeight = rect.height;
        const progress = Math.min(Math.max(scrolled / totalHeight, 0), 1);
        setScrollProgress(progress * 100);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate where the line should end (at the last dot position)
  const lastDotPosition = dotPositions.length > 0 ? dotPositions[dotPositions.length - 1] : 100;
  const fillHeight = Math.min(scrollProgress, lastDotPosition);

  return (
    <div ref={containerRef} className="relative mt-12">
      {/* Timeline track - desktop only */}
      <div className="absolute left-0 top-0 hidden h-full w-10 md:block">
        {/* Background line - only extends to last dot */}
        <div
          className="absolute left-[18px] w-[2px] rounded-full bg-border"
          style={{
            top: dotPositions[0] != null ? `${dotPositions[0]}%` : "0%",
            height: dotPositions.length > 1
              ? `${lastDotPosition - (dotPositions[0] ?? 0)}%`
              : "0%",
          }}
        />
        {/* Fill line */}
        <div
          className="absolute left-[18px] w-[2px] rounded-full bg-foreground transition-[height] duration-150 ease-out"
          style={{
            top: dotPositions[0] != null ? `${dotPositions[0]}%` : "0%",
            height: `${Math.max(fillHeight - (dotPositions[0] ?? 0), 0)}%`,
          }}
        />
        {/* Dots */}
        {dotPositions.map((pos, i) => {
          const isActive = scrollProgress >= pos;
          return (
            <div
              key={i}
              className="absolute left-[13px]"
              style={{ top: `${pos}%` }}
            >
              <div
                className={`h-3 w-3 rounded-full border-2 transition-colors duration-300 ${
                  isActive
                    ? "border-foreground bg-foreground"
                    : "border-border bg-white"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="md:pl-16">{children}</div>
    </div>
  );
}
