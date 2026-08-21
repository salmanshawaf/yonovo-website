# Lighthouse phase2-recheck — https://www.yonovo.com

Mobile preset, simulated throttling, **median of 3 runs per URL**. Lighthouse 12.6.1.

| Page | Perf | FCP | LCP | TBT | CLS | SI | TTI | JS |
|---|---|---|---|---|---|---|---|---|
| `/` | 94 | 1.8s | **2.9s** | 28ms | 0.000 | 1.8s | 4.0s | 388 KiB |
| `/book-demo` | 98 | 1.5s | **2.3s** | 12ms | 0.002 | 2.0s | 5.1s | 1748 KiB |
| `/solutions/sage` | 95 | 1.7s | **2.8s** | 17ms | 0.000 | 1.7s | 4.0s | 395 KiB |
| `/solutions/quickbooks` | 96 | 1.7s | **2.6s** | 19ms | 0.000 | 1.7s | 3.9s | 395 KiB |
| `/pricing` | 96 | 1.7s | **2.6s** | 15ms | 0.000 | 1.7s | 3.9s | 388 KiB |
| `/blog/best-ar-automation-software` | 96 | 1.7s | **2.6s** | 11ms | 0.000 | 1.7s | 3.9s | 409 KiB |

## Diagnostics

### `/`

- **LCP element:** Automate your
accounts receivable.
Get paid faster. — div.relative > div.relative > div.flex > h1.font-medium
- **LCP phases:** TTFB 617ms | Load Delay 0ms | Load Time 0ms | Render Delay 2250ms
- **Render-blocking:** 
  - https://www.yonovo.com/_next/static/chunks/58553af87ad12552.css?dpl=dpl_2ENvKYQXEUFPnVX7NpsbAGQuKjKb (17 KiB, 300ms)
- **Opportunities:** 
  - Reduce unused JavaScript: 150ms, 99 KiB
  - Serve images in next-gen formats: 150ms, 21 KiB
  - Efficiently encode images: 150ms, 5 KiB
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
- **LCP phases:** TTFB 616ms | Load Delay 0ms | Load Time 0ms | Render Delay 1669ms
- **Render-blocking:** 
  - https://www.yonovo.com/_next/static/chunks/58553af87ad12552.css?dpl=dpl_2ENvKYQXEUFPnVX7NpsbAGQuKjKb (17 KiB, 303ms)
- **Opportunities:** 
  - Reduce unused JavaScript: 150ms, 97 KiB
- **Third-party hosts:** 
  - app.cal.com (1811 KiB)
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
- **LCP phases:** TTFB 621ms | Load Delay 755ms | Load Time 482ms | Render Delay 942ms
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

### `/solutions/quickbooks`

- **LCP element:** div.flex > div.flex > div.group > video.absolute — div.flex > div.flex > div.group > video.absolute
- **LCP phases:** TTFB 617ms | Load Delay 990ms | Load Time 242ms | Render Delay 717ms
- **Render-blocking:** none
- **Opportunities:** 
  - Reduce unused JavaScript: 150ms, 98 KiB
  - Serve images in next-gen formats: 150ms, 10 KiB
  - Avoid serving legacy JavaScript to modern browsers: 150ms, 14 KiB
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
- **LCP phases:** TTFB 617ms | Load Delay 0ms | Load Time 0ms | Render Delay 1964ms
- **Render-blocking:** none
- **Opportunities:** 
  - Reduce unused JavaScript: 150ms, 98 KiB
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
- **LCP phases:** TTFB 616ms | Load Delay 858ms | Load Time 587ms | Render Delay 505ms
- **Render-blocking:** 
  - https://www.yonovo.com/_next/static/chunks/58553af87ad12552.css?dpl=dpl_2ENvKYQXEUFPnVX7NpsbAGQuKjKb (17 KiB, 300ms)
- **Opportunities:** 
  - Reduce unused JavaScript: 150ms, 100 KiB
  - Avoid serving legacy JavaScript to modern browsers: 150ms, 14 KiB
- **Third-party hosts:** 
  - www.googletagmanager.com (187 KiB)
  - ddwl4m2hdecbv.cloudfront.net (10 KiB)
  - analytics.ahrefs.com (3 KiB)
  - r2.leadsy.ai (1 KiB)
  - stats.g.doubleclick.net (1 KiB)
  - analytics.google.com (1 KiB)
  - www.google.ca (0 KiB)
