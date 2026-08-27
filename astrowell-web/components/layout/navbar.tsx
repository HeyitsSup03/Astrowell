"use client";

import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { formatCurrency } from "@/lib/utils";
import { useWalletStore } from "@/store/walletStore";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Sparkles, Wallet as WalletIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { getWallet } from "@/lib/api/wallet";

import { Logo } from "@/components/ui/logo";

export function Navbar() {
  const { wallet, setWallet } = useWalletStore();
  const { items, setIsOpen } = useCartStore();

  const totalCartCount = items.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    getWallet().then(setWallet);
  }, [setWallet]);

  return (
    <header className="sticky top-0 z-30 w-full bg-surface/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-black/5 dark:border-white/8">
      <div className="max-w-6xl mx-auto px-2.5 sm:px-4 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand logo (visible on mobile, hidden on lg: desktop since sidebar has logo) */}
        <div className="lg:hidden shrink-0">
          <Logo href="/dashboard" size="sm" />
        </div>

        {/* Desktop title note */}
        <div className="hidden lg:flex items-center gap-3">
          <span className="text-xs font-medium text-text-muted dark:text-text-muted-dark">
            Vedic Astrology & Holistic Wellness Consultation
          </span>
        </div>

        {/* Right side tools */}
        <div className="flex items-center gap-1.5 sm:gap-3 ml-auto shrink-0">
          {/* Wallet Balance Chip */}
          <Link href="/wallet" className="shrink-0">
            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors border border-accent/20 cursor-pointer">
              <WalletIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
              <span className="text-[11px] sm:text-xs font-bold text-text-primary dark:text-text-primary-dark">
                {wallet ? formatCurrency(wallet.balance) : "₹0"}
              </span>
            </div>
          </Link>

          {/* Cart Icon Button with Badge */}
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="relative p-1.5 sm:p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-text-primary dark:text-text-primary-dark transition-colors cursor-pointer shrink-0"
            aria-label="Open Cart"
          >
            <ShoppingBag className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-amber-700 dark:text-amber-400" />
            <span className="absolute -top-1 -right-1 h-4.5 w-4.5 rounded-full bg-[#D4A24C] text-[#2E1A47] text-[10px] font-bold flex items-center justify-center border border-white dark:border-surface-dark">
              {totalCartCount}
            </span>
          </button>

          {/* Theme Toggle */}
          <div className="shrink-0">
            <ThemeToggle />
          </div>

          {/* User Profile Avatar Link */}
          <Link href="/profile" className="ml-0.5 shrink-0">
            <Avatar
              name="Arjun Mehta"
              src="https://api.dicebear.com/7.x/personas/svg?seed=Arjun"
              size="sm"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
