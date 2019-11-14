export enum Action { Incomes = 'incomes', Expenses = 'expenses'}

export interface Balance {
  id: number;
  date: Date;
  value: number;
  note?: string;
  category: number;
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
