"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

const integrations = [
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
    title: "QuickBooks",
    description: "Connect Yonovo to QuickBooks",
    href: "/solutions/quickbooks",
  },
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    title: "Xero",
    description: "Connect Yonovo to Xero",
    href: "/solutions/xero",
  },
];

const industries = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Wholesale & Distribution",
    description: "Reduce DSO and protect buyer relationships",
    href: "/industries/wholesale-distribution",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.049.58.025 1.193-.14 1.743" />
      </svg>
    ),
    title: "Manufacturing",
    description: "Shorten payment cycles, protect partnerships",
    href: "/industries/manufacturing",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
    title: "Professional Services",
    description: "Get paid faster without risking client referrals",
    href: "/industries/professional-services",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Property Management",
    description: "Collect rent on time and retain tenants",
    href: "/industries/property-management",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
        <path d="m2.5 21.5 1.4-1.4" />
        <path d="m20.1 3.9 1.4-1.4" />
        <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
        <path d="m9.6 14.4 4.8-4.8" />
      </svg>
    ),
    title: "Gyms & Fitness",
    description: "Recover failed payments, keep members",
    href: "/industries/gyms-fitness",
  },
];

const quickLinks = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "Blog",
    description: "Product updates, tips, and insights from Yonovo",
    href: "/blog",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Changelog",
    description: "Stay up to date with the latest updates and features",
    href: "/changelog",
  },
];

const navLinks = [
  { label: "Solutions", hasDropdown: true },
  { label: "Resources", hasDropdown: true },
  { label: "Case\u00A0Studies", href: "/case-studies", hasDropdown: false },
  { label: "Pricing", href: "/pricing", hasDropdown: false },
];

function DropdownItem({ icon, title, description, href }: { icon: React.ReactNode; title: string; description: string; href?: string }) {
  return (
    <a href={href ?? "#"} className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-surface">
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

type LatestChangelog = {
  title: string;
  description: string;
  heroImage: string;
  slug: string;
};

export default function Navbar({ defaultMode = "dark", latestChangelog }: { defaultMode?: "dark" | "light"; latestChangelog?: LatestChangelog } = {}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [navMode, setNavMode] = useState<"dark" | "light">(defaultMode);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const NAV_HEIGHT = 64;
    let darkSections: HTMLElement[] = [];
    let ticking = false;

    const updateSections = () => {
      darkSections = Array.from(document.querySelectorAll<HTMLElement>("[data-navbar-dark]"));
    };

    const check = () => {
      let inDark = false;
      for (const section of darkSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top < NAV_HEIGHT && rect.bottom > NAV_HEIGHT) {
          inDark = true;
          break;
        }
      }
      setNavMode(inDark ? "dark" : "light");
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(check);
        ticking = true;
      }
    };

    updateSections();
    check();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-colors duration-150 ${navMode === "light" ? "border-border bg-white/70" : "border-transparent bg-transparent"}`}>
      <div className="relative mx-auto flex h-16 w-full max-w-(--container-max-width) items-center justify-between px-6 py-3">
        {/* Left — Logo */}
        <div className="flex flex-1 items-center">
          <Link href="/" className="inline-block">
            <Image
              src={navMode === "light" ? "/yonovo-logo.png" : "/yonovo-logo-white.png"}
              alt="Yonovo"
              width={96}
              height={15}
              className="h-4 w-auto"
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
                    className={`inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${navMode === "light" ? "text-gray-900 hover:text-gray-600" : "text-white hover:text-white/70"}`}
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
                    className={`inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${navMode === "light" ? "text-gray-900 hover:text-gray-600" : "text-white hover:text-white/70"}`}
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
                <p className="mb-3 text-xs font-semibold tracking-widest text-muted uppercase">By integration</p>
                <div className="flex flex-col">
                  {integrations.map((item) => (
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
              {latestChangelog && (
              <div className="px-5 py-4">
                <p className="mb-3 text-xs font-semibold tracking-widest text-muted uppercase">Recent update</p>
                <div className="flex flex-col gap-3">
                  <a href={`/changelog/${latestChangelog.slug}`} className="group overflow-hidden rounded-xl border border-border transition-colors hover:border-border/80">
                    <Image src={latestChangelog.heroImage} alt={latestChangelog.title} width={400} height={250} className="aspect-[16/10] w-full object-cover bg-surface" />
                    <div className="p-3">
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-brand-blue transition-colors">
                        {latestChangelog.title}
                      </h4>
                      <p className="mt-1 text-sm text-muted line-clamp-2">
                        {latestChangelog.description}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
          )}
        </div>

        {/* Right — Auth */}
        <div className="hidden flex-1 items-center justify-end gap-4 lg:flex">
          <Link
            href="https://dashboard.yonovo.ai/login"
            className={`text-sm font-medium transition-colors ${navMode === "light" ? "text-gray-900 hover:text-gray-600" : "text-white hover:text-white/70"}`}
          >
            Login
          </Link>
<Link href="/book-demo"><Button variant="brand" size="sm">Book Demo</Button></Link>
        </div>
      </div>
    </nav>
  );
}
