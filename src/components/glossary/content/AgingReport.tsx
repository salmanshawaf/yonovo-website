import Link from "next/link";
import AgingTemplate from "@/components/glossary/AgingTemplate";
import { GlossarySection, P, textLink } from "@/components/glossary/GlossarySection";

const buckets = [
  { bucket: "Current", action: "Not yet due. A note before the due date is what keeps it here." },
  { bucket: "1 to 30", action: "Early overdue. A consistent reminder collects most of this bucket." },
  { bucket: "31 to 60", action: "Needs a second channel and a direct question about what is blocking payment." },
  { bucket: "61 to 90", action: "Escalate to a senior contact. A controller often does not know the invoice is open." },
  { bucket: "90+", action: "Decide on purpose: final notice, a payment plan, or stop selling on terms." },
];

export default function AgingReport() {
  return (
    <>
      <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
        <p className="text-lg text-foreground leading-relaxed md:text-xl">
          An accounts receivable aging report lists every open invoice and sorts the balance by how many days past the due date it is. The usual buckets are Current, 1 to 30, 31 to 60, 61 to 90, and 90 plus. It shows which invoices make days sales outstanding high.
        </p>
      </div>

      <GlossarySection id="buckets" title="Aging buckets">
        <P>
          Put each invoice in one bucket, based on the due date, not the invoice date. The bucket amounts must add up to open receivables. These are the same buckets Yonovo uses on the{" "}
          <Link href="/ar-collections-software" className={textLink}>collections workflow</Link>.
        </P>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {buckets.map((item) => (
            <div key={item.bucket} className="flex flex-col gap-1 rounded-2xl border border-border bg-surface p-5">
              <span className="font-medium text-xl text-foreground">{item.bucket}</span>
              <span className="text-sm text-secondary leading-relaxed">{item.action}</span>
            </div>
          ))}
        </div>
        <P>
          Age changes the odds.{" "}
          <a
            href="https://commercialcollectionagenciesofamerica.com/resources/Documents/CollectabilityOverTime.pdf"
            className={textLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Commercial Collection Agencies of America
          </a>{" "}
          puts the probability of collecting a delinquent account at 68.9 percent at three months past due, 51.3 percent at six months, and 21.4 percent at one year. That is why the 90 plus column is a decision, not a parking spot.
        </P>
      </GlossarySection>

      <GlossarySection id="how-to-read" title="How to read the report">
        <ol className="flex list-decimal flex-col gap-2 pl-5 text-base text-secondary leading-relaxed">
          <li>Check that the total equals the open receivables balance in the ledger. If it does not, the report is wrong and the rest of the meeting is wasted.</li>
          <li>Look at the share in 61 days and older, then at which customers own it. One account can be the whole problem.</li>
          <li>Compare with last month. A stable total with a shift into later buckets is getting worse even when DSO looks flat.</li>
          <li>Separate disputes from slow payers. A disputed invoice should not sit in a reminder sequence. It needs an owner.</li>
        </ol>
        <P>
          DSO tells you the average. Turnover tells you the same average as a rate. The aging report tells you who to call. Definitions are on the{" "}
          <Link href="/glossary/days-sales-outstanding" className={textLink}>DSO</Link> and{" "}
          <Link href="/glossary/accounts-receivable-turnover" className={textLink}>receivable turnover</Link> pages.
        </P>
      </GlossarySection>

      <GlossarySection id="template" title="Aging report template">
        <P>
          Use the table as a layout, or download the CSV and replace the sample rows. Columns are customer, invoice, dates, amount, and one column per bucket. The amount goes in a single bucket.
        </P>
        <AgingTemplate />
        <P>
          Yonovo builds this view from the accounting system instead of a monthly export. It pulls invoices and payments from QuickBooks Online, Xero, NetSuite, Sage Intacct, Odoo, Stripe Billing, BILL, FreshBooks, Salesforce, HubSpot, and SAP,           then follows up by email, SMS, phone, and WhatsApp based on the bucket. The day by day actions are on{" "}
          <Link href="/ar-collections-software" className={textLink}>accounts receivable collections software</Link>.
          {" "}Copy for each stage is in the{" "}
          <Link href="/blog/dunning-letter" className={textLink}>dunning letter</Link> guide and the{" "}
          <Link href="/blog/invoice-reminder-best-practices#past-due-invoice-email-templates" className={textLink}>past due invoice email templates</Link>.
        </P>
      </GlossarySection>
    </>
  );
}
