"use client";

import { Account } from "@/hooks/useAccounts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Eye } from "lucide-react";

interface Props {
  account: Account;
}

export default function AccountDetailsDialog({
  account,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" className="flex-1">
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
        }
      />

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {account.bankName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">

          <div>
            <p className="text-sm text-muted-foreground">
              Holder
            </p>

            <p className="font-semibold">
              {account.holder}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Account Type
            </p>

            <p className="font-semibold">
              {account.accountType}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Account Number
            </p>

            <p className="font-semibold">
              **** {account.accountNumber.slice(-4)}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Balance
            </p>

            <p className="text-3xl font-bold text-primary">
              ₹{account.balance.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Expiry
            </p>

            <p className="font-semibold">
              {account.expiry}
            </p>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}