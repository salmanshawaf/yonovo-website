export type CaseStudyStat = {
  value: string;
  label: string;
};

export type CaseStudyData = {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  card: {
    industry: string;
    companyName: string;
    logo: { src: string; width: number; height: number };
    title: string;
    summary: string;
  };
  challenge: {
    headline: string;
    description: string;
    points: string[];
  };
  solution: {
    headline: string;
    description: string;
    points: string[];
  };
  results: {
    headline: string;
    description: string;
    stats: CaseStudyStat[];
  };
  testimonial: {
    quote: string;
    name: string;
    role: string;
    company: string;
  };
  cta: {
    headline: string;
    description: string;
  };
};

export const caseStudies: Record<string, CaseStudyData> = {
  "tdg-inc": {
    slug: "tdg-inc",
    meta: {
      title: "TDG Inc. | Yonovo Case Study",
      description: "How TDG Inc. reduced manual follow-ups by 80% and started collecting faster than ever with Yonovo.",
    },
    card: {
      industry: "Wholesale & Distribution",
      companyName: "TDG Inc.",
      logo: { src: "/logos/tdg-inc.png", width: 200, height: 83 },
      title: "How TDG Inc. reduced manual follow-ups by 80% and started collecting faster with Yonovo",
      summary: "TDG Inc. was spending hours every week chasing overdue invoices manually. Since switching to Yonovo, their manual follow-ups dropped by 80% and they are collecting faster than ever.",
    },
    challenge: {
      headline: "Hours lost to manual invoice chasing",
      description: "TDG Inc. manages a large portfolio of wholesale accounts with varying payment terms. Their finance team was buried in repetitive collection tasks that left no time for strategic work.",
      points: [
        "The finance team spent hours every week sending payment reminders by hand.",
        "Overdue invoices piled up because there was no consistent follow-up schedule.",
        "High-value accounts received the same generic reminders as smaller ones, missing opportunities for personalized outreach.",
      ],
    },
    solution: {
      headline: "AI-powered collections that handle the routine",
      description: "Yonovo connected directly to TDG's accounting system and began managing follow-ups on day one.",
      points: [
        "AI-powered reminders sent at the right time based on each customer's payment history.",
        "Custom escalation paths ensured high-value accounts received personalized outreach.",
        "Real-time dashboards gave the finance team full visibility into collection status across all accounts.",
      ],
    },
    results: {
      headline: "Measurable impact in the first quarter",
      description: "Within 90 days, TDG Inc. saw significant improvements across every key collection metric.",
      stats: [
        { value: "80%", label: "drop in manual follow-ups" },
        { value: "15 Days", label: "reduction in DSO" },
        { value: "32%", label: "faster payment collection" },
        { value: "25 hrs", label: "saved per week" },
      ],
    },
    testimonial: {
      quote: "We used to spend hours every week chasing overdue invoices manually. Since switching to Yonovo, our manual follow ups dropped by 80% and we're collecting faster than ever. The AI handles the routine stuff so our team can focus on the accounts that actually need a human touch.",
      name: "Mohammad Alshalabi",
      role: "Director of Finance",
      company: "TDG Inc.",
    },
    cta: {
      headline: "Ready to stop chasing invoices?",
      description: "Join teams like TDG Inc. that are collecting faster and saving hours every week.",
    },
  },

  "troyes": {
    slug: "troyes",
    meta: {
      title: "Troyes | Yonovo Case Study",
      description: "How Troyes got up and running with automated collections in a single day and improved follow-up consistency with Yonovo.",
    },
    card: {
      industry: "Professional Services",
      companyName: "Troyes",
      logo: { src: "/logos/troyes.png", width: 130, height: 41 },
      title: "How Troyes automated collections in a single day with Yonovo",
      summary: "Troyes connected QuickBooks, set their preferences, and Yonovo was collecting on their behalf within the same day. Their follow-ups are now more consistent and professional than ever before.",
    },
    challenge: {
      headline: "Inconsistent follow-ups were slipping through the cracks",
      description: "Troyes relied on their team to manually track and follow up on outstanding invoices. Without a system in place, reminders were inconsistent and payments were delayed.",
      points: [
        "No standardized follow-up process meant invoices were often forgotten or followed up too late.",
        "The team worried that automated messages would feel impersonal and damage client relationships.",
        "Tracking which invoices needed attention required constant manual effort across spreadsheets.",
      ],
    },
    solution: {
      headline: "Up and running in a single day",
      description: "Troyes connected their QuickBooks account, configured their preferences, and Yonovo started collecting on their behalf immediately.",
      points: [
        "Seamless QuickBooks integration pulled in all outstanding invoices automatically.",
        "Professional, customizable message templates maintained Troyes' brand voice in every follow-up.",
        "Automated scheduling ensured every invoice received timely, consistent follow-ups without manual effort.",
      ],
    },
    results: {
      headline: "Professional collections from day one",
      description: "Troyes transformed their collections process overnight and saw immediate improvements in consistency and speed.",
      stats: [
        { value: "1 Day", label: "from setup to first collection" },
        { value: "100%", label: "follow-up consistency" },
        { value: "20 hrs", label: "saved per month" },
        { value: "0", label: "customer complaints" },
      ],
    },
    testimonial: {
      quote: "What impressed us most was how quickly we were up and running. We connected QuickBooks, set our preferences, and Yonovo was collecting on our behalf within the same day. Our customer relationships haven't suffered at all, if anything the follow ups are more consistent and professional than before.",
      name: "Apple Smith",
      role: "Accounts Receivable Manager",
      company: "Troyes",
    },
    cta: {
      headline: "Ready to automate your collections?",
      description: "Get up and running with Yonovo in less than a day, just like Troyes.",
    },
  },
};
