"use client";

import RatioCalculator, { fmtDays, fmtRatio, fmtUSD, type CalculatorResult } from "@/components/glossary/RatioCalculator";

const fields = [
  {
    id: "ar",
    label: "Average accounts receivable",
    prefix: "$",
    defaultValue: "180000",
    hint: "Beginning balance plus ending balance, divided by two.",
  },
  {
    id: "sales",
    label: "Net credit sales",
    prefix: "$",
    defaultValue: "1200000",
    hint: "Credit sales for the same period. Leave cash sales out.",
  },
  {
    id: "days",
    label: "Period",
    suffix: "days",
    defaultValue: "365",
    hint: "365 for a year, 90 for a quarter, 30 for a month.",
  },
];

function compute(values: Record<string, number>): CalculatorResult {
  const ar = values.ar ?? 0;
  const sales = values.sales ?? 0;
  const days = values.days ?? 0;
  const ready = sales > 0 && days > 0;
  const period = ready ? (ar / sales) * days : 0;
  const turnover = ar > 0 ? sales / ar : 0;
  return {
    ready,
    headlineLabel: "Average collection period",
    headline: ready ? fmtDays(period) : "0",
    suffix: "days",
    note: ready ? "Same inputs, same result as DSO." : "Enter credit sales and the period.",
    lines: [
      { label: "Receivable turnover", value: turnover > 0 ? `${fmtRatio(turnover)}x` : "n/a" },
      { label: "Daily credit sales", value: days > 0 ? fmtUSD(sales / days) : "n/a" },
    ],
  };
}

export default function AverageCollectionPeriodCalculator() {
  return <RatioCalculator fields={fields} compute={compute} />;
}
