import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  let stats = { total: 0, featured: 0, categories: 0 };
  try {
    const [total, featured, catResult] = await Promise.all([
      prisma.testimonial.count({ where: { isActive: true } }),
      prisma.testimonial.count({ where: { isFeatured: true, isActive: true } }),
      prisma.testimonial.groupBy({ by: ["category"], where: { isActive: true } }),
    ]);
    stats = { total, featured, categories: catResult.length };
  } catch {}

  return (
    <div className="pt-16 bg-cream min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-navy">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted">
              Welcome, {session.user?.email}
            </p>
          </div>
          <Link
            href="/api/auth/signout"
            className="rounded-lg bg-navy/10 px-4 py-2 text-sm text-navy hover:bg-navy/20 transition-colors"
          >
            Sign Out
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-3xl mb-2">📝</div>
            <div className="font-heading text-3xl font-bold text-navy">{stats.total}</div>
            <p className="text-sm text-muted">Total Testimonials</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-3xl mb-2">⭐</div>
            <div className="font-heading text-3xl font-bold text-navy">{stats.featured}</div>
            <p className="text-sm text-muted">Featured</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-3xl mb-2">📂</div>
            <div className="font-heading text-3xl font-bold text-navy">{stats.categories}</div>
            <p className="text-sm text-muted">Categories Active</p>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="font-heading text-xl font-bold text-navy mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/testimonials"
            className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 block"
          >
            <span className="text-3xl">📋</span>
            <h3 className="mt-3 font-semibold text-navy">Manage Testimonials</h3>
            <p className="mt-1 text-sm text-muted">View, edit, delete testimonials</p>
          </Link>
          <Link
            href="/admin/testimonials/new"
            className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 block"
          >
            <span className="text-3xl">➕</span>
            <h3 className="mt-3 font-semibold text-navy">Add Testimonial</h3>
            <p className="mt-1 text-sm text-muted">Add a new experience</p>
          </Link>
          <Link
            href="/admin/testimonials/upload"
            className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 block"
          >
            <span className="text-3xl">📊</span>
            <h3 className="mt-3 font-semibold text-navy">Upload Excel</h3>
            <p className="mt-1 text-sm text-muted">Bulk add from spreadsheet</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

