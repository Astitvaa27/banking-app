"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface Transaction {
  amount: number;
  category: string;
  type: string;
}

interface Props {
  transactions: Transaction[];
}

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
];

export default function ExpensePieChart({
  transactions,
}: Props) {
  const expenses = transactions.filter(
    (t) => t.type === "Expense"
  );

  const grouped = expenses.reduce((acc, transaction) => {
    acc[transaction.category] =
      (acc[transaction.category] || 0) +
      transaction.amount;

    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(grouped).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Expense Breakdown
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[index % COLORS.length]
                }
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => [
              `₹${Number(value).toLocaleString()}`,
              "Amount",
            ]}
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}