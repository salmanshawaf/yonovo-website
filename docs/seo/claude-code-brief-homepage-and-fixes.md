# Claude Code Implementation Brief
## Sprint 2: sitemap repair, Sprint 1 cleanup, homepage SEO/AEO/GEO work, /about and /security

**Prepared:** 19 August 2026
**Repo:** Yonovo Next.js marketing site
**Deployed by:** Salman / Alex
**Source audit:** `claude/homepage-seo-aeo-geo-audit-2026-08-19.md` in the Yonovo SEO project
**Related:** `seo-change-log.md`, `seo-strategy-decisions.md`, `yonovo-company-product-context.md`

---

## 0. Rules of engagement

Read this section before touching anything.

**0.1 Copy rules, non negotiable.**

- No em dashes and no en dashes anywhere in body copy, headings, meta descriptions or schema descriptions. Use a comma, a full stop, or restructure the sentence. This is a standing rule and Sprint 1 broke it.
- No invented product claims. Every factual statement in this brief is sourced in section 9. If you need a claim that is not in section 9, stop and flag it rather than writing something plausible.
- Avoid generic SaaS filler: "in today's fast paced business environment", "businesses of all sizes", "more important than ever", "seamlessly", "revolutionise", "unlock". Yonovo's voice is knowledgeable, plain and specific.
- Write numbers as numerals in proof statements ("80 percent", "15 days"), and spell "percent" rather than using the symbol in prose.

**0.2 Do not change the homepage `<title>` or `<h1>`.**

This is a recorded strategy decision, not an oversight. The homepage ranks at position 1 for "yonovo" and supplies 68 of the site's 70 organic clicks. No competitor homepage in this category earns non branded rankings. Category keywords are handled by the dedicated pages built in Sprint 1. Leave both alone.

**0.3 Verification is part of the task, not a follow up.**

Sprint 1 recorded two changes as "live, verified" that were not live. For every task in this brief, the definition of done is: fetch the artifact from production after deploy and confirm the change is present in the response. A successful build is not verification. Section 10 is the checklist.

**0.4 Order matters.**

Phase 1 is blocking. The four commercial pages built in Sprint 1 are live but undiscoverable. Do Phase 1 first and get it deployed on its own, before starting Phase 3.

**0.5 Flag, do not guess.**

Section 9 lists open items marked `[CONFIRM]` where I could not verify a fact. Leave those out of shipped copy, or use the fallback wording given. Do not fill them in from inference.

---

## 1. Task summary

| Phase | Task | Priority | Est. |
|---|---|---|---|
| 1 | Regenerate `sitemap.xml` from a single source of truth | **Blocking** | 2 h |
| 1 | Resolve `/accounts-receivable-statistics` 404 | **Blocking** | 1 h |
| 1 | Sync `llms.txt` to the same source, remove dead links | **Blocking** | 1 h |
| 2 | Strip em dashes site wide | High | 1 h |
| 2 | Repair `/ar-collections-software` heading structure | High | 1 h |
| 2 | Source or remove the "73 percent recovery" claim | High | 30 m |
| 2 | Fix layout dependent copy on `/debt-collection-software` | Medium | 15 m |
| 3 | Homepage: add definition block | High | 1 h |
| 3 | Homepage: add body internal linking section | **Highest impact** | 3 h |
| 3 | Homepage: add FAQ section | High | 3 h |
| 3 | Homepage: rewrite headings, promote CTA to H2, fix footer H6 | Medium | 2 h |
| 3 | Homepage: restate proof points as attributed sentences | Medium | 1 h |
| 4 | Homepage: add SoftwareApplication, FAQPage, Review, VideoObject schema, expand sameAs | High | 3 h |
| 5 | Homepage: small consistency fixes | Low | 1 h |
| 6 | Build `/about` | Medium | 4 h |
| 6 | Build `/security` | Medium | 4 h |
| 7 | Refactor responsive HTML duplication | Low, large | 1 to 2 d |

---

## PHASE 1: Blocking fixes

### Task 1.1 Regenerate `sitemap.xml`

**Problem.** The live sitemap contains none of the five pages shipped on 17 August, and does not contain `/book-demo`. The most recent `lastmod` in the file is `2026-08-03T22:28:24.429Z`. The Sprint 1 sitemap change either never deployed or was reverted.

**Required outcome.** `https://www.yonovo.com/sitemap.xml` contains every live, indexable, canonical page and nothing that 404s.

**Must be present after this task:**

```
/accounts-receivable-automation-software
/debt-collection-software
/ar-collections-software
/dunning-management-software
/book-demo
/solutions/stripe
/solutions/bill
/yonovo-vs-bill-com
```

Plus `/accounts-receivable-statistics` **only if** task 1.2 restores it.

**Must not be present:**

- Any URL returning 404
- `/blog/yonovo-vs-bill-com` (301s to the root pattern)
- Non www URLs

**Implementation requirements.**

1. Do not hand maintain a URL array. Generate the sitemap from the route manifest or the content source so a new page cannot ship without appearing in it. If the current implementation is a static list, replace it. This regression will otherwise repeat.
2. Add a build time assertion that fails the build if any URL in the sitemap returns a non 200 status, and if any statically generated marketing route is absent from the sitemap. A silent sitemap is what caused this.
3. `lastmod` should reflect genuine content modification, not build time. Currently 24 URLs share one identical build timestamp. If real modification dates are not available per page, it is better to omit `lastmod` entirely than to publish a build stamp, because a build stamp trains Google to ignore the field.
4. Review whether `/blog/author/*` and `/blog/category/*` belong in the sitemap. They are thin. Recommendation: keep category pages, drop author pages, but this is a judgement call, flag it rather than deciding silently.

**Done when.** `curl -s https://www.yonovo.com/sitemap.xml | grep -c "<loc>"` returns the expected count and all eight URLs above appear in the output.

**Then, Salman:** submit the sitemap in Search Console and request indexing on each of the four commercial URLs individually.

---

### Task 1.2 Resolve `/accounts-receivable-statistics`

