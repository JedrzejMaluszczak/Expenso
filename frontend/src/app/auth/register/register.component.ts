import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { MustMatch } from '../../core/custom.validators';


@Component({
  selector: 'med-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password1: ['', [Validators.required, Validators.minLength(8)]],
        password2: ['', [Validators.required, Validators.minLength(8)]]
      },
      {
        validator: MustMatch('password1', 'password2')
      }
    );
  }

  async submit() {
    if (this.registerForm.valid) {
      try {
        await this.auth.register(this.registerForm.value);
      } catch (e) {
        Object.keys(e.error).forEach(field => {
          const error_message = e.error[field];
          this.registerForm.get(field).setErrors({
            serverError: error_message
          });
        });
      }
    }
  }
}
