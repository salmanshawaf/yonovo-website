import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

/**
 * Competitor comparison pages (Yonovo vs X).
 *
 * One authoritative page per competitor at a root URL (e.g. /yonovo-vs-upflow).
 * Copy is written fair-and-credible: an answer-first verdict, a normalized
 * comparison table with real cells, an honest "where {competitor} is stronger"
 * concession, and a segmented "choose X if" close. See the approved plan.
 *
 * Section/verdict/FAQ strings support inline internal links using markdown
 * link syntax, [label](/path), which ComparePageTemplate renders as <Link>.
 */

// A table cell is either a yes/no (rendered as a check/cross) or literal text.
export type CompareCell = boolean | string;

export type ComparisonData = {
  /** Route slug and canonical path segment, e.g. "yonovo-vs-upflow". */
  slug: string;
  competitor: {
    name: string;
    /** Public site, shown as a sourced reference under the table. */
    site: string;
  };
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    headline: string;
    subhead: string;
  };
  /** Answer-first verdict. First paragraph carries the bottom line (~80 words). */
  verdict: string[];
  /** e.g. "July 2026", shown as a "Last reviewed" freshness signal. */
  lastReviewed: string;
  table: {
    rows: { feature: string; yonovo: CompareCell; competitor: CompareCell }[];
  };
  /** H2-per-criterion deep dives. Body paragraphs may contain inline links. */
  sections: { heading: string; body: string[] }[];
  /** The credibility multiplier: an honest concession section. */
  competitorStrengths: {
    heading: string;
    intro: string;
    points: string[];
  };
  /** Segmented close. */
  choose: {
    yonovo: string[];
    competitor: string[];
  };
  faqs: { question: string; answer: string }[];
};

