<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\TransacaoController;

// Rota padrão
Route::get('/', function () {
    return view('welcome');
});

// Rotas para Categorias
Route::get('/categorias', [CategoriaController::class, 'index'])->name('categorias.index');
Route::get('/categorias/create', [CategoriaController::class, 'create'])->name('categorias.create');
Route::post('/categorias', [CategoriaController::class, 'store'])->name('categorias.store');
Route::get('/categorias/{id}', [CategoriaController::class, 'show'])->name('categorias.show');
Route::get('/categorias/{id}/edit', [CategoriaController::class, 'edit'])->name('categorias.edit');
Route::put('/categorias/{id}', [CategoriaController::class, 'update'])->name('categorias.update');
Route::delete('/categorias/{id}', [CategoriaController::class, 'destroy'])->name('categorias.destroy');

// Rotas para Transações
Route::get('/transacoes', [TransacaoController::class, 'index'])->name('transacoes.index');
Route::get('/transacoes/create', [TransacaoController::class, 'create'])->name('transacoes.create');
Route::post('/transacoes', [TransacaoController::class, 'store'])->name('transacoes.store');
Route::get('/transacoes/{id}', [TransacaoController::class, 'show'])->name('transacoes.show');
Route::get('/transacoes/{id}/edit', [TransacaoController::class, 'edit'])->name('transacoes.edit');
Route::put('/transacoes/{id}', [TransacaoController::class, 'update'])->name('transacoes.update');
Route::delete('/transacoes/{id}', [TransacaoController::class, 'destroy'])->name('transacoes.destroy');
