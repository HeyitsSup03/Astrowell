"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { getTransactions, getWallet } from "@/lib/api/wallet";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useWalletStore } from "@/store/walletStore";
import type { WalletTransaction, TransactionType } from "@/types";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  Plus,
  RefreshCw,
  Sparkles,
  Wallet as WalletIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function WalletPage() {
  const { wallet, transactions, setWallet, setTransactions } = useWalletStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState<number>(500);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getWallet(), getTransactions()]).then(([walletData, txnsData]) => {
      setWallet(walletData);
      setTransactions(txnsData);
      setIsLoading(false);
    });
  }, [setWallet, setTransactions]);

  const handleSimulateRecharge = () => {
    if (!rechargeAmount || rechargeAmount <= 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      const newBalance = (wallet?.balance || 0) + rechargeAmount;
      const newTxn: WalletTransaction = {
        id: `txn-${Date.now()}`,
        type: "recharge",
        amount: rechargeAmount,
        description: `Wallet recharge via Instant UPI`,
        date: new Date().toISOString(),
        balance: newBalance,
      };

      setWallet({ userId: "user-001", balance: newBalance, currency: "INR" });
      setTransactions([newTxn, ...transactions]);

      setTimeout(() => {
        setIsSuccess(false);
        setIsRechargeModalOpen(false);
      }, 1200);
    }, 800);
  };

  const txnBadges: Record<TransactionType, { variant: "success" | "danger" | "accent"; icon: any; label: string }> = {
    recharge: { variant: "success", icon: ArrowDownLeft, label: "Recharge" },
    deduction: { variant: "danger", icon: ArrowUpRight, label: "Deduction" },
    refund: { variant: "accent", icon: RefreshCw, label: "Refund" },
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ── Balance Card Banner ──────────────────────────────────── */}
      <Card className="bg-gradient-to-r from-[#0B1E36] via-[#1B3B6F] to-[#214375] text-white p-6 md:p-8 border-0 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-accent text-xs font-medium backdrop-blur-sm">
              <WalletIcon className="h-3.5 w-3.5" />
              <span>Astrowell Wallet</span>
            </div>
            <span className="text-xs text-white/80 block font-medium">
              Available Consultation Balance
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-accent">
              {wallet ? formatCurrency(wallet.balance) : "₹0"}
            </h1>
            <p className="text-xs text-white/70">
              Used automatically for per-minute chat, call, and video sessions.
            </p>
          </div>

          <Button
            variant="accent"
            size="lg"
            onClick={() => setIsRechargeModalOpen(true)}
            className="font-bold shadow-md text-sm gap-2"
          >
            <Plus className="h-5 w-5" /> Add Money to Wallet
          </Button>
        </div>
      </Card>

      {/* ── Quick Info Cards ────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 space-y-1">
          <span className="text-xs text-text-muted dark:text-text-muted-dark block">Estimated Chat Time</span>
          <span className="text-lg font-bold text-text-primary dark:text-text-primary-dark">
            ~{Math.floor((wallet?.balance || 0) / 30)} Minutes
          </span>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-xs text-text-muted dark:text-text-muted-dark block">Payment Method</span>
          <span className="text-sm font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-1.5 mt-1">
            <CreditCard className="h-4 w-4 text-accent" /> UPI / Cards / NetBanking
          </span>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-xs text-text-muted dark:text-text-muted-dark block">Refund Policy</span>
          <span className="text-sm font-semibold text-success flex items-center gap-1.5 mt-1">
            <Sparkles className="h-4 w-4" /> 100% Instant Refund Protection
          </span>
        </Card>
      </div>

      {/* ── Transactions Ledger Table ───────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary dark:text-text-primary-dark">
            Recent Wallet Transactions
          </h2>
          <span className="text-xs text-text-muted dark:text-text-muted-dark">
            Showing last {transactions.length} records
          </span>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-black/5 dark:bg-white/5 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <Card className="text-center py-12 px-4 space-y-2">
            <WalletIcon className="h-12 w-12 text-text-muted dark:text-text-muted-dark mx-auto" />
            <h3 className="font-bold text-sm text-text-primary dark:text-text-primary-dark">
              No transactions yet
            </h3>
            <p className="text-xs text-text-muted dark:text-text-muted-dark">
              Recharge your wallet to start consulting with verified experts.
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {transactions.map((txn) => {
              const info = txnBadges[txn.type];
              const Icon = info.icon;
              const isPositive = txn.amount > 0;
              return (
                <Card key={txn.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                        txn.type === "recharge"
                          ? "bg-success/10 text-success"
                          : txn.type === "refund"
                          ? "bg-accent/10 text-accent"
                          : "bg-danger/10 text-danger"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs sm:text-sm text-text-primary dark:text-text-primary-dark">
                          {txn.description}
                        </h4>
                        <Badge variant={info.variant}>{info.label}</Badge>
                      </div>
                      <span className="text-[11px] text-text-muted dark:text-text-muted-dark block mt-0.5">
                        {formatDate(txn.date)}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-sm font-bold block ${
                        isPositive ? "text-success" : "text-text-primary dark:text-text-primary-dark"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {formatCurrency(txn.amount)}
                    </span>
                    <span className="text-[10px] text-text-muted dark:text-text-muted-dark block">
                      Bal: {formatCurrency(txn.balance)}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Add Money Recharge Modal ────────────────────────────── */}
      <Modal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
        title="Add Money to Astrowell Wallet"
        maxWidth="max-w-md"
      >
        {!isSuccess ? (
          <div className="space-y-5">
            <p className="text-xs text-text-muted dark:text-text-muted-dark">
              Select or enter the amount to recharge. Simulated instant wallet top-up.
            </p>

            {/* Quick Amount Chips */}
            <div className="grid grid-cols-4 gap-2">
              {[100, 500, 1000, 2000].map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => setRechargeAmount(amt)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    rechargeAmount === amt
                      ? "bg-accent text-white border-accent shadow-xs"
                      : "border-black/10 dark:border-white/10 text-text-primary dark:text-text-primary-dark hover:border-accent"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <Input
              label="Or Custom Amount (INR)"
              type="number"
              value={rechargeAmount || ""}
              onChange={(e) => setRechargeAmount(Number(e.target.value))}
              placeholder="e.g. 750"
              leftIcon={<span className="font-bold text-xs">₹</span>}
            />

            <div className="pt-2">
              <Button
                variant="accent"
                fullWidth
                isLoading={isProcessing}
                onClick={handleSimulateRecharge}
                className="font-bold py-3"
              >
                Proceed to Recharge {formatCurrency(rechargeAmount || 0)}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="h-16 w-16 rounded-full bg-success/15 text-success mx-auto flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="font-bold text-lg text-text-primary dark:text-text-primary-dark">
              Wallet Recharged!
            </h3>
            <p className="text-xs text-text-muted dark:text-text-muted-dark">
              Successfully added {formatCurrency(rechargeAmount)} to your wallet.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
