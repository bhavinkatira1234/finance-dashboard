import { TransactionsTable } from "@/components/dashboard/TransactionTable";
import { AddTransactionButton } from "@/components/dashboard/AddTransactionButton";

export default async function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <AddTransactionButton />
      </div>
      <TransactionsTable />
    </div>
  );
}
