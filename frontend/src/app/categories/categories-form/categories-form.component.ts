import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../service/categories.service';
import { Category } from '../model/category';
import { ApiResponse } from '../../models/api-response';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  categorias$: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriesService
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],  // Alteração para 'nome'
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriaService.list().subscribe({
      next: (response: ApiResponse) => {
        this.categorias$ = response.data;
      },
      error: (err) => console.error('Erro ao carregar categorias', err),
    });
  }

  addCategory(): void {
    if (this.form.valid) {
      const categoryData = { nome: this.form.value.nome }; // Passando 'nome' para a API
      this.categoriaService.create(categoryData).subscribe({
        next: () => {
          this.loadCategories();
          this.form.reset();
        },
        error: (err) => console.error('Erro ao adicionar categoria', err),
      });
    }
  }

  deleteCategory(id: number): void {
    this.categoriaService.delete(id).subscribe({
      next: () => this.loadCategories(),
      error: (err) => console.error('Erro ao excluir categoria', err),
    });
  }
}
