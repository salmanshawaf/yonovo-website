/**
 * Data for /accounts-receivable-statistics.
 *
 * This file is the page's annual-refresh surface: bump STATS_YEAR and
 * LAST_UPDATED, refresh stale figures, and re-run the source liveness check
 * (see the PR that introduced this page for the loop).
 *
 * Every stat here passed a verification gate before inclusion: its sourceUrl
 * was fetched and the figure confirmed present on the ORIGINAL publisher's
 * page (verified August 2026). Roundups and aggregators are never cited. A
 * stat whose source page dies comes off the page.
 *
 * Refresh notes:
 * - crfonline.org NSDTR page updates quarterly; the DSO median reflects the
 *   quarter named in the headline and must be re-checked each refresh.
 * - Bot-hostile to plain fetchers (use a browser or rendering scraper when
 *   re-verifying): grandviewresearch.com, fedsmallbusiness.org, apqc.org,
 *   blog.xero.com, quickbooks.intuit.com, payablesplace.ardentpartners.com.
 *
 * Anchor `id`s are hand-authored, semantic, and PERMANENT. External sites
 * deep link to them; never rename or reuse an id. Display numbers are derived
 * from array order at render time and may change between years.
 */

export const STATS_YEAR = 2026;
export const LAST_UPDATED = "August 2026";

export type SectionId =
  | "late-payment-behavior"
  | "dso-and-aging"
  | "collections-cost-and-effort"
  | "automation-adoption"
  | "cash-flow-impact"
  | "small-business-impact";

export type Stat = {
  /** Permanent anchor id. Never rename. */
  id: string;
  /** Figure-first headline; rendered as the stat's H3. */
  headline: string;
  /** One line, plain language, why it matters to a finance team. */
  takeaway: string;
  sourceName: string;
  sourceUrl: string;
  sourceYear: string;
  section: SectionId;
};

export const SECTIONS: { id: SectionId; title: string }[] = [
  { id: "late-payment-behavior", title: "Late payment behavior" },
  { id: "dso-and-aging", title: "DSO and aging" },
  { id: "collections-cost-and-effort", title: "Collections cost and effort" },
  { id: "automation-adoption", title: "Automation adoption" },
  { id: "cash-flow-impact", title: "Cash flow impact" },
  { id: "small-business-impact", title: "Small business impact" },
];

