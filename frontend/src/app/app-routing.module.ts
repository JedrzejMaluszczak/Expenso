import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotAuthenticatedGuard } from './core/guards/not-auth.guard';
import { AuthenticatedGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    canActivate: [NotAuthenticatedGuard],
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule),
  },

  {
    path: 'budget',
    canActivate: [AuthenticatedGuard],
    loadChildren: () =>
      import('./budget/budget.module').then(m => m.BudgetModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
