import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/Button";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies } from "@/data/caseStudies";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "See how real teams use Yonovo to automate collections, reduce DSO, and improve cash flow.",
  alternates: {
    canonical: `${SITE_URL}/case-studies`,
  },
  openGraph: {
    type: "website",
    title: `Case Studies | ${SITE_NAME}`,
    description: "See how real teams use Yonovo to automate collections, reduce DSO, and improve cash flow.",
    url: `${SITE_URL}/case-studies`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `Case Studies | ${SITE_NAME}`,
    description: "See how real teams use Yonovo to automate collections, reduce DSO, and improve cash flow.",
  },
};

export default function CaseStudiesPage() {
  const studies = Object.values(caseStudies);
  const recentArticles = getAllPosts().slice(0, 3);

  return (
    <>
      <NavbarWrapper defaultMode="light" />
      <main className="pt-16 min-h-screen bg-background">
        {/* ── Hero ── */}
        <section className="w-full -mt-16 pt-28 md:pt-32 pb-10 md:pb-12 bg-background">
          <div className="mx-auto max-w-(--container-max-width) px-6">
            <div className="mx-auto flex flex-col items-start gap-4 md:items-center">
              <SectionBadge label="Case Studies" />
              <h1 className="text-balance font-medium text-[42px] text-foreground leading-[1.1] tracking-tight md:text-center md:text-[70px]">
                Why companies choose Yonovo
              </h1>
              <p className="text-base text-secondary tracking-tight md:text-center md:text-xl">
                See how finance teams are automating AR end-to-end without uprooting their systems or workflows.
              </p>
            </div>
          </div>
        </section>

        {/* ── Card Grid ── */}
        <section className="w-full bg-background py-12 md:py-20">
          <div className="mx-auto max-w-(--container-max-width) px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
              {studies.map((study) => (
                <Link key={study.slug} href={`/case-studies/${study.slug}`}>
                  <CaseStudyCard
                    companyName={study.card.companyName}
                    logo={study.card.logo}
                    industry={study.card.industry}
                    title={study.card.title}
                    stats={study.hero.stats.slice(0, 3)}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Articles ── */}
        <section className="w-full bg-background py-12 md:py-20">
          <div className="mx-auto max-w-(--container-max-width) px-6">
            <h2 className="heading-section text-foreground mb-10">
              Related articles
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentArticles.map((post) => (
                <Link
                  key={post.frontmatter.slug}
                  href={`/blog/${post.frontmatter.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:shadow-lg hover:border-border/60"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] w-full bg-[#1a2332]">
                    {post.frontmatter.heroImage ? (
                      <Image
                        src={post.frontmatter.heroImage}
                        alt={post.frontmatter.heroImageAlt || post.frontmatter.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center p-5">
                        <div className="flex h-full w-full items-center justify-center rounded-lg border border-white/10 bg-[#0f1a26]">
                          <svg className="h-12 w-12 text-white/20" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <span className="inline-flex w-fit items-center rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-secondary capitalize">
                      {post.frontmatter.category}
                    </span>
                    <h3 className="heading-card text-foreground line-clamp-2">
                      {post.frontmatter.title}
                    </h3>
                    <div className="h-px w-full bg-border" />
                    <p className="body-sm text-muted line-clamp-3">
                      {post.frontmatter.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="w-full bg-gradient-to-b from-background from-60% to-brand-navy to-60%">
          <div className="mx-auto max-w-[1600px] px-6">
            <div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden border-t border-border bg-white px-6 py-12 pb-30 md:gap-8 md:rounded-3xl md:border md:p-15 lg:p-25">
              <div className="pointer-events-none absolute bottom-0 left-0 h-auto w-[40%] md:h-[40%] md:w-auto lg:h-[50%]">
                <div className="h-[350px] w-[350px] rounded-full bg-brand-blue opacity-70 blur-3xl" />
              </div>
              <div className="pointer-events-none absolute right-0 bottom-0 h-auto w-[40%] md:h-[40%] md:w-auto lg:h-[50%]">
                <div className="h-[350px] w-[350px] rounded-full bg-brand-blue opacity-70 blur-3xl" />
              </div>

              <div className="flex flex-col gap-4 md:max-w-[850px] md:gap-6">
                <p className="text-center font-medium text-4xl text-foreground leading-tight tracking-tighter md:text-balance md:text-5xl lg:text-[54px]">
                  Ready to put collections on autopilot?
                </p>
                <p className="text-center font-normal text-base text-secondary tracking-[-0.4px] md:text-balance md:text-xl">
                  Join the finance teams that are collecting faster, saving hours,
                  and keeping every customer relationship intact.
                </p>
              </div>

              <div className="flex w-full flex-col items-center justify-center gap-6 md:gap-4">
                <div className="flex flex-row items-center gap-6">
                  <Link href="/book-demo">
                    <Button variant="brand" size="md" className="h-14 px-[46px] text-lg font-medium">
                      Book Demo
                    </Button>
                  </Link>
                  <Link href="https://dashboard.yonovo.ai/login">
                    <Button variant="ghost-dark" size="md" className="h-14">
                      Start Free
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-muted text-sm">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 16 17">
                    <path d="M14.66 6.5H1.33M14.66 6.5c0 .28 0 .59 0 .94V9.5M14.66 6.5c-.01-.9-.06-1.44-.29-1.88a2.67 2.67 0 0 0-1.16-1.16C12.63 3.17 11.89 3.17 10.39 3.17H5.59c-1.49 0-2.24 0-2.81.29a2.67 2.67 0 0 0-1.16 1.16c-.22.44-.28.98-.29 1.88M1.33 6.5c0 .28 0 .59 0 .94v2.13c0 1.49 0 2.24.29 2.81.26.5.67.91 1.17 1.17.57.29 1.31.29 2.81.29h2.51M5.99 9.17H3.99" />
                    <path d="M11.25 14.58l1.41-1.41m0 0l1.42-1.42m-1.42 1.42l-1.41-1.42m1.41 1.42l1.42 1.42" />
                  </svg>
                  <p>No card required</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
