import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream pt-16">
      <div className="text-center px-4">
        <span className="text-7xl">🙏</span>
        <h1 className="mt-6 font-heading text-4xl font-bold text-navy">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-muted max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Perhaps you&apos;d like to
          explore our experiences instead?
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="rounded-full bg-saffron px-6 py-3 font-semibold text-white hover:bg-warm-orange transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/testimonials"
            className="rounded-full border-2 border-navy/20 px-6 py-3 font-semibold text-navy hover:border-saffron hover:text-saffron transition-all"
          >
            Explore Experiences
          </Link>
        </div>
      </div>
    </div>
  );
}

