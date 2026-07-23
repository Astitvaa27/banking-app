"use client";

interface Transaction {
  amount: number;
  category: string;
  type: string;
}

interface Props {
  transactions: Transaction[];
}

export default function TopSpendingCategories({
  transactions,
}: Props) {
  const expenses = transactions.filter(
    (t) => t.type === "Expense"
  );

  const grouped = expenses.reduce((acc, t) => {
    acc[t.category] =
      (acc[t.category] || 0) + t.amount;

    return acc;
  }, {} as Record<string, number>);

  const ranking = Object.entries(grouped)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-5 text-xl font-semibold">
        Top Spending Categories
      </h2>

      <div className="space-y-4">
        {ranking.length === 0 ? (
          <p className="text-muted-foreground">
            No expense data available.
          </p>
        ) : (
          ranking.map(([category, amount], index) => (
            <div
              key={category}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {index + 1}
                </div>

                <span className="font-medium">
                  {category}
                </span>
              </div>

              <span className="font-bold text-red-500">
                ₹{amount.toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}