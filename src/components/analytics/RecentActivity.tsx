"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowRightLeft,
} from "lucide-react";

interface Transaction {
  _id: string;
  amount: number;
  category: string;
  type: string;
  date: string;
}

interface Props {
  transactions: Transaction[];
}

export default function RecentActivity({
  transactions,
}: Props) {
  const recent = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 6);

  function getIcon(type: string) {
    switch (type) {
      case "Income":
        return (
          <ArrowDownLeft className="h-5 w-5 text-green-500" />
        );

      case "Expense":
        return (
          <ArrowUpRight className="h-5 w-5 text-red-500" />
        );

      default:
        return (
          <ArrowRightLeft className="h-5 w-5 text-blue-500" />
        );
    }
  }

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-5 text-xl font-semibold">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {recent.map((transaction) => (
          <div
            key={transaction._id}
            className="flex items-center justify-between border-b pb-3 last:border-none"
          >
            <div className="flex items-center gap-3">
              {getIcon(transaction.type)}

              <div>
                <p className="font-medium">
                  {transaction.category}
                </p>

                <p className="text-sm text-muted-foreground">
                  {new Date(
                    transaction.date
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            <span
              className={`font-semibold ${
                transaction.type === "Expense"
                  ? "text-red-500"
                  : transaction.type === "Income"
                  ? "text-green-600"
                  : "text-blue-500"
              }`}
            >
              {transaction.type === "Expense"
                ? "-"
                : transaction.type === "Income"
                ? "+"
                : ""}
              ₹{transaction.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}