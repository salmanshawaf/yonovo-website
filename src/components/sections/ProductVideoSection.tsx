import Image from "next/image";
import YouTubeEmbed from "@/components/YouTubeEmbed";

const logos = [
  { name: "Troyes", src: "/logos/troyes.png", width: 130, className: "h-[28px] lg:h-[47px]" },
  { name: "TDG Inc", src: "/logos/tdg-inc.svg", width: 200, className: "h-[65px] lg:h-[120px]" },
  { name: "SBC", src: "/logos/sbc.png", width: 200, className: "h-[50px] lg:h-[95px]" },
];

export default function ProductVideoSection() {
  return (
    <section id="product-video" className="w-full bg-background pb-12 md:pb-16">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        {/* Wide product video, lifted to overlap the hero like a product showcase */}
        <YouTubeEmbed
          videoId="JIDptUF5Svc"
          title="Yonovo product overview"
          className="-mt-8 w-full md:-mt-16"
        />

        {/* Social proof */}
        <div className="mt-12 flex w-full flex-col items-center gap-0 md:mt-16">
          <p className="text-center font-medium text-base text-zinc-500">
            Trusted by teams who hate chasing payments
          </p>
          <div className="mt-3 w-full">
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
  );
}
