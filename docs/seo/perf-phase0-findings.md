# Phase 0 findings — site speed

**Date:** 2026-08-20 · **Harness:** `npm run perf:baseline` (Lighthouse 12.6.1, mobile, simulated throttling, median of 3 runs per URL) · **Target:** production `https://www.yonovo.com`

Raw data: [`perf-baseline.md`](perf-baseline.md) / [`perf-baseline.json`](perf-baseline.json).

---

## Headline

**Only the `/solutions/*` pages actually fail.** Four of the six baselined URLs already pass Core Web Vitals comfortably. The brief's premise — that LCP is broken sitewide — is not reproducible against direct Lighthouse measurement.

| Page | Perf | LCP | TBT | CLS | Verdict |
|---|---|---|---|---|---|
| `/` | 93 | 3.2s | 14ms | 0.000 | Needs improvement |
| `/book-demo` | 100 | 1.5s | 18ms | 0.002 | **Good** |
| `/solutions/sage` | 83 | **4.7s** | 16ms | 0.000 | **Poor** |
| `/solutions/quickbooks` | 86 | **4.2s** | 12ms | 0.000 | **Poor** |
| `/pricing` | 99 | 2.0s | 12ms | 0.000 | **Good** |
| `/blog/best-ar-automation-software` | 99 | 2.3s | 16ms | 0.000 | **Good** |

CLS is 0.000 on five of six pages and 0.002 on the sixth. TBT is 12–18ms everywhere.

---

## Root cause on `/solutions/*`: React 19 preloads starve the LCP element

The LCP element on both failing pages is the hero `<video>` poster. Its phase breakdown:

| Phase | `/solutions/sage` | `/solutions/quickbooks` |
|---|---|---|
| TTFB | 615ms | 616ms |
| **Load Delay** | **1366ms** | **1376ms** |
| **Load Time** | **1756ms** | 790ms |
| Render Delay | 937ms | 1434ms |

**The poster is 25 KB.** It should load in about 100ms. It takes 1756ms, and does not even begin for 1366ms.

The mechanism: **React 19 automatically emits `<link rel="preload" as="image">` for every raw `<img>` rendered during SSR, regardless of viewport position.** `next/image` does not do this (it emits `loading="lazy"` instead). The codebase has **28 raw `<img>` tags across 15 files**.

On `/solutions/sage` that produces **647 KB of high-priority preloads for below-the-fold step screenshots**, which occupy the connection ahead of the 25 KB LCP poster:

| Preloaded file | Size | Dimensions |
|---|---|---|
| `/images/sage-step-1-invoice.png` | 196 KB | 1600×907 |
| `/images/qb-step-3-followup.png` | 166 KB | 1258×992 |
| `/images/highlight-oversight.png` | 126 KB | 1084×880 |
| `/images/qb-step-5-dashboard.png` | 70 KB | 1294×458 |
| `/images/qb-step-4-learns.png` | 49 KB | 568×398 |
| `/images/qb-step-2-stats.png` | 36 KB | 1148×222 |

Lighthouse independently confirms the size half of this: *"Serve images in next-gen formats: 574 KiB"* on `/solutions/sage`.

Each of these is **rendered twice** in the DOM — the `imageBlock` variable in the timeline section is emitted in both the `md:hidden` mobile branch and the `hidden md:grid` desktop branch.

The homepage has the same pattern at smaller scale: **15 image preloads, 188 KB**, including `/yonovo-icon.png` (63 KB at 2133×2133, rendered into a 52×52 box) and the YouTube poster from `i.ytimg.com` cross-origin.

**Fix:** converting raw `<img>` to `next/image` removes the preloads, adds lazy loading, and serves WebP — one change, three wins. This is the highest-leverage item and should lead the work.

---

## Corrections to the brief

1. **`/book-demo` is not slow.** Measured Perf 100, LCP 1.5s, TBT 18ms. The brief reports Perf 49, LCP 5.9s, TBT 859ms. Not reproducible. **Phase 1 as written has no LCP problem to solve.**
2. **TBT is not a problem anywhere.** 12–18ms across all six pages against the brief's 859ms and 544ms figures.
3. **There is no GTM container.** It is a direct gtag.js install (`G-BK8T7VN9WM`). The brief's Phase 2 framing of moving tags into GTM is not available.
4. **`ddwl4m2hdecbv.cloudfront.net` is RB2B** — inline loader in `src/app/layout.tsx`, key `W6Z57HZ481OX`.
5. **`9xgnrndqve.execute-api.us-west-2.amazonaws.com` never appeared** in any of the 18 runs. `pro.ip-api.com` appeared on `/book-demo` instead. **Unresolved — nothing touched.**
6. **No conversion tracking exists on demo bookings.** The only Cal.com listener is `linkReady`, a UI loading flag. Nothing can break because nothing is tracking.
7. **The `/solutions/*` hero does contain above-the-fold media** — a `VideoPlayer`. The brief reported no image above the fold there.
8. **`/solutions/sage` ships the QuickBooks video and poster** (`/videos/quickbooks-sync*`). Content bug, out of scope.

### Hypotheses I raised that the data refutes

- **Parser-blocking inline scripts are not the cause.** The only render-blocking resource on any page is a 17 KiB CSS chunk (150–304ms). `gtag-init` and `reb2b-js` never appear in the render-blocking audit.
- **`"use client"` is not delaying the `/book-demo` hero.** Next SSRs client components; the `<h1>` and bullets are present in the initial HTML. Splitting the component would reduce hydration JS, not LCP.

---

## Why these numbers differ from the brief's

The brief's figures come from Ahrefs' PageSpeed Insights integration; these come from Lighthouse run locally against the same production URLs. Absolute values run roughly half the brief's throughout. Likely causes: different network origin and Vercel edge locality, and a different measurement date.

**Implication:** before/after comparisons must use this harness consistently. A methodology change must not be allowed to read as an improvement. Field data cannot arbitrate — 0 of 84 pages appear in CrUX.

---

## Remaining page-weight facts (real, but not LCP-driving)

- **`app.cal.com` transfers 1806 KiB on `/book-demo`** — by far the largest third party on the site. It does not hurt lab LCP or TBT, but it is 1.8 MB of mobile data on the primary conversion page. Deferring it remains worthwhile on data-cost grounds, not speed grounds.
- **`www.googletagmanager.com` transfers 187 KiB on every page**, consistent with the brief.
- **Zero `preconnect`/`dns-prefetch` hints** exist for any of the six third-party origins.
- **`public/images/hero video.mov` is 3.67 MB and unreferenced.**

---

## Recommended revision to the plan

| Phase | Original | Revised |
|---|---|---|
| 1 | `/book-demo` LCP + TBT | **Drop.** No defect measured. |
| 2 | Third-party scripts | **Demote.** Add preconnects; defer tags. Small wins. |
| 3 | Images | **Promote to first.** Raw `<img>` → `next/image` is the fix for the only failing pages. |
| 4 | Homepage HTML dedup | **Keep gated.** Homepage LCP is pure render delay (2587ms, Load Delay 0ms) — worth investigating only after Phase 3. |

Target after Phase 3 on `/solutions/*`: TTFB 615ms + minimal load delay + ~150ms load + ~900ms render ≈ **1.7–2.0s LCP**, from 4.7s.
