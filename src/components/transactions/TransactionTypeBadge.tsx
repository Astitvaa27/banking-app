"use client";

interface Props {
  type: string;
}

export default function TransactionTypeBadge({ type }: Props) {
  const styles = {
    Income:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Expense:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Transfer:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[type as keyof typeof styles] ??
        "bg-muted text-muted-foreground"
      }`}
    >
      {type}
    </span>
  );
}