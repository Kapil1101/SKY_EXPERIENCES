"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const CATEGORIES = [
  "ACTORS", "INFLUENCERS", "CRICKETERS", "CEOS", "ATHLETES",
  "MUSICIANS", "SCIENTISTS", "DOCTORS", "ENTREPRENEURS",
  "STUDENTS", "SPIRITUAL_LEADERS", "GENERAL_PUBLIC", "OTHER",
];

export default function AddTestimonialPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "GENERAL_PUBLIC",
    statement: "",
    shortQuote: "",
    profession: "",
    nationality: "",
    socialUrl: "",
    videoUrl: "",
    isFeatured: false,
  });

  if (status === "unauthenticated") {
    router.push("/admin/login");
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          shortQuote: form.shortQuote || form.statement.slice(0, 280),
        }),
      });

      if (res.ok) {
        toast.success("Testimonial added successfully!");
        setTimeout(() => router.push("/admin/testimonials"), 1000);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to add testimonial");
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  }

  return (
    <div className="pt-16 bg-cream min-h-screen">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/admin/testimonials" className="text-sm text-saffron hover:underline">
            ← Back to Testimonials
          </Link>
          <h1 className="mt-4 font-heading text-3xl font-bold text-navy">
            Add New Testimonial
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-sm space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
              placeholder="Person's full name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Statement */}
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Full Statement <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={form.statement}
              onChange={(e) => setForm({ ...form, statement: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
              placeholder="Their full testimonial about Sudarshan Kriya..."
            />
          </div>

          {/* Short Quote */}
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Short Quote <span className="text-muted">(for card display, max 280 chars)</span>
            </label>
            <input
              type="text"
              maxLength={280}
              value={form.shortQuote}
              onChange={(e) => setForm({ ...form, shortQuote: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
              placeholder="Leave empty to auto-generate from statement"
            />
          </div>

          {/* Profession & Nationality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Profession</label>
              <input
                type="text"
                value={form.profession}
                onChange={(e) => setForm({ ...form, profession: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                placeholder="e.g. Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Nationality</label>
              <input
                type="text"
                value={form.nationality}
                onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                placeholder="e.g. India"
              />
            </div>
          </div>

          {/* Social & Video URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Social URL</label>
              <input
                type="url"
                value={form.socialUrl}
                onChange={(e) => setForm({ ...form, socialUrl: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Video URL</label>
              <input
                type="url"
                value={form.videoUrl}
                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={form.isFeatured}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-saffron focus:ring-saffron"
            />
            <label htmlFor="featured" className="text-sm text-navy">
              Feature on homepage
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-saffron py-3 font-semibold text-white transition-all hover:bg-warm-orange disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Testimonial"}
          </button>
        </form>
      </div>
    </div>
  );
}

