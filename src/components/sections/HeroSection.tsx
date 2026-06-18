import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import HeroCards from "@/components/sections/HeroCards";

const logos = [
  { name: "Troyes", src: "/logos/troyes.png", width: 130, className: "h-[28px] lg:h-[47px]" },
  { name: "TDG Inc", src: "/logos/tdg-inc.svg", width: 200, className: "h-[65px] lg:h-[120px]" },
  { name: "SBC", src: "/logos/sbc.png", width: 200, className: "h-[50px] lg:h-[95px]" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full -mt-16 overflow-hidden pt-24 md:pt-32 pb-10 md:pb-12"
      style={{ background: "white url('/hero-gradient-bg.jpg') center top / 100% 90% no-repeat" }}
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
        <div className="relative flex w-full flex-col gap-12">
          {/* Hero Grid */}
          <div className="relative mx-auto grid w-full items-center gap-6 px-4 lg:grid-cols-2">
            {/* Left — Text Content */}
            <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[13px] font-medium text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                AI accounts receivable
              </span>
              <h1 className="font-medium text-[32px] text-white leading-[1.2] tracking-tight md:text-[38px] lg:text-[4.095rem] lg:leading-[1.2] lg:tracking-normal">
                Automate your<br /><span className="xl:whitespace-nowrap">accounts receivable.</span><br />Get paid&nbsp;faster.
              </h1>
              <p className="text-[15px] text-white/70 leading-[1.6] md:text-xl lg:w-[75%]">
                Yonovo is accounts receivable automation software that follows up by email, text, and phone on every invoice until they&apos;re paid.
              </p>
              <div className="mt-2">
                <Link href="/book-demo">
                  <Button variant="brand" size="md" className="h-12 px-8 text-base font-medium">
                    Book Demo
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right — Floating product cards */}
            <div className="w-full">
              <HeroCards />
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex w-full flex-col items-center gap-0">
            <p className="text-center font-medium text-base text-zinc-500">
              Trusted by teams who hate chasing payments
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
      </div>
    </section>
  );
}
