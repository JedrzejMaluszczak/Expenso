import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { DialogData } from '../balance/balance.component';


@Component({
  selector: 'app-add-balance-dialog',
  templateUrl: './add-balance-dialog.component.html',
  styleUrls: ['./add-balance-dialog.component.scss'],
  providers: [DatePipe],
})
export class AddBalanceDialogComponent implements OnInit {

  form: FormGroup;
  private specialKeys =
    ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddBalanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group(
      {
        amount: [null, [Validators.required, Validators.min(0)]],
        category: ['', Validators.required],
        note: '',
        date: [new Date(), Validators.required]
      }
    )
  }

  submit() {
    if (this.form.valid) {
      const date = this.datePipe.transform(
        this.form.get('date').value, 'yyyy-MM-dd'
      );
      this.form.get('date').patchValue(date);
      this.dialogRef.close(this.form.value)
    }
  }

  preventOverTwoDecimal(event) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const regex = new RegExp('^[0-9]+(\\.?([0-9]{1,2})?)?$');

    let current: string = event.target.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(regex)) {
      event.preventDefault();
    }
  }

}
