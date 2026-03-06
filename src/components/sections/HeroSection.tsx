import Button from "@/components/Button";

const logos = [
  { name: "Sage", width: 86 },
  { name: "Chuck E. Cheese", width: 125 },
  { name: "Miele", width: 163 },
  { name: "IHG", width: 115 },
  { name: "National Grid", width: 230 },
  { name: "Opal", width: 99 },
  { name: "F45 Training", width: 115 },
  { name: "Alpian", width: 144 },
];

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-15">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        <div className="relative flex w-full flex-col gap-12 overflow-hidden">
          {/* Hero Grid */}
          <div className="relative mx-auto grid w-full items-center gap-6 px-4 lg:grid-cols-2">
            {/* Left — Text Content */}
            <div className="flex flex-col gap-6">
              <h1 className="font-medium text-[42px] text-foreground leading-[2.9rem] tracking-tight lg:text-[4.7rem] lg:leading-[5.2rem] lg:tracking-normal">
                AI agents for magical customer experiences
              </h1>
              <p className="text-[16px] text-muted md:text-xl lg:w-[90%]">
                Chatbase is the complete platform for building &amp; deploying AI
                support agents for your business.
              </p>
              <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative mb-2 inline-block">
                  <div className="absolute bottom-2 h-4 w-full translate-y-full rounded-b-lg bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to" />
                  <div className="absolute h-18 w-full" />
                  <Button size="md" className="relative h-14 w-full">
                    Build your agent for free
                  </Button>
                </div>
                <div className="flex items-center gap-2 self-center font-medium text-muted text-sm">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 16 17">
                    <path d="M14.66 6.5H1.33M14.66 6.5c0 .28 0 .59 0 .94V9.5M14.66 6.5c-.01-.9-.06-1.44-.29-1.88a2.67 2.67 0 0 0-1.16-1.16C12.63 3.17 11.89 3.17 10.39 3.17H5.59c-1.49 0-2.24 0-2.81.29a2.67 2.67 0 0 0-1.16 1.16c-.22.44-.28.98-.29 1.88M1.33 6.5c0 .28 0 .59 0 .94v2.13c0 1.49 0 2.24.29 2.81.26.5.67.91 1.17 1.17.57.29 1.31.29 2.81.29h2.51M5.99 9.17H3.99" />
                    <path d="M11.25 14.58l1.41-1.41m0 0l1.42-1.42m-1.42 1.42l-1.41-1.42m1.41 1.42l1.42 1.42" />
                  </svg>
                  No credit card required
                </div>
              </div>
            </div>

            {/* Right — Video/Demo Placeholder */}
            <div className="group relative aspect-[0.939] w-full overflow-hidden rounded-3xl">
              <div className="aspect-[0.939] w-full rounded-3xl bg-surface flex items-center justify-center">
                {/* Placeholder for video */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-border" />
                  <span className="text-sm text-secondary">Sandra Jones</span>
                </div>
              </div>
              {/* Play/Pause button */}
              <button
                type="button"
                className="absolute bottom-4 left-4 rounded-full bg-black/25 p-2 opacity-90 transition-opacity md:p-3 group-hover:opacity-100"
                aria-label="Pause video"
              >
                <svg className="h-4 w-4 md:h-6 md:w-6" fill="white" viewBox="0 0 24 24">
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex w-full flex-col items-center gap-6 md:gap-4">
            <p className="font-medium text-base text-secondary">
              Trusted by<span className="mx-1 font-bold">10,000+</span>
              <span>businesses worldwide</span>
            </p>
            <div className="w-full">
              <div className="flex items-center justify-center gap-10">
                {logos.map((logo) => (
                  <div
                    key={logo.name}
                    className="h-8 lg:h-10 flex items-center"
                    style={{ width: logo.width }}
                  >
                    <span className="text-muted font-semibold text-sm whitespace-nowrap opacity-50">
                      {logo.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
