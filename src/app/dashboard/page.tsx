import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsSection from "@/components/dashboard/StatsSection";
import BankCard from "@/components/dashboard/BankCard";
import ChartsSection from "@/components/dashboard/ChartsSection";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import AddTransactionDialog from "@/components/transactions/AddTransactionDialog";
import TransactionTable from "@/components/transactions/TransactionTable";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="mt-6 flex justify-end">
        <AddTransactionDialog />
      </div>

      <div className="mt-6">
        <StatsSection />
      </div>

      <div className="mt-8">
        <QuickActions />
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">
          Your Accounts
        </h2>

        <BankCard />
      </div>

      <div className="mt-8">
        <ChartsSection />
      </div>
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">
            Recent Transactions
        </h2>

        <TransactionTable />
      </section>

      
    </DashboardLayout>
  );
}