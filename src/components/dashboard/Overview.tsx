"use client";

import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export function DashboardOverview() {
  const transactions = useSelector((state: RootState) => state.transactions);
  const totalIncome = transactions.transactions.reduce((total, transaction) => (transaction.type === "income" ? total + Number(transaction.amount) : total), 0);
  const totalExpense = transactions.transactions.reduce((total, transaction) => (transaction.type === "expense" ? total + Number(transaction.amount) : total), 0);
  const currentBalance = totalIncome - totalExpense;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
          <p className="text-xs text-muted-foreground">Updated just now</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalExpense)}</div>
          <p className="text-xs text-muted-foreground">Updated just now</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(currentBalance)}</div>
          <p className="text-xs text-muted-foreground">Updated just now</p>
        </CardContent>
      </Card>
    </div>
  );
}
