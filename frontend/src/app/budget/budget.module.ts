import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetViewComponent } from './budget-view/budget-view.component';
import { CoreModule } from '../core/core.module';
import { BalanceComponent } from './balance/balance.component';
import {
  AddBalanceDialogComponent
} from './add-balance-dialog/add-balance-dialog.component';


@NgModule({
  declarations: [
    BudgetViewComponent,
    BalanceComponent,
    AddBalanceDialogComponent,
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    CoreModule,
    ReactiveFormsModule,
  ],
  entryComponents: [AddBalanceDialogComponent]
})
export class BudgetModule {
}
