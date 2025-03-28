export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

export interface IncomeVsExpensesChartProps {
  data: MonthlyData[];
}

export interface CategoryData {
  category: string;
  amount: number;
  color: string;
}

export interface ExpensesByCategoryChartProps {
  data: CategoryData[];
}
