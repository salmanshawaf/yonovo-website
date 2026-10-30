"use client";

import { useMemo, useState } from "react";

const fmtUSD = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);

export function fmtDays(n: number) {
  if (!Number.isFinite(n)) return "0";
  return (Math.round(n * 100) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export function fmtRatio(n: number) {
  if (!Number.isFinite(n)) return "0";
  return (Math.round(n * 100) / 100).toLocaleString("en-US");
}

type FieldDef = {
  id: string;
  label: string;
  prefix?: string;
  suffix?: string;
  hint?: string;
  defaultValue: string;
};

type ResultLine = { label: string; value: string };

export type CalculatorResult = {
  ready: boolean;
  headlineLabel: string;
  headline: string;
  suffix?: string;
  note?: string;
  lines: ResultLine[];
};

function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
}) {
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

export default function RatioCalculator({
  fields,
  compute,
}: {
  fields: FieldDef[];
  compute: (values: Record<string, number>) => CalculatorResult;
}) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((field) => [field.id, field.defaultValue])),
  );

  const result = useMemo(() => {
    const numeric: Record<string, number> = {};
    for (const field of fields) {
      numeric[field.id] = parseFloat(values[field.id] ?? "") || 0;
    }
    return compute(numeric);
  }, [compute, fields, values]);

  return (
    <div className="grid w-full gap-6 lg:grid-cols-2 lg:gap-8">
      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 md:p-8">
        {fields.map((field) => (
          <Field
            key={field.id}
            label={field.label}
            prefix={field.prefix}
            suffix={field.suffix}
            hint={field.hint}
            value={values[field.id] ?? ""}
            onChange={(next) => setValues((current) => ({ ...current, [field.id]: next }))}
          />
        ))}
      </div>
      <div className="flex flex-col gap-6 rounded-2xl bg-brand-navy p-6 text-white md:p-8">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-white/60">{result.headlineLabel}</span>
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-6xl tracking-tight">{result.headline}</span>
            {result.suffix && <span className="text-xl text-white/70">{result.suffix}</span>}
          </div>
          {result.note && <span className="text-sm text-white/60">{result.note}</span>}
        </div>
        {result.lines.length > 0 && (
          <>
            <div className="h-px w-full bg-white/10" />
            <div className="flex flex-col gap-4">
              {result.lines.map((line) => (
                <div key={line.label} className="flex items-center justify-between gap-4">
                  <span className="text-white/70">{line.label}</span>
                  <span className="font-medium">{line.value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export { fmtUSD };
