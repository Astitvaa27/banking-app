"use client";

interface Transaction {
  amount: number;
  type: string;
}

interface Props {
  transactions: Transaction[];
}

export default function TransactionStats({
  transactions,
}: Props) {
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const transfer = transactions
    .filter((t) => t.type === "Transfer")
    .reduce((sum, t) => sum + t.amount, 0);

  const stats = [
    {
      title: "Income",
      value: income,
      color: "text-green-600",
    },
    {
      title: "Expenses",
      value: expense,
      color: "text-red-500",
    },
    {
      title: "Transfers",
      value: transfer,
      color: "text-blue-600",
    },
    {
      title: "Transactions",
      value: transactions.length,
      color: "text-primary",
      count: true,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-xl border bg-card p-6"
        >
          <p className="text-sm text-muted-foreground">
            {stat.title}
          </p>

          <h2
            className={`mt-2 text-3xl font-bold ${stat.color}`}
          >
            {stat.count
              ? stat.value
              : `₹${Number(stat.value).toLocaleString()}`}
          </h2>
        </div>
      ))}
    </div>
  );
}