export const STATS: Stat[] = [
  /* ── Late payment behavior ── */
  {
    id: "us-b2b-sales-overdue",
    headline: "43% of credit based B2B sales in the United States are overdue",
    takeaway: "Nearly half of everything American businesses sell on credit is late. If your overdue share sits near this number, you are average, and average is expensive.",
    sourceName: "Atradius Payment Practices Barometer",
    sourceUrl: "https://group.atradius.com/knowledge-and-research/reports/b2b-payment-practices-trends-in-north-america-2025",
    sourceYear: "2025",
    section: "late-payment-behavior",
  },
  {
    id: "western-europe-invoices-overdue",
    headline: "47% of B2B invoices in Western Europe are overdue",
    takeaway: "Late payment is not an American problem. Western Europe runs slightly worse than the US, so global sellers should not assume overseas customers pay faster.",
    sourceName: "Atradius Payment Practices Barometer",
    sourceUrl: "https://group.atradius.com/knowledge-and-research/reports/b2b-payment-practices-trends-western-europe-2025",
    sourceYear: "2025",
    section: "late-payment-behavior",
  },
  {
    id: "net-terms-overdue-rates",
    headline: "55% of small businesses on net 30 terms have overdue invoices, versus 26% of those requiring immediate payment",
    takeaway: "The moment you extend terms, your odds of chasing roughly double. Trade credit is a sales tool with a collections bill attached.",
    sourceName: "Intuit QuickBooks Small Business Late Payments Report",
    sourceUrl: "https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2026/",
    sourceYear: "2026",
    section: "late-payment-behavior",
  },
  {
    id: "us-invoices-days-late",
    headline: "7.8 days late is the average payment on US small business invoices, the best quarter in four years",
    takeaway: "Even in the best quarter since 2021, the average invoice was still paid more than a week past its due date. On time is not the norm anywhere.",
    sourceName: "Xero Small Business Insights",
    sourceUrl: "https://blog.xero.com/data-insights/small-business-insights-data-late-payment-results/",
    sourceYear: "2026",
    section: "late-payment-behavior",
  },
  {
    id: "overdue-invoice-to-cash",
    headline: "20 days past due is how long it takes US firms, on average, to turn an overdue invoice into cash",
    takeaway: "Once an invoice slips past its due date, expect to wait roughly three more weeks for the money. Preventing the slip beats chasing it.",
    sourceName: "Atradius Payment Practices Barometer",
    sourceUrl: "https://atradius.us/knowledge-and-research/reports/b2b-payment-practices-trends-united-states-2024",
    sourceYear: "2024",
    section: "late-payment-behavior",
  },

  /* ── DSO and aging ── */
  {
    id: "median-dso-us",
    headline: "40.12 days was the median DSO reported by US credit departments in the first quarter of 2026",
    takeaway: "If your days sales outstanding runs well above 40, you are collecting slower than the typical US credit department. The same survey put best possible DSO at 31.59 days.",
    sourceName: "Credit Research Foundation, National Summary of Domestic Trade Receivables",
    sourceUrl: "https://www.crfonline.org/tools/national-summary-of-domestic-trade-receivables-results-summary/",
    sourceYear: "2026",
    section: "dso-and-aging",
  },
  {
    id: "dso-benchmarks-percentiles",
    headline: "30 days or less is what top performing companies take to collect, while bottom performers take 46 days or longer",
    takeaway: "The gap between the best and worst collectors is more than two weeks per invoice. Where you sit in that range is a process choice, not an industry destiny.",
    sourceName: "APQC Open Standards Benchmarking",
    sourceUrl: "https://www.apqc.org/resources/blog/what-dso-finance",
    sourceYear: "2025",
    section: "dso-and-aging",
  },
  {
    id: "dso-gap-working-capital",
    headline: "An 18 day DSO gap separates top performing US companies from the median, worth $600 billion in excess working capital",
    takeaway: "Receivables are the single largest pool of trapped working capital at large US companies. Closing even part of the DSO gap frees cash without borrowing a dollar.",
    sourceName: "The Hackett Group, US Working Capital Survey",
    sourceUrl: "https://www.thehackettgroup.com/2025-working-capital-survey-payables-rebound-receivables-inventory-lag/",
    sourceYear: "2025",
    section: "dso-and-aging",
  },
  {
    id: "collectability-decay-by-age",
    headline: "68.9% is the probability of collecting a delinquent account at three months past due, falling to 51.3% at six months and 21.4% at one year",
    takeaway: "Every month an overdue invoice sits, real money evaporates. The case for chasing early is not urgency theater, it is arithmetic.",
    sourceName: "Commercial Collection Agencies of America",
    sourceUrl: "https://commercialcollectionagenciesofamerica.com/resources/Documents/CollectabilityOverTime.pdf",
    sourceYear: "2023",
    section: "dso-and-aging",
  },

  /* ── Collections cost and effort ── */
  {
    id: "midsize-firms-manual-ar",
    headline: "35% of midsize firms still run accounts receivable entirely by hand",
    takeaway: "A third of midsize companies manage receivables with no automation at all. Their competitors who automate collect faster with fewer people.",
    sourceName: "PYMNTS Intelligence",
    sourceUrl: "https://www.pymnts.com/tracker_posts/from-friction-to-flow-ar-automation-in-2025/",
    sourceYear: "2025",
    section: "collections-cost-and-effort",
  },
  {
    id: "ar-team-time-on-disputes",
    headline: "27% of firms say at least half of their AR team's time goes to resolving invoice disputes",
    takeaway: "For a quarter of companies, the AR team is really a dispute resolution team. Cleaner invoicing and earlier follow up shrink that share.",
    sourceName: "PYMNTS Intelligence",
    sourceUrl: "https://www.pymnts.com/tracker_posts/from-friction-to-flow-ar-automation-in-2025/",
    sourceYear: "2025",
    section: "collections-cost-and-effort",
  },
  {
    id: "cost-to-process-invoice",
    headline: "$9.84 is the average all in cost to process a single invoice",
    takeaway: "Multiply that by every invoice you touch each month and manual processing becomes a real budget line. Best in class teams do it for about a fifth of the cost.",
    sourceName: "Ardent Partners, The State of ePayables",
    sourceUrl: "https://payablesplace.ardentpartners.com/2026/01/state-of-epayables-part-nine-ap-benchmarks-and-best-in-class-performance/",
    sourceYear: "2025",
    section: "collections-cost-and-effort",
  },
  {
    id: "collection-agency-fees",
    headline: "25% to 50% of what a collection agency recovers is what the agency keeps",
    takeaway: "Outsourcing collections means giving up a quarter to half of the money. Collecting your own invoices, earlier, keeps all of it.",
    sourceName: "US Chamber of Commerce",
    sourceUrl: "https://www.uschamber.com/co/start/strategy/how-do-debt-collection-agencies-get-paid",
    sourceYear: "2026",
    section: "collections-cost-and-effort",
  },
  {
    id: "hours-chasing-payments-weekly",
    headline: "14 hours per week is what 65% of businesses with 25 to 200 employees spent on payment collection admin, per a 2021 survey",
    takeaway: "That is a third of a full time job spent asking to be paid for work already done. The figure predates the recent automation wave, which is exactly the point.",
    sourceName: "Intuit QuickBooks",
    sourceUrl: "https://quickbooks.intuit.com/r/midsize-business/midsize-payments-research/",
    sourceYear: "2021",
    section: "collections-cost-and-effort",
  },
  {
    id: "revenue-lost-chasing-late-payments",
    headline: "3.0% of revenue is what North American middle market companies lose chasing late payments",
    takeaway: "Chasing is not free. For a $100 million company, the chase itself burns roughly $3 million a year before counting a single write off.",
    sourceName: "PYMNTS Intelligence and Visa, Growth Corporates Working Capital Index",
    sourceUrl: "https://www.pymnts.com/working-capital/2026/61-percent-of-north-america-middle-market-companies-use-cards-to-speed-cash-flow/",
    sourceYear: "2026",
    section: "collections-cost-and-effort",
  },

  /* ── Automation adoption ── */
  {
    id: "ar-automation-market-size",
    headline: "$4.8 billion is the size of the global AR automation market in 2025, projected to reach $12.9 billion by 2033",
    takeaway: "The market is on track to nearly triple in eight years at a 13.2% annual growth rate. Finance teams are voting with their budgets.",
    sourceName: "Grand View Research",
    sourceUrl: "https://www.grandviewresearch.com/industry-analysis/accounts-receivable-automation-market-report",
    sourceYear: "2025",
    section: "automation-adoption",
  },
  {
    id: "fully-automated-midsize-share",
    headline: "5% of midsize firms have fully automated their payables and receivables",
    takeaway: "Full automation is still rare, which means the operational edge it confers is still available. More than a third of midsize firms have not even started.",
    sourceName: "PYMNTS Intelligence",
    sourceUrl: "https://www.pymnts.com/news/b2b-payments/2024/5percent-mid-sized-firms-have-fully-automated-accounts-payable-receivable/",
    sourceYear: "2024",
    section: "automation-adoption",
  },
  {
    id: "plan-further-automation",
    headline: "93% of midsize firms plan further automation of payables and receivables",
    takeaway: "Nearly everyone intends to automate more. The question inside most finance teams is no longer whether, but which process first.",
    sourceName: "PYMNTS Intelligence",
    sourceUrl: "https://www.pymnts.com/accounts-payable/2024/93percent-of-mid-sized-firms-plan-more-automation-for-ap-ar-systems-processes/",
    sourceYear: "2024",
    section: "automation-adoption",
  },
  {
    id: "automation-dso-reduction",
    headline: "32%, or 19 days, is the DSO reduction reported by companies that automated more than half of their AR processes",
    takeaway: "Automating most of the receivables workflow took nearly three weeks off collection times at large firms surveyed. The returns show up in days, not decimals.",
    sourceName: "PYMNTS Intelligence",
    sourceUrl: "https://www.pymnts.com/accounts-receivable/2023/only-17-percent-of-small-firms-are-reaping-benefits-of-automating-accounts-receivables",
    sourceYear: "2023",
    section: "automation-adoption",
  },
  {
    id: "automation-dso-reduction-range",
    headline: "15% to 25% is the typical DSO reduction for companies adopting AR automation",
    takeaway: "Across studies, the expected payoff lands in the same band: roughly a fifth off your collection times. On a 40 day DSO, that is about a week of cash flow.",
    sourceName: "PYMNTS Intelligence",
    sourceUrl: "https://www.pymnts.com/accounts-receivable/2025/manual-ar-practices-drain-millions-from-mid-market-firms/",
    sourceYear: "2025",
    section: "automation-adoption",
  },
  {
    id: "check-payments-decline",
    headline: "7.2% per year is the rate at which US check payments have declined since 2018",
    takeaway: "Paper is leaving the payment system across the board. AR processes built around checks and mailed invoices are aging out with it.",
    sourceName: "Federal Reserve Payments Study",
    sourceUrl: "https://www.federalreserve.gov/paymentsystems/2023-April-The-Federal-Reserve-Payments-Study.htm",
    sourceYear: "2023",
    section: "automation-adoption",
  },

  /* ── Cash flow impact ── */
  {
    id: "us-firms-owed-total",
    headline: "$3.1 trillion is the net amount US firms are owed in accounts receivable on any given day, per a 2019 estimate",
    takeaway: "Receivables are one of the largest informal lending markets in the economy. Most businesses are banks that never planned to be.",
    sourceName: "PYMNTS and Fundbox, Trade Credit Dilemma Report",
    sourceUrl: "https://www.pymnts.com/smbs/2019/fundbox-business-trade-credit-b2b-payment-platforms/",
    sourceYear: "2019",
    section: "cash-flow-impact",
  },
  {
    id: "bad-debts-share-of-sales",
    headline: "8% of all B2B credit sales end up as bad debts at US companies",
    takeaway: "Almost a tenth of what gets sold on credit is never collected. Bad debt is not an edge case, it is a standing tax on doing business on terms.",
    sourceName: "Atradius Payment Practices Barometer",
    sourceUrl: "https://atradius.us/knowledge-and-research/reports/b2b-payment-practices-trends-united-states-2024",
    sourceYear: "2024",
    section: "cash-flow-impact",
  },
  {
    id: "uneven-cash-flows-challenge",
    headline: "51% of small employer firms cited uneven cash flows as a financial challenge",
    takeaway: "Half of small employers fight cash flow timing, not profitability. Receivables that arrive on schedule solve a problem lenders cannot.",
    sourceName: "Federal Reserve Banks, Small Business Credit Survey",
    sourceUrl: "https://www.fedsmallbusiness.org/reports/survey/2025/2025-report-on-employer-firms",
    sourceYear: "2025",
    section: "cash-flow-impact",
  },
  {
    id: "financing-for-operating-expenses",
    headline: "56% of small employer firms that sought financing did so to meet operating expenses, the most common reason",
    takeaway: "More firms borrow to cover the gap between doing the work and getting paid than to fund growth. Faster collections shrink the need to borrow at all.",
    sourceName: "Federal Reserve Banks, Small Business Credit Survey",
    sourceUrl: "https://www.fedsmallbusiness.org/reports/survey/2026/2026-report-on-employer-firms",
    sourceYear: "2026",
    section: "cash-flow-impact",
  },
  {
    id: "payment-uncertainty-lost-revenue",
    headline: "4.6% of revenue, about $19 million on average, is what middle market CFOs with net 30 plus customers attribute to payment uncertainty",
    takeaway: "Not knowing when money will arrive has its own price tag. Predictable collections are worth almost five points of revenue to the companies living without them.",
    sourceName: "PYMNTS Intelligence",
    sourceUrl: "https://www.pymnts.com/tracker_posts/from-friction-to-flow-ar-automation-in-2025/",
    sourceYear: "2025",
    section: "cash-flow-impact",
  },

  /* ── Small business impact ── */
  {
    id: "small-business-overdue-share",
    headline: "59% of US small businesses have invoices overdue by 30 or more days, up from 47% a year earlier",
    takeaway: "Late payment is getting worse for small businesses, not better. A twelve point jump in one year is a trend line, not noise.",
    sourceName: "Intuit QuickBooks Small Business Late Payments Report",
    sourceUrl: "https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2026/",
    sourceYear: "2026",
    section: "small-business-impact",
  },
  {
    id: "average-owed-per-small-business",
    headline: "$17,700 is the average amount owed to a US small business with unpaid invoices",
    takeaway: "For many small businesses that is a payroll cycle sitting in other people's bank accounts. The money exists, it is just late.",
    sourceName: "Intuit QuickBooks Small Business Late Payments Report",
    sourceUrl: "https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2026/",
    sourceYear: "2026",
    section: "small-business-impact",
  },
  {
    id: "late-payment-payroll-strain",
    headline: "39% of small business owners say a single late payment made it hard to cover payroll or bills in the past year",
    takeaway: "It does not take a wave of defaults to hurt. One late invoice can push a healthy small business into a payroll scramble.",
    sourceName: "Intuit QuickBooks Small Business Late Payments Report",
    sourceUrl: "https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2026/",
    sourceYear: "2026",
    section: "small-business-impact",
  },
  {
    id: "credit-card-reliance-overdue",
    headline: "38% of small businesses with overdue invoices grew more reliant on credit cards, versus 21% of those without",
    takeaway: "When customers pay late, their suppliers borrow at card rates to cover the gap. Late payment quietly converts into interest expense downstream.",
    sourceName: "Intuit QuickBooks Small Business Late Payments Report",
    sourceUrl: "https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2026/",
    sourceYear: "2026",
    section: "small-business-impact",
  },
];

export const STAT_COUNT = STATS.length;

/** Ids of the most quotable stats, surfaced in the key takeaways block. */
export const KEY_TAKEAWAY_IDS: string[] = [
  "us-b2b-sales-overdue",
  "small-business-overdue-share",
  "median-dso-us",
  "collectability-decay-by-age",
  "bad-debts-share-of-sales",
  "average-owed-per-small-business",
];
