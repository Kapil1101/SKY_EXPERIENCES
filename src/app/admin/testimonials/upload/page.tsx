"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { Upload, FileSpreadsheet, Download } from "lucide-react";

export default function UploadExcelPage() {
  const { status } = useSession();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    message: string;
    success: number;
    errors: string[];
  } | null>(null);

  if (status === "unauthenticated") {
    router.push("/admin/login");
    return null;
  }

  async function handleUpload() {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/testimonials/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data);
        toast.success(data.message);
        setFile(null);
        if (fileRef.current) fileRef.current.value = "";
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  }

  function downloadTemplate() {
    const headers = [
      "Name",
      "Category",
      "Statement",
      "Short Quote",
      "Profession",
      "Nationality",
      "Social URL",
      "Video URL",
      "Image URL",
      "Featured",
    ];
    const sampleRow = [
      "John Doe",
      "GENERAL_PUBLIC",
      "Sudarshan Kriya changed my life. I feel more peaceful and focused every day.",
      "SKY changed my life completely.",
      "Software Engineer",
      "India",
      "https://instagram.com/example",
      "https://youtube.com/watch?v=example",
      "",
      "false",
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      sampleRow.join(",");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "testimonials_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            Upload Excel / CSV
          </h1>
          <p className="mt-2 text-sm text-muted">
            Bulk add testimonials from a spreadsheet file
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          {/* Download Template */}
          <div className="mb-8 rounded-xl bg-navy/5 p-4">
            <h3 className="font-semibold text-navy text-sm mb-2">📋 Template</h3>
            <p className="text-xs text-muted mb-3">
              Download the template CSV, fill in your data, then upload it here.
              Required columns: <strong>Name, Category, Statement</strong>.
            </p>
            <button
              onClick={downloadTemplate}
              className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-xs font-medium text-white hover:bg-navy/90 transition-colors"
            >
              <Download size={14} />
              Download Template
            </button>
          </div>

          {/* Valid Categories Info */}
          <div className="mb-8 rounded-xl bg-saffron/5 border border-saffron/20 p-4">
            <h3 className="font-semibold text-navy text-sm mb-2">📂 Valid Categories</h3>
            <p className="text-xs text-muted leading-relaxed">
              ACTORS, INFLUENCERS, CRICKETERS, CEOS, ATHLETES, MUSICIANS,
              SCIENTISTS, DOCTORS, ENTREPRENEURS, STUDENTS, SPIRITUAL_LEADERS,
              GENERAL_PUBLIC, OTHER
            </p>
          </div>

          {/* Upload Zone */}
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center cursor-pointer hover:border-saffron/50 hover:bg-saffron/5 transition-all"
          >
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            {file ? (
              <div>
                <FileSpreadsheet size={48} className="mx-auto text-sage" />
                <p className="mt-3 font-medium text-navy">{file.name}</p>
                <p className="mt-1 text-xs text-muted">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            ) : (
              <div>
                <Upload size={48} className="mx-auto text-muted" />
                <p className="mt-3 font-medium text-navy">
                  Click to upload or drag & drop
                </p>
                <p className="mt-1 text-xs text-muted">
                  Excel (.xlsx, .xls) or CSV files
                </p>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="mt-6 w-full rounded-lg bg-saffron py-3 font-semibold text-white transition-all hover:bg-warm-orange disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading & Processing..." : "Upload & Add Testimonials"}
          </button>

          {/* Results */}
          {result && (
            <div className="mt-6 rounded-xl bg-sage/5 border border-sage/20 p-4">
              <h3 className="font-semibold text-sage mb-2">✅ {result.message}</h3>
              {result.errors.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-xs font-medium text-red-600 mb-1">Errors:</h4>
                  <ul className="space-y-1">
                    {result.errors.map((err, i) => (
                      <li key={i} className="text-xs text-red-500">
                        {err}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

