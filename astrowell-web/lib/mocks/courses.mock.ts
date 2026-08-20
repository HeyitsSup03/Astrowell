export interface CourseModule {
  week: number;
  title: string;
  description: string;
  lessons: string[];
}

export interface CourseScheduleSlot {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: "astrology" | "yoga" | "dietetics" | "tarot";
  categoryLabel: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  thumbnailUrl: string;
  batchStartDate: string;
  batchSchedule: string;
  durationWeeks: number;
  seatsLeft: number;
  description?: string;
  enrolledCount?: number;
  maxSeats?: number;
  scheduleSlots?: CourseScheduleSlot[];
  instructor: {
    name: string;
    role: string;
    avatarUrl: string;
    experienceYears: number;
    bio: string;
  };
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  curriculum: CourseModule[];
  certificateIncluded: boolean;
}

export const MOCK_COURSE_CATEGORIES = [
  { id: "all", label: "All Courses" },
  { id: "astrology", label: "Vedic Astrology" },
  { id: "yoga", label: "Vedic Yoga & Kriya" },
  { id: "dietetics", label: "Ayurvedic Dietetics" },
  { id: "tarot", label: "Tarot & Intuition" },
] as const;

export const MOCK_COURSES: Course[] = [
  {
    id: "course-1",
    title: "Vedic Astrology Masterclass: Birth Chart Analysis & Dasha Remedies",
    slug: "vedic-astrology-masterclass",
    category: "astrology",
    categoryLabel: "VEDIC ASTROLOGY",
    level: "All Levels",
    price: 4999,
    originalPrice: 9999,
    rating: 4.9,
    reviewCount: 340,
    studentCount: 1250,
    thumbnailUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80",
    batchStartDate: "October 15, 2026",
    batchSchedule: "Mon & Thu • 7:00 PM - 8:30 PM IST",
    durationWeeks: 4,
    seatsLeft: 5,
    instructor: {
      name: "Acharya Pandit Ramnath",
      role: "Senior Vedic Astrologer & Sanskrit Scholar",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramnath",
      experienceYears: 22,
      bio: "Acharya Ramnath holds a Master's degree in Jyotishya from Sampurnanand Sanskrit University, Varanasi. He has guided over 15,000 students globally.",
    },
    shortDescription: "Master the ancient art of reading Janma Kundli, planetary Dashas, transit prediction, and effective Vedic remedies in a 4-week live video batch.",
    fullDescription: "Join Acharya Ramnath in this intensive 4-week live interactive video course designed to transform your understanding of Vedic Astrology. From reading 12 houses and 9 planets to calculating Vimshottari Dasha cycles and prescribing gemstone or mantra remedies, this certification equips you to read birth charts professionally.",
    highlights: [
      "8 Live 90-Minute Interactive Video Sessions + Q&A",
      "Lifetime Access to Session Recordings & Class PDFs",
      "Detailed 12 Houses & 9 Planets Reading Guidebook",
      "Vedic Consecration & Gemstone Selection Framework",
      "Government-Recognized Astrowell Academy Certificate",
    ],
    curriculum: [
      {
        week: 1,
        title: "Foundations of Vedic Astrology & The 12 Houses (Bhavas)",
        description: "Introduction to Rasis, Nakshatras, and decoding the 12 houses of human destiny.",
        lessons: [
          "Understanding the Sidereal Zodiac vs Tropical Zodiac",
          "The 12 Rasis & planetary rulerships",
          "Deciphering the 12 Houses (Trikona, Kendra, Dusthana)",
          "Live Chart Reading Drill #1",
        ],
      },
      {
        week: 2,
        title: "Planetary Strengths, Aspects & Yogas",
        description: "Analyze planetary dignity (Exaltation, Debilitation) and powerful Dhan/Raja Yogas.",
        lessons: [
          "Drishti (Planetary Aspects) & Combust Planets",
          "Gajakesari, Pancha Mahapurusha & Lakshmi Yogas",
          "Understanding Retrograde Planets (Vakri Grahas)",
          "Live Chart Reading Drill #2",
        ],
      },
      {
        week: 3,
        title: "Vimshottari Dasha Timing & Planetary Transits (Gochara)",
        description: "Learn exact event timing using Mahadasha, Antardasha, and Saturn/Jupiter transits.",
        lessons: [
          "Vimshottari Dasha calculation & period interpretation",
          "Saturn Sade Sati & Dhaiya remedies",
          "Jupiter transit effects on career & marriage",
          "Predictive Case Studies",
        ],
      },
      {
        week: 4,
        title: "Vedic Remedial Astrology & Professional Consultation Skills",
        description: "Prescribe mantras, gemstones, yantras, and build a successful astrology practice.",
        lessons: [
          "Gemstone selection rules & metal activation",
          "Mantra Jaap & Yantra consecration methods",
          "Ethics of Professional Astrology Consultation",
          "Final Assessment & Live Certification Ceremony",
        ],
      },
    ],
    certificateIncluded: true,
  },
  {
    id: "course-2",
    title: "Authentic Hatha Yoga & Pranayama 200-Hour Teacher Prep",
    slug: "hatha-yoga-pranayama-prep",
    category: "yoga",
    categoryLabel: "YOGA & KRIYA",
    level: "Intermediate",
    price: 5999,
    originalPrice: 11999,
    rating: 5.0,
    reviewCount: 198,
    studentCount: 840,
    thumbnailUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=80",
    batchStartDate: "October 20, 2026",
    batchSchedule: "Tue & Fri • 6:30 AM - 8:00 AM IST",
    durationWeeks: 6,
    seatsLeft: 3,
    instructor: {
      name: "Yogini Sunita Sharma",
      role: "Certified Rishikesh Yoga Master",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita",
      experienceYears: 14,
      bio: "Trained in Rishikesh, Yogini Sunita specializes in Classical Hatha Yoga, Kundalini Kriya, and Breathwork for nervous system healing.",
    },
    shortDescription: "Learn traditional posture alignment, breath retention (Kumbhaka), and daily sadhana techniques in an early-morning live batch.",
    fullDescription: "Deepen your physical and spiritual practice with Rishikesh-certified Yogini Sunita. This 6-week intensive course blends Hatha Yoga postures, Ashtanga Vinyasa transitions, and powerful Pranayama breathwork to restore vitality, align chakras, and prepare you for advanced teaching certification.",
    highlights: [
      "12 Live Early-Morning Practice & Posture Clinics",
      "Step-by-step Anatomy & Alignment Diagrams",
      "Pranayama & Chakra Activation Audio Guides",
      "Personalized Video Feedback on Your Asana Form",
      "Certified Vedic Yoga Practitioner Credential",
    ],
    curriculum: [
      {
        week: 1,
        title: "Classical Hatha Postures & Spinal Alignment",
        description: "Fundamentals of Surya Namaskar, standing balances, and joint mobilization.",
        lessons: [
          "Dynamic Sun Salutations A & B alignment",
          "Standing postures: Virabhadrasana & Trikonasana",
          "Breath-movement synchronization (Vinyasa flow)",
        ],
      },
      {
        week: 2,
        title: "Pranayama & Kumbhaka (Breath Retention)",
        description: "Master Nadi Shodhana, Kapalabhati, Bhastrika, and Ujjayi breathwork.",
        lessons: [
          "Nadi Shodhana for balancing Ida & Pingala Nadis",
          "Kapalabhati for metabolic stimulation & detox",
          "Kumbhaka (Internal & External breath retention)",
        ],
      },
      {
        week: 3,
        title: "Chakra System & Subtle Energy Body",
        description: "Map the 7 major chakras, Nadis, and Bandhas (Energy Locks).",
        lessons: [
          "Mula, Uddiyana & Jalandhara Bandha activation",
          "Chakra Bija Mantra chanting sadhana",
          "Deep Yoga Nidra & Sound Bath Relaxation",
        ],
      },
    ],
    certificateIncluded: true,
  },
  {
    id: "course-3",
    title: "Holistic Ayurvedic Nutrition & Prakriti-Based Dietetics",
    slug: "ayurvedic-nutrition-dietetics",
    category: "dietetics",
    categoryLabel: "AYURVEDIC DIET",
    level: "Beginner",
    price: 3499,
    originalPrice: 6999,
    rating: 4.8,
    reviewCount: 120,
    studentCount: 620,
    thumbnailUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
    batchStartDate: "November 1, 2026",
    batchSchedule: "Wed & Sat • 5:00 PM - 6:30 PM IST",
    durationWeeks: 3,
    seatsLeft: 8,
    instructor: {
      name: "Dr. Ananya Vaidya (BAMS)",
      role: "Ayurvedic Physician & Clinical Nutritionist",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
      experienceYears: 11,
      bio: "Dr. Ananya holds a BAMS degree from Gujarat Ayurveda University and specializes in reversing metabolic & digestive disorders through Ahara Vijnana.",
    },
    shortDescription: "Learn to diagnose Vata, Pitta, and Kapha body types and design personalized healing meal plans using traditional Ayurvedic superfoods.",
    fullDescription: "Food is medicine in the Ayurvedic tradition. Dr. Ananya Vaidya guides you through the principles of Ahara (Dietetics), Agni (Digestive Fire), and Tridosha balancing to heal chronic inflammation, gut dysbiosis, and fatigue through wholesome plant-based nutrition.",
    highlights: [
      "6 Live Interactive Cooking & Meal-Planning Labs",
      "Comprehensive Prakriti Self-Assessment Assessment",
      "50+ Ayurvedic Medicinal Recipes eBook",
      "Seasonal Ritucharya Meal Plan Templates",
      "Ayurvedic Nutritionist Certificate",
    ],
    curriculum: [
      {
        week: 1,
        title: "Tridosha Analysis & Determining Body Constitution (Prakriti)",
        description: "Identify Vata, Pitta, and Kapha traits and analyze Agni (Digestive Fire).",
        lessons: [
          "Understanding the 5 Elements & 3 Doshas",
          "Prakriti vs Vikriti (Current Imbalance)",
          "The 4 types of Agni (Samagni, Vishamagni, Tikshnagni, Mandagni)",
        ],
      },
      {
        week: 2,
        title: "The 6 Rasa (Tastes) & Food Combination Rules (Viruddha Ahara)",
        description: "Use Sweet, Sour, Salty, Bitter, Pungent, and Astringent tastes for healing.",
        lessons: [
          "The 6 Tastes & their thermal effects (Virya)",
          "Toxic food combinations to avoid (Viruddha Ahara)",
          "Ayurvedic herbs: Turmeric, Triphala, Ashwagandha in cooking",
        ],
      },
    ],
    certificateIncluded: true,
  },
  {
    id: "course-4",
    title: "Intuitive Tarot Reading & Symbology Masterclass",
    slug: "tarot-reading-symbology",
    category: "tarot",
    categoryLabel: "TAROT & INTUITION",
    level: "Beginner",
    price: 2999,
    originalPrice: 5999,
    rating: 4.9,
    reviewCount: 260,
    studentCount: 910,
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    batchStartDate: "October 18, 2026",
    batchSchedule: "Sunday Special • 4:00 PM - 7:00 PM IST",
    durationWeeks: 2,
    seatsLeft: 4,
    instructor: {
      name: "Tarot Reader Natasha Varma",
      role: "Intuitive Counselor & Psychometry Expert",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Natasha",
      experienceYears: 9,
      bio: "Natasha has conducted over 8,000 private Tarot consultations worldwide and trains intuitive readers in Rider-Waite symbology and energy protection.",
    },
    shortDescription: "Unlock your psychic intuition, decode the 78 Rider-Waite cards, and master 3-card and Celtic Cross spreads in a weekend live workshop.",
    fullDescription: "Step into the mystical realm of Tarot with Natasha Varma. Learn the esoteric symbolism of the 22 Major Arcana and 56 Minor Arcana cards, develop psychic boundaries, and conduct confidential readings for clients with confidence.",
    highlights: [
      "2 Extended 3-Hour Live Interactive Masterclasses",
      "High-Resolution Printable Symbol Keycards",
      "Celtic Cross & Relationship Spread Reference Guides",
      "Energy Cleansing & Deck Consecration Ritual",
      "Certified Tarot Practitioner Certificate",
    ],
    curriculum: [
      {
        week: 1,
        title: "Major Arcana Journey & Card Archetypes",
        description: "The Fool's Journey from Card 0 to Card 21 World.",
        lessons: [
          "Decoding numbers, colors, and astrological correspondences",
          "The 22 Major Arcana soul lessons",
          "Intuitive card shuffling & deck cleansing",
        ],
      },
      {
        week: 2,
        title: "Minor Arcana Suits & Advanced Spread Work",
        description: "Wands, Cups, Swords, Pentacles, and Celtic Cross spreads.",
        lessons: [
          "Element Rulerships: Fire, Water, Air, Earth",
          "3-Card Past/Present/Future & Love Spreads",
          "Building a Paid Tarot Consultation Practice",
        ],
      },
    ],
    certificateIncluded: true,
  },
];

export const coursesMock = MOCK_COURSES;
