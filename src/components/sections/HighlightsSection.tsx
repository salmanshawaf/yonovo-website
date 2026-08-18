import Image from "next/image";
import SectionBadge from "@/components/SectionBadge";

const highlights = [
  {
    title: "Built for quick setup",
    colSpan: "",
    image: "/images/highlight-quick-setup-v2.png",
  },
  {
    title: "Designed for simplicity",
    colSpan: "",
    image: "/images/highlight-simplicity-v2.png",
  },
  {
    title: "Engineered for human oversight",
    colSpan: "md:col-span-2 lg:col-span-1",
    image: "/images/highlight-human-oversight-v2.png",
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
                Yonovo is designed for finance teams that want to spend less
                time on accounts receivable and more time on high-value work.
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className={`@container relative flex flex-col overflow-hidden rounded-3xl border border-border bg-background transition-all duration-300 hover:border-secondary/40 ${item.colSpan}`}
              >
                {/* Image */}
                <div className="relative aspect-[784/800] w-full overflow-hidden" style={{ backgroundColor: '#f5f4ef' }}>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-muted text-sm">{item.title}</span>
                    </div>
                  )}
                </div>
                <div className="px-3 pt-4 pb-8">
                  <h3 className="text-center font-semibold text-[clamp(1.0625rem,6.4cqw,1.625rem)] text-foreground leading-snug tracking-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
