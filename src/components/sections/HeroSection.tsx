import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import HeroCards from "@/components/sections/HeroCards";
import RatingBadge from "@/components/RatingBadge";
import ExploreWithAI from "@/components/ExploreWithAI";

// Copied from https://www.g2.com/products/yonovo/reviews, never estimated.
// Re-check that profile before changing it: the average moves as reviews land.
// Verified 2026-08-18: 4.8/5 from 3 reviews.
const reviewRating: { rating: number } | null = { rating: 4.8 };

function G2Mark() {
  return (
    <Image
      src="/logos/g2.svg"
      alt=""
      width={50}
      height={50}
      aria-hidden="true"
      className="h-7 w-7 shrink-0"
    />
  );
}

const logos = [
  { name: "Troyes", src: "/logos/troyes.png", width: 130, className: "h-[24px] lg:h-[47px]" },
  { name: "TDG Inc", src: "/logos/tdg-inc.svg", width: 200, className: "h-[52px] lg:h-[120px]" },
  { name: "SBC", src: "/logos/sbc.png", width: 200, className: "h-[40px] lg:h-[95px]" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full -mt-16 overflow-hidden pt-24 md:pt-32 pb-12 md:pb-16"
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
        <div className="relative flex w-full flex-col gap-10 md:gap-12">
          {/* Hero Grid */}
          <div className="relative mx-auto grid w-full items-center gap-10 px-0 sm:px-4 lg:grid-cols-2 lg:gap-6">
            {/* Left — Text Content */}
            <div className="flex flex-col items-center gap-5 text-center md:gap-6 lg:items-start lg:text-left">
              {reviewRating && (
                <RatingBadge
                  platform="G2"
                  rating={reviewRating.rating}
                  logo={<G2Mark />}
                />
              )}
              <h1 className="font-medium text-[34px] text-white leading-[1.15] tracking-tight sm:text-[40px] lg:text-[4.095rem] lg:leading-[1.2] lg:tracking-normal">
                Automate your<br /><span className="xl:whitespace-nowrap">accounts receivable.</span><br />Get paid&nbsp;faster.
              </h1>
              <p className="max-w-md text-[16px] text-white/70 leading-[1.6] md:text-xl lg:w-[75%] lg:max-w-none">
                Yonovo helps teams spend less time on their receivables while maintaining strong customer relationships.
              </p>
              <div className="mt-1 md:mt-2">
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

          {/* Ask an AI assistant about Yonovo. Hidden on mobile: the bar wraps
              to two rows there and pushes the social proof strip down. */}
          <div className="hidden w-full justify-end md:flex">
            <ExploreWithAI />
          </div>

          {/* Social Proof */}
          <div className="flex w-full flex-col items-center gap-0">
            <p className="text-center font-medium text-[15px] text-zinc-500 md:text-base">
              Trusted by teams who hate chasing payments
            </p>
            <div className="w-full -mt-2 md:-mt-5">
              <div className="flex items-center justify-center gap-6 md:gap-10">
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
