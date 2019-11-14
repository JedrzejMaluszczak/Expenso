import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { MatDialog } from '@angular/material';

import { Chart } from 'chart.js';

import { Action, AnnualBalance } from '../budget.interface';
import { AddBalanceDialogComponent } from '../add-balance-dialog/add-balance-dialog.component';
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
export class BalanceComponent implements AfterViewInit, OnChanges {
  @Input() action: Action;
  @Input() total: number;
  @Input() monthly: number;
  @Input() today: number;
  chart = [];

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private budgetService: BudgetService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  private _annualBalance;

  get annualBalance() {
    return this._annualBalance;
  }

  @Input() set annualBalance(annualBalance: AnnualBalance) {
    this._annualBalance = annualBalance;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.annualBalance && !changes.annualBalance.firstChange) {
      this.generateChart();
    }
  }

  ngAfterViewInit(): void {
    this.generateChart()
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


  generateChart() {
    this.chart = new Chart('chart-' + this.action, {
      type: 'bar',
      data: {
        labels: this.annualBalance.months,
        datasets: [
          {
            data: this.annualBalance[this.action],
            backgroundColor: '#3f51b5',
            fill: true,
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

    this.cdr.detectChanges();
  }
}
