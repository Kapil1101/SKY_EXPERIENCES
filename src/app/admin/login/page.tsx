"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream pt-16">
      <div className="w-full max-w-md mx-4">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="text-center mb-8">
            <span className="text-4xl">🔐</span>
            <h1 className="mt-4 font-heading text-2xl font-bold text-navy">
              Admin Login
            </h1>
            <p className="mt-2 text-sm text-muted">
              Sign in to manage testimonials and content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-navy focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-navy mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-navy focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-saffron py-3 font-semibold text-white transition-all hover:bg-warm-orange disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

