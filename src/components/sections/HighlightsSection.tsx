import SectionBadge from "@/components/SectionBadge";

const highlights = [
  {
    title: "Built for quick setup",
    description:
      "From signup to your first automated follow up in minutes, not weeks or months.",
    colSpan: "",
  },
  {
    title: "Designed for simplicity",
    description:
      "Your entire collections process on autopilot so your team never has to chase a payment again.",
    colSpan: "",
  },
  {
    title: "Engineered for human oversight",
    description:
      "Full control to review every message before it sends or step back and let it all run hands free.",
    colSpan: "md:col-span-2 lg:col-span-1",
  },
];

export default function HighlightsSection() {
  return (
    <section className="w-full pt-4 md:pt-6 pb-12 md:pb-15 bg-white">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        <div className="flex flex-col gap-4 py-12">
          {/* Header */}
          <div className="flex flex-col items-start gap-4">
            <SectionBadge label="Highlights" />
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-10">
              <h2 className="font-medium text-4xl text-foreground tracking-tight lg:text-[3.5rem] lg:leading-[1.1]">
                The complete platform for accounts receivable
              </h2>
              <p className="max-w-[600px] text-lg text-muted">
                Yonovo is designed for finance teams that want to collect faster
                without adding headcount or damaging customer relationships.
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className={`relative flex flex-col overflow-hidden rounded-3xl border border-border bg-background transition-all duration-300 hover:border-secondary/40 ${item.colSpan}`}
              >
                {/* Image Placeholder */}
                <div className="aspect-[784/800] w-full bg-surface flex items-center justify-center">
                  <span className="text-muted text-sm">{item.title}</span>
                </div>
                <div className="space-y-2 px-6 pb-6">
                  <h3 className="font-semibold text-xl text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-base text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
