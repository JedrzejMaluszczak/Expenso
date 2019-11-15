import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import { FullBalance } from './budget.interface';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsResolverService implements Resolve<FullBalance> {
  constructor(private api: ApiService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<FullBalance> {
    return this.api.balance.list();
  }

}
