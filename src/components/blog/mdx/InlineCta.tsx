import Link from "next/link";

type InlineCtaProps = {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
};

export default function InlineCta({
  title = "Automate your collections",
  description = "See how Yonovo can help your team collect faster.",
  href = "https://app.yonovo.ai/",
  label = "Start Free",
}: InlineCtaProps) {
  return (
    <div className="my-8 flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-6 text-center sm:flex-row sm:text-left">
      <div className="flex-1">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center justify-center rounded-md bg-brand-green px-5 py-2.5 text-sm font-medium text-brand-green-text transition-colors hover:bg-brand-green-hover"
      >
        {label}
      </Link>
    </div>
  );
}
