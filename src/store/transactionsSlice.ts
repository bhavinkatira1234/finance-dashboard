import { Transaction } from "@/lib/interface/transactionsInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionsState {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  typeFilter: string;
}

const initialState: TransactionsState = {
  transactions: [],
  filteredTransactions: [],
  typeFilter: "",
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.push(action.payload);
      state.filteredTransactions = state.transactions;
    },
    setFilter(state, action: PayloadAction<string>) {
      state.typeFilter = action.payload;
      if (action.payload === "all") {
        state.filteredTransactions = state.transactions;
      } else {
        state.filteredTransactions = state.transactions.filter((transaction) => transaction.category === action.payload);
      }
    },
    updateTransaction(state, action: PayloadAction<Transaction>) {
      const index = state.transactions.findIndex((transaction) => transaction.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
        state.filteredTransactions = state.transactions;
      }
    },
    deleteTransaction(state, action: PayloadAction<number>) {
      state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload);
      state.filteredTransactions = state.transactions.filter((transaction) => transaction.id !== action.payload);
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction, setFilter } = transactionsSlice.actions;

export default transactionsSlice.reducer;
