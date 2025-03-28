import { GoalsGrid } from "@/components/dashboard/GoalsGrid";
import { AddGoalButton } from "@/components/dashboard/AddGoalButton";

export default async function SavingsGoalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Savings Goals</h1>
        <AddGoalButton />
      </div>
      <GoalsGrid />
    </div>
  );
}
