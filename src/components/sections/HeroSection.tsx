import Link from "next/link";
import Button from "@/components/Button";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full -mt-16 overflow-hidden pt-28 md:pt-36 pb-20 md:pb-48"
      style={{ background: "white url('/hero-gradient-bg.jpg') center top / 100% 112% no-repeat" }}
    >
      {/* Dark area marker — covers the visually dark portion of the gradient (ends near cards) */}
      <div data-navbar-dark className="pointer-events-none absolute inset-x-0 top-0 h-[76%]" aria-hidden="true" />
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />
      <div className="mx-auto max-w-(--container-max-width) px-6">
        {/* Centered hero text */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[13px] font-medium text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            AI accounts receivable
          </span>
          <h1 className="font-medium text-[42px] text-white leading-[1.15] tracking-tight md:text-[44px] lg:text-[4.095rem] lg:leading-[1.2] lg:tracking-normal">
            Automate your<br /><span className="xl:whitespace-nowrap">accounts receivable.</span><br />Get paid&nbsp;faster.
          </h1>
          <p className="mx-auto max-w-2xl text-[17px] text-white/70 leading-[1.6] md:text-xl">
            Yonovo helps finance teams collect faster, automate every follow-up, and stay in control of their receivables, without adding headcount.
          </p>
          <div className="mt-2">
            <Link href="/book-demo">
              <Button variant="brand" size="md" className="h-12 px-8 text-base font-medium">
                Book Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
