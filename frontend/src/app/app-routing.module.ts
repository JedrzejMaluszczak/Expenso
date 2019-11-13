import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotAuthenticatedGuard } from './core/guards/not-auth.guard';
import { AuthenticatedGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    canActivate: [NotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule),
  },

  {
    path: 'budget',
    canActivate: [AuthenticatedGuard],
    loadChildren: () =>
      import('./budget/budget.module').then(m => m.BudgetModule),
  },

  {
    path: 'categories',
    canActivate: [AuthenticatedGuard],
    loadChildren: () =>
      import('./categories/categories.module').then(m => m.CategoriesModule)

  },

  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    canActivate: [NotAuthenticatedGuard],
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
