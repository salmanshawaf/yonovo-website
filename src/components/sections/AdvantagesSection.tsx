"use client";

import { useState, type ReactNode } from "react";
import SectionBadge from "@/components/SectionBadge";

/* ─── Recommendation Card sub-component ─── */
function RecommendationCard({
  label,
  labelColor,
  text,
  buttonText,
}: {
  label: string;
  labelColor: string;
  text: string;
  buttonText: string;
}) {
  return (
    <div className="rounded-xl border border-[#e5e4e0] bg-white p-4 flex flex-col gap-2.5">
      <div className="flex items-start justify-between">
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${labelColor}`}>{label}</span>
        <svg className="h-3.5 w-3.5 text-[#c0bfbb]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </div>
      <p className="text-[12.5px] text-[#3a3a38] leading-[1.5]">{text}</p>
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center rounded-lg bg-brand-navy px-3 py-1.5 text-[11px] font-medium text-white">{buttonText}</span>
        <span className="text-[11px] text-[#b0afab]">Why?</span>
      </div>
    </div>
  );
}

/* ─── "Actually does the work" Mockup ─── */
function ActuallyDoesTheWorkMockup() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden" style={{ backgroundColor: '#f5f4ef' }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-navy text-[11px] font-bold text-white">Y</span>
        <span className="font-semibold text-[13px] text-foreground">Yonovo recommends</span>
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#e8e7e3] text-[11px] font-medium text-[#6b6b68]">2</span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3 px-4 pb-4">
        <RecommendationCard
          label="CUSTOMER"
          labelColor="text-brand-navy"
          text="$180K/year account with one invoice overdue. Hold escalation and send a softer check-in."
          buttonText="Send Check-in"
        />
        <RecommendationCard
          label="STRATEGY"
          labelColor="text-[#c47a20]"
          text="SMS before a call makes customers 2.4x more likely to answer. Add a text step before Day 14 calls."
          buttonText="Add SMS at Day 12"
        />
      </div>
    </div>
  );
}

/* ─── "Enterprise quality guardrails" Mockup ─── */
function GuardrailsMockup() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden" style={{ backgroundColor: '#f5f4ef' }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-3">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8e7e3]">
          <svg className="h-3.5 w-3.5 text-[#8a8a87]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <span className="font-semibold text-[13px] text-foreground">Follow-up Draft</span>
        <span className="text-[10px] text-[#8a8a87]">·</span>
        <span className="text-[10px] text-[#8a8a87]">Invoice #2041</span>
        <span className="text-[10px] text-[#8a8a87]">·</span>
        <span className="inline-flex items-center rounded-full bg-[#fce8e8] px-2 py-0.5 text-[9px] font-medium text-[#c53030]">34 days overdue</span>
      </div>

      {/* Blocked message */}
      <div className="mx-4 mb-3 rounded-xl border border-[#e8c4c4] bg-[#fdf5f5] p-3.5">
        <div className="flex items-center gap-1.5 mb-2">
          <svg className="h-3.5 w-3.5 text-[#c53030] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" /></svg>
          <span className="text-[10px] font-semibold text-[#c53030] uppercase tracking-wider">Blocked</span>
        </div>
        <p className="text-[11.5px] text-[#9b7a7a] leading-[1.5] line-through decoration-[#c53030]/30">
          &ldquo;This is your final notice. Failure to pay within 5 business days will result in legal action and collections referral.&rdquo;
        </p>
      </div>

      {/* Approved message */}
      <div className="mx-4 mb-3 rounded-xl border border-[#b8e0c4] bg-[#f3fbf5] p-3.5">
        <div className="flex items-center gap-1.5 mb-2">
          <svg className="h-3.5 w-3.5 text-[#2d8a4e] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
          <span className="text-[10px] font-semibold text-[#2d8a4e] uppercase tracking-wider">Adjusted to Friendly tone</span>
        </div>
        <p className="text-[11.5px] text-[#3a3a38] leading-[1.5]">
          &ldquo;Hi Sarah, just circling back on invoice #2041. We&apos;d love to get this resolved. Is there anything holding things up on your end?&rdquo;
        </p>
      </div>

      {/* Status bar */}
      <div className="mx-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#2d8a4e]" />
        <span className="text-[10px] text-[#6b6b68] font-medium">Tone: Friendly</span>
        <span className="text-[10px] text-[#c0bfbb]">·</span>
        <span className="text-[10px] text-[#6b6b68]">No legal language</span>
      </div>
    </div>
  );
}

/* ─── Customer row for industries mockup ─── */
function CustomerRow({ name, industry, industryColor, terms, tone, toneColor }: {
  name: string; industry: string; industryColor: string; terms: string; tone: string; toneColor: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#e5e4e0] bg-white px-4 py-3.5">
      <div className="flex flex-col gap-1">
        <span className="text-[12.5px] font-semibold text-foreground">{name}</span>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-medium ${industryColor}`}>{industry}</span>
          <span className="text-[10px] text-[#8a8a87]">{terms}</span>
        </div>
      </div>
      <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[10px] font-medium ${toneColor}`}>{tone}</span>
    </div>
  );
}

/* ─── "Works across industries" Mockup ─── */
function IndustriesMockup() {
  return (
    <div className="flex h-full w-full flex-col justify-center overflow-hidden px-4" style={{ backgroundColor: '#f5f4ef' }}>
      <div className="flex flex-col gap-2.5">
        <CustomerRow
          name="Maple Creek Manufacturing"
          industry="Manufacturing"
          industryColor="bg-[#e8f0fe] text-[#1a56db]"
          terms="Net-60"
          tone="Friendly"
          toneColor="bg-[#dcf5e0] text-[#2d8a4e]"
        />
        <CustomerRow
          name="Summit Legal Group"
          industry="Professional Services"
          industryColor="bg-[#f3e8ff] text-[#7c3aed]"
          terms="Net-30"
          tone="Clean"
          toneColor="bg-[#e8e7e3] text-[#3a3a38]"
        />
        <CustomerRow
          name="Pacific Coast Distribution"
          industry="Distribution"
          industryColor="bg-[#fef3c7] text-[#b45309]"
          terms="Net-45"
          tone="Firm"
          toneColor="bg-[#fee2e2] text-[#c53030]"
        />
      </div>
    </div>
  );
}

/* ─── "Handles the edge cases" Mockup ─── */
function EdgeCasesMockup() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden" style={{ backgroundColor: '#f5f4ef' }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-3">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fef3c7]">
          <svg className="h-3.5 w-3.5 text-[#b45309]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <span className="font-semibold text-[13px] text-foreground">Dispute flagged</span>
        <span className="text-[10px] text-[#8a8a87]">·</span>
        <span className="text-[10px] text-[#8a8a87]">Invoice #3087</span>
      </div>

      {/* Customer name */}
      <div className="px-4 pb-2">
        <span className="text-[11px] font-medium text-[#6b6b68]">Maple Creek Manufacturing</span>
      </div>

      {/* What happened */}
      <div className="mx-4 mb-3 rounded-xl border border-[#e5e4e0] bg-white p-3.5">
        <p className="text-[10px] font-semibold text-[#8a8a87] uppercase tracking-wider mb-1.5">What happened</p>
        <p className="text-[11.5px] text-[#3a3a38] leading-[1.5]">
          Customer claims goods arrived damaged. Partial payment of $1,200 received on a $3,400 invoice.
        </p>
      </div>

      {/* Context */}
      <div className="mx-4 mb-3 rounded-xl border border-[#e5e4e0] bg-white p-3.5">
        <p className="text-[10px] font-semibold text-[#8a8a87] uppercase tracking-wider mb-1.5">Context</p>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#8a8a87]" />
            <span className="text-[11px] text-[#3a3a38]">3 year customer, $420K lifetime value</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#8a8a87]" />
            <span className="text-[11px] text-[#3a3a38]">First dispute on record</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#8a8a87]" />
            <span className="text-[11px] text-[#3a3a38]">Remaining balance: $2,200</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 flex items-center gap-3">
        <span className="inline-flex items-center rounded-lg bg-brand-navy px-3 py-1.5 text-[11px] font-medium text-white">Route to team</span>
        <span className="text-[11px] text-[#b0afab]">Dismiss</span>
      </div>
    </div>
  );
}

/* ─── "Fits into your existing process" Mockup ─── */
function FitsInMockup() {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden" style={{ backgroundColor: '#f5f4ef' }}>
      <div className="relative flex items-center justify-center" style={{ width: 240, height: 240 }}>
        {/* Center — Yonovo icon */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-navy shadow-lg">
          <span className="text-2xl font-bold text-white">Y</span>
        </div>

        {/* Connector lines (drawn from center to each spoke) */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 240 240">
          {/* Top */}
          <line x1="120" y1="88" x2="120" y2="44" stroke="#c0bfbb" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Bottom */}
          <line x1="120" y1="152" x2="120" y2="196" stroke="#c0bfbb" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Left */}
          <line x1="88" y1="120" x2="44" y2="120" stroke="#c0bfbb" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Right */}
          <line x1="152" y1="120" x2="196" y2="120" stroke="#c0bfbb" strokeWidth="1.5" strokeDasharray="4 3" />
        </svg>

        {/* Top — QuickBooks */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e4e0] bg-white shadow-sm">
          <img src="/logos/quickbooks-icon.png" alt="QuickBooks" className="h-6 w-6 object-contain" />
        </div>

        {/* Bottom — Xero */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e4e0] bg-white shadow-sm">
          <img src="/logos/xero.png" alt="Xero" className="h-6 w-6 object-contain" />
        </div>

        {/* Left — Sage */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e4e0] bg-white shadow-sm">
          <img src="/logos/sage-icon.svg" alt="Sage" className="h-6 w-6 object-contain" />
        </div>

        {/* Right — NetSuite */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e4e0] bg-white shadow-sm">
          <img src="/logos/netsuite-icon.svg" alt="NetSuite" className="h-6 w-6 object-contain" />
        </div>

        {/* "Connected" badge below center */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 176 }}>
          <div className="flex items-center gap-1.5 rounded-full bg-white border border-[#e5e4e0] px-2.5 py-1 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2d8a4e]" />
            <span className="text-[9px] font-medium text-[#3a3a38]">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const advantages = [
  {
    title: "Actually does the work",
    description:
      "Traditional AR software gives you dashboards. Yonovo gives you results. Complete workflows executed across email, SMS, and voice without manual effort.",
    renderContent: () => <ActuallyDoesTheWorkMockup />,
  },
  {
    title: "Works across industries",
    description:
      "Manufacturing, wholesale, distribution, or professional services. Yonovo adapts to match your customer types and communication styles.",
    renderContent: () => <IndustriesMockup />,
  },
  {
    title: "Enterprise quality guardrails",
    description:
      "Every message stays within professional boundaries. Nothing aggressive, legally risky, or inappropriate gets sent regardless of how overdue an invoice is.",
    renderContent: () => <GuardrailsMockup />,
  },
  {
    title: "Handles the edge cases",
    description:
      "Disputes, partial payments, and unusual situations are flagged and routed to your team with full context so nothing gets mishandled.",
    renderContent: () => <EdgeCasesMockup />,
  },
  {
    title: "Fits into your existing process",
    description:
      "No need to change how your team works or learn a new system. Yonovo plugs in and handles the follow ups your team doesn\u2019t have time for.",
    renderContent: () => <FitsInMockup />,
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
            <h2 className="text-center font-medium text-3xl text-foreground tracking-tight md:text-5xl lg:text-6xl">
              Not your typical
              <br />
              AR software
            </h2>
          </div>

          {/* Desktop Carousel */}
          <div className="hidden py-8 md:block">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${offset * (100 / 3)}%)` }}
              >
                {advantages.map((item) => (
                  <div key={item.title} className="w-1/3 shrink-0 px-4">
                    <div className="mb-4 flex h-full w-full flex-col">
                      {/* Image or custom content */}
                      <div className="aspect-[786/840] w-full rounded-2xl overflow-hidden" style={{ backgroundColor: '#f5f4ef' }}>
                        {item.renderContent ? item.renderContent() : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="text-muted text-sm">{item.title}</span>
                          </div>
                        )}
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
                        <div className="aspect-[786/840] w-full rounded-2xl overflow-hidden" style={{ backgroundColor: '#f5f4ef' }}>
                          {item.renderContent ? item.renderContent() : (
                            <div className="flex h-full w-full items-center justify-center">
                              <span className="text-muted text-sm">{item.title}</span>
                            </div>
                          )}
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
