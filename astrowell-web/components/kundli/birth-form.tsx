"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { BirthProfile } from "@/types";
import { Calendar, Clock, MapPin, User, Sparkles, Check } from "lucide-react";
import { useState } from "react";

export interface BirthFormValues {
  label: string;
  name: string;
  gender: "male" | "female" | "other";
  dob: string;
  tob: string;
  placeOfBirth: string;
}

interface BirthFormProps {
  title?: string;
  subtitle?: string;
  savedProfiles?: BirthProfile[];
  initialValues?: Partial<BirthFormValues>;
  onSubmit: (values: BirthFormValues) => void;
  isLoading?: boolean;
  submitButtonText?: string;
}

const defaultPlaces = [
  "Mumbai, Maharashtra, India",
  "Delhi, NCR, India",
  "Bangalore, Karnataka, India",
  "Pune, Maharashtra, India",
  "Ahmedabad, Gujarat, India",
  "Chennai, Tamil Nadu, India",
  "Kolkata, West Bengal, India",
];

export function BirthForm({
  title = "Birth Details",
  subtitle = "Enter date, time & place of birth for exact planetary positions",
  savedProfiles = [],
  initialValues,
  onSubmit,
  isLoading = false,
  submitButtonText = "Generate Kundli Chart",
}: BirthFormProps) {
  const [selectedSavedId, setSelectedSavedId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<BirthFormValues>({
    label: initialValues?.label || "Self",
    name: initialValues?.name || "",
    gender: initialValues?.gender || "male",
    dob: initialValues?.dob || "1995-03-22",
    tob: initialValues?.tob || "06:45",
    placeOfBirth: initialValues?.placeOfBirth || "Mumbai, Maharashtra, India",
  });

  const handleSelectSavedProfile = (profile: BirthProfile) => {
    setSelectedSavedId(profile.id);
    setFormValues({
      label: profile.label,
      name: profile.name,
      gender: profile.gender,
      dob: profile.dob,
      tob: profile.tob,
      placeOfBirth: profile.placeOfBirth.text,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          <h2 className="text-lg font-bold text-text-primary dark:text-text-primary-dark">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* Saved profiles quick selector */}
      {savedProfiles.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/8">
          <span className="text-xs font-semibold text-text-muted dark:text-text-muted-dark uppercase tracking-wider block">
            Or select saved profile:
          </span>
          <div className="flex flex-wrap gap-2">
            {savedProfiles.map((p) => {
              const isSelected = selectedSavedId === p.id;
              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => handleSelectSavedProfile(p)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-primary text-white dark:bg-primary-light shadow-xs font-semibold"
                      : "bg-black/4 dark:bg-white/5 text-text-primary dark:text-text-primary-dark hover:bg-black/8"
                  }`}
                >
                  {isSelected && <Check className="h-3.5 w-3.5 text-accent" />}
                  <span>{p.name} ({p.label})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Birth Details Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="e.g. Arjun Mehta"
          value={formValues.name}
          onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
          required
          leftIcon={<User className="h-4 w-4" />}
        />

        {/* Gender Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-text-primary dark:text-text-primary-dark">
            Gender
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["male", "female", "other"] as const).map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => setFormValues({ ...formValues, gender: g })}
                className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all border ${
                  formValues.gender === g
                    ? "bg-primary/10 border-primary text-primary dark:bg-primary-light/20 dark:border-primary-light dark:text-primary-light"
                    : "border-black/10 dark:border-white/10 text-text-muted dark:text-text-muted-dark hover:text-text-primary"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Date & Time of Birth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Date of Birth"
            type="date"
            value={formValues.dob}
            onChange={(e) => setFormValues({ ...formValues, dob: e.target.value })}
            required
            leftIcon={<Calendar className="h-4 w-4" />}
          />

          <Input
            label="Time of Birth"
            type="time"
            value={formValues.tob}
            onChange={(e) => setFormValues({ ...formValues, tob: e.target.value })}
            required
            leftIcon={<Clock className="h-4 w-4" />}
          />
        </div>

        {/* Place of Birth */}
        <div className="space-y-1.5">
          <Input
            label="Place of Birth (City, State, Country)"
            placeholder="e.g. Mumbai, Maharashtra, India"
            value={formValues.placeOfBirth}
            onChange={(e) => setFormValues({ ...formValues, placeOfBirth: e.target.value })}
            required
            leftIcon={<MapPin className="h-4 w-4" />}
          />

          {/* Quick Location Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[11px] text-text-muted dark:text-text-muted-dark self-center mr-1">
              Quick pick:
            </span>
            {defaultPlaces.slice(0, 4).map((place) => (
              <button
                type="button"
                key={place}
                onClick={() => setFormValues({ ...formValues, placeOfBirth: place })}
                className="text-[10px] px-2 py-0.5 rounded-md bg-black/4 dark:bg-white/5 text-text-muted dark:text-text-muted-dark hover:text-text-primary hover:bg-black/8 transition-colors"
              >
                {place.split(",")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Submit CTA */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="accent"
            fullWidth
            isLoading={isLoading}
            className="font-semibold py-3"
          >
            <Sparkles className="h-4 w-4 mr-1.5" />
            {submitButtonText}
          </Button>
        </div>
      </form>
    </Card>
  );
}
