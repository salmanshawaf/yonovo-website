import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

const navLinks = [
  { label: "Solutions", href: "#solutions", hasDropdown: true },
  { label: "Resources", href: "#resources", hasDropdown: true },
  { label: "Enterprise", href: "#enterprise", hasDropdown: false },
  { label: "Pricing", href: "#pricing", hasDropdown: false },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-(--container-max-width) px-6 flex items-center justify-between h-16">
        <Link href="/">
          <Image
            src="/yonovo-logo.png"
            alt="Yonovo"
            width={120}
            height={19}
            className="h-5 w-auto"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-secondary hover:text-foreground transition-colors flex items-center gap-1"
            >
              {link.label}
              {link.hasDropdown && (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="#signin"
            className="text-sm font-medium text-foreground hover:text-secondary transition-colors hidden sm:block"
          >
            Sign in
          </Link>
          <Button size="sm">Try for Free</Button>
        </div>
      </div>
    </nav>
  );
}
