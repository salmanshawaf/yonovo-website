"use client";

import Image from "next/image";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const logos = [
  { name: "Troyes", src: "/logos/troyes.png", width: 130, className: "h-[37px] lg:h-[47px]" },
  { name: "TDG Inc", src: "/logos/tdg-inc.svg", width: 200, className: "h-[95px] lg:h-[120px]" },
];

export default function BookDemoPage() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "yonovo-discovery" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <>
      {/* ── Hero: two-column layout ── */}
      <section className="w-full -mt-16 pt-28 md:pt-40 pb-16 md:pb-20 bg-background">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — Copy */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-32">
              <h1 className="text-balance font-medium text-[38px] tracking-tight text-foreground md:text-[56px] md:leading-[1.08]">
                See Yonovo in action
              </h1>
              <p className="text-lg text-secondary leading-relaxed max-w-[480px]">
                Book a discovery call with our team. We will walk you through how Yonovo automates your accounts receivable, so you can collect faster and focus on growth.
              </p>

              {/* What to expect */}
              <div className="mt-2 flex flex-col gap-4">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-foreground">
                  On this call, we will
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    "Review your current AR workflow and identify gaps",
                    "Demo the platform with your specific use case",
                    "Show you how teams like yours reduced DSO by 40%+",
                    "Answer any questions about pricing, integrations, or setup",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-secondary leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — Cal.com embed */}
            <div className="w-full rounded-2xl border border-border bg-white p-2 md:p-4 shadow-sm">
              <Cal
                namespace="yonovo-discovery"
                calLink="team/yonovo/yonovo-discovery"
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{ layout: "month_view" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="w-full bg-background py-6 md:py-8">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex w-full flex-col items-center gap-0">
            <p className="font-medium text-base text-zinc-500">
              Trusted by finance teams who hate chasing payments
            </p>
            <div className="w-full -mt-5">
              <div className="flex items-center justify-center gap-10">
                {logos.map((logo) => (
                  <Image
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={48}
                    className={`w-auto grayscale opacity-60 ${logo.className}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
