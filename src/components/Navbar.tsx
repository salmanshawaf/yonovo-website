"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

const useCases = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: "Customer Support Agent",
    description: "Instant answers, lower volume, fewer escalations",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Sales Agent",
    description: "Qualify leads, answer questions, and book meetings",
  },
];

const industries = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    title: "Ecommerce & Retail",
    description: "Product questions, shipping, and returns",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: "Education & Training",
    description: "Admissions, enrolment, and student questions",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
    title: "Fitness & Wellness",
    description: "Bookings, cancelations, and member support",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Travel & Hospitality",
    description: "Bookings, disruptions, and refunds",
  },
];

const quickLinks = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "Guide",
    description: "Find out everything on how to use chatbase",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "Blog",
    description: "Product updates, tips, and insights from Chatbase",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: "Docs",
    description: "API documentation and developer guides",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Changelog",
    description: "Stay up to date with the latest updates and features",
  },
];

const navLinks = [
  { label: "Solutions", hasDropdown: true },
  { label: "Resources", hasDropdown: true },
  { label: "Enterprise", href: "#enterprise", hasDropdown: false },
  { label: "Pricing", href: "#pricing", hasDropdown: false },
];

function DropdownItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <a href="#" className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-surface">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-foreground">
        {icon}
      </div>
      <div>
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-sm text-muted">{description}</div>
      </div>
    </a>
  );
}

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback((label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setOpenDropdown(null), 200);
    }, 100);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 w-full max-w-(--container-max-width) items-center justify-between px-6 py-3">
        {/* Left — Logo */}
        <div className="flex flex-1 items-center">
          <Link href="/" className="inline-block">
            <Image
              src="/yonovo-logo.png"
              alt="Yonovo"
              width={120}
              height={19}
              className="h-5 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Center — Nav links */}
        <div className="relative hidden flex-1 items-center justify-center lg:flex">
          <div ref={navLinksRef} className="flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasDropdown && handleMouseEnter(link.label)}
                onMouseLeave={() => link.hasDropdown && handleMouseLeave()}
              >
                {link.hasDropdown ? (
                  <button
                    className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-muted"
                  >
                    {link.label}
                    <svg
                      className={`ml-1 h-3 w-3 transition-transform duration-300 ${openDropdown === link.label ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={link.href || "#"}
                    className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-muted"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Shared dropdown panel — centered under nav, content cross-fades */}
          {openDropdown && (
        <div
          className="absolute left-1/2 top-full z-50 -translate-x-1/2"
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`relative mt-2 w-[860px] overflow-hidden rounded-xl border border-border bg-background shadow-lg transition-all duration-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
            }`}
          >
            {/* Solutions content */}
            <div
              className={`grid grid-cols-2 divide-x divide-border transition-opacity duration-200 ${
                openDropdown === "Solutions" ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
            >
              <div className="px-5 py-4">
                <p className="mb-3 text-xs font-semibold tracking-widest text-muted uppercase">By use-case</p>
                <div className="flex flex-col">
                  {useCases.map((item) => (
                    <DropdownItem key={item.title} {...item} />
                  ))}
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="mb-3 text-xs font-semibold tracking-widest text-muted uppercase">By industry</p>
                <div className="flex flex-col">
                  {industries.map((item) => (
                    <DropdownItem key={item.title} {...item} />
                  ))}
                </div>
              </div>
            </div>

            {/* Resources content */}
            <div
              className={`grid grid-cols-2 divide-x divide-border transition-opacity duration-200 ${
                openDropdown === "Resources" ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
            >
              <div className="px-5 py-4">
                <p className="mb-3 text-xs font-semibold tracking-widest text-muted uppercase">Quick links</p>
                <div className="flex flex-col">
                  {quickLinks.map((item) => (
                    <DropdownItem key={item.title} {...item} />
                  ))}
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="mb-3 text-xs font-semibold tracking-widest text-muted uppercase">Recent update</p>
                <div className="flex flex-col gap-3">
                  <div className="overflow-hidden rounded-xl border border-border">
                    <div className="aspect-[16/10] w-full bg-gradient-to-br from-amber-100 via-pink-100 to-purple-200" />
                    <div className="p-3">
                      <h4 className="text-sm font-semibold text-foreground">
                        Nested Suggested Messages are now available
                      </h4>
                      <p className="mt-1 text-sm text-muted line-clamp-2">
                        Nested suggested messages are now available in the chat bubble, making options cleaner and helping customers get to the right...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          )}
        </div>

        {/* Right — Auth */}
        <div className="hidden flex-1 items-center justify-end gap-4 lg:flex">
          <Link
            href="#signin"
            className="text-sm font-medium text-foreground hover:text-muted transition-colors"
          >
            Sign in
          </Link>
          <Button size="sm">Try for Free</Button>
        </div>
      </div>
    </nav>
  );
}
