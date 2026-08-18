# Claude Code Implementation Brief — Sprint 1

**Date:** 2026-08-17
**Repo:** Yonovo marketing site (Next.js on Vercel)
**Scope:** Five new pages, one blog repositioning, five housekeeping fixes. One PR.
**Status:** Approved for implementation
**Supersedes:** the earlier category-pages-only brief

**Out of scope for this PR, tracked separately:** Attio lead-source instrumentation, accounting marketplace listings (Xero App Store, QuickBooks App Store, SuiteApp, Stripe Partner Directory), and the deferred commissioned survey report. None of these are repo work.

---

## What this sprint is and why

Yonovo has no page targeting a commercial software-category term, and no page capable of earning an editorial backlink. This sprint fixes both.

**On the category pages.** The highest-converting page archetype in this category is the named-software-category page. Every close competitor has one, Yonovo has none. Upflow's `/debt-collection-software` is the second-biggest page on their site and it ranks #2 with **seven backlinks and a URL Rating of 4**. Page-level authority in these SERPs is near zero, so format match and topical fit are what rank. Yonovo can compete here at DR 0.2, which is not true of most of the search landscape.

**On the statistics page.** Yonovo has zero genuine editorial backlinks. Audited across ten competitors, the single most efficient link-earning asset in this category is a curated statistics roundup requiring no original data. Upflow's earns **69 real referring domains** including Intuit at DR 92 and a direct competitor linking dofollow. Versapay's earns 27 including a .edu.

**On AI citation.** Two of Yonovo's last eight inbound demos came from ChatGPT or Claude, and those two produced the only closed-won inbound deal and the largest live inbound proposal. Category pages and stats pages are both substrate AI systems pull from. Every spec below is written to serve ranking, conversion and citation at once, which is why specificity, named comparisons and concrete numbers matter more than persuasive copy.

---

## Global constraints, apply to every page

**Copy rules, non negotiable.** No hyphens or dashes anywhere in body copy. No use of the word "AI" in brand facing copy. Casual founder voice. No bullet lists inside prose sections, though genuine comparison and data tables are fine and expected. American English. Keep sentences short.

**Terminology.** "Clients" means companies that pay Yonovo. "Customers" means the client's own customers who owe money. Do not mix these.

**Accuracy.** Do not invent product capabilities, customer results, integration behavior, pricing, or performance statistics. Every number must trace to the existing site, a verified internal source, or a linked external primary source. If a claim cannot be verified, leave it out and flag it in the PR description.

**Verified proof assets.** TDG Inc: 80 percent fewer manual follow ups, 15 day DSO reduction, 32 percent faster collection, 25 plus hours per week saved, quoted by Mohammad Alshalabi, Director of Finance. Troyes case study. Client logos for Troyes, TDG and SBC. Existing testimonials from Mohammad Alshalabi, Apple Smith and Faris Shawaf.

**Verified integrations.** QuickBooks Online, Xero, NetSuite, Sage Intacct, Odoo, Stripe Billing, BILL.

**Verified channels.** Email, SMS, and phone. Do **not** claim WhatsApp without confirming first. Internal sources conflict on whether it is live.

**Flag, do not fix here.** The homepage title tag reads "Yonovo | AI-Powered Accounts Receivable Automation", which conflicts with the no AI in brand facing copy rule. Raise in the PR description for a separate decision.

**Design.** Match the existing dark gradient treatment, Inter, and the green CTA button. These should feel like `/solutions/quickbooks`, not like blog posts.

**Every page needs.** A single H1. A self referencing canonical. Inclusion in `sitemap.xml`. Server side rendering. A demo CTA above the fold and at least two more down the page, pointing to `/book-demo`.

**Do not templatize the four category pages against each other.** The seven `/solutions/` pages already share an identical four H2 skeleton with only the platform name swapped, which reads as doorway adjacent at scale. These must have genuinely different structures because they answer genuinely different buyer questions. If page two looks like page one with words swapped, it is wrong.

---

# PART A — Commercial category pages

## Page 1 — `/accounts-receivable-automation-software`

**Priority: highest.** The flagship. Build and finish this before starting the others.

### Target cluster

One page, one URL, seven terms. These share substantially the same SERP and must not be split.

| Keyword | US volume | KD |
|---|---|---|
| accounts receivable software | 1,600 | 18 |
| accounts receivable automation software | 1,200 | 18 |
| ar automation | 1,000 | 12 |
| accounts receivable automation | 900 | 12 |
| best accounts receivable software | 800 | 10 |
| accounts receivable management software | 700 | 3 |
| ar automation software | 500 | 19 |

