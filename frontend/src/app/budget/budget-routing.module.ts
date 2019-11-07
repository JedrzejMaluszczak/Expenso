import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetViewComponent } from './budget-view/budget-view.component';
import { NewBalanceRecordComponent } from './new-balance-record/new-balance-record.component';
import { Action } from './budget.interface';
import { AddBalanceRecordComponent } from './add-balance-record/add-balance-record.component';


const routes: Routes = [
  {
    path: '',
    component: BudgetViewComponent,
  },
  {
    path: 'expenses',
    component: AddBalanceRecordComponent,
    data: { action: Action.Expenses }
  },
  {
    path: 'income',
    component: AddBalanceRecordComponent,
    data: { action: Action.Income }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule {
}
