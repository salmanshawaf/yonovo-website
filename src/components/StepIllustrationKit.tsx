/**
 * Shared primitives for the "How it works" step illustrations.
 *
 * Every card in those canvases is authored on a 1200x900 (4:3) artboard, so
 * u() converts design pixels to cqw against the container the Card sets up.
 * Nothing here ships client JS.
 */

import type { CSSProperties, ReactNode } from "react";

/** Design pixels on the 1200-wide artboard to container-relative lengths. */
export const u = (px: number) => `${(px / 1200) * 100}cqw`;

export const INK = "#0c2756";
export const MUTED = "#71717a";
export const FAINT = "#a1a1aa";
export const ZINC = "#52525b";
export const HAIR = "#e5e7eb";
export const RULE = "#f1f1f2";
export const RED = "#e13f3f";
export const GREEN = "#177a3c";
export const GREEN_BG = "#eefbf1";

export const dashed = `repeating-linear-gradient(#d4d4d8 0 ${u(8)}, transparent ${u(8)} ${u(16)})`;

/** The 4:3 artboard. Establishes the container that every u() resolves against. */
export function Card({
  children,
  padding,
  gap,
}: {
  children: ReactNode;
  padding: string;
  gap: number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        containerType: "inline-size",
        aspectRatio: "4 / 3",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fff",
          border: `1px solid ${HAIR}`,
          borderRadius: u(24),
          boxSizing: "border-box",
          padding,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: u(gap),
          fontFamily: "inherit",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function Pill({
  children,
  bg,
  color,
  fontSize,
  padding,
}: {
  children: ReactNode;
  bg: string;
  color: string;
  fontSize: number;
  padding: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: u(8),
        padding,
        borderRadius: "9999px",
        background: bg,
        color,
        fontSize: u(fontSize),
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}

export function Dot({ size, color }: { size: number; color: string }) {
  return (
    <div
      style={{
        width: u(size),
        height: u(size),
        borderRadius: "9999px",
        background: color,
        flex: "none",
      }}
    />
  );
}

export function Stroke({
  size = 38,
  color = RED,
  children,
}: {
  size?: number;
  color?: string;
  children: ReactNode;
}) {
  return (
    <svg
      width={u(size)}
      height={u(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      {children}
    </svg>
  );
}

/** Big navy figure. */
export const numeral = (fontSize: number): CSSProperties => ({
  fontSize: u(fontSize),
  fontWeight: 500,
  color: INK,
  letterSpacing: "-0.03em",
  lineHeight: 1,
});

/** Small uppercase field/column label. */
export const caps = (fontSize = 19): CSSProperties => ({
  fontSize: u(fontSize),
  fontWeight: 500,
  letterSpacing: "0.09em",
  color: FAINT,
});

/** Bordered value box under a caps label. */
export function FieldBox({
  label,
  value,
  fontSize = 24,
  strong = false,
  gap = 12,
  style,
}: {
  label: string;
  value: string;
  fontSize?: number;
  strong?: boolean;
  gap?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: u(gap), ...style }}
    >
      <div style={caps()}>{label}</div>
      <div
        style={{
          border: `1px solid ${HAIR}`,
          borderRadius: u(10),
          padding: `${u(20)} ${u(22)}`,
          fontSize: u(fontSize),
          color: INK,
          fontWeight: strong ? 500 : undefined,
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </div>
    </div>
  );
}

/** Solid brand-coloured action button. */
export function ActionButton({
  children,
  bg,
  fontSize = 23,
  padding,
}: {
  children: ReactNode;
  bg: string;
  fontSize?: number;
  padding: string;
}) {
  return (
    <div
      style={{
        padding,
        borderRadius: u(8),
        background: bg,
        color: "#fff",
        fontSize: u(fontSize),
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}

/** One column in a line-item table. `width` of 0 means flex:1. */
export type Col = {
  width: number;
  align?: "right";
  head: string;
};

export const colStyle = (c: Col): CSSProperties =>
  c.width === 0
    ? { flex: 1 }
    : { width: u(c.width), textAlign: c.align === "right" ? "right" : undefined };

export function TableHead({
  cols,
  gap = 24,
  fontSize = 19,
  padding = `0 ${u(4)} ${u(16)}`,
}: {
  cols: Col[];
  gap?: number;
  fontSize?: number;
  padding?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: u(gap),
        padding,
        borderBottom: `1px solid ${HAIR}`,
      }}
    >
      {cols.map((c) => (
        <div key={c.head} style={{ ...caps(fontSize), ...colStyle(c) }}>
          {c.head}
        </div>
      ))}
    </div>
  );
}
