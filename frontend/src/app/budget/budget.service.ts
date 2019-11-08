import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { ApiService } from '../core/api.service';
import { Balance, BalanceSummary } from './budget.interface';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private _balanaceSummary = new Subject<BalanceSummary>();
  balanceSummary$ = this._balanaceSummary.asObservable();

  constructor(
    private api: ApiService,
  ) {
  }

  async createBalanceRecord(balance: Balance) {
    this.api.balance.create(balance);
    const balanceSummary = await this.api.balance.summary();
    this._balanaceSummary.next(balanceSummary);
  }

}
