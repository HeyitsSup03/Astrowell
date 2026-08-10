"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { formatCurrency } from "@/lib/utils";
import type { Provider, AppointmentMode } from "@/types";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  MessageSquare,
  Phone,
  Sparkles,
  Video,
} from "lucide-react";
import { useState } from "react";

interface SlotPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: Provider;
  onBookingComplete?: (appointmentId: string) => void;
}

const mockSlots = [
  "10:00 AM",
  "11:30 AM",
  "02:00 PM",
  "04:30 PM",
  "07:00 PM",
  "08:30 PM",
];

export function SlotPickerModal({
  isOpen,
  onClose,
  provider,
  onBookingComplete,
}: SlotPickerModalProps) {
  const [selectedMode, setSelectedMode] = useState<AppointmentMode>("video");
  const [selectedDate, setSelectedDate] = useState<string>("Tomorrow, 12 Aug");
  const [selectedSlot, setSelectedSlot] = useState<string>("10:00 AM");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const estimatedCost = provider.ratePerMin * 30; // 30-min session estimate

  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        onBookingComplete?.("appt-new-001");
      }, 1500);
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Consultation Session" maxWidth="max-w-lg">
      {!isSuccess ? (
        <div className="space-y-5">
          {/* Provider Summary Header */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/4 dark:bg-white/4">
            <Avatar src={provider.avatarUrl} name={provider.name} size="md" isOnline={provider.isOnline} />
            <div>
              <h4 className="font-bold text-sm text-text-primary dark:text-text-primary-dark">
                {provider.name}
              </h4>
              <p className="text-xs text-text-muted dark:text-text-muted-dark">
                Rate: <strong className="text-accent">{formatCurrency(provider.ratePerMin)}/min</strong>
              </p>
            </div>
          </div>

          {/* Consultation Mode Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
              1. Choose Session Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "chat", label: "Chat", icon: MessageSquare },
                { id: "call", label: "Voice Call", icon: Phone },
                { id: "video", label: "HD Video", icon: Video },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = selectedMode === m.id;
                return (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setSelectedMode(m.id as AppointmentMode)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-primary/10 border-primary text-primary dark:bg-primary-light/20 dark:border-primary-light dark:text-primary-light font-bold"
                        : "border-black/10 dark:border-white/10 text-text-muted dark:text-text-muted-dark hover:text-text-primary"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
              2. Select Date
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {["Today, 11 Aug", "Tomorrow, 12 Aug", "Wed, 13 Aug"].map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                    selectedDate === d
                      ? "bg-primary text-white border-primary dark:bg-primary-light font-semibold"
                      : "border-black/10 dark:border-white/10 text-text-muted dark:text-text-muted-dark"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot Picker */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
              3. Available Time Slots
            </label>
            <div className="grid grid-cols-3 gap-2">
              {mockSlots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium text-center transition-all border ${
                      isSelected
                        ? "bg-accent text-white border-accent font-bold"
                        : "border-black/10 dark:border-white/10 text-text-primary dark:text-text-primary-dark hover:border-accent"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Discussion Topic */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
              Topic / Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Career prediction, Navamsa chart, Hatha practice..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-surface dark:bg-surface-dark text-text-primary dark:text-text-primary-dark focus:outline-none focus:border-primary"
            />
          </div>

          {/* Cost Estimate & Booking CTA */}
          <div className="pt-3 border-t border-black/5 dark:border-white/8 flex items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-text-muted dark:text-text-muted-dark block">Estimated 30-Min Fee</span>
              <span className="text-base font-bold text-accent">{formatCurrency(estimatedCost)}</span>
            </div>

            <Button
              variant="accent"
              isLoading={isSubmitting}
              onClick={handleConfirmBooking}
              className="font-semibold px-6"
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      ) : (
        /* Success Screen */
        <div className="text-center py-8 space-y-3">
          <div className="h-16 w-16 rounded-full bg-success/15 text-success mx-auto flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h3 className="font-bold text-lg text-text-primary dark:text-text-primary-dark">
            Booking Confirmed!
          </h3>
          <p className="text-xs text-text-muted dark:text-text-muted-dark">
            Your {selectedMode} session with {provider.name} is set for {selectedDate} at {selectedSlot}.
          </p>
        </div>
      )}
    </Modal>
  );
}
