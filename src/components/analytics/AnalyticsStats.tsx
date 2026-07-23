"use client";

interface Transaction {
  amount: number;
  type: string;
}

interface Props {
  transactions: Transaction[];
}

export default function AnalyticsStats({
  transactions,
}: Props) {
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((a, b) => a + b.amount, 0);

  const savings = income - expense;

  const savingsRate =
    income === 0
      ? 0
      : Math.round((savings / income) * 100);

  const cards = [
    {
      title: "Total Income",
      value: `₹${income.toLocaleString()}`,
      color: "text-green-600",
    },
    {
      title: "Total Expense",
      value: `₹${expense.toLocaleString()}`,
      color: "text-red-500",
    },
    {
      title: "Net Savings",
      value: `₹${savings.toLocaleString()}`,
      color: "text-blue-600",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate}%`,
      color: "text-violet-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border bg-card p-6"
        >
          <p className="text-sm text-muted-foreground">
            {card.title}
          </p>

          <h2
            className={`mt-2 text-3xl font-bold ${card.color}`}
          >
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}