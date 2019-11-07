import { Component, OnInit } from '@angular/core';
import { Action } from '../budget.interface';

@Component({
  selector: 'app-budget-view',
  templateUrl: './budget-view.component.html',
  styleUrls: ['./budget-view.component.scss']
})
export class BudgetViewComponent implements OnInit {

  action = Action;

  constructor() { }

  ngOnInit() {
  }

}
