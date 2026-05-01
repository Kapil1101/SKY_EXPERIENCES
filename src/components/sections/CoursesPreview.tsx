import Link from "next/link";
import { courses } from "@/data/courses";

export default function CoursesPreview() {
  const previewCourses = courses.slice(0, 4);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            Begin Your Journey
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Find the right program to learn Sudarshan Kriya and transform your life
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <span className="text-4xl">{course.imageEmoji}</span>
              <h3 className="mt-4 font-heading font-semibold text-navy">
                {course.title}
              </h3>
              <p className="mt-2 text-sm text-muted line-clamp-3">
                {course.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-navy/5 px-3 py-1 text-xs text-navy">
                  {course.duration}
                </span>
                {course.isOnline && (
                  <span className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage">
                    Online Available
                  </span>
                )}
              </div>
              <a
                href={course.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block w-full rounded-full bg-saffron py-2 text-center text-sm font-semibold text-white transition-all hover:bg-warm-orange"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/courses"
            className="inline-block rounded-full bg-navy px-8 py-3 font-semibold text-white transition-all hover:bg-navy/90 hover:scale-105"
          >
            View All Courses →
          </Link>
        </div>
      </div>
    </section>
  );
}

