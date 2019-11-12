import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Action, Summary } from '../budget.interface';
import {
  AddBalanceDialogComponent
} from '../add-balance-dialog/add-balance-dialog.component';
import { ApiService } from '../../core/api.service';
import { BudgetService } from '../budget.service';
import { Category } from '../../categories/categories.interface';

export interface DialogData {
  categories: Category[];
  action: Action;
}

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  @Input() action: Action;

  @Input() summary: Summary;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private budgetService: BudgetService,
  ) {
  }

  ngOnInit() {
  }

  async openDialog() {
    const categories = await this.api.category.list(
      this.action === Action.Incomes
    );
    const dialogRef = this.dialog.open(AddBalanceDialogComponent, {
      width: '300px',
      data: {
        categories: categories,
        action: this.action,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.budgetService.createBalanceRecord(result)
      }
    });
  }
}
