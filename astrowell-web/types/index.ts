// ============================================================
// Re-export all shared TypeScript interfaces from mock files
// ============================================================
// This is the single import point for types in pages/components.
// When switching from mock → real API, only the api/*.ts files change,
// NOT these type definitions (they mirror the backend schema directly).

export type { Provider } from "@/lib/mocks/providers.mock";
export type { User, BirthProfile } from "@/lib/mocks/user.mock";
export type {
  Appointment,
  AppointmentMode,
  AppointmentStatus,
} from "@/lib/mocks/appointments.mock";
export type {
  WalletTransaction,
  TransactionType,
  Wallet,
} from "@/lib/mocks/wallet.mock";
export type {
  ChatMessage,
  Conversation,
} from "@/lib/mocks/chat.mock";
export type {
  Course,
  CourseScheduleSlot,
} from "@/lib/mocks/courses.mock";
export type { Product, ProductCategory } from "@/lib/mocks/products.mock";
export type {
  KundliReport,
  KundliChart,
  Planet,
  Dasha,
  MatchResult,
  Kuta,
  KutaName,
  MatchVerdict,
} from "@/lib/mocks/kundli.mock";
