"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { formatCurrency, getCategoryDataByExpense } from "@/lib/utils";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { RootState } from "@/store";

export function ExpensesByCategoryChart() {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const categoryData = useMemo(() => getCategoryDataByExpense(transactions), [transactions]);
  const chartData = useMemo(() => {
    return categoryData.map((item) => ({
      name: item.category,
      value: Number(item.amount),
      color: item.color || `hsl(${Math.random() * 360}, 70%, 50%)`,
    }));
  }, [categoryData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={5}
                label={(entry) => `${entry.name} (${Math.round((entry.value / chartData.reduce((sum, item) => sum + item.value, 0)) * 100)}%)`}
                isAnimationActive={true}
                animationDuration={1500}
                stroke="#fff"
                strokeWidth={2}
              >
                {chartData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-white p-2 shadow-lg max-w-xs">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
                            <div>{payload[0].name}</div>
                          </div>
                          <div className="text-right font-medium text-gray-700">{formatCurrency(Number(payload[0].value))}</div>
                          <div className="text-right text-sm text-gray-500">
                            {`${Math.round((Number(payload[0].value) / chartData.reduce((sum, item) => sum + item.value, 0)) * 100)}%`}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend
                verticalAlign="bottom"
                align="center"
                iconSize={12}
                layout="horizontal"
                wrapperStyle={{
                  paddingTop: "10px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#333",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