export const comparisons: Record<string, ComparisonData> = {
  upflow: {
    slug: "yonovo-vs-upflow",
    competitor: { name: "Upflow", site: "upflow.io" },
    meta: {
      title: "Yonovo vs Upflow: AR Automation Compared (2026)",
      description:
        "Yonovo vs Upflow, side by side: onboarding, pricing, channels, integrations, and best fit. See which AR automation platform matches your team.",
    },
    hero: {
      badge: "Compare",
      headline: "Yonovo vs Upflow",
      subhead:
        "Both automate accounts receivable, but they fit different teams. Here is an honest, side-by-side look at where each one wins.",
    },
    verdict: [
      "Yonovo and Upflow both connect to your accounting system and automate invoice follow-ups, but they are built for different teams. Upflow is a self-serve Financial Relationship Management platform aimed at venture-backed SaaS companies with $10M+ ARR, priced by revenue bracket with SMS, postal, and calls metered per use. Yonovo is a white-glove AR automation service for SMB and mid-market teams across industries: a dedicated Slack channel and hands-on onboarding get collections running across email, SMS, AI voice, and WhatsApp in about a day.",
      "Choose Upflow if you are a scaled SaaS company that wants an engagement layer and free AR benchmarking. Choose Yonovo if you want a team to get collections live for you this week, with multi-channel outreach included rather than metered per use.",
    ],
    lastReviewed: "July 2026",
    table: {
      rows: [
        { feature: "Best for", yonovo: "SMB & mid-market, all industries", competitor: "Venture-backed SaaS, $10M+ ARR" },
        { feature: "Onboarding & support", yonovo: "Dedicated Slack channel + hands-on onboarding and rollout", competitor: "Self-serve; sales-assisted on higher tiers" },
        { feature: "Time to first follow-up", yonovo: "About a day, set up with you", competitor: "2 to 3 weeks" },
        { feature: "Pricing model", yonovo: "Custom quote (book a demo)", competitor: "Tiered by ARR bracket, quote-based" },
        { feature: "Channels included", yonovo: "Email, SMS, AI voice, WhatsApp", competitor: "Email (SMS, postal, calls metered)" },
        { feature: "Per-use channel fees", yonovo: false, competitor: true },
        { feature: "AI voice calls", yonovo: true, competitor: false },
        { feature: "Executes collections for you", yonovo: true, competitor: "Workflow-driven, self-managed" },
        { feature: "Free AR benchmarking tier", yonovo: false, competitor: true },
      ],
    },
    sections: [
      {
        heading: "Positioning and target customer",
        body: [
          "The clearest difference between Upflow and Yonovo is who they sell to. Upflow publishes four tiers, three gated by annual recurring revenue: Discover (free), Grow ($0 to $10M ARR), Scale ($10M to $50M ARR), and Strategic ($50M+ ARR). Its customer showcase, Front, Lattice, Productboard, Postman, reinforces the audience: venture-funded SaaS companies with subscription revenue.",
          "Yonovo was built for a broader range of B2B companies: [manufacturers](/industries/manufacturing), [wholesale distributors](/industries/wholesale-distribution), [professional services firms](/industries/professional-services), [gyms and fitness studios](/industries/gyms-fitness), and SaaS businesses. The common thread is smaller finance teams chasing payments across many invoices that do not have weeks to spend on implementation.",
        ],
      },
      {
        heading: "Onboarding: white-glove vs self-serve",
        body: [
          "This is where the two approaches diverge most. Upflow is self-serve software: you configure workflows, map integrations, and set up templates yourself, with sales assistance on the higher tiers. A typical implementation runs two to three weeks.",
          "Yonovo is a hands-on service. Every customer gets a dedicated Slack channel with the Yonovo team and is walked through onboarding and rollout, so collections are usually running in about a day rather than a quarter. [Troyes](/case-studies/troyes) went from fully manual to fully automated in a single day, and [TDG Inc](/case-studies/tdg-inc) cut manual follow-ups by 80% and DSO by 15 days. If you do not have a project owner to spare, having a team get you to value is the meaningful difference.",
        ],
      },
      {
        heading: "Pricing and total cost",
        body: [
          "Upflow's paid tiers (Grow, Scale, Strategic) are not listed publicly; you book a demo to get quoted. On top of the subscription, Upflow meters several channels: SMS (from around $0.02 per segment in the US), postal letters (around $1.20 per domestic one-page letter), and live calls (variable, plus per-minute recording and transcription).",
          "Yonovo's pricing is custom, scaled to your size and quoted after a short demo, and it includes multi-channel outreach, email, SMS, voice, and WhatsApp, in the plan rather than metering channels per use. If you have a customer base that responds to SMS or postal reminders at volume, an all-included model can be materially cheaper than a subscription plus per-use fees. [See how Yonovo pricing works](/pricing).",
        ],
      },
      {
        heading: "Channels and outreach",
        body: [
          "Upflow is email-first, adding SMS, postal, and live calls as metered extensions. Yonovo treats multi-channel as first-class: you can design an escalation path that moves from a friendly email at day 1 to an SMS at day 14 to an AI voice reminder at day 30, without thinking about per-use charges. For the reasoning behind this, see [multi-channel payment chasing](/blog/multi-channel-payment-chasing).",
        ],
      },
      {
        heading: "Integrations",
        body: [
          "Both cover the major accounting systems. Upflow integrates with QuickBooks, Xero, NetSuite, Sage, and Stripe (a core integration given the SaaS focus), plus a public API. Yonovo integrates with [QuickBooks Online](/solutions/quickbooks), [Xero](/solutions/xero), [Odoo](/solutions/odoo), [NetSuite](/solutions/netsuite), [Sage Intacct](/solutions/sage), FreshBooks, Salesforce, HubSpot, and SAP, with real-time two-way sync and a check before every reminder so paid invoices are not chased. If your stack is Stripe plus NetSuite and you value API extensibility, Upflow has the stronger developer story; if it includes Odoo, FreshBooks, Salesforce, HubSpot, or SAP, Yonovo is the more direct path.",
        ],
      },
    ],
    competitorStrengths: {
      heading: "Where Upflow is stronger",
      intro: "A fair comparison names what the other tool does well. Upflow leads in a few areas:",
      points: [
        "Financial Relationship Management: an engagement-first model built for teams managing fewer, higher-value recurring accounts over long periods.",
        "SaaS billing depth: strong Stripe integration and handling of recurring invoices, partial payments, and subscription flows.",
        "Free benchmarking: the Discover tier offers AR analytics and DSO benchmarking at no cost, useful regardless of which paid tool you pick.",
        "Developer extensibility: a public API at developer.upflow.io for custom setups.",
      ],
    },
    choose: {
      yonovo: [
        "You want a team to set collections up for you in a shared Slack channel, not a login and a help doc.",
        "You need collections running by end of day, not end of quarter.",
        "You are on QuickBooks, Xero, Odoo, Sage, FreshBooks, Salesforce, HubSpot, or SAP.",
        "You want email, SMS, AI voice, and WhatsApp included, not metered.",
        "You chase many invoices where per-use channel fees would stack up.",
      ],
      competitor: [
        "You are a venture-backed SaaS company with $10M+ ARR and a revenue operations team.",
        "You want a customer engagement layer and see AR as a relationship function.",
        "Your billing runs on Stripe and you value API-level extensibility.",
        "You mainly want free AR benchmarking to start.",
      ],
    },
    faqs: [
      {
        question: "What is the main difference between Upflow and Yonovo?",
        answer:
          "Upflow is self-serve Financial Relationship Management software aimed at venture-backed SaaS companies with $10M+ ARR, priced by revenue bracket. Yonovo is a white-glove AR automation service for SMB and mid-market teams across industries, with a dedicated Slack channel, hands-on onboarding, and multi-channel outreach included.",
      },
      {
        question: "How long does it take to implement Upflow vs Yonovo?",
        answer:
          "Upflow implementations typically take 2 to 3 weeks of self-serve configuration. Yonovo's team sets you up in a dedicated Slack channel and gets collections running in about a day. For teams without project resources to spare, the difference is meaningful.",
      },
      {
        question: "Which accounting systems do Upflow and Yonovo integrate with?",
        answer:
          "Upflow integrates with QuickBooks, Xero, NetSuite, Sage, and Stripe, plus a public API. Yonovo integrates with QuickBooks Online, Xero, Odoo, NetSuite, Sage Intacct, FreshBooks, Salesforce, HubSpot, and SAP. Both support two-way sync, though depth varies by integration.",
      },
      {
        question: "How does pricing compare between Upflow and Yonovo?",
        answer:
          "Upflow has four tiers: Discover (free), Grow, Scale, and Strategic. Paid pricing is not published and requires a sales call, and SMS, postal, and live calls are billed per use on top of the plan. Yonovo's pricing is also quote-based, scaled to your size after a demo, but it includes email, SMS, voice, and WhatsApp outreach rather than metering channels.",
      },
      {
        question: "Which platform is better for SaaS companies?",
        answer:
          "Upflow was built with SaaS subscription billing in mind and counts Front, Lattice, Productboard, and Postman among its customers. Yonovo also supports SaaS billing, but its reach extends to manufacturing, wholesale, professional services, and other traditional B2B industries.",
      },
      {
        question: "Do both platforms support multi-channel outreach?",
        answer:
          "Both support email, SMS, postal, and phone outreach. Upflow meters SMS, postal, and live calls as add-on costs. Yonovo includes email, SMS, AI voice, and WhatsApp within the plan, so escalation across channels does not add per-use fees.",
      },
      {
        question: "Can I switch from Upflow to Yonovo?",
        answer:
          "Yes. Both platforms sit on top of your accounting system, so your invoices, customers, and payments stay in your ledger. Migration is mostly reconfiguring workflows and templates, and because Yonovo's team onboards you in a day, it is a low-risk way to test before fully cutting over.",
      },
    ],
  },

  chaser: {
    slug: "yonovo-vs-chaser",
    competitor: { name: "Chaser", site: "chaserhq.com" },
    meta: {
      title: "Yonovo vs Chaser: AR Automation Compared (2026)",
      description:
        "Yonovo vs Chaser, side by side: onboarding, pricing, channels, integrations, and forecasting. See which AR automation platform fits your team.",
    },
    hero: {
      badge: "Compare",
      headline: "Yonovo vs Chaser",
      subhead:
        "Two AR automation platforms built in different markets. Here is an honest, side-by-side look at where each one wins.",
    },
    verdict: [
      "Yonovo and Chaser both connect to your accounting system and automate chasing unpaid invoices, but they were built for different markets. Chaser is a UK-based, self-serve platform with strong cash-flow forecasting, deep Xero integration, and an optional outsourced credit-control service (Care). Yonovo is a US-based, white-glove service: a dedicated Slack channel and hands-on onboarding get collections live across email, SMS, AI voice, and WhatsApp in about a day, with multi-channel outreach included.",
      "Choose Chaser if you are a UK or European team that wants built-in forecasting or a human to chase on your behalf. Choose Yonovo if you want a US-based team to get collections running for you this week, with multi-channel outreach included.",
    ],
    lastReviewed: "July 2026",
    table: {
      rows: [
        { feature: "Best for", yonovo: "US SMB & mid-market, all industries", competitor: "UK & European SMB, accountants" },
        { feature: "Onboarding & support", yonovo: "Dedicated Slack channel + hands-on onboarding and rollout", competitor: "Self-serve; assisted onboarding on Complete tier" },
        { feature: "Time to first follow-up", yonovo: "About a day, set up with you", competitor: "Not published; guided on higher tiers" },
        { feature: "Pricing model", yonovo: "Custom quote (book a demo)", competitor: "Published GBP tiers, from £199/mo" },
        { feature: "Channels included", yonovo: "Email, SMS, AI voice, WhatsApp", competitor: "Email, SMS, auto-call, postal" },
        { feature: "AI voice calls", yonovo: true, competitor: true },
        { feature: "Cash flow forecasting", yonovo: "Operational dashboards (aging, DSO)", competitor: "Revenue, receivables & cash flow forecasts" },
        { feature: "Outsourced AR specialist", yonovo: false, competitor: "Yes (Care, from £324/mo)" },
        { feature: "Geographic focus", yonovo: "US first", competitor: "UK & Europe first" },
      ],
    },
    sections: [
      {
        heading: "Positioning and target customer",
        body: [
          "Chaser is a UK company that prices in GBP, leads with cash flow forecasting, and runs an active partner program for accountants and bookkeepers. Its customer base is SMB-heavy, with a concentration in the Xero ecosystem, and it claims more than 10,000 users worldwide.",
          "Yonovo was built for US-based businesses, prices in USD, and integrates broadly across [QuickBooks](/solutions/quickbooks), [Xero](/solutions/xero), [NetSuite](/solutions/netsuite), [Sage Intacct](/solutions/sage), [Odoo](/solutions/odoo), FreshBooks, Salesforce, HubSpot, and SAP. Customers span [manufacturing](/industries/manufacturing), [wholesale and distribution](/industries/wholesale-distribution), [professional services](/industries/professional-services), and more.",
        ],
      },
      {
        heading: "Onboarding: white-glove vs self-serve",
        body: [
          "Chaser is self-serve software. Its Compact and Core tiers do not include onboarding services; assisted onboarding with a dedicated account manager appears on the Complete tier. Reviews mention a learning curve on the more advanced features, consistent with a platform that has accumulated depth over time.",
          "Yonovo is a hands-on service. Every customer gets a dedicated Slack channel with the Yonovo team and is walked through onboarding and rollout, so collections are usually running in about a day. [Troyes](/case-studies/troyes) automated in a single day and [TDG Inc](/case-studies/tdg-inc) cut manual follow-ups by 80% within three months. If your finance team is already behind on closing the books, having a team get you live is the meaningful difference.",
        ],
      },
      {
        heading: "Pricing and total cost",
        body: [
          "Chaser publishes four GBP tiers gated by revenue: Compact (from £199/month; 4 users, 30 templates, 4 workflows, revenue under £4M), Core (from £599/month; unlimited users, revenue under £10 to 20M), Complete (from £899/month; adds a dedicated account manager, assisted onboarding, and receivables forecast), and Custom. A Care add-on starts from £324/month. Chaser offers 10% off annual plans. Watch the Compact ceiling: many growing teams hit the 4-user, 4-workflow caps and move up to Core.",
          "Yonovo's pricing is custom, scaled to your size and quoted after a short demo, with multi-channel outreach included. On price transparency, Chaser is the more open of the two, since it lists its tiers publicly. [See how Yonovo pricing works](/pricing).",
        ],
      },
      {
        heading: "Forecasting and reporting",
        body: [
          "This is where Chaser is genuinely differentiated, and it is fair to say so directly. Chaser includes revenue forecast, receivables forecast, and cash flow forecast tools, with receivables forecast on the Complete tier. If your CFO or board wants forecasting and AR in one tool, Chaser folds them together.",
          "Yonovo focuses on operational AR: aging dashboards, DSO tracking, collection effectiveness, and a daily briefing summarizing what was sent and what was recovered. If forecasting is the primary reason you are evaluating, Chaser leads here; if you want the tool to run collections in the background and surface exceptions, Yonovo is more focused on that.",
        ],
      },
      {
        heading: "Integrations",
        body: [
          "Both cover the major accounting systems. Chaser integrates with Xero, QuickBooks Online, Sage (50, 200, Intacct), SAP, Microsoft Dynamics 365, AccountsIQ, Odoo, and NetSuite, plus CRMs like HubSpot, Salesforce, and Pipedrive; its Xero integration is the most often cited strength. Yonovo integrates with [QuickBooks Online](/solutions/quickbooks), [Xero](/solutions/xero), [Odoo](/solutions/odoo), [NetSuite](/solutions/netsuite), [Sage Intacct](/solutions/sage), FreshBooks, Salesforce, HubSpot, and SAP, with particular strength for QuickBooks-centric US businesses and teams running Salesforce or HubSpot as the invoicing source of record.",
        ],
      },
    ],
    competitorStrengths: {
      heading: "Where Chaser is stronger",
      intro: "A fair comparison names what the other tool does well. Chaser leads in a few areas:",
      points: [
        "Cash flow forecasting: built-in revenue, receivables, and cash flow forecasts in the same platform as collections.",
        "Xero ecosystem: a deep, frequently praised Xero integration and a strong accountant and bookkeeper partner channel.",
        "Outsourced credit control: the Care add-on puts a dedicated AR specialist on your follow-ups, calls, disputes, and reconciliation.",
        "UK and Europe fit: GBP pricing, multi-currency handling, and UK operations for teams based there.",
        "Price transparency: Chaser publishes its plan prices, so you can budget upfront instead of requesting a quote.",
      ],
    },
    choose: {
      yonovo: [
        "You want a US-based team to set collections up for you in a shared Slack channel.",
        "You need collections running by end of day, not end of quarter.",
        "You want multi-channel outreach (email, SMS, AI voice, WhatsApp) included in one plan.",
        "You are on QuickBooks, NetSuite, Sage, or running invoicing out of Salesforce or HubSpot.",
      ],
      competitor: [
        "You are a UK or European business comfortable with GBP pricing.",
        "You run Xero as your source of truth and value the ecosystem fit.",
        "You want built-in cash flow and receivables forecasting.",
        "You want the option to outsource collections to a dedicated AR specialist.",
        "You want to see plan prices upfront rather than request a quote.",
      ],
    },
    faqs: [
      {
        question: "What is the main difference between Yonovo and Chaser?",
        answer:
          "Chaser is a UK-based, self-serve AR platform with strong forecasting, deep Xero integration, and an optional outsourced AR specialist service (Care). Yonovo is a US-based, white-glove service with a dedicated Slack channel, hands-on onboarding, and multi-channel outreach included.",
      },
      {
        question: "How long does it take to implement Yonovo vs Chaser?",
        answer:
          "Yonovo's team onboards you in a dedicated Slack channel and gets collections running in about a day. Chaser does not publish a typical implementation timeline; assisted onboarding appears on its mid-tier Complete plan, suggesting a more guided, self-managed setup.",
      },
      {
        question: "Which accounting systems do Yonovo and Chaser integrate with?",
        answer:
          "Chaser integrates with Xero, QuickBooks Online, Sage (50, 200, Intacct), SAP, Microsoft Dynamics 365, AccountsIQ, Odoo, and NetSuite, and is particularly strong on Xero. Yonovo integrates with QuickBooks Online, Xero, Odoo, NetSuite, Sage Intacct, FreshBooks, Salesforce, HubSpot, and SAP, and is particularly strong on QuickBooks, Salesforce, HubSpot, and SAP.",
      },
      {
        question: "How does Chaser pricing compare to Yonovo pricing?",
        answer:
          "Chaser publishes four GBP tiers: Compact (from £199/mo), Core (from £599/mo), Complete (from £899/mo), and Custom, plus a Care add-on from £324/mo. Yonovo's pricing is custom to your size and quoted after a demo, with multi-channel outreach included. Chaser is the more transparent of the two on price, since it publishes its tiers.",
      },
      {
        question: "Does Chaser do cash flow forecasting? Does Yonovo?",
        answer:
          "Cash flow forecasting is a genuine Chaser strength: it includes revenue, receivables, and cash flow forecast tools. Yonovo focuses on operational AR, aging dashboards, DSO tracking, collection effectiveness, and a daily briefing, rather than forecasting. If forecasting is your priority, Chaser leads here.",
      },
      {
        question: "Can I outsource collections through Yonovo or Chaser?",
        answer:
          "Chaser offers Care, a paid add-on from £324/mo, that provides a dedicated AR specialist to handle follow-ups, calls, disputes, and reconciliation. Yonovo does not offer an outsourced AR specialist; instead, its team gets your automation running and it chases customers for you across channels.",
      },
      {
        question: "Can I switch between Yonovo and Chaser?",
        answer:
          "Yes. Both sit on top of your accounting system, so your invoices, customers, and payments stay in your ledger. Migration is mostly reconfiguring workflows and templates, and Yonovo's same-day onboarding makes it low-risk to test before cutting over.",
      },
    ],
  },

  invoiced: {
    slug: "yonovo-vs-invoiced",
    competitor: { name: "Invoiced", site: "invoiced.com" },
    meta: {
      title: "Yonovo vs Invoiced: AR Automation Compared (2026)",
      description:
        "Yonovo vs Invoiced, side by side: onboarding, pricing, channels, cash application, and best fit. See which AR automation platform matches your team.",
    },
    hero: {
      badge: "Compare",
      headline: "Yonovo vs Invoiced",
      subhead:
        "Two invoice-to-cash platforms aimed at different buyers. Here is an honest, side-by-side look at where each one wins.",
    },
    verdict: [
      "Yonovo and Invoiced both automate the invoice-to-cash process, but they aim at different buyers. Invoiced is a mid-market-to-enterprise AR platform with deep ERP integration, AI-powered cash application, and global multi-currency payments, sold through demos with pricing on request. Yonovo is a white-glove AR automation service for SMB and mid-market teams: a dedicated Slack channel and hands-on onboarding get collections running across email, SMS, AI voice, and WhatsApp in about a day.",
      "Choose Invoiced if you are a larger enterprise with complex ERP and global payment needs. Choose Yonovo if you want a team to get collections live for you this week, with multi-channel outreach included.",
    ],
    lastReviewed: "July 2026",
    table: {
      rows: [
        { feature: "Best for", yonovo: "SMB & mid-market, all industries", competitor: "Mid-market & enterprise" },
        { feature: "Onboarding & support", yonovo: "Dedicated Slack channel + hands-on onboarding and rollout", competitor: "Enterprise implementation, demo-led" },
        { feature: "Time to first follow-up", yonovo: "About a day, set up with you", competitor: "Enterprise onboarding timeline" },
        { feature: "Pricing", yonovo: "Custom quote (book a demo)", competitor: "Not published (contact sales)" },
        { feature: "Channels included", yonovo: "Email, SMS, AI voice, WhatsApp", competitor: "Email, payment portal-centric" },
        { feature: "AI voice calls", yonovo: true, competitor: false },
        { feature: "AI cash application", yonovo: "Automatic payment matching", competitor: "AI-powered reconciliation" },
        { feature: "Global / multi-currency payments", yonovo: "US-focused", competitor: true },
        { feature: "Built-in B2B payments", yonovo: "Via connected systems", competitor: true },
      ],
    },
    sections: [
      {
        heading: "Positioning and target customer",
        body: [
          "Invoiced positions itself as a comprehensive invoice-to-cash platform for mid-market and enterprise finance teams, with role-based solutions for CFOs, controllers, and AR managers and customers including large enterprises. Its strengths cluster around AI cash application, built-in B2B payments, and deep ERP and CRM integration.",
          "Yonovo is built for SMB and mid-market teams across industries: [manufacturing](/industries/manufacturing), [wholesale and distribution](/industries/wholesale-distribution), [professional services](/industries/professional-services), and more. The focus is smaller finance teams that want collections running fast without an enterprise implementation.",
        ],
      },
      {
        heading: "Onboarding: white-glove vs enterprise rollout",
        body: [
          "Invoiced is sold through demos and typically involves an enterprise-style implementation to configure workflows, payments, and ERP integration. That depth suits large teams with dedicated finance-systems resources.",
          "Yonovo is a hands-on service for teams that do not have that. Every customer gets a dedicated Slack channel with the Yonovo team and is walked through onboarding and rollout, so collections are usually running in about a day. [Troyes](/case-studies/troyes) automated in a single day, and [TDG Inc](/case-studies/tdg-inc) cut manual follow-ups by 80% and DSO by 15 days.",
        ],
      },
      {
        heading: "Pricing and evaluation",
        body: [
          "Neither Invoiced nor Yonovo lists prices publicly; both scale pricing to your size and provide a quote after a demo, which is standard for AR platforms at this level.",
          "The practical difference is the shape of the evaluation. Invoiced runs an enterprise sales and implementation process. With Yonovo, the team connects your accounting system in a dedicated Slack channel and shows collections running on your real invoices, usually within a day, so you can judge fit quickly. [See how Yonovo pricing works](/pricing).",
        ],
      },
      {
        heading: "Channels and collections",
        body: [
          "Invoiced centers on a customer payment portal with automated dunning and AI-powered cash application to reconcile payments. Yonovo leans into proactive multi-channel outreach: an escalation path that moves from email to SMS to AI voice to WhatsApp, and a team that gets it running for you. For the reasoning behind multi-channel, see [multi-channel payment chasing](/blog/multi-channel-payment-chasing).",
        ],
      },
      {
        heading: "Integrations",
        body: [
          "Invoiced emphasizes deep ERP and CRM integration and global, multi-currency payment support, which is a genuine strength for enterprises operating across regions. Yonovo integrates with [QuickBooks Online](/solutions/quickbooks), [Xero](/solutions/xero), [Odoo](/solutions/odoo), [NetSuite](/solutions/netsuite), [Sage Intacct](/solutions/sage), FreshBooks, Salesforce, HubSpot, and SAP, with real-time two-way sync and a check before every reminder so paid invoices are not chased.",
        ],
      },
    ],
    competitorStrengths: {
      heading: "Where Invoiced is stronger",
      intro: "A fair comparison names what the other tool does well. Invoiced leads in a few areas:",
      points: [
        "Enterprise ERP depth: broad, deep integration built for complex mid-market and enterprise finance stacks.",
        "AI cash application: automated matching and reconciliation of payments against invoices at scale.",
        "Global payments: built-in B2B payment processing with multi-currency and international support.",
        "Breadth of suite: a wide invoice-to-cash toolset spanning invoicing, collections, payments, and reporting.",
      ],
    },
    choose: {
      yonovo: [
        "You want a team to set collections up for you in a shared Slack channel, fast.",
        "You want a fast, hands-on evaluation on your real data instead of a long enterprise sales cycle.",
        "You want proactive multi-channel outreach, including AI voice, included in the plan.",
        "You are an SMB or mid-market team that does not need an enterprise implementation.",
      ],
      competitor: [
        "You are a larger enterprise with a complex ERP and finance-systems team.",
        "You need AI-powered cash application and reconciliation at scale.",
        "You process global, multi-currency B2B payments.",
        "You want a broad invoice-to-cash suite under one enterprise contract.",
      ],
    },
    faqs: [
      {
        question: "What is the main difference between Yonovo and Invoiced?",
        answer:
          "Invoiced is a mid-market-to-enterprise invoice-to-cash platform with deep ERP integration, AI cash application, and global payments, sold through demos with pricing on request. Yonovo is a white-glove AR automation service for SMB and mid-market teams, with a dedicated Slack channel, hands-on onboarding, and multi-channel outreach included.",
      },
      {
        question: "How does pricing work for Invoiced and Yonovo?",
        answer:
          "Neither lists prices publicly. Invoiced provides a quote after a demo, and so does Yonovo, with pricing scaled to your size. The difference is the evaluation: Yonovo's team gets collections running on your real invoices in about a day, rather than a longer enterprise sales cycle.",
      },
      {
        question: "How long does onboarding take with Yonovo vs Invoiced?",
        answer:
          "Invoiced typically involves an enterprise-style implementation. Yonovo's team onboards you in a dedicated Slack channel and gets collections running in about a day, which suits smaller teams without dedicated finance-systems resources.",
      },
      {
        question: "Which platform is better for enterprises?",
        answer:
          "Invoiced is built for mid-market and enterprise, with deep ERP integration, AI cash application, and global multi-currency payments. If you are a large enterprise with a complex finance stack, Invoiced is a strong fit. Yonovo is built for SMB and mid-market teams that want collections running fast.",
      },
      {
        question: "Does Yonovo do cash application like Invoiced?",
        answer:
          "Both reconcile payments against invoices. Invoiced emphasizes AI-powered cash application and reconciliation at enterprise scale. Yonovo matches payments through its connected accounting systems and checks before every reminder so paid invoices are not chased.",
      },
      {
        question: "Which platform has stronger collections outreach?",
        answer:
          "Invoiced centers on a payment portal with automated dunning. Yonovo leans into proactive multi-channel outreach, email, SMS, AI voice, and WhatsApp, with escalation paths, and a team that sets it up for you.",
      },
      {
        question: "Can I switch from Invoiced to Yonovo?",
        answer:
          "Yes. Both sit on top of your accounting system, so your invoices, customers, and payments stay in your ledger. Yonovo's team handles onboarding in a dedicated Slack channel, making it low-risk to test before cutting over.",
      },
    ],
  },
};

/** Build Next.js metadata for a comparison page from its data. */
export function buildCompareMetadata(slug: string): Metadata {
  const data = Object.values(comparisons).find((c) => c.slug === slug);
  if (!data) return {};
  const url = `${SITE_URL}/${data.slug}`;
  const ogImage = "/og-default.png";
  return {
    title: data.meta.title,
    description: data.meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: data.meta.title,
      description: data.meta.description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: data.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.meta.title,
      description: data.meta.description,
      images: [ogImage],
    },
  };
}
