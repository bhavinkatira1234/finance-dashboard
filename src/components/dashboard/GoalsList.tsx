"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, formatDate } from "@/lib/utils";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export function GoalsList() {
  const goals = useSelector((state: RootState) => state.savingsGoals.savingsGoals);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Savings Goals</CardTitle>
        <Link href="/savings-goals">
          <Button className="cursor-pointer" variant="ghost" size="sm">
            View all
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.length === 0 ? (
            <div className="text-center text-muted-foreground">No savings goals yet</div>
          ) : (
            goals.map((goal) => {
              const progress = Math.min(Math.round((goal.current_amount / goal.target_amount) * 100), 100);

              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium leading-none">{goal.name}</p>
                      <p className="text-sm text-muted-foreground">Due {formatDate(goal.deadline)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {formatCurrency(goal.current_amount)} / {formatCurrency(goal.target_amount)}
                      </p>
                      <p className="text-sm text-muted-foreground">{progress}%</p>
                    </div>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