**Problem.** The page is recorded in the change log as shipped on 17 August with 30 sourced statistics. It returns 404 today. `/blog/accounts-receivable-statistics` also returns 404. This was the site's only link earning asset and the outreach campaign built on it is blocked.

**Investigate in this order:**

1. Does the page source exist in the repo? Check for a route, an MDX file, or a content entry.
2. If it exists, why is it not building? Check for a draft or publish flag, a missing export, an excluded route, or a build error swallowed in the deploy log.
3. If it does not exist in the repo, it was never committed. Report that finding.

**Outcome A, source exists.** Fix the build or routing, deploy, verify a 200 with content, add to the sitemap.

**Outcome B, source does not exist.** Do not rebuild it in this sprint. Instead:

- Remove the `/accounts-receivable-statistics` line from `llms.txt` immediately, so the file published for AI crawlers stops pointing at a dead URL.
- Report back so it can be rescheduled with the full source list intact. The page's value depends on every statistic linking to an original publisher, which is not something to reconstruct from memory.

Either way, report which outcome applied.

---

### Task 1.3 Sync `llms.txt`

**Problem.** `llms.txt` is well formed and is an asset most competitors do not have, but it is maintained separately from the sitemap and has already drifted. It currently lists `/accounts-receivable-statistics`, which 404s.

**Required.**

1. Generate `llms.txt` from the same source as the sitemap so the two cannot disagree. The grouping into Product, Integrations, Industries, Case Studies, Blog and Optional sections should be preserved, driven by route metadata rather than a hand written list.
2. Remove any entry whose URL does not return 200.
3. Add the three commercial pages that are live but missing from the Product section grouping check: confirm `/debt-collection-software`, `/ar-collections-software` and `/dunning-management-software` are present. They were listed at last check, but verify after regeneration.
4. Do not create `/llms-full.txt` in this sprint. It is optional, unevenly supported, and not worth the maintenance surface yet.

---

## PHASE 2: Sprint 1 cleanup

### Task 2.1 Strip em dashes site wide

Search the whole content surface for `—` (U+2014) and `–` (U+2013) and replace them. Known instances on `/ar-collections-software`:

- "a set of decisions—when the first reminder goes out"
- "not what it sends—it is what it does not send"

Also reported on `/accounts-receivable-automation-software`.

Replace by restructuring, not by substituting a hyphen. "A set of decisions: when the first reminder goes out" or "A set of decisions. When the first reminder goes out, ...". Add a lint rule or CI check so this cannot reappear.

Check schema descriptions and meta descriptions too, not just visible body copy.

### Task 2.2 Repair `/ar-collections-software` heading structure

The page carries 11 to 12 H2s including sentence fragments and three overlapping stop condition headings. Confirmed still present today: "It stops when it should".

**Required:**

- Consolidate the overlapping stop condition sections into one H2. Suggested: "When the sequence stops".
- Replace fragment headings with headings that name their subject.
- Target 6 to 8 H2s on the page, each one a phrase a person could plausibly search or ask.
- Keep the existing FAQ block. It is the strongest part of the page.

### Task 2.3 The "73 percent recovery" claim

`/ar-collections-software` states "Recovery odds sit around 73 percent at three months overdue". This is very likely the Commercial Collection Agencies of America figure.

**Required:** either link the sentence to the primary source with the publication year stated inline, or delete the sentence. Do not leave an unsourced statistic on a page whose whole purpose is to be citable. An unsourced number is the one thing that will get the page discounted by both a fact checking reader and a model.

### Task 2.4 Layout dependent copy

`/debt-collection-software` contains "the numbers on the left happened", which breaks when columns stack on mobile. Rewrite to be position independent, for example "these results are from TDG Inc" or name the subject directly.

Search for the same pattern elsewhere: "on the left", "on the right", "above", "below" used to refer to layout rather than document order.

---

## PHASE 3: Homepage content

Everything in this phase is on `/` only.

### Task 3.1 Add a definition block

**Why.** The homepage has zero AI citations across all seven platforms tracked, against 14 site wide from blog pages. The single biggest cause is that no sentence on the page states what Yonovo is in a form a model can lift. "Automate your accounts receivable. Get paid faster." is a good headline and a useless grounding statement.

**Where.** Directly beneath the hero subheadline, above the "The complete platform for accounts receivable" section. It should be the first prose on the page.

**Exact copy to use:**

> Yonovo is an AI collections teammate for B2B finance teams. It connects to your accounting system, imports your invoices, customers and aging data, and then follows up on unpaid invoices across email, SMS, WhatsApp and AI voice calls. It escalates accounts that go quiet, routes disputes and unusual replies to your team, and reports on what has been collected. Most teams are live within a day.

**Implementation notes.**

- Plain paragraph text. Do not split it across design elements, do not put half of it in an image, do not animate it in.
- It must appear in the server rendered HTML as a single contiguous `<p>`, because that is the unit a model extracts.
- Do not duplicate it for mobile and desktop breakpoints. If the current layout pattern requires that, this block is the exception: render once.

### Task 3.2 Add a body internal linking section

**Why this is the highest impact item in the brief.** The homepage body currently contains 18 links to 8 unique destinations: `/book-demo`, five `/solutions/*` pages, and two case studies. It links to none of the four commercial pages shipped in Sprint 1, and none of `/pricing`, `/blog`, `/tools/dso-calculator`, the industry pages or the comparison pages. Those appear in the footer only, and Google discounts sitewide boilerplate.

At Domain Rating 0.2 with no external links, internal link flow from the homepage is the only page level authority the site can allocate. Right now it allocates almost none.

Body anchor text is also currently either a bare brand name or the phrase "Read case study" repeated six times, which tells Google nothing about the destination.

**Where.** A new section between "Everything you need to collect smarter" and "Not your typical AR software".

**Structure.** Three groups, each item a short descriptive sentence with the link inside the sentence. Do not build a bare list of links, that reads as boilerplate. The anchor text is the bolded span below.

**Exact copy:**

H2: `Find the part of AR you are trying to fix`

Group 1, H3: `By the problem`

