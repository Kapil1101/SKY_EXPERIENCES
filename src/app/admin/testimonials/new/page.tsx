"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { Upload, User, FileText, MapPin, Share2, Star } from "lucide-react";

const CATEGORIES = [
  { value: "ACTORS", label: "🎬 Actors" },
  { value: "INFLUENCERS", label: "📱 Influencers" },
  { value: "CRICKETERS", label: "🏏 Cricketers" },
  { value: "CEOS", label: "💼 CEOs" },
  { value: "ATHLETES", label: "🏅 Athletes" },
  { value: "MUSICIANS", label: "🎵 Musicians" },
  { value: "SCIENTISTS", label: "🔬 Scientists" },
  { value: "DOCTORS", label: "🩺 Doctors" },
  { value: "ENTREPRENEURS", label: "🚀 Entrepreneurs" },
  { value: "STUDENTS", label: "📚 Students" },
  { value: "SPIRITUAL_LEADERS", label: "🙏 Spiritual Leaders" },
  { value: "GENERAL_PUBLIC", label: "✨ General Public" },
  { value: "OTHER", label: "📌 Other" },
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
    imageUrl: "",
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
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/admin/testimonials" className="text-sm text-saffron hover:underline">
            ← Back to Testimonials
          </Link>
          <h1 className="mt-4 font-heading text-3xl font-bold text-navy">
            Add New Testimonial
          </h1>
          <p className="mt-1 text-sm text-muted">Share a new Sudarshan Kriya experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Person Info Card */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <User size={20} className="text-saffron" />
              <h2 className="font-heading text-lg font-bold text-navy">Person Details</h2>
            </div>

            {/* Photo URL + Preview */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-navy mb-1">
                Photo URL
              </label>
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    type="url"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                    placeholder="https://example.com/photo.jpg"
                  />
                  <p className="mt-1 text-xs text-muted">
                    Upload photo to{" "}
                    <a href="https://postimages.org" target="_blank" rel="noopener noreferrer" className="text-saffron underline">
                      postimages.org
                    </a>{" "}
                    or{" "}
                    <a href="https://imgur.com" target="_blank" rel="noopener noreferrer" className="text-saffron underline">
                      imgur.com
                    </a>{" "}
                    (free) → paste the direct link. Leave empty for avatar.
                  </p>
                </div>
                <div className="shrink-0">
                  {form.imageUrl ? (
                    <img
                      src={form.imageUrl}
                      alt="Preview"
                      className="h-16 w-16 rounded-full object-cover border-2 border-saffron/30"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "";
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-saffron to-warm-orange flex items-center justify-center text-white text-xl font-bold">
                      {form.name ? form.name.charAt(0).toUpperCase() : "?"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-navy mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                placeholder="e.g. Virat Kohli"
              />
            </div>

            {/* Category + Profession + Nationality */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Profession</label>
                <input
                  type="text"
                  value={form.profession}
                  onChange={(e) => setForm({ ...form, profession: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                  placeholder="e.g. Cricketer"
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
          </div>

          {/* Testimonial Content Card */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <FileText size={20} className="text-saffron" />
              <h2 className="font-heading text-lg font-bold text-navy">Their Experience</h2>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-navy mb-1">
                Full Testimonial <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={6}
                value={form.statement}
                onChange={(e) => setForm({ ...form, statement: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                placeholder="Write their full experience with Sudarshan Kriya here..."
              />
              <p className="mt-1 text-xs text-muted">{form.statement.length} characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-1">
                Short Quote <span className="text-muted text-xs">(shown on cards, max 280 chars)</span>
              </label>
              <input
                type="text"
                maxLength={280}
                value={form.shortQuote}
                onChange={(e) => setForm({ ...form, shortQuote: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                placeholder="Leave empty to auto-generate from testimonial"
              />
            </div>
          </div>

          {/* Links Card */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Share2 size={20} className="text-saffron" />
              <h2 className="font-heading text-lg font-bold text-navy">Links (Optional)</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Social Media URL</label>
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
          </div>

          {/* Settings & Submit */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Star size={20} className="text-saffron" />
              <h2 className="font-heading text-lg font-bold text-navy">Display Settings</h2>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <input
                type="checkbox"
                id="featured"
                checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                className="h-5 w-5 rounded border-gray-300 text-saffron focus:ring-saffron"
              />
              <label htmlFor="featured" className="text-sm text-navy">
                ⭐ Feature this testimonial on the homepage
              </label>
            </div>

            {/* Live Preview */}
            <div className="mb-6 rounded-xl bg-cream p-4">
              <p className="text-xs font-medium text-muted mb-3 uppercase tracking-wide">Live Preview</p>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  {form.imageUrl ? (
                    <img src={form.imageUrl} alt="" className="h-10 w-10 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-saffron to-warm-orange flex items-center justify-center text-white font-bold text-sm">
                      {form.name ? form.name.charAt(0).toUpperCase() : "?"}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-navy text-sm">{form.name || "Person Name"}</p>
                    <p className="text-xs text-muted">{form.profession || "Profession"}</p>
                  </div>
                </div>
                <p className="text-sm text-navy/70 italic">
                  &ldquo;{form.shortQuote || form.statement?.slice(0, 120) || "Their quote will appear here..."}&rdquo;
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-saffron to-warm-orange py-4 font-bold text-white text-lg transition-all hover:shadow-lg hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "✨ Adding Testimonial..." : "✨ Add Testimonial"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
