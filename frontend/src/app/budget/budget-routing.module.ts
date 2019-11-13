import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetViewComponent } from './budget-view/budget-view.component';
import { BalanceSummaryResolverService } from './balance-summary.resolver.service';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    resolve: { balanceSummary: BalanceSummaryResolverService },
    component: BudgetViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule {
}
