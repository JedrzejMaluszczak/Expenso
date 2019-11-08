import { Injectable } from '@angular/core';

import { ApiService } from '../core/api.service';
import { Balance } from './budget.interface';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(
    private api: ApiService,
  ) {

  }

  createBalanceRecord(balance: Balance) {
    this.api.balance.create(balance);
  }

}
