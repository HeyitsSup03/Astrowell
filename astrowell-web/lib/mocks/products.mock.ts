// ============================================================
// Mock Data: E-commerce Products
// ============================================================

export type ProductCategory =
  | "gemstone"
  | "pooja-item"
  | "report"
  | "rudraksha"
  | "yantra"
  | "incense"
  | "book";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number; // INR
  originalPrice?: number; // INR — for showing discount
  imageUrl: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  tags: string[];
}

export const productsMock: Product[] = [
  {
    id: "prod-001",
    name: "Natural Blue Sapphire (Neelam) — 3 Carat",
    category: "gemstone",
    description: "Certified natural Blue Sapphire (Neelam) from Ceylon. Ideal for Saturn-related doshas and Saturn Mahadasha. Comes with GIA-equivalent lab certificate.",
    price: 12500,
    originalPrice: 15000,
    imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
    stock: 8,
    rating: 4.8,
    reviewCount: 34,
    isBestseller: true,
    tags: ["Saturn", "Shani", "Neelam", "Career"],
  },
  {
    id: "prod-002",
    name: "5 Mukhi Rudraksha Mala — 108 Beads",
    category: "rudraksha",
    description: "Authentic 5 Mukhi Rudraksha from Nepal. Energised and certified. Wearing this mala is believed to bring peace of mind, reduce stress, and improve meditation practice.",
    price: 1800,
    imageUrl: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400",
    stock: 25,
    rating: 4.9,
    reviewCount: 112,
    isBestseller: true,
    tags: ["Meditation", "Peace", "Shiva"],
  },
  {
    id: "prod-003",
    name: "Shri Yantra — Pure Copper (6 inch)",
    category: "yantra",
    description: "Hand-engraved pure copper Shri Yantra for wealth, prosperity, and positive energy. Energised at Tirupati temple. Comes with installation guide.",
    price: 950,
    imageUrl: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=400",
    stock: 40,
    rating: 4.7,
    reviewCount: 67,
    tags: ["Wealth", "Lakshmi", "Vastu", "Home"],
  },
  {
    id: "prod-004",
    name: "Personalised Kundli Report — PDF",
    category: "report",
    description: "Comprehensive 40-page Vedic birth chart analysis. Includes planetary positions, Dasha predictions for next 10 years, dosha analysis, and detailed remedies.",
    price: 499,
    imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
    stock: 999,
    rating: 4.6,
    reviewCount: 203,
    tags: ["Kundli", "Birth Chart", "Prediction"],
  },
  {
    id: "prod-005",
    name: "Pooja Samagri Kit — Complete Set",
    category: "pooja-item",
    description: "All-in-one pooja kit containing kumkum, haldi, roli, chawal, camphor, agarbatti, deepak, matchbox, and red cloth. Suitable for all home pujas.",
    price: 349,
    originalPrice: 450,
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400",
    stock: 120,
    rating: 4.5,
    reviewCount: 89,
    tags: ["Puja", "Home", "Daily Ritual"],
  },
  {
    id: "prod-006",
    name: "Panchdhatu Navgraha Ring",
    category: "gemstone",
    description: "Handcrafted ring made of five sacred metals (gold, silver, copper, iron, brass). Embedded with 9 planetary gemstones. Balances the influence of all 9 planets.",
    price: 3200,
    imageUrl: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400",
    stock: 12,
    rating: 4.7,
    reviewCount: 28,
    tags: ["Navgraha", "All Planets", "Protection"],
  },
  {
    id: "prod-007",
    name: "Mysore Sandalwood Incense — 100 Sticks",
    category: "incense",
    description: "Premium Mysore sandalwood agarbatti handmade by traditional artisans. Burns for 45 minutes. No chemicals. Ideal for meditation and puja.",
    price: 220,
    imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400",
    stock: 200,
    rating: 4.8,
    reviewCount: 156,
    isBestseller: true,
    tags: ["Sandalwood", "Meditation", "Incense"],
  },
  {
    id: "prod-008",
    name: "Brihat Parasara Hora Sastra (English Translation)",
    category: "book",
    description: "The foundational text of Vedic Astrology, translated and annotated in English by R. Santhanam. Essential reading for serious students of Jyotisha.",
    price: 1100,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    stock: 15,
    rating: 4.9,
    reviewCount: 44,
    tags: ["Jyotisha", "Learning", "Classic Text"],
  },
];
