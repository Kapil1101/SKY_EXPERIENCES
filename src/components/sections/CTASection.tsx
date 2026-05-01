export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-navy to-navy/95 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Stay Connected
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          Follow the Art of Living on social media for daily inspiration, wisdom,
          and updates on courses and events worldwide.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {[
            { icon: "📺", label: "YouTube", url: "https://www.youtube.com/@ArtofLiving" },
            { icon: "📸", label: "Instagram", url: "https://www.instagram.com/artofliving/" },
            { icon: "🐦", label: "Twitter", url: "https://twitter.com/ArtOfLiving" },
            { icon: "📘", label: "Facebook", url: "https://www.facebook.com/ArtOfLiving/" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-saffron hover:scale-105"
            >
              <span>{social.icon}</span>
              {social.label}
            </a>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="https://www.artofliving.org/us-en/courses"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-saffron px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-warm-orange hover:scale-105"
          >
            Find a Course Near You →
          </a>
        </div>
      </div>
    </section>
  );
}

