"use client";

import { useState } from "react";
import { benefitSections } from "@/data/benefits";

export default function BenefitsPage() {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="pt-16 bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-navy sm:text-5xl">
            100+ Benefits of Sudarshan Kriya
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Documented physical, mental, emotional, and spiritual benefits
            backed by scientific research
          </p>
        </div>

        {/* Section navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {benefitSections.map((section, idx) => (
            <button
              key={section.category}
              onClick={() => setActiveSection(idx)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                activeSection === idx
                  ? "bg-saffron text-white shadow-lg"
                  : "bg-white text-navy hover:bg-saffron/10"
              }`}
            >
              {section.icon} {section.category}
            </button>
          ))}
        </div>

        {/* Active Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <span className="text-5xl">
              {benefitSections[activeSection].icon}
            </span>
            <h2 className="mt-4 font-heading text-2xl font-bold text-navy">
              {benefitSections[activeSection].category}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {benefitSections[activeSection].benefits.length} benefits
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitSections[activeSection].benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <h3 className="font-semibold text-navy text-sm flex items-center gap-2">
                  <span className="text-saffron">✦</span>
                  {benefit.title}
                </h3>
                <p className="mt-2 text-xs text-muted leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* All Sections Summary */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-navy to-navy/95 p-8 text-center text-white">
          <h2 className="font-heading text-2xl font-bold">
            Ready to Experience These Benefits?
          </h2>
          <p className="mt-4 text-gray-300 max-w-xl mx-auto">
            Sudarshan Kriya can only be learned from certified Art of Living
            teachers. Find a Happiness Program near you and begin your
            transformation.
          </p>
          <a
            href="https://www.artofliving.org/us-en/courses"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-saffron px-8 py-3 font-semibold text-white transition-all hover:bg-warm-orange hover:scale-105"
          >
            Find a Course →
          </a>
        </div>
      </div>
    </div>
  );
}

