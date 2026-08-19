"use client";

import { CartDrawer } from "@/components/shop/cart-drawer";
import { ProductCard } from "@/components/shop/product-card";
import { fetchProducts } from "@/lib/api/shop";
import { MOCK_CATEGORIES, Product } from "@/lib/mocks/shop.mock";
import { useCartStore } from "@/store/cartStore";
import { Award, Filter, Search, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function CustomerShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const { items, isOpen, setIsOpen, addItem, updateQuantity, removeItem } =
    useCartStore();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchProducts(activeCategory, searchQuery);
      setProducts(data);
      setLoading(false);
    }
    loadData();
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark pb-20 space-y-8">
      {/* ── 1. HERO BANNER MATCHING E COMMERCE INSPO REFERENCE ──── */}
      <section className="relative -mt-6 lg:w-[calc(100vw-16rem-5px)] lg:relative lg:left-1/2 lg:-translate-x-1/2 -mx-4 sm:-mx-6 lg:mx-0 overflow-hidden bg-[#1C0D2A] bg-[url('/e-commerce-bg.png')] bg-cover bg-no-repeat bg-[right_-350px_center] text-white border-b border-amber-500/20 shadow-xl min-h-[320px] sm:min-h-[380px] flex items-center">
        {/* Dark purple velvet gradient overlay for text contrast and seamless blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C0D2A] via-[#1C0D2A] to-transparent sm:from-[#1C0D2A] sm:via-[#1C0D2A]/90 sm:to-transparent pointer-events-none" />

        <div className="relative w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
          {/* Left Column: Text & Metallic Seal Badges (~60% width) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Title */}
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Sacred Gemstones & <br />
              <span className="text-[#D4A24C]">Vedic Remedial Products</span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/85 text-sm sm:text-base font-body max-w-lg leading-relaxed">
              Authentic Unheated Gemstones, Nepal Rudraksha malas, <br className="hidden sm:inline" />
              and Consecrated Pooja kits.
            </p>

            {/* Metallic Seals Row */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              {/* Gold Seal Medallion */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border-2 border-amber-100/80 shadow-lg flex items-center justify-center text-[#2E1A47] shrink-0">
                  <Award className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-wide">
                    Lab Certified
                  </div>
                  <div className="text-[10px] text-amber-200/80 font-medium uppercase tracking-wider">
                    Embossed
                  </div>
                </div>
              </div>

              {/* Silver Seal Medallion */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500 border-2 border-slate-50/80 shadow-lg flex items-center justify-center text-slate-900 shrink-0">
                  <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-wide">
                    Lifetime Authenticity
                  </div>
                  <div className="text-[10px] text-slate-300/80 font-medium uppercase tracking-wider">
                    Embossed Metalium
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CATEGORY PILL FILTER & PILL SEARCH BAR ──────────── */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Pills Row */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1">
            {MOCK_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  type="button"
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer border ${isActive
                    ? "bg-[#D4A24C] text-[#2E1A47] border-[#D4A24C] shadow-md font-bold"
                    : "bg-surface dark:bg-surface-dark border-amber-300/60 dark:border-amber-400/30 text-text-muted dark:text-text-muted-dark hover:border-amber-400 hover:text-text-primary dark:hover:text-text-primary-dark"
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Pill Search Input */}
          <div className="relative w-full md:w-80 shrink-0">
            <input
              type="text"
              placeholder="Search gemstones, malas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface dark:bg-surface-dark border border-amber-300/60 dark:border-amber-400/30 rounded-full px-4 py-2 pr-10 text-xs sm:text-sm text-text-primary dark:text-text-primary-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all shadow-sm"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600 dark:text-amber-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── 3. PRODUCT CATALOG GRID & EXTENSIBLE BACKGROUND ─────── */}
      <main className="relative w-full px-4 sm:px-6 lg:px-8">
        {/* Extensible background container for optional Sri Yantra line-art graphic overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-no-repeat bg-right-top bg-contain" />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-80 rounded-2xl bg-surface dark:bg-surface-dark border border-amber-200/60 dark:border-white/10 animate-pulse"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-surface dark:bg-surface-dark rounded-2xl border border-amber-200/60 dark:border-white/10">
            <Filter className="w-12 h-12 stroke-[1.5] text-amber-500/40 mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg text-text-primary dark:text-text-primary-dark">
              No products found
            </h3>
            <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1">
              Try selecting another category or clear your search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addItem}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── 4. SLIDE-OVER CART DRAWER ─────────────────────────────── */}
      <CartDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
}
