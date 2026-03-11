export type CaseStudyStat = {
  value: string;
  label: string;
};

export type CaseStudyBlock =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string; author: string; role: string };

export type CaseStudySection = {
  id: string;
  heading: string;
  content: CaseStudyBlock[];
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
  hero: {
    date: string;
    readTime: string;
    stats: CaseStudyStat[];
  };
  sections: CaseStudySection[];
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
      description:
        "How TDG Inc. reduced manual follow-ups by 80% and started collecting faster than ever with Yonovo.",
    },
    card: {
      industry: "Wholesale & Distribution",
      companyName: "TDG Inc.",
      logo: { src: "/logos/tdg-inc.png", width: 200, height: 83 },
      title:
        "How TDG Inc. reduced manual follow-ups by 80% and started collecting faster with Yonovo",
      summary:
        "TDG Inc. was spending hours every week chasing overdue invoices manually. Since switching to Yonovo, their manual follow-ups dropped by 80% and they are collecting faster than ever.",
    },
    hero: {
      date: "January 15th, 2026",
      readTime: "5 min read",
      stats: [
        { value: "80%", label: "drop in manual follow-ups" },
        { value: "15 Days", label: "reduction in DSO" },
        { value: "32%", label: "faster payment collection" },
      ],
    },
    sections: [
      {
        id: "the-challenge",
        heading: "The challenge: hours lost to manual invoice chasing",
        content: [
          {
            type: "paragraph",
            text: "TDG Inc. is a wholesale distribution company managing a large portfolio of accounts with varying payment terms. As the business grew, so did the complexity of getting paid on time. Collections became a daily, time-consuming effort spread across emails, spreadsheets, and manual tracking.",
          },
          {
            type: "paragraph",
            text: "What had once been manageable quickly turned into a bottleneck. The finance team spent hours every week sending payment reminders by hand. Overdue invoices piled up because there was no consistent follow-up schedule, and high-value accounts received the same generic reminders as smaller ones.",
          },
          {
            type: "quote",
            text: "We were spending so much time just chasing invoices that we had no bandwidth left for anything strategic. It was the same routine every single day, and things were still slipping through the cracks.",
            author: "Mohammad Alshalabi",
            role: "Director of Finance, TDG Inc.",
          },
          {
            type: "paragraph",
            text: "Without a system in place, the team had no visibility into which accounts needed attention most. Collection efforts were reactive rather than proactive, and the lack of prioritization meant that critical invoices were often followed up too late.",
          },
        ],
      },
      {
        id: "the-solution",
        heading: "The solution: AI-powered collections that handle the routine",
        content: [
          {
            type: "quote",
            text: "We were skeptical at first. We had tried other tools before and nothing really stuck. But Yonovo was different from day one.",
            author: "Mohammad Alshalabi",
            role: "Director of Finance, TDG Inc.",
          },
          {
            type: "paragraph",
            text: "Yonovo connected directly to TDG's accounting system and began managing follow-ups immediately. The platform analyzed each account's payment history and automatically sent reminders at the right time, through the right channel.",
          },
          {
            type: "paragraph",
            text: "Custom escalation paths ensured high-value accounts received personalized outreach while routine follow-ups were fully automated. Real-time dashboards gave the finance team complete visibility into collection status across every account, replacing scattered spreadsheets with a single source of truth.",
          },
          {
            type: "paragraph",
            text: "The integration took less than a day. TDG's team didn't need to change their existing workflows or migrate away from their accounting software. Yonovo adapted to how they already worked.",
          },
        ],
      },
      {
        id: "the-impact",
        heading: "The impact: measurable results in the first quarter",
        content: [
          {
            type: "quote",
            text: "The most valuable thing Yonovo delivered was giving us our time back. We went from spending hours every day on collections to barely thinking about it. The system just handles it.",
            author: "Mohammad Alshalabi",
            role: "Director of Finance, TDG Inc.",
          },
          {
            type: "paragraph",
            text: "Within 90 days, TDG saw an 80% drop in manual follow-ups. The finance team reclaimed over 25 hours per week that had been spent on repetitive collection tasks. That time was reinvested into strategic initiatives, including onboarding new accounts and improving customer relationships.",
          },
          {
            type: "paragraph",
            text: "DSO dropped by 15 days, and overall payment collection speed improved by 32%. The team went from weekly status meetings to discuss overdue accounts down to brief monthly check-ins, because the dashboard gave everyone the visibility they needed in real time.",
          },
        ],
      },
      {
        id: "why-yonovo",
        heading: "Why Yonovo: software and partnership",
        content: [
          {
            type: "quote",
            text: "The AI handles the routine stuff so our team can focus on the accounts that actually need a human touch. And whenever we have a question, the Yonovo team is right there. They treat us like we're their only client.",
            author: "Mohammad Alshalabi",
            role: "Director of Finance, TDG Inc.",
          },
          {
            type: "paragraph",
            text: "Beyond the product itself, TDG points to Yonovo's partnership as a key differentiator. From implementation through ongoing use, the Yonovo team worked closely with TDG, answering questions quickly, hopping on calls when needed, and continuously improving the product based on real-world feedback.",
          },
          {
            type: "paragraph",
            text: "For finance teams struggling with manual, fragmented collection processes, TDG's experience shows what's possible when automation fits the way you work.",
          },
          {
            type: "paragraph",
            text: "Book a demo to see how Yonovo can help your team reclaim time, collect faster, and keep every customer relationship intact.",
          },
        ],
      },
    ],
    cta: {
      headline: "Ready to stop chasing invoices?",
      description:
        "Join teams like TDG Inc. that are collecting faster and saving hours every week.",
    },
  },

  troyes: {
    slug: "troyes",
    meta: {
      title: "Troyes | Yonovo Case Study",
      description:
        "How Troyes got up and running with automated collections in a single day and improved follow-up consistency with Yonovo.",
    },
    card: {
      industry: "Wholesale & Distribution",
      companyName: "Troyes",
      logo: { src: "/logos/troyes.png", width: 130, height: 41 },
      title: "How Troyes automated collections in a single day with Yonovo",
      summary:
        "Troyes connected QuickBooks, set their preferences, and Yonovo was collecting on their behalf within the same day. Their follow-ups are now more consistent and professional than ever before.",
    },
    hero: {
      date: "February 3rd, 2026",
      readTime: "4 min read",
      stats: [
        { value: "1 Day", label: "from setup to first collection" },
        { value: "100%", label: "follow-up consistency" },
        { value: "20 hrs", label: "saved per month" },
      ],
    },
    sections: [
      {
        id: "the-challenge",
        heading:
          "The challenge: inconsistent follow-ups slipping through the cracks",
        content: [
          {
            type: "paragraph",
            text: "Troyes is a professional services company that relied on their team to manually track and follow up on outstanding invoices. Without a system in place, reminders were inconsistent and payments were frequently delayed.",
          },
          {
            type: "paragraph",
            text: "No standardized follow-up process meant invoices were often forgotten or followed up too late. The team worried that automated messages would feel impersonal and damage the client relationships they had worked hard to build.",
          },
          {
            type: "quote",
            text: "We knew we needed to automate, but we were nervous about losing that personal touch. Our clients expect a certain level of professionalism and we couldn't risk that.",
            author: "Apple Smith",
            role: "Accounts Receivable Manager, Troyes",
          },
          {
            type: "paragraph",
            text: "Tracking which invoices needed attention required constant manual effort across spreadsheets. The team was spending more time managing their process than actually collecting.",
          },
        ],
      },
      {
        id: "the-solution",
        heading: "The solution: up and running in a single day",
        content: [
          {
            type: "quote",
            text: "What impressed us most was how quickly we were up and running. We connected QuickBooks, set our preferences, and Yonovo was collecting on our behalf within the same day.",
            author: "Apple Smith",
            role: "Accounts Receivable Manager, Troyes",
          },
          {
            type: "paragraph",
            text: "Troyes connected their QuickBooks account, configured their preferences, and Yonovo started collecting on their behalf immediately. The seamless integration pulled in all outstanding invoices automatically.",
          },
          {
            type: "paragraph",
            text: "Professional, customizable message templates maintained Troyes' brand voice in every follow-up. Automated scheduling ensured every invoice received timely, consistent follow-ups without any manual effort from the team.",
          },
        ],
      },
      {
        id: "the-impact",
        heading: "The impact: professional collections from day one",
        content: [
          {
            type: "quote",
            text: "Our customer relationships haven't suffered at all. If anything, the follow-ups are more consistent and professional than before.",
            author: "Apple Smith",
            role: "Accounts Receivable Manager, Troyes",
          },
          {
            type: "paragraph",
            text: "Troyes transformed their collections process overnight. Follow-up consistency went from sporadic to 100%. The team saved 20 hours per month that had been spent on manual tracking and outreach.",
          },
          {
            type: "paragraph",
            text: "Most importantly, they received zero customer complaints about the automated communications. The messages felt personal, professional, and on-brand, exactly what the team had been worried about losing.",
          },
        ],
      },
      {
        id: "why-yonovo",
        heading: "Why Yonovo: simplicity and trust",
        content: [
          {
            type: "paragraph",
            text: "For Troyes, the decision came down to simplicity. They needed a tool that worked with their existing setup, not one that required a complete overhaul. Yonovo delivered exactly that.",
          },
          {
            type: "paragraph",
            text: "For teams that are hesitant about automation, Troyes' experience proves that you can automate collections without sacrificing the personal touch that matters to your clients.",
          },
          {
            type: "paragraph",
            text: "Book a demo to see how Yonovo can help your team collect faster while keeping every client relationship intact.",
          },
        ],
      },
    ],
    cta: {
      headline: "Ready to automate your collections?",
      description:
        "Get up and running with Yonovo in less than a day, just like Troyes.",
    },
  },
};
