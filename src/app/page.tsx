import HeroSection from "@/components/sections/HeroSection";
import CategoryCarousel from "@/components/sections/CategoryCarousel";
import FeaturedTestimonials from "@/components/sections/FeaturedTestimonials";
import StatsSection from "@/components/sections/StatsSection";
import GurudevPreview from "@/components/sections/GurudevPreview";
import SKYPreview from "@/components/sections/SKYPreview";
import ResearchHighlights from "@/components/sections/ResearchHighlights";
import BenefitsMarquee from "@/components/sections/BenefitsMarquee";
import CoursesPreview from "@/components/sections/CoursesPreview";
import AOLPreview from "@/components/sections/AOLPreview";
import CTASection from "@/components/sections/CTASection";

export const revalidate = 60; // Refresh every 60 seconds

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryCarousel />
      <FeaturedTestimonials />
      <StatsSection />
      <GurudevPreview />
      <SKYPreview />
      <ResearchHighlights />
      <BenefitsMarquee />
      <CoursesPreview />
      <AOLPreview />
      <CTASection />
    </>
  );
}


