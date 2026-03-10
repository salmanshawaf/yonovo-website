"use client";

import { useState } from "react";

type FAQItem = { question: string; answer: string };

function FAQRow({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-t border-border first:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full flex-1 items-center justify-between text-balance px-0 py-4 text-start text-foreground transition-all cursor-pointer"
      >
        {item.question}
        <div className="rounded-lg border border-border p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`block size-5 shrink-0 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-200"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden text-secondary">
          <div className="max-w-full space-y-2 pb-4 pt-0 lg:max-w-[75%]">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-b border-t border-border">
      {items.map((item, i) => (
        <FAQRow
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
