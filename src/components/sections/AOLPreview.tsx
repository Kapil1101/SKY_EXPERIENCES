import Link from "next/link";

export default function AOLPreview() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
              The Art of Living Foundation
            </h2>
            <p className="mt-6 text-navy/70 leading-relaxed">
              Founded in 1981 by Gurudev Sri Sri Ravi Shankar, the Art of Living
              is one of the largest volunteer-based humanitarian organizations in
              the world. Present in over 180 countries, it works through
              education, sustainable development, and trauma relief.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: "🌱", label: "Rural Development" },
                { icon: "🎓", label: "Free Education" },
                { icon: "🌊", label: "Environmental Programs" },
                { icon: "🕊️", label: "Conflict Resolution" },
                { icon: "🏥", label: "Trauma Relief" },
                { icon: "👩‍💼", label: "Women Empowerment" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm text-navy/70">{item.label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about/art-of-living"
              className="mt-8 inline-block rounded-full bg-saffron px-6 py-3 font-semibold text-white transition-all hover:bg-warm-orange hover:scale-105"
            >
              Learn More →
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "180+", label: "Countries" },
                { stat: "40+", label: "Years" },
                { stat: "40,000+", label: "Centers" },
                { stat: "Millions", label: "Volunteers" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-white p-6 text-center shadow-sm"
                >
                  <div className="font-heading text-2xl font-bold text-saffron">
                    {s.stat}
                  </div>
                  <p className="mt-1 text-xs text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

