"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/sections/CTASection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

/* ── Data ── */

const tiers = [
  {
    name: "Discover",
    price: "Free forever",
    headline: "Finance teams exploring AR health for the first time",
    description:
      "Deep analytics tool for data discovery and benchmarking against your peers.",
    ctaType: "brand" as const,
  },
  {
    name: "Grow",
    price: "Built for: $0-$10M ARR",
    headline: "Start-ups focused on establishing best practices",
    description:
      "Insight and automation to ensure effective cash flow and protect business resources as you establish your company.",
    ctaType: "demo" as const,
  },
  {
    name: "Scale",
    price: "Built for: $10M-$50M ARR",
    headline: "Scale-ups focused on streamlining operations",
    description:
      "Build the foundations for rapid growth through best in class financial practices, to scale your business without scaling your team.",
    ctaType: "demo" as const,
  },
];

const logos = [
  { name: "Troyes", src: "/logos/troyes.png", width: 130, className: "h-[28px] lg:h-[47px]" },
  { name: "TDG Inc", src: "/logos/tdg-inc.svg", width: 200, className: "h-[65px] lg:h-[120px]" },
  { name: "SBC", src: "/logos/sbc.png", width: 200, className: "h-[50px] lg:h-[95px]" },
];

const faqItems = [
  {
    question: "How does Yonovo pricing work?",
    answer:
      "Our pricing is adapted to your company's size and needs. The Discover plan is free forever. For Grow and Scale plans, pricing is custom based on your annual revenue, number of customers, and the features you need. Contact us for a personalized quote.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Our Discover plan is completely free with no time limit. You get access to AR health analytics, aging reports, and benchmarking tools. No credit card required.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "Yonovo integrates with QuickBooks, Xero, Odoo, Sage, FreshBooks, NetSuite, Salesforce, HubSpot, and SAP.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most teams are up and running within a day. Connect your accounting software and Yonovo starts managing follow-ups immediately.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Absolutely. You can upgrade or adjust your plan at any time as your business grows. Our team will help you find the right fit.",
  },
];

/* ── Helpers ── */

function formatCurrency(value: number): string {
  return "$" + Math.round(value).toLocaleString("en-US");
}

function formatTurnover(value: number): string {
  if (value >= 1_000_000) return `$${value / 1_000_000}M`;
  return `$${value.toLocaleString("en-US")}`;
}


/* ── Page Component ── */

