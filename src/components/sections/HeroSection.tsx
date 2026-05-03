import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-navy via-[#16213E] to-navy">
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Breathing animation circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] animate-breathe rounded-full bg-saffron/10 blur-3xl" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="h-80 w-80 animate-breathe rounded-full bg-warm-orange/10 blur-2xl"
          style={{ animationDelay: "1s" }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="h-48 w-48 animate-breathe rounded-full bg-gold/10 blur-xl"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 text-7xl opacity-5 animate-float">
        🕉️
      </div>
      <div
        className="absolute bottom-20 right-10 text-7xl opacity-5 animate-float"
        style={{ animationDelay: "3s" }}
      >
        ☀️
      </div>
      <div
        className="absolute top-1/4 right-1/4 text-5xl opacity-5 animate-float"
        style={{ animationDelay: "1.5s" }}
      >
        🪷
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Label */}
        <div className="mb-6 inline-block rounded-full bg-white/5 border border-white/10 px-6 py-2 backdrop-blur-sm">
          <span className="text-sm text-saffron font-medium tracking-wider uppercase">
            ✦ Art of Living ✦
          </span>
        </div>

        <h1 className="font-heading text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Breathe.{" "}
          <span className="bg-gradient-to-r from-saffron via-warm-orange to-gold bg-clip-text text-transparent">
            Transform.
          </span>{" "}
          Thrive.
        </h1>

        {/* Gradient divider */}
        <div className="mx-auto my-8 h-px w-48 bg-gradient-to-r from-transparent via-saffron to-transparent" />

        <p className="mx-auto max-w-2xl text-lg text-gray-300/90 sm:text-xl leading-relaxed">
          Discover how{" "}
          <span className="text-white font-medium">Sudarshan Kriya</span> has
          transformed millions of lives across the world
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/testimonials"
            className="w-full rounded-full bg-gradient-to-r from-saffron to-warm-orange px-10 py-4 text-lg font-semibold text-white shadow-[0_0_30px_rgba(255,107,0,0.3)] transition-all hover:shadow-[0_0_50px_rgba(255,107,0,0.5)] hover:scale-105 sm:w-auto"
          >
            Explore Experiences ✦
          </Link>
          <Link
            href="/courses"
            className="w-full rounded-full border-2 border-white/20 px-10 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-saffron/50 hover:bg-white/5 sm:w-auto"
          >
            Learn Sudarshan Kriya
          </Link>
          <Link
            href="/benefits"
            className="w-full rounded-full border-2 border-gold/30 px-10 py-4 text-lg font-semibold text-gold backdrop-blur-sm transition-all hover:border-gold/60 hover:bg-gold/5 sm:w-auto"
          >
            Discover All Benefits
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400/60 tracking-widest uppercase">
            Scroll
          </span>
          <div className="h-10 w-5 rounded-full border-2 border-gray-400/30 p-1">
            <div className="h-2 w-1.5 animate-bounce rounded-full bg-saffron" />
          </div>
        </div>
      </div>
    </section>
  );
}
