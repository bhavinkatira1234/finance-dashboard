import { Goal } from "@/lib/interface/goalInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionsState {
  savingsGoals: Goal[];
}

const initialState: TransactionsState = {
  savingsGoals: [],
};

const savingsGoalsSlice = createSlice({
  name: "savingsGoals",
  initialState,
  reducers: {
    addSavingsGoal(state, action: PayloadAction<Goal>) {
      state.savingsGoals.push(action.payload);
    },
    updateSavingsGoal(state, action: PayloadAction<Goal>) {
      const index = state.savingsGoals.findIndex((goal) => goal.id === action.payload.id);
      if (index !== -1) {
        state.savingsGoals[index] = action.payload;
      }
    },
    deleteSavingsGoal(state, action: PayloadAction<number>) {
      state.savingsGoals = state.savingsGoals.filter((goal) => goal.id !== action.payload);
    },
  },
});

export const { addSavingsGoal, updateSavingsGoal, deleteSavingsGoal } = savingsGoalsSlice.actions;

export default savingsGoalsSlice.reducer;
