"use client";

import type React from "react";
import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatCurrency, formatDate } from "@/lib/utils";
import { EditTransactionForm } from "@/components/dashboard/EditTransactionForm";
import { Transaction } from "@/lib/interface/transactionsInterface";
import { categories } from "@/lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { deleteTransaction, updateTransaction, setFilter } from "@/store/transactionsSlice";

export function TransactionsTable() {
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.transactions.filteredTransactions);
  const globalTransactions = useSelector((state: RootState) => state.transactions.transactions);
  const typeFilter = useSelector((state: RootState) => state.transactions.typeFilter);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleTypeFilterChange = (value: string) => {
    dispatch(setFilter(value));
  };

  const handleDeleteTransaction = async () => {
    if (!selectedTransaction) return;
    dispatch(deleteTransaction(selectedTransaction.id));
  };

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    dispatch(updateTransaction(updatedTransaction));
    setEditDialogOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="space-y-4">
      {globalTransactions.length > 0 && (
        <div className="flex flex-col gap-4 md:flex-row">
          <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.key} value={category.label}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction: Transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={transaction.type === "income" ? "outline" : "secondary"}
                      className={transaction.type === "income" ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"}
                    >
                      <span className="flex items-center gap-1">
                        {transaction.type === "income" ? <ArrowUpIcon className="h-3 w-3" /> : <ArrowDownIcon className="h-3 w-3" />}
                        {transaction.type}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={transaction.type === "income" ? "text-green-700" : "text-red-700"}>
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(Number(transaction.amount))}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        className="text-green-500 cursor-pointer"
                        size="icon"
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setEditDialogOpen(true);
                        }}
                      >
                        <PencilIcon className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-red-500 cursor-pointer"
                        size="icon"
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete the transaction.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTransaction} className="cursor-pointer bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          {selectedTransaction && <EditTransactionForm transaction={selectedTransaction} onUpdate={handleUpdateTransaction} onCancel={() => setEditDialogOpen(false)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
