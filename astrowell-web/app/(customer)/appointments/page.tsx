"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { ProviderCardSkeleton } from "@/components/ui/skeleton";
import { getPastAppointments, getUpcomingAppointments } from "@/lib/api/appointments";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";
import type { Appointment, AppointmentStatus } from "@/types";
import {
  Calendar,
  Clock,
  MessageSquare,
  Phone,
  RotateCcw,
  Sparkles,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  const [upcoming, setUpcoming] = useState<Appointment[]>([]);
  const [past, setPast] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getUpcomingAppointments(), getPastAppointments()]).then(
      ([upcomingData, pastData]) => {
        setUpcoming(upcomingData);
        setPast(pastData);
        setIsLoading(false);
      }
    );
  }, []);

  const statusVariants: Record<AppointmentStatus, "success" | "warning" | "primary" | "danger"> = {
    confirmed: "success",
    pending: "warning",
    completed: "primary",
    cancelled: "danger",
  };

  const statusLabels: Record<AppointmentStatus, string> = {
    confirmed: "Confirmed",
    pending: "Pending Confirmation",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  const displayedList = activeTab === "upcoming" ? upcoming : past;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <Card className="bg-gradient-to-r from-primary via-primary-light to-secondary text-white p-6 md:p-8 border-0 shadow-md">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-accent text-xs font-medium backdrop-blur-sm">
              <Calendar className="h-3.5 w-3.5" />
              <span>Consultation Schedule</span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">
              My Appointments
            </h1>
            <p className="text-xs md:text-sm text-white/80">
              Manage your upcoming chat, call, and video sessions.
            </p>
          </div>

          <Link href="/dashboard">
            <Button variant="accent" size="sm" className="font-semibold hidden sm:inline-flex">
              + Book New Session
            </Button>
          </Link>
        </div>
      </Card>

      {/* Tabs View */}
      <div className="space-y-4">
        <Tabs
          tabs={[
            { id: "upcoming", label: `Upcoming Sessions (${upcoming.length})` },
            { id: "past", label: `Past Sessions (${past.length})` },
          ]}
          defaultTab="upcoming"
          onChange={setActiveTab}
        />

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProviderCardSkeleton key={i} />
            ))}
          </div>
        ) : displayedList.length === 0 ? (
          <Card className="text-center py-12 px-4 space-y-3">
            <Calendar className="h-12 w-12 text-text-muted dark:text-text-muted-dark mx-auto" />
            <h3 className="font-bold text-base text-text-primary dark:text-text-primary-dark">
              No {activeTab} appointments found
            </h3>
            <p className="text-xs text-text-muted dark:text-text-muted-dark">
              You don't have any {activeTab} bookings scheduled at the moment.
            </p>
            <Link href="/dashboard">
              <Button variant="accent" size="sm">
                Explore Experts
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {displayedList.map((appt) => (
              <Card key={appt.id} className="p-5 space-y-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Provider Avatar + Info */}
                  <div className="flex items-center gap-3.5">
                    <Avatar
                      src={appt.providerAvatarUrl}
                      name={appt.providerName}
                      size="lg"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-text-primary dark:text-text-primary-dark">
                          {appt.providerName}
                        </h3>
                        <Badge variant={statusVariants[appt.status]}>
                          {statusLabels[appt.status]}
                        </Badge>
                      </div>
                      <p className="text-xs text-text-muted dark:text-text-muted-dark">
                        {appt.providerCategory} • {formatCurrency(appt.costEstimate)}
                      </p>
                    </div>
                  </div>

                  {/* Date & Mode Pill */}
                  <div className="flex items-center gap-3 text-xs bg-black/4 dark:bg-white/4 p-3 rounded-xl">
                    <div className="flex items-center gap-1.5 font-medium text-text-primary dark:text-text-primary-dark">
                      <Clock className="h-4 w-4 text-accent" />
                      <span>{formatDate(appt.slotStart)} at {formatTime(appt.slotStart)}</span>
                    </div>
                    <Badge variant="primary" className="capitalize">
                      {appt.mode} Mode
                    </Badge>
                  </div>
                </div>

                {appt.notes && (
                  <p className="text-xs text-text-muted dark:text-text-muted-dark bg-black/2 dark:bg-white/2 p-2.5 rounded-lg border border-black/5 dark:border-white/5">
                    <strong>Topic:</strong> {appt.notes}
                  </p>
                )}

                {/* Card Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/8">
                  <span className="text-xs text-text-muted dark:text-text-muted-dark">
                    Booking Ref: #{appt.id}
                  </span>

                  <div className="flex items-center gap-2">
                    {appt.status === "confirmed" && (
                      <>
                        <Link href={`/chat/conv-001`}>
                          <Button size="sm" variant="accent" className="font-semibold">
                            <MessageSquare className="h-4 w-4 mr-1" /> Start Chat
                          </Button>
                        </Link>
                        <Link href={`/call/session-001`}>
                          <Button size="sm" variant="outline">
                            <Video className="h-4 w-4 mr-1" /> Join Call
                          </Button>
                        </Link>
                      </>
                    )}

                    {appt.status === "completed" && (
                      <Link href={`/providers/${appt.providerId}`}>
                        <Button size="sm" variant="outline">
                          <RotateCcw className="h-3.5 w-3.5 mr-1" /> Book Again
                        </Button>
                      </Link>
                    )}

                    {appt.status === "pending" && (
                      <Button size="sm" variant="ghost" className="text-danger">
                        Cancel Request
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
