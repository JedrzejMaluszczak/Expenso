import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';
import { UserSimple } from './user.interface';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class SessionService {

  private USER_KEY = 'user';

  private _user$ = new BehaviorSubject<UserSimple>(null);
  user$ = this._user$.asObservable();

  private _nextUrl = '';

  constructor(
    private router: Router,
    private api: ApiService,
  ) {
    console.log('ssesionservice')
    const entry = localStorage.getItem(this.USER_KEY);
    try {
      this._user$.next(JSON.parse(entry));
    } catch (e) {
      console.error(e);
    }
    if (this.user) {
      // Check if loaded user is still authorized
      setTimeout(() => this.reload());
    } else {
      this.flush();
    }
  }

  set user(user: UserSimple) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this._user$.next(user);
  }

  get user() {
    return this._user$.value;
  }

  flush() {
    localStorage.removeItem(this.USER_KEY);
    this._user$.next(null);
  }

  async reload() {
    try {
      this.user = await this.api.user.me();
    } catch (e) {
      this.flush();
      this.router.navigate(['/login']);
    }
  }

  set nextUrl(url: string) {
    this._nextUrl = url;
  }

  popNextUrl() {
    const url = this._nextUrl;
    this._nextUrl = '';
    return url;
  }

}
