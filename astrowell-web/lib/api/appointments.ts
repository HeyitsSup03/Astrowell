import { mockFetch } from "@/lib/mocks";
import {
  appointmentsMock,
  type Appointment,
} from "@/lib/mocks/appointments.mock";

/** Fetch all appointments for the current user */
export async function getAppointments(): Promise<Appointment[]> {
  return mockFetch(appointmentsMock);
}

/** Fetch a single appointment by ID */
export async function getAppointmentById(id: string): Promise<Appointment | null> {
  return mockFetch(appointmentsMock.find((a) => a.id === id) ?? null);
}

/** Fetch upcoming (confirmed/pending) appointments */
export async function getUpcomingAppointments(): Promise<Appointment[]> {
  return mockFetch(
    appointmentsMock.filter((a) =>
      a.status === "confirmed" || a.status === "pending"
    )
  );
}

/** Fetch past (completed/cancelled) appointments */
export async function getPastAppointments(): Promise<Appointment[]> {
  return mockFetch(
    appointmentsMock.filter((a) =>
      a.status === "completed" || a.status === "cancelled"
    )
  );
}