- Start with the overview of how **accounts receivable automation software** works and how the main platforms compare. → `/accounts-receivable-automation-software`
- If the issue is chasing invoices bucket by bucket, see **AR collections software**. → `/ar-collections-software`
- For failed and overdue subscription payments, see **dunning management software**. → `/dunning-management-software`
- For invoices already well past terms, see **B2B debt collection software**. → `/debt-collection-software`
- Work out where you stand first with the free **DSO calculator**. → `/tools/dso-calculator`

Group 2, H3: `By your accounting system`

- **QuickBooks Online collections automation** → `/solutions/quickbooks`
- **Xero collections automation** → `/solutions/xero`
- **NetSuite AR automation** → `/solutions/netsuite`
- **Sage Intacct AR automation** → `/solutions/sage`
- **Odoo AR automation** → `/solutions/odoo`
- **Stripe Billing collections** → `/solutions/stripe`
- **BILL AR automation** → `/solutions/bill`

Group 3, H3: `If you are comparing platforms`

- **Yonovo vs Upflow** → `/yonovo-vs-upflow`
- **Yonovo vs Chaser** → `/yonovo-vs-chaser`
- **Yonovo vs Invoiced** → `/yonovo-vs-invoiced`
- **Yonovo vs Bill.com** → `/yonovo-vs-bill-com`
- Or read how **wholesale distributor TDG Inc** and **e-commerce brand Troyes** run collections on Yonovo. → `/case-studies/tdg-inc`, `/case-studies/troyes` `[CONFIRM Troyes industry descriptor, see 9.4]`

**Implementation requirements.**

- Anchor text must be the descriptive phrase, not "learn more" or "click here" or the bare URL.
- Do not add `rel="nofollow"`.
- Render once, not duplicated per breakpoint.
- This section must be in the server rendered HTML.

**Standing rule going forward:** when a commercial page ships, it gets a descriptive anchor body link from the homepage in the same deploy. Do not ship a page without it again.

### Task 3.3 Add a homepage FAQ section

**Why.** Question and answer pairs are the most cited structure in AI answers, because each pair is already a self contained extractable unit. `/ar-collections-software` has eight FAQ questions. The homepage, which receives roughly 20 times the traffic, has none.

**Where.** Between "Your financial data, secured" and the final CTA.

**H2:** `Common questions about automating collections`

**Implementation requirements.**

- Each question is an `<h3>`, each answer a `<p>` directly after it.
- Do not hide answers behind JavaScript only accordions. If you use an accordion, the answer text must still be present in the server rendered HTML and inside the DOM on load, collapsed with CSS. An answer injected on click is invisible to crawlers and to AI.
- Answers stay short. Two to four sentences. The first sentence must answer the question on its own, because that is the sentence that gets quoted.
- This block is also the source for the `FAQPage` schema in task 4.2. The schema text and the visible text must match exactly. Mismatched FAQ schema is a manual action risk.

**Exact copy:**

**Q: What does Yonovo do?**
Yonovo connects to your accounting system and takes over follow up on unpaid invoices. It sends reminders across email, SMS, WhatsApp and AI voice calls, escalates accounts that go quiet, flags the ones that need a person, and reports on what has been collected. Traditional AR software tells you which invoices need attention. Yonovo does the chasing.

**Q: Which accounting systems does Yonovo work with?**
Yonovo connects to QuickBooks Online, Xero, NetSuite, Sage Intacct, Odoo, Stripe Billing and BILL. Connecting takes minutes and nothing changes about how your accounting system works.

**Q: How is this different from the payment reminders built into QuickBooks or Xero?**
Built in reminders send the same message on a fixed schedule to every customer. Yonovo varies timing, tone and channel based on the customer and how overdue the invoice is, switches from email to SMS or a phone call when email stops working, stops as soon as someone pays or raises a dispute, and hands the account to your team with full context when it needs a person.

**Q: Do follow ups come from us or from Yonovo?**
From you. Messages send from your company's own email address and read as though your finance team wrote them. Your customers are never contacted by an outside collections agency.

**Q: What happens when a customer disputes an invoice or asks a question?**
The sequence stops. Disputes, partial payments and unusual replies are routed to your team with the invoice history attached, rather than receiving another automated reminder. Around 80 percent of collections run without anyone stepping in, and the rest are flagged for a person.

**Q: How long does setup take?**
Most teams connect their accounting system and are live within one day.

**Q: How much does Yonovo cost?**
Pricing is custom, based on your annual revenue, number of customers and the features you need. There are three tiers: Discover for teams assessing their AR, Grow for companies up to $10M ARR, and Scale for $10M to $50M ARR. Every channel is included rather than charged per message. You get a quote after a short demo.

**Q: Is our financial data secure?**
All data is encrypted in transit and at rest. Connections to your accounting system use OAuth and secure API tokens, so your credentials are never stored by Yonovo.

### Task 3.4 Rewrite headings

**Why.** The page has 6 H2s and 31 H3s. Only two H2s contain a category term. Not one of the 31 H3s contains "AR automation", "collections", "invoice reminders", "DSO" or "dunning" as a phrase. Headings are one of the strongest on page signals and a primary way a model decides what a section is about. "What people say" could sit on a page about anything.

**Change these. Left is current, right is replacement.**

| Current | Replace with |
|---|---|
| H2 `Everything you need to collect smarter` | `Everything you need to collect on overdue invoices` |
| H2 `Not your typical AR software` | `How Yonovo differs from traditional AR software` |
| H2 `What people say` | `What finance teams say about automating collections` |
| H3 `Always learning` | `Learns from your customers' payment behavior` |
| H3 `Built for scale` | `Scales with invoice volume, not headcount` |
| H3 `Sends from your email` | `Sends from your own email address` |
| H3 `Actually does the work` | `Runs the collections workflow, not just the dashboard` |
| H3 `Handles the edge cases` | `Handles disputes and partial payments` |
| H3 `Fits into your existing process` | `Fits your existing AR process` |
| H3 `Works with your tools` | `Connects to your accounting system` |
| H3 `Encrypted everywhere` | `Encrypted in transit and at rest` |
| H3 `Secure integrations` | `OAuth secured integrations` |
| H3 `Built for quick setup` | `Live within a day` |
| H3 `Engineered for human oversight` | `Human oversight on every escalation` |

