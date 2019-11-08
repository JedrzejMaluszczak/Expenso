import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { SessionService } from '../session.service';


@Injectable()
export class NotAuthenticatedGuard implements CanActivate {
  isLoggedOut: boolean;

  constructor(private router: Router, private session: SessionService) {
    this.session.user$.subscribe(user => {
      this.isLoggedOut = !user;
    });
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.isLoggedOut) {
      this.router.navigate(['budget']);
    }
    return this.isLoggedOut;
  }
}
