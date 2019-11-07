import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Action } from '../budget.interface';

@Component({
  selector: 'app-add-balance-record',
  templateUrl: './add-balance-record.component.html',
  styleUrls: ['./add-balance-record.component.scss']
})
export class AddBalanceRecordComponent implements OnInit {

  action: Action;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(v => this.action = v.action);
  }

}
