import Image from "next/image";
import Button from "@/components/Button";

const logos = [
  { name: "Troyes", src: "/logos/troyes.png", width: 130, className: "h-8 lg:h-[41px]" },
  { name: "TDG Inc", src: "/logos/tdg-inc.png", width: 200, className: "h-[67px] lg:h-[83px]" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full -mt-16 pt-28 md:pt-32 pb-10 md:pb-12"
      style={{ background: "white url('/hero-gradient-bg.webp') center top / 100% 90% no-repeat" }}
    >
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
        <div className="relative flex w-full flex-col gap-8 overflow-hidden">
          {/* Hero Grid */}
          <div className="relative mx-auto grid w-full items-center gap-6 px-4 lg:grid-cols-2">
            {/* Left — Text Content */}
            <div className="flex flex-col gap-6">
              <h1 className="font-medium text-[38px] text-white leading-[1.2] tracking-tight lg:text-[4.095rem] lg:leading-[1.2] lg:tracking-normal">
                Automate your<br /><span className="whitespace-nowrap">accounts receivable.</span><br />Get paid&nbsp;faster.
              </h1>
              <p className="text-[16px] text-white/70 leading-[1.6] md:text-xl lg:w-[75%]">
                Yonovo follows up by email, text, and phone on every invoice until they&apos;re paid.
              </p>
              <div className="mt-2 flex flex-col gap-4">
                <div className="flex flex-row items-center gap-6">
                  <Button size="md" className="h-14 px-[46px] text-lg font-medium !bg-[#5aef76] hover:!bg-[#4DE068] !text-[#111827] shadow-[0_0_20px_rgba(90,239,118,0.3)]">
                    Start Free
                  </Button>
                  <a
                    href="#demo"
                    className="inline-flex h-14 items-center justify-center rounded-md border border-white/30 bg-transparent px-6 py-2.5 text-base font-medium text-white transition-colors hover:bg-white/10"
                  >
                    Book Demo
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#203a7f]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 16 17">
                    <path d="M14.66 6.5H1.33M14.66 6.5c0 .28 0 .59 0 .94V9.5M14.66 6.5c-.01-.9-.06-1.44-.29-1.88a2.67 2.67 0 0 0-1.16-1.16C12.63 3.17 11.89 3.17 10.39 3.17H5.59c-1.49 0-2.24 0-2.81.29a2.67 2.67 0 0 0-1.16 1.16c-.22.44-.28.98-.29 1.88M1.33 6.5c0 .28 0 .59 0 .94v2.13c0 1.49 0 2.24.29 2.81.26.5.67.91 1.17 1.17.57.29 1.31.29 2.81.29h2.51M5.99 9.17H3.99" />
                    <path d="M11.25 14.58l1.41-1.41m0 0l1.42-1.42m-1.42 1.42l-1.41-1.42m1.41 1.42l1.42 1.42" />
                  </svg>
                  No card required
                </div>
                <div className="mt-1 flex items-center gap-3 hidden">
                  <span className="text-[13px] text-white/50">Works with</span>
                  <Image src="/logos/quickbooks.png" alt="QuickBooks" width={120} height={29} className="h-6 w-auto brightness-0 invert opacity-60" />
                  <Image src="/logos/xero.png" alt="Xero" width={29} height={29} className="h-6 w-auto brightness-0 invert opacity-60" />
                </div>
              </div>
            </div>

            {/* Right — Dashboard Preview */}
            <div id="hero-video" className="group relative aspect-[0.939] w-full overflow-hidden rounded-3xl">
              <video
                src="/hero-video.mov"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex w-full flex-col items-center gap-0">
            <p className="font-medium text-base text-zinc-500">
              Trusted by finance teams who hate chasing payments
            </p>
            <div className="w-full -mt-1">
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
