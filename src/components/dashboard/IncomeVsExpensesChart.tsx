"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from "recharts";

import { formatCurrency, getMonthlyData } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useMemo } from "react";

export function IncomeVsExpensesChart() {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false} tickMargin={10} />
              <Line dataKey="income" stroke="#16a34a" strokeWidth={2} activeDot={{ r: 6 }} />
              <Line dataKey="expenses" stroke="#dc2626" strokeWidth={2} activeDot={{ r: 6 }} />
              <Area dataKey="income" fill="#16a34a" fillOpacity={0.1} />
              <Area dataKey="expenses" fill="#dc2626" fillOpacity={0.1} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <div>Income</div>
                          </div>
                          <div className="text-right font-medium">{formatCurrency(payload[0].value)}</div>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-red-500" />
                            <div>Expenses</div>
                          </div>
                          <div className="text-right font-medium">{formatCurrency(payload[1].value)}</div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
