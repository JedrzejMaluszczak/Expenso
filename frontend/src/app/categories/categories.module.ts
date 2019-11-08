import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesViewComponent } from './categories-view/categories-view.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [CategoriesViewComponent, CategoryListComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    CoreModule,
  ]
})
export class CategoriesModule { }