Roughly 6,700 searches a month combined.

**Why one page.** bill.com's single `/product/accounts-receivable` ranks #2 for "accounts receivable management software", #2 for "accounts receivable automation software" and #8 for "ar automation". Google treats these as one SERP. Separate pages would cannibalize.

### What we have to beat

| Position | Page | DR | UR | Backlinks |
|---|---|---|---|---|
| 2 | bill.com/product/accounts-receivable | 81 | 19 | 105 |
| 3 | trevipay.com/resource-center/blog/best-accounts-receivable-automation-software/ | 64 | 4 | 12 |
| 5 | maxio.com/accounts-receivable-management | 77 | 13 | 3 |
| 7 | fazeshift.com/post/best-automated-accounts-receivable-software | **33** | 4 | 11 |
| 8 | square-9.com/ar-automation-software/ | 55 | 7 | **1** |
| 9 | billtrust.com/resources/blog/best-accounts-receivable-software | 76 | 4 | **2** |
| 10 | highradius.com/resources/Blog/top-accounts-receivable-tools/ | 74 | 4 | 10 |

A DR 33 site holds position 7. Pages at 5 and 8 rank with one and three backlinks.

### Format: hybrid

The SERP rewards both product pages and comparison listicles, and the highest-traffic result is trevipay's listicle at 2,522 visits with UR 4. So this is a **product category page containing an honest multi-vendor comparison**. Not a pure pitch, not a pure listicle. That hybrid is also the format AI systems cite most readily.

### Structure

1. **H1 and opening.** H1: "Accounts Receivable Automation Software". Two or three sentences on what this category does and who it is for. No throat clearing.
2. **Quotable answer block.** Two to four sentences answering "what is accounts receivable automation software", written to be lifted verbatim as a citation. Highest-value block on the page for AI retrieval.
3. **Comparison table.** Yonovo plus at least seven real vendors. Columns: vendor, best for, channels supported, accounting integrations, setup time, pricing model, pricing public yes or no. Be accurate including where competitors are stronger. Do not rank Yonovo first by default; rank by fit and say who each tool actually suits.
4. **What Yonovo does differently.** Traditional AR software tells you what needs doing, Yonovo does the work. Ground it in the actual workflow, not adjectives. Product screenshots.
5. **How it works.** Connect the accounting system, import invoices customers and aging, set collection rules, follow up across email SMS and phone, escalate or pause when judgment is needed, track from the dashboard.
6. **Proof.** TDG numbers with the Alshalabi quote, logos, links to both case studies.
7. **Integrations.** Short section linking all seven `/solutions/` pages.
8. **FAQ.** Six to ten questions in real buyer language, including ones Search Console already shows Yonovo surfacing for: which AR tools integrate with QuickBooks and Xero, which platform has the fastest setup, how AR automation differs from native QuickBooks reminders. FAQPage schema.
9. **Closing CTA.**

### Metadata
- Title: `Accounts Receivable Automation Software | Yonovo`
- H1: `Accounts Receivable Automation Software`

### Consolidation

`/blog/best-ar-automation-software` targets this cluster and sits at position 26 to 67. It is a strong 3,800 word post. Do not delete it. Reposition it toward the narrower "best" and "compared" comparison intent, point its primary internal link at the new category page with descriptive anchor text, and link back from the category page. Revisit full consolidation after 90 days only if they compete rather than complement.

### Internal linking
**In:** nav or footer, all seven `/solutions/`, all six `/industries/`, the three comparison pages, `/blog/best-ar-automation-software`, the ten highest-impression blog posts.
**Out:** all seven `/solutions/`, both case studies, `/pricing`, `/book-demo`, the three comparison pages, `/accounts-receivable-statistics`.

---

## Page 2 — `/debt-collection-software`

### Target
"debt collection software", 900 US volume, KD 3, CPC $15.

### What we have to beat

| Position | Page | DR | UR | Backlinks | Traffic |
|---|---|---|---|---|---|
| 2 | upflow.io/debt-collection-software | 71 | **4** | **7** | 1,389 |
| 3 | highradius.com/product/automated-debt-collection/ | 74 | 16 | 47 | 800 |
| 4 | cgi.com article | 82 | 4 | 28 | 1,004 |
| 5 | salesforce.com/financial-services/debt-collection-software/ | 92 | 4 | 7 | 761 |
| 8 | hesfintech.com/blog/top-debt-collection-software/ | 55 | 6 | **0** | 327 |

