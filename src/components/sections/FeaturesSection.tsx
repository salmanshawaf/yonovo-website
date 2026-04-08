import Image from "next/image";
import type { ReactNode } from "react";
import SectionBadge from "@/components/SectionBadge";

/* ─── Voice Call Mockup (AI voice calls card) ─── */
function VoiceCallMockup() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden text-left" style={{ backgroundColor: '#f5f4ef' }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8e7e3]">
          <svg className="h-3.5 w-3.5 text-[#8a8a87]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>
        <span className="font-semibold text-[13px] text-foreground">Pied Piper</span>
        <span className="inline-flex items-center rounded-full bg-[#dcf5e0] px-2 py-0.5 text-[9px] font-medium text-[#2d8a4e]">Answered</span>
        <span className="ml-auto text-[9px] text-[#8a8a87]">21h ago</span>
      </div>

      {/* Recording bar */}
      <div className="mx-4 mb-3 flex items-center gap-2 rounded-lg bg-[#eae9e5] px-2.5 py-1.5">
        <svg className="h-3.5 w-3.5 text-[#6b6b68] shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        <span className="text-[9px] text-[#6b6b68] font-medium">0:00 / 0:38</span>
        <div className="flex-1 h-1 rounded-full bg-[#d4d3cf]" />
        <svg className="h-3.5 w-3.5 text-[#6b6b68] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" /></svg>
      </div>

      {/* Transcript */}
      <div className="mx-4 flex flex-col gap-2.5 flex-1">
        <p className="text-[9px] text-[#8a8a87] uppercase tracking-wider font-medium">Transcript</p>
        <div className="flex flex-col gap-2.5">
          <div className="flex gap-2.5">
            <span className="text-[11px] font-semibold text-foreground w-[54px] shrink-0">Yonovo AI</span>
            <p className="text-[11px] text-[#6b6b68] leading-[1.5]">Hi, this is the accounts team at Acme Corp. I&apos;m calling about an outstanding invoice. Do you have a moment?</p>
          </div>
          <div className="flex gap-2.5">
            <span className="text-[11px] font-semibold text-foreground w-[54px] shrink-0">Customer</span>
            <p className="text-[11px] text-[#6b6b68] leading-[1.5]">Sure, which invoice is this about?</p>
          </div>
          <div className="flex gap-2.5">
            <span className="text-[11px] font-semibold text-foreground w-[54px] shrink-0">Yonovo AI</span>
            <p className="text-[11px] text-[#6b6b68] leading-[1.5]">It&apos;s invoice #1042 for $2,400, originally due February 15th. Just wanted to see if everything&apos;s good on your end.</p>
          </div>
          <div className="flex gap-2.5">
            <span className="text-[11px] font-semibold text-foreground w-[54px] shrink-0">Customer</span>
            <p className="text-[11px] text-[#6b6b68] leading-[1.5]">Oh yeah, that one&apos;s been sitting on my desk. I&apos;ll get it sent over this week.</p>
          </div>
          <div className="flex gap-2.5">
            <span className="text-[11px] font-semibold text-foreground w-[54px] shrink-0">Yonovo AI</span>
            <p className="text-[11px] text-[#6b6b68] leading-[1.5]">Sounds good. I&apos;ll make a note and check back if we haven&apos;t received it by Friday. Appreciate it!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const topFeatures = [
  {
    title: "Reach customers on every channel",
    description:
      "Follow up on overdue invoices by email, SMS, and AI powered voice calls automatically. Each channel escalates based on your rules so no invoice gets forgotten.",
    imageRatio: "aspect-[1216/696]",
    image: "/images/feature-multichannel.png",
    imageClassName: "scale-[1.02]",
  },
  {
    title: "Smart workflows that run for you",
    description:
      "Build collection sequences with escalation rules, timing delays, and channel preferences or let the AI recommend the best approach based on your customer data.",
    imageRatio: "aspect-[1216/696]",
    image: "/images/feature-workflows-v2.png",
  },
];

const bottomFeatures = [
  {
    title: "AI voice calls",
    description:
      "Automatically call overdue customers with a natural sounding AI agent that logs every conversation.",
    imageRatio: "aspect-[794/860]",
    image: "",
    renderContent: () => <VoiceCallMockup />,
  },
  {
    title: "Customer intelligence",
    description:
      "Complete customer profiles with payment history and relationship context for every follow up.",
    imageRatio: "aspect-[794/860]",
    image: "/images/feature-customer-intel-v2.png",
  },
  {
    title: "Escalation rules",
    description:
      "Define when an invoice moves from friendly reminder to firm follow up to human handoff.",
    imageRatio: "aspect-[794/860]",
    image: "/images/feature-escalation.png",
    imageClassName: "scale-[1.08]",
  },
];

const integrations = [
  { name: "QuickBooks", logo: "/logos/quickbooks-icon.png" },
  { name: "Xero", logo: "/logos/xero.png" },
  { name: "Sage", logo: "/logos/sage-icon.svg" },
  { name: "Odoo", logo: "/logos/odoo-icon.svg" },
  { name: "FreshBooks", logo: "/logos/freshbooks-icon.png" },
];

const integrations2 = [
  { name: "NetSuite", logo: "/logos/netsuite-icon.svg" },
  { name: "Salesforce", logo: "/logos/salesforce-icon.webp" },
  { name: "HubSpot", logo: "/logos/hubspot-icon.png" },
  { name: "SAP", logo: "/logos/sap-icon.webp" },
  { name: "WhatsApp", logo: "/logos/whatsapp-icon.png", iconClassName: "h-7 w-7 object-contain" },
];

const bottomItems = [
  {
    title: "Always learning",
    description:
      "Adapts follow up strategies based on what\u2019s working across your customer base.",
    icon: (
      <svg className="h-5 w-5 shrink-0 text-brand-red" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M16 7h6v6" /><path d="m22 7-8.5 8.5-5-5L2 17" />
      </svg>
    ),
  },
  {
    title: "Sends from your email",
    description: "Every message goes out from your domain so customers see a name they trust.",
    icon: (
      <svg className="h-5 w-5 shrink-0 text-brand-red" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    title: "Built for scale",
    description:
      "Whether you have 50 invoices or 5,000, the system runs the same.",
    icon: (
      <svg className="h-5 w-5 shrink-0 text-brand-red" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" />
      </svg>
    ),
  },
];

function FeatureCard({
  title,
  description,
  imageRatio,
  image,
  imageClassName,
  renderContent,
}: {
  title: string;
  description: string;
  imageRatio: string;
  image?: string;
  imageClassName?: string;
  renderContent?: () => ReactNode;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border transition-all duration-300 bg-background hover:border-secondary/40">
      <div className="w-full">
        <div className="w-full rounded-2xl px-4 pt-4">
          <div className={`relative ${imageRatio} w-full rounded-t-xl overflow-hidden`} style={{ backgroundColor: '#f5f4ef' }}>
            {renderContent ? (
              renderContent()
            ) : image ? (
              <Image src={image} alt={title} fill className={`object-contain ${imageClassName || ''}`} />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-surface">
                <span className="text-muted text-sm">{title}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5 pb-5">
        <h3 className="font-medium text-lg text-foreground leading-[21.78px] tracking-[-0.02em]">
          {title}
        </h3>
        <p className="text-[14px] text-secondary leading-[22px] tracking-[-0.02em]">
          {description}
        </p>
      </div>
    </div>
  );
}

function IntegrationPill({ name, logo, iconClassName }: { name: string; logo: string; iconClassName?: string }) {
  return (
    <div className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-surface p-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background">
        <img src={logo} alt={name} className={iconClassName || "h-5 w-5 object-contain"} />
      </div>
      <div className="pr-2 font-medium text-sm text-foreground">{name}</div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-15 bg-surface">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col items-start gap-4">
            <SectionBadge label="Features" />
            <h2 className="font-medium text-4xl text-foreground tracking-tight lg:text-[3.5rem] lg:leading-[1.1]">
              Everything you need to collect smarter
            </h2>
            <p className="max-w-[720px] text-lg text-muted">
              Yonovo gives you all the tools your finance team needs to automate
              collections, protect relationships, and recover revenue faster.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-8 py-12">
            {/* Top Row — 2 columns */}
            <div className="grid gap-8 md:grid-cols-2">
              {topFeatures.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>

            {/* Bottom Row — 3 columns */}
            <div className="grid gap-8 md:grid-cols-3">
              {bottomFeatures.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>

            {/* Integrations Bar */}
            <div className="overflow-hidden rounded-3xl border border-border bg-background">
              <div className="hidden md:flex md:items-start md:justify-between md:p-8 md:pr-0">
                <div className="flex flex-col gap-2 shrink-0">
                  <h3 className="font-medium text-lg text-foreground leading-[21.78px] tracking-[-0.02em]">
                    Works with your tools
                  </h3>
                  <p className="max-w-[400px] text-[14px] text-secondary leading-[22px] tracking-[-0.02em]">
                    Connect your existing accounting and business software to sync
                    invoices, customers, and payment data in real time.
                  </p>
                </div>
                <div className="relative flex max-h-[180px] max-w-[60%] flex-col gap-3 overflow-hidden">
                  <div className="flex gap-3">
                    {integrations.map((item) => (
                      <IntegrationPill key={item.name} {...item} />
                    ))}
                  </div>
                  <div className="ml-8 flex gap-3">
                    {integrations2.map((item) => (
                      <IntegrationPill key={item.name} {...item} />
                    ))}
                  </div>
                </div>
              </div>
              {/* Mobile */}
              <div className="md:hidden p-6">
                <div className="flex flex-wrap gap-3 mb-6">
                  {[...integrations, ...integrations2].map((item) => (
                    <IntegrationPill key={item.name} {...item} />
                  ))}
                </div>
                <h3 className="font-medium text-lg text-foreground leading-[21.78px] tracking-[-0.02em]">
                  Works with your tools
                </h3>
                <p className="max-w-[400px] text-[14px] text-secondary leading-[22px] tracking-[-0.02em] mt-2">
                  Connect your existing accounting and business software to sync
                  invoices, customers, and payment data in real time.
                </p>
              </div>
            </div>

            {/* Bottom Features Row */}
            <div className="grid w-full grid-cols-1 md:grid-cols-3 items-start gap-8 md:gap-16">
              {bottomItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  {item.icon}
                  <div>
                    <h3 className="font-medium text-sm text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
