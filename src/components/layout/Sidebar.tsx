"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/common/Logo";


import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  BarChart3,
  Settings,
  Bell,
} from "lucide-react";



const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Accounts",
    href: "/dashboard/accounts",
    icon: Wallet,
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: ArrowLeftRight,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Budgets",
    href: "/dashboard/budgets",
    icon: Wallet,
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72 bg-card md:flex md:flex-col">
      <div className="border-b border-border p-6">
        <Logo />
      </div>

      <nav className="mt-6 flex flex-col gap-2 px-4">
        {menu.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
                active
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}