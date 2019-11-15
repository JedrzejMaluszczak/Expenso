import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { FullBalance } from '../budget.interface';
import { ResponsivenessService } from '../../core/responsiveness.service';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-transactions-view',
  templateUrl: './transactions-view.component.html',
  styleUrls: ['./transactions-view.component.scss']
})
export class TransactionsViewComponent implements OnInit {
  displayedColumns: string[] =
    ['date', 'amount', 'note', 'category.name', 'category.isIncome', 'action'];
  dataSource: MatTableDataSource<FullBalance>;
  transactions: FullBalance[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private responsivenessService: ResponsivenessService,
    private api: ApiService,
  ) {
  }

  ngOnInit() {
    this.transactions = this.route.snapshot.data.transactions;
    this.dataSource = new MatTableDataSource(this.transactions);
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr =
        data.date.toString() +
        data.amount +
        data.note.toLowerCase() +
        data.category.name.toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };

    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property.includes('.')) {
        return property.split('.').reduce((o, i) => o[i], item);
      }
      return item[property];
    };

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  remove(id: number) {
    this.api.balance.remove(id);
    this.dataSource.data = this.dataSource.data.filter(
      element => element.id !== id
    );
  }
}
