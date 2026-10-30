import Link from "next/link";
import LetterTemplate from "@/components/glossary/LetterTemplate";
import { GlossarySection, P, textLink } from "@/components/glossary/GlossarySection";

export default function CollectionLetter() {
  return (
    <>
      <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
        <p className="text-lg text-foreground leading-relaxed md:text-xl">
          A collection letter is a written demand for a specific past due invoice, sent by the company that is owed the money. It names the invoice, the open amount, the due date, how to pay, and where to raise a dispute.
        </p>
      </div>

      <GlossarySection id="definition" title="What a collection letter is">
        <P>
          In B2B, the letter comes from you, under your name, to your customer. It is not a letter from a third party agency, and it is not a letter a consumer writes to dispute a debt. If you received an agency letter about a personal debt, use the{" "}
          <a href="https://consumer.ftc.gov/articles/debt-collection-faqs" className={textLink} target="_blank" rel="noopener noreferrer">
            Federal Trade Commission&apos;s debt collection guidance
          </a>
          . Do not adapt the samples below for that.
        </P>
        <P>
          A collection letter is one document.{" "}
          <Link href="/glossary/dunning-letter" className={textLink}>Dunning</Link>{" "}
          is the series: first notice, second notice, final notice. You can use a collection letter as the firmer step in that series. Email versions are on the{" "}
          <Link href="/glossary/past-due-invoice-email" className={textLink}>past due invoice email</Link> page. These samples are examples, not legal advice.
        </P>
      </GlossarySection>

      <GlossarySection id="what-to-include" title="What to include">
        <ul className="flex list-disc flex-col gap-2 pl-5 text-base text-secondary leading-relaxed">
          <li>Invoice number, original amount, amount still open, and due date.</li>
          <li>How many days past due it is, so the reader does not have to calculate it.</li>
          <li>A way to pay, and a reply path if the invoice is wrong.</li>
          <li>On a later letter only: the next step and the date you will take it. Omit any step you will not actually take.</li>
        </ul>
        <P>
          Send it from a person the customer knows. Yonovo sends follow up from the client&apos;s own domain, across email, SMS, phone, and WhatsApp, and pulls the invoice out of the sequence when the ledger shows it paid. That workflow is{" "}
          <Link href="/ar-collections-software" className={textLink}>accounts receivable collections software</Link>.
          {" "}Seriously overdue accounts, still under your brand, are covered on{" "}
          <Link href="/debt-collection-software" className={textLink}>debt collection software</Link>.
        </P>
      </GlossarySection>

      <GlossarySection id="samples" title="Collection letter samples">
        <LetterTemplate
          title="Standard collection letter"
          subject="Payment requested: Invoice [number] for $[amount]"
          body={`[date]

[customer name]
[customer company]

Please pay invoice [number] for $[open amount], due on [due date] and now [X] days past due.

Pay here: [payment link]. The invoice is attached.

If you have a dispute or you need a document before you can pay, reply by [date] and we will pause reminders on this invoice. If payment is already sent, reply with the reference.

[your name]
[title]
[company]
[phone]`}
        />
        <LetterTemplate
          title="Final collection letter"
          subject="Final notice on invoice [number]"
          body={`[date]

[customer name]
[customer company]

We have written about invoice [number] for $[open amount], due [due date]. It remains unpaid.

This is the last request we will send. Pay by [date] at [payment link], or send a written payment date we can accept.

If we do not have payment or that date by [date], we will [credit hold / the next step you have approved]. We would rather close this on good terms.

[your name]
[title]
[company]
[phone]`}
        />
        <P>
          Pair the letter with the bucket on the{" "}
          <Link href="/glossary/accounts-receivable-aging-report" className={textLink}>aging report</Link>.
          A first letter belongs in 1 to 30. A final letter belongs once the invoice is well into 60 or 90 days and earlier notes had no reply.
        </P>
      </GlossarySection>
    </>
  );
}
