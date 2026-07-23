"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Pencil } from "lucide-react";

import { Account } from "@/hooks/useAccounts";
import AccountForm from "./AccountForm";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  account: Account;
}

export default function EditAccountDialog({
  account,
}: Props) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  function handleSuccess() {
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        }
      />

      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>Edit Account</DialogTitle>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto p-6">
          <AccountForm
            mode="edit"
            accountId={account._id}
            initialData={{
                bankName: account.bankName,
                holder: account.holder,
                accountNumber: account.accountNumber,
                balance: account.balance,
                expiry: account.expiry,
                accountType: account.accountType,
                color: account.color,
            }}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}