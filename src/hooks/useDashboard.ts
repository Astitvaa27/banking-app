"use client";

import useAccounts from "./useAccounts";

export default function useDashboard() {
  const { accounts, loading } = useAccounts();

  const totalBalance = accounts.reduce(
    (sum, acc) => sum + acc.balance,
    0
  );

  return {
    accounts,
    loading,
    totalBalance,
    totalAccounts: accounts.length,
  };
}