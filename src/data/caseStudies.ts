export type CaseStudyStat = {
  value: string;
  label: string;
};

export type CaseStudyBlock =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string; author: string; role: string };

export type CaseStudySection = {
  id: string;
  tocLabel?: string;
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
  profile: {
    industry: string;
    offices: string;
    integration: string;
    employees?: string;
    about?: string;
  };
  contact: {
    name: string;
    title: string;
    photo: string;
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
      description:
        "How TDG Inc. reduced manual follow-ups by 80% and started collecting faster than ever with Yonovo.",
    },
    card: {
      industry: "Wholesale & Distribution",
      companyName: "TDG Inc.",
      logo: { src: "/logos/tdg-inc.svg", width: 200, height: 83 },
      title:
        "How TDG Inc. reduced manual follow-ups by 80% and started collecting faster with Yonovo",
      summary:
        "TDG Inc. was spending hours every week chasing overdue invoices manually. Since switching to Yonovo, their manual follow-ups dropped by 80% and they are collecting faster than ever.",
    },
    hero: {
      date: "March 11, 2026",
      readTime: "3 min read",
      stats: [
        { value: "80%", label: "drop in manual follow-ups" },
        { value: "15 Days", label: "reduction in DSO" },
        { value: "32%", label: "faster payment collection" },
      ],
    },
    profile: {
      industry: "Wholesale & Distribution",
      offices: "Toronto",
      integration: "QuickBooks",
      employees: "SMB",
      about: "TDG is a wholesale supplier of houseware, kitchenware, glassware, and mobile accessories. Dedicated to providing exceptional services to local businesses across Canada.",
    },
    contact: {
      name: "Mohammad Alshalabi",
      title: "Director of Finance",
      photo: "/photos/mohammad-alshalabi.jpg",
    },
    sections: [
      {
        id: "challenge",
        tocLabel: "Challenge",
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
        id: "solution",
        tocLabel: "Solution",
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
        id: "results",
        tocLabel: "Results",
        heading: "The results: measurable impact in the first quarter",
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
        tocLabel: "Why Yonovo",
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
      title: "Troyes Canada | Yonovo Case Study",
      description:
        "How Troyes Canada went from zero collections process to a fully automated system, saving 25+ hours per month with Yonovo.",
    },
    card: {
      industry: "Wholesale & Distribution",
      companyName: "Troyes Canada",
      logo: { src: "/logos/troyes.png", width: 130, height: 41 },
      title: "How Troyes Canada built a collections system from scratch and saved 25+ hours a month",
      summary:
        "Troyes Canada had no formal collections process. Invoices were tracked in spreadsheets, follow-ups happened when someone remembered, and overdue payments piled up. With Yonovo, they went from no system at all to fully automated collections in a single day.",
    },
    hero: {
      date: "February 3, 2026",
      readTime: "3 min read",
      stats: [
        { value: "25+ hrs", label: "saved per month" },
        { value: "1 Day", label: "from zero to fully automated" },
        { value: "45%", label: "faster payment turnaround" },
      ],
    },
    profile: {
      industry: "Wholesale & Distribution",
      offices: "Toronto",
      integration: "QuickBooks",
      employees: "SMB",
      about: "Troyes Canada is a wholesale supplier of medical supplies and health care products, serving retailers and businesses across Canada.",
    },
    contact: {
      name: "Apple Smith",
      title: "Accounts Receivable Manager",
      photo: "/photos/apple-smith.jpg",
    },
    sections: [
      {
        id: "challenge",
        tocLabel: "Challenge",
        heading: "The challenge: no system, no process, no visibility",
        content: [
          {
            type: "paragraph",
            text: "Troyes Canada is a wholesale distributor supplying medical supplies and health care products to retailers across Canada. As the business grew, so did the number of outstanding invoices. But there was no system in place to manage them.",
          },
          {
            type: "paragraph",
            text: "Follow-ups happened informally. Someone on the team would remember to check a spreadsheet, send an email, or make a phone call. But there was no schedule, no tracking, and no way to know which invoices were overdue until it was too late.",
          },
          {
            type: "quote",
            text: "We didn't really have a collections process. It was all manual. Someone would remember to follow up, or they wouldn't. We had no idea how much money was sitting out there overdue.",
            author: "Apple Smith",
            role: "Accounts Receivable Manager, Troyes Canada",
          },
          {
            type: "paragraph",
            text: "The result was predictable. Cash flow suffered, payments came in late, and the team spent hours every week doing work that felt repetitive and unproductive. They needed a system, but building one from scratch felt overwhelming.",
          },
        ],
      },
      {
        id: "solution",
        tocLabel: "Solution",
        heading: "The solution: from zero to automated in one day",
        content: [
          {
            type: "quote",
            text: "We connected QuickBooks in the morning and Yonovo was already sending follow-ups by the afternoon. We went from having nothing to having a full system in a single day.",
            author: "Apple Smith",
            role: "Accounts Receivable Manager, Troyes Canada",
          },
          {
            type: "paragraph",
            text: "Troyes connected their QuickBooks account, and Yonovo pulled in every outstanding invoice automatically. The platform set up follow-up schedules based on payment terms and began reaching out to customers on Troyes' behalf immediately.",
          },
          {
            type: "paragraph",
            text: "Every message was professional and on-brand. Yonovo handled the timing, the tone, and the escalation. For a team that had never had a collections process, it felt like hiring an entire department overnight.",
          },
          {
            type: "paragraph",
            text: "There was no migration, no training period, and no disruption. The team kept working the way they always had. The only difference was that invoices were now being followed up on consistently, every single time.",
          },
        ],
      },
      {
        id: "results",
        tocLabel: "Results",
        heading: "The results: time back and faster payments",
        content: [
          {
            type: "quote",
            text: "The biggest win is the time. We used to spend hours every week chasing payments manually. Now we barely think about it. Yonovo just handles it.",
            author: "Apple Smith",
            role: "Accounts Receivable Manager, Troyes Canada",
          },
          {
            type: "paragraph",
            text: "Within the first month, Troyes saved over 25 hours that had been spent on manual follow-ups, spreadsheet tracking, and phone calls. That time went back into growing the business, managing inventory, and serving customers.",
          },
          {
            type: "paragraph",
            text: "Payment turnaround improved by 45%. Customers who previously took 60+ days to pay were now paying within 30 to 40 days, thanks to consistent, timely reminders. The team finally had visibility into their entire receivables pipeline for the first time.",
          },
          {
            type: "paragraph",
            text: "Most importantly, not a single customer complained about the automated outreach. The messages felt natural and professional, maintaining the relationships Troyes had built over the years.",
          },
        ],
      },
      {
        id: "why-yonovo",
        tocLabel: "Why Yonovo",
        heading: "Why Yonovo: the system they never had",
        content: [
          {
            type: "quote",
            text: "Before Yonovo, we had nothing. Now we have a system that works better than anything we could have built ourselves. It is the easiest decision we have made for the business.",
            author: "Apple Smith",
            role: "Accounts Receivable Manager, Troyes Canada",
          },
          {
            type: "paragraph",
            text: "For Troyes, Yonovo was not about replacing an existing tool. It was about building something that never existed. The platform gave them structure, consistency, and visibility into their collections for the first time.",
          },
          {
            type: "paragraph",
            text: "For small wholesale teams that have been getting by without a formal collections process, Troyes' story shows what becomes possible when you put a system in place. Not months from now, but today.",
          },
        ],
      },
    ],
    cta: {
      headline: "Ready to build your collections process?",
      description:
        "Go from zero to fully automated collections in a single day, just like Troyes Canada.",
    },
  },
};
