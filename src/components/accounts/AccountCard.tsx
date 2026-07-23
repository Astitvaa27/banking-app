"use client";

import { CreditCard, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Account } from "@/hooks/useAccounts";
import AccountDetailsDialog from "./AccountDetailsDialog";
import EditAccountDialog from "./EditAccountDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";

interface Props {
  account: Account;
}

export default function AccountCard({ account }: Props) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-primary/10 p-3">
          <CreditCard className="h-6 w-6 text-primary" />
        </div>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {account.accountType}
        </span>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">
          {account.bankName}
        </h2>

        <p className="text-sm text-muted-foreground">
          {account.holder}
        </p>
      </div>

      <div className="mt-6">
        <p className="text-3xl font-bold">
          ₹{account.balance.toLocaleString()}
        </p>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        **** {account.accountNumber.slice(-4)}
      </div>

      <div className="mt-6 flex gap-2">
        <AccountDetailsDialog account={account} />

        <EditAccountDialog account={account} />

        <DeleteAccountDialog account={account} />
      </div>
    </div>
  );
}