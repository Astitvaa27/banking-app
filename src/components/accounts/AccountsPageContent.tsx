"use client";

import { useState } from "react";
import useAccounts from "@/hooks/useAccounts";
import AddAccountDialog from "@/components/accounts/AddAccountDialog";
import AccountCard from "./AccountCard";
import PageSkeleton from "@/components/common/PageSkeleton";

export default function AccountsPageContent() {
  const { accounts, loading } = useAccounts();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredAccounts = [...accounts]
  .filter(
    (account) =>
      account.bankName.toLowerCase().includes(search.toLowerCase()) ||
      account.holder.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    switch (sortBy) {
      case "highest":
        return b.balance - a.balance;

      case "lowest":
        return a.balance - b.balance;

      case "name":
        return a.bankName.localeCompare(b.bankName);

      case "newest":
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-muted-foreground">
            Manage all your bank accounts.
          </p>
        </div>

        <AddAccountDialog />
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search accounts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border bg-background px-4 py-3 outline-none"
      />
      <div className="flex justify-end">
        <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border bg-background px-4 py-2"
        >
            <option value="newest">Recently Added</option>
            <option value="highest">Highest Balance</option>
            <option value="lowest">Lowest Balance</option>
            <option value="name">Bank Name (A-Z)</option>
        </select>
      </div>

      {/* Accounts */}
      {loading ? (
        <PageSkeleton />
      ) : filteredAccounts.length === 0 ? (
        <div className="col-span-full rounded-xl border border-dashed p-10 text-center">
          <h3 className="text-lg font-semibold">
            No Accounts Found
          </h3>

          <p className="mt-2 text-muted-foreground">
            Create your first bank account to start managing your finances.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredAccounts.map((account) => (
            <AccountCard
              key={account._id}
              account={account}
            />
          ))}
        </div>
      )}
    </div>
  );
}