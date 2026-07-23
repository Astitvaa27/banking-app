"use client";

import NotificationCard from "./NotificationCard";

const notifications = [
  {
    title: "Salary Credited",
    message: "₹50,000 has been credited to your account.",
    time: "2 hours ago",
  },
  {
    title: "Large Expense",
    message: "Shopping transaction of ₹5,200 detected.",
    time: "Yesterday",
  },
  {
    title: "Transfer Completed",
    message: "₹10,000 transferred successfully.",
    time: "3 days ago",
  },
];

export default function NotificationsPageContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Notifications
        </h1>

        <p className="text-muted-foreground">
          Recent account activity
        </p>
      </div>

      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <NotificationCard
            key={index}
            {...notification}
          />
        ))}
      </div>
      <div className="rounded-xl border border-dashed p-10 text-center">
        <h3 className="text-lg font-semibold">
          No Notifications
        </h3>

        <p className="mt-2 text-muted-foreground">
          You're all caught up.
        </p>
      </div>
    </div>
  );
}