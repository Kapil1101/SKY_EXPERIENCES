export default function BenefitsMarquee() {
  const benefits = [
    "Reduced Stress", "Better Sleep", "Improved Immunity", "Emotional Balance",
    "Mental Clarity", "Lower Blood Pressure", "Enhanced Focus", "Less Anxiety",
    "More Energy", "Inner Peace", "Better Relationships", "Deeper Meditation",
    "Increased Creativity", "Stronger Resilience", "Greater Happiness",
    "Hormonal Balance", "Pain Relief", "Spiritual Growth",
  ];

  return (
    <section className="bg-gradient-to-r from-saffron to-warm-orange py-16 overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          100+ Benefits of Sudarshan Kriya
        </h2>
      </div>

      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...benefits, ...benefits].map((b, i) => (
            <span
              key={i}
              className="mx-3 inline-block rounded-full bg-white/20 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <a
          href="/benefits"
          className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-saffron transition-all hover:scale-105 hover:shadow-lg"
        >
          Explore All Benefits →
        </a>
      </div>
    </section>
  );
}

