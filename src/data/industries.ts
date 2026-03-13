export type IndustryData = {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    headline: string;
    description: string;
    cta: string;
  };
  problems: {
    badge: string;
    headline: string;
    description: string;
    cards: { title: string; description: string }[];
  };
  solutions: {
    badge: string;
    headline: string;
    description: string;
    cards: { title: string; description: string; icon: string }[];
    highlights: { title: string; description: string; icon: string }[];
  };
  howItWorks: {
    badge: string;
    headline: string;
    description: string;
    steps: { title: string; description: string }[];
  };
  testimonials: {
    badge: string;
    headline: string;
    items: { company: string; name: string; title: string; quote: string }[];
  };
  faqs: { question: string; answer: string }[];
  cta: {
    headline: string;
    description: string;
    cta: string;
  };
};

export const industries: Record<string, IndustryData> = {
  "ecommerce-retail": {
    slug: "ecommerce-retail",
    meta: {
      title: "Ecommerce & Retail Collections | Yonovo",
      description:
        "Automate accounts receivable for ecommerce and retail businesses. Collect faster without damaging customer relationships.",
    },
    hero: {
      badge: "Ecommerce & Retail",
      headline: "Collect faster without losing customers",
      description:
        "Yonovo automates your accounts receivable with personalized follow ups across email, SMS, and voice — built for the speed and scale of ecommerce and retail.",
      cta: "Start Free",
    },
    problems: {
      badge: "Problem",
      headline: "Unpaid invoices pile up fast",
      description:
        "Ecommerce and retail businesses deal with high transaction volumes, thin margins, and customers who expect a seamless experience — even when they owe you money.",
      cards: [
        {
          title: "High volume, low visibility",
          description:
            "Hundreds of invoices go out every week. Without automation, overdue accounts slip through the cracks and your team can't keep up.",
        },
        {
          title: "Manual follow ups don't scale",
          description:
            "Your AR team spends hours chasing payments instead of focusing on growth. As order volume increases, the problem only gets worse.",
        },
        {
          title: "Aggressive collections hurt retention",
          description:
            "One tone-deaf reminder can lose a repeat customer. Generic collection emails damage the brand experience you've worked hard to build.",
        },
      ],
    },
    solutions: {
      badge: "Solution",
      headline: "Collections that",
      description:
        "Yonovo follows up on every invoice automatically — with the right tone, timing, and channel — so you get paid faster without risking customer relationships.",
      cards: [
        {
          icon: "users",
          title: "Personalized follow ups at scale",
          description:
            "Every message is shaped by the customer's purchase history, payment patterns, and relationship length. No two follow ups are the same.",
        },
        {
          icon: "send",
          title: "Multichannel outreach",
          description:
            "Reach customers where they are — email, SMS, and AI-powered voice calls — with automatic escalation based on your rules.",
        },
        {
          icon: "shield",
          title: "Brand-safe communication",
          description:
            "Every message goes out in your company's voice and from your domain. Customers see a name they trust, not a collections agency.",
        },
        {
          icon: "chart",
          title: "Real-time visibility",
          description:
            "Track every invoice, every follow up, and every response in one dashboard. Know exactly where your receivables stand at any moment.",
        },
      ],
      highlights: [
        {
          icon: "building",
          title: "Any business",
          description: "DTC, marketplaces, omnichannel, and subscription businesses.",
        },
        {
          icon: "globe",
          title: "Every channel",
          description: "Website, product pages, checkout, and post-purchase support.",
        },
        {
          icon: "zap",
          title: "One experience",
          description: "One source of truth, one voice, fewer conflicting answers.",
        },
      ],
    },
    howItWorks: {
      badge: "How It Works",
      headline: "Up and running in minutes",
      description:
        "Connect your accounting software and Yonovo starts collecting on your behalf the same day.",
      steps: [
        {
          title: "Connect your books",
          description:
            "Link QuickBooks, Xero, or your accounting platform. Yonovo imports your invoices, customers, and aging data automatically.",
        },
        {
          title: "Set your rules",
          description:
            "Define follow up timing, escalation triggers, and channel preferences — or let Yonovo's AI recommend the best strategy.",
        },
        {
          title: "Yonovo collects for you",
          description:
            "Personalized follow ups go out automatically across email, SMS, and voice. Every interaction is logged and visible to your team.",
        },
        {
          title: "Review and improve",
          description:
            "Monitor recovery rates, DSO, and at-risk accounts. Yonovo learns what works and adapts its approach over time.",
        },
      ],
    },
    testimonials: {
      badge: "Testimonials",
      headline: "What people say",
      items: [
        {
          company: "TDG Inc.",
          name: "Mohammad Alshalabi",
          title: "Director of Finance",
          quote:
            "We used to spend hours every week chasing overdue invoices manually. Since switching to Yonovo, our manual follow ups dropped by 80% and we're collecting faster than ever.",
        },
        {
          company: "Troyes",
          name: "Apple Smith",
          title: "Accounts Receivable Manager",
          quote:
            "What impressed us most was how quickly we were up and running. We connected QuickBooks, set our preferences, and Yonovo was collecting on our behalf within the same day.",
        },
      ],
    },
    faqs: [
      {
        question: "How does Yonovo help my ecommerce business collect faster?",
        answer:
          "Yonovo automates your entire accounts receivable workflow — sending personalized follow ups by email, SMS, and AI-powered voice calls based on each customer's payment history and behavior. You get paid faster without lifting a finger.",
      },
      {
        question: "Can I set custom follow up rules and escalation triggers?",
        answer:
          "Yes. You can define exactly when and how Yonovo follows up — timing, channel, tone, and escalation triggers. Or you can let Yonovo's AI recommend the optimal strategy based on your data.",
      },
      {
        question: "Will automated collections damage my customer relationships?",
        answer:
          "No. Every message goes out in your company's voice, from your domain, and is personalized to the customer's history. Customers see a professional follow up from a brand they trust, not a collections agency.",
      },
      {
        question: "How quickly can I get started with Yonovo?",
        answer:
          "Most teams are up and running the same day. Connect your accounting platform, set your preferences, and Yonovo starts collecting on your behalf immediately.",
      },
      {
        question: "What accounting platforms does Yonovo integrate with?",
        answer:
          "Yonovo integrates with QuickBooks, Xero, and other major accounting platforms. Your invoices, customers, and aging data sync automatically so there's no manual setup required.",
      },
      {
        question: "How is Yonovo different from a traditional collections agency?",
        answer:
          "Traditional agencies take a cut of recovered funds, damage customer relationships, and operate as a black box. Yonovo gives you full visibility, keeps your brand front and center, and costs a fraction of what agencies charge.",
      },
    ],
    cta: {
      headline: "Ready to collect smarter?",
      description:
        "Join the ecommerce and retail teams that are collecting faster, saving hours, and keeping every customer relationship intact.",
      cta: "Start Free",
    },
  },
  "wholesale-distribution": {
    slug: "wholesale-distribution",
    meta: {
      title: "Wholesale & Distribution Collections | Yonovo",
      description:
        "Automate accounts receivable for wholesale and distribution businesses. Reduce DSO and collect faster without risking key buyer relationships.",
    },
    hero: {
      badge: "Wholesale & Distribution",
      headline: "Collect faster, keep every account",
      description:
        "Yonovo automates your accounts receivable with personalized follow ups across email, SMS, and voice. Built for the long payment cycles and high-value relationships of wholesale distribution.",
      cta: "Start Free",
    },
    problems: {
      badge: "Problem",
      headline: "Late payments drain your margins",
      description:
        "Wholesale and distribution businesses run on thin margins, long payment terms, and buyer relationships that took years to build. One misstep in collections can cost you both.",
      cards: [
        {
          title: "Net-30 turns into net-60",
          description:
            "Buyers routinely stretch payment terms, and your team doesn't have the bandwidth to chase every overdue invoice across hundreds of accounts.",
        },
        {
          title: "Manual follow ups fall through",
          description:
            "Your AR team juggles spreadsheets, emails, and phone calls, but with high invoice volumes, overdue accounts slip through the cracks every week.",
        },
        {
          title: "Aggressive tactics risk key buyers",
          description:
            "One heavy-handed reminder can damage a relationship you spent years building. Generic collection emails don't reflect the trust your buyers expect.",
        },
      ],
    },
    solutions: {
      badge: "Solution",
      headline: "Collections that protect your relationships",
      description:
        "Yonovo follows up on every invoice automatically with the right tone, timing, and channel so you reduce DSO without putting key accounts at risk.",
      cards: [
        {
          icon: "users",
          title: "Tailored follow ups per account",
          description:
            "Every message reflects the buyer's payment history, order volume, and relationship tenure. High-value accounts get the tone they deserve.",
        },
        {
          icon: "send",
          title: "Multichannel outreach",
          description:
            "Reach buyers where they respond. Email, SMS, and AI-powered voice calls with automatic escalation based on your rules.",
        },
        {
          icon: "shield",
          title: "Your brand, not a collector",
          description:
            "Every message goes out in your company's name and from your domain. Buyers see a trusted partner, not a third-party agency.",
        },
        {
          icon: "chart",
          title: "Full visibility across accounts",
          description:
            "Track every invoice, every follow up, and every response in one dashboard. Know exactly which accounts need attention and which are on track.",
        },
      ],
      highlights: [
        {
          icon: "building",
          title: "Any operation",
          description: "Wholesalers, distributors, and multi-branch operations.",
        },
        {
          icon: "globe",
          title: "Every channel",
          description: "Email, SMS, and AI voice, all automated and personalized.",
        },
        {
          icon: "zap",
          title: "One dashboard",
          description: "One view of every account, every invoice, every follow up.",
        },
      ],
    },
    howItWorks: {
      badge: "How It Works",
      headline: "Up and running in minutes",
      description:
        "Connect your accounting software and Yonovo starts collecting on your behalf the same day.",
      steps: [
        {
          title: "Connect your books",
          description:
            "Link QuickBooks, Xero, or your accounting platform. Yonovo imports your invoices, customers, and aging data automatically.",
        },
        {
          title: "Set your rules",
          description:
            "Define follow up timing, escalation triggers, and channel preferences per account tier. Or let Yonovo's AI recommend the best strategy.",
        },
        {
          title: "Yonovo collects for you",
          description:
            "Personalized follow ups go out automatically across email, SMS, and voice. Every interaction is logged and visible to your team.",
        },
        {
          title: "Review and improve",
          description:
            "Monitor recovery rates, DSO, and at-risk accounts. Yonovo learns what works and adapts its approach over time.",
        },
      ],
    },
    testimonials: {
      badge: "Testimonials",
      headline: "What people say",
      items: [
        {
          company: "TDG Inc.",
          name: "Mohammad Alshalabi",
          title: "Director of Finance",
          quote:
            "We used to spend hours every week chasing overdue invoices manually. Since switching to Yonovo, our manual follow ups dropped by 80% and we're collecting faster than ever.",
        },
        {
          company: "Troyes",
          name: "Apple Smith",
          title: "Accounts Receivable Manager",
          quote:
            "What impressed us most was how quickly we were up and running. We connected QuickBooks, set our preferences, and Yonovo was collecting on our behalf within the same day.",
        },
      ],
    },
    faqs: [
      {
        question: "How does Yonovo help wholesale distributors collect faster?",
        answer:
          "Yonovo automates your entire accounts receivable workflow by sending personalized follow ups by email, SMS, and AI-powered voice calls based on each buyer's payment history and behavior. You reduce DSO without adding headcount.",
      },
      {
        question: "Can I set different rules for different account tiers?",
        answer:
          "Yes. You can define follow up timing, tone, channel, and escalation triggers per account or account tier. High-value buyers can get a different cadence than smaller accounts.",
      },
      {
        question: "Will automated follow ups damage my buyer relationships?",
        answer:
          "No. Every message goes out in your company's voice, from your domain, and is personalized to the buyer's history. Buyers see a professional follow up from a partner they trust, not a collections agency.",
      },
      {
        question: "How quickly can I get started with Yonovo?",
        answer:
          "Most teams are up and running the same day. Connect your accounting platform, set your preferences, and Yonovo starts collecting on your behalf immediately.",
      },
      {
        question: "What accounting platforms does Yonovo integrate with?",
        answer:
          "Yonovo integrates with QuickBooks, Xero, and other major accounting platforms. Your invoices, customers, and aging data sync automatically so there's no manual setup required.",
      },
      {
        question: "How is Yonovo different from a traditional collections agency?",
        answer:
          "Traditional agencies take a cut of recovered funds, damage buyer relationships, and operate as a black box. Yonovo gives you full visibility, keeps your brand front and center, and costs a fraction of what agencies charge.",
      },
    ],
    cta: {
      headline: "Ready to collect smarter?",
      description:
        "Join the wholesale and distribution teams that are reducing DSO, saving hours, and keeping every buyer relationship intact.",
      cta: "Start Free",
    },
  },
  "manufacturing": {
    slug: "manufacturing",
    meta: {
      title: "Manufacturing Collections | Yonovo",
      description:
        "Automate accounts receivable for manufacturing businesses. Reduce DSO and collect on overdue invoices without disrupting supply chain relationships.",
    },
    hero: {
      badge: "Manufacturing",
      headline: "Get paid, protect your contracts",
      description:
        "Yonovo automates your accounts receivable with personalized follow ups across email, SMS, and voice. Built for the extended payment cycles and high-value contracts of manufacturing.",
      cta: "Start Free",
    },
    problems: {
      badge: "Problem",
      headline: "Late payments stall your operations",
      description:
        "Manufacturing businesses front the cost of materials, labor, and production long before payment arrives. When customers pay late, your entire supply chain feels it.",
      cards: [
        {
          title: "Extended terms, delayed payments",
          description:
            "Net-60 and net-90 terms are standard, but customers still stretch them further. Your AR team can't chase every overdue invoice while managing high-value accounts.",
        },
        {
          title: "Manual follow ups don't scale",
          description:
            "Your finance team spends hours on spreadsheets, emails, and phone calls instead of focusing on cash flow. As order volume grows, overdue accounts slip through.",
        },
        {
          title: "Heavy-handed collections risk partnerships",
          description:
            "One poorly timed reminder can strain a relationship with a key customer or distributor. Generic collection emails don't reflect the partnership you've built.",
        },
      ],
    },
    solutions: {
      badge: "Solution",
      headline: "Collections built for manufacturing",
      description:
        "Yonovo follows up on every invoice automatically with the right tone, timing, and channel so you reduce DSO without putting key partnerships at risk.",
      cards: [
        {
          icon: "users",
          title: "Follow ups shaped by each account",
          description:
            "Every message reflects the customer's order history, payment patterns, and contract terms. High-value accounts get the approach they deserve.",
        },
        {
          icon: "send",
          title: "Multichannel outreach",
          description:
            "Reach customers where they respond. Email, SMS, and AI-powered voice calls with automatic escalation based on your rules.",
        },
        {
          icon: "shield",
          title: "Your brand, not a collector",
          description:
            "Every message goes out in your company's name and from your domain. Customers see a trusted supplier, not a third-party agency.",
        },
        {
          icon: "chart",
          title: "Full visibility into receivables",
          description:
            "Track every invoice, every follow up, and every response in one dashboard. Know exactly which accounts need attention and which are on track.",
        },
      ],
      highlights: [
        {
          icon: "building",
          title: "Any operation",
          description: "OEMs, contract manufacturers, and job shops.",
        },
        {
          icon: "globe",
          title: "Every channel",
          description: "Email, SMS, and AI voice, all automated and personalized.",
        },
        {
          icon: "zap",
          title: "One dashboard",
          description: "One view of every account, every invoice, every follow up.",
        },
      ],
    },
    howItWorks: {
      badge: "How It Works",
      headline: "Up and running in minutes",
      description:
        "Connect your accounting software and Yonovo starts collecting on your behalf the same day.",
      steps: [
        {
          title: "Connect your books",
          description:
            "Link QuickBooks, Xero, or your ERP. Yonovo imports your invoices, customers, and aging data automatically.",
        },
        {
          title: "Set your rules",
          description:
            "Define follow up timing, escalation triggers, and channel preferences per account or contract type. Or let Yonovo's AI recommend the best strategy.",
        },
        {
          title: "Yonovo collects for you",
          description:
            "Personalized follow ups go out automatically across email, SMS, and voice. Every interaction is logged and visible to your team.",
        },
        {
          title: "Review and improve",
          description:
            "Monitor recovery rates, DSO, and at-risk accounts. Yonovo learns what works and adapts its approach over time.",
        },
      ],
    },
    testimonials: {
      badge: "Testimonials",
      headline: "What people say",
      items: [
        {
          company: "TDG Inc.",
          name: "Mohammad Alshalabi",
          title: "Director of Finance",
          quote:
            "We used to spend hours every week chasing overdue invoices manually. Since switching to Yonovo, our manual follow ups dropped by 80% and we're collecting faster than ever.",
        },
        {
          company: "Troyes",
          name: "Apple Smith",
          title: "Accounts Receivable Manager",
          quote:
            "What impressed us most was how quickly we were up and running. We connected QuickBooks, set our preferences, and Yonovo was collecting on our behalf within the same day.",
        },
      ],
    },
    faqs: [
      {
        question: "How does Yonovo help manufacturers collect faster?",
        answer:
          "Yonovo automates your entire accounts receivable workflow by sending personalized follow ups via email, SMS, and AI-powered voice calls based on each customer's payment history and behavior. You reduce DSO without adding headcount.",
      },
      {
        question: "Can I set different rules for different accounts or contract types?",
        answer:
          "Yes. You can define follow up timing, tone, channel, and escalation triggers per account or contract type. Large OEM customers can get a different cadence than smaller accounts.",
      },
      {
        question: "Will automated follow ups damage my customer relationships?",
        answer:
          "No. Every message goes out in your company's voice, from your domain, and is personalized to the customer's history. Customers see a professional follow up from a supplier they trust, not a collections agency.",
      },
      {
        question: "How quickly can I get started with Yonovo?",
        answer:
          "Most teams are up and running the same day. Connect your accounting platform or ERP, set your preferences, and Yonovo starts collecting on your behalf immediately.",
      },
      {
        question: "What accounting platforms does Yonovo integrate with?",
        answer:
          "Yonovo integrates with QuickBooks, Xero, and other major accounting platforms and ERPs. Your invoices, customers, and aging data sync automatically so there's no manual setup required.",
      },
      {
        question: "How is Yonovo different from a traditional collections agency?",
        answer:
          "Traditional agencies take a cut of recovered funds, damage customer relationships, and operate as a black box. Yonovo gives you full visibility, keeps your brand front and center, and costs a fraction of what agencies charge.",
      },
    ],
    cta: {
      headline: "Ready to collect smarter?",
      description:
        "Join the manufacturing teams that are reducing DSO, saving hours, and keeping every customer relationship intact.",
      cta: "Start Free",
    },
  },
  "professional-services": {
    slug: "professional-services",
    meta: {
      title: "Professional Services Collections | Yonovo",
      description:
        "Automate accounts receivable for professional services firms. Collect on overdue invoices without putting client relationships at risk.",
    },
    hero: {
      badge: "Professional Services",
      headline: "Get paid faster, keep every client",
      description:
        "Yonovo automates your accounts receivable with personalized follow ups across email, SMS, and voice. Built for the project-based billing and long client relationships of professional services.",
      cta: "Start Free",
    },
    problems: {
      badge: "Problem",
      headline: "Unpaid invoices eat into your margins",
      description:
        "Professional services firms deliver the work upfront and bill after. When clients delay payment, your team absorbs the cost while chasing invoices instead of doing billable work.",
      cards: [
        {
          title: "Approval cycles stretch payments",
          description:
            "Invoices sit in client procurement and finance queues for weeks. Your team doesn't have the bandwidth to follow up on every outstanding balance across dozens of engagements.",
        },
        {
          title: "Manual follow ups waste billable hours",
          description:
            "Your finance team spends hours on spreadsheets, emails, and phone calls instead of supporting active projects. Every hour chasing payment is an hour not billed.",
        },
        {
          title: "Aggressive collections risk referrals",
          description:
            "One poorly worded reminder can damage a client relationship built over years. Generic collection emails don't reflect the trust and professionalism your firm is known for.",
        },
      ],
    },
    solutions: {
      badge: "Solution",
      headline: "Collections built for client relationships",
      description:
        "Yonovo follows up on every invoice automatically with the right tone, timing, and channel so you collect faster without putting client relationships at risk.",
      cards: [
        {
          icon: "users",
          title: "Follow ups shaped by each client",
          description:
            "Every message reflects the client's engagement history, payment patterns, and relationship length. Key accounts get the tone they deserve.",
        },
        {
          icon: "send",
          title: "Multichannel outreach",
          description:
            "Reach clients where they respond. Email, SMS, and AI-powered voice calls with automatic escalation based on your rules.",
        },
        {
          icon: "shield",
          title: "Your brand, not a collector",
          description:
            "Every message goes out in your firm's name and from your domain. Clients see a trusted partner, not a third-party agency.",
        },
        {
          icon: "chart",
          title: "Full visibility into receivables",
          description:
            "Track every invoice, every follow up, and every response in one dashboard. Know exactly which accounts need attention and which are on track.",
        },
      ],
      highlights: [
        {
          icon: "building",
          title: "Any firm",
          description: "Consulting, legal, accounting, and creative agencies.",
        },
        {
          icon: "globe",
          title: "Every channel",
          description: "Email, SMS, and AI voice, all automated and personalized.",
        },
        {
          icon: "zap",
          title: "One dashboard",
          description: "One view of every client, every invoice, every follow up.",
        },
      ],
    },
    howItWorks: {
      badge: "How It Works",
      headline: "Up and running in minutes",
      description:
        "Connect your accounting software and Yonovo starts collecting on your behalf the same day.",
      steps: [
        {
          title: "Connect your books",
          description:
            "Link QuickBooks, Xero, or your accounting platform. Yonovo imports your invoices, clients, and aging data automatically.",
        },
        {
          title: "Set your rules",
          description:
            "Define follow up timing, escalation triggers, and channel preferences per client or engagement type. Or let Yonovo's AI recommend the best strategy.",
        },
        {
          title: "Yonovo collects for you",
          description:
            "Personalized follow ups go out automatically across email, SMS, and voice. Every interaction is logged and visible to your team.",
        },
        {
          title: "Review and improve",
          description:
            "Monitor recovery rates, DSO, and at-risk accounts. Yonovo learns what works and adapts its approach over time.",
        },
      ],
    },
    testimonials: {
      badge: "Testimonials",
      headline: "What people say",
      items: [
        {
          company: "TDG Inc.",
          name: "Mohammad Alshalabi",
          title: "Director of Finance",
          quote:
            "We used to spend hours every week chasing overdue invoices manually. Since switching to Yonovo, our manual follow ups dropped by 80% and we're collecting faster than ever.",
        },
        {
          company: "Troyes",
          name: "Apple Smith",
          title: "Accounts Receivable Manager",
          quote:
            "What impressed us most was how quickly we were up and running. We connected QuickBooks, set our preferences, and Yonovo was collecting on our behalf within the same day.",
        },
      ],
    },
    faqs: [
      {
        question: "How does Yonovo help professional services firms collect faster?",
        answer:
          "Yonovo automates your entire accounts receivable workflow by sending personalized follow ups via email, SMS, and AI-powered voice calls based on each client's payment history and behavior. You reduce DSO without adding headcount.",
      },
      {
        question: "Can I set different rules for different clients or engagement types?",
        answer:
          "Yes. You can define follow up timing, tone, channel, and escalation triggers per client or engagement type. Retainer clients can get a different cadence than project-based accounts.",
      },
      {
        question: "Will automated follow ups damage my client relationships?",
        answer:
          "No. Every message goes out in your firm's voice, from your domain, and is personalized to the client's history. Clients see a professional follow up from a firm they trust, not a collections agency.",
      },
      {
        question: "How quickly can I get started with Yonovo?",
        answer:
          "Most teams are up and running the same day. Connect your accounting platform, set your preferences, and Yonovo starts collecting on your behalf immediately.",
      },
      {
        question: "What accounting platforms does Yonovo integrate with?",
        answer:
          "Yonovo integrates with QuickBooks, Xero, and other major accounting platforms. Your invoices, clients, and aging data sync automatically so there's no manual setup required.",
      },
      {
        question: "How is Yonovo different from a traditional collections agency?",
        answer:
          "Traditional agencies take a cut of recovered funds, damage client relationships, and operate as a black box. Yonovo gives you full visibility, keeps your brand front and center, and costs a fraction of what agencies charge.",
      },
    ],
    cta: {
      headline: "Ready to collect smarter?",
      description:
        "Join the professional services firms that are reducing DSO, saving hours, and keeping every client relationship intact.",
      cta: "Start Free",
    },
  },
  "property-management": {
    slug: "property-management",
    meta: {
      title: "Property Management Collections | Yonovo",
      description:
        "Automate accounts receivable for property management companies. Collect rent and fees on time without straining tenant relationships.",
    },
    hero: {
      badge: "Property Management",
      headline: "Collect on time, retain every tenant",
      description:
        "Yonovo automates your accounts receivable with personalized follow ups across email, SMS, and voice. Built for the recurring billing and tenant relationships of property management.",
      cta: "Start Free",
    },
    problems: {
      badge: "Problem",
      headline: "Late payments disrupt your cash flow",
      description:
        "Property management companies juggle hundreds of recurring charges across multiple properties. When tenants pay late, your team absorbs the cost while chasing balances instead of managing properties.",
      cards: [
        {
          title: "Rent payments slip past due dates",
          description:
            "Tenants miss due dates by days or weeks, and your team doesn't have the bandwidth to manually follow up on every outstanding balance across every property.",
        },
        {
          title: "Manual follow ups drain your team",
          description:
            "Your staff spends hours on spreadsheets, emails, and phone calls instead of focusing on leasing and property operations. The more units you manage, the worse it gets.",
        },
        {
          title: "Heavy-handed notices drive turnover",
          description:
            "One poorly timed late notice can push a good tenant to leave at renewal. Generic collection emails don't reflect the relationship your property management team has built.",
        },
      ],
    },
    solutions: {
      badge: "Solution",
      headline: "Collections built for property managers",
      description:
        "Yonovo follows up on every balance automatically with the right tone, timing, and channel so you collect on time without risking tenant retention.",
      cards: [
        {
          icon: "users",
          title: "Follow ups shaped by each tenant",
          description:
            "Every message reflects the tenant's payment history, lease terms, and relationship length. Long-term tenants get the tone they deserve.",
        },
        {
          icon: "send",
          title: "Multichannel outreach",
          description:
            "Reach tenants where they respond. Email, SMS, and AI-powered voice calls with automatic escalation based on your rules.",
        },
        {
          icon: "shield",
          title: "Your brand, not a collector",
          description:
            "Every message goes out in your company's name and from your domain. Tenants see their property manager, not a third-party agency.",
        },
        {
          icon: "chart",
          title: "Full visibility across properties",
          description:
            "Track every balance, every follow up, and every response in one dashboard. Know exactly which tenants need attention and which are on track.",
        },
      ],
      highlights: [
        {
          icon: "building",
          title: "Any portfolio",
          description: "Residential, commercial, and mixed-use properties.",
        },
        {
          icon: "globe",
          title: "Every channel",
          description: "Email, SMS, and AI voice, all automated and personalized.",
        },
        {
          icon: "zap",
          title: "One dashboard",
          description: "One view of every tenant, every balance, every follow up.",
        },
      ],
    },
    howItWorks: {
      badge: "How It Works",
      headline: "Up and running in minutes",
      description:
        "Connect your accounting software and Yonovo starts collecting on your behalf the same day.",
      steps: [
        {
          title: "Connect your books",
          description:
            "Link QuickBooks, Xero, or your accounting platform. Yonovo imports your tenants, balances, and aging data automatically.",
        },
        {
          title: "Set your rules",
          description:
            "Define follow up timing, escalation triggers, and channel preferences per property or tenant type. Or let Yonovo's AI recommend the best strategy.",
        },
        {
          title: "Yonovo collects for you",
          description:
            "Personalized follow ups go out automatically across email, SMS, and voice. Every interaction is logged and visible to your team.",
        },
        {
          title: "Review and improve",
          description:
            "Monitor collection rates, overdue balances, and at-risk tenants. Yonovo learns what works and adapts its approach over time.",
        },
      ],
    },
    testimonials: {
      badge: "Testimonials",
      headline: "What people say",
      items: [
        {
          company: "TDG Inc.",
          name: "Mohammad Alshalabi",
          title: "Director of Finance",
          quote:
            "We used to spend hours every week chasing overdue invoices manually. Since switching to Yonovo, our manual follow ups dropped by 80% and we're collecting faster than ever.",
        },
        {
          company: "Troyes",
          name: "Apple Smith",
          title: "Accounts Receivable Manager",
          quote:
            "What impressed us most was how quickly we were up and running. We connected QuickBooks, set our preferences, and Yonovo was collecting on our behalf within the same day.",
        },
      ],
    },
    faqs: [
      {
        question: "How does Yonovo help property managers collect faster?",
        answer:
          "Yonovo automates your entire accounts receivable workflow by sending personalized follow ups via email, SMS, and AI-powered voice calls based on each tenant's payment history and behavior. You improve collection rates without adding headcount.",
      },
      {
        question: "Can I set different rules for different properties or tenant types?",
        answer:
          "Yes. You can define follow up timing, tone, channel, and escalation triggers per property or tenant type. Commercial tenants can get a different cadence than residential tenants.",
      },
      {
        question: "Will automated follow ups damage my tenant relationships?",
        answer:
          "No. Every message goes out in your company's voice, from your domain, and is personalized to the tenant's history. Tenants see a professional follow up from their property manager, not a collections agency.",
      },
      {
        question: "How quickly can I get started with Yonovo?",
        answer:
          "Most teams are up and running the same day. Connect your accounting platform, set your preferences, and Yonovo starts collecting on your behalf immediately.",
      },
      {
        question: "What accounting platforms does Yonovo integrate with?",
        answer:
          "Yonovo integrates with QuickBooks, Xero, and other major accounting platforms. Your tenants, balances, and aging data sync automatically so there's no manual setup required.",
      },
      {
        question: "How is Yonovo different from a traditional collections agency?",
        answer:
          "Traditional agencies take a cut of recovered funds, damage tenant relationships, and operate as a black box. Yonovo gives you full visibility, keeps your brand front and center, and costs a fraction of what agencies charge.",
      },
    ],
    cta: {
      headline: "Ready to collect smarter?",
      description:
        "Join the property management teams that are improving collection rates, saving hours, and keeping every tenant relationship intact.",
      cta: "Start Free",
    },
  },
  "gyms-fitness": {
    slug: "gyms-fitness",
    meta: {
      title: "Gyms & Fitness Collections | Yonovo",
      description:
        "Automate accounts receivable for gyms and fitness businesses. Recover failed payments and collect past-due membership dues without losing members.",
    },
    hero: {
      badge: "Gyms & Fitness",
      headline: "Recover payments, keep every member",
      description:
        "Yonovo automates your accounts receivable with personalized follow ups across email, SMS, and voice. Built for the recurring billing and member relationships of gyms and fitness businesses.",
      cta: "Start Free",
    },
    problems: {
      badge: "Problem",
      headline: "Failed payments cost you members",
      description:
        "Gyms and fitness businesses run on recurring memberships. When payments fail and no one follows up, you lose revenue and members who never intended to cancel.",
      cards: [
        {
          title: "Failed payments go unresolved",
          description:
            "Declined cards and missed dues pile up quietly. Without timely follow up, members fall further behind and eventually drop off your roster entirely.",
        },
        {
          title: "Your team can't chase every balance",
          description:
            "Front desk staff and managers are already stretched thin. Manually tracking down past-due members across spreadsheets and emails isn't sustainable as you grow.",
        },
        {
          title: "Aggressive reminders push members away",
          description:
            "One harsh payment notice can send a loyal member to the gym down the street. Generic collection emails don't reflect the community your gym has built.",
        },
      ],
    },
    solutions: {
      badge: "Solution",
      headline: "Collections built for member retention",
      description:
        "Yonovo follows up on every failed payment automatically with the right tone, timing, and channel so you recover revenue without pushing members out the door.",
      cards: [
        {
          icon: "users",
          title: "Follow ups shaped by each member",
          description:
            "Every message reflects the member's payment history, membership type, and tenure. Long-standing members get the tone they deserve.",
        },
        {
          icon: "send",
          title: "Multichannel outreach",
          description:
            "Reach members where they respond. Email, SMS, and AI-powered voice calls with automatic escalation based on your rules.",
        },
        {
          icon: "shield",
          title: "Your brand, not a collector",
          description:
            "Every message goes out in your gym's name and from your domain. Members see their gym, not a third-party agency.",
        },
        {
          icon: "chart",
          title: "Full visibility into dues",
          description:
            "Track every balance, every follow up, and every response in one dashboard. Know exactly which members need attention and which are back on track.",
        },
      ],
      highlights: [
        {
          icon: "building",
          title: "Any facility",
          description: "Gyms, studios, boxes, and multi-location fitness brands.",
        },
        {
          icon: "globe",
          title: "Every channel",
          description: "Email, SMS, and AI voice, all automated and personalized.",
        },
        {
          icon: "zap",
          title: "One dashboard",
          description: "One view of every member, every balance, every follow up.",
        },
      ],
    },
    howItWorks: {
      badge: "How It Works",
      headline: "Up and running in minutes",
      description:
        "Connect your accounting software and Yonovo starts collecting on your behalf the same day.",
      steps: [
        {
          title: "Connect your books",
          description:
            "Link QuickBooks, Xero, or your accounting platform. Yonovo imports your members, balances, and aging data automatically.",
        },
        {
          title: "Set your rules",
          description:
            "Define follow up timing, escalation triggers, and channel preferences per membership type or balance age. Or let Yonovo's AI recommend the best strategy.",
        },
        {
          title: "Yonovo collects for you",
          description:
            "Personalized follow ups go out automatically across email, SMS, and voice. Every interaction is logged and visible to your team.",
        },
        {
          title: "Review and improve",
          description:
            "Monitor recovery rates, outstanding dues, and at-risk members. Yonovo learns what works and adapts its approach over time.",
        },
      ],
    },
    testimonials: {
      badge: "Testimonials",
      headline: "What people say",
      items: [
        {
          company: "TDG Inc.",
          name: "Mohammad Alshalabi",
          title: "Director of Finance",
          quote:
            "We used to spend hours every week chasing overdue invoices manually. Since switching to Yonovo, our manual follow ups dropped by 80% and we're collecting faster than ever.",
        },
        {
          company: "Troyes",
          name: "Apple Smith",
          title: "Accounts Receivable Manager",
          quote:
            "What impressed us most was how quickly we were up and running. We connected QuickBooks, set our preferences, and Yonovo was collecting on our behalf within the same day.",
        },
      ],
    },
    faqs: [
      {
        question: "How does Yonovo help gyms recover failed payments?",
        answer:
          "Yonovo automates your entire accounts receivable workflow by sending personalized follow ups via email, SMS, and AI-powered voice calls based on each member's payment history and behavior. You recover more revenue without adding staff.",
      },
      {
        question: "Can I set different rules for different membership types?",
        answer:
          "Yes. You can define follow up timing, tone, channel, and escalation triggers per membership type or balance age. Premium members can get a different cadence than month-to-month members.",
      },
      {
        question: "Will automated follow ups drive members away?",
        answer:
          "No. Every message goes out in your gym's voice, from your domain, and is personalized to the member's history. Members see a friendly follow up from their gym, not a collections agency.",
      },
      {
        question: "How quickly can I get started with Yonovo?",
        answer:
          "Most teams are up and running the same day. Connect your accounting platform, set your preferences, and Yonovo starts collecting on your behalf immediately.",
      },
      {
        question: "What accounting platforms does Yonovo integrate with?",
        answer:
          "Yonovo integrates with QuickBooks, Xero, and other major accounting platforms. Your members, balances, and aging data sync automatically so there's no manual setup required.",
      },
      {
        question: "How is Yonovo different from a traditional collections agency?",
        answer:
          "Traditional agencies take a cut of recovered funds, damage member relationships, and operate as a black box. Yonovo gives you full visibility, keeps your brand front and center, and costs a fraction of what agencies charge.",
      },
    ],
    cta: {
      headline: "Ready to collect smarter?",
      description:
        "Join the gyms and fitness businesses that are recovering more revenue, saving hours, and keeping every member relationship intact.",
      cta: "Start Free",
    },
  },
};
