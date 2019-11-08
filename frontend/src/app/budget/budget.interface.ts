export enum Action { Incomes = 'incomes', Expenses = 'expenses'}

export interface Category {
  id?: number;
  name: string;
  isIncome: boolean;
}

export interface Balance {
  id: number;
  date: Date;
  value: number;
  note?: string;
  category: number;
}

export interface BalanceSummary {
  incomes: Summary;
  expenses: Summary;
}

export interface Summary {
  today: number;
  monthly: number;
  total: number;
}