Upflow holds #2 with seven backlinks. A page with zero backlinks holds #8.

### Critical framing constraint

**This SERP is contaminated with consumer and agency debt collection intent.** Salesforce Financial Services, C&R Software, Symend, CGI and Experian all serve lenders and collection agencies, and the People Also Ask block includes "what is the 7-7-7 rule for debt collection". That is the wrong buyer.

Upflow proves a B2B framed page still ranks #2. So frame this page explicitly around **B2B invoice collections between businesses** in the first paragraph, and name what it is not: consumer debt recovery, third party collection agencies, credit bureau reporting. Qualifying the traffic at the top is worth more than capturing all of it.

### Format: product page
Winners here are product and solution pages. Upflow #2, HighRadius #3, Salesforce #5, all product pages.

### Structure

1. **H1 and disambiguating opening.** H1: "Debt Collection Software for B2B Invoices". State immediately that this is software for businesses collecting on their own unpaid invoices, and name what it is not.
2. **Quotable definition block.** What B2B debt collection software is, how it differs from consumer collections and from handing accounts to an agency.
3. **The problem, concretely.** Invoices go out on net terms, someone has to chase, chasing is manual and inconsistent, accounts fall through the cracks as volume grows.
4. **How Yonovo collects.** The sequence across aging buckets, the channel mix, escalation rules, and the fact that messages send as the client's own business rather than an outside agency. That last point matters most on this page, because the whole SERP is agency and outsourced solutions.
5. **Dispute and edge case handling.** Partial payments, disputed invoices, promise to pay, when a human takes over. Competitors cover this poorly and it is what a real AR manager worries about.
6. **Proof.** TDG numbers and quote, logos, case study links.
7. **Comparison table.** Yonovo against Upflow, Chaser, Invoiced and one enterprise option, scoped to B2B invoice collections.
8. **FAQ** with FAQPage schema.
9. **Closing CTA.**

### Metadata
- Title: `Debt Collection Software for B2B Invoices | Yonovo`
- H1: `Debt Collection Software for B2B Invoices`

### Internal linking
**In:** page 1, page 3, footer, all `/solutions/`, the three comparison pages.
**Out:** page 1, page 3, `/industries/wholesale-distribution`, `/industries/manufacturing`, both case studies, `/accounts-receivable-statistics`, `/book-demo`.

---

## Page 3 — `/ar-collections-software`

### Target cluster

| Keyword | US volume | KD | CPC |
|---|---|---|---|
| ar collections software | 200 | 4 | $30.00 |
| automated collections software | 200 | 7 | $35.00 |
| collections automation software | 100 | 3 | $20.00 |
| collections on accounts receivable | 200 | 6 | $6.00 |

Low volume, highest CPCs in the entire keyword set. These are people actively buying.

**Note.** "collections software" at 250 volume was considered and rejected. Its SERP is dominated by consumer and lending collections, same contamination as page 2 but with no Upflow-style proof that a B2B page holds.

### Format: product page, tighter and more operational than page 2

This page should read like it was written by someone who has run a collections process. That is the differentiator against the generic content in these SERPs and it is what makes it citable.

### Structure

1. **H1:** "Accounts Receivable Collections Software". Open with what a collections workflow actually consists of.
2. **Quotable definition block.**
3. **The collections workflow in detail.** Aging buckets and what happens in each. Reminder timing before due, at due, after. When to switch channel. When to escalate. When to stop and involve a person. This section is the reason the page exists. Be specific enough that an AR manager recognizes their own job.
4. **How Yonovo runs it.** Map the above onto real product behavior with screenshots. Reference actual client sequences where describable without exposing client detail.
5. **Reporting.** Outstanding receivables, aging, DSO, recovery rate, at-risk invoices, customer payment behavior, collection activity.
6. **Proof and CTA.**
7. **FAQ** with FAQPage schema.

### Metadata
- Title: `Accounts Receivable Collections Software | Yonovo`
- H1: `Accounts Receivable Collections Software`

### Internal linking
**In:** page 1, page 2, page 4, footer, `/tools/dso-calculator`.
**Out:** page 1, page 2, `/tools/dso-calculator`, `/blog/invoice-reminder-best-practices`, `/accounts-receivable-statistics`, both case studies, `/book-demo`.

