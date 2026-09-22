import Image from "next/image";
/* Product-UI cards shared by the home hero and the industry page heroes.
   Pure server components: no client JS beyond Tailwind's animate-pulse. */

export const CARD_BASE =
  "rounded-2xl bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)] ring-1 ring-black/[0.06]";
export const CARD = `${CARD_BASE} p-5`;

/* Lighter chrome for cards sitting on a white section rather than the dark hero gradient. */
export const CARD_LIGHT_BASE =
  "rounded-2xl bg-white shadow-[0_12px_32px_-12px_rgba(12,39,86,0.18)] ring-1 ring-black/[0.06]";
export const CARD_LIGHT = `${CARD_LIGHT_BASE} p-5`;

export function ClientAgentCard({ status = "Reading your AR" }: { status?: string }) {
  return (
    <div className="flex h-full flex-col items-center gap-3 py-1">
      {/* Connection row: generic AI assistant ·· MCP ·· Yonovo Y hub */}
      <div className="mx-auto flex w-full max-w-[300px] items-start justify-center">
        {/* AI assistant node — Claude mark, generic label */}
        <div className="flex shrink-0 flex-col items-center gap-1">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e4e0] bg-white shadow-sm">
            <img src="/claude-icon.svg" alt="AI assistant" className="h-[22px] w-[22px]" />
          </div>
          <span className="text-[8.5px] font-medium text-[#8a8a87]">AI assistant</span>
        </div>

        {/* Dashed connector with centered MCP micro-label */}
        <div className="relative mt-[22px] flex flex-1 items-center px-1">
          <div className="h-0 w-full border-t-[1.5px] border-dashed border-[#c0bfbb]" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e5e4e0] bg-white px-1.5 py-[1px] text-[7.5px] font-semibold tracking-wide text-[#6b6b68] shadow-sm">
            MCP
          </span>
        </div>

        {/* Yonovo node — brand Y icon */}
        <div className="flex shrink-0 flex-col items-center gap-1">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#e5e4e0] bg-white shadow-sm">
            <Image src="/yonovo-icon.png" alt="Yonovo" width={52} height={52} className="h-[52px] w-[52px] max-w-none" />
          </div>
          <span className="text-[8.5px] font-medium text-[#8a8a87]">Yonovo</span>
        </div>
      </div>

      {/* Thinking indicator: three staggered pulsing dots + ONE short label */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-navy animate-pulse" style={{ animationDelay: "0ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-brand-navy animate-pulse" style={{ animationDelay: "150ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-brand-navy animate-pulse" style={{ animationDelay: "300ms" }} />
        </span>
        <span className="text-[11px] font-medium text-zinc-600">{status}</span>
      </div>

      {/* Connected status pill (reuses the FitsInMockup idiom) */}
      <div className="flex items-center gap-1.5 rounded-full border border-[#e5e4e0] bg-white px-2.5 py-1 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2d8a4e]" />
        <span className="text-[9px] font-medium text-[#3a3a38]">Connected</span>
      </div>
    </div>
  );
}

export type ReplyCardContent = {
  customer?: string;
  incoming?: string;
  draft?: string;
  attachment?: string;
};

export function ReplyCard({
  customer = "Atlas Security Partners",
  incoming = "Perfect. Once the invoice shows our PO number we can release the full balance on Friday.",
  draft = "All set. I have added your PO number to invoice #2041 and attached the corrected copy, so you are clear to release payment Friday.",
  attachment = "Invoice #2041 (updated).pdf",
}: ReplyCardContent) {
  return (
    <div className="flex h-full flex-1 flex-col gap-3">
      {/* Header — one quiet line */}
      <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
        <span className="font-semibold text-zinc-500">✉ Customer reply</span>
        <span>·</span>
        <span>{customer}</span>
      </div>

      {/* Incoming customer message — light, no box ring */}
      <p className="border-l-2 border-zinc-200 pl-3 text-[12px] leading-relaxed text-zinc-500">
        {incoming}
      </p>

      <div className="border-t border-zinc-100" />

      {/* AI draft — Yonovo has already done the work */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-blue">
          AI reply draft
        </span>
        <p className="text-[12px] leading-relaxed text-zinc-700">
          {draft}
        </p>

        {/* Attachment chip — makes "work is done" tangible */}
        <div className="flex w-fit items-center gap-2 rounded-lg border border-[#e5e4e0] bg-white px-2.5 py-1.5">
          <svg className="h-4 w-4 shrink-0 text-[#c53030]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
          </svg>
          <span className="text-[10.5px] font-medium text-zinc-700">{attachment}</span>
          <svg className="h-3.5 w-3.5 shrink-0 text-[#2d8a4e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      {/* Actions — framed as ready to send */}
      <div className="mt-auto flex flex-col gap-2 pt-1">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap rounded-md bg-brand-navy px-2.5 py-1.5 text-[10.5px] font-semibold text-white">
            Approve &amp; send
          </span>
          <span className="whitespace-nowrap rounded-md px-2.5 py-1.5 text-[10.5px] font-medium text-zinc-700 ring-1 ring-zinc-200">
            Edit
          </span>
        </div>
        <span className="flex items-center gap-1 whitespace-nowrap text-[9.5px] font-medium text-zinc-500">
          <span className="h-1 w-1 rounded-full bg-amber-400" />
          Human review required
        </span>
      </div>
    </div>
  );
}
