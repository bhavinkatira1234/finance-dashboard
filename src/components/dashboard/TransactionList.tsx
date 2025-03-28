"use client";

import Link from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function TransactionList() {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Link href="/transactions">
          <Button className="cursor-pointer" variant="ghost" size="sm">
            View all
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center text-muted-foreground">No transactions yet</div>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${transaction.type === "income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {transaction.type === "income" ? <ArrowUpIcon className="h-5 w-5" /> : <ArrowDownIcon className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={transaction.type === "income" ? "outline" : "secondary"}
                    className={transaction.type === "income" ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"}
                  >
                    {transaction.type}
                  </Badge>
                  <span className={`font-medium ${transaction.type === "income" ? "text-green-700" : "text-red-700"}`}>
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(Number(transaction.amount))}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
