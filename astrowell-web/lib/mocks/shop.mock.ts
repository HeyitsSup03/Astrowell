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
  { id: "all", label: "All Products" },
  { id: "gemstones", label: "Gemstones" },
  { id: "rudraksha", label: "Rudraksha" },
  { id: "pooja-kits", label: "Pooja Kits" },
  { id: "reports", label: "Kundli Reports" },
] as const;

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Rudraksha Jupiter ( 108 Beads )",
    category: "rudraksha",
    categoryLabel: "RUDRAKSHA",
    price: 90000,
    originalPrice: 110000,
    rating: 4.9,
    reviewCount: 210,
    imageUrl: "https://images.unsplash.com/photo-1611591475777-233cd749228e?w=600&auto=format&fit=crop&q=80",
    certified: true,
    description: "Authentic Nepal Rudraksha Mala strung with sacred silk thread. Energized with Lord Shiva Abhishek for profound spiritual clarity, wealth, and inner peace.",
    benefits: ["Brings wisdom & spiritual elevation", "Calms anxiety & regulates energy", "Blessed by Lord Shiva & Jupiter"],
    inStock: true,
    rulingPlanet: "Jupiter (Brihaspati)",
  },
  {
    id: "prod-2",
    name: "Gemstone Unheated Sapphire",
    category: "gemstones",
    categoryLabel: "GEMSTONES",
    price: 45000,
    originalPrice: 55000,
    rating: 4.9,
    reviewCount: 142,
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80",
    certified: true,
    description: "100% Original Unheated Sri Lankan Blue Sapphire Gemstone. Energized with Saturn Vedic Mantras for rapid career breakthroughs and financial growth.",
    benefits: ["Removes Saturn dosha obstacles", "Accelerates career rise & fame", "Offers psychic protection"],
    inStock: true,
    rashi: "Kumbh (Aquarius) / Makar (Capricorn)",
    rulingPlanet: "Saturn (Shani)",
  },
  {
    id: "prod-3",
    name: "Consecrated Pooja Kit",
    category: "pooja-kits",
    categoryLabel: "POOJA KITS",
    price: 25000,
    originalPrice: 30000,
    rating: 4.8,
    reviewCount: 98,
    imageUrl: "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=600&auto=format&fit=crop&q=80",
    certified: true,
    description: "Complete sacred ritual kit containing solid brass Kalash, Shree Yantra, Lotus seeds, Yellow Cowries, and pure Gangajal for home & office sanctum.",
    benefits: ["Attracts permanent wealth & prosperity", "Harmonizes Vastu defects", "Purifies living space energy"],
    inStock: true,
  },
  {
    id: "prod-4",
    name: "Natural Yellow Sapphire (Pukhraj) 5.25 Carat",
    category: "gemstones",
    categoryLabel: "GEMSTONES",
    price: 14500,
    originalPrice: 18000,
    rating: 4.9,
    reviewCount: 156,
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",
    certified: true,
    description: "Unheated Ceylon Yellow Sapphire. Brings wisdom, academic success, and martial harmony.",
    benefits: ["Wisdom & higher learning", "Financial growth", "Marital peace"],
    inStock: true,
    rulingPlanet: "Jupiter",
  },
  {
    id: "prod-5",
    name: "Detailed 50+ Page Lifetime Janma Kundli PDF Report",
    category: "reports",
    categoryLabel: "REPORTS",
    price: 999,
    originalPrice: 1999,
    rating: 5.0,
    reviewCount: 520,
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    certified: true,
    description: "Comprehensive Vedic Kundli report calculated using Swiss Ephemeris algorithm. Includes Vimshottari Dasha, Sade Sati, and Lal Kitab remedies.",
    benefits: ["Full lifetime predictions", "Sade Sati analysis", "Gemstone remedies"],
    inStock: true,
  },
  {
    id: "prod-6",
    name: "Ashtakoot Kundli Matching & Marriage Compatibility Report",
    category: "reports",
    categoryLabel: "REPORTS",
    price: 799,
    originalPrice: 1499,
    rating: 4.9,
    reviewCount: 310,
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80",
    certified: true,
    description: "Deep 36-Guna Matchmaking report with Nadi & Bhakoot Dosha resolution guidance.",
    benefits: ["36-Guna Ashtakoot score", "Manglik analysis", "Marriage remedies"],
    inStock: true,
  },
];
