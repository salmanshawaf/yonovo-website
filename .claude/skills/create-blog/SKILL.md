---
name: create-blog
displayName: Create Blog Post
description: Create a complete blog post with SEO/AEO optimization and auto-generated hero image. Use when the user wants to create a new blog post, write a blog article, or says "create a blog post about X".
version: 1.0.0
userInvocable: true
---

# Create Blog Post

Create a complete, publish-ready blog post for the Yonovo website.

## Input

The user provides a topic, e.g. `/create-blog how overdue invoices kill your cashflow`

## Steps

### 1. Write the MDX Blog Post

Create a new file at `src/content/blog/<slug>.mdx` following the existing blog post patterns.

**Frontmatter must include:**
- title, seoTitle, description, slug, author, category, tags
- publishedAt (today's date), updatedAt (today's date)
- tldr (2-3 sentence summary)
- faqs (4+ questions with detailed answers for AEO)
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

**Internal linking (IMPORTANT — only link to pages that exist):**
Add 2-4 contextual internal links per post, but ONLY to routes that actually exist in the repo. Do NOT invent routes by analogy (e.g. don't link `/industries/construction` just because `/industries/manufacturing` exists). The valid targets are:
- **Industries** — only the object keys in `src/data/industries.ts`. As of writing: `wholesale-distribution`, `manufacturing`, `professional-services`, `property-management`, `gyms-fitness`, `software-tech`. (No `construction`, no `ecommerce-retail`.) Re-read that file before linking; do not trust this list if it has drifted.
- **Solutions** — only the folders in `src/app/solutions/`: `quickbooks`, `xero`, `netsuite`, `odoo`, `sage`.
- **Case studies** — only the keys in `src/data/caseStudies.ts` (e.g. `tdg-inc`, `troyes`).
- **Other posts** — only existing `src/content/blog/*.mdx` slugs.
- **Static pages** — `/`, `/pricing`, `/book-demo`, `/case-studies`, `/blog`, `/changelog`.
If you want to mention an industry/integration that has no page, use plain text (no link) rather than a broken link.

### 2. Generate the Hero Image

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

### 3. Set Frontmatter Image Fields

Update the MDX frontmatter:
```yaml
heroImage: "/images/blog/<slug>.png"
heroImageAlt: "<descriptive alt text for the generated image>"
```

### 4. Verify

- **Validate internal links FIRST (blocking):** run `npm run check:blog-links <slug>`. This checks every internal link in the post against the routes that actually exist in the repo and fails on any that don't (this is what catches hallucinated links like `/industries/construction`). Fix or unlink anything it flags before continuing. Do not finish the post until this passes.
- Navigate to `/blog` on the dev server and screenshot to confirm the post appears with its image
- Navigate to `/blog/<slug>` and screenshot to confirm the post page renders correctly

## Output

A complete blog post with:
- SEO-optimized MDX content
- AEO-optimized FAQ schema
- Auto-generated editorial hero image
- All frontmatter fields set
- Verified on the blog page
