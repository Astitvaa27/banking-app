"use client";

interface Transaction {
  amount: number;
  type: string;
}

interface Props {
  transactions: Transaction[];
}

const MONTHLY_BUDGET = 25000;

export default function BudgetTracker({
  transactions,
}: Props) {
  const spent = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const remaining = MONTHLY_BUDGET - spent;

  const progress = Math.min(
    (spent / MONTHLY_BUDGET) * 100,
    100
  );

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="text-xl font-semibold">
        Monthly Budget
      </h2>

      <div className="mt-6 space-y-3">
        <div className="flex justify-between">
          <span>Budget</span>
          <span>₹{MONTHLY_BUDGET.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span>Spent</span>
          <span className="text-red-500">
            ₹{spent.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Remaining</span>

          <span
            className={
              remaining >= 0
                ? "text-green-600"
                : "text-red-500"
            }
          >
            ₹{remaining.toLocaleString()}
          </span>
        </div>

        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full transition-all ${
              progress >= 90
                ? "bg-red-500"
                : progress >= 75
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="text-sm text-muted-foreground">
          {progress.toFixed(0)}% of monthly budget used
        </p>
      </div>
    </div>
  );
}