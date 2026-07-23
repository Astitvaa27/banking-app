import IncomeExpenseChart from "../charts/IncomeExpenseChart";
import ExpensePieChart from "../charts/ExpensePieChart";

export default function ChartsSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-12">

      <div className="lg:col-span-8">
        <IncomeExpenseChart />
      </div>

      <div className="lg:col-span-4">
        <ExpensePieChart />
      </div>

    </div>
  );
}