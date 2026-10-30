import Link from "next/link";
import LetterTemplate from "@/components/glossary/LetterTemplate";
import { GlossarySection, P, textLink } from "@/components/glossary/GlossarySection";

export default function DunningLetter() {
  return (
    <>
      <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
        <p className="text-lg text-foreground leading-relaxed md:text-xl">
          A dunning letter is a written notice asking a customer to pay an invoice that is already overdue. Dunning is the sequence, not a single letter: a polite first note, a firmer follow up, and a final notice that says what happens next.
        </p>
      </div>

      <GlossarySection id="what-dunning-means" title="What dunning means">
        <P>
          The word comes from dun, an old English verb for pressing someone to pay a debt.{" "}
          <a href="https://en.wikipedia.org/wiki/Dunning_(process)" className={textLink} target="_blank" rel="noopener noreferrer">
            Dunning
          </a>{" "}
          in accounting is that same persistence, tied to invoice age. The invoice says what is owed. A statement lists the account. A dunning letter asks for money that is late.
        </P>
        <P>
          A{" "}
          <Link href="/glossary/collection-letter" className={textLink}>collection letter</Link>{" "}
          is one demand. A dunning letter is one step in a series. A{" "}
          <Link href="/glossary/past-due-invoice-email" className={textLink}>past due invoice email</Link>{" "}
          is the same request in email form. Teams mix the names. The schedule is what matters.
        </P>
        <P>
          These samples are for a business collecting its own B2B invoices. They are not legal advice, and they are not for consumer debt. The longer four stage guide, with an extra template, is{" "}
          <Link href="/blog/dunning-letter" className={textLink}>Dunning letters: meaning, templates, and timing</Link>.
        </P>
      </GlossarySection>

      <GlossarySection id="when-to-send" title="When to send each letter">
        <P>
          Send a courtesy reminder about 7 days before the due date. That note is not dunning. Dunning starts once the invoice is late. The stages below match the sequence on{" "}
          <Link href="/dunning-management-software" className={textLink}>dunning management software</Link>{" "}
          and the day by day workflow on{" "}
          <Link href="/ar-collections-software" className={textLink}>accounts receivable collections software</Link>.
        </P>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                {["Stage", "When", "Tone"].map((column) => (
                  <th key={column} className="px-4 py-3 font-medium text-xs text-muted uppercase tracking-wide">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 font-medium text-foreground">First notice</td>
                <td className="px-4 py-3 text-secondary">Within a week of the due date</td>
                <td className="px-4 py-3 text-secondary">Assume it was missed. Make paying easy.</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 font-medium text-foreground">Second notice</td>
                <td className="px-4 py-3 text-secondary">About 30 days past due</td>
                <td className="px-4 py-3 text-secondary">Direct. Ask what is blocking payment.</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 font-medium text-foreground">Final notice</td>
                <td className="px-4 py-3 text-secondary">60 to 90 days past due</td>
                <td className="px-4 py-3 text-secondary">State the next step and the date.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <P>
          Stop the sequence when the invoice is paid, disputed, or a payment date is promised. Add SMS or a call when two emails get no reply. That rule is on the collections page.
        </P>
      </GlossarySection>

      <GlossarySection id="templates" title="Three dunning letter templates">
        <P>Replace the brackets. Send them from a person on your team, on your domain.</P>
        <LetterTemplate
          title="1. First notice"
          subject="Invoice [number] for $[amount] is past due"
          body={`Hi [first name],

Invoice [number] for $[amount] was due on [due date]. We have not received payment.

You can pay here: [payment link]. The invoice is attached again.

If payment is already on the way, please ignore this note. If something on the invoice is wrong, reply and we will sort it out.

Thanks,
[your name]
[company]`}
        />
        <LetterTemplate
          title="2. Second notice"
          subject="Second notice: Invoice [number], [X] days past due"
          body={`Hi [first name],

Invoice [number] for $[amount] is now [X] days past due. The due date was [due date].

Please pay here by [date]: [payment link]. If there is a dispute, a missing document, or a date you can commit to, reply with that and we will pause further reminders.

Thanks,
[your name]
[company]`}
        />
        <LetterTemplate
          title="3. Final notice"
          subject="Final notice: Invoice [number] for $[amount]"
          body={`Hi [first name],

This is the final notice on invoice [number] for $[amount], due [due date] and now [X] days past due.

Please pay by [date] at [payment link]. If we do not receive payment or a written payment date by then, we will [next step: credit hold / referral you have already decided on].

If you have already paid, send the reference and we will close this out.

[your name]
[company]`}
        />
        <P>
          Do not threaten a step you will not take. For seriously overdue balances, the product page that frames agency versus in house collections is{" "}
          <Link href="/debt-collection-software" className={textLink}>debt collection software for B2B invoices</Link>.
        </P>
      </GlossarySection>
    </>
  );
}
