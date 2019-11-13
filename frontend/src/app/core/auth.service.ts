import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { LoginForm, RegisterForm } from '../auth/auth.interface';
import { ApiService } from './api.service';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {

  private _loggedIn$ = new BehaviorSubject<boolean>(false);
  loggedIn$ = this._loggedIn$.asObservable();

  constructor(
    private router: Router,
    private api: ApiService,
    private session: SessionService,
  ) {
    this.session.user$.subscribe(user => {
      this._loggedIn$.next(!!user);
    });
  }

  async register(formData: RegisterForm) {
    await this.api.auth.register(formData);
    await this.session.reload();
    this.router.navigate(['/budget']);
  }

  async login(formData: LoginForm) {
    await this.api.auth.login(formData);
    await this.session.reload();
    const url = this.session.popNextUrl();
    this.router.navigate([url]);
  }

  async logout() {
    await this.api.auth.logout();
    this.session.flush();
    this.router.navigate(['']);
  }
}
