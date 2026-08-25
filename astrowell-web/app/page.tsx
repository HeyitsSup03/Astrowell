"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProviderCardSkeleton } from "@/components/ui/skeleton";
import { ProviderCard } from "@/components/provider-card/provider-card";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { getProviders } from "@/lib/api/providers";
import type { Provider } from "@/types";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Compass,
  HeartPulse,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
  Utensils,
  Video,
  Zap,
} from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";

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
    <div className="min-h-screen bg-background dark:bg-background-dark text-text-primary dark:text-text-primary-dark flex flex-col selection:bg-accent/20 selection:text-accent">

      {/* ── 1. TRANSPARENT FLOATING HEADER ──────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-surface/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-black/5 dark:border-white/8 shadow-sm"
          : "bg-transparent border-transparent"
          }`}
      >
        <div className="w-full px-4 sm:px-10 md:px-16 lg:px-20 xl:px-24 h-16 flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Logo */}
          <Logo href="/" size="md" textClassName={isScrolled ? "" : "text-white"} />

          {/* Right Nav Controls */}
          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            <ThemeToggle isScrolled={isScrolled} />
            <Link href="/login">
              <span
                className={`text-sm font-medium transition-all px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap ${isScrolled
                  ? "text-text-primary dark:text-text-primary-dark hover:bg-black/5 dark:hover:bg-white/10"
                  : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
              >
                Login
              </span>
            </Link>
            <Link href="/login?mode=signup">
              <span
                className={`text-sm font-medium transition-all px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap ${isScrolled
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
        <section className="relative min-h-[92vh] flex items-center bg-[url('/bg-astrowell.jpeg')] bg-cover bg-[position:right_-260px_center] sm:bg-[position:right_-60px_center] lg:bg-center">
          {/* Rich dark vignette gradient overlay with subtle backdrop blur on mobile */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0518] via-[#0A0518]/95 to-[#0A0518]/40 sm:from-[#0A0518]/85 sm:via-[#0A0518]/50 sm:to-transparent backdrop-blur-[1px] sm:backdrop-blur-none pointer-events-none" />

          {/* Hero Content — Left aligned with balanced mobile spacing */}
          <div className="relative z-10 w-full px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 pt-24 sm:pt-20 pb-12 sm:pb-16 flex flex-col justify-center min-h-[92vh]">
            <div className="max-w-2xl space-y-5 sm:space-y-7">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent text-[11px] sm:text-xs font-semibold tracking-wide">
                <Sparkles className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-accent flex-shrink-0" />
                <span className="truncate">India&apos;s Trusted Vedic & Wellness Marketplace</span>
              </div>

              {/* Headline */}
              <h1 className="font-display font-bold text-white leading-[1.12] sm:leading-[1.1] tracking-tight" style={{ fontSize: "clamp(2.2rem, 7.5vw, 5.5rem)" }}>
                Unlock Your<br />
                <span className="text-accent italic whitespace-nowrap">Cosmic Potential</span>
              </h1>

              {/* Subtitle */}
              <p className="font-body text-xs sm:text-base text-white/80 leading-relaxed max-w-xs sm:max-w-md">
                Instant consultations with verified Vedic Astrologers, certified Yoga Teachers, and holistic Dietitians via Chat, Call, or Live Video.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5 pt-1 sm:pt-2">
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button
                    variant="accent"
                    size="lg"
                    className="w-full sm:w-auto font-bold rounded-full px-8 shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-[1.02] transition-all duration-200 text-sm"
                  >
                    Find Expert <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
                <Link href="/kundli/generate" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10 hover:border-white rounded-full px-8 text-sm"
                  >
                    <Sparkles className="h-4 w-4 mr-1.5" /> Free Kundli
                  </Button>
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-6 pt-3 sm:pt-4 text-[11px] sm:text-xs text-white/75 border-t border-white/10">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-accent" /> 100% Verified Practitioners
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-accent" /> Connect in Under 60 Sec
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-accent" /> Confidential & Secure
                </span>
              </div>
            </div>
          </div>


          {/* Vertical Social Icon Bar — right edge */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-4">
            {[
              { label: "Instagram", href: "https://instagram.com", letter: "In" },
              { label: "YouTube", href: "https://youtube.com", letter: "Yt" },
              { label: "X / Twitter", href: "https://x.com", letter: "X" },
              { label: "LinkedIn", href: "https://linkedin.com", letter: "Li" },
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

        {/* ── 3. MARQUEE TICKER BANNER (PRELUDE BRIDGE) ────────────── */}
        <div className="overflow-hidden border-y border-black/8 dark:border-white/8 bg-surface dark:bg-surface-dark py-4">
          <div className="animate-marquee">
            {tickerContent.map((phrase, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-3 px-8 text-xs font-semibold uppercase tracking-[0.2em] text-text-primary dark:text-text-primary-dark whitespace-nowrap"
              >
                <span className="text-accent text-sm">✦</span>
                {phrase}
              </span>
            ))}
          </div>
        </div>

        {/* ── 4. EDITORIAL CHAPTER FLOORS ─────────────────────────── */}

        {/* ─── CHAPTER I: CURATED PATHWAYS ───────────────────────── */}
        <section className="bg-background dark:bg-background-dark border-b border-black/5 dark:border-white/5 py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20">
            {/* Editorial Header */}
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                <span>Chapter I</span>
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span>Curated Pathways</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary dark:text-text-primary-dark tracking-tight">
                What are you looking for?
              </h2>
              <p className="text-xs sm:text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
                Explore holistic services tailored to your spiritual, physical, and emotional alignment.
              </p>
              <div className="w-12 h-0.5 bg-accent/40 mx-auto pt-1" />
            </div>

            {/* Category Cards Frame */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4.5">
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
                    <Card hoverable className="h-full flex flex-col items-center text-center p-5 gap-3.5 group border-black/6 dark:border-white/8 hover:border-accent/30 dark:hover:border-accent/40 transition-all duration-300">
                      <div className={`h-14 w-14 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-text-primary dark:text-text-primary-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-[11px] text-text-muted dark:text-text-muted-dark mt-1 line-clamp-1">
                          {cat.desc}
                        </p>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── CHAPTER II: THE LUMINARIES (TOP EXPERTS) ───────────── */}
        <section className="bg-surface/50 dark:bg-[#150D24] border-b border-black/5 dark:border-white/5 py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 space-y-12">
            {/* Asymmetric Editorial Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/5 dark:border-white/8">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  <span>Chapter II</span>
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  <span>Verified Masters</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary dark:text-text-primary-dark tracking-tight">
                  Consult with Top Experts
                </h2>
                <p className="text-xs sm:text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
                  Experienced astrologers, yoga gurus, and dietitians available for private sessions right now.
                </p>
              </div>

              <Link href="/dashboard" className="hidden sm:inline-flex flex-shrink-0">
                <Button variant="outline" size="sm" className="rounded-full px-5 border-primary/20 dark:border-white/20 hover:border-accent hover:text-accent">
                  View All Masters <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
            </div>

            {/* Provider Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => <ProviderCardSkeleton key={i} />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {topProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            )}


            <div className="text-center sm:hidden pt-2">
              <Link href="/dashboard">
                <Button variant="outline" fullWidth className="rounded-full">
                  Browse All Providers <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── CHAPTER III: VEDIC HARMONY (KUNDLI SHOWCASE) ───────── */}
        <section className="bg-background dark:bg-background-dark py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20">
            <Card className="relative overflow-hidden bg-gradient-to-r from-primary via-[#3B1F5C] to-secondary text-white p-8 sm:p-14 border border-accent/20 shadow-2xl rounded-3xl">
              <div className="relative z-10 max-w-xl space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-semibold tracking-wider uppercase">
                  <span>Chapter III</span>
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  <span>Vedic Harmony</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight">
                  Free Kundli Match &<br />
                  <span className="text-accent italic">36-Guna Ashtakoot Milan</span>
                </h2>


                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-body">
                  Calculate your precise astrological compatibility score across 8 kutas — Varna, Nadi, Gana, Bhakoot — with instant Manglik & Nadi dosha indicators crafted by ancient Vedic principles.
                </p>

                <div className="flex flex-wrap gap-3.5 pt-3">
                  <Link href="/kundli/match">
                    <Button variant="accent" size="lg" className="font-bold rounded-full px-7 shadow-lg shadow-accent/20">
                      <Compass className="h-4 w-4 mr-1.5" /> Match Kundli Now
                    </Button>
                  </Link>
                  <Link href="/kundli/generate">
                    <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-full px-7">
                      Generate Birth Chart
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Ornamental Background Accent */}
              <div className="absolute right-4 bottom-1/2 translate-y-1/2 opacity-15 pointer-events-none hidden md:block">
                <Sparkles className="h-80 w-80 text-accent" />
              </div>
            </Card>
          </div>
        </section>

        {/* ─── CHAPTER IV: THE ASTROWELL DISTINCTION ─────────────── */}
        <section className="bg-surface/40 dark:bg-[#120A20] border-t border-black/5 dark:border-white/5 py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 space-y-14">
            {/* Editorial Centered Header */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                <span>Chapter IV</span>
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span>The Distinction</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary dark:text-text-primary-dark tracking-tight">
                Why Consult on Astrowell?
              </h2>
              <p className="text-xs sm:text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
                Built from the ground up for strict user privacy, verified authenticity, and real-time guidance.
              </p>
              <div className="w-12 h-0.5 bg-accent/40 mx-auto pt-1" />
            </div>

            {/* Feature Advantage Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  number: "01",
                  icon: Clock,
                  title: "Per-Minute Transparent Billing",
                  desc: "Pay only for the exact duration of your session. Low wallet balance warnings prevent unexpected cutoffs.",
                },
                {
                  number: "02",
                  icon: Video,
                  title: "Chat, Call & HD Video Modes",
                  desc: "Choose between text chat, high-clarity voice call, or 1:1 HD video session based on your comfort level.",
                },
                {
                  number: "03",
                  icon: Sparkles,
                  title: "Holistic Wellness Ecosystem",
                  desc: "Combine astrology predictions with yoga practice batches and Ayurvedic nutrition plans under one roof.",
                },
              ].map((feat) => {
                const Icon = feat.icon;
                return (
                  <Card
                    key={feat.title}
                    className="relative p-7 space-y-5 border-black/6 dark:border-white/8 hover:border-accent/40 dark:hover:border-accent/50 hover:shadow-xl transition-all duration-300 group overflow-hidden bg-surface dark:bg-surface-dark"
                  >
                    {/* Icon & Index Row */}
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/15 to-secondary/10 dark:from-white/10 dark:via-accent/20 dark:to-accent/10 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 group-hover:border-accent transition-all duration-300 shadow-sm">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <span className="font-display font-bold text-xs tracking-widest text-accent/60 uppercase">
                        {feat.number}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-lg text-text-primary dark:text-text-primary-dark group-hover:text-accent transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>

          </div>
        </section>

        {/* ── 5. EPILOGUE: REDESIGNED DARK FOOTER ─────────────────── */}
        <footer className="w-full bg-primary dark:bg-[#120B2E] rounded-t-[36px] sm:rounded-t-[56px] pt-16 pb-0 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24">
          {/* Footer Nav Grid */}
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
            <div className="py-6 text-center text-xs text-white/35">
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
