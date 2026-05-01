import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-navy/95 to-navy/90">
      {/* Breathing animation circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 animate-breathe rounded-full bg-saffron/20 blur-3xl sm:h-96 sm:w-96" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-48 w-48 animate-breathe rounded-full bg-warm-orange/15 blur-2xl sm:h-72 sm:w-72" style={{ animationDelay: "1s" }} />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-10">🕉️</div>
      <div className="absolute bottom-20 right-10 text-6xl opacity-10">☀️</div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Breathe.{" "}
          <span className="bg-gradient-to-r from-saffron to-warm-orange bg-clip-text text-transparent">
            Transform.
          </span>{" "}
          Thrive.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl">
          Discover how Sudarshan Kriya has transformed millions of lives across
          the world
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/testimonials"
            className="w-full rounded-full bg-saffron px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-warm-orange hover:scale-105 sm:w-auto"
          >
            Explore Experiences
          </Link>
          <Link
            href="/courses"
            className="w-full rounded-full border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-saffron hover:bg-saffron/10 sm:w-auto"
          >
            Learn Sudarshan Kriya
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400">Scroll to explore</span>
          <div className="h-8 w-5 rounded-full border-2 border-gray-400/50 p-1">
            <div className="h-2 w-1.5 animate-bounce rounded-full bg-saffron" />
          </div>
        </div>
      </div>
    </section>
  );
}

