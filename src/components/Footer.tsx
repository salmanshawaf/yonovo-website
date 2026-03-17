const integrationLinks = [
  { label: "QuickBooks", href: "/solutions/quickbooks" },
  { label: "Xero", href: "/solutions/xero" },
];

const resourceLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Contact us", href: "#" },
  { label: "Guide", href: "#" },
  { label: "Blog", href: "/blog" },
  { label: "Changelog", href: "#" },
];

const industryLinks = [
  { label: "Wholesale & Distribution", href: "/industries/wholesale-distribution" },
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Professional Services", href: "/industries/professional-services" },
  { label: "Property Management", href: "/industries/property-management" },
  { label: "Gyms & Fitness", href: "/industries/gyms-fitness" },
];

const companyLinks = [
  { label: "Careers", href: "#" },
  { label: "Privacy policy", href: "#" },
  { label: "Terms of service", href: "#" },
];

export default function Footer() {
  return (
    <footer className="text-white bg-brand-navy">
      <div className="mx-auto max-w-(--container-max-width) px-6 pt-28 pb-12">
        {/* Main layout */}
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Left column */}
          <div className="flex flex-col items-center gap-8 md:items-start">
            {/* Logo + copyright */}
            <div className="flex flex-col items-center gap-4 md:items-start">
              <a href="/"><img src="/yonovo-logo-white.png" alt="Yonovo" className="h-4 w-auto" /></a>
              <p className="text-center font-medium text-zinc-400 leading-5 md:text-left">
                &copy; 2026 Yonovo, Inc.
              </p>
            </div>

            {/* Contact + Social icons grid */}
            <div className="grid w-full grid-cols-4 gap-4 md:w-auto md:grid-cols-6">
              <a href="#" className="contents">
                <button className="col-span-4 flex h-11 items-center justify-center rounded-md border border-white/20 bg-transparent px-5 py-3 font-medium text-base text-white transition-all duration-200 hover:bg-white/10 md:col-span-2">
                  Contact
                </button>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/yonovoai" target="_blank" rel="noopener noreferrer" className="contents">
                <button className="flex h-11 items-center justify-center rounded-md border border-white/20 p-3 text-white transition-all duration-200 hover:bg-white/10 md:col-span-1" aria-label="LinkedIn">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </button>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@TractionFM" target="_blank" rel="noopener noreferrer" className="contents">
                <button className="flex h-11 items-center justify-center rounded-md border border-white/20 p-3 text-white transition-all duration-200 hover:bg-white/10 md:col-span-1" aria-label="YouTube">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a2.966 2.966 0 00-2.084-2.084C19.654 3.333 12 3.333 12 3.333s-7.654 0-9.414.769A2.966 2.966 0 00.502 6.186C0 8.102 0 12 0 12s0 3.898.502 5.814a2.966 2.966 0 002.084 2.084c1.76.769 9.414.769 9.414.769s7.654 0 9.414-.769a2.966 2.966 0 002.084-2.084C24 15.898 24 12 24 12s0-3.898-.502-5.814zM9.545 15.568v-7.136L15.545 12l-6 3.568z" />
                  </svg>
                </button>
              </a>
            </div>

          </div>

          {/* Right columns — Links (desktop only) */}
          <div className="hidden md:flex md:gap-10 lg:gap-24 xl:gap-32">
            <div className="flex flex-col gap-4">
              <h6 className="font-semibold text-sm text-zinc-50 capitalize tracking-widest">
                INTEGRATIONS
              </h6>
              {integrationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-medium text-sm text-zinc-400 transition-colors duration-200 ease-in-out hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="font-semibold text-sm text-zinc-50 capitalize tracking-widest whitespace-nowrap">
                AR AUTOMATION FOR
              </h6>
              {industryLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-medium text-sm text-zinc-400 transition-colors duration-200 ease-in-out hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="font-semibold text-sm text-zinc-50 capitalize tracking-widest">
                RESOURCES
              </h6>
              {resourceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-medium text-sm text-zinc-400 transition-colors duration-200 ease-in-out hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="font-semibold text-sm text-zinc-50 capitalize tracking-widest">
                COMPANY
              </h6>
              {companyLinks.map((link) => (
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
    </footer>
  );
}
