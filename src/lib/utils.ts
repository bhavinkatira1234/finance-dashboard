import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Transaction } from "./interface/transactionsInterface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export const generateFourDigitId = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

export function getCategoryDataByExpense(transactions: Transaction[]) {
  const expenseTransactions = transactions.filter((transaction) => transaction.type === "expense");
  const categoryMap: { [category: string]: number } = {};
  expenseTransactions.forEach((transaction) => {
    const category = transaction.category;
    const amount = parseFloat(transaction.amount);
    if (!categoryMap[category]) {
      categoryMap[category] = amount;
    } else {
      categoryMap[category] += amount;
    }
  });

  const colors: { [category: string]: string } = {
    Food: "#FF6384",
    Travel: "#36A2EB",
    IT: "#FFCE56",
  };

  const categoryData = Object.keys(categoryMap).map((category) => ({
    category,
    color: colors[category] || "#" + Math.floor(Math.random() * 16777215).toString(16),
    amount: categoryMap[category].toString(),
  }));

  return categoryData;
}

function getMonthName(dateStr: string) {
  const date = new Date(dateStr);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return monthNames[date.getMonth()];
}

export function getMonthlyData(transactions: Transaction[]) {
  const monthlyData: { month: string; income: number; expenses: number }[] = [];

  transactions.forEach((transaction) => {
    const month = getMonthName(transaction.date);
    const amount = parseFloat(transaction.amount);

    let monthData = monthlyData.find((item) => item.month === month);

    if (!monthData) {
      monthData = { month, income: 0, expenses: 0 };
      monthlyData.push(monthData);
    }

    if (transaction.type === "income") {
      monthData.income += amount;
    } else if (transaction.type === "expense") {
      monthData.expenses += amount;
    }
  });
  return monthlyData;
}
