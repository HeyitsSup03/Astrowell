"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProviderCardSkeleton } from "@/components/ui/skeleton";
import { ProviderCard } from "@/components/provider-card/provider-card";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { getProviders } from "@/lib/api/providers";
import type { Provider } from "@/types";
import {
  ArrowRight,
  BookOpen,
  Compass,
  HeartPulse,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Utensils,
  Video,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const TICKER_PHRASES = [
  "India's Trusted Vedic & Wellness Marketplace",
  "Instant Chat, Call & Video Consultations",
  "Verified Astrologers & Yoga Gurus",
  "100% Confidential Sessions",
  "Instant UPI Wallet Recharge",
  "Free Kundli & Ashtakoot Matching",
];

const tickerContent = [...TICKER_PHRASES, ...TICKER_PHRASES];

export default function LandingPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    getProviders().then((data) => {
      setProviders(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const topProviders = providers.slice(0, 4);

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-text-primary dark:text-text-primary-dark flex flex-col">

      {/* ── 1. TRANSPARENT FLOATING HEADER ──────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-surface/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-black/5 dark:border-white/8 shadow-sm"
          : "bg-transparent border-transparent"
          }`}
      >
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 h-16 flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className={`font-display font-bold text-2xl tracking-tight transition-colors duration-300 ${isScrolled ? "text-primary dark:text-primary-light" : "text-white"
                }`}
            >
              Astrowell
            </span>
          </Link>

          {/* Right Nav Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle isScrolled={isScrolled} />
            <Link href="/login">
              <span
                className={`text-sm font-medium transition-all px-3 py-1.5 rounded-full cursor-pointer ${
                  isScrolled
                    ? "text-text-primary dark:text-text-primary-dark hover:bg-black/5 dark:hover:bg-white/10"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                Login
              </span>
            </Link>
            <Link href="/login?mode=signup">
              <span
                className={`text-sm font-medium transition-all px-3 py-1.5 rounded-full cursor-pointer ${
                  isScrolled
                    ? "text-text-primary dark:text-text-primary-dark hover:bg-black/5 dark:hover:bg-white/10"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                Sign Up
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ── 2. FULL-BLEED HERO SECTION ──────────────────────────── */}
        <section className="relative min-h-[92vh] flex items-center bg-[url('/bg-astrowell.jpeg')] bg-cover bg-[position:right_-200px_center] sm:bg-[position:right_-60px_center] lg:bg-center">
          {/* Solid dark tone behind text on mobile to ensure zero background collision */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0518] via-[#0A0518]/90 to-transparent sm:from-[#0A0518]/85 sm:via-[#0A0518]/50 sm:to-transparent pointer-events-none" />

          {/* Content — Left aligned on desktop */}
          <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 pt-20 pb-16 flex flex-col justify-center min-h-[92vh]">
            <div className="max-w-xl space-y-7">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>India&apos;s Trusted Vedic & Wellness Marketplace</span>
              </div>

              {/* Headline */}
              <h1 className="font-display font-bold text-white leading-[1.1]" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}>
                Unlock Your<br />
                <span className="text-accent italic">Cosmic Potential</span>
              </h1>

              {/* Subtitle */}
              <p className="font-body text-sm md:text-base text-white/80 leading-relaxed max-w-sm">
                Instant consultations with verified Vedic Astrologers, certified Yoga Teachers, and holistic Dietitians via Chat, Call, or Live Video.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/dashboard">
                  <Button
                    variant="accent"
                    size="lg"
                    className="font-bold rounded-full px-8 shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-[1.02] transition-all duration-200 text-sm"
                  >
                    Find Expert <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
                <Link href="/kundli/generate">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/40 text-white hover:bg-white/10 hover:border-white rounded-full px-8 text-sm"
                  >
                    <Sparkles className="h-4 w-4 mr-1.5" /> Free Kundli
                  </Button>
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-5 pt-4 text-xs text-white/60">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-accent" /> 100% Verified Practitioners
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-accent" /> Connect in Under 60 Sec
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-accent" /> Confidential & Secure
                </span>
              </div>
            </div>
          </div>

          {/* Vertical Social Icon Bar — right edge */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-4">
            {[
              { label: "Instagram", href: "https://instagram.com", letter: "In" },
              { label: "YouTube", href: "https://youtube.com", letter: "Yt" },
              { label: "X / Twitter", href: "https://x.com", letter: "X" },
              { label: "Li", href: "https://linkedin.com", letter: "Li" },
            ].map(({ label, href, letter }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 hover:scale-110 text-[10px] font-bold"
              >
                {letter}
              </a>
            ))}
          </div>
        </section>

        {/* ── 3. MARQUEE TICKER BANNER ────────────────────────────── */}
        <div className="overflow-hidden border-y border-black/8 dark:border-white/8 bg-surface dark:bg-surface-dark py-4">
          <div className="animate-marquee">
            {tickerContent.map((phrase, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-3 px-8 text-xs font-semibold uppercase tracking-[0.18em] text-text-primary dark:text-text-primary-dark whitespace-nowrap"
              >
                <span className="text-accent text-base">✦</span>
                {phrase}
              </span>
            ))}
          </div>
        </div>

        {/* ── 4. MIDDLE CONTENT BODY ──────────────────────────────── */}
        <div className="bg-background dark:bg-background-dark">

          {/* ─── 4a. Category Icon Grid ─────────────────────────── */}
          <section className="max-w-6xl mx-auto px-4 pt-16 pb-8">
            <div className="text-center mb-10 space-y-2">
              <Badge variant="accent">Explore Services</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary dark:text-text-primary-dark">
                What are you looking for?
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[
                { title: "Astrology", desc: "Kundli, Dasha & Remedies", icon: Sparkles, href: "/dashboard?category=astrologer", color: "text-amber-500 bg-amber-500/10" },
                { title: "Yoga & Mind", desc: "Hatha, Vinyasa & Meditation", icon: HeartPulse, href: "/dashboard?category=yoga", color: "text-emerald-500 bg-emerald-500/10" },
                { title: "Diet & Wellness", desc: "Ayurvedic Dosha Nutrition", icon: Utensils, href: "/dashboard?category=dietitian", color: "text-rose-500 bg-rose-500/10" },
                { title: "Courses", desc: "Pranayama & Jyotisha Batches", icon: BookOpen, href: "/courses", color: "text-purple-500 bg-purple-500/10" },
                { title: "Matchmaking", desc: "36-Guna Kundli Milan", icon: Compass, href: "/kundli/match", color: "text-accent bg-accent/10" },
              ].map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link key={cat.title} href={cat.href}>
                    <Card hoverable className="h-full flex flex-col items-center text-center p-5 gap-3 group">
                      <div className={`h-14 w-14 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-text-primary dark:text-text-primary-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-[11px] text-text-muted dark:text-text-muted-dark mt-0.5 line-clamp-1">
                          {cat.desc}
                        </p>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ─── 4b. Top Verified Experts ───────────────────────── */}
          <section className="max-w-6xl mx-auto px-4 py-16 space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <Badge variant="accent">Top Rated</Badge>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary dark:text-text-primary-dark mt-1">
                  Consult with Top Experts
                </h2>
                <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1">
                  Experienced astrologers, yoga gurus, and dietitians available right now.
                </p>
              </div>
              <Link href="/dashboard" className="hidden sm:inline-flex flex-shrink-0">
                <Button variant="outline" size="sm">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => <ProviderCardSkeleton key={i} />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {topProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            )}

            <div className="text-center sm:hidden pt-2">
              <Link href="/dashboard">
                <Button variant="outline" fullWidth>
                  Browse All Providers <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </section>

          {/* ─── 4c. Kundli Matchmaking Feature Banner ──────────── */}
          <section className="max-w-6xl mx-auto px-4 pb-16">
            <Card className="relative overflow-hidden bg-gradient-to-r from-primary via-primary-light to-secondary text-white p-8 sm:p-12 border-0 shadow-xl">
              <div className="relative z-10 max-w-xl space-y-4">
                <Badge variant="accent" className="bg-accent text-white border-0">
                  Vedic Science
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
                  Free Kundli Match & 36-Guna Ashtakoot Milan
                </h2>
                <p className="text-sm text-white/80 leading-relaxed font-body">
                  Calculate your compatibility score across 8 kutas — Varna, Nadi, Gana, Bhakoot — with instant Manglik & Nadi dosha indicators.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href="/kundli/match">
                    <Button variant="accent" className="font-semibold">
                      <Compass className="h-4 w-4 mr-1.5" /> Match Kundli Now
                    </Button>
                  </Link>
                  <Link href="/kundli/generate">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Generate Birth Chart
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Background Decor */}
              <div className="absolute right-6 bottom-0 opacity-10 pointer-events-none hidden md:block">
                <Sparkles className="h-72 w-72 text-accent" />
              </div>
            </Card>
          </section>

          {/* ─── 4d. Why Astrowell Feature Grid ─────────────────── */}
          <section className="max-w-6xl mx-auto px-4 pb-20 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <Badge variant="primary">Platform Advantages</Badge>
              <h2 className="font-display text-3xl font-bold text-text-primary dark:text-text-primary-dark">
                Why Consult on Astrowell?
              </h2>
              <p className="text-xs sm:text-sm text-text-muted dark:text-text-muted-dark">
                Built for privacy, authenticity, and real-time guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: MessageSquare,
                  color: "bg-primary/10 text-primary dark:text-primary-light",
                  title: "Per-Minute Transparent Billing",
                  desc: "Pay only for the exact duration of your session. Low wallet balance warnings prevent unexpected cutoffs.",
                },
                {
                  icon: Video,
                  color: "bg-accent/10 text-accent",
                  title: "Chat, Call & HD Video Modes",
                  desc: "Choose between text chat, high-clarity voice call, or 1:1 HD video session based on your comfort level.",
                },
                {
                  icon: Users,
                  color: "bg-secondary/10 text-secondary dark:text-pink-400",
                  title: "Holistic Wellness Ecosystem",
                  desc: "Combine astrology predictions with yoga practice batches and Ayurvedic nutrition plans under one roof.",
                },
              ].map((feat) => {
                const Icon = feat.icon;
                return (
                  <Card key={feat.title} className="p-6 space-y-3 hover:shadow-md transition-shadow">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${feat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-base text-text-primary dark:text-text-primary-dark">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-text-muted dark:text-text-muted-dark leading-relaxed">
                      {feat.desc}
                    </p>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>

        {/* ── 5. REDESIGNED DARK FOOTER ───────────────────────────── */}
        <footer className="w-full bg-primary dark:bg-[#120B2E] rounded-t-[36px] sm:rounded-t-[48px] pt-14 pb-0 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 mt-4">
          {/* Footer Nav Grid — Full Width */}
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-12 border-b border-white/10">
              {/* Useful Links */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest">Useful</h4>
                <ul className="space-y-2.5 text-sm text-white/75">
                  {["About us", "Features", "Blogs", "FAQs"].map((l) => (
                    <li key={l}>
                      <Link href="/" className="hover:text-accent transition-colors">{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest">Legal</h4>
                <ul className="space-y-2.5 text-sm text-white/75">
                  {["Terms & Conditions", "Privacy Policy", "Refund Policy"].map((l) => (
                    <li key={l}>
                      <Link href="/" className="hover:text-accent transition-colors">{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Socials */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest">Socials</h4>
                <ul className="space-y-2.5 text-sm text-white/75">
                  {[
                    { label: "Instagram", letter: "In", href: "https://instagram.com" },
                    { label: "LinkedIn", letter: "Li", href: "https://linkedin.com" },
                    { label: "X / Twitter", letter: "X", href: "https://x.com" },
                    { label: "YouTube", letter: "Yt", href: "https://youtube.com" },
                  ].map(({ label, letter, href }) => (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                        <span className="h-4 w-4 rounded-sm bg-white/10 flex items-center justify-center text-[9px] font-bold">{letter}</span> {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Us */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest">Contact Us</h4>
                <ul className="space-y-3 text-sm text-white/75">
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Mumbai, Maharashtra, India</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                    <a href="mailto:hello@astrowell.in" className="hover:text-accent transition-colors">
                      hello@astrowell.in
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright line */}
            <div className="py-5 text-center text-xs text-white/30">
              © {new Date().getFullYear()} Astrowell Inc. All rights reserved.
            </div>
          </div>

          {/* Giant Gold Brand Wordmark — Full Width */}
          <div className="w-full overflow-hidden pb-0">
            <p
              className="font-display font-bold text-center text-accent/70 leading-none select-none tracking-tight"
              style={{ fontSize: "clamp(4rem, 18vw, 16rem)", letterSpacing: "-0.03em" }}
              aria-hidden="true"
            >
              Astrowell
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
