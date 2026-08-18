"use client";

import { Button } from "@/components/ui/button";
import { CartItem } from "@/lib/mocks/shop.mock";
import { Minus, Plus, ShieldCheck, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface dark:bg-surface-dark border-l border-black/10 dark:border-white/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-black/5 dark:border-white/8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h2 className="font-display font-bold text-xl text-text-primary dark:text-text-primary-dark">
                Your Sacred Cart
              </h2>
              <span className="text-xs bg-accent/20 text-accent font-bold px-2 py-0.5 rounded-full">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-text-muted dark:text-text-muted-dark transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-text-muted dark:text-text-muted-dark">
                <ShoppingBag className="w-12 h-12 stroke-[1.5] text-amber-500/40 mb-3" />
                <p className="font-medium text-sm">Your cart is currently empty</p>
                <p className="text-xs mt-1 max-w-xs text-text-muted/70 dark:text-text-muted-dark/70">
                  Explore our lab-certified gemstones, Rudraksha malas, and energized pooja kits.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-xl bg-black/3 dark:bg-white/3 border border-black/5 dark:border-white/5"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-black/5">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-semibold text-text-primary dark:text-text-primary-dark truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          type="button"
                          className="text-text-muted hover:text-rose-500 dark:text-text-muted-dark transition-colors p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
                        ₹{item.product.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-surface dark:bg-surface-dark border border-black/10 dark:border-white/10 rounded-full px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          type="button"
                          className="text-text-muted hover:text-text-primary dark:text-text-muted-dark p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-text-primary dark:text-text-primary-dark px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          type="button"
                          className="text-text-muted hover:text-text-primary dark:text-text-muted-dark p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-text-primary dark:text-text-primary-dark">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-black/5 dark:border-white/8 space-y-4 bg-surface dark:bg-surface-dark">
              <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4" /> Free Vedic Consecration Ritual
                </span>
                <span className="font-bold">INCLUDED</span>
              </div>

              <div className="space-y-1.5 text-xs text-text-muted dark:text-text-muted-dark">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-text-primary dark:text-text-primary-dark">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Vedic Blessing & Delivery</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-text-primary dark:text-text-primary-dark pt-2 border-t border-black/5 dark:border-white/5">
                  <span>Total Payable</span>
                  <span className="text-amber-600 dark:text-amber-400 text-base">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <Link href="/shop/checkout" onClick={onClose} className="block w-full">
                <Button className="w-full bg-accent hover:bg-amber-500 text-primary font-bold py-3 rounded-full shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2">
                  Proceed to Checkout →
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
