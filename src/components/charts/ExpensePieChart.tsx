"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Food", value: 620 },
  { name: "Shopping", value: 2499 },
  { name: "Bills", value: 1750 },
];

const COLORS = [
  "#2563eb",
  "#8b5cf6",
  "#ef4444",
];

export default function ExpensePieChart() {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-md">
      <h2 className="mb-6 text-xl font-bold text-foreground">
        Expense Breakdown
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={110}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}