import Link from "next/link";
import Button from "@/components/Button";

export default function BlogBottomCta() {
  return (
    <section className="w-full bg-gradient-to-b from-white from-60% to-brand-navy to-60% mt-16">
      <div className="mx-auto max-w-[1600px] px-6">
        <div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden border-t border-border bg-white px-6 py-12 pb-30 md:gap-8 md:rounded-3xl md:border md:p-15 lg:p-25">
          {/* Gradient blob left — hidden on mobile */}
          <div className="pointer-events-none absolute bottom-0 left-0 hidden md:block md:h-[40%] lg:h-[50%]">
            <div className="h-[350px] w-[350px] rounded-full bg-brand-blue opacity-70 blur-3xl" />
          </div>
          {/* Gradient blob right — hidden on mobile */}
          <div className="pointer-events-none absolute right-0 bottom-0 hidden md:block md:h-[40%] lg:h-[50%]">
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
            <div className="flex w-full max-w-sm flex-col gap-3 px-6 sm:max-w-none sm:w-auto sm:flex-row sm:gap-6 sm:px-0">
              <Link href="/book-demo" className="block">
                <Button variant="brand" size="md" className="h-14 w-full px-[46px] text-lg font-medium whitespace-nowrap">
                  Book Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