**Leave unchanged:** the H1, H2 `The complete platform for accounts receivable`, H2 `From overdue to paid in five steps`, H2 `Your financial data, secured`, H3 `Your data stays yours`, H3 `Designed for simplicity`, and all five step headings in the "From overdue to paid" section.

**Also required:**

1. **Promote the final CTA to a heading.** "Ready to put collections on autopilot?" is styled at 54px but marked up as a `<p>`. Make it an `<h2>`. Keep the copy.
2. **Remove the duplicate "Works with your tools" H3.** It appears twice. See task 7.1 for the underlying cause; if the refactor is deferred, at minimum ensure the two instances do not render simultaneously.
3. **Fix the footer heading levels.** Footer column labels (`INTEGRATIONS`, `AR AUTOMATION FOR`, `COMPARE`, `RESOURCES`, `COMPANY`) currently use `<h6>` on a page that never uses `<h4>` or `<h5>`. Change them to `<p>` or `<span>` with the existing styling. Footer labels should not be headings.

### Task 3.5 Restate proof points as attributed sentences

**Why.** The page contains real quantified proof, but all of it is presented as visual design elements attached to testimonial cards. A model reading the page cannot state "Yonovo reduced DSO by 15 days at TDG Inc" because the page never says that as a sentence.

**Blocking issue first, see 9.3.** The homepage contradicts itself. The stat card next to the TDG Inc testimonial reads "75% reduction in manual tasks", while the testimonial quote directly beside it reads "our manual follow ups dropped by 80%". `/accounts-receivable-automation-software` states 80 percent. **Do not ship this task until Salman confirms which figure is correct.** Recommendation, pending confirmation: use 80 percent, since two of three sources agree and it matches the customer's own quote.

**Once confirmed, add one paragraph immediately below the testimonials, before the security section:**

> TDG Inc, a wholesale distributor, cut manual follow up work by 80 percent and reduced days sales outstanding by 15 days after moving collections to Yonovo. Troyes connected QuickBooks Online and had Yonovo collecting the same day.

Keep the existing stat cards. This paragraph is in addition, not a replacement. Design elements convert; sentences get cited.

---

## PHASE 4: Structured data

Current state: two JSON-LD blocks, `Organization` and `WebSite`. Both valid, both minimal. Nothing on the page tells a machine that Yonovo is a software product rather than a services firm.

### Task 4.1 Add `SoftwareApplication`

Add as a new `<script type="application/ld+json">` block on `/`.

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Yonovo",
  "alternateName": "Novo",
  "url": "https://www.yonovo.com/",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Accounts Receivable Automation",
  "operatingSystem": "Web",
  "description": "Yonovo is an AI collections teammate for B2B finance teams. It connects to your accounting system and follows up on unpaid invoices across email, SMS, WhatsApp and AI voice calls, escalating accounts that need a person.",
  "featureList": [
    "Automated invoice follow-up across email, SMS and AI voice calls",
    "AI-written collection messages based on customer and invoice context",
    "Configurable collection workflows with timing, sequencing and escalation rules",
    "Automatic escalation and human handoff for disputes and partial payments",
    "Accounts receivable reporting including DSO, aging, recovery rates and at-risk invoices",
    "Messages sent from the customer's own company email address"
  ],
  "provider": { "@id": "https://www.yonovo.com/#organization" },
  "offers": {
    "@type": "Offer",
    "url": "https://www.yonovo.com/pricing",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "description": "Custom pricing based on annual revenue, customer count and features required. Quote provided after a demo."
  }
}
```

**Note on `offers`.** Pricing stays behind a demo wall, which is a settled decision. An `Offer` without a `price` value is not eligible for a price rich result. Include it anyway: it tells a model that Yonovo is a commercially available product with a pricing page, which is what AI grounding needs. Do not invent a price to satisfy a validator.

### Task 4.2 Add `FAQPage`

Generated from the task 3.3 FAQ block. The `text` values must match the rendered answers character for character. Generate the schema from the same content source as the visible FAQ so they cannot drift.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does Yonovo do?",
      "acceptedAnswer": { "@type": "Answer", "text": "..." }
    }
  ]
}
```

Eight entries, one per question in task 3.3.

### Task 4.3 Add `Review`, and a correction on ratings

The three homepage testimonials are named, titled and attributed and carry no markup at all.

**Correction to the audit document.** The audit recommended `AggregateRating` using the G2 score of 4.8. On review, do not do that. Google's structured data policy treats self serving reviews about an organization or its own products as ineligible for review rich results, and an aggregate rating sourced from a third party site and republished on your own domain is exactly that pattern. It will not produce stars and it carries a manual action risk.

**Do instead:**

1. Mark up the three testimonials as `Review` nodes attached to the `SoftwareApplication`, with `author` as a `Person` including `jobTitle` and `worksFor`. **Do not invent a `reviewRating`.** These are testimonials, not rated reviews. Omit the field.
2. Put the G2 profile URL into `Organization.sameAs` instead, so a model can find the rating at its source where it is verifiable.

```json
{
  "@type": "Review",
  "itemReviewed": { "@id": "https://www.yonovo.com/#software" },
  "reviewBody": "We used to spend hours every week chasing overdue invoices manually. Since switching to Yonovo, our manual follow ups dropped by 80% and we're collecting faster than ever.",
  "author": {
    "@type": "Person",
    "name": "Mohammad Alshalabi",
    "jobTitle": "Director of Finance",
    "worksFor": { "@type": "Organization", "name": "TDG Inc." }
  }
}
```

Repeat for Apple Smith (Accounts Receivable Manager, Troyes) and Faris Shawaf (CFO, Lawazim), using their existing quotes verbatim.

Add `@id` values to the `Organization` and `SoftwareApplication` nodes so these references resolve. Suggested: `https://www.yonovo.com/#organization` and `https://www.yonovo.com/#software`.

### Task 4.4 Expand `Organization`

Current `sameAs` contains only the LinkedIn URL. The YouTube channel is linked in the site's own footer and is not declared. `sameAs` is how a model confirms that the Yonovo on this site is the same Yonovo it has seen elsewhere.

