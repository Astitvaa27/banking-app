"use client";

interface Props {
  type: string;
  setType: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;
}

export default function TransactionFilters({
  type,
  setType,
  category,
  setCategory,
  status,
  setStatus,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="rounded-xl border bg-background px-4 py-3"
      >
        <option value="All">All Types</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
        <option value="Transfer">Transfer</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-xl border bg-background px-4 py-3"
      >
        <option value="All">All Categories</option>
        <option value="Food">Food</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Travel">Travel</option>
        <option value="Salary">Salary</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Transfer">Transfer</option>
        <option value="Others">Others</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-xl border bg-background px-4 py-3"
      >
        <option value="All">All Status</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
        <option value="Failed">Failed</option>
      </select>
    </div>
  );
}