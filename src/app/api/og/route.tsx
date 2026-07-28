import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

/* ── Brand tokens ── */
const GREEN = "#5aef76";
const GREEN_GLOW = "rgba(90, 239, 118, 0.12)";
const NAVY_DARK = "#081a3a";
const TEXT_MUTED = "rgba(203, 213, 225, 0.85)";
const TEXT_FOOTER = "rgba(148, 163, 184, 0.9)";

/* ── Fonts (Inter, colocated .woff — Satori supports ttf/otf/woff, not woff2) ──
   Bundled next to this route and loaded via import.meta.url, the documented
   Next.js pattern that works in the Edge runtime with no runtime network call.
   Cached in module scope so repeated OG requests reuse one fetch. */
let fontsPromise: Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> | null =
  null;
function loadFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      fetch(new URL("./Inter-Regular.woff", import.meta.url)).then((r) =>
        r.arrayBuffer()
      ),
      fetch(new URL("./Inter-Bold.woff", import.meta.url)).then((r) =>
        r.arrayBuffer()
      ),
    ]).then(([regular, bold]) => ({ regular, bold }));
  }
  return fontsPromise;
}

/* ── Subtle green glow accent ── */
function GlowCircle({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: GREEN_GLOW,
        display: "flex",
      }}
    />
  );
}

/* ── Shared wrapper: gradient border + dark panel + faint grid ── */
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #203a7f 0%, #7b2d8e 50%, #c74080 100%)",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: NAVY_DARK,
          borderRadius: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid */}
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={`v${i}`}
            style={{
              position: "absolute",
              left: `${i * 90}px`,
              top: 0,
              width: "1px",
              height: "100%",
              background: GREEN,
              opacity: 0.05,
              display: "flex",
            }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`h${i}`}
            style={{
              position: "absolute",
              top: `${i * 90}px`,
              left: 0,
              height: "1px",
              width: "100%",
              background: GREEN,
              opacity: 0.05,
              display: "flex",
            }}
          />
        ))}
        {/* Corner glows */}
        <GlowCircle x={1120} y={560} size={520} />
        <GlowCircle x={40} y={40} size={280} />
        {children}
      </div>
    </div>
  );
}

/* ── Map a category slug to a human-readable eyebrow label ── */
const CATEGORY_LABEL: Record<string, string> = {
  guides: "Guide",
  insights: "Insights",
  comparisons: "Comparison",
  "use-cases": "Use Case",
  company: "News",
};

/* Pick a title font size that keeps long titles inside the card. */
function titleSize(title: string): number {
  const len = title.length;
  if (len <= 30) return 74;
  if (len <= 50) return 62;
  if (len <= 80) return 52;
  return 44;
}

/* ── The branded card ── */
function Card({
  title,
  label,
  subtitle,
  logoSrc,
}: {
  title: string;
  label: string;
  subtitle?: string;
  logoSrc: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "72px",
        position: "relative",
      }}
    >
      {/* Logo (white wordmark, correct for the navy panel).
          Satori fetches this from our own origin. If self-origin fetch ever
          proves unreliable, colocate the PNG next to this route and load it via
          fetch(new URL("./yonovo-logo-white.png", import.meta.url)) as a
          base64 data: URI instead. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoSrc} width={283} height={44} alt="Yonovo" />

      {/* Body: (optional eyebrow + accent bar) → title → optional subtitle */}
      <div style={{ display: "flex", flexDirection: "column", maxWidth: "1000px" }}>
        {label ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                color: GREEN,
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              {label}
            </div>
            <div
              style={{
                display: "flex",
                width: 64,
                height: 5,
                borderRadius: 3,
                background: GREEN,
                margin: "20px 0 24px 0",
              }}
            />
          </div>
        ) : null}
        <div
          style={{
            // -webkit-box + line-clamp clamps very long titles to 3 lines.
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "#ffffff",
            fontSize: titleSize(title),
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-1px",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: "flex",
              marginTop: 28,
              color: TEXT_MUTED,
              fontSize: 30,
              fontWeight: 400,
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: TEXT_FOOTER,
          fontSize: 26,
          fontWeight: 400,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: GREEN,
            marginRight: 14,
          }}
        />
        yonovo.com
      </div>
    </div>
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "Yonovo";
  const category = searchParams.get("category") || "";
  const subtitle = searchParams.get("subtitle") || undefined;
  // Eyebrow: explicit `label` → category map → omitted (empty). We skip it
  // rather than default to "Yonovo", which would be redundant with the logo.
  const label = searchParams.get("label") || CATEGORY_LABEL[category] || "";

  const logoSrc = `${new URL(request.url).origin}/yonovo-logo-white.png`;
  const { regular, bold } = await loadFonts();

  return new ImageResponse(
    (
      <Shell>
        <Card
          title={title}
          label={label}
          subtitle={subtitle}
          logoSrc={logoSrc}
        />
      </Shell>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
      ],
    }
  );
}
