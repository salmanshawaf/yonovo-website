import Link from "next/link";
import Button from "./Button";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Solutions", href: "#solutions" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface">
      <div className="mx-auto max-w-[1280px] px-6 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-primary">
          Yonovo
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-secondary hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="#signin"
            className="text-secondary hover:text-primary transition-colors"
          >
            Sign In
          </Link>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </nav>
  );
}
