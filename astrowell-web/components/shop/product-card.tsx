"use client";

import { Card } from "@/components/ui/card";
import { Product } from "@/lib/mocks/shop.mock";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card
      onClick={() => onAddToCart(product)}
      className="group cursor-pointer overflow-hidden p-3.5 bg-surface dark:bg-surface-dark border-amber-200/60 dark:border-white/10 transition-all duration-300 hover:shadow-lg hover:border-amber-400/60 rounded-2xl flex flex-col justify-between"
    >
      {/* Product Image Box */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-[#0E071A]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
      </div>

      {/* Card Details */}
      <div className="pt-2.5 space-y-1">
        {/* Product Title in Cormorant Garamond Serif */}
        <h3 className="font-display font-semibold text-base sm:text-lg text-text-primary dark:text-text-primary-dark leading-snug line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          {product.name}
        </h3>

        {/* Price Row */}
        <div className="flex items-center gap-2">
          <span className="font-body font-bold text-sm sm:text-base text-text-primary dark:text-text-primary-dark">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-text-muted dark:text-text-muted-dark line-through font-body">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
