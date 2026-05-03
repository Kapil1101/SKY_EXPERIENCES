import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sudarshan Kriya Experiences — Transform Your Life",
    template: "%s | Sudarshan Kriya Experiences",
  },
  description:
    "Discover transformative experiences of Sudarshan Kriya practitioners from around the world. Real stories of stress relief, mental clarity, and inner peace.",
  keywords: [
    "Sudarshan Kriya",
    "Art of Living",
    "meditation",
    "breathing technique",
    "stress relief",
    "Sri Sri Ravi Shankar",
  ],
  openGraph: {
    title: "Sudarshan Kriya Experiences — Real Stories of Transformation",
    description:
      "Discover how Sudarshan Kriya has transformed millions of lives across the world. Read real experiences and begin your journey.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudarshan Kriya Experiences — Real Stories of Transformation",
    description:
      "Discover how Sudarshan Kriya has transformed millions of lives across the world. Read real experiences.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body antialiased">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-saffron focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}






