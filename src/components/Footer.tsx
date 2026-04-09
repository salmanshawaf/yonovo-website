"use client";

import { useState } from "react";

const integrationLinks = [
  { label: "QuickBooks", href: "/solutions/quickbooks" },
  { label: "Xero", href: "/solutions/xero" },
  { label: "Odoo", href: "/solutions/odoo" },
  { label: "NetSuite", href: "/solutions/netsuite" },
  { label: "Sage Intacct", href: "/solutions/sage" },
];

const resourceLinks = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact us", href: "mailto:salman@yonovo.com" },
  { label: "Blog", href: "/blog" },
  { label: "Changelog", href: "/changelog" },
];

const mobileResourceLinks = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Changelog", href: "/changelog" },
  { label: "Contact us", href: "mailto:salman@yonovo.com" },
];

const industryLinks = [
  { label: "Wholesale & Distribution", href: "/industries/wholesale-distribution" },
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Professional Services", href: "/industries/professional-services" },
  { label: "Property Management", href: "/industries/property-management" },
  { label: "Gyms & Fitness", href: "/industries/gyms-fitness" },
];

const companyLinks = [
  { label: "Careers", href: "/careers" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of service", href: "/terms-of-service" },
];

const linkSections = [
  { title: "INTEGRATIONS", links: integrationLinks },
  { title: "AR AUTOMATION FOR", links: industryLinks },
  { title: "RESOURCES", links: resourceLinks },
  { title: "COMPANY", links: companyLinks },
];

const mobileLinkSections = [
  { title: "INTEGRATIONS", links: integrationLinks },
  { title: "AR AUTOMATION FOR", links: industryLinks },
  { title: "RESOURCES", links: mobileResourceLinks },
  { title: "COMPANY", links: companyLinks },
];

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 7.5L10 12.5L15 7.5" />
    </svg>
  );
}

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <footer className="text-white bg-brand-navy">
      <div className="mx-auto max-w-(--container-max-width) px-6 pt-28 pb-12">

        {/* ===== MOBILE LAYOUT (below md) ===== */}
        <div className="flex flex-col items-center md:hidden">
          {/* Logo */}
          <a href="/">
            <img src="/yonovo-logo-white.png" alt="Yonovo" className="h-4 w-auto" />
          </a>

          {/* Copyright */}
          <p className="mt-4 text-center font-medium text-zinc-400 leading-5">
            &copy; 2026 Yonovo, Inc.
          </p>

          {/* Contact button */}
          <a href="mailto:salman@yonovo.com" className="mt-8 w-full">
            <button className="flex h-12 w-full items-center justify-center rounded-lg bg-white font-medium text-base text-brand-navy transition-all duration-200 hover:bg-zinc-200">
              Contact
            </button>
          </a>

          {/* Social icons row */}
          <div className="mt-4 grid w-full grid-cols-2 gap-4">
            <a href="https://www.linkedin.com/company/yonovoai" target="_blank" rel="noopener noreferrer">
              <button className="flex h-12 w-full items-center justify-center rounded-lg border border-white/20 text-white transition-all duration-200 hover:bg-white/10" aria-label="LinkedIn">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </button>
            </a>
            <a href="https://www.youtube.com/@TractionFM" target="_blank" rel="noopener noreferrer">
              <button className="flex h-12 w-full items-center justify-center rounded-lg border border-white/20 text-white transition-all duration-200 hover:bg-white/10" aria-label="YouTube">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a2.966 2.966 0 00-2.084-2.084C19.654 3.333 12 3.333 12 3.333s-7.654 0-9.414.769A2.966 2.966 0 00.502 6.186C0 8.102 0 12 0 12s0 3.898.502 5.814a2.966 2.966 0 002.084 2.084c1.76.769 9.414.769 9.414.769s7.654 0 9.414-.769a2.966 2.966 0 002.084-2.084C24 15.898 24 12 24 12s0-3.898-.502-5.814zM9.545 15.568v-7.136L15.545 12l-6 3.568z" />
                </svg>
              </button>
            </a>
          </div>

          {/* Accordion sections */}
          <div className="mt-12 w-full">
            {mobileLinkSections.map((section) => (
              <div key={section.title} className="border-b border-white/20">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="font-semibold text-sm text-zinc-50 tracking-widest">
                    {section.title}
                  </span>
                  <ChevronDown
                    className={`text-zinc-400 transition-transform duration-200 ${
                      openSection === section.title ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-200 ${
                    openSection === section.title
                      ? "grid-rows-[1fr] opacity-100 pb-5"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-3">
                      {section.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="font-medium text-sm text-zinc-400 transition-colors duration-200 ease-in-out hover:text-white"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== DESKTOP LAYOUT (md+) ===== */}
        <div className="hidden md:flex md:flex-row md:justify-between">
          {/* Left column */}
          <div className="flex flex-col items-start gap-8">
            <div className="flex flex-col items-start gap-4">
              <a href="/"><img src="/yonovo-logo-white.png" alt="Yonovo" className="h-4 w-auto" /></a>
              <p className="text-left font-medium text-zinc-400 leading-5">
                &copy; 2026 Yonovo, Inc.
              </p>
            </div>

            <div className="grid w-auto grid-cols-6 gap-4">
              <a href="mailto:salman@yonovo.com" className="contents">
                <button className="col-span-2 flex h-11 items-center justify-center rounded-md border border-white/20 bg-transparent px-5 py-3 font-medium text-base text-white transition-all duration-200 hover:bg-white/10">
                  Contact
                </button>
              </a>
              <a href="https://www.linkedin.com/company/yonovoai" target="_blank" rel="noopener noreferrer" className="contents">
                <button className="col-span-1 flex h-11 items-center justify-center rounded-md border border-white/20 p-3 text-white transition-all duration-200 hover:bg-white/10" aria-label="LinkedIn">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </button>
              </a>
              <a href="https://www.youtube.com/@TractionFM" target="_blank" rel="noopener noreferrer" className="contents">
                <button className="col-span-1 flex h-11 items-center justify-center rounded-md border border-white/20 p-3 text-white transition-all duration-200 hover:bg-white/10" aria-label="YouTube">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a2.966 2.966 0 00-2.084-2.084C19.654 3.333 12 3.333 12 3.333s-7.654 0-9.414.769A2.966 2.966 0 00.502 6.186C0 8.102 0 12 0 12s0 3.898.502 5.814a2.966 2.966 0 002.084 2.084c1.76.769 9.414.769 9.414.769s7.654 0 9.414-.769a2.966 2.966 0 002.084-2.084C24 15.898 24 12 24 12s0-3.898-.502-5.814zM9.545 15.568v-7.136L15.545 12l-6 3.568z" />
                  </svg>
                </button>
              </a>
            </div>
          </div>

          {/* Right columns — Links */}
          <div className="flex gap-10 lg:gap-24 xl:gap-32">
            <div className="flex flex-col gap-4">
              <h6 className="font-semibold text-sm text-zinc-50 capitalize tracking-widest">
                INTEGRATIONS
              </h6>
              {integrationLinks.map((link) => (
                <a key={link.label} href={link.href} className="font-medium text-sm text-zinc-400 transition-colors duration-200 ease-in-out hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="font-semibold text-sm text-zinc-50 capitalize tracking-widest whitespace-nowrap">
                AR AUTOMATION FOR
              </h6>
              {industryLinks.map((link) => (
                <a key={link.label} href={link.href} className="font-medium text-sm text-zinc-400 transition-colors duration-200 ease-in-out hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="font-semibold text-sm text-zinc-50 capitalize tracking-widest">
                RESOURCES
              </h6>
              {resourceLinks.map((link) => (
                <a key={link.label} href={link.href} className="font-medium text-sm text-zinc-400 transition-colors duration-200 ease-in-out hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="font-semibold text-sm text-zinc-50 capitalize tracking-widest">
                COMPANY
              </h6>
              {companyLinks.map((link) => (
                <a key={link.label} href={link.href} className="font-medium text-sm text-zinc-400 transition-colors duration-200 ease-in-out hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
