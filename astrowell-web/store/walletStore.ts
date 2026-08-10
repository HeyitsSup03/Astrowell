import { create } from "zustand";
import type { Wallet, WalletTransaction } from "@/types";

interface WalletState {
  wallet: Wallet | null;
  transactions: WalletTransaction[];
  isLoading: boolean;

  setWallet: (wallet: Wallet) => void;
  setTransactions: (transactions: WalletTransaction[]) => void;
  deductBalance: (amount: number) => void;
  setLoading: (loading: boolean) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  wallet: null,
  transactions: [],
  isLoading: false,

  setWallet: (wallet) => set({ wallet }),
  setTransactions: (transactions) => set({ transactions }),

  deductBalance: (amount) =>
    set((state) =>
      state.wallet
        ? { wallet: { ...state.wallet, balance: Math.max(0, state.wallet.balance - amount) } }
        : {}
    ),

  setLoading: (isLoading) => set({ isLoading }),
}));
