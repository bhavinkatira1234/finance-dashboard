"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Goal } from "@/lib/interface/goalInterface";

interface EditGoalFormProps {
  goal: Goal;
  onUpdate: (goal: Goal) => void;
  onCancel: () => void;
}

export function EditGoalForm({ goal, onUpdate, onCancel }: EditGoalFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: goal.id,
    name: goal.name,
    target_amount: goal.target_amount,
    current_amount: goal.current_amount,
    deadline: goal.deadline.split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onUpdate(formData);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Goal Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="target_amount">Target Amount</Label>
        <Input id="target_amount" name="target_amount" type="number" step="0.01" min="0" value={formData.target_amount} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="current_amount">Current Amount</Label>
        <Input id="current_amount" name="current_amount" type="number" step="0.01" min="0" value={formData.current_amount} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">Deadline</Label>
        <Input id="deadline" name="deadline" type="date" value={formData.deadline} onChange={handleChange} required />
      </div>

      <DialogFooter>
        <Button className="cursor-pointer" type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="cursor-pointer" type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Goal"}
        </Button>
      </DialogFooter>
    </form>
  );
}
