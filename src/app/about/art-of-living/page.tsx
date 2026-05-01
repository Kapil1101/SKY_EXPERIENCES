import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Art of Living Foundation",
  description: "Learn about the Art of Living Foundation — one of the world's largest humanitarian organizations, founded by Gurudev Sri Sri Ravi Shankar in 1981.",
};

export default function ArtOfLivingPage() {
  return (
    <div className="pt-16 bg-cream min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-saffron">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-navy font-medium">Art of Living</span>
        </nav>

        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-navy sm:text-5xl">
            The Art of Living Foundation
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Creating a stress-free, violence-free world through breath, meditation, and service
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { stat: "1981", label: "Founded" },
            { stat: "180+", label: "Countries" },
            { stat: "40,000+", label: "Centers" },
            { stat: "450M+", label: "Lives Touched" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-white p-4 text-center shadow-sm">
              <div className="font-heading text-2xl font-bold text-saffron">{s.stat}</div>
              <p className="mt-1 text-xs text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="rounded-2xl bg-white p-8 shadow-sm mb-8">
          <h2 className="font-heading text-2xl font-bold text-navy mb-4">Our Mission</h2>
          <p className="text-navy/70 leading-relaxed">
            Founded in 1981 by Gurudev Sri Sri Ravi Shankar, the Art of Living is a non-profit, educational and humanitarian organization that operates globally in over 180 countries. Its programs are guided by the philosophy that the foundation of individual peace is the basis for world peace.
          </p>
          <p className="mt-4 text-navy/70 leading-relaxed">
            The Art of Living serves as an umbrella for various humanitarian initiatives — addressing diverse needs of people from all walks of life, all backgrounds, and all cultures through personal development programs, community service, and environmental sustainability efforts.
          </p>
        </div>

        {/* Programs */}
        <div className="rounded-2xl bg-white p-8 shadow-sm mb-8">
          <h2 className="font-heading text-2xl font-bold text-navy mb-6">Flagship Programs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "🌅", name: "Happiness Program", desc: "The flagship course teaching Sudarshan Kriya — taken by 450M+ people worldwide." },
              { icon: "🎓", name: "YES!+ (Youth Programs)", desc: "Empowering youth aged 18-30 with life skills, leadership, and breathing techniques." },
              { icon: "🧒", name: "ART Excel", desc: "Unlocking the potential of children aged 8-17 through fun, interactive workshops." },
              { icon: "🏛️", name: "PRISON SMART", desc: "Rehabilitating prison inmates through meditation — active in 800+ correctional facilities." },
              { icon: "🧘", name: "Sahaj Samadhi Meditation", desc: "Effortless mantra-based meditation for deep inner rest and clarity." },
              { icon: "🤝", name: "Trauma Relief Programs", desc: "Post-disaster stress relief programs for survivors of natural disasters and conflicts." },
            ].map((program) => (
              <div key={program.name} className="rounded-xl bg-cream p-5">
                <span className="text-2xl">{program.icon}</span>
                <h3 className="mt-2 font-semibold text-navy text-sm">{program.name}</h3>
                <p className="mt-1 text-xs text-muted">{program.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Initiatives */}
        <div className="rounded-2xl bg-white p-8 shadow-sm mb-8">
          <h2 className="font-heading text-2xl font-bold text-navy mb-6">Service to Society</h2>
          <div className="space-y-4">
            {[
              {
                icon: "🌱",
                title: "Rural Development",
                desc: "Transforming 40,000+ villages across India through sustainable development, hygiene, and skill training programs.",
              },
              {
                icon: "🎓",
                title: "Free Education",
                desc: "Running 1,000+ free schools providing quality education to underprivileged children, especially in rural areas.",
              },
              {
                icon: "👩‍💼",
                title: "Women Empowerment",
                desc: "Training women in self-defense, financial literacy, and vocational skills through dedicated empowerment programs.",
              },
              {
                icon: "🌊",
                title: "Environmental Sustainability",
                desc: "Major river rejuvenation projects, tree plantation drives (80M+ trees planted), and sustainable agriculture initiatives.",
              },
              {
                icon: "🕊️",
                title: "Conflict Resolution",
                desc: "Peace dialogues and reconciliation efforts in conflict zones including Colombia, Iraq, Kashmir, and the broader Middle East.",
              },
              {
                icon: "🏥",
                title: "Disaster Relief",
                desc: "Rapid response teams providing trauma relief after earthquakes, floods, tsunamis, and pandemics worldwide.",
              },
            ].map((initiative) => (
              <div key={initiative.title} className="flex items-start gap-4 rounded-xl bg-cream p-5">
                <span className="text-2xl shrink-0">{initiative.icon}</span>
                <div>
                  <h3 className="font-semibold text-navy">{initiative.title}</h3>
                  <p className="mt-1 text-sm text-muted">{initiative.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recognition */}
        <div className="rounded-2xl bg-gradient-to-br from-navy to-navy/95 p-8 text-white mb-8">
          <h2 className="font-heading text-2xl font-bold mb-6">Global Recognition</h2>
          <ul className="space-y-3">
            {[
              "Special Consultative Status with the United Nations Economic and Social Council (ECOSOC)",
              "Programs conducted in partnership with UNDP, UNICEF, WHO, and World Bank",
              "Multiple UN resolutions recognize Art of Living's meditation and yoga programs",
              "Global volunteers have contributed billions of hours of community service",
              "One of the fastest-growing humanitarian organizations in the world",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300">
                <span className="text-gold mt-0.5 shrink-0">★</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.artofliving.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-saffron px-8 py-3 font-semibold text-white transition-all hover:bg-warm-orange hover:scale-105"
          >
            Visit Art of Living →
          </a>
        </div>
      </div>
    </div>
  );
}

