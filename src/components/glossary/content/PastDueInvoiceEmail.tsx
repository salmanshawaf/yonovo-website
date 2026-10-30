import Link from "next/link";
import LetterTemplate from "@/components/glossary/LetterTemplate";
import { GlossarySection, P, textLink } from "@/components/glossary/GlossarySection";

export default function PastDueInvoiceEmail() {
  return (
    <>
      <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
        <p className="text-lg text-foreground leading-relaxed md:text-xl">
          A past due invoice email asks a customer to pay an invoice that is already late. It names the invoice number, the open amount, the original due date, and a way to pay. A note sent before the due date is a reminder, not a past due email.
        </p>
      </div>

      <GlossarySection id="what-to-include" title="What to include">
        <ul className="flex list-disc flex-col gap-2 pl-5 text-base text-secondary leading-relaxed">
          <li>A subject line with the invoice number, the amount, and the fact that it is past due.</li>
          <li>The due date and the open balance in the first two lines.</li>
          <li>A payment link, and the invoice attached again.</li>
          <li>One sentence that invites a reply if the invoice is wrong, or if payment is already on the way.</li>
        </ul>
        <P>
          Send it from a named person on your domain. A no reply address tells the customer the message is a blast. Timing follows the cadence on{" "}
          <Link href="/blog/invoice-reminder-best-practices" className={textLink}>invoice reminder best practices</Link>: a heads up 7 days before due, a note on the due date, then day 7, day 14, day 21, and day 30, with a channel change when email is ignored.
        </P>
        <P>
          Formal letters, as opposed to email, are on the{" "}
          <Link href="/glossary/dunning-letter" className={textLink}>dunning letter</Link> and{" "}
          <Link href="/glossary/collection-letter" className={textLink}>collection letter</Link> pages. The software that sends this sequence and stops it when the ledger shows a payment is{" "}
          <Link href="/ar-collections-software" className={textLink}>accounts receivable collections software</Link>.
        </P>
      </GlossarySection>

      <GlossarySection id="templates" title="Three past due invoice email templates">
        <P>Replace the brackets. Keep the subject specific. These are examples, not legal advice.</P>
        <LetterTemplate
          title="1. Just past due"
          subject="Invoice [number] for $[amount] is past due"
          body={`Hi [first name],

Invoice [number] for $[amount] was due on [due date]. It is still open.

Pay here: [payment link]. I have attached the invoice again.

If this is already paid, or if a line looks wrong, reply and I will update our side.

Thanks,
[your name]`}
        />
        <LetterTemplate
          title="2. No reply yet"
          subject="Second notice: Invoice [number], [X] days past due"
          body={`Hi [first name],

I have not had a reply on invoice [number] for $[amount]. It was due [due date] and is now [X] days past due.

Please pay by [date]: [payment link].

If something is holding it up, tell me what it is. A missing PO, a dispute, or a date you can pay are all useful. I will pause reminders once I have that.

Thanks,
[your name]`}
        />
        <LetterTemplate
          title="3. Final email before you escalate"
          subject="Final notice: Invoice [number] for $[amount]"
          body={`Hi [first name],

This is my last email on invoice [number] for $[amount], due [due date].

Please pay by [date] at [payment link], or send a payment date I can put on the account.

If I do not hear back by [date], I will [ask your controller / place the account on credit hold / the step you have approved]. I would rather not.

[your name]
[phone]`}
        />
        <P>
          After two unanswered emails, the collections workflow adds SMS, then a call. WhatsApp is available where that is the channel the customer uses. The ledger connection, including{" "}
          <Link href="/solutions/quickbooks" className={textLink}>QuickBooks Online</Link>,{" "}
          <Link href="/solutions/xero" className={textLink}>Xero</Link>,{" "}
          <Link href="/solutions/netsuite" className={textLink}>NetSuite</Link>,{" "}
          <Link href="/solutions/sage" className={textLink}>Sage Intacct</Link>, and{" "}
          <Link href="/solutions/stripe" className={textLink}>Stripe Billing</Link>, is what keeps a paid invoice from getting another email.
        </P>
      </GlossarySection>
    </>
  );
}
