// ============================================================
// Mock Data: User & Birth Profiles
// ============================================================

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  role: "customer" | "provider" | "admin";
  isVerified: boolean;
  createdAt: string;
}

export interface BirthProfile {
  id: string;
  userId: string;
  label: "Self" | "Partner" | "Child" | "Parent" | "Friend" | "Other";
  name: string;
  gender: "male" | "female" | "other";
  dob: string; // ISO date string "YYYY-MM-DD"
  tob: string; // time of birth "HH:mm"
  placeOfBirth: {
    text: string;
    lat: number;
    lon: number;
    timezone: string;
  };
}

export const currentUserMock: User = {
  id: "user-001",
  name: "Arjun Mehta",
  email: "arjun.mehta@example.com",
  phone: "+91 98765 43210",
  avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Arjun",
  role: "customer",
  isVerified: true,
  createdAt: "2025-01-15T10:00:00Z",
};

export const birthProfilesMock: BirthProfile[] = [
  {
    id: "bp-001",
    userId: "user-001",
    label: "Self",
    name: "Arjun Mehta",
    gender: "male",
    dob: "1995-03-22",
    tob: "06:45",
    placeOfBirth: {
      text: "Mumbai, Maharashtra, India",
      lat: 19.076,
      lon: 72.8777,
      timezone: "Asia/Kolkata",
    },
  },
  {
    id: "bp-002",
    userId: "user-001",
    label: "Partner",
    name: "Priya Mehta",
    gender: "female",
    dob: "1997-07-10",
    tob: "14:20",
    placeOfBirth: {
      text: "Pune, Maharashtra, India",
      lat: 18.5204,
      lon: 73.8567,
      timezone: "Asia/Kolkata",
    },
  },
  {
    id: "bp-003",
    userId: "user-001",
    label: "Parent",
    name: "Ramesh Mehta",
    gender: "male",
    dob: "1962-11-05",
    tob: "09:15",
    placeOfBirth: {
      text: "Ahmedabad, Gujarat, India",
      lat: 23.0225,
      lon: 72.5714,
      timezone: "Asia/Kolkata",
    },
  },
];
