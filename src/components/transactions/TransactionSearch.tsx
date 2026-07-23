"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TransactionSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative w-full md:max-w-md">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={18}
      />

      <input
        type="text"
        placeholder="Search transactions..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border bg-background py-3 pl-10 pr-4 outline-none"
      />
    </div>
  );
}