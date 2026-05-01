import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Gurudev Sri Sri Ravi Shankar",
  description: "Learn about Gurudev Sri Sri Ravi Shankar — founder of Art of Living, creator of Sudarshan Kriya, humanitarian, and peace ambassador.",
};

export default function GurudevPage() {
  return (
    <div className="pt-16 bg-cream min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-saffron">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-navy font-medium">About Gurudev</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="mx-auto h-40 w-40 rounded-full bg-gradient-to-br from-saffron/20 to-warm-orange/20 flex items-center justify-center mb-6">
            <span className="text-7xl">🙏</span>
          </div>
          <h1 className="font-heading text-4xl font-bold text-navy sm:text-5xl">
            Gurudev Sri Sri Ravi Shankar
          </h1>
          <p className="mt-4 text-lg text-muted">
            Humanitarian • Spiritual Leader • Peace Ambassador
          </p>
        </div>

        <article className="prose prose-lg max-w-none">
          <div className="rounded-2xl bg-white p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-navy mb-4">Early Life & Spiritual Journey</h2>
            <p className="text-navy/70 leading-relaxed">
              Born on May 13, 1956, in Papanasam, Tamil Nadu, India, Gurudev Sri Sri Ravi Shankar showed remarkable spiritual depth from a young age. By age four, he could recite parts of the Bhagavad Gita. He studied Vedic literature under Pandit Sudhakar Chaturvedi and earned a degree in modern science.
            </p>
            <p className="text-navy/70 leading-relaxed mt-4">
              His deep knowledge bridges ancient wisdom and modern science, making classical spiritual teachings accessible and relevant to contemporary life worldwide.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-navy mb-4">Founding Art of Living</h2>
            <p className="text-navy/70 leading-relaxed">
              In 1981, Gurudev founded the Art of Living Foundation with the vision of creating a stress-free, violence-free world. The following year, in 1982, after a 10-day period of silence on the banks of the Bhadra River in Shimoga, Karnataka, the Sudarshan Kriya breathing technique was revealed to him.
            </p>
            <p className="text-navy/70 leading-relaxed mt-4">
              Since then, Sudarshan Kriya has touched the lives of over 450 million people across more than 180 countries, making it one of the most widely practiced breathing techniques in the world.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-navy mb-4">Peace Initiatives & Conflict Resolution</h2>
            <p className="text-navy/70 leading-relaxed">
              Gurudev has played a significant role in conflict resolution across the globe:
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "Instrumental in the historic peace agreement between the Colombian government and FARC rebels, helping in the release of child soldiers",
                "Conducted peace dialogues in Iraq, bringing together Shia and Sunni leaders",
                "Led inter-faith dialogues in Kashmir and other conflict zones",
                "Addressed the United Nations General Assembly on multiple occasions",
                "Facilitated dialogue between political factions in India, including the Ayodhya mediation",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-navy/70">
                  <span className="text-saffron mt-1 shrink-0">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm mb-8">
            <h2 className="font-heading text-2xl font-bold text-navy mb-4">Awards & Recognition</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { award: "Padma Vibhushan", detail: "India's second-highest civilian award (2016)" },
                { award: "Nobel Peace Prize Nominee", detail: "Nominated for contributions to world peace" },
                { award: "Honorary Doctorates", detail: "From multiple universities worldwide" },
                { award: "Colombia Peace Award", detail: "For contribution to the FARC peace process" },
                { award: "Order of the Pole Star", detail: "Mongolia's highest civilian honor" },
                { award: "Peru Congressional Medal", detail: "For humanitarian service" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl bg-cream p-4">
                  <h3 className="font-semibold text-navy text-sm">{item.award}</h3>
                  <p className="text-xs text-muted mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-navy to-navy/95 p-8 text-white mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">Words of Wisdom</h2>
            <div className="space-y-6">
              {[
                "The rhythm of the body, the melody of the mind, and the harmony of the soul create the symphony of life.",
                "When you share your misery, it grows. When you share your joy, it grows.",
                "The purpose of life is to be happy. And happiness is a choice.",
                "Meditation is the journey from sound to silence, from movement to stillness.",
                "When you rest in the Self, even impossible things become possible.",
              ].map((quote, i) => (
                <blockquote key={i} className="border-l-4 border-saffron pl-4 italic text-gray-300">
                  &ldquo;{quote}&rdquo;
                </blockquote>
              ))}
            </div>
          </div>
        </article>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://www.srisriravishankar.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-saffron px-8 py-3 font-semibold text-white transition-all hover:bg-warm-orange hover:scale-105"
          >
            Visit Official Website →
          </a>
        </div>
      </div>
    </div>
  );
}

