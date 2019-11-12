import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesViewComponent } from './categories-view/categories-view.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CoreModule } from '../core/core.module';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CategoriesViewComponent, CategoryListComponent, CategoryDialogComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    CoreModule,
    FormsModule,
  ],
  entryComponents: [CategoryDialogComponent],
})
export class CategoriesModule {
}
