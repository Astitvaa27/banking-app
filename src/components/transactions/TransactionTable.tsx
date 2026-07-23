  "use client";

  import useTransactions from "@/hooks/useTransactions";
  import TransactionStats from "./TransactionStats";
  import StatusBadge from "./StatusBadge";
  import TransactionTypeBadge from "./TransactionTypeBadge";
  import TransactionDetailsDialog from "./TransactionDetailsDialog";
  import PageSkeleton from "@/components/common/PageSkeleton";
  import ExportCSVButton from "./ExportCSVButton";

  interface Props {
    search?: string;
    type?: string;
    category?: string;
    status?: string;
  }

  export default function TransactionTable({
    search = "",
    type = "All",
    category = "All",
    status = "All",
  }: Props) {
    const { transactions, loading } = useTransactions();

    const filteredTransactions = transactions.filter((transaction) => {
      const matchesSearch =
        (transaction.category ?? "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (transaction.type ?? "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (transaction.fromAccount?.bankName ?? "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (transaction.toAccount?.bankName ?? "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        type === "All" || transaction.type === type;

      const matchesCategory =
        category === "All" ||
        transaction.category === category;

      const matchesStatus =
        status === "All" ||
        transaction.status === status;

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesStatus
      );
    });
    

    if (loading) {
      return <PageSkeleton />;
    }

    if (filteredTransactions.length === 0) {
      return (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <h3 className="text-lg font-semibold">
            No Transactions Found
          </h3>

          <p className="mt-2 text-muted-foreground">
            Add your first transaction to start tracking your finances.
          </p>
        </div>
      );
    }
    
    return (
    <>
      <TransactionStats
        transactions={filteredTransactions}
      />
      
      <div className="mb-4 flex justify-end">
        <ExportCSVButton
          transactions={filteredTransactions}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full">
          <thead className="border-b bg-muted">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Account</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr
                key={transaction._id}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <td className="p-3">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <TransactionTypeBadge type={transaction.type} />
                </td>

                <td className="p-3">
                  {transaction.category}
                </td>

                <td
                  className={`p-3 font-semibold ${
                    transaction.type === "Expense"
                      ? "text-red-500"
                      : transaction.type === "Income"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  {transaction.type === "Expense"
                    ? "-"
                    : transaction.type === "Income"
                    ? "+"
                    : ""}
                  ₹{transaction.amount.toLocaleString()}
                </td>

                <td className="p-3">
                  {transaction.type === "Income"
                    ? transaction.toAccount?.bankName
                    : transaction.type === "Expense"
                    ? transaction.fromAccount?.bankName
                    : `${transaction.fromAccount?.bankName} → ${transaction.toAccount?.bankName}`}
                </td>

                <td className="p-3">
                  <StatusBadge status={transaction.status} />
                </td>

                <td className="p-3 text-center">
                  <TransactionDetailsDialog
                    transaction={transaction}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
  }