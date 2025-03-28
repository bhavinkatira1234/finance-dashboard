"use client";

import type React from "react";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/lib/constants";
import { useDispatch } from "react-redux";
import { addTransaction } from "@/store/transactionsSlice";
import { generateFourDigitId } from "@/lib/utils";

export function AddTransactionButton() {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: generateFourDigitId(),
    description: "",
    amount: "",
    type: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleCloseDialog = () => {
    setOpenDialog(!openDialog);
    setFormData({
      id: generateFourDigitId(),
      description: "",
      amount: "",
      type: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(addTransaction(formData));
    setFormData({
      id: generateFourDigitId(),
      description: "",
      amount: "",
      type: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
    setIsLoading(false);
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Groceries, Salary, etc." required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" name="amount" type="number" step="0.01" min="0" value={formData.amount} onChange={handleChange} placeholder="0.00" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.key} value={category.label}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
          </div>

          <DialogFooter>
            <Button type="button" className="cursor-pointer" variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
