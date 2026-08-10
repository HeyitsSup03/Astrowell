// ============================================================
// Mock Data: Wallet & Transactions
// ============================================================

export type TransactionType = "recharge" | "deduction" | "refund";

export interface WalletTransaction {
  id: string;
  type: TransactionType;
  amount: number; // INR — positive for credit, negative for debit (display logic in component)
  description: string;
  date: string; // ISO timestamp
  balance: number; // balance after this transaction
}

export interface Wallet {
  userId: string;
  balance: number; // INR
  currency: "INR";
}

export const walletMock: Wallet = {
  userId: "user-001",
  balance: 2450,
  currency: "INR",
};

export const transactionsMock: WalletTransaction[] = [
  {
    id: "txn-001",
    type: "recharge",
    amount: 1000,
    description: "Wallet recharge via UPI",
    date: "2026-08-09T12:30:00+05:30",
    balance: 2450,
  },
  {
    id: "txn-002",
    type: "deduction",
    amount: -600,
    description: "Chat session with Ananya Krishnamurthy",
    date: "2026-08-08T16:30:00+05:30",
    balance: 1450,
  },
  {
    id: "txn-003",
    type: "deduction",
    amount: -540,
    description: "Video session with Dr. Meena Agarwal",
    date: "2026-08-07T11:30:00+05:30",
    balance: 2050,
  },
  {
    id: "txn-004",
    type: "recharge",
    amount: 2000,
    description: "Wallet recharge via Razorpay",
    date: "2026-08-05T09:00:00+05:30",
    balance: 2590,
  },
  {
    id: "txn-005",
    type: "refund",
    amount: 1350,
    description: "Refund: Cancelled session with Pt. Vikramaditya Pande",
    date: "2026-08-05T10:15:00+05:30",
    balance: 590,
  },
  {
    id: "txn-006",
    type: "deduction",
    amount: -360,
    description: "Kundli Matchmaking Report — PDF",
    date: "2026-08-03T14:00:00+05:30",
    balance: 3940,
  },
  {
    id: "txn-007",
    type: "recharge",
    amount: 500,
    description: "Wallet recharge via Net Banking",
    date: "2026-08-01T08:00:00+05:30",
    balance: 4300,
  },
  {
    id: "txn-008",
    type: "deduction",
    amount: -1200,
    description: "Yoga Course: Beginner Pranayama Batch",
    date: "2026-07-28T10:00:00+05:30",
    balance: 3800,
  },
];
