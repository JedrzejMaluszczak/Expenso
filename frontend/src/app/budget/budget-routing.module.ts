import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetViewComponent } from './budget-view/budget-view.component';
import { BalanceSummaryResolverService } from './balance-summary.resolver.service';
import { AnnualBalanceResolverService } from './annual-balance.resolver.service';
import { TransactionsResolverService } from './transactions.resolver.service';
import { TransactionsViewComponent } from './transactions-view/transactions-view.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    resolve: {
      balanceSummary: BalanceSummaryResolverService,
      annualBalance: AnnualBalanceResolverService,
    },
    component: BudgetViewComponent,
  },
  {
    path: 'transactions',
    resolve: { transactions: TransactionsResolverService },
    component: TransactionsViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule {
}
