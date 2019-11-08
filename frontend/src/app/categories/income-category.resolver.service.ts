import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import { ApiService } from '../core/api.service';
import { CategoryBalance } from './categories.interface';

@Injectable({
  providedIn: 'root',
})
export class IncomeCategoryResolverService implements Resolve<CategoryBalance[]> {
  constructor(private api: ApiService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<CategoryBalance[]> {
    return this.api.category.listWithBalance(true);
  }

}
