"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Trash2 } from "lucide-react";

import { Account } from "@/hooks/useAccounts";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  account: Account;
}

export default function DeleteAccountDialog({
  account,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function deleteAccount() {
    try {
      setLoading(true);

      const res = await fetch(`/api/accounts/${account._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      toast.success("Account deleted successfully.");

      setOpen(false);

      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="destructive"
            size="icon"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete Account?
          </DialogTitle>
        </DialogHeader>
        <DialogHeader>
        <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold">
              {account.bankName}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={deleteAccount}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}