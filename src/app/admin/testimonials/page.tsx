"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trash2, Star, StarOff, Edit } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface Testimonial {
  id: string;
  name: string;
  category: string;
  profession?: string;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
}

export default function ManageTestimonialsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
    if (status === "authenticated") fetchAll();
  }, [status]);

  async function fetchAll() {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials?limit=200");
      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch {}
    setLoading(false);
  }

  async function toggleFeatured(id: string, current: boolean) {
    try {
      await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !current }),
      });
      toast.success(current ? "Removed from featured" : "Added to featured");
      fetchAll();
    } catch {
      toast.error("Failed to update");
    }
  }

  async function deleteTestimonial(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      toast.success("Deleted successfully");
      fetchAll();
    } catch {
      toast.error("Failed to delete");
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="pt-16 bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl">⏳</div>
          <p className="mt-4 text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-cream min-h-screen">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-navy">
              Manage Testimonials
            </h1>
            <p className="mt-1 text-sm text-muted">{testimonials.length} total</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/testimonials/upload"
              className="rounded-lg bg-sage px-4 py-2 text-sm font-medium text-white hover:bg-sage/90 transition-colors"
            >
              📊 Upload Excel
            </Link>
            <Link
              href="/admin/testimonials/new"
              className="rounded-lg bg-saffron px-4 py-2 text-sm font-medium text-white hover:bg-warm-orange transition-colors"
            >
              + Add New
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-navy/5">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-navy">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-navy">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-navy">Profession</th>
                  <th className="px-4 py-3 text-center font-medium text-navy">Featured</th>
                  <th className="px-4 py-3 text-center font-medium text-navy">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-cream/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron/10 text-saffron text-xs font-bold">
                          {t.name.charAt(0)}
                        </div>
                        <span className="font-medium text-navy">{t.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-navy/5 px-2 py-1 text-xs">
                        {t.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">{t.profession || "—"}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleFeatured(t.id, t.isFeatured)}
                        className={`rounded-full p-1.5 transition-colors ${
                          t.isFeatured
                            ? "bg-gold/20 text-gold hover:bg-gold/30"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        }`}
                        title={t.isFeatured ? "Remove from featured" : "Add to featured"}
                      >
                        {t.isFeatured ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => deleteTestimonial(t.id, t.name)}
                          className="rounded-full p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {testimonials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted">No testimonials yet. Add one or upload an Excel file!</p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link href="/admin" className="text-sm text-saffron hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

