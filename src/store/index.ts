import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactionsSlice";
import savingsGoalsReducer from "./savingsGoalsSlice";

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    savingsGoals: savingsGoalsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
