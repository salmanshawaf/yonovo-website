import { YONOVO_INTEGRATION_LIST } from "@/lib/site-config";

/** Visible FAQ copy on /pricing. Shared with FAQPage structured data. */
export const pricingFaqs: { question: string; answer: string }[] = [
  {
    question: "How does Yonovo pricing work?",
    answer:
      "Our pricing is adapted to your company's size and needs. Pricing is custom based on your annual revenue, number of customers, and the features you need. Book a demo and we'll put together a personalized quote.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a demo with our team. We'll walk you through Yonovo on your real invoices, recommend the right plan for your size, and get you set up. Most teams are live within a day.",
  },
  {
    question: "What integrations do you support?",
    answer:
      `Yonovo integrates with ${YONOVO_INTEGRATION_LIST}.`,
  },
  {
    question: "How long does setup take?",
    answer:
      "Most teams are up and running within a day. Connect your accounting software and Yonovo starts managing follow-ups immediately.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Absolutely. You can upgrade or adjust your plan at any time as your business grows. Our team will help you find the right fit.",
  },
];
