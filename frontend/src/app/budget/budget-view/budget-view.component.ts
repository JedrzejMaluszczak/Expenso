import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Action, BalanceSummary } from '../budget.interface';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-budget-view',
  templateUrl: './budget-view.component.html',
  styleUrls: ['./budget-view.component.scss']
})
export class BudgetViewComponent implements OnInit {

  action = Action;
  summary: BalanceSummary;

  constructor(
    private budgetService: BudgetService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.summary = this.route.snapshot.data.balanceSummary;
    this.budgetService.balanceSummary$.subscribe(
      value => this.summary = value
    );
  }

}
