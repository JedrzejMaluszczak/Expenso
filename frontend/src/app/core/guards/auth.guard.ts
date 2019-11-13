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

  isAuthenticated: boolean;

  constructor(private router: Router, private session: SessionService) {
    this.session.user$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    if (!this.isAuthenticated) {
      this.session.nextUrl = state.url;
      this.router.navigate(['auth/login']);
    }
    return this.isAuthenticated;
  }
}
