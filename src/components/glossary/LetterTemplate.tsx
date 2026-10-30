"use client";

import { useState } from "react";

export default function LetterTemplate({
  title,
  subject,
  body,
}: {
  title: string;
  subject?: string;
  body: string;
}) {
  const [copied, setCopied] = useState(false);
  const text = subject ? `Subject: ${subject}\n\n${body}` : body;

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-medium text-lg text-foreground tracking-tight">{title}</h3>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-brand-blue"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {subject && (
        <p className="text-sm text-foreground">
          <span className="font-medium">Subject: </span>
          {subject}
        </p>
      )}
      <pre className="whitespace-pre-wrap font-sans text-sm text-secondary leading-relaxed">{body}</pre>
    </div>
  );
}
