import SectionBadge from "@/components/SectionBadge";

const topFeatures = [
  {
    title: "Sync with real-time data",
    description:
      "Connect your agent to systems like order management tools, CRMs, and more to seamlessly access data ranging from order details to active subscriptions and beyond.",
    imageRatio: "aspect-[1216/696]",
  },
  {
    title: "Take actions on your systems",
    description:
      "Configure actions that your agent can perform within your systems or through one of our integrations, like updating a customer\u2019s subscription or changing their address.",
    imageRatio: "aspect-[1216/696]",
  },
];

const bottomFeatures = [
  {
    title: "Compare AI models",
    description:
      "Experiment with various models and configurations to make sure you have the best setup for your use case.",
    imageRatio: "aspect-[794/696]",
  },
  {
    title: "Smart escalation",
    description:
      "Give your agent instructions in natural language on when to escalate queries to a human agents.",
    imageRatio: "aspect-[794/696]",
  },
  {
    title: "Advanced reporting",
    description:
      "Gain insights and optimize agent performance with detailed analytics.",
    imageRatio: "aspect-[794/696]",
  },
];

const integrations = [
  "Make", "Zendesk", "Notion", "Slack", "Stripe", "Salesforce",
];

const integrations2 = [
  "Cal.com", "Calendly", "WhatsApp", "Zapier", "Messenger",
];

const bottomItems = [
  {
    title: "API",
    description:
      "APIs, client libraries, and components to deeply integrate support into your product.",
    icon: (
      <svg className="h-5 w-5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" />
      </svg>
    ),
  },
  {
    title: "Whitelabel",
    description: "Remove any Chatbase branding from the chat widget.",
    icon: (
      <svg className="h-5 w-5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6" /><path d="M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7" /><path d="M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1" /><path d="M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1" /><path d="M9 6v12" />
      </svg>
    ),
  },
  {
    title: "Always improving",
    description:
      "Syncs with your systems and learns from previous interactions.",
    icon: (
      <svg className="h-5 w-5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M16 7h6v6" /><path d="m22 7-8.5 8.5-5-5L2 17" />
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

function IntegrationPill({ name }: { name: string }) {
  return (
    <div className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-surface p-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background">
        <span className="text-xs font-medium text-muted">{name[0]}</span>
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
              Build the perfect customer-facing AI agent
            </h2>
            <p className="text-lg text-muted">
              Chatbase gives you all the tools you need to train your perfect AI
              agent and connect it to your systems.
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
                    Integrate diverse data sources to enrich your agent&apos;s
                    knowledge and capabilities.
                  </p>
                </div>
                <div className="relative flex max-h-[180px] max-w-[60%] flex-col gap-3 overflow-hidden">
                  <div className="flex gap-3">
                    {integrations.map((name) => (
                      <IntegrationPill key={name} name={name} />
                    ))}
                  </div>
                  <div className="ml-8 flex gap-3">
                    {integrations2.map((name) => (
                      <IntegrationPill key={name} name={name} />
                    ))}
                  </div>
                </div>
              </div>
              {/* Mobile */}
              <div className="md:hidden p-6">
                <div className="flex flex-wrap gap-3 mb-6">
                  {[...integrations, ...integrations2].map((name) => (
                    <IntegrationPill key={name} name={name} />
                  ))}
                </div>
                <h3 className="font-medium text-lg text-foreground leading-[21.78px] tracking-[-0.02em]">
                  Works with your tools
                </h3>
                <p className="max-w-[400px] text-[14px] text-secondary leading-[22px] tracking-[-0.02em] mt-2">
                  Integrate diverse data sources to enrich your agent&apos;s
                  knowledge and capabilities.
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
