import Link from "next/link";

type ResourceLink = {
  label: string;
  href: string;
  description: string;
};

export default function RelatedResources({ items }: { items: ResourceLink[] }) {
  return (
    <section className="w-full bg-surface py-12 md:py-16">
      <div className="mx-auto max-w-(--container-max-width) px-6">
        <h2 className="font-medium text-xl text-foreground tracking-tight mb-6">
          Related resources
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col gap-1.5 rounded-xl border border-border bg-background p-5 transition-shadow hover:shadow-md"
            >
              <span className="font-medium text-sm text-foreground group-hover:text-brand-blue transition-colors">
                {item.label}
              </span>
              <span className="text-sm text-secondary leading-relaxed">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
