export interface Product {
  id: string;
  name: string;
  category: "gemstones" | "rudraksha" | "pooja-kits" | "reports" | "yantras";
  categoryLabel: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  certified: boolean;
  description: string;
  benefits: string[];
  inStock: boolean;
  rashi?: string;
  rulingPlanet?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export const MOCK_CATEGORIES = [
  { id: "all", label: "All Products", icon: "✨" },
  { id: "gemstones", label: "Gemstones", icon: "💎" },
  { id: "rudraksha", label: "Rudraksha", icon: "📿" },
  { id: "pooja-kits", label: "Pooja Kits", icon: "🪔" },
  { id: "reports", label: "Kundli Reports", icon: "📜" },
  { id: "yantras", label: "Yantras", icon: "🪐" },
] as const;

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Natural Yellow Sapphire (Pukhraj) 5.25 Carat",
    category: "gemstones",
    categoryLabel: "GEMSTONES",
    price: 14500,
    originalPrice: 18000,
    rating: 4.9,
    reviewCount: 142,
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",
    certified: true,
    description: "100% Original Unheated Sri Lankan Yellow Sapphire (Pukhraj). Energized with Jupiter Vedic Mantras for wisdom, wealth, and academic success.",
    benefits: ["Brings wisdom & higher education success", "Attracts financial prosperity & career growth", "Enhances marital harmony & positive energy"],
    inStock: true,
    rashi: "Dhanu (Sagittarius) / Meen (Pisces)",
    rulingPlanet: "Jupiter (Brihaspati)",
  },
  {
    id: "prod-2",
    name: "Original 5 Mukhi Nepal Rudraksha Mala (108+1 Beads)",
    category: "rudraksha",
    categoryLabel: "RUDRAKSHA",
    price: 2499,
    originalPrice: 3500,
    rating: 4.8,
    reviewCount: 210,
    imageUrl: "https://images.unsplash.com/photo-1611591475777-233cd749228e?w=600&auto=format&fit=crop&q=80",
    certified: true,
    description: "Authentic 5-Face Nepal Rudraksha Mala strung with silk thread. Energized by Lord Shiva Abhishek for peace of mind, blood pressure control, and spiritual growth.",
    benefits: ["Calms mind & reduces stress/anxiety", "Helps in concentration & meditation", "Regulates blood pressure & vital energy"],
    inStock: true,
    rulingPlanet: "Jupiter",
  },
  {
    id: "prod-3",
    name: "Complete Mahalaxmi Prosperity Pooja Kit",
    category: "pooja-kits",
    categoryLabel: "POOJA KITS",
    price: 3299,
    originalPrice: 4500,
    rating: 4.9,
    reviewCount: 98,
    imageUrl: "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=600&auto=format&fit=crop&q=80",
    certified: true,
    description: "All-in-one sacred ritual kit containing Kuber Yantra, Lotus seeds, Gomti Chakra, Yellow Cowries, and pure Gangajal for Diwali & Friday Lakshmi Pujan.",
    benefits: ["Attracts permanent wealth & abundance", "Removes financial bottlenecks in business", "Purifies home environment with divine vibrations"],
    inStock: true,
  },
  {
    id: "prod-4",
    name: "Detailed 50+ Page Lifetime Janma Kundli PDF Report",
    category: "reports",
    categoryLabel: "REPORTS",
    price: 999,
    originalPrice: 1999,
    rating: 5.0,
    reviewCount: 520,
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    certified: true,
    description: "Comprehensive Vedic Kundli Report calculated using Swiss Ephemeris algorithm. Includes Vimshottari Dasha predictions, Sade Sati analysis, Lal Kitab remedies, and career roadmap.",
    benefits: ["Full lifetime Dasha predictions", "Sade Sati & Rahu/Ketu analysis", "Practical gemstone & mantra remedies"],
    inStock: true,
  },
  {
    id: "prod-5",
    name: "Natural Blue Sapphire (Neelam) 4.10 Carat",
    category: "gemstones",
    categoryLabel: "GEMSTONES",
    price: 22000,
    originalPrice: 28000,
    rating: 4.9,
    reviewCount: 86,
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80",
    certified: true,
    description: "Certified Ceylon Blue Sapphire gemstone. Fast-acting Saturn (Shani) stone known to bring instant career breakthroughs and protection from evil eyes.",
    benefits: ["Rapid financial & political rise", "Removes sluggishness & obstacles", "Offers protection against enemies"],
    inStock: true,
    rashi: "Kumbh (Aquarius) / Makar (Capricorn)",
    rulingPlanet: "Saturn (Shani)",
  },
  {
    id: "prod-6",
    name: "Pure Brass Shree Yantra 3D Meru (Heavy Weight)",
    category: "yantras",
    categoryLabel: "YANTRAS",
    price: 4999,
    originalPrice: 6500,
    rating: 4.8,
    reviewCount: 64,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    certified: true,
    description: "Precision-cast solid brass 3D Shree Yantra according to Vedic Sacred Geometry. Radiates positive cosmic aura for home and office sanctum.",
    benefits: ["Harmonizes Vastu defects", "Creates intense positive energy field", "Brings peace, fame, and abundance"],
    inStock: true,
  },
  {
    id: "prod-7",
    name: "Original 7 Mukhi Nepal Rudraksha Pendant",
    category: "rudraksha",
    categoryLabel: "RUDRAKSHA",
    price: 1899,
    originalPrice: 2500,
    rating: 4.7,
    reviewCount: 74,
    imageUrl: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&auto=format&fit=crop&q=80",
    certified: true,
    description: "7-Face Rudraksha blessed by Goddess Mahalakshmi. Cures financial distress and brings good health and business opportunities.",
    benefits: ["Overcomes financial hurdles", "Bestows health & vitality", "Blessings of Goddess Lakshmi"],
    inStock: true,
    rulingPlanet: "Venus (Shukra)",
  },
  {
    id: "prod-8",
    name: "Ashtakoot Kundli Matching & Marriage Compatibility Report",
    category: "reports",
    categoryLabel: "REPORTS",
    price: 799,
    originalPrice: 1499,
    rating: 4.9,
    reviewCount: 310,
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80",
    certified: true,
    description: "Deep 36-Guna Matchmaking report with Nadi & Bhakoot Dosha resolution guidance, longevity analysis, and family compatibility advice.",
    benefits: ["Complete 36-Guna Ashtakoot score", "Detailed Manglik match analysis", "Astrologer marriage remedy advice"],
    inStock: true,
  },
];
