"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Navbar() {
  const user = useCurrentUser();
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">

      <Logo />

      <div className="flex items-center gap-4">

        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search transactions..."
            className="w-80 pl-10"
          />
        </div>

        <ThemeToggle /> 

        <Link
          href="/dashboard/notifications"
          className="relative rounded-full p-2 transition hover:bg-accent"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold">
              {user?.name || "Loading..."}
            </p>

            <p className="text-xs text-muted-foreground">
              {user?.email}
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 font-semibold text-white shadow-lg">
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
        </div>

      </div>
    </header>
  );
}