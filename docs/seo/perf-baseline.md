# Lighthouse baseline — https://www.yonovo.com

Mobile preset, simulated throttling, **median of 3 runs per URL**. Lighthouse 12.6.1.

| Page | Perf | FCP | LCP | TBT | CLS | SI | TTI | JS |
|---|---|---|---|---|---|---|---|---|
| `/` | 93 | 1.2s | **3.2s** | 14ms | 0.000 | 1.2s | 5.5s | 387 KiB |
| `/book-demo` | 100 | 0.9s | **1.5s** | 18ms | 0.002 | 1.9s | 5.1s | 1743 KiB |
| `/solutions/sage` | 83 | 1.0s | **4.7s** | 16ms | 0.000 | 1.0s | 6.6s | 394 KiB |
| `/solutions/quickbooks` | 86 | 1.0s | **4.2s** | 12ms | 0.000 | 1.0s | 6.7s | 394 KiB |
| `/pricing` | 99 | 0.9s | **2.0s** | 13ms | 0.000 | 0.9s | 4.4s | 387 KiB |
| `/blog/best-ar-automation-software` | 99 | 1.1s | **2.3s** | 16ms | 0.000 | 1.1s | 4.5s | 407 KiB |

## Diagnostics

### `/`

- **LCP element:** Automate your
accounts receivable.
Get paid faster. — div.relative > div.relative > div.flex > h1.font-medium
- **LCP phases:** TTFB 614ms | Load Delay 0ms | Load Time 0ms | Render Delay 2587ms
- **Render-blocking:** 
  - https://www.yonovo.com/_next/static/chunks/58553af87ad12552.css?dpl=dpl_42ZiSLT4T8uYDDxnTMcaFj4de3F7 (17 KiB, 304ms)
- **Opportunities:** none over 50ms
- **Third-party hosts:** 
  - www.googletagmanager.com (187 KiB)
  - i.ytimg.com (44 KiB)
  - ddwl4m2hdecbv.cloudfront.net (10 KiB)
  - analytics.ahrefs.com (3 KiB)
  - r2.leadsy.ai (1 KiB)
  - stats.g.doubleclick.net (1 KiB)
  - analytics.google.com (1 KiB)
  - www.google.ca (0 KiB)
  -  (0 KiB)

### `/book-demo`

- **LCP element:** Book a discovery call with our team. We will walk you through how Yonovo automa… — div.mx-auto > div.grid > div.flex > p.text-base
- **LCP phases:** TTFB 618ms | Load Delay 0ms | Load Time 0ms | Render Delay 900ms
- **Render-blocking:** 
  - https://www.yonovo.com/_next/static/chunks/58553af87ad12552.css?dpl=dpl_42ZiSLT4T8uYDDxnTMcaFj4de3F7 (17 KiB, 150ms)
- **Opportunities:** none over 50ms
- **Third-party hosts:** 
  - app.cal.com (1806 KiB)
  - www.googletagmanager.com (187 KiB)
  - ddwl4m2hdecbv.cloudfront.net (10 KiB)
  - cal.com (5 KiB)
  - analytics.ahrefs.com (3 KiB)
  - r2.leadsy.ai (1 KiB)
  - stats.g.doubleclick.net (1 KiB)
  - analytics.google.com (1 KiB)
  - www.google.ca (0 KiB)
  - pro.ip-api.com (0 KiB)

### `/solutions/sage`

- **LCP element:** div.flex > div.flex > div.group > video.absolute — div.flex > div.flex > div.group > video.absolute
- **LCP phases:** TTFB 615ms | Load Delay 1366ms | Load Time 1756ms | Render Delay 937ms
- **Render-blocking:** none
- **Opportunities:** 
  - Reduce unused JavaScript: 150ms, 98 KiB
  - Serve images in next-gen formats: 150ms, 574 KiB
  - Avoid serving legacy JavaScript to modern browsers: 150ms, 14 KiB
- **Third-party hosts:** 
  - www.googletagmanager.com (187 KiB)
  - ddwl4m2hdecbv.cloudfront.net (10 KiB)
  - analytics.ahrefs.com (3 KiB)
  - r2.leadsy.ai (1 KiB)
  - stats.g.doubleclick.net (1 KiB)
  - analytics.google.com (1 KiB)
  - www.google.ca (0 KiB)

### `/solutions/quickbooks`

- **LCP element:** div.flex > div.flex > div.group > video.absolute — div.flex > div.flex > div.group > video.absolute
- **LCP phases:** TTFB 616ms | Load Delay 1376ms | Load Time 790ms | Render Delay 1434ms
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

### `/pricing`

- **LCP element:** Pricing adapted to your needs. — section.w-full > div.mx-auto > div.flex > h1.max-w-[850px]
- **LCP phases:** TTFB 618ms | Load Delay 0ms | Load Time 0ms | Render Delay 1425ms
- **Render-blocking:** none
- **Opportunities:** 
  - Reduce unused JavaScript: 150ms, 97 KiB
  - Avoid serving legacy JavaScript to modern browsers: 100ms, 14 KiB
- **Third-party hosts:** 
  - www.googletagmanager.com (187 KiB)
  - ddwl4m2hdecbv.cloudfront.net (10 KiB)
  - analytics.ahrefs.com (3 KiB)
  - r2.leadsy.ai (1 KiB)
  - analytics.google.com (1 KiB)
  - stats.g.doubleclick.net (1 KiB)
  - www.google.ca (0 KiB)

### `/blog/best-ar-automation-software`

- **LCP element:** Two laptops facing each other with gear and lightning bolt between them illustr… — main.min-h-screen > div.mx-auto > div.relative > img.object-cover
- **LCP phases:** TTFB 614ms | Load Delay 612ms | Load Time 426ms | Render Delay 616ms
- **Render-blocking:** 
  - https://www.yonovo.com/_next/static/chunks/58553af87ad12552.css?dpl=dpl_42ZiSLT4T8uYDDxnTMcaFj4de3F7 (17 KiB, 150ms)
- **Opportunities:** 
  - Reduce unused JavaScript: 150ms, 99 KiB
- **Third-party hosts:** 
  - www.googletagmanager.com (187 KiB)
  - ddwl4m2hdecbv.cloudfront.net (10 KiB)
  - analytics.ahrefs.com (3 KiB)
  - r2.leadsy.ai (1 KiB)
  - stats.g.doubleclick.net (1 KiB)
  - analytics.google.com (1 KiB)
  - www.google.ca (0 KiB)
