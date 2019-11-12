import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Action, BalanceSummary } from '../budget.interface';
import { BudgetService } from '../budget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-budget-view',
  templateUrl: './budget-view.component.html',
  styleUrls: ['./budget-view.component.scss']
})
export class BudgetViewComponent implements OnInit, OnDestroy {

  action = Action;
  summary: BalanceSummary;

  private subscription: Subscription;

  constructor(
    private budgetService: BudgetService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.summary = this.route.snapshot.data.balanceSummary;
    this.subscription = this.budgetService.balanceSummary$.subscribe(
      value => this.summary = value
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
