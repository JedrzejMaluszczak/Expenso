import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { MaterialModule } from './material.module';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { NotAuthenticatedGuard } from './guards/not-auth.guard';
import { AuthenticatedGuard } from './guards/auth.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatIconModule, MaterialModule],
  providers: [
    ApiService,
    AuthService,
    AuthenticatedGuard,
    NotAuthenticatedGuard,
  ],
  exports: [MaterialModule],
})
export class CoreModule {

}