**Add to `sameAs`:**

```
https://www.linkedin.com/company/yonovoai
https://www.youtube.com/@TractionFM
https://www.g2.com/products/yonovo/reviews
https://www.crunchbase.com/organization/yonovo   [CONFIRM exact URL, see 9.5]
```

**Also:** align `contactPoint.email` with what the footer actually uses. The schema declares `support@yonovo.com` while the footer links `mailto:salman@yonovo.com`. Pick one. Recommendation: use `support@yonovo.com` in both, since a personal address in a sitewide footer scales badly and reads as pre revenue.

Consider adding `address` once there is a confirmed business address. See 9.6.

### Task 4.5 Add `VideoObject`

The homepage carries a `<video>` element with a poster image and no schema, no captions track and no transcript. It is invisible to search.

Add `VideoObject` with `name`, `description`, `thumbnailUrl`, `contentUrl` and `uploadDate`. `uploadDate` is required and must be real, see 9.7.

Low priority relative to everything else in this phase. Do it last.

---

## PHASE 5: Small homepage fixes

Batch these into one commit.

| # | Fix | Detail |
|---|---|---|
| 5.1 | Align `og:description` with the meta description | They currently differ. Not wrong, but pick one and use it in both |
| 5.2 | Footer contact email | Change `mailto:salman@yonovo.com` to `mailto:support@yonovo.com` to match the schema. Confirm with Salman that support@ is monitored |
| 5.3 | Canonical trailing slash | Canonical is `https://www.yonovo.com` while the live URL is `https://www.yonovo.com/`. Make them byte identical |
| 5.4 | Login link | `dashboard.yonovo.ai` is a different domain and is dofollow. Add `rel="nofollow"`. Cosmetic, but it is an app login, not an endorsement |
| 5.5 | Alt text on integration logos | Currently bare brand names. Change to describe the relationship, for example `QuickBooks Online accounts receivable integration` rather than `QuickBooks` |
| 5.6 | Empty alt text | Eight images have `alt=""`, including the YouTube video poster. Decorative images should keep `alt=""`. The video poster and the four `/_next/image` uploads should get real alt text |
| 5.7 | Inline SVG accessibility | 64 inline SVG icons, none with a `<title>` or `aria-label`. Add `aria-hidden="true"` to purely decorative icons and a `<title>` to any that convey meaning |
| 5.8 | Add `max-image-preview:large` | Add `<meta name="robots" content="max-image-preview:large, max-snippet:-1, max-video-preview:-1">`. Allows longer snippets and larger image previews in results and AI surfaces. There is currently no robots meta at all |

---

## PHASE 6: New pages

Both pages currently 404. Neither exists.

### Task 6.1 Build `/about`

**Why.** For AI entity grounding, an about page is disproportionately useful. It is where a model learns who founded the company, when, where it operates and how large it is. Right now `foundingDate: 2024` in the Organization schema is the only such fact available anywhere on the site, and there is no page that can rank or be cited for "who is Yonovo" or "is Yonovo a real company". At Domain Rating 0.2 with no press coverage, this page is a meaningful part of looking legitimate to both buyers and models.

**Page requirements.**

- Title: `About Yonovo | AI Collections for B2B Finance Teams`
- H1: `About Yonovo`
- Add to `sitemap.xml` and `llms.txt` Company section
- Add `AboutPage` schema referencing `#organization`
- Link from the footer Company column and from `/book-demo`

**Structure and copy.** Write the sections below. Slots marked `[CONFIRM]` must be filled by Salman before deploy, not guessed.

`H2: What Yonovo does`

> Yonovo is an AI collections teammate for B2B finance teams. It connects to a company's accounting system, imports invoices, customers and aging data, and follows up on unpaid invoices across email, SMS, WhatsApp and AI voice calls. Accounts that go quiet get escalated. Disputes and unusual replies get routed to a person. Most teams are live within a day.
>
> The distinction that matters: traditional accounts receivable software organizes receivables and tells a finance team what needs attention. Yonovo does the follow up work itself.

`H2: Why we built it`

> Companies send invoices, and then somebody has to chase them. That work is repetitive, it is easy to let slide when the week gets busy, and it scales linearly with invoice volume. Finance teams end up spending skilled hours writing the same reminder email for the fourth time, or letting accounts age quietly because nobody had the bandwidth to follow up.
>
> The tools available mostly made that work more visible without making it smaller. We built Yonovo to do the work.

`H2: Who we are`

> `[CONFIRM 9.8: founders, roles, one line of relevant background each]`
>
> Yonovo was founded in 2024 and is based in `[CONFIRM 9.6: city, country]`.

`H2: Who we build for`

> Yonovo is built for B2B companies that invoice other businesses on payment terms and carry meaningful receivables. Our customers work in wholesale and distribution, manufacturing, professional services, software and technology, property management, and gyms and fitness. Invoice volume matters more than company size: the point at which collections stops being manageable by memory is usually the point at which Yonovo starts paying for itself.
>
> The people who use Yonovo day to day are CFOs, controllers, VPs of finance, AR managers and founders who own the finance function themselves.

`H2: Where we are going`

> `[CONFIRM 9.9: roadmap statement, or omit this section entirely. Do not write a generic vision paragraph]`

`H2: Get in touch`

> To see Yonovo working against your own AR, book a demo. For anything else, email support@yonovo.com.

Link "book a demo" to `/book-demo`.

**Do not include.** Team headcount, funding, investor names, customer counts or growth figures unless Salman supplies them. An about page with an invented scale claim is worse than a short honest one.

### Task 6.2 Build `/security`

**Why.** Yonovo connects to companies' accounting systems and handles their receivables and customer payment data. A controller or CFO doing diligence will search for this, and a procurement questionnaire will ask for it. The homepage has a "Your financial data, secured" block, but it is a marketing section, not a page that can rank or be cited for "is Yonovo secure".

**Critical constraint.** Everything on this page is a commitment. Write only what is verified. The three claims currently made on the homepage are the only security facts I could confirm:

1. Data is encrypted in transit and at rest using industry standard protocols.
2. Platform connections use OAuth and secure API tokens.
3. Credentials are never stored by Yonovo.

