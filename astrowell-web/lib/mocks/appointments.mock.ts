// ============================================================
// Mock Data: Appointments
// ============================================================

export type AppointmentMode = "chat" | "call" | "video";
export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  providerId: string;
  providerName: string;
  providerCategory: string;
  providerAvatarUrl: string;
  customerId: string;
  mode: AppointmentMode;
  slotStart: string; // ISO timestamp
  slotEnd: string;   // ISO timestamp
  status: AppointmentStatus;
  costEstimate: number; // INR
  notes?: string;
}

export const appointmentsMock: Appointment[] = [
  {
    id: "appt-001",
    providerId: "prov-001",
    providerName: "Pandit Raghavendra Joshi",
    providerCategory: "Astrologer",
    providerAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Raghavendra",
    customerId: "user-001",
    mode: "video",
    slotStart: "2026-08-12T10:00:00+05:30",
    slotEnd: "2026-08-12T10:30:00+05:30",
    status: "confirmed",
    costEstimate: 900,
    notes: "Discuss career change and upcoming dasha period",
  },
  {
    id: "appt-002",
    providerId: "prov-004",
    providerName: "Yogacharya Suresh Iyer",
    providerCategory: "Yoga Instructor",
    providerAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Suresh",
    customerId: "user-001",
    mode: "call",
    slotStart: "2026-08-14T07:00:00+05:30",
    slotEnd: "2026-08-14T07:45:00+05:30",
    status: "confirmed",
    costEstimate: 540,
  },
  {
    id: "appt-003",
    providerId: "prov-002",
    providerName: "Ananya Krishnamurthy",
    providerCategory: "Astrologer",
    providerAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Ananya",
    customerId: "user-001",
    mode: "chat",
    slotStart: "2026-08-08T16:00:00+05:30",
    slotEnd: "2026-08-08T16:30:00+05:30",
    status: "completed",
    costEstimate: 600,
    notes: "Marriage compatibility reading",
  },
  {
    id: "appt-004",
    providerId: "prov-005",
    providerName: "Dr. Meena Agarwal",
    providerCategory: "Dietitian",
    providerAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Meena",
    customerId: "user-001",
    mode: "video",
    slotStart: "2026-08-07T11:00:00+05:30",
    slotEnd: "2026-08-07T11:30:00+05:30",
    status: "completed",
    costEstimate: 540,
  },
  {
    id: "appt-005",
    providerId: "prov-003",
    providerName: "Tarot Priya Sharma",
    providerCategory: "Tarot Reader",
    providerAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Priya",
    customerId: "user-001",
    mode: "chat",
    slotStart: "2026-08-20T15:00:00+05:30",
    slotEnd: "2026-08-20T15:30:00+05:30",
    status: "pending",
    costEstimate: 450,
  },
  {
    id: "appt-006",
    providerId: "prov-006",
    providerName: "Pt. Vikramaditya Pande",
    providerCategory: "Astrologer",
    providerAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Vikramaditya",
    customerId: "user-001",
    mode: "video",
    slotStart: "2026-08-05T09:00:00+05:30",
    slotEnd: "2026-08-05T09:30:00+05:30",
    status: "cancelled",
    costEstimate: 1350,
  },
];
