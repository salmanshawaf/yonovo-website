import Link from "next/link";
import AverageCollectionPeriodCalculator from "@/components/glossary/AverageCollectionPeriodCalculator";
import { Formula, GlossarySection, P, textLink } from "@/components/glossary/GlossarySection";

export default function AverageCollectionPeriod() {
  return (
    <>
      <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
        <p className="text-lg text-foreground leading-relaxed md:text-xl">
          The average collection period is the average number of days accounts receivable stay unpaid. The formula is (average accounts receivable / net credit sales) x days in the period. When the inputs match, it is the same number as days sales outstanding.
        </p>
      </div>

      <GlossarySection id="formula" title="Average collection period formula">
        <Formula>(Average accounts receivable / Net credit sales) x Days</Formula>
        <P>The second form uses turnover:</P>
        <Formula>Days in the period / Receivable turnover ratio</Formula>
        <P>
          Average receivables are the beginning balance plus the ending balance, divided by two. Net credit sales exclude cash sales, because cash sales never become a receivable. Use 365, 90, or 30 to match the period of the sales figure.{" "}
          <a href="https://en.wikipedia.org/wiki/Days_sales_outstanding" className={textLink} target="_blank" rel="noopener noreferrer">
            Days sales outstanding
          </a>{" "}
          is the name most finance teams use for this day count.{" "}
          <a href="https://en.wikipedia.org/wiki/Receivable_turnover_ratio" className={textLink} target="_blank" rel="noopener noreferrer">
            Receivable turnover
          </a>{" "}
          is the rate form of the same math.
        </P>
      </GlossarySection>

      <GlossarySection id="calculator" title="Average collection period calculator">
        <P>The starting numbers match the example. Change them to your ledger.</P>
        <AverageCollectionPeriodCalculator />
      </GlossarySection>

      <GlossarySection id="worked-example" title="Worked example">
        <P>
          Illustration only. Average receivables are $180,000. Net credit sales for the year are $1,200,000.
        </P>
        <ol className="flex list-decimal flex-col gap-2 pl-5 text-base text-secondary leading-relaxed">
          <li>Turnover = 1,200,000 / 180,000 = 6.67 times. The unrounded ratio is 6.666...</li>
          <li>Average collection period = 365 / (1,200,000 / 180,000) = 54.75 days. Do not divide 365 by the rounded 6.67. That is 54.7, not 54.75.</li>
          <li>The direct form gives the same answer: (180,000 / 1,200,000) x 365 = 54.75 days.</li>
        </ol>
        <P>
          On Net 30 terms, 54.75 days means payment is landing about 25 days late. That is the same worked example as the{" "}
          <Link href="/glossary/days-sales-outstanding" className={textLink}>DSO page</Link>, on purpose. If your two reports disagree, the inputs differ. They are not two metrics.
        </P>
      </GlossarySection>

      <GlossarySection id="how-to-use-it" title="How finance teams use it">
        <P>
          Track the period monthly, next to your stated terms. A rising period with flat sales means the book is getting slower. A rising period with a spike in sales can be the new invoices, not a collections failure. Read the{" "}
          <Link href="/glossary/accounts-receivable-aging-report" className={textLink}>aging report</Link>{" "}
          before you treat the average as a problem.
        </P>
        <P>
          The external comparison to use is a DSO benchmark, because the numbers match. The{" "}
          <a href="https://www.crfonline.org/tools/national-summary-of-domestic-trade-receivables-results-summary/" className={textLink} target="_blank" rel="noopener noreferrer">
            Credit Research Foundation
          </a>{" "}
          median was 40.12 days in the first quarter of 2026.{" "}
          <a href="https://www.apqc.org/resources/blog/what-dso-finance" className={textLink} target="_blank" rel="noopener noreferrer">
            APQC
          </a>{" "}
          puts top performers at 30 days or less and bottom performers at 46 days or longer. Shorten the period the same way you shorten DSO: bill on time, remind before the due date, and run the sequence from{" "}
          <Link href="/ar-collections-software" className={textLink}>accounts receivable collections software</Link>{" "}
          instead of a spreadsheet. The longer guide is{" "}
          <Link href="/blog/how-to-reduce-dso" className={textLink}>how to reduce DSO</Link>.
        </P>
      </GlossarySection>
    </>
  );
}
