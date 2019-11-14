import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';

import { Chart } from 'chart.js';

import { Action } from '../../budget/budget.interface';
import { CategoryBalance } from '../categories.interface';
import { ApiService } from '../../core/api.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, AfterViewInit, OnChanges {
  dataSource = new MatTableDataSource<CategoryBalance>();

  displayedColumns = ['name', 'balance', 'action'];

  @Input() action: Action;

  @Input() categories: CategoryBalance[];

  chart = [];


  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.categories && !changes.categories.firstChange) {
      this.generateChart();
    }
  }

  ngAfterViewInit(): void {
    this.generateChart()
  }

  ngOnInit() {
    this.dataSource.data = this.categories;
  }

  remove(id: number) {
    this.api.category.remove(id);
    this.categories = this.categories.filter(
      category=> category.id !== id
    );
    this.dataSource.data=this.categories
    this.generateChart();
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

  generateChart() {
    const labels = [];
    const data = [];
    const colors = [];
    for (let i = 0; i < this.categories.length; i++) {
      labels.push(this.categories[i].name);
      data.push(this.categories[i].categoryBalance);
      colors.push(this.getRandomColor())
    }
    this.chart = new Chart('chart-' + this.action, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            fill: true,
          },
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }],
        }
      }
    });

    this.cdr.detectChanges();
  }

  private getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    return color;
  }
}
