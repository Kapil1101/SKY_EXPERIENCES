"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { User, FileText, Share2, Star } from "lucide-react";

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

export default function EditTestimonialPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

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

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
    if (status === "authenticated") fetchTestimonial();
  }, [status]);

  async function fetchTestimonial() {
    try {
      const res = await fetch(`/api/testimonials/${id}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          name: data.name || "",
          category: data.category || "GENERAL_PUBLIC",
          statement: data.statement || "",
          shortQuote: data.shortQuote || "",
          profession: data.profession || "",
          nationality: data.nationality || "",
          imageUrl: data.imageUrl || "",
          socialUrl: data.socialUrl || "",
          videoUrl: data.videoUrl || "",
          isFeatured: data.isFeatured || false,
        });
      }
    } catch {}
    setFetching(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Testimonial updated!");
        setTimeout(() => router.push("/admin/testimonials"), 1000);
      } else {
        toast.error("Failed to update");
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  }

  if (fetching) {
    return (
      <div className="pt-16 bg-cream min-h-screen flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
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
            Edit Testimonial
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Person Info */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <User size={20} className="text-saffron" />
              <h2 className="font-heading text-lg font-bold text-navy">Person Details</h2>
            </div>

            {/* Photo URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-navy mb-1">Photo URL</label>
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                    placeholder="https://i.postimg.cc/xxxxx/photo.jpg"
                  />
                </div>
                <div className="shrink-0">
                  {form.imageUrl ? (
                    <img src={form.imageUrl} alt="Preview" className="h-16 w-16 rounded-full object-cover border-2 border-saffron/30"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-saffron to-warm-orange flex items-center justify-center text-white text-xl font-bold">
                      {form.name ? form.name.charAt(0).toUpperCase() : "?"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-navy mb-1">Full Name *</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Category *</label>
                <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20">
                  {CATEGORIES.map((cat) => (<option key={cat.value} value={cat.value}>{cat.label}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Profession</label>
                <input type="text" value={form.profession} onChange={(e) => setForm({ ...form, profession: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Nationality</label>
                <input type="text" value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <FileText size={20} className="text-saffron" />
              <h2 className="font-heading text-lg font-bold text-navy">Their Experience</h2>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-navy mb-1">Full Testimonial *</label>
              <textarea required rows={6} value={form.statement} onChange={(e) => setForm({ ...form, statement: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Short Quote</label>
              <input type="text" maxLength={280} value={form.shortQuote} onChange={(e) => setForm({ ...form, shortQuote: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20" />
            </div>
          </div>

          {/* Links */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Share2 size={20} className="text-saffron" />
              <h2 className="font-heading text-lg font-bold text-navy">Links</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Social URL</label>
                <input type="text" value={form.socialUrl} onChange={(e) => setForm({ ...form, socialUrl: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Video URL</label>
                <input type="text" value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20" />
              </div>
            </div>
          </div>

          {/* Featured + Submit */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <input type="checkbox" id="featured" checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                className="h-5 w-5 rounded border-gray-300 text-saffron focus:ring-saffron" />
              <label htmlFor="featured" className="text-sm text-navy">⭐ Feature on homepage</label>
            </div>
            <button type="submit" disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-saffron to-warm-orange py-4 font-bold text-white text-lg transition-all hover:shadow-lg disabled:opacity-50">
              {loading ? "Saving..." : "💾 Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