---

## Page 4 — `/dunning-management-software`

### Target cluster

| Keyword | US volume | KD |
|---|---|---|
| dunning management software | 300 | 4 |
| dunning software | 250 | 4 |

"dunning letter" at 1,100 is informational and belongs in a future template page, not here. Link to it once it exists.

### Why this page
lunos.ai ranks #4 for "dunning management software" at **DR 32**. Direct proof the term is winnable well below incumbent authority.

### Format: product page with a strong definitional opening
People search "dunning" when they half know the word. Teach and sell in the same breath.

### Structure

1. **H1:** "Dunning Management Software". Open by defining dunning plainly.
2. **Quotable definition block.** What dunning is, what a dunning sequence looks like, how it differs from collections and from a single payment reminder.
3. **What a dunning sequence should contain.** Stage by stage, with timing and tone shifting across stages. Concrete.
4. **Where template dunning breaks down.** Disputes, partial payments, good customers you cannot afford to annoy, customers who always pay at day 45 regardless. This is the positioning wedge and it is honest.
5. **How Yonovo handles it.** Screenshots, channel mix, human oversight, escalation.
6. **Proof and CTA.**
7. **FAQ** with FAQPage schema.

### Metadata
- Title: `Dunning Management Software | Yonovo`
- H1: `Dunning Management Software`

### Internal linking
**In:** page 1, page 3, footer.
**Out:** page 1, page 3, `/blog/invoice-reminder-best-practices`, `/solutions/quickbooks`, `/solutions/stripe`, `/accounts-receivable-statistics`, `/book-demo`.

---

# PART B — Link-earning asset

## Page 5 — `/accounts-receivable-statistics`

**This page has a different job from the other four. Do not measure it on traffic.**

Search volume for "accounts receivable statistics" is roughly 50 a month. This page exists to earn editorial backlinks and to get Yonovo named as a source inside an existing citation loop. Low volume is precisely why the SERP is uncontested by large budgets.

### The evidence

| Page | Real referring domains | Notable linkers |
|---|---|---|
| upflow.io/blog/ar-collections/13-accounts-receivable-cash-collection-statistics-2024 | **69** | intuit.com DR92 dofollow, clickup.com DR90, whop.com DR89, **chaserhq.com DR66 (a direct competitor, dofollow)**, trevipay.com DR64 |
| paystand.com/blog/b2b-digital-payment-statistics | **33** | — |
| versapay.com/accounts-receivable-statistics | **27** | **kent.edu DR81 dofollow**, designrush.com DR90, glueup.com DR82, c2fo.com DR64 |
| versapay.com/resources/statistics-that-reveal-ar-critical-to-cx | **24** | — |

All verified real after spam filtering. Upflow's page was still picking up new referring domains on 2026-08-14.

**The mechanism.** Stats roundups cite other stats roundups. DocuClipper (DR 71) sources its AR statistics page from Versapay, Upflow, Nuvo, Paidnice, Invoiced and Lockstep by name. Once Yonovo is in that loop as a named source, links accrue passively for years. Competitors including Chaser, Stuut and Fazeshift actively cite each other's stats pages.

**Existing signal.** gitnux.org, zipdo.co, wifitalents.com and worldmetrics.org already cite Yonovo, currently nofollow. Those are the same aggregators that link to Gaviti. The surface has found Yonovo; there is nothing quotable to point at yet.

### Format requirements, these are what make it linkable

1. **25 to 40 statistics**, each as its own H3 with a stable `id` anchor so other sites can deep link to a specific stat.
2. **Every statistic carries a primary source link.** Link to the original publisher, never to another roundup. A stat without a verifiable primary source does not go on the page. This is the single most important rule here, because the page's entire value is being trustworthy enough to cite.
3. **Every statistic carries a one-line takeaway** in plain language explaining why it matters to a finance team. This is what gets quoted.
4. **Include the year in the H1 and title** and structure the page so the year can be updated annually without a rewrite.
5. **Group into named sections** so people can cite a section: late payment behavior, DSO and aging, collections cost and effort, automation adoption, cash flow impact, small business impact.
6. **A short methodology and sourcing note** stating that every figure links to its original publisher and when the page was last updated. Competitors do not do this and it is a credibility differentiator.
7. **Charts must be lightweight and copy-friendly.** Simple, clearly labeled, with the source named inside the image. Sites that reproduce a chart usually link back.
8. **No gating. No email wall.** Gated pages do not earn links.

