import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private readonly API = "/api/transacoes"; // Ajuste conforme a URL do seu backend
  private readonly CATEGORIES_API = "/api/categorias"; // URL para categorias

  constructor(private httpClient: HttpClient) { }

  // Método para listar todas as transações
  list(): Observable<Transaction[]> {
    return this.httpClient.get<{ status: boolean, message: string, data: Transaction[] }>(this.API).pipe(
      tap(response => {
        console.log('Transações recebidas:', response.data);  // Verifique os dados aqui
      }),
      map(response => response.data), // Extraímos o array de transações
      catchError(this.handleError)
    );
  }

  // Método para listar todas as categorias
  getCategorias(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.CATEGORIES_API)
      .pipe(
        tap(categories => console.log(categories)), // Apenas para debug
        catchError(this.handleError)
      );
  }

  // Método para salvar uma transação (criar ou atualizar)
  save(record: Transaction): Observable<Transaction> {
    if (record.id) {
      return this.updateTransaction(record.id, record);
    }
    return this.createTransaction(record);
  }

  // Criar uma nova transação
  createTransaction(transaction: Partial<Transaction>): Observable<Transaction> {
    return this.httpClient.post<Transaction>(this.API, transaction)
    .pipe(catchError(this.handleError));
  }

  // Atualizar uma transação existente
  updateTransaction(id: number, transaction: Transaction): Observable<Transaction> {
    return this.httpClient.put<Transaction>(`${this.API}/${id}`, transaction)
      .pipe(catchError(this.handleError));
  }

  // Excluir uma transação
  deleteTransaction(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API}/${id}`)
    .pipe(catchError(this.handleError));
  }

  // Função de tratamento de erro
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}, Mensagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

 getTransactionById(id: number): Observable<Transaction> {
  return this.httpClient.get<Transaction>(`${this.API}/${id}`).pipe(
    catchError(this.handleError)
  );
}



}
