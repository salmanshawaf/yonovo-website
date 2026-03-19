/**
 * Blog Hero Image Generator
 *
 * Usage:
 *   npx tsx scripts/generate-blog-image.ts "<slug>" "<topic prompt>" [composition]
 *
 * Compositions: collage, hero, sidebyside, flow, scattered, comparison
 * Default: collage
 *
 * Example:
 *   npx tsx scripts/generate-blog-image.ts "how-to-reduce-dso" "Reducing payment time. Objects: downward chart, clock, invoices, dollar coin, calendar." "hero"
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Missing GEMINI_API_KEY in .env.local");
  process.exit(1);
}

/* ── Brand style prompt (constant across all posts) ── */
const STYLE_PROMPT = `Bold editorial illustration for a blog hero image. CRITICAL: No text, no words, no letters, no numbers, no dates, no labels, no captions anywhere in the image. Calendars must be blank with no numbers. Documents must have abstract lines instead of text.

Style: Modern graphic illustration with thick dark outlines on all shapes. Include organic soft blob shapes in the background in very light gray for depth and warmth. The feel should be bold, confident, and editorial, like a magazine illustration.

Colors: Dark navy blue for outlines and primary shapes. Royal blue for accent elements. Coral red used sparingly for one or two small highlights. White for surfaces. Allow natural object colors where appropriate (like green for money-related objects, gold for coins). Keep the background white with subtle light gray organic blob shapes.

The image MUST be a wide landscape rectangle, significantly wider than it is tall.
`;

/* ── Composition instructions ── */
const COMPOSITIONS: Record<string, string> = {
  collage: `Composition: Stack 4-6 relevant objects overlapping each other in a playful collage arrangement. Objects should be bold and slightly oversized. Asymmetric layout with depth from overlapping.`,

  hero: `Composition: One large dominant object takes up the center of the image. 3-4 smaller accent objects float around it at different distances, some partially visible at edges. The hero object should be detailed and bold, the accents simpler.`,

  sidebyside: `Composition: Two groups of objects on the left and right sides of the image with space between them, suggesting a relationship or exchange. A connecting element like an arrow or bridge links them. Balanced but not symmetrical.`,

  flow: `Composition: Objects arranged in a left-to-right flow showing a process or sequence. Connected by arrows or dotted lines. 3-4 objects spaced across the width. Each object slightly overlaps the connection line.`,

  scattered: `Composition: 5-6 objects floating freely across the canvas with generous space between them. Different sizes and slight rotations give energy. No overlapping. Objects feel like they are orbiting around an invisible center point.`,

  comparison: `Composition: Two large screen or panel shapes side by side, each containing different chart or dashboard elements. A central connecting element like a gear, lightning bolt, or circular arrow sits between them. The two panels should look distinct but related, suggesting a comparison or integration between two systems.`,
};

async function generateImage(slug: string, topicPrompt: string, composition: string) {
  const compositionInstruction = COMPOSITIONS[composition] || COMPOSITIONS.collage;
  const fullPrompt = `${STYLE_PROMPT}\n${compositionInstruction}\n\n${topicPrompt}`;

  console.log(`Generating image for "${slug}"...`);
  console.log(`Composition: ${composition}`);
  console.log(`Topic: ${topicPrompt}\n`);

  // Use Imagen 4.0 (correct 16:9 aspect ratio)
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instances: [{ prompt: fullPrompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: "16:9",
        },
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error(`API error (${response.status}):`, errText);
    process.exit(1);
  }

  const data = await response.json();

  // Imagen 4.0 returns predictions array
  const predictions = data.predictions;
  if (!predictions || predictions.length === 0) {
    console.error("No predictions in response");
    console.error(JSON.stringify(data, null, 2).substring(0, 1000));
    process.exit(1);
  }

  const imageData = predictions[0].bytesBase64Encoded;
  if (!imageData) {
    console.error("No image data in prediction");
    console.error(JSON.stringify(predictions[0], null, 2).substring(0, 500));
    process.exit(1);
  }

  const imagePart = { inlineData: { data: imageData } };

  // Save raw image first
  const outputDir = path.join(process.cwd(), "public", "images", "blog");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `${slug}.png`);
  const imageBuffer = Buffer.from(imagePart.inlineData.data, "base64");
  fs.writeFileSync(outputPath, imageBuffer);

  const finalSize = imageBuffer.length;
  console.log(`Image saved to: ${outputPath}`);
  console.log(`Size: ${(finalSize / 1024).toFixed(1)} KB`);
}

// Parse CLI args
const [slug, topicPrompt, composition = "collage"] = process.argv.slice(2);

if (!slug || !topicPrompt) {
  console.error(
    'Usage: npx tsx scripts/generate-blog-image.ts "<slug>" "<topic prompt>" [composition]'
  );
  console.error("Compositions: collage, hero, sidebyside, flow, scattered, comparison");
  process.exit(1);
}

generateImage(slug, topicPrompt, composition);
