import { create } from "zustand";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User, token: string) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user, token) =>
    set({ user, token, isAuthenticated: true, isLoading: false }),

  clearUser: () =>
    set({ user: null, token: null, isAuthenticated: false }),

  setLoading: (isLoading) => set({ isLoading }),
}));
