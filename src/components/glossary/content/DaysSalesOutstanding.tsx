import Link from "next/link";
import DSOCalculator from "@/components/DSOCalculator";
import { Formula, GlossarySection, P, textLink } from "@/components/glossary/GlossarySection";

const crf = "https://www.crfonline.org/tools/national-summary-of-domestic-trade-receivables-results-summary/";
const apqc = "https://www.apqc.org/resources/blog/what-dso-finance";
const hackett = "https://www.thehackettgroup.com/2025-working-capital-survey-payables-rebound-receivables-inventory-lag/";
const wiki = "https://en.wikipedia.org/wiki/Days_sales_outstanding";

export default function DaysSalesOutstanding() {
  return (
    <>
      <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
        <p className="text-lg text-foreground leading-relaxed md:text-xl">
          Days sales outstanding (DSO) is the average number of days a company takes to collect payment after a credit sale. The formula is DSO = (accounts receivable / credit sales) x days in the period. A lower DSO means cash returns faster.
        </p>
      </div>

      <GlossarySection id="dso-formula" title="DSO formula">
        <Formula>DSO = (Accounts receivable / Credit sales) x Days</Formula>
        <P>
          Credit sales are sales billed on terms, not cash sales. Days are 365 for a year, 90 for a quarter, or 30 for a month. Use the receivables balance that matches the question you are asking. Average receivables, beginning plus ending divided by two, smooth out a single odd month. Ending receivables show where you stand today. Say which one you used. The formula is the standard one in financial analysis.{" "}
          <a href={wiki} className={textLink} target="_blank" rel="noopener noreferrer">
            Wikipedia documents it the same way
          </a>
          .
        </P>
        <P>
          DSO is not a cash forecast for a single invoice. It is an average. A 45 day DSO can hide a pile of invoices past 90 days if newer invoices are paying on time. The{" "}
          <Link href="/glossary/accounts-receivable-aging-report" className={textLink}>
            aging report
          </Link>{" "}
          is the list behind the average.
        </P>
      </GlossarySection>

      <GlossarySection id="dso-calculator" title="DSO calculator">
        <P>
          Enter receivables, credit sales, and the length of the period. The starting figures match the example below. The 10 percent line is an illustration of what that freed cash might cost to carry. It is not a market interest rate.
        </P>
        <DSOCalculator initialAr="180000" initialSales="1200000" initialDays="365" initialTarget="40" />
      </GlossarySection>

      <GlossarySection id="worked-example" title="Worked example">
        <P>
          These figures are an illustration, not a Yonovo customer. Average receivables are $180,000. Credit sales for the year are $1,200,000. The period is 365 days.
        </P>
        <ol className="flex list-decimal flex-col gap-2 pl-5 text-base text-secondary leading-relaxed">
          <li>Divide receivables by credit sales: 180,000 / 1,200,000 = 0.15.</li>
          <li>Multiply by the days in the period: 0.15 x 365 = 54.75 days.</li>
          <li>That is the DSO. The same inputs produce a receivable turnover of 1,200,000 / 180,000 = 6.67 times. Dividing 365 by that exact ratio, not by the rounded 6.67, is 54.75 days again.</li>
        </ol>
        <P>
          If terms are Net 30, customers are paying about 25 days late (54.75 minus 30). Cutting this book from 54.75 days to 40 days frees (54.75 minus 40) x ($1,200,000 / 365) = $48,493 of cash that is currently in unpaid invoices. That dollar figure is arithmetic on the example, not a result you should expect.
        </P>
      </GlossarySection>

      <GlossarySection id="what-is-a-good-dso" title="What is a good DSO?">
        <P>
          Compare DSO with your own terms before you compare it with anyone else. A distributor on Net 45 and a software company on due-on-receipt are not chasing the same number.
        </P>
        <P>
          Two public benchmarks are worth knowing. The{" "}
          <a href={crf} className={textLink} target="_blank" rel="noopener noreferrer">
            Credit Research Foundation
          </a>{" "}
          reported a median DSO of 40.12 days among US credit departments in the first quarter of 2026, and a best possible DSO of 31.59 days.{" "}
          <a href={apqc} className={textLink} target="_blank" rel="noopener noreferrer">
            APQC
          </a>{" "}
          reports that top performers collect in 30 days or less, while bottom performers take 46 days or longer.{" "}
          <a href={hackett} className={textLink} target="_blank" rel="noopener noreferrer">
            The Hackett Group
          </a>{" "}
          put an 18 day gap between top performers and the median, and valued the trapped working capital at $600 billion. More sourced figures are on the{" "}
          <Link href="/accounts-receivable-statistics" className={textLink}>
            accounts receivable statistics
          </Link>{" "}
          page.
        </P>
      </GlossarySection>

      <GlossarySection id="how-to-reduce-dso" title="How to reduce DSO">
        <P>
          DSO moves when invoices go out on time and someone follows up on a schedule. The levers below are the ones Yonovo already runs for finance teams.
        </P>
        <ol className="flex list-decimal flex-col gap-3 pl-5 text-base text-secondary leading-relaxed">
          <li>
            Bill as soon as the work is billable. Days between delivery and the invoice are days of DSO you chose.
          </li>
          <li>
            Remind before the due date. The cadence on the{" "}
            <Link href="/ar-collections-software" className={textLink}>
              collections software
            </Link>{" "}
            page starts 7 days before due, then follows up on the due date, day 7, day 14, day 21, and day 30. Tone and timing are in{" "}
            <Link href="/blog/invoice-reminder-best-practices" className={textLink}>
              invoice reminder best practices
            </Link>
            .
          </li>
          <li>
            Use more than one channel. Email, then SMS, then a phone call, and WhatsApp where that is how the customer replies.{" "}
            <Link href="/dunning-management-software" className={textLink}>
              Dunning management
            </Link>{" "}
            is the written sequence.{" "}
            <Link href="/accounts-receivable-automation-software" className={textLink}>
              Accounts receivable automation software
            </Link>{" "}
            is the system that sends it.
          </li>
          <li>
            Stop when the invoice is paid, disputed, promised, or flagged sensitive. Chasing a paid invoice costs more goodwill than the late payment did.
          </li>
          <li>
            Read the aging report and spend time on the buckets that are slipping, not on another pass over invoices that are current.
          </li>
        </ol>
        <P>
          Connect the ledger first so the sequence sees payments. Yonovo syncs with{" "}
          <Link href="/solutions/quickbooks" className={textLink}>QuickBooks Online</Link>,{" "}
          <Link href="/solutions/xero" className={textLink}>Xero</Link>,{" "}
          <Link href="/solutions/netsuite" className={textLink}>NetSuite</Link>,{" "}
          <Link href="/solutions/sage" className={textLink}>Sage Intacct</Link>,{" "}
          <Link href="/solutions/odoo" className={textLink}>Odoo</Link>,{" "}
          <Link href="/solutions/stripe" className={textLink}>Stripe Billing</Link>, and{" "}
          <Link href="/solutions/bill" className={textLink}>BILL</Link>
          . It also connects to FreshBooks, Salesforce, HubSpot, and SAP, and it can message on WhatsApp.
        </P>
        <P>
          Published results, not projections:{" "}
          <Link href="/case-studies/tdg-inc" className={textLink}>TDG Inc.</Link>{" "}
          cut DSO by 15 days, cut manual follow ups by 80 percent, and collected 32 percent faster.{" "}
          <Link href="/case-studies/troyes" className={textLink}>Troyes</Link>{" "}
          went from no collections process to a running one in a single day, with 45 percent faster payment turnaround and 25 or more hours saved per month. A longer list of tactics is in{" "}
          <Link href="/blog/how-to-reduce-dso" className={textLink}>how to reduce DSO</Link>.
        </P>
      </GlossarySection>

      <GlossarySection id="related-metrics" title="DSO, collection period, and turnover">
        <P>
          <Link href="/glossary/average-collection-period" className={textLink}>Average collection period</Link>{" "}
          is the same day count when the inputs match.{" "}
          <Link href="/glossary/accounts-receivable-turnover" className={textLink}>Accounts receivable turnover</Link>{" "}
          is the same speed stated as a rate. Divide the days in the period by the turnover ratio and you are back at DSO.
        </P>
      </GlossarySection>
    </>
  );
}
