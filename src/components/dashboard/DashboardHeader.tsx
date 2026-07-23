"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import AddAccountDialog from "@/components/accounts/AddAccountDialog";

export default function DashboardHeader() {
  const user = useCurrentUser();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-5xl font-bold">
          Welcome back,
          <span className="text-blue-500">
            {" "}
            {user?.name || "User"}
          </span>{" "}
          👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          Here's your financial overview.
        </p>
      </div>

      <AddAccountDialog />
    </div>
  );
}