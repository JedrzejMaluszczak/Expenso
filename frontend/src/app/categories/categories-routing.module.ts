import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesViewComponent } from './categories-view/categories-view.component';
import { IncomeCategoryResolverService } from './income-category.resolver.service';
import { ExpenseCategoryResolverService } from './expense-category.resolver.service';


const routes: Routes = [
  {
    path: '',
    resolve: {
      incomeCategories: IncomeCategoryResolverService,
      expenseCategories: ExpenseCategoryResolverService,
    },
    component: CategoriesViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
