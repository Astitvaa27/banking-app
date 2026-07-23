"use client";

import { useCallback, useEffect, useState } from "react";

export interface Transaction {
  _id: string;

  fromAccount?: {
    _id: string;
    bankName: string;
  } | null;

  toAccount?: {
    _id: string;
    bankName: string;
  } | null;

  type: "Income" | "Expense" | "Transfer";

  amount: number;

  category:
    | "Food"
    | "Shopping"
    | "Travel"
    | "Bills"
    | "Salary"
    | "Investment"
    | "Entertainment"
    | "Healthcare"
    | "Other";

  description: string;

  status: "Completed" | "Pending" | "Failed";

  date: string;
}

export default function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/transactions");

      if (!res.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await res.json();

      setTransactions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    loading,
    refresh: fetchTransactions,
  };
}