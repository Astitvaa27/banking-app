"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { monthlyData } from "@/data/analytics";

export default function IncomeExpenseChart() {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-md">
      <h2 className="mb-6 text-xl font-bold text-foreground">
        Monthly Income vs Expenses
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#2563eb"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}