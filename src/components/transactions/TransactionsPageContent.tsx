"use client";

import { useState } from "react";

import AddTransactionDialog from "./AddTransactionDialog";
import TransactionTable from "./TransactionTable";
import TransactionSearch from "./TransactionSearch";
import TransactionFilters from "./TransactionFilters";

export default function TransactionsPageContent() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Transactions
          </h1>

          <p className="text-muted-foreground">
            Manage all your financial transactions.
          </p>
        </div>

        <AddTransactionDialog />

      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <TransactionSearch
          value={search}
          onChange={setSearch}
        />

        <TransactionFilters
            type={type}
            setType={setType}
            category={category}
            setCategory={setCategory}
            status={status}
            setStatus={setStatus}
        />
      </div>

      <TransactionTable
        search={search}
        type={type}
        category={category}
        status={status}
      />

    </div>
  );
}