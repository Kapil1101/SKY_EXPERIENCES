"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream pt-16">
      <div className="text-center px-4">
        <span className="text-7xl">😔</span>
        <h1 className="mt-6 font-heading text-4xl font-bold text-navy">
          Something went wrong
        </h1>
        <p className="mt-4 text-lg text-muted max-w-md mx-auto">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-8 rounded-full bg-saffron px-6 py-3 font-semibold text-white hover:bg-warm-orange transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

