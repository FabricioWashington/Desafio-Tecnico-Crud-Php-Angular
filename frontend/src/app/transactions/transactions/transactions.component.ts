import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Transaction } from '../model/transaction';
import { TransactionsService } from '../services/transactions.service';
import { CategoriesService } from '../../categories/service/categories.service';
import { Category } from '../../categories/model/category';
import { ApiResponse } from '../../models/api-response';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  form: FormGroup;
  transactions$: Observable<Transaction[]>; // Observable de transações
  categories$: Observable<Category[]>; // Observable de categorias
  displayedColumns = ['descricao', 'valor', 'tipo', 'categoria', 'data', 'actions'];
  dataSource = new MatTableDataSource<Transaction>(); // Data source para a tabela

  transactionId: number | null = null;
  isEditing = false;

  // Estados dos checkboxes
  showReceitas = true;
  showDespesas = true;

  constructor(
    private transactionsService: TransactionsService,
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      descricao: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      tipo: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      data: ['', [Validators.required]],
    });

    this.categories$ = of([]);
    this.transactions$ = this.transactionsService.list().pipe(
      tap((transactions) => this.dataSource.data = transactions),
      catchError((error) => {
        this.onError('Erro ao carregar transações.');
        return of([]);
      })
    );
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.list().pipe(
      map((response: ApiResponse) => response.data),
      catchError((error) => {
        this.onError('Erro ao carregar categorias.');
        return of([]);
      })
    );
  }

  // Aplica os filtros baseados nos checkboxes
  applyFilters() {
    this.transactions$.subscribe((transactions) => {
      this.dataSource.data = transactions.filter((transaction) => {
        if (!this.showReceitas && transaction.tipo === 'Receita') return false;
        if (!this.showDespesas && transaction.tipo === 'Despesa') return false;
        return true;
      });
    });
  }

  onSubmit() {
    const formData = { ...this.form.value, idCategoria: this.form.value.categoria };
    delete formData.categoria;

    if (this.isEditing && this.transactionId) {
      this.transactionsService.updateTransaction(this.transactionId, formData).subscribe({
        next: () => {
          this.onSuccess();
          this.updateTableData();
          this.resetForm();
        },
        error: () => this.onErrorSubmit(),
      });
    } else {
      this.transactionsService.createTransaction(formData).subscribe({
        next: () => {
          this.onSuccess();
          this.updateTableData();
          this.resetForm();
        },
        error: () => this.onErrorSubmit(),
      });
    }
  }

  private updateTableData() {
    this.transactionsService.list().subscribe(
      (transactions) => {
        this.dataSource.data = transactions;
        this.applyFilters();
      },
      (error) => this.onError('Erro ao carregar transações.')
    );
  }

  deleteTransaction(id: number) {
    this.transactionsService.deleteTransaction(id).subscribe({
      next: () => this.updateTableData(),
      error: () => this.onError('Erro ao excluir transação.'),
    });
  }

  onEdit(id: number) {
    this.transactionId = id;
    this.isEditing = true;
    this.transactionsService.getTransactionById(id).subscribe((transaction) => {
      this.form.patchValue({
        descricao: transaction.descricao,
        valor: transaction.valor,
        tipo: transaction.tipo,
        categoria: transaction.idCategoria,
        data: transaction.data,
      });
    });
  }

  private resetForm() {
    this.form.reset();
    this.transactionId = null;
    this.isEditing = false;
  }

  private onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, { data: errorMsg });
  }

  private onErrorSubmit() {
    this._snackBar.open('Erro no cadastro', 'Fechar', { duration: 3000 });
  }

  private onSuccess() {
    this._snackBar.open('Cadastro concluído com sucesso!', 'Fechar', { duration: 3000 });
  }
}
