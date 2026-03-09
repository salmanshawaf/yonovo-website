import SectionBadge from "@/components/SectionBadge";

const topFeatures = [
  {
    title: "Reach customers on every channel",
    description:
      "Follow up on overdue invoices by email, SMS, and AI powered voice calls automatically. Each channel escalates based on your rules so no invoice gets forgotten.",
    imageRatio: "aspect-[1216/696]",
  },
  {
    title: "Smart workflows that run for you",
    description:
      "Build collection sequences with escalation rules, timing delays, and channel preferences or let the AI recommend the best approach based on your customer data.",
    imageRatio: "aspect-[1216/696]",
  },
];

const bottomFeatures = [
  {
    title: "AI voice calls",
    description:
      "Automatically call overdue customers with a natural sounding AI agent that logs every conversation.",
    imageRatio: "aspect-[794/696]",
  },
  {
    title: "Customer intelligence",
    description:
      "Complete customer profiles with payment history and relationship context for every follow up.",
    imageRatio: "aspect-[794/696]",
  },
  {
    title: "Escalation rules",
    description:
      "Define when an invoice moves from friendly reminder to firm follow up to human handoff.",
    imageRatio: "aspect-[794/696]",
  },
];

const integrations = [
  { name: "QuickBooks", logo: "/logos/quickbooks-icon.png" },
  { name: "Xero", logo: "/logos/xero-icon.png" },
  { name: "Sage", logo: "/logos/sage-icon.svg" },
  { name: "FreshBooks", logo: "/logos/freshbooks-icon.png" },
  { name: "NetSuite", logo: "/logos/netsuite-icon.svg" },
];

const integrations2 = [
  { name: "Salesforce", logo: "/logos/salesforce-icon.webp" },
  { name: "HubSpot", logo: "/logos/hubspot-icon.png" },
  { name: "SAP", logo: "/logos/sap-icon.webp" },
  { name: "WhatsApp", logo: "/logos/whatsapp-icon.png", iconClassName: "h-7 w-7 object-contain" },
];

const bottomItems = [
  {
    title: "Always learning",
    description:
      "Adapts follow up strategies based on what\u2019s working across your customer base.",
    icon: (
      <svg className="h-5 w-5 shrink-0 text-brand-red" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M16 7h6v6" /><path d="m22 7-8.5 8.5-5-5L2 17" />
      </svg>
    ),
  },
  {
    title: "Sends from your email",
    description: "Every message goes out from your domain so customers see a name they trust.",
    icon: (
      <svg className="h-5 w-5 shrink-0 text-brand-red" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    title: "Built for scale",
    description:
      "Whether you have 50 invoices or 5,000, the system runs the same.",
    icon: (
      <svg className="h-5 w-5 shrink-0 text-brand-red" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" />
      </svg>
    ),
  },
];

function FeatureCard({
  title,
  description,
  imageRatio,
}: {
  title: string;
  description: string;
  imageRatio: string;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border transition-all duration-300 bg-background hover:border-secondary/40">
      <div className="w-full">
        <div className="w-full rounded-2xl px-4 pt-4">
          <div className={`${imageRatio} w-full bg-surface rounded-t-xl flex items-center justify-center`}>
            <span className="text-muted text-sm">{title}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5 pb-5">
        <h3 className="font-medium text-lg text-foreground leading-[21.78px] tracking-[-0.02em]">
          {title}
        </h3>
        <p className="text-[14px] text-secondary leading-[22px] tracking-[-0.02em]">
          {description}
        </p>
      </div>
    </div>
  );
}

function IntegrationPill({ name, logo, iconClassName }: { name: string; logo: string; iconClassName?: string }) {
  return (
    <div className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-surface p-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background">
        <img src={logo} alt={name} className={iconClassName || "h-5 w-5 object-contain"} />
      </div>
      <div className="pr-2 font-medium text-sm text-foreground">{name}</div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-15 bg-surface">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col items-start gap-4">
            <SectionBadge label="Features" />
            <h2 className="font-medium text-4xl text-foreground tracking-tight lg:text-[3.5rem] lg:leading-[1.1]">
              Everything you need to collect smarter
            </h2>
            <p className="max-w-[720px] text-lg text-muted">
              Yonovo gives you all the tools your finance team needs to automate
              collections, protect relationships, and recover revenue faster.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-8 py-12">
            {/* Top Row — 2 columns */}
            <div className="grid gap-8 md:grid-cols-2">
              {topFeatures.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>

            {/* Bottom Row — 3 columns */}
            <div className="grid gap-8 md:grid-cols-3">
              {bottomFeatures.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>

            {/* Integrations Bar */}
            <div className="overflow-hidden rounded-3xl border border-border bg-background">
              <div className="hidden md:flex md:items-start md:justify-between md:p-8 md:pr-0">
                <div className="flex flex-col gap-2 shrink-0">
                  <h3 className="font-medium text-lg text-foreground leading-[21.78px] tracking-[-0.02em]">
                    Works with your tools
                  </h3>
                  <p className="max-w-[400px] text-[14px] text-secondary leading-[22px] tracking-[-0.02em]">
                    Connect your existing accounting and business software to sync
                    invoices, customers, and payment data in real time.
                  </p>
                </div>
                <div className="relative flex max-h-[180px] max-w-[60%] flex-col gap-3 overflow-hidden">
                  <div className="flex gap-3">
                    {integrations.map((item) => (
                      <IntegrationPill key={item.name} {...item} />
                    ))}
                  </div>
                  <div className="ml-8 flex gap-3">
                    {integrations2.map((item) => (
                      <IntegrationPill key={item.name} {...item} />
                    ))}
                  </div>
                </div>
              </div>
              {/* Mobile */}
              <div className="md:hidden p-6">
                <div className="flex flex-wrap gap-3 mb-6">
                  {[...integrations, ...integrations2].map((item) => (
                    <IntegrationPill key={item.name} {...item} />
                  ))}
                </div>
                <h3 className="font-medium text-lg text-foreground leading-[21.78px] tracking-[-0.02em]">
                  Works with your tools
                </h3>
                <p className="max-w-[400px] text-[14px] text-secondary leading-[22px] tracking-[-0.02em] mt-2">
                  Connect your existing accounting and business software to sync
                  invoices, customers, and payment data in real time.
                </p>
              </div>
            </div>

            {/* Bottom Features Row */}
            <div className="grid w-full grid-cols-1 md:grid-cols-3 items-start gap-8 md:gap-16">
              {bottomItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  {item.icon}
                  <div>
                    <h3 className="font-medium text-sm text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
