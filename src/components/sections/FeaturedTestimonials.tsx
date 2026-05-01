import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCategoryByKey } from "@/data/categories";

export default async function FeaturedTestimonials() {
  let featured: any[] = [];

  try {
    featured = await prisma.testimonial.findMany({
      where: { isFeatured: true, isActive: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      take: 8,
    });
  } catch {
    // Fallback to empty if DB not available
  }

  if (featured.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            Voices of Transformation
          </h2>
          <p className="mt-4 text-lg text-muted">
            Real stories from real people whose lives changed with Sudarshan Kriya
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((t) => {
            const cat = getCategoryByKey(t.category);
            return (
              <article
                key={t.id}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  {t.imageUrl ? (
                    <img src={t.imageUrl} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-warm-orange text-white font-bold text-lg">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-navy text-sm">{t.name}</h3>
                    {t.profession && (
                      <p className="text-xs text-muted">{t.profession}</p>
                    )}
                  </div>
                </div>
                {cat && (
                  <span className="inline-block rounded-full bg-saffron/10 px-3 py-1 text-xs font-medium text-saffron mb-3">
                    {cat.emoji} {cat.label}
                  </span>
                )}
                <p className="text-sm text-navy/70 leading-relaxed italic">
                  &ldquo;{t.shortQuote}&rdquo;
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/testimonials"
            className="inline-block rounded-full bg-navy px-8 py-3 font-semibold text-white transition-all hover:bg-navy/90 hover:scale-105"
          >
            View All Experiences →
          </Link>
        </div>
      </div>
    </section>
  );
}

