"use client";

import { useState } from "react";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
import { EditGoalForm } from "@/components/dashboard/EditGoalForm";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Goal } from "@/lib/interface/goalInterface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { deleteSavingsGoal, updateSavingsGoal } from "@/store/savingsGoalsSlice";

export function GoalsGrid() {
  const dispatch = useDispatch();
  const savingsGoals = useSelector((state: RootState) => state.savingsGoals.savingsGoals);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const handleDeleteGoal = async () => {
    if (!selectedGoal) return;
    dispatch(deleteSavingsGoal(selectedGoal.id));
  };

  const handleUpdateGoal = (updatedGoal: Goal) => {
    dispatch(updateSavingsGoal(updatedGoal));
    setEditDialogOpen(false);
    setSelectedGoal(null);
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {savingsGoals.length === 0 ? (
        <div className="col-span-full text-center text-muted-foreground">No savings goals yet.</div>
      ) : (
        savingsGoals.map((goal) => {
          const progress = Math.round((goal.current_amount / goal.target_amount) * 100);

          return (
            <Card key={goal.id}>
              <CardHeader>
                <CardTitle>{goal.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Current</span>
                    <span className="text-sm font-medium">{formatCurrency(goal.current_amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Target</span>
                    <span className="text-sm font-medium">{formatCurrency(goal.target_amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Deadline</span>
                    <span className="text-sm font-medium">{formatDate(goal.deadline)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedGoal(goal);
                    setEditDialogOpen(true);
                  }}
                >
                  <PencilIcon className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedGoal(goal);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <TrashIcon className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          );
        })
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete the savings goal.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteGoal} className="cursor-pointer bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Savings Goal</DialogTitle>
          </DialogHeader>
          {selectedGoal && <EditGoalForm goal={selectedGoal} onUpdate={handleUpdateGoal} onCancel={() => setEditDialogOpen(false)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
