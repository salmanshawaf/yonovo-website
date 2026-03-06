const productLinks = [
  { label: "Customer Service", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Security", href: "#" },
  { label: "Chatbase Experts", href: "#" },
  { label: "Hire an Expert", href: "#" },
  { label: "Affiliates", href: "#" },
];

const resourceLinks = [
  { label: "Contact us", href: "#" },
  { label: "API", href: "#" },
  { label: "Guide", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Changelog", href: "#" },
];

const companyLinks = [
  { label: "Careers", href: "#" },
  { label: "Privacy policy", href: "#" },
  { label: "Terms of service", href: "#" },
  { label: "DPA", href: "#" },
  { label: "Cookie policy", href: "#" },
  { label: "Trust center", href: "#" },
  { label: "Cookie preferences", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-(--container-max-width) px-6 pt-28 pb-12">
        {/* Main layout */}
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Left column */}
          <div className="flex flex-col items-center gap-8 md:items-start">
            {/* Logo + copyright */}
            <div className="flex flex-col items-center gap-4 md:items-start">
              <div className="text-xl font-bold tracking-tight">Chatbase</div>
              <p className="text-center font-medium text-zinc-400 leading-5 md:text-left">
                &copy; {new Date().getFullYear()} Chatbase, Inc.
              </p>
            </div>

            {/* Contact + Social icons grid */}
            <div className="grid w-full grid-cols-4 gap-4 md:w-auto md:grid-cols-6">
              <a href="#" className="contents">
                <button className="col-span-4 flex h-11 items-center justify-center rounded-md bg-zinc-800 px-5 py-3 font-medium text-base text-white transition-all duration-200 hover:bg-zinc-700 md:col-span-2">
                  Contact
                </button>
              </a>
              {/* LinkedIn */}
              <a href="#" className="contents">
                <button className="flex h-11 items-center justify-center rounded-md border border-zinc-800 p-3 text-white transition-all duration-200 hover:bg-zinc-800/90 md:col-span-1" aria-label="LinkedIn">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </button>
              </a>
              {/* Instagram */}
              <a href="#" className="contents">
                <button className="flex h-11 items-center justify-center rounded-md border border-zinc-800 p-3 text-white transition-all duration-200 hover:bg-zinc-800/90 md:col-span-1" aria-label="Instagram">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </button>
              </a>
              {/* X / Twitter */}
              <a href="#" className="contents">
                <button className="flex h-11 items-center justify-center rounded-md border border-zinc-800 p-3 text-white transition-all duration-200 hover:bg-zinc-800/90 md:col-span-1" aria-label="Twitter">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
              </a>
              {/* YouTube */}
              <a href="#" className="contents">
                <button className="flex h-11 items-center justify-center rounded-md border border-zinc-800 p-3 text-white transition-all duration-200 hover:bg-zinc-800/90 md:col-span-1" aria-label="YouTube">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a2.966 2.966 0 00-2.084-2.084C19.654 3.333 12 3.333 12 3.333s-7.654 0-9.414.769A2.966 2.966 0 00.502 6.186C0 8.102 0 12 0 12s0 3.898.502 5.814a2.966 2.966 0 002.084 2.084c1.76.769 9.414.769 9.414.769s7.654 0 9.414-.769a2.966 2.966 0 002.084-2.084C24 15.898 24 12 24 12s0-3.898-.502-5.814zM9.545 15.568v-7.136L15.545 12l-6 3.568z" />
                  </svg>
                </button>
              </a>
            </div>

            {/* Compliance badges — desktop only */}
            <div className="hidden flex-row gap-4 md:flex">
              <div className="flex aspect-square w-[80px] items-center justify-center rounded-full border border-zinc-700 bg-zinc-900">
                <span className="text-xs font-medium text-zinc-400">SOC 2</span>
              </div>
              <div className="flex aspect-square w-[80px] items-center justify-center rounded-full border border-zinc-700 bg-zinc-900">
                <span className="text-xs font-medium text-zinc-400">GDPR</span>
              </div>
            </div>
          </div>

          {/* Right columns — Links (desktop only) */}
          <div className="hidden md:flex md:gap-10 lg:gap-24 xl:gap-32">
            <div className="flex flex-col gap-4">
              <h6 className="font-semibold text-sm text-zinc-50 capitalize tracking-widest">
                PRODUCT
              </h6>
              {productLinks.map((link) => (
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
