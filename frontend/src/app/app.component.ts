import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Event,
  NavigationCancel,
  NavigationEnd, NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = false;

  constructor(
    private titleService: Title,
    private router: Router,
  ) {
    this.titleService.setTitle(environment.applicationName);
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
