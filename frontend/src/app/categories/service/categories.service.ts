import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category';  // A interface para categorias
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly API = '/api/categorias';  // URL da API para categorias

  constructor(private httpClient: HttpClient) { }

  // Método para listar todas as categorias
  list(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.API);
  }

  getCategorias(): Observable<ApiResponse>{
    return this.httpClient.get<ApiResponse>(this.API);
  }

  create(category: Partial<Category>): Observable<Category> {
    return this.httpClient.post<Category>(this.API, category);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API}/${id}`);
  }

}
