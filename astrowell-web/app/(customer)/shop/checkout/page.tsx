"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2, CreditCard, ShieldCheck, Sparkles, Truck, Wallet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ShopCheckoutPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "wallet" | "card">("upi");
  const [includeRitualConsult, setIncludeRitualConsult] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const itemTotal = 14500;
  const ritualCost = includeRitualConsult ? 299 : 0;
  const grandTotal = itemTotal + ritualCost;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/shop/orders?success=true");
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark py-8 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-text-primary dark:text-text-muted-dark dark:hover:text-text-primary-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Sacred Shop
        </Link>

        {/* Page Title */}
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-text-primary dark:text-text-primary-dark">
            Sacred Order Checkout
          </h1>
          <p className="text-xs sm:text-sm text-text-muted dark:text-text-muted-dark mt-1">
            Complete your delivery details for lab-certified items and Vedic consecration.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Form & Add-on (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address Card */}
            <Card className="p-5 sm:p-6 bg-surface dark:bg-surface-dark border-black/5 dark:border-white/8 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/8 pb-3">
                <Truck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="font-semibold text-base text-text-primary dark:text-text-primary-dark">
                  1. Shipping & Consecration Address
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-text-muted dark:text-text-muted-dark">
                    Full Name *
                  </label>
                  <Input required defaultValue="Rahul Sharma" className="text-xs sm:text-sm" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-text-muted dark:text-text-muted-dark">
                    Phone Number (for SMS Tracking) *
                  </label>
                  <Input required defaultValue="+91 98765 43210" className="text-xs sm:text-sm" />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-text-muted dark:text-text-muted-dark">
                    Street Address & House No. *
                  </label>
                  <Input required defaultValue="Flat 402, Sunshine Apartments, Green Glen Layout" className="text-xs sm:text-sm" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-text-muted dark:text-text-muted-dark">
                    City *
                  </label>
                  <Input required defaultValue="Bengaluru" className="text-xs sm:text-sm" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-text-muted dark:text-text-muted-dark">
                    Pincode *
                  </label>
                  <Input required defaultValue="560103" className="text-xs sm:text-sm" />
                </div>
              </div>
            </Card>

            {/* Vedic Gemstone Wearing Add-On Banner */}
            <Card className="p-5 bg-gradient-to-r from-amber-500/10 via-primary/10 to-amber-500/15 border-amber-500/30 rounded-2xl flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-sm text-text-primary dark:text-text-primary-dark">
                    Add 15-Min Astrologer Wearing Ritual Consultation
                  </h4>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0">+ ₹299</span>
                </div>
                <p className="text-xs text-text-muted dark:text-text-muted-dark">
                  Get personalized guidance from a senior Vedic Astrologer on the exact Muhurat, day, finger, and energizing mantras for wearing your gemstone.
                </p>
                <label className="flex items-center gap-2 pt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeRitualConsult}
                    onChange={(e) => setIncludeRitualConsult(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 rounded"
                  />
                  <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                    Include Ritual Consultation (Recommended)
                  </span>
                </label>
              </div>
            </Card>

            {/* Payment Method Selector Card */}
            <Card className="p-5 sm:p-6 bg-surface dark:bg-surface-dark border-black/5 dark:border-white/8 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/8 pb-3">
                <CreditCard className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="font-semibold text-base text-text-primary dark:text-text-primary-dark">
                  2. Select Payment Method
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all ${
                    paymentMethod === "upi"
                      ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                      : "border-black/10 dark:border-white/10 text-text-muted dark:text-text-muted-dark"
                  }`}
                >
                  <span className="font-bold text-xs">UPI / GPay / PhonePe</span>
                  <span className="text-[11px]">Instant 0% Gateway Fee</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("wallet")}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all ${
                    paymentMethod === "wallet"
                      ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                      : "border-black/10 dark:border-white/10 text-text-muted dark:text-text-muted-dark"
                  }`}
                >
                  <span className="font-bold text-xs flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5" /> Astrowell Wallet
                  </span>
                  <span className="text-[11px]">Balance: ₹1,250</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all ${
                    paymentMethod === "card"
                      ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                      : "border-black/10 dark:border-white/10 text-text-muted dark:text-text-muted-dark"
                  }`}
                >
                  <span className="font-bold text-xs">Credit / Debit Card</span>
                  <span className="text-[11px]">Visa, Mastercard, Amex</span>
                </button>
              </div>
            </Card>
          </div>

          {/* Right Column: Order Summary (1 Col) */}
          <div className="space-y-6">
            <Card className="p-5 sm:p-6 bg-surface dark:bg-surface-dark border-black/5 dark:border-white/8 rounded-2xl space-y-4 sticky top-6">
              <h3 className="font-semibold text-base text-text-primary dark:text-text-primary-dark border-b border-black/5 dark:border-white/8 pb-3">
                Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex gap-3 text-xs">
                  <div className="w-12 h-12 rounded-lg bg-black/5 shrink-0 overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80"
                      alt="Gemstone"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary dark:text-text-primary-dark line-clamp-1">
                      Natural Yellow Sapphire (Pukhraj) 5.25 Carat
                    </div>
                    <div className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">
                      ₹14,500
                    </div>
                  </div>
                </div>

                {includeRitualConsult && (
                  <div className="flex justify-between items-center text-xs text-text-muted dark:text-text-muted-dark pt-2 border-t border-black/5 dark:border-white/5">
                    <span>15-Min Ritual Consultation</span>
                    <span className="font-semibold text-text-primary dark:text-text-primary-dark">₹299</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-black/5 dark:border-white/8 space-y-2 text-xs text-text-muted dark:text-text-muted-dark">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-text-primary dark:text-text-primary-dark">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Vedic Consecration</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
                </div>

                <div className="flex justify-between items-center pt-2 text-sm font-bold text-text-primary dark:text-text-primary-dark border-t border-black/5 dark:border-white/5">
                  <span>Total Amount</span>
                  <span className="text-amber-600 dark:text-amber-400 text-lg">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-amber-500 text-primary font-bold py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all text-sm"
              >
                {isSubmitting ? "Processing Consecration Order..." : `Pay ₹${grandTotal.toLocaleString("en-IN")} & Confirm Order`}
              </Button>

              <div className="flex items-center justify-center gap-1 text-[11px] text-text-muted dark:text-text-muted-dark">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                100% Encrypted & Authentic Guarantee
              </div>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
