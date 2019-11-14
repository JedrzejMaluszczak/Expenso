import { ReplaySubject } from 'rxjs';

export class ResponsivenessService {

  private _isMobile$ = new ReplaySubject<boolean>();

  constructor() {
    window.addEventListener('resize', () => {
      this.checkResolution();
    });
    this.checkResolution();
  }

  get isMobile() {
    return window.innerWidth <= 1024;
  }

  checkResolution() {
    this._isMobile$.next(this.isMobile);
  }
}
