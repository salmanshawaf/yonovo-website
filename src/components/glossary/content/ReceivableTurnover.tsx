import Link from "next/link";
import ReceivableTurnoverCalculator from "@/components/glossary/ReceivableTurnoverCalculator";
import { Formula, GlossarySection, P, textLink } from "@/components/glossary/GlossarySection";

export default function ReceivableTurnover() {
  return (
    <>
      <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
        <p className="text-lg text-foreground leading-relaxed md:text-xl">
          The accounts receivable turnover ratio is how many times a company collects its average receivables during a period. The formula is net credit sales divided by average accounts receivable. A higher ratio means cash comes back faster.
        </p>
      </div>

      <GlossarySection id="formula" title="Receivable turnover ratio formula">
        <Formula>Net credit sales / Average accounts receivable</Formula>
        <P>
          Average accounts receivable is the beginning balance plus the ending balance, divided by two. Ending receivables alone will do if you label them as ending. Cash sales do not belong in the numerator. They were never a receivable, so they inflate the ratio.{" "}
          <a href="https://en.wikipedia.org/wiki/Receivable_turnover_ratio" className={textLink} target="_blank" rel="noopener noreferrer">
            The receivable turnover ratio
          </a>{" "}
          is the rate. Days sales outstanding is the day count: days in the period divided by turnover.
        </P>
      </GlossarySection>

      <GlossarySection id="calculator" title="Receivable turnover calculator">
        <P>The starting numbers match the example. The collection period line is days in the period divided by the ratio.</P>
        <ReceivableTurnoverCalculator />
      </GlossarySection>

      <GlossarySection id="worked-example" title="Worked example">
        <P>Illustration only. Annual net credit sales are $1,200,000. Average receivables are $180,000.</P>
        <ol className="flex list-decimal flex-col gap-2 pl-5 text-base text-secondary leading-relaxed">
          <li>Turnover = 1,200,000 / 180,000 = 6.67 times a year. The unrounded ratio is 6.666...</li>
          <li>Collection period = 365 / (1,200,000 / 180,000) = 54.75 days. Dividing by the rounded 6.67 gives 54.7, so use the exact ratio.</li>
          <li>Check it the other way: (180,000 / 1,200,000) x 365 = 54.75 days. That is DSO.</li>
        </ol>
        <P>
          A ratio of 6.67 is not good or bad until you know the terms. On Net 30, 54.75 days is slow. On Net 60, it is inside terms. See the same example on the{" "}
          <Link href="/glossary/days-sales-outstanding" className={textLink}>DSO</Link> and{" "}
          <Link href="/glossary/average-collection-period" className={textLink}>average collection period</Link> pages.
        </P>
      </GlossarySection>

      <GlossarySection id="what-is-good" title="What is a good receivable turnover ratio?">
        <P>
          Convert the ratio to days, then compare the days with your terms. There is no single good ratio across industries.
        </P>
        <P>
          One public anchor converts cleanly. The{" "}
          <a href="https://www.crfonline.org/tools/national-summary-of-domestic-trade-receivables-results-summary/" className={textLink} target="_blank" rel="noopener noreferrer">
            Credit Research Foundation
          </a>{" "}
          reported a median DSO of 40.12 days for US credit departments in the first quarter of 2026. On a 365 day year, that median is 365 / 40.12, about 9.1 turns. That is arithmetic on their DSO figure. CRF does not publish a turnover benchmark, and you should not quote 9.1 as if they had.{" "}
          <a href="https://www.apqc.org/resources/blog/what-dso-finance" className={textLink} target="_blank" rel="noopener noreferrer">
            APQC
          </a>{" "}
          says top performers collect in 30 days or less (about 12 turns on a 365 day year) and bottom performers take 46 days or longer (about 7.9 turns). Same caveat: those are conversions of a day-count benchmark.
        </P>
        <P>
          If turnover is falling, open the{" "}
          <Link href="/glossary/accounts-receivable-aging-report" className={textLink}>aging report</Link>{" "}
          and see which customers moved into later buckets. The operating fix is the collections sequence: a reminder before the due date, then email, SMS, phone, and WhatsApp on a schedule. That is what{" "}
          <Link href="/ar-collections-software" className={textLink}>accounts receivable collections software</Link>{" "}
          runs, on top of{" "}
          <Link href="/solutions/quickbooks" className={textLink}>QuickBooks Online</Link>,{" "}
          <Link href="/solutions/xero" className={textLink}>Xero</Link>,{" "}
          <Link href="/solutions/netsuite" className={textLink}>NetSuite</Link>,{" "}
          <Link href="/solutions/sage" className={textLink}>Sage Intacct</Link>,{" "}
          <Link href="/solutions/odoo" className={textLink}>Odoo</Link>,{" "}
          <Link href="/solutions/stripe" className={textLink}>Stripe Billing</Link>,{" "}
          <Link href="/solutions/bill" className={textLink}>BILL</Link>, FreshBooks, Salesforce, HubSpot, or SAP.
        </P>
      </GlossarySection>
    </>
  );
}
