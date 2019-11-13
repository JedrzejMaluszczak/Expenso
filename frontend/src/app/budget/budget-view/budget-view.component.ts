import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Action, AnnualBalance, BalanceSummary } from '../budget.interface';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-budget-view',
  templateUrl: './budget-view.component.html',
  styleUrls: ['./budget-view.component.scss']
})
export class BudgetViewComponent implements OnInit, OnDestroy {

  action = Action;
  summary: BalanceSummary;
  annualBalance: AnnualBalance;

  private subscription: Subscription;

  constructor(
    private budgetService: BudgetService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.summary = this.route.snapshot.data.balanceSummary;
    this.annualBalance = this.route.snapshot.data.annualBalance;


    this.subscription = this.budgetService.balanceSummary$.subscribe(
      value => this.summary = value
    );
    this.subscription.add(this.budgetService.annualBalance$.subscribe(
      value => this.annualBalance = value
    ))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
