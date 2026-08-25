/**
 * Format a frontmatter date for display.
 *
 * Frontmatter dates are plain "YYYY-MM-DD" strings, which `new Date()` parses
 * as UTC midnight. Formatting that in a negative-offset timezone rolls it back
 * a day, so "2026-08-25" rendered as "Aug 24, 2026" for anyone west of GMT.
 *
 * Formatting in UTC pins the output to the date that was actually written, and
 * keeps server and client renders identical regardless of the viewer's zone.
 */
export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
