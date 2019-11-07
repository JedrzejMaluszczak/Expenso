import { Component, Input, OnInit } from '@angular/core';
import { Action } from '../budget.interface';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  @Input() action:Action;

  constructor() { }

  ngOnInit() {
  }

}
