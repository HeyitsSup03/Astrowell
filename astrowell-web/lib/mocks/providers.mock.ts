// ============================================================
// Mock Data: Providers
// ============================================================
// Note: mockFetch is defined in lib/mocks/index.ts

export interface Provider {
  id: string;
  name: string;
  category: "astrologer" | "yoga" | "dietitian" | "tarot";
  avatarUrl: string;
  isOnline: boolean;
  rating: number;
  reviewCount: number;
  languages: string[];
  experienceYears: number;
  ratePerMin: number; // in INR
  bio: string;
  specializations: string[];
  totalSessions: number;
}

export const providersMock: Provider[] = [
  {
    id: "prov-001",
    name: "Pandit Raghavendra Joshi",
    category: "astrologer",
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Raghavendra",
    isOnline: true,
    rating: 4.9,
    reviewCount: 1842,
    languages: ["Hindi", "English", "Marathi"],
    experienceYears: 18,
    ratePerMin: 30,
    bio: "Vedic astrologer with 18 years of experience specialising in Kundli analysis, career guidance, and marriage compatibility. Trained under Pt. Harikrishna Mishra at Varanasi.",
    specializations: ["Kundli", "Marriage", "Career", "Vastu"],
    totalSessions: 12400,
  },
  {
    id: "prov-002",
    name: "Ananya Krishnamurthy",
    category: "astrologer",
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Ananya",
    isOnline: true,
    rating: 4.8,
    reviewCount: 976,
    languages: ["Tamil", "English", "Telugu"],
    experienceYears: 12,
    ratePerMin: 20,
    bio: "South Indian astrology expert specialising in Navamsa charts, Gemstone recommendations, and Dasha predictions. Over 12 years of guiding individuals through life transitions.",
    specializations: ["Navamsa", "Gemstones", "Dasha", "Remedies"],
    totalSessions: 7800,
  },
  {
    id: "prov-003",
    name: "Tarot Priya Sharma",
    category: "tarot",
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Priya",
    isOnline: false,
    rating: 4.7,
    reviewCount: 654,
    languages: ["Hindi", "English"],
    experienceYears: 8,
    ratePerMin: 15,
    bio: "Certified Tarot reader and numerologist. Helps clients gain clarity on love, career, and life path. Known for her empathetic and non-judgmental reading style.",
    specializations: ["Love & Relationships", "Career", "Numerology"],
    totalSessions: 4200,
  },
  {
    id: "prov-004",
    name: "Yogacharya Suresh Iyer",
    category: "yoga",
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Suresh",
    isOnline: true,
    rating: 4.9,
    reviewCount: 521,
    languages: ["Tamil", "English", "Kannada"],
    experienceYears: 22,
    ratePerMin: 12,
    bio: "Certified Hatha & Kundalini Yoga teacher trained at Mysore Yogashala. Conducts personalised 1:1 sessions and group classes for all levels. Specialises in therapeutic yoga.",
    specializations: ["Hatha Yoga", "Kundalini", "Pranayama", "Meditation"],
    totalSessions: 3600,
  },
  {
    id: "prov-005",
    name: "Dr. Meena Agarwal",
    category: "dietitian",
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Meena",
    isOnline: true,
    rating: 4.6,
    reviewCount: 312,
    languages: ["Hindi", "English"],
    experienceYears: 10,
    ratePerMin: 18,
    bio: "Registered Dietitian & Ayurvedic Nutrition Consultant. Specialises in dosha-based diet plans, weight management, diabetes, and PCOD nutrition.",
    specializations: ["Ayurvedic Nutrition", "Weight Management", "Diabetes", "PCOD"],
    totalSessions: 2100,
  },
  {
    id: "prov-006",
    name: "Pt. Vikramaditya Pande",
    category: "astrologer",
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Vikramaditya",
    isOnline: false,
    rating: 4.5,
    reviewCount: 2103,
    languages: ["Hindi", "Sanskrit", "English"],
    experienceYears: 25,
    ratePerMin: 45,
    bio: "Third-generation Jyotishi with 25 years of practice. Expert in Prashna kundli, Muhurta selection, and Panchang. Consulted by prominent business families across India.",
    specializations: ["Prashna Kundli", "Muhurta", "Business Astrology", "Panchang"],
    totalSessions: 18900,
  },
  {
    id: "prov-007",
    name: "Rashmi Nair",
    category: "yoga",
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Rashmi",
    isOnline: true,
    rating: 4.8,
    reviewCount: 289,
    languages: ["Malayalam", "English"],
    experienceYears: 7,
    ratePerMin: 10,
    bio: "200-hr RYT certified Vinyasa and Yin Yoga instructor. Focuses on mind-body balance, flexibility, and stress relief. Each session customised to your body and goals.",
    specializations: ["Vinyasa", "Yin Yoga", "Stress Relief", "Flexibility"],
    totalSessions: 1800,
  },
  {
    id: "prov-008",
    name: "Dr. Sunita Bose",
    category: "dietitian",
    avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Sunita",
    isOnline: false,
    rating: 4.7,
    reviewCount: 178,
    languages: ["Bengali", "Hindi", "English"],
    experienceYears: 14,
    ratePerMin: 22,
    bio: "Clinical Dietitian with expertise in therapeutic nutrition. Works with patients managing thyroid disorders, cardiovascular disease, and sports performance.",
    specializations: ["Clinical Nutrition", "Sports Nutrition", "Thyroid", "Heart Health"],
    totalSessions: 1350,
  },
];
