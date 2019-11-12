import { Component, Input, OnInit, } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';

import { Action } from '../../budget/budget.interface';
import { CategoryBalance } from '../categories.interface';
import { ApiService } from '../../core/api.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  dataSource = new MatTableDataSource<CategoryBalance>();

  displayedColumns = ['name', 'balance', 'action'];

  @Input() action: Action;

  @Input() categories: CategoryBalance[];


  constructor(
    private api: ApiService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.dataSource.data = this.categories;
  }

  remove(id: number) {
    this.api.category.remove(id);

    this.dataSource.data = this.dataSource.data.filter(
      category => category.id !== id
    );
  }

  openUpdateDialog(category: CategoryBalance) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '300px',
      data: { name: category.name },
    });

    dialogRef.afterClosed().subscribe(async name => {
      if (name) {
        const updatedCategory =
          await this.api.category.update(category.id, name);
        category.name = updatedCategory.name;
      }
    })
  }

  openNewCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '300px',
      data: { name: this.action },
    });

    dialogRef.afterClosed().subscribe(async name => {
      if (name) {
        const createdCategory =
          await this.api.category.create(name, this.action == Action.Incomes);
        this.dataSource.data.push(createdCategory);
        this.dataSource._updateChangeSubscription();
      }
    })
  }
}
