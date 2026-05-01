import Link from "next/link";

export default function SKYPreview() {
  const features = [
    { icon: "🧘", title: "Eliminates Stress", desc: "Reduces cortisol by up to 56%" },
    { icon: "💪", title: "Improves Health", desc: "Boosts immunity and energy" },
    { icon: "🧠", title: "Enhances Clarity", desc: "Sharper focus and better decisions" },
    { icon: "🕊️", title: "Deepens Meditation", desc: "Effortless inner stillness" },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            What is Sudarshan Kriya?
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            A powerful rhythmic breathing technique that harmonizes body, mind,
            and spirit — practiced by millions worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-gray-100 p-6 text-center transition-all hover:shadow-lg hover:border-saffron/30"
            >
              <span className="text-4xl">{f.icon}</span>
              <h3 className="mt-4 font-heading font-semibold text-navy text-lg">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Simple breathing visualization */}
        <div className="mt-12 flex justify-center">
          <div className="relative flex flex-col items-center">
            <p className="text-sm text-muted mb-4">Breathing Visualization</p>
            <div className="relative h-24 w-24">
              <div className="absolute inset-0 rounded-full bg-saffron/20 animate-breathe" />
              <div className="absolute inset-3 rounded-full bg-saffron/30 animate-breathe" style={{ animationDelay: "0.5s" }} />
              <div className="absolute inset-6 rounded-full bg-saffron/40 animate-breathe" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/about/sudarshan-kriya"
            className="inline-block rounded-full bg-navy px-8 py-3 font-semibold text-white transition-all hover:bg-navy/90 hover:scale-105"
          >
            Discover Sudarshan Kriya →
          </Link>
        </div>
      </div>
    </section>
  );
}

