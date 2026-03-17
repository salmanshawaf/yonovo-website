"use client";

import { useState, useEffect } from "react";

type Heading = {
  id: string;
  text: string;
};

export default function MobileToc({ headings }: { headings: Heading[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (headings.length === 0) return null;

  return (
    <div
      className={`fixed top-16 left-0 right-0 z-40 border-b border-border bg-white/95 backdrop-blur-sm transition-transform duration-300 lg:hidden ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-3 text-sm font-medium text-foreground"
      >
        <span>On this page</span>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="max-h-64 overflow-y-auto border-t border-border px-6 py-3">
          <ul className="space-y-1">
            {headings.map(({ id, text }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
