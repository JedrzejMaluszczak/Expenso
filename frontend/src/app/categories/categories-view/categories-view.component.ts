import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Action } from '../../budget/budget.interface';
import { CategoryBalance } from '../categories.interface';

@Component({
  selector: 'app-categories-view',
  templateUrl: './categories-view.component.html',
  styleUrls: ['./categories-view.component.scss']
})
export class CategoriesViewComponent implements OnInit {

  action = Action;
  incomeCategories: CategoryBalance[];
  expenseCategories: CategoryBalance[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.incomeCategories = this.route.snapshot.data.incomeCategories;
    this.expenseCategories = this.route.snapshot.data.expenseCategories;
  }

}
