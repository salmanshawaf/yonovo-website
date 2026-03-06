export default function SectionBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center rounded-full px-4 py-1.5 font-medium text-sm border border-border bg-background text-foreground">
      <div className="mr-2 size-2 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to" />
      {label}
    </div>
  );
}
