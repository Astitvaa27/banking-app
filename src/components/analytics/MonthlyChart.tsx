"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface Transaction {
  amount: number;
  type: string;
  date: string;
}

interface Props {
  transactions: Transaction[];
}

export default function MonthlyChart({
  transactions,
}: Props) {
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  const data = months.map((month, index) => {
    const monthTransactions = transactions.filter(
      (t) => new Date(t.date).getMonth() === index
    );

    return {
      month,
      Income: monthTransactions
        .filter((t) => t.type === "Income")
        .reduce((sum, t) => sum + t.amount, 0),

      Expense: monthTransactions
        .filter((t) => t.type === "Expense")
        .reduce((sum, t) => sum + t.amount, 0),
    };
  });

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Monthly Income vs Expense
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="Income"
            fill="#22c55e"
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="Expense"
            fill="#ef4444"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}