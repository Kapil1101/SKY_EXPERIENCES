"use client";

import { useState, useEffect } from "react";
import { categories, getCategoryByKey } from "@/data/categories";
import { Search } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortQuote: string;
  statement: string;
  profession?: string;
  nationality?: string;
  imageUrl?: string;
  isFeatured: boolean;
}

export default function TestimonialsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, [activeCategory, searchQuery]);

  async function fetchTestimonials() {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory !== "ALL") params.set("category", activeCategory);
    if (searchQuery) params.set("search", searchQuery);

    try {
      const res = await fetch(`/api/testimonials?${params.toString()}`);
      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch {
      setTestimonials([]);
    }
    setLoading(false);
  }

  return (
    <div className="pt-16 bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl font-bold text-navy sm:text-5xl">
            Experiences That Inspire
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Real stories from people whose lives transformed through Sudarshan
            Kriya
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, profession, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-navy focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory("ALL")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeCategory === "ALL"
                ? "bg-saffron text-white"
                : "bg-white text-navy hover:bg-saffron/10"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? "bg-saffron text-white"
                  : "bg-white text-navy hover:bg-saffron/10"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white p-6 shadow-sm animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-3" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl mb-2">🔍</p>
            <p className="text-muted text-lg">
              No testimonials found. Try a different search or filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => {
              const cat = getCategoryByKey(t.category);
              return (
                <article
                  key={t.id}
                  className="group relative rounded-2xl bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  {/* Top gradient bar */}
                  <div className="h-2 bg-gradient-to-r from-saffron to-warm-orange" />

                  <div className="p-6">
                    {/* Large centered photo */}
                    <div className="flex flex-col items-center text-center mb-5">
                      {t.imageUrl ? (
                        <img
                          src={t.imageUrl}
                          alt={t.name}
                          className="h-28 w-28 rounded-full object-cover ring-4 ring-saffron/20 shadow-lg mb-4"
                        />
                      ) : (
                        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-warm-orange text-white font-bold text-4xl ring-4 ring-saffron/20 shadow-lg mb-4">
                          {t.name.charAt(0)}
                        </div>
                      )}
                      <h3 className="font-heading text-lg font-bold text-navy">
                        {t.name}
                      </h3>
                      {t.profession && (
                        <p className="text-sm text-muted mt-1">
                          {t.profession}
                        </p>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {cat && (
                        <span className="inline-block rounded-full bg-saffron/10 px-3 py-1 text-xs font-medium text-saffron">
                          {cat.emoji} {cat.label}
                        </span>
                      )}
                      {t.nationality && (
                        <span className="inline-block rounded-full bg-navy/5 px-3 py-1 text-xs text-navy/60">
                          🌍 {t.nationality}
                        </span>
                      )}
                    </div>

                    {/* Quote */}
                    <div className="relative text-center">
                      <span className="text-4xl text-saffron/20 font-serif">
                        &ldquo;
                      </span>
                      <p className="text-sm text-navy/80 leading-relaxed italic px-2">
                        {t.shortQuote}
                      </p>
                      <span className="text-4xl text-saffron/20 font-serif">
                        &rdquo;
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

