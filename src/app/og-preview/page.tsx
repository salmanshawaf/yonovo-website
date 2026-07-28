import type { Metadata } from "next";
import HeroCards from "./_HeroCards";

/* Internal bake source for /public/og-default.png (the flagship social card).
   Not linked anywhere and noindexed. To re-bake: run the dev server, open
   /og-preview, and screenshot the #og-card element at 1200x630 (2x). */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const NAVY = "#0c2756";

export default function OgPreviewPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "#333",
        padding: 40,
      }}
    >
      {/* The card — exactly 1200x630 */}
      <div
        id="og-card"
        style={{
          position: "relative",
          width: 1200,
          height: 630,
          overflow: "hidden",
          background: NAVY,
        }}
      >
        {/* faint decorative squares */}
        <div
          style={{
            position: "absolute",
            top: 300,
            left: -120,
            width: 360,
            height: 360,
            borderRadius: 40,
            transform: "rotate(20deg)",
            background: "#203a7f",
            opacity: 0.25,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -140,
            right: 120,
            width: 320,
            height: 320,
            borderRadius: 40,
            transform: "rotate(18deg)",
            background: "#203a7f",
            opacity: 0.2,
          }}
        />

        {/* Centered logo */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/yonovo-logo-white.png" alt="Yonovo" style={{ height: 34, width: "auto" }} />
        </div>

        {/* Framed landing-page preview, bleeding off the bottom */}
        <div
          style={{
            position: "absolute",
            top: 110,
            left: "50%",
            transform: "translateX(-50%)",
            width: 1062,
            height: 520,
            borderRadius: "18px 18px 0 0",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 40px 90px -20px rgba(0,0,0,0.6)",
            overflow: "hidden",
          }}
        >
          {/* The reconstructed old split hero, zoomed to fit the frame width */}
          <div
            style={{
              zoom: 0.78,
              width: 1360,
              background: `${NAVY} url('/hero-gradient-bg.jpg') center top / cover no-repeat`,
              padding: "60px 60px 0 60px",
              display: "flex",
              alignItems: "center",
              gap: 36,
            }}
          >
            {/* Left — text */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 22 }}>
              <span
                style={{
                  alignSelf: "flex-start",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.05)",
                  padding: "6px 14px",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: 999, background: "#5aef76" }} />
                AI accounts receivable
              </span>
              <h1
                style={{
                  margin: 0,
                  fontSize: 62,
                  lineHeight: 1.15,
                  fontWeight: 500,
                  color: "#fff",
                  letterSpacing: "-0.5px",
                }}
              >
                Automate your accounts receivable. Get paid&nbsp;faster.
              </h1>
              <p
                style={{
                  margin: 0,
                  width: "80%",
                  fontSize: 21,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Yonovo helps finance teams collect faster, automate every follow-up, and stay in
                control of their receivables, without adding headcount.
              </p>
              <div
                style={{
                  marginTop: 6,
                  alignSelf: "flex-start",
                  borderRadius: 12,
                  background: "#5aef76",
                  padding: "14px 30px",
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#0c2756",
                }}
              >
                Book Demo
              </div>
            </div>

            {/* Right — product-UI cluster */}
            <div style={{ flexShrink: 0 }}>
              <HeroCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
