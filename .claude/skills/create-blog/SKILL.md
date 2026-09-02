---
name: create-blog
displayName: Create Blog Post
description: Create a complete blog post with keyword research, SEO/AEO optimization and auto-generated hero image. Use when the user wants to create a new blog post, write a blog article, or says "create a blog post about X".
version: 1.1.0
userInvocable: true
---

# Create Blog Post

Create a complete, publish-ready blog post for the Yonovo website.

## Input

The user provides a topic, e.g. `/create-blog how overdue invoices kill your cashflow`

The topic is a starting point, not a final title. Keyword research in step 1 frequently reshapes the angle, and it should.

## Steps

### 1. Keyword Research (Ahrefs MCP)

**Do this before writing a single word.** The research decides the title, the H2s, and sometimes whether the post is worth writing at all.

Ahrefs tools are deferred. Load them first:

```
ToolSearch: select:mcp__43854190-823b-403f-9c8a-1e5f876ec26d__keywords-explorer-overview,mcp__43854190-823b-403f-9c8a-1e5f876ec26d__keywords-explorer-matching-terms,mcp__43854190-823b-403f-9c8a-1e5f876ec26d__keywords-explorer-related-terms,mcp__43854190-823b-403f-9c8a-1e5f876ec26d__serp-overview
```

**1a. Size the seed terms.** Run `keywords-explorer-overview` on 6 to 8 candidate phrasings of the topic. Use `country: "us"` for most posts, `"ca"` for Canada-specific ones.

```
select: "keyword,volume,difficulty,cpc,global_volume,parent_topic,intents"
```

**1b. Expand the cluster.** Run `keywords-explorer-matching-terms` on the 2 or 3 seeds that showed real volume.

**Gotcha:** the `terms` parameter only accepts `"all"` or `"questions"`. Your actual keywords go in the `keywords` parameter. Passing keywords to `terms` returns a validation error.

```
keywords: "short pay,deduction management"
terms: "all"
select: "keyword,volume,difficulty,cpc"
where: {"field":"volume","is":["gte",50]}
order_by: "volume:desc"
limit: 25
```

**1c. Pick the target.** Choose a primary keyword and 4 to 8 supporting ones. Favour:
- **KD under 15.** The site does not yet have the authority to win hard terms.
- **Volume over 80/mo US**, or strong global volume with a defensible niche.
- **High CPC as a quality signal.** A $10+ CPC at KD 1 means commercial intent nobody has covered well. Those are the best posts to write.
- **Question-shaped keywords** for the FAQ block. `what does X mean` and `what is X` terms map straight to FAQ entries and often carry KD 0.

**1d. Let the data change the plan.** This is the point of the step. Report the reshaping to the user rather than silently proceeding:
- If the requested angle has no volume but an adjacent one does, write the adjacent one.
- If the language or region has no search demand, switch. (French collections terms are near-dead in Canada; the same post in English targeting `bill 96 quebec` reaches a real audience.)
- If an existing post already owns the cluster, say so and propose a different angle instead of cannibalising it.
- Check `src/content/blog/` for overlap before committing to a target.

**1e. Record the targets.** Put the primary keyword in `seoTitle` and `description`, and the full set in the `keywords` frontmatter array. Work supporting terms into H2s naturally, never by stuffing.

Optionally run `serp-overview` on the primary keyword to see who ranks and what shape of content wins.

### 2. Write the MDX Blog Post

Create a new file at `src/content/blog/<slug>.mdx` following the existing blog post patterns.

**Frontmatter must include:**
- title, seoTitle, description, slug, author, category, tags
- publishedAt (today's date), updatedAt (today's date)
- tldr (2-3 sentence summary)
- faqs (4+ questions with detailed answers for AEO)
- keywords (the array from step 1)
- heroImage and heroImageAlt (set after image generation)

**Content guidelines:**
- Never use em dashes. Use periods, commas, or rephrase instead.
- Write for finance teams at B2B companies
- Include actionable advice, not just theory
- Use data points and specific numbers where possible
- Structure with clear H2/H3 headings
- Aim for 1500-2500 words

**Categories:** guides, insights, comparisons

**Authors:** "salman" or "alex"

**Data sourcing guardrail — never invent metrics.** Only use numbers from published case studies on yonovo.com, verified customer data Salman has confirmed, or public sources cited inline. If a compelling data point would strengthen the post but cannot be sourced, ask Salman rather than fabricating it.

