import Link from "next/link";

export default function ChangelogBackNav() {
  return (
    <Link
      href="/changelog"
      className="inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-foreground"
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
      Back to Changelog
    </Link>
  );
}