### Source pool to draw from

Atradius Payment Practices Barometer, PYMNTS, Federal Reserve small business credit surveys, US Chamber of Commerce, Intuit and QuickBooks small business research, Xero Small Business Insights, APQC accounts receivable benchmarks, Credit Research Foundation NSDTR, IOFM, Grand View Research and Mordor Intelligence market sizing.

**Do not** cite Yonovo's own data on this page. That asset is on hold pending client count, and mixing an unverifiable internal figure into a page whose value is verifiability would undermine the whole thing.

### Structure

1. **H1:** "Accounts Receivable Statistics (2026)". One paragraph stating what the page is, how many statistics it contains, and that every figure links to its original source.
2. **Key takeaways block.** Five to seven of the most quotable figures up front. This is what most citing sites will lift.
3. **The sectioned statistics**, per the format rules above.
4. **Sourcing and methodology note.**
5. **A short closing section** connecting the picture the data paints to what AR automation addresses, linking to page 1 and page 3. Keep this brief and non-promotional. A hard sell here reduces citations.
6. **Single CTA at the very bottom only.**

### Metadata
- URL: `/accounts-receivable-statistics` at root, not under `/blog/`
- Title: `Accounts Receivable Statistics (2026) | Yonovo`
- H1: `Accounts Receivable Statistics (2026)`
- Meta description: lead with the number of statistics and the year

### Internal linking
**In:** all four category pages, footer resources, `/blog/best-ar-automation-software`, `/tools/dso-calculator`.
**Out:** page 1, page 3, `/tools/dso-calculator`. Keep internal links light. This page's job is to be cited, not to funnel.

---

# PART C — Housekeeping

Confirmed in the site audit. Ship in the same PR.

1. **Fix the duplicate brand suffix in the title template.** `/case-studies/tdg-inc` renders `"TDG Inc. | Yonovo Case Study | Yonovo"`. `/book-demo` renders `"Book a Demo | Yonovo | Yonovo"`. The template appends `| Yonovo` to titles already containing it. Fix the template, not the pages.
2. **Add `/solutions/stripe` and `/solutions/bill` to `sitemap.xml`.** Both live and linked from every page's nav and footer, both excluded from the sitemap.
3. **Re-front two blog titles.** `/blog/sage-ar-automation` and `/blog/xero-ar-automation` open with the same string as `/solutions/sage` and `/solutions/xero` and truncate to near-identical SERP snippets. Change to lead with the how-to framing, for example `How to Automate AR in Xero: Step by Step (2026)`.
4. **Move `/blog/yonovo-vs-bill-com` to `/yonovo-vs-bill-com`** with a 301, matching the other three comparison pages, and add it to the footer Compare module. It is currently orphaned from the sitewide link equity its siblings receive.
5. **Verify `/book-demo` renders its booking widget.** The widget is JavaScript rendered and absent from server HTML. Confirm manually in a browser that it loads and accepts a booking. This is the only conversion point on the site. **If it is failing, that outranks everything else in this brief.**

---

## Acceptance criteria

- Five new pages live at the specified root-level URLs, each with a unique structure, in `sitemap.xml`, self-canonical, server-side rendered
- No hyphens or dashes in body copy; no use of "AI" in brand facing copy
- Every statistic on the category pages traces to the existing site or a verified internal source; every statistic on `/accounts-receivable-statistics` links to an external primary source
- No statistic anywhere sourced from another roundup
- Comparison tables name real competitors and describe them accurately, including where they are stronger than Yonovo
- FAQPage schema validates on all four category pages
- Every stat on the statistics page has a stable anchor `id`
- Statistics page is ungated
- Internal links wired in both directions as specified
- All five housekeeping items shipped
- PR description lists any claim that could not be verified, plus the homepage "AI-Powered" title tag conflict

## After this ships

Record each page in the SEO Change Log with target query, date, and starting position. Do not measure for at least 30 days.

Then run outreach on the statistics page specifically, since that asset does not work passively at first. Contact the aggregators already mentioning Yonovo without a real link (gitnux, zipdo, wifitalents, worldmetrics) plus the sites holding the current stats-page SERP (DocuClipper, Nuvo, Paidnice). That is a manual task, not repo work.

The metrics that matter are non-branded clicks, non-branded keywords reaching the top 10, referring domains that are genuinely editorial, AI citations by platform, and inbound demos by source. Impressions are not a success metric for this program.
