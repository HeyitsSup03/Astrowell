"use client";

import { CourseCard } from "@/components/courses/course-card";
import {
  MOCK_COURSES,
  MOCK_COURSE_CATEGORIES,
  Course,
} from "@/lib/mocks/courses.mock";
import { Award, BookOpen, Filter, Search, Sparkles, Video } from "lucide-react";
import { useState } from "react";

export default function CustomerCoursesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = MOCK_COURSES.filter((course) => {
    if (activeCategory !== "all" && course.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchTitle = course.title.toLowerCase().includes(q);
      const matchDesc = course.shortDescription.toLowerCase().includes(q);
      const matchInstructor = course.instructor.name.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchInstructor) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark pb-20 space-y-8">
      {/* ── 1. COSMIC HERO BANNER FOR COURSES ────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1C0D2A] via-[#150924] to-[#0A0414] text-white py-12 px-6 sm:px-10 lg:px-16 border-b border-amber-500/20 shadow-2xl">
        {/* Ambient radial grid background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#D4A24C_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="relative max-w-4xl space-y-5 text-left">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Astrowell Certified Academy</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Learn Ancient Cosmic Wisdom & <br />
            <span className="text-[#D4A24C]">Certified Vedic Arts</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-sm sm:text-base font-body max-w-2xl leading-relaxed">
            Join live interactive video batches led by master astrologers, Rishikesh yoga gurus, and BAMS Ayurvedic doctors. Complete with session recordings and certified credentials.
          </p>

          {/* Key Value Badges */}
          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-white/90 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-amber-400">
                <Video className="w-4 h-4" />
              </div>
              <span>Live Video Batches</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-amber-400">
                <Award className="w-4 h-4" />
              </div>
              <span>Certified Credentials</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-amber-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <span>Lifetime Session Recordings</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CATEGORY PILL FILTER & SEARCH BAR ─────────────────── */}
      <div className="w-full">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Pills Row */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1">
            {MOCK_COURSE_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  type="button"
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer border ${
                    isActive
                      ? "bg-[#D4A24C] text-[#2E1A47] border-[#D4A24C] shadow-md font-bold"
                      : "bg-surface dark:bg-surface-dark border-amber-300/60 dark:border-amber-400/30 text-text-muted dark:text-text-muted-dark hover:border-amber-400 hover:text-text-primary dark:hover:text-text-primary-dark"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80 shrink-0">
            <input
              type="text"
              placeholder="Search courses, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface dark:bg-surface-dark border border-amber-300/60 dark:border-amber-400/30 rounded-full px-4 py-2 pr-10 text-xs sm:text-sm text-text-primary dark:text-text-primary-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all shadow-sm"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600 dark:text-amber-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── 3. COURSES CATALOG GRID ──────────────────────────────── */}
      <main className="w-full">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-surface dark:bg-surface-dark rounded-2xl border border-black/5 dark:border-white/8">
            <Filter className="w-12 h-12 stroke-[1.5] text-amber-500/40 mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg text-text-primary dark:text-text-primary-dark">
              No course batches found
            </h3>
            <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1">
              Try selecting another category or clear your search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
