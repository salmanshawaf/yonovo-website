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

## Skip list

Competitor URLs that must never be cloned, regardless of performance. Add a reason.

| URL or pattern | Reason |
|---|---|
| `*/blog/inside-*`, `*/blog/press/*`, `*/blog/series-a`, `*/blog/careers*` | Company news, funding, hiring. No search intent to win. |
| `*/blog/product-announcement*`, `*/blog/*-launch` | Competitor product launches. Nothing to model. |
| `*/dev-blog/*` | Engineering blogs, unrelated to AR buyers. |
| Any post whose topic an existing `src/content/blog/*.mdx` already targets | Would cannibalize our own ranking page. Refresh that post instead. |
