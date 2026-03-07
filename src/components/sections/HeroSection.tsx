import Image from "next/image";
import Button from "@/components/Button";

const logos = [
  { name: "Troyes", src: "/logos/troyes.png", width: 130, className: "h-9 lg:h-[46px]" },
  { name: "TDG Inc", src: "/logos/tdg-inc.png", width: 200, className: "h-[74px] lg:h-[92px]" },
];

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-15 bg-white">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        <div className="relative flex w-full flex-col gap-12 overflow-hidden">
          {/* Hero Grid */}
          <div className="relative mx-auto grid w-full items-center gap-6 px-4 lg:grid-cols-2">
            {/* Left — Text Content */}
            <div className="flex flex-col gap-6">
              <h1 className="font-medium text-[41px] text-foreground leading-[1.2] tracking-tight lg:text-[4.116rem] lg:leading-[1.2] lg:tracking-normal">
                Automate your<br /><span className="whitespace-nowrap">accounts receivable.</span><br />Get paid&nbsp;faster.
              </h1>
              <p className="text-[16px] text-secondary md:text-xl lg:w-[75%]" style={{ fontFamily: "var(--font-subheading)" }}>
                Yonovo follows up by email, text, and phone on every invoice until they&apos;re paid.
              </p>
              <div className="mt-2 flex flex-col gap-4">
                <div className="flex flex-row items-center gap-6">
                  <Button size="md" className="h-14 px-[46px] text-lg font-semibold !bg-[#203a7f] hover:!bg-[#1a2f66] shadow-lg shadow-[#203a7f]/30">
                    Start Free
                  </Button>
                  <a
                    href="#demo"
                    className="inline-flex h-14 items-center justify-center rounded-md border border-zinc-200 bg-transparent px-6 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-zinc-100"
                  >
                    Book Demo
                  </a>
                </div>
                <div className="flex items-center gap-2 font-medium text-muted text-sm">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 16 17">
                    <path d="M14.66 6.5H1.33M14.66 6.5c0 .28 0 .59 0 .94V9.5M14.66 6.5c-.01-.9-.06-1.44-.29-1.88a2.67 2.67 0 0 0-1.16-1.16C12.63 3.17 11.89 3.17 10.39 3.17H5.59c-1.49 0-2.24 0-2.81.29a2.67 2.67 0 0 0-1.16 1.16c-.22.44-.28.98-.29 1.88M1.33 6.5c0 .28 0 .59 0 .94v2.13c0 1.49 0 2.24.29 2.81.26.5.67.91 1.17 1.17.57.29 1.31.29 2.81.29h2.51M5.99 9.17H3.99" />
                    <path d="M11.25 14.58l1.41-1.41m0 0l1.42-1.42m-1.42 1.42l-1.41-1.42m1.41 1.42l1.42 1.42" />
                  </svg>
                  No card required
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-[13px] text-[#9CA3AF]">Works with</span>
                  <Image src="/logos/quickbooks.png" alt="QuickBooks" width={100} height={24} className="h-5 w-auto grayscale opacity-50" />
                  <Image src="/logos/xero.png" alt="Xero" width={24} height={24} className="h-5 w-auto grayscale opacity-50" />
                </div>
              </div>
            </div>

            {/* Right — Dashboard Preview */}
            <div className="group relative aspect-[0.939] w-full overflow-hidden rounded-3xl">
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
            <div className="w-full">
              <div className="flex items-center justify-center gap-10">
                {logos.map((logo) => (
                  <Image
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={48}
                    className={`w-auto grayscale opacity-50 ${logo.className}`}
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
