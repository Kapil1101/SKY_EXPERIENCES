"use client";

import { useState } from "react";
import { researchPapers, researchCategories } from "@/data/research";

export default function ResearchPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? researchPapers
      : researchPapers.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-16 bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-navy sm:text-5xl">
            Scientific Research on Sudarshan Kriya
          </h1>
          <p className="mt-4 text-lg text-muted max-w-3xl mx-auto">
            Over 100 independent studies published in peer-reviewed journals
            across the world validate the profound physical, mental, and
            emotional benefits of Sudarshan Kriya Yoga.
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { stat: "100+", label: "Published Studies" },
            { stat: "56%", label: "Cortisol Reduction" },
            { stat: "68%", label: "Depression Remission" },
            { stat: "111+", label: "Genes Impacted" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl bg-white p-4 text-center shadow-sm"
            >
              <div className="font-heading text-2xl font-bold text-saffron">
                {item.stat}
              </div>
              <p className="mt-1 text-xs text-muted">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {researchCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeFilter === cat
                  ? "bg-sage text-white"
                  : "bg-white text-navy hover:bg-sage/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Papers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((paper) => (
            <a
              key={paper.id}
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 block"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0">📄</span>
                <div>
                  <span className="inline-block rounded-full bg-sage/10 px-3 py-1 text-xs font-medium text-sage mb-2">
                    {paper.category}
                  </span>
                  <h3 className="font-semibold text-navy text-sm leading-snug">
                    {paper.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted">
                    {paper.authors} • {paper.journal} ({paper.year})
                  </p>
                  <p className="mt-3 text-sm text-navy/60 leading-relaxed">
                    {paper.abstract}
                  </p>
                  <span className="mt-3 inline-block text-xs text-saffron font-medium">
                    Read Paper →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

