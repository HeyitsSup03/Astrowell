import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Astrowell — Astrology & Wellness Consultations",
    template: "%s | Astrowell",
  },
  description:
    "Connect with expert astrologers, yoga instructors, and dietitians. Get personalised Kundli analysis, matchmaking reports, and wellness consultations.",
  keywords: [
    "astrology",
    "kundli",
    "horoscope",
    "yoga",
    "wellness",
    "consultation",
    "matchmaking",
    "Vedic astrology",
  ],
  openGraph: {
    title: "Astrowell — Astrology & Wellness Consultations",
    description: "Expert guidance for your cosmic journey.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorantGaramond.variable}`}
      suppressHydrationWarning // needed for class-based dark mode
    >
      <body className="font-body bg-background dark:bg-background-dark text-text-primary dark:text-text-primary-dark antialiased">
        {children}
      </body>
    </html>
  );
}
