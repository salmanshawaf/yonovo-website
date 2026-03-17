import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "Yonovo Blog";
  const category = searchParams.get("category") || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          backgroundColor: "#0c2756",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Category pill */}
        {category && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "rgba(90, 239, 118, 0.15)",
                borderRadius: "20px",
                padding: "8px 20px",
                fontSize: "18px",
                color: "#5aef76",
                fontWeight: 500,
                textTransform: "capitalize",
              }}
            >
              {category.replace(/-/g, " ")}
            </div>
          </div>
        )}

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? "42px" : "52px",
            fontWeight: 600,
            color: "white",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              fontWeight: 600,
              color: "#5aef76",
              letterSpacing: "-0.01em",
            }}
          >
            YONOVO
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "16px",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            yonovo.ai/blog
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