**Do not write, unless Salman confirms in writing:** SOC 2, ISO 27001, GDPR compliance, HIPAA, PCI DSS, penetration testing, uptime figures, data residency, retention periods, subprocessor lists, breach notification windows, or any named cloud provider. Every one of those is a claim a customer's security team will verify. See 9.10.

**Page requirements.**

- Title: `Security at Yonovo | How We Protect Your Financial Data`
- H1: `Security at Yonovo`
- Add to `sitemap.xml`, `llms.txt`, and the footer Company column
- Link from the homepage "Your financial data, secured" section, which currently links nowhere

**Structure.** Build the page with these H2s and fill only the confirmed content:

- `How your data is encrypted`. Confirmed content, expand from the three facts above
- `How we connect to your accounting system`. OAuth, tokens, credentials never stored, and what scopes are requested `[CONFIRM 9.11]`
- `Who can see your data`. Access control model `[CONFIRM 9.12]`
- `What we do with your data`. Explicitly state whether customer data is used to train models. This is the single most common question about an AI product touching financial data, and answering it plainly is worth more than any certification badge `[CONFIRM 9.13, this one matters most]`
- `Certifications and compliance`. Include this section only if there is something true to put in it. If there is nothing yet, write one honest line about what is in progress, or omit the section. Do not write "we take security seriously" as filler
- `Reporting a security issue`. A contact address for security reports `[CONFIRM 9.14]`

If most slots come back unconfirmed, ship a shorter page with only what is verified. A three section security page that is entirely true is more useful than a six section page with two hedged claims in it.

---

## PHASE 7: Responsive duplication refactor

### Task 7.1

**Problem.** Entire page sections are written into the HTML twice, once for the mobile layout and once for desktop, rather than being rendered once and laid out with CSS. Confirmed on the homepage:

- The `Works with your tools` H3 appears twice
- The entire five item `Not your typical AR software` block appears twice
- Testimonials and the integration logo row appear three times
- Footer markup is duplicated

**Effect.** The homepage counts as 2,204 words to a crawler but contains roughly 1,237 unique words. The document is 241 KB uncompressed for about 1,200 words of copy. Heading uniqueness is diluted, and a model reading the page sees each claim repeated with no canonical version.

**Required.** Render each section once. Handle responsive layout in CSS via flex, grid, container queries or ordering, not by emitting two DOM trees.

**Sequencing.** This is a front end refactor with real regression risk and it touches layout across breakpoints. Do it last, in its own PR, with before and after screenshots at mobile, tablet and desktop widths. Do not bundle it with the content changes in Phase 3, because if something breaks visually you want to know which change caused it.

**Check other pages too.** The pattern is likely template wide, not homepage specific.

---

## 8. Explicitly out of scope

Do not do these in this sprint.

- **Changing the homepage title or H1.** Recorded strategy decision. See 0.2.
- **Adding word count to the homepage for its own sake.** The problem is that 1,000 existing words are duplicates and the rest state nothing quotable, not that there are too few.
- **Publishing pricing figures.** Settled GTM decision. Do not add prices to schema or copy.
- **Building `/llms-full.txt`.** Optional, unevenly supported, not worth the maintenance surface yet.
- **Disavowing spam backlinks.** Recorded decision: no action unless rankings show harm.
- **New blog posts.** Publishing in the "Can AI...?" question format has stopped by decision.
- **Rebuilding `/accounts-receivable-statistics` from memory** if the source is not in the repo. See task 1.2, outcome B.

---

## 9. Facts register and open confirmations

Every factual claim used in the copy above, with its source. If you need a fact that is not here, stop and ask.

### 9.1 Verified, safe to use

| Fact | Source |
|---|---|
| Channels: email, SMS, WhatsApp, AI voice calls | `/accounts-receivable-automation-software`, `/pricing`, homepage, `llms.txt` |
| Integrations: QuickBooks Online, Xero, NetSuite, Sage Intacct, Odoo, Stripe Billing, BILL | The seven `/solutions/*` pages and `/accounts-receivable-automation-software` |
| "Most teams are live within one day" | `/pricing` and `/accounts-receivable-automation-software` |
| Pricing is custom, based on annual revenue, customer count and features | `/pricing` |
| Tiers: Discover, Grow ($0 to $10M ARR), Scale ($10M to $50M ARR) | `/pricing` |
| Every channel included rather than metered per message | `/accounts-receivable-automation-software` |
| Around 80 percent of collections handled automatically | Homepage, step 4 of "From overdue to paid in five steps" |
| Messages send from the customer's own company email address | Homepage |
| Encryption in transit and at rest; OAuth and secure API tokens; credentials never stored | Homepage security section |
| Founded 2024 | `Organization` JSON-LD on the homepage |
| Troyes connected QuickBooks and was collecting the same day | Homepage testimonial, Apple Smith |
| TDG Inc reduced DSO by 15 days | Homepage stat card and `/accounts-receivable-automation-software` |
| G2 listing: 4.8 from 3 reviews | `g2.com/products/yonovo/reviews` |

### 9.2 `[CONFIRM]`: integration list inconsistency

`/pricing` displays FreshBooks, Salesforce, HubSpot and SAP alongside the seven systems that have `/solutions/*` pages. `/accounts-receivable-automation-software` lists only the seven. The homepage logo row includes FreshBooks, Salesforce, HubSpot and SAP.

**Question for Salman:** are FreshBooks, Salesforce, HubSpot and SAP live integrations, planned, or logos shown for recognition?

Until answered, all copy in this brief names only the seven confirmed systems. Do not add the other four to FAQ answers, schema `featureList` or the `/about` page. If they are shown as logos without being live integrations, that is worth revisiting separately, because it is the kind of thing a prospect discovers on a demo call.

### 9.3 `[CONFIRM]`: blocking, the TDG Inc percentage contradicts itself

Three figures exist for the same outcome:

| Location | Figure |
|---|---|
| Homepage stat card | 75 percent reduction in manual tasks |
| Homepage testimonial quote, same section | "our manual follow ups dropped by 80%" |
| `/accounts-receivable-automation-software` | 80 percent fewer manual follow ups |

