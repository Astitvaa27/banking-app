"use client";

import { Bell } from "lucide-react";

interface Props {
  title: string;
  message: string;
  time: string;
}

export default function NotificationCard({
  title,
  message,
  time,
}: Props) {
  return (
    <div className="flex items-start gap-4 rounded-xl border bg-card p-4">
      <div className="rounded-full bg-primary/10 p-2">
        <Bell className="h-5 w-5 text-primary" />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground">
          {message}
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          {time}
        </p>
      </div>
    </div>
  );
}