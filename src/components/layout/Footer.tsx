import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/research", label: "Research" },
  { href: "/benefits", label: "Benefits" },
  { href: "/courses", label: "Courses" },
];

const aboutLinks = [
  { href: "/about/sudarshan-kriya", label: "Sudarshan Kriya" },
  { href: "/about/art-of-living", label: "Art of Living" },
  { href: "/about/gurudev", label: "Gurudev Sri Sri" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🙏</span>
              <span className="font-heading text-xl font-bold">
                Sudarshan <span className="text-saffron">Kriya</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Discovering and sharing transformative experiences of Sudarshan
              Kriya practitioners from around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4 text-warm-orange">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-saffron transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4 text-warm-orange">
              Learn More
            </h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-saffron transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4 text-warm-orange">
              Official Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.artofliving.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-saffron transition-colors"
                >
                  Art of Living →
                </a>
              </li>
              <li>
                <a
                  href="https://www.srisriravishankar.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-saffron transition-colors"
                >
                  Sri Sri Ravi Shankar →
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@ArtofLiving"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-saffron transition-colors"
                >
                  YouTube →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            Made with 🧡 for the Art of Living community
          </p>
          <p className="mt-2 text-xs text-gray-600">
            © {new Date().getFullYear()} SKY Experiences. This is an
            independent community project.
          </p>
        </div>
      </div>
    </footer>
  );
}


