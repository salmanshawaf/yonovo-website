# Image loading fix — results

**Shipped:** 2026-08-20, merge `6f06bc7` to `main` · **Harness:** `npm run perf:baseline` (Lighthouse 12.6.1, mobile, simulated throttling, **median of 3 runs per URL**) · **Target:** production `https://www.yonovo.com`

Before = [`perf-baseline.md`](perf-baseline.md) (pre-merge production). After = [`perf-after.md`](perf-after.md) (post-merge production). Same harness, same URLs, same machine.

---

## Results

| Page | Perf | LCP | TBT | CLS |
|---|---|---|---|---|
| `/` | 93 → **95** | 3.2s → **2.9s** | 14 → 14ms | 0.000 → 0.000 |
| `/book-demo` | 100 → **100** | 1.5s → **1.2s** | 18 → 12ms | 0.002 → 0.002 |
| `/solutions/sage` | 83 → **99** | **4.7s → 2.1s** | 16 → 19ms | 0.000 → 0.000 |
| `/solutions/quickbooks` | 86 → **96** | **4.2s → 2.7s** | 12 → 18ms | 0.000 → 0.000 |
| `/pricing` | 99 → **99** | 2.0s → 2.0s | 12 → 25ms | 0.000 → 0.000 |
| `/blog/best-ar-automation-software` | 99 → **99** | 2.3s → **2.1s** | 16 → 23ms | 0.000 → 0.000 |

**Both pages that were failing now pass.** `/solutions/sage` went from the worst page measured to a 99. `/solutions/quickbooks` is at 2.7s — improved but still 0.2s above the 2.5s threshold.

The brief's bar (LCP < 2.5s on `/book-demo` and at least one `/solutions/*` page) is met: `/book-demo` 1.2s, `/solutions/sage` 2.1s.

### LCP phase breakdown — where the time actually went

| Phase | `/solutions/sage` before | after |
|---|---|---|
| TTFB | 615ms | 615ms |
| Load Delay | 1366ms | **579ms** |
| Load Time | 1756ms | **458ms** |
| Render Delay | 937ms | **484ms** |

`/solutions/quickbooks` collapsed further — Load Delay and Load Time both to **0ms** — leaving 2100ms of pure render delay. That page is now main-thread bound, not network bound, so no further image work will help it.

---

## What was wrong

React 19 emits `<link rel="preload" as="image">` for **every raw `<img>` it renders during SSR**, regardless of viewport position. `next/image` does not — it emits `loading="lazy"`.

The codebase had 28 raw `<img>` tags. On `/solutions/sage` that preloaded **647 KB of below-the-fold step screenshots at high priority**, queued ahead of the 25 KB hero video poster that is the actual LCP element. A 25 KB file was taking 1756ms to load.

**Verified along the way:** adding `loading="lazy"` to a raw `<img>` does *not* suppress the preload. `next/image` was the only fix available.

## What changed

- **28 raw `<img>` → `next/image`** across the 7 `/solutions/*` pages, `DebtCollectionSoftwarePage`, `HeroCards`, `AdvantagesSection`, `FeaturesSection` and `Footer`, via static imports with `sizes` matching the real slot. SVG logos deliberately stay on raw `<img>` (next/image cannot optimize them; ~1 KB each).
- **`sizes` added to all 9 `next/image` `fill` usages**, which previously defaulted to `100vw` and made card grids fetch full-viewport candidates.
- **Hero video poster now preloaded** with `fetchPriority="high"` via a new opt-in `priority` prop on `VideoPlayer`. `<video preload="none">` in a client component otherwise delays poster discovery until after hydration.

Image preloads: `/solutions/*` 6 (647 KB) → **0 raw**; `/` 15 (188 KB) → **0 raw first-party**.
`sage-step-1-invoice` on mobile: 196 KB PNG → **11 KB WebP**.

---

## Constraints checked

- **CLS is 0.0000 on five of six pages, 0.0018 on `/book-demo`** — unchanged from baseline on every page.
- **No tracking touched.** `src/app/layout.tsx`, `BookDemoPage.tsx` and the whole `book-demo/` route are byte-identical across this merge. GA4 gtag + config, Ahrefs, the Instantly pixel and the RB2B loader (key `W6Z57HZ481OX`) all confirmed present in served production HTML.
- **No visual change.** Rendered geometry measured identical before and after (277×158, 249×50, 277×195, 277×99); hero screenshot matches.
- **TTFB unchanged** at 615ms.
- **Total JS bytes unchanged** — this work touched images only.

---

## Not fixed / still open

- **`/solutions/quickbooks` at 2.7s.** Now pure render delay (2100ms). Needs hydration work, not image work.
- **The homepage still preloads the YouTube poster from `i.ytimg.com` cross-origin**, with no `preconnect` for it or any of the other five third-party origins. Belongs with the YouTube facade work.
- **43 blog hero PNGs, 29.5 MB.** These already go through `next/image`, so re-encoding the sources will not change delivered bytes — the wins are repo size, the RSS enclosure (which serves raw files), and the Ahrefs crawl error.
- **`public/images/hero video.mov`, 3.67 MB, unreferenced.**
- **Oversized sources** still in the repo, e.g. `qb-step-1-invoice.png` at 3064px / 289 KB.
- **`app.cal.com` transfers 1806 KiB on `/book-demo`.** Does not hurt lab metrics (that page scores 100) but is real mobile data on the conversion page.
- **No conversion tracking exists on demo bookings.** Unrelated to this work, still true, still worth fixing.
