import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { ApiService } from '../core/api.service';
import {
  AnnualBalance,
  SimplyBalance,
  BalanceSummary
} from './budget.interface';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private _balanaceSummary = new Subject<BalanceSummary>();
  balanceSummary$ = this._balanaceSummary.asObservable();
  private _annualBalance = new Subject<AnnualBalance>();
  annualBalance$ = this._annualBalance.asObservable();

  constructor(
    private api: ApiService,
  ) {
  }

  async createBalanceRecord(balance: SimplyBalance) {
    this.api.balance.create(balance);
    const balanceSummary = await this.api.balance.summary();
    this._balanaceSummary.next(balanceSummary);
    const annualBalance = await this.api.balance.annualBalance();
    this._annualBalance.next(annualBalance)
  }

}
