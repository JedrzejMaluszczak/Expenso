import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { MaterialModule } from './material.module';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatIconModule, MaterialModule],
  providers: [ApiService, AuthService, SessionService],
  exports: [MaterialModule],
})
export class CoreModule {

}
