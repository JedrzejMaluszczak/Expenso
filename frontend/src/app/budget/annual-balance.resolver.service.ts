import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import { AnnualBalance } from './budget.interface';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class AnnualBalanceResolverService implements Resolve<AnnualBalance> {
  constructor(
    private api: ApiService,
  ) {
  }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<AnnualBalance> {
    try {
      return await this.api.balance.annualBalance()
    } catch (e) {
      return null;
    }
  }

}
