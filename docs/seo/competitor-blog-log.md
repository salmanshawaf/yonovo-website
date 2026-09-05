# Competitor blog log

State file for the **Yonovo competitor blog autopilot** routine (runs every 2 days).

The routine scans Upflow, Chaser, and Stuut for posts published in the last 14 days, uses
Ahrefs to pick the best performer, and writes a Yonovo post modeled on it.

**Every run must append a row here before committing.** The routine reads this table first and
skips any competitor URL already listed, so the same source post is never cloned twice. Without
this, runs land 2 days apart while the "last 14 days" window barely moves, and the same winner
would be picked over and over.

Newest last.

| Run date | Competitor source post | Ahrefs signal at pick time | Yonovo post created | Status |
|---|---|---|---|---|
| 2026-08-26 | https://upflow.io/blog/cfo-reads/cash-flow-analysis | +539 US visits in 7d, 2,710/mo, #7 for "cash flow analysis" (52k/mo, KD 22) | [cash-flow-analysis](../../src/content/blog/cash-flow-analysis.mdx) | published |
| 2026-09-01 | none scanned | Scan could not run. Ahrefs was reachable (upflow.io/blog prefix, US, 7d compare: top gainer `/blog/saas-finance` +60 visits; all gainers were established pages, no new posts surfaced). Ahrefs top-pages carries no publish date, so it cannot substitute for the index scan. | none | blocked: competitor sites unreachable |
| 2026-09-03 | none scanned | Scan could not run. Same egress blocker as 2026-09-01: `upflow.io`, `chaserhq.com`, `stuut.ai` all return EGRESS_BLOCKED via WebFetch. Proxy itself healthy (`recentRelayFailures: []`, enabled), so this is the environment allowlist, not a transient fault. Ahrefs alone cannot verify publish dates or supply a post to model. | none | blocked: competitor sites unreachable |
| 2026-09-05 | none scanned | Scan could not run, third consecutive time. Ahrefs `upflow.io/blog` prefix (US, 2026-09-05 vs 2026-08-29, `traffic_diff:desc`) returned 15 gainers, **all `status: "both"`**, i.e. established pages. Zero new pages surfaced. Top gainer is still `/blog/cfo-reads/cash-flow-analysis` (+769 to 2,029 US visits, "cash flow analysis" 51k/mo, pos 6), already cloned on 2026-08-26, so the log correctly suppressed a repeat. `chaserhq.com/blog` prefix returned zero rows (they serve from `www.`; not retried, run was blocked regardless). New this run: WebSearch **does** reach competitor domains, so titles and URLs are obtainable, but it returns no verifiable publish dates and cannot supply post bodies. | none | blocked: competitor sites unreachable |

## Known blockers

**2026-09-01 (still open as of 2026-09-05, 3 runs lost): competitor domains blocked by network
egress policy.** `upflow.io`, `chaserhq.com`, and `stuut.ai` all fail at the proxy CONNECT tunnel
with 403 (via WebFetch and curl alike). The agent proxy itself is healthy and enabled; its
`recentRelayFailures` now name these three hosts explicitly with
`"gateway answered 403 to CONNECT (policy denial or upstream failure)"`. So this is the
environment's egress allowlist, not a transient network fault. Ahrefs and GitHub are unaffected.

**Fix:** add `upflow.io`, `chaserhq.com` (and `www.chaserhq.com`), and `stuut.ai` to the remote
environment's network allowlist. See https://code.claude.com/docs/en/claude-code-on-the-web.
Until then every run lands here.

### What was ruled out

- **Ahrefs as a substitute for the index scan.** Ahrefs top-pages carries no publish date, and new
  posts have no traffic yet by definition, so they never surface as gainers. Confirmed again on
  2026-09-05: all 15 Upflow gainers were `status: "both"` (established pages).
- **WebSearch as a substitute.** WebSearch is *not* egress-proxied and does reach these domains,
  returning titles and URLs. It is still not enough for two reasons: it surfaces no publish date
  that can be verified (Step 2 requires confirming the date on the post page itself), and it
  returns no post body, so Step 4 cannot extract the H2/H3 outline that the whole routine models.
  Picking a winner from search snippets alone would mean guessing at both recency and structure.

Deliberately routing around the egress policy (a third-party text-extraction proxy, a cache
mirror) was **not** attempted. The allowlist is an environment control and circumventing it is
Salman's call to make, not the routine's. Fixing the allowlist is the clean path.

## Skip list

Competitor URLs that must never be cloned, regardless of performance. Add a reason.

| URL or pattern | Reason |
|---|---|
| `*/blog/inside-*`, `*/blog/press/*`, `*/blog/series-a`, `*/blog/careers*` | Company news, funding, hiring. No search intent to win. |
| `*/blog/product-announcement*`, `*/blog/*-launch` | Competitor product launches. Nothing to model. |
| `*/dev-blog/*` | Engineering blogs, unrelated to AR buyers. |
| Any post whose topic an existing `src/content/blog/*.mdx` already targets | Would cannibalize our own ranking page. Refresh that post instead. |
