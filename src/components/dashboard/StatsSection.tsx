"use client";

import StatsCard from "./StatsCard";
import {
  Wallet,
  CreditCard,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import useDashboard from "@/hooks/useDashboard";

export default function StatsSection() {
  const {
    loading,
    totalBalance,
    totalAccounts,
  } = useDashboard();

  // Temporary values until we build the Transactions module
  const totalIncome = 45000;
  const totalExpenses = 12500;

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-2xl bg-muted"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <StatsCard
        title="Total Balance"
        value={`₹${totalBalance.toLocaleString()}`}
        icon={Wallet}
        color="bg-blue-600"
      />

      <StatsCard
        title="Accounts"
        value={totalAccounts.toString()}
        icon={CreditCard}
        color="bg-violet-600"
      />

      <StatsCard
        title="Income"
        value={`₹${totalIncome.toLocaleString()}`}
        icon={TrendingUp}
        color="bg-green-600"
      />

      <StatsCard
        title="Expenses"
        value={`₹${totalExpenses.toLocaleString()}`}
        icon={TrendingDown}
        color="bg-red-500"
      />
    </div>
  );
}