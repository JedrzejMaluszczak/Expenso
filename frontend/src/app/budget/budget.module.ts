import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetViewComponent } from './budget-view/budget-view.component';
import { CoreModule } from '../core/core.module';
import { BalanceComponent } from './balance/balance.component';
import { NewBalanceRecordComponent } from './new-balance-record/new-balance-record.component';
import { AddBalanceRecordComponent } from './add-balance-record/add-balance-record.component';


@NgModule({
  declarations: [
    BudgetViewComponent,
    BalanceComponent,
    AddBalanceRecordComponent,
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    CoreModule,
  ]
})
export class BudgetModule {
}
