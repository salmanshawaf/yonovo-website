import SectionBadge from "@/components/SectionBadge";

const securityItems = [
  {
    title: "Your data stays yours",
    description:
      "Your data is only accessible to your AI agent and is never used to train models.",
    hasBorder: true,
  },
  {
    title: "Data encryption",
    description:
      "All data is encrypted at rest and in transit. We use industry-standard encryption algorithms.",
    hasBorder: true,
  },
  {
    title: "Secure integrations",
    description:
      "We use verified variables to ensure users can access only their own data in your systems.",
    hasBorder: false,
  },
];

export default function SecuritySection() {
  return (
    <section className="w-full py-12 md:py-15 bg-surface">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        <div className="flex flex-col gap-8">
          {/* Main content */}
          <div className="flex flex-col items-start gap-9 lg:flex-row">
            {/* Left — Text */}
            <div className="flex w-full flex-1 flex-col items-start gap-4">
              <SectionBadge label="Security" />
              <h2 className="font-medium text-4xl text-foreground lg:text-[3.5rem] lg:leading-[1.1]">
                Enterprise-grade security &amp; privacy
              </h2>
              <p className="text-lg text-secondary lg:text-xl">
                We take security and compliance seriously. Chatbase is SOC 2
                Type II and GDPR compliant, trusted by thousands of businesses
                to build secure and compliant AI Agents.
              </p>
              {/* Compliance badges */}
              <div className="flex flex-row gap-4">
                <div className="flex aspect-square w-[75px] items-center justify-center rounded-full border border-border bg-background md:w-[100px]">
                  <span className="text-xs text-muted font-medium">SOC 2</span>
                </div>
                <div className="flex aspect-square w-[75px] items-center justify-center rounded-full border border-border bg-background md:w-[100px]">
                  <span className="text-xs text-muted font-medium">GDPR</span>
                </div>
              </div>
            </div>

            {/* Right — Security features card */}
            <div className="w-full flex-1 rounded-2xl border border-border bg-background">
              {securityItems.map((item) => (
                <div
                  key={item.title}
                  className={`relative flex w-full flex-col gap-2 overflow-hidden py-6 pl-6 lg:py-11 lg:pl-8 ${
                    item.hasBorder ? "border-b border-border" : ""
                  }`}
                >
                  <h3 className="font-medium text-xl lg:text-2xl">
                    {item.title}
                  </h3>
                  <p className="w-3/5 text-secondary lg:w-[70%]">
                    {item.description}
                  </p>
                  {/* Icon placeholder */}
                  <div className="absolute right-4 bottom-2 h-[100px] w-[100px] rounded-xl bg-surface sm:w-[112px] lg:right-8 lg:w-[132px]" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between border-t border-border pt-6">
            <div className="flex items-center gap-3">
              <svg
                className="h-6 w-6 text-muted"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="text-foreground">
                Chatbase is committed to safeguarding your data.
              </span>
            </div>
            <span className="hidden text-foreground font-medium md:inline-flex items-center gap-1 cursor-pointer">
              Learn more
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
