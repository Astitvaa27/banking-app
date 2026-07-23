"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Transaction {
  date: string;
  type: string;
  category: string;
  amount: number;
  status: string;
}

interface Props {
  transactions: Transaction[];
}

export default function ExportCSVButton({
  transactions,
}: Props) {
  function exportCSV() {
    const rows = [
      ["Date", "Type", "Category", "Amount", "Status"],
      ...transactions.map((t) => [
        new Date(t.date).toLocaleDateString(),
        t.type,
        t.category,
        t.amount,
        t.status,
      ]),
    ];

    const csv = rows
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "transactions.csv";

    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <Button onClick={exportCSV}>
      <Download className="mr-2 h-4 w-4" />
      Export CSV
    </Button>
  );
}