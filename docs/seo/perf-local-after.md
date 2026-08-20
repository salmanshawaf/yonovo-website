# Lighthouse local-after — http://localhost:3000

Mobile preset, simulated throttling, **median of 3 runs per URL**. Lighthouse 12.6.1.

| Page | Perf | FCP | LCP | TBT | CLS | SI | TTI | JS |
|---|---|---|---|---|---|---|---|---|
| `/` | 93 | 1.2s | **3.2s** | 18ms | 0.000 | 1.2s | 5.3s | 378 KiB |
| `/book-demo` | 97 | 1.1s | **2.6s** | 21ms | 0.002 | 1.8s | 5.8s | 1734 KiB |
| `/solutions/sage` | 95 | 1.2s | **2.9s** | 18ms | 0.000 | 1.2s | 4.9s | 385 KiB |
| `/solutions/quickbooks` | 95 | 1.2s | **2.9s** | 17ms | 0.000 | 1.2s | 5.0s | 385 KiB |
| `/pricing` | 95 | 1.2s | **2.8s** | 16ms | 0.000 | 1.2s | 4.8s | 378 KiB |
| `/blog/best-ar-automation-software` | 98 | 1.2s | **2.3s** | 18ms | 0.000 | 1.2s | 5.3s | 399 KiB |

## Diagnostics

### `/`

- **LCP element:** Automate your
accounts receivable.
Get paid faster. — div.relative > div.relative > div.flex > h1.font-medium
- **LCP phases:** TTFB 453ms | Load Delay 0ms | Load Time 0ms | Render Delay 2699ms
- **Render-blocking:** 
  - http://localhost:3000/_next/static/chunks/58553af87ad12552.css (17 KiB, 453ms)
  - http://localhost:3000/_next/static/chunks/d41ba60faff93bff.css (1 KiB, 153ms)
- **Opportunities:** 
  - Reduce unused JavaScript: 360ms, 99 KiB
  - Serve images in next-gen formats: 150ms, 47 KiB
  - Avoid serving legacy JavaScript to modern browsers: 150ms, 13 KiB
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
- **LCP phases:** TTFB 453ms | Load Delay 0ms | Load Time 0ms | Render Delay 2167ms
- **Render-blocking:** 
  - http://localhost:3000/_next/static/chunks/58553af87ad12552.css (17 KiB, 453ms)
  - http://localhost:3000/_next/static/chunks/d41ba60faff93bff.css (1 KiB, 153ms)
- **Opportunities:** 
  - Reduce unused JavaScript: 300ms, 97 KiB
  - Avoid serving legacy JavaScript to modern browsers: 150ms, 13 KiB
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

### `/solutions/sage`

- **LCP element:** div.flex > div.flex > div.group > video.absolute — div.flex > div.flex > div.group > video.absolute
- **LCP phases:** TTFB 453ms | Load Delay 1087ms | Load Time 68ms | Render Delay 1308ms
- **Render-blocking:** 
  - http://localhost:3000/_next/static/chunks/58553af87ad12552.css (17 KiB, 453ms)
  - http://localhost:3000/_next/static/chunks/d41ba60faff93bff.css (1 KiB, 153ms)
- **Opportunities:** 
  - Reduce unused JavaScript: 210ms, 98 KiB
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
- **LCP phases:** TTFB 454ms | Load Delay 1160ms | Load Time 303ms | Render Delay 1002ms
- **Render-blocking:** 
  - http://localhost:3000/_next/static/chunks/58553af87ad12552.css (17 KiB, 454ms)
  - http://localhost:3000/_next/static/chunks/d41ba60faff93bff.css (1 KiB, 154ms)
- **Opportunities:** 
  - Reduce unused JavaScript: 210ms, 98 KiB
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
- **LCP phases:** TTFB 453ms | Load Delay 0ms | Load Time 0ms | Render Delay 2387ms
- **Render-blocking:** 
  - http://localhost:3000/_next/static/chunks/58553af87ad12552.css (17 KiB, 453ms)
  - http://localhost:3000/_next/static/chunks/d41ba60faff93bff.css (1 KiB, 153ms)
- **Opportunities:** 
  - Reduce unused JavaScript: 300ms, 99 KiB
  - Avoid serving legacy JavaScript to modern browsers: 150ms, 13 KiB
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
- **LCP phases:** TTFB 452ms | Load Delay 798ms | Load Time 71ms | Render Delay 1008ms
- **Render-blocking:** 
  - http://localhost:3000/_next/static/chunks/58553af87ad12552.css (17 KiB, 452ms)
  - http://localhost:3000/_next/static/chunks/d41ba60faff93bff.css (1 KiB, 152ms)
- **Opportunities:** none over 50ms
- **Third-party hosts:** 
  - www.googletagmanager.com (187 KiB)
  - ddwl4m2hdecbv.cloudfront.net (10 KiB)
  - analytics.ahrefs.com (3 KiB)
  - r2.leadsy.ai (1 KiB)
  - stats.g.doubleclick.net (1 KiB)
  - analytics.google.com (1 KiB)
  - www.google.ca (0 KiB)
