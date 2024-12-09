import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { CategoriesModule } from '../categories/categories.module';


@NgModule({
  declarations: [
    TransactionsComponent

  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    AppMaterialModule,
    TransactionsRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    CategoriesModule
  ]
})
export class TransactionsModule { }
