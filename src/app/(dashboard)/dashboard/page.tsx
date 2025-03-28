import { DashboardOverview } from "@/components/dashboard/Overview";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { GoalsList } from "@/components/dashboard/GoalsList";
import { ExpensesByCategoryChart } from "@/components/dashboard/ExpenseByCategoryChart";
import { IncomeVsExpensesChart } from "@/components/dashboard/IncomeVsExpensesChart";

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DashboardOverview />
      <div className="grid gap-6 md:grid-cols-2">
        <ExpensesByCategoryChart />
        <IncomeVsExpensesChart />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <TransactionList />
        <GoalsList />
      </div>
    </div>
  );
}
