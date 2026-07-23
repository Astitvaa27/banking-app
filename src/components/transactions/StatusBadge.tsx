"use client";

interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const styles = {
    Completed:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Pending:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Failed:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status as keyof typeof styles] ??
        "bg-muted text-muted-foreground"
      }`}
    >
      {status}
    </span>
  );
}