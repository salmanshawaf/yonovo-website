import Link from "next/link";
import Button from "@/components/Button";

export default function BlogBottomCta() {
  return (
    <section className="w-full bg-gradient-to-b from-white from-60% to-brand-navy to-60% mt-16">
      <div className="mx-auto max-w-[1600px] px-6">
        <div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden border-t border-border bg-white px-6 py-12 pb-30 md:gap-8 md:rounded-3xl md:border md:p-15 lg:p-25">
          {/* Gradient blob left */}
          <div className="pointer-events-none absolute bottom-0 left-0 h-auto w-[40%] md:h-[40%] md:w-auto lg:h-[50%]">
            <div className="h-[350px] w-[350px] rounded-full bg-brand-blue opacity-70 blur-3xl" />
          </div>
          {/* Gradient blob right */}
          <div className="pointer-events-none absolute right-0 bottom-0 h-auto w-[40%] md:h-[40%] md:w-auto lg:h-[50%]">
            <div className="h-[350px] w-[350px] rounded-full bg-brand-blue opacity-70 blur-3xl" />
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-4 md:max-w-[850px] md:gap-6">
            <p className="text-center font-medium text-4xl text-foreground leading-tight tracking-tighter md:text-balance md:text-5xl lg:text-[54px]">
              Ready to put collections on autopilot?
            </p>
            <p className="text-center font-normal text-base text-secondary tracking-[-0.4px] md:text-balance md:text-xl">
              Join the finance teams that are collecting faster, saving hours,
              and keeping every customer relationship intact.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex w-full flex-col items-center justify-center gap-6 md:gap-4">
            <div className="flex flex-row items-center gap-6">
              <Link href="/book-demo">
                <Button variant="brand" size="md" className="h-14 px-[46px] text-lg font-medium">
                  Book Demo
                </Button>
              </Link>
              <Link href="https://dashboard.yonovo.ai/login">
                <Button variant="ghost-dark" size="md" className="h-14">
                  Start Free
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2 text-muted text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 16 17"
              >
                <path d="M14.66 6.5H1.33M14.66 6.5c0 .28 0 .59 0 .94V9.5M14.66 6.5c-.01-.9-.06-1.44-.29-1.88a2.67 2.67 0 0 0-1.16-1.16C12.63 3.17 11.89 3.17 10.39 3.17H5.59c-1.49 0-2.24 0-2.81.29a2.67 2.67 0 0 0-1.16 1.16c-.22.44-.28.98-.29 1.88M1.33 6.5c0 .28 0 .59 0 .94v2.13c0 1.49 0 2.24.29 2.81.26.5.67.91 1.17 1.17.57.29 1.31.29 2.81.29h2.51M5.99 9.17H3.99" />
                <path d="M11.25 14.58l1.41-1.41m0 0l1.42-1.42m-1.42 1.42l-1.41-1.42m1.41 1.42l1.42 1.42" />
              </svg>
              <p>No card required</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
