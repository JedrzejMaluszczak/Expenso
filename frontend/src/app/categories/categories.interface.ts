export interface Category {
  id?: number;
  name: string;
  isIncome: boolean;
}

export interface CategoryBalance {
  id?: number;
  name: string;
  categoryBalance: number;
}
