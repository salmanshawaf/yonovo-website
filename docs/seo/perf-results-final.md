# Site speed work — final results

**Shipped:** 2026-08-20/21 to `main` · **Harness:** `npm run perf:baseline` (Lighthouse 12.6.1, mobile, simulated throttling, median of 3 runs unless noted) · **Target:** production `https://www.yonovo.com`

---

## Mobile, before and after

| Page | Perf | LCP | CLS |
|---|---|---|---|
| `/` | 93 → **94** | 3.2s → 3.0s | 0.000 |
| `/book-demo` | 100 → **100** | 1.5s → 1.7s | 0.002 |
| `/solutions/sage` | 83 → **95** | **4.7s → 2.9s** | 0.000 |
| `/solutions/quickbooks` | 86 → **94** | **4.2s → 2.9s** | 0.000 |
| `/pricing` | 99 → **99** | 2.0s → 2.1s | 0.000 |
| `/blog/best-ar-automation-software` | 99 → **96** | 2.3s → 2.7s | 0.000 |

`/solutions/quickbooks` is a median of 5, not 3 — see the noise note below.

**The two pages that were failing now pass.** The other four were already passing and are flat within measurement noise. CLS is unchanged everywhere.

## Desktop (homepage)

| | Before | After |
|---|---|---|
| Third-party transfer | 1873 KiB | **203 KiB** |
| Performance | 76 | **100** |

---

## On measurement noise

Run-to-run variance on this site is large enough to invent findings that are not there. Measured directly on `/solutions/quickbooks`, five consecutive runs of the same URL against the same deploy:

```
2883ms  2877ms  5510ms  3108ms  2873ms
```

One run was nearly double the others. A median of 3 that catches the outlier reports 5.1s and a score of 81; a median of 5 reports 2.9s and 94. **Treat any single-page delta under roughly 0.5s as noise unless it reproduces.** The brief's median-of-3 rule is a floor, not a guarantee.

---

## What actually worked

1. **Raw `<img>` → `next/image` (the big one).** React 19 emits `<link rel="preload" as="image">` for every raw `<img>` rendered during SSR, regardless of viewport position. That preloaded 647 KB of below-the-fold screenshots ahead of the 25 KB hero video poster that is the LCP element on `/solutions/*` — a 25 KB file was taking 1756ms to load. Also verified: `loading="lazy"` does **not** suppress the preload; `next/image` was the only fix.
2. **`sizes` on all 9 `fill` images**, which previously defaulted to `100vw`.
3. **Hero video poster preloaded** with `fetchPriority="high"` via an opt-in `priority` prop on `VideoPlayer`.
4. **YouTube preview deferred** to an IntersectionObserver. It was pulling ~1.6 MB (player + video stream) into every desktop load with no interaction. The designed auto-play preview is preserved, just no longer eager.
5. **Blog heroes re-encoded** to WebP: 29.5 MB → 2.1 MB. `public/` 40 MB → 9.4 MB.

## What did not work, and was reverted

**Moving the tracking tags to `next/script` with `strategy="afterInteractive"` made the site slower.** Two independent median-of-3 production runs agreed:

| | Before | After |
|---|---|---|
| FCP, every page | ~0.9–1.2s | ~1.7s |
| LCP render delay, `/pricing` | 1359ms | 1964ms |
| LCP render delay, `/solutions/sage` | 484ms | 942ms |

TTFB and load times were unchanged, so this was main thread, not network: `afterInteractive` injects the tags during hydration, putting gtag.js's 187 KiB of parse/execute in the way of first paint. As `<script async>` in `<head>`, the browser fetches early and schedules execution itself.

This confirms the brief's hypothesis 4 — gtag's cost is parse/execute rather than network — and the change concentrated that cost at the worst moment. Phase 0 had already measured that the inline tags never appear in the render-blocking audit, so the premise for the change was weak before it was made.

Reverted. FCP returned to 0.9–1.2s. The `preconnect`/`dns-prefetch` hints were kept (network-side, unrelated).

---

## Constraints

- **CLS 0.000** on five of six pages, 0.0018 on `/book-demo`. Unchanged throughout.
- **No tag removed, disabled or consolidated.** GA4, Ahrefs, Instantly and RB2B verified firing at runtime, not merely present in markup: `gtag` a function with `dataLayer` populated, `window.reb2b` initialised with its CloudFront script injected, plus GA4's downstream pings to `analytics.google.com`, `stats.g.doubleclick.net` and `www.google.ca`.
- **Cal.com untouched.** `BookDemoPage.tsx` and the whole `book-demo/` route are byte-identical across this work.
- **No visual change.** Step-gallery geometry measured identical before and after (277×158, 249×50, 277×195, 277×99). The YouTube preview still behaves as designed, verified in a real browser.
- **TTFB unchanged** at ~615ms.

---

## Still open

- **`/solutions/quickbooks` and `/` are render-delay bound**, not network bound. Further gains need hydration work, not image or script work.
- **`app.cal.com` transfers 1806 KiB on `/book-demo`.** That page scores 100, so it costs nothing in lab terms, but it is real mobile data on the conversion page.
- **No conversion tracking exists on demo bookings.** Only a `linkReady` UI flag. Nothing measures the primary conversion.
- **Homepage dual mobile/desktop markup** (`TestimonialsSection` renders testimonials three times). Untouched — Phase 4, needs approval.
- **Three orphaned blog WebPs** from posts 301'd to comparison pages. ~70 KB each; left in place so historical shares do not 404.
- **`/solutions/sage`, `/xero`, `/netsuite`, `/odoo` all ship the QuickBooks hero video** (`/videos/quickbooks-sync.mp4`). Consistent enough to look deliberate, but worth a branding look.
