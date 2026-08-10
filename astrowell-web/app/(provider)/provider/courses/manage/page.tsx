"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCourses } from "@/lib/api/courses";
import { formatCurrency } from "@/lib/utils";
import type { Course } from "@/types";
import { BookOpen, Plus, Users, Video } from "lucide-react";
import { useEffect, useState } from "react";

export default function CourseManagePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCourses().then((data) => {
      setCourses(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
            Course Batches & Workshops
          </h1>
          <p className="text-xs text-text-muted dark:text-text-muted-dark mt-0.5">
            Manage your online group yoga sessions, pranayama workshops, and astrology classes.
          </p>
        </div>

        <Button variant="accent" size="sm" className="font-semibold gap-1.5">
          <Plus className="h-4 w-4" /> Create New Course Batch
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-28 bg-black/5 dark:bg-white/5 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <Card key={course.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-text-primary dark:text-text-primary-dark">
                      {course.title}
                    </h3>
                    <Badge variant="primary" className="capitalize">{course.level}</Badge>
                  </div>
                  <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1 line-clamp-1">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-text-muted dark:text-text-muted-dark">
                    <span className="font-semibold text-text-primary dark:text-text-primary-dark">
                      Fee: {formatCurrency(course.price)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-accent" /> {course.enrolledCount} / {course.maxSeats} Enrolled
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <Button size="sm" variant="outline" className="text-xs">
                  Manage Roster
                </Button>
                <Button size="sm" variant="accent" className="text-xs">
                  <Video className="h-3.5 w-3.5 mr-1" /> Join VC Batch
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
