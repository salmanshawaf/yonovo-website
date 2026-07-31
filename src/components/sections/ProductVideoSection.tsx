import YouTubeEmbed from "@/components/YouTubeEmbed";

export default function ProductVideoSection() {
  return (
    <section id="product-video" className="w-full bg-background pt-4 pb-12 md:pt-8 md:pb-16">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        {/* Wide product video, sitting below the fold under the hero */}
        <YouTubeEmbed
          videoId="JIDptUF5Svc"
          title="Yonovo product overview"
          className="w-full"
        />
      </div>
    </section>
  );
}
