export const GLOSSARY_DATE = "2026-10-30";
export const GLOSSARY_DATE_DISPLAY = "October 30, 2026";

export type Faq = { question: string; answer: string };

export type ResourceLink = {
  label: string;
  href: string;
  description: string;
};

export type GlossaryTerm = {
  slug: string;
  /** Visible H1. */
  h1: string;
  /** Metadata title. The root layout appends " | Yonovo", so keep this at 50 characters or fewer. */
  seoTitle: string;
  /** Meta description. Keep under 155 characters. */
  description: string;
  breadcrumb: string;
  keywords: string[];
  summary: string;
  relatedSlugs: string[];
  resources: ResourceLink[];
  faqs: Faq[];
  calculator?: { name: string; description: string };
};

export const glossaryIndex = {
  h1: "Accounts Receivable Glossary",
  seoTitle: "Accounts Receivable Glossary",
  description:
    "Definitions, formulas, and templates for DSO, collection period, receivable turnover, aging reports, and collection letters.",
  faqs: [
    {
      question: "What is this glossary?",
      answer:
        "It is a short reference for the accounts receivable metrics and documents finance teams use to collect faster. Each page leads with a definition, then the formula or template, a worked example where the math matters, and an FAQ.",
    },
    {
      question: "How do DSO, average collection period, and receivable turnover relate?",
      answer:
        "They describe the same relationship. Days sales outstanding and the average collection period count the days receivables stay unpaid. The receivable turnover ratio counts how many times the book is collected in the period. Divide the days in the period by the turnover ratio and you get the collection period.",
    },
    {
      question: "Where are the letter templates?",
      answer:
        "Dunning letter, collection letter, and past due invoice email each have copy you can adapt. They are examples for businesses collecting their own invoices. They are not legal advice and they are not for consumer debt disputes.",
    },
  ] satisfies Faq[],
};

const collections: ResourceLink = {
  label: "Accounts Receivable Collections Software",
  href: "/ar-collections-software",
  description: "The collections workflow day by day: reminders, channel switches, escalation, and when to stop.",
};

const automation: ResourceLink = {
  label: "Accounts Receivable Automation Software",
  href: "/accounts-receivable-automation-software",
  description: "What AR automation software does, and how Yonovo compares with other platforms.",
};

const dunningSoftware: ResourceLink = {
  label: "Dunning Management Software",
  href: "/dunning-management-software",
  description: "What dunning is, the stage sequence, and how automated dunning adapts per customer.",
};

const debt: ResourceLink = {
  label: "Debt Collection Software for B2B Invoices",
  href: "/debt-collection-software",
  description: "Software for collecting your own unpaid B2B invoices, under your brand, without an agency.",
};

const dsoTool: ResourceLink = {
  label: "DSO Calculator",
  href: "/tools/dso-calculator",
  description: "A standalone calculator for days sales outstanding and the cash a lower DSO frees up.",
};

const reduceDso: ResourceLink = {
  label: "How to Reduce DSO",
  href: "/blog/how-to-reduce-dso",
  description: "Seven ways finance teams shorten days sales outstanding.",
};

const stats: ResourceLink = {
  label: "Accounts Receivable Statistics",
  href: "/accounts-receivable-statistics",
  description: "Sourced figures on late payment, DSO, and collections effort.",
};

const reminders: ResourceLink = {
  label: "Invoice Reminder Best Practices",
  href: "/blog/invoice-reminder-best-practices",
  description: "Timing and tone for reminders before and after the due date.",
};

