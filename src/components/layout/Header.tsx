"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/testimonials", label: "Experiences" },
  { href: "/research", label: "Research" },
  { href: "/benefits", label: "Benefits" },
  { href: "/courses", label: "Courses" },
  { href: "/about/sudarshan-kriya", label: "About SKY" },
  { href: "/about/gurudev", label: "Gurudev" },
  { href: "/about/art-of-living", label: "Art of Living" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🙏</span>
            <span className="font-heading text-xl font-bold text-navy">
              SKY <span className="text-saffron">Experiences</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-navy/80 transition-colors hover:bg-cream hover:text-saffron"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden rounded-lg p-2 text-navy hover:bg-cream"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-navy/80 transition-colors hover:bg-cream hover:text-saffron"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

