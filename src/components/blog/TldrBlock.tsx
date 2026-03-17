export default function TldrBlock({ text }: { text: string }) {
  return (
    <div className="mb-8 rounded-xl border border-brand-green/20 bg-brand-green/5 p-5">
      <div className="mb-2 flex items-center gap-2">
        <svg className="h-4 w-4 text-brand-green" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-semibold text-brand-green">TL;DR</span>
      </div>
      <p className="text-sm leading-relaxed text-foreground">{text}</p>
    </div>
  );
}
