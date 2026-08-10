import { mockFetch } from "@/lib/mocks";
import {
  walletMock,
  transactionsMock,
  type Wallet,
  type WalletTransaction,
} from "@/lib/mocks/wallet.mock";

/** Fetch the current user's wallet */
export async function getWallet(): Promise<Wallet> {
  return mockFetch(walletMock);
}

/** Fetch all wallet transactions */
export async function getTransactions(): Promise<WalletTransaction[]> {
  return mockFetch([...transactionsMock].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ));
}
