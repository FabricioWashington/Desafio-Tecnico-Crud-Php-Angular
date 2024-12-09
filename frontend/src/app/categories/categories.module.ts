import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';


@NgModule({
  declarations: [
    CategoriesFormComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    AppMaterialModule
  ],
  exports: [
    CategoriesFormComponent,

  ]
})
export class CategoriesModule { }
