import type { ReactNode } from "react";
import Link from "next/link";

const link = "text-brand-blue underline underline-offset-2";

function Term({
  id,
  title,
  href,
  linkLabel,
  children,
}: {
  id: string;
  title: string;
  href?: string;
  linkLabel?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="flex scroll-mt-28 flex-col gap-2 border-t border-border pt-6">
      <h3 className="font-medium text-xl text-foreground tracking-tight">{title}</h3>
      <div className="flex flex-col gap-2 text-base text-secondary leading-relaxed">{children}</div>
      {href && linkLabel && (
        <Link href={href} className={link}>
          {linkLabel}
        </Link>
      )}
    </section>
  );
}

export default function GlossaryIndexTerms() {
  return (
    <div className="flex flex-col gap-6">
      <Term id="accounts-receivable" title="Accounts receivable (AR)">
        <p>
          The money customers owe your business for goods or services delivered on credit but not yet paid. AR is a current asset on the balance sheet and represents future cash.
        </p>
      </Term>

      <Term
        id="days-sales-outstanding"
        title="Days sales outstanding (DSO)"
        href="/glossary/days-sales-outstanding"
        linkLabel="DSO formula, worked example, and how to calculate it"
      >
        <p>
          The average number of days it takes to collect payment after a credit sale. DSO = (Accounts Receivable / Total Credit Sales) x Number of Days. A lower DSO means faster cash conversion. Benchmark yours with the{" "}
          <Link href="/tools/dso-calculator" className={link}>DSO calculator</Link>, and see{" "}
          <Link href="/blog/how-to-reduce-dso" className={link}>7 ways to reduce DSO</Link>.
        </p>
      </Term>

      <Term
        id="average-collection-period"
        title="Average collection period"
        href="/glossary/average-collection-period"
        linkLabel="Average collection period formula and calculator"
      >
        <p>
          The average number of days accounts receivable stay unpaid. When the inputs match, it is the same number as days sales outstanding. The formula is (average accounts receivable / net credit sales) x days in the period.
        </p>
      </Term>

      <Term id="collections-effectiveness-index" title="Collections effectiveness index (CEI)">
        <p>
          A measure of how much of your available receivables you actually collected in a period, expressed as a percentage. Where DSO measures speed, CEI measures thoroughness. A CEI close to 100% means you are collecting nearly everything that was collectable.
        </p>
      </Term>

      <Term
        id="aging-report"
        title="Aging report (AR aging)"
        href="/glossary/accounts-receivable-aging-report"
        linkLabel="Aging buckets and a blank template"
      >
        <p>
          A breakdown of all outstanding invoices grouped by how overdue they are, typically current, 1 to 30 days, 31 to 60, 61 to 90, and 90+. The aging report shows where collection risk is concentrated so you know which accounts to prioritize.
        </p>
      </Term>

      <Term id="net-terms" title="Net terms">
        <p>
          The payment window you extend to a customer, written as &quot;Net&quot; plus a number of days. Net 30 means payment is due 30 days after the invoice date. Common variants include Net 15, Net 45, and Net 60, sometimes with an early-payment discount such as &quot;2/10 Net 30&quot; (a 2% discount if paid within 10 days).
        </p>
      </Term>

      <Term id="dunning" title="Dunning" href="/blog/dunning-letter" linkLabel="Dunning letter: definition, timing, and templates">
        <p>
          The process of communicating with customers to collect overdue payments, usually as a sequence of escalating reminders. Modern dunning runs across multiple channels. See{" "}
          <Link href="/blog/multi-channel-payment-chasing" className={link}>multi-channel payment chasing</Link> for how email, SMS, voice, and WhatsApp compare. Past due email copy is in the{" "}
          <Link href="/blog/invoice-reminder-best-practices#past-due-invoice-email-templates" className={link}>past due invoice email templates</Link>.
        </p>
      </Term>

      <Term
        id="collection-letter"
        title="Collection letter"
        href="/glossary/collection-letter"
        linkLabel="Collection letter samples"
      >
        <p>
          A written demand for a specific past due invoice, sent by the company that is owed the money. It names the invoice, the open amount, the due date, how to pay, and where to raise a dispute. It is one document. The escalating series is a{" "}
          <Link href="/blog/dunning-letter" className={link}>dunning letter</Link>.
        </p>
      </Term>

      <Term id="cash-application" title="Cash application">
        <p>
          Matching incoming payments to the correct open invoices so your ledger reflects what is actually paid. Manual cash application is time-consuming when payments arrive without clear references. Automating it is a major time saver.
        </p>
      </Term>

      <Term
        id="receivable-turnover"
        title="AR turnover ratio"
        href="/glossary/accounts-receivable-turnover"
        linkLabel="Receivable turnover formula and calculator"
      >
        <p>
          How many times per year your business collects its average accounts receivable. AR turnover = Net Credit Sales / Average Accounts Receivable. A higher ratio indicates faster collection.
        </p>
      </Term>

      <Term id="average-days-delinquent" title="Average days delinquent (ADD)">
        <p>
          The average number of days invoices are paid past their due date. While DSO measures time from sale to payment, ADD isolates how late payments are relative to terms, which is a cleaner signal of customer payment behavior.
        </p>
      </Term>

      <Term id="bad-debt" title="Bad debt">
        <p>
          Receivables you no longer expect to collect, which are written off as an expense. A bad debt reserve (allowance for doubtful accounts) is an estimate set aside in advance to absorb expected losses.
        </p>
      </Term>

      <Term id="write-off" title="Write-off">
        <p>
          Formally removing an uncollectable invoice from your receivables and recognizing it as a loss. Knowing{" "}
          <Link href="/blog/when-to-send-invoices-to-collections" className={link}>when to send invoices to collections</Link> before writing them off protects recoverable cash.
        </p>
      </Term>

      <Term id="credit-memo" title="Credit memo">
        <p>
          A document that reduces the amount a customer owes, issued for returns, disputes, overbilling, or agreed discounts. Credit memos adjust the open balance on an invoice.
        </p>
      </Term>

      <Term id="promise-to-pay" title="Promise to pay (PTP)">
        <p>
          A commitment from a customer to pay a specific amount by a specific date. Tracking PTPs and following up when they are missed is a core collections workflow.
        </p>
      </Term>

      <Term id="invoice" title="Invoice">
        <p>
          A bill issued to a customer that lists goods or services, amounts, terms, and the due date. Accurate, promptly sent invoices are the foundation of getting paid on time.
        </p>
      </Term>

      <Term id="payment-portal" title="Payment portal">
        <p>
          A self-service page where customers can view invoices and pay online. Reducing friction at the moment of payment is one of the simplest ways to get paid faster.
        </p>
      </Term>

      <Term id="disputed-invoice" title="Disputed invoice">
        <p>
          An invoice a customer contests over price, quantity, quality, or terms. Disputes freeze cash until resolved, so flagging and routing them quickly is essential to healthy AR.
        </p>
      </Term>

      <Term id="credit-policy" title="Credit policy">
        <p>
          The rules that govern how much credit you extend, to whom, and on what terms. A clear credit policy reduces the risk of late payment and bad debt before an invoice is ever sent. When a customer breaks the policy, the usual response is a{" "}
          <Link href="/blog/credit-hold" className={link}>credit hold</Link>, which blocks new orders on credit until the past due balance is paid.
        </p>
      </Term>

      <Term id="cash-collections" title="Cash collections">
        <p>
          The actual cash received from customers in a period. Forecasting it accurately is harder than it looks. See the{" "}
          <Link href="/blog/cash-collections-formula" className={link}>cash collections formula</Link> for a customer-specific approach.
        </p>
      </Term>

      <Term id="order-to-cash" title="Order to cash (O2C)">
        <p>
          The end-to-end process from a customer order through invoicing, collections, and cash application. AR automation focuses on the back half of O2C: invoicing through collection.
        </p>
      </Term>

      <Term id="factoring" title="Factoring">
        <p>
          Selling your receivables to a third party at a discount in exchange for immediate cash. Factoring trades some margin for faster liquidity and is distinct from automating collections, which speeds up cash without giving up margin.
        </p>
      </Term>

      <Term id="working-capital" title="Working capital">
        <p>
          The cash available to run day-to-day operations, calculated as current assets minus current liabilities. Because receivables tie up cash, reducing DSO directly frees working capital. The{" "}
          <Link href="/tools/dso-calculator" className={link}>DSO calculator</Link> estimates how much.
        </p>
      </Term>
    </div>
  );
}
