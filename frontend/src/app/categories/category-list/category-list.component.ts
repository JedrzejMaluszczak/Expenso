import { Component, Input, OnInit } from '@angular/core';
import { Action } from '../../budget/budget.interface';
import { CategoryBalance } from '../categories.interface';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @Input() action: Action;
  @Input() categories: CategoryBalance[];

  constructor() {
  }

  ngOnInit() {
  }

}
