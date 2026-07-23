"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BudgetFormProps {
  onSuccess: () => void;
}

const categories = [
  "Food",
  "Shopping",
  "Travel",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Others",
];

export default function BudgetForm({ onSuccess }: BudgetFormProps) {
  const [category, setCategory] = useState("Food");
  const [limit, setLimit] = useState("");

  const today = new Date();

  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  async function createBudget() {
    if (!limit || Number(limit) <= 0) {
      toast.error("Enter a valid budget.");
      return;
    }

    const res = await fetch("/api/budgets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        limit: Number(limit),
        month,
        year,
      }),
    });

    if (res.ok) {
      toast.success("Budget created successfully.");
      onSuccess();
    } else {
      toast.error("Failed to create budget.");
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border bg-background px-3 py-2"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Monthly Limit
        </label>

        <Input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          placeholder="10000"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Month
          </label>

          <Input
            type="number"
            min={1}
            max={12}
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Year
          </label>

          <Input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </div>
      </div>

      <Button
        className="w-full"
        onClick={createBudget}
      >
        Create Budget
      </Button>
    </div>
  );
}