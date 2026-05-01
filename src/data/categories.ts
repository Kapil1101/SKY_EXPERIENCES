import { CategoryInfo } from "./types";

export const categories: CategoryInfo[] = [
  { key: "ACTORS", label: "Actors", emoji: "🎬", slug: "actors" },
  { key: "INFLUENCERS", label: "Influencers", emoji: "📱", slug: "influencers" },
  { key: "CRICKETERS", label: "Cricketers", emoji: "🏏", slug: "cricketers" },
  { key: "CEOS", label: "CEOs", emoji: "💼", slug: "ceos" },
  { key: "ATHLETES", label: "Athletes", emoji: "🏅", slug: "athletes" },
  { key: "MUSICIANS", label: "Musicians", emoji: "🎵", slug: "musicians" },
  { key: "SCIENTISTS", label: "Scientists", emoji: "🔬", slug: "scientists" },
  { key: "DOCTORS", label: "Doctors", emoji: "🩺", slug: "doctors" },
  { key: "ENTREPRENEURS", label: "Entrepreneurs", emoji: "🚀", slug: "entrepreneurs" },
  { key: "STUDENTS", label: "Students", emoji: "📚", slug: "students" },
  { key: "SPIRITUAL_LEADERS", label: "Spiritual Leaders", emoji: "🙏", slug: "spiritual-leaders" },
  { key: "GENERAL_PUBLIC", label: "General Public", emoji: "✨", slug: "general-public" },
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryByKey(key: string): CategoryInfo | undefined {
  return categories.find((c) => c.key === key);
}