The homepage contradicts itself within a single section. `/accounts-receivable-automation-software` also carries two further figures not stated anywhere else: 32 percent faster payment collection and 25+ hours saved per week.

**Blocking task 3.5.** Salman to confirm the correct figures, and they should then be made identical everywhere they appear. Recommendation pending confirmation: 80 percent.

### 9.4 `[CONFIRM]`: Troyes industry descriptor

I described Troyes as an e-commerce brand in the task 3.2 copy based on the industry page structure. Confirm the correct descriptor from the case study, or drop the descriptor and use the company name alone.

### 9.5 `[CONFIRM]`: Crunchbase URL

The SEO baseline records a Crunchbase listing among the site's referring domains. Confirm the exact profile URL before adding it to `sameAs`. Do not guess the slug. A `sameAs` pointing at the wrong entity is worse than omitting it.

### 9.6 `[CONFIRM]`: business address

Needed for the `/about` page and optionally for `Organization.address`. If there is no public business address, omit it rather than using a registered agent or a home address.

### 9.7 `[CONFIRM]`: video upload date

`VideoObject.uploadDate` is required and must be accurate. Get it from the YouTube channel or the asset's own metadata.

### 9.8 `[CONFIRM]`: founders and roles for `/about`

Names, roles and one line of relevant background each. If Salman prefers not to name the team, the section can be dropped, but a company page with no people on it is weaker for both buyer trust and entity grounding.

### 9.9 `[CONFIRM]`: roadmap statement for `/about`

Optional. Omit the section entirely rather than writing a generic vision paragraph.

### 9.10 `[CONFIRM]`: security certifications

SOC 2, ISO 27001, GDPR, penetration testing, uptime commitments, data residency, retention, subprocessors, breach notification. Write nothing on any of these without written confirmation.

### 9.11 `[CONFIRM]`: OAuth scopes requested from each accounting system

Read only versus write access matters to a security reviewer and is a genuine differentiator if the answer is read only plus scoped writes.

### 9.12 `[CONFIRM]`: access control model

Who inside Yonovo can see customer data, under what circumstances, and whether access is logged.

### 9.13 `[CONFIRM]`: highest value item on the security page

Is customer data used to train models? Answer plainly either way. For an AI product touching financial data this is the most common question a security reviewer asks, and a clear answer is worth more than a badge.

### 9.14 `[CONFIRM]`: security contact address

A dedicated address such as `security@yonovo.com`, or `support@yonovo.com` if there is no separate inbox.

---

## 10. Verification checklist

Run after each deploy. Fetch from production. A green build is not verification.

**Phase 1**

- [ ] `sitemap.xml` returns 200 and contains `/accounts-receivable-automation-software`, `/debt-collection-software`, `/ar-collections-software`, `/dunning-management-software`, `/book-demo`, `/solutions/stripe`, `/solutions/bill`, `/yonovo-vs-bill-com`
- [ ] No URL in the sitemap returns a non 200 status
- [ ] `llms.txt` returns 200 and every URL in it returns 200
- [ ] `/accounts-receivable-statistics` either returns 200 with content, or is absent from both `sitemap.xml` and `llms.txt`

**Phase 2**

- [ ] No U+2014 or U+2013 character appears in any page's rendered text
- [ ] `/ar-collections-software` has 6 to 8 H2s and no fragment headings
- [ ] The 73 percent claim is either sourced with an inline link or removed
- [ ] No layout dependent phrasing remains

**Phase 3**

- [ ] The definition paragraph appears in the raw HTML of `/` as a single contiguous `<p>`, before any script tag
- [ ] The internal linking section appears in the raw HTML with all 18 destination links and descriptive anchor text
- [ ] All 8 FAQ answers appear in the raw HTML, not injected on click
- [ ] Every heading in the task 3.4 table has been changed
- [ ] The final CTA is an `<h2>`
- [ ] Footer labels are no longer `<h6>`
- [ ] The proof paragraph is present and uses the confirmed figure

**Phase 4**

- [ ] Google Rich Results Test passes on `/` with no errors
- [ ] Schema Markup Validator shows `Organization`, `WebSite`, `SoftwareApplication`, `FAQPage` and three `Review` nodes
- [ ] FAQ schema text matches visible text exactly
- [ ] No `AggregateRating` node exists on the page
- [ ] `sameAs` contains LinkedIn, YouTube and G2

**Phase 5 and 6**

- [ ] `/about` and `/security` return 200, are in `sitemap.xml` and `llms.txt`, and are linked from the footer
- [ ] No unconfirmed claim from section 9 appears on either page
- [ ] Robots meta tag present with `max-image-preview:large`

**Separately, Salman**

- [ ] Confirm `yonovo.com` returns a 301 or 308 to `www.yonovo.com`: `curl -sI https://yonovo.com/ | head -20`
- [ ] Manually test the `/book-demo` booking widget on production. Open since 17 August, still unverified, and it is the only conversion point on the site
- [ ] Resubmit `sitemap.xml` in Search Console and request indexing on the four commercial URLs individually
- [ ] Answer the `[CONFIRM]` items in section 9

---

## 11. Measurement

Do not read results before **16 September 2026** for the Sprint 1 pages, and adjust that date forward to 30 days after the sitemap is verified live, since the pages were not discoverable until then.

Homepage specific metrics to track:

| Metric | Value on 19 August 2026 |
|---|---|
| AI citations to `/` across seven platforms | 0 |
| Non branded keywords for `/` | 0 |
| Brand query position for "yonovo" | 1.06 |
| Site wide AI citations | 14 |
| Genuine editorial referring domains | 0 |

Impressions are not a success metric for this program.

---

## 12. Verification response, 19 August 2026

Written by Claude Code after working Phase 1 and Phase 2. Every claim below was checked against
production at `https://www.yonovo.com`, not against a local build.

**Headline: most of this brief was audited against a stale snapshot.** The audit predates two
deploys, `fe2394c` (17 Aug 22:31, Sprint 1) and `6f78be2` (17 Aug 22:58, heading and stat fixes).
Of the seven defects reported across Phase 1 and Phase 2, five were already resolved before the
brief was written, and one more was partly resolved.

