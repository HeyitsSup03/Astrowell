"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Course } from "@/lib/mocks/courses.mock";
import { ArrowRight, Calendar, Clock, Star, Users, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="group overflow-hidden bg-surface dark:bg-surface-dark border-black/5 dark:border-white/8 transition-all duration-300 hover:shadow-xl hover:border-amber-400/50 rounded-2xl flex flex-col justify-between">
      <div>
        {/* Course Thumbnail Box */}
        <div className="relative aspect-16/9 w-full overflow-hidden bg-[#0A0414]">
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Live Video Batch Tag (Top Left) */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-rose-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            Live Video Batch
          </div>

          {/* Seats Left Tag (Top Right) */}
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="warning" className="bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-medium border-amber-400/40">
              {course.seatsLeft} Seats Left
            </Badge>
          </div>

          {/* Batch Date & Duration Overlay (Bottom Left) */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-white/90 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Starts {course.batchStartDate.split(",")[0]}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{course.durationWeeks} Weeks</span>
            </div>
          </div>
        </div>

        {/* Card Content Details */}
        <div className="p-5 space-y-3">
          {/* Category & Rating Row */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
              {course.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-text-primary dark:text-text-primary-dark">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-text-muted font-normal">({course.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/courses/${course.id}`}>
            <h3 className="font-display font-semibold text-lg text-text-primary dark:text-text-primary-dark line-clamp-2 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              {course.title}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-text-muted dark:text-text-muted-dark line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Instructor Bio Row */}
          <div className="pt-2 flex items-center gap-2.5 border-t border-black/5 dark:border-white/8">
            <Avatar
              name={course.instructor.name}
              src={course.instructor.avatarUrl}
              size="sm"
            />
            <div className="text-xs overflow-hidden">
              <div className="font-semibold text-text-primary dark:text-text-primary-dark truncate">
                {course.instructor.name}
              </div>
              <div className="text-[10px] text-text-muted dark:text-text-muted-dark truncate">
                {course.instructor.role}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Price & CTA */}
      <div className="px-5 pb-5 pt-1 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] text-text-muted dark:text-text-muted-dark font-medium">Batch Fee</div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-body font-bold text-lg text-text-primary dark:text-text-primary-dark">
              ₹{course.price.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-text-muted line-through font-normal">
              ₹{course.originalPrice.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <Link href={`/courses/${course.id}`}>
          <div className="px-4 py-2 rounded-xl bg-accent hover:bg-amber-500 text-primary-dark font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm group-hover:shadow-md">
            <span>Enroll Now</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </div>
    </Card>
  );
}
