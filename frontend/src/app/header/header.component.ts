import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: Observable<boolean>;

  constructor(
    private auth: AuthService,
  ) {
  }

  ngOnInit() {
    this.isLoggedIn = this.auth.loggedIn$;
  }

  logout() {
    this.auth.logout();
  }
}
