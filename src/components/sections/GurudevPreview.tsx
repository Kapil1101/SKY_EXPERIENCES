import Link from "next/link";

export default function GurudevPreview() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative h-72 w-72 sm:h-80 sm:w-80 rounded-full bg-gradient-to-br from-saffron/20 to-warm-orange/20 flex items-center justify-center">
              <div className="text-center">
                <p className="font-heading text-2xl font-bold text-navy/80">Gurudev</p>
                <p className="font-heading text-lg text-navy/60">Sri Sri</p>
                <p className="font-heading text-lg text-navy/60">Ravi Shankar</p>
                <div className="mx-auto my-3 h-px w-16 bg-gradient-to-r from-transparent via-saffron to-transparent" />
                <p className="text-xs text-navy/40 uppercase tracking-wider">Founder</p>
                <p className="text-xs text-navy/40 uppercase tracking-wider">Art of Living</p>
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-saffron/30 animate-spin" style={{ animationDuration: "30s" }} />
            </div>
          </div>

          <div>
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
              Gurudev Sri Sri Ravi Shankar
            </h2>
            <p className="mt-6 text-navy/70 leading-relaxed">
              Gurudev Sri Sri Ravi Shankar is a humanitarian, spiritual leader,
              and peace ambassador who founded the Art of Living Foundation in
              1981. He created the Sudarshan Kriya breathing technique in 1982
              after a 10-day period of silence.
            </p>
            <p className="mt-4 text-navy/70 leading-relaxed">
              A Nobel Peace Prize nominee, he has addressed the United Nations
              General Assembly multiple times and has been instrumental in
              conflict resolution in Colombia, Iraq, and other regions. He has
              been honored with the Padma Vibhushan, India&apos;s second-highest
              civilian award.
            </p>

            <blockquote className="mt-6 border-l-4 border-saffron pl-4 italic text-navy/60">
              &ldquo;The rhythm of the body, the melody of the mind, and the
              harmony of the soul create the symphony of life.&rdquo;
            </blockquote>

            <Link
              href="/about/gurudev"
              className="mt-8 inline-block rounded-full bg-saffron px-6 py-3 font-semibold text-white transition-all hover:bg-warm-orange hover:scale-105"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

