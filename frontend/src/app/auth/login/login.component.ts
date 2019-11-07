import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'med-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async submit() {
    if (this.loginForm.valid) {
      // try {
        await this.auth.login(this.loginForm.value);
      //   this.toasts.success('Pomyślnie zalogowano');
      // } catch (e) {
      //   this.toasts.error(e.error.nonFieldErrors);
      // }
    }
  }
}
