# Lighthouse after — https://www.yonovo.com

Mobile preset, simulated throttling, **median of 3 runs per URL**. Lighthouse 12.6.1.

| Page | Perf | FCP | LCP | TBT | CLS | SI | TTI | JS |
|---|---|---|---|---|---|---|---|---|
| `/` | 95 | 1.2s | **2.9s** | 14ms | 0.000 | 1.2s | 4.7s | 387 KiB |
| `/book-demo` | 100 | 0.9s | **1.2s** | 12ms | 0.002 | 1.7s | 4.7s | 1743 KiB |
| `/solutions/sage` | 99 | 0.9s | **2.1s** | 19ms | 0.000 | 0.9s | 4.0s | 394 KiB |
| `/solutions/quickbooks` | 96 | 0.9s | **2.7s** | 18ms | 0.000 | 0.9s | 4.4s | 394 KiB |
| `/pricing` | 99 | 1.0s | **2.0s** | 25ms | 0.000 | 1.0s | 4.1s | 386 KiB |
| `/blog/best-ar-automation-software` | 99 | 1.1s | **2.1s** | 23ms | 0.000 | 1.1s | 4.4s | 407 KiB |

## Diagnostics

### `/`

- **LCP element:** Automate your
accounts receivable.
Get paid faster. — div.relative > div.relative > div.flex > h1.font-medium
- **LCP phases:** TTFB 614ms | Load Delay 0ms | Load Time 0ms | Render Delay 2306ms
- **Render-blocking:** 
  - https://www.yonovo.com/_next/static/chunks/58553af87ad12552.css?dpl=dpl_B7DKWZE1Nsb4ktFdHH8bDaQsafqS (17 KiB, 307ms)
- **Opportunities:** 
  - Reduce unused JavaScript: 150ms, 99 KiB
  - Serve images in next-gen formats: 150ms, 47 KiB
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
- **LCP phases:** TTFB 616ms | Load Delay 0ms | Load Time 0ms | Render Delay 602ms
- **Render-blocking:** 
  - https://www.yonovo.com/_next/static/chunks/58553af87ad12552.css?dpl=dpl_B7DKWZE1Nsb4ktFdHH8bDaQsafqS (17 KiB, 150ms)
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
  - pro.ip-api.com (0 KiB)
  - www.google.ca (0 KiB)

### `/solutions/sage`

- **LCP element:** div.flex > div.flex > div.group > video.absolute — div.flex > div.flex > div.group > video.absolute
- **LCP phases:** TTFB 615ms | Load Delay 579ms | Load Time 458ms | Render Delay 484ms
- **Render-blocking:** none
- **Opportunities:** 
  - Reduce unused JavaScript: 150ms, 97 KiB
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
- **LCP phases:** TTFB 615ms | Load Delay 0ms | Load Time 0ms | Render Delay 2100ms
- **Render-blocking:** none
- **Opportunities:** 
  - Reduce unused JavaScript: 150ms, 96 KiB
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
- **LCP phases:** TTFB 613ms | Load Delay 0ms | Load Time 0ms | Render Delay 1359ms
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
- **LCP phases:** TTFB 613ms | Load Delay 690ms | Load Time 352ms | Render Delay 486ms
- **Render-blocking:** 
  - https://www.yonovo.com/_next/static/chunks/58553af87ad12552.css?dpl=dpl_B7DKWZE1Nsb4ktFdHH8bDaQsafqS (17 KiB, 150ms)
- **Opportunities:** 
  - Reduce unused JavaScript: 150ms, 98 KiB
  - Avoid serving legacy JavaScript to modern browsers: 90ms, 14 KiB
- **Third-party hosts:** 
  - www.googletagmanager.com (187 KiB)
  - ddwl4m2hdecbv.cloudfront.net (10 KiB)
  - analytics.ahrefs.com (3 KiB)
  - r2.leadsy.ai (1 KiB)
  - analytics.google.com (1 KiB)
  - stats.g.doubleclick.net (1 KiB)
  - www.google.ca (0 KiB)
