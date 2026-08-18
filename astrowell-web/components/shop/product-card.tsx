"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/lib/mocks/shop.mock";
import { CheckCircle2, Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Card className="group overflow-hidden flex flex-col h-full bg-surface dark:bg-surface-dark border-black/5 dark:border-white/8 transition-all duration-300 hover:shadow-lg hover:border-accent/30 rounded-2xl">
      {/* Product Image Header */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-black/5 dark:bg-white/5">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Certified Badge (Top Left) */}
        {product.certified && (
          <div className="absolute top-3 left-3 z-10">
            <Badge
              variant="warning"
              className="bg-black/60 backdrop-blur-md border-amber-400/50 text-amber-300 text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm"
            >
              <CheckCircle2 className="w-3 h-3 text-amber-400" />
              Lab Certified
            </Badge>
          </div>
        )}

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          type="button"
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-rose-400 hover:bg-black/60 transition-all active:scale-90"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
        </button>

        {/* Rashi / Planet Badge (Bottom Left overlay) */}
        {product.rulingPlanet && (
          <div className="absolute bottom-2.5 left-3 z-10">
            <span className="text-[10px] font-medium text-white/90 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
              {product.rulingPlanet}
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Category Tag */}
          <span className="text-[10px] font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400">
            {product.categoryLabel}
          </span>

          {/* Product Title */}
          <h3 className="font-semibold text-sm sm:text-base text-text-primary dark:text-text-primary-dark line-clamp-2 mt-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {product.name}
          </h3>

          {/* Rating Row */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="text-xs font-bold ml-1 text-text-primary dark:text-text-primary-dark">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-text-muted dark:text-text-muted-dark">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Footer Price & Add To Cart Button */}
        <div className="pt-3 border-t border-black/5 dark:border-white/8 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400">
              ₹{product.price.toLocaleString("en-IN")}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-xs text-text-muted dark:text-text-muted-dark line-through -mt-1">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </div>
            )}
          </div>

          <Button
            onClick={() => onAddToCart(product)}
            size="sm"
            className="bg-accent hover:bg-amber-500 text-primary font-semibold shadow-sm hover:shadow text-xs sm:text-sm px-3.5 py-1.5 rounded-full flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
}
