import Link from "next/link";
import { researchPapers } from "@/data/research";

export default function ResearchHighlights() {
  const highlighted = researchPapers.slice(0, 4);

  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            Backed by Science
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Over 100 independent studies published in peer-reviewed journals
          </p>
        </div>

        {/* Key findings infographic */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { stat: "56%", label: "Cortisol Reduction" },
            { stat: "68%", label: "Depression Remission" },
            { stat: "111+", label: "Genes Affected" },
            { stat: "100+", label: "Published Studies" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-white p-4 text-center shadow-sm">
              <div className="font-heading text-2xl font-bold text-saffron sm:text-3xl">
                {item.stat}
              </div>
              <p className="mt-1 text-xs text-muted sm:text-sm">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlighted.map((paper) => (
            <a
              key={paper.id}
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 block"
            >
              <span className="inline-block rounded-full bg-sage/10 px-3 py-1 text-xs font-medium text-sage mb-3">
                {paper.category}
              </span>
              <h3 className="font-semibold text-navy text-sm leading-snug">
                {paper.title}
              </h3>
              <p className="mt-2 text-xs text-muted">
                {paper.authors} • {paper.journal} ({paper.year})
              </p>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/research"
            className="inline-block rounded-full bg-sage px-8 py-3 font-semibold text-white transition-all hover:bg-sage/90 hover:scale-105"
          >
            View All Research →
          </Link>
        </div>
      </div>
    </section>
  );
}

