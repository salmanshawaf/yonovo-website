# Lighthouse phase3 — https://www.yonovo.com

Mobile preset, simulated throttling, **median of 3 runs per URL**. Lighthouse 12.6.1.

| Page | Perf | FCP | LCP | TBT | CLS | SI | TTI | JS |
|---|---|---|---|---|---|---|---|---|
| `/` | 94 | 1.2s | **3.0s** | 15ms | 0.000 | 1.2s | 4.8s | 387 KiB |
| `/book-demo` | 100 | 0.9s | **1.7s** | 9ms | 0.002 | 1.7s | 5.2s | 1746 KiB |
| `/solutions/sage` | 95 | 1.0s | **2.9s** | 12ms | 0.000 | 1.0s | 4.1s | 394 KiB |
| `/solutions/quickbooks` | 81 | 1.0s | **5.1s** | 21ms | 0.000 | 2.5s | 5.1s | 394 KiB |
| `/pricing` | 99 | 1.0s | **2.1s** | 15ms | 0.000 | 1.0s | 4.0s | 387 KiB |
| `/blog/best-ar-automation-software` | 96 | 1.1s | **2.7s** | 14ms | 0.000 | 1.1s | 4.2s | 408 KiB |

## Diagnostics

### `/`

- **LCP element:** Automate your
accounts receivable.
Get paid faster. — div.relative > div.relative > div.flex > h1.font-medium
- **LCP phases:** TTFB 617ms | Load Delay 0ms | Load Time 0ms | Render Delay 2400ms
- **Render-blocking:** 
  - https://www.yonovo.com/_next/static/chunks/58553af87ad12552.css?dpl=dpl_DPjC1hPJvvdKiyCMs4x59HuFhuUV (17 KiB, 300ms)
- **Opportunities:** 
  - Reduce unused JavaScript: 150ms, 98 KiB
  - Serve images in next-gen formats: 150ms, 21 KiB
  - Avoid serving legacy JavaScript to modern browsers: 150ms, 14 KiB
- **Third-party hosts:** 
  - www.googletagmanager.com (187 KiB)
  - ddwl4m2hdecbv.cloudfront.net (10 KiB)
  - analytics.ahrefs.com (3 KiB)
  - r2.leadsy.ai (1 KiB)
  - stats.g.doubleclick.net (1 KiB)
  - analytics.google.com (1 KiB)
  - www.google.ca (0 KiB)
  -  (0 KiB)

### `/book-demo`

- **LCP element:** Book a discovery call with our team. We will walk you through how Yonovo automa… — div.mx-auto > div.grid > div.flex > p.text-base
- **LCP phases:** TTFB 616ms | Load Delay 0ms | Load Time 0ms | Render Delay 1129ms
- **Render-blocking:** 
  - https://www.yonovo.com/_next/static/chunks/58553af87ad12552.css?dpl=dpl_DPjC1hPJvvdKiyCMs4x59HuFhuUV (17 KiB, 150ms)
- **Opportunities:** none over 50ms
- **Third-party hosts:** 
  - app.cal.com (1811 KiB)
  - www.googletagmanager.com (187 KiB)
  - ddwl4m2hdecbv.cloudfront.net (10 KiB)
  - cal.com (5 KiB)
  - analytics.ahrefs.com (3 KiB)
  - r2.leadsy.ai (1 KiB)
  - stats.g.doubleclick.net (1 KiB)
  - analytics.google.com (1 KiB)
  - pro.ip-api.com (0 KiB)
  - www.google.ca (0 KiB)

### `/solutions/sage`

- **LCP element:** div.flex > div.flex > div.group > video.absolute — div.flex > div.flex > div.group > video.absolute
- **LCP phases:** TTFB 613ms | Load Delay 1250ms | Load Time 691ms | Render Delay 310ms
- **Render-blocking:** none
- **Opportunities:** 
  - Reduce unused JavaScript: 150ms, 98 KiB
- **Third-party hosts:** 
  - www.googletagmanager.com (187 KiB)
  - ddwl4m2hdecbv.cloudfront.net (10 KiB)
  - analytics.ahrefs.com (3 KiB)
  - r2.leadsy.ai (1 KiB)
  - analytics.google.com (1 KiB)
  - stats.g.doubleclick.net (1 KiB)
  - www.google.ca (0 KiB)

### `/solutions/quickbooks`

- **LCP element:** div.flex > div.flex > div.group > video.absolute — div.flex > div.flex > div.group > video.absolute
- **LCP phases:** TTFB 615ms | Load Delay 375ms | Load Time 112ms | Render Delay 4014ms
- **Render-blocking:** none
- **Opportunities:** 
  - Reduce unused JavaScript: 640ms, 97 KiB
  - Preconnect to required origins: 250ms
- **Third-party hosts:** 
  - www.googletagmanager.com (187 KiB)
  - ddwl4m2hdecbv.cloudfront.net (10 KiB)
  - analytics.ahrefs.com (3 KiB)
  - r2.leadsy.ai (1 KiB)
  - stats.g.doubleclick.net (1 KiB)
  - analytics.google.com (1 KiB)
  - pro.ip-api.com (0 KiB)
  - www.google.ca (0 KiB)

### `/pricing`

- **LCP element:** Pricing adapted to your needs. — section.w-full > div.mx-auto > div.flex > h1.max-w-[850px]
- **LCP phases:** TTFB 615ms | Load Delay 0ms | Load Time 0ms | Render Delay 1500ms
- **Render-blocking:** none
- **Opportunities:** none over 50ms
- **Third-party hosts:** 
  - www.googletagmanager.com (187 KiB)
  - ddwl4m2hdecbv.cloudfront.net (10 KiB)
  - analytics.ahrefs.com (3 KiB)
  - r2.leadsy.ai (1 KiB)
  - stats.g.doubleclick.net (1 KiB)
  - analytics.google.com (1 KiB)
  - www.google.ca (0 KiB)

### `/blog/best-ar-automation-software`

- **LCP element:** Two laptops facing each other with gear and lightning bolt between them illustr… — main.min-h-screen > div.mx-auto > div.relative > img.object-cover
- **LCP phases:** TTFB 615ms | Load Delay 784ms | Load Time 650ms | Render Delay 665ms
- **Render-blocking:** 
  - https://www.yonovo.com/_next/static/chunks/58553af87ad12552.css?dpl=dpl_DPjC1hPJvvdKiyCMs4x59HuFhuUV (17 KiB, 150ms)
- **Opportunities:** 
  - Reduce unused JavaScript: 150ms, 99 KiB
  - Avoid serving legacy JavaScript to modern browsers: 150ms, 14 KiB
- **Third-party hosts:** 
  - www.googletagmanager.com (187 KiB)
  - ddwl4m2hdecbv.cloudfront.net (10 KiB)
  - analytics.ahrefs.com (3 KiB)
  - r2.leadsy.ai (1 KiB)
  - stats.g.doubleclick.net (1 KiB)
  - analytics.google.com (1 KiB)
  - www.google.ca (0 KiB)
