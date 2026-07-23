"use client";

import Link from "next/link";
import {
  CreditCard,
  ArrowLeftRight,
  BarChart3,
  Wallet,
} from "lucide-react";

const actions = [
  {
    title: "Add Account",
    href: "/dashboard/accounts",
    icon: CreditCard,
  },
  {
    title: "Add Transaction",
    href: "/dashboard/transactions",
    icon: ArrowLeftRight,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Budgets",
    href: "/dashboard/budgets",
    icon: Wallet,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="flex flex-col items-center justify-center rounded-xl border p-5 transition hover:bg-accent hover:shadow-md"
            >
              <Icon className="mb-3 h-8 w-8 text-primary" />

              <span className="text-sm font-medium">
                {action.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}