export default function PricingPage() {
  const [turnover, setTurnover] = useState(12_000_000);
  const [paymentDelay, setPaymentDelay] = useState(15);
  const [writeOff, setWriteOff] = useState(2.8);

  const lossLatePayments = (turnover / 12) * (paymentDelay / 30) * 0.25;
  const lossBadDebt = (turnover / 12) * (writeOff / 100);
  const totalLoss = lossLatePayments + lossBadDebt;

  return (
    <>
      {/* ── Hero + Pricing Cards (above the fold) ── */}
      <section className="w-full -mt-16 pt-36 md:pt-44 pb-16 md:pb-20 bg-background">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          {/* Hero text */}
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <h1 className="max-w-[850px] text-balance font-medium text-[42px] tracking-tight text-foreground md:text-7xl">
              Pricing adapted to your needs.
            </h1>
            <p className="text-lg text-muted">
              Take control of your accounts receivable today, and unlock your owed cash reserves.
            </p>

          </div>

          {/* Pricing Cards */}
          <div className="mt-10 md:mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="flex flex-col justify-between rounded-2xl border border-border bg-white p-7 md:p-8"
              >
                {/* Top content */}
                <div className="flex flex-col">
                  {/* Plan name */}
                  <p className="text-base font-semibold uppercase tracking-[0.2em] text-foreground md:text-lg">
                    {tier.name}
                  </p>

                  {/* Price / audience */}
                  <p className="mt-8 text-sm font-medium text-brand-blue">
                    {tier.price}
                  </p>

                  {/* Headline */}
                  <h3 className="mt-2 font-semibold text-lg text-foreground text-balance md:text-xl">
                    {tier.headline}
                  </h3>

                  {/* Description */}
                  <p className="mt-8 text-sm text-secondary leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* CTA — pinned to bottom */}
                <div className="mt-10 flex flex-col items-center gap-2">
                  {tier.ctaType === "brand" ? (
                    <Link href="/book-demo" className="w-full">
                      <Button
                        variant="brand"
                        size="md"
                        className="w-full justify-center h-14"
                      >
                        Book Demo
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      href="/book-demo"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-white px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface h-14"
                    >
                      Book a Demo
                    </Link>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="w-full bg-background py-6 md:py-8">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex w-full flex-col items-center gap-0">
            <p className="text-center font-medium text-base text-zinc-500">
              Trusted by teams who hate chasing payments
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
      </section>

      {/* ── Unlock Cash Reserves Calculator ── */}
      <section className="w-full bg-background py-12 md:py-15">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col items-center gap-4 mb-12 md:mb-16">
            <h2 className="max-w-[850px] text-balance font-medium text-[42px] tracking-tight text-foreground md:text-7xl text-center">
              Unlock your owed cash reserves.
            </h2>
            <p className="text-center text-lg text-muted">
              See how much cash you can unlock from your customers today with Yonovo.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 max-w-[960px] mx-auto">
            {/* Left — Sliders */}
            <div className="rounded-2xl border border-border bg-white p-6 md:p-8 flex flex-col gap-8">
              {/* Annual turnover */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Annual turnover</span>
                  <span className="text-sm font-medium text-brand-blue">
                    {formatTurnover(turnover)}
                  </span>
                </div>
                <input
                  type="range"
                  min={1_000_000}
                  max={100_000_000}
                  step={1_000_000}
                  value={turnover}
                  onChange={(e) => setTurnover(Number(e.target.value))}
                  className="w-full accent-brand-blue h-2 rounded-full cursor-pointer"
                />
              </div>

              {/* Average payment delay */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Average payment delay</span>
                  <span className="text-sm font-medium text-brand-blue">
                    {paymentDelay} days
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={90}
                  step={1}
                  value={paymentDelay}
                  onChange={(e) => setPaymentDelay(Number(e.target.value))}
                  className="w-full accent-brand-blue h-2 rounded-full cursor-pointer"
                />
              </div>

              {/* Percentage write-off */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Percentage write-off</span>
                  <span className="text-sm font-medium text-brand-blue">
                    {writeOff.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={10}
                  step={0.1}
                  value={writeOff}
                  onChange={(e) => setWriteOff(Number(e.target.value))}
                  className="w-full accent-brand-blue h-2 rounded-full cursor-pointer"
                />
              </div>
            </div>

            {/* Right — Results */}
            <div className="rounded-2xl bg-brand-blue p-6 md:p-8 text-white flex flex-col">
              <p className="text-sm text-white/70">Total estimated loss</p>
              <p className="mt-2 font-medium text-5xl tracking-tight md:text-6xl">
                {formatCurrency(totalLoss)}
              </p>
              <p className="mt-1 text-sm text-white/70">/ month</p>

              <div className="my-6 h-px bg-white/20" />

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Loss due to late payments</span>
                  <span className="text-sm font-medium text-white">
                    {formatCurrency(lossLatePayments)} / month
                  </span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Loss due to bad debt</span>
                  <span className="text-sm font-medium text-white">
                    {formatCurrency(lossBadDebt)} / month
                  </span>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  Want to get a more accurate estimate and learn how to reduce these costs?
                </p>
                <Link
                  href="/book-demo"
                  className="block w-full rounded-xl bg-white/20 px-6 py-3 text-sm font-medium text-white text-center transition-colors hover:bg-white/30"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <h2 className="font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px] mb-8 md:mb-12">
            FAQs
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* ── Testimonials ── */}
      <TestimonialsSection />

      {/* ── CTA ── */}
      <CTASection />
    </>
  );
}
