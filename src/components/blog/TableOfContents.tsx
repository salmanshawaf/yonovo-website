"use client";

import { useState, useEffect, useRef } from "react";

type Heading = {
  id: string;
  text: string;
};

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");
  const headingElements = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        headingElements.current.set(entry.target.id, entry);
      });

      // Find the first heading that is currently visible
      const visibleHeadings: IntersectionObserverEntry[] = [];
      headingElements.current.forEach((entry) => {
        if (entry.isIntersecting) visibleHeadings.push(entry);
      });

      if (visibleHeadings.length > 0) {
        // Pick the one closest to the top
        const sorted = visibleHeadings.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        setActiveId(sorted[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-80px 0px -70% 0px",
      threshold: 0,
    });

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
        Table of Contents
      </p>
      <nav className="flex flex-col gap-1">
        {headings.map(({ id, text }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`block border-l-[3px] py-2 pl-4 text-sm leading-snug transition-colors ${
              activeId === id
                ? "border-brand-blue text-brand-blue font-medium"
                : "border-transparent text-secondary hover:text-foreground"
            }`}
          >
            {text}
          </a>
        ))}
      </nav>
    </div>
  );
}
