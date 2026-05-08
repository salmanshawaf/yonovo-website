"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;
  slug: string;
  companyName: string;
};

export default function DownloadCaseStudyModal({
  open,
  onClose,
  pdfUrl,
  slug,
  companyName,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setErrorMsg("");
    }
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim(),
      slug,
      companyName,
    };

    try {
      const res = await fetch("/api/case-study-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-case-study-title"
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close download form"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative w-full sm:w-[440px] max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-secondary transition-colors hover:bg-surface hover:text-foreground"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="flex flex-col gap-5 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/20">
              <svg className="h-6 w-6 text-brand-green-text" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h2 id="download-case-study-title" className="text-2xl font-medium text-foreground tracking-tight">
                Your PDF is ready
              </h2>
              <p className="text-sm text-secondary leading-relaxed">
                Thanks. You can download the {companyName} case study below.
              </p>
            </div>
            <a
              href={pdfUrl}
              download
              className="block"
              onClick={() => setTimeout(onClose, 300)}
            >
              <Button variant="brand" size="md" className="h-12 w-full text-base font-medium">
                Download PDF
              </Button>
            </a>
          </div>
        ) : (
          <form className="flex flex-col gap-5 p-8" onSubmit={handleSubmit} noValidate={false}>
            <div className="flex flex-col gap-2 pr-8">
              <h2 id="download-case-study-title" className="text-2xl font-medium text-foreground tracking-tight">
                Get the {companyName} case study
              </h2>
              <p className="text-sm text-secondary leading-relaxed">
                Tell us a bit about you and we will email you the full PDF.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-foreground">Full name</span>
                <input
                  ref={firstFieldRef}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="rounded-md border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-secondary focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  placeholder="Jane Doe"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-foreground">Work email</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="rounded-md border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-secondary focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  placeholder="jane@company.com"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-foreground">Company</span>
                <input
                  name="company"
                  type="text"
                  required
                  autoComplete="organization"
                  className="rounded-md border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-secondary focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  placeholder="Acme Inc."
                />
              </label>
            </div>

            {status === "error" && (
              <p className="rounded-md bg-brand-red/10 px-3 py-2 text-sm text-brand-red">
                {errorMsg}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={status === "submitting"}
              className="h-12 w-full text-base font-medium disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Get the PDF"}
            </Button>

            <p className="text-xs text-secondary leading-relaxed">
              By downloading, you agree to receive occasional product updates from Yonovo. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
