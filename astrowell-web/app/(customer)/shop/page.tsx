"use client";

import { CartDrawer } from "@/components/shop/cart-drawer";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchProducts } from "@/lib/api/shop";
import { CartItem, MOCK_CATEGORIES, Product } from "@/lib/mocks/shop.mock";
import {
  CheckCircle2,
  Filter,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function CustomerShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchProducts(activeCategory, searchQuery);
      setProducts(data);
      setLoading(false);
    }
    loadData();
  }, [activeCategory, searchQuery]);

  function handleAddToCart(product: Product) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }

  function handleUpdateQuantity(productId: string, delta: number) {
    setCartItems((prev) =>
      prev
        .map((i) => {
          if (i.product.id === productId) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  }

  function handleRemoveItem(productId: string) {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  }

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark pb-20">
      {/* ── 1. COSMIC SHOP HERO BANNER ────────────────────────────── */}
      <section className="relative overflow-hidden rounded-t-3xl rounded-b-3xl bg-gradient-to-r from-[#0A0518] via-[#1A1226] to-[#2E1A47] text-white py-12 px-6 sm:px-10 md:px-16 lg:px-20 border-b border-amber-500/20">

        <div className="absolute inset-0 bg-[radial-gradient(#D4A24C_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> 100% Lab Certified & Vedic Energized
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Sacred Gemstones & <br className="hidden sm:inline" />
              <span className="text-accent italic font-normal">Vedic Remedial Products</span>
            </h1>

            <p className="text-white/70 text-sm sm:text-base max-w-xl">
              Authentic unheated gemstones, Nepal Rudraksha malas, and consecrated pooja kits blessed by certified Vedic priests.
            </p>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-white/80 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Lab Test Certificate
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> Lifetime Authenticity
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-sky-400" /> Insured Free Shipping
              </span>
            </div>
          </div>

          {/* Floating Cart Trigger Widget */}
          <div className="shrink-0">
            <Button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-accent hover:bg-amber-500 text-primary font-bold px-6 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 active:scale-95"
            >
              <ShoppingBag className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs uppercase tracking-wider text-primary/80">View Cart</div>
                <div className="text-base font-extrabold">{totalCartCount} Items</div>
              </div>
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center border-2 border-primary animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* ── 2. CATEGORY FILTER BAR & SEARCH ───────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 pt-8 pb-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-black/5 dark:border-white/8 pb-6">
          {/* Category Horizontal Scroll Bar */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1">
            {MOCK_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  type="button"
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${isActive
                    ? "bg-accent text-primary shadow-sm"
                    : "bg-surface dark:bg-surface-dark border border-black/5 dark:border-white/8 text-text-muted dark:text-text-muted-dark hover:text-text-primary dark:hover:text-text-primary-dark"
                    }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-text-muted-dark" />
            <Input
              type="text"
              placeholder="Search gemstones, malas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-surface dark:bg-surface-dark border-black/10 dark:border-white/10 text-xs sm:text-sm rounded-full"
            />
          </div>
        </div>
      </div>

      {/* ── 3. PRODUCT CATALOG GRID ───────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-80 rounded-2xl bg-surface dark:bg-surface-dark border border-black/5 dark:border-white/8 animate-pulse"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-surface dark:bg-surface-dark rounded-2xl border border-black/5 dark:border-white/8">
            <Filter className="w-12 h-12 stroke-[1.5] text-amber-500/40 mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg text-text-primary dark:text-text-primary-dark">
              No products found
            </h3>
            <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1">
              Try selecting another category or clear your search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── 4. SLIDE-OVER CART DRAWER ─────────────────────────────── */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
