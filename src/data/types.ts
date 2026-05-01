export interface Testimonial {
  id: string;
  name: string;
  slug: string;
  category: Category;
  imageUrl: string;
  statement: string;
  shortQuote: string;
  profession?: string;
  nationality?: string;
  socialUrl?: string;
  videoUrl?: string;
  isFeatured: boolean;
}

export type Category =
  | "ACTORS"
  | "INFLUENCERS"
  | "CRICKETERS"
  | "CEOS"
  | "ATHLETES"
  | "MUSICIANS"
  | "SCIENTISTS"
  | "DOCTORS"
  | "ENTREPRENEURS"
  | "STUDENTS"
  | "SPIRITUAL_LEADERS"
  | "GENERAL_PUBLIC";

export interface CategoryInfo {
  key: Category;
  label: string;
  emoji: string;
  slug: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  suffix: string;
  icon: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  abstract: string;
  url: string;
  category: string;
}

export interface Benefit {
  title: string;
  description: string;
}

export interface BenefitSection {
  category: string;
  icon: string;
  color: string;
  benefits: Benefit[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  courseType: string;
  duration: string;
  isOnline: boolean;
  registrationUrl: string;
  imageEmoji: string;
  highlights: string[];
}

