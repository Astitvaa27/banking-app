"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AccountForm from "./AccountForm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function AddAccountDialog() {
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
          <Button>
            + Add Account
          </Button>
        }
      />

      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="border-b px-6 py-4">
            <DialogTitle>Add New Bank Account</DialogTitle>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto p-6">
            <AccountForm onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}