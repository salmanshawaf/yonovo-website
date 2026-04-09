"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import SectionBadge from "@/components/SectionBadge";
import type { CaseStudyData } from "@/data/caseStudies";

/* ── Blockquote ── */

function QuoteBlock({
  text,
  author,
  role,
}: {
  text: string;
  author: string;
  role: string;
}) {
  return (
    <blockquote
      className="rounded-2xl p-8 md:p-10 my-2"
      style={{ background: "linear-gradient(135deg, #0c2756 0%, #203a7f 50%, #e13f3f 100%)" }}
    >
      <p className="font-semibold text-white text-base leading-relaxed md:text-lg">
        &ldquo;{text}&rdquo;
      </p>
      <footer className="mt-4 text-sm font-medium text-white/70">
        {author}, {role}
      </footer>
    </blockquote>
  );
}

/* ── Template ── */

export default function CaseStudyPageTemplate({
  data,
}: {
  data: CaseStudyData;
}) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const ids = data.sections.map((s) => s.id);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [data.sections]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="w-full -mt-16 pt-28 md:pt-32 pb-12 md:pb-16 bg-background">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          {/* Back link */}
          <Link
            href="/case-studies"
            aria-label="Go back to case studies"
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-foreground transition-colors mb-10"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 12H5m0 0l7 7m-7-7l7-7"
              />
            </svg>
            Back to Case Studies
          </Link>

          {/* Two-column: Title + Logo */}
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            {/* Left — Title + summary */}
            <div className="flex flex-1 flex-col gap-6">
              <p className="text-sm text-secondary">
                {data.hero.date} &bull; {data.hero.readTime}
              </p>
              <h1 className="font-medium text-[36px] text-foreground leading-[1.15] tracking-tight md:text-[52px]">
                {data.card.title}
              </h1>
              <p className="text-base text-secondary leading-relaxed md:text-lg lg:w-[90%]">
                {data.card.summary}
              </p>

            </div>

            {/* Right — Company hero card */}
            <div className="w-full lg:w-[540px] shrink-0">
              <div className="relative mr-8">
                {/* Logo area — offset left so profile pic extends to container edge */}
                <div className="flex items-center justify-center rounded-2xl bg-white border border-border w-full h-[340px] md:h-[420px]">
                  <Image
                    src={data.card.logo.src}
                    alt={data.card.companyName}
                    width={data.card.logo.width}
                    height={data.card.logo.height}
                    className="w-[59%] h-auto object-contain"
                  />
                </div>
                {/* Contact photo — sticker overlapping bottom-right edge */}
                {data.contact && (
                  <div className="absolute -bottom-8 -right-8 flex flex-col items-center">
                    <Image
                      src={data.contact.photo}
                      alt={data.contact.name}
                      width={96}
                      height={96}
                      className="h-28 w-28 rounded-lg object-cover shadow-lg border-2 border-white"
                    />
                  </div>
                )}
              </div>
              {/* Name + title below */}
              {data.contact && (
                <div className="mt-12 text-right">
                  <p className="font-medium text-sm text-foreground">{data.contact.name}</p>
                  <p className="text-xs text-secondary">{data.contact.title}</p>
                </div>
              )}
            </div>
          </div>

          {/* Full-width Results Stats Bar */}
          <div className="mt-4 flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-widest text-secondary uppercase">Results</p>
            <div className="rounded-2xl bg-surface p-8 md:p-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border">
              {data.hero.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2 sm:px-8 first:sm:pl-0 last:sm:pr-0">
                  <span className="font-medium text-5xl text-foreground tracking-tight md:text-6xl">
                    {stat.value}
                  </span>
                  <span className="text-base text-secondary leading-snug md:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Body: Sidebar + Content ── */}
      <section className="w-full bg-background py-12 md:py-20">
        <div className="mx-auto max-w-(--container-max-width) px-6">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            {/* Left sidebar — sticky */}
            <aside className="w-full shrink-0 lg:w-[320px] lg:sticky lg:top-24 lg:self-start">
              {/* Company profile card */}
              {data.profile && (
                <>
                  <div className="rounded-2xl border border-border bg-white p-6 flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-secondary">Industry</span>
                        <span className="text-sm text-foreground">{data.profile.industry}</span>
                      </div>
                      {data.profile.employees && (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold text-secondary">Company size</span>
                          <span className="text-sm text-foreground">{data.profile.employees}</span>
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-secondary">Offices</span>
                        <span className="text-sm text-foreground">{data.profile.offices}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-secondary">Integrated with Yonovo</span>
                        <span className="text-sm text-foreground">{data.profile.integration}</span>
                      </div>
                      {data.profile.about && (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold text-secondary">About the company</span>
                          <span className="text-sm text-secondary leading-relaxed">{data.profile.about}</span>
                        </div>
                      )}
                  </div>
                  <div className="my-6 h-px w-full bg-border" />
                </>
              )}

              {/* Table of contents */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
                  Table of Contents
                </p>
                <nav className="flex flex-col gap-1">
                  {data.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`block border-l-[3px] py-2 pl-4 text-sm leading-snug transition-colors ${
                        activeSection === section.id
                          ? "border-brand-blue text-brand-blue font-medium"
                          : "border-transparent text-secondary hover:text-foreground"
                      }`}
                    >
                      {section.tocLabel || section.heading}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Divider */}
              <div className="my-6 h-px w-full bg-border" />

              {/* Share */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-secondary">Share with others</span>
                <div className="flex items-center gap-2">
                  {/* LinkedIn */}
                  <button aria-label="Share on LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-secondary hover:text-foreground hover:border-foreground transition-colors">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                  {/* Email */}
                  <button aria-label="Share via email" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-secondary hover:text-foreground hover:border-foreground transition-colors">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 h-px w-full bg-border" />

            </aside>

            {/* Right — Article content */}
            <article className="flex-1 min-w-0">
              <div className="flex flex-col gap-10">
                {/* Intro summary */}
                <p className="body-lg text-foreground leading-relaxed">
                  {data.card.summary}
                </p>

                {/* Sections */}
                {data.sections.map((section) => (
                  <div key={section.id} id={section.id} className="scroll-mt-24">
                    <h2 className="font-medium text-[28px] text-foreground leading-tight tracking-tight mb-6 md:text-[36px]">
                      {section.heading}
                    </h2>
                    <div className="flex flex-col gap-5">
                      {section.content.map((block, i) => {
                        if (block.type === "quote") {
                          return (
                            <QuoteBlock
                              key={i}
                              text={block.text}
                              author={block.author}
                              role={block.role}
                            />
                          );
                        }
                        return (
                          <p
                            key={i}
                            className="text-base text-secondary leading-relaxed md:text-lg"
                          >
                            {block.text}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full bg-gradient-to-b from-surface from-60% to-brand-navy to-60%">
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
                {data.cta.headline}
              </p>
              <p className="text-center font-normal text-base text-secondary tracking-[-0.4px] md:text-balance md:text-xl">
                {data.cta.description}
              </p>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-6 md:gap-4">
              <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-6">
                <Link href="/book-demo" className="w-full sm:w-auto">
                  <Button
                    variant="brand"
                    size="md"
                    className="h-14 w-full px-[46px] text-lg font-medium sm:w-auto"
                  >
                    Book Demo
                  </Button>
                </Link>
                <Link href="https://dashboard.yonovo.ai/login" className="w-full sm:w-auto">
                  <Button variant="ghost-dark" size="md" className="h-14 w-full sm:w-auto">
                    Start Free
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-2 text-muted text-sm">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 16 17"
                >
                  <path d="M14.66 6.5H1.33M14.66 6.5c0 .28 0 .59 0 .94V9.5M14.66 6.5c-.01-.9-.06-1.44-.29-1.88a2.67 2.67 0 0 0-1.16-1.16C12.63 3.17 11.89 3.17 10.39 3.17H5.59c-1.49 0-2.24 0-2.81.29a2.67 2.67 0 0 0-1.16 1.16c-.22.44-.28.98-.29 1.88M1.33 6.5c0 .28 0 .59 0 .94v2.13c0 1.49 0 2.24.29 2.81.26.5.67.91 1.17 1.17.57.29 1.31.29 2.81.29h2.51M5.99 9.17H3.99" />
                  <path d="M11.25 14.58l1.41-1.41m0 0l1.42-1.42m-1.42 1.42l-1.41-1.42m1.41 1.42l1.42 1.42" />
                </svg>
                <p>No card required</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
