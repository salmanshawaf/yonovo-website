import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";
import { jobs, getJob, applyHref, type Job, type JobBlock, type JobItem } from "@/data/jobs";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  const url = `${SITE_URL}/careers/${job.slug}`;
  const title = `${job.shortTitle} | Careers at ${SITE_NAME}`;
  const ogImage = "/og-default.png";
  return {
    title: { absolute: title },
    description: job.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description: job.summary,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: job.summary,
      images: [ogImage],
    },
  };
}

function itemText(item: JobItem): string {
  return item.lead ? `${item.lead} ${item.text}` : item.text;
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Google Jobs wants the full description as simple HTML. */
function descriptionHtml(job: Job): string {
  const parts: string[] = [`<p>${escapeHtml(job.hook)}</p>`];
  for (const section of job.sections) {
    parts.push(`<h2>${escapeHtml(section.heading)}</h2>`);
    for (const block of section.blocks) {
      if (block.type === "paragraph") parts.push(`<p>${escapeHtml(block.text)}</p>`);
      if (block.type === "bullets" || block.type === "numbered") {
        const tag = block.type === "bullets" ? "ul" : "ol";
        parts.push(`<${tag}>${block.items.map((i) => `<li>${escapeHtml(itemText(i))}</li>`).join("")}</${tag}>`);
      }
      if (block.type === "table") {
        parts.push(`<ul>${block.rows.map(([a, b]) => `<li>${escapeHtml(`${a}: ${b}`)}</li>`).join("")}</ul>`);
      }
    }
  }
  parts.push(`<p>${escapeHtml(job.closer)}</p>`);
  return parts.join("");
}

function jobPostingSchema(job: Job) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: descriptionHtml(job),
    datePosted: job.datePosted,
    validThrough: `${job.validThrough}T23:59:59-05:00`,
    employmentType: "FULL_TIME",
    directApply: false,
    url: `${SITE_URL}/careers/${job.slug}`,
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
      logo: `${SITE_URL}/yonovo-logo.png`,
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: { "@type": "Country", name: "Canada" },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Toronto",
        addressRegion: "ON",
        addressCountry: "CA",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: job.salary.currency,
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salary.min,
        maxValue: job.salary.max,
        unitText: "YEAR",
      },
    },
  };
}

function Lead({ item }: { item: JobItem }) {
  return (
    <>
      {item.lead && <strong className="font-medium text-foreground">{item.lead}</strong>}
      {item.lead ? " " : ""}
      {item.text}
    </>
  );
}

function Block({ block }: { block: JobBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-base text-secondary leading-relaxed md:text-lg">{block.text}</p>;
    case "bullets":
      return (
        <ul className="flex list-disc flex-col gap-3 pl-5 text-base text-secondary leading-relaxed marker:text-muted md:text-lg">
          {block.items.map((item, i) => (
            <li key={i}>
              <Lead item={item} />
            </li>
          ))}
        </ul>
      );
    case "numbered":
      return (
        <ol className="flex list-decimal flex-col gap-3 pl-5 text-base text-secondary leading-relaxed marker:text-muted md:text-lg">
          {block.items.map((item, i) => (
            <li key={i}>
              <Lead item={item} />
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-base">
            <thead className="bg-surface">
              <tr>
                {block.head.map((h) => (
                  <th key={h} className="px-5 py-3 text-sm font-medium text-muted">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map(([label, value]) => (
                <tr key={label} className="border-t border-border">
                  <td className="px-5 py-4 font-medium text-foreground">{label}</td>
                  <td className="px-5 py-4 text-secondary">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

function ApplyButton({ job }: { job: Job }) {
  return (
    <a href={applyHref(job)}>
      <Button variant="brand" size="md" className="h-14 px-[46px] text-lg font-medium">
        Apply for this role
      </Button>
    </a>
  );
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Careers", href: "/careers" },
            { name: job.title },
          ]),
          jobPostingSchema(job),
        ]}
      />
      <NavbarWrapper defaultMode="light" />
      <main className="flex flex-col pt-[var(--navbar-height)] bg-background">
        <article className="mx-auto flex w-full max-w-3xl flex-col px-6 pt-28 pb-24">
          <Link href="/careers" className="text-sm font-medium text-muted hover:text-foreground">
            <span aria-hidden>←</span> All roles
          </Link>

          <header className="mt-8 flex flex-col gap-5 border-b border-border pb-10">
            <p className="text-sm text-muted">
              {job.team} · {job.location} · {job.employmentType}
            </p>
            <h1 className="font-medium text-4xl text-foreground leading-tight tracking-tight md:text-5xl">
              {job.title}
            </h1>
            <p className="text-lg text-foreground leading-relaxed md:text-xl">{job.hook}</p>
            <dl className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="text-muted">Base</dt>
                <dd className="font-medium text-foreground">{job.salary.base}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted">OTE</dt>
                <dd className="font-medium text-foreground">{job.salary.ote}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted">Equity</dt>
                <dd className="font-medium text-foreground">Yes</dd>
              </div>
            </dl>
            <div className="pt-2">
              <ApplyButton job={job} />
            </div>
          </header>

          <div className="flex flex-col gap-12 pt-12">
            {job.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-5">
                <h2 className="text-2xl font-medium text-foreground tracking-tight md:text-3xl">
                  {section.heading}
                </h2>
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </section>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start gap-6 rounded-2xl bg-surface p-8 md:p-10">
            <p className="text-xl font-medium text-foreground md:text-2xl">{job.closer}</p>
            <p className="text-base text-secondary">
              Email your resume and LinkedIn to{" "}
              <a href={applyHref(job)} className="font-medium text-foreground underline underline-offset-4">
                {job.applyEmail}
              </a>
              .
            </p>
            <ApplyButton job={job} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
