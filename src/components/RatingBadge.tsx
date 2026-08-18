type RatingBadgeProps = {
  /** Average rating out of 5, e.g. 4.8. Must come from the review platform, never estimated. */
  rating: number;
  /** Optional line shown after the rating, separated by a divider. */
  tagline?: string;
  /** Public profile URL. Omit to render the badge as static, non-clickable text. */
  href?: string;
  /** Accessible name for the platform, e.g. "G2". */
  platform: string;
  /** Platform mark rendered to the left of the stars. */
  logo: React.ReactNode;
};

const STAR_PATH =
  "M10 0l2.65 6.13 6.65.56-5.03 4.38 1.5 6.5L10 14.13 4.23 17.57l1.5-6.5L.7 6.69l6.65-.56L10 0z";

/**
 * `fill` is the filled fraction, 0 to 1. The remainder is drawn dimmed rather
 * than transparent so a partial star reads as partial instead of misshapen.
 */
function Star({ fill, gradientId }: { fill: number; gradientId: string }) {
  if (fill >= 1) {
    return (
      <svg viewBox="0 0 20 19" className="h-[20px] w-[20px]" aria-hidden="true">
        <path d={STAR_PATH} fill="currentColor" />
      </svg>
    );
  }

  const stop = `${fill * 100}%`;
  return (
    <svg viewBox="0 0 20 19" className="h-[20px] w-[20px]" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId}>
          <stop offset={stop} stopColor="currentColor" />
          <stop offset={stop} stopColor="currentColor" stopOpacity={0.18} />
        </linearGradient>
      </defs>
      <path d={STAR_PATH} fill={`url(#${gradientId})`} />
    </svg>
  );
}

export default function RatingBadge({ rating, tagline, href, platform, logo }: RatingBadgeProps) {
  const stars = Array.from({ length: 5 }, (_, i) =>
    Math.max(0, Math.min(1, rating - i)),
  );
  // Gradient ids must be unique per document, not just per component.
  const idBase = `star-${platform}-${String(rating).replace(".", "-")}`;

  // The stars and number are aria-hidden decoration, so the wrapper carries the
  // whole meaning for screen readers.
  const label = `${rating} out of 5 on ${platform}${tagline ? `. ${tagline}` : ""}`;
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      className="inline-flex items-center gap-3"
      {...wrapperProps}
      aria-label={label}
      role={href ? undefined : "img"}
    >
      {logo}
      <span className="flex items-center gap-1 text-white" aria-hidden="true">
        {stars.map((fill, i) => (
          <Star key={i} fill={fill} gradientId={`${idBase}-${i}`} />
        ))}
      </span>
      <span className="text-[15px] font-medium text-white" aria-hidden="true">
        {rating.toFixed(1)}
      </span>
      {tagline && (
        <>
          <span className="h-4 w-px bg-white/20" aria-hidden="true" />
          <span className="text-[15px] text-white/70">{tagline}</span>
        </>
      )}
    </Wrapper>
  );
}
