"use client";

import { useEffect, useState } from "react";
import BudgetForm from "./BudgetForm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Budget {
  _id: string;
  category: string;
  limit: number;
  month: number;
  year: number;
  spent: number;
  remaining: number;
  percentage: number;
}

export default function BudgetPageContent() {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const [open, setOpen] = useState(false);

  async function fetchBudgets() {
    const res = await fetch("/api/budgets");

    if (res.ok) {
      const data = await res.json();
      setBudgets(data);
    }
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Budgets
          </h1>

          <p className="text-muted-foreground">
            Manage your monthly budgets.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Budget
                </Button>
                }
            />

            <DialogContent>
                <DialogHeader>
                <DialogTitle>
                    Create Budget
                </DialogTitle>
                </DialogHeader>

                <BudgetForm
                onSuccess={() => {
                    setOpen(false);
                    fetchBudgets();
                }}
                />
            </DialogContent>
        </Dialog>
      </div>

      {budgets.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
            <h3 className="text-lg font-semibold">
                No Budgets Created
            </h3>

            <p className="mt-2 text-muted-foreground">
                Create a budget to start managing your spending.
            </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {budgets.map((budget) => (
            <div
              key={budget._id}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold">
                {budget.category}
              </h2>

              <p className="mt-2 text-muted-foreground">
                ₹{budget.limit.toLocaleString()}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {budget.month}/{budget.year}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}