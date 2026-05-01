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
    // Fallback to empty counts if DB not available
  }

  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            Hear Their Stories
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            From Actors to Athletes, CEOs to Students — Sudarshan Kriya has
            touched lives across every walk of life
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/testimonials/${cat.slug}`}
              className="group flex flex-col items-center gap-2 rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:bg-saffron/5"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">
                {cat.emoji}
              </span>
              <span className="font-semibold text-navy text-sm text-center">
                {cat.label}
              </span>
              <span className="rounded-full bg-saffron/10 px-3 py-0.5 text-xs font-medium text-saffron">
                {counts[cat.key] || 0}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
