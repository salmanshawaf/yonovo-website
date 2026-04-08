import Link from "next/link";

export default function SidebarCta() {
  return (
    <div className="mt-8 rounded-xl border border-border bg-surface p-5">
      <p className="text-sm font-semibold text-foreground mb-2">
        Automate your collections
      </p>
      <p className="text-sm text-muted mb-4">
        Get paid faster without chasing invoices. Start collecting in minutes.
      </p>
      <Link
        href="/book-demo"
        className="inline-flex w-full items-center justify-center rounded-md bg-brand-green px-4 py-2 text-sm font-medium text-brand-green-text transition-colors hover:bg-brand-green-hover"
      >
        Book Demo
      </Link>
    </div>
  );
}
