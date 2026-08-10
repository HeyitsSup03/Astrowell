// ============================================================
// Mock Data: Courses
// ============================================================

export interface CourseScheduleSlot {
  day: string; // e.g. "Monday", "Wednesday"
  time: string; // e.g. "07:00"
  durationMins: number;
}

export interface Course {
  id: string;
  providerId: string;
  providerName: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  price: number; // INR (one-time)
  schedule: CourseScheduleSlot[];
  enrolledCount: number;
  maxSeats: number;
  category: "yoga" | "astrology" | "meditation" | "nutrition";
  level: "beginner" | "intermediate" | "advanced";
  startDate: string; // ISO date
  durationWeeks: number;
  rating: number;
  reviewCount: number;
}

export const coursesMock: Course[] = [
  {
    id: "course-001",
    providerId: "prov-004",
    providerName: "Yogacharya Suresh Iyer",
    title: "Beginner Pranayama & Breath Mastery",
    description: "A structured 4-week online programme introducing you to the 8 core pranayama techniques. Suitable for complete beginners. Includes live sessions, recorded replays, and a practice guide PDF.",
    thumbnailUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    price: 1200,
    schedule: [
      { day: "Tuesday", time: "07:00", durationMins: 45 },
      { day: "Friday", time: "07:00", durationMins: 45 },
    ],
    enrolledCount: 38,
    maxSeats: 50,
    category: "yoga",
    level: "beginner",
    startDate: "2026-08-18",
    durationWeeks: 4,
    rating: 4.9,
    reviewCount: 23,
  },
  {
    id: "course-002",
    providerId: "prov-007",
    providerName: "Rashmi Nair",
    title: "Vinyasa Flow for Flexibility",
    description: "Intermediate-level dynamic Vinyasa sequences to build strength, improve flexibility and relieve tension. Three live classes per week with optional 1:1 check-in.",
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    price: 1800,
    schedule: [
      { day: "Monday", time: "06:30", durationMins: 60 },
      { day: "Wednesday", time: "06:30", durationMins: 60 },
      { day: "Saturday", time: "08:00", durationMins: 60 },
    ],
    enrolledCount: 22,
    maxSeats: 30,
    category: "yoga",
    level: "intermediate",
    startDate: "2026-08-25",
    durationWeeks: 6,
    rating: 4.8,
    reviewCount: 11,
  },
  {
    id: "course-003",
    providerId: "prov-001",
    providerName: "Pandit Raghavendra Joshi",
    title: "Vedic Astrology Foundations",
    description: "Learn to read your own birth chart. Covers the 12 houses, 9 planets, nakshatra system, and an introduction to Dasha calculation. No prior knowledge required.",
    thumbnailUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400",
    price: 3500,
    schedule: [
      { day: "Sunday", time: "11:00", durationMins: 90 },
    ],
    enrolledCount: 67,
    maxSeats: 100,
    category: "astrology",
    level: "beginner",
    startDate: "2026-09-01",
    durationWeeks: 8,
    rating: 4.9,
    reviewCount: 42,
  },
  {
    id: "course-004",
    providerId: "prov-005",
    providerName: "Dr. Meena Agarwal",
    title: "Ayurvedic Nutrition for Your Dosha",
    description: "Discover your Prakriti (body type) and learn to design a personalised diet aligned with your Vata, Pitta, or Kapha dosha. Includes meal plans and supplement guidance.",
    thumbnailUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
    price: 2200,
    schedule: [
      { day: "Saturday", time: "10:00", durationMins: 75 },
    ],
    enrolledCount: 15,
    maxSeats: 25,
    category: "nutrition",
    level: "beginner",
    startDate: "2026-08-30",
    durationWeeks: 5,
    rating: 4.7,
    reviewCount: 8,
  },
  {
    id: "course-005",
    providerId: "prov-004",
    providerName: "Yogacharya Suresh Iyer",
    title: "Kundalini Awakening — 21-Day Journey",
    description: "An immersive 21-day programme exploring Kundalini yoga kriyas, mantra, mudra, and meditation. Daily guided practices with weekly live integration calls.",
    thumbnailUrl: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=400",
    price: 4500,
    schedule: [
      { day: "Daily", time: "06:00", durationMins: 60 },
    ],
    enrolledCount: 44,
    maxSeats: 60,
    category: "meditation",
    level: "intermediate",
    startDate: "2026-09-10",
    durationWeeks: 3,
    rating: 4.9,
    reviewCount: 31,
  },
  {
    id: "course-006",
    providerId: "prov-002",
    providerName: "Ananya Krishnamurthy",
    title: "Advanced Navamsa & Divisional Charts",
    description: "Deep-dive into D-9 (Navamsa), D-10 (Dasamsa), and D-7 (Saptamsa) charts. For students who have completed a foundations course in Vedic Astrology.",
    thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    price: 5000,
    schedule: [
      { day: "Thursday", time: "19:00", durationMins: 90 },
      { day: "Sunday", time: "15:00", durationMins: 90 },
    ],
    enrolledCount: 18,
    maxSeats: 20,
    category: "astrology",
    level: "advanced",
    startDate: "2026-09-05",
    durationWeeks: 10,
    rating: 5.0,
    reviewCount: 7,
  },
];
