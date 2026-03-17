type CalloutProps = {
  type?: "info" | "warning" | "tip";
  children: React.ReactNode;
};

const styles = {
  info: {
    border: "border-blue-200",
    bg: "bg-blue-50",
    icon: "text-blue-500",
    iconPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  warning: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    icon: "text-amber-500",
    iconPath: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  },
  tip: {
    border: "border-brand-green/30",
    bg: "bg-brand-green/5",
    icon: "text-brand-green",
    iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
};

export default function Callout({ type = "info", children }: CalloutProps) {
  const s = styles[type];

  return (
    <div className={`my-6 rounded-lg border ${s.border} ${s.bg} p-4`}>
      <div className="flex gap-3">
        <svg className={`mt-0.5 h-5 w-5 shrink-0 ${s.icon}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={s.iconPath} />
        </svg>
        <div className="text-sm leading-relaxed text-foreground [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}
