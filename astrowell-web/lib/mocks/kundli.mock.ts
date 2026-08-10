// ============================================================
// Mock Data: Kundli Reports & Match Results
// ============================================================

export interface Planet {
  name: string;
  sign: string;
  house: number;
  degree: number;
  retrograde: boolean;
}

export interface Dasha {
  planet: string;
  start: string; // ISO date
  end: string;   // ISO date
}

export interface KundliChart {
  ascendant: string;
  moonSign: string;
  sunSign: string;
  nakshatra: string;
  planets: Planet[];
  dashas: Dasha[];
  doshas: {
    manglik: boolean;
    kalsarpa: boolean;
    pitruDosha: boolean;
  };
}

export interface KundliReport {
  id: string;
  birthProfileId: string;
  provider: "astrologyapi" | "prokerala" | "mock";
  chart: KundliChart;
  computedAt: string;
}

export type KutaName =
  | "Varna"
  | "Vashya"
  | "Tara"
  | "Yoni"
  | "Graha Maitri"
  | "Gana"
  | "Bhakoot"
  | "Nadi";

export interface Kuta {
  name: KutaName;
  score: number;
  maxScore: number;
  description: string;
}

export type MatchVerdict = "Excellent" | "Good" | "Average" | "Not Recommended";

export interface MatchResult {
  id: string;
  requestedBy: string;
  birthProfileAId: string;
  birthProfileBId: string;
  provider: "mock";
  gunMilan: {
    totalScore: number;
    kutas: Kuta[];
  };
  doshaFlags: {
    manglikA: boolean;
    manglikB: boolean;
    nadiDosha: boolean;
    bhakootDosha: boolean;
  };
  verdict: MatchVerdict;
  reportPdfUrl: string | null;
  createdAt: string;
}

export const kundliReportMock: KundliReport = {
  id: "kr-001",
  birthProfileId: "bp-001",
  provider: "mock",
  chart: {
    ascendant: "Pisces",
    moonSign: "Scorpio",
    sunSign: "Aries",
    nakshatra: "Anuradha",
    planets: [
      { name: "Sun", sign: "Aries", house: 2, degree: 1.5, retrograde: false },
      { name: "Moon", sign: "Scorpio", house: 9, degree: 18.3, retrograde: false },
      { name: "Mars", sign: "Capricorn", house: 11, degree: 22.1, retrograde: false },
      { name: "Mercury", sign: "Pisces", house: 1, degree: 8.9, retrograde: false },
      { name: "Jupiter", sign: "Sagittarius", house: 10, degree: 14.6, retrograde: false },
      { name: "Venus", sign: "Taurus", house: 3, degree: 27.2, retrograde: false },
      { name: "Saturn", sign: "Aquarius", house: 12, degree: 11.0, retrograde: true },
      { name: "Rahu", sign: "Aries", house: 2, degree: 5.4, retrograde: true },
      { name: "Ketu", sign: "Libra", house: 8, degree: 5.4, retrograde: true },
    ],
    dashas: [
      { planet: "Mercury", start: "2022-01-01", end: "2039-01-01" },
      { planet: "Ketu", start: "2039-01-01", end: "2046-01-01" },
      { planet: "Venus", start: "2046-01-01", end: "2066-01-01" },
    ],
    doshas: {
      manglik: false,
      kalsarpa: false,
      pitruDosha: false,
    },
  },
  computedAt: "2026-08-09T12:00:00+05:30",
};

export const matchResultMock: MatchResult = {
  id: "mr-001",
  requestedBy: "user-001",
  birthProfileAId: "bp-001",
  birthProfileBId: "bp-002",
  provider: "mock",
  gunMilan: {
    totalScore: 28,
    kutas: [
      { name: "Varna", score: 1, maxScore: 1, description: "Compatible social status and spiritual affinity." },
      { name: "Vashya", score: 2, maxScore: 2, description: "Strong mutual influence and control between partners." },
      { name: "Tara", score: 3, maxScore: 3, description: "Excellent health and longevity indicated." },
      { name: "Yoni", score: 3, maxScore: 4, description: "Good sexual compatibility and intimacy." },
      { name: "Graha Maitri", score: 5, maxScore: 5, description: "Strong mental affinity and emotional bonding." },
      { name: "Gana", score: 5, maxScore: 6, description: "Good temperament match, minor adjustments needed." },
      { name: "Bhakoot", score: 7, maxScore: 7, description: "Excellent prosperity and family harmony." },
      { name: "Nadi", score: 2, maxScore: 8, description: "Nadi Dosha present — health of progeny requires attention." },
    ],
  },
  doshaFlags: {
    manglikA: false,
    manglikB: false,
    nadiDosha: true,
    bhakootDosha: false,
  },
  verdict: "Good",
  reportPdfUrl: null,
  createdAt: "2026-08-09T12:00:00+05:30",
};
