export default function SectionBadge({ label, variant = "light" }: { label: string; variant?: "light" | "dark" }) {
  const baseClasses = "inline-flex w-fit items-center rounded-full px-4 py-1.5 font-medium text-sm";
  const variantClasses = variant === "dark"
    ? "border border-white/30 text-white"
    : "border border-border bg-background text-foreground";

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      <div className="mr-2 size-2 rounded-full bg-brand-red" />
      {label}
    </div>
  );
}
