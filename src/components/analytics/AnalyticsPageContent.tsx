"use client";

import useTransactions from "@/hooks/useTransactions";

import AnalyticsStats from "./AnalyticsStats";
import MonthlyChart from "./MonthlyChart";
import ExpensePieChart from "./ExpensePieChart";
import TopSpendingCategories from "./TopSpendingCategories";
import RecentActivity from "./RecentActivity";
import PageSkeleton from "@/components/common/PageSkeleton";
import BudgetTracker from "./BudgetTracker";

export default function AnalyticsPageContent() {
  const { transactions, loading } =
    useTransactions();

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="text-muted-foreground">
          Financial insights and reports
        </p>
      </div>

      <AnalyticsStats
        transactions={transactions}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <MonthlyChart
            transactions={transactions}
        />

        <ExpensePieChart
            transactions={transactions}
        />
      </div>

      <TopSpendingCategories
            transactions={transactions}
      />

      <RecentActivity
        transactions={transactions}
      />

      <BudgetTracker
        transactions={transactions}
      />
    </div>
  );
}