const quickbooks: ResourceLink = {
  label: "Yonovo for QuickBooks Online",
  href: "/solutions/quickbooks",
  description: "Collections that stay in sync with QuickBooks Online invoices and payments.",
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "days-sales-outstanding",
    h1: "Days Sales Outstanding (DSO)",
    seoTitle: "DSO Formula: Days Sales Outstanding",
    description:
      "Days sales outstanding (DSO) is how long credit sales take to become cash. See the formula, a worked example, and a free calculator.",
    breadcrumb: "Days Sales Outstanding",
    keywords: [
      "dso formula",
      "days sales outstanding",
      "how to calculate dso",
      "what is dso",
      "dso calculator",
      "days sales outstanding formula",
    ],
    summary: "The average days it takes to collect a credit sale, with the formula and a calculator.",
    relatedSlugs: [
      "average-collection-period",
      "accounts-receivable-turnover",
      "accounts-receivable-aging-report",
    ],
    resources: [collections, automation, dsoTool, reduceDso, stats, quickbooks],
    calculator: {
      name: "Yonovo DSO Calculator",
      description:
        "Free calculator for days sales outstanding. Enter receivables, credit sales, and the number of days in the period.",
    },
    faqs: [
      {
        question: "What is DSO?",
        answer:
          "Days sales outstanding (DSO) is the average number of days a company takes to collect payment after a credit sale. A lower DSO means cash comes back sooner. A higher DSO means more of the company's cash is sitting in unpaid invoices.",
      },
      {
        question: "What is the DSO formula?",
        answer:
          "DSO = (accounts receivable / credit sales) x days in the period. Use 365 for a year, 90 for a quarter, or 30 for a month. Use average receivables, beginning plus ending divided by two, when you have both balances. Ending receivables are acceptable when that is all you have. Say which figure you used.",
      },
      {
        question: "How do you calculate DSO?",
        answer:
          "Divide accounts receivable by credit sales for the same period, then multiply by the number of days in that period. Example: $180,000 of receivables and $1,200,000 of annual credit sales gives (180,000 / 1,200,000) x 365 = 54.75 days.",
      },
      {
        question: "What is a good DSO?",
        answer:
          "Compare DSO with your own payment terms first. The Credit Research Foundation reported a median DSO of 40.12 days for US credit departments in the first quarter of 2026, and a best possible DSO of 31.59 days. APQC reports that top performers collect in 30 days or less, while bottom performers take 46 days or longer. There is no single good number for every industry.",
      },
      {
        question: "Is DSO the same as the average collection period?",
        answer:
          "Yes, when both calculations use the same receivables figure and the same period. Days sales outstanding and the average collection period are two names for the day count. The receivable turnover ratio is the same relationship stated as a rate: days in the period divided by turnover equals the collection period.",
      },
      {
        question: "How do you reduce DSO?",
        answer:
          "Bill promptly, remind customers before the due date, follow a fixed sequence across email, SMS, phone, and WhatsApp, and stop the sequence when an invoice is paid, disputed, or promised. TDG Inc. cut DSO by 15 days after moving follow up to Yonovo. Read the case study for the rest of that result.",
      },
    ],
  },
  {
    slug: "average-collection-period",
    h1: "Average Collection Period",
    seoTitle: "Average Collection Period Formula",
    description:
      "The average collection period is how many days receivables stay unpaid. Formula, calculator, and a worked example.",
    breadcrumb: "Average Collection Period",
    keywords: [
      "average collection period",
      "average collection period formula",
      "how to calculate average collection period",
      "what is average collection period",
      "collection period formula",
    ],
    summary: "Days receivables stay unpaid. Same result as DSO when the inputs match.",
    relatedSlugs: [
      "days-sales-outstanding",
      "accounts-receivable-turnover",
      "accounts-receivable-aging-report",
    ],
    resources: [collections, dsoTool, reduceDso, stats],
    calculator: {
      name: "Yonovo Average Collection Period Calculator",
      description:
        "Free calculator for the average collection period. Enter average receivables, net credit sales, and the days in the period.",
    },
    faqs: [
      {
        question: "What is the average collection period?",
        answer:
          "The average collection period is the average number of days accounts receivable remain outstanding. It tells a finance team how long credit sales take to turn into cash. It is the day count version of the receivable turnover ratio.",
      },
      {
        question: "What is the average collection period formula?",
        answer:
          "Average collection period = (average accounts receivable / net credit sales) x days in the period. The equivalent form is days in the period divided by the receivable turnover ratio. Both return the same number when the inputs match.",
      },
      {
        question: "How do you calculate the average collection period?",
        answer:
          "Take average receivables, divide by net credit sales for the period, and multiply by the days in the period. With $180,000 of average receivables and $1,200,000 of annual credit sales, the period is (180,000 / 1,200,000) x 365 = 54.75 days.",
      },
      {
        question: "Is the average collection period the same as DSO?",
        answer:
          "Yes, when both use the same receivables balance and the same period. Days sales outstanding is the name most controllers use. Average collection period is the name most textbooks use. Do not track them as two different targets.",
      },
      {
        question: "What is a good average collection period?",
        answer:
          "Shorter than your stated terms is the first test. A Net 30 book with a 55 day collection period is collecting about 25 days late. For an external comparison, the Credit Research Foundation median DSO was 40.12 days in the first quarter of 2026. That median is a DSO figure. It is the right comparison because the two metrics match when the inputs match.",
      },
    ],
  },
  {
    slug: "accounts-receivable-turnover",
    h1: "Accounts Receivable Turnover Ratio",
    seoTitle: "Accounts Receivable Turnover Ratio",
    description:
      "Accounts receivable turnover is how many times you collect the book in a period. Formula, calculator, and a worked example.",
    breadcrumb: "Receivable Turnover",
    keywords: [
      "accounts receivable turnover",
      "receivable turnover ratio",
      "accounts receivable turnover ratio",
      "how to calculate accounts receivable turnover",
      "what is accounts receivable turnover",
    ],
    summary: "How many times receivables are collected in a period. Higher means faster cash.",
    relatedSlugs: [
      "days-sales-outstanding",
      "average-collection-period",
      "accounts-receivable-aging-report",
    ],
    resources: [collections, automation, stats, reduceDso],
    calculator: {
      name: "Yonovo Receivable Turnover Calculator",
      description:
        "Free calculator for the accounts receivable turnover ratio and the matching collection period in days.",
    },
    faqs: [
      {
        question: "What is accounts receivable turnover?",
        answer:
          "Accounts receivable turnover is the number of times a company collects its average receivables during a period. A ratio of 6 means the book was collected about six times. Higher turnover means cash returns faster, as long as credit sales and receivables cover the same period.",
      },
      {
        question: "What is the receivable turnover ratio formula?",
        answer:
          "Receivable turnover ratio = net credit sales / average accounts receivable. Average receivables are the beginning balance plus the ending balance, divided by two. Use net credit sales, not cash sales, because cash sales never sit in receivables.",
      },
      {
        question: "How do you calculate accounts receivable turnover?",
        answer:
          "Divide net credit sales by average accounts receivable. Example: $1,200,000 of annual credit sales and $180,000 of average receivables gives 1,200,000 / 180,000 = 6.67 times. The day equivalent is 365 / 6.67 = 54.75 days.",
      },
      {
        question: "What is a good accounts receivable turnover ratio?",
        answer:
          "There is no universal good ratio. Convert the ratio to days and compare those days with your terms. A published anchor is the Credit Research Foundation median DSO of 40.12 days in the first quarter of 2026. On a 365 day year, that median is about 9.1 turns (365 / 40.12). That conversion is arithmetic on their DSO figure. CRF does not publish a turnover benchmark.",
      },
      {
        question: "What is the difference between turnover and DSO?",
        answer:
          "Turnover is a rate. DSO is a day count. DSO = days in the period / receivable turnover. A turnover of 6.67 and a DSO of 54.75 days are the same collection speed, stated two ways.",
      },
    ],
  },
  {
    slug: "accounts-receivable-aging-report",
    h1: "Accounts Receivable Aging Report",
    seoTitle: "AR Aging Report: Buckets and Template",
    description:
      "An accounts receivable aging report groups open invoices by how late they are. See the buckets and copy a template.",
    breadcrumb: "AR Aging Report",
    keywords: [
      "accounts receivable aging report",
      "ar aging report",
      "what is an accounts receivable aging report",
      "how do i read an accounts receivable aging report",
      "ar aging buckets",
    ],
    summary: "Open invoices sorted into current, 1 to 30, 31 to 60, 61 to 90, and 90 plus.",
    relatedSlugs: [
      "days-sales-outstanding",
      "dunning-letter",
      "past-due-invoice-email",
    ],
    resources: [collections, debt, stats, reminders],
    faqs: [
      {
        question: "What is an accounts receivable aging report?",
        answer:
          "An accounts receivable aging report lists open invoices and sorts the balance by how many days past the due date each invoice is. It shows where cash is stuck. DSO is one average. The aging report is the list behind that average.",
      },
      {
        question: "What are the buckets on an AR aging report?",
        answer:
          "The conventional buckets are Current (not yet due), 1 to 30 days past due, 31 to 60, 61 to 90, and 90 plus. Put each invoice amount in one bucket only. The buckets should add up to the open receivables balance.",
      },
      {
        question: "How do you read an accounts receivable aging report?",
        answer:
          "Start with the total, then the share sitting in 61 days and older. Those invoices need a person, not another identical email. Current and 1 to 30 are where a steady reminder sequence does most of the work. A customer with a growing 90 plus balance is a credit decision, not only a collections task.",
      },
      {
        question: "How often should you run an aging report?",
        answer:
          "Run it on a fixed cadence. Weekly is enough for most B2B teams, with a full review at month end before you close. The value is the comparison to last period, not a one time printout.",
      },
      {
        question: "What is the difference between an aging report and DSO?",
        answer:
          "DSO compresses the whole book into one number of days. The aging report shows which invoices and which customers produce that number. Use DSO to see the trend. Use the aging report to decide who to call.",
      },
    ],
  },
  {
    slug: "dunning-letter",
    h1: "Dunning Letter",
    seoTitle: "What Is a Dunning Letter?",
    description:
      "A dunning letter asks a customer to pay an overdue invoice. Definition, when to send one, and three sample templates.",
    breadcrumb: "Dunning Letter",
    keywords: [
      "dunning letter",
      "what is a dunning letter",
      "dunning letter template",
      "what does dunning mean",
      "dunning letter example",
    ],
    summary: "A written notice asking for an overdue invoice, sent as a sequence that gets firmer.",
    relatedSlugs: ["collection-letter", "past-due-invoice-email", "accounts-receivable-aging-report"],
    resources: [dunningSoftware, collections, reminders, debt],
    faqs: [
      {
        question: "What is a dunning letter?",
        answer:
          "A dunning letter is a written notice asking a customer to pay an invoice that is already overdue. One letter rarely collects on its own. Dunning is the sequence: a polite first note, a firmer follow up, and a final notice that states what happens next.",
      },
      {
        question: "What does dunning mean?",
        answer:
          "Dunning means persisting in a request for payment. The word comes from the old English verb dun, to demand a debt. In accounts receivable software, a dunning sequence is the scheduled series of reminders tied to invoice age.",
      },
      {
        question: "When should you send a dunning letter?",
        answer:
          "Send the first one within a week of the due date, after a courtesy reminder that went out before the invoice was due. Move to a firmer letter around 30 days past due, and to a final notice once the invoice is in the 60 to 90 day range and earlier notes have had no reply. Match the tone to the aging bucket, not to your mood that day.",
      },
      {
        question: "How is a dunning letter different from a collection letter?",
        answer:
          "A collection letter is a single written demand for a past due balance. A dunning letter is one step in a planned series. Teams often use the words interchangeably. The useful distinction is sequence versus a one off letter.",
      },
      {
        question: "Are these dunning templates legal advice?",
        answer:
          "No. They are examples for a business collecting its own B2B invoices. They are not a filing, and they are not for consumer debt. Have counsel review any letter that threatens legal action or that you will send on a large or disputed balance.",
      },
    ],
  },
  {
    slug: "collection-letter",
    h1: "Collection Letter",
    seoTitle: "Collection Letter: Meaning and Samples",
    description:
      "A collection letter is a written demand for a past due B2B invoice. How it differs from dunning, plus samples.",
    breadcrumb: "Collection Letter",
    keywords: [
      "collection letter",
      "collection letter sample",
      "what is a collection letter",
      "accounts receivable collection letter",
      "b2b collection letter",
    ],
    summary: "A written demand for a past due B2B invoice, sent by the company that is owed the money.",
    relatedSlugs: ["dunning-letter", "past-due-invoice-email", "accounts-receivable-aging-report"],
    resources: [debt, collections, dunningSoftware, reminders],
    faqs: [
      {
        question: "What is a collection letter?",
        answer:
          "A collection letter is a written request for payment of a specific past due invoice. On this page it means a letter from the company that issued the invoice, sent to its own customer. It is not a letter from a third party collection agency, and it is not a letter a consumer sends to dispute a debt.",
      },
      {
        question: "How is a collection letter different from a dunning letter?",
        answer:
          "A collection letter is one document. Dunning is the series of documents, each a bit firmer, tied to how late the invoice is. You can send a collection letter as one step inside a dunning sequence.",
      },
      {
        question: "What should a collection letter include?",
        answer:
          "The invoice number, the amount still open, the original due date, how many days late it is, how to pay, and where to send a dispute. A later letter should also say what you will do next, and by when. Leave out threats you do not intend to carry out.",
      },
      {
        question: "Is this page for consumer debt collection?",
        answer:
          "No. These samples are for a business collecting its own commercial invoices. If you are a person who received a letter from a collection agency, use the Federal Trade Commission's debt collection guidance. Do not adapt these templates for that situation.",
      },
      {
        question: "How many collection letters should you send?",
        answer:
          "Most B2B teams send a short sequence over the first 90 days, then decide: payment plan, credit hold, or a referral you have already described in the final letter. The number matters less than sending them on a schedule and stopping when the invoice is paid or disputed.",
      },
    ],
  },
  {
    slug: "past-due-invoice-email",
    h1: "Past Due Invoice Email",
    seoTitle: "Past Due Invoice Email Templates",
    description:
      "A past due invoice email asks for payment that is already late. Three templates with subject lines you can adapt.",
    breadcrumb: "Past Due Invoice Email",
    keywords: [
      "past due invoice email",
      "past due invoice email template",
      "overdue invoice email",
      "past due notice email",
      "invoice reminder email",
    ],
    summary: "Email copy for an invoice that is already late, from a first note to a final notice.",
    relatedSlugs: ["dunning-letter", "collection-letter", "accounts-receivable-aging-report"],
    resources: [collections, reminders, dunningSoftware, quickbooks],
    faqs: [
      {
        question: "What is a past due invoice email?",
        answer:
          "A past due invoice email tells a customer that an invoice is overdue and asks them to pay it. It should name the invoice, the open amount, the due date, and a way to pay. A reminder sent before the due date is not a past due email.",
      },
      {
        question: "What should a past due invoice email include?",
        answer:
          "Subject line with the invoice number and amount, a short statement that the invoice is past due, the original due date, the open balance, a payment link, and a line that invites them to reply if something on the invoice is wrong. Send it from a person at your company, not from a no reply address.",
      },
      {
        question: "When should you send a past due invoice email?",
        answer:
          "Send a courtesy note about 7 days before the due date, then a past due email on the due date or within a week after it. Add a second channel around 14 days overdue if email gets no reply. Escalate the audience around day 30. That cadence is the one Yonovo documents for collections.",
      },
      {
        question: "What is a good subject line for a past due invoice?",
        answer:
          "Use the invoice number, the amount, and the status. Examples: 'Invoice 1042 for $4,200 is past due' or 'Second notice: Invoice 1042, 21 days past due.' Vague subjects get buried. Do not use all caps or fake urgency.",
      },
      {
        question: "Should a past due email come from a person?",
        answer:
          "Yes. Customers pay a name they recognize. Yonovo sends follow up from the client's own email domain so the message looks like the company the customer already bought from, not like an outside collector.",
      },
    ],
  },
];

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((term) => term.slug === slug);
}

export function glossaryPath(slug: string): string {
  return `/glossary/${slug}`;
}
