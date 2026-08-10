"use client";

import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { formatCurrency } from "@/lib/utils";
import { useWalletStore } from "@/store/walletStore";
import { Sparkles, Wallet as WalletIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { getWallet } from "@/lib/api/wallet";

export function Navbar() {
  const { wallet, setWallet } = useWalletStore();

  useEffect(() => {
    getWallet().then(setWallet);
  }, [setWallet]);

  return (
    <header className="sticky top-0 z-30 w-full bg-surface/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-black/5 dark:border-white/8">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand logo (visible on mobile, hidden on lg: desktop since sidebar has logo) */}
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary via-primary-light to-secondary flex items-center justify-center text-accent shadow-xs">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <span className="font-display font-bold text-xl text-primary dark:text-primary-light">
            Astrowell
          </span>
        </Link>

        {/* Desktop title note */}
        <div className="hidden lg:flex items-center gap-3">
          <span className="text-xs font-medium text-text-muted dark:text-text-muted-dark">
            Vedic Astrology & Holistic Wellness Consultation
          </span>
        </div>

        {/* Right side tools */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Wallet Balance Chip */}
          <Link href="/wallet">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors border border-accent/20 cursor-pointer">
              <WalletIcon className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold text-text-primary dark:text-text-primary-dark">
                {wallet ? formatCurrency(wallet.balance) : "₹0"}
              </span>
            </div>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Profile Avatar Link */}
          <Link href="/profile" className="ml-1">
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
