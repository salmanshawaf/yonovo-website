"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";

/* DSO = (Accounts Receivable / Total Credit Sales) x Number of Days */

const fmtUSD = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);

const fmtDays = (n: number) =>
  Number.isFinite(n) ? `${Math.round(n * 10) / 10}` : "0";

function benchmark(dso: number): { label: string; tone: string } {
  if (!Number.isFinite(dso) || dso <= 0) return { label: "Enter your numbers", tone: "text-white/60" };
  if (dso <= 30) return { label: "Excellent", tone: "text-brand-green" };
  if (dso <= 45) return { label: "Healthy", tone: "text-brand-green" };
  if (dso <= 60) return { label: "Room to improve", tone: "text-yellow-300" };
  return { label: "High — cash is stuck", tone: "text-brand-red" };
}

type NumField = { label: string; value: string; onChange: (v: string) => void; prefix?: string; suffix?: string; hint?: string };

function Field({ label, value, onChange, prefix, suffix, hint }: NumField) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-medium text-sm text-foreground">{label}</span>
      <div className="flex items-center rounded-lg border border-border bg-background focus-within:border-brand-blue transition-colors">
        {prefix && <span className="pl-3 text-secondary">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          min={0}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3 py-3 text-foreground outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {suffix && <span className="pr-3 text-secondary">{suffix}</span>}
      </div>
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
  );
}

export default function DSOCalculator() {
  const [ar, setAr] = useState("420000");
  const [sales, setSales] = useState("3000000");
  const [days, setDays] = useState("365");
  const [targetDso, setTargetDso] = useState("40");

  const { dso, dailySales, cashFreed, annualInterest } = useMemo(() => {
    const arN = parseFloat(ar) || 0;
    const salesN = parseFloat(sales) || 0;
    const daysN = parseFloat(days) || 0;
    const targetN = parseFloat(targetDso) || 0;

    const dso = salesN > 0 && daysN > 0 ? (arN / salesN) * daysN : 0;
    const dailySales = daysN > 0 ? salesN / daysN : 0;
    const cashFreed = Math.max(0, (dso - targetN) * dailySales);
    // illustrative cost of capital on the freed cash (10% APR)
    const annualInterest = cashFreed * 0.1;
    return { dso, dailySales, cashFreed, annualInterest };
  }, [ar, sales, days, targetDso]);

  const bm = benchmark(dso);

  return (
    <div className="grid w-full gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      {/* Inputs */}
      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 md:p-8">
        <Field label="Accounts receivable" prefix="$" value={ar} onChange={setAr} hint="Current outstanding receivables (or average over the period)." />
        <Field label="Total credit sales" prefix="$" value={sales} onChange={setSales} hint="Revenue billed on terms over the period below." />
        <Field label="Period" suffix="days" value={days} onChange={setDays} hint="365 for a year, 90 for a quarter, 30 for a month." />
        <Field label="Target DSO" suffix="days" value={targetDso} onChange={setTargetDso} hint="The DSO you want to hit. See how much cash that frees up." />
      </div>

      {/* Results */}
      <div className="flex flex-col gap-6 rounded-2xl bg-brand-navy p-6 text-white md:p-8">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-white/60">Your DSO</span>
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-6xl tracking-tight">{fmtDays(dso)}</span>
            <span className="text-xl text-white/70">days</span>
          </div>
          <span className={`font-medium text-sm ${bm.tone}`}>{bm.label}</span>
        </div>

        <div className="h-px w-full bg-white/10" />

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-white/70">Daily credit sales</span>
            <span className="font-medium">{fmtUSD(dailySales)}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-white/70">Cash freed at {fmtDays(parseFloat(targetDso) || 0)}-day DSO</span>
              <span className="font-medium text-2xl text-brand-green">{fmtUSD(cashFreed)}</span>
            </div>
            <span className="text-xs text-white/50">
              Cutting DSO from {fmtDays(dso)} to {fmtDays(parseFloat(targetDso) || 0)} days unlocks working capital that is currently tied up in unpaid invoices.
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-white/70">Annual cost of that cash (at 10%)</span>
            <span className="font-medium">{fmtUSD(annualInterest)}</span>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <Link href="/book-demo" className="w-full">
            <Button variant="brand" size="md" className="h-12 w-full font-medium">
              See how Yonovo cuts your DSO
            </Button>
          </Link>
          <span className="text-center text-xs text-white/50">Yonovo automates follow-ups across email, SMS, and voice to collect faster.</span>
        </div>
      </div>
    </div>
  );
}
