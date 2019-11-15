import { Category } from '../categories/categories.interface';

export enum Action { Incomes = 'incomes', Expenses = 'expenses'}

export interface Balance {
  id: number;
  date: Date;
  amount: number;
  note?: string;
}

export interface SimplyBalance extends Balance {
  category: number;
}

export interface FullBalance extends Balance {
  category: Category;
}

export interface BalanceSummary {
  incomeTotal: number;
  incomeMonthly: number;
  incomeToday: number;
  expensesTotal: number;
  expensesMonthly: number;
  expensesToday: number;
}

export interface AnnualBalance {
  months: string[];
  incomes: number[];
  expenses: number[];
}
