import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { SessionService } from '../session.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  isLoggedIn: boolean;

  constructor(private router: Router, private session: SessionService) {
    this.session.user$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    if (!this.isLoggedIn) {
      this.session.nextUrl = state.url;
      this.router.navigate(['auth/login']);
    }
    return this.isLoggedIn;
  }
}
