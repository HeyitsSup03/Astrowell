"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MOCK_COURSES } from "@/lib/mocks/courses.mock";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.id as string;

  const course = MOCK_COURSES.find((c) => c.id === courseId) || MOCK_COURSES[0];

  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [isEnrolled, setIsEnrolled] = useState(false);

  function toggleWeek(weekNum: number) {
    setExpandedWeek((prev) => (prev === weekNum ? null : weekNum));
  }

  function handleEnroll() {
    setIsEnrolled(true);
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark pb-24 space-y-8">
      {/* Back Button */}
      <div className="pt-2">
        <Link href="/courses">
          <Button
            variant="ghost"
            size="sm"
            className="text-text-muted hover:text-text-primary dark:hover:text-text-primary-dark gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Courses</span>
          </Button>
        </Link>
      </div>

      {/* ── COURSE HEADER HERO SECTION ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Columns: Main Information & Syllabus */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Card */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                {course.categoryLabel}
              </span>
              <Badge variant="secondary" className="text-xs">
                {course.level}
              </Badge>
              <div className="flex items-center gap-1 text-xs font-bold text-text-primary dark:text-text-primary-dark ml-auto">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{course.rating.toFixed(1)}</span>
                <span className="text-text-muted font-normal">
                  ({course.reviewCount} Reviews • {course.studentCount} Enrolled)
                </span>
              </div>
            </div>

            <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-text-primary dark:text-text-primary-dark leading-tight">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-text-muted dark:text-text-muted-dark leading-relaxed">
              {course.fullDescription}
            </p>

            {/* Instructor Profile Card */}
            <Card className="p-4 bg-surface dark:bg-surface-dark border-black/5 dark:border-white/8 rounded-2xl flex items-center gap-4">
              <Avatar
                name={course.instructor.name}
                src={course.instructor.avatarUrl}
                size="lg"
              />
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                  Course Instructor
                </div>
                <div className="font-display font-bold text-lg text-text-primary dark:text-text-primary-dark">
                  {course.instructor.name}
                </div>
                <div className="text-xs text-text-muted dark:text-text-muted-dark">
                  {course.instructor.role} • {course.instructor.experienceYears}+ Years Experience
                </div>
              </div>
            </Card>
          </div>

          {/* Highlights & What You'll Learn */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-xl text-text-primary dark:text-text-primary-dark flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>What You'll Learn & Master</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-surface dark:bg-surface-dark border border-black/5 dark:border-white/8 text-xs sm:text-sm font-medium text-text-primary dark:text-text-primary-dark"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── EXPANDABLE SYLLABUS & CURRICULUM ACCORDION ───────── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-xl text-text-primary dark:text-text-primary-dark flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                <span>Course Curriculum ({course.curriculum.length} Weeks)</span>
              </h2>
              <span className="text-xs text-text-muted font-medium">
                {course.durationWeeks} Weeks • Live Video
              </span>
            </div>

            <div className="space-y-3">
              {course.curriculum.map((module) => {
                const isOpen = expandedWeek === module.week;
                return (
                  <Card
                    key={module.week}
                    className="overflow-hidden border-black/5 dark:border-white/8 rounded-2xl transition-all"
                  >
                    {/* Module Header Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleWeek(module.week)}
                      className="w-full p-4 bg-surface dark:bg-surface-dark flex items-center justify-between text-left hover:bg-black/2 dark:hover:bg-white/2 transition-colors cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                          Week {module.week}
                        </div>
                        <div className="font-display font-bold text-base text-text-primary dark:text-text-primary-dark">
                          {module.title}
                        </div>
                        <div className="text-xs text-text-muted dark:text-text-muted-dark">
                          {module.description}
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-text-muted">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    {/* Lesson Topics List */}
                    {isOpen && (
                      <div className="p-4 bg-black/2 dark:bg-white/2 border-t border-black/5 dark:border-white/8 space-y-2.5">
                        {module.lessons.map((lesson, lIdx) => (
                          <div
                            key={lIdx}
                            className="flex items-center gap-3 text-xs text-text-primary dark:text-text-primary-dark font-medium"
                          >
                            <Video className="w-4 h-4 text-amber-500 shrink-0" />
                            <span>{lesson}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── RIGHT 4 COLUMNS: STICKY BATCH ENROLLMENT CARD ───────── */}
        <div className="lg:col-span-4 lg:sticky lg:top-20 space-y-4">
          <Card className="p-6 bg-surface dark:bg-surface-dark border-amber-300/60 dark:border-amber-400/30 rounded-3xl shadow-xl space-y-6">
            {/* Thumbnail Preview */}
            <div className="relative aspect-16/9 w-full overflow-hidden rounded-2xl bg-[#0A0414]">
              <Image
                src={course.thumbnailUrl}
                alt={course.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-3 left-3 bg-rose-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                <Video className="w-3 h-3" />
                <span>Live Interactive Batch</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-1">
              <div className="text-xs text-text-muted font-medium">Batch Fee</div>
              <div className="flex items-baseline gap-2">
                <span className="font-body font-extrabold text-2xl sm:text-3xl text-text-primary dark:text-text-primary-dark">
                  ₹{course.price.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-text-muted line-through font-normal">
                  ₹{course.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full ml-auto">
                  50% OFF
                </span>
              </div>
            </div>

            {/* Batch Info Details */}
            <div className="space-y-3 pt-3 border-t border-black/5 dark:border-white/8 text-xs font-medium text-text-primary dark:text-text-primary-dark">
              <div className="flex items-center justify-between">
                <span className="text-text-muted flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span>Batch Starts</span>
                </span>
                <span className="font-bold">{course.batchStartDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Schedule</span>
                </span>
                <span className="font-bold">{course.batchSchedule}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-500" />
                  <span>Available Seats</span>
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {course.seatsLeft} Seats Left
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Certificate</span>
                </span>
                <span className="font-bold">Astrowell Certified</span>
              </div>
            </div>

            {/* Enrollment Action CTA */}
            {isEnrolled ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <div className="font-display font-bold text-base text-emerald-700 dark:text-emerald-400">
                  Enrolled Successfully!
                </div>
                <p className="text-xs text-text-muted">
                  Batch meeting link & syllabus access details have been sent to your email.
                </p>
              </div>
            ) : (
              <Button
                onClick={handleEnroll}
                size="lg"
                className="w-full bg-[#D4A24C] hover:bg-amber-500 text-primary-dark font-extrabold py-6 rounded-2xl text-base shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                Enroll in Live Batch →
              </Button>
            )}

            {/* Guarantee Footer */}
            <div className="pt-2 text-center text-[11px] text-text-muted dark:text-text-muted-dark space-y-1">
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Satisfaction & Money-Back Guarantee</span>
              </div>
              <p>Cancel before Class 2 for a full refund.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
