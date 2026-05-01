import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Sudarshan Kriya",
  description: "Learn about Sudarshan Kriya (SKY) — the powerful rhythmic breathing technique created by Gurudev Sri Sri Ravi Shankar.",
};

export default function SudarshanKriyaPage() {
  return (
    <div className="pt-16 bg-cream min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-saffron">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-navy font-medium">Sudarshan Kriya</span>
        </nav>

        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-navy sm:text-5xl">
            Sudarshan Kriya Yoga (SKY)
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            A powerful rhythmic breathing technique that harmonizes body, mind,
            and spirit
          </p>
        </div>

        {/* What is SKY */}
        <div className="rounded-2xl bg-white p-8 shadow-sm mb-8">
          <h2 className="font-heading text-2xl font-bold text-navy mb-4">
            What is Sudarshan Kriya?
          </h2>
          <p className="text-navy/70 leading-relaxed">
            <strong>Sudarshan Kriya</strong> is a unique breathing practice that involves cyclical breathing patterns ranging from slow and calming to rapid and stimulating. The name comes from Sanskrit:
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-cream p-4">
              <div className="font-heading text-2xl font-bold text-saffron">Su</div>
              <p className="text-sm text-muted mt-1">Proper / Good</p>
            </div>
            <div className="rounded-xl bg-cream p-4">
              <div className="font-heading text-2xl font-bold text-saffron">Darshan</div>
              <p className="text-sm text-muted mt-1">Vision</p>
            </div>
            <div className="rounded-xl bg-cream p-4">
              <div className="font-heading text-2xl font-bold text-saffron">Kriya</div>
              <p className="text-sm text-muted mt-1">Purifying Action</p>
            </div>
          </div>
          <p className="mt-6 text-navy/70 leading-relaxed">
            Together, <strong>Sudarshan Kriya</strong> means &ldquo;proper vision through purifying action&rdquo; — a technique that cleanses the system at the deepest level, bringing the mind to the present moment and allowing a natural state of joy and peace to arise.
          </p>
        </div>

        {/* Origin */}
        <div className="rounded-2xl bg-white p-8 shadow-sm mb-8">
          <h2 className="font-heading text-2xl font-bold text-navy mb-4">
            How Was It Discovered?
          </h2>
          <p className="text-navy/70 leading-relaxed">
            In 1982, Gurudev Sri Sri Ravi Shankar entered a 10-day period of silence on the banks of the Bhadra River in Shimoga, Karnataka, India. During this profound period of meditation and silence, the Sudarshan Kriya technique was cognized — revealed to him as a complete breathing practice.
          </p>
          <p className="mt-4 text-navy/70 leading-relaxed">
            Since that time, Sudarshan Kriya has been taught to over 450 million people in more than 180 countries through the Art of Living Foundation&apos;s courses, making it one of the most widely practiced breathing techniques in the world.
          </p>
        </div>

        {/* Components */}
        <div className="rounded-2xl bg-white p-8 shadow-sm mb-8">
          <h2 className="font-heading text-2xl font-bold text-navy mb-4">
            The Practice
          </h2>
          <p className="text-navy/70 leading-relaxed mb-6">
            A complete Sudarshan Kriya session includes several preparatory practices that lead to the core breathing technique:
          </p>
          <div className="space-y-4">
            {[
              {
                name: "Ujjayi (Victorious Breath)",
                desc: "A slow, deep breathing technique that calms the mind and body, activating the parasympathetic nervous system.",
                icon: "🌊",
              },
              {
                name: "Bhastrika (Bellows Breath)",
                desc: "A rapid, rhythmic breathing pattern that energizes the body and clears the respiratory system.",
                icon: "🔥",
              },
              {
                name: "Om Chanting",
                desc: "The primordial sound vibration that creates harmony within and connects to universal consciousness.",
                icon: "🕉️",
              },
              {
                name: "Sudarshan Kriya",
                desc: "The core technique — cyclical breathing in slow, medium, and fast rhythms that brings the system to complete harmony.",
                icon: "✨",
              },
            ].map((component) => (
              <div
                key={component.name}
                className="flex items-start gap-4 rounded-xl bg-cream p-5"
              >
                <span className="text-2xl shrink-0">{component.icon}</span>
                <div>
                  <h3 className="font-semibold text-navy">{component.name}</h3>
                  <p className="mt-1 text-sm text-muted">{component.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How the Science Works */}
        <div className="rounded-2xl bg-white p-8 shadow-sm mb-8">
          <h2 className="font-heading text-2xl font-bold text-navy mb-4">
            The Science Behind SKY
          </h2>
          <p className="text-navy/70 leading-relaxed">
            Over 100 independent research studies published in peer-reviewed journals have documented the profound effects of Sudarshan Kriya on the body and mind:
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { stat: "56%", label: "Reduction in cortisol (stress hormone)" },
              { stat: "68%", label: "Remission rate in clinical depression" },
              { stat: "111+", label: "Genes positively affected per session" },
              { stat: "33%", label: "Improvement in sleep quality" },
              { stat: "↑", label: "Enhanced Natural Killer cell activity (immunity)" },
              { stat: "↓", label: "Significant reduction in anxiety and PTSD symptoms" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl bg-cream p-4 flex items-center gap-3">
                <span className="font-heading text-xl font-bold text-saffron shrink-0 w-12 text-center">
                  {item.stat}
                </span>
                <p className="text-sm text-navy/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who Can Learn */}
        <div className="rounded-2xl bg-white p-8 shadow-sm mb-8">
          <h2 className="font-heading text-2xl font-bold text-navy mb-4">
            Who Can Learn?
          </h2>
          <p className="text-navy/70 leading-relaxed">
            Sudarshan Kriya is for everyone — regardless of age, background, or physical ability. There are no prerequisites. People from all walks of life practice SKY — from students to CEOs, athletes to homemakers, veterans to spiritual seekers.
          </p>
          <div className="mt-6 rounded-xl bg-saffron/5 border border-saffron/20 p-6">
            <h3 className="font-semibold text-navy mb-2">⚠️ Important Note</h3>
            <p className="text-sm text-navy/70">
              Sudarshan Kriya can <strong>only</strong> be learned from certified Art of Living teachers in a structured course setting (the Happiness Program). It is not available through books, videos, or online tutorials — this ensures the practice is taught correctly and safely.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="rounded-2xl bg-white p-8 shadow-sm mb-8">
          <h2 className="font-heading text-2xl font-bold text-navy mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How long does the daily practice take?",
                a: "The daily practice, including preparatory breathing exercises and Sudarshan Kriya, takes about 20-25 minutes.",
              },
              {
                q: "Can I learn it online?",
                a: "Yes! The Art of Living now offers the Happiness Program (where SKY is taught) both in-person and online. Both formats are equally effective.",
              },
              {
                q: "Are there any side effects?",
                a: "When learned from a certified instructor, Sudarshan Kriya has no known negative side effects. It has been practiced safely by over 450 million people worldwide.",
              },
              {
                q: "How soon will I notice benefits?",
                a: "Most practitioners report feeling calmer, more energized, and sleeping better within the first week of regular practice. Long-term benefits deepen with consistent practice.",
              },
              {
                q: "Do I need prior meditation experience?",
                a: "No. Sudarshan Kriya is designed for beginners and experienced meditators alike. No prior experience in yoga, meditation, or breathing techniques is needed.",
              },
            ].map((faq, i) => (
              <div key={i} className="rounded-xl bg-cream p-5">
                <h3 className="font-semibold text-navy text-sm">{faq.q}</h3>
                <p className="mt-2 text-sm text-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h2 className="font-heading text-2xl font-bold text-navy">
            Ready to Learn Sudarshan Kriya?
          </h2>
          <p className="mt-2 text-muted">
            Join millions who have transformed their lives
          </p>
          <a
            href="https://www.artofliving.org/us-en/courses"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-saffron px-8 py-3 font-semibold text-white transition-all hover:bg-warm-orange hover:scale-105"
          >
            Find a Happiness Program →
          </a>
        </div>
      </div>
    </div>
  );
}

