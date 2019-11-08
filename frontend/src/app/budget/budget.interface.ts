export enum Action { Income = 'income', Expenses = 'expenses'}

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
