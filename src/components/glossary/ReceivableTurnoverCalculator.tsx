"use client";

import RatioCalculator, { fmtDays, fmtRatio, type CalculatorResult } from "@/components/glossary/RatioCalculator";

const fields = [
  {
    id: "sales",
    label: "Net credit sales",
    prefix: "$",
    defaultValue: "1200000",
    hint: "Credit sales for the period. Do not include cash sales.",
  },
  {
    id: "ar",
    label: "Average accounts receivable",
    prefix: "$",
    defaultValue: "180000",
    hint: "Beginning plus ending, divided by two.",
  },
  {
    id: "days",
    label: "Period",
    suffix: "days",
    defaultValue: "365",
    hint: "Used only to convert the ratio into days. 365 for a year.",
  },
];

function compute(values: Record<string, number>): CalculatorResult {
  const sales = values.sales ?? 0;
  const ar = values.ar ?? 0;
  const days = values.days ?? 0;
  const ready = ar > 0 && sales > 0;
  const turnover = ready ? sales / ar : 0;
  const period = turnover > 0 && days > 0 ? days / turnover : 0;
  return {
    ready,
    headlineLabel: "Receivable turnover",
    headline: ready ? fmtRatio(turnover) : "0",
    suffix: "times",
    note: ready ? "Higher means you collect the book more often." : "Enter credit sales and average receivables.",
    lines: [
      { label: "Collection period", value: period > 0 ? `${fmtDays(period)} days` : "n/a" },
    ],
  };
}

export default function ReceivableTurnoverCalculator() {
  return <RatioCalculator fields={fields} compute={compute} />;
}
