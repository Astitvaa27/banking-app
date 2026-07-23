"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Props {
  transaction: any;
}

export default function TransactionDetailsDialog({
  transaction,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            View
          </Button>
        }
      />

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Transaction Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Detail
            label="Type"
            value={transaction.type}
          />

          <Detail
            label="Amount"
            value={`₹${transaction.amount.toLocaleString()}`}
          />

          <Detail
            label="Category"
            value={transaction.category}
          />

          <Detail
            label="Status"
            value={transaction.status}
          />

          <Detail
            label="Date"
            value={new Date(transaction.date).toLocaleDateString()}
          />

          <Detail
            label="From Account"
            value={transaction.fromAccount?.bankName ?? "-"}
          />

          <Detail
            label="To Account"
            value={transaction.toAccount?.bankName ?? "-"}
          />

        </div>
      </DialogContent>
    </Dialog>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-muted-foreground">
        {label}
      </span>

      <span className="font-medium">
        {value}
      </span>
    </div>  
  );
}