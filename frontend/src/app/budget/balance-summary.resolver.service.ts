import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import { BalanceSummary } from './budget.interface';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class BalanceSummaryResolverService implements Resolve<BalanceSummary> {
  constructor(private api: ApiService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<BalanceSummary> {
    return this.api.balance.summary();
  }

}
