import type { ReactNode } from "react";

export function GlossarySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="flex flex-col gap-4 scroll-mt-28">
      <h2 className="font-medium text-2xl text-foreground tracking-tight md:text-3xl">{title}</h2>
      {children}
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-base text-secondary leading-relaxed">{children}</p>;
}

export function Formula({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-6 py-6 text-center md:px-8">
      <p className="font-medium text-lg text-foreground md:text-xl">{children}</p>
    </div>
  );
}

export const textLink = "text-brand-blue underline underline-offset-2";
