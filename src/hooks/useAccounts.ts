"use client";

import { useEffect, useState } from "react";

export interface Account {
  _id: string;
  bankName: string;
  holder: string;
  accountNumber: string;
  balance: number;

  accountType: "Savings" | "Current" | "Salary";

  expiry: string;
  color: string;
}

export default function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchAccounts() {
    try {
      const res = await fetch("/api/accounts");

      if (!res.ok) {
        throw new Error("Failed to fetch accounts");
      }

      const data = await res.json();

      setAccounts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  return {
    accounts,
    loading,
    refresh: fetchAccounts,
  };
}