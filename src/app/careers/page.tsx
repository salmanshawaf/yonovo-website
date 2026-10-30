import type { Metadata } from "next";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import Link from "next/link";
import { jobs } from "@/data/jobs";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schemas";

const DESCRIPTION =
  "Careers at Yonovo. Open roles building accounts receivable automation for finance teams.";
const PAGE_URL = `${SITE_URL}/careers`;

export const metadata: Metadata = {
  title: "Careers",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    title: `Careers | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Careers | ${SITE_NAME}`,
    description: DESCRIPTION,
    images: ["/og-default.png"],
  },
};

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Careers" }]),
          collectionPageSchema({
            name: `Careers | ${SITE_NAME}`,
            description: DESCRIPTION,
            url: PAGE_URL,
            items: jobs.map((job) => ({
              name: job.title,
              url: `${SITE_URL}/careers/${job.slug}`,
            })),
          }),
        ]}
      />
      <NavbarWrapper defaultMode="light" />
      <main className="flex flex-col pt-[var(--navbar-height)] bg-background">
        <section className="mx-auto flex w-full max-w-3xl flex-col px-6 pt-32 pb-24">
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="font-medium text-4xl text-foreground leading-tight tracking-tight md:text-[54px]">
              Careers
            </h1>
            <p className="max-w-xl text-base text-secondary leading-relaxed md:text-xl">
              We&apos;re a small, bootstrapped team building AI native accounts receivable. Here&apos;s who we&apos;re looking for right now.
            </p>
          </div>

          <div className="mt-16 flex flex-col gap-4">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
              Open roles
            </h2>

            {jobs.length === 0 ? (
              <p className="text-base text-secondary">
                We don&apos;t have any open positions right now.
              </p>
            ) : (
              <ul className="flex flex-col gap-4">
                {jobs.map((job) => (
                  <li key={job.slug}>
                    <Link
                      href={`/careers/${job.slug}`}
                      className="group flex flex-col gap-3 rounded-xl border border-border bg-background p-6 transition-colors hover:border-zinc-300 hover:bg-surface md:flex-row md:items-center md:justify-between md:gap-8"
                    >
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-medium text-foreground md:text-xl">
                          {job.title}
                        </h3>
                        <p className="text-sm text-muted">
                          {job.team} · {job.location} · {job.employmentType}
                        </p>
                        <p className="text-base text-secondary leading-relaxed">
                          {job.summary}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm font-medium text-foreground">
                        View role{" "}
                        <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="mt-12 text-center text-base text-secondary">
            Don&apos;t see a fit but think you&apos;d be great here?{" "}
            <a
              href="mailto:salman@yonovo.com"
              className="font-medium text-foreground underline underline-offset-4 hover:text-brand-blue"
            >
              Introduce yourself
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
