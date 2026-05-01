import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { categories } from "@/data/categories";

export default async function CategoryCarousel() {
  let counts: Record<string, number> = {};

  try {
    const result = await prisma.testimonial.groupBy({
      by: ["category"],
      _count: { category: true },
      where: { isActive: true },
    });
    result.forEach((r) => {
      counts[r.category] = r._count.category;
    });
  } catch {
    // Fallback
  }

  return (
    <section className="relative bg-gradient-to-b from-cream to-white py-24 overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-saffron/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-warm-orange/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-saffron mb-3">
            ✦ Categories
          </span>
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">
            Hear Their Stories
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-saffron to-transparent" />
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
            From Actors to Athletes, CEOs to Students — Sudarshan Kriya has
            touched lives across every walk of life
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/testimonials/${cat.slug}`}
              className="group relative flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-br from-white to-cream p-6 ring-1 ring-saffron/10 transition-all duration-300 hover:ring-saffron/40 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-saffron/5 transition-all duration-300 group-hover:bg-saffron/10 group-hover:scale-110">
                <span className="text-4xl">{cat.emoji}</span>
              </div>
              <span className="font-semibold text-navy text-sm text-center">
                {cat.label}
              </span>
              <span className="rounded-full bg-gradient-to-r from-saffron to-warm-orange px-3 py-0.5 text-xs font-bold text-white">
                {counts[cat.key] || 0}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
