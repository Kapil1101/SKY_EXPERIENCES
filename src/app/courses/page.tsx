import { Metadata } from "next";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses",
  description: "Explore Art of Living courses to learn Sudarshan Kriya and other transformative practices.",
};

export default function CoursesPage() {
  return (
    <div className="pt-16 bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-navy sm:text-5xl">
            Begin Your Transformation
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Choose the right program to learn Sudarshan Kriya and transformative
            breathing techniques from certified Art of Living teachers
          </p>
        </div>

        {/* Highlight */}
        <div className="mb-12 rounded-2xl bg-gradient-to-r from-saffron to-warm-orange p-8 text-white text-center">
          <h2 className="font-heading text-2xl font-bold">
            🌅 Recommended: The Happiness Program
          </h2>
          <p className="mt-2 text-white/90 max-w-xl mx-auto">
            The flagship 3-day course where you learn the life-changing
            Sudarshan Kriya breathing technique. Over 450 million people
            worldwide have taken this program.
          </p>
          <a
            href="https://www.artofliving.org/us-en/courses"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full bg-white px-6 py-3 font-semibold text-saffron hover:scale-105 transition-all"
          >
            Find a Program Near You →
          </a>
        </div>

        {/* All Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <article
              key={course.id}
              className="rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl shrink-0">{course.imageEmoji}</span>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-navy">
                    {course.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-navy/5 px-3 py-1 text-xs text-navy">
                      {course.duration}
                    </span>
                    {course.isOnline && (
                      <span className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage">
                        Online Available
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm text-navy/70 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="mt-4">
                    <h4 className="text-xs font-semibold text-navy uppercase tracking-wide mb-2">
                      Highlights
                    </h4>
                    <ul className="space-y-1">
                      {course.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="text-xs text-muted flex items-start gap-2"
                        >
                          <span className="text-saffron mt-0.5">✦</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={course.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block rounded-full bg-saffron px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-warm-orange hover:scale-105"
                  >
                    Learn More & Register →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

