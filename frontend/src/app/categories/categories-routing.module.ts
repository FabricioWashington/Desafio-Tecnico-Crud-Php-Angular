import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesFormComponent } from './categories-form/categories-form.component';

const routes: Routes = [

  { path: '', component: CategoriesFormComponent },
  { path: 'new', component: CategoriesFormComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
