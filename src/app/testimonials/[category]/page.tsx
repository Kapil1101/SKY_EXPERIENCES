import { Metadata } from "next";
import Link from "next/link";
import { categories, getCategoryBySlug } from "@/data/categories";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const cat = getCategoryBySlug(params.category);
  return {
    title: cat ? `${cat.label} — SKY Experiences` : "Category",
    description: cat
      ? `Hear transformative Sudarshan Kriya experiences from ${cat.label}`
      : undefined,
  };
}

export const revalidate = 60;

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const cat = getCategoryBySlug(params.category);
  if (!cat) notFound();

  let testimonials: any[] = [];
  try {
    testimonials = await prisma.testimonial.findMany({
      where: { category: cat.key as any, isActive: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    // DB not available
  }

  return (
    <div className="pt-16 bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-saffron">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/testimonials" className="hover:text-saffron">
            Testimonials
          </Link>
          <span className="mx-2">/</span>
          <span className="text-navy font-medium">{cat.label}</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl">{cat.emoji}</span>
          <h1 className="mt-4 font-heading text-4xl font-bold text-navy sm:text-5xl">
            Experiences from {cat.label}
          </h1>
          <p className="mt-4 text-lg text-muted">
            {testimonials.length}{" "}
            {testimonials.length === 1 ? "story" : "stories"} shared
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-20 rounded-2xl bg-white shadow-sm">
            <span className="text-5xl">🌟</span>
            <h2 className="mt-4 font-heading text-2xl font-bold text-navy">
              Coming Soon
            </h2>
            <p className="mt-2 text-muted max-w-md mx-auto">
              We&apos;re gathering amazing experiences from {cat.label}. Check
              back soon!
            </p>
            <Link
              href="/testimonials"
              className="mt-6 inline-block rounded-full bg-saffron px-6 py-3 font-semibold text-white hover:bg-warm-orange"
            >
              Browse All Experiences
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <article
                key={t.id}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-warm-orange text-white font-bold text-lg shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy text-sm">
                      {t.name}
                    </h3>
                    {t.profession && (
                      <p className="text-xs text-muted">{t.profession}</p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-navy/70 leading-relaxed italic mb-4">
                  &ldquo;{t.shortQuote}&rdquo;
                </p>
                <p className="text-xs text-muted leading-relaxed">
                  {t.statement}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
