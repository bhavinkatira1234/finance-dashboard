export interface Transaction {
  id: number;
  amount: string;
  type: string;
  category: string;
  date: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  type: string;
  color: string;
}

export interface TransactionsTableProps {
  transactions: Transaction[];
}

export interface AddTransactionButtonProps {
  categories: Category[];
}

export interface EditTransactionFormProps {
  transaction: Transaction;
  onUpdate: (transaction: Transaction) => void;
  onCancel: () => void;
}
