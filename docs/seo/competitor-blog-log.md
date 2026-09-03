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

## Known blockers

**2026-09-01: competitor domains blocked by network egress policy.** `upflow.io`, `chaserhq.com`,
and `stuut.ai` all fail at the proxy CONNECT tunnel with 403 (via WebFetch and curl alike). The
agent proxy itself is healthy and reports no relay failures, so this is the environment's egress
allowlist, not a transient network fault. Ahrefs and GitHub are unaffected.

The routine cannot run while this holds: publish dates can only be verified on the post pages, and
Step 4 requires reading the winning post to model its structure. Ahrefs alone cannot fill either
gap. Fix by adding the three domains to the remote environment's network allowlist
(see https://code.claude.com/docs/en/claude-code-on-the-web). Until then every run will land here.

## Skip list

Competitor URLs that must never be cloned, regardless of performance. Add a reason.

| URL or pattern | Reason |
|---|---|
| `*/blog/inside-*`, `*/blog/press/*`, `*/blog/series-a`, `*/blog/careers*` | Company news, funding, hiring. No search intent to win. |
| `*/blog/product-announcement*`, `*/blog/*-launch` | Competitor product launches. Nothing to model. |
| `*/dev-blog/*` | Engineering blogs, unrelated to AR buyers. |
| Any post whose topic an existing `src/content/blog/*.mdx` already targets | Would cannibalize our own ranking page. Refresh that post instead. |