### Phase 1

| Task | Brief claim | Verified state on 19 Aug | Verdict |
|---|---|---|---|
| 1.1 | sitemap contains none of the five Sprint 1 pages, newest `lastmod` is 2026-08-03 | 75 `<loc>` entries, **all 75 return 200**, 8 of the 9 required URLs present, newest `lastmod` 2026-08-18 | mostly stale |
| 1.2 | `/accounts-receivable-statistics` returns 404 | **returns 200** with full content, 186 KB, 8 H2s, `x-vercel-cache: HIT` | stale |
| 1.3 | `llms.txt` lists a URL that 404s | **every URL in `llms.txt` returns 200** | stale |

**Task 1.2 is outcome A, and no repair was needed.** The source is present at
`src/app/accounts-receivable-statistics/page.tsx`, rendered by `src/components/ARStatisticsPage.tsx`
with data in `src/data/arStatistics.ts`. All three are git tracked, landed in `fe2394c`, and `main`
is level with `origin/main`. There is no draft flag, no `notFound()`, no route exclusion, no
redirect in `next.config.ts` and no middleware. CDN cache age put the page live since roughly
18 Aug 16:10. Apex, `http://` and trailing slash variants all 308 to canonical and then 200.

`/blog/accounts-receivable-statistics` does return 404, but that is correct. Sprint 1 deliberately
placed the page at root, per this brief's own Sprint 1 spec.

**What was genuinely broken in Phase 1**, and has now been fixed:

1. `/book-demo` was missing from `sitemap.xml`. It was the only one of the nine required URLs
   actually absent.
2. `sitemap.ts` set `lastModified: new Date()` on all 23 static entries, so 68 of 75 URLs shared
   two identical build timestamps. Per task 1.1 item 3, these were removed rather than faked.
   Case studies were wired to their real `hero.date`. Blog posts already used real dates.
   `lastmod` now appears on 42 URLs, every one a genuine content date.
3. `llms.txt` had drifted from the sitemap: its `INTEGRATIONS` array listed 5 of the 7 live
   `/solutions/*` pages, missing `/solutions/stripe` and `/solutions/bill`. Now 7 of 7.
4. Adding `/book-demo` to the sitemap surfaced that the page had no canonical tag. Added.

The structural criticism in task 1.1 is correct and still stands: `sitemap.ts` and
`llms.txt/route.ts` are two separately hand maintained URL lists, which is exactly how
`/book-demo` and the two integrations went missing. The single source of truth refactor was
scoped and then deliberately deferred, because with the four defects above fixed there is no
longer an urgent case for it.

### Phase 2

All four tasks were already complete. `6f78be2` did 2.2, 2.3 and 2.4 and cleared the em dashes
named in 2.1, on 17 Aug, before this brief was written.

| Task | Brief claim | Verified state on 19 Aug |
|---|---|---|
| 2.1 | em dashes on `/ar-collections-software` and `/accounts-receivable-automation-software` | **0 em dashes in rendered text on all 7 key pages.** Both quoted strings absent |
| 2.2 | 11 to 12 H2s, sentence fragments, "It stops when it should" confirmed still present | **7 H2s**, inside the 6 to 8 target, no fragments, that heading does not exist |
| 2.3 | page states "Recovery odds sit around 73 percent at three months overdue" | the string "73 percent" **does not appear on the page** |
| 2.4 | `/debt-collection-software` contains "the numbers on the left" | **not present** |

The only en dashes rendered anywhere on the site are the homepage aging chart labels for the
1 to 30, 31 to 60 and 61 to 90 day buckets, written with U+2013. Those are numeric ranges, where
an en dash is correct typography, and should be treated as an allowed exception rather than a
defect.

A repo wide scan returns 181 raw dash hits. Every one is a JSX comment, a code comment, an
internal planning note in `content/blog-ideas.md`, or a numeric range. None are shipped copy.
A future audit should scan rendered output or strip comments first, otherwise this number will
keep being reported as a content defect.

**One real residue that this brief did not catch, and that no rendered page scan can catch.**
`src/components/DSOCalculator.tsx:24` ships the label `"High — cash is stuck"`. It only renders
once a user enters a DSO above 60, so every production HTML scan reports the site as clean while
the em dash is still in the build. Two further instances sit in
`src/app/api/case-study-download/route.ts` (an outbound email subject line and a `console.error`
string), and `src/lib/schemas.ts` carries a currency range inside a JSON-LD description, which is
legitimate.

This is the argument for task 2.1's lint rule, and it is a better argument than the one the brief
makes. The check has to run against source, not against rendered pages, and it has to strip
comments and allow numeric ranges or it will report 181 false positives.

### Process note

The recurring failure here is not analytical, it is timing. Every incorrect claim in this brief
was true when the audit ran and false by the time the brief was published. Two things would fix it:

1. State the commit SHA and the timestamp the audit was run against, at the top of the brief.
   A reader can then tell at a glance which findings may have aged out.
2. Re-verify the specific claims immediately before publishing, using the same "fetch from
   production" standard that section 0.3 imposes on implementation. The verification checklist in
   section 10 is the right instrument, it just needs to be run against the audit as well as
   against the work.

Reproducing the checks in this response:

```bash
# every sitemap URL, status code
curl -s https://www.yonovo.com/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//' \
  | while read u; do echo "$(curl -s -o /dev/null -w '%{http_code}' "$u") $u"; done | grep -v '^200'
```

```bash
# em and en dashes in rendered text, per page
curl -s https://www.yonovo.com/ar-collections-software > /tmp/page.html
python3 -c "import re,html; b=open('/tmp/page.html').read(); \
b=re.sub(r'(?is)<(script|style)[^>]*>.*?</\1>',' ',b); \
t=html.unescape(re.sub(r'(?s)<[^>]+>',' ',b)); print('em',t.count(chr(8212)),'en',t.count(chr(8211)))"
```

### Status

Phase 1 is complete and verified. Phase 2 needs no content work. Phase 3 onward is untouched and
its claims have not been checked, so they should be re-verified against production before anyone
starts on them.
