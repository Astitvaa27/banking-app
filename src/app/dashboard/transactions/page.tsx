import DashboardLayout from "@/components/layout/DashboardLayout";
import TransactionsPageContent from "@/components/transactions/TransactionsPageContent";

export default function TransactionsPage() {
  return (
    <DashboardLayout>
      <TransactionsPageContent />
    </DashboardLayout>
  );
}