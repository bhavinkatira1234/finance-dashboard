"use client";

import type React from "react";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { addSavingsGoal } from "@/store/savingsGoalsSlice";
import { generateFourDigitId } from "@/lib/utils";

export function AddGoalButton() {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: generateFourDigitId(),
    name: "",
    target_amount: 0,
    current_amount: 0,
    deadline: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(addSavingsGoal(formData));
    setFormData({
      id: generateFourDigitId(),
      name: "",
      target_amount: 0,
      current_amount: 0,
      deadline: "",
    });
    setIsLoading(false);
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(!openDialog);
    setFormData({
      id: generateFourDigitId(),
      name: "",
      target_amount: 0,
      current_amount: 0,
      deadline: "",
    });
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Savings Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Goal Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="New Car, Vacation, etc." required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_amount">Target Amount</Label>
            <Input
              id="target_amount"
              name="target_amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.target_amount || ""}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="current_amount">Current Amount (Optional)</Label>
            <Input id="current_amount" name="current_amount" type="number" step="0.01" min="0" value={formData.current_amount || ""} onChange={handleChange} placeholder="0.00" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input id="deadline" name="deadline" type="date" value={formData.deadline} onChange={handleChange} required />
          </div>

          <DialogFooter>
            <Button className="cursor-pointer" type="button" variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button className="cursor-pointer" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Goal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