Verified proprietary metrics currently cleared for use:
- TDG Inc: 80% drop in manual follow-ups, 15 day DSO reduction, 32% faster collection
- One customer: DSO from 65 days down to 41
- Across the customer base: average 15 hours per week recovered
- Troyes: manual to fully automated in a single day

Every post should carry at least one of these in a callout or blockquote, not buried in prose.

**Internal linking (IMPORTANT — only link to pages that exist):**
Add 2-4 contextual internal links per post, but ONLY to routes that actually exist in the repo. Do NOT invent routes by analogy (e.g. don't link `/industries/construction` just because `/industries/manufacturing` exists). The valid targets are:
- **Industries** — only the object keys in `src/data/industries.ts`. As of writing: `wholesale-distribution`, `manufacturing`, `professional-services`, `property-management`, `gyms-fitness`, `software-tech`. (No `construction`, no `ecommerce-retail`.) Re-read that file before linking; do not trust this list if it has drifted.
- **Solutions** — only the folders in `src/app/solutions/`: `quickbooks`, `xero`, `netsuite`, `odoo`, `sage`, `bill`, `stripe`.
- **Case studies** — only the keys in `src/data/caseStudies.ts` (e.g. `tdg-inc`, `troyes`).
- **Other posts** — only existing `src/content/blog/*.mdx` slugs.
- **Static pages** — `/`, `/pricing`, `/book-demo`, `/case-studies`, `/blog`, `/changelog`.
If you want to mention an industry/integration that has no page, use plain text (no link) rather than a broken link.

### 3. Generate the Hero Image

Use the image generation script at `scripts/generate-blog-image.ts`.

```bash
GEMINI_API_KEY=$(grep GEMINI_API_KEY .env.local | cut -d= -f2) npx tsx scripts/generate-blog-image.ts "<slug>" "<topic prompt>" "<composition>"
```

**Style prompt is baked into the script:** Bold editorial illustration with thick dark outlines, navy/blue/coral colors, organic gray background blobs, white background. No text/numbers/letters.

**6 composition types (rotate for variety across posts):**
1. `collage` - Objects overlapping in a stack
2. `hero` - One large central object with small accents orbiting
3. `sidebyside` - Two groups facing each other with connecting element
4. `flow` - Left-to-right process with arrows
5. `scattered` - Objects floating freely across canvas
6. `comparison` - Two screens/panels side by side with gear/lightning between

**Topic prompt tips:**
- Describe 4-6 specific objects relevant to the blog topic
- Be descriptive (e.g. "a large leaking bucket with band-aids" not just "bucket")
- Explicitly say "No text on any object" if the topic involves screens/documents
- Don't mention calendars with numbers, documents with text, or screens with labels

**Check existing posts** to see which compositions were used recently and pick a different one.

### 4. Optimize the Image to WebP

The generator writes a large `.png`. The site serves `.webp`. Convert and clean up:

```bash
node scripts/optimize-blog-images.mjs --apply
rm -f public/images/blog/<slug>.png
```

Run without `--apply` first for a dry run if you want to see the savings. Typical reduction is 90%+ (600KB to 35KB). Leaving the `.png` behind bloats the repo, and no other post has one.

### 5. Set Frontmatter Image Fields

Update the MDX frontmatter. Note the extension is `.webp`, not `.png`:

```yaml
heroImage: "/images/blog/<slug>.webp"
heroImageAlt: "<descriptive alt text for the generated image>"
```

### 6. Verify

- **Validate internal links FIRST (blocking):** run `npm run check:blog-links <slug>`. This checks every internal link in the post against the routes that actually exist in the repo and fails on any that don't (this is what catches hallucinated links like `/industries/construction`). Fix or unlink anything it flags before continuing. Do not finish the post until this passes.
- Check for em dashes: `grep -c "—" src/content/blog/<slug>.mdx` must return 0.
- Navigate to `/blog` on the dev server and screenshot to confirm the post appears with its image
- Navigate to `/blog/<slug>` and screenshot to confirm the post page renders correctly

**If the hero image renders as a blank grey box**, reload once. Next.js optimizes the image on first request and a cold request can screenshot before it finishes. If it is still blank after a reload, check the file exists and the frontmatter extension is `.webp`.

## Output

A complete blog post with:
- A keyword target backed by Ahrefs data, reported to the user
- SEO-optimized MDX content
- AEO-optimized FAQ schema
- Auto-generated editorial hero image, converted to WebP
- All frontmatter fields set
- Verified on the blog page
